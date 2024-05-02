var we=Object.defineProperty;var ke=(n,t,e)=>t in n?we(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var w=(n,t,e)=>(ke(n,typeof t!="symbol"?t+"":t,e),e),bt=(n,t,e)=>{if(!t.has(n))throw TypeError("Cannot "+e)};var C=(n,t,e)=>(bt(n,t,"read from private field"),e?e.call(n):t.get(n)),x=(n,t,e)=>{if(t.has(n))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(n):t.set(n,e)},T=(n,t,e,s)=>(bt(n,t,"write to private field"),s?s.call(n,e):t.set(n,e),e);var A=(n,t,e)=>(bt(n,t,"access private method"),e);var jt;let Se=(jt=class{static save(t,e){localStorage.setItem(this.createKey(t),JSON.stringify(e))}static load(t){const e=localStorage.getItem(this.createKey(t));try{return JSON.parse(e)}catch{return e}}static createKey(t){return this.prefix+t}},w(jt,"prefix","Z5_"),jt);window.ZumeStorage=Se;var E,ct,Gt,dt,Yt,ht,Xt,et,Ct;class Jt{constructor(t){x(this,ct);x(this,dt);x(this,ht);x(this,et);w(this,"WIZARD_STATE_NAME","zume_wizard_state");w(this,"STALE_LIFESPAN",10*60*1e3);w(this,"MAX_LIFESPAN",60*60*1e3);x(this,E,void 0);this.moduleName=t,T(this,E,A(this,ct,Gt).call(this))}empty(){return Object.keys(C(this,E).data).length===0}isDataStale(){return A(this,et,Ct).call(this,C(this,E),this.STALE_LIFESPAN)}get(t){return C(this,E).data[t]}getAll(){return C(this,E).data}add(t,e){C(this,E).data[t]=e,A(this,ht,Xt).call(this),localStorage.setItem(this.WIZARD_STATE_NAME,JSON.stringify(C(this,E)))}clear(){T(this,E,null),localStorage.removeItem(this.WIZARD_STATE_NAME)}}E=new WeakMap,ct=new WeakSet,Gt=function(){const t=A(this,dt,Yt).call(this);return t&&!A(this,et,Ct).call(this,t,this.MAX_LIFESPAN)?t:{module:this.moduleName,data:{},timestamp:Date.now()}},dt=new WeakSet,Yt=function(){return JSON.parse(localStorage.getItem(this.WIZARD_STATE_NAME))},ht=new WeakSet,Xt=function(){C(this,E).timestamp=Date.now()},et=new WeakSet,Ct=function(t,e){return Date.now()-t.timestamp>e};const k={gettingStarted:"getting-started",makeAGroup:"make-a-group",getACoach:"get-a-coach",joinATraining:"join-a-training",connectWithFriend:"connect-with-friend",joinFriendsPlan:"join-friends-training",checkin:"checkin",setProfile:"set-profile",joinCommunity:"join-the-community"},S={completeProfile:"completeProfile",makePlan:"makePlan",inviteFriends:"inviteFriends",getACoach:"getACoach",joinTraining:"joinTraining",connectFriend:"connectFriend",joinFriendsTraining:"joinFriendsTraining",checkin:"checkin",planDecision:"planDecision",joinCommunity:"joinCommunity"},je={planDecision:"plan-decision",howManySessions:"how-many-sessions",howOften:"how-often",startDate:"what-start-date",location:"what-location",review:"review-training"},h={updateName:"update-your-name",updateLocation:"update-your-location",updatePhone:"update-your-phone",inviteFriends:"invite-friends",contactPreferences:"contact-preferences",languagePreferences:"preferred-language",howCanWeServe:"how-can-we-serve",connectingToCoach:"connecting-to-coach",joinTraining:"join-training",connectToFriend:"connect-friend",joinFriendsPlan:"join-friends-training",checkinSubmit:"checkin-submit",joinCommunity:"join-community",...je},Ce={[h.updateName]:{field:"name",testExistance:(n,t)=>t.has_set_name},[h.updateLocation]:{field:"location",testExistance:n=>!(n.source&&n.source==="ip")},[h.updatePhone]:{field:"phone",testExistance:n=>!!n}},Ee={[k.gettingStarted]:{[S.completeProfile]:j([h.updateName,h.updateLocation],!0),[S.planDecision]:j([h.planDecision],!1)},[k.setProfile]:{[S.completeProfile]:j([h.updateName,h.updateLocation],!0)},[k.makeAGroup]:{[S.makePlan]:j([h.howManySessions,h.howOften,h.startDate,h.location,h.review,h.inviteFriends],!0)},[k.getACoach]:{[S.completeProfile]:j([h.updateName,h.updateLocation,h.updatePhone]),[S.getACoach]:j([h.contactPreferences,h.languagePreferences,h.howCanWeServe,h.connectingToCoach])},[k.joinATraining]:{[S.completeProfile]:j([h.updateName,h.updateLocation,h.updatePhone]),[S.joinTraining]:j([h.joinTraining],!0)},[k.connectWithFriend]:{[S.completeProfile]:j([h.updateName,h.updateLocation],!0),[S.connectFriend]:j([h.connectToFriend])},[k.joinFriendsPlan]:{[S.completeProfile]:j([h.updateName,h.updateLocation],!0),[S.joinFriendsTraining]:j([h.joinFriendsPlan])},[k.joinCommunity]:{[S.joinCommunity]:j([h.joinCommunity],!0)},[k.checkin]:{[S.checkin]:j([h.checkinSubmit])}};function j(n=[],t=!1){const e={steps:[],skippable:t};return n.forEach(s=>{Object.values(h).includes(s)&&e.steps.push(s)}),e}var R,D,ut,te,pt,ee,mt,se;class xe{constructor(t){x(this,ut);x(this,pt);x(this,mt);x(this,R,void 0);x(this,D,void 0);w(this,"profile");T(this,R,{}),T(this,D,[]),this.profile=t}reset(){T(this,R,{})}isTypeValid(t){return!!Object.values(k).includes(t)}isLoaded(){return Object.keys(C(this,R)).length!==0}getSteps(t){return A(this,pt,ee).call(this,t),C(this,D)}}R=new WeakMap,D=new WeakMap,ut=new WeakSet,te=function(t){return this.isTypeValid(t)?Ee[t]:{}},pt=new WeakSet,ee=function(t){const e=A(this,ut,te).call(this,t);Object.keys(e).length!==0&&A(this,mt,se).call(this,e)},mt=new WeakSet,se=function(t){T(this,R,t),T(this,D,[]),Object.entries(C(this,R)).forEach(([e,{steps:s,skippable:i}])=>{s.forEach(a=>{const r=Ce[a];let l=null;if(r&&this.profile){if(r.testExistance(this.profile[r.field],this.profile))return;l=this.profile[r.field]}const c={slug:a,module:e,skippable:i};l!==null&&(c.value=l),C(this,D).push(c)})})};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const at=window,xt=at.ShadowRoot&&(at.ShadyCSS===void 0||at.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ot=Symbol(),Tt=new WeakMap;let ie=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Ot)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(xt&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Tt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Tt.set(e,t))}return t}toString(){return this.cssText}};const Oe=n=>new ie(typeof n=="string"?n:n+"",void 0,Ot),ze=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((s,i,a)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[a+1],n[0]);return new ie(e,n,Ot)},Ae=(n,t)=>{xt?n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const s=document.createElement("style"),i=at.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)})},Mt=xt?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Oe(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ft;const rt=window,Rt=rt.trustedTypes,Pe=Rt?Rt.emptyScript:"",It=rt.reactiveElementPolyfillSupport,Et={toAttribute(n,t){switch(t){case Boolean:n=n?Pe:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},ne=(n,t)=>t!==n&&(t==t||n==n),$t={attribute:!0,type:String,converter:Et,reflect:!1,hasChanged:ne};let F=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const i=this._$Ep(s,e);i!==void 0&&(this._$Ev.set(i,s),t.push(i))}),t}static createProperty(t,e=$t){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s=typeof t=="symbol"?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const a=this[t];this[e]=i,this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||$t}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of s)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Mt(i))}else t!==void 0&&e.push(Mt(t));return e}static _$Ep(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Ae(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=$t){var i;const a=this.constructor._$Ep(t,s);if(a!==void 0&&s.reflect===!0){const r=(((i=s.converter)===null||i===void 0?void 0:i.toAttribute)!==void 0?s.converter:Et).toAttribute(e,s.type);this._$El=t,r==null?this.removeAttribute(a):this.setAttribute(a,r),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,a=i._$Ev.get(t);if(a!==void 0&&this._$El!==a){const r=i.getPropertyOptions(a),l=typeof r.converter=="function"?{fromAttribute:r.converter}:((s=r.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?r.converter:Et;this._$El=a,this[a]=l.fromAttribute(e,r.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||ne)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((i,a)=>this[a]=i),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(i=>{var a;return(a=i.hostUpdate)===null||a===void 0?void 0:a.call(i)}),this.update(s)):this._$Ek()}catch(i){throw e=!1,this._$Ek(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var i;return(i=s.hostUpdated)===null||i===void 0?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};F.finalized=!0,F.elementProperties=new Map,F.elementStyles=[],F.shadowRootOptions={mode:"open"},It==null||It({ReactiveElement:F}),((ft=rt.reactiveElementVersions)!==null&&ft!==void 0?ft:rt.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var yt;const ot=window,Q=ot.trustedTypes,Lt=Q?Q.createPolicy("lit-html",{createHTML:n=>n}):void 0,lt="$lit$",P=`lit$${(Math.random()+"").slice(9)}$`,zt="?"+P,Te=`<${zt}>`,Z=document,Y=()=>Z.createComment(""),X=n=>n===null||typeof n!="object"&&typeof n!="function",ae=Array.isArray,re=n=>ae(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",_t=`[ 	
\f\r]`,J=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,qt=/-->/g,Ut=/>/g,L=RegExp(`>|${_t}(?:([^\\s"'>=/]+)(${_t}*=${_t}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Nt=/'/g,Dt=/"/g,oe=/^(?:script|style|textarea|title)$/i,le=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),o=le(1),it=le(2),O=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),Ht=new WeakMap,K=Z.createTreeWalker(Z,129,null,!1),ce=(n,t)=>{const e=n.length-1,s=[];let i,a=t===2?"<svg>":"",r=J;for(let c=0;c<e;c++){const d=n[c];let v,u,p=-1,m=0;for(;m<d.length&&(r.lastIndex=m,u=r.exec(d),u!==null);)m=r.lastIndex,r===J?u[1]==="!--"?r=qt:u[1]!==void 0?r=Ut:u[2]!==void 0?(oe.test(u[2])&&(i=RegExp("</"+u[2],"g")),r=L):u[3]!==void 0&&(r=L):r===L?u[0]===">"?(r=i??J,p=-1):u[1]===void 0?p=-2:(p=r.lastIndex-u[2].length,v=u[1],r=u[3]===void 0?L:u[3]==='"'?Dt:Nt):r===Dt||r===Nt?r=L:r===qt||r===Ut?r=J:(r=L,i=void 0);const f=r===L&&n[c+1].startsWith("/>")?" ":"";a+=r===J?d+Te:p>=0?(s.push(v),d.slice(0,p)+lt+d.slice(p)+P+f):d+P+(p===-2?(s.push(void 0),c):f)}const l=a+(n[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Lt!==void 0?Lt.createHTML(l):l,s]};class tt{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let a=0,r=0;const l=t.length-1,c=this.parts,[d,v]=ce(t,e);if(this.el=tt.createElement(d,s),K.currentNode=this.el.content,e===2){const u=this.el.content,p=u.firstChild;p.remove(),u.append(...p.childNodes)}for(;(i=K.nextNode())!==null&&c.length<l;){if(i.nodeType===1){if(i.hasAttributes()){const u=[];for(const p of i.getAttributeNames())if(p.endsWith(lt)||p.startsWith(P)){const m=v[r++];if(u.push(p),m!==void 0){const f=i.getAttribute(m.toLowerCase()+lt).split(P),$=/([.?@])?(.*)/.exec(m);c.push({type:1,index:a,name:$[2],strings:f,ctor:$[1]==="."?he:$[1]==="?"?ue:$[1]==="@"?pe:st})}else c.push({type:6,index:a})}for(const p of u)i.removeAttribute(p)}if(oe.test(i.tagName)){const u=i.textContent.split(P),p=u.length-1;if(p>0){i.textContent=Q?Q.emptyScript:"";for(let m=0;m<p;m++)i.append(u[m],Y()),K.nextNode(),c.push({type:2,index:++a});i.append(u[p],Y())}}}else if(i.nodeType===8)if(i.data===zt)c.push({type:2,index:a});else{let u=-1;for(;(u=i.data.indexOf(P,u+1))!==-1;)c.push({type:7,index:a}),u+=P.length-1}a++}}static createElement(t,e){const s=Z.createElement("template");return s.innerHTML=t,s}}function H(n,t,e=n,s){var i,a,r,l;if(t===O)return t;let c=s!==void 0?(i=e._$Co)===null||i===void 0?void 0:i[s]:e._$Cl;const d=X(t)?void 0:t._$litDirective$;return(c==null?void 0:c.constructor)!==d&&((a=c==null?void 0:c._$AO)===null||a===void 0||a.call(c,!1),d===void 0?c=void 0:(c=new d(n),c._$AT(n,e,s)),s!==void 0?((r=(l=e)._$Co)!==null&&r!==void 0?r:l._$Co=[])[s]=c:e._$Cl=c),c!==void 0&&(t=H(n,c._$AS(n,t.values),c,s)),t}class de{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,a=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:Z).importNode(s,!0);K.currentNode=a;let r=K.nextNode(),l=0,c=0,d=i[0];for(;d!==void 0;){if(l===d.index){let v;d.type===2?v=new V(r,r.nextSibling,this,t):d.type===1?v=new d.ctor(r,d.name,d.strings,this,t):d.type===6&&(v=new me(r,this,t)),this._$AV.push(v),d=i[++c]}l!==(d==null?void 0:d.index)&&(r=K.nextNode(),l++)}return a}v(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class V{constructor(t,e,s,i){var a;this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=(a=i==null?void 0:i.isConnected)===null||a===void 0||a}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=H(this,t,e),X(t)?t===y||t==null||t===""?(this._$AH!==y&&this._$AR(),this._$AH=y):t!==this._$AH&&t!==O&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):re(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==y&&X(this._$AH)?this._$AA.nextSibling.data=t:this.$(Z.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,a=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=tt.createElement(i.h,this.options)),i);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===a)this._$AH.v(s);else{const r=new de(a,this),l=r.u(this.options);r.v(s),this.$(l),this._$AH=r}}_$AC(t){let e=Ht.get(t.strings);return e===void 0&&Ht.set(t.strings,e=new tt(t)),e}T(t){ae(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const a of t)i===e.length?e.push(s=new V(this.k(Y()),this.k(Y()),this,this.options)):s=e[i],s._$AI(a),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class st{constructor(t,e,s,i,a){this.type=1,this._$AH=y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=a,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=y}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const a=this.strings;let r=!1;if(a===void 0)t=H(this,t,e,0),r=!X(t)||t!==this._$AH&&t!==O,r&&(this._$AH=t);else{const l=t;let c,d;for(t=a[0],c=0;c<a.length-1;c++)d=H(this,l[s+c],e,c),d===O&&(d=this._$AH[c]),r||(r=!X(d)||d!==this._$AH[c]),d===y?t=y:t!==y&&(t+=(d??"")+a[c+1]),this._$AH[c]=d}r&&!i&&this.j(t)}j(t){t===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class he extends st{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===y?void 0:t}}const Me=Q?Q.emptyScript:"";class ue extends st{constructor(){super(...arguments),this.type=4}j(t){t&&t!==y?this.element.setAttribute(this.name,Me):this.element.removeAttribute(this.name)}}class pe extends st{constructor(t,e,s,i,a){super(t,e,s,i,a),this.type=5}_$AI(t,e=this){var s;if((t=(s=H(this,t,e,0))!==null&&s!==void 0?s:y)===O)return;const i=this._$AH,a=t===y&&i!==y||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==y&&(i===y||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class me{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){H(this,t)}}const Re={O:lt,P,A:zt,C:1,M:ce,L:de,D:re,R:H,I:V,V:st,H:ue,N:pe,U:he,F:me},Bt=ot.litHtmlPolyfillSupport;Bt==null||Bt(tt,V),((yt=ot.litHtmlVersions)!==null&&yt!==void 0?yt:ot.litHtmlVersions=[]).push("2.7.3");const Ie=(n,t,e)=>{var s,i;const a=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:t;let r=a._$litPart$;if(r===void 0){const l=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:null;a._$litPart$=r=new V(t.insertBefore(Y(),l),l,void 0,e??{})}return r._$AI(n),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var wt,kt;let g=class extends F{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ie(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return O}};g.finalized=!0,g._$litElement$=!0,(wt=globalThis.litElementHydrateSupport)===null||wt===void 0||wt.call(globalThis,{LitElement:g});const Ft=globalThis.litElementPolyfillSupport;Ft==null||Ft({LitElement:g});((kt=globalThis.litElementVersions)!==null&&kt!==void 0?kt:globalThis.litElementVersions=[]).push("3.3.2");/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ge=Symbol.for(""),Le=n=>{if((n==null?void 0:n.r)===ge)return n==null?void 0:n._$litStatic$},M=(n,...t)=>({_$litStatic$:t.reduce((e,s,i)=>e+(a=>{if(a._$litStatic$!==void 0)return a._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${a}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(s)+n[i+1],n[0]),r:ge}),Wt=new Map,qe=n=>(t,...e)=>{const s=e.length;let i,a;const r=[],l=[];let c,d=0,v=!1;for(;d<s;){for(c=t[d];d<s&&(a=e[d],(i=Le(a))!==void 0);)c+=i+t[++d],v=!0;d!==s&&l.push(a),r.push(c),d++}if(d===s&&r.push(t[s]),v){const u=r.join("$$lit$$");(t=Wt.get(u))===void 0&&(r.raw=r,Wt.set(u,t=r)),e=l}return n(t,...e)},Ue=qe(o);class Ne extends g{static get properties(){return{type:{type:String},finishUrl:{type:String},user:{type:Object},translations:{type:Object},noUrlChange:{type:Boolean},step:{attribute:!1},steps:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.stepIndex=0,this.steps=[],this.step={},this.t=window.SHAREDFUNCTIONS.escapeObject(jsObject.translations),this._handleHistoryPopState=this._handleHistoryPopState.bind(this),this._handlePlanDecision=this._handlePlanDecision.bind(this),this.stateManager=new Jt}connectedCallback(){super.connectedCallback(),window.addEventListener("popstate",this._handleHistoryPopState),window.addEventListener("plan-decision",this._handlePlanDecision)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._handleHistoryPopState),window.removeEventListener("plan-decision",this._handlePlanDecision)}firstUpdated(){this.loadWizard(),this._handleHistoryPopState(!0),this.translations&&(this.t=window.SHAREDFUNCTIONS.escapeObject(this.translations))}willUpdate(t){t.has("type")&&this.type===""&&this.wizard&&this.wizard.reset(),t.has("type")&&this.type!==""&&this.loadWizard()}loadWizard(){this.wizard=new xe(this.user),this.steps=this.wizard.getSteps(this.type),this._gotoStep(0)}render(){if(!(!this.wizard||!this.wizard.isLoaded()))return this.wizard.isTypeValid(this.type)?this.steps.length===0?o`
                <div class="cover-page">
                    <div class="stack center | text-center">
                        <h1 class="brand">${this.t.completed_wizard_title}</h1>
                        <p>${this.t.completed_wizard_text}</p>
                        ${this.finishButton()}
                    </div>
                </div>
            `:o`
        <div class="container center">

            <header class="py-1 px--4 w-100 position-relative">
                <div class="text-end" id="wizard-skip-button">${this.headerButtons()}</div>
                <div class="center">${this.stepCounter()}</div>
            </header>

            <article class="${this.containerSize()} center text-center">
                ${this.currentStep()}
            </article>

            <footer class="stack-1 ${this.containerSize()} | my-3">
                ${this.footer()}
            </footer>

        </div>
        `:o`
                <div class="cover-page">
                    <div class="stack center | text-center">
                        <h1 class="brand">${this.t.bad_wizard}</h1>
                        <p>${this.t.found_bad_wizard}</p>
                        <div class="center"><img class="w-50" src="https://imgs.search.brave.com/3f3MurVApxsoxJlmqxLF0fs5-WlAk6sEu9IV3sICb_k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWR2ZXJ0aXNlY2Fz/dC5jb20vcG9kY2Fz/dC9pbWFnZS9WZXJ5/QmFkV2l6YXJkcw.jpeg" alt="bad wizards" /></div>
                        <a class="btn tight light" href="/">${this.t.home}</a>
                    </div>
                </div>
            `}containerSize(){return{...this.steps[this.stepIndex]},h.joinTraining?"container-md":"container-xsm"}currentStep(){const t={...this.steps[this.stepIndex]};let e="",s="";switch(t.slug){case h.updateName:case h.updateLocation:case h.updatePhone:e=M`complete-profile`,s=this.t.complete_profile;break;case h.contactPreferences:case h.languagePreferences:case h.howCanWeServe:case h.connectingToCoach:e=M`request-coach`,s=this.t.get_a_coach;break;case h.inviteFriends:e=M`invite-friends`,s=this.t.share;break;case h.joinTraining:e=M`join-training`,s=this.t.join_training;break;case h.joinFriendsPlan:e=M`join-friend-training`,s=this.t.join_training;break;case h.connectToFriend:e=M`connect-friend`,s=this.t.connect_friend;break;case h.checkinSubmit:e=M`session-checkin`,s=this.t.checkin;break;case h.planDecision:case h.howManySessions:case h.howOften:case h.startDate:case h.location:case h.review:e=M`make-training`,s=this.t.make_training;break}return Ue`
            <${e}
                class="w-100"
                name=${t.slug}
                module=${t.module}
                variant=${t.slug}
                ?skippable=${t.skippable}
                .t=${s}
                @done-step=${this._onNext}
                @loadingChange=${this._handleLoading}
                value=${JSON.stringify(t==null?void 0:t.value)}
            ></${e}>
        `}headerButtons(){const{skippable:t}=this.step,e=this.stepIndex===this.steps.length-1;return o`
        <div class="cluster | inline s-3">
            ${t&&!e?o`<button @click=${this._onSkip} class="brand">${this.t.skip}</button>`:""}
            ${!t&&!e&&!this.noUrlChange?o`
                    <button @click=${this._onQuit} class="close-btn tight light">
                        <span class="icon zume-close"></span>
                    </button>
                    `:""}
        </div>
        `}finishButton(){return o`
            <div class="text-center d-flex justify-content-between">
                <div class="cluster ms-auto">
                    <button @click=${this._handleFinish} ?disabled=${this.loading} class="btn tight light ${this.loading?"disabled":""}">${this.t.finish}</button>
                </div>
            </div>
        `}stepCounter(){const t=this.steps.length<2;return o`
            <div class="cluster">
                ${this.steps.map((e,s)=>{const i=s<=this.stepIndex;return o`<div class="step-circle ${t?"hidden":""} ${i?"complete":""}"></div>`})}
            </div>
        `}footer(){}_onBack(){if(this.stepIndex>0){const t=this.stepIndex-1;this._gotoStep(t)}}_onNext(){if(this.stepIndex+1<this.steps.length){const t=this.stepIndex+1;this._gotoStep(t)}else this._onFinish()}_onSkip(){const t=this.step.module;for(let e=this.stepIndex+1;e<this.steps.length;e++)if(this.steps[e].module!==t){this._gotoStep(e);return}this._onFinish()}_onQuit(){this._onFinish(!0)}_handleFinish(){this._onFinish()}_onFinish(t=!1){if(this.stateManager.clear(),this.wizard.reset(),!this.finishUrl){this.dispatchEvent(new CustomEvent("user-state:change",{bubbles:!0})),this.dispatchEvent(new CustomEvent("wizard-finished",{bubbles:!0}));return}const e=new URL(this.finishUrl);if(t===!1)if(this.type===k.checkin){const i=new URL(location.href).searchParams.get("code");if(i!==null){const a=new URL(jsObject.checkin_dashboard_url);a.searchParams.set("code",i),window.location.href=a.href;return}}else e.searchParams.set("completed",this.type);window.location.href=e.href}_gotoStep(t,e=!0){if(this.steps.length!==0&&(this.stepIndex=this.clampSteps(t),this.step={...this.steps[this.stepIndex]},e&&!this.noUrlChange)){const s=new URL(window.location.href),i=s.pathname.split("/"),a=i[i.length-1];let r="";Object.values(k).includes(a)?r=i.join("/")+"/"+this.step.slug+s.search:r=i.slice(0,-1).join("/")+"/"+this.step.slug+s.search,window.history.pushState(null,null,r)}}clampSteps(t){let e=t;return t>this.steps.length-1&&(e=this.steps.length-1),t<0&&(e=0),e}_handleHistoryPopState(t=!1){const s=new URL(window.location.href).pathname.split("/"),i=s[s.length-1];Object.values(k).includes(i)&&this._gotoStep(0,!1);let a="",r=0;this.steps.forEach(({slug:l,module:c},d)=>{if(a!==c&&(a=c,r=d),i===l){if(t===!0&&this.stateManager.isDataStale()){this._gotoStep(r);return}this._gotoStep(d,!1)}})}_handlePlanDecision(t){const{decision:e}=t.detail;switch(e){case"make":this.steps=this.wizard.getSteps(k.makeAGroup),this._gotoStep(0);break;case"join":this.steps=this.wizard.getSteps(k.joinATraining),this._gotoStep(0);break;case"skip":default:this._onSkip();break}}_handleLoading(t){const{loading:e}=t.detail;this.loading=e}createRenderRoot(){return this}}window.customElements.define("zume-wizard",Ne);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const U={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ve=n=>(...t)=>({_$litDirective$:n,values:t});class be{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:De}=Re,He=n=>n.strings===void 0,Kt=()=>document.createComment(""),G=(n,t,e)=>{var s;const i=n._$AA.parentNode,a=t===void 0?n._$AB:t._$AA;if(e===void 0){const r=i.insertBefore(Kt(),a),l=i.insertBefore(Kt(),a);e=new De(r,l,n,n.options)}else{const r=e._$AB.nextSibling,l=e._$AM,c=l!==n;if(c){let d;(s=e._$AQ)===null||s===void 0||s.call(e,n),e._$AM=n,e._$AP!==void 0&&(d=n._$AU)!==l._$AU&&e._$AP(d)}if(r!==a||c){let d=e._$AA;for(;d!==r;){const v=d.nextSibling;i.insertBefore(d,a),d=v}}}return e},q=(n,t,e=n)=>(n._$AI(t,e),n),Be={},fe=(n,t=Be)=>n._$AH=t,Fe=n=>n._$AH,St=n=>{var t;(t=n._$AP)===null||t===void 0||t.call(n,!1,!0);let e=n._$AA;const s=n._$AB.nextSibling;for(;e!==s;){const i=e.nextSibling;e.remove(),e=i}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const We=ve(class extends be{constructor(n){if(super(n),n.type!==U.PROPERTY&&n.type!==U.ATTRIBUTE&&n.type!==U.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!He(n))throw Error("`live` bindings can only contain a single expression")}render(n){return n}update(n,[t]){if(t===O||t===y)return t;const e=n.element,s=n.name;if(n.type===U.PROPERTY){if(t===e[s])return O}else if(n.type===U.BOOLEAN_ATTRIBUTE){if(!!t===e.hasAttribute(s))return O}else if(n.type===U.ATTRIBUTE&&e.getAttribute(s)===t+"")return O;return fe(n),t}});class Ke extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},value:{type:String},locations:{attribute:!1},locationError:{attribute:!1},phoneError:{attribute:!1},city:{attribute:!1},loading:{attribute:!1},state:{attribute:!1},localValue:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.locations=[],this.locationError="",this.city="",this.loading=!1,this.localValue="",this.phoneError="",this._clearLocations=this._clearLocations.bind(this),this._handleSuggestions=this._handleSuggestions.bind(this),this._debounceCityChange=debounce(getAddressSuggestions(this._handleSuggestions,jsObject.map_key)).bind(this),this._handleCityInputChange=this._handleCityInputChange.bind(this)}updated(t){t.has("variant")&&this.renderRoot.querySelector(".inputs input").focus()}willUpdate(t){t.has("value")&&this.value!==""&&(this.localValue=JSON.parse(this.value))}render(){var t;return o`
        <form class="inputs stack" @submit=${this._handleSubmit}>
            ${this.variant===h.updateName?o`
                <h2>${this.t.name_question}</h2>
                <div class="">
                    <label for="name">${this.t.name}</label>
                    <input class="input" type="text" id="name" name="name" value=${this.localValue} ?required=${!this.skippable}>
                </div>
            `:""}

            ${this.variant===h.updatePhone?o`
                <h2>${this.t.phone_question}</h2>
                <div class="">
                    <label for="phone">${this.t.phone}</label>
                    <input
                        class="input"
                        type="tel"
                        id="phone"
                        name="phone"
                        pattern="\\(?\\+?[\\(\\)\\-\\s0-9]*"
                        value=""
                        ?required=${!this.skippable}
                        @input=${this._handleInput}
                        @invalid=${this._handleInvalid}
                    >
                    <div class="input-error" data-state="${this.phoneError.length?"":"empty"}" >${this.phoneError}</div>
                </div>
            `:""}

            ${this.variant===h.updateLocation?o`
                <h2>${this.t.location_question}</h2>
                <div class="form-group">
                    <label class="input-label" for="city">${this.t.city}</label>
                    <input
                        class="input"
                        type="text"
                        id="city"
                        name="city"
                        .value="${this.city?We(this.city):(t=this.localValue)==null?void 0:t.label}"
                        @input=${this._handleCityChange}
                    >
                    <span class="loading-spinner ${this.loading?"active":""}"></span>
                    <p class="input-subtext">${this.t.approximate_location}</p>
                </div>
                <button>${this.t.accept}</button>
                <div id="address_results">
                    ${this.locationError}
                    ${this.locations.map(e=>o`
                            <div
                                class="address-result"
                                id="${e.id}"
                                data-place-name=${e.place_name}
                                @click=${this._handleLocationSelection}
                            >
                                ${e.place_name}
                            </div>
                        `)}
                </div>
                <div class="cluster | mx-auto">
                    <button type="submit" class="btn tight light" ?disabled=${this.loading}>${this.t.next}</button>
                </div>
            `:""}
            ${[h.updatePhone,h.updateName].includes(this.variant)?o`
                <div class="cluster | mx-auto">
                    <button type="submit" class="btn tight light" ?disabled=${this.loading}>${this.t.next}</button>
                    <span class="loading-spinner ${this.loading?"active":""}"></span>
                </div>
            `:""}
        </form>
        `}_handleInput(t){this.phoneError=""}_handleInvalid(t){t.preventDefault(),this.phoneError=this.t.phone_error}_handleSubmit(t){t.preventDefault(),t.srcElement.querySelector("#city")?this._handleSubmitLocation():this._handleDone(t)}_handleDone(t){t&&t.preventDefault();const e=t.target[0];if(e.type==="submit")return;let{name:s,value:i}=e;e.type==="tel"&&(i=e.value.replace(/[\(\)\-\s]/g,"")),this._updateProfile(s,i,()=>{this._sendDoneStepEvent()})}_sendDoneStepEvent(){const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)}_handleCityChange(t){this._handleCityInputChange(t),this._debounceCityChange(t)}_handleCityInputChange(t){this.city=t.target.value}_handleSuggestions(t){t.features.length<1&&(this.locationError=this.t.no_locations_found),this.locations=t.features}_handleLocationSelection(t){this.city=t.target.dataset.placeName;const e=getLocationGridFromMapbox(t.target.id,jsObject.profile.location);this.localValue=e,this._clearLocations()}_handleSubmitLocation(){if(this.localValue.source==="ip"){const{label:t,level:e,lat:s,lng:i}=this.localValue;this.localValue={source:"user",grid_id:!1,label:t,level:e,lat:Number(s),lng:Number(i)}}this._updateProfile("location_grid_meta",this.localValue,()=>{this._sendDoneStepEvent()})}_updateProfile(t,e,s=()=>{}){this.loading=!0;const i={[t]:e};fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(i),headers:{"X-WP-Nonce":jsObject.nonce}}).then(a=>a.json()).then(a=>{jsObject.profile=a,s()}).catch(a=>{console.error(a)}).finally(()=>{this.loading=!1})}_clearLocations(){this.locations=[]}createRenderRoot(){return this}}window.customElements.define("complete-profile",Ke);class Qe extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},inviteCode:{type:String}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.t={},this.inviteCode="123456",this.url=jsObject.site_url+`/app/plan_invite${this.inviteCode!==""?"?code="+this.inviteCode:""}`}render(){return o`
            <div class="center stack">
                <span class="zume-share brand-light f-7"></span>
                <h2>${this.t.title}</h2>
                <p>${this.t.share_with_friends}</p>
                <share-links url=${this.url} title="${this.t.join_my_plan}" .t=${this.t}></share-links>
            </div>
        `}createRenderRoot(){return this}}window.customElements.define("invite-friends",Qe);class Ze extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1},message:{attribute:!1},loading:{attribute:!1},requestSent:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.message="",this.loading=!1,this.requestSent=!1,this.contactPreferences=["email","text","phone","whatsapp","signal","telegram","messenger"]}updated(){this.message=this.t.connect_success;const t=this.stateManager.getAll();if(this.variant===h.connectingToCoach&&this.requestSent===!1){this.loading=!0,this.requestSent=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));const e=(i=>{i===!1&&(this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting)),i.coach_request&&i.coach_request.errors&&Object.keys(i.coach_request.errors).length!==0&&Object.keys(i.coach_request.errors)[0]==="already_has_coach"&&(this.message=this.t.already_coached,this.setErrorMessage(this.t.error_connecting)),this._handleFinish()}).bind(this),s=(()=>{this.message=this.t.connect_fail,this.setErrorMessage(this.t.error_connecting),this._handleFinish()}).bind(this);makeRequest("POST","get_a_coach",{data:t},"zume_system/v1/").done(e).fail(s).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}}setErrorMessage(t){this.errorMessage=t,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return this.stateManager||(this.stateManager=new Jt(this.module),this.state=this.stateManager.get(this.variant)||{},this.variant===h.languagePreferences&&!this.state.value&&(this.state.value=jsObject.profile.preferred_language||"en",this.stateManager.add(this.variant,this.state)),this.variant===h.contactPreferences&&Object.keys(this.state).length===0&&(this.state=Object.fromEntries(jsObject.profile.contact_preference.map(t=>[t,"true"])))),o`
        <form class="inputs stack-2" @submit=${this._handleDone}>
            ${this.variant===h.contactPreferences?o`
                <h2>${this.t.contact_preference_question}</h2>
                <div class="stack center container-sm | align-items-start text-start">
                    ${this.contactPreferences.map(t=>o`
                        <div>
                            <input type="checkbox" name="contact-preference" id=${"prefer_"+t} value=${t} @change=${this._handleChange} ?checked=${!!this.state[t]} />
                            <label for=${"prefer_"+t}>${this.t[t]}</label>
                        </div>
                    `)}
                </div>
            `:""}

            ${this.variant===h.languagePreferences?o`
                <h2>${this.t.language_preference_question}</h2>
                <div class="stack">
                    <label for="preferred-language">${this.t.language_preference}</label>
                    <select name="preferred-language" id="preferred-language" @change=${this._handleChange} >

                        ${Object.values(jsObject.languages).map(t=>o`
                            <option value=${t.code} ?selected=${t.code===this.state.value} >
                                ${t.nativeName} - ${t.enDisplayName}
                            </option>
                        `)}

                    </select>
                </div>
            `:""}

            ${this.variant===h.howCanWeServe?o`
                <h2>${this.t.how_can_we_serve}</h2>
                <div class="stack center | container-sm align-items-start text-start">
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="how-can-we-serve" id="coaching" value="coaching-request" @change=${this._handleChange} ?checked=${!!this.state.coaching} />
                        <label for="coaching">${this.t.coaching}</label>
                    </div>
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="how-can-we-serve" id="technical" value="technical-assistance" @change=${this._handleChange} ?checked=${!!this.state.technical} />
                        <label for="technical">${this.t.technical_assistance}</label>
                    </div>
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="how-can-we-serve" id="implementation" value="question-about-implementation" @change=${this._handleChange} ?checked=${!!this.state.implementation} />
                        <label for="implementation">${this.t.question_implementation}</label>
                    </div>
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="how-can-we-serve" id="content" value="question-about-content" @change=${this._handleChange} ?checked=${!!this.state.content} />
                        <label for="content">${this.t.question_content}</label>
                    </div>
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="how-can-we-serve" id="group-started" value="help-with-group" @change=${this._handleChange} ?checked=${!!this.state["group-started"]} />
                        <label for="group-started">${this.t.help_with_group}</label>
                    </div>
                </div>
            `:""}
            ${this.variant===h.connectingToCoach?o`

                <h1>${this.t.connecting_coach_title}</h1>
                <p>${this.message}</p>
                <span class="loading-spinner ${this.loading?"active":""}"></span>
            `:""}
            ${this.variant!==h.connectingToCoach?o`
                    <div class="cluster | mx-auto">
                        <span class="loading-spinner ${this.loading?"active":""}"></span>
                        <button type="submit" class="btn tight light" ?disabled=${this.loading}>${this.t.next}</button>
                    </div>
                `:""}
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        </form>
        `}_handleDone(t){if(t&&t.preventDefault(),Object.keys(this.state).length===0){this.setErrorMessage(this.t.missing_response);return}this._sendDoneStepEvent()}_sendDoneStepEvent(){const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)}_handleFinish(){setTimeout(()=>{this._sendDoneStepEvent()},3e3)}_handleChange(t){t.target.type==="checkbox"&&(this.state[t.target.value]=t.target.checked),t.target.type==="text"&&(this.state.value=t.target.value),t.target.type==="select-one"&&(this.state.value=t.target.value),this.stateManager.add(this.variant,this.state)}createRenderRoot(){return this}}customElements.define("request-coach",Ze);class Ve extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.showTrainings=!1,this.loading=!1}firstUpdated(){const t=new URL(location.href);if(!t.searchParams.has("code")){this.message="",this.loading=!1,this.showTrainings=!0;return}const e=t.searchParams.get("code");this.connectToPlan(e)}connectToPlan(t){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait,this.code=t,makeRequest("POST","connect/public-plan",{code:t},"zume_system/v1").then(e=>{console.log(e),this.message=this.t.success.replace("%s",e.name),this._sendDoneStepEvent()}).fail(({responseJSON:e})=>{console.log(e),this.message="",e.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)},2e3)}setErrorMessage(t){this.errorMessage=t,setTimeout(()=>{this.errorMessage=""},3e3)}_handleChosenTraining(t){console.log(t);const{code:e}=t.detail;this.showTrainings=!1,this.connectToPlan(e)}render(){return o`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            ${this.showTrainings?o`
                <public-trainings .t=${this.t} @chosen-training=${this._handleChosenTraining}></public-trainings>
            `:""}
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("join-training",Ve);class Je extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object}}}render(){return o`
            <div class="stack w-100">
                <h2>${this.t.join_community}</h2>
                <p>These are all the things that you get when you join</p> <!-- @todo content for this panel -->
                <ul role="list">
                    <li>lots of good things</li>
                    <li>and more</li>
                </ul>
            </div>
        `}createRenderRoot(){return this}}customElements.define("join-community",Je);class Ge extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const t=new URL(location.href);if(!t.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1;return}const e=t.searchParams.get("code");this.code=e,makeRequest("POST","connect/plan",{code:e},"zume_system/v1").then(s=>{console.log(s),this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_plan_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)},2e3)}setErrorMessage(t){this.errorMessage=t,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return o`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("join-friends-training",Ge);class Ye extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const t=new URL(location.href);if(!t.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));return}const e=t.searchParams.get("code");this.code=e,makeRequest("POST","connect/friend",{code:e},"zume_system/v1").then(s=>{console.log(s),this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_friend_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)},2e3)}setErrorMessage(t){this.errorMessage=t,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return o`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("connect-friend",Ye);class Xe extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},code:{attribute:!1},message:{attribute:!1},errorMessage:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.code="",this.errorMessage="",this.loading=!1}firstUpdated(){this.loading=!0,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}})),this.message=this.t.please_wait;const t=new URL(location.href);if(!t.searchParams.has("code")){this.message="",this.setErrorMessage(this.t.broken_link),this._sendDoneStepEvent(),this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}));return}const e=t.searchParams.get("code");this.code=e,makeRequest("POST","checkin",{code:e},"zume_system/v1").then(s=>{this.message=this.t.success.replace("%s",s.name),this._sendDoneStepEvent()}).fail(({responseJSON:s})=>{console.log(s),this.message="",s.code==="bad_checkin_code"?this.setErrorMessage(this.t.broken_link):this.setErrorMessage(this.t.error),this._sendDoneStepEvent()}).always(()=>{this.loading=!1,this.dispatchEvent(new CustomEvent("loadingChange",{bubbles:!0,detail:{loading:this.loading}}))})}_sendDoneStepEvent(){setTimeout(()=>{const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)},2e3)}setErrorMessage(t){console.log(t),this.errorMessage=t,setTimeout(()=>{this.errorMessage=""},3e3)}render(){return o`
            <h1>${this.t.title}</h1>
            <p>${this.message}</p>
            <span class="loading-spinner ${this.loading?"active":""}"></span>
            <div class="warning banner" data-state=${this.errorMessage.length?"":"empty"}>${this.errorMessage}</div>
        `}createRenderRoot(){return this}}customElements.define("session-checkin",Xe);class ts extends g{static get properties(){return{name:{type:String},module:{type:String},skippable:{type:Boolean},t:{type:Object},variant:{type:String},state:{attribute:!1},errorMessage:{attribute:!1},message:{attribute:!1},loading:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.skippable=!1,this.variant="",this.t={},this.state={},this.errorMessage="",this.message="",this.loading=!1}setErrorMessage(t){this.errorMessage=t,setTimeout(()=>{this.errorMessage=""},3e3)}_handlePlanDecision(t){const e=t.target.dataset.decision;this.dispatchEvent(new CustomEvent("plan-decision",{bubbles:!0,detail:{decision:e}}))}render(){return o`
            ${this.variant===h.planDecision?o`
                <div class="stack">
                    <span class="zume-start-group brand-light f-7"></span>
                    <h2>${this.t.join_or_start_a_training}</h2>
                    <button class="btn tight light" data-decision="make" @click=${this._handlePlanDecision}>${this.t.start_a_training}</button>
                    <button class="btn tight light" data-decision="join" @click=${this._handlePlanDecision}>${this.t.join_a_public_training}</button>
                    <button class="btn tight light outline" data-decision="skip" @click=${this._handlePlanDecision}>${this.t.skip_for_now}</button>
                </div>
            `:""}
            ${this.variant===h.howManySessions?o`
                <div class="stack">
                    <span class="zume-session-choice brand-light f-7"></span>
                    <h2>${this.t.question_which_session}</h2>
                    <button class="btn tight light outline" @click=${this._handleDone}>${this.t.hour_1_session_20}</button>
                    <button class="btn tight light" @click=${this._handleDone}>${this.t.hour_2_session_10}</button>
                    <button class="btn tight light outline" @click=${this._handleDone}>${this.t.hour_4_session_5}</button>
                </div>
            `:""}
            ${this.variant===h.howOften?o`
                <div class="stack">
                    <span class="zume-time brand-light f-7"></span>
                    <h2>${this.t.question_how_often}</h2>
                    <button class="btn tight light" @click=${this._handleDone}>${this.t.weekly}</button>
                    <button class="btn tight light" @click=${this._handleDone}>${this.t.biweekly}</button>
                    <button class="btn tight light" @click=${this._handleDone}>${this.t.monthly}</button>
                    <button class="btn tight light" @click=${this._handleDone}>${this.t.other}</button>
                    <button class="btn tight light outline" @click=${this._handleDone}>${this.t.skip}</button>
                </div>
            `:""}
            ${this.variant===h.startDate?o`
                <div class="stack">
                    <span class="zume-start-date brand-light f-7"></span>
                    <h2>${this.t.question_when_will_you_start}</h2>
                    <div class="cluster justify-content-center gapy-0">
                        <input type="date" class="fit-content m0">
                        <input type="time" class="fit-content m0" />
                    </div>
                    <button class="btn light fit-content mx-auto" @click=${this._handleDone}>${this.t.done}</button>
                    <button class="btn light outline fit-content mx-auto" @click=${this._handleDone}>${this.t.skip}</button>
                </div>
            `:""}
            ${this.variant===h.location?o`
                <div class="stack">
                    <span class="zume-start-date brand-light f-7"></span>
                    <h2>${this.t.question_where_will_you_meet}</h2>
                    <p>${this.t.question_where_will_you_meet_help_text}</p>
                    <input type="text" />
                    <button class="btn tight light fit-content mx-auto" @click=${this._handleDone}>${this.t.done}</button>
                    <button class="btn tight light outline" @click=${this._handleDone}>${this.t.skip}</button>
                </div>
            `:""}
            ${this.variant===h.review?o`
                <div class="stack">
                    <span class="zume-overview brand-light f-7"></span>
                    <h2>${this.t.review_training}</h2>
                    <p>${this.t.you_can_change_your_choices}</p>
                    <button class="btn tight light fit-content mx-auto" @click=${this._handleDone}>${this.t.create}</button>
                </div>
            `:""}

        `}_handleDone(t){t&&t.preventDefault(),this._sendDoneStepEvent()}_sendDoneStepEvent(){const t=new CustomEvent("done-step",{bubbles:!0});this.dispatchEvent(t)}_handleFinish(){setTimeout(()=>{this._sendDoneStepEvent()},3e3)}createRenderRoot(){return this}}customElements.define("make-training",ts);function es(n){return n?JSON.parse('{"'+n.substring(1).replace(/&/g,'","').replace(/=/g,'":"')+'"}'):{}}function ss(n,t){let e={};const s=n.split("/").filter(a=>a!=""),i=t.split("/").filter(a=>a!="");return s.map((a,r)=>{/^:/.test(a)&&(e[a.substring(1)]=i[r])}),e}function is(n){return n?new RegExp("^(|/)"+n.replace(/:[^\s/]+/g,"([\\wÀ-ÖØ-öø-ÿ-]+)")+"(|/)$"):new RegExp("(^$|^/$)")}function ns(n,t){if(is(t).test(n))return!0}function as(n){return class extends n{static get properties(){return{route:{type:String,reflect:!0,attribute:"route"},canceled:{type:Boolean}}}constructor(...t){super(...t),this.route="",this.canceled=!1}connectedCallback(...t){super.connectedCallback(...t),this.routing(this.constructor.routes,(...e)=>this.router(...e)),window.addEventListener("route",()=>{this.routing(this.constructor.routes,(...e)=>this.router(...e))}),window.onpopstate=()=>{window.dispatchEvent(new CustomEvent("route"))}}routed(t,e,s,i,a,r){r&&r(t,e,s,i),a(t,e,s,i)}routing(t,e){this.canceled=!0;const s=decodeURI(window.location.pathname),i=decodeURI(window.location.search);let a=t.filter(c=>c.pattern==="*")[0],r=t.filter(c=>c.pattern!=="*"&&ns(s,c.pattern))[0],l=es(i);r?(r.params=ss(r.pattern,s),r.data=r.data||{},r.authentication&&r.authentication.authenticate&&typeof r.authentication.authenticate=="function"?(this.canceled=!1,Promise.resolve(r.authentication.authenticate.bind(this).call()).then(c=>{this.canceled||(c?r.authorization&&r.authorization.authorize&&typeof r.authorization.authorize=="function"?(this.canceled=!1,Promise.resolve(r.authorization.authorize.bind(this).call()).then(d=>{this.canceled||(d?this.routed(r.name,r.params,l,r.data,e,r.callback):this.routed(r.authorization.unauthorized.name,r.params,l,r.data,e,r.callback))})):this.routed(r.name,r.params,l,r.data,e,r.callback):this.routed(r.authentication.unauthenticated.name,r.params,l,r.data,e,r.callback))})):r.authorization&&r.authorization.authorize&&typeof r.authorization.authorize=="function"?(this.canceled=!1,Promise.resolve(r.authorization.authorize.bind(this).call()).then(c=>{this.canceled||(c?this.routed(r.name,r.params,l,r.data,e,r.callback):this.routed(r.authorization.unauthorized.name,r.params,l,r.data,e,r.callback))})):this.routed(r.name,r.params,l,r.data,e,r.callback)):a&&(a.data=a.data||{},this.routed(a.name,{},l,a.data,e,a.callback))}}}function $e(n){return class extends n{navigate(t){window.history.pushState({},null,t),window.dispatchEvent(new CustomEvent("route"))}}}function nt(n,t){return(e,s)=>{e.preventDefault(),s(new CustomEvent(t,{bubbles:!0,detail:{type:n}}))}}function Qt(){return[{name:"root",pattern:`${jsObject.base_url}`,icon:"",type:"dash-link",translation:"",data:{makeComponent:()=>""}},{name:"getting-started",pattern:`${jsObject.base_url}/getting-started`,icon:"zume-start",type:"dash-link",translation:jsObject.translations.getting_started,data:{makeComponent:n=>o`<dash-getting-started></dash-getting-started>`}},{name:"set-profile",pattern:"#",parent:"getting-started",icon:"zume-profile",type:"handled-link",clickHandler:nt("set-profile","open-wizard"),translation:jsObject.translations.set_profile,explanation:jsObject.translations.set_profile_explanation,data:{makeComponent:()=>""}},{name:"join-a-training",pattern:"#",parent:"getting-started",icon:"zume-start",type:"handled-link",clickHandler:nt("getting-started","open-wizard"),translation:jsObject.translations.plan_a_training,explanation:jsObject.translations.plan_a_training_explanation,data:{makeComponent:()=>""}},{name:"get-a-coach",pattern:"#",parent:"getting-started",icon:"zume-coach",type:"handled-link",clickHandler:nt("get-a-coach","open-wizard"),translation:jsObject.translations.get_a_coach,explanation:jsObject.translations.get_a_coach_explanation,data:{makeComponent:()=>""}},{name:"training",pattern:`${jsObject.base_url}/training`,icon:"zume-training",type:"dash-link",translation:jsObject.translations.training,data:{makeComponent:n=>o`<dash-training></dash-training>`}},{name:"my-training",pattern:`${jsObject.base_url}/my-training`,parent:"training",icon:"zume-my-training",type:"dash-link",translation:jsObject.translations.my_training,explanation:jsObject.translations.my_training_explanation,data:{makeComponent:n=>o`<dash-trainings ?showTeaser=${n}></dash-trainings>`}},{name:"my-progress",pattern:`${jsObject.base_url}/my-progress`,parent:"training",icon:"zume-progress",type:"dash-link",translation:jsObject.translations.my_progress,explanation:jsObject.translations.my_progress_explanation,data:{makeComponent:n=>o`<dash-progress ?showTeaser=${n}></dash-progress>`}},{name:"3-month-plan",pattern:`${jsObject.base_url}/3-month-plan`,parent:"training",icon:"zume-plans",type:"handled-link",clickHandler:nt("3-month-plan","open-3-month-plan"),translation:jsObject.translations.create_3_month_plan,explanation:jsObject.translations["3_month_plan_explanation"],data:{makeComponent:()=>""}},{name:"practicing",pattern:`${jsObject.base_url}/practicing`,icon:"zume-practicing",type:"dash-link",translation:jsObject.translations.practicing,data:{makeComponent:n=>o`<dash-practicing></dash-practicing>`}},{name:"my-coach",pattern:`${jsObject.base_url}/my-coach`,parent:"practicing",icon:"zume-coach",type:"dash-link",translation:jsObject.translations.my_coach,explanation:jsObject.translations.my_coach_explanation,data:{makeComponent:n=>o`<dash-coach ?showTeaser=${n}></dash-coach>`}},{name:"my-plans",pattern:`${jsObject.base_url}/my-plans`,parent:"practicing",icon:"zume-plans",type:"dash-link",translation:jsObject.translations.my_plans,explanation:jsObject.translations.my_plans_explanation,data:{makeComponent:n=>o`<dash-plans ?showTeaser=${n}></dash-plans>`}},{name:"my-churches",pattern:`${jsObject.base_url}/my-churches`,parent:"practicing",icon:"zume-churches",type:"dash-link",translation:jsObject.translations.my_churches,explanation:jsObject.translations.my_churches_explanation,data:{makeComponent:n=>o`<dash-churches ?showTeaser=${n}></dash-churches>`}},{name:"my-maps",pattern:`${jsObject.base_url}/my-maps`,parent:"practicing",icon:"zume-maps",type:"dash-link",translation:jsObject.translations.my_maps,explanation:jsObject.translations.my_maps_explanation,data:{makeComponent:n=>o`<dash-maps ?showTeaser=${n}></dash-maps>`}},{name:"not-found",pattern:"*",icon:"",type:"dash-link",data:{makeComponent:n=>o`<dash-not-found></dash-not-found>`}}]}class b extends $e(as(g)){static get properties(){return{route:{type:String},params:{type:Object},query:{type:Object},menuOffset:{type:Number,attribute:!1},userProfile:{type:Object,attribute:!1},userState:{type:Object,attribute:!1},wizardType:{type:String,attribute:!1},celbrationModalContent:{type:Object,attribute:!1}}}static get routes(){const t={1:"getting-started",2:"training",3:"practicing"},e=jsObject.user_stage.value||1,s=e<4?e:3,i=Qt().find(({name:l})=>l===t[s]),{makeComponent:a}=i.data;return Qt().map(l=>(l.name==="root"&&(l.data={makeComponent:a}),l))}static getRoute(t){return b.routes.find(s=>s.name===t)}static childRoutesOf(t){return b.routes.filter(({parent:s})=>s===t)}constructor(){super(),this.route="",this.params={},this.query={},this.data={},this.menuOffset=0,this.userProfile=jsObject.profile,this.userState=jsObject.user_stage.state,this.wizardType="",this.celebrationModalContent={title:"",content:[]},this.allCtas=[],this.ctas=[],this.userId=jsObject.profile.user_id,this.showingCelebrationModal=!1,this.languageSelectorElements=document.querySelectorAll(".language-selector"),this.updateUserProfile=this.updateUserProfile.bind(this),this.updateWizardType=this.updateWizardType.bind(this),this.refetchState=this.refetchState.bind(this),this.refetchHost=this.refetchHost.bind(this),this.getCtas=this.getCtas.bind(this),this.showCelebrationModal=this.showCelebrationModal.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("user-profile:change",this.updateUserProfile),window.addEventListener("toggle-dashboard-sidebar",this.toggleSidebar),window.addEventListener("open-wizard",this.updateWizardType),window.addEventListener("wizard-finished",this.closeWizard),window.addEventListener("wizard-finished",this.getCtas),window.addEventListener("open-3-month-plan",this.open3MonthPlan),window.addEventListener("user-state:change",this.refetchState),window.addEventListener("user-state:change",this.getCtas),window.addEventListener("user-host:change",this.refetchHost),window.addEventListener("load",this.showCelebrationModal),window.addEventListener("ctas:changed",this.showCelebrationModal),this.addEventListener("route",this.updateLanguageSwitcher)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("user-profile:change",this.updateUserProfile),window.removeEventListener("toggle-dashboard-sidebar",this.toggleSidebar),window.removeEventListener("open-wizard",this.updateWizardType),window.removeEventListener("wizard-finished",this.closeWizard),window.removeEventListener("wizard-finished",this.getCtas),window.removeEventListener("open-3-month-plan",this.open3MonthPlan),window.removeEventListener("user-state:change",this.refetchState),window.removeEventListener("user-state:change",this.getCtas),window.removeEventListener("user-host:change",this.refetchHost),window.removeEventListener("load",this.showCelebrationModal),window.removeEventListener("ctas:changed",this.showCelebrationModal),this.removeEventListener("route",this.updateLanguageSwitcher)}firstUpdated(){this.menuOffset=this.getOffsetTop(".sidebar-wrapper"),this.getCtas();const t=this.renderRoot.querySelector("#celebration-modal");t==null||t.addEventListener("closed.zf.reveal",()=>{this.showingCelebrationModal=!1})}updateWizardType(t){const e=t.detail.type;this.openWizard(e)}router(t,e,s,i){this.route=t,this.params=e,this.query=s,this.data=i,this.dispatchEvent(new CustomEvent("route"))}makeHref(t){return`${jsObject.base_url}/${t}`}makeHrefRoute(t){const s=b.routes.find(({name:i})=>i===t);return s?s.pattern:(console.error("MISSING ROUTE",t),"")}renderRoute(){const{makeComponent:t}=this.data;if(!t)return"";const e=b.getLockedStatus(this.route,this.userState);return t(e)}getOffsetTop(t){return this.querySelector(t).offsetTop}toggleSidebar(){const t=document.querySelector(".dashboard__sidebar"),e=document.querySelector(".sidebar__trigger-close-background"),s="200";t.style.transitionDuration=s,e.style.transitionDuration=s;const i=t.dataset.state;i==="open"&&(t.dataset.state="closed",e.style.opacity=0,setTimeout(()=>{e.style.visibility="hidden"},s)),(!i||i==="closed")&&(t.dataset.state="open",e.style.opacity="initial",e.style.visibility="visible")}updateLanguageSwitcher(){this.languageSelectorElements.forEach(t=>{const e=t.dataset.url,s=e.indexOf("dashboard"),i=e.slice(0,s+10)+this.route;t.dataset.url=i})}updateUserProfile(t){const e=t.detail;this.userProfile=e}createInitials(t){return typeof t!="string"||t.length===0?"":t.split(" ").map(s=>s.length>0?s[0].toUpperCase():"").slice(0,2).join("")}static getCompletedStatus(t,e){return!!(t==="set-profile"&&e.set_profile_location&&e.set_profile_name||t==="get-a-coach"&&e.requested_a_coach||t==="join-a-training"&&(e.plan_created||e.joined_online_training)||t==="3-month-plan"&&e.made_post_training_plan)}static getLockedStatus(t,e){return!!(t==="my-plans"&&!e.made_post_training_plan||["my-churches","my-maps"].includes(t)&&!e.join_community||t==="3-month-plan"&&!e.can_create_3_month_plan||t==="my-training"&&!e.plan_created&&!e.joined_online_training)}getGettingStartedPercentage(){const t=["get-a-coach","set-profile","join-a-training"],e=t.reduce((s,i)=>b.getCompletedStatus(i,this.userState)?s+1:s,0);return Math.round(e/t.length*100)}openWizard(t){const e=document.querySelector("#wizard-modal");jQuery(e).foundation("open"),this.wizardType=t}closeWizard(){this.wizardType="";const t=document.querySelector("#wizard-modal");jQuery(t).foundation("close")}open3MonthPlan(){const t=document.querySelector("#activity-3-month-plan-modal");jQuery(t).foundation("_disableScroll"),jQuery(t).foundation("open")}close3MonthPlan(){const t=document.querySelector("#activity-3-month-plan-modal");jQuery(t).foundation("_enableScroll"),jQuery(t).foundation("close")}handleCreated3MonthPlan(){this.dispatchEvent(new CustomEvent("user-state:change",{bubbles:!0})),this.close3MonthPlan(),this.navigate(this.makeHref("my-plans"))}refetchState(){this.getCtas(),makeRequest("GET","user_stage",{},"zume_system/v1").done(t=>{(!t||!t.state)&&console.error("Stage or state data not returned from api"),jsObject.user_stage=t,this.userState=t.state})}refetchHost(){makeRequest("GET","user_host",{},"zume_system/v1").done(t=>{t||console.error("Host not returned from api"),jsObject.host_progress=t})}getCtas(){makeRequest("POST","user_ctas",{user_id:this.userId,language:jsObject.language},"zume_system/v1").done(t=>{const e=Object.values(t);this.allCtas=e;const s=l=>{for(let c=l.length-1;c>0;c--){const d=Math.floor(Math.random()*(c+1));[l[c],l[d]]=[l[d],l[c]]}return l},i=this.allCtas.filter(({content_template:l})=>l==="celebration"),a=this.allCtas.filter(({content_template:l})=>l==="card"),r=[...i,...s(a)];this.allCtas=r,jsObject.allCtas=this.allCtas,this.dispatchEvent(new CustomEvent("ctas:changed",{bubbles:!0}))})}showCelebrationModal(){if(this.showingCelebrationModal)return;const t=this.renderRoot.querySelector("dash-cta"),e=this.allCtas.filter(({content_template:s})=>s==="celebration");if(!t&&e.length>0){this.showingCelebrationModal=!0,e.forEach(({content:{title:a,description:r}})=>{this.celebrationModalContent.title=r,this.celebrationModalContent.content.push(a)}),this.requestUpdate();const s=document.querySelector("#celebration-modal");jQuery(s).foundation("open"),e.forEach(({type:a,subtype:r})=>{makeRequest("POST","log",{type:a,subtype:r},"zume_system/v1")});const i=e.map(({key:a})=>a);jsObject.allCtas=jsObject.allCtas.filter(({key:a})=>!i.includes(a))}}openProfile(){const t=document.querySelector("#profile-modal");jQuery(t).foundation("open")}closeProfile(){const t=document.querySelector("#profile-modal");jQuery(t).foundation("close")}openCommunityModal(t){t.preventDefault();const e=document.querySelector("#community-modal");jQuery(e).foundation("open")}closeCommunityModal(){const t=document.querySelector("#community-modal");jQuery(t).foundation("close")}joinCommunity(){makeRequest("POST","log",{type:"system",subtype:"join_community"},"zume_system/v1/").done(t=>{this.refetchState()})}hasJoinedCommunity(){return!!this.userState.join_community}openResourcesModal(t){t.preventDefault();const e=document.querySelector("#resources-modal");jQuery(e).foundation("open")}closeResourcesModal(){const t=document.querySelector("#resources-modal");jQuery(t).foundation("close")}unlock3MonthPlan(){makeRequest("POST","log",{type:"training",subtype:"26_heard"},"zume_system/v1/").done(t=>{const e=new CustomEvent("user-state:change",{bubbles:!0});this.dispatchEvent(e);const s=new CustomEvent("user-host:change",{bubbles:!0});this.dispatchEvent(s)})}render(){return o`
            <div class="sidebar__trigger-close-background" @click=${this.toggleSidebar}></div>
            <div class="dashboard">

                <div class="dashboard__sidebar">
                    <div
                        class="sidebar-wrapper"
                        style="top: ${this.menuOffset}px; height: calc( min( 100%, 100vh ) - ${this.menuOffset}px - var(--s0) );"
                    >
                        <button
                            class="close-btn ms-auto dashboard__sidebar-toggle break-large break-medium"
                            aria-label=${jsObject.translations.close}
                            type="button"
                            @click=${this.toggleSidebar}
                        >
                            <span class="icon zume-close"></span>
                        </button>
                        <div class="profile-area">
                            <button
                                class="profile-btn"
                                @click=${this.openProfile}
                            >
                                ${this.createInitials(this.userProfile.name)}
                            </button>
                            <span class="profile-name">${this.userProfile.name}</span>
                        </div>
                        <ul
                            class="stack-2 | progress-menu accordion-menu"
                            data-accordion-menu
                            data-submenu-toggle="true"
                        >
                            <li class="menu-section">
                                <nav-link
                                    href=${this.makeHref("getting-started")}
                                    class="menu-section__title menu-btn"
                                    icon="zume-start"
                                    text=${jsObject.translations.getting_started}>
                                </nav-link>
                                <progress-circle percent=${this.getGettingStartedPercentage()} radius="12"></progress-circle>
                                <ul class="nested is-active">
                                    ${b.childRoutesOf("getting-started").map(t=>o`
                                                <li>
                                                    <nav-link
                                                        class="menu-btn"
                                                        href=${this.makeHrefRoute(t.name)}
                                                        icon=${t.icon}
                                                        text=${t.translation}
                                                        ?disableNavigate=${t.type==="handled-link"}
                                                        @click=${t.type==="handled-link"?e=>{if(b.getCompletedStatus(t.name,this.userState)){e.preventDefault();return}t.clickHandler(e,this.dispatchEvent)}:null}
                                                        ?completed=${b.getCompletedStatus(t.name,this.userState)}
                                                    ></nav-link>
                                                    <span class="icon zume-check-mark success"></span>
                                                </li>
                                            `)}
                                </ul>
                            </li>
                            <li class="menu-section">
                                <nav-link
                                    href=${this.makeHref("training")}
                                    class="menu-section__title menu-btn"
                                    icon="zume-training"
                                    text=${jsObject.translations.training}
                                >
                                </nav-link>
                                <ul class="nested is-active">
                                    ${b.childRoutesOf("training").map(t=>{const e=b.getLockedStatus(t.name,this.userState),s=b.getCompletedStatus(t.name,this.userState),i=t.type==="handled-link";return o`
                                                <li>
                                                    <nav-link
                                                        class="menu-btn"
                                                        href=${this.makeHrefRoute(t.name)}
                                                        icon=${t.icon}
                                                        text=${t.translation}
                                                        ?locked=${e}
                                                        ?disableNavigate=${i}
                                                        @click=${i?a=>{if(s){a.preventDefault();return}t.clickHandler(a,this.dispatchEvent)}:null}
                                                        ?completed=${s}
                                                    ></nav-link>
                                                    <span class="icon ${e?"zume-locked gray-500":"zume-check-mark success"}"></span>
                                                </li>
                                            `})}
                                </ul>
                            </li>
                            <li class="menu-section">
                                <nav-link
                                    href=${this.makeHref("practicing")}
                                    class="menu-section__title menu-btn"
                                    icon="zume-practicing"
                                    text=${jsObject.translations.practicing}
                                ></nav-link>
                                <ul class="nested is-active">
                                    ${b.childRoutesOf("practicing").map(t=>o`
                                                <li>
                                                    <nav-link
                                                        class="menu-btn"
                                                        href=${this.makeHrefRoute(t.name)}
                                                        icon=${t.icon}
                                                        text=${t.translation}
                                                        ?locked=${b.getLockedStatus(t.name,this.userState)}
                                                    ></nav-link>
                                                    <span class="icon zume-locked gray-500"></span>
                                                </li>
                                            `)}
                                </ul>
                            </li>
                        </ul>
                        <div class="footer-links">
                            <nav-link
                                class="menu-btn | f--1"
                                href=''
                                icon='zume-community'
                                text=${this.hasJoinedCommunity()?jsObject.translations.community:jsObject.translations.join_the_community}
                                ?disableNavigate=${!0}
                                @click=${this.openCommunityModal}
                            ></nav-link>
                            <nav-link
                                class="menu-btn | f--1"
                                href=''
                                icon='zume-resources'
                                text=${jsObject.translations.resources}
                                ?disableNavigate=${!0}
                                @click=${this.openResourcesModal}
                            ></nav-link>
                        </div>
                    </div>
                </div>

                ${this.renderRoute()}
            </div>
            <div class="stack | reveal tiny card celebration showing | border-none" id="celebration-modal" data-reveal>
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.closeProfile}>
                    <span class="icon zume-close"></span>
                </button>
                <h2 class="h5 text-center bold">${this.celebrationModalContent.title}</h2>
                <div class="d-flex align-items-center justify-content-between">
                    <img class="w-30" src="${jsObject.images_url+"/fireworks-2.svg"}" alt="" />
                    <img class="w-40" src="${jsObject.images_url+"/thumbs-up.svg"}" alt="" />
                    <img class="w-30" src="${jsObject.images_url+"/fireworks-2.svg"}" alt="" />
                </div>
                <div class="stack--3">
                    ${this.celebrationModalContent.content.map(t=>o`
                            <p><span class="icon zume-check-mark"></span> ${t}</p>
                        `)}
                </div>

            </div>
            <div class="reveal full" id="profile-modal" data-reveal>
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.closeProfile}>
                    <span class="icon zume-close"></span>
                </button>
                <div class="container-xsm my-0">
                    <h3>${jsObject.translations.edit_profile}</h3>
                    <profile-form .userProfile=${this.userProfile}></profile-form>
                    <a href=${jsObject.urls.logout} class="btn outline">${jsObject.translations.logout}</a>
                </div>
            </div>
            <div class="reveal full" id="wizard-modal" data-reveal>
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.closeWizard}>
                    <span class="icon zume-close"></span>
                </button>
                <zume-wizard
                    type=${this.wizardType}
                    .user=${this.userProfile}
                    .translations=${jsObject.wizard_translations}
                    noUrlChange
                ></zume-wizard>
            </div>
            <div class="reveal full" id="activity-3-month-plan-modal" data-reveal>
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.closeWizard}>
                    <span class="icon zume-close"></span>
                </button>
                ${b.getLockedStatus("3-month-plan",this.userState)?o`
                            <div class="container-sm">
                              <div class="dash-menu__list-item" data-locked="false" data-completed="false">
                                <div class="dash-menu__icon-area | stack--5">
                                  <span class="icon zume-progress dash-menu__list-icon"></span>
                                </div>
                                <div class="dash-menu__text-area | switcher | switcher-width-20">
                                  <div>
                                    <h3 class="f-1 bold uppercase">${jsObject.translations.locked_3_month_plan}</h3>
                                    <p>${jsObject.translations.locked_3_month_plan_explanation}</p>
                                  </div>
                                  <button class="dash-menu__view-button btn tight" @click=${this.unlock3MonthPlan}>${jsObject.translations.locked_3_month_plan_button}</button>
                                </div>
                              </div>
                            </div>
                        `:o`
                        <activity-3-month-plan
                            .questions=${jsObject.three_month_plan_questions}
                            .translations=${{save:jsObject.translations.save,cancel:jsObject.translations.cancel}}
                            user_id=${this.userProfile.user_id}
                            contact_id=${this.userProfile.contact_id}
                            @3-month-plan-saved=${this.handleCreated3MonthPlan}
                            @3-month-plan-cancelled=${this.close3MonthPlan}
                            showCancel
                        ></activity-3-month-plan>
                    `}

            </div>
            <div class="reveal full" id="resources-modal" data-reveal>
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.closeResourcesModal}>
                    <span class="icon zume-close"></span>
                </button>
                <div class="container-xsm">
                    <h1>Resources</h1>
                    <p>All the resources</p>
                    <ul role="list">
                        <li>in a</li>
                        <li>great big</li>
                        <li>list</li>
                    </ul>
                </div>
            </div>
            <div class="reveal full" id="community-modal" data-reveal>
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.closeCommunityModal}>
                    <span class="icon zume-close"></span>
                </button>
                <div class="container-xsm">
                    <h1>Practitioner Community</h1>
                    ${this.hasJoinedCommunity()?o`
                            <p>Here is all the community stuff we promised you :)</p>
                        `:o`
                            <p>There are lot's of good reasons to join the community here</p>
                            <button class="btn" @click=${this.joinCommunity}>
                                Join
                            </button>
                        `}
                </div>

            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-board",b);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zt=(n,t,e)=>{const s=new Map;for(let i=t;i<=e;i++)s.set(n[i],i);return s},B=ve(class extends be{constructor(n){if(super(n),n.type!==U.CHILD)throw Error("repeat() can only be used in text expressions")}dt(n,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);const i=[],a=[];let r=0;for(const l of n)i[r]=s?s(l,r):r,a[r]=e(l,r),r++;return{values:a,keys:i}}render(n,t,e){return this.dt(n,t,e).values}update(n,[t,e,s]){var i;const a=Fe(n),{values:r,keys:l}=this.dt(t,e,s);if(!Array.isArray(a))return this.ht=l,r;const c=(i=this.ht)!==null&&i!==void 0?i:this.ht=[],d=[];let v,u,p=0,m=a.length-1,f=0,$=r.length-1;for(;p<=m&&f<=$;)if(a[p]===null)p++;else if(a[m]===null)m--;else if(c[p]===l[f])d[f]=q(a[p],r[f]),p++,f++;else if(c[m]===l[$])d[$]=q(a[m],r[$]),m--,$--;else if(c[p]===l[$])d[$]=q(a[p],r[$]),G(n,d[$+1],a[p]),p++,$--;else if(c[m]===l[f])d[f]=q(a[m],r[f]),G(n,a[p],a[m]),m--,f++;else if(v===void 0&&(v=Zt(l,f,$),u=Zt(c,p,m)),v.has(c[p]))if(v.has(c[m])){const z=u.get(l[f]),vt=z!==void 0?a[z]:null;if(vt===null){const Pt=G(n,a[p]);q(Pt,r[f]),d[f]=Pt}else d[f]=q(vt,r[f]),G(n,a[p],vt),a[z]=null;f++}else St(a[m]),m--;else St(a[p]),p++;for(;f<=$;){const z=G(n,d[$+1]);q(z,r[f]),d[f++]=z}for(;p<=m;){const z=a[p++];z!==null&&St(z)}return this.ht=l,fe(n,d),O}});class I extends g{constructor(){super();const e=document.querySelector("html").dataset.dir;this.isRtl=e==="rtl"}firstUpdated(){this.attachResizeObeserver(),this.updateHeaderStyle(),window.scrollTo({top:0,behavior:"instant"})}attachResizeObeserver(){const t=document.querySelector("dash-header-right"),e=new ResizeObserver(s=>{for(let i of s){if(!i.contentRect)return;const a=Math.round(i.contentRect.height),r=Math.round(i.contentRect.width);this.updateHeaderStyle(!1,a,r)}});this.resizeObserver=e,e.observe(t)}updateHeaderStyle(t=!0,e=0,s=window.innerWidth){const i=document.querySelector(".dashboard__header.left");t&&(this.initialOffset=i.offsetTop);let a;s<window.innerWidth/2?a=this.initialOffset:a=this.initialOffset+e,i.style.top=a+"px"}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver&&this.resizeObserver.disconnect()}}class rs extends I{static get properties(){return{showTeaser:{type:Boolean},churches:{type:Array,attribute:!1}}}constructor(){super(),this.showTeaser=!1,this.route=b.getRoute("my-churches"),this.churches=[],this.renderChurch=this.renderChurch.bind(this),this.addChurch=this.addChurch.bind(this),this.handleSubmit=this.handleSubmit.bind(this)}firstUpdated(){super.firstUpdated(),document.querySelector("#add-church-form").addEventListener("submit",this.handleSubmit)}updated(){jQuery(document).foundation()}joinCommunity(){makeRequest("POST","log",{type:"system",subtype:"join_community"},"zume_system/v1/").done(t=>{const e=new CustomEvent("user-state:change",{bubbles:!0});this.dispatchEvent(e)})}handleSubmit(t){t.preventDefault(),this.addChurch()}addChurch(){const t=this.churches.length+1,e=[{id:t,name:"This is a new church",location:"Birmingham, UK",depth:0},{id:`${t}-1`,name:"Tea Shop 1",location:"Birmingham, UK",parent:t,depth:1},{id:`${t}-2`,name:"Tea Shop 2",location:"Birmingham, UK",parent:t,depth:1},{id:`${t}-2-1`,name:"Tea Shop 2 child",location:"Birmingham, UK",parent:`${t}-2`,depth:2},{id:`${t}-3`,name:"Breakfast Shop",location:"Birmingham, UK",parent:t,depth:1}];this.churches=[...this.churches,...e],this.closeChurchModal()}editChurch(t){console.log("edit church",t)}deleteChurch(t){console.log("delete church",t)}openChurchModal(){if(this.showTeaser)return;const t=document.querySelector("#new-church-form");jQuery(t).foundation("open")}closeChurchModal(){const t=document.querySelector("#new-church-form");jQuery(t).foundation("close"),this.clearChurchModal()}clearChurchModal(){jQuery("#add-church-form input").each(function(t){this.value=""})}renderChurch({id:t,name:e,location:s,depth:i}){return o`
            <li
                class="list__item"
                data-depth=${i}
                style=${`--depth: ${i}`}
            >
                <div class="list__primary f-medium" data-large-gap>
                    <span>${e}</span>
                    <span>${s}</span>
                </div>
                <div class="list__secondary">
                    <button class="icon-btn" data-toggle="kebab-menu-${t}">
                        <span class="icon zume-kebab brand-light"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${t}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li><button class="menu-btn" @click=${()=>this.editChurch(t)}><span class="icon zume-pencil"></span>${jsObject.translations.edit}</button></li>
                        <li><button class="menu-btn" @click=${()=>this.deleteChurch(t)}><span class="icon zume-trash"></span>${jsObject.translations.delete}</button></li>
                    </ul>
                </div>
            </li>
        `}render(){return o`
            <div class="dashboard__content" data-no-secondary-area>
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
                                <span class="icon zume-filter" aria-hidden="true"></span>
                            </button>
                            <button class="icon-btn f-2" @click=${this.openChurchModal} ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser?"true":"false"}>
                                <span class="visually-hidden">${jsObject.translations.add_church}</span>
                                <span class="icon zume-plus" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                        <ul>
                        </ul>
                    </div>
                </div>
                <dash-header-right></dash-header-right>

                <div class="dashboard__main p-2">
                    ${this.showTeaser?o`
                            <div class="container-inline">
                              <div class="dash-menu__list-item" data-locked="false" data-completed="false">
                                <div class="dash-menu__icon-area | stack--5">
                                  <span class="icon zume-locked dash-menu__list-icon"></span>
                                </div>
                                <div class="dash-menu__text-area | switcher | switcher-width-20">
                                  <div>
                                    <h3 class="f-1 bold uppercase">My Churches are Locked</h3>
                                    <p>My Churches tool makes it easy for you to track your simple church and the simple church generations that grow out of your spiritual family.</p>
                                  </div>
                                  <button class="dash-menu__view-button btn tight" @click=${this.joinCommunity}>
                                    ${jsObject.translations.join}
                                  </button>
                                </div>
                              </div>
                            </div>

                        `:o`
                            <ul class="list">
                                ${this.churches.length===0?o`
                                        <li
                                            role="button"
                                            class="list__item bg-brand-light white f-medium"
                                            data-depth=${0}
                                            @click=${this.addChurch}
                                        >
                                            ${jsObject.translations.add_first_church}
                                        </li>
                                    `:B(this.churches,t=>`${t.id}`,this.renderChurch)}
                            </ul>

                        `}
                </div>

            </div>
            <div class="reveal medium" id="new-church-form" data-reveal data-v-offset="20">
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.clearChurchModal}>
                        <span class="icon zume-close"></span>
                </button>
                <div class="stack">
                    <h2>${jsObject.translations.my_churches}</h2>
                    <div id="add-church-form">
                        <div>
                            <label for="church-name">${jsObject.translations.church_name}</label>
                            <input id="church-name" name="church-name" type="text" />
                        </div>
                        <div>
                            <label for="number-of-people">${jsObject.translations.number_of_people}</label>
                            <input id="number-of-people" name="number-of-people" type="text" />
                        </div>
                        <div>
                            <label for="church-location">${jsObject.translations.church_location}</label>
                            <input id="church-location" name="church-location" type="text" />
                        </div>
                        <div>
                            <label for="parent-church">${jsObject.translations.parent_church}</label>
                            <input id="parent-church" name="parent-church" type="text" />
                        </div>
                        <div class="cluster">
                            <button class="btn light uppercase" @click=${this.addChurch}>${jsObject.translations.add_new_church}</button>
                            <button class="btn light uppercase outline" type="button" @click=${this.closeChurchModal}>${jsObject.translations.cancel}</button>
                        </div>
                    </div>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-churches",rs);class os extends I{render(){return o`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <dash-sidebar-toggle></dash-sidebar-toggle>
                    <h1 class="h3">${jsObject.translations.my_coach}</h1>
                </div>
                <dash-header-right></dash-header-right>

              <div class="dashboard__main p-2">
                  <div class="container-inline">
                    <div class="dash-menu__list-item" data-locked="false" data-completed="false">
                      <div class="dash-menu__icon-area | stack--5">
                        <span class="icon zume-locked dash-menu__list-icon"></span>
                      </div>
                      <div class="dash-menu__text-area | switcher | switcher-width-20">
                        <div>
                          <h3 class="f-1 bold uppercase">${jsObject.translations.get_a_coach}</h3>
                          <p>${jsObject.translations.get_a_coach_explanation}</p>
                        </div>
                        <button class="dash-menu__view-button btn tight" @click=${this.joinCommunity}>
                          ${jsObject.translations.get_a_coach}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-coach",os);const N=class extends g{static get properties(){return{ctas:{type:Array,attribute:!1}}}constructor(){super(),this.allCtas=[],this.ctas=[],this.celebrations=[],this.hiddenCtaKeys=[],this.initialCtaKeys=[],this.removedCtaKeys=[],this.manageCtas=this.manageCtas.bind(this),this.transitionIn=this.transitionIn.bind(this),this.transitionCtas=this.transitionCtas.bind(this),this.renderCta=this.renderCta.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("ctas:changed",this.manageCtas),this.addEventListener("begin-cta-transitions",this.transitionIn),this.addEventListener("cta-transition-in-ended",this.logCelebrationsSeen)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("ctas:changed",this.manageCtas),this.removeEventListener("begin-cta-transitions",this.transitionIn),this.removeEventListener("cta-transition-in-ended",this.logCelebrationsSeen)}firstUpdated(){this.manageCtas()}updated(){this.dispatchEventAfterUpdated&&(this.dispatchEventAfterUpdated=!1,setTimeout(()=>{this.dispatchEvent(new CustomEvent("begin-cta-transitions"))},10))}manageCtas(){const t=this.getCtas(),[e,s,i]=this.diffCtas(t,this.ctas),a=[...e,...s].filter(({content_template:v})=>v==="celebration"),r=[...e,...s].filter(({content_template:v})=>v!=="celebration"),l=[...a,...r],c=this.getCtaKeys(l),d=this.getCtaKeys(i);this.ctas=l,this.celebrations=a,this.hiddenCtaKeys=this.getCtaKeys(e),this.removedCtaKeys=[...d,...c.slice(N.MAX_CTAS)],this.initialCtaKeys=c.slice(0,N.MAX_CTAS),this.ctas.length>1&&(this.dispatchEventAfterUpdated=!0)}getCtas(){return jsObject.allCtas??[]}diffCtas(t,e){const s=t.filter(({key:r})=>e.findIndex(({key:l})=>l===r)===-1),i=e.filter(({key:r})=>t.findIndex(({key:l})=>l===r)===-1),a=e.filter(({key:r})=>t.findIndex(({key:l})=>l===r)>-1);return[s,a,i]}transitionIn(){this.transitionCtas(this.removedCtaKeys,this.initialCtaKeys),setTimeout(()=>{this.dispatchEvent(new CustomEvent("cta-transition-in-ended"))},N.TRANSITION_TIMEOUT)}logCelebrationsSeen(){this.celebrations.forEach(({type:e,subtype:s})=>{makeRequest("POST","log",{type:e,subtype:s},"zume_system/v1")});const t=this.getCtaKeys(this.celebrations);jsObject.allCtas=jsObject.allCtas.filter(({key:e})=>!t.includes(e))}transitionCtas(t,e){(t.length>0?this.getCtaElements(t):[]).forEach(a=>{a&&(a.style.height=a.clientHeight+"px",setTimeout(()=>{a.classList.add("transition-out"),a.style.height=""},10))}),(e.length>0?this.getCtaElements(e):[]).forEach(a=>{a&&(a.classList.remove("hiding"),a.classList.add("showing"))})}getCtaElements(t){return this.renderRoot.querySelectorAll(t.map(e=>`[data-key="${e}"]`).join(","))}getCtaKeys(t){return t.map(({key:e})=>e)}isWizardLink(t){return t.includes("/wizard/")}openWizard(t){const e=t.split("/"),s=e[e.length-1];dispatchEvent(new CustomEvent("open-wizard",{bubbles:!0,detail:{type:s}}))}renderCta({content:t,content_template:e,key:s}){const i=this.hiddenCtaKeys.includes(s)?"hiding":"showing";if(e==="card")return o`
                <div class="stack | card cta ${i}" data-key=${s} style="--duration: ${N.TRANSITION_TIMEOUT}ms">
                    <h2 class="h5 text-center">${t.title}</h2>
                    <p>${t.description}</p>
                    ${this.isWizardLink(t.link)?o`
                            <button class="btn light uppercase" @click=${()=>this.openWizard(t.link)}>${t.link_text}</button>
                        `:o`
                            <a href="${t.link}" class="btn light uppercase">${t.link_text}</a>
                        `}

                </div>
            `;if(e==="celebration")return o`
                <div class="stack | card celebration ${i}" data-key=${s} style="--duration: ${N.TRANSITION_TIMEOUT}ms">
                    <h2 class="h5 text-center bold">${t.title}</h2>
                    <div class="d-flex align-items-center justify-content-between">
                        <img src="${jsObject.images_url+"/fireworks-2.svg"}" alt="" />
                        <img src="${t.image_url}" alt="" />
                        <img src="${jsObject.images_url+"/fireworks-2.svg"}" alt="" />
                    </div>
                    <p>${t.description}</p>
                </div>
            `}render(){return o`
            <div class="stack-margin-bottom">
                ${B(this.ctas,t=>t.key,this.renderCta)}
            </div>
        `}createRenderRoot(){return this}};let W=N;w(W,"FADE_TIMEOUT",3e3),w(W,"TRANSITION_TIMEOUT",500),w(W,"MAX_CTAS",3);customElements.define("dash-cta",W);class gt extends I{static get properties(){return{view:{type:String,attribute:!1},userState:{type:Object,attribute:!1}}}constructor(t){super(),this.routeName=t,this.route=b.getRoute(this.routeName),this.routes=b.childRoutesOf(this.routeName),this.view="list",this.userState=jsObject.user_stage.state,this.refetchState=this.refetchState.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("user-state:change",this.refetchState)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("user-state:change",this.refetchState)}switchView(t="list"){this.view=t}refetchState(){makeRequest("GET","user_stage",{},"zume_system/v1").done(t=>{console.log(this,t),(!t||!t.state)&&console.error("Stage or state data not returned from api"),jsObject.user_stage=t,this.userState=t.state})}renderLinks(t){return this.view==="grid"?o`
                <div class="nav-grid">
                    ${this.routes.map(e=>o`
                        <grid-link
                            href=${e.pattern}
                            text=${e.translation||""}
                            icon=${e.icon}
                            ?disableNavigate=${e.type==="handled-link"}
                            @click=${e.type==="handled-link"?s=>{b.getCompletedStatus(e.name,t)||e.clickHandler(s,this.dispatchEvent)}:null}
                            ?completed=${b.getCompletedStatus(e.name,t)}
                            ?locked=${b.getLockedStatus(e.name,t)}
                        >
                        </grid-link>
                        `)}
                </div>
            `:o`
            <div class="stack-3">
                ${this.routes.map(e=>o`
                    <list-link
                        href=${e.pattern}
                        text=${e.translation}
                        explanation=${e.explanation}
                        icon=${e.icon}
                        ?disableNavigate=${e.type==="handled-link"}
                        @click=${e.type==="handled-link"?s=>{b.getCompletedStatus(e.name,t)||e.clickHandler(s,this.dispatchEvent)}:null}
                        ?completed=${b.getCompletedStatus(e.name,t)}
                        ?locked=${b.getLockedStatus(e.name,t)}
                    >
                    </list-link>
                `)}
            </div>
        `}render(){return o`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <dash-sidebar-toggle></dash-sidebar-toggle>
                        <span class="icon ${this.route.icon}"></span>
                        <h1 class="h3">${this.route.translation}</h1>
                    </div>
                    <div class="icon-btn-group">
                        <button class="${this.view==="list"?"selected":""}" title=${jsObject.translations.list} @click=${()=>this.switchView("list")}>
                            <span class="icon zume-list" aria-hidden="true"></span>
                        </button>
                        <button class="${this.view==="grid"?"selected":""}" title=${jsObject.translations.grid} @click=${()=>this.switchView("grid")}>
                            <span class="icon zume-grid" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main p-2">
                    ${this.renderLinks(this.userState)}
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-top-level",gt);class ls extends gt{constructor(){super("getting-started")}createRenderRoot(){return this}}customElements.define("dash-getting-started",ls);class cs extends I{static get properties(){return{showTeaser:{type:Boolean}}}constructor(){super(),this.showTeaser=!1}joinCommunity(){makeRequest("POST","log",{type:"system",subtype:"join_community"},"zume_system/v1/").done(t=>{const e=new CustomEvent("user-state:change",{bubbles:!0});this.dispatchEvent(e)})}render(){return o`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <dash-sidebar-toggle></dash-sidebar-toggle>
                    <h1 class="h3">${jsObject.translations.my_maps}</h1>
                </div>
                <dash-header-right></dash-header-right>

                <div class="dashboard__main p-2">
                    ${this.showTeaser?o`
                            <div class="container-inline">
                              <div class="dash-menu__list-item" data-locked="false" data-completed="false">
                                <div class="dash-menu__icon-area | stack--5">
                                  <span class="icon zume-locked dash-menu__list-icon"></span>
                                </div>
                                <div class="dash-menu__text-area | switcher | switcher-width-20">
                                  <div>
                                    <h3 class="f-1 bold uppercase">${jsObject.translations.my_maps_locked}</h3>
                                    <p>${jsObject.translations.my_maps_explanation}</p>
                                  </div>
                                  <button class="dash-menu__view-button btn tight" @click=${this.joinCommunity}>
                                    ${jsObject.translations.join_the_community}
                                  </button>
                                </div>
                              </div>
                            </div>
                        `:o`
                            <p>You can now see your vision maps here. (If you imagine them hard enough)</p>
                        `}
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-maps",cs);class ds extends I{render(){return o`
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
        `}createRenderRoot(){return this}}customElements.define("dash-not-found",ds);class hs extends I{static get properties(){return{showTeaser:{type:Boolean},loading:{type:Boolean,attribute:!1},commitments:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1}}}constructor(){super(),this.showTeaser=!1,this.loading=!0,this.route=b.getRoute("my-plans"),this.filterName="my-plans-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.renderListItem=this.renderListItem.bind(this),this.closeCommitmentsModal=this.closeCommitmentsModal.bind(this)}firstUpdated(){super.firstUpdated();const t=this.filterStatus||"";this.fetchCommitments(t)}updated(){jQuery(document).foundation()}fetchCommitments(){const t=this.filterStatus;makeRequest("GET","commitments",{status:t},"zume_system/v1").done(e=>{this.commitments=e}).always(()=>{this.loading=!1})}openCommitmentsModal(){if(this.showTeaser)return;const t=document.querySelector("#new-commitments-form");jQuery(t).foundation("open")}closeCommitmentsModal(){const t=document.querySelector("#new-commitments-form");jQuery(t).foundation("close")}handleAddedCommitments(){this.fetchCommitments(),this.closeCommitmentsModal()}completeCommitment(t){let e={id:t,user_id:jsObject.profile.user_id};makeRequest("PUT","commitment",e,"zume_system/v1").done(s=>{this.fetchCommitments()})}deleteCommitment(t){let e={id:t,user_id:jsObject.profile.user_id};makeRequest("DELETE","commitment",e,"zume_system/v1").done(s=>{this.closeMenu(t),this.fetchCommitments()})}editCommitment(t){console.log(t)}filterCommitments(t){this.filterStatus=t,this.fetchCommitments(t),ZumeStorage.save(this.filterName,t),this.closeFilter()}closeFilter(){const t=this.querySelector("#filter-menu");jQuery(t).foundation("close")}closeMenu(t){const e=this.querySelector(`#kebab-menu-${t}`);jQuery(e).foundation("close")}renderListItem(t){const{question:e,answer:s,id:i,status:a}=t;return o`
            <li class="list__item | switcher | switcher-width-30">
                <span>${e} <b>${s}</b></span>
                <div class="list__secondary | grow-0">
                    <div class="d-flex w-6rem justify-content-center">
                        ${a==="closed"?o`<span class="icon zume-check-mark success"></span>`:o`
                                <button
                                    class="btn light uppercase tight break-anywhere"
                                    @click=${()=>this.completeCommitment(i)}
                                >
                                    ${jsObject.translations.done}
                                </button>
                            `}
                    </div>
                    <button class="icon-btn" data-toggle="kebab-menu-${i}">
                        <span class="icon zume-kebab brand-light"></span>
                    </button>
                </div>
                <div
                    class="dropdown-pane"
                    id="kebab-menu-${i}"
                    data-dropdown
                    data-auto-focus="true"
                    data-position="bottom"
                    data-alignment=${this.isRtl?"right":"left"}
                    data-close-on-click="true"
                    data-close-on-click-inside="true"
                >
                    <ul>
                        <li class="hidden"><button class="menu-btn" @click=${()=>this.editCommitment(i)}><span class="icon zume-pencil"></span>${jsObject.translations.edit}</button></li>
                        <li><button class="menu-btn" @click=${()=>this.deleteCommitment(i)}><span class="icon zume-trash"></span>${jsObject.translations.delete}</button></li>
                    </ul>
                </div>
            </li>

        `}render(){return o`
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
                                <span class="icon zume-filter" aria-hidden="true"></span>
                            </button>
                            <button class="icon-btn f-2" @click=${this.openCommitmentsModal} ?disabled=${this.showTeaser} aria-disabled=${this.showTeaser?"true":"false"}>
                                <span class="visually-hidden">${jsObject.translations.add_commitments}</span>
                                <span class="icon zume-plus" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                        <ul>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus==="open"?"selected":""}" @click=${()=>this.filterCommitments("open")}>
                                    <span class="icon zume-sort-todo" aria-hidden="true"></span>
                                    ${jsObject.translations.active}
                                </button>
                            </li>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus==="closed"?"selected":""}" @click=${()=>this.filterCommitments("closed")}>
                                    <span class="icon zume-sort-done" aria-hidden="true"></span>
                                    ${jsObject.translations.completed}
                                </button>
                            </li>
                            <li>
                                <button class="menu-btn w-100 ${this.filterStatus==="all"?"selected":""}" @click=${()=>this.filterCommitments("all")}>
                                    <span class="icon zume-sort-all" aria-hidden="true"></span>
                                    ${jsObject.translations.all}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="dashboard__main">
                    ${this.showTeaser?o`
                          <div class="container-inline p-2">
                            <div class="dash-menu__list-item" data-locked="false" data-completed="false">
                              <div class="dash-menu__icon-area | stack--5">
                                <span class="icon zume-locked dash-menu__list-icon"></span>
                              </div>
                              <div class="dash-menu__text-area | switcher | switcher-width-20">
                                <div>
                                  <h3 class="f-1 bold uppercase">${jsObject.translations.my_plans_locked}</h3>
                                  <p>${jsObject.translations.my_plans_locked_explanation}</p>
                                </div>
                                <button class="dash-menu__view-button btn tight" @click=${this.joinCommunity}>
                                  ${jsObject.translations.create_3_month_plan}
                                </button>
                              </div>
                            </div>
                          </div>
                        `:o`
                                <ul class="list">
                                  ${!this.loading&&this.commitments&&this.commitments.length>0?B(this.commitments,t=>t.id,this.renderListItem):""}
                                </ul>
                            `}
                </div>
            </div>
            <div class="reveal large" id="new-commitments-form" data-reveal data-v-offset="20">
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button" @click=${this.clearCommitmentsModal}>
                        <span class="icon zume-close"></span>
                </button>
                <activity-3-month-plan
                    .questions=${jsObject.three_month_plan_questions}
                    .translations=${{save:jsObject.translations.save,cancel:jsObject.translations.cancel}}
                    user_id=${jsObject.profile.user_id}
                    contact_id=${jsObject.profile.contact_id}
                    @3-month-plan-saved=${this.handleAddedCommitments}
                    @3-month-plan-cancelled=${this.closeCommitmentsModal}
                    showCancel
                ></activity-3-month-plan>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-plans",hs);class us extends gt{constructor(){super("practicing")}createRenderRoot(){return this}}customElements.define("dash-practicing",us);class ps extends I{static get properties(){return{loading:{type:Boolean,attribute:!1},filteredItems:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1},hostProgress:{type:Object,attribute:!1}}}constructor(){super(),this.loading=!1,this.route=b.getRoute("my-progress"),this.trainingItems=Object.values(jsObject.training_items),this.hostProgress=jsObject.host_progress,this.filterName="my-progress-filter",this.filterStatus=ZumeStorage.load(this.filterName),this.filteredItems=this.filterItems(this.filterStatus),this.openStates={},this.trainingItems.forEach(t=>{this.openStates[t.key]=!1}),this.renderListItem=this.renderListItem.bind(this),this.closeInfoModal=this.closeInfoModal.bind(this)}updated(){jQuery(document).foundation()}openInfoModal(){const t=document.querySelector("#new-commitments-form");jQuery(t).foundation("open")}closeInfoModal(){const t=document.querySelector("#new-commitments-form");jQuery(t).foundation("close")}filterProgress(t){this.filterStatus=t,this.filteredItems=this.filterItems(t),console.log(this.filteredItems),ZumeStorage.save(this.filterName,t),this.closeFilter()}filterItems(t){switch(t){case"heard":return this.trainingItems.filter(e=>{const s=e.host[0].key;return!!(this.hostProgress.list[s]||!1)});case"not-heard":return this.trainingItems.filter(e=>{const s=e.host[0].key;return!(this.hostProgress.list[s]||!1)});default:return[...this.trainingItems]}}closeFilter(){const t=this.querySelector("#filter-menu");jQuery(t).foundation("close")}toggleHost(t,e){e.stopImmediatePropagation();const{type:s,subtype:i,key:a}=t,r=this.hostProgress.list[a];r===!1&&makeRequest("POST","host",{type:s,subtype:i,user_id:jsObject.profile.user_id},"zume_system/v1").done(l=>{Array.isArray(l)&&(this.hostProgress.list[a]=!0),this.loadHostStatus()}),r===!0&&makeRequest("DELETE","host",{type:s,subtype:i,user_id:jsObject.profile.user_id},"zume_system/v1").done(l=>{Array.isArray(l)&&(this.hostProgress.list[a]=!1),this.loadHostStatus()})}loadHostStatus(){makeRequest("GET","host",{user_id:jsObject.profile.user_id},"zume_system/v1").done(t=>{this.hostProgress=t})}toggleDetails(t){const e=this.querySelector(`#details-${t}`),s=this.openStates[t],i=e.scrollHeight,a="200";s===!1?(e.style.height=i+"px",e.style.transitionDuration=a+"ms",e.dataset.state="opening",this.openStates[t]=!0,setTimeout(()=>{e.style.height="auto",e.dataset.state="open"},a)):(e.style.height=i+"px",e.dataset.state="closing",this.openStates[t]=!1,setTimeout(()=>{e.style.height="0"},10),setTimeout(()=>{e.dataset.state="closed"},a))}renderListItem(t){const{title:e,description:s,host:i,slug:a,key:r}=t;let l=[jsObject.site_url,jsObject.language,a].join("/");return jsObject.language==="en"&&(l=[jsObject.site_url,a].join("/")),o`
            <li class="switcher | switcher-width-30 list__item tight" @click=${()=>this.toggleDetails(r)} role="button">
                <div>
                    <h2 class="h5 bold m0">${e}</h2>
                    <div class="collapse" id="details-${r}" data-state="closed">
                        <div class="stack--2 mt--2">
                            <p class="f--1 gray-700">${s}</p>
                            <div class="cluster">
                                <share-links url=${l} title=${e} .t=${jsObject.share_translations}></share-links>

                                ${jsObject.has_pieces_pages?o`
                                        <a class="btn light uppercase" href=${l} @click=${c=>c.stopImmediatePropagation()}>${jsObject.translations.view}</a>
                                    `:""}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list__secondary grow-0" data-align-start>
                    <div class="training-progress">
                        <button
                            data-subtype=${i[0].subtype}
                            class=${this.hostProgress.list[i[0].key]?"active":""}
                            @click=${c=>this.toggleHost(i[0],c)}
                        >
                            <span class="icon zume-heard-concept"></span>
                        </button>
                        <button
                            data-subtype=${i[1].subtype}
                            class=${this.hostProgress.list[i[1].key]?"active":""}
                            @click=${c=>this.toggleHost(i[1],c)}
                        >
                            <span class="icon zume-obey-concept"></span>
                        </button>
                        <button
                            data-subtype=${i[2].subtype}
                            class=${this.hostProgress.list[i[2].key]?"active":""}
                            @click=${c=>this.toggleHost(i[2],c)}
                        >
                            <span class="icon zume-share-concept"></span>
                        </button>
                        <button
                            data-subtype=${i[3].subtype}
                            class=${this.hostProgress.list[i[3].key]?"active":""}
                            @click=${c=>this.toggleHost(i[3],c)}
                        >
                            <span class="icon zume-train-concept"></span>
                        </button>
                    </div>
                </div>
            </li>
        `}render(){var t,e,s,i,a,r,l,c;return o`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <dash-sidebar-toggle></dash-sidebar-toggle>
                        <span class="icon ${this.route.icon}"></span>
                        <h1 class="h3">${this.route.translation}</h1>
                        <div class="s0">
                            <button class="icon-btn f-2" data-toggle="filter-menu">
                                <span class="visually-hidden">${jsObject.translations.filter}</span>
                                <span class="icon zume-filter brand-light" aria-hidden="true"></span>
                            </button>
                            <button class="icon-btn f-2" @click=${this.openInfoModal}>
                                <span class="visually-hidden">${jsObject.translations.progress_info}</span>
                                <span class="icon zume-info brand-light" aria-hidden="true"></span>
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
                <div class="dashboard__main">
                    ${o`
                            <ul class="list">
                                ${B(this.filteredItems,d=>d.key,this.renderListItem)}
                            </ul>
                        `}
                </div>
                <div class="dashboard__secondary">
                    <dash-cta></dash-cta>
                </div>
            </div>
            <div class="reveal large" id="new-commitments-form" data-reveal data-v-offset="20">
                <button class="ms-auto close-btn" data-close aria-label=${jsObject.translations.close} type="button">
                        <span class="icon zume-close"></span>
                </button>
                <div class="stack-2 host-info mx-2">
                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="heard" percent=${((e=(t=this.hostProgress)==null?void 0:t.percent)==null?void 0:e.h)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.heard}</h3>
                            <p class="italic">${jsObject.translations.heard_explanation}</p>
                        </div>
                    </div>
                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="obeyed" percent=${((i=(s=this.hostProgress)==null?void 0:s.percent)==null?void 0:i.o)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.obeyed}</h3>
                            <p class="italic">${jsObject.translations.obeyed_explanation}</p>
                        </div>
                    </div>
                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="shared" percent=${((r=(a=this.hostProgress)==null?void 0:a.percent)==null?void 0:r.s)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.shared}</h3>
                            <p class="italic">${jsObject.translations.shared_explanation}</p>
                        </div>
                    </div>

                    <div class="switcher gap-1 align-items-center switcher-width-20">
                        <host-progress-circle class="grow-0" type="trained" percent=${((c=(l=this.hostProgress)==null?void 0:l.percent)==null?void 0:c.t)||0}></host-progress-circle>
                        <div class="stack--2">
                            <h3 class="bold">${jsObject.translations.trained}</h3>
                            <p class="italic">${jsObject.translations.trained_explanation}</p>
                        </div>
                    </div>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-progress",ps);class ms extends gt{constructor(){super("training")}createRenderRoot(){return this}}customElements.define("dash-training",ms);class gs extends I{static get properties(){return{showTeaser:{type:Boolean},loading:{type:Boolean,attribute:!1},sessions:{type:Array,attribute:!1},filterStatus:{type:String,attribute:!1}}}constructor(){super(),this.showTeaser=!1,this.loading=!1,this.route=b.getRoute("my-training"),this.currentSession="set_a_06",this.sessions=[{id:"set_a_01",name:"Session 1",datetime:1712077989881,completed:!0},{id:"set_a_02",name:"Session 2",datetime:1712077989881,completed:!0},{id:"set_a_03",name:"Session 3",datetime:1712077989881,completed:!0},{id:"set_a_04",name:"Session 4",datetime:1712077989881,completed:!0},{id:"set_a_05",name:"Session 5",datetime:1712077989881,completed:!0},{id:"set_a_06",name:"Session 6",datetime:1712077989881,completed:!1},{id:"set_a_07",name:"Session 7",datetime:1712077989881,completed:!1},{id:"set_a_08",name:"Session 8",datetime:1712077989881,completed:!1},{id:"set_a_09",name:"Session 9",datetime:1712077989881,completed:!1},{id:"set_a_10",name:"Session 10",datetime:1712077989881,completed:!1}],this.groupMembers=[{id:1,name:"Billy Bob"},{id:2,name:"Sandy Lou"},{id:3,name:"Willy Joe"},{id:4,name:"Bonnie Sue"}],this.renderListItem=this.renderListItem.bind(this)}firstUpdated(){super.firstUpdated()}editSession(t){}updated(){jQuery(document).foundation()}renderListItem(t){const{id:e,name:s,datetime:i,completed:a}=t;return o`
            <li class="list__item | switcher | switcher-width-20">
                <div class="list__primary">
                    ${this.currentSession===e?o`
                            <button class="icon-btn">
                                <span class="icon zume-play brand-light"></span>
                            </button>
                        `:o`
                            <span class="icon zume-check-mark success ${a?"":"invisible"} p--2"></span>
                        `}
                    <span class="f-medium">${s}</span>
                </div>
                <div class="list__secondary | grow-0">
                    <div class="d-flex w-6rem justify-content-center">
                        ${moment(i).format("MMM Do YY")}
                    </div>
                    <button class="icon-btn" data-toggle="kebab-menu-${e}">
                        <span class="icon zume-kebab brand-light"></span>
                    </button>
                </div>
                <div class="dropdown-pane" id="kebab-menu-${e}" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment=${this.isRtl?"right":"left"} data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li><button class="menu-btn" @click=${()=>this.editSession(e)}><span class="icon zume-pencil"></span>${jsObject.translations.edit_time}</button></li>
                    </ul>
                </div>
            </li>

        `}renderMemberItem(t){console.log(t);const{name:e}=t;return o`
            <li>
                ${e}
            </li>
        `}render(){return o`
            <div class="dashboard__content">
                <div class="dashboard__header left">
                    <div class="dashboard__title">
                        <dash-sidebar-toggle></dash-sidebar-toggle>
                        <span class="icon ${this.route.icon}"></span>
                        <h1 class="h3">${this.route.translation}</h1>
                    </div>
                </div>
                <dash-header-right></dash-header-right>
                <div class="dashboard__main p-2">
                    ${this.showTeaser?o`
                            <div class="container-inline">
                              <div class="dash-menu__list-item" data-locked="false" data-completed="false">
                                <div class="dash-menu__icon-area | stack--5">
                                  <span class="icon zume-locked dash-menu__list-icon"></span>
                                </div>
                                <div class="dash-menu__text-area | switcher | switcher-width-20">
                                  <div>
                                    <h3 class="f-1 bold uppercase">${jsObject.translations.my_training_locked}</h3>
                                    <p>${jsObject.translations.plan_a_training_explanation}</p>
                                  </div>
                                  <button class="dash-menu__view-button btn tight" @click=${this.joinCommunity}>
                                    ${jsObject.translations.plan_a_training}
                                  </button>
                                </div>
                              </div>
                            </div>
                        `:o`
                            <ul class="list">
                                ${!this.loading&&this.sessions&&this.sessions.length>0?B(this.sessions,t=>t.id,this.renderListItem):""}
                            </ul>
                        `}
                </div>
                <div class="dashboard__secondary stack">
                    <dash-cta></dash-cta>
                    <div class="card | group-members | grow-0">
                        <button class="f-0 f-medium d-flex align-items-center gap--2 black">
                            <span class="icon zume-group brand-light"></span> ${jsObject.translations.group_members} (${this.groupMembers.length})
                        </button>
                        <div class="collapse" data-state="open">
                            <!-- The functionality of the .collapse class needs to be refactored from dash-progress.js toggleDetails function to be re-used here -->
                            ${!this.loading&&this.groupMembers&&this.groupMembers.length>0?o`
                                    <ol class="ps-1">
                                        ${B(this.groupMembers,t=>t.id,this.renderMemberItem)}
                                    </ol>
                                `:""}
                        </div>
                        <button class="btn brand tight light mt--2">
                            ${jsObject.translations.invite_friends}
                        </button>
                    </div>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-trainings",gs);class vs extends g{firstUpdated(){const t=this.offsetTop;this.style.top=t+"px"}render(){return o`
            <div class="dashboard__header right">
                <dash-sidebar-toggle displayOn="medium"></dash-sidebar-toggle>
                <launch-course></launch-course>
            </div>
        `}createRenderRoot(){return this}}customElements.define("dash-header-right",vs);class bs extends g{static get properties(){return{displayOn:{type:String}}}constructor(){super(),this.displayOn="large"}toggleSidebar(){const t=new CustomEvent("toggle-dashboard-sidebar",{bubbles:!0});this.dispatchEvent(t)}render(){return o`
            <button class="btn f-0 light tight dashboard__sidebar-toggle break-${this.displayOn}" @click=${this.toggleSidebar}>${jsObject.translations.menu}</button>
        `}createRenderRoot(){return this}}customElements.define("dash-sidebar-toggle",bs);class At extends $e(g){static get properties(){return{href:{type:String},class:{type:String},locked:{type:Boolean},completed:{type:Boolean},disableNavigate:{type:Boolean},icon:{type:String},text:{type:String},explanation:{type:String}}}constructor(){super(),this.href="",this.class="",this.icon="",this.text="",this.explanation="",this.locked=!1,this.completed=!1,this.disableNavigate=!1}handleClick(t){this.disableNavigate||(t.preventDefault(),this.navigate(this.href))}printBool(t){return t?"true":"false"}render(){return o`
            <a
                href=${this.href}
                class=${this.class}
                @click=${this.handleClick}
                aria-disabled=${this.printBool(this.completed)}
                data-completed=${this.printBool(this.completed)}
                data-locked=${this.printBool(this.locked)}
            >
                <span class="icon ${this.icon} brand-light"></span>
                <span>${this.text}</span>
            </a>
        `}createRenderRoot(){return this}}customElements.define("nav-link",At);class fs extends At{constructor(){super()}renderText(){return this.text.split(" ").map(t=>o`
            <span>${t}</span>
        `)}getIcon(){return this.locked?this.icon+"-locked":this.icon}render(){return o`
            <a
                href=${this.href}
                class="card-btn grid-link"
                role="button"
                @click=${this.handleClick}
                aria-disabled=${this.printBool(this.locked)}
                data-locked=${this.printBool(this.locked)}
                data-completed=${this.printBool(this.completed)}
            >
                <span class="icon ${this.getIcon()} brand-light"></span>
                ${this.renderText()}
            </a>
        `}}customElements.define("grid-link",fs);class $s extends At{constructor(){super()}renderText(){return this.text.split(" ").map(t=>o`
            <span>${t}</span>
        `)}getIcon(){return this.locked?this.icon+"-locked":this.icon}render(){return o`
            <div class="container-inline">
                <div
                    class="dash-menu__list-item"
                    data-locked=${this.printBool(this.locked)}
                    data-completed=${this.printBool(this.completed)}
                >
                    <div class="dash-menu__icon-area | stack--5">
                        <span class="icon ${this.getIcon()} dash-menu__list-icon"></span>
                    </div>
                    <div class="dash-menu__text-area | switcher | switcher-width-20">
                        <div>
                            <h3 class="f-1 bold uppercase">${this.text}</h3>
                            <p>${this.explanation}</p>
                        </div>
                        ${this.completed?o`
                                <div class="grow-0"><span class="icon zume-check-mark grow-0 | dash-menu__list-success"></span></div>
                            `:o`
                                <a
                                    href=${this.href}
                                    class="dash-menu__view-button btn ${this.locked?"locked":"light"} tight"
                                    role="button"
                                    @click=${this.handleClick}
                                >
                                    ${this.locked?jsObject.translations.preview:this.disableNavigate?this.text:jsObject.translations.view_now}
                                </a>
                            `}
                    </div>
                </div>
            </div>
        `}}customElements.define("list-link",$s);class ys extends g{static get properties(){return{translations:{type:Object},urls:{type:Object},position:{type:String},asLink:{type:Boolean}}}constructor(){super(),typeof jsObject<"u"&&(this.translations=jsObject.translations,this.urls=jsObject.urls),this.position="bottom";const e=document.querySelector("html").dataset.dir;this.isRtl=e==="rtl"}updated(){jQuery(document).foundation()}render(){return o`
            <button class="${this.asLink?"btn dark tight":" btn uppercase light tight"}" data-toggle="launch-course-panel">
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
                    <li><a class="menu-btn" href="${this.urls.launch_ten_session_course}"><span class="icon zume-course"></span>${this.translations.ten_session_course}</a></li>
                    <li><a class="menu-btn" href="${this.urls.launch_twenty_session_course}"><span class="icon zume-course"></span>${this.translations.twenty_session_course}</a></li>
                    <li><a class="menu-btn" href="${this.urls.launch_intensive_session_course}"><span class="icon zume-course"></span>${this.translations.three_day_intensive_course}</a></li>
                </ul>
            </div>
        `}createRenderRoot(){return this}}customElements.define("launch-course",ys);class _s extends g{constructor(){super();w(this,"addressCallback",e=>{e.features.length<1?this.locations=-1:this.locations=e.features});w(this,"processLocation",debounce(getAddressSuggestions(this.addressCallback,jsObject.map_key)));this.userProfile={},this.locations=[]}static get properties(){return{userProfile:{type:Object},loading:{type:Boolean,attribute:!1},locations:{type:Array,attribute:!1}}}firstUpdated(){this.nameInput=this.renderRoot.querySelector("#full_name"),this.phoneInput=this.renderRoot.querySelector("#phone"),this.emailInput=this.renderRoot.querySelector("#email"),this.preferredEmailInput=this.renderRoot.querySelector("#communications_email"),this.cityInput=this.renderRoot.querySelector("#city"),this.prefferedLanguageInput=this.renderRoot.querySelector("#preferred_language"),this.addressResultsContainer=this.renderRoot.querySelector("#address_results")}submitProfileForm(e){e.preventDefault();const s=this.nameInput.value,i=this.emailInput.value,a=this.preferredEmailInput.value,r=this.phoneInput.value,l=this.prefferedLanguageInput.value,c={name:s,phone:r,email:i,communications_email:a,preferred_language:l};c.location_grid_meta=getLocationGridFromMapbox(this.mapboxSelectedId,this.userProfile.location),this.loading=!0,fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(c),headers:{"X-WP-Nonce":jsObject.nonce}}).then(d=>d.json()).then(d=>{const v=new CustomEvent("user-profile:change",{bubbles:!0,detail:d});this.dispatchEvent(v);const u=new CustomEvent("user-state:change",{bubbles:!0});this.dispatchEvent(u)}).catch(d=>{console.error(d)}).finally(()=>{this.loading=!1})}selectAddress(e){const s=e.target.id,i=e.target.dataset.placeName;this.cityInput.value=i,this.mapboxSelectedId=s,this.locations=[]}render(){var e;return o`
            <form action="" id="profile-form" @submit=${this.submitProfileForm}>

                <div class="">
                    <label for="full_name">${jsObject.translations.name}</label>
                    <input class="input" required type="text" id="full_name" name="full_name" value=${this.userProfile.name}>
                </div>
                <div class="">
                    <label for="phone">${jsObject.translations.phone}</label>
                    <input class="input" type="tel" id="phone" name="phone" value=${this.userProfile.phone}>
                </div>
                <div class="">
                    <label for="email">${jsObject.translations.email}</label>
                    <input class="input" type="email" id="email" name="email" value=${this.userProfile.email}>
                </div>
                <div class="">
                    <label for="communications_email">${jsObject.translations.communications_email}</label>
                    <input class="input" type="email" id="communications_email" name="communications_email" value=${this.userProfile.communications_email}>
                </div>
                <div class="">
                    <label for="city">${jsObject.translations.city}</label>
                    <input class="input" type="text" id="city" name="city" value=${((e=this.userProfile.location)==null?void 0:e.label)??""} @input=${this.processLocation}>
                </div>
                    ${Array.isArray(this.locations)?"":o`
                            ${jsObject.translations.no_locations}
                        `}
                    ${Array.isArray(this.locations)&&this.locations.length>0?o`
                            <div id="address_results" class="stack my-0">
                                ${this.locations.map(s=>o`
                                    <div
                                        class="card-btn | text-center"
                                        role="button"
                                        id="${s.id}"
                                        data-place-name="${s.place_name}"
                                        @click=${this.selectAddress}
                                    >
                                        ${s.place_name}
                                    </div>
                                `)}
                            </div>
                        `:""}
                </div>

                <div>
                    <label for="preferred_language">${jsObject.translations.language}</label>
                    <select class="input" name="preferred_language" id="preferred_language">

                    ${Object.values(jsObject.languages).map(s=>o`
                            <option value=${s.code} ?selected=${this.userProfile.preferred_language===s.code}>
                                ${s.nativeName} - ${s.enDisplayName}
                            </option>
                        `)}

                    </select>
                </div>

                <button class="btn my-0" id="submit-profile" ?disabled=${this.loading}>${jsObject.translations.save}</button>
                <span class="loading-spinner ${this.loading?"active":""}"></span>

            </form>
        `}createRenderRoot(){return this}}customElements.define("profile-form",_s);class _ extends g{static get properties(){return{slide:{type:Object},id:{type:String}}}constructor(){super(),this.maxPercentage=80,this.resizeCallback=this.resizeCallback.bind(this)}connectedCallback(){super.connectedCallback(),this.dir=document.querySelector("html").dir,window.addEventListener("resize",this.resizeCallback)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.resizeCallback)}firstUpdated(){this.resizeSlide(window),this.fitContentToSlide(".activity-card"),this.fitContentToSlide(".content-area__text")}resizeCallback(t){this.resizeSlide(t.currentTarget)}fitContentToSlide(t){const e=this.renderRoot.querySelector(t),s=this.renderRoot.querySelector(".slides-card");if(!e||!s)return;const i=e.getBoundingClientRect().height,a=e.parentElement.getBoundingClientRect().top,r=s.getBoundingClientRect().top,c=s.getBoundingClientRect().height-(a-r),d=i/c*100;if(d>this.maxPercentage){const u=2*this.maxPercentage/d;e.style.fontSize=`calc( var(--slide-unit) * ${u} )`}}resizeSlide(t){const e=document.querySelectorAll(".slides-card"),s=document.querySelectorAll(".video-slide"),i=[...e,s],{innerWidth:a,innerHeight:r}=t,l=i[0].getBoundingClientRect().width,c=a/r>16/9,d=c?16/9*r/100:l/100,v=c?r:9/16*l;this.slideUnit=d,this.slideHeight=v,i.forEach(u=>{u.style=`
                --slide-unit: ${d}px;
                --slide-height: ${v}px;
            `})}renderProgressBar(){let t=[],e=[];for(let s=0;s<this.slide.progress_bar.length;s++){const i=this.slide.progress_bar[s];if(i===!1){t.push(e),t.push(!1),e=[];continue}e.push(i)}return t.push(e),o`
            <div class="stage ${this.slide.key}-bar">
                <div class="progress-bar-wrapper">
                    ${t.map(s=>s?o`
                            <div class="progress-bar-stage">
                                ${s.map(i=>o`
                                    <div class="progress-bar-item ${this.slide.key===i?"active":""}"></div>
                                `)}
                            </div>
                        `:o`<div class="progress-bar-divider"></div>`)}
                </div>
            </div>
        `}renderContent(t=[],e=!1,s=!1){return t.map((i,a)=>e&&a===0?o`<p><strong>${i}</strong></p>`:Array.isArray(i)?o`
                    <ul class="bullets">
                        ${i.map(r=>o`<li>${r}</li>`)}
                    </ul>
                `:s?o`<p><strong>${i}</strong></p>`:o`<p>${i}</p>`)}render(){return o`
            <div class="slides-card">
                <div class="center"></div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-slide",_);class ws extends _{static get properties(){return{slide:{type:Object},id:{type:String},offCanvasId:{type:String,attribute:!1}}}firstUpdated(){jQuery(document).foundation(),this.offCanvasId="activityOffCanvas"+this.id,this.offCanvasSelector="#"+this.offCanvasId,super.firstUpdated()}openMenu(){const t=document.querySelector(this.offCanvasSelector);console.log(t,this.offCanvasSelector),jQuery(t).foundation("open")}closeMenu(){const t=document.querySelector(this.offCanvasSelector);jQuery(t).foundation("close")}render(){return o`
            <div class="slides-card activity-slide | position-relative">
                ${this.renderProgressBar()}
                <div class="cover-slide">
                    <button
                        type="button"
                        class="btn icon-btn absolute top ${this.dir==="rtl"?"left":"right"} z-1 m-0 f-3 bypass-nav-click"
                        @click=${this.openMenu}
                    >
                        <span class="icon zume-info"></span>
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
                    <button class="close-btn | ms-auto absolute ${this.dir==="rtl"?"left":"right"} top my--2 mx-1 f-0 invert" aria-label=${jsObject.translations.close} type="button" data-close>
                        <span class="icon zume-close"></span>
                    </button>

                    <iframe
                        src=${this.slide.right[0]||""}
                        frameborder="0"
                        width="100%"
                    >
                    </iframe>
                </div>
            </div>
        `}}customElements.define("activity-slide",ws);class ks extends _{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="cover-slide">
                    <div class="grow-1 d-flex align-items-center">
                        <div class="center activity-card stack--2" data-large>
                            <span>${this.slide.center[0]}</span>
                            ${this.slide.center[1]?o`<span>${this.slide.center[1]}</span>`:""}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("break-slide",ks);class Ss extends _{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="cover-slide">
                    <h2 class="title text-center">${this.slide.center[0]??""} ${this.slide.length??""}</h2>
                    <div class="center w-70 grow-1 justify-content-center">
                        <div class="stack--2 activity-card">
                            ${this.renderContent(this.slide.left,!0)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("center-slide",Ss);class js extends _{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon"><span class="icon zume-phone"></span></div>
                            <h2 class="title">${this.slide.left[0]}</h2>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack">
                            <p>${this.slide.right[0]}</p>
                            <div class="qr-code"><a href="${this.slide.right[1]}" target="_blank"><img src="${this.slide.right[2]}" /></a></div>
                            <p>${this.slide.right[3]} <span style="font-weight:bold;">${this.slide.right[4]}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("checkin-slide",js);class Cs extends _{render(){return o`
            <div class="slides-card">
                <div class="cover-page container">
                    <div>
                        <div class="center activity-card" data-large>
                            <p>${this.slide.center[0]}</p>
                        </div>
                        <div class="center">
                          <p><img src="${this.slide.center[1]??""}" /></p>
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("congratulations-slide",Cs);class Es extends _{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon zume-discuss"></span>
                            </div>
                            <div class="stack">
                                <h2 class="title">${this.slide.left[0]}</h2>
                                <span class="subtitle">${this.slide.length??""}</span>
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
        `}}customElements.define("discuss-slide",Es);class xs extends _{render(){return o`
            <div class="slides-card">
                <div class="cover-page">
                    <div class="center stack | text-center w-50">
                        <div class="w-30"><img src="${this.slide.center[0]}" /></div>
                        <p>${this.slide.center[1]}</p>
                        <div class="w-30"><img src="${this.slide.center[2]}" /></div>
                        <p>${this.slide.center[3]}</p>
                    </div>
                </div>
            </div>
        `}}customElements.define("final-slide",xs);class Os extends _{render(){return o`
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
        `}}customElements.define("left-image-slide",Os);class zs extends _{render(){return o`
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
        `}}customElements.define("next-steps-slide",zs);class As extends _{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="obey-slide">
                    <div class="two-column left">
                        <div>
                            <div class="title-area">
                                <div class="title-icon">
                                    <span class="icon zume-obey-concept"></span>
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
                                    <span class="icon zume-share-concept"></span>
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
        `}}customElements.define("obey-slide",As);class Ps extends _{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon zume-overview"></span>
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
        `}}customElements.define("overview-slide",Ps);class Ts extends _{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon zume-pray"></span>
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
        `}}customElements.define("pray-slide",Ts);class Ms extends _{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon zume-review"></span>
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
        `}}customElements.define("review-slide",Ms);class Rs extends _{render(){return o`
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
        `}}customElements.define("title-slide",Rs);class Is extends _{static get properties(){return{slide:{type:Object},showButtons:{type:Boolean},id:{type:String},scriptUrl:{type:String,attribute:!1},offCanvasId:{type:String,attribute:!1}}}firstUpdated(){jQuery(document).foundation(),this.offCanvasId="informationOffCanvas"+this.id,this.offCanvasSelector="#"+this.offCanvasId,this.loadScriptIntoFrame()}openMenu(){const t=document.querySelector(this.offCanvasSelector);console.log(this.offCanvasId,t),jQuery(t).foundation("open")}closeMenu(){const t=document.querySelector(this.offCanvasSelector);jQuery(t).foundation("close")}loadScriptIntoFrame(){const t=this.slide.script_id,e=jsObject.language,s=new URL(location.href),i=new URL(s.origin);i.pathname=[e,"app","script"].join("/"),i.searchParams.append("s",t),this.scriptUrl=i.href}render(){return o`
            <div class="video-slide">

                <button
                    type="button"
                    class="btn icon-btn absolute top ${this.dir==="rtl"?"left":"right"} z-1 m-0 f-3 bypass-nav-click"
                    @click=${this.openMenu}
                >
                    <span class="icon zume-info"></span>
                </button>

                <div class="widescreen flex-video">
                    <iframe src="${this.slide.center[0]}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                            frameborder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                    >
                    </iframe>
                </div>

                ${this.showButtons===!0?o`
                     <!-- These buttons have no click handlers. They essentially give a space to allow the
                mouse click to trigger the click left/right side of screen event -->
                    <button
                        type="button"
                        class="btn icon-btn absolute middle left mx-0"
                    >
                        <img
                            src="${jsObject.images_url}/chevron.svg"
                            alt=${jsObject.translations.previous_slide}
                            class="svg white rotate-90 w-1rem h-1rem"
                        />
                    </button>
                    <button
                        type="button"
                        class="btn icon-btn absolute middle right mx-0"
                    >
                        <img
                            src="${jsObject.images_url}/chevron.svg"
                            alt=${jsObject.translations.next_slide}
                            class="svg white rotate--90 w-1rem h-1rem"
                        />
                    </button>
                `:""}
            </div>
            <div
                class="bg-white | information-flyout bypass-nav-click off-canvas ${this.dir==="rtl"?"position-left":"position-right"}"
                id=${this.offCanvasId||"informationOffCanvas"}
                data-off-canvas
                data-transition="overlap"
            >
                <button class="close-btn | ms-auto m--1" aria-label=${jsObject.translations.close} type="button" data-close>
                    <span class="icon zume-close"></span>
                </button>

                <iframe
                    src=${this.scriptUrl||""}
                    frameborder="0"
                    width="100%"
                >
                </iframe>
            </div>
        `}}customElements.define("video-slide",Is);class Ls extends _{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon">
                                <span class="icon zume-watch"></span>
                            </div>
                            <div class="stack">
                                <h2 class="title">${this.slide.left[0]}</h2>
                                <span class="subtitle">${this.slide.length??""}</span>
                            </div>
                        </div>
                    </div>
                    <div class="content-area">
                        <div class="stack content-area__text">
                            ${this.renderContent(this.slide.right,!0)}
                        </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("watch-slide",Ls);class qs extends _{render(){return o`
            <div class="slides-card">
                ${this.renderProgressBar()}
                <div class="two-column left">
                    <div>
                        <div class="title-area">
                            <div class="title-icon"><img src="https://placehold.co/60x60/png" /></div>
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
        `}}customElements.define("look-back-slide",qs);const Vt=["slideshow","guide"];class Us extends g{static get properties(){return{languageCode:{type:String},homeUrl:{type:String},assetsPath:{type:String},zumeSessions:{attribute:!1},menu:{attribute:!1},lessonIndex:{attribute:!1},sessionKey:{attribute:!1},view:{attribute:!1},linkNodes:{attribute:!1},showIndex:{attribute:!1}}}constructor(){super(),this.handleSessionLink=this.handleSessionLink.bind(this),this.handleHistoryPopState=this.handleHistoryPopState.bind(this)}connectedCallback(){super.connectedCallback();const t=new URL(window.location.href),{sessions:e,menu:s}=this.getZumeSessions(t);this.zumeSessions=e,this.menu=s;const i=this.getLessonIndex(t);this.lessonIndex=i,this.sessionKey="",this.view=this.getView(t),this.changeSession(i,!1,e),window.addEventListener("popstate",this.handleHistoryPopState)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.handleHistoryPopState)}firstUpdated(){document.querySelectorAll(".language-selector").forEach(function(e){e.addEventListener("click",()=>{const s=e.dataset.value,i=new URL(location.href),a=i.pathname.substring(1).split("/");let r="";a.length>0&&jsObject.zume_languages.includes(a[0])?r=a.slice(1).join("/"):r=a.join("/"),s!=="en"?r="/"+s+"/"+r:r="/"+r,r+=i.search,location.href=r})})}getView(t){if(t.searchParams.has("view")){const e=t.searchParams.get("view");if(Vt.includes(e))return e}else return"slideshow"}getLessonIndex(t){if(t.searchParams.has("session")){const e=t.searchParams.get("session");if(e==="index")return"index";const s=Number(e);return Number.isInteger(s)?s-1:0}else return 0}getZumeSessions(t){const e=t.searchParams.get("type")||"10";this.type=e;let s,i;switch(e){case"10":s=zume10Sessions,i=zume10SessionsMenu;break;case"20":s=zume20Sessions,i=zume20SessionsMenu;break;case"intensive":s=zumeIntensiveSessions,i=zumeIntensiveSessionsMenu;break;default:s=zume10Sessions,i=zume10SessionsMenu;break}return{sessions:s,menu:i}}handleSessionLink(t){const e=t.target,s=Number(e.dataset.sessionNumber);this.lessonIndex=s,this.showIndex===!0&&(this.showIndex=!1),this.changeSession(this.lessonIndex),this.closeMenu()}handleSubSectionLink(t,e){this.lessonIndex=t,this.showIndex===!0&&(this.showIndex=!1),this.changeSession(this.lessonIndex),this.sessionKey=e,this.closeMenu()}getNextSession(){this.lessonIndex+=1,this.changeSession(this.lessonIndex)}getPreviousSession(){this.lessonIndex-=1,this.changeSession(this.lessonIndex)}changeSession(t,e=!0,s=null){if(t==="index"){this.showIndex=!0;return}else this.showIndex=!1;const i=s||this.zumeSessions;let a=t;t<0&&(a=0),t>i.length-1&&(a=i.length-1),this.lessonIndex=a,this.session=i[a],e&&this.pushHistory()}pushHistory(){const t=this.lessonIndex,e=this.view,s=new URL(window.location.href);t!==null&&Number.isInteger(t)&&s.searchParams.set("session",t+1),e&&s.searchParams.set("view",e),window.history.pushState(null,null,s.href)}handleHistoryPopState(){var i;const t=new URL(location.href),e=t.searchParams.has("session")?t.searchParams.get("session"):null,s=t.searchParams.get("view");(i=document.querySelector(".js-off-canvas-overlay"))==null||i.classList.remove("is-visible"),Number.isInteger(Number(e))&&(this.lessonIndex=e-1,this.changeSession(this.lessonIndex,!1)),e==="index"&&(this.lessonIndex="index",this.changeSession("index",!1)),s&&Vt.includes(s)&&(this.view=s)}getSessionSections(){return this.session?this.session:[]}switchViews(t=!0){this.view==="guide"?this.view="slideshow":this.view="guide",t===!0&&this.pushHistory()}openMenu(){const t=this.querySelector("#offCanvas");jQuery(t).foundation("open")}closeMenu(){const t=this.querySelector("#offCanvas");jQuery(t).foundation("close")}render(){this.showIndex;const t=this.type==="intensive"?"container-xsm":"container-sm";return o`
            ${this.showIndex?o`
                    <div class="course-index | bg-brand-gradient">
                        <img src="${jsObject.images_url}/zume-training-logo-white.svg" alt="Zume Logo" class="mx-auto w-70 py-1" />
                        <div class="${t}" data-max-width="750">
                            <div class="grid | grid-min-8rem gutter0">
                                ${this.zumeSessions.map((e,s)=>o`
                                    <button
                                        class="card-btn | bg-white black m--2 gap--3 aspect-1 justify-content-evenly"
                                        data-session-number=${s}
                                        @click=${this.handleSessionLink}
                                    >
                                        <h2 class="f-0 bold">${jsObject.translations.session}</h2>
                                        <p class="f-3 bold lh-sm">${s+1}</p>
                                        <span class="icon zume-course brand-light f-3"></span>
                                    </button>
                                `)}
                            </div>
                        </div>
                    </div>
                `:""}

            <nav class="bg-white px-0 text-center | presenter-menu off-canvas ${this.dir==="rtl"?"position-right":"position-left"} justify-content-between py-1" id="offCanvas" data-off-canvas data-transition="overlap">
                <button class="ms-auto close-btn mb-0" aria-label=${jsObject.translations.close} type="button" data-close>
                    <span class="icon zume-close"></span>
                </button>
                <div class="stack">
                    <div class="stack">
                        <!-- Close button -->

                        <!-- Menu -->
                        <ul class="vertical menu accordion-menu" data-accordion-menu data-submenu-toggle="true" data-multi-open="false">
                            ${Object.values(this.menu).map(({title:e,submenu:s},i)=>o`
                                <li>
                                    <a
                                        class="session-link"
                                        data-session-number="${i}"
                                        @click=${this.handleSessionLink}
                                    >
                                        ${e}
                                    </a>
                                    <ul class="menu vertical nested ${this.lessonIndex===i?"is-active":""}">
                                        ${s.map(({key:a,title:r,length:l})=>o`
                                                <a
                                                    class="session-link"
                                                    data-subitem
                                                    href=${`#${a}`}
                                                    @click=${()=>this.handleSubSectionLink(i,a)}
                                                >
                                                    <span>${r}</span> <span>${l}</span>
                                                </a>
                                            `)}
                                    </ul>
                                </li>
                            `)}
                        </ul>
                    </div>
                    <div class="">
                        <div class="cluster">
                            <a class="btn light uppercase tight" href="${this.homeUrl}">${jsObject.translations.home}</a>
                            <button class="btn d-flex align-items-center justify-content-center gap--4 light tight" data-open="language-menu-reveal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" class="ionicon" viewBox="0 0 512 512"><path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M256 48c-58.07 0-112.67 93.13-112.67 208S197.93 464 256 464s112.67-93.13 112.67-208S314.07 48 256 48z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M117.33 117.33c38.24 27.15 86.38 43.34 138.67 43.34s100.43-16.19 138.67-43.34M394.67 394.67c-38.24-27.15-86.38-43.34-138.67-43.34s-100.43 16.19-138.67 43.34" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M256 48v416M464 256H48"/></svg>
                                ${this.languageCode}
                            </button>
                            <button class="btn light tight outline" @click=${()=>this.switchViews()}>${jsObject.translations.switch_views}</button>
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
                ${this.view==="guide"?o`<course-guide .sections=${this.getSessionSections()}></course-guide>`:o`<course-slideshow .sections=${this.getSessionSections()} startSlideKey=${this.sessionKey}></course-slideshow>`}
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-presenter",Us);class Ns extends g{static get properties(){return{sections:{type:Array}}}render(){return o`
            <div class="course-guide">
                <div class="stack | py-4 snap-content" data-outline-slides>
                    ${this.sections.map((t,e)=>o`
                            <div class="container | slide-switcher">
                                <slide-switcher
                                    .slide=${t}
                                ></slide-switcher>
                            </div>
                        `)}

                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-guide",Ns);class Ds extends g{static get properties(){return{sections:{type:Array},startSlideKey:{type:String},sectionIndex:{attribute:!1},currentSlide:{attribute:!1},index:{attribute:!1}}}constructor(){super(),this.reset(),this.sections=[],this.startSlideKey="",this.listenForKeyboard=this.listenForKeyboard.bind(this),this.listenForMouseClick=this.listenForMouseClick.bind(this)}reset(){this.sectionIndex=-1,this.currentSlide=null}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.listenForKeyboard),document.addEventListener("mousedown",this.listenForMouseClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.listenForKeyboard),document.removeEventListener("mousedown",this.listenForMouseClick)}update(t){if(t.has("sections")&&this.reset(),t.has("startSlideKey")&&this.startSlideKey!==""){const e=this.sections.findIndex(({key:s})=>s===this.startSlideKey);this.setSlide(e)}super.update(t)}nextSlide(){if(this.sectionIndex>=this.sections.length-1){this.sectionIndex=this.sections.length-1;return}this.setSlide(this.sectionIndex+1)}previousSlide(){this.sectionIndex<0&&(this.sectionIndex=0),this.setSlide(this.sectionIndex-1)}leftSlide(){document.querySelector("html").dir==="rtl"?this.nextSlide():this.previousSlide()}rightSlide(){document.querySelector("html").dir==="rtl"?this.previousSlide():this.nextSlide()}listenForKeyboard(t){["ArrowRight"].includes(t.code)&&this.rightSlide(),["Space"].includes(t.code)&&this.nextSlide(),["ArrowLeft"].includes(t.code)&&this.leftSlide(),["Backspace"].includes(t.code)&&this.previousSlide()}listenForMouseClick(t){if(t.target.id==="hamburger-menu")return;const e=c=>c.id==="offCanvas"||c.classList.contains("js-off-canvas-overlay")||c.classList.contains("bypass-nav-click");if(this.hasParent(t.target,e))return;const{x:s,type:i,which:a}=t;if(i!=="mousedown"||a!==1)return;const{innerWidth:r}=window,l=1/2*r;s<l&&this.leftSlide(),s>r-l&&this.rightSlide()}hasParent(t,e){let s=t;const i=50;let a=0;for(;s;){if(e(s))return!0;if(s=s.parentElement,a=a+1,a>i)return!1}return!1}setSlide(t){this.sectionIndex=t;const e=this.sections[t];this.currentSlide=e}render(){return this.sectionIndex<0&&this.setSlide(0),o`
            <div class="cover-page">
                <div>
                    <slide-switcher .slide=${this.currentSlide} showControls></slide-switcher>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("course-slideshow",Ds);class Hs extends g{static get properties(){return{slide:{type:Object},showControls:{type:Boolean}}}render(){if(this.slide)switch(this.slide.type){case"title":return o`<title-slide .slide=${this.slide} id=${this.slide.key}></title-slide>`;case"checkin":return o`<checkin-slide .slide=${this.slide} id=${this.slide.key}></checkin-slide>`;case"pray":return o`<pray-slide .slide=${this.slide} id=${this.slide.key}></pray-slide>`;case"review":return o`<review-slide .slide=${this.slide} id=${this.slide.key}></review-slide>`;case"overview":return o`<overview-slide .slide=${this.slide} id=${this.slide.key}></overview-slide>`;case"challenge":case"center":return o`<center-slide .slide=${this.slide} id=${this.slide.key}></center-slide>`;case"watch":return o`<watch-slide .slide=${this.slide} id=${this.slide.key}></watch-slide>`;case"video":return o`<video-slide .slide=${this.slide} id=${this.slide.key} ?showButtons=${this.showControls}></video-slide>`;case"look_back":return o`<look-back-slide .slide=${this.slide} id=${this.slide.key}></look-back-slide>`;case"discuss":return o`<discuss-slide .slide=${this.slide} id=${this.slide.key}></discuss-slide>`;case"left_content":case"activity":return o`<activity-slide .slide=${this.slide} id=${this.slide.key}></activity-slide>`;case"obey":return o`<obey-slide .slide=${this.slide} id=${this.slide.key}></obey-slide>`;case"left_image":return o`<left-image-slide .slide=${this.slide} id=${this.slide.key}></left-image-slide>`;case"next_steps":return o`<next-steps-slide .slide=${this.slide} id=${this.slide.key}></next-steps-slide>`;case"break":return o`<break-slide .slide=${this.slide} id=${this.slide.key}></break-slide>`;case"congratulations":return o`<congratulations-slide .slide=${this.slide} id=${this.slide.key}></congratulations-slide>`;case"final":return o`<final-slide .slide=${this.slide} id=${this.slide.key}></final-slide>`;default:return o`<course-slide .slide=${this.slide} id=${this.slide.key}></course-slide>`}}createRenderRoot(){return this}}customElements.define("slide-switcher",Hs);class Bs extends g{static get properties(){return{questions:{type:Array},translations:{type:Object},contact_id:{type:String},user_id:{type:String},showCancel:{type:Boolean},answers:{type:Array,attribue:!1},error:{type:Boolean,attribute:!1},loading:{type:Boolean,attribute:!1}}}constructor(){super(),this.questions=[],this.answers=[],this.translations=[],this.contact_id="",this.user_id="",this.error=!1,this.loading=!1}handleInputChange(t){const e=t.target.dataset.i;this.answers[e]=t.target.value,this.update()}handleCancel(){this.clearAnswers(),this.dispatchEvent(new CustomEvent("3-month-plan-cancelled",{bubbles:!0}))}handleSave(){this.loading=!0;const t=[];if(this.answers.length===0){this.loading=!1;return}return this.answers.forEach((e,s)=>{if(e){const a=this.questions[s];var i=new Date;i.setDate(i.getDate()+30);const r=makeRequest("POST","commitment",{user_id:this.user_id,post_id:this.contact_id,meta_key:"tasks",note:"Question: "+a+" Answer: "+e,question:a,answer:e,date:i,category:"post_training_plan"},"zume_system/v1");t.push(r.promise())}}),Promise.all(t).then(()=>{this.loading=!1,this.clearAnswers(),this.dispatchEvent(new CustomEvent("3-month-plan-saved",{bubbles:!0}))}).catch(e=>{console.error(e),this.error=!0,this.loading=!1})}clearAnswers(){this.renderRoot.querySelectorAll(".post-training-plan").forEach(t=>{t.value=""})}render(){const t=this.loading||this.answers.length===0;return o`
            <div id="pieces-content" class="stack">
                ${this.questions.map((e,s)=>{const i=`question-${s}`;return o`
                        <div class="stack--3">
                            <label for=${i}>${e}</label>
                            <textarea
                                id=${i}
                                data-i=${s}
                                type="text"
                                class="input post-training-plan"
                                rows="1"
                                @input=${this.handleInputChange}
                            ></textarea>
                        </div>
                `})}
                <div class="cluster justify-flex-end">
                    ${this.showCancel?o`
                            <button
                                class="btn light outline uppercase"
                                @click=${this.handleCancel}
                            >
                                ${this.translations.cancel}
                            </button>
                            `:""}
                    <button
                        ?disabled=${t}
                        aria-disabled=${t?"true":"false"}
                        class="btn light uppercase"
                        @click=${this.handleSave}
                    >
                        ${this.translations.save}
                        <span class="loading-spinner ${this.loading?"active":""}"></span>
                    </button>

                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("activity-3-month-plan",Bs);class ye extends g{constructor(){super()}render(){return o`
            <div class="container">
                <div class="circle">
                    <div class="triangle"></div>
                </div>
            </div>
        `}}w(ye,"styles",ze`
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
    `);window.customElements.define("play-button",ye);class Fs extends g{constructor(){super();w(this,"webShareSupported",!!window.navigator.share);w(this,"clipboardSupported",!!window.navigator.clipboard);this.shareFeedback="",this.copyFeedback=""}static get properties(){return{url:{type:String},title:{type:String},t:{type:Object},shareFeedback:{attribute:!1},copyFeedback:{attribute:!1}}}share(){navigator.share({title:this.title,url:this.url,text:title}).then(()=>{this.shareFeedback=this.t.share_feedback,setTimeout(()=>{this.shareFeedback=""},3e3)}).catch(e=>console.error("Error sharing",e))}copyLink(e){e.stopImmediatePropagation(),navigator.clipboard.writeText(this.url).then(()=>{this.copyFeedback=this.t.copy_feedback,setTimeout(()=>{this.copyFeedback=""},3e3)}).catch(s=>console.error(s))}noOptionsAvailable(){return!this.clipboardSupported&&!this.webShareSupported}render(){return o`
            <div id="share" tabindex="-1" class="stack--2">
              ${this.noOptionsAvailable()?o`
                  <div class="stack--2">
                    <p>${this.t.copy_and_share_text}</p>
                    <p class=""><code>${this.url}</code></p>
                  </div>
              `:o`
                  <div :class="cluster gap--1">
                    ${this.webShareSupported?o`
                        <div class="position-relative">
                          <button class="btn light uppercase" @click=${this.share}>
                            <!-- Share icon -->
                            <span>${this.t.share}</span>
                          </button>
                          <p role="alert" aria-live="polite" id="shareFeedback" class="context-alert" data-state=${this.shareFeedback.length?"":"empty"}>${this.shareFeedback}</p>
                        </div>
                    `:""}
                    ${this.clipboardSupported?o`
                        <div class="position-relative">
                          <button class="btn light uppercase" data-theme="ghost" @click=${this.copyLink}>
                            <!-- Link icon -->
                            <span>${this.t.copy_link}</span>
                          </button>
                          <p role="alert" aria-live="polite" id="copyFeedback" class="context-alert" data-state=${this.copyFeedback.length?"":"empty"}>${this.copyFeedback}</p>
                        </div>
                    `:""}
                  </div>
              `}


            </div>
        `}createRenderRoot(){return this}}customElements.define("share-links",Fs);class Ws extends g{constructor(){super();w(this,"sortAlphabetically",(e,s)=>e.page_title<s.page_title?-1:1);w(this,"sortByKey",(e,s)=>Number(e.key)<Number(s.key)?-1:1);this.items=zumeShare.share_items,this.filterType="all"}static get properties(){return{items:{type:Array,attribute:!1},filterType:{type:String,attribute:!1},isSortedAlphabetically:{type:Boolean,attribute:!1}}}filterItems(e){this.filterType=e,this.items=this.sortItems(zumeShare.share_items.filter(({type:s})=>e==="all"?!0:s===e))}toggleSorting(){this.isSortedAlphabetically=!this.isSortedAlphabetically,this.items=this.sortItems(this.items)}sortItems(e){return e.sort((s,i)=>this.isSortedAlphabetically?this.sortAlphabetically(s,i):this.sortByKey(s,i))}renderListItem({page_url:e,page_title:s,type:i,description:a}){return o`
            <li class="share-cards" data-type=${i}>
                <div class="stack | share card">
                    <a class="f-1 bold mt-0" href=${e}>
                        ${s}
                    </a>
                    <p class="f--1 show-for-large">
                        ${a}
                    </p>
                    <div class="fit-content ms-auto">
                        <share-links
                            url=${e}
                            title=${s}
                            .t=${zumeShare.translations}>
                        </share-links>
                    </div>
                </div>
            </li>
        `}render(){return o`
            <div class="container-xsm">
                <div class="filter-area d-flex align-items-center justify-flex-end">
                    <button
                        class="icon-btn f-2 ${this.isSortedAlphabetically?"bg-brand-fade":""}"
                        @click=${this.toggleSorting}
                    >
                        <span class="visually-hidden">${zumeShare.translations.sort}</span>
                        <svg class="w-2rem brand-light" focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12.93 2.65c-.2-.2-.51-.2-.71 0l-2.01 2.01h4.72zm-.7 18.7c.2.2.51.2.71 0l1.98-1.98h-4.66zm-1.25-3.62c.6 0 1.01-.6.79-1.16L8.04 7.03c-.18-.46-.63-.76-1.12-.76-.49 0-.94.3-1.12.76l-3.74 9.53c-.22.56.19 1.16.79 1.16.35 0 .67-.22.8-.55l.71-1.9h5.11l.71 1.9c.13.34.45.56.8.56m-6.01-4.09 1.94-5.18 1.94 5.18zm16.08 2.5h-5.33l5.72-8.29c.46-.66-.02-1.57-.82-1.57h-6.48c-.44 0-.79.36-.79.8v.01c0 .44.36.8.79.8h5.09l-5.73 8.28c-.46.66.02 1.57.82 1.57h6.72c.44 0 .79-.36.79-.79.02-.45-.34-.81-.78-.81"></path></svg>
                    </button>
                    <button class="icon-btn f-2" data-toggle="filter-menu">
                        <span class="visually-hidden">${zumeShare.translations.filter}</span>
                        <span class="icon zume-filter brand-light" aria-hidden="true"></span>
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
                        ${B(this.items,e=>e.key,this.renderListItem)}
                    </ul>
                </div>
            </div>
        `}createRenderRoot(){return this}}customElements.define("share-list",Ws);class Ks extends g{static get properties(){return{t:{type:Object},joinLink:{type:String},loading:{attribute:!1},posts:{attribute:!1}}}constructor(){super(),this.loading=!0,this.plans=[],this.getTrainings(),this.renderRow=this.renderRow.bind(this)}getTrainings(){makeRequest("POST","public_plans",{},"zume_system/v1").then(t=>{this.plans=t}).catch(t=>{console.log(t)}).always(()=>{this.loading=!1})}render(){return this.loading?o`<span class="loading-spinner active"></span>`:o`
            <table>
                <thead>
                    <tr>
                        <td>${this.t.name}</td>
                        <td>${this.t.next_date}</td>
                        <td>${this.t.start_time}</td>
                        <td>${this.t.timezone}</td>
                        <td>${this.t.language}</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    ${this.plans.length>0?this.plans.map(this.renderRow):this.t.no_plans}
               </tbody>
            </table>
        `}renderRow({join_key:t,language_note:e,post_title:s,time_of_day_note:i,timezone_note:a,...r}){const l=r.set_a_01?"a":"b",c=l==="a"?10:20,d=`set_${l}_`,v=Date.now()/1e3;let u="";for(let m=1;m<c+1;m++){const f=m<10?`0${m}`:`${m}`,$=r[d+f];if(u=$.timestamp,v<$.timestamp)break}const p=moment(u*1e3).format("MMM Do 'YY");return o`
            <tr>
                <td data-label="${this.t.name}">${s}</td>
                <td data-label="${this.t.next_date}">${p}</td>
                <td data-label="${this.t.start_time}">${i}</td>
                <td data-label="${this.t.timezone}">${a}</td>
                <td data-label="${this.t.language}">${e}</td>
                <td><button class="btn" data-code=${t} @click=${this._handleJoinTraining}>${this.t.join}</button></td>
            </tr>
        `}_handleJoinTraining(t){console.log(t);const e=t.target.dataset.code,s=new CustomEvent("chosen-training",{bubbles:!0,detail:{code:e}});this.dispatchEvent(s)}createRenderRoot(){return this}}customElements.define("public-trainings",Ks);class _e extends g{static get properties(){return{radius:{type:Number},lineWidth:{type:Number},percent:{type:Number}}}constructor(){super(),this.radius=100,this.lineWidth=10,this.percent=30}width(){return this.radius*2+this.lineWidth}widthPx(){return this.appendPx(this.width())}center(){return this.width()/2}circumference(){return this.radius*2*Math.PI}circumferencePx(){return this.appendPx(this.circumference())}appendPx(t){return`${t}px`}rotate(t){return`rotate(${t}, ${this.center()}, ${this.center()})`}render(){return o`
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
        `}createRenderRoot(){return this}}customElements.define("progress-circle",_e);class Qs extends _e{static get properties(){return{percent:{type:Number},type:{type:String}}}constructor(){super(),this.radius=50,this.lineWidth=15,this.percent=0,this.borderWidth=3,this.type="heard"}width(){return(this.radius+this.lineWidth)*2}getIconSvg(){switch(this.type){case"heard":return it`
                    <path d="M13.204,14.843c.157-3.465,2.622-6.151,6.05-6.593,3.602-.464,7.067,2.224,7.528,5.84.019.151.028.303.051.453.084.543.565.919,1.079.849.531-.073.901-.535.85-1.079-.09-.964-.299-1.902-.71-2.782-1.357-2.904-3.602-4.681-6.783-5.149-4.548-.67-8.841,2.255-9.775,6.729-.695,3.33-.03,6.397,2.327,8.963.781.85,1.668,1.601,2.472,2.43.534.551,1.049,1.131,1.495,1.754.496.692.669,1.505.631,2.364-.121,2.78,2.078,5.075,4.868,5.091,2.087.012,4.017-1.407,4.624-3.399.169-.553-.083-1.062-.614-1.24-.505-.169-1.018.085-1.21.625-.375,1.054-1.082,1.745-2.179,2.001-1.829.426-3.631-1.042-3.551-2.908.071-1.673-.427-3.158-1.526-4.394-.867-.975-1.835-1.861-2.774-2.772-1.174-1.139-2.156-2.394-2.584-4.011-.24-.909-.31-1.835-.271-2.771Z" stroke-width="0"></path>
                    <path d="M22.416,16.825c-1.639.344-2.761,1.916-2.613,3.472.179,1.88,1.39,3.263,3.162,3.601.237.045.486.086.722.059.502-.056.865-.512.837-.996-.029-.509-.412-.882-.953-.927-.921-.078-1.624-.699-1.795-1.587-.226-1.172.702-1.837,1.898-1.848.737-.007,1.224-.331,1.128-1.091-.055-.433-.488-1.081-2.385-.684Z" stroke-width="0"></path>
                `;case"obeyed":return it`
                    <path d="M21.57,18.138c-.204,1.02-.396,1.984-.589,2.948-.06.299-.116.599-.179.898-.012.057-.047.109-.087.195.117.163.256.361.4.556.397.536.795,1.072,1.194,1.606.743.993,1.239,2.082,1.465,3.316.261,1.422.608,2.829.922,4.241.183.825-.274,1.597-1.058,1.778-.783.18-1.554-.308-1.742-1.125-.279-1.212-.56-2.424-.804-3.643-.204-1.021-.594-1.958-1.176-2.812-.781-1.144-1.585-2.272-2.374-3.411-.254-.367-.481-.753-.74-1.117-.501-.703-.591-1.47-.421-2.296.247-1.201.478-2.406.716-3.609.003-.016.003-.033.006-.074-.05.04-.089.066-.123.097-.598.545-1.197,1.088-1.789,1.639-.062.057-.11.158-.115.242-.087,1.326-.165,2.653-.248,3.979-.041.641-.554,1.087-1.186,1.04-.6-.045-1.035-.574-.995-1.196.09-1.411.176-2.822.261-4.233.03-.498.222-.916.592-1.253,1.221-1.112,2.44-2.226,3.66-3.339.129-.118.246-.252.385-.356.381-.287.817-.384,1.283-.297.717.134,1.431.278,2.145.426.596.124,1.038.46,1.25,1.033.148.401.244.822.346,1.239.243.995.654,1.924,1.094,2.842.143.297.376.491.691.613.959.373,1.91.764,2.864,1.149.068.027.136.055.203.087.583.277.825.859.591,1.42-.224.536-.856.795-1.439.577-.392-.146-.777-.31-1.165-.465-.829-.332-1.655-.671-2.488-.994-.314-.122-.566-.312-.739-.594-.174-.284-.325-.582-.486-.874-.035-.063-.069-.126-.126-.232Z" stroke-width="0"></path>
                    <path d="M15.828,22.191c.259.402.497.772.735,1.142.48.747.962,1.492,1.437,2.242.041.065.066.158.057.233-.038.303-.09.604-.143.904-.098.559-.309,1.069-.618,1.547-.923,1.43-1.831,2.869-2.752,4.3-.552.858-1.767.912-2.364.114-.368-.492-.375-1.17-.015-1.736.694-1.093,1.366-2.201,2.093-3.272.688-1.014,1.054-2.129,1.231-3.324.098-.66.201-1.319.303-1.978.007-.044.018-.087.037-.174Z" stroke-width="0"></path>
                    <path d="M21.246,11.553c-1.455,0-2.629-1.176-2.629-2.635,0-1.455,1.178-2.631,2.634-2.631,1.456,0,2.636,1.174,2.64,2.628.004,1.46-1.176,2.637-2.645,2.638Z" stroke-width="0"></path>
                `;case"shared":return it`
                    <path d="M12.845,18.138c-.204,1.02-.396,1.984-.589,2.948-.06.299-.116.599-.179.898-.012.057-.047.109-.087.195.117.163.256.361.4.556.397.536.795,1.072,1.194,1.606.743.993,1.239,2.082,1.465,3.316.261,1.422.608,2.829.922,4.241.183.825-.274,1.597-1.058,1.778-.783.18-1.554-.308-1.742-1.125-.279-1.212-.56-2.424-.804-3.643-.204-1.021-.594-1.958-1.176-2.812-.781-1.144-1.585-2.272-2.374-3.411-.254-.367-.481-.753-.74-1.117-.501-.703-.591-1.47-.421-2.296.247-1.201.478-2.406.716-3.609.003-.016.003-.033.006-.074-.05.04-.089.066-.123.097-.598.545-1.197,1.088-1.789,1.639-.062.057-.11.158-.115.242-.087,1.326-.165,2.653-.248,3.979-.041.641-.554,1.087-1.186,1.04-.6-.045-1.035-.574-.995-1.196.09-1.411.176-2.822.261-4.233.03-.498.222-.916.592-1.253,1.221-1.112,2.44-2.226,3.66-3.339.129-.118.246-.252.385-.356.381-.287.817-.384,1.283-.297.717.134,1.431.278,2.145.426.596.124,1.038.46,1.25,1.033.148.401.244.822.346,1.239.243.995.654,1.924,1.094,2.842.143.297.376.491.691.613.959.373,1.91.764,2.864,1.149.068.027.136.055.203.087.583.277.825.859.591,1.42-.224.536-.856.795-1.439.577-.392-.146-.777-.31-1.165-.465-.829-.332-1.655-.671-2.488-.994-.314-.122-.566-.312-.739-.594-.174-.284-.325-.582-.486-.874-.035-.063-.069-.126-.126-.232Z" stroke-width="0"></path>
                    <path d="M7.102,22.191c.259.402.497.772.735,1.142.48.747.962,1.492,1.437,2.242.041.065.066.158.057.233-.038.303-.09.604-.143.904-.098.559-.309,1.069-.618,1.547-.923,1.43-1.831,2.869-2.752,4.3-.552.858-1.767.912-2.364.114-.368-.492-.375-1.17-.015-1.736.694-1.093,1.366-2.201,2.093-3.272.688-1.014,1.054-2.129,1.231-3.324.098-.66.201-1.319.303-1.978.007-.044.018-.087.037-.174Z" stroke-width="0"></path>
                    <path d="M12.521,11.553c-1.455,0-2.629-1.176-2.629-2.635,0-1.455,1.178-2.631,2.634-2.631,1.456,0,2.636,1.174,2.64,2.628.004,1.46-1.176,2.637-2.645,2.638Z" stroke-width="0"></path>
                    <path d="M27.155,18.138c.204,1.02.396,1.984.589,2.948.06.299.116.599.179.898.012.057.047.109.087.195-.117.163-.256.361-.4.556-.397.536-.795,1.072-1.194,1.606-.743.993-1.239,2.082-1.465,3.316-.261,1.422-.608,2.829-.922,4.241-.183.825.274,1.597,1.058,1.778.783.18,1.554-.308,1.742-1.125.279-1.212.56-2.424.804-3.643.204-1.021.594-1.958,1.176-2.812.781-1.144,1.585-2.272,2.374-3.411.254-.367.481-.753.74-1.117.501-.703.591-1.47.421-2.296-.247-1.201-.478-2.406-.716-3.609-.003-.016-.003-.033-.006-.074.05.04.089.066.123.097.598.545,1.197,1.088,1.789,1.639.062.057.11.158.115.242.087,1.326.165,2.653.248,3.979.041.641.554,1.087,1.186,1.04.6-.045,1.035-.574.995-1.196-.09-1.411-.176-2.822-.261-4.233-.03-.498-.222-.916-.592-1.253-1.221-1.112-2.44-2.226-3.66-3.339-.129-.118-.246-.252-.385-.356-.381-.287-.817-.384-1.283-.297-.717.134-1.431.278-2.145.426-.596.124-1.038.46-1.25,1.033-.148.401-.244.822-.346,1.239-.243.995-.654,1.924-1.094,2.842-.143.297-.376.491-.691.613-.959.373-1.91.764-2.864,1.149-.068.027-.136.055-.203.087-.583.277-.825.859-.591,1.42.224.536.856.795,1.439.577.392-.146.777-.31,1.165-.465.829-.332,1.655-.671,2.488-.994.314-.122.566-.312.739-.594.174-.284.325-.582.486-.874.035-.063.069-.126.126-.232Z" stroke-width="0"></path>
                    <path d="M32.898,22.191c-.259.402-.497.772-.735,1.142-.48.747-.962,1.492-1.437,2.242-.041.065-.066.158-.057.233.038.303.09.604.143.904.098.559.309,1.069.618,1.547.923,1.43,1.831,2.869,2.752,4.3.552.858,1.767.912,2.364.114.368-.492.375-1.17.015-1.736-.694-1.093-1.366-2.201-2.093-3.272-.688-1.014-1.054-2.129-1.231-3.324-.098-.66-.201-1.319-.303-1.978-.007-.044-.018-.087-.037-.174Z" stroke-width="0"></path>
                    <path d="M27.479,11.553c1.455,0,2.629-1.176,2.629-2.635,0-1.455-1.178-2.631-2.634-2.631-1.456,0-2.636,1.174-2.64,2.628-.004,1.46,1.176,2.637,2.645,2.638Z" stroke-width="0"></path>
                `;case"trained":return it`
                    <path d="M21.796,16.477c-.172.859-.334,1.671-.496,2.484-.05.252-.098.505-.151.757-.01.048-.04.091-.073.164.099.137.216.304.337.468.334.452.67.903,1.006,1.354.626.837,1.044,1.754,1.235,2.794.22,1.198.513,2.383.777,3.574.154.695-.231,1.346-.892,1.498-.659.152-1.31-.259-1.468-.948-.235-1.021-.472-2.042-.677-3.069-.172-.86-.5-1.649-.991-2.369-.658-.964-1.335-1.915-2-2.874-.214-.309-.405-.635-.624-.941-.422-.592-.498-1.238-.355-1.934.208-1.012.403-2.027.603-3.041.003-.014.003-.028.005-.063-.043.033-.075.056-.103.082-.504.459-1.009.917-1.508,1.381-.052.048-.092.133-.097.204-.074,1.117-.139,2.235-.209,3.353-.034.54-.467.916-.999.876-.506-.038-.872-.483-.838-1.008.076-1.189.148-2.378.22-3.567.025-.42.187-.772.499-1.056,1.029-.937,2.056-1.875,3.084-2.814.109-.099.207-.212.325-.3.321-.242.688-.324,1.081-.25.604.113,1.206.234,1.808.359.502.104.874.388,1.053.871.125.338.206.693.291,1.044.205.838.551,1.621.922,2.395.12.25.317.414.582.517.808.314,1.609.644,2.413.968.057.023.115.047.171.073.491.233.695.724.498,1.196-.188.452-.722.669-1.213.486-.33-.123-.655-.261-.982-.392-.698-.28-1.395-.565-2.096-.837-.265-.103-.477-.263-.623-.501-.147-.239-.274-.49-.409-.736-.029-.053-.058-.106-.107-.195Z" stroke-width="0"></path>
                    <path d="M16.958,19.892c.218.339.419.65.619.962.404.629.81,1.258,1.211,1.889.035.055.056.133.048.196-.032.255-.076.509-.12.762-.083.471-.261.901-.521,1.304-.778,1.205-1.543,2.417-2.319,3.623-.465.723-1.489.769-1.992.096-.31-.414-.316-.986-.013-1.462.585-.921,1.151-1.855,1.763-2.757.579-.854.888-1.794,1.037-2.8.082-.556.169-1.111.255-1.667.006-.037.016-.073.031-.147Z" stroke-width="0"></path>
                    <path d="M21.524,10.929c-1.226,0-2.215-.991-2.215-2.22,0-1.226.992-2.217,2.219-2.217,1.227,0,2.221.99,2.224,2.215.003,1.23-.991,2.222-2.229,2.222Z" stroke-width="0"></path>
                    <path d="M10.472,22.851c-.139.698-.271,1.357-.403,2.017-.041.205-.079.41-.122.614-.008.039-.032.074-.059.133.08.112.175.247.274.38.272.367.544.734.817,1.099.508.68.848,1.425,1.003,2.269.178.973.416,1.936.631,2.902.125.564-.187,1.093-.724,1.216-.536.123-1.063-.211-1.192-.77-.191-.829-.383-1.658-.55-2.492-.14-.699-.406-1.34-.805-1.924-.534-.783-1.084-1.555-1.624-2.334-.174-.251-.329-.515-.506-.764-.343-.481-.404-1.006-.288-1.571.169-.822.327-1.646.49-2.47.002-.011.002-.023.004-.051-.035.027-.061.045-.084.066-.409.373-.819.744-1.224,1.121-.042.039-.075.108-.079.166-.06.907-.113,1.815-.17,2.723-.028.439-.379.744-.812.711-.411-.031-.708-.393-.681-.818.062-.965.12-1.931.178-2.897.02-.341.152-.627.405-.857.835-.761,1.67-1.523,2.504-2.285.088-.081.168-.172.264-.244.261-.197.559-.263.878-.203.49.092.979.19,1.468.291.408.085.71.315.855.707.102.274.167.563.237.848.167.681.447,1.317.749,1.945.098.203.257.336.472.42.656.255,1.307.523,1.959.786.047.019.093.038.139.059.399.189.565.588.404.971-.153.367-.586.544-.985.395-.268-.1-.532-.212-.797-.318-.567-.227-1.133-.459-1.702-.68-.215-.084-.387-.214-.506-.407-.119-.194-.222-.398-.332-.598-.024-.043-.047-.086-.087-.159Z" stroke-width="0"></path>
                    <path d="M6.543,25.624c.177.275.34.528.503.782.328.511.658,1.021.983,1.534.028.044.045.108.039.159-.026.207-.062.413-.098.619-.067.382-.212.732-.423,1.059-.631.978-1.253,1.963-1.883,2.942-.378.587-1.209.624-1.618.078-.252-.336-.257-.8-.011-1.188.475-.748.935-1.506,1.432-2.239.471-.694.721-1.457.843-2.274.067-.451.138-.902.207-1.353.005-.03.013-.06.025-.119Z" stroke-width="0"></path>
                    <path d="M10.251,18.345c-.996,0-1.799-.804-1.799-1.803,0-.995.806-1.8,1.802-1.801.996,0,1.804.804,1.806,1.798.003.999-.805,1.804-1.81,1.805Z" stroke-width="0"></path>
                    <path d="M31.677,22.851c-.139.698-.271,1.357-.403,2.017-.041.205-.079.41-.122.614-.008.039-.032.074-.059.133.08.112.175.247.274.38.272.367.544.734.817,1.099.508.68.848,1.425,1.003,2.269.178.973.416,1.936.631,2.902.125.564-.187,1.093-.724,1.216-.536.123-1.063-.211-1.192-.77-.191-.829-.383-1.658-.55-2.492-.14-.699-.406-1.34-.805-1.924-.534-.783-1.084-1.555-1.624-2.334-.174-.251-.329-.515-.506-.764-.343-.481-.404-1.006-.288-1.571.169-.822.327-1.646.49-2.47.002-.011.002-.023.004-.051-.035.027-.061.045-.084.066-.409.373-.819.744-1.224,1.121-.042.039-.075.108-.079.166-.06.907-.113,1.815-.17,2.723-.028.439-.379.744-.812.711-.411-.031-.708-.393-.681-.818.062-.965.12-1.931.178-2.897.02-.341.152-.627.405-.857.835-.761,1.67-1.523,2.504-2.285.088-.081.168-.172.264-.244.261-.197.559-.263.878-.203.49.092.979.19,1.468.291.408.085.71.315.855.707.102.274.167.563.237.848.167.681.447,1.317.749,1.945.098.203.257.336.472.42.656.255,1.307.523,1.959.786.047.019.093.038.139.059.399.189.565.588.404.971-.153.367-.586.544-.985.395-.268-.1-.532-.212-.797-.318-.567-.227-1.133-.459-1.702-.68-.215-.084-.387-.214-.506-.407-.119-.194-.222-.398-.332-.598-.024-.043-.047-.086-.087-.159Z" stroke-width="0"></path>
                    <path d="M27.747,25.624c.177.275.34.528.503.782.328.511.658,1.021.983,1.534.028.044.045.108.039.159-.026.207-.062.413-.098.619-.067.382-.212.732-.423,1.059-.631.978-1.253,1.963-1.883,2.942-.378.587-1.209.624-1.618.078-.252-.336-.257-.8-.011-1.188.475-.748.935-1.506,1.432-2.239.471-.694.721-1.457.843-2.274.067-.451.138-.902.207-1.353.005-.03.013-.06.025-.119Z" stroke-width="0"></path>
                    <path d="M31.455,18.345c-.996,0-1.799-.804-1.799-1.803,0-.995.806-1.8,1.802-1.801.996,0,1.804.804,1.806,1.798.003.999-.805,1.804-1.81,1.805Z" stroke-width="0"></path>
                `}}iconSize(){return this.width()/2}iconPosition(){const t=(this.width()-this.iconSize())/2;return[t,t]}render(){const t=this.iconSize(),[e,s]=this.iconPosition();return o`
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
        `}createRenderRoot(){return this}}customElements.define("host-progress-circle",Qs);
//# sourceMappingURL=main-bundle.js.map
