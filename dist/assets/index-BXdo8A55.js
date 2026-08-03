var us=e=>{throw TypeError(e)};var Dr=(e,t,n)=>t.has(e)||us("Cannot "+n);var cs=(e,t,n)=>t.has(e)?us("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n);var be=(e,t,n)=>(Dr(e,t,"access private method"),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();/**
* @vue/shared v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function _i(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const pe={},$t=[],lt=()=>{},uo=()=>!1,jn=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),Kn=e=>e.startsWith("onUpdate:"),Fe=Object.assign,Vi=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Lr=Object.prototype.hasOwnProperty,le=(e,t)=>Lr.call(e,t),q=Array.isArray,Ht=e=>kn(e)==="[object Map]",Xt=e=>kn(e)==="[object Set]",ds=e=>kn(e)==="[object Date]",Q=e=>typeof e=="function",xe=e=>typeof e=="string",at=e=>typeof e=="symbol",ce=e=>e!==null&&typeof e=="object",co=e=>(ce(e)||Q(e))&&Q(e.then)&&Q(e.catch),fo=Object.prototype.toString,kn=e=>fo.call(e),Ur=e=>kn(e).slice(8,-1),po=e=>kn(e)==="[object Object]",Wi=e=>xe(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,fn=_i(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),qn=e=>{const t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},Nr=/-\w/g,Ye=qn(e=>e.replace(Nr,t=>t.slice(1).toUpperCase())),_r=/\B([A-Z])/g,Et=qn(e=>e.replace(_r,"-$1").toLowerCase()),ho=qn(e=>e.charAt(0).toUpperCase()+e.slice(1)),ri=qn(e=>e?`on${ho(e)}`:""),rt=(e,t)=>!Object.is(e,t),Fn=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},mo=(e,t,n,i=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:i,value:n})},Yn=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let fs;const Jn=()=>fs||(fs=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function ht(e){if(q(e)){const t={};for(let n=0;n<e.length;n++){const i=e[n],s=xe(i)?$r(i):ht(i);if(s)for(const o in s)t[o]=s[o]}return t}else if(xe(e)||ce(e))return e}const Vr=/;(?![^(]*\))/g,Wr=/:([^]+)/,Gr=/\/\*[^]*?\*\//g;function $r(e){const t={};return e.replace(Gr,"").split(Vr).forEach(n=>{if(n){const i=n.split(Wr);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function ke(e){let t="";if(xe(e))t=e;else if(q(e))for(let n=0;n<e.length;n++){const i=ke(e[n]);i&&(t+=i+" ")}else if(ce(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const Hr="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",jr=_i(Hr);function go(e){return!!e||e===""}function Kr(e,t){if(e.length!==t.length)return!1;let n=!0;for(let i=0;n&&i<e.length;i++)n=Zt(e[i],t[i]);return n}function Zt(e,t){if(e===t)return!0;let n=ds(e),i=ds(t);if(n||i)return n&&i?e.getTime()===t.getTime():!1;if(n=at(e),i=at(t),n||i)return e===t;if(n=q(e),i=q(t),n||i)return n&&i?Kr(e,t):!1;if(n=ce(e),i=ce(t),n||i){if(!n||!i)return!1;const s=Object.keys(e).length,o=Object.keys(t).length;if(s!==o)return!1;for(const l in e){const u=e.hasOwnProperty(l),c=t.hasOwnProperty(l);if(u&&!c||!u&&c||!Zt(e[l],t[l]))return!1}}return String(e)===String(t)}function Gi(e,t){return e.findIndex(n=>Zt(n,t))}const bo=e=>!!(e&&e.__v_isRef===!0),k=e=>xe(e)?e:e==null?"":q(e)||ce(e)&&(e.toString===fo||!Q(e.toString))?bo(e)?k(e.value):JSON.stringify(e,vo,2):String(e),vo=(e,t)=>bo(t)?vo(e,t.value):Ht(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[i,s],o)=>(n[li(i,o)+" =>"]=s,n),{})}:Xt(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>li(n))}:at(t)?li(t):ce(t)&&!q(t)&&!po(t)?String(t):t,li=(e,t="")=>{var n;return at(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Be;class qr{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&Be&&(Be.active?(this.parent=Be,this.index=(Be.scopes||(Be.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes){const i=this.scopes.slice();for(t=0,n=i.length;t<n;t++)i[t].pause()}for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes){const s=this.scopes.slice();for(t=0,n=s.length;t<n;t++)s[t].resume()}const i=this.effects.slice();for(t=0,n=i.length;t<n;t++)i[t].resume()}}run(t){if(this._active){const n=Be;try{return Be=this,t()}finally{Be=n}}}on(){++this._on===1&&(this.prevScope=Be,Be=this)}off(){if(this._on>0&&--this._on===0){if(Be===this)Be=this.prevScope;else{let t=Be;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let n,i;for(n=0,i=this.effects.length;n<i;n++)this.effects[n].stop();for(this.effects.length=0,n=0,i=this.cleanups.length;n<i;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){const s=this.scopes.slice();for(n=0,i=s.length;n<i;n++)s[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Yr(){return Be}let he;const ai=new WeakSet;class yo{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Be&&(Be.active?Be.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ai.has(this)&&(ai.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||wo(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,ps(this),So(this);const t=he,n=Je;he=this,Je=!0;try{return this.fn()}finally{Po(this),he=t,Je=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)ji(t);this.deps=this.depsTail=void 0,ps(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ai.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){xi(this)&&this.run()}get dirty(){return xi(this)}}let xo=0,pn,hn;function wo(e,t=!1){if(e.flags|=8,t){e.next=hn,hn=e;return}e.next=pn,pn=e}function $i(){xo++}function Hi(){if(--xo>0)return;if(hn){let t=hn;for(hn=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;pn;){let t=pn;for(pn=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){e||(e=i)}t=n}}if(e)throw e}function So(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Po(e){let t,n=e.depsTail,i=n;for(;i;){const s=i.prevDep;i.version===-1?(i===n&&(n=s),ji(i),Jr(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}e.deps=t,e.depsTail=n}function xi(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Co(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Co(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===vn)||(e.globalVersion=vn,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!xi(e))))return;e.flags|=2;const t=e.dep,n=he,i=Je;he=e,Je=!0;try{So(e);const s=e.fn(e._value);(t.version===0||rt(s,e._value))&&(e.flags|=128,e._value=s,t.version++)}catch(s){throw t.version++,s}finally{he=n,Je=i,Po(e),e.flags&=-3}}function ji(e,t=!1){const{dep:n,prevSub:i,nextSub:s}=e;if(i&&(i.nextSub=s,e.prevSub=void 0),s&&(s.prevSub=i,e.nextSub=void 0),n.subs===e&&(n.subs=i,!i&&n.computed)){n.computed.flags&=-5;for(let o=n.computed.deps;o;o=o.nextDep)ji(o,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Jr(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let Je=!0;const Mo=[];function xt(){Mo.push(Je),Je=!1}function wt(){const e=Mo.pop();Je=e===void 0?!0:e}function ps(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=he;he=void 0;try{t()}finally{he=n}}}let vn=0;class Xr{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Ki{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!he||!Je||he===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==he)n=this.activeLink=new Xr(he,this),he.deps?(n.prevDep=he.depsTail,he.depsTail.nextDep=n,he.depsTail=n):he.deps=he.depsTail=n,ko(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const i=n.nextDep;i.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=i),n.prevDep=he.depsTail,n.nextDep=void 0,he.depsTail.nextDep=n,he.depsTail=n,he.deps===n&&(he.deps=i)}return n}trigger(t){this.version++,vn++,this.notify(t)}notify(t){$i();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Hi()}}}function ko(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)ko(i)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const wi=new WeakMap,Dt=Symbol(""),Si=Symbol(""),yn=Symbol("");function Oe(e,t,n){if(Je&&he){let i=wi.get(e);i||wi.set(e,i=new Map);let s=i.get(n);s||(i.set(n,s=new Ki),s.map=i,s.key=n),s.track()}}function mt(e,t,n,i,s,o){const l=wi.get(e);if(!l){vn++;return}const u=c=>{c&&c.trigger()};if($i(),t==="clear")l.forEach(u);else{const c=q(e),m=c&&Wi(n);if(c&&n==="length"){const f=Number(i);l.forEach((g,P)=>{(P==="length"||P===yn||!at(P)&&P>=f)&&u(g)})}else switch((n!==void 0||l.has(void 0))&&u(l.get(n)),m&&u(l.get(yn)),t){case"add":c?m&&u(l.get("length")):(u(l.get(Dt)),Ht(e)&&u(l.get(Si)));break;case"delete":c||(u(l.get(Dt)),Ht(e)&&u(l.get(Si)));break;case"set":Ht(e)&&u(l.get(Dt));break}}Hi()}function Wt(e){const t=re(e);return t===e?t:(Oe(t,"iterate",yn),je(e)?t:t.map(Xe))}function Xn(e){return Oe(e=re(e),"iterate",yn),e}function st(e,t){return St(e)?qt(Lt(e)?Xe(t):t):Xe(t)}const Zr={__proto__:null,[Symbol.iterator](){return ui(this,Symbol.iterator,e=>st(this,e))},concat(...e){return Wt(this).concat(...e.map(t=>q(t)?Wt(t):t))},entries(){return ui(this,"entries",e=>(e[1]=st(this,e[1]),e))},every(e,t){return ct(this,"every",e,t,void 0,arguments)},filter(e,t){return ct(this,"filter",e,t,n=>n.map(i=>st(this,i)),arguments)},find(e,t){return ct(this,"find",e,t,n=>st(this,n),arguments)},findIndex(e,t){return ct(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return ct(this,"findLast",e,t,n=>st(this,n),arguments)},findLastIndex(e,t){return ct(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return ct(this,"forEach",e,t,void 0,arguments)},includes(...e){return ci(this,"includes",e)},indexOf(...e){return ci(this,"indexOf",e)},join(e){return Wt(this).join(e)},lastIndexOf(...e){return ci(this,"lastIndexOf",e)},map(e,t){return ct(this,"map",e,t,void 0,arguments)},pop(){return tn(this,"pop")},push(...e){return tn(this,"push",e)},reduce(e,...t){return hs(this,"reduce",e,t)},reduceRight(e,...t){return hs(this,"reduceRight",e,t)},shift(){return tn(this,"shift")},some(e,t){return ct(this,"some",e,t,void 0,arguments)},splice(...e){return tn(this,"splice",e)},toReversed(){return Wt(this).toReversed()},toSorted(e){return Wt(this).toSorted(e)},toSpliced(...e){return Wt(this).toSpliced(...e)},unshift(...e){return tn(this,"unshift",e)},values(){return ui(this,"values",e=>st(this,e))}};function ui(e,t,n){const i=Xn(e),s=i[t]();return i!==e&&!je(e)&&(s._next=s.next,s.next=()=>{const o=s._next();return o.done||(o.value=n(o.value)),o}),s}const Qr=Array.prototype;function ct(e,t,n,i,s,o){const l=Xn(e),u=l!==e&&!je(e),c=l[t];if(c!==Qr[t]){const g=c.apply(e,o);return u?Xe(g):g}let m=n;l!==e&&(u?m=function(g,P){return n.call(this,st(e,g),P,e)}:n.length>2&&(m=function(g,P){return n.call(this,g,P,e)}));const f=c.call(l,m,i);return u&&s?s(f):f}function hs(e,t,n,i){const s=Xn(e),o=s!==e&&!je(e);let l=n,u=!1;s!==e&&(o?(u=i.length===0,l=function(m,f,g){return u&&(u=!1,m=st(e,m)),n.call(this,m,st(e,f),g,e)}):n.length>3&&(l=function(m,f,g){return n.call(this,m,f,g,e)}));const c=s[t](l,...i);return u?st(e,c):c}function ci(e,t,n){const i=re(e);Oe(i,"iterate",yn);const s=i[t](...n);return(s===-1||s===!1)&&Ji(n[0])?(n[0]=re(n[0]),i[t](...n)):s}function tn(e,t,n=[]){xt(),$i();const i=re(e)[t].apply(e,n);return Hi(),wt(),i}const el=_i("__proto__,__v_isRef,__isVue"),Ro=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(at));function tl(e){at(e)||(e=String(e));const t=re(this);return Oe(t,"has",e),t.hasOwnProperty(e)}class To{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,i){if(n==="__v_skip")return t.__v_skip;const s=this._isReadonly,o=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return o;if(n==="__v_raw")return i===(s?o?dl:Oo:o?Eo:Bo).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const l=q(t);if(!s){let c;if(l&&(c=Zr[n]))return c;if(n==="hasOwnProperty")return tl}const u=Reflect.get(t,n,Ee(t)?t:i);if((at(n)?Ro.has(n):el(n))||(s||Oe(t,"get",n),o))return u;if(Ee(u)){const c=l&&Wi(n)?u:u.value;return s&&ce(c)?Ci(c):c}return ce(u)?s?Ci(u):xn(u):u}}class Ao extends To{constructor(t=!1){super(!1,t)}set(t,n,i,s){let o=t[n];const l=q(t)&&Wi(n);if(!this._isShallow){const m=St(o);if(!je(i)&&!St(i)&&(o=re(o),i=re(i)),!l&&Ee(o)&&!Ee(i))return m||(o.value=i),!0}const u=l?Number(n)<t.length:le(t,n),c=Reflect.set(t,n,i,Ee(t)?t:s);return t===re(s)&&c&&(u?rt(i,o)&&mt(t,"set",n,i):mt(t,"add",n,i)),c}deleteProperty(t,n){const i=le(t,n);t[n];const s=Reflect.deleteProperty(t,n);return s&&i&&mt(t,"delete",n,void 0),s}has(t,n){const i=Reflect.has(t,n);return(!at(n)||!Ro.has(n))&&Oe(t,"has",n),i}ownKeys(t){return Oe(t,"iterate",q(t)?"length":Dt),Reflect.ownKeys(t)}}class nl extends To{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const il=new Ao,sl=new nl,ol=new Ao(!0);const Pi=e=>e,An=e=>Reflect.getPrototypeOf(e);function rl(e,t,n){return function(...i){const s=this.__v_raw,o=re(s),l=Ht(o),u=e==="entries"||e===Symbol.iterator&&l,c=e==="keys"&&l,m=s[e](...i),f=n?Pi:t?qt:Xe;return!t&&Oe(o,"iterate",c?Si:Dt),Fe(Object.create(m),{next(){const{value:g,done:P}=m.next();return P?{value:g,done:P}:{value:u?[f(g[0]),f(g[1])]:f(g),done:P}}})}}function Bn(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function ll(e,t){const n={get(s){const o=this.__v_raw,l=re(o),u=re(s);e||(rt(s,u)&&Oe(l,"get",s),Oe(l,"get",u));const{has:c}=An(l),m=t?Pi:e?qt:Xe;if(c.call(l,s))return m(o.get(s));if(c.call(l,u))return m(o.get(u));o!==l&&o.get(s)},get size(){const s=this.__v_raw;return!e&&Oe(re(s),"iterate",Dt),s.size},has(s){const o=this.__v_raw,l=re(o),u=re(s);return e||(rt(s,u)&&Oe(l,"has",s),Oe(l,"has",u)),s===u?o.has(s):o.has(s)||o.has(u)},forEach(s,o){const l=this,u=l.__v_raw,c=re(u),m=t?Pi:e?qt:Xe;return!e&&Oe(c,"iterate",Dt),u.forEach((f,g)=>s.call(o,m(f),m(g),l))}};return Fe(n,e?{add:Bn("add"),set:Bn("set"),delete:Bn("delete"),clear:Bn("clear")}:{add(s){const o=re(this),l=An(o),u=re(s),c=!t&&!je(s)&&!St(s)?u:s;return l.has.call(o,c)||rt(s,c)&&l.has.call(o,s)||rt(u,c)&&l.has.call(o,u)||(o.add(c),mt(o,"add",c,c)),this},set(s,o){!t&&!je(o)&&!St(o)&&(o=re(o));const l=re(this),{has:u,get:c}=An(l);let m=u.call(l,s);m||(s=re(s),m=u.call(l,s));const f=c.call(l,s);return l.set(s,o),m?rt(o,f)&&mt(l,"set",s,o):mt(l,"add",s,o),this},delete(s){const o=re(this),{has:l,get:u}=An(o);let c=l.call(o,s);c||(s=re(s),c=l.call(o,s)),u&&u.call(o,s);const m=o.delete(s);return c&&mt(o,"delete",s,void 0),m},clear(){const s=re(this),o=s.size!==0,l=s.clear();return o&&mt(s,"clear",void 0,void 0),l}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=rl(s,e,t)}),n}function qi(e,t){const n=ll(e,t);return(i,s,o)=>s==="__v_isReactive"?!e:s==="__v_isReadonly"?e:s==="__v_raw"?i:Reflect.get(le(n,s)&&s in i?n:i,s,o)}const al={get:qi(!1,!1)},ul={get:qi(!1,!0)},cl={get:qi(!0,!1)};const Bo=new WeakMap,Eo=new WeakMap,Oo=new WeakMap,dl=new WeakMap;function fl(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function xn(e){return St(e)?e:Yi(e,!1,il,al,Bo)}function pl(e){return Yi(e,!1,ol,ul,Eo)}function Ci(e){return Yi(e,!0,sl,cl,Oo)}function Yi(e,t,n,i,s){if(!ce(e)||e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;const o=s.get(e);if(o)return o;const l=fl(Ur(e));if(l===0)return e;const u=new Proxy(e,l===2?i:n);return s.set(e,u),u}function Lt(e){return St(e)?Lt(e.__v_raw):!!(e&&e.__v_isReactive)}function St(e){return!!(e&&e.__v_isReadonly)}function je(e){return!!(e&&e.__v_isShallow)}function Ji(e){return e?!!e.__v_raw:!1}function re(e){const t=e&&e.__v_raw;return t?re(t):e}function hl(e){return!le(e,"__v_skip")&&Object.isExtensible(e)&&mo(e,"__v_skip",!0),e}const Xe=e=>ce(e)?xn(e):e,qt=e=>ce(e)?Ci(e):e;function Ee(e){return e?e.__v_isRef===!0:!1}function me(e){return Fo(e,!1)}function nn(e){return Fo(e,!0)}function Fo(e,t){return Ee(e)?e:new ml(e,t)}class ml{constructor(t,n){this.dep=new Ki,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:re(t),this._value=n?t:Xe(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,i=this.__v_isShallow||je(t)||St(t);t=i?t:re(t),rt(t,n)&&(this._rawValue=t,this._value=i?t:Xe(t),this.dep.trigger())}}function Ce(e){return Ee(e)?e.value:e}const gl={get:(e,t,n)=>t==="__v_raw"?e:Ce(Reflect.get(e,t,n)),set:(e,t,n,i)=>{const s=e[t];return Ee(s)&&!Ee(n)?(s.value=n,!0):Reflect.set(e,t,n,i)}};function Io(e){return Lt(e)?e:new Proxy(e,gl)}class bl{constructor(t,n,i){this.fn=t,this.setter=n,this._value=void 0,this.dep=new Ki(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=vn-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&he!==this)return wo(this,!0),!0}get value(){const t=this.dep.track();return Co(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function vl(e,t,n=!1){let i,s;return Q(e)?i=e:(i=e.get,s=e.set),new bl(i,s,n)}const En={},Un=new WeakMap;let It;function yl(e,t=!1,n=It){if(n){let i=Un.get(n);i||Un.set(n,i=[]),i.push(e)}}function xl(e,t,n=pe){const{immediate:i,deep:s,once:o,scheduler:l,augmentJob:u,call:c}=n,m=v=>s?v:je(v)||s===!1||s===0?gt(v,1):gt(v);let f,g,P,w,A=!1,B=!1;if(Ee(e)?(g=()=>e.value,A=je(e)):Lt(e)?(g=()=>m(e),A=!0):q(e)?(B=!0,A=e.some(v=>Lt(v)||je(v)),g=()=>e.map(v=>{if(Ee(v))return v.value;if(Lt(v))return m(v);if(Q(v))return c?c(v,2):v()})):Q(e)?t?g=c?()=>c(e,2):e:g=()=>{if(P){xt();try{P()}finally{wt()}}const v=It;It=f;try{return c?c(e,3,[w]):e(w)}finally{It=v}}:g=lt,t&&s){const v=g,T=s===!0?1/0:s;g=()=>gt(v(),T)}const y=Yr(),Y=()=>{f.stop(),y&&y.active&&Vi(y.effects,f)};if(o&&t){const v=t;t=(...T)=>{const U=v(...T);return Y(),U}}let F=B?new Array(e.length).fill(En):En;const R=v=>{if(!(!(f.flags&1)||!f.dirty&&!v))if(t){const T=f.run();if(v||s||A||(B?T.some((U,_)=>rt(U,F[_])):rt(T,F))){P&&P();const U=It;It=f;try{const _=[T,F===En?void 0:B&&F[0]===En?[]:F,w];F=T,c?c(t,3,_):t(..._)}finally{It=U}}}else f.run()};return u&&u(R),f=new yo(g),f.scheduler=l?()=>l(R,!1):R,w=v=>yl(v,!1,f),P=f.onStop=()=>{const v=Un.get(f);if(v){if(c)c(v,4);else for(const T of v)T();Un.delete(f)}},t?i?R(!0):F=f.run():l?l(R.bind(null,!0),!0):f.run(),Y.pause=f.pause.bind(f),Y.resume=f.resume.bind(f),Y.stop=Y,Y}function gt(e,t=1/0,n){if(t<=0||!ce(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,Ee(e))gt(e.value,t,n);else if(q(e))for(let i=0;i<e.length;i++)gt(e[i],t,n);else if(Xt(e)||Ht(e))e.forEach(i=>{gt(i,t,n)});else if(po(e)){for(const i in e)gt(e[i],t,n);for(const i of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,i)&&gt(e[i],t,n)}return e}/**
* @vue/runtime-core v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Rn(e,t,n,i){try{return i?e(...i):e()}catch(s){Zn(s,t,n)}}function Ze(e,t,n,i){if(Q(e)){const s=Rn(e,t,n,i);return s&&co(s)&&s.catch(o=>{Zn(o,t,n)}),s}if(q(e)){const s=[];for(let o=0;o<e.length;o++)s.push(Ze(e[o],t,n,i));return s}}function Zn(e,t,n,i=!0){const s=t?t.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:l}=t&&t.appContext.config||pe;if(t){let u=t.parent;const c=t.proxy,m=`https://vuejs.org/error-reference/#runtime-${n}`;for(;u;){const f=u.ec;if(f){for(let g=0;g<f.length;g++)if(f[g](e,c,m)===!1)return}u=u.parent}if(o){xt(),Rn(o,null,10,[e,c,m]),wt();return}}wl(e,n,s,i,l)}function wl(e,t,n,i=!0,s=!1){if(s)throw e;console.error(e)}const Le=[];let it=-1;const jt=[];let Tt=null,Gt=0;const zo=Promise.resolve();let Nn=null;function Xi(e){const t=Nn||zo;return e?t.then(this?e.bind(this):e):t}function Sl(e){let t=it+1,n=Le.length;for(;t<n;){const i=t+n>>>1,s=Le[i],o=wn(s);o<e||o===e&&s.flags&2?t=i+1:n=i}return t}function Zi(e){if(!(e.flags&1)){const t=wn(e),n=Le[Le.length-1];!n||!(e.flags&2)&&t>=wn(n)?Le.push(e):Le.splice(Sl(t),0,e),e.flags|=1,Do()}}function Do(){Nn||(Nn=zo.then(Uo))}function Pl(e){q(e)?jt.push(...e):Tt&&e.id===-1?Tt.splice(Gt+1,0,e):e.flags&1||(jt.push(e),e.flags|=1),Do()}function ms(e,t,n=it+1){for(;n<Le.length;n++){const i=Le[n];if(i&&i.flags&2){if(e&&i.id!==e.uid)continue;Le.splice(n,1),n--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Lo(e){if(jt.length){const t=[...new Set(jt)].sort((n,i)=>wn(n)-wn(i));if(jt.length=0,Tt){Tt.push(...t);return}for(Tt=t,Gt=0;Gt<Tt.length;Gt++){const n=Tt[Gt];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Tt=null,Gt=0}}const wn=e=>e.id==null?e.flags&2?-1:1/0:e.id;function Uo(e){try{for(it=0;it<Le.length;it++){const t=Le[it];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Rn(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;it<Le.length;it++){const t=Le[it];t&&(t.flags&=-2)}it=-1,Le.length=0,Lo(),Nn=null,(Le.length||jt.length)&&Uo()}}let He=null,No=null;function _n(e){const t=He;return He=e,No=e&&e.type.__scopeId||null,t}function Cl(e,t=He,n){if(!t||e._n)return e;const i=(...s)=>{i._d&&ks(-1);const o=_n(t),l=Nt.length;let u;try{u=e(...s)}finally{for(let c=Nt.length;c>l;c--)ur();_n(o),i._d&&ks(1)}return u};return i._n=!0,i._c=!0,i._d=!0,i}function $(e,t){if(He===null)return e;const n=ii(He),i=e.dirs||(e.dirs=[]);for(let s=0;s<t.length;s++){let[o,l,u,c=pe]=t[s];o&&(Q(o)&&(o={mounted:o,updated:o}),o.deep&&gt(l),i.push({dir:o,instance:n,value:l,oldValue:void 0,arg:u,modifiers:c}))}return e}function Ot(e,t,n,i){const s=e.dirs,o=t&&t.dirs;for(let l=0;l<s.length;l++){const u=s[l];o&&(u.oldValue=o[l].value);let c=u.dir[i];c&&(xt(),Ze(c,n,8,[e.el,u,e,t]),wt())}}function Ml(e,t){if(Ue){let n=Ue.provides;const i=Ue.parent&&Ue.parent.provides;i===n&&(n=Ue.provides=Object.create(i)),n[e]=t}}function In(e,t,n=!1){const i=xa();if(i||Kt){let s=Kt?Kt._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&e in s)return s[e];if(arguments.length>1)return n&&Q(t)?t.call(i&&i.proxy):t}}const kl=Symbol.for("v-scx"),Rl=()=>In(kl);function Ut(e,t,n){return _o(e,t,n)}function _o(e,t,n=pe){const{immediate:i,deep:s,flush:o,once:l}=n,u=Fe({},n),c=t&&i||!t&&o!=="post";let m;if(Cn){if(o==="sync"){const w=Rl();m=w.__watcherHandles||(w.__watcherHandles=[])}else if(!c){const w=()=>{};return w.stop=lt,w.resume=lt,w.pause=lt,w}}const f=Ue;u.call=(w,A,B)=>Ze(w,f,A,B);let g=!1;o==="post"?u.scheduler=w=>{_e(w,f&&f.suspense)}:o!=="sync"&&(g=!0,u.scheduler=(w,A)=>{A?w():Zi(w)}),u.augmentJob=w=>{t&&(w.flags|=4),g&&(w.flags|=2,f&&(w.id=f.uid,w.i=f))};const P=xl(e,t,u);return Cn&&(m?m.push(P):c&&P()),P}function Tl(e,t,n){const i=this.proxy,s=xe(e)?e.includes(".")?Vo(i,e):()=>i[e]:e.bind(i,i);let o;Q(t)?o=t:(o=t.handler,n=t);const l=Tn(this),u=_o(s,o.bind(i),n);return l(),u}function Vo(e,t){const n=t.split(".");return()=>{let i=e;for(let s=0;s<n.length&&i;s++)i=i[n[s]];return i}}const Al=Symbol("_vte"),Bl=e=>e.__isTeleport,di=Symbol("_leaveCb");function Qi(e,t){e.shapeFlag&6&&e.component?(e.transition=t,Qi(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Wo(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function gs(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}const Vn=new WeakMap;function mn(e,t,n,i,s=!1){if(q(e)){e.forEach((B,y)=>mn(B,t&&(q(t)?t[y]:t),n,i,s));return}if(gn(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&mn(e,t,n,i.component.subTree);return}const o=i.shapeFlag&4?ii(i.component):i.el,l=s?null:o,{i:u,r:c}=e,m=t&&t.r,f=u.refs===pe?u.refs={}:u.refs,g=u.setupState,P=re(g),w=g===pe?uo:B=>gs(f,B)?!1:le(P,B),A=(B,y)=>!(y&&gs(f,y));if(m!=null&&m!==c){if(bs(t),xe(m))f[m]=null,w(m)&&(g[m]=null);else if(Ee(m)){const B=t;A(m,B.k)&&(m.value=null),B.k&&(f[B.k]=null)}}if(Q(c))Rn(c,u,12,[l,f]);else{const B=xe(c),y=Ee(c);if(B||y){const Y=()=>{if(e.f){const F=B?w(c)?g[c]:f[c]:A()||!e.k?c.value:f[e.k];if(s)q(F)&&Vi(F,o);else if(q(F))F.includes(o)||F.push(o);else if(B)f[c]=[o],w(c)&&(g[c]=f[c]);else{const R=[o];A(c,e.k)&&(c.value=R),e.k&&(f[e.k]=R)}}else B?(f[c]=l,w(c)&&(g[c]=l)):y&&(A(c,e.k)&&(c.value=l),e.k&&(f[e.k]=l))};if(l){const F=()=>{Y(),Vn.delete(e)};F.id=-1,Vn.set(e,F),_e(F,n)}else bs(e),Y()}}}function bs(e){const t=Vn.get(e);t&&(t.flags|=8,Vn.delete(e))}Jn().requestIdleCallback;Jn().cancelIdleCallback;const gn=e=>!!e.type.__asyncLoader,Go=e=>e.type.__isKeepAlive;function El(e,t){$o(e,"a",t)}function Ol(e,t){$o(e,"da",t)}function $o(e,t,n=Ue){const i=e.__wdc||(e.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return e()});if(Qn(t,i,n),n){let s=n.parent;for(;s&&s.parent;)Go(s.parent.vnode)&&Fl(i,t,n,s),s=s.parent}}function Fl(e,t,n,i){const s=Qn(t,e,i,!0);Ho(()=>{Vi(i[t],s)},n)}function Qn(e,t,n=Ue,i=!1){if(n){const s=n[e]||(n[e]=[]),o=t.__weh||(t.__weh=(...l)=>{xt();const u=Tn(n),c=Ze(t,n,e,l);return u(),wt(),c});return i?s.unshift(o):s.push(o),o}}const Pt=e=>(t,n=Ue)=>{(!Cn||e==="sp")&&Qn(e,(...i)=>t(...i),n)},Il=Pt("bm"),ei=Pt("m"),zl=Pt("bu"),Dl=Pt("u"),Sn=Pt("bum"),Ho=Pt("um"),Ll=Pt("sp"),Ul=Pt("rtg"),Nl=Pt("rtc");function _l(e,t=Ue){Qn("ec",e,t)}const Vl=Symbol.for("v-ndc");function ve(e,t,n,i){let s;const o=n,l=q(e);if(l||xe(e)){const u=l&&Lt(e);let c=!1,m=!1;u&&(c=!je(e),m=St(e),e=Xn(e)),s=new Array(e.length);for(let f=0,g=e.length;f<g;f++)s[f]=t(c?m?qt(Xe(e[f])):Xe(e[f]):e[f],f,void 0,o)}else if(typeof e=="number"){s=new Array(e);for(let u=0;u<e;u++)s[u]=t(u+1,u,void 0,o)}else if(ce(e))if(e[Symbol.iterator])s=Array.from(e,(u,c)=>t(u,c,void 0,o));else{const u=Object.keys(e);s=new Array(u.length);for(let c=0,m=u.length;c<m;c++){const f=u[c];s[c]=t(e[f],f,c,o)}}else s=[];return s}const Mi=e=>e?hr(e)?ii(e):Mi(e.parent):null,bn=Fe(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Mi(e.parent),$root:e=>Mi(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Ko(e),$forceUpdate:e=>e.f||(e.f=()=>{Zi(e.update)}),$nextTick:e=>e.n||(e.n=Xi.bind(e.proxy)),$watch:e=>Tl.bind(e)}),fi=(e,t)=>e!==pe&&!e.__isScriptSetup&&le(e,t),Wl={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:i,data:s,props:o,accessCache:l,type:u,appContext:c}=e;if(t[0]!=="$"){const P=l[t];if(P!==void 0)switch(P){case 1:return i[t];case 2:return s[t];case 4:return n[t];case 3:return o[t]}else{if(fi(i,t))return l[t]=1,i[t];if(s!==pe&&le(s,t))return l[t]=2,s[t];if(le(o,t))return l[t]=3,o[t];if(n!==pe&&le(n,t))return l[t]=4,n[t];ki&&(l[t]=0)}}const m=bn[t];let f,g;if(m)return t==="$attrs"&&Oe(e.attrs,"get",""),m(e);if((f=u.__cssModules)&&(f=f[t]))return f;if(n!==pe&&le(n,t))return l[t]=4,n[t];if(g=c.config.globalProperties,le(g,t))return g[t]},set({_:e},t,n){const{data:i,setupState:s,ctx:o}=e;return fi(s,t)?(s[t]=n,!0):i!==pe&&le(i,t)?(i[t]=n,!0):le(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(o[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:i,appContext:s,props:o,type:l}},u){let c;return!!(n[u]||e!==pe&&u[0]!=="$"&&le(e,u)||fi(t,u)||le(o,u)||le(i,u)||le(bn,u)||le(s.config.globalProperties,u)||(c=l.__cssModules)&&c[u])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:le(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function vs(e){return q(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let ki=!0;function Gl(e){const t=Ko(e),n=e.proxy,i=e.ctx;ki=!1,t.beforeCreate&&ys(t.beforeCreate,e,"bc");const{data:s,computed:o,methods:l,watch:u,provide:c,inject:m,created:f,beforeMount:g,mounted:P,beforeUpdate:w,updated:A,activated:B,deactivated:y,beforeDestroy:Y,beforeUnmount:F,destroyed:R,unmounted:v,render:T,renderTracked:U,renderTriggered:_,errorCaptured:K,serverPrefetch:ie,expose:ge,inheritAttrs:Ie,components:Ct,directives:ut,filters:Mt}=t;if(m&&$l(m,i,null),l)for(const de in l){const ne=l[de];Q(ne)&&(i[de]=ne.bind(n))}if(s){const de=s.call(n,n);ce(de)&&(e.data=xn(de))}if(ki=!0,o)for(const de in o){const ne=o[de],G=Q(ne)?ne.bind(n,n):Q(ne.get)?ne.get.bind(n,n):lt,a=!Q(ne)&&Q(ne.set)?ne.set.bind(n):lt,p=qe({get:G,set:a});Object.defineProperty(i,de,{enumerable:!0,configurable:!0,get:()=>p.value,set:Z=>p.value=Z})}if(u)for(const de in u)jo(u[de],i,n,de);if(c){const de=Q(c)?c.call(n):c;Reflect.ownKeys(de).forEach(ne=>{Ml(ne,de[ne])})}f&&ys(f,e,"c");function Se(de,ne){q(ne)?ne.forEach(G=>de(G.bind(n))):ne&&de(ne.bind(n))}if(Se(Il,g),Se(ei,P),Se(zl,w),Se(Dl,A),Se(El,B),Se(Ol,y),Se(_l,K),Se(Nl,U),Se(Ul,_),Se(Sn,F),Se(Ho,v),Se(Ll,ie),q(ge))if(ge.length){const de=e.exposed||(e.exposed={});ge.forEach(ne=>{Object.defineProperty(de,ne,{get:()=>n[ne],set:G=>n[ne]=G,enumerable:!0})})}else e.exposed||(e.exposed={});T&&e.render===lt&&(e.render=T),Ie!=null&&(e.inheritAttrs=Ie),Ct&&(e.components=Ct),ut&&(e.directives=ut),ie&&Wo(e)}function $l(e,t,n=lt){q(e)&&(e=Ri(e));for(const i in e){const s=e[i];let o;ce(s)?"default"in s?o=In(s.from||i,s.default,!0):o=In(s.from||i):o=In(s),Ee(o)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>o.value,set:l=>o.value=l}):t[i]=o}}function ys(e,t,n){Ze(q(e)?e.map(i=>i.bind(t.proxy)):e.bind(t.proxy),t,n)}function jo(e,t,n,i){let s=i.includes(".")?Vo(n,i):()=>n[i];if(xe(e)){const o=t[e];Q(o)&&Ut(s,o)}else if(Q(e))Ut(s,e.bind(n));else if(ce(e))if(q(e))e.forEach(o=>jo(o,t,n,i));else{const o=Q(e.handler)?e.handler.bind(n):t[e.handler];Q(o)&&Ut(s,o,e)}}function Ko(e){const t=e.type,{mixins:n,extends:i}=t,{mixins:s,optionsCache:o,config:{optionMergeStrategies:l}}=e.appContext,u=o.get(t);let c;return u?c=u:!s.length&&!n&&!i?c=t:(c={},s.length&&s.forEach(m=>Wn(c,m,l,!0)),Wn(c,t,l)),ce(t)&&o.set(t,c),c}function Wn(e,t,n,i=!1){const{mixins:s,extends:o}=t;o&&Wn(e,o,n,!0),s&&s.forEach(l=>Wn(e,l,n,!0));for(const l in t)if(!(i&&l==="expose")){const u=Hl[l]||n&&n[l];e[l]=u?u(e[l],t[l]):t[l]}return e}const Hl={data:xs,props:ws,emits:ws,methods:an,computed:an,beforeCreate:De,created:De,beforeMount:De,mounted:De,beforeUpdate:De,updated:De,beforeDestroy:De,beforeUnmount:De,destroyed:De,unmounted:De,activated:De,deactivated:De,errorCaptured:De,serverPrefetch:De,components:an,directives:an,watch:Kl,provide:xs,inject:jl};function xs(e,t){return t?e?function(){return Fe(Q(e)?e.call(this,this):e,Q(t)?t.call(this,this):t)}:t:e}function jl(e,t){return an(Ri(e),Ri(t))}function Ri(e){if(q(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function De(e,t){return e?[...new Set([].concat(e,t))]:t}function an(e,t){return e?Fe(Object.create(null),e,t):t}function ws(e,t){return e?q(e)&&q(t)?[...new Set([...e,...t])]:Fe(Object.create(null),vs(e),vs(t??{})):t}function Kl(e,t){if(!e)return t;if(!t)return e;const n=Fe(Object.create(null),e);for(const i in t)n[i]=De(e[i],t[i]);return n}function qo(){return{app:null,config:{isNativeTag:uo,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let ql=0;function Yl(e,t){return function(i,s=null){Q(i)||(i=Fe({},i)),s!=null&&!ce(s)&&(s=null);const o=qo(),l=new WeakSet,u=[];let c=!1;const m=o.app={_uid:ql++,_component:i,_props:s,_container:null,_context:o,_instance:null,version:ka,get config(){return o.config},set config(f){},use(f,...g){return l.has(f)||(f&&Q(f.install)?(l.add(f),f.install(m,...g)):Q(f)&&(l.add(f),f(m,...g))),m},mixin(f){return o.mixins.includes(f)||o.mixins.push(f),m},component(f,g){return g?(o.components[f]=g,m):o.components[f]},directive(f,g){return g?(o.directives[f]=g,m):o.directives[f]},mount(f,g,P){if(!c){const w=m._ceVNode||$e(i,s);return w.appContext=o,P===!0?P="svg":P===!1&&(P=void 0),e(w,f,P),c=!0,m._container=f,f.__vue_app__=m,ii(w.component)}},onUnmount(f){u.push(f)},unmount(){c&&(Ze(u,m._instance,16),e(null,m._container),delete m._container.__vue_app__)},provide(f,g){return o.provides[f]=g,m},runWithContext(f){const g=Kt;Kt=m;try{return f()}finally{Kt=g}}};return m}}let Kt=null;const Jl=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${Ye(t)}Modifiers`]||e[`${Et(t)}Modifiers`];function Xl(e,t,...n){if(e.isUnmounted)return;const i=e.vnode.props||pe;let s=n;const o=t.startsWith("update:"),l=o&&Jl(i,t.slice(7));l&&(l.trim&&(s=n.map(f=>xe(f)?f.trim():f)),l.number&&(s=n.map(Yn)));let u,c=i[u=ri(t)]||i[u=ri(Ye(t))];!c&&o&&(c=i[u=ri(Et(t))]),c&&Ze(c,e,6,s);const m=i[u+"Once"];if(m){if(!e.emitted)e.emitted={};else if(e.emitted[u])return;e.emitted[u]=!0,Ze(m,e,6,s)}}const Zl=new WeakMap;function Yo(e,t,n=!1){const i=n?Zl:t.emitsCache,s=i.get(e);if(s!==void 0)return s;const o=e.emits;let l={},u=!1;if(!Q(e)){const c=m=>{const f=Yo(m,t,!0);f&&(u=!0,Fe(l,f))};!n&&t.mixins.length&&t.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}return!o&&!u?(ce(e)&&i.set(e,null),null):(q(o)?o.forEach(c=>l[c]=null):Fe(l,o),ce(e)&&i.set(e,l),l)}function ti(e,t){return!e||!jn(t)?!1:(t=t.slice(2),t=t==="Once"?t:t.replace(/Once$/,""),le(e,t[0].toLowerCase()+t.slice(1))||le(e,Et(t))||le(e,t))}function Ss(e){const{type:t,vnode:n,proxy:i,withProxy:s,propsOptions:[o],slots:l,attrs:u,emit:c,render:m,renderCache:f,props:g,data:P,setupState:w,ctx:A,inheritAttrs:B}=e,y=_n(e);let Y,F;try{if(n.shapeFlag&4){const v=s||i,T=v;Y=ot(m.call(T,v,f,g,w,P,A)),F=u}else{const v=t;Y=ot(v.length>1?v(g,{attrs:u,slots:l,emit:c}):v(g,null)),F=t.props?u:Ql(u)}}catch(v){Nt.length=0,Zn(v,e,1),Y=$e(Bt)}let R=Y;if(F&&B!==!1){const v=Object.keys(F),{shapeFlag:T}=R;v.length&&T&7&&(o&&v.some(Kn)&&(F=ea(F,o)),R=Yt(R,F,!1,!0))}return n.dirs&&(R=Yt(R,null,!1,!0),R.dirs=R.dirs?R.dirs.concat(n.dirs):n.dirs),n.transition&&Qi(R,n.transition),Y=R,_n(y),Y}const Ql=e=>{let t;for(const n in e)(n==="class"||n==="style"||jn(n))&&((t||(t={}))[n]=e[n]);return t},ea=(e,t)=>{const n={};for(const i in e)(!Kn(i)||!(i.slice(9)in t))&&(n[i]=e[i]);return n};function ta(e,t,n){const{props:i,children:s,component:o}=e,{props:l,children:u,patchFlag:c}=t,m=o.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return i?Ps(i,l,m):!!l;if(c&8){const f=t.dynamicProps;for(let g=0;g<f.length;g++){const P=f[g];if(Jo(l,i,P)&&!ti(m,P))return!0}}}else return(s||u)&&(!u||!u.$stable)?!0:i===l?!1:i?l?Ps(i,l,m):!0:!!l;return!1}function Ps(e,t,n){const i=Object.keys(t);if(i.length!==Object.keys(e).length)return!0;for(let s=0;s<i.length;s++){const o=i[s];if(Jo(t,e,o)&&!ti(n,o))return!0}return!1}function Jo(e,t,n){const i=e[n],s=t[n];return n==="style"&&ce(i)&&ce(s)?!Zt(i,s):i!==s}function na({vnode:e,parent:t,suspense:n},i){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===e&&(s.suspense.vnode.el=s.el=i,e=s),s===e)(e=t.vnode).el=i,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=i)}const Xo={},Zo=()=>Object.create(Xo),Qo=e=>Object.getPrototypeOf(e)===Xo;function ia(e,t,n,i=!1){const s={},o=Zo();e.propsDefaults=Object.create(null),er(e,t,s,o);for(const l in e.propsOptions[0])l in s||(s[l]=void 0);n?e.props=i?s:pl(s):e.type.props?e.props=s:e.props=o,e.attrs=o}function sa(e,t,n,i){const{props:s,attrs:o,vnode:{patchFlag:l}}=e,u=re(s),[c]=e.propsOptions;let m=!1;if((i||l>0)&&!(l&16)){if(l&8){const f=e.vnode.dynamicProps;for(let g=0;g<f.length;g++){let P=f[g];if(ti(e.emitsOptions,P))continue;const w=t[P];if(c)if(le(o,P))w!==o[P]&&(o[P]=w,m=!0);else{const A=Ye(P);s[A]=Ti(c,u,A,w,e,!1)}else w!==o[P]&&(o[P]=w,m=!0)}}}else{er(e,t,s,o)&&(m=!0);let f;for(const g in u)(!t||!le(t,g)&&((f=Et(g))===g||!le(t,f)))&&(c?n&&(n[g]!==void 0||n[f]!==void 0)&&(s[g]=Ti(c,u,g,void 0,e,!0)):delete s[g]);if(o!==u)for(const g in o)(!t||!le(t,g))&&(delete o[g],m=!0)}m&&mt(e.attrs,"set","")}function er(e,t,n,i){const[s,o]=e.propsOptions;let l=!1,u;if(t)for(let c in t){if(fn(c))continue;const m=t[c];let f;s&&le(s,f=Ye(c))?!o||!o.includes(f)?n[f]=m:(u||(u={}))[f]=m:ti(e.emitsOptions,c)||(!(c in i)||m!==i[c])&&(i[c]=m,l=!0)}if(o){const c=re(n),m=u||pe;for(let f=0;f<o.length;f++){const g=o[f];n[g]=Ti(s,c,g,m[g],e,!le(m,g))}}return l}function Ti(e,t,n,i,s,o){const l=e[n];if(l!=null){const u=le(l,"default");if(u&&i===void 0){const c=l.default;if(l.type!==Function&&!l.skipFactory&&Q(c)){const{propsDefaults:m}=s;if(n in m)i=m[n];else{const f=Tn(s);i=m[n]=c.call(null,t),f()}}else i=c;s.ce&&s.ce._setProp(n,i)}l[0]&&(o&&!u?i=!1:l[1]&&(i===""||i===Et(n))&&(i=!0))}return i}const oa=new WeakMap;function tr(e,t,n=!1){const i=n?oa:t.propsCache,s=i.get(e);if(s)return s;const o=e.props,l={},u=[];let c=!1;if(!Q(e)){const f=g=>{c=!0;const[P,w]=tr(g,t,!0);Fe(l,P),w&&u.push(...w)};!n&&t.mixins.length&&t.mixins.forEach(f),e.extends&&f(e.extends),e.mixins&&e.mixins.forEach(f)}if(!o&&!c)return ce(e)&&i.set(e,$t),$t;if(q(o))for(let f=0;f<o.length;f++){const g=Ye(o[f]);Cs(g)&&(l[g]=pe)}else if(o)for(const f in o){const g=Ye(f);if(Cs(g)){const P=o[f],w=l[g]=q(P)||Q(P)?{type:P}:Fe({},P),A=w.type;let B=!1,y=!0;if(q(A))for(let Y=0;Y<A.length;++Y){const F=A[Y],R=Q(F)&&F.name;if(R==="Boolean"){B=!0;break}else R==="String"&&(y=!1)}else B=Q(A)&&A.name==="Boolean";w[0]=B,w[1]=y,(B||le(w,"default"))&&u.push(g)}}const m=[l,u];return ce(e)&&i.set(e,m),m}function Cs(e){return e[0]!=="$"&&!fn(e)}const es=e=>e==="_"||e==="_ctx"||e==="$stable",ts=e=>q(e)?e.map(ot):[ot(e)],ra=(e,t,n)=>{if(t._n)return t;const i=Cl((...s)=>ts(t(...s)),n);return i._c=!1,i},nr=(e,t,n)=>{const i=e._ctx;for(const s in e){if(es(s))continue;const o=e[s];if(Q(o))t[s]=ra(s,o,i);else if(o!=null){const l=ts(o);t[s]=()=>l}}},ir=(e,t)=>{const n=ts(t);e.slots.default=()=>n},sr=(e,t,n)=>{for(const i in t)(n||!es(i))&&(e[i]=t[i])},la=(e,t,n)=>{const i=e.slots=Zo();if(e.vnode.shapeFlag&32){const s=t._;s?(sr(i,t,n),n&&mo(i,"_",s,!0)):nr(t,i)}else t&&ir(e,t)},aa=(e,t,n)=>{const{vnode:i,slots:s}=e;let o=!0,l=pe;if(i.shapeFlag&32){const u=t._;u?n&&u===1?o=!1:sr(s,t,n):(o=!t.$stable,nr(t,s)),l=t}else t&&(ir(e,t),l={default:1});if(o)for(const u in s)!es(u)&&l[u]==null&&delete s[u]},_e=pa;function ua(e){return ca(e)}function ca(e,t){const n=Jn();n.__VUE__=!0;const{insert:i,remove:s,patchProp:o,createElement:l,createText:u,createComment:c,setText:m,setElementText:f,parentNode:g,nextSibling:P,setScopeId:w=lt,insertStaticContent:A}=e,B=(d,h,b,C=null,x=null,S=null,z=void 0,O=null,E=!!h.dynamicChildren)=>{if(d===h)return;d&&!sn(d,h)&&(C=kt(d),Z(d,x,S,!0),d=null),h.patchFlag===-2&&(E=!1,h.dynamicChildren=null);const{type:M,ref:j,shapeFlag:N}=h;switch(M){case ni:y(d,h,b,C);break;case Bt:Y(d,h,b,C);break;case zn:d==null&&F(h,b,C,z);break;case X:Ct(d,h,b,C,x,S,z,O,E);break;default:N&1?T(d,h,b,C,x,S,z,O,E):N&6?ut(d,h,b,C,x,S,z,O,E):(N&64||N&128)&&M.process(d,h,b,C,x,S,z,O,E,V)}j!=null&&x?mn(j,d&&d.ref,S,h||d,!h):j==null&&d&&d.ref!=null&&mn(d.ref,null,S,d,!0)},y=(d,h,b,C)=>{if(d==null)i(h.el=u(h.children),b,C);else{const x=h.el=d.el;h.children!==d.children&&m(x,h.children)}},Y=(d,h,b,C)=>{d==null?i(h.el=c(h.children||""),b,C):h.el=d.el},F=(d,h,b,C)=>{[d.el,d.anchor]=A(d.children,h,b,C,d.el,d.anchor)},R=({el:d,anchor:h},b,C)=>{let x;for(;d&&d!==h;)x=P(d),i(d,b,C),d=x;i(h,b,C)},v=({el:d,anchor:h})=>{let b;for(;d&&d!==h;)b=P(d),s(d),d=b;s(h)},T=(d,h,b,C,x,S,z,O,E)=>{if(h.type==="svg"?z="svg":h.type==="math"&&(z="mathml"),d==null)U(h,b,C,x,S,z,O,E);else{const M=d.el&&d.el._isVueCE?d.el:null;try{M&&M._beginPatch(),ie(d,h,x,S,z,O,E)}finally{M&&M._endPatch()}}},U=(d,h,b,C,x,S,z,O)=>{let E,M;const{props:j,shapeFlag:N,transition:H,dirs:J}=d;if(E=d.el=l(d.type,S,j&&j.is,j),N&8?f(E,d.children):N&16&&K(d.children,E,null,C,x,pi(d,S),z,O),J&&Ot(d,null,C,"created"),_(E,d,d.scopeId,z,C),j){for(const fe in j)fe!=="value"&&!fn(fe)&&o(E,fe,null,j[fe],S,C);"value"in j&&o(E,"value",null,j.value,S),(M=j.onVnodeBeforeMount)&&nt(M,C,d)}J&&Ot(d,null,C,"beforeMount");const oe=da(x,H);oe&&H.beforeEnter(E),i(E,h,b),((M=j&&j.onVnodeMounted)||oe||J)&&_e(()=>{try{M&&nt(M,C,d),oe&&H.enter(E),J&&Ot(d,null,C,"mounted")}finally{}},x)},_=(d,h,b,C,x)=>{if(b&&w(d,b),C)for(let S=0;S<C.length;S++)w(d,C[S]);if(x){let S=x.subTree;if(h===S||ar(S.type)&&(S.ssContent===h||S.ssFallback===h)){const z=x.vnode;_(d,z,z.scopeId,z.slotScopeIds,x.parent)}}},K=(d,h,b,C,x,S,z,O,E=0)=>{for(let M=E;M<d.length;M++){const j=d[M]=O?pt(d[M]):ot(d[M]);B(null,j,h,b,C,x,S,z,O)}},ie=(d,h,b,C,x,S,z)=>{const O=h.el=d.el;let{patchFlag:E,dynamicChildren:M,dirs:j}=h;E|=d.patchFlag&16;const N=d.props||pe,H=h.props||pe;let J;if(b&&Ft(b,!1),(J=H.onVnodeBeforeUpdate)&&nt(J,b,h,d),j&&Ot(h,d,b,"beforeUpdate"),b&&Ft(b,!0),M&&(!d.dynamicChildren||d.dynamicChildren.length!==M.length)&&(E=0,z=!1,M=null),(N.innerHTML&&H.innerHTML==null||N.textContent&&H.textContent==null)&&f(O,""),M?ge(d.dynamicChildren,M,O,b,C,pi(h,x),S):z||ne(d,h,O,null,b,C,pi(h,x),S,!1),E>0){if(E&16)Ie(O,N,H,b,x);else if(E&2&&N.class!==H.class&&o(O,"class",null,H.class,x),E&4&&o(O,"style",N.style,H.style,x),E&8){const oe=h.dynamicProps;for(let fe=0;fe<oe.length;fe++){const ue=oe[fe],Pe=N[ue],Te=H[ue];(Te!==Pe||ue==="value")&&o(O,ue,Pe,Te,x,b)}}E&1&&d.children!==h.children&&f(O,h.children)}else!z&&M==null&&Ie(O,N,H,b,x);((J=H.onVnodeUpdated)||j)&&_e(()=>{J&&nt(J,b,h,d),j&&Ot(h,d,b,"updated")},C)},ge=(d,h,b,C,x,S,z)=>{for(let O=0;O<h.length;O++){const E=d[O],M=h[O],j=E.el&&(E.type===X||!sn(E,M)||E.shapeFlag&198)?g(E.el):b;B(E,M,j,null,C,x,S,z,!0)}},Ie=(d,h,b,C,x)=>{if(h!==b){if(h!==pe)for(const S in h)!fn(S)&&!(S in b)&&o(d,S,h[S],null,x,C);for(const S in b){if(fn(S))continue;const z=b[S],O=h[S];z!==O&&S!=="value"&&o(d,S,O,z,x,C)}"value"in b&&o(d,"value",h.value,b.value,x)}},Ct=(d,h,b,C,x,S,z,O,E)=>{const M=h.el=d?d.el:u(""),j=h.anchor=d?d.anchor:u("");let{patchFlag:N,dynamicChildren:H,slotScopeIds:J}=h;J&&(O=O?O.concat(J):J),d==null?(i(M,b,C),i(j,b,C),K(h.children||[],b,j,x,S,z,O,E)):N>0&&N&64&&H&&d.dynamicChildren&&d.dynamicChildren.length===H.length?(ge(d.dynamicChildren,H,b,x,S,z,O),(h.key!=null||x&&h===x.subTree)&&or(d,h,!0)):ne(d,h,b,j,x,S,z,O,E)},ut=(d,h,b,C,x,S,z,O,E)=>{h.slotScopeIds=O,d==null?h.shapeFlag&512?x.ctx.activate(h,b,C,z,E):Mt(h,b,C,x,S,z,E):Ke(d,h,E)},Mt=(d,h,b,C,x,S,z)=>{const O=d.component=ya(d,C,x);if(Go(d)&&(O.ctx.renderer=V),wa(O,!1,z),O.asyncDep){if(x&&x.registerDep(O,Se,z),!d.el){const E=O.subTree=$e(Bt);Y(null,E,h,b),d.placeholder=E.el}}else Se(O,d,h,b,x,S,z)},Ke=(d,h,b)=>{const C=h.component=d.component;if(ta(d,h,b))if(C.asyncDep&&!C.asyncResolved){de(C,h,b);return}else C.next=h,C.update();else h.el=d.el,C.vnode=h},Se=(d,h,b,C,x,S,z)=>{const O=()=>{if(d.isMounted){let{next:N,bu:H,u:J,parent:oe,vnode:fe}=d;{const et=rr(d);if(et){N&&(N.el=fe.el,de(d,N,z)),et.asyncDep.then(()=>{_e(()=>{d.isUnmounted||M()},x)});return}}let ue=N,Pe;Ft(d,!1),N?(N.el=fe.el,de(d,N,z)):N=fe,H&&Fn(H),(Pe=N.props&&N.props.onVnodeBeforeUpdate)&&nt(Pe,oe,N,fe),Ft(d,!0);const Te=Ss(d),Qe=d.subTree;d.subTree=Te,B(Qe,Te,g(Qe.el),kt(Qe),d,x,S),N.el=Te.el,ue===null&&na(d,Te.el),J&&_e(J,x),(Pe=N.props&&N.props.onVnodeUpdated)&&_e(()=>nt(Pe,oe,N,fe),x)}else{let N;const{el:H,props:J}=h,{bm:oe,m:fe,parent:ue,root:Pe,type:Te}=d,Qe=gn(h);Ft(d,!1),oe&&Fn(oe),!Qe&&(N=J&&J.onVnodeBeforeMount)&&nt(N,ue,h),Ft(d,!0);{Pe.ce&&Pe.ce._hasShadowRoot()&&Pe.ce._injectChildStyle(Te,d.parent?d.parent.type:void 0);const et=d.subTree=Ss(d);B(null,et,b,C,d,x,S),h.el=et.el}if(fe&&_e(fe,x),!Qe&&(N=J&&J.onVnodeMounted)){const et=h;_e(()=>nt(N,ue,et),x)}(h.shapeFlag&256||ue&&gn(ue.vnode)&&ue.vnode.shapeFlag&256)&&d.a&&_e(d.a,x),d.isMounted=!0,h=b=C=null}};d.scope.on();const E=d.effect=new yo(O);d.scope.off();const M=d.update=E.run.bind(E),j=d.job=E.runIfDirty.bind(E);j.i=d,j.id=d.uid,E.scheduler=()=>Zi(j),Ft(d,!0),M()},de=(d,h,b)=>{h.component=d;const C=d.vnode.props;d.vnode=h,d.next=null,sa(d,h.props,C,b),aa(d,h.children,b),xt(),ms(d),wt()},ne=(d,h,b,C,x,S,z,O,E=!1)=>{const M=d&&d.children,j=d?d.shapeFlag:0,N=h.children,{patchFlag:H,shapeFlag:J}=h;if(H>0){if(H&128){a(M,N,b,C,x,S,z,O,E);return}else if(H&256){G(M,N,b,C,x,S,z,O,E);return}}J&8?(j&16&&Re(M,x,S),N!==M&&f(b,N)):j&16?J&16?a(M,N,b,C,x,S,z,O,E):Re(M,x,S,!0):(j&8&&f(b,""),J&16&&K(N,b,C,x,S,z,O,E))},G=(d,h,b,C,x,S,z,O,E)=>{d=d||$t,h=h||$t;const M=d.length,j=h.length,N=Math.min(M,j);let H;for(H=0;H<N;H++){const J=h[H]=E?pt(h[H]):ot(h[H]);B(d[H],J,b,null,x,S,z,O,E)}M>j?Re(d,x,S,!0,!1,N):K(h,b,C,x,S,z,O,E,N)},a=(d,h,b,C,x,S,z,O,E)=>{let M=0;const j=h.length;let N=d.length-1,H=j-1;for(;M<=N&&M<=H;){const J=d[M],oe=h[M]=E?pt(h[M]):ot(h[M]);if(sn(J,oe))B(J,oe,b,null,x,S,z,O,E);else break;M++}for(;M<=N&&M<=H;){const J=d[N],oe=h[H]=E?pt(h[H]):ot(h[H]);if(sn(J,oe))B(J,oe,b,null,x,S,z,O,E);else break;N--,H--}if(M>N){if(M<=H){const J=H+1,oe=J<j?h[J].el:C;for(;M<=H;)B(null,h[M]=E?pt(h[M]):ot(h[M]),b,oe,x,S,z,O,E),M++}}else if(M>H)for(;M<=N;)Z(d[M],x,S,!0),M++;else{const J=M,oe=M,fe=new Map;for(M=oe;M<=H;M++){const We=h[M]=E?pt(h[M]):ot(h[M]);We.key!=null&&fe.set(We.key,M)}let ue,Pe=0;const Te=H-oe+1;let Qe=!1,et=0;const en=new Array(Te);for(M=0;M<Te;M++)en[M]=0;for(M=J;M<=N;M++){const We=d[M];if(Pe>=Te){Z(We,x,S,!0);continue}let tt;if(We.key!=null)tt=fe.get(We.key);else for(ue=oe;ue<=H;ue++)if(en[ue-oe]===0&&sn(We,h[ue])){tt=ue;break}tt===void 0?Z(We,x,S,!0):(en[tt-oe]=M+1,tt>=et?et=tt:Qe=!0,B(We,h[tt],b,null,x,S,z,O,E),Pe++)}const rs=Qe?fa(en):$t;for(ue=rs.length-1,M=Te-1;M>=0;M--){const We=oe+M,tt=h[We],ls=h[We+1],as=We+1<j?ls.el||lr(ls):C;en[M]===0?B(null,tt,b,as,x,S,z,O,E):Qe&&(ue<0||M!==rs[ue]?p(tt,b,as,2):ue--)}}},p=(d,h,b,C,x=null)=>{const{el:S,type:z,transition:O,children:E,shapeFlag:M}=d;if(M&6){p(d.component.subTree,h,b,C);return}if(M&128){d.suspense.move(h,b,C);return}if(M&64){z.move(d,h,b,V);return}if(z===X){i(S,h,b);for(let N=0;N<E.length;N++)p(E[N],h,b,C);i(d.anchor,h,b);return}if(z===zn){R(d,h,b);return}if(C!==2&&M&1&&O)if(C===0)O.persisted&&!S[di]?i(S,h,b):(O.beforeEnter(S),i(S,h,b),_e(()=>O.enter(S),x));else{const{leave:N,delayLeave:H,afterLeave:J}=O,oe=()=>{d.ctx.isUnmounted?s(S):i(S,h,b)},fe=()=>{const ue=S._isLeaving||!!S[di];S._isLeaving&&S[di](!0),O.persisted&&!ue?oe():N(S,()=>{oe(),J&&J()})};H?H(S,oe,fe):fe()}else i(S,h,b)},Z=(d,h,b,C=!1,x=!1)=>{const{type:S,props:z,ref:O,children:E,dynamicChildren:M,shapeFlag:j,patchFlag:N,dirs:H,cacheIndex:J,memo:oe}=d;if(N===-2&&(x=!1),O!=null&&(xt(),mn(O,null,b,d,!0),wt()),J!=null&&(h.renderCache[J]=void 0),j&256){h.ctx.deactivate(d);return}const fe=j&1&&H,ue=!gn(d);let Pe;if(ue&&(Pe=z&&z.onVnodeBeforeUnmount)&&nt(Pe,h,d),j&6)Me(d.component,b,C);else{if(j&128){d.suspense.unmount(b,C);return}fe&&Ot(d,null,h,"beforeUnmount"),j&64?d.type.remove(d,h,b,V,C):M&&!M.hasOnce&&(S!==X||N>0&&N&64)?Re(M,h,b,!1,!0):(S===X&&N&384||!x&&j&16)&&Re(E,h,b),C&&ze(d)}const Te=oe!=null&&J==null;(ue&&(Pe=z&&z.onVnodeUnmounted)||fe||Te)&&_e(()=>{Pe&&nt(Pe,h,d),fe&&Ot(d,null,h,"unmounted"),Te&&(d.el=null)},b)},ze=d=>{const{type:h,el:b,anchor:C,transition:x}=d;if(h===X){Ve(b,C);return}if(h===zn){v(d);return}const S=()=>{s(b),x&&!x.persisted&&x.afterLeave&&x.afterLeave()};if(d.shapeFlag&1&&x&&!x.persisted){const{leave:z,delayLeave:O}=x,E=()=>z(b,S);O?O(d.el,S,E):E()}else S()},Ve=(d,h)=>{let b;for(;d!==h;)b=P(d),s(d),d=b;s(h)},Me=(d,h,b)=>{const{bum:C,scope:x,job:S,subTree:z,um:O,m:E,a:M}=d;Ms(E),Ms(M),C&&Fn(C),x.stop(),S&&(S.flags|=8,Z(z,d,h,b)),O&&_e(O,h),_e(()=>{d.isUnmounted=!0},h)},Re=(d,h,b,C=!1,x=!1,S=0)=>{for(let z=S;z<d.length;z++)Z(d[z],h,b,C,x)},kt=d=>{if(d.shapeFlag&6)return kt(d.component.subTree);if(d.shapeFlag&128)return d.suspense.next();const h=P(d.anchor||d.el),b=h&&h[Al];return b?P(b):h};let Vt=!1;const D=(d,h,b)=>{let C;d==null?h._vnode&&(Z(h._vnode,null,null,!0),C=h._vnode.component):B(h._vnode||null,d,h,null,null,null,b),h._vnode=d,Vt||(Vt=!0,ms(C),Lo(),Vt=!1)},V={p:B,um:Z,m:p,r:ze,mt:Mt,mc:K,pc:ne,pbc:ge,n:kt,o:e};return{render:D,hydrate:void 0,createApp:Yl(D)}}function pi({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function Ft({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function da(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function or(e,t,n=!1){const i=e.children,s=t.children;if(q(i)&&q(s))for(let o=0;o<i.length;o++){const l=i[o];let u=s[o];u.shapeFlag&1&&!u.dynamicChildren&&((u.patchFlag<=0||u.patchFlag===32)&&(u=s[o]=pt(s[o]),u.el=l.el),!n&&u.patchFlag!==-2&&or(l,u)),u.type===ni&&(u.patchFlag===-1&&(u=s[o]=pt(u)),u.el=l.el),u.type===Bt&&!u.el&&(u.el=l.el)}}function fa(e){const t=e.slice(),n=[0];let i,s,o,l,u;const c=e.length;for(i=0;i<c;i++){const m=e[i];if(m!==0){if(s=n[n.length-1],e[s]<m){t[i]=s,n.push(i);continue}for(o=0,l=n.length-1;o<l;)u=o+l>>1,e[n[u]]<m?o=u+1:l=u;m<e[n[o]]&&(o>0&&(t[i]=n[o-1]),n[o]=i)}}for(o=n.length,l=n[o-1];o-- >0;)n[o]=l,l=t[l];return n}function rr(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:rr(t)}function Ms(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function lr(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?lr(t.subTree):null}const ar=e=>e.__isSuspense;function pa(e,t){t&&t.pendingBranch?q(e)?t.effects.push(...e):t.effects.push(e):Pl(e)}const X=Symbol.for("v-fgt"),ni=Symbol.for("v-txt"),Bt=Symbol.for("v-cmt"),zn=Symbol.for("v-stc"),Nt=[];let Ge=null;function I(e=!1){Nt.push(Ge=e?null:[])}function ur(){Nt.pop(),Ge=Nt[Nt.length-1]||null}let Pn=1;function ks(e,t=!1){Pn+=e,e<0&&Ge&&t&&(Ge.hasOnce=!0)}function cr(e){return e.dynamicChildren=Pn>0?Ge||$t:null,ur(),Pn>0&&Ge&&Ge.push(e),e}function L(e,t,n,i,s,o){return cr(r(e,t,n,i,s,o,!0))}function Ai(e,t,n,i,s){return cr($e(e,t,n,i,s,!0))}function dr(e){return e?e.__v_isVNode===!0:!1}function sn(e,t){return e.type===t.type&&e.key===t.key}const fr=({key:e})=>e??null,Dn=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?xe(e)||Ee(e)||Q(e)?{i:He,r:e,k:t,f:!!n}:e:null);function r(e,t=null,n=null,i=0,s=null,o=e===X?0:1,l=!1,u=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&fr(t),ref:t&&Dn(t),scopeId:No,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:He};return u?(Gn(c,n),o&128&&e.normalize(c)):n&&(c.shapeFlag|=xe(n)?8:16),Pn>0&&!l&&Ge&&(c.patchFlag>0||o&6)&&c.patchFlag!==32&&Ge.push(c),c}const $e=ha;function ha(e,t=null,n=null,i=0,s=null,o=!1){if((!e||e===Vl)&&(e=Bt),dr(e)){const u=Yt(e,t,!0);return n&&Gn(u,n),Pn>0&&!o&&Ge&&(u.shapeFlag&6?Ge[Ge.indexOf(e)]=u:Ge.push(u)),u.patchFlag=-2,u}if(Ma(e)&&(e=e.__vccOpts),t){t=ma(t);let{class:u,style:c}=t;u&&!xe(u)&&(t.class=ke(u)),ce(c)&&(Ji(c)&&!q(c)&&(c=Fe({},c)),t.style=ht(c))}const l=xe(e)?1:ar(e)?128:Bl(e)?64:ce(e)?4:Q(e)?2:0;return r(e,t,n,i,s,l,o,!0)}function ma(e){return e?Ji(e)||Qo(e)?Fe({},e):e:null}function Yt(e,t,n=!1,i=!1){const{props:s,ref:o,patchFlag:l,children:u,transition:c}=e,m=t?ga(s||{},t):s,f={__v_isVNode:!0,__v_skip:!0,type:e.type,props:m,key:m&&fr(m),ref:t&&t.ref?n&&o?q(o)?o.concat(Dn(t)):[o,Dn(t)]:Dn(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:u,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==X?l===-1?16:l|16:l,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Yt(e.ssContent),ssFallback:e.ssFallback&&Yt(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&i&&Qi(f,c.clone(f)),f}function W(e=" ",t=0){return $e(ni,null,e,t)}function pr(e,t){const n=$e(zn,null,e);return n.staticCount=t,n}function ye(e="",t=!1){return t?(I(),Ai(Bt,null,e)):$e(Bt,null,e)}function ot(e){return e==null||typeof e=="boolean"?$e(Bt):q(e)?$e(X,null,e.slice()):dr(e)?pt(e):$e(ni,null,String(e))}function pt(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Yt(e)}function Gn(e,t){let n=0;const{shapeFlag:i}=e;if(t==null)t=null;else if(q(t))n=16;else if(typeof t=="object")if(i&65){const s=t.default;s&&(s._c&&(s._d=!1),Gn(e,s()),s._c&&(s._d=!0));return}else{n=32;const s=t._;!s&&!Qo(t)?t._ctx=He:s===3&&He&&(He.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else if(Q(t)){if(i&65){Gn(e,{default:t});return}t={default:t,_ctx:He},n=32}else t=String(t),i&64?(n=16,t=[W(t)]):n=8;e.children=t,e.shapeFlag|=n}function ga(...e){const t={};for(let n=0;n<e.length;n++){const i=e[n];for(const s in i)if(s==="class")t.class!==i.class&&(t.class=ke([t.class,i.class]));else if(s==="style")t.style=ht([t.style,i.style]);else if(jn(s)){const o=t[s],l=i[s];l&&o!==l&&!(q(o)&&o.includes(l))?t[s]=o?[].concat(o,l):l:l==null&&o==null&&!Kn(s)&&(t[s]=l)}else s!==""&&(t[s]=i[s])}return t}function nt(e,t,n,i=null){Ze(e,t,7,[n,i])}const ba=qo();let va=0;function ya(e,t,n){const i=e.type,s=(t?t.appContext:e.appContext)||ba,o={uid:va++,vnode:e,type:i,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new qr(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:tr(i,s),emitsOptions:Yo(i,s),emit:null,emitted:null,propsDefaults:pe,inheritAttrs:i.inheritAttrs,ctx:pe,data:pe,props:pe,attrs:pe,slots:pe,refs:pe,setupState:pe,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=t?t.root:o,o.emit=Xl.bind(null,o),e.ce&&e.ce(o),o}let Ue=null;const xa=()=>Ue||He;let $n,Bi;{const e=Jn(),t=(n,i)=>{let s;return(s=e[n])||(s=e[n]=[]),s.push(i),o=>{s.length>1?s.forEach(l=>l(o)):s[0](o)}};$n=t("__VUE_INSTANCE_SETTERS__",n=>Ue=n),Bi=t("__VUE_SSR_SETTERS__",n=>Cn=n)}const Tn=e=>{const t=Ue;return $n(e),e.scope.on(),()=>{e.scope.off(),$n(t)}},Rs=()=>{Ue&&Ue.scope.off(),$n(null)};function hr(e){return e.vnode.shapeFlag&4}let Cn=!1;function wa(e,t=!1,n=!1){t&&Bi(t);const{props:i,children:s}=e.vnode,o=hr(e);ia(e,i,o,t),la(e,s,n||t);const l=o?Sa(e,t):void 0;return t&&Bi(!1),l}function Sa(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Wl);const{setup:i}=n;if(i){xt();const s=e.setupContext=i.length>1?Ca(e):null,o=Tn(e),l=Rn(i,e,0,[e.props,s]),u=co(l);if(wt(),o(),(u||e.sp)&&!gn(e)&&Wo(e),u){if(l.then(Rs,Rs),t)return l.then(c=>{Ts(e,c)}).catch(c=>{Zn(c,e,0)});e.asyncDep=l}else Ts(e,l)}else mr(e)}function Ts(e,t,n){Q(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:ce(t)&&(e.setupState=Io(t)),mr(e)}function mr(e,t,n){const i=e.type;e.render||(e.render=i.render||lt);{const s=Tn(e);xt();try{Gl(e)}finally{wt(),s()}}}const Pa={get(e,t){return Oe(e,"get",""),e[t]}};function Ca(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,Pa),slots:e.slots,emit:e.emit,expose:t}}function ii(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(Io(hl(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in bn)return bn[n](e)},has(t,n){return n in t||n in bn}})):e.proxy}function Ma(e){return Q(e)&&"__vccOpts"in e}const qe=(e,t)=>vl(e,t,Cn),ka="3.5.40";/**
* @vue/runtime-dom v3.5.40
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ei;const As=typeof window<"u"&&window.trustedTypes;if(As)try{Ei=As.createPolicy("vue",{createHTML:e=>e})}catch{}const gr=Ei?e=>Ei.createHTML(e):e=>e,Ra="http://www.w3.org/2000/svg",Ta="http://www.w3.org/1998/Math/MathML",ft=typeof document<"u"?document:null,Bs=ft&&ft.createElement("template"),Aa={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,i)=>{const s=t==="svg"?ft.createElementNS(Ra,e):t==="mathml"?ft.createElementNS(Ta,e):n?ft.createElement(e,{is:n}):ft.createElement(e);return e==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:e=>ft.createTextNode(e),createComment:e=>ft.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>ft.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,i,s,o){const l=n?n.previousSibling:t.lastChild;if(s&&(s===o||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),n),!(s===o||!(s=s.nextSibling)););else{Bs.innerHTML=gr(i==="svg"?`<svg>${e}</svg>`:i==="mathml"?`<math>${e}</math>`:e);const u=Bs.content;if(i==="svg"||i==="mathml"){const c=u.firstChild;for(;c.firstChild;)u.appendChild(c.firstChild);u.removeChild(c)}t.insertBefore(u,n)}return[l?l.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Ba=Symbol("_vtc");function Ea(e,t,n){const i=e[Ba];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const Hn=Symbol("_vod"),br=Symbol("_vsh"),Oa={name:"show",beforeMount(e,{value:t},{transition:n}){e[Hn]=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):on(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:i}){!t!=!n&&(i?t?(i.beforeEnter(e),on(e,!0),i.enter(e)):i.leave(e,()=>{on(e,!1)}):on(e,t))},beforeUnmount(e,{value:t}){on(e,t)}};function on(e,t){e.style.display=t?e[Hn]:"none",e[br]=!t}const Fa=Symbol(""),Ia=/(?:^|;)\s*display\s*:/;function za(e,t,n){const i=e.style,s=xe(n);let o=!1;if(n&&!s){if(t)if(xe(t))for(const l of t.split(";")){const u=l.slice(0,l.indexOf(":")).trim();n[u]==null&&un(i,u,"")}else for(const l in t)n[l]==null&&un(i,l,"");for(const l in n){l==="display"&&(o=!0);const u=n[l];u!=null?La(e,l,!xe(t)&&t?t[l]:void 0,u)||un(i,l,u):un(i,l,"")}}else if(s){if(t!==n){const l=i[Fa];l&&(n+=";"+l),i.cssText=n,o=Ia.test(n)}}else t&&e.removeAttribute("style");Hn in e&&(e[Hn]=o?i.display:"",e[br]&&(i.display="none"))}const Es=/\s*!important$/;function un(e,t,n){if(q(n))n.forEach(i=>un(e,t,i));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const i=Da(e,t);Es.test(n)?e.setProperty(Et(i),n.replace(Es,""),"important"):e[i]=n}}const Os=["Webkit","Moz","ms"],hi={};function Da(e,t){const n=hi[t];if(n)return n;let i=Ye(t);if(i!=="filter"&&i in e)return hi[t]=i;i=ho(i);for(let s=0;s<Os.length;s++){const o=Os[s]+i;if(o in e)return hi[t]=o}return t}function La(e,t,n,i){return e.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&xe(i)&&n===i}const Fs="http://www.w3.org/1999/xlink";function Is(e,t,n,i,s,o=jr(t)){i&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(Fs,t.slice(6,t.length)):e.setAttributeNS(Fs,t,n):n==null||o&&!go(n)?e.removeAttribute(t):e.setAttribute(t,o?"":at(n)?String(n):n)}function zs(e,t,n,i,s){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?gr(n):n);return}const o=e.tagName;if(t==="value"&&o!=="PROGRESS"&&!o.includes("-")){const u=o==="OPTION"?e.getAttribute("value")||"":e.value,c=n==null?e.type==="checkbox"?"on":"":String(n);(u!==c||!("_value"in e))&&(e.value=c),n==null&&e.removeAttribute(t),e._value=n;return}let l=!1;if(n===""||n==null){const u=typeof e[t];u==="boolean"?n=go(n):n==null&&u==="string"?(n="",l=!0):u==="number"&&(n=0,l=!0)}try{e[t]=n}catch{}l&&e.removeAttribute(s||t)}function At(e,t,n,i){e.addEventListener(t,n,i)}function Ua(e,t,n,i){e.removeEventListener(t,n,i)}const Ds=Symbol("_vei");function Na(e,t,n,i,s=null){const o=e[Ds]||(e[Ds]={}),l=o[t];if(i&&l)l.value=i;else{const[u,c]=Wa(t);if(i){const m=o[t]=Ha(i,s);At(e,u,m,c)}else l&&(Ua(e,u,l,c),o[t]=void 0)}}const _a=/(Once|Passive|Capture)$/,Va=/^on:?(?:Once|Passive|Capture)$/;function Wa(e){let t,n;for(;(n=e.match(_a))&&!Va.test(e);)t||(t={}),e=e.slice(0,e.length-n[1].length),t[n[1].toLowerCase()]=!0;return[e[2]===":"?e.slice(3):Et(e.slice(2)),t]}let mi=0;const Ga=Promise.resolve(),$a=()=>mi||(Ga.then(()=>mi=0),mi=Date.now());function Ha(e,t){const n=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=n.attached)return;const s=n.value;if(q(s)){const o=i.stopImmediatePropagation;i.stopImmediatePropagation=()=>{o.call(i),i._stopped=!0};const l=s.slice(),u=[i];for(let c=0;c<l.length&&!i._stopped;c++){const m=l[c];m&&Ze(m,t,5,u)}}else Ze(s,t,5,[i])};return n.value=e,n.attached=$a(),n}const Ls=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,ja=(e,t,n,i,s,o)=>{const l=s==="svg";t==="class"?Ea(e,i,l):t==="style"?za(e,n,i):jn(t)?Kn(t)||Na(e,t,n,i,o):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Ka(e,t,i,l))?(zs(e,t,i),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Is(e,t,i,l,o,t!=="value")):e._isVueCE&&(qa(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!xe(i)))?zs(e,Ye(t),i,o,t):(t==="true-value"?e._trueValue=i:t==="false-value"&&(e._falseValue=i),Is(e,t,i,l))};function Ka(e,t,n,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in e&&Ls(t)&&Q(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=e.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Ls(t)&&xe(n)?!1:t in e}function qa(e,t){const n=e._def.props;if(!n)return!1;const i=Ye(t);return Array.isArray(n)?n.some(s=>Ye(s)===i):Object.keys(n).some(s=>Ye(s)===i)}const Jt=e=>{const t=e.props["onUpdate:modelValue"]||!1;return q(t)?n=>Fn(t,n):t};function Ya(e){e.target.composing=!0}function Us(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const yt=Symbol("_assign");function Ns(e,t,n){return t&&(e=e.trim()),n&&(e=Yn(e)),e}const te={created(e,{modifiers:{lazy:t,trim:n,number:i}},s){e[yt]=Jt(s);const o=i||s.props&&s.props.type==="number";At(e,t?"change":"input",l=>{l.target.composing||e[yt](Ns(e.value,n,o))}),(n||o)&&At(e,"change",()=>{e.value=Ns(e.value,n,o)}),t||(At(e,"compositionstart",Ya),At(e,"compositionend",Us),At(e,"change",Us))},mounted(e,{value:t}){e.value=t??""},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:i,trim:s,number:o}},l){if(e[yt]=Jt(l),e.composing)return;const u=(o||e.type==="number")&&!/^0\d/.test(e.value)?Yn(e.value):e.value,c=t??"";if(u===c)return;const m=e.getRootNode();(m instanceof Document||m instanceof ShadowRoot)&&m.activeElement===e&&e.type!=="range"&&(i&&t===n||s&&e.value.trim()===c)||(e.value=c)}},Rt={deep:!0,created(e,t,n){e[yt]=Jt(n),At(e,"change",()=>{const i=e._modelValue,s=Mn(e),o=e.checked,l=e[yt];if(q(i)){const u=Gi(i,s),c=u!==-1;if(o&&!c)l(i.concat(s));else if(!o&&c){const m=[...i];m.splice(u,1),l(m)}}else if(Xt(i)){const u=new Set(i);o?u.add(s):u.delete(s),l(u)}else l(vr(e,o))})},mounted:_s,beforeUpdate(e,t,n){e[yt]=Jt(n),_s(e,t,n)}};function _s(e,{value:t,oldValue:n},i){e._modelValue=t;let s;if(q(t))s=Gi(t,i.props.value)>-1;else if(Xt(t))s=t.has(i.props.value);else{if(t===n)return;s=Zt(t,vr(e,!0))}e.checked!==s&&(e.checked=s)}const Ne={deep:!0,created(e,{value:t,modifiers:{number:n}},i){e._modelValue=t,At(e,"change",()=>{const s=Array.prototype.filter.call(e.options,o=>o.selected).map(o=>n?Yn(Mn(o)):Mn(o));e[yt](e.multiple?Xt(e._modelValue)?new Set(s):s:s[0]),e._assigning=!0,Xi(()=>{e._assigning=!1})}),e[yt]=Jt(i)},mounted(e,{value:t}){Vs(e,t)},beforeUpdate(e,{value:t},n){e._modelValue=t,e[yt]=Jt(n)},updated(e,{value:t}){e._assigning||Vs(e,t)}};function Vs(e,t){const n=e.multiple,i=q(t);if(!(n&&!i&&!Xt(t))){for(let s=0,o=e.options.length;s<o;s++){const l=e.options[s],u=Mn(l);if(n)if(i){const c=typeof u;c==="string"||c==="number"?l.selected=t.some(m=>String(m)===String(u)):l.selected=Gi(t,u)>-1}else l.selected=t.has(u);else if(Zt(Mn(l),t)){e.selectedIndex!==s&&(e.selectedIndex=s);return}}!n&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function Mn(e){return"_value"in e?e._value:e.value}function vr(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const Ja=["ctrl","shift","alt","meta"],Xa={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>Ja.some(n=>e[`${n}Key`]&&!t.includes(n))},ns=(e,t)=>{if(!e)return e;const n=e._withMods||(e._withMods={}),i=t.join(".");return n[i]||(n[i]=((s,...o)=>{for(let l=0;l<t.length;l++){const u=Xa[t[l]];if(u&&u(s,t))return}return e(s,...o)}))},Za={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Qa=(e,t)=>{const n=e._withKeys||(e._withKeys={}),i=t.join(".");return n[i]||(n[i]=(s=>{if(!("key"in s))return;const o=Et(s.key);if(t.some(l=>l===o||Za[l]===o))return e(s)}))},eu=Fe({patchProp:ja},Aa);let Ws;function tu(){return Ws||(Ws=ua(eu))}const nu=((...e)=>{const t=tu().createApp(...e),{mount:n}=t;return t.mount=i=>{const s=su(i);if(!s)return;const o=t._component;!Q(o)&&!o.render&&!o.template&&(o.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const l=n(s,!1,iu(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),l},t});function iu(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function su(e){return xe(e)?document.querySelector(e):e}const yr=`// Particle Life + Boids — combined compute simulation.
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

// TODO 1a, the cheap half. Thread k simulates agent \`indices[k]\` — the
// cell-sorted order — instead of agent k. Adjacent threads then handle
// spatially adjacent agents, so a workgroup's ~225-read neighbour scans hit
// the same few cells and come out of cache instead of DRAM. Same math, same
// per-agent neighbour order, so the simulation is unchanged; only the mapping
// of threads to agents moves.
override SORTED_DISPATCH: bool = true;

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
fn runSim(@builtin(global_invocation_id) gid: vec3u) {
    let agentCount = u32(P.agentsCount);
    if (gid.x >= agentCount) { return; }
    var id = gid.x;
    if (SORTED_DISPATCH) { id = indices[gid.x]; }

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

    // TODO 1b. Scan however many cells the largest *active* radius needs,
    // wrapping at the world edges. The engine fits \`cellSize\` to the radii in
    // use, so this is normally 3x3 over smaller cells — but deriving the scan
    // radius here, from the same values the loop bodies test against, means a
    // slider pushed past the current cell size widens the scan instead of
    // silently missing neighbours. Cells divide the world exactly (see
    // #targetCellsPerRow in engine.js), so ceil(R / cellSize) is a sound bound.
    var maxR = max(P.collisionRadius, P.coreRadius);
    if (WANT_BOIDS) { maxR = max(maxR, P.boidVisionRadius); }
    if (WANT_PLIFE) { maxR = max(maxR, P.speciesInteractionRadius); }
    var scanR = max(i32(ceil(maxR / P.cellSize)), 1);
    // Never wider than the grid itself, or wrapped cells get scanned twice and
    // their forces double-counted.
    scanR = min(scanR, max((cpr - 1) / 2, 1));
    for (var dx = -scanR; dx <= scanR; dx++) {
        for (var dy = -scanR; dy <= scanR; dy++) {
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

    // \`id + id / WG\` is exactly the old \`id + workgroup_id.x\` (the workgroup of
    // thread id, when threads mapped 1:1 to agents). Keeping the formula in
    // agent terms means the seed — and so every existing preset — is untouched
    // by SORTED_DISPATCH remapping which thread runs which agent.
    accel += randomDir(id + id / WG, P.movementRandomness);
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
`,ou=`// Rendering for the particle-life/boids sim.
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
`,_t=800,rn=500,Gs=64,ru=.002,lu=4,au=[5120,15360,25600,51200,102400,204800,409600,819200,1638400],uu=[1,2,3,4,5,6,7,8,9,10,12,14,16,20,24,32],cu=[10,20,30,40,60,80,120,160],$s=[["Linear","Even ramp to full strength at contact. The canonical particle-life core."],["Smooth","Quadratic — barely there at the surface, so cluster edges stay soft."],["Hard","Constant inside the radius. A step at the boundary; maximally rigid."],["Stiff","Inverse-distance, capped. Nearly incompressible at contact, ignorable further out."]],Hs=[["Disc","Solid antialiased circle — stays crisp down to sub-pixel sizes."],["Soft","Gaussian falloff. Neighbouring agents merge into continuous mass."],["Ring","Hollow. Shows structure through dense clumps that solid discs hide."],["Square","Crisp and cheap to read at very small sizes."],["Diamond","The square rotated — reads as a distinct mark next to discs."],["Triangle","Directionless but angular; good with Motion Stretch."],["Plus","Thin cross. Sparse-looking even where agents are dense."],["Varied","A different shape per species, so species read as different kinds of thing."]],js=[["Heatmap","The original blue→cyan→green→yellow→red ramp. High contrast, not perceptually uniform."],["Viridis","Perceptually uniform — equal steps in species look like equal steps in brightness."],["Ember","Black through deep red and orange to white hot."],["Ice","Midnight blue through cyan to white."],["Cyclic","Full hue wheel. The honest choice for continuous species, where 0 and N−1 are neighbours."],["Mono","Greyscale. Lets glow and density carry the image instead of hue."],["Plasma","Indigo through magenta and orange to yellow. Bright throughout."],["Aurora","Deep teal through green to pale pink."],["Sunset","Night violet through coral to gold."],["Forest","Bark and moss through leaf green to sand."],["Neon","Near-black to magenta to cyan to white. Very high contrast."],["Pastel","Low saturation across the wheel — soft, and good on light backgrounds."],["Copper","Near-black through rust and copper to a bright highlight."],["Spectrum","Full rainbow without wrapping, so the ends stay distinguishable."]],cn=[["Void",{r:.04,g:.045,b:.06,a:1}],["Black",{r:0,g:0,b:0,a:1}],["Midnight",{r:.02,g:.03,b:.08,a:1}],["Slate",{r:.1,g:.11,b:.13,a:1}],["Warm",{r:.07,g:.05,b:.045,a:1}],["Deep Space",{r:.015,g:.015,b:.035,a:1}],["Navy",{r:.03,g:.06,b:.12,a:1}],["Ink",{r:.05,g:.07,b:.07,a:1}],["Plum",{r:.08,g:.04,b:.1,a:1}],["Moss",{r:.04,g:.07,b:.05,a:1}],["Charcoal",{r:.16,g:.16,b:.17,a:1}],["Paper",{r:.9,g:.89,b:.86,a:1}],["Cream",{r:.96,g:.94,b:.88,a:1}],["Sepia",{r:.85,g:.79,b:.68,a:1}]].map(([e,t])=>({name:e,rgb:t,light:.2126*t.r+.7152*t.g+.0722*t.b>.5})),Ks=[["Off","No field — agents only."],["Density","Shade the smoothed agent density directly. Continuous mass instead of dots."],["Metaball","Threshold the field into a surface, lit by its own gradient. The fluid look."]],qs=[["Species","Hue by species. Continuous, so agents between basis species blend."],["Blob","Hue by connected-component id, hashed so adjacent blobs differ."],["Velocity","Direction as hue, speed as brightness — the optical-flow reading."],["Neighbours","Coordination number — draws the skin of a body rather than its bulk."]],du=["Random","Random Symmetric","Ring","Ring Symmetric","Spiral","Spiral Symmetric","Bands","Bands Symmetric"];function xr(){return{dt:.25,mixT:.5,boidVisionRadius:350,speciesInteractionRadius:250,alignmentForce:1,cohesionForce:1,separationForce:1,movementRandomness:.01,brownian:!1,movementScaling:1,forceSofteningMul:3,centerAttraction:0,damping:.98,minSpeed:0,maxSpeed:500,maxForce:1e3,drawRadius:2,collisionModifier:2,coreEnabled:!1,coreRadiusFrac:.02,coreStrength:.2,coreFalloff:1,coreSizeSpread:.05,mediumEnabled:!1,mediumForce:8,mediumDiffuse:.5,mediumDisplace:.25,mediumCapacityMul:2,blobsEnabled:!1,blobInterval:15,blobRounds:24,blobSmoothing:2,blobMinDensity:2,mutateEnabled:!1,mutateRate:.05,mutateBias:0,mutateInterval:30,splitEnabled:!1,splitInterval:90,splitChance:.35,splitMinBlobMul:8,splitImpulse:120,splitMutation:.25,showGrid:!1,showMedium:!0,showAgents:!0,fieldMode:0,fieldSmoothing:2,fieldThresholdMul:2.5,fieldStrength:1,renderMode:0,particleShape:0,speciesPalette:0,background:0,glowStrength:0,glowSize:3,velocityStretch:0,outline:0,drawScale:1,drawJitter:0,trailStrength:0,driftEnabled:!1,driftCols:40,driftSize:26,driftSpeed:.004,driftBrightness:.5,autoRandom:!1,autoRandomSeconds:20,cameraX:0,cameraY:0,zoom:.1}}function wr(){return{startingMethod:4,agentCount:25600,speciesCount:10,worldSizeMult:20,interactionRange:2,startRadiusMul:16,lockMatrix:!1,speciesSpread:0,seed:1}}const fu=[0,.15,.3,.5,1,2],Sr=e=>e.speciesInteractionRadius*e.forceSofteningMul,Oi=e=>e.drawRadius+e.collisionModifier,Fi=e=>e.speciesInteractionRadius*e.coreRadiusFrac,Pr=(e,t)=>1-t*(1-e),pu=[["dt","Speed (dt)",0,.5,.01,"sim"],["movementScaling","Movement Scaling",.1,4,.1,"sim"],["drawRadius","Draw Size",1,5,.1,"sim"],["collisionModifier","Collide Modifier",0,5,.5,"sim"],["damping","Damping",.7,1,.01,"sim"],["minSpeed","Min Speed",0,5,.1,"sim"],["maxSpeed","Max Speed",2,1e3,1,"sim"],["movementRandomness","Randomness",0,.25,.01,"sim"],["centerAttraction","Center Pull",0,.1,.01,"sim"],["boidVisionRadius","Vision Radius",10,500,5,"boids"],["alignmentForce","Alignment",0,2,.1,"boids"],["cohesionForce","Cohesion",0,2,.1,"boids"],["separationForce","Separation",0,3,.1,"boids"],["speciesInteractionRadius","Sense Radius",10,500,5,"plife"],["forceSofteningMul","Force Soften Mult",0,10,.1,"plife"],["maxForce","Max Force",0,2e3,1,"plife"],["coreStrength","Core Repulsion",0,20,.1,"core"],["coreRadiusFrac","Core Radius",0,1,.01,"core"],["coreSizeSpread","Size Spread",0,1,.05,"core"],["mediumForce","Medium Force",0,40,.5,"medium"],["mediumDiffuse","Diffusion",0,1,.05,"medium"],["mediumDisplace","Displacement",0,1,.05,"medium"],["mediumCapacityMul","Displace Threshold",.25,8,.25,"medium"]];function hu(e){let t=e>>>0;return function(){t=t+1831565813|0;let i=Math.imul(t^t>>>15,1|t);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}}function mu(e,t){let n=e>>>0^Math.imul(t>>>0,2654435769);return n^=n>>>16,n=Math.imul(n,2146121005),n^=n>>>15,n=Math.imul(n,2221713035),n^=n>>>16,n>>>0}const bt={positions:1,matrix:2,philicity:3,sizeSeeds:4,randomConfig:5},vt=(e,t)=>hu(mu(e,t));function gi(){return Math.random()*4294967296>>>0}const Ln=Math.PI*2,si=e=>(t,n)=>t+e()*(n-t);function Cr(e,t,n=Math.random){const i=si(n),s=new Float32Array(e*e);for(let o=0;o<s.length;o++)s[o]=i(-t,t);return s}function Mr(e,t,n=Math.random){const i=si(n),s=new Float32Array(e*e);for(let o=0;o<e;o++)for(let l=o;l<e;l++){const u=i(-t,t);s[o*e+l]=u,s[l*e+o]=u}return s}function kr(e,t=Math.random){const n=si(t),i=new Float32Array(e);for(let s=0;s<e;s++)i[s]=n(-1,1);return i}function Rr(e,t=Math.random){const n=new Float32Array(e);for(let i=0;i<e;i++)n[i]=t();return n}function bi(e,t,n,i){const s=_t*e.startRadiusMul*.5;return[i(-s,s),i(-s,s)]}function Ys(e,t){const n=_t*e.startRadiusMul*.25,i=Ln/e.agentCount*t;return[Math.cos(i)*n,Math.sin(i)*n]}function Js(e,t,n,i){const s=_t/e.speciesCount*e.startRadiusMul,o=s*e.speciesCount*.5,l=i(n*s,(n+1)*s)-o,u=i(0,_t)-_t*.5;return[l,u]}function Xs(e,t){const n=_t*e.startRadiusMul*.5,i=4,s=3,o=.015,l=t()*Ln;return(u,c,m,f)=>{const g=Ln/i*(c%i);let w=c/e.agentCount*n,A=s*(w/n)*Ln+g+l;return A+=f(-o,o),w+=f(-o*n,o*n),[Math.cos(A)*w,Math.sin(A)*w]}}function gu(e,t,n){switch(e){case 0:return[bi,!1];case 1:return[bi,!0];case 2:return[Ys,!1];case 3:return[Ys,!0];case 4:return[Xs(t,n),!1];case 5:return[Xs(t,n),!0];case 6:return[Js,!1];case 7:return[Js,!0];default:return[bi,!1]}}function bu(e,t={}){const n=e.seed>>>0,i=vt(n,bt.positions),s=si(i),[o,l]=gu(e.startingMethod,e,i),u=new Float32Array(e.agentCount*4),c=new Float32Array(e.agentCount),m=e.speciesSpread??0,f=e.speciesCount-1;for(let F=0;F<e.agentCount;F++){const R=F%e.speciesCount,[v,T]=o(e,F,R,s);u[F*4+0]=v,u[F*4+1]=T,u[F*4+2]=0,u[F*4+3]=0,c[F]=m?Math.min(f,Math.max(0,R+s(-m,m))):R}const g=e.speciesCount,P=e.lockMatrix&&t.matrix&&t.matrix.length===g*g,w=vt(n,bt.matrix),A=P?t.matrix:l?Mr(g,e.interactionRange,w):Cr(g,e.interactionRange,w),B=F=>P&&F&&F.length===g,y=B(t.philicity)?t.philicity:kr(g,vt(n,bt.philicity)),Y=B(t.sizeSeeds)?t.sizeSeeds:Rr(g,vt(n,bt.sizeSeeds));return{particles:u,species:c,matrix:A,philicity:y,sizeSeeds:Y}}const ln=256;function vu(e){const t=e.match(/struct Params \{([\s\S]*?)\n\};/);if(!t)throw new Error("could not find struct Params in compute.wgsl");const n=t[1].match(/^\s*\w+\s*:\s*f32\s*,/gm);if(!n)throw new Error("no f32 fields found in struct Params");return Math.ceil(n.length/4)*4}const Zs=vu(yr),Qs=16,eo=8,On=4,yu=3,dt="rgba16float",xu=4;let wu=yr,Su=ou;const to=new Set;var ee,Tr,Ar,zi,Di,Li,Br,Er,Or,Fr,Ir,Ui,Ni,dn;const os=class os{constructor(t,n,i,s){cs(this,ee);this.device=t,this.context=n,this.format=i,this.canvas=s,this.cellSize=rn,this.worldSize=0,this.cellsPerRow=0,this.numCells=0,this.maxCollisions=Gs,this.agentCount=0,this.speciesCount=0,this.matrix=null,this.philicity=null,this.sizeSeeds=null,this.coreSizes=null,this.lastSizeSpread=-1,this.currentBuf=0,this.frameIndex=0,this.mediumFlip=0,this.forceRunSimHalf=null,this.sortedDispatch=!0,this.cellFit=!0,this.cellDivisor=1,this.cellSizeOverride=null,this.paramData=new Float32Array(Zs),this.paramBuffer=t.createBuffer({label:"params",size:Zs*4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.buffers={},this.bindGroups=[],be(this,ee,Tr).call(this),to.add(this)}static async create(t){if(!navigator.gpu)throw new Error("WebGPU is not available in this browser. Try Chrome/Edge 113+, or Safari 26+.");const n=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!n)throw new Error("No suitable GPU adapter found.");const i=await n.requestDevice(),s=t.getContext("webgpu"),o=navigator.gpu.getPreferredCanvasFormat();s.configure({device:i,format:o,alphaMode:"opaque"});const l=new os(i,s,o,t);return l.buildPipelines(),l}buildPipelines(){const t=this.device,n=t.createShaderModule({label:"compute.wgsl",code:wu}),i=t.createShaderModule({label:"render.wgsl",code:Su});this.pendingCompilation=Promise.all([no(n,"compute.wgsl"),no(i,"render.wgsl")]);const s=t.createPipelineLayout({bindGroupLayouts:[this.computeBGL]}),o=(w,A)=>t.createComputePipeline({label:A?`${w}:${JSON.stringify(A)}`:w,layout:s,compute:{module:n,entryPoint:w,constants:A}});this.pipelines={countCells:o("countCells"),prefixSum:o("prefixSum"),scatter:o("scatter"),diffuseMedium:o("diffuseMedium"),densitySplat:o("densitySplat"),densityNormalize:o("densityNormalize"),densityBlur10:o("densityBlur",{DENS_1_TO_0:1}),densityBlur01:o("densityBlur",{DENS_1_TO_0:0}),resolveCollide:o("resolveCollide"),blobDensityInit:o("blobDensityInit"),blobBlurAB:o("blobBlur",{BLUR_A_TO_B:1}),blobBlurBA:o("blobBlur",{BLUR_A_TO_B:0}),blobSeed:o("blobSeed"),blobPropagate:o("blobPropagate"),resolveBlobs:o("resolveBlobs"),mutateSpecies:o("mutateSpecies"),blobStatsReset:o("blobStatsReset"),blobStatsAccum:o("blobStatsAccum"),splitBlobs:o("splitBlobs")},this.runSimPipelines={};for(const w of[0,1])for(const[A,B,y]of[["both",1,1],["boids",1,0],["plife",0,1]])for(const Y of[0,1])this.runSimPipelines[`${w}:${A}:${Y}`]=o("runSim",{CONTINUOUS_SPECIES:w,WANT_BOIDS:B,WANT_PLIFE:y,SORTED_DISPATCH:Y});const l={color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},u=t.createPipelineLayout({bindGroupLayouts:[this.renderBGL]}),c={color:{srcFactor:"one",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one",operation:"add"}},m={color:{srcFactor:"one",dstFactor:"one",operation:"reverse-subtract"},alpha:{srcFactor:"zero",dstFactor:"one",operation:"add"}},f=[{arrayStride:Qs,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32x2"},{shaderLocation:1,offset:8,format:"float32x2"}]},{arrayStride:4,stepMode:"instance",attributes:[{shaderLocation:2,offset:0,format:"float32"}]},{arrayStride:4,stepMode:"instance",attributes:[{shaderLocation:3,offset:0,format:"uint32"}]},{arrayStride:4,stepMode:"instance",attributes:[{shaderLocation:4,offset:0,format:"uint32"}]}],g=(w,A,B,y=this.format)=>t.createRenderPipeline({label:w,layout:u,vertex:{module:i,entryPoint:"vsParticle",constants:{GLOW_PASS:A?1:0},buffers:f},fragment:{module:i,entryPoint:"fsParticle",constants:{GLOW_PASS:A?1:0},targets:[{format:y,blend:A?B:l}]},primitive:{topology:"triangle-strip"}});this.particlePipeline=g("particles",!1),this.glowPipeline=g("particles:glow",!0,c),this.glowPipelineDark=g("particles:glow-dark",!0,m);const P=(w,A,B=this.format)=>t.createRenderPipeline({label:w,layout:u,vertex:{module:i,entryPoint:"vsFullscreen"},fragment:{module:i,entryPoint:A,targets:[{format:B,blend:l}]},primitive:{topology:"triangle-list"}});this.gridPipeline=P("grid","fsGrid"),this.mediumPipeline=P("medium","fsMedium"),this.fieldPipeline=P("field","fsField"),this.fadePipeline=t.createRenderPipeline({label:"trail-fade",layout:u,vertex:{module:i,entryPoint:"vsFullscreen"},fragment:{module:i,entryPoint:"fsFade",targets:[{format:dt,blend:l}]},primitive:{topology:"triangle-list"}}),this.blitPipeline=t.createRenderPipeline({label:"trail-blit",layout:t.createPipelineLayout({bindGroupLayouts:[this.renderBGL,this.blitBGL]}),vertex:{module:i,entryPoint:"vsFullscreen"},fragment:{module:i,entryPoint:"fsBlit",targets:[{format:this.format}]},primitive:{topology:"triangle-list"}}),this.accumPipelines={particles:g("particles:accum",!1,null,dt),glow:g("glow:accum",!0,c,dt),glowDark:g("glow-dark:accum",!0,m,dt),grid:P("grid:accum","fsGrid",dt),medium:P("medium:accum","fsMedium",dt),field:P("field:accum","fsField",dt),drift:t.createRenderPipeline({label:"drift:accum",layout:u,vertex:{module:i,entryPoint:"vsDrift"},fragment:{module:i,entryPoint:"fsDrift",targets:[{format:dt,blend:l}]},primitive:{topology:"triangle-strip"}})},this.driftPipeline=t.createRenderPipeline({label:"drift",layout:u,vertex:{module:i,entryPoint:"vsDrift"},fragment:{module:i,entryPoint:"fsDrift",targets:[{format:this.format,blend:l}]},primitive:{topology:"triangle-strip"}})}maxSupportedAgents(){const t=Math.min(this.device.limits.maxStorageBufferBindingSize,this.device.limits.maxBufferSize),n=Math.floor(t/4/5),i=this.device.limits.maxComputeWorkgroupsPerDimension*ln;return Math.min(n,i)}restart(t){const n=this.device,i=this.maxSupportedAgents();if(t.agentCount>i)throw new Error(`${t.agentCount.toLocaleString()} agents exceeds this device's limit of ${i.toLocaleString()}.`);const{particles:s,species:o,matrix:l,philicity:u,sizeSeeds:c}=bu(t,{matrix:this.matrix,philicity:this.philicity,sizeSeeds:this.sizeSeeds});this.destroyBuffers(),this.agentCount=t.agentCount,this.speciesCount=t.speciesCount,this.matrix=l,this.philicity=u,this.currentBuf=0,this.mediumFlip=0,this.continuousSpecies=(t.speciesSpread??0)>0,this.worldSize=_t*t.worldSizeMult,this.cellsPerRow=Math.max(1,Math.floor(this.worldSize/rn)),this.cellSize=this.worldSize/this.cellsPerRow,this.numCells=this.cellsPerRow*this.cellsPerRow,this.maxCollisions=be(this,ee,Ar).call(this,this.agentCount);const m=(A,B,y,Y)=>{const F=n.createBuffer({label:A,size:Math.max(B,4),usage:y});return Y&&n.queue.writeBuffer(F,0,Y),F},f=GPUBufferUsage.STORAGE,g=GPUBufferUsage.VERTEX,P=GPUBufferUsage.COPY_DST,w=GPUBufferUsage.COPY_SRC;this.buffers={particleA:m("particleA",s.byteLength,f|g|P|w,s),particleB:m("particleB",s.byteLength,f|g|P|w,s),species:m("species",o.byteLength,f|g|P|w,o),matrix:m("matrix",(this.speciesCount+2)*this.speciesCount*4,f|P),grid:m("grid",be(this,ee,zi).call(this),f|P|w),indices:m("indices",this.agentCount*xu*4,f|g|P|w),collisions:m("collisions",this.agentCount*(1+this.maxCollisions)*4,f|P)},this.uploadMatrix(l,u,c),be(this,ee,Di).call(this),be(this,ee,Li).call(this)}uploadMatrix(t,n=this.philicity,i=this.sizeSeeds){this.matrix=t,this.philicity=n,this.sizeSeeds=i,this.coreSizes=new Float32Array(i.length),this.lastSizeSpread=-1;const s=this.device.queue;s.writeBuffer(this.buffers.matrix,0,t),s.writeBuffer(this.buffers.matrix,t.byteLength,n)}destroyBuffers(){var t;for(const n of Object.values(this.buffers))(t=n.destroy)==null||t.call(n);this.buffers={},this.bindGroups=[]}frame(t){if(!this.agentCount)return;const n=be(this,ee,Br).call(this,t);n!==this.cellsPerRow&&be(this,ee,Er).call(this,n);const i=this.canvas;be(this,ee,Or).call(this,t.coreSizeSpread),be(this,ee,Fr).call(this,t,i.width,i.height);const s=this.device,o=s.createCommandEncoder(),l=t.dt>0,u=!!t.mediumEnabled;if(l){if(o.clearBuffer(this.buffers.grid,0,this.numCells*4),o.clearBuffer(this.buffers.collisions,0,this.agentCount*4),t.fieldMode>0){const F=this.numCells*On**2*4;o.clearBuffer(this.buffers.grid,this.numCells*eo*4,F)}const B=Math.ceil(this.agentCount/ln),y=o.beginComputePass();y.setBindGroup(0,this.bindGroups[this.currentBuf]),y.setPipeline(this.pipelines.countCells),y.dispatchWorkgroups(B),y.setPipeline(this.pipelines.prefixSum),y.dispatchWorkgroups(1),y.setPipeline(this.pipelines.scatter),y.dispatchWorkgroups(B),u&&(y.setPipeline(this.pipelines.diffuseMedium),y.dispatchWorkgroups(Math.ceil(this.numCells/ln)));const Y=this.forceRunSimHalf??(t.mixT>=1?"plife":t.mixT<=0?"boids":"both");if(y.setPipeline(this.runSimPipelines[`${this.continuousSpecies?1:0}:${Y}:${this.sortedDispatch?1:0}`]),y.dispatchWorkgroups(B),y.setPipeline(this.pipelines.resolveCollide),y.dispatchWorkgroups(B),t.blobsEnabled){const F=Math.ceil(this.numCells/ln);if(this.frameIndex%Math.max(1,t.blobInterval)===0){y.setPipeline(this.pipelines.blobDensityInit),y.dispatchWorkgroups(F);for(let v=0;v<t.blobSmoothing;v++)y.setPipeline(this.pipelines.blobBlurAB),y.dispatchWorkgroups(F),y.setPipeline(this.pipelines.blobBlurBA),y.dispatchWorkgroups(F);y.setPipeline(this.pipelines.blobSeed),y.dispatchWorkgroups(F),y.setPipeline(this.pipelines.blobPropagate);const R=Math.min(this.cellsPerRow,t.blobRounds);for(let v=0;v<R;v++)y.dispatchWorkgroups(F)}y.setPipeline(this.pipelines.resolveBlobs),y.dispatchWorkgroups(B),t.mutateEnabled&&this.frameIndex%Math.max(1,t.mutateInterval)===0&&(y.setPipeline(this.pipelines.mutateSpecies),y.dispatchWorkgroups(B),this.continuousSpecies=!0),t.splitEnabled&&this.frameIndex%Math.max(1,t.splitInterval)===0&&(y.setPipeline(this.pipelines.blobStatsReset),y.dispatchWorkgroups(F),y.setPipeline(this.pipelines.blobStatsAccum),y.dispatchWorkgroups(B),y.setPipeline(this.pipelines.splitBlobs),y.dispatchWorkgroups(B),t.splitMutation>0&&(this.continuousSpecies=!0))}if(t.fieldMode>0){const F=this.numCells*On**2,R=Math.ceil(F/ln);y.setPipeline(this.pipelines.densitySplat),y.dispatchWorkgroups(B),y.setPipeline(this.pipelines.densityNormalize),y.dispatchWorkgroups(R);for(let v=0;v<t.fieldSmoothing;v++)y.setPipeline(this.pipelines.densityBlur10),y.dispatchWorkgroups(R),y.setPipeline(this.pipelines.densityBlur01),y.dispatchWorkgroups(R)}y.end(),this.currentBuf=1-this.currentBuf}const c=cn[t.background]??cn[0],m=this.context.getCurrentTexture().createView(),f=t.trailStrength>0;f?be(this,ee,Ir).call(this):be(this,ee,Ni).call(this);const g=f?this.accumView:m,P=f&&this.accumNeedsClear,w=f?this.accumPipelines:this,A=o.beginRenderPass({colorAttachments:[{view:g,clearValue:c.rgb,loadOp:f&&!P?"load":"clear",storeOp:"store"}]});if(A.setBindGroup(0,this.renderBindGroup),f&&!P&&(A.setPipeline(this.fadePipeline),A.draw(3)),this.accumNeedsClear=!1,t.driftEnabled){const B=Math.max(1,Math.round(t.driftCols));A.setPipeline(f?w.drift:this.driftPipeline),A.draw(4,B*B)}if(t.showMedium&&u&&(A.setPipeline(f?w.medium:this.mediumPipeline),A.draw(3)),t.fieldMode>0&&(A.setPipeline(f?w.field:this.fieldPipeline),A.draw(3)),t.showGrid&&(A.setPipeline(f?w.grid:this.gridPipeline),A.draw(3)),!t.showAgents){A.end(),f&&be(this,ee,Ui).call(this,o,m,c),s.queue.submit([o.finish()]),this.frameIndex++,l&&u&&(this.mediumFlip=1-this.mediumFlip);return}if(A.setVertexBuffer(0,this.particleBuffers[this.currentBuf]),A.setVertexBuffer(1,this.buffers.species),A.setVertexBuffer(2,this.buffers.indices,this.agentCount*2*4),A.setVertexBuffer(3,this.buffers.indices,this.agentCount*3*4),t.glowStrength>0){const B=c.light;A.setPipeline(f?B?w.glowDark:w.glow:B?this.glowPipelineDark:this.glowPipeline),A.draw(4,this.agentCount)}A.setPipeline(f?w.particles:this.particlePipeline),A.draw(4,this.agentCount),A.end(),f&&be(this,ee,Ui).call(this,o,m,c),s.queue.submit([o.finish()]),this.frameIndex++,l&&u&&(this.mediumFlip=1-this.mediumFlip)}fitZoom(t=0){if(!this.worldSize)return .1;const n=Math.max(1,this.canvas.width-t);return Math.min(n,this.canvas.height)*.92/this.worldSize}get avgPerCell(){return this.numCells?this.agentCount/this.numCells:0}async readSpecies(t=8){return be(this,ee,dn).call(this,this.buffers.species,Math.min(t,this.agentCount)*4)}async readAgentBlobs(t=this.agentCount){const n=Math.min(t,this.agentCount),i=await be(this,ee,dn).call(this,this.buffers.indices,n*4,this.agentCount*2*4);return new Uint32Array(i.buffer)}async readCellBlobs(){const t=this.numCells,n=await be(this,ee,dn).call(this,this.buffers.grid,t*4,0),i=await be(this,ee,dn).call(this,this.buffers.grid,t*4,5*t*4);return{counts:new Uint32Array(n.buffer),labels:new Uint32Array(i.buffer)}}async readParticles(t=8){const i=Math.min(t,this.agentCount)*Qs,s=this.device.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),o=this.device.createCommandEncoder();o.copyBufferToBuffer(this.particleBuffers[this.currentBuf],0,s,0,i),this.device.queue.submit([o.finish()]),await s.mapAsync(GPUMapMode.READ);const l=new Float32Array(s.getMappedRange().slice(0));return s.unmap(),s.destroy(),l}destroy(){var t,n,i,s;to.delete(this),be(this,ee,Ni).call(this),this.destroyBuffers(),(n=(t=this.paramBuffer).destroy)==null||n.call(t),(s=(i=this.device).destroy)==null||s.call(i)}};ee=new WeakSet,Tr=function(){const t=this.device,n=i=>({buffer:{type:i}});this.computeBGL=t.createBindGroupLayout({label:"compute",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,...n("read-only-storage")},{binding:2,visibility:GPUShaderStage.COMPUTE,...n("storage")},{binding:3,visibility:GPUShaderStage.COMPUTE,...n("storage")},{binding:4,visibility:GPUShaderStage.COMPUTE,...n("read-only-storage")},{binding:5,visibility:GPUShaderStage.COMPUTE,...n("storage")},{binding:6,visibility:GPUShaderStage.COMPUTE,...n("storage")},{binding:7,visibility:GPUShaderStage.COMPUTE,...n("storage")}]}),this.blitBGL=t.createBindGroupLayout({label:"blit",entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"unfilterable-float"}}]}),this.renderBGL=t.createBindGroupLayout({label:"render",entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}}]})},Ar=function(t){const n=Math.min(this.device.limits.maxStorageBufferBindingSize,this.device.limits.maxBufferSize),i=Math.floor(n/4/t)-1,s=i>0?2**Math.floor(Math.log2(i)):0;return Math.max(4,Math.min(Gs,s))},zi=function(){return(this.numCells*(eo+yu)+2*this.numCells*On**2)*4},Di=function(){const t=new Float32Array(this.numCells).fill(1);this.device.queue.writeBuffer(this.buffers.grid,this.numCells*3*4,t),this.device.queue.writeBuffer(this.buffers.grid,this.numCells*4*4,t)},Li=function(){const t=this.device,n=this.buffers;this.renderBindGroup=t.createBindGroup({layout:this.renderBGL,entries:[{binding:0,resource:{buffer:this.paramBuffer}},{binding:1,resource:{buffer:n.grid}}]});const i=(s,o)=>t.createBindGroup({layout:this.computeBGL,entries:[{binding:0,resource:{buffer:this.paramBuffer}},{binding:1,resource:{buffer:s}},{binding:2,resource:{buffer:o}},{binding:3,resource:{buffer:n.species}},{binding:4,resource:{buffer:n.matrix}},{binding:5,resource:{buffer:n.grid}},{binding:6,resource:{buffer:n.indices}},{binding:7,resource:{buffer:n.collisions}}]});this.bindGroups=[i(n.particleA,n.particleB),i(n.particleB,n.particleA)],this.particleBuffers=[n.particleA,n.particleB]},Br=function(t){let n=this.cellSizeOverride;if(!n)if(!this.cellFit)n=rn;else{const i=this.forceRunSimHalf??(t.mixT>=1?"plife":t.mixT<=0?"boids":"both");let s=Oi(t);t.coreEnabled&&(s=Math.max(s,Fi(t))),i!=="plife"&&(s=Math.max(s,t.boidVisionRadius)),i!=="boids"&&(s=Math.max(s,t.speciesInteractionRadius)),n=Math.min(rn,Math.max(s/this.cellDivisor,this.worldSize/256,40))}return Math.min(256,Math.max(1,Math.floor(this.worldSize/n)))},Er=function(t){var n,i;this.cellsPerRow=t,this.cellSize=this.worldSize/t,this.numCells=t*t,(i=(n=this.buffers.grid).destroy)==null||i.call(n),this.buffers.grid=this.device.createBuffer({label:"grid",size:Math.max(be(this,ee,zi).call(this),4),usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC}),be(this,ee,Di).call(this),be(this,ee,Li).call(this)},Or=function(t){if(t===this.lastSizeSpread)return;this.lastSizeSpread=t;const n=this.coreSizes;for(let i=0;i<n.length;i++)n[i]=Pr(this.sizeSeeds[i],t);this.device.queue.writeBuffer(this.buffers.matrix,(this.speciesCount+1)*this.speciesCount*4,n)},Fr=function(t,n,i){const s=this.paramData;s[0]=t.dt,s[1]=t.mixT,s[2]=this.agentCount,s[3]=this.speciesCount,s[4]=t.boidVisionRadius,s[5]=t.speciesInteractionRadius,s[6]=t.alignmentForce,s[7]=t.cohesionForce,s[8]=t.separationForce,s[9]=t.movementRandomness,s[10]=t.movementScaling,s[11]=Sr(t),s[12]=t.centerAttraction,s[13]=t.damping,s[14]=t.minSpeed,s[15]=t.maxSpeed,s[16]=t.maxForce,s[17]=Oi(t),s[18]=this.maxCollisions,s[19]=this.cellSize,s[20]=this.cellsPerRow,s[21]=this.numCells,s[22]=t.drawRadius,s[23]=this.worldSize,s[24]=t.cameraX,s[25]=t.cameraY,s[26]=t.zoom,s[27]=n,s[28]=i,s[29]=this.frameIndex,s[30]=t.mediumEnabled?t.mediumForce:0,s[31]=t.mediumDiffuse,s[32]=t.mediumDisplace,s[33]=Math.max(1,t.mediumCapacityMul*this.avgPerCell),s[34]=this.mediumFlip,s[35]=t.showMedium&&t.mediumEnabled?1:0;const o=t.coreEnabled&&t.coreStrength>0;s[36]=o?Fi(t):0,s[37]=t.coreStrength,s[38]=t.coreFalloff,s[39]=t.renderMode===1&&!t.blobsEnabled?0:t.renderMode,s[40]=Math.max(1,Math.round(t.blobMinDensity*this.avgPerCell)),s[41]=t.mutateRate,s[42]=t.mutateBias,s[43]=t.mutateInterval,s[44]=Math.max(1,Math.round(t.driftCols)),s[45]=t.driftSize,s[46]=t.driftSpeed,s[47]=t.driftBrightness,s[48]=t.particleShape,s[49]=t.speciesPalette,s[50]=t.glowStrength,s[51]=t.glowSize,s[52]=t.velocityStretch,s[53]=t.drawScale,s[54]=t.drawJitter,s[55]=1-Math.min(.995,Math.max(0,t.trailStrength));const l=cn[t.background]??cn[0];s[56]=l.rgb.r,s[57]=l.rgb.g,s[58]=l.rgb.b,s[59]=t.fieldMode,s[60]=Math.max(1e-4,t.fieldThresholdMul*this.avgPerCell/On**2),s[61]=t.fieldStrength,s[62]=t.splitInterval,s[63]=t.splitChance,s[64]=Math.max(2,Math.round(t.splitMinBlobMul*this.avgPerCell)),s[65]=t.splitImpulse,s[66]=t.splitMutation,s[67]=Math.max(1,this.agentCount/this.worldSize**2*(3*rn)**2),s[68]=t.outline,s[69]=t.brownian?1:0,this.device.queue.writeBuffer(this.paramBuffer,0,s)},Ir=function(){var i,s;const{width:t,height:n}=this.canvas;this.accum&&this.accumW===t&&this.accumH===n||((s=(i=this.accum)==null?void 0:i.destroy)==null||s.call(i),this.accum=this.device.createTexture({label:"trail-accum",size:{width:t,height:n},format:dt,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),this.accumW=t,this.accumH=n,this.accumView=this.accum.createView(),this.blitBindGroup=this.device.createBindGroup({layout:this.blitBGL,entries:[{binding:0,resource:this.accumView}]}),this.accumNeedsClear=!0)},Ui=function(t,n,i){const s=t.beginRenderPass({colorAttachments:[{view:n,clearValue:i.rgb,loadOp:"clear",storeOp:"store"}]});s.setPipeline(this.blitPipeline),s.setBindGroup(0,this.renderBindGroup),s.setBindGroup(1,this.blitBindGroup),s.draw(3),s.end()},Ni=function(){var t,n;this.accum&&((n=(t=this.accum).destroy)==null||n.call(t),this.accum=null,this.accumView=null,this.blitBindGroup=null)},dn=async function(t,n,i=0){const s=this.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),o=this.device.createCommandEncoder();o.copyBufferToBuffer(t,i,s,0,n),this.device.queue.submit([o.finish()]),await s.mapAsync(GPUMapMode.READ);const l=new Float32Array(s.getMappedRange().slice(0));return s.unmap(),s.destroy(),l};let Ii=os;async function no(e,t){const n=await e.getCompilationInfo();for(const i of n.messages){const s=`${t}:${i.lineNum}:${i.linePos}`;i.type==="error"?console.error(`[WGSL] ${s} ${i.message}`):i.type==="warning"&&console.warn(`[WGSL] ${s} ${i.message}`)}}const Qt=(e,t)=>{const n=e.__vccOpts||e;for(const[i,s]of t)n[i]=s;return n},Pu={__name:"SimCanvas",props:{params:{type:Object,required:!0}},emits:["ready","error","fps","zoom","pan"],setup(e,{emit:t}){const n=e,i=t,s=me(null);let o=null,l=0,u=null,c=0,m=performance.now();function f(){const v=s.value;if(!v)return;const T=Math.min(window.devicePixelRatio||1,2),U=Math.max(1,Math.floor(v.clientWidth*T)),_=Math.max(1,Math.floor(v.clientHeight*T));(v.width!==U||v.height!==_)&&(v.width=U,v.height=_)}function g(){l=requestAnimationFrame(g),f(),o.frame(n.params),c++;const v=performance.now();v-m>=500&&(i("fps",Math.round(c*1e3/(v-m))),c=0,m=v)}let P=!1,w=0,A=0;function B(v){v.preventDefault();const T=s.value,U=T.getBoundingClientRect(),_=Math.min(window.devicePixelRatio||1,2),K=(v.clientX-U.left)*_-T.width*.5,ie=(v.clientY-U.top)*_-T.height*.5;i("zoom",v.deltaY<0?1.08:1/1.08,K,ie)}function y(v){P=!0,w=v.clientX,A=v.clientY,s.value.setPointerCapture(v.pointerId)}function Y(v){if(!P)return;const T=Math.min(window.devicePixelRatio||1,2);i("pan",(v.clientX-w)*T,(v.clientY-A)*T),w=v.clientX,A=v.clientY}function F(v){var T,U;P=!1,(U=(T=s.value)==null?void 0:T.releasePointerCapture)==null||U.call(T,v.pointerId)}let R=!1;return ei(async()=>{var v,T;f();try{o=await Ii.create(s.value)}catch(U){i("error",U.message??String(U));return}if(R){o.destroy(),o=null;return}(T=(v=o.device).addEventListener)==null||T.call(v,"uncapturederror",U=>{var _;console.error("[WebGPU]",((_=U.error)==null?void 0:_.message)??U.error)}),i("ready",o),l=requestAnimationFrame(g),u=new ResizeObserver(f),u.observe(s.value)}),Sn(()=>{R=!0,cancelAnimationFrame(l),u==null||u.disconnect(),o==null||o.destroy()}),(v,T)=>(I(),L("canvas",{ref_key:"canvas",ref:s,class:"sim",onWheel:B,onPointerdown:y,onPointermove:Y,onPointerup:F,onPointercancel:F,onContextmenu:T[0]||(T[0]=ns(()=>{},["prevent"]))},null,544))}},Cu=Qt(Pu,[["__scopeId","data-v-78e2e7d6"]]),Mu=["title","onPointerdown","onWheel"],ku={class:"strip-label"},Ru=["title","onPointerdown","onPointermove","onPointerup","onPointercancel","onWheel"],Tu={key:0,class:"edit-hint"},Au={key:0,class:"live"},Bu={key:1},Eu=3,Ou=1,Fu={__name:"InteractionMatrix",props:{matrix:{type:Object,default:null},philicity:{type:Object,default:null},coreSizes:{type:Object,default:null},speciesCount:{type:Number,required:!0},editable:{type:Boolean,default:!1}},emits:["edit"],setup(e,{emit:t}){const n=e,i=t,s=R=>R==="philicity"?Ou:Eu,o=(R,v)=>Math.min(v,Math.max(-v,R)),l=me(null);let u=null;function c(R,v,T,U,_){n.editable&&(R.preventDefault(),u={kind:v,i:T,j:U,startY:R.clientY,start:_,moved:!1},l.value={kind:v,i:T,j:U,value:_},R.currentTarget.setPointerCapture(R.pointerId))}function m(R){if(!u)return;const v=u.startY-R.clientY;Math.abs(v)>2&&(u.moved=!0);const T=s(u.kind);P(u.kind,u.i,u.j,o(u.start+v*T/120,T))}function f(R){var v,T;u&&(u.moved||P(u.kind,u.i,u.j,0),(T=(v=R.currentTarget)==null?void 0:v.releasePointerCapture)==null||T.call(v,R.pointerId),u=null,l.value=null)}function g(R,v,T,U,_){if(!n.editable||!v)return;R.preventDefault();const K=s(v),ie=R.shiftKey?.01:.1;P(v,T,U,o(_-Math.sign(R.deltaY)*ie,K))}function P(R,v,T,U){const _=Math.round(U*100)/100;l.value&&(l.value={kind:R,i:v,j:T,value:_}),i("edit",{kind:R,i:v,j:T,value:_})}function w(R){const v=Math.min(1,Math.max(0,R)),T=(_,K,ie)=>_.map((ge,Ie)=>ge+(K[Ie]-ge)*ie);let U;return v<.25?U=T([0,0,1],[0,1,1],v/.25):v<.5?U=T([0,1,1],[0,1,0],(v-.25)/.25):v<.75?U=T([0,1,0],[1,1,0],(v-.5)/.25):U=T([1,1,0],[1,0,0],(v-.75)/.25),U.map(_=>Math.round(_*255))}const A=R=>{const[v,T,U]=w(R/Math.max(n.speciesCount-1,1));return`rgb(${v} ${T} ${U})`},B=qe(()=>n.speciesCount<=11),y=qe(()=>{const R=n.speciesCount;if(!n.matrix||n.matrix.length<R*R)return[];const v=Math.max(...Array.from(n.matrix,Math.abs),1e-4),T=[];for(let U=0;U<R;U++){const _=[];for(let K=0;K<R;K++){const ie=n.matrix[U*R+K],ge=Math.abs(ie)/v,Ie=ie>=0?"130 60%":"355 70%";_.push({v:ie,bg:`hsl(${Ie} ${18+ge*32}%)`,text:ie.toFixed(1)})}T.push(_)}return T});function Y(R,v,T){const U=n.speciesCount;if(!R||R.length<U)return null;const _=[];for(let K=0;K<U;K++){const ie=R[K],ge=Math.min(1,Math.abs(ie));_.push({v:ie,bg:`hsl(${v(ie)} ${16+ge*34}%)`,text:ie.toFixed(1),title:`species ${K+1}: ${ie.toFixed(2)} — ${T(ie)}`})}return _}const F=qe(()=>[{label:"Philicity",kind:"philicity",cells:Y(n.philicity,R=>R>=0?"190 55%":"32 65%",R=>R>=0?"philic":"phobic")},{label:"Core size",kind:null,cells:Y(n.coreSizes,()=>"272 50%",R=>R<.05?"no excluded volume":"excluded volume")}].filter(R=>R.cells));return(R,v)=>(I(),L(X,null,[r("div",{class:ke(["matrix",{compact:!B.value}]),style:ht({"--n":e.speciesCount})},[(I(!0),L(X,null,ve(y.value,(T,U)=>(I(),L(X,{key:U},[r("div",{class:"tag",style:ht({background:A(U)})},null,4),(I(!0),L(X,null,ve(T,(_,K)=>(I(),L("div",{key:K,class:ke(["cell",{editable:e.editable}]),style:ht({background:_.bg}),title:`${U+1} → ${K+1}: ${_.text}`,onPointerdown:ie=>c(ie,"matrix",U,K,_.v),onPointermove:m,onPointerup:f,onPointercancel:f,onWheel:ie=>g(ie,"matrix",U,K,_.v)},[B.value?(I(),L(X,{key:0},[W(k(_.text),1)],64)):ye("",!0)],46,Mu))),128))],64))),128))],6),(I(!0),L(X,null,ve(F.value,T=>(I(),L(X,{key:T.label},[r("div",ku,k(T.label),1),r("div",{class:ke(["matrix",{compact:!B.value}]),style:ht({"--n":e.speciesCount})},[v[0]||(v[0]=r("div",{class:"tag"},null,-1)),(I(!0),L(X,null,ve(T.cells,(U,_)=>(I(),L("div",{key:_,class:ke(["cell",{editable:e.editable&&T.kind}]),style:ht({background:U.bg}),title:U.title,onPointerdown:K=>T.kind&&c(K,T.kind,_,0,U.v),onPointermove:K=>T.kind&&m(K),onPointerup:K=>T.kind&&f(K),onPointercancel:K=>T.kind&&f(K),onWheel:K=>g(K,T.kind,_,0,U.v)},[B.value?(I(),L(X,{key:0},[W(k(U.text),1)],64)):ye("",!0)],46,Ru))),128))],6)],64))),128)),e.editable?(I(),L("div",Tu,[l.value?(I(),L("span",Au,[W(k(l.value.kind==="philicity"?`species ${l.value.i+1}`:`${l.value.i+1} → ${l.value.j+1}`)+" ",1),r("b",null,k(l.value.value.toFixed(2)),1)])):(I(),L("span",Bu,"Drag a cell up/down to change it · scroll to nudge · click to zero"))])):ye("",!0)],64))}},Iu=Qt(Fu,[["__scopeId","data-v-5c1268e9"]]),zu=1,is="plb.presets",zr=(e,t=4)=>Number(e.toFixed(t)),vi=(e,t=3)=>e?Array.from(e,n=>zr(n,t)):null;function Du({params:e,startup:t,matrix:n,philicity:i,sizeSeeds:s,name:o}){const l={version:zu,name:o||void 0,params:{},startup:{...t}};for(const[u,c]of Object.entries(e))l.params[u]=typeof c=="number"?zr(c):c;return n&&(l.matrix=vi(n)),i&&(l.philicity=vi(i)),s&&(l.sizeSeeds=vi(s)),l}function Lu(e,{params:t,startup:n}){if(!e||typeof e!="object")throw new Error("Config must be an object.");const i=(u,c,m)=>{let f=!1;if(!c||typeof c!="object")return f;for(const g of Object.keys(m)){if(!(g in c))continue;const P=c[g],w=typeof m[g]=="number";w&&(typeof P!="number"||!Number.isFinite(P))||!w&&typeof P!=typeof m[g]||(u[g]!==P&&(f=!0),u[g]=P)}return f};i(t,e.params,xr());const s=i(n,e.startup,wr()),o=n.speciesCount,l=(u,c)=>Array.isArray(u)&&u.length===c?Float32Array.from(u):null;return{needsRestart:s,matrix:l(e.matrix,o*o),philicity:l(e.philicity,o),sizeSeeds:l(e.sizeSeeds,o)}}let oi=Math.random;const ae=(e,t)=>e+oi()*(t-e),zt=e=>e[Math.floor(oi()*e.length)],Ae=e=>oi()<e,we=(e,t)=>Math.round(e/t)*t,Uu={sim:{mixT:[0,1,.05],dt:[.15,.35,.01],movementScaling:[.6,2,.1],damping:[.92,1,.01],minSpeed:[0,2,.1],maxSpeed:[200,800,1],movementRandomness:[0,.06,.01],centerAttraction:[0,.03,.01],collisionModifier:[0,3,.5]},boids:{boidVisionRadius:[150,450,5],alignmentForce:[0,2,.1],cohesionForce:[0,2,.1],separationForce:[0,3,.1]},plife:{speciesInteractionRadius:[120,400,5],forceSofteningMul:[1,6,.1],maxForce:[500,1500,1]}},io=[["startup","Startup"],["matrix","Interaction Matrix"],["sim","Simulation"],["boids","Boids"],["plife","Particle Life"],["core","Excluded Volume"],["medium","Medium"],["blobs","Blobs"],["view","View"]];function Nu(e={},t=Math.random){oi=t;const n={},i=o=>!e[o];for(const[o,l]of Object.entries(Uu))if(i(o))for(const[u,[c,m,f]]of Object.entries(l))n[u]=we(ae(c,m),f);i("core")&&(n.coreEnabled=Ae(.75),n.coreStrength=Ae(.8)?we(ae(.1,1.2),.1):we(ae(1.5,5),.1),n.coreRadiusFrac=we(ae(.02,.25),.01),n.coreSizeSpread=Ae(.5)?0:we(ae(.1,1),.05),n.coreFalloff=Math.floor(ae(0,4))),i("medium")&&(n.mediumEnabled=Ae(.4),n.mediumForce=we(ae(3,20),.5),n.mediumDiffuse=we(ae(.2,.8),.05),n.mediumDisplace=we(ae(.1,.5),.05),n.mediumCapacityMul=we(ae(1,4),.25)),i("blobs")&&(n.blobsEnabled=Ae(.3),n.blobMinDensity=we(ae(1,4),.1),n.blobSmoothing=Math.floor(ae(0,5)),n.mutateEnabled=n.blobsEnabled&&Ae(.5),n.mutateRate=we(ae(.02,.2),.01)),i("view")&&(n.renderMode=Ae(.7)?0:zt([1,2,3]),n.particleShape=Math.floor(ae(0,8)),n.speciesPalette=Math.floor(ae(0,14)),n.background=Ae(.85)?Math.floor(ae(0,11)):Math.floor(ae(11,14)),n.glowStrength=Ae(.5)?0:we(ae(.1,.8),.02),n.glowSize=we(ae(2,8),.5),n.velocityStretch=Ae(.6)?0:we(ae(1,30),.25),n.drawScale=we(ae(.6,3),.1),n.drawJitter=Ae(.5)?0:we(ae(.1,.8),.05),n.outline=Ae(.6)?0:we(ae(.2,.8),.05),n.trailStrength=Ae(.7)?0:we(ae(.5,.95),.01),n.fieldMode=Ae(.8)?0:zt([1,2]),n.fieldSmoothing=Math.floor(ae(1,5)),n.fieldThresholdMul=we(ae(1,5),.1),n.fieldStrength=we(ae(.6,1),.05),n.showAgents=n.fieldMode===2?Ae(.5):!0,n.driftEnabled=Ae(.1),n.driftBrightness=we(ae(.2,.7),.05),n.renderMode===1&&(i("blobs")?n.blobsEnabled=!0:n.renderMode=0));const s=i("startup")?{startingMethod:Math.floor(ae(0,8)),speciesCount:zt([3,4,5,6,7,8,9,10,12,16]),interactionRange:zt([1,2,3]),speciesSpread:Ae(.7)?0:zt([.15,.3,.5,1])}:{};return{params:n,startup:s,needsRestart:i("startup"),rerollMatrix:i("matrix")}}const _u=["amber","brisk","coral","dusky","eager","faint","glassy","hazy","ionic","jagged","keen","lucid","molten","noble","opal","placid","quiet","restless","silken","tidal","umbral","vivid","woven","zephyr"],Vu=["bloom","cascade","drift","ember","filament","gyre","halo","isthmus","lattice","mantle","nimbus","orbit","plume","quanta","ripple","stratum","tendril","vortex","wisp"];function so(e=[]){const t=new Set(e);for(let n=0;n<50;n++){const i=`${zt(_u)}-${zt(Vu)}`;if(!t.has(i))return i}return`preset-${Date.now().toString(36)}`}function ss(){try{const e=JSON.parse(localStorage.getItem(is)||"{}");return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}function Wu(e,t){const n=ss();return n[e]={...t,name:e},localStorage.setItem(is,JSON.stringify(n)),n}function Gu(e){const t=ss();return delete t[e],localStorage.setItem(is,JSON.stringify(t)),t}const $u={class:"header-actions"},Hu=["disabled"],ju=["disabled"],Ku=["title"],qu=["title"],Yu={class:"scroll"},Ju={class:"mix-label"},Xu={class:"actions"},Zu={class:"ico"},Qu=["title"],ec={class:"preset-row"},tc=["value"],nc=["disabled"],ic={class:"preset-row"},sc=["disabled"],oc={class:"check"},rc={key:0,class:"slider"},lc={class:"val"},ac={key:1,class:"notice"},uc=["title"],cc={class:"grid2"},dc=["value"],fc=["value"],pc=["value"],hc=["value"],mc=["value"],gc=["value"],bc={class:"preset-row seed-row"},vc={class:"seed-label"},yc=["value"],xc=["title"],wc={key:0,class:"hint"},Sc={key:1,class:"notice"},Pc={key:0},Cc=["title"],Mc={class:"matrix-actions"},kc={class:"check"},Rc=["title"],Tc={class:"name"},Ac={class:"val"},Bc=["onUpdate:modelValue","min","max","step"],Ec={class:"check"},Oc={class:"derived"},Fc=["title"],Ic={class:"name"},zc={class:"val"},Dc=["onUpdate:modelValue","min","max","step"],Lc=["title"],Uc={class:"name"},Nc={class:"val"},_c=["onUpdate:modelValue","min","max","step"],Vc={class:"derived"},Wc=["title"],Gc={class:"check"},$c=["checked"],Hc={class:"name"},jc={class:"val"},Kc=["onUpdate:modelValue","min","max","step"],qc={class:"falloff"},Yc=["value"],Jc={class:"derived"},Xc={class:"hint"},Zc=["title"],Qc={class:"check"},ed=["checked"],td={class:"name"},nd={class:"val"},id=["onUpdate:modelValue","min","max","step"],sd={class:"derived"},od={class:"check",style:{"margin-top":"8px"}},rd=["title"],ld={class:"check"},ad=["checked"],ud={class:"slider"},cd={class:"val"},dd={class:"slider"},fd={class:"val"},pd={class:"slider"},hd={class:"val"},md={class:"slider"},gd={class:"val"},bd={class:"check",style:{"margin-top":"10px"}},vd=["checked"],yd={class:"slider"},xd={class:"val"},wd={class:"slider"},Sd={class:"val"},Pd={class:"slider"},Cd={class:"val"},Md={class:"check",style:{"margin-top":"8px"}},kd={class:"slider"},Rd={class:"val"},Td={class:"slider"},Ad={class:"val"},Bd={class:"slider"},Ed={class:"val"},Od={class:"slider"},Fd={class:"val"},Id={class:"slider"},zd={class:"val"},Dd=["title"],Ld={class:"falloff"},Ud=["value"],Nd={class:"hint"},_d={class:"falloff"},Vd=["value"],Wd={class:"hint"},Gd={class:"slider"},$d={class:"val"},Hd={class:"slider"},jd={class:"val"},Kd={class:"slider"},qd={class:"val"},Yd={class:"check"},Jd={class:"falloff"},Xd=["value"],Zd={class:"hint"},Qd={class:"falloff"},ef=["value"],tf={class:"falloff"},nf=["value"],sf={class:"hint"},of={class:"slider"},rf={class:"val"},lf={class:"slider"},af={class:"val"},uf={class:"derived"},cf={class:"slider"},df={class:"val"},ff={key:1,class:"slider"},pf={class:"val"},hf={class:"slider"},mf={class:"val"},gf={class:"slider"},bf={class:"val"},vf={class:"slider"},yf={class:"val"},xf={class:"check",style:{"margin-top":"8px"}},wf=["checked"],Sf={class:"slider"},Pf={class:"val"},Cf={class:"slider"},Mf={class:"val"},kf={class:"slider"},Rf={class:"val"},Tf={class:"slider"},Af={class:"val"},Bf={class:"check"},oo="plb.uiScale",Ef=.8,Of=1.8,ro="plb.theme",lo="plb.locks",Ff={__name:"ControlPanel",props:{params:{type:Object,required:!0},startup:{type:Object,required:!0},matrix:{type:Object,default:null},philicity:{type:Object,default:null},coreSizes:{type:Object,default:null},speciesCount:{type:Number,required:!0},avgPerCell:{type:Number,default:0},notice:{type:String,default:""},paused:{type:Boolean,default:!1},appliedName:{type:String,default:""}},emits:["restart","toggle-pause","randomize-matrix","randomize-all","locks","edit-matrix","clear-matrix","reroll-seed","reset-camera","show-about","show-config","apply-config","capture-config","hide"],setup(e,{emit:t}){const n=e,i=t,s=G=>pu.filter(a=>a[5]===G),o=me(l(parseFloat(localStorage.getItem(oo))||1));function l(G){return Math.min(Of,Math.max(Ef,Math.round(G*10)/10))}function u(G){o.value=l(o.value+G),localStorage.setItem(oo,String(o.value))}let c=null;function m(){if(clearInterval(c),c=null,!n.params.autoRandom)return;const G=Math.max(1,n.params.autoRandomSeconds)*1e3;c=setInterval(()=>i("randomize-all",y.value),G)}Ut(()=>[n.params.autoRandom,n.params.autoRandomSeconds],m,{immediate:!0}),Sn(()=>clearInterval(c));const f=me(!1),g=()=>{f.value=!!document.fullscreenElement};function P(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{})}ei(()=>document.addEventListener("fullscreenchange",g)),Sn(()=>document.removeEventListener("fullscreenchange",g));const w=me(localStorage.getItem(ro)==="light"?"light":"dark");function A(){document.documentElement.dataset.theme=w.value}A();function B(){w.value=w.value==="light"?"dark":"light",localStorage.setItem(ro,w.value),A()}const y=me(Y());function Y(){try{const G=JSON.parse(localStorage.getItem(lo)||"{}"),a={};for(const[p]of io)a[p]=G[p]===!0;return a.seed=G.seed===!0,a}catch{const G={};for(const[a]of io)G[a]=!1;return G.seed=!1,G}}function F(G){y.value={...y.value,[G]:!y.value[G]},localStorage.setItem(lo,JSON.stringify(y.value))}const R=qe(()=>Object.values(y.value).filter(Boolean).length);Ut(y,G=>i("locks",G),{immediate:!0});const v=me(ss()),T=qe(()=>Object.keys(v.value).sort()),U=me(""),_=me(so(Object.keys(v.value))),K=me("");function ie(G){K.value=G,setTimeout(()=>{K.value===G&&(K.value="")},2600)}function ge(){const G=U.value;G&&(_.value=G,i("apply-config",v.value[G]),ie(`Applied "${G}".`))}function Ie(){const G=_.value.trim();if(!G)return;const a=G in v.value;i("capture-config",p=>{v.value=Wu(G,p),U.value=G,ie(a?`Overwrote "${G}".`:`Saved "${G}".`)},G)}function Ct(){const G=U.value;G&&(v.value=Gu(G),U.value="",_.value=so(Object.keys(v.value)),ie(`Deleted "${G}".`))}Ut(()=>n.appliedName,G=>{G&&G!==_.value&&(_.value=G)});const ut=qe(()=>Math.round(n.params.mixT*100)),Mt=[2,4,6,8,10,12,14,16,18,24,32,40,60,80,120,160],Ke=qe(()=>Math.round(n.avgPerCell*9)),Se=qe(()=>{const G=Ke.value;return G>2500?"heavy":G>900?"warn":"ok"}),de=qe(()=>Math.max(1,Math.round(n.params.mediumCapacityMul*n.avgPerCell)));function ne(G,a){const p=a>=1?0:a>=.1?1:2;return G.toFixed(p)}return(G,a)=>(I(),L("aside",{class:"panel",style:ht({"--ui-scale":o.value})},[r("header",null,[a[79]||(a[79]=r("strong",null,"Particle Life + Boids",-1)),r("div",$u,[r("button",{class:"icon",title:"Smaller panel and text",disabled:o.value<=.8,onClick:a[0]||(a[0]=p=>u(-.1))}," − ",8,Hu),r("button",{class:"icon",title:"Larger panel and text",disabled:o.value>=1.8,onClick:a[1]||(a[1]=p=>u(.1))}," ＋ ",8,ju),r("button",{class:"icon",title:f.value?"Leave fullscreen (F)":"Fullscreen (F)",onClick:P},k(f.value?"⤡":"⛶"),9,Ku),r("button",{class:"icon",title:w.value==="light"?"Switch to dark controls":"Switch to light controls",onClick:B},k(w.value==="light"?"☾":"☀"),9,qu),r("button",{class:"icon",title:"About & credits",onClick:a[2]||(a[2]=p=>i("show-about"))}," ⓘ "),r("button",{class:"icon",title:"Hide panel (H)",onClick:a[3]||(a[3]=p=>i("hide"))},"✕")])]),r("div",Yu,[r("section",null,[r("div",Ju,[r("span",null,k(100-ut.value)+"% Boids",1),r("span",null,k(ut.value)+"% Particle Life",1)]),$(r("input",{"onUpdate:modelValue":a[4]||(a[4]=p=>e.params.mixT=p),type:"range",min:"0",max:"1",step:"0.05"},null,512),[[te,e.params.mixT,void 0,{number:!0}]])]),r("section",Xu,[r("button",{class:"primary",onClick:a[5]||(a[5]=p=>i("toggle-pause"))},[r("span",Zu,k(e.paused?"▶":"❙❙"),1),W(k(e.paused?"Resume":"Pause"),1)]),r("button",{title:"Start a fresh run (R)",onClick:a[6]||(a[6]=p=>i("restart",y.value))},[...a[80]||(a[80]=[r("span",{class:"ico"},"↻",-1),W("Restart ",-1)])]),r("button",{title:"Recentre the camera (C)",onClick:a[7]||(a[7]=p=>i("reset-camera"))},[...a[81]||(a[81]=[r("span",{class:"ico"},"⌖",-1),W("Reset Cam ",-1)])]),r("button",{title:R.value?`Randomise (Space) — ${R.value} section(s) locked`:"Randomise everything (Space)",onClick:a[8]||(a[8]=p=>i("randomize-all",y.value))},[a[82]||(a[82]=r("span",{class:"ico"},"⚄",-1)),W("Random"+k(R.value?` ${R.value}🔒`:""),1)],8,Qu),r("button",{title:"View or paste the whole configuration",onClick:a[9]||(a[9]=p=>i("show-config",_.value))},[...a[83]||(a[83]=[r("span",{class:"ico"},"{ }",-1),W("JSON ",-1)])])]),r("section",null,[a[87]||(a[87]=r("h3",null,"Presets",-1)),r("div",ec,[$(r("select",{"onUpdate:modelValue":a[10]||(a[10]=p=>U.value=p),onChange:ge},[a[84]||(a[84]=r("option",{value:""},"— saved presets —",-1)),(I(!0),L(X,null,ve(T.value,p=>(I(),L("option",{key:p,value:p},k(p),9,tc))),128))],544),[[Ne,U.value]]),r("button",{class:"icon-btn",title:"Delete the selected preset",disabled:!U.value,onClick:Ct}," ✕ ",8,nc)]),r("div",ic,[$(r("input",{"onUpdate:modelValue":a[11]||(a[11]=p=>_.value=p),type:"text",spellcheck:"false",placeholder:"preset name",onKeyup:Qa(Ie,["enter"])},null,544),[[te,_.value]]),r("button",{disabled:!_.value.trim(),onClick:Ie},k(T.value.includes(_.value.trim())?"Overwrite":"Save"),9,sc)]),r("label",oc,[$(r("input",{"onUpdate:modelValue":a[12]||(a[12]=p=>e.params.autoRandom=p),type:"checkbox"},null,512),[[Rt,e.params.autoRandom]]),a[85]||(a[85]=r("span",null,"Auto-random",-1))]),e.params.autoRandom?(I(),L("label",rc,[a[86]||(a[86]=r("span",{class:"name"},"Every",-1)),r("span",lc,k(e.params.autoRandomSeconds)+"s",1),$(r("input",{"onUpdate:modelValue":a[13]||(a[13]=p=>e.params.autoRandomSeconds=p),type:"range",min:"2",max:"120",step:"1"},null,512),[[te,e.params.autoRandomSeconds,void 0,{number:!0}]])])):ye("",!0),K.value?(I(),L("p",ac,k(K.value),1)):ye("",!0),a[88]||(a[88]=r("p",{class:"hint"}," Saved to this browser. Selecting one applies it immediately, including its interaction matrix. Choosing a preset puts its name in the box, so Save becomes Overwrite. ",-1))]),r("section",null,[r("h3",null,[a[89]||(a[89]=r("span",null,"Startup",-1)),r("button",{class:ke(["lock",{on:y.value.startup}]),title:y.value.startup?"Locked — Random leaves this alone":"Lock from Random",onClick:a[14]||(a[14]=p=>F("startup"))},k(y.value.startup?"🔒":"🔓"),11,uc)]),r("div",cc,[r("label",null,[a[90]||(a[90]=r("span",null,"Pattern",-1)),$(r("select",{"onUpdate:modelValue":a[15]||(a[15]=p=>e.startup.startingMethod=p)},[(I(!0),L(X,null,ve(Ce(du),(p,Z)=>(I(),L("option",{key:Z,value:Z},k(p),9,dc))),128))],512),[[Ne,e.startup.startingMethod,void 0,{number:!0}]])]),r("label",null,[a[91]||(a[91]=r("span",null,"Agents",-1)),$(r("select",{"onUpdate:modelValue":a[16]||(a[16]=p=>e.startup.agentCount=p)},[(I(!0),L(X,null,ve(Ce(au),p=>(I(),L("option",{key:p,value:p},k(p.toLocaleString()),9,fc))),128))],512),[[Ne,e.startup.agentCount,void 0,{number:!0}]])]),r("label",null,[a[92]||(a[92]=r("span",null,"Species",-1)),$(r("select",{"onUpdate:modelValue":a[17]||(a[17]=p=>e.startup.speciesCount=p)},[(I(!0),L(X,null,ve(Ce(uu),p=>(I(),L("option",{key:p,value:p},k(p),9,pc))),128))],512),[[Ne,e.startup.speciesCount,void 0,{number:!0}]])]),r("label",null,[a[93]||(a[93]=r("span",null,"World Size",-1)),$(r("select",{"onUpdate:modelValue":a[18]||(a[18]=p=>e.startup.worldSizeMult=p)},[(I(!0),L(X,null,ve(Ce(cu),p=>(I(),L("option",{key:p,value:p},k((p*800).toLocaleString()),9,hc))),128))],512),[[Ne,e.startup.worldSizeMult,void 0,{number:!0}]])]),r("label",null,[a[95]||(a[95]=r("span",null,"Matrix Range",-1)),$(r("select",{"onUpdate:modelValue":a[19]||(a[19]=p=>e.startup.interactionRange=p)},[...a[94]||(a[94]=[r("option",{value:1},"1",-1),r("option",{value:2},"2",-1),r("option",{value:3},"3",-1)])],512),[[Ne,e.startup.interactionRange,void 0,{number:!0}]])]),r("label",null,[a[96]||(a[96]=r("span",null,"Start Size",-1)),$(r("select",{"onUpdate:modelValue":a[20]||(a[20]=p=>e.startup.startRadiusMul=p)},[(I(),L(X,null,ve(Mt,p=>r("option",{key:p,value:p},k((p*800).toLocaleString())+k(p===e.startup.worldSizeMult?" (fills)":""),9,mc)),64))],512),[[Ne,e.startup.startRadiusMul,void 0,{number:!0}]])]),r("label",null,[a[97]||(a[97]=r("span",null,"Species Spread",-1)),$(r("select",{"onUpdate:modelValue":a[21]||(a[21]=p=>e.startup.speciesSpread=p)},[(I(!0),L(X,null,ve(Ce(fu),p=>(I(),L("option",{key:p,value:p},k(p===0?"Discrete":`±${p}`),9,gc))),128))],512),[[Ne,e.startup.speciesSpread,void 0,{number:!0}]])])]),r("div",bc,[r("label",vc,[a[98]||(a[98]=r("span",null,"Seed",-1)),r("input",{value:e.startup.seed,type:"number",min:"0",step:"1",onChange:a[22]||(a[22]=p=>e.startup.seed=Math.max(0,Math.floor(+p.target.value)||0))},null,40,yc)]),r("button",{title:"New random seed",onClick:a[23]||(a[23]=p=>i("reroll-seed"))},"🎲"),r("button",{class:ke(["lock",{on:y.value.seed}]),title:y.value.seed?"Seed locked — Random and New Matrix reuse it":"Lock the seed",onClick:a[24]||(a[24]=p=>F("seed"))},k(y.value.seed?"🔒":"🔓"),11,xc)]),a[101]||(a[101]=r("p",{class:"hint"},[W(" Everything generated — layout, matrix, philicity, sizes, and Random's own choices — derives from the seed. Same seed and settings gives the same world back. "),r("em",null,"Lock"),W(" it and Random/New Matrix reuse it instead of rolling a fresh one, so results repeat exactly. ")],-1)),e.startup.speciesSpread?(I(),L("p",wc,[W(" Species is a continuous value, not an index. Agents are scattered up to ±"+k(e.startup.speciesSpread)+" around their basis species, so their colour, matrix row, philicity and size are all interpolated between neighbouring rows. The matrix below is the ",1),a[99]||(a[99]=r("em",null,"basis",-1)),a[100]||(a[100]=W("; agents live between its rows. ",-1))])):ye("",!0),r("div",{class:ke(["density",Se.value])},[r("span",null,"~"+k(Ke.value.toLocaleString())+" neighbours scanned per agent",1)],2),a[102]||(a[102]=r("p",{class:"hint"},[W(" Cost scales with "),r("em",null,"density"),W(", not agent count. Raise World Size to keep big counts fast. Startup changes apply on Restart. ")],-1)),e.notice?(I(),L("p",Sc,k(e.notice),1)):ye("",!0)]),e.matrix?(I(),L("section",Pc,[r("h3",null,[a[103]||(a[103]=r("span",null,"Interaction Matrix",-1)),r("button",{class:ke(["lock",{on:y.value.matrix}]),title:y.value.matrix?"Locked — Random leaves this alone":"Lock from Random",onClick:a[25]||(a[25]=p=>F("matrix"))},k(y.value.matrix?"🔒":"🔓"),11,Cc)]),r("div",Mc,[r("button",{title:"Generate a new interaction matrix",onClick:a[26]||(a[26]=p=>i("randomize-matrix",y.value))},[...a[104]||(a[104]=[r("span",{class:"ico"},"⚄",-1),W("New Matrix ",-1)])]),r("button",{title:"Set every interaction to zero",onClick:a[27]||(a[27]=p=>i("clear-matrix"))},[...a[105]||(a[105]=[r("span",{class:"ico"},"∅",-1),W("Clear ",-1)])]),r("label",kc,[$(r("input",{"onUpdate:modelValue":a[28]||(a[28]=p=>e.startup.lockMatrix=p),type:"checkbox"},null,512),[[Rt,e.startup.lockMatrix]]),a[106]||(a[106]=r("span",null,"Keep through restart",-1))])]),$e(Iu,{matrix:e.matrix,philicity:e.philicity,"core-sizes":e.params.coreEnabled?e.coreSizes:null,"species-count":e.speciesCount,editable:"",onEdit:a[29]||(a[29]=p=>i("edit-matrix",p))},null,8,["matrix","philicity","core-sizes","species-count"]),a[107]||(a[107]=r("p",{class:"hint"},[W(" Two different locks, easy to confuse. "),r("em",null,"Keep through restart"),W(" carries this matrix — including any edits — into the next Restart, which otherwise starts a fresh run with a new one. The "),r("strong",null,"🔒"),W(" on this heading stops "),r("em",null,"Random"),W(" rerolling it. Locking the "),r("em",null,"seed"),W(" outranks both: Restart then rebuilds the identical world, layout and all. ")],-1))])):ye("",!0),r("section",null,[r("h3",null,[a[108]||(a[108]=r("span",null,"Simulation",-1)),r("button",{class:ke(["lock",{on:y.value.sim}]),title:y.value.sim?"Locked — Random leaves this alone":"Lock from Random",onClick:a[30]||(a[30]=p=>F("sim"))},k(y.value.sim?"🔒":"🔓"),11,Rc)]),(I(!0),L(X,null,ve(s("sim"),([p,Z,ze,Ve,Me])=>(I(),L("label",{key:p,class:"slider"},[r("span",Tc,k(Z),1),r("span",Ac,k(ne(e.params[p],Me)),1),$(r("input",{"onUpdate:modelValue":Re=>e.params[p]=Re,type:"range",min:ze,max:Ve,step:Me},null,8,Bc),[[te,e.params[p],void 0,{number:!0}]])]))),128)),r("label",Ec,[$(r("input",{"onUpdate:modelValue":a[31]||(a[31]=p=>e.params.brownian=p),type:"checkbox"},null,512),[[Rt,e.params.brownian]]),a[109]||(a[109]=r("span",null,"Per-frame randomness",-1))]),a[111]||(a[111]=r("p",{class:"hint"},[W(" Off is the original behaviour, where "),r("em",null,"Randomness"),W(" gives each agent a "),r("em",null,"fixed"),W(" direction for the whole run — a per-agent bias, not noise. On mixes the frame into the seed, making it real Brownian motion. It changes the feel of every preset, hence the switch. ")],-1)),r("div",Oc,[r("span",null,[a[110]||(a[110]=W("Collide radius ",-1)),r("b",null,k(Ce(Oi)(e.params).toFixed(2)),1)])])]),r("section",null,[r("h3",null,[a[112]||(a[112]=r("span",null,"Boids",-1)),r("button",{class:ke(["lock",{on:y.value.boids}]),title:y.value.boids?"Locked — Random leaves this alone":"Lock from Random",onClick:a[32]||(a[32]=p=>F("boids"))},k(y.value.boids?"🔒":"🔓"),11,Fc)]),(I(!0),L(X,null,ve(s("boids"),([p,Z,ze,Ve,Me])=>(I(),L("label",{key:p,class:"slider"},[r("span",Ic,k(Z),1),r("span",zc,k(ne(e.params[p],Me)),1),$(r("input",{"onUpdate:modelValue":Re=>e.params[p]=Re,type:"range",min:ze,max:Ve,step:Me},null,8,Dc),[[te,e.params[p],void 0,{number:!0}]])]))),128))]),r("section",null,[r("h3",null,[a[113]||(a[113]=r("span",null,"Particle Life",-1)),r("button",{class:ke(["lock",{on:y.value.plife}]),title:y.value.plife?"Locked — Random leaves this alone":"Lock from Random",onClick:a[33]||(a[33]=p=>F("plife"))},k(y.value.plife?"🔒":"🔓"),11,Lc)]),(I(!0),L(X,null,ve(s("plife"),([p,Z,ze,Ve,Me])=>(I(),L("label",{key:p,class:"slider"},[r("span",Uc,k(Z),1),r("span",Nc,k(ne(e.params[p],Me)),1),$(r("input",{"onUpdate:modelValue":Re=>e.params[p]=Re,type:"range",min:ze,max:Ve,step:Me},null,8,_c),[[te,e.params[p],void 0,{number:!0}]])]))),128)),r("div",Vc,[r("span",null,[a[114]||(a[114]=W("Force softening ",-1)),r("b",null,k(Ce(Sr)(e.params).toFixed(0)),1)])])]),r("section",null,[r("h3",null,[a[115]||(a[115]=r("span",null,"Excluded Volume",-1)),r("button",{class:ke(["lock",{on:y.value.core}]),title:y.value.core?"Locked — Random leaves this alone":"Lock from Random",onClick:a[34]||(a[34]=p=>F("core"))},k(y.value.core?"🔒":"🔓"),11,Wc)]),r("label",Gc,[r("input",{type:"checkbox",checked:e.params.coreEnabled,onChange:a[35]||(a[35]=p=>e.params.coreEnabled=p.target.checked)},null,40,$c),a[116]||(a[116]=r("span",null,"Enable excluded volume",-1))]),e.params.coreEnabled?(I(),L(X,{key:0},[(I(!0),L(X,null,ve(s("core"),([p,Z,ze,Ve,Me])=>(I(),L("label",{key:p,class:"slider"},[r("span",Hc,k(Z),1),r("span",jc,k(ne(e.params[p],Me)),1),$(r("input",{"onUpdate:modelValue":Re=>e.params[p]=Re,type:"range",min:ze,max:Ve,step:Me},null,8,Kc),[[te,e.params[p],void 0,{number:!0}]])]))),128)),r("label",qc,[a[117]||(a[117]=r("span",null,"Falloff",-1)),$(r("select",{"onUpdate:modelValue":a[36]||(a[36]=p=>e.params.coreFalloff=p)},[(I(!0),L(X,null,ve(Ce($s),([p],Z)=>(I(),L("option",{key:Z,value:Z},k(p),9,Yc))),128))],512),[[Ne,e.params.coreFalloff,void 0,{number:!0}]])]),r("div",Jc,[r("span",null,[a[118]||(a[118]=W("Widest pair radius ",-1)),r("b",null,k(Ce(Fi)(e.params).toFixed(0)),1)])]),r("p",Xc,k(Ce($s)[e.params.coreFalloff][1]),1)],64)):ye("",!0),a[119]||(a[119]=r("p",{class:"hint"},[W(" A short-range repulsion that ignores the interaction matrix, so mutually attracted species keep real spacing instead of collapsing to a point. Applies at every mix value. Raise "),r("em",null,"Size Spread"),W(" to give each species a different size — at 1 some end up with no excluded volume at all, and get shoved around by the ones that do (see the "),r("em",null,"Core size"),W(" strip under the matrix). A pair's exclusion distance is the sum of their two radii. ")],-1))]),r("section",null,[r("h3",null,[a[120]||(a[120]=r("span",null,"Medium",-1)),r("button",{class:ke(["lock",{on:y.value.medium}]),title:y.value.medium?"Locked — Random leaves this alone":"Lock from Random",onClick:a[37]||(a[37]=p=>F("medium"))},k(y.value.medium?"🔒":"🔓"),11,Zc)]),r("label",Qc,[r("input",{type:"checkbox",checked:e.params.mediumEnabled,onChange:a[38]||(a[38]=p=>e.params.mediumEnabled=p.target.checked)},null,40,ed),a[121]||(a[121]=r("span",null,"Enable medium",-1))]),e.params.mediumEnabled?(I(),L(X,{key:0},[(I(!0),L(X,null,ve(s("medium"),([p,Z,ze,Ve,Me])=>(I(),L("label",{key:p,class:"slider"},[r("span",td,k(Z),1),r("span",nd,k(ne(e.params[p],Me)),1),$(r("input",{"onUpdate:modelValue":Re=>e.params[p]=Re,type:"range",min:ze,max:Ve,step:Me},null,8,id),[[te,e.params[p],void 0,{number:!0}]])]))),128)),r("div",sd,[r("span",null,[a[122]||(a[122]=W("Cell cleared at ",-1)),r("b",null,k(de.value.toLocaleString()),1),a[123]||(a[123]=W(" agents",-1))])]),r("label",od,[$(r("input",{"onUpdate:modelValue":a[39]||(a[39]=p=>e.params.showMedium=p),type:"checkbox"},null,512),[[Rt,e.params.showMedium]]),a[124]||(a[124]=r("span",null,"Show medium",-1))])],64)):ye("",!0),a[125]||(a[125]=r("p",{class:"hint"},[W(" A diffusing scalar field that agents displace. Each species has a "),r("em",null,"philicity"),W(" in [-1, +1] (shown under the matrix): philic species climb the gradient, phobic ones flee it and coalesce into droplets. A philic species that is "),r("em",null,"also"),W(" attracted to a phobic one parks at the interface — that is a surfactant. ")],-1))]),r("section",null,[r("h3",null,[a[126]||(a[126]=r("span",null,"Blobs",-1)),r("button",{class:ke(["lock",{on:y.value.blobs}]),title:y.value.blobs?"Locked — Random leaves this alone":"Lock from Random",onClick:a[40]||(a[40]=p=>F("blobs"))},k(y.value.blobs?"🔒":"🔓"),11,rd)]),r("label",ld,[r("input",{type:"checkbox",checked:e.params.blobsEnabled,onChange:a[41]||(a[41]=p=>e.params.blobsEnabled=p.target.checked)},null,40,ad),a[127]||(a[127]=r("span",null,"Detect blobs",-1))]),e.params.blobsEnabled?(I(),L(X,{key:0},[r("label",ud,[a[128]||(a[128]=r("span",{class:"name"},"Min Density",-1)),r("span",cd,k(e.params.blobMinDensity.toFixed(1))+"×",1),$(r("input",{"onUpdate:modelValue":a[42]||(a[42]=p=>e.params.blobMinDensity=p),type:"range",min:"0.5",max:"8",step:"0.1"},null,512),[[te,e.params.blobMinDensity,void 0,{number:!0}]])]),r("label",dd,[a[129]||(a[129]=r("span",{class:"name"},"Smoothing",-1)),r("span",fd,k(e.params.blobSmoothing),1),$(r("input",{"onUpdate:modelValue":a[43]||(a[43]=p=>e.params.blobSmoothing=p),type:"range",min:"0",max:"8",step:"1"},null,512),[[te,e.params.blobSmoothing,void 0,{number:!0}]])]),r("label",pd,[a[130]||(a[130]=r("span",{class:"name"},"Reflood Every",-1)),r("span",hd,k(e.params.blobInterval)+"f",1),$(r("input",{"onUpdate:modelValue":a[44]||(a[44]=p=>e.params.blobInterval=p),type:"range",min:"1",max:"60",step:"1"},null,512),[[te,e.params.blobInterval,void 0,{number:!0}]])]),r("label",md,[a[131]||(a[131]=r("span",{class:"name"},"Flood Rounds",-1)),r("span",gd,k(e.params.blobRounds),1),$(r("input",{"onUpdate:modelValue":a[45]||(a[45]=p=>e.params.blobRounds=p),type:"range",min:"1",max:"64",step:"1"},null,512),[[te,e.params.blobRounds,void 0,{number:!0}]])])],64)):ye("",!0),a[144]||(a[144]=r("p",{class:"hint"},[W(" Connected-component labelling over grid cells — cheap, but cell-resolution, so two blobs sharing a cell merge. "),r("em",null,"Min Density"),W(" is what separates blob from background: below it, the thin gas between droplets bridges them and the whole world becomes one blob. "),r("em",null,"Smoothing"),W(" blurs the density field before thresholding it — without it blobs come out the shape of the cell grid, blocky and full of pinholes. A label travels one cell per round, so "),r("em",null,"Flood Rounds"),W(" caps how wide a blob can be and still come out as one piece. Switch "),r("em",null,"Colour By"),W(" to "),r("em",null,"Blob"),W(" to see them; grey means unlabelled background. ")],-1)),e.params.blobsEnabled?(I(),L(X,{key:1},[r("label",bd,[r("input",{type:"checkbox",checked:e.params.mutateEnabled,onChange:a[46]||(a[46]=p=>e.params.mutateEnabled=p.target.checked)},null,40,vd),a[132]||(a[132]=r("span",null,"Mutate species per blob",-1))]),e.params.mutateEnabled?(I(),L(X,{key:0},[r("label",yd,[a[133]||(a[133]=r("span",{class:"name"},"Mutation Rate",-1)),r("span",xd,k(e.params.mutateRate.toFixed(2)),1),$(r("input",{"onUpdate:modelValue":a[47]||(a[47]=p=>e.params.mutateRate=p),type:"range",min:"0",max:"0.5",step:"0.01"},null,512),[[te,e.params.mutateRate,void 0,{number:!0}]])]),r("label",wd,[a[134]||(a[134]=r("span",{class:"name"},"Outward Bias",-1)),r("span",Sd,k(e.params.mutateBias.toFixed(2)),1),$(r("input",{"onUpdate:modelValue":a[48]||(a[48]=p=>e.params.mutateBias=p),type:"range",min:"0",max:"1",step:"0.05"},null,512),[[te,e.params.mutateBias,void 0,{number:!0}]])]),r("label",Pd,[a[135]||(a[135]=r("span",{class:"name"},"Mutate Every",-1)),r("span",Cd,k(e.params.mutateInterval)+"f",1),$(r("input",{"onUpdate:modelValue":a[49]||(a[49]=p=>e.params.mutateInterval=p),type:"range",min:"5",max:"120",step:"5"},null,512),[[te,e.params.mutateInterval,void 0,{number:!0}]])])],64)):ye("",!0),r("label",Md,[$(r("input",{"onUpdate:modelValue":a[50]||(a[50]=p=>e.params.splitEnabled=p),type:"checkbox"},null,512),[[Rt,e.params.splitEnabled]]),a[136]||(a[136]=r("span",null,"Split large blobs",-1))]),e.params.splitEnabled?(I(),L(X,{key:1},[r("label",kd,[a[137]||(a[137]=r("span",{class:"name"},"Split Every",-1)),r("span",Rd,k(e.params.splitInterval)+"f",1),$(r("input",{"onUpdate:modelValue":a[51]||(a[51]=p=>e.params.splitInterval=p),type:"range",min:"20",max:"300",step:"10"},null,512),[[te,e.params.splitInterval,void 0,{number:!0}]])]),r("label",Td,[a[138]||(a[138]=r("span",{class:"name"},"Split Chance",-1)),r("span",Ad,k(e.params.splitChance.toFixed(2)),1),$(r("input",{"onUpdate:modelValue":a[52]||(a[52]=p=>e.params.splitChance=p),type:"range",min:"0.05",max:"1",step:"0.05"},null,512),[[te,e.params.splitChance,void 0,{number:!0}]])]),r("label",Bd,[a[139]||(a[139]=r("span",{class:"name"},"Min Blob Size",-1)),r("span",Ed,k(e.params.splitMinBlobMul)+"×",1),$(r("input",{"onUpdate:modelValue":a[53]||(a[53]=p=>e.params.splitMinBlobMul=p),type:"range",min:"2",max:"40",step:"1"},null,512),[[te,e.params.splitMinBlobMul,void 0,{number:!0}]])]),r("label",Od,[a[140]||(a[140]=r("span",{class:"name"},"Split Force",-1)),r("span",Fd,k(e.params.splitImpulse),1),$(r("input",{"onUpdate:modelValue":a[54]||(a[54]=p=>e.params.splitImpulse=p),type:"range",min:"0",max:"600",step:"10"},null,512),[[te,e.params.splitImpulse,void 0,{number:!0}]])]),r("label",Id,[a[141]||(a[141]=r("span",{class:"name"},"Split Mutation",-1)),r("span",zd,k(e.params.splitMutation.toFixed(2)),1),$(r("input",{"onUpdate:modelValue":a[55]||(a[55]=p=>e.params.splitMutation=p),type:"range",min:"0",max:"2",step:"0.05"},null,512),[[te,e.params.splitMutation,void 0,{number:!0}]])]),a[142]||(a[142]=r("p",{class:"hint"},[W(" Mitosis. A qualifying blob is cut along a random axis through its own centroid and the halves are shoved apart, with their species drifting in "),r("em",null,"opposite"),W(" directions — so dividing is also speciation. Only blobs above "),r("em",null,"Min Blob Size"),W(" ever divide, and a blob only gets big by holding together, so size stands in for persistence as a crude fitness signal. ")],-1))],64)):ye("",!0),a[143]||(a[143]=r("p",{class:"hint"},[W(" Every agent in a blob gets the "),r("em",null,"same"),W(" nudge, so a droplet's whole lineage drifts together instead of dissolving into noise. Watch it in "),r("em",null,"Species"),W(" colour: droplets slowly change hue and diverge from each other. Species 0 and N−1 "),r("em",null,"reflect"),W(" rather than clamp, so the walk stays spread out instead of piling up against the ends. "),r("em",null,"Outward Bias"),W(" additionally drives species apart, if you want them to separate faster. ")],-1))],64)):ye("",!0)]),r("section",null,[r("h3",null,[a[145]||(a[145]=r("span",null,"View",-1)),r("button",{class:ke(["lock",{on:y.value.view}]),title:y.value.view?"Locked — Random leaves this alone":"Lock from Random",onClick:a[56]||(a[56]=p=>F("view"))},k(y.value.view?"🔒":"🔓"),11,Dd)]),r("label",Ld,[a[146]||(a[146]=r("span",null,"Colour By",-1)),$(r("select",{"onUpdate:modelValue":a[57]||(a[57]=p=>e.params.renderMode=p)},[(I(!0),L(X,null,ve(Ce(qs),([p],Z)=>(I(),L("option",{key:Z,value:Z},k(p),9,Ud))),128))],512),[[Ne,e.params.renderMode,void 0,{number:!0}]])]),r("p",Nd,k(Ce(qs)[e.params.renderMode][1]),1),r("label",_d,[a[147]||(a[147]=r("span",null,"Field",-1)),$(r("select",{"onUpdate:modelValue":a[58]||(a[58]=p=>e.params.fieldMode=p)},[(I(!0),L(X,null,ve(Ce(Ks),([p],Z)=>(I(),L("option",{key:Z,value:Z},k(p),9,Vd))),128))],512),[[Ne,e.params.fieldMode,void 0,{number:!0}]])]),r("p",Wd,k(Ce(Ks)[e.params.fieldMode][1]),1),e.params.fieldMode>0?(I(),L(X,{key:0},[r("label",Gd,[a[148]||(a[148]=r("span",{class:"name"},"Field Smoothing",-1)),r("span",$d,k(e.params.fieldSmoothing),1),$(r("input",{"onUpdate:modelValue":a[59]||(a[59]=p=>e.params.fieldSmoothing=p),type:"range",min:"0",max:"10",step:"1"},null,512),[[te,e.params.fieldSmoothing,void 0,{number:!0}]])]),r("label",Hd,[a[149]||(a[149]=r("span",{class:"name"},"Surface At",-1)),r("span",jd,k(e.params.fieldThresholdMul.toFixed(1))+"×",1),$(r("input",{"onUpdate:modelValue":a[60]||(a[60]=p=>e.params.fieldThresholdMul=p),type:"range",min:"0.2",max:"10",step:"0.1"},null,512),[[te,e.params.fieldThresholdMul,void 0,{number:!0}]])]),r("label",Kd,[a[150]||(a[150]=r("span",{class:"name"},"Field Opacity",-1)),r("span",qd,k(e.params.fieldStrength.toFixed(2)),1),$(r("input",{"onUpdate:modelValue":a[61]||(a[61]=p=>e.params.fieldStrength=p),type:"range",min:"0",max:"1",step:"0.02"},null,512),[[te,e.params.fieldStrength,void 0,{number:!0}]])]),r("label",Yd,[$(r("input",{"onUpdate:modelValue":a[62]||(a[62]=p=>e.params.showAgents=p),type:"checkbox"},null,512),[[Rt,e.params.showAgents]]),a[151]||(a[151]=r("span",null,"Draw agents on top",-1))]),a[152]||(a[152]=r("p",{class:"hint"},[W(" Built from the per-cell counts the spatial hash already produces, so it costs one blur plus one fullscreen pass. "),r("em",null,"Surface At"),W(" is a multiple of average occupancy — lower it to make the fluid engulf more, raise it to leave only the dense cores. Turn agents off to see the surface on its own. ")],-1))],64)):ye("",!0),r("label",Jd,[a[153]||(a[153]=r("span",null,"Palette",-1)),$(r("select",{"onUpdate:modelValue":a[63]||(a[63]=p=>e.params.speciesPalette=p)},[(I(!0),L(X,null,ve(Ce(js),([p],Z)=>(I(),L("option",{key:Z,value:Z},k(p),9,Xd))),128))],512),[[Ne,e.params.speciesPalette,void 0,{number:!0}]])]),r("p",Zd,k(Ce(js)[e.params.speciesPalette][1]),1),r("label",Qd,[a[154]||(a[154]=r("span",null,"Background",-1)),$(r("select",{"onUpdate:modelValue":a[64]||(a[64]=p=>e.params.background=p)},[(I(!0),L(X,null,ve(Ce(cn),(p,Z)=>(I(),L("option",{key:Z,value:Z},k(p.name),9,ef))),128))],512),[[Ne,e.params.background,void 0,{number:!0}]])]),r("label",tf,[a[155]||(a[155]=r("span",null,"Shape",-1)),$(r("select",{"onUpdate:modelValue":a[65]||(a[65]=p=>e.params.particleShape=p)},[(I(!0),L(X,null,ve(Ce(Hs),([p],Z)=>(I(),L("option",{key:Z,value:Z},k(p),9,nf))),128))],512),[[Ne,e.params.particleShape,void 0,{number:!0}]])]),r("p",sf,k(Ce(Hs)[e.params.particleShape][1]),1),r("label",of,[a[156]||(a[156]=r("span",{class:"name"},"Size",-1)),r("span",rf,k(e.params.drawScale.toFixed(2))+"×",1),$(r("input",{"onUpdate:modelValue":a[66]||(a[66]=p=>e.params.drawScale=p),type:"range",min:"0.1",max:"12",step:"0.1"},null,512),[[te,e.params.drawScale,void 0,{number:!0}]])]),r("label",lf,[a[157]||(a[157]=r("span",{class:"name"},"Size Jitter",-1)),r("span",af,k(e.params.drawJitter.toFixed(2)),1),$(r("input",{"onUpdate:modelValue":a[67]||(a[67]=p=>e.params.drawJitter=p),type:"range",min:"0",max:"1",step:"0.05"},null,512),[[te,e.params.drawJitter,void 0,{number:!0}]])]),r("div",uf,[r("span",null,[a[158]||(a[158]=W("Drawn radius ",-1)),r("b",null,k((e.params.drawRadius*e.params.drawScale).toFixed(1)),1)])]),a[171]||(a[171]=r("p",{class:"hint"},[W(" Visual only — multiplies "),r("em",null,"Draw Size"),W(" for rendering. Draw Size itself is under "),r("em",null,"Simulation"),W(" and also sets the collision radius, so scaling it there changes the physics; this does not. "),r("em",null,"Size Jitter"),W(" varies each agent's size by up to ±100%, keyed to its index so it stays put rather than flickering. ")],-1)),r("label",cf,[a[159]||(a[159]=r("span",{class:"name"},"Glow",-1)),r("span",df,k(e.params.glowStrength.toFixed(2)),1),$(r("input",{"onUpdate:modelValue":a[68]||(a[68]=p=>e.params.glowStrength=p),type:"range",min:"0",max:"1",step:"0.02"},null,512),[[te,e.params.glowStrength,void 0,{number:!0}]])]),e.params.glowStrength>0?(I(),L("label",ff,[a[160]||(a[160]=r("span",{class:"name"},"Glow Size",-1)),r("span",pf,k(e.params.glowSize.toFixed(1))+"×",1),$(r("input",{"onUpdate:modelValue":a[69]||(a[69]=p=>e.params.glowSize=p),type:"range",min:"1.5",max:"12",step:"0.5"},null,512),[[te,e.params.glowSize,void 0,{number:!0}]])])):ye("",!0),r("label",hf,[a[161]||(a[161]=r("span",{class:"name"},"Trails",-1)),r("span",mf,k(e.params.trailStrength.toFixed(2)),1),$(r("input",{"onUpdate:modelValue":a[70]||(a[70]=p=>e.params.trailStrength=p),type:"range",min:"0",max:"0.99",step:"0.01"},null,512),[[te,e.params.trailStrength,void 0,{number:!0}]])]),r("label",gf,[a[162]||(a[162]=r("span",{class:"name"},"Outline",-1)),r("span",bf,k(e.params.outline.toFixed(2)),1),$(r("input",{"onUpdate:modelValue":a[71]||(a[71]=p=>e.params.outline=p),type:"range",min:"0",max:"1",step:"0.05"},null,512),[[te,e.params.outline,void 0,{number:!0}]])]),r("label",vf,[a[163]||(a[163]=r("span",{class:"name"},"Motion Stretch",-1)),r("span",yf,k(e.params.velocityStretch.toFixed(1)),1),$(r("input",{"onUpdate:modelValue":a[72]||(a[72]=p=>e.params.velocityStretch=p),type:"range",min:"0",max:"50",step:"0.25"},null,512),[[te,e.params.velocityStretch,void 0,{number:!0}]])]),a[172]||(a[172]=r("p",{class:"hint"},[W(" Glow is a second additive pass — halos sum where they overlap, so dense regions bloom. "),r("em",null,"Motion Stretch"),W(" scales each agent along its velocity, turning fast ones into streaks. "),r("em",null,"Outline"),W(" darkens each agent's rim so dense regions stay readable instead of saturating into one flat mass. "),r("em",null,"Trails"),W(" keeps part of the previous frame instead of clearing, so agents smear a decaying path behind them — at 0.99 a trail lasts around a hundred frames. It is screen-space, so panning smears too. ")],-1)),r("label",xf,[r("input",{type:"checkbox",checked:e.params.driftEnabled,onChange:a[73]||(a[73]=p=>e.params.driftEnabled=p.target.checked)},null,40,wf),a[164]||(a[164]=r("span",null,"Drifting motes",-1))]),e.params.driftEnabled?(I(),L(X,{key:2},[r("label",Sf,[a[165]||(a[165]=r("span",{class:"name"},"Density",-1)),r("span",Pf,k((e.params.driftCols**2).toLocaleString()),1),$(r("input",{"onUpdate:modelValue":a[74]||(a[74]=p=>e.params.driftCols=p),type:"range",min:"8",max:"90",step:"1"},null,512),[[te,e.params.driftCols,void 0,{number:!0}]])]),r("label",Cf,[a[166]||(a[166]=r("span",{class:"name"},"Mote Size",-1)),r("span",Mf,k(e.params.driftSize),1),$(r("input",{"onUpdate:modelValue":a[75]||(a[75]=p=>e.params.driftSize=p),type:"range",min:"4",max:"80",step:"1"},null,512),[[te,e.params.driftSize,void 0,{number:!0}]])]),r("label",kf,[a[167]||(a[167]=r("span",{class:"name"},"Drift Speed",-1)),r("span",Rf,k(e.params.driftSpeed.toFixed(3)),1),$(r("input",{"onUpdate:modelValue":a[76]||(a[76]=p=>e.params.driftSpeed=p),type:"range",min:"0",max:"0.03",step:"0.001"},null,512),[[te,e.params.driftSpeed,void 0,{number:!0}]])]),r("label",Tf,[a[168]||(a[168]=r("span",{class:"name"},"Brightness",-1)),r("span",Af,k(e.params.driftBrightness.toFixed(2)),1),$(r("input",{"onUpdate:modelValue":a[77]||(a[77]=p=>e.params.driftBrightness=p),type:"range",min:"0",max:"1",step:"0.05"},null,512),[[te,e.params.driftBrightness,void 0,{number:!0}]])]),a[169]||(a[169]=r("p",{class:"hint"}," Decorative background haze — no effect on the simulation. Motes sit one per cell of a jittered grid rather than at random positions: random clumps, and clumped motes merge into blotches. The jitter is bounded to the middle 60% of a cell, so two motes can never come closer than 40% of the spacing. ",-1))],64)):ye("",!0),r("label",Bf,[$(r("input",{type:"checkbox","onUpdate:modelValue":a[78]||(a[78]=p=>e.params.showGrid=p)},null,512),[[Rt,e.params.showGrid]]),a[170]||(a[170]=r("span",null,"Show spatial grid",-1))]),a[173]||(a[173]=pr('<p class="hint" data-v-abd8a7df> Drag to pan · scroll to zoom at cursor · <kbd data-v-abd8a7df>Space</kbd> random · <kbd data-v-abd8a7df>P</kbd> pause · <kbd data-v-abd8a7df>R</kbd> restart · <kbd data-v-abd8a7df>G</kbd> grid · <kbd data-v-abd8a7df>M</kbd> medium · <kbd data-v-abd8a7df>V</kbd> excluded volume · <kbd data-v-abd8a7df>C</kbd> reset cam · <kbd data-v-abd8a7df>F</kbd> fullscreen · <kbd data-v-abd8a7df>H</kbd> hide panel </p>',1))])])],4))}},If=Qt(Ff,[["__scopeId","data-v-abd8a7df"]]),zf={class:"dialog",role:"dialog","aria-modal":"true","aria-label":"About"},Df={class:"check"},Lf={__name:"AboutDialog",props:{dontShowAgain:{type:Boolean,default:!1}},emits:["close","update:dontShowAgain"],setup(e,{emit:t}){const n=t,i=me(!1);function s(){n("update:dontShowAgain",i.value),n("close")}return(o,l)=>(I(),L("div",{class:"backdrop",onClick:ns(s,["self"])},[r("div",zf,[l[2]||(l[2]=pr('<h1 data-v-b08f6d0b>Particle Life <span class="plus" data-v-b08f6d0b>+</span> Boids</h1><p class="sub" data-v-b08f6d0b> Tens of thousands of agents on the GPU, blending boids flocking with particle-life species forces on a wrapping world. Runs entirely in WebGPU. </p><section data-v-b08f6d0b><h2 data-v-b08f6d0b>Original project</h2><p data-v-b08f6d0b> This is a browser port of <strong data-v-b08f6d0b>Godot-Particle-Life-Boids-Combined-Compute-Shader</strong> by <strong data-v-b08f6d0b>Tokoyuma</strong> (ThePathfindersCodex). The simulation — the forces, the spatial hashing, the collision pass, the tuned constants — is theirs; this port re-expresses it in WGSL. </p><p class="links" data-v-b08f6d0b><a href="https://github.com/ThePathfindersCodex/Godot-Particle-Life-Boids-Combined-Compute-Shader" target="_blank" rel="noopener noreferrer" data-v-b08f6d0b>Source on GitHub ↗</a><a href="https://www.youtube.com/@ThePathfindersCodex" target="_blank" rel="noopener noreferrer" data-v-b08f6d0b>ThePathfindersCodex on YouTube ↗</a></p><p class="fine" data-v-b08f6d0b>MIT License · Copyright © 2025 Tokoyuma</p></section><section data-v-b08f6d0b><h2 data-v-b08f6d0b>About this port</h2><p data-v-b08f6d0b> Every line of this WebGPU + Vue version was written by <strong data-v-b08f6d0b>Claude Opus</strong> (Anthropic), working through Claude Code. No human wrote the WGSL, the engine, or this dialog. Treat it accordingly — read the code before trusting it. </p><p class="fine" data-v-b08f6d0b> The port swaps Godot&#39;s per-frame CPU readback for a GPU prefix sum, and its <code data-v-b08f6d0b>imageStore</code> circle rasteriser for an instanced render pipeline. See the README for the full list of differences. </p></section><p class="fine credit" data-v-b08f6d0b> Made by <a href="https://tarwin.art/" target="_blank" rel="noopener noreferrer" data-v-b08f6d0b>Tarwin ↗</a></p>',5)),r("footer",null,[r("label",Df,[$(r("input",{"onUpdate:modelValue":l[0]||(l[0]=u=>i.value=u),type:"checkbox"},null,512),[[Rt,i.value]]),l[1]||(l[1]=r("span",null,"Don't show this again",-1))]),r("button",{class:"primary",onClick:s},"Start")])])]))}},Uf=Qt(Lf,[["__scopeId","data-v-b08f6d0b"]]),Nf={class:"dialog"},_f={key:0,class:"error"},Vf={class:"buttons"},Wf={__name:"ConfigDialog",props:{config:{type:Object,required:!0}},emits:["close","apply"],setup(e,{emit:t}){const n=e,i=t,s=me(""),o=me(""),l=me(!1);Ut(()=>n.config,m=>{s.value=JSON.stringify(m,null,2),o.value="",l.value=!1},{immediate:!0});async function u(){try{await navigator.clipboard.writeText(s.value),l.value=!0,setTimeout(()=>l.value=!1,1500)}catch{o.value="Clipboard blocked by the browser — select the text and copy manually."}}function c(){let m;try{m=JSON.parse(s.value)}catch(f){o.value=`Not valid JSON: ${f.message}`;return}try{i("apply",m),i("close")}catch(f){o.value=f.message}}return(m,f)=>(I(),L("div",{class:"backdrop",onClick:f[3]||(f[3]=ns(g=>i("close"),["self"]))},[r("div",Nf,[r("header",null,[f[4]||(f[4]=r("h1",null,"Configuration",-1)),r("button",{class:"icon",title:"Close",onClick:f[0]||(f[0]=g=>i("close"))},"✕")]),f[6]||(f[6]=r("p",{class:"sub"}," Everything needed to reproduce this state: the live parameters, the startup config, and the per-species matrix, philicity and core sizes. Edit it, or paste one in and apply. ",-1)),$(r("textarea",{"onUpdate:modelValue":f[1]||(f[1]=g=>s.value=g),spellcheck:"false",onInput:f[2]||(f[2]=g=>o.value="")},null,544),[[te,s.value]]),o.value?(I(),L("p",_f,k(o.value),1)):ye("",!0),r("footer",null,[f[5]||(f[5]=r("span",{class:"hint"}," Unknown keys are ignored; anything missing keeps its current value. ",-1)),r("div",Vf,[r("button",{onClick:u},k(l.value?"Copied":"Copy"),1),r("button",{class:"primary",onClick:c},"Apply")])])])]))}},Gf=Qt(Wf,[["__scopeId","data-v-805b5e6c"]]),$f={class:"app"},Hf={class:"fps"},jf={class:"dim"},Kf={class:"dim"},qf={class:"dim"},Yf={class:"dim"},Jf=["title"],Xf={key:5,class:"error"},yi="plb.hideAbout",ao="plb.hudOpen",Zf={__name:"App",setup(e){const t=xn(xr()),n=xn(wr()),i=nn(null),s=me(""),o=me(""),l=me(0),u=me(!1),c=me(!0),m=nn(null),f=nn(null),g=nn(null),P=qe(()=>g.value?Array.from(g.value,D=>Pr(D,t.coreSizeSpread)):null),w=me(n.speciesCount),A=me(0),B=me(0),y=me(localStorage.getItem(yi)!=="1"),Y=me(localStorage.getItem(ao)!=="0");function F(){Y.value=!Y.value,localStorage.setItem(ao,Y.value?"1":"0")}function R(D){D?localStorage.setItem(yi,"1"):localStorage.removeItem(yi)}let v=t.dt,T=0;async function U(D){i.value=D,await Xi(),_()}function _(){const D=i.value;if(D){try{D.restart({...n})}catch(V){o.value=V.message;return}o.value=D.maxCollisions<64?`Collision partners per agent reduced to ${D.maxCollisions} to fit GPU memory.`:"",m.value=D.matrix,f.value=D.philicity,g.value=D.sizeSeeds,w.value=n.speciesCount,A.value=D.agentCount,B.value=D.avgPerCell,T!==n.worldSizeMult&&(T=n.worldSizeMult,kt())}}const K=me(!1),ie=nn({}),ge=me("");function Ie(D=ge.value){return Du({params:t,startup:n,matrix:m.value,philicity:f.value,sizeSeeds:g.value,name:D})}function Ct(D=""){ge.value=D,ie.value=Ie(D),K.value=!0}function ut(D,V=""){ge.value=V||ge.value,D(Ie(V))}function Mt(D){const V=i.value;if(!V)return;let se;try{se=Lu(D,{params:t,startup:n})}catch(d){o.value=d.message;return}typeof D.name=="string"&&D.name.trim()&&(ge.value=D.name.trim()),se.needsRestart&&_(),se.matrix&&(V.uploadMatrix(se.matrix,se.philicity??V.philicity,se.sizeSeeds??V.sizeSeeds),m.value=V.matrix,f.value=V.philicity,g.value=V.sizeSeeds)}let Ke={};function Se(D={}){var S;const V=i.value;if(!V)return;Ke=D;const se=G(D),{params:d,startup:h,needsRestart:b,rerollMatrix:C}=Nu(D,vt(se,bt.randomConfig));Object.assign(t,d),Object.assign(n,h);const x=!C&&b?{matrix:m.value,philicity:f.value,sizeSeeds:g.value}:null;b&&_(),C?a({seed:!0}):x&&((S=x.matrix)==null?void 0:S.length)===V.speciesCount*V.speciesCount&&(V.uploadMatrix(x.matrix,x.philicity,x.sizeSeeds),m.value=V.matrix,f.value=V.philicity,g.value=V.sizeSeeds)}function de(){const D=i.value;if(!D)return;const V=new Float32Array(D.speciesCount*D.speciesCount);D.uploadMatrix(V,f.value),m.value=V}function ne({kind:D,i:V,j:se,value:d}){const h=i.value;if(h)if(D==="philicity"){const b=Float32Array.from(f.value);b[V]=d,h.uploadMatrix(m.value,b),f.value=b}else{const b=Float32Array.from(m.value);b[V*h.speciesCount+se]=d,h.uploadMatrix(b,f.value),m.value=b}}function G(D={}){return D.seed||(n.seed=gi()),n.seed}function a(D={}){const V=i.value;if(!V)return;const se=G(D),d=n.startingMethod%2===1,h=V.speciesCount,b=d?Mr(h,n.interactionRange,vt(se,bt.matrix)):Cr(h,n.interactionRange,vt(se,bt.matrix)),C=kr(h,vt(se,bt.philicity)),x=Rr(h,vt(se,bt.sizeSeeds));V.uploadMatrix(b,C,x),m.value=b,f.value=C,g.value=x}function p(){n.seed=gi(),_()}function Z(D={}){D.seed||(n.seed=gi()),_()}function ze(){u.value?(t.dt=v||.25,u.value=!1):(v=t.dt,t.dt=0,u.value=!0)}function Ve(D,V=0,se=0){const d=t.zoom,h=Math.min(lu,Math.max(ru,d*D));if(h===d)return;const b=1/d-1/h;t.zoom=h,t.cameraX+=V*b,t.cameraY+=se*b}function Me(D,V){t.cameraX-=D/t.zoom,t.cameraY-=V/t.zoom}function Re(){const D=document.querySelector(".panel");if(!D)return 0;const V=Math.min(window.devicePixelRatio||1,2);return D.getBoundingClientRect().width*V}function kt(){const D=i.value;if(!D){t.cameraX=0,t.cameraY=0,t.zoom=.1;return}const V=Re(),se=D.fitZoom(V);t.zoom=se,t.cameraX=V/(2*se),t.cameraY=0}function Vt(D){y.value||K.value||D.target.tagName==="INPUT"||D.target.tagName==="SELECT"||(D.code==="Space"?(D.preventDefault(),Se(Ke)):D.code==="KeyP"?ze():D.code==="KeyR"?_():D.code==="KeyG"?t.showGrid=!t.showGrid:D.code==="KeyM"?t.mediumEnabled=!t.mediumEnabled:D.code==="KeyV"?t.coreEnabled=!t.coreEnabled:D.code==="KeyF"?document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{}):D.code==="KeyB"?(t.blobsEnabled=!t.blobsEnabled,t.blobsEnabled&&(t.renderMode=1)):D.code==="KeyX"?t.renderMode=(t.renderMode+1)%3:D.code==="KeyH"?c.value=!c.value:D.code==="KeyC"&&kt())}return ei(()=>window.addEventListener("keydown",Vt)),Sn(()=>window.removeEventListener("keydown",Vt)),(D,V)=>(I(),L("div",$f,[$e(Cu,{params:t,onReady:U,onError:V[0]||(V[0]=se=>s.value=se),onFps:V[1]||(V[1]=se=>l.value=se),onZoom:Ve,onPan:Me},null,8,["params"]),Y.value?(I(),L("button",{key:0,class:"hud",title:"Hide stats",onClick:F},[r("span",Hf,k(l.value)+" fps",1),r("span",jf,k(A.value.toLocaleString())+" agents",1),r("span",Kf,k(w.value)+" species",1),r("span",qf,"zoom "+k(t.zoom.toFixed(3)),1),r("span",Yf," cam ("+k(t.cameraX.toFixed(0))+", "+k(t.cameraY.toFixed(0))+") ",1)])):(I(),L("button",{key:1,class:"hud collapsed",title:`Show stats — ${l.value} fps, ${A.value.toLocaleString()} agents`,onClick:F}," ▸ ",8,Jf)),c.value?ye("",!0):(I(),L("button",{key:2,class:"reveal",onClick:V[2]||(V[2]=se=>c.value=!0)},"Controls")),$($e(If,{params:t,startup:n,matrix:m.value,philicity:f.value,"core-sizes":P.value,"species-count":w.value,"avg-per-cell":B.value,notice:o.value,paused:u.value,onRestart:Z,onTogglePause:ze,onRandomizeMatrix:a,onRerollSeed:p,onRandomizeAll:Se,onLocks:V[3]||(V[3]=se=>Ee(Ke)?Ke.value=se:Ke=se),onEditMatrix:ne,onClearMatrix:de,onResetCamera:kt,onShowAbout:V[4]||(V[4]=se=>y.value=!0),"applied-name":ge.value,onShowConfig:Ct,onApplyConfig:Mt,onCaptureConfig:ut,onHide:V[5]||(V[5]=se=>c.value=!1)},null,8,["params","startup","matrix","philicity","core-sizes","species-count","avg-per-cell","notice","paused","applied-name"]),[[Oa,c.value]]),K.value?(I(),Ai(Gf,{key:3,config:ie.value,onClose:V[6]||(V[6]=se=>K.value=!1),onApply:Mt},null,8,["config"])):ye("",!0),y.value?(I(),Ai(Uf,{key:4,onClose:V[7]||(V[7]=se=>y.value=!1),"onUpdate:dontShowAgain":R})):ye("",!0),s.value?(I(),L("div",Xf,[V[8]||(V[8]=r("h2",null,"WebGPU unavailable",-1)),r("p",null,k(s.value),1)])):ye("",!0)]))}},Qf=Qt(Zf,[["__scopeId","data-v-7c539cf0"]]);nu(Qf).mount("#app");
