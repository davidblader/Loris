
class EmailElement extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(e) {
    this.props.onUserInput(this.props.name, e.target.value);
  }

  handleBlur(e) {
    this.props.onUserBlur(this.props.name, e.target.value);
  }

  render() {
    let disabled = this.props.disabled ? 'disabled' : null;
    let required = this.props.required ? 'required' : null;
    let errorMessage = null;
    let requiredHTML = null;
    let elementClass = 'row form-group';

    // Add required asterix
    if (required) {
      requiredHTML = <span className="text-danger">*</span>;
    }

    // Add error message
    if (this.props.errorMessage) {
      errorMessage = <span>{this.props.errorMessage}</span>;
      elementClass = 'row form-group has-error';
    }

    return (
      <div className={elementClass}>
        <label className="col-sm-3 control-label" htmlFor={this.props.id}>
          {this.props.label}
          {requiredHTML}
        </label>
        <div className="col-sm-7">
          <input
            type="text"
            className="form-control"
            name={this.props.name}
            id={this.props.id}
            value={this.props.value || ""}
            required={required}
            disabled={disabled}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          {errorMessage}
        </div>
        <div className="col-sm-2">
        <span>
          <input
            type="checkbox"
            onChange={this.props.toggleEmailNotify}
            value={this.props.addressee}
          />
          <span>Send email notification?</span>
        </span>
        </div>
      </div>
    );
  }
}

EmailElement.defaultProps = {
  name: '',
  label: '',
  value: '',
  addressee: '',
  id: null,
  disabled: false,
  required: false,
  errorMessage: '',
  onUserInput: function() {
    console.warn('onUserInput() callback is not set');
  },
  onUserBlur: function() {
  }
};

// This class combines the common form elements between
// Edit mode and initial Project Proposal/Creation mode
class ProjectFormFields extends React.Component {
  constructor() {
    super();
    this.createCollabEmailFields = this.createCollabEmailFields.bind(this);
    this.fileOverwrite = this.fileOverwrite.bind(this);
    this.fileDelete = this.fileDelete.bind(this);
    this.createFileFields = this.createFileFields.bind(this);
  }

  createCollabEmailFields() {
    let collabEmails = [];
    if (this.props.formData.collaborators) {
      this.props.formData.collaborators.forEach(
        function(c) {
          // TODO: make this less stupid
          let name = 'collabEmail' + c;
          collabEmails.push(
            <EmailElement
              name={name}
              label={c + (c.slice(-1) === 's' ? "'" : "'s") + " Email"}
              onUserInput={this.props.setFormData}
              onUserBlur={this.props.validateEmail}
              toggleEmailNotify={this.props.toggleEmailNotify}
              errorMessage={this.props.formErrors[name]}
              required={false}
              value={this.props.formData[name]}
              addressee={c}
            />
          );
        }, this);
    }
    return collabEmails;
  }

  fileOverwrite() {

  }

