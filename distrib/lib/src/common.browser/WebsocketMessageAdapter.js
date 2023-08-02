"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketMessageAdapter = void 0;
var net = __importStar(require("net"));
var tls = __importStar(require("tls"));
var agent_base_1 = __importDefault(require("agent-base"));
var https_proxy_agent_1 = __importDefault(require("https-proxy-agent"));
var ws_1 = __importDefault(require("ws"));
var HeaderNames_1 = require("../common.speech/HeaderNames");
var Exports_1 = require("../common/Exports");
var WebsocketMessageAdapter = /** @class */ (function () {
    function WebsocketMessageAdapter(uri, connectionId, messageFormatter, proxyInfo, headers, enableCompression) {
        if (!uri) {
            throw new Exports_1.ArgumentNullError("uri");
        }
        if (!messageFormatter) {
            throw new Exports_1.ArgumentNullError("messageFormatter");
        }
        this.proxyInfo = proxyInfo;
        this.privConnectionEvents = new Exports_1.EventSource();
        this.privConnectionId = connectionId;
        this.privMessageFormatter = messageFormatter;
        this.privConnectionState = Exports_1.ConnectionState.None;
        this.privUri = uri;
        this.privHeaders = headers;
        this.privEnableCompression = enableCompression;
        // Add the connection ID to the headers
        this.privHeaders[HeaderNames_1.HeaderNames.ConnectionId] = this.privConnectionId;
        this.privLastErrorReceived = "";
    }
    Object.defineProperty(WebsocketMessageAdapter.prototype, "state", {
        get: function () {
            return this.privConnectionState;
        },
        enumerable: false,
        configurable: true
    });
    WebsocketMessageAdapter.prototype.open = function () {
        var _this = this;
        if (this.privConnectionState === Exports_1.ConnectionState.Disconnected) {
            return Promise.reject("Cannot open a connection that is in " + this.privConnectionState + " state");
        }
        if (this.privConnectionEstablishDeferral) {
            return this.privConnectionEstablishDeferral.promise;
        }
        this.privConnectionEstablishDeferral = new Exports_1.Deferred();
        this.privCertificateValidatedDeferral = new Exports_1.Deferred();
        this.privConnectionState = Exports_1.ConnectionState.Connecting;
        try {
            if (typeof WebSocket !== "undefined" && !WebsocketMessageAdapter.forceNpmWebSocket) {
                // Browser handles cert checks.
                this.privCertificateValidatedDeferral.resolve();
                this.privWebsocketClient = new WebSocket(this.privUri);
            }
            else {
                var options = { headers: this.privHeaders, perMessageDeflate: this.privEnableCompression };
                // The ocsp library will handle validation for us and fail the connection if needed.
                this.privCertificateValidatedDeferral.resolve();
                options.agent = this.getAgent();
                // Workaround for https://github.com/microsoft/cognitive-services-speech-sdk-js/issues/465
                // Which is root caused by https://github.com/TooTallNate/node-agent-base/issues/61
                var uri = new URL(this.privUri);
                var protocol = uri.protocol;
                if ((protocol === null || protocol === void 0 ? void 0 : protocol.toLocaleLowerCase()) === "wss:") {
                    protocol = "https:";
                }
                else if ((protocol === null || protocol === void 0 ? void 0 : protocol.toLocaleLowerCase()) === "ws:") {
                    protocol = "http:";
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                options.agent.protocol = protocol;
                this.privWebsocketClient = new ws_1.default(this.privUri, options);
            }
            this.privWebsocketClient.binaryType = "arraybuffer";
            this.privReceivingMessageQueue = new Exports_1.Queue();
            this.privDisconnectDeferral = new Exports_1.Deferred();
            this.privSendMessageQueue = new Exports_1.Queue();
            this.processSendQueue().catch(function (reason) {
                Exports_1.Events.instance.onEvent(new Exports_1.BackgroundEvent(reason));
            });
        }
        catch (error) {
            this.privConnectionEstablishDeferral.resolve(new Exports_1.ConnectionOpenResponse(500, error));
            return this.privConnectionEstablishDeferral.promise;
        }
        this.onEvent(new Exports_1.ConnectionStartEvent(this.privConnectionId, this.privUri));
        this.privWebsocketClient.onopen = function () {
            _this.privCertificateValidatedDeferral.promise.then(function () {
                _this.privConnectionState = Exports_1.ConnectionState.Connected;
                _this.onEvent(new Exports_1.ConnectionEstablishedEvent(_this.privConnectionId));
                _this.privConnectionEstablishDeferral.resolve(new Exports_1.ConnectionOpenResponse(200, ""));
            }, function (error) {
                _this.privConnectionEstablishDeferral.reject(error);
            });
        };
        this.privWebsocketClient.onerror = function (e) {
            _this.onEvent(new Exports_1.ConnectionErrorEvent(_this.privConnectionId, e.message, e.type));
            _this.privLastErrorReceived = e.message;
        };
        this.privWebsocketClient.onclose = function (e) {
            if (_this.privConnectionState === Exports_1.ConnectionState.Connecting) {
                _this.privConnectionState = Exports_1.ConnectionState.Disconnected;
                // this.onEvent(new ConnectionEstablishErrorEvent(this.connectionId, e.code, e.reason));
                _this.privConnectionEstablishDeferral.resolve(new Exports_1.ConnectionOpenResponse(e.code, e.reason + " " + _this.privLastErrorReceived));
            }
            else {
                _this.privConnectionState = Exports_1.ConnectionState.Disconnected;
                _this.privWebsocketClient = null;
                _this.onEvent(new Exports_1.ConnectionClosedEvent(_this.privConnectionId, e.code, e.reason));
            }
            _this.onClose(e.code, e.reason).catch(function (reason) {
                Exports_1.Events.instance.onEvent(new Exports_1.BackgroundEvent(reason));
            });
        };
        this.privWebsocketClient.onmessage = function (e) {
            var networkReceivedTime = new Date().toISOString();
            if (_this.privConnectionState === Exports_1.ConnectionState.Connected) {
                var deferred_1 = new Exports_1.Deferred();
                // let id = ++this.idCounter;
                _this.privReceivingMessageQueue.enqueueFromPromise(deferred_1.promise);
                if (e.data instanceof ArrayBuffer) {
                    var rawMessage = new Exports_1.RawWebsocketMessage(Exports_1.MessageType.Binary, e.data);
                    _this.privMessageFormatter
                        .toConnectionMessage(rawMessage)
                        .then(function (connectionMessage) {
                        _this.onEvent(new Exports_1.ConnectionMessageReceivedEvent(_this.privConnectionId, networkReceivedTime, connectionMessage));
                        deferred_1.resolve(connectionMessage);
                    }, function (error) {
                        // TODO: Events for these ?
                        deferred_1.reject("Invalid binary message format. Error: " + error);
                    });
                }
                else {
                    var rawMessage = new Exports_1.RawWebsocketMessage(Exports_1.MessageType.Text, e.data);
                    _this.privMessageFormatter
                        .toConnectionMessage(rawMessage)
                        .then(function (connectionMessage) {
                        _this.onEvent(new Exports_1.ConnectionMessageReceivedEvent(_this.privConnectionId, networkReceivedTime, connectionMessage));
                        deferred_1.resolve(connectionMessage);
                    }, function (error) {
                        // TODO: Events for these ?
                        deferred_1.reject("Invalid text message format. Error: " + error);
                    });
                }
            }
        };
        return this.privConnectionEstablishDeferral.promise;
    };
    WebsocketMessageAdapter.prototype.send = function (message) {
        if (this.privConnectionState !== Exports_1.ConnectionState.Connected) {
            return Promise.reject("Cannot send on connection that is in " + Exports_1.ConnectionState[this.privConnectionState] + " state");
        }
        var messageSendStatusDeferral = new Exports_1.Deferred();
        var messageSendDeferral = new Exports_1.Deferred();
        this.privSendMessageQueue.enqueueFromPromise(messageSendDeferral.promise);
        this.privMessageFormatter
            .fromConnectionMessage(message)
            .then(function (rawMessage) {
            messageSendDeferral.resolve({
                Message: message,
                RawWebsocketMessage: rawMessage,
                sendStatusDeferral: messageSendStatusDeferral,
            });
        }, function (error) {
            messageSendDeferral.reject("Error formatting the message. " + error);
        });
        return messageSendStatusDeferral.promise;
    };
    WebsocketMessageAdapter.prototype.read = function () {
        if (this.privConnectionState !== Exports_1.ConnectionState.Connected) {
            return Promise.reject("Cannot read on connection that is in " + this.privConnectionState + " state");
        }
        return this.privReceivingMessageQueue.dequeue();
    };
    WebsocketMessageAdapter.prototype.close = function (reason) {
        if (this.privWebsocketClient) {
            if (this.privConnectionState !== Exports_1.ConnectionState.Disconnected) {
                this.privWebsocketClient.close(1000, reason ? reason : "Normal closure by client");
            }
        }
        else {
            return Promise.resolve();
        }
        return this.privDisconnectDeferral.promise;
    };
    Object.defineProperty(WebsocketMessageAdapter.prototype, "events", {
        get: function () {
            return this.privConnectionEvents;
        },
        enumerable: false,
        configurable: true
    });
    WebsocketMessageAdapter.prototype.sendRawMessage = function (sendItem) {
        try {
            // indicates we are draining the queue and it came with no message;
            if (!sendItem) {
                return Promise.resolve();
            }
            this.onEvent(new Exports_1.ConnectionMessageSentEvent(this.privConnectionId, new Date().toISOString(), sendItem.Message));
            // add a check for the ws readystate in order to stop the red console error 'WebSocket is already in CLOSING or CLOSED state' appearing
            if (this.isWebsocketOpen) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                this.privWebsocketClient.send(sendItem.RawWebsocketMessage.payload);
            }
            else {
                return Promise.reject("websocket send error: Websocket not ready " + this.privConnectionId + " " + sendItem.Message.id + " " + new Error().stack);
            }
            return Promise.resolve();
        }
        catch (e) {
            return Promise.reject("websocket send error: " + e);
        }
    };
    WebsocketMessageAdapter.prototype.onClose = function (code, reason) {
        return __awaiter(this, void 0, void 0, function () {
            var closeReason;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        closeReason = "Connection closed. " + code + ": " + reason;
                        this.privConnectionState = Exports_1.ConnectionState.Disconnected;
                        this.privDisconnectDeferral.resolve();
                        return [4 /*yield*/, this.privReceivingMessageQueue.drainAndDispose(function () {
                                // TODO: Events for these ?
                                // Logger.instance.onEvent(new LoggingEvent(LogType.Warning, null, `Failed to process received message. Reason: ${closeReason}, Message: ${JSON.stringify(pendingReceiveItem)}`));
                            }, closeReason)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.privSendMessageQueue.drainAndDispose(function (pendingSendItem) {
                                pendingSendItem.sendStatusDeferral.reject(closeReason);
                            }, closeReason)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WebsocketMessageAdapter.prototype.processSendQueue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var itemToSend, sendItem, sendError_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!true) return [3 /*break*/, 6];
                        itemToSend = this.privSendMessageQueue.dequeue();
                        return [4 /*yield*/, itemToSend];
                    case 1:
                        sendItem = _a.sent();
                        // indicates we are draining the queue and it came with no message;
                        if (!sendItem) {
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.sendRawMessage(sendItem)];
                    case 3:
                        _a.sent();
                        sendItem.sendStatusDeferral.resolve();
                        return [3 /*break*/, 5];
                    case 4:
                        sendError_1 = _a.sent();
                        sendItem.sendStatusDeferral.reject(sendError_1);
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 0];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    WebsocketMessageAdapter.prototype.onEvent = function (event) {
        this.privConnectionEvents.onEvent(event);
        Exports_1.Events.instance.onEvent(event);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    WebsocketMessageAdapter.prototype.getAgent = function () {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        var agent = new agent_base_1.default.Agent(this.createConnection);
        if (this.proxyInfo !== undefined &&
            this.proxyInfo.HostName !== undefined &&
            this.proxyInfo.Port > 0) {
            agent.proxyInfo = this.proxyInfo;
        }
        return agent;
    };
    WebsocketMessageAdapter.GetProxyAgent = function (proxyInfo) {
        var httpProxyOptions = {
            host: proxyInfo.HostName,
            port: proxyInfo.Port,
        };
        if (!!proxyInfo.UserName) {
            httpProxyOptions.headers = {
                "Proxy-Authentication": "Basic " + new Buffer(proxyInfo.UserName + ":" + ((proxyInfo.Password === undefined) ? "" : proxyInfo.Password)).toString("base64"),
            };
        }
        else {
            httpProxyOptions.headers = {};
        }
        httpProxyOptions.headers.requestOCSP = "true";
        var httpProxyAgent = new https_proxy_agent_1.default(httpProxyOptions);
        return httpProxyAgent;
    };
    WebsocketMessageAdapter.prototype.createConnection = function (request, options) {
        var socketPromise;
        options = __assign(__assign({}, options), {
            requestOCSP: true,
            servername: options.host
        });
        if (!!this.proxyInfo) {
            var httpProxyAgent = WebsocketMessageAdapter.GetProxyAgent(this.proxyInfo);
            var baseAgent_1 = httpProxyAgent;
            socketPromise = new Promise(function (resolve, reject) {
                baseAgent_1.callback(request, options, function (error, socket) {
                    if (!!error) {
                        reject(error);
                    }
                    else {
                        resolve(socket);
                    }
                });
            });
        }
        else {
            if (!!options.secureEndpoint) {
                socketPromise = Promise.resolve(tls.connect(options));
            }
            else {
                socketPromise = Promise.resolve(net.connect(options));
            }
        }
        return socketPromise;
    };
    Object.defineProperty(WebsocketMessageAdapter.prototype, "isWebsocketOpen", {
        get: function () {
            return this.privWebsocketClient && this.privWebsocketClient.readyState === this.privWebsocketClient.OPEN;
        },
        enumerable: false,
        configurable: true
    });
    WebsocketMessageAdapter.forceNpmWebSocket = false;
    return WebsocketMessageAdapter;
}());
exports.WebsocketMessageAdapter = WebsocketMessageAdapter;

//# sourceMappingURL=WebsocketMessageAdapter.js.map
