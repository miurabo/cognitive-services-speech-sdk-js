// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/* eslint-disable max-classes-per-file */
import { PropertyId } from "../sdk/Exports";
export var RecognitionMode;
(function (RecognitionMode) {
    RecognitionMode[RecognitionMode["Interactive"] = 0] = "Interactive";
    RecognitionMode[RecognitionMode["Conversation"] = 1] = "Conversation";
    RecognitionMode[RecognitionMode["Dictation"] = 2] = "Dictation";
})(RecognitionMode || (RecognitionMode = {}));
export var SpeechResultFormat;
(function (SpeechResultFormat) {
    SpeechResultFormat[SpeechResultFormat["Simple"] = 0] = "Simple";
    SpeechResultFormat[SpeechResultFormat["Detailed"] = 1] = "Detailed";
})(SpeechResultFormat || (SpeechResultFormat = {}));
export class RecognizerConfig {
    constructor(speechServiceConfig, parameters) {
        this.privSpeechServiceConfig = speechServiceConfig ? speechServiceConfig : new SpeechServiceConfig(new Context(null));
        this.privParameters = parameters;
        this.privMaxRetryCount = parseInt(parameters.getProperty("SPEECH-Error-MaxRetryCount", "4"), 10);
        this.privLanguageIdMode = parameters.getProperty(PropertyId.SpeechServiceConnection_LanguageIdMode, undefined);
        this.privEnableSpeakerId = false;
    }
    get parameters() {
        return this.privParameters;
    }
    get recognitionMode() {
        return this.privRecognitionMode;
    }
    set recognitionMode(value) {
        this.privRecognitionMode = value;
        this.privRecognitionActivityTimeout = value === RecognitionMode.Interactive ? 8000 : 25000;
        this.privSpeechServiceConfig.Recognition = RecognitionMode[value];
    }
    get SpeechServiceConfig() {
        return this.privSpeechServiceConfig;
    }
    get recognitionActivityTimeout() {
        return this.privRecognitionActivityTimeout;
    }
    get isContinuousRecognition() {
        return this.privRecognitionMode !== RecognitionMode.Interactive;
    }
    get languageIdMode() {
        return this.privLanguageIdMode;
    }
    get autoDetectSourceLanguages() {
        return this.parameters.getProperty(PropertyId.SpeechServiceConnection_AutoDetectSourceLanguages, undefined);
    }
    get recognitionEndpointVersion() {
        return this.parameters.getProperty(PropertyId.SpeechServiceConnection_RecognitionEndpointVersion, undefined);
    }
    get sourceLanguageModels() {
        const models = [];
        let modelsExist = false;
        if (this.autoDetectSourceLanguages !== undefined) {
            for (const language of this.autoDetectSourceLanguages.split(",")) {
                const customProperty = language + PropertyId.SpeechServiceConnection_EndpointId.toString();
                const modelId = this.parameters.getProperty(customProperty, undefined);
                if (modelId !== undefined) {
                    models.push({ language, endpoint: modelId });
                    modelsExist = true;
                }
                else {
                    models.push({ language, endpoint: "" });
                }
            }
        }
        return modelsExist ? models : undefined;
    }
    get maxRetryCount() {
        return this.privMaxRetryCount;
    }
    get isSpeakerDiarizationEnabled() {
        return this.privEnableSpeakerId;
    }
    set isSpeakerDiarizationEnabled(value) {
        this.privEnableSpeakerId = value;
    }
}
// The config is serialized and sent as the Speech.Config
export class SpeechServiceConfig {
    constructor(context) {
        this.context = context;
    }
    serialize() {
        return JSON.stringify(this, (key, value) => {
            if (value && typeof value === "object") {
                const replacement = {};
                for (const k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        replacement[k && k.charAt(0).toLowerCase() + k.substring(1)] = value[k];
                    }
                }
                return replacement;
            }
            return value;
        });
    }
    get Context() {
        return this.context;
    }
    get Recognition() {
        return this.recognition;
    }
    set Recognition(value) {
        this.recognition = value.toLowerCase();
    }
}
export class Context {
    constructor(os) {
        this.system = new System();
        this.os = os;
    }
}
export class System {
    constructor() {
        // Note: below will be patched for official builds.
        const SPEECHSDK_CLIENTSDK_VERSION = "1.15.0-alpha.0.1";
        this.name = "SpeechSDK";
        this.version = SPEECHSDK_CLIENTSDK_VERSION;
        this.build = "JavaScript";
        this.lang = "JavaScript";
    }
}
export class OS {
    constructor(platform, name, version) {
        this.platform = platform;
        this.name = name;
        this.version = version;
    }
}
export class Device {
    constructor(manufacturer, model, version) {
        this.manufacturer = manufacturer;
        this.model = model;
        this.version = version;
    }
}
export var connectivity;
(function (connectivity) {
    connectivity["Bluetooth"] = "Bluetooth";
    connectivity["Wired"] = "Wired";
    connectivity["WiFi"] = "WiFi";
    connectivity["Cellular"] = "Cellular";
    connectivity["InBuilt"] = "InBuilt";
    connectivity["Unknown"] = "Unknown";
})(connectivity || (connectivity = {}));
export var type;
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
})(type || (type = {}));

//# sourceMappingURL=RecognizerConfig.js.map
