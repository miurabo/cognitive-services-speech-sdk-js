"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
// Multi-device Conversation is a Preview feature.
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
exports.ConversationTranslationResult = void 0;
var TranslationRecognitionResult_1 = require("../TranslationRecognitionResult");
var ConversationTranslationResult = /** @class */ (function (_super) {
    __extends(ConversationTranslationResult, _super);
    function ConversationTranslationResult(participantId, translations, originalLanguage, resultId, reason, text, duration, offset, errorDetails, json, properties) {
        var _this = _super.call(this, translations, resultId, reason, text, duration, offset, undefined, undefined, errorDetails, json, properties) || this;
        _this.privId = participantId;
        _this.privOrigLang = originalLanguage;
        return _this;
    }
    Object.defineProperty(ConversationTranslationResult.prototype, "participantId", {
        /**
         * The unique identifier for the participant this result is for.
         */
        get: function () {
            return this.privId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationTranslationResult.prototype, "originalLang", {
        /**
         * The original language this result was in.
         */
        get: function () {
            return this.privOrigLang;
        },
        enumerable: false,
        configurable: true
    });
    return ConversationTranslationResult;
}(TranslationRecognitionResult_1.TranslationRecognitionResult));
exports.ConversationTranslationResult = ConversationTranslationResult;

//# sourceMappingURL=ConversationTranslationResult.js.map
