!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0)}([function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var _ImagingUploader=__webpack_require__(16),_ImagingUploader2=_interopRequireDefault(_ImagingUploader);$(function(){var imagingUploader=React.createElement("div",{className:"page-imaging-uploader"},React.createElement(_ImagingUploader2.default,{Module:"imaging_uploader",DataURL:loris.BaseURL+"/imaging_uploader/?format=json"}));ReactDOM.render(imagingUploader,document.getElementById("lorisworkspace"))})},,function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Panel=function(_React$Component){function Panel(props){_classCallCheck(this,Panel);var _this=_possibleConstructorReturn(this,(Panel.__proto__||Object.getPrototypeOf(Panel)).call(this,props));return _this.state={collapsed:_this.props.initCollapsed},_this.panelClass=_this.props.initCollapsed?"panel-collapse collapse":"panel-collapse collapse in",_this.toggleCollapsed=_this.toggleCollapsed.bind(_this),_this}return _inherits(Panel,_React$Component),_createClass(Panel,[{key:"toggleCollapsed",value:function(){this.setState({collapsed:!this.state.collapsed})}},{key:"render",value:function(){var glyphClass=this.state.collapsed?"glyphicon pull-right glyphicon-chevron-down":"glyphicon pull-right glyphicon-chevron-up",panelHeading=this.props.title?React.createElement("div",{className:"panel-heading",onClick:this.toggleCollapsed,"data-toggle":"collapse","data-target":"#"+this.props.id,style:{cursor:"pointer"}},this.props.title,React.createElement("span",{className:glyphClass})):"";return React.createElement("div",{className:"panel panel-primary"},panelHeading,React.createElement("div",{id:this.props.id,className:this.panelClass,role:"tabpanel"},React.createElement("div",{className:"panel-body",style:{height:this.props.height}},this.props.children)))}}]),Panel}(React.Component);Panel.propTypes={id:React.PropTypes.string,height:React.PropTypes.string,title:React.PropTypes.string},Panel.defaultProps={initCollapsed:!1,id:"default-panel",height:"100%"},exports.default=Panel},,,,,,,function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Tabs=function(_React$Component){function Tabs(props){_classCallCheck(this,Tabs);var _this=_possibleConstructorReturn(this,(Tabs.__proto__||Object.getPrototypeOf(Tabs)).call(this,props)),hash=window.location.hash,activeTab="";return _this.props.updateURL&&hash?activeTab=hash.substr(1):_this.props.defaultTab?activeTab=_this.props.defaultTab:_this.props.tabs.length>0&&(activeTab=_this.props.tabs[0].id),_this.state={activeTab:activeTab},_this.handleClick=_this.handleClick.bind(_this),_this.getTabs=_this.getTabs.bind(_this),_this.getTabPanes=_this.getTabPanes.bind(_this),_this}return _inherits(Tabs,_React$Component),_createClass(Tabs,[{key:"handleClick",value:function(tabId,e){if(this.setState({activeTab:tabId}),this.props.onTabChange(tabId),this.props.updateURL){var scrollDistance=$("body").scrollTop()||$("html").scrollTop();window.location.hash=e.target.hash,$("html,body").scrollTop(scrollDistance)}}},{key:"getTabs",value:function(){var tabs=this.props.tabs.map(function(tab){var tabClass=this.state.activeTab===tab.id?"active":null,href="#"+tab.id,tabID="tab-"+tab.id;return React.createElement("li",{role:"presentation",className:tabClass,key:tab.id},React.createElement("a",{id:tabID,href:href,role:"tab","data-toggle":"tab",onClick:this.handleClick.bind(null,tab.id)},tab.label))}.bind(this));return tabs}},{key:"getTabPanes",value:function(){var tabPanes=React.Children.map(this.props.children,function(child,key){if(child)return React.cloneElement(child,{activeTab:this.state.activeTab,key:key})}.bind(this));return tabPanes}},{key:"render",value:function(){var tabs=this.getTabs(),tabPanes=this.getTabPanes(),tabStyle={marginLeft:0,marginBottom:"5px"};return React.createElement("div",null,React.createElement("ul",{className:"nav nav-tabs",role:"tablist",style:tabStyle},tabs),React.createElement("div",{className:"tab-content"},tabPanes))}}]),Tabs}(React.Component);Tabs.propTypes={tabs:React.PropTypes.array.isRequired,defaultTab:React.PropTypes.string,updateURL:React.PropTypes.bool},Tabs.defaultProps={onTabChange:function(){},updateURL:!0};var VerticalTabs=function(_React$Component2){function VerticalTabs(props){_classCallCheck(this,VerticalTabs);var _this2=_possibleConstructorReturn(this,(VerticalTabs.__proto__||Object.getPrototypeOf(VerticalTabs)).call(this,props)),hash=window.location.hash,activeTab="";return _this2.props.updateURL&&hash?activeTab=hash.substr(1):_this2.props.defaultTab?activeTab=_this2.props.defaultTab:_this2.props.tabs.length>0&&(activeTab=_this2.props.tabs[0].id),_this2.state={activeTab:activeTab},_this2.handleClick=_this2.handleClick.bind(_this2),_this2.getTabs=_this2.getTabs.bind(_this2),_this2.getTabPanes=_this2.getTabPanes.bind(_this2),_this2}return _inherits(VerticalTabs,_React$Component2),_createClass(VerticalTabs,[{key:"handleClick",value:function(tabId,e){if(this.setState({activeTab:tabId}),this.props.onTabChange(tabId),this.props.updateURL){var scrollDistance=$("body").scrollTop()||$("html").scrollTop();window.location.hash=e.target.hash,$("html,body").scrollTop(scrollDistance)}}},{key:"getTabs",value:function(){var tabs=this.props.tabs.map(function(tab){var tabClass=this.state.activeTab===tab.id?"active":null,href="#"+tab.id,tabID="tab-"+tab.id;return React.createElement("li",{role:"presentation",className:tabClass,key:tab.id},React.createElement("a",{id:tabID,href:href,role:"tab","data-toggle":"tab",onClick:this.handleClick.bind(null,tab.id)},tab.label))}.bind(this));return tabs}},{key:"getTabPanes",value:function(){var tabPanes=React.Children.map(this.props.children,function(child,key){if(child)return React.cloneElement(child,{activeTab:this.state.activeTab,key:key})}.bind(this));return tabPanes}},{key:"render",value:function(){var tabs=this.getTabs(),tabPanes=this.getTabPanes(),tabStyle={marginLeft:0,marginBottom:"5px"};return React.createElement("div",null,React.createElement("div",{className:"tabbable col-md-3 col-sm-3"},React.createElement("ul",{className:"nav nav-pills nav-stacked",role:"tablist",style:tabStyle},tabs)),React.createElement("div",{className:"tab-content col-md-9 col-sm-9"},tabPanes))}}]),VerticalTabs}(React.Component);VerticalTabs.propTypes={tabs:React.PropTypes.array.isRequired,defaultTab:React.PropTypes.string,updateURL:React.PropTypes.bool},VerticalTabs.defaultProps={onTabChange:function(){},updateURL:!0};var TabPane=function(_React$Component3){function TabPane(){return _classCallCheck(this,TabPane),_possibleConstructorReturn(this,(TabPane.__proto__||Object.getPrototypeOf(TabPane)).apply(this,arguments))}return _inherits(TabPane,_React$Component3),_createClass(TabPane,[{key:"render",value:function(){var classList="tab-pane",title=void 0;return this.props.TabId===this.props.activeTab&&(classList+=" active"),this.props.Title&&(title=React.createElement("h1",null,this.props.Title)),React.createElement("div",{role:"tabpanel",className:classList,id:this.props.TabId},title,this.props.children)}}]),TabPane}(React.Component);TabPane.propTypes={TabId:React.PropTypes.string.isRequired,Title:React.PropTypes.string,activeTab:React.PropTypes.string},exports.Tabs=Tabs,exports.VerticalTabs=VerticalTabs,exports.TabPane=TabPane},,,,function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_Panel=__webpack_require__(2),_Panel2=_interopRequireDefault(_Panel),FilterForm=function(_React$Component){function FilterForm(props){_classCallCheck(this,FilterForm);var _this=_possibleConstructorReturn(this,(FilterForm.__proto__||Object.getPrototypeOf(FilterForm)).call(this,props));return _this.clearFilter=_this.clearFilter.bind(_this),_this.getFormChildren=_this.getFormChildren.bind(_this),_this.setFilter=_this.setFilter.bind(_this),_this.onElementUpdate=_this.onElementUpdate.bind(_this),_this.queryString=QueryString.get(),_this}return _inherits(FilterForm,_React$Component),_createClass(FilterForm,[{key:"componentDidMount",value:function(){var filter={},queryString=this.queryString;Object.keys(queryString).forEach(function(key){var filterKey="candidateID"===key?"candID":key;filter[filterKey]={value:queryString[key],exactMatch:!1}}),this.props.onUpdate(filter)}},{key:"clearFilter",value:function(){this.queryString=QueryString.clear(this.props.Module),this.props.onUpdate({})}},{key:"getFormChildren",value:function(){var formChildren=[];return React.Children.forEach(this.props.children,function(child,key){if(React.isValidElement(child)&&"function"==typeof child.type&&child.props.onUserInput){var callbackFunc=child.props.onUserInput,callbackName=callbackFunc.name,elementName=child.type.displayName,queryFieldName="candID"===child.props.name?"candidateID":child.props.name,filterValue=this.queryString[queryFieldName];"onUserInput"===callbackName&&(callbackFunc="ButtonElement"===elementName&&"reset"===child.props.type?this.clearFilter:this.onElementUpdate.bind(null,elementName)),formChildren.push(React.cloneElement(child,{onUserInput:callbackFunc,value:filterValue?filterValue:"",key:key})),this.setFilter(elementName,child.props.name,filterValue)}else formChildren.push(React.cloneElement(child,{key:key}))}.bind(this)),formChildren}},{key:"setFilter",value:function(type,key,value){var filter={};return this.props.filter&&(filter=JSON.parse(JSON.stringify(this.props.filter))),key&&(filter[key]={},value?filter[key].value=Object.keys(value).length>0?value:"":filter[key].value="",filter[key].exactMatch="SelectElement"===type||"select"===type),filter&&key&&""===value&&delete filter[key],filter}},{key:"onElementUpdate",value:function(type,fieldName,fieldValue){if("string"==typeof fieldName&&("string"==typeof fieldValue||"object"===("undefined"==typeof fieldValue?"undefined":_typeof(fieldValue)))){var queryFieldName="candID"===fieldName?"candidateID":fieldName;this.queryString=QueryString.set(this.queryString,queryFieldName,fieldValue);var filter=this.setFilter(type,fieldName,fieldValue);this.props.onUpdate(filter)}}},{key:"render",value:function(){var formChildren=this.getFormChildren(),formElements=this.props.formElements;return formElements&&Object.keys(formElements).forEach(function(fieldName){var queryFieldName="candID"===fieldName?"candidateID":fieldName;formElements[fieldName].onUserInput=this.onElementUpdate.bind(null,formElements[fieldName].type),formElements[fieldName].value=this.queryString[queryFieldName]}.bind(this)),React.createElement(_Panel2.default,{id:this.props.id,height:this.props.height,title:this.props.title},React.createElement(FormElement,this.props,formChildren))}}]),FilterForm}(React.Component);FilterForm.defaultProps={id:"selection-filter",height:"100%",title:"Selection Filter",onUpdate:function(){console.warn("onUpdate() callback is not set!")}},FilterForm.propTypes={Module:React.PropTypes.string.isRequired,filter:React.PropTypes.object.isRequired,id:React.PropTypes.string,height:React.PropTypes.string,title:React.PropTypes.string,onUpdate:React.PropTypes.func},exports.default=FilterForm},,,function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_FilterForm=__webpack_require__(13),_FilterForm2=_interopRequireDefault(_FilterForm),_Tabs=__webpack_require__(9),_LogPanel=__webpack_require__(17),_LogPanel2=_interopRequireDefault(_LogPanel),_UploadForm=__webpack_require__(18),_UploadForm2=_interopRequireDefault(_UploadForm),_columnFormatter=__webpack_require__(20),_columnFormatter2=_interopRequireDefault(_columnFormatter),ImagingUploader=function(_React$Component){function ImagingUploader(props){_classCallCheck(this,ImagingUploader);var _this=_possibleConstructorReturn(this,(ImagingUploader.__proto__||Object.getPrototypeOf(ImagingUploader)).call(this,props));return _this.state={isLoaded:!1,filter:{}},_this.fetchData=_this.fetchData.bind(_this),_this.updateFilter=_this.updateFilter.bind(_this),_this.resetFilters=_this.resetFilters.bind(_this),_this}return _inherits(ImagingUploader,_React$Component),_createClass(ImagingUploader,[{key:"componentDidMount",value:function(){this.fetchData()}},{key:"fetchData",value:function(){$.ajax(this.props.DataURL,{method:"GET",dataType:"json",success:function(data){this.setState({Data:data,isLoaded:!0})}.bind(this),error:function(_error){console.error(_error)}})}},{key:"updateFilter",value:function(filter){this.setState({filter:filter})}},{key:"resetFilters",value:function(){this.imagingUploaderFilter.clearFilter()}},{key:"render",value:function(){if(!this.state.isLoaded)return React.createElement("button",{className:"btn-info has-spinner"},"Loading",React.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"}));var tabList=[{id:"browse",label:"Browse"},{id:"upload",label:"Upload"}],filterRef=function(f){this.imagingUploaderFilter=f}.bind(this);return React.createElement(_Tabs.Tabs,{tabs:tabList,defaultTab:"browse",updateURL:!0},React.createElement(_Tabs.TabPane,{TabId:tabList[0].id},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-md-5"},React.createElement(_FilterForm2.default,{Module:"imaging_uploader",name:"imaging_filter",id:"imaging_filter",ref:filterRef,onUpdate:this.updateFilter,filter:this.state.filter},React.createElement(TextboxElement,this.state.Data.form.candID),React.createElement(TextboxElement,this.state.Data.form.pSCID),React.createElement(SelectElement,this.state.Data.form.visitLabel),React.createElement(ButtonElement,{type:"reset",label:"Clear Filters",onUserInput:this.resetFilters}))),React.createElement("div",{className:"col-md-7"},React.createElement(_LogPanel2.default,null))),React.createElement("div",{id:"mri_upload_table"},React.createElement(StaticDataTable,{Data:this.state.Data.Data,Headers:this.state.Data.Headers,getFormattedCell:_columnFormatter2.default,Filter:this.state.filter}))),React.createElement(_Tabs.TabPane,{TabId:tabList[1].id},React.createElement(_UploadForm2.default,{form:this.state.Data.form,mriList:this.state.Data.mriList,maxUploadSize:this.state.Data.maxUploadSize})))}}]),ImagingUploader}(React.Component);ImagingUploader.propTypes={},ImagingUploader.defaultProps={},exports.default=ImagingUploader},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_Panel=__webpack_require__(2),_Panel2=_interopRequireDefault(_Panel),LogPanel=function(_React$Component){function LogPanel(props){_classCallCheck(this,LogPanel);var _this=_possibleConstructorReturn(this,(LogPanel.__proto__||Object.getPrototypeOf(LogPanel)).call(this,props));return _this.state={logText:"<select a row in the table below to view the upload logs>",logType:"summary"},_this.initHelper=_this.initHelper.bind(_this),_this.onLogTypeChange=_this.onLogTypeChange.bind(_this),_this.setServerPolling=_this.setServerPolling.bind(_this),_this.monitorProgress=_this.monitorProgress.bind(_this),_this}return _inherits(LogPanel,_React$Component),_createClass(LogPanel,[{key:"componentDidMount",value:function(){this.initHelper()}},{key:"initHelper",value:function(){var uploadProgress=new UploadProgress;this.uploadProgress=uploadProgress,$("#mri_upload_table").on("click","tbody tr",function(event){return null!==uploadProgress.getUploadRow()&&($(uploadProgress.getUploadRow()).css("background-color","white"),this.setServerPolling(!1)),event.currentTarget===uploadProgress.getUploadRow()?(uploadProgress.setUploadRow(null),uploadProgress.setProgressFromServer(null),void this.setState({logText:"<select a row in the table below to view the upload logs>"})):(uploadProgress.setUploadRow(event.currentTarget),$(event.currentTarget).css("background-color","#EFEFFB"),void this.monitorProgress(this.state.logType))}.bind(this))}},{key:"monitorProgress",value:function(logType){var summary="summary"===logType,uploadProgress=this.uploadProgress,uploadId=uploadProgress.getUploadId();uploadId&&$.post(loris.BaseURL+"/imaging_uploader/ajax/getUploadSummary.php",{uploadId:uploadId,summary:summary},function(data){uploadProgress.setProgressFromServer(data),this.setState({logText:uploadProgress.getProgressText()}),this.setServerPolling(uploadProgress.getPipelineStatus()===UploadProgress.PIPELINE_STATUS_RUNNING)}.bind(this))}},{key:"setServerPolling",value:function(poll){var uploadProgress=this.uploadProgress;poll?(this.setServerPolling.getSummaryInterval||(this.setServerPolling.getSummaryInterval=setInterval(this.monitorProgress,5e3)),this.setServerPolling.dotUpdateInterval||(this.setServerPolling.dotUpdateInterval=setInterval(function(){uploadProgress.updateDots(),this.setState({logText:uploadProgress.getProgressText()})},3e3)),this.setServerPolling.animatedCharInterval||(this.setServerPolling.animatedCharInterval=setInterval(function(){uploadProgress.updateAnimatedCharIndex(),this.setState({logText:uploadProgress.getProgressText()})},250))):(this.setServerPolling.getSummaryInterval&&(clearInterval(this.setServerPolling.getSummaryInterval),this.setServerPolling.getSummaryInterval=null),this.setServerPolling.dotUpdateInterval&&(clearInterval(this.setServerPolling.dotUpdateInterval),this.setServerPolling.dotUpdateInterval=null),this.setServerPolling.animatedCharInterval&&(clearInterval(this.setServerPolling.animatedCharInterval),this.setServerPolling.animatedCharInterval=null))}},{key:"onLogTypeChange",value:function(name,value){this.monitorProgress(value),this.setState({logType:value})}},{key:"render",value:function(){var logTypes={summary:"Summary",detailed:"Detailed"};return React.createElement(_Panel2.default,{id:"log_panel",title:"Log Viewer"},React.createElement(FormElement,{name:"log_form"},React.createElement(SelectElement,{name:"LogType",label:"Logs to display",options:logTypes,onUserInput:this.onLogTypeChange,value:this.state.logType,emptyOption:!1}),React.createElement(TextareaElement,{name:"UploadLogs",disabled:!0,id:"mri_upload_logs",value:this.state.logText,rows:6})))}}]),LogPanel}(React.Component);LogPanel.propTypes={},LogPanel.defaultProps={},exports.default=LogPanel},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_ProgressBar=__webpack_require__(19),_ProgressBar2=_interopRequireDefault(_ProgressBar),UploadForm=function(_React$Component){function UploadForm(props){_classCallCheck(this,UploadForm);var _this=_possibleConstructorReturn(this,(UploadForm.__proto__||Object.getPrototypeOf(UploadForm)).call(this,props)),form=JSON.parse(JSON.stringify(_this.props.form));return _this.state={formData:{},form:form,hasError:{},errorMessage:{},uploadProgress:-1},_this.onFormChange=_this.onFormChange.bind(_this),_this.getDisabledStatus=_this.getDisabledStatus.bind(_this),_this.submitForm=_this.submitForm.bind(_this),_this.uploadFile=_this.uploadFile.bind(_this),_this}return _inherits(UploadForm,_React$Component),_createClass(UploadForm,[{key:"componentDidMount",value:function(){this.onFormChange(this.state.form.IsPhantom.name,null)}},{key:"onFormChange",value:function(field,value){if(field){var form=JSON.parse(JSON.stringify(this.state.form)),formData=Object.assign({},this.state.formData);"IsPhantom"===field&&"N"!==value&&(delete formData.candID,delete formData.pSCID,delete formData.visitLabel),formData[field]=value,this.setState({form:form,formData:formData})}}},{key:"getDisabledStatus",value:function(phantomScans){return"N"!==phantomScans}},{key:"submitForm",value:function(){var data=this.state.formData;if(data.mriFile&&data.IsPhantom){var fileName=data.mriFile.name;if("N"===data.IsPhantom){if(!data.candID||!data.pSCID||!data.visitLabel)return;var pcv=data.pSCID+"_"+data.candID+"_"+data.visitLabel,pcvu=pcv+"_",properName=new RegExp("^"+pcv+".(zip|tgz|tar.gz)"),properNameExt=new RegExp("^"+pcvu+".*(.(zip|tgz|tar.gz))");if(!fileName.match(properName)&&!fileName.match(properNameExt)){swal({title:"File improperly named!",text:"File name must match "+pcv+' or begin with "'+pcvu+'", and have the extension of .tgz, tar.gz or .zip',type:"error",confirmButtonText:"OK"});var errorMessage={mriFile:"File improperly named!"},hasError={mriFile:!0};return void this.setState({errorMessage:errorMessage,hasError:hasError})}}if("N"!==data.IsPhantom||data.candID&&data.pSCID&&data.visitLabel){var mriFile=this.props.mriList.find(function(mriFile){return mriFile.fileName.indexOf(fileName)>-1});if(!mriFile)return void this.uploadFile();if("Success"===mriFile.status)return void swal({title:"File already exists!",text:"A file with this name has already successfully passed the MRI pipeline!\n",type:"error",confirmButtonText:"OK"});if("In Progress..."===mriFile.status)return void swal({title:"File is currently processing!",text:"A file with this name is currently going through the MRI pipeline!\n",type:"error",confirmButtonText:"OK"});"Failure"===mriFile.status&&swal({title:"Are you sure?",text:"A file with this name already exists!\n Would you like to override existing file?",type:"warning",showCancelButton:!0,confirmButtonText:"Yes, I am sure!",cancelButtonText:"No, cancel it!"},function(isConfirm){isConfirm?this.uploadFile(!0):swal("Cancelled","Your imaginary file is safe :)","error")}.bind(this)),"Not Started"===mriFile.status&&swal({title:"Are you sure?",text:"A file with this name has been uploaded but has not yet started the MRI pipeline.\n Would you like to override the existing file?",type:"warning",showCancelButton:!0,confirmButtonText:"Yes, I am sure!",cancelButtonText:"No, cancel it!"},function(isConfirm){isConfirm?this.uploadFile(!0):swal("Cancelled","Your upload has been cancelled.","error")}.bind(this))}}}},{key:"uploadFile",value:function(overwriteFile){var _this2=this,formData=this.state.formData,formObj=new FormData;for(var key in formData)""!==formData[key]&&formObj.append(key,formData[key]);formObj.append("fire_away","Upload"),overwriteFile&&formObj.append("overwrite",!0),$.ajax({type:"POST",url:loris.BaseURL+"/imaging_uploader/",data:formObj,cache:!1,contentType:!1,processData:!1,xhr:function(){var xhr=new window.XMLHttpRequest;return xhr.upload.addEventListener("progress",function(evt){if(evt.lengthComputable){var percentage=Math.round(evt.loaded/evt.total*100);this.setState({uploadProgress:percentage})}}.bind(this),!1),xhr}.bind(this),success:function(data){var errorMessage=_this2.state.errorMessage,hasError=_this2.state.hasError;for(var i in errorMessage)errorMessage.hasOwnProperty(i)&&(errorMessage[i]="",hasError[i]=!1);_this2.setState({errorMessage:errorMessage,hasError:hasError}),swal({title:"Upload Successful!",type:"success"},function(){window.location.assign(loris.BaseURL+"/imaging_uploader/")})},error:function(_error,textStatus,errorThrown){swal({title:"Submission error!",type:"error"});var errorMessage=_this2.state.errorMessage,hasError=_this2.state.hasError;errorMessage=(_error.responseJSON||{}).errors||"Submission error!";for(var i in errorMessage)errorMessage.hasOwnProperty(i)&&(errorMessage[i]=errorMessage[i].toString(),errorMessage[i].length?hasError[i]=!0:hasError[i]=!1);_this2.setState({uploadProgress:-1,errorMessage:errorMessage,hasError:hasError})}})}},{key:"render",value:function(){var form=this.state.form;
form.IsPhantom.value=this.state.formData.IsPhantom,form.candID.value=this.state.formData.candID,form.pSCID.value=this.state.formData.pSCID,form.visitLabel.value=this.state.formData.visitLabel,form.mriFile.value=this.state.formData.mriFile;var btnClass=this.state.uploadProgress>-1?"btn btn-primary hide":void 0,notes=React.createElement("span",null,"File cannot exceed ",this.props.maxUploadSize,React.createElement("br",null),"File must be of type .tgz or tar.gz or .zip",React.createElement("br",null),"For files that are not Phantom Scans, file name must begin with",React.createElement("b",null," [PSCID]_[CandID]_[Visit Label]"),React.createElement("br",null),"For example, for CandID ",React.createElement("i",null,"100000"),", PSCID ",React.createElement("i",null,"ABC123"),", and Visit Label ",React.createElement("i",null,"V1")," the file name should be prefixed by:",React.createElement("b",null," ABC123_100000_V1"),React.createElement("br",null));return React.createElement("div",{className:"row"},React.createElement("div",{className:"col-md-7"},React.createElement("h3",null,"Upload an imaging scan"),React.createElement("br",null),React.createElement(FormElement,{name:"upload_form",fileUpload:!0},React.createElement(SelectElement,{name:"IsPhantom",label:"Phantom Scans",options:this.props.form.IsPhantom.options,onUserInput:this.onFormChange,required:!0,hasError:this.state.hasError.IsPhantom,errorMessage:this.state.errorMessage.IsPhantom,value:this.state.formData.IsPhantom}),React.createElement(TextboxElement,{name:"candID",label:"CandID",onUserInput:this.onFormChange,disabled:this.getDisabledStatus(this.state.formData.IsPhantom),required:!this.getDisabledStatus(this.state.formData.IsPhantom),hasError:this.state.hasError.candID,errorMessage:this.state.errorMessage.candID,value:this.state.formData.candID}),React.createElement(TextboxElement,{name:"pSCID",label:"PSCID",onUserInput:this.onFormChange,disabled:this.getDisabledStatus(this.state.formData.IsPhantom),required:!this.getDisabledStatus(this.state.formData.IsPhantom),hasError:this.state.hasError.pSCID,errorMessage:this.state.errorMessage.pSCID,value:this.state.formData.pSCID}),React.createElement(SelectElement,{name:"visitLabel",label:"Visit Label",options:this.props.form.visitLabel.options,onUserInput:this.onFormChange,disabled:this.getDisabledStatus(this.state.formData.IsPhantom),required:!this.getDisabledStatus(this.state.formData.IsPhantom),hasError:this.state.hasError.visitLabel,errorMessage:this.state.errorMessage.visitLabel,value:this.state.formData.visitLabel}),React.createElement(FileElement,{name:"mriFile",label:"File to Upload",onUserInput:this.onFormChange,required:!0,hasError:this.state.hasError.mriFile,errorMessage:this.state.errorMessage.mriFile,value:this.state.formData.mriFile}),React.createElement(StaticElement,{label:"Notes",text:notes}),React.createElement("div",{className:"row"},React.createElement("div",{className:"col-sm-9 col-sm-offset-3"},React.createElement(_ProgressBar2.default,{value:this.state.uploadProgress}))),React.createElement(ButtonElement,{onUserInput:this.submitForm,buttonClass:btnClass}))))}}]),UploadForm}(React.Component);UploadForm.propTypes={},UploadForm.defaultProps={},exports.default=UploadForm},function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),ProgressBar=function(_React$Component){function ProgressBar(){return _classCallCheck(this,ProgressBar),_possibleConstructorReturn(this,(ProgressBar.__proto__||Object.getPrototypeOf(ProgressBar)).apply(this,arguments))}return _inherits(ProgressBar,_React$Component),_createClass(ProgressBar,[{key:"render",value:function(){var progressStyle={display:this.props.value<0?"none":"block",backgroundColor:"#d3d3d3",height:"30px",position:"relative"},labelStyle={position:"absolute",top:0,left:0,zIndex:1e3,width:"100%",color:"#fff",textAlign:"center",lineHeight:"30px",fontWeight:"600"};return React.createElement("div",{className:"progress",style:progressStyle},React.createElement("div",{className:"progress-bar progress-bar-striped active",role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":this.props.value,style:{width:this.props.value+"%"}}),React.createElement("span",{style:labelStyle},this.props.value,"%"))}}]),ProgressBar}(React.Component);ProgressBar.propTypes={value:React.PropTypes.number},ProgressBar.defaultProps={value:0},exports.default=ProgressBar},function(module,exports){"use strict";function formatColumn(column,cell,rowData,rowHeaders){function handleClick(dccid,e){loris.loadFilteredMenuClickHandler("imaging_browser/",{DCCID:dccid})(e)}function openViolatedScans(patientName,e){loris.loadFilteredMenuClickHandler("mri_violations/",{PatientName:patientName})(e)}if(loris.hiddenHeaders.indexOf(column)>-1)return null;var row={};rowHeaders.forEach(function(header,index){row[header]=rowData[index]},this);var cellStyle={whiteSpace:"nowrap"};if("Progress"===column){if("Failure"===cell)return cellStyle.color="#fff",React.createElement("td",{className:"label-danger",style:cellStyle},cell);if("In Progress..."===cell)return cellStyle.color="#fff",React.createElement("td",{className:"label-warning",style:cellStyle},cell);var created=row["Number Of MincCreated"],inserted=row["Number Of MincInserted"];return React.createElement("td",{style:cellStyle},cell," (",inserted," out of ",created,")")}if("Tarchive Info"===column){if(!cell||"0"===cell)return React.createElement("td",null);var url=loris.BaseURL+"/dicom_archive/viewDetails/?tarchiveID="+cell;return React.createElement("td",{style:cellStyle},React.createElement("a",{href:url},"View Details"))}if("Number Of MincInserted"===column&&cell>0)return React.createElement("td",{style:cellStyle},React.createElement("a",{onClick:handleClick.bind(null,row.CandID)},cell));if("Number Of MincCreated"===column){var violatedScans=void 0;if(row["Number Of MincCreated"]-row["Number Of MincInserted"]>0){var numViolatedScans=row["Number Of MincCreated"]-row["Number Of MincInserted"],patientName=row.PatientName;violatedScans=React.createElement("a",{onClick:openViolatedScans.bind(null,patientName)},"(",numViolatedScans," violated scans)")}return React.createElement("td",{style:cellStyle},cell," ",violatedScans)}return React.createElement("td",{style:cellStyle},cell)}Object.defineProperty(exports,"__esModule",{value:!0}),loris.hiddenHeaders=["PatientName"],exports.default=formatColumn}]);
//# sourceMappingURL=index.js.map