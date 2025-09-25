var cd=Object.defineProperty;var hd=(i,t,e)=>t in i?cd(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var X=(i,t,e)=>(hd(i,typeof t!="symbol"?t+"":t,e),e),hi=(i,t,e)=>{if(!t.has(i))throw TypeError("Cannot "+e)};var gt=(i,t,e)=>(hi(i,t,"read from private field"),e?e.call(i):t.get(i)),Et=(i,t,e)=>{if(t.has(i))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(i):t.set(i,e)},ne=(i,t,e,s)=>(hi(i,t,"write to private field"),s?s.call(i,e):t.set(i,e),e);var Ot=(i,t,e)=>(hi(i,t,"access private method"),e);const xi={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(i){var t="",e,s,n,a,r,o,h,u=0;for(i=xi._utf8_encode(i);u<i.length;)e=i.charCodeAt(u++),s=i.charCodeAt(u++),n=i.charCodeAt(u++),a=e>>2,r=(e&3)<<4|s>>4,o=(s&15)<<2|n>>6,h=n&63,isNaN(s)?o=h=64:isNaN(n)&&(h=64),t=t+this._keyStr.charAt(a)+this._keyStr.charAt(r)+this._keyStr.charAt(o)+this._keyStr.charAt(h);return t},decode:function(i){var t="",e,s,n,a,r,o,h,u=0;for(i=i.replace(/[^A-Za-z0-9\+\/\=]/g,"");u<i.length;)a=this._keyStr.indexOf(i.charAt(u++)),r=this._keyStr.indexOf(i.charAt(u++)),o=this._keyStr.indexOf(i.charAt(u++)),h=this._keyStr.indexOf(i.charAt(u++)),e=a<<2|r>>4,s=(r&15)<<4|o>>2,n=(o&3)<<6|h,t=t+String.fromCharCode(e),o!=64&&(t=t+String.fromCharCode(s)),h!=64&&(t=t+String.fromCharCode(n));return t=xi._utf8_decode(t),t},_utf8_encode:function(i){i=i.replace(/\r\n/g,`
`);for(var t="",e=0;e<i.length;e++){var s=i.charCodeAt(e);s<128?t+=String.fromCharCode(s):s>127&&s<2048?(t+=String.fromCharCode(s>>6|192),t+=String.fromCharCode(s&63|128)):(t+=String.fromCharCode(s>>12|224),t+=String.fromCharCode(s>>6&63|128),t+=String.fromCharCode(s&63|128))}return t},_utf8_decode:function(i){let t="",e=0,s=0,n=0,a=0;for(;e<i.length;)s=i.charCodeAt(e),s<128?(t+=String.fromCharCode(s),e++):s>191&&s<224?(n=i.charCodeAt(e+1),t+=String.fromCharCode((s&31)<<6|n&63),e+=2):(n=i.charCodeAt(e+1),a=i.charCodeAt(e+2),t+=String.fromCharCode((s&15)<<12|(n&63)<<6|a&63),e+=3);return t}},En=i=>xi.encode(JSON.stringify(i));class ud{constructor(t,e,s){X(this,"mutationCallback",t=>{for(let e of t)if(e.type==="attributes"&&e.attributeName==="data-"+this.dataName){let s=e.target.dataset[this.dataName];this.changedCallback(s,this.lastDataState),this.lastDataState=s}});this.node=t,this.dataName=e,this.changedCallback=s,this.observer=null,this.lastDataState=t.classList.contains(this.dataName),this.init()}init(){this.observer=new MutationObserver(this.mutationCallback),this.observe()}observe(){this.observer.observe(this.node,{attributes:!0})}disconnect(){this.observer.disconnect()}}const ss={},ke=i=>{delete ss[i]},Tt=(i,t)=>{const e=i.querySelectorAll(".zume-collapse");(!Object.prototype.hasOwnProperty.call(ss,t)||ss[t].length===0)&&(ss[t]=[],e.forEach(n=>{const a=new ud(n,"expand",s);ss[t].push(a)}));function s(n,a){if(n===a)return;const r=n==="",o=this.node,h=o.scrollHeight,u="200";r?(o.style.display="block",o.style.transitionDuration=u+"ms",o.dataset.state="opening",setTimeout(()=>{o.style.height=o.scrollHeight+"px"},10),setTimeout(()=>{o.style.height="auto",o.dataset.state="open"},u)):(o.style.height=h+"px",o.dataset.state="closing",setTimeout(()=>{o.style.height="0"},10),setTimeout(()=>{o.dataset.state="closed",o.style.display="none"},u))}};class pd{constructor(t,e,s){this.root=t,this.base=e,this.nonce=s,this.fetch=this.fetch.bind(this),this.get=this.get.bind(this),this.post=this.post.bind(this),this.put=this.put.bind(this),this.update=this.update.bind(this),this.delete=this.delete.bind(this)}fetch(t,e,s={},n=""){let a=this.base;n.length>0&&(a=n),!this.base.endsWith("/")&&!e.startsWith("/")&&(a+="/");let r=`${this.root}${a}${e}`;if(t==="GET"&&Object.keys(s).length>0){const o=new URLSearchParams(s);r+="?"+o.toString()}return fetch(r,{method:t,headers:{"Content-Type":"application/json; charset=utf-8","X-WP-Nonce":this.nonce},body:t==="GET"?null:JSON.stringify(s)}).then(o=>Promise.all([Promise.resolve(o.ok),o.json()])).then(([o,h])=>{if(!o)throw new Error(h.code);return h})}get(t,e={},s=""){return this.fetch("GET",t,e,s)}post(t,e={},s=""){return this.fetch("POST",t,e,s)}put(t,e={},s=""){return this.fetch("PUT",t,e,s)}update(t,e={},s=""){return this.fetch("UPDATE",t,e,s)}delete(t,e={},s=""){return this.fetch("DELETE",t,e,s)}}const F=new pd(window.zumeApiShare.root,"zume_system/v1",window.zumeApiShare.nonce);window.zumeRequest=F;var Oi;let $d=(Oi=class{static save(t,e){localStorage.setItem(this.createKey(t),JSON.stringify(e))}static load(t){const e=localStorage.getItem(this.createKey(t));try{return JSON.parse(e)}catch{return e}}static createKey(t){return this.prefix+t}},X(Oi,"prefix","Z5_"),Oi);window.ZumeStorage=$d;/**
* @license
* Copyright 2019 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const Ds=window,qi=Ds.ShadowRoot&&(Ds.ShadyCSS===void 0||Ds.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Bi=Symbol(),Tn=new WeakMap;let Ca=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Bi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(qi&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Tn.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Tn.set(e,t))}return t}toString(){return this.cssText}};const fd=i=>new Ca(typeof i=="string"?i:i+"",void 0,Bi),Vi=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,n,a)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[a+1],i[0]);return new Ca(e,i,Bi)},md=(i,t)=>{qi?i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const s=document.createElement("style"),n=Ds.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)})},Mn=qi?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return fd(e)})(i):i;/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/var ui;const Rs=window,In=Rs.trustedTypes,gd=In?In.emptyScript:"",Dn=Rs.reactiveElementPolyfillSupport,Ei={toAttribute(i,t){switch(t){case Boolean:i=i?gd:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},ja=(i,t)=>t!==i&&(t==t||i==i),pi={attribute:!0,type:String,converter:Ei,reflect:!1,hasChanged:ja},Ti="finalized";let Ae=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const n=this._$Ep(s,e);n!==void 0&&(this._$Ev.set(n,s),t.push(n))}),t}static createProperty(t,e=pi){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s=typeof t=="symbol"?Symbol():"__"+t,n=this.getPropertyDescriptor(t,s,e);n!==void 0&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(n){const a=this[t];this[e]=n,this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||pi}static finalize(){if(this.hasOwnProperty(Ti))return!1;this[Ti]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const n of s)this.createProperty(n,e[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const n of s)e.unshift(Mn(n))}else t!==void 0&&e.push(Mn(t));return e}static _$Ep(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return md(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=pi){var n;const a=this.constructor._$Ep(t,s);if(a!==void 0&&s.reflect===!0){const r=(((n=s.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?s.converter:Ei).toAttribute(e,s.type);this._$El=t,r==null?this.removeAttribute(a):this.setAttribute(a,r),this._$El=null}}_$AK(t,e){var s;const n=this.constructor,a=n._$Ev.get(t);if(a!==void 0&&this._$El!==a){const r=n.getPropertyOptions(a),o=typeof r.converter=="function"?{fromAttribute:r.converter}:((s=r.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?r.converter:Ei;this._$El=a,this[a]=o.fromAttribute(e,r.type),this._$El=null}}requestUpdate(t,e,s){let n=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||ja)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,a)=>this[a]=n),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(n=>{var a;return(a=n.hostUpdate)===null||a===void 0?void 0:a.call(n)}),this.update(s)):this._$Ek()}catch(n){throw e=!1,this._$Ek(),n}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var n;return(n=s.hostUpdated)===null||n===void 0?void 0:n.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};Ae[Ti]=!0,Ae.elementProperties=new Map,Ae.elementStyles=[],Ae.shadowRootOptions={mode:"open"},Dn==null||Dn({ReactiveElement:Ae}),((ui=Rs.reactiveElementVersions)!==null&&ui!==void 0?ui:Rs.reactiveElementVersions=[]).push("1.6.3");/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/var $i;const Fs=window,qe=Fs.trustedTypes,Ln=qe?qe.createPolicy("lit-html",{createHTML:i=>i}):void 0,Us="$lit$",te=`lit$${(Math.random()+"").slice(9)}$`,Wi="?"+te,bd=`<${Wi}>`,Ce=document,ds=()=>Ce.createComment(""),os=i=>i===null||typeof i!="object"&&typeof i!="function",Oa=Array.isArray,xa=i=>Oa(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",fi=`[ 	
\f\r]`,Xe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Nn=/-->/g,An=/>/g,me=RegExp(`>|${fi}(?:([^\\s"'>=/]+)(${fi}*=${fi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Pn=/'/g,zn=/"/g,Ea=/^(?:script|style|textarea|title)$/i,Ta=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),l=Ta(1),js=Ta(2),Vt=Symbol.for("lit-noChange"),ct=Symbol.for("lit-nothing"),Rn=new WeakMap,_e=Ce.createTreeWalker(Ce,129,null,!1);function Ma(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ln!==void 0?Ln.createHTML(t):t}const Ia=(i,t)=>{const e=i.length-1,s=[];let n,a=t===2?"<svg>":"",r=Xe;for(let o=0;o<e;o++){const h=i[o];let u,y,j=-1,E=0;for(;E<h.length&&(r.lastIndex=E,y=r.exec(h),y!==null);)E=r.lastIndex,r===Xe?y[1]==="!--"?r=Nn:y[1]!==void 0?r=An:y[2]!==void 0?(Ea.test(y[2])&&(n=RegExp("</"+y[2],"g")),r=me):y[3]!==void 0&&(r=me):r===me?y[0]===">"?(r=n??Xe,j=-1):y[1]===void 0?j=-2:(j=r.lastIndex-y[2].length,u=y[1],r=y[3]===void 0?me:y[3]==='"'?zn:Pn):r===zn||r===Pn?r=me:r===Nn||r===An?r=Xe:(r=me,n=void 0);const O=r===me&&i[o+1].startsWith("/>")?" ":"";a+=r===Xe?h+bd:j>=0?(s.push(u),h.slice(0,j)+Us+h.slice(j)+te+O):h+te+(j===-2?(s.push(void 0),o):O)}return[Ma(i,a+(i[e]||"<?>")+(t===2?"</svg>":"")),s]};class ls{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let a=0,r=0;const o=t.length-1,h=this.parts,[u,y]=Ia(t,e);if(this.el=ls.createElement(u,s),_e.currentNode=this.el.content,e===2){const j=this.el.content,E=j.firstChild;E.remove(),j.append(...E.childNodes)}for(;(n=_e.nextNode())!==null&&h.length<o;){if(n.nodeType===1){if(n.hasAttributes()){const j=[];for(const E of n.getAttributeNames())if(E.endsWith(Us)||E.startsWith(te)){const O=y[r++];if(j.push(E),O!==void 0){const R=n.getAttribute(O.toLowerCase()+Us).split(te),H=/([.?@])?(.*)/.exec(O);h.push({type:1,index:a,name:H[2],strings:R,ctor:H[1]==="."?La:H[1]==="?"?Na:H[1]==="@"?Aa:ps})}else h.push({type:6,index:a})}for(const E of j)n.removeAttribute(E)}if(Ea.test(n.tagName)){const j=n.textContent.split(te),E=j.length-1;if(E>0){n.textContent=qe?qe.emptyScript:"";for(let O=0;O<E;O++)n.append(j[O],ds()),_e.nextNode(),h.push({type:2,index:++a});n.append(j[E],ds())}}}else if(n.nodeType===8)if(n.data===Wi)h.push({type:2,index:a});else{let j=-1;for(;(j=n.data.indexOf(te,j+1))!==-1;)h.push({type:7,index:a}),j+=te.length-1}a++}}static createElement(t,e){const s=Ce.createElement("template");return s.innerHTML=t,s}}function je(i,t,e=i,s){var n,a,r,o;if(t===Vt)return t;let h=s!==void 0?(n=e._$Co)===null||n===void 0?void 0:n[s]:e._$Cl;const u=os(t)?void 0:t._$litDirective$;return(h==null?void 0:h.constructor)!==u&&((a=h==null?void 0:h._$AO)===null||a===void 0||a.call(h,!1),u===void 0?h=void 0:(h=new u(i),h._$AT(i,e,s)),s!==void 0?((r=(o=e)._$Co)!==null&&r!==void 0?r:o._$Co=[])[s]=h:e._$Cl=h),h!==void 0&&(t=je(i,h._$AS(i,t.values),h,s)),t}class Da{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:n}=this._$AD,a=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:Ce).importNode(s,!0);_e.currentNode=a;let r=_e.nextNode(),o=0,h=0,u=n[0];for(;u!==void 0;){if(o===u.index){let y;u.type===2?y=new Ve(r,r.nextSibling,this,t):u.type===1?y=new u.ctor(r,u.name,u.strings,this,t):u.type===6&&(y=new Pa(r,this,t)),this._$AV.push(y),u=n[++h]}o!==(u==null?void 0:u.index)&&(r=_e.nextNode(),o++)}return _e.currentNode=Ce,a}v(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Ve{constructor(t,e,s,n){var a;this.type=2,this._$AH=ct,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cp=(a=n==null?void 0:n.isConnected)===null||a===void 0||a}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=je(this,t,e),os(t)?t===ct||t==null||t===""?(this._$AH!==ct&&this._$AR(),this._$AH=ct):t!==this._$AH&&t!==Vt&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):xa(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==ct&&os(this._$AH)?this._$AA.nextSibling.data=t:this.$(Ce.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:n}=t,a=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=ls.createElement(Ma(n.h,n.h[0]),this.options)),n);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===a)this._$AH.v(s);else{const r=new Da(a,this),o=r.u(this.options);r.v(s),this.$(o),this._$AH=r}}_$AC(t){let e=Rn.get(t.strings);return e===void 0&&Rn.set(t.strings,e=new ls(t)),e}T(t){Oa(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,n=0;for(const a of t)n===e.length?e.push(s=new Ve(this.k(ds()),this.k(ds()),this,this.options)):s=e[n],s._$AI(a),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){const n=t.nextSibling;t.remove(),t=n}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class ps{constructor(t,e,s,n,a){this.type=1,this._$AH=ct,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=a,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=ct}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,n){const a=this.strings;let r=!1;if(a===void 0)t=je(this,t,e,0),r=!os(t)||t!==this._$AH&&t!==Vt,r&&(this._$AH=t);else{const o=t;let h,u;for(t=a[0],h=0;h<a.length-1;h++)u=je(this,o[s+h],e,h),u===Vt&&(u=this._$AH[h]),r||(r=!os(u)||u!==this._$AH[h]),u===ct?t=ct:t!==ct&&(t+=(u??"")+a[h+1]),this._$AH[h]=u}r&&!n&&this.j(t)}j(t){t===ct?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class La extends ps{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ct?void 0:t}}const vd=qe?qe.emptyScript:"";class Na extends ps{constructor(){super(...arguments),this.type=4}j(t){t&&t!==ct?this.element.setAttribute(this.name,vd):this.element.removeAttribute(this.name)}}class Aa extends ps{constructor(t,e,s,n,a){super(t,e,s,n,a),this.type=5}_$AI(t,e=this){var s;if((t=(s=je(this,t,e,0))!==null&&s!==void 0?s:ct)===Vt)return;const n=this._$AH,a=t===ct&&n!==ct||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==ct&&(n===ct||a);a&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class Pa{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){je(this,t)}}const yd={O:Us,P:te,A:Wi,C:1,M:Ia,L:Da,R:xa,D:je,I:Ve,V:ps,H:Na,N:Aa,U:La,F:Pa},Fn=Fs.litHtmlPolyfillSupport;Fn==null||Fn(ls,Ve),(($i=Fs.litHtmlVersions)!==null&&$i!==void 0?$i:Fs.litHtmlVersions=[]).push("2.8.0");const _d=(i,t,e)=>{var s,n;const a=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:t;let r=a._$litPart$;if(r===void 0){const o=(n=e==null?void 0:e.renderBefore)!==null&&n!==void 0?n:null;a._$litPart$=r=new Ve(t.insertBefore(ds(),o),o,void 0,e??{})}return r._$AI(i),r};/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/var mi,gi;let B=class extends Ae{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=_d(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return Vt}};B.finalized=!0,B._$litElement$=!0,(mi=globalThis.litElementHydrateSupport)===null||mi===void 0||mi.call(globalThis,{LitElement:B});const Un=globalThis.litElementPolyfillSupport;Un==null||Un({LitElement:B});((gi=globalThis.litElementVersions)!==null&&gi!==void 0?gi:globalThis.litElementVersions=[]).push("3.3.3");/**
* @license
* Copyright 2021 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/function*qn(i,t,e=1){const s=t===void 0?0:i;t!=null||(t=i);for(let n=s;e>0?n<t:t<n;n+=e)yield n}/**
* @license
* Copyright 2021 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/function*Bn(i,t){if(i!==void 0){let e=0;for(const s of i)yield t(s,e++)}}class Oe extends Error{}class wd extends Oe{constructor(t){super(`Invalid DateTime: ${t.toMessage()}`)}}class Sd extends Oe{constructor(t){super(`Invalid Interval: ${t.toMessage()}`)}}class kd extends Oe{constructor(t){super(`Invalid Duration: ${t.toMessage()}`)}}class ze extends Oe{}class za extends Oe{constructor(t){super(`Invalid unit ${t}`)}}class yt extends Oe{}class ae extends Oe{constructor(){super("Zone is an abstract class")}}const I="numeric",Ht="short",Mt="long",qs={year:I,month:I,day:I},Ra={year:I,month:Ht,day:I},Cd={year:I,month:Ht,day:I,weekday:Ht},Fa={year:I,month:Mt,day:I},Ua={year:I,month:Mt,day:I,weekday:Mt},qa={hour:I,minute:I},Ba={hour:I,minute:I,second:I},Va={hour:I,minute:I,second:I,timeZoneName:Ht},Wa={hour:I,minute:I,second:I,timeZoneName:Mt},Ha={hour:I,minute:I,hourCycle:"h23"},Ga={hour:I,minute:I,second:I,hourCycle:"h23"},Za={hour:I,minute:I,second:I,hourCycle:"h23",timeZoneName:Ht},Ka={hour:I,minute:I,second:I,hourCycle:"h23",timeZoneName:Mt},Ya={year:I,month:I,day:I,hour:I,minute:I},Qa={year:I,month:I,day:I,hour:I,minute:I,second:I},Ja={year:I,month:Ht,day:I,hour:I,minute:I},Xa={year:I,month:Ht,day:I,hour:I,minute:I,second:I},jd={year:I,month:Ht,day:I,weekday:Ht,hour:I,minute:I},tr={year:I,month:Mt,day:I,hour:I,minute:I,timeZoneName:Ht},er={year:I,month:Mt,day:I,hour:I,minute:I,second:I,timeZoneName:Ht},sr={year:I,month:Mt,day:I,weekday:Mt,hour:I,minute:I,timeZoneName:Mt},ir={year:I,month:Mt,day:I,weekday:Mt,hour:I,minute:I,second:I,timeZoneName:Mt};class $s{get type(){throw new ae}get name(){throw new ae}get ianaName(){return this.name}get isUniversal(){throw new ae}offsetName(t,e){throw new ae}formatOffset(t,e){throw new ae}offset(t){throw new ae}equals(t){throw new ae}get isValid(){throw new ae}}let bi=null;class ti extends $s{static get instance(){return bi===null&&(bi=new ti),bi}get type(){return"system"}get name(){return new Intl.DateTimeFormat().resolvedOptions().timeZone}get isUniversal(){return!1}offsetName(t,{format:e,locale:s}){return ur(t,e,s)}formatOffset(t,e){return rs(this.offset(t),e)}offset(t){return-new Date(t).getTimezoneOffset()}equals(t){return t.type==="system"}get isValid(){return!0}}let Ls={};function Od(i){return Ls[i]||(Ls[i]=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:i,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",era:"short"})),Ls[i]}const xd={year:0,month:1,day:2,era:3,hour:4,minute:5,second:6};function Ed(i,t){const e=i.format(t).replace(/\u200E/g,""),s=/(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(e),[,n,a,r,o,h,u,y]=s;return[r,n,a,o,h,u,y]}function Td(i,t){const e=i.formatToParts(t),s=[];for(let n=0;n<e.length;n++){const{type:a,value:r}=e[n],o=xd[a];a==="era"?s[o]=r:U(o)||(s[o]=parseInt(r,10))}return s}let Os={};class ee extends $s{static create(t){return Os[t]||(Os[t]=new ee(t)),Os[t]}static resetCache(){Os={},Ls={}}static isValidSpecifier(t){return this.isValidZone(t)}static isValidZone(t){if(!t)return!1;try{return new Intl.DateTimeFormat("en-US",{timeZone:t}).format(),!0}catch{return!1}}constructor(t){super(),this.zoneName=t,this.valid=ee.isValidZone(t)}get type(){return"iana"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(t,{format:e,locale:s}){return ur(t,e,s,this.name)}formatOffset(t,e){return rs(this.offset(t),e)}offset(t){const e=new Date(t);if(isNaN(e))return NaN;const s=Od(this.name);let[n,a,r,o,h,u,y]=s.formatToParts?Td(s,e):Ed(s,e);o==="BC"&&(n=-Math.abs(n)+1);const E=si({year:n,month:a,day:r,hour:h===24?0:h,minute:u,second:y,millisecond:0});let O=+e;const R=O%1e3;return O-=R>=0?R:1e3+R,(E-O)/(60*1e3)}equals(t){return t.type==="iana"&&t.name===this.name}get isValid(){return this.valid}}let Vn={};function Md(i,t={}){const e=JSON.stringify([i,t]);let s=Vn[e];return s||(s=new Intl.ListFormat(i,t),Vn[e]=s),s}let Mi={};function Ii(i,t={}){const e=JSON.stringify([i,t]);let s=Mi[e];return s||(s=new Intl.DateTimeFormat(i,t),Mi[e]=s),s}let Di={};function Id(i,t={}){const e=JSON.stringify([i,t]);let s=Di[e];return s||(s=new Intl.NumberFormat(i,t),Di[e]=s),s}let Li={};function Dd(i,t={}){const{base:e,...s}=t,n=JSON.stringify([i,s]);let a=Li[n];return a||(a=new Intl.RelativeTimeFormat(i,t),Li[n]=a),a}let is=null;function Ld(){return is||(is=new Intl.DateTimeFormat().resolvedOptions().locale,is)}let Wn={};function Nd(i){let t=Wn[i];if(!t){const e=new Intl.Locale(i);t="getWeekInfo"in e?e.getWeekInfo():e.weekInfo,Wn[i]=t}return t}function Ad(i){const t=i.indexOf("-x-");t!==-1&&(i=i.substring(0,t));const e=i.indexOf("-u-");if(e===-1)return[i];{let s,n;try{s=Ii(i).resolvedOptions(),n=i}catch{const h=i.substring(0,e);s=Ii(h).resolvedOptions(),n=h}const{numberingSystem:a,calendar:r}=s;return[n,a,r]}}function Pd(i,t,e){return(e||t)&&(i.includes("-u-")||(i+="-u"),e&&(i+=`-ca-${e}`),t&&(i+=`-nu-${t}`)),i}function zd(i){const t=[];for(let e=1;e<=12;e++){const s=M.utc(2009,e,1);t.push(i(s))}return t}function Rd(i){const t=[];for(let e=1;e<=7;e++){const s=M.utc(2016,11,13+e);t.push(i(s))}return t}function xs(i,t,e,s){const n=i.listingMode();return n==="error"?null:n==="en"?e(t):s(t)}function Fd(i){return i.numberingSystem&&i.numberingSystem!=="latn"?!1:i.numberingSystem==="latn"||!i.locale||i.locale.startsWith("en")||new Intl.DateTimeFormat(i.intl).resolvedOptions().numberingSystem==="latn"}class Ud{constructor(t,e,s){this.padTo=s.padTo||0,this.floor=s.floor||!1;const{padTo:n,floor:a,...r}=s;if(!e||Object.keys(r).length>0){const o={useGrouping:!1,...s};s.padTo>0&&(o.minimumIntegerDigits=s.padTo),this.inf=Id(t,o)}}format(t){if(this.inf){const e=this.floor?Math.floor(t):t;return this.inf.format(e)}else{const e=this.floor?Math.floor(t):Yi(t,3);return ot(e,this.padTo)}}}class qd{constructor(t,e,s){this.opts=s,this.originalZone=void 0;let n;if(this.opts.timeZone)this.dt=t;else if(t.zone.type==="fixed"){const r=-1*(t.offset/60),o=r>=0?`Etc/GMT+${r}`:`Etc/GMT${r}`;t.offset!==0&&ee.create(o).valid?(n=o,this.dt=t):(n="UTC",this.dt=t.offset===0?t:t.setZone("UTC").plus({minutes:t.offset}),this.originalZone=t.zone)}else t.zone.type==="system"?this.dt=t:t.zone.type==="iana"?(this.dt=t,n=t.zone.name):(n="UTC",this.dt=t.setZone("UTC").plus({minutes:t.offset}),this.originalZone=t.zone);const a={...this.opts};a.timeZone=a.timeZone||n,this.dtf=Ii(e,a)}format(){return this.originalZone?this.formatToParts().map(({value:t})=>t).join(""):this.dtf.format(this.dt.toJSDate())}formatToParts(){const t=this.dtf.formatToParts(this.dt.toJSDate());return this.originalZone?t.map(e=>{if(e.type==="timeZoneName"){const s=this.originalZone.offsetName(this.dt.ts,{locale:this.dt.locale,format:this.opts.timeZoneName});return{...e,value:s}}else return e}):t}resolvedOptions(){return this.dtf.resolvedOptions()}}class Bd{constructor(t,e,s){this.opts={style:"long",...s},!e&&cr()&&(this.rtf=Dd(t,s))}format(t,e){return this.rtf?this.rtf.format(t,e):po(e,t,this.opts.numeric,this.opts.style!=="long")}formatToParts(t,e){return this.rtf?this.rtf.formatToParts(t,e):[]}}const Vd={firstDay:1,minimalDays:4,weekend:[6,7]};class J{static fromOpts(t){return J.create(t.locale,t.numberingSystem,t.outputCalendar,t.weekSettings,t.defaultToEN)}static create(t,e,s,n,a=!1){const r=t||it.defaultLocale,o=r||(a?"en-US":Ld()),h=e||it.defaultNumberingSystem,u=s||it.defaultOutputCalendar,y=Ni(n)||it.defaultWeekSettings;return new J(o,h,u,y,r)}static resetCache(){is=null,Mi={},Di={},Li={}}static fromObject({locale:t,numberingSystem:e,outputCalendar:s,weekSettings:n}={}){return J.create(t,e,s,n)}constructor(t,e,s,n,a){const[r,o,h]=Ad(t);this.locale=r,this.numberingSystem=e||o||null,this.outputCalendar=s||h||null,this.weekSettings=n,this.intl=Pd(this.locale,this.numberingSystem,this.outputCalendar),this.weekdaysCache={format:{},standalone:{}},this.monthsCache={format:{},standalone:{}},this.meridiemCache=null,this.eraCache={},this.specifiedLocale=a,this.fastNumbersCached=null}get fastNumbers(){return this.fastNumbersCached==null&&(this.fastNumbersCached=Fd(this)),this.fastNumbersCached}listingMode(){const t=this.isEnglish(),e=(this.numberingSystem===null||this.numberingSystem==="latn")&&(this.outputCalendar===null||this.outputCalendar==="gregory");return t&&e?"en":"intl"}clone(t){return!t||Object.getOwnPropertyNames(t).length===0?this:J.create(t.locale||this.specifiedLocale,t.numberingSystem||this.numberingSystem,t.outputCalendar||this.outputCalendar,Ni(t.weekSettings)||this.weekSettings,t.defaultToEN||!1)}redefaultToEN(t={}){return this.clone({...t,defaultToEN:!0})}redefaultToSystem(t={}){return this.clone({...t,defaultToEN:!1})}months(t,e=!1){return xs(this,t,fr,()=>{const s=e?{month:t,day:"numeric"}:{month:t},n=e?"format":"standalone";return this.monthsCache[n][t]||(this.monthsCache[n][t]=zd(a=>this.extract(a,s,"month"))),this.monthsCache[n][t]})}weekdays(t,e=!1){return xs(this,t,br,()=>{const s=e?{weekday:t,year:"numeric",month:"long",day:"numeric"}:{weekday:t},n=e?"format":"standalone";return this.weekdaysCache[n][t]||(this.weekdaysCache[n][t]=Rd(a=>this.extract(a,s,"weekday"))),this.weekdaysCache[n][t]})}meridiems(){return xs(this,void 0,()=>vr,()=>{if(!this.meridiemCache){const t={hour:"numeric",hourCycle:"h12"};this.meridiemCache=[M.utc(2016,11,13,9),M.utc(2016,11,13,19)].map(e=>this.extract(e,t,"dayperiod"))}return this.meridiemCache})}eras(t){return xs(this,t,yr,()=>{const e={era:t};return this.eraCache[t]||(this.eraCache[t]=[M.utc(-40,1,1),M.utc(2017,1,1)].map(s=>this.extract(s,e,"era"))),this.eraCache[t]})}extract(t,e,s){const n=this.dtFormatter(t,e),a=n.formatToParts(),r=a.find(o=>o.type.toLowerCase()===s);return r?r.value:null}numberFormatter(t={}){return new Ud(this.intl,t.forceSimple||this.fastNumbers,t)}dtFormatter(t,e={}){return new qd(t,this.intl,e)}relFormatter(t={}){return new Bd(this.intl,this.isEnglish(),t)}listFormatter(t={}){return Md(this.intl,t)}isEnglish(){return this.locale==="en"||this.locale.toLowerCase()==="en-us"||new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us")}getWeekSettings(){return this.weekSettings?this.weekSettings:hr()?Nd(this.locale):Vd}getStartOfWeek(){return this.getWeekSettings().firstDay}getMinDaysInFirstWeek(){return this.getWeekSettings().minimalDays}getWeekendDays(){return this.getWeekSettings().weekend}equals(t){return this.locale===t.locale&&this.numberingSystem===t.numberingSystem&&this.outputCalendar===t.outputCalendar}toString(){return`Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`}}let vi=null;class kt extends $s{static get utcInstance(){return vi===null&&(vi=new kt(0)),vi}static instance(t){return t===0?kt.utcInstance:new kt(t)}static parseSpecifier(t){if(t){const e=t.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);if(e)return new kt(ii(e[1],e[2]))}return null}constructor(t){super(),this.fixed=t}get type(){return"fixed"}get name(){return this.fixed===0?"UTC":`UTC${rs(this.fixed,"narrow")}`}get ianaName(){return this.fixed===0?"Etc/UTC":`Etc/GMT${rs(-this.fixed,"narrow")}`}offsetName(){return this.name}formatOffset(t,e){return rs(this.fixed,e)}get isUniversal(){return!0}offset(){return this.fixed}equals(t){return t.type==="fixed"&&t.fixed===this.fixed}get isValid(){return!0}}class Wd extends $s{constructor(t){super(),this.zoneName=t}get type(){return"invalid"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(){return null}formatOffset(){return""}offset(){return NaN}equals(){return!1}get isValid(){return!1}}function oe(i,t){if(U(i)||i===null)return t;if(i instanceof $s)return i;if(Qd(i)){const e=i.toLowerCase();return e==="default"?t:e==="local"||e==="system"?ti.instance:e==="utc"||e==="gmt"?kt.utcInstance:kt.parseSpecifier(e)||ee.create(i)}else return he(i)?kt.instance(i):typeof i=="object"&&"offset"in i&&typeof i.offset=="function"?i:new Wd(i)}const Hi={arab:"[٠-٩]",arabext:"[۰-۹]",bali:"[᭐-᭙]",beng:"[০-৯]",deva:"[०-९]",fullwide:"[０-９]",gujr:"[૦-૯]",hanidec:"[〇|一|二|三|四|五|六|七|八|九]",khmr:"[០-៩]",knda:"[೦-೯]",laoo:"[໐-໙]",limb:"[᥆-᥏]",mlym:"[൦-൯]",mong:"[᠐-᠙]",mymr:"[၀-၉]",orya:"[୦-୯]",tamldec:"[௦-௯]",telu:"[౦-౯]",thai:"[๐-๙]",tibt:"[༠-༩]",latn:"\\d"},Hn={arab:[1632,1641],arabext:[1776,1785],bali:[6992,7001],beng:[2534,2543],deva:[2406,2415],fullwide:[65296,65303],gujr:[2790,2799],khmr:[6112,6121],knda:[3302,3311],laoo:[3792,3801],limb:[6470,6479],mlym:[3430,3439],mong:[6160,6169],mymr:[4160,4169],orya:[2918,2927],tamldec:[3046,3055],telu:[3174,3183],thai:[3664,3673],tibt:[3872,3881]},Hd=Hi.hanidec.replace(/[\[|\]]/g,"").split("");function Gd(i){let t=parseInt(i,10);if(isNaN(t)){t="";for(let e=0;e<i.length;e++){const s=i.charCodeAt(e);if(i[e].search(Hi.hanidec)!==-1)t+=Hd.indexOf(i[e]);else for(const n in Hn){const[a,r]=Hn[n];s>=a&&s<=r&&(t+=s-a)}}return parseInt(t,10)}else return t}let Pe={};function Zd(){Pe={}}function Ft({numberingSystem:i},t=""){const e=i||"latn";return Pe[e]||(Pe[e]={}),Pe[e][t]||(Pe[e][t]=new RegExp(`${Hi[e]}${t}`)),Pe[e][t]}let Gn=()=>Date.now(),Zn="system",Kn=null,Yn=null,Qn=null,Jn=60,Xn,ta=null;class it{static get now(){return Gn}static set now(t){Gn=t}static set defaultZone(t){Zn=t}static get defaultZone(){return oe(Zn,ti.instance)}static get defaultLocale(){return Kn}static set defaultLocale(t){Kn=t}static get defaultNumberingSystem(){return Yn}static set defaultNumberingSystem(t){Yn=t}static get defaultOutputCalendar(){return Qn}static set defaultOutputCalendar(t){Qn=t}static get defaultWeekSettings(){return ta}static set defaultWeekSettings(t){ta=Ni(t)}static get twoDigitCutoffYear(){return Jn}static set twoDigitCutoffYear(t){Jn=t%100}static get throwOnInvalid(){return Xn}static set throwOnInvalid(t){Xn=t}static resetCaches(){J.resetCache(),ee.resetCache(),M.resetCache(),Zd()}}class Wt{constructor(t,e){this.reason=t,this.explanation=e}toMessage(){return this.explanation?`${this.reason}: ${this.explanation}`:this.reason}}const nr=[0,31,59,90,120,151,181,212,243,273,304,334],ar=[0,31,60,91,121,152,182,213,244,274,305,335];function At(i,t){return new Wt("unit out of range",`you specified ${t} (of type ${typeof t}) as a ${i}, which is invalid`)}function Gi(i,t,e){const s=new Date(Date.UTC(i,t-1,e));i<100&&i>=0&&s.setUTCFullYear(s.getUTCFullYear()-1900);const n=s.getUTCDay();return n===0?7:n}function rr(i,t,e){return e+(fs(i)?ar:nr)[t-1]}function dr(i,t){const e=fs(i)?ar:nr,s=e.findIndex(a=>a<t),n=t-e[s];return{month:s+1,day:n}}function Zi(i,t){return(i-t+7)%7+1}function Bs(i,t=4,e=1){const{year:s,month:n,day:a}=i,r=rr(s,n,a),o=Zi(Gi(s,n,a),e);let h=Math.floor((r-o+14-t)/7),u;return h<1?(u=s-1,h=cs(u,t,e)):h>cs(s,t,e)?(u=s+1,h=1):u=s,{weekYear:u,weekNumber:h,weekday:o,...ni(i)}}function ea(i,t=4,e=1){const{weekYear:s,weekNumber:n,weekday:a}=i,r=Zi(Gi(s,1,t),e),o=Re(s);let h=n*7+a-r-7+t,u;h<1?(u=s-1,h+=Re(u)):h>o?(u=s+1,h-=Re(s)):u=s;const{month:y,day:j}=dr(u,h);return{year:u,month:y,day:j,...ni(i)}}function yi(i){const{year:t,month:e,day:s}=i,n=rr(t,e,s);return{year:t,ordinal:n,...ni(i)}}function sa(i){const{year:t,ordinal:e}=i,{month:s,day:n}=dr(t,e);return{year:t,month:s,day:n,...ni(i)}}function ia(i,t){if(!U(i.localWeekday)||!U(i.localWeekNumber)||!U(i.localWeekYear)){if(!U(i.weekday)||!U(i.weekNumber)||!U(i.weekYear))throw new ze("Cannot mix locale-based week fields with ISO-based week fields");return U(i.localWeekday)||(i.weekday=i.localWeekday),U(i.localWeekNumber)||(i.weekNumber=i.localWeekNumber),U(i.localWeekYear)||(i.weekYear=i.localWeekYear),delete i.localWeekday,delete i.localWeekNumber,delete i.localWeekYear,{minDaysInFirstWeek:t.getMinDaysInFirstWeek(),startOfWeek:t.getStartOfWeek()}}else return{minDaysInFirstWeek:4,startOfWeek:1}}function Kd(i,t=4,e=1){const s=ei(i.weekYear),n=Pt(i.weekNumber,1,cs(i.weekYear,t,e)),a=Pt(i.weekday,1,7);return s?n?a?!1:At("weekday",i.weekday):At("week",i.weekNumber):At("weekYear",i.weekYear)}function Yd(i){const t=ei(i.year),e=Pt(i.ordinal,1,Re(i.year));return t?e?!1:At("ordinal",i.ordinal):At("year",i.year)}function or(i){const t=ei(i.year),e=Pt(i.month,1,12),s=Pt(i.day,1,Vs(i.year,i.month));return t?e?s?!1:At("day",i.day):At("month",i.month):At("year",i.year)}function lr(i){const{hour:t,minute:e,second:s,millisecond:n}=i,a=Pt(t,0,23)||t===24&&e===0&&s===0&&n===0,r=Pt(e,0,59),o=Pt(s,0,59),h=Pt(n,0,999);return a?r?o?h?!1:At("millisecond",n):At("second",s):At("minute",e):At("hour",t)}function U(i){return typeof i>"u"}function he(i){return typeof i=="number"}function ei(i){return typeof i=="number"&&i%1===0}function Qd(i){return typeof i=="string"}function Jd(i){return Object.prototype.toString.call(i)==="[object Date]"}function cr(){try{return typeof Intl<"u"&&!!Intl.RelativeTimeFormat}catch{return!1}}function hr(){try{return typeof Intl<"u"&&!!Intl.Locale&&("weekInfo"in Intl.Locale.prototype||"getWeekInfo"in Intl.Locale.prototype)}catch{return!1}}function Xd(i){return Array.isArray(i)?i:[i]}function na(i,t,e){if(i.length!==0)return i.reduce((s,n)=>{const a=[t(n),n];return s&&e(s[0],a[0])===s[0]?s:a},null)[1]}function to(i,t){return t.reduce((e,s)=>(e[s]=i[s],e),{})}function Be(i,t){return Object.prototype.hasOwnProperty.call(i,t)}function Ni(i){if(i==null)return null;if(typeof i!="object")throw new yt("Week settings must be an object");if(!Pt(i.firstDay,1,7)||!Pt(i.minimalDays,1,7)||!Array.isArray(i.weekend)||i.weekend.some(t=>!Pt(t,1,7)))throw new yt("Invalid week settings");return{firstDay:i.firstDay,minimalDays:i.minimalDays,weekend:Array.from(i.weekend)}}function Pt(i,t,e){return ei(i)&&i>=t&&i<=e}function eo(i,t){return i-t*Math.floor(i/t)}function ot(i,t=2){const e=i<0;let s;return e?s="-"+(""+-i).padStart(t,"0"):s=(""+i).padStart(t,"0"),s}function de(i){if(!(U(i)||i===null||i===""))return parseInt(i,10)}function ge(i){if(!(U(i)||i===null||i===""))return parseFloat(i)}function Ki(i){if(!(U(i)||i===null||i==="")){const t=parseFloat("0."+i)*1e3;return Math.floor(t)}}function Yi(i,t,e=!1){const s=10**t;return(e?Math.trunc:Math.round)(i*s)/s}function fs(i){return i%4===0&&(i%100!==0||i%400===0)}function Re(i){return fs(i)?366:365}function Vs(i,t){const e=eo(t-1,12)+1,s=i+(t-e)/12;return e===2?fs(s)?29:28:[31,null,31,30,31,30,31,31,30,31,30,31][e-1]}function si(i){let t=Date.UTC(i.year,i.month-1,i.day,i.hour,i.minute,i.second,i.millisecond);return i.year<100&&i.year>=0&&(t=new Date(t),t.setUTCFullYear(i.year,i.month-1,i.day)),+t}function aa(i,t,e){return-Zi(Gi(i,1,t),e)+t-1}function cs(i,t=4,e=1){const s=aa(i,t,e),n=aa(i+1,t,e);return(Re(i)-s+n)/7}function Ai(i){return i>99?i:i>it.twoDigitCutoffYear?1900+i:2e3+i}function ur(i,t,e,s=null){const n=new Date(i),a={hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"};s&&(a.timeZone=s);const r={timeZoneName:t,...a},o=new Intl.DateTimeFormat(e,r).formatToParts(n).find(h=>h.type.toLowerCase()==="timezonename");return o?o.value:null}function ii(i,t){let e=parseInt(i,10);Number.isNaN(e)&&(e=0);const s=parseInt(t,10)||0,n=e<0||Object.is(e,-0)?-s:s;return e*60+n}function pr(i){const t=Number(i);if(typeof i=="boolean"||i===""||Number.isNaN(t))throw new yt(`Invalid unit value ${i}`);return t}function Ws(i,t){const e={};for(const s in i)if(Be(i,s)){const n=i[s];if(n==null)continue;e[t(s)]=pr(n)}return e}function rs(i,t){const e=Math.trunc(Math.abs(i/60)),s=Math.trunc(Math.abs(i%60)),n=i>=0?"+":"-";switch(t){case"short":return`${n}${ot(e,2)}:${ot(s,2)}`;case"narrow":return`${n}${e}${s>0?`:${s}`:""}`;case"techie":return`${n}${ot(e,2)}${ot(s,2)}`;default:throw new RangeError(`Value format ${t} is out of range for property format`)}}function ni(i){return to(i,["hour","minute","second","millisecond"])}const so=["January","February","March","April","May","June","July","August","September","October","November","December"],$r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],io=["J","F","M","A","M","J","J","A","S","O","N","D"];function fr(i){switch(i){case"narrow":return[...io];case"short":return[...$r];case"long":return[...so];case"numeric":return["1","2","3","4","5","6","7","8","9","10","11","12"];case"2-digit":return["01","02","03","04","05","06","07","08","09","10","11","12"];default:return null}}const mr=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],gr=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],no=["M","T","W","T","F","S","S"];function br(i){switch(i){case"narrow":return[...no];case"short":return[...gr];case"long":return[...mr];case"numeric":return["1","2","3","4","5","6","7"];default:return null}}const vr=["AM","PM"],ao=["Before Christ","Anno Domini"],ro=["BC","AD"],oo=["B","A"];function yr(i){switch(i){case"narrow":return[...oo];case"short":return[...ro];case"long":return[...ao];default:return null}}function lo(i){return vr[i.hour<12?0:1]}function co(i,t){return br(t)[i.weekday-1]}function ho(i,t){return fr(t)[i.month-1]}function uo(i,t){return yr(t)[i.year<0?0:1]}function po(i,t,e="always",s=!1){const n={years:["year","yr."],quarters:["quarter","qtr."],months:["month","mo."],weeks:["week","wk."],days:["day","day","days"],hours:["hour","hr."],minutes:["minute","min."],seconds:["second","sec."]},a=["hours","minutes","seconds"].indexOf(i)===-1;if(e==="auto"&&a){const j=i==="days";switch(t){case 1:return j?"tomorrow":`next ${n[i][0]}`;case-1:return j?"yesterday":`last ${n[i][0]}`;case 0:return j?"today":`this ${n[i][0]}`}}const r=Object.is(t,-0)||t<0,o=Math.abs(t),h=o===1,u=n[i],y=s?h?u[1]:u[2]||u[1]:h?n[i][0]:i;return r?`${o} ${y} ago`:`in ${o} ${y}`}function ra(i,t){let e="";for(const s of i)s.literal?e+=s.val:e+=t(s.val);return e}const $o={D:qs,DD:Ra,DDD:Fa,DDDD:Ua,t:qa,tt:Ba,ttt:Va,tttt:Wa,T:Ha,TT:Ga,TTT:Za,TTTT:Ka,f:Ya,ff:Ja,fff:tr,ffff:sr,F:Qa,FF:Xa,FFF:er,FFFF:ir};class _t{static create(t,e={}){return new _t(t,e)}static parseFormat(t){let e=null,s="",n=!1;const a=[];for(let r=0;r<t.length;r++){const o=t.charAt(r);o==="'"?(s.length>0&&a.push({literal:n||/^\s+$/.test(s),val:s}),e=null,s="",n=!n):n||o===e?s+=o:(s.length>0&&a.push({literal:/^\s+$/.test(s),val:s}),s=o,e=o)}return s.length>0&&a.push({literal:n||/^\s+$/.test(s),val:s}),a}static macroTokenToFormatOpts(t){return $o[t]}constructor(t,e){this.opts=e,this.loc=t,this.systemLoc=null}formatWithSystemDefault(t,e){return this.systemLoc===null&&(this.systemLoc=this.loc.redefaultToSystem()),this.systemLoc.dtFormatter(t,{...this.opts,...e}).format()}dtFormatter(t,e={}){return this.loc.dtFormatter(t,{...this.opts,...e})}formatDateTime(t,e){return this.dtFormatter(t,e).format()}formatDateTimeParts(t,e){return this.dtFormatter(t,e).formatToParts()}formatInterval(t,e){return this.dtFormatter(t.start,e).dtf.formatRange(t.start.toJSDate(),t.end.toJSDate())}resolvedOptions(t,e){return this.dtFormatter(t,e).resolvedOptions()}num(t,e=0){if(this.opts.forceSimple)return ot(t,e);const s={...this.opts};return e>0&&(s.padTo=e),this.loc.numberFormatter(s).format(t)}formatDateTimeFromString(t,e){const s=this.loc.listingMode()==="en",n=this.loc.outputCalendar&&this.loc.outputCalendar!=="gregory",a=(O,R)=>this.loc.extract(t,O,R),r=O=>t.isOffsetFixed&&t.offset===0&&O.allowZ?"Z":t.isValid?t.zone.formatOffset(t.ts,O.format):"",o=()=>s?lo(t):a({hour:"numeric",hourCycle:"h12"},"dayperiod"),h=(O,R)=>s?ho(t,O):a(R?{month:O}:{month:O,day:"numeric"},"month"),u=(O,R)=>s?co(t,O):a(R?{weekday:O}:{weekday:O,month:"long",day:"numeric"},"weekday"),y=O=>{const R=_t.macroTokenToFormatOpts(O);return R?this.formatWithSystemDefault(t,R):O},j=O=>s?uo(t,O):a({era:O},"era"),E=O=>{switch(O){case"S":return this.num(t.millisecond);case"u":case"SSS":return this.num(t.millisecond,3);case"s":return this.num(t.second);case"ss":return this.num(t.second,2);case"uu":return this.num(Math.floor(t.millisecond/10),2);case"uuu":return this.num(Math.floor(t.millisecond/100));case"m":return this.num(t.minute);case"mm":return this.num(t.minute,2);case"h":return this.num(t.hour%12===0?12:t.hour%12);case"hh":return this.num(t.hour%12===0?12:t.hour%12,2);case"H":return this.num(t.hour);case"HH":return this.num(t.hour,2);case"Z":return r({format:"narrow",allowZ:this.opts.allowZ});case"ZZ":return r({format:"short",allowZ:this.opts.allowZ});case"ZZZ":return r({format:"techie",allowZ:this.opts.allowZ});case"ZZZZ":return t.zone.offsetName(t.ts,{format:"short",locale:this.loc.locale});case"ZZZZZ":return t.zone.offsetName(t.ts,{format:"long",locale:this.loc.locale});case"z":return t.zoneName;case"a":return o();case"d":return n?a({day:"numeric"},"day"):this.num(t.day);case"dd":return n?a({day:"2-digit"},"day"):this.num(t.day,2);case"c":return this.num(t.weekday);case"ccc":return u("short",!0);case"cccc":return u("long",!0);case"ccccc":return u("narrow",!0);case"E":return this.num(t.weekday);case"EEE":return u("short",!1);case"EEEE":return u("long",!1);case"EEEEE":return u("narrow",!1);case"L":return n?a({month:"numeric",day:"numeric"},"month"):this.num(t.month);case"LL":return n?a({month:"2-digit",day:"numeric"},"month"):this.num(t.month,2);case"LLL":return h("short",!0);case"LLLL":return h("long",!0);case"LLLLL":return h("narrow",!0);case"M":return n?a({month:"numeric"},"month"):this.num(t.month);case"MM":return n?a({month:"2-digit"},"month"):this.num(t.month,2);case"MMM":return h("short",!1);case"MMMM":return h("long",!1);case"MMMMM":return h("narrow",!1);case"y":return n?a({year:"numeric"},"year"):this.num(t.year);case"yy":return n?a({year:"2-digit"},"year"):this.num(t.year.toString().slice(-2),2);case"yyyy":return n?a({year:"numeric"},"year"):this.num(t.year,4);case"yyyyyy":return n?a({year:"numeric"},"year"):this.num(t.year,6);case"G":return j("short");case"GG":return j("long");case"GGGGG":return j("narrow");case"kk":return this.num(t.weekYear.toString().slice(-2),2);case"kkkk":return this.num(t.weekYear,4);case"W":return this.num(t.weekNumber);case"WW":return this.num(t.weekNumber,2);case"n":return this.num(t.localWeekNumber);case"nn":return this.num(t.localWeekNumber,2);case"ii":return this.num(t.localWeekYear.toString().slice(-2),2);case"iiii":return this.num(t.localWeekYear,4);case"o":return this.num(t.ordinal);case"ooo":return this.num(t.ordinal,3);case"q":return this.num(t.quarter);case"qq":return this.num(t.quarter,2);case"X":return this.num(Math.floor(t.ts/1e3));case"x":return this.num(t.ts);default:return y(O)}};return ra(_t.parseFormat(e),E)}formatDurationFromString(t,e){const s=h=>{switch(h[0]){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":return"hour";case"d":return"day";case"w":return"week";case"M":return"month";case"y":return"year";default:return null}},n=h=>u=>{const y=s(u);return y?this.num(h.get(y),u.length):u},a=_t.parseFormat(e),r=a.reduce((h,{literal:u,val:y})=>u?h:h.concat(y),[]),o=t.shiftTo(...r.map(s).filter(h=>h));return ra(a,n(o))}}const _r=/[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;function We(...i){const t=i.reduce((e,s)=>e+s.source,"");return RegExp(`^${t}$`)}function He(...i){return t=>i.reduce(([e,s,n],a)=>{const[r,o,h]=a(t,n);return[{...e,...r},o||s,h]},[{},null,1]).slice(0,2)}function Ge(i,...t){if(i==null)return[null,null];for(const[e,s]of t){const n=e.exec(i);if(n)return s(n)}return[null,null]}function wr(...i){return(t,e)=>{const s={};let n;for(n=0;n<i.length;n++)s[i[n]]=de(t[e+n]);return[s,null,e+n]}}const Sr=/(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,fo=`(?:${Sr.source}?(?:\\[(${_r.source})\\])?)?`,Qi=/(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,kr=RegExp(`${Qi.source}${fo}`),Ji=RegExp(`(?:T${kr.source})?`),mo=/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,go=/(\d{4})-?W(\d\d)(?:-?(\d))?/,bo=/(\d{4})-?(\d{3})/,vo=wr("weekYear","weekNumber","weekDay"),yo=wr("year","ordinal"),_o=/(\d{4})-(\d\d)-(\d\d)/,Cr=RegExp(`${Qi.source} ?(?:${Sr.source}|(${_r.source}))?`),wo=RegExp(`(?: ${Cr.source})?`);function Fe(i,t,e){const s=i[t];return U(s)?e:de(s)}function So(i,t){return[{year:Fe(i,t),month:Fe(i,t+1,1),day:Fe(i,t+2,1)},null,t+3]}function Ze(i,t){return[{hours:Fe(i,t,0),minutes:Fe(i,t+1,0),seconds:Fe(i,t+2,0),milliseconds:Ki(i[t+3])},null,t+4]}function ms(i,t){const e=!i[t]&&!i[t+1],s=ii(i[t+1],i[t+2]),n=e?null:kt.instance(s);return[{},n,t+3]}function gs(i,t){const e=i[t]?ee.create(i[t]):null;return[{},e,t+1]}const ko=RegExp(`^T?${Qi.source}$`),Co=/^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;function jo(i){const[t,e,s,n,a,r,o,h,u]=i,y=t[0]==="-",j=h&&h[0]==="-",E=(O,R=!1)=>O!==void 0&&(R||O&&y)?-O:O;return[{years:E(ge(e)),months:E(ge(s)),weeks:E(ge(n)),days:E(ge(a)),hours:E(ge(r)),minutes:E(ge(o)),seconds:E(ge(h),h==="-0"),milliseconds:E(Ki(u),j)}]}const Oo={GMT:0,EDT:-4*60,EST:-5*60,CDT:-5*60,CST:-6*60,MDT:-6*60,MST:-7*60,PDT:-7*60,PST:-8*60};function Xi(i,t,e,s,n,a,r){const o={year:t.length===2?Ai(de(t)):de(t),month:$r.indexOf(e)+1,day:de(s),hour:de(n),minute:de(a)};return r&&(o.second=de(r)),i&&(o.weekday=i.length>3?mr.indexOf(i)+1:gr.indexOf(i)+1),o}const xo=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;function Eo(i){const[,t,e,s,n,a,r,o,h,u,y,j]=i,E=Xi(t,n,s,e,a,r,o);let O;return h?O=Oo[h]:u?O=0:O=ii(y,j),[E,new kt(O)]}function To(i){return i.replace(/\([^()]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").trim()}const Mo=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,Io=/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,Do=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;function da(i){const[,t,e,s,n,a,r,o]=i;return[Xi(t,n,s,e,a,r,o),kt.utcInstance]}function Lo(i){const[,t,e,s,n,a,r,o]=i;return[Xi(t,o,e,s,n,a,r),kt.utcInstance]}const No=We(mo,Ji),Ao=We(go,Ji),Po=We(bo,Ji),zo=We(kr),jr=He(So,Ze,ms,gs),Ro=He(vo,Ze,ms,gs),Fo=He(yo,Ze,ms,gs),Uo=He(Ze,ms,gs);function qo(i){return Ge(i,[No,jr],[Ao,Ro],[Po,Fo],[zo,Uo])}function Bo(i){return Ge(To(i),[xo,Eo])}function Vo(i){return Ge(i,[Mo,da],[Io,da],[Do,Lo])}function Wo(i){return Ge(i,[Co,jo])}const Ho=He(Ze);function Go(i){return Ge(i,[ko,Ho])}const Zo=We(_o,wo),Ko=We(Cr),Yo=He(Ze,ms,gs);function Qo(i){return Ge(i,[Zo,jr],[Ko,Yo])}const oa="Invalid Duration",Or={weeks:{days:7,hours:7*24,minutes:7*24*60,seconds:7*24*60*60,milliseconds:7*24*60*60*1e3},days:{hours:24,minutes:24*60,seconds:24*60*60,milliseconds:24*60*60*1e3},hours:{minutes:60,seconds:60*60,milliseconds:60*60*1e3},minutes:{seconds:60,milliseconds:60*1e3},seconds:{milliseconds:1e3}},Jo={years:{quarters:4,months:12,weeks:52,days:365,hours:365*24,minutes:365*24*60,seconds:365*24*60*60,milliseconds:365*24*60*60*1e3},quarters:{months:3,weeks:13,days:91,hours:91*24,minutes:91*24*60,seconds:91*24*60*60,milliseconds:91*24*60*60*1e3},months:{weeks:4,days:30,hours:30*24,minutes:30*24*60,seconds:30*24*60*60,milliseconds:30*24*60*60*1e3},...Or},Nt=146097/400,Ie=146097/4800,Xo={years:{quarters:4,months:12,weeks:Nt/7,days:Nt,hours:Nt*24,minutes:Nt*24*60,seconds:Nt*24*60*60,milliseconds:Nt*24*60*60*1e3},quarters:{months:3,weeks:Nt/28,days:Nt/4,hours:Nt*24/4,minutes:Nt*24*60/4,seconds:Nt*24*60*60/4,milliseconds:Nt*24*60*60*1e3/4},months:{weeks:Ie/7,days:Ie,hours:Ie*24,minutes:Ie*24*60,seconds:Ie*24*60*60,milliseconds:Ie*24*60*60*1e3},...Or},we=["years","quarters","months","weeks","days","hours","minutes","seconds","milliseconds"],tl=we.slice(0).reverse();function re(i,t,e=!1){const s={values:e?t.values:{...i.values,...t.values||{}},loc:i.loc.clone(t.loc),conversionAccuracy:t.conversionAccuracy||i.conversionAccuracy,matrix:t.matrix||i.matrix};return new Z(s)}function xr(i,t){var e;let s=(e=t.milliseconds)!==null&&e!==void 0?e:0;for(const n of tl.slice(1))t[n]&&(s+=t[n]*i[n].milliseconds);return s}function la(i,t){const e=xr(i,t)<0?-1:1;we.reduceRight((s,n)=>{if(U(t[n]))return s;if(s){const a=t[s]*e,r=i[n][s],o=Math.floor(a/r);t[n]+=o*e,t[s]-=o*r*e}return n},null),we.reduce((s,n)=>{if(U(t[n]))return s;if(s){const a=t[s]%1;t[s]-=a,t[n]+=a*i[s][n]}return n},null)}function el(i){const t={};for(const[e,s]of Object.entries(i))s!==0&&(t[e]=s);return t}class Z{constructor(t){const e=t.conversionAccuracy==="longterm"||!1;let s=e?Xo:Jo;t.matrix&&(s=t.matrix),this.values=t.values,this.loc=t.loc||J.create(),this.conversionAccuracy=e?"longterm":"casual",this.invalid=t.invalid||null,this.matrix=s,this.isLuxonDuration=!0}static fromMillis(t,e){return Z.fromObject({milliseconds:t},e)}static fromObject(t,e={}){if(t==null||typeof t!="object")throw new yt(`Duration.fromObject: argument expected to be an object, got ${t===null?"null":typeof t}`);return new Z({values:Ws(t,Z.normalizeUnit),loc:J.fromObject(e),conversionAccuracy:e.conversionAccuracy,matrix:e.matrix})}static fromDurationLike(t){if(he(t))return Z.fromMillis(t);if(Z.isDuration(t))return t;if(typeof t=="object")return Z.fromObject(t);throw new yt(`Unknown duration argument ${t} of type ${typeof t}`)}static fromISO(t,e){const[s]=Wo(t);return s?Z.fromObject(s,e):Z.invalid("unparsable",`the input "${t}" can't be parsed as ISO 8601`)}static fromISOTime(t,e){const[s]=Go(t);return s?Z.fromObject(s,e):Z.invalid("unparsable",`the input "${t}" can't be parsed as ISO 8601`)}static invalid(t,e=null){if(!t)throw new yt("need to specify a reason the Duration is invalid");const s=t instanceof Wt?t:new Wt(t,e);if(it.throwOnInvalid)throw new kd(s);return new Z({invalid:s})}static normalizeUnit(t){const e={year:"years",years:"years",quarter:"quarters",quarters:"quarters",month:"months",months:"months",week:"weeks",weeks:"weeks",day:"days",days:"days",hour:"hours",hours:"hours",minute:"minutes",minutes:"minutes",second:"seconds",seconds:"seconds",millisecond:"milliseconds",milliseconds:"milliseconds"}[t&&t.toLowerCase()];if(!e)throw new za(t);return e}static isDuration(t){return t&&t.isLuxonDuration||!1}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}toFormat(t,e={}){const s={...e,floor:e.round!==!1&&e.floor!==!1};return this.isValid?_t.create(this.loc,s).formatDurationFromString(this,t):oa}toHuman(t={}){if(!this.isValid)return oa;const e=we.map(s=>{const n=this.values[s];return U(n)?null:this.loc.numberFormatter({style:"unit",unitDisplay:"long",...t,unit:s.slice(0,-1)}).format(n)}).filter(s=>s);return this.loc.listFormatter({type:"conjunction",style:t.listStyle||"narrow",...t}).format(e)}toObject(){return this.isValid?{...this.values}:{}}toISO(){if(!this.isValid)return null;let t="P";return this.years!==0&&(t+=this.years+"Y"),(this.months!==0||this.quarters!==0)&&(t+=this.months+this.quarters*3+"M"),this.weeks!==0&&(t+=this.weeks+"W"),this.days!==0&&(t+=this.days+"D"),(this.hours!==0||this.minutes!==0||this.seconds!==0||this.milliseconds!==0)&&(t+="T"),this.hours!==0&&(t+=this.hours+"H"),this.minutes!==0&&(t+=this.minutes+"M"),(this.seconds!==0||this.milliseconds!==0)&&(t+=Yi(this.seconds+this.milliseconds/1e3,3)+"S"),t==="P"&&(t+="T0S"),t}toISOTime(t={}){if(!this.isValid)return null;const e=this.toMillis();return e<0||e>=864e5?null:(t={suppressMilliseconds:!1,suppressSeconds:!1,includePrefix:!1,format:"extended",...t,includeOffset:!1},M.fromMillis(e,{zone:"UTC"}).toISOTime(t))}toJSON(){return this.toISO()}toString(){return this.toISO()}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Duration { values: ${JSON.stringify(this.values)} }`:`Duration { Invalid, reason: ${this.invalidReason} }`}toMillis(){return this.isValid?xr(this.matrix,this.values):NaN}valueOf(){return this.toMillis()}plus(t){if(!this.isValid)return this;const e=Z.fromDurationLike(t),s={};for(const n of we)(Be(e.values,n)||Be(this.values,n))&&(s[n]=e.get(n)+this.get(n));return re(this,{values:s},!0)}minus(t){if(!this.isValid)return this;const e=Z.fromDurationLike(t);return this.plus(e.negate())}mapUnits(t){if(!this.isValid)return this;const e={};for(const s of Object.keys(this.values))e[s]=pr(t(this.values[s],s));return re(this,{values:e},!0)}get(t){return this[Z.normalizeUnit(t)]}set(t){if(!this.isValid)return this;const e={...this.values,...Ws(t,Z.normalizeUnit)};return re(this,{values:e})}reconfigure({locale:t,numberingSystem:e,conversionAccuracy:s,matrix:n}={}){const r={loc:this.loc.clone({locale:t,numberingSystem:e}),matrix:n,conversionAccuracy:s};return re(this,r)}as(t){return this.isValid?this.shiftTo(t).get(t):NaN}normalize(){if(!this.isValid)return this;const t=this.toObject();return la(this.matrix,t),re(this,{values:t},!0)}rescale(){if(!this.isValid)return this;const t=el(this.normalize().shiftToAll().toObject());return re(this,{values:t},!0)}shiftTo(...t){if(!this.isValid)return this;if(t.length===0)return this;t=t.map(r=>Z.normalizeUnit(r));const e={},s={},n=this.toObject();let a;for(const r of we)if(t.indexOf(r)>=0){a=r;let o=0;for(const u in s)o+=this.matrix[u][r]*s[u],s[u]=0;he(n[r])&&(o+=n[r]);const h=Math.trunc(o);e[r]=h,s[r]=(o*1e3-h*1e3)/1e3}else he(n[r])&&(s[r]=n[r]);for(const r in s)s[r]!==0&&(e[a]+=r===a?s[r]:s[r]/this.matrix[a][r]);return la(this.matrix,e),re(this,{values:e},!0)}shiftToAll(){return this.isValid?this.shiftTo("years","months","weeks","days","hours","minutes","seconds","milliseconds"):this}negate(){if(!this.isValid)return this;const t={};for(const e of Object.keys(this.values))t[e]=this.values[e]===0?0:-this.values[e];return re(this,{values:t},!0)}get years(){return this.isValid?this.values.years||0:NaN}get quarters(){return this.isValid?this.values.quarters||0:NaN}get months(){return this.isValid?this.values.months||0:NaN}get weeks(){return this.isValid?this.values.weeks||0:NaN}get days(){return this.isValid?this.values.days||0:NaN}get hours(){return this.isValid?this.values.hours||0:NaN}get minutes(){return this.isValid?this.values.minutes||0:NaN}get seconds(){return this.isValid?this.values.seconds||0:NaN}get milliseconds(){return this.isValid?this.values.milliseconds||0:NaN}get isValid(){return this.invalid===null}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}equals(t){if(!this.isValid||!t.isValid||!this.loc.equals(t.loc))return!1;function e(s,n){return s===void 0||s===0?n===void 0||n===0:s===n}for(const s of we)if(!e(this.values[s],t.values[s]))return!1;return!0}}const De="Invalid Interval";function sl(i,t){return!i||!i.isValid?at.invalid("missing or invalid start"):!t||!t.isValid?at.invalid("missing or invalid end"):t<i?at.invalid("end before start",`The end of an interval must be after its start, but you had start=${i.toISO()} and end=${t.toISO()}`):null}class at{constructor(t){this.s=t.start,this.e=t.end,this.invalid=t.invalid||null,this.isLuxonInterval=!0}static invalid(t,e=null){if(!t)throw new yt("need to specify a reason the Interval is invalid");const s=t instanceof Wt?t:new Wt(t,e);if(it.throwOnInvalid)throw new Sd(s);return new at({invalid:s})}static fromDateTimes(t,e){const s=ts(t),n=ts(e),a=sl(s,n);return a??new at({start:s,end:n})}static after(t,e){const s=Z.fromDurationLike(e),n=ts(t);return at.fromDateTimes(n,n.plus(s))}static before(t,e){const s=Z.fromDurationLike(e),n=ts(t);return at.fromDateTimes(n.minus(s),n)}static fromISO(t,e){const[s,n]=(t||"").split("/",2);if(s&&n){let a,r;try{a=M.fromISO(s,e),r=a.isValid}catch{r=!1}let o,h;try{o=M.fromISO(n,e),h=o.isValid}catch{h=!1}if(r&&h)return at.fromDateTimes(a,o);if(r){const u=Z.fromISO(n,e);if(u.isValid)return at.after(a,u)}else if(h){const u=Z.fromISO(s,e);if(u.isValid)return at.before(o,u)}}return at.invalid("unparsable",`the input "${t}" can't be parsed as ISO 8601`)}static isInterval(t){return t&&t.isLuxonInterval||!1}get start(){return this.isValid?this.s:null}get end(){return this.isValid?this.e:null}get isValid(){return this.invalidReason===null}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}length(t="milliseconds"){return this.isValid?this.toDuration(t).get(t):NaN}count(t="milliseconds",e){if(!this.isValid)return NaN;const s=this.start.startOf(t,e);let n;return e!=null&&e.useLocaleWeeks?n=this.end.reconfigure({locale:s.locale}):n=this.end,n=n.startOf(t,e),Math.floor(n.diff(s,t).get(t))+(n.valueOf()!==this.end.valueOf())}hasSame(t){return this.isValid?this.isEmpty()||this.e.minus(1).hasSame(this.s,t):!1}isEmpty(){return this.s.valueOf()===this.e.valueOf()}isAfter(t){return this.isValid?this.s>t:!1}isBefore(t){return this.isValid?this.e<=t:!1}contains(t){return this.isValid?this.s<=t&&this.e>t:!1}set({start:t,end:e}={}){return this.isValid?at.fromDateTimes(t||this.s,e||this.e):this}splitAt(...t){if(!this.isValid)return[];const e=t.map(ts).filter(r=>this.contains(r)).sort((r,o)=>r.toMillis()-o.toMillis()),s=[];let{s:n}=this,a=0;for(;n<this.e;){const r=e[a]||this.e,o=+r>+this.e?this.e:r;s.push(at.fromDateTimes(n,o)),n=o,a+=1}return s}splitBy(t){const e=Z.fromDurationLike(t);if(!this.isValid||!e.isValid||e.as("milliseconds")===0)return[];let{s}=this,n=1,a;const r=[];for(;s<this.e;){const o=this.start.plus(e.mapUnits(h=>h*n));a=+o>+this.e?this.e:o,r.push(at.fromDateTimes(s,a)),s=a,n+=1}return r}divideEqually(t){return this.isValid?this.splitBy(this.length()/t).slice(0,t):[]}overlaps(t){return this.e>t.s&&this.s<t.e}abutsStart(t){return this.isValid?+this.e==+t.s:!1}abutsEnd(t){return this.isValid?+t.e==+this.s:!1}engulfs(t){return this.isValid?this.s<=t.s&&this.e>=t.e:!1}equals(t){return!this.isValid||!t.isValid?!1:this.s.equals(t.s)&&this.e.equals(t.e)}intersection(t){if(!this.isValid)return this;const e=this.s>t.s?this.s:t.s,s=this.e<t.e?this.e:t.e;return e>=s?null:at.fromDateTimes(e,s)}union(t){if(!this.isValid)return this;const e=this.s<t.s?this.s:t.s,s=this.e>t.e?this.e:t.e;return at.fromDateTimes(e,s)}static merge(t){const[e,s]=t.sort((n,a)=>n.s-a.s).reduce(([n,a],r)=>a?a.overlaps(r)||a.abutsStart(r)?[n,a.union(r)]:[n.concat([a]),r]:[n,r],[[],null]);return s&&e.push(s),e}static xor(t){let e=null,s=0;const n=[],a=t.map(h=>[{time:h.s,type:"s"},{time:h.e,type:"e"}]),r=Array.prototype.concat(...a),o=r.sort((h,u)=>h.time-u.time);for(const h of o)s+=h.type==="s"?1:-1,s===1?e=h.time:(e&&+e!=+h.time&&n.push(at.fromDateTimes(e,h.time)),e=null);return at.merge(n)}difference(...t){return at.xor([this].concat(t)).map(e=>this.intersection(e)).filter(e=>e&&!e.isEmpty())}toString(){return this.isValid?`[${this.s.toISO()} – ${this.e.toISO()})`:De}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`:`Interval { Invalid, reason: ${this.invalidReason} }`}toLocaleString(t=qs,e={}){return this.isValid?_t.create(this.s.loc.clone(e),t).formatInterval(this):De}toISO(t){return this.isValid?`${this.s.toISO(t)}/${this.e.toISO(t)}`:De}toISODate(){return this.isValid?`${this.s.toISODate()}/${this.e.toISODate()}`:De}toISOTime(t){return this.isValid?`${this.s.toISOTime(t)}/${this.e.toISOTime(t)}`:De}toFormat(t,{separator:e=" – "}={}){return this.isValid?`${this.s.toFormat(t)}${e}${this.e.toFormat(t)}`:De}toDuration(t,e){return this.isValid?this.e.diff(this.s,t,e):Z.invalid(this.invalidReason)}mapEndpoints(t){return at.fromDateTimes(t(this.s),t(this.e))}}class Es{static hasDST(t=it.defaultZone){const e=M.now().setZone(t).set({month:12});return!t.isUniversal&&e.offset!==e.set({month:6}).offset}static isValidIANAZone(t){return ee.isValidZone(t)}static normalizeZone(t){return oe(t,it.defaultZone)}static getStartOfWeek({locale:t=null,locObj:e=null}={}){return(e||J.create(t)).getStartOfWeek()}static getMinimumDaysInFirstWeek({locale:t=null,locObj:e=null}={}){return(e||J.create(t)).getMinDaysInFirstWeek()}static getWeekendWeekdays({locale:t=null,locObj:e=null}={}){return(e||J.create(t)).getWeekendDays().slice()}static months(t="long",{locale:e=null,numberingSystem:s=null,locObj:n=null,outputCalendar:a="gregory"}={}){return(n||J.create(e,s,a)).months(t)}static monthsFormat(t="long",{locale:e=null,numberingSystem:s=null,locObj:n=null,outputCalendar:a="gregory"}={}){return(n||J.create(e,s,a)).months(t,!0)}static weekdays(t="long",{locale:e=null,numberingSystem:s=null,locObj:n=null}={}){return(n||J.create(e,s,null)).weekdays(t)}static weekdaysFormat(t="long",{locale:e=null,numberingSystem:s=null,locObj:n=null}={}){return(n||J.create(e,s,null)).weekdays(t,!0)}static meridiems({locale:t=null}={}){return J.create(t).meridiems()}static eras(t="short",{locale:e=null}={}){return J.create(e,null,"gregory").eras(t)}static features(){return{relative:cr(),localeWeek:hr()}}}function ca(i,t){const e=n=>n.toUTC(0,{keepLocalTime:!0}).startOf("day").valueOf(),s=e(t)-e(i);return Math.floor(Z.fromMillis(s).as("days"))}function il(i,t,e){const s=[["years",(h,u)=>u.year-h.year],["quarters",(h,u)=>u.quarter-h.quarter+(u.year-h.year)*4],["months",(h,u)=>u.month-h.month+(u.year-h.year)*12],["weeks",(h,u)=>{const y=ca(h,u);return(y-y%7)/7}],["days",ca]],n={},a=i;let r,o;for(const[h,u]of s)e.indexOf(h)>=0&&(r=h,n[h]=u(i,t),o=a.plus(n),o>t?(n[h]--,i=a.plus(n),i>t&&(o=i,n[h]--,i=a.plus(n))):i=o);return[i,n,o,r]}function nl(i,t,e,s){let[n,a,r,o]=il(i,t,e);const h=t-n,u=e.filter(j=>["hours","minutes","seconds","milliseconds"].indexOf(j)>=0);u.length===0&&(r<t&&(r=n.plus({[o]:1})),r!==n&&(a[o]=(a[o]||0)+h/(r-n)));const y=Z.fromObject(a,s);return u.length>0?Z.fromMillis(h,s).shiftTo(...u).plus(y):y}const al="missing Intl.DateTimeFormat.formatToParts support";function Y(i,t=e=>e){return{regex:i,deser:([e])=>t(Gd(e))}}const rl=String.fromCharCode(160),Er=`[ ${rl}]`,Tr=new RegExp(Er,"g");function dl(i){return i.replace(/\./g,"\\.?").replace(Tr,Er)}function ha(i){return i.replace(/\./g,"").replace(Tr," ").toLowerCase()}function Ut(i,t){return i===null?null:{regex:RegExp(i.map(dl).join("|")),deser:([e])=>i.findIndex(s=>ha(e)===ha(s))+t}}function ua(i,t){return{regex:i,deser:([,e,s])=>ii(e,s),groups:t}}function Ts(i){return{regex:i,deser:([t])=>t}}function ol(i){return i.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function ll(i,t){const e=Ft(t),s=Ft(t,"{2}"),n=Ft(t,"{3}"),a=Ft(t,"{4}"),r=Ft(t,"{6}"),o=Ft(t,"{1,2}"),h=Ft(t,"{1,3}"),u=Ft(t,"{1,6}"),y=Ft(t,"{1,9}"),j=Ft(t,"{2,4}"),E=Ft(t,"{4,6}"),O=et=>({regex:RegExp(ol(et.val)),deser:([ht])=>ht,literal:!0}),H=(et=>{if(i.literal)return O(et);switch(et.val){case"G":return Ut(t.eras("short"),0);case"GG":return Ut(t.eras("long"),0);case"y":return Y(u);case"yy":return Y(j,Ai);case"yyyy":return Y(a);case"yyyyy":return Y(E);case"yyyyyy":return Y(r);case"M":return Y(o);case"MM":return Y(s);case"MMM":return Ut(t.months("short",!0),1);case"MMMM":return Ut(t.months("long",!0),1);case"L":return Y(o);case"LL":return Y(s);case"LLL":return Ut(t.months("short",!1),1);case"LLLL":return Ut(t.months("long",!1),1);case"d":return Y(o);case"dd":return Y(s);case"o":return Y(h);case"ooo":return Y(n);case"HH":return Y(s);case"H":return Y(o);case"hh":return Y(s);case"h":return Y(o);case"mm":return Y(s);case"m":return Y(o);case"q":return Y(o);case"qq":return Y(s);case"s":return Y(o);case"ss":return Y(s);case"S":return Y(h);case"SSS":return Y(n);case"u":return Ts(y);case"uu":return Ts(o);case"uuu":return Y(e);case"a":return Ut(t.meridiems(),0);case"kkkk":return Y(a);case"kk":return Y(j,Ai);case"W":return Y(o);case"WW":return Y(s);case"E":case"c":return Y(e);case"EEE":return Ut(t.weekdays("short",!1),1);case"EEEE":return Ut(t.weekdays("long",!1),1);case"ccc":return Ut(t.weekdays("short",!0),1);case"cccc":return Ut(t.weekdays("long",!0),1);case"Z":case"ZZ":return ua(new RegExp(`([+-]${o.source})(?::(${s.source}))?`),2);case"ZZZ":return ua(new RegExp(`([+-]${o.source})(${s.source})?`),2);case"z":return Ts(/[a-z_+-/]{1,256}?/i);case" ":return Ts(/[^\S\n\r]/);default:return O(et)}})(i)||{invalidReason:al};return H.token=i,H}const cl={year:{"2-digit":"yy",numeric:"yyyyy"},month:{numeric:"M","2-digit":"MM",short:"MMM",long:"MMMM"},day:{numeric:"d","2-digit":"dd"},weekday:{short:"EEE",long:"EEEE"},dayperiod:"a",dayPeriod:"a",hour12:{numeric:"h","2-digit":"hh"},hour24:{numeric:"H","2-digit":"HH"},minute:{numeric:"m","2-digit":"mm"},second:{numeric:"s","2-digit":"ss"},timeZoneName:{long:"ZZZZZ",short:"ZZZ"}};function hl(i,t,e){const{type:s,value:n}=i;if(s==="literal"){const h=/^\s+$/.test(n);return{literal:!h,val:h?" ":n}}const a=t[s];let r=s;s==="hour"&&(t.hour12!=null?r=t.hour12?"hour12":"hour24":t.hourCycle!=null?t.hourCycle==="h11"||t.hourCycle==="h12"?r="hour12":r="hour24":r=e.hour12?"hour12":"hour24");let o=cl[r];if(typeof o=="object"&&(o=o[a]),o)return{literal:!1,val:o}}function ul(i){return[`^${i.map(e=>e.regex).reduce((e,s)=>`${e}(${s.source})`,"")}$`,i]}function pl(i,t,e){const s=i.match(t);if(s){const n={};let a=1;for(const r in e)if(Be(e,r)){const o=e[r],h=o.groups?o.groups+1:1;!o.literal&&o.token&&(n[o.token.val[0]]=o.deser(s.slice(a,a+h))),a+=h}return[s,n]}else return[s,{}]}function $l(i){const t=a=>{switch(a){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":case"H":return"hour";case"d":return"day";case"o":return"ordinal";case"L":case"M":return"month";case"y":return"year";case"E":case"c":return"weekday";case"W":return"weekNumber";case"k":return"weekYear";case"q":return"quarter";default:return null}};let e=null,s;return U(i.z)||(e=ee.create(i.z)),U(i.Z)||(e||(e=new kt(i.Z)),s=i.Z),U(i.q)||(i.M=(i.q-1)*3+1),U(i.h)||(i.h<12&&i.a===1?i.h+=12:i.h===12&&i.a===0&&(i.h=0)),i.G===0&&i.y&&(i.y=-i.y),U(i.u)||(i.S=Ki(i.u)),[Object.keys(i).reduce((a,r)=>{const o=t(r);return o&&(a[o]=i[r]),a},{}),e,s]}let _i=null;function fl(){return _i||(_i=M.fromMillis(1555555555555)),_i}function ml(i,t){if(i.literal)return i;const e=_t.macroTokenToFormatOpts(i.val),s=Lr(e,t);return s==null||s.includes(void 0)?i:s}function Mr(i,t){return Array.prototype.concat(...i.map(e=>ml(e,t)))}class Ir{constructor(t,e){if(this.locale=t,this.format=e,this.tokens=Mr(_t.parseFormat(e),t),this.units=this.tokens.map(s=>ll(s,t)),this.disqualifyingUnit=this.units.find(s=>s.invalidReason),!this.disqualifyingUnit){const[s,n]=ul(this.units);this.regex=RegExp(s,"i"),this.handlers=n}}explainFromTokens(t){if(this.isValid){const[e,s]=pl(t,this.regex,this.handlers),[n,a,r]=s?$l(s):[null,null,void 0];if(Be(s,"a")&&Be(s,"H"))throw new ze("Can't include meridiem when specifying 24-hour format");return{input:t,tokens:this.tokens,regex:this.regex,rawMatches:e,matches:s,result:n,zone:a,specificOffset:r}}else return{input:t,tokens:this.tokens,invalidReason:this.invalidReason}}get isValid(){return!this.disqualifyingUnit}get invalidReason(){return this.disqualifyingUnit?this.disqualifyingUnit.invalidReason:null}}function Dr(i,t,e){return new Ir(i,e).explainFromTokens(t)}function gl(i,t,e){const{result:s,zone:n,specificOffset:a,invalidReason:r}=Dr(i,t,e);return[s,n,a,r]}function Lr(i,t){if(!i)return null;const s=_t.create(t,i).dtFormatter(fl()),n=s.formatToParts(),a=s.resolvedOptions();return n.map(r=>hl(r,i,a))}const wi="Invalid DateTime",pa=864e13;function ns(i){return new Wt("unsupported zone",`the zone "${i.name}" is not supported`)}function Si(i){return i.weekData===null&&(i.weekData=Bs(i.c)),i.weekData}function ki(i){return i.localWeekData===null&&(i.localWeekData=Bs(i.c,i.loc.getMinDaysInFirstWeek(),i.loc.getStartOfWeek())),i.localWeekData}function be(i,t){const e={ts:i.ts,zone:i.zone,c:i.c,o:i.o,loc:i.loc,invalid:i.invalid};return new M({...e,...t,old:e})}function Nr(i,t,e){let s=i-t*60*1e3;const n=e.offset(s);if(t===n)return[s,t];s-=(n-t)*60*1e3;const a=e.offset(s);return n===a?[s,n]:[i-Math.min(n,a)*60*1e3,Math.max(n,a)]}function Ms(i,t){i+=t*60*1e3;const e=new Date(i);return{year:e.getUTCFullYear(),month:e.getUTCMonth()+1,day:e.getUTCDate(),hour:e.getUTCHours(),minute:e.getUTCMinutes(),second:e.getUTCSeconds(),millisecond:e.getUTCMilliseconds()}}function Ns(i,t,e){return Nr(si(i),t,e)}function $a(i,t){const e=i.o,s=i.c.year+Math.trunc(t.years),n=i.c.month+Math.trunc(t.months)+Math.trunc(t.quarters)*3,a={...i.c,year:s,month:n,day:Math.min(i.c.day,Vs(s,n))+Math.trunc(t.days)+Math.trunc(t.weeks)*7},r=Z.fromObject({years:t.years-Math.trunc(t.years),quarters:t.quarters-Math.trunc(t.quarters),months:t.months-Math.trunc(t.months),weeks:t.weeks-Math.trunc(t.weeks),days:t.days-Math.trunc(t.days),hours:t.hours,minutes:t.minutes,seconds:t.seconds,milliseconds:t.milliseconds}).as("milliseconds"),o=si(a);let[h,u]=Nr(o,e,i.zone);return r!==0&&(h+=r,u=i.zone.offset(h)),{ts:h,o:u}}function Le(i,t,e,s,n,a){const{setZone:r,zone:o}=e;if(i&&Object.keys(i).length!==0||t){const h=t||o,u=M.fromObject(i,{...e,zone:h,specificOffset:a});return r?u:u.setZone(o)}else return M.invalid(new Wt("unparsable",`the input "${n}" can't be parsed as ${s}`))}function Is(i,t,e=!0){return i.isValid?_t.create(J.create("en-US"),{allowZ:e,forceSimple:!0}).formatDateTimeFromString(i,t):null}function Ci(i,t){const e=i.c.year>9999||i.c.year<0;let s="";return e&&i.c.year>=0&&(s+="+"),s+=ot(i.c.year,e?6:4),t?(s+="-",s+=ot(i.c.month),s+="-",s+=ot(i.c.day)):(s+=ot(i.c.month),s+=ot(i.c.day)),s}function fa(i,t,e,s,n,a){let r=ot(i.c.hour);return t?(r+=":",r+=ot(i.c.minute),(i.c.millisecond!==0||i.c.second!==0||!e)&&(r+=":")):r+=ot(i.c.minute),(i.c.millisecond!==0||i.c.second!==0||!e)&&(r+=ot(i.c.second),(i.c.millisecond!==0||!s)&&(r+=".",r+=ot(i.c.millisecond,3))),n&&(i.isOffsetFixed&&i.offset===0&&!a?r+="Z":i.o<0?(r+="-",r+=ot(Math.trunc(-i.o/60)),r+=":",r+=ot(Math.trunc(-i.o%60))):(r+="+",r+=ot(Math.trunc(i.o/60)),r+=":",r+=ot(Math.trunc(i.o%60)))),a&&(r+="["+i.zone.ianaName+"]"),r}const Ar={month:1,day:1,hour:0,minute:0,second:0,millisecond:0},bl={weekNumber:1,weekday:1,hour:0,minute:0,second:0,millisecond:0},vl={ordinal:1,hour:0,minute:0,second:0,millisecond:0},Pr=["year","month","day","hour","minute","second","millisecond"],yl=["weekYear","weekNumber","weekday","hour","minute","second","millisecond"],_l=["year","ordinal","hour","minute","second","millisecond"];function wl(i){const t={year:"year",years:"year",month:"month",months:"month",day:"day",days:"day",hour:"hour",hours:"hour",minute:"minute",minutes:"minute",quarter:"quarter",quarters:"quarter",second:"second",seconds:"second",millisecond:"millisecond",milliseconds:"millisecond",weekday:"weekday",weekdays:"weekday",weeknumber:"weekNumber",weeksnumber:"weekNumber",weeknumbers:"weekNumber",weekyear:"weekYear",weekyears:"weekYear",ordinal:"ordinal"}[i.toLowerCase()];if(!t)throw new za(i);return t}function ma(i){switch(i.toLowerCase()){case"localweekday":case"localweekdays":return"localWeekday";case"localweeknumber":case"localweeknumbers":return"localWeekNumber";case"localweekyear":case"localweekyears":return"localWeekYear";default:return wl(i)}}function Sl(i){return Ps[i]||(As===void 0&&(As=it.now()),Ps[i]=i.offset(As)),Ps[i]}function ga(i,t){const e=oe(t.zone,it.defaultZone);if(!e.isValid)return M.invalid(ns(e));const s=J.fromObject(t);let n,a;if(U(i.year))n=it.now();else{for(const h of Pr)U(i[h])&&(i[h]=Ar[h]);const r=or(i)||lr(i);if(r)return M.invalid(r);const o=Sl(e);[n,a]=Ns(i,o,e)}return new M({ts:n,zone:e,loc:s,o:a})}function ba(i,t,e){const s=U(e.round)?!0:e.round,n=(r,o)=>(r=Yi(r,s||e.calendary?0:2,!0),t.loc.clone(e).relFormatter(e).format(r,o)),a=r=>e.calendary?t.hasSame(i,r)?0:t.startOf(r).diff(i.startOf(r),r).get(r):t.diff(i,r).get(r);if(e.unit)return n(a(e.unit),e.unit);for(const r of e.units){const o=a(r);if(Math.abs(o)>=1)return n(o,r)}return n(i>t?-0:0,e.units[e.units.length-1])}function va(i){let t={},e;return i.length>0&&typeof i[i.length-1]=="object"?(t=i[i.length-1],e=Array.from(i).slice(0,i.length-1)):e=Array.from(i),[t,e]}let As,Ps={};class M{constructor(t){const e=t.zone||it.defaultZone;let s=t.invalid||(Number.isNaN(t.ts)?new Wt("invalid input"):null)||(e.isValid?null:ns(e));this.ts=U(t.ts)?it.now():t.ts;let n=null,a=null;if(!s)if(t.old&&t.old.ts===this.ts&&t.old.zone.equals(e))[n,a]=[t.old.c,t.old.o];else{const o=he(t.o)&&!t.old?t.o:e.offset(this.ts);n=Ms(this.ts,o),s=Number.isNaN(n.year)?new Wt("invalid input"):null,n=s?null:n,a=s?null:o}this._zone=e,this.loc=t.loc||J.create(),this.invalid=s,this.weekData=null,this.localWeekData=null,this.c=n,this.o=a,this.isLuxonDateTime=!0}static now(){return new M({})}static local(){const[t,e]=va(arguments),[s,n,a,r,o,h,u]=e;return ga({year:s,month:n,day:a,hour:r,minute:o,second:h,millisecond:u},t)}static utc(){const[t,e]=va(arguments),[s,n,a,r,o,h,u]=e;return t.zone=kt.utcInstance,ga({year:s,month:n,day:a,hour:r,minute:o,second:h,millisecond:u},t)}static fromJSDate(t,e={}){const s=Jd(t)?t.valueOf():NaN;if(Number.isNaN(s))return M.invalid("invalid input");const n=oe(e.zone,it.defaultZone);return n.isValid?new M({ts:s,zone:n,loc:J.fromObject(e)}):M.invalid(ns(n))}static fromMillis(t,e={}){if(he(t))return t<-pa||t>pa?M.invalid("Timestamp out of range"):new M({ts:t,zone:oe(e.zone,it.defaultZone),loc:J.fromObject(e)});throw new yt(`fromMillis requires a numerical input, but received a ${typeof t} with value ${t}`)}static fromSeconds(t,e={}){if(he(t))return new M({ts:t*1e3,zone:oe(e.zone,it.defaultZone),loc:J.fromObject(e)});throw new yt("fromSeconds requires a numerical input")}static fromObject(t,e={}){t=t||{};const s=oe(e.zone,it.defaultZone);if(!s.isValid)return M.invalid(ns(s));const n=J.fromObject(e),a=Ws(t,ma),{minDaysInFirstWeek:r,startOfWeek:o}=ia(a,n),h=it.now(),u=U(e.specificOffset)?s.offset(h):e.specificOffset,y=!U(a.ordinal),j=!U(a.year),E=!U(a.month)||!U(a.day),O=j||E,R=a.weekYear||a.weekNumber;if((O||y)&&R)throw new ze("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(E&&y)throw new ze("Can't mix ordinal dates with month/day");const H=R||a.weekday&&!O;let et,ht,ft=Ms(h,u);H?(et=yl,ht=bl,ft=Bs(ft,r,o)):y?(et=_l,ht=vl,ft=yi(ft)):(et=Pr,ht=Ar);let Ct=!1;for(const N of et){const Q=a[N];U(Q)?Ct?a[N]=ht[N]:a[N]=ft[N]:Ct=!0}const zt=H?Kd(a,r,o):y?Yd(a):or(a),Gt=zt||lr(a);if(Gt)return M.invalid(Gt);const dt=H?ea(a,r,o):y?sa(a):a,[It,nt]=Ns(dt,u,s),G=new M({ts:It,zone:s,o:nt,loc:n});return a.weekday&&O&&t.weekday!==G.weekday?M.invalid("mismatched weekday",`you can't specify both a weekday of ${a.weekday} and a date of ${G.toISO()}`):G.isValid?G:M.invalid(G.invalid)}static fromISO(t,e={}){const[s,n]=qo(t);return Le(s,n,e,"ISO 8601",t)}static fromRFC2822(t,e={}){const[s,n]=Bo(t);return Le(s,n,e,"RFC 2822",t)}static fromHTTP(t,e={}){const[s,n]=Vo(t);return Le(s,n,e,"HTTP",e)}static fromFormat(t,e,s={}){if(U(t)||U(e))throw new yt("fromFormat requires an input string and a format");const{locale:n=null,numberingSystem:a=null}=s,r=J.fromOpts({locale:n,numberingSystem:a,defaultToEN:!0}),[o,h,u,y]=gl(r,t,e);return y?M.invalid(y):Le(o,h,s,`format ${e}`,t,u)}static fromString(t,e,s={}){return M.fromFormat(t,e,s)}static fromSQL(t,e={}){const[s,n]=Qo(t);return Le(s,n,e,"SQL",t)}static invalid(t,e=null){if(!t)throw new yt("need to specify a reason the DateTime is invalid");const s=t instanceof Wt?t:new Wt(t,e);if(it.throwOnInvalid)throw new wd(s);return new M({invalid:s})}static isDateTime(t){return t&&t.isLuxonDateTime||!1}static parseFormatForOpts(t,e={}){const s=Lr(t,J.fromObject(e));return s?s.map(n=>n?n.val:null).join(""):null}static expandFormat(t,e={}){return Mr(_t.parseFormat(t),J.fromObject(e)).map(n=>n.val).join("")}static resetCache(){As=void 0,Ps={}}get(t){return this[t]}get isValid(){return this.invalid===null}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}get outputCalendar(){return this.isValid?this.loc.outputCalendar:null}get zone(){return this._zone}get zoneName(){return this.isValid?this.zone.name:null}get year(){return this.isValid?this.c.year:NaN}get quarter(){return this.isValid?Math.ceil(this.c.month/3):NaN}get month(){return this.isValid?this.c.month:NaN}get day(){return this.isValid?this.c.day:NaN}get hour(){return this.isValid?this.c.hour:NaN}get minute(){return this.isValid?this.c.minute:NaN}get second(){return this.isValid?this.c.second:NaN}get millisecond(){return this.isValid?this.c.millisecond:NaN}get weekYear(){return this.isValid?Si(this).weekYear:NaN}get weekNumber(){return this.isValid?Si(this).weekNumber:NaN}get weekday(){return this.isValid?Si(this).weekday:NaN}get isWeekend(){return this.isValid&&this.loc.getWeekendDays().includes(this.weekday)}get localWeekday(){return this.isValid?ki(this).weekday:NaN}get localWeekNumber(){return this.isValid?ki(this).weekNumber:NaN}get localWeekYear(){return this.isValid?ki(this).weekYear:NaN}get ordinal(){return this.isValid?yi(this.c).ordinal:NaN}get monthShort(){return this.isValid?Es.months("short",{locObj:this.loc})[this.month-1]:null}get monthLong(){return this.isValid?Es.months("long",{locObj:this.loc})[this.month-1]:null}get weekdayShort(){return this.isValid?Es.weekdays("short",{locObj:this.loc})[this.weekday-1]:null}get weekdayLong(){return this.isValid?Es.weekdays("long",{locObj:this.loc})[this.weekday-1]:null}get offset(){return this.isValid?+this.o:NaN}get offsetNameShort(){return this.isValid?this.zone.offsetName(this.ts,{format:"short",locale:this.locale}):null}get offsetNameLong(){return this.isValid?this.zone.offsetName(this.ts,{format:"long",locale:this.locale}):null}get isOffsetFixed(){return this.isValid?this.zone.isUniversal:null}get isInDST(){return this.isOffsetFixed?!1:this.offset>this.set({month:1,day:1}).offset||this.offset>this.set({month:5}).offset}getPossibleOffsets(){if(!this.isValid||this.isOffsetFixed)return[this];const t=864e5,e=6e4,s=si(this.c),n=this.zone.offset(s-t),a=this.zone.offset(s+t),r=this.zone.offset(s-n*e),o=this.zone.offset(s-a*e);if(r===o)return[this];const h=s-r*e,u=s-o*e,y=Ms(h,r),j=Ms(u,o);return y.hour===j.hour&&y.minute===j.minute&&y.second===j.second&&y.millisecond===j.millisecond?[be(this,{ts:h}),be(this,{ts:u})]:[this]}get isInLeapYear(){return fs(this.year)}get daysInMonth(){return Vs(this.year,this.month)}get daysInYear(){return this.isValid?Re(this.year):NaN}get weeksInWeekYear(){return this.isValid?cs(this.weekYear):NaN}get weeksInLocalWeekYear(){return this.isValid?cs(this.localWeekYear,this.loc.getMinDaysInFirstWeek(),this.loc.getStartOfWeek()):NaN}resolvedLocaleOptions(t={}){const{locale:e,numberingSystem:s,calendar:n}=_t.create(this.loc.clone(t),t).resolvedOptions(this);return{locale:e,numberingSystem:s,outputCalendar:n}}toUTC(t=0,e={}){return this.setZone(kt.instance(t),e)}toLocal(){return this.setZone(it.defaultZone)}setZone(t,{keepLocalTime:e=!1,keepCalendarTime:s=!1}={}){if(t=oe(t,it.defaultZone),t.equals(this.zone))return this;if(t.isValid){let n=this.ts;if(e||s){const a=t.offset(this.ts),r=this.toObject();[n]=Ns(r,a,t)}return be(this,{ts:n,zone:t})}else return M.invalid(ns(t))}reconfigure({locale:t,numberingSystem:e,outputCalendar:s}={}){const n=this.loc.clone({locale:t,numberingSystem:e,outputCalendar:s});return be(this,{loc:n})}setLocale(t){return this.reconfigure({locale:t})}set(t){if(!this.isValid)return this;const e=Ws(t,ma),{minDaysInFirstWeek:s,startOfWeek:n}=ia(e,this.loc),a=!U(e.weekYear)||!U(e.weekNumber)||!U(e.weekday),r=!U(e.ordinal),o=!U(e.year),h=!U(e.month)||!U(e.day),u=o||h,y=e.weekYear||e.weekNumber;if((u||r)&&y)throw new ze("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(h&&r)throw new ze("Can't mix ordinal dates with month/day");let j;a?j=ea({...Bs(this.c,s,n),...e},s,n):U(e.ordinal)?(j={...this.toObject(),...e},U(e.day)&&(j.day=Math.min(Vs(j.year,j.month),j.day))):j=sa({...yi(this.c),...e});const[E,O]=Ns(j,this.o,this.zone);return be(this,{ts:E,o:O})}plus(t){if(!this.isValid)return this;const e=Z.fromDurationLike(t);return be(this,$a(this,e))}minus(t){if(!this.isValid)return this;const e=Z.fromDurationLike(t).negate();return be(this,$a(this,e))}startOf(t,{useLocaleWeeks:e=!1}={}){if(!this.isValid)return this;const s={},n=Z.normalizeUnit(t);switch(n){case"years":s.month=1;case"quarters":case"months":s.day=1;case"weeks":case"days":s.hour=0;case"hours":s.minute=0;case"minutes":s.second=0;case"seconds":s.millisecond=0;break}if(n==="weeks")if(e){const a=this.loc.getStartOfWeek(),{weekday:r}=this;r<a&&(s.weekNumber=this.weekNumber-1),s.weekday=a}else s.weekday=1;if(n==="quarters"){const a=Math.ceil(this.month/3);s.month=(a-1)*3+1}return this.set(s)}endOf(t,e){return this.isValid?this.plus({[t]:1}).startOf(t,e).minus(1):this}toFormat(t,e={}){return this.isValid?_t.create(this.loc.redefaultToEN(e)).formatDateTimeFromString(this,t):wi}toLocaleString(t=qs,e={}){return this.isValid?_t.create(this.loc.clone(e),t).formatDateTime(this):wi}toLocaleParts(t={}){return this.isValid?_t.create(this.loc.clone(t),t).formatDateTimeParts(this):[]}toISO({format:t="extended",suppressSeconds:e=!1,suppressMilliseconds:s=!1,includeOffset:n=!0,extendedZone:a=!1}={}){if(!this.isValid)return null;const r=t==="extended";let o=Ci(this,r);return o+="T",o+=fa(this,r,e,s,n,a),o}toISODate({format:t="extended"}={}){return this.isValid?Ci(this,t==="extended"):null}toISOWeekDate(){return Is(this,"kkkk-'W'WW-c")}toISOTime({suppressMilliseconds:t=!1,suppressSeconds:e=!1,includeOffset:s=!0,includePrefix:n=!1,extendedZone:a=!1,format:r="extended"}={}){return this.isValid?(n?"T":"")+fa(this,r==="extended",e,t,s,a):null}toRFC2822(){return Is(this,"EEE, dd LLL yyyy HH:mm:ss ZZZ",!1)}toHTTP(){return Is(this.toUTC(),"EEE, dd LLL yyyy HH:mm:ss 'GMT'")}toSQLDate(){return this.isValid?Ci(this,!0):null}toSQLTime({includeOffset:t=!0,includeZone:e=!1,includeOffsetSpace:s=!0}={}){let n="HH:mm:ss.SSS";return(e||t)&&(s&&(n+=" "),e?n+="z":t&&(n+="ZZ")),Is(this,n,!0)}toSQL(t={}){return this.isValid?`${this.toSQLDate()} ${this.toSQLTime(t)}`:null}toString(){return this.isValid?this.toISO():wi}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`:`DateTime { Invalid, reason: ${this.invalidReason} }`}valueOf(){return this.toMillis()}toMillis(){return this.isValid?this.ts:NaN}toSeconds(){return this.isValid?this.ts/1e3:NaN}toUnixInteger(){return this.isValid?Math.floor(this.ts/1e3):NaN}toJSON(){return this.toISO()}toBSON(){return this.toJSDate()}toObject(t={}){if(!this.isValid)return{};const e={...this.c};return t.includeConfig&&(e.outputCalendar=this.outputCalendar,e.numberingSystem=this.loc.numberingSystem,e.locale=this.loc.locale),e}toJSDate(){return new Date(this.isValid?this.ts:NaN)}diff(t,e="milliseconds",s={}){if(!this.isValid||!t.isValid)return Z.invalid("created by diffing an invalid DateTime");const n={locale:this.locale,numberingSystem:this.numberingSystem,...s},a=Xd(e).map(Z.normalizeUnit),r=t.valueOf()>this.valueOf(),o=r?this:t,h=r?t:this,u=nl(o,h,a,n);return r?u.negate():u}diffNow(t="milliseconds",e={}){return this.diff(M.now(),t,e)}until(t){return this.isValid?at.fromDateTimes(this,t):this}hasSame(t,e,s){if(!this.isValid)return!1;const n=t.valueOf(),a=this.setZone(t.zone,{keepLocalTime:!0});return a.startOf(e,s)<=n&&n<=a.endOf(e,s)}equals(t){return this.isValid&&t.isValid&&this.valueOf()===t.valueOf()&&this.zone.equals(t.zone)&&this.loc.equals(t.loc)}toRelative(t={}){if(!this.isValid)return null;const e=t.base||M.fromObject({},{zone:this.zone}),s=t.padding?this<e?-t.padding:t.padding:0;let n=["years","months","days","hours","minutes","seconds"],a=t.unit;return Array.isArray(t.unit)&&(n=t.unit,a=void 0),ba(e,this.plus(s),{...t,numeric:"always",units:n,unit:a})}toRelativeCalendar(t={}){return this.isValid?ba(t.base||M.fromObject({},{zone:this.zone}),this,{...t,numeric:"auto",units:["years","months","days"],calendary:!0}):null}static min(...t){if(!t.every(M.isDateTime))throw new yt("min requires all arguments be DateTimes");return na(t,e=>e.valueOf(),Math.min)}static max(...t){if(!t.every(M.isDateTime))throw new yt("max requires all arguments be DateTimes");return na(t,e=>e.valueOf(),Math.max)}static fromFormatExplain(t,e,s={}){const{locale:n=null,numberingSystem:a=null}=s,r=J.fromOpts({locale:n,numberingSystem:a,defaultToEN:!0});return Dr(r,t,e)}static fromStringExplain(t,e,s={}){return M.fromFormatExplain(t,e,s)}static buildFormatParser(t,e={}){const{locale:s=null,numberingSystem:n=null}=e,a=J.fromOpts({locale:s,numberingSystem:n,defaultToEN:!0});return new Ir(a,t)}static fromFormatParser(t,e,s={}){if(U(t)||U(e))throw new yt("fromFormatParser requires an input string and a format parser");const{locale:n=null,numberingSystem:a=null}=s,r=J.fromOpts({locale:n,numberingSystem:a,defaultToEN:!0});if(!r.equals(e.locale))throw new yt(`fromFormatParser called with a locale of ${r}, but the format parser was created for ${e.locale}`);const{result:o,zone:h,specificOffset:u,invalidReason:y}=e.explainFromTokens(t);return y?M.invalid(y):Le(o,h,s,`format ${e.format}`,t,u)}static get DATE_SHORT(){return qs}static get DATE_MED(){return Ra}static get DATE_MED_WITH_WEEKDAY(){return Cd}static get DATE_FULL(){return Fa}static get DATE_HUGE(){return Ua}static get TIME_SIMPLE(){return qa}static get TIME_WITH_SECONDS(){return Ba}static get TIME_WITH_SHORT_OFFSET(){return Va}static get TIME_WITH_LONG_OFFSET(){return Wa}static get TIME_24_SIMPLE(){return Ha}static get TIME_24_WITH_SECONDS(){return Ga}static get TIME_24_WITH_SHORT_OFFSET(){return Za}static get TIME_24_WITH_LONG_OFFSET(){return Ka}static get DATETIME_SHORT(){return Ya}static get DATETIME_SHORT_WITH_SECONDS(){return Qa}static get DATETIME_MED(){return Ja}static get DATETIME_MED_WITH_SECONDS(){return Xa}static get DATETIME_MED_WITH_WEEKDAY(){return jd}static get DATETIME_FULL(){return tr}static get DATETIME_FULL_WITH_SECONDS(){return er}static get DATETIME_HUGE(){return sr}static get DATETIME_HUGE_WITH_SECONDS(){return ir}}function ts(i){if(M.isDateTime(i))return i;if(i&&i.valueOf&&he(i.valueOf()))return M.fromJSDate(i);if(i&&typeof i=="object")return M.fromObject(i);throw new yt(`Unknown datetime argument: ${i}, of type ${typeof i}`)}class zr extends B{static get properties(){return{startDate:{type:String},endDate:{type:String},selectedDays:{type:Array},highlightedDays:{type:Array},view:{type:String},translations:{type:Object},showToday:{type:Boolean},showTodayButton:{type:Boolean},showClearButton:{type:Boolean},viewOnly:{type:Boolean},monthToShow:{attribute:!1}}}constructor(){super(),this.startDate="",this.endDate="",this.selectedDays=[],this.highlightedDays=[],this.showToday=!1,this.showTodayButton=!1,this.showClearButton=!1,this.viewOnly=!1,this.today=M.now().toISODate(),this.view="slider",this.translations={clear:"Clear",today:"Today"};const t=document.querySelector("html");this.isRtl=t.getAttribute("dir")==="rtl"}firstUpdated(){super.firstUpdated(),this.monthToShow=M.now()}willUpdate(t){if(t.has("selectedDays"))if(this.selectedDays.length>0){const e=this.selectedDays[0];this.monthToShow=M.fromFormat(`${e.date}`,"y-LL-dd")}else this.monthToShow=M.now()}nextView(t){this.shadowRoot.querySelectorAll(".selected-time").forEach(e=>e.classList.remove("selected-time")),this.monthToShow=t}handleSelectDay(t,e){const s=t.target;this.selectDay(e,s)}selectDay(t,e){const s=this.selectedDays.filter(n=>n.date===t);s.length===0?this.dispatchEvent(new CustomEvent("day-added",{detail:{date:t}})):s.forEach(({id:n})=>{this.dispatchEvent(new CustomEvent("day-removed",{detail:{id:n}}))}),this.shadowRoot.querySelectorAll(".selected-time").forEach(n=>n.classList.remove("selected-time")),e&&e.classList.add("selected-time")}getDaysOfTheWeekInitials(t="en-US",e="long"){const s=new Date,n=864e5,a=r=>M.fromMillis(r).toLocaleString({weekday:e});return[...Array(7).keys()].map(r=>a(new Date().getTime()-(s.getDay()-r)*n))}buildCalendarDays(t="en-US",e){const s=e.startOf("month").startOf("day"),n=[],a=r=>M.fromMillis(r).toLocaleString({day:"numeric"});for(let r=0;r<e.daysInMonth;r++){const o=s.plus({days:r}),h=o.plus({days:1}),u=this.endDate&&o>M.fromISO(this.endDate)||h<=M.fromISO(this.startDate),y={key:o.toISODate(),formatted:a(o.toMillis()),disabled:u};n.push(y)}return n}addMonth(){const t=M.fromISO(this.endDate).plus({months:1}).endOf("month").toISODate();this.dispatchEvent(new CustomEvent("calendar-extended",{detail:{newEndDate:t}})),this.endDate=t}isHighlighted(t){return!!this.highlightedDays.find(s=>s.date===t)}isSelected(t){return!!this.selectedDays.find(s=>s.date===t)}renderCalendar(t){const e=this.getDaysOfTheWeekInitials(jsObject.locale,"narrow"),s=t.startOf("month").weekday,n=this.buildCalendarDays(jsObject.locale,t);return l`
            ${e.map(a=>l`
                    <div class="cell week-day">
                        ${a}
                    </div>
                `)}
            ${Bn(qn(s%7),a=>l`
                    <div class="cell"></div>
                `)}
            ${n.map(a=>l`
                    <button
                        class="cell day ${a.disabled?"disabled":""} ${this.isHighlighted(a.key)?"highlighted-day":""} ${this.isSelected(a.key)?"selected-day":""} ${this.showToday&&a.key===this.today?"today":""}"
                        data-day=${a.key}
                        @click=${r=>!a.disabled&&this.handleSelectDay(r,a.key)}
                        ?disabled=${this.viewOnly}
                    >
                        ${a.formatted}
                    </button>
                `)}
        `}clearCalendar(){this.dispatchEvent(new CustomEvent("clear")),this.shadowRoot.querySelectorAll(".selected-time").forEach(t=>{t.classList.remove("selected-time")})}selectToday(){this.monthToShow=M.now({locale:jsObject.locale});const t=this.monthToShow.toISODate(),e=this.shadowRoot.querySelector(`.day[data-day="${t}"]`);this.selectDay(t,e)}renderSlider(){M.now({locale:jsObject.locale});const t=this.monthToShow||M.fromISO(this.startDate),e=t.startOf("month"),s=t.minus({months:1}),n=e.plus({months:1});return l`

            <div class="calendar-wrapper" dir=${this.isRtl?"rtl":"ltr"}>
                <div class="calendar">
                    <button
                        class="button month-next"
                        ?disabled=${this.startDate?e<=M.fromISO(this.startDate).startOf("month"):!1}
                        @click=${()=>this.nextView(s)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path d="M15 6L8 12L15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <h3 class="month-title">
                        ${t.toFormat("LLLL y")}
                    </h3>
                    <button
                        class="button month-next"
                        ?disabled=${this.endDate?n>M.fromISO(this.endDate):!1}
                        @click=${()=>this.nextView(n)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path d="M10 6L17 12L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    ${this.renderCalendar(t)}
                </div>
                ${this.showClearButton||this.showTodayButton?l`
                        <div class="calendar-footer repel">
                            ${this.showClearButton?l`
                                    <button
                                        class="button small"
                                        @click=${()=>this.clearCalendar()}
                                    >
                                        ${this.translations.clear}
                                    </button>
                                `:""}
                            ${this.showTodayButton?l`
                                    <button
                                        class="button small"
                                        @click=${()=>this.selectToday()}
                                    >
                                        ${this.translations.today}
                                    </button>
                                `:""}
                        </div>
                    `:""}

            </div>
        `}render(){if(this.view==="all"){const e=M.fromISO(this.startDate).startOf("month");let s=0;for(;e.plus({months:s})<M.fromISO(this.endDate);)s=s+1;return l`
                <div class="calendar-wrapper grid" dir=${this.isRtl?"rtl":"ltr"}>
                    ${Bn(qn(s),n=>{const a=e.plus({months:n});return l`
                                <div class="calendar">
                                    <h3 class="month-title full-width">
                                        ${a.toFormat("LLLL y")}
                                    </h3>
                                    ${this.renderCalendar(a)}
                                </div>
                            `})}
                    ${this.view!=="slider"&&!this.viewOnly?l`
                            <div class="add-month-button" role="button" @click=${this.addMonth}>
                                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" color="currentColor" width="40" height="40" viewBox="0 0 40 40">
                                    <path d="M32.104,18.262h-10.365V7.896c0-.96-.777-1.738-1.738-1.738s-1.738.778-1.738,1.738v10.366H7.896c-.961,0-1.738.778-1.738,1.738s.777,1.738,1.738,1.738h10.367v10.367c0,.96.777,1.738,1.738,1.738s1.738-.778,1.738-1.738v-10.367h10.365c.961,0,1.738-.778,1.738-1.738s-.777-1.738-1.738-1.738Z" stroke-width="0"/>
                                </svg>
                            </div>
                        `:""}
                </div>
            `}else return this.renderSlider()}}X(zr,"styles",[Vi`
          :host {
            display: block;
            container-type: inline-size;
            container-name: calendar;
          }
          button {
            background-color: transparent;
            color: inherit;
            font-size: inherit;
            font-family: inherit
          }
          button:hover {
            color: inherit
          }
          .calendar-wrapper {
            --cp-color: var(--primary-color, #489bfa);
            --cp-color-darker: var(--primary-darker, #387cc9);
            --cp-hover-color: var(--hover-color, #4676fa1a);
            --cp-grid-min-size: var(--grid-min-size, 190px);
            font-size: min(6cqw, 18px);
          }
          .calendar-footer {
            margin-left: 5%;
            margin-right: 5%;
          }
          .repel {
            display: flex;
            justify-content: space-between;
          }
          .grid {
            display: grid;
            grid-gap: 1rem;
            grid-auto-rows: 1fr;
          }
          @supports (width: min(250px, 100%)) {
            .grid {
              grid-template-columns: repeat(auto-fit, minmax(min(var(--cp-grid-min-size), 100%), 1fr));
            }
          }
          .calendar {
            display: grid;
            grid-template-columns: repeat(7, 14.2%);
            row-gap: 4px;
            justify-items: center;
          }
          .cell {
            display: flex;
            align-items: center;
            justify-content: center;
            aspect-ratio: 1;
            max-width: 40px;
            border-radius: 50%;
            border-width: 2px;
            border-style: solid;
            border-color: transparent;
            transition: background-color 50ms linear;
            width: 100%;
          }
          @supports not ( aspect-ratio: 1 ) {
            .cell {
                line-height: 1.7;
            }
          }

          .day.cell:hover {
            background-color: var(--cp-hover-color);
            cursor: pointer;
          }
          .day.cell.disabled  {
            color:lightgrey;
            cursor: default;
          }
          .day.cell.disabled:hover {
            background-color: transparent;
          }
          .week-day {
            font-weight: 600;
            font-size:clamp(0.75em, 0.65rem + 2cqi, 1em);
          }
          .selected-time {
            color: black;
            border-color: var(--cp-color);
            background-color: var(--cp-hover-color);
          }
          .highlighted-day {
            background-color: var(--cp-hover-color);
          }
          .selected-day {
            color: white;
            background-color: var(--cp-color);
          }
          .today {
            border-color: black;
          }
          .day.cell.selected-day:hover {
            color: white;
            background-color: var(--cp-color-darker);
          }
          .month-title {
            display: flex;
            justify-content: space-between;
            font-size: 1.1em;
            font-weight: 600;
            grid-column: 2 / 7;
            margin-top: 0;
            margin-bottom: 0;
          }
          .month-title.full-width {
            grid-column: 1 / 8;
          }
          .month-next {
            padding: 0.2rem 0.25rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .month-next svg {
            width: 1.5em;
          }
          [dir="rtl"] .month-next svg {
            transform: rotate(180deg);
          }
          .button {
            padding: 0.25em 0.5em;
            color: rgb(254, 254, 254);
            font-size: 1em;
            border-radius: 5px;
            border: 1px solid transparent;
            font-weight: normal;
            cursor: pointer;
            background-color: var(--cp-color);
            line-height: 1;
            transition: all 50ms linear;
          }
          .button:not([disabled]):hover {
            background-color: transparent;
            border-color: var(--cp-color);
            color: var(--cp-color);
          }
          .button[disabled] {
            opacity: 0.25;
            cursor: default;
          }
          .button.small {
            padding: 0.4rem 0.5rem;
          }
          .add-month-button {
            display: flex;
            align-items: center;
            justify-content: center;
            fill: var(--cp-color);
            background-color: var(--cp-hover-color);
            margin-left: 10%;
            margin-right: 10%;
            margin-top: auto;
            margin-bottom: auto;
            aspect-ratio: 3 / 4;
            border-radius: 10%;
            transition: all 50ms linear;
            cursor: pointer;
          }
          .add-month-button:hover svg,
          .add-month-button:active svg,
          .add-month-button:focus svg {
            transform: scale(1.2);
          }
          .add-month-button svg {
            transition: transform 100ms linear;
            width: 30%;
          }
        `]);customElements.define("calendar-select",zr);/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const ye={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Rr=i=>(...t)=>({_$litDirective$:i,values:t});let Fr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const{I:kl}=yd,Cl=i=>i.strings===void 0,ya=()=>document.createComment(""),es=(i,t,e)=>{var s;const n=i._$AA.parentNode,a=t===void 0?i._$AB:t._$AA;if(e===void 0){const r=n.insertBefore(ya(),a),o=n.insertBefore(ya(),a);e=new kl(r,o,i,i.options)}else{const r=e._$AB.nextSibling,o=e._$AM,h=o!==i;if(h){let u;(s=e._$AQ)===null||s===void 0||s.call(e,i),e._$AM=i,e._$AP!==void 0&&(u=i._$AU)!==o._$AU&&e._$AP(u)}if(r!==a||h){let u=e._$AA;for(;u!==r;){const y=u.nextSibling;n.insertBefore(u,a),u=y}}}return e},ve=(i,t,e=i)=>(i._$AI(t,e),i),jl={},Ur=(i,t=jl)=>i._$AH=t,Ol=i=>i._$AH,ji=i=>{var t;(t=i._$AP)===null||t===void 0||t.call(i,!1,!0);let e=i._$AA;const s=i._$AB.nextSibling;for(;e!==s;){const n=e.nextSibling;e.remove(),e=n}};/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const _a=(i,t,e)=>{const s=new Map;for(let n=t;n<=e;n++)s.set(i[n],n);return s},wt=Rr(class extends Fr{constructor(i){if(super(i),i.type!==ye.CHILD)throw Error("repeat() can only be used in text expressions")}ct(i,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);const n=[],a=[];let r=0;for(const o of i)n[r]=s?s(o,r):r,a[r]=e(o,r),r++;return{values:a,keys:n}}render(i,t,e){return this.ct(i,t,e).values}update(i,[t,e,s]){var n;const a=Ol(i),{values:r,keys:o}=this.ct(t,e,s);if(!Array.isArray(a))return this.ut=o,r;const h=(n=this.ut)!==null&&n!==void 0?n:this.ut=[],u=[];let y,j,E=0,O=a.length-1,R=0,H=r.length-1;for(;E<=O&&R<=H;)if(a[E]===null)E++;else if(a[O]===null)O--;else if(h[E]===o[R])u[R]=ve(a[E],r[R]),E++,R++;else if(h[O]===o[H])u[H]=ve(a[O],r[H]),O--,H--;else if(h[E]===o[H])u[H]=ve(a[E],r[H]),es(i,u[H+1],a[E]),E++,H--;else if(h[O]===o[R])u[R]=ve(a[O],r[R]),es(i,a[E],a[O]),O--,R++;else if(y===void 0&&(y=_a(o,R,H),j=_a(h,E,O)),y.has(h[E]))if(y.has(h[O])){const et=j.get(o[R]),ht=et!==void 0?a[et]:null;if(ht===null){const ft=es(i,a[E]);ve(ft,r[R]),u[R]=ft}else u[R]=ve(ht,r[R]),es(i,a[E],ht),a[et]=null;R++}else ji(a[O]),O--;else ji(a[E]),E++;for(;R<=H;){const et=es(i,u[H+1]);ve(et,r[R]),u[R++]=et}for(;E<=O;){const et=a[E++];et!==null&&ji(et)}return this.ut=o,Ur(i,u),Vt}});class xl extends B{static get properties(){return{t:{type:Object},selectedDays:{type:Array},date:{type:String,attribute:!1},datePickerOpen:{type:Boolean,attribute:!1}}}constructor(){super(),this.datePickerOpen=!1,this.toggleDatePicker=this.toggleDatePicker.bind(this)}firstUpdated(){jQuery(this.renderRoot).foundation()}connectedCallback(){super.connectedCallback(),this.renderDate=this.renderDate.bind(this)}addDate(){this.date&&this.dispatchEvent(new CustomEvent("day-added",{detail:{date:this.date}}))}removeDate(t){this.dispatchEvent(new CustomEvent("day-removed",{detail:{id:t}}))}renderDate({date:t,id:e},s){return l`
            <li>
                <div class="d-flex align-items-center justify-content-between">
                    <span class="mx-0">${M.fromISO(t).toFormat("DDDD")}</span>
                    <button class="close-btn" @click=${()=>this.removeDate(e)}>
                        <span class="icon z-icon-close"></span>
                    </button>
                </div>
            </li>
        `}sortDays(t,e){return t.date===e.date?0:t.date<e.date?-1:1}toggleDatePicker(t){t.preventDefault(),this.datePickerOpen=!this.datePickerOpen}setDate(t){const{date:e}=t.detail;this.date=e}clearDate(){this.date=""}render(){return l`
            <div class="stack">
                <ol class="stack">
                ${this.selectedDays.length===0?l`
                        <span>${this.t.no_days_selected}</span>
                    `:l`
                        ${wt(this.selectedDays.sort(this.sortDays),t=>t.id,this.renderDate)}
                    `}
                </ol>

                <div class="cluster align-items-center gap-0 mx-auto">
                    <div class="mx-auto">${this.date?M.fromISO(this.date).toFormat("DDDD"):""}</div>
                    <div class="cluster mx-auto">
                        <button
                            data-toggle="date-picker"
                            class="icon-btn brand-light f-3 gap--3"
                            aria-pressed=${this.datePickerOpen?"true":"false"}
                            @click=${this.toggleDatePicker}
                        >
                            <span class="icon z-icon-start-date"></span>
                            <img
                                class="chevron | svg w-1rem h-1rem ${this.datePickerOpen?"rotate-180":"foobar"}"
                                src=${jsObject.images_url+"/chevron.svg"}
                            />
                        </button>
                        <button class="btn tight" @click=${this.addDate}>
                            ${this.t.add}
                        </button>
                    </div>
                </div>
                <div
                    class="dropdown-pane zume-date-picker"
                    id="date-picker"
                    data-dropdown
                    data-close-on-click="true"
                    data-position="bottom"
                    data-alignment="center"
                >
                    <calendar-select
                        style='--primary-color: var(--z-brand-light); --hover-color: var(--z-brand-fade)'
                        showToday
                        showTodayButton
                        showClearButton
                        .translations=${{clear:this.t.clear,today:this.t.today}}
                        .selectedDays=${this.date?[{date:this.date}]:[]}
                        @day-added=${this.setDate}
                        @clear=${this.clearDate}
                    ></calendar-select>
                </div>
            </div>
        `}}customElements.define("calendar-list",xl);class qr extends B{static get properties(){return{size:{type:String,attribute:!1}}}constructor(){super();const t=16;this.minSize=3*t,this.percentage=15/100,this.maxSize=8*this.minSize,this.size=this.maxSize,this.widthObserver=this.widthObserver.bind(this)}firstUpdated(){this.resizeObserver=new ResizeObserver(this.widthObserver),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.disconnect()}widthObserver(t){for(const e of t)e.contentBoxSize&&(this.size=e.contentBoxSize[0].inlineSize*this.percentage,this.size<this.minSize&&(this.size=this.minSize),this.size>this.maxSize&&(this.size=this.maxSize))}render(){return l`
            <div class="container" style="--play-button-size: ${this.size}px">
                <div class="circle">
                    <div class="triangle"></div>
                </div>
            </div>
        `}}X(qr,"styles",Vi`
        :host {
            --play-button-size: 3rem;
            --play-button-color: red;
            --play-button-hover-color: darkred;
            --play-button-highlight: white;

            width: 100%;
            height: 100%;
        }

        :host(:hover) .circle {
            transform: scale(1.1);
            background-color: var(--play-button-hover-color);
        }

        .container {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .circle {
            width: var(--play-button-size);
            height: var(--play-button-size);
            border-radius: 50%;
            background-color: var(--play-button-color);
            box-shadow: var(--play-button-shadow);

            display: flex;
            align-items: center;
            justify-content: center;

            transition: all 100ms linear;
        }

        .triangle {
          width: 0;
          height: 0;
          border-top: calc(var(--play-button-size) / 4.5) solid transparent;
          border-left: calc(var(--play-button-size) / 2.5) solid var(--play-button-highlight);
          border-bottom: calc(var(--play-button-size) / 4.5) solid transparent;
          margin-left: calc(var(--play-button-size) / 10);
        }
    `);window.customElements.define("play-button",qr);class El extends B{constructor(){super();X(this,"webShareSupported",!!window.navigator.share);X(this,"clipboardSupported",!!window.navigator.clipboard);this.shareFeedback="",this.copyFeedback=""}static get properties(){return{url:{type:String},title:{type:String},t:{type:Object},alwaysShow:{type:Boolean},shareFeedback:{attribute:!1},copyFeedback:{attribute:!1}}}share(e){e.stopImmediatePropagation(),navigator.share({title:this.title,url:this.url,text:this.title}).then(()=>{this.shareFeedback=this.t.share_feedback,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(s=>console.error("Error sharing",s))}copyLink(e){e.stopImmediatePropagation(),navigator.clipboard.writeText(this.url).then(()=>{this.copyFeedback=this.t.copy_feedback,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(s=>console.error(s))}noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported}render(){return l`
            <div id="share" tabindex="-1" class="stack--2">
              ${this.noOptionsAvailable()?l`
                  <div class="stack--2">
                    <p>${this.t.copy_and_share_text}</p>
                    <p><code>${this.url}</code></p>
                  </div>
              `:l`
                  <div class="stack--1">
                    ${this.webShareSupported?l`
                        <div class="position-relative">
                          <button class="btn" @click=${this.share}>
                            <!-- Share icon -->
                            <span>${this.t.share}</span>
                          </button>
                          <p role="alert" aria-live="polite" id="shareFeedback" class="context-alert" data-state=${this.shareFeedback.length?"":"empty"}>${this.shareFeedback}</p>
                        </div>
                    `:""}
                    ${!this.webShareSupported&&this.clipboardSupported?l`
                        <div class="stack--2">
                          ${this.alwaysShow?l`<p><code>${this.url}</code></p>`:""}
                          <div class="position-relative">
                            <button class="btn fit-content mx-auto" @click=${this.copyLink}>
                              <!-- Link icon -->
                              <span>${this.t.copy_link}</span>
                            </button>
                            <p role="alert" aria-live="polite" id="copyFeedback" class="context-alert" data-state=${this.copyFeedback.length?"":"empty"}>${this.copyFeedback}</p>
                          </div>
                        </div>
                    `:""}
                  </div>
              `}


            </div>
        `}createRenderRoot(){return this}}customElements.define("share-links",El);class Tl extends B{constructor(){super();X(this,"sortAlphabetically",(e,s)=>e.page_title<s.page_title?-1:1);X(this,"sortByKey",(e,s)=>Number(e.key)<Number(s.key)?-1:1);this.items=[],this.itemsToDisplay=[],this.filterStatus="all"}static get properties(){return{items:{type:Array},itemsToDisplay:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1},isSortedAlphabetically:{type:Boolean,attribute:!1}}}connectedCallback(){super.connectedCallback(),this.itemsToDisplay=[...this.items]}filterItems(e){this.filterStatus=e,this.itemsToDisplay=this.sortItems(this.items.filter(({type:s})=>e==="all"?!0:s===e))}toggleSorting(){this.isSortedAlphabetically=!this.isSortedAlphabetically,this.itemsToDisplay=this.sortItems(this.itemsToDisplay)}sortItems(e){return e.sort((s,n)=>this.isSortedAlphabetically?this.sortAlphabetically(s,n):this.sortByKey(s,n))}renderListItem({page_url:e,page_title:s,type:n,description:a}){return l`
            <li class="share-cards" data-type=${n}>
                <div class="share card">
                    <div class="switcher | switcher-width-25 align-items-center gapx--4">
                        <div class="stack grow-2">
                            <a class="f-1 bold" href=${e}>
                                ${s}
                            </a>
                            <p class="f--1 show-for-large">
                                ${a}
                            </p>
                        </div>
                        <div class="fit-content ms-auto">
                            <share-links
                                url=${e}
                                title=${s}
                                .t=${zumeShare.translations}>
                            </share-links>
                        </div>
                    </div>
                </div>
            </li>
        `}render(){return l`
            <div class="container-xsm">
                <div class="filter-area d-flex align-items-center justify-flex-end">
                    <span class="f--1 gray-700 lh-sm">${zumeShare.translations.items}: ${this.itemsToDisplay.length}</span>
                    <button
                        class="icon-btn f-2 ${this.isSortedAlphabetically?"bg-gray-300":""}"
                        @click=${this.toggleSorting}
                    >
                        <span class="visually-hidden">${zumeShare.translations.sort}</span>
                        <svg class="w-2rem brand-light" focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12.93 2.65c-.2-.2-.51-.2-.71 0l-2.01 2.01h4.72zm-.7 18.7c.2.2.51.2.71 0l1.98-1.98h-4.66zm-1.25-3.62c.6 0 1.01-.6.79-1.16L8.04 7.03c-.18-.46-.63-.76-1.12-.76-.49 0-.94.3-1.12.76l-3.74 9.53c-.22.56.19 1.16.79 1.16.35 0 .67-.22.8-.55l.71-1.9h5.11l.71 1.9c.13.34.45.56.8.56m-6.01-4.09 1.94-5.18 1.94 5.18zm16.08 2.5h-5.33l5.72-8.29c.46-.66-.02-1.57-.82-1.57h-6.48c-.44 0-.79.36-.79.8v.01c0 .44.36.8.79.8h5.09l-5.73 8.28c-.46.66.02 1.57.82 1.57h6.72c.44 0 .79-.36.79-.79.02-.45-.34-.81-.78-.81"></path></svg>
                    </button>
                    <button class="icon-btn f-2 filter-btn" data-toggle="filter-menu">
                        <span class="visually-hidden">${zumeShare.translations.filter}</span>
                        <span class="icon z-icon-filter brand-light" aria-hidden="true"></span>
                        ${this.filterStatus&&this.filterStatus!=="all"?l`
                                <span class="filter-dot"></span>
                            `:""}
                    </button>
                </div>
                <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment="center" data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li>
                            <button
                                class="menu-btn w-100 filter-button ${this.filterStatus==="all"?"selected":""}"
                                @click=${()=>this.filterItems("all")}
                            >
                                ${zumeShare.translations.all}
                            </button>
                            <button
                                class="menu-btn w-100 filter-button ${this.filterStatus==="tool"?"selected":""}"
                                @click=${()=>this.filterItems("tool")}
                            >
                                ${zumeShare.translations.tools}
                            </button>
                            <button
                                class="menu-btn w-100 filter-button ${this.filterStatus==="concept"?"selected":""}"
                                @click=${()=>this.filterItems("concept")}
                            >
                                ${zumeShare.translations.concepts}
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="share-list__wrapper">
                    <ul class="stack  | mt-0">
                        ${wt(this.itemsToDisplay,e=>e.key,this.renderListItem)}
                    </ul>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("share-list",Tl);class Ml extends B{static get properties(){return{t:{type:Object},joinLink:{type:String},notifyUrl:{type:String},notifyMeOpen:{type:Boolean,attribute:!1},loading:{attribute:!1},plans:{attribute:!1}}}constructor(){super(),this.loading=!0,this.plans=[],this.notifyUrl="",this.notifyMeOpen=!1,this.getTrainings(),this.renderRow=this.renderRow.bind(this)}updated(t){t.has("loading")&&(ke(this.renderRoot),Tt(this.renderRoot,"public-trainings"))}getTrainings(){F.post("public_plans",{}).then(t=>{this.plans=t}).catch(t=>{console.log(t)}).finally(()=>{this.loading=!1})}_handleNotifyMe(){this.notifyMeOpen=!this.notifyMeOpen}render(){return this.loading?l`<span class="loading-spinner active"></span>`:this.plans.length===0?l` <p>${this.t.no_plans}</p> `:l`
            <table>
                <thead>
                    <tr>
                        <td>${this.t.name}</td>
                        <td>${this.t.session}</td>
                        <td>${this.t.next_date}</td>
                        <td>${this.t.start_time}</td>
                        <td>${this.t.timezone}</td>
                        <td>${this.t.language}</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    ${this.plans.map(this.renderRow)}
                </tbody>
            </table>
            <button class="btn" @click=${this._handleNotifyMe}>
                ${this.t.notify_of_future_trainings_button}
            </button>
            <div class="zume-collapse" ?data-expand=${this.notifyMeOpen}>
                <h3>${this.t.notify_of_future_trainings_title}</h3>
                <p>${this.t.notify_of_future_trainings_description}</p>
                <p>${this.t.notify_of_future_trainings_unsubscribe}</p>
                <a
                    href=${this.notifyUrl}
                    class="btn large uppercase fit-content mx-auto"
                >
                    ${this.t.notify_me}
                </a>
            </div>
        `}renderRow({join_key:t,language_note:e,post_title:s,time_of_day_note:n,time_of_day:a,next_session_date:r,current_session:o,total_sessions:h,timezone_note:u}){return l`
            <tr>
                <td data-label="${this.t.name}">${s}</td>
                <td data-label="${this.t.session}">
                    ${o} / ${h}
                </td>
                <td data-label="${this.t.next_date}">${r}</td>
                <td data-label="${this.t.start_time}">${a||n}</td>
                <td data-label="${this.t.timezone}">${u}</td>
                <td data-label="${this.t.language}">${e}</td>
                <td>
                    <button
                        class="btn"
                        data-code=${t}
                        @click=${this._handleJoinTraining}
                    >
                        ${this.t.join}
                    </button>
                </td>
            </tr>
        `}_handleJoinTraining(t){const e=t.target.dataset.code,s=this.plans.find(a=>a.join_key===e),n=new CustomEvent("chosen-training",{bubbles:!0,detail:{code:e,training:s}});this.dispatchEvent(n)}createRenderRoot(){return this}}customElements.define("public-trainings",Ml);class Br extends B{static get properties(){return{radius:{type:Number},lineWidth:{type:Number},percent:{type:Number}}}constructor(){super(),this.radius=100,this.lineWidth=10,this.percent=30}width(){return this.radius*2+this.lineWidth}widthPx(){return this.appendPx(this.width())}center(){return this.width()/2}circumference(){return this.radius*2*Math.PI}circumferencePx(){return this.appendPx(this.circumference())}appendPx(t){return`${t}px`}rotate(t){return`rotate(${t}, ${this.center()}, ${this.center()})`}render(){return l`
            <div
                class="progress-circle"
                style="--percent: ${this.percent}; --width: ${this.widthPx()}; --circ: ${this.circumferencePx()}"
            >
                <svg class="svg-wrapper">
                    <circle
                        cx="${this.center()}"
                        cy="${this.center()}"
                        r="${this.radius}"
                    >
                    </circle>
                    <circle
                        class="bar"
                        cx="${this.center()}"
                        cy="${this.center()}"
                        r="${this.radius}"
                        transform="${this.rotate(-90)}"
                    >
                    </circle>
                </svg>
            </div>
        `}createRenderRoot(){return this}}customElements.define("progress-circle",Br);class Il extends Br{static get properties(){return{percent:{type:Number},type:{type:String}}}constructor(){super(),this.radius=50,this.lineWidth=15,this.percent=0,this.borderWidth=3,this.type="heard"}width(){return(this.radius+this.lineWidth)*2}getIconSvg(){switch(this.type){case"heard":return js`
                    <path d="M13.204,14.843c.157-3.465,2.622-6.151,6.05-6.593,3.602-.464,7.067,2.224,7.528,5.84.019.151.028.303.051.453.084.543.565.919,1.079.849.531-.073.901-.535.85-1.079-.09-.964-.299-1.902-.71-2.782-1.357-2.904-3.602-4.681-6.783-5.149-4.548-.67-8.841,2.255-9.775,6.729-.695,3.33-.03,6.397,2.327,8.963.781.85,1.668,1.601,2.472,2.43.534.551,1.049,1.131,1.495,1.754.496.692.669,1.505.631,2.364-.121,2.78,2.078,5.075,4.868,5.091,2.087.012,4.017-1.407,4.624-3.399.169-.553-.083-1.062-.614-1.24-.505-.169-1.018.085-1.21.625-.375,1.054-1.082,1.745-2.179,2.001-1.829.426-3.631-1.042-3.551-2.908.071-1.673-.427-3.158-1.526-4.394-.867-.975-1.835-1.861-2.774-2.772-1.174-1.139-2.156-2.394-2.584-4.011-.24-.909-.31-1.835-.271-2.771Z" stroke-width="0"></path>
                    <path d="M22.416,16.825c-1.639.344-2.761,1.916-2.613,3.472.179,1.88,1.39,3.263,3.162,3.601.237.045.486.086.722.059.502-.056.865-.512.837-.996-.029-.509-.412-.882-.953-.927-.921-.078-1.624-.699-1.795-1.587-.226-1.172.702-1.837,1.898-1.848.737-.007,1.224-.331,1.128-1.091-.055-.433-.488-1.081-2.385-.684Z" stroke-width="0"></path>
                `;case"obeyed":return js`
                    <path d="M21.57,18.138c-.204,1.02-.396,1.984-.589,2.948-.06.299-.116.599-.179.898-.012.057-.047.109-.087.195.117.163.256.361.4.556.397.536.795,1.072,1.194,1.606.743.993,1.239,2.082,1.465,3.316.261,1.422.608,2.829.922,4.241.183.825-.274,1.597-1.058,1.778-.783.18-1.554-.308-1.742-1.125-.279-1.212-.56-2.424-.804-3.643-.204-1.021-.594-1.958-1.176-2.812-.781-1.144-1.585-2.272-2.374-3.411-.254-.367-.481-.753-.74-1.117-.501-.703-.591-1.47-.421-2.296.247-1.201.478-2.406.716-3.609.003-.016.003-.033.006-.074-.05.04-.089.066-.123.097-.598.545-1.197,1.088-1.789,1.639-.062.057-.11.158-.115.242-.087,1.326-.165,2.653-.248,3.979-.041.641-.554,1.087-1.186,1.04-.6-.045-1.035-.574-.995-1.196.09-1.411.176-2.822.261-4.233.03-.498.222-.916.592-1.253,1.221-1.112,2.44-2.226,3.66-3.339.129-.118.246-.252.385-.356.381-.287.817-.384,1.283-.297.717.134,1.431.278,2.145.426.596.124,1.038.46,1.25,1.033.148.401.244.822.346,1.239.243.995.654,1.924,1.094,2.842.143.297.376.491.691.613.959.373,1.91.764,2.864,1.149.068.027.136.055.203.087.583.277.825.859.591,1.42-.224.536-.856.795-1.439.577-.392-.146-.777-.31-1.165-.465-.829-.332-1.655-.671-2.488-.994-.314-.122-.566-.312-.739-.594-.174-.284-.325-.582-.486-.874-.035-.063-.069-.126-.126-.232Z" stroke-width="0"></path>
                    <path d="M15.828,22.191c.259.402.497.772.735,1.142.48.747.962,1.492,1.437,2.242.041.065.066.158.057.233-.038.303-.09.604-.143.904-.098.559-.309,1.069-.618,1.547-.923,1.43-1.831,2.869-2.752,4.3-.552.858-1.767.912-2.364.114-.368-.492-.375-1.17-.015-1.736.694-1.093,1.366-2.201,2.093-3.272.688-1.014,1.054-2.129,1.231-3.324.098-.66.201-1.319.303-1.978.007-.044.018-.087.037-.174Z" stroke-width="0"></path>
                    <path d="M21.246,11.553c-1.455,0-2.629-1.176-2.629-2.635,0-1.455,1.178-2.631,2.634-2.631,1.456,0,2.636,1.174,2.64,2.628.004,1.46-1.176,2.637-2.645,2.638Z" stroke-width="0"></path>
                `;case"shared":return js`
                    <path d="M12.845,18.138c-.204,1.02-.396,1.984-.589,2.948-.06.299-.116.599-.179.898-.012.057-.047.109-.087.195.117.163.256.361.4.556.397.536.795,1.072,1.194,1.606.743.993,1.239,2.082,1.465,3.316.261,1.422.608,2.829.922,4.241.183.825-.274,1.597-1.058,1.778-.783.18-1.554-.308-1.742-1.125-.279-1.212-.56-2.424-.804-3.643-.204-1.021-.594-1.958-1.176-2.812-.781-1.144-1.585-2.272-2.374-3.411-.254-.367-.481-.753-.74-1.117-.501-.703-.591-1.47-.421-2.296.247-1.201.478-2.406.716-3.609.003-.016.003-.033.006-.074-.05.04-.089.066-.123.097-.598.545-1.197,1.088-1.789,1.639-.062.057-.11.158-.115.242-.087,1.326-.165,2.653-.248,3.979-.041.641-.554,1.087-1.186,1.04-.6-.045-1.035-.574-.995-1.196.09-1.411.176-2.822.261-4.233.03-.498.222-.916.592-1.253,1.221-1.112,2.44-2.226,3.66-3.339.129-.118.246-.252.385-.356.381-.287.817-.384,1.283-.297.717.134,1.431.278,2.145.426.596.124,1.038.46,1.25,1.033.148.401.244.822.346,1.239.243.995.654,1.924,1.094,2.842.143.297.376.491.691.613.959.373,1.91.764,2.864,1.149.068.027.136.055.203.087.583.277.825.859.591,1.42-.224.536-.856.795-1.439.577-.392-.146-.777-.31-1.165-.465-.829-.332-1.655-.671-2.488-.994-.314-.122-.566-.312-.739-.594-.174-.284-.325-.582-.486-.874-.035-.063-.069-.126-.126-.232Z" stroke-width="0"></path>
                    <path d="M7.102,22.191c.259.402.497.772.735,1.142.48.747.962,1.492,1.437,2.242.041.065.066.158.057.233-.038.303-.09.604-.143.904-.098.559-.309,1.069-.618,1.547-.923,1.43-1.831,2.869-2.752,4.3-.552.858-1.767.912-2.364.114-.368-.492-.375-1.17-.015-1.736.694-1.093,1.366-2.201,2.093-3.272.688-1.014,1.054-2.129,1.231-3.324.098-.66.201-1.319.303-1.978.007-.044.018-.087.037-.174Z" stroke-width="0"></path>
                    <path d="M12.521,11.553c-1.455,0-2.629-1.176-2.629-2.635,0-1.455,1.178-2.631,2.634-2.631,1.456,0,2.636,1.174,2.64,2.628.004,1.46-1.176,2.637-2.645,2.638Z" stroke-width="0"></path>
                    <path d="M27.155,18.138c.204,1.02.396,1.984.589,2.948.06.299.116.599.179.898.012.057.047.109.087.195-.117.163-.256.361-.4.556-.397.536-.795,1.072-1.194,1.606-.743.993-1.239,2.082-1.465,3.316-.261,1.422-.608,2.829-.922,4.241-.183.825.274,1.597,1.058,1.778.783.18,1.554-.308,1.742-1.125.279-1.212.56-2.424.804-3.643.204-1.021.594-1.958,1.176-2.812.781-1.144,1.585-2.272,2.374-3.411.254-.367.481-.753.74-1.117.501-.703.591-1.47.421-2.296-.247-1.201-.478-2.406-.716-3.609-.003-.016-.003-.033-.006-.074.05.04.089.066.123.097.598.545,1.197,1.088,1.789,1.639.062.057.11.158.115.242.087,1.326.165,2.653.248,3.979.041.641.554,1.087,1.186,1.04.6-.045,1.035-.574.995-1.196-.09-1.411-.176-2.822-.261-4.233-.03-.498-.222-.916-.592-1.253-1.221-1.112-2.44-2.226-3.66-3.339-.129-.118-.246-.252-.385-.356-.381-.287-.817-.384-1.283-.297-.717.134-1.431.278-2.145.426-.596.124-1.038.46-1.25,1.033-.148.401-.244.822-.346,1.239-.243.995-.654,1.924-1.094,2.842-.143.297-.376.491-.691.613-.959.373-1.91.764-2.864,1.149-.068.027-.136.055-.203.087-.583.277-.825.859-.591,1.42.224.536.856.795,1.439.577.392-.146.777-.31,1.165-.465.829-.332,1.655-.671,2.488-.994.314-.122.566-.312.739-.594.174-.284.325-.582.486-.874.035-.063.069-.126.126-.232Z" stroke-width="0"></path>
                    <path d="M32.898,22.191c-.259.402-.497.772-.735,1.142-.48.747-.962,1.492-1.437,2.242-.041.065-.066.158-.057.233.038.303.09.604.143.904.098.559.309,1.069.618,1.547.923,1.43,1.831,2.869,2.752,4.3.552.858,1.767.912,2.364.114.368-.492.375-1.17.015-1.736-.694-1.093-1.366-2.201-2.093-3.272-.688-1.014-1.054-2.129-1.231-3.324-.098-.66-.201-1.319-.303-1.978-.007-.044-.018-.087-.037-.174Z" stroke-width="0"></path>
                    <path d="M27.479,11.553c1.455,0,2.629-1.176,2.629-2.635,0-1.455-1.178-2.631-2.634-2.631-1.456,0-2.636,1.174-2.64,2.628-.004,1.46,1.176,2.637,2.645,2.638Z" stroke-width="0"></path>
                `;case"trained":return js`
                    <path d="M21.796,16.477c-.172.859-.334,1.671-.496,2.484-.05.252-.098.505-.151.757-.01.048-.04.091-.073.164.099.137.216.304.337.468.334.452.67.903,1.006,1.354.626.837,1.044,1.754,1.235,2.794.22,1.198.513,2.383.777,3.574.154.695-.231,1.346-.892,1.498-.659.152-1.31-.259-1.468-.948-.235-1.021-.472-2.042-.677-3.069-.172-.86-.5-1.649-.991-2.369-.658-.964-1.335-1.915-2-2.874-.214-.309-.405-.635-.624-.941-.422-.592-.498-1.238-.355-1.934.208-1.012.403-2.027.603-3.041.003-.014.003-.028.005-.063-.043.033-.075.056-.103.082-.504.459-1.009.917-1.508,1.381-.052.048-.092.133-.097.204-.074,1.117-.139,2.235-.209,3.353-.034.54-.467.916-.999.876-.506-.038-.872-.483-.838-1.008.076-1.189.148-2.378.22-3.567.025-.42.187-.772.499-1.056,1.029-.937,2.056-1.875,3.084-2.814.109-.099.207-.212.325-.3.321-.242.688-.324,1.081-.25.604.113,1.206.234,1.808.359.502.104.874.388,1.053.871.125.338.206.693.291,1.044.205.838.551,1.621.922,2.395.12.25.317.414.582.517.808.314,1.609.644,2.413.968.057.023.115.047.171.073.491.233.695.724.498,1.196-.188.452-.722.669-1.213.486-.33-.123-.655-.261-.982-.392-.698-.28-1.395-.565-2.096-.837-.265-.103-.477-.263-.623-.501-.147-.239-.274-.49-.409-.736-.029-.053-.058-.106-.107-.195Z" stroke-width="0"></path>
                    <path d="M16.958,19.892c.218.339.419.65.619.962.404.629.81,1.258,1.211,1.889.035.055.056.133.048.196-.032.255-.076.509-.12.762-.083.471-.261.901-.521,1.304-.778,1.205-1.543,2.417-2.319,3.623-.465.723-1.489.769-1.992.096-.31-.414-.316-.986-.013-1.462.585-.921,1.151-1.855,1.763-2.757.579-.854.888-1.794,1.037-2.8.082-.556.169-1.111.255-1.667.006-.037.016-.073.031-.147Z" stroke-width="0"></path>
                    <path d="M21.524,10.929c-1.226,0-2.215-.991-2.215-2.22,0-1.226.992-2.217,2.219-2.217,1.227,0,2.221.99,2.224,2.215.003,1.23-.991,2.222-2.229,2.222Z" stroke-width="0"></path>
                    <path d="M10.472,22.851c-.139.698-.271,1.357-.403,2.017-.041.205-.079.41-.122.614-.008.039-.032.074-.059.133.08.112.175.247.274.38.272.367.544.734.817,1.099.508.68.848,1.425,1.003,2.269.178.973.416,1.936.631,2.902.125.564-.187,1.093-.724,1.216-.536.123-1.063-.211-1.192-.77-.191-.829-.383-1.658-.55-2.492-.14-.699-.406-1.34-.805-1.924-.534-.783-1.084-1.555-1.624-2.334-.174-.251-.329-.515-.506-.764-.343-.481-.404-1.006-.288-1.571.169-.822.327-1.646.49-2.47.002-.011.002-.023.004-.051-.035.027-.061.045-.084.066-.409.373-.819.744-1.224,1.121-.042.039-.075.108-.079.166-.06.907-.113,1.815-.17,2.723-.028.439-.379.744-.812.711-.411-.031-.708-.393-.681-.818.062-.965.12-1.931.178-2.897.02-.341.152-.627.405-.857.835-.761,1.67-1.523,2.504-2.285.088-.081.168-.172.264-.244.261-.197.559-.263.878-.203.49.092.979.19,1.468.291.408.085.71.315.855.707.102.274.167.563.237.848.167.681.447,1.317.749,1.945.098.203.257.336.472.42.656.255,1.307.523,1.959.786.047.019.093.038.139.059.399.189.565.588.404.971-.153.367-.586.544-.985.395-.268-.1-.532-.212-.797-.318-.567-.227-1.133-.459-1.702-.68-.215-.084-.387-.214-.506-.407-.119-.194-.222-.398-.332-.598-.024-.043-.047-.086-.087-.159Z" stroke-width="0"></path>
                    <path d="M6.543,25.624c.177.275.34.528.503.782.328.511.658,1.021.983,1.534.028.044.045.108.039.159-.026.207-.062.413-.098.619-.067.382-.212.732-.423,1.059-.631.978-1.253,1.963-1.883,2.942-.378.587-1.209.624-1.618.078-.252-.336-.257-.8-.011-1.188.475-.748.935-1.506,1.432-2.239.471-.694.721-1.457.843-2.274.067-.451.138-.902.207-1.353.005-.03.013-.06.025-.119Z" stroke-width="0"></path>
                    <path d="M10.251,18.345c-.996,0-1.799-.804-1.799-1.803,0-.995.806-1.8,1.802-1.801.996,0,1.804.804,1.806,1.798.003.999-.805,1.804-1.81,1.805Z" stroke-width="0"></path>
                    <path d="M31.677,22.851c-.139.698-.271,1.357-.403,2.017-.041.205-.079.41-.122.614-.008.039-.032.074-.059.133.08.112.175.247.274.38.272.367.544.734.817,1.099.508.68.848,1.425,1.003,2.269.178.973.416,1.936.631,2.902.125.564-.187,1.093-.724,1.216-.536.123-1.063-.211-1.192-.77-.191-.829-.383-1.658-.55-2.492-.14-.699-.406-1.34-.805-1.924-.534-.783-1.084-1.555-1.624-2.334-.174-.251-.329-.515-.506-.764-.343-.481-.404-1.006-.288-1.571.169-.822.327-1.646.49-2.47.002-.011.002-.023.004-.051-.035.027-.061.045-.084.066-.409.373-.819.744-1.224,1.121-.042.039-.075.108-.079.166-.06.907-.113,1.815-.17,2.723-.028.439-.379.744-.812.711-.411-.031-.708-.393-.681-.818.062-.965.12-1.931.178-2.897.02-.341.152-.627.405-.857.835-.761,1.67-1.523,2.504-2.285.088-.081.168-.172.264-.244.261-.197.559-.263.878-.203.49.092.979.19,1.468.291.408.085.71.315.855.707.102.274.167.563.237.848.167.681.447,1.317.749,1.945.098.203.257.336.472.42.656.255,1.307.523,1.959.786.047.019.093.038.139.059.399.189.565.588.404.971-.153.367-.586.544-.985.395-.268-.1-.532-.212-.797-.318-.567-.227-1.133-.459-1.702-.68-.215-.084-.387-.214-.506-.407-.119-.194-.222-.398-.332-.598-.024-.043-.047-.086-.087-.159Z" stroke-width="0"></path>
                    <path d="M27.747,25.624c.177.275.34.528.503.782.328.511.658,1.021.983,1.534.028.044.045.108.039.159-.026.207-.062.413-.098.619-.067.382-.212.732-.423,1.059-.631.978-1.253,1.963-1.883,2.942-.378.587-1.209.624-1.618.078-.252-.336-.257-.8-.011-1.188.475-.748.935-1.506,1.432-2.239.471-.694.721-1.457.843-2.274.067-.451.138-.902.207-1.353.005-.03.013-.06.025-.119Z" stroke-width="0"></path>
                    <path d="M31.455,18.345c-.996,0-1.799-.804-1.799-1.803,0-.995.806-1.8,1.802-1.801.996,0,1.804.804,1.806,1.798.003.999-.805,1.804-1.81,1.805Z" stroke-width="0"></path>
                `}}iconSize(){return this.width()/2}iconPosition(){const t=(this.width()-this.iconSize())/2;return[t,t]}render(){const t=this.iconSize(),[e,s]=this.iconPosition();return l`
            <div
                class="progress-circle"
                style="--percent: ${this.percent}; --width: ${this.widthPx()}; --circ: ${this.circumferencePx()}; --border-width: ${this.borderWidth}"
                data-border
            >
                <svg class="svg-wrapper">
                    <circle
                        class="border"
                        cx="${this.center()}"
                        cy="${this.center()}"
                        r="${this.radius}"
                    >
                    </circle>
                    <circle
                        cx="${this.center()}"
                        cy="${this.center()}"
                        r="${this.radius}"
                    >
                    </circle>
                    <circle
                        class="bar"
                        cx="${this.center()}"
                        cy="${this.center()}"
                        r="${this.radius}"
                        transform="${this.rotate(-90)}"
                    >
                    </circle>
                    <svg
                        class="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width=${t}
                        height=${t}
                        x=${e}
                        y=${s}
                        viewBox="0 0 40 40"
                    >
                        ${this.getIconSvg()}
                    </svg>
                </svg>
            </div>
        `}createRenderRoot(){return this}}customElements.define("host-progress-circle",Il);class Vr extends B{static get properties(){return{percentage:{type:Number}}}render(){return l`
            <div class="progress-bar">
                <div class="progress-bar__slider" style="--percentage:${Number(this.percentage)>100?"100":this.percentage}%"></div>
            </div>
        `}}X(Vr,"styles",[Vi`
            :host {
                display: block;
                --ps-primary-color: var(--primary-color, #7cb8fc);
                --ps-secondary-color: var(--secondary-color, #C1C1C1);
            }
            .progress-bar {
                height: 20px;
                width: 100%;
                border-radius: 100px;
                border: none;
                background-color: var(--ps-secondary-color);
            }
            .progress-bar__slider {
                height: 100%;
                width: var(--percentage);
                border-radius: 100px;
                background-color: var(--ps-primary-color);
                transition: width 100ms linear;
            }
        `]);customElements.define("progress-slider",Vr);function Dl(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var Wr={exports:{}};(function(i){(function(t){i.exports?i.exports=t():window.intlTelInput=t()})(()=>{var t=(()=>{var e=Object.defineProperty,s=Object.getOwnPropertyDescriptor,n=Object.getOwnPropertyNames,a=Object.prototype.hasOwnProperty,r=(T,p)=>{for(var $ in p)e(T,$,{get:p[$],enumerable:!0})},o=(T,p,$,g)=>{if(p&&typeof p=="object"||typeof p=="function")for(let b of n(p))!a.call(T,b)&&b!==$&&e(T,b,{get:()=>p[b],enumerable:!(g=s(p,b))||g.enumerable});return T},h=T=>o(e({},"__esModule",{value:!0}),T),u={};r(u,{Iti:()=>Ke,default:()=>Yt});var y=[["af","93",0,null,"0"],["ax","358",1,["18","4"],"0"],["al","355",0,null,"0"],["dz","213",0,null,"0"],["as","1",5,["684"],"1"],["ad","376"],["ao","244"],["ai","1",6,["264"],"1"],["ag","1",7,["268"],"1"],["ar","54",0,null,"0"],["am","374",0,null,"0"],["aw","297"],["ac","247"],["au","61",0,["4"],"0"],["at","43",0,null,"0"],["az","994",0,null,"0"],["bs","1",8,["242"],"1"],["bh","973"],["bd","880",0,null,"0"],["bb","1",9,["246"],"1"],["by","375",0,null,"8"],["be","32",0,null,"0"],["bz","501"],["bj","229"],["bm","1",10,["441"],"1"],["bt","975"],["bo","591",0,null,"0"],["ba","387",0,null,"0"],["bw","267"],["br","55",0,null,"0"],["io","246"],["vg","1",11,["284"],"1"],["bn","673"],["bg","359",0,null,"0"],["bf","226"],["bi","257"],["kh","855",0,null,"0"],["cm","237"],["ca","1",1,["204","226","236","249","250","257","263","289","306","343","354","365","367","368","382","403","416","418","428","431","437","438","450","468","474","506","514","519","548","579","581","584","587","604","613","639","647","672","683","705","709","742","753","778","780","782","807","819","825","867","873","879","902","905","942"],"1"],["cv","238"],["bq","599",1,["3","4","7"]],["ky","1",12,["345"],"1"],["cf","236"],["td","235"],["cl","56"],["cn","86",0,null,"0"],["cx","61",2,["4","89164"],"0"],["cc","61",1,["4","89162"],"0"],["co","57",0,null,"0"],["km","269"],["cg","242"],["cd","243",0,null,"0"],["ck","682"],["cr","506"],["ci","225"],["hr","385",0,null,"0"],["cu","53",0,null,"0"],["cw","599",0],["cy","357"],["cz","420"],["dk","45"],["dj","253"],["dm","1",13,["767"],"1"],["do","1",2,["809","829","849"],"1"],["ec","593",0,null,"0"],["eg","20",0,null,"0"],["sv","503"],["gq","240"],["er","291",0,null,"0"],["ee","372"],["sz","268"],["et","251",0,null,"0"],["fk","500"],["fo","298"],["fj","679"],["fi","358",0,["4"],"0"],["fr","33",0,null,"0"],["gf","594",0,null,"0"],["pf","689"],["ga","241"],["gm","220"],["ge","995",0,null,"0"],["de","49",0,null,"0"],["gh","233",0,null,"0"],["gi","350"],["gr","30"],["gl","299"],["gd","1",14,["473"],"1"],["gp","590",0,null,"0"],["gu","1",15,["671"],"1"],["gt","502"],["gg","44",1,["1481","7781","7839","7911"],"0"],["gn","224"],["gw","245"],["gy","592"],["ht","509"],["hn","504"],["hk","852"],["hu","36",0,null,"06"],["is","354"],["in","91",0,null,"0"],["id","62",0,null,"0"],["ir","98",0,null,"0"],["iq","964",0,null,"0"],["ie","353",0,null,"0"],["im","44",2,["1624","74576","7524","7624","7924"],"0"],["il","972",0,null,"0"],["it","39",0,["3"]],["jm","1",4,["658","876"],"1"],["jp","81",0,null,"0"],["je","44",3,["1534","7509","7700","7797","7829","7937"],"0"],["jo","962",0,null,"0"],["kz","7",1,["33","7"],"8"],["ke","254",0,null,"0"],["ki","686",0,null,"0"],["xk","383",0,null,"0"],["kw","965"],["kg","996",0,null,"0"],["la","856",0,null,"0"],["lv","371"],["lb","961",0,null,"0"],["ls","266"],["lr","231",0,null,"0"],["ly","218",0,null,"0"],["li","423",0,null,"0"],["lt","370",0,null,"0"],["lu","352"],["mo","853"],["mg","261",0,null,"0"],["mw","265",0,null,"0"],["my","60",0,null,"0"],["mv","960"],["ml","223"],["mt","356"],["mh","692",0,null,"1"],["mq","596",0,null,"0"],["mr","222"],["mu","230"],["yt","262",1,["269","639"],"0"],["mx","52"],["fm","691"],["md","373",0,null,"0"],["mc","377",0,null,"0"],["mn","976",0,null,"0"],["me","382",0,null,"0"],["ms","1",16,["664"],"1"],["ma","212",0,["6","7"],"0"],["mz","258"],["mm","95",0,null,"0"],["na","264",0,null,"0"],["nr","674"],["np","977",0,null,"0"],["nl","31",0,null,"0"],["nc","687"],["nz","64",0,null,"0"],["ni","505"],["ne","227"],["ng","234",0,null,"0"],["nu","683"],["nf","672"],["kp","850",0,null,"0"],["mk","389",0,null,"0"],["mp","1",17,["670"],"1"],["no","47",0,["4","9"]],["om","968"],["pk","92",0,null,"0"],["pw","680"],["ps","970",0,null,"0"],["pa","507"],["pg","675"],["py","595",0,null,"0"],["pe","51",0,null,"0"],["ph","63",0,null,"0"],["pl","48"],["pt","351"],["pr","1",3,["787","939"],"1"],["qa","974"],["re","262",0,null,"0"],["ro","40",0,null,"0"],["ru","7",0,["33"],"8"],["rw","250",0,null,"0"],["ws","685"],["sm","378"],["st","239"],["sa","966",0,null,"0"],["sn","221"],["rs","381",0,null,"0"],["sc","248"],["sl","232",0,null,"0"],["sg","65"],["sx","1",21,["721"],"1"],["sk","421",0,null,"0"],["si","386",0,null,"0"],["sb","677"],["so","252",0,null,"0"],["za","27",0,null,"0"],["kr","82",0,null,"0"],["ss","211",0,null,"0"],["es","34"],["lk","94",0,null,"0"],["bl","590",1,null,"0"],["sh","290"],["kn","1",18,["869"],"1"],["lc","1",19,["758"],"1"],["mf","590",2,null,"0"],["pm","508",0,null,"0"],["vc","1",20,["784"],"1"],["sd","249",0,null,"0"],["sr","597"],["sj","47",1,["4","79","9"]],["se","46",0,null,"0"],["ch","41",0,null,"0"],["sy","963",0,null,"0"],["tw","886",0,null,"0"],["tj","992"],["tz","255",0,null,"0"],["th","66",0,null,"0"],["tl","670"],["tg","228"],["tk","690"],["to","676"],["tt","1",22,["868"],"1"],["tn","216"],["tr","90",0,null,"0"],["tm","993",0,null,"8"],["tc","1",23,["649"],"1"],["tv","688"],["vi","1",24,["340"],"1"],["ug","256",0,null,"0"],["ua","380",0,null,"0"],["ae","971",0,null,"0"],["gb","44",0,null,"0"],["us","1",0,null,"1"],["uy","598",0,null,"0"],["uz","998"],["vu","678"],["va","39",1,["06698","3"]],["ve","58",0,null,"0"],["vn","84",0,null,"0"],["wf","681"],["eh","212",1,["5288","5289","6","7"],"0"],["ye","967",0,null,"0"],["zm","260",0,null,"0"],["zw","263",0,null,"0"]],j=[];for(const T of y)j.push({name:"",iso2:T[0],dialCode:T[1],priority:T[2]||0,areaCodes:T[3]||null,nodeById:{},nationalPrefix:T[4]||null});var E=j,O={ad:"Andorra",ae:"United Arab Emirates",af:"Afghanistan",ag:"Antigua & Barbuda",ai:"Anguilla",al:"Albania",am:"Armenia",ao:"Angola",ar:"Argentina",as:"American Samoa",at:"Austria",au:"Australia",aw:"Aruba",ax:"Åland Islands",az:"Azerbaijan",ba:"Bosnia & Herzegovina",bb:"Barbados",bd:"Bangladesh",be:"Belgium",bf:"Burkina Faso",bg:"Bulgaria",bh:"Bahrain",bi:"Burundi",bj:"Benin",bl:"St. Barthélemy",bm:"Bermuda",bn:"Brunei",bo:"Bolivia",bq:"Caribbean Netherlands",br:"Brazil",bs:"Bahamas",bt:"Bhutan",bw:"Botswana",by:"Belarus",bz:"Belize",ca:"Canada",cc:"Cocos (Keeling) Islands",cd:"Congo - Kinshasa",cf:"Central African Republic",cg:"Congo - Brazzaville",ch:"Switzerland",ci:"Côte d’Ivoire",ck:"Cook Islands",cl:"Chile",cm:"Cameroon",cn:"China",co:"Colombia",cr:"Costa Rica",cu:"Cuba",cv:"Cape Verde",cw:"Curaçao",cx:"Christmas Island",cy:"Cyprus",cz:"Czechia",de:"Germany",dj:"Djibouti",dk:"Denmark",dm:"Dominica",do:"Dominican Republic",dz:"Algeria",ec:"Ecuador",ee:"Estonia",eg:"Egypt",eh:"Western Sahara",er:"Eritrea",es:"Spain",et:"Ethiopia",fi:"Finland",fj:"Fiji",fk:"Falkland Islands",fm:"Micronesia",fo:"Faroe Islands",fr:"France",ga:"Gabon",gb:"United Kingdom",gd:"Grenada",ge:"Georgia",gf:"French Guiana",gg:"Guernsey",gh:"Ghana",gi:"Gibraltar",gl:"Greenland",gm:"Gambia",gn:"Guinea",gp:"Guadeloupe",gq:"Equatorial Guinea",gr:"Greece",gt:"Guatemala",gu:"Guam",gw:"Guinea-Bissau",gy:"Guyana",hk:"Hong Kong SAR China",hn:"Honduras",hr:"Croatia",ht:"Haiti",hu:"Hungary",id:"Indonesia",ie:"Ireland",il:"Israel",im:"Isle of Man",in:"India",io:"British Indian Ocean Territory",iq:"Iraq",ir:"Iran",is:"Iceland",it:"Italy",je:"Jersey",jm:"Jamaica",jo:"Jordan",jp:"Japan",ke:"Kenya",kg:"Kyrgyzstan",kh:"Cambodia",ki:"Kiribati",km:"Comoros",kn:"St. Kitts & Nevis",kp:"North Korea",kr:"South Korea",kw:"Kuwait",ky:"Cayman Islands",kz:"Kazakhstan",la:"Laos",lb:"Lebanon",lc:"St. Lucia",li:"Liechtenstein",lk:"Sri Lanka",lr:"Liberia",ls:"Lesotho",lt:"Lithuania",lu:"Luxembourg",lv:"Latvia",ly:"Libya",ma:"Morocco",mc:"Monaco",md:"Moldova",me:"Montenegro",mf:"St. Martin",mg:"Madagascar",mh:"Marshall Islands",mk:"North Macedonia",ml:"Mali",mm:"Myanmar (Burma)",mn:"Mongolia",mo:"Macao SAR China",mp:"Northern Mariana Islands",mq:"Martinique",mr:"Mauritania",ms:"Montserrat",mt:"Malta",mu:"Mauritius",mv:"Maldives",mw:"Malawi",mx:"Mexico",my:"Malaysia",mz:"Mozambique",na:"Namibia",nc:"New Caledonia",ne:"Niger",nf:"Norfolk Island",ng:"Nigeria",ni:"Nicaragua",nl:"Netherlands",no:"Norway",np:"Nepal",nr:"Nauru",nu:"Niue",nz:"New Zealand",om:"Oman",pa:"Panama",pe:"Peru",pf:"French Polynesia",pg:"Papua New Guinea",ph:"Philippines",pk:"Pakistan",pl:"Poland",pm:"St. Pierre & Miquelon",pr:"Puerto Rico",ps:"Palestinian Territories",pt:"Portugal",pw:"Palau",py:"Paraguay",qa:"Qatar",re:"Réunion",ro:"Romania",rs:"Serbia",ru:"Russia",rw:"Rwanda",sa:"Saudi Arabia",sb:"Solomon Islands",sc:"Seychelles",sd:"Sudan",se:"Sweden",sg:"Singapore",sh:"St. Helena",si:"Slovenia",sj:"Svalbard & Jan Mayen",sk:"Slovakia",sl:"Sierra Leone",sm:"San Marino",sn:"Senegal",so:"Somalia",sr:"Suriname",ss:"South Sudan",st:"São Tomé & Príncipe",sv:"El Salvador",sx:"Sint Maarten",sy:"Syria",sz:"Eswatini",tc:"Turks & Caicos Islands",td:"Chad",tg:"Togo",th:"Thailand",tj:"Tajikistan",tk:"Tokelau",tl:"Timor-Leste",tm:"Turkmenistan",tn:"Tunisia",to:"Tonga",tr:"Turkey",tt:"Trinidad & Tobago",tv:"Tuvalu",tw:"Taiwan",tz:"Tanzania",ua:"Ukraine",ug:"Uganda",us:"United States",uy:"Uruguay",uz:"Uzbekistan",va:"Vatican City",vc:"St. Vincent & Grenadines",ve:"Venezuela",vg:"British Virgin Islands",vi:"U.S. Virgin Islands",vn:"Vietnam",vu:"Vanuatu",wf:"Wallis & Futuna",ws:"Samoa",ye:"Yemen",yt:"Mayotte",za:"South Africa",zm:"Zambia",zw:"Zimbabwe"},R=O,H={selectedCountryAriaLabel:"Change country, selected ${countryName} (${dialCode})",noCountrySelected:"Select country",countryListAriaLabel:"List of countries",searchPlaceholder:"Search",clearSearchAriaLabel:"Clear search",zeroSearchResults:"No results found",oneSearchResult:"1 result found",multipleSearchResults:"${count} results found",ac:"Ascension Island",xk:"Kosovo"},et=H,ht={...R,...et},ft=ht,Ct=T=>typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia(T).matches,zt=()=>{if(typeof navigator<"u"&&typeof window<"u"){const T=/Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),p=Ct("(max-width: 500px)"),$=Ct("(max-height: 600px)"),g=Ct("(pointer: coarse)");return T||p||g&&$}return!1},Gt={allowPhonewords:!1,allowDropdown:!0,autoPlaceholder:"polite",containerClass:"",countryOrder:null,countrySearch:!0,customPlaceholder:null,dropdownContainer:null,excludeCountries:[],fixDropdownWidth:!0,formatAsYouType:!0,formatOnDisplay:!0,geoIpLookup:null,hiddenInput:null,i18n:{},initialCountry:"",loadUtils:null,nationalMode:!0,onlyCountries:[],placeholderNumberType:"MOBILE",showFlags:!0,separateDialCode:!1,strictMode:!1,useFullscreenPopup:zt(),validationNumberTypes:["MOBILE"]};function dt(T){T.useFullscreenPopup&&(T.fixDropdownWidth=!1),T.onlyCountries.length===1&&(T.initialCountry=T.onlyCountries[0]),T.separateDialCode&&(T.nationalMode=!1),T.allowDropdown&&!T.showFlags&&!T.separateDialCode&&(T.nationalMode=!1),T.useFullscreenPopup&&!T.dropdownContainer&&(T.dropdownContainer=document.body),T.i18n={...ft,...T.i18n}}var It=T=>T.replace(/\D/g,""),nt=(T="")=>T.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(),G=(T,p,$)=>{const g=document.createElement(T);return p&&Object.entries(p).forEach(([b,S])=>g.setAttribute(b,S)),$&&$.appendChild(g),g};function N(T){const{onlyCountries:p,excludeCountries:$}=T;if(p.length){const g=p.map(b=>b.toLowerCase());return E.filter(b=>g.includes(b.iso2))}else if($.length){const g=$.map(b=>b.toLowerCase());return E.filter(b=>!g.includes(b.iso2))}return E}function Q(T,p){for(const $ of T){const g=$.iso2.toLowerCase();p.i18n[g]&&($.name=p.i18n[g])}}function mt(T,p){const $=new Set;let g=0;const b={},S=(k,x,q)=>{if(!k||!x)return;x.length>g&&(g=x.length),b.hasOwnProperty(x)||(b[x]=[]);const P=b[x];if(P.includes(k))return;const K=q!==void 0?q:P.length;P[K]=k};for(const k of T){$.has(k.dialCode)||$.add(k.dialCode);for(let x=1;x<k.dialCode.length;x++){const q=k.dialCode.substring(0,x);S(k.iso2,q)}S(k.iso2,k.dialCode,k.priority)}(p.onlyCountries.length||p.excludeCountries.length)&&$.forEach(k=>{b[k]=b[k].filter(Boolean)});for(const k of T)if(k.areaCodes){const x=b[k.dialCode][0];for(const q of k.areaCodes){for(let P=1;P<q.length;P++){const K=q.substring(0,P),tt=k.dialCode+K;S(x,tt),S(k.iso2,tt)}S(k.iso2,k.dialCode+q)}}return{dialCodes:$,dialCodeMaxLen:g,dialCodeToIso2Map:b}}function Zt(T,p){p.countryOrder&&(p.countryOrder=p.countryOrder.map($=>$.toLowerCase())),T.sort(($,g)=>{const{countryOrder:b}=p;if(b){const S=b.indexOf($.iso2),k=b.indexOf(g.iso2),x=S>-1,q=k>-1;if(x||q)return x&&q?S-k:x?-1:1}return $.name.localeCompare(g.name)})}function ut(T){for(const p of T)p.normalisedName=nt(p.name),p.initials=p.name.split(/[^a-zA-ZÀ-ÿа-яА-Я]/).map($=>$[0]).join("").toLowerCase(),p.dialCodePlus=`+${p.dialCode}`}function bs(T,p,$,g){let b=T;if($&&p){p=`+${g.dialCode}`;const S=b[p.length]===" "||b[p.length]==="-"?p.length+1:p.length;b=b.substring(S)}return b}function xe(T,p,$,g,b){const S=$?$.formatNumberAsYouType(T,g.iso2):T,{dialCode:k}=g;return b&&p.charAt(0)!=="+"&&S.includes(`+${k}`)?(S.split(`+${k}`)[1]||"").trim():S}function Ee(T,p,$,g){if($===0&&!g)return 0;let b=0;for(let S=0;S<p.length;S++){if(/[+0-9]/.test(p[S])&&b++,b===T&&!g)return S+1;if(g&&b===T+1)return S}return p.length}var vs=["800","822","833","844","855","866","877","880","881","882","883","884","885","886","887","888","889"],Te=T=>{const p=It(T);if(p.charAt(0)==="1"){const $=p.substring(1,4);return vs.includes($)}return!1};for(const T of E)T.name=ft[T.iso2];var pe=0,lt=new Set(E.map(T=>T.iso2)),pt=T=>lt.has(T),xt=(T,...p)=>{const{instances:$}=z;Object.values($).forEach(g=>g[T](...p))},Ke=class Pi{static _buildClassNames(p){return Object.keys(p).filter($=>!!p[$]).join(" ")}constructor(p,$={}){this.id=pe++,this.telInput=p,this.highlightedItem=null,this.options=Object.assign({},Gt,$),this.hadInitialPlaceholder=!!p.getAttribute("placeholder")}_detectEnvironmentAndLayout(){this.isAndroid=typeof navigator<"u"?/Android/i.test(navigator.userAgent):!1,this.isRTL=!!this.telInput.closest("[dir=rtl]"),this.options.separateDialCode&&(this.originalPaddingLeft=this.telInput.style.paddingLeft)}_createInitPromises(){const p=new Promise((g,b)=>{this.resolveAutoCountryPromise=g,this.rejectAutoCountryPromise=b}),$=new Promise((g,b)=>{this.resolveUtilsScriptPromise=g,this.rejectUtilsScriptPromise=b});this.promise=Promise.all([p,$])}_init(){dt(this.options),this._detectEnvironmentAndLayout(),this._createInitPromises(),this.selectedCountryData={},this._processCountryData(),this._generateMarkup(),this._setInitialState(),this._initListeners(),this._initRequests()}_processCountryData(){this.countries=N(this.options);const p=mt(this.countries,this.options);this.dialCodes=p.dialCodes,this.dialCodeMaxLen=p.dialCodeMaxLen,this.dialCodeToIso2Map=p.dialCodeToIso2Map,Q(this.countries,this.options),Zt(this.countries,this.options),this.countryByIso2=new Map(this.countries.map($=>[$.iso2,$])),ut(this.countries)}_generateMarkup(){this._prepareTelInput();const p=this._createWrapperAndInsert();this._maybeBuildCountryContainer(p),p.appendChild(this.telInput),this._maybeUpdateInputPaddingAndReveal(),this._maybeBuildHiddenInputs(p)}_prepareTelInput(){this.telInput.classList.add("iti__tel-input"),!this.telInput.hasAttribute("autocomplete")&&!(this.telInput.form&&this.telInput.form.hasAttribute("autocomplete"))&&this.telInput.setAttribute("autocomplete","off")}_createWrapperAndInsert(){var p;const{allowDropdown:$,showFlags:g,containerClass:b,useFullscreenPopup:S}=this.options,k=Pi._buildClassNames({iti:!0,"iti--allow-dropdown":$,"iti--show-flags":g,"iti--inline-dropdown":!S,[b]:!!b}),x=G("div",{class:k});return this.isRTL&&x.setAttribute("dir","ltr"),(p=this.telInput.parentNode)===null||p===void 0||p.insertBefore(x,this.telInput),x}_maybeBuildCountryContainer(p){const{allowDropdown:$,separateDialCode:g,showFlags:b}=this.options;if($||b||g){this.countryContainer=G("div",{class:"iti__country-container iti__v-hide"},p),$?(this.selectedCountry=G("button",{type:"button",class:"iti__selected-country","aria-expanded":"false","aria-label":this.options.i18n.noCountrySelected,"aria-haspopup":"dialog","aria-controls":`iti-${this.id}__dropdown-content`},this.countryContainer),this.telInput.disabled&&this.selectedCountry.setAttribute("disabled","true")):this.selectedCountry=G("div",{class:"iti__selected-country"},this.countryContainer);const S=G("div",{class:"iti__selected-country-primary"},this.selectedCountry);this.selectedCountryInner=G("div",{class:"iti__flag"},S),$&&(this.dropdownArrow=G("div",{class:"iti__arrow","aria-hidden":"true"},S)),g&&(this.selectedDialCode=G("div",{class:"iti__selected-dial-code"},this.selectedCountry)),$&&this._buildDropdownContent()}}_buildDropdownContent(){const{fixDropdownWidth:p,useFullscreenPopup:$,countrySearch:g,i18n:b,dropdownContainer:S,containerClass:k}=this.options,x=p?"":"iti--flexible-dropdown-width";if(this.dropdownContent=G("div",{id:`iti-${this.id}__dropdown-content`,class:`iti__dropdown-content iti__hide ${x}`,role:"dialog","aria-modal":"true"}),this.isRTL&&this.dropdownContent.setAttribute("dir","rtl"),g&&this._buildSearchUI(),this.countryList=G("ul",{class:"iti__country-list",id:`iti-${this.id}__country-listbox`,role:"listbox","aria-label":b.countryListAriaLabel},this.dropdownContent),this._appendListItems(),g&&this._updateSearchResultsA11yText(),S){const q=Pi._buildClassNames({iti:!0,"iti--container":!0,"iti--fullscreen-popup":$,"iti--inline-dropdown":!$,[k]:!!k});this.dropdown=G("div",{class:q}),this.dropdown.appendChild(this.dropdownContent)}else this.countryContainer.appendChild(this.dropdownContent)}_buildSearchUI(){const{i18n:p}=this.options,$=G("div",{class:"iti__search-input-wrapper"},this.dropdownContent);this.searchIcon=G("span",{class:"iti__search-icon","aria-hidden":"true"},$),this.searchIcon.innerHTML=`
      <svg class="iti__search-icon-svg" width="14" height="14" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>`,this.searchInput=G("input",{id:`iti-${this.id}__search-input`,type:"search",class:"iti__search-input",placeholder:p.searchPlaceholder,role:"combobox","aria-expanded":"true","aria-label":p.searchPlaceholder,"aria-controls":`iti-${this.id}__country-listbox`,"aria-autocomplete":"list",autocomplete:"off"},$),this.searchClearButton=G("button",{type:"button",class:"iti__search-clear iti__hide","aria-label":p.clearSearchAriaLabel,tabindex:"-1"},$);const g=`iti-${this.id}-clear-mask`;this.searchClearButton.innerHTML=`
      <svg class="iti__search-clear-svg" width="12" height="12" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <mask id="${g}" maskUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="white" />
          <path d="M5.2 5.2 L10.8 10.8 M10.8 5.2 L5.2 10.8" stroke="black" stroke-linecap="round" class="iti__search-clear-x" />
        </mask>
        <circle cx="8" cy="8" r="8" class="iti__search-clear-bg" mask="url(#${g})" />
      </svg>`,this.searchResultsA11yText=G("span",{class:"iti__a11y-text"},this.dropdownContent),this.searchNoResults=G("div",{class:"iti__no-results iti__hide","aria-hidden":"true"},this.dropdownContent),this.searchNoResults.textContent=p.zeroSearchResults}_maybeUpdateInputPaddingAndReveal(){this.countryContainer&&(this._updateInputPadding(),this.countryContainer.classList.remove("iti__v-hide"))}_maybeBuildHiddenInputs(p){const{hiddenInput:$}=this.options;if($){const S=this.telInput.getAttribute("name")||"",k=$(S);if(k.phone){var g;const x=(g=this.telInput.form)===null||g===void 0?void 0:g.querySelector(`input[name="${k.phone}"]`);x?this.hiddenInput=x:(this.hiddenInput=G("input",{type:"hidden",name:k.phone}),p.appendChild(this.hiddenInput))}if(k.country){var b;const x=(b=this.telInput.form)===null||b===void 0?void 0:b.querySelector(`input[name="${k.country}"]`);x?this.hiddenInputCountry=x:(this.hiddenInputCountry=G("input",{type:"hidden",name:k.country}),p.appendChild(this.hiddenInputCountry))}}}_appendListItems(){for(let p=0;p<this.countries.length;p++){const $=this.countries[p],g=p===0?"iti__highlight":"",b=G("li",{id:`iti-${this.id}__item-${$.iso2}`,class:`iti__country ${g}`,tabindex:"-1",role:"option","data-dial-code":$.dialCode,"data-country-code":$.iso2,"aria-selected":"false"},this.countryList);$.nodeById[this.id]=b;let S="";this.options.showFlags&&(S+=`<div class='iti__flag iti__${$.iso2}'></div>`),S+=`<span class='iti__country-name'>${$.name}</span>`,S+=`<span class='iti__dial-code' dir='ltr'>+${$.dialCode}</span>`,b.insertAdjacentHTML("beforeend",S)}}_setInitialState(p=!1){const $=this.telInput.getAttribute("value"),g=this.telInput.value,S=$&&$.charAt(0)==="+"&&(!g||g.charAt(0)!=="+")?$:g,k=this._getDialCode(S),x=Te(S),{initialCountry:q,geoIpLookup:P}=this.options,K=q==="auto"&&P;if(k&&!x)this._updateCountryFromNumber(S);else if(!K||p){const tt=q?q.toLowerCase():"";pt(tt)?this._setCountry(tt):k&&x?this._setCountry("us"):this._setCountry("")}S&&this._updateValFromNumber(S)}_initListeners(){this._initTelInputListeners(),this.options.allowDropdown&&this._initDropdownListeners(),(this.hiddenInput||this.hiddenInputCountry)&&this.telInput.form&&this._initHiddenInputListener()}_initHiddenInputListener(){var p;this._handleHiddenInputSubmit=()=>{this.hiddenInput&&(this.hiddenInput.value=this.getNumber()),this.hiddenInputCountry&&(this.hiddenInputCountry.value=this.getSelectedCountryData().iso2||"")},(p=this.telInput.form)===null||p===void 0||p.addEventListener("submit",this._handleHiddenInputSubmit)}_initDropdownListeners(){this._handleLabelClick=$=>{this.dropdownContent.classList.contains("iti__hide")?this.telInput.focus():$.preventDefault()};const p=this.telInput.closest("label");p&&p.addEventListener("click",this._handleLabelClick),this._handleClickSelectedCountry=()=>{this.dropdownContent.classList.contains("iti__hide")&&!this.telInput.disabled&&!this.telInput.readOnly&&this._openDropdown()},this.selectedCountry.addEventListener("click",this._handleClickSelectedCountry),this._handleCountryContainerKeydown=$=>{this.dropdownContent.classList.contains("iti__hide")&&["ArrowUp","ArrowDown"," ","Enter"].includes($.key)&&($.preventDefault(),$.stopPropagation(),this._openDropdown()),$.key==="Tab"&&this._closeDropdown()},this.countryContainer.addEventListener("keydown",this._handleCountryContainerKeydown)}_initRequests(){let{loadUtils:p,initialCountry:$,geoIpLookup:g}=this.options;p&&!z.utils?(this._doAttachUtils=()=>{var S;(S=z.attachUtils(p))===null||S===void 0||S.catch(()=>{})},z.documentReady()?this._doAttachUtils():(this._handlePageLoad=()=>{this._doAttachUtils()},window.addEventListener("load",this._handlePageLoad))):this.resolveUtilsScriptPromise(),$==="auto"&&g&&!this.selectedCountryData.iso2?this._loadAutoCountry():this.resolveAutoCountryPromise()}_loadAutoCountry(){z.autoCountry?this.handleAutoCountry():z.startedLoadingAutoCountry||(z.startedLoadingAutoCountry=!0,typeof this.options.geoIpLookup=="function"&&this.options.geoIpLookup((p="")=>{const $=p.toLowerCase();pt($)?(z.autoCountry=$,setTimeout(()=>xt("handleAutoCountry"))):(this._setInitialState(!0),xt("rejectAutoCountryPromise"))},()=>{this._setInitialState(!0),xt("rejectAutoCountryPromise")}))}_openDropdownWithPlus(){this._openDropdown(),this.searchInput.value="+",this._filterCountries("")}_initTelInputListeners(){this._bindInputListener(),this._maybeBindKeydownListener(),this._maybeBindPasteListener()}_bindInputListener(){const{strictMode:p,formatAsYouType:$,separateDialCode:g,allowDropdown:b,countrySearch:S}=this.options;let k=!1;/\p{L}/u.test(this.telInput.value)&&(k=!0),this._handleInputEvent=x=>{if(this.isAndroid&&(x==null?void 0:x.data)==="+"&&g&&b&&S){const tt=this.telInput.selectionStart||0,Dt=this.telInput.value.substring(0,tt-1),Rt=this.telInput.value.substring(tt);this.telInput.value=Dt+Rt,this._openDropdownWithPlus();return}this._updateCountryFromNumber(this.telInput.value)&&this._triggerCountryChange();const q=(x==null?void 0:x.data)&&/[^+0-9]/.test(x.data),P=(x==null?void 0:x.inputType)==="insertFromPaste"&&this.telInput.value;q||P&&!p?k=!0:/[^+0-9]/.test(this.telInput.value)||(k=!1);const K=(x==null?void 0:x.detail)&&x.detail.isSetNumber;if($&&!k&&!K){const tt=this.telInput.selectionStart||0,Rt=this.telInput.value.substring(0,tt).replace(/[^+0-9]/g,"").length,Kt=(x==null?void 0:x.inputType)==="deleteContentForward",vt=this._getFullNumber(),jt=xe(vt,this.telInput.value,z.utils,this.selectedCountryData,this.options.separateDialCode),Qt=Ee(Rt,jt,tt,Kt);this.telInput.value=jt,this.telInput.setSelectionRange(Qt,Qt)}},this.telInput.addEventListener("input",this._handleInputEvent)}_maybeBindKeydownListener(){const{strictMode:p,separateDialCode:$,allowDropdown:g,countrySearch:b}=this.options;(p||$)&&(this._handleKeydownEvent=S=>{if(S.key&&S.key.length===1&&!S.altKey&&!S.ctrlKey&&!S.metaKey){if($&&g&&b&&S.key==="+"){S.preventDefault(),this._openDropdownWithPlus();return}if(p){const k=this.telInput.value,q=!(k.charAt(0)==="+")&&this.telInput.selectionStart===0&&S.key==="+",P=/^[0-9]$/.test(S.key),K=$?P:q||P,tt=k.slice(0,this.telInput.selectionStart)+S.key+k.slice(this.telInput.selectionEnd),Dt=this._getFullNumber(tt),Rt=z.utils.getCoreNumber(Dt,this.selectedCountryData.iso2),Kt=this.maxCoreNumberLength&&Rt.length>this.maxCoreNumberLength,jt=this._getNewCountryFromNumber(Dt)!==null;(!K||Kt&&!jt&&!q)&&S.preventDefault()}}},this.telInput.addEventListener("keydown",this._handleKeydownEvent))}_maybeBindPasteListener(){this.options.strictMode&&(this._handlePasteEvent=p=>{p.preventDefault();const $=this.telInput,g=$.selectionStart,b=$.selectionEnd,S=$.value.slice(0,g),k=$.value.slice(b),x=this.selectedCountryData.iso2,q=p.clipboardData.getData("text"),P=g===0&&b>0,K=!$.value.startsWith("+")||P,tt=q.replace(/[^0-9+]/g,""),Dt=tt.startsWith("+"),Rt=tt.replace(/\+/g,""),Kt=Dt&&K?`+${Rt}`:Rt;let vt=S+Kt+k,jt=z.utils.getCoreNumber(vt,x);for(;jt.length===0&&vt.length>0;)vt=vt.slice(0,-1),jt=z.utils.getCoreNumber(vt,x);if(!jt)return;if(this.maxCoreNumberLength&&jt.length>this.maxCoreNumberLength)if($.selectionEnd===$.value.length){const $e=jt.length-this.maxCoreNumberLength;vt=vt.slice(0,vt.length-$e)}else return;$.value=vt;const Qt=g+Kt.length;$.setSelectionRange(Qt,Qt),$.dispatchEvent(new InputEvent("input",{bubbles:!0}))},this.telInput.addEventListener("paste",this._handlePasteEvent))}_cap(p){const $=parseInt(this.telInput.getAttribute("maxlength")||"",10);return $&&p.length>$?p.substring(0,$):p}_trigger(p,$={}){const g=new CustomEvent(p,{bubbles:!0,cancelable:!0,detail:$});this.telInput.dispatchEvent(g)}_openDropdown(){const{fixDropdownWidth:p,countrySearch:$}=this.options;if(p&&(this.dropdownContent.style.width=`${this.telInput.offsetWidth}px`),this.dropdownContent.classList.remove("iti__hide"),this.selectedCountry.setAttribute("aria-expanded","true"),this._setDropdownPosition(),$){const g=this.countryList.firstElementChild;g&&(this._highlightListItem(g,!1),this.countryList.scrollTop=0),this.searchInput.focus()}this._bindDropdownListeners(),this.dropdownArrow.classList.add("iti__arrow--up"),this._trigger("open:countrydropdown")}_setDropdownPosition(){if(this.options.dropdownContainer&&this.options.dropdownContainer.appendChild(this.dropdown),!this.options.useFullscreenPopup){const p=this.telInput.getBoundingClientRect(),$=this.telInput.offsetHeight;this.options.dropdownContainer&&(this.dropdown.style.top=`${p.top+$}px`,this.dropdown.style.left=`${p.left}px`,this._handleWindowScroll=()=>this._closeDropdown(),window.addEventListener("scroll",this._handleWindowScroll))}}_bindDropdownListeners(){this._handleMouseoverCountryList=g=>{var b;const S=(b=g.target)===null||b===void 0?void 0:b.closest(".iti__country");S&&this._highlightListItem(S,!1)},this.countryList.addEventListener("mouseover",this._handleMouseoverCountryList),this._handleClickCountryList=g=>{var b;const S=(b=g.target)===null||b===void 0?void 0:b.closest(".iti__country");S&&this._selectListItem(S)},this.countryList.addEventListener("click",this._handleClickCountryList),this._handleClickOffToClose=g=>{!!g.target.closest(`#iti-${this.id}__dropdown-content`)||this._closeDropdown()},setTimeout(()=>{document.documentElement.addEventListener("click",this._handleClickOffToClose)},0);let p="",$=null;if(this._handleKeydownOnDropdown=g=>{["ArrowUp","ArrowDown","Enter","Escape"].includes(g.key)&&(g.preventDefault(),g.stopPropagation(),g.key==="ArrowUp"||g.key==="ArrowDown"?this._handleUpDownKey(g.key):g.key==="Enter"?this._handleEnterKey():g.key==="Escape"&&this._closeDropdown()),!this.options.countrySearch&&/^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(g.key)&&(g.stopPropagation(),$&&clearTimeout($),p+=g.key.toLowerCase(),this._searchForCountry(p),$=setTimeout(()=>{p=""},1e3))},document.addEventListener("keydown",this._handleKeydownOnDropdown),this.options.countrySearch){const g=()=>{const S=this.searchInput.value.trim();this._filterCountries(S),this.searchInput.value?this.searchClearButton.classList.remove("iti__hide"):this.searchClearButton.classList.add("iti__hide")};let b=null;this._handleSearchChange=()=>{b&&clearTimeout(b),b=setTimeout(()=>{g(),b=null},100)},this.searchInput.addEventListener("input",this._handleSearchChange),this._handleSearchClear=()=>{this.searchInput.value="",this.searchInput.focus(),g()},this.searchClearButton.addEventListener("click",this._handleSearchClear)}}_searchForCountry(p){for(const $ of this.countries)if($.name.substring(0,p.length).toLowerCase()===p){const b=$.nodeById[this.id];this._highlightListItem(b,!1),this._scrollTo(b);break}}_filterCountries(p){this.countryList.innerHTML="";let $;p===""?$=this.countries:$=this._getMatchedCountries(p);let g=!0;for(const b of $){const S=b.nodeById[this.id];S&&(this.countryList.appendChild(S),g&&(this._highlightListItem(S,!1),g=!1))}g?(this._highlightListItem(null,!1),this.searchNoResults&&this.searchNoResults.classList.remove("iti__hide")):this.searchNoResults&&this.searchNoResults.classList.add("iti__hide"),this.countryList.scrollTop=0,this._updateSearchResultsA11yText()}_getMatchedCountries(p){const $=nt(p),g=[],b=[],S=[],k=[],x=[],q=[];for(const P of this.countries)P.iso2===$?g.push(P):P.normalisedName.startsWith($)?b.push(P):P.normalisedName.includes($)?S.push(P):$===P.dialCode||$===P.dialCodePlus?k.push(P):P.dialCodePlus.includes($)?x.push(P):P.initials.includes($)&&q.push(P);return[...g.sort((P,K)=>P.priority-K.priority),...b.sort((P,K)=>P.priority-K.priority),...S.sort((P,K)=>P.priority-K.priority),...k.sort((P,K)=>P.priority-K.priority),...x.sort((P,K)=>P.priority-K.priority),...q.sort((P,K)=>P.priority-K.priority)]}_updateSearchResultsA11yText(){const{i18n:p}=this.options,$=this.countryList.childElementCount;let g;$===0?g=p.zeroSearchResults:p.searchResultsText?g=p.searchResultsText($):$===1?g=p.oneSearchResult:g=p.multipleSearchResults.replace("${count}",$.toString()),this.searchResultsA11yText.textContent=g}_handleUpDownKey(p){var $,g;let b=p==="ArrowUp"?($=this.highlightedItem)===null||$===void 0?void 0:$.previousElementSibling:(g=this.highlightedItem)===null||g===void 0?void 0:g.nextElementSibling;!b&&this.countryList.childElementCount>1&&(b=p==="ArrowUp"?this.countryList.lastElementChild:this.countryList.firstElementChild),b&&(this._scrollTo(b),this._highlightListItem(b,!1))}_handleEnterKey(){this.highlightedItem&&this._selectListItem(this.highlightedItem)}_updateValFromNumber(p){let $=p;if(this.options.formatOnDisplay&&z.utils&&this.selectedCountryData){const g=this.options.nationalMode||$.charAt(0)!=="+"&&!this.options.separateDialCode,{NATIONAL:b,INTERNATIONAL:S}=z.utils.numberFormat,k=g?b:S;$=z.utils.formatNumber($,this.selectedCountryData.iso2,k)}$=this._beforeSetNumber($),this.telInput.value=$}_updateCountryFromNumber(p){const $=this._getNewCountryFromNumber(p);return $!==null?this._setCountry($):!1}_ensureHasDialCode(p){const{dialCode:$,nationalPrefix:g}=this.selectedCountryData;if(p.charAt(0)==="+"||!$)return p;const k=g&&p.charAt(0)===g&&!this.options.separateDialCode?p.substring(1):p;return`+${$}${k}`}_getNewCountryFromNumber(p){const $=p.indexOf("+");let g=$?p.substring($):p;const b=this.selectedCountryData.iso2,S=this.selectedCountryData.dialCode;g=this._ensureHasDialCode(g);const k=this._getDialCode(g,!0),x=It(g);if(k){const q=It(k),P=this.dialCodeToIso2Map[q];if(P.length===1)return P[0]===b?null:P[0];if(!b&&this.defaultCountry&&P.includes(this.defaultCountry))return this.defaultCountry;if(S==="1"&&Te(x))return null;const{areaCodes:tt,priority:Dt}=this.selectedCountryData;if(tt){const Qt=tt.map($e=>`${S}${$e}`);for(const $e of Qt)if(x.startsWith($e))return null}const Kt=tt&&!(Dt===0)&&x.length>q.length,vt=b&&P.includes(b)&&!Kt,jt=b===P[0];if(!vt&&!jt)return P[0]}else{if(g.charAt(0)==="+"&&x.length)return"";if((!g||g==="+")&&!b)return this.defaultCountry}return null}_highlightListItem(p,$){const g=this.highlightedItem;if(g&&(g.classList.remove("iti__highlight"),g.setAttribute("aria-selected","false")),this.highlightedItem=p,this.highlightedItem&&(this.highlightedItem.classList.add("iti__highlight"),this.highlightedItem.setAttribute("aria-selected","true"),this.options.countrySearch)){const b=this.highlightedItem.getAttribute("id")||"";this.searchInput.setAttribute("aria-activedescendant",b)}$&&this.highlightedItem.focus()}_setCountry(p){const{separateDialCode:$,showFlags:g,i18n:b}=this.options,S=this.selectedCountryData.iso2||"";if(this.selectedCountryData=p?this.countryByIso2.get(p):{},this.selectedCountryData.iso2&&(this.defaultCountry=this.selectedCountryData.iso2),this.selectedCountry){const k=p&&g?`iti__flag iti__${p}`:"iti__flag iti__globe";let x,q;if(p){const{name:P,dialCode:K}=this.selectedCountryData;q=P,x=b.selectedCountryAriaLabel.replace("${countryName}",P).replace("${dialCode}",`+${K}`)}else q=b.noCountrySelected,x=b.noCountrySelected;this.selectedCountryInner.className=k,this.selectedCountry.setAttribute("title",q),this.selectedCountry.setAttribute("aria-label",x)}if($){const k=this.selectedCountryData.dialCode?`+${this.selectedCountryData.dialCode}`:"";this.selectedDialCode.innerHTML=k,this._updateInputPadding()}return this._updatePlaceholder(),this._updateMaxLength(),S!==p}_updateInputPadding(){if(this.selectedCountry){const p=this.options.separateDialCode?78:42,g=(this.selectedCountry.offsetWidth||this._getHiddenSelectedCountryWidth()||p)+6;this.telInput.style.paddingLeft=`${g}px`}}_updateMaxLength(){const{strictMode:p,placeholderNumberType:$,validationNumberTypes:g}=this.options,{iso2:b}=this.selectedCountryData;if(p&&z.utils)if(b){const S=z.utils.numberType[$];let k=z.utils.getExampleNumber(b,!1,S,!0),x=k;for(;z.utils.isPossibleNumber(k,b,g);)x=k,k+="0";const q=z.utils.getCoreNumber(x,b);this.maxCoreNumberLength=q.length,b==="by"&&(this.maxCoreNumberLength=q.length+1)}else this.maxCoreNumberLength=null}_getHiddenSelectedCountryWidth(){if(this.telInput.parentNode){let p;try{p=window.top.document.body}catch{p=document.body}const $=this.telInput.parentNode.cloneNode(!1);$.style.visibility="hidden",p.appendChild($);const g=this.countryContainer.cloneNode();$.appendChild(g);const b=this.selectedCountry.cloneNode(!0);g.appendChild(b);const S=b.offsetWidth;return p.removeChild($),S}return 0}_updatePlaceholder(){const{autoPlaceholder:p,placeholderNumberType:$,nationalMode:g,customPlaceholder:b}=this.options,S=p==="aggressive"||!this.hadInitialPlaceholder&&p==="polite";if(z.utils&&S){const k=z.utils.numberType[$];let x=this.selectedCountryData.iso2?z.utils.getExampleNumber(this.selectedCountryData.iso2,g,k):"";x=this._beforeSetNumber(x),typeof b=="function"&&(x=b(x,this.selectedCountryData)),this.telInput.setAttribute("placeholder",x)}}_selectListItem(p){const $=p.getAttribute("data-country-code"),g=this._setCountry($);this._closeDropdown();const b=p.getAttribute("data-dial-code");this._updateDialCode(b),this.options.formatOnDisplay&&this._updateValFromNumber(this.telInput.value),this.telInput.focus(),g&&this._triggerCountryChange()}_closeDropdown(){this.dropdownContent.classList.add("iti__hide"),this.selectedCountry.setAttribute("aria-expanded","false"),this.highlightedItem&&this.highlightedItem.setAttribute("aria-selected","false"),this.options.countrySearch&&this.searchInput.removeAttribute("aria-activedescendant"),this.dropdownArrow.classList.remove("iti__arrow--up"),this.options.countrySearch&&(this.searchInput.removeEventListener("input",this._handleSearchChange),this.searchClearButton.removeEventListener("click",this._handleSearchClear)),document.removeEventListener("keydown",this._handleKeydownOnDropdown),document.documentElement.removeEventListener("click",this._handleClickOffToClose),this.countryList.removeEventListener("mouseover",this._handleMouseoverCountryList),this.countryList.removeEventListener("click",this._handleClickCountryList),this.options.dropdownContainer&&(this.options.useFullscreenPopup||window.removeEventListener("scroll",this._handleWindowScroll),this.dropdown.parentNode&&this.dropdown.parentNode.removeChild(this.dropdown)),this._trigger("close:countrydropdown")}_scrollTo(p){const $=this.countryList,g=document.documentElement.scrollTop,b=$.offsetHeight,S=$.getBoundingClientRect().top+g,k=S+b,x=p.offsetHeight,q=p.getBoundingClientRect().top+g,P=q+x,K=q-S+$.scrollTop;if(q<S)$.scrollTop=K;else if(P>k){const tt=b-x;$.scrollTop=K-tt}}_updateDialCode(p){const $=this.telInput.value,g=`+${p}`;let b;if($.charAt(0)==="+"){const S=this._getDialCode($);S?b=$.replace(S,g):b=g,this.telInput.value=b}}_getDialCode(p,$){let g="";if(p.charAt(0)==="+"){let b="";for(let S=0;S<p.length;S++){const k=p.charAt(S);if(/[0-9]/.test(k)){if(b+=k,!!!this.dialCodeToIso2Map[b])break;if($)g=p.substring(0,S+1);else if(this.dialCodes.has(b)){g=p.substring(0,S+1);break}if(b.length===this.dialCodeMaxLen)break}}}return g}_getFullNumber(p){const $=p||this.telInput.value.trim(),{dialCode:g}=this.selectedCountryData;let b;const S=It($);return this.options.separateDialCode&&$.charAt(0)!=="+"&&g&&S?b=`+${g}`:b="",b+$}_beforeSetNumber(p){const $=this._getDialCode(p),g=bs(p,$,this.options.separateDialCode,this.selectedCountryData);return this._cap(g)}_triggerCountryChange(){this._trigger("countrychange")}handleAutoCountry(){this.options.initialCountry==="auto"&&z.autoCountry&&(this.defaultCountry=z.autoCountry,this.selectedCountryData.iso2||this.selectedCountryInner.classList.contains("iti__globe")||this.setCountry(this.defaultCountry),this.resolveAutoCountryPromise())}handleUtils(){z.utils&&(this.telInput.value&&this._updateValFromNumber(this.telInput.value),this.selectedCountryData.iso2&&(this._updatePlaceholder(),this._updateMaxLength())),this.resolveUtilsScriptPromise()}destroy(){var p,$;this.telInput.iti=void 0;const{allowDropdown:g,separateDialCode:b}=this.options;if(g){this._closeDropdown(),this.selectedCountry.removeEventListener("click",this._handleClickSelectedCountry),this.countryContainer.removeEventListener("keydown",this._handleCountryContainerKeydown);const x=this.telInput.closest("label");x&&x.removeEventListener("click",this._handleLabelClick)}const{form:S}=this.telInput;this._handleHiddenInputSubmit&&S&&S.removeEventListener("submit",this._handleHiddenInputSubmit),this.telInput.removeEventListener("input",this._handleInputEvent),this._handleKeydownEvent&&this.telInput.removeEventListener("keydown",this._handleKeydownEvent),this._handlePasteEvent&&this.telInput.removeEventListener("paste",this._handlePasteEvent),this._handlePageLoad&&window.removeEventListener("load",this._handlePageLoad),this.telInput.removeAttribute("data-intl-tel-input-id"),b&&(this.telInput.style.paddingLeft=this.originalPaddingLeft);const k=this.telInput.parentNode;k==null||(p=k.parentNode)===null||p===void 0||p.insertBefore(this.telInput,k),k==null||($=k.parentNode)===null||$===void 0||$.removeChild(k),delete z.instances[this.id]}getExtension(){return z.utils?z.utils.getExtension(this._getFullNumber(),this.selectedCountryData.iso2):""}getNumber(p){if(z.utils){const{iso2:$}=this.selectedCountryData;return z.utils.formatNumber(this._getFullNumber(),$,p)}return""}getNumberType(){return z.utils?z.utils.getNumberType(this._getFullNumber(),this.selectedCountryData.iso2):-99}getSelectedCountryData(){return this.selectedCountryData}getValidationError(){if(z.utils){const{iso2:p}=this.selectedCountryData;return z.utils.getValidationError(this._getFullNumber(),p)}return-99}isValidNumber(){const{dialCode:p,iso2:$}=this.selectedCountryData;if(p==="44"&&z.utils){const g=this._getFullNumber(),b=z.utils.getCoreNumber(g,$);if(b[0]==="7"&&b.length!==10)return!1}return this._validateNumber(!1)}isValidNumberPrecise(){return this._validateNumber(!0)}_utilsIsPossibleNumber(p){return z.utils?z.utils.isPossibleNumber(p,this.selectedCountryData.iso2,this.options.validationNumberTypes):null}_validateNumber(p){if(!z.utils)return null;if(!this.selectedCountryData.iso2)return!1;const $=k=>p?this._utilsIsValidNumber(k):this._utilsIsPossibleNumber(k),g=this._getFullNumber(),b=g.search(/\p{L}/u);if(b>-1&&!this.options.allowPhonewords){const k=g.substring(0,b),x=$(k),q=$(g);return x&&q}return $(g)}_utilsIsValidNumber(p){return z.utils?z.utils.isValidNumber(p,this.selectedCountryData.iso2,this.options.validationNumberTypes):null}setCountry(p){const $=p==null?void 0:p.toLowerCase();if(!pt($))throw new Error(`Invalid country code: '${$}'`);const g=this.selectedCountryData.iso2;(p&&$!==g||!p&&g)&&(this._setCountry($),this._updateDialCode(this.selectedCountryData.dialCode),this.options.formatOnDisplay&&this._updateValFromNumber(this.telInput.value),this._triggerCountryChange())}setNumber(p){const $=this._updateCountryFromNumber(p);this._updateValFromNumber(p),$&&this._triggerCountryChange(),this._trigger("input",{isSetNumber:!0})}setPlaceholderNumberType(p){this.options.placeholderNumberType=p,this._updatePlaceholder()}setDisabled(p){this.telInput.disabled=p,p?this.selectedCountry.setAttribute("disabled","true"):this.selectedCountry.removeAttribute("disabled")}},st=T=>{if(!z.utils&&!z.startedLoadingUtilsScript){let p;if(typeof T=="function")try{p=Promise.resolve(T())}catch($){return Promise.reject($)}else return Promise.reject(new TypeError(`The argument passed to attachUtils must be a function that returns a promise for the utilities module, not ${typeof T}`));return z.startedLoadingUtilsScript=!0,p.then($=>{const g=$==null?void 0:$.default;if(!g||typeof g!="object")throw new TypeError("The loader function passed to attachUtils did not resolve to a module object with utils as its default export.");return z.utils=g,xt("handleUtils"),!0}).catch($=>{throw xt("rejectUtilsScriptPromise",$),$})}return null},z=Object.assign((T,p)=>{const $=new Ke(T,p);return $._init(),T.setAttribute("data-intl-tel-input-id",$.id.toString()),z.instances[$.id]=$,T.iti=$,$},{defaults:Gt,documentReady:()=>document.readyState==="complete",getCountryData:()=>E,getInstance:T=>{const p=T.getAttribute("data-intl-tel-input-id");return p?z.instances[p]:null},instances:{},attachUtils:st,startedLoadingUtilsScript:!1,startedLoadingAutoCountry:!1,version:"25.10.12"}),Yt=z;return h(u)})();return t.default})})(Wr);var Ll=Wr.exports;const Nl=Dl(Ll);(function(){var i=this||self;function t(d,c){d=d.split(".");var f=i;d[0]in f||typeof f.execScript>"u"||f.execScript("var "+d[0]);for(var v;d.length&&(v=d.shift());)d.length||c===void 0?f[v]&&f[v]!==Object.prototype[v]?f=f[v]:f=f[v]={}:f[v]=c}function e(d,c){function f(){}f.prototype=c.prototype,d.ma=c.prototype,d.prototype=new f,d.prototype.constructor=d,d.sa=function(v,_,w){for(var C=Array(arguments.length-2),D=2;D<arguments.length;D++)C[D-2]=arguments[D];return c.prototype[_].apply(v,C)}}function s(d){const c=[];let f=0;for(const v in d)c[f++]=d[v];return c}var n=class{constructor(d){if(a!==a)throw Error("SafeUrl is not meant to be built directly");this.g=d}toString(){return this.g.toString()}},a={};new n("about:invalid#zClosurez"),new n("about:blank");const r={};class o{constructor(){if(r!==r)throw Error("SafeStyle is not meant to be built directly")}toString(){return"".toString()}}new o;const h={};class u{constructor(){if(h!==h)throw Error("SafeStyleSheet is not meant to be built directly")}toString(){return"".toString()}}new u;const y={};class j{constructor(){var c=i.trustedTypes&&i.trustedTypes.emptyHTML||"";if(y!==y)throw Error("SafeHtml is not meant to be built directly");this.g=c}toString(){return this.g.toString()}}new j;function E(d,c){switch(this.g=d,this.l=!!c.aa,this.h=c.i,this.s=c.type,this.o=!1,this.h){case H:case et:case ht:case ft:case Ct:case R:case O:this.o=!0}this.j=c.defaultValue}var O=1,R=2,H=3,et=4,ht=6,ft=16,Ct=18;function zt(d,c){for(this.h=d,this.g={},d=0;d<c.length;d++){var f=c[d];this.g[f.g]=f}}function Gt(d){return d=s(d.g),d.sort(function(c,f){return c.g-f.g}),d}function dt(){this.h={},this.j=this.m().g,this.g=this.l=null}dt.prototype.has=function(d){return nt(this,d.g)},dt.prototype.get=function(d,c){return N(this,d.g,c)},dt.prototype.set=function(d,c){ut(this,d.g,c)},dt.prototype.add=function(d,c){bs(this,d.g,c)};function It(d,c){for(var f=Gt(d.m()),v=0;v<f.length;v++){var _=f[v],w=_.g;if(nt(c,w)){d.g&&delete d.g[_.g];var C=_.h==11||_.h==10;if(_.l){_=mt(c,w);for(var D=0;D<_.length;D++)bs(d,w,C?_[D].clone():_[D])}else _=G(c,w),C?(C=G(d,w))?It(C,_):ut(d,w,_.clone()):ut(d,w,_)}}}dt.prototype.clone=function(){var d=new this.constructor;return d!=this&&(d.h={},d.g&&(d.g={}),It(d,this)),d};function nt(d,c){return d.h[c]!=null}function G(d,c){var f=d.h[c];if(f==null)return null;if(d.l){if(!(c in d.g)){var v=d.l,_=d.j[c];if(f!=null)if(_.l){for(var w=[],C=0;C<f.length;C++)w[C]=v.h(_,f[C]);f=w}else f=v.h(_,f);return d.g[c]=f}return d.g[c]}return f}function N(d,c,f){var v=G(d,c);return d.j[c].l?v[f||0]:v}function Q(d,c){if(nt(d,c))d=N(d,c);else t:{if(d=d.j[c],d.j===void 0)if(c=d.s,c===Boolean)d.j=!1;else if(c===Number)d.j=0;else if(c===String)d.j=d.o?"0":"";else{d=new c;break t}d=d.j}return d}function mt(d,c){return G(d,c)||[]}function Zt(d,c){return d.j[c].l?nt(d,c)?d.h[c].length:0:nt(d,c)?1:0}function ut(d,c,f){d.h[c]=f,d.g&&(d.g[c]=f)}function bs(d,c,f){d.h[c]||(d.h[c]=[]),d.h[c].push(f),d.g&&delete d.g[c]}function xe(d,c){var f=[],v;for(v in c)v!=0&&f.push(new E(v,c[v]));return new zt(d,f)}function Ee(){}Ee.prototype.g=function(d){throw new d.h,Error("Unimplemented")},Ee.prototype.h=function(d,c){if(d.h==11||d.h==10)return c instanceof dt?c:this.g(d.s.prototype.m(),c);if(d.h==14)return typeof c=="string"&&vs.test(c)&&(d=Number(c),0<d)?d:c;if(!d.o)return c;if(d=d.s,d===String){if(typeof c=="number")return String(c)}else if(d===Number&&typeof c=="string"&&(c==="Infinity"||c==="-Infinity"||c==="NaN"||vs.test(c)))return Number(c);return c};var vs=/^-?[0-9]+$/;function Te(){}e(Te,Ee),Te.prototype.g=function(d,c){return d=new d.h,d.l=this,d.h=c,d.g={},d};function pe(){}e(pe,Te),pe.prototype.h=function(d,c){return d.h==8?!!c:Ee.prototype.h.apply(this,arguments)},pe.prototype.g=function(d,c){return pe.ma.g.call(this,d,c)};function lt(d,c){d!=null&&this.g.apply(this,arguments)}lt.prototype.h="",lt.prototype.set=function(d){this.h=""+d},lt.prototype.g=function(d,c,f){if(this.h+=String(d),c!=null)for(let v=1;v<arguments.length;v++)this.h+=arguments[v];return this};function pt(d){d.h=""}lt.prototype.toString=function(){return this.h};function xt(){dt.call(this)}e(xt,dt);var Ke=null;function st(){dt.call(this)}e(st,dt);var z=null;function Yt(){dt.call(this)}e(Yt,dt);var T=null;xt.prototype.m=function(){var d=Ke;return d||(Ke=d=xe(xt,{0:{name:"NumberFormat",ia:"i18n.phonenumbers.NumberFormat"},1:{name:"pattern",required:!0,i:9,type:String},2:{name:"format",required:!0,i:9,type:String},3:{name:"leading_digits_pattern",aa:!0,i:9,type:String},4:{name:"national_prefix_formatting_rule",i:9,type:String},6:{name:"national_prefix_optional_when_formatting",i:8,defaultValue:!1,type:Boolean},5:{name:"domestic_carrier_code_formatting_rule",i:9,type:String}})),d},xt.m=xt.prototype.m,st.prototype.m=function(){var d=z;return d||(z=d=xe(st,{0:{name:"PhoneNumberDesc",ia:"i18n.phonenumbers.PhoneNumberDesc"},2:{name:"national_number_pattern",i:9,type:String},9:{name:"possible_length",aa:!0,i:5,type:Number},10:{name:"possible_length_local_only",aa:!0,i:5,type:Number},6:{name:"example_number",i:9,type:String}})),d},st.m=st.prototype.m,Yt.prototype.m=function(){var d=T;return d||(T=d=xe(Yt,{0:{name:"PhoneMetadata",ia:"i18n.phonenumbers.PhoneMetadata"},1:{name:"general_desc",i:11,type:st},2:{name:"fixed_line",i:11,type:st},3:{name:"mobile",i:11,type:st},4:{name:"toll_free",i:11,type:st},5:{name:"premium_rate",i:11,type:st},6:{name:"shared_cost",i:11,type:st},7:{name:"personal_number",i:11,type:st},8:{name:"voip",i:11,type:st},21:{name:"pager",i:11,type:st},25:{name:"uan",i:11,type:st},27:{name:"emergency",i:11,type:st},28:{name:"voicemail",i:11,type:st},29:{name:"short_code",i:11,type:st},30:{name:"standard_rate",i:11,type:st},31:{name:"carrier_specific",i:11,type:st},33:{name:"sms_services",i:11,type:st},24:{name:"no_international_dialling",i:11,type:st},9:{name:"id",required:!0,i:9,type:String},10:{name:"country_code",i:5,type:Number},11:{name:"international_prefix",i:9,type:String},17:{name:"preferred_international_prefix",i:9,type:String},12:{name:"national_prefix",i:9,type:String},13:{name:"preferred_extn_prefix",i:9,type:String},15:{name:"national_prefix_for_parsing",i:9,type:String},16:{name:"national_prefix_transform_rule",i:9,type:String},18:{name:"same_mobile_and_fixed_line_pattern",i:8,defaultValue:!1,type:Boolean},19:{name:"number_format",aa:!0,i:11,type:xt},20:{name:"intl_number_format",aa:!0,i:11,type:xt},22:{name:"main_country_for_code",i:8,defaultValue:!1,type:Boolean},23:{name:"leading_digits",i:9,type:String}})),d},Yt.m=Yt.prototype.m;function p(){dt.call(this)}e(p,dt);var $=null,g={ra:0,qa:1,pa:5,oa:10,na:20};p.prototype.m=function(){var d=$;return d||($=d=xe(p,{0:{name:"PhoneNumber",ia:"i18n.phonenumbers.PhoneNumber"},1:{name:"country_code",required:!0,i:5,type:Number},2:{name:"national_number",required:!0,i:4,type:Number},3:{name:"extension",i:9,type:String},4:{name:"italian_leading_zero",i:8,type:Boolean},8:{name:"number_of_leading_zeros",i:5,defaultValue:1,type:Number},5:{name:"raw_input",i:9,type:String},6:{name:"country_code_source",i:14,defaultValue:0,type:g},7:{name:"preferred_domestic_carrier_code",i:9,type:String}})),d},p.ctor=p,p.ctor.m=p.prototype.m;var b={1:"US AG AI AS BB BM BS CA DM DO GD GU JM KN KY LC MP MS PR SX TC TT VC VG VI".split(" "),7:["RU","KZ"],20:["EG"],27:["ZA"],30:["GR"],31:["NL"],32:["BE"],33:["FR"],34:["ES"],36:["HU"],39:["IT","VA"],40:["RO"],41:["CH"],43:["AT"],44:["GB","GG","IM","JE"],45:["DK"],46:["SE"],47:["NO","SJ"],48:["PL"],49:["DE"],51:["PE"],52:["MX"],53:["CU"],54:["AR"],55:["BR"],56:["CL"],57:["CO"],58:["VE"],60:["MY"],61:["AU","CC","CX"],62:["ID"],63:["PH"],64:["NZ"],65:["SG"],66:["TH"],81:["JP"],82:["KR"],84:["VN"],86:["CN"],90:["TR"],91:["IN"],92:["PK"],93:["AF"],94:["LK"],95:["MM"],98:["IR"],211:["SS"],212:["MA","EH"],213:["DZ"],216:["TN"],218:["LY"],220:["GM"],221:["SN"],222:["MR"],223:["ML"],224:["GN"],225:["CI"],226:["BF"],227:["NE"],228:["TG"],229:["BJ"],230:["MU"],231:["LR"],232:["SL"],233:["GH"],234:["NG"],235:["TD"],236:["CF"],237:["CM"],238:["CV"],239:["ST"],240:["GQ"],241:["GA"],242:["CG"],243:["CD"],244:["AO"],245:["GW"],246:["IO"],247:["AC"],248:["SC"],249:["SD"],250:["RW"],251:["ET"],252:["SO"],253:["DJ"],254:["KE"],255:["TZ"],256:["UG"],257:["BI"],258:["MZ"],260:["ZM"],261:["MG"],262:["RE","YT"],263:["ZW"],264:["NA"],265:["MW"],266:["LS"],267:["BW"],268:["SZ"],269:["KM"],290:["SH","TA"],291:["ER"],297:["AW"],298:["FO"],299:["GL"],350:["GI"],351:["PT"],352:["LU"],353:["IE"],354:["IS"],355:["AL"],356:["MT"],357:["CY"],358:["FI","AX"],359:["BG"],370:["LT"],371:["LV"],372:["EE"],373:["MD"],374:["AM"],375:["BY"],376:["AD"],377:["MC"],378:["SM"],380:["UA"],381:["RS"],382:["ME"],383:["XK"],385:["HR"],386:["SI"],387:["BA"],389:["MK"],420:["CZ"],421:["SK"],423:["LI"],500:["FK"],501:["BZ"],502:["GT"],503:["SV"],504:["HN"],505:["NI"],506:["CR"],507:["PA"],508:["PM"],509:["HT"],590:["GP","BL","MF"],591:["BO"],592:["GY"],593:["EC"],594:["GF"],595:["PY"],596:["MQ"],597:["SR"],598:["UY"],599:["CW","BQ"],670:["TL"],672:["NF"],673:["BN"],674:["NR"],675:["PG"],676:["TO"],677:["SB"],678:["VU"],679:["FJ"],680:["PW"],681:["WF"],682:["CK"],683:["NU"],685:["WS"],686:["KI"],687:["NC"],688:["TV"],689:["PF"],690:["TK"],691:["FM"],692:["MH"],800:["001"],808:["001"],850:["KP"],852:["HK"],853:["MO"],855:["KH"],856:["LA"],870:["001"],878:["001"],880:["BD"],881:["001"],882:["001"],883:["001"],886:["TW"],888:["001"],960:["MV"],961:["LB"],962:["JO"],963:["SY"],964:["IQ"],965:["KW"],966:["SA"],967:["YE"],968:["OM"],970:["PS"],971:["AE"],972:["IL"],973:["BH"],974:["QA"],975:["BT"],976:["MN"],977:["NP"],979:["001"],992:["TJ"],993:["TM"],994:["AZ"],995:["GE"],996:["KG"],998:["UZ"]},S={AC:[,[,,"(?:[01589]\\d|[46])\\d{4}",,,,,,,[5,6]],[,,"6[2-467]\\d{3}",,,,"62889",,,[5]],[,,"4\\d{4}",,,,"40123",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AC",247,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:0[1-9]|[1589]\\d)\\d{4}",,,,"542011",,,[6]],,,[,,,,,,,,,[-1]]],AD:[,[,,"(?:1|6\\d)\\d{7}|[135-9]\\d{5}",,,,,,,[6,8,9]],[,,"[78]\\d{5}",,,,"712345",,,[6]],[,,"690\\d{6}|[356]\\d{5}",,,,"312345",,,[6,9]],[,,"180[02]\\d{4}",,,,"18001234",,,[8]],[,,"[19]\\d{5}",,,,"912345",,,[6]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AD",376,"00",,,,,,,,[[,"(\\d{3})(\\d{3})","$1 $2",["[135-9]"]],[,"(\\d{4})(\\d{4})","$1 $2",["1"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"]]],,[,,,,,,,,,[-1]],,,[,,"1800\\d{4}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AE:[,[,,"(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}",,,,,,,[5,6,7,8,9,10,11,12]],[,,"[2-4679][2-8]\\d{6}",,,,"22345678",,,[8],[7]],[,,"5[024-68]\\d{7}",,,,"501234567",,,[9]],[,,"400\\d{6}|800\\d{2,9}",,,,"800123456"],[,,"900[02]\\d{5}",,,,"900234567",,,[9]],[,,"700[05]\\d{5}",,,,"700012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AE",971,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2,9})","$1 $2",["60|8"]],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[236]|[479][2-8]"],"0$1"],[,"(\\d{3})(\\d)(\\d{5})","$1 $2 $3",["[479]"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"600[25]\\d{5}",,,,"600212345",,,[9]],,,[,,,,,,,,,[-1]]],AF:[,[,,"[2-7]\\d{8}",,,,,,,[9],[7]],[,,"(?:[25][0-8]|[34][0-4]|6[0-5])[2-9]\\d{6}",,,,"234567890",,,,[7]],[,,"7\\d{8}",,,,"701234567",,,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AF",93,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[1-9]"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"]],[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AG:[,[,,"(?:268|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"268(?:4(?:6[0-38]|84)|56[0-2])\\d{4}",,,,"2684601234",,,,[7]],[,,"268(?:464|7(?:1[3-9]|[28]\\d|3[0246]|64|7[0-689]))\\d{4}",,,,"2684641234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,"26848[01]\\d{4}",,,,"2684801234",,,,[7]],"AG",1,"011","1",,,"([457]\\d{6})$|1","268$1",,,,,[,,"26840[69]\\d{4}",,,,"2684061234",,,,[7]],,"268",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AI:[,[,,"(?:264|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"264(?:292|4(?:6[12]|9[78]))\\d{4}",,,,"2644612345",,,,[7]],[,,"264(?:235|4(?:69|76)|5(?:3[6-9]|8[1-4])|7(?:29|72))\\d{4}",,,,"2642351234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"AI",1,"011","1",,,"([2457]\\d{6})$|1","264$1",,,,,[,,"264724\\d{4}",,,,"2647241234",,,,[7]],,"264",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AL:[,[,,"(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}",,,,,,,[6,7,8,9],[5]],[,,"4505[0-2]\\d{3}|(?:[2358][16-9]\\d[2-9]|4410)\\d{4}|(?:[2358][2-5][2-9]|4(?:[2-57-9][2-9]|6\\d))\\d{5}",,,,"22345678",,,[8],[5,6,7]],[,,"6(?:[78][2-9]|9\\d)\\d{6}",,,,"672123456",,,[9]],[,,"800\\d{4}",,,,"8001234",,,[7]],[,,"900[1-9]\\d\\d",,,,"900123",,,[6]],[,,"808[1-9]\\d\\d",,,,"808123",,,[6]],[,,"700[2-9]\\d{4}",,,,"70021234",,,[8]],[,,,,,,,,,[-1]],"AL",355,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3,4})","$1 $2",["80|9"],"0$1"],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["4[2-6]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2358][2-5]|4"],"0$1"],[,"(\\d{3})(\\d{5})","$1 $2",["[23578]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["6"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AM:[,[,,"(?:[1-489]\\d|55|60|77)\\d{6}",,,,,,,[8],[5,6]],[,,"(?:(?:1[0-25]|47)\\d|2(?:2[2-46]|3[1-8]|4[2-69]|5[2-7]|6[1-9]|8[1-7])|3[12]2)\\d{5}",,,,"10123456",,,,[5,6]],[,,"(?:33|4[1349]|55|77|88|9[13-9])\\d{6}",,,,"77123456"],[,,"800\\d{5}",,,,"80012345"],[,,"90[016]\\d{5}",,,,"90012345"],[,,"80[1-4]\\d{5}",,,,"80112345"],[,,,,,,,,,[-1]],[,,"60(?:2[78]|3[5-9]|4[02-9]|5[0-46-9]|[6-8]\\d|9[0-2])\\d{4}",,,,"60271234"],"AM",374,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[89]0"],"0 $1"],[,"(\\d{3})(\\d{5})","$1 $2",["2|3[12]"],"(0$1)"],[,"(\\d{2})(\\d{6})","$1 $2",["1|47"],"(0$1)"],[,"(\\d{2})(\\d{6})","$1 $2",["[3-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AO:[,[,,"[29]\\d{8}",,,,,,,[9]],[,,"2\\d(?:[0134][25-9]|[25-9]\\d)\\d{5}",,,,"222123456"],[,,"9[1-79]\\d{7}",,,,"923123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AO",244,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[29]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AR:[,[,,"(?:11|[89]\\d\\d)\\d{8}|[2368]\\d{9}",,,,,,,[10,11],[6,7,8]],[,,"3(?:7(?:1[15]|81)|8(?:21|4[16]|69|9[12]))[46]\\d{5}|(?:2(?:2(?:2[59]|44|52)|3(?:26|44)|47[35]|9(?:[07]2|2[26]|34|46))|3327)[45]\\d{5}|(?:2(?:657|9(?:54|66))|3(?:48[27]|7(?:55|77)|8(?:65|78)))[2-8]\\d{5}|(?:2(?:284|3(?:02|23)|477|622|920)|3(?:4(?:46|89|92)|541))[2-7]\\d{5}|(?:(?:11[1-8]|670)\\d|2(?:2(?:0[45]|1[2-6]|3[3-6])|3(?:[06]4|7[45])|494|6(?:04|1[2-8]|[36][45]|4[3-6])|80[45]|9(?:[17][4-6]|[48][45]|9[3-6]))|3(?:364|4(?:1[2-8]|[25][4-6]|3[3-6]|84)|5(?:1[2-9]|[38][4-6])|6(?:2[45]|44)|7[069][45]|8(?:0[45]|1[2-7]|3[4-6]|5[3-6]|7[2-6]|8[3-68])))\\d{6}|(?:2(?:2(?:62|81)|320|9(?:42|83))|3(?:329|4(?:62|7[16])|5(?:43|64)|7(?:18|5[17])))[2-6]\\d{5}|2(?:2(?:21|4[23]|6[145]|7[1-4]|8[356]|9[267])|3(?:16|3[13-8]|43|5[346-8]|9[3-5])|6(?:2[46]|4[78]|5[1568])|9(?:03|2[1457-9]|3[1356]|4[08]|[56][23]|82))4\\d{5}|(?:2(?:257|3(?:24|46|92)|9(?:01|23|64))|3(?:4(?:42|64)|5(?:25|37|4[47]|71)|7(?:35|72)|825))[3-6]\\d{5}|(?:2(?:2(?:02|2[3467]|4[156]|5[45]|6[6-8]|91)|3(?:1[47]|25|[45][25]|96)|47[48]|625|932)|3(?:38[2578]|4(?:0[0-24-9]|3[78]|4[457]|58|6[035-9]|72|83|9[136-8])|5(?:2[124]|[368][23]|4[2689]|7[2-6])|7(?:16|2[15]|3[14]|4[13]|5[468]|7[3-5]|8[26])|8(?:2[67]|3[278]|4[3-5]|5[78]|6[1-378]|[78]7|94)))[4-6]\\d{5}",,,,"1123456789",,,[10],[6,7,8]],[,,"93(?:7(?:1[15]|81)|8(?:21|4[16]|69|9[12]))[46]\\d{5}|9(?:2(?:2(?:2[59]|44|52)|3(?:26|44)|47[35]|9(?:[07]2|2[26]|34|46))|3327)[45]\\d{5}|9(?:2(?:657|9(?:54|66))|3(?:48[27]|7(?:55|77)|8(?:65|78)))[2-8]\\d{5}|9(?:2(?:284|3(?:02|23)|477|622|920)|3(?:4(?:46|89|92)|541))[2-7]\\d{5}|(?:675\\d|9(?:11[1-8]\\d|2(?:2(?:0[45]|1[2-6]|3[3-6])|3(?:[06]4|7[45])|494|6(?:04|1[2-8]|[36][45]|4[3-6])|80[45]|9(?:[17][4-6]|[48][45]|9[3-6]))|3(?:364|4(?:1[2-8]|[25][4-6]|3[3-6]|84)|5(?:1[2-9]|[38][4-6])|6(?:2[45]|44)|7[069][45]|8(?:0[45]|1[2-7]|3[4-6]|5[3-6]|7[2-6]|8[3-68]))))\\d{6}|9(?:2(?:2(?:62|81)|320|9(?:42|83))|3(?:329|4(?:62|7[16])|5(?:43|64)|7(?:18|5[17])))[2-6]\\d{5}|92(?:2(?:21|4[23]|6[145]|7[1-4]|8[356]|9[267])|3(?:16|3[13-8]|43|5[346-8]|9[3-5])|6(?:2[46]|4[78]|5[1568])|9(?:03|2[1457-9]|3[1356]|4[08]|[56][23]|82))4\\d{5}|9(?:2(?:257|3(?:24|46|92)|9(?:01|23|64))|3(?:4(?:42|64)|5(?:25|37|4[47]|71)|7(?:35|72)|825))[3-6]\\d{5}|9(?:2(?:2(?:02|2[3467]|4[156]|5[45]|6[6-8]|91)|3(?:1[47]|25|[45][25]|96)|47[48]|625|932)|3(?:38[2578]|4(?:0[0-24-9]|3[78]|4[457]|58|6[035-9]|72|83|9[136-8])|5(?:2[124]|[368][23]|4[2689]|7[2-6])|7(?:16|2[15]|3[14]|4[13]|5[468]|7[3-5]|8[26])|8(?:2[67]|3[278]|4[3-5]|5[78]|6[1-378]|[78]7|94)))[4-6]\\d{5}",,,,"91123456789",,,,[6,7,8]],[,,"800\\d{7,8}",,,,"8001234567"],[,,"60[04579]\\d{7}",,,,"6001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AR",54,"00","0",,,"0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?","9$1",,,[[,"(\\d{3})","$1",["0|1(?:0[0-35-7]|1[02-5]|2[015]|3[47]|4[478])|911"]],[,"(\\d{2})(\\d{4})","$1-$2",["[1-9]"]],[,"(\\d{3})(\\d{4})","$1-$2",["[2-9]"]],[,"(\\d{4})(\\d{4})","$1-$2",["[1-8]"]],[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])","2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)","2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]","2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"],"0$1",,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["1"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2-$3",["[23]"],"0$1",,1],[,"(\\d)(\\d{4})(\\d{2})(\\d{4})","$2 15-$3-$4",["9(?:2[2-469]|3[3-578])","9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))","9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)","9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]","9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"],"0$1"],[,"(\\d)(\\d{2})(\\d{4})(\\d{4})","$2 15-$3-$4",["91"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{5})","$1-$2-$3",["8"],"0$1"],[,"(\\d)(\\d{3})(\\d{3})(\\d{4})","$2 15-$3-$4",["9"],"0$1"]],[[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])","2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)","2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]","2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"],"0$1",,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["1"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2-$3",["[23]"],"0$1",,1],[,"(\\d)(\\d{4})(\\d{2})(\\d{4})","$1 $2 $3-$4",["9(?:2[2-469]|3[3-578])","9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))","9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)","9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]","9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"]],[,"(\\d)(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3-$4",["91"]],[,"(\\d{3})(\\d{3})(\\d{5})","$1-$2-$3",["8"],"0$1"],[,"(\\d)(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3-$4",["9"]]],[,,,,,,,,,[-1]],,,[,,"810\\d{7}",,,,,,,[10]],[,,"810\\d{7}",,,,"8101234567",,,[10]],,,[,,,,,,,,,[-1]]],AS:[,[,,"(?:[58]\\d\\d|684|900)\\d{7}",,,,,,,[10],[7]],[,,"6846(?:22|33|44|55|77|88|9[19])\\d{4}",,,,"6846221234",,,,[7]],[,,"684(?:2(?:48|5[2468]|7[26])|7(?:3[13]|70|82))\\d{4}",,,,"6847331234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"AS",1,"011","1",,,"([267]\\d{6})$|1","684$1",,,,,[,,,,,,,,,[-1]],,"684",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AT:[,[,,"1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}",,,,,,,[4,5,6,7,8,9,10,11,12,13],[3]],[,,"1(?:11\\d|[2-9]\\d{3,11})|(?:316|463)\\d{3,10}|648[34]\\d{3,9}|(?:51|66|73)2\\d{3,10}|(?:2(?:1[467]|2[13-8]|5[2357]|6[1-46-8]|7[1-8]|8[124-7]|9[1458])|3(?:1[1-578]|3[23568]|4[5-7]|5[1378]|6[1-38]|8[3-68])|4(?:2[1-8]|35|7[1368]|8[2457])|5(?:2[1-8]|3[357]|4[147]|5[12578]|6[37])|6(?:13|2[1-47]|4[135-7]|5[468])|7(?:2[1-8]|35|4[13478]|5[68]|6[16-8]|7[1-6]|9[45]))\\d{4,10}",,,,"1234567890",,,,[3]],[,,"6(?:485|(?:5[0-3579]|6[013-9]|[7-9]\\d)\\d)\\d{3,9}",,,,"664123456",,,[7,8,9,10,11,12,13]],[,,"800\\d{6,10}",,,,"800123456",,,[9,10,11,12,13]],[,,"(?:8[69][2-68]|9(?:0[01]|3[019]))\\d{6,10}",,,,"900123456",,,[9,10,11,12,13]],[,,"8(?:10|2[018])\\d{6,10}|828\\d{5}",,,,"810123456",,,[8,9,10,11,12,13]],[,,,,,,,,,[-1]],[,,"5(?:0[1-9]|17|[79]\\d)\\d{2,10}|7[28]0\\d{6,10}",,,,"780123456",,,[5,6,7,8,9,10,11,12,13]],"AT",43,"00","0",,,"0",,,,[[,"(\\d{4})","$1",["14"]],[,"(\\d)(\\d{3,12})","$1 $2",["1(?:11|[2-9])"],"0$1"],[,"(\\d{3})(\\d{2})","$1 $2",["517"],"0$1"],[,"(\\d{2})(\\d{3,5})","$1 $2",["5[079]"],"0$1"],[,"(\\d{6})","$1",["[18]"]],[,"(\\d{3})(\\d{3,10})","$1 $2",["(?:31|4)6|51|6(?:48|5[0-3579]|[6-9])|7(?:20|32|8)|[89]","(?:31|4)6|51|6(?:485|5[0-3579]|[6-9])|7(?:20|32|8)|[89]"],"0$1"],[,"(\\d{4})(\\d{3,9})","$1 $2",["[2-467]|5[2-6]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["5"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4,7})","$1 $2 $3",["5"],"0$1"]],[[,"(\\d)(\\d{3,12})","$1 $2",["1(?:11|[2-9])"],"0$1"],[,"(\\d{3})(\\d{2})","$1 $2",["517"],"0$1"],[,"(\\d{2})(\\d{3,5})","$1 $2",["5[079]"],"0$1"],[,"(\\d{3})(\\d{3,10})","$1 $2",["(?:31|4)6|51|6(?:48|5[0-3579]|[6-9])|7(?:20|32|8)|[89]","(?:31|4)6|51|6(?:485|5[0-3579]|[6-9])|7(?:20|32|8)|[89]"],"0$1"],[,"(\\d{4})(\\d{3,9})","$1 $2",["[2-467]|5[2-6]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["5"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4,7})","$1 $2 $3",["5"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AU:[,[,,"1(?:[0-79]\\d{7}(?:\\d(?:\\d{2})?)?|8[0-24-9]\\d{7})|[2-478]\\d{8}|1\\d{4,7}",,,,,,,[5,6,7,8,9,10,12]],[,,"(?:(?:2(?:(?:[0-26-9]\\d|3[0-8]|5[0135-9])\\d|4(?:[02-9]\\d|10))|3(?:(?:[0-3589]\\d|6[1-9]|7[0-35-9])\\d|4(?:[0-578]\\d|90))|7(?:[013-57-9]\\d|2[0-8])\\d)\\d\\d|8(?:51(?:0(?:0[03-9]|[12479]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-7])|1(?:[0235689]\\d|1[0-69]|4[0-589]|7[0-47-9])|2(?:0[0-79]|[18][13579]|2[14-9]|3[0-46-9]|[4-6]\\d|7[89]|9[0-4])|[34]\\d\\d)|(?:6[0-8]|[78]\\d)\\d{3}|9(?:[02-9]\\d{3}|1(?:(?:[0-58]\\d|6[0135-9])\\d|7(?:0[0-24-9]|[1-9]\\d)|9(?:[0-46-9]\\d|5[0-79])))))\\d{3}",,,,"212345678",,,[9],[8]],[,,"4(?:79[01]|83[0-389]|94[0-478])\\d{5}|4(?:[0-36]\\d|4[047-9]|[58][0-24-9]|7[02-8]|9[0-37-9])\\d{6}",,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"190[0-26]\\d{6}",,,,"1900123456",,,[10]],[,,"13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}",,,,"1300123456",,,[6,8,10,12]],[,,,,,,,,,[-1]],[,,"14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}",,,,"147101234",,,[9]],"AU",61,"001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","0",,,"(183[12])|0",,"0011",,[[,"(\\d{2})(\\d{3,4})","$1 $2",["16"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["13"]],[,"(\\d{3})(\\d{3})","$1 $2",["19"]],[,"(\\d{3})(\\d{4})","$1 $2",["180","1802"]],[,"(\\d{4})(\\d{3,4})","$1 $2",["19"]],[,"(\\d{2})(\\d{3})(\\d{2,4})","$1 $2 $3",["16"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["14|4"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["[2378]"],"(0$1)","$CC ($1)"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:30|[89])"]],[,"(\\d{4})(\\d{4})(\\d{4})","$1 $2 $3",["130"]]],[[,"(\\d{2})(\\d{3,4})","$1 $2",["16"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,4})","$1 $2 $3",["16"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["14|4"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["[2378]"],"(0$1)","$CC ($1)"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:30|[89])"]]],[,,"163\\d{2,6}",,,,"1631234",,,[5,6,7,8,9]],1,,[,,"1(?:3(?:00\\d{5}|45[0-4])|802)\\d{3}|1[38]00\\d{6}|13\\d{4}",,,,,,,[6,7,8,10,12]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AW:[,[,,"(?:[25-79]\\d\\d|800)\\d{4}",,,,,,,[7]],[,,"5(?:2\\d|8[1-9])\\d{4}",,,,"5212345"],[,,"(?:290|5[69]\\d|6(?:[03]0|22|4[0-2]|[69]\\d)|7(?:[34]\\d|7[07])|9(?:6[45]|9[4-8]))\\d{4}",,,,"5601234"],[,,"800\\d{4}",,,,"8001234"],[,,"900\\d{4}",,,,"9001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:28\\d|501)\\d{4}",,,,"5011234"],"AW",297,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[25-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AX:[,[,,"2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|7\\d{5,11}|(?:[14]\\d|3[0-46-9]|50)\\d{4,8}",,,,,,,[5,6,7,8,9,10,11,12]],[,,"18[1-8]\\d{3,6}",,,,"181234567",,,[6,7,8,9]],[,,"4946\\d{2,6}|(?:4[0-8]|50)\\d{4,8}",,,,"412345678",,,[6,7,8,9,10]],[,,"800\\d{4,6}",,,,"800123456",,,[7,8,9]],[,,"[67]00\\d{5,6}",,,,"600123456",,,[8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AX",358,"00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))","0",,,"0",,"00",,,,[,,,,,,,,,[-1]],,"18",[,,,,,,,,,[-1]],[,,"20\\d{4,8}|60[12]\\d{5,6}|7(?:099\\d{4,5}|5[03-9]\\d{3,7})|20[2-59]\\d\\d|(?:606|7(?:0[78]|1|3\\d))\\d{7}|(?:10|29|3[09]|70[1-5]\\d)\\d{4,8}",,,,"10112345"],,,[,,,,,,,,,[-1]]],AZ:[,[,,"365\\d{6}|(?:[124579]\\d|60|88)\\d{7}",,,,,,,[9],[7]],[,,"(?:2[12]428|3655[02])\\d{4}|(?:2(?:22[0-79]|63[0-28])|3654)\\d{5}|(?:(?:1[28]|46)\\d|2(?:[014-6]2|[23]3))\\d{6}",,,,"123123456",,,,[7]],[,,"36554\\d{4}|(?:[16]0|4[04]|5[015]|7[07]|99)\\d{7}",,,,"401234567"],[,,"88\\d{7}",,,,"881234567"],[,,"900200\\d{3}",,,,"900200123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AZ",994,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[1-9]"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["90"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[28]|2|365|46","1[28]|2|365[45]|46","1[28]|2|365(?:4|5[02])|46"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[13-9]"],"0$1"]],[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["90"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[28]|2|365|46","1[28]|2|365[45]|46","1[28]|2|365(?:4|5[02])|46"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[13-9]"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BA:[,[,,"6\\d{8}|(?:[35689]\\d|49|70)\\d{6}",,,,,,,[8,9],[6]],[,,"(?:3(?:[05-79][2-9]|1[4579]|[23][24-9]|4[2-4689]|8[2457-9])|49[2-579]|5(?:0[2-49]|[13][2-9]|[268][2-4679]|4[4689]|5[2-79]|7[2-69]|9[2-4689]))\\d{5}",,,,"30212345",,,[8],[6]],[,,"6040\\d{5}|6(?:03|[1-356]|44|7\\d)\\d{6}",,,,"61123456"],[,,"8[08]\\d{6}",,,,"80123456",,,[8]],[,,"9[0246]\\d{6}",,,,"90123456",,,[8]],[,,"8[12]\\d{6}",,,,"82123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BA",387,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})","$1-$2",["[2-9]"]],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["6[1-3]|[7-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2-$3",["[3-5]|6[56]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["6"],"0$1"]],[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["6[1-3]|[7-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2-$3",["[3-5]|6[56]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["6"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"703[235]0\\d{3}|70(?:2[0-5]|3[0146]|[56]0)\\d{4}",,,,"70341234",,,[8]],,,[,,,,,,,,,[-1]]],BB:[,[,,"(?:246|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"246521[0369]\\d{3}|246(?:2(?:2[78]|7[0-4])|4(?:1[024-6]|2\\d|3[2-9])|5(?:20|[34]\\d|54|7[1-3])|6(?:2\\d|38)|7[35]7|9(?:1[89]|63))\\d{4}",,,,"2464123456",,,,[7]],[,,"246(?:(?:2(?:[3568]\\d|4[0-57-9])|3(?:5[2-9]|6[0-6])|4(?:46|5\\d)|69[5-7]|8(?:[2-5]\\d|83))\\d|52(?:1[147]|20))\\d{3}",,,,"2462501234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"(?:246976|900[2-9]\\d\\d)\\d{4}",,,,"9002123456",,,,[7]],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,"24631\\d{5}",,,,"2463101234",,,,[7]],"BB",1,"011","1",,,"([2-9]\\d{6})$|1","246$1",,,,,[,,,,,,,,,[-1]],,"246",[,,,,,,,,,[-1]],[,,"246(?:292|367|4(?:1[7-9]|3[01]|4[47-9]|67)|7(?:1[2-9]|2\\d|3[016]|53))\\d{4}",,,,"2464301234",,,,[7]],,,[,,,,,,,,,[-1]]],BD:[,[,,"[1-469]\\d{9}|8[0-79]\\d{7,8}|[2-79]\\d{8}|[2-9]\\d{7}|[3-9]\\d{6}|[57-9]\\d{5}",,,,,,,[6,7,8,9,10]],[,,"(?:4(?:31\\d\\d|423)|5222)\\d{3}(?:\\d{2})?|8332[6-9]\\d\\d|(?:3(?:03[56]|224)|4(?:22[25]|653))\\d{3,4}|(?:3(?:42[47]|529|823)|4(?:027|525|65(?:28|8))|562|6257|7(?:1(?:5[3-5]|6[12]|7[156]|89)|22[589]56|32|42675|52(?:[25689](?:56|8)|[347]8)|71(?:6[1267]|75|89)|92374)|82(?:2[59]|32)56|9(?:03[23]56|23(?:256|373)|31|5(?:1|2[4589]56)))\\d{3}|(?:3(?:02[348]|22[35]|324|422)|4(?:22[67]|32[236-9]|6(?:2[46]|5[57])|953)|5526|6(?:024|6655)|81)\\d{4,5}|(?:2(?:7(?:1[0-267]|2[0-289]|3[0-29]|4[01]|5[1-3]|6[013]|7[0178]|91)|8(?:0[125]|1[1-6]|2[0157-9]|3[1-69]|41|6[1-35]|7[1-5]|8[1-8]|9[0-6])|9(?:0[0-2]|1[0-4]|2[568]|3[3-6]|5[5-7]|6[0136-9]|7[0-7]|8[014-9]))|3(?:0(?:2[025-79]|3[2-4])|181|22[12]|32[2356]|824)|4(?:02[09]|22[348]|32[045]|523|6(?:27|54))|666(?:22|53)|7(?:22[57-9]|42[56]|82[35])8|8(?:0[124-9]|2(?:181|2[02-4679]8)|4[12]|[5-7]2)|9(?:[04]2|2(?:2|328)|81))\\d{4}|(?:2(?:[23]\\d|[45])\\d\\d|3(?:1(?:2[5-7]|[5-7])|425|822)|4(?:033|1\\d|[257]1|332|4(?:2[246]|5[25])|6(?:2[35]|56|62)|8(?:23|54)|92[2-5])|5(?:02[03489]|22[457]|32[35-79]|42[46]|6(?:[18]|53)|724|826)|6(?:023|2(?:2[2-5]|5[3-5]|8)|32[3478]|42[34]|52[47]|6(?:[18]|6(?:2[34]|5[24]))|[78]2[2-5]|92[2-6])|7(?:02|21\\d|[3-589]1|6[12]|72[24])|8(?:217|3[12]|[5-7]1)|9[24]1)\\d{5}|(?:(?:3[2-8]|5[2-57-9]|6[03-589])1|4[4689][18])\\d{5}|[59]1\\d{5}",,,,"27111234"],[,,"(?:1[13-9]\\d|644)\\d{7}|(?:3[78]|44|66)[02-9]\\d{7}",,,,"1812345678",,,[10]],[,,"80[03]\\d{7}",,,,"8001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"96(?:0[469]|1[0-47]|3[389]|43|6[69]|7[78])\\d{6}",,,,"9604123456",,,[10]],"BD",880,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{4,6})","$1-$2",["31[5-8]|[459]1"],"0$1"],[,"(\\d{3})(\\d{3,7})","$1-$2",["3(?:[67]|8[013-9])|4(?:6[168]|7|[89][18])|5(?:6[128]|9)|6(?:[15]|28|4[14])|7[2-589]|8(?:0[014-9]|[12])|9[358]|(?:3[2-5]|4[235]|5[2-578]|6[0389]|76|8[3-7]|9[24])1|(?:44|66)[01346-9]"],"0$1"],[,"(\\d{4})(\\d{3,6})","$1-$2",["[13-9]|2[23]"],"0$1"],[,"(\\d)(\\d{7,8})","$1-$2",["2"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BE:[,[,,"4\\d{8}|[1-9]\\d{7}",,,,,,,[8,9]],[,,"80[2-8]\\d{5}|(?:1[0-69]|[23][2-8]|4[23]|5\\d|6[013-57-9]|71|8[1-79]|9[2-4])\\d{6}",,,,"12345678",,,[8]],[,,"4[5-9]\\d{7}",,,,"470123456",,,[9]],[,,"800[1-9]\\d{4}",,,,"80012345",,,[8]],[,,"(?:70(?:2[0-57]|3[04-7]|44|6[04-69]|7[0579])|90\\d\\d)\\d{4}",,,,"90012345",,,[8]],[,,"7879\\d{4}",,,,"78791234",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BE",32,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:80|9)0"],"0$1"],[,"(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[239]|4[23]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[15-8]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"78(?:0[578]|1[014-8]|2[25]|3[15-8]|48|5[05]|60|7[06-8]|9\\d)\\d{4}",,,,"78102345",,,[8]],,,[,,,,,,,,,[-1]]],BF:[,[,,"(?:[025-7]\\d|44)\\d{6}",,,,,,,[8]],[,,"2(?:0(?:49|5[23]|6[5-7]|9[016-9])|4(?:4[569]|5[4-6]|6[5-7]|7[0179])|5(?:[34]\\d|50|6[5-7]))\\d{4}",,,,"20491234"],[,,"(?:0[1-7]|44|5[0-8]|[67]\\d)\\d{6}",,,,"70123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BF",226,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[024-7]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BG:[,[,,"00800\\d{7}|[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}",,,,,,,[6,7,8,9,12],[4,5]],[,,"2\\d{5,7}|(?:43[1-6]|70[1-9])\\d{4,5}|(?:[36]\\d|4[124-7]|[57][1-9]|8[1-6]|9[1-7])\\d{5,6}",,,,"2123456",,,[6,7,8],[4,5]],[,,"(?:43[07-9]|99[69]\\d)\\d{5}|(?:8[7-9]|98)\\d{7}",,,,"43012345",,,[8,9]],[,,"(?:00800\\d\\d|800)\\d{5}",,,,"80012345",,,[8,12]],[,,"90\\d{6}",,,,"90123456",,,[8]],[,,"700\\d{5}",,,,"70012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BG",359,"00","0",,,"0",,,,[[,"(\\d{6})","$1",["1"]],[,"(\\d)(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["2"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["43[1-6]|70[1-9]"],"0$1"],[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:70|8)0"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["43[1-7]|7"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[48]|9[08]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"]],[[,"(\\d)(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["2"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["43[1-6]|70[1-9]"],"0$1"],[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:70|8)0"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["43[1-7]|7"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[48]|9[08]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BH:[,[,,"[136-9]\\d{7}",,,,,,,[8]],[,,"(?:1(?:3[1356]|6[0156]|7\\d)\\d|6(?:1[16]\\d|500|6(?:0\\d|3[12]|44|55|7[7-9]|88)|9[69][69])|7(?:[07]\\d\\d|1(?:11|78)))\\d{4}",,,,"17001234"],[,,"(?:3(?:[0-79]\\d|8[0-57-9])\\d|6(?:3(?:00|33|6[16])|441|6(?:3[03-9]|[69]\\d|7[0-689])))\\d{4}",,,,"36001234"],[,,"8[02369]\\d{6}",,,,"80123456"],[,,"(?:87|9[0-8])\\d{6}",,,,"90123456"],[,,"84\\d{6}",,,,"84123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BH",973,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[13679]|8[02-4679]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BI:[,[,,"(?:[267]\\d|31)\\d{6}",,,,,,,[8]],[,,"(?:22|31)\\d{6}",,,,"22201234"],[,,"(?:29|6[124-9]|7[125-9])\\d{6}",,,,"79561234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BI",257,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2367]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BJ:[,[,,"(?:01\\d|[24-689])\\d{7}",,,,,,,[8,10]],[,,"2090\\d{4}|(?:012\\d\\d|2(?:02|1[037]|2[45]|3[68]|4\\d))\\d{5}",,,,"0120211234"],[,,"(?:01(?:2[5-9]|[4-69]\\d)|4[0-8]|[56]\\d|9[013-9])\\d{6}",,,,"0195123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"857[58]\\d{4}",,,,"85751234",,,[8]],"BJ",229,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24-689]"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"81\\d{6}",,,,"81123456",,,[8]],,,[,,,,,,,,,[-1]]],BL:[,[,,"(?:590\\d|7090)\\d{5}|(?:69|80|9\\d)\\d{7}",,,,,,,[9]],[,,"590(?:2[7-9]|3[3-7]|5[12]|87)\\d{4}",,,,"590271234"],[,,"(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))|7090[0-4])\\d{4}",,,,"690001234"],[,,"80[0-5]\\d{6}",,,,"800012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}",,,,"976012345"],"BL",590,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BM:[,[,,"(?:441|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"441(?:[46]\\d\\d|5(?:4\\d|60|89))\\d{4}",,,,"4414123456",,,,[7]],[,,"441(?:[2378]\\d|5[0-39]|9[02])\\d{5}",,,,"4413701234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"BM",1,"011","1",,,"([2-9]\\d{6})$|1","441$1",,,,,[,,,,,,,,,[-1]],,"441",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BN:[,[,,"[2-578]\\d{6}",,,,,,,[7]],[,,"22[0-7]\\d{4}|(?:2[013-9]|[34]\\d|5[0-25-9])\\d{5}",,,,"2345678"],[,,"(?:22[89]|[78]\\d\\d)\\d{4}",,,,"7123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5[34]\\d{5}",,,,"5345678"],"BN",673,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-578]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BO:[,[,,"8001\\d{5}|(?:[2-467]\\d|50)\\d{6}",,,,,,,[8,9],[7]],[,,"(?:2(?:2\\d\\d|5(?:11|[258]\\d|9[67])|6(?:12|2\\d|9[34])|8(?:2[34]|39|62))|3(?:3\\d\\d|4(?:6\\d|8[24])|8(?:25|42|5[257]|86|9[25])|9(?:[27]\\d|3[2-4]|4[248]|5[24]|6[2-6]))|4(?:4\\d\\d|6(?:11|[24689]\\d|72)))\\d{4}",,,,"22123456",,,[8],[7]],[,,"[67]\\d{7}",,,,"71234567",,,[8]],[,,"8001[07]\\d{4}",,,,"800171234",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"50\\d{6}",,,,"50123456",,,[8],[7]],"BO",591,"00(?:1\\d)?","0",,,"0(1\\d)?",,,,[[,"(\\d)(\\d{7})","$1 $2",["[235]|4[46]"],,"0$CC $1"],[,"(\\d{8})","$1",["[67]"],,"0$CC $1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["8"],,"0$CC $1"]],,[,,,,,,,,,[-1]],,,[,,"8001[07]\\d{4}",,,,,,,[9]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BQ:[,[,,"(?:[34]1|7\\d)\\d{5}",,,,,,,[7]],[,,"(?:318[023]|41(?:6[023]|70)|7(?:1[578]|2[05]|50)\\d)\\d{3}",,,,"7151234"],[,,"(?:31(?:8[14-8]|9[14578])|416[14-9]|7(?:0[01]|7[07]|8\\d|9[056])\\d)\\d{3}",,,,"3181234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BQ",599,"00",,,,,,,,,,[,,,,,,,,,[-1]],,"[347]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BR:[,[,,"[1-467]\\d{9,10}|55[0-46-9]\\d{8}|[34]\\d{7}|55\\d{7,8}|(?:5[0-46-9]|[89]\\d)\\d{7,9}",,,,,,,[8,9,10,11]],[,,"(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-5]\\d{7}",,,,"1123456789",,,[10],[8]],[,,"(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])(?:7|9\\d)\\d{7}",,,,"11961234567",,,[10,11],[8,9]],[,,"800\\d{6,7}",,,,"800123456",,,[9,10]],[,,"[59]00\\d{6,7}",,,,"500123456",,,[9,10]],[,,"(?:30[03]\\d{3}|4(?:0(?:0\\d|20)|370|864))\\d{4}|300\\d{5}",,,,"40041234",,,[8,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BR",55,"00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)","0",,,"(?:0|90)(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?","$2",,,[[,"(\\d{3,6})","$1",["1(?:1[25-8]|2[357-9]|3[02-68]|4[12568]|5|6[0-8]|8[015]|9[0-47-9])|321|610"]],[,"(\\d{4})(\\d{4})","$1-$2",["300|4(?:0[02]|37|86)","300|4(?:0(?:0|20)|370|864)"]],[,"(\\d{4})(\\d{4})","$1-$2",["[2-57]","[2357]|4(?:[0-24-9]|3(?:[0-689]|7[1-9]))"]],[,"(\\d{3})(\\d{2,3})(\\d{4})","$1 $2 $3",["(?:[358]|90)0"],"0$1"],[,"(\\d{5})(\\d{4})","$1-$2",["9"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"],"($1)","0 $CC ($1)"],[,"(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["[16][1-9]|[2-57-9]"],"($1)","0 $CC ($1)"]],[[,"(\\d{4})(\\d{4})","$1-$2",["300|4(?:0[02]|37|86)","300|4(?:0(?:0|20)|370|864)"]],[,"(\\d{3})(\\d{2,3})(\\d{4})","$1 $2 $3",["(?:[358]|90)0"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"],"($1)","0 $CC ($1)"],[,"(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["[16][1-9]|[2-57-9]"],"($1)","0 $CC ($1)"]],[,,,,,,,,,[-1]],,,[,,"(?:30[03]\\d{3}|4(?:0(?:0\\d|20)|864))\\d{4}|800\\d{6,7}|300\\d{5}",,,,,,,[8,9,10]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BS:[,[,,"(?:242|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"242(?:3(?:02|[236][1-9]|4[0-24-9]|5[0-68]|7[347]|8[0-4]|9[2-467])|461|502|6(?:0[1-5]|12|2[013]|[45]0|7[67]|8[78]|9[89])|7(?:02|88))\\d{4}",,,,"2423456789",,,,[7]],[,,"242(?:3(?:5[79]|7[56]|95)|4(?:[23][1-9]|4[1-35-9]|5[1-8]|6[2-8]|7\\d|81)|5(?:2[45]|3[35]|44|5[1-46-9]|65|77)|6[34]6|7(?:27|38)|8(?:0[1-9]|1[02-9]|2\\d|3[0-4]|[89]9))\\d{4}",,,,"2423591234",,,,[7]],[,,"242300\\d{4}|8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456",,,,[7]],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"BS",1,"011","1",,,"([3-8]\\d{6})$|1","242$1",,,,,[,,,,,,,,,[-1]],,"242",[,,,,,,,,,[-1]],[,,"242225\\d{4}",,,,"2422250123"],,,[,,,,,,,,,[-1]]],BT:[,[,,"[178]\\d{7}|[2-8]\\d{6}",,,,,,,[7,8],[6]],[,,"(?:2[3-6]|[34][5-7]|5[236]|6[2-46]|7[246]|8[2-4])\\d{5}",,,,"2345678",,,[7],[6]],[,,"(?:1[67]|[78]7)\\d{6}",,,,"17123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BT",975,"00",,,,,,,,[[,"(\\d{3})(\\d{3})","$1 $2",["[2-7]"]],[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[2-6]|7[246]|8[2-4]"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[67]|[78]"]]],[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[2-6]|7[246]|8[2-4]"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[67]|[78]"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BW:[,[,,"(?:0800|(?:[37]|800)\\d)\\d{6}|(?:[2-6]\\d|90)\\d{5}",,,,,,,[7,8,10]],[,,"(?:2(?:4[0-48]|6[0-24]|9[0578])|3(?:1[0-35-9]|55|[69]\\d|7[013]|81)|4(?:6[03]|7[1267]|9[0-5])|5(?:3[03489]|4[0489]|7[1-47]|88|9[0-49])|6(?:2[1-35]|5[149]|8[013467]))\\d{4}",,,,"2401234",,,[7]],[,,"(?:321|7[1-8]\\d)\\d{5}",,,,"71123456",,,[8]],[,,"(?:0800|800\\d)\\d{6}",,,,"0800012345",,,[10]],[,,"90\\d{5}",,,,"9012345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"79(?:1(?:[0-2]\\d|3[0-8])|2[0-7]\\d)\\d{3}",,,,"79101234",,,[8]],"BW",267,"00",,,,,,,,[[,"(\\d{2})(\\d{5})","$1 $2",["90"]],[,"(\\d{3})(\\d{4})","$1 $2",["[24-6]|3[15-9]"]],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[37]"]],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["0"]],[,"(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BY:[,[,,"(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}",,,,,,,[6,7,8,9,10,11],[5]],[,,"(?:1(?:5(?:1[1-5]|[24]\\d|6[2-4]|9[1-7])|6(?:[235]\\d|4[1-7])|7\\d\\d)|2(?:1(?:[246]\\d|3[0-35-9]|5[1-9])|2(?:[235]\\d|4[0-8])|3(?:[26]\\d|3[02-79]|4[024-7]|5[03-7])))\\d{5}",,,,"152450911",,,[9],[5,6,7]],[,,"(?:2(?:5[5-79]|9[1-9])|(?:33|44)\\d)\\d{6}",,,,"294911911",,,[9]],[,,"800\\d{3,7}|8(?:0[13]|20\\d)\\d{7}",,,,"8011234567"],[,,"(?:810|902)\\d{7}",,,,"9021234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"249\\d{6}",,,,"249123456",,,[9]],"BY",375,"810","8",,,"0|80?",,"8~10",,[[,"(\\d{3})(\\d{3})","$1 $2",["800"],"8 $1"],[,"(\\d{3})(\\d{2})(\\d{2,4})","$1 $2 $3",["800"],"8 $1"],[,"(\\d{4})(\\d{2})(\\d{3})","$1 $2-$3",["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])","1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"],"8 0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["1(?:[56]|7[467])|2[1-3]"],"8 0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[1-4]"],"8 0$1"],[,"(\\d{3})(\\d{3,4})(\\d{4})","$1 $2 $3",["[89]"],"8 $1"]],,[,,,,,,,,,[-1]],,,[,,"800\\d{3,7}|(?:8(?:0[13]|10|20\\d)|902)\\d{7}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BZ:[,[,,"(?:0800\\d|[2-8])\\d{6}",,,,,,,[7,11]],[,,"(?:2(?:[02]\\d|36|[68]0)|[3-58](?:[02]\\d|[68]0)|7(?:[02]\\d|32|[68]0))\\d{4}",,,,"2221234",,,[7]],[,,"6[0-35-7]\\d{5}",,,,"6221234",,,[7]],[,,"0800\\d{7}",,,,"08001234123",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BZ",501,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[2-8]"]],[,"(\\d)(\\d{3})(\\d{4})(\\d{3})","$1-$2-$3-$4",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CA:[,[,,"[2-9]\\d{9}|3\\d{6}",,,,,,,[7,10]],[,,"(?:2(?:04|[23]6|[48]9|5[07]|63)|3(?:06|43|54|6[578]|82)|4(?:03|1[68]|[26]8|3[178]|50|74)|5(?:06|1[49]|48|79|8[147])|6(?:04|[18]3|39|47|72)|7(?:0[59]|42|53|78|8[02])|8(?:[06]7|19|25|7[39])|9(?:0[25]|42))[2-9]\\d{6}",,,,"5062345678",,,[10],[7]],[,,"(?:2(?:04|[23]6|[48]9|5[07]|63)|3(?:06|43|54|6[578]|82)|4(?:03|1[68]|[26]8|3[178]|50|74)|5(?:06|1[49]|48|79|8[147])|6(?:04|[18]3|39|47|72)|7(?:0[59]|42|53|78|8[02])|8(?:[06]7|19|25|7[39])|9(?:0[25]|42))[2-9]\\d{6}",,,,"5062345678",,,[10],[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456",,,[10]],[,,"900[2-9]\\d{6}",,,,"9002123456",,,[10]],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|(?:5(?:2[125-9]|33|44|66|77|88)|6(?:22|33))[2-9]\\d{6}",,,,"5219023456",,,[10]],[,,"600[2-9]\\d{6}",,,,"6002012345",,,[10]],"CA",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"310\\d{4}",,,,"3101234",,,[7]],,,[,,,,,,,,,[-1]]],CC:[,[,,"1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}",,,,,,,[6,7,8,9,10,12]],[,,"8(?:51(?:0(?:02|31|60|89)|1(?:18|76)|223)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:[06]8|22)|4[29]8|62\\d|70[23]|959))\\d{3}",,,,"891621234",,,[9],[8]],[,,"4(?:79[01]|83[0-389]|94[0-478])\\d{5}|4(?:[0-36]\\d|4[047-9]|[58][0-24-9]|7[02-8]|9[0-37-9])\\d{6}",,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"190[0-26]\\d{6}",,,,"1900123456",,,[10]],[,,"13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}",,,,"1300123456",,,[6,8,10,12]],[,,,,,,,,,[-1]],[,,"14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}",,,,"147101234",,,[9]],"CC",61,"001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","0",,,"([59]\\d{7})$|0","8$1","0011",,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CD:[,[,,"(?:(?:[189]|5\\d)\\d|2)\\d{7}|[1-68]\\d{6}",,,,,,,[7,8,9,10]],[,,"(?:(?:12|573)\\d\\d|276)\\d{5}|[1-6]\\d{6}",,,,"1234567"],[,,"88\\d{5}|(?:8[0-69]|9[017-9])\\d{7}",,,,"991234567",,,[7,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CD",243,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["88"],"0$1"],[,"(\\d{2})(\\d{5})","$1 $2",["[1-6]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["5"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CF:[,[,,"(?:[27]\\d{3}|8776)\\d{4}",,,,,,,[8]],[,,"2[12]\\d{6}",,,,"21612345"],[,,"7[024-7]\\d{6}",,,,"70012345"],[,,,,,,,,,[-1]],[,,"8776\\d{4}",,,,"87761234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CF",236,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[278]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CG:[,[,,"222\\d{6}|(?:0\\d|80)\\d{7}",,,,,,,[9]],[,,"222[1-589]\\d{5}",,,,"222123456"],[,,"026(?:1[0-5]|6[6-9])\\d{4}|0(?:[14-6]\\d\\d|2(?:40|5[5-8]|6[07-9]))\\d{5}",,,,"061234567"],[,,,,,,,,,[-1]],[,,"80[0-2]\\d{6}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CG",242,"00",,,,,,,,[[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["8"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[02]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CH:[,[,,"8\\d{11}|[2-9]\\d{8}",,,,,,,[9,12]],[,,"(?:2[12467]|3[1-4]|4[134]|5[256]|6[12]|[7-9]1)\\d{7}",,,,"212345678",,,[9]],[,,"(?:6[89]|7[235-9])\\d{7}",,,,"781234567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"90[016]\\d{6}",,,,"900123456",,,[9]],[,,"84[0248]\\d{6}",,,,"840123456",,,[9]],[,,"878\\d{6}",,,,"878123456",,,[9]],[,,,,,,,,,[-1]],"CH",41,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8[047]|90"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-79]|81"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["8"],"0$1"]],,[,,"74[0248]\\d{6}",,,,"740123456",,,[9]],,,[,,,,,,,,,[-1]],[,,"5[18]\\d{7}",,,,"581234567",,,[9]],,,[,,"860\\d{9}",,,,"860123456789",,,[12]]],CI:[,[,,"[02]\\d{9}",,,,,,,[10]],[,,"2(?:[15]\\d{3}|7(?:2(?:0[23]|1[2357]|2[245]|3[45]|4[3-5])|3(?:06|1[69]|[2-6]7)))\\d{5}",,,,"2123456789"],[,,"0[157]\\d{8}",,,,"0123456789"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CI",225,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d)(\\d{5})","$1 $2 $3 $4",["2"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3 $4",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CK:[,[,,"[2-578]\\d{4}",,,,,,,[5]],[,,"(?:2\\d|3[13-7]|4[1-5])\\d{3}",,,,"21234"],[,,"[578]\\d{4}",,,,"71234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CK",682,"00",,,,,,,,[[,"(\\d{2})(\\d{3})","$1 $2",["[2-578]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CL:[,[,,"12300\\d{6}|6\\d{9,10}|[2-9]\\d{8}",,,,,,,[9,10,11]],[,,"2(?:1982[0-6]|3314[05-9])\\d{3}|(?:2(?:1(?:160|962)|2\\d{3}|3(?:(?:2\\d|50)\\d|3(?:[03467]\\d|1[0-35-9]|2[1-9]|5[0-24-9]|8[0-389]|9[0-8])|600)|646[59])|(?:(?:3[2-5]|[47][1-35]|5[1-3578])\\d|6(?:00|[13-57]\\d)|8(?:0[1-9]|[1-9]\\d))\\d\\d|9(?:(?:10[01]|(?:[2458]\\d|7[1-9])\\d)\\d|3(?:[0-57-9]\\d\\d|6(?:0[02-9]|[1-9]\\d))|6(?:[0-8]\\d\\d|9(?:[02-79]\\d|1[05-9]))|9(?:[03-9]\\d\\d|1(?:[0235-9]\\d|4[0-24-9])|2(?:[0-79]\\d|8[0-46-9]))))\\d{4}",,,,"600123456",,,[9]],[,,"2(?:1982[0-6]|3314[05-9])\\d{3}|(?:2(?:1(?:160|962)|2\\d{3}|3(?:(?:2\\d|50)\\d|3(?:[03467]\\d|1[0-35-9]|2[1-9]|5[0-24-9]|8[0-389]|9[0-8])|600)|646[59])|(?:(?:3[2-5]|[47][1-35]|5[1-3578]|6[13-57])\\d|8(?:0[1-8]|[1-9]\\d))\\d\\d|9(?:(?:10[01]|(?:[2458]\\d|7[1-9])\\d)\\d|3(?:[0-57-9]\\d\\d|6(?:0[02-9]|[1-9]\\d))|6(?:[0-8]\\d\\d|9(?:[02-79]\\d|1[05-9]))|9(?:[03-9]\\d\\d|1(?:[0235-9]\\d|4[0-24-9])|2(?:[0-79]\\d|8[0-46-9]))))\\d{4}",,,,"221234567",,,[9]],[,,"(?:123|8)00\\d{6}",,,,"800123456",,,[9,11]],[,,,,,,,,,[-1]],[,,"600\\d{7,8}",,,,"6001234567",,,[10,11]],[,,,,,,,,,[-1]],[,,"44\\d{7}",,,,"441234567",,,[9]],"CL",56,"(?:0|1(?:1[0-69]|2[02-5]|5[13-58]|69|7[0167]|8[018]))0",,,,,,,,[[,"(\\d{4})","$1",["1(?:[03-589]|21)|[29]0|78"]],[,"(\\d{5})(\\d{4})","$1 $2",["219","2196"],"($1)"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["60|809"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["44"]],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[1-36]"],"($1)"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["9(?:10|[2-9])"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-8]|[1-9])"],"($1)"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["60|8"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",["60"]]],[[,"(\\d{5})(\\d{4})","$1 $2",["219","2196"],"($1)"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["60|809"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["44"]],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[1-36]"],"($1)"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["9(?:10|[2-9])"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-8]|[1-9])"],"($1)"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["60|8"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",["60"]]],[,,,,,,,,,[-1]],,,[,,"600\\d{7,8}",,,,,,,[10,11]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CM:[,[,,"[26]\\d{8}|88\\d{6,7}",,,,,,,[8,9]],[,,"2(?:22|33)\\d{6}",,,,"222123456",,,[9]],[,,"(?:24[23]|6(?:[25-9]\\d|40))\\d{6}",,,,"671234567",,,[9]],[,,"88\\d{6,7}",,,,"88012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CM",237,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["88"]],[,"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[26]|88"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CN:[,[,,"(?:(?:1[03-689]|2\\d)\\d\\d|6)\\d{8}|1\\d{10}|[126]\\d{6}(?:\\d(?:\\d{2})?)?|86\\d{5,6}|(?:[3-579]\\d|8[0-57-9])\\d{5,9}",,,,,,,[7,8,9,10,11,12],[5,6]],[,,"(?:10(?:[02-79]\\d\\d|[18](?:0[1-9]|[1-9]\\d))|2(?:[02-57-9]\\d{3}|1(?:[18](?:0[1-9]|[1-9]\\d)|[2-79]\\d\\d))|(?:41[03]|8078|9(?:78|94))\\d\\d)\\d{5}|(?:10|2[0-57-9])(?:1(?:00|23)\\d\\d|95\\d{3,4})|(?:41[03]|9(?:78|94))(?:100\\d\\d|95\\d{3,4})|8078123|(?:43[35]|754|851)\\d{7,8}|(?:43[35]|754|851)(?:1(?:00\\d|23)\\d|95\\d{3,4})|(?:3(?:11|7[179])|4(?:[15]1|3[12])|5(?:1\\d|2[37]|3[12]|51|7[13-79]|9[15])|7(?:[39]1|5[57]|6[09])|8(?:71|98))(?:[02-8]\\d{7}|1(?:0(?:0\\d\\d(?:\\d{3})?|[1-9]\\d{5})|[13-9]\\d{6}|2(?:[0-24-9]\\d{5}|3\\d(?:\\d{4})?))|9(?:[0-46-9]\\d{6}|5\\d{3}(?:\\d(?:\\d{2})?)?))|(?:3(?:1[02-9]|35|49|5\\d|7[02-68]|9[1-68])|4(?:1[24-9]|2[179]|3[46-9]|5[2-9]|6[47-9]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[17]\\d|2[248]|3[04-9]|4[3-6]|5[0-3689]|6[2368]|9[02-9])|8(?:1[236-8]|2[5-7]|3\\d|5[2-9]|7[02-9]|8[36-8]|9[1-7])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))(?:[02-8]\\d{6}|1(?:0(?:0\\d\\d(?:\\d{2})?|[1-9]\\d{4})|[13-9]\\d{5}|2(?:[0-24-9]\\d{4}|3\\d(?:\\d{3})?))|9(?:[0-46-9]\\d{5}|5\\d{3,5}))",,,,"1012345678",,,[7,8,9,10,11],[5,6]],[,,"1740[0-5]\\d{6}|1(?:[38]\\d|4[57]|[59][0-35-9]|6[25-7]|7[0-35-8])\\d{8}",,,,"13123456789",,,[11]],[,,"(?:(?:10|21)8|8)00\\d{7}",,,,"8001234567",,,[10,12]],[,,"16[08]\\d{5}",,,,"16812345",,,[8]],[,,"10(?:10\\d{4}|96\\d{3,4})|400\\d{7}|950\\d{7,8}|(?:2[0-57-9]|3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))96\\d{3,4}",,,,"4001234567",,,[7,8,9,10,11],[5,6]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CN",86,"00|1(?:[12]\\d|79)\\d\\d00","0",,,"(1(?:[12]\\d|79)\\d\\d)|0",,"00",,[[,"(\\d{5,6})","$1",["1(?:00|2[13])|9[56]","1(?:00|2(?:1|39))|9[56]","1(?:00|2(?:1|395))|9[56]"]],[,"(\\d{5,6})","$1",["1(?:0|23)|781|[1-9]12","1(?:0|23)|7812|[1-9]123","1(?:0|23(?:[0-8]|9[0-46-9]))|78123|[1-9]123"]],[,"(\\d{2})(\\d{5,6})","$1 $2",["(?:10|2[0-57-9])[19]|3(?:[157]|35|49|9[1-68])|4(?:1[124-9]|2[179]|6[47-9]|7|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:07|1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3|4[13]|5[1-5]|7[0-79]|9[0-35-9])|(?:4[35]|59|85)[1-9]","(?:10|2[0-57-9])(?:1[02]|9[56])|8078|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))1","10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|80781|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))12","10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|807812|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))123","10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:078|1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))123"],"0$1","$CC $1"],[,"(\\d{3})(\\d{4})","$1 $2",["[1-9]","1[1-9]|26|[3-9]|(?:10|2[0-57-9])(?:[0-8]|9[0-47-9])","1(?:0(?:[02-8]|1(?:[013-9]|2[0-24-9])|9[0-47-9])|[1-9])|2(?:[0-57-9](?:[02-8]|1(?:0[1-9]|[13-9]|2[0-24-9])|9[0-47-9])|6)|[3-9]","1(?:0(?:[02-8]|1(?:[013-9]|2[0-24-9])|9[0-47-9])|[1-9])|2(?:[0-57-9](?:[02-8]|1(?:0[1-9]|[13-9]|2[0-24-9])|9[0-47-9])|6)|3(?:[0268]|3[0-46-9]|4[0-8]|9[079])|4(?:[049]|1[03]|2[02-68]|[35]0|6[0-356]|8[014-9])|5(?:0|2[0-24-689]|4[0-2457-9]|6[057-9]|8[1-9]|90)|6(?:[0-24578]|3[06-9]|6[14-79]|9[03-9])|7(?:0[02-9]|2[0135-79]|3[23]|4[0-27-9]|6[1457]|8)|8(?:[046]|1[01459]|2[0-489]|50|8[0-2459]|9[09])|9(?:0[0457]|1[08]|[268]|4[024-9]|5[06-9]|78|94)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))(?:[02-9]|1(?:[013-9]|2[0-24-9]))","1(?:0(?:[02-8]|1(?:[013-9]|2[0-24-9])|9[0-47-9])|[1-9])|2(?:[0-57-9](?:[02-8]|1(?:0[1-9]|[13-9]|2[0-24-9])|9[0-47-9])|6)|3(?:[0268]|3[0-46-9]|4[0-8]|9[079])|4(?:[049]|1[03]|2[02-68]|[35]0|6[0-356]|8[014-9])|5(?:0|2[0-24-689]|4[0-2457-9]|6[057-9]|8[1-9]|90)|6(?:[0-24578]|3[06-9]|6[14-79]|9[03-9])|7(?:0[02-9]|2[0135-79]|3[23]|4[0-27-9]|6[1457]|8)|8(?:0(?:[0-689]|7[0-79])|1[01459]|2[0-489]|[46]|50|8[0-2459]|9[09])|9(?:0[0457]|1[08]|[268]|4[024-9]|5[06-9]|78|94)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:078|1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))(?:[02-9]|1(?:[013-9]|2[0-24-9]))"]],[,"(\\d{4})(\\d{4})","$1 $2",["16[08]"]],[,"(\\d{3})(\\d{5,6})","$1 $2",["3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]","(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]","85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])","85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"],"0$1","$CC $1"],[,"(\\d{4})(\\d{4})","$1 $2",["[1-9]","1(?:0(?:[02-8]|1[1-9]|9[0-47-9])|[1-9])|2(?:[0-57-9](?:[0-8]|9[0-47-9])|6)|[3-9]","1(?:0(?:[02-8]|1[1-9]|9[0-47-9])|[1-9])|26|3(?:[0268]|4[0-8]|9[079])|4(?:[049]|2[02-68]|[35]0|6[0-356]|8[014-9])|5(?:0|2[0-24-689]|4[0-2457-9]|6[057-9]|8[1-9]|90)|6(?:[0-24578]|3[06-9]|6[14-79]|9[03-9])|7(?:0[02-9]|2[0135-79]|3[23]|4[0-27-9]|6[1457]|8)|8(?:[046]|1[01459]|2[0-489]|5(?:0|[23][0-8])|8[0-2459]|9[09])|9(?:0[0457]|1[08]|[268]|4[024-9]|5[06-9])|(?:33|85[23]9)[0-46-9]|(?:2[0-57-9]|3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:[0-8]|9[0-47-9])","1(?:0[02-8]|[1-9])|2(?:[0-57-9][0-8]|6)|3(?:[0268]|3[0-46-9]|4[0-8]|9[079])|4(?:[049]|2[02-68]|[35]0|6[0-356]|8[014-9])|5(?:0|2[0-24-689]|4[0-2457-9]|6[057-9]|90)|6(?:[0-24578]|3[06-9]|6[14-79]|9[03-9])|7(?:0[02-9]|2[0135-79]|3[23]|4[0-27-9]|6[1457]|8)|8(?:[046]|1[01459]|2[0-489]|5(?:0|[23](?:[02-8]|1[1-9]|9[0-46-9]))|8[0-2459]|9[09])|9(?:0[0457]|1[08]|[268]|4[024-9]|5[06-9])|(?:10|2[0-57-9])9[0-47-9]|(?:101|58|85[23]10)[1-9]|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:[02-8]|1(?:0[1-9]|[1-9])|9[0-47-9])"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["(?:4|80)0"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["10|2(?:[02-57-9]|1[1-9])","10|2(?:[02-57-9]|1[1-9])","10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{7,8})","$1 $2",["9"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["80"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[3-578]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1[3-9]"],,"$CC $1"],[,"(\\d{2})(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3 $4",["[12]"],"0$1",,1]],[[,"(\\d{2})(\\d{5,6})","$1 $2",["(?:10|2[0-57-9])[19]|3(?:[157]|35|49|9[1-68])|4(?:1[124-9]|2[179]|6[47-9]|7|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:07|1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3|4[13]|5[1-5]|7[0-79]|9[0-35-9])|(?:4[35]|59|85)[1-9]","(?:10|2[0-57-9])(?:1[02]|9[56])|8078|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))1","10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|80781|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))12","10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|807812|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))123","10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:078|1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))123"],"0$1","$CC $1"],[,"(\\d{3})(\\d{5,6})","$1 $2",["3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]","(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]","85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])","85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"],"0$1","$CC $1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["(?:4|80)0"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["10|2(?:[02-57-9]|1[1-9])","10|2(?:[02-57-9]|1[1-9])","10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{7,8})","$1 $2",["9"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["80"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[3-578]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1[3-9]"],,"$CC $1"],[,"(\\d{2})(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3 $4",["[12]"],"0$1",,1]],[,,,,,,,,,[-1]],,,[,,"(?:(?:10|21)8|[48])00\\d{7}|950\\d{7,8}",,,,,,,[10,11,12]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CO:[,[,,"(?:46|60\\d\\d)\\d{6}|(?:1\\d|[39])\\d{9}",,,,,,,[8,10,11],[4,7]],[,,"601055(?:[0-4]\\d|50)\\d\\d|6010(?:[0-4]\\d|5[0-4])\\d{4}|(?:46|60(?:[18][1-9]|[24-7][2-9]))\\d{6}",,,,"6012345678",,,[8,10],[4,7]],[,,"333301[0-5]\\d{3}|3333(?:00|2[5-9]|[3-9]\\d)\\d{4}|(?:3(?:(?:0[0-5]|1\\d|5[01]|70)\\d|2(?:[0-3]\\d|4[1-9])|3(?:00|3[0-24-9]))|9(?:101|408))\\d{6}",,,,"3211234567",,,[10]],[,,"1800\\d{7}",,,,"18001234567",,,[11]],[,,"(?:19(?:0[01]|4[78])|901)\\d{7}",,,,"19001234567",,,[10,11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CO",57,"00(?:4(?:[14]4|56)|[579])","0",,,"0([3579]|4(?:[14]4|56))?",,,,[[,"(\\d{4})(\\d{4})","$1 $2",["46"]],[,"(\\d{3})(\\d{7})","$1 $2",["6|90"],"($1)","0$CC $1"],[,"(\\d{3})(\\d{7})","$1 $2",["3[0-357]|9[14]"],,"0$CC $1"],[,"(\\d)(\\d{3})(\\d{7})","$1-$2-$3",["1"],"0$1"]],[[,"(\\d{4})(\\d{4})","$1 $2",["46"]],[,"(\\d{3})(\\d{7})","$1 $2",["6|90"],"($1)","0$CC $1"],[,"(\\d{3})(\\d{7})","$1 $2",["3[0-357]|9[14]"],,"0$CC $1"],[,"(\\d)(\\d{3})(\\d{7})","$1 $2 $3",["1"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CR:[,[,,"(?:8\\d|90)\\d{8}|(?:[24-8]\\d{3}|3005)\\d{4}",,,,,,,[8,10]],[,,"210[7-9]\\d{4}|2(?:[024-7]\\d|1[1-9])\\d{5}",,,,"22123456",,,[8]],[,,"(?:3005\\d|6500[01])\\d{3}|(?:5[07]|6[0-4]|7[0-3]|8[3-9])\\d{6}",,,,"83123456",,,[8]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"90[059]\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:210[0-6]|4\\d{3}|5100)\\d{4}",,,,"40001234",,,[8]],"CR",506,"00",,,,"(19(?:0[0-2468]|1[09]|20|66|77|99))",,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[2-7]|8[3-9]"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[89]"],,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CU:[,[,,"(?:[2-7]|8\\d\\d)\\d{7}|[2-47]\\d{6}|[34]\\d{5}",,,,,,,[6,7,8,10],[4,5]],[,,"(?:3[23]|4[89])\\d{4,6}|(?:31|4[36]|8(?:0[25]|78)\\d)\\d{6}|(?:2[1-4]|4[1257]|7\\d)\\d{5,6}",,,,"71234567",,,,[4,5]],[,,"(?:5\\d|6[2-4])\\d{6}",,,,"51234567",,,[8]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,,,,,,,,[-1]],[,,"807\\d{7}",,,,"8071234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CU",53,"119","0",,,"0",,,,[[,"(\\d{2})(\\d{4,6})","$1 $2",["2[1-4]|[34]"],"(0$1)"],[,"(\\d)(\\d{6,7})","$1 $2",["7"],"(0$1)"],[,"(\\d)(\\d{7})","$1 $2",["[56]"],"0$1"],[,"(\\d{3})(\\d{7})","$1 $2",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CV:[,[,,"(?:[2-59]\\d\\d|800)\\d{4}",,,,,,,[7]],[,,"2(?:2[1-7]|3[0-8]|4[12]|5[1256]|6\\d|7[1-3]|8[1-5])\\d{4}",,,,"2211234"],[,,"(?:36|5[1-389]|9\\d)\\d{5}",,,,"9911234"],[,,"800\\d{4}",,,,"8001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:3[3-5]|4[356])\\d{5}",,,,"3401234"],"CV",238,"0",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[2-589]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CW:[,[,,"(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}",,,,,,,[7,8]],[,,"9(?:4(?:3[0-5]|4[14]|6\\d)|50\\d|7(?:2[014]|3[02-9]|4[4-9]|6[357]|77|8[7-9])|8(?:3[39]|[46]\\d|7[01]|8[57-9]))\\d{4}",,,,"94351234"],[,,"953[01]\\d{4}|9(?:5[12467]|6[5-9])\\d{5}",,,,"95181234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"60[0-2]\\d{4}",,,,"6001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CW",599,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[3467]"]],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["9[4-8]"]]],,[,,"955\\d{5}",,,,"95581234",,,[8]],1,"[69]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CX:[,[,,"1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}",,,,,,,[6,7,8,9,10,12]],[,,"8(?:51(?:0(?:01|30|59|88)|1(?:17|46|75)|2(?:22|35))|91(?:00[6-9]|1(?:[28]1|49|78)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}",,,,"891641234",,,[9],[8]],[,,"4(?:79[01]|83[0-389]|94[0-478])\\d{5}|4(?:[0-36]\\d|4[047-9]|[58][0-24-9]|7[02-8]|9[0-37-9])\\d{6}",,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"190[0-26]\\d{6}",,,,"1900123456",,,[10]],[,,"13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}",,,,"1300123456",,,[6,8,10,12]],[,,,,,,,,,[-1]],[,,"14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}",,,,"147101234",,,[9]],"CX",61,"001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","0",,,"([59]\\d{7})$|0","8$1","0011",,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CY:[,[,,"(?:[279]\\d|[58]0)\\d{6}",,,,,,,[8]],[,,"2[2-6]\\d{6}",,,,"22345678"],[,,"9(?:10|[4-79]\\d)\\d{5}",,,,"96123456"],[,,"800\\d{5}",,,,"80001234"],[,,"90[09]\\d{5}",,,,"90012345"],[,,"80[1-9]\\d{5}",,,,"80112345"],[,,"700\\d{5}",,,,"70012345"],[,,,,,,,,,[-1]],"CY",357,"00",,,,,,,,[[,"(\\d{2})(\\d{6})","$1 $2",["[257-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:50|77)\\d{6}",,,,"77123456"],,,[,,,,,,,,,[-1]]],CZ:[,[,,"(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}",,,,,,,[9,10,11,12]],[,,"(?:2\\d|3[1257-9]|4[16-9]|5[13-9])\\d{7}",,,,"212345678",,,[9]],[,,"7(?:060\\d|19(?:[0-4]\\d|50))\\d{4}|(?:60[1-8]|7(?:0[2-5]|[2379]\\d))\\d{6}",,,,"601123456",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"9(?:0[05689]|76)\\d{6}",,,,"900123456",,,[9]],[,,"8[134]\\d{7}",,,,"811234567",,,[9]],[,,"70[01]\\d{6}",,,,"700123456",,,[9]],[,,"9[17]0\\d{6}",,,,"910123456",,,[9]],"CZ",420,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8]|9[015-7]"]],[,"(\\d{2})(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3 $4",["96"]],[,"(\\d{2})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"9(?:5\\d|7[2-4])\\d{6}",,,,"972123456",,,[9]],,,[,,"9(?:3\\d{9}|6\\d{7,10})",,,,"93123456789"]],DE:[,[,,"[2579]\\d{5,14}|49(?:[34]0|69|8\\d)\\d\\d?|49(?:37|49|60|7[089]|9\\d)\\d{1,3}|49(?:2[024-9]|3[2-689]|7[1-7])\\d{1,8}|(?:1|[368]\\d|4[0-8])\\d{3,13}|49(?:[015]\\d|2[13]|31|[46][1-8])\\d{1,9}",,,,,,,[4,5,6,7,8,9,10,11,12,13,14,15],[2,3]],[,,"32\\d{9,11}|49[1-6]\\d{10}|322\\d{6}|49[0-7]\\d{3,9}|(?:[34]0|[68]9)\\d{3,13}|(?:2(?:0[1-689]|[1-3569]\\d|4[0-8]|7[1-7]|8[0-7])|3(?:[3569]\\d|4[0-79]|7[1-7]|8[1-8])|4(?:1[02-9]|[2-48]\\d|5[0-6]|6[0-8]|7[0-79])|5(?:0[2-8]|[124-6]\\d|[38][0-8]|[79][0-7])|6(?:0[02-9]|[1-358]\\d|[47][0-8]|6[1-9])|7(?:0[2-8]|1[1-9]|[27][0-7]|3\\d|[4-6][0-8]|8[0-5]|9[013-7])|8(?:0[2-9]|1[0-79]|2\\d|3[0-46-9]|4[0-6]|5[013-9]|6[1-8]|7[0-8]|8[0-24-6])|9(?:0[6-9]|[1-4]\\d|[589][0-7]|6[0-8]|7[0-467]))\\d{3,12}",,,,"30123456",,,[5,6,7,8,9,10,11,12,13,14,15],[2,3,4]],[,,"1(?:(?:5(?:[0-25-9]\\d\\d|3(?:10|33))|7[26-9]\\d\\d)\\d{6}|6[023]\\d{7,8})|17\\d{8}",,,,"15123456789",,,[10,11]],[,,"800\\d{7,12}",,,,"8001234567890",,,[10,11,12,13,14,15]],[,,"(?:137[7-9]|900(?:[135]|9\\d))\\d{6}",,,,"9001234567",,,[10,11]],[,,"180\\d{5,11}|13(?:7[1-6]\\d\\d|8)\\d{4}",,,,"18012345",,,[7,8,9,10,11,12,13,14]],[,,"700\\d{8}",,,,"70012345678",,,[11]],[,,,,,,,,,[-1]],"DE",49,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3,13})","$1 $2",["3[02]|40|[68]9"],"0$1"],[,"(\\d{6})","$1",["227","2277"]],[,"(\\d{3})(\\d{3,12})","$1 $2",["2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1","2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1"],"0$1"],[,"(\\d{4})(\\d{2,11})","$1 $2",["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]","[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["138"],"0$1"],[,"(\\d{5})(\\d{2,10})","$1 $2",["3"],"0$1"],[,"(\\d{3})(\\d{5,11})","$1 $2",["181"],"0$1"],[,"(\\d{3})(\\d)(\\d{4,10})","$1 $2 $3",["1(?:3|80)|9"],"0$1"],[,"(\\d{3})(\\d{7,8})","$1 $2",["1[67]"],"0$1"],[,"(\\d{3})(\\d{7,12})","$1 $2",["8"],"0$1"],[,"(\\d{5})(\\d{6})","$1 $2",["185","1850","18500"],"0$1"],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["7"],"0$1"],[,"(\\d{4})(\\d{7})","$1 $2",["18[68]"],"0$1"],[,"(\\d{4})(\\d{7})","$1 $2",["15[1279]"],"0$1"],[,"(\\d{5})(\\d{6})","$1 $2",["15[03568]","15(?:[0568]|3[13])"],"0$1"],[,"(\\d{3})(\\d{8})","$1 $2",["18"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{7,8})","$1 $2 $3",["1(?:6[023]|7)"],"0$1"],[,"(\\d{4})(\\d{2})(\\d{7})","$1 $2 $3",["15[279]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{8})","$1 $2 $3",["15"],"0$1"]],[[,"(\\d{2})(\\d{3,13})","$1 $2",["3[02]|40|[68]9"],"0$1"],[,"(\\d{3})(\\d{3,12})","$1 $2",["2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1","2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1"],"0$1"],[,"(\\d{4})(\\d{2,11})","$1 $2",["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]","[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["138"],"0$1"],[,"(\\d{5})(\\d{2,10})","$1 $2",["3"],"0$1"],[,"(\\d{3})(\\d{5,11})","$1 $2",["181"],"0$1"],[,"(\\d{3})(\\d)(\\d{4,10})","$1 $2 $3",["1(?:3|80)|9"],"0$1"],[,"(\\d{3})(\\d{7,8})","$1 $2",["1[67]"],"0$1"],[,"(\\d{3})(\\d{7,12})","$1 $2",["8"],"0$1"],[,"(\\d{5})(\\d{6})","$1 $2",["185","1850","18500"],"0$1"],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["7"],"0$1"],[,"(\\d{4})(\\d{7})","$1 $2",["18[68]"],"0$1"],[,"(\\d{4})(\\d{7})","$1 $2",["15[1279]"],"0$1"],[,"(\\d{5})(\\d{6})","$1 $2",["15[03568]","15(?:[0568]|3[13])"],"0$1"],[,"(\\d{3})(\\d{8})","$1 $2",["18"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{7,8})","$1 $2 $3",["1(?:6[023]|7)"],"0$1"],[,"(\\d{4})(\\d{2})(\\d{7})","$1 $2 $3",["15[279]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{8})","$1 $2 $3",["15"],"0$1"]],[,,"16(?:4\\d{1,10}|[89]\\d{1,11})",,,,"16412345",,,[4,5,6,7,8,9,10,11,12,13,14]],,,[,,,,,,,,,[-1]],[,,"18(?:1\\d{5,11}|[2-9]\\d{8})",,,,"18500123456",,,[8,9,10,11,12,13,14]],,,[,,"1(?:6(?:013|255|399)|7(?:(?:[015]1|[69]3)3|[2-4]55|[78]99))\\d{7,8}|15(?:(?:[03-68]00|113)\\d|2\\d55|7\\d99|9\\d33)\\d{7}",,,,"177991234567",,,[12,13]]],DJ:[,[,,"(?:2\\d|77)\\d{6}",,,,,,,[8]],[,,"2(?:1[2-5]|7[45])\\d{5}",,,,"21360003"],[,,"77\\d{6}",,,,"77831001"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"DJ",253,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[27]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],DK:[,[,,"[2-9]\\d{7}",,,,,,,[8]],[,,"(?:2(?:[0-59][1-9]|[6-8]\\d)|3(?:[0-3][1-9]|4[13]|5[1-58]|6[1347-9]|7\\d|8[1-8]|9[1-79])|4(?:[0-25][1-9]|[34][2-9]|6[13-579]|7[13579]|8[1-47]|9[127])|5(?:[0-36][1-9]|4[146-9]|5[3-57-9]|7[568]|8[1-358]|9[1-69])|6(?:[0135][1-9]|2[1-68]|4[2-8]|6[1689]|[78]\\d|9[15689])|7(?:[0-69][1-9]|7[3-9]|8[147])|8(?:[16-9][1-9]|2[1-58])|9(?:[1-47-9][1-9]|6\\d))\\d{5}",,,,"32123456"],[,,"(?:2[6-8]|37|6[78]|96)\\d{6}|(?:2[0-59]|3[0-689]|[457]\\d|6[0-69]|8[126-9]|9[1-47-9])[1-9]\\d{5}",,,,"34412345"],[,,"80\\d{6}",,,,"80123456"],[,,"90\\d{6}",,,,"90123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"DK",45,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],DM:[,[,,"(?:[58]\\d\\d|767|900)\\d{7}",,,,,,,[10],[7]],[,,"767(?:2(?:55|66)|4(?:2[01]|4[0-25-9])|50[0-4])\\d{4}",,,,"7674201234",,,,[7]],[,,"767(?:2(?:[2-4689]5|7[5-7])|31[5-7]|61[1-8]|70[1-6])\\d{4}",,,,"7672251234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"DM",1,"011","1",,,"([2-7]\\d{6})$|1","767$1",,,,,[,,,,,,,,,[-1]],,"767",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],DO:[,[,,"(?:[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"8(?:[04]9[2-9]\\d\\d|29(?:2(?:[0-59]\\d|6[04-9]|7[0-27]|8[0237-9])|3(?:[0-35-9]\\d|4[7-9])|[45]\\d\\d|6(?:[0-27-9]\\d|[3-5][1-9]|6[0135-8])|7(?:0[013-9]|[1-37]\\d|4[1-35689]|5[1-4689]|6[1-57-9]|8[1-79]|9[1-8])|8(?:0[146-9]|1[0-48]|[248]\\d|3[1-79]|5[01589]|6[013-68]|7[124-8]|9[0-8])|9(?:[0-24]\\d|3[02-46-9]|5[0-79]|60|7[0169]|8[57-9]|9[02-9])))\\d{4}",,,,"8092345678",,,,[7]],[,,"8[024]9[2-9]\\d{6}",,,,"8092345678",,,,[7]],[,,"800(?:14|[2-9]\\d)\\d{5}|8[024]9[01]\\d{6}|8(?:33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"DO",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"8001|8[024]9",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],DZ:[,[,,"(?:[1-4]|[5-79]\\d|80)\\d{7}",,,,,,,[8,9]],[,,"9619\\d{5}|(?:1\\d|2[013-79]|3[0-8]|4[013-689])\\d{6}",,,,"12345678"],[,,"(?:5(?:4[0-29]|5\\d|6[0-3])|6(?:[569]\\d|7[0-6])|7[7-9]\\d)\\d{6}",,,,"551234567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"80[3-689]1\\d{5}",,,,"808123456",,,[9]],[,,"80[12]1\\d{5}",,,,"801123456",,,[9]],[,,,,,,,,,[-1]],[,,"98[23]\\d{6}",,,,"983123456",,,[9]],"DZ",213,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1-4]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-8]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],EC:[,[,,"1\\d{9,10}|(?:[2-7]|9\\d)\\d{7}",,,,,,,[8,9,10,11],[7]],[,,"[2-7][2-7]\\d{6}",,,,"22123456",,,[8],[7]],[,,"964[0-2]\\d{5}|9(?:39|[57][89]|6[0-36-9]|[89]\\d)\\d{6}",,,,"991234567",,,[9]],[,,"1800\\d{7}|1[78]00\\d{6}",,,,"18001234567",,,[10,11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"[2-7]890\\d{4}",,,,"28901234",,,[8]],"EC",593,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[2-7]"]],[,"(\\d)(\\d{3})(\\d{4})","$1 $2-$3",["[2-7]"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["9"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3,4})","$1 $2 $3",["1"]]],[[,"(\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[2-7]"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["9"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3,4})","$1 $2 $3",["1"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],EE:[,[,,"8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d|90)\\d{5}",,,,,,,[7,8,10]],[,,"(?:3[23589]|4[3-8]|6\\d|7[1-9]|88)\\d{5}",,,,"3212345",,,[7]],[,,"(?:5\\d{5}|8(?:1(?:0(?:0(?:00|[178]\\d)|[3-9]\\d\\d)|(?:1(?:0[2-6]|1\\d)|(?:2[0-59]|[3-79]\\d)\\d)\\d)|2(?:0(?:0(?:00|4\\d)|(?:19|[2-7]\\d)\\d)|(?:(?:[124-69]\\d|3[5-9])\\d|7(?:[0-79]\\d|8[13-9])|8(?:[2-6]\\d|7[01]))\\d)|[349]\\d{4}))\\d\\d|5(?:(?:[02]\\d|5[0-478])\\d|1(?:[0-8]\\d|95)|6(?:4[0-4]|5[1-589]))\\d{3}",,,,"51234567",,,[7,8]],[,,"800(?:(?:0\\d\\d|1)\\d|[2-9])\\d{3}",,,,"80012345"],[,,"(?:40\\d\\d|900)\\d{4}",,,,"9001234",,,[7,8]],[,,,,,,,,,[-1]],[,,"70[0-2]\\d{5}",,,,"70012345",,,[8]],[,,,,,,,,,[-1]],"EE",372,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]|88","[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]|88"]],[,"(\\d{4})(\\d{3,4})","$1 $2",["[45]|8(?:00|[1-49])","[45]|8(?:00[1-9]|[1-49])"]],[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["7"]],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["8"]]],,[,,,,,,,,,[-1]],,,[,,"800[2-9]\\d{3}",,,,,,,[7]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],EG:[,[,,"[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}",,,,,,,[8,9,10],[6,7]],[,,"13[23]\\d{6}|(?:15|57)\\d{6,7}|(?:2\\d|3|4[05-8]|5[05]|6[24-689]|8[2468]|9[235-7])\\d{7}",,,,"234567890",,,[8,9],[6,7]],[,,"1[0-25]\\d{8}",,,,"1001234567",,,[10]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"900\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"EG",20,"00","0",,,"0",,,,[[,"(\\d)(\\d{7,8})","$1 $2",["[23]"],"0$1"],[,"(\\d{2})(\\d{6,7})","$1 $2",["1[35]|[4-6]|8[2468]|9[235-7]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]"],"0$1"],[,"(\\d{2})(\\d{8})","$1 $2",["1"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],EH:[,[,,"[5-8]\\d{8}",,,,,,,[9]],[,,"528[89]\\d{5}",,,,"528812345"],[,,"(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[0167]\\d|2[0-8]|5[0-5]|8[0-7]))\\d{6}",,,,"650123456"],[,,"80[0-7]\\d{6}",,,,"801234567"],[,,"89\\d{7}",,,,"891234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:592(?:4[0-2]|93)|80[89]\\d\\d)\\d{4}",,,,"592401234"],"EH",212,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,"528[89]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ER:[,[,,"[178]\\d{6}",,,,,,,[7],[6]],[,,"(?:1(?:1[12568]|[24]0|55|6[146])|8\\d\\d)\\d{4}",,,,"8370362",,,,[6]],[,,"(?:17[1-3]|7\\d\\d)\\d{4}",,,,"7123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ER",291,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[178]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ES:[,[,,"[5-9]\\d{8}",,,,,,,[9]],[,,"96906(?:0[0-8]|1[1-9]|[2-9]\\d)\\d\\d|9(?:69(?:0[0-57-9]|[1-9]\\d)|73(?:[0-8]\\d|9[1-9]))\\d{4}|(?:8(?:[1356]\\d|[28][0-8]|[47][1-9])|9(?:[135]\\d|[268][0-8]|4[1-9]|7[124-9]))\\d{6}",,,,"810123456"],[,,"(?:590[16]00\\d|9(?:6906(?:09|10)|7390\\d\\d))\\d\\d|(?:6\\d|7[1-48])\\d{7}",,,,"612345678"],[,,"[89]00\\d{6}",,,,"800123456"],[,,"80[367]\\d{6}",,,,"803123456"],[,,"90[12]\\d{6}",,,,"901123456"],[,,"70\\d{7}",,,,"701234567"],[,,,,,,,,,[-1]],"ES",34,"00",,,,,,,,[[,"(\\d{4})","$1",["905"]],[,"(\\d{6})","$1",["[79]9"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]00"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-9]"]]],[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]00"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-9]"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"51\\d{7}",,,,"511234567"],,,[,,,,,,,,,[-1]]],ET:[,[,,"(?:11|[2-579]\\d)\\d{7}",,,,,,,[9],[7]],[,,"11667[01]\\d{3}|(?:11(?:1(?:1[1-468]|2[2-7]|3[1-5]|5[5-8]|8[6-8])|2(?:13|3[6-8]|5[89]|7[05-9]|8[2-6])|3(?:2[01]|3[0-289]|4[1289]|7[1-4]|87)|4(?:1[69]|3[2-49]|4[0-3]|6[5-8]|7\\d)|5(?:1[578]|44|5[0-4])|6(?:1[578]|2[69]|39|4[5-7]|5[0-5]|6[0-59]|8[015-8]))|2(?:2(?:11[1-9]|22[0-7]|33\\d|44[1467]|66[1-68])|5(?:11[124-6]|33[2-8]|44[1467]|55[14]|66[1-3679]|77[124-79]|880))|3(?:3(?:11[0-46-8]|(?:22|55)[0-6]|33[0134689]|44[04]|66[01467])|4(?:44[0-8]|55[0-69]|66[0-3]|77[1-5]))|4(?:6(?:119|22[0-24-7]|33[1-5]|44[13-69]|55[14-689]|660|88[1-4])|7(?:(?:11|22)[1-9]|33[13-7]|44[13-6]|55[1-689]))|5(?:7(?:227|55[05]|(?:66|77)[14-8])|8(?:11[149]|22[013-79]|33[0-68]|44[013-8]|550|66[1-5]|77\\d)))\\d{4}",,,,"111112345",,,,[7]],[,,"700[1-9]\\d{5}|(?:7(?:0[1-9]|1[0-8]|22|77|86|99)|9\\d\\d)\\d{6}",,,,"911234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ET",251,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-579]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FI:[,[,,"[1-35689]\\d{4}|7\\d{10,11}|(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}",,,,,,,[5,6,7,8,9,10,11,12]],[,,"1[3-7][1-8]\\d{3,6}|(?:19[1-8]|[23568][1-8]\\d|9(?:00|[1-8]\\d))\\d{2,6}",,,,"131234567",,,[5,6,7,8,9]],[,,"4946\\d{2,6}|(?:4[0-8]|50)\\d{4,8}",,,,"412345678",,,[6,7,8,9,10]],[,,"800\\d{4,6}",,,,"800123456",,,[7,8,9]],[,,"[67]00\\d{5,6}",,,,"600123456",,,[8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FI",358,"00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))","0",,,"0",,"00",,[[,"(\\d{5})","$1",["75[12]"],"0$1"],[,"(\\d{5})","$1",["20[2-59]"],"0$1"],[,"(\\d{6})","$1",["11"]],[,"(\\d{3})(\\d{3,7})","$1 $2",["(?:[1-3]0|[68])0|70[07-9]"],"0$1"],[,"(\\d{2})(\\d{4,8})","$1 $2",["[14]|2[09]|50|7[135]"],"0$1"],[,"(\\d{2})(\\d{6,10})","$1 $2",["7"],"0$1"],[,"(\\d)(\\d{4,9})","$1 $2",["(?:19|[2568])[1-8]|3(?:0[1-9]|[1-9])|9"],"0$1"]],[[,"(\\d{5})","$1",["20[2-59]"],"0$1"],[,"(\\d{3})(\\d{3,7})","$1 $2",["(?:[1-3]0|[68])0|70[07-9]"],"0$1"],[,"(\\d{2})(\\d{4,8})","$1 $2",["[14]|2[09]|50|7[135]"],"0$1"],[,"(\\d{2})(\\d{6,10})","$1 $2",["7"],"0$1"],[,"(\\d)(\\d{4,9})","$1 $2",["(?:19|[2568])[1-8]|3(?:0[1-9]|[1-9])|9"],"0$1"]],[,,,,,,,,,[-1]],1,"1[03-79]|[2-9]",[,,"20(?:2[023]|9[89])\\d{1,6}|(?:60[12]\\d|7099)\\d{4,5}|(?:606|7(?:0[78]|1|3\\d))\\d{7}|(?:[1-3]00|7(?:0[1-5]\\d\\d|5[03-9]))\\d{3,7}"],[,,"20\\d{4,8}|60[12]\\d{5,6}|7(?:099\\d{4,5}|5[03-9]\\d{3,7})|20[2-59]\\d\\d|(?:606|7(?:0[78]|1|3\\d))\\d{7}|(?:10|29|3[09]|70[1-5]\\d)\\d{4,8}",,,,"10112345"],,,[,,,,,,,,,[-1]]],FJ:[,[,,"45\\d{5}|(?:0800\\d|[235-9])\\d{6}",,,,,,,[7,11]],[,,"603\\d{4}|(?:3[0-5]|6[25-7]|8[58])\\d{5}",,,,"3212345",,,[7]],[,,"(?:[279]\\d|45|5[01568]|8[034679])\\d{5}",,,,"7012345",,,[7]],[,,"0800\\d{7}",,,,"08001234567",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FJ",679,"0(?:0|52)",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["[235-9]|45"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FK:[,[,,"[2-7]\\d{4}",,,,,,,[5]],[,,"[2-47]\\d{4}",,,,"31234"],[,,"[56]\\d{4}",,,,"51234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FK",500,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FM:[,[,,"(?:[39]\\d\\d|820)\\d{4}",,,,,,,[7]],[,,"31(?:00[67]|208|309)\\d\\d|(?:3(?:[2357]0[1-9]|602|804|905)|(?:820|9[2-6]\\d)\\d)\\d{3}",,,,"3201234"],[,,"31(?:00[67]|208|309)\\d\\d|(?:3(?:[2357]0[1-9]|602|804|905)|(?:820|9[2-7]\\d)\\d)\\d{3}",,,,"3501234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FM",691,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[389]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FO:[,[,,"[2-9]\\d{5}",,,,,,,[6]],[,,"(?:20|[34]\\d|8[19])\\d{4}",,,,"201234"],[,,"(?:[27][1-9]|5\\d|9[16])\\d{4}",,,,"211234"],[,,"80[257-9]\\d{3}",,,,"802123"],[,,"90(?:[13-5][15-7]|2[125-7]|9\\d)\\d\\d",,,,"901123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:6[0-36]|88)\\d{4}",,,,"601234"],"FO",298,"00",,,,"(10(?:01|[12]0|88))",,,,[[,"(\\d{6})","$1",["[2-9]"],,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FR:[,[,,"[1-9]\\d{8}",,,,,,,[9]],[,,"(?:26[013-9]|59[1-35-9])\\d{6}|(?:[13]\\d|2[0-57-9]|4[1-9]|5[0-8])\\d{7}",,,,"123456789"],[,,"(?:6(?:[0-24-8]\\d|3[0-8]|9[589])|7[3-9]\\d)\\d{6}",,,,"612345678"],[,,"80[0-5]\\d{6}",,,,"801234567"],[,,"836(?:0[0-36-9]|[1-9]\\d)\\d{4}|8(?:1[2-9]|2[2-47-9]|3[0-57-9]|[569]\\d|8[0-35-9])\\d{6}",,,,"891123456"],[,,"8(?:1[01]|2[0156]|4[024]|84)\\d{6}",,,,"884012345"],[,,,,,,,,,[-1]],[,,"9\\d{8}",,,,"912345678"],"FR",33,"00","0",,,"0",,,,[[,"(\\d{4})","$1",["10"]],[,"(\\d{3})(\\d{3})","$1 $2",["1"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"],[,"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"],"0$1"]],[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"],[,"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"80[6-9]\\d{6}",,,,"806123456"],,,[,,,,,,,,,[-1]]],GA:[,[,,"(?:[067]\\d|11)\\d{6}|[2-7]\\d{6}",,,,,,,[7,8]],[,,"[01]1\\d{6}",,,,"01441234",,,[8]],[,,"(?:(?:0[2-7]|7[467])\\d|6(?:0[0-4]|10|[256]\\d))\\d{5}|[2-7]\\d{6}",,,,"06031234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GA",241,"00",,,,"0(11\\d{6}|60\\d{6}|61\\d{6}|6[256]\\d{6}|7[467]\\d{6})","$1",,,[[,"(\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-7]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["11|[67]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GB:[,[,,"[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}",,,,,,,[7,9,10],[4,5,6,8]],[,,"(?:1(?:1(?:3(?:[0-58]\\d\\d|73[0-35])|4(?:(?:[0-5]\\d|70)\\d|69[7-9])|(?:(?:5[0-26-9]|[78][0-49])\\d|6(?:[0-4]\\d|50))\\d)|(?:2(?:(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)\\d|1(?:[0-7]\\d|8[0-3]))|(?:3(?:0\\d|1[0-8]|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[137]\\d|[28][02-57-9]|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|[16]\\d|2[024-9]|3[015689]|4[02-9]|5[03-9]|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|1\\d|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0-24578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|[18]\\d|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|9[2-57]))\\d)\\d)|2(?:0[013478]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{3})\\d{4}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[3-5])))|3(?:6(?:38[2-5]|47[23])|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[1-3]))|5(?:2(?:4(?:3[2-79]|6\\d)|76\\d)|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[5-7]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|9(?:55[0-4]|77[23]))|7(?:26(?:6[13-9]|7[0-7])|(?:442|688)\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|843[2-58])|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}",,,,"1212345678",,,[9,10],[4,5,6,7,8]],[,,"7(?:457[0-57-9]|700[01]|911[028])\\d{5}|7(?:[1-3]\\d\\d|4(?:[0-46-9]\\d|5[0-689])|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[024-9]\\d|1[02-9]|3[0-689]))\\d{6}",,,,"7400123456",,,[10]],[,,"80[08]\\d{7}|800\\d{6}|8001111",,,,"8001234567"],[,,"(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[2-49]))\\d{7}|845464\\d",,,,"9012345678",,,[7,10]],[,,,,,,,,,[-1]],[,,"70\\d{8}",,,,"7012345678",,,[10]],[,,"56\\d{8}",,,,"5612345678",,,[10]],"GB",44,"00","0"," x",,"0|180020",,,,[[,"(\\d{3})(\\d{4})","$1 $2",["800","8001","80011","800111","8001111"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["845","8454","84546","845464"],"0$1"],[,"(\\d{3})(\\d{6})","$1 $2",["800"],"0$1"],[,"(\\d{5})(\\d{4,5})","$1 $2",["1(?:38|5[23]|69|76|94)","1(?:(?:38|69)7|5(?:24|39)|768|946)","1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"],"0$1"],[,"(\\d{4})(\\d{5,6})","$1 $2",["1(?:[2-69][02-9]|[78])"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["[25]|7(?:0|6[02-9])","[25]|7(?:0|6(?:[03-9]|2[356]))"],"0$1"],[,"(\\d{4})(\\d{6})","$1 $2",["7"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[1389]"],"0$1"]],,[,,"76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}",,,,"7640123456",,,[10]],1,,[,,,,,,,,,[-1]],[,,"(?:3[0347]|55)\\d{8}",,,,"5512345678",,,[10]],,,[,,,,,,,,,[-1]]],GD:[,[,,"(?:473|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"473(?:2(?:3[0-2]|69)|3(?:2[89]|86)|4(?:[06]8|3[5-9]|4[0-4]|5[59]|73|90)|63[68]|7(?:58|84)|800|938)\\d{4}",,,,"4732691234",,,,[7]],[,,"473(?:4(?:0[2-79]|1[04-9]|2[0-5]|49|5[6-8])|5(?:2[01]|3[3-8])|901)\\d{4}",,,,"4734031234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"GD",1,"011","1",,,"([2-9]\\d{6})$|1","473$1",,,,,[,,,,,,,,,[-1]],,"473",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GE:[,[,,"(?:[3-57]\\d\\d|800)\\d{6}",,,,,,,[9],[6,7]],[,,"(?:3(?:[256]\\d|4[124-9]|7[0-4])|4(?:1\\d|2[2-7]|3[1-79]|4[2-8]|7[239]|9[1-7]))\\d{6}",,,,"322123456",,,,[6,7]],[,,"5(?:(?:(?:0555|1(?:[17]77|555))[5-9]|757(?:7[7-9]|8[01]))\\d|22252[0-4])\\d\\d|5(?:0(?:0[17]0|505)|1(?:0[01]0|1(?:07|33|51))|2(?:0[02]0|2[25]2)|3(?:0[03]0|3[35]3)|(?:40[04]|900)0|5222)[0-4]\\d{3}|(?:5(?:0(?:0(?:0\\d|11|22|3[0-6]|44|5[05]|77|88|9[09])|(?:[14]\\d|77)\\d|22[02])|1(?:1(?:[03][01]|[124]\\d|5[2-6]|7[0-4])|4\\d\\d)|[23]555|4(?:4\\d\\d|555)|5(?:[0157-9]\\d\\d|200|333|444)|6[89]\\d\\d|7(?:[0147-9]\\d\\d|5(?:00|[57]5))|8(?:0(?:[018]\\d|2[0-4])|5(?:55|8[89])|8(?:55|88))|9(?:090|[1-35-9]\\d\\d))|790\\d\\d)\\d{4}",,,,"555123456"],[,,"800\\d{6}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"70[67]\\d{6}",,,,"706123456"],"GE",995,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["70"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["32"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[57]"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[348]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"70[67]\\d{6}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GF:[,[,,"(?:[56]94\\d|7093)\\d{5}|(?:80|9\\d)\\d{7}",,,,,,,[9]],[,,"594(?:[02-49]\\d|1[0-5]|5[6-9]|6[0-3]|80)\\d{4}",,,,"594101234"],[,,"(?:694(?:[0-249]\\d|3[0-8])|7093[0-3])\\d{4}",,,,"694201234"],[,,"80[0-5]\\d{6}",,,,"800012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9(?:(?:396|76\\d)\\d|476[0-6])\\d{4}",,,,"976012345"],"GF",594,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]|9[47]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GG:[,[,,"(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?",,,,,,,[7,9,10],[6]],[,,"1481[25-9]\\d{5}",,,,"1481256789",,,[10],[6]],[,,"7(?:(?:781|839)\\d|911[17])\\d{5}",,,,"7781123456",,,[10]],[,,"80[08]\\d{7}|800\\d{6}|8001111",,,,"8001234567"],[,,"(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[0-3]))\\d{7}|845464\\d",,,,"9012345678",,,[7,10]],[,,,,,,,,,[-1]],[,,"70\\d{8}",,,,"7012345678",,,[10]],[,,"56\\d{8}",,,,"5612345678",,,[10]],"GG",44,"00","0",,,"([25-9]\\d{5})$|0|180020","1481$1",,,,,[,,"76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}",,,,"7640123456",,,[10]],,,[,,,,,,,,,[-1]],[,,"(?:3[0347]|55)\\d{8}",,,,"5512345678",,,[10]],,,[,,,,,,,,,[-1]]],GH:[,[,,"(?:[235]\\d{3}|800)\\d{5}",,,,,,,[8,9],[7]],[,,"3082[0-5]\\d{4}|3(?:0(?:[237]\\d|8[01])|[167](?:2[0-6]|7\\d|80)|2(?:2[0-5]|7\\d|80)|3(?:2[0-3]|7\\d|80)|4(?:2[013-9]|3[01]|7\\d|80)|5(?:2[0-7]|7\\d|80)|8(?:2[0-2]|7\\d|80)|9(?:[28]0|7\\d))\\d{5}",,,,"302345678",,,[9],[7]],[,,"(?:2(?:[0346-9]\\d|5[67])|5(?:[03-7]\\d|9[1-9]))\\d{6}",,,,"231234567",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GH",233,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[237]|8[0-2]"]],[,"(\\d{3})(\\d{5})","$1 $2",["8"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[235]"],"0$1"]],[[,"(\\d{3})(\\d{5})","$1 $2",["8"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[235]"],"0$1"]],[,,,,,,,,,[-1]],,,[,,"800\\d{5}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GI:[,[,,"(?:[25]\\d|60)\\d{6}",,,,,,,[8]],[,,"2190[0-2]\\d{3}|2(?:0(?:[02]\\d|3[01])|16[24-9]|2[2-5]\\d)\\d{4}",,,,"20012345"],[,,"5251[0-4]\\d{3}|(?:5(?:[146-8]\\d\\d|250)|60(?:1[01]|6\\d))\\d{4}",,,,"57123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GI",350,"00",,,,,,,,[[,"(\\d{3})(\\d{5})","$1 $2",["2"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GL:[,[,,"(?:19|[2-689]\\d|70)\\d{4}",,,,,,,[6]],[,,"(?:19|3[1-7]|[68][1-9]|70|9\\d)\\d{4}",,,,"321000"],[,,"[245]\\d{5}",,,,"221234"],[,,"80\\d{4}",,,,"801234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3[89]\\d{4}",,,,"381234"],"GL",299,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["19|[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GM:[,[,,"[2-9]\\d{6}",,,,,,,[7]],[,,"(?:4(?:[23]\\d\\d|4(?:1[024679]|[6-9]\\d))|5(?:5(?:3\\d|4[0-7])|6[67]\\d|7(?:1[04]|2[035]|3[58]|48))|8[0-589]\\d\\d)\\d{3}",,,,"5661234"],[,,"556\\d{4}|(?:[23679]\\d|4[015]|5[0-489]|8[67])\\d{5}",,,,"3012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GM",220,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GN:[,[,,"722\\d{6}|(?:3|6\\d)\\d{7}",,,,,,,[8,9]],[,,"3(?:0(?:24|3[12]|4[1-35-7]|5[13]|6[189]|[78]1|9[1478])|1\\d\\d)\\d{4}",,,,"30241234",,,[8]],[,,"6[0-356]\\d{7}",,,,"601123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"722\\d{6}",,,,"722123456",,,[9]],"GN",224,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["3"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[67]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GP:[,[,,"(?:590\\d|7090)\\d{5}|(?:69|80|9\\d)\\d{7}",,,,,,,[9]],[,,"590(?:0[1-68]|[14][0-24-9]|2[0-68]|3[1-9]|5[3-579]|[68][0-689]|7[08]|9\\d)\\d{4}",,,,"590201234"],[,,"(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))|7090[0-4])\\d{4}",,,,"690001234"],[,,"80[0-5]\\d{6}",,,,"800012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}",,,,"976012345"],"GP",590,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-79]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0$1"]],,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GQ:[,[,,"222\\d{6}|(?:3\\d|55|[89]0)\\d{7}",,,,,,,[9]],[,,"33[0-24-9]\\d[46]\\d{4}|3(?:33|5\\d)\\d[7-9]\\d{4}",,,,"333091234"],[,,"(?:222|55\\d)\\d{6}",,,,"222123456"],[,,"80\\d[1-9]\\d{5}",,,,"800123456"],[,,"90\\d[1-9]\\d{5}",,,,"900123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GQ",240,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235]"]],[,"(\\d{3})(\\d{6})","$1 $2",["[89]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GR:[,[,,"5005000\\d{3}|8\\d{9,11}|(?:[269]\\d|70)\\d{8}",,,,,,,[10,11,12]],[,,"2(?:1\\d\\d|2(?:2[1-46-9]|[36][1-8]|4[1-7]|5[1-4]|7[1-5]|[89][1-9])|3(?:1\\d|2[1-57]|[35][1-3]|4[13]|7[1-7]|8[124-6]|9[1-79])|4(?:1\\d|2[1-8]|3[1-4]|4[13-5]|6[1-578]|9[1-5])|5(?:1\\d|[29][1-4]|3[1-5]|4[124]|5[1-6])|6(?:1\\d|[269][1-6]|3[1245]|4[1-7]|5[13-9]|7[14]|8[1-5])|7(?:1\\d|2[1-5]|3[1-6]|4[1-7]|5[1-57]|6[135]|9[125-7])|8(?:1\\d|2[1-5]|[34][1-4]|9[1-57]))\\d{6}",,,,"2123456789",,,[10]],[,,"68[57-9]\\d{7}|(?:69|94)\\d{8}",,,,"6912345678",,,[10]],[,,"800\\d{7,9}",,,,"8001234567"],[,,"90[19]\\d{7}",,,,"9091234567",,,[10]],[,,"8(?:0[16]|12|[27]5|50)\\d{7}",,,,"8011234567",,,[10]],[,,"70\\d{8}",,,,"7012345678",,,[10]],[,,,,,,,,,[-1]],"GR",30,"00",,,,,,,,[[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["21|7"]],[,"(\\d{4})(\\d{6})","$1 $2",["2(?:2|3[2-57-9]|4[2-469]|5[2-59]|6[2-9]|7[2-69]|8[2-49])|5"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2689]"]],[,"(\\d{3})(\\d{3,4})(\\d{5})","$1 $2 $3",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"5005000\\d{3}",,,,"5005000123",,,[10]],,,[,,,,,,,,,[-1]]],GT:[,[,,"80\\d{6}|(?:1\\d{3}|[2-7])\\d{7}",,,,,,,[8,11]],[,,"[267][2-9]\\d{6}",,,,"22456789",,,[8]],[,,"(?:[3-5]\\d\\d|80[0-4])\\d{5}",,,,"51234567",,,[8]],[,,"18[01]\\d{8}",,,,"18001112222",,,[11]],[,,"19\\d{9}",,,,"19001112222",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GT",502,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[2-8]"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GU:[,[,,"(?:[58]\\d\\d|671|900)\\d{7}",,,,,,,[10],[7]],[,,"671(?:2\\d\\d|3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[02-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[0479]7|2[0167]|3[45]|8[7-9])|8(?:[2-57-9]8|6[478])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}",,,,"6713001234",,,,[7]],[,,"671(?:2\\d\\d|3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[02-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[0479]7|2[0167]|3[45]|8[7-9])|8(?:[2-57-9]8|6[478])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}",,,,"6713001234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"GU",1,"011","1",,,"([2-9]\\d{6})$|1","671$1",,1,,,[,,,,,,,,,[-1]],,"671",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GW:[,[,,"[49]\\d{8}|4\\d{6}",,,,,,,[7,9]],[,,"443\\d{6}",,,,"443201234",,,[9]],[,,"9(?:5\\d|6[569]|77)\\d{6}",,,,"955012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"40\\d{5}",,,,"4012345",,,[7]],"GW",245,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["40"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[49]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GY:[,[,,"(?:[2-8]\\d{3}|9008)\\d{3}",,,,,,,[7]],[,,"(?:2(?:1[6-9]|2[0-35-9]|3[1-4]|5[3-9]|6\\d|7[0-79])|3(?:2[25-9]|3\\d)|4(?:4[0-24]|5[56])|50[0-6]|77[1-57])\\d{4}",,,,"2201234"],[,,"(?:51[01]|6\\d\\d|7(?:[0-5]\\d|6[0-39]|70))\\d{4}",,,,"6091234"],[,,"(?:289|8(?:00|6[28]|88|99))\\d{4}",,,,"2891234"],[,,"9008\\d{3}",,,,"9008123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"515\\d{4}",,,,"5151234"],"GY",592,"001",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],HK:[,[,,"8[0-46-9]\\d{6,7}|9\\d{4,7}|(?:[2-7]|9\\d{3})\\d{7}",,,,,,,[5,6,7,8,9,11]],[,,"(?:2(?:[13-9]\\d|2[013-9])\\d|3(?:(?:[1569][0-24-9]|4[0-246-9]|7[0-24-69])\\d|8(?:4[0-8]|[579]\\d|6[0-5]))|58(?:0[1-9]|1[2-9]))\\d{4}",,,,"21234567",,,[8]],[,,"(?:4(?:44[0-35-9]|6(?:4[0-57-9]|6[0-4])|7(?:3[0-4]|4[0-48]|6[0-5]))|5(?:35[4-8]|73[0-6]|95[0-8])|6(?:26[013-8]|(?:66|78)[0-5])|70(?:7[1-8]|8[0-8])|84(?:4[0-2]|8[0-35-9])|9(?:29[013-9]|39[014-9]|59[0-4]|899))\\d{4}|(?:4(?:4[0-35-9]|6[0-357-9]|7[0-25])|5(?:[1-59][0-46-9]|6[0-4689]|7[0-246-9])|6(?:0[1-9]|[13-59]\\d|[268][0-57-9]|7[0-79])|70[1-59]|84[0-39]|9(?:0[1-9]|1[02-9]|[2358][0-8]|[467]\\d))\\d{5}",,,,"51234567",,,[8]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"900(?:[0-24-9]\\d{7}|3\\d{1,4})",,,,"90012345678",,,[5,6,7,8,11]],[,,,,,,,,,[-1]],[,,"8(?:1[0-4679]\\d|2(?:[0-36]\\d|7[0-4])|3(?:[034]\\d|2[09]|70))\\d{4}",,,,"81123456",,,[8]],[,,,,,,,,,[-1]],"HK",852,"00(?:30|5[09]|[126-9]?)",,,,,,"00",,[[,"(\\d{3})(\\d{2,5})","$1 $2",["900","9003"]],[,"(\\d{4})(\\d{4})","$1 $2",["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"]],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]]],,[,,"7(?:1(?:0[0-38]|1[0-3679]|3[013]|69|9[0136])|2(?:[02389]\\d|1[18]|7[27-9])|3(?:[0-38]\\d|7[0-369]|9[2357-9])|47\\d|5(?:[178]\\d|5[0-5])|6(?:0[0-7]|2[236-9]|[35]\\d)|7(?:[27]\\d|8[7-9])|8(?:[23689]\\d|7[1-9])|9(?:[025]\\d|6[0-246-8]|7[0-36-9]|8[238]))\\d{4}",,,,"71123456",,,[8]],,,[,,,,,,,,,[-1]],[,,"30(?:0[1-9]|[15-7]\\d|2[047]|89)\\d{4}",,,,"30161234",,,[8]],,,[,,,,,,,,,[-1]]],HN:[,[,,"8\\d{10}|[237-9]\\d{7}",,,,,,,[8,11]],[,,"2(?:2(?:0[0-59]|1[1-9]|[23]\\d|4[02-7]|5[57]|6[245]|7[0135689]|8[01346-9]|9[0-2])|4(?:0[578]|2[3-59]|3[13-9]|4[0-68]|5[1-3589])|5(?:0[2357-9]|1[1-356]|4[03-5]|5\\d|6[014-69]|7[04]|80)|6(?:[056]\\d|17|2[067]|3[047]|4[0-378]|[78][0-8]|9[01])|7(?:0[5-79]|6[46-9]|7[02-9]|8[034]|91)|8(?:79|8[0-357-9]|9[1-57-9]))\\d{4}",,,,"22123456",,,[8]],[,,"[37-9]\\d{7}",,,,"91234567",,,[8]],[,,"8002\\d{7}",,,,"80021234567",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"HN",504,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1-$2",["[237-9]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["8"]]],[[,"(\\d{4})(\\d{4})","$1-$2",["[237-9]"]]],[,,,,,,,,,[-1]],,,[,,"8002\\d{7}",,,,,,,[11]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],HR:[,[,,"[2-69]\\d{8}|80\\d{5,7}|[1-79]\\d{7}|6\\d{6}",,,,,,,[7,8,9],[6]],[,,"1\\d{7}|(?:2[0-3]|3[1-5]|4[02-47-9]|5[1-3])\\d{6,7}",,,,"12345678",,,[8,9],[6,7]],[,,"9(?:(?:0[1-9]|[12589]\\d)\\d\\d|7(?:[0679]\\d\\d|5(?:[01]\\d|44|55|77|9[5-79])))\\d{4}|98\\d{6}",,,,"921234567",,,[8,9]],[,,"80\\d{5,7}",,,,"800123456"],[,,"6[01459]\\d{6}|6[01]\\d{5}",,,,"6001234",,,[7,8]],[,,,,,,,,,[-1]],[,,"7[45]\\d{6}",,,,"74123456",,,[8]],[,,,,,,,,,[-1]],"HR",385,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["6[01]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["8"],"0$1"],[,"(\\d)(\\d{4})(\\d{3})","$1 $2 $3",["1"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["6|7[245]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-57]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"62\\d{6,7}|72\\d{6}",,,,"62123456",,,[8,9]],,,[,,,,,,,,,[-1]]],HT:[,[,,"[2-589]\\d{7}",,,,,,,[8]],[,,"2(?:2\\d|5[1-5]|81|9[149])\\d{5}",,,,"22453300"],[,,"(?:[34]\\d|5[56])\\d{6}",,,,"34101234"],[,,"8\\d{7}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9(?:[67][0-4]|8[0-3589]|9\\d)\\d{5}",,,,"98901234"],"HT",509,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[2-589]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],HU:[,[,,"[235-7]\\d{8}|[1-9]\\d{7}",,,,,,,[8,9],[6,7]],[,,"(?:1\\d|[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6[23689]|8[2-57-9]|9[2-69])\\d{6}",,,,"12345678",,,[8],[6,7]],[,,"(?:[257]0|3[01])\\d{7}",,,,"201234567",,,[9]],[,,"(?:[48]0\\d|680[29])\\d{5}",,,,"80123456"],[,,"9[01]\\d{6}",,,,"90123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"21\\d{7}",,,,"211234567",,,[9]],"HU",36,"00","06",,,"06",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"(06 $1)"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6|8[2-57-9]|9[2-69]"],"(06 $1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-9]"],"06 $1"]],,[,,,,,,,,,[-1]],,,[,,"(?:[48]0\\d|680[29])\\d{5}"],[,,"38\\d{7}",,,,"381234567",,,[9]],,,[,,,,,,,,,[-1]]],ID:[,[,,"00[1-9]\\d{9,14}|(?:[1-36]|8\\d{5})\\d{6}|00\\d{9}|[1-9]\\d{8,10}|[2-9]\\d{7}",,,,,,,[7,8,9,10,11,12,13,14,15,16,17],[5,6]],[,,"2[124]\\d{7,8}|619\\d{8}|2(?:1(?:14|500)|2\\d{3})\\d{3}|61\\d{5,8}|(?:2(?:[35][1-4]|6[0-8]|7[1-6]|8\\d|9[1-8])|3(?:1|[25][1-8]|3[1-68]|4[1-3]|6[1-3568]|7[0-469]|8\\d)|4(?:0[1-589]|1[01347-9]|2[0-36-8]|3[0-24-68]|43|5[1-378]|6[1-5]|7[134]|8[1245])|5(?:1[1-35-9]|2[25-8]|3[124-9]|4[1-3589]|5[1-46]|6[1-8])|6(?:[25]\\d|3[1-69]|4[1-6])|7(?:02|[125][1-9]|[36]\\d|4[1-8]|7[0-36-9])|9(?:0[12]|1[013-8]|2[0-479]|5[125-8]|6[23679]|7[159]|8[01346]))\\d{5,8}",,,,"218350123",,,[7,8,9,10,11],[5,6]],[,,"8[1-35-9]\\d{7,10}",,,,"812345678",,,[9,10,11,12]],[,,"00(?:1803\\d{5,11}|7803\\d{7})|(?:177\\d|800)\\d{5,7}",,,,"8001234567",,,[8,9,10,11,12,13,14,15,16,17]],[,,"809\\d{7}",,,,"8091234567",,,[10]],[,,"804\\d{7}",,,,"8041234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ID",62,"00[89]","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["15"]],[,"(\\d{2})(\\d{5,9})","$1 $2",["2[124]|[36]1"],"(0$1)"],[,"(\\d{3})(\\d{5,7})","$1 $2",["800"],"0$1"],[,"(\\d{3})(\\d{5,8})","$1 $2",["[2-79]"],"(0$1)"],[,"(\\d{3})(\\d{3,4})(\\d{3})","$1-$2-$3",["8[1-35-9]"],"0$1"],[,"(\\d{3})(\\d{6,8})","$1 $2",["1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["804"],"0$1"],[,"(\\d{3})(\\d)(\\d{3})(\\d{3})","$1 $2 $3 $4",["80"],"0$1"],[,"(\\d{3})(\\d{4})(\\d{4,5})","$1-$2-$3",["8"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{2,8})","$1 $2 $3 $4",["001"]],[,"(\\d{2})(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3 $4",["0"]]],[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["15"]],[,"(\\d{2})(\\d{5,9})","$1 $2",["2[124]|[36]1"],"(0$1)"],[,"(\\d{3})(\\d{5,7})","$1 $2",["800"],"0$1"],[,"(\\d{3})(\\d{5,8})","$1 $2",["[2-79]"],"(0$1)"],[,"(\\d{3})(\\d{3,4})(\\d{3})","$1-$2-$3",["8[1-35-9]"],"0$1"],[,"(\\d{3})(\\d{6,8})","$1 $2",["1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["804"],"0$1"],[,"(\\d{3})(\\d)(\\d{3})(\\d{3})","$1 $2 $3 $4",["80"],"0$1"],[,"(\\d{3})(\\d{4})(\\d{4,5})","$1-$2-$3",["8"],"0$1"]],[,,,,,,,,,[-1]],,,[,,"001803\\d{5,11}|(?:007803\\d|8071)\\d{6}",,,,,,,[10,11,12,13,14,15,16,17]],[,,"(?:1500|8071\\d{3})\\d{3}",,,,"8071123456",,,[7,10]],,,[,,,,,,,,,[-1]]],IE:[,[,,"(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}",,,,,,,[7,8,9,10],[5,6]],[,,"(?:1\\d|21)\\d{6,7}|(?:2[24-9]|4(?:0[24]|5\\d|7)|5(?:0[45]|1\\d|8)|6(?:1\\d|[237-9])|9(?:1\\d|[35-9]))\\d{5}|(?:23|4(?:[1-469]|8\\d)|5[23679]|6[4-6]|7[14]|9[04])\\d{7}",,,,"2212345",,,,[5,6]],[,,"8(?:22|[35-9]\\d)\\d{6}",,,,"850123456",,,[9]],[,,"1800\\d{6}",,,,"1800123456",,,[10]],[,,"15(?:1[2-8]|[2-8]0|9[089])\\d{6}",,,,"1520123456",,,[10]],[,,"18[59]0\\d{6}",,,,"1850123456",,,[10]],[,,"700\\d{6}",,,,"700123456",,,[9]],[,,"76\\d{7}",,,,"761234567",,,[9]],"IE",353,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{5})","$1 $2",["2[24-9]|47|58|6[237-9]|9[35-9]"],"(0$1)"],[,"(\\d{3})(\\d{5})","$1 $2",["[45]0"],"(0$1)"],[,"(\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["1"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2569]|4[1-69]|7[14]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["70"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["81"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[78]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["4"],"(0$1)"],[,"(\\d{2})(\\d)(\\d{3})(\\d{4})","$1 $2 $3 $4",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"18[59]0\\d{6}",,,,,,,[10]],[,,"818\\d{6}",,,,"818123456",,,[9]],,,[,,"88210[1-9]\\d{4}|8(?:[35-79]5\\d\\d|8(?:[013-9]\\d\\d|2(?:[01][1-9]|[2-9]\\d)))\\d{5}",,,,"8551234567",,,[10]]],IL:[,[,,"1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}",,,,,,,[7,8,9,10,11,12]],[,,"153\\d{8,9}|29[1-9]\\d{5}|(?:2[0-8]|[3489]\\d)\\d{6}",,,,"21234567",,,[8,11,12],[7]],[,,"55(?:4(?:0[01]|10|5[0-7])|57[0-289])\\d{4}|5(?:(?:[0-2][02-9]|[36]\\d|[49][2-9]|8[3-7])\\d|5(?:01|2\\d|3[0-3]|4[34]|5[0-25689]|6[6-8]|7[0-267]|8[7-9]|9[1-9]))\\d{5}",,,,"502345678",,,[9]],[,,"1(?:255|80[019]\\d{3})\\d{3}",,,,"1800123456",,,[7,10]],[,,"1212\\d{4}|1(?:200|9(?:0[0-2]|19))\\d{6}",,,,"1919123456",,,[8,10]],[,,"1700\\d{6}",,,,"1700123456",,,[10]],[,,,,,,,,,[-1]],[,,"7(?:38(?:[05]\\d|8[018])|8(?:33|55|77|81)\\d)\\d{4}|7(?:18|2[23]|3[237]|47|6[258]|7\\d|82|9[2-9])\\d{6}",,,,"771234567",,,[9]],"IL",972,"0(?:0|1[2-9])","0",,,"0",,,,[[,"(\\d{4})(\\d{3})","$1-$2",["125"]],[,"(\\d{4})(\\d{2})(\\d{2})","$1-$2-$3",["121"]],[,"(\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[2-489]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[57]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1-$2-$3",["12"]],[,"(\\d{4})(\\d{6})","$1-$2",["159"]],[,"(\\d)(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3-$4",["1[7-9]"]],[,"(\\d{3})(\\d{1,2})(\\d{3})(\\d{4})","$1-$2 $3-$4",["15"]]],,[,,,,,,,,,[-1]],,,[,,"1700\\d{6}",,,,,,,[10]],[,,"1599\\d{6}",,,,"1599123456",,,[10]],,,[,,"151\\d{8,9}",,,,"15112340000",,,[11,12]]],IM:[,[,,"1624\\d{6}|(?:[3578]\\d|90)\\d{8}",,,,,,,[10],[6]],[,,"1624(?:230|[5-8]\\d\\d)\\d{3}",,,,"1624756789",,,,[6]],[,,"76245[06]\\d{4}|7(?:4576|[59]24\\d|624[0-4689])\\d{5}",,,,"7924123456"],[,,"808162\\d{4}",,,,"8081624567"],[,,"8(?:440[49]06|72299\\d)\\d{3}|(?:8(?:45|70)|90[0167])624\\d{4}",,,,"9016247890"],[,,,,,,,,,[-1]],[,,"70\\d{8}",,,,"7012345678"],[,,"56\\d{8}",,,,"5612345678"],"IM",44,"00","0",,,"([25-8]\\d{5})$|0|180020","1624$1",,,,,[,,,,,,,,,[-1]],,"74576|(?:16|7[56])24",[,,,,,,,,,[-1]],[,,"3440[49]06\\d{3}|(?:3(?:08162|3\\d{4}|45624|7(?:0624|2299))|55\\d{4})\\d{4}",,,,"5512345678"],,,[,,,,,,,,,[-1]]],IN:[,[,,"(?:000800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}",,,,,,,[8,9,10,11,12,13],[6,7]],[,,"2717(?:[2-7]\\d|95)\\d{4}|(?:271[0-689]|782[0-6])[2-7]\\d{5}|(?:170[24]|2(?:(?:[02][2-79]|90)\\d|80[13468])|(?:3(?:23|80)|683|79[1-7])\\d|4(?:20[24]|72[2-8])|552[1-7])\\d{6}|(?:11|33|4[04]|80)[2-7]\\d{7}|(?:342|674|788)(?:[0189][2-7]|[2-7]\\d)\\d{5}|(?:1(?:2[0-249]|3[0-25]|4[145]|[59][14]|6[014]|7[1257]|8[01346])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[13]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[014-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91))[2-7]\\d{6}|(?:1(?:2[35-8]|3[346-9]|4[236-9]|[59][0235-9]|6[235-9]|7[34689]|8[257-9])|2(?:1[134689]|3[24-8]|4[2-8]|5[25689]|6[2-4679]|7[3-79]|8[2-479]|9[235-9])|3(?:01|1[79]|2[1245]|4[5-8]|5[125689]|6[235-7]|7[157-9]|8[2-46-8])|4(?:1[14578]|2[5689]|3[2-467]|5[4-7]|6[35]|73|8[2689]|9[2389])|5(?:[16][146-9]|2[14-8]|3[1346]|4[14-69]|5[46]|7[2-4]|8[2-8]|9[246])|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])|7(?:1[013-9]|2[0235-9]|3[2679]|4[1-35689]|5[2-46-9]|[67][02-9]|8[013-7]|9[089])|8(?:1[1357-9]|2[235-8]|3[03-57-9]|4[0-24-9]|5\\d|6[2457-9]|7[1-6]|8[1256]|9[2-4]))\\d[2-7]\\d{5}",,,,"7410410123",,,[10],[6,7,8]],[,,"(?:61279|7(?:887[02-9]|9(?:313|79[07-9]))|8(?:079[04-9]|(?:84|91)7[02-8]))\\d{5}|(?:6(?:12|[2-47]1|5[17]|6[13]|80)[0189]|7(?:1(?:2[0189]|9[0-5])|2(?:[14][017-9]|8[0-59])|3(?:2[5-8]|[34][017-9]|9[016-9])|4(?:1[015-9]|[29][89]|39|8[389])|5(?:[15][017-9]|2[04-9]|9[7-9])|6(?:0[0-47]|1[0-257-9]|2[0-4]|3[19]|5[4589])|70[0289]|88[089]|97[02-8])|8(?:0(?:6[67]|7[02-8])|70[017-9]|84[01489]|91[0-289]))\\d{6}|(?:7(?:31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[0189]\\d|7[02-8])\\d{5}|(?:6(?:[09]\\d|1[04679]|2[03689]|3[05-9]|4[0489]|50|6[069]|7[07]|8[7-9])|7(?:0\\d|2[0235-79]|3[05-8]|40|5[0346-8]|6[6-9]|7[1-9]|8[0-79]|9[089])|8(?:0[01589]|1[0-57-9]|2[235-9]|3[03-57-9]|[45]\\d|6[02457-9]|7[1-69]|8[0-25-9]|9[02-9])|9\\d\\d)\\d{7}|(?:6(?:(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|8[124-6])\\d|7(?:[235689]\\d|4[0189]))|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-5])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]|881))[0189]\\d{5}",,,,"8123456789",,,[10]],[,,"000800\\d{7}|1(?:600\\d{6}|80(?:0\\d{4,9}|3\\d{9}))",,,,"1800123456"],[,,"186[12]\\d{9}",,,,"1861123456789",,,[13]],[,,"1860\\d{7}",,,,"18603451234",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IN",91,"00","0",,,"0",,,,[[,"(\\d{7})","$1",["575"]],[,"(\\d{8})","$1",["5(?:0|2[23]|3[03]|[67]1|88)","5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)","5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"],,,1],[,"(\\d{4})(\\d{4,5})","$1 $2",["180","1800"],,,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["140"],,,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["11|2[02]|33|4[04]|79[1-7]|80[2-46]","11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])","11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]","1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]","1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]"],"0$1",,1],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807","1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]","1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|83)|73179|807(?:1|9[1-3])|(?:1552|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])\\d|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"],"0$1",,1],[,"(\\d{5})(\\d{5})","$1 $2",["[6-9]"],"0$1",,1],[,"(\\d{4})(\\d{2,4})(\\d{4})","$1 $2 $3",["1(?:6|8[06])","1(?:6|8[06]0)"],,,1],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3 $4",["0"]],[,"(\\d{4})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["18"],,,1]],[[,"(\\d{8})","$1",["5(?:0|2[23]|3[03]|[67]1|88)","5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)","5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"],,,1],[,"(\\d{4})(\\d{4,5})","$1 $2",["180","1800"],,,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["140"],,,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["11|2[02]|33|4[04]|79[1-7]|80[2-46]","11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])","11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]","1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]","1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]"],"0$1",,1],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807","1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]","1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|83)|73179|807(?:1|9[1-3])|(?:1552|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])\\d|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"],"0$1",,1],[,"(\\d{5})(\\d{5})","$1 $2",["[6-9]"],"0$1",,1],[,"(\\d{4})(\\d{2,4})(\\d{4})","$1 $2 $3",["1(?:6|8[06])","1(?:6|8[06]0)"],,,1],[,"(\\d{4})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["18"],,,1]],[,,,,,,,,,[-1]],,,[,,"1(?:600\\d{6}|800\\d{4,9})|(?:000800|18(?:03\\d\\d|6(?:0|[12]\\d\\d)))\\d{7}"],[,,"140\\d{7}",,,,"1409305260",,,[10]],,,[,,,,,,,,,[-1]]],IO:[,[,,"3\\d{6}",,,,,,,[7]],[,,"37\\d{5}",,,,"3709100"],[,,"38\\d{5}",,,,"3801234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IO",246,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["3"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],IQ:[,[,,"(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}",,,,,,,[8,9,10],[6,7]],[,,"1\\d{7}|(?:2[13-5]|3[02367]|4[023]|5[03]|6[026])\\d{6,7}",,,,"12345678",,,[8,9],[6,7]],[,,"7[3-9]\\d{8}",,,,"7912345678",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IQ",964,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-6]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],IR:[,[,,"[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}",,,,,,,[4,5,6,7,10],[8]],[,,"(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])(?:[03-57]\\d{7}|[16]\\d{3}(?:\\d{4})?|[289]\\d{3}(?:\\d(?:\\d{3})?)?)|94(?:000[09]|(?:12\\d|30[0-2])\\d|2(?:121|[2689]0\\d)|4(?:111|40\\d))\\d{4}",,,,"2123456789",,,[6,7,10],[4,5,8]],[,,"9(?:(?:0[0-5]|[13]\\d|2[0-3])\\d\\d|9(?:[0-46]\\d\\d|5(?:10|5\\d)|8(?:[12]\\d|88)|9(?:0[0-3]|[19]\\d|21|69|77|8[7-9])))\\d{5}",,,,"9123456789",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IR",98,"00","0",,,"0",,,,[[,"(\\d{4,5})","$1",["96"],"0$1"],[,"(\\d{2})(\\d{4,5})","$1 $2",["(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])[12689]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["[1-8]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"9(?:4440\\d{5}|6(?:0[12]|2[16-8]|3(?:08|[14]5|[23]|66)|4(?:0|80)|5[01]|6[89]|86|9[19]))",,,,,,,[4,5,10]],[,,"96(?:0[12]|2[16-8]|3(?:08|[14]5|[23]|66)|4(?:0|80)|5[01]|6[89]|86|9[19])",,,,"9601",,,[4,5]],,,[,,,,,,,,,[-1]]],IS:[,[,,"(?:38\\d|[4-9])\\d{6}",,,,,,,[7,9]],[,,"(?:4(?:1[0-24-69]|2[0-7]|[37][0-8]|4[0-24589]|5[0-68]|6\\d|8[0-36-8])|5(?:05|[156]\\d|2[02578]|3[0-579]|4[03-7]|7[0-2578]|8[0-35-9]|9[013-689])|872)\\d{4}",,,,"4101234",,,[7]],[,,"(?:38[589]\\d\\d|6(?:1[1-8]|2[0-6]|3[026-9]|4[014679]|5[0159]|6[0-69]|70|8[06-8]|9\\d)|7(?:5[057]|[6-9]\\d)|8(?:2[0-59]|[3-69]\\d|8[238]))\\d{4}",,,,"6111234"],[,,"80[0-8]\\d{4}",,,,"8001234",,,[7]],[,,"90(?:0\\d|1[5-79]|2[015-79]|3[135-79]|4[125-7]|5[25-79]|7[1-37]|8[0-35-7])\\d{3}",,,,"9001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"49[0-24-79]\\d{4}",,,,"4921234",,,[7]],"IS",354,"00|1(?:0(?:01|[12]0)|100)",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["[4-9]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["3"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"809\\d{4}",,,,"8091234",,,[7]],,,[,,"(?:689|8(?:7[18]|80)|95[48])\\d{4}",,,,"6891234",,,[7]]],IT:[,[,,"0\\d{5,11}|1\\d{8,10}|3(?:[0-8]\\d{7,10}|9\\d{7,8})|(?:43|55|70)\\d{8}|8\\d{5}(?:\\d{2,4})?",,,,,,,[6,7,8,9,10,11,12]],[,,"0(?:669[0-79]\\d{1,6}|831\\d{2,8})|0(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|6(?:[0-57-9]\\d|6[0-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[2356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7}",,,,"0212345678"],[,,"3[2-9]\\d{7,8}|(?:31|43)\\d{8}",,,,"3123456789",,,[9,10]],[,,"80(?:0\\d{3}|3)\\d{3}",,,,"800123456",,,[6,9]],[,,"(?:0878\\d{3}|89(?:2\\d|3[04]|4(?:[0-4]|[5-9]\\d\\d)|5[0-4]))\\d\\d|(?:1(?:44|6[346])|89(?:38|5[5-9]|9))\\d{6}",,,,"899123456",,,[6,8,9,10]],[,,"84(?:[08]\\d{3}|[17])\\d{3}",,,,"848123456",,,[6,9]],[,,"1(?:78\\d|99)\\d{6}",,,,"1781234567",,,[9,10]],[,,"55\\d{8}",,,,"5512345678",,,[10]],"IT",39,"00",,,,,,,,[[,"(\\d{4,5})","$1",["1(?:0|9[246])","1(?:0|9(?:2[2-9]|[46]))"]],[,"(\\d{6})","$1",["1(?:1|92)"]],[,"(\\d{2})(\\d{4,6})","$1 $2",["0[26]"]],[,"(\\d{3})(\\d{3,6})","$1 $2",["0[13-57-9][0159]|8(?:03|4[17]|9[2-5])","0[13-57-9][0159]|8(?:03|4[17]|9(?:2|3[04]|[45][0-4]))"]],[,"(\\d{4})(\\d{2,6})","$1 $2",["0(?:[13-579][2-46-8]|8[236-8])"]],[,"(\\d{4})(\\d{4})","$1 $2",["894"]],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[26]|5"]],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["1(?:44|[679])|[378]|43"]],[,"(\\d{3})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[13-57-9][0159]|14"]],[,"(\\d{2})(\\d{4})(\\d{5})","$1 $2 $3",["0[26]"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]],[,"(\\d{3})(\\d{4})(\\d{4,5})","$1 $2 $3",["[03]"]]],[[,"(\\d{2})(\\d{4,6})","$1 $2",["0[26]"]],[,"(\\d{3})(\\d{3,6})","$1 $2",["0[13-57-9][0159]|8(?:03|4[17]|9[2-5])","0[13-57-9][0159]|8(?:03|4[17]|9(?:2|3[04]|[45][0-4]))"]],[,"(\\d{4})(\\d{2,6})","$1 $2",["0(?:[13-579][2-46-8]|8[236-8])"]],[,"(\\d{4})(\\d{4})","$1 $2",["894"]],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[26]|5"]],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["1(?:44|[679])|[378]|43"]],[,"(\\d{3})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[13-57-9][0159]|14"]],[,"(\\d{2})(\\d{4})(\\d{5})","$1 $2 $3",["0[26]"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]],[,"(\\d{3})(\\d{4})(\\d{4,5})","$1 $2 $3",["[03]"]]],[,,,,,,,,,[-1]],1,,[,,"848\\d{6}",,,,,,,[9]],[,,,,,,,,,[-1]],,,[,,"3[2-8]\\d{9,10}",,,,"33101234501",,,[11,12]]],JE:[,[,,"1534\\d{6}|(?:[3578]\\d|90)\\d{8}",,,,,,,[10],[6]],[,,"1534[0-24-8]\\d{5}",,,,"1534456789",,,,[6]],[,,"7(?:(?:(?:50|82)9|937)\\d|7(?:00[378]|97\\d))\\d{5}",,,,"7797712345"],[,,"80(?:07(?:35|81)|8901)\\d{4}",,,,"8007354567"],[,,"(?:8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|90(?:066[59]|1810|71(?:07|55)))\\d{4}",,,,"9018105678"],[,,,,,,,,,[-1]],[,,"701511\\d{4}",,,,"7015115678"],[,,"56\\d{8}",,,,"5612345678"],"JE",44,"00","0",,,"([0-24-8]\\d{5})$|0|180020","1534$1",,,,,[,,"76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}",,,,"7640123456"],,,[,,,,,,,,,[-1]],[,,"(?:3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|55\\d{4})\\d{4}",,,,"5512345678"],,,[,,,,,,,,,[-1]]],JM:[,[,,"(?:[58]\\d\\d|658|900)\\d{7}",,,,,,,[10],[7]],[,,"8766060\\d{3}|(?:658(?:2(?:[0-8]\\d|9[0-46-9])|[3-9]\\d\\d)|876(?:52[35]|6(?:0[1-3579]|1[0235-9]|[23]\\d|40|5[06]|6[2-589]|7[0-25-9]|8[04]|9[4-9])|7(?:0[2-689]|[1-6]\\d|8[056]|9[45])|9(?:0[1-8]|1[02378]|[2-8]\\d|9[2-468])))\\d{4}",,,,"8765230123",,,,[7]],[,,"(?:658295|876(?:2(?:0[1-9]|[13-9]\\d|2[013-9])|[348]\\d\\d|5(?:0[1-9]|[1-9]\\d)|6(?:4[89]|6[67])|7(?:0[07]|7\\d|8[1-47-9]|9[0-36-9])|9(?:[01]9|9[0579])))\\d{4}",,,,"8762101234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"JM",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"658|876",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],JO:[,[,,"(?:(?:[2689]|7\\d)\\d|32|53)\\d{6}",,,,,,,[8,9]],[,,"87(?:000|90[01])\\d{3}|(?:2(?:6(?:2[0-35-9]|3[0-578]|4[24-7]|5[0-24-8]|[6-8][023]|9[0-3])|7(?:0[1-79]|10|2[014-7]|3[0-689]|4[019]|5[0-3578]))|32(?:0[1-69]|1[1-35-7]|2[024-7]|3\\d|4[0-3]|[5-7][023])|53(?:0[0-3]|[13][023]|2[0-59]|49|5[0-35-9]|6[15]|7[45]|8[1-6]|9[0-36-9])|6(?:2(?:[05]0|22)|3(?:00|33)|4(?:0[0-25]|1[2-7]|2[0569]|[38][07-9]|4[025689]|6[0-589]|7\\d|9[0-2])|5(?:[01][056]|2[034]|3[0-57-9]|4[178]|5[0-69]|6[0-35-9]|7[1-379]|8[0-68]|9[0239]))|87(?:20|7[078]|99))\\d{4}",,,,"62001234",,,[8]],[,,"7(?:[78][0-25-9]|9\\d)\\d{6}",,,,"790123456",,,[9]],[,,"80\\d{6}",,,,"80012345",,,[8]],[,,"9\\d{7}",,,,"90012345",,,[8]],[,,"85\\d{6}",,,,"85012345",,,[8]],[,,"70\\d{7}",,,,"700123456",,,[9]],[,,,,,,,,,[-1]],"JO",962,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2356]|87"],"(0$1)"],[,"(\\d{3})(\\d{5,6})","$1 $2",["[89]"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["70"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["7"],"0$1"]],,[,,"74(?:66|77)\\d{5}",,,,"746612345",,,[9]],,,[,,,,,,,,,[-1]],[,,"8(?:10|8\\d)\\d{5}",,,,"88101234",,,[8]],,,[,,,,,,,,,[-1]]],JP:[,[,,"00[1-9]\\d{6,14}|[25-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}",,,,,,,[8,9,10,11,12,13,14,15,16,17]],[,,"(?:1(?:1[235-8]|2[3-6]|3[3-9]|4[2-6]|[58][2-8]|6[2-7]|7[2-9]|9[1-9])|(?:2[2-9]|[36][1-9])\\d|4(?:[2-578]\\d|6[02-8]|9[2-59])|5(?:[2-589]\\d|6[1-9]|7[2-8])|7(?:[25-9]\\d|3[4-9]|4[02-9])|8(?:[2679]\\d|3[2-9]|4[5-9]|5[1-9]|8[03-9])|9(?:[2-58]\\d|[679][1-9]))\\d{6}",,,,"312345678",,,[9]],[,,"(?:601[0-4]0|[7-9]0[1-9]\\d\\d)\\d{5}",,,,"9012345678",,,[10]],[,,"00777(?:[01]|5\\d)\\d\\d|(?:00(?:7778|882[1245])|(?:120|800\\d)\\d\\d)\\d{4}|00(?:37|66|78)\\d{6,13}",,,,"120123456"],[,,"990\\d{6}",,,,"990123456",,,[9]],[,,,,,,,,,[-1]],[,,"60\\d{7}",,,,"601234567",,,[9]],[,,"50[1-9]\\d{7}",,,,"5012345678",,,[10]],"JP",81,"010","0",,,"(000[2569]\\d{4,6})$|(?:(?:003768)0?)|0","$1",,,[[,"(\\d{4})(\\d{4})","$1-$2",["007","0077","00777","00777[01]"]],[,"(\\d{8,10})","$1",["000"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"],"0$1"],[,"(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51)|9(?:80|9[16])","1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[7-9]|96)|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]","1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[7-9]|96[2457-9])|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["3|4(?:2[09]|7[01])|6[1-9]","3|4(?:2(?:0|9[02-69])|7(?:0[019]|1))|6[1-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[0459]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[26-9]|49|51|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9]|9[29])|5(?:2|3(?:[045]|9[0-8])|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|3(?:[29]|60)|49|51|6(?:[0-24]|36|5[0-3589]|7[23]|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:25[0468]|422|838)[01]|(?:47[59]|59[89]|8(?:6[68]|9))[019]","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3(?:[045]|9(?:[0-58]|6[4-9]|7[0-35689]))|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|60|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[2-57-9]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|7(?:2[2-468]|3[78])|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["[14]|[289][2-9]|5[3-9]|7[2-4679]"],"0$1"],[,"(\\d{4})(\\d{2})(\\d{3,4})","$1-$2-$3",["007","0077"]],[,"(\\d{4})(\\d{2})(\\d{4})","$1-$2-$3",["008"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[25-9]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3,4})","$1-$2-$3",["0"]],[,"(\\d{4})(\\d{4})(\\d{4,5})","$1-$2-$3",["0"]],[,"(\\d{4})(\\d{5})(\\d{5,6})","$1-$2-$3",["0"]],[,"(\\d{4})(\\d{6})(\\d{6,7})","$1-$2-$3",["0"]]],[[,"(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"],"0$1"],[,"(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51)|9(?:80|9[16])","1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[7-9]|96)|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]","1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[7-9]|96[2457-9])|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["3|4(?:2[09]|7[01])|6[1-9]","3|4(?:2(?:0|9[02-69])|7(?:0[019]|1))|6[1-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[0459]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[26-9]|49|51|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9]|9[29])|5(?:2|3(?:[045]|9[0-8])|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|3(?:[29]|60)|49|51|6(?:[0-24]|36|5[0-3589]|7[23]|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:25[0468]|422|838)[01]|(?:47[59]|59[89]|8(?:6[68]|9))[019]","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3(?:[045]|9(?:[0-58]|6[4-9]|7[0-35689]))|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|60|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[2-57-9]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|7(?:2[2-468]|3[78])|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["[14]|[289][2-9]|5[3-9]|7[2-4679]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[25-9]"],"0$1"]],[,,"20\\d{8}",,,,"2012345678",,,[10]],,,[,,"00(?:777(?:[01]|(?:5|8\\d)\\d)|882[1245]\\d\\d)\\d\\d|00(?:37|66|78)\\d{6,13}"],[,,"570\\d{6}",,,,"570123456",,,[9]],,,[,,,,,,,,,[-1]]],KE:[,[,,"(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}",,,,,,,[7,8,9,10]],[,,"(?:4[245]|5[1-79]|6[01457-9])\\d{5,7}|(?:4[136]|5[08]|62)\\d{7}|(?:[24]0|66)\\d{6,7}",,,,"202012345",,,[7,8,9]],[,,"(?:1(?:0[0-8]|1[0-7]|2[014]|30)|7\\d\\d)\\d{6}",,,,"712123456",,,[9]],[,,"800[02-8]\\d{5,6}",,,,"800223456",,,[9,10]],[,,"900[02-9]\\d{5}",,,,"900223456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KE",254,"000","0",,,"0",,,,[[,"(\\d{2})(\\d{5,7})","$1 $2",["[24-6]"],"0$1"],[,"(\\d{3})(\\d{6})","$1 $2",["[17]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KG:[,[,,"8\\d{9}|[235-9]\\d{8}",,,,,,,[9,10],[5,6]],[,,"312(?:5[0-79]\\d|9(?:[0-689]\\d|7[0-24-9]))\\d{3}|(?:3(?:1(?:2[0-46-8]|3[1-9]|47|[56]\\d)|2(?:22|3[0-479]|6[0-7])|4(?:22|5[6-9]|6\\d)|5(?:22|3[4-7]|59|6\\d)|6(?:22|5[35-7]|6\\d)|7(?:22|3[468]|4[1-9]|59|[67]\\d)|9(?:22|4[1-8]|6\\d))|6(?:09|12|2[2-4])\\d)\\d{5}",,,,"312123456",,,[9],[5,6]],[,,"312(?:58\\d|973)\\d{3}|(?:2(?:0[0-35]|2\\d)|5[0-24-7]\\d|600|7(?:[07]\\d|55)|88[08]|9(?:12|9[05-9]))\\d{6}",,,,"700123456",,,[9]],[,,"800\\d{6,7}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KG",996,"00","0",,,"0",,,,[[,"(\\d{4})(\\d{5})","$1 $2",["3(?:1[346]|[24-79])"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235-79]|88"],"0$1"],[,"(\\d{3})(\\d{3})(\\d)(\\d{2,3})","$1 $2 $3 $4",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KH:[,[,,"1\\d{9}|[1-9]\\d{7,8}",,,,,,,[8,9,10],[6,7]],[,,"23(?:4(?:[2-4]|[56]\\d)|[568]\\d\\d)\\d{4}|23[236-9]\\d{5}|(?:2[4-6]|3[2-6]|4[2-4]|[5-7][2-5])(?:(?:[237-9]|4[56]|5\\d)\\d{5}|6\\d{5,6})",,,,"23756789",,,[8,9],[6,7]],[,,"(?:(?:1[28]|3[18]|9[67])\\d|6[016-9]|7(?:[07-9]|[16]\\d)|8(?:[013-79]|8\\d))\\d{6}|(?:1\\d|9[0-57-9])\\d{6}|(?:2[3-6]|3[2-6]|4[2-4]|[5-7][2-5])48\\d{5}",,,,"91234567",,,[8,9]],[,,"1800(?:1\\d|2[019])\\d{4}",,,,"1800123456",,,[10]],[,,"1900(?:1\\d|2[09])\\d{4}",,,,"1900123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KH",855,"00[14-9]","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-9]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KI:[,[,,"(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}",,,,,,,[5,8]],[,,"(?:[24]\\d|3[1-9]|50|65(?:02[12]|12[56]|22[89]|[3-5]00)|7(?:27\\d\\d|3100|5(?:02[12]|12[56]|22[89]|[34](?:00|81)|500))|8[0-5])\\d{3}",,,,"31234"],[,,"(?:6200[01]|7(?:310[1-9]|5(?:02[03-9]|12[0-47-9]|22[0-7]|[34](?:0[1-9]|8[02-9])|50[1-9])))\\d{3}|(?:63\\d\\d|7(?:(?:[0146-9]\\d|2[0-689])\\d|3(?:[02-9]\\d|1[1-9])|5(?:[0-2][013-9]|[34][1-79]|5[1-9]|[6-9]\\d)))\\d{4}",,,,"72001234",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"30(?:0[01]\\d\\d|12(?:11|20))\\d\\d",,,,"30010000",,,[8]],"KI",686,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KM:[,[,,"[3478]\\d{6}",,,,,,,[7],[4]],[,,"7[4-7]\\d{5}",,,,"7712345",,,,[4]],[,,"[34]\\d{6}",,,,"3212345"],[,,,,,,,,,[-1]],[,,"8\\d{6}",,,,"8001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KM",269,"00",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[3478]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KN:[,[,,"(?:[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"869(?:2(?:29|36)|302|4(?:6[015-9]|70)|56[5-7])\\d{4}",,,,"8692361234",,,,[7]],[,,"869(?:48[89]|55[6-8]|66\\d|76[02-7])\\d{4}",,,,"8697652917",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"KN",1,"011","1",,,"([2-7]\\d{6})$|1","869$1",,,,,[,,,,,,,,,[-1]],,"869",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KP:[,[,,"85\\d{6}|(?:19\\d|[2-7])\\d{7}",,,,,,,[8,10],[6,7]],[,,"(?:(?:195|2)\\d|3[19]|4[159]|5[37]|6[17]|7[39]|85)\\d{6}",,,,"21234567",,,,[6,7]],[,,"19[1-3]\\d{7}",,,,"1921234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KP",850,"00|99","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"238[02-9]\\d{4}|2(?:[0-24-9]\\d|3[0-79])\\d{5}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KR:[,[,,"00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}",,,,,,,[5,6,8,9,10,11,12,13,14],[3,4,7]],[,,"(?:2|3[1-3]|[46][1-4]|5[1-5])[1-9]\\d{6,7}|(?:3[1-3]|[46][1-4]|5[1-5])1\\d{2,3}",,,,"22123456",,,[5,6,8,9,10],[3,4,7]],[,,"1(?:05(?:[0-8]\\d|9[0-6])|22[13]\\d)\\d{4,5}|1(?:0[0-46-9]|[16-9]\\d|2[013-9])\\d{6,7}",,,,"1020000000",,,[9,10]],[,,"00(?:308\\d{6,7}|798\\d{7,9})|(?:00368|[38]0)\\d{7}",,,,"801234567",,,[9,11,12,13,14]],[,,"60[2-9]\\d{6}",,,,"602345678",,,[9]],[,,,,,,,,,[-1]],[,,"50\\d{8,9}",,,,"5012345678",,,[10,11]],[,,"70\\d{8}",,,,"7012345678",,,[10]],"KR",82,"00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))","0",,,"0(8(?:[1-46-8]|5\\d\\d))?",,,,[[,"(\\d{5})","$1",["1[016-9]1","1[016-9]11","1[016-9]114"],"0$1"],[,"(\\d{2})(\\d{3,4})","$1-$2",["(?:3[1-3]|[46][1-4]|5[1-5])1"],"0$1","0$CC-$1"],[,"(\\d{4})(\\d{4})","$1-$2",["1"]],[,"(\\d)(\\d{3,4})(\\d{4})","$1-$2-$3",["2"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[36]0|8"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3",["[1346]|5[1-5]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[57]"],"0$1","0$CC-$1"],[,"(\\d{5})(\\d{3})(\\d{3})","$1 $2 $3",["003","0030"]],[,"(\\d{2})(\\d{5})(\\d{4})","$1-$2-$3",["5"],"0$1","0$CC-$1"],[,"(\\d{5})(\\d{3,4})(\\d{4})","$1 $2 $3",["0"]],[,"(\\d{5})(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["0"]]],[[,"(\\d{2})(\\d{3,4})","$1-$2",["(?:3[1-3]|[46][1-4]|5[1-5])1"],"0$1","0$CC-$1"],[,"(\\d{4})(\\d{4})","$1-$2",["1"]],[,"(\\d)(\\d{3,4})(\\d{4})","$1-$2-$3",["2"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[36]0|8"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3",["[1346]|5[1-5]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[57]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{5})(\\d{4})","$1-$2-$3",["5"],"0$1","0$CC-$1"]],[,,"15\\d{7,8}",,,,"1523456789",,,[9,10]],,,[,,"00(?:3(?:08\\d{6,7}|68\\d{7})|798\\d{7,9})",,,,,,,[11,12,13,14]],[,,"1(?:5(?:22|33|44|66|77|88|99)|6(?:[07]0|44|6[0168]|88)|8(?:00|33|55|77|99))\\d{4}",,,,"15441234",,,[8]],,,[,,,,,,,,,[-1]]],KW:[,[,,"18\\d{5}|(?:[2569]\\d|41)\\d{6}",,,,,,,[7,8]],[,,"2(?:[23]\\d\\d|4(?:[1-35-9]\\d|44)|5(?:0[034]|[2-46]\\d|5[1-3]|7[1-7]))\\d{4}",,,,"22345678",,,[8]],[,,"(?:41\\d\\d|5(?:(?:[05]\\d|1[0-7]|6[56])\\d|2(?:22|5[25])|7(?:55|77)|88[58])|6(?:(?:0[034679]|5[015-9]|6\\d)\\d|1(?:00|11|6[16])|2[26]2|3[36]3|4[46]4|7(?:0[013-9]|[67]\\d)|8[68]8|9(?:[069]\\d|3[039]))|9(?:(?:[04679]\\d|8[057-9])\\d|1(?:00|1[01]|99)|2(?:00|2\\d)|3(?:00|3[03])|5(?:00|5\\d)))\\d{4}",,,,"50012345",,,[8]],[,,"18\\d{5}",,,,"1801234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KW",965,"00",,,,,,,,[[,"(\\d{4})(\\d{3,4})","$1 $2",["[169]|2(?:[235]|4[1-35-9])|52"]],[,"(\\d{3})(\\d{5})","$1 $2",["[245]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KY:[,[,,"(?:345|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"345(?:2(?:22|3[23]|44|66)|333|444|6(?:23|38|40)|7(?:30|4[35-79]|6[6-9]|77)|8(?:00|1[45]|4[89]|88)|9(?:14|4[035-9]))\\d{4}",,,,"3452221234",,,,[7]],[,,"345(?:32[1-9]|42[0-4]|5(?:1[67]|2[5-79]|4[6-9]|50|76)|649|82[56]|9(?:1[679]|2[2-9]|3[06-9]|90))\\d{4}",,,,"3453231234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"(?:345976|900[2-9]\\d\\d)\\d{4}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"KY",1,"011","1",,,"([2-9]\\d{6})$|1","345$1",,,,,[,,,,,,,,,[-1]],,"345",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KZ:[,[,,"(?:33622|8\\d{8})\\d{5}|[78]\\d{9}",,,,,,,[10,14],[5,6,7]],[,,"(?:33622|7(?:1(?:0(?:[23]\\d|4[0-3]|59|63)|1(?:[23]\\d|4[0-79]|59)|2(?:[23]\\d|59)|3(?:2\\d|3[0-79]|4[0-35-9]|59)|4(?:[24]\\d|3[013-9]|5[1-9]|97)|5(?:2\\d|3[1-9]|4[0-7]|59)|6(?:[2-4]\\d|5[19]|61)|72\\d|8(?:[27]\\d|3[1-46-9]|4[0-5]|59))|2(?:1(?:[23]\\d|4[46-9]|5[3469])|2(?:2\\d|3[0679]|46|5[12679])|3(?:[2-4]\\d|5[139])|4(?:2\\d|3[1-35-9]|59)|5(?:[23]\\d|4[0-8]|59|61)|6(?:2\\d|3[1-9]|4[0-4]|59)|7(?:[2379]\\d|40|5[279])|8(?:[23]\\d|4[0-3]|59)|9(?:2\\d|3[124578]|59))))\\d{5}",,,,"7123456789",,,[10],[5,6,7]],[,,"7(?:0[0-25-8]|47|6[0-4]|7[15-8]|85)\\d{7}",,,,"7710009998",,,[10]],[,,"8(?:00|108\\d{3})\\d{7}",,,,"8001234567"],[,,"809\\d{7}",,,,"8091234567",,,[10]],[,,,,,,,,,[-1]],[,,"808\\d{7}",,,,"8081234567",,,[10]],[,,"751\\d{7}",,,,"7511234567",,,[10]],"KZ",7,"810","8",,,"8",,"8~10",,,,[,,,,,,,,,[-1]],,"33622|7",[,,"751\\d{7}",,,,,,,[10]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LA:[,[,,"[23]\\d{9}|3\\d{8}|(?:[235-8]\\d|41)\\d{6}",,,,,,,[8,9,10],[6]],[,,"(?:2[13]|[35-7][14]|41|8[1468])\\d{6}",,,,"21212862",,,[8],[6]],[,,"(?:20(?:[23579]\\d|8[78])|30[24]\\d)\\d{6}|30\\d{7}",,,,"2023123456",,,[9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LA",856,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2[13]|3[14]|[4-8]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["3"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["[23]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LB:[,[,,"[27-9]\\d{7}|[13-9]\\d{6}",,,,,,,[7,8]],[,,"7(?:62|8[0-6]|9[04-9])\\d{4}|(?:[14-69]\\d|2(?:[14-69]\\d|[78][1-9])|7[2-57]|8[02-9])\\d{5}",,,,"1123456"],[,,"(?:(?:3|81)\\d|7(?:[01]\\d|6[013-9]|8[7-9]|9[1-3]))\\d{5}",,,,"71123456"],[,,,,,,,,,[-1]],[,,"9[01]\\d{6}",,,,"90123456",,,[8]],[,,"80\\d{6}",,,,"80123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LB",961,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[13-69]|7(?:[2-57]|62|8[0-6]|9[04-9])|8[02-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[27-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LC:[,[,,"(?:[58]\\d\\d|758|900)\\d{7}",,,,,,,[10],[7]],[,,"758(?:234|4(?:30|5\\d|6[2-9]|8[0-2])|57[0-2]|(?:63|75)8)\\d{4}",,,,"7584305678",,,,[7]],[,,"758(?:28[4-7]|384|4(?:6[01]|8[4-9])|5(?:1[89]|20|84)|7(?:1[2-9]|2\\d|3[0-3])|812)\\d{4}",,,,"7582845678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"LC",1,"011","1",,,"([2-8]\\d{6})$|1","758$1",,,,,[,,,,,,,,,[-1]],,"758",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LI:[,[,,"[68]\\d{8}|(?:[2378]\\d|90)\\d{5}",,,,,,,[7,9]],[,,"(?:2(?:01|1[27]|2[024]|3\\d|6[02-578]|96)|3(?:[24]0|33|7[0135-7]|8[048]|9[0269]))\\d{4}",,,,"2345678",,,[7]],[,,"(?:6(?:(?:4[5-9]|5\\d)\\d|6(?:[024-6]\\d|[17]0|3[7-9]))\\d|7(?:[37-9]\\d|42|56))\\d{4}",,,,"660234567"],[,,"8002[28]\\d\\d|80(?:05\\d|9)\\d{4}",,,,"8002222"],[,,"90(?:02[258]|1(?:23|3[14])|66[136])\\d\\d",,,,"9002222",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LI",423,"00","0",,,"(1001)|0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[2379]|8(?:0[09]|7)","[2379]|8(?:0(?:02|9)|7)"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["69"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"],,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"870(?:28|87)\\d\\d",,,,"8702812",,,[7]],,,[,,"697(?:42|56|[78]\\d)\\d{4}",,,,"697861234",,,[9]]],LK:[,[,,"[1-9]\\d{8}",,,,,,,[9],[7]],[,,"(?:12[2-9]|602|8[12]\\d|9(?:1\\d|22|9[245]))\\d{6}|(?:11|2[13-7]|3[1-8]|4[157]|5[12457]|6[35-7])[2-57]\\d{6}",,,,"112345678",,,,[7]],[,,"7(?:[0-25-8]\\d|4[0-4])\\d{6}",,,,"712345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LK",94,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[1-689]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"1973\\d{5}",,,,"197312345"],,,[,,,,,,,,,[-1]]],LR:[,[,,"(?:[2457]\\d|33|88)\\d{7}|(?:2\\d|[4-6])\\d{6}",,,,,,,[7,8,9]],[,,"2\\d{7}",,,,"21234567",,,[8]],[,,"(?:(?:(?:22|33)0|555|7(?:6[01]|7\\d)|88\\d)\\d|4(?:240|[67]))\\d{5}|[56]\\d{6}",,,,"770123456",,,[7,9]],[,,,,,,,,,[-1]],[,,"332(?:02|[34]\\d)\\d{4}",,,,"332021234",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LR",231,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["4[67]|[56]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[2-578]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LS:[,[,,"(?:[256]\\d\\d|800)\\d{5}",,,,,,,[8]],[,,"2\\d{7}",,,,"22123456"],[,,"[56]\\d{7}",,,,"50123456"],[,,"800[1256]\\d{4}",,,,"80021234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LS",266,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[2568]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LT:[,[,,"(?:[3469]\\d|52|[78]0)\\d{6}",,,,,,,[8]],[,,"(?:3[1478]|4[124-6]|52)\\d{6}",,,,"31234567"],[,,"6\\d{7}",,,,"61234567"],[,,"80[02]\\d{5}",,,,"80012345"],[,,"9(?:0[0239]|10)\\d{5}",,,,"90012345"],[,,"808\\d{5}",,,,"80812345"],[,,"70[05]\\d{5}",,,,"70012345"],[,,"[89]01\\d{5}",,,,"80123456"],"LT",370,"00","0",,,"[08]",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["52[0-7]"],"(0-$1)",,1],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[7-9]"],"0 $1",,1],[,"(\\d{2})(\\d{6})","$1 $2",["37|4(?:[15]|6[1-8])"],"(0-$1)",,1],[,"(\\d{3})(\\d{5})","$1 $2",["[3-6]"],"(0-$1)",,1]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"70[67]\\d{5}",,,,"70712345"],,,[,,,,,,,,,[-1]]],LU:[,[,,"35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}",,,,,,,[4,5,6,7,8,9,10,11]],[,,"(?:35[013-9]|80[2-9]|90[89])\\d{1,8}|(?:2[2-9]|3[0-46-9]|[457]\\d|8[13-9]|9[2-579])\\d{2,9}",,,,"27123456"],[,,"6(?:[269][18]|5[1568]|7[189]|81)\\d{6}",,,,"628123456",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"90[015]\\d{5}",,,,"90012345",,,[8]],[,,"801\\d{5}",,,,"80112345",,,[8]],[,,,,,,,,,[-1]],[,,"20(?:1\\d{5}|[2-689]\\d{1,7})",,,,"20201234",,,[4,5,6,7,8,9,10]],"LU",352,"00",,,,"(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)",,,,[[,"(\\d{2})(\\d{3})","$1 $2",["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["20[2-689]"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4",["2(?:[0367]|4[3-8])"],,"$CC $1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["80[01]|90[015]"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["20"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4 $5",["2(?:[0367]|4[3-8])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{1,5})","$1 $2 $3 $4",["[3-57]|8[13-9]|9(?:0[89]|[2-579])|(?:2|80)[2-9]"],,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LV:[,[,,"(?:[268]\\d|78|90)\\d{6}",,,,,,,[8]],[,,"6\\d{7}",,,,"63123456"],[,,"2333[0-8]\\d{3}|2(?:[0-24-9]\\d\\d|3(?:0[07]|[14-9]\\d|2[02-9]|3[0-24-9]))\\d{4}",,,,"21234567"],[,,"80\\d{6}",,,,"80123456"],[,,"90\\d{6}",,,,"90123456"],[,,"81\\d{6}",,,,"81123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LV",371,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2679]|8[01]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LY:[,[,,"[2-9]\\d{8}",,,,,,,[9],[7]],[,,"(?:2(?:0[56]|[1-6]\\d|7[124579]|8[124])|3(?:1\\d|2[2356])|4(?:[17]\\d|2[1-357]|5[2-4]|8[124])|5(?:[1347]\\d|2[1-469]|5[13-5]|8[1-4])|6(?:[1-479]\\d|5[2-57]|8[1-5])|7(?:[13]\\d|2[13-79])|8(?:[124]\\d|5[124]|84))\\d{6}",,,,"212345678",,,,[7]],[,,"9[1-6]\\d{7}",,,,"912345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LY",218,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{7})","$1-$2",["[2-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MA:[,[,,"[5-8]\\d{8}",,,,,,,[9]],[,,"5(?:2(?:[0-25-79]\\d|3[1-578]|4[02-46-8]|8[0235-7])|3(?:[0-47]\\d|5[02-9]|6[02-8]|8[014-9]|9[3-9])|(?:4[067]|5[03])\\d)\\d{5}",,,,"520123456"],[,,"(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[0167]\\d|2[0-8]|5[0-5]|8[0-7]))\\d{6}",,,,"650123456"],[,,"80[0-7]\\d{6}",,,,"801234567"],[,,"89\\d{7}",,,,"891234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:592(?:4[0-2]|93)|80[89]\\d\\d)\\d{4}",,,,"592401234"],"MA",212,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5[45]"],"0$1"],[,"(\\d{4})(\\d{5})","$1-$2",["5(?:2[2-46-9]|3[3-9]|9)|8(?:0[89]|92)"],"0$1"],[,"(\\d{2})(\\d{7})","$1-$2",["8"],"0$1"],[,"(\\d{3})(\\d{6})","$1-$2",["[5-7]"],"0$1"]],,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MC:[,[,,"(?:[3489]|6\\d)\\d{7}",,,,,,,[8,9]],[,,"(?:870|9[2-47-9]\\d)\\d{5}",,,,"99123456",,,[8]],[,,"4(?:[469]\\d|5[1-9])\\d{5}|(?:3|6\\d)\\d{7}",,,,"612345678"],[,,"(?:800|90\\d)\\d{5}",,,,"90123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MC",377,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["87"]],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["4"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[389]"]],[,"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["6"],"0$1"]],[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["4"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[389]"]],[,"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["6"],"0$1"]],[,,,,,,,,,[-1]],,,[,,"8[07]0\\d{5}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MD:[,[,,"(?:[235-7]\\d|[89]0)\\d{6}",,,,,,,[8]],[,,"(?:(?:2[1-9]|3[1-79])\\d|5(?:33|5[257]))\\d{5}",,,,"22212345"],[,,"562\\d{5}|(?:6\\d|7[16-9])\\d{6}",,,,"62112345"],[,,"800\\d{5}",,,,"80012345"],[,,"90[056]\\d{5}",,,,"90012345"],[,,"808\\d{5}",,,,"80812345"],[,,,,,,,,,[-1]],[,,"3[08]\\d{6}",,,,"30123456"],"MD",373,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{5})","$1 $2",["[89]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["22|3"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[25-7]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"803\\d{5}",,,,"80312345"],,,[,,,,,,,,,[-1]]],ME:[,[,,"(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}",,,,,,,[8,9],[6]],[,,"(?:20[2-8]|3(?:[0-2][2-7]|3[24-7])|4(?:0[2-467]|1[2467])|5(?:0[2467]|1[24-7]|2[2-467]))\\d{5}",,,,"30234567",,,[8],[6]],[,,"6(?:[07-9]\\d|3[024]|6[0-25])\\d{5}",,,,"60123456",,,[8]],[,,"80(?:[0-2578]|9\\d)\\d{5}",,,,"80080002"],[,,"9(?:4[1568]|5[178])\\d{5}",,,,"94515151",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"78[1-49]\\d{5}",,,,"78108780",,,[8]],"ME",382,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"77[1-9]\\d{5}",,,,"77273012",,,[8]],,,[,,,,,,,,,[-1]]],MF:[,[,,"(?:590\\d|7090)\\d{5}|(?:69|80|9\\d)\\d{7}",,,,,,,[9]],[,,"590(?:0[079]|[14]3|[27][79]|3[03-7]|5[0-268]|87)\\d{4}",,,,"590271234"],[,,"(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))|7090[0-4])\\d{4}",,,,"690001234"],[,,"80[0-5]\\d{6}",,,,"800012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}",,,,"976012345"],"MF",590,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MG:[,[,,"[23]\\d{8}",,,,,,,[9],[7]],[,,"2072[29]\\d{4}|20(?:2\\d|4[47]|5[3467]|6[279]|7[356]|8[268]|9[2457])\\d{5}",,,,"202123456",,,,[7]],[,,"3[2-47-9]\\d{7}",,,,"321234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"22\\d{7}",,,,"221234567"],"MG",261,"00","0",,,"([24-9]\\d{6})$|0","20$1",,,[[,"(\\d{2})(\\d{2})(\\d{3})(\\d{2})","$1 $2 $3 $4",["[23]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MH:[,[,,"329\\d{4}|(?:[256]\\d|45)\\d{5}",,,,,,,[7]],[,,"(?:247|528|625)\\d{4}",,,,"2471234"],[,,"(?:(?:23|54)5|329|45[35-8])\\d{4}",,,,"2351234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"635\\d{4}",,,,"6351234"],"MH",692,"011","1",,,"1",,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[2-6]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MK:[,[,,"[2-578]\\d{7}",,,,,,,[8],[6,7]],[,,"(?:(?:2(?:62|77)0|3444)\\d|4[56]440)\\d{3}|(?:34|4[357])700\\d{3}|(?:2(?:[0-3]\\d|5[0-578]|6[01]|82)|3(?:1[3-68]|[23][2-68]|4[23568])|4(?:[23][2-68]|4[3-68]|5[2568]|6[25-8]|7[24-68]|8[4-68]))\\d{5}",,,,"22012345",,,,[6,7]],[,,"7(?:3555|(?:474|9[019]7)7)\\d{3}|7(?:[0-25-8]\\d\\d|3(?:[1-478]\\d|6[01])|4(?:2\\d|60|7[01578])|9(?:[2-4]\\d|5[01]|7[015]))\\d{4}",,,,"72345678"],[,,"800\\d{5}",,,,"80012345"],[,,"5\\d{7}",,,,"50012345"],[,,"8(?:0[1-9]|[1-9]\\d)\\d{5}",,,,"80123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MK",389,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2|34[47]|4(?:[37]7|5[47]|64)"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[347]"],"0$1"],[,"(\\d{3})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["[58]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ML:[,[,,"[24-9]\\d{7}",,,,,,,[8]],[,,"2(?:07[0-8]|12[67])\\d{4}|(?:2(?:02|1[4-689])|4(?:0[0-4]|4[1-59]))\\d{5}",,,,"20212345"],[,,"2(?:0(?:01|79)|17\\d)\\d{4}|(?:5[0-3]|[679]\\d|8[2-59])\\d{6}",,,,"65012345"],[,,"80\\d{6}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ML",223,"00",,,,,,,,[[,"(\\d{4})","$1",["67[057-9]|74[045]","67(?:0[09]|[59]9|77|8[89])|74(?:0[02]|44|55)"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24-9]"]]],[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24-9]"]]],[,,,,,,,,,[-1]],,,[,,"80\\d{6}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MM:[,[,,"1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}",,,,,,,[6,7,8,9,10],[5]],[,,"(?:1(?:(?:12|[28]\\d|3[56]|7[3-6]|9[0-6])\\d|4(?:2[29]|7[0-2]|83)|6)|2(?:2(?:00|8[34])|4(?:0\\d|22|7[0-2]|83)|51\\d\\d)|4(?:2(?:2\\d\\d|48[013])|3(?:20\\d|4(?:70|83)|56)|420\\d|5(?:2\\d|470))|6(?:0(?:[23]|88\\d)|(?:124|[56]2\\d)\\d|2472|3(?:20\\d|470)|4(?:2[04]\\d|472)|7(?:3\\d\\d|4[67]0|8(?:[01459]\\d|8))))\\d{4}|5(?:2(?:2\\d{5,6}|47[02]\\d{4})|(?:3472|4(?:2(?:1|86)|470)|522\\d|6(?:20\\d|483)|7(?:20\\d|48[01])|8(?:20\\d|47[02])|9(?:20\\d|470))\\d{4})|7(?:(?:0470|4(?:25\\d|470)|5(?:202|470|96\\d))\\d{4}|1(?:20\\d{4,5}|4(?:70|83)\\d{4}))|8(?:1(?:2\\d{5,6}|4(?:10|7[01]\\d)\\d{3})|2(?:2\\d{5,6}|(?:320|490\\d)\\d{3})|(?:3(?:2\\d\\d|470)|4[24-7]|5(?:(?:2\\d|51)\\d|4(?:[1-35-9]\\d|4[0-57-9]))|6[23])\\d{4})|(?:1[2-6]\\d|4(?:2[24-8]|3[2-7]|[46][2-6]|5[3-5])|5(?:[27][2-8]|3[2-68]|4[24-8]|5[23]|6[2-4]|8[24-7]|9[2-7])|6(?:[19]20|42[03-6]|(?:52|7[45])\\d)|7(?:[04][24-8]|[15][2-7]|22|3[2-4])|8(?:1[2-689]|2[2-8]|(?:[35]2|64)\\d))\\d{4}|25\\d{5,6}|(?:2[2-9]|6(?:1[2356]|[24][2-6]|3[24-6]|5[2-4]|6[2-8]|7[235-7]|8[245]|9[24])|8(?:3[24]|5[245]))\\d{4}",,,,"1234567",,,[6,7,8,9],[5]],[,,"(?:17[01]|9(?:2(?:[0-4]|[56]\\d\\d)|(?:3(?:[0-36]|4\\d)|(?:6\\d|8[89]|9[4-8])\\d|7(?:3|40|[5-9]\\d))\\d|4(?:(?:[0245]\\d|[1379])\\d|88)|5[0-6])\\d)\\d{4}|9[69]1\\d{6}|9(?:[68]\\d|9[089])\\d{5}",,,,"92123456",,,[7,8,9,10]],[,,"80080(?:0[1-9]|2\\d)\\d{3}",,,,"8008001234",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"1333\\d{4}",,,,"13331234",,,[8]],"MM",95,"00","0",,,"0",,,,[[,"(\\d)(\\d{2})(\\d{3})","$1 $2 $3",["16|2"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["4(?:[2-46]|5[3-5])|5|6(?:[1-689]|7[235-7])|7(?:[0-4]|5[2-7])|8[1-5]|(?:60|86)[23]"],"0$1"],[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[12]|452|678|86","[12]|452|6788|86"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[4-7]|8[1-35]"],"0$1"],[,"(\\d)(\\d{3})(\\d{4,6})","$1 $2 $3",["9(?:2[0-4]|[35-9]|4[137-9])"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"],"0$1"],[,"(\\d)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["92"],"0$1"],[,"(\\d)(\\d{5})(\\d{4})","$1 $2 $3",["9"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MN:[,[,,"[12]\\d{7,9}|[5-9]\\d{7}",,,,,,,[8,9,10],[4,5,6]],[,,"[12]2[1-3]\\d{5,6}|(?:(?:[12](?:1|27)|5[368])\\d\\d|7(?:0(?:[0-5]\\d|7[078]|80)|128))\\d{4}|[12](?:3[2-8]|4[2-68]|5[1-4689])\\d{6,7}",,,,"53123456",,,,[4,5,6]],[,,"92[0139]\\d{5}|(?:5[05]|6[069]|7[28]|8[0135689]|9[013-9])\\d{6}",,,,"88123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"712[0-79]\\d{4}|7(?:1[013-9]|[5-79]\\d)\\d{5}",,,,"75123456",,,[8]],"MN",976,"001","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[12]1"],"0$1"],[,"(\\d{4})(\\d{4})","$1 $2",["[5-9]"]],[,"(\\d{3})(\\d{5,6})","$1 $2",["[12]2[1-3]"],"0$1"],[,"(\\d{4})(\\d{5,6})","$1 $2",["[12](?:27|3[2-8]|4[2-68]|5[1-4689])","[12](?:27|3[2-8]|4[2-68]|5[1-4689])[0-3]"],"0$1"],[,"(\\d{5})(\\d{4,5})","$1 $2",["[12]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MO:[,[,,"0800\\d{3}|(?:28|[68]\\d)\\d{6}",,,,,,,[7,8]],[,,"(?:28[2-9]|8(?:11|[2-57-9]\\d))\\d{5}",,,,"28212345",,,[8]],[,,"6800[0-79]\\d{3}|6(?:[235]\\d\\d|6(?:0[0-5]|[1-9]\\d)|8(?:0[1-9]|[14-8]\\d|2[5-9]|[39][0-4]))\\d{4}",,,,"66123456",,,[8]],[,,"0800\\d{3}",,,,"0800501",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MO",853,"00",,,,,,,,[[,"(\\d{4})(\\d{3})","$1 $2",["0"]],[,"(\\d{4})(\\d{4})","$1 $2",["[268]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MP:[,[,,"[58]\\d{9}|(?:67|90)0\\d{7}",,,,,,,[10],[7]],[,,"670(?:2(?:3[3-7]|56|8[4-8])|32[1-38]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}",,,,"6702345678",,,,[7]],[,,"670(?:2(?:3[3-7]|56|8[4-8])|32[1-38]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}",,,,"6702345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"MP",1,"011","1",,,"([2-9]\\d{6})$|1","670$1",,1,,,[,,,,,,,,,[-1]],,"670",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MQ:[,[,,"(?:596\\d|7091)\\d{5}|(?:69|[89]\\d)\\d{7}",,,,,,,[9]],[,,"(?:596(?:[03-7]\\d|1[05]|2[7-9]|8[0-39]|9[04-9])|80[6-9]\\d\\d|9(?:477[6-9]|767[4589]))\\d{4}",,,,"596301234"],[,,"(?:69[67]\\d\\d|7091[0-3])\\d{4}",,,,"696201234"],[,,"80[0-5]\\d{6}",,,,"800012345"],[,,"8[129]\\d{7}",,,,"810123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9(?:397[0-3]|477[0-5]|76(?:6\\d|7[0-367]))\\d{4}",,,,"976612345"],"MQ",596,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-79]|8(?:0[6-9]|[36])"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MR:[,[,,"(?:[2-4]\\d\\d|800)\\d{5}",,,,,,,[8]],[,,"(?:25[08]|35\\d|45[1-7])\\d{5}",,,,"35123456"],[,,"[2-4][0-46-9]\\d{6}",,,,"22123456"],[,,"800\\d{5}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MR",222,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-48]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MS:[,[,,"(?:[58]\\d\\d|664|900)\\d{7}",,,,,,,[10],[7]],[,,"6644(?:1[0-3]|91)\\d{4}",,,,"6644912345",,,,[7]],[,,"664(?:3(?:49|9[1-6])|49[2-6])\\d{4}",,,,"6644923456",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"MS",1,"011","1",,,"([34]\\d{6})$|1","664$1",,,,,[,,,,,,,,,[-1]],,"664",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MT:[,[,,"3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}",,,,,,,[8]],[,,"20(?:3[1-4]|6[059])\\d{4}|2(?:0[19]|[1-357]\\d|60)\\d{5}",,,,"21001234"],[,,"(?:7(?:210|[79]\\d\\d)|9(?:[29]\\d\\d|69[67]|8(?:1[1-3]|89|97)))\\d{4}",,,,"96961234"],[,,"800(?:02|[3467]\\d)\\d{3}",,,,"80071234"],[,,"5(?:0(?:0(?:37|43)|(?:6\\d|70|9[0168])\\d)|[12]\\d0[1-5])\\d{3}",,,,"50037123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3550\\d{4}",,,,"35501234"],"MT",356,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[2357-9]"]]],,[,,"7117\\d{4}",,,,"71171234"],,,[,,,,,,,,,[-1]],[,,"501\\d{5}",,,,"50112345"],,,[,,,,,,,,,[-1]]],MU:[,[,,"(?:[57]|8\\d\\d)\\d{7}|[2-468]\\d{6}",,,,,,,[7,8,10]],[,,"(?:2(?:[0346-8]\\d|1[0-8])|4(?:[013568]\\d|2[4-8]|71|90)|54(?:[3-5]\\d|71)|6\\d\\d|8(?:14|3[129]))\\d{4}",,,,"54480123",,,[7,8]],[,,"5(?:4(?:2[1-389]|7[1-9])|87[15-8])\\d{4}|(?:5(?:2[5-9]|4[3-689]|[57]\\d|8[0-689]|9[0-8])|7(?:0[0-6]|3[013]))\\d{5}",,,,"52512345",,,[8]],[,,"802\\d{7}|80[0-2]\\d{4}",,,,"8001234",,,[7,10]],[,,"30\\d{5}",,,,"3012345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3(?:20|9\\d)\\d{4}",,,,"3201234",,,[7]],"MU",230,"0(?:0|[24-7]0|3[03])",,,,,,"020",,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-46]|8[013]"]],[,"(\\d{4})(\\d{4})","$1 $2",["[57]"]],[,"(\\d{5})(\\d{5})","$1 $2",["8"]]],,[,,"219\\d{4}",,,,"2190123",,,[7]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MV:[,[,,"(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}",,,,,,,[7,10]],[,,"(?:3(?:0[0-4]|3[0-59])|6(?:[58][024689]|6[024-68]|7[02468]))\\d{4}",,,,"6701234",,,[7]],[,,"(?:46[46]|[79]\\d\\d)\\d{4}",,,,"7712345",,,[7]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"900\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MV",960,"0(?:0|19)",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1-$2",["[34679]"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"4(?:0[01]|50)\\d{4}",,,,"4001234",,,[7]],,,[,,,,,,,,,[-1]]],MW:[,[,,"(?:[1289]\\d|31|77)\\d{7}|1\\d{6}",,,,,,,[7,9]],[,,"(?:1[2-9]|2[12]\\d\\d)\\d{5}",,,,"1234567"],[,,"111\\d{6}|(?:31|77|[89][89])\\d{7}",,,,"991234567",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MW",265,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["1[2-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[137-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MX:[,[,,"[2-9]\\d{9}",,,,,,,[10],[7,8]],[,,"(?:2(?:0[01]|2\\d|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|3\\d|7[1-8]|9[1-5])|4(?:1[1-57-9]|[267][1-9]|3[1-8]|[45]\\d|8[1-35-9]|9[2-689])|5(?:[56]\\d|88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-36-9]|6[0-57-9]|7[1-7]|8[67]|9[4-8])|7(?:[1346][1-9]|[27]\\d|5[13-9]|8[1-69]|9[17])|8(?:1\\d|2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[0-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69]\\d|7[12]|8[1-8]))\\d{7}",,,,"2001234567",,,,[7,8]],[,,"(?:2(?:2\\d|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|3\\d|7[1-8]|9[1-5])|4(?:1[1-57-9]|[267][1-9]|3[1-8]|[45]\\d|8[1-35-9]|9[2-689])|5(?:[56]\\d|88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-36-9]|6[0-57-9]|7[1-7]|8[67]|9[4-8])|7(?:[1346][1-9]|[27]\\d|5[13-9]|8[1-69]|9[17])|8(?:1\\d|2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[0-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69]\\d|7[12]|8[1-8]))\\d{7}",,,,"2221234567",,,,[7,8]],[,,"8(?:00|88)\\d{7}",,,,"8001234567"],[,,"900\\d{7}",,,,"9001234567"],[,,"300\\d{7}",,,,"3001234567"],[,,"500\\d{7}",,,,"5001234567"],[,,,,,,,,,[-1]],"MX",52,"0[09]",,,,,,"00",,[[,"(\\d{5})","$1",["53"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["33|5[56]|81"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2-9]"]]],[[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["33|5[56]|81"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2-9]"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MY:[,[,,"1\\d{8,9}|(?:3\\d|[4-9])\\d{7}",,,,,,,[8,9,10],[6,7]],[,,"427[01]\\d{4}|(?:3(?:2[0-36-9]|3[0-368]|4[0-278]|5[0-24-8]|6[0-467]|7[1246-9]|8\\d|9[0-57])\\d|4(?:2[0-689]|[3-79]\\d|8[1-35689])|5(?:2[0-589]|[3468]\\d|5[0-489]|7[1-9]|9[23])|6(?:2[2-9]|3[1357-9]|[46]\\d|5[0-6]|7[0-35-9]|85|9[015-8])|7(?:[2579]\\d|3[03-68]|4[0-8]|6[5-9]|8[0-35-9])|8(?:[24][2-8]|3[2-5]|5[2-7]|6[2-589]|7[2-578]|[89][2-9])|9(?:0[57]|13|[25-7]\\d|[3489][0-8]))\\d{5}",,,,"323856789",,,[8,9],[6,7]],[,,"1(?:1888[689]|4400|8(?:47|8[27])[0-4])\\d{4}|1(?:0(?:[23568]\\d|4[0-6]|7[016-9]|9[0-8])|1(?:[1-5]\\d\\d|6(?:0[5-9]|[1-9]\\d)|7(?:[0-4]\\d|5[0-7]))|(?:[269]\\d|[37][1-9]|4[235-9])\\d|5(?:31|9\\d\\d)|8(?:1[23]|[236]\\d|4[06]|5(?:46|[7-9])|7[016-9]|8[01]|9[0-8]))\\d{5}",,,,"123456789",,,[9,10]],[,,"1[378]00\\d{6}",,,,"1300123456",,,[10]],[,,"1600\\d{6}",,,,"1600123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"15(?:4(?:6[0-4]\\d|8(?:0[125]|[17]\\d|21|3[01]|4[01589]|5[014]|6[02]))|6(?:32[0-6]|78\\d))\\d{4}",,,,"1546012345",,,[10]],"MY",60,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1-$2 $3",["[4-79]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1-$2 $3",["1(?:[02469]|[378][1-9]|53)|8","1(?:[02469]|[37][1-9]|53|8(?:[1-46-9]|5[7-9]))|8"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1-$2 $3",["3"],"0$1"],[,"(\\d)(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3-$4",["1(?:[367]|80)"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2 $3",["15"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2 $3",["1"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MZ:[,[,,"(?:2|8\\d)\\d{7}",,,,,,,[8,9]],[,,"2(?:[1346]\\d|5[0-2]|[78][12]|93)\\d{5}",,,,"21123456",,,[8]],[,,"8[2-79]\\d{7}",,,,"821234567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MZ",258,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["2|8[2-79]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NA:[,[,,"[68]\\d{7,8}",,,,,,,[8,9]],[,,"64426\\d{3}|6(?:1(?:2[2-7]|3[01378]|4[0-4])|254|32[0237]|4(?:27|41|5[25])|52[236-8]|626|7(?:2[2-4]|30))\\d{4,5}|6(?:1(?:(?:0\\d|2[0189]|3[24-69]|4[5-9])\\d|17|69|7[014])|2(?:17|5[0-36-8]|69|70)|3(?:17|2[14-689]|34|6[289]|7[01]|81)|4(?:17|2[0-2]|4[06]|5[0137]|69|7[01])|5(?:17|2[0459]|69|7[01])|6(?:17|25|38|42|69|7[01])|7(?:17|2[569]|3[13]|6[89]|7[01]))\\d{4}",,,,"61221234"],[,,"(?:60|8[1245])\\d{7}",,,,"811234567",,,[9]],[,,"80\\d{7}",,,,"800123456",,,[9]],[,,"8701\\d{5}",,,,"870123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"8(?:3\\d\\d|86)\\d{5}",,,,"88612345"],"NA",264,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["88"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["6"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["87"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NC:[,[,,"(?:050|[2-57-9]\\d\\d)\\d{3}",,,,,,,[6]],[,,"(?:2[03-9]|3[0-5]|4[1-7]|88)\\d{4}",,,,"201234"],[,,"(?:[579]\\d|8[0-79])\\d{4}",,,,"751234"],[,,"050\\d{3}",,,,"050012"],[,,"36\\d{4}",,,,"366711"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NC",687,"00",,,,,,,,[[,"(\\d{3})","$1",["5[6-8]"]],[,"(\\d{2})(\\d{2})(\\d{2})","$1.$2.$3",["[02-57-9]"]]],[[,"(\\d{2})(\\d{2})(\\d{2})","$1.$2.$3",["[02-57-9]"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NE:[,[,,"[027-9]\\d{7}",,,,,,,[8]],[,,"2(?:0(?:20|3[1-8]|4[13-5]|5[14]|6[14578]|7[1-578])|1(?:4[145]|5[14]|6[14-68]|7[169]|88))\\d{4}",,,,"20201234"],[,,"(?:23|7[0467]|[89]\\d)\\d{6}",,,,"93123456"],[,,"08\\d{6}",,,,"08123456"],[,,"09\\d{6}",,,,"09123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NE",227,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["08"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[089]|2[013]|7[0467]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NF:[,[,,"[13]\\d{5}",,,,,,,[6],[5]],[,,"(?:1(?:06|17|28|39)|3[0-2]\\d)\\d{3}",,,,"106609",,,,[5]],[,,"(?:14|3[58])\\d{4}",,,,"381234",,,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NF",672,"00",,,,"([0-258]\\d{4})$","3$1",,,[[,"(\\d{2})(\\d{4})","$1 $2",["1[0-3]"]],[,"(\\d)(\\d{5})","$1 $2",["[13]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NG:[,[,,"(?:20|9\\d)\\d{8}|[78]\\d{9,13}",,,,,,,[10,11,12,13,14],[6,7]],[,,"20(?:[1259]\\d|3[013-9]|4[1-8]|6[024-689]|7[1-79]|8[2-9])\\d{6}",,,,"2033123456",,,[10],[6,7]],[,,"(?:702[0-24-9]|819[01])\\d{6}|(?:7(?:0[13-9]|[12]\\d)|8(?:0[1-9]|1[0-8])|9(?:0[1-9]|1[1-6]))\\d{7}",,,,"8021234567",,,[10]],[,,"800\\d{7,11}",,,,"80017591759"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NG",234,"009","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[7-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["20[129]"],"0$1"],[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{3})(\\d{4})(\\d{4,5})","$1 $2 $3",["[78]"],"0$1"],[,"(\\d{3})(\\d{5})(\\d{5,6})","$1 $2 $3",["[78]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"700\\d{7,11}",,,,"7001234567"],,,[,,,,,,,,,[-1]]],NI:[,[,,"(?:1800|[25-8]\\d{3})\\d{4}",,,,,,,[8]],[,,"2\\d{7}",,,,"21234567"],[,,"(?:5(?:5[0-7]|[78]\\d)|6(?:20|3[035]|4[045]|5[05]|77|8[1-9]|9[059])|(?:7[5-8]|8\\d)\\d)\\d{5}",,,,"81234567"],[,,"1800\\d{4}",,,,"18001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NI",505,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[125-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NL:[,[,,"(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|8\\d{6,9}|9\\d{6,10}|1\\d{4,5}",,,,,,,[5,6,7,8,9,10,11]],[,,"(?:1(?:[035]\\d|1[13-578]|6[124-8]|7[24]|8[0-467])|2(?:[0346]\\d|2[2-46-9]|5[125]|9[479])|3(?:[03568]\\d|1[3-8]|2[01]|4[1-8])|4(?:[0356]\\d|1[1-368]|7[58]|8[15-8]|9[23579])|5(?:[0358]\\d|[19][1-9]|2[1-57-9]|4[13-8]|6[126]|7[0-3578])|7\\d\\d)\\d{6}",,,,"101234567",,,[9]],[,,"(?:6[1-58]|970\\d)\\d{7}",,,,"612345678",,,[9,11]],[,,"800\\d{4,7}",,,,"8001234",,,[7,8,9,10]],[,,"90[069]\\d{4,7}",,,,"9061234",,,[7,8,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:85|91)\\d{7}",,,,"851234567",,,[9]],"NL",31,"00","0",,,"0",,,,[[,"(\\d{4})","$1",["1[238]|[34]"]],[,"(\\d{2})(\\d{3,4})","$1 $2",["14"]],[,"(\\d{6})","$1",["1"]],[,"(\\d{3})(\\d{4,7})","$1 $2",["[89]0"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["66"],"0$1"],[,"(\\d)(\\d{8})","$1 $2",["6"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-578]|91"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{5})","$1 $2 $3",["9"],"0$1"]],[[,"(\\d{3})(\\d{4,7})","$1 $2",["[89]0"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["66"],"0$1"],[,"(\\d)(\\d{8})","$1 $2",["6"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-578]|91"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{5})","$1 $2 $3",["9"],"0$1"]],[,,"66\\d{7}",,,,"662345678",,,[9]],,,[,,"140(?:1[035]|2[0346]|3[03568]|4[0356]|5[0358]|8[458])|140(?:1[16-8]|2[259]|3[124]|4[17-9]|5[124679]|7)\\d",,,,,,,[5,6]],[,,"140(?:1[035]|2[0346]|3[03568]|4[0356]|5[0358]|8[458])|(?:140(?:1[16-8]|2[259]|3[124]|4[17-9]|5[124679]|7)|8[478]\\d{6})\\d",,,,"14020",,,[5,6,9]],,,[,,,,,,,,,[-1]]],NO:[,[,,"(?:0|[2-9]\\d{3})\\d{4}",,,,,,,[5,8]],[,,"(?:2[1-4]|3[1-3578]|5[1-35-7]|6[1-4679]|7[0-8])\\d{6}",,,,"21234567",,,[8]],[,,"(?:4[015-8]|9\\d)\\d{6}",,,,"40612345",,,[8]],[,,"80[01]\\d{5}",,,,"80012345",,,[8]],[,,"82[09]\\d{5}",,,,"82012345",,,[8]],[,,"810(?:0[0-6]|[2-8]\\d)\\d{3}",,,,"81021234",,,[8]],[,,"880\\d{5}",,,,"88012345",,,[8]],[,,"85[0-5]\\d{5}",,,,"85012345",,,[8]],"NO",47,"00",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["8"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-79]"]]],,[,,,,,,,,,[-1]],1,"[02-689]|7[0-8]",[,,,,,,,,,[-1]],[,,"(?:0[235-9]|81(?:0(?:0[7-9]|1\\d)|5\\d\\d))\\d{3}",,,,"02000"],,,[,,"81[23]\\d{5}",,,,"81212345",,,[8]]],NP:[,[,,"(?:1\\d|9)\\d{9}|[1-9]\\d{7}",,,,,,,[8,10,11],[6,7]],[,,"(?:1[0-6]\\d|99[02-6])\\d{5}|(?:2[13-79]|3[135-8]|4[146-9]|5[135-7]|6[13-9]|7[15-9]|8[1-46-9]|9[1-7])[2-6]\\d{5}",,,,"14567890",,,[8],[6,7]],[,,"9(?:00|6[0-3]|7[0-24-6]|8[0-24-68])\\d{7}",,,,"9841234567",,,[10]],[,,"1(?:66001|800\\d\\d)\\d{5}",,,,"16600101234",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NP",977,"00","0",,,"0",,,,[[,"(\\d)(\\d{7})","$1-$2",["1[2-6]"],"0$1"],[,"(\\d{2})(\\d{6})","$1-$2",["1[01]|[2-8]|9(?:[1-59]|[67][2-6])"],"0$1"],[,"(\\d{3})(\\d{7})","$1-$2",["9"]],[,"(\\d{4})(\\d{2})(\\d{5})","$1-$2-$3",["1"]]],[[,"(\\d)(\\d{7})","$1-$2",["1[2-6]"],"0$1"],[,"(\\d{2})(\\d{6})","$1-$2",["1[01]|[2-8]|9(?:[1-59]|[67][2-6])"],"0$1"],[,"(\\d{3})(\\d{7})","$1-$2",["9"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NR:[,[,,"(?:222|444|(?:55|8\\d)\\d|666|777|999)\\d{4}",,,,,,,[7]],[,,"444\\d{4}",,,,"4441234"],[,,"(?:222|55[3-9]|666|777|8\\d\\d|999)\\d{4}",,,,"5551234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NR",674,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[24-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NU:[,[,,"(?:[4-7]|888\\d)\\d{3}",,,,,,,[4,7]],[,,"[47]\\d{3}",,,,"7012",,,[4]],[,,"(?:[56]|888[1-9])\\d{3}",,,,"8884012"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NU",683,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NZ:[,[,,"[1289]\\d{9}|50\\d{5}(?:\\d{2,3})?|[27-9]\\d{7,8}|(?:[34]\\d|6[0-35-9])\\d{6}|8\\d{4,6}",,,,,,,[5,6,7,8,9,10]],[,,"240\\d{5}|(?:3[2-79]|[49][2-9]|6[235-9]|7[2-57-9])\\d{6}",,,,"32345678",,,[8],[7]],[,,"2(?:[0-27-9]\\d|6)\\d{6,7}|2(?:1\\d|75)\\d{5}",,,,"211234567",,,[8,9,10]],[,,"508\\d{6,7}|80\\d{6,8}",,,,"800123456",,,[8,9,10]],[,,"(?:1[13-57-9]\\d{5}|50(?:0[08]|30|66|77|88))\\d{3}|90\\d{6,8}",,,,"900123456",,,[7,8,9,10]],[,,,,,,,,,[-1]],[,,"70\\d{7}",,,,"701234567",,,[9]],[,,,,,,,,,[-1]],"NZ",64,"0(?:0|161)","0",,,"0",,"00",,[[,"(\\d{2})(\\d{3,8})","$1 $2",["8[1-79]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["50[036-8]|8|90","50(?:[0367]|88)|8|90"],"0$1"],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["24|[346]|7[2-57-9]|9[2-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:10|74)|[589]"],"0$1"],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["1|2[028]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,5})","$1 $2 $3",["2(?:[169]|7[0-35-9])|7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"8(?:1[16-9]|22|3\\d|4[045]|5[459]|6[235-9]|7[0-3579]|90)\\d{2,7}",,,,"83012378"],,,[,,,,,,,,,[-1]]],OM:[,[,,"(?:1505|[279]\\d{3}|500)\\d{4}|800\\d{5,6}",,,,,,,[7,8,9]],[,,"2[1-6]\\d{6}",,,,"23123456",,,[8]],[,,"1505\\d{4}|(?:7(?:[125-9]\\d|41)|9(?:0[1-9]|[1-9]\\d))\\d{5}",,,,"92123456",,,[8]],[,,"8007\\d{4,5}|(?:500|800[05])\\d{4}",,,,"80071234"],[,,"900\\d{5}",,,,"90012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"OM",968,"00",,,,,,,,[[,"(\\d{3})(\\d{4,6})","$1 $2",["[58]"]],[,"(\\d{2})(\\d{6})","$1 $2",["2"]],[,"(\\d{4})(\\d{4})","$1 $2",["[179]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PA:[,[,,"(?:00800|8\\d{3})\\d{6}|[68]\\d{7}|[1-57-9]\\d{6}",,,,,,,[7,8,10,11]],[,,"(?:1(?:0\\d|1[0479]|2[37]|3[0137]|4[17]|5[05]|6[058]|7[0167]|8[2358]|9[1389])|2(?:[0235-79]\\d|1[0-7]|4[013-9]|8[02-9])|3(?:[047-9]\\d|1[0-8]|2[0-5]|33|5[0-35]|6[068])|4(?:00|3[0-579]|4\\d|7[0-57-9])|5(?:[01]\\d|2[0-7]|[56]0|79)|7(?:0[09]|2[0-26-8]|3[03]|4[04]|5[05-9]|6[0156]|7[0-24-9]|8[4-9]|90)|8(?:09|2[89]|3\\d|4[0-24-689]|5[014]|8[02])|9(?:0[5-9]|1[0135-8]|2[036-9]|3[35-79]|40|5[0457-9]|6[05-9]|7[04-9]|8[35-8]|9\\d))\\d{4}",,,,"2001234",,,[7]],[,,"(?:1[16]1|21[89]|6\\d{3}|8(?:1[01]|7[23]))\\d{4}",,,,"61234567",,,[7,8]],[,,"800\\d{4,5}|(?:00800|800\\d)\\d{6}",,,,"8001234"],[,,"(?:8(?:22|55|60|7[78]|86)|9(?:00|81))\\d{4}",,,,"8601234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PA",507,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[1-57-9]"]],[,"(\\d{4})(\\d{4})","$1-$2",["[68]"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PE:[,[,,"(?:[14-8]|9\\d)\\d{7}",,,,,,,[8,9],[6,7]],[,,"(?:(?:(?:4[34]|5[14])[0-8]|687)\\d|7(?:173|(?:3[0-8]|55)\\d)|8(?:10[05689]|6(?:0[06-9]|1[6-9]|29)|7(?:0[0569]|[56]0)))\\d{4}|(?:1[0-8]|4[12]|5[236]|6[1-7]|7[246]|8[2-4])\\d{6}",,,,"11234567",,,[8],[6,7]],[,,"9\\d{8}",,,,"912345678",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"805\\d{5}",,,,"80512345",,,[8]],[,,"801\\d{5}",,,,"80112345",,,[8]],[,,"80[24]\\d{5}",,,,"80212345",,,[8]],[,,,,,,,,,[-1]],"PE",51,"00|19(?:1[124]|77|90)00","0"," Anexo ",,"0",,"00",,[[,"(\\d{3})(\\d{5})","$1 $2",["80"],"(0$1)"],[,"(\\d)(\\d{7})","$1 $2",["1"],"(0$1)"],[,"(\\d{2})(\\d{6})","$1 $2",["[4-8]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PF:[,[,,"4\\d{5}(?:\\d{2})?|8\\d{7,8}",,,,,,,[6,8,9]],[,,"4(?:0[4-689]|9[4-68])\\d{5}",,,,"40412345",,,[8]],[,,"8[7-9]\\d{6}",,,,"87123456",,,[8]],[,,"80[0-5]\\d{6}",,,,"800012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"499\\d{5}",,,,"49901234",,,[8]],"PF",689,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["44"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4|8[7-9]"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"]]],,[,,,,,,,,,[-1]],,,[,,"44\\d{4}",,,,,,,[6]],[,,"44\\d{4}",,,,"440123",,,[6]],,,[,,,,,,,,,[-1]]],PG:[,[,,"(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}",,,,,,,[7,8]],[,,"(?:(?:3[0-2]|4[257]|5[34]|9[78])\\d|64[1-9]|85[02-46-9])\\d{4}",,,,"3123456",,,[7]],[,,"(?:7\\d|8[1-48])\\d{6}",,,,"70123456",,,[8]],[,,"180\\d{4}",,,,"1801234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"2(?:0[0-57]|7[568])\\d{4}",,,,"2751234",,,[7]],"PG",675,"00|140[1-3]",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["18|[2-69]|85"]],[,"(\\d{4})(\\d{4})","$1 $2",["[78]"]]],,[,,"27[01]\\d{4}",,,,"2700123",,,[7]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PH:[,[,,"(?:[2-7]|9\\d)\\d{8}|2\\d{5}|(?:1800|8)\\d{7,9}",,,,,,,[6,8,9,10,11,12,13],[4,5,7]],[,,"(?:(?:2[3-8]|3[2-68]|4[2-9]|5[2-6]|6[2-58]|7[24578])\\d{3}|88(?:22\\d\\d|42))\\d{4}|(?:2|8[2-8]\\d\\d)\\d{5}",,,,"232345678",,,[6,8,9,10],[4,5,7]],[,,"(?:8(?:1[37]|9[5-8])|9(?:0[5-9]|1[0-24-9]|[235-7]\\d|4[2-9]|8[135-9]|9[1-9]))\\d{7}",,,,"9051234567",,,[10]],[,,"1800\\d{7,9}",,,,"180012345678",,,[11,12,13]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PH",63,"00","0",,,"0",,,,[[,"(\\d)(\\d{5})","$1 $2",["2"],"(0$1)"],[,"(\\d{4})(\\d{4,6})","$1 $2",["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|544|88[245]|(?:52|64|86)2","3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"],"(0$1)"],[,"(\\d{5})(\\d{4})","$1 $2",["346|4(?:27|9[35])|883","3469|4(?:279|9(?:30|56))|8834"],"(0$1)"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[3-7]|8[2-8]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]],[,"(\\d{4})(\\d{1,2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PK:[,[,,"122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[06-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}",,,,,,,[8,9,10,11,12],[5,6,7]],[,,"(?:(?:21|42)[2-9]|58[126])\\d{7}|(?:2[25]|4[0146-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]\\d{6,7}|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8]))[2-9]\\d{5,6}",,,,"2123456789",,,[9,10],[5,6,7,8]],[,,"3(?:[0-247]\\d|3[0-79]|55|64)\\d{7}",,,,"3012345678",,,[10]],[,,"800\\d{5}(?:\\d{3})?",,,,"80012345",,,[8,11]],[,,"900\\d{5}",,,,"90012345",,,[8]],[,,,,,,,,,[-1]],[,,"122\\d{6}",,,,"122044444",,,[9]],[,,,,,,,,,[-1]],"PK",92,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{2,7})","$1 $2 $3",["[89]0"],"0$1"],[,"(\\d{4})(\\d{5})","$1 $2",["1"]],[,"(\\d{3})(\\d{6,7})","$1 $2",["2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8])","9(?:2[3-8]|98)|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:22|3[27-9]|4[2-6]|6[3569]|9[25-7]))[2-9]"],"(0$1)"],[,"(\\d{2})(\\d{7,8})","$1 $2",["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"],"(0$1)"],[,"(\\d{5})(\\d{5})","$1 $2",["58"],"(0$1)"],[,"(\\d{3})(\\d{7})","$1 $2",["3"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["[24-9]"],"(0$1)"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:2(?:[125]|3[2358]|4[2-4]|9[2-8])|4(?:[0-246-9]|5[3479])|5(?:[1-35-7]|4[2-467])|6(?:0[468]|[1-8])|7(?:[14]|2[236])|8(?:[16]|2[2-689]|3[23578]|4[3478]|5[2356])|9(?:1|22|3[27-9]|4[2-6]|6[3569]|9[2-7]))111\\d{6}",,,,"21111825888",,,[11,12]],,,[,,,,,,,,,[-1]]],PL:[,[,,"(?:6|8\\d\\d)\\d{7}|[1-9]\\d{6}(?:\\d{2})?|[26]\\d{5}",,,,,,,[6,7,8,9,10]],[,,"47\\d{7}|(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])(?:[02-9]\\d{6}|1(?:[0-8]\\d{5}|9\\d{3}(?:\\d{2})?))",,,,"123456789",,,[7,9]],[,,"2131[89]\\d{4}|21(?:1[013-5]|2\\d|3[2-9])\\d{5}|(?:45|5[0137]|6[069]|7[2389]|88)\\d{7}",,,,"512345678",,,[9]],[,,"800\\d{6,7}",,,,"800123456",,,[9,10]],[,,"70[01346-8]\\d{6}",,,,"701234567",,,[9]],[,,"801\\d{6}",,,,"801234567",,,[9]],[,,,,,,,,,[-1]],[,,"39\\d{7}",,,,"391234567",,,[9]],"PL",48,"00",,,,,,,,[[,"(\\d{5})","$1",["19"]],[,"(\\d{3})(\\d{3})","$1 $2",["11|20|64"]],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])1","(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])19"]],[,"(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["64"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["21|39|45|5[0137]|6[0469]|7[02389]|8(?:0[14]|8)"]],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[2-8]|[2-7]|8[1-79]|9[145]"]],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["8"]]],,[,,"64\\d{4,7}",,,,"641234567",,,[6,7,8,9]],,,[,,,,,,,,,[-1]],[,,"804\\d{6}",,,,"804123456",,,[9]],,,[,,,,,,,,,[-1]]],PM:[,[,,"[45]\\d{5}|(?:708|8\\d\\d)\\d{6}",,,,,,,[6,9]],[,,"(?:4[1-35-9]|5[0-47-9]|80[6-9]\\d\\d)\\d{4}",,,,"430123"],[,,"(?:4[02-489]|5[02-9]|708(?:4[0-5]|5[0-6]))\\d{4}",,,,"551234"],[,,"80[0-5]\\d{6}",,,,"800012345",,,[9]],[,,"8[129]\\d{7}",,,,"810123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PM",508,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[45]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["7"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PR:[,[,,"(?:[589]\\d\\d|787)\\d{7}",,,,,,,[10],[7]],[,,"(?:787|939)[2-9]\\d{6}",,,,"7872345678",,,,[7]],[,,"(?:787|939)[2-9]\\d{6}",,,,"7872345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"PR",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,"787|939",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PS:[,[,,"[2489]2\\d{6}|(?:1\\d|5)\\d{8}",,,,,,,[8,9,10],[7]],[,,"(?:22[2-47-9]|42[45]|82[014-68]|92[3569])\\d{5}",,,,"22234567",,,[8],[7]],[,,"5[69]\\d{7}",,,,"599123456",,,[9]],[,,"1800\\d{6}",,,,"1800123456",,,[10]],[,,,,,,,,,[-1]],[,,"1700\\d{6}",,,,"1700123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PS",970,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2489]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["5"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PT:[,[,,"1693\\d{5}|(?:[26-9]\\d|30)\\d{7}",,,,,,,[9]],[,,"2(?:[12]\\d|3[1-689]|4[1-59]|[57][1-9]|6[1-35689]|8[1-69]|9[1256])\\d{6}",,,,"212345678"],[,,"6(?:[06]92(?:30|9\\d)|[35]92(?:[049]\\d|3[034]))\\d{3}|(?:(?:16|6[0356])93|9(?:[1-36]\\d\\d|480))\\d{5}",,,,"912345678"],[,,"80[02]\\d{6}",,,,"800123456"],[,,"(?:6(?:0[178]|4[68])\\d|76(?:0[1-57]|1[2-47]|2[237]))\\d{5}",,,,"760123456"],[,,"80(?:8\\d|9[1579])\\d{5}",,,,"808123456"],[,,"884[0-4689]\\d{5}",,,,"884123456"],[,,"30\\d{7}",,,,"301234567"],"PT",351,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["2[12]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["16|[236-9]"]]],,[,,"6(?:222\\d|89(?:00|88|99))\\d{4}",,,,"622212345"],,,[,,,,,,,,,[-1]],[,,"70(?:38[01]|596|(?:7\\d|8[17])\\d)\\d{4}",,,,"707123456"],,,[,,"600\\d{6}|6[06]92(?:0\\d|3[349]|49)\\d{3}",,,,"600110000"]],PW:[,[,,"(?:[24-8]\\d\\d|345|900)\\d{4}",,,,,,,[7]],[,,"(?:2(?:55|77)|345|488|5(?:35|44|87)|6(?:22|54|79)|7(?:33|47)|8(?:24|55|76)|900)\\d{4}",,,,"2771234"],[,,"(?:(?:46|83)[0-5]|(?:6[2-4689]|78)0)\\d{4}|(?:45|77|88)\\d{5}",,,,"6201234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PW",680,"01[12]",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PY:[,[,,"59\\d{4,6}|9\\d{5,10}|(?:[2-46-8]\\d|5[0-8])\\d{4,7}",,,,,,,[6,7,8,9,10,11],[5]],[,,"(?:[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36])\\d{5,7}|(?:2(?:2[4-68]|[4-68]\\d|7[15]|9[1-5])|3(?:18|3[167]|4[2357]|51|[67]\\d)|4(?:3[12]|5[13]|9[1-47])|5(?:[1-4]\\d|5[02-4])|6(?:3[1-3]|44|7[1-8])|7(?:4[0-4]|5\\d|6[1-578]|75|8[0-8])|858)\\d{5,6}",,,,"212345678",,,[7,8,9],[5,6]],[,,"9(?:51|6[129]|7[1-6]|8[1-7]|9[1-5])\\d{6}",,,,"961456789",,,[9]],[,,"9800\\d{5,7}",,,,"98000123456",,,[9,10,11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"8700[0-4]\\d{4}",,,,"870012345",,,[9]],"PY",595,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3,6})","$1 $2",["[2-9]0"],"0$1"],[,"(\\d{2})(\\d{5})","$1 $2",["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"],"(0$1)"],[,"(\\d{3})(\\d{4,5})","$1 $2",["2[279]|3[13-5]|4[359]|5|6(?:[34]|7[1-46-8])|7[46-8]|85"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["2[14-68]|3[26-9]|4[1246-8]|6(?:1|75)|7[1-35]|8[1-36]"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["87"]],[,"(\\d{3})(\\d{6})","$1 $2",["9(?:[5-79]|8[1-7])"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["9"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"[2-9]0\\d{4,7}",,,,"201234567",,,[6,7,8,9]],,,[,,,,,,,,,[-1]]],QA:[,[,,"800\\d{4}|(?:2|800)\\d{6}|(?:0080|[3-7])\\d{7}",,,,,,,[7,8,9,11]],[,,"4(?:1111|2022)\\d{3}|4(?:[04]\\d\\d|14[0-6]|999)\\d{4}",,,,"44123456",,,[8]],[,,"[35-7]\\d{7}",,,,"33123456",,,[8]],[,,"800\\d{4}|(?:0080[01]|800)\\d{6}",,,,"8001234",,,[7,9,11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"QA",974,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["2[136]|8"]],[,"(\\d{4})(\\d{4})","$1 $2",["[3-7]"]]],,[,,"2[136]\\d{5}",,,,"2123456",,,[7]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],RE:[,[,,"709\\d{6}|(?:26|[689]\\d)\\d{7}",,,,,,,[9]],[,,"26(?:2\\d\\d|3(?:0\\d|1[0-6]))\\d{4}",,,,"262161234"],[,,"(?:69(?:2\\d\\d|3(?:[06][0-6]|1[0-3]|2[0-2]|3[0-39]|4\\d|5[0-5]|7[0-37]|8[0-8]|9[0-479]))|7092[0-3])\\d{4}",,,,"692123456"],[,,"80\\d{7}",,,,"801234567"],[,,"89[1-37-9]\\d{6}",,,,"891123456"],[,,"8(?:1[019]|2[0156]|84|90)\\d{6}",,,,"810123456"],[,,,,,,,,,[-1]],[,,"9(?:399[0-3]|479[0-6]|76(?:2[278]|3[0-37]))\\d{4}",,,,"939901234"],"RE",262,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[26-9]"],"0$1"]],,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],RO:[,[,,"(?:[236-8]\\d|90)\\d{7}|[23]\\d{5}",,,,,,,[6,9]],[,,"[23][13-6]\\d{7}|(?:2(?:19\\d|[3-6]\\d9)|31\\d\\d)\\d\\d",,,,"211234567"],[,,"(?:630|702)0\\d{5}|(?:6(?:00|2\\d)|7(?:0[013-9]|1[0-3]|[2-7]\\d|8[03-8]|9[0-39]))\\d{6}",,,,"712034567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"90[0136]\\d{6}",,,,"900123456",,,[9]],[,,"801\\d{6}",,,,"801123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RO",40,"00","0"," int ",,"0",,,,[[,"(\\d{3})(\\d{3})","$1 $2",["2[3-6]","2[3-6]\\d9"],"0$1"],[,"(\\d{2})(\\d{4})","$1 $2",["219|31"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[23]1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[236-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:37\\d|80[578])\\d{6}",,,,"372123456",,,[9]],,,[,,,,,,,,,[-1]]],RS:[,[,,"38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}",,,,,,,[6,7,8,9,10,11,12],[4,5]],[,,"(?:11[1-9]\\d|(?:2[389]|39)(?:0[2-9]|[2-9]\\d))\\d{3,8}|(?:1[02-9]|2[0-24-7]|3[0-8])[2-9]\\d{4,9}",,,,"10234567",,,[7,8,9,10,11,12],[4,5,6]],[,,"6(?:[0-689]|7\\d)\\d{6,7}",,,,"601234567",,,[8,9,10]],[,,"800\\d{3,9}",,,,"80012345"],[,,"(?:78\\d|90[0169])\\d{3,7}",,,,"90012345",,,[6,7,8,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RS",381,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3,9})","$1 $2",["(?:2[389]|39)0|[7-9]"],"0$1"],[,"(\\d{2})(\\d{5,10})","$1 $2",["[1-36]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"7[06]\\d{4,10}",,,,"700123456"],,,[,,,,,,,,,[-1]]],RU:[,[,,"8\\d{13}|[347-9]\\d{9}",,,,,,,[10,14],[7]],[,,"336(?:[013-9]\\d|2[013-9])\\d{5}|(?:3(?:0[12]|4[1-35-79]|5[1-3]|65|8[1-58]|9[0145])|4(?:01|1[1356]|2[13467]|7[1-5]|8[1-7]|9[1-689])|8(?:1[1-8]|2[01]|3[13-6]|4[0-8]|5[15-7]|6[0-35-79]|7[1-37-9]))\\d{7}",,,,"3011234567",,,[10],[7]],[,,"9\\d{9}",,,,"9123456789",,,[10]],[,,"8(?:0[04]|108\\d{3})\\d{7}",,,,"8001234567"],[,,"80[39]\\d{7}",,,,"8091234567",,,[10]],[,,,,,,,,,[-1]],[,,"808\\d{7}",,,,"8081234567",,,[10]],[,,,,,,,,,[-1]],"RU",7,"810","8",,,"8",,"8~10",,[[,"(\\d{3})(\\d{2})(\\d{2})","$1-$2-$3",["[0-79]"]],[,"(\\d{4})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["7(?:1[0-8]|2[1-9])","7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:1[23]|[2-9]2))","7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"],"8 ($1)",,1],[,"(\\d{5})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["7(?:1[0-68]|2[1-9])","7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))","7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"],"8 ($1)",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[349]|8(?:[02-7]|1[1-8])"],"8 ($1)",,1],[,"(\\d{4})(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3 $4",["8"],"8 ($1)"]],[[,"(\\d{4})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["7(?:1[0-8]|2[1-9])","7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:1[23]|[2-9]2))","7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"],"8 ($1)",,1],[,"(\\d{5})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["7(?:1[0-68]|2[1-9])","7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))","7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"],"8 ($1)",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[349]|8(?:[02-7]|1[1-8])"],"8 ($1)",,1],[,"(\\d{4})(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3 $4",["8"],"8 ($1)"]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],RW:[,[,,"(?:06|[27]\\d\\d|[89]00)\\d{6}",,,,,,,[8,9]],[,,"(?:06|2[23568]\\d)\\d{6}",,,,"250123456"],[,,"7[237-9]\\d{7}",,,,"720123456",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"900\\d{6}",,,,"900123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RW",250,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["2"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[7-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SA:[,[,,"(?:[15]\\d|800|92)\\d{7}",,,,,,,[9,10],[7]],[,,"1(?:1\\d|2[24-8]|3[35-8]|4[3-68]|6[2-5]|7[235-7])\\d{6}",,,,"112345678",,,[9],[7]],[,,"579[01]\\d{5}|5(?:[013-689]\\d|7[0-8])\\d{6}",,,,"512345678",,,[9]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"925\\d{6}",,,,"925012345",,,[9]],[,,"920\\d{6}",,,,"920012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SA",966,"00","0",,,"0",,,,[[,"(\\d{4})(\\d{5})","$1 $2",["9"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SB:[,[,,"[6-9]\\d{6}|[1-6]\\d{4}",,,,,,,[5,7]],[,,"(?:1[4-79]|[23]\\d|4[0-2]|5[03]|6[0-37])\\d{3}",,,,"40123",,,[5]],[,,"48\\d{3}|(?:(?:6[89]|7[1-9]|8[4-9])\\d|9(?:1[2-9]|2[013-9]|3[0-2]|[46]\\d|5[0-46-9]|7[0-689]|8[0-79]|9[0-8]))\\d{4}",,,,"7421234"],[,,"1[38]\\d{3}",,,,"18123",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5[12]\\d{3}",,,,"51123",,,[5]],"SB",677,"0[01]",,,,,,,,[[,"(\\d{2})(\\d{5})","$1 $2",["6[89]|7|8[4-9]|9(?:[1-8]|9[0-8])"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SC:[,[,,"(?:[2489]\\d|64)\\d{5}",,,,,,,[7]],[,,"4[2-46]\\d{5}",,,,"4217123"],[,,"2[125-8]\\d{5}",,,,"2510123"],[,,"800[08]\\d{3}",,,,"8000000"],[,,"85\\d{5}",,,,"8512345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"971\\d{4}|(?:64|95)\\d{5}",,,,"6412345"],"SC",248,"010|0[0-2]",,,,,,"00",,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[246]|9[57]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SD:[,[,,"[19]\\d{8}",,,,,,,[9]],[,,"1(?:5\\d|8[35-7])\\d{6}",,,,"153123456"],[,,"(?:1[0-2]|9[0-3569])\\d{7}",,,,"911231234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SD",249,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[19]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SE:[,[,,"(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}",,,,,,,[6,7,8,9,10,12]],[,,"(?:(?:[12][136]|3[356]|4[0246]|6[03]|8\\d)\\d|90[1-9])\\d{4,6}|(?:1(?:2[0-35]|4[0-4]|5[0-25-9]|7[13-6]|[89]\\d)|2(?:2[0-7]|4[0136-8]|5[0138]|7[018]|8[01]|9[0-57])|3(?:0[0-4]|1\\d|2[0-25]|4[056]|7[0-2]|8[0-3]|9[023])|4(?:1[013-8]|3[0135]|5[14-79]|7[0-246-9]|8[0156]|9[0-689])|5(?:0[0-6]|[15][0-5]|2[0-68]|3[0-4]|4\\d|6[03-5]|7[013]|8[0-79]|9[01])|6(?:1[1-3]|2[0-4]|4[02-57]|5[0-37]|6[0-3]|7[0-2]|8[0247]|9[0-356])|9(?:1[0-68]|2\\d|3[02-5]|4[0-3]|5[0-4]|[68][01]|7[0135-8]))\\d{5,6}",,,,"8123456",,,[7,8,9]],[,,"7[02369]\\d{7}",,,,"701234567",,,[9]],[,,"20\\d{4,7}",,,,"20123456",,,[6,7,8,9]],[,,"649\\d{6}|99[1-59]\\d{4}(?:\\d{3})?|9(?:00|39|44)[1-8]\\d{3,6}",,,,"9001234567",,,[7,8,9,10]],[,,"77[0-7]\\d{6}",,,,"771234567",,,[9]],[,,"75[1-8]\\d{6}",,,,"751234567",,,[9]],[,,,,,,,,,[-1]],"SE",46,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2,3})(\\d{2})","$1-$2 $3",["20"],"0$1"],[,"(\\d{3})(\\d{4})","$1-$2",["9(?:00|39|44|9)"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})","$1-$2 $3",["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"],"0$1"],[,"(\\d)(\\d{2,3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["8"],"0$1"],[,"(\\d{3})(\\d{2,3})(\\d{2})","$1-$2 $3",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"],"0$1"],[,"(\\d{3})(\\d{2,3})(\\d{3})","$1-$2 $3",["9(?:00|39|44)"],"0$1"],[,"(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["10|7"],"0$1"],[,"(\\d)(\\d{3})(\\d{3})(\\d{2})","$1-$2 $3 $4",["8"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1-$2 $3 $4",["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{3})","$1-$2 $3 $4",["9"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4 $5",["[26]"],"0$1"]],[[,"(\\d{2})(\\d{2,3})(\\d{2})","$1 $2 $3",["20"]],[,"(\\d{3})(\\d{4})","$1 $2",["9(?:00|39|44|9)"]],[,"(\\d{2})(\\d{3})(\\d{2})","$1 $2 $3",["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"]],[,"(\\d)(\\d{2,3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"]],[,"(\\d{3})(\\d{2,3})(\\d{2})","$1 $2 $3",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"]],[,"(\\d{3})(\\d{2,3})(\\d{3})","$1 $2 $3",["9(?:00|39|44)"]],[,"(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"]],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["10|7"]],[,"(\\d)(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3 $4",["8"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["9"]],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[26]"]]],[,,"74[02-9]\\d{6}",,,,"740123456",,,[9]],,,[,,,,,,,,,[-1]],[,,"10[1-8]\\d{6}",,,,"102345678",,,[9]],,,[,,"(?:25[245]|67[3-68])\\d{9}",,,,"254123456789",,,[12]]],SG:[,[,,"(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}",,,,,,,[8,10,11]],[,,"662[0-24-9]\\d{4}|6(?:[0-578]\\d|6[013-57-9]|9[0-35-9])\\d{5}",,,,"61234567",,,[8]],[,,"898[02-8]\\d{4}|(?:8(?:0[1-9]|[1-8]\\d|9[0-7])|9[0-8]\\d)\\d{5}",,,,"81234567",,,[8]],[,,"(?:18|8)00\\d{7}",,,,"18001234567",,,[10,11]],[,,"1900\\d{7}",,,,"19001234567",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:3[12]\\d|666)\\d{5}",,,,"31234567",,,[8]],"SG",65,"0[0-3]\\d",,,,,,,,[[,"(\\d{4,5})","$1",["1[013-9]|77","1(?:[013-8]|9(?:0[1-9]|[1-9]))|77"]],[,"(\\d{4})(\\d{4})","$1 $2",["[369]|8(?:0[1-9]|[1-9])"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]],[,"(\\d{4})(\\d{4})(\\d{3})","$1 $2 $3",["7"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]],[[,"(\\d{4})(\\d{4})","$1 $2",["[369]|8(?:0[1-9]|[1-9])"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]],[,"(\\d{4})(\\d{4})(\\d{3})","$1 $2 $3",["7"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"7000\\d{7}",,,,"70001234567",,,[11]],,,[,,,,,,,,,[-1]]],SH:[,[,,"(?:[256]\\d|8)\\d{3}",,,,,,,[4,5]],[,,"2(?:[0-57-9]\\d|6[4-9])\\d\\d",,,,"22158"],[,,"[56]\\d{4}",,,,"51234",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"262\\d\\d",,,,"26212",,,[5]],"SH",290,"00",,,,,,,,,,[,,,,,,,,,[-1]],1,"[256]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SI:[,[,,"[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}",,,,,,,[5,6,7,8]],[,,"(?:[1-357][2-8]|4[24-8])\\d{6}",,,,"12345678",,,[8],[7]],[,,"65(?:[178]\\d|5[56]|6[01])\\d{4}|(?:[37][01]|4[0139]|51|6[489])\\d{6}",,,,"31234567",,,[8]],[,,"80\\d{4,6}",,,,"80123456",,,[6,7,8]],[,,"89[1-3]\\d{2,5}|90\\d{4,6}",,,,"90123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:59\\d\\d|8(?:1(?:[67]\\d|8[0-589])|2(?:0\\d|2[0-37-9]|8[0-2489])|3[389]\\d))\\d{4}",,,,"59012345",,,[8]],"SI",386,"00|10(?:22|66|88|99)","0",,,"0",,"00",,[[,"(\\d{2})(\\d{3,6})","$1 $2",["8[09]|9"],"0$1"],[,"(\\d{3})(\\d{5})","$1 $2",["59|8"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[37][01]|4[0139]|51|6"],"0$1"],[,"(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1-57]"],"(0$1)"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SJ:[,[,,"0\\d{4}|(?:[489]\\d|79)\\d{6}",,,,,,,[5,8]],[,,"79\\d{6}",,,,"79123456",,,[8]],[,,"(?:4[015-8]|9\\d)\\d{6}",,,,"41234567",,,[8]],[,,"80[01]\\d{5}",,,,"80012345",,,[8]],[,,"82[09]\\d{5}",,,,"82012345",,,[8]],[,,"810(?:0[0-6]|[2-8]\\d)\\d{3}",,,,"81021234",,,[8]],[,,"880\\d{5}",,,,"88012345",,,[8]],[,,"85[0-5]\\d{5}",,,,"85012345",,,[8]],"SJ",47,"00",,,,,,,,,,[,,,,,,,,,[-1]],,"79",[,,,,,,,,,[-1]],[,,"(?:0[235-9]|81(?:0(?:0[7-9]|1\\d)|5\\d\\d))\\d{3}",,,,"02000"],,,[,,"81[23]\\d{5}",,,,"81212345",,,[8]]],SK:[,[,,"[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}",,,,,,,[6,7,9]],[,,"(?:2(?:16|[2-9]\\d{3})|(?:(?:[3-5][1-8]\\d|819)\\d|601[1-5])\\d)\\d{4}|(?:2|[3-5][1-8])1[67]\\d{3}|[3-5][1-8]16\\d\\d",,,,"221234567"],[,,"909[1-9]\\d{5}|9(?:0[1-8]|1[0-24-9]|4[03-57-9]|5\\d)\\d{6}",,,,"912123456",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"9(?:00|[78]\\d)\\d{6}",,,,"900123456",,,[9]],[,,"8[5-9]\\d{7}",,,,"850123456",,,[9]],[,,,,,,,,,[-1]],[,,"6(?:02|5[0-4]|9[0-6])\\d{6}",,,,"690123456",,,[9]],"SK",421,"00","0",,,"0",,,,[[,"(\\d)(\\d{2})(\\d{3,4})","$1 $2 $3",["21"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2,3})","$1 $2 $3",["[3-5][1-8]1","[3-5][1-8]1[67]"],"0$1"],[,"(\\d{4})(\\d{3})","$1 $2",["909","9090"],"0$1"],[,"(\\d)(\\d{3})(\\d{3})(\\d{2})","$1/$2 $3 $4",["2"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[689]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1/$2 $3 $4",["[3-5]"],"0$1"]],[[,"(\\d)(\\d{2})(\\d{3,4})","$1 $2 $3",["21"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2,3})","$1 $2 $3",["[3-5][1-8]1","[3-5][1-8]1[67]"],"0$1"],[,"(\\d)(\\d{3})(\\d{3})(\\d{2})","$1/$2 $3 $4",["2"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[689]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1/$2 $3 $4",["[3-5]"],"0$1"]],[,,"9090\\d{3}",,,,"9090123",,,[7]],,,[,,"9090\\d{3}|(?:602|8(?:00|[5-9]\\d)|9(?:00|[78]\\d))\\d{6}",,,,,,,[7,9]],[,,"96\\d{7}",,,,"961234567",,,[9]],,,[,,,,,,,,,[-1]]],SL:[,[,,"(?:[237-9]\\d|66)\\d{6}",,,,,,,[8],[6]],[,,"22[2-4][2-9]\\d{4}",,,,"22221234",,,,[6]],[,,"(?:25|3[0-5]|66|7[1-9]|8[08]|9[09])\\d{6}",,,,"25123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SL",232,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{6})","$1 $2",["[236-9]"],"(0$1)"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SM:[,[,,"(?:0549|[5-7]\\d)\\d{6}",,,,,,,[8,10],[6]],[,,"0549(?:8[0157-9]|9\\d)\\d{4}",,,,"0549886377",,,[10],[6]],[,,"6[16]\\d{6}",,,,"66661212",,,[8]],[,,,,,,,,,[-1]],[,,"7[178]\\d{6}",,,,"71123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5[158]\\d{6}",,,,"58001110",,,[8]],"SM",378,"00",,,,"([89]\\d{5})$","0549$1",,,[[,"(\\d{6})","$1",["[89]"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],[,"(\\d{4})(\\d{6})","$1 $2",["0"]]],[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],[,"(\\d{4})(\\d{6})","$1 $2",["0"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SN:[,[,,"(?:[378]\\d|93)\\d{7}",,,,,,,[9]],[,,"3(?:0(?:1[0-2]|80)|282|3(?:8[1-9]|9[3-9])|611)\\d{5}",,,,"301012345"],[,,"7(?:(?:[06-8]\\d|[19]0|21)\\d|5(?:0[01]|[19]0|2[25]|3[356]|[4-7]\\d|8[35]))\\d{5}",,,,"701234567"],[,,"800\\d{6}",,,,"800123456"],[,,"88[4689]\\d{6}",,,,"884123456"],[,,"81[02468]\\d{6}",,,,"810123456"],[,,,,,,,,,[-1]],[,,"(?:3(?:392|9[01]\\d)\\d|93(?:3[13]0|929))\\d{4}",,,,"933301234"],"SN",221,"00",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"]],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[379]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SO:[,[,,"[346-9]\\d{8}|[12679]\\d{7}|[1-5]\\d{6}|[1348]\\d{5}",,,,,,,[6,7,8,9]],[,,"(?:1\\d|2[0-79]|3[0-46-8]|4[0-7]|5[57-9])\\d{5}|(?:[134]\\d|8[125])\\d{4}",,,,"4012345",,,[6,7]],[,,"(?:(?:15|(?:3[59]|4[89]|6\\d|7[679]|8[08])\\d|9(?:0\\d|[2-9]))\\d|2(?:4\\d|8))\\d{5}|(?:[67]\\d\\d|904)\\d{5}",,,,"71123456",,,[7,8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SO",252,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{4})","$1 $2",["8[125]"]],[,"(\\d{6})","$1",["[134]"]],[,"(\\d)(\\d{6})","$1 $2",["[15]|2[0-79]|3[0-46-8]|4[0-7]"]],[,"(\\d)(\\d{7})","$1 $2",["(?:2|90)4|[67]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[348]|64|79|90"]],[,"(\\d{2})(\\d{5,7})","$1 $2",["1|28|6[0-35-9]|7[67]|9[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SR:[,[,,"(?:[2-5]|[6-8]\\d|90)\\d{5}",,,,,,,[6,7]],[,,"(?:2[1-3]|3[0-7]|4\\d|5[2-58])\\d{4}",,,,"211234",,,[6]],[,,"(?:6[08]|7[124-7]|8[1-9])\\d{5}",,,,"7412345",,,[7]],[,,"80\\d{5}",,,,"8012345",,,[7]],[,,"90\\d{5}",,,,"9012345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"56\\d{4}",,,,"561234",,,[6]],"SR",597,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1-$2-$3",["56"]],[,"(\\d{3})(\\d{3})","$1-$2",["[2-5]"]],[,"(\\d{3})(\\d{4})","$1-$2",["[6-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SS:[,[,,"[19]\\d{8}",,,,,,,[9]],[,,"1[89]\\d{7}",,,,"181234567"],[,,"(?:12|9[1257-9])\\d{7}",,,,"977123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SS",211,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[19]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ST:[,[,,"(?:22|9\\d)\\d{5}",,,,,,,[7]],[,,"22\\d{5}",,,,"2221234"],[,,"900[5-9]\\d{3}|9(?:0[1-9]|[89]\\d)\\d{4}",,,,"9812345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ST",239,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[29]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SV:[,[,,"[267]\\d{7}|(?:80\\d|900)\\d{4}(?:\\d{4})?",,,,,,,[7,8,11]],[,,"2(?:79(?:0[0347-9]|[1-9]\\d)|89(?:0[024589]|[1-9]\\d))\\d{3}|2(?:[1-69]\\d|[78][0-8])\\d{5}",,,,"21234567",,,[8]],[,,"[67]\\d{7}",,,,"70123456",,,[8]],[,,"800\\d{8}|80[01]\\d{4}",,,,"8001234",,,[7,11]],[,,"900\\d{4}(?:\\d{4})?",,,,"9001234",,,[7,11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SV",503,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[89]"]],[,"(\\d{4})(\\d{4})","$1 $2",["[267]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[89]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SX:[,[,,"7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"7215(?:4[2-8]|8[239]|9[056])\\d{4}",,,,"7215425678",,,,[7]],[,,"7215(?:1[02]|2\\d|5[034679]|8[014-8])\\d{4}",,,,"7215205678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"SX",1,"011","1",,,"(5\\d{6})$|1","721$1",,,,,[,,,,,,,,,[-1]],,"721",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SY:[,[,,"[1-359]\\d{8}|[1-5]\\d{7}",,,,,,,[8,9],[6,7]],[,,"21\\d{6,7}|(?:1(?:[14]\\d|[2356])|2[235]|3(?:[13]\\d|4)|4[134]|5[1-3])\\d{6}",,,,"112345678",,,,[6,7]],[,,"(?:50|9[1-9])\\d{7}",,,,"944567890",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SY",963,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-4]|5[1-3]"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[59]"],"0$1",,1]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SZ:[,[,,"0800\\d{4}|(?:[237]\\d|900)\\d{6}",,,,,,,[8,9]],[,,"[23][2-5]\\d{6}",,,,"22171234",,,[8]],[,,"7[5-9]\\d{6}",,,,"76123456",,,[8]],[,,"0800\\d{4}",,,,"08001234",,,[8]],[,,"900\\d{6}",,,,"900012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"70\\d{6}",,,,"70012345",,,[8]],"SZ",268,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[0237]"]],[,"(\\d{5})(\\d{4})","$1 $2",["9"]]],,[,,,,,,,,,[-1]],,,[,,"0800\\d{4}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TA:[,[,,"8\\d{3}",,,,,,,[4]],[,,"8\\d{3}",,,,"8999"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TA",290,"00",,,,,,,,,,[,,,,,,,,,[-1]],,"8",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TC:[,[,,"(?:[58]\\d\\d|649|900)\\d{7}",,,,,,,[10],[7]],[,,"649(?:266|712|9(?:4\\d|50))\\d{4}",,,,"6497121234",,,,[7]],[,,"649(?:2(?:3[129]|4[1-79])|3\\d\\d|4[34][1-3])\\d{4}",,,,"6492311234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,"649(?:71[01]|966)\\d{4}",,,,"6497101234",,,,[7]],"TC",1,"011","1",,,"([2-479]\\d{6})$|1","649$1",,,,,[,,,,,,,,,[-1]],,"649",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TD:[,[,,"(?:22|30|[689]\\d|77)\\d{6}",,,,,,,[8]],[,,"22(?:[37-9]0|5[0-5]|6[89])\\d{4}",,,,"22501234"],[,,"(?:30|[69]\\d|77|8[56])\\d{6}",,,,"63012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TD",235,"00|16",,,,,,"00",,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[236-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TG:[,[,,"[279]\\d{7}",,,,,,,[8]],[,,"2(?:2[2-7]|3[23]|4[45]|55|6[67]|77)\\d{5}",,,,"22212345"],[,,"(?:7[0-29]|9[0-36-9])\\d{6}",,,,"90112345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TG",228,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[279]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TH:[,[,,"(?:001800|[2-57]|[689]\\d)\\d{7}|1\\d{7,9}",,,,,,,[8,9,10,13]],[,,"(?:1[0689]|2\\d|3[2-9]|4[2-5]|5[2-6]|7[3-7])\\d{6}",,,,"21234567",,,[8]],[,,"67(?:1[0-8]|2[4-7])\\d{5}|(?:14|6[1-6]|[89]\\d)\\d{7}",,,,"812345678",,,[9]],[,,"(?:001800\\d|1800)\\d{6}",,,,"1800123456",,,[10,13]],[,,"1900\\d{6}",,,,"1900123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"6[08]\\d{7}",,,,"601234567",,,[9]],"TH",66,"00[1-9]","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[13-9]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TJ:[,[,,"[0-57-9]\\d{8}",,,,,,,[9],[3,5,6,7]],[,,"(?:3(?:1[3-5]|2[245]|3[12]|4[24-7]|5[25]|72)|4(?:46|74|87))\\d{6}",,,,"372123456",,,,[3,5,6,7]],[,,"(?:33[03-9]|4(?:1[18]|4[02-479])|81[1-9])\\d{6}|(?:[09]\\d|1[0-27-9]|2[0-27]|[34]0|5[05]|7[01578]|8[078])\\d{7}",,,,"917123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TJ",992,"810",,,,,,"8~10",,[[,"(\\d{6})(\\d)(\\d{2})","$1 $2 $3",["331","3317"]],[,"(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["44[02-479]|[34]7"]],[,"(\\d{4})(\\d)(\\d{4})","$1 $2 $3",["3(?:[1245]|3[12])"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[0-57-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TK:[,[,,"[2-47]\\d{3,6}",,,,,,,[4,5,6,7]],[,,"(?:2[2-4]|[34]\\d)\\d{2,5}",,,,"3101"],[,,"7[2-4]\\d{2,5}",,,,"7290"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TK",690,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TL:[,[,,"7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}",,,,,,,[7,8]],[,,"(?:2[1-5]|3[1-9]|4[1-4])\\d{5}",,,,"2112345",,,[7]],[,,"7[2-8]\\d{6}",,,,"77212345",,,[8]],[,,"80\\d{5}",,,,"8012345",,,[7]],[,,"90\\d{5}",,,,"9012345",,,[7]],[,,,,,,,,,[-1]],[,,"70\\d{5}",,,,"7012345",,,[7]],[,,,,,,,,,[-1]],"TL",670,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-489]|70"]],[,"(\\d{4})(\\d{4})","$1 $2",["7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TM:[,[,,"(?:[1-6]\\d|71)\\d{6}",,,,,,,[8]],[,,"(?:1(?:2\\d|3[1-9])|2(?:22|4[0-35-8])|3(?:22|4[03-9])|4(?:22|3[128]|4\\d|6[15])|5(?:22|5[7-9]|6[014-689]))\\d{5}",,,,"12345678"],[,,"(?:6\\d|71)\\d{6}",,,,"66123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TM",993,"810","8",,,"8",,"8~10",,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["12"],"(8 $1)"],[,"(\\d{3})(\\d)(\\d{2})(\\d{2})","$1 $2-$3-$4",["[1-5]"],"(8 $1)"],[,"(\\d{2})(\\d{6})","$1 $2",["[67]"],"8 $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TN:[,[,,"[2-57-9]\\d{7}",,,,,,,[8]],[,,"81200\\d{3}|(?:3[0-2]|7\\d)\\d{6}",,,,"30010123"],[,,"3(?:001|[12]40)\\d{4}|(?:(?:[259]\\d|4[0-8])\\d|3(?:1[1-35]|6[0-4]|91))\\d{5}",,,,"20123456"],[,,"8010\\d{4}",,,,"80101234"],[,,"88\\d{6}",,,,"88123456"],[,,"8[12]10\\d{4}",,,,"81101234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TN",216,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-57-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TO:[,[,,"(?:0800|(?:[5-8]\\d\\d|999)\\d)\\d{3}|[2-8]\\d{4}",,,,,,,[5,7]],[,,"(?:2\\d|3[0-8]|4[0-4]|50|6[09]|7[0-24-69]|8[05])\\d{3}",,,,"20123",,,[5]],[,,"(?:5(?:4[0-5]|5[4-6])|6(?:[09]\\d|3[02]|8[15-9])|(?:7\\d|8[46-9])\\d|999)\\d{4}",,,,"7715123",,,[7]],[,,"0800\\d{3}",,,,"0800222",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"55[0-37-9]\\d{4}",,,,"5510123",,,[7]],"TO",676,"00",,,,,,,,[[,"(\\d{2})(\\d{3})","$1-$2",["[2-4]|50|6[09]|7[0-24-69]|8[05]"]],[,"(\\d{4})(\\d{3})","$1 $2",["0"]],[,"(\\d{3})(\\d{4})","$1 $2",["[5-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TR:[,[,,"4\\d{6}|8\\d{11,12}|(?:[2-58]\\d\\d|900)\\d{7}",,,,,,,[7,10,12,13]],[,,"(?:2(?:[13][26]|[28][2468]|[45][268]|[67][246])|3(?:[13][28]|[24-6][2468]|[78][02468]|92)|4(?:[16][246]|[23578][2468]|4[26]))\\d{7}",,,,"2123456789",,,[10]],[,,"561(?:011|61\\d)\\d{4}|5(?:0[15-7]|1[06]|24|[34]\\d|5[1-59]|9[46])\\d{7}",,,,"5012345678",,,[10]],[,,"8(?:00\\d{7}(?:\\d{2,3})?|11\\d{7})",,,,"8001234567",,,[10,12,13]],[,,"(?:8[89]8|900)\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,"592(?:21[12]|461)\\d{4}",,,,"5922121234",,,[10]],[,,"850\\d{7}",,,,"8500123456",,,[10]],"TR",90,"00","0",,,"0",,,,[[,"(\\d{3})(\\d)(\\d{3})","$1 $2 $3",["444"],,,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["512|8[01589]|90"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5(?:[0-59]|61)","5(?:[0-59]|61[06])","5(?:[0-59]|61[06]1)"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24][1-8]|3[1-9]"],"(0$1)",,1],[,"(\\d{3})(\\d{3})(\\d{6,7})","$1 $2 $3",["80"],"0$1",,1]],[[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["512|8[01589]|90"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5(?:[0-59]|61)","5(?:[0-59]|61[06])","5(?:[0-59]|61[06]1)"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24][1-8]|3[1-9]"],"(0$1)",,1],[,"(\\d{3})(\\d{3})(\\d{6,7})","$1 $2 $3",["80"],"0$1",,1]],[,,"512\\d{7}",,,,"5123456789",,,[10]],,,[,,"(?:444|811\\d{3})\\d{4}",,,,,,,[7,10]],[,,"444\\d{4}",,,,"4441444",,,[7]],,,[,,,,,,,,,[-1]]],TT:[,[,,"(?:[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"868(?:2(?:01|1[5-9]|[23]\\d|4[0-2])|6(?:0[7-9]|1[02-8]|2[1-9]|[3-69]\\d|7[0-79])|82[124])\\d{4}",,,,"8682211234",,,,[7]],[,,"868(?:(?:2[5-9]|3\\d)\\d|4(?:3[0-6]|[6-9]\\d)|6(?:20|78|8\\d)|7(?:0[1-9]|1[02-9]|[2-9]\\d))\\d{4}",,,,"8682911234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"TT",1,"011","1",,,"([2-46-8]\\d{6})$|1","868$1",,,,,[,,,,,,,,,[-1]],,"868",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"868619\\d{4}",,,,"8686191234",,,,[7]]],TV:[,[,,"(?:2|7\\d\\d|90)\\d{4}",,,,,,,[5,6,7]],[,,"2[02-9]\\d{3}",,,,"20123",,,[5]],[,,"(?:7[01]\\d|90)\\d{4}",,,,"901234",,,[6,7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TV",688,"00",,,,,,,,[[,"(\\d{2})(\\d{3})","$1 $2",["2"]],[,"(\\d{2})(\\d{4})","$1 $2",["90"]],[,"(\\d{2})(\\d{5})","$1 $2",["7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TW:[,[,,"[2-689]\\d{8}|7\\d{9,10}|[2-8]\\d{7}|2\\d{6}",,,,,,,[7,8,9,10,11]],[,,"(?:2[2-8]\\d|370|55[01]|7[1-9])\\d{6}|4(?:(?:0(?:0[1-9]|[2-48]\\d)|1[023]\\d)\\d{4,5}|(?:[239]\\d\\d|4(?:0[56]|12|49))\\d{5})|6(?:[01]\\d{7}|4(?:0[56]|12|24|4[09])\\d{4,5})|8(?:(?:2(?:3\\d|4[0-269]|[578]0|66)|36[24-9]|90\\d\\d)\\d{4}|4(?:0[56]|12|24|4[09])\\d{4,5})|(?:2(?:2(?:0\\d\\d|4(?:0[68]|[249]0|3[0-467]|5[0-25-9]|6[0235689]))|(?:3(?:[09]\\d|1[0-4])|(?:4\\d|5[0-49]|6[0-29]|7[0-5])\\d)\\d)|(?:(?:3[2-9]|5[2-8]|6[0-35-79]|8[7-9])\\d\\d|4(?:2(?:[089]\\d|7[1-9])|(?:3[0-4]|[78]\\d|9[01])\\d))\\d)\\d{3}",,,,"221234567",,,[8,9]],[,,"(?:40001[0-2]|9[0-8]\\d{4})\\d{3}",,,,"912345678",,,[9]],[,,"80[0-79]\\d{6}|800\\d{5}",,,,"800123456",,,[8,9]],[,,"20(?:[013-9]\\d\\d|2)\\d{4}",,,,"203123456",,,[7,9]],[,,,,,,,,,[-1]],[,,"99\\d{7}",,,,"990123456",,,[9]],[,,"7010(?:[0-2679]\\d|3[0-7]|8[0-5])\\d{5}|70\\d{8}",,,,"7012345678",,,[10,11]],"TW",886,"0(?:0[25-79]|19)","0","#",,"0",,,,[[,"(\\d{2})(\\d)(\\d{4})","$1 $2 $3",["202"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[258]0"],"0$1"],[,"(\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["[23568]|4(?:0[02-48]|[1-47-9])|7[1-9]","[23568]|4(?:0[2-48]|[1-47-9])|(?:400|7)[1-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[49]"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4,5})","$1 $2 $3",["7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"50[0-46-9]\\d{6}",,,,"500123456",,,[9]],,,[,,,,,,,,,[-1]]],TZ:[,[,,"(?:[25-8]\\d|41|90)\\d{7}",,,,,,,[9]],[,,"2[2-8]\\d{7}",,,,"222345678"],[,,"(?:6[125-9]|7[13-9])\\d{7}",,,,"621234567"],[,,"80[08]\\d{6}",,,,"800123456"],[,,"90\\d{7}",,,,"900123456"],[,,"8(?:40|6[01])\\d{6}",,,,"840123456"],[,,,,,,,,,[-1]],[,,"41\\d{7}",,,,"412345678"],"TZ",255,"00[056]","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["[89]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[24]"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["5"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[67]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"(?:8(?:[04]0|6[01])|90\\d)\\d{6}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],UA:[,[,,"[89]\\d{9}|[3-9]\\d{8}",,,,,,,[9,10],[5,6,7]],[,,"(?:3[1-8]|4[13-8]|5[1-7]|6[12459])\\d{7}",,,,"311234567",,,[9],[5,6,7]],[,,"790\\d{6}|(?:39|50|6[36-8]|7[1-357]|9[1-9])\\d{7}",,,,"501234567",,,[9]],[,,"800[1-8]\\d{5,6}",,,,"800123456"],[,,"900[239]\\d{5,6}",,,,"900212345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"89[1-579]\\d{6}",,,,"891234567",,,[9]],"UA",380,"00","0",,,"0",,"0~0",,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6[12][29]|(?:3[1-8]|4[136-8]|5[12457]|6[49])2|(?:56|65)[24]","6[12][29]|(?:35|4[1378]|5[12457]|6[49])2|(?:56|65)[24]|(?:3[1-46-8]|46)2[013-9]"],"0$1"],[,"(\\d{4})(\\d{5})","$1 $2",["3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6[0135689]|7[4-6])|6(?:[12][3-7]|[459])","3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6(?:[015689]|3[02389])|7[4-6])|6(?:[12][3-7]|[459])"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[3-7]|89|9[1-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],UG:[,[,,"800\\d{6}|(?:[29]0|[347]\\d)\\d{7}",,,,,,,[9],[5,6,7]],[,,"20(?:(?:240|30[67])\\d|6(?:00[0-2]|30[0-4]))\\d{3}|(?:20(?:[017]\\d|2[5-9]|3[1-4]|5[0-4]|6[15-9])|[34]\\d{3})\\d{5}",,,,"312345678",,,,[5,6,7]],[,,"72[48]0\\d{5}|7(?:[014-8]\\d|2[067]|36|9[0189])\\d{6}",,,,"712345678"],[,,"800[1-3]\\d{5}",,,,"800123456"],[,,"90[1-3]\\d{6}",,,,"901123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UG",256,"00[057]","0",,,"0",,,,[[,"(\\d{4})(\\d{5})","$1 $2",["202","2024"],"0$1"],[,"(\\d{3})(\\d{6})","$1 $2",["[27-9]|4(?:6[45]|[7-9])"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["[34]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],US:[,[,,"[2-9]\\d{9}|3\\d{6}",,,,,,,[10],[7]],[,,"(?:3052(?:0[0-8]|[1-9]\\d)|5056(?:[0-35-9]\\d|4[0-68]))\\d{4}|(?:2742|305[3-9]|(?:472|983)[2-47-9]|505[2-57-9])\\d{6}|(?:2(?:0[1-35-9]|1[02-9]|2[03-57-9]|3[1459]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-47-9]|1[02-9]|2[0135-79]|3[0-24679]|4[167]|5[0-2]|6[01349]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[023578]|58|6[349]|7[0589]|8[04])|5(?:0[1-47-9]|1[0235-8]|20|3[0149]|4[01]|5[179]|6[1-47]|7[0-5]|8[0256])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[0156]|5[01679]|6[0-279]|78|8[0-269])|7(?:0[1-46-8]|1[2-9]|2[04-8]|3[0-247]|4[0378]|5[47]|6[02359]|7[0-59]|8[156])|8(?:0[1-68]|1[02-8]|2[0168]|3[0-2589]|4[03578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[01357-9]|5[12469]|7[0-3589]|8[04-69]))[2-9]\\d{6}",,,,"2015550123",,,,[7]],[,,"(?:3052(?:0[0-8]|[1-9]\\d)|5056(?:[0-35-9]\\d|4[0-68]))\\d{4}|(?:2742|305[3-9]|(?:472|983)[2-47-9]|505[2-57-9])\\d{6}|(?:2(?:0[1-35-9]|1[02-9]|2[03-57-9]|3[1459]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-47-9]|1[02-9]|2[0135-79]|3[0-24679]|4[167]|5[0-2]|6[01349]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[023578]|58|6[349]|7[0589]|8[04])|5(?:0[1-47-9]|1[0235-8]|20|3[0149]|4[01]|5[179]|6[1-47]|7[0-5]|8[0256])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[0156]|5[01679]|6[0-279]|78|8[0-269])|7(?:0[1-46-8]|1[2-9]|2[04-8]|3[0-247]|4[0378]|5[47]|6[02359]|7[0-59]|8[156])|8(?:0[1-68]|1[02-8]|2[0168]|3[0-2589]|4[03578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[01357-9]|5[12469]|7[0-3589]|8[04-69]))[2-9]\\d{6}",,,,"2015550123",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,"305209\\d{4}",,,,"3052090123",,,,[7]],"US",1,"011","1",,,"1",,,1,[[,"(\\d{3})(\\d{4})","$1-$2",["310"],,,1],[,"(\\d{3})(\\d{4})","$1-$2",["[24-9]|3(?:[02-9]|1[1-9])"]],[,"(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",["[2-9]"],,,1]],[[,"(\\d{3})(\\d{4})","$1-$2",["310"],,,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[2-9]"]]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],UY:[,[,,"0004\\d{2,9}|[1249]\\d{7}|2\\d{3,4}|(?:[49]\\d|80)\\d{5}",,,,,,,[4,5,6,7,8,9,10,11,12,13]],[,,"(?:1(?:770|9(?:20|[89]7))|(?:2\\d|4[2-7])\\d\\d)\\d{4}",,,,"21231234",,,[8],[7]],[,,"9[1-9]\\d{6}",,,,"94231234",,,[8]],[,,"0004\\d{2,9}|(?:405|80[05])\\d{4}",,,,"8001234",,,[6,7,8,9,10,11,12,13]],[,,"90[0-8]\\d{4}",,,,"9001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UY",598,"0(?:0|1[3-9]\\d)","0"," int. ",,"0",,"00",,[[,"(\\d{4,5})","$1",["21"]],[,"(\\d{3})(\\d{3,4})","$1 $2",["0"]],[,"(\\d{3})(\\d{4})","$1 $2",["[49]0|8"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"],[,"(\\d{4})(\\d{4})","$1 $2",["[124]"]],[,"(\\d{3})(\\d{3})(\\d{2,4})","$1 $2 $3",["0"]],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{2,4})","$1 $2 $3 $4",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"21\\d{2,3}",,,,"21123",,,[4,5]],,,[,,,,,,,,,[-1]]],UZ:[,[,,"(?:20|33|[5-9]\\d)\\d{7}",,,,,,,[9]],[,,"(?:55\\d\\d|6(?:1(?:22|3[124]|4[1-4]|5[1-3578]|64)|2(?:22|3[0-57-9]|41)|5(?:22|3[3-7]|5[024-8])|[69]\\d\\d|7(?:[23]\\d|7[69]))|7(?:0(?:5[4-9]|6[0146]|7[124-6]|9[135-8])|[168]\\d\\d|2(?:22|3[13-57-9]|4[1-3579]|5[14])|3(?:2\\d|3[1578]|4[1-35-7]|5[1-57]|61)|4(?:2\\d|3[1-579]|7[1-79])|5(?:22|5[1-9]|6[1457])|9(?:22|5[1-9])))\\d{5}",,,,"669050123"],[,,"(?:(?:[25]0|33|8[78]|9[0-57-9])\\d{3}|6(?:1(?:2(?:2[01]|98)|35[0-4]|50\\d|61[23]|7(?:[01][017]|4\\d|55|9[5-9]))|2(?:(?:11|7\\d)\\d|2(?:[12]1|9[01379])|5(?:[126]\\d|3[0-4]))|5(?:19[01]|2(?:27|9[26])|(?:30|59|7\\d)\\d)|6(?:2(?:1[5-9]|2[0367]|38|41|52|60)|(?:3[79]|9[0-3])\\d|4(?:56|83)|7(?:[07]\\d|1[017]|3[07]|4[047]|5[057]|67|8[0178]|9[79]))|7(?:2(?:24|3[237]|4[5-9]|7[15-8])|5(?:7[12]|8[0589])|7(?:0\\d|[39][07])|9(?:0\\d|7[079])))|7(?:[07]\\d{3}|2(?:2(?:2[79]|95)|3(?:2[5-9]|6[0-6])|57\\d|7(?:0\\d|1[17]|2[27]|3[37]|44|5[057]|66|88))|3(?:2(?:1[0-6]|21|3[469]|7[159])|(?:33|9[4-6])\\d|5(?:0[0-4]|5[579]|9\\d)|7(?:[0-3579]\\d|4[0467]|6[67]|8[078]))|4(?:2(?:29|5[0257]|6[0-7]|7[1-57])|5(?:1[0-4]|8\\d|9[5-9])|7(?:0\\d|1[024589]|2[0-27]|3[0137]|[46][07]|5[01]|7[5-9]|9[079])|9(?:7[015-9]|[89]\\d))|5(?:112|2(?:0\\d|2[29]|[49]4)|3[1568]\\d|52[6-9]|7(?:0[01578]|1[017]|[23]7|4[047]|[5-7]\\d|8[78]|9[079]))|9(?:22[128]|3(?:2[0-4]|7\\d)|57[02569]|7(?:2[05-9]|3[37]|4\\d|60|7[2579]|87|9[07]))))\\d{4}",,,,"912345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UZ",998,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[235-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VA:[,[,,"0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}",,,,,,,[6,7,8,9,10,11,12]],[,,"06698\\d{1,6}",,,,"0669812345",,,[6,7,8,9,10,11]],[,,"3[1-9]\\d{8}|3[2-9]\\d{7}",,,,"3123456789",,,[9,10]],[,,"80(?:0\\d{3}|3)\\d{3}",,,,"800123456",,,[6,9]],[,,"(?:0878\\d{3}|89(?:2\\d|3[04]|4(?:[0-4]|[5-9]\\d\\d)|5[0-4]))\\d\\d|(?:1(?:44|6[346])|89(?:38|5[5-9]|9))\\d{6}",,,,"899123456",,,[6,8,9,10]],[,,"84(?:[08]\\d{3}|[17])\\d{3}",,,,"848123456",,,[6,9]],[,,"1(?:78\\d|99)\\d{6}",,,,"1781234567",,,[9,10]],[,,"55\\d{8}",,,,"5512345678",,,[10]],"VA",39,"00",,,,,,,,,,[,,,,,,,,,[-1]],,"06698",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"3[2-8]\\d{9,10}",,,,"33101234501",,,[11,12]]],VC:[,[,,"(?:[58]\\d\\d|784|900)\\d{7}",,,,,,,[10],[7]],[,,"784(?:266|3(?:6[6-9]|7\\d|8[0-6])|4(?:38|5[0-36-8]|8[0-8])|5(?:55|7[0-2]|93)|638|784)\\d{4}",,,,"7842661234",,,,[7]],[,,"784(?:4(?:3[0-5]|5[45]|89|9[0-8])|5(?:2[6-9]|3[0-4])|720)\\d{4}",,,,"7844301234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,"78451[0-2]\\d{4}",,,,"7845101234",,,,[7]],"VC",1,"011","1",,,"([2-7]\\d{6})$|1","784$1",,,,,[,,,,,,,,,[-1]],,"784",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VE:[,[,,"[68]00\\d{7}|(?:[24]\\d|[59]0)\\d{8}",,,,,,,[10],[7]],[,,"(?:2(?:12|3[457-9]|[467]\\d|[58][1-9]|9[1-6])|[4-6]00)\\d{7}",,,,"2121234567",,,,[7]],[,,"4(?:1[24-8]|2[246])\\d{7}",,,,"4121234567"],[,,"800\\d{7}",,,,"8001234567"],[,,"90[01]\\d{7}",,,,"9001234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"VE",58,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{7})","$1-$2",["[24-689]"],"0$1","$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"501\\d{7}",,,,"5010123456",,,,[7]],,,[,,,,,,,,,[-1]]],VG:[,[,,"(?:284|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"284(?:229|4(?:22|9[45])|774|8(?:52|6[459]))\\d{4}",,,,"2842291234",,,,[7]],[,,"284(?:245|3(?:0[0-3]|4[0-7]|68|9[34])|4(?:4[0-6]|68|9[69])|5(?:4[0-7]|68|9[69]))\\d{4}",,,,"2843001234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"VG",1,"011","1",,,"([2-578]\\d{6})$|1","284$1",,,,,[,,,,,,,,,[-1]],,"284",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VI:[,[,,"[58]\\d{9}|(?:34|90)0\\d{7}",,,,,,,[10],[7]],[,,"340(?:2(?:0\\d|10|2[06-8]|4[49]|77)|3(?:32|44)|4(?:2[23]|44|7[34]|89)|5(?:1[34]|55)|6(?:2[56]|4[23]|77|9[023])|7(?:1[2-57-9]|2[57]|7\\d)|884|998)\\d{4}",,,,"3406421234",,,,[7]],[,,"340(?:2(?:0\\d|10|2[06-8]|4[49]|77)|3(?:32|44)|4(?:2[23]|44|7[34]|89)|5(?:1[34]|55)|6(?:2[56]|4[23]|77|9[023])|7(?:1[2-57-9]|2[57]|7\\d)|884|998)\\d{4}",,,,"3406421234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"VI",1,"011","1",,,"([2-9]\\d{6})$|1","340$1",,1,,,[,,,,,,,,,[-1]],,"340",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VN:[,[,,"[12]\\d{9}|[135-9]\\d{8}|[16]\\d{7}|[16-8]\\d{6}",,,,,,,[7,8,9,10]],[,,"2(?:0[3-9]|1[0-689]|2[0-25-9]|[38][2-9]|4[2-8]|5[124-9]|6[0-39]|7[0-7]|9[0-4679])\\d{7}",,,,"2101234567",,,[10]],[,,"(?:5(?:2[238]|59)|89[6-9]|99[013-9])\\d{6}|(?:3\\d|5[1689]|7[06-9]|8[1-8]|9[0-8])\\d{7}",,,,"912345678",,,[9]],[,,"1800\\d{4,6}|12(?:0[13]|28)\\d{4}",,,,"1800123456",,,[8,9,10]],[,,"1900\\d{4,6}",,,,"1900123456",,,[8,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"672\\d{6}",,,,"672012345",,,[9]],"VN",84,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[17]99"],"0$1",,1],[,"(\\d{2})(\\d{5})","$1 $2",["80"],"0$1",,1],[,"(\\d{3})(\\d{4,5})","$1 $2",["69"],"0$1",,1],[,"(\\d{4})(\\d{4,6})","$1 $2",["1"],,,1],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["6"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[357-9]"],"0$1",,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2[48]"],"0$1",,1],[,"(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3",["2"],"0$1",,1]],[[,"(\\d{2})(\\d{5})","$1 $2",["80"],"0$1",,1],[,"(\\d{4})(\\d{4,6})","$1 $2",["1"],,,1],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["6"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[357-9]"],"0$1",,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2[48]"],"0$1",,1],[,"(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3",["2"],"0$1",,1]],[,,,,,,,,,[-1]],,,[,,"[17]99\\d{4}|69\\d{5,6}",,,,,,,[7,8]],[,,"(?:[17]99|80\\d)\\d{4}|69\\d{5,6}",,,,"1992000",,,[7,8]],,,[,,,,,,,,,[-1]]],VU:[,[,,"[57-9]\\d{6}|(?:[238]\\d|48)\\d{3}",,,,,,,[5,7]],[,,"(?:38[0-8]|48[4-9])\\d\\d|(?:2[02-9]|3[4-7]|88)\\d{3}",,,,"22123",,,[5]],[,,"(?:[58]\\d|7[013-7])\\d{5}",,,,"5912345",,,[7]],[,,"81[18]\\d\\d",,,,"81123",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9(?:0[1-9]|1[01])\\d{4}",,,,"9010123",,,[7]],"VU",678,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[57-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:3[03]|900\\d)\\d{3}",,,,"30123"],,,[,,,,,,,,,[-1]]],WF:[,[,,"(?:40|72|8\\d{4})\\d{4}|[89]\\d{5}",,,,,,,[6,9]],[,,"72\\d{4}",,,,"721234",,,[6]],[,,"(?:72|8[23])\\d{4}",,,,"821234",,,[6]],[,,"80[0-5]\\d{6}",,,,"800012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9[23]\\d{4}",,,,"921234",,,[6]],"WF",681,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[47-9]"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"[48]0\\d{4}",,,,"401234",,,[6]]],WS:[,[,,"(?:[2-6]|8\\d{5})\\d{4}|[78]\\d{6}|[68]\\d{5}",,,,,,,[5,6,7,10]],[,,"6[1-9]\\d{3}|(?:[2-5]|60)\\d{4}",,,,"22123",,,[5,6]],[,,"(?:7[1-35-8]|8(?:[3-7]|9\\d{3}))\\d{5}",,,,"7212345",,,[7,10]],[,,"800\\d{3}",,,,"800123",,,[6]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"WS",685,"0",,,,,,,,[[,"(\\d{5})","$1",["[2-5]|6[1-9]"]],[,"(\\d{3})(\\d{3,7})","$1 $2",["[68]"]],[,"(\\d{2})(\\d{5})","$1 $2",["7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],XK:[,[,,"2\\d{7,8}|3\\d{7,11}|(?:4\\d\\d|[89]00)\\d{5}",,,,,,,[8,9,10,11,12]],[,,"38\\d{6,10}|(?:2[89]|39)(?:0\\d{5,6}|[1-9]\\d{5})",,,,"28012345"],[,,"4[3-9]\\d{6}",,,,"43201234",,,[8]],[,,"800\\d{5}",,,,"80001234",,,[8]],[,,"900\\d{5}",,,,"90001234",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"XK",383,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{5})","$1 $2",["[89]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-4]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["2|39"],"0$1"],[,"(\\d{2})(\\d{7,10})","$1 $2",["3"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],YE:[,[,,"(?:1|7\\d)\\d{7}|[1-7]\\d{6}",,,,,,,[7,8,9],[6]],[,,"78[0-7]\\d{4}|17\\d{6}|(?:[12][2-68]|3[2358]|4[2-58]|5[2-6]|6[3-58]|7[24-6])\\d{5}",,,,"1234567",,,[7,8],[6]],[,,"7[01378]\\d{7}",,,,"712345678",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"YE",967,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-6]|7(?:[24-6]|8[0-7])"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],YT:[,[,,"7093\\d{5}|(?:80|9\\d)\\d{7}|(?:26|63)9\\d{6}",,,,,,,[9]],[,,"269(?:0[0-467]|15|5[0-4]|6\\d|[78]0)\\d{4}",,,,"269601234"],[,,"(?:639(?:0[0-79]|1[019]|[267]\\d|3[09]|40|5[05-9]|9[04-79])|7093[5-7])\\d{4}",,,,"639012345"],[,,"80\\d{7}",,,,"801234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9(?:(?:39|47)8[01]|769\\d)\\d{4}",,,,"939801234"],"YT",262,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ZA:[,[,,"[1-79]\\d{8}|8\\d{4,9}",,,,,,,[5,6,7,8,9,10]],[,,"(?:2(?:0330|4302)|52087)0\\d{3}|(?:1[0-8]|2[1-378]|3[1-69]|4\\d|5[1346-8])\\d{7}",,,,"101234567",,,[9]],[,,"(?:1(?:3492[0-25]|4495[0235]|549(?:20|5[01]))|4[34]492[01])\\d{3}|8[1-4]\\d{3,7}|(?:2[27]|47|54)4950\\d{3}|(?:1(?:049[2-4]|9[12]\\d\\d)|(?:50[0-2]|6\\d\\d|7(?:[0-46-9]\\d|5[0-4]))\\d\\d|8(?:5\\d{3}|7(?:08[67]|158|28[5-9]|310)))\\d{4}|(?:1[6-8]|28|3[2-69]|4[025689]|5[36-8])4920\\d{3}|(?:12|[2-5]1)492\\d{4}",,,,"711234567",,,[5,6,7,8,9]],[,,"80\\d{7}",,,,"801234567",,,[9]],[,,"(?:86[2-9]|9[0-2]\\d)\\d{6}",,,,"862345678",,,[9]],[,,"860\\d{6}",,,,"860123456",,,[9]],[,,,,,,,,,[-1]],[,,"87(?:08[0-589]|15[0-79]|28[0-4]|31[1-9])\\d{4}|87(?:[02][0-79]|1[0-46-9]|3[02-9]|[4-9]\\d)\\d{5}",,,,"871234567",,,[9]],"ZA",27,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3,4})","$1 $2",["8[1-4]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["8[1-4]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["860"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"861\\d{6,7}",,,,"861123456",,,[9,10]],,,[,,,,,,,,,[-1]]],ZM:[,[,,"800\\d{6}|(?:21|[579]\\d|63)\\d{7}",,,,,,,[9],[6]],[,,"21[1-8]\\d{6}",,,,"211234567",,,,[6]],[,,"(?:[59][5-8]|7[5-9])\\d{7}",,,,"955123456"],[,,"800\\d{6}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"63\\d{7}",,,,"630123456"],"ZM",260,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})","$1 $2",["[1-9]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[28]"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["[579]"],"0$1"]],[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[28]"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["[579]"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ZW:[,[,,"2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}",,,,,,,[5,6,7,8,9,10],[3,4]],[,,"(?:1(?:(?:3\\d|9)\\d|[4-8])|2(?:(?:(?:0(?:2[014]|5)|(?:2[0157]|31|84|9)\\d\\d|[56](?:[14]\\d\\d|20)|7(?:[089]|2[03]|[35]\\d\\d))\\d|4(?:2\\d\\d|8))\\d|1(?:2|[39]\\d{4}))|3(?:(?:123|(?:29\\d|92)\\d)\\d\\d|7(?:[19]|[56]\\d))|5(?:0|1[2-478]|26|[37]2|4(?:2\\d{3}|83)|5(?:25\\d\\d|[78])|[689]\\d)|6(?:(?:[16-8]21|28|52[013])\\d\\d|[39])|8(?:[1349]28|523)\\d\\d)\\d{3}|(?:4\\d\\d|9[2-9])\\d{4,5}|(?:(?:2(?:(?:(?:0|8[146])\\d|7[1-7])\\d|2(?:[278]\\d|92)|58(?:2\\d|3))|3(?:[26]|9\\d{3})|5(?:4\\d|5)\\d\\d)\\d|6(?:(?:(?:[0-246]|[78]\\d)\\d|37)\\d|5[2-8]))\\d\\d|(?:2(?:[569]\\d|8[2-57-9])|3(?:[013-59]\\d|8[37])|6[89]8)\\d{3}",,,,"1312345",,,,[3,4]],[,,"7(?:[1278]\\d|3[1-9])\\d{6}",,,,"712345678",,,[9]],[,,"80(?:[01]\\d|20|8[0-8])\\d{3}",,,,"8001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"86(?:1[12]|22|30|44|55|77|8[368])\\d{6}",,,,"8686123456",,,[10]],"ZW",263,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3,5})","$1 $2",["2(?:0[45]|2[278]|[49]8)|3(?:[09]8|17)|6(?:[29]8|37|75)|[23][78]|(?:33|5[15]|6[68])[78]"],"0$1"],[,"(\\d)(\\d{3})(\\d{2,4})","$1 $2 $3",["[49]"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["80"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["24|8[13-59]|(?:2[05-79]|39|5[45]|6[15-8])2","2(?:02[014]|4|[56]20|[79]2)|392|5(?:42|525)|6(?:[16-8]21|52[013])|8[13-59]"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:1[39]|2[0157]|[378]|[56][14])|3(?:12|29)","2(?:1[39]|2[0157]|[378]|[56][14])|3(?:123|29)"],"0$1"],[,"(\\d{4})(\\d{6})","$1 $2",["8"],"0$1"],[,"(\\d{2})(\\d{3,5})","$1 $2",["1|2(?:0[0-36-9]|12|29|[56])|3(?:1[0-689]|[24-6])|5(?:[0236-9]|1[2-4])|6(?:[013-59]|7[0-46-9])|(?:33|55|6[68])[0-69]|(?:29|3[09]|62)[0-79]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["29[013-9]|39|54"],"0$1"],[,"(\\d{4})(\\d{3,5})","$1 $2",["(?:25|54)8","258|5483"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],800:[,[,,"(?:00|[1-9]\\d)\\d{6}",,,,,,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:00|[1-9]\\d)\\d{6}",,,,"12345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",800,,,,,,,,1,[[,"(\\d{4})(\\d{4})","$1 $2",["\\d"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],808:[,[,,"[1-9]\\d{7}",,,,,,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"[1-9]\\d{7}",,,,"12345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",808,,,,,,,,1,[[,"(\\d{4})(\\d{4})","$1 $2",["[1-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],870:[,[,,"7\\d{11}|[235-7]\\d{8}",,,,,,,[9,12]],[,,,,,,,,,[-1]],[,,"(?:[356]|774[45])\\d{8}|7[6-8]\\d{7}",,,,"301234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"2\\d{8}",,,,"201234567",,,[9]],"001",870,,,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235-7]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],878:[,[,,"10\\d{10}",,,,,,,[12]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"10\\d{10}",,,,"101234567890"],"001",878,,,,,,,,1,[[,"(\\d{2})(\\d{5})(\\d{5})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],881:[,[,,"6\\d{9}|[0-36-9]\\d{8}",,,,,,,[9,10]],[,,,,,,,,,[-1]],[,,"6\\d{9}|[0-36-9]\\d{8}",,,,"612345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",881,,,,,,,,,[[,"(\\d)(\\d{3})(\\d{5})","$1 $2 $3",["[0-37-9]"]],[,"(\\d)(\\d{3})(\\d{5,6})","$1 $2 $3",["6"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],882:[,[,,"[13]\\d{6}(?:\\d{2,5})?|[19]\\d{7}|(?:[25]\\d\\d|4)\\d{7}(?:\\d{2})?",,,,,,,[7,8,9,10,11,12]],[,,,,,,,,,[-1]],[,,"342\\d{4}|(?:337|49)\\d{6}|(?:3(?:2|47|7\\d{3})|50\\d{3})\\d{7}",,,,"3421234",,,[7,8,9,10,12]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])\\d{4}|6\\d{5,10})|(?:345\\d|9[89])\\d{6}|(?:10|2(?:3|85\\d)|3(?:[15]|[69]\\d\\d)|4[15-8]|51)\\d{8}",,,,"390123456789"],"001",882,,,,,,,,,[[,"(\\d{2})(\\d{5})","$1 $2",["16|342"]],[,"(\\d{2})(\\d{6})","$1 $2",["49"]],[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["1[36]|9"]],[,"(\\d{2})(\\d{4})(\\d{3})","$1 $2 $3",["3[23]"]],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["16"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["10|23|3(?:[15]|4[57])|4|51"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["34"]],[,"(\\d{2})(\\d{4,5})(\\d{5})","$1 $2 $3",["[1-35]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"348[57]\\d{7}",,,,"34851234567",,,[11]]],883:[,[,,"(?:[1-4]\\d|51)\\d{6,10}",,,,,,,[8,9,10,11,12]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:2(?:00\\d\\d|10)|(?:370[1-9]|51\\d0)\\d)\\d{7}|51(?:00\\d{5}|[24-9]0\\d{4,7})|(?:1[0-79]|2[24-689]|3[02-689]|4[0-4])0\\d{5,9}",,,,"510012345"],"001",883,,,,,,,,1,[[,"(\\d{3})(\\d{3})(\\d{2,8})","$1 $2 $3",["[14]|2[24-689]|3[02-689]|51[24-9]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["510"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["21"]],[,"(\\d{4})(\\d{4})(\\d{4})","$1 $2 $3",["51[13]"]],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["[235]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],888:[,[,,"\\d{11}",,,,,,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",888,,,,,,,,1,[[,"(\\d{3})(\\d{3})(\\d{5})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"\\d{11}",,,,"12345678901"],,,[,,,,,,,,,[-1]]],979:[,[,,"[1359]\\d{8}",,,,,,,[9],[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"[1359]\\d{8}",,,,"123456789",,,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",979,,,,,,,,1,[[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["[1359]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]]};function k(){this.g={}}k.h=void 0,k.g=function(){return k.h?k.h:k.h=new k};var x={0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9","０":"0","１":"1","２":"2","３":"3","４":"4","５":"5","６":"6","７":"7","８":"8","９":"9","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9"},q={0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9","+":"+","*":"*","#":"#"},P={0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9","０":"0","１":"1","２":"2","３":"3","４":"4","５":"5","６":"6","７":"7","８":"8","９":"9","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9",A:"2",B:"2",C:"2",D:"3",E:"3",F:"3",G:"4",H:"4",I:"4",J:"5",K:"5",L:"5",M:"6",N:"6",O:"6",P:"7",Q:"7",R:"7",S:"7",T:"8",U:"8",V:"8",W:"9",X:"9",Y:"9",Z:"9"},K=RegExp("[+＋]+"),tt=RegExp("^[+＋]+"),Dt=RegExp("([0-9０-９٠-٩۰-۹])"),Rt=RegExp("[+＋0-9０-９٠-٩۰-۹]"),Kt=/[\\\/] *x/,vt=RegExp("[^0-9０-９٠-٩۰-۹A-Za-z#]+$"),jt=/(?:.*?[A-Za-z]){3}.*/,Qt=RegExp("^\\+([0-9０-９٠-٩۰-۹]|[\\-\\.\\(\\)]?)*[0-9０-９٠-٩۰-۹]([0-9０-９٠-٩۰-۹]|[\\-\\.\\(\\)]?)*$"),$e=RegExp("^([A-Za-z0-9０-９٠-٩۰-۹]+((\\-)*[A-Za-z0-9０-９٠-٩۰-۹])*\\.)*[A-Za-z]+((\\-)*[A-Za-z0-9０-９٠-٩۰-۹])*\\.?$");function Me(d){return"([0-9０-９٠-٩۰-۹]{1,"+d+"})"}function tn(){return";ext="+Me("20")+"|[  \\t,]*(?:e?xt(?:ensi(?:ó?|ó))?n?|ｅ?ｘｔｎ?|доб|anexo)[:\\.．]?[  \\t,-]*"+(Me("20")+"#?|[  \\t,]*(?:[xｘ#＃~～]|int|ｉｎｔ)[:\\.．]?[  \\t,-]*")+(Me("9")+"#?|[- ]+")+(Me("6")+"#|[  \\t]*(?:,{2}|;)[:\\.．]?[  \\t,-]*")+(Me("15")+"#?|[  \\t]*(?:,)+[:\\.．]?[  \\t,-]*")+(Me("9")+"#?")}var en=new RegExp("(?:"+tn()+")$","i"),id=new RegExp("^[0-9０-９٠-٩۰-۹]{2}$|^[+＋]*(?:[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～*]*[0-9０-９٠-٩۰-۹]){3,}[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～*A-Za-z0-9０-９٠-٩۰-۹]*(?:"+tn()+")?$","i"),nd=/(\$\d)/,ad=/^\(?\$1\)?$/;function sn(d){return 2>d.length?!1:Jt(id,d)}function nn(d){return Jt(jt,d)?ys(d,P):ys(d,x)}function an(d){var c=nn(d.toString());pt(d),d.g(c)}function rn(d){return d!=null&&(Zt(d,9)!=1||mt(d,9)[0]!=-1)}function ys(d,c){for(var f=new lt,v,_=d.length,w=0;w<_;++w)v=d.charAt(w),v=c[v.toUpperCase()],v!=null&&f.g(v);return f.toString()}function dn(d){return d.length==0||ad.test(d)}function _s(d){return d!=null&&isNaN(d)&&d.toUpperCase()in S}k.prototype.format=function(d,c){if(N(d,2)==0&&nt(d,5)){var f=Q(d,5);if(0<f.length)return f}f=Q(d,1);var v=Qe(d);if(c==0)return on(f,0,v,"");if(!(f in b))return v;var _=Ye(this,f,Je(f));d=nt(d,3)&&N(d,3).length!=0?c==3?";ext="+N(d,3):nt(_,13)?N(_,13)+Q(d,3):" ext. "+Q(d,3):"";t:{_=mt(_,20).length==0||c==2?mt(_,19):mt(_,20);for(var w,C=_.length,D=0;D<C;++D){w=_[D];var V=Zt(w,3);if((V==0||v.search(N(w,3,V-1))==0)&&(V=new RegExp(N(w,1)),Jt(V,v))){_=w;break t}}_=null}return _!=null&&(C=_,_=Q(C,2),w=new RegExp(N(C,1)),Q(C,5),C=Q(C,4),v=c==2&&C!=null&&0<C.length?v.replace(w,_.replace(nd,C)):v.replace(w,_),c==3&&(v=v.replace(RegExp("^[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]+"),""),v=v.replace(RegExp("[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]+","g"),"-"))),on(f,c,v,d)};function Ye(d,c,f){return f=="001"?ie(d,""+c):ie(d,f)}function Qe(d){if(!nt(d,2))return"";var c=""+N(d,2);return nt(d,4)&&N(d,4)&&0<Q(d,8)?Array(Q(d,8)+1).join("0")+c:c}function on(d,c,f,v){switch(c){case 0:return"+"+d+f+v;case 1:return"+"+d+" "+f+v;case 3:return"tel:+"+d+"-"+f+v;default:return f+v}}function ws(d,c){switch(c){case 4:return N(d,5);case 3:return N(d,4);case 1:return N(d,3);case 0:case 2:return N(d,2);case 5:return N(d,6);case 6:return N(d,8);case 7:return N(d,7);case 8:return N(d,21);case 9:return N(d,25);case 10:return N(d,28);default:return N(d,1)}}function ln(d,c){var f=cn(d,c);return d=Ye(d,Q(c,1),f),d==null?-1:(c=Qe(c),di(c,d))}function di(d,c){return Lt(d,N(c,1))?Lt(d,N(c,5))?4:Lt(d,N(c,4))?3:Lt(d,N(c,6))?5:Lt(d,N(c,8))?6:Lt(d,N(c,7))?7:Lt(d,N(c,21))?8:Lt(d,N(c,25))?9:Lt(d,N(c,28))?10:Lt(d,N(c,2))?N(c,18)||Lt(d,N(c,3))?2:0:!N(c,18)&&Lt(d,N(c,3))?1:-1:-1}function ie(d,c){if(c==null)return null;c=c.toUpperCase();var f=d.g[c];if(f==null){if(f=S[c],f==null)return null;f=new pe().g(Yt.m(),f),d.g[c]=f}return f}function Lt(d,c){var f=d.length;return 0<Zt(c,9)&&mt(c,9).indexOf(f)==-1?!1:Jt(Q(c,2),d)}function rd(d,c){var f=cn(d,c),v=Q(c,1),_=Ye(d,v,f);return _==null||f!="001"&&v!=hn(d,f)?_=!1:(d=Qe(c),_=di(d,_)!=-1),_}function cn(d,c){if(c==null)return null;var f=Q(c,1);if(f=b[f],f==null)d=null;else if(f.length==1)d=f[0];else t:{c=Qe(c);for(var v,_=f.length,w=0;w<_;w++){v=f[w];var C=ie(d,v);if(nt(C,23)){if(c.search(N(C,23))==0){d=v;break t}}else if(di(c,C)!=-1){d=v;break t}}d=null}return d}function Je(d){return d=b[d],d==null?"ZZ":d[0]}function hn(d,c){if(d=ie(d,c),d==null)throw Error("Invalid region code: "+c);return Q(d,10)}function Ss(d,c,f,v){var _=ws(f,v),w=Zt(_,9)==0?mt(N(f,1),9):mt(_,9);if(_=mt(_,10),v==2)if(rn(ws(f,0)))d=ws(f,1),rn(d)&&(w=w.concat(Zt(d,9)==0?mt(N(f,1),9):mt(d,9)),w.sort(),_.length==0?_=mt(d,10):(_=_.concat(mt(d,10)),_.sort()));else return Ss(d,c,f,1);return w[0]==-1?5:(c=c.length,-1<_.indexOf(c)?4:(f=w[0],f==c?0:f>c?2:w[w.length-1]<c?3:-1<w.indexOf(c,1)?0:5))}function ks(d,c,f){var v=Qe(c);return c=Q(c,1),c in b?(c=Ye(d,c,Je(c)),Ss(d,v,c,f)):1}function un(d,c){if(d=d.toString(),d.length==0||d.charAt(0)=="0")return 0;for(var f,v=d.length,_=1;3>=_&&_<=v;++_)if(f=parseInt(d.substring(0,_),10),f in b)return c.g(d.substring(_)),f;return 0}function pn(d,c,f,v,_,w){if(c.length==0)return 0;c=new lt(c);var C;f!=null&&(C=N(f,11)),C==null&&(C="NonMatch");var D=c.toString();if(D.length==0)C=20;else if(tt.test(D))D=D.replace(tt,""),pt(c),c.g(nn(D)),C=1;else{if(D=new RegExp(C),an(c),C=c.toString(),C.search(D)==0){D=C.match(D)[0].length;var V=C.substring(D).match(Dt);V&&V[1]!=null&&0<V[1].length&&ys(V[1],x)=="0"?C=!1:(pt(c),c.g(C.substring(D)),C=!0)}else C=!1;C=C?5:20}if(_&&ut(w,6,C),C!=20){if(2>=c.h.length)throw Error("Phone number too short after IDD");if(d=un(c,v),d!=0)return ut(w,1,d),d;throw Error("Invalid country calling code")}return f!=null&&(C=Q(f,10),D=""+C,V=c.toString(),V.lastIndexOf(D,0)==0&&(D=new lt(V.substring(D.length)),V=N(f,1),V=new RegExp(Q(V,2)),$n(D,f,null),D=D.toString(),!Jt(V,c.toString())&&Jt(V,D)||Ss(d,c.toString(),f,-1)==3))?(v.g(D),_&&ut(w,6,10),ut(w,1,C),C):(ut(w,1,0),0)}function $n(d,c,f){var v=d.toString(),_=v.length,w=N(c,15);if(_!=0&&w!=null&&w.length!=0){var C=new RegExp("^(?:"+w+")");if(_=C.exec(v)){w=new RegExp(Q(N(c,1),2));var D=Jt(w,v),V=_.length-1;c=N(c,16),c==null||c.length==0||_[V]==null||_[V].length==0?(!D||Jt(w,v.substring(_[0].length)))&&(f!=null&&0<V&&_[V]!=null&&f.g(_[1]),d.set(v.substring(_[0].length))):(v=v.replace(C,c),(!D||Jt(w,v))&&(f!=null&&0<V&&f.g(_[1]),d.set(v)))}}}function fe(d,c,f){if(!_s(f)&&0<c.length&&c.charAt(0)!="+")throw Error("Invalid country calling code");return fn(d,c,f,!0)}function fn(d,c,f,v){if(c==null)throw Error("The string supplied did not seem to be a phone number");if(250<c.length)throw Error("The string supplied is too long to be a phone number");var _=new lt,w=c.indexOf(";phone-context=");if(w===-1)w=null;else if(w+=15,w>=c.length)w="";else{var C=c.indexOf(";",w);w=C!==-1?c.substring(w,C):c.substring(w)}var D=w;if(D==null?C=!0:D.length===0?C=!1:(C=Qt.exec(D),D=$e.exec(D),C=C!==null||D!==null),!C||(w!=null?(w.charAt(0)==="+"&&_.g(w),w=c.indexOf("tel:"),_.g(c.substring(0<=w?w+4:0,c.indexOf(";phone-context=")))):(w=_.g,C=c??"",D=C.search(Rt),0<=D?(C=C.substring(D),C=C.replace(vt,""),D=C.search(Kt),0<=D&&(C=C.substring(0,D))):C="",w.call(_,C)),w=_.toString(),C=w.indexOf(";isub="),0<C&&(pt(_),_.g(w.substring(0,C))),!sn(_.toString())))throw Error("The string supplied did not seem to be a phone number");if(w=_.toString(),!(_s(f)||w!=null&&0<w.length&&tt.test(w)))throw Error("Invalid country calling code");w=new p,v&&ut(w,5,c);t:{if(c=_.toString(),C=c.search(en),0<=C&&sn(c.substring(0,C))){D=c.match(en);for(var V=D.length,Xt=1;Xt<V;++Xt)if(D[Xt]!=null&&0<D[Xt].length){pt(_),_.g(c.substring(0,C)),c=D[Xt];break t}}c=""}0<c.length&&ut(w,3,c),C=ie(d,f),c=new lt,D=0,V=_.toString();try{D=pn(d,V,C,c,v,w)}catch(ci){if(ci.message=="Invalid country calling code"&&tt.test(V)){if(V=V.replace(tt,""),D=pn(d,V,C,c,v,w),D==0)throw ci}else throw ci}if(D!=0?(_=Je(D),_!=f&&(C=Ye(d,D,_))):(an(_),c.g(_.toString()),f!=null?(D=Q(C,10),ut(w,1,D)):v&&(delete w.h[6],w.g&&delete w.g[6])),2>c.h.length||(C!=null&&(f=new lt,_=new lt(c.toString()),$n(_,C,f),d=Ss(d,_.toString(),C,-1),d!=2&&d!=4&&d!=5&&(c=_,v&&0<f.toString().length&&ut(w,7,f.toString()))),v=c.toString(),d=v.length,2>d))throw Error("The string supplied is too short to be a phone number");if(17<d)throw Error("The string supplied is too long to be a phone number");if(1<v.length&&v.charAt(0)=="0"){for(ut(w,4,!0),d=1;d<v.length-1&&v.charAt(d)=="0";)d++;d!=1&&ut(w,8,d)}return ut(w,2,parseInt(v,10)),w}function Jt(d,c){return!!((d=c.match(new RegExp("^(?:"+(typeof d=="string"?d:d.source)+")$","i")))&&d[0].length==c.length)}function dd(d){this.fa=RegExp(" "),this.ja="",this.v=new lt,this.da="",this.s=new lt,this.ba=new lt,this.u=!0,this.ea=this.ca=this.la=!1,this.ga=k.g(),this.$=0,this.h=new lt,this.ha=!1,this.o="",this.g=new lt,this.j=[],this.ka=d,this.l=bn(this,this.ka)}var mn=new Yt;ut(mn,11,"NA");var od=RegExp("^[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]*\\$1[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]*(\\$\\d[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]*)*$"),gn=/[- ]/;function bn(d,c){var f=d.ga;return c=_s(c)?hn(f,c):0,d=ie(d.ga,Je(c)),d??mn}function vn(d){for(var c=d.j.length,f=0;f<c;++f){var v=d.j[f],_=Q(v,1);if(d.da==_)return!1;var w=d,C=v,D=Q(C,1);pt(w.v);var V=w;C=Q(C,2);var Xt="999999999999999".match(D)[0];if(Xt.length<V.g.h.length?V="":(V=Xt.replace(new RegExp(D,"g"),C),V=V.replace(RegExp("9","g")," ")),0<V.length?(w.v.g(V),w=!0):w=!1,w)return d.da=_,d.ha=gn.test(N(v,4)),d.$=0,!0}return d.u=!1}function yn(d,c){for(var f=[],v=c.length-3,_=d.j.length,w=0;w<_;++w){var C=d.j[w];Zt(C,3)==0?f.push(d.j[w]):(C=N(C,3,Math.min(v,Zt(C,3)-1)),c.search(C)==0&&f.push(d.j[w]))}d.j=f}function ld(d,c){d.s.g(c);var f=c;if(Dt.test(f)||d.s.h.length==1&&K.test(f)?(c=="+"?(f=c,d.ba.g(c)):(f=x[c],d.ba.g(f),d.g.g(f)),c=f):(d.u=!1,d.la=!0),!d.u){if(!d.la){if(Cn(d)){if(jn(d))return _n(d)}else if(0<d.o.length&&(c=d.g.toString(),pt(d.g),d.g.g(d.o),d.g.g(c),c=d.h.toString(),f=c.lastIndexOf(d.o),pt(d.h),d.h.g(c.substring(0,f))),d.o!=kn(d))return d.h.g(" "),_n(d)}return d.s.toString()}switch(d.ba.h.length){case 0:case 1:case 2:return d.s.toString();case 3:if(Cn(d))d.ea=!0;else return d.o=kn(d),oi(d);default:return d.ea?(jn(d)&&(d.ea=!1),d.h.toString()+d.g.toString()):0<d.j.length?(c=On(d,c),f=wn(d),0<f.length?f:(yn(d,d.g.toString()),vn(d)?Sn(d):d.u?Cs(d,c):d.s.toString())):oi(d)}}function _n(d){return d.u=!0,d.ea=!1,d.j=[],d.$=0,pt(d.v),d.da="",oi(d)}function wn(d){for(var c=d.g.toString(),f=d.j.length,v=0;v<f;++v){var _=d.j[v],w=Q(_,1);if(new RegExp("^(?:"+w+")$").test(c)&&(d.ha=gn.test(N(_,4)),_=c.replace(new RegExp(w,"g"),N(_,2)),_=Cs(d,_),ys(_,q)==d.ba))return _}return""}function Cs(d,c){var f=d.h.h.length;return d.ha&&0<f&&d.h.toString().charAt(f-1)!=" "?d.h+" "+c:d.h+c}function oi(d){var c=d.g.toString();if(3<=c.length){for(var f=d.ca&&d.o.length==0&&0<Zt(d.l,20)?mt(d.l,20):mt(d.l,19),v=f.length,_=0;_<v;++_){var w=f[_];0<d.o.length&&dn(Q(w,4))&&!N(w,6)&&!nt(w,5)||(d.o.length!=0||d.ca||dn(Q(w,4))||N(w,6))&&od.test(Q(w,2))&&d.j.push(w)}return yn(d,c),c=wn(d),0<c.length?c:vn(d)?Sn(d):d.s.toString()}return Cs(d,c)}function Sn(d){var c=d.g.toString(),f=c.length;if(0<f){for(var v="",_=0;_<f;_++)v=On(d,c.charAt(_));return d.u?Cs(d,v):d.s.toString()}return d.h.toString()}function kn(d){var c=d.g.toString(),f=0;if(N(d.l,10)!=1)var v=!1;else v=d.g.toString(),v=v.charAt(0)=="1"&&v.charAt(1)!="0"&&v.charAt(1)!="1";return v?(f=1,d.h.g("1").g(" "),d.ca=!0):nt(d.l,15)&&(v=new RegExp("^(?:"+N(d.l,15)+")"),v=c.match(v),v!=null&&v[0]!=null&&0<v[0].length&&(d.ca=!0,f=v[0].length,d.h.g(c.substring(0,f)))),pt(d.g),d.g.g(c.substring(f)),c.substring(0,f)}function Cn(d){var c=d.ba.toString(),f=new RegExp("^(?:\\+|"+N(d.l,11)+")");return f=c.match(f),f!=null&&f[0]!=null&&0<f[0].length?(d.ca=!0,f=f[0].length,pt(d.g),d.g.g(c.substring(f)),pt(d.h),d.h.g(c.substring(0,f)),c.charAt(0)!="+"&&d.h.g(" "),!0):!1}function jn(d){if(d.g.h.length==0)return!1;var c=new lt,f=un(d.g,c);return f==0?!1:(pt(d.g),d.g.g(c.toString()),c=Je(f),c=="001"?d.l=ie(d.ga,""+f):c!=d.ka&&(d.l=bn(d,c)),d.h.g(""+f).g(" "),d.o="",!0)}function On(d,c){var f=d.v.toString();if(0<=f.substring(d.$).search(d.fa)){var v=f.search(d.fa);return c=f.replace(d.fa,c),pt(d.v),d.v.g(c),d.$=v,c.substring(0,d.$+1)}return d.j.length==1&&(d.u=!1),d.da="",d.s.toString()}const xn=d=>{const c=[];return d.includes("FIXED_LINE_OR_MOBILE")?(d.includes("MOBILE")||c.push("MOBILE"),d.includes("FIXED_LINE")||c.push("FIXED_LINE")):(d.includes("MOBILE")||d.includes("FIXED_LINE"))&&c.push("FIXED_LINE_OR_MOBILE"),d.concat(c)},li={FIXED_LINE:0,MOBILE:1,FIXED_LINE_OR_MOBILE:2,TOLL_FREE:3,PREMIUM_RATE:4,SHARED_COST:5,VOIP:6,PERSONAL_NUMBER:7,PAGER:8,UAN:9,VOICEMAIL:10,UNKNOWN:-1};t("intlTelInputUtilsTemp",{}),t("intlTelInputUtilsTemp.formatNumberAsYouType",(d,c)=>{try{const f=d.replace(/[^+0-9]/g,""),v=new dd(c);c="";for(let _=0;_<f.length;_++)v.ja=ld(v,f.charAt(_)),c=v.ja;return c}catch{return d}}),t("intlTelInputUtilsTemp.formatNumber",(d,c,f)=>{try{const _=k.g(),w=fe(_,d,c);var v=ks(_,w,-1);return v==0||v==4?_.format(w,typeof f>"u"?0:f):d}catch{return d}}),t("intlTelInputUtilsTemp.getExampleNumber",(d,c,f,v)=>{try{const V=k.g();t:{var _=V;if(_s(d)){var w=ws(ie(_,d),f);try{if(nt(w,6)){var C=N(w,6),D=fn(_,C,d,!1);break t}}catch{}}D=null}return V.format(D,v?0:c?2:1)}catch{return""}}),t("intlTelInputUtilsTemp.getExtension",(d,c)=>{try{return N(fe(k.g(),d,c),3)}catch{return""}}),t("intlTelInputUtilsTemp.getNumberType",(d,c)=>{try{const f=k.g(),v=fe(f,d,c);return ln(f,v)}catch{return-99}}),t("intlTelInputUtilsTemp.getValidationError",(d,c)=>{if(!c)return 1;try{const f=k.g(),v=fe(f,d,c);return ks(f,v,-1)}catch(f){return f.message==="Invalid country calling code"?1:3>=d.length||f.message==="Phone number too short after IDD"||f.message==="The string supplied is too short to be a phone number"?2:f.message==="The string supplied is too long to be a phone number"?3:-99}}),t("intlTelInputUtilsTemp.isValidNumber",(d,c,f)=>{try{const v=k.g(),_=fe(v,d,c),w=rd(v,_);if(f){const C=xn(f).map(D=>li[D]);return w&&C.includes(ln(v,_))}return w}catch{return!1}}),t("intlTelInputUtilsTemp.isPossibleNumber",(d,c,f)=>{try{const v=k.g(),_=fe(v,d,c);if(f){const w=xn(f);for(let C of w)if(ks(v,_,li[C])===0)return!0;return!1}return ks(v,_,-1)===0}catch{return!1}}),t("intlTelInputUtilsTemp.getCoreNumber",(d,c)=>{try{return N(fe(k.g(),d,c),2).toString()}catch{return""}}),t("intlTelInputUtilsTemp.numberFormat",{E164:0,INTERNATIONAL:1,NATIONAL:2,RFC3966:3}),t("intlTelInputUtilsTemp.numberType",li),t("intlTelInputUtilsTemp.validationError",{IS_POSSIBLE:0,INVALID_COUNTRY_CODE:1,TOO_SHORT:2,TOO_LONG:3,IS_POSSIBLE_LOCAL_ONLY:4,INVALID_LENGTH:5})})();const Hr=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:globalThis,Al=Hr.intlTelInputUtilsTemp;delete Hr.intlTelInputUtilsTemp;class Pl extends B{constructor(){super(...arguments);X(this,"iti")}static get properties(){return{value:{type:String},number:{type:String,reflect:!0}}}firstUpdated(){this.t=jsObject.translations;const e=this.renderRoot.querySelector("#phone");this.iti=Nl(e,{loadUtils:()=>({default:Al})}),this.number=this.value}_handleInput(){if(this.number=this.iti.getNumber(),this.dispatchEvent(new CustomEvent("input",{detail:{number:this.number}})),!this.iti.isValidNumber()){const e=this.iti.getValidationError();e==="TOO_SHORT"?message=this.t.phone_error_too_short:e==="TOO_LONG"?message=this.t.phone_error_too_long:message=this.t.phone_error,this.dispatchEvent(new CustomEvent("invalid",{detail:{number:this.number,message}}))}}render(){return l`
      <input
        type="tel"
        id="phone"
        class="input"
        name="phone"
        value=${this.value}
        @input=${this._handleInput}
      />
    `}createRenderRoot(){return this}}customElements.define("phone-input",Pl);var bt,Gs,Gr,Zs,Zr,Ks,Kr,Ue,zs,hs,zi,us,Ri;const Ys=class Ys{constructor(t){Et(this,Gs);Et(this,Zs);Et(this,Ks);Et(this,Ue);Et(this,hs);Et(this,us);X(this,"WIZARD_STATE_NAME","zume_wizard_state");X(this,"STALE_LIFESPAN",10*60*1e3);X(this,"MAX_LIFESPAN",60*60*1e3);Et(this,bt,void 0);X(this,"moduleName");this.moduleName=t,Ot(this,Gs,Gr).call(this),Ot(this,Ue,zs).call(this)}static getInstance(t){return this.instance||(this.instance=new Ys(t)),this.instance.useModule(t),this.instance}useModule(t){this.moduleName=t,this.moduleName in gt(this,bt).data||(gt(this,bt).data[this.moduleName]={})}isEmpty(){return Object.keys(gt(this,bt).data[this.moduleName]).length===0}isDataStale(){return Ot(this,us,Ri).call(this,gt(this,bt),this.STALE_LIFESPAN)}has(t){return Object.prototype.hasOwnProperty.call(gt(this,bt).data[this.moduleName],t)}get(t){return gt(this,bt).data[this.moduleName][t]}getAll(){return gt(this,bt).data[this.moduleName]}add(t,e){gt(this,bt).data[this.moduleName][t]=e,Ot(this,Ue,zs).call(this)}remove(t){delete gt(this,bt).data[this.moduleName][t],Ot(this,Ue,zs).call(this)}clear(){gt(this,bt).data[this.moduleName]={},Ot(this,hs,zi).call(this)}};bt=new WeakMap,Gs=new WeakSet,Gr=function(){const t=Ot(this,Ks,Kr).call(this);t&&!Ot(this,us,Ri).call(this,t,this.MAX_LIFESPAN)?ne(this,bt,t):ne(this,bt,Ot(this,Zs,Zr).call(this)),this.useModule(this.moduleName)},Zs=new WeakSet,Zr=function(){return{data:{[this.moduleName]:{}},timestamp:Date.now()}},Ks=new WeakSet,Kr=function(){return JSON.parse(localStorage.getItem(this.WIZARD_STATE_NAME))},Ue=new WeakSet,zs=function(){Ot(this,hs,zi).call(this),localStorage.setItem(this.WIZARD_STATE_NAME,JSON.stringify(gt(this,bt)))},hs=new WeakSet,zi=function(){gt(this,bt).timestamp=Date.now()},us=new WeakSet,Ri=function(t,e){return Date.now()-t.timestamp>e},X(Ys,"instance");let se=Ys;const A={gettingStarted:"getting-started",makeAGroup:"make-a-group",makeFirstGroup:"make-first-group",makeMoreGroups:"make-more-groups",getACoach:"get-a-coach",joinATraining:"join-a-training",planDecision:"plan-decision",joinDecision:"join-decision",notifyOfFutureTrainings:"notify-of-future-trainings",connectWithFriend:"connect-with-friend",joinFriendsPlan:"join-friends-training",checkin:"checkin",setProfile:"set-profile",joinCommunity:"join-the-community",joinCommunityFromVision:"join-the-community-vision",inviteFriends:"invite"},rt={completeProfile:"completeProfile",makePlan:"makePlan",inviteFriends:"inviteFriends",getACoach:"getACoach",joinTraining:"joinTraining",connectFriend:"connectFriend",joinFriendsTraining:"joinFriendsTraining",notifyOfFutureTrainings:"notifyOfFutureTrainings",checkin:"checkin",planDecision:"planDecision",joinDecision:"joinDecision",joinCommunity:"joinCommunity",joinCommunityFromVision:"joinCommunityFromVision"},zl={planDecision:"plan-decision",joinDecision:"join-decision",howManySessions:"how-many-sessions",scheduleDecision:"schedule-decision",howOften:"how-often",startDate:"what-start-date",timeNote:"time-note",location:"what-location",review:"review-steps",name:"group-name"},m={updateName:"update-your-name",updateLocation:"update-your-location",updatePhone:"update-your-phone",inviteFriends:"invite-friends",requestCoachExplanation:"request-coach-explanation",contactPreferences:"contact-preferences",languagePreferences:"preferred-language",howCanWeServe:"how-can-we-serve",connectingToCoach:"connecting-to-coach",joinTraining:"public-training",joinTrainingSelection:"public-training-selection",connectToFriend:"connect-friend",joinFriendsPlan:"friend-training",joinWithCode:"join-with-code",confirmPlan:"confirm-plan",checkinSubmit:"checkin-submit",joinCommunity:"join-community",joinCommunityExplanation:"join-community-explanation",notifyOfFutureTrainings:"notify-of-future-trainings",...zl},Rl={[m.updateName]:{field:"name",testExistance:(i,t)=>t.has_set_name},[m.updateLocation]:{field:"location",testExistance:i=>!(i.source&&i.source==="ip")},[m.updatePhone]:{field:"phone",testExistance:i=>!!i}},Fl={[A.gettingStarted]:{[rt.completeProfile]:St([m.updateName,m.updateLocation,m.planDecision],!1)},[A.planDecision]:{[rt.planDecision]:St([m.planDecision],!1)},[A.joinDecision]:{[rt.joinDecision]:St([m.joinDecision],!1)},[A.setProfile]:{[rt.completeProfile]:St([m.updateName,m.updateLocation],!0)},[A.makeFirstGroup]:{[rt.makePlan]:St([m.howManySessions,m.scheduleDecision,m.howOften,m.startDate,m.location,m.review],!0)},[A.makeMoreGroups]:{[rt.makePlan]:St([m.howManySessions,m.scheduleDecision,m.howOften,m.startDate,m.location,m.name,m.review],!0)},[A.inviteFriends]:{[rt.inviteFriends]:St([m.inviteFriends],!0)},[A.getACoach]:{[rt.getACoach]:St([m.requestCoachExplanation,m.updateName,m.updateLocation,m.updatePhone,m.contactPreferences,m.languagePreferences,m.howCanWeServe,m.connectingToCoach],!0)},[A.joinATraining]:{[rt.joinTraining]:St([m.joinTrainingSelection,m.confirmPlan,m.updateName,m.updateLocation,m.contactPreferences,m.updatePhone,m.joinTraining])},[A.connectWithFriend]:{[rt.connectFriend]:St([m.updateName,m.updateLocation,m.connectToFriend])},[A.joinFriendsPlan]:{[rt.joinFriendsTraining]:St([m.confirmPlan,m.updateName,m.updateLocation,m.joinFriendsPlan])},[A.joinCommunity]:{[rt.joinCommunity]:St([m.joinCommunityExplanation,m.contactPreferences,m.updatePhone,m.updateLocation,m.joinCommunity],!0)},[A.joinCommunityFromVision]:{[rt.joinCommunityFromVision]:St([m.joinCommunityExplanation,m.updateName,m.updateLocation,m.contactPreferences,m.updatePhone,m.languagePreferences,m.joinCommunity],!0)},[A.checkin]:{[rt.checkin]:St([m.checkinSubmit],!0)},[A.notifyOfFutureTrainings]:{[rt.notifyOfFutureTrainings]:St([m.notifyOfFutureTrainings],!0)}};function St(i=[],t=!1){const e={steps:[],skippable:t};return i.forEach(s=>{Object.values(m).includes(s)&&e.steps.push(s)}),e}var ce,Se,Qs,Yr,Js,Qr,Xs,Jr;class Ul{constructor(t){Et(this,Qs);Et(this,Js);Et(this,Xs);Et(this,ce,void 0);Et(this,Se,void 0);X(this,"profile");ne(this,ce,{}),ne(this,Se,[]),this.profile=t}reset(){ne(this,ce,{})}isTypeValid(t){return!!Object.values(A).includes(t)}isLoaded(){return Object.keys(gt(this,ce)).length!==0}getSteps(t){return Ot(this,Js,Qr).call(this,t),gt(this,Se)}updateProfile(t){this.profile=t}}ce=new WeakMap,Se=new WeakMap,Qs=new WeakSet,Yr=function(t){return this.isTypeValid(t)?Fl[t]:{}},Js=new WeakSet,Qr=function(t){const e=Ot(this,Qs,Yr).call(this,t);typeof e=="object"&&Object.keys(e).length===0||Ot(this,Xs,Jr).call(this,e)},Xs=new WeakSet,Jr=function(t){ne(this,ce,t),ne(this,Se,[]),Object.entries(gt(this,ce)).forEach(([e,{steps:s,skippable:n}])=>{s.forEach(a=>{const r=Rl[a];let o=null;if(r&&this.profile){if(r.testExistance(this.profile[r.field],this.profile))return;o=this.profile[r.field]}const h={slug:a,module:e,skippable:n};o!==null&&(h.value=o),gt(this,Se).push(h)})})};/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const ql=Rr(class extends Fr{constructor(i){if(super(i),i.type!==ye.PROPERTY&&i.type!==ye.ATTRIBUTE&&i.type!==ye.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Cl(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===Vt||t===ct)return t;const e=i.element,s=i.name;if(i.type===ye.PROPERTY){if(t===e[s])return Vt}else if(i.type===ye.BOOLEAN_ATTRIBUTE){if(!!t===e.hasAttribute(s))return Vt}else if(i.type===ye.ATTRIBUTE&&e.getAttribute(s)===t+"")return Vt;return Ur(i),t}});class Bl extends B{static get properties(){return{skippable:{type:Boolean},t:{type:Object},variant:{type:String},value:{type:String},locations:{attribute:!1},locationError:{attribute:!1},phoneError:{attribute:!1},city:{attribute:!1},loading:{attribute:!1},state:{attribute:!1},localValue:{attribute:!1},isInfoOpen:{type:Boolean,attribute:!1},infoText:{type:String,attribute:!1}}}constructor(){super(),this.skippable=!1,this.variant="",this.t={},this.locations=[],this.locationError="",this.city="",this.loading=!1,this.localValue="",this.phoneError="",this.isInfoOpen=!1,this.infoText="",this._clearLocations=this._clearLocations.bind(this),this._handleSuggestions=this._handleSuggestions.bind(this),this._debounceCityChange=debounce(getAddressSuggestions(this._handleSuggestions,jsObject.map_key)).bind(this),this._handleCityInputChange=this._handleCityInputChange.bind(this)}firstUpdated(){Tt(this.renderRoot,"complete-profile")}updated(t){t.has("variant")&&(this.renderRoot.querySelector(".inputs input").focus(),this.isInfoOpen=!1),ke("complete-profile"),Tt(this.renderRoot,"complete-profile")}willUpdate(t){t.has("value")&&this.value!==""&&(this.localValue=JSON.parse(this.value))}render(){var t;return l`
        <form class="inputs stack" @submit=${this._handleSubmit}>
            ${this.variant===m.updateName?l`
                <h2>${this.t.name_question}</h2>
                <div class="d-flex align-items-center">
                    <label for="name" class="visually-hidden">${this.t.name}</label>
                    <input class="input" type="text" id="name" name="name" value=${this.localValue} ?required=${!this.skippable} placeholder=${this.t.name}>
                    <button type="button" class="icon-btn f-1" @click=${()=>this._toggleInfo("name")}>
                        <span class="icon z-icon-info brand-light"></span>
                    </button>
                </div>
            `:""}

            ${this.variant===m.updatePhone?l`
                <h2>${this.t.phone_question}</h2>
                <div class="d-flex align-items-center">
                    <label for="phone" class="visually-hidden">${this.t.phone}</label>
                    <phone-input
                      id="phone"
                      name="phone"
                      value=""
                      ?required=${!this.skippable}
                      @input=${this._handleInput}
                      @invalid=${this._handleInvalid}
                    ></phone-input>
                    <button type="button" class="icon-btn f-1" @click=${()=>this._toggleInfo("phone")}>
                        <span class="icon z-icon-info brand-light"></span>
                    </button>
                    <div class="input-error" data-state="${this.phoneError.length?"":"empty"}" >${this.phoneError}</div>
                </div>
            `:""}

            ${this.variant===m.updateLocation?l`
                <h2>${this.t.location_question}</h2>
                <div class="form-group">
                    <div class="d-flex align-items-center">
                        <label class="input-label visually-hidden" for="city">${this.t.city}</label>
                        <input
                            class="input"
                            type="text"
                            id="city"
                            name="city"
                            placeholder=${this.t.city}
                            .value="${this.city?ql(this.city):(t=this.localValue)===null||t===void 0?void 0:t.label}"
                            @input=${this._handleCityChange}
                        >
                        <button type="button" class="icon-btn f-1" @click=${()=>this._toggleInfo("location")}>
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <span class="loading-spinner ${this.loading?"active":""}"></span>
                    <p class="input-subtext">${this.t.approximate_location}</p>
                </div>
                <div id="address_results" class="stack--3 mx-auto fit-content">
                    ${this.locationError}
                    ${this.locations.map(e=>l`
                            <div
                                class="address-result btn rounded"
                                id="${e.id}"
                                data-place-name=${e.place_name}
                                @click=${this._handleLocationSelection}
                            >
                                ${e.place_name}
                            </div>
                        `)}
                </div>

            `:""}
            <div class="info-area zume-collapse" ?data-expand=${this.isInfoOpen}>
                <div class="card mw-50ch mx-auto">
                    <p>${this.infoText}</p>
                    <a class="f--1 gray-500" href=${jsObject.privacy_url+"#personal-information"} target="_blank">${this.t.privacy_page}</a>
                </div>
            </div>
            <div class="cluster | mx-auto">
                <button type="submit" class="btn tight" ?disabled=${this.loading}>
                    ${this.t.next}
                    ${[m.updatePhone,m.updateName].includes(this.variant)?l`
                        <span class="loading-spinner ${this.loading?"active":""}"></span>
                    `:""}
                </button>
            </div>
        </form>

        `}_handleInput(t){this.phoneError=""}_handleInvalid(t){t.preventDefault(),this.phoneError=this.t.phone_error}_handleSubmit(t){t.preventDefault(),t.srcElement.querySelector("#city")?this._handleSubmitLocation():this._handleDone(t)}_handleDone(t){t&&t.preventDefault();const e=t.target[0];if(e.type==="submit")return;let{name:s,value:n}=e;e.type==="tel"&&(n=e.value.replace(/[\(\)\-\s]/g,"")),this._updateProfile(s,n,()=>{this._sendDoneStepEvent()})}_sendDoneStepEvent(){this.dispatchEvent(new CustomEvent("done-step",{bubbles:!0}))}_sendProfileUpdateEvent(){this.dispatchEvent(new CustomEvent("profile:reload",{bubbles:!0}))}_handleCityChange(t){this._handleCityInputChange(t),this._debounceCityChange(t)}_handleCityInputChange(t){this.city=t.target.value}_handleSuggestions(t){t.features.length<1&&(this.locationError=this.t.no_locations_found),this.locations=t.features}_handleLocationSelection(t){this.city=t.target.dataset.placeName;const e=getLocationGridFromMapbox(t.target.id,jsObject.profile.location);this.localValue=e,this._clearLocations()}_handleSubmitLocation(){if(this.localValue.source==="ip"){const{label:t,level:e,lat:s,lng:n}=this.localValue;this.localValue={source:"user",grid_id:!1,label:t,level:e,lat:Number(s),lng:Number(n)}}this._updateProfile("location_grid_meta",this.localValue,()=>{this._sendDoneStepEvent()})}_updateProfile(t,e,s=()=>{}){this.loading=!0;const n={[t]:e};fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(n),headers:{"X-WP-Nonce":jsObject.nonce}}).then(a=>a.json()).then(a=>{jsObject.profile=a,this._sendProfileUpdateEvent(),s()}).catch(a=>{console.error(a)}).finally(()=>{this.loading=!1})}_clearLocations(){this.locations=[]}_toggleInfo(t){this.isInfoOpen?this.isInfoOpen=!1:this._openInfo(t)}_openInfo(t){switch(this.isInfoOpen=!0,t){case"name":this.infoText=this.t.user_name_disclaimer;break;case"phone":this.infoText=this.t.user_phone_disclaimer;break;case"location":this.infoText=this.t.user_city_disclaimer;break}}createRenderRoot(){return this}}window.customElements.define("complete-profile",Bl);class Vl extends B{static get properties(){return{t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const t=new URL(location.href);if(!t.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));return}const e=t.searchParams.get("code");this.code=e,F.post("connect/friend",{code:e}).then(s=>{console.log(s),this.message=this.t.success.replace("%s",s.name)}).catch(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_friend_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error)}).finally(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.dispatchEvent(new CustomEvent("wizard:finish",{bubbles:!0}))})}setErrorMessage(t){this.errorMessage=t}render(){return l`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("connect-friend",Vl);class Wl extends B{static get properties(){return{t:{type:Object},invitecode:{type:String},loading:{type:Boolean,attribute:!1},errorMessage:{type:String,attribute:!1},copyFeedback:{type:String,attribute:!1},training:{type:Object,attribute:!1}}}constructor(){super(),this.t={},this.training={},this.loading=!1,this.errorMessage="",this.copyFeedback="",this.url=""}connectedCallback(){super.connectedCallback();const t=new URL(location.href);if(!this.invitecode){const e=t.searchParams.get("joinKey");this.invitecode=e}this.url=jsObject.site_url+`/training-group/${this.invitecode}`,this.loading=!0,F.get(`plan/${this.invitecode}`,{}).then(e=>{if(e.error_code){this.errorMessage=this.t.broken_link;return}this.training=e,this.errorMessage=""}).catch(e=>{console.error(e),this.errorMessage=this.t.broken_link}).finally(()=>{this.loading=!1}),this.dispatchEvent(new CustomEvent("wizard:finish",{bubbles:!0}))}getNextSession(){if(Object.keys(this.training).length===0)return;const{set_type:t}=this.training,e=this.numberOfSessions(t.key),s=M.now();for(let n=1;n<e+1;n++){const a=n<10?`0${n}`:`${n}`,r=this.training[t.key+"_"+a];if(r&&M.fromSeconds(r.timestamp).endOf("day")>s.startOf("day"))return M.fromSeconds(r.timestamp).toISODate()}return""}numberOfSessions(t){switch(t){case"set_a":return 10;case"set_b":return 20;case"set_c":return 5}}getInviteText(){const t=this.getNextSession(),e=this.t.note.replace("%s",this.training.post_author_display_name),s=this.training.location_note,n=this.training.time_of_day_note?`, ${this.training.time_of_day_note}`:"",a=this.training.timezone_note?`, ${this.training.timezone_note}`:"";return`${e}

${this.t.location}: ${s}
${this.t.time}: ${t!==""?M.fromISO(t).toFormat("DDDD")+n+a:""}

${this.t.join_url}
${this.url}

${this.t.join_code}: ${this.training.join_key}
${this.training.zoom_link_note?`
${this.t.meeting_link}: ${this.training.zoom_link_note}
`:""}`}copyInvite(){const t=this.getInviteText();navigator.clipboard&&navigator.clipboard.writeText(t).then(()=>{this.copyFeedback=this.t.copy_feedback,setTimeout(()=>{this.copyFeedback=""},3e3)})}render(){const t=this.getInviteText();return l`
            <div class="center stack">
                <span class="z-icon-share brand-light f-7"></span>
                <h2>${this.t.title}</h2>
                <p>${this.t.share_with_friends}</p>

                ${this.loading?l`<span class="loading-spinner active"></span>`:""}
                ${!this.loading&&this.errorMessage!==""?l`<span class="banner warning">${this.errorMessage}</span>`:""}
                ${!this.loading&&this.errorMessage===""?l`
                        <div class="mw-60 w-8rem">
                            <img src=${this.training.qr_url}>
                        </div>

                        <textarea class="input" rows="9">${t}</textarea>
                        ${navigator.clipboard?l`
                                <div class="position-relative">
                                    <button class="btn mx-auto fit-content" @click=${this.copyInvite}>${this.t.copy_invite}</button>
                                    <p role="alert" aria-live="polite" id="copyFeedback" class="context-alert" data-state=${this.copyFeedback.length?"":"empty"}>${this.copyFeedback}</p>
                                </div>
                            `:""}
                        <p class="text-left">
                            <span class="f-medium">${this.t.join_code}:</span>
                            ${this.training.join_key}
                        </p>
                        <share-links url=${this.url} title="${this.t.join_my_plan}" .t=${this.t} alwaysShow ></share-links>
                    `:""}
            </div>
        `}createRenderRoot(){return this}}window.customElements.define("invite-friends",Wl);class Hl extends B{static get properties(){return{t:{type:Object},hasNextStep:{type:Boolean},variant:{type:String},code:{attribute:!1},message:{type:String,attribute:!1},errorMessage:{type:String,attribute:!1},successMessage:{type:String,attribute:!1},success:{type:Boolean,attribute:!1},loading:{type:Boolean,attribute:!1},success:{type:Boolean,attribute:!1},showTrainings:{attribute:!1},showNextStep:{attribute:!1},privacyPolicyOpen:{type:Boolean,attribute:!1},notifyOfFutureTrainings:{type:Boolean,attribute:!1},leavingNotificationList:{type:Boolean,attribute:!1},training:{type:Object,attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.successMessage="",this.success=!1,this.message="",this.showTrainings=!1,this.showNextStep=!1,this.loading=!1,this.leavingNotificationList=!1,this.privacyPolicyOpen=!1,this.isOnNotificationList=jsObject.profile.notify_of_future_trainings==="1",this.notifyOfFutureTrainings=jsObject.profile.notify_of_future_trainings==="1",this.stateManager=se.getInstance(rt.joinTraining),this.training={}}firstUpdated(){if(this.variant===m.joinTraining){this._handleJoinTraining();return}const t=new URL(location.href);if(!t.searchParams.has("code")){this.message="",this.loading=!1,this.showTrainings=!0;return}const e=t.searchParams.get("code");this.chooseTraining(e)}willUpdate(t){t.has("variant")&&this.variant===m.joinTrainingSelection&&(new URL(location.href).searchParams.has("code")||(this.message="",this.showTrainings=!0))}connectToPlan(t){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait,this.code=t,F.post("connect/public-plan",{code:t}).then(e=>{this.successMessage=this.t.success.replace("%s",e.name),this.success=!0,this.message="",e.coach_request_success||this.setErrorMessage(this.t.coach_request_failed);const s=new URL(location.href);s.searchParams.set("joinKey",t),window.history.pushState(null,null,s.href)}).catch(e=>{this.message="",e.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error)}).finally(()=>{this.loading=!1,Tt(this.renderRoot,"join-training"),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.dispatchEvent(new CustomEvent("wizard:finish",{bubbles:!0}))})}setErrorMessage(t){this.errorMessage=t}_handleChosenTraining(t){const{code:e,training:s}=t.detail;this.chooseTraining(e,s)}async chooseTraining(t,e){this.showTrainings=!1,this.showNextStep=!0,this.code=t;let s=e;if(!s){const n=this.stateManager.get(m.confirmPlan);n&&n.code===t?s=n.training:s=await F.get(`plan/${t}`)}this.stateManager.add(m.confirmPlan,{code:t,training:s}),this._sendDoneStepEvent()}_handleJoinTraining(){const t=this.stateManager.get(m.confirmPlan);this.connectToPlan(t.code)}_sendDoneStepEvent(){const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)}togglePrivacyPolicy(){this.privacyPolicyOpen=!this.privacyPolicyOpen}toggleNotificationList(){this.leavingNotificationList||(this.leavingNotificationList=!0,this.notifyOfFutureTrainings=!this.notifyOfFutureTrainings,F.post("email-preferences",{notify_of_future_trainings:this.notifyOfFutureTrainings}).then(t=>{this.dispatchEvent(new CustomEvent("user-profile:change",{bubbles:!0,detail:t}))}).catch(t=>{this.notifyOfFutureTrainings=!this.notifyOfFutureTrainings,this.setErrorMessage(this.t.error)}).finally(()=>{this.leavingNotificationList=!1}))}render(){return l`
            <div class="stack">
                <h1>${this.t.title}</h1>

                ${this.message.length?l`<p>${this.message}</p>`:""}

                <span class="loading-spinner mx-auto ${this.loading?"active":""}"></span>

                ${this.showTrainings&&this.variant===m.joinTrainingSelection?l`
                          <public-trainings
                              .t=${this.t}
                              notifyUrl=${jsObject.notify_of_future_trainings_url}
                              @chosen-training=${this._handleChosenTraining}
                          ></public-trainings>
                      `:""}

                ${this.success?l`
                    <button class="btn outline tight mt-0 mx-auto fit-content" @click=${this.togglePrivacyPolicy}>
                      ${this.t.privacy_policy}
                    </button>
                    <div class="zume-collapse" ?data-expand=${this.privacyPolicyOpen}>
                      <ul role="list" class="fit-content mt-1 mx-auto text-left">
                        <li>${this.t.contact_visibility1}</li>
                      </ul>
                    </div>
                `:""}

                ${this.success&&this.isOnNotificationList?l`
                  <div class="card mw-50ch mx-auto">
                    <p class="bold">${this.t.do_you_want_to_unsubscribe_from_the_notification_list}</p>
                    <div class="form-control brand-light">
                      <input
                          type="checkbox"
                          id="notify_of_future_trainings"
                          ?checked=${this.notifyOfFutureTrainings}
                          @change=${this.toggleNotificationList}
                      />
                      <label for="notify_of_future_trainings" class="f-1">
                          ${jsObject.translations.notify_of_future_trainings}
                      </label>
                      </div>
                      <span class="loading-spinner mx-auto ${this.leavingNotificationList?"active":""}"></span>
                  </div>
                `:""}

                ${this.showNextStep||this.success&&this.hasNextStep?l`
                          <button class="btn fit-content mx-auto" @click=${this._sendDoneStepEvent}>
                              ${this.t.next}
                          </button>
                      `:""}

                <div class="success banner" data-state=${this.successMessage.length?"":"empty"}>${this.successMessage}</div>
                <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("join-training",Hl);class Gl extends B{static get properties(){return{hasNextStep:{type:Boolean},t:{type:Object},variant:{type:String},loading:{type:Boolean,attribute:!1},success:{type:Boolean,atrtibute:!1},error:{type:String,attribute:!1},requestSent:{type:Boolean,attribute:!1}}}constructor(){super(),this.loading=!1,this.success=!1,this.requestSent=!1,this.error=""}joinCommunity(){this.loading=!0,this.requestSent=!0,F.post("join_community").then(t=>{this.success=!0}).catch(t=>{t.message==="coach_request_failed"?(this.success=!0,this.error=this.t.error_connecting):(this.success=!1,this.error=this.t.error)}).finally(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("wizard:finish",{bubbles:!0}))})}_sendDoneStepEvent(){const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)}render(){if(this.variant===m.joinCommunityExplanation)return l`
                <div class="container-md stack-2 center | py-2">
                  <h1 class="text-center">${this.t.community_title}</h1>
                  <p>${this.t.community_description}</p>
                  <div class="switcher | training-path">
                    <div class="stack | card | switcher-width-40">
                      <h2 class="f-1 text-center">${this.t.community_peer_title}</h2>
                      <img class="mx-auto h-6rem" src=${jsObject.images_url+"/Gather-A-Group-01.svg"} alt="Peer Mentoring">
                      <p class="mb-0">
                        ${this.t.community_peer_description}
                      </p>
                    </div>
                    <div class="stack | card | switcher-width-40">
                      <h2 class="f-1 text-center">${this.t.community_encouragement_title}</h2>
                      <img class="mx-auto h-6rem" src=${jsObject.images_url+"/coach-2guys.svg"}  alt="Free Tools">
                      <p class="mb-0">
                        ${this.t.community_encouragement_description}
                      </p>
                    </div>
                    <div class="stack | card | switcher-width-40">
                      <h2 class="f-1 text-center">${this.t.community_tools_title}</h2>
                      <img class="mx-auto h-6rem" src=${jsObject.images_url+"/JoinTraining.svg"} alt="Encouragement">
                      <p class="mb-0">
                        ${this.t.community_tools_description}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="container-md center stack">
                    <button class="btn large uppercase" @click=${this._sendDoneStepEvent}>
                        ${this.t.community_join_free}
                    </button>
                </div>
            `;if(this.variant===m.joinCommunity)return!this.loading&&!this.requestSent&&this.joinCommunity(),l`
                <h1>${this.t.community_title}</h1>
                <p>${this.t.please_wait}</p>
                ${this.loading===!0?l`
                        <span class="loading-spinner active"></span>
                    `:""}
                <div class="stack">
                    ${this.success===!0?l`
                            <span class="banner success">
                                ${this.t.joined_community}
                            </span>
                        `:""}
                    ${this.error!==""?l`
                            <span class="banner warning">
                                ${this.error}
                            </span>
                        `:""}
                </div>
                ${this.success&&this.hasNextStep?l`
                        <button class="btn" @click=${this._sendDoneStepEvent}>
                            ${this.t.next}
                        </button>
                    `:""}
            `}createRenderRoot(){return this}}customElements.define("join-community",Gl);class Zl extends B{static get properties(){return{t:{type:Object},variant:{type:String},code:{type:String,attribute:!1},message:{type:Array,attribute:!1},errorMessage:{type:String,attribute:!1},successMessage:{type:String,attribute:!1},success:{type:Boolean,attribute:!1},loading:{type:Boolean,attribute:!1},privacyPolicyOpen:{type:Boolean,attribute:!1},plan:{type:Object,attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.successMessage="",this.success=!1,this.message=[],this.loading=!1,this.privacyPolicyOpen=!1,this.plan=null,this.stateManager=se.getInstance(rt.joinFriendsTraining),this.stateManager.clear()}willUpdate(t){if(t.has("variant")&&this.variant===m.joinFriendsPlan){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message.push(this.t.please_wait);const s=new URL(location.href).searchParams.get("code");this.code=s,F.post("connect/plan",{code:s}).then(n=>{this.success=!0,this.successMessage=this.t.success.replace("%s",n.name),this.message="";const a=new URL(location.href);a.searchParams.set("joinKey",s),window.history.pushState(null,null,a.href)}).catch(n=>{console.log(n),this.success=!1,this.message="",n.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error)}).finally(()=>{this.loading=!1,Tt(this.renderRoot,"join-friends-training"),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.dispatchEvent(new CustomEvent("wizard:finish",{bubbles:!0}))})}}setErrorMessage(t){this.errorMessage=t}togglePrivacyPolicy(){this.privacyPolicyOpen=!this.privacyPolicyOpen}_sendDoneStepEvent(){const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)}render(){if(this.variant===m.joinFriendsPlan)return l`
              <h1>${this.t.title}</h1>
              <div class="stack--2">
                <div class="success banner" data-state=${this.successMessage.length?"":"empty"}>${this.successMessage}</div>
                ${this.message.length?l`<p>${this.message}</p>`:""}
                <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
              </div>
              <span class="loading-spinner ${this.loading?"active":""}"></span>
              ${this.success?l`
                  <button class="btn outline tight" @click=${this.togglePrivacyPolicy}>
                    ${this.t.privacy_policy}
                  </button>
                  <div class="zume-collapse" ?data-expand=${this.privacyPolicyOpen}>
                    <ul role="list" class="fit-content mt-1 mx-auto text-left">
                      <li>${this.t.contact_visibility1}</li>
                      <li>${this.t.contact_visibility2}</li>
                      <li>${this.t.contact_visibility3}</li>
                    </ul>
                    <a href="/dashboard?profile=true" class="btn brand tight">${this.t.change_preferences}</a>
                  </div>
              `:""}
          `}createRenderRoot(){return this}}customElements.define("join-friends-training",Zl);class Kl extends B{static get properties(){return{t:{type:Object},training:{type:Object,attribute:!1}}}constructor(){super(),this.t={},this.training={}}firstUpdated(){const e=se.getInstance(rt.joinTraining).get(m.confirmPlan);if(!e||!e.training){const s=new URLSearchParams(window.location.search).get("code");this.getTraining(s)}else this.training=e.training}getTraining(t){zumeRequest.get(`/plan/${t}`).then(e=>{this.training=e})}sendDoneStepEvent(){const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)}render(){return!this.training||Object.keys(this.training).length===0?l`
                <span class="loading-spinner active"></span>
            `:l`
            <h2 class="h3 brand-light text-center">${this.training.post_title||this.training.title}</h2>
            <table class="center" no-labels>
                <tbody>
                    <tr>
                        <td class="f-medium">${this.t.facilitator}:</td>
                        <td>${this.training.post_author_display_name}</td>
                    </tr>
                    <tr>
                        <td class="f-medium">${this.t.location}:</td>
                        <td>${this.training.location_note}</td>
                    </tr>
                    

                    <tr>
                        <td class="f-medium">${this.t.session}:</td>
                        <td>${this.training.total_sessions}</td>
                    </tr>
                    <tr>
                        <td class="f-medium">${this.t.next_session_date}:</td>
                        <td>${this.training.next_session_date_formatted}</td>
                    </tr>
                    ${this.training.time_of_day?l`
                        <tr>
                            <td class="f-medium">${this.t.time_of_day}:</td>
                            <td>${this.training.time_of_day_formatted}</td>
                        </tr>
                    `:l`
                        <tr>
                            <td class="f-medium">${this.t.time_of_day}:</td>
                            <td>${this.training.time_of_day_note}</td>
                        </tr>
                    `}
                    <tr>
                        <td class="f-medium">${this.t.timezone}:</td>
                        <td>${this.training.timezone?this.training.timezone:this.training.timezone_note}</td>
                    </tr>
                </tbody>
            </table>
            
            <calendar-select
                style='--primary-color: var(--z-brand-light); --hover-color: var(--z-brand-fade)'
                .selectedDays=${this.training.session_dates}
                view="all"
                startDate=${this.training.next_session_date}
                endDate=${this.training.session_dates[this.training.session_dates.length-1].date}
                viewOnly
            ></calendar-select>
            
            <p class="text-center">${this.t.complete_profile}</p>
            <button class="btn" @click=${this.sendDoneStepEvent}>${this.t.join_training}</button>
        `}createRenderRoot(){return this}}window.customElements.define("confirm-training",Kl);function as(i){function t(nt,G){return nt>>>G|nt<<32-G}for(var e=Math.pow,s=e(2,32),n="length",a,r,o="",h=[],u=i[n]*8,y=as.h=as.h||[],j=as.k=as.k||[],E=j[n],O={},R=2;E<64;R++)if(!O[R]){for(a=0;a<313;a+=R)O[a]=R;y[E]=e(R,.5)*s|0,j[E++]=e(R,1/3)*s|0}for(i+="";i[n]%64-56;)i+="\0";for(a=0;a<i[n];a++){if(r=i.charCodeAt(a),r>>8)return;h[a>>2]|=r<<(3-a)%4*8}for(h[h[n]]=u/s|0,h[h[n]]=u,r=0;r<h[n];){var H=h.slice(r,r+=16),et=y;for(y=y.slice(0,8),a=0;a<64;a++){var ht=H[a-15],ft=H[a-2],Ct=y[0],zt=y[4],Gt=y[7]+(t(zt,6)^t(zt,11)^t(zt,25))+(zt&y[5]^~zt&y[6])+j[a]+(H[a]=a<16?H[a]:H[a-16]+(t(ht,7)^t(ht,18)^ht>>>3)+H[a-7]+(t(ft,17)^t(ft,19)^ft>>>10)|0),dt=(t(Ct,2)^t(Ct,13)^t(Ct,22))+(Ct&y[1]^Ct&y[2]^y[1]&y[2]);y=[Gt+dt|0].concat(y),y[4]=y[4]+Gt|0}for(a=0;a<8;a++)y[a]=y[a]+et[a]|0}for(a=0;a<8;a++)for(r=3;r+1;r--){var It=y[a]>>r*8&255;o+=(It<16?0:"")+It.toString(16)}return o}class Yl extends B{static get properties(){return{t:{type:Object},variant:{type:String},state:{type:Object,attribute:!1},selectedDays:{type:Array,attribute:!1},completedSteps:{type:Array,attribute:!1},calendarStart:{type:String,attribute:!1},calendarEnd:{type:String,attribute:!1},calendarView:{type:String,attribute:!1},scheduleView:{type:String,attribute:!1},errorMessage:{type:String,attribute:!1},message:{type:String,attribute:!1},loading:{type:Boolean,attribute:!1},joinCodeOpen:{type:Boolean,attribute:!1}}}constructor(){super(),this.variant="",this.t={},this.state={},this.timeNote="",this.errorMessage="",this.message="",this.loading=!1,this.stateManager=se.getInstance(rt.makePlan),this.stateManager.clear(),this.trainingSchedule=[],this.selectedDays=[],this.completedSteps=[],this.calendarStart=M.now().startOf("month").toISODate(),this.calendarStartMinusOneYear=M.now().minus({year:1}).startOf("month").toISODate(),this.calendarEnd=M.now().plus({month:2}).endOf("month").toISODate(),this.calendarEndTwoYears=M.now().plus({years:2}).endOf("month").toISODate(),this.calendarView="all",this.scheduleView="calendar",this.joinCodeOpen=!1}willUpdate(t){const e={[m.howManySessions]:"10",[m.scheduleDecision]:"yes",[m.howOften]:"weekly",[m.location]:"",[m.startDate]:M.now().toISODate()};if(t.has("variant")){if(this.state=this.stateManager.get(this.variant)||e[this.variant],this.variant===m.howOften||this.variant===m.startDate){const s=this.stateManager.get(m.scheduleDecision);(this.isIntensive()||s==="no")&&this._sendDoneStepEvent()}this.variant===m.review&&this._buildSelectedDays(),this.variant===m.review&&this.isIntensive()&&(this.scheduleView="list")}}_handlePlanDecision(t){const e=t.target.dataset.decision;let s="";switch(e){case"make":s=A.makeAGroup;break;case"join-public":s=A.joinATraining;break;case"join-private":s=A.joinFriendsPlan;break}this._sendLoadWizardEvent(s)}_sendLoadWizardEvent(t,e={}){const s={wizard:t};Object.keys(e).length>0&&(s.queryParams=e),this.dispatchEvent(new CustomEvent("wizard:load",{bubbles:!0,detail:s}))}_handleDone(t){t&&t.preventDefault(),this.completedSteps.includes(this.variant)||(this.completedSteps=[...this.completedSteps,this.variant]),this.variant===m.scheduleDecision&&this.state==="no"&&(this.completedSteps=this.completedSteps.filter(e=>e!==m.howOften&&e!==m.startDate)),this._saveState(),this._sendDoneStepEvent()}_sendDoneStepEvent(){const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)}_gotoStep(t){const e=new CustomEvent("wizard:goto-step",{bubbles:!0,detail:{slug:t}});this.dispatchEvent(e)}_handleSelection(t){const e=t.target.dataset.value;this.state=e,this._saveState()}_saveState(){this.stateManager.add(this.variant,this.state)}_handleChange(t){if(t.target.name==="time"){this.timeNote=t.target.value,this.stateManager.add(m.timeNote,this.timeNote);return}t.target.type==="text"&&(this.state=t.target.value),this.stateManager.add(this.variant,this.state)}_buildSelectedDays(){const t=this.stateManager.get(m.howManySessions),e=this.stateManager.get(m.howOften),s=this.stateManager.get(m.startDate);if(!(this.selectedDays.length>0)&&t&&e&&s){let n=0;e==="weekly"&&(n=1),e==="biweekly"&&(n=2),e==="monthly"&&(n=4);const a=[],r=M.fromISO(s);for(let o=1;o<Number(t)+1;o++)a.push({date:r.plus({weeks:n*(o-1)}).toISODate(),id:this.createId()});this.selectedDays=a,this.calendarStart=M.fromISO(r).startOf("month").toISODate(),this.calendarEnd=M.fromISO(a[a.length-1].date).endOf("month").toISODate(),this.calendarView="all"}}_buildSet(t){const e=this.stateManager.get(m.howManySessions),s=this.stateManager.get(m.timeNote),a={location_note:this.stateManager.get(m.location)||"",time_of_day_note:s||""};jsObject.is_coach&&s&&(a.time_of_day=s);let r="";e==="10"&&(r="set_a_"),e==="20"&&(r="set_b_"),e==="5"&&(r="set_c_");const o=t.sort(this.sortDays);for(let h=1;h<Number(e)+1;h++){const u=h<10?`0${h}`:`${h}`;let y;h-1<o.length?y=M.fromISO(o[h-1].date).toSeconds():y="",a[r+u]=y}return a}sortDays(t,e){return t.date===e.date?0:t.date<e.date?-1:1}_handleCreate(){if(this.loading)return;const t=this.stateManager.get(m.howManySessions),e=this.stateManager.get(m.scheduleDecision),s=this.stateManager.get(m.name);let n="";switch(t){case"10":n="set_a";break;case"20":n="set_b";break;case"5":n="set_c";break}if(e==="yes"&&this.selectedDays.length!==Number(t)){this.errorMessage=this.t.incorrect_number_of_sessions,setTimeout(()=>{this.errorMessage=""},3e3);return}const a={user_id:jsObject.profile.user_id,contact_id:jsObject.profile.contact_id,title:s||"",set_type:n,set:this._buildSet(this.selectedDays)};this.loading=!0,F.post("plan",a).then(r=>{this._handleFinish(r.join_key)}).catch(r=>{console.log(r)}).finally(()=>{this.loading=!1})}_handleFinish(t){this.dispatchEvent(new CustomEvent("training:changed",{bubbles:!0})),this._sendLoadWizardEvent(A.inviteFriends,{joinKey:t})}isIntensive(){return this.stateManager.get(m.howManySessions)==="5"}toggleView(){this.scheduleView==="calendar"?this.scheduleView="list":this.scheduleView="calendar"}createId(){return as(Math.random(0,1e4)).slice(0,6)}selectStartDate(t){const{date:e}=t.detail;this.state=e,this.stateManager.add(m.startDate,this.state)}clearStartDate(t){this.state="",this.stateManager.remove(this.variant)}addDate(t){const{date:e}=t.detail,s={date:e,id:this.createId()};this.selectedDays=[...this.selectedDays,s]}removeDate(t){const{id:e}=t.detail;console.log(e);const s=this.selectedDays.findIndex(n=>e===n.id);s>-1&&(this.selectedDays=[...this.selectedDays.slice(0,s),...this.selectedDays.slice(s+1)])}updateCalendarEnd(t){const{newEndDate:e}=t.detail;this.calendarEnd=e}_clearCalendar(){this.selectedDays=[]}gotoJoinCodeStep(){const t=new URL(window.location.href),e=t.pathname.split("/"),s=m.joinWithCode;let n="";e[1]==="dashboard"?n=t.origin+t.pathname+t.search+`#${s}`:n=e.slice(0,-1).join("/")+"/"+s+t.search,console.log(n),window.history.pushState(null,null,n),this.variant=m.joinWithCode}_handleVerifyCode(){this.loading=!0,this.code=this.renderRoot.querySelector("#code").value,F.get(`plan/${this.code}`,{}).then(t=>{this.success=!0,se.getInstance(rt.joinTraining).add(m.confirmPlan,{code:this.code,training:t}),t.visibility.key==="private"?this._sendLoadWizardEvent(A.joinFriendsPlan,{code:this.code}):this._sendLoadWizardEvent(A.joinATraining,{code:this.code})}).catch(t=>{this.errorMessage=this.t.not_a_recognized_code,setTimeout(()=>{this.errorMessage=""},2500)}).finally(()=>{this.loading=!1})}render(){const t=Number(this.stateManager.get(m.howManySessions)),e=this.stateManager.get(m.scheduleDecision);let s="",n="";return this.selectedDays.length<t&&(s=this.t.x_of_total_selected.replace("%1$s",this.selectedDays.length).replace("%2$s",t),n="var(--z-brand-light)"),this.selectedDays.length===t&&(s=this.t.all_selected.replace("%s",t),n="var(--z-success)"),this.selectedDays.length>t&&(s=this.t.too_many_selected.replace("%s",this.selectedDays.length-t),n="var(--z-error-main)"),l`
            <div class="stack-1 position-relative">
                ${this.variant===m.planDecision?l`
                    <div class="stack">
                        <span class="z-icon-public-training brand-light f-7"></span>
                        <h2>${this.t.join_or_start_a_training}</h2>
                        <div class="stack mx-auto" data-fit-content>
                            <button class="btn tight" data-decision="make" @click=${this._handlePlanDecision}>${this.t.start_a_training}</button>
                            <button class="btn tight" data-decision="join-public" @click=${this._handlePlanDecision}>${this.t.join_a_public_training}</button>
                            <button class="btn tight" data-decision="join-private" @click=${this.gotoJoinCodeStep}>${this.t.join_with_code}</button>
                            <button class="btn tight outline" data-decision="skip" @click=${this._handlePlanDecision}>${this.t.skip_for_now}</button>
                        </div>
                    </div>
                `:""}
                ${this.variant===m.joinDecision?l`
                    <div class="stack">
                        <span class="z-icon-public-training brand-light f-7"></span>
                        <h2>${this.t.join_a_training}</h2>
                        <div class="stack mx-auto" data-fit-content>
                            <button class="btn tight" data-decision="join-public" @click=${this._handlePlanDecision}>${this.t.join_a_public_training}</button>
                            <button class="btn tight" data-decision="join-private" @click=${this.gotoJoinCodeStep}>${this.t.join_with_code}</button>
                        </div>
                    </div>
                `:""}
                ${this.variant===m.joinWithCode?l`
                    <div class="container-md">
                      <h1 class="brand">${this.t.join_with_code}</h1>
                      <div class="stack-1 invitation-form">
                          <p>${this.t.use_the_code_your_friend_sent_you}</p>
                          <div class="">
                              <label for="code"></label>
                              <input class="input" id="code" type="text" placeholder="012345">
                          </div>
                          <button
                              class="btn light fit-content center"
                              @click=${this._handleVerifyCode}
                          >
                              ${this.t.connect}
                          </button>
                          <span class="loading-spinner ${this.loading?"active":""}"></span>
                          <div class="banner warning text-center" data-state=${this.errorMessage.length?"":"empty"}>
                              ${this.errorMessage}
                          </div>
                      </div>
                    </div>
                `:""}
                ${this.variant===m.howManySessions?l`
                    <div class="stack">
                        <span class="z-icon-session-choice brand-light f-7"></span>
                        <h2>${this.t.question_which_session}</h2>
                        <div class="stack mx-auto" data-fit-content>
                            <button class="btn tight green ${this.state==="20"?"":"outline"}" data-value="20" @click=${this._handleSelection}>${this.t.hour_1_session_20}</button>
                            <button class="btn tight green ${this.state==="10"?"":"outline"}" data-value="10" @click=${this._handleSelection}>${this.t.hour_2_session_10}</button>
                            <button class="btn tight green ${this.state==="5"?"":"outline"}" data-value="5" @click=${this._handleSelection}>${this.t.hour_4_session_5}</button>
                            <button class="btn tight mt-2" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                `:""}
                ${this.variant===m.scheduleDecision?l`
                    <div class="stack">
                        <span class="z-icon-session-choice brand-light f-7"></span>
                        <h2>${this.t.question_schedule_training}</h2>
                        <div class="stack mx-auto" data-fit-content>
                            <button class="btn tight green ${this.state==="yes"?"":"outline"}" data-value="yes" @click=${this._handleSelection}>${this.t.yes}</button>
                            <button class="btn tight green ${this.state==="no"?"":"outline"}" data-value="no" @click=${this._handleSelection}>${this.t.no}</button>
                            <button class="btn tight mt-2" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                `:""}
                ${this.variant===m.howOften?l`
                    <div class="stack">
                        <span class="z-icon-time brand-light f-7"></span>
                        <h2>${this.t.question_how_often}</h2>
                        <div class="stack mx-auto" data-fit-content>
                            <button class="btn tight green ${this.state==="weekly"?"":"outline"}" data-value="weekly" @click=${this._handleSelection}>${this.t.weekly}</button>
                            <button class="btn tight green ${this.state==="biweekly"?"":"outline"}" data-value="biweekly" @click=${this._handleSelection}>${this.t.biweekly}</button>
                            <button class="btn tight green ${this.state==="other"?"":"outline"}" data-value="other" @click=${this._handleSelection}>${this.t.other}</button>
                            <button class="btn tight mt-2" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                `:""}
                ${this.variant===m.startDate?l`
                    <div class="stack">
                        <span class="z-icon-start-date brand-light f-7"></span>
                        <h2>${this.t.question_when_will_you_start}</h2>
                        <calendar-select
                            style='--primary-color: var(--z-brand-light); --hover-color: var(--z-brand-fade)'
                            showToday
                            showClearButton
                            showTodayButton
                            .translations=${{clear:this.t.clear,today:this.t.today}}
                            .selectedDays=${typeof this.state=="string"&&this.state?[{date:this.state}]:[]}
                            @day-added=${this.selectStartDate}
                            @clear=${this.clearStartDate}
                        ></calendar-select>
                        ${jsObject.is_coach?l`
                                <input type="time" name="time" @change=${this._handleChange} value=${this.timeNote} />
                            `:l`
                                <input type="text" name="time" placeholder=${this.t.time} @change=${this._handleChange} value=${this.timeNote} />
                            `}
                        <div class="stack mx-auto" data-fit-content>
                            <button class="btn fit-content mx-auto" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                `:""}
                ${this.variant===m.location?l`
                    <div class="stack">
                        <span class="z-icon-start-date brand-light f-7"></span>
                        <h2>${this.t.question_where_will_you_meet}</h2>
                        <p>${this.t.question_where_will_you_meet_help_text}</p>
                        <input type="text" name="location" placeholder=${this.t.location} @change=${this._handleChange} value=${typeof this.state=="string"?this.state:""} />
                        <div class="stack mx-auto" data-fit-content>
                            <button class="btn fit-content mx-auto" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                `:""}
                ${this.variant===m.name?l`
                    <div class="stack">
                        <span class="z-icon-start-date brand-light f-7"></span>
                        <h2>${this.t.question_what_is_the_groups_name}</h2>
                        <input type="text" name="name" placeholder=${this.t.group_name} @change=${this._handleChange} value=${typeof this.state=="string"?this.state:""} />
                        <div class="stack mx-auto" data-fit-content>
                            <button class="btn fit-content mx-auto" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                `:""}
                ${this.variant===m.review?l`
                    <div class="stack">
                        <h2><span class="z-icon-overview brand-light"></span> ${this.t.review_training}</h2>

                        ${e==="yes"?l`
                                    <div class="cluster">
                                        <button
                                            class="btn outline red small tight fit-content"
                                            @click=${this._clearCalendar}
                                        >
                                            ${this.t.clear_calendar}
                                        </button>
                                        <button class="btn outline small tight ms-auto" @click=${this.toggleView}>${this.scheduleView==="calendar"?"list":"calendar"}</button>
                                    </div>
                                `:""}
                        ${this.scheduleView==="calendar"&&e==="yes"?l`
                                    <calendar-select
                                        style='--primary-color: var(--z-brand-light); --hover-color: var(--z-brand-fade)'
                                        startDate=${this.calendarStart}
                                        endDate=${this.calendarEnd}
                                        .selectedDays=${this.selectedDays.sort(this.sortDays)}
                                        view=${this.calendarView}
                                        showToday
                                        showAddMonthButton
                                        .translations=${{clear:this.t.clear,today:this.t.today}}
                                        @day-added=${this.addDate}
                                        @day-removed=${this.removeDate}
                                        @calendar-extended=${this.updateCalendarEnd}
                                    ></calendar-select>
                                `:""}
                        ${this.scheduleView==="list"&&e==="yes"?l`
                                    <calendar-list
                                        .t=${this.t}
                                        .selectedDays=${this.selectedDays}
                                        @day-added=${this.addDate}
                                        @day-removed=${this.removeDate}
                                    ></calendar-list>
                                `:""}
                        <div class="make-training__save-area stack" ?data-absolute=${e==="no"}>
                            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
                            <div class="d-flex align-items-center gap-0 bg-white py-0">
                                ${e==="yes"?l`
                                        <div class="grow-1">
                                            <span>${s}</span>
                                            <progress-slider
                                                class="grow-1 mt--3"
                                                percentage=${this.selectedDays.length/t*100}
                                                style="--primary-color: ${n}"
                                            ></progress-slider>
                                        </div>
                                    `:l`<span class="grow-1"></span>`}
                                <button
                                    class="btn tight ms-auto"
                                    @click=${this._handleCreate}
                                >
                                    ${this.t.create}
                                    <span class="loading-spinner ${this.loading?"active":""}"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                `:""}
                ${this.variant!==m.planDecision?l`
                    <review-steps
                        .t=${this.t}
                        name=${this.stateManager.get(m.name)}
                        howManySessions=${this.stateManager.get(m.howManySessions)}
                        scheduleDecision=${this.stateManager.get(m.scheduleDecision)}
                        howOften=${this.stateManager.get(m.howOften)}
                        time=${this.stateManager.get(m.timeNote)}
                        date=${this.stateManager.get(m.startDate)}
                        whatLocation=${this.stateManager.get(m.location)}
                        .display=${this.completedSteps}
                        ?summaryOpen=${this.variant===m.review}
                    ></review-steps>
                `:""}
            </div>
        `}createRenderRoot(){return this}}customElements.define("make-training",Yl);class Ql extends B{static get properties(){return{t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},successMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.successMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait,F.post("connect/notify-of-future-trainings").then(t=>{this.message="",this.successMessage=this.t.success}).catch(t=>{console.log(t),this.message="",this.setErrorMessage(this.t.error)}).finally(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.dispatchEvent(new CustomEvent("wizard:finish",{bubbles:!0}))})}setErrorMessage(t){this.errorMessage=t}render(){return l`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span
                class="loading-spinner ${this.loading?"active":""}"
            ></span>
            <div
                class="warning banner"
                data-state=${this.errorMessage.length?"":"empty"}
            >
                ${this.errorMessage}
            </div>
            <div
                class="success banner"
                data-state=${this.successMessage.length?"":"empty"}
            >
                ${this.successMessage}
            </div>
        `}createRenderRoot(){return this}}customElements.define("notify-of-future-trainings",Ql);class Jl extends B{static get properties(){return{hasNextStep:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1},message:{attribute:!1},loading:{attribute:!1},requestSent:{attribute:!1}}}constructor(){super(),this.hasNextStep=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.message="",this.loading=!1,this.requestSent=!1,this.contactPreferences=["email","text","phone","whatsapp","signal","telegram","messenger"],this.stateManager=se.getInstance(rt.getACoach),this.stateManager.clear()}requestCoach(){this.message=this.t.please_wait;const t=this.stateManager.getAll();this.loading=!0,this.requestSent=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),F.post("get_a_coach",{data:t}).then(e=>{console.log(e,this),this.message=this.t.connect_success,e===!1&&(this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting))}).catch(e=>{if(e.message==="coach_request_failed"){this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_with_request);return}else if(e.message==="already_has_coach"){this.message="",this.setErrorMessage(this.t.already_coached);return}this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting)}).finally(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.dispatchEvent(new CustomEvent("wizard:finish",{bubbles:!0}))})}willUpdate(t){t.has("variant")&&(this.state=this.stateManager.get(this.variant)||{},this.variant===m.languagePreferences&&!this.state.value&&(this.state.value=jsObject.profile.preferred_language||"en",this.stateManager.add(this.variant,this.state)))}setErrorMessage(t){this.errorMessage=t}render(){return this.variant===m.connectingToCoach&&this.requestSent===!1&&this.requestCoach(),this.variant===m.requestCoachExplanation?l`
              <div class="stack-2">
                <h1 class="text-center">${this.t.title}</h1>
                <p>${this.t.request_coach_explanation_text}</p>
                <div class="switcher | training-path">
                    <div class="stack | card | switcher-width-40">
                        <h2 class="f-1 text-center">${this.t.no_cost}</h2>
                        <img class="mx-auto h-6rem" src="${jsObject.images_url}/Gather-A-Group-01.svg" alt="${this.t.join_a_training_group}">
                        <p class="mb-0">
                            ${this.t.our_network_of_volunteer_coaches}
                        </p>
                    </div>
                    <div class="stack | card | switcher-width-40">
                        <h2 class="f-1 text-center">${this.t.localized}</h2>
                        <img class="mx-auto h-6rem" src="${jsObject.images_url}/JoinTraining.svg" alt="${this.t.join_a_training_group}">
                        <p class="mb-0">
                            ${this.t.our_connection_team}
                        </p>
                    </div>
                    <div class="stack | card | switcher-width-40">
                        <h2 class="f-1 text-center">${this.t.experienced}</h2>
                        <img class="mx-auto h-6rem" src="${jsObject.images_url}/coach-2guys.svg" alt="${this.t.join_a_training}">
                        <p class="mb-0">
                            ${this.t.all_our_coaches_are_trained}
                        </p>
                    </div>
                </div>
                <p>${this.t.request_coach_explanation_text_2}</p>
                <div class="mx-auto">
                    <button class="btn tight" @click=${this._handleDone}>${this.t.next}</button>
                </div>
              </div>
            `:l`
        <form class="inputs stack-2" @submit=${this._handleDone}>
            ${this.variant===m.contactPreferences?l`
                <h2>${this.t.contact_preference_question}</h2>
                <div class="stack | mx-auto fit-content text-start">
                    ${this.contactPreferences.map(t=>l`
                        <div class="form-control brand-light">
                            <input type="checkbox" name="contact-preference" id=${"prefer_"+t} value=${t} @change=${this._handleChange} ?checked=${!!this.state[t]} />
                            <label for=${"prefer_"+t}>${this.t[t]}</label>
                        </div>
                    `)}
                </div>
            `:""}

            ${this.variant===m.languagePreferences?l`
                <h2>${this.t.language_preference_question}</h2>
                <div class="stack">
                    <label for="preferred-language">${this.t.language_preference}</label>
                    <select name="preferred-language" id="preferred-language" @change=${this._handleChange} >

                        ${Object.values(jsObject.languages).map(t=>l`
                            <option value=${t.code} ?selected=${t.code===this.state.value} >
                                ${t.nativeName} - ${t.enDisplayName}
                            </option>
                        `)}

                    </select>
                </div>
            `:""}

            ${this.variant===m.howCanWeServe?l`
                <h2>${this.t.how_can_we_serve}</h2>
                <div class="stack | mx-auto fit-content text-start">
                    <div class="form-control brand-light">
                        <input type="checkbox" name="how-can-we-serve" id="coaching" value="coaching-request" @change=${this._handleChange} ?checked=${!!this.state.coaching} />
                        <label for="coaching">${this.t.coaching}</label>
                    </div>
                    <div class="form-control brand-light">
                        <input type="checkbox" name="how-can-we-serve" id="technical" value="technical-assistance" @change=${this._handleChange} ?checked=${!!this.state.technical} />
                        <label for="technical">${this.t.technical_assistance}</label>
                    </div>
                    <div class="form-control brand-light">
                        <input type="checkbox" name="how-can-we-serve" id="implementation" value="question-about-implementation" @change=${this._handleChange} ?checked=${!!this.state.implementation} />
                        <label for="implementation">${this.t.question_implementation}</label>
                    </div>
                    <div class="form-control brand-light">
                        <input type="checkbox" name="how-can-we-serve" id="content" value="question-about-content" @change=${this._handleChange} ?checked=${!!this.state.content} />
                        <label for="content">${this.t.question_content}</label>
                    </div>
                    <div class="form-control brand-light">
                        <input type="checkbox" name="how-can-we-serve" id="group-started" value="help-with-group" @change=${this._handleChange} ?checked=${!!this.state["group-started"]} />
                        <label for="group-started">${this.t.help_with_group}</label>
                    </div>
                </div>
            `:""}
            ${this.variant===m.connectingToCoach?l`

                <h1>${this.t.connecting_coach_title}</h1>
                <p>${this.message}</p>
                <span class="loading-spinner mx-auto ${this.loading?"active":""}"></span>
            `:""}
            ${this.hasNextStep?l`
                    <div class="mx-auto">
                        <button type="submit" class="btn tight" ?disabled=${this.loading}>${this.t.next} <span class="loading-spinner ${this.loading?"active":""}"></span></button>
                    </div>
                `:""}
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        </form>
        `}_handleDone(t){if(t&&t.preventDefault(),![m.connectingToCoach,m.requestCoachExplanation].includes(this.variant)&&(Object.keys(this.state).length===0||Object.values(this.state).every(e=>!e))){this.setErrorMessage(this.t.missing_response);return}else this.setErrorMessage("");this._sendDoneStepEvent()}_sendDoneStepEvent(){const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)}_handleChange(t){t.target.type==="checkbox"&&(this.state[t.target.value]=t.target.checked),t.target.type==="text"&&(this.state.value=t.target.value),t.target.type==="select-one"&&(this.state.value=t.target.value),this.stateManager.add(this.variant,this.state)}createRenderRoot(){return this}}customElements.define("request-coach",Jl);class Xl extends B{constructor(){super();X(this,"module");X(this,"steps");this.t={},this.display=[],this.summaryOpen=!1}static get properties(){return{t:{type:Object},name:{type:String},howOften:{type:String},howManySessions:{type:String},scheduleDecision:{type:String},whatLocation:{type:String},date:{type:String},time:{type:String},display:{type:Array},summaryOpen:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.howOfterDict={weekly:this.t.weekly,biweekly:this.t.biweekly,monthly:this.t.monthly,other:this.t.other},this.howManyDict={20:this.t.hour_1_session_20,10:this.t.hour_2_session_10,5:this.t.hour_4_session_5},this.scheduleDecisionDict={yes:this.t.yes,no:this.t.no}}disconnectedCallback(){super.disconnectedCallback(),ke(this.tagName)}updated(){Tt(this.renderRoot,this.tagName)}handleChange(e){const s=e.target.dataset.step;this.dispatchEvent(new CustomEvent("wizard:goto-step",{bubbles:!0,detail:{slug:s}})),window.scrollTo(0,0)}shouldDisplay(){return this.display.length>0}toggleSummary(){this.summaryOpen=!this.summaryOpen}renderSummary(e){switch(e){case m.name:return l`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            ${this.name===""?l`<span></span>`:l`<span>${this.name}</span>`}
                            <span class="d-flex justify-flex-end">
                                <button
                                    class="btn small no-outline tight"
                                    data-step=${m.name}
                                    @click=${this.handleChange}
                                >
                                    ${this.name!==""?this.t.change:this.t.set_group_name}
                                </button>
                            </span>
                        </div>
                    </div>
                `;case m.location:return l`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            ${this.whatLocation===""?l`<span></span>`:l`<span>${this.whatLocation}</span>`}
                            <span class="d-flex justify-flex-end">
                                <button
                                    class="btn small no-outline tight"
                                    data-step=${m.location}
                                    @click=${this.handleChange}
                                >
                                    ${this.whatLocation!==""?this.t.change:this.t.set_location}
                                </button>
                            </span>
                        </div>
                    </div>
                `;case m.howManySessions:return l`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            <span>${this.howManyDict[this.howManySessions]||this.howManySessions}</span>
                            <span class="d-flex justify-flex-end grow-0">
                                <button
                                    class="btn small no-outline tight"
                                    data-step=${m.howManySessions}
                                    @click=${this.handleChange}
                                >
                                    ${this.t.change}
                                </button>
                            </span>
                        </div>
                    </div>
                `;case m.scheduleDecision:return l`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            <span>${this.scheduleDecisionDict[this.scheduleDecision]||this.scheduleDecision}</span>
                            <span class="d-flex justify-flex-end grow-0">
                                <button
                                    class="btn small no-outline tight"
                                    data-step=${m.scheduleDecision}
                                    @click=${this.handleChange}
                                >
                                    ${this.t.change}
                                </button>
                            </span>
                        </div>
                    </div>
                `;case m.howOften:return l`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            <span>${this.howOfterDict[this.howOften]||this.howOften}</span>
                            <span class="d-flex justify-flex-end grow-0">
                                <button
                                    class="btn small no-outline tight"
                                    data-step=${m.howOften}
                                    @click=${this.handleChange}
                                >
                                    ${this.t.change}
                                </button>
                            </span>
                        </div>
                    </div>
                `;case m.startDate:return l`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            ${this.date===""?l`<span></span>`:l`
                                    <span>${M.fromFormat(this.date,"yyyy-MM-dd").toLocaleString({day:"numeric",month:"short",year:"numeric"})}</span>`}
                            <span class="d-flex justify-flex-end">
                                <button
                                    class="btn small no-outline tight"
                                    data-step=${m.startDate}
                                    @click=${this.handleChange}
                                >
                                    ${this.date!==""?this.t.change:this.t.set_start_date}
                                </button>
                            </span>
                        </div>
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            ${this.time===""?l`<span></span>`:l`
                                    <span>${this.time}</span>`}
                            <span class="d-flex justify-flex-end">
                                <button
                                    class="btn small no-outline tight"
                                    data-step=${m.startDate}
                                    @click=${this.handleChange}
                                >
                                    ${this.time!==""?this.t.change:this.t.set_start_time}
                                </button>
                            </span>
                        </div>
                    </div>
                `;default:return""}}render(){if(this.shouldDisplay())return l`
            <div class="stack mw-50ch mx-auto text-start mt-2">
                <hr />
                <button
                    class="h5 gray-700 text-left f-medium mt-2 repel"
                    @click=${this.toggleSummary}
                >
                    ${this.t.summary}
                    <img
                        class="chevron | svg w-1rem h-1rem ${this.groupMembersOpen?"rotate-180":""}"
                        src=${jsObject.images_url+"/chevron.svg"}
                    />
                </button>
                <div class="zume-collapse" ?data-expand=${this.summaryOpen}>
                    ${this.display.map(e=>this.renderSummary(e))}
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("review-steps",Xl);class t1 extends B{static get properties(){return{t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const t=new URL(location.href);if(!t.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.dispatchEvent(new CustomEvent("wizard:finish",{bubbles:!0}));return}const e=t.searchParams.get("code");this.code=e,F.post("checkin",{code:e}).then(s=>{this._sendDoneStepEvent()}).catch(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_checkin_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this.dispatchEvent(new CustomEvent("wizard:finish",{bubbles:!0}))}).finally(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){this.dispatchEvent(new CustomEvent("done-step",{bubbles:!0}))}setErrorMessage(t){this.errorMessage=t}render(){return l`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("session-checkin",t1);/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const Xr=Symbol.for(""),e1=i=>{if((i==null?void 0:i.r)===Xr)return i==null?void 0:i._$litStatic$},qt=(i,...t)=>({_$litStatic$:t.reduce((e,s,n)=>e+(a=>{if(a._$litStatic$!==void 0)return a._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${a}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(s)+i[n+1],i[0]),r:Xr}),wa=new Map,s1=i=>(t,...e)=>{const s=e.length;let n,a;const r=[],o=[];let h,u=0,y=!1;for(;u<s;){for(h=t[u];u<s&&(a=e[u],(n=e1(a))!==void 0);)h+=n+t[++u],y=!0;u!==s&&o.push(a),r.push(h),u++}if(u===s&&r.push(t[s]),y){const j=r.join("$$lit$$");(t=wa.get(j))===void 0&&(r.raw=r,wa.set(j,t=r)),e=o}return i(t,...e)},i1=s1(l);class n1 extends B{static get properties(){return{type:{type:String},params:{type:Object},finishUrl:{type:String},user:{type:Object},translations:{type:Object},noUrlChange:{type:Boolean},step:{attribute:!1},steps:{attribute:!1},loading:{type:Boolean,attribute:!1},finished:{type:Boolean,attribute:!1}}}constructor(){super(),this.stepIndex=0,this.steps=[],this.step={},this.params={},this.t=Ui(jsObject.translations),this.finished=!1,this._handleHistoryPopState=this._handleHistoryPopState.bind(this),this._handleLoadWizard=this._handleLoadWizard.bind(this),this._handleGotoStep=this._handleGotoStep.bind(this),this._handleReloadProfile=this._handleReloadProfile.bind(this),this._handleWizardFinished=this._handleWizardFinished.bind(this),this.stateManager=se.getInstance("root")}connectedCallback(){super.connectedCallback(),this.redirectToCheckinInUserLanguage(),this.wizard=new Ul(this.user),window.addEventListener("popstate",this._handleHistoryPopState),window.addEventListener("wizard:load",this._handleLoadWizard),window.addEventListener("wizard:goto-step",this._handleGotoStep),window.addEventListener("wizard:finish",this._handleWizardFinished),window.addEventListener("profile:reload",this._handleReloadProfile)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._handleHistoryPopState),window.removeEventListener("wizard:load",this._handleLoadWizard),window.removeEventListener("wizard:goto-step",this._handleGotoStep),window.removeEventListener("wizard:finish",this._handleWizardFinished),window.removeEventListener("profile:reload",this._handleReloadProfile)}firstUpdated(){this._handleHistoryPopState(!0),this.translations&&(this.t=Ui(this.translations))}willUpdate(t){if(t.has("type")&&this.type===""){this.resetWizard();return}if(t.has("type")&&this.type!==""){this.loadWizard(this.type,this.params);return}}redirectToCheckinInUserLanguage(){const t=zumeApiShare.getCookie("zume_language");if(!t||this.type!=="checkin")return;const e=new URL(location.href),s=e.pathname.split("/"),n=s[1];if(!Object.keys(jsObject.languages).includes(n))e.pathname="/"+t+e.pathname;else if(n!==t)s[1]=t,e.pathname=s.join("/");else return;location.href=e.href}loadWizard(t,e={}){let s=t;t===A.makeAGroup&&(jsObject.user_stage.state.plan_created?s=A.makeMoreGroups:s=A.makeFirstGroup),Object.values(A).includes(s)?(this.steps=this.wizard.getSteps(s),this._gotoStep(0,!0,e)):this._onSkip()}resetWizard(){this.wizard&&this.wizard.reset(),this.steps=[],this.step={},this.stepIndex=0,this.finished=!1}render(){if(this.wizard){if(!this.wizard.isTypeValid(this.type))return l`
                <div class="cover-page">
                    <div class="stack center | text-center">
                        <h1 class="brand">${this.t.bad_wizard}</h1>
                        <p>${this.t.found_bad_wizard}</p>
                        <div class="center">
                            <img
                                class="w-50"
                                src="https://imgs.search.brave.com/3f3MurVApxsoxJlmqxLF0fs5-WlAk6sEu9IV3sICb_k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWR2ZXJ0aXNlY2Fz/dC5jb20vcG9kY2Fz/dC9pbWFnZS9WZXJ5/QmFkV2l6YXJkcw.jpeg"
                                alt="bad wizards"
                            />
                        </div>
                        <a class="btn tight" href="/">${this.t.home}</a>
                    </div>
                </div>
            `;if(this.wizard.isLoaded())return this.steps.length===0?l`
                <div class="cover-page">
                    <div class="stack center | text-center">
                        <h1 class="brand">${this.t.completed_wizard_title}</h1>
                        <p>${this.t.completed_wizard_text}</p>
                        ${this.finishButton()}
                    </div>
                </div>
            `:l`
            <div class="container center">
                <header class="pt--1 px--4 w-100 position-relative">
                    <div class="text-end" id="wizard-skip-button">
                        ${this.headerButtons()}
                    </div>
                    <div class="center">${this.stepCounter()}</div>
                </header>

                <article class="${this.containerSize()} center text-center">
                    ${this.currentStep()}
                </article>

                <footer class="stack-1 ${this.containerSize()} | my-3 z-20">
                    ${this.footer()}
                </footer>
            </div>
        `}}containerSize(){return{...this.step},m.joinTraining?"container-md":"container-xsm"}currentStep(){const t={...this.step};let e="",s="";switch(t.slug){case m.updateName:case m.updateLocation:case m.updatePhone:e=qt`complete-profile`,s=this.t.complete_profile;break;case m.requestCoachExplanation:case m.contactPreferences:case m.languagePreferences:case m.howCanWeServe:case m.connectingToCoach:e=qt`request-coach`,s=this.t.get_a_coach;break;case m.inviteFriends:e=qt`invite-friends`,s=this.t.share;break;case m.joinTraining:case m.joinTrainingSelection:e=qt`join-training`,s=this.t.join_training;break;case m.confirmPlan:e=qt`confirm-training`,s=this.t.confirm_plan;break;case m.joinFriendsPlan:e=qt`join-friends-training`,s=this.t.join_training;break;case m.connectToFriend:e=qt`connect-friend`,s=this.t.connect_friend;break;case m.checkinSubmit:e=qt`session-checkin`,s=this.t.checkin;break;case m.planDecision:case m.joinDecision:case m.joinWithCode:case m.howManySessions:case m.scheduleDecision:case m.howOften:case m.startDate:case m.location:case m.name:case m.review:e=qt`make-training`,s=this.t.make_training;break;case m.joinCommunity:case m.joinCommunityExplanation:e=qt`join-community`,s=this.t.join_community;break;case m.notifyOfFutureTrainings:e=qt`notify-of-future-trainings`,s=this.t.notify_of_future_trainings;break}return i1`
            <${e}
                class="w-100"
                ?hasNextStep=${this.stepIndex<this.steps.length-1}
                variant=${t.slug}
                ?skippable=${t.skippable}
                .t=${s}
                invitecode=${t.joinKey}
                @done-step=${this._onNext}
                @loadingChange=${this._handleLoading}
                value=${JSON.stringify(t==null?void 0:t.value)}
            ></${e}>
        `}headerButtons(){return l`
            <div class="cluster | inline s-3">
                <button
                    class="close-btn"
                    aria-label=${jsObject.translations.close}
                    type="button"
                    @click=${this._onQuit}
                >
                    <span class="icon z-icon-close"></span>
                </button>
            </div>
        `}finishButton(){return this.finished?l`
            <button
                @click=${this._handleFinish}
                ?disabled=${this.loading}
                class="btn tight d-flex align-items-center gap--2
                ${this.loading?"disabled":""} uppercase"
            >
                ${this.t.dashboard} <span class="loading-spinner ${this.loading?"active":""}"></span>
            </button>
        `:""}stepCounter(){const t=this.steps.length<2;return l`
            <div class="cluster">
                ${this.steps.map((e,s)=>{const n=s<=this.stepIndex;return l`<div
                        class="step-circle ${t?"hidden":""} ${n?"complete":""}"
                    ></div>`})}
            </div>
        `}footer(){let t="";return this.noUrlChange&&this.stepIndex>0&&this.type!==A.makeAGroup&&this.step.slug!==m.connectingToCoach&&(t=l`
                <button
                    @click=${this._onBack}
                    class="btn tight outline fit-content"
                >
                    ${this.t.back}
                </button>
            `),l`
            <div class="cluster justify-content-center">
                ${t}
                ${this.stepIndex===this.steps.length-1?this.finishButton():""}
            </div>
        `}_onBack(){if(this.stepIndex>0){const t=this.stepIndex-1;this._gotoStep(t)}}_onNext(){if(this.stepIndex+1<this.steps.length){const t=this.stepIndex+1;this._gotoStep(t)}else this._onFinish()}_onSkip(){const t=this.step.module;for(let e=this.stepIndex+1;e<this.steps.length;e++)if(this.steps[e].module!==t){this._gotoStep(e);return}this._onFinish()}_onQuit(){if(this._isLastStep()){this._onFinish();return}this._onFinish(!0)}_handleFinish(){this._onFinish()}_onFinish(t=!1){this.stateManager.clear();const e=[A.gettingStarted,A.makeAGroup,A.makeFirstGroup,A.makeMoreGroups,A.joinATraining,A.joinATrainingWithCode,A.joinFriendsPlan,A.inviteFriends].includes(this.type);if(!this.finishUrl){this.dispatchEvent(new CustomEvent("user-state:change",{bubbles:!0})),this.dispatchEvent(new CustomEvent("wizard-finished",{bubbles:!0,detail:{type:this.type}})),this.resetWizard();return}this.loading=!0;const s=new URL(this.finishUrl);if(t===!1)if(this.type===A.checkin){const a=new URL(location.href).searchParams.get("code");if(a!==null){const r=new URL(jsObject.checkin_dashboard_url);r.searchParams.set("code",a),window.location.href=r.href;return}}else if(e){const a=new URL(location.href).searchParams.get("joinKey");if(a){const r=new URL(jsObject.training_dashboard_url+"/"+a);window.location.href=r.href;return}}else if(this.type===A.getACoach){window.location.href=jsObject.coaching_dashboard_url;return}else s.searchParams.set("completed",this.type);window.location.href=s.href}_isLastStep(){return this.stepIndex===this.steps.length-1}_gotoStep(t,e=!0,s={}){if(this.steps.length!==0){if(this.stepIndex=this.clampSteps(t),this.step={...this.steps[this.stepIndex]},e&&!this.noUrlChange){const n=new URL(window.location.href),a=n.pathname.split("/"),r=a[a.length-1];Object.keys(s).length>0&&Object.entries(s).forEach(([h,u])=>{n.searchParams.set(h,u)});let o="";Object.values(A).includes(r)?o=a.join("/")+"/"+this.step.slug+n.search:o=a.slice(0,-1).join("/")+"/"+this.step.slug+n.search,window.history.pushState(null,null,o)}if(e&&this.noUrlChange){const n=new URL(window.location.href);Object.keys(s).length>0&&Object.entries(s).forEach(([r,o])=>{n.searchParams.set(r,o)});const a=n.origin+n.pathname+n.search+`#${this.step.slug}`;window.history.pushState(null,null,a)}this.noUrlChange&&Object.keys(s).length>0&&Object.entries(s).forEach(([n,a])=>{this.step={...this.step,[n]:a}})}}clampSteps(t){let e=t;return t>this.steps.length-1&&(e=this.steps.length-1),t<0&&(e=0),e}_handleHistoryPopState(t=!1){const e=new URL(window.location.href),s=e.pathname.split("/"),n=s[s.length-1];if(!this.noUrlChange&&Object.values(A).includes(n)){this._gotoStep(0,!1);return}let a="",r=0;const o=h=>{if(this.noUrlChange){const u=e.hash.slice(1);return h===u}return n===h};if(this.steps.forEach(({slug:h,module:u},y)=>{if(a!==u&&(a=u,r=y),o(h)){if(t===!0&&this.stateManager.isDataStale()){this._gotoStep(r);return}this._gotoStep(y,!1);return}}),!this.steps.some(({slug:h})=>o(h))){this.steps=this.wizard.getSteps(this.type),this._gotoStep(0);return}}_handleGotoStep(t){const{slug:e}=t.detail,s=this.steps.findIndex(n=>n.slug===e);this._gotoStep(s)}_handleLoadWizard(t){const{wizard:e,queryParams:s}=t.detail;this.loadWizard(e,s)}_handleReloadProfile(){this.user=jsObject.profile,this.wizard.updateProfile(this.user)}_handleWizardFinished(){this.finished=!0}_handleLoading(t){const{loading:e}=t.detail;this.loading=e}createRenderRoot(){return this}}window.customElements.define("zume-wizard",n1);function a1(i){return i?JSON.parse('{"'+i.substring(1).replace(/&/g,'","').replace(/=/g,'":"')+'"}'):{}}function r1(i,t){let e={};const s=i.split("/").filter(a=>a!=""),n=t.split("/").filter(a=>a!="");return s.map((a,r)=>{/^:/.test(a)&&(e[a.substring(1)]=n[r])}),e}function d1(i){return i?new RegExp("^(|/)"+i.replace(/:[^\s/]+/g,"([\\wÀ-ÖØ-öø-ÿ-]+)")+"(|/)$"):new RegExp("(^$|^/$)")}function o1(i,t){if(d1(t).test(i))return!0}function l1(i){return class extends i{static get properties(){return{route:{type:String,reflect:!0,attribute:"route"},canceled:{type:Boolean}}}constructor(...t){super(...t),this.route="",this.canceled=!1}connectedCallback(...t){super.connectedCallback(...t),this.routing(this.constructor.routes,(...e)=>this.router(...e)),window.addEventListener("route",()=>{this.routing(this.constructor.routes,(...e)=>this.router(...e))}),window.onpopstate=()=>{window.dispatchEvent(new CustomEvent("route"))}}routed(t,e,s,n,a,r){r&&r(t,e,s,n),a(t,e,s,n)}routing(t,e){this.canceled=!0;const s=decodeURI(window.location.pathname),n=decodeURI(window.location.search);let a=t.filter(h=>h.pattern==="*")[0],r=t.filter(h=>h.pattern!=="*"&&o1(s,h.pattern))[0],o=a1(n);r?(r.params=r1(r.pattern,s),r.data=r.data||{},r.authentication&&r.authentication.authenticate&&typeof r.authentication.authenticate=="function"?(this.canceled=!1,Promise.resolve(r.authentication.authenticate.bind(this).call()).then(h=>{this.canceled||(h?r.authorization&&r.authorization.authorize&&typeof r.authorization.authorize=="function"?(this.canceled=!1,Promise.resolve(r.authorization.authorize.bind(this).call()).then(u=>{this.canceled||(u?this.routed(r.name,r.params,o,r.data,e,r.callback):this.routed(r.authorization.unauthorized.name,r.params,o,r.data,e,r.callback))})):this.routed(r.name,r.params,o,r.data,e,r.callback):this.routed(r.authentication.unauthenticated.name,r.params,o,r.data,e,r.callback))})):r.authorization&&r.authorization.authorize&&typeof r.authorization.authorize=="function"?(this.canceled=!1,Promise.resolve(r.authorization.authorize.bind(this).call()).then(h=>{this.canceled||(h?this.routed(r.name,r.params,o,r.data,e,r.callback):this.routed(r.authorization.unauthorized.name,r.params,o,r.data,e,r.callback))})):this.routed(r.name,r.params,o,r.data,e,r.callback)):a&&(a.data=a.data||{},this.routed(a.name,{},o,a.data,e,a.callback))}}}function le(i){return class extends i{navigate(t){window.history.pushState({},null,t),window.dispatchEvent(new CustomEvent("route"))}}}const L={root:"root",gettingStarted:"getting-started",setProfile:"set-profile",exploreSessions:"explore-sessions",createATraining:"create-a-training",joinATraining:"join-a-training",getACoach:"get-a-coach",training:"training",myTraining:"my-training",myTrainings:"my-trainings",myProgress:"my-progress",threeMonthPlan:"3-month-plan",practicing:"practicing",myCoach:"my-coach",myPlans:"my-plans",myChurches:"my-churches",myMaps:"my-maps",notFound:"not-found"};function Ne(i,t){return(e,s)=>{e.preventDefault();const n={};t&&(n.type=t),s(new CustomEvent(i,{bubbles:!0,detail:n}))}}function Sa(){return[{name:L.root,pattern:`${jsObject.base_url}`,icon:"",type:"dash-link",translation:"",data:{makeComponent:()=>""}},{name:L.gettingStarted,pattern:`${jsObject.base_url}/getting-started`,icon:"z-icon-start",type:"dash-link",translation:jsObject.translations.getting_started,data:{makeComponent:i=>l`<dash-getting-started></dash-getting-started>`}},{name:L.setProfile,pattern:"#",parent:L.gettingStarted,icon:"z-icon-profile",type:"handled-link",clickHandler:Ne("open-wizard",A.setProfile),translation:jsObject.translations.set_profile,explanation:jsObject.translations.set_profile_explanation,data:{makeComponent:()=>""}},{name:L.exploreSessions,pattern:"#",parent:L.gettingStarted,icon:"z-icon-course",type:"handled-link",clickHandler:Ne("open-course-explorer"),translation:jsObject.translations.explore_course,explanation:jsObject.translations.explore_course_profile_explanation,data:{makeComponent:()=>""}},{name:L.createATraining,pattern:"#",parent:L.gettingStarted,icon:"z-icon-start",type:"handled-link",clickHandler:Ne("open-wizard",A.makeAGroup),translation:jsObject.translations.create_training_group,explanation:jsObject.translations.create_training_group_explanation,data:{makeComponent:()=>""}},{name:L.joinATraining,pattern:"#",parent:L.gettingStarted,icon:"z-icon-public-training",type:"handled-link",clickHandler:Ne("open-wizard",A.joinDecision),translation:jsObject.translations.join_training_group,explanation:jsObject.translations.join_training_group_explanation,data:{makeComponent:()=>"",neverDisabled:!0}},{name:L.getACoach,pattern:"#",parent:L.gettingStarted,icon:"z-icon-coach",type:"handled-link",clickHandler:Ne("open-wizard",A.getACoach),translation:jsObject.translations.get_a_coach,explanation:jsObject.translations.get_a_coach_explanation,data:{makeComponent:()=>""}},{name:L.training,pattern:`${jsObject.base_url}/training`,icon:"z-icon-training",type:"dash-link",translation:jsObject.translations.training,data:{makeComponent:i=>l`<dash-training></dash-training>`}},{name:L.myTrainings,pattern:`${jsObject.base_url}/my-trainings`,icon:"z-icon-my-training",type:"dash-link",translation:jsObject.translations.my_trainings,data:{makeComponent:()=>l`<dash-trainings-list></dash-trainings-list>`}},{name:L.myTraining,pattern:`${jsObject.base_url}/my-training/:code`,parent:L.training,icon:"z-icon-my-training",type:"dash-link",translation:jsObject.translations.my_training,explanation:jsObject.translations.my_training_explanation,data:{makeComponent:(i,t)=>l`<dash-trainings ?showTeaser=${i==="teaser"} code=${i} .userProfile=${t}></dash-trainings>`}},{name:L.myProgress,pattern:`${jsObject.base_url}/my-progress`,parent:L.training,icon:"z-icon-progress",type:"dash-link",translation:jsObject.translations.my_progress,explanation:jsObject.translations.my_progress_explanation,data:{makeComponent:i=>l`<dash-progress ?showTeaser=${i}></dash-progress>`}},{name:L.threeMonthPlan,pattern:`${jsObject.base_url}/3-month-plan`,parent:L.training,icon:"z-icon-plans",type:"handled-link",clickHandler:Ne("open-3-month-plan"),translation:jsObject.translations.create_3_month_plan,explanation:jsObject.translations["3_month_plan_explanation"],data:{makeComponent:()=>""}},{name:L.practicing,pattern:`${jsObject.base_url}/practicing`,icon:"z-icon-practicing",type:"dash-link",translation:jsObject.translations.practicing,data:{makeComponent:i=>l`<dash-practicing></dash-practicing>`}},{name:L.myCoach,pattern:`${jsObject.base_url}/my-coach`,parent:L.practicing,icon:"z-icon-coach",type:"dash-link",translation:jsObject.translations.my_coach,explanation:jsObject.translations.my_coach_explanation,data:{makeComponent:i=>l`<dash-coach ?showTeaser=${i}></dash-coach>`}},{name:L.myPlans,pattern:`${jsObject.base_url}/my-plans`,parent:L.practicing,icon:"z-icon-plans",type:"dash-link",translation:jsObject.translations.my_plans,explanation:jsObject.translations.my_plans_explanation,data:{makeComponent:i=>l`<dash-plans ?showTeaser=${i}></dash-plans>`}},{name:L.myChurches,pattern:`${jsObject.base_url}/my-churches`,parent:L.practicing,icon:"z-icon-churches",type:"dash-link",translation:jsObject.translations.my_churches,explanation:jsObject.translations.my_churches_explanation,data:{makeComponent:i=>l`<dash-churches ?showTeaser=${i}></dash-churches>`}},{name:L.myMaps,pattern:`${jsObject.base_url}/my-maps`,parent:L.practicing,icon:"z-icon-maps",type:"dash-link",translation:jsObject.translations.my_maps,explanation:jsObject.translations.my_maps_explanation,data:{makeComponent:i=>l`<dash-maps ?showTeaser=${i}></dash-maps>`}},{name:L.notFound,pattern:"*",icon:"",type:"dash-link",data:{makeComponent:i=>l`<dash-not-found></dash-not-found>`}}]}class W extends le(l1(B)){static get properties(){return{route:{type:String},params:{type:Object},query:{type:Object},menuOffset:{type:Number,attribute:!1},userProfile:{type:Object,attribute:!1},userState:{type:Object,attribute:!1},trainingGroups:{type:Array,attribute:!1},wizardType:{type:String,attribute:!1},celbrationModalContent:{type:Object,attribute:!1},trainingGroupsOpen:{type:Boolean,attribute:!1},loadingExploreCourse:{type:Boolean,attribute:!1}}}static get routes(){const t=W.rootRoute,{makeComponent:e}=t.data;return Sa().map(n=>(n.name==="root"&&(n.data={makeComponent:e}),n))}static get rootRoute(){const t={1:"getting-started",2:"training",3:"practicing"},e=jsObject.user_stage.value||1,s=e<4?e:3;return Sa().find(({name:a})=>a===t[s])}static getRoute(t){return W.routes.find(s=>s.name===t)}static childRoutesOf(t){return W.routes.filter(({parent:s})=>s===t)}constructor(){var t,e;super(),this.route="",this.params={},this.query={},this.data={},this.menuOffset=0,this.userProfile=jsObject.profile,this.userState=(t=(e=jsObject)===null||e===void 0||(e=e.user_stage)===null||e===void 0?void 0:e.state)!==null&&t!==void 0?t:{},this.trainingGroups=jsObject.training_groups,this.updateSortedTrainingGroups(),this.wizardType="",this.celebrationModalContent={title:"",content:[]},this.loadingExploreCourse=!1,this.allCtas=[],this.ctas=[],this.userId=jsObject.profile.user_id,this.showingCelebrationModal=!1,this.unlockedSection=[],this.isVimeoAvailable=!1,this.languageSelectorElements=document.querySelectorAll(".language-selector"),this.updateUserProfile=this.updateUserProfile.bind(this),this.updateWizardType=this.updateWizardType.bind(this),this.closeWizard=this.closeWizard.bind(this),this.refetchState=this.refetchState.bind(this),this.refetchHost=this.refetchHost.bind(this),this.getCtas=this.getCtas.bind(this),this.redirectToPage=this.redirectToPage.bind(this),this.showCelebrationModal=this.showCelebrationModal.bind(this),this.updateTrainingGroups=this.updateTrainingGroups.bind(this),this.renderTrainingGroupLink=this.renderTrainingGroupLink.bind(this),this.openVideoModal=this.openVideoModal.bind(this),this.openCourseExplorer=this.openCourseExplorer.bind(this),this.handlePopState=this.handlePopState.bind(this),this.openProfile=this.openProfile.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("user-profile:change",this.updateUserProfile),window.addEventListener("toggle-dashboard-sidebar",this.toggleSidebar),window.addEventListener("open-wizard",this.updateWizardType),window.addEventListener("wizard-finished",this.closeWizard),window.addEventListener("wizard-finished",this.getCtas),window.addEventListener("wizard-finished",this.redirectToPage),window.addEventListener("open-3-month-plan",this.open3MonthPlan),window.addEventListener("open-video-modal",this.openVideoModal),window.addEventListener("open-course-explorer",this.openCourseExplorer),window.addEventListener("open-profile",this.openProfile),window.addEventListener("user-state:change",this.refetchState),window.addEventListener("user-state:change",this.getCtas),window.addEventListener("user-host:change",this.refetchHost),window.addEventListener("training:changed",this.updateTrainingGroups),window.addEventListener("commitments:change",this.getCtas),window.addEventListener("load",this.showCelebrationModal),window.addEventListener("ctas:changed",this.showCelebrationModal),window.addEventListener("popstate",this.handlePopState),this.addEventListener("route",this.updateLanguageSwitcher)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("user-profile:change",this.updateUserProfile),window.removeEventListener("toggle-dashboard-sidebar",this.toggleSidebar),window.removeEventListener("open-wizard",this.updateWizardType),window.removeEventListener("open-course-explorer",this.openCourseExplorer),window.removeEventListener("wizard-finished",this.closeWizard),window.removeEventListener("wizard-finished",this.getCtas),window.removeEventListener("wizard-finished",this.redirectToPage),window.removeEventListener("open-3-month-plan",this.open3MonthPlan),window.removeEventListener("open-video-modal",this.openVideoModal),window.removeEventListener("open-profile",this.openProfile),window.removeEventListener("user-state:change",this.refetchState),window.removeEventListener("user-state:change",this.getCtas),window.removeEventListener("user-host:change",this.refetchHost),window.removeEventListener("training:changed",this.updateTrainingGroups),window.removeEventListener("load",this.showCelebrationModal),window.removeEventListener("ctas:changed",this.showCelebrationModal),this.removeEventListener("route",this.updateLanguageSwitcher)}async firstUpdated(){this.getCtas(),this.menuOffset=this.getHeightOfElement(".header");const t=this.renderRoot.querySelector("#celebration-modal");t&&jQuery(t).on("closed.zf.reveal",()=>{this.showingCelebrationModal=!1});const e=document.querySelector("#course-explorer");e.querySelector("iframe").addEventListener("load",()=>{this.loadingExploreCourse=!1,e.querySelector(".loading-spinner").classList.remove("active")}),this.isVimeoAvailable=await td(),jQuery("#video-modal").on("closed.zf.reveal",this.stopVideoModal),jQuery("#course-explorer").on("closed.zf.reveal",this.clearCourseExplorer),this.trainingGroupsOpen=jQuery("#training-groups-menu").hasClass("is-active");const n=document.querySelector("#profile-modal");n&&jQuery(n).on("closed.zf.reveal",()=>{this.closeProfilePushState()}),jQuery(this.renderRoot).foundation(),new URLSearchParams(window.location.search).get("profile")==="true"&&setTimeout(()=>{this.openProfile();const r=window.location.pathname+window.location.hash;window.history.replaceState({},"",r)},0)}handlePopState(t){if(t.state){const{profile:e}=t.state,s=new URL(window.location.href);e||s.searchParams.get("profile")==="true"?this.openProfileModal():this.closeProfileModal()}}updateWizardType(t){const{type:e,params:s}=t.detail;this.openWizard(e,s)}router(t,e,s,n){this.route=t,this.params=e,this.query=s,this.data=n,this.dispatchEvent(new CustomEvent("route"))}makeHref(t){return`${jsObject.base_url}/${t}`}makeHrefRoute(t){const s=W.routes.find(({name:n})=>n===t);if(!s)return console.error("MISSING ROUTE",t),"";if(t===L.myTraining){if(W.getLockedStatus(t,this.userState))return s.pattern.replace(":code","teaser");if(this.numberOfGroups()===1){const r=Object.values(this.trainingGroups)[0].join_key;return s.pattern.replace(":code",r)}}return s.pattern}makeTrainingHref(t){const s=W.routes.find(({name:n})=>n===L.myTraining);return s?s.pattern.replace(":code",t):""}renderRoute(){const{makeComponent:t}=this.data;if(!t)return"";if(this.route===L.myTraining){const s=this.params.code;return t(s,this.userProfile)}const e=W.getLockedStatus(this.route,this.userState);return t(e)}getHeightOfElement(t){return document.querySelector(t).offsetHeight}toggleSidebar(){const t=document.querySelector(".dashboard__sidebar"),e=document.querySelector(".sidebar__trigger-close-background"),s="200";t.style.transitionDuration=s,e.style.transitionDuration=s;const n=t.dataset.state;n==="open"&&(t.dataset.state="closed",e.style.opacity=0,setTimeout(()=>{e.style.visibility="hidden"},s)),(!n||n==="closed")&&(t.dataset.state="open",e.style.opacity="initial",e.style.visibility="visible")}updateLanguageSwitcher(){this.languageSelectorElements.forEach(t=>{const e=location.href,s=t.dataset.url;if(s.includes("legacy.zume.training"))return;const n=e.split("/"),a=s.split("/"),r=a.findIndex(u=>u==="dashboard"),o=n.findIndex(u=>u==="dashboard"),h=[...a.slice(0,r),...n.slice(o)].join("/");t.dataset.url=h})}updateUserProfile(t){const e=t.detail;this.userProfile=e}createInitials(t){return typeof t!="string"||t.length===0?"":t.split(" ").map(s=>s.length>0?s[0].toUpperCase():"").slice(0,2).join("")}static getCompletedStatus(t,e){return!!(t===L.setProfile&&e&&e.set_profile_location&&e.set_profile_name||t===L.getACoach&&e.requested_a_coach||t===L.joinATraining&&(e.plan_created||e.joined_online_training)||t===L.createATraining&&(e.plan_created||e.joined_online_training)||t===L.threeMonthPlan&&e.made_post_training_plan)}static getLockedStatus(t,e){return!!(t===L.myPlans&&!e.made_post_training_plan||[L.myChurches,L.myMaps].includes(t)&&!e.join_community||t===L.threeMonthPlan&&!e.can_create_3_month_plan||t===L.myTraining&&(!e.is_in_a_training_group||!e.plan_created&&!e.joined_online_training)||t===L.myCoach&&!e.requested_a_coach)}isGettingStartedActive(){return this.getGettingStartedPercentage()!==100}getGettingStartedPercentage(){const t=[L.getACoach,L.setProfile,L.joinATraining],e=t.reduce((s,n)=>W.getCompletedStatus(n,this.userState)?s+1:s,0);return Math.round(e/t.length*100)}openWizard(t,e=""){const s=document.querySelector("#wizard-modal");jQuery(s).foundation("open"),this.wizardType=t,this.wizardParams=e}closeWizard(){console.log("closing wizard"),this.wizardType="",this.wizardParams="";const t=document.querySelector("#wizard-modal");jQuery(t).foundation("close")}open3MonthPlan(){const t=document.querySelector("#activity-3-month-plan-modal");jQuery(t).foundation("_disableScroll"),jQuery(t).foundation("open")}close3MonthPlan(){const t=document.querySelector("#activity-3-month-plan-modal");jQuery(t).foundation("_enableScroll"),jQuery(t).foundation("close")}openCourseExplorer(){this.loadingExploreCourse=!0;const t=document.querySelector("#course-explorer");t.querySelector(".loading-spinner").classList.add("active"),jQuery(t).foundation("open"),t.querySelector("iframe").src=this.exploreCourseUrl()}closeCourseExplorer(){const t=document.querySelector("#course-explorer");jQuery(t).foundation("close")}clearCourseExplorer(){const t=document.querySelector("#course-explorer");t.querySelector("iframe").src=""}openVideoModal(t){const{videoSrc:e,videoSrcAlt:s}=t.detail,n=document.querySelector("#video-modal");this.isVimeoAvailable?(n.querySelector("iframe").src=e,n.querySelector("video").classList.add("hidden")):(n.querySelector("iframe").classList.add("hidden"),n.querySelector("video").src=s),jQuery(n).foundation("open")}closeVideoModal(){const t=document.querySelector("#video-modal");jQuery(t).foundation("open")}stopVideoModal(){const t=document.querySelector("#video-modal");t.querySelector("iframe").src="",t.querySelector("video").src=""}handleCreated3MonthPlan(){this.dispatchEvent(new CustomEvent("user-state:change",{bubbles:!0})),this.close3MonthPlan(),this.navigate(this.makeHref(L.myPlans))}unlock3MonthPlan(){const t={type:"training",subtype:"26_heard"};this.unlockedSection.push(t),F.post("log",t).then(e=>{this.dispatchEvent(new CustomEvent("user-state:change",{bubbles:!0})),this.dispatchEvent(new CustomEvent("user-host:change",{bubbles:!0}))})}refetchState(){this.getCtas(),F.get("user_stage",{}).then(t=>{(!t||!t.state)&&console.error("Stage or state data not returned from api"),jsObject.user_stage=t,this.userState=t.state})}refetchHost(){F.get("user_host",{}).then(t=>{t||console.error("Host not returned from api"),jsObject.host_progress=t})}getCtas(){F.post("user_ctas",{user_id:this.userId,language:jsObject.language}).then(t=>{const e=Object.values(t);let s=e,n=[];if(this.unlockedSection.length>0){const u=this.unlockedSection.map(y=>y.type+"_"+y.subtype);s=e.filter(y=>!y.required_keys.some(j=>u.includes(j))),n=e.filter(y=>y.required_keys.some(j=>u.includes(j)))}this.allCtas=s;const a=u=>{for(let y=u.length-1;y>0;y--){const j=Math.floor(Math.random()*(y+1));[u[y],u[j]]=[u[j],u[y]]}return u},r=this.allCtas.filter(({content_template:u})=>u==="celebration"),o=this.allCtas.filter(({content_template:u})=>u!=="celebration"),h=[...r,...a(o)];if(this.allCtas=h,jsObject.allCtas=this.allCtas,this.dispatchEvent(new CustomEvent("ctas:changed",{bubbles:!0})),n.length>0){const u=n.map(y=>{const j=y.disable_keys.length>0?y.disable_keys[0]:"";if(!j)return Promise.resolve();const E=j.substring(0,j.indexOf("_")),O=j.substr(j.indexOf("_")+1);return F.post("log",{type:E,subtype:O})});Promise.all(u).finally(()=>{this.dispatchEvent(new CustomEvent("ctas:changed",{bubbles:!0}))})}})}showCelebrationModal(){if(this.showingCelebrationModal)return;const t=this.renderRoot.querySelector("dash-cta"),e=this.allCtas.filter(({content_template:s})=>s==="celebration");if(!t&&e.length>0){this.showingCelebrationModal=!0,e.forEach(({content:{title:a,description:r}})=>{this.celebrationModalContent.title=r,this.celebrationModalContent.content.push(a)}),this.requestUpdate();const s=document.querySelector("#celebration-modal");jQuery(s).foundation("open"),e.forEach(({type:a,subtype:r})=>{F.post("log",{type:a,subtype:r}).then(()=>{this.dispatchEvent(new CustomEvent("ctas:changed",{bubbles:!0}))})});const n=e.map(({key:a})=>a);this.allCtas=jsObject.allCtas.filter(({key:a})=>!n.includes(a)),jsObject.allCtas=this.allCtas}}openProfile(){const t=new URL(window.location.href);t.searchParams.set("profile","true"),window.history.pushState({profile:!0},null,t.toString()),this.openProfileModal()}closeProfile(){this.closeProfilePushState(),this.closeProfileModal()}closeProfilePushState(){const t=new URL(window.location.href);t.searchParams.delete("profile"),window.history.pushState({profile:!1},null,t.toString())}openProfileModal(){const t=document.querySelector("#profile-modal");jQuery(t).foundation("open")}closeProfileModal(){const t=document.querySelector("#profile-modal");jQuery(t).foundation("close")}openCommunityWizard(t){t.preventDefault(),this.openWizard(A.joinCommunity)}hasJoinedCommunity(){return!!this.userState.join_community}openJoinTrainingWizard(t){t.preventDefault(),this.openWizard(A.joinATraining)}numberOfGroups(){return Object.keys(this.trainingGroups).length}toggleTrainingGroups(){jQuery(this.renderRoot).foundation(),jQuery("#training-menu").foundation("toggle",jQuery("#training-groups-menu")),this.trainingGroupsOpen=jQuery("#training-groups-menu").hasClass("is-active")}toggleInactiveTrainingGroups(){jQuery(this.renderRoot).foundation(),jQuery("#training-menu").foundation("toggle",jQuery("#inactive-training-groups-menu"))}redirectToPage(t){const{type:e}=t.detail;e===A.getACoach&&this.navigate(this.makeHref(L.myCoach)),[A.makeAGroup,A.makeFirstGroup,A.joinATraining,A.joinFriendsPlan,A.planDecision,A.joinDecision].includes(e)&&F.get("plans",{}).then(s=>{const n={...this.trainingGroups},a=Object.keys(n);this.trainingGroups=s,jsObject.training_groups=s;const r=Object.keys(this.trainingGroups).filter(o=>!a.includes(o));if(r.length===1){const o=this.trainingGroups[r[0]],h=this.makeTrainingHref(o.join_key);this.navigate(h)}})}updateTrainingGroups(){F.get("plans").then(t=>{this.trainingGroups=t,this.updateSortedTrainingGroups()})}updateSortedTrainingGroups(){this.sortedTrainingGroups=Object.entries(this.trainingGroups).map(([t,e])=>({...e,trainingGroupId:t})),this.sortedTrainingGroups.sort((t,e)=>e.timestamp-t.timestamp),this.activeTrainingGroups=this.sortedTrainingGroups.filter(({status:t})=>t==="active"),this.inactiveTrainingGroups=this.sortedTrainingGroups.filter(({status:t})=>t==="inactive"),jsObject.active_training_groups=this.activeTrainingGroups,jsObject.inactive_training_groups=this.inactiveTrainingGroups}isParentSectionActive(t){let e=W.getRoute(this.route);return this.route===L.myTrainings&&(e=W.getRoute(L.training)),this.route==="root"&&(e=W.rootRoute),e.name===t||e.parent===t}isChildRouteActive(t){return t===this.route}isTrainingRouteActive(t){return t===this.params.code}exploreCourseUrl(){const t=new URL(jsObject.urls.launch_ten_session_course_1);return t.searchParams.set("training","true"),t.searchParams.set("iframe","true"),t.searchParams.set("slide","s1_1_2"),t.toString()}renderTrainingGroupLink(t){return l`
            <li>
                <nav-link
                    class="menu-btn"
                    ?active=${this.isTrainingRouteActive(t.join_key)}
                    as="nav"
                    text=${t.title}
                    href=${this.makeTrainingHref(t.join_key)}
                ></nav-link>
            </li>
        `}render(){return l`
            <div
                class="sidebar__trigger-close-background"
                @click=${this.toggleSidebar}
            ></div>
            <div class="dashboard">
                <div class="dashboard__sidebar">
                    <div
                        class="sidebar-wrapper"
                        style="top: ${this.menuOffset}px; height: calc( min( 100%, 100vh ) - ${this.menuOffset}px );"
                    >
                        <button
                            class="close-btn ms-auto dashboard__sidebar-toggle break-large break-medium"
                            aria-label=${jsObject.translations.close}
                            type="button"
                            @click=${this.toggleSidebar}
                        >
                            <span class="icon z-icon-close"></span>
                        </button>
                        <div class="profile-area">
                            <button
                                class="profile-btn"
                                @click=${this.openProfile}
                            >
                                <div>${this.createInitials(this.userProfile.name)}</div>
                            </button>
                            <span class="profile-name"
                                >${this.userProfile.name}</span
                            >
                        </div>
                        <div class="stack-2 | progress-menu">
                            <ul
                                class="accordion-menu"
                                data-accordion-menu
                                data-submenu-toggle="true"
                            >
                                <li class="menu-section" data-no-toggle ?data-active=${this.isParentSectionActive(L.gettingStarted)}>
                                    <nav-link
                                        href=${this.makeHref(L.gettingStarted)}
                                        class="menu-section__title menu-btn"
                                        icon="z-icon-start"
                                        text=${jsObject.translations.getting_started}
                                        as="nav"
                                    >
                                    </nav-link>
                                    ${this.isGettingStartedActive()?l`
                                            <progress-circle
                                                percent=${this.getGettingStartedPercentage()}
                                                radius="12"
                                            ></progress-circle>
                                        `:l`<span
                                            class="z-icon-check-mark success f-2"
                                        ></span>`}
                                    <ul
                                        class="nested ${this.isGettingStartedActive()?"is-active":""}"
                                    >
                                        ${W.childRoutesOf(L.gettingStarted).map(t=>l`
                                                <li>
                                                    <nav-link
                                                        class="menu-btn"
                                                        href=${this.makeHrefRoute(t.name)}
                                                        ?active=${this.isChildRouteActive(t.name)}
                                                        icon=${t.icon}
                                                        text=${t.translation}
                                                        as=${t.type==="handled-link"?"button":"navs"}
                                                        @click=${t.type==="handled-link"?e=>{if(!t.data.neverDisabled&&W.getCompletedStatus(t.name,this.userState)){e.preventDefault();return}t.clickHandler(e,this.dispatchEvent)}:null}
                                                        ?completed=${W.getCompletedStatus(t.name,this.userState)}
                                                    ></nav-link>
                                                    <span
                                                        class="icon z-icon-check-mark success"
                                                    ></span>
                                                </li>
                                            `)}
                                    </ul>
                                </li>
                            </ul>
                            <div class="menu-section" ?data-active=${this.isParentSectionActive(L.training)}>
                                <nav-link
                                    href=${this.makeHref(L.training)}
                                    class="menu-section__title menu-btn"
                                    icon="z-icon-training"
                                    text=${jsObject.translations.training}
                                    as="nav"
                                >
                                </nav-link>
                                <ul
                                    id="training-menu"
                                    class="nested accordion-menu menu vertical"
                                    data-accordion-menu
                                >
                                    ${W.childRoutesOf(L.training).map(t=>{const e=W.getLockedStatus(t.name,this.userState),s=W.getCompletedStatus(t.name,this.userState),n=t.type==="handled-link";return t.name===L.myTraining&&this.numberOfGroups()>1?l`
                                                <li>
                                                    <nav-link
                                                        class="menu-btn"
                                                        icon=${t.icon}
                                                        ?active=${this.isChildRouteActive(L.myTrainings)||!this.trainingGroupsOpen&&this.isChildRouteActive(L.myTraining)}
                                                        text=${jsObject.translations.my_trainings}
                                                        as="nav"
                                                        href=${this.makeHref("my-trainings")}
                                                    ></nav-link>
                                                    <button
                                                        class="d-flex justify-content-center | training-groups__toggle"
                                                        @click=${this.toggleTrainingGroups}
                                                    >
                                                        <img
                                                            class="svg w-1rem h-1rem"
                                                            src=${jsObject.images_url+"/chevron.svg"}
                                                        />
                                                    </button>
                                                    <ul
                                                        id="training-groups-menu"
                                                        class="menu vertical nested"
                                                    >
                                                        <li>${jsObject.translations.active}</li>
                                                        ${wt(this.activeTrainingGroups,a=>a.trainingGroupId,this.renderTrainingGroupLink)}
                                                        ${this.inactiveTrainingGroups.length>0?l`
                                                            <li>
                                                              ${jsObject.translations.inactive}
                                                              <button
                                                                  class="d-flex justify-content-center | training-groups__toggle"
                                                                  @click=${this.toggleInactiveTrainingGroups}
                                                              >
                                                                  <img
                                                                      class="svg w-1rem h-1rem"
                                                                      src=${jsObject.images_url+"/chevron.svg"}
                                                                  />
                                                              </button>
                                                              <ul
                                                                  id="inactive-training-groups-menu"
                                                                  class="menu vertical nested"
                                                              >
                                                                  ${wt(this.inactiveTrainingGroups,a=>a.trainingGroupId,this.renderTrainingGroupLink)}
                                                              </ul>
                                                            </li>
                                                        `:""}
                                                    </ul>
                                                </li>
                                            `:l`
                                            <li>
                                                <nav-link
                                                    class="menu-btn"
                                                    href=${this.makeHrefRoute(t.name)}
                                                    ?active=${this.isChildRouteActive(t.name)}
                                                    icon=${t.icon}
                                                    text=${t.translation}
                                                    ?locked=${e}
                                                    as=${n?"link":"nav"}
                                                    @click=${n?a=>{if(s){a.preventDefault();return}t.clickHandler(a,this.dispatchEvent)}:null}
                                                    ?completed=${s}
                                                ></nav-link>
                                                <span
                                                    class="icon ${e?"z-icon-locked gray-500":"z-icon-check-mark success"}"
                                                ></span>
                                            </li>
                                        `})}
                                </ul>
                            </div>
                            <li class="menu-section" ?data-active=${this.isParentSectionActive(L.practicing)}>
                                <nav-link
                                    href=${this.makeHref(L.practicing)}
                                    class="menu-section__title menu-btn"
                                    icon="z-icon-practicing"
                                    text=${jsObject.translations.practicing}
                                    as="nav"
                                ></nav-link>
                                <ul class="nested">
                                    ${W.childRoutesOf(L.practicing).map(t=>l`
                                            <li>
                                                <nav-link
                                                    class="menu-btn"
                                                    href=${this.makeHrefRoute(t.name)}
                                                    ?active=${this.isChildRouteActive(t.name)}
                                                    icon=${t.icon}
                                                    text=${t.translation}
                                                    ?locked=${W.getLockedStatus(t.name,this.userState)}
                                                    as="nav"
                                                ></nav-link>
                                                <span
                                                    class="icon z-icon-locked gray-500"
                                                ></span>
                                            </li>
                                        `)}
                                </ul>
                            </li>
                        </div>
                        <div class="footer-links">

                            <!-- <nav-link
                                class="menu-btn | f--1"
                                href=""
                                icon="z-icon-public-training"
                                text=${jsObject.translations.join_training_group}
                                as="link"
                                @click=${this.openJoinTrainingWizard}
                            ></nav-link> -->

                            ${this.hasJoinedCommunity()?"":l`
                                    <nav-link
                                        class="menu-btn | f--1"
                                        href=""
                                        icon="z-icon-community"
                                        text=${this.hasJoinedCommunity()?jsObject.translations.community:jsObject.translations.join_the_community}
                                        as="link"
                                        @click=${this.openCommunityWizard}
                                    ></nav-link>
                                `}

                            ${jsObject.is_coach?l`
                                    <nav-link
                                        class="menu-btn | f--1"
                                        href="/coaching"
                                        icon="z-icon-coach"
                                        text="${jsObject.translations.coaching_portal}"
                                    ></nav-link>
                                    `:""}
                        </div>
                    </div>
                </div>

                ${this.renderRoute()}
            </div>
            <div
                class="stack | reveal tiny card celebration showing | border-none"
                id="celebration-modal"
                data-reveal
                data-initial-top
            >
                <button
                    class="ms-auto close-btn"
                    data-close
                    aria-label=${jsObject.translations.close}
                    type="button"
                    @click=${this.closeProfile}
                >
                    <span class="icon z-icon-close"></span>
                </button>
                <h2 class="h5 text-center bold">
                    ${this.celebrationModalContent.title}
                </h2>
                <div class="d-flex align-items-center justify-content-between">
                    <img
                        class="w-30"
                        src="${jsObject.images_url+"/fireworks-2.svg"}"
                        alt=""
                    />
                    <img
                        class="w-40"
                        src="${jsObject.images_url+"/thumbs-up.svg"}"
                        alt=""
                    />
                    <img
                        class="w-30"
                        src="${jsObject.images_url+"/fireworks-2.svg"}"
                        alt=""
                    />
                </div>
                <div class="stack--3">
                    ${this.celebrationModalContent.content.map(t=>l`
                            <p>
                                <span class="icon z-icon-check-mark"></span>
                                ${t}
                            </p>
                        `)}
                </div>
            </div>
            <div class="reveal full" id="profile-modal" data-reveal>
                <button
                    class="ms-auto close-btn"
                    data-close
                    aria-label=${jsObject.translations.close}
                    type="button"
                    @click=${this.closeProfile}
                >
                    <span class="icon z-icon-close"></span>
                </button>
                <div class="container-xsm my-0">
                    <h3>${jsObject.translations.edit_profile}</h3>
                    <profile-form
                        .userProfile=${this.userProfile}
                    ></profile-form>
                </div>
            </div>
            <div class="reveal full" id="wizard-modal" data-reveal>
                <zume-wizard
                    type=${this.wizardType}
                    .params=${this.wizardParams||{}}
                    .user=${this.userProfile}
                    .translations=${jsObject.wizard_translations}
                    noUrlChange
                ></zume-wizard>
            </div>
            <div class="reveal full" id="course-explorer" data-reveal>
                <button
                    class="ms-auto close-btn"
                    data-close
                    aria-label=${jsObject.translations.close}
                    type="button"
                    @click=${this.closeCourseExplorer}
                >
                    <span class="icon z-icon-close"></span>
                </button>
                <div class="stack container">
                    <h2 class="text-center brand-light">${jsObject.translations.explore_course}</h2>
                    <div class="switcher gap-0 ">
                        <div>
                            <h3>${jsObject.translations.needed_for_course}</h3>
                            <ul class="bullets">
                                <li>${jsObject.translations.at_least_3_people}</li>
                                <li>${jsObject.translations.twenty_hour_commitment}</li>
                                <li>${jsObject.translations.a_facilitator}</li>
                            </ul>
                        </div>
                        <div>
                            <h3>${jsObject.translations.not_needed_for_course}</h3>
                            <ul class="bullets">
                                <li>${jsObject.translations.more_experience_than_group}</li>
                                <li>${jsObject.translations.special_permission_to_run_group}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="course-explorer__wrapper cover">
                        <div class="center"><span class="loading-spinner"></span></div>
                        <iframe width="100%" height="100%" src=${this.exploreCourseUrl()} frameborder="0"></iframe>
                    </div>
                    <div class="center">
                        <launch-course
                            position="top"
                        ></launch-course>
                    </div>
                </div>
            </div>

            <div class="reveal full" id="video-modal" data-reveal>
                <button
                    class="ms-auto close-btn"
                    data-close
                    aria-label=${jsObject.translations.close}
                    type="button"
                    @click=${this.closeVideoModal}
                >
                    <span class="icon z-icon-close"></span>
                </button>
                <div class="video-player responsive-embed widescreen m0">
                    <iframe width="640" height="360" frameborder="0"></iframe>
                    <video controls autoplay></video>
                </div>
            </div>
            <div
                class="reveal full"
                id="activity-3-month-plan-modal"
                data-reveal
            >
                <button
                    class="ms-auto close-btn"
                    data-close
                    aria-label=${jsObject.translations.close}
                    type="button"
                    @click=${this.closeWizard}
                >
                    <span class="icon z-icon-close"></span>
                </button>
                ${W.getLockedStatus("3-month-plan",this.userState)?l`
                        <div class="container-sm">
                            <div class="dash-menu__list-item">
                                <div class="dash-menu__icon-area | stack--5">
                                    <span
                                        class="icon z-icon-progress dash-menu__list-icon"
                                    ></span>
                                </div>
                                <div
                                    class="dash-menu__text-area | switcher | switcher-width-20"
                                >
                                    <div>
                                        <h3 class="f-1 bold uppercase">
                                            ${jsObject.translations.locked_3_month_plan}
                                        </h3>
                                        <p>
                                            ${jsObject.translations.locked_3_month_plan_explanation}
                                        </p>
                                    </div>
                                    <button
                                        class="dash-menu__view-button btn tight"
                                        @click=${this.unlock3MonthPlan}
                                    >
                                        ${jsObject.translations.unlock}
                                    </button>
                                </div>
                            </div>
                        </div>
                    `:l`
                        <activity-3-month-plan
                            .questions=${jsObject.three_month_plan_questions}
                            .translations=${jsObject.three_month_plan_translations}
                            user_id=${this.userProfile.user_id}
                            contact_id=${this.userProfile.contact_id}
                            @3-month-plan-saved=${this.handleCreated3MonthPlan}
                            @3-month-plan-cancelled=${this.close3MonthPlan}
                            showCancel
                        ></activity-3-month-plan>
                    `}
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-board",W);class ue extends B{constructor(){super();const e=document.querySelector("html").dataset.dir;this.isRtl=e==="rtl"}firstUpdated(){this.attachResizeObeserver(),this.updateHeaderStyle(),window.scrollTo({top:0,behavior:"instant"})}attachResizeObeserver(){const t=document.querySelector("dash-header-right"),e=new ResizeObserver(s=>{for(let n of s){if(!n.contentRect)return;const a=Math.round(n.contentRect.height),r=Math.round(n.contentRect.width);this.updateHeaderStyle(!1,a,r)}});this.resizeObserver=e,e.observe(t)}updateHeaderStyle(t=!0,e=0,s=window.innerWidth){const n=document.querySelector(".dashboard__header.left");t&&(this.initialOffset=n.offsetTop);let a;s<window.innerWidth/2?a=this.initialOffset:a=this.initialOffset+e,n.style.top=a+"px"}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver&&this.resizeObserver.disconnect()}}class c1 extends ue{constructor(){var e;super();X(this,"lng");X(this,"lat");X(this,"level");X(this,"locationLabel");X(this,"mode");this.showTeaser=!1,this.route=W.getRoute("my-churches"),this.churches=[...(e=jsObject.churches)!==null&&e!==void 0?e:[]],this.orderedChurches=[],this.sortedChurches=[],this.filteredChurches=[],this.orderChurches(),this.locationLabel="",this.formErrors=!1,this.errorMessage="",this.renderChurch=this.renderChurch.bind(this),this.addChurch=this.addChurch.bind(this),this.addChildChurch=this.addChildChurch.bind(this),this.editChurch=this.editChurch.bind(this),this.handleSubmit=this.handleSubmit.bind(this),this.orderChurches=this.orderChurches.bind(this),this.deleteChurch=this.deleteChurch.bind(this),this.addMarkerToMap=this.addMarkerToMap.bind(this),this.getDescendentChurches=this.getDescendentChurches.bind(this),this.openEditChurchModal=this.openEditChurchModal.bind(this),this.openAddChurchModal=this.openAddChurchModal.bind(this),this.openChurchModal=this.openChurchModal.bind(this),this.clearChurchModal=this.clearChurchModal.bind(this),document.querySelectorAll(".reveal-overlay #new-church-form").forEach(s=>{s.parentElement.remove()}),mapboxgl.accessToken=jsObject.map_key}static get properties(){return{showTeaser:{type:Boolean},orderedChurches:{type:Array,attribute:!1},filteredChurches:{type:Array,attribute:!1},formErrors:{type:Boolean,attribute:!1},loading:{type:Boolean,attribute:!1},errorMessage:{type:String,attribute:!1},confirmDelete:{type:Number,attribute:!1},mode:{type:String,attribute:!1}}}firstUpdated(){super.firstUpdated(),document.querySelector("#add-church-form").addEventListener("submit",this.handleSubmit),jQuery("#new-church-form").on("closed.zf.reveal",this.clearChurchModal),this.initialiseChurchEventHandlers()}updated(){jQuery(this.renderRoot).foundation()}initialiseChurchEventHandlers(){this.renderRoot.querySelectorAll(".dropdown-pane").forEach(s=>{jQuery(s).on("hide.zf.dropdown",()=>{this.confirmDelete=""})})}initialiseMap(){let e,s;this.lng?(e=[this.lng,this.lat],s=5):(e=[-20,30],s=1),this.map=new mapboxgl.Map({container:"map-edit",style:"mapbox://styles/mapbox/light-v10",center:e,zoom:s}),this.map.on("click",(function(r){let o=r.lngLat.lng,h=r.lngLat.lat;this.lng=o,this.lat=h,this.active_marker&&this.active_marker.remove(),this.addMarkerToMap(r.lngLat),this.locationLabel="",this.updateLocationLabelInForm()}).bind(this));const n=new MapboxGeocoder({accessToken:mapboxgl.accessToken,types:"country region district locality neighborhood address place",mapboxgl});this.map.addControl(n,"top-left"),n.on("result",(function(r){this.active_marker&&this.active_marker.remove(),this.addMarkerToMap(r.result.center),n._removeMarker(),this.lng=r.result.center[0],this.lat=r.result.center[1],this.level=r.result.place_type[0],this.locationLabel=r.result.place_name,this.updateLocationLabelInForm()}).bind(this));let a=new mapboxgl.GeolocateControl({positionOptions:{enableHighAccuracy:!0},marker:{color:"orange"},trackUserLocation:!1,showUserLocation:!1});this.map.addControl(a,"top-left"),a.on("geolocate",(function(r){this.active_marker&&this.active_marker.remove();let o=r.coords.latitude,h=r.coords.longitude;this.lat=o,this.lng=h,this.addMarkerToMap({lng:h,lat:o}),this.locationLabel="",this.updateLocationLabelInForm()}).bind(this))}addMarkerToMap(e){let s,n;Array.isArray(e)?(n=e[0],s=e[1]):(s=e.lat,n=e.lng);const a=[n,s];this.active_marker=new mapboxgl.Marker().setLngLat(a).addTo(this.map)}updateLocationLabelInForm(e){document.getElementById("location-label").textContent=this.locationLabel||""}joinCommunity(){this.dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:A.joinCommunity}}))}orderChurches(){this.orderedChurches=[],this.sortedChurches=[...this.churches.sort((s,n)=>s.name.toLowerCase()<n.name.toLowerCase()?-1:1)],this.filteredChurches=[...this.sortedChurches];const e=this.churches.filter(s=>!s.parent);for(const s of e)this.processChurch(s.id,0);this.orderedChurches=[...this.orderedChurches]}processChurch(e,s){const n=s+1,a=this.getChurch(e);if(!a){console.log(e,"not found");return}a.generation=n,this.orderedChurches.push(a),a.children.forEach(r=>{this.processChurch(r,n)})}isLeafChurch(e){const s=this.getChurch(e);return s?s.children.length===0:!1}getChurch(e){return this.churches.find(n=>n.id===e)}handleSubmit(e){e.preventDefault(),this.mode==="add"?this.addChurch():this.editChurch(this.churchId)}addChurch(){this.postChurch(e=>{this.churches=[e,...this.churches].map(s=>e.parent&&s.id===e.parent?{...s,children:[...s.children,e.id]}:s),this.orderChurches(),this.closeChurchModal()})}postChurch(e){if(this.loading=!0,this.formErrors=!1,document.querySelector("#add-church-form .loading-spinner").classList.add("active"),!this.lat||!this.lng||!this.churchName||!this.startDate||!this.churchMembers){this.formErrors=!0,document.querySelector("#add-church-form .loading-spinner").classList.remove("active");return}const s={name:this.churchName,member_count:this.churchMembers,start_date:this.startDate,location_grid_meta:{values:[],force_values:!0}};this.parentChurch&&(s.parent_church=this.parentChurch);const n={lng:this.lng,lat:this.lat,source:"user"};this.level&&this.locationLabel&&(n.level=this.level,n.label=this.locationLabel),this.mode==="edit"&&this.churchId&&(s.post_id=this.churchId),s.location_grid_meta.values.push(n),(this.mode==="add"?F.post:F.put)("church",s).then(r=>{e(r)}).catch(r=>{console.error(r),this.showErrorMessage()}).finally(()=>{this.loading=!1,document.querySelector("#add-church-form .loading-spinner").classList.remove("active")})}showErrorMessage(e){this.errorMessage=e||jsObject.translations.error;const s=document.querySelector(".church-warning-banner");s.textContent=this.errorMessage,s.dataset.state="",setTimeout(()=>{this.errorMessage="",s.textContent="",s.dataset.state="empty"},3e3)}editChurch(){this.postChurch(e=>{this.churches=this.churches.map(s=>s.id===e.id?e:e.parent&&s.id===e.parent&&!s.children.includes(e.id)?{...s,children:[...s.children,e.id]}:s.id!==e.parent&&s.children.includes(e.id)||!e.parent&&s.children.includes(e.id)?{...s,children:s.children.filter(n=>n!==e.id)}:s),this.orderChurches(),this.closeChurchModal()})}activateChurch(e){this.closeKebabMenu(e),F.put(`church/${e}/activate`).then(()=>{this.churches=this.churches.map(s=>s.id===e?{...s,status:"active"}:s),this.orderChurches()}).catch(console.error)}deactivateChurch(e){this.closeKebabMenu(e),F.put(`church/${e}/deactivate`).then(()=>{this.churches=this.churches.map(s=>s.id===e?{...s,status:"inactive"}:s),this.orderChurches()}).catch(console.error)}confirmDeleteChurch(e){this.confirmDelete=e}deleteChurch(e){const s=this.churches.find(o=>o.id===e),n=this.churches.findIndex(o=>o.id===e),a=[];let r;this.churches=this.churches.filter(o=>o.id!==e).map(o=>o.parent===e?(a.push(o.id),{...o,parent:null}):o.children.includes(e)?(r=o.id,{...o,children:o.children.filter(h=>h!==e)}):o),this.orderChurches(),F.delete("church",{church_id:e}).then(o=>{}).catch(o=>{console.error(o),this.showErrorMessage(),this.churches=[...this.churches.slice(0,n),s,...this.churches.slice(n)].map(h=>a.includes(h.id)?{...h,parent:e}:r===h.id?{...h,children:[...h.children,e]}:h),this.orderChurches()})}getDescendentChurches(e){const s=[e],n=a=>{const r=this.getChurch(a);for(const o of r.children)s.push(o),n(o)};return n(e),s}addChildChurch(e){this.parentChurch=e,this.openAddChurchModal(e)}openAddChurchModal(){this.mode="add",document.querySelector(".submit-button-text").textContent=jsObject.translations.add_new_church,this.filteredChurches=[...this.orderedChurches],this.openChurchModal()}openEditChurchModal(e){this.mode="edit",document.querySelector(".submit-button-text").textContent=jsObject.translations.save;const s=this.churches.find(a=>a.id===e);this.churchId=e,this.churchName=s.name,this.churchMembers=s.member_count,this.startDate=s.start_date.formatted,this.lat=s.location_meta.lat,this.lng=s.location_meta.lng,this.locationLabel=s.location_meta.label,this.level=s.location_meta.level,this.parentChurch=s.parent;const n=this.getDescendentChurches(e);this.filteredChurches=[...this.orderedChurches.filter(a=>!n.includes(a.id))],this.openChurchModal()}openChurchModal(){if(this.showTeaser)return;const e=document.querySelector("#new-church-form");jQuery(e).foundation("open"),document.getElementById("church-name").value=this.churchName||"",document.getElementById("church-start-date").value=this.startDate||"",document.getElementById("number-of-people").value=this.churchMembers||"",document.getElementById("parent-church").value=`${this.parentChurch}`||"",this.updateLocationLabelInForm(),this.initialiseMap(),this.lat&&this.addMarkerToMap({lat:this.lat,lng:this.lng})}closeChurchModal(){const e=document.querySelector("#new-church-form");jQuery(e).foundation("close"),this.clearChurchModal()}clearChurchModal(){jQuery("#add-church-form input").each(function(e){this.value=""}),document.querySelector("#add-church-form select").value="",this.churchName="",this.churchMembers="",this.locationLabel="",this.startDate="",this.lat=void 0,this.lng=void 0,this.parentChurch=void 0}closeKebabMenu(e){const s=this.renderRoot.querySelector(`#kebab-menu-${e}`);s||console.log("kebab menu not found",e),jQuery(s).foundation("close")}renderChurchOption({id:e,name:s}){return l`
            <option value=${e}>${s}</option>
        `}renderChurch({id:e,name:s,location:n,generation:a,status:r}){const o=this.confirmDelete===e;return l`
            <li
                class="list__item ${r==="inactive"?"bg-gray-300":""}"
                data-depth=${a-1}
                style=${`--depth: ${a-1}`}
            >
                <div class="list__primary f-medium" data-large-gap>
                    <div class="stack--3">
                        <span>${s}</span>
                        ${r==="inactive"?l`
                                <span class="f--1">(${jsObject.translations.inactive})</span>
                            `:""}
                    </div>
                    <span>${n}</span>
                </div>
                <div class="list__secondary">
                    <button class="icon-btn" data-toggle="kebab-menu-${e}">
                        <span class="icon z-icon-kebab brand-light"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${e}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li class="${o?"hidden":""}">
                            <button class="menu-btn" @click=${()=>this.addChildChurch(e)}><span class="icon z-icon-plus"></span>${jsObject.translations.add_new_church}</button>
                        </li>
                        <li class="${o?"hidden":""}">
                            <button class="menu-btn" @click=${()=>this.openEditChurchModal(e)}><span class="icon z-icon-pencil"></span>${jsObject.translations.edit}</button>
                        </li>
                        ${r==="active"?l`
                                <li class="${o?"hidden":""}">
                                    <button class="menu-btn red" @click=${()=>this.deactivateChurch(e)}><span class="icon z-icon-trash"></span>${jsObject.translations.mark_inactive}</button>
                                </li>
                            `:l`
                                <li class="${o?"hidden":""}">
                                    <button class="menu-btn red" @click=${()=>this.activateChurch(e)}><span class="icon z-icon-trash"></span>${jsObject.translations.mark_active}</button>
                                </li>
                            `}
                        <li class="${!o&&this.isLeafChurch(e)?"":"hidden"}">
                            <button class="menu-btn red" @click=${()=>this.confirmDeleteChurch(e)}><span class="icon z-icon-trash"></span>${jsObject.translations.delete}</button>
                        </li>
                        <li class="${o?"":"hidden"} stack">
                            <p class="bold f-1">${jsObject.translations.delete}?</p>
                            <div class="cluster">
                                <button class="btn outline tight" @click=${()=>this.closeKebabMenu(e)}>
                                    ${jsObject.translations.no}
                                </button>
                                <button class="btn tight red" @click=${()=>this.deleteChurch(e)}>
                                    ${jsObject.translations.yes}
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
        `}render(){return l`
            <div class="dashboard__content" data-no-secondary-area>
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <div>
                            <dash-sidebar-toggle></dash-sidebar-toggle>
                            <span class="icon ${this.route.icon}"></span>
                            <h1 class="h3">${this.route.translation}</h1>
                        </div>
                        <div class="s0">
                            <button class="icon-btn f-2" @click=${this.openAddChurchModal} ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser?"true":"false"}>
                                <span class="visually-hidden">${jsObject.translations.add_church}</span>
                                <span class="icon z-icon-plus" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                </div>
                <dash-header-right></dash-header-right>

                <div class="dashboard__main content position-relative">
                    ${this.showTeaser?l`
                            <div class="p-2">
                                <div class="dash-menu__list-item">
                                    <div class="dash-menu__icon-area | stack--5">
                                        <span class="icon z-icon-locked dash-menu__list-icon"></span>
                                    </div>
                                    <div class="dash-menu__text-area | switcher | switcher-width-20">
                                        <div>
                                            <h3 class="f-1 bold uppercase">${jsObject.translations.my_churches_locked}</h3>
                                            <p>${jsObject.translations.my_churches_locked_explanation}</p>
                                            <p>${jsObject.translations.my_churches_locked_extra_explanation}</p>
                                        </div>
                                        <!-- This needs to change to open the join community wizard instead -->
                                        <button class="dash-menu__view-button btn tight" @click=${this.joinCommunity}>
                                            ${jsObject.translations.join_the_community}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `:l`
                            <ul class="list">
                                ${this.orderedChurches.length===0?l`
                                        <li
                                            role="button"
                                            class="list__item bg-brand-light white f-medium"
                                            data-depth=${0}
                                            @click=${this.openAddChurchModal}
                                        >
                                            ${jsObject.translations.add_first_church}
                                        </li>
                                    `:wt(this.orderedChurches,e=>`${e.id}`,this.renderChurch)}
                            </ul>

                        `}


                </div>

            </div>
            <div class="reveal medium" id="new-church-form" data-reveal data-v-offset="20">
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.clearChurchModal}>
                        <span class="icon z-icon-close"></span>
                </button>
                <div class="stack">
                    <h2>${jsObject.translations.my_churches}</h2>
                    <div class="warning banner church-warning-banner" data-state='empty'></div>
                    <div id="add-church-form" class="stack">
                        <div class="form-group">
                            <label for="church-name">${jsObject.translations.church_name}*</label>
                            <input class="input" id="church-name" name="church-name" type="text" @change=${e=>this.churchName=e.target.value}/>
                            ${this.formErrors&&!this.churchName?l`
                                    <span class="input-error">${jsObject.translations.missing_field}</span>
                                `:""}
                        </div>
                        <div class="form-group">
                            <label for="church-start-date">${jsObject.translations.start_date}*</label>
                            <input class="input" id="church-start-date" name="church-start-date" type="date" @change=${e=>this.startDate=e.target.value} />
                            ${this.formErrors&&!this.startDate?l`
                                    <span class="input-error">${jsObject.translations.missing_field}</span>
                                `:""}
                        </div>
                        <div class="form-group">
                            <label for="number-of-people">${jsObject.translations.number_of_people}*</label>
                            <input class="input" id="number-of-people" name="number-of-people" type="number" @change=${e=>this.churchMembers=e.target.value} />
                            ${this.formErrors&&!this.churchMembers?l`
                                    <span class="input-error">${jsObject.translations.missing_field}</span>
                                `:""}
                        </div>
                        <div class="form-group">
                            <label for="church-location">${jsObject.translations.church_location}*</label>
                            <span id="location-label"></span>
                            ${this.formErrors&&!this.lat?l`
                                    <span class="input-error">${jsObject.translations.missing_field}</span>
                                `:""}
                            <div id="map-wrapper-edit" style="height: 300px">
                                <div id='map-edit' style="height: 300px"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="parent-church">${jsObject.translations.parent_church}</label>
                            <select id="parent-church" name="parent-church" @change=${e=>this.parentChurch=e.target.value} >
                                <option value="">---</option>
                                ${wt(this.filteredChurches,({id:e})=>e,this.renderChurchOption)}
                            </select>
                        </div>
                        <div class="cluster">
                            <button class="btn outline" type="button" ?disabled=${this.loading} aria-disabled=${this.loading?"true":"false"} @click=${this.closeChurchModal}>${jsObject.translations.cancel}</button>
                            <button class="btn" @click=${this.handleSubmit}>
                                <span class="submit-button-text">${jsObject.translations.add_new_church}</span>
                                <span class="loading-spinner"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-churches",c1);class h1 extends ue{static get properties(){return{showTeaser:{type:Boolean},coaches:{type:Array,attribute:!1},error:{type:String,attribute:!1},success:{type:String,attribute:!1},loading:{type:Boolean,attribute:!1}}}constructor(){var t,e;super(),this.coaches=Object.values(jsObject.profile.coaches)||[],this.error="",this.success="",this.loading=!1;const s=Number(((t=jsObject.user_stage)===null||t===void 0||(t=t.state)===null||t===void 0?void 0:t.requested_a_coach_date)*1e3||Date.now());this.timeSinceRequestInDays=Math.floor((Date.now()-s)/(1e3*60*60*24)),this.hoursSinceLastContactedCoach=Math.floor((Date.now()-((e=jsObject.profile.last_contacted_coach*1e3)!==null&&e!==void 0?e:Date.now()))/(1e3*60*60));const n=24;this.hoursLeftToMessage=n-this.hoursSinceLastContactedCoach,this.allowMessage=this.hoursLeftToMessage<0}getACoach(){this.dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:A.getACoach}}))}updateProfile(){this.dispatchEvent(new CustomEvent("open-profile",{bubbles:!0}))}handleMessageInput(t){this.message=t.target.value,this.error=""}sendMessage(){this.loading=!0,this.error="",F.post("/connect/message-coach",{message:this.message}).then(()=>{this.success=jsObject.translations.success_sending_message,setTimeout(()=>{this.success=""},3e3)}).catch(t=>{this.error=jsObject.translations.error_sending_message}).finally(()=>{this.loading=!1})}render(){return console.log(this.coaches),l`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <dash-sidebar-toggle></dash-sidebar-toggle>
                    <h1 class="h3">${jsObject.translations.my_coach}</h1>
                </div>
                <dash-header-right></dash-header-right>

              <div class="dashboard__main content p-2">
                  ${this.showTeaser?l`
                          <div class="dash-menu__list-item">
                            <div class="dash-menu__icon-area | stack--5">
                              <span class="icon z-icon-locked dash-menu__list-icon"></span>
                            </div>
                            <div class="dash-menu__text-area | switcher | switcher-width-20">
                              <div>
                                <h3 class="f-1 bold uppercase">${jsObject.translations.get_a_coach}</h3>
                                <p>${jsObject.translations.get_a_coach_explanation}</p>
                              </div>
                              <button class="dash-menu__view-button btn tight" @click=${this.getACoach}>
                                ${jsObject.translations.get_a_coach}
                              </button>
                            </div>
                          </div>
                      `:""}
                  ${!this.showTeaser&&this.coaches.length===0?l`
                          <div class="stack-2">
                              <div class="stack--1">
                                <p>
                                  ${jsObject.translations.connecting_with_coach}
                                </p>
                                <p>
                                  ${jsObject.translations.wait_for_coach}
                                </p>
                                <ul>
                                  <li>
                                    <strong>${jsObject.translations.phone}:</strong> ${jsObject.profile.phone}
                                  </li>
                                  <li>
                                    <strong>${jsObject.translations.communications_email}:</strong> ${jsObject.profile.communications_email}
                                  </li>
                                </ul>
                                <p>
                                  ${jsObject.translations.confirm_phone_and_email}
                                </p>
                                <button class="btn center" @click=${this.updateProfile}>
                                  ${jsObject.translations.change_preferences}
                                </button>
                              </div>
                              ${this.timeSinceRequestInDays>14?l`
                                    <div class="stack--1 center">
                                        <h3 class="h4 brand-light">${jsObject.translations.apology_for_delay}</h3>
                                        <p>
                                          ${jsObject.translations.message_explanation}
                                        </p>
                                        <textarea
                                            placeholder="${jsObject.translations.message}"
                                            rows="3"
                                            @input=${this.handleMessageInput}
                                        ></textarea>
                                        <button
                                          class="btn ${this.allowMessage?"":"disabled"}"
                                          @click=${this.sendMessage}
                                          ?disabled=${!this.allowMessage}
                                        >
                                          ${jsObject.translations.send_message}
                                        </button>
                                        ${this.allowMessage?"":l`
                                            <span>${jsObject.translations.message_again.replace("%d",this.hoursLeftToMessage)}</span>
                                          `}
                                        <span class="loading-spinner ${this.loading?"active":""}"></span>
                                        <div class="banner warning" data-state=${this.error.length?"":"empty"}>
                                          ${this.error}
                                        </div>
                                        <div class="banner success" data-state=${this.success.length?"":"empty"}>
                                          ${this.success}
                                        </div>
                                    </div>
                                `:""}
                          </div>
                      `:""}
                  ${!this.showTeaser&&this.coaches.length>0?l`
                        <div class="grid grid-min-18rem">
                          ${this.coaches.map(t=>l`
                                  <div class="card stack | mw-50ch">
                                    <h3>${t.name}</h3>
                                    <div class="center">
                                        <img class="profile-image" src="${t.picture}" alt="${t.name}" />
                                    </div>
                                    <ul class="stack">
                                      ${t.email?l`
                                          <li>${jsObject.translations.email}: <a href="mailto:${t.email}">${t.email}</a></li>
                                        `:""}
                                      ${t.phone?l`
                                          <li>${jsObject.translations.phone}: ${t.phone}</li>
                                        `:""}
                                      ${t.communication_apps.map(e=>"")}
                                    </ul>
                                  </div>
                              `)}
                        </div>
                      `:""}
                </div>

                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-coach",h1);const Bt=class Bt extends le(B){static get properties(){return{ctas:{type:Array,attribute:!1}}}constructor(){super(),this.allCtas=[],this.ctas=[],this.celebrations=[],this.hiddenCtaKeys=[],this.initialCtaKeys=[],this.removedCtaKeys=[],this.celebrationsLogged=[],this.manageCtas=this.manageCtas.bind(this),this.transitionIn=this.transitionIn.bind(this),this.transitionCtas=this.transitionCtas.bind(this),this.renderCta=this.renderCta.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("ctas:changed",this.manageCtas),this.addEventListener("begin-cta-transitions",this.transitionIn),this.addEventListener("cta-transition-in-ended",this.logCelebrationsSeen)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("ctas:changed",this.manageCtas),this.removeEventListener("begin-cta-transitions",this.transitionIn),this.removeEventListener("cta-transition-in-ended",this.logCelebrationsSeen)}firstUpdated(){this.manageCtas()}updated(){this.dispatchEventAfterUpdated&&(this.dispatchEventAfterUpdated=!1,setTimeout(()=>{this.dispatchEvent(new CustomEvent("begin-cta-transitions"))},10))}manageCtas(){const t=this.getCtas(),[e,s,n]=this.diffCtas(t,this.ctas),a=[...e,...s].filter(({content_template:y})=>y==="celebration"),r=[...e,...s].filter(({content_template:y})=>y!=="celebration"),o=[...a,...r],h=this.getCtaKeys(o),u=this.getCtaKeys(n);this.ctas=o,this.celebrations=a,this.hiddenCtaKeys=this.getCtaKeys(e),this.removedCtaKeys=[...u,...h.slice(Bt.MAX_CTAS)],this.initialCtaKeys=h.slice(0,Bt.MAX_CTAS),this.ctas.length>0&&(this.dispatchEventAfterUpdated=!0)}getCtas(){var t;return(t=jsObject.allCtas)!==null&&t!==void 0?t:[]}diffCtas(t,e){const s=t.filter(({key:r})=>e.findIndex(({key:o})=>o===r)===-1),n=e.filter(({key:r})=>t.findIndex(({key:o})=>o===r)===-1),a=e.filter(({key:r})=>t.findIndex(({key:o})=>o===r)>-1);return[s,a,n]}transitionIn(){this.transitionCtas(this.removedCtaKeys,this.initialCtaKeys),setTimeout(()=>{this.dispatchEvent(new CustomEvent("cta-transition-in-ended"))},Bt.TRANSITION_TIMEOUT)}logCelebrationsSeen(){this.celebrations.forEach(({type:e,subtype:s})=>{this.celebrationsLogged.includes(e+s)||(F.post("log",{type:e,subtype:s,log_once:!0}),this.celebrationsLogged.push(e+s))});const t=this.getCtaKeys(this.celebrations);jsObject.allCtas=jsObject.allCtas.filter(({key:e})=>!t.includes(e))}transitionCtas(t,e){(t.length>0?this.getCtaElements(t):[]).forEach(a=>{a&&(a.style.height=a.clientHeight+"px",setTimeout(()=>{a.classList.add("transition-out"),a.style.height=""},10))}),(e.length>0?this.getCtaElements(e):[]).forEach(a=>{a&&(a.classList.remove("hiding"),a.classList.add("showing"))})}getCtaElements(t){return this.renderRoot.querySelectorAll(t.map(e=>`[data-key="${e}"]`).join(","))}getCtaKeys(t){return t.map(({key:e})=>e)}isWizardLink(t){return t.includes("/wizard/")}openWizard(t){const e=t.split("/"),s=e[e.length-1];dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:s}}))}openModal(t){const e=t.split("/"),s=e[e.length-1];this.dispatchEvent(new CustomEvent(s,{bubbles:!0}))}openVideoModal(t,e){this.dispatchEvent(new CustomEvent("open-video-modal",{bubbles:!0,detail:{videoSrc:t,videoSrcAlt:e}}))}renderLink(t,e=""){return this.isWizardLink(t.link)?l`
                <button class="btn" @click=${()=>this.openWizard(t.link)}>${t.link_text}</button>
            `:t.link.includes("modal/")?l`
                <button class="btn" @click=${()=>this.openModal(t.link)}>${t.link_text}</button>
            `:t.link.includes("/dashboard/")?l`
                <a class="btn" @click=${s=>{s.preventDefault(),this.navigate(t.link)}}>${t.link_text}</a>
            `:e==="video"?l`
                <button class="btn" @click=${()=>this.openVideoModal(t.link,t.link_alt)}>${t.link_text}</button>
            `:l`
            <a href="${t.link}" class="btn">${t.link_text}</a>
        `}renderCta({content:t,content_template:e,key:s}){const n=this.hiddenCtaKeys.includes(s)?"hiding":"showing";if(e==="card")return l`
                <div class="stack | card cta ${n}" data-key=${s} style="--duration: ${Bt.TRANSITION_TIMEOUT}ms">
                    <h2 class="h5 text-center">${t.title}</h2>
                    <p>${t.description}</p>
                    ${this.renderLink(t)}
                </div>
            `;if(e==="celebration")return l`
                <div class="stack | card celebration ${n}" data-key=${s} style="--duration: ${Bt.TRANSITION_TIMEOUT}ms">
                    <h2 class="h5 text-center bold">${t.title}</h2>
                    <div class="d-flex align-items-center justify-content-between">
                        <img src="${jsObject.images_url+"/fireworks-2.svg"}" alt="" />
                        <img src="${t.image_url}" alt="" />
                        <img src="${jsObject.images_url+"/fireworks-2.svg"}" alt="" />
                    </div>
                    <p>${t.description}</p>
                </div>
            `;if(e==="video")return l`
                <div class="stack | card cta ${n}" data-key=${s} style="--duration: ${Bt.TRANSITION_TIMEOUT}ms">
                    <h2 class="h5 text-center">${t.title}</h2>
                    ${this.renderLink(t,e)}
                </div>
            `}render(){return l`
            <div class="stack-margin-bottom">
                ${wt(this.ctas,t=>t.key,this.renderCta)}
            </div>
        `}createRenderRoot(){return this}};X(Bt,"FADE_TIMEOUT",3e3),X(Bt,"TRANSITION_TIMEOUT",500),X(Bt,"MAX_CTAS",3);let Fi=Bt;customElements.define("dash-cta",Fi);class ai extends ue{static get properties(){return{view:{type:String,attribute:!1},userState:{type:Object,attribute:!1}}}constructor(t){super(),this.routeName=t,this.route=W.getRoute(this.routeName),this.routes=W.childRoutesOf(this.routeName),this.view="list",this.userState=jsObject.user_stage.state,this.refetchState=this.refetchState.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("user-state:change",this.refetchState)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("user-state:change",this.refetchState)}switchView(t="list"){this.view=t}refetchState(){F.get("user_stage",{}).then(t=>{(!t||!t.state)&&console.error("Stage or state data not returned from api"),jsObject.user_stage=t,this.userState=t.state})}renderLinks(t){return l`
            <div class="${this.view==="grid"?"nav-grid":"stack"}">
                ${this.routes.map(e=>{let s=e.pattern;const n=Object.keys(jsObject.training_groups);e.name===L.myTraining&&(n.length===0?s=e.pattern.replace(":code","teaser"):n.length>0&&(s=W.getRoute(L.myTrainings).pattern));let a=e.translation;return Object.keys(jsObject.training_groups).length>1&&e.name===L.myTraining&&(a=jsObject.translations.my_trainings),this.view==="grid"?l`
                                <grid-link
                                    href=${s}
                                    text=${a}
                                    icon=${e.icon}
                                    ?disableNavigate=${e.type==="handled-link"}
                                    as=${e.type==="handled-link"?"link":"nav"}
                                    @click=${e.type==="handled-link"?r=>{!e.data.neverDisabled&&W.getCompletedStatus(e.name,t)||e.clickHandler(r,this.dispatchEvent)}:null}
                                    ?completed=${W.getCompletedStatus(e.name,t)}
                                    ?locked=${W.getLockedStatus(e.name,t)}
                                >
                                </grid-link>
                            `:l`
                               <list-link
                                    href=${s}
                                    text=${a}
                                    explanation=${e.explanation}
                                    icon=${e.icon}
                                    ?disableNavigate=${e.type==="handled-link"}
                                    as=${e.type==="handled-link"?"button":"nav"}
                                    @click=${e.type==="handled-link"?r=>{!e.data.neverDisabled&&W.getCompletedStatus(e.name,t)||e.clickHandler(r,this.dispatchEvent)}:null}
                                    ?completed=${W.getCompletedStatus(e.name,t)}
                                    ?locked=${W.getLockedStatus(e.name,t)}
                                >
                                </list-link>
                            `})}
            </div>
        `}render(){return l`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <dash-sidebar-toggle></dash-sidebar-toggle>
                        <span class="icon ${this.route.icon}"></span>
                        <h1 class="h3">${this.route.translation}</h1>
                    </div>
                    <div class="icon-btn-group">
                        <button class="${this.view==="list"?"selected":""}" title=${jsObject.translations.list} @click=${()=>this.switchView("list")}>
                            <span class="icon z-icon-list" aria-hidden="true"></span>
                        </button>
                        <button class="${this.view==="grid"?"selected":""}" title=${jsObject.translations.grid} @click=${()=>this.switchView("grid")}>
                            <span class="icon z-icon-grid" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main p-1">
                    ${this.renderLinks(this.userState)}
                </div>
                <div class="dashboard__secondary">
                    ${this.routeName==="getting-started"?"":l`<dash-cta></dash-cta>`}
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-top-level",ai);class u1 extends ai{constructor(){super("getting-started")}createRenderRoot(){return this}}customElements.define("dash-getting-started",u1);class p1 extends ue{static get properties(){return{showTeaser:{type:Boolean},scriptUrl:{type:String,attribute:!1},loading:{type:Boolean,attribute:!1}}}constructor(){super(),this.showTeaser=!1,this.scriptUrl=""}connectedCallback(){super.connectedCallback(),this.openModal=this.openModal.bind(this),this.handleLoad=this.handleLoad.bind(this)}firstUpdated(){jQuery(this.renderRoot).foundation(),document.querySelector("#map-iframe").addEventListener("load",this.handleLoad)}joinCommunity(){this.dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:A.joinCommunity}}))}openModal(t){const e=this.scriptUrl;t==="hundred-hour-map"?this.scriptUrl="/zume_app/last100_hours?show-exit-button":t==="vision-map"?this.scriptUrl="/zume_app/heatmap_trainees?show-exit-button":t==="church-map"?this.scriptUrl="/zume_app/heatmap_churches?show-exit-button":this.scriptUrl="",e!==this.scriptUrl&&(this.loading=!0);const s=document.querySelector("#map-modal");jQuery(s).foundation("open")}handleLoad(){this.loading=!1,this.attachExitButtonEventHandler()}attachExitButtonEventHandler(){const e=document.querySelector("#map-iframe").contentDocument.querySelector("#exit-btn");e==null||e.addEventListener("click",s=>{this.closeModal()})}closeModal(){const t=document.querySelector("#map-modal");jQuery(t).foundation("close")}render(){return l`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <dash-sidebar-toggle></dash-sidebar-toggle>
                    <h1 class="h3">${jsObject.translations.my_maps}</h1>
                </div>
                <dash-header-right></dash-header-right>

                <div class="dashboard__main content p-2">
                    ${this.showTeaser?l`
                              <div class="dash-menu__list-item">
                                  <div class="dash-menu__icon-area | stack--5">
                                      <span
                                          class="icon z-icon-locked dash-menu__list-icon"
                                      ></span>
                                  </div>
                                  <div
                                      class="dash-menu__text-area | switcher | switcher-width-20"
                                  >
                                      <div>
                                          <h3 class="f-1 bold uppercase">
                                              ${jsObject.translations.my_maps_locked}
                                          </h3>
                                          <p>
                                              ${jsObject.translations.my_maps_explanation}
                                          </p>
                                      </div>
                                      <button
                                          class="dash-menu__view-button btn tight"
                                          @click=${this.joinCommunity}
                                      >
                                          ${jsObject.translations.join_the_community}
                                      </button>
                                  </div>
                              </div>
                          `:l`
                              <div class="stack" data-full-width>
                                  <list-link
                                    data-map="local-map"
                                    href="/map/local"
                                    as="link"
                                    target-blank
                                    icon="z-icon-maps"
                                    text=${jsObject.translations.local_map}
                                    explanation=${jsObject.translations.local_map_explanation}
                                    ?noRenderText=${!0}
                                  ></list-link>
                                  <list-link
                                      @click=${()=>this.openModal("vision-map")}
                                      icon="z-icon-training"
                                      text=${jsObject.translations.training_vision_map}
                                      explanation=${jsObject.translations.training_vision_map_explanation}
                                      ?noRenderText=${!0}
                                      as="button"
                                  >
                                  </list-link>
                                  <list-link
                                      @click=${()=>this.openModal("church-map")}
                                      icon="z-icon-churches"
                                      text=${jsObject.translations.simple_church_planting_map}
                                      explanation=${jsObject.translations.simple_church_planting_map_explanation}
                                      ?noRenderText=${!0}
                                      as="button"
                                  >
                                  </list-link>
                                  <list-link
                                      @click=${()=>this.openModal("hundred-hour-map")}
                                      icon="z-icon-time"
                                      text=${jsObject.translations.hundred_hour_map}
                                      explanation=${jsObject.translations.hundred_hour_map_explanation}
                                      ?noRenderText=${!0}
                                      as="button"
                                  >
                                  </list-link>
                              </div>
                          `}
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
            <div
                class="reveal full"
                style="padding: 0 !important; overflow: hidden;"
                data-reveal
                id="map-modal"
            >
                ${this.loading?l`
                          <div class="cover-page">
                              <div class="center">
                                  <span class="loading-spinner active"></span>
                              </div>
                          </div>
                      `:""}
                <iframe
                    id="map-iframe"
                    class="${this.loading?"opacity-0":""}"
                    src=${this.scriptUrl||""}
                    frameborder="0"
                    width="100%"
                    height="100%"
                >
                </iframe>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-maps",p1);class $1 extends ue{render(){return l`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <dash-sidebar-toggle></dash-sidebar-toggle>
                    <h1 class="h3">Not Found</h1>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main">
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-not-found",$1);class f1 extends ue{static get properties(){return{showTeaser:{type:Boolean},loading:{type:Boolean,attribute:!1},saving:{type:Boolean,attribute:!1},commitments:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1},editCategory:{type:String,attribute:!1},editId:{type:Number,attribute:!1}}}constructor(){super(),this.showTeaser=!1,this.loading=!0,this.saving=!1,this.route=W.getRoute("my-plans"),this.filterName="my-plans-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.commitments=[],this.editCategory="",this.renderListItem=this.renderListItem.bind(this),this.closeCommitmentsModal=this.closeCommitmentsModal.bind(this),document.querySelectorAll(".reveal-overlay #commitments-form").forEach(t=>{t.parentElement.remove()})}firstUpdated(){super.firstUpdated();const t=this.filterStatus||"";this.fetchCommitments(t)}updated(){jQuery(this.renderRoot).foundation()}fetchCommitments(){const t=this.filterStatus;F.get("commitments",{status:t}).then(e=>{this.commitments=e}).finally(()=>{this.loading=!1})}editQuestion(){return document.querySelector("#edit-question")}editAnswer(){return document.querySelector("#edit-answer")}editNote(){return document.querySelector("#edit-note")}openEditCommitmentsModal(t){this.closeMenu(t);const e=this.getCommitment(t);this.editCategory=e.category,e.category==="post_training_plan"?(this.editQuestion().value=e.question,this.editAnswer().value=e.answer):this.editNote().value=e.note,this.editId=t,this.openCommitmentsModal("edit"),e.category==="post_training_plan"?document.querySelector("#edit-answer").focus():document.querySelector("#edit-note").focus()}closeCommitmentsModal(){this.editQuestion().value="",this.editAnswer().value="",this.editNote().value="",this.editCategory="";const t=document.querySelector("#commitments-form");jQuery(t).foundation("close")}handleOpenCommitmentsModal(t){this.openCommitmentsModal("add")}openCommitmentsModal(t="add"){if(this.showTeaser)return;this.mode=t,t==="add"&&(this.editCategory="custom");const e=document.querySelector("#commitments-form");jQuery(e).foundation("open")}handleAddedCommitments(){this.fetchCommitments(),this.closeCommitmentsModal()}getCommitment(t){return this.commitments.find(({id:e})=>e===t)}completeCommitment(t){let e={id:t,user_id:jsObject.profile.user_id};F.put("commitment",e).then(s=>{this.fetchCommitments(),this.dispatchCommitmentsChangedEvent()})}dispatchCommitmentsChangedEvent(){this.dispatchEvent(new CustomEvent("commitments:change",{bubbles:!0}))}deleteCommitment(t){let e={id:t,user_id:jsObject.profile.user_id};F.delete("commitment",e).then(s=>{this.closeMenu(t),this.fetchCommitments(),this.dispatchCommitmentsChangedEvent()})}saveCommitment(t){t.preventDefault(),this.saving=!0,this.mode==="add"?this.addCommitment():this.editCommitment()}addCommitment(){const t=document.querySelector("#edit-note").value,e=new Date;e.setDate(e.getDate()+30);let s={note:t,date:e,category:"custom"};F.post("commitment",s).then(()=>{this.fetchCommitments(),this.closeCommitmentsModal()}).catch(n=>{console.log(n)}).finally(()=>{this.saving=!1})}editCommitment(){let t={id:this.editId,user_id:jsObject.profile.user_id};this.editCategory==="post_training_plan"?(t.question=this.editQuestion().value,t.answer=this.editAnswer().value):t.note=this.editNote().value,console.log(this.editCategory),this.saving=!0,F.update("commitment",t).then(e=>{this.closeCommitmentsModal(),this.fetchCommitments()}).catch(e=>{console.log(e)}).finally(()=>{this.saving=!1})}filterCommitments(t){this.filterStatus=t,this.fetchCommitments(t),ZumeStorage.save(this.filterName,t),this.closeFilter()}closeFilter(){const t=this.querySelector("#filter-menu");jQuery(t).foundation("close")}closeMenu(t){const e=this.querySelector(`#kebab-menu-${t}`);jQuery(e).foundation("close")}open3MonthPlan(){this.dispatchEvent(new CustomEvent("open-3-month-plan",{bubbles:!0}))}renderListItem(t){const{note:e,question:s,answer:n,id:a,status:r,category:o}=t;return l`
            <li class="list__item | switcher | switcher-width-30">
                ${o==="custom"?l`<span>${e}</span>`:l`<span>${s} <b>${n}</b></span>`}
                <div class="list__secondary | grow-0">
                    <div class="d-flex w-6rem justify-content-center">
                        ${r==="closed"?l`<span class="icon z-icon-check-mark success"></span>`:l`
                                <button
                                    class="btn tight break-anywhere"
                                    @click=${()=>this.completeCommitment(a)}
                                >
                                    ${jsObject.translations.done}
                                </button>
                            `}
                    </div>
                    <button class="icon-btn" data-toggle="kebab-menu-${a}">
                        <span class="icon z-icon-kebab brand-light"></span>
                    </button>
                </div>
                <div
                    class="dropdown-pane"
                    id="kebab-menu-${a}"
                    data-dropdown
                    data-auto-focus="true"
                    data-position="bottom"
                    data-alignment=${this.isRtl?"right":"left"}
                    data-close-on-click="true"
                    data-close-on-click-inside="true"
                >
                    <ul>
                        <li><button class="menu-btn" @click=${()=>this.openEditCommitmentsModal(a)}><span class="icon z-icon-pencil"></span>${jsObject.translations.edit}</button></li>
                        <li><button class="menu-btn red" @click=${()=>this.deleteCommitment(a)}><span class="icon z-icon-trash"></span>${jsObject.translations.delete}</button></li>
                    </ul>
                </div>
            </li>

        `}render(){return l`
            <div class="dashboard__content" data-no-secondary-area>
                <dash-header-right></dash-header-right>
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <div>
                            <dash-sidebar-toggle></dash-sidebar-toggle>
                            <span class="icon ${this.route.icon}"></span>
                            <h1 class="h3">${this.route.translation}</h1>
                        </div>
                        <div class="s0">
                            <button class="icon-btn f-2 filter-btn" data-toggle="filter-menu" ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser?"true":"false"}>
                                <span class="visually-hidden">${jsObject.translations.filter}</span>
                                <span class="icon z-icon-filter" aria-hidden="true"></span>
                                ${this.filterStatus&&this.filterStatus!=="all"?l`
                                        <span class="filter-dot"></span>
                                    `:""}
                            </button>
                            <button class="icon-btn f-2" @click=${this.handleOpenCommitmentsModal} ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser?"true":"false"}>
                                <span class="visually-hidden">${jsObject.translations.add_commitments}</span>
                                <span class="icon z-icon-plus" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                        <ul>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus==="open"?"selected":""}" @click=${()=>this.filterCommitments("open")}>
                                    <span class="icon z-icon-sort-todo" aria-hidden="true"></span>
                                    ${jsObject.translations.active}
                                </button>
                            </li>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus==="closed"?"selected":""}" @click=${()=>this.filterCommitments("closed")}>
                                    <span class="icon z-icon-sort-done" aria-hidden="true"></span>
                                    ${jsObject.translations.completed}
                                </button>
                            </li>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus==="all"?"selected":""}" @click=${()=>this.filterCommitments("all")}>
                                    <span class="icon z-icon-sort-all" aria-hidden="true"></span>
                                    ${jsObject.translations.all}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="dashboard__main content">
                    ${this.showTeaser?l`
                            <div class="p-2">
                                <div class="dash-menu__list-item">
                                    <div class="dash-menu__icon-area | stack--5">
                                        <span class="icon z-icon-locked dash-menu__list-icon"></span>
                                    </div>
                                    <div class="dash-menu__text-area | switcher | switcher-width-20">
                                        <div>
                                            <h3 class="f-1 bold uppercase">${jsObject.translations.my_plans_locked}</h3>
                                            <p>${jsObject.translations.my_plans_locked_explanation}</p>
                                        </div>
                                        <button class="dash-menu__view-button btn tight" @click=${this.open3MonthPlan}>
                                            ${jsObject.translations.create_3_month_plan}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            `:l`
                                <ul class="list">
                                    ${!this.loading&&this.commitments&&this.commitments.length>0?wt(this.commitments,t=>t.id,this.renderListItem):""}
                                </ul>
                            `}
                </div>
            </div>
            <div class="reveal small" id="commitments-form" data-reveal data-v-offset="20">
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.closeCommitmentsModal}>
                        <span class="icon z-icon-close"></span>
                </button>
                <form @submit=${this.saveCommitment} class="stack">
                    <div class="form-group ${this.editCategory==="post_training_plan"?"":"hidden"}">
                        <label for="edit-question">${jsObject.three_month_plan_translations.question}</label>
                        <textarea
                            class="input"
                            id="edit-question"
                            name="edit-question"
                            type="text"
                            rows="3"
                            placeholder=${jsObject.three_month_plan_translations.question}
                            disabled
                        ></textarea>
                    </div>
                    <div class="form-group ${this.editCategory==="post_training_plan"?"":"hidden"}">
                        <label for="edit-answer">${jsObject.three_month_plan_translations.answer}</label>
                        <textarea
                            class="input"
                            id="edit-answer"
                            name="edit-answer"
                            type="text"
                            placeholder=${jsObject.three_month_plan_translations.answer}
                            ?required=${this.editCategory==="post_training_plan"}
                        ></textarea>
                    </div>
                    <div class="form-group ${this.editCategory==="post_training_plan"?"hidden":""}">
                        <label for="edit-note">${jsObject.three_month_plan_translations.note}</label>
                        <textarea
                            class="input"
                            id="edit-note"
                            name="edit-note"
                            type="text"
                            rows="3"
                            placeholder=${jsObject.three_month_plan_translations.note}
                            ?required=${this.editCategory!=="post_training_plan"}
                        ></textarea>
                    </div>

                    <div class="cluster justify-flex-end">
                        <button type="button" class="btn outline tight" type="button" @click=${this.closeCommitmentsModal}>${jsObject.three_month_plan_translations.cancel}</button>
                        <button type="submit" class="btn tight" type="button" ?disabled=${this.saving}>
                            ${jsObject.three_month_plan_translations.save}
                            <span class="loading-spinner ${this.saving?"active":""}"></span>
                        </button>
                    </div>
                </form>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-plans",f1);class m1 extends ai{constructor(){super("practicing")}createRenderRoot(){return this}}customElements.define("dash-practicing",m1);class g1 extends ue{static get properties(){return{loading:{type:Boolean,attribute:!1},filteredItems:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1},hostProgress:{type:Object,attribute:!1},errorMessage:{type:String,attribute:!1},openStates:{type:Object,attribute:!1}}}constructor(){super(),this.loading=!1,this.route=W.getRoute("my-progress"),this.trainingItems=Object.values(jsObject.training_items),this.hostProgress=jsObject.host_progress,this.errorMessage="",this.filterName="my-progress-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.filteredItems=this.filterItems(this.filterStatus),this.openStates={},this.trainingItems.forEach(t=>{this.openStates[t.key]=!1}),this.renderListItem=this.renderListItem.bind(this),this.closeInfoModal=this.closeInfoModal.bind(this),document.querySelectorAll(".reveal-overlay #progress-modal").forEach(t=>{t.parentElement.remove()})}disconnectedCallback(){super.disconnectedCallback(),ke(this.tagName)}firstUpdated(){super.firstUpdated(),Tt(this.renderRoot,this.tagName)}updated(){jQuery(this.renderRoot).foundation(),Tt(this.renderRoot,this.tagName)}openInfoModal(){const t=document.querySelector("#progress-modal");jQuery(t).foundation("open")}closeInfoModal(){const t=document.querySelector("#progress-modal");jQuery(t).foundation("close")}filterProgress(t){this.filterStatus=t,this.filteredItems=this.filterItems(t),ZumeStorage.save(this.filterName,t),this.closeFilter()}filterItems(t){switch(t){case"heard":return this.trainingItems.filter(e=>{const s=e.host[0].key;return!!(this.hostProgress.list[s]||!1)});case"not-heard":return this.trainingItems.filter(e=>{const s=e.host[0].key;return!(this.hostProgress.list[s]||!1)});default:return[...this.trainingItems]}}closeFilter(){const t=this.querySelector("#filter-menu");jQuery(t).foundation("close")}toggleHost(t){const{host:e,additionalHostToCredit:s}=t.detail;t.stopImmediatePropagation();const{type:n,subtype:a,key:r}=e,o=this.hostProgress.list[r];if(o===!1)return this.changeHost(r,!0),s.forEach(({key:h})=>this.changeHost(h,!0)),F.post("host",{type:n,subtype:a,user_id:jsObject.profile.user_id}).then(h=>{}).catch(h=>{this.changeHost(r,!1),s.forEach(({key:u})=>this.changeHost(u,!1)),this.displayError(jsObject.translations.error_with_request)});if(o===!0)return this.changeHost(r,!1),F.delete("host",{type:n,subtype:a,user_id:jsObject.profile.user_id}).catch(h=>{this.changeHost(r,!1),this.displayError(jsObject.translations.error_with_request)})}displayError(t){this.errorMessage=t,setTimeout(()=>{this.errorMessage=""},4e3)}changeHost(t,e){const s={...this.hostProgress};s.list={...this.hostProgress.list},s.list[t]=e,this.hostProgress={...s},jsObject.host_progress={...this.hostProgress}}toggleDetails(t){this.openStates[t]===!1?this.openStates={...this.openStates,[t]:!0}:this.openStates={...this.openStates,[t]:!1}}renderListItem(t){const{title:e,description:s,host:n,slug:a,key:r}=t;let o=[jsObject.site_url,jsObject.language,a].join("/");return jsObject.language==="en"&&(o=[jsObject.site_url,a].join("/")),l`
            <li class=" list__item tight" role="button" data-no-flex>
                <div class="switcher | switcher-width-30">
                    <div>
                        <h2 class="h5 bold m0">${e}</h2>
                    </div>
                    <div class="list__secondary">
                        <host-progress-bar
                            .host=${n}
                            .hostProgressList=${this.hostProgress.list}
                            @host:toggle=${this.toggleHost}
                        ></host-progress-bar>
                        <button
                            class="icon-btn"
                            aria-label=${jsObject.translations.show_details}
                            aria-pressed=${this.openStates[r]?"true":"false"}
                            @click=${()=>this.toggleDetails(r)}
                        >
                            <img
                                class="chevron | svg w-1rem h-1rem ${this.openStates[r]?"rotate-180":""}"
                                src=${jsObject.images_url+"/chevron.svg"}
                            />
                        </button>
                    </div>
                </div>
                <div class="list__tertiary zume-collapse" id="details-${r}" ?data-expand=${this.openStates[r]}>
                    <div class="stack--2 mt--2">
                        <p class="f--1 gray-700">${s}</p>
                        <div class="cluster">
                            <share-links url=${o} title=${e} .t=${jsObject.share_translations}></share-links>

                            ${jsObject.has_pieces_pages?l`
                                    <a class="btn" href=${o} @click=${h=>h.stopImmediatePropagation()}>${jsObject.translations.view}</a>
                                `:""}
                        </div>
                    </div>
                </div>
            </li>
        `}render(){var t,e,s,n;return l`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <dash-sidebar-toggle></dash-sidebar-toggle>
                        <span class="icon ${this.route.icon}"></span>
                        <h1 class="h3">${this.route.translation}</h1>
                        <div class="s0">
                            <button class="icon-btn f-2 filter-btn" data-toggle="filter-menu">
                                <span class="visually-hidden">${jsObject.translations.filter}</span>
                                <span class="icon z-icon-filter brand-light" aria-hidden="true"></span>
                                ${this.filterStatus&&this.filterStatus!=="all"?l`
                                        <span class="filter-dot"></span>
                                    `:""}
                            </button>
                            <button class="icon-btn f-2" @click=${this.openInfoModal}>
                                <span class="visually-hidden">${jsObject.translations.progress_info}</span>
                                <span class="icon z-icon-info brand-light" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                        <ul>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus==="heard"?"selected":""}" @click=${()=>this.filterProgress("heard")}>
                                    ${jsObject.translations.heard}
                                </button>
                                <button class="menu-btn w-100 ${this.filterStatus==="not-heard"?"selected":""}" @click=${()=>this.filterProgress("not-heard")}>
                                    ${jsObject.translations.not_heard}
                                </button>
                                <button class="menu-btn w-100 ${this.filterStatus==="all"?"selected":""}" @click=${()=>this.filterProgress("all")}>
                                    ${jsObject.translations.all}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main content position-relative">
                    ${l`
                            <ul class="list">
                                ${wt(this.filteredItems,a=>a.key,this.renderListItem)}
                            </ul>
                        `}

                    <div class="fixed bottom left right ${this.errorMessage.length?"p-1":""}">
                        <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
                    </div>
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
            <div class="reveal large" id="progress-modal" data-reveal data-v-offset="20">
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button">
                        <span class="icon z-icon-close"></span>
                </button>
                <div class="stack-2 host-info mx-2">
                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="heard" percent=${((t=this.hostProgress)===null||t===void 0||(t=t.percent)===null||t===void 0?void 0:t.h)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.heard}</h3>
                            <p class="italic">${jsObject.translations.heard_explanation}</p>
                        </div>
                    </div>
                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="obeyed" percent=${((e=this.hostProgress)===null||e===void 0||(e=e.percent)===null||e===void 0?void 0:e.o)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.obeyed}</h3>
                            <p class="italic">${jsObject.translations.obeyed_explanation}</p>
                        </div>
                    </div>
                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="shared" percent=${((s=this.hostProgress)===null||s===void 0||(s=s.percent)===null||s===void 0?void 0:s.s)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.shared}</h3>
                            <p class="italic">${jsObject.translations.shared_explanation}</p>
                        </div>
                    </div>

                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="trained" percent=${((n=this.hostProgress)===null||n===void 0||(n=n.percent)===null||n===void 0?void 0:n.t)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.trained}</h3>
                            <p class="italic">${jsObject.translations.trained_explanation}</p>
                        </div>
                    </div>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-progress",g1);class b1 extends ai{constructor(){super(L.training)}createRenderRoot(){return this}}customElements.define("dash-training",b1);class v1 extends le(ue){static get properties(){return{showTeaser:{type:Boolean},code:{type:String},userProfile:{type:Object},loading:{type:Boolean,attribute:!1},error:{type:String,attribute:!1},training:{type:Object,attribute:!1},sessions:{type:Array,attribute:!1},sessionToEdit:{type:Object,attribute:!1},groupMemberToView:{type:Object,attribute:!1},openDetailStates:{type:Object,attribute:!1},filterStatus:{type:String,attribute:!1},filteredItems:{type:Array,attribute:!1},isEditingTitle:{type:Boolean,attribute:!1},isSavingTitle:{type:Boolean,attribute:!1},isSavingSession:{type:Boolean,attribute:!1},groupMembersOpen:{type:Boolean,attribute:!1},groupDetailsOpen:{type:Boolean,attribute:!1},groupCommunicationOpen:{type:Boolean,attribute:!1},coachingToolsOpen:{type:Boolean,attribute:!1},copyFeedback:{type:Object,attribute:!1},privacyPolicyOpen:{type:Boolean,attribute:!1},isPrivate:{type:Boolean,attribute:!1},showPublicGroupWarning:{type:Boolean,attribute:!1},isConfirmDelete:{type:Boolean,attribute:!1}}}constructor(){super(),this.showTeaser=!1,this.userProfile={},this.loading=!1,this.isEditingTitle=!1,this.error="",this.route=W.getRoute(L.myTraining),this.sessionToEdit={},this.groupMemberToView={},this.openDetailStates={},this.filteredItems=[],this.groupMembersOpen=!1,this.groupDetailsOpen=!1,this.groupCommunicationOpen=!1,this.filterName="my-trainings-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.copyFeedback={emails:"",phones:"",code:""},this.privacyPolicyOpen=!1,this.renderListItem=this.renderListItem.bind(this),this.renderMemberItem=this.renderMemberItem.bind(this),this.renderTrainingItem=this.renderTrainingItem.bind(this),this.isPrivate=!1,this.showPublicGroupWarning=!1,this.isConfirmDelete=!1}connectedCallback(){super.connectedCallback(),this.code!=="teaser"&&this.getTraining(),document.querySelectorAll(".reveal-overlay #edit-session-modal").forEach(t=>{t.parentElement.remove()}),document.querySelectorAll(".reveal-overlay #edit-session-details-modal").forEach(t=>{t.parentElement.remove()})}disconnectedCallback(){ke(this.tagName),super.disconnectedCallback()}willUpdate(t){t.has("code")&&this.code!=="teaser"&&(ke(this.tagName),this.openDetailStates={},this.groupCommunicationOpen=!1,this.groupDetailsOpen=!1,this.groupMembersOpen=!1,this.getTraining())}firstUpdated(){super.firstUpdated(),jQuery(this.renderRoot).foundation(),Tt(this.renderRoot,this.tagName)}updated(){jQuery(this.renderRoot).foundation(),ke(this.tagName),Tt(this.renderRoot,this.tagName);const t=jQuery("#filter-menu");t.foundation("_destroy"),new Foundation.Dropdown(t),t.css("display","")}getTraining(){return this.loading=!0,F.get(`plan/${this.code}`,{}).then(t=>{this.training=t,this.error="",this.isPrivate=this.training.visibility.key==="private"}).then(()=>{this.refreshSessions(),this.groupMembers=this.getGroupMembers()}).catch(t=>{console.log(t),this.error=t.message}).finally(()=>{this.loading=!1})}refreshSessions(t){t&&(this.training.completed_sessions=t),this.sessions=this.getSessions(),this.currentSession=this.getCurrentSession(),this.filteredItems=this.filterItems(this.filterStatus,this.sessions)}getSessions(){const t=this.getTrainingType(),e=this.getNumberOfSessions(),s=[];for(let n=1;n<e+1;n++){const a=n<10?`0${n}`:`${n}`,r=t+"_"+a,o=this.training[r];s.push({id:r,name:jsObject.translations.session_x.replace("%d",n),datetime:o?Number(o.timestamp)*1e3:0,completed:this.training.completed_sessions.includes(r)})}return s}getHighlightedDays(){return this.sessions?this.sessions.reduce((t,e)=>{if(e.datetime===0)return t;const s=M.fromMillis(e.datetime).toISODate();return t.includes(s)?t:[...t,s]},[]):[]}getGroupMembers(){if(!this.training.participants||!Array.isArray(this.training.participants))return[];const t=[];return this.training.participants.forEach(e=>{t.push({id:e.ID,name:e.post_title})}),t}getTrainingType(){return this.training.set_type.key}getSessionNumber(t){const e=this.getTrainingType()+"_";return t.slice(e.length)}getSessionUrl(t){const e=this.getTrainingType(),s=this.getSessionNumber(t);let n="";e==="set_a"&&(n=jsObject.urls.launch_ten_session_course),e==="set_b"&&(n=jsObject.urls.launch_twenty_session_course),e==="set_c"&&(n=jsObject.urls.launch_intensive_session_course);const a=new URL(n);return a.searchParams.set("session",s),a.href}getNumberOfSessions(){switch(this.getTrainingType()){case"set_a":return 10;case"set_b":return 20;case"set_c":return 5}}getSlideKey(t){const e=t.split("_");if(e.length!==3)return"";switch(e[1]){case"a":return`s1_${Number(e[2])}_1`;case"b":return`s2_${Number(e[2])}_1`;case"c":return`s3_${Number(e[2])}_1`}}getCurrentSession(){for(let t=0;t<this.sessions.length;t++){const e=this.sessions[t];if(!e.completed)return e.id}return""}createTraining(){this.dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:A.planDecision}}))}inviteFriends(){this.dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:A.inviteFriends,params:{joinKey:this.code}}}))}openProfileModal(){this.dispatchEvent(new CustomEvent("open-profile",{bubbles:!0}))}startSession(t,e){e.stopImmediatePropagation();const s=this.getSessionUrl(t);location.href=s}editSession(t,e){this.stopImmediatePropagation(e),this.closeKebabMenu(t);const s=this.sessions.find(n=>n.id===t);if(s.datetime!==0){const n=M.fromMillis(s.datetime);s.date=n.toISODate()}this.sessionToEdit=s,this.openEditSessionModal()}selectDay(t){const{date:e}=t.detail,s={...this.sessionToEdit,date:e};this.sessionToEdit=s}saveSession(t){if(this.isSavingSession)return;this.isSavingSession=!0;const{date:e}=this.sessionToEdit,s=M.fromFormat(`${e}`,"y-LL-dd");F.post("plan/edit-session",{key:this.training.join_key,session_id:this.sessionToEdit.id,session_time:s.toSeconds()}).then(n=>{this.training={...this.training,[this.sessionToEdit.id]:{timestamp:s.toSeconds(),formatted:s.toISODate()}},this.refreshSessions(),this.closeEditSessionModal()}).finally(()=>{this.isSavingSession=!1})}cancelEditingSession(){this.sessionToEdit={},this.closeEditSessionModal()}openEditSessionModal(){const t=document.querySelector("#edit-session-modal");jQuery(t).foundation("open")}closeEditSessionModal(){const t=document.querySelector("#edit-session-modal");jQuery(t).foundation("close")}editSessionDetails(t){console.log(this.training),t.stopImmediatePropagation(),document.querySelector("#location-note").value=this.training.location_note||"";const e=document.querySelector("#time-of-day-note");e&&(e.value=this.training.time_of_day_note||"");const s=document.querySelector("#time-of-day");s&&(s.value=this.training.time_of_day||""),this.isActive()?document.querySelector('#edit-session-details-modal #active[type="radio"]').checked=!0:document.querySelector('#edit-session-details-modal #inactive[type="radio"]').checked=!0,this.isCoach()&&(document.querySelector("#language-note").value=this.training.language_note||"",document.querySelector("#timezone").value=this.training.timezone||"",document.querySelector("#timezone-note").value=this.training.timezone_note||"",document.querySelector("#zoom-link-note").value=this.training.zoom_link_note||"",this.isPublic()?document.querySelector('#edit-session-details-modal #public[type="radio"]').checked=!0:document.querySelector('#edit-session-details-modal #private[type="radio"]').checked=!0),this.openEditSessionDetailsModal()}openEditSessionDetailsModal(){const t=document.querySelector("#edit-session-details-modal");jQuery(t).foundation("open")}closeEditSessionDetailsModal(){const t=document.querySelector("#edit-session-details-modal");jQuery(t).foundation("close")}saveSessionDetails(t){t.preventDefault();const e=document.querySelector("#location-note").value,s=document.querySelector("#zoom-link-note").value,n=document.querySelector("#edit-session-details-modal #active").checked?"active":"inactive",a={location_note:e,zoom_link_note:s,status:n};let r,o,h,u,y,j;if(this.isCoach()?(r=document.querySelector("#language-note").value,o=document.querySelector("#timezone").value,h=document.querySelector("#timezone-note").value,y=document.querySelector("#time-of-day").value,u=document.querySelector("#edit-session-details-modal #public").checked?"public":"private",a.language_note=r,a.timezone=o,a.timezone_note=h,a.time_of_day=y,a.visibility=u):(j=document.querySelector("#time-of-day-note").value,a.time_of_day_note=j),!this.isSavingSession){if(this.showPublicGroupWarning===!1&&this.training.visibility.key==="private"&&a.visibility==="public"){this.showPublicGroupWarning=!0;return}this.isSavingSession=!0,F.put(`plan/${this.training.join_key}`,a).then(E=>{const O={...this.training};O.location_note=e,O.time_of_day_note=j,O.time_of_day=y,O.zoom_link_note=s,O.status={key:n},this.isCoach()&&(O.language_note=r,O.timezone=o,O.timezone_note=h,O.visibility={key:u}),this.training=O}).finally(()=>{this.isSavingSession=!1,this.showPublicGroupWarning=!1,this.closeEditSessionDetailsModal(),this.dispatchEvent(new CustomEvent("training:changed",{bubbles:!0})),u==="private"&&(this.groupCommunicationOpen=!1)})}}viewGroupMember(t){this.groupMemberToView=this.training.participants.find(e=>e.ID===t),this.openGroupMembersModal()}openGroupMembersModal(){const t=document.querySelector("#group-members-modal");jQuery(t).foundation("open"),Tt(t,"privacy-policy")}closeGroupMembersModal(){const t=document.querySelector("#group-members-modal");jQuery(t).foundation("close")}openPrivacyPolicyModal(){const t=document.querySelector("#privacy-policy-modal");jQuery(t).foundation("open")}closePrivacyPolicyModal(){const t=document.querySelector("#privacy-policy-modal");jQuery(t).foundation("close")}editTitle(){this.isEditingTitle=!0}cancelEditingTitle(){this.isEditingTitle=!1}inputSaveTitle(t){t.code==="Enter"&&this.saveTitle()}saveTitle(){if(this.isSavingTitle)return;this.isSavingTitle=!0;const t=document.querySelector("#training-title-input").value;F.put(`plan/${this.training.join_key}`,{title:t}).then(e=>{this.training.title=t,this.dispatchEvent(new CustomEvent("training:changed",{bubbles:!0}))}).finally(()=>{this.isEditingTitle=!1,this.isSavingTitle=!1})}markSessionCompleted(t,e){this.stopImmediatePropagation(e),this.closeKebabMenu(t),F.post("plan/complete-session",{key:this.training.join_key,session_id:t}).then(s=>{this.refreshSessions(s)})}markSessionUncompleted(t,e){this.stopImmediatePropagation(e),this.closeKebabMenu(t),F.post("plan/complete-session",{key:this.training.join_key,session_id:t,completed:"false"}).then(s=>{this.refreshSessions(s)})}sendEmailToSubscribers(){this.isCoach()&&F.post("send_email_to_subscribers",{join_key:this.training.join_key}).then(t=>{this.training.has_emailed_notification=!0,this.training.last_emailed_notification=t.timestamp,this.update()})}isGroupLeader(){return!!(this.training&&this.training.assigned_to&&Number(this.training.assigned_to.id)===jsObject.profile.user_id)}isCoach(){return jsObject.is_coach}isCurrentUser(t){return Number(t)===jsObject.profile.user_id}isUserContactHidden(t){return this.isCurrentUser(t.user_id)?this.userProfile.hide_public_contact:t.hide_public_contact}isUserProgressHidden(t){return this.isCurrentUser(t.user_id)?this.userProfile.hide_public_progress:t.hide_public_progress}canEditTitle(){return jsObject.training_groups&&Object.keys(jsObject.training_groups).length>1}isPublic(){return this.training.visibility.key==="public"}isActive(){return this.training.status.key==="active"}toggleDetails(t){this.openDetailStates[t]?this.openDetailStates={...this.openDetailStates,[t]:!1}:this.openDetailStates={...this.openDetailStates,[t]:!0}}closeKebabMenu(t){jQuery(`#kebab-menu-${t}`).foundation("close")}toggleKebabMenu(t){t.stopImmediatePropagation();const e=t.currentTarget.dataset.toggle;jQuery(`#${e}`).foundation("toggle")}stopImmediatePropagation(t){t.stopImmediatePropagation()}filterSessions(t){this.filterStatus=t,this.filteredItems=this.filterItems(t,this.sessions),ZumeStorage.save(this.filterName,t),this.closeFilter()}filterItems(t,e){if(!this.sessions)return[];switch(t){case"completed":return e.filter(s=>s.completed);case"uncompleted":return e.filter(s=>!s.completed);default:return[...e]}}closeFilter(){const t=this.querySelector("#filter-menu");jQuery(t).foundation("close")}toggleGroupMembers(){this.groupMembersOpen=!this.groupMembersOpen}toggleGroupDetails(){this.groupDetailsOpen=!this.groupDetailsOpen}toggleGroupCommunication(){this.groupCommunicationOpen=!this.groupCommunicationOpen}toggleCoachingTools(){this.coachingToolsOpen=!this.coachingToolsOpen}togglePrivacyPolicy(){this.privacyPolicyOpen=!this.privacyPolicyOpen}makeTrainingItemHref(t,e){return this.getSessionUrl(e)+"&slide="+t.slide_key}makeGroupMembersHref(){const t={fields:[{connected_plans:[this.training.join_key]}]},e=En(t),s=[{field:"connected_plans",id:this.training.join_key,name:`Connected Plans: ${this.training.join_key}`}],n=En(s),a=new URL(jsObject.urls.coaching_contact_list);return a.searchParams.set("query",e),a.searchParams.set("labels",n),a.searchParams.set("filter_name","Custom Filter"),a.href}copyGroupEmails(){const t=this.training.participants.map(e=>e.email);le.clipboard.writeText(t.join(", ")),this.copyFeedback={...this.copyFeedback,emails:jsObject.translations.copy_info_feedback},setTimeout(()=>{this.copyFeedback={...this.copyFeedback,emails:""}},2e3)}copyGroupPhones(){const t=this.training.participants.map(e=>e.phone);le.clipboard.writeText(t.join(", ")),this.copyFeedback={...this.copyFeedback,phones:jsObject.translations.copy_info_feedback},setTimeout(()=>{this.copyFeedback={...this.copyFeedback,phones:""}},2e3)}copyCode(){le.clipboard.writeText(this.training.join_key),this.copyFeedback={...this.copyFeedback,code:jsObject.translations.copy_info_feedback},setTimeout(()=>{this.copyFeedback={...this.copyFeedback,code:""}},2e3)}leaveGroup(){F.post(`plan/${this.training.join_key}/leave`).then(t=>{this.dispatchEvent(new CustomEvent("training:changed",{bubbles:!0})),this.dispatchEvent(new CustomEvent("user-state:change",{bubbles:!0})),this.navigate(jsObject.base_url)})}deleteGroup(){F.delete(`plan/${this.training.join_key}`).then(t=>{this.dispatchEvent(new CustomEvent("training:changed",{bubbles:!0})),this.closeEditSessionDetailsModal(),this.navigate(jsObject.base_url)})}renderListItem(t){var e,s;const{id:n,name:a,datetime:r,completed:o}=t,h=this.getNumberOfSessions(),u=this.getSlideKey(n),y=(e=(s=zumeTrainingPieces[h][u])===null||s===void 0?void 0:s.pieces)!==null&&e!==void 0?e:[],j={month:"short",day:"numeric"};return M.fromMillis(r).year!==M.now().year&&(j.year="2-digit"),l`
            <li class="list__item" data-no-flex>
                <div class="switcher | switcher-width-20 gapy0">
                    <div class="list__primary">
                        ${this.currentSession===n?l`
                                  <button
                                      class="icon-btn"
                                      @click=${E=>this.startSession(n,E)}
                                      aria-label=${jsObject.translations.start_session}
                                  >
                                      <span
                                          class="icon z-icon-play brand-light"
                                      ></span>
                                  </button>
                              `:l`
                                  <span
                                      class="icon z-icon-check-mark success ${o?"":"invisible"} p--2"
                                  ></span>
                              `}
                        <span class="f-medium">${a}</span>
                    </div>

                    <div class="list__secondary" data-align-start>
                        <div
                            class="d-flex justify-content-center align-items-center gap--2"
                        >
                            <span
                                >${r>0?M.fromMillis(r).toLocaleString(j):jsObject.translations.not_scheduled}</span
                            >
                            <button
                                class="icon-btn"
                                data-toggle="kebab-menu-${n}"
                                @click=${this.toggleKebabMenu}
                            >
                                <span
                                    class="icon z-icon-kebab brand-light"
                                ></span>
                            </button>
                            <button
                                class="icon-btn"
                                aria-label=${jsObject.translations.show_details}
                                aria-pressed=${this.openDetailStates[n]?"true":"false"}
                                @click=${()=>this.toggleDetails(n)}
                            >
                                <img
                                    class="chevron | svg w-1rem h-1rem ${this.openDetailStates[n]?"rotate-180":""}"
                                    src=${jsObject.images_url+"/chevron.svg"}
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    class="list__tertiary zume-collapse"
                    ?data-expand=${this.openDetailStates[n]}
                >
                    <ul class="pt-0 ps-2" role="list" data-brand-light>
                        ${y.map(E=>l`
                                <li>
                                    <a
                                        href=${this.makeTrainingItemHref(E,n)}
                                        @click=${this.stopImmediatePropagation}
                                    >
                                        ${E.title}
                                    </a>
                                </li>
                            `)}
                    </ul>
                </div>
                <div
                    class="dropdown-pane"
                    id="kebab-menu-${n}"
                    data-dropdown
                    data-auto-focus="true"
                    data-position="bottom"
                    data-alignment=${this.isRtl?"right":"left"}
                    data-close-on-click="true"
                    data-close-on-click-inside="true"
                >
                    <ul>
                        ${this.isGroupLeader()?l`
                                  <li>
                                      <button
                                          class="menu-btn"
                                          @click=${E=>this.editSession(n,E)}
                                      >
                                          <span
                                              class="icon z-icon-pencil"
                                          ></span
                                          >${jsObject.translations.edit_time}
                                      </button>
                                  </li>
                                  <li>
                                      ${o?l`
                                      <button
                                          class="menu-btn"
                                          @click=${E=>this.markSessionUncompleted(n,E)}
                                      >
                                          <span
                                              class="icon z-icon-pencil"
                                          ></span
                                          >${jsObject.translations.mark_uncompleted}
                                      </button>
                                      `:l`<button
                                          class="menu-btn"
                                          @click=${E=>this.markSessionCompleted(n,E)}
                                      >
                                          <span
                                              class="icon z-icon-pencil"
                                          ></span
                                          >${jsObject.translations.mark_completed}
                                      </button>
                                      `}
                                  </li>
                              `:""}
                        <li>
                            <button
                                class="menu-btn"
                                @click=${E=>this.startSession(n,E)}
                            >
                                <span class="icon z-icon-play"></span>${jsObject.translations.start_session}
                            </button>
                        </li>
                    </ul>
                </div>
            </li>
        `}renderMemberItem(t){const{name:e}=t;return this.training.visibility.key==="private"||this.isCoach()?l`
                <li>
                    <button
                        class="link"
                        @click=${()=>this.viewGroupMember(t.id)}
                    >
                        ${e}
                    </button>
                </li>
            `:l` <li>${e}</li> `}renderTrainingItem(t){const{title:e,host:s}=t;return Object.keys(this.groupMemberToView).length===0?null:l`
            <li class=" list__item tight" data-no-flex>
                <div class="switcher | switcher-width-30">
                    <div>
                        <h2 class="h5 bold m0">${e}</h2>
                    </div>
                    <div class="list__secondary">
                        <host-progress-bar
                            displayOnly
                            .host=${s}
                            .hostProgressList=${this.groupMemberToView.progress.list}
                        ></host-progress-bar>
                    </div>
                </div>
            </li>
        `}renderFilterButton(){return l`
            <button class="icon-btn f-2 filter-btn" data-toggle="filter-menu">
                <span class="visually-hidden"
                    >${jsObject.translations.filter}</span
                >
                <span
                    class="icon z-icon-filter brand-light"
                    aria-hidden="true"
                ></span>
                ${this.filterStatus&&this.filterStatus!=="all"?l`
                        <span class="filter-dot"></span>
                    `:""}
            </button>
        `}render(){var t,e,s,n;return l`
            <div class="dashboard__content">
                <div class="dashboard__header left flex-wrap">
                    <div class="dashboard__title">
                        <dash-sidebar-toggle></dash-sidebar-toggle>
                        <span class="icon ${this.route.icon}"></span>
                        ${this.canEditTitle()?l`
                                    ${this.isEditingTitle?l`
                                                  <div
                                                      class="switcher switcher-width-20 gap--5"
                                                  >
                                                      <div
                                                          class="position-relative"
                                                      >
                                                          <input
                                                              class="input grow-1"
                                                              id="training-title-input"
                                                              type="text"
                                                              value=${this.training.title||""}
                                                              @keydown=${this.inputSaveTitle}
                                                          />
                                                          <div
                                                              class="absolute ${this.isRtl?"left":"right"} top bottom d-flex align-items-center mx-0"
                                                          >
                                                              <span
                                                                  class="loading-spinner ${this.isSavingTitle?"active":""}"
                                                              ></span>
                                                          </div>
                                                      </div>
                                                      <div
                                                          class="d-flex align-items-center gap--1 grow-0"
                                                      >
                                                          <button
                                                              class="btn outline grow-0 tight f--1"
                                                              @click=${this.cancelEditingTitle}
                                                              ?disabled=${this.isSavingTitle}
                                                          >
                                                              ${jsObject.translations.cancel}
                                                          </button>
                                                          <button
                                                              class="btn tight grow-0 f--1"
                                                              @click=${this.saveTitle}
                                                              ?disabled=${this.isSavingTitle}
                                                              aria-disabled=${this.isSavingTitle?"true":"false"}
                                                          >
                                                              ${jsObject.translations.save}
                                                          </button>
                                                      </div>
                                                  </div>
                                              `:l`
                                                  <div
                                                      class="d-flex align-items-center s--3"
                                                  >
                                                      <h1 class="h3">
                                                          ${(t=(e=this.training)===null||e===void 0?void 0:e.title)!==null&&t!==void 0?t:""}
                                                      </h1>
                                                      ${this.isGroupLeader()?l`
                                                                <button
                                                                    class="icon-btn f-0 brand-light"
                                                                    aria-label=${jsObject.translations.edit}
                                                                    @click=${this.editTitle}
                                                                >
                                                                    <span
                                                                        class="icon z-icon-pencil"
                                                                    ></span>
                                                                </button>
                                                            `:""}
                                                      ${this.renderFilterButton()}
                                                  </div>
                                              `}
                                </div>
                            `:l`
                                  <h1 class="h3">${this.route.translation}</h1>
                                  ${this.renderFilterButton()}
                              `}
                    </div>

                    ${this.isEditingTitle?"":l`
                              <button
                                  class="btn brand-light tight"
                                  aria-label=${jsObject.translations.create_training_group}
                                  @click=${this.createTraining}
                              >
                                  ${jsObject.translations.new}
                              </button>
                          `}
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main content">
                    ${this.loading?l`<div class="p-1">
                              <span class="loading-spinner active"></span>
                          </div>`:""}
                    ${!this.loading&&this.error?l`
                              <div class="p-1">
                                  <h3 class="f-1 bold uppercase">
                                      ${jsObject.translations.error}
                                  </h3>
                                  ${this.error==="bad-plan-code"?l`
                                            <p>
                                                ${jsObject.translations.bad_code}
                                            </p>
                                            <p>
                                                ${jsObject.translations.join_key}:
                                                ${this.code}
                                            </p>
                                        `:""}
                                  ${this.error==="not-authorized"?l`
                                            <p>
                                                ${jsObject.translations.not_authorized}
                                            </p>
                                        `:""}
                              </div>
                          `:""}
                    ${this.showTeaser&&!this.loading&&!this.error?l`
                              <div class="p-1">
                                  <div class="dash-menu__list-item">
                                      <div
                                          class="dash-menu__icon-area | stack--5"
                                      >
                                          <span
                                              class="icon z-icon-locked dash-menu__list-icon"
                                          ></span>
                                      </div>
                                      <div
                                          class="dash-menu__text-area | switcher | switcher-width-20"
                                      >
                                          <div>
                                              <h3 class="f-1 bold uppercase">
                                                  ${jsObject.translations.my_training_locked}
                                              </h3>
                                              <p>
                                                  ${jsObject.translations.plan_a_training_explanation}
                                              </p>
                                          </div>
                                          <button
                                              class="dash-menu__view-button btn tight"
                                              @click=${this.createTraining}
                                          >
                                              ${jsObject.translations.unlock}
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          `:l`
                              <ul class="list">
                                  ${!this.loading&&this.sessions&&this.sessions.length>0?wt(this.filteredItems,a=>a.id,this.renderListItem):""}
                              </ul>
                          `}
                </div>
                <div
                    class="dropdown-pane"
                    id="filter-menu"
                    data-dropdown
                    data-auto-focus="true"
                    data-position="bottom"
                    data-alignment=${this.isRtl?"right":"left"}
                    data-close-on-click="true"
                    data-close-on-click-inside="true"
                >
                    <ul>
                        <li>
                            <button
                                class="menu-btn w-100 ${this.filterStatus==="completed"?"selected":""}"
                                @click=${()=>this.filterSessions("completed")}
                            >
                                ${jsObject.translations.completed}
                            </button>
                            <button
                                class="menu-btn w-100 ${this.filterStatus==="uncompleted"?"selected":""}"
                                @click=${()=>this.filterSessions("uncompleted")}
                            >
                                ${jsObject.translations.uncompleted}
                            </button>
                            <button
                                class="menu-btn w-100 ${this.filterStatus==="all"?"selected":""}"
                                @click=${()=>this.filterSessions("all")}
                            >
                                ${jsObject.translations.all}
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="dashboard__secondary stack">
                    ${this.loading&&!this.error?l`<span class="loading-spinner active"></span>`:""}
                    ${!this.loading&&!this.error&&this.code!=="teaser"?l`
                              ${this.isPublic()&&this.isActive()?l`
                                <div class="card banner success | grow-0">
                                  <span>${jsObject.translations.public_group}</span>
                                </div>
                              `:""}
                              ${this.isActive()?"":l`
                                <div class="card banner disabled | grow-0">
                                  <span>${jsObject.translations.inactive}</span>
                                </div>
                              `}
                              <div class="card | group-members | grow-0">
                                  <button
                                      class="f-0 f-medium d-flex align-items-center justify-content-between gap--2 black"
                                      @click=${this.toggleGroupMembers}
                                  >
                                      <span
                                          class="icon z-icon-group brand-light"
                                      ></span>
                                      <span
                                          >${jsObject.translations.group_members}
                                          (${this.groupMembers.length})</span
                                      >
                                      <img
                                          class="chevron | svg w-1rem h-1rem ${this.groupMembersOpen?"rotate-180":""}"
                                          src=${jsObject.images_url+"/chevron.svg"}
                                      />
                                  </button>
                                  <div
                                      class="zume-collapse | stack | mt-0"
                                      ?data-expand=${this.groupMembersOpen}
                                  >
                                      ${!this.loading&&this.groupMembers&&this.groupMembers.length>0?l`
                                                <ol class="ps-1">
                                                    ${wt(this.groupMembers,a=>a.id,this.renderMemberItem)}
                                                </ol>
                                            `:""}
                                      <button
                                          @click=${this.openPrivacyPolicyModal}
                                          class="link f--1 center"
                                      >
                                          ${jsObject.wizard_translations.join_training.privacy_policy}
                                      </button>
                                      ${this.isGroupLeader()?"":l`
                                        <button
                                            class="btn outline f--1 red"
                                            @click=${this.leaveGroup}
                                        >
                                          ${jsObject.translations.leave}
                                            </button>
                                        `}
                                  </div>
                                  <div class="stack-1 mt-1">
                                    <button
                                        @click=${this.inviteFriends}
                                        class="btn brand tight"
                                    >
                                        ${jsObject.translations.invite_friends}
                                    </button>
                                  </div>
                              </div>
                              <div class="card | group-details | grow-0">
                                  <button
                                      class="f-0 f-medium d-flex align-items-center justify-content-between gap--2 black"
                                      @click=${this.toggleGroupDetails}
                                  >
                                      <span
                                          class="icon z-icon-overview brand-light"
                                      ></span>
                                      <span
                                          >${jsObject.translations.group_details}</span
                                      >
                                      <img
                                          class="chevron | svg w-1rem h-1rem ${this.groupDetailsOpen?"rotate-180":""}"
                                          src=${jsObject.images_url+"/chevron.svg"}
                                      />
                                  </button>
                                  <div
                                      class="zume-collapse"
                                      ?data-expand=${this.groupDetailsOpen}
                                  >
                                      <div class="stack--2 | mt-0">
                                          <p class="text-left">
                                              <span class="f-medium"
                                                  >${jsObject.translations.location}:</span
                                              >
                                              ${this.training.location_note}
                                          </p>
                                          ${this.isCoach()?l`
                                              <p class="text-left">
                                                <span class="f-medium"
                                                    >${jsObject.translations.time}:</span
                                                >
                                                ${this.training.time_of_day}
                                              </p>
                                          `:l`
                                              <p class="text-left">
                                                <span class="f-medium"
                                                    >${jsObject.translations.time}:</span
                                                >
                                                ${this.training.time_of_day_note}
                                              </p>
                                          `}
                                          ${this.training.language_note&&this.training.language_note.length?l`
                                                    <p class="text-left">
                                                        <span class="f-medium"
                                                            >${jsObject.translations.language}:</span
                                                        >
                                                        ${this.training.language_note}
                                                    </p>
                                                `:""}
                                          ${this.training.timezone_note&&this.training.timezone_note.length?l`
                                                    <p class="text-left">
                                                        <span class="f-medium"
                                                            >${jsObject.translations.timezone}:</span
                                                        >
                                                        ${this.training.timezone_note}
                                                    </p>
                                                `:""}
                                          ${this.training.zoom_link_note&&this.training.zoom_link_note.length?l`
                                                    <p class="text-left">
                                                        <a
                                                            class="link f-medium"
                                                            href=${this.training.zoom_link_note}
                                                            target="_blank"
                                                            >${jsObject.translations.meeting_link}</a
                                                        >
                                                    </p>
                                                `:""}
                                          ${this.isPublic()?l`
                                                    <p class="text-left">
                                                        <span class="f-medium"
                                                            >${jsObject.translations.public_group}</span
                                                        >
                                                    </p>
                                                `:""}
                                          ${this.isGroupLeader()?l`
                                                    <p class="text-left">
                                                        <span class="f-medium"
                                                            >${jsObject.translations.status}:</span
                                                        >
                                                        ${this.isActive()?jsObject.translations.active:jsObject.translations.inactive}
                                                    </p>
                                                `:""}
                                              <p class="text-left">
                                                <span class="f-medium">${jsObject.translations.join_code}:</span>
                                                ${this.training.join_key}
                                              </p>
                                              ${le.clipboard?l`
                                                      <div class="position-relative">
                                                          <button class="btn small" @click=${this.copyCode}>${jsObject.translations.copy_code}</button>
                                                          <p role="alert" aria-live="polite" id="copyFeedback" class="context-alert" data-state=${this.copyFeedback.code.length?"":"empty"}>${this.copyFeedback.code}</p>
                                                      </div>
                                                  `:""}
                                          ${this.isGroupLeader()?l`
                                                    <button
                                                        @click=${this.editSessionDetails}
                                                        class="btn brand tight mt--2"
                                                    >
                                                        ${jsObject.translations.edit}
                                                    </button>
                                                `:""}
                                      </div>
                                  </div>
                              </div>
                              ${this.isGroupLeader()?l`
                                        <div
                                            class="card | group-communication | grow-0"
                                        >
                                            <button
                                                class="f-0 f-medium d-flex align-items-center justify-content-between gap--2 black"
                                                @click=${this.toggleGroupCommunication}
                                            >
                                                <span
                                                    class="icon z-icon-share brand-light"
                                                ></span>
                                                <span
                                                    >${jsObject.translations.group_communication}</span
                                                >
                                                <img
                                                    class="chevron | svg w-1rem h-1rem ${this.groupCommunicationOpen?"rotate-180":""}"
                                                    src=${jsObject.images_url+"/chevron.svg"}
                                                />
                                            </button>
                                            <div
                                                class="zume-collapse"
                                                ?data-expand=${this.groupCommunicationOpen}
                                            >
                                                <div class="stack--2">
                                                      <div class="position-relative">
                                                        <button class="btn brand tight mt--2" @click=${this.copyGroupEmails}>${jsObject.translations.copy_group_emails}</button>
                                                        <p role="alert" aria-live="polite" id="copyFeedback" class="context-alert" data-state=${this.copyFeedback.emails.length?"":"empty"}>${this.copyFeedback.emails}</p>
                                                      </div>
                                                      <div class="position-relative">
                                                        <button class="btn brand tight mt--2" @click=${this.copyGroupPhones}>${jsObject.translations.copy_group_phones}</button>
                                                        <p role="alert" aria-live="polite" id="copyFeedback" class="context-alert" data-state=${this.copyFeedback.phones.length?"":"empty"}>${this.copyFeedback.phones}</p>
                                                      </div>
                                                </div>
                                            </div>
                                        </div>
                                        `:""}
                              ${this.isCoach()?l`
                                        <div
                                            class="card | coaching-tools | grow-0"
                                        >
                                            <button
                                                class="f-0 f-medium d-flex align-items-center justify-content-between gap--2 black"
                                                @click=${this.toggleCoachingTools}
                                            >
                                                <span
                                                    class="icon z-icon-coach brand-light"
                                                ></span>
                                                <span
                                                    >${jsObject.translations.coaching}</span
                                                >
                                                <img
                                                    class="chevron | svg w-1rem h-1rem ${this.coachingToolsOpen?"rotate-180":""}"
                                                    src=${jsObject.images_url+"/chevron.svg"}
                                                />
                                            </button>
                                            <div
                                                class="zume-collapse"
                                                ?data-expand=${this.coachingToolsOpen}
                                            >
                                                <div class="stack--2 mt-0">
                                                  <a
                                                      href=${this.makeGroupMembersHref()}
                                                      target="_blank"
                                                      >${jsObject.translations.group_members_link}</a
                                                  >
                                                  <a
                                                      href="/coaching"
                                                      target="_blank"
                                                      >${jsObject.translations.coaching_portal}</a
                                                  >
                                                </div>
                                            </div>
                                        </div>
                                        `:""}
                          `:""}
                    <dash-cta></dash-cta>
                </div>
            </div>
            <div
                class="reveal small"
                id="privacy-policy-modal"
                data-reveal
                data-v-offset="20"
            >
                <button
                    class="ms-auto close-btn"
                    data-close
                    aria-label=${jsObject.translations.close}
                    type="button"
                >
                    <span class="icon z-icon-close"></span>
                </button>
                <div class="stack">
                  <h2 class="text-center">${jsObject.wizard_translations.join_training.privacy_policy}</h2>
                  <ul role="list" class="fit-content mx-auto">
                    <li>${jsObject.wizard_translations.join_training.contact_visibility1}</li>
                    ${this.isPrivate?l`
                      <li>${jsObject.wizard_translations.join_training.contact_visibility2}</li>
                      <li>${jsObject.wizard_translations.join_training.contact_visibility3}</li>
                    `:""}
                  </ul>
                  ${this.isPrivate?l`
                    <button class="btn brand tight fit-content center" @click=${this.openProfileModal}>
                      ${jsObject.wizard_translations.join_training.change_preferences}
                    </button>
                  `:""}
                  <a href="/privacy-policy" target="_blank" class="link text-center">${jsObject.translations.learn_more}</a>
                </div>
            </div>
            <div
                class="reveal small"
                id="group-members-modal"
                data-reveal
                data-v-offset="20"
            >
                <button
                    class="ms-auto close-btn"
                    data-close
                    aria-label=${jsObject.translations.close}
                    type="button"
                >
                    <span class="icon z-icon-close"></span>
                </button>
                <div class="stack">
                    <div class="cluster">
                      <h2>${this.groupMemberToView.post_title}</h2>
                      ${this.isCurrentUser(this.groupMemberToView.user_id)?l`
                        <button class="icon-btn brand-light" @click=${this.openProfileModal}>
                          <span class="icon z-icon-pencil"></span>
                        </button>
                      `:""}
                    </div>
                    <div>
                        <h3 class="brand-light">${jsObject.translations.contact_info}</h3>
                        ${this.isUserContactHidden(this.groupMemberToView)?l`
                          <p class="gray-700">${jsObject.translations.contact_hidden}</p>
                        `:""}
                        ${this.groupMemberToView.email||this.groupMemberToView.phone?l`
                        <ul>
                            <li><strong>${jsObject.translations.email}:</strong> ${this.groupMemberToView.email}</li>
                            <li><strong>${jsObject.translations.phone}:</strong> ${this.groupMemberToView.phone}</li>
                        </ul>
                      `:""}
                    </div>
                    <div>
                      <h3 class="brand-light">${jsObject.translations.progress}</h3>
                      ${this.isUserProgressHidden(this.groupMemberToView)?l`
                        <p class="gray-700">${jsObject.translations.progress_hidden}</p>
                      `:""}
                      ${this.groupMemberToView.progress?l`
                        <ul>
                            ${wt(Object.values(jsObject.training_items),a=>a.key,this.renderTrainingItem)}
                        </ul>
                      `:""}
                    </div>
                </div>
            </div>
            <div
                class="reveal small"
                id="edit-session-modal"
                data-reveal
                data-v-offset="20"
            >
                <button
                    class="ms-auto close-btn"
                    data-close
                    aria-label=${jsObject.translations.close}
                    type="button"
                >
                    <span class="icon z-icon-close"></span>
                </button>
                <div class="stack">
                    <div class="d-flex gap-0 flex-wrap justify-content-center">
                        <h2>${jsObject.translations.edit}:</h2>
                        <h3 class="h2 brand-light">
                            ${(s=this.sessionToEdit)===null||s===void 0?void 0:s.name}
                        </h3>
                    </div>
                    <calendar-select
                        style="--primary-color: var(--z-brand-light); --hover-color: var(--z-brand-fade)"
                        showToday
                        .selectedDays=${(n=this.sessionToEdit)!==null&&n!==void 0&&n.date?[{date:this.sessionToEdit.date}]:[]}
                        .highlightedDays=${this.getHighlightedDays()}
                        @day-added=${this.selectDay}
                    ></calendar-select>
                    <div
                        class="d-flex align-items-center justify-content-center gap--1"
                    >
                        <button
                            class="btn outline tight"
                            @click=${this.cancelEditingSession}
                            ?disabled=${this.isSavingSession}
                            aria-disabled=${this.isSavingSession?"true":"false"}
                        >
                            ${jsObject.translations.cancel}
                        </button>
                        <button
                            class="btn tight"
                            @click=${this.saveSession}
                            ?disabled=${this.isSavingSession}
                            aria-disabled=${this.isSavingSession?"true":"false"}
                        >
                            ${jsObject.translations.save}
                            <span
                                class="loading-spinner ${this.isSavingSession?"active":""}"
                            ></span>
                        </button>
                    </div>
                </div>
            </div>
            <div
                class="reveal small"
                id="edit-session-details-modal"
                data-reveal
                data-v-offset="20"
            >
                <button
                    class="ms-auto close-btn"
                    data-close
                    aria-label=${jsObject.translations.close}
                    type="button"
                >
                    <span class="icon z-icon-close"></span>
                </button>
                <form class="stack" @submit=${this.saveSessionDetails}>
                    <div class="d-flex gap-0 flex-wrap justify-content-center">
                        <h2>${jsObject.translations.edit}:</h2>
                        <h3 class="h2 brand-light">
                            ${jsObject.translations.group_details}
                        </h3>
                    </div>
                    <div>
                        <label for="location-note"
                            >${jsObject.translations.location}</label
                        >
                        <input class="input" type="text" id="location-note" />
                    </div>
                    ${this.isCoach()?"":l`
                        <div>
                            <label for="time-of-day-note"
                                >${jsObject.translations.time}</label
                            >
                            <input
                                class="input"
                                type="text"
                                id="time-of-day-note"
                            />
                        </div>
                    `}
                    ${this.isCoach()?l`
                            <div>
                                <label for="time-of-day"
                                    >${jsObject.translations.time} *</label
                                >
                                <input
                                    required
                                    class="input"
                                    type="time"
                                    id="time-of-day"
                                />
                            </div>
                            <div>
                                <label for="language-note"
                                    >${jsObject.translations.language}</label
                                >
                                <input
                                    class="input"
                                    type="text"
                                    id="language-note"
                                />
                            </div>
                            <div>
                                <label for="timezone-note"
                                    >${jsObject.translations.timezone}</label
                                >
                                <input
                                    class="input"
                                    type="text"
                                    id="timezone-note"
                                />
                            </div>
                            <div>
                                <label for="timezone"
                                    >${jsObject.translations.timezone} *</label
                                >
                                <select
                                    required
                                    class="input"
                                    id="timezone"
                                >
                                    <option value="">${jsObject.translations.select_timezone}</option>
                                    ${Object.values(jsObject.timezones).map(a=>l`
                                        <option value="${a.timezone}">${a.timezone}</option>
                                      `)}
                                  </select>
                              </div>
                          `:""}
                    <div>
                        <label for="zoom-link-note"
                            >${jsObject.translations.meeting_link}
                            (${jsObject.translations.meeting_link_examples})</label
                        >
                        <input class="input" type="text" id="zoom-link-note" />
                    </div>
                    ${this.isCoach()?l`
                              <div>
                                  <label
                                      >${jsObject.translations.visibility}</label
                                  >
                                  <div class="cluster">
                                      <label class="form-control label-input">
                                          <input
                                              name="visibility"
                                              type="radio"
                                              id="public"
                                          />
                                          ${jsObject.translations.public_group}
                                      </label>
                                      <label class="form-control label-input">
                                          <input
                                              name="visibility"
                                              type="radio"
                                              id="private"
                                          />
                                          ${jsObject.translations.private_group}
                                      </label>
                                  </div>
                              </div>
                          `:""}
                    <div>
                        <label>${jsObject.translations.status}</label>
                        <div class="cluster">
                            <label class="form-control label-input">
                                <input name="status" type="radio" id="active" />
                                ${jsObject.translations.active}
                            </label>
                            <label class="form-control label-input">
                                <input
                                    name="status"
                                    type="radio"
                                    id="inactive"
                                />
                                ${jsObject.translations.inactive}
                            </label>
                        </div>
                    </div>
                    ${this.showPublicGroupWarning?l`
                      <div class="warning banner stack" data-state=''>
                        ${jsObject.translations.public_group_warning}
                        <button class="btn outline tight center">
                          ${jsObject.translations.confirm}
                        </button>
                      </div>
                    `:""}
                    <div class="stack">
                      <div
                          class="d-flex align-items-center justify-content-center gap--1"
                      >
                          <button
                              class="btn outline tight"
                              @click=${this.closeEditSessionDetailsModal}
                              ?disabled=${this.isSavingSession}
                              aria-disabled=${this.isSavingSession?"true":"false"}
                          >
                              ${jsObject.translations.cancel}
                          </button>
                          <button
                              class="btn tight"
                              ?disabled=${this.isSavingSession||this.showPublicGroupWarning}
                              aria-disabled=${this.isSavingSession||this.showPublicGroupWarning?"true":"false"}
                          >
                              ${jsObject.translations.save}
                              <span
                                  class="loading-spinner ${this.isSavingSession?"active":""}"
                              ></span>
                          </button>
                      </div>
                      <hr>
                      ${this.isConfirmDelete?l`
                            <div class="">
                              <p class="bold f-1">${jsObject.translations.delete}?</p>
                              <div class="cluster">
                                  <button class="btn outline tight" @click=${()=>this.isConfirmDelete=!1}>
                                      ${jsObject.translations.no}
                                  </button>
                                  <button
                                    type="button"
                                    class="btn tight red"
                                    @click=${()=>this.deleteGroup()}
                                  >
                                      ${jsObject.translations.yes}
                                  </button>
                              </div>
                            </div>
                        `:l`
                            <button
                                class="center | btn outline tight red"
                                @click=${()=>this.isConfirmDelete=!0}
                            >
                                ${jsObject.translations.delete}
                            </button>
                        `}
                    </div>
                </form>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-trainings",v1);class y1 extends B{static get properties(){return{activeTrainingGroups:{type:Object,attribute:!1},inactiveTrainingGroups:{type:Object,attribute:!1},inactiveTrainingGroupsOpen:{type:Boolean,attribute:!1}}}constructor(){super(),this.activeTrainingGroups=jsObject.active_training_groups,this.inactiveTrainingGroups=jsObject.inactive_training_groups,this.routeName=L.myTrainings,this.route=W.getRoute(this.routeName),this.inactiveTrainingGroupsOpen=!1}firstUpdated(){Tt(this.renderRoot,"dash-trainings-list")}makeTrainingHref(t){return W.routes.find(({name:n})=>n===L.myTraining).pattern.replace(":code",t)}createTraining(){this.dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:A.planDecision}}))}toggleInactiveTrainingGroups(){this.inactiveTrainingGroupsOpen=!this.inactiveTrainingGroupsOpen}render(){return l`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <dash-sidebar-toggle></dash-sidebar-toggle>
                        <span class="icon ${this.route.icon}"></span>
                        <h1 class="h3">${this.route.translation}</h1>
                    </div>
                    <div class="">
                        <button
                            class="btn brand-light tight"
                            aria-label=${jsObject.translations.create_training_group}
                            @click=${this.createTraining}
                        >
                            ${jsObject.translations.new}
                        </button>
                    </div>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main p-1">
                    <div class="stack">
                        <h2 class="h4">${jsObject.translations.active}</h2>
                        ${wt(this.activeTrainingGroups,({key:t})=>t,t=>l`
                                <training-link
                                    as="nav"
                                    text=${t.title}
                                    href=${this.makeTrainingHref(t.join_key)}
                                ></training-link>
                            `)}
                        ${this.inactiveTrainingGroups.length>0?l`
                                    <h2 role="button" class="h4 repel align-items-center" @click=${this.toggleInactiveTrainingGroups}>
                                      ${jsObject.translations.inactive}
                                      <img
                                          class="svg w-1rem h-1rem chevron ${this.inactiveTrainingGroupsOpen?"rotate-180":""}"
                                          src=${jsObject.images_url+"/chevron.svg"}
                                      />
                                    </h2>


                                <div class="zume-collapse" ?data-expand=${this.inactiveTrainingGroupsOpen}>
                                  ${wt(this.inactiveTrainingGroups,({key:t})=>t,t=>l`
                                      <training-link
                                          as="nav"
                                          text=${t.title}
                                          href=${this.makeTrainingHref(t.join_key)}
                                      ></training-link>
                                      `)}
                                </div>
                        `:""}
                    </div>
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-trainings-list",y1);class _1 extends B{firstUpdated(){const t=this.offsetTop;this.style.top=t+"px"}render(){return l`
            <div class="dashboard__header right">
                <dash-sidebar-toggle displayOn="medium"></dash-sidebar-toggle>
                <launch-course></launch-course>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-header-right",_1);class w1 extends B{static get properties(){return{displayOn:{type:String}}}constructor(){super(),this.displayOn="large"}toggleSidebar(){const t=new CustomEvent("toggle-dashboard-sidebar",{bubbles:!0});this.dispatchEvent(t)}render(){return l`
            <button class="btn f-0 tight dashboard__sidebar-toggle break-${this.displayOn}" @click=${this.toggleSidebar}>${jsObject.translations.menu}</button>
        `}createRenderRoot(){return this}}customElements.define("dash-sidebar-toggle",w1);class ri extends le(B){static get properties(){return{href:{type:String},class:{type:String},as:{type:String},locked:{type:Boolean},completed:{type:Boolean},disableNavigate:{type:Boolean},active:{type:Boolean},icon:{type:String},text:{type:String},explanation:{type:String},noRenderText:{type:Boolean},targetBlank:{type:Boolean,attribute:"target-blank"}}}constructor(){super(),this.href="",this.class="",this.as="",this.icon="",this.text="",this.explanation="",this.locked=!1,this.completed=!1,this.disableNavigate=!1,this.active=!1}handleClick(t,e=!1){if(this.as==="nav"&&(t.preventDefault(),this.navigate(this.href)),this.as==="link"&&e){window.open(this.href,"_blank");return}this.as!=="link"&&this.as==="button"&&t.preventDefault()}printBool(t){return t?"true":"false"}render(){return l`
            <a
                href=${this.href}
                class=${this.class}
                @click=${this.handleClick}
                aria-disabled=${this.completed}
                target=${this.targetBlank?"_blank":"_self"}
                ?data-completed=${this.completed}
                ?data-locked=${this.locked}
                ?data-active=${this.active}
            >
                <span class="icon ${this.icon} brand-light"></span>
                <span>${this.text}</span>
            </a>
        `}createRenderRoot(){return this}}customElements.define("nav-link",ri);class S1 extends ri{constructor(){super(),this.isRtl=document.querySelector("html").getAttribute("dir")==="rtl"}renderText(){return console.log("renderText",this.noRenderText),this.noRenderText?this.text:this.text.split(" ").map(t=>l` <span>${t}</span> `)}getIcon(){return this.locked?this.icon+"-locked":this.icon}render(){return l`
            <a
                href=${this.href}
                class="card-btn grid-link position-relative"
                role="button"
                style=${this.icon?"":"justify-content: center;"}
                target=${this.targetBlank?"_blank":"_self"}
                @click=${this.handleClick}
                aria-disabled=${this.printBool(this.locked)}
                ?data-locked=${this.locked}
                ?data-completed=${this.completed}
            >
                ${this.icon?l`<span
                          class="icon ${this.getIcon()} brand-light"
                      ></span>`:""}
                ${this.renderText()}
                ${this.completed?l`
                          <span
                              class="z-icon-check-mark f-2 m--3 success absolute bottom ${this.isRtl?"left":"right"}"
                          ></span>
                      `:""}
            </a>
        `}}customElements.define("grid-link",S1);class k1 extends ri{constructor(){super()}renderText(){return this.text.split(" ").map(t=>l`
            <span>${t}</span>
        `)}getIcon(){return this.locked?this.icon+"-locked":this.icon}render(){return l`
            <div
                class="dash-menu__list-item"
                ?data-locked=${this.locked}
                ?data-completed=${this.completed}
                ?data-button=${this.disableNavigate}
                role="button"
                @click=${t=>this.handleClick(t,!0)}
            >
                <div class="dash-menu__icon-area | stack--5">
                    <span class="icon ${this.getIcon()} dash-menu__list-icon"></span>
                </div>
                <div class="dash-menu__text-area | switcher | switcher-width-20">
                    <div>
                        <h3 class="f-1 bold uppercase">${this.text}</h3>
                        ${this.explanation?l`<p>${this.explanation}</p>`:""}
                    </div>
                    ${this.completed?l`
                            <div class="grow-0"><span class="icon z-icon-check-mark grow-0 | dash-menu__list-success"></span></div>
                        `:""}
                </div>
            </div>
        `}}customElements.define("list-link",k1);class C1 extends B{static get properties(){return{translations:{type:Object},urls:{type:Object},position:{type:String},asLink:{type:Boolean}}}constructor(){super(),this.translations={},this.urls={},this.id=window.crypto.randomUUID(),typeof jsObject<"u"&&(this.translations=jsObject.translations,this.urls=jsObject.urls),this.position="bottom";const e=document.querySelector("html").dataset.dir;this.isRtl=e==="rtl"}updated(){jQuery(this.renderRoot).foundation()}render(){return l`
            <button class="${this.asLink?"btn dark tight nav__button":" btn  tight"}" data-toggle="launch-course-panel-${this.id}">
                ${this.translations.launch_course}
            </button>
            <div
                class="dropdown-pane"
                id="launch-course-panel-${this.id}"
                data-dropdown
                data-auto-focus="true"
                data-close-on-click="true"
                data-position=${this.position}
                data-alignment=${this.isRtl?"right":"left"}
            >
                <ul>
                    <li><a class="menu-btn no-wrap" href="${this.urls.launch_ten_session_course}"><span class="icon z-icon-course"></span>${this.translations.ten_session_course}</a></li>
                    <li><a class="menu-btn no-wrap" href="${this.urls.launch_twenty_session_course}"><span class="icon z-icon-course"></span>${this.translations.twenty_session_course}</a></li>
                    <li><a class="menu-btn no-wrap" href="${this.urls.launch_intensive_session_course}"><span class="icon z-icon-course"></span>${this.translations.three_day_intensive_course}</a></li>
                </ul>
            </div>
        `}createRenderRoot(){return this}}customElements.define("launch-course",C1);class j1 extends B{constructor(){super();X(this,"addressCallback",e=>{e.features.length<1?this.locations=-1:this.locations=e.features});X(this,"processLocation",debounce(getAddressSuggestions(this.addressCallback,jsObject.map_key)));this.userProfile={},this.locations=[],this.infosOpen=[]}static get properties(){return{userProfile:{type:Object},loading:{type:Boolean,attribute:!1},locations:{type:Array,attribute:!1},infosOpen:{type:Array,attribute:!1}}}firstUpdated(){this.nameInput=this.renderRoot.querySelector("#full_name"),this.phoneInput=this.renderRoot.querySelector("#phone"),this.emailInput=this.renderRoot.querySelector("#email"),this.preferredEmailInput=this.renderRoot.querySelector("#communications_email"),this.cityInput=this.renderRoot.querySelector("#city"),this.prefferedLanguageInput=this.renderRoot.querySelector("#preferred_language"),this.addressResultsContainer=this.renderRoot.querySelector("#address_results"),this.notifyOfFutureTrainingsInput=this.renderRoot.querySelector("#notify_of_future_trainings"),this.hidePublicContactInput=this.renderRoot.querySelector("#hide_public_contact"),this.hidePublicProgressInput=this.renderRoot.querySelector("#hide_public_progress"),Tt(this.renderRoot,"profile-form")}submitProfileForm(e){e.preventDefault();const s=this.nameInput.value,n=this.emailInput.value,a=this.preferredEmailInput.value,r=this.phoneInput.number,o=this.prefferedLanguageInput.value,h={name:s,phone:r,email:n,communications_email:a,preferred_language:o};h.location_grid_meta=getLocationGridFromMapbox(this.mapboxSelectedId,this.userProfile.location),this.loading=!0,fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(h),headers:{"X-WP-Nonce":jsObject.nonce}}).then(u=>u.json()).then(u=>{this.fireEvents(u)}).catch(u=>{console.error(u)}).finally(()=>{this.loading=!1})}submitEmailPreferences(e){e.preventDefault();const s={notify_of_future_trainings:this.notifyOfFutureTrainingsInput.checked};this.loading=!0,fetch(jsObject.rest_endpoint+"/email-preferences",{method:"POST",body:JSON.stringify(s),headers:{"X-WP-Nonce":jsObject.nonce}}).then(n=>n.json()).then(n=>{this.fireEvents({...this.userProfile,notify_of_future_trainings:n.notify_of_future_trainings})}).catch(n=>{console.error(n)}).finally(()=>{this.loading=!1})}submitPreferences(e){e.preventDefault();const s={hide_public_contact:this.hidePublicContactInput.checked,hide_public_progress:this.hidePublicProgressInput.checked};this.loading=!0,fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(s),headers:{"X-WP-Nonce":jsObject.nonce}}).then(n=>n.json()).then(n=>{this.fireEvents(n)}).catch(n=>{console.error(n)}).finally(()=>{this.loading=!1})}fireEvents(e){const s=new CustomEvent("user-profile:change",{bubbles:!0,detail:e});this.dispatchEvent(s);const n=new CustomEvent("user-state:change",{bubbles:!0});this.dispatchEvent(n)}selectAddress(e){const s=e.target.id,n=e.target.dataset.placeName;this.cityInput.value=n,this.mapboxSelectedId=s,this.locations=[]}_toggleInfo(e){if(this.infosOpen.includes(e)){const s=[...this.infosOpen];s.splice(s.indexOf(e),1),this.infosOpen=s}else this.infosOpen=[...this.infosOpen,e]}isSSOUser(){return this.userProfile.sso_identities!==""}render(){var e,s;return l`
            <form action="" class="stack--2" id="profile-form" @submit=${this.submitProfileForm}>

                <div class="">
                    <label for="full_name">${jsObject.translations.name}</label>
                    <div class="d-flex align-items-center">
                        <input
                          class="input"
                          required
                          type="text"
                          id="full_name"
                          name="full_name"
                          value=${this.userProfile.name}
                        >
                        <button type="button" class="icon-btn f-1" @click=${()=>this._toggleInfo("name")}>
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <div
                      class="info-area zume-collapse ${this.infosOpen.includes("name")?"mt-0":""}"
                      ?data-expand=${this.infosOpen.includes("name")}
                    >
                        <div class="card mw-50ch mx-auto">
                            <p>${jsObject.translations.user_name_disclaimer}</p>
                        </div>
                    </div>
                </div>
                <div class="">
                    <label for="phone">${jsObject.translations.phone}</label>
                    <div class="d-flex align-items-center">
                        <phone-input
                          id="phone"
                          name="phone"
                          value=${this.userProfile.phone}
                          style="width: 100%;"
                        ></phone-input>
                        <button type="button" class="icon-btn f-1 ${this.isSSOUser()?"invisible":""}" @click=${()=>this._toggleInfo("phone")}>
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <div
                        class="info-area zume-collapse ${this.infosOpen.includes("phone")?"mt-0":""} ${this.isSSOUser()?"d-none":""}"
                        ?data-expand=${this.infosOpen.includes("phone")}
                    >
                        <div class="card mw-50ch mx-auto">
                            <p>
                              ${jsObject.translations.user_phone_disclaimer}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="">
                    <label for="email">${jsObject.translations.email}</label>
                    <div class="d-flex align-items-center">
                        <input
                          class="input"
                          ?disabled=${this.isSSOUser()}
                          type="email"
                          id="email"
                          name="email"
                          value=${this.userProfile.email}
                        >
                        <button
                          type="button"
                          class="icon-btn f-1 ${this.isSSOUser()?"invisible":""}"
                          @click=${()=>this._toggleInfo("email")}
                        >
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <div
                      class="info-area zume-collapse ${this.infosOpen.includes("email")?"mt-0":""} ${this.isSSOUser()?"d-none":""}"
                      ?data-expand=${this.infosOpen.includes("email")}
                    >
                        <div class="card mw-50ch mx-auto">
                            <p>
                              ${jsObject.translations.user_email_disclaimer}
                            </p>
                        </div>
                    </div>
                </div>
                    ${this.userProfile.sign_in_providers&&Array.isArray(this.userProfile.sign_in_providers)?l`
                                  <label>
                                    ${jsObject.translations.linked_accounts}
                                  </label>
                                  <div class="cluster">
                                      ${this.userProfile.sign_in_providers.map(n=>l`
                                              <span class="token">${n}</span>
                                          `)}
                                  </div>
                              `:""}
                <div class="">
                    <label for="communications_email">
                      ${jsObject.translations.communications_email}
                    </label>
                    <div class="d-flex align-items-center">
                        <input
                          class="input"
                          type="email"
                          id="communications_email"
                          name="communications_email"
                          value=${this.userProfile.communications_email}
                        >
                        <button
                          type="button"
                          class="icon-btn f-1 ${this.isSSOUser()?"invisible":""}"
                          @click=${()=>this._toggleInfo("communications_email")}
                        >
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <div
                      class="info-area zume-collapse ${this.infosOpen.includes("communications_email")?"mt-0":""} ${this.isSSOUser()?"d-none":""}"
                      ?data-expand=${this.infosOpen.includes("communications_email")}
                    >
                        <div class="card mw-50ch mx-auto">
                            <p>${jsObject.translations.user_email_disclaimer}</p>
                        </div>
                    </div>
                </div>
                <div class="">
                    <label for="city">${jsObject.translations.city}</label>
                    <div class="d-flex align-items-center">
                        <input
                            class="input"
                            type="text"
                            id="city"
                            name="city"
                            value=${(e=(s=this.userProfile.location)===null||s===void 0?void 0:s.label)!==null&&e!==void 0?e:""}
                            @input=${this.processLocation}
                        />
                        <button type="button" class="icon-btn f-1" @click=${()=>this._toggleInfo("city")}>
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <div
                      class="info-area zume-collapse ${this.infosOpen.includes("city")?"mt-0":""} ${this.isSSOUser()?"d-none":""}"
                      ?data-expand=${this.infosOpen.includes("city")}
                    >
                        <div class="card mw-50ch mx-auto">
                            <p>${jsObject.translations.user_city_disclaimer}</p>
                        </div>
                    </div>
                </div>
                    ${Array.isArray(this.locations)?"":l` ${jsObject.translations.no_locations} `}
                    ${Array.isArray(this.locations)&&this.locations.length>0?l`
                                  <div
                                      id="address_results"
                                      class="stack--3 fit-content mx-auto my-0"
                                  >
                                      ${this.locations.map(n=>l`
                                              <div
                                                  class="btn rounded"
                                                  role="button"
                                                  id="${n.id}"
                                                  data-place-name="${n.place_name}"
                                                  @click=${this.selectAddress}
                                              >
                                                  ${n.place_name}
                                              </div>
                                          `)}
                                  </div>
                              `:""}
                </div>

                <div>
                    <label for="preferred_language">
                      ${jsObject.translations.language}
                    </label>
                    <div class="d-flex align-items-center">
                        <select class="input" name="preferred_language" id="preferred_language">

                        ${Object.values(jsObject.languages).map(n=>l`
                                <option
                                    value=${n.code}
                                    ?selected=${this.userProfile.preferred_language===n.code}
                                >
                                    ${n.nativeName} - ${n.enDisplayName}
                                </option>
                            `)}

                        </select>
                        <button
                          type="button"
                          class="icon-btn f-1 ${this.isSSOUser()?"invisible":""}"
                          @click=${()=>this._toggleInfo("preferred_language")}
                        >
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                    </div>
                    <div
                      class="info-area zume-collapse ${this.infosOpen.includes("preferred_language")?"mt-0":""} ${this.isSSOUser()?"d-none":""}"
                      ?data-expand=${this.infosOpen.includes("preferred_language")}
                      >
                        <div class="card mw-50ch mx-auto">
                            <p>
                              ${jsObject.translations.user_preferred_language_disclaimer}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="stack my-0" data-fit-content>
                    <button
                      class="btn"
                      id="submit-profile"
                      ?disabled=${this.loading}
                    >
                      ${jsObject.translations.save}
                    </button>
                </div>
                <span class="loading-spinner ${this.loading?"active":""}"></span>
            </form>
            <hr>
            <div class="stack--2">
                <h3 class="h4">
                  ${jsObject.translations.email_preferences}
                </h3>
                <p>${jsObject.translations.email_preferences_disclaimer}</p>
                <form @submit=${this.submitEmailPreferences} class="stack--2">
                  <div class="form-control brand-light">
                      <input
                          type="checkbox"
                          id="notify_of_future_trainings"
                          ?checked=${this.userProfile.notify_of_future_trainings}
                      />
                      <label for="notify_of_future_trainings">
                          ${jsObject.translations.notify_of_future_trainings}
                      </label>
                  </div>
                  <div class="stack-1 my-0" data-fit-content>
                    <button class="btn" id="submit-email-preferences" ?disabled=${this.loading}>
                      ${jsObject.translations.save}
                    </button>
                  </div>
                </form>
            </div>
            <hr>
            <div class="stack--2">
                <h3 class="h4">
                  ${jsObject.translations.preferences}
                </h3>
                <form @submit=${this.submitPreferences} class="stack--2">
                  <div>
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="form-control brand-light">
                          <input
                              type="checkbox"
                              id="hide_public_contact"
                              ?checked=${this.userProfile.hide_public_contact==="1"}
                          />
                          <label for="hide_public_contact">
                              ${jsObject.translations.hide_public_contact}
                          </label>
                      </div>
                      <button
                        type="button"
                        class="icon-btn f-1 ${this.isSSOUser()?"invisible":""}"
                        @click=${()=>this._toggleInfo("hide_public_contact")}
                      >
                          <span class="icon z-icon-info brand-light"></span>
                      </button>
                    </div>
                    <div class="info-area zume-collapse ${this.infosOpen.includes("hide_public_contact")?"mt-0":""} ${this.isSSOUser()?"d-none":""}" ?data-expand=${this.infosOpen.includes("hide_public_contact")}>
                      <div class="card mw-50ch mx-auto">
                          <p>${jsObject.wizard_translations.join_training.contact_visibility1}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="form-control brand-light">
                            <input
                                type="checkbox"
                                id="hide_public_progress"
                                ?checked=${this.userProfile.hide_public_progress==="1"}
                            />
                            <label for="hide_public_progress">
                                ${jsObject.translations.hide_public_progress}
                            </label>
                        </div>
                        <button
                          type="button"
                          class="icon-btn f-1 ${this.isSSOUser()?"invisible":""}"
                          @click=${()=>this._toggleInfo("hide_public_progress")}
                        >
                            <span class="icon z-icon-info brand-light"></span>
                        </button>
                      </div>
                      <div class="info-area zume-collapse ${this.infosOpen.includes("hide_public_progress")?"mt-0":""} ${this.isSSOUser()?"d-none":""}" ?data-expand=${this.infosOpen.includes("hide_public_progress")}>
                        <div class="card mw-50ch mx-auto">
                            <p>${jsObject.translations.progress_visibility}</p>
                        </div>
                      </div>
                  </div>
                  <div class="stack-1 my-0" data-fit-content>
                    <button class="btn" id="submit-privacy-settings" ?disabled=${this.loading}>
                      ${jsObject.translations.save}
                    </button>
                  </div>
                </form>
            </div>
            <hr>
            <a href=${jsObject.urls.logout} class="btn outline fit-content mt-2">
              ${jsObject.translations.logout}
            </a>


        `}createRenderRoot(){return this}}customElements.define("profile-form",j1);class O1 extends ri{constructor(){super()}render(){return l`
            <div
                class="dash-menu__training-item"
                ?data-locked=${this.locked}
                ?data-completed=${this.completed}
                ?data-button=${this.disableNavigate}
                role="button"
                @click=${this.handleClick}
            >
                <h3 class="title">${this.text}</h3>
            </div>
        `}}customElements.define("training-link",O1);class x1 extends B{static get properties(){return{error:{type:Boolean,attribute:!1},sessionNumber:{type:Number,attribute:!1},hostProgress:{type:Object,attribute:!1},errorMessage:{type:String,attribute:!1},showHelp:{type:Boolean,attribute:!1}}}constructor(){super(),this.error=!1,this.showHelp=!0,this.numberOfSessions=this.getNumberOfSessions(),this.sessionNumber=this.getSessionNumber(),this.hostProgress=jsObject.host_progress,this.trainingItems=Object.values(jsObject.training_items),this.errorMessage="",this.renderListItem=this.renderListItem.bind(this),this.scrollToLastItem=this.scrollToLastItem.bind(this)}firstUpdated(){jQuery(this.renderRoot).foundation(),this.scrollToLastItem(),this.error||(this.showCelebrationModal(),setTimeout(()=>{this.closeCelebrationModal()},1400));const t=document.querySelector("#celebration-modal");jQuery(t).on("closed.zf.reveal",this.scrollToLastItem)}openModal(t){const e=document.querySelector(t);jQuery(e).foundation("open")}closeModal(t){const e=document.querySelector(t);jQuery(e).foundation("close")}showCelebrationModal(){this.openModal("#celebration-modal")}closeCelebrationModal(){this.closeModal("#celebration-modal")}scrollToLastItem(){const t=this.getSessionNumber();if(t===1)return;const e=t-1,s=jsObject.session_items[e],n=document.querySelector(`#key-${s[0]}`);console.log(n,n.offsetTop),window.scrollTo({top:n.offsetTop}),location.hash=e}closeHelp(){this.showHelp=!1}openInfo(){this.openModal("#info-modal")}closeInfo(){this.closeModal("#info-modal")}getSessionKey(){var t;const s=new URL(location.href).searchParams.get("code");return(t=jsObject.session_keys[s])!==null&&t!==void 0?t:""}getNumberOfSessions(){const t=this.getSessionKey();if(!t)return this.error=!0,0;const e=t.split("_");return e[1]==="a"?10:e[1]==="b"?20:e[1]==="c"?5:(this.error=!0,0)}getSessionNumber(){const t=this.getSessionKey();if(!t)return 0;const e=t.split("_"),s=Number(e[2]);return Number.isNaN(s)?0:s}toggleHost(t){const{host:e,additionalHostToCredit:s}=t.detail;t.stopImmediatePropagation();const{type:n,subtype:a,key:r}=e,o=this.hostProgress.list[r];if(o===!1)return this.changeHost(r,!0),s.forEach(({key:h})=>this.changeHost(h,!0)),zumeRequest.post("host",{type:n,subtype:a,user_id:jsObject.profile.user_id}).then(h=>{}).catch(h=>{this.changeHost(r,!1),s.forEach(({key:u})=>this.changeHost(u,!1)),this.displayError(jsObject.translations.error_with_request)});if(o===!0)return this.changeHost(r,!1),zumeRequest.delete("host",{type:n,subtype:a,user_id:jsObject.profile.user_id}).catch(h=>{this.changeHost(r,!0),this.displayError(jsObject.translations.error_with_request)})}displayError(t){this.errorMessage=t,setTimeout(()=>{this.errorMessage=""},4e3)}changeHost(t,e){const s={...this.hostProgress};s.list={...this.hostProgress.list},s.list[t]=e,this.hostProgress={...s},jsObject.host_progress={...this.hostProgress}}renderListItem(t){const{title:e,description:s,host:n,slug:a,key:r}=t;return l`
            <li class="stack--2 center py-1" id=${`key-${r}`}>
                <p class="f-medium">${e}</p>
                <host-progress-bar
                    .host=${n}
                    .hostProgressList=${this.hostProgress.list}
                    @host:toggle=${this.toggleHost}
                ></host-progress-bar>
            </li>
        `}render(){var t,e,s,n;return this.error?l`
                <div class="text-center">
                    <h1 class="h2 brand-light mb0">${jsObject.translations.woops}</h1>
                    <hr class="mt0">
                    <p>${jsObject.translations.something_went_wrong}</p>
                    <a href="" class="btn ">${jsObject.translations.dashboard}</a>
                </div>
            `:l`
            <div class="text-center position-relative">
                <div class="fixed bottom left right bg-white p--1 hard-shadow ${this.showHelp?"":"hidden"}">
                    <button
                        class="ms-auto close-btn"
                        data-close
                        aria-label=${jsObject.translations.close}
                        type="button"
                        @click=${this.closeHelp}
                    >
                        <span class="icon z-icon-close"></span>
                    </button>
                    <p>
                        ${jsObject.translations.check_off_items}
                    </p>
                    <button class="link brand-light" @click=${this.openInfo}><span class="icon z-icon-info"></span> ${jsObject.translations.learn_more}</button>
                </div>

                <ul class="border-between">
                    ${wt(this.trainingItems,a=>a.key,this.renderListItem)}
                </ul>

            </div>

            <div
                class="stack | reveal tiny card celebration showing | border-none"
                id="celebration-modal"
                data-reveal
                data-initial-top
                data-not-fullscreen
            >
                <button
                    class="ms-auto close-btn"
                    data-close
                    aria-label=${jsObject.translations.close}
                    type="button"
                    @click=${this.closeCelebrationModal}
                >
                    <span class="icon z-icon-close"></span>
                </button>
                <h2 class="h5 text-center bold">
                    ${jsObject.translations.congratulations}
                </h2>
                <p class="f-medium">
                    ${jsObject.translations.checked_in}
                </p>
                <div class="d-flex align-items-center justify-content-between">
                    <img
                        class="w-30"
                        src="${jsObject.images_url+"/fireworks-2.svg"}"
                        alt=""
                    />
                    <img
                        class="w-40"
                        src="${jsObject.images_url+"/thumbs-up.svg"}"
                        alt=""
                    />
                    <img
                        class="w-30"
                        src="${jsObject.images_url+"/fireworks-2.svg"}"
                        alt=""
                    />
                </div>
            </div>
            <div class="reveal large" id="info-modal" data-reveal data-v-offset="20">
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button">
                        <span class="icon z-icon-close"></span>
                </button>
                <div class="stack-2 host-info mx-2">
                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="heard" percent=${((t=this.hostProgress)===null||t===void 0||(t=t.percent)===null||t===void 0?void 0:t.h)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.heard}</h3>
                            <p class="italic">${jsObject.translations.heard_explanation}</p>
                        </div>
                    </div>
                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="obeyed" percent=${((e=this.hostProgress)===null||e===void 0||(e=e.percent)===null||e===void 0?void 0:e.o)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.obeyed}</h3>
                            <p class="italic">${jsObject.translations.obeyed_explanation}</p>
                        </div>
                    </div>
                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="shared" percent=${((s=this.hostProgress)===null||s===void 0||(s=s.percent)===null||s===void 0?void 0:s.s)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.shared}</h3>
                            <p class="italic">${jsObject.translations.shared_explanation}</p>
                        </div>
                    </div>

                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="trained" percent=${((n=this.hostProgress)===null||n===void 0||(n=n.percent)===null||n===void 0?void 0:n.t)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.trained}</h3>
                            <p class="italic">${jsObject.translations.trained_explanation}</p>
                        </div>
                    </div>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("checkin-dashboard",x1);class E1 extends B{static get properties(){return{host:{type:Object},hostProgressList:{type:Object},displayOnly:{type:Boolean}}}toggleHost(t,e=[]){this.dispatchEvent(new CustomEvent("host:toggle",{detail:{host:t,additionalHostToCredit:e}}))}render(){return l`
            <div class="training-progress" ?data-display-only=${this.displayOnly}>
                <button
                    data-subtype=${this.host[0].subtype}
                    class=${this.hostProgressList[this.host[0].key]?"active":""}
                    @click=${()=>this.toggleHost(this.host[0])}
                >
                    <span class="icon z-icon-heard-concept"></span>
                </button>
                <button
                    data-subtype=${this.host[1].subtype}
                    class=${this.hostProgressList[this.host[1].key]?"active":""}
                    @click=${()=>this.toggleHost(this.host[1],[this.host[0]])}
                >
                    <span class="icon z-icon-obey-concept"></span>
                </button>
                <button
                    data-subtype=${this.host[2].subtype}
                    class=${this.hostProgressList[this.host[2].key]?"active":""}
                    @click=${()=>this.toggleHost(this.host[2],[this.host[0],this.host[1]])}
                >
                    <span class="icon z-icon-share-concept"></span>
                </button>
                <button
                    data-subtype=${this.host[3].subtype}
                    class=${this.hostProgressList[this.host[3].key]?"active":""}
                    @click=${()=>this.toggleHost(this.host[3],[this.host[0],this.host[1],this.host[2]])}
                >
                    <span class="icon z-icon-train-concept"></span>
                </button>
            </div>
        `}createRenderRoot(){return this}}customElements.define("host-progress-bar",E1);class $t extends B{static get properties(){return{slide:{type:Object},showButtons:{type:Boolean},id:{type:String},dir:{type:String},inContainer:{type:Boolean},isScreenshotMode:{type:Boolean,attribute:!1},videoInfo:{type:Object,attribute:!1},showTitleMessage:{type:Boolean,attribute:!1},titleMessage:{type:String,attribute:!1}}}constructor(){super(),this.maxPercentage=80,this.inContainer=!1,this.showButtons=!0,this.dir="ltr",this.isScreenshotMode=!1,this.videoInfo={},this.showTitleMessage=!1,this.titleMessage="",this.resizeCallback=this.resizeCallback.bind(this)}connectedCallback(){super.connectedCallback(),this.dir=document.querySelector("html").dir,window.addEventListener("resize",this.resizeCallback),this.getVideoInfo(),this.checkScreenshotMode()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.resizeCallback)}firstUpdated(){if(this.showTitleMessage&&this.slide)try{this.setTitleMessage()}catch(t){console.warn("Error setting title message:",t),this.titleMessage="Content is not available in this view."}else this.showTitleMessage&&(console.warn("CourseSlide: Cannot set title message - slide data not available"),this.titleMessage="Content is not available in this view.");this.resizeSlide(window),this.fitContentToSlide(".activity-card"),this.fitContentToSlide(".content-area__text")}resizeCallback(t){this.resizeSlide(t.currentTarget)}fitContentToSlide(t){const e=this.renderRoot.querySelector(t),s=this.renderRoot.querySelector(".slides-card");if(!e||!s)return;const n=e.getBoundingClientRect().height,a=e.parentElement.getBoundingClientRect().top,r=s.getBoundingClientRect().top,h=s.getBoundingClientRect().height-(a-r),u=n/h*100;if(u>this.maxPercentage){const j=2*this.maxPercentage/u;e.style.fontSize=`calc( var(--slide-unit) * ${j} )`}}resizeSlide(t){const e=document.querySelectorAll(".slides-card"),s=document.querySelectorAll(".video-slide"),n=[...e,...s],{innerWidth:a,innerHeight:r}=t,o=this.inContainer?a/r>16/10:a/r>16/9;let h,u;o?(h=r,u=r*16/9,this.inContainer&&u>a*90/100+12&&(u=a*90/100+12,h=u*9/16)):(u=a,this.inContainer&&(u=a*90/100+12),h=u*9/16);const y=u/100;n.forEach(j=>{j.style=`
                --slide-unit: ${y}px;
                --slide-height: ${h}px;
                --slide-width: ${u}px;
            `})}renderProgressBar(){let t=[],e=[];for(let s=0;s<this.slide.progress_bar.length;s++){const n=this.slide.progress_bar[s];if(n===!1){t.push(e),t.push(!1),e=[];continue}e.push(n)}return t.push(e),l`
            <div class="stage ${this.slide.key}-bar">
                <div class="progress-bar-wrapper">
                    ${t.map(s=>s?l`
                            <div class="progress-bar-stage">
                                ${s.map(n=>l`
                                    <div class="progress-bar-item ${this.slide.key===n?"active":""}"></div>
                                `)}
                            </div>
                        `:l`<div class="progress-bar-divider"></div>`)}
                </div>
            </div>
        `}renderContent(t=[],e=!1,s=!1){return t.map((n,a)=>e&&a===0?l`<p><strong>${n}</strong></p>`:Array.isArray(n)?l`
                    <ul class="bullets">
                        ${n.map(r=>l`<li>${r}</li>`)}
                    </ul>
                `:s?l`<p><strong>${n}</strong></p>`:l`<p>${n}</p>`)}render(){return l`
            <div class="slides-card">
                <div class="center"></div>
            </div>
        `}createRenderRoot(){return this}checkScreenshotMode(){const t=new URL(window.location.href);this.isScreenshotMode=t.searchParams.has("screenshot"),this.isScreenshotMode&&(this.addScreenshotStyles(),this.showTitleMessage=!0)}addScreenshotStyles(){if(document.getElementById("screenshot-styles"))return;const t=document.createElement("style");t.id="screenshot-styles",t.textContent=`
            .btn { display: none !important; }
            #hamburger-menu { display: none !important; }
            .flex-video iframe { display: none !important; }
            .visual-indicator { display: none !important; }
            .video-replacement-message h1 { font-size: 3rem !important; }
        `,document.head.appendChild(t),console.log("Screenshot mode enabled")}getVideoInfo(){if(this.videoInfo={},zumeTrainingItems)try{Object.keys(zumeTrainingItems).forEach(t=>{const e=zumeTrainingItems[t];e&&e.video_id&&e.title_en&&(this.videoInfo[e.video_id]={title:e.title_en,title_en:e.title_en||e.title})})}catch(t){console.error("Error processing video information:",t)}}setTitleMessage(){let t="Video content is not available in this view.";if(this.slide&&this.slide.alt_video_id&&zumeTrainingItems[this.slide.alt_video_id]){let e=this.slide.alt_video_id;t=zumeTrainingItems[e].title_en}this.titleMessage=t}}customElements.define("course-slide",$t);class T1 extends $t{static get properties(){return{slide:{type:Object},id:{type:String},offCanvasId:{type:String,attribute:!1},activityUrl:{type:String,attribute:!1},loading:{type:Boolean,attribute:!1}}}connectedCallback(){super.connectedCallback(),this.handleLoad=this.handleLoad.bind(this)}async firstUpdated(){this.loading=!0,jQuery(this.renderRoot).foundation(),this.offCanvasId="activityOffCanvas"+this.id,this.offCanvasSelector="#"+this.offCanvasId,super.firstUpdated(),await this.updateComplete;const t=document.querySelector(this.offCanvasSelector+" iframe");t?t.onload=this.handleLoad:console.error("no iframe to attach onload to"),this.activityUrl=this.slide.right[0]}handleLoad(){this.loading=!1}openMenu(){const t=document.querySelector(this.offCanvasSelector);console.log(t,this.offCanvasSelector),jQuery(t).foundation("open")}closeMenu(){const t=document.querySelector(this.offCanvasSelector);jQuery(t).foundation("close")}closeButtonStyles(){return["t8_c"].includes(this.id)?"":"invert"}render(){return l`
            <div class="slides-card activity-slide | position-relative">
                ${this.renderProgressBar()}
                <div class="cover-slide">
                    <button
                        type="button"
                        class="activity-btn | btn icon-btn absolute top ${this.dir==="rtl"?"left":"right"} z-1 m-0 bypass-nav-click d-flex gap--2"
                        @click=${this.openMenu}
                    >
                        <span class="icon z-icon-info"></span><span>${jsObject.translations.view_activity}</span>
                    </button>
                    <h2 class="title text-center" data-small>${this.slide.center[0]} ${this.slide.length}</h2>
                    <div class="two-column right">
                        <div>
                            <div class="activity-card | stack--2" data-expanded-padding>
                                ${this.renderContent(this.slide.left,!0)}
                            </div>
                        </div>
                        <div class="content-area">
                            <div class="stack center | text-center">
                                <div class="qr-code"><a href="${this.slide.right[0]}" target="_blank" class="bypass-nav-click"><img src="${this.slide.right[1]}" /></a></div>
                                <p>${this.slide.right[2]}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="bg-white | activity-flyout bypass-nav-click off-canvas ${this.dir==="rtl"?"position-left":"position-right"}"
                    id=${this.offCanvasId||"activityOffCanvas"}
                    data-off-canvas
                    data-transition="overlap"
                >
                    <div class="ms-auto absolute ${this.dir==="rtl"?"left":"right"} top">
                        <button class="close-btn | my--2 mx-1 f-0 ${this.closeButtonStyles()}" aria-label=${jsObject.translations.close} type="button" data-close>
                            <span class="icon z-icon-close"></span>
                        </button>
                    </div>

                    ${this.loading?l`
                            <div class="cover-page">
                                <div class="center"><span class="loading-spinner active"></span></div>
                            </div>
                        `:""}
                    <iframe
                        src=${this.activityUrl||""}
                        frameborder="0"
                        width="100%"
                    ></iframe>
                </div>
            </div>
        `}}customElements.define("activity-slide",T1);class M1 extends $t{render(){return l`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="cover-slide">
                    <div class="grow-1 d-flex align-items-center">
                        <div class="center activity-card stack--2" data-large>
                            <span>${this.slide.center[0]}</span>
                            ${this.slide.center[1]?l`<span>${this.slide.center[1]}</span>`:""}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("break-slide",M1);class I1 extends $t{render(){var t,e;return l`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="cover-slide">
                    <h2 class="title text-center">${(t=this.slide.center[0])!==null&&t!==void 0?t:""} ${(e=this.slide.length)!==null&&e!==void 0?e:""}</h2>
                    <div class="center w-70 grow-1 justify-content-center">
                        <div class="stack--2 activity-card">
                            ${this.renderContent(this.slide.left,!0)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("center-slide",I1);class D1 extends $t{render(){return l`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon"><span class="icon z-icon-phone"></span></div>
                            <h2 class="title">${this.slide.left[0]}</h2>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack">
                            <p>${this.slide.right[0]}</p>
                            <div class="qr-code checkin-link">
                                <a
                                    href="${this.slide.right[1]}"
                                    class="bypass-nav-click"
                                    target="_blank"
                                >
                                    <img src="${this.slide.right[2]}" />
                                </a>
                            </div>
                            <p>${this.slide.right[3]} <span style="font-weight:bold;">${this.slide.right[4]}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("checkin-slide",D1);class L1 extends $t{render(){var t;return l`
            <div class="slides-card">
                <div class="cover-page container">
                    <div>
                        <div class="center activity-card" data-large>
                            <p>${this.slide.center[0]}</p>
                        </div>
                        <div class="center">
                          <p><img src="${(t=this.slide.center[1])!==null&&t!==void 0?t:""}" /></p>
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("congratulations-slide",L1);class N1 extends $t{render(){var t;return l`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon z-icon-discuss"></span>
                            </div>
                            <div class="stack">
                                <h2 class="title">${this.slide.left[0]}</h2>
                                <span class="subtitle">${(t=this.slide.length)!==null&&t!==void 0?t:""}</span>
                            </div>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack content-area__text">
                            ${this.renderContent(this.slide.right)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("discuss-slide",N1);class A1 extends $t{constructor(){super();const t=new URL(location.href);this.isTrainingMode=t.searchParams.has("training")}dispatchOpenMenu(){this.dispatchEvent(new CustomEvent("presenter:open-menu",{bubbles:!0}))}render(){return l`
            <div class="slides-card">
                <div class="cover-page">
                    <div class="center stack | text-center w-50">
                        <div class="w-30"><img src="${this.slide.center[0]}" /></div>
                        <p>${this.slide.center[1]}</p>
                        <div class="w-30"><img src="${this.slide.center[2]}" /></div>
                        <p>${this.slide.center[3]}</p>
                        ${this.isTrainingMode?"":l`
                                <a id="exit-course-btn" class="btn tight" href="${jsObject.home_url}">${jsObject.translations.home}</a>
                            `}
                        <button class="btn tight" @click=${this.dispatchOpenMenu}>${jsObject.translations.menu}</button>
                    </div>
                </div>
            </div>
        `}}customElements.define("final-slide",A1);class P1 extends $t{render(){return l`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column right">
                    <div>
                        <div class="cover-slide center text-center">
                            <p><strong>${this.slide.left[0]}</strong></p>
                            <div class="mw-60"><img src="${this.slide.left[1]}" /></div>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack center | text-center">
                            <div class="qr-code"><a href="${this.slide.right[0]}" target="_blank"><img src="${this.slide.right[1]}" /></a></div>
                            <p>${this.slide.right[2]}</p>
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("left-image-slide",P1);class z1 extends $t{render(){return l`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="cover-slide">
                    <h2 class="title text-center" data-small>${this.slide.center[0]}</h2>
                    <div class="two-column middle" data-align-start>
                        <div>
                            <div class="stack align-items-center">
                                <p><strong>${this.slide.left[0]}</strong></p>
                                <div class="qr-code"><a href="${this.slide.left[1]}" target="_blank"><img src="${this.slide.left[2]}" /></a></div>
                                <p>${this.slide.left[3]}</p>
                            </div>
                        </div>
                        <div>
                            <div class="stack align-items-center">
                                <p><strong>${this.slide.right[0]}</strong></p>
                                <div class="qr-code"><a href="${this.slide.right[1]}" target="_blank"><img src="${this.slide.right[2]}" /></a></div>
                                <p>${this.slide.right[3]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("next-steps-slide",z1);class R1 extends $t{render(){return l`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="obey-slide">
                    <div class="two-column left">
                        <div>
                            <div class="title-area">
                                <div class="title-icon">
                                    <span class="icon z-icon-obey-concept"></span>
                                </div>
                                <h2 class="title">${this.slide.left[0]}</h2>
                            </div>
                        </div>
                        <div class="content-area">
                            <p>${this.slide.right[0]}</p>
                        </div>
                    </div>
                    <div class="two-column left">
                        <div>
                            <div class="title-area">
                                <div class="title-icon">
                                    <span class="icon z-icon-share-concept"></span>
                                </div>
                                <h2 class="title">${this.slide.left[1]}</h2>
                            </div>
                        </div>
                        <div class="content-area">
                            <p>${this.slide.right[1]}</p>
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("obey-slide",R1);class F1 extends $t{render(){return l`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon z-icon-overview"></span>
                            </div>
                            <h2 class="title">${this.slide.left[0]}</h2>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack content-area__text">
                            ${this.renderContent(this.slide.right,!1,!0)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("overview-slide",F1);class U1 extends $t{render(){return l`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon z-icon-pray"></span>
                            </div>
                            <div class="stack">
                                <h2 class="title">${this.slide.left[0]}</h2>
                                <span class="subtitle">${this.slide.length}</span>
                            </div>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="activity-card stack--2" expanded-padding>
                            ${this.renderContent(this.slide.right)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("pray-slide",U1);class q1 extends $t{render(){return l`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon z-icon-review"></span>
                            </div>
                            <h2 class="title">${this.slide.left[0]}</h2>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack content-area__text">
                            ${this.renderContent(this.slide.right,!1,!0)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("review-slide",q1);class B1 extends $t{render(){return l`
            <div>
                <div class="slides-card">
                    ${this.renderProgressBar()}
                    <div class="cover-slide | title-slide | text-center">
                        <div class="stack-1 | w-100 grow-1 justify-content-center">
                            <div class="center | w-40"><img src=${this.slide.center[0]} /></div>
                            <h2>${this.slide.center[1]}</h2>
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("title-slide",B1);class V1 extends $t{static get properties(){return{slide:{type:Object},showButtons:{type:Boolean},id:{type:String},scriptUrl:{type:String,attribute:!1},altVideoUrl:{type:String,attribute:!1},offCanvasId:{type:String,attribute:!1},loading:{type:Boolean,attribute:!1},showTitleMessage:{type:Boolean},titleMessage:{type:String}}}connectedCallback(){super.connectedCallback(),this.useAltVideo=!window.zumeApiShare.getCookie("zume_video_available"),this.handleLoad=this.handleLoad.bind(this)}async firstUpdated(){jQuery(this.renderRoot).foundation(),this.offCanvasId="informationOffCanvas"+this.id,this.iframeId="iframe"+this.id,this.offCanvasSelector="#"+this.offCanvasId,this.altVideoUrl=jsObject.mirror_url+jsObject.language+"/"+this.slide.alt_video_id+".mp4",this.isScreenshotMode&&this.slide&&(console.log("VideoSlide firstUpdated - setting title message"),this.setTitleMessage()),await this.loadScriptIntoFrame(),super.firstUpdated()}openMenu(){const t=document.querySelector(this.offCanvasSelector);jQuery(t).foundation("open")}closeMenu(){const t=document.querySelector(this.offCanvasSelector);jQuery(t).foundation("close")}async loadScriptIntoFrame(){this.loading=!0;const t=this.slide.script_id,e=jsObject.language,s=new URL(location.href),n=new URL(s.origin);n.pathname=[e,"app","script"].join("/"),n.searchParams.append("s",t),await this.updateComplete;const a=this.getIframe();a?a.onload=this.handleLoad:console.error("no iframe to attach onload to"),this.scriptUrl=n.href}getIframe(){return this.renderRoot.querySelector(`#${this.offCanvasId} iframe`)}handleLoad(){if(this.loading=!1,/iPod|iPhone|iPad/.test(navigator.userAgent)){const e=this.getIframe().parentElement;e.style.height=window.innerHeight+"px"}}shouldAutoplay(){return!this.inContainer}maybeRemoveAutoplay(t){if(this.shouldAutoplay())return t;if(!t)return"";const e=new URL(t);return e.searchParams.delete("autoplay"),e.href}render(){return l`
            <div class="video-slide">

                <button
                    type="button"
                    class="btn tight outline align-items-center absolute top ${this.dir==="rtl"?"left":"right"} z-1 m--1 bypass-nav-click d-flex gap--2"
                    @click=${this.openMenu}
                >
                    <span class="icon z-icon-info"></span>
                    <span class="script-button__text">${jsObject.translations.view_script}</span>
                </button>

                <div class="widescreen flex-video">
                    ${this.showTitleMessage?l`
                            <div class="video-replacement-message">
                                <h1>${this.titleMessage} - Video ID: ${this.slide.alt_video_id}</h1>
                            </div>
                        `:this.useAltVideo?l`
                            <video
                                style="border: 1px solid lightgrey;max-width:100%;"
                                poster=${jsObject.images_url+"/video-thumb.jpg"}
                                controls
                                ?autoplay=${this.shouldAutoplay()}
                            >
                                <source src=${this.altVideoUrl||""} type="video/mp4">
                                Your browser does not support the video tag.
                                <a href=${this.altVideoUrl||""}>${jsObject.translations.watch_this_video}</a>
                            </video>
                        `:l`
                            <iframe src="${this.maybeRemoveAutoplay(this.slide.center[0])}"
                                frameborder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                            >
                            </iframe>
                        `}
                </div>
            </div>
            <div
                class="bg-white | information-flyout bypass-nav-click off-canvas ${this.dir==="rtl"?"position-left":"position-right"}"
                id=${this.offCanvasId||"informationOffCanvas"}
                data-off-canvas
                data-transition="overlap"
            >
                <div class="ms-auto absolute ${this.dir==="rtl"?"left":"right"} top">
                    <button class="close-btn | my--2 mx-1 f-0" aria-label=${jsObject.translations.close} type="button" data-close>
                        <span class="icon z-icon-close"></span>
                    </button>
                </div>
                ${this.loading?l`
                        <div class="cover-page">
                            <div class="center"><span class="loading-spinner active"></span></div>
                        </div>
                    `:""}
                <iframe
                    id=${this.iframeId||"iframe"}
                    src=${this.scriptUrl||""}
                    frameborder="0"
                    width="100%"
                    height="100%"
                >
                </iframe>
            </div>
        `}}customElements.define("video-slide",V1);class W1 extends $t{nextSlide(){this.dispatchEvent(new CustomEvent("next-slide",{bubbles:!0}))}render(){var t;return l`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon z-icon-course"></span>
                            </div>
                            <div class="stack">
                                <h2 class="title">${this.slide.left[0]}</h2>
                                <span class="subtitle">${(t=this.slide.length)!==null&&t!==void 0?t:""}</span>
                            </div>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack content-area__text">
                            ${this.renderContent(this.slide.right,!0)}
                            <div>
                                <button
                                    class="watch-btn | btn tight d-flex align-items-center gap--1"
                                    type="button"
                                    @click=${this.nextSlide}
                                >
                                    <span>${this.slide.left[0]}</span>
                                    <span class="icon z-icon-watch f-3"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("watch-slide",W1);class H1 extends $t{render(){return l`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon z-icon-look-back"></span>
                            </div>
                            <div class="stack">
                                <h2 class="title">${this.slide.left[0]}</h2>
                                <span class="subtitle">${this.slide.length}</span>
                            </div>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="activity-card | stack--2" expanded-padding>
                            ${this.renderContent(this.slide.right)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("look-back-slide",H1);const ka=["slideshow","guide"];class G1 extends B{static get properties(){return{languageCode:{type:String},zumeSessions:{attribute:!1},menu:{attribute:!1},lessonIndex:{attribute:!1},slideKey:{attribute:!1},view:{attribute:!1},linkNodes:{attribute:!1},showIndex:{attribute:!1},isTrainingMode:{attribute:!1}}}constructor(){super(),this.handleSessionLink=this.handleSessionLink.bind(this),this.handleHistoryPopState=this.handleHistoryPopState.bind(this),this.openMenu=this.openMenu.bind(this)}connectedCallback(){super.connectedCallback();const t=new URL(window.location.href),{sessions:e,menu:s}=this.getZumeSessions(t);this.zumeSessions=e,this.menu=s;const n=this.getLessonIndex(t);this.lessonIndex=n,this.slideKey="",this.slideKey=this.getSlideKey(t),this.view=this.getView(t),this.changeSession(n,!1,e),this.dir=document.querySelector("html").dir,this.isTrainingMode=t.searchParams.has("training"),this.isInIframe=t.searchParams.has("iframe"),this.numberOfTrainingSessions=3,window.addEventListener("popstate",this.handleHistoryPopState),window.addEventListener("presenter:open-menu",this.openMenu)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handleHistoryPopState)}firstUpdated(){window.addEventListener("load",()=>{this.isTrainingMode&&this.startTutorial()}),document.querySelectorAll(".language-selector").forEach(function(e){e.addEventListener("click",()=>{const s=e.dataset.value,n=new URL(location.href),a=n.pathname.substring(1).split("/");let r="";a.length>0&&jsObject.zume_languages.includes(a[0])?r=a.slice(1).join("/"):r=a.join("/"),s!=="en"?r="/"+s+"/"+r:r="/"+r,r+=n.search,location.href=r})})}startTutorial(){this.closeMenu();const t=[],e=document.querySelector(".checkin-link.qr-code");e&&t.push({element:e,intro:"Scan the QR code to check in and log your progress."}),t.push({element:document.querySelector("#hamburger-menu"),intro:"Using the menu you can navigate around the course and change language"}),t.push({element:document.querySelector(".visual-indicator.right"),intro:"Click towards the edges of the screen to change slides"});const s=document.querySelector(".progress-bar-wrapper");s&&t.push({element:s,intro:"The progress bar shows you how much of the course you have completed."}),window.introJs().setOptions({steps:t,nextLabel:jsObject.translations.next,prevLabel:jsObject.translations.previous,skipLabel:'<span class="icon z-icon-close"></span>',doneLabel:jsObject.translations.done,buttonClass:"btn tight bypass-nav-click"}).start()}getView(t){if(t.searchParams.has("view")){const e=t.searchParams.get("view");if(ka.includes(e))return e}else return"slideshow"}getLessonIndex(t){if(t.searchParams.has("session")){const e=t.searchParams.get("session");if(e==="index")return"index";const s=Number(e);return Number.isInteger(s)?s-1:0}else return 0}getSlideKey(t){return t.searchParams.has("slide")?t.searchParams.get("slide"):""}getZumeSessions(t){const e=t.searchParams.get("type")||"10";this.type=e;let s,n;switch(e){case"10":s=zume10Sessions,n=zume10SessionsMenu;break;case"20":s=zume20Sessions,n=zume20SessionsMenu;break;case"intensive":s=zumeIntensiveSessions,n=zumeIntensiveSessionsMenu;break;default:s=zume10Sessions,n=zume10SessionsMenu;break}return{sessions:s,menu:n}}handleSessionLink(t){const e=t.target,s=Number(e.dataset.sessionNumber);this.lessonIndex=s,this.showIndex===!0&&(this.showIndex=!1),this.changeSession(this.lessonIndex),this.closeMenu()}handleSubSectionLink(t,e){this.lessonIndex=t,this.showIndex===!0&&(this.showIndex=!1),this.changeSession(this.lessonIndex),this.slideKey=e,this.pushHistory(),this.closeMenu()}handleSetSlide(t){const e=t.detail.key;this.slideKey=e,this.pushHistory()}getNextSession(){this.lessonIndex+=1,this.changeSession(this.lessonIndex)}getPreviousSession(){this.lessonIndex-=1,this.changeSession(this.lessonIndex)}changeSession(t,e=!0,s=null){if(t==="index"){this.showIndex=!0;return}else this.showIndex=!1;const n=s||this.zumeSessions;let a=t;t<0&&(a=0),t>n.length-1&&(a=n.length-1),this.lessonIndex=a,this.session=n[a],e&&this.pushHistory()}pushHistory(){const t=this.lessonIndex,e=this.slideKey,s=this.view,n=new URL(window.location.href);t!==null&&Number.isInteger(t)&&n.searchParams.set("session",t+1),e!==""&&n.searchParams.set("slide",e),s&&n.searchParams.set("view",s),window.history.pushState(null,null,n.href)}handleHistoryPopState(){var t;const e=new URL(location.href),s=e.searchParams.has("session")?e.searchParams.get("session"):null,n=e.searchParams.has("slide")?e.searchParams.get("slide"):null,a=e.searchParams.get("view");(t=document.querySelector(".js-off-canvas-overlay"))===null||t===void 0||t.classList.remove("is-visible"),Number.isInteger(Number(s))&&(this.lessonIndex=s-1,this.changeSession(this.lessonIndex,!1)),s==="index"&&(this.lessonIndex="index",this.changeSession("index",!1)),this.slideKey=n,a&&ka.includes(a)&&(this.view=a)}getSessionSections(){return this.session?this.session:[]}switchViews(t=!0){this.view==="guide"?this.view="slideshow":this.view="guide",t===!0&&this.pushHistory()}openMenu(){const t=this.querySelector("#offCanvas");jQuery(t).foundation("open")}closeMenu(){const t=this.querySelector("#offCanvas");jQuery(t).foundation("close")}render(){this.showIndex;const t=this.type==="intensive"?"container-xsm":"container-sm";return l`
            ${this.showIndex?l`
                    <div class="course-index | bg-brand-gradient">
                        <img src="${jsObject.images_url}/zume-training-logo-white.svg" alt="Zume Logo" class="mx-auto w-70 py-1" />
                        <div class="${t}" data-max-width="750">
                            <div class="grid | grid-min-8rem gutter0">
                                ${this.zumeSessions.map((e,s)=>l`
                                    <button
                                        class="card-btn | m--2 gap--3 aspect-1 justify-content-evenly"
                                        data-session-number=${s}
                                        @click=${this.handleSessionLink}
                                    >
                                        <h2 class="f-0 bold">${jsObject.translations.session}</h2>
                                        <p class="f-3 bold lh-sm">${s+1}</p>
                                        <span class="icon z-icon-course brand-light f-3"></span>
                                    </button>
                                `)}
                            </div>
                        </div>
                    </div>
                `:""}

            <nav class="bg-white px-0 text-center | presenter-menu off-canvas ${this.dir==="rtl"?"position-right":"position-left"} justify-content-between py-1" id="offCanvas" data-off-canvas data-transition="overlap">
                <button class="ms-auto close-btn mb-0" aria-label=${jsObject.translations.close} type="button" data-close>
                    <span class="icon z-icon-close"></span>
                </button>
                <div class="stack">
                    <div class="stack">
                        <!-- Close button -->

                        <!-- Menu -->
                        <ul class="vertical menu accordion-menu" data-accordion-menu data-submenu-toggle="true" data-multi-open="false">
                            ${Object.values(this.menu).map(({title:e,submenu:s},n)=>l`
                                <li>
                                    <a
                                        class="session-link"
                                        data-session-number="${n}"
                                        @click=${a=>this.handleSessionLink(a)}
                                    >
                                        ${e}
                                    </a>
                                    <ul class="menu vertical nested ${this.lessonIndex===n?"is-active":""}">
                                        ${s.map(({key:a,title:r,length:o})=>l`
                                                <a
                                                    class="session-link"
                                                    data-subitem
                                                    href="#"
                                                    @click=${()=>this.handleSubSectionLink(n,a)}
                                                >
                                                    <span>${r}</span> <span>${o}</span>
                                                </a>
                                            `)}
                                    </ul>
                                </li>
                            `)}
                        </ul>
                    </div>
                    <div class="">
                        <div class="cluster">
                            ${this.isInIframe?"":l`
                                    <a class="btn tight" href="${jsObject.home_url}">${jsObject.translations.home}</a>
                                `}
                            <button class="btn d-flex align-items-center justify-content-center gap--4 tight" data-open="language-menu-reveal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" class="ionicon" viewBox="0 0 512 512"><path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M256 48c-58.07 0-112.67 93.13-112.67 208S197.93 464 256 464s112.67-93.13 112.67-208S314.07 48 256 48z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M117.33 117.33c38.24 27.15 86.38 43.34 138.67 43.34s100.43-16.19 138.67-43.34M394.67 394.67c-38.24-27.15-86.38-43.34-138.67-43.34s-100.43 16.19-138.67 43.34" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M256 48v416M464 256H48"/></svg>
                                ${this.languageCode}
                            </button>
                            <button class="btn tight outline" @click=${()=>this.switchViews()}>
                                ${this.view==="slideshow"?jsObject.translations.list_view:jsObject.translations.slide_view}
                            </button>
                            <button class="btn tight" @click=${this.startTutorial}>?</button>
                        </div>
                    </div>
                </div>
            </nav>

            <span class="p-1 d-block fixed top z-2">
                <button id="hamburger-menu" class="nav-toggle show ${this.showIndex?"invert":""}" @click=${this.openMenu}>
                    <span class="hamburger"></span>
                </button>
            </span>

            <div class="">
                ${this.view==="guide"?l`
                        <course-guide
                            .sections=${this.getSessionSections()}
                            ?trainingMode=${this.isTrainingMode}
                        ></course-guide>`:l`
                        <course-slideshow
                            .sections=${this.getSessionSections()}
                            slideKey=${this.slideKey}
                            @set-slide=${this.handleSetSlide}
                            ?trainingMode=${this.isTrainingMode}
                        ></course-slideshow>`}
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-presenter",G1);class Z1 extends B{static get properties(){return{sections:{type:Array}}}render(){return l`
            <div class="course-guide">
                <div class="stack | py-4 snap-content" data-outline-slides>
                    ${wt(this.sections,t=>t.key,t=>l`
                            <div class="slide-switcher">
                                <slide-switcher
                                    .slide=${t}
                                    ?inContainer=${!0}
                                ></slide-switcher>
                            </div>
                        `)}
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-guide",Z1);class K1 extends B{static get properties(){return{sections:{type:Array},slideKey:{type:String},sectionIndex:{attribute:!1},currentSlide:{attribute:!1}}}constructor(){super(),this.reset(),this.sections=[],this.slideKey="",this.listenForKeyboard=this.listenForKeyboard.bind(this),this.listenForMouseClick=this.listenForMouseClick.bind(this);const t=document.querySelector("html").getAttribute("dir");this.isRtl=t==="rtl",this.nextSlide=this.nextSlide.bind(this)}reset(){this.sectionIndex=-1,this.currentSlide=null}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.listenForKeyboard),document.addEventListener("mousedown",this.listenForMouseClick),document.addEventListener("next-slide",this.nextSlide)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.listenForKeyboard),document.removeEventListener("mousedown",this.listenForMouseClick),document.removeEventListener("next-slide",this.nextSlide)}update(t){if(t.has("sections")&&this.reset(),t.has("slideKey")&&this.slideKey!==""){const e=this.sections.findIndex(({key:s})=>s===this.slideKey);this.updateSlide(e)}super.update(t)}nextSlide(){if(this.sectionIndex>=this.sections.length-1){this.sectionIndex=this.sections.length-1;return}this.setSlide(this.sectionIndex+1)}previousSlide(){this.sectionIndex<0&&(this.sectionIndex=0),this.setSlide(this.sectionIndex-1)}leftSlide(){this.isRtl?this.nextSlide():this.previousSlide()}rightSlide(){this.isRtl?this.previousSlide():this.nextSlide()}listenForKeyboard(t){["ArrowRight"].includes(t.code)&&this.rightSlide(),["Space"].includes(t.code)&&this.nextSlide(),["ArrowLeft"].includes(t.code)&&this.leftSlide(),["Backspace"].includes(t.code)&&this.previousSlide()}listenForMouseClick(t){if(t.target.id==="hamburger-menu")return;const e=h=>h.id==="offCanvas"||h.classList.contains("js-off-canvas-overlay")||h.classList.contains("bypass-nav-click");if(this.hasParent(t.target,e))return;const{x:s,type:n,which:a}=t;if(n!=="mousedown"||a!==1)return;const{innerWidth:r}=window,o=(this.isRtl,1/4*r);s<o&&this.leftSlide(),s>r-o&&this.rightSlide()}hasParent(t,e){let s=t;const n=50;let a=0;for(;s;){if(e(s))return!0;if(s=s.parentElement,a=a+1,a>n)return!1}return!1}setSlide(t,e=!0){const s=this.sections[t];e&&s&&this.dispatchEvent(new CustomEvent("set-slide",{detail:{key:s.key}}))}updateSlide(t){if(t===-1)return;this.sectionIndex=t;const e=this.sections[t];this.currentSlide=e}isFirstSlide(){return this.sectionIndex===0}isSecondSlide(){return this.sectionIndex===1}isLastSlide(){return this.sectionIndex===this.sections.length-1}render(){return this.sectionIndex<0&&this.setSlide(0),l`
            <div class="cover-page course-slideshow" data-index=${this.sectionIndex}>
                <div>
                    <slide-switcher .slide=${this.currentSlide} showControls></slide-switcher>
                </div>
                <div class="visual-indicator left ${this.isRtl&&this.isFirstSlide()||this.isSecondSlide()?"show":""} ${!this.isRtl&&this.isFirstSlide()||this.isRtl&&this.isLastSlide()?"off":""}">
                    <img
                        src="${jsObject.images_url}/chevron.svg"
                        alt=${jsObject.translations.previous_slide}
                        class="svg white rotate-90"
                    />
                </div>
                <div class="visual-indicator right ${!this.isRtl&&this.isFirstSlide()||this.isSecondSlide()?"show":""} ${this.isRtl&&this.isFirstSlide()||!this.isRtl&&this.isLastSlide()?"off":""}">
                    <img
                        src="${jsObject.images_url}/chevron.svg"
                        alt=${jsObject.translations.next_slide}
                        class="svg white rotate--90"
                    />
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-slideshow",K1);class Y1 extends B{static get properties(){return{slide:{type:Object},showControls:{type:Boolean},inContainer:{type:Boolean}}}render(){if(this.slide)switch(this.slide.type){case"title":return l`<title-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></title-slide>`;case"checkin":return l`<checkin-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></checkin-slide>`;case"pray":return l`<pray-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></pray-slide>`;case"review":return l`<review-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></review-slide>`;case"overview":return l`<overview-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></overview-slide>`;case"challenge":case"center":return l`<center-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></center-slide>`;case"watch":return l`<watch-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></watch-slide>`;case"video":return l`<video-slide .slide=${this.slide} id=${this.slide.key} ?showButtons=${this.showControls} ?inContainer=${this.inContainer}></video-slide>`;case"look_back":return l`<look-back-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></look-back-slide>`;case"discuss":return l`<discuss-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></discuss-slide>`;case"left_content":case"activity":return l`<activity-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></activity-slide>`;case"obey":return l`<obey-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></obey-slide>`;case"left_image":return l`<left-image-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></left-image-slide>`;case"next_steps":return l`<next-steps-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></next-steps-slide>`;case"break":return l`<break-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></break-slide>`;case"congratulations":return l`<congratulations-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></congratulations-slide>`;case"final":return l`<final-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></final-slide>`;default:return l`<course-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></course-slide>`}}createRenderRoot(){return this}}customElements.define("slide-switcher",Y1);class Q1 extends B{static get properties(){return{questions:{type:Array},translations:{type:Object},contact_id:{type:String},user_id:{type:String},showCancel:{type:Boolean},answers:{type:Array,attribue:!1},error:{type:Boolean,attribute:!1},loading:{type:Boolean,attribute:!1}}}constructor(){super(),this.questions=[],this.answers=[],this.translations=[],this.contact_id="",this.user_id="",this.error=!1,this.loading=!1}handleInputChange(t){const e=t.target.dataset.i;this.answers[e]=t.target.value,this.update()}handleCancel(){this.clearAnswers(),this.dispatchEvent(new CustomEvent("3-month-plan-cancelled",{bubbles:!0}))}handleSave(){this.loading=!0;const t=[];if(this.answers.length===0){this.loading=!1;return}return this.answers.forEach((e,s)=>{if(e){const a=this.questions[s];var n=new Date;n.setDate(n.getDate()+30);const r=F.post("commitment",{question:a,answer:e,date:n,category:"post_training_plan"});t.push(r)}}),Promise.all(t).then(()=>{this.loading=!1,this.clearAnswers(),this.dispatchEvent(new CustomEvent("3-month-plan-saved",{bubbles:!0}))}).catch(e=>{console.error(e),this.error=!0,this.loading=!1})}clearAnswers(){this.renderRoot.querySelectorAll(".post-training-plan").forEach(t=>{t.value=""})}render(){const t=this.loading||this.answers.length===0;return l`
            <div id="pieces-content" class="stack">
                ${this.questions.map((e,s)=>{const n=`question-${s}`;return l`
                        <div class="stack--3">
                            <label for=${n}>${e}</label>
                            <textarea
                                id=${n}
                                data-i=${s}
                                type="text"
                                class="input post-training-plan"
                                rows="1"
                                @input=${this.handleInputChange}
                            ></textarea>
                        </div>
                `})}
                <div class="cluster justify-flex-end">
                    ${this.showCancel?l`
                            <button
                                class="btn outline uppercase"
                                @click=${this.handleCancel}
                            >
                                ${this.translations.cancel}
                            </button>
                            `:""}
                    <button
                        ?disabled=${t}
                        aria-disabled=${t?"true":"false"}
                        class="btn"
                        @click=${this.handleSave}
                    >
                        ${this.translations.save}
                        <span class="loading-spinner ${this.loading?"active":""}"></span>
                    </button>

                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("activity-3-month-plan",Q1);jQuery(document).ready(()=>{const i=Hs("zume_language")||"en";let t=i;i.includes("_")?t=i.replace("_","-"):i.length===4&&(t=i.slice(0,2)+"-"+i.slice(2)),it.defaultLocale=t,td(),document.querySelectorAll(".video-player").forEach(s=>{const n=s.getAttribute("data-video-src"),a=s.getAttribute("data-video-alt-src"),r=s.querySelector("iframe"),o=s.querySelector(".video-trigger");if(!o||!r||!n){console.log(".video-player is missing something (.video-trigger || iframe || data-video-src)");return}const h=r.cloneNode();r.parentNode.insertBefore(h,r),r.remove(),o.addEventListener("click",u);function u(y){if(console.log(y,n),Hs("zume_video_available"))h.src=n;else{const j=document.createElement("video");j.src=a,j.controls=!0,j.autoplay=!0,h.parentNode.insertBefore(j,h),h.remove()}o.style.display="none"}})});function td(){return Hs("zume_video_available")?Promise.resolve(!0):fetch("https://api.vimeo.com/tutorial",{headers:{Authorization:`bearer ${window.zumeApiShare.zume_vimeo_api_key}`}}).then(i=>(i.ok&&sd("zume_video_available",1,"",1),!0))}function Ui(i){return Object.fromEntries(Object.entries(i).map(([t,e])=>[t,ed(e)]))}function ed(i){return typeof i>"u"?"":typeof i!="string"?i:i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}function sd(i,t,e="",s=0){let n=`${i}=${t};`;if(Number.isInteger(s)&&s>0){var a=new Date;a.setTime(a.getTime()+s*24*60*60*1e3),n+="expires="+a.toUTCString()+";"}if(e){let r=window.location.pathname.split(e)[0]+e;r=r.replace(/^\/?([^\/]+(?:\/[^\/]+)*)\/?$/,"/$1"),n+="path="+r+";"}document.cookie=n}function Hs(i){const t=document.cookie?Object.fromEntries(document.cookie.split(";").map(e=>e.trim().split("="))):{};return i in t?t[i]:!1}window.zumeApiShare.escapeObject=Ui;window.zumeApiShare.escapeHTML=ed;window.zumeApiShare.setCookie=sd;window.zumeApiShare.getCookie=Hs;
//# sourceMappingURL=main-bundle.js.map
