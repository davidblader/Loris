!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0)}([function(module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var FormElement=React.createClass({displayName:"FormElement",propTypes:{name:React.PropTypes.string.isRequired,id:React.PropTypes.string,method:React.PropTypes.oneOf(["POST","GET"]),action:React.PropTypes.string,class:React.PropTypes.string,columns:React.PropTypes.number,formElements:React.PropTypes.shape({elementName:React.PropTypes.shape({name:React.PropTypes.string,type:React.PropTypes.string})}),onSubmit:React.PropTypes.func,onUserInput:React.PropTypes.func},getDefaultProps:function(){return{name:null,id:null,method:"POST",action:void 0,class:"form-horizontal",columns:1,fileUpload:!1,formElements:{},onSubmit:function(){console.warn("onSubmit() callback is not set!")}}},getFormElements:function(){var formElementsHTML=[],columns=this.props.columns,maxColumnSize=12,colSize=Math.floor(maxColumnSize/columns),colClass="col-xs-12 col-sm-"+colSize+" col-md-"+colSize,filter=this.props.formElements;return Object.keys(filter).forEach(function(objKey,index){var userInput=this.props.onUserInput?this.props.onUserInput:filter[objKey].onUserInput,value=filter[objKey].value?filter[objKey].value:"";formElementsHTML.push(React.createElement("div",{key:"el_"+index,className:colClass},React.createElement(LorisElement,{element:filter[objKey],onUserInput:userInput,value:value})))}.bind(this)),React.Children.forEach(this.props.children,function(child,key){var elementClass="col-xs-12 col-sm-12 col-md-12";React.isValidElement(child)&&"function"==typeof child.type&&(elementClass=colClass),formElementsHTML.push(React.createElement("div",{key:"el_child_"+key,className:elementClass},child))}),formElementsHTML},handleSubmit:function(e){this.props.onSubmit&&(e.preventDefault(),this.props.onSubmit(e))},render:function(){var encType=this.props.fileUpload?"multipart/form-data":null,formElements=this.getFormElements(),rowStyles={display:"flex",flexWrap:"wrap"};return React.createElement("form",{name:this.props.name,id:this.props.id,className:this.props.class,method:this.props.method,action:this.props.action,encType:encType,onSubmit:this.handleSubmit},React.createElement("div",{className:"row",style:rowStyles},formElements))}}),SelectElement=React.createClass({displayName:"SelectElement",propTypes:{name:React.PropTypes.string.isRequired,options:React.PropTypes.object.isRequired,label:React.PropTypes.string,value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.array]),id:React.PropTypes.string,class:React.PropTypes.string,multiple:React.PropTypes.bool,disabled:React.PropTypes.bool,required:React.PropTypes.bool,emptyOption:React.PropTypes.bool,hasError:React.PropTypes.bool,errorMessage:React.PropTypes.string,onUserInput:React.PropTypes.func},getDefaultProps:function(){return{name:"",options:{},label:"",value:void 0,id:"",class:"",multiple:!1,disabled:!1,required:!1,emptyOption:!0,hasError:!1,errorMessage:"The field is required!",onUserInput:function(){console.warn("onUserInput() callback is not set")}}},handleChange:function(e){var value=e.target.value,options=e.target.options;if(this.props.multiple&&options.length>1){value=[];for(var i=0,l=options.length;i<l;i++)options[i].selected&&value.push(options[i].value)}this.props.onUserInput(this.props.name,value)},render:function(){var multiple=this.props.multiple?"multiple":null,required=this.props.required?"required":null,disabled=this.props.disabled?"disabled":null,options=this.props.options,errorMessage=null,emptyOptionHTML=null,requiredHTML=null,elementClass="row form-group";required&&(requiredHTML=React.createElement("span",{className:"text-danger"},"*")),this.props.emptyOption&&(emptyOptionHTML=React.createElement("option",null)),(this.props.hasError||this.props.required&&""===this.props.value)&&(errorMessage=React.createElement("span",null,this.props.errorMessage),elementClass="row form-group has-error");var value=this.props.value||(multiple?[]:"");return React.createElement("div",{className:elementClass},React.createElement("label",{className:"col-sm-3 control-label",htmlFor:this.props.label},this.props.label,requiredHTML),React.createElement("div",{className:"col-sm-9"},React.createElement("select",{name:this.props.name,multiple:multiple,className:"form-control",id:this.props.label,value:value,onChange:this.handleChange,required:required,disabled:disabled},emptyOptionHTML,Object.keys(options).map(function(option){return React.createElement("option",{value:option,key:option},options[option])})),errorMessage))}}),TagsElement=React.createClass({displayName:"TagsElement",propTypes:{name:React.PropTypes.string.isRequired,id:React.PropTypes.string.isRequired,pendingValKey:React.PropTypes.string.isRequired,options:React.PropTypes.object,items:React.PropTypes.array,label:React.PropTypes.string,value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.array]),class:React.PropTypes.string,multiple:React.PropTypes.bool,required:React.PropTypes.bool,disabled:React.PropTypes.bool,emptyOption:React.PropTypes.bool,errorMessage:React.PropTypes.string,btnLabel:React.PropTypes.string,onUserInput:React.PropTypes.func,onUserAdd:React.PropTypes.func,onUserRemove:React.PropTypes.func},getDefaultProps:function(){return{name:"",options:{},items:[],label:"",value:void 0,id:"",class:"",required:!1,disabled:!1,emptyOption:!0,hasError:!1,allowDupl:!1,errorMessage:"",pendingValKey:"",btnLabel:"Add Tag",onUserInput:function(){console.warn("onUserInput() callback is not set")},onUserAdd:function(){console.warn("onUserAdd() callback is not set")},onUserRemove:function(){console.warn("onUserRemove() callback is not set")}}},handleChange:function(e){this.props.onUserInput(this.props.pendingValKey,e.target.value)},handleKeyPress:function(e){13!==e.keyCode&&13!==e.which||(e.preventDefault(),this.handleAdd())},handleAdd:function(){var value=document.getElementById(this.props.id).value;this.canAddItem(value)&&this.props.onUserAdd(this.props.name,value,this.props.pendingValKey)},handleRemove:function(e){var value=e.target.getAttribute("data-item");this.props.onUserRemove(this.props.name,value)},canAddItem:function(value){return!!value&&!(!this.props.allowDupl&&this.props.items.indexOf(value)>-1)},render:function(){var disabled=this.props.disabled?"disabled":null,requiredHTML=null,emptyOptionHTML=null,errorMessage=null,elementClass="row form-group";this.props.required&&(requiredHTML=React.createElement("span",{className:"text-danger"},"*")),this.props.emptyOption&&(emptyOptionHTML=React.createElement("option",null)),this.props.errorMessage&&(errorMessage=React.createElement("span",null,this.props.errorMessage),elementClass="row form-group has-error");var input;if(0===Object.keys(this.props.options).length)input=React.createElement("input",{type:"text",name:this.props.name,id:this.props.id,className:"form-control",value:this.props.value||"",disabled:disabled,onChange:this.handleChange,onKeyPress:this.handleKeyPress,onSubmit:this.handleSubmit});else{var options=this.props.options;input=React.createElement("select",{name:this.props.name,className:"form-control",id:this.props.id,value:this.props.value,disabled:disabled,onChange:this.handleChange,onKeyPress:this.handleKeyPress,onSubmit:this.handleSubmit},emptyOptionHTML,Object.keys(options).map(function(option){return React.createElement("option",{value:option,key:option},options[option])}))}var items=this.props.items.map(function(item){return React.createElement("button",{className:"btn btn-info btn-inline",type:"button",onClick:this.handleRemove,"data-item":item},item," ",React.createElement("span",{className:"glyphicon glyphicon-remove","data-item":item}))},this);return React.createElement("div",{className:elementClass},React.createElement("label",{className:"col-sm-3 control-label",htmlFor:this.props.id},this.props.label,requiredHTML),React.createElement("div",{className:"col-sm-9"},items,input,errorMessage,React.createElement("button",{className:"btn btn-success add",id:this.props.id+"Add",type:"button",onClick:this.handleAdd},React.createElement("span",{className:"glyphicon glyphicon-plus"}),this.props.btnLabel)))}}),TextareaElement=React.createClass({displayName:"TextareaElement",propTypes:{name:React.PropTypes.string.isRequired,label:React.PropTypes.string,value:React.PropTypes.string,id:React.PropTypes.string,disabled:React.PropTypes.bool,required:React.PropTypes.bool,rows:React.PropTypes.number,cols:React.PropTypes.number,onUserInput:React.PropTypes.func},getDefaultProps:function(){return{name:"",label:"",value:"",id:null,disabled:!1,required:!1,rows:4,cols:25,onUserInput:function(){console.warn("onUserInput() callback is not set")}}},handleChange:function(e){this.props.onUserInput(this.props.name,e.target.value)},render:function(){var disabled=this.props.disabled?"disabled":null,required=this.props.required?"required":null,requiredHTML=null;return required&&(requiredHTML=React.createElement("span",{className:"text-danger"},"*")),React.createElement("div",{className:"row form-group"},React.createElement("label",{className:"col-sm-3 control-label",htmlFor:this.props.id},this.props.label,requiredHTML),React.createElement("div",{className:"col-sm-9"},React.createElement("textarea",{cols:this.props.cols,rows:this.props.rows,className:"form-control",name:this.props.name,id:this.props.id,value:this.props.value||"",required:required,disabled:disabled,onChange:this.handleChange})))}}),TextboxElement=React.createClass({displayName:"TextboxElement",propTypes:{name:React.PropTypes.string.isRequired,label:React.PropTypes.string,value:React.PropTypes.string,id:React.PropTypes.string,disabled:React.PropTypes.bool,required:React.PropTypes.bool,errorMessage:React.PropTypes.string,onUserInput:React.PropTypes.func,onUserBlur:React.PropTypes.func},getDefaultProps:function(){return{name:"",label:"",value:"",id:null,disabled:!1,required:!1,errorMessage:"",onUserInput:function(){console.warn("onUserInput() callback is not set")},onUserBlur:function(){}}},handleChange:function(e){this.props.onUserInput(this.props.name,e.target.value)},handleBlur:function(e){this.props.onUserBlur(this.props.name,e.target.value)},render:function(){var disabled=this.props.disabled?"disabled":null,required=this.props.required?"required":null,errorMessage=null,requiredHTML=null,elementClass="row form-group";return required&&(requiredHTML=React.createElement("span",{className:"text-danger"},"*")),this.props.errorMessage&&(errorMessage=React.createElement("span",null,this.props.errorMessage),elementClass="row form-group has-error"),React.createElement("div",{className:elementClass},React.createElement("label",{className:"col-sm-3 control-label",htmlFor:this.props.id},this.props.label,requiredHTML),React.createElement("div",{className:"col-sm-9"},React.createElement("input",{type:"text",className:"form-control",name:this.props.name,id:this.props.id,value:this.props.value||"",required:required,disabled:disabled,onChange:this.handleChange,onBlur:this.handleBlur}),errorMessage))}}),DateElement=React.createClass({displayName:"DateElement",propTypes:{name:React.PropTypes.string.isRequired,label:React.PropTypes.string,value:React.PropTypes.string,id:React.PropTypes.string,disabled:React.PropTypes.bool,required:React.PropTypes.bool,onUserInput:React.PropTypes.func},getDefaultProps:function(){return{name:"",label:"",value:"",id:null,disabled:!1,required:!1,onUserInput:function(){console.warn("onUserInput() callback is not set")}}},handleChange:function(e){this.props.onUserInput(this.props.name,e.target.value)},render:function(){var disabled=this.props.disabled?"disabled":null,required=this.props.required?"required":null,requiredHTML=null;return required&&(requiredHTML=React.createElement("span",{className:"text-danger"},"*")),React.createElement("div",{className:"row form-group"},React.createElement("label",{className:"col-sm-3 control-label",htmlFor:this.props.label},this.props.label,requiredHTML),React.createElement("div",{className:"col-sm-9"},React.createElement("input",{type:"date",className:"form-control",name:this.props.name,id:this.props.label,min:this.props.minYear,max:this.props.maxYear,onChange:this.handleChange,value:this.props.value||"",required:required,disabled:disabled})))}}),NumericElement=React.createClass({displayName:"NumericElement",propTypes:{name:React.PropTypes.string.isRequired,min:React.PropTypes.number.isRequired,max:React.PropTypes.number.isRequired,label:React.PropTypes.string,value:React.PropTypes.string,id:React.PropTypes.string,disabled:React.PropTypes.bool,required:React.PropTypes.bool,onUserInput:React.PropTypes.func},getDefaultProps:function(){return{name:"",min:null,max:null,label:"",value:"",id:null,required:!1,disabled:!1,onUserInput:function(){console.warn("onUserInput() callback is not set")}}},handleChange:function(e){this.props.onUserInput(this.props.name,e.target.value)},render:function(){var disabled=this.props.disabled?"disabled":null,required=this.props.required?"required":null,requiredHTML=null;return React.createElement("div",{className:"row form-group"},React.createElement("label",{className:"col-sm-3 control-label",htmlFor:this.props.id},this.props.label,requiredHTML),React.createElement("div",{className:"col-sm-9"},React.createElement("input",{type:"number",className:"form-control",name:this.props.name,id:this.props.id,min:this.props.min,max:this.props.max,value:this.props.value,disabled:disabled,required:required,onChange:this.handleChange})))}}),FileElement=React.createClass({displayName:"FileElement",propTypes:{name:React.PropTypes.string.isRequired,label:React.PropTypes.string,value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.object]),id:React.PropTypes.string,disabled:React.PropTypes.bool,required:React.PropTypes.bool,hasError:React.PropTypes.bool,errorMessage:React.PropTypes.string,onUserInput:React.PropTypes.func},getDefaultProps:function(){return{name:"",label:"File to Upload",value:"",id:null,disabled:!1,required:!1,hasError:!1,errorMessage:"The field is required!",onUserInput:function(){console.warn("onUserInput() callback is not set")}}},handleChange:function(e){var file=e.target.files[0]?e.target.files[0]:"";this.props.onUserInput(this.props.name,file)},render:function(){var required=this.props.required?"required":null,fileName=this.props.value?this.props.value.name:void 0,requiredHTML=null,errorMessage="",elementClass="row form-group";required&&(requiredHTML=React.createElement("span",{className:"text-danger"},"*"));var truncateEllipsis={display:"table",tableLayout:"fixed",width:"100%",whiteSpace:"nowrap"},truncateEllipsisChild={display:"table-cell",overflow:"hidden",textOverflow:"ellipsis"};this.props.hasError&&(errorMessage=this.props.errorMessage,elementClass="row form-group has-error");var fileHTML=document.querySelector(".fileUpload");return fileHTML&&!fileName&&(fileHTML.value=""),this.props.disabled?(truncateEllipsis.paddingTop="7px",React.createElement("div",{className:elementClass},React.createElement("label",{className:"col-sm-3 control-label"},this.props.label),React.createElement("div",{className:"col-sm-9"},React.createElement("div",{style:truncateEllipsis},React.createElement("span",{style:truncateEllipsisChild},fileName))))):React.createElement("div",{className:elementClass},React.createElement("label",{className:"col-sm-3 control-label"},this.props.label,requiredHTML),React.createElement("div",{className:"col-sm-9"},React.createElement("div",{className:"input-group"},React.createElement("div",{tabIndex:"-1",className:"form-control file-caption kv-fileinput-caption"},React.createElement("div",{style:truncateEllipsis},React.createElement("span",{style:truncateEllipsisChild},fileName)),React.createElement("div",{className:"file-caption-name",id:"video_file"})),React.createElement("div",{className:"input-group-btn"},React.createElement("div",{className:"btn btn-primary btn-file"},React.createElement("i",{className:"glyphicon glyphicon-folder-open"})," Browse",React.createElement("input",{type:"file",className:"fileUpload",name:this.props.name,onChange:this.handleChange,required:required})))),React.createElement("span",null,errorMessage)))}}),StaticElement=React.createClass({displayName:"StaticElement",mixins:[React.addons.PureRenderMixin],propTypes:{label:React.PropTypes.string,text:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.element])},getDefaultProps:function(){return{label:"",text:null}},render:function(){return React.createElement("div",{className:"row form-group"},React.createElement("label",{className:"col-sm-3 control-label"},this.props.label),React.createElement("div",{className:"col-sm-9"},React.createElement("p",{className:"form-control-static"},this.props.text)))}}),LinkElement=React.createClass({displayName:"LinkElement",mixins:[React.addons.PureRenderMixin],propTypes:{label:React.PropTypes.string,text:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.element]),href:React.PropTypes.string},getDefaultProps:function(){return{label:"",text:null,href:null}},render:function(){return React.createElement("div",{className:"row form-group"},React.createElement("label",{className:"col-sm-3 control-label"},this.props.label),React.createElement("div",{className:"col-sm-9"},React.createElement("p",{className:"form-control-static"},React.createElement("a",{href:this.props.href},this.props.text))))}}),ButtonElement=React.createClass({displayName:"ButtonElement",propTypes:{label:React.PropTypes.string,type:React.PropTypes.string,onUserInput:React.PropTypes.func},getDefaultProps:function(){return{label:"Submit",type:"submit",buttonClass:"btn btn-primary",columnSize:"col-sm-9 col-sm-offset-3",onUserInput:function(){console.warn("onUserInput() callback is not set")}}},handleClick:function(e){this.props.onUserInput(e)},render:function(){return React.createElement("div",{className:"row form-group"},React.createElement("div",{className:this.props.columnSize},React.createElement("button",{type:this.props.type,className:this.props.buttonClass,onClick:this.handleClick},this.props.label)))}}),LorisElement=React.createClass({displayName:"LorisElement",render:function(){var elementProps=this.props.element;elementProps.ref=elementProps.name,elementProps.onUserInput=this.props.onUserInput;var elementHtml=React.createElement("div",null);switch(elementProps.type){case"text":elementHtml=React.createElement(TextboxElement,elementProps);break;case"tags":elementHtml=React.createElement(TagsElement,elementProps);break;case"select":elementHtml=React.createElement(SelectElement,elementProps);break;case"date":elementHtml=React.createElement(DateElement,elementProps);break;case"numeric":elementHtml=React.createElement(NumericElement,elementProps);break;case"textarea":elementHtml=React.createElement(TextareaElement,elementProps);break;case"file":elementHtml=React.createElement(FileElement,elementProps);break;case"static":elementHtml=React.createElement(StaticElement,elementProps);break;case"link":elementHtml=React.createElement(LinkElement,elementProps);break;default:console.warn("Element of type "+elementProps.type+" is not currently implemented!")}return elementHtml}});window.FormElement=FormElement,window.SelectElement=SelectElement,window.TagsElement=TagsElement,window.TextareaElement=TextareaElement,window.TextboxElement=TextboxElement,window.DateElement=DateElement,window.NumericElement=NumericElement,window.FileElement=FileElement,window.StaticElement=StaticElement,window.LinkElement=LinkElement,window.ButtonElement=ButtonElement,window.LorisElement=LorisElement,exports.default={FormElement:FormElement,SelectElement:SelectElement,TagsElement:TagsElement,TextareaElement:TextareaElement,TextboxElement:TextboxElement,DateElement:DateElement,NumericElement:NumericElement,FileElement:FileElement,StaticElement:StaticElement,LinkElement:LinkElement,ButtonElement:ButtonElement,LorisElement:LorisElement}}]);
//# sourceMappingURL=Form.js.map