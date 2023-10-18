var ft=Object.defineProperty;var _t=(i,t,e)=>t in i?ft(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var X=(i,t,e)=>(_t(i,typeof t!="symbol"?t+"":t,e),e);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=window,Y=H.ShadowRoot&&(H.ShadyCSS===void 0||H.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),Q=new WeakMap;let dt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Y&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Q.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Q.set(e,t))}return t}toString(){return this.cssText}};const gt=i=>new dt(typeof i=="string"?i:i+"",void 0,Z),yt=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,n,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[o+1],i[0]);return new dt(e,i,Z)},bt=(i,t)=>{Y?i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const s=document.createElement("style"),n=H.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)})},G=Y?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return gt(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var j;const L=window,K=L.trustedTypes,At=K?K.emptyScript:"",tt=L.reactiveElementPolyfillSupport,q={toAttribute(i,t){switch(t){case Boolean:i=i?At:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},ut=(i,t)=>t!==i&&(t==t||i==i),W={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:ut};let S=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const n=this._$Ep(s,e);n!==void 0&&(this._$Ev.set(n,s),t.push(n))}),t}static createProperty(t,e=W){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s=typeof t=="symbol"?Symbol():"__"+t,n=this.getPropertyDescriptor(t,s,e);n!==void 0&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(n){const o=this[t];this[e]=n,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||W}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const n of s)this.createProperty(n,e[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const n of s)e.unshift(G(n))}else t!==void 0&&e.push(G(t));return e}static _$Ep(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return bt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=W){var n;const o=this.constructor._$Ep(t,s);if(o!==void 0&&s.reflect===!0){const r=(((n=s.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?s.converter:q).toAttribute(e,s.type);this._$El=t,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(t,e){var s;const n=this.constructor,o=n._$Ev.get(t);if(o!==void 0&&this._$El!==o){const r=n.getPropertyOptions(o),d=typeof r.converter=="function"?{fromAttribute:r.converter}:((s=r.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?r.converter:q;this._$El=o,this[o]=d.fromAttribute(e,r.type),this._$El=null}}requestUpdate(t,e,s){let n=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||ut)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,o)=>this[o]=n),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(n=>{var o;return(o=n.hostUpdate)===null||o===void 0?void 0:o.call(n)}),this.update(s)):this._$Ek()}catch(n){throw e=!1,this._$Ek(),n}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var n;return(n=s.hostUpdated)===null||n===void 0?void 0:n.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};S.finalized=!0,S.elementProperties=new Map,S.elementStyles=[],S.shadowRootOptions={mode:"open"},tt==null||tt({ReactiveElement:S}),((j=L.reactiveElementVersions)!==null&&j!==void 0?j:L.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var B;const I=window,E=I.trustedTypes,et=E?E.createPolicy("lit-html",{createHTML:i=>i}):void 0,J="$lit$",g=`lit$${(Math.random()+"").slice(9)}$`,pt="?"+g,St=`<${pt}>`,C=document,k=()=>C.createComment(""),O=i=>i===null||typeof i!="object"&&typeof i!="function",vt=Array.isArray,wt=i=>vt(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",F=`[ 	
\f\r]`,x=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,st=/-->/g,it=/>/g,y=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),nt=/'/g,ot=/"/g,$t=/^(?:script|style|textarea|title)$/i,Et=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),c=Et(1),m=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),rt=new WeakMap,w=C.createTreeWalker(C,129,null,!1),Ct=(i,t)=>{const e=i.length-1,s=[];let n,o=t===2?"<svg>":"",r=x;for(let l=0;l<e;l++){const a=i[l];let f,h,u=-1,$=0;for(;$<a.length&&(r.lastIndex=$,h=r.exec(a),h!==null);)$=r.lastIndex,r===x?h[1]==="!--"?r=st:h[1]!==void 0?r=it:h[2]!==void 0?($t.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=y):h[3]!==void 0&&(r=y):r===y?h[0]===">"?(r=n??x,u=-1):h[1]===void 0?u=-2:(u=r.lastIndex-h[2].length,f=h[1],r=h[3]===void 0?y:h[3]==='"'?ot:nt):r===ot||r===nt?r=y:r===st||r===it?r=x:(r=y,n=void 0);const N=r===y&&i[l+1].startsWith("/>")?" ":"";o+=r===x?a+St:u>=0?(s.push(f),a.slice(0,u)+J+a.slice(u)+g+N):a+g+(u===-2?(s.push(void 0),l):N)}const d=o+(i[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return[et!==void 0?et.createHTML(d):d,s]};class U{constructor({strings:t,_$litType$:e},s){let n;this.parts=[];let o=0,r=0;const d=t.length-1,l=this.parts,[a,f]=Ct(t,e);if(this.el=U.createElement(a,s),w.currentNode=this.el.content,e===2){const h=this.el.content,u=h.firstChild;u.remove(),h.append(...u.childNodes)}for(;(n=w.nextNode())!==null&&l.length<d;){if(n.nodeType===1){if(n.hasAttributes()){const h=[];for(const u of n.getAttributeNames())if(u.endsWith(J)||u.startsWith(g)){const $=f[r++];if(h.push(u),$!==void 0){const N=n.getAttribute($.toLowerCase()+J).split(g),R=/([.?@])?(.*)/.exec($);l.push({type:1,index:o,name:R[2],strings:N,ctor:R[1]==="."?xt:R[1]==="?"?kt:R[1]==="@"?Ot:M})}else l.push({type:6,index:o})}for(const u of h)n.removeAttribute(u)}if($t.test(n.tagName)){const h=n.textContent.split(g),u=h.length-1;if(u>0){n.textContent=E?E.emptyScript:"";for(let $=0;$<u;$++)n.append(h[$],k()),w.nextNode(),l.push({type:2,index:++o});n.append(h[u],k())}}}else if(n.nodeType===8)if(n.data===pt)l.push({type:2,index:o});else{let h=-1;for(;(h=n.data.indexOf(g,h+1))!==-1;)l.push({type:7,index:o}),h+=g.length-1}o++}}static createElement(t,e){const s=C.createElement("template");return s.innerHTML=t,s}}function P(i,t,e=i,s){var n,o,r,d;if(t===m)return t;let l=s!==void 0?(n=e._$Co)===null||n===void 0?void 0:n[s]:e._$Cl;const a=O(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==a&&((o=l==null?void 0:l._$AO)===null||o===void 0||o.call(l,!1),a===void 0?l=void 0:(l=new a(i),l._$AT(i,e,s)),s!==void 0?((r=(d=e)._$Co)!==null&&r!==void 0?r:d._$Co=[])[s]=l:e._$Cl=l),l!==void 0&&(t=P(i,l._$AS(i,t.values),l,s)),t}class Pt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:n}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:C).importNode(s,!0);w.currentNode=o;let r=w.nextNode(),d=0,l=0,a=n[0];for(;a!==void 0;){if(d===a.index){let f;a.type===2?f=new z(r,r.nextSibling,this,t):a.type===1?f=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(f=new Ut(r,this,t)),this._$AV.push(f),a=n[++l]}d!==(a==null?void 0:a.index)&&(r=w.nextNode(),d++)}return o}v(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class z{constructor(t,e,s,n){var o;this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=n,this._$Cp=(o=n==null?void 0:n.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),O(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==m&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):wt(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==p&&O(this._$AH)?this._$AA.nextSibling.data=t:this.$(C.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:n}=t,o=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=U.createElement(n.h,this.options)),n);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.v(s);else{const r=new Pt(o,this),d=r.u(this.options);r.v(s),this.$(d),this._$AH=r}}_$AC(t){let e=rt.get(t.strings);return e===void 0&&rt.set(t.strings,e=new U(t)),e}T(t){vt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,n=0;for(const o of t)n===e.length?e.push(s=new z(this.k(k()),this.k(k()),this,this.options)):s=e[n],s._$AI(o),n++;n<e.length&&(this._$AR(s&&s._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){const n=t.nextSibling;t.remove(),t=n}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class M{constructor(t,e,s,n,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,n){const o=this.strings;let r=!1;if(o===void 0)t=P(this,t,e,0),r=!O(t)||t!==this._$AH&&t!==m,r&&(this._$AH=t);else{const d=t;let l,a;for(t=o[0],l=0;l<o.length-1;l++)a=P(this,d[s+l],e,l),a===m&&(a=this._$AH[l]),r||(r=!O(a)||a!==this._$AH[l]),a===p?t=p:t!==p&&(t+=(a??"")+o[l+1]),this._$AH[l]=a}r&&!n&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class xt extends M{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}}const Tt=E?E.emptyScript:"";class kt extends M{constructor(){super(...arguments),this.type=4}j(t){t&&t!==p?this.element.setAttribute(this.name,Tt):this.element.removeAttribute(this.name)}}class Ot extends M{constructor(t,e,s,n,o){super(t,e,s,n,o),this.type=5}_$AI(t,e=this){var s;if((t=(s=P(this,t,e,0))!==null&&s!==void 0?s:p)===m)return;const n=this._$AH,o=t===p&&n!==p||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==p&&(n===p||o);o&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class Ut{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}}const lt=I.litHtmlPolyfillSupport;lt==null||lt(U,z),((B=I.litHtmlVersions)!==null&&B!==void 0?B:I.litHtmlVersions=[]).push("2.7.3");const zt=(i,t,e)=>{var s,n;const o=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:t;let r=o._$litPart$;if(r===void 0){const d=(n=e==null?void 0:e.renderBefore)!==null&&n!==void 0?n:null;o._$litPart$=r=new z(t.insertBefore(k(),d),d,void 0,e??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var V,D;let b=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=zt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return m}};b.finalized=!0,b._$litElement$=!0,(V=globalThis.litElementHydrateSupport)===null||V===void 0||V.call(globalThis,{LitElement:b});const at=globalThis.litElementPolyfillSupport;at==null||at({LitElement:b});((D=globalThis.litElementVersions)!==null&&D!==void 0?D:globalThis.litElementVersions=[]).push("3.3.2");const T={makeAPlan:"make-a-plan",connectToCoach:"connect-to-coach"},v={completeProfile:"completeProfile",makePlan:"makePlan",inviteFriends:"inviteFriends",connectToCoach:"connectToCoach"},_={updateName:"update-your-name",updateLocation:"update-your-location",updatePhone:"update-your-phone"},ht={[_.updateName]:{slug:_.updateName,component:(i,t)=>c`
                            <complete-profile
                                name=${i.slug}
                                module=${i.module}
                                t="${JSON.stringify(t.complete_profile)}"
                                variant="name"
                            ></complete-profile>
                        `},[_.updateLocation]:{slug:_.updateLocation,component:(i,t)=>c`
                            <complete-profile
                                name=${i.slug}
                                module=${i.module}
                                t="${JSON.stringify(t.complete_profile)}"
                                variant="location"
                            ></complete-profile>
                        `},[_.updatePhone]:{slug:_.updatePhone,component:(i,t)=>c`
                            <complete-profile
                                name=${i.slug}
                                module=${i.module}
                                t="${JSON.stringify(t.complete_profile)}"
                                variant="phone"
                            ></complete-profile>
                        `}};class Nt extends b{static get properties(){return{type:{type:String},finishUrl:{type:String},step:{attribute:!1}}}constructor(){super(),this.stepIndex=0,this.steps=[],this.modules={},this.step={},this.t=window.SHAREDFUNCTIONS.escapeObject(jsObject.translations),this._handleHistoryPopState=this._handleHistoryPopState.bind(this),window.addEventListener("popstate",this._handleHistoryPopState)}render(){return this.isWizardLoaded()||(this.loadWizard(),this._handleHistoryPopState()),this.steps.length===0?c`
            <div class="cover">
                <h1 class="brand">${this.t.bad_wizard}</h1>
                <p>${this.t.found_bad_wizard}</p>
                <div class="center"><img class="w-20" src="https://imgs.search.brave.com/3f3MurVApxsoxJlmqxLF0fs5-WlAk6sEu9IV3sICb_k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWR2ZXJ0aXNlY2Fz/dC5jb20vcG9kY2Fz/dC9pbWFnZS9WZXJ5/QmFkV2l6YXJkcw.jpeg" alt="bad wizards" /></div>
                <a href="/">${this.t.home}</a>
            </div>`:c`
        <div class="cover container center">

            ${this.currentStep()}

            <div class="stack-1 | fixed bottom left right p-2">
                ${this.navigationButtons()}
                ${this.stepCounter()}
            </div>

        </div>
        `}currentStep(){const t=this.steps[this.stepIndex];return t.component(t,this.t)}navigationButtons(){const{skippable:t}=this.step,e=this.stepIndex===0,s=this.stepIndex===this.steps.length-1;return c`
        <div class="text-center d-flex justify-content-between">
            ${e?"":c`<button @click=${this._onBack} class="btn outline ">${this.t.back}</button>`}
            <div class="cluster ms-auto">
                ${t&&!s?c`<button @click=${this._onSkip} class="brand">${this.t.skip}</button>`:""}
                ${s?"":c`<button @click=${this._onNext} class="btn">${this.t.next}</button>`}
                ${s?c`<button @click=${this._onFinish} class="btn">${this.t.finish}</button>`:""}
            </div>
        </div>
        `}stepCounter(){return c`
        <div class="center">
            <div class="cluster">
                ${this.steps.map((t,e)=>{const s=e<=this.stepIndex;return c`<div class="step-circle ${s?"complete":""}"></div>`})}
            </div>
        </div>
        <div class="text-center">
            ${this.stepIndex+1} / ${this.steps.length}
        </div>
        `}_onBack(){if(this.stepIndex>0){const t=this.stepIndex-1;this._gotoStep(t)}}_onNext(){if(this.stepIndex+1<this.steps.length){const t=this.stepIndex+1;this._gotoStep(t)}}_onSkip(){const t=this.step.module;for(let e=this.stepIndex+1;e<this.steps.length-1;e++)if(this.steps[e].module!==t){this._gotoStep(e);return}this._onFinish()}_onFinish(){this.finishUrl||(window.location.href="/"),window.location.href=this.finishUrl}_gotoStep(t,e=!0){if(this.steps.length!==0&&(this.stepIndex=this.clampSteps(t),this.step=this.steps[this.stepIndex],e)){const s=new URL(window.location.href),n=s.pathname.split("/"),o=n[n.length-1];let r="";Object.values(T).includes(o)?r=n.join("/")+"/"+this.step.slug+s.search:r=n.slice(0,-1).join("/")+"/"+this.step.slug+s.search,window.history.pushState(null,null,r)}}clampSteps(t){let e=t;return t>this.steps.length-1&&(e=this.steps.length-1),t<0&&(e=0),e}_handleHistoryPopState(){const e=new URL(window.location.href).pathname.split("/"),s=e[e.length-1];Object.values(T).includes(s)&&this._gotoStep(0,!1),this.steps.forEach(({slug:n},o)=>{s===n&&this._gotoStep(o,!1)})}getModule(t,e=!1){const s={[v.completeProfile]:{steps:[ht[_.updateName],ht[_.updateLocation]],skippable:e},[v.makePlan]:{steps:[{slug:"make-a-plan",component:o=>c`
                            <h1>Make a plan</h1>
                            <p>We would like to help you succeed with this training.</p>
                            <p>Making a plan can help you with success.</p>
                            <p>Answering the following questions will help us make you a plan.</p>
                            <p>Or you can skip if you prefer</p>
                        `},{slug:"how-many-sessions",component:o=>c`
                            <h1>Will you do 1 or 2 hour training sessions?</h1>
                            <div class="stack">
                                <button class="btn">1 hour (20 sessions)</button>
                                <button class="btn">2 hour (10 sessions)</button>
                            </div>
                        `},{slug:"what-time-of-day",component:o=>c`
                            <h1>What time of day?</h1>
                            <div class="stack">
                                <button class="btn">Morning</button>
                                <button class="btn">Afternoon</button>
                                <button class="btn">Evening</button>
                            </div>
                        `},{slug:"what-time-interval",component:o=>c`
                            <h1>How often will you meet?</h1>
                            <div class="stack">
                                <button class="btn">Every day</button>
                                <button class="btn">Once a week</button>
                                <button class="btn">Twice a month</button>
                                <button class="btn">Once a month</button>
                            </div>
                        `},{slug:"when-will-you-start",component:o=>c`
                            <h1>When do you plan to start?</h1>
                            <input type="date">
                        `}],skippable:e},[v.inviteFriends]:{steps:[{slug:"invite-your-friends",component:o=>c`
                            <h1>Invite your friends to join your training</h1>
                            <p>Share the link below with your friends so that they can join your training.</p>
                            <p><a href="https://zume.training/zume_app/friend-invite?123456">https://zume.training/zume_app/friend-invite?123456</a></p>
                            <p>Alternatively your friends can scan this QR code in order to join.</p>
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://zume5.training/zume_app/friend_invite?code=123456" alt="" />
                        `},{slug:"via-what-method",component:o=>c`
                            <h1>Use this QR or link or we can email them to you.</h1>
                            <p>This is part of ${o.module}</p>
                            <p>This module is ${o.skippable?"":"not "}skippable</p>
                        `}],skippable:e},[v.connectToCoach]:{steps:[{slug:"connected-to-coach",component:o=>c`
                            <h1>You are now connected to a coach</h1>
                            <p>One of our team will contact you in the next 24-48 hours</p>
                            <p>This is part of ${o.module}</p>
                            <p>This module is ${o.skippable?"":"not "}skippable</p>
                        `}],skippable:e}};return Object.keys(s).includes(t)?s[t]:s[v.completeProfile]}isWizardLoaded(){return Object.keys(this.modules).length!==0}loadWizard(){const t=this.getWizard();this.modules=t,this.steps=[],Object.entries(this.modules).forEach(([e,{steps:s,skippable:n}])=>{s.forEach(({component:o,slug:r})=>{const d={component:o,slug:r,module:e,skippable:n};this.steps.push(d)})})}isWizardTypeValid(){return!!Object.values(T).includes(this.type)}getWizard(){return this.isWizardTypeValid()?{[T.makeAPlan]:{[v.completeProfile]:this.getModule(v.completeProfile,!0),[v.makePlan]:this.getModule(v.makePlan,!0),[v.inviteFriends]:this.getModule(v.inviteFriends,!0)},[T.connectToCoach]:{[v.completeProfile]:this.getModule(v.completeProfile),[v.connectToCoach]:this.getModule(v.connectToCoach)}}[this.type]:{}}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this._handleHistoryPopState)}createRenderRoot(){return this}}window.customElements.define("zume-wizard",Nt);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Rt=i=>(...t)=>({_$litDirective$:i,values:t});class Ht{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Lt=i=>i.strings===void 0,It={},Mt=(i,t=It)=>i._$AH=t;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const jt=Rt(class extends Ht{constructor(i){if(super(i),i.type!==A.PROPERTY&&i.type!==A.ATTRIBUTE&&i.type!==A.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Lt(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[t]){if(t===m||t===p)return t;const e=i.element,s=i.name;if(i.type===A.PROPERTY){if(t===e[s])return m}else if(i.type===A.BOOLEAN_ATTRIBUTE){if(!!t===e.hasAttribute(s))return m}else if(i.type===A.ATTRIBUTE&&e.getAttribute(s)===t+"")return m;return Mt(i),t}});class Wt extends b{static get properties(){return{name:{type:String},module:{type:String},t:{type:Object},variant:{type:String},locations:{attribute:!1},locationError:{attribute:!1},city:{attribute:!1}}}constructor(){super(),this.name="",this.module="",this.variant="",this.t={},this.locations=[],this.locationError="",this.city="",this._handleLocationsChange=this._handleLocationsChange.bind(this),this._clearLocations=this._clearLocations.bind(this),this._handleSuggestions=this._handleSuggestions.bind(this),this._debounceCityChange=debounce(getAddressSuggestions(this._handleSuggestions,zumeProfile.map_key)).bind(this),this._handleCityInputChange=this._handleCityInputChange.bind(this)}firstUpdated(){this.renderRoot.querySelector("#phone").focus()}render(){return c`
        <div>
            ${this.variant==="name"?c`
                <h2 class="f-1">What's your name?</h2>
                <div class="">
                    <label for="name">${this.t.name}</label>
                    <input type="text" id="name" name="name" value="" @change=${this._handleNameChange}>
                </div>
            `:""}

            ${this.variant==="phone"?c`
                <h2 class="f-1">What's your phone number?</h2>
                <div class="">
                    <label for="phone">${this.t.phone}</label>
                    <input type="tel" id="phone" name="phone" value="" @change=${this._handlePhoneChange}>
                </div>
            `:""}

            ${this.variant==="location"?c`
                <h2 class="f-1">What city do you live in?</h2>
                <div class="">
                    <label for="city">${this.t.city}</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        .value="${jt(this.city)}"
                        @input=${this._handleCityChange}
                    >
                </div>
                <div id="address_results">
                    ${this.locationError}
                    ${this.locations.map(t=>c`
                            <div
                                class="address-result"
                                id="${t.id}"
                                data-place-name=${t.place_name}
                                @click=${this._handleLocationSelection}
                            >
                                ${t.place_name}
                            </div>
                        `)}
                </div>
            `:""}
        </div>
        `}_handleNameChange(t){t.stopPropagation();const e={[t.target.name]:t.target.value};this._updateProfile(e)}_handlePhoneChange(t){t.stopPropagation();const e={[t.target.name]:t.target.value};this._updateProfile(e)}_handleCityChange(t){this._handleCityInputChange(t),this._debounceCityChange(t)}_handleCityInputChange(t){}_handleSuggestions(t){t.features.length<1&&(this.locationError=this.t.no_locations_found),this.locations=t.features}_handleLocationsChange(t){this.locations=t}_handleLocationSelection(t){this.city=t.target.dataset.placeName;const e={location_grid_meta:getLocationGridFromMapbox(t.target.id,zumeProfile.profile.location)};this._updateProfile(e),this._clearLocations()}_updateProfile(t){fetch(jsObject.rest_endpoint+"/profile",{method:"POST",body:JSON.stringify(t),headers:{"X-WP-Nonce":jsObject.nonce}}).then(()=>{console.log("success")}).catch(e=>{console.error(e)}).finally(()=>{})}_clearLocations(){this.locations=[]}createRenderRoot(){return this}}window.customElements.define("complete-profile",Wt);class mt extends b{constructor(){super()}render(){return c`
            <div class="container">
                <div class="circle">
                    <div class="triangle"></div>
                </div>
            </div>
        `}}X(mt,"styles",yt`
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
    `);window.customElements.define("play-button",mt);const ct=document.querySelector(".nav-toggle"),Bt=document.querySelector("#nav");ct&&ct.addEventListener("click",i=>{Bt.classList.toggle("nav--visible")});
//# sourceMappingURL=main-48d58cba.js.map
