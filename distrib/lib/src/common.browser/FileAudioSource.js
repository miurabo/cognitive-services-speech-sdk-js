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
exports.FileAudioSource = void 0;
var Exports_1 = require("../common.speech/Exports");
var Exports_2 = require("../common/Exports");
var AudioStreamFormat_1 = require("../sdk/Audio/AudioStreamFormat");
var FileAudioSource = /** @class */ (function () {
    function FileAudioSource(file, filename, audioSourceId) {
        this.privStreams = {};
        this.privHeaderEnd = 44;
        this.privId = audioSourceId ? audioSourceId : Exports_2.createNoDashGuid();
        this.privEvents = new Exports_2.EventSource();
        this.privSource = file;
        if (typeof window !== "undefined" && typeof Blob !== "undefined" && this.privSource instanceof Blob) {
            this.privFilename = file.name;
        }
        else {
            this.privFilename = filename || "unknown.wav";
        }
        // Read the header.
        this.privAudioFormatPromise = this.readHeader();
    }
    Object.defineProperty(FileAudioSource.prototype, "format", {
        get: function () {
            return this.privAudioFormatPromise;
        },
        enumerable: false,
        configurable: true
    });
    FileAudioSource.prototype.turnOn = function () {
        if (this.privFilename.lastIndexOf(".wav") !== this.privFilename.length - 4) {
            var errorMsg = this.privFilename + " is not supported. Only WAVE files are allowed at the moment.";
            this.onEvent(new Exports_2.AudioSourceErrorEvent(errorMsg, ""));
            return Promise.reject(errorMsg);
        }
        this.onEvent(new Exports_2.AudioSourceInitializingEvent(this.privId)); // no stream id
        this.onEvent(new Exports_2.AudioSourceReadyEvent(this.privId));
        return;
    };
    FileAudioSource.prototype.id = function () {
        return this.privId;
    };
    FileAudioSource.prototype.attach = function (audioNodeId) {
        return __awaiter(this, void 0, void 0, function () {
            var stream;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.onEvent(new Exports_2.AudioStreamNodeAttachingEvent(this.privId, audioNodeId));
                        return [4 /*yield*/, this.upload(audioNodeId)];
                    case 1:
                        stream = _a.sent();
                        this.onEvent(new Exports_2.AudioStreamNodeAttachedEvent(this.privId, audioNodeId));
                        return [2 /*return*/, Promise.resolve({
                                detach: function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                stream.readEnded();
                                                delete this.privStreams[audioNodeId];
                                                this.onEvent(new Exports_2.AudioStreamNodeDetachedEvent(this.privId, audioNodeId));
                                                return [4 /*yield*/, this.turnOff()];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); },
                                id: function () { return audioNodeId; },
                                read: function () { return stream.read(); },
                            })];
                }
            });
        });
    };
    FileAudioSource.prototype.detach = function (audioNodeId) {
        if (audioNodeId && this.privStreams[audioNodeId]) {
            this.privStreams[audioNodeId].close();
            delete this.privStreams[audioNodeId];
            this.onEvent(new Exports_2.AudioStreamNodeDetachedEvent(this.privId, audioNodeId));
        }
    };
    FileAudioSource.prototype.turnOff = function () {
        for (var streamId in this.privStreams) {
            if (streamId) {
                var stream = this.privStreams[streamId];
                if (stream && !stream.isClosed) {
                    stream.close();
                }
            }
        }
        this.onEvent(new Exports_2.AudioSourceOffEvent(this.privId)); // no stream now
        return Promise.resolve();
    };
    Object.defineProperty(FileAudioSource.prototype, "events", {
        get: function () {
            return this.privEvents;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileAudioSource.prototype, "deviceInfo", {
        get: function () {
            return this.privAudioFormatPromise.then(function (result) { return (Promise.resolve({
                bitspersample: result.bitsPerSample,
                channelcount: result.channels,
                connectivity: Exports_1.connectivity.Unknown,
                manufacturer: "Speech SDK",
                model: "File",
                samplerate: result.samplesPerSec,
                type: Exports_1.type.File,
            })); });
        },
        enumerable: false,
        configurable: true
    });
    FileAudioSource.prototype.readHeader = function () {
        var _this = this;
        // Read the wave header.
        var maxHeaderSize = 4296;
        var header = this.privSource.slice(0, maxHeaderSize);
        var headerResult = new Exports_2.Deferred();
        var processHeader = function (header) {
            var view = new DataView(header);
            var getWord = function (index) { return String.fromCharCode(view.getUint8(index), view.getUint8(index + 1), view.getUint8(index + 2), view.getUint8(index + 3)); };
            // RIFF 4 bytes.
            if ("RIFF" !== getWord(0)) {
                headerResult.reject("Invalid WAV header in file, RIFF was not found");
                return;
            }
            // length, 4 bytes
            // RIFF Type & fmt 8 bytes
            if ("WAVE" !== getWord(8) || "fmt " !== getWord(12)) {
                headerResult.reject("Invalid WAV header in file, WAVEfmt was not found");
                return;
            }
            var formatSize = view.getInt32(16, true);
            var channelCount = view.getUint16(22, true);
            var sampleRate = view.getUint32(24, true);
            var bitsPerSample = view.getUint16(34, true);
            // Confirm if header is 44 bytes long.
            var pos = 36 + Math.max(formatSize - 16, 0);
            for (; getWord(pos) !== "data"; pos += 2) {
                if (pos > maxHeaderSize - 8) {
                    headerResult.reject("Invalid WAV header in file, data block was not found");
                    return;
                }
            }
            _this.privHeaderEnd = pos + 8;
            headerResult.resolve(AudioStreamFormat_1.AudioStreamFormat.getWaveFormatPCM(sampleRate, bitsPerSample, channelCount));
        };
        if (typeof window !== "undefined" && typeof Blob !== "undefined" && header instanceof Blob) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var header = event.target.result;
                processHeader(header);
            };
            reader.readAsArrayBuffer(header);
        }
        else {
            var h = header;
            processHeader(h.buffer.slice(h.byteOffset, h.byteOffset + h.byteLength));
        }
        return headerResult.promise;
    };
    FileAudioSource.prototype.upload = function (audioNodeId) {
        return __awaiter(this, void 0, void 0, function () {
            var onerror, format, stream_1, chunk, processFile_1, reader, c, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onerror = function (error) {
                            var errorMsg = "Error occurred while processing '" + _this.privFilename + "'. " + error;
                            _this.onEvent(new Exports_2.AudioStreamNodeErrorEvent(_this.privId, audioNodeId, errorMsg));
                            throw new Error(errorMsg);
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.turnOn()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.privAudioFormatPromise];
                    case 3:
                        format = _a.sent();
                        stream_1 = new Exports_2.ChunkedArrayBufferStream(format.avgBytesPerSec / 10, audioNodeId);
                        this.privStreams[audioNodeId] = stream_1;
                        chunk = this.privSource.slice(this.privHeaderEnd);
                        processFile_1 = function (buff) {
                            if (stream_1.isClosed) {
                                return; // output stream was closed (somebody called TurnOff). We're done here.
                            }
                            stream_1.writeStreamChunk({
                                buffer: buff,
                                isEnd: false,
                                timeReceived: Date.now(),
                            });
                            stream_1.close();
                        };
                        if (typeof window !== "undefined" && typeof Blob !== "undefined" && chunk instanceof Blob) {
                            reader = new FileReader();
                            reader.onerror = function (ev) { return onerror(ev.toString()); };
                            reader.onload = function (event) {
                                var fileBuffer = event.target.result;
                                processFile_1(fileBuffer);
                            };
                            reader.readAsArrayBuffer(chunk);
                        }
                        else {
                            c = chunk;
                            processFile_1(c.buffer.slice(c.byteOffset, c.byteOffset + c.byteLength));
                        }
                        return [2 /*return*/, stream_1];
                    case 4:
                        e_1 = _a.sent();
                        onerror(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FileAudioSource.prototype.onEvent = function (event) {
        this.privEvents.onEvent(event);
        Exports_2.Events.instance.onEvent(event);
    };
    return FileAudioSource;
}());
exports.FileAudioSource = FileAudioSource;

//# sourceMappingURL=FileAudioSource.js.map
