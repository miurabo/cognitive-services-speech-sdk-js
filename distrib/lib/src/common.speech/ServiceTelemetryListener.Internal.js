"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceTelemetryListener = void 0;
/* eslint-disable max-classes-per-file */
var Exports_1 = require("../common/Exports");
var RecognitionEvents_1 = require("./RecognitionEvents");
var ServiceTelemetryListener = /** @class */ (function () {
    function ServiceTelemetryListener(requestId, audioSourceId, audioNodeId) {
        this.privIsDisposed = false;
        this.privListeningTriggerMetric = null;
        this.privMicMetric = null;
        this.privConnectionEstablishMetric = null;
        this.privRequestId = requestId;
        this.privAudioSourceId = audioSourceId;
        this.privAudioNodeId = audioNodeId;
        this.privReceivedMessages = {};
        this.privPhraseLatencies = [];
        this.privHypothesisLatencies = [];
    }
    ServiceTelemetryListener.prototype.phraseReceived = function (audioReceivedTime) {
        if (audioReceivedTime > 0) { // 0 indicates the time is unknown. Drop it.
            this.privPhraseLatencies.push(Date.now() - audioReceivedTime);
        }
    };
    ServiceTelemetryListener.prototype.hypothesisReceived = function (audioReceivedTime) {
        if (audioReceivedTime > 0) { // 0 indicates the time is unknown. Drop it.
            this.privHypothesisLatencies.push(Date.now() - audioReceivedTime);
        }
    };
    ServiceTelemetryListener.prototype.onEvent = function (e) {
        if (this.privIsDisposed) {
            return;
        }
        if (e instanceof RecognitionEvents_1.RecognitionTriggeredEvent && e.requestId === this.privRequestId) {
            this.privListeningTriggerMetric = {
                End: e.eventTime,
                Name: "ListeningTrigger",
                Start: e.eventTime,
            };
        }
        if (e instanceof Exports_1.AudioStreamNodeAttachingEvent && e.audioSourceId === this.privAudioSourceId && e.audioNodeId === this.privAudioNodeId) {
            this.privMicStartTime = e.eventTime;
        }
        if (e instanceof Exports_1.AudioStreamNodeAttachedEvent && e.audioSourceId === this.privAudioSourceId && e.audioNodeId === this.privAudioNodeId) {
            this.privMicStartTime = e.eventTime;
        }
        if (e instanceof Exports_1.AudioSourceErrorEvent && e.audioSourceId === this.privAudioSourceId) {
            if (!this.privMicMetric) {
                this.privMicMetric = {
                    End: e.eventTime,
                    Error: e.error,
                    Name: "Microphone",
                    Start: this.privMicStartTime,
                };
            }
        }
        if (e instanceof Exports_1.AudioStreamNodeErrorEvent && e.audioSourceId === this.privAudioSourceId && e.audioNodeId === this.privAudioNodeId) {
            if (!this.privMicMetric) {
                this.privMicMetric = {
                    End: e.eventTime,
                    Error: e.error,
                    Name: "Microphone",
                    Start: this.privMicStartTime,
                };
            }
        }
        if (e instanceof Exports_1.AudioStreamNodeDetachedEvent && e.audioSourceId === this.privAudioSourceId && e.audioNodeId === this.privAudioNodeId) {
            if (!this.privMicMetric) {
                this.privMicMetric = {
                    End: e.eventTime,
                    Name: "Microphone",
                    Start: this.privMicStartTime,
                };
            }
        }
        if (e instanceof RecognitionEvents_1.ConnectingToServiceEvent && e.requestId === this.privRequestId) {
            this.privConnectionId = e.sessionId;
        }
        if (e instanceof Exports_1.ConnectionStartEvent && e.connectionId === this.privConnectionId) {
            this.privConnectionStartTime = e.eventTime;
        }
        if (e instanceof Exports_1.ConnectionEstablishedEvent && e.connectionId === this.privConnectionId) {
            if (!this.privConnectionEstablishMetric) {
                this.privConnectionEstablishMetric = {
                    End: e.eventTime,
                    Id: this.privConnectionId,
                    Name: "Connection",
                    Start: this.privConnectionStartTime,
                };
            }
        }
        if (e instanceof Exports_1.ConnectionEstablishErrorEvent && e.connectionId === this.privConnectionId) {
            if (!this.privConnectionEstablishMetric) {
                this.privConnectionEstablishMetric = {
                    End: e.eventTime,
                    Error: this.getConnectionError(e.statusCode),
                    Id: this.privConnectionId,
                    Name: "Connection",
                    Start: this.privConnectionStartTime,
                };
            }
        }
        if (e instanceof Exports_1.ConnectionMessageReceivedEvent && e.connectionId === this.privConnectionId) {
            if (e.message && e.message.headers && e.message.headers.path) {
                if (!this.privReceivedMessages[e.message.headers.path]) {
                    this.privReceivedMessages[e.message.headers.path] = new Array();
                }
                var maxMessagesToSend = 50;
                if (this.privReceivedMessages[e.message.headers.path].length < maxMessagesToSend) {
                    this.privReceivedMessages[e.message.headers.path].push(e.networkReceivedTime);
                }
            }
        }
    };
    ServiceTelemetryListener.prototype.getTelemetry = function () {
        var metrics = new Array();
        if (this.privListeningTriggerMetric) {
            metrics.push(this.privListeningTriggerMetric);
        }
        if (this.privMicMetric) {
            metrics.push(this.privMicMetric);
        }
        if (this.privConnectionEstablishMetric) {
            metrics.push(this.privConnectionEstablishMetric);
        }
        if (this.privPhraseLatencies.length > 0) {
            metrics.push({
                PhraseLatencyMs: this.privPhraseLatencies,
            });
        }
        if (this.privHypothesisLatencies.length > 0) {
            metrics.push({
                FirstHypothesisLatencyMs: this.privHypothesisLatencies,
            });
        }
        var telemetry = {
            Metrics: metrics,
            ReceivedMessages: this.privReceivedMessages,
        };
        var json = JSON.stringify(telemetry);
        // We dont want to send the same telemetry again. So clean those out.
        this.privReceivedMessages = {};
        this.privListeningTriggerMetric = null;
        this.privMicMetric = null;
        this.privConnectionEstablishMetric = null;
        this.privPhraseLatencies = [];
        this.privHypothesisLatencies = [];
        return json;
    };
    Object.defineProperty(ServiceTelemetryListener.prototype, "hasTelemetry", {
        // Determines if there are any telemetry events to send to the service.
        get: function () {
            return (Object.keys(this.privReceivedMessages).length !== 0 ||
                this.privListeningTriggerMetric !== null ||
                this.privMicMetric !== null ||
                this.privConnectionEstablishMetric !== null ||
                this.privPhraseLatencies.length !== 0 ||
                this.privHypothesisLatencies.length !== 0);
        },
        enumerable: false,
        configurable: true
    });
    ServiceTelemetryListener.prototype.dispose = function () {
        this.privIsDisposed = true;
    };
    ServiceTelemetryListener.prototype.getConnectionError = function (statusCode) {
        /*
        -- Websocket status codes --
        NormalClosure = 1000,
        EndpointUnavailable = 1001,
        ProtocolError = 1002,
        InvalidMessageType = 1003,
        Empty = 1005,
        InvalidPayloadData = 1007,
        PolicyViolation = 1008,
        MessageTooBig = 1009,
        MandatoryExtension = 1010,
        InternalServerError = 1011
        */
        switch (statusCode) {
            case 400:
            case 1002:
            case 1003:
            case 1005:
            case 1007:
            case 1008:
            case 1009: return "BadRequest";
            case 401: return "Unauthorized";
            case 403: return "Forbidden";
            case 503:
            case 1001: return "ServerUnavailable";
            case 500:
            case 1011: return "ServerError";
            case 408:
            case 504: return "Timeout";
            default: return "statuscode:" + statusCode.toString();
        }
    };
    return ServiceTelemetryListener;
}());
exports.ServiceTelemetryListener = ServiceTelemetryListener;

//# sourceMappingURL=ServiceTelemetryListener.Internal.js.map
