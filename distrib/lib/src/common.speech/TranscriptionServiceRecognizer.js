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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranscriptionServiceRecognizer = void 0;
var Exports_1 = require("../common/Exports");
var Exports_2 = require("../sdk/Exports");
var Exports_3 = require("./Exports");
var SpeechConnectionMessage_Internal_1 = require("./SpeechConnectionMessage.Internal");
// eslint-disable-next-line max-classes-per-file
var TranscriptionServiceRecognizer = /** @class */ (function (_super) {
    __extends(TranscriptionServiceRecognizer, _super);
    function TranscriptionServiceRecognizer(authentication, connectionFactory, audioSource, recognizerConfig, transcriber) {
        var _this = _super.call(this, authentication, connectionFactory, audioSource, recognizerConfig, transcriber) || this;
        _this.privTranscriberRecognizer = transcriber;
        _this.sendPrePayloadJSONOverride = function (connection) { return _this.sendTranscriptionStartJSON(connection); };
        if (_this.privRecognizerConfig.parameters.getProperty(Exports_2.PropertyId.SpeechServiceResponse_RequestWordLevelTimestamps) === "true") {
            _this.privSpeechContext.setWordLevelTimings();
        }
        return _this;
    }
    TranscriptionServiceRecognizer.prototype.sendSpeechEventAsync = function (info, command) {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!!this.privRequestSession.isRecognizing) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.fetchConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, this.sendSpeechEvent(connection, this.createSpeechEventPayload(info, command))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TranscriptionServiceRecognizer.prototype.sendMeetingSpeechEventAsync = function (info, command) {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!!this.privRequestSession.isRecognizing) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.fetchConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, this.sendSpeechEvent(connection, this.createMeetingSpeechEventPayload(info, command))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TranscriptionServiceRecognizer.prototype.processTypeSpecificMessages = function (connectionMessage) {
        return this.processSpeechMessages(connectionMessage);
    };
    TranscriptionServiceRecognizer.prototype.handleRecognizedCallback = function (result, offset, sessionId) {
        try {
            var event_1 = new Exports_2.SpeechRecognitionEventArgs(result, offset, sessionId);
            this.privTranscriberRecognizer.recognized(this.privTranscriberRecognizer, event_1);
            if (!!this.privSuccessCallback) {
                try {
                    this.privSuccessCallback(result);
                }
                catch (e) {
                    if (!!this.privErrorCallback) {
                        this.privErrorCallback(e);
                    }
                }
                // Only invoke the call back once.
                // and if it's successful don't invoke the
                // error after that.
                this.privSuccessCallback = undefined;
                this.privErrorCallback = undefined;
            }
            /* eslint-disable no-empty */
        }
        catch (error) {
            // Not going to let errors in the event handler
            // trip things up.
        }
    };
    TranscriptionServiceRecognizer.prototype.handleRecognizingCallback = function (result, duration, sessionId) {
        try {
            var ev = new Exports_2.SpeechRecognitionEventArgs(result, duration, sessionId);
            this.privTranscriberRecognizer.recognizing(this.privTranscriberRecognizer, ev);
            /* eslint-disable no-empty */
        }
        catch (error) {
            // Not going to let errors in the event handler
            // trip things up.
        }
    };
    // Cancels recognition.
    TranscriptionServiceRecognizer.prototype.cancelRecognition = function (sessionId, requestId, cancellationReason, errorCode, error) {
        var properties = new Exports_2.PropertyCollection();
        properties.setProperty(Exports_3.CancellationErrorCodePropertyName, Exports_2.CancellationErrorCode[errorCode]);
        if (this.privTranscriberRecognizer.IsMeetingRecognizer()) {
            if (!!this.privTranscriberRecognizer.canceled) {
                var cancelEvent = new Exports_2.MeetingTranscriptionCanceledEventArgs(cancellationReason, error, errorCode, undefined, sessionId);
                try {
                    this.privTranscriberRecognizer.canceled(this.privTranscriberRecognizer, cancelEvent);
                    /* eslint-disable no-empty */
                }
                catch (_a) { }
            }
        }
        else {
            if (!!this.privTranscriberRecognizer.canceled) {
                var cancelEvent = new Exports_2.ConversationTranscriptionCanceledEventArgs(cancellationReason, error, errorCode, undefined, sessionId);
                try {
                    this.privTranscriberRecognizer.canceled(this.privTranscriberRecognizer, cancelEvent);
                    /* eslint-disable no-empty */
                }
                catch (_b) { }
            }
        }
        if (!!this.privSuccessCallback) {
            var result = new Exports_2.SpeechRecognitionResult(requestId, Exports_2.ResultReason.Canceled, undefined, // Text
            undefined, // Duration
            undefined, // Offset
            undefined, // Language
            undefined, // Language Detection Confidence
            undefined, // Speaker Id
            error, undefined, // Json
            properties);
            try {
                this.privSuccessCallback(result);
                this.privSuccessCallback = undefined;
                /* eslint-disable no-empty */
            }
            catch (_c) { }
        }
    };
    // Encapsulated for derived service recognizers that need to send additional JSON
    TranscriptionServiceRecognizer.prototype.sendTranscriptionStartJSON = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            var info, payload, info, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendSpeechContext(connection, true)];
                    case 1:
                        _a.sent();
                        if (!this.privTranscriberRecognizer.IsMeetingRecognizer()) return [3 /*break*/, 3];
                        info = this.privTranscriberRecognizer.getMeetingInfo();
                        payload = this.createMeetingSpeechEventPayload(info, "start");
                        return [4 /*yield*/, this.sendSpeechEvent(connection, payload)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        info = this.privTranscriberRecognizer.getConversationInfo();
                        payload = this.createSpeechEventPayload(info, "start");
                        return [4 /*yield*/, this.sendSpeechEvent(connection, payload)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.sendWaveHeader(connection)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TranscriptionServiceRecognizer.prototype.sendSpeechEvent = function (connection, payload) {
        var speechEventJson = JSON.stringify(payload);
        if (speechEventJson) {
            return connection.send(new SpeechConnectionMessage_Internal_1.SpeechConnectionMessage(Exports_1.MessageType.Text, "speech.event", this.privRequestSession.requestId, "application/json", speechEventJson));
        }
        return;
    };
    TranscriptionServiceRecognizer.prototype.createSpeechEventPayload = function (info, command) {
        var eventDict = { id: "meeting", name: command, meeting: info.conversationProperties };
        eventDict.meeting.id = info.id;
        eventDict.meeting.attendees = info.participants;
        return eventDict;
    };
    TranscriptionServiceRecognizer.prototype.createMeetingSpeechEventPayload = function (info, command) {
        var eventDict = { id: "meeting", name: command, meeting: info.meetingProperties };
        eventDict.meeting.id = info.id;
        eventDict.meeting.attendees = info.participants;
        return eventDict;
    };
    return TranscriptionServiceRecognizer;
}(Exports_3.ConversationServiceRecognizer));
exports.TranscriptionServiceRecognizer = TranscriptionServiceRecognizer;

//# sourceMappingURL=TranscriptionServiceRecognizer.js.map
