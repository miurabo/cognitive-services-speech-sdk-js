"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoDetectSourceLanguageResult = void 0;
var Contracts_1 = require("./Contracts");
/**
 * Output format
 * @class AutoDetectSourceLanguageResult
 */
var AutoDetectSourceLanguageResult = /** @class */ (function () {
    function AutoDetectSourceLanguageResult(language, languageDetectionConfidence) {
        Contracts_1.Contracts.throwIfNullOrUndefined(language, "language");
        Contracts_1.Contracts.throwIfNullOrUndefined(languageDetectionConfidence, "languageDetectionConfidence");
        this.privLanguage = language;
        this.privLanguageDetectionConfidence = languageDetectionConfidence;
    }
    /**
     * Creates an instance of AutoDetectSourceLanguageResult object from a SpeechRecognitionResult instance.
     * @member AutoDetectSourceLanguageResult.fromResult
     * @function
     * @public
     * @param {SpeechRecognitionResult} result - The recognition result.
     * @returns {AutoDetectSourceLanguageResult} AutoDetectSourceLanguageResult object being created.
     */
    AutoDetectSourceLanguageResult.fromResult = function (result) {
        return new AutoDetectSourceLanguageResult(result.language, result.languageDetectionConfidence);
    };
    /**
     * Creates an instance of AutoDetectSourceLanguageResult object from a ConversationTranscriptionResult instance.
     * @member AutoDetectSourceLanguageResult.fromConversationTranscriptionResult
     * @function
     * @public
     * @param {ConversationTranscriptionResult} result - The transcription result.
     * @returns {AutoDetectSourceLanguageResult} AutoDetectSourceLanguageResult object being created.
     */
    AutoDetectSourceLanguageResult.fromConversationTranscriptionResult = function (result) {
        return new AutoDetectSourceLanguageResult(result.language, result.languageDetectionConfidence);
    };
    Object.defineProperty(AutoDetectSourceLanguageResult.prototype, "language", {
        get: function () {
            return this.privLanguage;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AutoDetectSourceLanguageResult.prototype, "languageDetectionConfidence", {
        get: function () {
            return this.privLanguageDetectionConfidence;
        },
        enumerable: false,
        configurable: true
    });
    return AutoDetectSourceLanguageResult;
}());
exports.AutoDetectSourceLanguageResult = AutoDetectSourceLanguageResult;

//# sourceMappingURL=AutoDetectSourceLanguageResult.js.map
