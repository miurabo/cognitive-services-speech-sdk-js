"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestMessageAdapter = exports.RestRequestType = void 0;
var bent_1 = __importDefault(require("bent"));
var Exports_1 = require("../common/Exports");
var RestRequestType;
(function (RestRequestType) {
    RestRequestType["Get"] = "GET";
    RestRequestType["Post"] = "POST";
    RestRequestType["Delete"] = "DELETE";
    RestRequestType["File"] = "file";
})(RestRequestType = exports.RestRequestType || (exports.RestRequestType = {}));
// accept rest operations via request method and return abstracted objects from server response
var RestMessageAdapter = /** @class */ (function () {
    function RestMessageAdapter(configParams) {
        if (!configParams) {
            throw new Exports_1.ArgumentNullError("configParams");
        }
        this.privHeaders = configParams.headers;
        this.privIgnoreCache = configParams.ignoreCache;
    }
    RestMessageAdapter.extractHeaderValue = function (headerKey, headers) {
        var headerValue = "";
        try {
            var arr = headers.trim().split(/[\r\n]+/);
            var headerMap_1 = {};
            arr.forEach(function (line) {
                var parts = line.split(": ");
                var header = parts.shift().toLowerCase();
                var value = parts.join(": ");
                headerMap_1[header] = value;
            });
            headerValue = headerMap_1[headerKey.toLowerCase()];
        }
        catch (e) {
            // ignore the error
        }
        return headerValue;
    };
    Object.defineProperty(RestMessageAdapter.prototype, "options", {
        set: function (configParams) {
            this.privHeaders = configParams.headers;
            this.privIgnoreCache = configParams.ignoreCache;
        },
        enumerable: false,
        configurable: true
    });
    RestMessageAdapter.prototype.setHeaders = function (key, value) {
        this.privHeaders[key] = value;
    };
    RestMessageAdapter.prototype.request = function (method, uri, queryParams, body) {
        var _this = this;
        if (queryParams === void 0) { queryParams = {}; }
        if (body === void 0) { body = null; }
        var responseReceivedDeferral = new Exports_1.Deferred();
        var requestCommand = method === RestRequestType.File ? "POST" : method;
        var handleRestResponse = function (data, j) {
            if (j === void 0) { j = {}; }
            var d = data;
            return {
                data: JSON.stringify(j),
                headers: JSON.stringify(data.headers),
                json: j,
                ok: data.statusCode >= 200 && data.statusCode < 300,
                status: data.statusCode,
                statusText: j.error ? j.error.message : d.statusText ? d.statusText : d.statusMessage
            };
        };
        var send = function (postData) {
            var sendRequest = bent_1.default(uri, requestCommand, _this.privHeaders, 200, 201, 202, 204, 400, 401, 402, 403, 404);
            var params = _this.queryParams(queryParams) === "" ? "" : "?" + _this.queryParams(queryParams);
            sendRequest(params, postData).then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                var j, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(method === RestRequestType.Delete || data.statusCode === 204)) return [3 /*break*/, 1];
                            // No JSON from Delete and reset (204) operations
                            responseReceivedDeferral.resolve(handleRestResponse(data));
                            return [3 /*break*/, 4];
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, data.json()];
                        case 2:
                            j = _b.sent();
                            responseReceivedDeferral.resolve(handleRestResponse(data, j));
                            return [3 /*break*/, 4];
                        case 3:
                            _a = _b.sent();
                            responseReceivedDeferral.resolve(handleRestResponse(data));
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); }).catch(function (error) {
                responseReceivedDeferral.reject(error);
            });
        };
        if (this.privIgnoreCache) {
            this.privHeaders["Cache-Control"] = "no-cache";
        }
        if (method === RestRequestType.Post && body) {
            this.privHeaders["content-type"] = "application/json";
            this.privHeaders["Content-Type"] = "application/json";
        }
        send(body);
        return responseReceivedDeferral.promise;
    };
    RestMessageAdapter.prototype.queryParams = function (params) {
        if (params === void 0) { params = {}; }
        return Object.keys(params)
            .map(function (k) { return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]); })
            .join("&");
    };
    return RestMessageAdapter;
}());
exports.RestMessageAdapter = RestMessageAdapter;

//# sourceMappingURL=RestMessageAdapter.js.map
