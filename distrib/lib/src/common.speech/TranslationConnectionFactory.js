"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationConnectionFactory = void 0;
var Exports_1 = require("../common.browser/Exports");
var StringUtils_1 = require("../common/StringUtils");
var Exports_2 = require("../sdk/Exports");
var ConnectionFactoryBase_1 = require("./ConnectionFactoryBase");
var Exports_3 = require("./Exports");
var HeaderNames_1 = require("./HeaderNames");
var QueryParameterNames_1 = require("./QueryParameterNames");
var TranslationConnectionFactory = /** @class */ (function (_super) {
    __extends(TranslationConnectionFactory, _super);
    function TranslationConnectionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TranslationConnectionFactory.prototype.create = function (config, authInfo, connectionId) {
        var endpoint = this.getEndpointUrl(config);
        var queryParams = {};
        if (config.autoDetectSourceLanguages !== undefined) {
            queryParams[QueryParameterNames_1.QueryParameterNames.EnableLanguageId] = "true";
        }
        this.setQueryParams(queryParams, config, endpoint);
        var headers = {};
        if (authInfo.token !== undefined && authInfo.token !== "") {
            headers[authInfo.headerName] = authInfo.token;
        }
        headers[HeaderNames_1.HeaderNames.ConnectionId] = connectionId;
        config.parameters.setProperty(Exports_2.PropertyId.SpeechServiceConnection_Url, endpoint);
        var enableCompression = config.parameters.getProperty("SPEECH-EnableWebsocketCompression", "false") === "true";
        return new Exports_1.WebsocketConnection(endpoint, queryParams, headers, new Exports_3.WebsocketMessageFormatter(), Exports_1.ProxyInfo.fromRecognizerConfig(config), enableCompression, connectionId);
    };
    TranslationConnectionFactory.prototype.getEndpointUrl = function (config, returnRegionPlaceholder) {
        var region = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Region);
        var hostSuffix = ConnectionFactoryBase_1.ConnectionFactoryBase.getHostSuffix(region);
        var endpointUrl = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Endpoint, undefined);
        if (!endpointUrl) {
            if (config.autoDetectSourceLanguages !== undefined) {
                var host = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Host, "wss://{region}.stt.speech" + hostSuffix);
                endpointUrl = host + "/speech/universal/v2";
            }
            else {
                var host = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Host, "wss://{region}.s2s.speech" + hostSuffix);
                endpointUrl = host + "/speech/translation/cognitiveservices/v1";
            }
        }
        if (returnRegionPlaceholder === true) {
            return endpointUrl;
        }
        return StringUtils_1.StringUtils.formatString(endpointUrl, { region: region });
    };
    TranslationConnectionFactory.prototype.setQueryParams = function (queryParams, config, endpointUrl) {
        queryParams.from = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_RecoLanguage);
        queryParams.to = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_TranslationToLanguages);
        this.setCommonUrlParams(config, queryParams, endpointUrl);
        this.setUrlParameter(Exports_2.PropertyId.SpeechServiceResponse_TranslationRequestStablePartialResult, QueryParameterNames_1.QueryParameterNames.StableTranslation, config, queryParams, endpointUrl);
        var translationVoice = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_TranslationVoice, undefined);
        if (translationVoice !== undefined) {
            queryParams.voice = translationVoice;
            queryParams.features = "texttospeech";
        }
    };
    return TranslationConnectionFactory;
}(ConnectionFactoryBase_1.ConnectionFactoryBase));
exports.TranslationConnectionFactory = TranslationConnectionFactory;

//# sourceMappingURL=TranslationConnectionFactory.js.map
