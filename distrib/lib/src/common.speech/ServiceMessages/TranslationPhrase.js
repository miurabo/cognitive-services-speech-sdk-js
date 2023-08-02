"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationPhrase = void 0;
var Contracts_1 = require("../../sdk/Contracts");
var Exports_1 = require("../Exports");
var TranslationStatus_1 = require("../TranslationStatus");
var TranslationPhrase = /** @class */ (function () {
    function TranslationPhrase(phrase) {
        this.privTranslationPhrase = phrase;
        this.privTranslationPhrase.RecognitionStatus = Exports_1.RecognitionStatus[this.privTranslationPhrase.RecognitionStatus];
        if (this.privTranslationPhrase.Translation !== undefined) {
            this.privTranslationPhrase.Translation.TranslationStatus = TranslationStatus_1.TranslationStatus[this.privTranslationPhrase.Translation.TranslationStatus];
        }
    }
    TranslationPhrase.fromJSON = function (json) {
        return new TranslationPhrase(JSON.parse(json));
    };
    TranslationPhrase.fromTranslationResponse = function (translationResponse) {
        Contracts_1.Contracts.throwIfNullOrUndefined(translationResponse, "translationResponse");
        var phrase = translationResponse.SpeechPhrase;
        translationResponse.SpeechPhrase = undefined;
        phrase.Translation = translationResponse;
        phrase.Text = phrase.DisplayText;
        return new TranslationPhrase(phrase);
    };
    Object.defineProperty(TranslationPhrase.prototype, "RecognitionStatus", {
        get: function () {
            return this.privTranslationPhrase.RecognitionStatus;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TranslationPhrase.prototype, "Offset", {
        get: function () {
            return this.privTranslationPhrase.Offset;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TranslationPhrase.prototype, "Duration", {
        get: function () {
            return this.privTranslationPhrase.Duration;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TranslationPhrase.prototype, "Text", {
        get: function () {
            return this.privTranslationPhrase.Text;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TranslationPhrase.prototype, "Language", {
        get: function () {
            var _a;
            return (_a = this.privTranslationPhrase.PrimaryLanguage) === null || _a === void 0 ? void 0 : _a.Language;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TranslationPhrase.prototype, "Confidence", {
        get: function () {
            var _a;
            return (_a = this.privTranslationPhrase.PrimaryLanguage) === null || _a === void 0 ? void 0 : _a.Confidence;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TranslationPhrase.prototype, "Translation", {
        get: function () {
            return this.privTranslationPhrase.Translation;
        },
        enumerable: false,
        configurable: true
    });
    return TranslationPhrase;
}());
exports.TranslationPhrase = TranslationPhrase;

//# sourceMappingURL=TranslationPhrase.js.map
