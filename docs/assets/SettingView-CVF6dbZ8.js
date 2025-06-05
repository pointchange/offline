import{l as A,m as b,ao as fe,a_ as Ye,a$ as w,p as D,G as x,q as s,b0 as X,s as H,I as G,M as Ze,a as M,u as te,v as U,a8 as $e,a4 as re,O as pe,y as N,z as F,Q as Xe,A as ae,b1 as Pe,aj as L,B as Be,b2 as qe,C as De,b3 as me,aC as Ce,b4 as Ve,b5 as Je,b6 as Qe,b7 as eo,b8 as oo,b9 as ro,aW as Z,K as He,N as to,a6 as no,ba as ao,F as lo,bb as io,bc as so,D as co,ar as Fe,bd as we,as as uo,au as ho,be as Re,bf as Y,aP as Ie,aJ as le,aG as Q,az as g,aK as I,aV as R,aF as je,aR as Me,al as Ne,bg as bo,bh as Se,bi as Te,bj as vo,bk as go,bl as fo,bm as po,aL as J,aM as mo,aH as _e,aI as Co,bn as oe,aX as xo,aO as ko,aU as yo,aY as wo}from"./index-Blr0FcAj.js";import{i as Ro,N as So,u as zo}from"./Input-7_7kfBSb.js";function _o(e){switch(e){case"tiny":return"mini";case"small":return"tiny";case"medium":return"small";case"large":return"medium";case"huge":return"large"}throw new Error(`${e} has no smaller size.`)}const $o=A({name:"Add",render(){return b("svg",{width:"512",height:"512",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg"},b("path",{d:"M256 112V400M400 256H112",stroke:"currentColor","stroke-width":"32","stroke-linecap":"round","stroke-linejoin":"round"}))}});function Bo(e){const{textColor2:o,primaryColorHover:r,primaryColorPressed:l,primaryColor:t,infoColor:a,successColor:n,warningColor:d,errorColor:c,baseColor:f,borderColor:k,opacityDisabled:p,tagColor:u,closeIconColor:i,closeIconColorHover:h,closeIconColorPressed:S,borderRadiusSmall:z,fontSizeMini:T,fontSizeTiny:m,fontSizeSmall:_,fontSizeMedium:y,heightMini:P,heightTiny:V,heightSmall:O,heightMedium:v,closeColorHover:C,closeColorPressed:$,buttonColor2Hover:B,buttonColor2Pressed:j,fontWeightStrong:W}=e;return Object.assign(Object.assign({},Ye),{closeBorderRadius:z,heightTiny:P,heightSmall:V,heightMedium:O,heightLarge:v,borderRadius:z,opacityDisabled:p,fontSizeTiny:T,fontSizeSmall:m,fontSizeMedium:_,fontSizeLarge:y,fontWeightStrong:W,textColorCheckable:o,textColorHoverCheckable:o,textColorPressedCheckable:o,textColorChecked:f,colorCheckable:"#0000",colorHoverCheckable:B,colorPressedCheckable:j,colorChecked:t,colorCheckedHover:r,colorCheckedPressed:l,border:`1px solid ${k}`,textColor:o,color:u,colorBordered:"rgb(250, 250, 252)",closeIconColor:i,closeIconColorHover:h,closeIconColorPressed:S,closeColorHover:C,closeColorPressed:$,borderPrimary:`1px solid ${w(t,{alpha:.3})}`,textColorPrimary:t,colorPrimary:w(t,{alpha:.12}),colorBorderedPrimary:w(t,{alpha:.1}),closeIconColorPrimary:t,closeIconColorHoverPrimary:t,closeIconColorPressedPrimary:t,closeColorHoverPrimary:w(t,{alpha:.12}),closeColorPressedPrimary:w(t,{alpha:.18}),borderInfo:`1px solid ${w(a,{alpha:.3})}`,textColorInfo:a,colorInfo:w(a,{alpha:.12}),colorBorderedInfo:w(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:w(a,{alpha:.12}),closeColorPressedInfo:w(a,{alpha:.18}),borderSuccess:`1px solid ${w(n,{alpha:.3})}`,textColorSuccess:n,colorSuccess:w(n,{alpha:.12}),colorBorderedSuccess:w(n,{alpha:.1}),closeIconColorSuccess:n,closeIconColorHoverSuccess:n,closeIconColorPressedSuccess:n,closeColorHoverSuccess:w(n,{alpha:.12}),closeColorPressedSuccess:w(n,{alpha:.18}),borderWarning:`1px solid ${w(d,{alpha:.35})}`,textColorWarning:d,colorWarning:w(d,{alpha:.15}),colorBorderedWarning:w(d,{alpha:.12}),closeIconColorWarning:d,closeIconColorHoverWarning:d,closeIconColorPressedWarning:d,closeColorHoverWarning:w(d,{alpha:.12}),closeColorPressedWarning:w(d,{alpha:.18}),borderError:`1px solid ${w(c,{alpha:.23})}`,textColorError:c,colorError:w(c,{alpha:.1}),colorBorderedError:w(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:w(c,{alpha:.12}),closeColorPressedError:w(c,{alpha:.18})})}const Ae={name:"Tag",common:fe,self:Bo},Ee={color:Object,type:{type:String,default:"default"},round:Boolean,size:{type:String,default:"medium"},closable:Boolean,disabled:{type:Boolean,default:void 0}},Io=D("tag",`
 --n-close-margin: var(--n-close-margin-top) var(--n-close-margin-right) var(--n-close-margin-bottom) var(--n-close-margin-left);
 white-space: nowrap;
 position: relative;
 box-sizing: border-box;
 cursor: default;
 display: inline-flex;
 align-items: center;
 flex-wrap: nowrap;
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 line-height: 1;
 height: var(--n-height);
 font-size: var(--n-font-size);
`,[x("strong",`
 font-weight: var(--n-font-weight-strong);
 `),s("border",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),s("icon",`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),s("avatar",`
 display: flex;
 margin: 0 6px 0 0;
 `),s("close",`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),x("round",`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[s("icon",`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),s("avatar",`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),x("closable",`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),x("icon, avatar",[x("round",`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),x("disabled",`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),x("checkable",`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[X("disabled",[H("&:hover","background-color: var(--n-color-hover-checkable);",[X("checked","color: var(--n-text-color-hover-checkable);")]),H("&:active","background-color: var(--n-color-pressed-checkable);",[X("checked","color: var(--n-text-color-pressed-checkable);")])]),x("checked",`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[X("disabled",[H("&:hover","background-color: var(--n-color-checked-hover);"),H("&:active","background-color: var(--n-color-checked-pressed);")])])])]),Po=Object.assign(Object.assign(Object.assign({},U.props),Ee),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),Vo=Be("n-tag"),Fo=A({name:"Tag",props:Po,slots:Object,setup(e){const o=M(null),{mergedBorderedRef:r,mergedClsPrefixRef:l,inlineThemeDisabled:t,mergedRtlRef:a}=te(e),n=U("Tag","-tag",Io,Ae,e,l);$e(Vo,{roundRef:re(e,"round")});function d(){if(!e.disabled&&e.checkable){const{checked:i,onCheckedChange:h,onUpdateChecked:S,"onUpdate:checked":z}=e;S&&S(!i),z&&z(!i),h&&h(!i)}}function c(i){if(e.triggerClickOnClose||i.stopPropagation(),!e.disabled){const{onClose:h}=e;h&&L(h,i)}}const f={setTextContent(i){const{value:h}=o;h&&(h.textContent=i)}},k=pe("Tag",a,l),p=N(()=>{const{type:i,size:h,color:{color:S,textColor:z}={}}=e,{common:{cubicBezierEaseInOut:T},self:{padding:m,closeMargin:_,borderRadius:y,opacityDisabled:P,textColorCheckable:V,textColorHoverCheckable:O,textColorPressedCheckable:v,textColorChecked:C,colorCheckable:$,colorHoverCheckable:B,colorPressedCheckable:j,colorChecked:W,colorCheckedHover:ee,colorCheckedPressed:ie,closeBorderRadius:se,fontWeightStrong:de,[F("colorBordered",i)]:E,[F("closeSize",h)]:ce,[F("closeIconSize",h)]:ue,[F("fontSize",h)]:K,[F("height",h)]:q,[F("color",i)]:xe,[F("textColor",i)]:ke,[F("border",i)]:ye,[F("closeIconColor",i)]:ne,[F("closeIconColorHover",i)]:he,[F("closeIconColorPressed",i)]:be,[F("closeColorHover",i)]:Ke,[F("closeColorPressed",i)]:Ge}}=n.value,ge=Xe(_);return{"--n-font-weight-strong":de,"--n-avatar-size-override":`calc(${q} - 8px)`,"--n-bezier":T,"--n-border-radius":y,"--n-border":ye,"--n-close-icon-size":ue,"--n-close-color-pressed":Ge,"--n-close-color-hover":Ke,"--n-close-border-radius":se,"--n-close-icon-color":ne,"--n-close-icon-color-hover":he,"--n-close-icon-color-pressed":be,"--n-close-icon-color-disabled":ne,"--n-close-margin-top":ge.top,"--n-close-margin-right":ge.right,"--n-close-margin-bottom":ge.bottom,"--n-close-margin-left":ge.left,"--n-close-size":ce,"--n-color":S||(r.value?E:xe),"--n-color-checkable":$,"--n-color-checked":W,"--n-color-checked-hover":ee,"--n-color-checked-pressed":ie,"--n-color-hover-checkable":B,"--n-color-pressed-checkable":j,"--n-font-size":K,"--n-height":q,"--n-opacity-disabled":P,"--n-padding":m,"--n-text-color":z||ke,"--n-text-color-checkable":V,"--n-text-color-checked":C,"--n-text-color-hover-checkable":O,"--n-text-color-pressed-checkable":v}}),u=t?ae("tag",N(()=>{let i="";const{type:h,size:S,color:{color:z,textColor:T}={}}=e;return i+=h[0],i+=S[0],z&&(i+=`a${Pe(z)}`),T&&(i+=`b${Pe(T)}`),r.value&&(i+="c"),i}),p,e):void 0;return Object.assign(Object.assign({},f),{rtlEnabled:k,mergedClsPrefix:l,contentRef:o,mergedBordered:r,handleClick:d,handleCloseClick:c,cssVars:t?void 0:p,themeClass:u==null?void 0:u.themeClass,onRender:u==null?void 0:u.onRender})},render(){var e,o;const{mergedClsPrefix:r,rtlEnabled:l,closable:t,color:{borderColor:a}={},round:n,onRender:d,$slots:c}=this;d==null||d();const f=G(c.avatar,p=>p&&b("div",{class:`${r}-tag__avatar`},p)),k=G(c.icon,p=>p&&b("div",{class:`${r}-tag__icon`},p));return b("div",{class:[`${r}-tag`,this.themeClass,{[`${r}-tag--rtl`]:l,[`${r}-tag--strong`]:this.strong,[`${r}-tag--disabled`]:this.disabled,[`${r}-tag--checkable`]:this.checkable,[`${r}-tag--checked`]:this.checkable&&this.checked,[`${r}-tag--round`]:n,[`${r}-tag--avatar`]:f,[`${r}-tag--icon`]:k,[`${r}-tag--closable`]:t}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},k||f,b("span",{class:`${r}-tag__content`,ref:"contentRef"},(o=(e=this.$slots).default)===null||o===void 0?void 0:o.call(e)),!this.checkable&&t?b(Ze,{clsPrefix:r,class:`${r}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:n,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?b("div",{class:`${r}-tag__border`,style:{borderColor:a}}):null)}});function To(e){const{borderColor:o,primaryColor:r,baseColor:l,textColorDisabled:t,inputColorDisabled:a,textColor2:n,opacityDisabled:d,borderRadius:c,fontSizeSmall:f,fontSizeMedium:k,fontSizeLarge:p,heightSmall:u,heightMedium:i,heightLarge:h,lineHeight:S}=e;return Object.assign(Object.assign({},qe),{labelLineHeight:S,buttonHeightSmall:u,buttonHeightMedium:i,buttonHeightLarge:h,fontSizeSmall:f,fontSizeMedium:k,fontSizeLarge:p,boxShadow:`inset 0 0 0 1px ${o}`,boxShadowActive:`inset 0 0 0 1px ${r}`,boxShadowFocus:`inset 0 0 0 1px ${r}, 0 0 0 2px ${w(r,{alpha:.2})}`,boxShadowHover:`inset 0 0 0 1px ${r}`,boxShadowDisabled:`inset 0 0 0 1px ${o}`,color:l,colorDisabled:a,colorActive:"#0000",textColor:n,textColorDisabled:t,dotColorActive:r,dotColorDisabled:o,buttonBorderColor:o,buttonBorderColorActive:r,buttonBorderColorHover:o,buttonColor:l,buttonColorActive:l,buttonTextColor:n,buttonTextColorActive:r,buttonTextColorHover:r,opacityDisabled:d,buttonBoxShadowFocus:`inset 0 0 0 1px ${r}, 0 0 0 2px ${w(r,{alpha:.3})}`,buttonBoxShadowHover:"inset 0 0 0 1px #0000",buttonBoxShadow:"inset 0 0 0 1px #0000",buttonBorderRadius:c})}const Le={common:fe,self:To},Oo=D("radio",`
 line-height: var(--n-label-line-height);
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 align-items: flex-start;
 flex-wrap: nowrap;
 font-size: var(--n-font-size);
 word-break: break-word;
`,[x("checked",[s("dot",`
 background-color: var(--n-color-active);
 `)]),s("dot-wrapper",`
 position: relative;
 flex-shrink: 0;
 flex-grow: 0;
 width: var(--n-radio-size);
 `),D("radio-input",`
 position: absolute;
 border: 0;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 opacity: 0;
 z-index: 1;
 cursor: pointer;
 `),s("dot",`
 position: absolute;
 top: 50%;
 left: 0;
 transform: translateY(-50%);
 height: var(--n-radio-size);
 width: var(--n-radio-size);
 background: var(--n-color);
 box-shadow: var(--n-box-shadow);
 border-radius: 50%;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `,[H("&::before",`
 content: "";
 opacity: 0;
 position: absolute;
 left: 4px;
 top: 4px;
 height: calc(100% - 8px);
 width: calc(100% - 8px);
 border-radius: 50%;
 transform: scale(.8);
 background: var(--n-dot-color-active);
 transition: 
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),x("checked",{boxShadow:"var(--n-box-shadow-active)"},[H("&::before",`
 opacity: 1;
 transform: scale(1);
 `)])]),s("label",`
 color: var(--n-text-color);
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 display: inline-block;
 transition: color .3s var(--n-bezier);
 `),X("disabled",`
 cursor: pointer;
 `,[H("&:hover",[s("dot",{boxShadow:"var(--n-box-shadow-hover)"})]),x("focus",[H("&:not(:active)",[s("dot",{boxShadow:"var(--n-box-shadow-focus)"})])])]),x("disabled",`
 cursor: not-allowed;
 `,[s("dot",{boxShadow:"var(--n-box-shadow-disabled)",backgroundColor:"var(--n-color-disabled)"},[H("&::before",{backgroundColor:"var(--n-dot-color-disabled)"}),x("checked",`
 opacity: 1;
 `)]),s("label",{color:"var(--n-text-color-disabled)"}),D("radio-input",`
 cursor: not-allowed;
 `)])]),Do={name:String,value:{type:[String,Number,Boolean],default:"on"},checked:{type:Boolean,default:void 0},defaultChecked:Boolean,disabled:{type:Boolean,default:void 0},label:String,size:String,onUpdateChecked:[Function,Array],"onUpdate:checked":[Function,Array],checkedValue:{type:Boolean,default:void 0}},Ue=Be("n-radio-group");function Ho(e){const o=De(Ue,null),r=me(e,{mergedSize(m){const{size:_}=e;if(_!==void 0)return _;if(o){const{mergedSizeRef:{value:y}}=o;if(y!==void 0)return y}return m?m.mergedSize.value:"medium"},mergedDisabled(m){return!!(e.disabled||o!=null&&o.disabledRef.value||m!=null&&m.disabled.value)}}),{mergedSizeRef:l,mergedDisabledRef:t}=r,a=M(null),n=M(null),d=M(e.defaultChecked),c=re(e,"checked"),f=Ce(c,d),k=Ve(()=>o?o.valueRef.value===e.value:f.value),p=Ve(()=>{const{name:m}=e;if(m!==void 0)return m;if(o)return o.nameRef.value}),u=M(!1);function i(){if(o){const{doUpdateValue:m}=o,{value:_}=e;L(m,_)}else{const{onUpdateChecked:m,"onUpdate:checked":_}=e,{nTriggerFormInput:y,nTriggerFormChange:P}=r;m&&L(m,!0),_&&L(_,!0),y(),P(),d.value=!0}}function h(){t.value||k.value||i()}function S(){h(),a.value&&(a.value.checked=k.value)}function z(){u.value=!1}function T(){u.value=!0}return{mergedClsPrefix:o?o.mergedClsPrefixRef:te(e).mergedClsPrefixRef,inputRef:a,labelRef:n,mergedName:p,mergedDisabled:t,renderSafeChecked:k,focus:u,mergedSize:l,handleRadioInputChange:S,handleRadioInputBlur:z,handleRadioInputFocus:T}}const jo=Object.assign(Object.assign({},U.props),Do),Mo=A({name:"Radio",props:jo,setup(e){const o=Ho(e),r=U("Radio","-radio",Oo,Le,e,o.mergedClsPrefix),l=N(()=>{const{mergedSize:{value:f}}=o,{common:{cubicBezierEaseInOut:k},self:{boxShadow:p,boxShadowActive:u,boxShadowDisabled:i,boxShadowFocus:h,boxShadowHover:S,color:z,colorDisabled:T,colorActive:m,textColor:_,textColorDisabled:y,dotColorActive:P,dotColorDisabled:V,labelPadding:O,labelLineHeight:v,labelFontWeight:C,[F("fontSize",f)]:$,[F("radioSize",f)]:B}}=r.value;return{"--n-bezier":k,"--n-label-line-height":v,"--n-label-font-weight":C,"--n-box-shadow":p,"--n-box-shadow-active":u,"--n-box-shadow-disabled":i,"--n-box-shadow-focus":h,"--n-box-shadow-hover":S,"--n-color":z,"--n-color-active":m,"--n-color-disabled":T,"--n-dot-color-active":P,"--n-dot-color-disabled":V,"--n-font-size":$,"--n-radio-size":B,"--n-text-color":_,"--n-text-color-disabled":y,"--n-label-padding":O}}),{inlineThemeDisabled:t,mergedClsPrefixRef:a,mergedRtlRef:n}=te(e),d=pe("Radio",n,a),c=t?ae("radio",N(()=>o.mergedSize.value[0]),l,e):void 0;return Object.assign(o,{rtlEnabled:d,cssVars:t?void 0:l,themeClass:c==null?void 0:c.themeClass,onRender:c==null?void 0:c.onRender})},render(){const{$slots:e,mergedClsPrefix:o,onRender:r,label:l}=this;return r==null||r(),b("label",{class:[`${o}-radio`,this.themeClass,this.rtlEnabled&&`${o}-radio--rtl`,this.mergedDisabled&&`${o}-radio--disabled`,this.renderSafeChecked&&`${o}-radio--checked`,this.focus&&`${o}-radio--focus`],style:this.cssVars},b("input",{ref:"inputRef",type:"radio",class:`${o}-radio-input`,value:this.value,name:this.mergedName,checked:this.renderSafeChecked,disabled:this.mergedDisabled,onChange:this.handleRadioInputChange,onFocus:this.handleRadioInputFocus,onBlur:this.handleRadioInputBlur}),b("div",{class:`${o}-radio__dot-wrapper`}," ",b("div",{class:[`${o}-radio__dot`,this.renderSafeChecked&&`${o}-radio__dot--checked`]})),G(e.default,t=>!t&&!l?null:b("div",{ref:"labelRef",class:`${o}-radio__label`},t||l)))}}),No=D("radio-group",`
 display: inline-block;
 font-size: var(--n-font-size);
`,[s("splitor",`
 display: inline-block;
 vertical-align: bottom;
 width: 1px;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 background: var(--n-button-border-color);
 `,[x("checked",{backgroundColor:"var(--n-button-border-color-active)"}),x("disabled",{opacity:"var(--n-opacity-disabled)"})]),x("button-group",`
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `,[D("radio-button",{height:"var(--n-height)",lineHeight:"var(--n-height)"}),s("splitor",{height:"var(--n-height)"})]),D("radio-button",`
 vertical-align: bottom;
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-block;
 box-sizing: border-box;
 padding-left: 14px;
 padding-right: 14px;
 white-space: nowrap;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background: var(--n-button-color);
 color: var(--n-button-text-color);
 border-top: 1px solid var(--n-button-border-color);
 border-bottom: 1px solid var(--n-button-border-color);
 `,[D("radio-input",`
 pointer-events: none;
 position: absolute;
 border: 0;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 opacity: 0;
 z-index: 1;
 `),s("state-border",`
 z-index: 1;
 pointer-events: none;
 position: absolute;
 box-shadow: var(--n-button-box-shadow);
 transition: box-shadow .3s var(--n-bezier);
 left: -1px;
 bottom: -1px;
 right: -1px;
 top: -1px;
 `),H("&:first-child",`
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 border-left: 1px solid var(--n-button-border-color);
 `,[s("state-border",`
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]),H("&:last-child",`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `,[s("state-border",`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]),X("disabled",`
 cursor: pointer;
 `,[H("&:hover",[s("state-border",`
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `),X("checked",{color:"var(--n-button-text-color-hover)"})]),x("focus",[H("&:not(:active)",[s("state-border",{boxShadow:"var(--n-button-box-shadow-focus)"})])])]),x("checked",`
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `),x("disabled",`
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]);function Ao(e,o,r){var l;const t=[];let a=!1;for(let n=0;n<e.length;++n){const d=e[n],c=(l=d.type)===null||l===void 0?void 0:l.name;c==="RadioButton"&&(a=!0);const f=d.props;if(c!=="RadioButton"){t.push(d);continue}if(n===0)t.push(d);else{const k=t[t.length-1].props,p=o===k.value,u=k.disabled,i=o===f.value,h=f.disabled,S=(p?2:0)+(u?0:1),z=(i?2:0)+(h?0:1),T={[`${r}-radio-group__splitor--disabled`]:u,[`${r}-radio-group__splitor--checked`]:p},m={[`${r}-radio-group__splitor--disabled`]:h,[`${r}-radio-group__splitor--checked`]:i},_=S<z?m:T;t.push(b("div",{class:[`${r}-radio-group__splitor`,_]}),d)}}return{children:t,isButtonGroup:a}}const Eo=Object.assign(Object.assign({},U.props),{name:String,value:[String,Number,Boolean],defaultValue:{type:[String,Number,Boolean],default:null},size:String,disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),Lo=A({name:"RadioGroup",props:Eo,setup(e){const o=M(null),{mergedSizeRef:r,mergedDisabledRef:l,nTriggerFormChange:t,nTriggerFormInput:a,nTriggerFormBlur:n,nTriggerFormFocus:d}=me(e),{mergedClsPrefixRef:c,inlineThemeDisabled:f,mergedRtlRef:k}=te(e),p=U("Radio","-radio-group",No,Le,e,c),u=M(e.defaultValue),i=re(e,"value"),h=Ce(i,u);function S(P){const{onUpdateValue:V,"onUpdate:value":O}=e;V&&L(V,P),O&&L(O,P),u.value=P,t(),a()}function z(P){const{value:V}=o;V&&(V.contains(P.relatedTarget)||d())}function T(P){const{value:V}=o;V&&(V.contains(P.relatedTarget)||n())}$e(Ue,{mergedClsPrefixRef:c,nameRef:re(e,"name"),valueRef:h,disabledRef:l,mergedSizeRef:r,doUpdateValue:S});const m=pe("Radio",k,c),_=N(()=>{const{value:P}=r,{common:{cubicBezierEaseInOut:V},self:{buttonBorderColor:O,buttonBorderColorActive:v,buttonBorderRadius:C,buttonBoxShadow:$,buttonBoxShadowFocus:B,buttonBoxShadowHover:j,buttonColor:W,buttonColorActive:ee,buttonTextColor:ie,buttonTextColorActive:se,buttonTextColorHover:de,opacityDisabled:E,[F("buttonHeight",P)]:ce,[F("fontSize",P)]:ue}}=p.value;return{"--n-font-size":ue,"--n-bezier":V,"--n-button-border-color":O,"--n-button-border-color-active":v,"--n-button-border-radius":C,"--n-button-box-shadow":$,"--n-button-box-shadow-focus":B,"--n-button-box-shadow-hover":j,"--n-button-color":W,"--n-button-color-active":ee,"--n-button-text-color":ie,"--n-button-text-color-hover":de,"--n-button-text-color-active":se,"--n-height":ce,"--n-opacity-disabled":E}}),y=f?ae("radio-group",N(()=>r.value[0]),_,e):void 0;return{selfElRef:o,rtlEnabled:m,mergedClsPrefix:c,mergedValue:h,handleFocusout:T,handleFocusin:z,cssVars:f?void 0:_,themeClass:y==null?void 0:y.themeClass,onRender:y==null?void 0:y.onRender}},render(){var e;const{mergedValue:o,mergedClsPrefix:r,handleFocusin:l,handleFocusout:t}=this,{children:a,isButtonGroup:n}=Ao(Je(Qe(this)),o,r);return(e=this.onRender)===null||e===void 0||e.call(this),b("div",{onFocusin:l,onFocusout:t,ref:"selfElRef",class:[`${r}-radio-group`,this.rtlEnabled&&`${r}-radio-group--rtl`,this.themeClass,n&&`${r}-radio-group--button-group`],style:this.cssVars},a)}}),Uo=eo({name:"DynamicTags",common:fe,peers:{Input:Ro,Button:ro,Tag:Ae,Space:oo},self(){return{inputWidth:"64px"}}}),Wo=D("dynamic-tags",[D("input",{minWidth:"var(--n-input-width)"})]),Ko=Object.assign(Object.assign(Object.assign({},U.props),Ee),{size:{type:String,default:"medium"},closable:{type:Boolean,default:!0},defaultValue:{type:Array,default:()=>[]},value:Array,inputClass:String,inputStyle:[String,Object],inputProps:Object,max:Number,tagClass:String,tagStyle:[String,Object],renderTag:Function,onCreate:{type:Function,default:e=>e},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]}),Go=A({name:"DynamicTags",props:Ko,slots:Object,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:r}=te(e),{localeRef:l}=zo("DynamicTags"),t=me(e),{mergedDisabledRef:a}=t,n=M(""),d=M(!1),c=M(!0),f=M(null),k=U("DynamicTags","-dynamic-tags",Wo,Uo,e,o),p=M(e.defaultValue),u=re(e,"value"),i=Ce(u,p),h=N(()=>l.value.add),S=N(()=>_o(e.size)),z=N(()=>a.value||!!e.max&&i.value.length>=e.max);function T(C){const{onChange:$,"onUpdate:value":B,onUpdateValue:j}=e,{nTriggerFormInput:W,nTriggerFormChange:ee}=t;$&&L($,C),j&&L(j,C),B&&L(B,C),p.value=C,W(),ee()}function m(C){const $=i.value.slice(0);$.splice(C,1),T($)}function _(C){switch(C.key){case"Enter":y()}}function y(C){const $=C??n.value;if($){const B=i.value.slice(0);B.push(e.onCreate($)),T(B)}d.value=!1,c.value=!0,n.value=""}function P(){y()}function V(){d.value=!0,no(()=>{var C;(C=f.value)===null||C===void 0||C.focus(),c.value=!1})}const O=N(()=>{const{self:{inputWidth:C}}=k.value;return{"--n-input-width":C}}),v=r?ae("dynamic-tags",void 0,O,e):void 0;return{mergedClsPrefix:o,inputInstRef:f,localizedAdd:h,inputSize:S,inputValue:n,showInput:d,inputForceFocused:c,mergedValue:i,mergedDisabled:a,triggerDisabled:z,handleInputKeyDown:_,handleAddClick:V,handleInputBlur:P,handleCloseClick:m,handleInputConfirm:y,mergedTheme:k,cssVars:r?void 0:O,themeClass:v==null?void 0:v.themeClass,onRender:v==null?void 0:v.onRender}},render(){const{mergedTheme:e,cssVars:o,mergedClsPrefix:r,onRender:l,renderTag:t}=this;return l==null||l(),b(Z,{class:[`${r}-dynamic-tags`,this.themeClass],size:"small",style:o,theme:e.peers.Space,themeOverrides:e.peerOverrides.Space,itemStyle:"display: flex;"},{default:()=>{const{mergedTheme:a,tagClass:n,tagStyle:d,type:c,round:f,size:k,color:p,closable:u,mergedDisabled:i,showInput:h,inputValue:S,inputClass:z,inputStyle:T,inputSize:m,inputForceFocused:_,triggerDisabled:y,handleInputKeyDown:P,handleInputBlur:V,handleAddClick:O,handleCloseClick:v,handleInputConfirm:C,$slots:$}=this;return this.mergedValue.map((B,j)=>t?t(B,j):b(Fo,{key:j,theme:a.peers.Tag,themeOverrides:a.peerOverrides.Tag,class:n,style:d,type:c,round:f,size:k,color:p,closable:u,disabled:i,onClose:()=>{v(j)}},{default:()=>typeof B=="string"?B:B.label})).concat(h?$.input?$.input({submit:C,deactivate:V}):b(So,Object.assign({placeholder:"",size:m,style:T,class:z,autosize:!0},this.inputProps,{ref:"inputInstRef",value:S,onUpdateValue:B=>{this.inputValue=B},theme:a.peers.Input,themeOverrides:a.peerOverrides.Input,onKeydown:P,onBlur:V,internalForceFocus:_})):$.trigger?$.trigger({activate:O,disabled:y}):b(He,{dashed:!0,disabled:y,theme:a.peers.Button,themeOverrides:a.peerOverrides.Button,size:m,onClick:O},{icon:()=>b(to,{clsPrefix:r},{default:()=>b($o,null)})}))}})}});function Yo(e){const{primaryColor:o,opacityDisabled:r,borderRadius:l,textColor3:t}=e;return Object.assign(Object.assign({},ao),{iconColor:t,textColor:"white",loadingColor:o,opacityDisabled:r,railColor:"rgba(0, 0, 0, .14)",railColorActive:o,buttonBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",buttonColor:"#FFF",railBorderRadiusSmall:l,railBorderRadiusMedium:l,railBorderRadiusLarge:l,buttonBorderRadiusSmall:l,buttonBorderRadiusMedium:l,buttonBorderRadiusLarge:l,boxShadowFocus:`0 0 0 2px ${w(o,{alpha:.2})}`})}const Zo={common:fe,self:Yo},Xo=H([D("list",`
 --n-merged-border-color: var(--n-border-color);
 --n-merged-color: var(--n-color);
 --n-merged-color-hover: var(--n-color-hover);
 margin: 0;
 font-size: var(--n-font-size);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 padding: 0;
 list-style-type: none;
 color: var(--n-text-color);
 background-color: var(--n-merged-color);
 `,[x("show-divider",[D("list-item",[H("&:not(:last-child)",[s("divider",`
 background-color: var(--n-merged-border-color);
 `)])])]),x("clickable",[D("list-item",`
 cursor: pointer;
 `)]),x("bordered",`
 border: 1px solid var(--n-merged-border-color);
 border-radius: var(--n-border-radius);
 `),x("hoverable",[D("list-item",`
 border-radius: var(--n-border-radius);
 `,[H("&:hover",`
 background-color: var(--n-merged-color-hover);
 `,[s("divider",`
 background-color: transparent;
 `)])])]),x("bordered, hoverable",[D("list-item",`
 padding: 12px 20px;
 `),s("header, footer",`
 padding: 12px 20px;
 `)]),s("header, footer",`
 padding: 12px 0;
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[H("&:not(:last-child)",`
 border-bottom: 1px solid var(--n-merged-border-color);
 `)]),D("list-item",`
 position: relative;
 padding: 12px 0; 
 box-sizing: border-box;
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[s("prefix",`
 margin-right: 20px;
 flex: 0;
 `),s("suffix",`
 margin-left: 20px;
 flex: 0;
 `),s("main",`
 flex: 1;
 `),s("divider",`
 height: 1px;
 position: absolute;
 bottom: 0;
 left: 0;
 right: 0;
 background-color: transparent;
 transition: background-color .3s var(--n-bezier);
 pointer-events: none;
 `)])]),lo(D("list",`
 --n-merged-color-hover: var(--n-color-hover-modal);
 --n-merged-color: var(--n-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),io(D("list",`
 --n-merged-color-hover: var(--n-color-hover-popover);
 --n-merged-color: var(--n-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),qo=Object.assign(Object.assign({},U.props),{size:{type:String,default:"medium"},bordered:Boolean,clickable:Boolean,hoverable:Boolean,showDivider:{type:Boolean,default:!0}}),We=Be("n-list"),Jo=A({name:"List",props:qo,slots:Object,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:r,mergedRtlRef:l}=te(e),t=pe("List",l,o),a=U("List","-list",Xo,so,e,o);$e(We,{showDividerRef:re(e,"showDivider"),mergedClsPrefixRef:o});const n=N(()=>{const{common:{cubicBezierEaseInOut:c},self:{fontSize:f,textColor:k,color:p,colorModal:u,colorPopover:i,borderColor:h,borderColorModal:S,borderColorPopover:z,borderRadius:T,colorHover:m,colorHoverModal:_,colorHoverPopover:y}}=a.value;return{"--n-font-size":f,"--n-bezier":c,"--n-text-color":k,"--n-color":p,"--n-border-radius":T,"--n-border-color":h,"--n-border-color-modal":S,"--n-border-color-popover":z,"--n-color-modal":u,"--n-color-popover":i,"--n-color-hover":m,"--n-color-hover-modal":_,"--n-color-hover-popover":y}}),d=r?ae("list",void 0,n,e):void 0;return{mergedClsPrefix:o,rtlEnabled:t,cssVars:r?void 0:n,themeClass:d==null?void 0:d.themeClass,onRender:d==null?void 0:d.onRender}},render(){var e;const{$slots:o,mergedClsPrefix:r,onRender:l}=this;return l==null||l(),b("ul",{class:[`${r}-list`,this.rtlEnabled&&`${r}-list--rtl`,this.bordered&&`${r}-list--bordered`,this.showDivider&&`${r}-list--show-divider`,this.hoverable&&`${r}-list--hoverable`,this.clickable&&`${r}-list--clickable`,this.themeClass],style:this.cssVars},o.header?b("div",{class:`${r}-list__header`},o.header()):null,(e=o.default)===null||e===void 0?void 0:e.call(o),o.footer?b("div",{class:`${r}-list__footer`},o.footer()):null)}}),ze=A({name:"ListItem",slots:Object,setup(){const e=De(We,null);return e||co("list-item","`n-list-item` must be placed in `n-list`."),{showDivider:e.showDividerRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){const{$slots:e,mergedClsPrefix:o}=this;return b("li",{class:`${o}-list-item`},e.prefix?b("div",{class:`${o}-list-item__prefix`},e.prefix()):null,e.default?b("div",{class:`${o}-list-item__main`},e):null,e.suffix?b("div",{class:`${o}-list-item__suffix`},e.suffix()):null,this.showDivider&&b("div",{class:`${o}-list-item__divider`}))}}),Qo=D("switch",`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[s("children-placeholder",`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),s("rail-placeholder",`
 display: flex;
 flex-wrap: none;
 `),s("button-placeholder",`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),D("base-loading",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[Fe({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})]),s("checked, unchecked",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `),s("checked",`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),s("unchecked",`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),H("&:focus",[s("rail",`
 box-shadow: var(--n-box-shadow-focus);
 `)]),x("round",[s("rail","border-radius: calc(var(--n-rail-height) / 2);",[s("button","border-radius: calc(var(--n-button-height) / 2);")])]),X("disabled",[X("icon",[x("rubber-band",[x("pressed",[s("rail",[s("button","max-width: var(--n-button-width-pressed);")])]),s("rail",[H("&:active",[s("button","max-width: var(--n-button-width-pressed);")])]),x("active",[x("pressed",[s("rail",[s("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]),s("rail",[H("&:active",[s("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]),x("active",[s("rail",[s("button","left: calc(100% - var(--n-button-width) - var(--n-offset))")])]),s("rail",`
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[s("button-icon",`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `,[Fe()]),s("button",`
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]),x("active",[s("rail","background-color: var(--n-rail-color-active);")]),x("loading",[s("rail",`
 cursor: wait;
 `)]),x("disabled",[s("rail",`
 cursor: not-allowed;
 opacity: .5;
 `)])]),er=Object.assign(Object.assign({},U.props),{size:{type:String,default:"medium"},value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},onChange:[Function,Array]});let ve;const Oe=A({name:"Switch",props:er,slots:Object,setup(e){ve===void 0&&(typeof CSS<"u"?typeof CSS.supports<"u"?ve=CSS.supports("width","max(1px)"):ve=!1:ve=!0);const{mergedClsPrefixRef:o,inlineThemeDisabled:r}=te(e),l=U("Switch","-switch",Qo,Zo,e,o),t=me(e),{mergedSizeRef:a,mergedDisabledRef:n}=t,d=M(e.defaultValue),c=re(e,"value"),f=Ce(c,d),k=N(()=>f.value===e.checkedValue),p=M(!1),u=M(!1),i=N(()=>{const{railStyle:v}=e;if(v)return v({focused:u.value,checked:k.value})});function h(v){const{"onUpdate:value":C,onChange:$,onUpdateValue:B}=e,{nTriggerFormInput:j,nTriggerFormChange:W}=t;C&&L(C,v),B&&L(B,v),$&&L($,v),d.value=v,j(),W()}function S(){const{nTriggerFormFocus:v}=t;v()}function z(){const{nTriggerFormBlur:v}=t;v()}function T(){e.loading||n.value||(f.value!==e.checkedValue?h(e.checkedValue):h(e.uncheckedValue))}function m(){u.value=!0,S()}function _(){u.value=!1,z(),p.value=!1}function y(v){e.loading||n.value||v.key===" "&&(f.value!==e.checkedValue?h(e.checkedValue):h(e.uncheckedValue),p.value=!1)}function P(v){e.loading||n.value||v.key===" "&&(v.preventDefault(),p.value=!0)}const V=N(()=>{const{value:v}=a,{self:{opacityDisabled:C,railColor:$,railColorActive:B,buttonBoxShadow:j,buttonColor:W,boxShadowFocus:ee,loadingColor:ie,textColor:se,iconColor:de,[F("buttonHeight",v)]:E,[F("buttonWidth",v)]:ce,[F("buttonWidthPressed",v)]:ue,[F("railHeight",v)]:K,[F("railWidth",v)]:q,[F("railBorderRadius",v)]:xe,[F("buttonBorderRadius",v)]:ke},common:{cubicBezierEaseInOut:ye}}=l.value;let ne,he,be;return ve?(ne=`calc((${K} - ${E}) / 2)`,he=`max(${K}, ${E})`,be=`max(${q}, calc(${q} + ${E} - ${K}))`):(ne=Re((Y(K)-Y(E))/2),he=Re(Math.max(Y(K),Y(E))),be=Y(K)>Y(E)?q:Re(Y(q)+Y(E)-Y(K))),{"--n-bezier":ye,"--n-button-border-radius":ke,"--n-button-box-shadow":j,"--n-button-color":W,"--n-button-width":ce,"--n-button-width-pressed":ue,"--n-button-height":E,"--n-height":he,"--n-offset":ne,"--n-opacity-disabled":C,"--n-rail-border-radius":xe,"--n-rail-color":$,"--n-rail-color-active":B,"--n-rail-height":K,"--n-rail-width":q,"--n-width":be,"--n-box-shadow-focus":ee,"--n-loading-color":ie,"--n-text-color":se,"--n-icon-color":de}}),O=r?ae("switch",N(()=>a.value[0]),V,e):void 0;return{handleClick:T,handleBlur:_,handleFocus:m,handleKeyup:y,handleKeydown:P,mergedRailStyle:i,pressed:p,mergedClsPrefix:o,mergedValue:f,checked:k,mergedDisabled:n,cssVars:r?void 0:V,themeClass:O==null?void 0:O.themeClass,onRender:O==null?void 0:O.onRender}},render(){const{mergedClsPrefix:e,mergedDisabled:o,checked:r,mergedRailStyle:l,onRender:t,$slots:a}=this;t==null||t();const{checked:n,unchecked:d,icon:c,"checked-icon":f,"unchecked-icon":k}=a,p=!(we(c)&&we(f)&&we(k));return b("div",{role:"switch","aria-checked":r,class:[`${e}-switch`,this.themeClass,p&&`${e}-switch--icon`,r&&`${e}-switch--active`,o&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},b("div",{class:`${e}-switch__rail`,"aria-hidden":"true",style:l},G(n,u=>G(d,i=>u||i?b("div",{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},b("div",{class:`${e}-switch__rail-placeholder`},b("div",{class:`${e}-switch__button-placeholder`}),u),b("div",{class:`${e}-switch__rail-placeholder`},b("div",{class:`${e}-switch__button-placeholder`}),i)):null)),b("div",{class:`${e}-switch__button`},G(c,u=>G(f,i=>G(k,h=>b(uo,null,{default:()=>this.loading?b(ho,{key:"loading",clsPrefix:e,strokeWidth:20}):this.checked&&(i||u)?b("div",{class:`${e}-switch__button-icon`,key:i?"checked-icon":"icon"},i||u):!this.checked&&(h||u)?b("div",{class:`${e}-switch__button-icon`,key:h?"unchecked-icon":"icon"},h||u):null})))),G(n,u=>u&&b("div",{key:"checked",class:`${e}-switch__checked`},u)),G(d,u=>u&&b("div",{key:"unchecked",class:`${e}-switch__unchecked`},u)))))}}),or=A({__name:"Theme",setup(e){const o=Ie(),r=[{value:Te,label:vo},{value:Se,label:go},{value:po,label:fo}];function l(t){switch(t){case Te:o.isDarktheme=!1;break;case Se:o.isDarktheme=!0;break;default:o.isDarktheme=bo().value===Se,o.isFollowSystem=!0;break}}return(t,a)=>(Q(),le(g(Lo),{"onUpdate:value":[l,a[0]||(a[0]=n=>g(o).themeZhCN=n)],value:g(o).themeZhCN,name:"themeRadiogroup"},{default:I(()=>[R(g(Z),null,{default:I(()=>[(Q(),je(Ne,null,Me(r,n=>R(g(Mo),{key:n.value,value:n.value},{default:I(()=>[J(mo(n.label),1)]),_:2},1032,["value"])),64))]),_:1})]),_:1},8,["value"]))}}),rr="#18a058",tr="#2080f0",nr="#f0a020",ar="#d03050",lr=A({__name:"Color",setup(e){const o=Ie(),r=[{type:"success",color:rr},{type:"info",color:tr},{type:"warning",color:nr},{type:"error",color:ar}];function l(n){o.themeOverrides={common:{primaryColor:n},Button:{textColor:n}}}function t(n){l(n)}function a(n){const d=n.target;l(d.value)}return(n,d)=>(Q(),le(g(Z),{align:"center"},{default:I(()=>[(Q(),je(Ne,null,Me(r,c=>R(g(He),{circle:"",key:c.type,type:c.type,onClick:f=>t(c.color)},null,8,["type","onClick"])),64)),_e("input",{onChange:a,type:"color",name:"color"},null,32)]),_:1}))}}),ir=A({__name:"MusicSetting",setup(e){const o=Ie(),r=Co();return(l,t)=>(Q(),le(g(Z),{vertical:""},{default:I(()=>[R(g(Z),null,{default:I(()=>[R(g(Oe),{value:g(o).musicSetting.destoryComponent,"onUpdate:value":t[0]||(t[0]=a=>g(o).musicSetting.destoryComponent=a)},null,8,["value"]),R(g(oe),null,{default:I(()=>t[3]||(t[3]=[J("销毁音乐页面")])),_:1,__:[3]})]),_:1}),R(g(Z),null,{default:I(()=>[R(g(Oe),{value:g(o).musicSetting.showMusicBtn,"onUpdate:value":t[1]||(t[1]=a=>g(o).musicSetting.showMusicBtn=a)},null,8,["value"]),R(g(oe),null,{default:I(()=>t[4]||(t[4]=[J("隐藏/显示音乐页面按钮")])),_:1,__:[4]})]),_:1}),R(g(Z),{vertical:""},{default:I(()=>[R(g(oe),{tag:"a",target:"_blank",href:"https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats/Containers"},{default:I(()=>t[5]||(t[5]=[J("简单来说：浏览器的编解码器支持，理论上无论什么格式的容器都能播放")])),_:1,__:[5]}),R(g(oe),null,{default:I(()=>t[6]||(t[6]=[J("实际上得自己动手测试了……")])),_:1,__:[6]}),R(g(Z),{align:"center"},{default:I(()=>[R(g(oe),null,{default:I(()=>t[7]||(t[7]=[J("目前支持的音乐格式：")])),_:1,__:[7]}),R(g(Go),{value:g(r).encode,"onUpdate:value":t[2]||(t[2]=a=>g(r).encode=a)},null,8,["value"])]),_:1})]),_:1})]),_:1}))}}),sr=A({__name:"CR",setup(e){return(o,r)=>(Q(),le(g(xo),{size:"18"},{default:I(()=>r[0]||(r[0]=[_e("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[_e("path",{d:"M11.88 9.14c1.28.06 1.61 1.15 1.63 1.66h1.79c-.08-1.98-1.49-3.19-3.45-3.19C9.64 7.61 8 9 8 12.14c0 1.94.93 4.24 3.84 4.24c2.22 0 3.41-1.65 3.44-2.95h-1.79c-.03.59-.45 1.38-1.63 1.44c-1.31-.04-1.86-1.06-1.86-2.73c0-2.89 1.28-2.98 1.88-3zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z",fill:"currentColor"})],-1)])),_:1,__:[0]}))}}),dr=A({__name:"Copyright",setup(e){return(o,r)=>(Q(),le(g(Z),null,{default:I(()=>[R(sr),R(g(oe),null,{default:I(()=>r[0]||(r[0]=[J(" 2025 ")])),_:1,__:[0]}),R(g(oe),{class:"a",tag:"a",href:"https://github.com/pointchange",target:"_blank"},{default:I(()=>r[1]||(r[1]=[J(" pointchange ")])),_:1,__:[1]})]),_:1}))}}),cr=ko(dr,[["__scopeId","data-v-e945d37e"]]),br=A({__name:"SettingView",setup(e){return(o,r)=>(Q(),le(g(yo),null,{default:I(()=>[R(g(wo),null,{default:I(()=>[R(g(Jo),{hoverable:""},{footer:I(()=>[R(cr)]),default:I(()=>[R(g(ze),null,{default:I(()=>[R(or)]),_:1}),R(g(ze),null,{default:I(()=>[R(lr)]),_:1}),R(g(ze),null,{default:I(()=>[R(ir)]),_:1})]),_:1})]),_:1})]),_:1}))}});export{br as default};
