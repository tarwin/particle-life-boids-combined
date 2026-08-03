var is=e=>{throw TypeError(e)};var Br=(e,t,n)=>t.has(e)||is("Cannot "+n);var ss=(e,t,n)=>t.has(e)?is("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n);var Ue=(e,t,n)=>(Br(e,t,"access private method"),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();/**
* @vue/shared v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ii(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const fe={},$t=[],lt=()=>{},io=()=>!1,jn=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),Hn=e=>e.startsWith("onUpdate:"),Fe=Object.assign,zi=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Er=Object.prototype.hasOwnProperty,re=(e,t)=>Er.call(e,t),Y=Array.isArray,jt=e=>Mn(e)==="[object Map]",Xt=e=>Mn(e)==="[object Set]",os=e=>Mn(e)==="[object Date]",Q=e=>typeof e=="function",ye=e=>typeof e=="string",at=e=>typeof e=="symbol",ue=e=>e!==null&&typeof e=="object",so=e=>(ue(e)||Q(e))&&Q(e.then)&&Q(e.catch),oo=Object.prototype.toString,Mn=e=>oo.call(e),Fr=e=>Mn(e).slice(8,-1),ro=e=>Mn(e)==="[object Object]",Li=e=>ye(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,dn=Ii(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Kn=e=>{const t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},Or=/-\w/g,Ye=Kn(e=>e.replace(Or,t=>t.slice(1).toUpperCase())),Ir=/\B([A-Z])/g,Et=Kn(e=>e.replace(Ir,"-$1").toLowerCase()),lo=Kn(e=>e.charAt(0).toUpperCase()+e.slice(1)),oi=Kn(e=>e?`on${lo(e)}`:""),rt=(e,t)=>!Object.is(e,t),Fn=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},ao=(e,t,n,i=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:i,value:n})},qn=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let rs;const Yn=()=>rs||(rs=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function ht(e){if(Y(e)){const t={};for(let n=0;n<e.length;n++){const i=e[n],s=ye(i)?Ur(i):ht(i);if(s)for(const o in s)t[o]=s[o]}return t}else if(ye(e)||ue(e))return e}const zr=/;(?![^(]*\))/g,Lr=/:([^]+)/,Dr=/\/\*[^]*?\*\//g;function Ur(e){const t={};return e.replace(Dr,"").split(zr).forEach(n=>{if(n){const i=n.split(Lr);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function Me(e){let t="";if(ye(e))t=e;else if(Y(e))for(let n=0;n<e.length;n++){const i=Me(e[n]);i&&(t+=i+" ")}else if(ue(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const Nr="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",_r=Ii(Nr);function uo(e){return!!e||e===""}function Vr(e,t){if(e.length!==t.length)return!1;let n=!0;for(let i=0;n&&i<e.length;i++)n=Zt(e[i],t[i]);return n}function Zt(e,t){if(e===t)return!0;let n=os(e),i=os(t);if(n||i)return n&&i?e.getTime()===t.getTime():!1;if(n=at(e),i=at(t),n||i)return e===t;if(n=Y(e),i=Y(t),n||i)return n&&i?Vr(e,t):!1;if(n=ue(e),i=ue(t),n||i){if(!n||!i)return!1;const s=Object.keys(e).length,o=Object.keys(t).length;if(s!==o)return!1;for(const l in e){const u=e.hasOwnProperty(l),c=t.hasOwnProperty(l);if(u&&!c||!u&&c||!Zt(e[l],t[l]))return!1}}return String(e)===String(t)}function Di(e,t){return e.findIndex(n=>Zt(n,t))}const co=e=>!!(e&&e.__v_isRef===!0),k=e=>ye(e)?e:e==null?"":Y(e)||ue(e)&&(e.toString===oo||!Q(e.toString))?co(e)?k(e.value):JSON.stringify(e,fo,2):String(e),fo=(e,t)=>co(t)?fo(e,t.value):jt(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[i,s],o)=>(n[ri(i,o)+" =>"]=s,n),{})}:Xt(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>ri(n))}:at(t)?ri(t):ue(t)&&!Y(t)&&!ro(t)?String(t):t,ri=(e,t="")=>{var n;return at(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ae;class Wr{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&Ae&&(Ae.active?(this.parent=Ae,this.index=(Ae.scopes||(Ae.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes){const i=this.scopes.slice();for(t=0,n=i.length;t<n;t++)i[t].pause()}for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes){const s=this.scopes.slice();for(t=0,n=s.length;t<n;t++)s[t].resume()}const i=this.effects.slice();for(t=0,n=i.length;t<n;t++)i[t].resume()}}run(t){if(this._active){const n=Ae;try{return Ae=this,t()}finally{Ae=n}}}on(){++this._on===1&&(this.prevScope=Ae,Ae=this)}off(){if(this._on>0&&--this._on===0){if(Ae===this)Ae=this.prevScope;else{let t=Ae;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let n,i;for(n=0,i=this.effects.length;n<i;n++)this.effects[n].stop();for(this.effects.length=0,n=0,i=this.cleanups.length;n<i;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){const s=this.scopes.slice();for(n=0,i=s.length;n<i;n++)s[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Gr(){return Ae}let pe;const li=new WeakSet;class po{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ae&&(Ae.active?Ae.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,li.has(this)&&(li.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||mo(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,ls(this),go(this);const t=pe,n=Je;pe=this,Je=!0;try{return this.fn()}finally{bo(this),pe=t,Je=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)_i(t);this.deps=this.depsTail=void 0,ls(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?li.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){yi(this)&&this.run()}get dirty(){return yi(this)}}let ho=0,fn,pn;function mo(e,t=!1){if(e.flags|=8,t){e.next=pn,pn=e;return}e.next=fn,fn=e}function Ui(){ho++}function Ni(){if(--ho>0)return;if(pn){let t=pn;for(pn=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;fn;){let t=fn;for(fn=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){e||(e=i)}t=n}}if(e)throw e}function go(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function bo(e){let t,n=e.depsTail,i=n;for(;i;){const s=i.prevDep;i.version===-1?(i===n&&(n=s),_i(i),$r(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}e.deps=t,e.depsTail=n}function yi(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(vo(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function vo(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===bn)||(e.globalVersion=bn,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!yi(e))))return;e.flags|=2;const t=e.dep,n=pe,i=Je;pe=e,Je=!0;try{go(e);const s=e.fn(e._value);(t.version===0||rt(s,e._value))&&(e.flags|=128,e._value=s,t.version++)}catch(s){throw t.version++,s}finally{pe=n,Je=i,bo(e),e.flags&=-3}}function _i(e,t=!1){const{dep:n,prevSub:i,nextSub:s}=e;if(i&&(i.nextSub=s,e.prevSub=void 0),s&&(s.prevSub=i,e.nextSub=void 0),n.subs===e&&(n.subs=i,!i&&n.computed)){n.computed.flags&=-5;for(let o=n.computed.deps;o;o=o.nextDep)_i(o,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function $r(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let Je=!0;const yo=[];function xt(){yo.push(Je),Je=!1}function wt(){const e=yo.pop();Je=e===void 0?!0:e}function ls(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=pe;pe=void 0;try{t()}finally{pe=n}}}let bn=0;class jr{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Vi{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!pe||!Je||pe===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==pe)n=this.activeLink=new jr(pe,this),pe.deps?(n.prevDep=pe.depsTail,pe.depsTail.nextDep=n,pe.depsTail=n):pe.deps=pe.depsTail=n,xo(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const i=n.nextDep;i.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=i),n.prevDep=pe.depsTail,n.nextDep=void 0,pe.depsTail.nextDep=n,pe.depsTail=n,pe.deps===n&&(pe.deps=i)}return n}trigger(t){this.version++,bn++,this.notify(t)}notify(t){Ui();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Ni()}}}function xo(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)xo(i)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const xi=new WeakMap,Lt=Symbol(""),wi=Symbol(""),vn=Symbol("");function Ee(e,t,n){if(Je&&pe){let i=xi.get(e);i||xi.set(e,i=new Map);let s=i.get(n);s||(i.set(n,s=new Vi),s.map=i,s.key=n),s.track()}}function mt(e,t,n,i,s,o){const l=xi.get(e);if(!l){bn++;return}const u=c=>{c&&c.trigger()};if(Ui(),t==="clear")l.forEach(u);else{const c=Y(e),h=c&&Li(n);if(c&&n==="length"){const f=Number(i);l.forEach((g,S)=>{(S==="length"||S===vn||!at(S)&&S>=f)&&u(g)})}else switch((n!==void 0||l.has(void 0))&&u(l.get(n)),h&&u(l.get(vn)),t){case"add":c?h&&u(l.get("length")):(u(l.get(Lt)),jt(e)&&u(l.get(wi)));break;case"delete":c||(u(l.get(Lt)),jt(e)&&u(l.get(wi)));break;case"set":jt(e)&&u(l.get(Lt));break}}Ni()}function Wt(e){const t=oe(e);return t===e?t:(Ee(t,"iterate",vn),He(e)?t:t.map(Xe))}function Jn(e){return Ee(e=oe(e),"iterate",vn),e}function st(e,t){return St(e)?qt(Dt(e)?Xe(t):t):Xe(t)}const Hr={__proto__:null,[Symbol.iterator](){return ai(this,Symbol.iterator,e=>st(this,e))},concat(...e){return Wt(this).concat(...e.map(t=>Y(t)?Wt(t):t))},entries(){return ai(this,"entries",e=>(e[1]=st(this,e[1]),e))},every(e,t){return ct(this,"every",e,t,void 0,arguments)},filter(e,t){return ct(this,"filter",e,t,n=>n.map(i=>st(this,i)),arguments)},find(e,t){return ct(this,"find",e,t,n=>st(this,n),arguments)},findIndex(e,t){return ct(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return ct(this,"findLast",e,t,n=>st(this,n),arguments)},findLastIndex(e,t){return ct(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return ct(this,"forEach",e,t,void 0,arguments)},includes(...e){return ui(this,"includes",e)},indexOf(...e){return ui(this,"indexOf",e)},join(e){return Wt(this).join(e)},lastIndexOf(...e){return ui(this,"lastIndexOf",e)},map(e,t){return ct(this,"map",e,t,void 0,arguments)},pop(){return tn(this,"pop")},push(...e){return tn(this,"push",e)},reduce(e,...t){return as(this,"reduce",e,t)},reduceRight(e,...t){return as(this,"reduceRight",e,t)},shift(){return tn(this,"shift")},some(e,t){return ct(this,"some",e,t,void 0,arguments)},splice(...e){return tn(this,"splice",e)},toReversed(){return Wt(this).toReversed()},toSorted(e){return Wt(this).toSorted(e)},toSpliced(...e){return Wt(this).toSpliced(...e)},unshift(...e){return tn(this,"unshift",e)},values(){return ai(this,"values",e=>st(this,e))}};function ai(e,t,n){const i=Jn(e),s=i[t]();return i!==e&&!He(e)&&(s._next=s.next,s.next=()=>{const o=s._next();return o.done||(o.value=n(o.value)),o}),s}const Kr=Array.prototype;function ct(e,t,n,i,s,o){const l=Jn(e),u=l!==e&&!He(e),c=l[t];if(c!==Kr[t]){const g=c.apply(e,o);return u?Xe(g):g}let h=n;l!==e&&(u?h=function(g,S){return n.call(this,st(e,g),S,e)}:n.length>2&&(h=function(g,S){return n.call(this,g,S,e)}));const f=c.call(l,h,i);return u&&s?s(f):f}function as(e,t,n,i){const s=Jn(e),o=s!==e&&!He(e);let l=n,u=!1;s!==e&&(o?(u=i.length===0,l=function(h,f,g){return u&&(u=!1,h=st(e,h)),n.call(this,h,st(e,f),g,e)}):n.length>3&&(l=function(h,f,g){return n.call(this,h,f,g,e)}));const c=s[t](l,...i);return u?st(e,c):c}function ui(e,t,n){const i=oe(e);Ee(i,"iterate",vn);const s=i[t](...n);return(s===-1||s===!1)&&$i(n[0])?(n[0]=oe(n[0]),i[t](...n)):s}function tn(e,t,n=[]){xt(),Ui();const i=oe(e)[t].apply(e,n);return Ni(),wt(),i}const qr=Ii("__proto__,__v_isRef,__isVue"),wo=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(at));function Yr(e){at(e)||(e=String(e));const t=oe(this);return Ee(t,"has",e),t.hasOwnProperty(e)}class So{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,i){if(n==="__v_skip")return t.__v_skip;const s=this._isReadonly,o=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return o;if(n==="__v_raw")return i===(s?o?ol:ko:o?Mo:Co).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const l=Y(t);if(!s){let c;if(l&&(c=Hr[n]))return c;if(n==="hasOwnProperty")return Yr}const u=Reflect.get(t,n,Be(t)?t:i);if((at(n)?wo.has(n):qr(n))||(s||Ee(t,"get",n),o))return u;if(Be(u)){const c=l&&Li(n)?u:u.value;return s&&ue(c)?Pi(c):c}return ue(u)?s?Pi(u):yn(u):u}}class Po extends So{constructor(t=!1){super(!1,t)}set(t,n,i,s){let o=t[n];const l=Y(t)&&Li(n);if(!this._isShallow){const h=St(o);if(!He(i)&&!St(i)&&(o=oe(o),i=oe(i)),!l&&Be(o)&&!Be(i))return h||(o.value=i),!0}const u=l?Number(n)<t.length:re(t,n),c=Reflect.set(t,n,i,Be(t)?t:s);return t===oe(s)&&c&&(u?rt(i,o)&&mt(t,"set",n,i):mt(t,"add",n,i)),c}deleteProperty(t,n){const i=re(t,n);t[n];const s=Reflect.deleteProperty(t,n);return s&&i&&mt(t,"delete",n,void 0),s}has(t,n){const i=Reflect.has(t,n);return(!at(n)||!wo.has(n))&&Ee(t,"has",n),i}ownKeys(t){return Ee(t,"iterate",Y(t)?"length":Lt),Reflect.ownKeys(t)}}class Jr extends So{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const Xr=new Po,Zr=new Jr,Qr=new Po(!0);const Si=e=>e,Tn=e=>Reflect.getPrototypeOf(e);function el(e,t,n){return function(...i){const s=this.__v_raw,o=oe(s),l=jt(o),u=e==="entries"||e===Symbol.iterator&&l,c=e==="keys"&&l,h=s[e](...i),f=n?Si:t?qt:Xe;return!t&&Ee(o,"iterate",c?wi:Lt),Fe(Object.create(h),{next(){const{value:g,done:S}=h.next();return S?{value:g,done:S}:{value:u?[f(g[0]),f(g[1])]:f(g),done:S}}})}}function An(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function tl(e,t){const n={get(s){const o=this.__v_raw,l=oe(o),u=oe(s);e||(rt(s,u)&&Ee(l,"get",s),Ee(l,"get",u));const{has:c}=Tn(l),h=t?Si:e?qt:Xe;if(c.call(l,s))return h(o.get(s));if(c.call(l,u))return h(o.get(u));o!==l&&o.get(s)},get size(){const s=this.__v_raw;return!e&&Ee(oe(s),"iterate",Lt),s.size},has(s){const o=this.__v_raw,l=oe(o),u=oe(s);return e||(rt(s,u)&&Ee(l,"has",s),Ee(l,"has",u)),s===u?o.has(s):o.has(s)||o.has(u)},forEach(s,o){const l=this,u=l.__v_raw,c=oe(u),h=t?Si:e?qt:Xe;return!e&&Ee(c,"iterate",Lt),u.forEach((f,g)=>s.call(o,h(f),h(g),l))}};return Fe(n,e?{add:An("add"),set:An("set"),delete:An("delete"),clear:An("clear")}:{add(s){const o=oe(this),l=Tn(o),u=oe(s),c=!t&&!He(s)&&!St(s)?u:s;return l.has.call(o,c)||rt(s,c)&&l.has.call(o,s)||rt(u,c)&&l.has.call(o,u)||(o.add(c),mt(o,"add",c,c)),this},set(s,o){!t&&!He(o)&&!St(o)&&(o=oe(o));const l=oe(this),{has:u,get:c}=Tn(l);let h=u.call(l,s);h||(s=oe(s),h=u.call(l,s));const f=c.call(l,s);return l.set(s,o),h?rt(o,f)&&mt(l,"set",s,o):mt(l,"add",s,o),this},delete(s){const o=oe(this),{has:l,get:u}=Tn(o);let c=l.call(o,s);c||(s=oe(s),c=l.call(o,s)),u&&u.call(o,s);const h=o.delete(s);return c&&mt(o,"delete",s,void 0),h},clear(){const s=oe(this),o=s.size!==0,l=s.clear();return o&&mt(s,"clear",void 0,void 0),l}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=el(s,e,t)}),n}function Wi(e,t){const n=tl(e,t);return(i,s,o)=>s==="__v_isReactive"?!e:s==="__v_isReadonly"?e:s==="__v_raw"?i:Reflect.get(re(n,s)&&s in i?n:i,s,o)}const nl={get:Wi(!1,!1)},il={get:Wi(!1,!0)},sl={get:Wi(!0,!1)};const Co=new WeakMap,Mo=new WeakMap,ko=new WeakMap,ol=new WeakMap;function rl(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function yn(e){return St(e)?e:Gi(e,!1,Xr,nl,Co)}function ll(e){return Gi(e,!1,Qr,il,Mo)}function Pi(e){return Gi(e,!0,Zr,sl,ko)}function Gi(e,t,n,i,s){if(!ue(e)||e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;const o=s.get(e);if(o)return o;const l=rl(Fr(e));if(l===0)return e;const u=new Proxy(e,l===2?i:n);return s.set(e,u),u}function Dt(e){return St(e)?Dt(e.__v_raw):!!(e&&e.__v_isReactive)}function St(e){return!!(e&&e.__v_isReadonly)}function He(e){return!!(e&&e.__v_isShallow)}function $i(e){return e?!!e.__v_raw:!1}function oe(e){const t=e&&e.__v_raw;return t?oe(t):e}function al(e){return!re(e,"__v_skip")&&Object.isExtensible(e)&&ao(e,"__v_skip",!0),e}const Xe=e=>ue(e)?yn(e):e,qt=e=>ue(e)?Pi(e):e;function Be(e){return e?e.__v_isRef===!0:!1}function he(e){return Ro(e,!1)}function nn(e){return Ro(e,!0)}function Ro(e,t){return Be(e)?e:new ul(e,t)}class ul{constructor(t,n){this.dep=new Vi,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:oe(t),this._value=n?t:Xe(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,i=this.__v_isShallow||He(t)||St(t);t=i?t:oe(t),rt(t,n)&&(this._rawValue=t,this._value=i?t:Xe(t),this.dep.trigger())}}function Pe(e){return Be(e)?e.value:e}const cl={get:(e,t,n)=>t==="__v_raw"?e:Pe(Reflect.get(e,t,n)),set:(e,t,n,i)=>{const s=e[t];return Be(s)&&!Be(n)?(s.value=n,!0):Reflect.set(e,t,n,i)}};function To(e){return Dt(e)?e:new Proxy(e,cl)}class dl{constructor(t,n,i){this.fn=t,this.setter=n,this._value=void 0,this.dep=new Vi(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=bn-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&pe!==this)return mo(this,!0),!0}get value(){const t=this.dep.track();return vo(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function fl(e,t,n=!1){let i,s;return Q(e)?i=e:(i=e.get,s=e.set),new dl(i,s,n)}const Bn={},Dn=new WeakMap;let It;function pl(e,t=!1,n=It){if(n){let i=Dn.get(n);i||Dn.set(n,i=[]),i.push(e)}}function hl(e,t,n=fe){const{immediate:i,deep:s,once:o,scheduler:l,augmentJob:u,call:c}=n,h=v=>s?v:He(v)||s===!1||s===0?gt(v,1):gt(v);let f,g,S,y,T=!1,x=!1;if(Be(e)?(g=()=>e.value,T=He(e)):Dt(e)?(g=()=>h(e),T=!0):Y(e)?(x=!0,T=e.some(v=>Dt(v)||He(v)),g=()=>e.map(v=>{if(Be(v))return v.value;if(Dt(v))return h(v);if(Q(v))return c?c(v,2):v()})):Q(e)?t?g=c?()=>c(e,2):e:g=()=>{if(S){xt();try{S()}finally{wt()}}const v=It;It=f;try{return c?c(e,3,[y]):e(y)}finally{It=v}}:g=lt,t&&s){const v=g,A=s===!0?1/0:s;g=()=>gt(v(),A)}const E=Gr(),j=()=>{f.stop(),E&&E.active&&zi(E.effects,f)};if(o&&t){const v=t;t=(...A)=>{const U=v(...A);return j(),U}}let I=x?new Array(e.length).fill(Bn):Bn;const R=v=>{if(!(!(f.flags&1)||!f.dirty&&!v))if(t){const A=f.run();if(v||s||T||(x?A.some((U,_)=>rt(U,I[_])):rt(A,I))){S&&S();const U=It;It=f;try{const _=[A,I===Bn?void 0:x&&I[0]===Bn?[]:I,y];I=A,c?c(t,3,_):t(..._)}finally{It=U}}}else f.run()};return u&&u(R),f=new po(g),f.scheduler=l?()=>l(R,!1):R,y=v=>pl(v,!1,f),S=f.onStop=()=>{const v=Dn.get(f);if(v){if(c)c(v,4);else for(const A of v)A();Dn.delete(f)}},t?i?R(!0):I=f.run():l?l(R.bind(null,!0),!0):f.run(),j.pause=f.pause.bind(f),j.resume=f.resume.bind(f),j.stop=j,j}function gt(e,t=1/0,n){if(t<=0||!ue(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,Be(e))gt(e.value,t,n);else if(Y(e))for(let i=0;i<e.length;i++)gt(e[i],t,n);else if(Xt(e)||jt(e))e.forEach(i=>{gt(i,t,n)});else if(ro(e)){for(const i in e)gt(e[i],t,n);for(const i of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,i)&&gt(e[i],t,n)}return e}/**
* @vue/runtime-core v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function kn(e,t,n,i){try{return i?e(...i):e()}catch(s){Xn(s,t,n)}}function Ze(e,t,n,i){if(Q(e)){const s=kn(e,t,n,i);return s&&so(s)&&s.catch(o=>{Xn(o,t,n)}),s}if(Y(e)){const s=[];for(let o=0;o<e.length;o++)s.push(Ze(e[o],t,n,i));return s}}function Xn(e,t,n,i=!0){const s=t?t.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:l}=t&&t.appContext.config||fe;if(t){let u=t.parent;const c=t.proxy,h=`https://vuejs.org/error-reference/#runtime-${n}`;for(;u;){const f=u.ec;if(f){for(let g=0;g<f.length;g++)if(f[g](e,c,h)===!1)return}u=u.parent}if(o){xt(),kn(o,null,10,[e,c,h]),wt();return}}ml(e,n,s,i,l)}function ml(e,t,n,i=!0,s=!1){if(s)throw e;console.error(e)}const Le=[];let it=-1;const Ht=[];let Tt=null,Gt=0;const Ao=Promise.resolve();let Un=null;function ji(e){const t=Un||Ao;return e?t.then(this?e.bind(this):e):t}function gl(e){let t=it+1,n=Le.length;for(;t<n;){const i=t+n>>>1,s=Le[i],o=xn(s);o<e||o===e&&s.flags&2?t=i+1:n=i}return t}function Hi(e){if(!(e.flags&1)){const t=xn(e),n=Le[Le.length-1];!n||!(e.flags&2)&&t>=xn(n)?Le.push(e):Le.splice(gl(t),0,e),e.flags|=1,Bo()}}function Bo(){Un||(Un=Ao.then(Fo))}function bl(e){Y(e)?Ht.push(...e):Tt&&e.id===-1?Tt.splice(Gt+1,0,e):e.flags&1||(Ht.push(e),e.flags|=1),Bo()}function us(e,t,n=it+1){for(;n<Le.length;n++){const i=Le[n];if(i&&i.flags&2){if(e&&i.id!==e.uid)continue;Le.splice(n,1),n--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Eo(e){if(Ht.length){const t=[...new Set(Ht)].sort((n,i)=>xn(n)-xn(i));if(Ht.length=0,Tt){Tt.push(...t);return}for(Tt=t,Gt=0;Gt<Tt.length;Gt++){const n=Tt[Gt];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Tt=null,Gt=0}}const xn=e=>e.id==null?e.flags&2?-1:1/0:e.id;function Fo(e){try{for(it=0;it<Le.length;it++){const t=Le[it];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),kn(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;it<Le.length;it++){const t=Le[it];t&&(t.flags&=-2)}it=-1,Le.length=0,Eo(),Un=null,(Le.length||Ht.length)&&Fo()}}let je=null,Oo=null;function Nn(e){const t=je;return je=e,Oo=e&&e.type.__scopeId||null,t}function vl(e,t=je,n){if(!t||e._n)return e;const i=(...s)=>{i._d&&xs(-1);const o=Nn(t),l=Nt.length;let u;try{u=e(...s)}finally{for(let c=Nt.length;c>l;c--)ir();Nn(o),i._d&&xs(1)}return u};return i._n=!0,i._c=!0,i._d=!0,i}function $(e,t){if(je===null)return e;const n=ni(je),i=e.dirs||(e.dirs=[]);for(let s=0;s<t.length;s++){let[o,l,u,c=fe]=t[s];o&&(Q(o)&&(o={mounted:o,updated:o}),o.deep&&gt(l),i.push({dir:o,instance:n,value:l,oldValue:void 0,arg:u,modifiers:c}))}return e}function Ft(e,t,n,i){const s=e.dirs,o=t&&t.dirs;for(let l=0;l<s.length;l++){const u=s[l];o&&(u.oldValue=o[l].value);let c=u.dir[i];c&&(xt(),Ze(c,n,8,[e.el,u,e,t]),wt())}}function yl(e,t){if(De){let n=De.provides;const i=De.parent&&De.parent.provides;i===n&&(n=De.provides=Object.create(i)),n[e]=t}}function On(e,t,n=!1){const i=ha();if(i||Kt){let s=Kt?Kt._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&e in s)return s[e];if(arguments.length>1)return n&&Q(t)?t.call(i&&i.proxy):t}}const xl=Symbol.for("v-scx"),wl=()=>On(xl);function Ut(e,t,n){return Io(e,t,n)}function Io(e,t,n=fe){const{immediate:i,deep:s,flush:o,once:l}=n,u=Fe({},n),c=t&&i||!t&&o!=="post";let h;if(Pn){if(o==="sync"){const y=wl();h=y.__watcherHandles||(y.__watcherHandles=[])}else if(!c){const y=()=>{};return y.stop=lt,y.resume=lt,y.pause=lt,y}}const f=De;u.call=(y,T,x)=>Ze(y,f,T,x);let g=!1;o==="post"?u.scheduler=y=>{_e(y,f&&f.suspense)}:o!=="sync"&&(g=!0,u.scheduler=(y,T)=>{T?y():Hi(y)}),u.augmentJob=y=>{t&&(y.flags|=4),g&&(y.flags|=2,f&&(y.id=f.uid,y.i=f))};const S=hl(e,t,u);return Pn&&(h?h.push(S):c&&S()),S}function Sl(e,t,n){const i=this.proxy,s=ye(e)?e.includes(".")?zo(i,e):()=>i[e]:e.bind(i,i);let o;Q(t)?o=t:(o=t.handler,n=t);const l=Rn(this),u=Io(s,o.bind(i),n);return l(),u}function zo(e,t){const n=t.split(".");return()=>{let i=e;for(let s=0;s<n.length&&i;s++)i=i[n[s]];return i}}const Pl=Symbol("_vte"),Cl=e=>e.__isTeleport,ci=Symbol("_leaveCb");function Ki(e,t){e.shapeFlag&6&&e.component?(e.transition=t,Ki(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Lo(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function cs(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}const _n=new WeakMap;function hn(e,t,n,i,s=!1){if(Y(e)){e.forEach((x,E)=>hn(x,t&&(Y(t)?t[E]:t),n,i,s));return}if(mn(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&hn(e,t,n,i.component.subTree);return}const o=i.shapeFlag&4?ni(i.component):i.el,l=s?null:o,{i:u,r:c}=e,h=t&&t.r,f=u.refs===fe?u.refs={}:u.refs,g=u.setupState,S=oe(g),y=g===fe?io:x=>cs(f,x)?!1:re(S,x),T=(x,E)=>!(E&&cs(f,E));if(h!=null&&h!==c){if(ds(t),ye(h))f[h]=null,y(h)&&(g[h]=null);else if(Be(h)){const x=t;T(h,x.k)&&(h.value=null),x.k&&(f[x.k]=null)}}if(Q(c))kn(c,u,12,[l,f]);else{const x=ye(c),E=Be(c);if(x||E){const j=()=>{if(e.f){const I=x?y(c)?g[c]:f[c]:T()||!e.k?c.value:f[e.k];if(s)Y(I)&&zi(I,o);else if(Y(I))I.includes(o)||I.push(o);else if(x)f[c]=[o],y(c)&&(g[c]=f[c]);else{const R=[o];T(c,e.k)&&(c.value=R),e.k&&(f[e.k]=R)}}else x?(f[c]=l,y(c)&&(g[c]=l)):E&&(T(c,e.k)&&(c.value=l),e.k&&(f[e.k]=l))};if(l){const I=()=>{j(),_n.delete(e)};I.id=-1,_n.set(e,I),_e(I,n)}else ds(e),j()}}}function ds(e){const t=_n.get(e);t&&(t.flags|=8,_n.delete(e))}Yn().requestIdleCallback;Yn().cancelIdleCallback;const mn=e=>!!e.type.__asyncLoader,Do=e=>e.type.__isKeepAlive;function Ml(e,t){Uo(e,"a",t)}function kl(e,t){Uo(e,"da",t)}function Uo(e,t,n=De){const i=e.__wdc||(e.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return e()});if(Zn(t,i,n),n){let s=n.parent;for(;s&&s.parent;)Do(s.parent.vnode)&&Rl(i,t,n,s),s=s.parent}}function Rl(e,t,n,i){const s=Zn(t,e,i,!0);No(()=>{zi(i[t],s)},n)}function Zn(e,t,n=De,i=!1){if(n){const s=n[e]||(n[e]=[]),o=t.__weh||(t.__weh=(...l)=>{xt();const u=Rn(n),c=Ze(t,n,e,l);return u(),wt(),c});return i?s.unshift(o):s.push(o),o}}const Pt=e=>(t,n=De)=>{(!Pn||e==="sp")&&Zn(e,(...i)=>t(...i),n)},Tl=Pt("bm"),Qn=Pt("m"),Al=Pt("bu"),Bl=Pt("u"),wn=Pt("bum"),No=Pt("um"),El=Pt("sp"),Fl=Pt("rtg"),Ol=Pt("rtc");function Il(e,t=De){Zn("ec",e,t)}const zl=Symbol.for("v-ndc");function be(e,t,n,i){let s;const o=n,l=Y(e);if(l||ye(e)){const u=l&&Dt(e);let c=!1,h=!1;u&&(c=!He(e),h=St(e),e=Jn(e)),s=new Array(e.length);for(let f=0,g=e.length;f<g;f++)s[f]=t(c?h?qt(Xe(e[f])):Xe(e[f]):e[f],f,void 0,o)}else if(typeof e=="number"){s=new Array(e);for(let u=0;u<e;u++)s[u]=t(u+1,u,void 0,o)}else if(ue(e))if(e[Symbol.iterator])s=Array.from(e,(u,c)=>t(u,c,void 0,o));else{const u=Object.keys(e);s=new Array(u.length);for(let c=0,h=u.length;c<h;c++){const f=u[c];s[c]=t(e[f],f,c,o)}}else s=[];return s}const Ci=e=>e?ar(e)?ni(e):Ci(e.parent):null,gn=Fe(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Ci(e.parent),$root:e=>Ci(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Vo(e),$forceUpdate:e=>e.f||(e.f=()=>{Hi(e.update)}),$nextTick:e=>e.n||(e.n=ji.bind(e.proxy)),$watch:e=>Sl.bind(e)}),di=(e,t)=>e!==fe&&!e.__isScriptSetup&&re(e,t),Ll={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:i,data:s,props:o,accessCache:l,type:u,appContext:c}=e;if(t[0]!=="$"){const S=l[t];if(S!==void 0)switch(S){case 1:return i[t];case 2:return s[t];case 4:return n[t];case 3:return o[t]}else{if(di(i,t))return l[t]=1,i[t];if(s!==fe&&re(s,t))return l[t]=2,s[t];if(re(o,t))return l[t]=3,o[t];if(n!==fe&&re(n,t))return l[t]=4,n[t];Mi&&(l[t]=0)}}const h=gn[t];let f,g;if(h)return t==="$attrs"&&Ee(e.attrs,"get",""),h(e);if((f=u.__cssModules)&&(f=f[t]))return f;if(n!==fe&&re(n,t))return l[t]=4,n[t];if(g=c.config.globalProperties,re(g,t))return g[t]},set({_:e},t,n){const{data:i,setupState:s,ctx:o}=e;return di(s,t)?(s[t]=n,!0):i!==fe&&re(i,t)?(i[t]=n,!0):re(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(o[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:i,appContext:s,props:o,type:l}},u){let c;return!!(n[u]||e!==fe&&u[0]!=="$"&&re(e,u)||di(t,u)||re(o,u)||re(i,u)||re(gn,u)||re(s.config.globalProperties,u)||(c=l.__cssModules)&&c[u])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:re(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function fs(e){return Y(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let Mi=!0;function Dl(e){const t=Vo(e),n=e.proxy,i=e.ctx;Mi=!1,t.beforeCreate&&ps(t.beforeCreate,e,"bc");const{data:s,computed:o,methods:l,watch:u,provide:c,inject:h,created:f,beforeMount:g,mounted:S,beforeUpdate:y,updated:T,activated:x,deactivated:E,beforeDestroy:j,beforeUnmount:I,destroyed:R,unmounted:v,render:A,renderTracked:U,renderTriggered:_,errorCaptured:q,serverPrefetch:ne,expose:me,inheritAttrs:Oe,components:Ct,directives:ut,filters:Mt}=t;if(h&&Ul(h,i,null),l)for(const ce in l){const te=l[ce];Q(te)&&(i[ce]=te.bind(n))}if(s){const ce=s.call(n,n);ue(ce)&&(e.data=yn(ce))}if(Mi=!0,o)for(const ce in o){const te=o[ce],G=Q(te)?te.bind(n,n):Q(te.get)?te.get.bind(n,n):lt,a=!Q(te)&&Q(te.set)?te.set.bind(n):lt,p=qe({get:G,set:a});Object.defineProperty(i,ce,{enumerable:!0,configurable:!0,get:()=>p.value,set:Z=>p.value=Z})}if(u)for(const ce in u)_o(u[ce],i,n,ce);if(c){const ce=Q(c)?c.call(n):c;Reflect.ownKeys(ce).forEach(te=>{yl(te,ce[te])})}f&&ps(f,e,"c");function we(ce,te){Y(te)?te.forEach(G=>ce(G.bind(n))):te&&ce(te.bind(n))}if(we(Tl,g),we(Qn,S),we(Al,y),we(Bl,T),we(Ml,x),we(kl,E),we(Il,q),we(Ol,U),we(Fl,_),we(wn,I),we(No,v),we(El,ne),Y(me))if(me.length){const ce=e.exposed||(e.exposed={});me.forEach(te=>{Object.defineProperty(ce,te,{get:()=>n[te],set:G=>n[te]=G,enumerable:!0})})}else e.exposed||(e.exposed={});A&&e.render===lt&&(e.render=A),Oe!=null&&(e.inheritAttrs=Oe),Ct&&(e.components=Ct),ut&&(e.directives=ut),ne&&Lo(e)}function Ul(e,t,n=lt){Y(e)&&(e=ki(e));for(const i in e){const s=e[i];let o;ue(s)?"default"in s?o=On(s.from||i,s.default,!0):o=On(s.from||i):o=On(s),Be(o)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>o.value,set:l=>o.value=l}):t[i]=o}}function ps(e,t,n){Ze(Y(e)?e.map(i=>i.bind(t.proxy)):e.bind(t.proxy),t,n)}function _o(e,t,n,i){let s=i.includes(".")?zo(n,i):()=>n[i];if(ye(e)){const o=t[e];Q(o)&&Ut(s,o)}else if(Q(e))Ut(s,e.bind(n));else if(ue(e))if(Y(e))e.forEach(o=>_o(o,t,n,i));else{const o=Q(e.handler)?e.handler.bind(n):t[e.handler];Q(o)&&Ut(s,o,e)}}function Vo(e){const t=e.type,{mixins:n,extends:i}=t,{mixins:s,optionsCache:o,config:{optionMergeStrategies:l}}=e.appContext,u=o.get(t);let c;return u?c=u:!s.length&&!n&&!i?c=t:(c={},s.length&&s.forEach(h=>Vn(c,h,l,!0)),Vn(c,t,l)),ue(t)&&o.set(t,c),c}function Vn(e,t,n,i=!1){const{mixins:s,extends:o}=t;o&&Vn(e,o,n,!0),s&&s.forEach(l=>Vn(e,l,n,!0));for(const l in t)if(!(i&&l==="expose")){const u=Nl[l]||n&&n[l];e[l]=u?u(e[l],t[l]):t[l]}return e}const Nl={data:hs,props:ms,emits:ms,methods:ln,computed:ln,beforeCreate:ze,created:ze,beforeMount:ze,mounted:ze,beforeUpdate:ze,updated:ze,beforeDestroy:ze,beforeUnmount:ze,destroyed:ze,unmounted:ze,activated:ze,deactivated:ze,errorCaptured:ze,serverPrefetch:ze,components:ln,directives:ln,watch:Vl,provide:hs,inject:_l};function hs(e,t){return t?e?function(){return Fe(Q(e)?e.call(this,this):e,Q(t)?t.call(this,this):t)}:t:e}function _l(e,t){return ln(ki(e),ki(t))}function ki(e){if(Y(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function ze(e,t){return e?[...new Set([].concat(e,t))]:t}function ln(e,t){return e?Fe(Object.create(null),e,t):t}function ms(e,t){return e?Y(e)&&Y(t)?[...new Set([...e,...t])]:Fe(Object.create(null),fs(e),fs(t??{})):t}function Vl(e,t){if(!e)return t;if(!t)return e;const n=Fe(Object.create(null),e);for(const i in t)n[i]=ze(e[i],t[i]);return n}function Wo(){return{app:null,config:{isNativeTag:io,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Wl=0;function Gl(e,t){return function(i,s=null){Q(i)||(i=Fe({},i)),s!=null&&!ue(s)&&(s=null);const o=Wo(),l=new WeakSet,u=[];let c=!1;const h=o.app={_uid:Wl++,_component:i,_props:s,_container:null,_context:o,_instance:null,version:xa,get config(){return o.config},set config(f){},use(f,...g){return l.has(f)||(f&&Q(f.install)?(l.add(f),f.install(h,...g)):Q(f)&&(l.add(f),f(h,...g))),h},mixin(f){return o.mixins.includes(f)||o.mixins.push(f),h},component(f,g){return g?(o.components[f]=g,h):o.components[f]},directive(f,g){return g?(o.directives[f]=g,h):o.directives[f]},mount(f,g,S){if(!c){const y=h._ceVNode||$e(i,s);return y.appContext=o,S===!0?S="svg":S===!1&&(S=void 0),e(y,f,S),c=!0,h._container=f,f.__vue_app__=h,ni(y.component)}},onUnmount(f){u.push(f)},unmount(){c&&(Ze(u,h._instance,16),e(null,h._container),delete h._container.__vue_app__)},provide(f,g){return o.provides[f]=g,h},runWithContext(f){const g=Kt;Kt=h;try{return f()}finally{Kt=g}}};return h}}let Kt=null;const $l=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${Ye(t)}Modifiers`]||e[`${Et(t)}Modifiers`];function jl(e,t,...n){if(e.isUnmounted)return;const i=e.vnode.props||fe;let s=n;const o=t.startsWith("update:"),l=o&&$l(i,t.slice(7));l&&(l.trim&&(s=n.map(f=>ye(f)?f.trim():f)),l.number&&(s=n.map(qn)));let u,c=i[u=oi(t)]||i[u=oi(Ye(t))];!c&&o&&(c=i[u=oi(Et(t))]),c&&Ze(c,e,6,s);const h=i[u+"Once"];if(h){if(!e.emitted)e.emitted={};else if(e.emitted[u])return;e.emitted[u]=!0,Ze(h,e,6,s)}}const Hl=new WeakMap;function Go(e,t,n=!1){const i=n?Hl:t.emitsCache,s=i.get(e);if(s!==void 0)return s;const o=e.emits;let l={},u=!1;if(!Q(e)){const c=h=>{const f=Go(h,t,!0);f&&(u=!0,Fe(l,f))};!n&&t.mixins.length&&t.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}return!o&&!u?(ue(e)&&i.set(e,null),null):(Y(o)?o.forEach(c=>l[c]=null):Fe(l,o),ue(e)&&i.set(e,l),l)}function ei(e,t){return!e||!jn(t)?!1:(t=t.slice(2),t=t==="Once"?t:t.replace(/Once$/,""),re(e,t[0].toLowerCase()+t.slice(1))||re(e,Et(t))||re(e,t))}function gs(e){const{type:t,vnode:n,proxy:i,withProxy:s,propsOptions:[o],slots:l,attrs:u,emit:c,render:h,renderCache:f,props:g,data:S,setupState:y,ctx:T,inheritAttrs:x}=e,E=Nn(e);let j,I;try{if(n.shapeFlag&4){const v=s||i,A=v;j=ot(h.call(A,v,f,g,y,S,T)),I=u}else{const v=t;j=ot(v.length>1?v(g,{attrs:u,slots:l,emit:c}):v(g,null)),I=t.props?u:Kl(u)}}catch(v){Nt.length=0,Xn(v,e,1),j=$e(Bt)}let R=j;if(I&&x!==!1){const v=Object.keys(I),{shapeFlag:A}=R;v.length&&A&7&&(o&&v.some(Hn)&&(I=ql(I,o)),R=Yt(R,I,!1,!0))}return n.dirs&&(R=Yt(R,null,!1,!0),R.dirs=R.dirs?R.dirs.concat(n.dirs):n.dirs),n.transition&&Ki(R,n.transition),j=R,Nn(E),j}const Kl=e=>{let t;for(const n in e)(n==="class"||n==="style"||jn(n))&&((t||(t={}))[n]=e[n]);return t},ql=(e,t)=>{const n={};for(const i in e)(!Hn(i)||!(i.slice(9)in t))&&(n[i]=e[i]);return n};function Yl(e,t,n){const{props:i,children:s,component:o}=e,{props:l,children:u,patchFlag:c}=t,h=o.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return i?bs(i,l,h):!!l;if(c&8){const f=t.dynamicProps;for(let g=0;g<f.length;g++){const S=f[g];if($o(l,i,S)&&!ei(h,S))return!0}}}else return(s||u)&&(!u||!u.$stable)?!0:i===l?!1:i?l?bs(i,l,h):!0:!!l;return!1}function bs(e,t,n){const i=Object.keys(t);if(i.length!==Object.keys(e).length)return!0;for(let s=0;s<i.length;s++){const o=i[s];if($o(t,e,o)&&!ei(n,o))return!0}return!1}function $o(e,t,n){const i=e[n],s=t[n];return n==="style"&&ue(i)&&ue(s)?!Zt(i,s):i!==s}function Jl({vnode:e,parent:t,suspense:n},i){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===e&&(s.suspense.vnode.el=s.el=i,e=s),s===e)(e=t.vnode).el=i,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=i)}const jo={},Ho=()=>Object.create(jo),Ko=e=>Object.getPrototypeOf(e)===jo;function Xl(e,t,n,i=!1){const s={},o=Ho();e.propsDefaults=Object.create(null),qo(e,t,s,o);for(const l in e.propsOptions[0])l in s||(s[l]=void 0);n?e.props=i?s:ll(s):e.type.props?e.props=s:e.props=o,e.attrs=o}function Zl(e,t,n,i){const{props:s,attrs:o,vnode:{patchFlag:l}}=e,u=oe(s),[c]=e.propsOptions;let h=!1;if((i||l>0)&&!(l&16)){if(l&8){const f=e.vnode.dynamicProps;for(let g=0;g<f.length;g++){let S=f[g];if(ei(e.emitsOptions,S))continue;const y=t[S];if(c)if(re(o,S))y!==o[S]&&(o[S]=y,h=!0);else{const T=Ye(S);s[T]=Ri(c,u,T,y,e,!1)}else y!==o[S]&&(o[S]=y,h=!0)}}}else{qo(e,t,s,o)&&(h=!0);let f;for(const g in u)(!t||!re(t,g)&&((f=Et(g))===g||!re(t,f)))&&(c?n&&(n[g]!==void 0||n[f]!==void 0)&&(s[g]=Ri(c,u,g,void 0,e,!0)):delete s[g]);if(o!==u)for(const g in o)(!t||!re(t,g))&&(delete o[g],h=!0)}h&&mt(e.attrs,"set","")}function qo(e,t,n,i){const[s,o]=e.propsOptions;let l=!1,u;if(t)for(let c in t){if(dn(c))continue;const h=t[c];let f;s&&re(s,f=Ye(c))?!o||!o.includes(f)?n[f]=h:(u||(u={}))[f]=h:ei(e.emitsOptions,c)||(!(c in i)||h!==i[c])&&(i[c]=h,l=!0)}if(o){const c=oe(n),h=u||fe;for(let f=0;f<o.length;f++){const g=o[f];n[g]=Ri(s,c,g,h[g],e,!re(h,g))}}return l}function Ri(e,t,n,i,s,o){const l=e[n];if(l!=null){const u=re(l,"default");if(u&&i===void 0){const c=l.default;if(l.type!==Function&&!l.skipFactory&&Q(c)){const{propsDefaults:h}=s;if(n in h)i=h[n];else{const f=Rn(s);i=h[n]=c.call(null,t),f()}}else i=c;s.ce&&s.ce._setProp(n,i)}l[0]&&(o&&!u?i=!1:l[1]&&(i===""||i===Et(n))&&(i=!0))}return i}const Ql=new WeakMap;function Yo(e,t,n=!1){const i=n?Ql:t.propsCache,s=i.get(e);if(s)return s;const o=e.props,l={},u=[];let c=!1;if(!Q(e)){const f=g=>{c=!0;const[S,y]=Yo(g,t,!0);Fe(l,S),y&&u.push(...y)};!n&&t.mixins.length&&t.mixins.forEach(f),e.extends&&f(e.extends),e.mixins&&e.mixins.forEach(f)}if(!o&&!c)return ue(e)&&i.set(e,$t),$t;if(Y(o))for(let f=0;f<o.length;f++){const g=Ye(o[f]);vs(g)&&(l[g]=fe)}else if(o)for(const f in o){const g=Ye(f);if(vs(g)){const S=o[f],y=l[g]=Y(S)||Q(S)?{type:S}:Fe({},S),T=y.type;let x=!1,E=!0;if(Y(T))for(let j=0;j<T.length;++j){const I=T[j],R=Q(I)&&I.name;if(R==="Boolean"){x=!0;break}else R==="String"&&(E=!1)}else x=Q(T)&&T.name==="Boolean";y[0]=x,y[1]=E,(x||re(y,"default"))&&u.push(g)}}const h=[l,u];return ue(e)&&i.set(e,h),h}function vs(e){return e[0]!=="$"&&!dn(e)}const qi=e=>e==="_"||e==="_ctx"||e==="$stable",Yi=e=>Y(e)?e.map(ot):[ot(e)],ea=(e,t,n)=>{if(t._n)return t;const i=vl((...s)=>Yi(t(...s)),n);return i._c=!1,i},Jo=(e,t,n)=>{const i=e._ctx;for(const s in e){if(qi(s))continue;const o=e[s];if(Q(o))t[s]=ea(s,o,i);else if(o!=null){const l=Yi(o);t[s]=()=>l}}},Xo=(e,t)=>{const n=Yi(t);e.slots.default=()=>n},Zo=(e,t,n)=>{for(const i in t)(n||!qi(i))&&(e[i]=t[i])},ta=(e,t,n)=>{const i=e.slots=Ho();if(e.vnode.shapeFlag&32){const s=t._;s?(Zo(i,t,n),n&&ao(i,"_",s,!0)):Jo(t,i)}else t&&Xo(e,t)},na=(e,t,n)=>{const{vnode:i,slots:s}=e;let o=!0,l=fe;if(i.shapeFlag&32){const u=t._;u?n&&u===1?o=!1:Zo(s,t,n):(o=!t.$stable,Jo(t,s)),l=t}else t&&(Xo(e,t),l={default:1});if(o)for(const u in s)!qi(u)&&l[u]==null&&delete s[u]},_e=la;function ia(e){return sa(e)}function sa(e,t){const n=Yn();n.__VUE__=!0;const{insert:i,remove:s,patchProp:o,createElement:l,createText:u,createComment:c,setText:h,setElementText:f,parentNode:g,nextSibling:S,setScopeId:y=lt,insertStaticContent:T}=e,x=(d,m,b,C=null,w=null,P=null,z=void 0,F=null,B=!!m.dynamicChildren)=>{if(d===m)return;d&&!sn(d,m)&&(C=kt(d),Z(d,w,P,!0),d=null),m.patchFlag===-2&&(B=!1,m.dynamicChildren=null);const{type:M,ref:K,shapeFlag:N}=m;switch(M){case ti:E(d,m,b,C);break;case Bt:j(d,m,b,C);break;case In:d==null&&I(m,b,C,z);break;case X:Ct(d,m,b,C,w,P,z,F,B);break;default:N&1?A(d,m,b,C,w,P,z,F,B):N&6?ut(d,m,b,C,w,P,z,F,B):(N&64||N&128)&&M.process(d,m,b,C,w,P,z,F,B,V)}K!=null&&w?hn(K,d&&d.ref,P,m||d,!m):K==null&&d&&d.ref!=null&&hn(d.ref,null,P,d,!0)},E=(d,m,b,C)=>{if(d==null)i(m.el=u(m.children),b,C);else{const w=m.el=d.el;m.children!==d.children&&h(w,m.children)}},j=(d,m,b,C)=>{d==null?i(m.el=c(m.children||""),b,C):m.el=d.el},I=(d,m,b,C)=>{[d.el,d.anchor]=T(d.children,m,b,C,d.el,d.anchor)},R=({el:d,anchor:m},b,C)=>{let w;for(;d&&d!==m;)w=S(d),i(d,b,C),d=w;i(m,b,C)},v=({el:d,anchor:m})=>{let b;for(;d&&d!==m;)b=S(d),s(d),d=b;s(m)},A=(d,m,b,C,w,P,z,F,B)=>{if(m.type==="svg"?z="svg":m.type==="math"&&(z="mathml"),d==null)U(m,b,C,w,P,z,F,B);else{const M=d.el&&d.el._isVueCE?d.el:null;try{M&&M._beginPatch(),ne(d,m,w,P,z,F,B)}finally{M&&M._endPatch()}}},U=(d,m,b,C,w,P,z,F)=>{let B,M;const{props:K,shapeFlag:N,transition:H,dirs:J}=d;if(B=d.el=l(d.type,P,K&&K.is,K),N&8?f(B,d.children):N&16&&q(d.children,B,null,C,w,fi(d,P),z,F),J&&Ft(d,null,C,"created"),_(B,d,d.scopeId,z,C),K){for(const de in K)de!=="value"&&!dn(de)&&o(B,de,null,K[de],P,C);"value"in K&&o(B,"value",null,K.value,P),(M=K.onVnodeBeforeMount)&&nt(M,C,d)}J&&Ft(d,null,C,"beforeMount");const se=oa(w,H);se&&H.beforeEnter(B),i(B,m,b),((M=K&&K.onVnodeMounted)||se||J)&&_e(()=>{try{M&&nt(M,C,d),se&&H.enter(B),J&&Ft(d,null,C,"mounted")}finally{}},w)},_=(d,m,b,C,w)=>{if(b&&y(d,b),C)for(let P=0;P<C.length;P++)y(d,C[P]);if(w){let P=w.subTree;if(m===P||nr(P.type)&&(P.ssContent===m||P.ssFallback===m)){const z=w.vnode;_(d,z,z.scopeId,z.slotScopeIds,w.parent)}}},q=(d,m,b,C,w,P,z,F,B=0)=>{for(let M=B;M<d.length;M++){const K=d[M]=F?pt(d[M]):ot(d[M]);x(null,K,m,b,C,w,P,z,F)}},ne=(d,m,b,C,w,P,z)=>{const F=m.el=d.el;let{patchFlag:B,dynamicChildren:M,dirs:K}=m;B|=d.patchFlag&16;const N=d.props||fe,H=m.props||fe;let J;if(b&&Ot(b,!1),(J=H.onVnodeBeforeUpdate)&&nt(J,b,m,d),K&&Ft(m,d,b,"beforeUpdate"),b&&Ot(b,!0),M&&(!d.dynamicChildren||d.dynamicChildren.length!==M.length)&&(B=0,z=!1,M=null),(N.innerHTML&&H.innerHTML==null||N.textContent&&H.textContent==null)&&f(F,""),M?me(d.dynamicChildren,M,F,b,C,fi(m,w),P):z||te(d,m,F,null,b,C,fi(m,w),P,!1),B>0){if(B&16)Oe(F,N,H,b,w);else if(B&2&&N.class!==H.class&&o(F,"class",null,H.class,w),B&4&&o(F,"style",N.style,H.style,w),B&8){const se=m.dynamicProps;for(let de=0;de<se.length;de++){const ae=se[de],Se=N[ae],Re=H[ae];(Re!==Se||ae==="value")&&o(F,ae,Se,Re,w,b)}}B&1&&d.children!==m.children&&f(F,m.children)}else!z&&M==null&&Oe(F,N,H,b,w);((J=H.onVnodeUpdated)||K)&&_e(()=>{J&&nt(J,b,m,d),K&&Ft(m,d,b,"updated")},C)},me=(d,m,b,C,w,P,z)=>{for(let F=0;F<m.length;F++){const B=d[F],M=m[F],K=B.el&&(B.type===X||!sn(B,M)||B.shapeFlag&198)?g(B.el):b;x(B,M,K,null,C,w,P,z,!0)}},Oe=(d,m,b,C,w)=>{if(m!==b){if(m!==fe)for(const P in m)!dn(P)&&!(P in b)&&o(d,P,m[P],null,w,C);for(const P in b){if(dn(P))continue;const z=b[P],F=m[P];z!==F&&P!=="value"&&o(d,P,F,z,w,C)}"value"in b&&o(d,"value",m.value,b.value,w)}},Ct=(d,m,b,C,w,P,z,F,B)=>{const M=m.el=d?d.el:u(""),K=m.anchor=d?d.anchor:u("");let{patchFlag:N,dynamicChildren:H,slotScopeIds:J}=m;J&&(F=F?F.concat(J):J),d==null?(i(M,b,C),i(K,b,C),q(m.children||[],b,K,w,P,z,F,B)):N>0&&N&64&&H&&d.dynamicChildren&&d.dynamicChildren.length===H.length?(me(d.dynamicChildren,H,b,w,P,z,F),(m.key!=null||w&&m===w.subTree)&&Qo(d,m,!0)):te(d,m,b,K,w,P,z,F,B)},ut=(d,m,b,C,w,P,z,F,B)=>{m.slotScopeIds=F,d==null?m.shapeFlag&512?w.ctx.activate(m,b,C,z,B):Mt(m,b,C,w,P,z,B):Ke(d,m,B)},Mt=(d,m,b,C,w,P,z)=>{const F=d.component=pa(d,C,w);if(Do(d)&&(F.ctx.renderer=V),ma(F,!1,z),F.asyncDep){if(w&&w.registerDep(F,we,z),!d.el){const B=F.subTree=$e(Bt);j(null,B,m,b),d.placeholder=B.el}}else we(F,d,m,b,w,P,z)},Ke=(d,m,b)=>{const C=m.component=d.component;if(Yl(d,m,b))if(C.asyncDep&&!C.asyncResolved){ce(C,m,b);return}else C.next=m,C.update();else m.el=d.el,C.vnode=m},we=(d,m,b,C,w,P,z)=>{const F=()=>{if(d.isMounted){let{next:N,bu:H,u:J,parent:se,vnode:de}=d;{const et=er(d);if(et){N&&(N.el=de.el,ce(d,N,z)),et.asyncDep.then(()=>{_e(()=>{d.isUnmounted||M()},w)});return}}let ae=N,Se;Ot(d,!1),N?(N.el=de.el,ce(d,N,z)):N=de,H&&Fn(H),(Se=N.props&&N.props.onVnodeBeforeUpdate)&&nt(Se,se,N,de),Ot(d,!0);const Re=gs(d),Qe=d.subTree;d.subTree=Re,x(Qe,Re,g(Qe.el),kt(Qe),d,w,P),N.el=Re.el,ae===null&&Jl(d,Re.el),J&&_e(J,w),(Se=N.props&&N.props.onVnodeUpdated)&&_e(()=>nt(Se,se,N,de),w)}else{let N;const{el:H,props:J}=m,{bm:se,m:de,parent:ae,root:Se,type:Re}=d,Qe=mn(m);Ot(d,!1),se&&Fn(se),!Qe&&(N=J&&J.onVnodeBeforeMount)&&nt(N,ae,m),Ot(d,!0);{Se.ce&&Se.ce._hasShadowRoot()&&Se.ce._injectChildStyle(Re,d.parent?d.parent.type:void 0);const et=d.subTree=gs(d);x(null,et,b,C,d,w,P),m.el=et.el}if(de&&_e(de,w),!Qe&&(N=J&&J.onVnodeMounted)){const et=m;_e(()=>nt(N,ae,et),w)}(m.shapeFlag&256||ae&&mn(ae.vnode)&&ae.vnode.shapeFlag&256)&&d.a&&_e(d.a,w),d.isMounted=!0,m=b=C=null}};d.scope.on();const B=d.effect=new po(F);d.scope.off();const M=d.update=B.run.bind(B),K=d.job=B.runIfDirty.bind(B);K.i=d,K.id=d.uid,B.scheduler=()=>Hi(K),Ot(d,!0),M()},ce=(d,m,b)=>{m.component=d;const C=d.vnode.props;d.vnode=m,d.next=null,Zl(d,m.props,C,b),na(d,m.children,b),xt(),us(d),wt()},te=(d,m,b,C,w,P,z,F,B=!1)=>{const M=d&&d.children,K=d?d.shapeFlag:0,N=m.children,{patchFlag:H,shapeFlag:J}=m;if(H>0){if(H&128){a(M,N,b,C,w,P,z,F,B);return}else if(H&256){G(M,N,b,C,w,P,z,F,B);return}}J&8?(K&16&&ke(M,w,P),N!==M&&f(b,N)):K&16?J&16?a(M,N,b,C,w,P,z,F,B):ke(M,w,P,!0):(K&8&&f(b,""),J&16&&q(N,b,C,w,P,z,F,B))},G=(d,m,b,C,w,P,z,F,B)=>{d=d||$t,m=m||$t;const M=d.length,K=m.length,N=Math.min(M,K);let H;for(H=0;H<N;H++){const J=m[H]=B?pt(m[H]):ot(m[H]);x(d[H],J,b,null,w,P,z,F,B)}M>K?ke(d,w,P,!0,!1,N):q(m,b,C,w,P,z,F,B,N)},a=(d,m,b,C,w,P,z,F,B)=>{let M=0;const K=m.length;let N=d.length-1,H=K-1;for(;M<=N&&M<=H;){const J=d[M],se=m[M]=B?pt(m[M]):ot(m[M]);if(sn(J,se))x(J,se,b,null,w,P,z,F,B);else break;M++}for(;M<=N&&M<=H;){const J=d[N],se=m[H]=B?pt(m[H]):ot(m[H]);if(sn(J,se))x(J,se,b,null,w,P,z,F,B);else break;N--,H--}if(M>N){if(M<=H){const J=H+1,se=J<K?m[J].el:C;for(;M<=H;)x(null,m[M]=B?pt(m[M]):ot(m[M]),b,se,w,P,z,F,B),M++}}else if(M>H)for(;M<=N;)Z(d[M],w,P,!0),M++;else{const J=M,se=M,de=new Map;for(M=se;M<=H;M++){const We=m[M]=B?pt(m[M]):ot(m[M]);We.key!=null&&de.set(We.key,M)}let ae,Se=0;const Re=H-se+1;let Qe=!1,et=0;const en=new Array(Re);for(M=0;M<Re;M++)en[M]=0;for(M=J;M<=N;M++){const We=d[M];if(Se>=Re){Z(We,w,P,!0);continue}let tt;if(We.key!=null)tt=de.get(We.key);else for(ae=se;ae<=H;ae++)if(en[ae-se]===0&&sn(We,m[ae])){tt=ae;break}tt===void 0?Z(We,w,P,!0):(en[tt-se]=M+1,tt>=et?et=tt:Qe=!0,x(We,m[tt],b,null,w,P,z,F,B),Se++)}const es=Qe?ra(en):$t;for(ae=es.length-1,M=Re-1;M>=0;M--){const We=se+M,tt=m[We],ts=m[We+1],ns=We+1<K?ts.el||tr(ts):C;en[M]===0?x(null,tt,b,ns,w,P,z,F,B):Qe&&(ae<0||M!==es[ae]?p(tt,b,ns,2):ae--)}}},p=(d,m,b,C,w=null)=>{const{el:P,type:z,transition:F,children:B,shapeFlag:M}=d;if(M&6){p(d.component.subTree,m,b,C);return}if(M&128){d.suspense.move(m,b,C);return}if(M&64){z.move(d,m,b,V);return}if(z===X){i(P,m,b);for(let N=0;N<B.length;N++)p(B[N],m,b,C);i(d.anchor,m,b);return}if(z===In){R(d,m,b);return}if(C!==2&&M&1&&F)if(C===0)F.persisted&&!P[ci]?i(P,m,b):(F.beforeEnter(P),i(P,m,b),_e(()=>F.enter(P),w));else{const{leave:N,delayLeave:H,afterLeave:J}=F,se=()=>{d.ctx.isUnmounted?s(P):i(P,m,b)},de=()=>{const ae=P._isLeaving||!!P[ci];P._isLeaving&&P[ci](!0),F.persisted&&!ae?se():N(P,()=>{se(),J&&J()})};H?H(P,se,de):de()}else i(P,m,b)},Z=(d,m,b,C=!1,w=!1)=>{const{type:P,props:z,ref:F,children:B,dynamicChildren:M,shapeFlag:K,patchFlag:N,dirs:H,cacheIndex:J,memo:se}=d;if(N===-2&&(w=!1),F!=null&&(xt(),hn(F,null,b,d,!0),wt()),J!=null&&(m.renderCache[J]=void 0),K&256){m.ctx.deactivate(d);return}const de=K&1&&H,ae=!mn(d);let Se;if(ae&&(Se=z&&z.onVnodeBeforeUnmount)&&nt(Se,m,d),K&6)Ce(d.component,b,C);else{if(K&128){d.suspense.unmount(b,C);return}de&&Ft(d,null,m,"beforeUnmount"),K&64?d.type.remove(d,m,b,V,C):M&&!M.hasOnce&&(P!==X||N>0&&N&64)?ke(M,m,b,!1,!0):(P===X&&N&384||!w&&K&16)&&ke(B,m,b),C&&Ie(d)}const Re=se!=null&&J==null;(ae&&(Se=z&&z.onVnodeUnmounted)||de||Re)&&_e(()=>{Se&&nt(Se,m,d),de&&Ft(d,null,m,"unmounted"),Re&&(d.el=null)},b)},Ie=d=>{const{type:m,el:b,anchor:C,transition:w}=d;if(m===X){Ve(b,C);return}if(m===In){v(d);return}const P=()=>{s(b),w&&!w.persisted&&w.afterLeave&&w.afterLeave()};if(d.shapeFlag&1&&w&&!w.persisted){const{leave:z,delayLeave:F}=w,B=()=>z(b,P);F?F(d.el,P,B):B()}else P()},Ve=(d,m)=>{let b;for(;d!==m;)b=S(d),s(d),d=b;s(m)},Ce=(d,m,b)=>{const{bum:C,scope:w,job:P,subTree:z,um:F,m:B,a:M}=d;ys(B),ys(M),C&&Fn(C),w.stop(),P&&(P.flags|=8,Z(z,d,m,b)),F&&_e(F,m),_e(()=>{d.isUnmounted=!0},m)},ke=(d,m,b,C=!1,w=!1,P=0)=>{for(let z=P;z<d.length;z++)Z(d[z],m,b,C,w)},kt=d=>{if(d.shapeFlag&6)return kt(d.component.subTree);if(d.shapeFlag&128)return d.suspense.next();const m=S(d.anchor||d.el),b=m&&m[Pl];return b?S(b):m};let Vt=!1;const L=(d,m,b)=>{let C;d==null?m._vnode&&(Z(m._vnode,null,null,!0),C=m._vnode.component):x(m._vnode||null,d,m,null,null,null,b),m._vnode=d,Vt||(Vt=!0,us(C),Eo(),Vt=!1)},V={p:x,um:Z,m:p,r:Ie,mt:Mt,mc:q,pc:te,pbc:me,n:kt,o:e};return{render:L,hydrate:void 0,createApp:Gl(L)}}function fi({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function Ot({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function oa(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Qo(e,t,n=!1){const i=e.children,s=t.children;if(Y(i)&&Y(s))for(let o=0;o<i.length;o++){const l=i[o];let u=s[o];u.shapeFlag&1&&!u.dynamicChildren&&((u.patchFlag<=0||u.patchFlag===32)&&(u=s[o]=pt(s[o]),u.el=l.el),!n&&u.patchFlag!==-2&&Qo(l,u)),u.type===ti&&(u.patchFlag===-1&&(u=s[o]=pt(u)),u.el=l.el),u.type===Bt&&!u.el&&(u.el=l.el)}}function ra(e){const t=e.slice(),n=[0];let i,s,o,l,u;const c=e.length;for(i=0;i<c;i++){const h=e[i];if(h!==0){if(s=n[n.length-1],e[s]<h){t[i]=s,n.push(i);continue}for(o=0,l=n.length-1;o<l;)u=o+l>>1,e[n[u]]<h?o=u+1:l=u;h<e[n[o]]&&(o>0&&(t[i]=n[o-1]),n[o]=i)}}for(o=n.length,l=n[o-1];o-- >0;)n[o]=l,l=t[l];return n}function er(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:er(t)}function ys(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function tr(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?tr(t.subTree):null}const nr=e=>e.__isSuspense;function la(e,t){t&&t.pendingBranch?Y(e)?t.effects.push(...e):t.effects.push(e):bl(e)}const X=Symbol.for("v-fgt"),ti=Symbol.for("v-txt"),Bt=Symbol.for("v-cmt"),In=Symbol.for("v-stc"),Nt=[];let Ge=null;function O(e=!1){Nt.push(Ge=e?null:[])}function ir(){Nt.pop(),Ge=Nt[Nt.length-1]||null}let Sn=1;function xs(e,t=!1){Sn+=e,e<0&&Ge&&t&&(Ge.hasOnce=!0)}function sr(e){return e.dynamicChildren=Sn>0?Ge||$t:null,ir(),Sn>0&&Ge&&Ge.push(e),e}function D(e,t,n,i,s,o){return sr(r(e,t,n,i,s,o,!0))}function Ti(e,t,n,i,s){return sr($e(e,t,n,i,s,!0))}function or(e){return e?e.__v_isVNode===!0:!1}function sn(e,t){return e.type===t.type&&e.key===t.key}const rr=({key:e})=>e??null,zn=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?ye(e)||Be(e)||Q(e)?{i:je,r:e,k:t,f:!!n}:e:null);function r(e,t=null,n=null,i=0,s=null,o=e===X?0:1,l=!1,u=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&rr(t),ref:t&&zn(t),scopeId:Oo,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:je};return u?(Wn(c,n),o&128&&e.normalize(c)):n&&(c.shapeFlag|=ye(n)?8:16),Sn>0&&!l&&Ge&&(c.patchFlag>0||o&6)&&c.patchFlag!==32&&Ge.push(c),c}const $e=aa;function aa(e,t=null,n=null,i=0,s=null,o=!1){if((!e||e===zl)&&(e=Bt),or(e)){const u=Yt(e,t,!0);return n&&Wn(u,n),Sn>0&&!o&&Ge&&(u.shapeFlag&6?Ge[Ge.indexOf(e)]=u:Ge.push(u)),u.patchFlag=-2,u}if(ya(e)&&(e=e.__vccOpts),t){t=ua(t);let{class:u,style:c}=t;u&&!ye(u)&&(t.class=Me(u)),ue(c)&&($i(c)&&!Y(c)&&(c=Fe({},c)),t.style=ht(c))}const l=ye(e)?1:nr(e)?128:Cl(e)?64:ue(e)?4:Q(e)?2:0;return r(e,t,n,i,s,l,o,!0)}function ua(e){return e?$i(e)||Ko(e)?Fe({},e):e:null}function Yt(e,t,n=!1,i=!1){const{props:s,ref:o,patchFlag:l,children:u,transition:c}=e,h=t?ca(s||{},t):s,f={__v_isVNode:!0,__v_skip:!0,type:e.type,props:h,key:h&&rr(h),ref:t&&t.ref?n&&o?Y(o)?o.concat(zn(t)):[o,zn(t)]:zn(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:u,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==X?l===-1?16:l|16:l,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Yt(e.ssContent),ssFallback:e.ssFallback&&Yt(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&i&&Ki(f,c.clone(f)),f}function W(e=" ",t=0){return $e(ti,null,e,t)}function lr(e,t){const n=$e(In,null,e);return n.staticCount=t,n}function ve(e="",t=!1){return t?(O(),Ti(Bt,null,e)):$e(Bt,null,e)}function ot(e){return e==null||typeof e=="boolean"?$e(Bt):Y(e)?$e(X,null,e.slice()):or(e)?pt(e):$e(ti,null,String(e))}function pt(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Yt(e)}function Wn(e,t){let n=0;const{shapeFlag:i}=e;if(t==null)t=null;else if(Y(t))n=16;else if(typeof t=="object")if(i&65){const s=t.default;s&&(s._c&&(s._d=!1),Wn(e,s()),s._c&&(s._d=!0));return}else{n=32;const s=t._;!s&&!Ko(t)?t._ctx=je:s===3&&je&&(je.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else if(Q(t)){if(i&65){Wn(e,{default:t});return}t={default:t,_ctx:je},n=32}else t=String(t),i&64?(n=16,t=[W(t)]):n=8;e.children=t,e.shapeFlag|=n}function ca(...e){const t={};for(let n=0;n<e.length;n++){const i=e[n];for(const s in i)if(s==="class")t.class!==i.class&&(t.class=Me([t.class,i.class]));else if(s==="style")t.style=ht([t.style,i.style]);else if(jn(s)){const o=t[s],l=i[s];l&&o!==l&&!(Y(o)&&o.includes(l))?t[s]=o?[].concat(o,l):l:l==null&&o==null&&!Hn(s)&&(t[s]=l)}else s!==""&&(t[s]=i[s])}return t}function nt(e,t,n,i=null){Ze(e,t,7,[n,i])}const da=Wo();let fa=0;function pa(e,t,n){const i=e.type,s=(t?t.appContext:e.appContext)||da,o={uid:fa++,vnode:e,type:i,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Wr(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Yo(i,s),emitsOptions:Go(i,s),emit:null,emitted:null,propsDefaults:fe,inheritAttrs:i.inheritAttrs,ctx:fe,data:fe,props:fe,attrs:fe,slots:fe,refs:fe,setupState:fe,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=t?t.root:o,o.emit=jl.bind(null,o),e.ce&&e.ce(o),o}let De=null;const ha=()=>De||je;let Gn,Ai;{const e=Yn(),t=(n,i)=>{let s;return(s=e[n])||(s=e[n]=[]),s.push(i),o=>{s.length>1?s.forEach(l=>l(o)):s[0](o)}};Gn=t("__VUE_INSTANCE_SETTERS__",n=>De=n),Ai=t("__VUE_SSR_SETTERS__",n=>Pn=n)}const Rn=e=>{const t=De;return Gn(e),e.scope.on(),()=>{e.scope.off(),Gn(t)}},ws=()=>{De&&De.scope.off(),Gn(null)};function ar(e){return e.vnode.shapeFlag&4}let Pn=!1;function ma(e,t=!1,n=!1){t&&Ai(t);const{props:i,children:s}=e.vnode,o=ar(e);Xl(e,i,o,t),ta(e,s,n||t);const l=o?ga(e,t):void 0;return t&&Ai(!1),l}function ga(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Ll);const{setup:i}=n;if(i){xt();const s=e.setupContext=i.length>1?va(e):null,o=Rn(e),l=kn(i,e,0,[e.props,s]),u=so(l);if(wt(),o(),(u||e.sp)&&!mn(e)&&Lo(e),u){if(l.then(ws,ws),t)return l.then(c=>{Ss(e,c)}).catch(c=>{Xn(c,e,0)});e.asyncDep=l}else Ss(e,l)}else ur(e)}function Ss(e,t,n){Q(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:ue(t)&&(e.setupState=To(t)),ur(e)}function ur(e,t,n){const i=e.type;e.render||(e.render=i.render||lt);{const s=Rn(e);xt();try{Dl(e)}finally{wt(),s()}}}const ba={get(e,t){return Ee(e,"get",""),e[t]}};function va(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,ba),slots:e.slots,emit:e.emit,expose:t}}function ni(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(To(al(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in gn)return gn[n](e)},has(t,n){return n in t||n in gn}})):e.proxy}function ya(e){return Q(e)&&"__vccOpts"in e}const qe=(e,t)=>fl(e,t,Pn),xa="3.5.40";/**
* @vue/runtime-dom v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Bi;const Ps=typeof window<"u"&&window.trustedTypes;if(Ps)try{Bi=Ps.createPolicy("vue",{createHTML:e=>e})}catch{}const cr=Bi?e=>Bi.createHTML(e):e=>e,wa="http://www.w3.org/2000/svg",Sa="http://www.w3.org/1998/Math/MathML",ft=typeof document<"u"?document:null,Cs=ft&&ft.createElement("template"),Pa={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,i)=>{const s=t==="svg"?ft.createElementNS(wa,e):t==="mathml"?ft.createElementNS(Sa,e):n?ft.createElement(e,{is:n}):ft.createElement(e);return e==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:e=>ft.createTextNode(e),createComment:e=>ft.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>ft.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,i,s,o){const l=n?n.previousSibling:t.lastChild;if(s&&(s===o||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),n),!(s===o||!(s=s.nextSibling)););else{Cs.innerHTML=cr(i==="svg"?`<svg>${e}</svg>`:i==="mathml"?`<math>${e}</math>`:e);const u=Cs.content;if(i==="svg"||i==="mathml"){const c=u.firstChild;for(;c.firstChild;)u.appendChild(c.firstChild);u.removeChild(c)}t.insertBefore(u,n)}return[l?l.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Ca=Symbol("_vtc");function Ma(e,t,n){const i=e[Ca];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const $n=Symbol("_vod"),dr=Symbol("_vsh"),ka={name:"show",beforeMount(e,{value:t},{transition:n}){e[$n]=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):on(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:i}){!t!=!n&&(i?t?(i.beforeEnter(e),on(e,!0),i.enter(e)):i.leave(e,()=>{on(e,!1)}):on(e,t))},beforeUnmount(e,{value:t}){on(e,t)}};function on(e,t){e.style.display=t?e[$n]:"none",e[dr]=!t}const Ra=Symbol(""),Ta=/(?:^|;)\s*display\s*:/;function Aa(e,t,n){const i=e.style,s=ye(n);let o=!1;if(n&&!s){if(t)if(ye(t))for(const l of t.split(";")){const u=l.slice(0,l.indexOf(":")).trim();n[u]==null&&an(i,u,"")}else for(const l in t)n[l]==null&&an(i,l,"");for(const l in n){l==="display"&&(o=!0);const u=n[l];u!=null?Ea(e,l,!ye(t)&&t?t[l]:void 0,u)||an(i,l,u):an(i,l,"")}}else if(s){if(t!==n){const l=i[Ra];l&&(n+=";"+l),i.cssText=n,o=Ta.test(n)}}else t&&e.removeAttribute("style");$n in e&&(e[$n]=o?i.display:"",e[dr]&&(i.display="none"))}const Ms=/\s*!important$/;function an(e,t,n){if(Y(n))n.forEach(i=>an(e,t,i));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const i=Ba(e,t);Ms.test(n)?e.setProperty(Et(i),n.replace(Ms,""),"important"):e[i]=n}}const ks=["Webkit","Moz","ms"],pi={};function Ba(e,t){const n=pi[t];if(n)return n;let i=Ye(t);if(i!=="filter"&&i in e)return pi[t]=i;i=lo(i);for(let s=0;s<ks.length;s++){const o=ks[s]+i;if(o in e)return pi[t]=o}return t}function Ea(e,t,n,i){return e.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&ye(i)&&n===i}const Rs="http://www.w3.org/1999/xlink";function Ts(e,t,n,i,s,o=_r(t)){i&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(Rs,t.slice(6,t.length)):e.setAttributeNS(Rs,t,n):n==null||o&&!uo(n)?e.removeAttribute(t):e.setAttribute(t,o?"":at(n)?String(n):n)}function As(e,t,n,i,s){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?cr(n):n);return}const o=e.tagName;if(t==="value"&&o!=="PROGRESS"&&!o.includes("-")){const u=o==="OPTION"?e.getAttribute("value")||"":e.value,c=n==null?e.type==="checkbox"?"on":"":String(n);(u!==c||!("_value"in e))&&(e.value=c),n==null&&e.removeAttribute(t),e._value=n;return}let l=!1;if(n===""||n==null){const u=typeof e[t];u==="boolean"?n=uo(n):n==null&&u==="string"?(n="",l=!0):u==="number"&&(n=0,l=!0)}try{e[t]=n}catch{}l&&e.removeAttribute(s||t)}function At(e,t,n,i){e.addEventListener(t,n,i)}function Fa(e,t,n,i){e.removeEventListener(t,n,i)}const Bs=Symbol("_vei");function Oa(e,t,n,i,s=null){const o=e[Bs]||(e[Bs]={}),l=o[t];if(i&&l)l.value=i;else{const[u,c]=La(t);if(i){const h=o[t]=Na(i,s);At(e,u,h,c)}else l&&(Fa(e,u,l,c),o[t]=void 0)}}const Ia=/(Once|Passive|Capture)$/,za=/^on:?(?:Once|Passive|Capture)$/;function La(e){let t,n;for(;(n=e.match(Ia))&&!za.test(e);)t||(t={}),e=e.slice(0,e.length-n[1].length),t[n[1].toLowerCase()]=!0;return[e[2]===":"?e.slice(3):Et(e.slice(2)),t]}let hi=0;const Da=Promise.resolve(),Ua=()=>hi||(Da.then(()=>hi=0),hi=Date.now());function Na(e,t){const n=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=n.attached)return;const s=n.value;if(Y(s)){const o=i.stopImmediatePropagation;i.stopImmediatePropagation=()=>{o.call(i),i._stopped=!0};const l=s.slice(),u=[i];for(let c=0;c<l.length&&!i._stopped;c++){const h=l[c];h&&Ze(h,t,5,u)}}else Ze(s,t,5,[i])};return n.value=e,n.attached=Ua(),n}const Es=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,_a=(e,t,n,i,s,o)=>{const l=s==="svg";t==="class"?Ma(e,i,l):t==="style"?Aa(e,n,i):jn(t)?Hn(t)||Oa(e,t,n,i,o):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Va(e,t,i,l))?(As(e,t,i),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Ts(e,t,i,l,o,t!=="value")):e._isVueCE&&(Wa(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!ye(i)))?As(e,Ye(t),i,o,t):(t==="true-value"?e._trueValue=i:t==="false-value"&&(e._falseValue=i),Ts(e,t,i,l))};function Va(e,t,n,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in e&&Es(t)&&Q(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=e.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Es(t)&&ye(n)?!1:t in e}function Wa(e,t){const n=e._def.props;if(!n)return!1;const i=Ye(t);return Array.isArray(n)?n.some(s=>Ye(s)===i):Object.keys(n).some(s=>Ye(s)===i)}const Jt=e=>{const t=e.props["onUpdate:modelValue"]||!1;return Y(t)?n=>Fn(t,n):t};function Ga(e){e.target.composing=!0}function Fs(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const yt=Symbol("_assign");function Os(e,t,n){return t&&(e=e.trim()),n&&(e=qn(e)),e}const ee={created(e,{modifiers:{lazy:t,trim:n,number:i}},s){e[yt]=Jt(s);const o=i||s.props&&s.props.type==="number";At(e,t?"change":"input",l=>{l.target.composing||e[yt](Os(e.value,n,o))}),(n||o)&&At(e,"change",()=>{e.value=Os(e.value,n,o)}),t||(At(e,"compositionstart",Ga),At(e,"compositionend",Fs),At(e,"change",Fs))},mounted(e,{value:t}){e.value=t??""},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:i,trim:s,number:o}},l){if(e[yt]=Jt(l),e.composing)return;const u=(o||e.type==="number")&&!/^0\d/.test(e.value)?qn(e.value):e.value,c=t??"";if(u===c)return;const h=e.getRootNode();(h instanceof Document||h instanceof ShadowRoot)&&h.activeElement===e&&e.type!=="range"&&(i&&t===n||s&&e.value.trim()===c)||(e.value=c)}},Rt={deep:!0,created(e,t,n){e[yt]=Jt(n),At(e,"change",()=>{const i=e._modelValue,s=Cn(e),o=e.checked,l=e[yt];if(Y(i)){const u=Di(i,s),c=u!==-1;if(o&&!c)l(i.concat(s));else if(!o&&c){const h=[...i];h.splice(u,1),l(h)}}else if(Xt(i)){const u=new Set(i);o?u.add(s):u.delete(s),l(u)}else l(fr(e,o))})},mounted:Is,beforeUpdate(e,t,n){e[yt]=Jt(n),Is(e,t,n)}};function Is(e,{value:t,oldValue:n},i){e._modelValue=t;let s;if(Y(t))s=Di(t,i.props.value)>-1;else if(Xt(t))s=t.has(i.props.value);else{if(t===n)return;s=Zt(t,fr(e,!0))}e.checked!==s&&(e.checked=s)}const Ne={deep:!0,created(e,{value:t,modifiers:{number:n}},i){e._modelValue=t,At(e,"change",()=>{const s=Array.prototype.filter.call(e.options,o=>o.selected).map(o=>n?qn(Cn(o)):Cn(o));e[yt](e.multiple?Xt(e._modelValue)?new Set(s):s:s[0]),e._assigning=!0,ji(()=>{e._assigning=!1})}),e[yt]=Jt(i)},mounted(e,{value:t}){zs(e,t)},beforeUpdate(e,{value:t},n){e._modelValue=t,e[yt]=Jt(n)},updated(e,{value:t}){e._assigning||zs(e,t)}};function zs(e,t){const n=e.multiple,i=Y(t);if(!(n&&!i&&!Xt(t))){for(let s=0,o=e.options.length;s<o;s++){const l=e.options[s],u=Cn(l);if(n)if(i){const c=typeof u;c==="string"||c==="number"?l.selected=t.some(h=>String(h)===String(u)):l.selected=Di(t,u)>-1}else l.selected=t.has(u);else if(Zt(Cn(l),t)){e.selectedIndex!==s&&(e.selectedIndex=s);return}}!n&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function Cn(e){return"_value"in e?e._value:e.value}function fr(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const $a=["ctrl","shift","alt","meta"],ja={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>$a.some(n=>e[`${n}Key`]&&!t.includes(n))},Ji=(e,t)=>{if(!e)return e;const n=e._withMods||(e._withMods={}),i=t.join(".");return n[i]||(n[i]=((s,...o)=>{for(let l=0;l<t.length;l++){const u=ja[t[l]];if(u&&u(s,t))return}return e(s,...o)}))},Ha={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Ka=(e,t)=>{const n=e._withKeys||(e._withKeys={}),i=t.join(".");return n[i]||(n[i]=(s=>{if(!("key"in s))return;const o=Et(s.key);if(t.some(l=>l===o||Ha[l]===o))return e(s)}))},qa=Fe({patchProp:_a},Pa);let Ls;function Ya(){return Ls||(Ls=ia(qa))}const Ja=((...e)=>{const t=Ya().createApp(...e),{mount:n}=t;return t.mount=i=>{const s=Za(i);if(!s)return;const o=t._component;!Q(o)&&!o.render&&!o.template&&(o.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const l=n(s,!1,Xa(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),l},t});function Xa(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Za(e){return ye(e)?document.querySelector(e):e}const pr=`// Particle Life + Boids — combined compute simulation.
// Port of particle_boids.glsl (Godot compute shader) to WGSL.
//
// Buffers are consolidated compared to the Godot original so we stay under the
// default WebGPU limit of 8 storage buffers per shader stage:
//   grid        = [ counts | offsets | cursor | mediumA | mediumB | blob ]  numCells
//   indices     = [ sortedIndices | agentCell | agentBlob ]   each agentCount
//   collisions  = [ counts | partners ]           agentCount, agentCount*maxCollisions
//   interaction = [ speciesCount^2 matrix | philicities | core sizes ]  (n^2 + 2n)
//
// The two medium regions ping-pong: diffuseMedium reads one and writes the
// other, so the blur has no read/write hazard. They hold f32 bitcast into the
// u32 atomics the counting regions need.

struct Params {
    dt: f32,
    mixT: f32,
    agentsCount: f32,
    speciesCount: f32,

    boidVisionRadius: f32,
    speciesInteractionRadius: f32,

    alignmentForce: f32,
    cohesionForce: f32,
    separationForce: f32,

    movementRandomness: f32,
    movementScaling: f32,
    forceSoftening: f32,
    centerAttraction: f32,
    drag: f32,
    minSpeed: f32,
    maxSpeed: f32,
    maxForce: f32,

    collisionRadius: f32,
    maxCollisions: f32,

    cellSize: f32,
    cellsPerRow: f32,
    numCells: f32,

    drawRadius: f32,
    worldSize: f32,
    cameraX: f32,
    cameraY: f32,
    zoom: f32,
    viewportW: f32,
    viewportH: f32,
    frame: f32,

    mediumForce: f32,
    mediumDiffuse: f32,
    mediumDisplace: f32,
    mediumCapacity: f32,
    mediumFlip: f32,
    showMedium: f32,

    coreRadius: f32,
    coreStrength: f32,
    coreFalloff: f32,

    renderMode: f32,
    blobMinCount: f32,

    mutateRate: f32,
    mutateBias: f32,
    mutateInterval: f32,

    driftCols: f32,
    driftSize: f32,
    driftSpeed: f32,
    driftBrightness: f32,

    particleShape: f32,
    speciesPalette: f32,
    glowStrength: f32,
    glowSize: f32,
    velocityStretch: f32,
    drawScale: f32,
    drawJitter: f32,

    trailFade: f32,
    bgR: f32,
    bgG: f32,
    bgB: f32,

    fieldMode: f32,
    fieldThreshold: f32,
    fieldStrength: f32,

    splitInterval: f32,
    splitChance: f32,
    splitMinCount: f32,
    splitImpulse: f32,
    splitMutation: f32,

    neighbourRef: f32,
    outline: f32,
    brownian: f32,

    _pad0: f32,
    _pad1: f32,
    _pad2: f32,
};

struct Particle {
    pos: vec2f,
    vel: vec2f,
};

@group(0) @binding(0) var<uniform> P: Params;
@group(0) @binding(1) var<storage, read>       inParticles: array<Particle>;
@group(0) @binding(2) var<storage, read_write> outParticles: array<Particle>;
// read_write, not read: mutation edits species in place. Nothing else writes
// it, and \`mutateSpecies\` runs in its own dispatch, so there is no hazard with
// the neighbour loop reading it.
@group(0) @binding(3) var<storage, read_write> species: array<f32>;
@group(0) @binding(4) var<storage, read>       interaction: array<f32>;
@group(0) @binding(5) var<storage, read_write> grid: array<atomic<u32>>;
@group(0) @binding(6) var<storage, read_write> indices: array<u32>;
@group(0) @binding(7) var<storage, read_write> collisions: array<atomic<u32>>;

const WG = 256u;

// Pipeline-overridable constant, set from \`constants\` in the pipeline
// descriptor. The compiler folds the branch away, so the discrete pipeline
// contains no interpolation at all and pays nothing for the feature being
// available. See \`#createRunSimPipelines()\` in engine.js.
override CONTINUOUS_SPECIES: bool = true;

// Which way the blob density blur reads/writes. Two pipelines are built from
// this one entry point and dispatched alternately, which ping-pongs without
// needing a per-dispatch uniform (WebGPU has no push constants).
override BLUR_A_TO_B: bool = true;

// Which way the *density* blur reads/writes, same trick as above.
override DENS_1_TO_0: bool = true;

// TODO 1e. At the extremes of the boids<->particle-life blend, half the inner
// loop's work is computed and then thrown away by \`mix()\`. These let the two
// halves be compiled out entirely for a pure-boids or pure-particle-life
// dispatch, rather than branched around per neighbour.
override WANT_BOIDS: bool = true;
override WANT_PLIFE: bool = true;

// ---------------------------------------------------------------- helpers ---

// GLSL-style mod: result always has the sign of y (unlike WGSL's %).
fn fmodp(x: f32, y: f32) -> f32 {
    return x - y * floor(x / y);
}

fn limitVec(v: vec2f, maxVal: f32) -> vec2f {
    let mag = length(v);
    if (mag > maxVal) {
        return normalize(v) * maxVal;
    }
    return v;
}

fn safeNormalize(v: vec2f) -> vec2f {
    let len = length(v);
    if (len > 0.0001) {
        return v / len;
    }
    return vec2f(0.0);
}

// The Godot original seeds from the agent id alone, which makes the Randomness
// slider a *fixed per-agent bias* rather than noise — every agent gets its own
// constant nudge for the whole run. Mixing the frame in turns it into real
// Brownian motion. Off by default because it changes the feel of every existing
// preset, which is exactly why it was only flagged and not fixed for so long.
fn randomDir(id: u32, scale: f32) -> vec2f {
    var seed = id * 1664525u + 1013904223u;
    if (P.brownian > 0.5) {
        seed = seed ^ (u32(P.frame) * 2654435761u);
        seed = seed * 1664525u + 1013904223u;
    }
    let ang = f32(seed % 6283u) * 0.001;
    return vec2f(cos(ang), sin(ang)) * scale;
}

// Integer hash. WGSL has no forward declarations, so shared helpers live
// above their first use.
fn hashU32(xIn: u32) -> u32 {
    var x = xIn;
    x ^= x >> 16u;
    x *= 0x7feb352du;
    x ^= x >> 15u;
    x *= 0x846ca68bu;
    x ^= x >> 16u;
    return x;
}

// Uniform in [-1, 1].
fn hashSigned(x: u32) -> f32 {
    return f32(hashU32(x) % 2048u) / 1024.0 - 1.0;
}

// Shortest delta across a wrapping (toroidal) world.
fn toroidalDiff(a: vec2f, b: vec2f, worldSize: vec2f) -> vec2f {
    var d = b - a;
    d -= worldSize * round(d / worldSize);
    return d;
}

fn applyBorder(pos: vec2f) -> vec2f {
    var p = pos;
    let world = P.worldSize;
    let half = world * 0.5;
    if (p.x < -half) { p.x += world; }
    if (p.x >  half) { p.x -= world; }
    if (p.y < -half) { p.y += world; }
    if (p.y >  half) { p.y -= world; }
    return p;
}

// ------------------------------------------------------- continuous species ---
//
// Species is an f32, not an index. An agent at 2.4 sits four tenths of the way
// from basis species 2 to basis species 3 — its colour, its row of the
// interaction matrix, its philicity and its size are all interpolated. The
// discrete matrix in the UI is the *basis*; agents live between its rows.

// Bracketing basis species for a continuous value: (lo, hi, frac).
fn speciesBracket(s: f32) -> vec3f {
    let maxIdx = max(P.speciesCount - 1.0, 0.0);
    let c = clamp(s, 0.0, maxIdx);
    let lo = floor(c);
    return vec3f(lo, min(lo + 1.0, maxIdx), c - lo);
}

// Linear interpolation of a per-species scalar stored at \`base\`.
fn speciesLerp(base: u32, s: f32) -> f32 {
    let b = speciesBracket(s);
    return mix(interaction[base + u32(b.x)], interaction[base + u32(b.y)], b.z);
}

// Where the per-species data lives inside the \`interaction\` buffer.
fn philicityBase() -> u32 { let n = u32(P.speciesCount); return n * n; }
fn coreSizeBase() -> u32 { let n = u32(P.speciesCount); return n * n + n; }

// ---------------------------------------------------------- excluded volume ---

// Repulsion profile as a function of x = dist / pairRadius, in [0, 1).
// All four return 0 at x = 1 except \`hard\`, which is deliberately a step.
fn coreFalloffAt(x: f32) -> f32 {
    let mode = i32(P.coreFalloff);
    if (mode == 1) {
        let k = 1.0 - x;        // smooth: quadratic, gentle at the surface
        return k * k;
    }
    if (mode == 2) {
        return 1.0;             // hard: constant inside the radius, a step at it
    }
    if (mode == 3) {
        // stiff: blows up at contact, capped so it cannot explode the integrator
        return min((1.0 - x) / max(x, 0.02), 25.0);
    }
    return 1.0 - x;             // linear (default)
}

// Softened + capped inverse-distance force.
fn applyForce(f: f32, dist: f32, softening: f32, maxForce: f32) -> f32 {
    let softenedDist = sqrt(dist * dist + softening * softening);
    return clamp(f / softenedDist, -maxForce, maxForce);
}

fn cellOf(p: vec2f) -> u32 {
    let world = P.worldSize;
    let half = world * 0.5;
    let cpr = i32(P.cellsPerRow);
    let rx = fmodp(p.x + half, world);
    let ry = fmodp(p.y + half, world);
    var cx = i32(floor(rx / P.cellSize)) % cpr;
    var cy = i32(floor(ry / P.cellSize)) % cpr;
    if (cx < 0) { cx += cpr; }
    if (cy < 0) { cy += cpr; }
    return u32(cy * cpr + cx);
}

// ----------------------------------------------------------- medium field ---

// The two medium regions swap roles each simulated frame.
fn mediumSrcBase() -> u32 { return (3u + u32(P.mediumFlip)) * u32(P.numCells); }
fn mediumDstBase() -> u32 { return (4u - u32(P.mediumFlip)) * u32(P.numCells); }

fn mediumLoad(base: u32, cell: vec2i) -> f32 {
    let cpr = i32(P.cellsPerRow);
    var cx = cell.x % cpr;
    var cy = cell.y % cpr;
    if (cx < 0) { cx += cpr; }
    if (cy < 0) { cy += cpr; }
    return bitcast<f32>(atomicLoad(&grid[base + u32(cy * cpr + cx)]));
}

// Bilinear across the 4 nearest cell centres. Without this the field is visibly
// blocky at cellSize = 500, and the gradient is a step function.
fn sampleMedium(p: vec2f) -> f32 {
    let world = P.worldSize;
    let half = world * 0.5;
    let wrapped = vec2f(fmodp(p.x + half, world), fmodp(p.y + half, world));
    let g = wrapped / P.cellSize - vec2f(0.5);   // continuous cell coordinates
    let base = floor(g);
    let f = g - base;
    let b = vec2i(base);
    let dst = mediumDstBase();

    let m00 = mediumLoad(dst, b);
    let m10 = mediumLoad(dst, b + vec2i(1, 0));
    let m01 = mediumLoad(dst, b + vec2i(0, 1));
    let m11 = mediumLoad(dst, b + vec2i(1, 1));
    return mix(mix(m00, m10, f.x), mix(m01, m11, f.x), f.y);
}

// Central difference over one cell, so the result is in field units per cell
// rather than per world unit — otherwise it scales with cellSize and the
// Medium Force slider would need a different range for every world size.
fn mediumGradient(p: vec2f) -> vec2f {
    let h = P.cellSize * 0.5;
    return vec2f(
        sampleMedium(p + vec2f(h, 0.0)) - sampleMedium(p - vec2f(h, 0.0)),
        sampleMedium(p + vec2f(0.0, h)) - sampleMedium(p - vec2f(0.0, h)),
    );
}

// Blur the field, then let agent occupancy push it out of crowded cells.
// Runs after countCells, so the counts region is current.
@compute @workgroup_size(WG)
fn diffuseMedium(@builtin(global_invocation_id) gid: vec3u) {
    let idx = gid.x;
    let n = u32(P.numCells);
    if (idx >= n) { return; }

    let cpr = i32(P.cellsPerRow);
    let cx = i32(idx) % cpr;
    let cy = i32(idx) / cpr;
    let src = mediumSrcBase();

    // 3x3 tent blur (1-2-1 separable), wrapping at the world edges.
    var sum = 0.0;
    for (var dy = -1; dy <= 1; dy++) {
        for (var dx = -1; dx <= 1; dx++) {
            let w = f32((2 - abs(dx)) * (2 - abs(dy)));   // 4 / 2 / 1
            sum += w * mediumLoad(src, vec2i(cx + dx, cy + dy));
        }
    }
    let blurred = sum / 16.0;

    let here = mediumLoad(src, vec2i(cx, cy));
    var m = mix(here, blurred, clamp(P.mediumDiffuse, 0.0, 1.0));

    // Displacement: a cell packed with agents has no room left for medium.
    let occ = f32(atomicLoad(&grid[idx])) / max(P.mediumCapacity, 1.0);
    let room = clamp(1.0 - occ, 0.0, 1.0);
    m = mix(m, room, clamp(P.mediumDisplace, 0.0, 1.0));

    atomicStore(&grid[mediumDstBase() + idx], bitcast<u32>(clamp(m, 0.0, 1.0)));
}

// ---------------------------------------------------------- density field ---
//
// A finer grid than the spatial hash, purely for rendering. Reusing the hash
// cell counts gives a field only \`cellsPerRow\` across — 32 at the default world
// size, or one cell every ~57 screen pixels — and no amount of blurring makes a
// 32x32 image look like a fluid. Splatting agents into a DSUB-times finer grid
// costs one atomicAdd per agent and fixes the resolution at its source.

const DSUB: u32 = 4u;

fn densCellsPerRow() -> u32 { return u32(P.cellsPerRow) * DSUB; }
fn densCount() -> u32 { let n = densCellsPerRow(); return n * n; }
// Region 0 is the raw count, region 1 the smoothed float. After the counts are
// converted, region 0 is reused as blur scratch.
fn dens0Base() -> u32 { return 8u * u32(P.numCells); }
fn dens1Base() -> u32 { return dens0Base() + densCount(); }

@compute @workgroup_size(WG)
fn densitySplat(@builtin(global_invocation_id) gid: vec3u) {
    let id = gid.x;
    if (id >= u32(P.agentsCount)) { return; }

    let world = P.worldSize;
    let half = world * 0.5;
    let n = i32(densCellsPerRow());
    let size = P.cellSize / f32(DSUB);
    let p = inParticles[id].pos;

    var cx = i32(floor(fmodp(p.x + half, world) / size)) % n;
    var cy = i32(floor(fmodp(p.y + half, world) / size)) % n;
    if (cx < 0) { cx += n; }
    if (cy < 0) { cy += n; }
    atomicAdd(&grid[dens0Base() + u32(cy * n + cx)], 1u);
}

/** Counts -> float, so every later pass works in one representation. */
@compute @workgroup_size(WG)
fn densityNormalize(@builtin(global_invocation_id) gid: vec3u) {
    let idx = gid.x;
    if (idx >= densCount()) { return; }
    let c = f32(atomicLoad(&grid[dens0Base() + idx]));
    atomicStore(&grid[dens1Base() + idx], bitcast<u32>(c));
}

@compute @workgroup_size(WG)
fn densityBlur(@builtin(global_invocation_id) gid: vec3u) {
    let idx = gid.x;
    let total = densCount();
    if (idx >= total) { return; }

    let src = select(dens0Base(), dens1Base(), DENS_1_TO_0);
    let dst = select(dens1Base(), dens0Base(), DENS_1_TO_0);

    let n = i32(densCellsPerRow());
    let cx = i32(idx) % n;
    let cy = i32(idx) / n;

    var sum = 0.0;
    for (var dy = -1; dy <= 1; dy++) {
        for (var dx = -1; dx <= 1; dx++) {
            var nx = (cx + dx) % n;
            var ny = (cy + dy) % n;
            if (nx < 0) { nx += n; }
            if (ny < 0) { ny += n; }
            let w = f32((2 - abs(dx)) * (2 - abs(dy)));   // 4 / 2 / 1
            sum += w * bitcast<f32>(atomicLoad(&grid[src + u32(ny * n + nx)]));
        }
    }
    atomicStore(&grid[dst + idx], bitcast<u32>(sum / 16.0));
}

// ---------------------------------------------------------- blob labelling ---
//
// Connected-component labelling over *occupied cells*, not over agents. The
// TODO's agent-resolution version would cost a full ~225-neighbour scan per
// iteration; at cell resolution an iteration is 8 loads over <=65,536 cells,
// which is thousands of times cheaper and gives the same answer for the
// droplet-shaped blobs this simulation actually makes.
//
// Propagation is \`atomicMin\` in place rather than a ping-pong. Min is monotone,
// so a lost update only delays convergence by an iteration — it cannot produce
// a wrong label — which saves a whole numCells region.

const BLOB_NONE: u32 = 0xFFFFFFFFu;

fn blobBase() -> u32 { return 5u * u32(P.numCells); }
fn densABase() -> u32 { return 6u * u32(P.numCells); }
fn densBBase() -> u32 { return 7u * u32(P.numCells); }

// A cell only conducts if it is genuinely dense. Labelling every *occupied*
// cell merges the whole world into one component, because the thin gas of
// stragglers between droplets is enough to bridge them. This threshold is what
// separates "blob" from "background".
//
// The test is against the *smoothed* density, not the raw count. Thresholding
// raw counts gives blobs the shape of the cell grid — blocky, with ragged
// edges and pinhole gaps. Blurring first and thresholding after rounds corners
// off and closes the pinholes, which is the standard way to get smooth
// isosurfaces out of a coarse field.
fn blobDensity(cell: u32) -> f32 {
    return bitcast<f32>(atomicLoad(&grid[densABase() + cell]));
}

fn blobSolid(cell: u32) -> bool {
    return blobDensity(cell) >= P.blobMinCount;
}

// Seed the density field from this frame's occupancy counts.
@compute @workgroup_size(WG)
fn blobDensityInit(@builtin(global_invocation_id) gid: vec3u) {
    let idx = gid.x;
    if (idx >= u32(P.numCells)) { return; }
    atomicStore(&grid[densABase() + idx], bitcast<u32>(f32(atomicLoad(&grid[idx]))));
}

// One 3x3 tent blur of the density field. Dispatched an even number of times,
// alternating direction, so the result always lands back in region A.
@compute @workgroup_size(WG)
fn blobBlur(@builtin(global_invocation_id) gid: vec3u) {
    let idx = gid.x;
    if (idx >= u32(P.numCells)) { return; }

    let src = select(densBBase(), densABase(), BLUR_A_TO_B);
    let dst = select(densABase(), densBBase(), BLUR_A_TO_B);

    let cpr = i32(P.cellsPerRow);
    let cx = i32(idx) % cpr;
    let cy = i32(idx) / cpr;

    var sum = 0.0;
    for (var dy = -1; dy <= 1; dy++) {
        for (var dx = -1; dx <= 1; dx++) {
            var nx = (cx + dx) % cpr;
            var ny = (cy + dy) % cpr;
            if (nx < 0) { nx += cpr; }
            if (ny < 0) { ny += cpr; }
            let w = f32((2 - abs(dx)) * (2 - abs(dy)));   // 4 / 2 / 1
            sum += w * bitcast<f32>(atomicLoad(&grid[src + u32(ny * cpr + nx)]));
        }
    }
    atomicStore(&grid[dst + idx], bitcast<u32>(sum / 16.0));
}

// Every occupied cell starts as its own blob; empty cells are unlabelled.
@compute @workgroup_size(WG)
fn blobSeed(@builtin(global_invocation_id) gid: vec3u) {
    let idx = gid.x;
    if (idx >= u32(P.numCells)) { return; }
    atomicStore(&grid[blobBase() + idx], select(BLOB_NONE, idx, blobSolid(idx)));
}

// One round of "take the smallest label in my 3x3 neighbourhood". Repeated,
// the minimum floods each connected region; it converges in as many rounds as
// the region is wide in cells.
@compute @workgroup_size(WG)
fn blobPropagate(@builtin(global_invocation_id) gid: vec3u) {
    let idx = gid.x;
    if (idx >= u32(P.numCells)) { return; }
    if (!blobSolid(idx)) { return; }

    let cpr = i32(P.cellsPerRow);
    let cx = i32(idx) % cpr;
    let cy = i32(idx) / cpr;
    let base = blobBase();

    var best = atomicLoad(&grid[base + idx]);
    for (var dy = -1; dy <= 1; dy++) {
        for (var dx = -1; dx <= 1; dx++) {
            var nx = (cx + dx) % cpr;
            var ny = (cy + dy) % cpr;
            if (nx < 0) { nx += cpr; }
            if (ny < 0) { ny += cpr; }
            let nIdx = u32(ny * cpr + nx);
            if (blobSolid(nIdx)) {
                best = min(best, atomicLoad(&grid[base + nIdx]));
            }
        }
    }
    atomicMin(&grid[base + idx], best);
}

// Cache each agent's blob so the render pass can read it as a vertex attribute
// (the vertex stage deliberately binds no storage buffers — see FINDINGS #2).
// Runs every frame, unlike the labelling itself, because agents change cells.
@compute @workgroup_size(WG)
fn resolveBlobs(@builtin(global_invocation_id) gid: vec3u) {
    let id = gid.x;
    let n = u32(P.agentsCount);
    if (id >= n) { return; }
    indices[2u * n + id] = atomicLoad(&grid[blobBase() + indices[n + id]]);
}

// -------------------------------------------------------- blob splitting ---
//
// Mitosis. A blob is cut along a random axis through its own centroid and the
// two halves are pushed apart with opposite impulses, while their species drift
// in opposite directions — so a division is also a speciation event.
//
// Selection, such as it is, comes from the size threshold: only blobs that grew
// big enough to qualify ever divide, and a blob only gets big by holding
// together. That is the "persistence as fitness" idea in its cheapest form.
//
// Per-blob aggregates live in three numCells-sized regions, keyed by blob id
// (which *is* a cell index, so the sizing works out exactly).

fn blobCountBase() -> u32 { let d = 2u * u32(P.numCells) * DSUB * DSUB; return 8u * u32(P.numCells) + d; }
fn blobSumXBase() -> u32 { return blobCountBase() + u32(P.numCells); }
fn blobSumYBase() -> u32 { return blobCountBase() + 2u * u32(P.numCells); }

// Positions are summed as 8-bit fractions of the world. Coarse, but a centroid
// only needs cell-scale accuracy, and it keeps the sum inside u32 even at
// 1.6M agents (1.6e6 * 255 = 4.1e8).
const POS_QUANT: f32 = 255.0;

@compute @workgroup_size(WG)
fn blobStatsReset(@builtin(global_invocation_id) gid: vec3u) {
    let idx = gid.x;
    if (idx >= u32(P.numCells)) { return; }
    atomicStore(&grid[blobCountBase() + idx], 0u);
    atomicStore(&grid[blobSumXBase() + idx], 0u);
    atomicStore(&grid[blobSumYBase() + idx], 0u);
}

@compute @workgroup_size(WG)
fn blobStatsAccum(@builtin(global_invocation_id) gid: vec3u) {
    let id = gid.x;
    let n = u32(P.agentsCount);
    if (id >= n) { return; }
    let blob = indices[2u * n + id];
    if (blob == BLOB_NONE) { return; }

    let world = P.worldSize;
    let half = world * 0.5;
    let p = outParticles[id].pos;
    let qx = u32(clamp(fmodp(p.x + half, world) / world, 0.0, 1.0) * POS_QUANT);
    let qy = u32(clamp(fmodp(p.y + half, world) / world, 0.0, 1.0) * POS_QUANT);

    atomicAdd(&grid[blobCountBase() + blob], 1u);
    atomicAdd(&grid[blobSumXBase() + blob], qx);
    atomicAdd(&grid[blobSumYBase() + blob], qy);
}

@compute @workgroup_size(WG)
fn splitBlobs(@builtin(global_invocation_id) gid: vec3u) {
    let id = gid.x;
    let n = u32(P.agentsCount);
    if (id >= n) { return; }

    let blob = indices[2u * n + id];
    if (blob == BLOB_NONE) { return; }

    let count = atomicLoad(&grid[blobCountBase() + blob]);
    if (count < u32(P.splitMinCount)) { return; }

    // One decision per blob per epoch, taken identically by every agent in it.
    let epoch = u32(P.frame) / max(u32(P.splitInterval), 1u);
    let roll = hashU32(blob * 2246822519u + epoch);
    if (f32(roll % 10000u) / 10000.0 > P.splitChance) { return; }

    // Centroid, back out of the quantised sums.
    let world = P.worldSize;
    let half = world * 0.5;
    let inv = 1.0 / (f32(count) * POS_QUANT);
    let cx = f32(atomicLoad(&grid[blobSumXBase() + blob])) * inv * world - half;
    let cy = f32(atomicLoad(&grid[blobSumYBase() + blob])) * inv * world - half;

    // A random cut plane through it, stable for this blob and epoch.
    let ang = f32(hashU32(blob * 668265263u + epoch) % 62832u) * 0.0001;
    let axis = vec2f(cos(ang), sin(ang));

    // Which half am I? Toroidal, so the blob can straddle the world edge.
    let d = toroidalDiff(vec2f(cx, cy), outParticles[id].pos, vec2f(world));
    let side = select(-1.0, 1.0, dot(d, axis) >= 0.0);

    // Shove the halves apart, and let them speciate in opposite directions.
    outParticles[id].vel += axis * (side * P.splitImpulse);

    let maxIdx = max(P.speciesCount - 1.0, 0.0);
    if (maxIdx > 0.0 && P.splitMutation > 0.0) {
        let period = 2.0 * maxIdx;
        var v = fmodp(species[id] + side * P.splitMutation, period);
        if (v > maxIdx) { v = period - v; }
        species[id] = v;
    }
}

// ------------------------------------------------------------- mutation ---
//
// Random drift in species space, per blob. Every agent in a blob is given the
// *same* nudge, so a droplet's whole lineage moves together rather than
// dissolving into noise — that is what makes it read as one thing evolving
// instead of 25,000 independent random walks.
//
// With no fitness this is a pure random walk, so it would diffuse toward the
// middle of the species range and stay there. \`mutateBias\` pushes back
// outwards, which keeps the population spread out and interesting to look at.
// Real selection arrives when blob *persistence* gates splitting — see TODO.

@compute @workgroup_size(WG)
fn mutateSpecies(@builtin(global_invocation_id) gid: vec3u) {
    let id = gid.x;
    let n = u32(P.agentsCount);
    if (id >= n) { return; }

    let blob = indices[2u * n + id];
    if (blob == BLOB_NONE) { return; }   // background agents do not mutate

    // One epoch per mutation step, so a blob's nudge is constant across the
    // dispatch but changes between them.
    let epoch = u32(P.frame) / max(u32(P.mutateInterval), 1u);
    var delta = hashSigned(blob * 2654435761u + epoch) * P.mutateRate;

    let maxIdx = max(P.speciesCount - 1.0, 0.0);
    let s = species[id];
    if (maxIdx <= 0.0) { return; }

    // Optional outward push, away from the centre of the range.
    delta += sign(s - maxIdx * 0.5) * P.mutateBias * P.mutateRate;

    // Reflect at the ends rather than clamp. Clamping makes 0 and N-1 absorbing
    // states, so a random walk piles up against them and the population ends up
    // stuck at the extremes; reflection leaves the walk unbiased and bounded,
    // whose stationary distribution is uniform across the range.
    let period = 2.0 * maxIdx;
    var v = fmodp(s + delta, period);
    if (v > maxIdx) { v = period - v; }
    species[id] = v;
}

// -------------------------------------------------------- spatial hashing ---

@compute @workgroup_size(WG)
fn countCells(@builtin(global_invocation_id) gid: vec3u) {
    let id = gid.x;
    let n = u32(P.agentsCount);
    if (id >= n) { return; }

    let cell = cellOf(inParticles[id].pos);
    indices[n + id] = cell;                 // agentCell region
    atomicAdd(&grid[cell], 1u);
}

var<workgroup> scanTemp: array<u32, WG>;

// Single-workgroup exclusive prefix sum over the per-cell counts. Writes the
// result to both the offsets region and the cursor region (scatter consumes the
// cursor destructively). numCells is small (~1-4k) so one workgroup is plenty.
@compute @workgroup_size(WG)
fn prefixSum(@builtin(local_invocation_id) lid: vec3u) {
    let tid = lid.x;
    let n = u32(P.numCells);
    var carry = 0u;
    var base = 0u;

    loop {
        if (base >= n) { break; }

        let i = base + tid;
        var v = 0u;
        if (i < n) { v = atomicLoad(&grid[i]); }
        scanTemp[tid] = v;
        workgroupBarrier();

        // Hillis-Steele inclusive scan.
        var offset = 1u;
        loop {
            if (offset >= WG) { break; }
            var t = 0u;
            if (tid >= offset) { t = scanTemp[tid - offset]; }
            workgroupBarrier();
            if (tid >= offset) { scanTemp[tid] = scanTemp[tid] + t; }
            workgroupBarrier();
            offset = offset * 2u;
        }

        let exclusive = scanTemp[tid] - v + carry;
        let blockTotal = scanTemp[WG - 1u];
        if (i < n) {
            atomicStore(&grid[n + i], exclusive);        // offsets
            atomicStore(&grid[2u * n + i], exclusive);   // cursor
        }
        workgroupBarrier();

        carry += blockTotal;
        base += WG;
    }
}

@compute @workgroup_size(WG)
fn scatter(@builtin(global_invocation_id) gid: vec3u) {
    let id = gid.x;
    let n = u32(P.agentsCount);
    if (id >= n) { return; }

    let cell = indices[n + id];
    let slot = atomicAdd(&grid[2u * u32(P.numCells) + cell], 1u);
    indices[slot] = id;
}

// ------------------------------------------------------------ simulation ---

@compute @workgroup_size(WG)
fn runSim(@builtin(global_invocation_id) gid: vec3u,
          @builtin(workgroup_id) wid: vec3u) {
    let id = gid.x;
    let agentCount = u32(P.agentsCount);
    if (id >= agentCount) { return; }

    var pos = inParticles[id].pos;
    var vel = inParticles[id].vel;
    let mySpecies = species[id];
    let mySize = speciesLerp(coreSizeBase(), mySpecies);

    // The actor's own bracket is fixed for the whole neighbour loop, so resolve
    // it once here. Only the *target's* bracket varies per neighbour, which
    // turns the bilinear matrix lookup into 4 loads and 3 mixes inside the loop.
    let myBracket = speciesBracket(mySpecies);

    let worldSize = P.worldSize;
    var align = vec2f(0.0);
    var coh = vec2f(0.0);
    var sep = vec2f(0.0);
    var interact = vec2f(0.0);
    var core = vec2f(0.0);
    var neighborCount = 0;

    let cpr = i32(P.cellsPerRow);
    let half = worldSize * 0.5;
    let posWrapped = vec2f(fmodp(pos.x + half, worldSize), fmodp(pos.y + half, worldSize));
    let cx = i32(floor(posWrapped.x / P.cellSize)) % cpr;
    let cy = i32(floor(posWrapped.y / P.cellSize)) % cpr;

    let numCells = u32(P.numCells);
    let maxCollisions = u32(P.maxCollisions);
    let speciesCount = u32(P.speciesCount);
    let rowLo = u32(myBracket.x) * speciesCount;
    let rowHi = u32(myBracket.y) * speciesCount;
    let coreBase = coreSizeBase();

    // 3x3 neighbourhood of cells, wrapping at the world edges.
    for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
            var ncx = (cx + dx) % cpr;
            var ncy = (cy + dy) % cpr;
            if (ncx < 0) { ncx += cpr; }
            if (ncy < 0) { ncy += cpr; }
            let cellIndex = u32(ncy * cpr + ncx);

            let start = atomicLoad(&grid[numCells + cellIndex]);
            let count = atomicLoad(&grid[cellIndex]);
            let end = start + count;

            for (var k = start; k < end; k++) {
                let i = indices[k];
                if (i == id) { continue; }

                let otherPos = inParticles[i].pos;
                let diff = toroidalDiff(pos, otherPos, vec2f(worldSize));
                var dist = length(diff);
                if (dist < 0.0001) { dist = 0.0001; }

                if (WANT_BOIDS && dist < P.boidVisionRadius) {
                    neighborCount++;
                    align += inParticles[i].vel;
                    coh += pos + diff;
                    sep -= diff / (dist * dist);
                }

                if (WANT_PLIFE && dist < P.speciesInteractionRadius) {
                    var f = 0.0;
                    if (CONTINUOUS_SPECIES) {
                        // Bilinear across the four surrounding matrix entries:
                        // both the actor's row and the target's column get
                        // interpolated. A single lerp between rows would be wrong.
                        let ob = speciesBracket(species[i]);
                        let c0 = u32(ob.x);
                        let c1 = u32(ob.y);
                        f = mix(
                            mix(interaction[rowLo + c0], interaction[rowLo + c1], ob.z),
                            mix(interaction[rowHi + c0], interaction[rowHi + c1], ob.z),
                            myBracket.z,
                        );
                    } else {
                        // Species are integers, so rowLo is already the right
                        // row and no interpolation can change the answer.
                        f = interaction[rowLo + u32(species[i])];
                    }
                    let dir = diff / dist;
                    interact += dir * applyForce(f, dist, P.forceSoftening, P.maxForce);
                }

                // Excluded volume. A short-range repulsion that ignores the
                // interaction matrix entirely, so mutually attracted species
                // keep real spacing instead of collapsing to a point.
                //
                // P.coreRadius is the *widest* a pair can be, since both sizes
                // are <= 1. Testing against it first means the extra species
                // read only happens for the few neighbours that are actually
                // close, rather than all ~225 of them.
                if (dist < P.coreRadius) {
                    var otherSize = 0.0;
                    if (CONTINUOUS_SPECIES) {
                        otherSize = speciesLerp(coreBase, species[i]);
                    } else {
                        otherSize = interaction[coreBase + u32(species[i])];
                    }
                    // Pair radius is the sum of the two agents' radii, so a
                    // species with size 0 neither excludes nor is excluded.
                    let pairRadius = P.coreRadius * 0.5 * (mySize + otherSize);
                    if (dist < pairRadius) {
                        let mag = P.coreStrength * mySize * coreFalloffAt(dist / pairRadius);
                        core -= (diff / dist) * mag;
                    }
                }

                if (dist < P.collisionRadius) {
                    let slot = atomicAdd(&collisions[id], 1u);
                    if (slot < maxCollisions) {
                        atomicStore(&collisions[agentCount + id * maxCollisions + slot], i);
                    }
                }
            }
        }
    }

    // Finalize boids averages.
    var boidForce = vec2f(0.0);
    if (neighborCount > 0) {
        let n = f32(neighborCount);
        align = safeNormalize(align / n) * P.alignmentForce;
        coh = safeNormalize((coh / n) - pos) * P.cohesionForce;
        sep = safeNormalize(sep) * P.separationForce;
        boidForce = align + coh + sep;
    }

    // Blend boids <-> particle life.
    var accel = mix(boidForce, interact, P.mixT);

    // Excluded volume is a property of the agent, not of either force model,
    // so it is added outside the blend and applies at every mixT.
    accel += core;

    // Medium: philic species climb the concentration gradient, phobic ones flee
    // it. Four bilinear taps per agent — not per neighbour — so this costs
    // nothing next to the loop above.
    if (P.mediumForce > 0.0001) {
        let philicity = speciesLerp(philicityBase(), mySpecies);
        accel += mediumGradient(pos) * (philicity * P.mediumForce);
    }

    if (P.centerAttraction > 0.0001) {
        accel += safeNormalize(-pos) * P.centerAttraction;
    }

    accel += randomDir(id + wid.x, P.movementRandomness);
    accel = limitVec(accel, P.maxForce);
    accel *= P.movementScaling;

    // Clamp speed (matches the original: applied before integration).
    let speed = length(vel);
    if (speed < P.minSpeed && speed > 0.0001) {
        vel = normalize(vel) * P.minSpeed;
    }
    if (speed > P.maxSpeed) {
        vel = normalize(vel) * P.maxSpeed;
    }

    vel += accel * P.dt;
    vel *= P.drag;

    pos += vel * P.dt;
    pos = applyBorder(pos);

    outParticles[id].pos = pos;
    outParticles[id].vel = vel;

    // The neighbour count is already computed for the boids averages; writing
    // it out costs one store and is what lets the renderer draw a droplet's
    // *surface* — interior agents have many neighbours, skin agents few.
    indices[3u * agentCount + id] = u32(max(neighborCount, 0));
}

@compute @workgroup_size(WG)
fn resolveCollide(@builtin(global_invocation_id) gid: vec3u) {
    let id = gid.x;
    let agentCount = u32(P.agentsCount);
    if (id >= agentCount) { return; }

    var pos = outParticles[id].pos;

    var correction = vec2f(0.0);
    var contribCount = 0u;

    let maxCollisions = u32(P.maxCollisions);
    let rawCount = atomicLoad(&collisions[id]);
    var c = min(rawCount, maxCollisions);
    if (c > agentCount) { c = agentCount; }

    let worldSize = P.worldSize;
    let colRadius = P.collisionRadius;
    let perNeighborMax = colRadius * 2.0;
    let maxMove = colRadius * 1.0;
    let applyFrac = 1.0;

    for (var s = 0u; s < c; s++) {
        let j = atomicLoad(&collisions[agentCount + id * maxCollisions + s]);
        if (j >= agentCount || j == id) { continue; }

        let otherPos = outParticles[j].pos;
        let diff = -toroidalDiff(pos, otherPos, vec2f(worldSize));
        let dist = length(diff);

        if (dist < 1e-6) {
            // Perfectly coincident: push apart along a pseudo-random axis.
            let angle = f32((id + 37u) % 1024u) * 0.0062831853;
            let n = vec2f(cos(angle), sin(angle));
            correction += n * min(colRadius, perNeighborMax);
            contribCount++;
            continue;
        }

        if (dist < colRadius) {
            let n = diff / dist;
            let overlap = colRadius - dist;
            correction += n * min(overlap, perNeighborMax);
            contribCount++;
        }
    }

    if (contribCount > 0u) {
        correction /= f32(contribCount);
        correction = clamp(correction, vec2f(-maxMove), vec2f(maxMove));
        pos += correction * applyFrac;
    }

    outParticles[id].pos = pos;
}
`,Qa=`// Rendering for the particle-life/boids sim.
//
// The Godot original rasterised circles by hand with imageStore() inside the
// compute shader. Here we use a real render pipeline instead: one instanced
// quad per agent, with the particle buffer bound directly as an instance-rate
// vertex buffer. Much faster, and we get antialiased edges for free.

struct Params {
    dt: f32,
    mixT: f32,
    agentsCount: f32,
    speciesCount: f32,

    boidVisionRadius: f32,
    speciesInteractionRadius: f32,

    alignmentForce: f32,
    cohesionForce: f32,
    separationForce: f32,

    movementRandomness: f32,
    movementScaling: f32,
    forceSoftening: f32,
    centerAttraction: f32,
    drag: f32,
    minSpeed: f32,
    maxSpeed: f32,
    maxForce: f32,

    collisionRadius: f32,
    maxCollisions: f32,

    cellSize: f32,
    cellsPerRow: f32,
    numCells: f32,

    drawRadius: f32,
    worldSize: f32,
    cameraX: f32,
    cameraY: f32,
    zoom: f32,
    viewportW: f32,
    viewportH: f32,
    frame: f32,

    mediumForce: f32,
    mediumDiffuse: f32,
    mediumDisplace: f32,
    mediumCapacity: f32,
    mediumFlip: f32,
    showMedium: f32,

    coreRadius: f32,
    coreStrength: f32,
    coreFalloff: f32,

    renderMode: f32,
    blobMinCount: f32,

    mutateRate: f32,
    mutateBias: f32,
    mutateInterval: f32,

    driftCols: f32,
    driftSize: f32,
    driftSpeed: f32,
    driftBrightness: f32,

    particleShape: f32,
    speciesPalette: f32,
    glowStrength: f32,
    glowSize: f32,
    velocityStretch: f32,
    drawScale: f32,
    drawJitter: f32,

    trailFade: f32,
    bgR: f32,
    bgG: f32,
    bgB: f32,

    fieldMode: f32,
    fieldThreshold: f32,
    fieldStrength: f32,

    splitInterval: f32,
    splitChance: f32,
    splitMinCount: f32,
    splitImpulse: f32,
    splitMutation: f32,

    neighbourRef: f32,
    outline: f32,
    brownian: f32,

    _pad0: f32,
    _pad1: f32,
    _pad2: f32,
};

@group(0) @binding(0) var<uniform> P: Params;

// Same buffer the compute stage bins agents into, bound read-only here purely so
// the medium overlay can sample its 4th/5th regions. See compute.wgsl for the
// region layout.
@group(0) @binding(1) var<storage, read> grid: array<u32>;

// Two independent uniforms in [0,1) from one integer. WGSL has no forward
// declarations, so shared helpers live above their first use.
fn hash2(xIn: u32) -> vec2f {
    var h = xIn;
    h ^= h >> 16u; h *= 0x7feb352du;
    h ^= h >> 15u; h *= 0x846ca68bu;
    h ^= h >> 16u;
    let a = f32(h & 0xFFFFu) / 65535.0;
    let b = f32((h >> 16u) & 0xFFFFu) / 65535.0;
    return vec2f(a, b);
}

// Blue -> cyan -> green -> yellow -> red.
fn heatmap(tIn: f32) -> vec3f {
    let t = clamp(tIn, 0.0, 1.0);
    if (t < 0.25) {
        return mix(vec3f(0.0, 0.0, 1.0), vec3f(0.0, 1.0, 1.0), t / 0.25);
    } else if (t < 0.5) {
        return mix(vec3f(0.0, 1.0, 1.0), vec3f(0.0, 1.0, 0.0), (t - 0.25) / 0.25);
    } else if (t < 0.75) {
        return mix(vec3f(0.0, 1.0, 0.0), vec3f(1.0, 1.0, 0.0), (t - 0.5) / 0.25);
    }
    return mix(vec3f(1.0, 1.0, 0.0), vec3f(1.0, 0.0, 0.0), (t - 0.75) / 0.25);
}

// Polynomial fit to matplotlib's viridis. Perceptually uniform, unlike the
// heatmap above — equal steps in t look like equal steps in brightness, so
// species read as ordered rather than as an arbitrary rainbow.
fn viridis(tIn: f32) -> vec3f {
    let t = clamp(tIn, 0.0, 1.0);
    let c0 = vec3f(0.2777, 0.0054, 0.3341);
    let c1 = vec3f(0.1051, 1.4046, 1.3846);
    let c2 = vec3f(-0.3308, 0.2148, 0.0951);
    let c3 = vec3f(-4.6342, -5.7991, -19.3324);
    let c4 = vec3f(6.2283, 14.1799, 56.6906);
    let c5 = vec3f(4.7764, -13.7451, -65.3530);
    let c6 = vec3f(-5.4355, 4.6459, 26.3124);
    return clamp(c0 + t * (c1 + t * (c2 + t * (c3 + t * (c4 + t * (c5 + t * c6))))),
                 vec3f(0.0), vec3f(1.0));
}

// Hand-built ramps. Explicit stops rather than fitted polynomials, so what you
// see is what is written here.
fn rampStops(tIn: f32, a: vec3f, b: vec3f, c: vec3f, d: vec3f) -> vec3f {
    let t = clamp(tIn, 0.0, 1.0) * 3.0;
    if (t < 1.0) { return mix(a, b, t); }
    if (t < 2.0) { return mix(b, c, t - 1.0); }
    return mix(c, d, t - 2.0);
}

// Full hue wheel. The right choice for *continuous* species, where 0 and N-1
// are neighbours in the interpolation and a linear ramp wrongly implies they
// are maximally far apart.
fn cyclic(tIn: f32) -> vec3f {
    let hue = fract(tIn) * 6.0;
    let x = 1.0 - abs(fract(hue * 0.5) * 2.0 - 1.0);
    if (hue < 1.0) { return vec3f(1.0, x, 0.0); }
    if (hue < 2.0) { return vec3f(x, 1.0, 0.0); }
    if (hue < 3.0) { return vec3f(0.0, 1.0, x); }
    if (hue < 4.0) { return vec3f(0.0, x, 1.0); }
    if (hue < 5.0) { return vec3f(x, 0.0, 1.0); }
    return vec3f(1.0, 0.0, x);
}

fn palette(t: f32) -> vec3f {
    let p = i32(P.speciesPalette);
    if (p == 1) { return viridis(t); }
    if (p == 2) {   // ember: black -> deep red -> orange -> white hot
        return rampStops(t, vec3f(0.10, 0.02, 0.05), vec3f(0.65, 0.08, 0.05),
                            vec3f(1.0, 0.55, 0.05), vec3f(1.0, 0.98, 0.85));
    }
    if (p == 3) {   // ice: midnight -> blue -> cyan -> white
        return rampStops(t, vec3f(0.03, 0.05, 0.22), vec3f(0.05, 0.35, 0.75),
                            vec3f(0.35, 0.85, 0.95), vec3f(0.95, 1.0, 1.0));
    }
    if (p == 4) { return cyclic(t); }
    if (p == 5) {   // mono
        let v = 0.15 + 0.85 * clamp(t, 0.0, 1.0);
        return vec3f(v);
    }
    if (p == 6) {   // plasma: indigo -> magenta -> orange -> yellow
        return rampStops(t, vec3f(0.05, 0.03, 0.53), vec3f(0.61, 0.09, 0.62),
                            vec3f(0.95, 0.42, 0.28), vec3f(0.94, 0.98, 0.13));
    }
    if (p == 7) {   // aurora: deep teal -> green -> pale pink
        return rampStops(t, vec3f(0.02, 0.10, 0.18), vec3f(0.05, 0.55, 0.45),
                            vec3f(0.45, 0.92, 0.55), vec3f(0.95, 0.75, 0.90));
    }
    if (p == 8) {   // sunset: night -> violet -> coral -> gold
        return rampStops(t, vec3f(0.09, 0.05, 0.22), vec3f(0.55, 0.14, 0.45),
                            vec3f(0.98, 0.42, 0.35), vec3f(1.0, 0.85, 0.42));
    }
    if (p == 9) {   // forest: bark -> moss -> leaf -> sand
        return rampStops(t, vec3f(0.08, 0.10, 0.06), vec3f(0.16, 0.36, 0.16),
                            vec3f(0.48, 0.70, 0.25), vec3f(0.90, 0.86, 0.60));
    }
    if (p == 10) {  // neon: black -> magenta -> cyan -> white
        return rampStops(t, vec3f(0.04, 0.0, 0.08), vec3f(0.95, 0.05, 0.75),
                            vec3f(0.10, 0.95, 0.95), vec3f(1.0, 1.0, 1.0));
    }
    if (p == 11) {  // pastel: low saturation across the wheel
        return rampStops(t, vec3f(0.70, 0.80, 0.92), vec3f(0.78, 0.92, 0.80),
                            vec3f(0.97, 0.90, 0.72), vec3f(0.95, 0.76, 0.80));
    }
    if (p == 12) {  // copper: near-black -> rust -> copper -> highlight
        return rampStops(t, vec3f(0.05, 0.02, 0.01), vec3f(0.42, 0.16, 0.06),
                            vec3f(0.82, 0.47, 0.22), vec3f(1.0, 0.85, 0.65));
    }
    if (p == 13) {  // spectrum: full rainbow, but not wrapping like cyclic
        return cyclic(clamp(t, 0.0, 1.0) * 0.85);
    }
    return heatmap(t);
}

// Species is continuous, so this already does the right thing for an agent
// sitting between two basis species — every ramp takes a continuous t.
fn speciesColor(s: f32) -> vec3f {
    let t = s / max(P.speciesCount - 1.0, 1.0);
    return palette(t);
}

// Blob ids are cell indices, so neighbouring blobs get neighbouring numbers and
// would shade almost identically. Hash first, then spread over a full-saturation
// hue wheel — adjacent blobs need to look obviously different, which a linear
// ramp cannot do.
fn blobColor(idIn: u32) -> vec3f {
    if (idIn == 0xFFFFFFFFu) {
        return vec3f(0.18);          // unlabelled: dim grey
    }
    var h = idIn;
    h ^= h >> 16u;
    h *= 0x7feb352du;
    h ^= h >> 15u;
    h *= 0x846ca68bu;
    h ^= h >> 16u;

    let hue = f32(h % 1024u) / 1024.0 * 6.0;
    let x = 1.0 - abs(fract(hue * 0.5) * 2.0 - 1.0);
    // Vary value slightly with the hash too, so same-hue neighbours still read
    // as distinct.
    let v = 0.75 + f32((h >> 10u) % 256u) / 256.0 * 0.25;
    var rgb = vec3f(0.0);
    if (hue < 1.0)      { rgb = vec3f(1.0, x, 0.0); }
    else if (hue < 2.0) { rgb = vec3f(x, 1.0, 0.0); }
    else if (hue < 3.0) { rgb = vec3f(0.0, 1.0, x); }
    else if (hue < 4.0) { rgb = vec3f(0.0, x, 1.0); }
    else if (hue < 5.0) { rgb = vec3f(x, 0.0, 1.0); }
    else                { rgb = vec3f(1.0, 0.0, x); }
    return rgb * v;
}

// Direction as hue, speed as brightness — the standard optical-flow reading.
fn velocityColor(vel: vec2f) -> vec3f {
    let speed = length(vel);
    let t = clamp(speed / max(P.maxSpeed, 1.0), 0.0, 1.0);
    let ang = (atan2(vel.y, vel.x) + 3.14159265) / 6.28318531;
    let hue = ang * 6.0;
    let x = 1.0 - abs(fract(hue * 0.5) * 2.0 - 1.0);
    var rgb = vec3f(0.0);
    if (hue < 1.0)      { rgb = vec3f(1.0, x, 0.0); }
    else if (hue < 2.0) { rgb = vec3f(x, 1.0, 0.0); }
    else if (hue < 3.0) { rgb = vec3f(0.0, 1.0, x); }
    else if (hue < 4.0) { rgb = vec3f(0.0, x, 1.0); }
    else if (hue < 5.0) { rgb = vec3f(x, 0.0, 1.0); }
    else                { rgb = vec3f(1.0, 0.0, x); }
    // Keep slow agents visible rather than black, but clearly dimmer.
    return rgb * (0.25 + 0.75 * sqrt(t));
}

// Screen pixels (y down, origin top-left) -> clip space.
fn screenToClip(screen: vec2f) -> vec4f {
    let ndc = vec2f(
        screen.x / P.viewportW * 2.0 - 1.0,
        1.0 - screen.y / P.viewportH * 2.0,
    );
    return vec4f(ndc, 0.0, 1.0);
}

// ------------------------------------------------------------- particles ---

// The glow layer is the same geometry drawn wider, softer and additively.
// Compiled as a separate pipeline from these same two entry points so the
// branches fold away rather than costing a test per fragment.
override GLOW_PASS: bool = false;

struct VSOut {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,        // -1..1 across the quad
    @location(1) color: vec3f,
    @location(2) pxRadius: f32,
    @location(3) fade: f32,
    @location(4) @interpolate(flat) shape: u32,
};

@vertex
fn vsParticle(
    @builtin(vertex_index) vi: u32,
    @builtin(instance_index) inst: u32,
    @location(0) pos: vec2f,
    @location(1) vel: vec2f,
    @location(2) sp: f32,
    @location(3) blob: u32,
    @location(4) nbr: u32,
) -> VSOut {
    // 4-vertex triangle-strip quad: (-1,-1) (1,-1) (-1,1) (1,1)
    let corner = vec2f(f32(vi & 1u), f32(vi >> 1u)) * 2.0 - 1.0;

    // World -> screen, matching the compute shader's camera convention.
    var screen = (pos - vec2f(P.cameraX, P.cameraY)) * P.zoom;
    screen += vec2f(P.viewportW, P.viewportH) * 0.5;

    // Per-agent size variation, from the instance index so it is stable frame
    // to frame (a jitter that reshuffled every frame would just look like
    // flicker). Both the core and the glow pass derive it identically, so
    // halos stay matched to their agents.
    var sizeMul = P.drawScale;
    if (P.drawJitter > 0.0001) {
        let h = hash2(inst * 0x9e3779b9u).x;          // [0, 1)
        sizeMul = sizeMul * max(1.0 + (h - 0.5) * 2.0 * P.drawJitter, 0.05);
    }

    // Scale in world units first, then clamp in pixels — otherwise the 1px
    // floor would swallow the variation whenever agents are sub-pixel.
    var radius = max(P.drawRadius * sizeMul * P.zoom, 1.0);
    if (GLOW_PASS) {
        radius = radius * max(P.glowSize, 1.0);
    }
    let padded = radius + 1.0;   // 1px of slack for the AA falloff

    // Velocity stretch: build the quad in a frame aligned to the velocity and
    // scale along it, so a disc becomes a streak. uv stays the unrotated
    // corner, so the fragment still evaluates its shape in a circular space.
    var offset = corner * padded;
    if (P.velocityStretch > 0.0001) {
        let speed = length(vel);
        if (speed > 0.0001) {
            let dir = vel / speed;
            let perp = vec2f(-dir.y, dir.x);
            let t = clamp(speed / max(P.maxSpeed, 1.0), 0.0, 1.0);
            let s = 1.0 + P.velocityStretch * t;
            offset = (dir * (corner.x * s) + perp * corner.y) * padded;
        }
    }

    var out: VSOut;
    out.position = screenToClip(screen + offset);
    out.uv = corner * (padded / radius);
    let mode = i32(P.renderMode);
    if (mode == 1) {
        out.color = blobColor(blob);
    } else if (mode == 2) {
        out.color = velocityColor(vel);
    } else if (mode == 3) {
        // Coordination number. Interior agents are crowded, surface agents are
        // not — so this draws the skin of a body rather than its bulk.
        let t = clamp(f32(nbr) / max(P.neighbourRef, 1.0), 0.0, 1.0);
        out.color = palette(1.0 - t);
    } else {
        out.color = speciesColor(sp);
    }
    out.pxRadius = radius;
    out.fade = select(1.0, P.glowStrength, GLOW_PASS);

    // "Varied" means pick a shape per *species*, so a species reads as one kind
    // of thing rather than every agent being independently speckled.
    var shape = u32(max(P.particleShape, 0.0));
    if (shape >= SHAPE_COUNT) {
        let basis = u32(max(sp, 0.0));
        shape = min(u32(hash2(basis * 2654435761u + 7u).x * f32(SHAPE_COUNT)),
                    SHAPE_COUNT - 1u);
    }
    out.shape = shape;
    return out;
}

// How many concrete shapes exist. Anything at or above this index means
// "vary per species", resolved in the vertex shader.
const SHAPE_COUNT: u32 = 7u;

// Coverage in [0,1] for a shape, given the -1..1 quad coordinate. \`px\` is the
// radius in pixels, used to keep the antialiasing a constant width on screen
// rather than a constant width in uv.
//
// Every branch reduces to a normalised distance \`m\` that is 1 at the edge, so
// they all share the same coverage-style antialiasing.
fn shapeCoverage(uv: vec2f, px: f32, shapeIn: u32) -> f32 {
    let shape = i32(shapeIn);

    if (shape == 1) {
        // Soft: gaussian-ish falloff. Reads as a haze blob rather than a dot,
        // and neighbouring agents merge into continuous mass.
        let d = length(uv);
        if (d >= 1.0) { return 0.0; }
        let k = 1.0 - d * d;
        return k * k;
    }
    if (shape == 2) {
        // Ring: shows structure through dense clumps that solid discs hide.
        let d = length(uv);
        let w = max(1.2 / px, 0.18);          // constant-ish on screen
        return clamp((1.0 - abs(d - (1.0 - w)) / w) , 0.0, 1.0);
    }
    if (shape == 3) {
        // Square: crisp, and cheap to read at very small sizes.
        let m = max(abs(uv.x), abs(uv.y));
        return clamp((1.0 - m) * px + 0.5, 0.0, 1.0);
    }
    if (shape == 4) {
        // Diamond: the L1 ball, so it reads as a square rotated 45 degrees.
        let m = abs(uv.x) + abs(uv.y);
        return clamp((1.0 - m) * px + 0.5, 0.0, 1.0);
    }
    if (shape == 5) {
        // Triangle: max of three half-plane distances, normals 90 degrees
        // apart around the circle, divided by the inradius so m = 1 at an edge.
        let m = max(-uv.y, max(0.866 * uv.x + 0.5 * uv.y,
                               -0.866 * uv.x + 0.5 * uv.y)) / 0.5;
        return clamp((1.0 - m) * px + 0.5, 0.0, 1.0);
    }
    if (shape == 6) {
        // Plus: inside if it is within the bar in *either* axis, hence the min.
        let w = 0.38;
        let m = max(min(abs(uv.x), abs(uv.y)) / w, max(abs(uv.x), abs(uv.y)));
        return clamp((1.0 - m) * px + 0.5, 0.0, 1.0);
    }

    // Disc (default). Coverage-style AA: distance from the edge in pixels.
    // Keeps sub-pixel particles fully opaque at their centre instead of fading
    // them out, which matters a lot when zoomed out.
    let d = length(uv);
    return clamp((1.0 - d) * px + 0.5, 0.0, 1.0);
}

@fragment
fn fsParticle(in: VSOut) -> @location(0) vec4f {
    var alpha: f32;
    if (GLOW_PASS) {
        // Always soft, whatever the core shape is — a halo with a hard edge
        // would just look like a bigger particle.
        let d = length(in.uv);
        if (d >= 1.0) { discard; }
        let k = 1.0 - d * d;
        alpha = k * k * k * in.fade;
    } else {
        alpha = shapeCoverage(in.uv, in.pxRadius, in.shape);
    }
    if (alpha <= 0.004) {
        discard;
    }

    var col = in.color;
    if (!GLOW_PASS && P.outline > 0.0) {
        // Darken the outer rim. Dense regions otherwise blend into one flat
        // mass; a per-agent edge keeps individuals readable without needing a
        // depth buffer.
        let edge = smoothstep(0.55, 1.0, length(in.uv));
        col = col * (1.0 - edge * P.outline);
    }
    return vec4f(col * alpha, alpha);
}

// ------------------------------------------------------- drifting motes ---
//
// Purely decorative background haze. No buffers and no simulation state: every
// mote's position is derived from its instance index and the frame counter, so
// this costs one extra instanced draw and nothing else.
//
// Placement is a **jittered grid**, not uniform random. Uniform random clumps —
// that is what random looks like — and clumped motes visually merge into
// blotches. One mote per grid cell with the jitter bounded to less than half a
// cell guarantees a minimum separation, which is the cheap way to get
// blue-noise-ish spacing.

struct DriftOut {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) alpha: f32,
};

@vertex
fn vsDrift(
    @builtin(vertex_index) vi: u32,
    @builtin(instance_index) inst: u32,
) -> DriftOut {
    let corner = vec2f(f32(vi & 1u), f32(vi >> 1u)) * 2.0 - 1.0;

    let cols = max(u32(P.driftCols), 1u);
    let cell = vec2f(f32(inst % cols), f32(inst / cols));
    let cellSize = P.worldSize / f32(cols);

    let r0 = hash2(inst * 2654435761u);
    let r1 = hash2(inst * 40503u + 17u);

    // Jitter stays inside the middle 60% of the cell, so two motes in adjacent
    // cells can never come closer than 40% of a cell spacing.
    let jitter = (r0 - 0.5) * 0.6 * cellSize;

    // Slow independent drift per mote, wrapped into the cell so spacing holds.
    let t = P.frame * P.driftSpeed;
    let phase = r1 * 6.28318531;
    let wander = vec2f(sin(t * (0.3 + r1.x * 0.7) + phase.x),
                       cos(t * (0.3 + r1.y * 0.7) + phase.y)) * 0.2 * cellSize;

    var world = (cell + 0.5) * cellSize - P.worldSize * 0.5 + jitter + wander;

    var screen = (world - vec2f(P.cameraX, P.cameraY)) * P.zoom;
    screen += vec2f(P.viewportW, P.viewportH) * 0.5;

    // Size varies per mote for depth; never smaller than a pixel or it flickers.
    let radius = max(P.driftSize * (0.5 + r1.x) * P.zoom, 1.0);

    var out: DriftOut;
    out.position = screenToClip(screen + corner * radius);
    out.uv = corner;
    out.alpha = P.driftBrightness * (0.35 + 0.65 * r0.y);
    return out;
}

@fragment
fn fsDrift(in: DriftOut) -> @location(0) vec4f {
    // Soft gaussian-ish falloff rather than a hard disc — these should read as
    // haze, not as agents.
    let d = length(in.uv);
    if (d > 1.0) { discard; }
    let fade = 1.0 - d * d;
    let a = in.alpha * fade * fade;
    return vec4f(vec3f(0.45, 0.60, 0.85) * a, a);   // premultiplied
}

// -------------------------------------------------------------- trails ---
//
// Persistence of vision. Instead of clearing the frame, the scene is drawn into
// a texture that is faded a little toward the background each frame, so agents
// leave a decaying streak behind them.
//
// The fade is a fullscreen quad of the background colour at alpha = trailFade,
// blended premultiplied — which is exactly a lerp of the accumulated image
// toward the background. That is why the background colour has to reach the
// shader here rather than staying a CPU-side clear value.

@fragment
fn fsFade() -> @location(0) vec4f {
    let a = clamp(P.trailFade, 0.0, 1.0);
    return vec4f(P.bgR * a, P.bgG * a, P.bgB * a, a);   // premultiplied
}

// The accumulation texture, sampled only by the blit that copies it to the
// canvas. It gets its own bind group, because a texture cannot be read and
// written in the same pass.
@group(1) @binding(0) var accumTex: texture_2d<f32>;

@fragment
fn fsBlit(@builtin(position) frag: vec4f) -> @location(0) vec4f {
    // One texel per pixel — no filtering wanted, and textureLoad needs no
    // sampler at all.
    return textureLoad(accumTex, vec2i(frag.xy), 0);
}

// ---------------------------------------------------------- grid overlay ---

@vertex
fn vsFullscreen(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f {
    // Oversized triangle covering the whole viewport:
    // (-1,-1), (3,-1), (-1,3)
    let x = select(-1.0, 3.0, vi == 1u);
    let y = select(-1.0, 3.0, vi == 2u);
    return vec4f(x, y, 0.0, 1.0);
}

fn fmodp(x: f32, y: f32) -> f32 {
    return x - y * floor(x / y);
}

fn screenToWorld(frag: vec2f) -> vec2f {
    let centered = frag - vec2f(P.viewportW, P.viewportH) * 0.5;
    return centered / P.zoom + vec2f(P.cameraX, P.cameraY);
}

@fragment
fn fsGrid(@builtin(position) frag: vec4f) -> @location(0) vec4f {
    let world = screenToWorld(frag.xy);

    let halfWorld = P.worldSize * 0.5;
    if (world.x < -halfWorld || world.x > halfWorld ||
        world.y < -halfWorld || world.y > halfWorld) {
        discard;
    }

    let cs = P.cellSize;
    let fx = fmodp(world.x + halfWorld, cs);
    let fy = fmodp(world.y + halfWorld, cs);
    let thickness = max(1.0 / P.zoom, 1.0);

    let vertical = fx < thickness || fx > cs - thickness;
    let horizontal = fy < thickness || fy > cs - thickness;
    if (!vertical && !horizontal) {
        discard;
    }
    let a = 0.35;
    return vec4f(vec3f(0.55) * a, a);   // premultiplied
}

// -------------------------------------------------------- medium overlay ---

// Mirrors sampleMedium() in compute.wgsl, reading the same ping-ponged region.
// Bilinear across the 4 nearest cell centres of any per-cell region. Without
// it a cell-resolution field reads as visible squares at cellSize = 500.
fn sampleCells(p: vec2f, base: u32) -> f32 {
    let world = P.worldSize;
    let half = world * 0.5;
    let cpr = i32(P.cellsPerRow);

    let wrapped = vec2f(fmodp(p.x + half, world), fmodp(p.y + half, world));
    let g = wrapped / P.cellSize - vec2f(0.5);
    let c0 = vec2i(floor(g));
    let f = g - floor(g);

    var m: array<f32, 4>;
    for (var k = 0; k < 4; k++) {
        var cx = (c0.x + (k & 1)) % cpr;
        var cy = (c0.y + (k >> 1)) % cpr;
        if (cx < 0) { cx += cpr; }
        if (cy < 0) { cy += cpr; }
        m[k] = bitcast<f32>(grid[base + u32(cy * cpr + cx)]);
    }
    return mix(mix(m[0], m[1], f.x), mix(m[2], m[3], f.x), f.y);
}

fn sampleMedium(p: vec2f) -> f32 {
    return sampleCells(p, (4u - u32(P.mediumFlip)) * u32(P.numCells));
}

// The smoothed agent-density field. It lives on its own grid, DSUB times finer
// than the spatial hash, so it needs its own cell size and row stride rather
// than sampleCells().
const DSUB: u32 = 4u;

fn sampleDensity(p: vec2f) -> f32 {
    let world = P.worldSize;
    let half = world * 0.5;
    let n = i32(u32(P.cellsPerRow) * DSUB);
    let size = P.cellSize / f32(DSUB);
    let base = 8u * u32(P.numCells) + u32(n) * u32(n);   // the smoothed region

    let wrapped = vec2f(fmodp(p.x + half, world), fmodp(p.y + half, world));
    let g = wrapped / size - vec2f(0.5);
    let c0 = vec2i(floor(g));
    let f = g - floor(g);

    var m: array<f32, 4>;
    for (var k = 0; k < 4; k++) {
        var cx = (c0.x + (k & 1)) % n;
        var cy = (c0.y + (k >> 1)) % n;
        if (cx < 0) { cx += n; }
        if (cy < 0) { cy += n; }
        m[k] = bitcast<f32>(grid[base + u32(cy * n + cx)]);
    }
    return mix(mix(m[0], m[1], f.x), mix(m[2], m[3], f.x), f.y);
}

// ------------------------------------------------------------ density field ---
//
// Agent occupancy is already counted every frame for the spatial hash; blurring
// it and shading the result turns a cloud of dots into a continuous body. This
// is the cheapest way to get a fluid look, because the data already exists.
//
// Mode 1 shades the field directly. Mode 2 thresholds it — classic metaballs —
// and lights the surface using the field's own gradient as a normal, which is
// what gives droplets their roundness instead of a flat silhouette.

@fragment
fn fsField(@builtin(position) frag: vec4f) -> @location(0) vec4f {
    let world = screenToWorld(frag.xy);
    let halfWorld = P.worldSize * 0.5;
    if (world.x < -halfWorld || world.x > halfWorld ||
        world.y < -halfWorld || world.y > halfWorld) {
        discard;
    }

    let scale = max(P.fieldThreshold, 0.0001);
    let d = sampleDensity(world) / scale;      // 1.0 == the surface

    if (i32(P.fieldMode) == 1) {
        // Straight shading. sqrt lifts the thin outskirts into view, which are
        // where the interesting filament structure lives.
        let t = clamp(d, 0.0, 1.0);
        let a = clamp(sqrt(t) * P.fieldStrength, 0.0, 1.0);
        if (a <= 0.004) { discard; }
        return vec4f(palette(clamp(d * 0.85, 0.0, 1.0)) * a, a);
    }

    // Metaballs. Width of the transition is set in field units, so the edge
    // stays equally soft whatever the threshold is.
    let edge = 0.22;
    let a = smoothstep(1.0 - edge, 1.0 + edge, d) * P.fieldStrength;
    if (a <= 0.004) { discard; }

    // Central difference on the *world* field, one cell apart, for a normal.
    let h = (P.cellSize / f32(DSUB)) * 0.75;
    let gx = sampleDensity(world + vec2f(h, 0.0)) - sampleDensity(world - vec2f(h, 0.0));
    let gy = sampleDensity(world + vec2f(0.0, h)) - sampleDensity(world - vec2f(0.0, h));
    let n = normalize(vec3f(-gx / scale, -gy / scale, 0.9));
    let lit = clamp(dot(n, normalize(vec3f(-0.45, -0.6, 0.65))), 0.0, 1.0);

    let base = palette(clamp(d * 0.5, 0.0, 1.0));
    let col = base * (0.35 + 0.85 * lit) + vec3f(pow(lit, 12.0) * 0.4);
    return vec4f(col * a, a);
}

@fragment
fn fsMedium(@builtin(position) frag: vec4f) -> @location(0) vec4f {
    let world = screenToWorld(frag.xy);

    let halfWorld = P.worldSize * 0.5;
    if (world.x < -halfWorld || world.x > halfWorld ||
        world.y < -halfWorld || world.y > halfWorld) {
        discard;
    }

    let m = clamp(sampleMedium(world), 0.0, 1.0);
    let a = m * 0.45;
    // Cool teal, so it reads as "solvent" against the warm end of the species
    // heatmap and never gets mistaken for an agent.
    return vec4f(vec3f(0.10, 0.42, 0.55) * a, a);   // premultiplied
}
`,_t=800,eu=500,Ds=64,tu=.002,nu=4,iu=[5120,15360,25600,51200,102400,204800,409600,819200,1638400],su=[1,2,3,4,5,6,7,8,9,10,12,14,16,20,24,32],ou=[10,20,30,40,60,80,120,160],Us=[["Linear","Even ramp to full strength at contact. The canonical particle-life core."],["Smooth","Quadratic — barely there at the surface, so cluster edges stay soft."],["Hard","Constant inside the radius. A step at the boundary; maximally rigid."],["Stiff","Inverse-distance, capped. Nearly incompressible at contact, ignorable further out."]],Ns=[["Disc","Solid antialiased circle — stays crisp down to sub-pixel sizes."],["Soft","Gaussian falloff. Neighbouring agents merge into continuous mass."],["Ring","Hollow. Shows structure through dense clumps that solid discs hide."],["Square","Crisp and cheap to read at very small sizes."],["Diamond","The square rotated — reads as a distinct mark next to discs."],["Triangle","Directionless but angular; good with Motion Stretch."],["Plus","Thin cross. Sparse-looking even where agents are dense."],["Varied","A different shape per species, so species read as different kinds of thing."]],_s=[["Heatmap","The original blue→cyan→green→yellow→red ramp. High contrast, not perceptually uniform."],["Viridis","Perceptually uniform — equal steps in species look like equal steps in brightness."],["Ember","Black through deep red and orange to white hot."],["Ice","Midnight blue through cyan to white."],["Cyclic","Full hue wheel. The honest choice for continuous species, where 0 and N−1 are neighbours."],["Mono","Greyscale. Lets glow and density carry the image instead of hue."],["Plasma","Indigo through magenta and orange to yellow. Bright throughout."],["Aurora","Deep teal through green to pale pink."],["Sunset","Night violet through coral to gold."],["Forest","Bark and moss through leaf green to sand."],["Neon","Near-black to magenta to cyan to white. Very high contrast."],["Pastel","Low saturation across the wheel — soft, and good on light backgrounds."],["Copper","Near-black through rust and copper to a bright highlight."],["Spectrum","Full rainbow without wrapping, so the ends stay distinguishable."]],un=[["Void",{r:.04,g:.045,b:.06,a:1}],["Black",{r:0,g:0,b:0,a:1}],["Midnight",{r:.02,g:.03,b:.08,a:1}],["Slate",{r:.1,g:.11,b:.13,a:1}],["Warm",{r:.07,g:.05,b:.045,a:1}],["Deep Space",{r:.015,g:.015,b:.035,a:1}],["Navy",{r:.03,g:.06,b:.12,a:1}],["Ink",{r:.05,g:.07,b:.07,a:1}],["Plum",{r:.08,g:.04,b:.1,a:1}],["Moss",{r:.04,g:.07,b:.05,a:1}],["Charcoal",{r:.16,g:.16,b:.17,a:1}],["Paper",{r:.9,g:.89,b:.86,a:1}],["Cream",{r:.96,g:.94,b:.88,a:1}],["Sepia",{r:.85,g:.79,b:.68,a:1}]].map(([e,t])=>({name:e,rgb:t,light:.2126*t.r+.7152*t.g+.0722*t.b>.5})),Vs=[["Off","No field — agents only."],["Density","Shade the smoothed agent density directly. Continuous mass instead of dots."],["Metaball","Threshold the field into a surface, lit by its own gradient. The fluid look."]],Ws=[["Species","Hue by species. Continuous, so agents between basis species blend."],["Blob","Hue by connected-component id, hashed so adjacent blobs differ."],["Velocity","Direction as hue, speed as brightness — the optical-flow reading."],["Neighbours","Coordination number — draws the skin of a body rather than its bulk."]],ru=["Random","Random Symmetric","Ring","Ring Symmetric","Spiral","Spiral Symmetric","Bands","Bands Symmetric"];function hr(){return{dt:.25,mixT:.5,boidVisionRadius:350,speciesInteractionRadius:250,alignmentForce:1,cohesionForce:1,separationForce:1,movementRandomness:.01,brownian:!1,movementScaling:1,forceSofteningMul:3,centerAttraction:0,damping:.98,minSpeed:0,maxSpeed:500,maxForce:1e3,drawRadius:2,collisionModifier:2,coreEnabled:!1,coreRadiusFrac:.02,coreStrength:.2,coreFalloff:1,coreSizeSpread:.05,mediumEnabled:!1,mediumForce:8,mediumDiffuse:.5,mediumDisplace:.25,mediumCapacityMul:2,blobsEnabled:!1,blobInterval:15,blobRounds:24,blobSmoothing:2,blobMinDensity:2,mutateEnabled:!1,mutateRate:.05,mutateBias:0,mutateInterval:30,splitEnabled:!1,splitInterval:90,splitChance:.35,splitMinBlobMul:8,splitImpulse:120,splitMutation:.25,showGrid:!1,showMedium:!0,showAgents:!0,fieldMode:0,fieldSmoothing:2,fieldThresholdMul:2.5,fieldStrength:1,renderMode:0,particleShape:0,speciesPalette:0,background:0,glowStrength:0,glowSize:3,velocityStretch:0,outline:0,drawScale:1,drawJitter:0,trailStrength:0,driftEnabled:!1,driftCols:40,driftSize:26,driftSpeed:.004,driftBrightness:.5,autoRandom:!1,autoRandomSeconds:20,cameraX:0,cameraY:0,zoom:.1}}function mr(){return{startingMethod:4,agentCount:25600,speciesCount:10,worldSizeMult:20,interactionRange:2,startRadiusMul:16,lockMatrix:!1,speciesSpread:0,seed:1}}const lu=[0,.15,.3,.5,1,2],gr=e=>e.speciesInteractionRadius*e.forceSofteningMul,br=e=>e.drawRadius+e.collisionModifier,vr=e=>e.speciesInteractionRadius*e.coreRadiusFrac,yr=(e,t)=>1-t*(1-e),au=[["dt","Speed (dt)",0,.5,.01,"sim"],["movementScaling","Movement Scaling",.1,4,.1,"sim"],["drawRadius","Draw Size",1,5,.1,"sim"],["collisionModifier","Collide Modifier",0,5,.5,"sim"],["damping","Damping",.7,1,.01,"sim"],["minSpeed","Min Speed",0,5,.1,"sim"],["maxSpeed","Max Speed",2,1e3,1,"sim"],["movementRandomness","Randomness",0,.25,.01,"sim"],["centerAttraction","Center Pull",0,.1,.01,"sim"],["boidVisionRadius","Vision Radius",10,500,5,"boids"],["alignmentForce","Alignment",0,2,.1,"boids"],["cohesionForce","Cohesion",0,2,.1,"boids"],["separationForce","Separation",0,3,.1,"boids"],["speciesInteractionRadius","Sense Radius",10,500,5,"plife"],["forceSofteningMul","Force Soften Mult",0,10,.1,"plife"],["maxForce","Max Force",0,2e3,1,"plife"],["coreStrength","Core Repulsion",0,20,.1,"core"],["coreRadiusFrac","Core Radius",0,1,.01,"core"],["coreSizeSpread","Size Spread",0,1,.05,"core"],["mediumForce","Medium Force",0,40,.5,"medium"],["mediumDiffuse","Diffusion",0,1,.05,"medium"],["mediumDisplace","Displacement",0,1,.05,"medium"],["mediumCapacityMul","Displace Threshold",.25,8,.25,"medium"]];function uu(e){let t=e>>>0;return function(){t=t+1831565813|0;let i=Math.imul(t^t>>>15,1|t);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}}function cu(e,t){let n=e>>>0^Math.imul(t>>>0,2654435769);return n^=n>>>16,n=Math.imul(n,2146121005),n^=n>>>15,n=Math.imul(n,2221713035),n^=n>>>16,n>>>0}const bt={positions:1,matrix:2,philicity:3,sizeSeeds:4,randomConfig:5},vt=(e,t)=>uu(cu(e,t));function mi(){return Math.random()*4294967296>>>0}const Ln=Math.PI*2,ii=e=>(t,n)=>t+e()*(n-t);function xr(e,t,n=Math.random){const i=ii(n),s=new Float32Array(e*e);for(let o=0;o<s.length;o++)s[o]=i(-t,t);return s}function wr(e,t,n=Math.random){const i=ii(n),s=new Float32Array(e*e);for(let o=0;o<e;o++)for(let l=o;l<e;l++){const u=i(-t,t);s[o*e+l]=u,s[l*e+o]=u}return s}function Sr(e,t=Math.random){const n=ii(t),i=new Float32Array(e);for(let s=0;s<e;s++)i[s]=n(-1,1);return i}function Pr(e,t=Math.random){const n=new Float32Array(e);for(let i=0;i<e;i++)n[i]=t();return n}function gi(e,t,n,i){const s=_t*e.startRadiusMul*.5;return[i(-s,s),i(-s,s)]}function Gs(e,t){const n=_t*e.startRadiusMul*.25,i=Ln/e.agentCount*t;return[Math.cos(i)*n,Math.sin(i)*n]}function $s(e,t,n,i){const s=_t/e.speciesCount*e.startRadiusMul,o=s*e.speciesCount*.5,l=i(n*s,(n+1)*s)-o,u=i(0,_t)-_t*.5;return[l,u]}function js(e,t){const n=_t*e.startRadiusMul*.5,i=4,s=3,o=.015,l=t()*Ln;return(u,c,h,f)=>{const g=Ln/i*(c%i);let y=c/e.agentCount*n,T=s*(y/n)*Ln+g+l;return T+=f(-o,o),y+=f(-o*n,o*n),[Math.cos(T)*y,Math.sin(T)*y]}}function du(e,t,n){switch(e){case 0:return[gi,!1];case 1:return[gi,!0];case 2:return[Gs,!1];case 3:return[Gs,!0];case 4:return[js(t,n),!1];case 5:return[js(t,n),!0];case 6:return[$s,!1];case 7:return[$s,!0];default:return[gi,!1]}}function fu(e,t={}){const n=e.seed>>>0,i=vt(n,bt.positions),s=ii(i),[o,l]=du(e.startingMethod,e,i),u=new Float32Array(e.agentCount*4),c=new Float32Array(e.agentCount),h=e.speciesSpread??0,f=e.speciesCount-1;for(let I=0;I<e.agentCount;I++){const R=I%e.speciesCount,[v,A]=o(e,I,R,s);u[I*4+0]=v,u[I*4+1]=A,u[I*4+2]=0,u[I*4+3]=0,c[I]=h?Math.min(f,Math.max(0,R+s(-h,h))):R}const g=e.speciesCount,S=e.lockMatrix&&t.matrix&&t.matrix.length===g*g,y=vt(n,bt.matrix),T=S?t.matrix:l?wr(g,e.interactionRange,y):xr(g,e.interactionRange,y),x=I=>S&&I&&I.length===g,E=x(t.philicity)?t.philicity:Sr(g,vt(n,bt.philicity)),j=x(t.sizeSeeds)?t.sizeSeeds:Pr(g,vt(n,bt.sizeSeeds));return{particles:u,species:c,matrix:T,philicity:E,sizeSeeds:j}}const rn=256;function pu(e){const t=e.match(/struct Params \{([\s\S]*?)\n\};/);if(!t)throw new Error("could not find struct Params in compute.wgsl");const n=t[1].match(/^\s*\w+\s*:\s*f32\s*,/gm);if(!n)throw new Error("no f32 fields found in struct Params");return Math.ceil(n.length/4)*4}const Hs=pu(pr),Ks=16,qs=8,En=4,hu=3,dt="rgba16float",mu=4;let gu=pr,bu=Qa;const Ys=new Set;var ge,Cr,Mr,kr,Rr,Tr,Fi,Oi,cn;const Qi=class Qi{constructor(t,n,i,s){ss(this,ge);this.device=t,this.context=n,this.format=i,this.canvas=s,this.cellSize=eu,this.worldSize=0,this.cellsPerRow=0,this.numCells=0,this.maxCollisions=Ds,this.agentCount=0,this.speciesCount=0,this.matrix=null,this.philicity=null,this.sizeSeeds=null,this.coreSizes=null,this.lastSizeSpread=-1,this.currentBuf=0,this.frameIndex=0,this.mediumFlip=0,this.forceRunSimHalf=null,this.paramData=new Float32Array(Hs),this.paramBuffer=t.createBuffer({label:"params",size:Hs*4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.buffers={},this.bindGroups=[],Ue(this,ge,Cr).call(this),Ys.add(this)}static async create(t){if(!navigator.gpu)throw new Error("WebGPU is not available in this browser. Try Chrome/Edge 113+, or Safari 26+.");const n=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!n)throw new Error("No suitable GPU adapter found.");const i=await n.requestDevice(),s=t.getContext("webgpu"),o=navigator.gpu.getPreferredCanvasFormat();s.configure({device:i,format:o,alphaMode:"opaque"});const l=new Qi(i,s,o,t);return l.buildPipelines(),l}buildPipelines(){const t=this.device,n=t.createShaderModule({label:"compute.wgsl",code:gu}),i=t.createShaderModule({label:"render.wgsl",code:bu});this.pendingCompilation=Promise.all([Js(n,"compute.wgsl"),Js(i,"render.wgsl")]);const s=t.createPipelineLayout({bindGroupLayouts:[this.computeBGL]}),o=(y,T)=>t.createComputePipeline({label:T?`${y}:${JSON.stringify(T)}`:y,layout:s,compute:{module:n,entryPoint:y,constants:T}});this.pipelines={countCells:o("countCells"),prefixSum:o("prefixSum"),scatter:o("scatter"),diffuseMedium:o("diffuseMedium"),densitySplat:o("densitySplat"),densityNormalize:o("densityNormalize"),densityBlur10:o("densityBlur",{DENS_1_TO_0:1}),densityBlur01:o("densityBlur",{DENS_1_TO_0:0}),resolveCollide:o("resolveCollide"),blobDensityInit:o("blobDensityInit"),blobBlurAB:o("blobBlur",{BLUR_A_TO_B:1}),blobBlurBA:o("blobBlur",{BLUR_A_TO_B:0}),blobSeed:o("blobSeed"),blobPropagate:o("blobPropagate"),resolveBlobs:o("resolveBlobs"),mutateSpecies:o("mutateSpecies"),blobStatsReset:o("blobStatsReset"),blobStatsAccum:o("blobStatsAccum"),splitBlobs:o("splitBlobs")},this.runSimPipelines={};for(const y of[0,1])for(const[T,x,E]of[["both",1,1],["boids",1,0],["plife",0,1]])this.runSimPipelines[`${y}:${T}`]=o("runSim",{CONTINUOUS_SPECIES:y,WANT_BOIDS:x,WANT_PLIFE:E});const l={color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},u=t.createPipelineLayout({bindGroupLayouts:[this.renderBGL]}),c={color:{srcFactor:"one",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one",operation:"add"}},h={color:{srcFactor:"one",dstFactor:"one",operation:"reverse-subtract"},alpha:{srcFactor:"zero",dstFactor:"one",operation:"add"}},f=[{arrayStride:Ks,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32x2"},{shaderLocation:1,offset:8,format:"float32x2"}]},{arrayStride:4,stepMode:"instance",attributes:[{shaderLocation:2,offset:0,format:"float32"}]},{arrayStride:4,stepMode:"instance",attributes:[{shaderLocation:3,offset:0,format:"uint32"}]},{arrayStride:4,stepMode:"instance",attributes:[{shaderLocation:4,offset:0,format:"uint32"}]}],g=(y,T,x,E=this.format)=>t.createRenderPipeline({label:y,layout:u,vertex:{module:i,entryPoint:"vsParticle",constants:{GLOW_PASS:T?1:0},buffers:f},fragment:{module:i,entryPoint:"fsParticle",constants:{GLOW_PASS:T?1:0},targets:[{format:E,blend:T?x:l}]},primitive:{topology:"triangle-strip"}});this.particlePipeline=g("particles",!1),this.glowPipeline=g("particles:glow",!0,c),this.glowPipelineDark=g("particles:glow-dark",!0,h);const S=(y,T,x=this.format)=>t.createRenderPipeline({label:y,layout:u,vertex:{module:i,entryPoint:"vsFullscreen"},fragment:{module:i,entryPoint:T,targets:[{format:x,blend:l}]},primitive:{topology:"triangle-list"}});this.gridPipeline=S("grid","fsGrid"),this.mediumPipeline=S("medium","fsMedium"),this.fieldPipeline=S("field","fsField"),this.fadePipeline=t.createRenderPipeline({label:"trail-fade",layout:u,vertex:{module:i,entryPoint:"vsFullscreen"},fragment:{module:i,entryPoint:"fsFade",targets:[{format:dt,blend:l}]},primitive:{topology:"triangle-list"}}),this.blitPipeline=t.createRenderPipeline({label:"trail-blit",layout:t.createPipelineLayout({bindGroupLayouts:[this.renderBGL,this.blitBGL]}),vertex:{module:i,entryPoint:"vsFullscreen"},fragment:{module:i,entryPoint:"fsBlit",targets:[{format:this.format}]},primitive:{topology:"triangle-list"}}),this.accumPipelines={particles:g("particles:accum",!1,null,dt),glow:g("glow:accum",!0,c,dt),glowDark:g("glow-dark:accum",!0,h,dt),grid:S("grid:accum","fsGrid",dt),medium:S("medium:accum","fsMedium",dt),field:S("field:accum","fsField",dt),drift:t.createRenderPipeline({label:"drift:accum",layout:u,vertex:{module:i,entryPoint:"vsDrift"},fragment:{module:i,entryPoint:"fsDrift",targets:[{format:dt,blend:l}]},primitive:{topology:"triangle-strip"}})},this.driftPipeline=t.createRenderPipeline({label:"drift",layout:u,vertex:{module:i,entryPoint:"vsDrift"},fragment:{module:i,entryPoint:"fsDrift",targets:[{format:this.format,blend:l}]},primitive:{topology:"triangle-strip"}})}maxSupportedAgents(){const t=Math.min(this.device.limits.maxStorageBufferBindingSize,this.device.limits.maxBufferSize),n=Math.floor(t/4/5),i=this.device.limits.maxComputeWorkgroupsPerDimension*rn;return Math.min(n,i)}restart(t){const n=this.device,i=this.maxSupportedAgents();if(t.agentCount>i)throw new Error(`${t.agentCount.toLocaleString()} agents exceeds this device's limit of ${i.toLocaleString()}.`);const{particles:s,species:o,matrix:l,philicity:u,sizeSeeds:c}=fu(t,{matrix:this.matrix,philicity:this.philicity,sizeSeeds:this.sizeSeeds});this.destroyBuffers(),this.agentCount=t.agentCount,this.speciesCount=t.speciesCount,this.matrix=l,this.philicity=u,this.currentBuf=0,this.mediumFlip=0,this.continuousSpecies=(t.speciesSpread??0)>0,this.worldSize=_t*t.worldSizeMult,this.cellsPerRow=Math.ceil(this.worldSize/this.cellSize),this.numCells=this.cellsPerRow*this.cellsPerRow,this.maxCollisions=Ue(this,ge,Mr).call(this,this.agentCount);const h=(j,I,R,v)=>{const A=n.createBuffer({label:j,size:Math.max(I,4),usage:R});return v&&n.queue.writeBuffer(A,0,v),A},f=GPUBufferUsage.STORAGE,g=GPUBufferUsage.VERTEX,S=GPUBufferUsage.COPY_DST,y=GPUBufferUsage.COPY_SRC;this.buffers={particleA:h("particleA",s.byteLength,f|g|S|y,s),particleB:h("particleB",s.byteLength,f|g|S|y,s),species:h("species",o.byteLength,f|g|S|y,o),matrix:h("matrix",(this.speciesCount+2)*this.speciesCount*4,f|S),grid:h("grid",(this.numCells*(qs+hu)+2*this.numCells*En**2)*4,f|S|y),indices:h("indices",this.agentCount*mu*4,f|g|S|y),collisions:h("collisions",this.agentCount*(1+this.maxCollisions)*4,f|S)};const T=this.buffers;this.uploadMatrix(l,u,c);const x=new Float32Array(this.numCells).fill(1);n.queue.writeBuffer(T.grid,this.numCells*3*4,x),n.queue.writeBuffer(T.grid,this.numCells*4*4,x),this.renderBindGroup=n.createBindGroup({layout:this.renderBGL,entries:[{binding:0,resource:{buffer:this.paramBuffer}},{binding:1,resource:{buffer:T.grid}}]});const E=(j,I)=>n.createBindGroup({layout:this.computeBGL,entries:[{binding:0,resource:{buffer:this.paramBuffer}},{binding:1,resource:{buffer:j}},{binding:2,resource:{buffer:I}},{binding:3,resource:{buffer:T.species}},{binding:4,resource:{buffer:T.matrix}},{binding:5,resource:{buffer:T.grid}},{binding:6,resource:{buffer:T.indices}},{binding:7,resource:{buffer:T.collisions}}]});this.bindGroups=[E(T.particleA,T.particleB),E(T.particleB,T.particleA)],this.particleBuffers=[T.particleA,T.particleB]}uploadMatrix(t,n=this.philicity,i=this.sizeSeeds){this.matrix=t,this.philicity=n,this.sizeSeeds=i,this.coreSizes=new Float32Array(i.length),this.lastSizeSpread=-1;const s=this.device.queue;s.writeBuffer(this.buffers.matrix,0,t),s.writeBuffer(this.buffers.matrix,t.byteLength,n)}destroyBuffers(){var t;for(const n of Object.values(this.buffers))(t=n.destroy)==null||t.call(n);this.buffers={},this.bindGroups=[]}frame(t){if(!this.agentCount)return;const n=this.canvas;Ue(this,ge,kr).call(this,t.coreSizeSpread),Ue(this,ge,Rr).call(this,t,n.width,n.height);const i=this.device,s=i.createCommandEncoder(),o=t.dt>0,l=!!t.mediumEnabled;if(o){if(s.clearBuffer(this.buffers.grid,0,this.numCells*4),s.clearBuffer(this.buffers.collisions,0,this.agentCount*4),t.fieldMode>0){const j=this.numCells*En**2*4;s.clearBuffer(this.buffers.grid,this.numCells*qs*4,j)}const T=Math.ceil(this.agentCount/rn),x=s.beginComputePass();x.setBindGroup(0,this.bindGroups[this.currentBuf]),x.setPipeline(this.pipelines.countCells),x.dispatchWorkgroups(T),x.setPipeline(this.pipelines.prefixSum),x.dispatchWorkgroups(1),x.setPipeline(this.pipelines.scatter),x.dispatchWorkgroups(T),l&&(x.setPipeline(this.pipelines.diffuseMedium),x.dispatchWorkgroups(Math.ceil(this.numCells/rn)));const E=this.forceRunSimHalf??(t.mixT>=1?"plife":t.mixT<=0?"boids":"both");if(x.setPipeline(this.runSimPipelines[`${this.continuousSpecies?1:0}:${E}`]),x.dispatchWorkgroups(T),x.setPipeline(this.pipelines.resolveCollide),x.dispatchWorkgroups(T),t.blobsEnabled){const j=Math.ceil(this.numCells/rn);if(this.frameIndex%Math.max(1,t.blobInterval)===0){x.setPipeline(this.pipelines.blobDensityInit),x.dispatchWorkgroups(j);for(let R=0;R<t.blobSmoothing;R++)x.setPipeline(this.pipelines.blobBlurAB),x.dispatchWorkgroups(j),x.setPipeline(this.pipelines.blobBlurBA),x.dispatchWorkgroups(j);x.setPipeline(this.pipelines.blobSeed),x.dispatchWorkgroups(j),x.setPipeline(this.pipelines.blobPropagate);const I=Math.min(this.cellsPerRow,t.blobRounds);for(let R=0;R<I;R++)x.dispatchWorkgroups(j)}x.setPipeline(this.pipelines.resolveBlobs),x.dispatchWorkgroups(T),t.mutateEnabled&&this.frameIndex%Math.max(1,t.mutateInterval)===0&&(x.setPipeline(this.pipelines.mutateSpecies),x.dispatchWorkgroups(T),this.continuousSpecies=!0),t.splitEnabled&&this.frameIndex%Math.max(1,t.splitInterval)===0&&(x.setPipeline(this.pipelines.blobStatsReset),x.dispatchWorkgroups(j),x.setPipeline(this.pipelines.blobStatsAccum),x.dispatchWorkgroups(T),x.setPipeline(this.pipelines.splitBlobs),x.dispatchWorkgroups(T),t.splitMutation>0&&(this.continuousSpecies=!0))}if(t.fieldMode>0){const j=this.numCells*En**2,I=Math.ceil(j/rn);x.setPipeline(this.pipelines.densitySplat),x.dispatchWorkgroups(T),x.setPipeline(this.pipelines.densityNormalize),x.dispatchWorkgroups(I);for(let R=0;R<t.fieldSmoothing;R++)x.setPipeline(this.pipelines.densityBlur10),x.dispatchWorkgroups(I),x.setPipeline(this.pipelines.densityBlur01),x.dispatchWorkgroups(I)}x.end(),this.currentBuf=1-this.currentBuf}const u=un[t.background]??un[0],c=this.context.getCurrentTexture().createView(),h=t.trailStrength>0;h?Ue(this,ge,Tr).call(this):Ue(this,ge,Oi).call(this);const f=h?this.accumView:c,g=h&&this.accumNeedsClear,S=h?this.accumPipelines:this,y=s.beginRenderPass({colorAttachments:[{view:f,clearValue:u.rgb,loadOp:h&&!g?"load":"clear",storeOp:"store"}]});if(y.setBindGroup(0,this.renderBindGroup),h&&!g&&(y.setPipeline(this.fadePipeline),y.draw(3)),this.accumNeedsClear=!1,t.driftEnabled){const T=Math.max(1,Math.round(t.driftCols));y.setPipeline(h?S.drift:this.driftPipeline),y.draw(4,T*T)}if(t.showMedium&&l&&(y.setPipeline(h?S.medium:this.mediumPipeline),y.draw(3)),t.fieldMode>0&&(y.setPipeline(h?S.field:this.fieldPipeline),y.draw(3)),t.showGrid&&(y.setPipeline(h?S.grid:this.gridPipeline),y.draw(3)),!t.showAgents){y.end(),h&&Ue(this,ge,Fi).call(this,s,c,u),i.queue.submit([s.finish()]),this.frameIndex++,o&&l&&(this.mediumFlip=1-this.mediumFlip);return}if(y.setVertexBuffer(0,this.particleBuffers[this.currentBuf]),y.setVertexBuffer(1,this.buffers.species),y.setVertexBuffer(2,this.buffers.indices,this.agentCount*2*4),y.setVertexBuffer(3,this.buffers.indices,this.agentCount*3*4),t.glowStrength>0){const T=u.light;y.setPipeline(h?T?S.glowDark:S.glow:T?this.glowPipelineDark:this.glowPipeline),y.draw(4,this.agentCount)}y.setPipeline(h?S.particles:this.particlePipeline),y.draw(4,this.agentCount),y.end(),h&&Ue(this,ge,Fi).call(this,s,c,u),i.queue.submit([s.finish()]),this.frameIndex++,o&&l&&(this.mediumFlip=1-this.mediumFlip)}fitZoom(t=0){if(!this.worldSize)return .1;const n=Math.max(1,this.canvas.width-t);return Math.min(n,this.canvas.height)*.92/this.worldSize}get avgPerCell(){return this.numCells?this.agentCount/this.numCells:0}async readSpecies(t=8){return Ue(this,ge,cn).call(this,this.buffers.species,Math.min(t,this.agentCount)*4)}async readAgentBlobs(t=this.agentCount){const n=Math.min(t,this.agentCount),i=await Ue(this,ge,cn).call(this,this.buffers.indices,n*4,this.agentCount*2*4);return new Uint32Array(i.buffer)}async readCellBlobs(){const t=this.numCells,n=await Ue(this,ge,cn).call(this,this.buffers.grid,t*4,0),i=await Ue(this,ge,cn).call(this,this.buffers.grid,t*4,5*t*4);return{counts:new Uint32Array(n.buffer),labels:new Uint32Array(i.buffer)}}async readParticles(t=8){const i=Math.min(t,this.agentCount)*Ks,s=this.device.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),o=this.device.createCommandEncoder();o.copyBufferToBuffer(this.particleBuffers[this.currentBuf],0,s,0,i),this.device.queue.submit([o.finish()]),await s.mapAsync(GPUMapMode.READ);const l=new Float32Array(s.getMappedRange().slice(0));return s.unmap(),s.destroy(),l}destroy(){var t,n,i,s;Ys.delete(this),Ue(this,ge,Oi).call(this),this.destroyBuffers(),(n=(t=this.paramBuffer).destroy)==null||n.call(t),(s=(i=this.device).destroy)==null||s.call(i)}};ge=new WeakSet,Cr=function(){const t=this.device,n=i=>({buffer:{type:i}});this.computeBGL=t.createBindGroupLayout({label:"compute",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,...n("read-only-storage")},{binding:2,visibility:GPUShaderStage.COMPUTE,...n("storage")},{binding:3,visibility:GPUShaderStage.COMPUTE,...n("storage")},{binding:4,visibility:GPUShaderStage.COMPUTE,...n("read-only-storage")},{binding:5,visibility:GPUShaderStage.COMPUTE,...n("storage")},{binding:6,visibility:GPUShaderStage.COMPUTE,...n("storage")},{binding:7,visibility:GPUShaderStage.COMPUTE,...n("storage")}]}),this.blitBGL=t.createBindGroupLayout({label:"blit",entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"unfilterable-float"}}]}),this.renderBGL=t.createBindGroupLayout({label:"render",entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}}]})},Mr=function(t){const n=Math.min(this.device.limits.maxStorageBufferBindingSize,this.device.limits.maxBufferSize),i=Math.floor(n/4/t)-1,s=i>0?2**Math.floor(Math.log2(i)):0;return Math.max(4,Math.min(Ds,s))},kr=function(t){if(t===this.lastSizeSpread)return;this.lastSizeSpread=t;const n=this.coreSizes;for(let i=0;i<n.length;i++)n[i]=yr(this.sizeSeeds[i],t);this.device.queue.writeBuffer(this.buffers.matrix,(this.speciesCount+1)*this.speciesCount*4,n)},Rr=function(t,n,i){const s=this.paramData;s[0]=t.dt,s[1]=t.mixT,s[2]=this.agentCount,s[3]=this.speciesCount,s[4]=t.boidVisionRadius,s[5]=t.speciesInteractionRadius,s[6]=t.alignmentForce,s[7]=t.cohesionForce,s[8]=t.separationForce,s[9]=t.movementRandomness,s[10]=t.movementScaling,s[11]=gr(t),s[12]=t.centerAttraction,s[13]=t.damping,s[14]=t.minSpeed,s[15]=t.maxSpeed,s[16]=t.maxForce,s[17]=br(t),s[18]=this.maxCollisions,s[19]=this.cellSize,s[20]=this.cellsPerRow,s[21]=this.numCells,s[22]=t.drawRadius,s[23]=this.worldSize,s[24]=t.cameraX,s[25]=t.cameraY,s[26]=t.zoom,s[27]=n,s[28]=i,s[29]=this.frameIndex,s[30]=t.mediumEnabled?t.mediumForce:0,s[31]=t.mediumDiffuse,s[32]=t.mediumDisplace,s[33]=Math.max(1,t.mediumCapacityMul*this.avgPerCell),s[34]=this.mediumFlip,s[35]=t.showMedium&&t.mediumEnabled?1:0;const o=t.coreEnabled&&t.coreStrength>0;s[36]=o?vr(t):0,s[37]=t.coreStrength,s[38]=t.coreFalloff,s[39]=t.renderMode===1&&!t.blobsEnabled?0:t.renderMode,s[40]=Math.max(1,Math.round(t.blobMinDensity*this.avgPerCell)),s[41]=t.mutateRate,s[42]=t.mutateBias,s[43]=t.mutateInterval,s[44]=Math.max(1,Math.round(t.driftCols)),s[45]=t.driftSize,s[46]=t.driftSpeed,s[47]=t.driftBrightness,s[48]=t.particleShape,s[49]=t.speciesPalette,s[50]=t.glowStrength,s[51]=t.glowSize,s[52]=t.velocityStretch,s[53]=t.drawScale,s[54]=t.drawJitter,s[55]=1-Math.min(.995,Math.max(0,t.trailStrength));const l=un[t.background]??un[0];s[56]=l.rgb.r,s[57]=l.rgb.g,s[58]=l.rgb.b,s[59]=t.fieldMode,s[60]=Math.max(1e-4,t.fieldThresholdMul*this.avgPerCell/En**2),s[61]=t.fieldStrength,s[62]=t.splitInterval,s[63]=t.splitChance,s[64]=Math.max(2,Math.round(t.splitMinBlobMul*this.avgPerCell)),s[65]=t.splitImpulse,s[66]=t.splitMutation,s[67]=Math.max(1,this.avgPerCell*9),s[68]=t.outline,s[69]=t.brownian?1:0,this.device.queue.writeBuffer(this.paramBuffer,0,s)},Tr=function(){var i,s;const{width:t,height:n}=this.canvas;this.accum&&this.accumW===t&&this.accumH===n||((s=(i=this.accum)==null?void 0:i.destroy)==null||s.call(i),this.accum=this.device.createTexture({label:"trail-accum",size:{width:t,height:n},format:dt,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),this.accumW=t,this.accumH=n,this.accumView=this.accum.createView(),this.blitBindGroup=this.device.createBindGroup({layout:this.blitBGL,entries:[{binding:0,resource:this.accumView}]}),this.accumNeedsClear=!0)},Fi=function(t,n,i){const s=t.beginRenderPass({colorAttachments:[{view:n,clearValue:i.rgb,loadOp:"clear",storeOp:"store"}]});s.setPipeline(this.blitPipeline),s.setBindGroup(0,this.renderBindGroup),s.setBindGroup(1,this.blitBindGroup),s.draw(3),s.end()},Oi=function(){var t,n;this.accum&&((n=(t=this.accum).destroy)==null||n.call(t),this.accum=null,this.accumView=null,this.blitBindGroup=null)},cn=async function(t,n,i=0){const s=this.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),o=this.device.createCommandEncoder();o.copyBufferToBuffer(t,i,s,0,n),this.device.queue.submit([o.finish()]),await s.mapAsync(GPUMapMode.READ);const l=new Float32Array(s.getMappedRange().slice(0));return s.unmap(),s.destroy(),l};let Ei=Qi;async function Js(e,t){const n=await e.getCompilationInfo();for(const i of n.messages){const s=`${t}:${i.lineNum}:${i.linePos}`;i.type==="error"?console.error(`[WGSL] ${s} ${i.message}`):i.type==="warning"&&console.warn(`[WGSL] ${s} ${i.message}`)}}const Qt=(e,t)=>{const n=e.__vccOpts||e;for(const[i,s]of t)n[i]=s;return n},vu={__name:"SimCanvas",props:{params:{type:Object,required:!0}},emits:["ready","error","fps","zoom","pan"],setup(e,{emit:t}){const n=e,i=t,s=he(null);let o=null,l=0,u=null,c=0,h=performance.now();function f(){const v=s.value;if(!v)return;const A=Math.min(window.devicePixelRatio||1,2),U=Math.max(1,Math.floor(v.clientWidth*A)),_=Math.max(1,Math.floor(v.clientHeight*A));(v.width!==U||v.height!==_)&&(v.width=U,v.height=_)}function g(){l=requestAnimationFrame(g),f(),o.frame(n.params),c++;const v=performance.now();v-h>=500&&(i("fps",Math.round(c*1e3/(v-h))),c=0,h=v)}let S=!1,y=0,T=0;function x(v){v.preventDefault();const A=s.value,U=A.getBoundingClientRect(),_=Math.min(window.devicePixelRatio||1,2),q=(v.clientX-U.left)*_-A.width*.5,ne=(v.clientY-U.top)*_-A.height*.5;i("zoom",v.deltaY<0?1.08:1/1.08,q,ne)}function E(v){S=!0,y=v.clientX,T=v.clientY,s.value.setPointerCapture(v.pointerId)}function j(v){if(!S)return;const A=Math.min(window.devicePixelRatio||1,2);i("pan",(v.clientX-y)*A,(v.clientY-T)*A),y=v.clientX,T=v.clientY}function I(v){var A,U;S=!1,(U=(A=s.value)==null?void 0:A.releasePointerCapture)==null||U.call(A,v.pointerId)}let R=!1;return Qn(async()=>{var v,A;f();try{o=await Ei.create(s.value)}catch(U){i("error",U.message??String(U));return}if(R){o.destroy(),o=null;return}(A=(v=o.device).addEventListener)==null||A.call(v,"uncapturederror",U=>{var _;console.error("[WebGPU]",((_=U.error)==null?void 0:_.message)??U.error)}),i("ready",o),l=requestAnimationFrame(g),u=new ResizeObserver(f),u.observe(s.value)}),wn(()=>{R=!0,cancelAnimationFrame(l),u==null||u.disconnect(),o==null||o.destroy()}),(v,A)=>(O(),D("canvas",{ref_key:"canvas",ref:s,class:"sim",onWheel:x,onPointerdown:E,onPointermove:j,onPointerup:I,onPointercancel:I,onContextmenu:A[0]||(A[0]=Ji(()=>{},["prevent"]))},null,544))}},yu=Qt(vu,[["__scopeId","data-v-78e2e7d6"]]),xu=["title","onPointerdown","onWheel"],wu={class:"strip-label"},Su=["title","onPointerdown","onPointermove","onPointerup","onPointercancel","onWheel"],Pu={key:0,class:"edit-hint"},Cu={key:0,class:"live"},Mu={key:1},ku=3,Ru=1,Tu={__name:"InteractionMatrix",props:{matrix:{type:Object,default:null},philicity:{type:Object,default:null},coreSizes:{type:Object,default:null},speciesCount:{type:Number,required:!0},editable:{type:Boolean,default:!1}},emits:["edit"],setup(e,{emit:t}){const n=e,i=t,s=R=>R==="philicity"?Ru:ku,o=(R,v)=>Math.min(v,Math.max(-v,R)),l=he(null);let u=null;function c(R,v,A,U,_){n.editable&&(R.preventDefault(),u={kind:v,i:A,j:U,startY:R.clientY,start:_,moved:!1},l.value={kind:v,i:A,j:U,value:_},R.currentTarget.setPointerCapture(R.pointerId))}function h(R){if(!u)return;const v=u.startY-R.clientY;Math.abs(v)>2&&(u.moved=!0);const A=s(u.kind);S(u.kind,u.i,u.j,o(u.start+v*A/120,A))}function f(R){var v,A;u&&(u.moved||S(u.kind,u.i,u.j,0),(A=(v=R.currentTarget)==null?void 0:v.releasePointerCapture)==null||A.call(v,R.pointerId),u=null,l.value=null)}function g(R,v,A,U,_){if(!n.editable||!v)return;R.preventDefault();const q=s(v),ne=R.shiftKey?.01:.1;S(v,A,U,o(_-Math.sign(R.deltaY)*ne,q))}function S(R,v,A,U){const _=Math.round(U*100)/100;l.value&&(l.value={kind:R,i:v,j:A,value:_}),i("edit",{kind:R,i:v,j:A,value:_})}function y(R){const v=Math.min(1,Math.max(0,R)),A=(_,q,ne)=>_.map((me,Oe)=>me+(q[Oe]-me)*ne);let U;return v<.25?U=A([0,0,1],[0,1,1],v/.25):v<.5?U=A([0,1,1],[0,1,0],(v-.25)/.25):v<.75?U=A([0,1,0],[1,1,0],(v-.5)/.25):U=A([1,1,0],[1,0,0],(v-.75)/.25),U.map(_=>Math.round(_*255))}const T=R=>{const[v,A,U]=y(R/Math.max(n.speciesCount-1,1));return`rgb(${v} ${A} ${U})`},x=qe(()=>n.speciesCount<=11),E=qe(()=>{const R=n.speciesCount;if(!n.matrix||n.matrix.length<R*R)return[];const v=Math.max(...Array.from(n.matrix,Math.abs),1e-4),A=[];for(let U=0;U<R;U++){const _=[];for(let q=0;q<R;q++){const ne=n.matrix[U*R+q],me=Math.abs(ne)/v,Oe=ne>=0?"130 60%":"355 70%";_.push({v:ne,bg:`hsl(${Oe} ${18+me*32}%)`,text:ne.toFixed(1)})}A.push(_)}return A});function j(R,v,A){const U=n.speciesCount;if(!R||R.length<U)return null;const _=[];for(let q=0;q<U;q++){const ne=R[q],me=Math.min(1,Math.abs(ne));_.push({v:ne,bg:`hsl(${v(ne)} ${16+me*34}%)`,text:ne.toFixed(1),title:`species ${q+1}: ${ne.toFixed(2)} — ${A(ne)}`})}return _}const I=qe(()=>[{label:"Philicity",kind:"philicity",cells:j(n.philicity,R=>R>=0?"190 55%":"32 65%",R=>R>=0?"philic":"phobic")},{label:"Core size",kind:null,cells:j(n.coreSizes,()=>"272 50%",R=>R<.05?"no excluded volume":"excluded volume")}].filter(R=>R.cells));return(R,v)=>(O(),D(X,null,[r("div",{class:Me(["matrix",{compact:!x.value}]),style:ht({"--n":e.speciesCount})},[(O(!0),D(X,null,be(E.value,(A,U)=>(O(),D(X,{key:U},[r("div",{class:"tag",style:ht({background:T(U)})},null,4),(O(!0),D(X,null,be(A,(_,q)=>(O(),D("div",{key:q,class:Me(["cell",{editable:e.editable}]),style:ht({background:_.bg}),title:`${U+1} → ${q+1}: ${_.text}`,onPointerdown:ne=>c(ne,"matrix",U,q,_.v),onPointermove:h,onPointerup:f,onPointercancel:f,onWheel:ne=>g(ne,"matrix",U,q,_.v)},[x.value?(O(),D(X,{key:0},[W(k(_.text),1)],64)):ve("",!0)],46,xu))),128))],64))),128))],6),(O(!0),D(X,null,be(I.value,A=>(O(),D(X,{key:A.label},[r("div",wu,k(A.label),1),r("div",{class:Me(["matrix",{compact:!x.value}]),style:ht({"--n":e.speciesCount})},[v[0]||(v[0]=r("div",{class:"tag"},null,-1)),(O(!0),D(X,null,be(A.cells,(U,_)=>(O(),D("div",{key:_,class:Me(["cell",{editable:e.editable&&A.kind}]),style:ht({background:U.bg}),title:U.title,onPointerdown:q=>A.kind&&c(q,A.kind,_,0,U.v),onPointermove:q=>A.kind&&h(q),onPointerup:q=>A.kind&&f(q),onPointercancel:q=>A.kind&&f(q),onWheel:q=>g(q,A.kind,_,0,U.v)},[x.value?(O(),D(X,{key:0},[W(k(U.text),1)],64)):ve("",!0)],46,Su))),128))],6)],64))),128)),e.editable?(O(),D("div",Pu,[l.value?(O(),D("span",Cu,[W(k(l.value.kind==="philicity"?`species ${l.value.i+1}`:`${l.value.i+1} → ${l.value.j+1}`)+" ",1),r("b",null,k(l.value.value.toFixed(2)),1)])):(O(),D("span",Mu,"Drag a cell up/down to change it · scroll to nudge · click to zero"))])):ve("",!0)],64))}},Au=Qt(Tu,[["__scopeId","data-v-5c1268e9"]]),Bu=1,Xi="plb.presets",Ar=(e,t=4)=>Number(e.toFixed(t)),bi=(e,t=3)=>e?Array.from(e,n=>Ar(n,t)):null;function Eu({params:e,startup:t,matrix:n,philicity:i,sizeSeeds:s,name:o}){const l={version:Bu,name:o||void 0,params:{},startup:{...t}};for(const[u,c]of Object.entries(e))l.params[u]=typeof c=="number"?Ar(c):c;return n&&(l.matrix=bi(n)),i&&(l.philicity=bi(i)),s&&(l.sizeSeeds=bi(s)),l}function Fu(e,{params:t,startup:n}){if(!e||typeof e!="object")throw new Error("Config must be an object.");const i=(u,c,h)=>{let f=!1;if(!c||typeof c!="object")return f;for(const g of Object.keys(h)){if(!(g in c))continue;const S=c[g],y=typeof h[g]=="number";y&&(typeof S!="number"||!Number.isFinite(S))||!y&&typeof S!=typeof h[g]||(u[g]!==S&&(f=!0),u[g]=S)}return f};i(t,e.params,hr());const s=i(n,e.startup,mr()),o=n.speciesCount,l=(u,c)=>Array.isArray(u)&&u.length===c?Float32Array.from(u):null;return{needsRestart:s,matrix:l(e.matrix,o*o),philicity:l(e.philicity,o),sizeSeeds:l(e.sizeSeeds,o)}}let si=Math.random;const le=(e,t)=>e+si()*(t-e),zt=e=>e[Math.floor(si()*e.length)],Te=e=>si()<e,xe=(e,t)=>Math.round(e/t)*t,Ou={sim:{mixT:[0,1,.05],dt:[.15,.35,.01],movementScaling:[.6,2,.1],damping:[.92,1,.01],minSpeed:[0,2,.1],maxSpeed:[200,800,1],movementRandomness:[0,.06,.01],centerAttraction:[0,.03,.01],collisionModifier:[0,3,.5]},boids:{boidVisionRadius:[150,450,5],alignmentForce:[0,2,.1],cohesionForce:[0,2,.1],separationForce:[0,3,.1]},plife:{speciesInteractionRadius:[120,400,5],forceSofteningMul:[1,6,.1],maxForce:[500,1500,1]}},Xs=[["startup","Startup"],["matrix","Interaction Matrix"],["sim","Simulation"],["boids","Boids"],["plife","Particle Life"],["core","Excluded Volume"],["medium","Medium"],["blobs","Blobs"],["view","View"]];function Iu(e={},t=Math.random){si=t;const n={},i=o=>!e[o];for(const[o,l]of Object.entries(Ou))if(i(o))for(const[u,[c,h,f]]of Object.entries(l))n[u]=xe(le(c,h),f);i("core")&&(n.coreEnabled=Te(.75),n.coreStrength=Te(.8)?xe(le(.1,1.2),.1):xe(le(1.5,5),.1),n.coreRadiusFrac=xe(le(.02,.25),.01),n.coreSizeSpread=Te(.5)?0:xe(le(.1,1),.05),n.coreFalloff=Math.floor(le(0,4))),i("medium")&&(n.mediumEnabled=Te(.4),n.mediumForce=xe(le(3,20),.5),n.mediumDiffuse=xe(le(.2,.8),.05),n.mediumDisplace=xe(le(.1,.5),.05),n.mediumCapacityMul=xe(le(1,4),.25)),i("blobs")&&(n.blobsEnabled=Te(.3),n.blobMinDensity=xe(le(1,4),.1),n.blobSmoothing=Math.floor(le(0,5)),n.mutateEnabled=n.blobsEnabled&&Te(.5),n.mutateRate=xe(le(.02,.2),.01)),i("view")&&(n.renderMode=Te(.7)?0:zt([1,2,3]),n.particleShape=Math.floor(le(0,8)),n.speciesPalette=Math.floor(le(0,14)),n.background=Te(.85)?Math.floor(le(0,11)):Math.floor(le(11,14)),n.glowStrength=Te(.5)?0:xe(le(.1,.8),.02),n.glowSize=xe(le(2,8),.5),n.velocityStretch=Te(.6)?0:xe(le(1,30),.25),n.drawScale=xe(le(.6,3),.1),n.drawJitter=Te(.5)?0:xe(le(.1,.8),.05),n.outline=Te(.6)?0:xe(le(.2,.8),.05),n.trailStrength=Te(.7)?0:xe(le(.5,.95),.01),n.fieldMode=Te(.8)?0:zt([1,2]),n.fieldSmoothing=Math.floor(le(1,5)),n.fieldThresholdMul=xe(le(1,5),.1),n.fieldStrength=xe(le(.6,1),.05),n.showAgents=n.fieldMode===2?Te(.5):!0,n.driftEnabled=Te(.1),n.driftBrightness=xe(le(.2,.7),.05),n.renderMode===1&&(i("blobs")?n.blobsEnabled=!0:n.renderMode=0));const s=i("startup")?{startingMethod:Math.floor(le(0,8)),speciesCount:zt([3,4,5,6,7,8,9,10,12,16]),interactionRange:zt([1,2,3]),speciesSpread:Te(.7)?0:zt([.15,.3,.5,1])}:{};return{params:n,startup:s,needsRestart:i("startup"),rerollMatrix:i("matrix")}}const zu=["amber","brisk","coral","dusky","eager","faint","glassy","hazy","ionic","jagged","keen","lucid","molten","noble","opal","placid","quiet","restless","silken","tidal","umbral","vivid","woven","zephyr"],Lu=["bloom","cascade","drift","ember","filament","gyre","halo","isthmus","lattice","mantle","nimbus","orbit","plume","quanta","ripple","stratum","tendril","vortex","wisp"];function Zs(e=[]){const t=new Set(e);for(let n=0;n<50;n++){const i=`${zt(zu)}-${zt(Lu)}`;if(!t.has(i))return i}return`preset-${Date.now().toString(36)}`}function Zi(){try{const e=JSON.parse(localStorage.getItem(Xi)||"{}");return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}function Du(e,t){const n=Zi();return n[e]={...t,name:e},localStorage.setItem(Xi,JSON.stringify(n)),n}function Uu(e){const t=Zi();return delete t[e],localStorage.setItem(Xi,JSON.stringify(t)),t}const Nu={class:"header-actions"},_u=["disabled"],Vu=["disabled"],Wu=["title"],Gu=["title"],$u={class:"scroll"},ju={class:"mix-label"},Hu={class:"actions"},Ku={class:"ico"},qu=["title"],Yu={class:"preset-row"},Ju=["value"],Xu=["disabled"],Zu={class:"preset-row"},Qu=["disabled"],ec={class:"check"},tc={key:0,class:"slider"},nc={class:"val"},ic={key:1,class:"notice"},sc=["title"],oc={class:"grid2"},rc=["value"],lc=["value"],ac=["value"],uc=["value"],cc=["value"],dc=["value"],fc={class:"preset-row seed-row"},pc={class:"seed-label"},hc=["value"],mc=["title"],gc={key:0,class:"hint"},bc={key:1,class:"notice"},vc={key:0},yc=["title"],xc={class:"matrix-actions"},wc={class:"check"},Sc=["title"],Pc={class:"name"},Cc={class:"val"},Mc=["onUpdate:modelValue","min","max","step"],kc={class:"check"},Rc={class:"derived"},Tc=["title"],Ac={class:"name"},Bc={class:"val"},Ec=["onUpdate:modelValue","min","max","step"],Fc=["title"],Oc={class:"name"},Ic={class:"val"},zc=["onUpdate:modelValue","min","max","step"],Lc={class:"derived"},Dc=["title"],Uc={class:"check"},Nc=["checked"],_c={class:"name"},Vc={class:"val"},Wc=["onUpdate:modelValue","min","max","step"],Gc={class:"falloff"},$c=["value"],jc={class:"derived"},Hc={class:"hint"},Kc=["title"],qc={class:"check"},Yc=["checked"],Jc={class:"name"},Xc={class:"val"},Zc=["onUpdate:modelValue","min","max","step"],Qc={class:"derived"},ed={class:"check",style:{"margin-top":"8px"}},td=["title"],nd={class:"check"},id=["checked"],sd={class:"slider"},od={class:"val"},rd={class:"slider"},ld={class:"val"},ad={class:"slider"},ud={class:"val"},cd={class:"slider"},dd={class:"val"},fd={class:"check",style:{"margin-top":"10px"}},pd=["checked"],hd={class:"slider"},md={class:"val"},gd={class:"slider"},bd={class:"val"},vd={class:"slider"},yd={class:"val"},xd={class:"check",style:{"margin-top":"8px"}},wd={class:"slider"},Sd={class:"val"},Pd={class:"slider"},Cd={class:"val"},Md={class:"slider"},kd={class:"val"},Rd={class:"slider"},Td={class:"val"},Ad={class:"slider"},Bd={class:"val"},Ed=["title"],Fd={class:"falloff"},Od=["value"],Id={class:"hint"},zd={class:"falloff"},Ld=["value"],Dd={class:"hint"},Ud={class:"slider"},Nd={class:"val"},_d={class:"slider"},Vd={class:"val"},Wd={class:"slider"},Gd={class:"val"},$d={class:"check"},jd={class:"falloff"},Hd=["value"],Kd={class:"hint"},qd={class:"falloff"},Yd=["value"],Jd={class:"falloff"},Xd=["value"],Zd={class:"hint"},Qd={class:"slider"},ef={class:"val"},tf={class:"slider"},nf={class:"val"},sf={class:"derived"},of={class:"slider"},rf={class:"val"},lf={key:1,class:"slider"},af={class:"val"},uf={class:"slider"},cf={class:"val"},df={class:"slider"},ff={class:"val"},pf={class:"slider"},hf={class:"val"},mf={class:"check",style:{"margin-top":"8px"}},gf=["checked"],bf={class:"slider"},vf={class:"val"},yf={class:"slider"},xf={class:"val"},wf={class:"slider"},Sf={class:"val"},Pf={class:"slider"},Cf={class:"val"},Mf={class:"check"},Qs="plb.uiScale",kf=.8,Rf=1.8,eo="plb.theme",to="plb.locks",Tf={__name:"ControlPanel",props:{params:{type:Object,required:!0},startup:{type:Object,required:!0},matrix:{type:Object,default:null},philicity:{type:Object,default:null},coreSizes:{type:Object,default:null},speciesCount:{type:Number,required:!0},avgPerCell:{type:Number,default:0},notice:{type:String,default:""},paused:{type:Boolean,default:!1},appliedName:{type:String,default:""}},emits:["restart","toggle-pause","randomize-matrix","randomize-all","locks","edit-matrix","clear-matrix","reroll-seed","reset-camera","show-about","show-config","apply-config","capture-config","hide"],setup(e,{emit:t}){const n=e,i=t,s=G=>au.filter(a=>a[5]===G),o=he(l(parseFloat(localStorage.getItem(Qs))||1));function l(G){return Math.min(Rf,Math.max(kf,Math.round(G*10)/10))}function u(G){o.value=l(o.value+G),localStorage.setItem(Qs,String(o.value))}let c=null;function h(){if(clearInterval(c),c=null,!n.params.autoRandom)return;const G=Math.max(1,n.params.autoRandomSeconds)*1e3;c=setInterval(()=>i("randomize-all",E.value),G)}Ut(()=>[n.params.autoRandom,n.params.autoRandomSeconds],h,{immediate:!0}),wn(()=>clearInterval(c));const f=he(!1),g=()=>{f.value=!!document.fullscreenElement};function S(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{})}Qn(()=>document.addEventListener("fullscreenchange",g)),wn(()=>document.removeEventListener("fullscreenchange",g));const y=he(localStorage.getItem(eo)==="light"?"light":"dark");function T(){document.documentElement.dataset.theme=y.value}T();function x(){y.value=y.value==="light"?"dark":"light",localStorage.setItem(eo,y.value),T()}const E=he(j());function j(){try{const G=JSON.parse(localStorage.getItem(to)||"{}"),a={};for(const[p]of Xs)a[p]=G[p]===!0;return a.seed=G.seed===!0,a}catch{const G={};for(const[a]of Xs)G[a]=!1;return G.seed=!1,G}}function I(G){E.value={...E.value,[G]:!E.value[G]},localStorage.setItem(to,JSON.stringify(E.value))}const R=qe(()=>Object.values(E.value).filter(Boolean).length);Ut(E,G=>i("locks",G),{immediate:!0});const v=he(Zi()),A=qe(()=>Object.keys(v.value).sort()),U=he(""),_=he(Zs(Object.keys(v.value))),q=he("");function ne(G){q.value=G,setTimeout(()=>{q.value===G&&(q.value="")},2600)}function me(){const G=U.value;G&&(_.value=G,i("apply-config",v.value[G]),ne(`Applied "${G}".`))}function Oe(){const G=_.value.trim();if(!G)return;const a=G in v.value;i("capture-config",p=>{v.value=Du(G,p),U.value=G,ne(a?`Overwrote "${G}".`:`Saved "${G}".`)},G)}function Ct(){const G=U.value;G&&(v.value=Uu(G),U.value="",_.value=Zs(Object.keys(v.value)),ne(`Deleted "${G}".`))}Ut(()=>n.appliedName,G=>{G&&G!==_.value&&(_.value=G)});const ut=qe(()=>Math.round(n.params.mixT*100)),Mt=[2,4,6,8,10,12,14,16,18,24,32,40,60,80,120,160],Ke=qe(()=>Math.round(n.avgPerCell*9)),we=qe(()=>{const G=Ke.value;return G>2500?"heavy":G>900?"warn":"ok"}),ce=qe(()=>Math.max(1,Math.round(n.params.mediumCapacityMul*n.avgPerCell)));function te(G,a){const p=a>=1?0:a>=.1?1:2;return G.toFixed(p)}return(G,a)=>(O(),D("aside",{class:"panel",style:ht({"--ui-scale":o.value})},[r("header",null,[a[79]||(a[79]=r("strong",null,"Particle Life + Boids",-1)),r("div",Nu,[r("button",{class:"icon",title:"Smaller panel and text",disabled:o.value<=.8,onClick:a[0]||(a[0]=p=>u(-.1))}," − ",8,_u),r("button",{class:"icon",title:"Larger panel and text",disabled:o.value>=1.8,onClick:a[1]||(a[1]=p=>u(.1))}," ＋ ",8,Vu),r("button",{class:"icon",title:f.value?"Leave fullscreen (F)":"Fullscreen (F)",onClick:S},k(f.value?"⤡":"⛶"),9,Wu),r("button",{class:"icon",title:y.value==="light"?"Switch to dark controls":"Switch to light controls",onClick:x},k(y.value==="light"?"☾":"☀"),9,Gu),r("button",{class:"icon",title:"About & credits",onClick:a[2]||(a[2]=p=>i("show-about"))}," ⓘ "),r("button",{class:"icon",title:"Hide panel (H)",onClick:a[3]||(a[3]=p=>i("hide"))},"✕")])]),r("div",$u,[r("section",null,[r("div",ju,[r("span",null,k(100-ut.value)+"% Boids",1),r("span",null,k(ut.value)+"% Particle Life",1)]),$(r("input",{"onUpdate:modelValue":a[4]||(a[4]=p=>e.params.mixT=p),type:"range",min:"0",max:"1",step:"0.05"},null,512),[[ee,e.params.mixT,void 0,{number:!0}]])]),r("section",Hu,[r("button",{class:"primary",onClick:a[5]||(a[5]=p=>i("toggle-pause"))},[r("span",Ku,k(e.paused?"▶":"❙❙"),1),W(k(e.paused?"Resume":"Pause"),1)]),r("button",{title:"Start a fresh run (R)",onClick:a[6]||(a[6]=p=>i("restart",E.value))},[...a[80]||(a[80]=[r("span",{class:"ico"},"↻",-1),W("Restart ",-1)])]),r("button",{title:"Recentre the camera (C)",onClick:a[7]||(a[7]=p=>i("reset-camera"))},[...a[81]||(a[81]=[r("span",{class:"ico"},"⌖",-1),W("Reset Cam ",-1)])]),r("button",{title:R.value?`Randomise (Space) — ${R.value} section(s) locked`:"Randomise everything (Space)",onClick:a[8]||(a[8]=p=>i("randomize-all",E.value))},[a[82]||(a[82]=r("span",{class:"ico"},"⚄",-1)),W("Random"+k(R.value?` ${R.value}🔒`:""),1)],8,qu),r("button",{title:"View or paste the whole configuration",onClick:a[9]||(a[9]=p=>i("show-config",_.value))},[...a[83]||(a[83]=[r("span",{class:"ico"},"{ }",-1),W("JSON ",-1)])])]),r("section",null,[a[87]||(a[87]=r("h3",null,"Presets",-1)),r("div",Yu,[$(r("select",{"onUpdate:modelValue":a[10]||(a[10]=p=>U.value=p),onChange:me},[a[84]||(a[84]=r("option",{value:""},"— saved presets —",-1)),(O(!0),D(X,null,be(A.value,p=>(O(),D("option",{key:p,value:p},k(p),9,Ju))),128))],544),[[Ne,U.value]]),r("button",{class:"icon-btn",title:"Delete the selected preset",disabled:!U.value,onClick:Ct}," ✕ ",8,Xu)]),r("div",Zu,[$(r("input",{"onUpdate:modelValue":a[11]||(a[11]=p=>_.value=p),type:"text",spellcheck:"false",placeholder:"preset name",onKeyup:Ka(Oe,["enter"])},null,544),[[ee,_.value]]),r("button",{disabled:!_.value.trim(),onClick:Oe},k(A.value.includes(_.value.trim())?"Overwrite":"Save"),9,Qu)]),r("label",ec,[$(r("input",{"onUpdate:modelValue":a[12]||(a[12]=p=>e.params.autoRandom=p),type:"checkbox"},null,512),[[Rt,e.params.autoRandom]]),a[85]||(a[85]=r("span",null,"Auto-random",-1))]),e.params.autoRandom?(O(),D("label",tc,[a[86]||(a[86]=r("span",{class:"name"},"Every",-1)),r("span",nc,k(e.params.autoRandomSeconds)+"s",1),$(r("input",{"onUpdate:modelValue":a[13]||(a[13]=p=>e.params.autoRandomSeconds=p),type:"range",min:"2",max:"120",step:"1"},null,512),[[ee,e.params.autoRandomSeconds,void 0,{number:!0}]])])):ve("",!0),q.value?(O(),D("p",ic,k(q.value),1)):ve("",!0),a[88]||(a[88]=r("p",{class:"hint"}," Saved to this browser. Selecting one applies it immediately, including its interaction matrix. Choosing a preset puts its name in the box, so Save becomes Overwrite. ",-1))]),r("section",null,[r("h3",null,[a[89]||(a[89]=r("span",null,"Startup",-1)),r("button",{class:Me(["lock",{on:E.value.startup}]),title:E.value.startup?"Locked — Random leaves this alone":"Lock from Random",onClick:a[14]||(a[14]=p=>I("startup"))},k(E.value.startup?"🔒":"🔓"),11,sc)]),r("div",oc,[r("label",null,[a[90]||(a[90]=r("span",null,"Pattern",-1)),$(r("select",{"onUpdate:modelValue":a[15]||(a[15]=p=>e.startup.startingMethod=p)},[(O(!0),D(X,null,be(Pe(ru),(p,Z)=>(O(),D("option",{key:Z,value:Z},k(p),9,rc))),128))],512),[[Ne,e.startup.startingMethod,void 0,{number:!0}]])]),r("label",null,[a[91]||(a[91]=r("span",null,"Agents",-1)),$(r("select",{"onUpdate:modelValue":a[16]||(a[16]=p=>e.startup.agentCount=p)},[(O(!0),D(X,null,be(Pe(iu),p=>(O(),D("option",{key:p,value:p},k(p.toLocaleString()),9,lc))),128))],512),[[Ne,e.startup.agentCount,void 0,{number:!0}]])]),r("label",null,[a[92]||(a[92]=r("span",null,"Species",-1)),$(r("select",{"onUpdate:modelValue":a[17]||(a[17]=p=>e.startup.speciesCount=p)},[(O(!0),D(X,null,be(Pe(su),p=>(O(),D("option",{key:p,value:p},k(p),9,ac))),128))],512),[[Ne,e.startup.speciesCount,void 0,{number:!0}]])]),r("label",null,[a[93]||(a[93]=r("span",null,"World Size",-1)),$(r("select",{"onUpdate:modelValue":a[18]||(a[18]=p=>e.startup.worldSizeMult=p)},[(O(!0),D(X,null,be(Pe(ou),p=>(O(),D("option",{key:p,value:p},k((p*800).toLocaleString()),9,uc))),128))],512),[[Ne,e.startup.worldSizeMult,void 0,{number:!0}]])]),r("label",null,[a[95]||(a[95]=r("span",null,"Matrix Range",-1)),$(r("select",{"onUpdate:modelValue":a[19]||(a[19]=p=>e.startup.interactionRange=p)},[...a[94]||(a[94]=[r("option",{value:1},"1",-1),r("option",{value:2},"2",-1),r("option",{value:3},"3",-1)])],512),[[Ne,e.startup.interactionRange,void 0,{number:!0}]])]),r("label",null,[a[96]||(a[96]=r("span",null,"Start Size",-1)),$(r("select",{"onUpdate:modelValue":a[20]||(a[20]=p=>e.startup.startRadiusMul=p)},[(O(),D(X,null,be(Mt,p=>r("option",{key:p,value:p},k((p*800).toLocaleString())+k(p===e.startup.worldSizeMult?" (fills)":""),9,cc)),64))],512),[[Ne,e.startup.startRadiusMul,void 0,{number:!0}]])]),r("label",null,[a[97]||(a[97]=r("span",null,"Species Spread",-1)),$(r("select",{"onUpdate:modelValue":a[21]||(a[21]=p=>e.startup.speciesSpread=p)},[(O(!0),D(X,null,be(Pe(lu),p=>(O(),D("option",{key:p,value:p},k(p===0?"Discrete":`±${p}`),9,dc))),128))],512),[[Ne,e.startup.speciesSpread,void 0,{number:!0}]])])]),r("div",fc,[r("label",pc,[a[98]||(a[98]=r("span",null,"Seed",-1)),r("input",{value:e.startup.seed,type:"number",min:"0",step:"1",onChange:a[22]||(a[22]=p=>e.startup.seed=Math.max(0,Math.floor(+p.target.value)||0))},null,40,hc)]),r("button",{title:"New random seed",onClick:a[23]||(a[23]=p=>i("reroll-seed"))},"🎲"),r("button",{class:Me(["lock",{on:E.value.seed}]),title:E.value.seed?"Seed locked — Random and New Matrix reuse it":"Lock the seed",onClick:a[24]||(a[24]=p=>I("seed"))},k(E.value.seed?"🔒":"🔓"),11,mc)]),a[101]||(a[101]=r("p",{class:"hint"},[W(" Everything generated — layout, matrix, philicity, sizes, and Random's own choices — derives from the seed. Same seed and settings gives the same world back. "),r("em",null,"Lock"),W(" it and Random/New Matrix reuse it instead of rolling a fresh one, so results repeat exactly. ")],-1)),e.startup.speciesSpread?(O(),D("p",gc,[W(" Species is a continuous value, not an index. Agents are scattered up to ±"+k(e.startup.speciesSpread)+" around their basis species, so their colour, matrix row, philicity and size are all interpolated between neighbouring rows. The matrix below is the ",1),a[99]||(a[99]=r("em",null,"basis",-1)),a[100]||(a[100]=W("; agents live between its rows. ",-1))])):ve("",!0),r("div",{class:Me(["density",we.value])},[r("span",null,"~"+k(Ke.value.toLocaleString())+" neighbours scanned per agent",1)],2),a[102]||(a[102]=r("p",{class:"hint"},[W(" Cost scales with "),r("em",null,"density"),W(", not agent count. Raise World Size to keep big counts fast. Startup changes apply on Restart. ")],-1)),e.notice?(O(),D("p",bc,k(e.notice),1)):ve("",!0)]),e.matrix?(O(),D("section",vc,[r("h3",null,[a[103]||(a[103]=r("span",null,"Interaction Matrix",-1)),r("button",{class:Me(["lock",{on:E.value.matrix}]),title:E.value.matrix?"Locked — Random leaves this alone":"Lock from Random",onClick:a[25]||(a[25]=p=>I("matrix"))},k(E.value.matrix?"🔒":"🔓"),11,yc)]),r("div",xc,[r("button",{title:"Generate a new interaction matrix",onClick:a[26]||(a[26]=p=>i("randomize-matrix",E.value))},[...a[104]||(a[104]=[r("span",{class:"ico"},"⚄",-1),W("New Matrix ",-1)])]),r("button",{title:"Set every interaction to zero",onClick:a[27]||(a[27]=p=>i("clear-matrix"))},[...a[105]||(a[105]=[r("span",{class:"ico"},"∅",-1),W("Clear ",-1)])]),r("label",wc,[$(r("input",{"onUpdate:modelValue":a[28]||(a[28]=p=>e.startup.lockMatrix=p),type:"checkbox"},null,512),[[Rt,e.startup.lockMatrix]]),a[106]||(a[106]=r("span",null,"Keep through restart",-1))])]),$e(Au,{matrix:e.matrix,philicity:e.philicity,"core-sizes":e.params.coreEnabled?e.coreSizes:null,"species-count":e.speciesCount,editable:"",onEdit:a[29]||(a[29]=p=>i("edit-matrix",p))},null,8,["matrix","philicity","core-sizes","species-count"]),a[107]||(a[107]=r("p",{class:"hint"},[W(" Two different locks, easy to confuse. "),r("em",null,"Keep through restart"),W(" carries this matrix — including any edits — into the next Restart, which otherwise starts a fresh run with a new one. The "),r("strong",null,"🔒"),W(" on this heading stops "),r("em",null,"Random"),W(" rerolling it. Locking the "),r("em",null,"seed"),W(" outranks both: Restart then rebuilds the identical world, layout and all. ")],-1))])):ve("",!0),r("section",null,[r("h3",null,[a[108]||(a[108]=r("span",null,"Simulation",-1)),r("button",{class:Me(["lock",{on:E.value.sim}]),title:E.value.sim?"Locked — Random leaves this alone":"Lock from Random",onClick:a[30]||(a[30]=p=>I("sim"))},k(E.value.sim?"🔒":"🔓"),11,Sc)]),(O(!0),D(X,null,be(s("sim"),([p,Z,Ie,Ve,Ce])=>(O(),D("label",{key:p,class:"slider"},[r("span",Pc,k(Z),1),r("span",Cc,k(te(e.params[p],Ce)),1),$(r("input",{"onUpdate:modelValue":ke=>e.params[p]=ke,type:"range",min:Ie,max:Ve,step:Ce},null,8,Mc),[[ee,e.params[p],void 0,{number:!0}]])]))),128)),r("label",kc,[$(r("input",{"onUpdate:modelValue":a[31]||(a[31]=p=>e.params.brownian=p),type:"checkbox"},null,512),[[Rt,e.params.brownian]]),a[109]||(a[109]=r("span",null,"Per-frame randomness",-1))]),a[111]||(a[111]=r("p",{class:"hint"},[W(" Off is the original behaviour, where "),r("em",null,"Randomness"),W(" gives each agent a "),r("em",null,"fixed"),W(" direction for the whole run — a per-agent bias, not noise. On mixes the frame into the seed, making it real Brownian motion. It changes the feel of every preset, hence the switch. ")],-1)),r("div",Rc,[r("span",null,[a[110]||(a[110]=W("Collide radius ",-1)),r("b",null,k(Pe(br)(e.params).toFixed(2)),1)])])]),r("section",null,[r("h3",null,[a[112]||(a[112]=r("span",null,"Boids",-1)),r("button",{class:Me(["lock",{on:E.value.boids}]),title:E.value.boids?"Locked — Random leaves this alone":"Lock from Random",onClick:a[32]||(a[32]=p=>I("boids"))},k(E.value.boids?"🔒":"🔓"),11,Tc)]),(O(!0),D(X,null,be(s("boids"),([p,Z,Ie,Ve,Ce])=>(O(),D("label",{key:p,class:"slider"},[r("span",Ac,k(Z),1),r("span",Bc,k(te(e.params[p],Ce)),1),$(r("input",{"onUpdate:modelValue":ke=>e.params[p]=ke,type:"range",min:Ie,max:Ve,step:Ce},null,8,Ec),[[ee,e.params[p],void 0,{number:!0}]])]))),128))]),r("section",null,[r("h3",null,[a[113]||(a[113]=r("span",null,"Particle Life",-1)),r("button",{class:Me(["lock",{on:E.value.plife}]),title:E.value.plife?"Locked — Random leaves this alone":"Lock from Random",onClick:a[33]||(a[33]=p=>I("plife"))},k(E.value.plife?"🔒":"🔓"),11,Fc)]),(O(!0),D(X,null,be(s("plife"),([p,Z,Ie,Ve,Ce])=>(O(),D("label",{key:p,class:"slider"},[r("span",Oc,k(Z),1),r("span",Ic,k(te(e.params[p],Ce)),1),$(r("input",{"onUpdate:modelValue":ke=>e.params[p]=ke,type:"range",min:Ie,max:Ve,step:Ce},null,8,zc),[[ee,e.params[p],void 0,{number:!0}]])]))),128)),r("div",Lc,[r("span",null,[a[114]||(a[114]=W("Force softening ",-1)),r("b",null,k(Pe(gr)(e.params).toFixed(0)),1)])])]),r("section",null,[r("h3",null,[a[115]||(a[115]=r("span",null,"Excluded Volume",-1)),r("button",{class:Me(["lock",{on:E.value.core}]),title:E.value.core?"Locked — Random leaves this alone":"Lock from Random",onClick:a[34]||(a[34]=p=>I("core"))},k(E.value.core?"🔒":"🔓"),11,Dc)]),r("label",Uc,[r("input",{type:"checkbox",checked:e.params.coreEnabled,onChange:a[35]||(a[35]=p=>e.params.coreEnabled=p.target.checked)},null,40,Nc),a[116]||(a[116]=r("span",null,"Enable excluded volume",-1))]),e.params.coreEnabled?(O(),D(X,{key:0},[(O(!0),D(X,null,be(s("core"),([p,Z,Ie,Ve,Ce])=>(O(),D("label",{key:p,class:"slider"},[r("span",_c,k(Z),1),r("span",Vc,k(te(e.params[p],Ce)),1),$(r("input",{"onUpdate:modelValue":ke=>e.params[p]=ke,type:"range",min:Ie,max:Ve,step:Ce},null,8,Wc),[[ee,e.params[p],void 0,{number:!0}]])]))),128)),r("label",Gc,[a[117]||(a[117]=r("span",null,"Falloff",-1)),$(r("select",{"onUpdate:modelValue":a[36]||(a[36]=p=>e.params.coreFalloff=p)},[(O(!0),D(X,null,be(Pe(Us),([p],Z)=>(O(),D("option",{key:Z,value:Z},k(p),9,$c))),128))],512),[[Ne,e.params.coreFalloff,void 0,{number:!0}]])]),r("div",jc,[r("span",null,[a[118]||(a[118]=W("Widest pair radius ",-1)),r("b",null,k(Pe(vr)(e.params).toFixed(0)),1)])]),r("p",Hc,k(Pe(Us)[e.params.coreFalloff][1]),1)],64)):ve("",!0),a[119]||(a[119]=r("p",{class:"hint"},[W(" A short-range repulsion that ignores the interaction matrix, so mutually attracted species keep real spacing instead of collapsing to a point. Applies at every mix value. Raise "),r("em",null,"Size Spread"),W(" to give each species a different size — at 1 some end up with no excluded volume at all, and get shoved around by the ones that do (see the "),r("em",null,"Core size"),W(" strip under the matrix). A pair's exclusion distance is the sum of their two radii. ")],-1))]),r("section",null,[r("h3",null,[a[120]||(a[120]=r("span",null,"Medium",-1)),r("button",{class:Me(["lock",{on:E.value.medium}]),title:E.value.medium?"Locked — Random leaves this alone":"Lock from Random",onClick:a[37]||(a[37]=p=>I("medium"))},k(E.value.medium?"🔒":"🔓"),11,Kc)]),r("label",qc,[r("input",{type:"checkbox",checked:e.params.mediumEnabled,onChange:a[38]||(a[38]=p=>e.params.mediumEnabled=p.target.checked)},null,40,Yc),a[121]||(a[121]=r("span",null,"Enable medium",-1))]),e.params.mediumEnabled?(O(),D(X,{key:0},[(O(!0),D(X,null,be(s("medium"),([p,Z,Ie,Ve,Ce])=>(O(),D("label",{key:p,class:"slider"},[r("span",Jc,k(Z),1),r("span",Xc,k(te(e.params[p],Ce)),1),$(r("input",{"onUpdate:modelValue":ke=>e.params[p]=ke,type:"range",min:Ie,max:Ve,step:Ce},null,8,Zc),[[ee,e.params[p],void 0,{number:!0}]])]))),128)),r("div",Qc,[r("span",null,[a[122]||(a[122]=W("Cell cleared at ",-1)),r("b",null,k(ce.value.toLocaleString()),1),a[123]||(a[123]=W(" agents",-1))])]),r("label",ed,[$(r("input",{"onUpdate:modelValue":a[39]||(a[39]=p=>e.params.showMedium=p),type:"checkbox"},null,512),[[Rt,e.params.showMedium]]),a[124]||(a[124]=r("span",null,"Show medium",-1))])],64)):ve("",!0),a[125]||(a[125]=r("p",{class:"hint"},[W(" A diffusing scalar field that agents displace. Each species has a "),r("em",null,"philicity"),W(" in [-1, +1] (shown under the matrix): philic species climb the gradient, phobic ones flee it and coalesce into droplets. A philic species that is "),r("em",null,"also"),W(" attracted to a phobic one parks at the interface — that is a surfactant. ")],-1))]),r("section",null,[r("h3",null,[a[126]||(a[126]=r("span",null,"Blobs",-1)),r("button",{class:Me(["lock",{on:E.value.blobs}]),title:E.value.blobs?"Locked — Random leaves this alone":"Lock from Random",onClick:a[40]||(a[40]=p=>I("blobs"))},k(E.value.blobs?"🔒":"🔓"),11,td)]),r("label",nd,[r("input",{type:"checkbox",checked:e.params.blobsEnabled,onChange:a[41]||(a[41]=p=>e.params.blobsEnabled=p.target.checked)},null,40,id),a[127]||(a[127]=r("span",null,"Detect blobs",-1))]),e.params.blobsEnabled?(O(),D(X,{key:0},[r("label",sd,[a[128]||(a[128]=r("span",{class:"name"},"Min Density",-1)),r("span",od,k(e.params.blobMinDensity.toFixed(1))+"×",1),$(r("input",{"onUpdate:modelValue":a[42]||(a[42]=p=>e.params.blobMinDensity=p),type:"range",min:"0.5",max:"8",step:"0.1"},null,512),[[ee,e.params.blobMinDensity,void 0,{number:!0}]])]),r("label",rd,[a[129]||(a[129]=r("span",{class:"name"},"Smoothing",-1)),r("span",ld,k(e.params.blobSmoothing),1),$(r("input",{"onUpdate:modelValue":a[43]||(a[43]=p=>e.params.blobSmoothing=p),type:"range",min:"0",max:"8",step:"1"},null,512),[[ee,e.params.blobSmoothing,void 0,{number:!0}]])]),r("label",ad,[a[130]||(a[130]=r("span",{class:"name"},"Reflood Every",-1)),r("span",ud,k(e.params.blobInterval)+"f",1),$(r("input",{"onUpdate:modelValue":a[44]||(a[44]=p=>e.params.blobInterval=p),type:"range",min:"1",max:"60",step:"1"},null,512),[[ee,e.params.blobInterval,void 0,{number:!0}]])]),r("label",cd,[a[131]||(a[131]=r("span",{class:"name"},"Flood Rounds",-1)),r("span",dd,k(e.params.blobRounds),1),$(r("input",{"onUpdate:modelValue":a[45]||(a[45]=p=>e.params.blobRounds=p),type:"range",min:"1",max:"64",step:"1"},null,512),[[ee,e.params.blobRounds,void 0,{number:!0}]])])],64)):ve("",!0),a[144]||(a[144]=r("p",{class:"hint"},[W(" Connected-component labelling over grid cells — cheap, but cell-resolution, so two blobs sharing a cell merge. "),r("em",null,"Min Density"),W(" is what separates blob from background: below it, the thin gas between droplets bridges them and the whole world becomes one blob. "),r("em",null,"Smoothing"),W(" blurs the density field before thresholding it — without it blobs come out the shape of the cell grid, blocky and full of pinholes. A label travels one cell per round, so "),r("em",null,"Flood Rounds"),W(" caps how wide a blob can be and still come out as one piece. Switch "),r("em",null,"Colour By"),W(" to "),r("em",null,"Blob"),W(" to see them; grey means unlabelled background. ")],-1)),e.params.blobsEnabled?(O(),D(X,{key:1},[r("label",fd,[r("input",{type:"checkbox",checked:e.params.mutateEnabled,onChange:a[46]||(a[46]=p=>e.params.mutateEnabled=p.target.checked)},null,40,pd),a[132]||(a[132]=r("span",null,"Mutate species per blob",-1))]),e.params.mutateEnabled?(O(),D(X,{key:0},[r("label",hd,[a[133]||(a[133]=r("span",{class:"name"},"Mutation Rate",-1)),r("span",md,k(e.params.mutateRate.toFixed(2)),1),$(r("input",{"onUpdate:modelValue":a[47]||(a[47]=p=>e.params.mutateRate=p),type:"range",min:"0",max:"0.5",step:"0.01"},null,512),[[ee,e.params.mutateRate,void 0,{number:!0}]])]),r("label",gd,[a[134]||(a[134]=r("span",{class:"name"},"Outward Bias",-1)),r("span",bd,k(e.params.mutateBias.toFixed(2)),1),$(r("input",{"onUpdate:modelValue":a[48]||(a[48]=p=>e.params.mutateBias=p),type:"range",min:"0",max:"1",step:"0.05"},null,512),[[ee,e.params.mutateBias,void 0,{number:!0}]])]),r("label",vd,[a[135]||(a[135]=r("span",{class:"name"},"Mutate Every",-1)),r("span",yd,k(e.params.mutateInterval)+"f",1),$(r("input",{"onUpdate:modelValue":a[49]||(a[49]=p=>e.params.mutateInterval=p),type:"range",min:"5",max:"120",step:"5"},null,512),[[ee,e.params.mutateInterval,void 0,{number:!0}]])])],64)):ve("",!0),r("label",xd,[$(r("input",{"onUpdate:modelValue":a[50]||(a[50]=p=>e.params.splitEnabled=p),type:"checkbox"},null,512),[[Rt,e.params.splitEnabled]]),a[136]||(a[136]=r("span",null,"Split large blobs",-1))]),e.params.splitEnabled?(O(),D(X,{key:1},[r("label",wd,[a[137]||(a[137]=r("span",{class:"name"},"Split Every",-1)),r("span",Sd,k(e.params.splitInterval)+"f",1),$(r("input",{"onUpdate:modelValue":a[51]||(a[51]=p=>e.params.splitInterval=p),type:"range",min:"20",max:"300",step:"10"},null,512),[[ee,e.params.splitInterval,void 0,{number:!0}]])]),r("label",Pd,[a[138]||(a[138]=r("span",{class:"name"},"Split Chance",-1)),r("span",Cd,k(e.params.splitChance.toFixed(2)),1),$(r("input",{"onUpdate:modelValue":a[52]||(a[52]=p=>e.params.splitChance=p),type:"range",min:"0.05",max:"1",step:"0.05"},null,512),[[ee,e.params.splitChance,void 0,{number:!0}]])]),r("label",Md,[a[139]||(a[139]=r("span",{class:"name"},"Min Blob Size",-1)),r("span",kd,k(e.params.splitMinBlobMul)+"×",1),$(r("input",{"onUpdate:modelValue":a[53]||(a[53]=p=>e.params.splitMinBlobMul=p),type:"range",min:"2",max:"40",step:"1"},null,512),[[ee,e.params.splitMinBlobMul,void 0,{number:!0}]])]),r("label",Rd,[a[140]||(a[140]=r("span",{class:"name"},"Split Force",-1)),r("span",Td,k(e.params.splitImpulse),1),$(r("input",{"onUpdate:modelValue":a[54]||(a[54]=p=>e.params.splitImpulse=p),type:"range",min:"0",max:"600",step:"10"},null,512),[[ee,e.params.splitImpulse,void 0,{number:!0}]])]),r("label",Ad,[a[141]||(a[141]=r("span",{class:"name"},"Split Mutation",-1)),r("span",Bd,k(e.params.splitMutation.toFixed(2)),1),$(r("input",{"onUpdate:modelValue":a[55]||(a[55]=p=>e.params.splitMutation=p),type:"range",min:"0",max:"2",step:"0.05"},null,512),[[ee,e.params.splitMutation,void 0,{number:!0}]])]),a[142]||(a[142]=r("p",{class:"hint"},[W(" Mitosis. A qualifying blob is cut along a random axis through its own centroid and the halves are shoved apart, with their species drifting in "),r("em",null,"opposite"),W(" directions — so dividing is also speciation. Only blobs above "),r("em",null,"Min Blob Size"),W(" ever divide, and a blob only gets big by holding together, so size stands in for persistence as a crude fitness signal. ")],-1))],64)):ve("",!0),a[143]||(a[143]=r("p",{class:"hint"},[W(" Every agent in a blob gets the "),r("em",null,"same"),W(" nudge, so a droplet's whole lineage drifts together instead of dissolving into noise. Watch it in "),r("em",null,"Species"),W(" colour: droplets slowly change hue and diverge from each other. Species 0 and N−1 "),r("em",null,"reflect"),W(" rather than clamp, so the walk stays spread out instead of piling up against the ends. "),r("em",null,"Outward Bias"),W(" additionally drives species apart, if you want them to separate faster. ")],-1))],64)):ve("",!0)]),r("section",null,[r("h3",null,[a[145]||(a[145]=r("span",null,"View",-1)),r("button",{class:Me(["lock",{on:E.value.view}]),title:E.value.view?"Locked — Random leaves this alone":"Lock from Random",onClick:a[56]||(a[56]=p=>I("view"))},k(E.value.view?"🔒":"🔓"),11,Ed)]),r("label",Fd,[a[146]||(a[146]=r("span",null,"Colour By",-1)),$(r("select",{"onUpdate:modelValue":a[57]||(a[57]=p=>e.params.renderMode=p)},[(O(!0),D(X,null,be(Pe(Ws),([p],Z)=>(O(),D("option",{key:Z,value:Z},k(p),9,Od))),128))],512),[[Ne,e.params.renderMode,void 0,{number:!0}]])]),r("p",Id,k(Pe(Ws)[e.params.renderMode][1]),1),r("label",zd,[a[147]||(a[147]=r("span",null,"Field",-1)),$(r("select",{"onUpdate:modelValue":a[58]||(a[58]=p=>e.params.fieldMode=p)},[(O(!0),D(X,null,be(Pe(Vs),([p],Z)=>(O(),D("option",{key:Z,value:Z},k(p),9,Ld))),128))],512),[[Ne,e.params.fieldMode,void 0,{number:!0}]])]),r("p",Dd,k(Pe(Vs)[e.params.fieldMode][1]),1),e.params.fieldMode>0?(O(),D(X,{key:0},[r("label",Ud,[a[148]||(a[148]=r("span",{class:"name"},"Field Smoothing",-1)),r("span",Nd,k(e.params.fieldSmoothing),1),$(r("input",{"onUpdate:modelValue":a[59]||(a[59]=p=>e.params.fieldSmoothing=p),type:"range",min:"0",max:"10",step:"1"},null,512),[[ee,e.params.fieldSmoothing,void 0,{number:!0}]])]),r("label",_d,[a[149]||(a[149]=r("span",{class:"name"},"Surface At",-1)),r("span",Vd,k(e.params.fieldThresholdMul.toFixed(1))+"×",1),$(r("input",{"onUpdate:modelValue":a[60]||(a[60]=p=>e.params.fieldThresholdMul=p),type:"range",min:"0.2",max:"10",step:"0.1"},null,512),[[ee,e.params.fieldThresholdMul,void 0,{number:!0}]])]),r("label",Wd,[a[150]||(a[150]=r("span",{class:"name"},"Field Opacity",-1)),r("span",Gd,k(e.params.fieldStrength.toFixed(2)),1),$(r("input",{"onUpdate:modelValue":a[61]||(a[61]=p=>e.params.fieldStrength=p),type:"range",min:"0",max:"1",step:"0.02"},null,512),[[ee,e.params.fieldStrength,void 0,{number:!0}]])]),r("label",$d,[$(r("input",{"onUpdate:modelValue":a[62]||(a[62]=p=>e.params.showAgents=p),type:"checkbox"},null,512),[[Rt,e.params.showAgents]]),a[151]||(a[151]=r("span",null,"Draw agents on top",-1))]),a[152]||(a[152]=r("p",{class:"hint"},[W(" Built from the per-cell counts the spatial hash already produces, so it costs one blur plus one fullscreen pass. "),r("em",null,"Surface At"),W(" is a multiple of average occupancy — lower it to make the fluid engulf more, raise it to leave only the dense cores. Turn agents off to see the surface on its own. ")],-1))],64)):ve("",!0),r("label",jd,[a[153]||(a[153]=r("span",null,"Palette",-1)),$(r("select",{"onUpdate:modelValue":a[63]||(a[63]=p=>e.params.speciesPalette=p)},[(O(!0),D(X,null,be(Pe(_s),([p],Z)=>(O(),D("option",{key:Z,value:Z},k(p),9,Hd))),128))],512),[[Ne,e.params.speciesPalette,void 0,{number:!0}]])]),r("p",Kd,k(Pe(_s)[e.params.speciesPalette][1]),1),r("label",qd,[a[154]||(a[154]=r("span",null,"Background",-1)),$(r("select",{"onUpdate:modelValue":a[64]||(a[64]=p=>e.params.background=p)},[(O(!0),D(X,null,be(Pe(un),(p,Z)=>(O(),D("option",{key:Z,value:Z},k(p.name),9,Yd))),128))],512),[[Ne,e.params.background,void 0,{number:!0}]])]),r("label",Jd,[a[155]||(a[155]=r("span",null,"Shape",-1)),$(r("select",{"onUpdate:modelValue":a[65]||(a[65]=p=>e.params.particleShape=p)},[(O(!0),D(X,null,be(Pe(Ns),([p],Z)=>(O(),D("option",{key:Z,value:Z},k(p),9,Xd))),128))],512),[[Ne,e.params.particleShape,void 0,{number:!0}]])]),r("p",Zd,k(Pe(Ns)[e.params.particleShape][1]),1),r("label",Qd,[a[156]||(a[156]=r("span",{class:"name"},"Size",-1)),r("span",ef,k(e.params.drawScale.toFixed(2))+"×",1),$(r("input",{"onUpdate:modelValue":a[66]||(a[66]=p=>e.params.drawScale=p),type:"range",min:"0.1",max:"12",step:"0.1"},null,512),[[ee,e.params.drawScale,void 0,{number:!0}]])]),r("label",tf,[a[157]||(a[157]=r("span",{class:"name"},"Size Jitter",-1)),r("span",nf,k(e.params.drawJitter.toFixed(2)),1),$(r("input",{"onUpdate:modelValue":a[67]||(a[67]=p=>e.params.drawJitter=p),type:"range",min:"0",max:"1",step:"0.05"},null,512),[[ee,e.params.drawJitter,void 0,{number:!0}]])]),r("div",sf,[r("span",null,[a[158]||(a[158]=W("Drawn radius ",-1)),r("b",null,k((e.params.drawRadius*e.params.drawScale).toFixed(1)),1)])]),a[171]||(a[171]=r("p",{class:"hint"},[W(" Visual only — multiplies "),r("em",null,"Draw Size"),W(" for rendering. Draw Size itself is under "),r("em",null,"Simulation"),W(" and also sets the collision radius, so scaling it there changes the physics; this does not. "),r("em",null,"Size Jitter"),W(" varies each agent's size by up to ±100%, keyed to its index so it stays put rather than flickering. ")],-1)),r("label",of,[a[159]||(a[159]=r("span",{class:"name"},"Glow",-1)),r("span",rf,k(e.params.glowStrength.toFixed(2)),1),$(r("input",{"onUpdate:modelValue":a[68]||(a[68]=p=>e.params.glowStrength=p),type:"range",min:"0",max:"1",step:"0.02"},null,512),[[ee,e.params.glowStrength,void 0,{number:!0}]])]),e.params.glowStrength>0?(O(),D("label",lf,[a[160]||(a[160]=r("span",{class:"name"},"Glow Size",-1)),r("span",af,k(e.params.glowSize.toFixed(1))+"×",1),$(r("input",{"onUpdate:modelValue":a[69]||(a[69]=p=>e.params.glowSize=p),type:"range",min:"1.5",max:"12",step:"0.5"},null,512),[[ee,e.params.glowSize,void 0,{number:!0}]])])):ve("",!0),r("label",uf,[a[161]||(a[161]=r("span",{class:"name"},"Trails",-1)),r("span",cf,k(e.params.trailStrength.toFixed(2)),1),$(r("input",{"onUpdate:modelValue":a[70]||(a[70]=p=>e.params.trailStrength=p),type:"range",min:"0",max:"0.99",step:"0.01"},null,512),[[ee,e.params.trailStrength,void 0,{number:!0}]])]),r("label",df,[a[162]||(a[162]=r("span",{class:"name"},"Outline",-1)),r("span",ff,k(e.params.outline.toFixed(2)),1),$(r("input",{"onUpdate:modelValue":a[71]||(a[71]=p=>e.params.outline=p),type:"range",min:"0",max:"1",step:"0.05"},null,512),[[ee,e.params.outline,void 0,{number:!0}]])]),r("label",pf,[a[163]||(a[163]=r("span",{class:"name"},"Motion Stretch",-1)),r("span",hf,k(e.params.velocityStretch.toFixed(1)),1),$(r("input",{"onUpdate:modelValue":a[72]||(a[72]=p=>e.params.velocityStretch=p),type:"range",min:"0",max:"50",step:"0.25"},null,512),[[ee,e.params.velocityStretch,void 0,{number:!0}]])]),a[172]||(a[172]=r("p",{class:"hint"},[W(" Glow is a second additive pass — halos sum where they overlap, so dense regions bloom. "),r("em",null,"Motion Stretch"),W(" scales each agent along its velocity, turning fast ones into streaks. "),r("em",null,"Outline"),W(" darkens each agent's rim so dense regions stay readable instead of saturating into one flat mass. "),r("em",null,"Trails"),W(" keeps part of the previous frame instead of clearing, so agents smear a decaying path behind them — at 0.99 a trail lasts around a hundred frames. It is screen-space, so panning smears too. ")],-1)),r("label",mf,[r("input",{type:"checkbox",checked:e.params.driftEnabled,onChange:a[73]||(a[73]=p=>e.params.driftEnabled=p.target.checked)},null,40,gf),a[164]||(a[164]=r("span",null,"Drifting motes",-1))]),e.params.driftEnabled?(O(),D(X,{key:2},[r("label",bf,[a[165]||(a[165]=r("span",{class:"name"},"Density",-1)),r("span",vf,k((e.params.driftCols**2).toLocaleString()),1),$(r("input",{"onUpdate:modelValue":a[74]||(a[74]=p=>e.params.driftCols=p),type:"range",min:"8",max:"90",step:"1"},null,512),[[ee,e.params.driftCols,void 0,{number:!0}]])]),r("label",yf,[a[166]||(a[166]=r("span",{class:"name"},"Mote Size",-1)),r("span",xf,k(e.params.driftSize),1),$(r("input",{"onUpdate:modelValue":a[75]||(a[75]=p=>e.params.driftSize=p),type:"range",min:"4",max:"80",step:"1"},null,512),[[ee,e.params.driftSize,void 0,{number:!0}]])]),r("label",wf,[a[167]||(a[167]=r("span",{class:"name"},"Drift Speed",-1)),r("span",Sf,k(e.params.driftSpeed.toFixed(3)),1),$(r("input",{"onUpdate:modelValue":a[76]||(a[76]=p=>e.params.driftSpeed=p),type:"range",min:"0",max:"0.03",step:"0.001"},null,512),[[ee,e.params.driftSpeed,void 0,{number:!0}]])]),r("label",Pf,[a[168]||(a[168]=r("span",{class:"name"},"Brightness",-1)),r("span",Cf,k(e.params.driftBrightness.toFixed(2)),1),$(r("input",{"onUpdate:modelValue":a[77]||(a[77]=p=>e.params.driftBrightness=p),type:"range",min:"0",max:"1",step:"0.05"},null,512),[[ee,e.params.driftBrightness,void 0,{number:!0}]])]),a[169]||(a[169]=r("p",{class:"hint"}," Decorative background haze — no effect on the simulation. Motes sit one per cell of a jittered grid rather than at random positions: random clumps, and clumped motes merge into blotches. The jitter is bounded to the middle 60% of a cell, so two motes can never come closer than 40% of the spacing. ",-1))],64)):ve("",!0),r("label",Mf,[$(r("input",{type:"checkbox","onUpdate:modelValue":a[78]||(a[78]=p=>e.params.showGrid=p)},null,512),[[Rt,e.params.showGrid]]),a[170]||(a[170]=r("span",null,"Show spatial grid",-1))]),a[173]||(a[173]=lr('<p class="hint" data-v-abd8a7df> Drag to pan · scroll to zoom at cursor · <kbd data-v-abd8a7df>Space</kbd> random · <kbd data-v-abd8a7df>P</kbd> pause · <kbd data-v-abd8a7df>R</kbd> restart · <kbd data-v-abd8a7df>G</kbd> grid · <kbd data-v-abd8a7df>M</kbd> medium · <kbd data-v-abd8a7df>V</kbd> excluded volume · <kbd data-v-abd8a7df>C</kbd> reset cam · <kbd data-v-abd8a7df>F</kbd> fullscreen · <kbd data-v-abd8a7df>H</kbd> hide panel </p>',1))])])],4))}},Af=Qt(Tf,[["__scopeId","data-v-abd8a7df"]]),Bf={class:"dialog",role:"dialog","aria-modal":"true","aria-label":"About"},Ef={class:"check"},Ff={__name:"AboutDialog",props:{dontShowAgain:{type:Boolean,default:!1}},emits:["close","update:dontShowAgain"],setup(e,{emit:t}){const n=t,i=he(!1);function s(){n("update:dontShowAgain",i.value),n("close")}return(o,l)=>(O(),D("div",{class:"backdrop",onClick:Ji(s,["self"])},[r("div",Bf,[l[2]||(l[2]=lr('<h1 data-v-6f53331b>Particle Life <span class="plus" data-v-6f53331b>+</span> Boids</h1><p class="sub" data-v-6f53331b> Tens of thousands of agents on the GPU, blending boids flocking with particle-life species forces on a wrapping world. Runs entirely in WebGPU. </p><section data-v-6f53331b><h2 data-v-6f53331b>Original project</h2><p data-v-6f53331b> This is a browser port of <strong data-v-6f53331b>Godot-Particle-Life-Boids-Combined-Compute-Shader</strong> by <strong data-v-6f53331b>Tokoyuma</strong> (ThePathfindersCodex). The simulation — the forces, the spatial hashing, the collision pass, the tuned constants — is theirs; this port re-expresses it in WGSL. </p><p class="links" data-v-6f53331b><a href="https://github.com/ThePathfindersCodex/Godot-Particle-Life-Boids-Combined-Compute-Shader" target="_blank" rel="noopener noreferrer" data-v-6f53331b>Source on GitHub ↗</a><a href="https://www.youtube.com/@ThePathfindersCodex" target="_blank" rel="noopener noreferrer" data-v-6f53331b>ThePathfindersCodex on YouTube ↗</a></p><p class="fine" data-v-6f53331b>MIT License · Copyright © 2025 Tokoyuma</p></section><section data-v-6f53331b><h2 data-v-6f53331b>About this port</h2><p data-v-6f53331b> Every line of this WebGPU + Vue version was written by <strong data-v-6f53331b>Claude Opus</strong> (Anthropic), working through Claude Code. No human wrote the WGSL, the engine, or this dialog. Treat it accordingly — read the code before trusting it. </p><p class="fine" data-v-6f53331b> The port swaps Godot&#39;s per-frame CPU readback for a GPU prefix sum, and its <code data-v-6f53331b>imageStore</code> circle rasteriser for an instanced render pipeline. See the README for the full list of differences. </p></section>',4)),r("footer",null,[r("label",Ef,[$(r("input",{"onUpdate:modelValue":l[0]||(l[0]=u=>i.value=u),type:"checkbox"},null,512),[[Rt,i.value]]),l[1]||(l[1]=r("span",null,"Don't show this again",-1))]),r("button",{class:"primary",onClick:s},"Start")])])]))}},Of=Qt(Ff,[["__scopeId","data-v-6f53331b"]]),If={class:"dialog"},zf={key:0,class:"error"},Lf={class:"buttons"},Df={__name:"ConfigDialog",props:{config:{type:Object,required:!0}},emits:["close","apply"],setup(e,{emit:t}){const n=e,i=t,s=he(""),o=he(""),l=he(!1);Ut(()=>n.config,h=>{s.value=JSON.stringify(h,null,2),o.value="",l.value=!1},{immediate:!0});async function u(){try{await navigator.clipboard.writeText(s.value),l.value=!0,setTimeout(()=>l.value=!1,1500)}catch{o.value="Clipboard blocked by the browser — select the text and copy manually."}}function c(){let h;try{h=JSON.parse(s.value)}catch(f){o.value=`Not valid JSON: ${f.message}`;return}try{i("apply",h),i("close")}catch(f){o.value=f.message}}return(h,f)=>(O(),D("div",{class:"backdrop",onClick:f[3]||(f[3]=Ji(g=>i("close"),["self"]))},[r("div",If,[r("header",null,[f[4]||(f[4]=r("h1",null,"Configuration",-1)),r("button",{class:"icon",title:"Close",onClick:f[0]||(f[0]=g=>i("close"))},"✕")]),f[6]||(f[6]=r("p",{class:"sub"}," Everything needed to reproduce this state: the live parameters, the startup config, and the per-species matrix, philicity and core sizes. Edit it, or paste one in and apply. ",-1)),$(r("textarea",{"onUpdate:modelValue":f[1]||(f[1]=g=>s.value=g),spellcheck:"false",onInput:f[2]||(f[2]=g=>o.value="")},null,544),[[ee,s.value]]),o.value?(O(),D("p",zf,k(o.value),1)):ve("",!0),r("footer",null,[f[5]||(f[5]=r("span",{class:"hint"}," Unknown keys are ignored; anything missing keeps its current value. ",-1)),r("div",Lf,[r("button",{onClick:u},k(l.value?"Copied":"Copy"),1),r("button",{class:"primary",onClick:c},"Apply")])])])]))}},Uf=Qt(Df,[["__scopeId","data-v-805b5e6c"]]),Nf={class:"app"},_f={class:"fps"},Vf={class:"dim"},Wf={class:"dim"},Gf={class:"dim"},$f={class:"dim"},jf=["title"],Hf={key:5,class:"error"},vi="plb.hideAbout",no="plb.hudOpen",Kf={__name:"App",setup(e){const t=yn(hr()),n=yn(mr()),i=nn(null),s=he(""),o=he(""),l=he(0),u=he(!1),c=he(!0),h=nn(null),f=nn(null),g=nn(null),S=qe(()=>g.value?Array.from(g.value,L=>yr(L,t.coreSizeSpread)):null),y=he(n.speciesCount),T=he(0),x=he(0),E=he(localStorage.getItem(vi)!=="1"),j=he(localStorage.getItem(no)!=="0");function I(){j.value=!j.value,localStorage.setItem(no,j.value?"1":"0")}function R(L){L?localStorage.setItem(vi,"1"):localStorage.removeItem(vi)}let v=t.dt,A=0;async function U(L){i.value=L,await ji(),_()}function _(){const L=i.value;if(L){try{L.restart({...n})}catch(V){o.value=V.message;return}o.value=L.maxCollisions<64?`Collision partners per agent reduced to ${L.maxCollisions} to fit GPU memory.`:"",h.value=L.matrix,f.value=L.philicity,g.value=L.sizeSeeds,y.value=n.speciesCount,T.value=L.agentCount,x.value=L.avgPerCell,A!==n.worldSizeMult&&(A=n.worldSizeMult,kt())}}const q=he(!1),ne=nn({}),me=he("");function Oe(L=me.value){return Eu({params:t,startup:n,matrix:h.value,philicity:f.value,sizeSeeds:g.value,name:L})}function Ct(L=""){me.value=L,ne.value=Oe(L),q.value=!0}function ut(L,V=""){me.value=V||me.value,L(Oe(V))}function Mt(L){const V=i.value;if(!V)return;let ie;try{ie=Fu(L,{params:t,startup:n})}catch(d){o.value=d.message;return}typeof L.name=="string"&&L.name.trim()&&(me.value=L.name.trim()),ie.needsRestart&&_(),ie.matrix&&(V.uploadMatrix(ie.matrix,ie.philicity??V.philicity,ie.sizeSeeds??V.sizeSeeds),h.value=V.matrix,f.value=V.philicity,g.value=V.sizeSeeds)}let Ke={};function we(L={}){var P;const V=i.value;if(!V)return;Ke=L;const ie=G(L),{params:d,startup:m,needsRestart:b,rerollMatrix:C}=Iu(L,vt(ie,bt.randomConfig));Object.assign(t,d),Object.assign(n,m);const w=!C&&b?{matrix:h.value,philicity:f.value,sizeSeeds:g.value}:null;b&&_(),C?a({seed:!0}):w&&((P=w.matrix)==null?void 0:P.length)===V.speciesCount*V.speciesCount&&(V.uploadMatrix(w.matrix,w.philicity,w.sizeSeeds),h.value=V.matrix,f.value=V.philicity,g.value=V.sizeSeeds)}function ce(){const L=i.value;if(!L)return;const V=new Float32Array(L.speciesCount*L.speciesCount);L.uploadMatrix(V,f.value),h.value=V}function te({kind:L,i:V,j:ie,value:d}){const m=i.value;if(m)if(L==="philicity"){const b=Float32Array.from(f.value);b[V]=d,m.uploadMatrix(h.value,b),f.value=b}else{const b=Float32Array.from(h.value);b[V*m.speciesCount+ie]=d,m.uploadMatrix(b,f.value),h.value=b}}function G(L={}){return L.seed||(n.seed=mi()),n.seed}function a(L={}){const V=i.value;if(!V)return;const ie=G(L),d=n.startingMethod%2===1,m=V.speciesCount,b=d?wr(m,n.interactionRange,vt(ie,bt.matrix)):xr(m,n.interactionRange,vt(ie,bt.matrix)),C=Sr(m,vt(ie,bt.philicity)),w=Pr(m,vt(ie,bt.sizeSeeds));V.uploadMatrix(b,C,w),h.value=b,f.value=C,g.value=w}function p(){n.seed=mi(),_()}function Z(L={}){L.seed||(n.seed=mi()),_()}function Ie(){u.value?(t.dt=v||.25,u.value=!1):(v=t.dt,t.dt=0,u.value=!0)}function Ve(L,V=0,ie=0){const d=t.zoom,m=Math.min(nu,Math.max(tu,d*L));if(m===d)return;const b=1/d-1/m;t.zoom=m,t.cameraX+=V*b,t.cameraY+=ie*b}function Ce(L,V){t.cameraX-=L/t.zoom,t.cameraY-=V/t.zoom}function ke(){const L=document.querySelector(".panel");if(!L)return 0;const V=Math.min(window.devicePixelRatio||1,2);return L.getBoundingClientRect().width*V}function kt(){const L=i.value;if(!L){t.cameraX=0,t.cameraY=0,t.zoom=.1;return}const V=ke(),ie=L.fitZoom(V);t.zoom=ie,t.cameraX=V/(2*ie),t.cameraY=0}function Vt(L){E.value||q.value||L.target.tagName==="INPUT"||L.target.tagName==="SELECT"||(L.code==="Space"?(L.preventDefault(),we(Ke)):L.code==="KeyP"?Ie():L.code==="KeyR"?_():L.code==="KeyG"?t.showGrid=!t.showGrid:L.code==="KeyM"?t.mediumEnabled=!t.mediumEnabled:L.code==="KeyV"?t.coreEnabled=!t.coreEnabled:L.code==="KeyF"?document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{}):L.code==="KeyB"?(t.blobsEnabled=!t.blobsEnabled,t.blobsEnabled&&(t.renderMode=1)):L.code==="KeyX"?t.renderMode=(t.renderMode+1)%3:L.code==="KeyH"?c.value=!c.value:L.code==="KeyC"&&kt())}return Qn(()=>window.addEventListener("keydown",Vt)),wn(()=>window.removeEventListener("keydown",Vt)),(L,V)=>(O(),D("div",Nf,[$e(yu,{params:t,onReady:U,onError:V[0]||(V[0]=ie=>s.value=ie),onFps:V[1]||(V[1]=ie=>l.value=ie),onZoom:Ve,onPan:Ce},null,8,["params"]),j.value?(O(),D("button",{key:0,class:"hud",title:"Hide stats",onClick:I},[r("span",_f,k(l.value)+" fps",1),r("span",Vf,k(T.value.toLocaleString())+" agents",1),r("span",Wf,k(y.value)+" species",1),r("span",Gf,"zoom "+k(t.zoom.toFixed(3)),1),r("span",$f," cam ("+k(t.cameraX.toFixed(0))+", "+k(t.cameraY.toFixed(0))+") ",1)])):(O(),D("button",{key:1,class:"hud collapsed",title:`Show stats — ${l.value} fps, ${T.value.toLocaleString()} agents`,onClick:I}," ▸ ",8,jf)),c.value?ve("",!0):(O(),D("button",{key:2,class:"reveal",onClick:V[2]||(V[2]=ie=>c.value=!0)},"Controls")),$($e(Af,{params:t,startup:n,matrix:h.value,philicity:f.value,"core-sizes":S.value,"species-count":y.value,"avg-per-cell":x.value,notice:o.value,paused:u.value,onRestart:Z,onTogglePause:Ie,onRandomizeMatrix:a,onRerollSeed:p,onRandomizeAll:we,onLocks:V[3]||(V[3]=ie=>Be(Ke)?Ke.value=ie:Ke=ie),onEditMatrix:te,onClearMatrix:ce,onResetCamera:kt,onShowAbout:V[4]||(V[4]=ie=>E.value=!0),"applied-name":me.value,onShowConfig:Ct,onApplyConfig:Mt,onCaptureConfig:ut,onHide:V[5]||(V[5]=ie=>c.value=!1)},null,8,["params","startup","matrix","philicity","core-sizes","species-count","avg-per-cell","notice","paused","applied-name"]),[[ka,c.value]]),q.value?(O(),Ti(Uf,{key:3,config:ne.value,onClose:V[6]||(V[6]=ie=>q.value=!1),onApply:Mt},null,8,["config"])):ve("",!0),E.value?(O(),Ti(Of,{key:4,onClose:V[7]||(V[7]=ie=>E.value=!1),"onUpdate:dontShowAgain":R})):ve("",!0),s.value?(O(),D("div",Hf,[V[8]||(V[8]=r("h2",null,"WebGPU unavailable",-1)),r("p",null,k(s.value),1)])):ve("",!0)]))}},qf=Qt(Kf,[["__scopeId","data-v-decc5d36"]]);Ja(qf).mount("#app");
