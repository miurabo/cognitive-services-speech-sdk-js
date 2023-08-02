"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.type = exports.connectivity = exports.Device = exports.OS = exports.System = exports.Context = exports.SpeechServiceConfig = exports.RecognizerConfig = exports.SpeechResultFormat = exports.RecognitionMode = void 0;
/* eslint-disable max-classes-per-file */
var Exports_1 = require("../sdk/Exports");
var RecognitionMode;
(function (RecognitionMode) {
    RecognitionMode[RecognitionMode["Interactive"] = 0] = "Interactive";
    RecognitionMode[RecognitionMode["Conversation"] = 1] = "Conversation";
    RecognitionMode[RecognitionMode["Dictation"] = 2] = "Dictation";
})(RecognitionMode = exports.RecognitionMode || (exports.RecognitionMode = {}));
var SpeechResultFormat;
(function (SpeechResultFormat) {
    SpeechResultFormat[SpeechResultFormat["Simple"] = 0] = "Simple";
    SpeechResultFormat[SpeechResultFormat["Detailed"] = 1] = "Detailed";
})(SpeechResultFormat = exports.SpeechResultFormat || (exports.SpeechResultFormat = {}));
var RecognizerConfig = /** @class */ (function () {
    function RecognizerConfig(speechServiceConfig, parameters) {
        this.privSpeechServiceConfig = speechServiceConfig ? speechServiceConfig : new SpeechServiceConfig(new Context(null));
        this.privParameters = parameters;
        this.privMaxRetryCount = parseInt(parameters.getProperty("SPEECH-Error-MaxRetryCount", "4"), 10);
        this.privLanguageIdMode = parameters.getProperty(Exports_1.PropertyId.SpeechServiceConnection_LanguageIdMode, undefined);
        this.privEnableSpeakerId = false;
    }
    Object.defineProperty(RecognizerConfig.prototype, "parameters", {
        get: function () {
            return this.privParameters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecognizerConfig.prototype, "recognitionMode", {
        get: function () {
            return this.privRecognitionMode;
        },
        set: function (value) {
            this.privRecognitionMode = value;
            this.privRecognitionActivityTimeout = value === RecognitionMode.Interactive ? 8000 : 25000;
            this.privSpeechServiceConfig.Recognition = RecognitionMode[value];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecognizerConfig.prototype, "SpeechServiceConfig", {
        get: function () {
            return this.privSpeechServiceConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecognizerConfig.prototype, "recognitionActivityTimeout", {
        get: function () {
            return this.privRecognitionActivityTimeout;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecognizerConfig.prototype, "isContinuousRecognition", {
        get: function () {
            return this.privRecognitionMode !== RecognitionMode.Interactive;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecognizerConfig.prototype, "languageIdMode", {
        get: function () {
            return this.privLanguageIdMode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecognizerConfig.prototype, "autoDetectSourceLanguages", {
        get: function () {
            return this.parameters.getProperty(Exports_1.PropertyId.SpeechServiceConnection_AutoDetectSourceLanguages, undefined);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecognizerConfig.prototype, "recognitionEndpointVersion", {
        get: function () {
            return this.parameters.getProperty(Exports_1.PropertyId.SpeechServiceConnection_RecognitionEndpointVersion, undefined);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecognizerConfig.prototype, "sourceLanguageModels", {
        get: function () {
            var models = [];
            var modelsExist = false;
            if (this.autoDetectSourceLanguages !== undefined) {
                for (var _i = 0, _a = this.autoDetectSourceLanguages.split(","); _i < _a.length; _i++) {
                    var language = _a[_i];
                    var customProperty = language + Exports_1.PropertyId.SpeechServiceConnection_EndpointId.toString();
                    var modelId = this.parameters.getProperty(customProperty, undefined);
                    if (modelId !== undefined) {
                        models.push({ language: language, endpoint: modelId });
                        modelsExist = true;
                    }
                    else {
                        models.push({ language: language, endpoint: "" });
                    }
                }
            }
            return modelsExist ? models : undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecognizerConfig.prototype, "maxRetryCount", {
        get: function () {
            return this.privMaxRetryCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecognizerConfig.prototype, "isSpeakerDiarizationEnabled", {
        get: function () {
            return this.privEnableSpeakerId;
        },
        set: function (value) {
            this.privEnableSpeakerId = value;
        },
        enumerable: false,
        configurable: true
    });
    return RecognizerConfig;
}());
exports.RecognizerConfig = RecognizerConfig;
// The config is serialized and sent as the Speech.Config
var SpeechServiceConfig = /** @class */ (function () {
    function SpeechServiceConfig(context) {
        this.context = context;
    }
    SpeechServiceConfig.prototype.serialize = function () {
        return JSON.stringify(this, function (key, value) {
            if (value && typeof value === "object") {
                var replacement = {};
                for (var k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        replacement[k && k.charAt(0).toLowerCase() + k.substring(1)] = value[k];
                    }
                }
                return replacement;
            }
            return value;
        });
    };
    Object.defineProperty(SpeechServiceConfig.prototype, "Context", {
        get: function () {
            return this.context;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechServiceConfig.prototype, "Recognition", {
        get: function () {
            return this.recognition;
        },
        set: function (value) {
            this.recognition = value.toLowerCase();
        },
        enumerable: false,
        configurable: true
    });
    return SpeechServiceConfig;
}());
exports.SpeechServiceConfig = SpeechServiceConfig;
var Context = /** @class */ (function () {
    function Context(os) {
        this.system = new System();
        this.os = os;
    }
    return Context;
}());
exports.Context = Context;
var System = /** @class */ (function () {
    function System() {
        // Note: below will be patched for official builds.
        var SPEECHSDK_CLIENTSDK_VERSION = "1.15.0-alpha.0.1";
        this.name = "SpeechSDK";
        this.version = SPEECHSDK_CLIENTSDK_VERSION;
        this.build = "JavaScript";
        this.lang = "JavaScript";
    }
    return System;
}());
exports.System = System;
var OS = /** @class */ (function () {
    function OS(platform, name, version) {
        this.platform = platform;
        this.name = name;
        this.version = version;
    }
    return OS;
}());
exports.OS = OS;
var Device = /** @class */ (function () {
    function Device(manufacturer, model, version) {
        this.manufacturer = manufacturer;
        this.model = model;
        this.version = version;
    }
    return Device;
}());
exports.Device = Device;
var connectivity;
(function (connectivity) {
    connectivity["Bluetooth"] = "Bluetooth";
    connectivity["Wired"] = "Wired";
    connectivity["WiFi"] = "WiFi";
    connectivity["Cellular"] = "Cellular";
    connectivity["InBuilt"] = "InBuilt";
    connectivity["Unknown"] = "Unknown";
})(connectivity = exports.connectivity || (exports.connectivity = {}));
var type;
(function (type) {
    type["Phone"] = "Phone";
    type["Speaker"] = "Speaker";
    type["Car"] = "Car";
    type["Headset"] = "Headset";
    type["Thermostat"] = "Thermostat";
    type["Microphones"] = "Microphones";
    type["Deskphone"] = "Deskphone";
    type["RemoteControl"] = "RemoteControl";
    type["Unknown"] = "Unknown";
    type["File"] = "File";
    type["Stream"] = "Stream";
})(type = exports.type || (exports.type = {}));

//# sourceMappingURL=RecognizerConfig.js.map
