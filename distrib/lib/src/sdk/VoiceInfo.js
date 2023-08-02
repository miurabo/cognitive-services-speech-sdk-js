"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceInfo = exports.SynthesisVoiceType = exports.SynthesisVoiceGender = void 0;
/**
 * Defines the gender of synthesis voices.
 * Added in version 1.20.0.
 */
var SynthesisVoiceGender;
(function (SynthesisVoiceGender) {
    /** Gender unknown */
    SynthesisVoiceGender[SynthesisVoiceGender["Unknown"] = 0] = "Unknown";
    /** Female voice */
    SynthesisVoiceGender[SynthesisVoiceGender["Female"] = 1] = "Female";
    /** Male voice */
    SynthesisVoiceGender[SynthesisVoiceGender["Male"] = 2] = "Male";
})(SynthesisVoiceGender = exports.SynthesisVoiceGender || (exports.SynthesisVoiceGender = {}));
var SynthesisVoiceType;
(function (SynthesisVoiceType) {
    SynthesisVoiceType[SynthesisVoiceType["OnlineNeural"] = 1] = "OnlineNeural";
    SynthesisVoiceType[SynthesisVoiceType["OnlineStandard"] = 2] = "OnlineStandard";
    SynthesisVoiceType[SynthesisVoiceType["OfflineNeural"] = 3] = "OfflineNeural";
    SynthesisVoiceType[SynthesisVoiceType["OfflineStandard"] = 4] = "OfflineStandard";
})(SynthesisVoiceType = exports.SynthesisVoiceType || (exports.SynthesisVoiceType = {}));
/**
 * Information about Speech Synthesis voice
 * Added in version 1.20.0.
 * @class VoiceInfo
 */
var VoiceInfo = /** @class */ (function () {
    function VoiceInfo(json) {
        this.privStyleList = [];
        this.privVoicePath = "";
        if (!!json) {
            this.privName = json.Name;
            this.privLocale = json.Locale;
            this.privShortName = json.ShortName;
            this.privLocaleName = json.LocaleName;
            this.privDisplayName = json.DisplayName;
            this.privLocalName = json.LocalName;
            this.privVoiceType = json.VoiceType.endsWith("Standard") ? SynthesisVoiceType.OnlineStandard : SynthesisVoiceType.OnlineNeural;
            this.privGender = json.Gender === "Male" ? SynthesisVoiceGender.Male : json.Gender === "Female" ? SynthesisVoiceGender.Female : SynthesisVoiceGender.Unknown;
            if (!!json.StyleList && Array.isArray(json.StyleList)) {
                for (var _i = 0, _a = json.StyleList; _i < _a.length; _i++) {
                    var style = _a[_i];
                    this.privStyleList.push(style);
                }
            }
        }
    }
    Object.defineProperty(VoiceInfo.prototype, "name", {
        get: function () {
            return this.privName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoiceInfo.prototype, "locale", {
        get: function () {
            return this.privLocale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoiceInfo.prototype, "shortName", {
        get: function () {
            return this.privShortName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoiceInfo.prototype, "displayName", {
        get: function () {
            return this.privDisplayName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoiceInfo.prototype, "localName", {
        get: function () {
            return this.privLocalName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoiceInfo.prototype, "localeName", {
        get: function () {
            return this.privLocaleName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoiceInfo.prototype, "gender", {
        get: function () {
            return this.privGender;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoiceInfo.prototype, "voiceType", {
        get: function () {
            return this.privVoiceType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoiceInfo.prototype, "styleList", {
        get: function () {
            return this.privStyleList;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoiceInfo.prototype, "voicePath", {
        get: function () {
            return this.privVoicePath;
        },
        enumerable: false,
        configurable: true
    });
    return VoiceInfo;
}());
exports.VoiceInfo = VoiceInfo;

//# sourceMappingURL=VoiceInfo.js.map
