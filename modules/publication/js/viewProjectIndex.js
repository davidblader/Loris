!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0)}({0:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var _viewProject=__webpack_require__(27),_viewProject2=_interopRequireDefault(_viewProject),args=QueryString.get(document.currentScript.src);$(function(){var viewProject=React.createElement("div",{className:"page-edit-form"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-md-9 col-lg-7"},React.createElement(_viewProject2.default,{DataURL:loris.BaseURL+"/publication/ajax/getData.php?action=getProjectData&id="+args.id,action:loris.BaseURL+"/publication/ajax/FileUpload.php?action=editProject&id="+args.id}))));ReactDOM.render(viewProject,document.getElementById("lorisworkspace"))})},27:function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),ViewProject=function(_React$Component){function ViewProject(props){_classCallCheck(this,ViewProject);var _this=_possibleConstructorReturn(this,(ViewProject.__proto__||Object.getPrototypeOf(ViewProject)).call(this,props));return _this.state={formData:{},isLoaded:!1},_this.handleSubmit=_this.handleSubmit.bind(_this),_this.setFormData=_this.setFormData.bind(_this),_this.createFileDownloadLinks=_this.createFileDownloadLinks.bind(_this),_this.createMenuFilterLinks=_this.createMenuFilterLinks.bind(_this),_this.createVOIElements=_this.createVOIElements.bind(_this),_this.createStaticComponents=_this.createStaticComponents.bind(_this),_this.createEditableComponents=_this.createEditableComponents.bind(_this),_this.addListItem=_this.addListItem.bind(_this),_this.removeListItem=_this.removeListItem.bind(_this),_this}return _inherits(ViewProject,_React$Component),_createClass(ViewProject,[{key:"handleSubmit",value:function(e){e.preventDefault();var formData=this.state.formData,formObj=new FormData;for(var key in formData)if(""!==formData[key]){var formVal;formVal=Array.isArray(formData[key])?JSON.stringify(formData[key]):formData[key],formObj.append(key,formVal)}$.ajax({type:"POST",url:this.props.action,data:formObj,cache:!1,contentType:!1,processData:!1,success:function(){swal("Edit Successful!","","success")}.bind(this),error:function(jqXHR,textStatus){console.error(textStatus)}})}},{key:"componentDidMount",value:function(){var self=this;$.ajax(this.props.DataURL,{dataType:"json",success:function(data){console.log(data);var voiFields=[];for(var inst in data.voi)data.voi.hasOwnProperty(inst)&&data.voi[inst].IsFullSet?voiFields.push(inst+"_AllFields"):voiFields.concat(data.voi.inst.Fields);var formData={title:data.title,description:data.description,leadInvestigator:data.leadInvestigator,leadInvestigatorEmail:data.leadInvestigatorEmail,status:data.status,voiFields:voiFields,keywords:data.keywords,collaborators:data.collaborators};self.setState({formData:formData,statusOpts:data.statusOpts,userCanEdit:data.userCanEdit,allVOIs:data.allVOIs,uploadTypes:data.uploadTypes,files:data.files,voi:data.voi,isLoaded:!0})},error:function(_error,errorCode,errorMsg){console.error(_error,errorCode,errorMsg),self.setState({error:"An error occurred when loading the form!"})}})}},{key:"createFileDownloadLinks",value:function(){var files=this.state.files;return files.map(function(f){var download=loris.BaseURL+"/publication/ajax/FileDownload.php?File="+f;return React.createElement("span",null,React.createElement("a",{href:download},f),";  ")})}},{key:"createMenuFilterLinks",value:function(stringArr,filterVar){var links=[];return stringArr.forEach(function(value){links.push(React.createElement("span",null,React.createElement("a",{href:loris.BaseURL+"/publication/?"+filterVar+"="+value},value),";  "))}),links}},{key:"createVOIElements",value:function(vois){var result=[];return Object.keys(vois).forEach(function(v){var links=this.createMenuFilterLinks(vois[v].Fields,"voi");result.push(React.createElement("div",null,React.createElement("h4",{"data-toggle":"collapse","data-target":"#voi"+v},v,"  ",React.createElement("span",{className:"glyphicon glyphicon-chevron-down"})),React.createElement("div",{id:"voi"+v,className:"collapse"},links)))}.bind(this)),result}},{key:"createStaticComponents",value:function(){var collaborators=void 0,keywords=void 0,vois=void 0,collabLinks=void 0,keywordLinks=void 0,voiLinks=void 0;return this.state.formData.collaborators&&(collabLinks=this.createMenuFilterLinks(this.state.formData.collaborators,"collaborators"),collaborators=React.createElement(StaticElement,{name:"collaborators",label:"Collaborators",text:collabLinks})),this.state.formData.keywords&&(keywordLinks=this.createMenuFilterLinks(this.state.formData.keywords,"keywords"),keywords=React.createElement(StaticElement,{name:"keywords",label:"Keywords",text:keywordLinks})),this.state.voi&&(voiLinks=this.createVOIElements(this.state.voi),vois=React.createElement(StaticElement,{name:"variablesOfInterest",label:"Variables of Interest",text:voiLinks})),React.createElement("div",null,React.createElement(StaticElement,{name:"leadInvestigator",label:"Lead Investigator",text:this.state.formData.leadInvestigator}),React.createElement(StaticElement,{name:"leadInvestigatorEmail",label:"Lead Investigator Email",text:this.state.formData.leadInvestigatorEmail}),collaborators,keywords,vois,React.createElement(StaticElement,{name:"description",label:"Description",text:this.state.formData.description}),React.createElement(StaticElement,{name:"files",label:"Download files",text:this.createFileDownloadLinks()}))}},{key:"createEditableComponents",value:function(){var testNames=[],allVOIs=this.state.allVOIs;allVOIs.forEach(function(v){testNames[v.SourceFrom]||(testNames[v.SourceFrom]=v.SourceFrom)}),testNames.sort();var testFields=[];allVOIs.forEach(function(v){testFields[v.Name]=v.Name}),testFields.sort();var inst=this.state.formData.voiInst;return inst&&(testFields=[],testFields[inst+"_AllFields"]=inst+"_AllFields",allVOIs.forEach(function(v){v.SourceFrom===inst&&(testFields[v.Name]=v.Name)})),React.createElement("div",null,React.createElement(TextareaElement,{name:"description",label:"Description",onUserInput:this.setFormData,required:!0,value:this.state.formData.description}),React.createElement(TextboxElement,{name:"leadInvestigator",label:"Lead Investigator",onUserInput:this.setFormData,required:!0,value:this.state.formData.leadInvestigator}),React.createElement(TextboxElement,{name:"leadInvestigatorEmail",label:"Lead Investigator Email",onUserInput:this.setFormData,required:!0,value:this.state.formData.leadInvestigatorEmail}),React.createElement(TagsElement,{name:"collaborators",label:"Collaborators",id:"collaborators",onUserInput:this.setFormData,onUserAdd:this.addListItem,onUserRemove:this.removeListItem,required:!1,value:this.state.formData.pendingCollab,pendingValKey:"pendingCollab",items:this.state.formData.collaborators,btnLabel:"Add Collaborator"}),React.createElement(TagsElement,{name:"keywords",label:"Keywords",id:"keywords",onUserInput:this.setFormData,onUserAdd:this.addListItem,onUserRemove:this.removeListItem,required:!1,allowDupl:!1,value:this.state.formData.pendingKWItem,pendingValKey:"pendingKWItem",items:this.state.formData.keywords,btnLabel:"Add Keyword"}),React.createElement("div",{className:"row form-group"},React.createElement("label",{className:"col-sm-3 control-label"}),React.createElement("div",{className:"col-sm-9"},React.createElement("p",{className:"form-control-static"},React.createElement("strong",null,"Variables of Interest")))),React.createElement(SelectElement,{name:"voiInst",label:"Instrument",id:"voiInst",onUserInput:this.setFormData,required:!1,value:this.state.formData.voiInst,options:testNames}),React.createElement(TagsElement,{name:"voiFields",label:"Instrument Fields",id:"voiFields",onUserInput:this.setFormData,onUserAdd:this.addListItem,onUserRemove:this.removeListItem,required:!1,value:this.state.formData.pendingItemVF,options:testFields,pendingValKey:"pendingItemVF",items:this.state.formData.voiFields,btnLabel:"Add Variable of Interest"}))}},{key:"addListItem",value:function(formElement,value,pendingValKey){var formData=this.state.formData,listItems=formData[formElement]||[];listItems.push(value),formData[formElement]=listItems,formData[pendingValKey]=null,this.setState({formData:formData})}},{key:"removeListItem",value:function(formElement,value){var formData=this.state.formData,listItems=formData[formElement],index=listItems.indexOf(value);index>-1&&(listItems.splice(index,1),formData[formElement]=listItems,this.setState({formData:formData}))}},{key:"setFormData",value:function(formElement,value){var formData=this.state.formData;formData[formElement]=value,this.setState({formData:formData})}},{key:"render",value:function(){if(!this.state.isLoaded)return React.createElement("button",{className:"btn-info has-spinner"},"Loading",React.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"}));var statusElement=void 0,rejectReason=void 0;if(loris.userHasPermission("publication_approve"))statusElement=React.createElement(SelectElement,{name:"status",label:"Status",id:"status",value:this.state.formData.status,onUserInput:this.setFormData,required:!0,options:this.state.statusOpts,emptyOption:!1}),"Rejected"===this.state.formData.status&&(rejectReason=React.createElement(TextboxElement,{name:"rejectReason",label:"Reason for rejection",value:this.state.formData.status,onUserInput:this.setFormData,required:!0}));else{var statClassMap={Pending:"text-warning",Approved:"text-success",Rejected:"text-danger"},s=this.state.formData.status,statusText=React.createElement("span",{className:statClassMap[s]},React.createElement("strong",null,s));statusElement=React.createElement(StaticElement,{label:"Status",text:statusText})}var formElements=void 0;formElements=this.state.userCanEdit?this.createEditableComponents():this.createStaticComponents();var submitBtn=void 0;return(loris.userHasPermission("publication_approve")||this.state.userCanEdit)&&(submitBtn=React.createElement(ButtonElement,{name:"Submit"})),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-md-12 col-lg-12"},React.createElement(FormElement,{name:"viewProject",onSubmit:this.handleSubmit,ref:"form"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-md-3"}),React.createElement("h3",{className:"col-md-9"},this.state.formData.title)),statusElement,rejectReason,formElements,submitBtn)))}}]),ViewProject}(React.Component);exports.default=ViewProject}});
//# sourceMappingURL=viewProjectIndex.js.map