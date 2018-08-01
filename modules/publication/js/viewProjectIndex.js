!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0)}({0:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var _viewProject=__webpack_require__(29),_viewProject2=_interopRequireDefault(_viewProject),args=QueryString.get(document.currentScript.src);$(function(){var viewProject=React.createElement("div",{className:"page-edit-form"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-md-9 col-lg-7"},React.createElement(_viewProject2.default,{DataURL:loris.BaseURL+"/publication/ajax/getData.php?action=getProjectData&id="+args.id,action:loris.BaseURL+"/publication/ajax/FileUpload.php?action=editProject&id="+args.id}))));ReactDOM.render(viewProject,document.getElementById("lorisworkspace"))})},27:function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),EmailElement=function(_React$Component){function EmailElement(){_classCallCheck(this,EmailElement);var _this=_possibleConstructorReturn(this,(EmailElement.__proto__||Object.getPrototypeOf(EmailElement)).call(this));return _this.handleChange=_this.handleChange.bind(_this),_this.handleBlur=_this.handleBlur.bind(_this),_this}return _inherits(EmailElement,_React$Component),_createClass(EmailElement,[{key:"handleChange",value:function(e){this.props.onUserInput(this.props.name,e.target.value)}},{key:"handleBlur",value:function(e){this.props.onUserBlur(this.props.name,e.target.value)}},{key:"render",value:function(){var disabled=this.props.disabled?"disabled":null,required=this.props.required?"required":null,errorMessage=null,requiredHTML=null,elementClass="row form-group";return required&&(requiredHTML=React.createElement("span",{className:"text-danger"},"*")),this.props.errorMessage&&(errorMessage=React.createElement("span",null,this.props.errorMessage),elementClass="row form-group has-error"),React.createElement("div",{className:elementClass},React.createElement("label",{className:"col-sm-3 control-label",htmlFor:this.props.id},this.props.label,requiredHTML),React.createElement("div",{className:"col-sm-7"},React.createElement("input",{type:"text",className:"form-control",name:this.props.name,id:this.props.id,value:this.props.value||"",required:required,disabled:disabled,onChange:this.handleChange,onBlur:this.handleBlur}),errorMessage),React.createElement("div",{className:"col-sm-2"},React.createElement("span",null,React.createElement("input",{name:this.props.name+"_notify",type:"checkbox",onChange:this.props.toggleEmailNotify,value:this.props.addressee}),React.createElement("span",null,"Send email notification?"))))}}]),EmailElement}(React.Component);EmailElement.defaultProps={name:"",label:"",value:"",addressee:"",id:null,disabled:!1,required:!1,errorMessage:"",onUserInput:function(){console.warn("onUserInput() callback is not set")},onUserBlur:function(){}};var ProjectFormFields=function(_React$Component2){function ProjectFormFields(){_classCallCheck(this,ProjectFormFields);var _this2=_possibleConstructorReturn(this,(ProjectFormFields.__proto__||Object.getPrototypeOf(ProjectFormFields)).call(this));return _this2.createCollabEmailFields=_this2.createCollabEmailFields.bind(_this2),_this2.deleteUpload=_this2.deleteUpload.bind(_this2),_this2.createFileFields=_this2.createFileFields.bind(_this2),_this2.addCollaborator=_this2.addCollaborator.bind(_this2),_this2.removeCollaborator=_this2.removeCollaborator.bind(_this2),_this2.setCollaboratorEmail=_this2.setCollaboratorEmail.bind(_this2),_this2.toggleEmailNotify=_this2.toggleEmailNotify.bind(_this2),_this2}return _inherits(ProjectFormFields,_React$Component2),_createClass(ProjectFormFields,[{key:"deleteUpload",value:function(uploadID){swal({title:"Are you sure?",text:"Are you sure you want to delete this file?",type:"warning",showCancelButton:!0,confirmButtonText:"Yes, I am sure!",cancelButtonText:"No, cancel it!"},function(willDelete){if(willDelete){var url=loris.BaseURL+"/publication/ajax/FileDelete.php?uploadID="+uploadID;$.ajax(url,{method:"DELETE"})}})}},{key:"createFileFields",value:function(){var fileFields=[];this.props.files&&this.props.files.forEach(function(f){var _this3=this,downloadURL=loris.BaseURL+"/publication/ajax/FileDownload.php?File="+encodeURIComponent(f.URL),link=React.createElement("span",null,React.createElement("a",{href:downloadURL},f.URL),"  ",React.createElement("span",{className:"glyphicon glyphicon-remove",onClick:function(){return _this3.deleteUpload(f.PublicationUploadID)}})),existFileFlag="existingUpload_",pubType=existFileFlag+"publicationType_"+f.PublicationUploadID,pubCit=existFileFlag+"publicationCitation_"+f.PublicationUploadID,pubVer=existFileFlag+"publicationVersion_"+f.PublicationUploadID,pubTypeStr=this.props.uploadTypes[this.props.formData[pubType]];fileFields.push(React.createElement("div",null,React.createElement(StaticElement,{label:pubTypeStr,text:link}),React.createElement(TextboxElement,{name:pubCit,label:"Citation",onUserInput:this.props.setFormData,value:this.props.formData[pubCit]}),React.createElement(TextboxElement,{name:pubVer,label:"Publication Version",onUserInput:this.props.setFormData,value:this.props.formData[pubVer]})))},this);for(var i=0;i<=this.props.numFiles;i++){var fileName="file_"+i;if(fileFields.push(React.createElement(FileElement,{name:fileName,id:"publicationUploadEl_"+i,onUserInput:this.props.setFileData,label:"File to upload",value:this.props.formData[fileName]})),this.props.formData[fileName]){var publicationType="publicationType_"+i,publicationCitation="publicationCitation_"+i,publicationVersion="publicationVersion_"+i;fileFields.push(React.createElement("div",null,React.createElement(SelectElement,{name:publicationType,label:"Publication Type",onUserInput:this.props.setFormData,value:this.props.formData[publicationType],options:this.props.uploadTypes,required:!0}),React.createElement(TextboxElement,{name:publicationCitation,label:"Citation",onUserInput:this.props.setFormData,value:this.props.formData[publicationCitation]}),React.createElement(TextboxElement,{name:publicationVersion,label:"Publication Version",onUserInput:this.props.setFormData,value:this.props.formData[publicationVersion]})))}}return fileFields}},{key:"createCollabEmailFields",value:function(){var collabEmails=[];return this.props.formData.collaborators&&this.props.formData.collaborators.forEach(function(c,i){var name="collabEmail_"+c.name;collabEmails.push(React.createElement(EmailElement,{name:name,label:c.name+("s"===c.name.slice(-1)?"'":"'s")+" Email",onUserInput:this.setCollaboratorEmail,onUserBlur:this.props.validateEmail,toggleEmailNotify:this.toggleEmailNotify,errorMessage:this.props.formErrors[name],required:!1,value:this.props.formData.collaborators[i].email,addressee:c.name}))},this),collabEmails}},{key:"addCollaborator",value:function(formElement,value,pendingValKey){var collaborators=this.props.formData.collaborators||[];collaborators.push({name:value,email:null,notify:!1}),this.props.setFormData("collaborators",collaborators),this.props.setFormData(pendingValKey,null)}},{key:"removeCollaborator",value:function(formElement,value){var collaborators=this.props.formData.collaborators||[];collaborators=collaborators.filter(function(c){return c.name!==value}),this.props.setFormData("collaborators",collaborators)}},{key:"setCollaboratorEmail",value:function(formElement,value){var collabName=formElement.split("_")[1],collaborators=this.props.formData.collaborators,i=collaborators.findIndex(function(c){return c.name===collabName});collaborators[i].email=value,this.props.setFormData("collaborators",collaborators)}},{key:"toggleEmailNotify",value:function(e){var _this4=this;if(e.target.name.indexOf("collabEmail")>-1)!function(){var collaborators=_this4.props.formData.collaborators,collabName=e.target.value,i=collaborators.findIndex(function(c){return c.name===collabName});collaborators[i].notify=!collaborators[i].notify,_this4.props.setFormData("collaborators",collaborators)}();else if("leadInvestigatorEmail_notify"===e.target.name){var currNotify=this.props.formData.notifyLead||!1;this.props.setFormData("notifyLead",!currNotify)}}},{key:"render",value:function(){var collabEmails=this.createCollabEmailFields(),fileFields=this.createFileFields(),voiHelp=React.createElement("div",null,"For help finding variables of interest, consult the ",React.createElement("a",{href:loris.BaseURL+"/datadict/"},"Data Dictionary")),collabNames=[];this.props.formData.collaborators&&(collabNames=this.props.formData.collaborators.map(function(c){return c.name}));var voiTypeOptions={All:"All",Behavioral:"Behavioral",Imaging:"Imaging"},allVOIs=this.props.allVOIs,voiOptions={},type=this.props.formData.voiType;if(type&&"All"!==type)voiOptions=this.props.allVOIs[type];else{var bvlCopy=Object.assign({},allVOIs.Behavioral);voiOptions=Object.assign(bvlCopy,allVOIs.Imaging)}return React.createElement("div",null,React.createElement(TextareaElement,{name:"description",label:"Description",onUserInput:this.props.setFormData,required:!0,value:this.props.formData.description}),React.createElement(TextboxElement,{name:"leadInvestigator",label:"Lead Investigator",onUserInput:this.props.setFormData,required:!0,value:this.props.formData.leadInvestigator}),React.createElement(EmailElement,{name:"leadInvestigatorEmail",label:"Lead Investigator Email",onUserInput:this.props.setFormData,onUserBlur:this.props.validateEmail,toggleEmailNotify:this.toggleEmailNotify,errorMessage:this.props.formErrors.leadInvestigatorEmail,required:!0,value:this.props.formData.leadInvestigatorEmail,addressee:"leadInvestigator"}),React.createElement(TagsElement,{name:"usersWithEditPerm",id:"usersWithEditPerm",label:"Users with Edit Permission",options:this.props.users,useSearch:!0,strictSearch:!0,onUserInput:this.props.setFormData,onUserAdd:this.props.addListItem,onUserRemove:this.props.removeListItem,value:this.props.formData.pendingUWEP,pendingValKey:"pendingUWEP",items:this.props.formData.usersWithEditPerm,btnLabel:"Add User"}),React.createElement(TagsElement,{name:"collaborators",id:"collaborators",label:"Collaborators",options:this.props.allCollabs,useSearch:!0,strictSearch:!1,onUserInput:this.props.setFormData,onUserAdd:this.addCollaborator,onUserRemove:this.removeCollaborator,value:this.props.formData.pendingCollab,pendingValKey:"pendingCollab",items:collabNames,btnLabel:"Add Collaborator"}),collabEmails,React.createElement(TagsElement,{name:"keywords",id:"keywords",label:"Keywords",options:this.props.allKWs,useSearch:!0,strictSearch:!1,onUserInput:this.props.setFormData,onUserAdd:this.props.addListItem,onUserRemove:this.props.removeListItem,value:this.props.formData.pendingKWItem,pendingValKey:"pendingKWItem",items:this.props.formData.keywords,btnLabel:"Add Keyword"}),React.createElement(SelectElement,{name:"voiType",label:"Type of Variables of Interest",options:voiTypeOptions,onUserInput:this.props.setFormData,value:this.props.formData.voiType,emptyOption:!1}),React.createElement(TagsElement,{name:"voiFields",id:"voiFields",label:"Variables of Interest",useSearch:!0,strictSearch:!0,onUserInput:this.props.setFormData,onUserAdd:this.props.addListItem,onUserRemove:this.props.removeListItem,required:!1,value:this.props.formData.pendingItemVF,options:voiOptions,pendingValKey:"pendingItemVF",items:this.props.formData.voiFields,btnLabel:"Add Variable of Interest"}),React.createElement(StaticElement,{text:voiHelp}),fileFields,React.createElement(ButtonElement,{label:this.props.editMode?"Submit":"Propose Project"}))}}]),ProjectFormFields}(React.Component);exports.default=ProjectFormFields},29:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_projectFields=__webpack_require__(27),_projectFields2=_interopRequireDefault(_projectFields),ViewProject=function(_React$Component){function ViewProject(props){_classCallCheck(this,ViewProject);var _this=_possibleConstructorReturn(this,(ViewProject.__proto__||Object.getPrototypeOf(ViewProject)).call(this,props));return _this.state={formData:{},formErrors:{},numFiles:0,isLoaded:!1},_this.handleSubmit=_this.handleSubmit.bind(_this),_this.setFormData=_this.setFormData.bind(_this),_this.setFileData=_this.setFileData.bind(_this),_this.createFileDownloadLinks=_this.createFileDownloadLinks.bind(_this),_this.createMenuFilterLinks=_this.createMenuFilterLinks.bind(_this),_this.createStaticComponents=_this.createStaticComponents.bind(_this),_this.createEditableComponents=_this.createEditableComponents.bind(_this),_this.addListItem=_this.addListItem.bind(_this),_this.removeListItem=_this.removeListItem.bind(_this),_this.validateEmail=_this.validateEmail.bind(_this),_this}return _inherits(ViewProject,_React$Component),_createClass(ViewProject,[{key:"validateEmail",value:function(field,email){var formErrors=this.state.formErrors;""===email||null===email||void 0===email?delete formErrors[field]:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)===!1?formErrors[field]="Invalid email":delete formErrors[field],this.setState({formErrors:formErrors})}},{key:"handleSubmit",value:function(e){e.preventDefault();var formData=this.state.formData,formObj=new FormData;for(var key in formData)if(formData.hasOwnProperty(key)&&""!==formData[key]){var formVal=void 0;formVal=Array.isArray(formData[key])?JSON.stringify(formData[key]):formData[key],formObj.append(key,formVal)}$.ajax({type:"POST",url:this.props.action,data:formObj,cache:!1,contentType:!1,processData:!1,success:function(){swal("Edit Successful!","","success")},error:function(jqXHR){console.error(jqXHR);var resp="Something went wrong!";try{resp=JSON.parse(jqXHR.responseText).message}catch(e){console.error(e)}swal("Edit failed!",resp,"error")}})}},{key:"componentDidMount",value:function(){var self=this;$.ajax(this.props.DataURL,{dataType:"json",success:function(data){var formData={title:data.title,description:data.description,leadInvestigator:data.leadInvestigator,leadInvestigatorEmail:data.leadInvestigatorEmail,notifyLead:!1,status:data.status,voiFields:data.voi,keywords:data.keywords,collaborators:data.collaborators,usersWithEditPerm:data.usersWithEditPerm,rejectedReason:data.rejectedReason};data.files&&data.files.forEach(function(f){var existFileFlag="existingUpload_",pubType=existFileFlag+"publicationType_"+f.PublicationUploadID,pubCit=existFileFlag+"publicationCitation_"+f.PublicationUploadID,pubVer=existFileFlag+"publicationVersion_"+f.PublicationUploadID;formData[pubType]=f.PublicationUploadTypeID,formData[pubCit]=f.Citation,formData[pubVer]=f.Version}),self.setState({formData:formData,users:data.users,statusOpts:data.statusOpts,userCanEdit:data.userCanEdit,allVOIs:data.allVOIs,allKWs:data.allKWs,allCollabs:data.allCollabs,uploadTypes:data.uploadTypes,files:data.files,isLoaded:!0})},error:function(_error,errorCode,errorMsg){console.error(_error,errorCode,errorMsg),self.setState({error:"An error occurred when loading the form!"})}})}},{key:"createFileDownloadLinks",value:function(){var files=this.state.files,toReturn=[];return files.forEach(function(f){var download=loris.BaseURL+"/publication/ajax/FileDownload.php?File="+f.URL,link=React.createElement("a",{href:download},f.URL),uploadType=this.state.uploadTypes[f.PublicationUploadTypeID];toReturn.push(React.createElement(StaticElement,{label:"Download "+uploadType,text:link})),f.Citation&&toReturn.push(React.createElement(StaticElement,{label:"Citation",text:f.Citation})),f.Version&&toReturn.push(React.createElement(StaticElement,{label:"Version",text:f.Version}))},this),toReturn}},{key:"createMenuFilterLinks",value:function(stringArr,filterVar){var links=[];return stringArr.forEach(function(value){links.push(React.createElement("span",null,React.createElement("a",{href:loris.BaseURL+"/publication/?"+filterVar+"="+value},value),";  "))}),links}},{key:"createStaticComponents",value:function(){var collaborators=void 0,keywords=void 0,vois=void 0,collabLinks=void 0,keywordLinks=void 0,voiLinks=void 0,files=void 0;return this.state.formData.collaborators.length>0&&(collabLinks=this.createMenuFilterLinks(this.state.formData.collaborators.map(function(c){return c.name}),"collaborators"),collaborators=React.createElement(StaticElement,{name:"collaborators",label:"Collaborators",text:collabLinks})),this.state.formData.keywords.length>0&&(keywordLinks=this.createMenuFilterLinks(this.state.formData.keywords,"keywords"),keywords=React.createElement(StaticElement,{name:"keywords",label:"Keywords",text:keywordLinks})),this.state.formData.voiFields.length>0&&(voiLinks=this.createMenuFilterLinks(this.state.formData.voiFields,"voi"),vois=React.createElement(StaticElement,{name:"variablesOfInterest",label:"Variables of Interest",text:voiLinks})),this.state.files.length>0&&(files=this.createFileDownloadLinks()),React.createElement("div",null,React.createElement(StaticElement,{name:"description",label:"Description",text:this.state.formData.description}),React.createElement(StaticElement,{name:"leadInvestigator",label:"Lead Investigator",text:this.state.formData.leadInvestigator}),React.createElement(StaticElement,{name:"leadInvestigatorEmail",label:"Lead Investigator Email",text:this.state.formData.leadInvestigatorEmail}),collaborators,keywords,vois,files)}},{key:"createEditableComponents",value:function(){return React.createElement("div",null,React.createElement(_projectFields2.default,{files:this.state.files,numFiles:this.state.numFiles,formData:this.state.formData,formErrors:this.state.formErrors,setFormData:this.setFormData,setFileData:this.setFileData,addListItem:this.addListItem,removeListItem:this.removeListItem,validateEmail:this.validateEmail,toggleEmailNotify:this.toggleEmailNotify,uploadTypes:this.state.uploadTypes,users:this.state.users,allVOIs:this.state.allVOIs,allKWs:this.state.allKWs,allCollabs:this.state.allCollabs,editMode:!0}))}},{key:"addListItem",value:function(formElement,value,pendingValKey){var formData=this.state.formData,listItems=formData[formElement]||[];listItems.push(value),formData[formElement]=listItems,formData[pendingValKey]=null,this.setState({formData:formData})}},{key:"removeListItem",value:function(formElement,value){var formData=this.state.formData,listItems=formData[formElement],index=listItems.indexOf(value);index>-1&&(listItems.splice(index,1),formData[formElement]=listItems,this.setState({formData:formData}))}},{key:"setFormData",value:function(formElement,value){var formData=this.state.formData;formData[formElement]=value,this.setState({formData:formData})}},{key:"setFileData",value:function(formElement,value){var numFiles=this.state.numFiles;this.state.formData[formElement]||(numFiles+=1,this.setState({numFiles:numFiles})),this.setFormData(formElement,value)}},{key:"render",value:function(){if(!this.state.isLoaded)return React.createElement("button",{className:"btn-info has-spinner"},"Loading",React.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"}));var statusElement=void 0,rejectReason=void 0,reviewBtn=void 0;if(loris.userHasPermission("publication_approve")){var statusID=this.state.formData.status,status=this.state.statusOpts[statusID];statusElement=React.createElement(SelectElement,{name:"status",label:"Status",id:"status",value:this.state.formData.status,onUserInput:this.setFormData,required:!0,options:this.state.statusOpts,emptyOption:!1}),"Rejected"===status&&(rejectReason=React.createElement(TextboxElement,{name:"rejectedReason",label:"Reason for rejection",value:this.state.formData.rejectedReason,onUserInput:this.setFormData,required:!0})),reviewBtn=this.state.userCanEdit?void 0:React.createElement(ButtonElement,{label:"Submit"})}else{var _statusID=this.state.formData.status,_status=this.state.statusOpts[_statusID],statClassMap={Pending:"text-warning",Approved:"text-success",Rejected:"text-danger"},statusText=React.createElement("span",{className:statClassMap[_status]},React.createElement("strong",null,_status));statusElement=React.createElement(StaticElement,{label:"Status",text:statusText}),"Rejected"===_status&&(rejectReason=React.createElement(StaticElement,{label:"Reason for rejection",text:this.state.formData.rejectedReason}))}var formElements=void 0;return formElements=this.state.userCanEdit?this.createEditableComponents():this.createStaticComponents(),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-md-12 col-lg-12"},React.createElement(FormElement,{name:"viewProject",onSubmit:this.handleSubmit,ref:"form"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-md-3"}),React.createElement("h3",{className:"col-md-9"},this.state.formData.title)),statusElement,rejectReason,formElements,reviewBtn)))}}]),ViewProject}(React.Component);exports.default=ViewProject}});
//# sourceMappingURL=viewProjectIndex.js.map