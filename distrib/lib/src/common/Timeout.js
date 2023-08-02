"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeout = void 0;
var Timeout = /** @class */ (function () {
    function Timeout() {
    }
    Timeout.load = function () {
        // Prefilling the Maps with a function indexed by zero is necessary to be compliant with the specification.
        var scheduledTimeoutFunctions = new Map([[0, function () { }]]); // eslint-disable-line @typescript-eslint/no-empty-function
        var unhandledRequests = new Map();
        // eslint-disable-next-line
        var workerScript = "!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(e,\"__esModule\",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&\"object\"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,\"default\",{enumerable:!0,value:e}),2&t&&\"string\"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,\"a\",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p=\"\",n(n.s=14)}([function(e,t,n){\"use strict\";n.d(t,\"a\",(function(){return i})),n.d(t,\"b\",(function(){return u})),n.d(t,\"c\",(function(){return a})),n.d(t,\"d\",(function(){return d}));const r=new Map,o=new Map,i=e=>{const t=r.get(e);if(void 0===t)throw new Error('There is no interval scheduled with the given id \"'.concat(e,'\".'));clearTimeout(t),r.delete(e)},u=e=>{const t=o.get(e);if(void 0===t)throw new Error('There is no timeout scheduled with the given id \"'.concat(e,'\".'));clearTimeout(t),o.delete(e)},f=(e,t)=>{let n,r;if(\"performance\"in self){const o=performance.now();n=o,r=e-Math.max(0,o-t)}else n=Date.now(),r=e;return{expected:n+r,remainingDelay:r}},c=(e,t,n,r)=>{const o=\"performance\"in self?performance.now():Date.now();o>n?postMessage({id:null,method:\"call\",params:{timerId:t}}):e.set(t,setTimeout(c,n-o,e,t,n))},a=(e,t,n)=>{const{expected:o,remainingDelay:i}=f(e,n);r.set(t,setTimeout(c,i,r,t,o))},d=(e,t,n)=>{const{expected:r,remainingDelay:i}=f(e,n);o.set(t,setTimeout(c,i,o,t,r))}},function(e,t,n){\"use strict\";n.r(t);var r=n(2);for(var o in r)\"default\"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);var i=n(3);for(var o in i)\"default\"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);var u=n(4);for(var o in u)\"default\"!==o&&function(e){n.d(t,e,(function(){return u[e]}))}(o);var f=n(5);for(var o in f)\"default\"!==o&&function(e){n.d(t,e,(function(){return f[e]}))}(o);var c=n(6);for(var o in c)\"default\"!==o&&function(e){n.d(t,e,(function(){return c[e]}))}(o);var a=n(7);for(var o in a)\"default\"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);var d=n(8);for(var o in d)\"default\"!==o&&function(e){n.d(t,e,(function(){return d[e]}))}(o);var s=n(9);for(var o in s)\"default\"!==o&&function(e){n.d(t,e,(function(){return s[e]}))}(o)},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t,n){\"use strict\";n.r(t);var r=n(11);for(var o in r)\"default\"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);var i=n(12);for(var o in i)\"default\"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);var u=n(13);for(var o in u)\"default\"!==o&&function(e){n.d(t,e,(function(){return u[e]}))}(o)},function(e,t){},function(e,t){},function(e,t){},function(e,t,n){\"use strict\";n.r(t);var r=n(0),o=n(1);for(var i in o)\"default\"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);var u=n(10);for(var i in u)\"default\"!==i&&function(e){n.d(t,e,(function(){return u[e]}))}(i);addEventListener(\"message\",({data:e})=>{try{if(\"clear\"===e.method){const{id:t,params:{timerId:n}}=e;Object(r.b)(n),postMessage({error:null,id:t})}else{if(\"set\"!==e.method)throw new Error('The given method \"'.concat(e.method,'\" is not supported'));{const{params:{delay:t,now:n,timerId:o}}=e;Object(r.d)(t,o,n)}}}catch(t){postMessage({error:{message:t.message},id:e.id,result:null})}})}]);";
        var workerUrl = "data:text/javascript;base64," + btoa(workerScript);
        var worker = new Worker(workerUrl);
        worker.addEventListener("message", function (_a) {
            var data = _a.data;
            if (Timeout.isCallNotification(data)) {
                var timerId = data.params.timerId;
                var idOrFunc = scheduledTimeoutFunctions.get(timerId);
                if (typeof idOrFunc === "number") {
                    var unhandledTimerId = unhandledRequests.get(idOrFunc);
                    if (unhandledTimerId === undefined ||
                        unhandledTimerId !== timerId) {
                        throw new Error("The timer is in an undefined state.");
                    }
                }
                else if (typeof idOrFunc !== "undefined") {
                    idOrFunc();
                    // A timeout can be safely deleted because it is only called once.
                    scheduledTimeoutFunctions.delete(timerId);
                }
                else {
                    throw new Error("The timer is in an undefined state.");
                }
            }
            else if (Timeout.isClearResponse(data)) {
                var id = data.id;
                var unhandledTimerId = unhandledRequests.get(id);
                if (unhandledTimerId === undefined) {
                    throw new Error("The timer is in an undefined state.");
                }
                unhandledRequests.delete(id);
                scheduledTimeoutFunctions.delete(unhandledTimerId);
            }
            else {
                var message = data.error.message;
                throw new Error(message);
            }
        });
        var clearTimeout = function (timerId) {
            var id = Math.random();
            unhandledRequests.set(id, timerId);
            scheduledTimeoutFunctions.set(timerId, id);
            worker.postMessage({
                id: id,
                method: "clear",
                params: { timerId: timerId }
            });
        };
        var setTimeout = function (func, delay) {
            var timerId = Math.random();
            scheduledTimeoutFunctions.set(timerId, func);
            worker.postMessage({
                id: null,
                method: "set",
                params: {
                    delay: delay,
                    now: performance.now(),
                    timerId: timerId
                }
            });
            return timerId;
        };
        return {
            clearTimeout: clearTimeout,
            setTimeout: setTimeout
        };
    };
    Timeout.loadWorkerTimers = function () {
        return function () {
            if (Timeout.workerTimers !== null) {
                return Timeout.workerTimers;
            }
            Timeout.workerTimers = Timeout.load();
            return Timeout.workerTimers;
        };
    };
    Timeout.isCallNotification = function (message) {
        return message.method !== undefined && message.method === "call";
    };
    Timeout.isClearResponse = function (message) {
        return message.error === null && typeof message.id === "number";
    };
    Timeout.workerTimers = null;
    Timeout.clearTimeout = function (timerId) { return Timeout.timers().clearTimeout(timerId); };
    Timeout.setTimeout = function (func, delay) { return Timeout.timers().setTimeout(func, delay); };
    Timeout.timers = Timeout.loadWorkerTimers();
    return Timeout;
}());
exports.Timeout = Timeout;

//# sourceMappingURL=Timeout.js.map
