!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0)}({0:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_FilterForm=__webpack_require__(13),_FilterForm2=_interopRequireDefault(_FilterForm),_Tabs=__webpack_require__(9),_uploadForm=__webpack_require__(25),_uploadForm2=_interopRequireDefault(_uploadForm),_columnFormatter=__webpack_require__(27),_columnFormatter2=_interopRequireDefault(_columnFormatter),PublicationIndex=function(_React$Component){function PublicationIndex(){_classCallCheck(this,PublicationIndex);var _this=_possibleConstructorReturn(this,(PublicationIndex.__proto__||Object.getPrototypeOf(PublicationIndex)).call(this));return loris.hiddenHeaders=["Description","Keywords","Variables Of Interest","Publication ID"],_this.state={isLoaded:!1,filter:{}},_this.fetchData=_this.fetchData.bind(_this),_this.updateFilter=_this.updateFilter.bind(_this),_this.resetFilters=_this.resetFilters.bind(_this),_this}return _inherits(PublicationIndex,_React$Component),_createClass(PublicationIndex,[{key:"componentDidMount",value:function(){this.fetchData()}},{key:"fetchData",value:function(){$.ajax(this.props.DataURL,{method:"GET",dataType:"json",success:function(data){this.setState({Data:data,isLoaded:!0})}.bind(this),error:function(_error){console.error(_error)}})}},{key:"updateFilter",value:function(filter){this.setState({filter:filter})}},{key:"resetFilters",value:function(){this.publicationsFilter.clearFilter()}},{key:"render",value:function(){if(!this.state.isLoaded)return React.createElement("button",{className:"btn-info has-spinner"},"Loading",React.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"}));var tabList=[{id:"browse",label:"Browse"}],proposalTab=void 0;loris.userHasPermission("publication_propose")&&(tabList.push({id:"propose",label:"Propose a Project"}),proposalTab=React.createElement(_Tabs.TabPane,{TabId:tabList[1].id},React.createElement(_uploadForm2.default,{DataURL:loris.BaseURL+"/publication/ajax/getData.php?action=getData",action:loris.BaseURL+"/publication/ajax/FileUpload.php?action=upload",editMode:!1})));var filterRef=function(f){this.publicationsFilter=f}.bind(this);return React.createElement(_Tabs.Tabs,{tabs:tabList,defaultTab:"browse",updateURL:!0},React.createElement(_Tabs.TabPane,{TabId:tabList[0].id},React.createElement(_FilterForm2.default,{Module:"publication",name:"publications_filter",id:"publications_filter_form",ref:filterRef,columns:3,formElements:this.state.Data.form,onUpdate:this.updateFilter,filter:this.state.filter},React.createElement("br",null),React.createElement(ButtonElement,{label:"Clear Filters",type:"reset",onUserInput:this.resetFilters})),React.createElement(StaticDataTable,{Data:this.state.Data.Data,Headers:this.state.Data.Headers,Filter:this.state.filter,getFormattedCell:_columnFormatter2.default})),proposalTab)}}]),PublicationIndex}(React.Component);$(function(){var publicationIndex=React.createElement("div",{className:"page-publications"},React.createElement(PublicationIndex,{DataURL:loris.BaseURL+"/publication/?format=json"}));ReactDOM.render(publicationIndex,document.getElementById("lorisworkspace"))})},2:function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Panel=function(_React$Component){function Panel(props){_classCallCheck(this,Panel);var _this=_possibleConstructorReturn(this,(Panel.__proto__||Object.getPrototypeOf(Panel)).call(this,props));return _this.state={collapsed:_this.props.initCollapsed},_this.panelClass=_this.props.initCollapsed?"panel-collapse collapse":"panel-collapse collapse in",_this.toggleCollapsed=_this.toggleCollapsed.bind(_this),_this}return _inherits(Panel,_React$Component),_createClass(Panel,[{key:"toggleCollapsed",value:function(){this.setState({collapsed:!this.state.collapsed})}},{key:"render",value:function(){var glyphClass=this.state.collapsed?"glyphicon pull-right glyphicon-chevron-down":"glyphicon pull-right glyphicon-chevron-up",panelHeading=this.props.title?React.createElement("div",{className:"panel-heading",onClick:this.toggleCollapsed,"data-toggle":"collapse","data-target":"#"+this.props.id,style:{cursor:"pointer"}},this.props.title,React.createElement("span",{className:glyphClass})):"";return React.createElement("div",{className:"panel panel-primary"},panelHeading,React.createElement("div",{id:this.props.id,className:this.panelClass,role:"tabpanel"},React.createElement("div",{className:"panel-body",style:{height:this.props.height}},this.props.children)))}}]),Panel}(React.Component);Panel.propTypes={id:React.PropTypes.string,height:React.PropTypes.string,title:React.PropTypes.string},Panel.defaultProps={initCollapsed:!1,id:"default-panel",height:"100%"},exports.default=Panel},9:function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Tabs=function(_React$Component){function Tabs(props){_classCallCheck(this,Tabs);var _this=_possibleConstructorReturn(this,(Tabs.__proto__||Object.getPrototypeOf(Tabs)).call(this,props)),hash=window.location.hash,activeTab="";return _this.props.updateURL&&hash?activeTab=hash.substr(1):_this.props.defaultTab?activeTab=_this.props.defaultTab:_this.props.tabs.length>0&&(activeTab=_this.props.tabs[0].id),_this.state={activeTab:activeTab},_this.handleClick=_this.handleClick.bind(_this),_this.getTabs=_this.getTabs.bind(_this),_this.getTabPanes=_this.getTabPanes.bind(_this),_this}return _inherits(Tabs,_React$Component),_createClass(Tabs,[{key:"handleClick",value:function(tabId,e){if(this.setState({activeTab:tabId}),this.props.onTabChange(tabId),this.props.updateURL){var scrollDistance=$("body").scrollTop()||$("html").scrollTop();window.location.hash=e.target.hash,$("html,body").scrollTop(scrollDistance)}}},{key:"getTabs",value:function(){var tabs=this.props.tabs.map(function(tab){var tabClass=this.state.activeTab===tab.id?"active":null,href="#"+tab.id,tabID="tab-"+tab.id;return React.createElement("li",{role:"presentation",className:tabClass,key:tab.id},React.createElement("a",{id:tabID,href:href,role:"tab","data-toggle":"tab",onClick:this.handleClick.bind(null,tab.id)},tab.label))}.bind(this));return tabs}},{key:"getTabPanes",value:function(){var tabPanes=React.Children.map(this.props.children,function(child,key){if(child)return React.cloneElement(child,{activeTab:this.state.activeTab,key:key})}.bind(this));return tabPanes}},{key:"render",value:function(){var tabs=this.getTabs(),tabPanes=this.getTabPanes(),tabStyle={marginLeft:0,marginBottom:"5px"};return React.createElement("div",null,React.createElement("ul",{className:"nav nav-tabs",role:"tablist",style:tabStyle},tabs),React.createElement("div",{className:"tab-content"},tabPanes))}}]),Tabs}(React.Component);Tabs.propTypes={tabs:React.PropTypes.array.isRequired,defaultTab:React.PropTypes.string,updateURL:React.PropTypes.bool},Tabs.defaultProps={onTabChange:function(){},updateURL:!0};var VerticalTabs=function(_React$Component2){function VerticalTabs(props){_classCallCheck(this,VerticalTabs);var _this2=_possibleConstructorReturn(this,(VerticalTabs.__proto__||Object.getPrototypeOf(VerticalTabs)).call(this,props)),hash=window.location.hash,activeTab="";return _this2.props.updateURL&&hash?activeTab=hash.substr(1):_this2.props.defaultTab?activeTab=_this2.props.defaultTab:_this2.props.tabs.length>0&&(activeTab=_this2.props.tabs[0].id),_this2.state={activeTab:activeTab},_this2.handleClick=_this2.handleClick.bind(_this2),_this2.getTabs=_this2.getTabs.bind(_this2),_this2.getTabPanes=_this2.getTabPanes.bind(_this2),_this2}return _inherits(VerticalTabs,_React$Component2),_createClass(VerticalTabs,[{key:"handleClick",value:function(tabId,e){if(this.setState({activeTab:tabId}),this.props.onTabChange(tabId),this.props.updateURL){var scrollDistance=$("body").scrollTop()||$("html").scrollTop();window.location.hash=e.target.hash,$("html,body").scrollTop(scrollDistance)}}},{key:"getTabs",value:function(){var tabs=this.props.tabs.map(function(tab){var tabClass=this.state.activeTab===tab.id?"active":null,href="#"+tab.id,tabID="tab-"+tab.id;return React.createElement("li",{role:"presentation",className:tabClass,key:tab.id},React.createElement("a",{id:tabID,href:href,role:"tab","data-toggle":"tab",onClick:this.handleClick.bind(null,tab.id)},tab.label))}.bind(this));return tabs}},{key:"getTabPanes",value:function(){var tabPanes=React.Children.map(this.props.children,function(child,key){if(child)return React.cloneElement(child,{activeTab:this.state.activeTab,key:key})}.bind(this));return tabPanes}},{key:"render",value:function(){var tabs=this.getTabs(),tabPanes=this.getTabPanes(),tabStyle={marginLeft:0,marginBottom:"5px"};return React.createElement("div",null,React.createElement("div",{className:"tabbable col-md-3 col-sm-3"},React.createElement("ul",{className:"nav nav-pills nav-stacked",role:"tablist",style:tabStyle},tabs)),React.createElement("div",{className:"tab-content col-md-9 col-sm-9"},tabPanes))}}]),VerticalTabs}(React.Component);VerticalTabs.propTypes={tabs:React.PropTypes.array.isRequired,defaultTab:React.PropTypes.string,updateURL:React.PropTypes.bool},VerticalTabs.defaultProps={onTabChange:function(){},updateURL:!0};var TabPane=function(_React$Component3){function TabPane(){return _classCallCheck(this,TabPane),_possibleConstructorReturn(this,(TabPane.__proto__||Object.getPrototypeOf(TabPane)).apply(this,arguments))}return _inherits(TabPane,_React$Component3),_createClass(TabPane,[{key:"render",value:function(){var classList="tab-pane",title=void 0;return this.props.TabId===this.props.activeTab&&(classList+=" active"),this.props.Title&&(title=React.createElement("h1",null,this.props.Title)),React.createElement("div",{role:"tabpanel",className:classList,id:this.props.TabId},title,this.props.children)}}]),TabPane}(React.Component);TabPane.propTypes={TabId:React.PropTypes.string.isRequired,Title:React.PropTypes.string,activeTab:React.PropTypes.string},exports.Tabs=Tabs,exports.VerticalTabs=VerticalTabs,exports.TabPane=TabPane},13:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_Panel=__webpack_require__(2),_Panel2=_interopRequireDefault(_Panel),FilterForm=function(_React$Component){function FilterForm(props){_classCallCheck(this,FilterForm);var _this=_possibleConstructorReturn(this,(FilterForm.__proto__||Object.getPrototypeOf(FilterForm)).call(this,props));return _this.clearFilter=_this.clearFilter.bind(_this),_this.getFormChildren=_this.getFormChildren.bind(_this),_this.setFilter=_this.setFilter.bind(_this),_this.onElementUpdate=_this.onElementUpdate.bind(_this),_this.queryString=QueryString.get(),_this}return _inherits(FilterForm,_React$Component),_createClass(FilterForm,[{key:"componentDidMount",value:function(){var filter={},queryString=this.queryString;Object.keys(queryString).forEach(function(key){var filterKey="candidateID"===key?"candID":key;filter[filterKey]={value:queryString[key],exactMatch:!1}}),this.props.onUpdate(filter)}},{key:"clearFilter",value:function(){this.queryString=QueryString.clear(this.props.Module),this.props.onUpdate({})}},{key:"getFormChildren",value:function(){var formChildren=[];return React.Children.forEach(this.props.children,function(child,key){if(React.isValidElement(child)&&"function"==typeof child.type&&child.props.onUserInput){var callbackFunc=child.props.onUserInput,callbackName=callbackFunc.name,elementName=child.type.displayName,queryFieldName="candID"===child.props.name?"candidateID":child.props.name,filterValue=this.queryString[queryFieldName];"onUserInput"===callbackName&&(callbackFunc="ButtonElement"===elementName&&"reset"===child.props.type?this.clearFilter:this.onElementUpdate.bind(null,elementName)),formChildren.push(React.cloneElement(child,{onUserInput:callbackFunc,value:filterValue?filterValue:"",key:key})),this.setFilter(elementName,child.props.name,filterValue)}else formChildren.push(React.cloneElement(child,{key:key}))}.bind(this)),formChildren}},{key:"setFilter",value:function(type,key,value){var filter={};return this.props.filter&&(filter=JSON.parse(JSON.stringify(this.props.filter))),key?(filter[key]={},0===value.length?filter[key].value="":key&&value&&(filter[key].value=value),filter[key].exactMatch="SelectElement"===type):filter&&key&&""===value&&delete filter[key],filter}},{key:"onElementUpdate",value:function(type,fieldName,fieldValue){if("string"==typeof fieldName&&("string"==typeof fieldValue||"object"===("undefined"==typeof fieldValue?"undefined":_typeof(fieldValue)))){var queryFieldName="candID"===fieldName?"candidateID":fieldName;this.queryString=QueryString.set(this.queryString,queryFieldName,fieldValue);var filter=this.setFilter(type,fieldName,fieldValue);this.props.onUpdate(filter)}}},{key:"render",value:function(){var formChildren=this.getFormChildren(),formElements=this.props.formElements;return formElements&&Object.keys(formElements).forEach(function(fieldName){var queryFieldName="candID"===fieldName?"candidateID":fieldName;formElements[fieldName].onUserInput=this.onElementUpdate.bind(null,fieldName),formElements[fieldName].value=this.queryString[queryFieldName]}.bind(this)),React.createElement(_Panel2.default,{id:this.props.id,height:this.props.height,title:this.props.title},React.createElement(FormElement,this.props,formChildren))}}]),FilterForm}(React.Component);FilterForm.defaultProps={id:"selection-filter",height:"100%",title:"Selection Filter",onUpdate:function(){console.warn("onUpdate() callback is not set!")}},FilterForm.propTypes={Module:React.PropTypes.string.isRequired,filter:React.PropTypes.object.isRequired,id:React.PropTypes.string,height:React.PropTypes.string,title:React.PropTypes.string,onUpdate:React.PropTypes.func},exports.default=FilterForm},25:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_projectFields=__webpack_require__(26),_projectFields2=_interopRequireDefault(_projectFields),PublicationUploadForm=function(_React$Component){function PublicationUploadForm(props){_classCallCheck(this,PublicationUploadForm);var _this=_possibleConstructorReturn(this,(PublicationUploadForm.__proto__||Object.getPrototypeOf(PublicationUploadForm)).call(this,props));return _this.state={Data:{},formData:{},numFiles:0,uploadResult:null,loadError:void 0,formErrors:{},isLoaded:!1,loadedData:0,uploadProgress:-1,toNotify:[]},_this.setFormData=_this.setFormData.bind(_this),_this.handleSubmit=_this.handleSubmit.bind(_this),_this.addListItem=_this.addListItem.bind(_this),_this.removeListItem=_this.removeListItem.bind(_this),_this.validateEmail=_this.validateEmail.bind(_this),_this.setFileData=_this.setFileData.bind(_this),_this.fetchData=_this.fetchData.bind(_this),_this}return _inherits(PublicationUploadForm,_React$Component),_createClass(PublicationUploadForm,[{key:"validateEmail",value:function(field,email){var formErrors=this.state.formErrors;""===email||null===email||void 0===email?delete formErrors[field]:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)?delete formErrors[field]:formErrors[field]="Invalid email",this.setState({formErrors:formErrors})}},{key:"fetchData",value:function(){var self=this;$.ajax(this.props.DataURL,{dataType:"json",success:function(data){console.log(data),self.setState({Data:data,isLoaded:!0})},error:function(data,errorCode,errorMsg){console.error(data,errorCode,errorMsg),self.setState({loadError:"An error occurred when loading the form!"})}})}},{key:"componentDidMount",value:function(){this.fetchData()}},{key:"setFileData",value:function(formElement,value){var numFiles=this.state.numFiles;this.state.formData[formElement]||(numFiles+=1,this.setState({numFiles:numFiles})),this.setFormData(formElement,value)}},{key:"setFormData",value:function(formElement,value){var formData=this.state.formData;formData[formElement]=value,this.setState({formData:formData})}},{key:"addListItem",value:function(formElement,value,pendingValKey){var formData=this.state.formData,listItems=formData[formElement]||[];listItems.push(value),formData[formElement]=listItems,formData[pendingValKey]=null,this.setState({formData:formData})}},{key:"removeListItem",value:function(formElement,value){var formData=this.state.formData,listItems=formData[formElement],index=listItems.indexOf(value);index>-1&&(listItems.splice(index,1),formData[formElement]=listItems,this.setState({formData:formData}))}},{key:"handleSubmit",value:function(e){e.preventDefault();var formData=this.state.formData,existingTitles=this.state.Data.existingTitles;if(existingTitles.indexOf(formData.title)>-1)return void swal("Publication title already exists!","","error");var formObj=new FormData;for(var key in formData)if(""!==formData[key]){var formVal=void 0;formVal=Array.isArray(formData[key])?JSON.stringify(formData[key]):formData[key],formObj.append(key,formVal)}formObj.append("toNotify",JSON.stringify(this.state.toNotify)),$.ajax({type:"POST",url:this.props.action,data:formObj,cache:!1,contentType:!1,processData:!1,xhr:function(){var xhr=new window.XMLHttpRequest;return xhr.upload.addEventListener("progress",function(evt){if(evt.lengthComputable){var percentage=Math.round(evt.loaded/evt.total*100);this.setState({uploadProgress:percentage})}}.bind(this),!1),xhr}.bind(this),success:function(){this.setState({formData:{},numFiles:0,uploadProgress:-1}),swal("Submission Successful!","","success")}.bind(this),error:function(jqXHR,textStatus,errorThrown){console.error(textStatus),swal("Something went wrong!",jqXHR.responseText,"error")}})}},{key:"render",value:function(){if(void 0!==this.state.loadError)return React.createElement("div",{className:"alert alert-danger text-center"},React.createElement("strong",null,this.state.error));if(!this.state.isLoaded)return React.createElement("button",{className:"btn-info has-spinner"},"Loading",React.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"}));var createElements=void 0,formClass="col-md-12 col-lg-12";return this.props.editMode||(createElements=[React.createElement("h3",{className:"col-md-offset-3 col-lg-offset-3"},"Propose a new project"),React.createElement(TextboxElement,{name:"title",label:"Title",onUserInput:this.setFormData,required:!0,value:this.state.formData.title})],formClass="col-md-8 col-lg-7"),React.createElement("div",{className:"row"},React.createElement("div",{className:formClass},React.createElement(FormElement,{name:"publicationUpload",onSubmit:this.handleSubmit,ref:"form",fileUpload:!0},createElements,React.createElement(_projectFields2.default,{formData:this.state.formData,formErrors:this.state.formErrors,numFiles:this.state.numFiles,setFormData:this.setFormData,setFileData:this.setFileData,addListItem:this.addListItem,removeListItem:this.removeListItem,validateEmail:this.validateEmail,toggleEmailNotify:this.toggleEmailNotify,uploadTypes:this.state.Data.uploadTypes,users:this.state.Data.users,allVOIs:this.state.Data.allVOIs,editMode:!1}))))}}]),PublicationUploadForm}(React.Component);exports.default=PublicationUploadForm},26:function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),EmailElement=function(_React$Component){function EmailElement(){_classCallCheck(this,EmailElement);var _this=_possibleConstructorReturn(this,(EmailElement.__proto__||Object.getPrototypeOf(EmailElement)).call(this));return _this.handleChange=_this.handleChange.bind(_this),_this.handleBlur=_this.handleBlur.bind(_this),_this}return _inherits(EmailElement,_React$Component),_createClass(EmailElement,[{key:"handleChange",value:function(e){this.props.onUserInput(this.props.name,e.target.value)}},{key:"handleBlur",value:function(e){this.props.onUserBlur(this.props.name,e.target.value)}},{key:"render",value:function(){var disabled=this.props.disabled?"disabled":null,required=this.props.required?"required":null,errorMessage=null,requiredHTML=null,elementClass="row form-group";return required&&(requiredHTML=React.createElement("span",{className:"text-danger"},"*")),this.props.errorMessage&&(errorMessage=React.createElement("span",null,this.props.errorMessage),elementClass="row form-group has-error"),React.createElement("div",{className:elementClass},React.createElement("label",{className:"col-sm-3 control-label",htmlFor:this.props.id},this.props.label,requiredHTML),React.createElement("div",{className:"col-sm-7"},React.createElement("input",{type:"text",className:"form-control",name:this.props.name,id:this.props.id,value:this.props.value||"",required:required,disabled:disabled,onChange:this.handleChange,onBlur:this.handleBlur}),errorMessage),React.createElement("div",{className:"col-sm-2"},React.createElement("span",null,React.createElement("input",{type:"checkbox",onChange:this.props.toggleEmailNotify,value:this.props.addressee}),React.createElement("span",null,"Send email notification?"))))}}]),EmailElement}(React.Component);EmailElement.defaultProps={name:"",label:"",value:"",addressee:"",id:null,disabled:!1,required:!1,errorMessage:"",onUserInput:function(){console.warn("onUserInput() callback is not set")},onUserBlur:function(){}};var ProjectFormFields=function(_React$Component2){function ProjectFormFields(){_classCallCheck(this,ProjectFormFields);var _this2=_possibleConstructorReturn(this,(ProjectFormFields.__proto__||Object.getPrototypeOf(ProjectFormFields)).call(this));return _this2.createCollabEmailFields=_this2.createCollabEmailFields.bind(_this2),_this2.deleteUpload=_this2.deleteUpload.bind(_this2),_this2.createFileFields=_this2.createFileFields.bind(_this2),_this2.addCollaborator=_this2.addCollaborator.bind(_this2),_this2.removeCollaborator=_this2.removeCollaborator.bind(_this2),_this2.setCollaboratorEmail=_this2.setCollaboratorEmail.bind(_this2),_this2.toggleEmailNotify=_this2.toggleEmailNotify.bind(_this2),_this2}return _inherits(ProjectFormFields,_React$Component2),_createClass(ProjectFormFields,[{key:"deleteUpload",value:function(uploadID){swal({title:"Are you sure?",text:"Are you sure you want to delete this file?",type:"warning",showCancelButton:!0,confirmButtonText:"Yes, I am sure!",cancelButtonText:"No, cancel it!"},function(willDelete){if(willDelete){var url=loris.BaseURL+"/publication/ajax/deleteUpload.php?uploadID="+uploadID;$.ajax(url,{method:"DELETE"})}})}},{key:"createFileFields",value:function(){var fileFields=[];this.props.files&&this.props.files.forEach(function(f){var _this3=this,downloadURL=loris.BaseURL+"/publication/ajax/FileDownload.php?File="+encodeURIComponent(f.URL),link=React.createElement("span",null,React.createElement("a",{href:downloadURL},f.URL),"  ",React.createElement("span",{className:"glyphicon glyphicon-remove",onClick:function(){return _this3.deleteUpload(f.PublicationUploadID)}})),existFileFlag="existingUpload_",pubType=existFileFlag+"publicationType_"+f.PublicationUploadID,pubCit=existFileFlag+"publicationCitation_"+f.PublicationUploadID,pubVer=existFileFlag+"publicationVersion_"+f.PublicationUploadID,pubTypeStr=this.props.uploadTypes[this.props.formData[pubType]];fileFields.push(React.createElement("div",null,React.createElement(StaticElement,{label:pubTypeStr,text:link}),React.createElement(TextboxElement,{name:pubCit,label:"Citation",onUserInput:this.props.setFormData,value:this.props.formData[pubCit]}),React.createElement(TextboxElement,{name:pubVer,label:"Publication Version",onUserInput:this.props.setFormData,value:this.props.formData[pubVer]
})))},this);for(var i=0;i<=this.props.numFiles;i++){var fileName="file_"+i;if(fileFields.push(React.createElement(FileElement,{name:fileName,id:"publicationUploadEl_"+i,onUserInput:this.props.setFileData,label:"File to upload",value:this.props.formData[fileName]})),this.props.formData[fileName]){var publicationType="publicationType_"+i,publicationCitation="publicationCitation_"+i,publicationVersion="publicationVersion_"+i;fileFields.push(React.createElement("div",null,React.createElement(SelectElement,{name:publicationType,label:"Publication Type",onUserInput:this.props.setFormData,value:this.props.formData[publicationType],options:this.props.uploadTypes,required:!0}),React.createElement(TextboxElement,{name:publicationCitation,label:"Citation",onUserInput:this.props.setFormData,value:this.props.formData[publicationCitation]}),React.createElement(TextboxElement,{name:publicationVersion,label:"Publication Version",onUserInput:this.props.setFormData,value:this.props.formData[publicationVersion]})))}}return fileFields}},{key:"createCollabEmailFields",value:function(){var collabEmails=[];return this.props.formData.collaborators&&this.props.formData.collaborators.forEach(function(c,i){var name="collabEmail_"+c.name;collabEmails.push(React.createElement(EmailElement,{name:name,label:c.name+("s"===c.name.slice(-1)?"'":"'s")+" Email",onUserInput:this.setCollaboratorEmail,onUserBlur:this.props.validateEmail,toggleEmailNotify:this.toggleEmailNotify,errorMessage:this.props.formErrors[name],required:!1,value:this.props.formData.collaborators[i].email,addressee:c.name}))},this),collabEmails}},{key:"addCollaborator",value:function(formElement,value,pendingValKey){var collaborators=this.props.formData.collaborators||[];collaborators.push({name:value,email:null,notify:!1}),this.props.setFormData("collaborators",collaborators),this.props.setFormData(pendingValKey,null)}},{key:"removeCollaborator",value:function(formElement,value){var collaborators=this.props.formData.collaborators||[];collaborators=collaborators.filter(function(c){return c.name!==value}),this.props.setFormData("collaborators",collaborators)}},{key:"setCollaboratorEmail",value:function(formElement,value){var collabName=formElement.split("_")[1];console.log(formElement);var collaborators=this.props.formData.collaborators,i=collaborators.findIndex(function(c){return c.name===collabName});collaborators[i].email=value,this.props.setFormData("collaborators",collaborators)}},{key:"toggleEmailNotify",value:function(e){var collaborators=this.props.formData.collaborators,collabName=e.target.value,i=collaborators.findIndex(function(c){return c.name===collabName});collaborators[i].notify=!collaborators[i].notify,this.props.setFormData("collaborators",collaborators)}},{key:"render",value:function(){var collabEmails=this.createCollabEmailFields(),fileFields=this.createFileFields(),voiHelp=React.createElement("div",null,"For help finding variables of interest, consult the ",React.createElement("a",{href:loris.BaseURL+"/datadict/"},"Data Dictionary")),collabNames=[];return this.props.formData.collaborators&&(collabNames=this.props.formData.collaborators.map(function(c){return c.name})),React.createElement("div",null,React.createElement(TextareaElement,{name:"description",label:"Description",onUserInput:this.props.setFormData,required:!0,value:this.props.formData.description}),React.createElement(TextboxElement,{name:"leadInvestigator",label:"Lead Investigator",onUserInput:this.props.setFormData,required:!0,value:this.props.formData.leadInvestigator}),React.createElement(EmailElement,{name:"leadInvestigatorEmail",label:"Lead Investigator Email",onUserInput:this.props.setFormData,onUserBlur:this.props.validateEmail,toggleEmailNotify:this.props.toggleEmailNotify,errorMessage:this.props.formErrors.leadInvestigatorEmail,required:!0,value:this.props.formData.leadInvestigatorEmail,addressee:"leadInvestigator"}),React.createElement(TagsElement,{name:"usersWithEditPerm",id:"usersWithEditPerm",label:"Users with Edit Permission",options:this.props.users,useSearch:!0,strictSearch:!0,onUserInput:this.props.setFormData,onUserAdd:this.props.addListItem,onUserRemove:this.props.removeListItem,value:this.props.formData.pendingUWEP,pendingValKey:"pendingUWEP",items:this.props.formData.usersWithEditPerm,btnLabel:"Add User"}),React.createElement(TagsElement,{name:"collaborators",id:"collaborators",label:"Collaborators",onUserInput:this.props.setFormData,onUserAdd:this.addCollaborator,onUserRemove:this.removeCollaborator,value:this.props.formData.pendingCollab,pendingValKey:"pendingCollab",items:collabNames,btnLabel:"Add Collaborator"}),collabEmails,React.createElement(TagsElement,{name:"keywords",id:"keywords",label:"Keywords",onUserInput:this.props.setFormData,onUserAdd:this.props.addListItem,onUserRemove:this.props.removeListItem,value:this.props.formData.pendingKWItem,pendingValKey:"pendingKWItem",items:this.props.formData.keywords,btnLabel:"Add Keyword"}),React.createElement(TagsElement,{name:"voiFields",id:"voiFields",label:"Variables of Interest",useSearch:!0,strictSearch:!0,onUserInput:this.props.setFormData,onUserAdd:this.props.addListItem,onUserRemove:this.props.removeListItem,required:!1,value:this.props.formData.pendingItemVF,options:this.props.allVOIs,pendingValKey:"pendingItemVF",items:this.props.formData.voiFields,btnLabel:"Add Variable of Interest"}),React.createElement(StaticElement,{text:voiHelp}),fileFields,React.createElement(ButtonElement,{label:this.props.editMode?"Submit":"Propose Project"}))}}]),ProjectFormFields}(React.Component);exports.default=ProjectFormFields},27:function(module,exports){"use strict";function formatColumn(column,cell,rowData,rowHeaders){if(loris.hiddenHeaders.indexOf(column)>-1)return null;var row={};rowHeaders.forEach(function(header,index){row[header]=rowData[index]},this);var classes=[];if("Title"===column){var pubID=row["Publication ID"],viewURL=loris.BaseURL+"/publication/view_project?id="+pubID;return cell=decodeHtml(cell),React.createElement("td",null,React.createElement("a",{href:viewURL},cell))}return React.createElement("td",{className:classes},cell)}function decodeHtml(html){var txt=document.createElement("textarea");return txt.innerHTML=html,txt.value}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=formatColumn}});
//# sourceMappingURL=publicationIndex.js.map