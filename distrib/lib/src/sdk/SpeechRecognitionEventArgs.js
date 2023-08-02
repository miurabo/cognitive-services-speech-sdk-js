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
exports.MeetingTranscriptionEventArgs = exports.ConversationTranscriptionEventArgs = exports.SpeechRecognitionEventArgs = void 0;
/* eslint-disable max-classes-per-file */
var Exports_1 = require("./Exports");
/**
 * Defines contents of speech recognizing/recognized event.
 * @class SpeechRecognitionEventArgs
 */
var SpeechRecognitionEventArgs = /** @class */ (function (_super) {
    __extends(SpeechRecognitionEventArgs, _super);
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {SpeechRecognitionResult} result - The speech recognition result.
     * @param {number} offset - The offset.
     * @param {string} sessionId - The session id.
     */
    function SpeechRecognitionEventArgs(result, offset, sessionId) {
        var _this = _super.call(this, offset, sessionId) || this;
        _this.privResult = result;
        return _this;
    }
    Object.defineProperty(SpeechRecognitionEventArgs.prototype, "result", {
        /**
         * Specifies the recognition result.
         * @member SpeechRecognitionEventArgs.prototype.result
         * @function
         * @public
         * @returns {SpeechRecognitionResult} the recognition result.
         */
        get: function () {
            return this.privResult;
        },
        enumerable: false,
        configurable: true
    });
    return SpeechRecognitionEventArgs;
}(Exports_1.RecognitionEventArgs));
exports.SpeechRecognitionEventArgs = SpeechRecognitionEventArgs;
/**
 * Defines contents of conversation transcribed/transcribing event.
 * @class ConversationTranscriptionEventArgs
 */
var ConversationTranscriptionEventArgs = /** @class */ (function (_super) {
    __extends(ConversationTranscriptionEventArgs, _super);
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {ConversationTranscriptionResult} result - The conversation transcription result.
     * @param {number} offset - The offset.
     * @param {string} sessionId - The session id.
     */
    function ConversationTranscriptionEventArgs(result, offset, sessionId) {
        var _this = _super.call(this, offset, sessionId) || this;
        _this.privResult = result;
        return _this;
    }
    Object.defineProperty(ConversationTranscriptionEventArgs.prototype, "result", {
        /**
         * Specifies the transcription result.
         * @member ConversationTranscription1EventArgs.prototype.result
         * @function
         * @public
         * @returns {ConversationTranscriptionResult} the recognition result.
         */
        get: function () {
            return this.privResult;
        },
        enumerable: false,
        configurable: true
    });
    return ConversationTranscriptionEventArgs;
}(Exports_1.RecognitionEventArgs));
exports.ConversationTranscriptionEventArgs = ConversationTranscriptionEventArgs;
/**
 * Defines contents of meeting transcribed/transcribing event.
 * @class MeetingTranscriptionEventArgs
 */
var MeetingTranscriptionEventArgs = /** @class */ (function (_super) {
    __extends(MeetingTranscriptionEventArgs, _super);
    function MeetingTranscriptionEventArgs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MeetingTranscriptionEventArgs;
}(SpeechRecognitionEventArgs));
exports.MeetingTranscriptionEventArgs = MeetingTranscriptionEventArgs;

//# sourceMappingURL=SpeechRecognitionEventArgs.js.map