  fileDelete(uploadID) {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this file?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: 'Yes, I am sure!',
      cancelButtonText: "No, cancel it!"
      },
      function(willDelete) {
      console.log(uploadID);
        if (willDelete) {
          let url = loris.BaseURL + '/publication/ajax/FileDelete.php';
          $.ajax(url, {
            method: 'DELETE',
            data: {'uploadID': uploadID},
            dataType: "json"
          });
        }
    });
  }

  createFileFields() {
    let fileFields = [];
    // Create download link & edit fields for existing files
    if (this.props.files) {
      this.props.files.forEach(function (f) {
        let downloadURL = loris.BaseURL + '/publication/ajax/FileDownload.php?File=' + encodeURIComponent(f.URL);
        let link = (
          <span>
            <a href={downloadURL}>{f.URL}</a>
            &nbsp;&nbsp;
            <span className="glyphicon glyphicon-pencil" onClick={this.fileOverwrite}/>
            &nbsp;&nbsp;
            <span className="glyphicon glyphicon-remove" onClick={() => this.fileDelete(f.PublicationUploadID)} />
          </span>
        );
        let existFileFlag = 'existingUpload_';
        let pubType = existFileFlag + 'publicationType_' + f.PublicationUploadID;
        let pubCit = existFileFlag + 'publicationCitation_' + f.PublicationUploadID;
        let pubVer = existFileFlag + 'publicationVersion_' + f.PublicationUploadID;
        let pubTypeStr = this.props.uploadTypes[this.props.formData[pubType]];
        fileFields.push(
          <div>
            <StaticElement
              label={pubTypeStr}
              text={link}
            />
            <TextboxElement
              name={pubCit}
              label="Citation"
              onUserInput={this.props.setFormData}
              value={this.props.formData[pubCit]}
            />
            <TextboxElement
              name={pubVer}
              label="Publication Version"
              onUserInput={this.props.setFormData}
              value={this.props.formData[pubVer]}
            />
          </div>
        );
      }, this);
    }
    // create fields for new files
    for (let i = 0; i <= this.props.numFiles; i++) {
      let fileName = "file_" + i;
      fileFields.push(
        <FileElement
          name={fileName}
          id={"publicationUploadEl_" + i}
          onUserInput={this.props.setFileData}
          label="File to upload"
          value={this.props.formData[fileName]}
        />
      );
      if (this.props.formData[fileName]) {
        let publicationType = "publicationType_" + i;
        let publicationCitation = "publicationCitation_" + i;
        let publicationVersion = "publicationVersion_" + i;
        fileFields.push(
          <div>
            <SelectElement
              name={publicationType}
              label="Publication Type"
              onUserInput={this.props.setFormData}
              value={this.props.formData[publicationType]}
              options={this.props.uploadTypes}
              required={true}
            />
            <TextboxElement
              name={publicationCitation}
              label="Citation"
              onUserInput={this.props.setFormData}
              value={this.props.formData[publicationCitation]}
            />
            <TextboxElement
              name={publicationVersion}
              label="Publication Version"
              onUserInput={this.props.setFormData}
              value={this.props.formData[publicationVersion]}
            />
          </div>
        );
      }
    }

    return fileFields;
  }

  render() {
    let collabEmails = this.createCollabEmailFields();
    let fileFields = this.createFileFields();

    let voiHelp = (<div>For help finding variables of interest, consult
      the <a href={loris.BaseURL + '/datadict/'}>Data Dictionary</a>
      </div>);
    return (
      <div>
        <TextareaElement
          name="description"
          label="Description"
          onUserInput={this.props.setFormData}
          required={true}
          value={this.props.formData.description}
        />
        <TextboxElement
          name="leadInvestigator"
          label="Lead Investigator"
          onUserInput={this.props.setFormData}
          required={true}
          value={this.props.formData.leadInvestigator}
        />
        <EmailElement
          name="leadInvestigatorEmail"
          label="Lead Investigator Email"
          onUserInput={this.props.setFormData}
          onUserBlur={this.props.validateEmail}
          toggleEmailNotify={this.props.toggleEmailNotify}
          errorMessage={this.props.formErrors.leadInvestigatorEmail}
          required={true}
          value={this.props.formData.leadInvestigatorEmail}
          addressee="leadInvestigator"
        />
        <TagsElement
          name="usersWithEditPerm"
          id="usersWithEditPerm"
          label="Users with Edit Permission"
          options={this.props.users}
          useSearch={true}
          strictSearch={true}
          onUserInput={this.props.setFormData}
          onUserAdd={this.props.addListItem}
          onUserRemove={this.props.removeListItem}
          value={this.props.formData.pendingUWEP}
          pendingValKey="pendingUWEP"
          items={this.props.formData.usersWithEditPerm}
          btnLabel="Add User"
        />
        <TagsElement
          name="collaborators"
          id="collaborators"
          label="Collaborators"
          onUserInput={this.props.setFormData}
          onUserAdd={this.props.addListItem}
          onUserRemove={this.props.removeListItem}
          value={this.props.formData.pendingCollab}
          pendingValKey="pendingCollab"
          items={this.props.formData.collaborators}
          btnLabel="Add Collaborator"
        />
        {collabEmails}
        <TagsElement
          name="keywords"
          id="keywords"
          label="Keywords"
          onUserInput={this.props.setFormData}
          onUserAdd={this.props.addListItem}
          onUserRemove={this.props.removeListItem}
          value={this.props.formData.pendingKWItem}
          pendingValKey="pendingKWItem"
          items={this.props.formData.keywords}
          btnLabel="Add Keyword"
        />
        <TagsElement
          name="voiFields"
          id="voiFields"
          label="Variables of Interest"
          useSearch={true}
          strictSearch={true}
          onUserInput={this.props.setFormData}
          onUserAdd={this.props.addListItem}
          onUserRemove={this.props.removeListItem}
          required={false}
          value={this.props.formData.pendingItemVF}
          options={this.props.allVOIs}
          pendingValKey="pendingItemVF"
          items={this.props.formData.voiFields}
          btnLabel="Add Variable of Interest"
        />
        <StaticElement
          text={voiHelp}
        />
        {fileFields}
        <ButtonElement label={this.props.editMode ? "Submit" : "Propose Project"}/>
      </div>
    );
  }
}

export default ProjectFormFields;
