var ga=Object.defineProperty;var ba=(i,t,e)=>t in i?ga(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var E=(i,t,e)=>(ba(i,typeof t!="symbol"?t+"":t,e),e),ts=(i,t,e)=>{if(!t.has(i))throw TypeError("Cannot "+e)};var L=(i,t,e)=>(ts(i,t,"read from private field"),e?e.call(i):t.get(i)),B=(i,t,e)=>{if(t.has(i))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(i):t.set(i,e)},ht=(i,t,e,s)=>(ts(i,t,"write to private field"),s?s.call(i,e):t.set(i,e),e);var V=(i,t,e)=>(ts(i,t,"access private method"),e);const bs={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(i){var t="",e,s,n,a,r,o,c,d=0;for(i=bs._utf8_encode(i);d<i.length;)e=i.charCodeAt(d++),s=i.charCodeAt(d++),n=i.charCodeAt(d++),a=e>>2,r=(e&3)<<4|s>>4,o=(s&15)<<2|n>>6,c=n&63,isNaN(s)?o=c=64:isNaN(n)&&(c=64),t=t+this._keyStr.charAt(a)+this._keyStr.charAt(r)+this._keyStr.charAt(o)+this._keyStr.charAt(c);return t},decode:function(i){var t="",e,s,n,a,r,o,c,d=0;for(i=i.replace(/[^A-Za-z0-9\+\/\=]/g,"");d<i.length;)a=this._keyStr.indexOf(i.charAt(d++)),r=this._keyStr.indexOf(i.charAt(d++)),o=this._keyStr.indexOf(i.charAt(d++)),c=this._keyStr.indexOf(i.charAt(d++)),e=a<<2|r>>4,s=(r&15)<<4|o>>2,n=(o&3)<<6|c,t=t+String.fromCharCode(e),o!=64&&(t=t+String.fromCharCode(s)),c!=64&&(t=t+String.fromCharCode(n));return t=bs._utf8_decode(t),t},_utf8_encode:function(i){i=i.replace(/\r\n/g,`
`);for(var t="",e=0;e<i.length;e++){var s=i.charCodeAt(e);s<128?t+=String.fromCharCode(s):s>127&&s<2048?(t+=String.fromCharCode(s>>6|192),t+=String.fromCharCode(s&63|128)):(t+=String.fromCharCode(s>>12|224),t+=String.fromCharCode(s>>6&63|128),t+=String.fromCharCode(s&63|128))}return t},_utf8_decode:function(i){let t="",e=0,s=0,n=0,a=0;for(;e<i.length;)s=i.charCodeAt(e),s<128?(t+=String.fromCharCode(s),e++):s>191&&s<224?(n=i.charCodeAt(e+1),t+=String.fromCharCode((s&31)<<6|n&63),e+=2):(n=i.charCodeAt(e+1),a=i.charCodeAt(e+2),t+=String.fromCharCode((s&15)<<12|(n&63)<<6|a&63),e+=3);return t}},Ws=i=>bs.encode(JSON.stringify(i));class va{constructor(t,e,s){E(this,"mutationCallback",t=>{for(let e of t)if(e.type==="attributes"&&e.attributeName==="data-"+this.dataName){let s=e.target.dataset[this.dataName];this.changedCallback(s,this.lastDataState),this.lastDataState=s}});this.node=t,this.dataName=e,this.changedCallback=s,this.observer=null,this.lastDataState=t.classList.contains(this.dataName),this.init()}init(){this.observer=new MutationObserver(this.mutationCallback),this.observe()}observe(){this.observer.observe(this.node,{attributes:!0})}disconnect(){this.observer.disconnect()}}const te={},Lt=i=>{delete te[i]},at=(i,t)=>{const e=i.querySelectorAll(".zume-collapse");(!Object.prototype.hasOwnProperty.call(te,t)||te[t].length===0)&&(te[t]=[],e.forEach(n=>{const a=new va(n,"expand",s);te[t].push(a)}));function s(n,a){if(n===a)return;const r=n==="",o=this.node,c=o.scrollHeight,d="200";r?(o.style.display="block",o.style.transitionDuration=d+"ms",o.dataset.state="opening",setTimeout(()=>{o.style.height=o.scrollHeight+"px"},10),setTimeout(()=>{o.style.height="auto",o.dataset.state="open"},d)):(o.style.height=c+"px",o.dataset.state="closing",setTimeout(()=>{o.style.height="0"},10),setTimeout(()=>{o.dataset.state="closed",o.style.display="none"},d))}};class ya{constructor(t,e,s){this.root=t,this.base=e,this.nonce=s,this.fetch=this.fetch.bind(this),this.get=this.get.bind(this),this.post=this.post.bind(this),this.put=this.put.bind(this),this.update=this.update.bind(this),this.delete=this.delete.bind(this)}fetch(t,e,s={},n=""){let a=this.base;n.length>0&&(a=n),!this.base.endsWith("/")&&!e.startsWith("/")&&(a+="/");let r=`${this.root}${a}${e}`;if(t==="GET"&&Object.keys(s).length>0){const o=new URLSearchParams(s);r+="?"+o.toString()}return fetch(r,{method:t,headers:{"Content-Type":"application/json; charset=utf-8","X-WP-Nonce":this.nonce},body:t==="GET"?null:JSON.stringify(s)}).then(o=>Promise.all([Promise.resolve(o.ok),o.json()])).then(([o,c])=>{if(!o)throw new Error(c.code);return c})}get(t,e={},s=""){return this.fetch("GET",t,e,s)}post(t,e={},s=""){return this.fetch("POST",t,e,s)}put(t,e={},s=""){return this.fetch("PUT",t,e,s)}update(t,e={},s=""){return this.fetch("UPDATE",t,e,s)}delete(t,e={},s=""){return this.fetch("DELETE",t,e,s)}}const _=new ya(window.zumeApiShare.root,"zume_system/v1",window.zumeApiShare.nonce);window.zumeRequest=_;var gs;let $a=(gs=class{static save(t,e){localStorage.setItem(this.createKey(t),JSON.stringify(e))}static load(t){const e=localStorage.getItem(this.createKey(t));try{return JSON.parse(e)}catch{return e}}static createKey(t){return this.prefix+t}},E(gs,"prefix","Z5_"),gs);window.ZumeStorage=$a;var N,Re,Ri,Fe,Fi,Ue,Ui,Ft,je,ce,vs,de,ys;const qe=class qe{constructor(t){B(this,Re);B(this,Fe);B(this,Ue);B(this,Ft);B(this,ce);B(this,de);E(this,"WIZARD_STATE_NAME","zume_wizard_state");E(this,"STALE_LIFESPAN",10*60*1e3);E(this,"MAX_LIFESPAN",60*60*1e3);B(this,N,void 0);E(this,"moduleName");this.moduleName=t,V(this,Re,Ri).call(this),V(this,Ft,je).call(this)}static getInstance(t){return this.instance||(this.instance=new qe(t)),this.instance.useModule(t),this.instance}useModule(t){this.moduleName=t,this.moduleName in L(this,N).data||(L(this,N).data[this.moduleName]={})}isEmpty(){return Object.keys(L(this,N).data[this.moduleName]).length===0}isDataStale(){return V(this,de,ys).call(this,L(this,N),this.STALE_LIFESPAN)}has(t){return Object.prototype.hasOwnProperty.call(L(this,N).data[this.moduleName],t)}get(t){return L(this,N).data[this.moduleName][t]}getAll(){return L(this,N).data[this.moduleName]}add(t,e){L(this,N).data[this.moduleName][t]=e,V(this,Ft,je).call(this)}remove(t){delete L(this,N).data[this.moduleName][t],V(this,Ft,je).call(this)}clear(){L(this,N).data[this.moduleName]={},V(this,ce,vs).call(this)}};N=new WeakMap,Re=new WeakSet,Ri=function(){const t=V(this,Ue,Ui).call(this);t&&!V(this,de,ys).call(this,t,this.MAX_LIFESPAN)?ht(this,N,t):ht(this,N,V(this,Fe,Fi).call(this)),this.useModule(this.moduleName)},Fe=new WeakSet,Fi=function(){return{data:{[this.moduleName]:{}},timestamp:Date.now()}},Ue=new WeakSet,Ui=function(){return JSON.parse(localStorage.getItem(this.WIZARD_STATE_NAME))},Ft=new WeakSet,je=function(){V(this,ce,vs).call(this),localStorage.setItem(this.WIZARD_STATE_NAME,JSON.stringify(L(this,N)))},ce=new WeakSet,vs=function(){L(this,N).timestamp=Date.now()},de=new WeakSet,ys=function(t,e){return Date.now()-t.timestamp>e},E(qe,"instance");let ot=qe;const y={gettingStarted:"getting-started",makeAGroup:"make-a-group",makeFirstGroup:"make-first-group",makeMoreGroups:"make-more-groups",getACoach:"get-a-coach",joinATraining:"join-a-training",joinATrainingWithCode:"join-a-training-with-code",planDecision:"plan-decision",notifyOfFutureTrainings:"notify-of-future-trainings",connectWithFriend:"connect-with-friend",joinFriendsPlan:"join-friends-training",checkin:"checkin",setProfile:"set-profile",joinCommunity:"join-the-community",joinCommunityFromVision:"join-the-community-vision",inviteFriends:"invite"},z={completeProfile:"completeProfile",makePlan:"makePlan",inviteFriends:"inviteFriends",getACoach:"getACoach",joinTraining:"joinTraining",connectFriend:"connectFriend",joinFriendsTraining:"joinFriendsTraining",notifyOfFutureTrainings:"notifyOfFutureTrainings",checkin:"checkin",planDecision:"planDecision",joinCommunity:"joinCommunity",joinCommunityFromVision:"joinCommunityFromVision"},wa={planDecision:"plan-decision",howManySessions:"how-many-sessions",scheduleDecision:"schedule-decision",howOften:"how-often",startDate:"what-start-date",timeNote:"time-note",location:"what-location",review:"review-steps",name:"group-name"},h={updateName:"update-your-name",updateLocation:"update-your-location",updatePhone:"update-your-phone",inviteFriends:"invite-friends",requestCoachExplanation:"request-coach-explanation",contactPreferences:"contact-preferences",languagePreferences:"preferred-language",howCanWeServe:"how-can-we-serve",connectingToCoach:"connecting-to-coach",joinTraining:"public-training",joinTrainingSelection:"public-training-selection",connectToFriend:"connect-friend",joinFriendsPlan:"friend-training",joinWithCode:"join-with-code",confirmPlan:"confirm-plan",checkinSubmit:"checkin-submit",joinCommunity:"join-community",joinCommunityExplanation:"join-community-explanation",notifyOfFutureTrainings:"notify-of-future-trainings",...wa},_a={[h.updateName]:{field:"name",testExistance:(i,t)=>t.has_set_name},[h.updateLocation]:{field:"location",testExistance:i=>!(i.source&&i.source==="ip")},[h.updatePhone]:{field:"phone",testExistance:i=>!!i}},ka={[y.gettingStarted]:{[z.completeProfile]:H([h.updateName,h.updateLocation,h.planDecision],!1)},[y.planDecision]:{[z.planDecision]:H([h.planDecision],!1)},[y.setProfile]:{[z.completeProfile]:H([h.updateName,h.updateLocation],!0)},[y.makeFirstGroup]:{[z.makePlan]:H([h.howManySessions,h.scheduleDecision,h.howOften,h.startDate,h.location,h.review],!0)},[y.makeMoreGroups]:{[z.makePlan]:H([h.howManySessions,h.scheduleDecision,h.howOften,h.startDate,h.location,h.name,h.review],!0)},[y.inviteFriends]:{[z.inviteFriends]:H([h.inviteFriends],!0)},[y.getACoach]:{[z.getACoach]:H([h.requestCoachExplanation,h.updateName,h.updateLocation,h.updatePhone,h.contactPreferences,h.languagePreferences,h.howCanWeServe,h.connectingToCoach],!0)},[y.joinATraining]:{[z.joinTraining]:H([h.joinTrainingSelection,h.confirmPlan,h.updateName,h.updateLocation,h.contactPreferences,h.updatePhone,h.joinTraining])},[y.connectWithFriend]:{[z.connectFriend]:H([h.updateName,h.updateLocation,h.connectToFriend])},[y.joinFriendsPlan]:{[z.joinFriendsTraining]:H([h.confirmPlan,h.updateName,h.updateLocation,h.joinFriendsPlan])},[y.joinCommunity]:{[z.joinCommunity]:H([h.joinCommunityExplanation,h.contactPreferences,h.updatePhone,h.updateLocation,h.joinCommunity],!0)},[y.joinCommunityFromVision]:{[z.joinCommunityFromVision]:H([h.joinCommunityExplanation,h.updateName,h.updateLocation,h.contactPreferences,h.updatePhone,h.languagePreferences,h.joinCommunity],!0)},[y.checkin]:{[z.checkin]:H([h.checkinSubmit],!0)},[y.notifyOfFutureTrainings]:{[z.notifyOfFutureTrainings]:H([h.notifyOfFutureTrainings],!0)}};function H(i=[],t=!1){const e={steps:[],skippable:t};return i.forEach(s=>{Object.values(h).includes(s)&&e.steps.push(s)}),e}var gt,Ct,We,qi,Ve,Wi,He,Vi;class Sa{constructor(t){B(this,We);B(this,Ve);B(this,He);B(this,gt,void 0);B(this,Ct,void 0);E(this,"profile");ht(this,gt,{}),ht(this,Ct,[]),this.profile=t}reset(){ht(this,gt,{})}isTypeValid(t){return!!Object.values(y).includes(t)}isLoaded(){return Object.keys(L(this,gt)).length!==0}getSteps(t){return V(this,Ve,Wi).call(this,t),L(this,Ct)}updateProfile(t){this.profile=t}}gt=new WeakMap,Ct=new WeakMap,We=new WeakSet,qi=function(t){return this.isTypeValid(t)?ka[t]:{}},Ve=new WeakSet,Wi=function(t){const e=V(this,We,qi).call(this,t);typeof e=="object"&&Object.keys(e).length===0||V(this,He,Vi).call(this,e)},He=new WeakSet,Vi=function(t){ht(this,gt,t),ht(this,Ct,[]),Object.entries(L(this,gt)).forEach(([e,{steps:s,skippable:n}])=>{s.forEach(a=>{const r=_a[a];let o=null;if(r&&this.profile){if(r.testExistance(this.profile[r.field],this.profile))return;o=this.profile[r.field]}const c={slug:a,module:e,skippable:n};o!==null&&(c.value=o),L(this,Ct).push(c)})})};/**
* @license
* Copyright 2019 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const Oe=window,Ts=Oe.ShadowRoot&&(Oe.ShadyCSS===void 0||Oe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ms=Symbol(),Vs=new WeakMap;let Hi=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Ms)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Ts&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Vs.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Vs.set(e,t))}return t}toString(){return this.cssText}};const ja=i=>new Hi(typeof i=="string"?i:i+"",void 0,Ms),Is=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,n,a)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[a+1],i[0]);return new Hi(e,i,Ms)},Oa=(i,t)=>{Ts?i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const s=document.createElement("style"),n=Oe.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)})},Hs=Ts?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ja(e)})(i):i;/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/var es;const Ie=window,Bs=Ie.trustedTypes,Ca=Bs?Bs.emptyScript:"",Gs=Ie.reactiveElementPolyfillSupport,$s={toAttribute(i,t){switch(t){case Boolean:i=i?Ca:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Bi=(i,t)=>t!==i&&(t==t||i==i),ss={attribute:!0,type:String,converter:$s,reflect:!1,hasChanged:Bi},ws="finalized";let Dt=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const n=this._$Ep(s,e);n!==void 0&&(this._$Ev.set(n,s),t.push(n))}),t}static createProperty(t,e=ss){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s=typeof t=="symbol"?Symbol():"__"+t,n=this.getPropertyDescriptor(t,s,e);n!==void 0&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(n){const a=this[t];this[e]=n,this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||ss}static finalize(){if(this.hasOwnProperty(ws))return!1;this[ws]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const n of s)this.createProperty(n,e[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const n of s)e.unshift(Hs(n))}else t!==void 0&&e.push(Hs(t));return e}static _$Ep(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Oa(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=ss){var n;const a=this.constructor._$Ep(t,s);if(a!==void 0&&s.reflect===!0){const r=(((n=s.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?s.converter:$s).toAttribute(e,s.type);this._$El=t,r==null?this.removeAttribute(a):this.setAttribute(a,r),this._$El=null}}_$AK(t,e){var s;const n=this.constructor,a=n._$Ev.get(t);if(a!==void 0&&this._$El!==a){const r=n.getPropertyOptions(a),o=typeof r.converter=="function"?{fromAttribute:r.converter}:((s=r.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?r.converter:$s;this._$El=a,this[a]=o.fromAttribute(e,r.type),this._$El=null}}requestUpdate(t,e,s){let n=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||Bi)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,a)=>this[a]=n),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(n=>{var a;return(a=n.hostUpdate)===null||a===void 0?void 0:a.call(n)}),this.update(s)):this._$Ek()}catch(n){throw e=!1,this._$Ek(),n}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var n;return(n=s.hostUpdated)===null||n===void 0?void 0:n.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};Dt[ws]=!0,Dt.elementProperties=new Map,Dt.elementStyles=[],Dt.shadowRootOptions={mode:"open"},Gs==null||Gs({ReactiveElement:Dt}),((es=Ie.reactiveElementVersions)!==null&&es!==void 0?es:Ie.reactiveElementVersions=[]).push("1.6.3");/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/var is;const ze=window,Ut=ze.trustedTypes,Zs=Ut?Ut.createPolicy("lit-html",{createHTML:i=>i}):void 0,De="$lit$",rt=`lit$${(Math.random()+"").slice(9)}$`,zs="?"+rt,xa=`<${zs}>`,xt=document,ae=()=>xt.createComment(""),re=i=>i===null||typeof i!="object"&&typeof i!="function",Gi=Array.isArray,Zi=i=>Gi(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",ns=`[ 	
\f\r]`,Qt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ks=/-->/g,Qs=/>/g,$t=RegExp(`>|${ns}(?:([^\\s"'>=/]+)(${ns}*=${ns}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ys=/'/g,Js=/"/g,Ki=/^(?:script|style|textarea|title)$/i,Qi=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),l=Qi(1),ve=Qi(2),et=Symbol.for("lit-noChange"),P=Symbol.for("lit-nothing"),Xs=new WeakMap,jt=xt.createTreeWalker(xt,129,null,!1);function Yi(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Zs!==void 0?Zs.createHTML(t):t}const Ji=(i,t)=>{const e=i.length-1,s=[];let n,a=t===2?"<svg>":"",r=Qt;for(let o=0;o<e;o++){const c=i[o];let d,u,p=-1,m=0;for(;m<c.length&&(r.lastIndex=m,u=r.exec(c),u!==null);)m=r.lastIndex,r===Qt?u[1]==="!--"?r=Ks:u[1]!==void 0?r=Qs:u[2]!==void 0?(Ki.test(u[2])&&(n=RegExp("</"+u[2],"g")),r=$t):u[3]!==void 0&&(r=$t):r===$t?u[0]===">"?(r=n??Qt,p=-1):u[1]===void 0?p=-2:(p=r.lastIndex-u[2].length,d=u[1],r=u[3]===void 0?$t:u[3]==='"'?Js:Ys):r===Js||r===Ys?r=$t:r===Ks||r===Qs?r=Qt:(r=$t,n=void 0);const g=r===$t&&i[o+1].startsWith("/>")?" ":"";a+=r===Qt?c+xa:p>=0?(s.push(d),c.slice(0,p)+De+c.slice(p)+rt+g):c+rt+(p===-2?(s.push(void 0),o):g)}return[Yi(i,a+(i[e]||"<?>")+(t===2?"</svg>":"")),s]};class oe{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let a=0,r=0;const o=t.length-1,c=this.parts,[d,u]=Ji(t,e);if(this.el=oe.createElement(d,s),jt.currentNode=this.el.content,e===2){const p=this.el.content,m=p.firstChild;m.remove(),p.append(...m.childNodes)}for(;(n=jt.nextNode())!==null&&c.length<o;){if(n.nodeType===1){if(n.hasAttributes()){const p=[];for(const m of n.getAttributeNames())if(m.endsWith(De)||m.startsWith(rt)){const g=u[r++];if(p.push(m),g!==void 0){const $=n.getAttribute(g.toLowerCase()+De).split(rt),j=/([.?@])?(.*)/.exec(g);c.push({type:1,index:a,name:j[2],strings:$,ctor:j[1]==="."?tn:j[1]==="?"?en:j[1]==="@"?sn:he})}else c.push({type:6,index:a})}for(const m of p)n.removeAttribute(m)}if(Ki.test(n.tagName)){const p=n.textContent.split(rt),m=p.length-1;if(m>0){n.textContent=Ut?Ut.emptyScript:"";for(let g=0;g<m;g++)n.append(p[g],ae()),jt.nextNode(),c.push({type:2,index:++a});n.append(p[m],ae())}}}else if(n.nodeType===8)if(n.data===zs)c.push({type:2,index:a});else{let p=-1;for(;(p=n.data.indexOf(rt,p+1))!==-1;)c.push({type:7,index:a}),p+=rt.length-1}a++}}static createElement(t,e){const s=xt.createElement("template");return s.innerHTML=t,s}}function Et(i,t,e=i,s){var n,a,r,o;if(t===et)return t;let c=s!==void 0?(n=e._$Co)===null||n===void 0?void 0:n[s]:e._$Cl;const d=re(t)?void 0:t._$litDirective$;return(c==null?void 0:c.constructor)!==d&&((a=c==null?void 0:c._$AO)===null||a===void 0||a.call(c,!1),d===void 0?c=void 0:(c=new d(i),c._$AT(i,e,s)),s!==void 0?((r=(o=e)._$Co)!==null&&r!==void 0?r:o._$Co=[])[s]=c:e._$Cl=c),c!==void 0&&(t=Et(i,c._$AS(i,t.values),c,s)),t}class Xi{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:n}=this._$AD,a=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:xt).importNode(s,!0);jt.currentNode=a;let r=jt.nextNode(),o=0,c=0,d=n[0];for(;d!==void 0;){if(o===d.index){let u;d.type===2?u=new Wt(r,r.nextSibling,this,t):d.type===1?u=new d.ctor(r,d.name,d.strings,this,t):d.type===6&&(u=new nn(r,this,t)),this._$AV.push(u),d=n[++c]}o!==(d==null?void 0:d.index)&&(r=jt.nextNode(),o++)}return jt.currentNode=xt,a}v(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Wt{constructor(t,e,s,n){var a;this.type=2,this._$AH=P,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cp=(a=n==null?void 0:n.isConnected)===null||a===void 0||a}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Et(this,t,e),re(t)?t===P||t==null||t===""?(this._$AH!==P&&this._$AR(),this._$AH=P):t!==this._$AH&&t!==et&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):Zi(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==P&&re(this._$AH)?this._$AA.nextSibling.data=t:this.$(xt.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:n}=t,a=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=oe.createElement(Yi(n.h,n.h[0]),this.options)),n);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===a)this._$AH.v(s);else{const r=new Xi(a,this),o=r.u(this.options);r.v(s),this.$(o),this._$AH=r}}_$AC(t){let e=Xs.get(t.strings);return e===void 0&&Xs.set(t.strings,e=new oe(t)),e}T(t){Gi(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,n=0;for(const a of t)n===e.length?e.push(s=new Wt(this.k(ae()),this.k(ae()),this,this.options)):s=e[n],s._$AI(a),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){const n=t.nextSibling;t.remove(),t=n}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class he{constructor(t,e,s,n,a){this.type=1,this._$AH=P,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=a,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=P}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,n){const a=this.strings;let r=!1;if(a===void 0)t=Et(this,t,e,0),r=!re(t)||t!==this._$AH&&t!==et,r&&(this._$AH=t);else{const o=t;let c,d;for(t=a[0],c=0;c<a.length-1;c++)d=Et(this,o[s+c],e,c),d===et&&(d=this._$AH[c]),r||(r=!re(d)||d!==this._$AH[c]),d===P?t=P:t!==P&&(t+=(d??"")+a[c+1]),this._$AH[c]=d}r&&!n&&this.j(t)}j(t){t===P?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tn extends he{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===P?void 0:t}}const Ea=Ut?Ut.emptyScript:"";class en extends he{constructor(){super(...arguments),this.type=4}j(t){t&&t!==P?this.element.setAttribute(this.name,Ea):this.element.removeAttribute(this.name)}}class sn extends he{constructor(t,e,s,n,a){super(t,e,s,n,a),this.type=5}_$AI(t,e=this){var s;if((t=(s=Et(this,t,e,0))!==null&&s!==void 0?s:P)===et)return;const n=this._$AH,a=t===P&&n!==P||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==P&&(n===P||a);a&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class nn{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Et(this,t)}}const Ta={O:De,P:rt,A:zs,C:1,M:Ji,L:Xi,R:Zi,D:Et,I:Wt,V:he,H:en,N:sn,U:tn,F:nn},ti=ze.litHtmlPolyfillSupport;ti==null||ti(oe,Wt),((is=ze.litHtmlVersions)!==null&&is!==void 0?is:ze.litHtmlVersions=[]).push("2.8.0");const Ma=(i,t,e)=>{var s,n;const a=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:t;let r=a._$litPart$;if(r===void 0){const o=(n=e==null?void 0:e.renderBefore)!==null&&n!==void 0?n:null;a._$litPart$=r=new Wt(t.insertBefore(ae(),o),o,void 0,e??{})}return r._$AI(i),r};/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/var as,rs;let k=class extends Dt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ma(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return et}};k.finalized=!0,k._$litElement$=!0,(as=globalThis.litElementHydrateSupport)===null||as===void 0||as.call(globalThis,{LitElement:k});const ei=globalThis.litElementPolyfillSupport;ei==null||ei({LitElement:k});((rs=globalThis.litElementVersions)!==null&&rs!==void 0?rs:globalThis.litElementVersions=[]).push("3.3.3");/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const St={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},an=i=>(...t)=>({_$litDirective$:i,values:t});let rn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const{I:Ia}=Ta,za=i=>i.strings===void 0,si=()=>document.createComment(""),Yt=(i,t,e)=>{var s;const n=i._$AA.parentNode,a=t===void 0?i._$AB:t._$AA;if(e===void 0){const r=n.insertBefore(si(),a),o=n.insertBefore(si(),a);e=new Ia(r,o,i,i.options)}else{const r=e._$AB.nextSibling,o=e._$AM,c=o!==i;if(c){let d;(s=e._$AQ)===null||s===void 0||s.call(e,i),e._$AM=i,e._$AP!==void 0&&(d=i._$AU)!==o._$AU&&e._$AP(d)}if(r!==a||c){let d=e._$AA;for(;d!==r;){const u=d.nextSibling;n.insertBefore(d,a),d=u}}}return e},wt=(i,t,e=i)=>(i._$AI(t,e),i),Da={},on=(i,t=Da)=>i._$AH=t,Pa=i=>i._$AH,os=i=>{var t;(t=i._$AP)===null||t===void 0||t.call(i,!1,!0);let e=i._$AA;const s=i._$AB.nextSibling;for(;e!==s;){const n=e.nextSibling;e.remove(),e=n}};/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const Aa=an(class extends rn{constructor(i){if(super(i),i.type!==St.PROPERTY&&i.type!==St.ATTRIBUTE&&i.type!==St.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!za(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===et||t===P)return t;const e=i.element,s=i.name;if(i.type===St.PROPERTY){if(t===e[s])return et}else if(i.type===St.BOOLEAN_ATTRIBUTE){if(!!t===e.hasAttribute(s))return et}else if(i.type===St.ATTRIBUTE&&e.getAttribute(s)===t+"")return et;return on(i),t}});class La extends k{static get properties(){return{skippable:{type:Boolean},t:{type:Object},variant:{type:String},value:{type:String},locations:{attribute:!1},locationError:{attribute:!1},phoneError:{attribute:!1},city:{attribute:!1},loading:{attribute:!1},state:{attribute:!1},localValue:{attribute:!1},isInfoOpen:{type:Boolean,attribute:!1},infoText:{type:String,attribute:!1}}}constructor(){super(),this.skippable=!1,this.variant="",this.t={},this.locations=[],this.locationError="",this.city="",this.loading=!1,this.localValue="",this.phoneError="",this.isInfoOpen=!1,this.infoText="",this._clearLocations=this._clearLocations.bind(this),this._handleSuggestions=this._handleSuggestions.bind(this),this._debounceCityChange=debounce(getAddressSuggestions(this._handleSuggestions,jsObject.map_key)).bind(this),this._handleCityInputChange=this._handleCityInputChange.bind(this)}updated(t){t.has("variant")&&(this.renderRoot.querySelector(".inputs input").focus(),this.isInfoOpen=!1)}willUpdate(t){t.has("value")&&this.value!==""&&(this.localValue=JSON.parse(this.value))}render(){var t;return l`
        <form class="inputs stack" @submit=${this._handleSubmit}>
            ${this.variant===h.updateName?l`
                <h2>${this.t.name_question}</h2>
                <div class="d-flex align-items-center">
                    <label for="name" class="visually-hidden">${this.t.name}</label>
                    <input class="input" type="text" id="name" name="name" value=${this.localValue} ?required=${!this.skippable} placeholder=${this.t.name}>
                    <button type="button" class="icon-btn f-1" @click=${()=>this._toggleInfo("name")}>
                        <span class="icon z-icon-info brand-light"></span>
                    </button>
                </div>
            `:""}

            ${this.variant===h.updatePhone?l`
                <h2>${this.t.phone_question}</h2>
                <div class="d-flex align-items-center">
                    <label for="phone" class="visually-hidden">${this.t.phone}</label>
                    <input
                        class="input"
                        type="tel"
                        id="phone"
                        name="phone"
                        pattern="\\(?\\+?[\\(\\)\\-\\s0-9]*"
                        value=""
                        placeholder=${this.t.phone}
                        ?required=${!this.skippable}
                        @input=${this._handleInput}
                        @invalid=${this._handleInvalid}
                    >
                    <button type="button" class="icon-btn f-1" @click=${()=>this._toggleInfo("phone")}>
                        <span class="icon z-icon-info brand-light"></span>
                    </button>
                    <div class="input-error" data-state="${this.phoneError.length?"":"empty"}" >${this.phoneError}</div>
                </div>
            `:""}

            ${this.variant===h.updateLocation?l`
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
                            .value="${this.city?Aa(this.city):(t=this.localValue)===null||t===void 0?void 0:t.label}"
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
                    ${[h.updatePhone,h.updateName].includes(this.variant)?l`
                        <span class="loading-spinner ${this.loading?"active":""}"></span>
                    `:""}
                </button>
            </div>
        </form>

        `}_handleInput(t){this.phoneError=""}_handleInvalid(t){t.preventDefault(),this.phoneError=this.t.phone_error}_handleSubmit(t){t.preventDefault(),t.srcElement.querySelector("#city")?this._handleSubmitLocation():this._handleDone(t)}_handleDone(t){t&&t.preventDefault();const e=t.target[0];if(e.type==="submit")return;let{name:s,value:n}=e;e.type==="tel"&&(n=e.value.replace(/[\(\)\-\s]/g,"")),this._updateProfile(s,n,()=>{this._sendDoneStepEvent()})}_sendDoneStepEvent(){this.dispatchEvent(new CustomEvent("done-step",{bubbles:!0}))}_sendProfileUpdateEvent(){this.dispatchEvent(new CustomEvent("profile:reload",{bubbles:!0}))}_handleCityChange(t){this._handleCityInputChange(t),this._debounceCityChange(t)}_handleCityInputChange(t){this.city=t.target.value}_handleSuggestions(t){t.features.length<1&&(this.locationError=this.t.no_locations_found),this.locations=t.features}_handleLocationSelection(t){this.city=t.target.dataset.placeName;const e=getLocationGridFromMapbox(t.target.id,jsObject.profile.location);this.localValue=e,this._clearLocations()}_handleSubmitLocation(){if(this.localValue.source==="ip"){const{label:t,level:e,lat:s,lng:n}=this.localValue;this.localValue={source:"user",grid_id:!1,label:t,level:e,lat:Number(s),lng:Number(n)}}this._updateProfile("location_grid_meta",this.localValue,()=>{this._sendDoneStepEvent()})}_updateProfile(t,e,s=()=>{}){this.loading=!0;const n={[t]:e};fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(n),headers:{"X-WP-Nonce":jsObject.nonce}}).then(a=>a.json()).then(a=>{jsObject.profile=a,this._sendProfileUpdateEvent(),s()}).catch(a=>{console.error(a)}).finally(()=>{this.loading=!1})}_clearLocations(){this.locations=[]}_toggleInfo(t){this.isInfoOpen?this.isInfoOpen=!1:this._openInfo(t)}_openInfo(t){switch(this.isInfoOpen=!0,t){case"name":this.infoText=this.t.user_name_disclaimer;break;case"phone":this.infoText=this.t.user_phone_disclaimer;break;case"location":this.infoText=this.t.user_city_disclaimer;break}}createRenderRoot(){return this}}window.customElements.define("complete-profile",La);class Na extends k{static get properties(){return{t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const t=new URL(location.href);if(!t.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));return}const e=t.searchParams.get("code");this.code=e,_.post("connect/friend",{code:e}).then(s=>{console.log(s),this.message=this.t.success.replace("%s",s.name)}).catch(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_friend_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error)}).finally(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.dispatchEvent(new CustomEvent("wizard:finish",{bubbles:!0}))})}setErrorMessage(t){this.errorMessage=t}render(){return l`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("connect-friend",Na);class Tt extends Error{}class Ra extends Tt{constructor(t){super(`Invalid DateTime: ${t.toMessage()}`)}}class Fa extends Tt{constructor(t){super(`Invalid Interval: ${t.toMessage()}`)}}class Ua extends Tt{constructor(t){super(`Invalid Duration: ${t.toMessage()}`)}}class At extends Tt{}class ln extends Tt{constructor(t){super(`Invalid unit ${t}`)}}class R extends Tt{}class ut extends Tt{constructor(){super("Zone is an abstract class")}}const b="numeric",it="short",G="long",Pe={year:b,month:b,day:b},cn={year:b,month:it,day:b},qa={year:b,month:it,day:b,weekday:it},dn={year:b,month:G,day:b},hn={year:b,month:G,day:b,weekday:G},un={hour:b,minute:b},pn={hour:b,minute:b,second:b},mn={hour:b,minute:b,second:b,timeZoneName:it},fn={hour:b,minute:b,second:b,timeZoneName:G},gn={hour:b,minute:b,hourCycle:"h23"},bn={hour:b,minute:b,second:b,hourCycle:"h23"},vn={hour:b,minute:b,second:b,hourCycle:"h23",timeZoneName:it},yn={hour:b,minute:b,second:b,hourCycle:"h23",timeZoneName:G},$n={year:b,month:b,day:b,hour:b,minute:b},wn={year:b,month:b,day:b,hour:b,minute:b,second:b},_n={year:b,month:it,day:b,hour:b,minute:b},kn={year:b,month:it,day:b,hour:b,minute:b,second:b},Wa={year:b,month:it,day:b,weekday:it,hour:b,minute:b},Sn={year:b,month:G,day:b,hour:b,minute:b,timeZoneName:it},jn={year:b,month:G,day:b,hour:b,minute:b,second:b,timeZoneName:it},On={year:b,month:G,day:b,weekday:G,hour:b,minute:b,timeZoneName:G},Cn={year:b,month:G,day:b,weekday:G,hour:b,minute:b,second:b,timeZoneName:G};class ue{get type(){throw new ut}get name(){throw new ut}get ianaName(){return this.name}get isUniversal(){throw new ut}offsetName(t,e){throw new ut}formatOffset(t,e){throw new ut}offset(t){throw new ut}equals(t){throw new ut}get isValid(){throw new ut}}let ls=null;class Be extends ue{static get instance(){return ls===null&&(ls=new Be),ls}get type(){return"system"}get name(){return new Intl.DateTimeFormat().resolvedOptions().timeZone}get isUniversal(){return!1}offsetName(t,{format:e,locale:s}){return An(t,e,s)}formatOffset(t,e){return ne(this.offset(t),e)}offset(t){return-new Date(t).getTimezoneOffset()}equals(t){return t.type==="system"}get isValid(){return!0}}let Ce={};function Va(i){return Ce[i]||(Ce[i]=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:i,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",era:"short"})),Ce[i]}const Ha={year:0,month:1,day:2,era:3,hour:4,minute:5,second:6};function Ba(i,t){const e=i.format(t).replace(/\u200E/g,""),s=/(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(e),[,n,a,r,o,c,d,u]=s;return[r,n,a,o,c,d,u]}function Ga(i,t){const e=i.formatToParts(t),s=[];for(let n=0;n<e.length;n++){const{type:a,value:r}=e[n],o=Ha[a];a==="era"?s[o]=r:w(o)||(s[o]=parseInt(r,10))}return s}let ye={};class lt extends ue{static create(t){return ye[t]||(ye[t]=new lt(t)),ye[t]}static resetCache(){ye={},Ce={}}static isValidSpecifier(t){return this.isValidZone(t)}static isValidZone(t){if(!t)return!1;try{return new Intl.DateTimeFormat("en-US",{timeZone:t}).format(),!0}catch{return!1}}constructor(t){super(),this.zoneName=t,this.valid=lt.isValidZone(t)}get type(){return"iana"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(t,{format:e,locale:s}){return An(t,e,s,this.name)}formatOffset(t,e){return ne(this.offset(t),e)}offset(t){const e=new Date(t);if(isNaN(e))return NaN;const s=Va(this.name);let[n,a,r,o,c,d,u]=s.formatToParts?Ga(s,e):Ba(s,e);o==="BC"&&(n=-Math.abs(n)+1);const m=Ze({year:n,month:a,day:r,hour:c===24?0:c,minute:d,second:u,millisecond:0});let g=+e;const $=g%1e3;return g-=$>=0?$:1e3+$,(m-g)/(60*1e3)}equals(t){return t.type==="iana"&&t.name===this.name}get isValid(){return this.valid}}let ii={};function Za(i,t={}){const e=JSON.stringify([i,t]);let s=ii[e];return s||(s=new Intl.ListFormat(i,t),ii[e]=s),s}let _s={};function ks(i,t={}){const e=JSON.stringify([i,t]);let s=_s[e];return s||(s=new Intl.DateTimeFormat(i,t),_s[e]=s),s}let Ss={};function Ka(i,t={}){const e=JSON.stringify([i,t]);let s=Ss[e];return s||(s=new Intl.NumberFormat(i,t),Ss[e]=s),s}let js={};function Qa(i,t={}){const{base:e,...s}=t,n=JSON.stringify([i,s]);let a=js[n];return a||(a=new Intl.RelativeTimeFormat(i,t),js[n]=a),a}let ee=null;function Ya(){return ee||(ee=new Intl.DateTimeFormat().resolvedOptions().locale,ee)}let ni={};function Ja(i){let t=ni[i];if(!t){const e=new Intl.Locale(i);t="getWeekInfo"in e?e.getWeekInfo():e.weekInfo,ni[i]=t}return t}function Xa(i){const t=i.indexOf("-x-");t!==-1&&(i=i.substring(0,t));const e=i.indexOf("-u-");if(e===-1)return[i];{let s,n;try{s=ks(i).resolvedOptions(),n=i}catch{const c=i.substring(0,e);s=ks(c).resolvedOptions(),n=c}const{numberingSystem:a,calendar:r}=s;return[n,a,r]}}function tr(i,t,e){return(e||t)&&(i.includes("-u-")||(i+="-u"),e&&(i+=`-ca-${e}`),t&&(i+=`-nu-${t}`)),i}function er(i){const t=[];for(let e=1;e<=12;e++){const s=f.utc(2009,e,1);t.push(i(s))}return t}function sr(i){const t=[];for(let e=1;e<=7;e++){const s=f.utc(2016,11,13+e);t.push(i(s))}return t}function $e(i,t,e,s){const n=i.listingMode();return n==="error"?null:n==="en"?e(t):s(t)}function ir(i){return i.numberingSystem&&i.numberingSystem!=="latn"?!1:i.numberingSystem==="latn"||!i.locale||i.locale.startsWith("en")||new Intl.DateTimeFormat(i.intl).resolvedOptions().numberingSystem==="latn"}class nr{constructor(t,e,s){this.padTo=s.padTo||0,this.floor=s.floor||!1;const{padTo:n,floor:a,...r}=s;if(!e||Object.keys(r).length>0){const o={useGrouping:!1,...s};s.padTo>0&&(o.minimumIntegerDigits=s.padTo),this.inf=Ka(t,o)}}format(t){if(this.inf){const e=this.floor?Math.floor(t):t;return this.inf.format(e)}else{const e=this.floor?Math.floor(t):Ns(t,3);return D(e,this.padTo)}}}class ar{constructor(t,e,s){this.opts=s,this.originalZone=void 0;let n;if(this.opts.timeZone)this.dt=t;else if(t.zone.type==="fixed"){const r=-1*(t.offset/60),o=r>=0?`Etc/GMT+${r}`:`Etc/GMT${r}`;t.offset!==0&&lt.create(o).valid?(n=o,this.dt=t):(n="UTC",this.dt=t.offset===0?t:t.setZone("UTC").plus({minutes:t.offset}),this.originalZone=t.zone)}else t.zone.type==="system"?this.dt=t:t.zone.type==="iana"?(this.dt=t,n=t.zone.name):(n="UTC",this.dt=t.setZone("UTC").plus({minutes:t.offset}),this.originalZone=t.zone);const a={...this.opts};a.timeZone=a.timeZone||n,this.dtf=ks(e,a)}format(){return this.originalZone?this.formatToParts().map(({value:t})=>t).join(""):this.dtf.format(this.dt.toJSDate())}formatToParts(){const t=this.dtf.formatToParts(this.dt.toJSDate());return this.originalZone?t.map(e=>{if(e.type==="timeZoneName"){const s=this.originalZone.offsetName(this.dt.ts,{locale:this.dt.locale,format:this.opts.timeZoneName});return{...e,value:s}}else return e}):t}resolvedOptions(){return this.dtf.resolvedOptions()}}class rr{constructor(t,e,s){this.opts={style:"long",...s},!e&&Dn()&&(this.rtf=Qa(t,s))}format(t,e){return this.rtf?this.rtf.format(t,e):Er(e,t,this.opts.numeric,this.opts.style!=="long")}formatToParts(t,e){return this.rtf?this.rtf.formatToParts(t,e):[]}}const or={firstDay:1,minimalDays:4,weekend:[6,7]};class x{static fromOpts(t){return x.create(t.locale,t.numberingSystem,t.outputCalendar,t.weekSettings,t.defaultToEN)}static create(t,e,s,n,a=!1){const r=t||M.defaultLocale,o=r||(a?"en-US":Ya()),c=e||M.defaultNumberingSystem,d=s||M.defaultOutputCalendar,u=Os(n)||M.defaultWeekSettings;return new x(o,c,d,u,r)}static resetCache(){ee=null,_s={},Ss={},js={}}static fromObject({locale:t,numberingSystem:e,outputCalendar:s,weekSettings:n}={}){return x.create(t,e,s,n)}constructor(t,e,s,n,a){const[r,o,c]=Xa(t);this.locale=r,this.numberingSystem=e||o||null,this.outputCalendar=s||c||null,this.weekSettings=n,this.intl=tr(this.locale,this.numberingSystem,this.outputCalendar),this.weekdaysCache={format:{},standalone:{}},this.monthsCache={format:{},standalone:{}},this.meridiemCache=null,this.eraCache={},this.specifiedLocale=a,this.fastNumbersCached=null}get fastNumbers(){return this.fastNumbersCached==null&&(this.fastNumbersCached=ir(this)),this.fastNumbersCached}listingMode(){const t=this.isEnglish(),e=(this.numberingSystem===null||this.numberingSystem==="latn")&&(this.outputCalendar===null||this.outputCalendar==="gregory");return t&&e?"en":"intl"}clone(t){return!t||Object.getOwnPropertyNames(t).length===0?this:x.create(t.locale||this.specifiedLocale,t.numberingSystem||this.numberingSystem,t.outputCalendar||this.outputCalendar,Os(t.weekSettings)||this.weekSettings,t.defaultToEN||!1)}redefaultToEN(t={}){return this.clone({...t,defaultToEN:!0})}redefaultToSystem(t={}){return this.clone({...t,defaultToEN:!1})}months(t,e=!1){return $e(this,t,Rn,()=>{const s=e?{month:t,day:"numeric"}:{month:t},n=e?"format":"standalone";return this.monthsCache[n][t]||(this.monthsCache[n][t]=er(a=>this.extract(a,s,"month"))),this.monthsCache[n][t]})}weekdays(t,e=!1){return $e(this,t,qn,()=>{const s=e?{weekday:t,year:"numeric",month:"long",day:"numeric"}:{weekday:t},n=e?"format":"standalone";return this.weekdaysCache[n][t]||(this.weekdaysCache[n][t]=sr(a=>this.extract(a,s,"weekday"))),this.weekdaysCache[n][t]})}meridiems(){return $e(this,void 0,()=>Wn,()=>{if(!this.meridiemCache){const t={hour:"numeric",hourCycle:"h12"};this.meridiemCache=[f.utc(2016,11,13,9),f.utc(2016,11,13,19)].map(e=>this.extract(e,t,"dayperiod"))}return this.meridiemCache})}eras(t){return $e(this,t,Vn,()=>{const e={era:t};return this.eraCache[t]||(this.eraCache[t]=[f.utc(-40,1,1),f.utc(2017,1,1)].map(s=>this.extract(s,e,"era"))),this.eraCache[t]})}extract(t,e,s){const n=this.dtFormatter(t,e),a=n.formatToParts(),r=a.find(o=>o.type.toLowerCase()===s);return r?r.value:null}numberFormatter(t={}){return new nr(this.intl,t.forceSimple||this.fastNumbers,t)}dtFormatter(t,e={}){return new ar(t,this.intl,e)}relFormatter(t={}){return new rr(this.intl,this.isEnglish(),t)}listFormatter(t={}){return Za(this.intl,t)}isEnglish(){return this.locale==="en"||this.locale.toLowerCase()==="en-us"||new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us")}getWeekSettings(){return this.weekSettings?this.weekSettings:Pn()?Ja(this.locale):or}getStartOfWeek(){return this.getWeekSettings().firstDay}getMinDaysInFirstWeek(){return this.getWeekSettings().minimalDays}getWeekendDays(){return this.getWeekSettings().weekend}equals(t){return this.locale===t.locale&&this.numberingSystem===t.numberingSystem&&this.outputCalendar===t.outputCalendar}toString(){return`Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`}}let cs=null;class q extends ue{static get utcInstance(){return cs===null&&(cs=new q(0)),cs}static instance(t){return t===0?q.utcInstance:new q(t)}static parseSpecifier(t){if(t){const e=t.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);if(e)return new q(Ke(e[1],e[2]))}return null}constructor(t){super(),this.fixed=t}get type(){return"fixed"}get name(){return this.fixed===0?"UTC":`UTC${ne(this.fixed,"narrow")}`}get ianaName(){return this.fixed===0?"Etc/UTC":`Etc/GMT${ne(-this.fixed,"narrow")}`}offsetName(){return this.name}formatOffset(t,e){return ne(this.fixed,e)}get isUniversal(){return!0}offset(){return this.fixed}equals(t){return t.type==="fixed"&&t.fixed===this.fixed}get isValid(){return!0}}class lr extends ue{constructor(t){super(),this.zoneName=t}get type(){return"invalid"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(){return null}formatOffset(){return""}offset(){return NaN}equals(){return!1}get isValid(){return!1}}function ft(i,t){if(w(i)||i===null)return t;if(i instanceof ue)return i;if(mr(i)){const e=i.toLowerCase();return e==="default"?t:e==="local"||e==="system"?Be.instance:e==="utc"||e==="gmt"?q.utcInstance:q.parseSpecifier(e)||lt.create(i)}else return bt(i)?q.instance(i):typeof i=="object"&&"offset"in i&&typeof i.offset=="function"?i:new lr(i)}const Ds={arab:"[٠-٩]",arabext:"[۰-۹]",bali:"[᭐-᭙]",beng:"[০-৯]",deva:"[०-९]",fullwide:"[０-９]",gujr:"[૦-૯]",hanidec:"[〇|一|二|三|四|五|六|七|八|九]",khmr:"[០-៩]",knda:"[೦-೯]",laoo:"[໐-໙]",limb:"[᥆-᥏]",mlym:"[൦-൯]",mong:"[᠐-᠙]",mymr:"[၀-၉]",orya:"[୦-୯]",tamldec:"[௦-௯]",telu:"[౦-౯]",thai:"[๐-๙]",tibt:"[༠-༩]",latn:"\\d"},ai={arab:[1632,1641],arabext:[1776,1785],bali:[6992,7001],beng:[2534,2543],deva:[2406,2415],fullwide:[65296,65303],gujr:[2790,2799],khmr:[6112,6121],knda:[3302,3311],laoo:[3792,3801],limb:[6470,6479],mlym:[3430,3439],mong:[6160,6169],mymr:[4160,4169],orya:[2918,2927],tamldec:[3046,3055],telu:[3174,3183],thai:[3664,3673],tibt:[3872,3881]},cr=Ds.hanidec.replace(/[\[|\]]/g,"").split("");function dr(i){let t=parseInt(i,10);if(isNaN(t)){t="";for(let e=0;e<i.length;e++){const s=i.charCodeAt(e);if(i[e].search(Ds.hanidec)!==-1)t+=cr.indexOf(i[e]);else for(const n in ai){const[a,r]=ai[n];s>=a&&s<=r&&(t+=s-a)}}return parseInt(t,10)}else return t}let Pt={};function hr(){Pt={}}function J({numberingSystem:i},t=""){const e=i||"latn";return Pt[e]||(Pt[e]={}),Pt[e][t]||(Pt[e][t]=new RegExp(`${Ds[e]}${t}`)),Pt[e][t]}let ri=()=>Date.now(),oi="system",li=null,ci=null,di=null,hi=60,ui,pi=null;class M{static get now(){return ri}static set now(t){ri=t}static set defaultZone(t){oi=t}static get defaultZone(){return ft(oi,Be.instance)}static get defaultLocale(){return li}static set defaultLocale(t){li=t}static get defaultNumberingSystem(){return ci}static set defaultNumberingSystem(t){ci=t}static get defaultOutputCalendar(){return di}static set defaultOutputCalendar(t){di=t}static get defaultWeekSettings(){return pi}static set defaultWeekSettings(t){pi=Os(t)}static get twoDigitCutoffYear(){return hi}static set twoDigitCutoffYear(t){hi=t%100}static get throwOnInvalid(){return ui}static set throwOnInvalid(t){ui=t}static resetCaches(){x.resetCache(),lt.resetCache(),f.resetCache(),hr()}}class st{constructor(t,e){this.reason=t,this.explanation=e}toMessage(){return this.explanation?`${this.reason}: ${this.explanation}`:this.reason}}const xn=[0,31,59,90,120,151,181,212,243,273,304,334],En=[0,31,60,91,121,152,182,213,244,274,305,335];function Q(i,t){return new st("unit out of range",`you specified ${t} (of type ${typeof t}) as a ${i}, which is invalid`)}function Ps(i,t,e){const s=new Date(Date.UTC(i,t-1,e));i<100&&i>=0&&s.setUTCFullYear(s.getUTCFullYear()-1900);const n=s.getUTCDay();return n===0?7:n}function Tn(i,t,e){return e+(pe(i)?En:xn)[t-1]}function Mn(i,t){const e=pe(i)?En:xn,s=e.findIndex(a=>a<t),n=t-e[s];return{month:s+1,day:n}}function As(i,t){return(i-t+7)%7+1}function Ae(i,t=4,e=1){const{year:s,month:n,day:a}=i,r=Tn(s,n,a),o=As(Ps(s,n,a),e);let c=Math.floor((r-o+14-t)/7),d;return c<1?(d=s-1,c=le(d,t,e)):c>le(s,t,e)?(d=s+1,c=1):d=s,{weekYear:d,weekNumber:c,weekday:o,...Qe(i)}}function mi(i,t=4,e=1){const{weekYear:s,weekNumber:n,weekday:a}=i,r=As(Ps(s,1,t),e),o=Nt(s);let c=n*7+a-r-7+t,d;c<1?(d=s-1,c+=Nt(d)):c>o?(d=s+1,c-=Nt(s)):d=s;const{month:u,day:p}=Mn(d,c);return{year:d,month:u,day:p,...Qe(i)}}function ds(i){const{year:t,month:e,day:s}=i,n=Tn(t,e,s);return{year:t,ordinal:n,...Qe(i)}}function fi(i){const{year:t,ordinal:e}=i,{month:s,day:n}=Mn(t,e);return{year:t,month:s,day:n,...Qe(i)}}function gi(i,t){if(!w(i.localWeekday)||!w(i.localWeekNumber)||!w(i.localWeekYear)){if(!w(i.weekday)||!w(i.weekNumber)||!w(i.weekYear))throw new At("Cannot mix locale-based week fields with ISO-based week fields");return w(i.localWeekday)||(i.weekday=i.localWeekday),w(i.localWeekNumber)||(i.weekNumber=i.localWeekNumber),w(i.localWeekYear)||(i.weekYear=i.localWeekYear),delete i.localWeekday,delete i.localWeekNumber,delete i.localWeekYear,{minDaysInFirstWeek:t.getMinDaysInFirstWeek(),startOfWeek:t.getStartOfWeek()}}else return{minDaysInFirstWeek:4,startOfWeek:1}}function ur(i,t=4,e=1){const s=Ge(i.weekYear),n=Y(i.weekNumber,1,le(i.weekYear,t,e)),a=Y(i.weekday,1,7);return s?n?a?!1:Q("weekday",i.weekday):Q("week",i.weekNumber):Q("weekYear",i.weekYear)}function pr(i){const t=Ge(i.year),e=Y(i.ordinal,1,Nt(i.year));return t?e?!1:Q("ordinal",i.ordinal):Q("year",i.year)}function In(i){const t=Ge(i.year),e=Y(i.month,1,12),s=Y(i.day,1,Le(i.year,i.month));return t?e?s?!1:Q("day",i.day):Q("month",i.month):Q("year",i.year)}function zn(i){const{hour:t,minute:e,second:s,millisecond:n}=i,a=Y(t,0,23)||t===24&&e===0&&s===0&&n===0,r=Y(e,0,59),o=Y(s,0,59),c=Y(n,0,999);return a?r?o?c?!1:Q("millisecond",n):Q("second",s):Q("minute",e):Q("hour",t)}function w(i){return typeof i>"u"}function bt(i){return typeof i=="number"}function Ge(i){return typeof i=="number"&&i%1===0}function mr(i){return typeof i=="string"}function fr(i){return Object.prototype.toString.call(i)==="[object Date]"}function Dn(){try{return typeof Intl<"u"&&!!Intl.RelativeTimeFormat}catch{return!1}}function Pn(){try{return typeof Intl<"u"&&!!Intl.Locale&&("weekInfo"in Intl.Locale.prototype||"getWeekInfo"in Intl.Locale.prototype)}catch{return!1}}function gr(i){return Array.isArray(i)?i:[i]}function bi(i,t,e){if(i.length!==0)return i.reduce((s,n)=>{const a=[t(n),n];return s&&e(s[0],a[0])===s[0]?s:a},null)[1]}function br(i,t){return t.reduce((e,s)=>(e[s]=i[s],e),{})}function qt(i,t){return Object.prototype.hasOwnProperty.call(i,t)}function Os(i){if(i==null)return null;if(typeof i!="object")throw new R("Week settings must be an object");if(!Y(i.firstDay,1,7)||!Y(i.minimalDays,1,7)||!Array.isArray(i.weekend)||i.weekend.some(t=>!Y(t,1,7)))throw new R("Invalid week settings");return{firstDay:i.firstDay,minimalDays:i.minimalDays,weekend:Array.from(i.weekend)}}function Y(i,t,e){return Ge(i)&&i>=t&&i<=e}function vr(i,t){return i-t*Math.floor(i/t)}function D(i,t=2){const e=i<0;let s;return e?s="-"+(""+-i).padStart(t,"0"):s=(""+i).padStart(t,"0"),s}function mt(i){if(!(w(i)||i===null||i===""))return parseInt(i,10)}function _t(i){if(!(w(i)||i===null||i===""))return parseFloat(i)}function Ls(i){if(!(w(i)||i===null||i==="")){const t=parseFloat("0."+i)*1e3;return Math.floor(t)}}function Ns(i,t,e=!1){const s=10**t;return(e?Math.trunc:Math.round)(i*s)/s}function pe(i){return i%4===0&&(i%100!==0||i%400===0)}function Nt(i){return pe(i)?366:365}function Le(i,t){const e=vr(t-1,12)+1,s=i+(t-e)/12;return e===2?pe(s)?29:28:[31,null,31,30,31,30,31,31,30,31,30,31][e-1]}function Ze(i){let t=Date.UTC(i.year,i.month-1,i.day,i.hour,i.minute,i.second,i.millisecond);return i.year<100&&i.year>=0&&(t=new Date(t),t.setUTCFullYear(i.year,i.month-1,i.day)),+t}function vi(i,t,e){return-As(Ps(i,1,t),e)+t-1}function le(i,t=4,e=1){const s=vi(i,t,e),n=vi(i+1,t,e);return(Nt(i)-s+n)/7}function Cs(i){return i>99?i:i>M.twoDigitCutoffYear?1900+i:2e3+i}function An(i,t,e,s=null){const n=new Date(i),a={hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"};s&&(a.timeZone=s);const r={timeZoneName:t,...a},o=new Intl.DateTimeFormat(e,r).formatToParts(n).find(c=>c.type.toLowerCase()==="timezonename");return o?o.value:null}function Ke(i,t){let e=parseInt(i,10);Number.isNaN(e)&&(e=0);const s=parseInt(t,10)||0,n=e<0||Object.is(e,-0)?-s:s;return e*60+n}function Ln(i){const t=Number(i);if(typeof i=="boolean"||i===""||Number.isNaN(t))throw new R(`Invalid unit value ${i}`);return t}function Ne(i,t){const e={};for(const s in i)if(qt(i,s)){const n=i[s];if(n==null)continue;e[t(s)]=Ln(n)}return e}function ne(i,t){const e=Math.trunc(Math.abs(i/60)),s=Math.trunc(Math.abs(i%60)),n=i>=0?"+":"-";switch(t){case"short":return`${n}${D(e,2)}:${D(s,2)}`;case"narrow":return`${n}${e}${s>0?`:${s}`:""}`;case"techie":return`${n}${D(e,2)}${D(s,2)}`;default:throw new RangeError(`Value format ${t} is out of range for property format`)}}function Qe(i){return br(i,["hour","minute","second","millisecond"])}const yr=["January","February","March","April","May","June","July","August","September","October","November","December"],Nn=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],$r=["J","F","M","A","M","J","J","A","S","O","N","D"];function Rn(i){switch(i){case"narrow":return[...$r];case"short":return[...Nn];case"long":return[...yr];case"numeric":return["1","2","3","4","5","6","7","8","9","10","11","12"];case"2-digit":return["01","02","03","04","05","06","07","08","09","10","11","12"];default:return null}}const Fn=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],Un=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],wr=["M","T","W","T","F","S","S"];function qn(i){switch(i){case"narrow":return[...wr];case"short":return[...Un];case"long":return[...Fn];case"numeric":return["1","2","3","4","5","6","7"];default:return null}}const Wn=["AM","PM"],_r=["Before Christ","Anno Domini"],kr=["BC","AD"],Sr=["B","A"];function Vn(i){switch(i){case"narrow":return[...Sr];case"short":return[...kr];case"long":return[..._r];default:return null}}function jr(i){return Wn[i.hour<12?0:1]}function Or(i,t){return qn(t)[i.weekday-1]}function Cr(i,t){return Rn(t)[i.month-1]}function xr(i,t){return Vn(t)[i.year<0?0:1]}function Er(i,t,e="always",s=!1){const n={years:["year","yr."],quarters:["quarter","qtr."],months:["month","mo."],weeks:["week","wk."],days:["day","day","days"],hours:["hour","hr."],minutes:["minute","min."],seconds:["second","sec."]},a=["hours","minutes","seconds"].indexOf(i)===-1;if(e==="auto"&&a){const p=i==="days";switch(t){case 1:return p?"tomorrow":`next ${n[i][0]}`;case-1:return p?"yesterday":`last ${n[i][0]}`;case 0:return p?"today":`this ${n[i][0]}`}}const r=Object.is(t,-0)||t<0,o=Math.abs(t),c=o===1,d=n[i],u=s?c?d[1]:d[2]||d[1]:c?n[i][0]:i;return r?`${o} ${u} ago`:`in ${o} ${u}`}function yi(i,t){let e="";for(const s of i)s.literal?e+=s.val:e+=t(s.val);return e}const Tr={D:Pe,DD:cn,DDD:dn,DDDD:hn,t:un,tt:pn,ttt:mn,tttt:fn,T:gn,TT:bn,TTT:vn,TTTT:yn,f:$n,ff:_n,fff:Sn,ffff:On,F:wn,FF:kn,FFF:jn,FFFF:Cn};class F{static create(t,e={}){return new F(t,e)}static parseFormat(t){let e=null,s="",n=!1;const a=[];for(let r=0;r<t.length;r++){const o=t.charAt(r);o==="'"?(s.length>0&&a.push({literal:n||/^\s+$/.test(s),val:s}),e=null,s="",n=!n):n||o===e?s+=o:(s.length>0&&a.push({literal:/^\s+$/.test(s),val:s}),s=o,e=o)}return s.length>0&&a.push({literal:n||/^\s+$/.test(s),val:s}),a}static macroTokenToFormatOpts(t){return Tr[t]}constructor(t,e){this.opts=e,this.loc=t,this.systemLoc=null}formatWithSystemDefault(t,e){return this.systemLoc===null&&(this.systemLoc=this.loc.redefaultToSystem()),this.systemLoc.dtFormatter(t,{...this.opts,...e}).format()}dtFormatter(t,e={}){return this.loc.dtFormatter(t,{...this.opts,...e})}formatDateTime(t,e){return this.dtFormatter(t,e).format()}formatDateTimeParts(t,e){return this.dtFormatter(t,e).formatToParts()}formatInterval(t,e){return this.dtFormatter(t.start,e).dtf.formatRange(t.start.toJSDate(),t.end.toJSDate())}resolvedOptions(t,e){return this.dtFormatter(t,e).resolvedOptions()}num(t,e=0){if(this.opts.forceSimple)return D(t,e);const s={...this.opts};return e>0&&(s.padTo=e),this.loc.numberFormatter(s).format(t)}formatDateTimeFromString(t,e){const s=this.loc.listingMode()==="en",n=this.loc.outputCalendar&&this.loc.outputCalendar!=="gregory",a=(g,$)=>this.loc.extract(t,g,$),r=g=>t.isOffsetFixed&&t.offset===0&&g.allowZ?"Z":t.isValid?t.zone.formatOffset(t.ts,g.format):"",o=()=>s?jr(t):a({hour:"numeric",hourCycle:"h12"},"dayperiod"),c=(g,$)=>s?Cr(t,g):a($?{month:g}:{month:g,day:"numeric"},"month"),d=(g,$)=>s?Or(t,g):a($?{weekday:g}:{weekday:g,month:"long",day:"numeric"},"weekday"),u=g=>{const $=F.macroTokenToFormatOpts(g);return $?this.formatWithSystemDefault(t,$):g},p=g=>s?xr(t,g):a({era:g},"era"),m=g=>{switch(g){case"S":return this.num(t.millisecond);case"u":case"SSS":return this.num(t.millisecond,3);case"s":return this.num(t.second);case"ss":return this.num(t.second,2);case"uu":return this.num(Math.floor(t.millisecond/10),2);case"uuu":return this.num(Math.floor(t.millisecond/100));case"m":return this.num(t.minute);case"mm":return this.num(t.minute,2);case"h":return this.num(t.hour%12===0?12:t.hour%12);case"hh":return this.num(t.hour%12===0?12:t.hour%12,2);case"H":return this.num(t.hour);case"HH":return this.num(t.hour,2);case"Z":return r({format:"narrow",allowZ:this.opts.allowZ});case"ZZ":return r({format:"short",allowZ:this.opts.allowZ});case"ZZZ":return r({format:"techie",allowZ:this.opts.allowZ});case"ZZZZ":return t.zone.offsetName(t.ts,{format:"short",locale:this.loc.locale});case"ZZZZZ":return t.zone.offsetName(t.ts,{format:"long",locale:this.loc.locale});case"z":return t.zoneName;case"a":return o();case"d":return n?a({day:"numeric"},"day"):this.num(t.day);case"dd":return n?a({day:"2-digit"},"day"):this.num(t.day,2);case"c":return this.num(t.weekday);case"ccc":return d("short",!0);case"cccc":return d("long",!0);case"ccccc":return d("narrow",!0);case"E":return this.num(t.weekday);case"EEE":return d("short",!1);case"EEEE":return d("long",!1);case"EEEEE":return d("narrow",!1);case"L":return n?a({month:"numeric",day:"numeric"},"month"):this.num(t.month);case"LL":return n?a({month:"2-digit",day:"numeric"},"month"):this.num(t.month,2);case"LLL":return c("short",!0);case"LLLL":return c("long",!0);case"LLLLL":return c("narrow",!0);case"M":return n?a({month:"numeric"},"month"):this.num(t.month);case"MM":return n?a({month:"2-digit"},"month"):this.num(t.month,2);case"MMM":return c("short",!1);case"MMMM":return c("long",!1);case"MMMMM":return c("narrow",!1);case"y":return n?a({year:"numeric"},"year"):this.num(t.year);case"yy":return n?a({year:"2-digit"},"year"):this.num(t.year.toString().slice(-2),2);case"yyyy":return n?a({year:"numeric"},"year"):this.num(t.year,4);case"yyyyyy":return n?a({year:"numeric"},"year"):this.num(t.year,6);case"G":return p("short");case"GG":return p("long");case"GGGGG":return p("narrow");case"kk":return this.num(t.weekYear.toString().slice(-2),2);case"kkkk":return this.num(t.weekYear,4);case"W":return this.num(t.weekNumber);case"WW":return this.num(t.weekNumber,2);case"n":return this.num(t.localWeekNumber);case"nn":return this.num(t.localWeekNumber,2);case"ii":return this.num(t.localWeekYear.toString().slice(-2),2);case"iiii":return this.num(t.localWeekYear,4);case"o":return this.num(t.ordinal);case"ooo":return this.num(t.ordinal,3);case"q":return this.num(t.quarter);case"qq":return this.num(t.quarter,2);case"X":return this.num(Math.floor(t.ts/1e3));case"x":return this.num(t.ts);default:return u(g)}};return yi(F.parseFormat(e),m)}formatDurationFromString(t,e){const s=c=>{switch(c[0]){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":return"hour";case"d":return"day";case"w":return"week";case"M":return"month";case"y":return"year";default:return null}},n=c=>d=>{const u=s(d);return u?this.num(c.get(u),d.length):d},a=F.parseFormat(e),r=a.reduce((c,{literal:d,val:u})=>d?c:c.concat(u),[]),o=t.shiftTo(...r.map(s).filter(c=>c));return yi(a,n(o))}}const Hn=/[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;function Vt(...i){const t=i.reduce((e,s)=>e+s.source,"");return RegExp(`^${t}$`)}function Ht(...i){return t=>i.reduce(([e,s,n],a)=>{const[r,o,c]=a(t,n);return[{...e,...r},o||s,c]},[{},null,1]).slice(0,2)}function Bt(i,...t){if(i==null)return[null,null];for(const[e,s]of t){const n=e.exec(i);if(n)return s(n)}return[null,null]}function Bn(...i){return(t,e)=>{const s={};let n;for(n=0;n<i.length;n++)s[i[n]]=mt(t[e+n]);return[s,null,e+n]}}const Gn=/(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,Mr=`(?:${Gn.source}?(?:\\[(${Hn.source})\\])?)?`,Rs=/(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,Zn=RegExp(`${Rs.source}${Mr}`),Fs=RegExp(`(?:T${Zn.source})?`),Ir=/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,zr=/(\d{4})-?W(\d\d)(?:-?(\d))?/,Dr=/(\d{4})-?(\d{3})/,Pr=Bn("weekYear","weekNumber","weekDay"),Ar=Bn("year","ordinal"),Lr=/(\d{4})-(\d\d)-(\d\d)/,Kn=RegExp(`${Rs.source} ?(?:${Gn.source}|(${Hn.source}))?`),Nr=RegExp(`(?: ${Kn.source})?`);function Rt(i,t,e){const s=i[t];return w(s)?e:mt(s)}function Rr(i,t){return[{year:Rt(i,t),month:Rt(i,t+1,1),day:Rt(i,t+2,1)},null,t+3]}function Gt(i,t){return[{hours:Rt(i,t,0),minutes:Rt(i,t+1,0),seconds:Rt(i,t+2,0),milliseconds:Ls(i[t+3])},null,t+4]}function me(i,t){const e=!i[t]&&!i[t+1],s=Ke(i[t+1],i[t+2]),n=e?null:q.instance(s);return[{},n,t+3]}function fe(i,t){const e=i[t]?lt.create(i[t]):null;return[{},e,t+1]}const Fr=RegExp(`^T?${Rs.source}$`),Ur=/^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;function qr(i){const[t,e,s,n,a,r,o,c,d]=i,u=t[0]==="-",p=c&&c[0]==="-",m=(g,$=!1)=>g!==void 0&&($||g&&u)?-g:g;return[{years:m(_t(e)),months:m(_t(s)),weeks:m(_t(n)),days:m(_t(a)),hours:m(_t(r)),minutes:m(_t(o)),seconds:m(_t(c),c==="-0"),milliseconds:m(Ls(d),p)}]}const Wr={GMT:0,EDT:-4*60,EST:-5*60,CDT:-5*60,CST:-6*60,MDT:-6*60,MST:-7*60,PDT:-7*60,PST:-8*60};function Us(i,t,e,s,n,a,r){const o={year:t.length===2?Cs(mt(t)):mt(t),month:Nn.indexOf(e)+1,day:mt(s),hour:mt(n),minute:mt(a)};return r&&(o.second=mt(r)),i&&(o.weekday=i.length>3?Fn.indexOf(i)+1:Un.indexOf(i)+1),o}const Vr=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;function Hr(i){const[,t,e,s,n,a,r,o,c,d,u,p]=i,m=Us(t,n,s,e,a,r,o);let g;return c?g=Wr[c]:d?g=0:g=Ke(u,p),[m,new q(g)]}function Br(i){return i.replace(/\([^()]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").trim()}const Gr=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,Zr=/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,Kr=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;function $i(i){const[,t,e,s,n,a,r,o]=i;return[Us(t,n,s,e,a,r,o),q.utcInstance]}function Qr(i){const[,t,e,s,n,a,r,o]=i;return[Us(t,o,e,s,n,a,r),q.utcInstance]}const Yr=Vt(Ir,Fs),Jr=Vt(zr,Fs),Xr=Vt(Dr,Fs),to=Vt(Zn),Qn=Ht(Rr,Gt,me,fe),eo=Ht(Pr,Gt,me,fe),so=Ht(Ar,Gt,me,fe),io=Ht(Gt,me,fe);function no(i){return Bt(i,[Yr,Qn],[Jr,eo],[Xr,so],[to,io])}function ao(i){return Bt(Br(i),[Vr,Hr])}function ro(i){return Bt(i,[Gr,$i],[Zr,$i],[Kr,Qr])}function oo(i){return Bt(i,[Ur,qr])}const lo=Ht(Gt);function co(i){return Bt(i,[Fr,lo])}const ho=Vt(Lr,Nr),uo=Vt(Kn),po=Ht(Gt,me,fe);function mo(i){return Bt(i,[ho,Qn],[uo,po])}const wi="Invalid Duration",Yn={weeks:{days:7,hours:7*24,minutes:7*24*60,seconds:7*24*60*60,milliseconds:7*24*60*60*1e3},days:{hours:24,minutes:24*60,seconds:24*60*60,milliseconds:24*60*60*1e3},hours:{minutes:60,seconds:60*60,milliseconds:60*60*1e3},minutes:{seconds:60,milliseconds:60*1e3},seconds:{milliseconds:1e3}},fo={years:{quarters:4,months:12,weeks:52,days:365,hours:365*24,minutes:365*24*60,seconds:365*24*60*60,milliseconds:365*24*60*60*1e3},quarters:{months:3,weeks:13,days:91,hours:91*24,minutes:91*24*60,seconds:91*24*60*60,milliseconds:91*24*60*60*1e3},months:{weeks:4,days:30,hours:30*24,minutes:30*24*60,seconds:30*24*60*60,milliseconds:30*24*60*60*1e3},...Yn},K=146097/400,Mt=146097/4800,go={years:{quarters:4,months:12,weeks:K/7,days:K,hours:K*24,minutes:K*24*60,seconds:K*24*60*60,milliseconds:K*24*60*60*1e3},quarters:{months:3,weeks:K/28,days:K/4,hours:K*24/4,minutes:K*24*60/4,seconds:K*24*60*60/4,milliseconds:K*24*60*60*1e3/4},months:{weeks:Mt/7,days:Mt,hours:Mt*24,minutes:Mt*24*60,seconds:Mt*24*60*60,milliseconds:Mt*24*60*60*1e3},...Yn},Ot=["years","quarters","months","weeks","days","hours","minutes","seconds","milliseconds"],bo=Ot.slice(0).reverse();function pt(i,t,e=!1){const s={values:e?t.values:{...i.values,...t.values||{}},loc:i.loc.clone(t.loc),conversionAccuracy:t.conversionAccuracy||i.conversionAccuracy,matrix:t.matrix||i.matrix};return new O(s)}function Jn(i,t){var e;let s=(e=t.milliseconds)!==null&&e!==void 0?e:0;for(const n of bo.slice(1))t[n]&&(s+=t[n]*i[n].milliseconds);return s}function _i(i,t){const e=Jn(i,t)<0?-1:1;Ot.reduceRight((s,n)=>{if(w(t[n]))return s;if(s){const a=t[s]*e,r=i[n][s],o=Math.floor(a/r);t[n]+=o*e,t[s]-=o*r*e}return n},null),Ot.reduce((s,n)=>{if(w(t[n]))return s;if(s){const a=t[s]%1;t[s]-=a,t[n]+=a*i[s][n]}return n},null)}function vo(i){const t={};for(const[e,s]of Object.entries(i))s!==0&&(t[e]=s);return t}class O{constructor(t){const e=t.conversionAccuracy==="longterm"||!1;let s=e?go:fo;t.matrix&&(s=t.matrix),this.values=t.values,this.loc=t.loc||x.create(),this.conversionAccuracy=e?"longterm":"casual",this.invalid=t.invalid||null,this.matrix=s,this.isLuxonDuration=!0}static fromMillis(t,e){return O.fromObject({milliseconds:t},e)}static fromObject(t,e={}){if(t==null||typeof t!="object")throw new R(`Duration.fromObject: argument expected to be an object, got ${t===null?"null":typeof t}`);return new O({values:Ne(t,O.normalizeUnit),loc:x.fromObject(e),conversionAccuracy:e.conversionAccuracy,matrix:e.matrix})}static fromDurationLike(t){if(bt(t))return O.fromMillis(t);if(O.isDuration(t))return t;if(typeof t=="object")return O.fromObject(t);throw new R(`Unknown duration argument ${t} of type ${typeof t}`)}static fromISO(t,e){const[s]=oo(t);return s?O.fromObject(s,e):O.invalid("unparsable",`the input "${t}" can't be parsed as ISO 8601`)}static fromISOTime(t,e){const[s]=co(t);return s?O.fromObject(s,e):O.invalid("unparsable",`the input "${t}" can't be parsed as ISO 8601`)}static invalid(t,e=null){if(!t)throw new R("need to specify a reason the Duration is invalid");const s=t instanceof st?t:new st(t,e);if(M.throwOnInvalid)throw new Ua(s);return new O({invalid:s})}static normalizeUnit(t){const e={year:"years",years:"years",quarter:"quarters",quarters:"quarters",month:"months",months:"months",week:"weeks",weeks:"weeks",day:"days",days:"days",hour:"hours",hours:"hours",minute:"minutes",minutes:"minutes",second:"seconds",seconds:"seconds",millisecond:"milliseconds",milliseconds:"milliseconds"}[t&&t.toLowerCase()];if(!e)throw new ln(t);return e}static isDuration(t){return t&&t.isLuxonDuration||!1}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}toFormat(t,e={}){const s={...e,floor:e.round!==!1&&e.floor!==!1};return this.isValid?F.create(this.loc,s).formatDurationFromString(this,t):wi}toHuman(t={}){if(!this.isValid)return wi;const e=Ot.map(s=>{const n=this.values[s];return w(n)?null:this.loc.numberFormatter({style:"unit",unitDisplay:"long",...t,unit:s.slice(0,-1)}).format(n)}).filter(s=>s);return this.loc.listFormatter({type:"conjunction",style:t.listStyle||"narrow",...t}).format(e)}toObject(){return this.isValid?{...this.values}:{}}toISO(){if(!this.isValid)return null;let t="P";return this.years!==0&&(t+=this.years+"Y"),(this.months!==0||this.quarters!==0)&&(t+=this.months+this.quarters*3+"M"),this.weeks!==0&&(t+=this.weeks+"W"),this.days!==0&&(t+=this.days+"D"),(this.hours!==0||this.minutes!==0||this.seconds!==0||this.milliseconds!==0)&&(t+="T"),this.hours!==0&&(t+=this.hours+"H"),this.minutes!==0&&(t+=this.minutes+"M"),(this.seconds!==0||this.milliseconds!==0)&&(t+=Ns(this.seconds+this.milliseconds/1e3,3)+"S"),t==="P"&&(t+="T0S"),t}toISOTime(t={}){if(!this.isValid)return null;const e=this.toMillis();return e<0||e>=864e5?null:(t={suppressMilliseconds:!1,suppressSeconds:!1,includePrefix:!1,format:"extended",...t,includeOffset:!1},f.fromMillis(e,{zone:"UTC"}).toISOTime(t))}toJSON(){return this.toISO()}toString(){return this.toISO()}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Duration { values: ${JSON.stringify(this.values)} }`:`Duration { Invalid, reason: ${this.invalidReason} }`}toMillis(){return this.isValid?Jn(this.matrix,this.values):NaN}valueOf(){return this.toMillis()}plus(t){if(!this.isValid)return this;const e=O.fromDurationLike(t),s={};for(const n of Ot)(qt(e.values,n)||qt(this.values,n))&&(s[n]=e.get(n)+this.get(n));return pt(this,{values:s},!0)}minus(t){if(!this.isValid)return this;const e=O.fromDurationLike(t);return this.plus(e.negate())}mapUnits(t){if(!this.isValid)return this;const e={};for(const s of Object.keys(this.values))e[s]=Ln(t(this.values[s],s));return pt(this,{values:e},!0)}get(t){return this[O.normalizeUnit(t)]}set(t){if(!this.isValid)return this;const e={...this.values,...Ne(t,O.normalizeUnit)};return pt(this,{values:e})}reconfigure({locale:t,numberingSystem:e,conversionAccuracy:s,matrix:n}={}){const r={loc:this.loc.clone({locale:t,numberingSystem:e}),matrix:n,conversionAccuracy:s};return pt(this,r)}as(t){return this.isValid?this.shiftTo(t).get(t):NaN}normalize(){if(!this.isValid)return this;const t=this.toObject();return _i(this.matrix,t),pt(this,{values:t},!0)}rescale(){if(!this.isValid)return this;const t=vo(this.normalize().shiftToAll().toObject());return pt(this,{values:t},!0)}shiftTo(...t){if(!this.isValid)return this;if(t.length===0)return this;t=t.map(r=>O.normalizeUnit(r));const e={},s={},n=this.toObject();let a;for(const r of Ot)if(t.indexOf(r)>=0){a=r;let o=0;for(const d in s)o+=this.matrix[d][r]*s[d],s[d]=0;bt(n[r])&&(o+=n[r]);const c=Math.trunc(o);e[r]=c,s[r]=(o*1e3-c*1e3)/1e3}else bt(n[r])&&(s[r]=n[r]);for(const r in s)s[r]!==0&&(e[a]+=r===a?s[r]:s[r]/this.matrix[a][r]);return _i(this.matrix,e),pt(this,{values:e},!0)}shiftToAll(){return this.isValid?this.shiftTo("years","months","weeks","days","hours","minutes","seconds","milliseconds"):this}negate(){if(!this.isValid)return this;const t={};for(const e of Object.keys(this.values))t[e]=this.values[e]===0?0:-this.values[e];return pt(this,{values:t},!0)}get years(){return this.isValid?this.values.years||0:NaN}get quarters(){return this.isValid?this.values.quarters||0:NaN}get months(){return this.isValid?this.values.months||0:NaN}get weeks(){return this.isValid?this.values.weeks||0:NaN}get days(){return this.isValid?this.values.days||0:NaN}get hours(){return this.isValid?this.values.hours||0:NaN}get minutes(){return this.isValid?this.values.minutes||0:NaN}get seconds(){return this.isValid?this.values.seconds||0:NaN}get milliseconds(){return this.isValid?this.values.milliseconds||0:NaN}get isValid(){return this.invalid===null}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}equals(t){if(!this.isValid||!t.isValid||!this.loc.equals(t.loc))return!1;function e(s,n){return s===void 0||s===0?n===void 0||n===0:s===n}for(const s of Ot)if(!e(this.values[s],t.values[s]))return!1;return!0}}const It="Invalid Interval";function yo(i,t){return!i||!i.isValid?I.invalid("missing or invalid start"):!t||!t.isValid?I.invalid("missing or invalid end"):t<i?I.invalid("end before start",`The end of an interval must be after its start, but you had start=${i.toISO()} and end=${t.toISO()}`):null}class I{constructor(t){this.s=t.start,this.e=t.end,this.invalid=t.invalid||null,this.isLuxonInterval=!0}static invalid(t,e=null){if(!t)throw new R("need to specify a reason the Interval is invalid");const s=t instanceof st?t:new st(t,e);if(M.throwOnInvalid)throw new Fa(s);return new I({invalid:s})}static fromDateTimes(t,e){const s=Jt(t),n=Jt(e),a=yo(s,n);return a??new I({start:s,end:n})}static after(t,e){const s=O.fromDurationLike(e),n=Jt(t);return I.fromDateTimes(n,n.plus(s))}static before(t,e){const s=O.fromDurationLike(e),n=Jt(t);return I.fromDateTimes(n.minus(s),n)}static fromISO(t,e){const[s,n]=(t||"").split("/",2);if(s&&n){let a,r;try{a=f.fromISO(s,e),r=a.isValid}catch{r=!1}let o,c;try{o=f.fromISO(n,e),c=o.isValid}catch{c=!1}if(r&&c)return I.fromDateTimes(a,o);if(r){const d=O.fromISO(n,e);if(d.isValid)return I.after(a,d)}else if(c){const d=O.fromISO(s,e);if(d.isValid)return I.before(o,d)}}return I.invalid("unparsable",`the input "${t}" can't be parsed as ISO 8601`)}static isInterval(t){return t&&t.isLuxonInterval||!1}get start(){return this.isValid?this.s:null}get end(){return this.isValid?this.e:null}get isValid(){return this.invalidReason===null}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}length(t="milliseconds"){return this.isValid?this.toDuration(t).get(t):NaN}count(t="milliseconds",e){if(!this.isValid)return NaN;const s=this.start.startOf(t,e);let n;return e!=null&&e.useLocaleWeeks?n=this.end.reconfigure({locale:s.locale}):n=this.end,n=n.startOf(t,e),Math.floor(n.diff(s,t).get(t))+(n.valueOf()!==this.end.valueOf())}hasSame(t){return this.isValid?this.isEmpty()||this.e.minus(1).hasSame(this.s,t):!1}isEmpty(){return this.s.valueOf()===this.e.valueOf()}isAfter(t){return this.isValid?this.s>t:!1}isBefore(t){return this.isValid?this.e<=t:!1}contains(t){return this.isValid?this.s<=t&&this.e>t:!1}set({start:t,end:e}={}){return this.isValid?I.fromDateTimes(t||this.s,e||this.e):this}splitAt(...t){if(!this.isValid)return[];const e=t.map(Jt).filter(r=>this.contains(r)).sort((r,o)=>r.toMillis()-o.toMillis()),s=[];let{s:n}=this,a=0;for(;n<this.e;){const r=e[a]||this.e,o=+r>+this.e?this.e:r;s.push(I.fromDateTimes(n,o)),n=o,a+=1}return s}splitBy(t){const e=O.fromDurationLike(t);if(!this.isValid||!e.isValid||e.as("milliseconds")===0)return[];let{s}=this,n=1,a;const r=[];for(;s<this.e;){const o=this.start.plus(e.mapUnits(c=>c*n));a=+o>+this.e?this.e:o,r.push(I.fromDateTimes(s,a)),s=a,n+=1}return r}divideEqually(t){return this.isValid?this.splitBy(this.length()/t).slice(0,t):[]}overlaps(t){return this.e>t.s&&this.s<t.e}abutsStart(t){return this.isValid?+this.e==+t.s:!1}abutsEnd(t){return this.isValid?+t.e==+this.s:!1}engulfs(t){return this.isValid?this.s<=t.s&&this.e>=t.e:!1}equals(t){return!this.isValid||!t.isValid?!1:this.s.equals(t.s)&&this.e.equals(t.e)}intersection(t){if(!this.isValid)return this;const e=this.s>t.s?this.s:t.s,s=this.e<t.e?this.e:t.e;return e>=s?null:I.fromDateTimes(e,s)}union(t){if(!this.isValid)return this;const e=this.s<t.s?this.s:t.s,s=this.e>t.e?this.e:t.e;return I.fromDateTimes(e,s)}static merge(t){const[e,s]=t.sort((n,a)=>n.s-a.s).reduce(([n,a],r)=>a?a.overlaps(r)||a.abutsStart(r)?[n,a.union(r)]:[n.concat([a]),r]:[n,r],[[],null]);return s&&e.push(s),e}static xor(t){let e=null,s=0;const n=[],a=t.map(c=>[{time:c.s,type:"s"},{time:c.e,type:"e"}]),r=Array.prototype.concat(...a),o=r.sort((c,d)=>c.time-d.time);for(const c of o)s+=c.type==="s"?1:-1,s===1?e=c.time:(e&&+e!=+c.time&&n.push(I.fromDateTimes(e,c.time)),e=null);return I.merge(n)}difference(...t){return I.xor([this].concat(t)).map(e=>this.intersection(e)).filter(e=>e&&!e.isEmpty())}toString(){return this.isValid?`[${this.s.toISO()} – ${this.e.toISO()})`:It}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`:`Interval { Invalid, reason: ${this.invalidReason} }`}toLocaleString(t=Pe,e={}){return this.isValid?F.create(this.s.loc.clone(e),t).formatInterval(this):It}toISO(t){return this.isValid?`${this.s.toISO(t)}/${this.e.toISO(t)}`:It}toISODate(){return this.isValid?`${this.s.toISODate()}/${this.e.toISODate()}`:It}toISOTime(t){return this.isValid?`${this.s.toISOTime(t)}/${this.e.toISOTime(t)}`:It}toFormat(t,{separator:e=" – "}={}){return this.isValid?`${this.s.toFormat(t)}${e}${this.e.toFormat(t)}`:It}toDuration(t,e){return this.isValid?this.e.diff(this.s,t,e):O.invalid(this.invalidReason)}mapEndpoints(t){return I.fromDateTimes(t(this.s),t(this.e))}}class we{static hasDST(t=M.defaultZone){const e=f.now().setZone(t).set({month:12});return!t.isUniversal&&e.offset!==e.set({month:6}).offset}static isValidIANAZone(t){return lt.isValidZone(t)}static normalizeZone(t){return ft(t,M.defaultZone)}static getStartOfWeek({locale:t=null,locObj:e=null}={}){return(e||x.create(t)).getStartOfWeek()}static getMinimumDaysInFirstWeek({locale:t=null,locObj:e=null}={}){return(e||x.create(t)).getMinDaysInFirstWeek()}static getWeekendWeekdays({locale:t=null,locObj:e=null}={}){return(e||x.create(t)).getWeekendDays().slice()}static months(t="long",{locale:e=null,numberingSystem:s=null,locObj:n=null,outputCalendar:a="gregory"}={}){return(n||x.create(e,s,a)).months(t)}static monthsFormat(t="long",{locale:e=null,numberingSystem:s=null,locObj:n=null,outputCalendar:a="gregory"}={}){return(n||x.create(e,s,a)).months(t,!0)}static weekdays(t="long",{locale:e=null,numberingSystem:s=null,locObj:n=null}={}){return(n||x.create(e,s,null)).weekdays(t)}static weekdaysFormat(t="long",{locale:e=null,numberingSystem:s=null,locObj:n=null}={}){return(n||x.create(e,s,null)).weekdays(t,!0)}static meridiems({locale:t=null}={}){return x.create(t).meridiems()}static eras(t="short",{locale:e=null}={}){return x.create(e,null,"gregory").eras(t)}static features(){return{relative:Dn(),localeWeek:Pn()}}}function ki(i,t){const e=n=>n.toUTC(0,{keepLocalTime:!0}).startOf("day").valueOf(),s=e(t)-e(i);return Math.floor(O.fromMillis(s).as("days"))}function $o(i,t,e){const s=[["years",(c,d)=>d.year-c.year],["quarters",(c,d)=>d.quarter-c.quarter+(d.year-c.year)*4],["months",(c,d)=>d.month-c.month+(d.year-c.year)*12],["weeks",(c,d)=>{const u=ki(c,d);return(u-u%7)/7}],["days",ki]],n={},a=i;let r,o;for(const[c,d]of s)e.indexOf(c)>=0&&(r=c,n[c]=d(i,t),o=a.plus(n),o>t?(n[c]--,i=a.plus(n),i>t&&(o=i,n[c]--,i=a.plus(n))):i=o);return[i,n,o,r]}function wo(i,t,e,s){let[n,a,r,o]=$o(i,t,e);const c=t-n,d=e.filter(p=>["hours","minutes","seconds","milliseconds"].indexOf(p)>=0);d.length===0&&(r<t&&(r=n.plus({[o]:1})),r!==n&&(a[o]=(a[o]||0)+c/(r-n)));const u=O.fromObject(a,s);return d.length>0?O.fromMillis(c,s).shiftTo(...d).plus(u):u}const _o="missing Intl.DateTimeFormat.formatToParts support";function C(i,t=e=>e){return{regex:i,deser:([e])=>t(dr(e))}}const ko=String.fromCharCode(160),Xn=`[ ${ko}]`,ta=new RegExp(Xn,"g");function So(i){return i.replace(/\./g,"\\.?").replace(ta,Xn)}function Si(i){return i.replace(/\./g,"").replace(ta," ").toLowerCase()}function X(i,t){return i===null?null:{regex:RegExp(i.map(So).join("|")),deser:([e])=>i.findIndex(s=>Si(e)===Si(s))+t}}function ji(i,t){return{regex:i,deser:([,e,s])=>Ke(e,s),groups:t}}function _e(i){return{regex:i,deser:([t])=>t}}function jo(i){return i.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function Oo(i,t){const e=J(t),s=J(t,"{2}"),n=J(t,"{3}"),a=J(t,"{4}"),r=J(t,"{6}"),o=J(t,"{1,2}"),c=J(t,"{1,3}"),d=J(t,"{1,6}"),u=J(t,"{1,9}"),p=J(t,"{2,4}"),m=J(t,"{4,6}"),g=T=>({regex:RegExp(jo(T.val)),deser:([W])=>W,literal:!0}),j=(T=>{if(i.literal)return g(T);switch(T.val){case"G":return X(t.eras("short"),0);case"GG":return X(t.eras("long"),0);case"y":return C(d);case"yy":return C(p,Cs);case"yyyy":return C(a);case"yyyyy":return C(m);case"yyyyyy":return C(r);case"M":return C(o);case"MM":return C(s);case"MMM":return X(t.months("short",!0),1);case"MMMM":return X(t.months("long",!0),1);case"L":return C(o);case"LL":return C(s);case"LLL":return X(t.months("short",!1),1);case"LLLL":return X(t.months("long",!1),1);case"d":return C(o);case"dd":return C(s);case"o":return C(c);case"ooo":return C(n);case"HH":return C(s);case"H":return C(o);case"hh":return C(s);case"h":return C(o);case"mm":return C(s);case"m":return C(o);case"q":return C(o);case"qq":return C(s);case"s":return C(o);case"ss":return C(s);case"S":return C(c);case"SSS":return C(n);case"u":return _e(u);case"uu":return _e(o);case"uuu":return C(e);case"a":return X(t.meridiems(),0);case"kkkk":return C(a);case"kk":return C(p,Cs);case"W":return C(o);case"WW":return C(s);case"E":case"c":return C(e);case"EEE":return X(t.weekdays("short",!1),1);case"EEEE":return X(t.weekdays("long",!1),1);case"ccc":return X(t.weekdays("short",!0),1);case"cccc":return X(t.weekdays("long",!0),1);case"Z":case"ZZ":return ji(new RegExp(`([+-]${o.source})(?::(${s.source}))?`),2);case"ZZZ":return ji(new RegExp(`([+-]${o.source})(${s.source})?`),2);case"z":return _e(/[a-z_+-/]{1,256}?/i);case" ":return _e(/[^\S\n\r]/);default:return g(T)}})(i)||{invalidReason:_o};return j.token=i,j}const Co={year:{"2-digit":"yy",numeric:"yyyyy"},month:{numeric:"M","2-digit":"MM",short:"MMM",long:"MMMM"},day:{numeric:"d","2-digit":"dd"},weekday:{short:"EEE",long:"EEEE"},dayperiod:"a",dayPeriod:"a",hour12:{numeric:"h","2-digit":"hh"},hour24:{numeric:"H","2-digit":"HH"},minute:{numeric:"m","2-digit":"mm"},second:{numeric:"s","2-digit":"ss"},timeZoneName:{long:"ZZZZZ",short:"ZZZ"}};function xo(i,t,e){const{type:s,value:n}=i;if(s==="literal"){const c=/^\s+$/.test(n);return{literal:!c,val:c?" ":n}}const a=t[s];let r=s;s==="hour"&&(t.hour12!=null?r=t.hour12?"hour12":"hour24":t.hourCycle!=null?t.hourCycle==="h11"||t.hourCycle==="h12"?r="hour12":r="hour24":r=e.hour12?"hour12":"hour24");let o=Co[r];if(typeof o=="object"&&(o=o[a]),o)return{literal:!1,val:o}}function Eo(i){return[`^${i.map(e=>e.regex).reduce((e,s)=>`${e}(${s.source})`,"")}$`,i]}function To(i,t,e){const s=i.match(t);if(s){const n={};let a=1;for(const r in e)if(qt(e,r)){const o=e[r],c=o.groups?o.groups+1:1;!o.literal&&o.token&&(n[o.token.val[0]]=o.deser(s.slice(a,a+c))),a+=c}return[s,n]}else return[s,{}]}function Mo(i){const t=a=>{switch(a){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":case"H":return"hour";case"d":return"day";case"o":return"ordinal";case"L":case"M":return"month";case"y":return"year";case"E":case"c":return"weekday";case"W":return"weekNumber";case"k":return"weekYear";case"q":return"quarter";default:return null}};let e=null,s;return w(i.z)||(e=lt.create(i.z)),w(i.Z)||(e||(e=new q(i.Z)),s=i.Z),w(i.q)||(i.M=(i.q-1)*3+1),w(i.h)||(i.h<12&&i.a===1?i.h+=12:i.h===12&&i.a===0&&(i.h=0)),i.G===0&&i.y&&(i.y=-i.y),w(i.u)||(i.S=Ls(i.u)),[Object.keys(i).reduce((a,r)=>{const o=t(r);return o&&(a[o]=i[r]),a},{}),e,s]}let hs=null;function Io(){return hs||(hs=f.fromMillis(1555555555555)),hs}function zo(i,t){if(i.literal)return i;const e=F.macroTokenToFormatOpts(i.val),s=na(e,t);return s==null||s.includes(void 0)?i:s}function ea(i,t){return Array.prototype.concat(...i.map(e=>zo(e,t)))}class sa{constructor(t,e){if(this.locale=t,this.format=e,this.tokens=ea(F.parseFormat(e),t),this.units=this.tokens.map(s=>Oo(s,t)),this.disqualifyingUnit=this.units.find(s=>s.invalidReason),!this.disqualifyingUnit){const[s,n]=Eo(this.units);this.regex=RegExp(s,"i"),this.handlers=n}}explainFromTokens(t){if(this.isValid){const[e,s]=To(t,this.regex,this.handlers),[n,a,r]=s?Mo(s):[null,null,void 0];if(qt(s,"a")&&qt(s,"H"))throw new At("Can't include meridiem when specifying 24-hour format");return{input:t,tokens:this.tokens,regex:this.regex,rawMatches:e,matches:s,result:n,zone:a,specificOffset:r}}else return{input:t,tokens:this.tokens,invalidReason:this.invalidReason}}get isValid(){return!this.disqualifyingUnit}get invalidReason(){return this.disqualifyingUnit?this.disqualifyingUnit.invalidReason:null}}function ia(i,t,e){return new sa(i,e).explainFromTokens(t)}function Do(i,t,e){const{result:s,zone:n,specificOffset:a,invalidReason:r}=ia(i,t,e);return[s,n,a,r]}function na(i,t){if(!i)return null;const s=F.create(t,i).dtFormatter(Io()),n=s.formatToParts(),a=s.resolvedOptions();return n.map(r=>xo(r,i,a))}const us="Invalid DateTime",Oi=864e13;function se(i){return new st("unsupported zone",`the zone "${i.name}" is not supported`)}function ps(i){return i.weekData===null&&(i.weekData=Ae(i.c)),i.weekData}function ms(i){return i.localWeekData===null&&(i.localWeekData=Ae(i.c,i.loc.getMinDaysInFirstWeek(),i.loc.getStartOfWeek())),i.localWeekData}function kt(i,t){const e={ts:i.ts,zone:i.zone,c:i.c,o:i.o,loc:i.loc,invalid:i.invalid};return new f({...e,...t,old:e})}function aa(i,t,e){let s=i-t*60*1e3;const n=e.offset(s);if(t===n)return[s,t];s-=(n-t)*60*1e3;const a=e.offset(s);return n===a?[s,n]:[i-Math.min(n,a)*60*1e3,Math.max(n,a)]}function ke(i,t){i+=t*60*1e3;const e=new Date(i);return{year:e.getUTCFullYear(),month:e.getUTCMonth()+1,day:e.getUTCDate(),hour:e.getUTCHours(),minute:e.getUTCMinutes(),second:e.getUTCSeconds(),millisecond:e.getUTCMilliseconds()}}function xe(i,t,e){return aa(Ze(i),t,e)}function Ci(i,t){const e=i.o,s=i.c.year+Math.trunc(t.years),n=i.c.month+Math.trunc(t.months)+Math.trunc(t.quarters)*3,a={...i.c,year:s,month:n,day:Math.min(i.c.day,Le(s,n))+Math.trunc(t.days)+Math.trunc(t.weeks)*7},r=O.fromObject({years:t.years-Math.trunc(t.years),quarters:t.quarters-Math.trunc(t.quarters),months:t.months-Math.trunc(t.months),weeks:t.weeks-Math.trunc(t.weeks),days:t.days-Math.trunc(t.days),hours:t.hours,minutes:t.minutes,seconds:t.seconds,milliseconds:t.milliseconds}).as("milliseconds"),o=Ze(a);let[c,d]=aa(o,e,i.zone);return r!==0&&(c+=r,d=i.zone.offset(c)),{ts:c,o:d}}function zt(i,t,e,s,n,a){const{setZone:r,zone:o}=e;if(i&&Object.keys(i).length!==0||t){const c=t||o,d=f.fromObject(i,{...e,zone:c,specificOffset:a});return r?d:d.setZone(o)}else return f.invalid(new st("unparsable",`the input "${n}" can't be parsed as ${s}`))}function Se(i,t,e=!0){return i.isValid?F.create(x.create("en-US"),{allowZ:e,forceSimple:!0}).formatDateTimeFromString(i,t):null}function fs(i,t){const e=i.c.year>9999||i.c.year<0;let s="";return e&&i.c.year>=0&&(s+="+"),s+=D(i.c.year,e?6:4),t?(s+="-",s+=D(i.c.month),s+="-",s+=D(i.c.day)):(s+=D(i.c.month),s+=D(i.c.day)),s}function xi(i,t,e,s,n,a){let r=D(i.c.hour);return t?(r+=":",r+=D(i.c.minute),(i.c.millisecond!==0||i.c.second!==0||!e)&&(r+=":")):r+=D(i.c.minute),(i.c.millisecond!==0||i.c.second!==0||!e)&&(r+=D(i.c.second),(i.c.millisecond!==0||!s)&&(r+=".",r+=D(i.c.millisecond,3))),n&&(i.isOffsetFixed&&i.offset===0&&!a?r+="Z":i.o<0?(r+="-",r+=D(Math.trunc(-i.o/60)),r+=":",r+=D(Math.trunc(-i.o%60))):(r+="+",r+=D(Math.trunc(i.o/60)),r+=":",r+=D(Math.trunc(i.o%60)))),a&&(r+="["+i.zone.ianaName+"]"),r}const ra={month:1,day:1,hour:0,minute:0,second:0,millisecond:0},Po={weekNumber:1,weekday:1,hour:0,minute:0,second:0,millisecond:0},Ao={ordinal:1,hour:0,minute:0,second:0,millisecond:0},oa=["year","month","day","hour","minute","second","millisecond"],Lo=["weekYear","weekNumber","weekday","hour","minute","second","millisecond"],No=["year","ordinal","hour","minute","second","millisecond"];function Ro(i){const t={year:"year",years:"year",month:"month",months:"month",day:"day",days:"day",hour:"hour",hours:"hour",minute:"minute",minutes:"minute",quarter:"quarter",quarters:"quarter",second:"second",seconds:"second",millisecond:"millisecond",milliseconds:"millisecond",weekday:"weekday",weekdays:"weekday",weeknumber:"weekNumber",weeksnumber:"weekNumber",weeknumbers:"weekNumber",weekyear:"weekYear",weekyears:"weekYear",ordinal:"ordinal"}[i.toLowerCase()];if(!t)throw new ln(i);return t}function Ei(i){switch(i.toLowerCase()){case"localweekday":case"localweekdays":return"localWeekday";case"localweeknumber":case"localweeknumbers":return"localWeekNumber";case"localweekyear":case"localweekyears":return"localWeekYear";default:return Ro(i)}}function Fo(i){return Te[i]||(Ee===void 0&&(Ee=M.now()),Te[i]=i.offset(Ee)),Te[i]}function Ti(i,t){const e=ft(t.zone,M.defaultZone);if(!e.isValid)return f.invalid(se(e));const s=x.fromObject(t);let n,a;if(w(i.year))n=M.now();else{for(const c of oa)w(i[c])&&(i[c]=ra[c]);const r=In(i)||zn(i);if(r)return f.invalid(r);const o=Fo(e);[n,a]=xe(i,o,e)}return new f({ts:n,zone:e,loc:s,o:a})}function Mi(i,t,e){const s=w(e.round)?!0:e.round,n=(r,o)=>(r=Ns(r,s||e.calendary?0:2,!0),t.loc.clone(e).relFormatter(e).format(r,o)),a=r=>e.calendary?t.hasSame(i,r)?0:t.startOf(r).diff(i.startOf(r),r).get(r):t.diff(i,r).get(r);if(e.unit)return n(a(e.unit),e.unit);for(const r of e.units){const o=a(r);if(Math.abs(o)>=1)return n(o,r)}return n(i>t?-0:0,e.units[e.units.length-1])}function Ii(i){let t={},e;return i.length>0&&typeof i[i.length-1]=="object"?(t=i[i.length-1],e=Array.from(i).slice(0,i.length-1)):e=Array.from(i),[t,e]}let Ee,Te={};class f{constructor(t){const e=t.zone||M.defaultZone;let s=t.invalid||(Number.isNaN(t.ts)?new st("invalid input"):null)||(e.isValid?null:se(e));this.ts=w(t.ts)?M.now():t.ts;let n=null,a=null;if(!s)if(t.old&&t.old.ts===this.ts&&t.old.zone.equals(e))[n,a]=[t.old.c,t.old.o];else{const o=bt(t.o)&&!t.old?t.o:e.offset(this.ts);n=ke(this.ts,o),s=Number.isNaN(n.year)?new st("invalid input"):null,n=s?null:n,a=s?null:o}this._zone=e,this.loc=t.loc||x.create(),this.invalid=s,this.weekData=null,this.localWeekData=null,this.c=n,this.o=a,this.isLuxonDateTime=!0}static now(){return new f({})}static local(){const[t,e]=Ii(arguments),[s,n,a,r,o,c,d]=e;return Ti({year:s,month:n,day:a,hour:r,minute:o,second:c,millisecond:d},t)}static utc(){const[t,e]=Ii(arguments),[s,n,a,r,o,c,d]=e;return t.zone=q.utcInstance,Ti({year:s,month:n,day:a,hour:r,minute:o,second:c,millisecond:d},t)}static fromJSDate(t,e={}){const s=fr(t)?t.valueOf():NaN;if(Number.isNaN(s))return f.invalid("invalid input");const n=ft(e.zone,M.defaultZone);return n.isValid?new f({ts:s,zone:n,loc:x.fromObject(e)}):f.invalid(se(n))}static fromMillis(t,e={}){if(bt(t))return t<-Oi||t>Oi?f.invalid("Timestamp out of range"):new f({ts:t,zone:ft(e.zone,M.defaultZone),loc:x.fromObject(e)});throw new R(`fromMillis requires a numerical input, but received a ${typeof t} with value ${t}`)}static fromSeconds(t,e={}){if(bt(t))return new f({ts:t*1e3,zone:ft(e.zone,M.defaultZone),loc:x.fromObject(e)});throw new R("fromSeconds requires a numerical input")}static fromObject(t,e={}){t=t||{};const s=ft(e.zone,M.defaultZone);if(!s.isValid)return f.invalid(se(s));const n=x.fromObject(e),a=Ne(t,Ei),{minDaysInFirstWeek:r,startOfWeek:o}=gi(a,n),c=M.now(),d=w(e.specificOffset)?s.offset(c):e.specificOffset,u=!w(a.ordinal),p=!w(a.year),m=!w(a.month)||!w(a.day),g=p||m,$=a.weekYear||a.weekNumber;if((g||u)&&$)throw new At("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(m&&u)throw new At("Can't mix ordinal dates with month/day");const j=$||a.weekday&&!g;let T,W,Z=ke(c,d);j?(T=Lo,W=Po,Z=Ae(Z,r,o)):u?(T=No,W=Ao,Z=ds(Z)):(T=oa,W=ra);let ct=!1;for(const Kt of T){const fa=a[Kt];w(fa)?ct?a[Kt]=W[Kt]:a[Kt]=Z[Kt]:ct=!0}const yt=j?ur(a,r,o):u?pr(a):In(a),Zt=yt||zn(a);if(Zt)return f.invalid(Zt);const Xe=j?mi(a,r,o):u?fi(a):a,[ge,be]=xe(Xe,d,s),dt=new f({ts:ge,zone:s,o:be,loc:n});return a.weekday&&g&&t.weekday!==dt.weekday?f.invalid("mismatched weekday",`you can't specify both a weekday of ${a.weekday} and a date of ${dt.toISO()}`):dt.isValid?dt:f.invalid(dt.invalid)}static fromISO(t,e={}){const[s,n]=no(t);return zt(s,n,e,"ISO 8601",t)}static fromRFC2822(t,e={}){const[s,n]=ao(t);return zt(s,n,e,"RFC 2822",t)}static fromHTTP(t,e={}){const[s,n]=ro(t);return zt(s,n,e,"HTTP",e)}static fromFormat(t,e,s={}){if(w(t)||w(e))throw new R("fromFormat requires an input string and a format");const{locale:n=null,numberingSystem:a=null}=s,r=x.fromOpts({locale:n,numberingSystem:a,defaultToEN:!0}),[o,c,d,u]=Do(r,t,e);return u?f.invalid(u):zt(o,c,s,`format ${e}`,t,d)}static fromString(t,e,s={}){return f.fromFormat(t,e,s)}static fromSQL(t,e={}){const[s,n]=mo(t);return zt(s,n,e,"SQL",t)}static invalid(t,e=null){if(!t)throw new R("need to specify a reason the DateTime is invalid");const s=t instanceof st?t:new st(t,e);if(M.throwOnInvalid)throw new Ra(s);return new f({invalid:s})}static isDateTime(t){return t&&t.isLuxonDateTime||!1}static parseFormatForOpts(t,e={}){const s=na(t,x.fromObject(e));return s?s.map(n=>n?n.val:null).join(""):null}static expandFormat(t,e={}){return ea(F.parseFormat(t),x.fromObject(e)).map(n=>n.val).join("")}static resetCache(){Ee=void 0,Te={}}get(t){return this[t]}get isValid(){return this.invalid===null}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}get outputCalendar(){return this.isValid?this.loc.outputCalendar:null}get zone(){return this._zone}get zoneName(){return this.isValid?this.zone.name:null}get year(){return this.isValid?this.c.year:NaN}get quarter(){return this.isValid?Math.ceil(this.c.month/3):NaN}get month(){return this.isValid?this.c.month:NaN}get day(){return this.isValid?this.c.day:NaN}get hour(){return this.isValid?this.c.hour:NaN}get minute(){return this.isValid?this.c.minute:NaN}get second(){return this.isValid?this.c.second:NaN}get millisecond(){return this.isValid?this.c.millisecond:NaN}get weekYear(){return this.isValid?ps(this).weekYear:NaN}get weekNumber(){return this.isValid?ps(this).weekNumber:NaN}get weekday(){return this.isValid?ps(this).weekday:NaN}get isWeekend(){return this.isValid&&this.loc.getWeekendDays().includes(this.weekday)}get localWeekday(){return this.isValid?ms(this).weekday:NaN}get localWeekNumber(){return this.isValid?ms(this).weekNumber:NaN}get localWeekYear(){return this.isValid?ms(this).weekYear:NaN}get ordinal(){return this.isValid?ds(this.c).ordinal:NaN}get monthShort(){return this.isValid?we.months("short",{locObj:this.loc})[this.month-1]:null}get monthLong(){return this.isValid?we.months("long",{locObj:this.loc})[this.month-1]:null}get weekdayShort(){return this.isValid?we.weekdays("short",{locObj:this.loc})[this.weekday-1]:null}get weekdayLong(){return this.isValid?we.weekdays("long",{locObj:this.loc})[this.weekday-1]:null}get offset(){return this.isValid?+this.o:NaN}get offsetNameShort(){return this.isValid?this.zone.offsetName(this.ts,{format:"short",locale:this.locale}):null}get offsetNameLong(){return this.isValid?this.zone.offsetName(this.ts,{format:"long",locale:this.locale}):null}get isOffsetFixed(){return this.isValid?this.zone.isUniversal:null}get isInDST(){return this.isOffsetFixed?!1:this.offset>this.set({month:1,day:1}).offset||this.offset>this.set({month:5}).offset}getPossibleOffsets(){if(!this.isValid||this.isOffsetFixed)return[this];const t=864e5,e=6e4,s=Ze(this.c),n=this.zone.offset(s-t),a=this.zone.offset(s+t),r=this.zone.offset(s-n*e),o=this.zone.offset(s-a*e);if(r===o)return[this];const c=s-r*e,d=s-o*e,u=ke(c,r),p=ke(d,o);return u.hour===p.hour&&u.minute===p.minute&&u.second===p.second&&u.millisecond===p.millisecond?[kt(this,{ts:c}),kt(this,{ts:d})]:[this]}get isInLeapYear(){return pe(this.year)}get daysInMonth(){return Le(this.year,this.month)}get daysInYear(){return this.isValid?Nt(this.year):NaN}get weeksInWeekYear(){return this.isValid?le(this.weekYear):NaN}get weeksInLocalWeekYear(){return this.isValid?le(this.localWeekYear,this.loc.getMinDaysInFirstWeek(),this.loc.getStartOfWeek()):NaN}resolvedLocaleOptions(t={}){const{locale:e,numberingSystem:s,calendar:n}=F.create(this.loc.clone(t),t).resolvedOptions(this);return{locale:e,numberingSystem:s,outputCalendar:n}}toUTC(t=0,e={}){return this.setZone(q.instance(t),e)}toLocal(){return this.setZone(M.defaultZone)}setZone(t,{keepLocalTime:e=!1,keepCalendarTime:s=!1}={}){if(t=ft(t,M.defaultZone),t.equals(this.zone))return this;if(t.isValid){let n=this.ts;if(e||s){const a=t.offset(this.ts),r=this.toObject();[n]=xe(r,a,t)}return kt(this,{ts:n,zone:t})}else return f.invalid(se(t))}reconfigure({locale:t,numberingSystem:e,outputCalendar:s}={}){const n=this.loc.clone({locale:t,numberingSystem:e,outputCalendar:s});return kt(this,{loc:n})}setLocale(t){return this.reconfigure({locale:t})}set(t){if(!this.isValid)return this;const e=Ne(t,Ei),{minDaysInFirstWeek:s,startOfWeek:n}=gi(e,this.loc),a=!w(e.weekYear)||!w(e.weekNumber)||!w(e.weekday),r=!w(e.ordinal),o=!w(e.year),c=!w(e.month)||!w(e.day),d=o||c,u=e.weekYear||e.weekNumber;if((d||r)&&u)throw new At("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(c&&r)throw new At("Can't mix ordinal dates with month/day");let p;a?p=mi({...Ae(this.c,s,n),...e},s,n):w(e.ordinal)?(p={...this.toObject(),...e},w(e.day)&&(p.day=Math.min(Le(p.year,p.month),p.day))):p=fi({...ds(this.c),...e});const[m,g]=xe(p,this.o,this.zone);return kt(this,{ts:m,o:g})}plus(t){if(!this.isValid)return this;const e=O.fromDurationLike(t);return kt(this,Ci(this,e))}minus(t){if(!this.isValid)return this;const e=O.fromDurationLike(t).negate();return kt(this,Ci(this,e))}startOf(t,{useLocaleWeeks:e=!1}={}){if(!this.isValid)return this;const s={},n=O.normalizeUnit(t);switch(n){case"years":s.month=1;case"quarters":case"months":s.day=1;case"weeks":case"days":s.hour=0;case"hours":s.minute=0;case"minutes":s.second=0;case"seconds":s.millisecond=0;break}if(n==="weeks")if(e){const a=this.loc.getStartOfWeek(),{weekday:r}=this;r<a&&(s.weekNumber=this.weekNumber-1),s.weekday=a}else s.weekday=1;if(n==="quarters"){const a=Math.ceil(this.month/3);s.month=(a-1)*3+1}return this.set(s)}endOf(t,e){return this.isValid?this.plus({[t]:1}).startOf(t,e).minus(1):this}toFormat(t,e={}){return this.isValid?F.create(this.loc.redefaultToEN(e)).formatDateTimeFromString(this,t):us}toLocaleString(t=Pe,e={}){return this.isValid?F.create(this.loc.clone(e),t).formatDateTime(this):us}toLocaleParts(t={}){return this.isValid?F.create(this.loc.clone(t),t).formatDateTimeParts(this):[]}toISO({format:t="extended",suppressSeconds:e=!1,suppressMilliseconds:s=!1,includeOffset:n=!0,extendedZone:a=!1}={}){if(!this.isValid)return null;const r=t==="extended";let o=fs(this,r);return o+="T",o+=xi(this,r,e,s,n,a),o}toISODate({format:t="extended"}={}){return this.isValid?fs(this,t==="extended"):null}toISOWeekDate(){return Se(this,"kkkk-'W'WW-c")}toISOTime({suppressMilliseconds:t=!1,suppressSeconds:e=!1,includeOffset:s=!0,includePrefix:n=!1,extendedZone:a=!1,format:r="extended"}={}){return this.isValid?(n?"T":"")+xi(this,r==="extended",e,t,s,a):null}toRFC2822(){return Se(this,"EEE, dd LLL yyyy HH:mm:ss ZZZ",!1)}toHTTP(){return Se(this.toUTC(),"EEE, dd LLL yyyy HH:mm:ss 'GMT'")}toSQLDate(){return this.isValid?fs(this,!0):null}toSQLTime({includeOffset:t=!0,includeZone:e=!1,includeOffsetSpace:s=!0}={}){let n="HH:mm:ss.SSS";return(e||t)&&(s&&(n+=" "),e?n+="z":t&&(n+="ZZ")),Se(this,n,!0)}toSQL(t={}){return this.isValid?`${this.toSQLDate()} ${this.toSQLTime(t)}`:null}toString(){return this.isValid?this.toISO():us}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`:`DateTime { Invalid, reason: ${this.invalidReason} }`}valueOf(){return this.toMillis()}toMillis(){return this.isValid?this.ts:NaN}toSeconds(){return this.isValid?this.ts/1e3:NaN}toUnixInteger(){return this.isValid?Math.floor(this.ts/1e3):NaN}toJSON(){return this.toISO()}toBSON(){return this.toJSDate()}toObject(t={}){if(!this.isValid)return{};const e={...this.c};return t.includeConfig&&(e.outputCalendar=this.outputCalendar,e.numberingSystem=this.loc.numberingSystem,e.locale=this.loc.locale),e}toJSDate(){return new Date(this.isValid?this.ts:NaN)}diff(t,e="milliseconds",s={}){if(!this.isValid||!t.isValid)return O.invalid("created by diffing an invalid DateTime");const n={locale:this.locale,numberingSystem:this.numberingSystem,...s},a=gr(e).map(O.normalizeUnit),r=t.valueOf()>this.valueOf(),o=r?this:t,c=r?t:this,d=wo(o,c,a,n);return r?d.negate():d}diffNow(t="milliseconds",e={}){return this.diff(f.now(),t,e)}until(t){return this.isValid?I.fromDateTimes(this,t):this}hasSame(t,e,s){if(!this.isValid)return!1;const n=t.valueOf(),a=this.setZone(t.zone,{keepLocalTime:!0});return a.startOf(e,s)<=n&&n<=a.endOf(e,s)}equals(t){return this.isValid&&t.isValid&&this.valueOf()===t.valueOf()&&this.zone.equals(t.zone)&&this.loc.equals(t.loc)}toRelative(t={}){if(!this.isValid)return null;const e=t.base||f.fromObject({},{zone:this.zone}),s=t.padding?this<e?-t.padding:t.padding:0;let n=["years","months","days","hours","minutes","seconds"],a=t.unit;return Array.isArray(t.unit)&&(n=t.unit,a=void 0),Mi(e,this.plus(s),{...t,numeric:"always",units:n,unit:a})}toRelativeCalendar(t={}){return this.isValid?Mi(t.base||f.fromObject({},{zone:this.zone}),this,{...t,numeric:"auto",units:["years","months","days"],calendary:!0}):null}static min(...t){if(!t.every(f.isDateTime))throw new R("min requires all arguments be DateTimes");return bi(t,e=>e.valueOf(),Math.min)}static max(...t){if(!t.every(f.isDateTime))throw new R("max requires all arguments be DateTimes");return bi(t,e=>e.valueOf(),Math.max)}static fromFormatExplain(t,e,s={}){const{locale:n=null,numberingSystem:a=null}=s,r=x.fromOpts({locale:n,numberingSystem:a,defaultToEN:!0});return ia(r,t,e)}static fromStringExplain(t,e,s={}){return f.fromFormatExplain(t,e,s)}static buildFormatParser(t,e={}){const{locale:s=null,numberingSystem:n=null}=e,a=x.fromOpts({locale:s,numberingSystem:n,defaultToEN:!0});return new sa(a,t)}static fromFormatParser(t,e,s={}){if(w(t)||w(e))throw new R("fromFormatParser requires an input string and a format parser");const{locale:n=null,numberingSystem:a=null}=s,r=x.fromOpts({locale:n,numberingSystem:a,defaultToEN:!0});if(!r.equals(e.locale))throw new R(`fromFormatParser called with a locale of ${r}, but the format parser was created for ${e.locale}`);const{result:o,zone:c,specificOffset:d,invalidReason:u}=e.explainFromTokens(t);return u?f.invalid(u):zt(o,c,s,`format ${e.format}`,t,d)}static get DATE_SHORT(){return Pe}static get DATE_MED(){return cn}static get DATE_MED_WITH_WEEKDAY(){return qa}static get DATE_FULL(){return dn}static get DATE_HUGE(){return hn}static get TIME_SIMPLE(){return un}static get TIME_WITH_SECONDS(){return pn}static get TIME_WITH_SHORT_OFFSET(){return mn}static get TIME_WITH_LONG_OFFSET(){return fn}static get TIME_24_SIMPLE(){return gn}static get TIME_24_WITH_SECONDS(){return bn}static get TIME_24_WITH_SHORT_OFFSET(){return vn}static get TIME_24_WITH_LONG_OFFSET(){return yn}static get DATETIME_SHORT(){return $n}static get DATETIME_SHORT_WITH_SECONDS(){return wn}static get DATETIME_MED(){return _n}static get DATETIME_MED_WITH_SECONDS(){return kn}static get DATETIME_MED_WITH_WEEKDAY(){return Wa}static get DATETIME_FULL(){return Sn}static get DATETIME_FULL_WITH_SECONDS(){return jn}static get DATETIME_HUGE(){return On}static get DATETIME_HUGE_WITH_SECONDS(){return Cn}}function Jt(i){if(f.isDateTime(i))return i;if(i&&i.valueOf&&bt(i.valueOf()))return f.fromJSDate(i);if(i&&typeof i=="object")return f.fromObject(i);throw new R(`Unknown datetime argument: ${i}, of type ${typeof i}`)}class Uo extends k{static get properties(){return{t:{type:Object},invitecode:{type:String},loading:{type:Boolean,attribute:!1},errorMessage:{type:String,attribute:!1},copyFeedback:{type:String,attribute:!1},training:{type:Object,attribute:!1}}}constructor(){super(),this.t={},this.training={},this.loading=!1,this.errorMessage="",this.copyFeedback="",this.url=""}connectedCallback(){super.connectedCallback();const t=new URL(location.href);if(!this.invitecode){const e=t.searchParams.get("joinKey");this.invitecode=e}this.url=jsObject.site_url+`/training-group/${this.invitecode}`,this.loading=!0,_.get(`plan/${this.invitecode}`,{}).then(e=>{if(e.error_code){this.errorMessage=this.t.broken_link;return}this.training=e,this.errorMessage=""}).catch(e=>{console.error(e),this.errorMessage=this.t.broken_link}).finally(()=>{this.loading=!1}),this.dispatchEvent(new CustomEvent("wizard:finish",{bubbles:!0}))}getNextSession(){if(Object.keys(this.training).length===0)return;const{set_type:t}=this.training,e=this.numberOfSessions(t.key),s=f.now();for(let n=1;n<e+1;n++){const a=n<10?`0${n}`:`${n}`,r=this.training[t.key+"_"+a];if(r&&f.fromSeconds(r.timestamp).endOf("day")>s.startOf("day"))return f.fromSeconds(r.timestamp).toISODate()}return""}numberOfSessions(t){switch(t){case"set_a":return 10;case"set_b":return 20;case"set_c":return 5}}getInviteText(){const t=this.getNextSession(),e=this.t.note.replace("%s",this.training.post_author_display_name),s=this.training.location_note,n=this.training.time_of_day_note?`, ${this.training.time_of_day_note}`:"",a=this.training.timezone_note?`, ${this.training.timezone_note}`:"";return`${e}

${this.t.location}: ${s}
${this.t.time}: ${t!==""?f.fromISO(t).toFormat("DDDD")+n+a:""}

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
        `}createRenderRoot(){return this}}window.customElements.define("invite-friends",Uo);class qo extends k{static get properties(){return{t:{type:Object},hasNextStep:{type:Boolean},variant:{type:String},code:{attribute:!1},message:{type:String,attribute:!1},errorMessage:{type:String,attribute:!1},successMessage:{type:String,attribute:!1},success:{type:Boolean,attribute:!1},loading:{type:Boolean,attribute:!1},success:{type:Boolean,attribute:!1},showTrainings:{attribute:!1},showNextStep:{attribute:!1},privacyPolicyOpen:{type:Boolean,attribute:!1},notifyOfFutureTrainings:{type:Boolean,attribute:!1},leavingNotificationList:{type:Boolean,attribute:!1},training:{type:Object,attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.successMessage="",this.success=!1,this.message="",this.showTrainings=!1,this.showNextStep=!1,this.loading=!1,this.leavingNotificationList=!1,this.privacyPolicyOpen=!1,this.isOnNotificationList=jsObject.profile.notify_of_future_trainings==="1",this.notifyOfFutureTrainings=jsObject.profile.notify_of_future_trainings==="1",this.stateManager=ot.getInstance(z.joinTraining),this.training={}}firstUpdated(){if(this.variant===h.joinTraining){this._handleJoinTraining();return}const t=new URL(location.href);if(!t.searchParams.has("code")){this.message="",this.loading=!1,this.showTrainings=!0;return}const e=t.searchParams.get("code");this.chooseTraining(e)}willUpdate(t){t.has("variant")&&this.variant===h.joinTrainingSelection&&(new URL(location.href).searchParams.has("code")||(this.message="",this.showTrainings=!0))}connectToPlan(t){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait,this.code=t,_.post("connect/public-plan",{code:t}).then(e=>{this.successMessage=this.t.success.replace("%s",e.name),this.success=!0,this.message="",e.coach_request_success||this.setErrorMessage(this.t.coach_request_failed);const s=new URL(location.href);s.searchParams.set("joinKey",t),window.history.pushState(null,null,s.href)}).catch(e=>{this.message="",e.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error)}).finally(()=>{this.loading=!1,at(this.renderRoot,"join-training"),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.dispatchEvent(new CustomEvent("wizard:finish",{bubbles:!0}))})}setErrorMessage(t){this.errorMessage=t}_handleChosenTraining(t){const{code:e,training:s}=t.detail;this.chooseTraining(e,s)}async chooseTraining(t,e){this.showTrainings=!1,this.showNextStep=!0,this.code=t;let s=e;if(!s){const n=this.stateManager.get(h.confirmPlan);n&&n.code===t?s=n.training:s=await _.get(`plan/${t}`)}this.stateManager.add(h.confirmPlan,{code:t,training:s}),this._sendDoneStepEvent()}_handleJoinTraining(){const t=this.stateManager.get(h.confirmPlan);this.connectToPlan(t.code)}_sendDoneStepEvent(){const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)}togglePrivacyPolicy(){this.privacyPolicyOpen=!this.privacyPolicyOpen}toggleNotificationList(){this.leavingNotificationList||(this.leavingNotificationList=!0,this.notifyOfFutureTrainings=!this.notifyOfFutureTrainings,_.post("email-preferences",{notify_of_future_trainings:this.notifyOfFutureTrainings}).then(t=>{this.dispatchEvent(new CustomEvent("user-profile:change",{bubbles:!0,detail:t}))}).catch(t=>{this.notifyOfFutureTrainings=!this.notifyOfFutureTrainings,this.setErrorMessage(this.t.error)}).finally(()=>{this.leavingNotificationList=!1}))}render(){return l`
            <div class="stack">
                <h1>${this.t.title}</h1>

                ${this.message.length?l`<p>${this.message}</p>`:""}

                <span class="loading-spinner mx-auto ${this.loading?"active":""}"></span>

                ${this.showTrainings&&this.variant===h.joinTrainingSelection?l`
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
        `}createRenderRoot(){return this}}customElements.define("join-training",qo);class Wo extends k{static get properties(){return{hasNextStep:{type:Boolean},t:{type:Object},variant:{type:String},loading:{type:Boolean,attribute:!1},success:{type:Boolean,atrtibute:!1}}}joinCommunity(){this.loading=!0,_.post("join_community").then(t=>{this.success=!0}).finally(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("wizard:finish",{bubbles:!0}))})}_sendDoneStepEvent(){const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)}render(){if(this.variant===h.joinCommunityExplanation)return l`
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
            `;if(this.variant===h.joinCommunity)return!this.loading&&!this.success&&this.joinCommunity(),l`
                <h1>${this.t.community_title}</h1>
                <p>${this.t.please_wait}</p>
                ${this.loading===!0?l`
                        <span class="loading-spinner active"></span>
                    `:""}
                ${this.success===!0?l`
                        <div class="stack">
                            <span class="banner success">
                                ${this.t.joined_community}
                            </span>
                        </div>
                    `:""}
                ${this.success===!1?l`
                        <div class="stack">
                            <span class="banner warning">
                                ${this.t.error}
                            </span>
                        </div>
                    `:""}
                ${this.success&&this.hasNextStep?l`
                        <button class="btn" @click=${this._sendDoneStepEvent}>
                            ${this.t.next}
                        </button>
                    `:""}
            `}createRenderRoot(){return this}}customElements.define("join-community",Wo);class Vo extends k{static get properties(){return{t:{type:Object},variant:{type:String},code:{type:String,attribute:!1},message:{type:Array,attribute:!1},errorMessage:{type:String,attribute:!1},successMessage:{type:String,attribute:!1},success:{type:Boolean,attribute:!1},loading:{type:Boolean,attribute:!1},privacyPolicyOpen:{type:Boolean,attribute:!1},plan:{type:Object,attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.successMessage="",this.success=!1,this.message=[],this.loading=!1,this.privacyPolicyOpen=!1,this.plan=null,this.stateManager=ot.getInstance(z.joinFriendsTraining),this.stateManager.clear()}willUpdate(t){if(t.has("variant")&&this.variant===h.joinFriendsPlan){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message.push(this.t.please_wait);const s=new URL(location.href).searchParams.get("code");this.code=s,_.post("connect/plan",{code:s}).then(n=>{this.success=!0,this.successMessage=this.t.success.replace("%s",n.name),this.message="";const a=new URL(location.href);a.searchParams.set("joinKey",s),window.history.pushState(null,null,a.href)}).catch(n=>{console.log(n),this.success=!1,this.message="",n.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error)}).finally(()=>{this.loading=!1,at(this.renderRoot,"join-friends-training"),this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.dispatchEvent(new CustomEvent("wizard:finish",{bubbles:!0}))})}}setErrorMessage(t){this.errorMessage=t}togglePrivacyPolicy(){this.privacyPolicyOpen=!this.privacyPolicyOpen}_sendDoneStepEvent(){const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)}render(){if(this.variant===h.joinFriendsPlan)return l`
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
          `}createRenderRoot(){return this}}customElements.define("join-friends-training",Vo);class Ho extends k{static get properties(){return{t:{type:Object},training:{type:Object,attribute:!1}}}constructor(){super(),this.t={},this.training={}}firstUpdated(){const e=ot.getInstance(z.joinTraining).get(h.confirmPlan);this.training=e.training}sendDoneStepEvent(){const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)}render(){return!this.training||Object.keys(this.training).length===0?l`
                <span class="loading-spinner active"></span>
            `:l`
            <h2 class="h3 brand-light text-center">${this.training.post_title||this.training.title}</h2>
            <table class="table center">
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
                        <td class="f-medium">${this.t.time_of_day}:</td>
                        <td>${this.training.time_of_day_note}</td>
                    </tr>
                    <tr>
                        <td class="f-medium">${this.t.timezone}:</td>
                        <td>${this.training.timezone_note}</td>
                    </tr>

                    <tr>
                        <td class="f-medium">${this.t.session}:</td>
                        <td>${this.training.current_session} / ${this.training.total_sessions}</td>
                    </tr>
                    <tr>
                        <td class="f-medium">${this.t.next_session_date}:</td>
                        <td>${this.training.next_session_date}</td>
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
        `}createRenderRoot(){return this}}window.customElements.define("confirm-training",Ho);function ie(i){function t(be,dt){return be>>>dt|be<<32-dt}for(var e=Math.pow,s=e(2,32),n="length",a,r,o="",c=[],d=i[n]*8,u=ie.h=ie.h||[],p=ie.k=ie.k||[],m=p[n],g={},$=2;m<64;$++)if(!g[$]){for(a=0;a<313;a+=$)g[a]=$;u[m]=e($,.5)*s|0,p[m++]=e($,1/3)*s|0}for(i+="";i[n]%64-56;)i+="\0";for(a=0;a<i[n];a++){if(r=i.charCodeAt(a),r>>8)return;c[a>>2]|=r<<(3-a)%4*8}for(c[c[n]]=d/s|0,c[c[n]]=d,r=0;r<c[n];){var j=c.slice(r,r+=16),T=u;for(u=u.slice(0,8),a=0;a<64;a++){var W=j[a-15],Z=j[a-2],ct=u[0],yt=u[4],Zt=u[7]+(t(yt,6)^t(yt,11)^t(yt,25))+(yt&u[5]^~yt&u[6])+p[a]+(j[a]=a<16?j[a]:j[a-16]+(t(W,7)^t(W,18)^W>>>3)+j[a-7]+(t(Z,17)^t(Z,19)^Z>>>10)|0),Xe=(t(ct,2)^t(ct,13)^t(ct,22))+(ct&u[1]^ct&u[2]^u[1]&u[2]);u=[Zt+Xe|0].concat(u),u[4]=u[4]+Zt|0}for(a=0;a<8;a++)u[a]=u[a]+T[a]|0}for(a=0;a<8;a++)for(r=3;r+1;r--){var ge=u[a]>>r*8&255;o+=(ge<16?0:"")+ge.toString(16)}return o}class Bo extends k{static get properties(){return{t:{type:Object},variant:{type:String},state:{type:Object,attribute:!1},selectedDays:{type:Array,attribute:!1},completedSteps:{type:Array,attribute:!1},calendarStart:{type:String,attribute:!1},calendarEnd:{type:String,attribute:!1},calendarView:{type:String,attribute:!1},scheduleView:{type:String,attribute:!1},errorMessage:{type:String,attribute:!1},message:{type:String,attribute:!1},loading:{type:Boolean,attribute:!1},joinCodeOpen:{type:Boolean,attribute:!1}}}constructor(){super(),this.variant="",this.t={},this.state={},this.timeNote="",this.errorMessage="",this.message="",this.loading=!1,this.stateManager=ot.getInstance(z.makePlan),this.stateManager.clear(),this.trainingSchedule=[],this.selectedDays=[],this.completedSteps=[],this.calendarStart=f.now().startOf("month").toISODate(),this.calendarStartMinusOneYear=f.now().minus({year:1}).startOf("month").toISODate(),this.calendarEnd=f.now().plus({month:2}).endOf("month").toISODate(),this.calendarEndTwoYears=f.now().plus({years:2}).endOf("month").toISODate(),this.calendarView="all",this.scheduleView="calendar",this.joinCodeOpen=!1}willUpdate(t){const e={[h.howManySessions]:"10",[h.scheduleDecision]:"yes",[h.howOften]:"weekly",[h.location]:"",[h.startDate]:f.now().toISODate()};if(t.has("variant")){if(this.state=this.stateManager.get(this.variant)||e[this.variant],this.variant===h.howOften||this.variant===h.startDate){const s=this.stateManager.get(h.scheduleDecision);(this.isIntensive()||s==="no")&&this._sendDoneStepEvent()}this.variant===h.review&&this._buildSelectedDays(),this.variant===h.review&&this.isIntensive()&&(this.scheduleView="list")}}_handlePlanDecision(t){const e=t.target.dataset.decision;let s="";switch(e){case"make":s=y.makeAGroup;break;case"join-public":s=y.joinATraining;break;case"join-private":s=y.joinFriendsPlan;break}this._sendLoadWizardEvent(s)}_sendLoadWizardEvent(t,e={}){const s={wizard:t};Object.keys(e).length>0&&(s.queryParams=e),this.dispatchEvent(new CustomEvent("wizard:load",{bubbles:!0,detail:s}))}_handleDone(t){t&&t.preventDefault(),this.completedSteps.includes(this.variant)||(this.completedSteps=[...this.completedSteps,this.variant]),this.variant===h.scheduleDecision&&this.state==="no"&&(this.completedSteps=this.completedSteps.filter(e=>e!==h.howOften&&e!==h.startDate)),this._saveState(),this._sendDoneStepEvent()}_sendDoneStepEvent(){const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)}_gotoStep(t){const e=new CustomEvent("wizard:goto-step",{bubbles:!0,detail:{slug:t}});this.dispatchEvent(e)}_handleSelection(t){const e=t.target.dataset.value;this.state=e,this._saveState()}_saveState(){this.stateManager.add(this.variant,this.state)}_handleChange(t){if(t.target.name==="time"){this.timeNote=t.target.value,this.stateManager.add(h.timeNote,this.timeNote);return}t.target.type==="text"&&(this.state=t.target.value),this.stateManager.add(this.variant,this.state)}_buildSelectedDays(){const t=this.stateManager.get(h.howManySessions),e=this.stateManager.get(h.howOften),s=this.stateManager.get(h.startDate);if(!(this.selectedDays.length>0)&&t&&e&&s){let n=0;e==="weekly"&&(n=1),e==="biweekly"&&(n=2),e==="monthly"&&(n=4);const a=[],r=f.fromISO(s);for(let o=1;o<Number(t)+1;o++)a.push({date:r.plus({weeks:n*(o-1)}).toISODate(),id:this.createId()});this.selectedDays=a,this.calendarStart=f.fromISO(r).startOf("month").toISODate(),this.calendarEnd=f.fromISO(a[a.length-1].date).endOf("month").toISODate(),this.calendarView="all"}}_buildSet(t){const e=this.stateManager.get(h.howManySessions),s=this.stateManager.get(h.timeNote),a={location_note:this.stateManager.get(h.location)||"",time_of_day_note:s||""};let r="";e==="10"&&(r="set_a_"),e==="20"&&(r="set_b_"),e==="5"&&(r="set_c_");const o=t.sort(this.sortDays);for(let c=1;c<Number(e)+1;c++){const d=c<10?`0${c}`:`${c}`;let u;c-1<o.length?u=f.fromISO(o[c-1].date).toSeconds():u="",a[r+d]=u}return a}sortDays(t,e){return t.date===e.date?0:t.date<e.date?-1:1}_handleCreate(){if(this.loading)return;const t=this.stateManager.get(h.howManySessions),e=this.stateManager.get(h.scheduleDecision),s=this.stateManager.get(h.name);let n="";switch(t){case"10":n="set_a";break;case"20":n="set_b";break;case"5":n="set_c";break}if(e==="yes"&&this.selectedDays.length!==Number(t)){this.errorMessage=this.t.incorrect_number_of_sessions,setTimeout(()=>{this.errorMessage=""},3e3);return}const a={user_id:jsObject.profile.user_id,contact_id:jsObject.profile.contact_id,title:s||"",set_type:n,set:this._buildSet(this.selectedDays)};this.loading=!0,_.post("plan",a).then(r=>{this._handleFinish(r.join_key)}).catch(r=>{console.log(r)}).finally(()=>{this.loading=!1})}_handleFinish(t){this._sendLoadWizardEvent(y.inviteFriends,{joinKey:t})}isIntensive(){return this.stateManager.get(h.howManySessions)==="5"}toggleView(){this.scheduleView==="calendar"?this.scheduleView="list":this.scheduleView="calendar"}createId(){return ie(Math.random(0,1e4)).slice(0,6)}selectStartDate(t){const{date:e}=t.detail;this.state=e,this.stateManager.add(h.startDate,this.state)}clearStartDate(t){this.state="",this.stateManager.remove(this.variant)}addDate(t){const{date:e}=t.detail,s={date:e,id:this.createId()};this.selectedDays=[...this.selectedDays,s]}removeDate(t){const{id:e}=t.detail;console.log(e);const s=this.selectedDays.findIndex(n=>e===n.id);s>-1&&(this.selectedDays=[...this.selectedDays.slice(0,s),...this.selectedDays.slice(s+1)])}updateCalendarEnd(t){const{newEndDate:e}=t.detail;this.calendarEnd=e}_clearCalendar(){this.selectedDays=[]}gotoJoinCodeStep(){const t=new URL(window.location.href),e=t.pathname.split("/"),s=h.joinWithCode;let n="";e[1]==="dashboard"?n=t.origin+t.pathname+t.search+`#${s}`:n=e.slice(0,-1).join("/")+"/"+s+t.search,console.log(n),window.history.pushState(null,null,n),this.variant=h.joinWithCode}_handleVerifyCode(){this.loading=!0,this.code=this.renderRoot.querySelector("#code").value,_.get(`plan/${this.code}`,{}).then(t=>{this.success=!0,ot.getInstance(z.joinTraining).add(h.confirmPlan,{code:this.code,training:t}),t.visibility.key==="private"?this._sendLoadWizardEvent(y.joinFriendsPlan,{code:this.code}):this._sendLoadWizardEvent(y.joinATraining,{code:this.code})}).catch(t=>{this.errorMessage=this.t.not_a_recognized_code,setTimeout(()=>{this.errorMessage=""},2500)}).finally(()=>{this.loading=!1})}render(){const t=Number(this.stateManager.get(h.howManySessions)),e=this.stateManager.get(h.scheduleDecision);let s="",n="";return this.selectedDays.length<t&&(s=this.t.x_of_total_selected.replace("%1$s",this.selectedDays.length).replace("%2$s",t),n="var(--z-brand-light)"),this.selectedDays.length===t&&(s=this.t.all_selected.replace("%s",t),n="var(--z-success)"),this.selectedDays.length>t&&(s=this.t.too_many_selected.replace("%s",this.selectedDays.length-t),n="var(--z-error-main)"),l`
            <div class="stack-1 position-relative">
                ${this.variant===h.planDecision?l`
                    <div class="stack">
                        <span class="z-icon-start-group brand-light f-7"></span>
                        <h2>${this.t.join_or_start_a_training}</h2>
                        <div class="stack mx-auto" data-fit-content>
                            <button class="btn tight" data-decision="make" @click=${this._handlePlanDecision}>${this.t.start_a_training}</button>
                            <button class="btn tight" data-decision="join-public" @click=${this._handlePlanDecision}>${this.t.join_a_public_training}</button>
                            <button class="btn tight" data-decision="join-private" @click=${this.gotoJoinCodeStep}>${this.t.join_with_code}</button>
                            <button class="btn tight outline" data-decision="skip" @click=${this._handlePlanDecision}>${this.t.skip_for_now}</button>
                        </div>
                    </div>
                `:""}
                ${this.variant===h.joinWithCode?l`
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
                ${this.variant===h.howManySessions?l`
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
                ${this.variant===h.scheduleDecision?l`
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
                ${this.variant===h.howOften?l`
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
                ${this.variant===h.startDate?l`
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
                        <input type="text" name="time" placeholder=${this.t.time} @change=${this._handleChange} value=${this.timeNote} />
                        <div class="stack mx-auto" data-fit-content>
                            <button class="btn fit-content mx-auto" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                `:""}
                ${this.variant===h.location?l`
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
                ${this.variant===h.name?l`
                    <div class="stack">
                        <span class="z-icon-start-date brand-light f-7"></span>
                        <h2>${this.t.question_what_is_the_groups_name}</h2>
                        <input type="text" name="name" placeholder=${this.t.group_name} @change=${this._handleChange} value=${typeof this.state=="string"?this.state:""} />
                        <div class="stack mx-auto" data-fit-content>
                            <button class="btn fit-content mx-auto" @click=${this._handleDone}>${this.t.next}</button>
                        </div>
                    </div>
                `:""}
                ${this.variant===h.review?l`
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
                ${this.variant!==h.planDecision?l`
                    <review-steps
                        .t=${this.t}
                        name=${this.stateManager.get(h.name)}
                        howManySessions=${this.stateManager.get(h.howManySessions)}
                        scheduleDecision=${this.stateManager.get(h.scheduleDecision)}
                        howOften=${this.stateManager.get(h.howOften)}
                        time=${this.stateManager.get(h.timeNote)}
                        date=${this.stateManager.get(h.startDate)}
                        whatLocation=${this.stateManager.get(h.location)}
                        .display=${this.completedSteps}
                        ?summaryOpen=${this.variant===h.review}
                    ></review-steps>
                `:""}
            </div>
        `}createRenderRoot(){return this}}customElements.define("make-training",Bo);class Go extends k{static get properties(){return{t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},successMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.successMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait,_.post("connect/notify-of-future-trainings").then(t=>{this.message="",this.successMessage=this.t.success}).catch(t=>{console.log(t),this.message="",this.setErrorMessage(this.t.error)}).finally(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.dispatchEvent(new CustomEvent("wizard:finish",{bubbles:!0}))})}setErrorMessage(t){this.errorMessage=t}render(){return l`
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
        `}createRenderRoot(){return this}}customElements.define("notify-of-future-trainings",Go);class Zo extends k{static get properties(){return{hasNextStep:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1},message:{attribute:!1},loading:{attribute:!1},requestSent:{attribute:!1}}}constructor(){super(),this.hasNextStep=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.message="",this.loading=!1,this.requestSent=!1,this.contactPreferences=["email","text","phone","whatsapp","signal","telegram","messenger"],this.stateManager=ot.getInstance(z.getACoach),this.stateManager.clear()}requestCoach(){this.message=this.t.please_wait;const t=this.stateManager.getAll();this.loading=!0,this.requestSent=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),_.post("get_a_coach",{data:t}).then(e=>{console.log(e,this),this.message=this.t.connect_success,e===!1&&(this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting))}).catch(e=>{if(e.code==="coach_request_failed"){this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_with_request);return}else if(e.code==="already_has_coach"){this.message="",this.setErrorMessage(this.t.already_coached);return}this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting)}).finally(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.dispatchEvent(new CustomEvent("wizard:finish",{bubbles:!0}))})}willUpdate(t){t.has("variant")&&(this.state=this.stateManager.get(this.variant)||{},this.variant===h.languagePreferences&&!this.state.value&&(this.state.value=jsObject.profile.preferred_language||"en",this.stateManager.add(this.variant,this.state)))}setErrorMessage(t){this.errorMessage=t}render(){return this.variant===h.connectingToCoach&&this.requestSent===!1&&this.requestCoach(),this.variant===h.requestCoachExplanation?l`
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
            ${this.variant===h.contactPreferences?l`
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

            ${this.variant===h.languagePreferences?l`
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

            ${this.variant===h.howCanWeServe?l`
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
            ${this.variant===h.connectingToCoach?l`

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
        `}_handleDone(t){if(t&&t.preventDefault(),![h.connectingToCoach,h.requestCoachExplanation].includes(this.variant)&&(Object.keys(this.state).length===0||Object.values(this.state).every(e=>!e))){this.setErrorMessage(this.t.missing_response);return}else this.setErrorMessage("");this._sendDoneStepEvent()}_sendDoneStepEvent(){const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)}_handleChange(t){t.target.type==="checkbox"&&(this.state[t.target.value]=t.target.checked),t.target.type==="text"&&(this.state.value=t.target.value),t.target.type==="select-one"&&(this.state.value=t.target.value),this.stateManager.add(this.variant,this.state)}createRenderRoot(){return this}}customElements.define("request-coach",Zo);class Ko extends k{constructor(){super();E(this,"module");E(this,"steps");this.t={},this.display=[],this.summaryOpen=!1}static get properties(){return{t:{type:Object},name:{type:String},howOften:{type:String},howManySessions:{type:String},scheduleDecision:{type:String},whatLocation:{type:String},date:{type:String},time:{type:String},display:{type:Array},summaryOpen:{type:Boolean}}}connectedCallback(){super.connectedCallback(),this.howOfterDict={weekly:this.t.weekly,biweekly:this.t.biweekly,monthly:this.t.monthly,other:this.t.other},this.howManyDict={20:this.t.hour_1_session_20,10:this.t.hour_2_session_10,5:this.t.hour_4_session_5},this.scheduleDecisionDict={yes:this.t.yes,no:this.t.no}}disconnectedCallback(){super.disconnectedCallback(),Lt(this.tagName)}updated(){at(this.renderRoot,this.tagName)}handleChange(e){const s=e.target.dataset.step;this.dispatchEvent(new CustomEvent("wizard:goto-step",{bubbles:!0,detail:{slug:s}})),window.scrollTo(0,0)}shouldDisplay(){return this.display.length>0}toggleSummary(){this.summaryOpen=!this.summaryOpen}renderSummary(e){switch(e){case h.name:return l`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            ${this.name===""?l`<span></span>`:l`<span>${this.name}</span>`}
                            <span class="d-flex justify-flex-end">
                                <button
                                    class="btn small no-outline tight"
                                    data-step=${h.name}
                                    @click=${this.handleChange}
                                >
                                    ${this.name!==""?this.t.change:this.t.set_group_name}
                                </button>
                            </span>
                        </div>
                    </div>
                `;case h.location:return l`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            ${this.whatLocation===""?l`<span></span>`:l`<span>${this.whatLocation}</span>`}
                            <span class="d-flex justify-flex-end">
                                <button
                                    class="btn small no-outline tight"
                                    data-step=${h.location}
                                    @click=${this.handleChange}
                                >
                                    ${this.whatLocation!==""?this.t.change:this.t.set_location}
                                </button>
                            </span>
                        </div>
                    </div>
                `;case h.howManySessions:return l`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            <span>${this.howManyDict[this.howManySessions]||this.howManySessions}</span>
                            <span class="d-flex justify-flex-end grow-0">
                                <button
                                    class="btn small no-outline tight"
                                    data-step=${h.howManySessions}
                                    @click=${this.handleChange}
                                >
                                    ${this.t.change}
                                </button>
                            </span>
                        </div>
                    </div>
                `;case h.scheduleDecision:return l`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            <span>${this.scheduleDecisionDict[this.scheduleDecision]||this.scheduleDecision}</span>
                            <span class="d-flex justify-flex-end grow-0">
                                <button
                                    class="btn small no-outline tight"
                                    data-step=${h.scheduleDecision}
                                    @click=${this.handleChange}
                                >
                                    ${this.t.change}
                                </button>
                            </span>
                        </div>
                    </div>
                `;case h.howOften:return l`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            <span>${this.howOfterDict[this.howOften]||this.howOften}</span>
                            <span class="d-flex justify-flex-end grow-0">
                                <button
                                    class="btn small no-outline tight"
                                    data-step=${h.howOften}
                                    @click=${this.handleChange}
                                >
                                    ${this.t.change}
                                </button>
                            </span>
                        </div>
                    </div>
                `;case h.startDate:return l`
                    <div class="stack--1">
                        <div class="switcher switcher-width-15 justify-content-between gap--3">
                            ${this.date===""?l`<span></span>`:l`
                                    <span>${f.fromFormat(this.date,"yyyy-MM-dd").toLocaleString({day:"numeric",month:"short",year:"numeric"})}</span>`}
                            <span class="d-flex justify-flex-end">
                                <button
                                    class="btn small no-outline tight"
                                    data-step=${h.startDate}
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
                                    data-step=${h.startDate}
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
        `}createRenderRoot(){return this}}customElements.define("review-steps",Ko);class Qo extends k{static get properties(){return{t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const t=new URL(location.href);if(!t.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.dispatchEvent(new CustomEvent("wizard:finish",{bubbles:!0}));return}const e=t.searchParams.get("code");this.code=e,_.post("checkin",{code:e}).then(s=>{this._sendDoneStepEvent()}).catch(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_checkin_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this.dispatchEvent(new CustomEvent("wizard:finish",{bubbles:!0}))}).finally(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){this.dispatchEvent(new CustomEvent("done-step",{bubbles:!0}))}setErrorMessage(t){this.errorMessage=t}render(){return l`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("session-checkin",Qo);/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const la=Symbol.for(""),Yo=i=>{if((i==null?void 0:i.r)===la)return i==null?void 0:i._$litStatic$},tt=(i,...t)=>({_$litStatic$:t.reduce((e,s,n)=>e+(a=>{if(a._$litStatic$!==void 0)return a._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${a}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(s)+i[n+1],i[0]),r:la}),zi=new Map,Jo=i=>(t,...e)=>{const s=e.length;let n,a;const r=[],o=[];let c,d=0,u=!1;for(;d<s;){for(c=t[d];d<s&&(a=e[d],(n=Yo(a))!==void 0);)c+=n+t[++d],u=!0;d!==s&&o.push(a),r.push(c),d++}if(d===s&&r.push(t[s]),u){const p=r.join("$$lit$$");(t=zi.get(p))===void 0&&(r.raw=r,zi.set(p,t=r)),e=o}return i(t,...e)},Xo=Jo(l);class tl extends k{static get properties(){return{type:{type:String},params:{type:Object},finishUrl:{type:String},user:{type:Object},translations:{type:Object},noUrlChange:{type:Boolean},step:{attribute:!1},steps:{attribute:!1},loading:{type:Boolean,attribute:!1},finished:{type:Boolean,attribute:!1}}}constructor(){super(),this.stepIndex=0,this.steps=[],this.step={},this.params={},this.t=Es(jsObject.translations),this.finished=!1,this._handleHistoryPopState=this._handleHistoryPopState.bind(this),this._handleLoadWizard=this._handleLoadWizard.bind(this),this._handleGotoStep=this._handleGotoStep.bind(this),this._handleReloadProfile=this._handleReloadProfile.bind(this),this._handleWizardFinished=this._handleWizardFinished.bind(this),this.stateManager=ot.getInstance("root")}connectedCallback(){super.connectedCallback(),this.redirectToCheckinInUserLanguage(),this.wizard=new Sa(this.user),window.addEventListener("popstate",this._handleHistoryPopState),window.addEventListener("wizard:load",this._handleLoadWizard),window.addEventListener("wizard:goto-step",this._handleGotoStep),window.addEventListener("wizard:finish",this._handleWizardFinished),window.addEventListener("profile:reload",this._handleReloadProfile)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._handleHistoryPopState),window.removeEventListener("wizard:load",this._handleLoadWizard),window.removeEventListener("wizard:goto-step",this._handleGotoStep),window.removeEventListener("wizard:finish",this._handleWizardFinished),window.removeEventListener("profile:reload",this._handleReloadProfile)}firstUpdated(){this._handleHistoryPopState(!0),this.translations&&(this.t=Es(this.translations))}willUpdate(t){if(t.has("type")&&this.type===""){this.resetWizard();return}if(t.has("type")&&this.type!==""){this.loadWizard(this.type,this.params);return}}redirectToCheckinInUserLanguage(){const t=zumeApiShare.getCookie("zume_language");if(!t||this.type!=="checkin")return;const e=new URL(location.href),s=e.pathname.split("/"),n=s[1];if(!Object.keys(jsObject.languages).includes(n))e.pathname="/"+t+e.pathname;else if(n!==t)s[1]=t,e.pathname=s.join("/");else return;location.href=e.href}loadWizard(t,e={}){let s=t;t===y.makeAGroup&&(jsObject.user_stage.state.plan_created?s=y.makeMoreGroups:s=y.makeFirstGroup),Object.values(y).includes(s)?(this.steps=this.wizard.getSteps(s),console.log(this.steps),this._gotoStep(0,!0,e)):this._onSkip()}resetWizard(){this.wizard&&this.wizard.reset(),this.steps=[],this.step={},this.stepIndex=0,this.finished=!1}render(){if(this.wizard){if(!this.wizard.isTypeValid(this.type))return l`
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
        `}}containerSize(){return{...this.step},h.joinTraining?"container-md":"container-xsm"}currentStep(){const t={...this.step};let e="",s="";switch(t.slug){case h.updateName:case h.updateLocation:case h.updatePhone:e=tt`complete-profile`,s=this.t.complete_profile;break;case h.requestCoachExplanation:case h.contactPreferences:case h.languagePreferences:case h.howCanWeServe:case h.connectingToCoach:e=tt`request-coach`,s=this.t.get_a_coach;break;case h.inviteFriends:e=tt`invite-friends`,s=this.t.share;break;case h.joinTraining:case h.joinTrainingSelection:e=tt`join-training`,s=this.t.join_training;break;case h.confirmPlan:e=tt`confirm-training`,s=this.t.confirm_plan;break;case h.joinFriendsPlan:e=tt`join-friends-training`,s=this.t.join_training;break;case h.connectToFriend:e=tt`connect-friend`,s=this.t.connect_friend;break;case h.checkinSubmit:e=tt`session-checkin`,s=this.t.checkin;break;case h.planDecision:case h.joinWithCode:case h.howManySessions:case h.scheduleDecision:case h.howOften:case h.startDate:case h.location:case h.name:case h.review:e=tt`make-training`,s=this.t.make_training;break;case h.joinCommunity:case h.joinCommunityExplanation:e=tt`join-community`,s=this.t.join_community;break;case h.notifyOfFutureTrainings:e=tt`notify-of-future-trainings`,s=this.t.notify_of_future_trainings;break}return Xo`
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
        `}footer(){let t="";return this.noUrlChange&&this.stepIndex>0&&this.type!==y.makeAGroup&&this.step.slug!==h.connectingToCoach&&(t=l`
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
        `}_onBack(){if(this.stepIndex>0){const t=this.stepIndex-1;this._gotoStep(t)}}_onNext(){if(this.stepIndex+1<this.steps.length){const t=this.stepIndex+1;this._gotoStep(t)}else this._onFinish()}_onSkip(){const t=this.step.module;for(let e=this.stepIndex+1;e<this.steps.length;e++)if(this.steps[e].module!==t){this._gotoStep(e);return}this._onFinish()}_onQuit(){if(this._isLastStep()){this._onFinish();return}this._onFinish(!0)}_handleFinish(){this._onFinish()}_onFinish(t=!1){if(this.stateManager.clear(),!this.finishUrl){this.dispatchEvent(new CustomEvent("user-state:change",{bubbles:!0})),this.dispatchEvent(new CustomEvent("wizard-finished",{bubbles:!0,detail:{type:this.type}})),this.resetWizard();return}this.loading=!0;const e=new URL(this.finishUrl);if(t===!1)if(this.type===y.checkin){const n=new URL(location.href).searchParams.get("code");if(n!==null){const a=new URL(jsObject.checkin_dashboard_url);a.searchParams.set("code",n),window.location.href=a.href;return}}else if([y.gettingStarted,y.makeAGroup,y.makeFirstGroup,y.makeMoreGroups,y.joinATraining,y.joinATrainingWithCode,y.joinFriendsPlan,y.inviteFriends].includes(this.type)){const n=new URL(location.href).searchParams.get("joinKey");if(n){const a=new URL(jsObject.training_dashboard_url+"/"+n);window.location.href=a.href;return}}else if(this.type===y.getACoach){window.location.href=jsObject.coaching_dashboard_url;return}else e.searchParams.set("completed",this.type);window.location.href=e.href}_isLastStep(){return this.stepIndex===this.steps.length-1}_gotoStep(t,e=!0,s={}){if(this.steps.length!==0){if(this.stepIndex=this.clampSteps(t),this.step={...this.steps[this.stepIndex]},e&&!this.noUrlChange){const n=new URL(window.location.href),a=n.pathname.split("/"),r=a[a.length-1];Object.keys(s).length>0&&Object.entries(s).forEach(([c,d])=>{n.searchParams.set(c,d)});let o="";Object.values(y).includes(r)?o=a.join("/")+"/"+this.step.slug+n.search:o=a.slice(0,-1).join("/")+"/"+this.step.slug+n.search,window.history.pushState(null,null,o)}if(e&&this.noUrlChange){const n=new URL(window.location.href);Object.keys(s).length>0&&Object.entries(s).forEach(([r,o])=>{n.searchParams.set(r,o)});const a=n.origin+n.pathname+n.search+`#${this.step.slug}`;window.history.pushState(null,null,a)}this.noUrlChange&&Object.keys(s).length>0&&Object.entries(s).forEach(([n,a])=>{this.step={...this.step,[n]:a}})}}clampSteps(t){let e=t;return t>this.steps.length-1&&(e=this.steps.length-1),t<0&&(e=0),e}_handleHistoryPopState(t=!1){const e=new URL(window.location.href),s=e.pathname.split("/"),n=s[s.length-1];if(!this.noUrlChange&&Object.values(y).includes(n)){this._gotoStep(0,!1);return}let a="",r=0;const o=c=>{if(this.noUrlChange){const d=e.hash.slice(1);return c===d}};this.steps.forEach(({slug:c,module:d},u)=>{if(a!==d&&(a=d,r=u),o(c)){if(t===!0&&this.stateManager.isDataStale()){this._gotoStep(r);return}this._gotoStep(u,!1)}}),this.steps.some(({slug:c})=>o(c))||(this.steps=this.wizard.getSteps(this.type),this._gotoStep(0))}_handleGotoStep(t){const{slug:e}=t.detail,s=this.steps.findIndex(n=>n.slug===e);this._gotoStep(s)}_handleLoadWizard(t){const{wizard:e,queryParams:s}=t.detail;this.loadWizard(e,s)}_handleReloadProfile(){this.user=jsObject.profile,this.wizard.updateProfile(this.user)}_handleWizardFinished(){this.finished=!0}_handleLoading(t){const{loading:e}=t.detail;this.loading=e}createRenderRoot(){return this}}window.customElements.define("zume-wizard",tl);function el(i){return i?JSON.parse('{"'+i.substring(1).replace(/&/g,'","').replace(/=/g,'":"')+'"}'):{}}function sl(i,t){let e={};const s=i.split("/").filter(a=>a!=""),n=t.split("/").filter(a=>a!="");return s.map((a,r)=>{/^:/.test(a)&&(e[a.substring(1)]=n[r])}),e}function il(i){return i?new RegExp("^(|/)"+i.replace(/:[^\s/]+/g,"([\\wÀ-ÖØ-öø-ÿ-]+)")+"(|/)$"):new RegExp("(^$|^/$)")}function nl(i,t){if(il(t).test(i))return!0}function al(i){return class extends i{static get properties(){return{route:{type:String,reflect:!0,attribute:"route"},canceled:{type:Boolean}}}constructor(...t){super(...t),this.route="",this.canceled=!1}connectedCallback(...t){super.connectedCallback(...t),this.routing(this.constructor.routes,(...e)=>this.router(...e)),window.addEventListener("route",()=>{this.routing(this.constructor.routes,(...e)=>this.router(...e))}),window.onpopstate=()=>{window.dispatchEvent(new CustomEvent("route"))}}routed(t,e,s,n,a,r){r&&r(t,e,s,n),a(t,e,s,n)}routing(t,e){this.canceled=!0;const s=decodeURI(window.location.pathname),n=decodeURI(window.location.search);let a=t.filter(c=>c.pattern==="*")[0],r=t.filter(c=>c.pattern!=="*"&&nl(s,c.pattern))[0],o=el(n);r?(r.params=sl(r.pattern,s),r.data=r.data||{},r.authentication&&r.authentication.authenticate&&typeof r.authentication.authenticate=="function"?(this.canceled=!1,Promise.resolve(r.authentication.authenticate.bind(this).call()).then(c=>{this.canceled||(c?r.authorization&&r.authorization.authorize&&typeof r.authorization.authorize=="function"?(this.canceled=!1,Promise.resolve(r.authorization.authorize.bind(this).call()).then(d=>{this.canceled||(d?this.routed(r.name,r.params,o,r.data,e,r.callback):this.routed(r.authorization.unauthorized.name,r.params,o,r.data,e,r.callback))})):this.routed(r.name,r.params,o,r.data,e,r.callback):this.routed(r.authentication.unauthenticated.name,r.params,o,r.data,e,r.callback))})):r.authorization&&r.authorization.authorize&&typeof r.authorization.authorize=="function"?(this.canceled=!1,Promise.resolve(r.authorization.authorize.bind(this).call()).then(c=>{this.canceled||(c?this.routed(r.name,r.params,o,r.data,e,r.callback):this.routed(r.authorization.unauthorized.name,r.params,o,r.data,e,r.callback))})):this.routed(r.name,r.params,o,r.data,e,r.callback)):a&&(a.data=a.data||{},this.routed(a.name,{},o,a.data,e,a.callback))}}}function qs(i){return class extends i{navigate(t){window.history.pushState({},null,t),window.dispatchEvent(new CustomEvent("route"))}}}const v={root:"root",gettingStarted:"getting-started",setProfile:"set-profile",createATraining:"create-a-training",joinATraining:"join-a-training",getACoach:"get-a-coach",training:"training",myTraining:"my-training",myTrainings:"my-trainings",myProgress:"my-progress",threeMonthPlan:"3-month-plan",practicing:"practicing",myCoach:"my-coach",myPlans:"my-plans",myChurches:"my-churches",myMaps:"my-maps",notFound:"not-found"};function Xt(i,t){return(e,s)=>{e.preventDefault(),s(new CustomEvent(t,{bubbles:!0,detail:{type:i}}))}}function Di(){return[{name:v.root,pattern:`${jsObject.base_url}`,icon:"",type:"dash-link",translation:"",data:{makeComponent:()=>""}},{name:v.gettingStarted,pattern:`${jsObject.base_url}/getting-started`,icon:"z-icon-start",type:"dash-link",translation:jsObject.translations.getting_started,data:{makeComponent:i=>l`<dash-getting-started></dash-getting-started>`}},{name:v.setProfile,pattern:"#",parent:v.gettingStarted,icon:"z-icon-profile",type:"handled-link",clickHandler:Xt(y.setProfile,"open-wizard"),translation:jsObject.translations.set_profile,explanation:jsObject.translations.set_profile_explanation,data:{makeComponent:()=>""}},{name:v.createATraining,pattern:"#",parent:v.gettingStarted,icon:"z-icon-start",type:"handled-link",clickHandler:Xt(y.makeAGroup,"open-wizard"),translation:jsObject.translations.create_training_group,explanation:jsObject.translations.create_training_group_explanation,data:{makeComponent:()=>""}},{name:v.joinATraining,pattern:"#",parent:v.gettingStarted,icon:"z-icon-public-training",type:"handled-link",clickHandler:Xt(y.joinATraining,"open-wizard"),translation:jsObject.translations.join_training_group,explanation:jsObject.translations.join_training_group_explanation,data:{makeComponent:()=>"",neverDisabled:!0}},{name:v.getACoach,pattern:"#",parent:v.gettingStarted,icon:"z-icon-coach",type:"handled-link",clickHandler:Xt(y.getACoach,"open-wizard"),translation:jsObject.translations.get_a_coach,explanation:jsObject.translations.get_a_coach_explanation,data:{makeComponent:()=>""}},{name:v.training,pattern:`${jsObject.base_url}/training`,icon:"z-icon-training",type:"dash-link",translation:jsObject.translations.training,data:{makeComponent:i=>l`<dash-training></dash-training>`}},{name:v.myTrainings,pattern:`${jsObject.base_url}/my-trainings`,icon:"z-icon-my-training",type:"dash-link",translation:jsObject.translations.my_trainings,data:{makeComponent:()=>l`<dash-trainings-list></dash-trainings-list>`}},{name:v.myTraining,pattern:`${jsObject.base_url}/my-training/:code`,parent:v.training,icon:"z-icon-my-training",type:"dash-link",translation:jsObject.translations.my_training,explanation:jsObject.translations.my_training_explanation,data:{makeComponent:i=>l`<dash-trainings ?showTeaser=${i==="teaser"} code=${i}></dash-trainings>`}},{name:v.myProgress,pattern:`${jsObject.base_url}/my-progress`,parent:v.training,icon:"z-icon-progress",type:"dash-link",translation:jsObject.translations.my_progress,explanation:jsObject.translations.my_progress_explanation,data:{makeComponent:i=>l`<dash-progress ?showTeaser=${i}></dash-progress>`}},{name:v.threeMonthPlan,pattern:`${jsObject.base_url}/3-month-plan`,parent:v.training,icon:"z-icon-plans",type:"handled-link",clickHandler:Xt("3-month-plan","open-3-month-plan"),translation:jsObject.translations.create_3_month_plan,explanation:jsObject.translations["3_month_plan_explanation"],data:{makeComponent:()=>""}},{name:v.practicing,pattern:`${jsObject.base_url}/practicing`,icon:"z-icon-practicing",type:"dash-link",translation:jsObject.translations.practicing,data:{makeComponent:i=>l`<dash-practicing></dash-practicing>`}},{name:v.myCoach,pattern:`${jsObject.base_url}/my-coach`,parent:v.practicing,icon:"z-icon-coach",type:"dash-link",translation:jsObject.translations.my_coach,explanation:jsObject.translations.my_coach_explanation,data:{makeComponent:i=>l`<dash-coach ?showTeaser=${i}></dash-coach>`}},{name:v.myPlans,pattern:`${jsObject.base_url}/my-plans`,parent:v.practicing,icon:"z-icon-plans",type:"dash-link",translation:jsObject.translations.my_plans,explanation:jsObject.translations.my_plans_explanation,data:{makeComponent:i=>l`<dash-plans ?showTeaser=${i}></dash-plans>`}},{name:v.myChurches,pattern:`${jsObject.base_url}/my-churches`,parent:v.practicing,icon:"z-icon-churches",type:"dash-link",translation:jsObject.translations.my_churches,explanation:jsObject.translations.my_churches_explanation,data:{makeComponent:i=>l`<dash-churches ?showTeaser=${i}></dash-churches>`}},{name:v.myMaps,pattern:`${jsObject.base_url}/my-maps`,parent:v.practicing,icon:"z-icon-maps",type:"dash-link",translation:jsObject.translations.my_maps,explanation:jsObject.translations.my_maps_explanation,data:{makeComponent:i=>l`<dash-maps ?showTeaser=${i}></dash-maps>`}},{name:v.notFound,pattern:"*",icon:"",type:"dash-link",data:{makeComponent:i=>l`<dash-not-found></dash-not-found>`}}]}/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const Pi=(i,t,e)=>{const s=new Map;for(let n=t;n<=e;n++)s.set(i[n],n);return s},U=an(class extends rn{constructor(i){if(super(i),i.type!==St.CHILD)throw Error("repeat() can only be used in text expressions")}ct(i,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);const n=[],a=[];let r=0;for(const o of i)n[r]=s?s(o,r):r,a[r]=e(o,r),r++;return{values:a,keys:n}}render(i,t,e){return this.ct(i,t,e).values}update(i,[t,e,s]){var n;const a=Pa(i),{values:r,keys:o}=this.ct(t,e,s);if(!Array.isArray(a))return this.ut=o,r;const c=(n=this.ut)!==null&&n!==void 0?n:this.ut=[],d=[];let u,p,m=0,g=a.length-1,$=0,j=r.length-1;for(;m<=g&&$<=j;)if(a[m]===null)m++;else if(a[g]===null)g--;else if(c[m]===o[$])d[$]=wt(a[m],r[$]),m++,$++;else if(c[g]===o[j])d[j]=wt(a[g],r[j]),g--,j--;else if(c[m]===o[j])d[j]=wt(a[m],r[j]),Yt(i,d[j+1],a[m]),m++,j--;else if(c[g]===o[$])d[$]=wt(a[g],r[$]),Yt(i,a[m],a[g]),g--,$++;else if(u===void 0&&(u=Pi(o,$,j),p=Pi(c,m,g)),u.has(c[m]))if(u.has(c[g])){const T=p.get(o[$]),W=T!==void 0?a[T]:null;if(W===null){const Z=Yt(i,a[m]);wt(Z,r[$]),d[$]=Z}else d[$]=wt(W,r[$]),Yt(i,a[m],W),a[T]=null;$++}else os(a[g]),g--;else os(a[m]),m++;for(;$<=j;){const T=Yt(i,d[j+1]);wt(T,r[$]),d[$++]=T}for(;m<=g;){const T=a[m++];T!==null&&os(T)}return this.ut=o,on(i,d),et}});class S extends qs(al(k)){static get properties(){return{route:{type:String},params:{type:Object},query:{type:Object},menuOffset:{type:Number,attribute:!1},userProfile:{type:Object,attribute:!1},userState:{type:Object,attribute:!1},trainingGroups:{type:Array,attribute:!1},wizardType:{type:String,attribute:!1},celbrationModalContent:{type:Object,attribute:!1},trainingGroupsOpen:{type:Boolean,attribute:!1}}}static get routes(){const t=S.rootRoute,{makeComponent:e}=t.data;return Di().map(n=>(n.name==="root"&&(n.data={makeComponent:e}),n))}static get rootRoute(){const t={1:"getting-started",2:"training",3:"practicing"},e=jsObject.user_stage.value||1,s=e<4?e:3;return Di().find(({name:a})=>a===t[s])}static getRoute(t){return S.routes.find(s=>s.name===t)}static childRoutesOf(t){return S.routes.filter(({parent:s})=>s===t)}constructor(){var t,e;super(),this.route="",this.params={},this.query={},this.data={},this.menuOffset=0,this.userProfile=jsObject.profile,this.userState=(t=(e=jsObject)===null||e===void 0||(e=e.user_stage)===null||e===void 0?void 0:e.state)!==null&&t!==void 0?t:{},this.trainingGroups=jsObject.training_groups,this.updateSortedTrainingGroups(),this.wizardType="",this.celebrationModalContent={title:"",content:[]},this.allCtas=[],this.ctas=[],this.userId=jsObject.profile.user_id,this.showingCelebrationModal=!1,this.unlockedSection=[],this.languageSelectorElements=document.querySelectorAll(".language-selector"),this.updateUserProfile=this.updateUserProfile.bind(this),this.updateWizardType=this.updateWizardType.bind(this),this.closeWizard=this.closeWizard.bind(this),this.refetchState=this.refetchState.bind(this),this.refetchHost=this.refetchHost.bind(this),this.getCtas=this.getCtas.bind(this),this.redirectToPage=this.redirectToPage.bind(this),this.showCelebrationModal=this.showCelebrationModal.bind(this),this.updateTrainingGroups=this.updateTrainingGroups.bind(this),this.renderTrainingGroupLink=this.renderTrainingGroupLink.bind(this),this.handlePopState=this.handlePopState.bind(this),this.openProfile=this.openProfile.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("user-profile:change",this.updateUserProfile),window.addEventListener("toggle-dashboard-sidebar",this.toggleSidebar),window.addEventListener("open-wizard",this.updateWizardType),window.addEventListener("wizard-finished",this.closeWizard),window.addEventListener("wizard-finished",this.getCtas),window.addEventListener("wizard-finished",this.redirectToPage),window.addEventListener("open-3-month-plan",this.open3MonthPlan),window.addEventListener("open-profile",this.openProfile),window.addEventListener("user-state:change",this.refetchState),window.addEventListener("user-state:change",this.getCtas),window.addEventListener("user-host:change",this.refetchHost),window.addEventListener("training:changed",this.updateTrainingGroups),window.addEventListener("commitments:change",this.getCtas),window.addEventListener("load",this.showCelebrationModal),window.addEventListener("ctas:changed",this.showCelebrationModal),window.addEventListener("popstate",this.handlePopState),this.addEventListener("route",this.updateLanguageSwitcher)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("user-profile:change",this.updateUserProfile),window.removeEventListener("toggle-dashboard-sidebar",this.toggleSidebar),window.removeEventListener("open-wizard",this.updateWizardType),window.removeEventListener("wizard-finished",this.closeWizard),window.removeEventListener("wizard-finished",this.getCtas),window.removeEventListener("wizard-finished",this.redirectToPage),window.removeEventListener("open-3-month-plan",this.open3MonthPlan),window.removeEventListener("open-profile",this.openProfile),window.removeEventListener("user-state:change",this.refetchState),window.removeEventListener("user-state:change",this.getCtas),window.removeEventListener("user-host:change",this.refetchHost),window.removeEventListener("training:changed",this.updateTrainingGroups),window.removeEventListener("load",this.showCelebrationModal),window.removeEventListener("ctas:changed",this.showCelebrationModal),this.removeEventListener("route",this.updateLanguageSwitcher)}firstUpdated(){this.menuOffset=this.getOffsetTop(".sidebar-wrapper"),this.getCtas();const t=this.renderRoot.querySelector("#celebration-modal");t&&jQuery(t).on("closed.zf.reveal",()=>{this.showingCelebrationModal=!1}),this.trainingGroupsOpen=jQuery("#training-groups-menu").hasClass("is-active");const e=document.querySelector("#profile-modal");e&&jQuery(e).on("closed.zf.reveal",()=>{this.closeProfilePushState()}),jQuery(this.renderRoot).foundation(),new URLSearchParams(window.location.search).get("profile")==="true"&&setTimeout(()=>{this.openProfile();const n=window.location.pathname+window.location.hash;window.history.replaceState({},"",n)},0)}handlePopState(t){if(t.state){const{profile:e}=t.state,s=new URL(window.location.href);e||s.searchParams.get("profile")==="true"?this.openProfileModal():this.closeProfileModal()}}updateWizardType(t){const{type:e,params:s}=t.detail;this.openWizard(e,s)}router(t,e,s,n){this.route=t,this.params=e,this.query=s,this.data=n,this.dispatchEvent(new CustomEvent("route"))}makeHref(t){return`${jsObject.base_url}/${t}`}makeHrefRoute(t){const s=S.routes.find(({name:n})=>n===t);if(!s)return console.error("MISSING ROUTE",t),"";if(t===v.myTraining){if(S.getLockedStatus(t,this.userState))return s.pattern.replace(":code","teaser");if(this.numberOfGroups()===1){const r=Object.values(this.trainingGroups)[0].join_key;return s.pattern.replace(":code",r)}}return s.pattern}makeTrainingHref(t){const s=S.routes.find(({name:n})=>n===v.myTraining);return s?s.pattern.replace(":code",t):""}renderRoute(){const{makeComponent:t}=this.data;if(!t)return"";if(this.route===v.myTraining){const s=this.params.code;return t(s)}const e=S.getLockedStatus(this.route,this.userState);return t(e)}getOffsetTop(t){return this.querySelector(t).offsetTop}toggleSidebar(){const t=document.querySelector(".dashboard__sidebar"),e=document.querySelector(".sidebar__trigger-close-background"),s="200";t.style.transitionDuration=s,e.style.transitionDuration=s;const n=t.dataset.state;n==="open"&&(t.dataset.state="closed",e.style.opacity=0,setTimeout(()=>{e.style.visibility="hidden"},s)),(!n||n==="closed")&&(t.dataset.state="open",e.style.opacity="initial",e.style.visibility="visible")}updateLanguageSwitcher(){this.languageSelectorElements.forEach(t=>{const e=location.href,s=t.dataset.url;if(s.includes("legacy.zume.training"))return;const n=e.split("/"),a=s.split("/"),r=a.findIndex(d=>d==="dashboard"),o=n.findIndex(d=>d==="dashboard"),c=[...a.slice(0,r),...n.slice(o)].join("/");t.dataset.url=c})}updateUserProfile(t){const e=t.detail;this.userProfile=e}createInitials(t){return typeof t!="string"||t.length===0?"":t.split(" ").map(s=>s.length>0?s[0].toUpperCase():"").slice(0,2).join("")}static getCompletedStatus(t,e){return!!(t===v.setProfile&&e&&e.set_profile_location&&e.set_profile_name||t===v.getACoach&&e.requested_a_coach||t===v.joinATraining&&(e.plan_created||e.joined_online_training)||t===v.createATraining&&(e.plan_created||e.joined_online_training)||t===v.threeMonthPlan&&e.made_post_training_plan)}static getLockedStatus(t,e){return!!(t===v.myPlans&&!e.made_post_training_plan||[v.myChurches,v.myMaps].includes(t)&&!e.join_community||t===v.threeMonthPlan&&!e.can_create_3_month_plan||t===v.myTraining&&!e.plan_created&&!e.joined_online_training||t===v.myCoach&&!e.requested_a_coach)}isGettingStartedActive(){return S.childRoutesOf(v.gettingStarted).some(e=>!S.getCompletedStatus(e.name,this.userState))}getGettingStartedPercentage(){const t=[v.getACoach,v.setProfile,v.joinATraining],e=t.reduce((s,n)=>S.getCompletedStatus(n,this.userState)?s+1:s,0);return Math.round(e/t.length*100)}openWizard(t,e=""){const s=document.querySelector("#wizard-modal");jQuery(s).foundation("open"),this.wizardType=t,this.wizardParams=e}closeWizard(){console.log("closing wizard"),this.wizardType="",this.wizardParams="";const t=document.querySelector("#wizard-modal");jQuery(t).foundation("close")}open3MonthPlan(){const t=document.querySelector("#activity-3-month-plan-modal");jQuery(t).foundation("_disableScroll"),jQuery(t).foundation("open")}close3MonthPlan(){const t=document.querySelector("#activity-3-month-plan-modal");jQuery(t).foundation("_enableScroll"),jQuery(t).foundation("close")}handleCreated3MonthPlan(){this.dispatchEvent(new CustomEvent("user-state:change",{bubbles:!0})),this.close3MonthPlan(),this.navigate(this.makeHref(v.myPlans))}unlock3MonthPlan(){const t={type:"training",subtype:"26_heard"};this.unlockedSection.push(t),_.post("log",t).then(e=>{this.dispatchEvent(new CustomEvent("user-state:change",{bubbles:!0})),this.dispatchEvent(new CustomEvent("user-host:change",{bubbles:!0}))})}refetchState(){this.getCtas(),_.get("user_stage",{}).then(t=>{(!t||!t.state)&&console.error("Stage or state data not returned from api"),jsObject.user_stage=t,this.userState=t.state})}refetchHost(){_.get("user_host",{}).then(t=>{t||console.error("Host not returned from api"),jsObject.host_progress=t})}getCtas(){_.post("user_ctas",{user_id:this.userId,language:jsObject.language}).then(t=>{const e=Object.values(t);let s=e,n=[];if(this.unlockedSection.length>0){const d=this.unlockedSection.map(u=>u.type+"_"+u.subtype);s=e.filter(u=>!u.required_keys.some(p=>d.includes(p))),n=e.filter(u=>u.required_keys.some(p=>d.includes(p)))}this.allCtas=s;const a=d=>{for(let u=d.length-1;u>0;u--){const p=Math.floor(Math.random()*(u+1));[d[u],d[p]]=[d[p],d[u]]}return d},r=this.allCtas.filter(({content_template:d})=>d==="celebration"),o=this.allCtas.filter(({content_template:d})=>d==="card"),c=[...r,...a(o)];if(this.allCtas=c,jsObject.allCtas=this.allCtas,this.dispatchEvent(new CustomEvent("ctas:changed",{bubbles:!0})),n.length>0){const d=n.map(u=>{const p=u.disable_keys.length>0?u.disable_keys[0]:"";if(!p)return Promise.resolve();const m=p.substring(0,p.indexOf("_")),g=p.substr(p.indexOf("_")+1);return _.post("log",{type:m,subtype:g})});Promise.all(d).finally(()=>{this.dispatchEvent(new CustomEvent("ctas:changed",{bubbles:!0}))})}})}showCelebrationModal(){if(this.showingCelebrationModal)return;const t=this.renderRoot.querySelector("dash-cta"),e=this.allCtas.filter(({content_template:s})=>s==="celebration");if(!t&&e.length>0){this.showingCelebrationModal=!0,e.forEach(({content:{title:a,description:r}})=>{this.celebrationModalContent.title=r,this.celebrationModalContent.content.push(a)}),this.requestUpdate();const s=document.querySelector("#celebration-modal");jQuery(s).foundation("open"),e.forEach(({type:a,subtype:r})=>{_.post("log",{type:a,subtype:r}).then(()=>{this.dispatchEvent(new CustomEvent("ctas:changed",{bubbles:!0}))})});const n=e.map(({key:a})=>a);this.allCtas=jsObject.allCtas.filter(({key:a})=>!n.includes(a)),jsObject.allCtas=this.allCtas}}openProfile(){const t=new URL(window.location.href);t.searchParams.set("profile","true"),window.history.pushState({profile:!0},null,t.toString()),this.openProfileModal()}closeProfile(){this.closeProfilePushState(),this.closeProfileModal()}closeProfilePushState(){const t=new URL(window.location.href);t.searchParams.delete("profile"),window.history.pushState({profile:!1},null,t.toString())}openProfileModal(){const t=document.querySelector("#profile-modal");jQuery(t).foundation("open")}closeProfileModal(){const t=document.querySelector("#profile-modal");jQuery(t).foundation("close")}openCommunityWizard(t){t.preventDefault(),this.openWizard(y.joinCommunity)}hasJoinedCommunity(){return!!this.userState.join_community}openJoinTrainingWizard(t){t.preventDefault(),this.openWizard(y.joinATraining)}numberOfGroups(){return Object.keys(this.trainingGroups).length}toggleTrainingGroups(){jQuery(this.renderRoot).foundation(),jQuery("#training-menu").foundation("toggle",jQuery("#training-groups-menu")),this.trainingGroupsOpen=jQuery("#training-groups-menu").hasClass("is-active")}redirectToPage(t){const{type:e}=t.detail;e===y.getACoach&&this.navigate(this.makeHref(v.myCoach)),[y.makeAGroup,y.makeFirstGroup,y.joinATraining,y.joinFriendsPlan].includes(e)&&_.get("plans",{}).then(s=>{const n={...this.trainingGroups},a=Object.keys(n);this.trainingGroups=s,jsObject.training_groups=s;const r=Object.keys(this.trainingGroups).filter(o=>!a.includes(o));if(r.length===1){const o=this.trainingGroups[r[0]],c=this.makeTrainingHref(o.join_key);this.navigate(c)}})}updateTrainingGroups(){_.get("plans").then(t=>{this.trainingGroups=t,this.updateSortedTrainingGroups()})}updateSortedTrainingGroups(){this.sortedTrainingGroups=Object.entries(this.trainingGroups).map(([t,e])=>({...e,trainingGroupId:t})),this.sortedTrainingGroups.sort((t,e)=>e.timestamp-t.timestamp),this.activeTrainingGroups=this.sortedTrainingGroups.filter(({status:t})=>t==="active"),this.inactiveTrainingGroups=this.sortedTrainingGroups.filter(({status:t})=>t==="inactive"),jsObject.active_training_groups=this.activeTrainingGroups,jsObject.inactive_training_groups=this.inactiveTrainingGroups}isParentSectionActive(t){let e=S.getRoute(this.route);return this.route==="root"&&(e=S.rootRoute),e.name===t||e.parent===t}isChildRouteActive(t){return t===this.route}isTrainingRouteActive(t){return t===this.params.code}renderTrainingGroupLink(t){return l`
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
                                <li class="menu-section" data-no-toggle ?data-active=${this.isParentSectionActive(v.gettingStarted)}>
                                    <nav-link
                                        href=${this.makeHref(v.gettingStarted)}
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
                                        ${S.childRoutesOf(v.gettingStarted).map(t=>l`
                                                <li>
                                                    <nav-link
                                                        class="menu-btn"
                                                        href=${this.makeHrefRoute(t.name)}
                                                        ?active=${this.isChildRouteActive(t.name)}
                                                        icon=${t.icon}
                                                        text=${t.translation}
                                                        as=${t.type==="handled-link"?"button":"navs"}
                                                        @click=${t.type==="handled-link"?e=>{if(!t.data.neverDisabled&&S.getCompletedStatus(t.name,this.userState)){e.preventDefault();return}t.clickHandler(e,this.dispatchEvent)}:null}
                                                        ?completed=${S.getCompletedStatus(t.name,this.userState)}
                                                    ></nav-link>
                                                    <span
                                                        class="icon z-icon-check-mark success"
                                                    ></span>
                                                </li>
                                            `)}
                                    </ul>
                                </li>
                            </ul>
                            <div class="menu-section" ?data-active=${this.isParentSectionActive(v.training)}>
                                <nav-link
                                    href=${this.makeHref(v.training)}
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
                                    ${S.childRoutesOf(v.training).map(t=>{const e=S.getLockedStatus(t.name,this.userState),s=S.getCompletedStatus(t.name,this.userState),n=t.type==="handled-link";return t.name===v.myTraining&&this.numberOfGroups()>1?l`
                                                <li>
                                                    <nav-link
                                                        class="menu-btn"
                                                        icon=${t.icon}
                                                        ?active=${this.isChildRouteActive(v.myTrainings)||!this.trainingGroupsOpen&&this.isChildRouteActive(v.myTraining)}
                                                        text=${jsObject.translations.my_trainings}
                                                        as="nav"
                                                        href=${this.makeHref("my-trainings")}
                                                    ></nav-link>
                                                    <button
                                                        class="d-flex justify-content-center"
                                                        @click=${this.toggleTrainingGroups}
                                                    >
                                                        <img
                                                            class="training-groups__toggle svg w-1rem h-1rem"
                                                            src=${jsObject.images_url+"/chevron.svg"}
                                                        />
                                                    </button>
                                                    <ul
                                                        id="training-groups-menu"
                                                        class="menu vertical nested"
                                                    >
                                                        <li>${jsObject.translations.active}</li>
                                                        ${U(this.activeTrainingGroups,a=>a.trainingGroupId,this.renderTrainingGroupLink)}
                                                        <li>${jsObject.translations.inactive}</li>
                                                        ${U(this.inactiveTrainingGroups,a=>a.trainingGroupId,this.renderTrainingGroupLink)}
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
                            <li class="menu-section" ?data-active=${this.isParentSectionActive(v.practicing)}>
                                <nav-link
                                    href=${this.makeHref(v.practicing)}
                                    class="menu-section__title menu-btn"
                                    icon="z-icon-practicing"
                                    text=${jsObject.translations.practicing}
                                    as="nav"
                                ></nav-link>
                                <ul class="nested">
                                    ${S.childRoutesOf(v.practicing).map(t=>l`
                                            <li>
                                                <nav-link
                                                    class="menu-btn"
                                                    href=${this.makeHrefRoute(t.name)}
                                                    ?active=${this.isChildRouteActive(t.name)}
                                                    icon=${t.icon}
                                                    text=${t.translation}
                                                    ?locked=${S.getLockedStatus(t.name,this.userState)}
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
                    .params=${this.wizardParams}
                    .user=${this.userProfile}
                    .translations=${jsObject.wizard_translations}
                    noUrlChange
                ></zume-wizard>
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
                ${S.getLockedStatus("3-month-plan",this.userState)?l`
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
        `}createRenderRoot(){return this}}customElements.define("dash-board",S);class vt extends k{constructor(){super();const e=document.querySelector("html").dataset.dir;this.isRtl=e==="rtl"}firstUpdated(){this.attachResizeObeserver(),this.updateHeaderStyle(),window.scrollTo({top:0,behavior:"instant"})}attachResizeObeserver(){const t=document.querySelector("dash-header-right"),e=new ResizeObserver(s=>{for(let n of s){if(!n.contentRect)return;const a=Math.round(n.contentRect.height),r=Math.round(n.contentRect.width);this.updateHeaderStyle(!1,a,r)}});this.resizeObserver=e,e.observe(t)}updateHeaderStyle(t=!0,e=0,s=window.innerWidth){const n=document.querySelector(".dashboard__header.left");t&&(this.initialOffset=n.offsetTop);let a;s<window.innerWidth/2?a=this.initialOffset:a=this.initialOffset+e,n.style.top=a+"px"}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver&&this.resizeObserver.disconnect()}}class rl extends vt{constructor(){var e;super();E(this,"lng");E(this,"lat");E(this,"level");E(this,"locationLabel");E(this,"mode");this.showTeaser=!1,this.route=S.getRoute("my-churches"),this.churches=[...(e=jsObject.churches)!==null&&e!==void 0?e:[]],this.orderedChurches=[],this.sortedChurches=[],this.filteredChurches=[],this.orderChurches(),this.locationLabel="",this.formErrors=!1,this.errorMessage="",this.renderChurch=this.renderChurch.bind(this),this.addChurch=this.addChurch.bind(this),this.addChildChurch=this.addChildChurch.bind(this),this.editChurch=this.editChurch.bind(this),this.handleSubmit=this.handleSubmit.bind(this),this.orderChurches=this.orderChurches.bind(this),this.deleteChurch=this.deleteChurch.bind(this),this.addMarkerToMap=this.addMarkerToMap.bind(this),this.getDescendentChurches=this.getDescendentChurches.bind(this),this.openEditChurchModal=this.openEditChurchModal.bind(this),this.openAddChurchModal=this.openAddChurchModal.bind(this),this.openChurchModal=this.openChurchModal.bind(this),this.clearChurchModal=this.clearChurchModal.bind(this),document.querySelectorAll(".reveal-overlay #new-church-form").forEach(s=>{s.parentElement.remove()}),mapboxgl.accessToken=jsObject.map_key}static get properties(){return{showTeaser:{type:Boolean},orderedChurches:{type:Array,attribute:!1},filteredChurches:{type:Array,attribute:!1},formErrors:{type:Boolean,attribute:!1},loading:{type:Boolean,attribute:!1},errorMessage:{type:String,attribute:!1},confirmDelete:{type:Number,attribute:!1},mode:{type:String,attribute:!1}}}firstUpdated(){super.firstUpdated(),document.querySelector("#add-church-form").addEventListener("submit",this.handleSubmit),jQuery("#new-church-form").on("closed.zf.reveal",this.clearChurchModal),this.initialiseChurchEventHandlers()}updated(){jQuery(this.renderRoot).foundation()}initialiseChurchEventHandlers(){this.renderRoot.querySelectorAll(".dropdown-pane").forEach(s=>{jQuery(s).on("hide.zf.dropdown",()=>{this.confirmDelete=""})})}initialiseMap(){let e,s;this.lng?(e=[this.lng,this.lat],s=5):(e=[-20,30],s=1),this.map=new mapboxgl.Map({container:"map-edit",style:"mapbox://styles/mapbox/light-v10",center:e,zoom:s}),this.map.on("click",(function(r){let o=r.lngLat.lng,c=r.lngLat.lat;this.lng=o,this.lat=c,this.active_marker&&this.active_marker.remove(),this.addMarkerToMap(r.lngLat),this.locationLabel="",this.updateLocationLabelInForm()}).bind(this));const n=new MapboxGeocoder({accessToken:mapboxgl.accessToken,types:"country region district locality neighborhood address place",mapboxgl});this.map.addControl(n,"top-left"),n.on("result",(function(r){this.active_marker&&this.active_marker.remove(),this.addMarkerToMap(r.result.center),n._removeMarker(),this.lng=r.result.center[0],this.lat=r.result.center[1],this.level=r.result.place_type[0],this.locationLabel=r.result.place_name,this.updateLocationLabelInForm()}).bind(this));let a=new mapboxgl.GeolocateControl({positionOptions:{enableHighAccuracy:!0},marker:{color:"orange"},trackUserLocation:!1,showUserLocation:!1});this.map.addControl(a,"top-left"),a.on("geolocate",(function(r){this.active_marker&&this.active_marker.remove();let o=r.coords.latitude,c=r.coords.longitude;this.lat=o,this.lng=c,this.addMarkerToMap({lng:c,lat:o}),this.locationLabel="",this.updateLocationLabelInForm()}).bind(this))}addMarkerToMap(e){let s,n;Array.isArray(e)?(n=e[0],s=e[1]):(s=e.lat,n=e.lng);const a=[n,s];this.active_marker=new mapboxgl.Marker().setLngLat(a).addTo(this.map)}updateLocationLabelInForm(e){document.getElementById("location-label").textContent=this.locationLabel||""}joinCommunity(){this.dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:y.joinCommunity}}))}orderChurches(){this.orderedChurches=[],this.sortedChurches=[...this.churches.sort((s,n)=>s.name.toLowerCase()<n.name.toLowerCase()?-1:1)],this.filteredChurches=[...this.sortedChurches];const e=this.churches.filter(s=>!s.parent);for(const s of e)this.processChurch(s.id,0);this.orderedChurches=[...this.orderedChurches]}processChurch(e,s){const n=s+1,a=this.getChurch(e);if(!a){console.log(e,"not found");return}a.generation=n,this.orderedChurches.push(a),a.children.forEach(r=>{this.processChurch(r,n)})}isLeafChurch(e){const s=this.getChurch(e);return s?s.children.length===0:!1}getChurch(e){return this.churches.find(n=>n.id===e)}handleSubmit(e){e.preventDefault(),this.mode==="add"?this.addChurch():this.editChurch(this.churchId)}addChurch(){this.postChurch(e=>{this.churches=[e,...this.churches].map(s=>e.parent&&s.id===e.parent?{...s,children:[...s.children,e.id]}:s),this.orderChurches(),this.closeChurchModal()})}postChurch(e){if(this.loading=!0,this.formErrors=!1,document.querySelector("#add-church-form .loading-spinner").classList.add("active"),!this.lat||!this.lng||!this.churchName||!this.startDate||!this.churchMembers){this.formErrors=!0,document.querySelector("#add-church-form .loading-spinner").classList.remove("active");return}const s={name:this.churchName,member_count:this.churchMembers,start_date:this.startDate,location_grid_meta:{values:[],force_values:!0}};this.parentChurch&&(s.parent_church=this.parentChurch);const n={lng:this.lng,lat:this.lat,source:"user"};this.level&&this.locationLabel&&(n.level=this.level,n.label=this.locationLabel),this.mode==="edit"&&this.churchId&&(s.post_id=this.churchId),s.location_grid_meta.values.push(n),(this.mode==="add"?_.post:_.put)("church",s).then(r=>{e(r)}).catch(r=>{console.error(r),this.showErrorMessage()}).finally(()=>{this.loading=!1,document.querySelector("#add-church-form .loading-spinner").classList.remove("active")})}showErrorMessage(e){this.errorMessage=e||jsObject.translations.error;const s=document.querySelector(".church-warning-banner");s.textContent=this.errorMessage,s.dataset.state="",setTimeout(()=>{this.errorMessage="",s.textContent="",s.dataset.state="empty"},3e3)}editChurch(){this.postChurch(e=>{this.churches=this.churches.map(s=>s.id===e.id?e:e.parent&&s.id===e.parent&&!s.children.includes(e.id)?{...s,children:[...s.children,e.id]}:s.id!==e.parent&&s.children.includes(e.id)||!e.parent&&s.children.includes(e.id)?{...s,children:s.children.filter(n=>n!==e.id)}:s),this.orderChurches(),this.closeChurchModal()})}activateChurch(e){this.closeKebabMenu(e),_.put(`church/${e}/activate`).then(()=>{this.churches=this.churches.map(s=>s.id===e?{...s,status:"active"}:s),this.orderChurches()}).catch(console.error)}deactivateChurch(e){this.closeKebabMenu(e),_.put(`church/${e}/deactivate`).then(()=>{this.churches=this.churches.map(s=>s.id===e?{...s,status:"inactive"}:s),this.orderChurches()}).catch(console.error)}confirmDeleteChurch(e){this.confirmDelete=e}deleteChurch(e){const s=this.churches.find(o=>o.id===e),n=this.churches.findIndex(o=>o.id===e),a=[];let r;this.churches=this.churches.filter(o=>o.id!==e).map(o=>o.parent===e?(a.push(o.id),{...o,parent:null}):o.children.includes(e)?(r=o.id,{...o,children:o.children.filter(c=>c!==e)}):o),this.orderChurches(),_.delete("church",{church_id:e}).then(o=>{}).catch(o=>{console.error(o),this.showErrorMessage(),this.churches=[...this.churches.slice(0,n),s,...this.churches.slice(n)].map(c=>a.includes(c.id)?{...c,parent:e}:r===c.id?{...c,children:[...c.children,e]}:c),this.orderChurches()})}getDescendentChurches(e){const s=[e],n=a=>{const r=this.getChurch(a);for(const o of r.children)s.push(o),n(o)};return n(e),s}addChildChurch(e){this.parentChurch=e,this.openAddChurchModal(e)}openAddChurchModal(){this.mode="add",document.querySelector(".submit-button-text").textContent=jsObject.translations.add_new_church,this.filteredChurches=[...this.orderedChurches],this.openChurchModal()}openEditChurchModal(e){this.mode="edit",document.querySelector(".submit-button-text").textContent=jsObject.translations.save;const s=this.churches.find(a=>a.id===e);this.churchId=e,this.churchName=s.name,this.churchMembers=s.member_count,this.startDate=s.start_date.formatted,this.lat=s.location_meta.lat,this.lng=s.location_meta.lng,this.locationLabel=s.location_meta.label,this.level=s.location_meta.level,this.parentChurch=s.parent;const n=this.getDescendentChurches(e);this.filteredChurches=[...this.orderedChurches.filter(a=>!n.includes(a.id))],this.openChurchModal()}openChurchModal(){if(this.showTeaser)return;const e=document.querySelector("#new-church-form");jQuery(e).foundation("open"),document.getElementById("church-name").value=this.churchName||"",document.getElementById("church-start-date").value=this.startDate||"",document.getElementById("number-of-people").value=this.churchMembers||"",document.getElementById("parent-church").value=`${this.parentChurch}`||"",this.updateLocationLabelInForm(),this.initialiseMap(),this.lat&&this.addMarkerToMap({lat:this.lat,lng:this.lng})}closeChurchModal(){const e=document.querySelector("#new-church-form");jQuery(e).foundation("close"),this.clearChurchModal()}clearChurchModal(){jQuery("#add-church-form input").each(function(e){this.value=""}),document.querySelector("#add-church-form select").value="",this.churchName="",this.churchMembers="",this.locationLabel="",this.startDate="",this.lat=void 0,this.lng=void 0,this.parentChurch=void 0}closeKebabMenu(e){const s=this.renderRoot.querySelector(`#kebab-menu-${e}`);s||console.log("kebab menu not found",e),jQuery(s).foundation("close")}renderChurchOption({id:e,name:s}){return l`
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
                            <!-- <button class="icon-btn f-2" data-toggle="filter-menu" ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser?"true":"false"}>
                                <span class="visually-hidden">${jsObject.translations.filter}</span>
                                <span class="icon z-icon-filter" aria-hidden="true"></span>
                            </button> -->
                            <button class="icon-btn f-2" @click=${this.openAddChurchModal} ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser?"true":"false"}>
                                <span class="visually-hidden">${jsObject.translations.add_church}</span>
                                <span class="icon z-icon-plus" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <!-- <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                        <ul>
                        </ul>
                    </div> -->
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
                                    `:U(this.orderedChurches,e=>`${e.id}`,this.renderChurch)}
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
                                ${U(this.filteredChurches,({id:e})=>e,this.renderChurchOption)}
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
        `}createRenderRoot(){return this}}customElements.define("dash-churches",rl);class ol extends vt{static get properties(){return{showTeaser:{type:Boolean},coaches:{type:Array,attribute:!1}}}constructor(){super(),this.coaches=Object.values(jsObject.profile.coaches)||[]}getACoach(){this.dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:y.getACoach}}))}render(){return console.log(this.coaches),l`
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
                          <p>
                            ${jsObject.translations.connecting_with_coach}
                          </p>
                          <p>
                            ${jsObject.translations.wait_for_coach}
                          </p>
                      `:""}
                  ${!this.showTeaser&&this.coaches.length>0?l`
                        <div class="grid grid-min-18rem">
                          ${this.coaches.map(t=>l`
                                  <div class="card stack">
                                    <h3>${t.name}</h3>
                                    ${t.communication_apps.length?l`
                                        <ul class="stack">
                                          ${t.communication_apps.includes("email")?l`
                                              <li>${jsObject.translations.email}: <a href="mailto:${t.email}">${t.email}</a></li>
                                            `:""}
                                          ${t.communication_apps.includes("phone")?l`
                                              <li>${jsObject.translations.phone}: ${t.phone}</li>
                                            `:""}
                                          ${t.communication_apps.map(e=>"")}
                                        </ul>
                                      `:""}

                                  </div>
                              `)}
                        </div>
                      `:""}
                </div>

                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-coach",ol);const nt=class nt extends qs(k){static get properties(){return{ctas:{type:Array,attribute:!1}}}constructor(){super(),this.allCtas=[],this.ctas=[],this.celebrations=[],this.hiddenCtaKeys=[],this.initialCtaKeys=[],this.removedCtaKeys=[],this.celebrationsLogged=[],this.manageCtas=this.manageCtas.bind(this),this.transitionIn=this.transitionIn.bind(this),this.transitionCtas=this.transitionCtas.bind(this),this.renderCta=this.renderCta.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("ctas:changed",this.manageCtas),this.addEventListener("begin-cta-transitions",this.transitionIn),this.addEventListener("cta-transition-in-ended",this.logCelebrationsSeen)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("ctas:changed",this.manageCtas),this.removeEventListener("begin-cta-transitions",this.transitionIn),this.removeEventListener("cta-transition-in-ended",this.logCelebrationsSeen)}firstUpdated(){this.manageCtas()}updated(){this.dispatchEventAfterUpdated&&(this.dispatchEventAfterUpdated=!1,setTimeout(()=>{this.dispatchEvent(new CustomEvent("begin-cta-transitions"))},10))}manageCtas(){const t=this.getCtas(),[e,s,n]=this.diffCtas(t,this.ctas),a=[...e,...s].filter(({content_template:u})=>u==="celebration"),r=[...e,...s].filter(({content_template:u})=>u!=="celebration"),o=[...a,...r],c=this.getCtaKeys(o),d=this.getCtaKeys(n);this.ctas=o,this.celebrations=a,this.hiddenCtaKeys=this.getCtaKeys(e),this.removedCtaKeys=[...d,...c.slice(nt.MAX_CTAS)],this.initialCtaKeys=c.slice(0,nt.MAX_CTAS),this.ctas.length>0&&(this.dispatchEventAfterUpdated=!0)}getCtas(){var t;return(t=jsObject.allCtas)!==null&&t!==void 0?t:[]}diffCtas(t,e){const s=t.filter(({key:r})=>e.findIndex(({key:o})=>o===r)===-1),n=e.filter(({key:r})=>t.findIndex(({key:o})=>o===r)===-1),a=e.filter(({key:r})=>t.findIndex(({key:o})=>o===r)>-1);return[s,a,n]}transitionIn(){this.transitionCtas(this.removedCtaKeys,this.initialCtaKeys),setTimeout(()=>{this.dispatchEvent(new CustomEvent("cta-transition-in-ended"))},nt.TRANSITION_TIMEOUT)}logCelebrationsSeen(){this.celebrations.forEach(({type:e,subtype:s})=>{this.celebrationsLogged.includes(e+s)||(_.post("log",{type:e,subtype:s,log_once:!0}),this.celebrationsLogged.push(e+s))});const t=this.getCtaKeys(this.celebrations);jsObject.allCtas=jsObject.allCtas.filter(({key:e})=>!t.includes(e))}transitionCtas(t,e){(t.length>0?this.getCtaElements(t):[]).forEach(a=>{a&&(a.style.height=a.clientHeight+"px",setTimeout(()=>{a.classList.add("transition-out"),a.style.height=""},10))}),(e.length>0?this.getCtaElements(e):[]).forEach(a=>{a&&(a.classList.remove("hiding"),a.classList.add("showing"))})}getCtaElements(t){return this.renderRoot.querySelectorAll(t.map(e=>`[data-key="${e}"]`).join(","))}getCtaKeys(t){return t.map(({key:e})=>e)}isWizardLink(t){return t.includes("/wizard/")}openWizard(t){const e=t.split("/"),s=e[e.length-1];dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:s}}))}openModal(t){const e=t.split("/"),s=e[e.length-1];this.dispatchEvent(new CustomEvent(s,{bubbles:!0}))}renderLink(t){return this.isWizardLink(t.link)?l`
                <button class="btn" @click=${()=>this.openWizard(t.link)}>${t.link_text}</button>
            `:t.link.includes("modal/")?l`
                <button class="btn" @click=${()=>this.openModal(t.link)}>${t.link_text}</button>
            `:t.link.includes("/dashboard/")?l`
                <a class="btn" @click=${e=>{e.preventDefault(),this.navigate(t.link)}}>${t.link_text}</a>
            `:l`
            <a href="${t.link}" class="btn">${t.link_text}</a>
        `}renderCta({content:t,content_template:e,key:s}){const n=this.hiddenCtaKeys.includes(s)?"hiding":"showing";if(e==="card")return l`
                <div class="stack | card cta ${n}" data-key=${s} style="--duration: ${nt.TRANSITION_TIMEOUT}ms">
                    <h2 class="h5 text-center">${t.title}</h2>
                    <p>${t.description}</p>
                    ${this.renderLink(t)}
                </div>
            `;if(e==="celebration")return l`
                <div class="stack | card celebration ${n}" data-key=${s} style="--duration: ${nt.TRANSITION_TIMEOUT}ms">
                    <h2 class="h5 text-center bold">${t.title}</h2>
                    <div class="d-flex align-items-center justify-content-between">
                        <img src="${jsObject.images_url+"/fireworks-2.svg"}" alt="" />
                        <img src="${t.image_url}" alt="" />
                        <img src="${jsObject.images_url+"/fireworks-2.svg"}" alt="" />
                    </div>
                    <p>${t.description}</p>
                </div>
            `}render(){return l`
            <div class="stack-margin-bottom">
                ${U(this.ctas,t=>t.key,this.renderCta)}
            </div>
        `}createRenderRoot(){return this}};E(nt,"FADE_TIMEOUT",3e3),E(nt,"TRANSITION_TIMEOUT",500),E(nt,"MAX_CTAS",3);let xs=nt;customElements.define("dash-cta",xs);class Ye extends vt{static get properties(){return{view:{type:String,attribute:!1},userState:{type:Object,attribute:!1}}}constructor(t){super(),this.routeName=t,this.route=S.getRoute(this.routeName),this.routes=S.childRoutesOf(this.routeName),this.view="list",this.userState=jsObject.user_stage.state,this.refetchState=this.refetchState.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("user-state:change",this.refetchState)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("user-state:change",this.refetchState)}switchView(t="list"){this.view=t}refetchState(){_.get("user_stage",{}).then(t=>{(!t||!t.state)&&console.error("Stage or state data not returned from api"),jsObject.user_stage=t,this.userState=t.state})}renderLinks(t){return l`
            <div class="${this.view==="grid"?"nav-grid":"stack"}">
                ${this.routes.map(e=>{let s=e.pattern;const n=Object.keys(jsObject.training_groups);e.name===v.myTraining&&(n.length===0?s=e.pattern.replace(":code","teaser"):n.length>0&&(s=S.getRoute(v.myTrainings).pattern));let a=e.translation;return Object.keys(jsObject.training_groups).length>1&&e.name===v.myTraining&&(a=jsObject.translations.my_trainings),this.view==="grid"?l`
                                <grid-link
                                    href=${s}
                                    text=${a}
                                    icon=${e.icon}
                                    ?disableNavigate=${e.type==="handled-link"}
                                    as=${e.type==="handled-link"?"link":"nav"}
                                    @click=${e.type==="handled-link"?r=>{!e.data.neverDisabled&&S.getCompletedStatus(e.name,t)||e.clickHandler(r,this.dispatchEvent)}:null}
                                    ?completed=${S.getCompletedStatus(e.name,t)}
                                    ?locked=${S.getLockedStatus(e.name,t)}
                                >
                                </grid-link>
                            `:l`
                               <list-link
                                    href=${s}
                                    text=${a}
                                    explanation=${e.explanation}
                                    icon=${e.icon}
                                    ?disableNavigate=${e.type==="handled-link"}
                                    as=${e.type==="handled-link"?"link":"nav"}
                                    @click=${e.type==="handled-link"?r=>{!e.data.neverDisabled&&S.getCompletedStatus(e.name,t)||e.clickHandler(r,this.dispatchEvent)}:null}
                                    ?completed=${S.getCompletedStatus(e.name,t)}
                                    ?locked=${S.getLockedStatus(e.name,t)}
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
        `}createRenderRoot(){return this}}customElements.define("dash-top-level",Ye);class ll extends Ye{constructor(){super("getting-started")}createRenderRoot(){return this}}customElements.define("dash-getting-started",ll);class cl extends vt{static get properties(){return{showTeaser:{type:Boolean},scriptUrl:{type:String,attribute:!1},loading:{type:Boolean,attribute:!1}}}constructor(){super(),this.showTeaser=!1,this.scriptUrl=""}connectedCallback(){super.connectedCallback(),this.openModal=this.openModal.bind(this),this.handleLoad=this.handleLoad.bind(this)}firstUpdated(){jQuery(this.renderRoot).foundation(),document.querySelector("#map-iframe").addEventListener("load",this.handleLoad)}joinCommunity(){this.dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:y.joinCommunity}}))}openModal(t){let e=t.target.dataset.map;const s=this.scriptUrl;e==="hundred-hour-map"?this.scriptUrl="/zume_app/last100_hours?show-exit-button":e==="vision-map"?this.scriptUrl="/zume_app/heatmap_trainees?show-exit-button":e==="church-map"?this.scriptUrl="/zume_app/heatmap_churches?show-exit-button":this.scriptUrl="",s!==this.scriptUrl&&(this.loading=!0);const n=document.querySelector("#map-modal");jQuery(n).foundation("open")}handleLoad(){this.loading=!1,this.attachExitButtonEventHandler()}attachExitButtonEventHandler(){const e=document.querySelector("#map-iframe").contentDocument.querySelector("#exit-btn");e==null||e.addEventListener("click",s=>{this.closeModal()})}closeModal(){const t=document.querySelector("#map-modal");jQuery(t).foundation("close")}render(){return l`
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
                              <div class="nav-grid" data-full-width>
                                  <grid-link
                                      data-map="hundred-hour-map"
                                      @click=${this.openModal}
                                      text=${jsObject.translations.hundred_hour_map}
                                      ?noRenderText=${!0}
                                  >
                                  </grid-link>
                                  <grid-link
                                      data-map="vision-map"
                                      @click=${this.openModal}
                                      text=${jsObject.translations.training_vision_map}
                                      ?noRenderText=${!0}
                                  >
                                  </grid-link>
                                  <grid-link
                                      data-map="church-map"
                                      @click=${this.openModal}
                                      text=${jsObject.translations.simple_church_planting_map}
                                      ?noRenderText=${!0}
                                  >
                                  </grid-link>
                                  <!-- <grid-link
                                    data-map="local-map"
                                    href="/maps/local?grid_id=${jsObject.profile.location.grid_id||""}&lang=${jsObject.language}"
                                    target="_blank"
                                    text=${jsObject.translations.local_map}
                                    ?noRenderText=${!0}
                                  >
                                  </grid-link> -->
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
        `}createRenderRoot(){return this}}customElements.define("dash-maps",cl);class dl extends vt{render(){return l`
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
        `}createRenderRoot(){return this}}customElements.define("dash-not-found",dl);class hl extends vt{static get properties(){return{showTeaser:{type:Boolean},loading:{type:Boolean,attribute:!1},saving:{type:Boolean,attribute:!1},commitments:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1},editCategory:{type:String,attribute:!1},editId:{type:Number,attribute:!1}}}constructor(){super(),this.showTeaser=!1,this.loading=!0,this.saving=!1,this.route=S.getRoute("my-plans"),this.filterName="my-plans-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.commitments=[],this.editCategory="",this.renderListItem=this.renderListItem.bind(this),this.closeCommitmentsModal=this.closeCommitmentsModal.bind(this),document.querySelectorAll(".reveal-overlay #commitments-form").forEach(t=>{t.parentElement.remove()})}firstUpdated(){super.firstUpdated();const t=this.filterStatus||"";this.fetchCommitments(t)}updated(){jQuery(this.renderRoot).foundation()}fetchCommitments(){const t=this.filterStatus;_.get("commitments",{status:t}).then(e=>{this.commitments=e}).finally(()=>{this.loading=!1})}editQuestion(){return document.querySelector("#edit-question")}editAnswer(){return document.querySelector("#edit-answer")}editNote(){return document.querySelector("#edit-note")}openEditCommitmentsModal(t){this.closeMenu(t);const e=this.getCommitment(t);this.editCategory=e.category,e.category==="post_training_plan"?(this.editQuestion().value=e.question,this.editAnswer().value=e.answer):this.editNote().value=e.note,this.editId=t,this.openCommitmentsModal("edit"),e.category==="post_training_plan"?document.querySelector("#edit-answer").focus():document.querySelector("#edit-note").focus()}closeCommitmentsModal(){this.editQuestion().value="",this.editAnswer().value="",this.editNote().value="",this.editCategory="";const t=document.querySelector("#commitments-form");jQuery(t).foundation("close")}handleOpenCommitmentsModal(t){this.openCommitmentsModal("add")}openCommitmentsModal(t="add"){if(this.showTeaser)return;this.mode=t,t==="add"&&(this.editCategory="custom");const e=document.querySelector("#commitments-form");jQuery(e).foundation("open")}handleAddedCommitments(){this.fetchCommitments(),this.closeCommitmentsModal()}getCommitment(t){return this.commitments.find(({id:e})=>e===t)}completeCommitment(t){let e={id:t,user_id:jsObject.profile.user_id};_.put("commitment",e).then(s=>{this.fetchCommitments(),this.dispatchCommitmentsChangedEvent()})}dispatchCommitmentsChangedEvent(){this.dispatchEvent(new CustomEvent("commitments:change",{bubbles:!0}))}deleteCommitment(t){let e={id:t,user_id:jsObject.profile.user_id};_.delete("commitment",e).then(s=>{this.closeMenu(t),this.fetchCommitments(),this.dispatchCommitmentsChangedEvent()})}saveCommitment(t){t.preventDefault(),this.saving=!0,this.mode==="add"?this.addCommitment():this.editCommitment()}addCommitment(){const t=document.querySelector("#edit-note").value,e=new Date;e.setDate(e.getDate()+30);let s={note:t,date:e,category:"custom"};_.post("commitment",s).then(()=>{this.fetchCommitments(),this.closeCommitmentsModal()}).catch(n=>{console.log(n)}).finally(()=>{this.saving=!1})}editCommitment(){let t={id:this.editId,user_id:jsObject.profile.user_id};this.editCategory==="post_training_plan"?(t.question=this.editQuestion().value,t.answer=this.editAnswer().value):t.note=this.editNote().value,console.log(this.editCategory),this.saving=!0,_.update("commitment",t).then(e=>{this.closeCommitmentsModal(),this.fetchCommitments()}).catch(e=>{console.log(e)}).finally(()=>{this.saving=!1})}filterCommitments(t){this.filterStatus=t,this.fetchCommitments(t),ZumeStorage.save(this.filterName,t),this.closeFilter()}closeFilter(){const t=this.querySelector("#filter-menu");jQuery(t).foundation("close")}closeMenu(t){const e=this.querySelector(`#kebab-menu-${t}`);jQuery(e).foundation("close")}open3MonthPlan(){this.dispatchEvent(new CustomEvent("open-3-month-plan",{bubbles:!0}))}renderListItem(t){const{note:e,question:s,answer:n,id:a,status:r,category:o}=t;return l`
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
                            <button class="icon-btn f-2" data-toggle="filter-menu" ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser?"true":"false"}>
                                <span class="visually-hidden">${jsObject.translations.filter}</span>
                                <span class="icon z-icon-filter" aria-hidden="true"></span>
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
                                    ${!this.loading&&this.commitments&&this.commitments.length>0?U(this.commitments,t=>t.id,this.renderListItem):""}
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
        `}createRenderRoot(){return this}}customElements.define("dash-plans",hl);class ul extends Ye{constructor(){super("practicing")}createRenderRoot(){return this}}customElements.define("dash-practicing",ul);class pl extends vt{static get properties(){return{loading:{type:Boolean,attribute:!1},filteredItems:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1},hostProgress:{type:Object,attribute:!1},errorMessage:{type:String,attribute:!1},openStates:{type:Object,attribute:!1}}}constructor(){super(),this.loading=!1,this.route=S.getRoute("my-progress"),this.trainingItems=Object.values(jsObject.training_items),this.hostProgress=jsObject.host_progress,this.errorMessage="",this.filterName="my-progress-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.filteredItems=this.filterItems(this.filterStatus),this.openStates={},this.trainingItems.forEach(t=>{this.openStates[t.key]=!1}),this.renderListItem=this.renderListItem.bind(this),this.closeInfoModal=this.closeInfoModal.bind(this),document.querySelectorAll(".reveal-overlay #progress-modal").forEach(t=>{t.parentElement.remove()})}disconnectedCallback(){super.disconnectedCallback(),Lt(this.tagName)}firstUpdated(){super.firstUpdated(),at(this.renderRoot,this.tagName)}updated(){jQuery(this.renderRoot).foundation(),at(this.renderRoot,this.tagName)}openInfoModal(){const t=document.querySelector("#progress-modal");jQuery(t).foundation("open")}closeInfoModal(){const t=document.querySelector("#progress-modal");jQuery(t).foundation("close")}filterProgress(t){this.filterStatus=t,this.filteredItems=this.filterItems(t),ZumeStorage.save(this.filterName,t),this.closeFilter()}filterItems(t){switch(t){case"heard":return this.trainingItems.filter(e=>{const s=e.host[0].key;return!!(this.hostProgress.list[s]||!1)});case"not-heard":return this.trainingItems.filter(e=>{const s=e.host[0].key;return!(this.hostProgress.list[s]||!1)});default:return[...this.trainingItems]}}closeFilter(){const t=this.querySelector("#filter-menu");jQuery(t).foundation("close")}toggleHost(t){const{host:e,additionalHostToCredit:s}=t.detail;t.stopImmediatePropagation();const{type:n,subtype:a,key:r}=e,o=this.hostProgress.list[r];if(o===!1)return this.changeHost(r,!0),s.forEach(({key:c})=>this.changeHost(c,!0)),_.post("host",{type:n,subtype:a,user_id:jsObject.profile.user_id}).then(c=>{}).catch(c=>{this.changeHost(r,!1),s.forEach(({key:d})=>this.changeHost(d,!1)),this.displayError(jsObject.translations.error_with_request)});if(o===!0)return this.changeHost(r,!1),_.delete("host",{type:n,subtype:a,user_id:jsObject.profile.user_id}).catch(c=>{this.changeHost(r,!1),this.displayError(jsObject.translations.error_with_request)})}displayError(t){this.errorMessage=t,setTimeout(()=>{this.errorMessage=""},4e3)}changeHost(t,e){const s={...this.hostProgress};s.list={...this.hostProgress.list},s.list[t]=e,this.hostProgress={...s}}toggleDetails(t){this.openStates[t]===!1?this.openStates={...this.openStates,[t]:!0}:this.openStates={...this.openStates,[t]:!1}}renderListItem(t){const{title:e,description:s,host:n,slug:a,key:r}=t;let o=[jsObject.site_url,jsObject.language,a].join("/");return jsObject.language==="en"&&(o=[jsObject.site_url,a].join("/")),l`
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
                                    <a class="btn" href=${o} @click=${c=>c.stopImmediatePropagation()}>${jsObject.translations.view}</a>
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
                            <button class="icon-btn f-2" data-toggle="filter-menu">
                                <span class="visually-hidden">${jsObject.translations.filter}</span>
                                <span class="icon z-icon-filter brand-light" aria-hidden="true"></span>
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
                                ${U(this.filteredItems,a=>a.key,this.renderListItem)}
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
        `}createRenderRoot(){return this}}customElements.define("dash-progress",pl);class ml extends Ye{constructor(){super(v.training)}createRenderRoot(){return this}}customElements.define("dash-training",ml);class fl extends vt{static get properties(){return{showTeaser:{type:Boolean},code:{type:String},loading:{type:Boolean,attribute:!1},error:{type:String,attribute:!1},training:{type:Object,attribute:!1},sessions:{type:Array,attribute:!1},sessionToEdit:{type:Object,attribute:!1},groupMemberToView:{type:Object,attribute:!1},openDetailStates:{type:Object,attribute:!1},filterStatus:{type:String,attribute:!1},filteredItems:{type:Array,attribute:!1},isEditingTitle:{type:Boolean,attribute:!1},isSavingTitle:{type:Boolean,attribute:!1},isSavingSession:{type:Boolean,attribute:!1},groupMembersOpen:{type:Boolean,attribute:!1},groupDetailsOpen:{type:Boolean,attribute:!1},groupCommunicationOpen:{type:Boolean,attribute:!1},coachingToolsOpen:{type:Boolean,attribute:!1},copyFeedback:{type:Object,attribute:!1},privacyPolicyOpen:{type:Boolean,attribute:!1},isPrivate:{type:Boolean,attribute:!1},showPublicGroupWarning:{type:Boolean,attribute:!1}}}constructor(){super(),this.showTeaser=!1,this.loading=!1,this.isEditingTitle=!1,this.error="",this.route=S.getRoute(v.myTraining),this.sessionToEdit={},this.groupMemberToView={},this.openDetailStates={},this.filteredItems=[],this.groupMembersOpen=!1,this.groupDetailsOpen=!1,this.groupCommunicationOpen=!1,this.filterName="my-trainings-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.copyFeedback={emails:"",phones:"",code:""},this.privacyPolicyOpen=!1,this.renderListItem=this.renderListItem.bind(this),this.renderMemberItem=this.renderMemberItem.bind(this),this.renderTrainingItem=this.renderTrainingItem.bind(this),this.isPrivate=!1,this.showPublicGroupWarning=!1}connectedCallback(){super.connectedCallback(),this.code!=="teaser"&&this.getTraining(),document.querySelectorAll(".reveal-overlay #edit-session-modal").forEach(t=>{t.parentElement.remove()}),document.querySelectorAll(".reveal-overlay #edit-session-details-modal").forEach(t=>{t.parentElement.remove()})}disconnectedCallback(){Lt(this.tagName),super.disconnectedCallback()}willUpdate(t){t.has("code")&&this.code!=="teaser"&&(Lt(this.tagName),this.openDetailStates={},this.groupCommunicationOpen=!1,this.groupDetailsOpen=!1,this.groupMembersOpen=!1,this.getTraining())}firstUpdated(){super.firstUpdated(),jQuery(this.renderRoot).foundation(),at(this.renderRoot,this.tagName)}updated(){jQuery(this.renderRoot).foundation(),Lt(this.tagName),at(this.renderRoot,this.tagName);const t=jQuery("#filter-menu");t.foundation("_destroy"),new Foundation.Dropdown(t),t.css("display","")}getTraining(){return this.loading=!0,_.get(`plan/${this.code}`,{}).then(t=>{this.training=t,this.error="",this.isPrivate=this.training.visibility.key==="private"}).then(()=>{this.refreshSessions(),this.groupMembers=this.getGroupMembers()}).catch(t=>{console.log(t),this.error=t.message}).finally(()=>{this.loading=!1})}refreshSessions(t){t&&(this.training.completed_sessions=t),this.sessions=this.getSessions(),this.currentSession=this.getCurrentSession(),this.filteredItems=this.filterItems(this.filterStatus,this.sessions)}getSessions(){const t=this.getTrainingType(),e=this.getNumberOfSessions(),s=[];for(let n=1;n<e+1;n++){const a=n<10?`0${n}`:`${n}`,r=t+"_"+a,o=this.training[r];s.push({id:r,name:jsObject.translations.session_x.replace("%d",n),datetime:o?Number(o.timestamp)*1e3:0,completed:this.training.completed_sessions.includes(r)})}return s}getHighlightedDays(){return this.sessions?this.sessions.reduce((t,e)=>{if(e.datetime===0)return t;const s=f.fromMillis(e.datetime).toISODate();return t.includes(s)?t:[...t,s]},[]):[]}getGroupMembers(){if(!this.training.participants||!Array.isArray(this.training.participants))return[];const t=[];return this.training.participants.forEach(e=>{t.push({id:e.ID,name:e.post_title})}),t}getTrainingType(){return this.training.set_type.key}getSessionNumber(t){const e=this.getTrainingType()+"_";return t.slice(e.length)}getSessionUrl(t){const e=this.getTrainingType(),s=this.getSessionNumber(t);let n="";e==="set_a"&&(n=jsObject.urls.launch_ten_session_course),e==="set_b"&&(n=jsObject.urls.launch_twenty_session_course),e==="set_c"&&(n=jsObject.urls.launch_intensive_session_course);const a=new URL(n);return a.searchParams.set("session",s),a.href}getNumberOfSessions(){switch(this.getTrainingType()){case"set_a":return 10;case"set_b":return 20;case"set_c":return 5}}getSlideKey(t){const e=t.split("_");if(e.length!==3)return"";switch(e[1]){case"a":return`s1_${Number(e[2])}_1`;case"b":return`s2_${Number(e[2])}_1`;case"c":return`s3_${Number(e[2])}_1`}}getCurrentSession(){for(let t=0;t<this.sessions.length;t++){const e=this.sessions[t];if(!e.completed)return e.id}return""}createTraining(){this.dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:y.planDecision}}))}inviteFriends(){this.dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:y.inviteFriends,params:{joinKey:this.code}}}))}openProfileModal(){this.dispatchEvent(new CustomEvent("open-profile",{bubbles:!0}))}startSession(t,e){e.stopImmediatePropagation();const s=this.getSessionUrl(t);location.href=s}editSession(t,e){this.stopImmediatePropagation(e),this.closeKebabMenu(t);const s=this.sessions.find(n=>n.id===t);if(s.datetime!==0){const n=f.fromMillis(s.datetime);s.date=n.toISODate()}this.sessionToEdit=s,this.openEditSessionModal()}selectDay(t){const{date:e}=t.detail,s={...this.sessionToEdit,date:e};this.sessionToEdit=s}saveSession(t){if(this.isSavingSession)return;this.isSavingSession=!0;const{date:e}=this.sessionToEdit,s=f.fromFormat(`${e}`,"y-LL-dd");_.post("plan/edit-session",{key:this.training.join_key,session_id:this.sessionToEdit.id,session_time:s.toSeconds()}).then(n=>{this.training={...this.training,[this.sessionToEdit.id]:{timestamp:s.toSeconds(),formatted:s.toISODate()}},this.refreshSessions(),this.closeEditSessionModal()}).finally(()=>{this.isSavingSession=!1})}cancelEditingSession(){this.sessionToEdit={},this.closeEditSessionModal()}openEditSessionModal(){const t=document.querySelector("#edit-session-modal");jQuery(t).foundation("open")}closeEditSessionModal(){const t=document.querySelector("#edit-session-modal");jQuery(t).foundation("close")}editSessionDetails(t){console.log(this.training),t.stopImmediatePropagation(),document.querySelector("#location-note").value=this.training.location_note||"";const e=document.querySelector("#time-of-day-note");e&&(e.value=this.training.time_of_day_note||"");const s=document.querySelector("#time-of-day");s&&(s.value=this.training.time_of_day||""),this.isCoach()&&(document.querySelector("#language-note").value=this.training.language_note||"",document.querySelector("#timezone").value=this.training.timezone||"",document.querySelector("#timezone-note").value=this.training.timezone_note||"",document.querySelector("#zoom-link-note").value=this.training.zoom_link_note||"",this.isPublic()?document.querySelector('#edit-session-details-modal #public[type="radio"]').checked=!0:document.querySelector('#edit-session-details-modal #private[type="radio"]').checked=!0,this.isActive()?document.querySelector('#edit-session-details-modal #active[type="radio"]').checked=!0:document.querySelector('#edit-session-details-modal #inactive[type="radio"]').checked=!0),this.openEditSessionDetailsModal()}openEditSessionDetailsModal(){const t=document.querySelector("#edit-session-details-modal");jQuery(t).foundation("open")}closeEditSessionDetailsModal(){const t=document.querySelector("#edit-session-details-modal");jQuery(t).foundation("close")}saveSessionDetails(){const t=document.querySelector("#location-note").value,e=document.querySelector("#zoom-link-note").value,s=document.querySelector("#edit-session-details-modal #active").checked?"active":"inactive",n={location_note:t,zoom_link_note:e,status:s};let a,r,o,c,d,u;if(this.isCoach()?(a=document.querySelector("#language-note").value,r=document.querySelector("#timezone").value,o=document.querySelector("#timezone-note").value,d=document.querySelector("#time-of-day").value,c=document.querySelector("#edit-session-details-modal #public").checked?"public":"private",n.language_note=a,n.timezone=r,n.timezone_note=o,n.time_of_day=d,n.visibility=c):(u=document.querySelector("#time-of-day-note").value,n.time_of_day_note=u),!this.isSavingSession){if(this.showPublicGroupWarning===!1&&this.training.visibility.key==="private"&&n.visibility==="public"){this.showPublicGroupWarning=!0;return}this.isSavingSession=!0,_.put(`plan/${this.training.join_key}`,n).then(p=>{const m={...this.training};m.location_note=t,m.time_of_day_note=u,m.time_of_day=d,m.zoom_link_note=e,m.status={key:s},this.isCoach()&&(m.language_note=a,m.timezone=r,m.timezone_note=o,m.visibility={key:c}),this.training=m}).finally(()=>{this.isSavingSession=!1,this.showPublicGroupWarning=!1,this.closeEditSessionDetailsModal(),this.dispatchEvent(new CustomEvent("training:changed",{bubbles:!0})),c==="private"&&(this.groupCommunicationOpen=!1)})}}viewGroupMember(t){this.groupMemberToView=this.training.participants.find(e=>e.ID===t),this.openGroupMembersModal()}openGroupMembersModal(){const t=document.querySelector("#group-members-modal");jQuery(t).foundation("open"),at(t,"privacy-policy")}closeGroupMembersModal(){const t=document.querySelector("#group-members-modal");jQuery(t).foundation("close")}openPrivacyPolicyModal(){const t=document.querySelector("#privacy-policy-modal");jQuery(t).foundation("open")}closePrivacyPolicyModal(){const t=document.querySelector("#privacy-policy-modal");jQuery(t).foundation("close")}editTitle(){this.isEditingTitle=!0}cancelEditingTitle(){this.isEditingTitle=!1}inputSaveTitle(t){t.code==="Enter"&&this.saveTitle()}saveTitle(){if(this.isSavingTitle)return;this.isSavingTitle=!0;const t=document.querySelector("#training-title-input").value;_.put(`plan/${this.training.join_key}`,{title:t}).then(e=>{this.training.title=t,this.dispatchEvent(new CustomEvent("training:changed",{bubbles:!0}))}).finally(()=>{this.isEditingTitle=!1,this.isSavingTitle=!1})}markSessionCompleted(t,e){this.stopImmediatePropagation(e),this.closeKebabMenu(t),_.post("plan/complete-session",{key:this.training.join_key,session_id:t}).then(s=>{this.refreshSessions(s)})}markSessionUncompleted(t,e){this.stopImmediatePropagation(e),this.closeKebabMenu(t),_.post("plan/complete-session",{key:this.training.join_key,session_id:t,completed:"false"}).then(s=>{this.refreshSessions(s)})}sendEmailToSubscribers(){this.isCoach()&&_.post("send_email_to_subscribers",{join_key:this.training.join_key}).then(t=>{this.training.has_emailed_notification=!0,this.training.last_emailed_notification=t.timestamp,this.update()})}isGroupLeader(){return!!(this.training&&this.training.assigned_to&&Number(this.training.assigned_to.id)===jsObject.profile.user_id)}isCoach(){return jsObject.is_coach}canEditTitle(){return jsObject.training_groups&&Object.keys(jsObject.training_groups).length>1}isPublic(){return this.training.visibility.key==="public"}isActive(){return this.training.status.key==="active"}toggleDetails(t){this.openDetailStates[t]?this.openDetailStates={...this.openDetailStates,[t]:!1}:this.openDetailStates={...this.openDetailStates,[t]:!0}}closeKebabMenu(t){jQuery(`#kebab-menu-${t}`).foundation("close")}toggleKebabMenu(t){t.stopImmediatePropagation();const e=t.currentTarget.dataset.toggle;jQuery(`#${e}`).foundation("toggle")}stopImmediatePropagation(t){t.stopImmediatePropagation()}filterSessions(t){this.filterStatus=t,this.filteredItems=this.filterItems(t,this.sessions),ZumeStorage.save(this.filterName,t),this.closeFilter()}filterItems(t,e){if(!this.sessions)return[];switch(t){case"completed":return e.filter(s=>s.completed);case"uncompleted":return e.filter(s=>!s.completed);default:return[...e]}}closeFilter(){const t=this.querySelector("#filter-menu");jQuery(t).foundation("close")}toggleGroupMembers(){this.groupMembersOpen=!this.groupMembersOpen}toggleGroupDetails(){this.groupDetailsOpen=!this.groupDetailsOpen}toggleGroupCommunication(){this.groupCommunicationOpen=!this.groupCommunicationOpen}toggleCoachingTools(){this.coachingToolsOpen=!this.coachingToolsOpen}togglePrivacyPolicy(){this.privacyPolicyOpen=!this.privacyPolicyOpen}makeTrainingItemHref(t,e){return this.getSessionUrl(e)+"&slide="+t.slide_key}makeGroupMembersHref(){const t={fields:[{connected_plans:[this.training.join_key]}]},e=Ws(t),s=[{field:"connected_plans",id:this.training.join_key,name:`Connected Plans: ${this.training.join_key}`}],n=Ws(s),a=new URL(jsObject.urls.coaching_contact_list);return a.searchParams.set("query",e),a.searchParams.set("labels",n),a.searchParams.set("filter_name","Custom Filter"),a.href}copyGroupEmails(){const t=this.training.participants.map(e=>e.email);navigator.clipboard.writeText(t.join(", ")),this.copyFeedback={...this.copyFeedback,emails:jsObject.translations.copy_info_feedback},setTimeout(()=>{this.copyFeedback={...this.copyFeedback,emails:""}},2e3)}copyGroupPhones(){const t=this.training.participants.map(e=>e.phone);navigator.clipboard.writeText(t.join(", ")),this.copyFeedback={...this.copyFeedback,phones:jsObject.translations.copy_info_feedback},setTimeout(()=>{this.copyFeedback={...this.copyFeedback,phones:""}},2e3)}copyCode(){navigator.clipboard.writeText(this.training.join_key),this.copyFeedback={...this.copyFeedback,code:jsObject.translations.copy_info_feedback},setTimeout(()=>{this.copyFeedback={...this.copyFeedback,code:""}},2e3)}renderListItem(t){var e,s;const{id:n,name:a,datetime:r,completed:o}=t,c=this.getNumberOfSessions(),d=this.getSlideKey(n),u=(e=(s=zumeTrainingPieces[c][d])===null||s===void 0?void 0:s.pieces)!==null&&e!==void 0?e:[],p={month:"short",day:"numeric"};return f.fromMillis(r).year!==f.now().year&&(p.year="2-digit"),l`
            <li class="list__item" data-no-flex>
                <div class="switcher | switcher-width-20 gapy0">
                    <div class="list__primary">
                        ${this.currentSession===n?l`
                                  <button
                                      class="icon-btn"
                                      @click=${m=>this.startSession(n,m)}
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
                                >${r>0?f.fromMillis(r).toLocaleString(p):jsObject.translations.not_scheduled}</span
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
                        ${u.map(m=>l`
                                <li>
                                    <a
                                        href=${this.makeTrainingItemHref(m,n)}
                                        @click=${this.stopImmediatePropagation}
                                    >
                                        ${m.title}
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
                                          @click=${m=>this.editSession(n,m)}
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
                                          @click=${m=>this.markSessionUncompleted(n,m)}
                                      >
                                          <span
                                              class="icon z-icon-pencil"
                                          ></span
                                          >${jsObject.translations.mark_uncompleted}
                                      </button>
                                      `:l`<button
                                          class="menu-btn"
                                          @click=${m=>this.markSessionCompleted(n,m)}
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
                                @click=${m=>this.startSession(n,m)}
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
            <button class="icon-btn f-2" data-toggle="filter-menu">
                <span class="visually-hidden"
                    >${jsObject.translations.filter}</span
                >
                <span
                    class="icon z-icon-filter brand-light"
                    aria-hidden="true"
                ></span>
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
                                  ${!this.loading&&this.sessions&&this.sessions.length>0?U(this.filteredItems,a=>a.id,this.renderListItem):""}
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
                                      class="zume-collapse | mt-0"
                                      ?data-expand=${this.groupMembersOpen}
                                  >
                                      ${!this.loading&&this.groupMembers&&this.groupMembers.length>0?l`
                                                <ol class="ps-1">
                                                    ${U(this.groupMembers,a=>a.id,this.renderMemberItem)}
                                                </ol>
                                            `:""}
                                      <button
                                          @click=${this.openPrivacyPolicyModal}
                                          class="link f--1 center"
                                      >
                                          ${jsObject.wizard_translations.join_training.privacy_policy}
                                      </button>
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
                                              ${navigator.clipboard?l`
                                                      <div class="position-relative">
                                                          <button class="btn small" @click=${this.copyCode}>${jsObject.translations.copy_code}</button>
                                                          <p role="alert" aria-live="polite" id="copyFeedback" class="context-alert" data-state=${this.copyFeedback.code.length?"":"empty"}>${this.copyFeedback.code}</p>
                                                      </div>
                                                  `:""}
                                          ${this.isCoach()?l`
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
                    <button class="btn brand tight" @click=${this.openProfileModal}>
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
                      ${this.groupMemberToView.user_id===jsObject.profile.user_id?l`
                        <button class="icon-btn brand-light" @click=${this.openProfileModal}>
                          <span class="icon z-icon-pencil"></span>
                        </button>
                      `:""}
                    </div>
                    <div>
                        <h3 class="brand-light">${jsObject.translations.contact_info}</h3>
                        ${this.groupMemberToView.hide_public_contact?l`
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
                      ${this.groupMemberToView.hide_public_progress?l`
                        <p class="gray-700">${jsObject.translations.progress_hidden}</p>
                      `:""}
                      ${this.groupMemberToView.progress?l`
                        <ul>
                            ${U(Object.values(jsObject.training_items),a=>a.key,this.renderTrainingItem)}
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
                <div class="stack">
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
                                    >${jsObject.translations.time}</label
                                >
                                <input
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
                                    >${jsObject.translations.timezone}</label
                                >
                                <select
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
                        <button class="btn outline tight center" @click=${this.saveSessionDetails}>
                          ${jsObject.translations.confirm}
                        </button>
                      </div>
                    `:""}
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
                            @click=${this.saveSessionDetails}
                            ?disabled=${this.isSavingSession||this.showPublicGroupWarning}
                            aria-disabled=${this.isSavingSession||this.showPublicGroupWarning?"true":"false"}
                        >
                            ${jsObject.translations.save}
                            <span
                                class="loading-spinner ${this.isSavingSession?"active":""}"
                            ></span>
                        </button>
                    </div>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-trainings",fl);class gl extends k{static get properties(){return{activeTrainingGroups:{type:Object,attribute:!1},inactiveTrainingGroups:{type:Object,attribute:!1}}}constructor(){super(),this.activeTrainingGroups=jsObject.active_training_groups,this.inactiveTrainingGroups=jsObject.inactive_training_groups,this.routeName=v.myTrainings,this.route=S.getRoute(this.routeName)}makeTrainingHref(t){return S.routes.find(({name:n})=>n===v.myTraining).pattern.replace(":code",t)}createTraining(){this.dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:y.planDecision}}))}render(){return l`
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
                        ${U(this.activeTrainingGroups,({key:t})=>t,t=>l`
                                <training-link
                                    as="nav"
                                    text=${t.title}
                                    href=${this.makeTrainingHref(t.join_key)}
                                ></training-link>
                            `)}
                        <h2 class="h4">${jsObject.translations.inactive}</h2>
                        ${U(this.inactiveTrainingGroups,({key:t})=>t,t=>l`
                                <training-link
                                    as="nav"
                                    text=${t.title}
                                    href=${this.makeTrainingHref(t.join_key)}
                                ></training-link>
                            `)}
                    </div>
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-trainings-list",gl);class bl extends k{firstUpdated(){const t=this.offsetTop;this.style.top=t+"px"}render(){return l`
            <div class="dashboard__header right">
                <dash-sidebar-toggle displayOn="medium"></dash-sidebar-toggle>
                <launch-course></launch-course>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-header-right",bl);class vl extends k{static get properties(){return{displayOn:{type:String}}}constructor(){super(),this.displayOn="large"}toggleSidebar(){const t=new CustomEvent("toggle-dashboard-sidebar",{bubbles:!0});this.dispatchEvent(t)}render(){return l`
            <button class="btn f-0 tight dashboard__sidebar-toggle break-${this.displayOn}" @click=${this.toggleSidebar}>${jsObject.translations.menu}</button>
        `}createRenderRoot(){return this}}customElements.define("dash-sidebar-toggle",vl);class Je extends qs(k){static get properties(){return{href:{type:String},class:{type:String},as:{type:String},locked:{type:Boolean},completed:{type:Boolean},disableNavigate:{type:Boolean},active:{type:Boolean},icon:{type:String},text:{type:String},explanation:{type:String},noRenderText:{type:Boolean}}}constructor(){super(),this.href="",this.class="",this.as="",this.icon="",this.text="",this.explanation="",this.locked=!1,this.completed=!1,this.disableNavigate=!1,this.active=!1}handleClick(t){this.as==="nav"&&(t.preventDefault(),this.navigate(this.href)),this.as!=="link"&&this.as==="button"&&t.preventDefault()}printBool(t){return t?"true":"false"}render(){return l`
            <a
                href=${this.href}
                class=${this.class}
                @click=${this.handleClick}
                aria-disabled=${this.completed}
                ?data-completed=${this.completed}
                ?data-locked=${this.locked}
                ?data-active=${this.active}
            >
                <span class="icon ${this.icon} brand-light"></span>
                <span>${this.text}</span>
            </a>
        `}createRenderRoot(){return this}}customElements.define("nav-link",Je);class yl extends Je{constructor(){super(),this.isRtl=document.querySelector("html").getAttribute("dir")==="rtl"}renderText(){return console.log("renderText",this.noRenderText),this.noRenderText?this.text:this.text.split(" ").map(t=>l` <span>${t}</span> `)}getIcon(){return this.locked?this.icon+"-locked":this.icon}render(){return l`
            <a
                href=${this.href}
                class="card-btn grid-link position-relative"
                role="button"
                style=${this.icon?"":"justify-content: center;"}
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
        `}}customElements.define("grid-link",yl);class $l extends Je{constructor(){super()}renderText(){return this.text.split(" ").map(t=>l`
            <span>${t}</span>
        `)}getIcon(){return this.locked?this.icon+"-locked":this.icon}render(){return l`
            <div
                class="dash-menu__list-item"
                ?data-locked=${this.locked}
                ?data-completed=${this.completed}
                ?data-button=${this.disableNavigate}
                role="button"
                @click=${this.handleClick}
            >
                <div class="dash-menu__icon-area | stack--5">
                    <span class="icon ${this.getIcon()} dash-menu__list-icon"></span>
                </div>
                <div class="dash-menu__text-area | switcher | switcher-width-20">
                    <div>
                        <h3 class="f-1 bold uppercase">${this.text}</h3>
                        <p>${this.explanation}</p>
                    </div>
                    ${this.completed?l`
                            <div class="grow-0"><span class="icon z-icon-check-mark grow-0 | dash-menu__list-success"></span></div>
                        `:""}
                </div>
            </div>
        `}}customElements.define("list-link",$l);class wl extends k{static get properties(){return{translations:{type:Object},urls:{type:Object},position:{type:String},asLink:{type:Boolean}}}constructor(){super(),this.translations={},this.urls={},typeof jsObject<"u"&&(this.translations=jsObject.translations,this.urls=jsObject.urls),this.position="bottom";const e=document.querySelector("html").dataset.dir;this.isRtl=e==="rtl"}updated(){jQuery(this.renderRoot).foundation()}render(){return l`
            <button class="${this.asLink?"btn dark tight nav__button":" btn  tight"}" data-toggle="launch-course-panel">
                ${this.translations.launch_course}
            </button>
            <div
                class="dropdown-pane"
                id="launch-course-panel"
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
        `}createRenderRoot(){return this}}customElements.define("launch-course",wl);class _l extends k{constructor(){super();E(this,"addressCallback",e=>{e.features.length<1?this.locations=-1:this.locations=e.features});E(this,"processLocation",debounce(getAddressSuggestions(this.addressCallback,jsObject.map_key)));this.userProfile={},this.locations=[],this.infosOpen=[]}static get properties(){return{userProfile:{type:Object},loading:{type:Boolean,attribute:!1},locations:{type:Array,attribute:!1},infosOpen:{type:Array,attribute:!1}}}firstUpdated(){this.nameInput=this.renderRoot.querySelector("#full_name"),this.phoneInput=this.renderRoot.querySelector("#phone"),this.emailInput=this.renderRoot.querySelector("#email"),this.preferredEmailInput=this.renderRoot.querySelector("#communications_email"),this.cityInput=this.renderRoot.querySelector("#city"),this.prefferedLanguageInput=this.renderRoot.querySelector("#preferred_language"),this.addressResultsContainer=this.renderRoot.querySelector("#address_results"),this.notifyOfFutureTrainingsInput=this.renderRoot.querySelector("#notify_of_future_trainings"),this.hidePublicContactInput=this.renderRoot.querySelector("#hide_public_contact"),this.hidePublicProgressInput=this.renderRoot.querySelector("#hide_public_progress"),at(this.renderRoot,"profile-form")}submitProfileForm(e){e.preventDefault();const s=this.nameInput.value,n=this.emailInput.value,a=this.preferredEmailInput.value,r=this.phoneInput.value,o=this.prefferedLanguageInput.value,c=this.hidePublicContactInput.checked?"1":"0",d={name:s,phone:r,email:n,communications_email:a,preferred_language:o,hide_public_contact:c};d.location_grid_meta=getLocationGridFromMapbox(this.mapboxSelectedId,this.userProfile.location),this.loading=!0,fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(d),headers:{"X-WP-Nonce":jsObject.nonce}}).then(u=>u.json()).then(u=>{this.fireEvents(u)}).catch(u=>{console.error(u)}).finally(()=>{this.loading=!1})}submitEmailPreferences(e){e.preventDefault();const s={notify_of_future_trainings:this.notifyOfFutureTrainingsInput.checked};this.loading=!0,fetch(jsObject.rest_endpoint+"/email-preferences",{method:"POST",body:JSON.stringify(s),headers:{"X-WP-Nonce":jsObject.nonce}}).then(n=>n.json()).then(n=>{this.fireEvents({...this.userProfile,notify_of_future_trainings:n.notify_of_future_trainings})}).catch(n=>{console.error(n)}).finally(()=>{this.loading=!1})}submitPreferences(e){e.preventDefault();const s={hide_public_contact:this.hidePublicContactInput.checked,hide_public_progress:this.hidePublicProgressInput.checked};this.loading=!0,fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(s),headers:{"X-WP-Nonce":jsObject.nonce}}).then(n=>n.json()).then(n=>{this.fireEvents(n)}).catch(n=>{console.error(n)}).finally(()=>{this.loading=!1})}fireEvents(e){const s=new CustomEvent("user-profile:change",{bubbles:!0,detail:e});this.dispatchEvent(s);const n=new CustomEvent("user-state:change",{bubbles:!0});this.dispatchEvent(n)}selectAddress(e){const s=e.target.id,n=e.target.dataset.placeName;this.cityInput.value=n,this.mapboxSelectedId=s,this.locations=[]}_toggleInfo(e){if(this.infosOpen.includes(e)){const s=[...this.infosOpen];s.splice(s.indexOf(e),1),this.infosOpen=s}else this.infosOpen=[...this.infosOpen,e]}isSSOUser(){return this.userProfile.sso_identities!==""}render(){var e,s;return l`
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
                        <input
                          class="input"
                          type="tel"
                          id="phone"
                          name="phone"
                          value=${this.userProfile.phone}
                        >
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


        `}createRenderRoot(){return this}}customElements.define("profile-form",_l);class kl extends Je{constructor(){super()}render(){return l`
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
        `}}customElements.define("training-link",kl);class Sl extends k{static get properties(){return{error:{type:Boolean,attribute:!1},sessionNumber:{type:Number,attribute:!1},hostProgress:{type:Object,attribute:!1},errorMessage:{type:String,attribute:!1},showHelp:{type:Boolean,attribute:!1}}}constructor(){super(),this.error=!1,this.showHelp=!0,this.numberOfSessions=this.getNumberOfSessions(),this.sessionNumber=this.getSessionNumber(),this.hostProgress=jsObject.host_progress,this.trainingItems=Object.values(jsObject.training_items),this.errorMessage="",this.renderListItem=this.renderListItem.bind(this),this.scrollToLastItem=this.scrollToLastItem.bind(this)}firstUpdated(){jQuery(this.renderRoot).foundation(),this.scrollToLastItem(),this.error||(this.showCelebrationModal(),setTimeout(()=>{this.closeCelebrationModal()},1400));const t=document.querySelector("#celebration-modal");jQuery(t).on("closed.zf.reveal",this.scrollToLastItem)}openModal(t){const e=document.querySelector(t);jQuery(e).foundation("open")}closeModal(t){const e=document.querySelector(t);jQuery(e).foundation("close")}showCelebrationModal(){this.openModal("#celebration-modal")}closeCelebrationModal(){this.closeModal("#celebration-modal")}scrollToLastItem(){const t=this.getSessionNumber();if(t===1)return;const e=t-1,s=jsObject.session_items[e],n=document.querySelector(`#key-${s[0]}`);console.log(n,n.offsetTop),window.scrollTo({top:n.offsetTop}),location.hash=e}closeHelp(){this.showHelp=!1}openInfo(){this.openModal("#info-modal")}closeInfo(){this.closeModal("#info-modal")}getSessionKey(){var t;const s=new URL(location.href).searchParams.get("code");return(t=jsObject.session_keys[s])!==null&&t!==void 0?t:""}getNumberOfSessions(){const t=this.getSessionKey();if(!t)return this.error=!0,0;const e=t.split("_");return e[1]==="a"?10:e[1]==="b"?20:e[1]==="c"?5:(this.error=!0,0)}getSessionNumber(){const t=this.getSessionKey();if(!t)return 0;const e=t.split("_"),s=Number(e[2]);return Number.isNaN(s)?0:s}toggleHost(t){const{host:e,additionalHostToCredit:s}=t.detail;t.stopImmediatePropagation();const{type:n,subtype:a,key:r}=e,o=this.hostProgress.list[r];if(o===!1)return this.changeHost(r,!0),s.forEach(({key:c})=>this.changeHost(c,!0)),zumeRequest.post("host",{type:n,subtype:a,user_id:jsObject.profile.user_id}).then(c=>{}).catch(c=>{this.changeHost(r,!1),s.forEach(({key:d})=>this.changeHost(d,!1)),this.displayError(jsObject.translations.error_with_request)});if(o===!0)return this.changeHost(r,!1),zumeRequest.delete("host",{type:n,subtype:a,user_id:jsObject.profile.user_id}).catch(c=>{this.changeHost(r,!0),this.displayError(jsObject.translations.error_with_request)})}displayError(t){this.errorMessage=t,setTimeout(()=>{this.errorMessage=""},4e3)}changeHost(t,e){const s={...this.hostProgress};s.list={...this.hostProgress.list},s.list[t]=e,this.hostProgress={...s}}renderListItem(t){const{title:e,description:s,host:n,slug:a,key:r}=t;return l`
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
                    ${U(this.trainingItems,a=>a.key,this.renderListItem)}
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
        `}createRenderRoot(){return this}}customElements.define("checkin-dashboard",Sl);class jl extends k{static get properties(){return{host:{type:Object},hostProgressList:{type:Object},displayOnly:{type:Boolean}}}toggleHost(t,e=[]){this.dispatchEvent(new CustomEvent("host:toggle",{detail:{host:t,additionalHostToCredit:e}}))}render(){return l`
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
        `}createRenderRoot(){return this}}customElements.define("host-progress-bar",jl);class A extends k{static get properties(){return{slide:{type:Object},showButtons:{type:Boolean},id:{type:String},dir:{type:String},inContainer:{type:Boolean},isScreenshotMode:{type:Boolean,attribute:!1},videoInfo:{type:Object,attribute:!1},showTitleMessage:{type:Boolean,attribute:!1},titleMessage:{type:String,attribute:!1}}}constructor(){super(),this.maxPercentage=80,this.inContainer=!1,this.showButtons=!0,this.dir="ltr",this.isScreenshotMode=!1,this.videoInfo={},this.showTitleMessage=!1,this.titleMessage="",this.resizeCallback=this.resizeCallback.bind(this)}connectedCallback(){super.connectedCallback(),this.dir=document.querySelector("html").dir,window.addEventListener("resize",this.resizeCallback),this.getVideoInfo(),this.checkScreenshotMode()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.resizeCallback)}firstUpdated(){if(this.showTitleMessage&&this.slide)try{this.setTitleMessage()}catch(t){console.warn("Error setting title message:",t),this.titleMessage="Content is not available in this view."}else this.showTitleMessage&&(console.warn("CourseSlide: Cannot set title message - slide data not available"),this.titleMessage="Content is not available in this view.");this.resizeSlide(window),this.fitContentToSlide(".activity-card"),this.fitContentToSlide(".content-area__text")}resizeCallback(t){this.resizeSlide(t.currentTarget)}fitContentToSlide(t){const e=this.renderRoot.querySelector(t),s=this.renderRoot.querySelector(".slides-card");if(!e||!s)return;const n=e.getBoundingClientRect().height,a=e.parentElement.getBoundingClientRect().top,r=s.getBoundingClientRect().top,c=s.getBoundingClientRect().height-(a-r),d=n/c*100;if(d>this.maxPercentage){const p=2*this.maxPercentage/d;e.style.fontSize=`calc( var(--slide-unit) * ${p} )`}}resizeSlide(t){const e=document.querySelectorAll(".slides-card"),s=document.querySelectorAll(".video-slide"),n=[...e,...s],{innerWidth:a,innerHeight:r}=t,o=this.inContainer?a/r>16/10:a/r>16/9;let c,d;o?(c=r,d=r*16/9,this.inContainer&&d>a*90/100+12&&(d=a*90/100+12,c=d*9/16)):(d=a,this.inContainer&&(d=a*90/100+12),c=d*9/16);const u=d/100;n.forEach(p=>{p.style=`
                --slide-unit: ${u}px;
                --slide-height: ${c}px;
                --slide-width: ${d}px;
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
        `,document.head.appendChild(t),console.log("Screenshot mode enabled")}getVideoInfo(){if(this.videoInfo={},zumeTrainingItems)try{Object.keys(zumeTrainingItems).forEach(t=>{const e=zumeTrainingItems[t];e&&e.video_id&&e.title_en&&(this.videoInfo[e.video_id]={title:e.title_en,title_en:e.title_en||e.title})})}catch(t){console.error("Error processing video information:",t)}}setTitleMessage(){let t="Video content is not available in this view.";if(this.slide&&this.slide.alt_video_id&&zumeTrainingItems[this.slide.alt_video_id]){let e=this.slide.alt_video_id;t=zumeTrainingItems[e].title_en}this.titleMessage=t}}customElements.define("course-slide",A);class Ol extends A{static get properties(){return{slide:{type:Object},id:{type:String},offCanvasId:{type:String,attribute:!1},activityUrl:{type:String,attribute:!1},loading:{type:Boolean,attribute:!1}}}connectedCallback(){super.connectedCallback(),this.handleLoad=this.handleLoad.bind(this)}async firstUpdated(){this.loading=!0,jQuery(this.renderRoot).foundation(),this.offCanvasId="activityOffCanvas"+this.id,this.offCanvasSelector="#"+this.offCanvasId,super.firstUpdated(),await this.updateComplete;const t=document.querySelector(this.offCanvasSelector+" iframe");t?t.onload=this.handleLoad:console.error("no iframe to attach onload to"),this.activityUrl=this.slide.right[0]}handleLoad(){this.loading=!1}openMenu(){const t=document.querySelector(this.offCanvasSelector);console.log(t,this.offCanvasSelector),jQuery(t).foundation("open")}closeMenu(){const t=document.querySelector(this.offCanvasSelector);jQuery(t).foundation("close")}closeButtonStyles(){return["t8_c"].includes(this.id)?"":"invert"}render(){return l`
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
        `}}customElements.define("activity-slide",Ol);class Cl extends A{render(){return l`
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
        `}}customElements.define("break-slide",Cl);class xl extends A{render(){var t,e;return l`
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
        `}}customElements.define("center-slide",xl);class El extends A{render(){return l`
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
                            <div class="qr-code">
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
        `}}customElements.define("checkin-slide",El);class Tl extends A{render(){var t;return l`
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
        `}}customElements.define("congratulations-slide",Tl);class Ml extends A{render(){var t;return l`
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
        `}}customElements.define("discuss-slide",Ml);class Il extends A{dispatchOpenMenu(){this.dispatchEvent(new CustomEvent("presenter:open-menu",{bubbles:!0}))}render(){return l`
            <div class="slides-card">
                <div class="cover-page">
                    <div class="center stack | text-center w-50">
                        <div class="w-30"><img src="${this.slide.center[0]}" /></div>
                        <p>${this.slide.center[1]}</p>
                        <div class="w-30"><img src="${this.slide.center[2]}" /></div>
                        <p>${this.slide.center[3]}</p>
                        <a class="btn tight" href="${jsObject.home_url}">${jsObject.translations.home}</a>
                        <button class="btn tight" @click=${this.dispatchOpenMenu}>${jsObject.translations.menu}</button>
                    </div>
                </div>
            </div>
        `}}customElements.define("final-slide",Il);class zl extends A{render(){return l`
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
        `}}customElements.define("left-image-slide",zl);class Dl extends A{render(){return l`
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
        `}}customElements.define("next-steps-slide",Dl);class Pl extends A{render(){return l`
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
        `}}customElements.define("obey-slide",Pl);class Al extends A{render(){return l`
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
        `}}customElements.define("overview-slide",Al);class Ll extends A{render(){return l`
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
        `}}customElements.define("pray-slide",Ll);class Nl extends A{render(){return l`
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
        `}}customElements.define("review-slide",Nl);class Rl extends A{render(){return l`
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
        `}}customElements.define("title-slide",Rl);class Fl extends A{static get properties(){return{slide:{type:Object},showButtons:{type:Boolean},id:{type:String},scriptUrl:{type:String,attribute:!1},altVideoUrl:{type:String,attribute:!1},offCanvasId:{type:String,attribute:!1},loading:{type:Boolean,attribute:!1},showTitleMessage:{type:Boolean},titleMessage:{type:String}}}connectedCallback(){super.connectedCallback(),this.useAltVideo=!window.zumeApiShare.getCookie("zume_video_available"),this.handleLoad=this.handleLoad.bind(this)}async firstUpdated(){jQuery(this.renderRoot).foundation(),this.offCanvasId="informationOffCanvas"+this.id,this.iframeId="iframe"+this.id,this.offCanvasSelector="#"+this.offCanvasId,this.altVideoUrl=jsObject.mirror_url+jsObject.language+"/"+this.slide.alt_video_id+".mp4",this.isScreenshotMode&&this.slide&&(console.log("VideoSlide firstUpdated - setting title message"),this.setTitleMessage()),await this.loadScriptIntoFrame(),super.firstUpdated()}openMenu(){const t=document.querySelector(this.offCanvasSelector);jQuery(t).foundation("open")}closeMenu(){const t=document.querySelector(this.offCanvasSelector);jQuery(t).foundation("close")}async loadScriptIntoFrame(){this.loading=!0;const t=this.slide.script_id,e=jsObject.language,s=new URL(location.href),n=new URL(s.origin);n.pathname=[e,"app","script"].join("/"),n.searchParams.append("s",t),await this.updateComplete;const a=this.getIframe();a?a.onload=this.handleLoad:console.error("no iframe to attach onload to"),this.scriptUrl=n.href}getIframe(){return this.renderRoot.querySelector(`#${this.offCanvasId} iframe`)}handleLoad(){if(this.loading=!1,/iPod|iPhone|iPad/.test(navigator.userAgent)){const e=this.getIframe().parentElement;e.style.height=window.innerHeight+"px"}}shouldAutoplay(){return!this.inContainer}maybeRemoveAutoplay(t){if(this.shouldAutoplay())return t;if(!t)return"";const e=new URL(t);return e.searchParams.delete("autoplay"),e.href}render(){return l`
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
        `}}customElements.define("video-slide",Fl);class Ul extends A{nextSlide(){this.dispatchEvent(new CustomEvent("next-slide",{bubbles:!0}))}render(){var t;return l`
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
        `}}customElements.define("watch-slide",Ul);class ql extends A{render(){return l`
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
        `}}customElements.define("look-back-slide",ql);const Ai=["slideshow","guide"];class Wl extends k{static get properties(){return{languageCode:{type:String},assetsPath:{type:String},zumeSessions:{attribute:!1},menu:{attribute:!1},lessonIndex:{attribute:!1},slideKey:{attribute:!1},view:{attribute:!1},linkNodes:{attribute:!1},showIndex:{attribute:!1}}}constructor(){super(),this.handleSessionLink=this.handleSessionLink.bind(this),this.handleHistoryPopState=this.handleHistoryPopState.bind(this),this.openMenu=this.openMenu.bind(this)}connectedCallback(){super.connectedCallback();const t=new URL(window.location.href),{sessions:e,menu:s}=this.getZumeSessions(t);this.zumeSessions=e,this.menu=s;const n=this.getLessonIndex(t);this.lessonIndex=n,this.slideKey="",this.slideKey=this.getSlideKey(t),this.view=this.getView(t),this.changeSession(n,!1,e),this.dir=document.querySelector("html").dir,window.addEventListener("popstate",this.handleHistoryPopState),window.addEventListener("presenter:open-menu",this.openMenu)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handleHistoryPopState)}firstUpdated(){document.querySelectorAll(".language-selector").forEach(function(e){e.addEventListener("click",()=>{const s=e.dataset.value,n=new URL(location.href),a=n.pathname.substring(1).split("/");let r="";a.length>0&&jsObject.zume_languages.includes(a[0])?r=a.slice(1).join("/"):r=a.join("/"),s!=="en"?r="/"+s+"/"+r:r="/"+r,r+=n.search,location.href=r})})}getView(t){if(t.searchParams.has("view")){const e=t.searchParams.get("view");if(Ai.includes(e))return e}else return"slideshow"}getLessonIndex(t){if(t.searchParams.has("session")){const e=t.searchParams.get("session");if(e==="index")return"index";const s=Number(e);return Number.isInteger(s)?s-1:0}else return 0}getSlideKey(t){return t.searchParams.has("slide")?t.searchParams.get("slide"):""}getZumeSessions(t){const e=t.searchParams.get("type")||"10";this.type=e;let s,n;switch(e){case"10":s=zume10Sessions,n=zume10SessionsMenu;break;case"20":s=zume20Sessions,n=zume20SessionsMenu;break;case"intensive":s=zumeIntensiveSessions,n=zumeIntensiveSessionsMenu;break;default:s=zume10Sessions,n=zume10SessionsMenu;break}return{sessions:s,menu:n}}handleSessionLink(t){const e=t.target,s=Number(e.dataset.sessionNumber);this.lessonIndex=s,this.showIndex===!0&&(this.showIndex=!1),this.changeSession(this.lessonIndex),this.closeMenu()}handleSubSectionLink(t,e){this.lessonIndex=t,this.showIndex===!0&&(this.showIndex=!1),this.changeSession(this.lessonIndex),this.slideKey=e,this.pushHistory(),this.closeMenu()}handleSetSlide(t){const e=t.detail.key;this.slideKey=e,this.pushHistory()}getNextSession(){this.lessonIndex+=1,this.changeSession(this.lessonIndex)}getPreviousSession(){this.lessonIndex-=1,this.changeSession(this.lessonIndex)}changeSession(t,e=!0,s=null){if(t==="index"){this.showIndex=!0;return}else this.showIndex=!1;const n=s||this.zumeSessions;let a=t;t<0&&(a=0),t>n.length-1&&(a=n.length-1),this.lessonIndex=a,this.session=n[a],e&&this.pushHistory()}pushHistory(){const t=this.lessonIndex,e=this.slideKey,s=this.view,n=new URL(window.location.href);t!==null&&Number.isInteger(t)&&n.searchParams.set("session",t+1),e!==""&&n.searchParams.set("slide",e),s&&n.searchParams.set("view",s),window.history.pushState(null,null,n.href)}handleHistoryPopState(){var t;const e=new URL(location.href),s=e.searchParams.has("session")?e.searchParams.get("session"):null,n=e.searchParams.has("slide")?e.searchParams.get("slide"):null,a=e.searchParams.get("view");(t=document.querySelector(".js-off-canvas-overlay"))===null||t===void 0||t.classList.remove("is-visible"),Number.isInteger(Number(s))&&(this.lessonIndex=s-1,this.changeSession(this.lessonIndex,!1)),s==="index"&&(this.lessonIndex="index",this.changeSession("index",!1)),this.slideKey=n,a&&Ai.includes(a)&&(this.view=a)}getSessionSections(){return this.session?this.session:[]}switchViews(t=!0){this.view==="guide"?this.view="slideshow":this.view="guide",t===!0&&this.pushHistory()}openMenu(){const t=this.querySelector("#offCanvas");jQuery(t).foundation("open")}closeMenu(){const t=this.querySelector("#offCanvas");jQuery(t).foundation("close")}render(){this.showIndex;const t=this.type==="intensive"?"container-xsm":"container-sm";return l`
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
                                        @click=${this.handleSessionLink}
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
                            <a class="btn tight" href="${jsObject.home_url}">${jsObject.translations.home}</a>
                            <button class="btn d-flex align-items-center justify-content-center gap--4 tight" data-open="language-menu-reveal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" class="ionicon" viewBox="0 0 512 512"><path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M256 48c-58.07 0-112.67 93.13-112.67 208S197.93 464 256 464s112.67-93.13 112.67-208S314.07 48 256 48z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M117.33 117.33c38.24 27.15 86.38 43.34 138.67 43.34s100.43-16.19 138.67-43.34M394.67 394.67c-38.24-27.15-86.38-43.34-138.67-43.34s-100.43 16.19-138.67 43.34" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M256 48v416M464 256H48"/></svg>
                                ${this.languageCode}
                            </button>
                            <button class="btn tight outline" @click=${()=>this.switchViews()}>
                                ${this.view==="slideshow"?jsObject.translations.list_view:jsObject.translations.slide_view}
                            </button>
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
                            .sections=${this.getSessionSections()}></course-guide>`:l`
                        <course-slideshow
                            .sections=${this.getSessionSections()}
                            slideKey=${this.slideKey}
                            @set-slide=${this.handleSetSlide}
                        ></course-slideshow>`}
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-presenter",Wl);class Vl extends k{static get properties(){return{sections:{type:Array}}}render(){return l`
            <div class="course-guide">
                <div class="stack | py-4 snap-content" data-outline-slides>
                    ${U(this.sections,t=>t.key,t=>l`
                            <div class="slide-switcher">
                                <slide-switcher
                                    .slide=${t}
                                    ?inContainer=${!0}
                                ></slide-switcher>
                            </div>
                        `)}
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-guide",Vl);class Hl extends k{static get properties(){return{sections:{type:Array},slideKey:{type:String},sectionIndex:{attribute:!1},currentSlide:{attribute:!1}}}constructor(){super(),this.reset(),this.sections=[],this.slideKey="",this.listenForKeyboard=this.listenForKeyboard.bind(this),this.listenForMouseClick=this.listenForMouseClick.bind(this);const t=document.querySelector("html").getAttribute("dir");this.isRtl=t==="rtl",this.nextSlide=this.nextSlide.bind(this)}reset(){this.sectionIndex=-1,this.currentSlide=null}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.listenForKeyboard),document.addEventListener("mousedown",this.listenForMouseClick),document.addEventListener("next-slide",this.nextSlide)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.listenForKeyboard),document.removeEventListener("mousedown",this.listenForMouseClick),document.removeEventListener("next-slide",this.nextSlide)}update(t){if(t.has("sections")&&this.reset(),t.has("slideKey")&&this.slideKey!==""){const e=this.sections.findIndex(({key:s})=>s===this.slideKey);this.updateSlide(e)}super.update(t)}nextSlide(){if(this.sectionIndex>=this.sections.length-1){this.sectionIndex=this.sections.length-1;return}this.setSlide(this.sectionIndex+1)}previousSlide(){this.sectionIndex<0&&(this.sectionIndex=0),this.setSlide(this.sectionIndex-1)}leftSlide(){this.isRtl?this.nextSlide():this.previousSlide()}rightSlide(){this.isRtl?this.previousSlide():this.nextSlide()}listenForKeyboard(t){["ArrowRight"].includes(t.code)&&this.rightSlide(),["Space"].includes(t.code)&&this.nextSlide(),["ArrowLeft"].includes(t.code)&&this.leftSlide(),["Backspace"].includes(t.code)&&this.previousSlide()}listenForMouseClick(t){if(t.target.id==="hamburger-menu")return;const e=c=>c.id==="offCanvas"||c.classList.contains("js-off-canvas-overlay")||c.classList.contains("bypass-nav-click");if(this.hasParent(t.target,e))return;const{x:s,type:n,which:a}=t;if(n!=="mousedown"||a!==1)return;const{innerWidth:r}=window,o=(this.isRtl,1/4*r);s<o&&this.leftSlide(),s>r-o&&this.rightSlide()}hasParent(t,e){let s=t;const n=50;let a=0;for(;s;){if(e(s))return!0;if(s=s.parentElement,a=a+1,a>n)return!1}return!1}setSlide(t,e=!0){const s=this.sections[t];e&&s&&this.dispatchEvent(new CustomEvent("set-slide",{detail:{key:s.key}}))}updateSlide(t){if(t===-1)return;this.sectionIndex=t;const e=this.sections[t];this.currentSlide=e}isFirstSlide(){return this.sectionIndex===0}isSecondSlide(){return this.sectionIndex===1}isLastSlide(){return this.sectionIndex===this.sections.length-1}render(){return this.sectionIndex<0&&this.setSlide(0),l`
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
        `}createRenderRoot(){return this}}customElements.define("course-slideshow",Hl);class Bl extends k{static get properties(){return{slide:{type:Object},showControls:{type:Boolean},inContainer:{type:Boolean}}}render(){if(this.slide)switch(this.slide.type){case"title":return l`<title-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></title-slide>`;case"checkin":return l`<checkin-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></checkin-slide>`;case"pray":return l`<pray-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></pray-slide>`;case"review":return l`<review-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></review-slide>`;case"overview":return l`<overview-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></overview-slide>`;case"challenge":case"center":return l`<center-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></center-slide>`;case"watch":return l`<watch-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></watch-slide>`;case"video":return l`<video-slide .slide=${this.slide} id=${this.slide.key} ?showButtons=${this.showControls} ?inContainer=${this.inContainer}></video-slide>`;case"look_back":return l`<look-back-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></look-back-slide>`;case"discuss":return l`<discuss-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></discuss-slide>`;case"left_content":case"activity":return l`<activity-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></activity-slide>`;case"obey":return l`<obey-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></obey-slide>`;case"left_image":return l`<left-image-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></left-image-slide>`;case"next_steps":return l`<next-steps-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></next-steps-slide>`;case"break":return l`<break-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></break-slide>`;case"congratulations":return l`<congratulations-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></congratulations-slide>`;case"final":return l`<final-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></final-slide>`;default:return l`<course-slide .slide=${this.slide} id=${this.slide.key} ?inContainer=${this.inContainer}></course-slide>`}}createRenderRoot(){return this}}customElements.define("slide-switcher",Bl);class Gl extends k{static get properties(){return{questions:{type:Array},translations:{type:Object},contact_id:{type:String},user_id:{type:String},showCancel:{type:Boolean},answers:{type:Array,attribue:!1},error:{type:Boolean,attribute:!1},loading:{type:Boolean,attribute:!1}}}constructor(){super(),this.questions=[],this.answers=[],this.translations=[],this.contact_id="",this.user_id="",this.error=!1,this.loading=!1}handleInputChange(t){const e=t.target.dataset.i;this.answers[e]=t.target.value,this.update()}handleCancel(){this.clearAnswers(),this.dispatchEvent(new CustomEvent("3-month-plan-cancelled",{bubbles:!0}))}handleSave(){this.loading=!0;const t=[];if(this.answers.length===0){this.loading=!1;return}return this.answers.forEach((e,s)=>{if(e){const a=this.questions[s];var n=new Date;n.setDate(n.getDate()+30);const r=_.post("commitment",{question:a,answer:e,date:n,category:"post_training_plan"});t.push(r)}}),Promise.all(t).then(()=>{this.loading=!1,this.clearAnswers(),this.dispatchEvent(new CustomEvent("3-month-plan-saved",{bubbles:!0}))}).catch(e=>{console.error(e),this.error=!0,this.loading=!1})}clearAnswers(){this.renderRoot.querySelectorAll(".post-training-plan").forEach(t=>{t.value=""})}render(){const t=this.loading||this.answers.length===0;return l`
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
        `}createRenderRoot(){return this}}customElements.define("activity-3-month-plan",Gl);class ca extends k{static get properties(){return{size:{type:String,attribute:!1}}}constructor(){super();const t=16;this.minSize=3*t,this.percentage=15/100,this.maxSize=8*this.minSize,this.size=this.maxSize,this.widthObserver=this.widthObserver.bind(this)}firstUpdated(){this.resizeObserver=new ResizeObserver(this.widthObserver),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.disconnect()}widthObserver(t){for(const e of t)e.contentBoxSize&&(this.size=e.contentBoxSize[0].inlineSize*this.percentage,this.size<this.minSize&&(this.size=this.minSize),this.size>this.maxSize&&(this.size=this.maxSize))}render(){return l`
            <div class="container" style="--play-button-size: ${this.size}px">
                <div class="circle">
                    <div class="triangle"></div>
                </div>
            </div>
        `}}E(ca,"styles",Is`
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
    `);window.customElements.define("play-button",ca);class Zl extends k{constructor(){super();E(this,"webShareSupported",!!window.navigator.share);E(this,"clipboardSupported",!!window.navigator.clipboard);this.shareFeedback="",this.copyFeedback=""}static get properties(){return{url:{type:String},title:{type:String},t:{type:Object},alwaysShow:{type:Boolean},shareFeedback:{attribute:!1},copyFeedback:{attribute:!1}}}share(e){e.stopImmediatePropagation(),navigator.share({title:this.title,url:this.url,text:this.title}).then(()=>{this.shareFeedback=this.t.share_feedback,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(s=>console.error("Error sharing",s))}copyLink(e){e.stopImmediatePropagation(),navigator.clipboard.writeText(this.url).then(()=>{this.copyFeedback=this.t.copy_feedback,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(s=>console.error(s))}noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported}render(){return l`
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
        `}createRenderRoot(){return this}}customElements.define("share-links",Zl);class Kl extends k{constructor(){super();E(this,"sortAlphabetically",(e,s)=>e.page_title<s.page_title?-1:1);E(this,"sortByKey",(e,s)=>Number(e.key)<Number(s.key)?-1:1);this.items=[],this.itemsToDisplay=[],this.filterType="all"}static get properties(){return{items:{type:Array},itemsToDisplay:{type:Array,attribute:!1},filterType:{type:String,attribute:!1},isSortedAlphabetically:{type:Boolean,attribute:!1}}}connectedCallback(){super.connectedCallback(),this.itemsToDisplay=[...this.items]}filterItems(e){this.filterType=e,this.itemsToDisplay=this.sortItems(this.items.filter(({type:s})=>e==="all"?!0:s===e))}toggleSorting(){this.isSortedAlphabetically=!this.isSortedAlphabetically,this.itemsToDisplay=this.sortItems(this.itemsToDisplay)}sortItems(e){return e.sort((s,n)=>this.isSortedAlphabetically?this.sortAlphabetically(s,n):this.sortByKey(s,n))}renderListItem({page_url:e,page_title:s,type:n,description:a}){return l`
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
                    <button class="icon-btn f-2" data-toggle="filter-menu">
                        <span class="visually-hidden">${zumeShare.translations.filter}</span>
                        <span class="icon z-icon-filter brand-light" aria-hidden="true"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment="center" data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li>
                            <button
                                class="menu-btn w-100 filter-button ${this.filterType==="all"?"selected":""}"
                                @click=${()=>this.filterItems("all")}
                            >
                                ${zumeShare.translations.all}
                            </button>
                            <button
                                class="menu-btn w-100 filter-button ${this.filterType==="tool"?"selected":""}"
                                @click=${()=>this.filterItems("tool")}
                            >
                                ${zumeShare.translations.tools}
                            </button>
                            <button
                                class="menu-btn w-100 filter-button ${this.filterType==="concept"?"selected":""}"
                                @click=${()=>this.filterItems("concept")}
                            >
                                ${zumeShare.translations.concepts}
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="share-list__wrapper">
                    <ul class="stack  | mt-0">
                        ${U(this.itemsToDisplay,e=>e.key,this.renderListItem)}
                    </ul>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("share-list",Kl);class Ql extends k{static get properties(){return{t:{type:Object},joinLink:{type:String},notifyUrl:{type:String},notifyMeOpen:{type:Boolean,attribute:!1},loading:{attribute:!1},plans:{attribute:!1}}}constructor(){super(),this.loading=!0,this.plans=[],this.notifyUrl="",this.notifyMeOpen=!1,this.getTrainings(),this.renderRow=this.renderRow.bind(this)}updated(t){t.has("loading")&&(Lt(this.renderRoot),at(this.renderRoot,"public-trainings"))}getTrainings(){_.post("public_plans",{}).then(t=>{this.plans=t}).catch(t=>{console.log(t)}).finally(()=>{this.loading=!1})}_handleNotifyMe(){this.notifyMeOpen=!this.notifyMeOpen}render(){return this.loading?l`<span class="loading-spinner active"></span>`:this.plans.length===0?l` <p>${this.t.no_plans}</p> `:l`
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
        `}renderRow({join_key:t,language_note:e,post_title:s,time_of_day_note:n,timezone_note:a,set_type:r,...o}){let c;switch(r.key){case"set_a":c=10;break;case"set_b":c=20;break;case"set_c":c=5;break}const d=r.key+"_",u=Date.now()/1e3;let p="",m;for(let $=1;$<c+1;$++){const j=$<10?`0${$}`:`${$}`,T=o[d+j];if(!T||(p=T.timestamp,m=$,u<T.timestamp))break}if(p==="")return null;const g=f.fromMillis(p*1e3).toFormat("DD");return l`
            <tr>
                <td data-label="${this.t.name}">${s}</td>
                <td data-label="${this.t.session}">
                    ${m} / ${c}
                </td>
                <td data-label="${this.t.next_date}">${g}</td>
                <td data-label="${this.t.start_time}">${n}</td>
                <td data-label="${this.t.timezone}">${a}</td>
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
        `}_handleJoinTraining(t){const e=t.target.dataset.code,s=this.plans.find(a=>a.join_key===e),n=new CustomEvent("chosen-training",{bubbles:!0,detail:{code:e,training:s}});this.dispatchEvent(n)}createRenderRoot(){return this}}customElements.define("public-trainings",Ql);class da extends k{static get properties(){return{radius:{type:Number},lineWidth:{type:Number},percent:{type:Number}}}constructor(){super(),this.radius=100,this.lineWidth=10,this.percent=30}width(){return this.radius*2+this.lineWidth}widthPx(){return this.appendPx(this.width())}center(){return this.width()/2}circumference(){return this.radius*2*Math.PI}circumferencePx(){return this.appendPx(this.circumference())}appendPx(t){return`${t}px`}rotate(t){return`rotate(${t}, ${this.center()}, ${this.center()})`}render(){return l`
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
        `}createRenderRoot(){return this}}customElements.define("progress-circle",da);class Yl extends da{static get properties(){return{percent:{type:Number},type:{type:String}}}constructor(){super(),this.radius=50,this.lineWidth=15,this.percent=0,this.borderWidth=3,this.type="heard"}width(){return(this.radius+this.lineWidth)*2}getIconSvg(){switch(this.type){case"heard":return ve`
                    <path d="M13.204,14.843c.157-3.465,2.622-6.151,6.05-6.593,3.602-.464,7.067,2.224,7.528,5.84.019.151.028.303.051.453.084.543.565.919,1.079.849.531-.073.901-.535.85-1.079-.09-.964-.299-1.902-.71-2.782-1.357-2.904-3.602-4.681-6.783-5.149-4.548-.67-8.841,2.255-9.775,6.729-.695,3.33-.03,6.397,2.327,8.963.781.85,1.668,1.601,2.472,2.43.534.551,1.049,1.131,1.495,1.754.496.692.669,1.505.631,2.364-.121,2.78,2.078,5.075,4.868,5.091,2.087.012,4.017-1.407,4.624-3.399.169-.553-.083-1.062-.614-1.24-.505-.169-1.018.085-1.21.625-.375,1.054-1.082,1.745-2.179,2.001-1.829.426-3.631-1.042-3.551-2.908.071-1.673-.427-3.158-1.526-4.394-.867-.975-1.835-1.861-2.774-2.772-1.174-1.139-2.156-2.394-2.584-4.011-.24-.909-.31-1.835-.271-2.771Z" stroke-width="0"></path>
                    <path d="M22.416,16.825c-1.639.344-2.761,1.916-2.613,3.472.179,1.88,1.39,3.263,3.162,3.601.237.045.486.086.722.059.502-.056.865-.512.837-.996-.029-.509-.412-.882-.953-.927-.921-.078-1.624-.699-1.795-1.587-.226-1.172.702-1.837,1.898-1.848.737-.007,1.224-.331,1.128-1.091-.055-.433-.488-1.081-2.385-.684Z" stroke-width="0"></path>
                `;case"obeyed":return ve`
                    <path d="M21.57,18.138c-.204,1.02-.396,1.984-.589,2.948-.06.299-.116.599-.179.898-.012.057-.047.109-.087.195.117.163.256.361.4.556.397.536.795,1.072,1.194,1.606.743.993,1.239,2.082,1.465,3.316.261,1.422.608,2.829.922,4.241.183.825-.274,1.597-1.058,1.778-.783.18-1.554-.308-1.742-1.125-.279-1.212-.56-2.424-.804-3.643-.204-1.021-.594-1.958-1.176-2.812-.781-1.144-1.585-2.272-2.374-3.411-.254-.367-.481-.753-.74-1.117-.501-.703-.591-1.47-.421-2.296.247-1.201.478-2.406.716-3.609.003-.016.003-.033.006-.074-.05.04-.089.066-.123.097-.598.545-1.197,1.088-1.789,1.639-.062.057-.11.158-.115.242-.087,1.326-.165,2.653-.248,3.979-.041.641-.554,1.087-1.186,1.04-.6-.045-1.035-.574-.995-1.196.09-1.411.176-2.822.261-4.233.03-.498.222-.916.592-1.253,1.221-1.112,2.44-2.226,3.66-3.339.129-.118.246-.252.385-.356.381-.287.817-.384,1.283-.297.717.134,1.431.278,2.145.426.596.124,1.038.46,1.25,1.033.148.401.244.822.346,1.239.243.995.654,1.924,1.094,2.842.143.297.376.491.691.613.959.373,1.91.764,2.864,1.149.068.027.136.055.203.087.583.277.825.859.591,1.42-.224.536-.856.795-1.439.577-.392-.146-.777-.31-1.165-.465-.829-.332-1.655-.671-2.488-.994-.314-.122-.566-.312-.739-.594-.174-.284-.325-.582-.486-.874-.035-.063-.069-.126-.126-.232Z" stroke-width="0"></path>
                    <path d="M15.828,22.191c.259.402.497.772.735,1.142.48.747.962,1.492,1.437,2.242.041.065.066.158.057.233-.038.303-.09.604-.143.904-.098.559-.309,1.069-.618,1.547-.923,1.43-1.831,2.869-2.752,4.3-.552.858-1.767.912-2.364.114-.368-.492-.375-1.17-.015-1.736.694-1.093,1.366-2.201,2.093-3.272.688-1.014,1.054-2.129,1.231-3.324.098-.66.201-1.319.303-1.978.007-.044.018-.087.037-.174Z" stroke-width="0"></path>
                    <path d="M21.246,11.553c-1.455,0-2.629-1.176-2.629-2.635,0-1.455,1.178-2.631,2.634-2.631,1.456,0,2.636,1.174,2.64,2.628.004,1.46-1.176,2.637-2.645,2.638Z" stroke-width="0"></path>
                `;case"shared":return ve`
                    <path d="M12.845,18.138c-.204,1.02-.396,1.984-.589,2.948-.06.299-.116.599-.179.898-.012.057-.047.109-.087.195.117.163.256.361.4.556.397.536.795,1.072,1.194,1.606.743.993,1.239,2.082,1.465,3.316.261,1.422.608,2.829.922,4.241.183.825-.274,1.597-1.058,1.778-.783.18-1.554-.308-1.742-1.125-.279-1.212-.56-2.424-.804-3.643-.204-1.021-.594-1.958-1.176-2.812-.781-1.144-1.585-2.272-2.374-3.411-.254-.367-.481-.753-.74-1.117-.501-.703-.591-1.47-.421-2.296.247-1.201.478-2.406.716-3.609.003-.016.003-.033.006-.074-.05.04-.089.066-.123.097-.598.545-1.197,1.088-1.789,1.639-.062.057-.11.158-.115.242-.087,1.326-.165,2.653-.248,3.979-.041.641-.554,1.087-1.186,1.04-.6-.045-1.035-.574-.995-1.196.09-1.411.176-2.822.261-4.233.03-.498.222-.916.592-1.253,1.221-1.112,2.44-2.226,3.66-3.339.129-.118.246-.252.385-.356.381-.287.817-.384,1.283-.297.717.134,1.431.278,2.145.426.596.124,1.038.46,1.25,1.033.148.401.244.822.346,1.239.243.995.654,1.924,1.094,2.842.143.297.376.491.691.613.959.373,1.91.764,2.864,1.149.068.027.136.055.203.087.583.277.825.859.591,1.42-.224.536-.856.795-1.439.577-.392-.146-.777-.31-1.165-.465-.829-.332-1.655-.671-2.488-.994-.314-.122-.566-.312-.739-.594-.174-.284-.325-.582-.486-.874-.035-.063-.069-.126-.126-.232Z" stroke-width="0"></path>
                    <path d="M7.102,22.191c.259.402.497.772.735,1.142.48.747.962,1.492,1.437,2.242.041.065.066.158.057.233-.038.303-.09.604-.143.904-.098.559-.309,1.069-.618,1.547-.923,1.43-1.831,2.869-2.752,4.3-.552.858-1.767.912-2.364.114-.368-.492-.375-1.17-.015-1.736.694-1.093,1.366-2.201,2.093-3.272.688-1.014,1.054-2.129,1.231-3.324.098-.66.201-1.319.303-1.978.007-.044.018-.087.037-.174Z" stroke-width="0"></path>
                    <path d="M12.521,11.553c-1.455,0-2.629-1.176-2.629-2.635,0-1.455,1.178-2.631,2.634-2.631,1.456,0,2.636,1.174,2.64,2.628.004,1.46-1.176,2.637-2.645,2.638Z" stroke-width="0"></path>
                    <path d="M27.155,18.138c.204,1.02.396,1.984.589,2.948.06.299.116.599.179.898.012.057.047.109.087.195-.117.163-.256.361-.4.556-.397.536-.795,1.072-1.194,1.606-.743.993-1.239,2.082-1.465,3.316-.261,1.422-.608,2.829-.922,4.241-.183.825.274,1.597,1.058,1.778.783.18,1.554-.308,1.742-1.125.279-1.212.56-2.424.804-3.643.204-1.021.594-1.958,1.176-2.812.781-1.144,1.585-2.272,2.374-3.411.254-.367.481-.753.74-1.117.501-.703.591-1.47.421-2.296-.247-1.201-.478-2.406-.716-3.609-.003-.016-.003-.033-.006-.074.05.04.089.066.123.097.598.545,1.197,1.088,1.789,1.639.062.057.11.158.115.242.087,1.326.165,2.653.248,3.979.041.641.554,1.087,1.186,1.04.6-.045,1.035-.574.995-1.196-.09-1.411-.176-2.822-.261-4.233-.03-.498-.222-.916-.592-1.253-1.221-1.112-2.44-2.226-3.66-3.339-.129-.118-.246-.252-.385-.356-.381-.287-.817-.384-1.283-.297-.717.134-1.431.278-2.145.426-.596.124-1.038.46-1.25,1.033-.148.401-.244.822-.346,1.239-.243.995-.654,1.924-1.094,2.842-.143.297-.376.491-.691.613-.959.373-1.91.764-2.864,1.149-.068.027-.136.055-.203.087-.583.277-.825.859-.591,1.42.224.536.856.795,1.439.577.392-.146.777-.31,1.165-.465.829-.332,1.655-.671,2.488-.994.314-.122.566-.312.739-.594.174-.284.325-.582.486-.874.035-.063.069-.126.126-.232Z" stroke-width="0"></path>
                    <path d="M32.898,22.191c-.259.402-.497.772-.735,1.142-.48.747-.962,1.492-1.437,2.242-.041.065-.066.158-.057.233.038.303.09.604.143.904.098.559.309,1.069.618,1.547.923,1.43,1.831,2.869,2.752,4.3.552.858,1.767.912,2.364.114.368-.492.375-1.17.015-1.736-.694-1.093-1.366-2.201-2.093-3.272-.688-1.014-1.054-2.129-1.231-3.324-.098-.66-.201-1.319-.303-1.978-.007-.044-.018-.087-.037-.174Z" stroke-width="0"></path>
                    <path d="M27.479,11.553c1.455,0,2.629-1.176,2.629-2.635,0-1.455-1.178-2.631-2.634-2.631-1.456,0-2.636,1.174-2.64,2.628-.004,1.46,1.176,2.637,2.645,2.638Z" stroke-width="0"></path>
                `;case"trained":return ve`
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
        `}createRenderRoot(){return this}}customElements.define("host-progress-circle",Yl);/**
* @license
* Copyright 2021 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/function*Li(i,t,e=1){const s=t===void 0?0:i;t!=null||(t=i);for(let n=s;e>0?n<t:t<n;n+=e)yield n}/**
* @license
* Copyright 2021 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/function*Ni(i,t){if(i!==void 0){let e=0;for(const s of i)yield t(s,e++)}}class ha extends k{static get properties(){return{startDate:{type:String},endDate:{type:String},selectedDays:{type:Array},highlightedDays:{type:Array},view:{type:String},translations:{type:Object},showToday:{type:Boolean},showTodayButton:{type:Boolean},showClearButton:{type:Boolean},viewOnly:{type:Boolean},monthToShow:{attribute:!1}}}constructor(){super(),this.startDate="",this.endDate="",this.selectedDays=[],this.highlightedDays=[],this.showToday=!1,this.showTodayButton=!1,this.showClearButton=!1,this.viewOnly=!1,this.today=f.now().toISODate(),this.view="slider",this.translations={clear:"Clear",today:"Today"};const t=document.querySelector("html");this.isRtl=t.getAttribute("dir")==="rtl"}firstUpdated(){super.firstUpdated(),this.monthToShow=f.now()}willUpdate(t){if(t.has("selectedDays"))if(this.selectedDays.length>0){const e=this.selectedDays[0];this.monthToShow=f.fromFormat(`${e.date}`,"y-LL-dd")}else this.monthToShow=f.now()}nextView(t){this.shadowRoot.querySelectorAll(".selected-time").forEach(e=>e.classList.remove("selected-time")),this.monthToShow=t}handleSelectDay(t,e){const s=t.target;this.selectDay(e,s)}selectDay(t,e){const s=this.selectedDays.filter(n=>n.date===t);s.length===0?this.dispatchEvent(new CustomEvent("day-added",{detail:{date:t}})):s.forEach(({id:n})=>{this.dispatchEvent(new CustomEvent("day-removed",{detail:{id:n}}))}),this.shadowRoot.querySelectorAll(".selected-time").forEach(n=>n.classList.remove("selected-time")),e&&e.classList.add("selected-time")}getDaysOfTheWeekInitials(t="en-US",e="long"){const s=new Date,n=864e5,a=r=>f.fromMillis(r).toLocaleString({weekday:e});return[...Array(7).keys()].map(r=>a(new Date().getTime()-(s.getDay()-r)*n))}buildCalendarDays(t="en-US",e){const s=e.startOf("month").startOf("day"),n=[],a=r=>f.fromMillis(r).toLocaleString({day:"numeric"});for(let r=0;r<e.daysInMonth;r++){const o=s.plus({days:r}),c=o.plus({days:1}),d=this.endDate&&o>f.fromISO(this.endDate)||c<=f.fromISO(this.startDate),u={key:o.toISODate(),formatted:a(o.toMillis()),disabled:d};n.push(u)}return n}addMonth(){const t=f.fromISO(this.endDate).plus({months:1}).endOf("month").toISODate();this.dispatchEvent(new CustomEvent("calendar-extended",{detail:{newEndDate:t}})),this.endDate=t}isHighlighted(t){return!!this.highlightedDays.find(s=>s.date===t)}isSelected(t){return!!this.selectedDays.find(s=>s.date===t)}renderCalendar(t){const e=this.getDaysOfTheWeekInitials(navigator.language,"narrow"),s=t.startOf("month").weekday,n=this.buildCalendarDays(navigator.language,t);return l`
            ${e.map(a=>l`
                    <div class="cell week-day">
                        ${a}
                    </div>
                `)}
            ${Ni(Li(s%7),a=>l`
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
        `}clearCalendar(){this.dispatchEvent(new CustomEvent("clear")),this.shadowRoot.querySelectorAll(".selected-time").forEach(t=>{t.classList.remove("selected-time")})}selectToday(){this.monthToShow=f.now({locale:navigator.language});const t=this.monthToShow.toISODate(),e=this.shadowRoot.querySelector(`.day[data-day="${t}"]`);this.selectDay(t,e)}renderSlider(){f.now({locale:navigator.language});const t=this.monthToShow||f.fromISO(this.startDate),e=t.startOf("month"),s=t.minus({months:1}),n=e.plus({months:1});return l`

            <div class="calendar-wrapper" dir=${this.isRtl?"rtl":"ltr"}>
                <div class="calendar">
                    <button
                        class="button month-next"
                        ?disabled=${this.startDate?e<=f.fromISO(this.startDate).startOf("month"):!1}
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
                        ?disabled=${this.endDate?n>f.fromISO(this.endDate):!1}
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
        `}render(){if(this.view==="all"){const e=f.fromISO(this.startDate).startOf("month");let s=0;for(;e.plus({months:s})<f.fromISO(this.endDate);)s=s+1;return l`
                <div class="calendar-wrapper grid" dir=${this.isRtl?"rtl":"ltr"}>
                    ${Ni(Li(s),n=>{const a=e.plus({months:n});return l`
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
            `}else return this.renderSlider()}}E(ha,"styles",[Is`
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
        `]);customElements.define("calendar-select",ha);class Jl extends k{static get properties(){return{t:{type:Object},selectedDays:{type:Array},date:{type:String,attribute:!1},datePickerOpen:{type:Boolean,attribute:!1}}}constructor(){super(),this.datePickerOpen=!1,this.toggleDatePicker=this.toggleDatePicker.bind(this)}firstUpdated(){jQuery(this.renderRoot).foundation()}connectedCallback(){super.connectedCallback(),this.renderDate=this.renderDate.bind(this)}addDate(){this.date&&this.dispatchEvent(new CustomEvent("day-added",{detail:{date:this.date}}))}removeDate(t){this.dispatchEvent(new CustomEvent("day-removed",{detail:{id:t}}))}renderDate({date:t,id:e},s){return l`
            <li>
                <div class="d-flex align-items-center justify-content-between">
                    <span class="mx-0">${f.fromISO(t).toFormat("DDDD")}</span>
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
                        ${U(this.selectedDays.sort(this.sortDays),t=>t.id,this.renderDate)}
                    `}
                </ol>

                <div class="cluster align-items-center gap-0 mx-auto">
                    <div class="mx-auto">${this.date?f.fromISO(this.date).toFormat("DDDD"):""}</div>
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
        `}createRenderRoot(){return this}}customElements.define("calendar-list",Jl);class ua extends k{static get properties(){return{percentage:{type:Number}}}render(){return l`
            <div class="progress-bar">
                <div class="progress-bar__slider" style="--percentage:${Number(this.percentage)>100?"100":this.percentage}%"></div>
            </div>
        `}}E(ua,"styles",[Is`
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
        `]);customElements.define("progress-slider",ua);jQuery(document).ready(()=>{const i=Me("zume_language")||"en";let t=i;i.includes("_")?t=i.replace("_","-"):i.length===4&&(t=i.slice(0,2)+"-"+i.slice(2)),M.defaultLocale=t,Me("zume_video_available")||fetch("https://api.vimeo.com/tutorial",{headers:{Authorization:`bearer ${window.zumeApiShare.zume_vimeo_api_key}`}}).then(s=>{s.ok&&ma("zume_video_available",1,"",1)}),document.querySelectorAll(".video-player").forEach(s=>{const n=s.getAttribute("data-video-src"),a=s.getAttribute("data-video-alt-src"),r=s.querySelector("iframe"),o=s.querySelector(".video-trigger");if(!o||!r||!n){console.log(".video-player is missing something (.video-trigger || iframe || data-video-src)");return}const c=r.cloneNode();r.parentNode.insertBefore(c,r),r.remove(),o.addEventListener("click",d);function d(u){if(console.log(u,n),Me("zume_video_available"))c.src=n;else{const p=document.createElement("video");p.src=a,p.controls=!0,p.autoplay=!0,c.parentNode.insertBefore(p,c),c.remove()}o.style.display="none"}})});function Es(i){return Object.fromEntries(Object.entries(i).map(([t,e])=>[t,pa(e)]))}function pa(i){return typeof i>"u"?"":typeof i!="string"?i:i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}function ma(i,t,e="",s=0){let n=`${i}=${t};`;if(Number.isInteger(s)&&s>0){var a=new Date;a.setTime(a.getTime()+s*24*60*60*1e3),n+="expires="+a.toUTCString()+";"}if(e){let r=window.location.pathname.split(e)[0]+e;r=r.replace(/^\/?([^\/]+(?:\/[^\/]+)*)\/?$/,"/$1"),n+="path="+r+";"}document.cookie=n}function Me(i){const t=document.cookie?Object.fromEntries(document.cookie.split(";").map(e=>e.trim().split("="))):{};return i in t?t[i]:!1}window.zumeApiShare.escapeObject=Es;window.zumeApiShare.escapeHTML=pa;window.zumeApiShare.setCookie=ma;window.zumeApiShare.getCookie=Me;
//# sourceMappingURL=main-bundle.js.map
