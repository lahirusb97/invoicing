"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[561],{55496:function(e,r,n){n.d(r,{Cp:function(){return p},F_:function(){return l},Rp:function(){return f}});var t=n(53085),u=n(2265);/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function o(e,r,n,t){return new(n||(n=Promise))(function(u,o){function a(e){try{i(t.next(e))}catch(e){o(e)}}function c(e){try{i(t.throw(e))}catch(e){o(e)}}function i(e){var r;e.done?u(e.value):((r=e.value)instanceof n?r:new n(function(e){e(r)})).then(a,c)}i((t=t.apply(e,r||[])).next())})}function a(e,r){var n,t,u,o,a={label:0,sent:function(){if(1&u[0])throw u[1];return u[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw TypeError("Generator is already executing.");for(;a;)try{if(n=1,t&&(u=2&o[0]?t.return:o[0]?t.throw||((u=t.return)&&u.call(t),0):t.next)&&!(u=u.call(t,o[1])).done)return u;switch(t=0,u&&(o=[2&o[0],u.value]),o[0]){case 0:case 1:u=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,t=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(u=(u=a.trys).length>0&&u[u.length-1])&&(6===o[0]||2===o[0])){a=0;continue}if(3===o[0]&&(!u||o[1]>u[0]&&o[1]<u[3])){a.label=o[1];break}if(6===o[0]&&a.label<u[1]){a.label=u[1],u=o;break}if(u&&a.label<u[2]){a.label=u[2],a.ops.push(o);break}u[2]&&a.ops.pop(),a.trys.pop();continue}o=r.call(e,a)}catch(e){o=[6,e],t=0}finally{n=u=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}}/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var c=function(){return(c=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++)for(var u in r=arguments[n])Object.prototype.hasOwnProperty.call(r,u)&&(e[u]=r[u]);return e}).apply(this,arguments)},i=function(e){return{loading:null==e,value:e}},s=function(e){var r=e?e():void 0,n=(0,u.useReducer)(function(e,r){switch(r.type){case"error":return c(c({},e),{error:r.error,loading:!1,value:void 0});case"reset":return i(r.defaultValue);case"value":return c(c({},e),{error:void 0,loading:!1,value:r.value});default:return e}},i(r)),t=n[0],o=n[1],a=(0,u.useCallback)(function(){o({type:"reset",defaultValue:e?e():void 0})},[e]),s=(0,u.useCallback)(function(e){o({type:"error",error:e})},[]),l=(0,u.useCallback)(function(e){o({type:"value",value:e})},[]);return(0,u.useMemo)(function(){return{error:t.error,loading:t.loading,reset:a,setError:s,setValue:l,value:t.value}},[t.error,t.loading,a,s,l,t.value])},l=function(e,r){var n=s(function(){return e.currentUser}),c=n.error,i=n.loading,l=n.setError,f=n.setValue,p=n.value;return(0,u.useEffect)(function(){var n=(0,t.Aj)(e,function(e){return o(void 0,void 0,void 0,function(){return a(this,function(n){switch(n.label){case 0:if(!(null==r?void 0:r.onUserChanged))return[3,4];n.label=1;case 1:return n.trys.push([1,3,,4]),[4,r.onUserChanged(e)];case 2:return n.sent(),[3,4];case 3:return l(n.sent()),[3,4];case 4:return f(e),[2]}})})},l);return function(){n()}},[e]),[p,i,c]},f=function(e,r){var n=(0,u.useState)(),c=n[0],i=n[1],s=(0,u.useState)(),l=s[0],f=s[1],p=(0,u.useState)(!1),v=p[0],y=p[1];return[(0,u.useCallback)(function(n,u){return o(void 0,void 0,void 0,function(){var o;return a(this,function(a){switch(a.label){case 0:y(!0),i(void 0),a.label=1;case 1:return a.trys.push([1,5,6,7]),[4,(0,t.Xb)(e,n,u)];case 2:if(o=a.sent(),!(r&&r.sendEmailVerification&&o.user))return[3,4];return[4,(0,t.w$)(o.user,r.emailVerificationOptions)];case 3:a.sent(),a.label=4;case 4:return f(o),[2,o];case 5:return i(a.sent()),[3,7];case 6:return y(!1),[7];case 7:return[2]}})})},[e,r]),l,v,c]},p=function(e){var r=(0,u.useState)(),n=r[0],c=r[1],i=(0,u.useState)(),s=i[0],l=i[1],f=(0,u.useState)(!1),p=f[0],v=f[1];return[(0,u.useCallback)(function(r,n){return o(void 0,void 0,void 0,function(){var u;return a(this,function(o){switch(o.label){case 0:v(!0),c(void 0),o.label=1;case 1:return o.trys.push([1,3,4,5]),[4,(0,t.e5)(e,r,n)];case 2:return l(u=o.sent()),[2,u];case 3:return c(o.sent()),[3,5];case 4:return v(!1),[7];case 5:return[2]}})})},[e]),s,p,n]}},20994:function(e,r,n){n.d(r,{C6:function(){return t.C6},Mq:function(){return t.Mq},ZF:function(){return t.ZF}});var t=n(63991);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(0,t.KN)("firebase","10.7.1","app")},53085:function(e,r,n){n.d(r,{Xb:function(){return t.aa},v0:function(){return t.o},Aj:function(){return t.y},w$:function(){return t.ag},e5:function(){return t.ab},w7:function(){return t.C}});var t=n(57350);n(8745),n(63991),n(56914),n(45538)},50044:function(e,r,n){n.d(r,{ZT:function(){return u},_T:function(){return a},pi:function(){return o}});var t=function(e,r){return(t=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])})(e,r)};function u(e,r){if("function"!=typeof r&&null!==r)throw TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}var o=function(){return(o=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++)for(var u in r=arguments[n])Object.prototype.hasOwnProperty.call(r,u)&&(e[u]=r[u]);return e}).apply(this,arguments)};function a(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&0>r.indexOf(t)&&(n[t]=e[t]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var u=0,t=Object.getOwnPropertySymbols(e);u<t.length;u++)0>r.indexOf(t[u])&&Object.prototype.propertyIsEnumerable.call(e,t[u])&&(n[t[u]]=e[t[u]]);return n}"function"==typeof SuppressedError&&SuppressedError}}]);