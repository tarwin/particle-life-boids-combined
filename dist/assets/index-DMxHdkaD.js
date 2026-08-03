var is=e=>{throw TypeError(e)};var Er=(e,t,n)=>t.has(e)||is("Cannot "+n);var ss=(e,t,n)=>t.has(e)?is("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n);var De=(e,t,n)=>(Er(e,t,"access private method"),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();/**
* @vue/shared v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Fi(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const de={},Ut=[],rt=()=>{},io=()=>!1,Gn=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),Wn=e=>e.startsWith("onUpdate:"),Be=Object.assign,Oi=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Ar=Object.prototype.hasOwnProperty,oe=(e,t)=>Ar.call(e,t),Y=Array.isArray,Nt=e=>Sn(e)==="[object Map]",Ht=e=>Sn(e)==="[object Set]",os=e=>Sn(e)==="[object Date]",Q=e=>typeof e=="function",be=e=>typeof e=="string",lt=e=>typeof e=="symbol",ce=e=>e!==null&&typeof e=="object",so=e=>(ce(e)||Q(e))&&Q(e.then)&&Q(e.catch),oo=Object.prototype.toString,Sn=e=>oo.call(e),Br=e=>Sn(e).slice(8,-1),ro=e=>Sn(e)==="[object Object]",zi=e=>be(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,ln=Fi(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),$n=e=>{const t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},Fr=/-\w/g,qe=$n(e=>e.replace(Fr,t=>t.slice(1).toUpperCase())),Or=/\B([A-Z])/g,Rt=$n(e=>e.replace(Or,"-$1").toLowerCase()),lo=$n(e=>e.charAt(0).toUpperCase()+e.slice(1)),ii=$n(e=>e?`on${lo(e)}`:""),ot=(e,t)=>!Object.is(e,t),En=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},ao=(e,t,n,i=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:i,value:n})},jn=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let rs;const Hn=()=>rs||(rs=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function pt(e){if(Y(e)){const t={};for(let n=0;n<e.length;n++){const i=e[n],s=be(i)?Lr(i):pt(i);if(s)for(const o in s)t[o]=s[o]}return t}else if(be(e)||ce(e))return e}const zr=/;(?![^(]*\))/g,Ir=/:([^]+)/,Dr=/\/\*[^]*?\*\//g;function Lr(e){const t={};return e.replace(Dr,"").split(zr).forEach(n=>{if(n){const i=n.split(Ir);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function Me(e){let t="";if(be(e))t=e;else if(Y(e))for(let n=0;n<e.length;n++){const i=Me(e[n]);i&&(t+=i+" ")}else if(ce(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const _r="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Ur=Fi(_r);function co(e){return!!e||e===""}function Nr(e,t){if(e.length!==t.length)return!1;let n=!0;for(let i=0;n&&i<e.length;i++)n=Kt(e[i],t[i]);return n}function Kt(e,t){if(e===t)return!0;let n=os(e),i=os(t);if(n||i)return n&&i?e.getTime()===t.getTime():!1;if(n=lt(e),i=lt(t),n||i)return e===t;if(n=Y(e),i=Y(t),n||i)return n&&i?Nr(e,t):!1;if(n=ce(e),i=ce(t),n||i){if(!n||!i)return!1;const s=Object.keys(e).length,o=Object.keys(t).length;if(s!==o)return!1;for(const r in e){const a=e.hasOwnProperty(r),u=t.hasOwnProperty(r);if(a&&!u||!a&&u||!Kt(e[r],t[r]))return!1}}return String(e)===String(t)}function Ii(e,t){return e.findIndex(n=>Kt(n,t))}const uo=e=>!!(e&&e.__v_isRef===!0),k=e=>be(e)?e:e==null?"":Y(e)||ce(e)&&(e.toString===oo||!Q(e.toString))?uo(e)?k(e.value):JSON.stringify(e,fo,2):String(e),fo=(e,t)=>uo(t)?fo(e,t.value):Nt(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[i,s],o)=>(n[si(i,o)+" =>"]=s,n),{})}:Ht(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>si(n))}:lt(t)?si(t):ce(t)&&!Y(t)&&!ro(t)?String(t):t,si=(e,t="")=>{var n;return lt(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Re;class Vr{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&Re&&(Re.active?(this.parent=Re,this.index=(Re.scopes||(Re.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes){const i=this.scopes.slice();for(t=0,n=i.length;t<n;t++)i[t].pause()}for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes){const s=this.scopes.slice();for(t=0,n=s.length;t<n;t++)s[t].resume()}const i=this.effects.slice();for(t=0,n=i.length;t<n;t++)i[t].resume()}}run(t){if(this._active){const n=Re;try{return Re=this,t()}finally{Re=n}}}on(){++this._on===1&&(this.prevScope=Re,Re=this)}off(){if(this._on>0&&--this._on===0){if(Re===this)Re=this.prevScope;else{let t=Re;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let n,i;for(n=0,i=this.effects.length;n<i;n++)this.effects[n].stop();for(this.effects.length=0,n=0,i=this.cleanups.length;n<i;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){const s=this.scopes.slice();for(n=0,i=s.length;n<i;n++)s[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Gr(){return Re}let fe;const oi=new WeakSet;class po{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Re&&(Re.active?Re.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,oi.has(this)&&(oi.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||mo(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,ls(this),go(this);const t=fe,n=Ye;fe=this,Ye=!0;try{return this.fn()}finally{bo(this),fe=t,Ye=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)_i(t);this.deps=this.depsTail=void 0,ls(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?oi.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){bi(this)&&this.run()}get dirty(){return bi(this)}}let ho=0,an,cn;function mo(e,t=!1){if(e.flags|=8,t){e.next=cn,cn=e;return}e.next=an,an=e}function Di(){ho++}function Li(){if(--ho>0)return;if(cn){let t=cn;for(cn=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;an;){let t=an;for(an=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){e||(e=i)}t=n}}if(e)throw e}function go(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function bo(e){let t,n=e.depsTail,i=n;for(;i;){const s=i.prevDep;i.version===-1?(i===n&&(n=s),_i(i),Wr(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}e.deps=t,e.depsTail=n}function bi(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(vo(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function vo(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===hn)||(e.globalVersion=hn,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!bi(e))))return;e.flags|=2;const t=e.dep,n=fe,i=Ye;fe=e,Ye=!0;try{go(e);const s=e.fn(e._value);(t.version===0||ot(s,e._value))&&(e.flags|=128,e._value=s,t.version++)}catch(s){throw t.version++,s}finally{fe=n,Ye=i,bo(e),e.flags&=-3}}function _i(e,t=!1){const{dep:n,prevSub:i,nextSub:s}=e;if(i&&(i.nextSub=s,e.prevSub=void 0),s&&(s.prevSub=i,e.nextSub=void 0),n.subs===e&&(n.subs=i,!i&&n.computed)){n.computed.flags&=-5;for(let o=n.computed.deps;o;o=o.nextDep)_i(o,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Wr(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let Ye=!0;const yo=[];function yt(){yo.push(Ye),Ye=!1}function xt(){const e=yo.pop();Ye=e===void 0?!0:e}function ls(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=fe;fe=void 0;try{t()}finally{fe=n}}}let hn=0;class $r{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Ui{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!fe||!Ye||fe===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==fe)n=this.activeLink=new $r(fe,this),fe.deps?(n.prevDep=fe.depsTail,fe.depsTail.nextDep=n,fe.depsTail=n):fe.deps=fe.depsTail=n,xo(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const i=n.nextDep;i.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=i),n.prevDep=fe.depsTail,n.nextDep=void 0,fe.depsTail.nextDep=n,fe.depsTail=n,fe.deps===n&&(fe.deps=i)}return n}trigger(t){this.version++,hn++,this.notify(t)}notify(t){Di();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Li()}}}function xo(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)xo(i)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const vi=new WeakMap,Ot=Symbol(""),yi=Symbol(""),mn=Symbol("");function Ee(e,t,n){if(Ye&&fe){let i=vi.get(e);i||vi.set(e,i=new Map);let s=i.get(n);s||(i.set(n,s=new Ui),s.map=i,s.key=n),s.track()}}function ht(e,t,n,i,s,o){const r=vi.get(e);if(!r){hn++;return}const a=u=>{u&&u.trigger()};if(Di(),t==="clear")r.forEach(a);else{const u=Y(e),h=u&&zi(n);if(u&&n==="length"){const f=Number(i);r.forEach((g,S)=>{(S==="length"||S===mn||!lt(S)&&S>=f)&&a(g)})}else switch((n!==void 0||r.has(void 0))&&a(r.get(n)),h&&a(r.get(mn)),t){case"add":u?h&&a(r.get("length")):(a(r.get(Ot)),Nt(e)&&a(r.get(yi)));break;case"delete":u||(a(r.get(Ot)),Nt(e)&&a(r.get(yi)));break;case"set":Nt(e)&&a(r.get(Ot));break}}Li()}function Lt(e){const t=se(e);return t===e?t:(Ee(t,"iterate",mn),He(e)?t:t.map(Je))}function Kn(e){return Ee(e=se(e),"iterate",mn),e}function it(e,t){return St(e)?Wt(zt(e)?Je(t):t):Je(t)}const jr={__proto__:null,[Symbol.iterator](){return ri(this,Symbol.iterator,e=>it(this,e))},concat(...e){return Lt(this).concat(...e.map(t=>Y(t)?Lt(t):t))},entries(){return ri(this,"entries",e=>(e[1]=it(this,e[1]),e))},every(e,t){return ct(this,"every",e,t,void 0,arguments)},filter(e,t){return ct(this,"filter",e,t,n=>n.map(i=>it(this,i)),arguments)},find(e,t){return ct(this,"find",e,t,n=>it(this,n),arguments)},findIndex(e,t){return ct(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return ct(this,"findLast",e,t,n=>it(this,n),arguments)},findLastIndex(e,t){return ct(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return ct(this,"forEach",e,t,void 0,arguments)},includes(...e){return li(this,"includes",e)},indexOf(...e){return li(this,"indexOf",e)},join(e){return Lt(this).join(e)},lastIndexOf(...e){return li(this,"lastIndexOf",e)},map(e,t){return ct(this,"map",e,t,void 0,arguments)},pop(){return Jt(this,"pop")},push(...e){return Jt(this,"push",e)},reduce(e,...t){return as(this,"reduce",e,t)},reduceRight(e,...t){return as(this,"reduceRight",e,t)},shift(){return Jt(this,"shift")},some(e,t){return ct(this,"some",e,t,void 0,arguments)},splice(...e){return Jt(this,"splice",e)},toReversed(){return Lt(this).toReversed()},toSorted(e){return Lt(this).toSorted(e)},toSpliced(...e){return Lt(this).toSpliced(...e)},unshift(...e){return Jt(this,"unshift",e)},values(){return ri(this,"values",e=>it(this,e))}};function ri(e,t,n){const i=Kn(e),s=i[t]();return i!==e&&!He(e)&&(s._next=s.next,s.next=()=>{const o=s._next();return o.done||(o.value=n(o.value)),o}),s}const Hr=Array.prototype;function ct(e,t,n,i,s,o){const r=Kn(e),a=r!==e&&!He(e),u=r[t];if(u!==Hr[t]){const g=u.apply(e,o);return a?Je(g):g}let h=n;r!==e&&(a?h=function(g,S){return n.call(this,it(e,g),S,e)}:n.length>2&&(h=function(g,S){return n.call(this,g,S,e)}));const f=u.call(r,h,i);return a&&s?s(f):f}function as(e,t,n,i){const s=Kn(e),o=s!==e&&!He(e);let r=n,a=!1;s!==e&&(o?(a=i.length===0,r=function(h,f,g){return a&&(a=!1,h=it(e,h)),n.call(this,h,it(e,f),g,e)}):n.length>3&&(r=function(h,f,g){return n.call(this,h,f,g,e)}));const u=s[t](r,...i);return a?it(e,u):u}function li(e,t,n){const i=se(e);Ee(i,"iterate",mn);const s=i[t](...n);return(s===-1||s===!1)&&Gi(n[0])?(n[0]=se(n[0]),i[t](...n)):s}function Jt(e,t,n=[]){yt(),Di();const i=se(e)[t].apply(e,n);return Li(),xt(),i}const Kr=Fi("__proto__,__v_isRef,__isVue"),So=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(lt));function qr(e){lt(e)||(e=String(e));const t=se(this);return Ee(t,"has",e),t.hasOwnProperty(e)}class wo{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,i){if(n==="__v_skip")return t.__v_skip;const s=this._isReadonly,o=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return o;if(n==="__v_raw")return i===(s?o?sl:ko:o?Mo:Po).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const r=Y(t);if(!s){let u;if(r&&(u=jr[n]))return u;if(n==="hasOwnProperty")return qr}const a=Reflect.get(t,n,Ae(t)?t:i);if((lt(n)?So.has(n):Kr(n))||(s||Ee(t,"get",n),o))return a;if(Ae(a)){const u=r&&zi(n)?a:a.value;return s&&ce(u)?Si(u):u}return ce(a)?s?Si(a):gn(a):a}}class Co extends wo{constructor(t=!1){super(!1,t)}set(t,n,i,s){let o=t[n];const r=Y(t)&&zi(n);if(!this._isShallow){const h=St(o);if(!He(i)&&!St(i)&&(o=se(o),i=se(i)),!r&&Ae(o)&&!Ae(i))return h||(o.value=i),!0}const a=r?Number(n)<t.length:oe(t,n),u=Reflect.set(t,n,i,Ae(t)?t:s);return t===se(s)&&u&&(a?ot(i,o)&&ht(t,"set",n,i):ht(t,"add",n,i)),u}deleteProperty(t,n){const i=oe(t,n);t[n];const s=Reflect.deleteProperty(t,n);return s&&i&&ht(t,"delete",n,void 0),s}has(t,n){const i=Reflect.has(t,n);return(!lt(n)||!So.has(n))&&Ee(t,"has",n),i}ownKeys(t){return Ee(t,"iterate",Y(t)?"length":Ot),Reflect.ownKeys(t)}}class Yr extends wo{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const Jr=new Co,Xr=new Yr,Zr=new Co(!0);const xi=e=>e,Mn=e=>Reflect.getPrototypeOf(e);function Qr(e,t,n){return function(...i){const s=this.__v_raw,o=se(s),r=Nt(o),a=e==="entries"||e===Symbol.iterator&&r,u=e==="keys"&&r,h=s[e](...i),f=n?xi:t?Wt:Je;return!t&&Ee(o,"iterate",u?yi:Ot),Be(Object.create(h),{next(){const{value:g,done:S}=h.next();return S?{value:g,done:S}:{value:a?[f(g[0]),f(g[1])]:f(g),done:S}}})}}function kn(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function el(e,t){const n={get(s){const o=this.__v_raw,r=se(o),a=se(s);e||(ot(s,a)&&Ee(r,"get",s),Ee(r,"get",a));const{has:u}=Mn(r),h=t?xi:e?Wt:Je;if(u.call(r,s))return h(o.get(s));if(u.call(r,a))return h(o.get(a));o!==r&&o.get(s)},get size(){const s=this.__v_raw;return!e&&Ee(se(s),"iterate",Ot),s.size},has(s){const o=this.__v_raw,r=se(o),a=se(s);return e||(ot(s,a)&&Ee(r,"has",s),Ee(r,"has",a)),s===a?o.has(s):o.has(s)||o.has(a)},forEach(s,o){const r=this,a=r.__v_raw,u=se(a),h=t?xi:e?Wt:Je;return!e&&Ee(u,"iterate",Ot),a.forEach((f,g)=>s.call(o,h(f),h(g),r))}};return Be(n,e?{add:kn("add"),set:kn("set"),delete:kn("delete"),clear:kn("clear")}:{add(s){const o=se(this),r=Mn(o),a=se(s),u=!t&&!He(s)&&!St(s)?a:s;return r.has.call(o,u)||ot(s,u)&&r.has.call(o,s)||ot(a,u)&&r.has.call(o,a)||(o.add(u),ht(o,"add",u,u)),this},set(s,o){!t&&!He(o)&&!St(o)&&(o=se(o));const r=se(this),{has:a,get:u}=Mn(r);let h=a.call(r,s);h||(s=se(s),h=a.call(r,s));const f=u.call(r,s);return r.set(s,o),h?ot(o,f)&&ht(r,"set",s,o):ht(r,"add",s,o),this},delete(s){const o=se(this),{has:r,get:a}=Mn(o);let u=r.call(o,s);u||(s=se(s),u=r.call(o,s)),a&&a.call(o,s);const h=o.delete(s);return u&&ht(o,"delete",s,void 0),h},clear(){const s=se(this),o=s.size!==0,r=s.clear();return o&&ht(s,"clear",void 0,void 0),r}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=Qr(s,e,t)}),n}function Ni(e,t){const n=el(e,t);return(i,s,o)=>s==="__v_isReactive"?!e:s==="__v_isReadonly"?e:s==="__v_raw"?i:Reflect.get(oe(n,s)&&s in i?n:i,s,o)}const tl={get:Ni(!1,!1)},nl={get:Ni(!1,!0)},il={get:Ni(!0,!1)};const Po=new WeakMap,Mo=new WeakMap,ko=new WeakMap,sl=new WeakMap;function ol(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function gn(e){return St(e)?e:Vi(e,!1,Jr,tl,Po)}function rl(e){return Vi(e,!1,Zr,nl,Mo)}function Si(e){return Vi(e,!0,Xr,il,ko)}function Vi(e,t,n,i,s){if(!ce(e)||e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;const o=s.get(e);if(o)return o;const r=ol(Br(e));if(r===0)return e;const a=new Proxy(e,r===2?i:n);return s.set(e,a),a}function zt(e){return St(e)?zt(e.__v_raw):!!(e&&e.__v_isReactive)}function St(e){return!!(e&&e.__v_isReadonly)}function He(e){return!!(e&&e.__v_isShallow)}function Gi(e){return e?!!e.__v_raw:!1}function se(e){const t=e&&e.__v_raw;return t?se(t):e}function ll(e){return!oe(e,"__v_skip")&&Object.isExtensible(e)&&ao(e,"__v_skip",!0),e}const Je=e=>ce(e)?gn(e):e,Wt=e=>ce(e)?Si(e):e;function Ae(e){return e?e.__v_isRef===!0:!1}function pe(e){return Ro(e,!1)}function Xt(e){return Ro(e,!0)}function Ro(e,t){return Ae(e)?e:new al(e,t)}class al{constructor(t,n){this.dep=new Ui,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:se(t),this._value=n?t:Je(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,i=this.__v_isShallow||He(t)||St(t);t=i?t:se(t),ot(t,n)&&(this._rawValue=t,this._value=i?t:Je(t),this.dep.trigger())}}function we(e){return Ae(e)?e.value:e}const cl={get:(e,t,n)=>t==="__v_raw"?e:we(Reflect.get(e,t,n)),set:(e,t,n,i)=>{const s=e[t];return Ae(s)&&!Ae(n)?(s.value=n,!0):Reflect.set(e,t,n,i)}};function To(e){return zt(e)?e:new Proxy(e,cl)}class ul{constructor(t,n,i){this.fn=t,this.setter=n,this._value=void 0,this.dep=new Ui(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=hn-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&fe!==this)return mo(this,!0),!0}get value(){const t=this.dep.track();return vo(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function dl(e,t,n=!1){let i,s;return Q(e)?i=e:(i=e.get,s=e.set),new ul(i,s,n)}const Rn={},zn=new WeakMap;let Bt;function fl(e,t=!1,n=Bt){if(n){let i=zn.get(n);i||zn.set(n,i=[]),i.push(e)}}function pl(e,t,n=de){const{immediate:i,deep:s,once:o,scheduler:r,augmentJob:a,call:u}=n,h=v=>s?v:He(v)||s===!1||s===0?mt(v,1):mt(v);let f,g,S,y,T=!1,x=!1;if(Ae(e)?(g=()=>e.value,T=He(e)):zt(e)?(g=()=>h(e),T=!0):Y(e)?(x=!0,T=e.some(v=>zt(v)||He(v)),g=()=>e.map(v=>{if(Ae(v))return v.value;if(zt(v))return h(v);if(Q(v))return u?u(v,2):v()})):Q(e)?t?g=u?()=>u(e,2):e:g=()=>{if(S){yt();try{S()}finally{xt()}}const v=Bt;Bt=f;try{return u?u(e,3,[y]):e(y)}finally{Bt=v}}:g=rt,t&&s){const v=g,R=s===!0?1/0:s;g=()=>mt(v(),R)}const K=Gr(),G=()=>{f.stop(),K&&K.active&&Oi(K.effects,f)};if(o&&t){const v=t;t=(...R)=>{const _=v(...R);return G(),_}}let F=x?new Array(e.length).fill(Rn):Rn;const E=v=>{if(!(!(f.flags&1)||!f.dirty&&!v))if(t){const R=f.run();if(v||s||T||(x?R.some((_,N)=>ot(_,F[N])):ot(R,F))){S&&S();const _=Bt;Bt=f;try{const N=[R,F===Rn?void 0:x&&F[0]===Rn?[]:F,y];F=R,u?u(t,3,N):t(...N)}finally{Bt=_}}}else f.run()};return a&&a(E),f=new po(g),f.scheduler=r?()=>r(E,!1):E,y=v=>fl(v,!1,f),S=f.onStop=()=>{const v=zn.get(f);if(v){if(u)u(v,4);else for(const R of v)R();zn.delete(f)}},t?i?E(!0):F=f.run():r?r(E.bind(null,!0),!0):f.run(),G.pause=f.pause.bind(f),G.resume=f.resume.bind(f),G.stop=G,G}function mt(e,t=1/0,n){if(t<=0||!ce(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,Ae(e))mt(e.value,t,n);else if(Y(e))for(let i=0;i<e.length;i++)mt(e[i],t,n);else if(Ht(e)||Nt(e))e.forEach(i=>{mt(i,t,n)});else if(ro(e)){for(const i in e)mt(e[i],t,n);for(const i of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,i)&&mt(e[i],t,n)}return e}/**
* @vue/runtime-core v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function wn(e,t,n,i){try{return i?e(...i):e()}catch(s){qn(s,t,n)}}function Xe(e,t,n,i){if(Q(e)){const s=wn(e,t,n,i);return s&&so(s)&&s.catch(o=>{qn(o,t,n)}),s}if(Y(e)){const s=[];for(let o=0;o<e.length;o++)s.push(Xe(e[o],t,n,i));return s}}function qn(e,t,n,i=!0){const s=t?t.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:r}=t&&t.appContext.config||de;if(t){let a=t.parent;const u=t.proxy,h=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const f=a.ec;if(f){for(let g=0;g<f.length;g++)if(f[g](e,u,h)===!1)return}a=a.parent}if(o){yt(),wn(o,null,10,[e,u,h]),xt();return}}hl(e,n,s,i,r)}function hl(e,t,n,i=!0,s=!1){if(s)throw e;console.error(e)}const Oe=[];let nt=-1;const Vt=[];let Pt=null,_t=0;const Eo=Promise.resolve();let In=null;function Wi(e){const t=In||Eo;return e?t.then(this?e.bind(this):e):t}function ml(e){let t=nt+1,n=Oe.length;for(;t<n;){const i=t+n>>>1,s=Oe[i],o=bn(s);o<e||o===e&&s.flags&2?t=i+1:n=i}return t}function $i(e){if(!(e.flags&1)){const t=bn(e),n=Oe[Oe.length-1];!n||!(e.flags&2)&&t>=bn(n)?Oe.push(e):Oe.splice(ml(t),0,e),e.flags|=1,Ao()}}function Ao(){In||(In=Eo.then(Fo))}function gl(e){Y(e)?Vt.push(...e):Pt&&e.id===-1?Pt.splice(_t+1,0,e):e.flags&1||(Vt.push(e),e.flags|=1),Ao()}function cs(e,t,n=nt+1){for(;n<Oe.length;n++){const i=Oe[n];if(i&&i.flags&2){if(e&&i.id!==e.uid)continue;Oe.splice(n,1),n--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Bo(e){if(Vt.length){const t=[...new Set(Vt)].sort((n,i)=>bn(n)-bn(i));if(Vt.length=0,Pt){Pt.push(...t);return}for(Pt=t,_t=0;_t<Pt.length;_t++){const n=Pt[_t];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Pt=null,_t=0}}const bn=e=>e.id==null?e.flags&2?-1:1/0:e.id;function Fo(e){try{for(nt=0;nt<Oe.length;nt++){const t=Oe[nt];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),wn(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;nt<Oe.length;nt++){const t=Oe[nt];t&&(t.flags&=-2)}nt=-1,Oe.length=0,Bo(),In=null,(Oe.length||Vt.length)&&Fo()}}let je=null,Oo=null;function Dn(e){const t=je;return je=e,Oo=e&&e.type.__scopeId||null,t}function bl(e,t=je,n){if(!t||e._n)return e;const i=(...s)=>{i._d&&xs(-1);const o=Dn(t),r=It.length;let a;try{a=e(...s)}finally{for(let u=It.length;u>r;u--)ir();Dn(o),i._d&&xs(1)}return a};return i._n=!0,i._c=!0,i._d=!0,i}function q(e,t){if(je===null)return e;const n=Zn(je),i=e.dirs||(e.dirs=[]);for(let s=0;s<t.length;s++){let[o,r,a,u=de]=t[s];o&&(Q(o)&&(o={mounted:o,updated:o}),o.deep&&mt(r),i.push({dir:o,instance:n,value:r,oldValue:void 0,arg:a,modifiers:u}))}return e}function Et(e,t,n,i){const s=e.dirs,o=t&&t.dirs;for(let r=0;r<s.length;r++){const a=s[r];o&&(a.oldValue=o[r].value);let u=a.dir[i];u&&(yt(),Xe(u,n,8,[e.el,a,e,t]),xt())}}function vl(e,t){if(ze){let n=ze.provides;const i=ze.parent&&ze.parent.provides;i===n&&(n=ze.provides=Object.create(i)),n[e]=t}}function An(e,t,n=!1){const i=pa();if(i||Gt){let s=Gt?Gt._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&e in s)return s[e];if(arguments.length>1)return n&&Q(t)?t.call(i&&i.proxy):t}}const yl=Symbol.for("v-scx"),xl=()=>An(yl);function un(e,t,n){return zo(e,t,n)}function zo(e,t,n=de){const{immediate:i,deep:s,flush:o,once:r}=n,a=Be({},n),u=t&&i||!t&&o!=="post";let h;if(yn){if(o==="sync"){const y=xl();h=y.__watcherHandles||(y.__watcherHandles=[])}else if(!u){const y=()=>{};return y.stop=rt,y.resume=rt,y.pause=rt,y}}const f=ze;a.call=(y,T,x)=>Xe(y,f,T,x);let g=!1;o==="post"?a.scheduler=y=>{_e(y,f&&f.suspense)}:o!=="sync"&&(g=!0,a.scheduler=(y,T)=>{T?y():$i(y)}),a.augmentJob=y=>{t&&(y.flags|=4),g&&(y.flags|=2,f&&(y.id=f.uid,y.i=f))};const S=pl(e,t,a);return yn&&(h?h.push(S):u&&S()),S}function Sl(e,t,n){const i=this.proxy,s=be(e)?e.includes(".")?Io(i,e):()=>i[e]:e.bind(i,i);let o;Q(t)?o=t:(o=t.handler,n=t);const r=Cn(this),a=zo(s,o.bind(i),n);return r(),a}function Io(e,t){const n=t.split(".");return()=>{let i=e;for(let s=0;s<n.length&&i;s++)i=i[n[s]];return i}}const wl=Symbol("_vte"),Cl=e=>e.__isTeleport,ai=Symbol("_leaveCb");function ji(e,t){e.shapeFlag&6&&e.component?(e.transition=t,ji(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Do(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function us(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}const Ln=new WeakMap;function dn(e,t,n,i,s=!1){if(Y(e)){e.forEach((x,K)=>dn(x,t&&(Y(t)?t[K]:t),n,i,s));return}if(fn(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&dn(e,t,n,i.component.subTree);return}const o=i.shapeFlag&4?Zn(i.component):i.el,r=s?null:o,{i:a,r:u}=e,h=t&&t.r,f=a.refs===de?a.refs={}:a.refs,g=a.setupState,S=se(g),y=g===de?io:x=>us(f,x)?!1:oe(S,x),T=(x,K)=>!(K&&us(f,K));if(h!=null&&h!==u){if(ds(t),be(h))f[h]=null,y(h)&&(g[h]=null);else if(Ae(h)){const x=t;T(h,x.k)&&(h.value=null),x.k&&(f[x.k]=null)}}if(Q(u))wn(u,a,12,[r,f]);else{const x=be(u),K=Ae(u);if(x||K){const G=()=>{if(e.f){const F=x?y(u)?g[u]:f[u]:T()||!e.k?u.value:f[e.k];if(s)Y(F)&&Oi(F,o);else if(Y(F))F.includes(o)||F.push(o);else if(x)f[u]=[o],y(u)&&(g[u]=f[u]);else{const E=[o];T(u,e.k)&&(u.value=E),e.k&&(f[e.k]=E)}}else x?(f[u]=r,y(u)&&(g[u]=r)):K&&(T(u,e.k)&&(u.value=r),e.k&&(f[e.k]=r))};if(r){const F=()=>{G(),Ln.delete(e)};F.id=-1,Ln.set(e,F),_e(F,n)}else ds(e),G()}}}function ds(e){const t=Ln.get(e);t&&(t.flags|=8,Ln.delete(e))}Hn().requestIdleCallback;Hn().cancelIdleCallback;const fn=e=>!!e.type.__asyncLoader,Lo=e=>e.type.__isKeepAlive;function Pl(e,t){_o(e,"a",t)}function Ml(e,t){_o(e,"da",t)}function _o(e,t,n=ze){const i=e.__wdc||(e.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return e()});if(Yn(t,i,n),n){let s=n.parent;for(;s&&s.parent;)Lo(s.parent.vnode)&&kl(i,t,n,s),s=s.parent}}function kl(e,t,n,i){const s=Yn(t,e,i,!0);Uo(()=>{Oi(i[t],s)},n)}function Yn(e,t,n=ze,i=!1){if(n){const s=n[e]||(n[e]=[]),o=t.__weh||(t.__weh=(...r)=>{yt();const a=Cn(n),u=Xe(t,n,e,r);return a(),xt(),u});return i?s.unshift(o):s.push(o),o}}const wt=e=>(t,n=ze)=>{(!yn||e==="sp")&&Yn(e,(...i)=>t(...i),n)},Rl=wt("bm"),Hi=wt("m"),Tl=wt("bu"),El=wt("u"),Ki=wt("bum"),Uo=wt("um"),Al=wt("sp"),Bl=wt("rtg"),Fl=wt("rtc");function Ol(e,t=ze){Yn("ec",e,t)}const zl=Symbol.for("v-ndc");function ge(e,t,n,i){let s;const o=n,r=Y(e);if(r||be(e)){const a=r&&zt(e);let u=!1,h=!1;a&&(u=!He(e),h=St(e),e=Kn(e)),s=new Array(e.length);for(let f=0,g=e.length;f<g;f++)s[f]=t(u?h?Wt(Je(e[f])):Je(e[f]):e[f],f,void 0,o)}else if(typeof e=="number"){s=new Array(e);for(let a=0;a<e;a++)s[a]=t(a+1,a,void 0,o)}else if(ce(e))if(e[Symbol.iterator])s=Array.from(e,(a,u)=>t(a,u,void 0,o));else{const a=Object.keys(e);s=new Array(a.length);for(let u=0,h=a.length;u<h;u++){const f=a[u];s[u]=t(e[f],f,u,o)}}else s=[];return s}const wi=e=>e?ar(e)?Zn(e):wi(e.parent):null,pn=Be(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>wi(e.parent),$root:e=>wi(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Vo(e),$forceUpdate:e=>e.f||(e.f=()=>{$i(e.update)}),$nextTick:e=>e.n||(e.n=Wi.bind(e.proxy)),$watch:e=>Sl.bind(e)}),ci=(e,t)=>e!==de&&!e.__isScriptSetup&&oe(e,t),Il={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:i,data:s,props:o,accessCache:r,type:a,appContext:u}=e;if(t[0]!=="$"){const S=r[t];if(S!==void 0)switch(S){case 1:return i[t];case 2:return s[t];case 4:return n[t];case 3:return o[t]}else{if(ci(i,t))return r[t]=1,i[t];if(s!==de&&oe(s,t))return r[t]=2,s[t];if(oe(o,t))return r[t]=3,o[t];if(n!==de&&oe(n,t))return r[t]=4,n[t];Ci&&(r[t]=0)}}const h=pn[t];let f,g;if(h)return t==="$attrs"&&Ee(e.attrs,"get",""),h(e);if((f=a.__cssModules)&&(f=f[t]))return f;if(n!==de&&oe(n,t))return r[t]=4,n[t];if(g=u.config.globalProperties,oe(g,t))return g[t]},set({_:e},t,n){const{data:i,setupState:s,ctx:o}=e;return ci(s,t)?(s[t]=n,!0):i!==de&&oe(i,t)?(i[t]=n,!0):oe(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(o[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:i,appContext:s,props:o,type:r}},a){let u;return!!(n[a]||e!==de&&a[0]!=="$"&&oe(e,a)||ci(t,a)||oe(o,a)||oe(i,a)||oe(pn,a)||oe(s.config.globalProperties,a)||(u=r.__cssModules)&&u[a])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:oe(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function fs(e){return Y(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let Ci=!0;function Dl(e){const t=Vo(e),n=e.proxy,i=e.ctx;Ci=!1,t.beforeCreate&&ps(t.beforeCreate,e,"bc");const{data:s,computed:o,methods:r,watch:a,provide:u,inject:h,created:f,beforeMount:g,mounted:S,beforeUpdate:y,updated:T,activated:x,deactivated:K,beforeDestroy:G,beforeUnmount:F,destroyed:E,unmounted:v,render:R,renderTracked:_,renderTriggered:N,errorCaptured:J,serverPrefetch:ie,expose:he,inheritAttrs:Ie,components:Ct,directives:$e,filters:j}=t;if(h&&Ll(h,i,null),r)for(const V in r){const ee=r[V];Q(ee)&&(i[V]=ee.bind(n))}if(s){const V=s.call(n,n);ce(V)&&(e.data=gn(V))}if(Ci=!0,o)for(const V in o){const ee=o[V],ye=Q(ee)?ee.bind(n,n):Q(ee.get)?ee.get.bind(n,n):rt,ve=!Q(ee)&&Q(ee.set)?ee.set.bind(n):rt,Pe=Ke({get:ye,set:ve});Object.defineProperty(i,V,{enumerable:!0,configurable:!0,get:()=>Pe.value,set:Ue=>Pe.value=Ue})}if(a)for(const V in a)No(a[V],i,n,V);if(u){const V=Q(u)?u.call(n):u;Reflect.ownKeys(V).forEach(ee=>{vl(ee,V[ee])})}f&&ps(f,e,"c");function p(V,ee){Y(ee)?ee.forEach(ye=>V(ye.bind(n))):ee&&V(ee.bind(n))}if(p(Rl,g),p(Hi,S),p(Tl,y),p(El,T),p(Pl,x),p(Ml,K),p(Ol,J),p(Fl,_),p(Bl,N),p(Ki,F),p(Uo,v),p(Al,ie),Y(he))if(he.length){const V=e.exposed||(e.exposed={});he.forEach(ee=>{Object.defineProperty(V,ee,{get:()=>n[ee],set:ye=>n[ee]=ye,enumerable:!0})})}else e.exposed||(e.exposed={});R&&e.render===rt&&(e.render=R),Ie!=null&&(e.inheritAttrs=Ie),Ct&&(e.components=Ct),$e&&(e.directives=$e),ie&&Do(e)}function Ll(e,t,n=rt){Y(e)&&(e=Pi(e));for(const i in e){const s=e[i];let o;ce(s)?"default"in s?o=An(s.from||i,s.default,!0):o=An(s.from||i):o=An(s),Ae(o)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>o.value,set:r=>o.value=r}):t[i]=o}}function ps(e,t,n){Xe(Y(e)?e.map(i=>i.bind(t.proxy)):e.bind(t.proxy),t,n)}function No(e,t,n,i){let s=i.includes(".")?Io(n,i):()=>n[i];if(be(e)){const o=t[e];Q(o)&&un(s,o)}else if(Q(e))un(s,e.bind(n));else if(ce(e))if(Y(e))e.forEach(o=>No(o,t,n,i));else{const o=Q(e.handler)?e.handler.bind(n):t[e.handler];Q(o)&&un(s,o,e)}}function Vo(e){const t=e.type,{mixins:n,extends:i}=t,{mixins:s,optionsCache:o,config:{optionMergeStrategies:r}}=e.appContext,a=o.get(t);let u;return a?u=a:!s.length&&!n&&!i?u=t:(u={},s.length&&s.forEach(h=>_n(u,h,r,!0)),_n(u,t,r)),ce(t)&&o.set(t,u),u}function _n(e,t,n,i=!1){const{mixins:s,extends:o}=t;o&&_n(e,o,n,!0),s&&s.forEach(r=>_n(e,r,n,!0));for(const r in t)if(!(i&&r==="expose")){const a=_l[r]||n&&n[r];e[r]=a?a(e[r],t[r]):t[r]}return e}const _l={data:hs,props:ms,emits:ms,methods:tn,computed:tn,beforeCreate:Fe,created:Fe,beforeMount:Fe,mounted:Fe,beforeUpdate:Fe,updated:Fe,beforeDestroy:Fe,beforeUnmount:Fe,destroyed:Fe,unmounted:Fe,activated:Fe,deactivated:Fe,errorCaptured:Fe,serverPrefetch:Fe,components:tn,directives:tn,watch:Nl,provide:hs,inject:Ul};function hs(e,t){return t?e?function(){return Be(Q(e)?e.call(this,this):e,Q(t)?t.call(this,this):t)}:t:e}function Ul(e,t){return tn(Pi(e),Pi(t))}function Pi(e){if(Y(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function Fe(e,t){return e?[...new Set([].concat(e,t))]:t}function tn(e,t){return e?Be(Object.create(null),e,t):t}function ms(e,t){return e?Y(e)&&Y(t)?[...new Set([...e,...t])]:Be(Object.create(null),fs(e),fs(t??{})):t}function Nl(e,t){if(!e)return t;if(!t)return e;const n=Be(Object.create(null),e);for(const i in t)n[i]=Fe(e[i],t[i]);return n}function Go(){return{app:null,config:{isNativeTag:io,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Vl=0;function Gl(e,t){return function(i,s=null){Q(i)||(i=Be({},i)),s!=null&&!ce(s)&&(s=null);const o=Go(),r=new WeakSet,a=[];let u=!1;const h=o.app={_uid:Vl++,_component:i,_props:s,_container:null,_context:o,_instance:null,version:ya,get config(){return o.config},set config(f){},use(f,...g){return r.has(f)||(f&&Q(f.install)?(r.add(f),f.install(h,...g)):Q(f)&&(r.add(f),f(h,...g))),h},mixin(f){return o.mixins.includes(f)||o.mixins.push(f),h},component(f,g){return g?(o.components[f]=g,h):o.components[f]},directive(f,g){return g?(o.directives[f]=g,h):o.directives[f]},mount(f,g,S){if(!u){const y=h._ceVNode||We(i,s);return y.appContext=o,S===!0?S="svg":S===!1&&(S=void 0),e(y,f,S),u=!0,h._container=f,f.__vue_app__=h,Zn(y.component)}},onUnmount(f){a.push(f)},unmount(){u&&(Xe(a,h._instance,16),e(null,h._container),delete h._container.__vue_app__)},provide(f,g){return o.provides[f]=g,h},runWithContext(f){const g=Gt;Gt=h;try{return f()}finally{Gt=g}}};return h}}let Gt=null;const Wl=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${qe(t)}Modifiers`]||e[`${Rt(t)}Modifiers`];function $l(e,t,...n){if(e.isUnmounted)return;const i=e.vnode.props||de;let s=n;const o=t.startsWith("update:"),r=o&&Wl(i,t.slice(7));r&&(r.trim&&(s=n.map(f=>be(f)?f.trim():f)),r.number&&(s=n.map(jn)));let a,u=i[a=ii(t)]||i[a=ii(qe(t))];!u&&o&&(u=i[a=ii(Rt(t))]),u&&Xe(u,e,6,s);const h=i[a+"Once"];if(h){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,Xe(h,e,6,s)}}const jl=new WeakMap;function Wo(e,t,n=!1){const i=n?jl:t.emitsCache,s=i.get(e);if(s!==void 0)return s;const o=e.emits;let r={},a=!1;if(!Q(e)){const u=h=>{const f=Wo(h,t,!0);f&&(a=!0,Be(r,f))};!n&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}return!o&&!a?(ce(e)&&i.set(e,null),null):(Y(o)?o.forEach(u=>r[u]=null):Be(r,o),ce(e)&&i.set(e,r),r)}function Jn(e,t){return!e||!Gn(t)?!1:(t=t.slice(2),t=t==="Once"?t:t.replace(/Once$/,""),oe(e,t[0].toLowerCase()+t.slice(1))||oe(e,Rt(t))||oe(e,t))}function gs(e){const{type:t,vnode:n,proxy:i,withProxy:s,propsOptions:[o],slots:r,attrs:a,emit:u,render:h,renderCache:f,props:g,data:S,setupState:y,ctx:T,inheritAttrs:x}=e,K=Dn(e);let G,F;try{if(n.shapeFlag&4){const v=s||i,R=v;G=st(h.call(R,v,f,g,y,S,T)),F=a}else{const v=t;G=st(v.length>1?v(g,{attrs:a,slots:r,emit:u}):v(g,null)),F=t.props?a:Hl(a)}}catch(v){It.length=0,qn(v,e,1),G=We(kt)}let E=G;if(F&&x!==!1){const v=Object.keys(F),{shapeFlag:R}=E;v.length&&R&7&&(o&&v.some(Wn)&&(F=Kl(F,o)),E=$t(E,F,!1,!0))}return n.dirs&&(E=$t(E,null,!1,!0),E.dirs=E.dirs?E.dirs.concat(n.dirs):n.dirs),n.transition&&ji(E,n.transition),G=E,Dn(K),G}const Hl=e=>{let t;for(const n in e)(n==="class"||n==="style"||Gn(n))&&((t||(t={}))[n]=e[n]);return t},Kl=(e,t)=>{const n={};for(const i in e)(!Wn(i)||!(i.slice(9)in t))&&(n[i]=e[i]);return n};function ql(e,t,n){const{props:i,children:s,component:o}=e,{props:r,children:a,patchFlag:u}=t,h=o.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&u>=0){if(u&1024)return!0;if(u&16)return i?bs(i,r,h):!!r;if(u&8){const f=t.dynamicProps;for(let g=0;g<f.length;g++){const S=f[g];if($o(r,i,S)&&!Jn(h,S))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===r?!1:i?r?bs(i,r,h):!0:!!r;return!1}function bs(e,t,n){const i=Object.keys(t);if(i.length!==Object.keys(e).length)return!0;for(let s=0;s<i.length;s++){const o=i[s];if($o(t,e,o)&&!Jn(n,o))return!0}return!1}function $o(e,t,n){const i=e[n],s=t[n];return n==="style"&&ce(i)&&ce(s)?!Kt(i,s):i!==s}function Yl({vnode:e,parent:t,suspense:n},i){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===e&&(s.suspense.vnode.el=s.el=i,e=s),s===e)(e=t.vnode).el=i,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=i)}const jo={},Ho=()=>Object.create(jo),Ko=e=>Object.getPrototypeOf(e)===jo;function Jl(e,t,n,i=!1){const s={},o=Ho();e.propsDefaults=Object.create(null),qo(e,t,s,o);for(const r in e.propsOptions[0])r in s||(s[r]=void 0);n?e.props=i?s:rl(s):e.type.props?e.props=s:e.props=o,e.attrs=o}function Xl(e,t,n,i){const{props:s,attrs:o,vnode:{patchFlag:r}}=e,a=se(s),[u]=e.propsOptions;let h=!1;if((i||r>0)&&!(r&16)){if(r&8){const f=e.vnode.dynamicProps;for(let g=0;g<f.length;g++){let S=f[g];if(Jn(e.emitsOptions,S))continue;const y=t[S];if(u)if(oe(o,S))y!==o[S]&&(o[S]=y,h=!0);else{const T=qe(S);s[T]=Mi(u,a,T,y,e,!1)}else y!==o[S]&&(o[S]=y,h=!0)}}}else{qo(e,t,s,o)&&(h=!0);let f;for(const g in a)(!t||!oe(t,g)&&((f=Rt(g))===g||!oe(t,f)))&&(u?n&&(n[g]!==void 0||n[f]!==void 0)&&(s[g]=Mi(u,a,g,void 0,e,!0)):delete s[g]);if(o!==a)for(const g in o)(!t||!oe(t,g))&&(delete o[g],h=!0)}h&&ht(e.attrs,"set","")}function qo(e,t,n,i){const[s,o]=e.propsOptions;let r=!1,a;if(t)for(let u in t){if(ln(u))continue;const h=t[u];let f;s&&oe(s,f=qe(u))?!o||!o.includes(f)?n[f]=h:(a||(a={}))[f]=h:Jn(e.emitsOptions,u)||(!(u in i)||h!==i[u])&&(i[u]=h,r=!0)}if(o){const u=se(n),h=a||de;for(let f=0;f<o.length;f++){const g=o[f];n[g]=Mi(s,u,g,h[g],e,!oe(h,g))}}return r}function Mi(e,t,n,i,s,o){const r=e[n];if(r!=null){const a=oe(r,"default");if(a&&i===void 0){const u=r.default;if(r.type!==Function&&!r.skipFactory&&Q(u)){const{propsDefaults:h}=s;if(n in h)i=h[n];else{const f=Cn(s);i=h[n]=u.call(null,t),f()}}else i=u;s.ce&&s.ce._setProp(n,i)}r[0]&&(o&&!a?i=!1:r[1]&&(i===""||i===Rt(n))&&(i=!0))}return i}const Zl=new WeakMap;function Yo(e,t,n=!1){const i=n?Zl:t.propsCache,s=i.get(e);if(s)return s;const o=e.props,r={},a=[];let u=!1;if(!Q(e)){const f=g=>{u=!0;const[S,y]=Yo(g,t,!0);Be(r,S),y&&a.push(...y)};!n&&t.mixins.length&&t.mixins.forEach(f),e.extends&&f(e.extends),e.mixins&&e.mixins.forEach(f)}if(!o&&!u)return ce(e)&&i.set(e,Ut),Ut;if(Y(o))for(let f=0;f<o.length;f++){const g=qe(o[f]);vs(g)&&(r[g]=de)}else if(o)for(const f in o){const g=qe(f);if(vs(g)){const S=o[f],y=r[g]=Y(S)||Q(S)?{type:S}:Be({},S),T=y.type;let x=!1,K=!0;if(Y(T))for(let G=0;G<T.length;++G){const F=T[G],E=Q(F)&&F.name;if(E==="Boolean"){x=!0;break}else E==="String"&&(K=!1)}else x=Q(T)&&T.name==="Boolean";y[0]=x,y[1]=K,(x||oe(y,"default"))&&a.push(g)}}const h=[r,a];return ce(e)&&i.set(e,h),h}function vs(e){return e[0]!=="$"&&!ln(e)}const qi=e=>e==="_"||e==="_ctx"||e==="$stable",Yi=e=>Y(e)?e.map(st):[st(e)],Ql=(e,t,n)=>{if(t._n)return t;const i=bl((...s)=>Yi(t(...s)),n);return i._c=!1,i},Jo=(e,t,n)=>{const i=e._ctx;for(const s in e){if(qi(s))continue;const o=e[s];if(Q(o))t[s]=Ql(s,o,i);else if(o!=null){const r=Yi(o);t[s]=()=>r}}},Xo=(e,t)=>{const n=Yi(t);e.slots.default=()=>n},Zo=(e,t,n)=>{for(const i in t)(n||!qi(i))&&(e[i]=t[i])},ea=(e,t,n)=>{const i=e.slots=Ho();if(e.vnode.shapeFlag&32){const s=t._;s?(Zo(i,t,n),n&&ao(i,"_",s,!0)):Jo(t,i)}else t&&Xo(e,t)},ta=(e,t,n)=>{const{vnode:i,slots:s}=e;let o=!0,r=de;if(i.shapeFlag&32){const a=t._;a?n&&a===1?o=!1:Zo(s,t,n):(o=!t.$stable,Jo(t,s)),r=t}else t&&(Xo(e,t),r={default:1});if(o)for(const a in s)!qi(a)&&r[a]==null&&delete s[a]},_e=ra;function na(e){return ia(e)}function ia(e,t){const n=Hn();n.__VUE__=!0;const{insert:i,remove:s,patchProp:o,createElement:r,createText:a,createComment:u,setText:h,setElementText:f,parentNode:g,nextSibling:S,setScopeId:y=rt,insertStaticContent:T}=e,x=(d,m,b,w=null,C=null,P=null,O=void 0,B=null,A=!!m.dynamicChildren)=>{if(d===m)return;d&&!Zt(d,m)&&(w=Tt(d),Ue(d,C,P,!0),d=null),m.patchFlag===-2&&(A=!1,m.dynamicChildren=null);const{type:M,ref:H,shapeFlag:L}=m;switch(M){case Xn:K(d,m,b,w);break;case kt:G(d,m,b,w);break;case Bn:d==null&&F(m,b,w,O);break;case Z:Ct(d,m,b,w,C,P,O,B,A);break;default:L&1?R(d,m,b,w,C,P,O,B,A):L&6?$e(d,m,b,w,C,P,O,B,A):(L&64||L&128)&&M.process(d,m,b,w,C,P,O,B,A,te)}H!=null&&C?dn(H,d&&d.ref,P,m||d,!m):H==null&&d&&d.ref!=null&&dn(d.ref,null,P,d,!0)},K=(d,m,b,w)=>{if(d==null)i(m.el=a(m.children),b,w);else{const C=m.el=d.el;m.children!==d.children&&h(C,m.children)}},G=(d,m,b,w)=>{d==null?i(m.el=u(m.children||""),b,w):m.el=d.el},F=(d,m,b,w)=>{[d.el,d.anchor]=T(d.children,m,b,w,d.el,d.anchor)},E=({el:d,anchor:m},b,w)=>{let C;for(;d&&d!==m;)C=S(d),i(d,b,w),d=C;i(m,b,w)},v=({el:d,anchor:m})=>{let b;for(;d&&d!==m;)b=S(d),s(d),d=b;s(m)},R=(d,m,b,w,C,P,O,B,A)=>{if(m.type==="svg"?O="svg":m.type==="math"&&(O="mathml"),d==null)_(m,b,w,C,P,O,B,A);else{const M=d.el&&d.el._isVueCE?d.el:null;try{M&&M._beginPatch(),ie(d,m,C,P,O,B,A)}finally{M&&M._endPatch()}}},_=(d,m,b,w,C,P,O,B)=>{let A,M;const{props:H,shapeFlag:L,transition:$,dirs:X}=d;if(A=d.el=r(d.type,P,H&&H.is,H),L&8?f(A,d.children):L&16&&J(d.children,A,null,w,C,ui(d,P),O,B),X&&Et(d,null,w,"created"),N(A,d,d.scopeId,O,w),H){for(const ue in H)ue!=="value"&&!ln(ue)&&o(A,ue,null,H[ue],P,w);"value"in H&&o(A,"value",null,H.value,P),(M=H.onVnodeBeforeMount)&&tt(M,w,d)}X&&Et(d,null,w,"beforeMount");const ne=sa(C,$);ne&&$.beforeEnter(A),i(A,m,b),((M=H&&H.onVnodeMounted)||ne||X)&&_e(()=>{try{M&&tt(M,w,d),ne&&$.enter(A),X&&Et(d,null,w,"mounted")}finally{}},C)},N=(d,m,b,w,C)=>{if(b&&y(d,b),w)for(let P=0;P<w.length;P++)y(d,w[P]);if(C){let P=C.subTree;if(m===P||nr(P.type)&&(P.ssContent===m||P.ssFallback===m)){const O=C.vnode;N(d,O,O.scopeId,O.slotScopeIds,C.parent)}}},J=(d,m,b,w,C,P,O,B,A=0)=>{for(let M=A;M<d.length;M++){const H=d[M]=B?ft(d[M]):st(d[M]);x(null,H,m,b,w,C,P,O,B)}},ie=(d,m,b,w,C,P,O)=>{const B=m.el=d.el;let{patchFlag:A,dynamicChildren:M,dirs:H}=m;A|=d.patchFlag&16;const L=d.props||de,$=m.props||de;let X;if(b&&At(b,!1),(X=$.onVnodeBeforeUpdate)&&tt(X,b,m,d),H&&Et(m,d,b,"beforeUpdate"),b&&At(b,!0),M&&(!d.dynamicChildren||d.dynamicChildren.length!==M.length)&&(A=0,O=!1,M=null),(L.innerHTML&&$.innerHTML==null||L.textContent&&$.textContent==null)&&f(B,""),M?he(d.dynamicChildren,M,B,b,w,ui(m,C),P):O||ee(d,m,B,null,b,w,ui(m,C),P,!1),A>0){if(A&16)Ie(B,L,$,b,C);else if(A&2&&L.class!==$.class&&o(B,"class",null,$.class,C),A&4&&o(B,"style",L.style,$.style,C),A&8){const ne=m.dynamicProps;for(let ue=0;ue<ne.length;ue++){const re=ne[ue],xe=L[re],ke=$[re];(ke!==xe||re==="value")&&o(B,re,xe,ke,C,b)}}A&1&&d.children!==m.children&&f(B,m.children)}else!O&&M==null&&Ie(B,L,$,b,C);((X=$.onVnodeUpdated)||H)&&_e(()=>{X&&tt(X,b,m,d),H&&Et(m,d,b,"updated")},w)},he=(d,m,b,w,C,P,O)=>{for(let B=0;B<m.length;B++){const A=d[B],M=m[B],H=A.el&&(A.type===Z||!Zt(A,M)||A.shapeFlag&198)?g(A.el):b;x(A,M,H,null,w,C,P,O,!0)}},Ie=(d,m,b,w,C)=>{if(m!==b){if(m!==de)for(const P in m)!ln(P)&&!(P in b)&&o(d,P,m[P],null,C,w);for(const P in b){if(ln(P))continue;const O=b[P],B=m[P];O!==B&&P!=="value"&&o(d,P,B,O,C,w)}"value"in b&&o(d,"value",m.value,b.value,C)}},Ct=(d,m,b,w,C,P,O,B,A)=>{const M=m.el=d?d.el:a(""),H=m.anchor=d?d.anchor:a("");let{patchFlag:L,dynamicChildren:$,slotScopeIds:X}=m;X&&(B=B?B.concat(X):X),d==null?(i(M,b,w),i(H,b,w),J(m.children||[],b,H,C,P,O,B,A)):L>0&&L&64&&$&&d.dynamicChildren&&d.dynamicChildren.length===$.length?(he(d.dynamicChildren,$,b,C,P,O,B),(m.key!=null||C&&m===C.subTree)&&Qo(d,m,!0)):ee(d,m,b,H,C,P,O,B,A)},$e=(d,m,b,w,C,P,O,B,A)=>{m.slotScopeIds=B,d==null?m.shapeFlag&512?C.ctx.activate(m,b,w,O,A):j(m,b,w,C,P,O,A):c(d,m,A)},j=(d,m,b,w,C,P,O)=>{const B=d.component=fa(d,w,C);if(Lo(d)&&(B.ctx.renderer=te),ha(B,!1,O),B.asyncDep){if(C&&C.registerDep(B,p,O),!d.el){const A=B.subTree=We(kt);G(null,A,m,b),d.placeholder=A.el}}else p(B,d,m,b,C,P,O)},c=(d,m,b)=>{const w=m.component=d.component;if(ql(d,m,b))if(w.asyncDep&&!w.asyncResolved){V(w,m,b);return}else w.next=m,w.update();else m.el=d.el,w.vnode=m},p=(d,m,b,w,C,P,O)=>{const B=()=>{if(d.isMounted){let{next:L,bu:$,u:X,parent:ne,vnode:ue}=d;{const Qe=er(d);if(Qe){L&&(L.el=ue.el,V(d,L,O)),Qe.asyncDep.then(()=>{_e(()=>{d.isUnmounted||M()},C)});return}}let re=L,xe;At(d,!1),L?(L.el=ue.el,V(d,L,O)):L=ue,$&&En($),(xe=L.props&&L.props.onVnodeBeforeUpdate)&&tt(xe,ne,L,ue),At(d,!0);const ke=gs(d),Ze=d.subTree;d.subTree=ke,x(Ze,ke,g(Ze.el),Tt(Ze),d,C,P),L.el=ke.el,re===null&&Yl(d,ke.el),X&&_e(X,C),(xe=L.props&&L.props.onVnodeUpdated)&&_e(()=>tt(xe,ne,L,ue),C)}else{let L;const{el:$,props:X}=m,{bm:ne,m:ue,parent:re,root:xe,type:ke}=d,Ze=fn(m);At(d,!1),ne&&En(ne),!Ze&&(L=X&&X.onVnodeBeforeMount)&&tt(L,re,m),At(d,!0);{xe.ce&&xe.ce._hasShadowRoot()&&xe.ce._injectChildStyle(ke,d.parent?d.parent.type:void 0);const Qe=d.subTree=gs(d);x(null,Qe,b,w,d,C,P),m.el=Qe.el}if(ue&&_e(ue,C),!Ze&&(L=X&&X.onVnodeMounted)){const Qe=m;_e(()=>tt(L,re,Qe),C)}(m.shapeFlag&256||re&&fn(re.vnode)&&re.vnode.shapeFlag&256)&&d.a&&_e(d.a,C),d.isMounted=!0,m=b=w=null}};d.scope.on();const A=d.effect=new po(B);d.scope.off();const M=d.update=A.run.bind(A),H=d.job=A.runIfDirty.bind(A);H.i=d,H.id=d.uid,A.scheduler=()=>$i(H),At(d,!0),M()},V=(d,m,b)=>{m.component=d;const w=d.vnode.props;d.vnode=m,d.next=null,Xl(d,m.props,w,b),ta(d,m.children,b),yt(),cs(d),xt()},ee=(d,m,b,w,C,P,O,B,A=!1)=>{const M=d&&d.children,H=d?d.shapeFlag:0,L=m.children,{patchFlag:$,shapeFlag:X}=m;if($>0){if($&128){ve(M,L,b,w,C,P,O,B,A);return}else if($&256){ye(M,L,b,w,C,P,O,B,A);return}}X&8?(H&16&&at(M,C,P),L!==M&&f(b,L)):H&16?X&16?ve(M,L,b,w,C,P,O,B,A):at(M,C,P,!0):(H&8&&f(b,""),X&16&&J(L,b,w,C,P,O,B,A))},ye=(d,m,b,w,C,P,O,B,A)=>{d=d||Ut,m=m||Ut;const M=d.length,H=m.length,L=Math.min(M,H);let $;for($=0;$<L;$++){const X=m[$]=A?ft(m[$]):st(m[$]);x(d[$],X,b,null,C,P,O,B,A)}M>H?at(d,C,P,!0,!1,L):J(m,b,w,C,P,O,B,A,L)},ve=(d,m,b,w,C,P,O,B,A)=>{let M=0;const H=m.length;let L=d.length-1,$=H-1;for(;M<=L&&M<=$;){const X=d[M],ne=m[M]=A?ft(m[M]):st(m[M]);if(Zt(X,ne))x(X,ne,b,null,C,P,O,B,A);else break;M++}for(;M<=L&&M<=$;){const X=d[L],ne=m[$]=A?ft(m[$]):st(m[$]);if(Zt(X,ne))x(X,ne,b,null,C,P,O,B,A);else break;L--,$--}if(M>L){if(M<=$){const X=$+1,ne=X<H?m[X].el:w;for(;M<=$;)x(null,m[M]=A?ft(m[M]):st(m[M]),b,ne,C,P,O,B,A),M++}}else if(M>$)for(;M<=L;)Ue(d[M],C,P,!0),M++;else{const X=M,ne=M,ue=new Map;for(M=ne;M<=$;M++){const Ve=m[M]=A?ft(m[M]):st(m[M]);Ve.key!=null&&ue.set(Ve.key,M)}let re,xe=0;const ke=$-ne+1;let Ze=!1,Qe=0;const Yt=new Array(ke);for(M=0;M<ke;M++)Yt[M]=0;for(M=X;M<=L;M++){const Ve=d[M];if(xe>=ke){Ue(Ve,C,P,!0);continue}let et;if(Ve.key!=null)et=ue.get(Ve.key);else for(re=ne;re<=$;re++)if(Yt[re-ne]===0&&Zt(Ve,m[re])){et=re;break}et===void 0?Ue(Ve,C,P,!0):(Yt[et-ne]=M+1,et>=Qe?Qe=et:Ze=!0,x(Ve,m[et],b,null,C,P,O,B,A),xe++)}const es=Ze?oa(Yt):Ut;for(re=es.length-1,M=ke-1;M>=0;M--){const Ve=ne+M,et=m[Ve],ts=m[Ve+1],ns=Ve+1<H?ts.el||tr(ts):w;Yt[M]===0?x(null,et,b,ns,C,P,O,B,A):Ze&&(re<0||M!==es[re]?Pe(et,b,ns,2):re--)}}},Pe=(d,m,b,w,C=null)=>{const{el:P,type:O,transition:B,children:A,shapeFlag:M}=d;if(M&6){Pe(d.component.subTree,m,b,w);return}if(M&128){d.suspense.move(m,b,w);return}if(M&64){O.move(d,m,b,te);return}if(O===Z){i(P,m,b);for(let L=0;L<A.length;L++)Pe(A[L],m,b,w);i(d.anchor,m,b);return}if(O===Bn){E(d,m,b);return}if(w!==2&&M&1&&B)if(w===0)B.persisted&&!P[ai]?i(P,m,b):(B.beforeEnter(P),i(P,m,b),_e(()=>B.enter(P),C));else{const{leave:L,delayLeave:$,afterLeave:X}=B,ne=()=>{d.ctx.isUnmounted?s(P):i(P,m,b)},ue=()=>{const re=P._isLeaving||!!P[ai];P._isLeaving&&P[ai](!0),B.persisted&&!re?ne():L(P,()=>{ne(),X&&X()})};$?$(P,ne,ue):ue()}else i(P,m,b)},Ue=(d,m,b,w=!1,C=!1)=>{const{type:P,props:O,ref:B,children:A,dynamicChildren:M,shapeFlag:H,patchFlag:L,dirs:$,cacheIndex:X,memo:ne}=d;if(L===-2&&(C=!1),B!=null&&(yt(),dn(B,null,b,d,!0),xt()),X!=null&&(m.renderCache[X]=void 0),H&256){m.ctx.deactivate(d);return}const ue=H&1&&$,re=!fn(d);let xe;if(re&&(xe=O&&O.onVnodeBeforeUnmount)&&tt(xe,m,d),H&6)ni(d.component,b,w);else{if(H&128){d.suspense.unmount(b,w);return}ue&&Et(d,null,m,"beforeUnmount"),H&64?d.type.remove(d,m,b,te,w):M&&!M.hasOnce&&(P!==Z||L>0&&L&64)?at(M,m,b,!1,!0):(P===Z&&L&384||!C&&H&16)&&at(A,m,b),w&&Pn(d)}const ke=ne!=null&&X==null;(re&&(xe=O&&O.onVnodeUnmounted)||ue||ke)&&_e(()=>{xe&&tt(xe,m,d),ue&&Et(d,null,m,"unmounted"),ke&&(d.el=null)},b)},Pn=d=>{const{type:m,el:b,anchor:w,transition:C}=d;if(m===Z){ti(b,w);return}if(m===Bn){v(d);return}const P=()=>{s(b),C&&!C.persisted&&C.afterLeave&&C.afterLeave()};if(d.shapeFlag&1&&C&&!C.persisted){const{leave:O,delayLeave:B}=C,A=()=>O(b,P);B?B(d.el,P,A):A()}else P()},ti=(d,m)=>{let b;for(;d!==m;)b=S(d),s(d),d=b;s(m)},ni=(d,m,b)=>{const{bum:w,scope:C,job:P,subTree:O,um:B,m:A,a:M}=d;ys(A),ys(M),w&&En(w),C.stop(),P&&(P.flags|=8,Ue(O,d,m,b)),B&&_e(B,m),_e(()=>{d.isUnmounted=!0},m)},at=(d,m,b,w=!1,C=!1,P=0)=>{for(let O=P;O<d.length;O++)Ue(d[O],m,b,w,C)},Tt=d=>{if(d.shapeFlag&6)return Tt(d.component.subTree);if(d.shapeFlag&128)return d.suspense.next();const m=S(d.anchor||d.el),b=m&&m[wl];return b?S(b):m};let I=!1;const U=(d,m,b)=>{let w;d==null?m._vnode&&(Ue(m._vnode,null,null,!0),w=m._vnode.component):x(m._vnode||null,d,m,null,null,null,b),m._vnode=d,I||(I=!0,cs(w),Bo(),I=!1)},te={p:x,um:Ue,m:Pe,r:Pn,mt:j,mc:J,pc:ee,pbc:he,n:Tt,o:e};return{render:U,hydrate:void 0,createApp:Gl(U)}}function ui({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function At({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function sa(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Qo(e,t,n=!1){const i=e.children,s=t.children;if(Y(i)&&Y(s))for(let o=0;o<i.length;o++){const r=i[o];let a=s[o];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[o]=ft(s[o]),a.el=r.el),!n&&a.patchFlag!==-2&&Qo(r,a)),a.type===Xn&&(a.patchFlag===-1&&(a=s[o]=ft(a)),a.el=r.el),a.type===kt&&!a.el&&(a.el=r.el)}}function oa(e){const t=e.slice(),n=[0];let i,s,o,r,a;const u=e.length;for(i=0;i<u;i++){const h=e[i];if(h!==0){if(s=n[n.length-1],e[s]<h){t[i]=s,n.push(i);continue}for(o=0,r=n.length-1;o<r;)a=o+r>>1,e[n[a]]<h?o=a+1:r=a;h<e[n[o]]&&(o>0&&(t[i]=n[o-1]),n[o]=i)}}for(o=n.length,r=n[o-1];o-- >0;)n[o]=r,r=t[r];return n}function er(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:er(t)}function ys(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function tr(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?tr(t.subTree):null}const nr=e=>e.__isSuspense;function ra(e,t){t&&t.pendingBranch?Y(e)?t.effects.push(...e):t.effects.push(e):gl(e)}const Z=Symbol.for("v-fgt"),Xn=Symbol.for("v-txt"),kt=Symbol.for("v-cmt"),Bn=Symbol.for("v-stc"),It=[];let Ge=null;function z(e=!1){It.push(Ge=e?null:[])}function ir(){It.pop(),Ge=It[It.length-1]||null}let vn=1;function xs(e,t=!1){vn+=e,e<0&&Ge&&t&&(Ge.hasOnce=!0)}function sr(e){return e.dynamicChildren=vn>0?Ge||Ut:null,ir(),vn>0&&Ge&&Ge.push(e),e}function D(e,t,n,i,s,o){return sr(l(e,t,n,i,s,o,!0))}function ki(e,t,n,i,s){return sr(We(e,t,n,i,s,!0))}function or(e){return e?e.__v_isVNode===!0:!1}function Zt(e,t){return e.type===t.type&&e.key===t.key}const rr=({key:e})=>e??null,Fn=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?be(e)||Ae(e)||Q(e)?{i:je,r:e,k:t,f:!!n}:e:null);function l(e,t=null,n=null,i=0,s=null,o=e===Z?0:1,r=!1,a=!1){const u={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&rr(t),ref:t&&Fn(t),scopeId:Oo,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:je};return a?(Un(u,n),o&128&&e.normalize(u)):n&&(u.shapeFlag|=be(n)?8:16),vn>0&&!r&&Ge&&(u.patchFlag>0||o&6)&&u.patchFlag!==32&&Ge.push(u),u}const We=la;function la(e,t=null,n=null,i=0,s=null,o=!1){if((!e||e===zl)&&(e=kt),or(e)){const a=$t(e,t,!0);return n&&Un(a,n),vn>0&&!o&&Ge&&(a.shapeFlag&6?Ge[Ge.indexOf(e)]=a:Ge.push(a)),a.patchFlag=-2,a}if(va(e)&&(e=e.__vccOpts),t){t=aa(t);let{class:a,style:u}=t;a&&!be(a)&&(t.class=Me(a)),ce(u)&&(Gi(u)&&!Y(u)&&(u=Be({},u)),t.style=pt(u))}const r=be(e)?1:nr(e)?128:Cl(e)?64:ce(e)?4:Q(e)?2:0;return l(e,t,n,i,s,r,o,!0)}function aa(e){return e?Gi(e)||Ko(e)?Be({},e):e:null}function $t(e,t,n=!1,i=!1){const{props:s,ref:o,patchFlag:r,children:a,transition:u}=e,h=t?ca(s||{},t):s,f={__v_isVNode:!0,__v_skip:!0,type:e.type,props:h,key:h&&rr(h),ref:t&&t.ref?n&&o?Y(o)?o.concat(Fn(t)):[o,Fn(t)]:Fn(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Z?r===-1?16:r|16:r,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:u,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&$t(e.ssContent),ssFallback:e.ssFallback&&$t(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return u&&i&&ji(f,u.clone(f)),f}function W(e=" ",t=0){return We(Xn,null,e,t)}function lr(e,t){const n=We(Bn,null,e);return n.staticCount=t,n}function Ce(e="",t=!1){return t?(z(),ki(kt,null,e)):We(kt,null,e)}function st(e){return e==null||typeof e=="boolean"?We(kt):Y(e)?We(Z,null,e.slice()):or(e)?ft(e):We(Xn,null,String(e))}function ft(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:$t(e)}function Un(e,t){let n=0;const{shapeFlag:i}=e;if(t==null)t=null;else if(Y(t))n=16;else if(typeof t=="object")if(i&65){const s=t.default;s&&(s._c&&(s._d=!1),Un(e,s()),s._c&&(s._d=!0));return}else{n=32;const s=t._;!s&&!Ko(t)?t._ctx=je:s===3&&je&&(je.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else if(Q(t)){if(i&65){Un(e,{default:t});return}t={default:t,_ctx:je},n=32}else t=String(t),i&64?(n=16,t=[W(t)]):n=8;e.children=t,e.shapeFlag|=n}function ca(...e){const t={};for(let n=0;n<e.length;n++){const i=e[n];for(const s in i)if(s==="class")t.class!==i.class&&(t.class=Me([t.class,i.class]));else if(s==="style")t.style=pt([t.style,i.style]);else if(Gn(s)){const o=t[s],r=i[s];r&&o!==r&&!(Y(o)&&o.includes(r))?t[s]=o?[].concat(o,r):r:r==null&&o==null&&!Wn(s)&&(t[s]=r)}else s!==""&&(t[s]=i[s])}return t}function tt(e,t,n,i=null){Xe(e,t,7,[n,i])}const ua=Go();let da=0;function fa(e,t,n){const i=e.type,s=(t?t.appContext:e.appContext)||ua,o={uid:da++,vnode:e,type:i,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Vr(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Yo(i,s),emitsOptions:Wo(i,s),emit:null,emitted:null,propsDefaults:de,inheritAttrs:i.inheritAttrs,ctx:de,data:de,props:de,attrs:de,slots:de,refs:de,setupState:de,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=t?t.root:o,o.emit=$l.bind(null,o),e.ce&&e.ce(o),o}let ze=null;const pa=()=>ze||je;let Nn,Ri;{const e=Hn(),t=(n,i)=>{let s;return(s=e[n])||(s=e[n]=[]),s.push(i),o=>{s.length>1?s.forEach(r=>r(o)):s[0](o)}};Nn=t("__VUE_INSTANCE_SETTERS__",n=>ze=n),Ri=t("__VUE_SSR_SETTERS__",n=>yn=n)}const Cn=e=>{const t=ze;return Nn(e),e.scope.on(),()=>{e.scope.off(),Nn(t)}},Ss=()=>{ze&&ze.scope.off(),Nn(null)};function ar(e){return e.vnode.shapeFlag&4}let yn=!1;function ha(e,t=!1,n=!1){t&&Ri(t);const{props:i,children:s}=e.vnode,o=ar(e);Jl(e,i,o,t),ea(e,s,n||t);const r=o?ma(e,t):void 0;return t&&Ri(!1),r}function ma(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Il);const{setup:i}=n;if(i){yt();const s=e.setupContext=i.length>1?ba(e):null,o=Cn(e),r=wn(i,e,0,[e.props,s]),a=so(r);if(xt(),o(),(a||e.sp)&&!fn(e)&&Do(e),a){if(r.then(Ss,Ss),t)return r.then(u=>{ws(e,u)}).catch(u=>{qn(u,e,0)});e.asyncDep=r}else ws(e,r)}else cr(e)}function ws(e,t,n){Q(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:ce(t)&&(e.setupState=To(t)),cr(e)}function cr(e,t,n){const i=e.type;e.render||(e.render=i.render||rt);{const s=Cn(e);yt();try{Dl(e)}finally{xt(),s()}}}const ga={get(e,t){return Ee(e,"get",""),e[t]}};function ba(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,ga),slots:e.slots,emit:e.emit,expose:t}}function Zn(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(To(ll(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in pn)return pn[n](e)},has(t,n){return n in t||n in pn}})):e.proxy}function va(e){return Q(e)&&"__vccOpts"in e}const Ke=(e,t)=>dl(e,t,yn),ya="3.5.40";/**
* @vue/runtime-dom v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ti;const Cs=typeof window<"u"&&window.trustedTypes;if(Cs)try{Ti=Cs.createPolicy("vue",{createHTML:e=>e})}catch{}const ur=Ti?e=>Ti.createHTML(e):e=>e,xa="http://www.w3.org/2000/svg",Sa="http://www.w3.org/1998/Math/MathML",dt=typeof document<"u"?document:null,Ps=dt&&dt.createElement("template"),wa={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,i)=>{const s=t==="svg"?dt.createElementNS(xa,e):t==="mathml"?dt.createElementNS(Sa,e):n?dt.createElement(e,{is:n}):dt.createElement(e);return e==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:e=>dt.createTextNode(e),createComment:e=>dt.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>dt.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,i,s,o){const r=n?n.previousSibling:t.lastChild;if(s&&(s===o||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),n),!(s===o||!(s=s.nextSibling)););else{Ps.innerHTML=ur(i==="svg"?`<svg>${e}</svg>`:i==="mathml"?`<math>${e}</math>`:e);const a=Ps.content;if(i==="svg"||i==="mathml"){const u=a.firstChild;for(;u.firstChild;)a.appendChild(u.firstChild);a.removeChild(u)}t.insertBefore(a,n)}return[r?r.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Ca=Symbol("_vtc");function Pa(e,t,n){const i=e[Ca];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const Vn=Symbol("_vod"),dr=Symbol("_vsh"),Ma={name:"show",beforeMount(e,{value:t},{transition:n}){e[Vn]=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):Qt(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:i}){!t!=!n&&(i?t?(i.beforeEnter(e),Qt(e,!0),i.enter(e)):i.leave(e,()=>{Qt(e,!1)}):Qt(e,t))},beforeUnmount(e,{value:t}){Qt(e,t)}};function Qt(e,t){e.style.display=t?e[Vn]:"none",e[dr]=!t}const ka=Symbol(""),Ra=/(?:^|;)\s*display\s*:/;function Ta(e,t,n){const i=e.style,s=be(n);let o=!1;if(n&&!s){if(t)if(be(t))for(const r of t.split(";")){const a=r.slice(0,r.indexOf(":")).trim();n[a]==null&&nn(i,a,"")}else for(const r in t)n[r]==null&&nn(i,r,"");for(const r in n){r==="display"&&(o=!0);const a=n[r];a!=null?Aa(e,r,!be(t)&&t?t[r]:void 0,a)||nn(i,r,a):nn(i,r,"")}}else if(s){if(t!==n){const r=i[ka];r&&(n+=";"+r),i.cssText=n,o=Ra.test(n)}}else t&&e.removeAttribute("style");Vn in e&&(e[Vn]=o?i.display:"",e[dr]&&(i.display="none"))}const Ms=/\s*!important$/;function nn(e,t,n){if(Y(n))n.forEach(i=>nn(e,t,i));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const i=Ea(e,t);Ms.test(n)?e.setProperty(Rt(i),n.replace(Ms,""),"important"):e[i]=n}}const ks=["Webkit","Moz","ms"],di={};function Ea(e,t){const n=di[t];if(n)return n;let i=qe(t);if(i!=="filter"&&i in e)return di[t]=i;i=lo(i);for(let s=0;s<ks.length;s++){const o=ks[s]+i;if(o in e)return di[t]=o}return t}function Aa(e,t,n,i){return e.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&be(i)&&n===i}const Rs="http://www.w3.org/1999/xlink";function Ts(e,t,n,i,s,o=Ur(t)){i&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(Rs,t.slice(6,t.length)):e.setAttributeNS(Rs,t,n):n==null||o&&!co(n)?e.removeAttribute(t):e.setAttribute(t,o?"":lt(n)?String(n):n)}function Es(e,t,n,i,s){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?ur(n):n);return}const o=e.tagName;if(t==="value"&&o!=="PROGRESS"&&!o.includes("-")){const a=o==="OPTION"?e.getAttribute("value")||"":e.value,u=n==null?e.type==="checkbox"?"on":"":String(n);(a!==u||!("_value"in e))&&(e.value=u),n==null&&e.removeAttribute(t),e._value=n;return}let r=!1;if(n===""||n==null){const a=typeof e[t];a==="boolean"?n=co(n):n==null&&a==="string"?(n="",r=!0):a==="number"&&(n=0,r=!0)}try{e[t]=n}catch{}r&&e.removeAttribute(s||t)}function Mt(e,t,n,i){e.addEventListener(t,n,i)}function Ba(e,t,n,i){e.removeEventListener(t,n,i)}const As=Symbol("_vei");function Fa(e,t,n,i,s=null){const o=e[As]||(e[As]={}),r=o[t];if(i&&r)r.value=i;else{const[a,u]=Ia(t);if(i){const h=o[t]=_a(i,s);Mt(e,a,h,u)}else r&&(Ba(e,a,r,u),o[t]=void 0)}}const Oa=/(Once|Passive|Capture)$/,za=/^on:?(?:Once|Passive|Capture)$/;function Ia(e){let t,n;for(;(n=e.match(Oa))&&!za.test(e);)t||(t={}),e=e.slice(0,e.length-n[1].length),t[n[1].toLowerCase()]=!0;return[e[2]===":"?e.slice(3):Rt(e.slice(2)),t]}let fi=0;const Da=Promise.resolve(),La=()=>fi||(Da.then(()=>fi=0),fi=Date.now());function _a(e,t){const n=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=n.attached)return;const s=n.value;if(Y(s)){const o=i.stopImmediatePropagation;i.stopImmediatePropagation=()=>{o.call(i),i._stopped=!0};const r=s.slice(),a=[i];for(let u=0;u<r.length&&!i._stopped;u++){const h=r[u];h&&Xe(h,t,5,a)}}else Xe(s,t,5,[i])};return n.value=e,n.attached=La(),n}const Bs=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Ua=(e,t,n,i,s,o)=>{const r=s==="svg";t==="class"?Pa(e,i,r):t==="style"?Ta(e,n,i):Gn(t)?Wn(t)||Fa(e,t,n,i,o):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Na(e,t,i,r))?(Es(e,t,i),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Ts(e,t,i,r,o,t!=="value")):e._isVueCE&&(Va(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!be(i)))?Es(e,qe(t),i,o,t):(t==="true-value"?e._trueValue=i:t==="false-value"&&(e._falseValue=i),Ts(e,t,i,r))};function Na(e,t,n,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in e&&Bs(t)&&Q(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=e.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Bs(t)&&be(n)?!1:t in e}function Va(e,t){const n=e._def.props;if(!n)return!1;const i=qe(t);return Array.isArray(n)?n.some(s=>qe(s)===i):Object.keys(n).some(s=>qe(s)===i)}const jt=e=>{const t=e.props["onUpdate:modelValue"]||!1;return Y(t)?n=>En(t,n):t};function Ga(e){e.target.composing=!0}function Fs(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const vt=Symbol("_assign");function Os(e,t,n){return t&&(e=e.trim()),n&&(e=jn(e)),e}const ae={created(e,{modifiers:{lazy:t,trim:n,number:i}},s){e[vt]=jt(s);const o=i||s.props&&s.props.type==="number";Mt(e,t?"change":"input",r=>{r.target.composing||e[vt](Os(e.value,n,o))}),(n||o)&&Mt(e,"change",()=>{e.value=Os(e.value,n,o)}),t||(Mt(e,"compositionstart",Ga),Mt(e,"compositionend",Fs),Mt(e,"change",Fs))},mounted(e,{value:t}){e.value=t??""},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:i,trim:s,number:o}},r){if(e[vt]=jt(r),e.composing)return;const a=(o||e.type==="number")&&!/^0\d/.test(e.value)?jn(e.value):e.value,u=t??"";if(a===u)return;const h=e.getRootNode();(h instanceof Document||h instanceof ShadowRoot)&&h.activeElement===e&&e.type!=="range"&&(i&&t===n||s&&e.value.trim()===u)||(e.value=u)}},sn={deep:!0,created(e,t,n){e[vt]=jt(n),Mt(e,"change",()=>{const i=e._modelValue,s=xn(e),o=e.checked,r=e[vt];if(Y(i)){const a=Ii(i,s),u=a!==-1;if(o&&!u)r(i.concat(s));else if(!o&&u){const h=[...i];h.splice(a,1),r(h)}}else if(Ht(i)){const a=new Set(i);o?a.add(s):a.delete(s),r(a)}else r(fr(e,o))})},mounted:zs,beforeUpdate(e,t,n){e[vt]=jt(n),zs(e,t,n)}};function zs(e,{value:t,oldValue:n},i){e._modelValue=t;let s;if(Y(t))s=Ii(t,i.props.value)>-1;else if(Ht(t))s=t.has(i.props.value);else{if(t===n)return;s=Kt(t,fr(e,!0))}e.checked!==s&&(e.checked=s)}const Le={deep:!0,created(e,{value:t,modifiers:{number:n}},i){e._modelValue=t,Mt(e,"change",()=>{const s=Array.prototype.filter.call(e.options,o=>o.selected).map(o=>n?jn(xn(o)):xn(o));e[vt](e.multiple?Ht(e._modelValue)?new Set(s):s:s[0]),e._assigning=!0,Wi(()=>{e._assigning=!1})}),e[vt]=jt(i)},mounted(e,{value:t}){Is(e,t)},beforeUpdate(e,{value:t},n){e._modelValue=t,e[vt]=jt(n)},updated(e,{value:t}){e._assigning||Is(e,t)}};function Is(e,t){const n=e.multiple,i=Y(t);if(!(n&&!i&&!Ht(t))){for(let s=0,o=e.options.length;s<o;s++){const r=e.options[s],a=xn(r);if(n)if(i){const u=typeof a;u==="string"||u==="number"?r.selected=t.some(h=>String(h)===String(a)):r.selected=Ii(t,a)>-1}else r.selected=t.has(a);else if(Kt(xn(r),t)){e.selectedIndex!==s&&(e.selectedIndex=s);return}}!n&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function xn(e){return"_value"in e?e._value:e.value}function fr(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const Wa=["ctrl","shift","alt","meta"],$a={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>Wa.some(n=>e[`${n}Key`]&&!t.includes(n))},Ji=(e,t)=>{if(!e)return e;const n=e._withMods||(e._withMods={}),i=t.join(".");return n[i]||(n[i]=((s,...o)=>{for(let r=0;r<t.length;r++){const a=$a[t[r]];if(a&&a(s,t))return}return e(s,...o)}))},ja={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Ha=(e,t)=>{const n=e._withKeys||(e._withKeys={}),i=t.join(".");return n[i]||(n[i]=(s=>{if(!("key"in s))return;const o=Rt(s.key);if(t.some(r=>r===o||ja[r]===o))return e(s)}))},Ka=Be({patchProp:Ua},wa);let Ds;function qa(){return Ds||(Ds=na(Ka))}const Ya=((...e)=>{const t=qa().createApp(...e),{mount:n}=t;return t.mount=i=>{const s=Xa(i);if(!s)return;const o=t._component;!Q(o)&&!o.render&&!o.template&&(o.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const r=n(s,!1,Ja(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),r},t});function Ja(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Xa(e){return be(e)?document.querySelector(e):e}const Za=`// Particle Life + Boids — combined compute simulation.
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

    _pad0: f32,
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

fn randomDir(id: u32, scale: f32) -> vec2f {
    let seed = id * 1664525u + 1013904223u;
    let ang = f32(seed % 6283u) * 0.001;
    return vec2f(cos(ang), sin(ang)) * scale;
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

                if (dist < P.boidVisionRadius) {
                    neighborCount++;
                    align += inParticles[i].vel;
                    coh += pos + diff;
                    sep -= diff / (dist * dist);
                }

                if (dist < P.speciesInteractionRadius) {
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

    _pad0: f32,
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
    return vec4f(in.color * alpha, alpha);
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
`,Dt=800,ec=500,Ls=64,tc=.002,nc=4,ic=[5120,15360,25600,51200,102400,204800,409600,819200,1638400],sc=[1,2,3,4,5,6,7,8,9,10,12,14,16,20,24,32],oc=[10,20,30,40,60,80,120,160],_s=[["Linear","Even ramp to full strength at contact. The canonical particle-life core."],["Smooth","Quadratic — barely there at the surface, so cluster edges stay soft."],["Hard","Constant inside the radius. A step at the boundary; maximally rigid."],["Stiff","Inverse-distance, capped. Nearly incompressible at contact, ignorable further out."]],Us=[["Disc","Solid antialiased circle — stays crisp down to sub-pixel sizes."],["Soft","Gaussian falloff. Neighbouring agents merge into continuous mass."],["Ring","Hollow. Shows structure through dense clumps that solid discs hide."],["Square","Crisp and cheap to read at very small sizes."],["Diamond","The square rotated — reads as a distinct mark next to discs."],["Triangle","Directionless but angular; good with Motion Stretch."],["Plus","Thin cross. Sparse-looking even where agents are dense."],["Varied","A different shape per species, so species read as different kinds of thing."]],Ns=[["Heatmap","The original blue→cyan→green→yellow→red ramp. High contrast, not perceptually uniform."],["Viridis","Perceptually uniform — equal steps in species look like equal steps in brightness."],["Ember","Black through deep red and orange to white hot."],["Ice","Midnight blue through cyan to white."],["Cyclic","Full hue wheel. The honest choice for continuous species, where 0 and N−1 are neighbours."],["Mono","Greyscale. Lets glow and density carry the image instead of hue."],["Plasma","Indigo through magenta and orange to yellow. Bright throughout."],["Aurora","Deep teal through green to pale pink."],["Sunset","Night violet through coral to gold."],["Forest","Bark and moss through leaf green to sand."],["Neon","Near-black to magenta to cyan to white. Very high contrast."],["Pastel","Low saturation across the wheel — soft, and good on light backgrounds."],["Copper","Near-black through rust and copper to a bright highlight."],["Spectrum","Full rainbow without wrapping, so the ends stay distinguishable."]],on=[["Void",{r:.04,g:.045,b:.06,a:1}],["Black",{r:0,g:0,b:0,a:1}],["Midnight",{r:.02,g:.03,b:.08,a:1}],["Slate",{r:.1,g:.11,b:.13,a:1}],["Warm",{r:.07,g:.05,b:.045,a:1}],["Deep Space",{r:.015,g:.015,b:.035,a:1}],["Navy",{r:.03,g:.06,b:.12,a:1}],["Ink",{r:.05,g:.07,b:.07,a:1}],["Plum",{r:.08,g:.04,b:.1,a:1}],["Moss",{r:.04,g:.07,b:.05,a:1}],["Charcoal",{r:.16,g:.16,b:.17,a:1}],["Paper",{r:.9,g:.89,b:.86,a:1}],["Cream",{r:.96,g:.94,b:.88,a:1}],["Sepia",{r:.85,g:.79,b:.68,a:1}]].map(([e,t])=>({name:e,rgb:t,light:.2126*t.r+.7152*t.g+.0722*t.b>.5})),Vs=[["Off","No field — agents only."],["Density","Shade the smoothed agent density directly. Continuous mass instead of dots."],["Metaball","Threshold the field into a surface, lit by its own gradient. The fluid look."]],Gs=[["Species","Hue by species. Continuous, so agents between basis species blend."],["Blob","Hue by connected-component id, hashed so adjacent blobs differ."],["Velocity","Direction as hue, speed as brightness — the optical-flow reading."]],rc=["Random","Random Symmetric","Ring","Ring Symmetric","Spiral","Spiral Symmetric","Bands","Bands Symmetric"];function pr(){return{dt:.25,mixT:.5,boidVisionRadius:350,speciesInteractionRadius:250,alignmentForce:1,cohesionForce:1,separationForce:1,movementRandomness:.01,movementScaling:1,forceSofteningMul:3,centerAttraction:0,damping:.98,minSpeed:0,maxSpeed:500,maxForce:1e3,drawRadius:2,collisionModifier:2,coreEnabled:!1,coreRadiusFrac:.02,coreStrength:.2,coreFalloff:1,coreSizeSpread:.05,mediumEnabled:!1,mediumForce:8,mediumDiffuse:.5,mediumDisplace:.25,mediumCapacityMul:2,blobsEnabled:!1,blobInterval:15,blobRounds:24,blobSmoothing:2,blobMinDensity:2,mutateEnabled:!1,mutateRate:.05,mutateBias:0,mutateInterval:30,showGrid:!1,showMedium:!0,showAgents:!0,fieldMode:0,fieldSmoothing:2,fieldThresholdMul:2.5,fieldStrength:1,renderMode:0,particleShape:0,speciesPalette:0,background:0,glowStrength:0,glowSize:3,velocityStretch:0,drawScale:1,drawJitter:0,trailStrength:0,driftEnabled:!1,driftCols:40,driftSize:26,driftSpeed:.004,driftBrightness:.5,cameraX:0,cameraY:0,zoom:.1}}function hr(){return{startingMethod:4,agentCount:25600,speciesCount:10,worldSizeMult:20,interactionRange:2,startRadiusMul:16,lockMatrix:!1,speciesSpread:0,seed:1}}const lc=[0,.15,.3,.5,1,2],mr=e=>e.speciesInteractionRadius*e.forceSofteningMul,gr=e=>e.drawRadius+e.collisionModifier,br=e=>e.speciesInteractionRadius*e.coreRadiusFrac,vr=(e,t)=>1-t*(1-e),ac=[["dt","Speed (dt)",0,.5,.01,"sim"],["movementScaling","Movement Scaling",.1,4,.1,"sim"],["drawRadius","Draw Size",1,5,.1,"sim"],["collisionModifier","Collide Modifier",0,5,.5,"sim"],["damping","Damping",.7,1,.01,"sim"],["minSpeed","Min Speed",0,5,.1,"sim"],["maxSpeed","Max Speed",2,1e3,1,"sim"],["movementRandomness","Randomness",0,.25,.01,"sim"],["centerAttraction","Center Pull",0,.1,.01,"sim"],["boidVisionRadius","Vision Radius",10,500,5,"boids"],["alignmentForce","Alignment",0,2,.1,"boids"],["cohesionForce","Cohesion",0,2,.1,"boids"],["separationForce","Separation",0,3,.1,"boids"],["speciesInteractionRadius","Sense Radius",10,500,5,"plife"],["forceSofteningMul","Force Soften Mult",0,10,.1,"plife"],["maxForce","Max Force",0,2e3,1,"plife"],["coreStrength","Core Repulsion",0,20,.1,"core"],["coreRadiusFrac","Core Radius",0,1,.01,"core"],["coreSizeSpread","Size Spread",0,1,.05,"core"],["mediumForce","Medium Force",0,40,.5,"medium"],["mediumDiffuse","Diffusion",0,1,.05,"medium"],["mediumDisplace","Displacement",0,1,.05,"medium"],["mediumCapacityMul","Displace Threshold",.25,8,.25,"medium"]];function cc(e){let t=e>>>0;return function(){t=t+1831565813|0;let i=Math.imul(t^t>>>15,1|t);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}}function uc(e,t){let n=e>>>0^Math.imul(t>>>0,2654435769);return n^=n>>>16,n=Math.imul(n,2146121005),n^=n>>>15,n=Math.imul(n,2221713035),n^=n>>>16,n>>>0}const gt={positions:1,matrix:2,philicity:3,sizeSeeds:4,randomConfig:5},bt=(e,t)=>cc(uc(e,t));function pi(){return Math.random()*4294967296>>>0}const On=Math.PI*2,Qn=e=>(t,n)=>t+e()*(n-t);function yr(e,t,n=Math.random){const i=Qn(n),s=new Float32Array(e*e);for(let o=0;o<s.length;o++)s[o]=i(-t,t);return s}function xr(e,t,n=Math.random){const i=Qn(n),s=new Float32Array(e*e);for(let o=0;o<e;o++)for(let r=o;r<e;r++){const a=i(-t,t);s[o*e+r]=a,s[r*e+o]=a}return s}function Sr(e,t=Math.random){const n=Qn(t),i=new Float32Array(e);for(let s=0;s<e;s++)i[s]=n(-1,1);return i}function wr(e,t=Math.random){const n=new Float32Array(e);for(let i=0;i<e;i++)n[i]=t();return n}function hi(e,t,n,i){const s=Dt*e.startRadiusMul*.5;return[i(-s,s),i(-s,s)]}function Ws(e,t){const n=Dt*e.startRadiusMul*.25,i=On/e.agentCount*t;return[Math.cos(i)*n,Math.sin(i)*n]}function $s(e,t,n,i){const s=Dt/e.speciesCount*e.startRadiusMul,o=s*e.speciesCount*.5,r=i(n*s,(n+1)*s)-o,a=i(0,Dt)-Dt*.5;return[r,a]}function js(e,t){const n=Dt*e.startRadiusMul*.5,i=4,s=3,o=.015,r=t()*On;return(a,u,h,f)=>{const g=On/i*(u%i);let y=u/e.agentCount*n,T=s*(y/n)*On+g+r;return T+=f(-o,o),y+=f(-o*n,o*n),[Math.cos(T)*y,Math.sin(T)*y]}}function dc(e,t,n){switch(e){case 0:return[hi,!1];case 1:return[hi,!0];case 2:return[Ws,!1];case 3:return[Ws,!0];case 4:return[js(t,n),!1];case 5:return[js(t,n),!0];case 6:return[$s,!1];case 7:return[$s,!0];default:return[hi,!1]}}function fc(e,t={}){const n=e.seed>>>0,i=bt(n,gt.positions),s=Qn(i),[o,r]=dc(e.startingMethod,e,i),a=new Float32Array(e.agentCount*4),u=new Float32Array(e.agentCount),h=e.speciesSpread??0,f=e.speciesCount-1;for(let F=0;F<e.agentCount;F++){const E=F%e.speciesCount,[v,R]=o(e,F,E,s);a[F*4+0]=v,a[F*4+1]=R,a[F*4+2]=0,a[F*4+3]=0,u[F]=h?Math.min(f,Math.max(0,E+s(-h,h))):E}const g=e.speciesCount,S=e.lockMatrix&&t.matrix&&t.matrix.length===g*g,y=bt(n,gt.matrix),T=S?t.matrix:r?xr(g,e.interactionRange,y):yr(g,e.interactionRange,y),x=F=>S&&F&&F.length===g,K=x(t.philicity)?t.philicity:Sr(g,bt(n,gt.philicity)),G=x(t.sizeSeeds)?t.sizeSeeds:wr(g,bt(n,gt.sizeSeeds));return{particles:a,species:u,matrix:T,philicity:K,sizeSeeds:G}}const en=256,Hs=64,Ks=16,qs=8,Tn=4,ut="rgba16float",pc=3;let hc=Za,mc=Qa;const Ys=new Set;var me,Cr,Pr,Mr,kr,Rr,Ai,Bi,rn;const Qi=class Qi{constructor(t,n,i,s){ss(this,me);this.device=t,this.context=n,this.format=i,this.canvas=s,this.cellSize=ec,this.worldSize=0,this.cellsPerRow=0,this.numCells=0,this.maxCollisions=Ls,this.agentCount=0,this.speciesCount=0,this.matrix=null,this.philicity=null,this.sizeSeeds=null,this.coreSizes=null,this.lastSizeSpread=-1,this.currentBuf=0,this.frameIndex=0,this.mediumFlip=0,this.paramData=new Float32Array(Hs),this.paramBuffer=t.createBuffer({label:"params",size:Hs*4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.buffers={},this.bindGroups=[],De(this,me,Cr).call(this),Ys.add(this)}static async create(t){if(!navigator.gpu)throw new Error("WebGPU is not available in this browser. Try Chrome/Edge 113+, or Safari 26+.");const n=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!n)throw new Error("No suitable GPU adapter found.");const i=await n.requestDevice(),s=t.getContext("webgpu"),o=navigator.gpu.getPreferredCanvasFormat();s.configure({device:i,format:o,alphaMode:"opaque"});const r=new Qi(i,s,o,t);return r.buildPipelines(),r}buildPipelines(){const t=this.device,n=t.createShaderModule({label:"compute.wgsl",code:hc}),i=t.createShaderModule({label:"render.wgsl",code:mc});this.pendingCompilation=Promise.all([Js(n,"compute.wgsl"),Js(i,"render.wgsl")]);const s=t.createPipelineLayout({bindGroupLayouts:[this.computeBGL]}),o=(y,T)=>t.createComputePipeline({label:T?`${y}:${JSON.stringify(T)}`:y,layout:s,compute:{module:n,entryPoint:y,constants:T}});this.pipelines={countCells:o("countCells"),prefixSum:o("prefixSum"),scatter:o("scatter"),diffuseMedium:o("diffuseMedium"),densitySplat:o("densitySplat"),densityNormalize:o("densityNormalize"),densityBlur10:o("densityBlur",{DENS_1_TO_0:1}),densityBlur01:o("densityBlur",{DENS_1_TO_0:0}),resolveCollide:o("resolveCollide"),blobDensityInit:o("blobDensityInit"),blobBlurAB:o("blobBlur",{BLUR_A_TO_B:1}),blobBlurBA:o("blobBlur",{BLUR_A_TO_B:0}),blobSeed:o("blobSeed"),blobPropagate:o("blobPropagate"),resolveBlobs:o("resolveBlobs"),mutateSpecies:o("mutateSpecies")},this.runSimPipelines={discrete:o("runSim",{CONTINUOUS_SPECIES:0}),continuous:o("runSim",{CONTINUOUS_SPECIES:1})};const r={color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},a=t.createPipelineLayout({bindGroupLayouts:[this.renderBGL]}),u={color:{srcFactor:"one",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one",operation:"add"}},h={color:{srcFactor:"one",dstFactor:"one",operation:"reverse-subtract"},alpha:{srcFactor:"zero",dstFactor:"one",operation:"add"}},f=[{arrayStride:Ks,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32x2"},{shaderLocation:1,offset:8,format:"float32x2"}]},{arrayStride:4,stepMode:"instance",attributes:[{shaderLocation:2,offset:0,format:"float32"}]},{arrayStride:4,stepMode:"instance",attributes:[{shaderLocation:3,offset:0,format:"uint32"}]}],g=(y,T,x,K=this.format)=>t.createRenderPipeline({label:y,layout:a,vertex:{module:i,entryPoint:"vsParticle",constants:{GLOW_PASS:T?1:0},buffers:f},fragment:{module:i,entryPoint:"fsParticle",constants:{GLOW_PASS:T?1:0},targets:[{format:K,blend:T?x:r}]},primitive:{topology:"triangle-strip"}});this.particlePipeline=g("particles",!1),this.glowPipeline=g("particles:glow",!0,u),this.glowPipelineDark=g("particles:glow-dark",!0,h);const S=(y,T,x=this.format)=>t.createRenderPipeline({label:y,layout:a,vertex:{module:i,entryPoint:"vsFullscreen"},fragment:{module:i,entryPoint:T,targets:[{format:x,blend:r}]},primitive:{topology:"triangle-list"}});this.gridPipeline=S("grid","fsGrid"),this.mediumPipeline=S("medium","fsMedium"),this.fieldPipeline=S("field","fsField"),this.fadePipeline=t.createRenderPipeline({label:"trail-fade",layout:a,vertex:{module:i,entryPoint:"vsFullscreen"},fragment:{module:i,entryPoint:"fsFade",targets:[{format:ut,blend:r}]},primitive:{topology:"triangle-list"}}),this.blitPipeline=t.createRenderPipeline({label:"trail-blit",layout:t.createPipelineLayout({bindGroupLayouts:[this.renderBGL,this.blitBGL]}),vertex:{module:i,entryPoint:"vsFullscreen"},fragment:{module:i,entryPoint:"fsBlit",targets:[{format:this.format}]},primitive:{topology:"triangle-list"}}),this.accumPipelines={particles:g("particles:accum",!1,null,ut),glow:g("glow:accum",!0,u,ut),glowDark:g("glow-dark:accum",!0,h,ut),grid:S("grid:accum","fsGrid",ut),medium:S("medium:accum","fsMedium",ut),field:S("field:accum","fsField",ut),drift:t.createRenderPipeline({label:"drift:accum",layout:a,vertex:{module:i,entryPoint:"vsDrift"},fragment:{module:i,entryPoint:"fsDrift",targets:[{format:ut,blend:r}]},primitive:{topology:"triangle-strip"}})},this.driftPipeline=t.createRenderPipeline({label:"drift",layout:a,vertex:{module:i,entryPoint:"vsDrift"},fragment:{module:i,entryPoint:"fsDrift",targets:[{format:this.format,blend:r}]},primitive:{topology:"triangle-strip"}})}maxSupportedAgents(){const t=Math.min(this.device.limits.maxStorageBufferBindingSize,this.device.limits.maxBufferSize),n=Math.floor(t/4/5),i=this.device.limits.maxComputeWorkgroupsPerDimension*en;return Math.min(n,i)}restart(t){const n=this.device,i=this.maxSupportedAgents();if(t.agentCount>i)throw new Error(`${t.agentCount.toLocaleString()} agents exceeds this device's limit of ${i.toLocaleString()}.`);const{particles:s,species:o,matrix:r,philicity:a,sizeSeeds:u}=fc(t,{matrix:this.matrix,philicity:this.philicity,sizeSeeds:this.sizeSeeds});this.destroyBuffers(),this.agentCount=t.agentCount,this.speciesCount=t.speciesCount,this.matrix=r,this.philicity=a,this.currentBuf=0,this.mediumFlip=0,this.continuousSpecies=(t.speciesSpread??0)>0,this.worldSize=Dt*t.worldSizeMult,this.cellsPerRow=Math.ceil(this.worldSize/this.cellSize),this.numCells=this.cellsPerRow*this.cellsPerRow,this.maxCollisions=De(this,me,Pr).call(this,this.agentCount);const h=(G,F,E,v)=>{const R=n.createBuffer({label:G,size:Math.max(F,4),usage:E});return v&&n.queue.writeBuffer(R,0,v),R},f=GPUBufferUsage.STORAGE,g=GPUBufferUsage.VERTEX,S=GPUBufferUsage.COPY_DST,y=GPUBufferUsage.COPY_SRC;this.buffers={particleA:h("particleA",s.byteLength,f|g|S|y,s),particleB:h("particleB",s.byteLength,f|g|S|y,s),species:h("species",o.byteLength,f|g|S|y,o),matrix:h("matrix",(this.speciesCount+2)*this.speciesCount*4,f|S),grid:h("grid",(this.numCells*qs+2*this.numCells*Tn**2)*4,f|S|y),indices:h("indices",this.agentCount*pc*4,f|g|S|y),collisions:h("collisions",this.agentCount*(1+this.maxCollisions)*4,f|S)};const T=this.buffers;this.uploadMatrix(r,a,u);const x=new Float32Array(this.numCells).fill(1);n.queue.writeBuffer(T.grid,this.numCells*3*4,x),n.queue.writeBuffer(T.grid,this.numCells*4*4,x),this.renderBindGroup=n.createBindGroup({layout:this.renderBGL,entries:[{binding:0,resource:{buffer:this.paramBuffer}},{binding:1,resource:{buffer:T.grid}}]});const K=(G,F)=>n.createBindGroup({layout:this.computeBGL,entries:[{binding:0,resource:{buffer:this.paramBuffer}},{binding:1,resource:{buffer:G}},{binding:2,resource:{buffer:F}},{binding:3,resource:{buffer:T.species}},{binding:4,resource:{buffer:T.matrix}},{binding:5,resource:{buffer:T.grid}},{binding:6,resource:{buffer:T.indices}},{binding:7,resource:{buffer:T.collisions}}]});this.bindGroups=[K(T.particleA,T.particleB),K(T.particleB,T.particleA)],this.particleBuffers=[T.particleA,T.particleB]}uploadMatrix(t,n=this.philicity,i=this.sizeSeeds){this.matrix=t,this.philicity=n,this.sizeSeeds=i,this.coreSizes=new Float32Array(i.length),this.lastSizeSpread=-1;const s=this.device.queue;s.writeBuffer(this.buffers.matrix,0,t),s.writeBuffer(this.buffers.matrix,t.byteLength,n)}destroyBuffers(){var t;for(const n of Object.values(this.buffers))(t=n.destroy)==null||t.call(n);this.buffers={},this.bindGroups=[]}frame(t){if(!this.agentCount)return;const n=this.canvas;De(this,me,Mr).call(this,t.coreSizeSpread),De(this,me,kr).call(this,t,n.width,n.height);const i=this.device,s=i.createCommandEncoder(),o=t.dt>0,r=!!t.mediumEnabled;if(o){if(s.clearBuffer(this.buffers.grid,0,this.numCells*4),s.clearBuffer(this.buffers.collisions,0,this.agentCount*4),t.fieldMode>0){const K=this.numCells*Tn**2*4;s.clearBuffer(this.buffers.grid,this.numCells*qs*4,K)}const T=Math.ceil(this.agentCount/en),x=s.beginComputePass();if(x.setBindGroup(0,this.bindGroups[this.currentBuf]),x.setPipeline(this.pipelines.countCells),x.dispatchWorkgroups(T),x.setPipeline(this.pipelines.prefixSum),x.dispatchWorkgroups(1),x.setPipeline(this.pipelines.scatter),x.dispatchWorkgroups(T),r&&(x.setPipeline(this.pipelines.diffuseMedium),x.dispatchWorkgroups(Math.ceil(this.numCells/en))),x.setPipeline(this.continuousSpecies?this.runSimPipelines.continuous:this.runSimPipelines.discrete),x.dispatchWorkgroups(T),x.setPipeline(this.pipelines.resolveCollide),x.dispatchWorkgroups(T),t.blobsEnabled){const K=Math.ceil(this.numCells/en);if(this.frameIndex%Math.max(1,t.blobInterval)===0){x.setPipeline(this.pipelines.blobDensityInit),x.dispatchWorkgroups(K);for(let F=0;F<t.blobSmoothing;F++)x.setPipeline(this.pipelines.blobBlurAB),x.dispatchWorkgroups(K),x.setPipeline(this.pipelines.blobBlurBA),x.dispatchWorkgroups(K);x.setPipeline(this.pipelines.blobSeed),x.dispatchWorkgroups(K),x.setPipeline(this.pipelines.blobPropagate);const G=Math.min(this.cellsPerRow,t.blobRounds);for(let F=0;F<G;F++)x.dispatchWorkgroups(K)}x.setPipeline(this.pipelines.resolveBlobs),x.dispatchWorkgroups(T),t.mutateEnabled&&this.frameIndex%Math.max(1,t.mutateInterval)===0&&(x.setPipeline(this.pipelines.mutateSpecies),x.dispatchWorkgroups(T),this.continuousSpecies=!0)}if(t.fieldMode>0){const K=this.numCells*Tn**2,G=Math.ceil(K/en);x.setPipeline(this.pipelines.densitySplat),x.dispatchWorkgroups(T),x.setPipeline(this.pipelines.densityNormalize),x.dispatchWorkgroups(G);for(let F=0;F<t.fieldSmoothing;F++)x.setPipeline(this.pipelines.densityBlur10),x.dispatchWorkgroups(G),x.setPipeline(this.pipelines.densityBlur01),x.dispatchWorkgroups(G)}x.end(),this.currentBuf=1-this.currentBuf}const a=on[t.background]??on[0],u=this.context.getCurrentTexture().createView(),h=t.trailStrength>0;h?De(this,me,Rr).call(this):De(this,me,Bi).call(this);const f=h?this.accumView:u,g=h&&this.accumNeedsClear,S=h?this.accumPipelines:this,y=s.beginRenderPass({colorAttachments:[{view:f,clearValue:a.rgb,loadOp:h&&!g?"load":"clear",storeOp:"store"}]});if(y.setBindGroup(0,this.renderBindGroup),h&&!g&&(y.setPipeline(this.fadePipeline),y.draw(3)),this.accumNeedsClear=!1,t.driftEnabled){const T=Math.max(1,Math.round(t.driftCols));y.setPipeline(h?S.drift:this.driftPipeline),y.draw(4,T*T)}if(t.showMedium&&r&&(y.setPipeline(h?S.medium:this.mediumPipeline),y.draw(3)),t.fieldMode>0&&(y.setPipeline(h?S.field:this.fieldPipeline),y.draw(3)),t.showGrid&&(y.setPipeline(h?S.grid:this.gridPipeline),y.draw(3)),!t.showAgents){y.end(),h&&De(this,me,Ai).call(this,s,u,a),i.queue.submit([s.finish()]),this.frameIndex++,o&&r&&(this.mediumFlip=1-this.mediumFlip);return}if(y.setVertexBuffer(0,this.particleBuffers[this.currentBuf]),y.setVertexBuffer(1,this.buffers.species),y.setVertexBuffer(2,this.buffers.indices,this.agentCount*2*4),t.glowStrength>0){const T=a.light;y.setPipeline(h?T?S.glowDark:S.glow:T?this.glowPipelineDark:this.glowPipeline),y.draw(4,this.agentCount)}y.setPipeline(h?S.particles:this.particlePipeline),y.draw(4,this.agentCount),y.end(),h&&De(this,me,Ai).call(this,s,u,a),i.queue.submit([s.finish()]),this.frameIndex++,o&&r&&(this.mediumFlip=1-this.mediumFlip)}fitZoom(t=0){if(!this.worldSize)return .1;const n=Math.max(1,this.canvas.width-t);return Math.min(n,this.canvas.height)*.92/this.worldSize}get avgPerCell(){return this.numCells?this.agentCount/this.numCells:0}async readSpecies(t=8){return De(this,me,rn).call(this,this.buffers.species,Math.min(t,this.agentCount)*4)}async readAgentBlobs(t=this.agentCount){const n=Math.min(t,this.agentCount),i=await De(this,me,rn).call(this,this.buffers.indices,n*4,this.agentCount*2*4);return new Uint32Array(i.buffer)}async readCellBlobs(){const t=this.numCells,n=await De(this,me,rn).call(this,this.buffers.grid,t*4,0),i=await De(this,me,rn).call(this,this.buffers.grid,t*4,5*t*4);return{counts:new Uint32Array(n.buffer),labels:new Uint32Array(i.buffer)}}async readParticles(t=8){const i=Math.min(t,this.agentCount)*Ks,s=this.device.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),o=this.device.createCommandEncoder();o.copyBufferToBuffer(this.particleBuffers[this.currentBuf],0,s,0,i),this.device.queue.submit([o.finish()]),await s.mapAsync(GPUMapMode.READ);const r=new Float32Array(s.getMappedRange().slice(0));return s.unmap(),s.destroy(),r}destroy(){var t,n,i,s;Ys.delete(this),De(this,me,Bi).call(this),this.destroyBuffers(),(n=(t=this.paramBuffer).destroy)==null||n.call(t),(s=(i=this.device).destroy)==null||s.call(i)}};me=new WeakSet,Cr=function(){const t=this.device,n=i=>({buffer:{type:i}});this.computeBGL=t.createBindGroupLayout({label:"compute",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,...n("read-only-storage")},{binding:2,visibility:GPUShaderStage.COMPUTE,...n("storage")},{binding:3,visibility:GPUShaderStage.COMPUTE,...n("storage")},{binding:4,visibility:GPUShaderStage.COMPUTE,...n("read-only-storage")},{binding:5,visibility:GPUShaderStage.COMPUTE,...n("storage")},{binding:6,visibility:GPUShaderStage.COMPUTE,...n("storage")},{binding:7,visibility:GPUShaderStage.COMPUTE,...n("storage")}]}),this.blitBGL=t.createBindGroupLayout({label:"blit",entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"unfilterable-float"}}]}),this.renderBGL=t.createBindGroupLayout({label:"render",entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}}]})},Pr=function(t){const n=Math.min(this.device.limits.maxStorageBufferBindingSize,this.device.limits.maxBufferSize),i=Math.floor(n/4/t)-1,s=i>0?2**Math.floor(Math.log2(i)):0;return Math.max(4,Math.min(Ls,s))},Mr=function(t){if(t===this.lastSizeSpread)return;this.lastSizeSpread=t;const n=this.coreSizes;for(let i=0;i<n.length;i++)n[i]=vr(this.sizeSeeds[i],t);this.device.queue.writeBuffer(this.buffers.matrix,(this.speciesCount+1)*this.speciesCount*4,n)},kr=function(t,n,i){const s=this.paramData;s[0]=t.dt,s[1]=t.mixT,s[2]=this.agentCount,s[3]=this.speciesCount,s[4]=t.boidVisionRadius,s[5]=t.speciesInteractionRadius,s[6]=t.alignmentForce,s[7]=t.cohesionForce,s[8]=t.separationForce,s[9]=t.movementRandomness,s[10]=t.movementScaling,s[11]=mr(t),s[12]=t.centerAttraction,s[13]=t.damping,s[14]=t.minSpeed,s[15]=t.maxSpeed,s[16]=t.maxForce,s[17]=gr(t),s[18]=this.maxCollisions,s[19]=this.cellSize,s[20]=this.cellsPerRow,s[21]=this.numCells,s[22]=t.drawRadius,s[23]=this.worldSize,s[24]=t.cameraX,s[25]=t.cameraY,s[26]=t.zoom,s[27]=n,s[28]=i,s[29]=this.frameIndex,s[30]=t.mediumEnabled?t.mediumForce:0,s[31]=t.mediumDiffuse,s[32]=t.mediumDisplace,s[33]=Math.max(1,t.mediumCapacityMul*this.avgPerCell),s[34]=this.mediumFlip,s[35]=t.showMedium&&t.mediumEnabled?1:0;const o=t.coreEnabled&&t.coreStrength>0;s[36]=o?br(t):0,s[37]=t.coreStrength,s[38]=t.coreFalloff,s[39]=t.renderMode===1&&!t.blobsEnabled?0:t.renderMode,s[40]=Math.max(1,Math.round(t.blobMinDensity*this.avgPerCell)),s[41]=t.mutateRate,s[42]=t.mutateBias,s[43]=t.mutateInterval,s[44]=Math.max(1,Math.round(t.driftCols)),s[45]=t.driftSize,s[46]=t.driftSpeed,s[47]=t.driftBrightness,s[48]=t.particleShape,s[49]=t.speciesPalette,s[50]=t.glowStrength,s[51]=t.glowSize,s[52]=t.velocityStretch,s[53]=t.drawScale,s[54]=t.drawJitter,s[55]=1-Math.min(.995,Math.max(0,t.trailStrength));const r=on[t.background]??on[0];s[56]=r.rgb.r,s[57]=r.rgb.g,s[58]=r.rgb.b,s[59]=t.fieldMode,s[60]=Math.max(1e-4,t.fieldThresholdMul*this.avgPerCell/Tn**2),s[61]=t.fieldStrength,this.device.queue.writeBuffer(this.paramBuffer,0,s)},Rr=function(){var i,s;const{width:t,height:n}=this.canvas;this.accum&&this.accumW===t&&this.accumH===n||((s=(i=this.accum)==null?void 0:i.destroy)==null||s.call(i),this.accum=this.device.createTexture({label:"trail-accum",size:{width:t,height:n},format:ut,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),this.accumW=t,this.accumH=n,this.accumView=this.accum.createView(),this.blitBindGroup=this.device.createBindGroup({layout:this.blitBGL,entries:[{binding:0,resource:this.accumView}]}),this.accumNeedsClear=!0)},Ai=function(t,n,i){const s=t.beginRenderPass({colorAttachments:[{view:n,clearValue:i.rgb,loadOp:"clear",storeOp:"store"}]});s.setPipeline(this.blitPipeline),s.setBindGroup(0,this.renderBindGroup),s.setBindGroup(1,this.blitBindGroup),s.draw(3),s.end()},Bi=function(){var t,n;this.accum&&((n=(t=this.accum).destroy)==null||n.call(t),this.accum=null,this.accumView=null,this.blitBindGroup=null)},rn=async function(t,n,i=0){const s=this.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),o=this.device.createCommandEncoder();o.copyBufferToBuffer(t,i,s,0,n),this.device.queue.submit([o.finish()]),await s.mapAsync(GPUMapMode.READ);const r=new Float32Array(s.getMappedRange().slice(0));return s.unmap(),s.destroy(),r};let Ei=Qi;async function Js(e,t){const n=await e.getCompilationInfo();for(const i of n.messages){const s=`${t}:${i.lineNum}:${i.linePos}`;i.type==="error"?console.error(`[WGSL] ${s} ${i.message}`):i.type==="warning"&&console.warn(`[WGSL] ${s} ${i.message}`)}}const qt=(e,t)=>{const n=e.__vccOpts||e;for(const[i,s]of t)n[i]=s;return n},gc={__name:"SimCanvas",props:{params:{type:Object,required:!0}},emits:["ready","error","fps","zoom","pan"],setup(e,{emit:t}){const n=e,i=t,s=pe(null);let o=null,r=0,a=null,u=0,h=performance.now();function f(){const v=s.value;if(!v)return;const R=Math.min(window.devicePixelRatio||1,2),_=Math.max(1,Math.floor(v.clientWidth*R)),N=Math.max(1,Math.floor(v.clientHeight*R));(v.width!==_||v.height!==N)&&(v.width=_,v.height=N)}function g(){r=requestAnimationFrame(g),f(),o.frame(n.params),u++;const v=performance.now();v-h>=500&&(i("fps",Math.round(u*1e3/(v-h))),u=0,h=v)}let S=!1,y=0,T=0;function x(v){v.preventDefault();const R=s.value,_=R.getBoundingClientRect(),N=Math.min(window.devicePixelRatio||1,2),J=(v.clientX-_.left)*N-R.width*.5,ie=(v.clientY-_.top)*N-R.height*.5;i("zoom",v.deltaY<0?1.08:1/1.08,J,ie)}function K(v){S=!0,y=v.clientX,T=v.clientY,s.value.setPointerCapture(v.pointerId)}function G(v){if(!S)return;const R=Math.min(window.devicePixelRatio||1,2);i("pan",(v.clientX-y)*R,(v.clientY-T)*R),y=v.clientX,T=v.clientY}function F(v){var R,_;S=!1,(_=(R=s.value)==null?void 0:R.releasePointerCapture)==null||_.call(R,v.pointerId)}let E=!1;return Hi(async()=>{var v,R;f();try{o=await Ei.create(s.value)}catch(_){i("error",_.message??String(_));return}if(E){o.destroy(),o=null;return}(R=(v=o.device).addEventListener)==null||R.call(v,"uncapturederror",_=>{var N;console.error("[WebGPU]",((N=_.error)==null?void 0:N.message)??_.error)}),i("ready",o),r=requestAnimationFrame(g),a=new ResizeObserver(f),a.observe(s.value)}),Ki(()=>{E=!0,cancelAnimationFrame(r),a==null||a.disconnect(),o==null||o.destroy()}),(v,R)=>(z(),D("canvas",{ref_key:"canvas",ref:s,class:"sim",onWheel:x,onPointerdown:K,onPointermove:G,onPointerup:F,onPointercancel:F,onContextmenu:R[0]||(R[0]=Ji(()=>{},["prevent"]))},null,544))}},bc=qt(gc,[["__scopeId","data-v-78e2e7d6"]]),vc=["title","onPointerdown","onWheel"],yc={class:"strip-label"},xc=["title","onPointerdown","onPointermove","onPointerup","onPointercancel","onWheel"],Sc={key:0,class:"edit-hint"},wc={key:0,class:"live"},Cc={key:1},Pc=3,Mc=1,kc={__name:"InteractionMatrix",props:{matrix:{type:Object,default:null},philicity:{type:Object,default:null},coreSizes:{type:Object,default:null},speciesCount:{type:Number,required:!0},editable:{type:Boolean,default:!1}},emits:["edit"],setup(e,{emit:t}){const n=e,i=t,s=E=>E==="philicity"?Mc:Pc,o=(E,v)=>Math.min(v,Math.max(-v,E)),r=pe(null);let a=null;function u(E,v,R,_,N){n.editable&&(E.preventDefault(),a={kind:v,i:R,j:_,startY:E.clientY,start:N,moved:!1},r.value={kind:v,i:R,j:_,value:N},E.currentTarget.setPointerCapture(E.pointerId))}function h(E){if(!a)return;const v=a.startY-E.clientY;Math.abs(v)>2&&(a.moved=!0);const R=s(a.kind);S(a.kind,a.i,a.j,o(a.start+v*R/120,R))}function f(E){var v,R;a&&(a.moved||S(a.kind,a.i,a.j,0),(R=(v=E.currentTarget)==null?void 0:v.releasePointerCapture)==null||R.call(v,E.pointerId),a=null,r.value=null)}function g(E,v,R,_,N){if(!n.editable||!v)return;E.preventDefault();const J=s(v),ie=E.shiftKey?.01:.1;S(v,R,_,o(N-Math.sign(E.deltaY)*ie,J))}function S(E,v,R,_){const N=Math.round(_*100)/100;r.value&&(r.value={kind:E,i:v,j:R,value:N}),i("edit",{kind:E,i:v,j:R,value:N})}function y(E){const v=Math.min(1,Math.max(0,E)),R=(N,J,ie)=>N.map((he,Ie)=>he+(J[Ie]-he)*ie);let _;return v<.25?_=R([0,0,1],[0,1,1],v/.25):v<.5?_=R([0,1,1],[0,1,0],(v-.25)/.25):v<.75?_=R([0,1,0],[1,1,0],(v-.5)/.25):_=R([1,1,0],[1,0,0],(v-.75)/.25),_.map(N=>Math.round(N*255))}const T=E=>{const[v,R,_]=y(E/Math.max(n.speciesCount-1,1));return`rgb(${v} ${R} ${_})`},x=Ke(()=>n.speciesCount<=11),K=Ke(()=>{const E=n.speciesCount;if(!n.matrix||n.matrix.length<E*E)return[];const v=Math.max(...Array.from(n.matrix,Math.abs),1e-4),R=[];for(let _=0;_<E;_++){const N=[];for(let J=0;J<E;J++){const ie=n.matrix[_*E+J],he=Math.abs(ie)/v,Ie=ie>=0?"130 60%":"355 70%";N.push({v:ie,bg:`hsl(${Ie} ${18+he*32}%)`,text:ie.toFixed(1)})}R.push(N)}return R});function G(E,v,R){const _=n.speciesCount;if(!E||E.length<_)return null;const N=[];for(let J=0;J<_;J++){const ie=E[J],he=Math.min(1,Math.abs(ie));N.push({v:ie,bg:`hsl(${v(ie)} ${16+he*34}%)`,text:ie.toFixed(1),title:`species ${J+1}: ${ie.toFixed(2)} — ${R(ie)}`})}return N}const F=Ke(()=>[{label:"Philicity",kind:"philicity",cells:G(n.philicity,E=>E>=0?"190 55%":"32 65%",E=>E>=0?"philic":"phobic")},{label:"Core size",kind:null,cells:G(n.coreSizes,()=>"272 50%",E=>E<.05?"no excluded volume":"excluded volume")}].filter(E=>E.cells));return(E,v)=>(z(),D(Z,null,[l("div",{class:Me(["matrix",{compact:!x.value}]),style:pt({"--n":e.speciesCount})},[(z(!0),D(Z,null,ge(K.value,(R,_)=>(z(),D(Z,{key:_},[l("div",{class:"tag",style:pt({background:T(_)})},null,4),(z(!0),D(Z,null,ge(R,(N,J)=>(z(),D("div",{key:J,class:Me(["cell",{editable:e.editable}]),style:pt({background:N.bg}),title:`${_+1} → ${J+1}: ${N.text}`,onPointerdown:ie=>u(ie,"matrix",_,J,N.v),onPointermove:h,onPointerup:f,onPointercancel:f,onWheel:ie=>g(ie,"matrix",_,J,N.v)},[x.value?(z(),D(Z,{key:0},[W(k(N.text),1)],64)):Ce("",!0)],46,vc))),128))],64))),128))],6),(z(!0),D(Z,null,ge(F.value,R=>(z(),D(Z,{key:R.label},[l("div",yc,k(R.label),1),l("div",{class:Me(["matrix",{compact:!x.value}]),style:pt({"--n":e.speciesCount})},[v[0]||(v[0]=l("div",{class:"tag"},null,-1)),(z(!0),D(Z,null,ge(R.cells,(_,N)=>(z(),D("div",{key:N,class:Me(["cell",{editable:e.editable&&R.kind}]),style:pt({background:_.bg}),title:_.title,onPointerdown:J=>R.kind&&u(J,R.kind,N,0,_.v),onPointermove:J=>R.kind&&h(J),onPointerup:J=>R.kind&&f(J),onPointercancel:J=>R.kind&&f(J),onWheel:J=>g(J,R.kind,N,0,_.v)},[x.value?(z(),D(Z,{key:0},[W(k(_.text),1)],64)):Ce("",!0)],46,xc))),128))],6)],64))),128)),e.editable?(z(),D("div",Sc,[r.value?(z(),D("span",wc,[W(k(r.value.kind==="philicity"?`species ${r.value.i+1}`:`${r.value.i+1} → ${r.value.j+1}`)+" ",1),l("b",null,k(r.value.value.toFixed(2)),1)])):(z(),D("span",Cc,"Drag a cell up/down to change it · scroll to nudge · click to zero"))])):Ce("",!0)],64))}},Rc=qt(kc,[["__scopeId","data-v-5c1268e9"]]),Tc=1,Xi="plb.presets",Tr=(e,t=4)=>Number(e.toFixed(t)),mi=(e,t=3)=>e?Array.from(e,n=>Tr(n,t)):null;function Ec({params:e,startup:t,matrix:n,philicity:i,sizeSeeds:s,name:o}){const r={version:Tc,name:o||void 0,params:{},startup:{...t}};for(const[a,u]of Object.entries(e))r.params[a]=typeof u=="number"?Tr(u):u;return n&&(r.matrix=mi(n)),i&&(r.philicity=mi(i)),s&&(r.sizeSeeds=mi(s)),r}function Ac(e,{params:t,startup:n}){if(!e||typeof e!="object")throw new Error("Config must be an object.");const i=(a,u,h)=>{let f=!1;if(!u||typeof u!="object")return f;for(const g of Object.keys(h)){if(!(g in u))continue;const S=u[g],y=typeof h[g]=="number";y&&(typeof S!="number"||!Number.isFinite(S))||!y&&typeof S!=typeof h[g]||(a[g]!==S&&(f=!0),a[g]=S)}return f};i(t,e.params,pr());const s=i(n,e.startup,hr()),o=n.speciesCount,r=(a,u)=>Array.isArray(a)&&a.length===u?Float32Array.from(a):null;return{needsRestart:s,matrix:r(e.matrix,o*o),philicity:r(e.philicity,o),sizeSeeds:r(e.sizeSeeds,o)}}let ei=Math.random;const le=(e,t)=>e+ei()*(t-e),Ft=e=>e[Math.floor(ei()*e.length)],Te=e=>ei()<e,Se=(e,t)=>Math.round(e/t)*t,Bc={sim:{mixT:[0,1,.05],dt:[.15,.35,.01],movementScaling:[.6,2,.1],damping:[.92,1,.01],minSpeed:[0,2,.1],maxSpeed:[200,800,1],movementRandomness:[0,.06,.01],centerAttraction:[0,.03,.01],collisionModifier:[0,3,.5]},boids:{boidVisionRadius:[150,450,5],alignmentForce:[0,2,.1],cohesionForce:[0,2,.1],separationForce:[0,3,.1]},plife:{speciesInteractionRadius:[120,400,5],forceSofteningMul:[1,6,.1],maxForce:[500,1500,1]}},Xs=[["startup","Startup"],["matrix","Interaction Matrix"],["sim","Simulation"],["boids","Boids"],["plife","Particle Life"],["core","Excluded Volume"],["medium","Medium"],["blobs","Blobs"],["view","View"]];function Fc(e={},t=Math.random){ei=t;const n={},i=o=>!e[o];for(const[o,r]of Object.entries(Bc))if(i(o))for(const[a,[u,h,f]]of Object.entries(r))n[a]=Se(le(u,h),f);i("core")&&(n.coreEnabled=Te(.75),n.coreStrength=Te(.8)?Se(le(.1,1.2),.1):Se(le(1.5,5),.1),n.coreRadiusFrac=Se(le(.02,.25),.01),n.coreSizeSpread=Te(.5)?0:Se(le(.1,1),.05),n.coreFalloff=Math.floor(le(0,4))),i("medium")&&(n.mediumEnabled=Te(.4),n.mediumForce=Se(le(3,20),.5),n.mediumDiffuse=Se(le(.2,.8),.05),n.mediumDisplace=Se(le(.1,.5),.05),n.mediumCapacityMul=Se(le(1,4),.25)),i("blobs")&&(n.blobsEnabled=Te(.3),n.blobMinDensity=Se(le(1,4),.1),n.blobSmoothing=Math.floor(le(0,5)),n.mutateEnabled=n.blobsEnabled&&Te(.5),n.mutateRate=Se(le(.02,.2),.01)),i("view")&&(n.renderMode=Te(.75)?0:Ft([1,2]),n.particleShape=Math.floor(le(0,8)),n.speciesPalette=Math.floor(le(0,14)),n.background=Te(.85)?Math.floor(le(0,11)):Math.floor(le(11,14)),n.glowStrength=Te(.5)?0:Se(le(.1,.8),.02),n.glowSize=Se(le(2,8),.5),n.velocityStretch=Te(.6)?0:Se(le(1,30),.25),n.drawScale=Se(le(.6,3),.1),n.drawJitter=Te(.5)?0:Se(le(.1,.8),.05),n.trailStrength=Te(.7)?0:Se(le(.5,.95),.01),n.fieldMode=Te(.8)?0:Ft([1,2]),n.fieldSmoothing=Math.floor(le(1,5)),n.fieldThresholdMul=Se(le(1,5),.1),n.fieldStrength=Se(le(.6,1),.05),n.showAgents=n.fieldMode===2?Te(.5):!0,n.driftEnabled=Te(.1),n.driftBrightness=Se(le(.2,.7),.05),n.renderMode===1&&(i("blobs")?n.blobsEnabled=!0:n.renderMode=0));const s=i("startup")?{startingMethod:Math.floor(le(0,8)),speciesCount:Ft([3,4,5,6,7,8,9,10,12,16]),interactionRange:Ft([1,2,3]),speciesSpread:Te(.7)?0:Ft([.15,.3,.5,1])}:{};return{params:n,startup:s,needsRestart:i("startup"),rerollMatrix:i("matrix")}}const Oc=["amber","brisk","coral","dusky","eager","faint","glassy","hazy","ionic","jagged","keen","lucid","molten","noble","opal","placid","quiet","restless","silken","tidal","umbral","vivid","woven","zephyr"],zc=["bloom","cascade","drift","ember","filament","gyre","halo","isthmus","lattice","mantle","nimbus","orbit","plume","quanta","ripple","stratum","tendril","vortex","wisp"];function Zs(e=[]){const t=new Set(e);for(let n=0;n<50;n++){const i=`${Ft(Oc)}-${Ft(zc)}`;if(!t.has(i))return i}return`preset-${Date.now().toString(36)}`}function Zi(){try{const e=JSON.parse(localStorage.getItem(Xi)||"{}");return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}function Ic(e,t){const n=Zi();return n[e]={...t,name:e},localStorage.setItem(Xi,JSON.stringify(n)),n}function Dc(e){const t=Zi();return delete t[e],localStorage.setItem(Xi,JSON.stringify(t)),t}const Lc={class:"header-actions"},_c=["disabled"],Uc=["disabled"],Nc=["title"],Vc={class:"scroll"},Gc={class:"mix-label"},Wc={class:"actions"},$c={class:"ico"},jc=["title"],Hc={class:"preset-row"},Kc=["value"],qc=["disabled"],Yc={class:"preset-row"},Jc=["disabled"],Xc={key:0,class:"notice"},Zc=["title"],Qc={class:"grid2"},eu=["value"],tu=["value"],nu=["value"],iu=["value"],su=["value"],ou=["value"],ru={class:"preset-row seed-row"},lu={class:"seed-label"},au=["value"],cu=["title"],uu={key:0,class:"hint"},du={key:1,class:"notice"},fu={key:0},pu=["title"],hu={class:"matrix-actions"},mu={class:"check"},gu=["title"],bu={class:"name"},vu={class:"val"},yu=["onUpdate:modelValue","min","max","step"],xu={class:"derived"},Su=["title"],wu={class:"name"},Cu={class:"val"},Pu=["onUpdate:modelValue","min","max","step"],Mu=["title"],ku={class:"name"},Ru={class:"val"},Tu=["onUpdate:modelValue","min","max","step"],Eu={class:"derived"},Au=["title"],Bu={class:"check"},Fu=["checked"],Ou={class:"name"},zu={class:"val"},Iu=["onUpdate:modelValue","min","max","step"],Du={class:"falloff"},Lu=["value"],_u={class:"derived"},Uu={class:"hint"},Nu=["title"],Vu={class:"check"},Gu=["checked"],Wu={class:"name"},$u={class:"val"},ju=["onUpdate:modelValue","min","max","step"],Hu={class:"derived"},Ku={class:"check",style:{"margin-top":"8px"}},qu=["title"],Yu={class:"check"},Ju=["checked"],Xu={class:"slider"},Zu={class:"val"},Qu={class:"slider"},ed={class:"val"},td={class:"slider"},nd={class:"val"},id={class:"slider"},sd={class:"val"},od={class:"check",style:{"margin-top":"10px"}},rd=["checked"],ld={class:"slider"},ad={class:"val"},cd={class:"slider"},ud={class:"val"},dd={class:"slider"},fd={class:"val"},pd=["title"],hd={class:"falloff"},md=["value"],gd={class:"hint"},bd={class:"falloff"},vd=["value"],yd={class:"hint"},xd={class:"slider"},Sd={class:"val"},wd={class:"slider"},Cd={class:"val"},Pd={class:"slider"},Md={class:"val"},kd={class:"check"},Rd={class:"falloff"},Td=["value"],Ed={class:"hint"},Ad={class:"falloff"},Bd=["value"],Fd={class:"falloff"},Od=["value"],zd={class:"hint"},Id={class:"slider"},Dd={class:"val"},Ld={class:"slider"},_d={class:"val"},Ud={class:"derived"},Nd={class:"slider"},Vd={class:"val"},Gd={key:1,class:"slider"},Wd={class:"val"},$d={class:"slider"},jd={class:"val"},Hd={class:"slider"},Kd={class:"val"},qd={class:"check",style:{"margin-top":"8px"}},Yd=["checked"],Jd={class:"slider"},Xd={class:"val"},Zd={class:"slider"},Qd={class:"val"},ef={class:"slider"},tf={class:"val"},nf={class:"slider"},sf={class:"val"},of={class:"check"},Qs="plb.uiScale",rf=.8,lf=1.8,eo="plb.theme",to="plb.locks",af={__name:"ControlPanel",props:{params:{type:Object,required:!0},startup:{type:Object,required:!0},matrix:{type:Object,default:null},philicity:{type:Object,default:null},coreSizes:{type:Object,default:null},speciesCount:{type:Number,required:!0},avgPerCell:{type:Number,default:0},notice:{type:String,default:""},paused:{type:Boolean,default:!1},appliedName:{type:String,default:""}},emits:["restart","toggle-pause","randomize-matrix","randomize-all","edit-matrix","clear-matrix","reroll-seed","reset-camera","show-about","show-config","apply-config","capture-config","hide"],setup(e,{emit:t}){const n=e,i=t,s=j=>ac.filter(c=>c[5]===j),o=pe(r(parseFloat(localStorage.getItem(Qs))||1));function r(j){return Math.min(lf,Math.max(rf,Math.round(j*10)/10))}function a(j){o.value=r(o.value+j),localStorage.setItem(Qs,String(o.value))}const u=pe(localStorage.getItem(eo)==="light"?"light":"dark");function h(){document.documentElement.dataset.theme=u.value}h();function f(){u.value=u.value==="light"?"dark":"light",localStorage.setItem(eo,u.value),h()}const g=pe(S());function S(){try{const j=JSON.parse(localStorage.getItem(to)||"{}"),c={};for(const[p]of Xs)c[p]=j[p]===!0;return c.seed=j.seed===!0,c}catch{const j={};for(const[c]of Xs)j[c]=!1;return j.seed=!1,j}}function y(j){g.value={...g.value,[j]:!g.value[j]},localStorage.setItem(to,JSON.stringify(g.value))}const T=Ke(()=>Object.values(g.value).filter(Boolean).length),x=pe(Zi()),K=Ke(()=>Object.keys(x.value).sort()),G=pe(""),F=pe(Zs(Object.keys(x.value))),E=pe("");function v(j){E.value=j,setTimeout(()=>{E.value===j&&(E.value="")},2600)}function R(){const j=G.value;j&&(F.value=j,i("apply-config",x.value[j]),v(`Applied "${j}".`))}function _(){const j=F.value.trim();if(!j)return;const c=j in x.value;i("capture-config",p=>{x.value=Ic(j,p),G.value=j,v(c?`Overwrote "${j}".`:`Saved "${j}".`)},j)}function N(){const j=G.value;j&&(x.value=Dc(j),G.value="",F.value=Zs(Object.keys(x.value)),v(`Deleted "${j}".`))}un(()=>n.appliedName,j=>{j&&j!==F.value&&(F.value=j)});const J=Ke(()=>Math.round(n.params.mixT*100)),ie=[2,4,6,8,10,12,14,16,18,24,32,40,60,80,120,160],he=Ke(()=>Math.round(n.avgPerCell*9)),Ie=Ke(()=>{const j=he.value;return j>2500?"heavy":j>900?"warn":"ok"}),Ct=Ke(()=>Math.max(1,Math.round(n.params.mediumCapacityMul*n.avgPerCell)));function $e(j,c){const p=c>=1?0:c>=.1?1:2;return j.toFixed(p)}return(j,c)=>(z(),D("aside",{class:"panel",style:pt({"--ui-scale":o.value})},[l("header",null,[c[69]||(c[69]=l("strong",null,"Particle Life + Boids",-1)),l("div",Lc,[l("button",{class:"icon",title:"Smaller panel and text",disabled:o.value<=.8,onClick:c[0]||(c[0]=p=>a(-.1))}," − ",8,_c),l("button",{class:"icon",title:"Larger panel and text",disabled:o.value>=1.8,onClick:c[1]||(c[1]=p=>a(.1))}," ＋ ",8,Uc),l("button",{class:"icon",title:u.value==="light"?"Switch to dark controls":"Switch to light controls",onClick:f},k(u.value==="light"?"☾":"☀"),9,Nc),l("button",{class:"icon",title:"About & credits",onClick:c[2]||(c[2]=p=>i("show-about"))}," ⓘ "),l("button",{class:"icon",title:"Hide panel (H)",onClick:c[3]||(c[3]=p=>i("hide"))},"✕")])]),l("div",Vc,[l("section",null,[l("div",Gc,[l("span",null,k(100-J.value)+"% Boids",1),l("span",null,k(J.value)+"% Particle Life",1)]),q(l("input",{"onUpdate:modelValue":c[4]||(c[4]=p=>e.params.mixT=p),type:"range",min:"0",max:"1",step:"0.05"},null,512),[[ae,e.params.mixT,void 0,{number:!0}]])]),l("section",Wc,[l("button",{class:"primary",onClick:c[5]||(c[5]=p=>i("toggle-pause"))},[l("span",$c,k(e.paused?"▶":"❙❙"),1),W(k(e.paused?"Resume":"Pause"),1)]),l("button",{title:"Start a fresh run (R)",onClick:c[6]||(c[6]=p=>i("restart",g.value))},[...c[70]||(c[70]=[l("span",{class:"ico"},"↻",-1),W("Restart ",-1)])]),l("button",{title:"Recentre the camera (C)",onClick:c[7]||(c[7]=p=>i("reset-camera"))},[...c[71]||(c[71]=[l("span",{class:"ico"},"⌖",-1),W("Reset Cam ",-1)])]),l("button",{title:T.value?`Randomise — ${T.value} section(s) locked`:"Randomise everything",onClick:c[8]||(c[8]=p=>i("randomize-all",g.value))},[c[72]||(c[72]=l("span",{class:"ico"},"⚄",-1)),W("Random"+k(T.value?` ${T.value}🔒`:""),1)],8,jc),l("button",{title:"View or paste the whole configuration",onClick:c[9]||(c[9]=p=>i("show-config",F.value))},[...c[73]||(c[73]=[l("span",{class:"ico"},"{ }",-1),W("JSON ",-1)])])]),l("section",null,[c[75]||(c[75]=l("h3",null,"Presets",-1)),l("div",Hc,[q(l("select",{"onUpdate:modelValue":c[10]||(c[10]=p=>G.value=p),onChange:R},[c[74]||(c[74]=l("option",{value:""},"— saved presets —",-1)),(z(!0),D(Z,null,ge(K.value,p=>(z(),D("option",{key:p,value:p},k(p),9,Kc))),128))],544),[[Le,G.value]]),l("button",{class:"icon-btn",title:"Delete the selected preset",disabled:!G.value,onClick:N}," ✕ ",8,qc)]),l("div",Yc,[q(l("input",{"onUpdate:modelValue":c[11]||(c[11]=p=>F.value=p),type:"text",spellcheck:"false",placeholder:"preset name",onKeyup:Ha(_,["enter"])},null,544),[[ae,F.value]]),l("button",{disabled:!F.value.trim(),onClick:_},k(K.value.includes(F.value.trim())?"Overwrite":"Save"),9,Jc)]),E.value?(z(),D("p",Xc,k(E.value),1)):Ce("",!0),c[76]||(c[76]=l("p",{class:"hint"}," Saved to this browser. Selecting one applies it immediately, including its interaction matrix. Choosing a preset puts its name in the box, so Save becomes Overwrite. ",-1))]),l("section",null,[l("h3",null,[c[77]||(c[77]=l("span",null,"Startup",-1)),l("button",{class:Me(["lock",{on:g.value.startup}]),title:g.value.startup?"Locked — Random leaves this alone":"Lock from Random",onClick:c[12]||(c[12]=p=>y("startup"))},k(g.value.startup?"🔒":"🔓"),11,Zc)]),l("div",Qc,[l("label",null,[c[78]||(c[78]=l("span",null,"Pattern",-1)),q(l("select",{"onUpdate:modelValue":c[13]||(c[13]=p=>e.startup.startingMethod=p)},[(z(!0),D(Z,null,ge(we(rc),(p,V)=>(z(),D("option",{key:V,value:V},k(p),9,eu))),128))],512),[[Le,e.startup.startingMethod,void 0,{number:!0}]])]),l("label",null,[c[79]||(c[79]=l("span",null,"Agents",-1)),q(l("select",{"onUpdate:modelValue":c[14]||(c[14]=p=>e.startup.agentCount=p)},[(z(!0),D(Z,null,ge(we(ic),p=>(z(),D("option",{key:p,value:p},k(p.toLocaleString()),9,tu))),128))],512),[[Le,e.startup.agentCount,void 0,{number:!0}]])]),l("label",null,[c[80]||(c[80]=l("span",null,"Species",-1)),q(l("select",{"onUpdate:modelValue":c[15]||(c[15]=p=>e.startup.speciesCount=p)},[(z(!0),D(Z,null,ge(we(sc),p=>(z(),D("option",{key:p,value:p},k(p),9,nu))),128))],512),[[Le,e.startup.speciesCount,void 0,{number:!0}]])]),l("label",null,[c[81]||(c[81]=l("span",null,"World Size",-1)),q(l("select",{"onUpdate:modelValue":c[16]||(c[16]=p=>e.startup.worldSizeMult=p)},[(z(!0),D(Z,null,ge(we(oc),p=>(z(),D("option",{key:p,value:p},k((p*800).toLocaleString()),9,iu))),128))],512),[[Le,e.startup.worldSizeMult,void 0,{number:!0}]])]),l("label",null,[c[83]||(c[83]=l("span",null,"Matrix Range",-1)),q(l("select",{"onUpdate:modelValue":c[17]||(c[17]=p=>e.startup.interactionRange=p)},[...c[82]||(c[82]=[l("option",{value:1},"1",-1),l("option",{value:2},"2",-1),l("option",{value:3},"3",-1)])],512),[[Le,e.startup.interactionRange,void 0,{number:!0}]])]),l("label",null,[c[84]||(c[84]=l("span",null,"Start Size",-1)),q(l("select",{"onUpdate:modelValue":c[18]||(c[18]=p=>e.startup.startRadiusMul=p)},[(z(),D(Z,null,ge(ie,p=>l("option",{key:p,value:p},k((p*800).toLocaleString())+k(p===e.startup.worldSizeMult?" (fills)":""),9,su)),64))],512),[[Le,e.startup.startRadiusMul,void 0,{number:!0}]])]),l("label",null,[c[85]||(c[85]=l("span",null,"Species Spread",-1)),q(l("select",{"onUpdate:modelValue":c[19]||(c[19]=p=>e.startup.speciesSpread=p)},[(z(!0),D(Z,null,ge(we(lc),p=>(z(),D("option",{key:p,value:p},k(p===0?"Discrete":`±${p}`),9,ou))),128))],512),[[Le,e.startup.speciesSpread,void 0,{number:!0}]])])]),l("div",ru,[l("label",lu,[c[86]||(c[86]=l("span",null,"Seed",-1)),l("input",{value:e.startup.seed,type:"number",min:"0",step:"1",onChange:c[20]||(c[20]=p=>e.startup.seed=Math.max(0,Math.floor(+p.target.value)||0))},null,40,au)]),l("button",{title:"New random seed",onClick:c[21]||(c[21]=p=>i("reroll-seed"))},"🎲"),l("button",{class:Me(["lock",{on:g.value.seed}]),title:g.value.seed?"Seed locked — Random and New Matrix reuse it":"Lock the seed",onClick:c[22]||(c[22]=p=>y("seed"))},k(g.value.seed?"🔒":"🔓"),11,cu)]),c[89]||(c[89]=l("p",{class:"hint"},[W(" Everything generated — layout, matrix, philicity, sizes, and Random's own choices — derives from the seed. Same seed and settings gives the same world back. "),l("em",null,"Lock"),W(" it and Random/New Matrix reuse it instead of rolling a fresh one, so results repeat exactly. ")],-1)),e.startup.speciesSpread?(z(),D("p",uu,[W(" Species is a continuous value, not an index. Agents are scattered up to ±"+k(e.startup.speciesSpread)+" around their basis species, so their colour, matrix row, philicity and size are all interpolated between neighbouring rows. The matrix below is the ",1),c[87]||(c[87]=l("em",null,"basis",-1)),c[88]||(c[88]=W("; agents live between its rows. ",-1))])):Ce("",!0),l("div",{class:Me(["density",Ie.value])},[l("span",null,"~"+k(he.value.toLocaleString())+" neighbours scanned per agent",1)],2),c[90]||(c[90]=l("p",{class:"hint"},[W(" Cost scales with "),l("em",null,"density"),W(", not agent count. Raise World Size to keep big counts fast. Startup changes apply on Restart. ")],-1)),e.notice?(z(),D("p",du,k(e.notice),1)):Ce("",!0)]),e.matrix?(z(),D("section",fu,[l("h3",null,[c[91]||(c[91]=l("span",null,"Interaction Matrix",-1)),l("button",{class:Me(["lock",{on:g.value.matrix}]),title:g.value.matrix?"Locked — Random leaves this alone":"Lock from Random",onClick:c[23]||(c[23]=p=>y("matrix"))},k(g.value.matrix?"🔒":"🔓"),11,pu)]),l("div",hu,[l("button",{title:"Generate a new interaction matrix",onClick:c[24]||(c[24]=p=>i("randomize-matrix",g.value))},[...c[92]||(c[92]=[l("span",{class:"ico"},"⚄",-1),W("New Matrix ",-1)])]),l("button",{title:"Set every interaction to zero",onClick:c[25]||(c[25]=p=>i("clear-matrix"))},[...c[93]||(c[93]=[l("span",{class:"ico"},"∅",-1),W("Clear ",-1)])]),l("label",mu,[q(l("input",{"onUpdate:modelValue":c[26]||(c[26]=p=>e.startup.lockMatrix=p),type:"checkbox"},null,512),[[sn,e.startup.lockMatrix]]),c[94]||(c[94]=l("span",null,"Keep through restart",-1))])]),We(Rc,{matrix:e.matrix,philicity:e.philicity,"core-sizes":e.params.coreEnabled?e.coreSizes:null,"species-count":e.speciesCount,editable:"",onEdit:c[27]||(c[27]=p=>i("edit-matrix",p))},null,8,["matrix","philicity","core-sizes","species-count"]),c[95]||(c[95]=l("p",{class:"hint"},[W(" Two different locks, easy to confuse. "),l("em",null,"Keep through restart"),W(" carries this matrix — including any edits — into the next Restart, which otherwise starts a fresh run with a new one. The "),l("strong",null,"🔒"),W(" on this heading stops "),l("em",null,"Random"),W(" rerolling it. Locking the "),l("em",null,"seed"),W(" outranks both: Restart then rebuilds the identical world, layout and all. ")],-1))])):Ce("",!0),l("section",null,[l("h3",null,[c[96]||(c[96]=l("span",null,"Simulation",-1)),l("button",{class:Me(["lock",{on:g.value.sim}]),title:g.value.sim?"Locked — Random leaves this alone":"Lock from Random",onClick:c[28]||(c[28]=p=>y("sim"))},k(g.value.sim?"🔒":"🔓"),11,gu)]),(z(!0),D(Z,null,ge(s("sim"),([p,V,ee,ye,ve])=>(z(),D("label",{key:p,class:"slider"},[l("span",bu,k(V),1),l("span",vu,k($e(e.params[p],ve)),1),q(l("input",{"onUpdate:modelValue":Pe=>e.params[p]=Pe,type:"range",min:ee,max:ye,step:ve},null,8,yu),[[ae,e.params[p],void 0,{number:!0}]])]))),128)),l("div",xu,[l("span",null,[c[97]||(c[97]=W("Collide radius ",-1)),l("b",null,k(we(gr)(e.params).toFixed(2)),1)])])]),l("section",null,[l("h3",null,[c[98]||(c[98]=l("span",null,"Boids",-1)),l("button",{class:Me(["lock",{on:g.value.boids}]),title:g.value.boids?"Locked — Random leaves this alone":"Lock from Random",onClick:c[29]||(c[29]=p=>y("boids"))},k(g.value.boids?"🔒":"🔓"),11,Su)]),(z(!0),D(Z,null,ge(s("boids"),([p,V,ee,ye,ve])=>(z(),D("label",{key:p,class:"slider"},[l("span",wu,k(V),1),l("span",Cu,k($e(e.params[p],ve)),1),q(l("input",{"onUpdate:modelValue":Pe=>e.params[p]=Pe,type:"range",min:ee,max:ye,step:ve},null,8,Pu),[[ae,e.params[p],void 0,{number:!0}]])]))),128))]),l("section",null,[l("h3",null,[c[99]||(c[99]=l("span",null,"Particle Life",-1)),l("button",{class:Me(["lock",{on:g.value.plife}]),title:g.value.plife?"Locked — Random leaves this alone":"Lock from Random",onClick:c[30]||(c[30]=p=>y("plife"))},k(g.value.plife?"🔒":"🔓"),11,Mu)]),(z(!0),D(Z,null,ge(s("plife"),([p,V,ee,ye,ve])=>(z(),D("label",{key:p,class:"slider"},[l("span",ku,k(V),1),l("span",Ru,k($e(e.params[p],ve)),1),q(l("input",{"onUpdate:modelValue":Pe=>e.params[p]=Pe,type:"range",min:ee,max:ye,step:ve},null,8,Tu),[[ae,e.params[p],void 0,{number:!0}]])]))),128)),l("div",Eu,[l("span",null,[c[100]||(c[100]=W("Force softening ",-1)),l("b",null,k(we(mr)(e.params).toFixed(0)),1)])])]),l("section",null,[l("h3",null,[c[101]||(c[101]=l("span",null,"Excluded Volume",-1)),l("button",{class:Me(["lock",{on:g.value.core}]),title:g.value.core?"Locked — Random leaves this alone":"Lock from Random",onClick:c[31]||(c[31]=p=>y("core"))},k(g.value.core?"🔒":"🔓"),11,Au)]),l("label",Bu,[l("input",{type:"checkbox",checked:e.params.coreEnabled,onChange:c[32]||(c[32]=p=>e.params.coreEnabled=p.target.checked)},null,40,Fu),c[102]||(c[102]=l("span",null,"Enable excluded volume",-1))]),e.params.coreEnabled?(z(),D(Z,{key:0},[(z(!0),D(Z,null,ge(s("core"),([p,V,ee,ye,ve])=>(z(),D("label",{key:p,class:"slider"},[l("span",Ou,k(V),1),l("span",zu,k($e(e.params[p],ve)),1),q(l("input",{"onUpdate:modelValue":Pe=>e.params[p]=Pe,type:"range",min:ee,max:ye,step:ve},null,8,Iu),[[ae,e.params[p],void 0,{number:!0}]])]))),128)),l("label",Du,[c[103]||(c[103]=l("span",null,"Falloff",-1)),q(l("select",{"onUpdate:modelValue":c[33]||(c[33]=p=>e.params.coreFalloff=p)},[(z(!0),D(Z,null,ge(we(_s),([p],V)=>(z(),D("option",{key:V,value:V},k(p),9,Lu))),128))],512),[[Le,e.params.coreFalloff,void 0,{number:!0}]])]),l("div",_u,[l("span",null,[c[104]||(c[104]=W("Widest pair radius ",-1)),l("b",null,k(we(br)(e.params).toFixed(0)),1)])]),l("p",Uu,k(we(_s)[e.params.coreFalloff][1]),1)],64)):Ce("",!0),c[105]||(c[105]=l("p",{class:"hint"},[W(" A short-range repulsion that ignores the interaction matrix, so mutually attracted species keep real spacing instead of collapsing to a point. Applies at every mix value. Raise "),l("em",null,"Size Spread"),W(" to give each species a different size — at 1 some end up with no excluded volume at all, and get shoved around by the ones that do (see the "),l("em",null,"Core size"),W(" strip under the matrix). A pair's exclusion distance is the sum of their two radii. ")],-1))]),l("section",null,[l("h3",null,[c[106]||(c[106]=l("span",null,"Medium",-1)),l("button",{class:Me(["lock",{on:g.value.medium}]),title:g.value.medium?"Locked — Random leaves this alone":"Lock from Random",onClick:c[34]||(c[34]=p=>y("medium"))},k(g.value.medium?"🔒":"🔓"),11,Nu)]),l("label",Vu,[l("input",{type:"checkbox",checked:e.params.mediumEnabled,onChange:c[35]||(c[35]=p=>e.params.mediumEnabled=p.target.checked)},null,40,Gu),c[107]||(c[107]=l("span",null,"Enable medium",-1))]),e.params.mediumEnabled?(z(),D(Z,{key:0},[(z(!0),D(Z,null,ge(s("medium"),([p,V,ee,ye,ve])=>(z(),D("label",{key:p,class:"slider"},[l("span",Wu,k(V),1),l("span",$u,k($e(e.params[p],ve)),1),q(l("input",{"onUpdate:modelValue":Pe=>e.params[p]=Pe,type:"range",min:ee,max:ye,step:ve},null,8,ju),[[ae,e.params[p],void 0,{number:!0}]])]))),128)),l("div",Hu,[l("span",null,[c[108]||(c[108]=W("Cell cleared at ",-1)),l("b",null,k(Ct.value.toLocaleString()),1),c[109]||(c[109]=W(" agents",-1))])]),l("label",Ku,[q(l("input",{"onUpdate:modelValue":c[36]||(c[36]=p=>e.params.showMedium=p),type:"checkbox"},null,512),[[sn,e.params.showMedium]]),c[110]||(c[110]=l("span",null,"Show medium",-1))])],64)):Ce("",!0),c[111]||(c[111]=l("p",{class:"hint"},[W(" A diffusing scalar field that agents displace. Each species has a "),l("em",null,"philicity"),W(" in [-1, +1] (shown under the matrix): philic species climb the gradient, phobic ones flee it and coalesce into droplets. A philic species that is "),l("em",null,"also"),W(" attracted to a phobic one parks at the interface — that is a surfactant. ")],-1))]),l("section",null,[l("h3",null,[c[112]||(c[112]=l("span",null,"Blobs",-1)),l("button",{class:Me(["lock",{on:g.value.blobs}]),title:g.value.blobs?"Locked — Random leaves this alone":"Lock from Random",onClick:c[37]||(c[37]=p=>y("blobs"))},k(g.value.blobs?"🔒":"🔓"),11,qu)]),l("label",Yu,[l("input",{type:"checkbox",checked:e.params.blobsEnabled,onChange:c[38]||(c[38]=p=>e.params.blobsEnabled=p.target.checked)},null,40,Ju),c[113]||(c[113]=l("span",null,"Detect blobs",-1))]),e.params.blobsEnabled?(z(),D(Z,{key:0},[l("label",Xu,[c[114]||(c[114]=l("span",{class:"name"},"Min Density",-1)),l("span",Zu,k(e.params.blobMinDensity.toFixed(1))+"×",1),q(l("input",{"onUpdate:modelValue":c[39]||(c[39]=p=>e.params.blobMinDensity=p),type:"range",min:"0.5",max:"8",step:"0.1"},null,512),[[ae,e.params.blobMinDensity,void 0,{number:!0}]])]),l("label",Qu,[c[115]||(c[115]=l("span",{class:"name"},"Smoothing",-1)),l("span",ed,k(e.params.blobSmoothing),1),q(l("input",{"onUpdate:modelValue":c[40]||(c[40]=p=>e.params.blobSmoothing=p),type:"range",min:"0",max:"8",step:"1"},null,512),[[ae,e.params.blobSmoothing,void 0,{number:!0}]])]),l("label",td,[c[116]||(c[116]=l("span",{class:"name"},"Reflood Every",-1)),l("span",nd,k(e.params.blobInterval)+"f",1),q(l("input",{"onUpdate:modelValue":c[41]||(c[41]=p=>e.params.blobInterval=p),type:"range",min:"1",max:"60",step:"1"},null,512),[[ae,e.params.blobInterval,void 0,{number:!0}]])]),l("label",id,[c[117]||(c[117]=l("span",{class:"name"},"Flood Rounds",-1)),l("span",sd,k(e.params.blobRounds),1),q(l("input",{"onUpdate:modelValue":c[42]||(c[42]=p=>e.params.blobRounds=p),type:"range",min:"1",max:"64",step:"1"},null,512),[[ae,e.params.blobRounds,void 0,{number:!0}]])])],64)):Ce("",!0),c[123]||(c[123]=l("p",{class:"hint"},[W(" Connected-component labelling over grid cells — cheap, but cell-resolution, so two blobs sharing a cell merge. "),l("em",null,"Min Density"),W(" is what separates blob from background: below it, the thin gas between droplets bridges them and the whole world becomes one blob. "),l("em",null,"Smoothing"),W(" blurs the density field before thresholding it — without it blobs come out the shape of the cell grid, blocky and full of pinholes. A label travels one cell per round, so "),l("em",null,"Flood Rounds"),W(" caps how wide a blob can be and still come out as one piece. Switch "),l("em",null,"Colour By"),W(" to "),l("em",null,"Blob"),W(" to see them; grey means unlabelled background. ")],-1)),e.params.blobsEnabled?(z(),D(Z,{key:1},[l("label",od,[l("input",{type:"checkbox",checked:e.params.mutateEnabled,onChange:c[43]||(c[43]=p=>e.params.mutateEnabled=p.target.checked)},null,40,rd),c[118]||(c[118]=l("span",null,"Mutate species per blob",-1))]),e.params.mutateEnabled?(z(),D(Z,{key:0},[l("label",ld,[c[119]||(c[119]=l("span",{class:"name"},"Mutation Rate",-1)),l("span",ad,k(e.params.mutateRate.toFixed(2)),1),q(l("input",{"onUpdate:modelValue":c[44]||(c[44]=p=>e.params.mutateRate=p),type:"range",min:"0",max:"0.5",step:"0.01"},null,512),[[ae,e.params.mutateRate,void 0,{number:!0}]])]),l("label",cd,[c[120]||(c[120]=l("span",{class:"name"},"Outward Bias",-1)),l("span",ud,k(e.params.mutateBias.toFixed(2)),1),q(l("input",{"onUpdate:modelValue":c[45]||(c[45]=p=>e.params.mutateBias=p),type:"range",min:"0",max:"1",step:"0.05"},null,512),[[ae,e.params.mutateBias,void 0,{number:!0}]])]),l("label",dd,[c[121]||(c[121]=l("span",{class:"name"},"Mutate Every",-1)),l("span",fd,k(e.params.mutateInterval)+"f",1),q(l("input",{"onUpdate:modelValue":c[46]||(c[46]=p=>e.params.mutateInterval=p),type:"range",min:"5",max:"120",step:"5"},null,512),[[ae,e.params.mutateInterval,void 0,{number:!0}]])])],64)):Ce("",!0),c[122]||(c[122]=l("p",{class:"hint"},[W(" Every agent in a blob gets the "),l("em",null,"same"),W(" nudge, so a droplet's whole lineage drifts together instead of dissolving into noise. Watch it in "),l("em",null,"Species"),W(" colour: droplets slowly change hue and diverge from each other. Species 0 and N−1 "),l("em",null,"reflect"),W(" rather than clamp, so the walk stays spread out instead of piling up against the ends. "),l("em",null,"Outward Bias"),W(" additionally drives species apart, if you want them to separate faster. ")],-1))],64)):Ce("",!0)]),l("section",null,[l("h3",null,[c[124]||(c[124]=l("span",null,"View",-1)),l("button",{class:Me(["lock",{on:g.value.view}]),title:g.value.view?"Locked — Random leaves this alone":"Lock from Random",onClick:c[47]||(c[47]=p=>y("view"))},k(g.value.view?"🔒":"🔓"),11,pd)]),l("label",hd,[c[125]||(c[125]=l("span",null,"Colour By",-1)),q(l("select",{"onUpdate:modelValue":c[48]||(c[48]=p=>e.params.renderMode=p)},[(z(!0),D(Z,null,ge(we(Gs),([p],V)=>(z(),D("option",{key:V,value:V},k(p),9,md))),128))],512),[[Le,e.params.renderMode,void 0,{number:!0}]])]),l("p",gd,k(we(Gs)[e.params.renderMode][1]),1),l("label",bd,[c[126]||(c[126]=l("span",null,"Field",-1)),q(l("select",{"onUpdate:modelValue":c[49]||(c[49]=p=>e.params.fieldMode=p)},[(z(!0),D(Z,null,ge(we(Vs),([p],V)=>(z(),D("option",{key:V,value:V},k(p),9,vd))),128))],512),[[Le,e.params.fieldMode,void 0,{number:!0}]])]),l("p",yd,k(we(Vs)[e.params.fieldMode][1]),1),e.params.fieldMode>0?(z(),D(Z,{key:0},[l("label",xd,[c[127]||(c[127]=l("span",{class:"name"},"Field Smoothing",-1)),l("span",Sd,k(e.params.fieldSmoothing),1),q(l("input",{"onUpdate:modelValue":c[50]||(c[50]=p=>e.params.fieldSmoothing=p),type:"range",min:"0",max:"10",step:"1"},null,512),[[ae,e.params.fieldSmoothing,void 0,{number:!0}]])]),l("label",wd,[c[128]||(c[128]=l("span",{class:"name"},"Surface At",-1)),l("span",Cd,k(e.params.fieldThresholdMul.toFixed(1))+"×",1),q(l("input",{"onUpdate:modelValue":c[51]||(c[51]=p=>e.params.fieldThresholdMul=p),type:"range",min:"0.2",max:"10",step:"0.1"},null,512),[[ae,e.params.fieldThresholdMul,void 0,{number:!0}]])]),l("label",Pd,[c[129]||(c[129]=l("span",{class:"name"},"Field Opacity",-1)),l("span",Md,k(e.params.fieldStrength.toFixed(2)),1),q(l("input",{"onUpdate:modelValue":c[52]||(c[52]=p=>e.params.fieldStrength=p),type:"range",min:"0",max:"1",step:"0.02"},null,512),[[ae,e.params.fieldStrength,void 0,{number:!0}]])]),l("label",kd,[q(l("input",{"onUpdate:modelValue":c[53]||(c[53]=p=>e.params.showAgents=p),type:"checkbox"},null,512),[[sn,e.params.showAgents]]),c[130]||(c[130]=l("span",null,"Draw agents on top",-1))]),c[131]||(c[131]=l("p",{class:"hint"},[W(" Built from the per-cell counts the spatial hash already produces, so it costs one blur plus one fullscreen pass. "),l("em",null,"Surface At"),W(" is a multiple of average occupancy — lower it to make the fluid engulf more, raise it to leave only the dense cores. Turn agents off to see the surface on its own. ")],-1))],64)):Ce("",!0),l("label",Rd,[c[132]||(c[132]=l("span",null,"Palette",-1)),q(l("select",{"onUpdate:modelValue":c[54]||(c[54]=p=>e.params.speciesPalette=p)},[(z(!0),D(Z,null,ge(we(Ns),([p],V)=>(z(),D("option",{key:V,value:V},k(p),9,Td))),128))],512),[[Le,e.params.speciesPalette,void 0,{number:!0}]])]),l("p",Ed,k(we(Ns)[e.params.speciesPalette][1]),1),l("label",Ad,[c[133]||(c[133]=l("span",null,"Background",-1)),q(l("select",{"onUpdate:modelValue":c[55]||(c[55]=p=>e.params.background=p)},[(z(!0),D(Z,null,ge(we(on),(p,V)=>(z(),D("option",{key:V,value:V},k(p.name),9,Bd))),128))],512),[[Le,e.params.background,void 0,{number:!0}]])]),l("label",Fd,[c[134]||(c[134]=l("span",null,"Shape",-1)),q(l("select",{"onUpdate:modelValue":c[56]||(c[56]=p=>e.params.particleShape=p)},[(z(!0),D(Z,null,ge(we(Us),([p],V)=>(z(),D("option",{key:V,value:V},k(p),9,Od))),128))],512),[[Le,e.params.particleShape,void 0,{number:!0}]])]),l("p",zd,k(we(Us)[e.params.particleShape][1]),1),l("label",Id,[c[135]||(c[135]=l("span",{class:"name"},"Size",-1)),l("span",Dd,k(e.params.drawScale.toFixed(2))+"×",1),q(l("input",{"onUpdate:modelValue":c[57]||(c[57]=p=>e.params.drawScale=p),type:"range",min:"0.1",max:"12",step:"0.1"},null,512),[[ae,e.params.drawScale,void 0,{number:!0}]])]),l("label",Ld,[c[136]||(c[136]=l("span",{class:"name"},"Size Jitter",-1)),l("span",_d,k(e.params.drawJitter.toFixed(2)),1),q(l("input",{"onUpdate:modelValue":c[58]||(c[58]=p=>e.params.drawJitter=p),type:"range",min:"0",max:"1",step:"0.05"},null,512),[[ae,e.params.drawJitter,void 0,{number:!0}]])]),l("div",Ud,[l("span",null,[c[137]||(c[137]=W("Drawn radius ",-1)),l("b",null,k((e.params.drawRadius*e.params.drawScale).toFixed(1)),1)])]),c[149]||(c[149]=l("p",{class:"hint"},[W(" Visual only — multiplies "),l("em",null,"Draw Size"),W(" for rendering. Draw Size itself is under "),l("em",null,"Simulation"),W(" and also sets the collision radius, so scaling it there changes the physics; this does not. "),l("em",null,"Size Jitter"),W(" varies each agent's size by up to ±100%, keyed to its index so it stays put rather than flickering. ")],-1)),l("label",Nd,[c[138]||(c[138]=l("span",{class:"name"},"Glow",-1)),l("span",Vd,k(e.params.glowStrength.toFixed(2)),1),q(l("input",{"onUpdate:modelValue":c[59]||(c[59]=p=>e.params.glowStrength=p),type:"range",min:"0",max:"1",step:"0.02"},null,512),[[ae,e.params.glowStrength,void 0,{number:!0}]])]),e.params.glowStrength>0?(z(),D("label",Gd,[c[139]||(c[139]=l("span",{class:"name"},"Glow Size",-1)),l("span",Wd,k(e.params.glowSize.toFixed(1))+"×",1),q(l("input",{"onUpdate:modelValue":c[60]||(c[60]=p=>e.params.glowSize=p),type:"range",min:"1.5",max:"12",step:"0.5"},null,512),[[ae,e.params.glowSize,void 0,{number:!0}]])])):Ce("",!0),l("label",$d,[c[140]||(c[140]=l("span",{class:"name"},"Trails",-1)),l("span",jd,k(e.params.trailStrength.toFixed(2)),1),q(l("input",{"onUpdate:modelValue":c[61]||(c[61]=p=>e.params.trailStrength=p),type:"range",min:"0",max:"0.99",step:"0.01"},null,512),[[ae,e.params.trailStrength,void 0,{number:!0}]])]),l("label",Hd,[c[141]||(c[141]=l("span",{class:"name"},"Motion Stretch",-1)),l("span",Kd,k(e.params.velocityStretch.toFixed(1)),1),q(l("input",{"onUpdate:modelValue":c[62]||(c[62]=p=>e.params.velocityStretch=p),type:"range",min:"0",max:"50",step:"0.25"},null,512),[[ae,e.params.velocityStretch,void 0,{number:!0}]])]),c[150]||(c[150]=l("p",{class:"hint"},[W(" Glow is a second additive pass — halos sum where they overlap, so dense regions bloom. "),l("em",null,"Motion Stretch"),W(" scales each agent along its velocity, turning fast ones into streaks. "),l("em",null,"Trails"),W(" keeps part of the previous frame instead of clearing, so agents smear a decaying path behind them — at 0.99 a trail lasts around a hundred frames. It is screen-space, so panning smears too. ")],-1)),l("label",qd,[l("input",{type:"checkbox",checked:e.params.driftEnabled,onChange:c[63]||(c[63]=p=>e.params.driftEnabled=p.target.checked)},null,40,Yd),c[142]||(c[142]=l("span",null,"Drifting motes",-1))]),e.params.driftEnabled?(z(),D(Z,{key:2},[l("label",Jd,[c[143]||(c[143]=l("span",{class:"name"},"Density",-1)),l("span",Xd,k((e.params.driftCols**2).toLocaleString()),1),q(l("input",{"onUpdate:modelValue":c[64]||(c[64]=p=>e.params.driftCols=p),type:"range",min:"8",max:"90",step:"1"},null,512),[[ae,e.params.driftCols,void 0,{number:!0}]])]),l("label",Zd,[c[144]||(c[144]=l("span",{class:"name"},"Mote Size",-1)),l("span",Qd,k(e.params.driftSize),1),q(l("input",{"onUpdate:modelValue":c[65]||(c[65]=p=>e.params.driftSize=p),type:"range",min:"4",max:"80",step:"1"},null,512),[[ae,e.params.driftSize,void 0,{number:!0}]])]),l("label",ef,[c[145]||(c[145]=l("span",{class:"name"},"Drift Speed",-1)),l("span",tf,k(e.params.driftSpeed.toFixed(3)),1),q(l("input",{"onUpdate:modelValue":c[66]||(c[66]=p=>e.params.driftSpeed=p),type:"range",min:"0",max:"0.03",step:"0.001"},null,512),[[ae,e.params.driftSpeed,void 0,{number:!0}]])]),l("label",nf,[c[146]||(c[146]=l("span",{class:"name"},"Brightness",-1)),l("span",sf,k(e.params.driftBrightness.toFixed(2)),1),q(l("input",{"onUpdate:modelValue":c[67]||(c[67]=p=>e.params.driftBrightness=p),type:"range",min:"0",max:"1",step:"0.05"},null,512),[[ae,e.params.driftBrightness,void 0,{number:!0}]])]),c[147]||(c[147]=l("p",{class:"hint"}," Decorative background haze — no effect on the simulation. Motes sit one per cell of a jittered grid rather than at random positions: random clumps, and clumped motes merge into blotches. The jitter is bounded to the middle 60% of a cell, so two motes can never come closer than 40% of the spacing. ",-1))],64)):Ce("",!0),l("label",of,[q(l("input",{type:"checkbox","onUpdate:modelValue":c[68]||(c[68]=p=>e.params.showGrid=p)},null,512),[[sn,e.params.showGrid]]),c[148]||(c[148]=l("span",null,"Show spatial grid",-1))]),c[151]||(c[151]=lr('<p class="hint" data-v-39f3c2d2> Drag to pan · scroll to zoom at cursor · <kbd data-v-39f3c2d2>Space</kbd> pause · <kbd data-v-39f3c2d2>R</kbd> restart · <kbd data-v-39f3c2d2>G</kbd> grid · <kbd data-v-39f3c2d2>M</kbd> medium · <kbd data-v-39f3c2d2>V</kbd> excluded volume · <kbd data-v-39f3c2d2>C</kbd> reset cam · <kbd data-v-39f3c2d2>H</kbd> hide panel </p>',1))])])],4))}},cf=qt(af,[["__scopeId","data-v-39f3c2d2"]]),uf={class:"dialog",role:"dialog","aria-modal":"true","aria-label":"About"},df={class:"check"},ff={__name:"AboutDialog",props:{dontShowAgain:{type:Boolean,default:!1}},emits:["close","update:dontShowAgain"],setup(e,{emit:t}){const n=t,i=pe(!1);function s(){n("update:dontShowAgain",i.value),n("close")}return(o,r)=>(z(),D("div",{class:"backdrop",onClick:Ji(s,["self"])},[l("div",uf,[r[2]||(r[2]=lr('<h1 data-v-6f53331b>Particle Life <span class="plus" data-v-6f53331b>+</span> Boids</h1><p class="sub" data-v-6f53331b> Tens of thousands of agents on the GPU, blending boids flocking with particle-life species forces on a wrapping world. Runs entirely in WebGPU. </p><section data-v-6f53331b><h2 data-v-6f53331b>Original project</h2><p data-v-6f53331b> This is a browser port of <strong data-v-6f53331b>Godot-Particle-Life-Boids-Combined-Compute-Shader</strong> by <strong data-v-6f53331b>Tokoyuma</strong> (ThePathfindersCodex). The simulation — the forces, the spatial hashing, the collision pass, the tuned constants — is theirs; this port re-expresses it in WGSL. </p><p class="links" data-v-6f53331b><a href="https://github.com/ThePathfindersCodex/Godot-Particle-Life-Boids-Combined-Compute-Shader" target="_blank" rel="noopener noreferrer" data-v-6f53331b>Source on GitHub ↗</a><a href="https://www.youtube.com/@ThePathfindersCodex" target="_blank" rel="noopener noreferrer" data-v-6f53331b>ThePathfindersCodex on YouTube ↗</a></p><p class="fine" data-v-6f53331b>MIT License · Copyright © 2025 Tokoyuma</p></section><section data-v-6f53331b><h2 data-v-6f53331b>About this port</h2><p data-v-6f53331b> Every line of this WebGPU + Vue version was written by <strong data-v-6f53331b>Claude Opus</strong> (Anthropic), working through Claude Code. No human wrote the WGSL, the engine, or this dialog. Treat it accordingly — read the code before trusting it. </p><p class="fine" data-v-6f53331b> The port swaps Godot&#39;s per-frame CPU readback for a GPU prefix sum, and its <code data-v-6f53331b>imageStore</code> circle rasteriser for an instanced render pipeline. See the README for the full list of differences. </p></section>',4)),l("footer",null,[l("label",df,[q(l("input",{"onUpdate:modelValue":r[0]||(r[0]=a=>i.value=a),type:"checkbox"},null,512),[[sn,i.value]]),r[1]||(r[1]=l("span",null,"Don't show this again",-1))]),l("button",{class:"primary",onClick:s},"Start")])])]))}},pf=qt(ff,[["__scopeId","data-v-6f53331b"]]),hf={class:"dialog"},mf={key:0,class:"error"},gf={class:"buttons"},bf={__name:"ConfigDialog",props:{config:{type:Object,required:!0}},emits:["close","apply"],setup(e,{emit:t}){const n=e,i=t,s=pe(""),o=pe(""),r=pe(!1);un(()=>n.config,h=>{s.value=JSON.stringify(h,null,2),o.value="",r.value=!1},{immediate:!0});async function a(){try{await navigator.clipboard.writeText(s.value),r.value=!0,setTimeout(()=>r.value=!1,1500)}catch{o.value="Clipboard blocked by the browser — select the text and copy manually."}}function u(){let h;try{h=JSON.parse(s.value)}catch(f){o.value=`Not valid JSON: ${f.message}`;return}try{i("apply",h),i("close")}catch(f){o.value=f.message}}return(h,f)=>(z(),D("div",{class:"backdrop",onClick:f[3]||(f[3]=Ji(g=>i("close"),["self"]))},[l("div",hf,[l("header",null,[f[4]||(f[4]=l("h1",null,"Configuration",-1)),l("button",{class:"icon",title:"Close",onClick:f[0]||(f[0]=g=>i("close"))},"✕")]),f[6]||(f[6]=l("p",{class:"sub"}," Everything needed to reproduce this state: the live parameters, the startup config, and the per-species matrix, philicity and core sizes. Edit it, or paste one in and apply. ",-1)),q(l("textarea",{"onUpdate:modelValue":f[1]||(f[1]=g=>s.value=g),spellcheck:"false",onInput:f[2]||(f[2]=g=>o.value="")},null,544),[[ae,s.value]]),o.value?(z(),D("p",mf,k(o.value),1)):Ce("",!0),l("footer",null,[f[5]||(f[5]=l("span",{class:"hint"}," Unknown keys are ignored; anything missing keeps its current value. ",-1)),l("div",gf,[l("button",{onClick:a},k(r.value?"Copied":"Copy"),1),l("button",{class:"primary",onClick:u},"Apply")])])])]))}},vf=qt(bf,[["__scopeId","data-v-805b5e6c"]]),yf={class:"app"},xf={class:"fps"},Sf={class:"dim"},wf={class:"dim"},Cf={class:"dim"},Pf={class:"dim"},Mf=["title"],kf={key:5,class:"error"},gi="plb.hideAbout",no="plb.hudOpen",Rf={__name:"App",setup(e){const t=gn(pr()),n=gn(hr()),i=Xt(null),s=pe(""),o=pe(""),r=pe(0),a=pe(!1),u=pe(!0),h=Xt(null),f=Xt(null),g=Xt(null),S=Ke(()=>g.value?Array.from(g.value,I=>vr(I,t.coreSizeSpread)):null),y=pe(n.speciesCount),T=pe(0),x=pe(0),K=pe(localStorage.getItem(gi)!=="1"),G=pe(localStorage.getItem(no)!=="0");function F(){G.value=!G.value,localStorage.setItem(no,G.value?"1":"0")}function E(I){I?localStorage.setItem(gi,"1"):localStorage.removeItem(gi)}let v=t.dt,R=0;async function _(I){i.value=I,await Wi(),N()}function N(){const I=i.value;if(I){try{I.restart({...n})}catch(U){o.value=U.message;return}o.value=I.maxCollisions<64?`Collision partners per agent reduced to ${I.maxCollisions} to fit GPU memory.`:"",h.value=I.matrix,f.value=I.philicity,g.value=I.sizeSeeds,y.value=n.speciesCount,T.value=I.agentCount,x.value=I.avgPerCell,R!==n.worldSizeMult&&(R=n.worldSizeMult,at())}}const J=pe(!1),ie=Xt({}),he=pe("");function Ie(I=he.value){return Ec({params:t,startup:n,matrix:h.value,philicity:f.value,sizeSeeds:g.value,name:I})}function Ct(I=""){he.value=I,ie.value=Ie(I),J.value=!0}function $e(I,U=""){he.value=U||he.value,I(Ie(U))}function j(I){const U=i.value;if(!U)return;let te;try{te=Ac(I,{params:t,startup:n})}catch(Ne){o.value=Ne.message;return}typeof I.name=="string"&&I.name.trim()&&(he.value=I.name.trim()),te.needsRestart&&N(),te.matrix&&(U.uploadMatrix(te.matrix,te.philicity??U.philicity,te.sizeSeeds??U.sizeSeeds),h.value=U.matrix,f.value=U.philicity,g.value=U.sizeSeeds)}function c(I={}){var C;const U=i.value;if(!U)return;const te=ee(I),{params:Ne,startup:d,needsRestart:m,rerollMatrix:b}=Fc(I,bt(te,gt.randomConfig));Object.assign(t,Ne),Object.assign(n,d);const w=!b&&m?{matrix:h.value,philicity:f.value,sizeSeeds:g.value}:null;m&&N(),b?ye({seed:!0}):w&&((C=w.matrix)==null?void 0:C.length)===U.speciesCount*U.speciesCount&&(U.uploadMatrix(w.matrix,w.philicity,w.sizeSeeds),h.value=U.matrix,f.value=U.philicity,g.value=U.sizeSeeds)}function p(){const I=i.value;if(!I)return;const U=new Float32Array(I.speciesCount*I.speciesCount);I.uploadMatrix(U,f.value),h.value=U}function V({kind:I,i:U,j:te,value:Ne}){const d=i.value;if(d)if(I==="philicity"){const m=Float32Array.from(f.value);m[U]=Ne,d.uploadMatrix(h.value,m),f.value=m}else{const m=Float32Array.from(h.value);m[U*d.speciesCount+te]=Ne,d.uploadMatrix(m,f.value),h.value=m}}function ee(I={}){return I.seed||(n.seed=pi()),n.seed}function ye(I={}){const U=i.value;if(!U)return;const te=ee(I),Ne=n.startingMethod%2===1,d=U.speciesCount,m=Ne?xr(d,n.interactionRange,bt(te,gt.matrix)):yr(d,n.interactionRange,bt(te,gt.matrix)),b=Sr(d,bt(te,gt.philicity)),w=wr(d,bt(te,gt.sizeSeeds));U.uploadMatrix(m,b,w),h.value=m,f.value=b,g.value=w}function ve(){n.seed=pi(),N()}function Pe(I={}){I.seed||(n.seed=pi()),N()}function Ue(){a.value?(t.dt=v||.25,a.value=!1):(v=t.dt,t.dt=0,a.value=!0)}function Pn(I,U=0,te=0){const Ne=t.zoom,d=Math.min(nc,Math.max(tc,Ne*I));if(d===Ne)return;const m=1/Ne-1/d;t.zoom=d,t.cameraX+=U*m,t.cameraY+=te*m}function ti(I,U){t.cameraX-=I/t.zoom,t.cameraY-=U/t.zoom}function ni(){const I=document.querySelector(".panel");if(!I)return 0;const U=Math.min(window.devicePixelRatio||1,2);return I.getBoundingClientRect().width*U}function at(){const I=i.value;if(!I){t.cameraX=0,t.cameraY=0,t.zoom=.1;return}const U=ni(),te=I.fitZoom(U);t.zoom=te,t.cameraX=U/(2*te),t.cameraY=0}function Tt(I){K.value||J.value||I.target.tagName==="INPUT"||I.target.tagName==="SELECT"||(I.code==="Space"?(I.preventDefault(),Ue()):I.code==="KeyR"?N():I.code==="KeyG"?t.showGrid=!t.showGrid:I.code==="KeyM"?t.mediumEnabled=!t.mediumEnabled:I.code==="KeyV"?t.coreEnabled=!t.coreEnabled:I.code==="KeyB"?(t.blobsEnabled=!t.blobsEnabled,t.blobsEnabled&&(t.renderMode=1)):I.code==="KeyX"?t.renderMode=(t.renderMode+1)%3:I.code==="KeyH"?u.value=!u.value:I.code==="KeyC"&&at())}return Hi(()=>window.addEventListener("keydown",Tt)),Ki(()=>window.removeEventListener("keydown",Tt)),(I,U)=>(z(),D("div",yf,[We(bc,{params:t,onReady:_,onError:U[0]||(U[0]=te=>s.value=te),onFps:U[1]||(U[1]=te=>r.value=te),onZoom:Pn,onPan:ti},null,8,["params"]),G.value?(z(),D("button",{key:0,class:"hud",title:"Hide stats",onClick:F},[l("span",xf,k(r.value)+" fps",1),l("span",Sf,k(T.value.toLocaleString())+" agents",1),l("span",wf,k(y.value)+" species",1),l("span",Cf,"zoom "+k(t.zoom.toFixed(3)),1),l("span",Pf," cam ("+k(t.cameraX.toFixed(0))+", "+k(t.cameraY.toFixed(0))+") ",1)])):(z(),D("button",{key:1,class:"hud collapsed",title:`Show stats — ${r.value} fps, ${T.value.toLocaleString()} agents`,onClick:F}," ▸ ",8,Mf)),u.value?Ce("",!0):(z(),D("button",{key:2,class:"reveal",onClick:U[2]||(U[2]=te=>u.value=!0)},"Controls")),q(We(cf,{params:t,startup:n,matrix:h.value,philicity:f.value,"core-sizes":S.value,"species-count":y.value,"avg-per-cell":x.value,notice:o.value,paused:a.value,onRestart:Pe,onTogglePause:Ue,onRandomizeMatrix:ye,onRerollSeed:ve,onRandomizeAll:c,onEditMatrix:V,onClearMatrix:p,onResetCamera:at,onShowAbout:U[3]||(U[3]=te=>K.value=!0),"applied-name":he.value,onShowConfig:Ct,onApplyConfig:j,onCaptureConfig:$e,onHide:U[4]||(U[4]=te=>u.value=!1)},null,8,["params","startup","matrix","philicity","core-sizes","species-count","avg-per-cell","notice","paused","applied-name"]),[[Ma,u.value]]),J.value?(z(),ki(vf,{key:3,config:ie.value,onClose:U[5]||(U[5]=te=>J.value=!1),onApply:j},null,8,["config"])):Ce("",!0),K.value?(z(),ki(pf,{key:4,onClose:U[6]||(U[6]=te=>K.value=!1),"onUpdate:dontShowAgain":E})):Ce("",!0),s.value?(z(),D("div",kf,[U[7]||(U[7]=l("h2",null,"WebGPU unavailable",-1)),l("p",null,k(s.value),1)])):Ce("",!0)]))}},Tf=qt(Rf,[["__scopeId","data-v-032b40b8"]]);Ya(Tf).mount("#app");
