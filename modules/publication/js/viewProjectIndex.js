!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0)}({0:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var _viewProject=__webpack_require__(27),_viewProject2=_interopRequireDefault(_viewProject),args=QueryString.get(document.currentScript.src);$(function(){var viewProject=React.createElement("div",{className:"page-edit-form"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-md-9 col-lg-7"},React.createElement(_viewProject2.default,{DataURL:loris.BaseURL+"/publication/ajax/getData.php?action=getProjectData&id="+args.id,action:loris.BaseURL+"/publication/ajax/FileUpload.php?action=editProject&id="+args.id}))));ReactDOM.render(viewProject,document.getElementById("lorisworkspace"))})},18:function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),ProgressBar=function(_React$Component){function ProgressBar(){return _classCallCheck(this,ProgressBar),_possibleConstructorReturn(this,(ProgressBar.__proto__||Object.getPrototypeOf(ProgressBar)).apply(this,arguments))}return _inherits(ProgressBar,_React$Component),_createClass(ProgressBar,[{key:"render",value:function(){var progressStyle={display:this.props.value<0?"none":"block",backgroundColor:"#d3d3d3",height:"30px",position:"relative"},labelStyle={position:"absolute",top:0,left:0,zIndex:1e3,width:"100%",color:"#fff",textAlign:"center",lineHeight:"30px",fontWeight:"600"};return React.createElement("div",{className:"progress",style:progressStyle},React.createElement("div",{className:"progress-bar progress-bar-striped active",role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":this.props.value,style:{width:this.props.value+"%"}}),React.createElement("span",{style:labelStyle},this.props.value,"%"))}}]),ProgressBar}(React.Component);ProgressBar.propTypes={value:React.PropTypes.number},ProgressBar.defaultProps={value:0},exports.default=ProgressBar},25:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_ProgressBar=__webpack_require__(18),_ProgressBar2=_interopRequireDefault(_ProgressBar),EmailElement=function(_React$Component){function EmailElement(props){_classCallCheck(this,EmailElement);var _this=_possibleConstructorReturn(this,(EmailElement.__proto__||Object.getPrototypeOf(EmailElement)).call(this,props));return _this.handleChange=_this.handleChange.bind(_this),_this.handleBlur=_this.handleBlur.bind(_this),_this}return _inherits(EmailElement,_React$Component),_createClass(EmailElement,[{key:"handleChange",value:function(e){this.props.onUserInput(this.props.name,e.target.value)}},{key:"handleBlur",value:function(e){this.props.onUserBlur(this.props.name,e.target.value)}},{key:"render",value:function(){var disabled=this.props.disabled?"disabled":null,required=this.props.required?"required":null,errorMessage=null,requiredHTML=null,elementClass="row form-group";return required&&(requiredHTML=React.createElement("span",{className:"text-danger"},"*")),this.props.errorMessage&&(errorMessage=React.createElement("span",null,this.props.errorMessage),elementClass="row form-group has-error"),React.createElement("div",{className:elementClass},React.createElement("label",{className:"col-sm-3 control-label",htmlFor:this.props.id},this.props.label,requiredHTML),React.createElement("div",{className:"col-sm-7"},React.createElement("input",{type:"text",className:"form-control",name:this.props.name,id:this.props.id,value:this.props.value||"",required:required,disabled:disabled,onChange:this.handleChange,onBlur:this.handleBlur}),errorMessage),React.createElement("div",{className:"col-sm-2"},React.createElement("span",null,React.createElement("input",{type:"checkbox",onChange:this.props.toggleEmailNotify,value:this.props.addressee}),React.createElement("span",null,"Send email notification?"))))}}]),EmailElement}(React.Component);EmailElement.defaultProps={name:"",label:"",value:"",addressee:"",id:null,disabled:!1,required:!1,errorMessage:"",onUserInput:function(){console.warn("onUserInput() callback is not set")},onUserBlur:function(){}};var PublicationUploadForm=function(_React$Component2){function PublicationUploadForm(props){_classCallCheck(this,PublicationUploadForm);var _this2=_possibleConstructorReturn(this,(PublicationUploadForm.__proto__||Object.getPrototypeOf(PublicationUploadForm)).call(this,props));return _this2.state={Data:{},formData:{},numFiles:0,uploadResult:null,loadError:void 0,formErrors:{},isLoaded:!1,loadedData:0,uploadProgress:-1,toNotify:[]},_this2.setFormData=_this2.setFormData.bind(_this2),_this2.handleSubmit=_this2.handleSubmit.bind(_this2),_this2.addListItem=_this2.addListItem.bind(_this2),_this2.removeListItem=_this2.removeListItem.bind(_this2),_this2.validateEmail=_this2.validateEmail.bind(_this2),_this2.setFileData=_this2.setFileData.bind(_this2),_this2.createFileFields=_this2.createFileFields.bind(_this2),_this2.toggleEmailNotify=_this2.toggleEmailNotify.bind(_this2),_this2.fetchData=_this2.fetchData.bind(_this2),_this2}return _inherits(PublicationUploadForm,_React$Component2),_createClass(PublicationUploadForm,[{key:"fetchData",value:function(){var self=this;$.ajax(this.props.DataURL,{dataType:"json",success:function(data){console.log(data),self.setState({Data:data,isLoaded:!0})},error:function(data,errorCode,errorMsg){console.error(data,errorCode,errorMsg),self.setState({loadError:"An error occurred when loading the form!"})}})}},{key:"componentDidMount",value:function(){this.fetchData()}},{key:"setFileData",value:function(formElement,value){var numFiles=this.state.numFiles;this.state.formData[formElement]||(numFiles+=1,this.setState({numFiles:numFiles})),this.setFormData(formElement,value)}},{key:"createFileFields",value:function(){for(var fileFields=[],i=0;i<=this.state.numFiles;i++){var fileName="file_"+i;if(fileFields.push(React.createElement(FileElement,{name:fileName,id:"publicationUploadEl",onUserInput:this.setFileData,label:"File to upload",value:this.state.formData[fileName]})),this.state.formData[fileName]){var publicationType="publicationType_"+i,publicationCitation="publicationCitation_"+i,publicationVersion="publicationVersion_"+i;fileFields.push(React.createElement("div",null,React.createElement(SelectElement,{name:publicationType,label:"Publication Type",id:"publicationTypeEl",onUserInput:this.setFormData,value:this.state.formData[publicationType],options:this.state.Data.uploadTypes,required:!0}),React.createElement(TextboxElement,{name:publicationCitation,label:"Citation",onUserInput:this.setFormData,value:this.state.formData[publicationCitation]}),React.createElement(TextboxElement,{name:publicationVersion,label:"Publication Version",onUserInput:this.setFormData,value:this.state.formData[publicationVersion]})))}}return fileFields}},{key:"setFormData",value:function(formElement,value){var formData=this.state.formData;formData[formElement]=value,this.setState({formData:formData})}},{key:"addListItem",value:function(formElement,value,pendingValKey){var formData=this.state.formData,listItems=formData[formElement]||[];listItems.push(value),formData[formElement]=listItems,formData[pendingValKey]=null,this.setState({formData:formData})}},{key:"removeListItem",value:function(formElement,value){var formData=this.state.formData,listItems=formData[formElement],index=listItems.indexOf(value);index>-1&&(listItems.splice(index,1),formData[formElement]=listItems,this.setState({formData:formData}))}},{key:"handleSubmit",value:function(e){e.preventDefault();var formData=this.state.formData,existingTitles=this.state.Data.existingTitles;if(existingTitles.indexOf(formData.title)>-1)return void swal("Publication title already exists!","","error");var formObj=new FormData;for(var key in formData)if(""!==formData[key]){var formVal=void 0;formVal=Array.isArray(formData[key])?JSON.stringify(formData[key]):formData[key],formObj.append(key,formVal)}formObj.append("toNotify",JSON.stringify(this.state.toNotify)),$.ajax({type:"POST",url:this.props.action,data:formObj,cache:!1,contentType:!1,processData:!1,xhr:function(){var xhr=new window.XMLHttpRequest;return xhr.upload.addEventListener("progress",function(evt){if(evt.lengthComputable){var percentage=Math.round(evt.loaded/evt.total*100);this.setState({uploadProgress:percentage})}}.bind(this),!1),xhr}.bind(this),success:function(){this.setState({formData:{},uploadProgress:-1}),swal("Submission Successful!","","success")}.bind(this),error:function(jqXHR,textStatus,errorThrown){console.error(textStatus),swal("Something went wrong!",errorThrown,"error")}})}},{key:"validateEmail",value:function(field,email){var formErrors=this.state.formErrors;""===email||null===email||void 0===email?delete formErrors[field]:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)?delete formErrors[field]:formErrors[field]="Invalid email",this.setState({formErrors:formErrors})}},{key:"toggleEmailNotify",value:function(e){var toNotify=this.state.toNotify,i=toNotify.indexOf(e.target.value);e.target.checked&&i<0?toNotify.push(e.target.value):!e.target.checked&&i>=0&&toNotify.splice(i,1),this.setState({toNotify:toNotify})}},{key:"render",value:function(){if(void 0!==this.state.loadError)return React.createElement("div",{className:"alert alert-danger text-center"},React.createElement("strong",null,this.state.error));if(!this.state.isLoaded)return React.createElement("button",{className:"btn-info has-spinner"},"Loading",React.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"}));var collabEmails=[];this.state.formData.collaborators&&this.state.formData.collaborators.forEach(function(c){var name="collabEmail"+c;collabEmails.push(React.createElement(EmailElement,{name:name,label:c+("s"!==c.slice(-1)?"'s":"'")+" Email",onUserInput:this.setFormData,onUserBlur:this.validateEmail,toggleEmailNotify:this.toggleEmailNotify,errorMessage:this.state.formErrors[name],required:!1,value:this.state.formData[name],addressee:c}))},this);var testNames=[],allVOIs=this.state.Data.allVOIs;allVOIs.forEach(function(v){testNames[v.SourceFrom]||(testNames[v.SourceFrom]=v.SourceFrom)}),testNames.sort();var testFields=allVOIs.map(function(v){return v.Name});testFields.sort();var inst=this.state.formData.voiInst;inst&&(testFields=[],testFields[inst+"_AllFields"]=inst+"_AllFields",allVOIs.forEach(function(v){v.SourceFrom===inst&&(testFields[v.Name]=v.Name)}));var fileFields=this.createFileFields(),createElements=void 0,formClass="col-md-12 col-lg-12";return this.props.editMode||(createElements=[React.createElement("h3",null,"Propose a new project"),React.createElement(TextboxElement,{name:"title",label:"Title",onUserInput:this.setFormData,required:!0,value:this.state.formData.title})],formClass="col-md-8 col-lg-7"),React.createElement("div",{className:"row"},React.createElement("div",{className:formClass},React.createElement(FormElement,{name:"publicationUpload",onSubmit:this.handleSubmit,ref:"form",fileUpload:!0},createElements,React.createElement(TextareaElement,{name:"description",label:"Description",onUserInput:this.setFormData,required:!0,value:this.state.formData.description}),React.createElement(TextboxElement,{name:"leadInvestigator",label:"Lead Investigator",onUserInput:this.setFormData,required:!0,value:this.state.formData.leadInvestigator}),React.createElement(EmailElement,{name:"leadInvestigatorEmail",label:"Lead Investigator Email",onUserInput:this.setFormData,onUserBlur:this.validateEmail,toggleEmailNotify:this.toggleEmailNotify,errorMessage:this.state.formErrors.leadInvestigatorEmail,required:!0,value:this.state.formData.leadInvestigatorEmail,addressee:"leadInvestigator"}),React.createElement(TagsElement,{name:"usersWithEditPerm",id:"usersWithEditPerm",label:"Users with Edit Permission",options:this.state.Data.users,onUserInput:this.setFormData,onUserAdd:this.addListItem,onUserRemove:this.removeListItem,value:this.state.formData.pendingUWEP,pendingValKey:"pendingUWEP",items:this.state.formData.usersWithEditPerm,btnLabel:"Add User"}),React.createElement(TagsElement,{name:"collaborators",id:"collaborators",label:"Collaborators",onUserInput:this.setFormData,onUserAdd:this.addListItem,onUserRemove:this.removeListItem,value:this.state.formData.pendingCollab,pendingValKey:"pendingCollab",items:this.state.formData.collaborators,btnLabel:"Add Collaborator"}),collabEmails,React.createElement(TagsElement,{name:"keywords",id:"keywords",label:"Keywords",onUserInput:this.setFormData,onUserAdd:this.addListItem,onUserRemove:this.removeListItem,value:this.state.formData.pendingKWItem,pendingValKey:"pendingKWItem",items:this.state.formData.keywords,btnLabel:"Add Keyword"}),React.createElement("div",{className:"row form-group"},React.createElement("label",{className:"col-sm-3 control-label"}),React.createElement("div",{className:"col-sm-9"},React.createElement("p",{className:"form-control-static"},React.createElement("strong",null,"Variables of Interest")))),React.createElement(SelectElement,{name:"voiInst",label:"Instrument",id:"voiInst",onUserInput:this.setFormData,required:!1,value:this.state.formData.voiInst,options:testNames}),React.createElement(TagsElement,{name:"voiFields",id:"voiFields",label:"Instrument Fields",onUserInput:this.setFormData,onUserAdd:this.addListItem,onUserRemove:this.removeListItem,required:!1,value:this.state.formData.pendingItemVF,options:testFields,pendingValKey:"pendingItemVF",items:this.state.formData.voiFields,btnLabel:"Add Variable of Interest"}),fileFields,React.createElement(ButtonElement,{label:this.props.editMode?"Submit":"Propose Project"}),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-sm-9 col-sm-offset-3"},React.createElement(_ProgressBar2.default,{value:this.state.uploadProgress}))))))}}]),PublicationUploadForm}(React.Component);exports.default=PublicationUploadForm},27:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_uploadForm=__webpack_require__(25),_uploadForm2=_interopRequireDefault(_uploadForm),ViewProject=function(_React$Component){function ViewProject(props){_classCallCheck(this,ViewProject);var _this=_possibleConstructorReturn(this,(ViewProject.__proto__||Object.getPrototypeOf(ViewProject)).call(this,props));return _this.state={formData:{},isLoaded:!1},_this.handleSubmit=_this.handleSubmit.bind(_this),_this.setFormData=_this.setFormData.bind(_this),_this.createFileDownloadLinks=_this.createFileDownloadLinks.bind(_this),_this.createMenuFilterLinks=_this.createMenuFilterLinks.bind(_this),_this.createVOIElements=_this.createVOIElements.bind(_this),_this.createStaticComponents=_this.createStaticComponents.bind(_this),_this.createEditableComponents=_this.createEditableComponents.bind(_this),_this.addListItem=_this.addListItem.bind(_this),_this.removeListItem=_this.removeListItem.bind(_this),_this}return _inherits(ViewProject,_React$Component),_createClass(ViewProject,[{key:"handleSubmit",value:function(e){e.preventDefault();var formData=this.state.formData,formObj=new FormData;for(var key in formData)if(""!==formData[key]){var formVal;formVal=Array.isArray(formData[key])?JSON.stringify(formData[key]):formData[key],formObj.append(key,formVal)}$.ajax({type:"POST",url:this.props.action,data:formObj,cache:!1,contentType:!1,processData:!1,success:function(){swal("Edit Successful!","","success")}.bind(this),error:function(jqXHR,textStatus){console.error(textStatus)}})}},{key:"componentDidMount",value:function(){var self=this;$.ajax(this.props.DataURL,{dataType:"json",success:function(data){console.log(data);var voiFields=[];for(var inst in data.voi)data.voi.hasOwnProperty(inst)&&data.voi[inst].IsFullSet?voiFields.push(inst+"_AllFields"):voiFields.concat(data.voi.inst.Fields);var formData={title:data.title,description:data.description,leadInvestigator:data.leadInvestigator,leadInvestigatorEmail:data.leadInvestigatorEmail,status:data.status,voiFields:voiFields,keywords:data.keywords,collaborators:data.collaborators};self.setState({formData:formData,statusOpts:data.statusOpts,userCanEdit:data.userCanEdit,allVOIs:data.allVOIs,uploadTypes:data.uploadTypes,files:data.files,voi:data.voi,isLoaded:!0})},error:function(_error,errorCode,errorMsg){console.error(_error,errorCode,errorMsg),self.setState({error:"An error occurred when loading the form!"})}})}},{key:"createFileDownloadLinks",value:function(){var files=this.state.files;return files.map(function(f){var download=loris.BaseURL+"/publication/ajax/FileDownload.php?File="+f;return React.createElement("span",null,React.createElement("a",{href:download},f),";  ")})}},{key:"createMenuFilterLinks",value:function(stringArr,filterVar){var links=[];return stringArr.forEach(function(value){links.push(React.createElement("span",null,React.createElement("a",{href:loris.BaseURL+"/publication/?"+filterVar+"="+value},value),";  "))}),links}},{key:"createVOIElements",value:function(vois){var result=[];return Object.keys(vois).forEach(function(v){var links=this.createMenuFilterLinks(vois[v].Fields,"voi");result.push(React.createElement("div",null,React.createElement("h4",{"data-toggle":"collapse","data-target":"#voi"+v},v,"  ",React.createElement("span",{className:"glyphicon glyphicon-chevron-down"})),React.createElement("div",{id:"voi"+v,className:"collapse"},links)))}.bind(this)),result}},{key:"createStaticComponents",value:function(){var collaborators=void 0,keywords=void 0,vois=void 0,collabLinks=void 0,keywordLinks=void 0,voiLinks=void 0;return this.state.formData.collaborators&&(collabLinks=this.createMenuFilterLinks(this.state.formData.collaborators,"collaborators"),collaborators=React.createElement(StaticElement,{name:"collaborators",label:"Collaborators",text:collabLinks})),this.state.formData.keywords&&(keywordLinks=this.createMenuFilterLinks(this.state.formData.keywords,"keywords"),keywords=React.createElement(StaticElement,{name:"keywords",label:"Keywords",text:keywordLinks})),this.state.voi&&(voiLinks=this.createVOIElements(this.state.voi),vois=React.createElement(StaticElement,{name:"variablesOfInterest",label:"Variables of Interest",text:voiLinks})),React.createElement("div",null,React.createElement(StaticElement,{name:"leadInvestigator",label:"Lead Investigator",text:this.state.formData.leadInvestigator}),React.createElement(StaticElement,{name:"leadInvestigatorEmail",label:"Lead Investigator Email",text:this.state.formData.leadInvestigatorEmail}),collaborators,keywords,vois,React.createElement(StaticElement,{name:"description",label:"Description",text:this.state.formData.description}),React.createElement(StaticElement,{name:"files",label:"Download files",text:this.createFileDownloadLinks()}))}},{key:"createEditableComponents",value:function(){var testNames=[],allVOIs=this.state.allVOIs;allVOIs.forEach(function(v){testNames[v.SourceFrom]||(testNames[v.SourceFrom]=v.SourceFrom)}),testNames.sort();var testFields=[];allVOIs.forEach(function(v){testFields[v.Name]=v.Name}),testFields.sort();var inst=this.state.formData.voiInst;return inst&&(testFields=[],testFields[inst+"_AllFields"]=inst+"_AllFields",allVOIs.forEach(function(v){v.SourceFrom===inst&&(testFields[v.Name]=v.Name)})),React.createElement("div",null,React.createElement(_uploadForm2.default,{DataURL:loris.BaseURL+"/publication/ajax/getData.php?action=getData",action:loris.BaseURL+"/publication/ajax/FileUpload.php?action=editProject",editMode:!0}))}},{key:"addListItem",value:function(formElement,value,pendingValKey){var formData=this.state.formData,listItems=formData[formElement]||[];listItems.push(value),formData[formElement]=listItems,formData[pendingValKey]=null,this.setState({formData:formData})}},{key:"removeListItem",value:function(formElement,value){var formData=this.state.formData,listItems=formData[formElement],index=listItems.indexOf(value);index>-1&&(listItems.splice(index,1),formData[formElement]=listItems,this.setState({formData:formData}))}},{key:"setFormData",value:function(formElement,value){var formData=this.state.formData;formData[formElement]=value,this.setState({formData:formData})}},{key:"render",value:function(){if(!this.state.isLoaded)return React.createElement("button",{className:"btn-info has-spinner"},"Loading",React.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"}));var statusElement=void 0,rejectReason=void 0;if(loris.userHasPermission("publication_approve")){var statusID=this.state.formData.status,status=this.state.statusOpts[statusID];statusElement=React.createElement(SelectElement,{name:"status",label:"Status",id:"status",value:this.state.formData.status,onUserInput:this.setFormData,required:!0,options:this.state.statusOpts,emptyOption:!1}),"Rejected"===status&&(rejectReason=React.createElement(TextboxElement,{name:"rejectReason",label:"Reason for rejection",value:this.state.formData.rejectReason,onUserInput:this.setFormData,required:!0}))}else{var _status=this.state.formData.status,statClassMap={Pending:"text-warning",Approved:"text-success",Rejected:"text-danger"},statusText=React.createElement("span",{className:statClassMap[_status]},React.createElement("strong",null,_status));statusElement=React.createElement(StaticElement,{label:"Status",text:statusText})}var formElements=void 0;return formElements=this.state.userCanEdit?this.createEditableComponents():this.createStaticComponents(),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-md-12 col-lg-12"},React.createElement(FormElement,{name:"viewProject",onSubmit:this.handleSubmit,ref:"form"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-md-3"}),React.createElement("h3",{className:"col-md-9"},this.state.formData.title)),statusElement,rejectReason,formElements)))}}]),ViewProject}(React.Component);exports.default=ViewProject}});
//# sourceMappingURL=viewProjectIndex.js.map