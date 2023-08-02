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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestSession = void 0;
var Exports_1 = require("../common/Exports");
var RecognitionEvents_1 = require("./RecognitionEvents");
var ServiceTelemetryListener_Internal_1 = require("./ServiceTelemetryListener.Internal");
var RequestSession = /** @class */ (function () {
    function RequestSession(audioSourceId) {
        this.privIsDisposed = false;
        this.privDetachables = new Array();
        this.privIsAudioNodeDetached = false;
        this.privIsRecognizing = false;
        this.privIsSpeechEnded = false;
        this.privTurnStartAudioOffset = 0;
        this.privLastRecoOffset = 0;
        this.privHypothesisReceived = false;
        this.privBytesSent = 0;
        this.privRecognitionBytesSent = 0;
        this.privRecogNumber = 0;
        this.privInTurn = false;
        this.privConnectionAttempts = 0;
        this.privAudioSourceId = audioSourceId;
        this.privRequestId = Exports_1.createNoDashGuid();
        this.privAudioNodeId = Exports_1.createNoDashGuid();
        this.privTurnDeferral = new Exports_1.Deferred();
        // We're not in a turn, so resolve.
        this.privTurnDeferral.resolve();
    }
    Object.defineProperty(RequestSession.prototype, "sessionId", {
        get: function () {
            return this.privSessionId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestSession.prototype, "requestId", {
        get: function () {
            return this.privRequestId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestSession.prototype, "audioNodeId", {
        get: function () {
            return this.privAudioNodeId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestSession.prototype, "turnCompletionPromise", {
        get: function () {
            return this.privTurnDeferral.promise;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestSession.prototype, "isSpeechEnded", {
        get: function () {
            return this.privIsSpeechEnded;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestSession.prototype, "isRecognizing", {
        get: function () {
            return this.privIsRecognizing;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestSession.prototype, "currentTurnAudioOffset", {
        get: function () {
            return this.privTurnStartAudioOffset;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestSession.prototype, "recogNumber", {
        get: function () {
            return this.privRecogNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestSession.prototype, "numConnectionAttempts", {
        get: function () {
            return this.privConnectionAttempts;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestSession.prototype, "bytesSent", {
        // The number of bytes sent for the current connection.
        // Counter is reset to 0 each time a connection is established.
        get: function () {
            return this.privBytesSent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestSession.prototype, "recognitionBytesSent", {
        // The number of bytes sent for the current recognition.
        // Counter is reset to 0 each time recognition is started.
        get: function () {
            return this.privRecognitionBytesSent;
        },
        enumerable: false,
        configurable: true
    });
    RequestSession.prototype.listenForServiceTelemetry = function (eventSource) {
        if (!!this.privServiceTelemetryListener) {
            this.privDetachables.push(eventSource.attachListener(this.privServiceTelemetryListener));
        }
    };
    RequestSession.prototype.startNewRecognition = function () {
        this.privRecognitionBytesSent = 0;
        this.privIsSpeechEnded = false;
        this.privIsRecognizing = true;
        this.privTurnStartAudioOffset = 0;
        this.privLastRecoOffset = 0;
        this.privRecogNumber++;
        this.privServiceTelemetryListener = new ServiceTelemetryListener_Internal_1.ServiceTelemetryListener(this.privRequestId, this.privAudioSourceId, this.privAudioNodeId);
        this.onEvent(new RecognitionEvents_1.RecognitionTriggeredEvent(this.requestId, this.privSessionId, this.privAudioSourceId, this.privAudioNodeId));
    };
    RequestSession.prototype.onAudioSourceAttachCompleted = function (audioNode, isError) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.privAudioNode = audioNode;
                        this.privIsAudioNodeDetached = false;
                        if (!isError) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.onComplete()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.onEvent(new RecognitionEvents_1.ListeningStartedEvent(this.privRequestId, this.privSessionId, this.privAudioSourceId, this.privAudioNodeId));
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestSession.prototype.onPreConnectionStart = function (authFetchEventId, connectionId) {
        this.privAuthFetchEventId = authFetchEventId;
        this.privSessionId = connectionId;
        this.onEvent(new RecognitionEvents_1.ConnectingToServiceEvent(this.privRequestId, this.privAuthFetchEventId, this.privSessionId));
    };
    RequestSession.prototype.onAuthCompleted = function (isError) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isError) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.onComplete()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    RequestSession.prototype.onConnectionEstablishCompleted = function (statusCode, reason) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(statusCode === 200)) return [3 /*break*/, 1];
                        this.onEvent(new RecognitionEvents_1.RecognitionStartedEvent(this.requestId, this.privAudioSourceId, this.privAudioNodeId, this.privAuthFetchEventId, this.privSessionId));
                        if (!!this.privAudioNode) {
                            this.privAudioNode.replay();
                        }
                        this.privTurnStartAudioOffset = this.privLastRecoOffset;
                        this.privBytesSent = 0;
                        return [2 /*return*/];
                    case 1:
                        if (!(statusCode === 403)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.onComplete()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestSession.prototype.onServiceTurnEndResponse = function (continuousRecognition) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.privTurnDeferral.resolve();
                        if (!(!continuousRecognition || this.isSpeechEnded)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.onComplete()];
                    case 1:
                        _a.sent();
                        this.privInTurn = false;
                        return [3 /*break*/, 3];
                    case 2:
                        // Start a new request set.
                        this.privTurnStartAudioOffset = this.privLastRecoOffset;
                        this.privAudioNode.replay();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestSession.prototype.onSpeechContext = function () {
        this.privRequestId = Exports_1.createNoDashGuid();
    };
    RequestSession.prototype.onServiceTurnStartResponse = function () {
        if (!!this.privTurnDeferral && !!this.privInTurn) {
            // What? How are we starting a turn with another not done?
            this.privTurnDeferral.reject("Another turn started before current completed.");
            // Avoid UnhandledPromiseRejection if privTurnDeferral is not being awaited
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            this.privTurnDeferral.promise.then().catch(function () { });
        }
        this.privInTurn = true;
        this.privTurnDeferral = new Exports_1.Deferred();
    };
    RequestSession.prototype.onHypothesis = function (offset) {
        if (!this.privHypothesisReceived) {
            this.privHypothesisReceived = true;
            this.privServiceTelemetryListener.hypothesisReceived(this.privAudioNode.findTimeAtOffset(offset));
        }
    };
    RequestSession.prototype.onPhraseRecognized = function (offset) {
        this.privServiceTelemetryListener.phraseReceived(this.privAudioNode.findTimeAtOffset(offset));
        this.onServiceRecognized(offset);
    };
    RequestSession.prototype.onServiceRecognized = function (offset) {
        this.privLastRecoOffset = offset;
        this.privHypothesisReceived = false;
        this.privAudioNode.shrinkBuffers(offset);
        this.privConnectionAttempts = 0;
    };
    RequestSession.prototype.onAudioSent = function (bytesSent) {
        this.privBytesSent += bytesSent;
        this.privRecognitionBytesSent += bytesSent;
    };
    RequestSession.prototype.onRetryConnection = function () {
        this.privConnectionAttempts++;
    };
    RequestSession.prototype.dispose = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, detachable;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.privIsDisposed) return [3 /*break*/, 5];
                        // we should have completed by now. If we did not its an unknown error.
                        this.privIsDisposed = true;
                        _i = 0, _a = this.privDetachables;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        detachable = _a[_i];
                        return [4 /*yield*/, detachable.detach()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (!!this.privServiceTelemetryListener) {
                            this.privServiceTelemetryListener.dispose();
                        }
                        this.privIsRecognizing = false;
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RequestSession.prototype.getTelemetry = function () {
        if (this.privServiceTelemetryListener.hasTelemetry) {
            return this.privServiceTelemetryListener.getTelemetry();
        }
        else {
            return null;
        }
    };
    RequestSession.prototype.onStopRecognizing = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.onComplete()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Should be called with the audioNode for this session has indicated that it is out of speech.
    RequestSession.prototype.onSpeechEnded = function () {
        this.privIsSpeechEnded = true;
    };
    RequestSession.prototype.onEvent = function (event) {
        if (!!this.privServiceTelemetryListener) {
            this.privServiceTelemetryListener.onEvent(event);
        }
        Exports_1.Events.instance.onEvent(event);
    };
    RequestSession.prototype.onComplete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!!this.privIsRecognizing) return [3 /*break*/, 2];
                        this.privIsRecognizing = false;
                        return [4 /*yield*/, this.detachAudioNode()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    RequestSession.prototype.detachAudioNode = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.privIsAudioNodeDetached) return [3 /*break*/, 2];
                        this.privIsAudioNodeDetached = true;
                        if (!this.privAudioNode) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.privAudioNode.detach()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return RequestSession;
}());
exports.RequestSession = RequestSession;

//# sourceMappingURL=RequestSession.js.map
