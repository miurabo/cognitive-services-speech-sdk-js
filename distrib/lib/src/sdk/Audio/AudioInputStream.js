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
exports.PullAudioInputStreamImpl = exports.PullAudioInputStream = exports.PushAudioInputStreamImpl = exports.PushAudioInputStream = exports.AudioInputStream = void 0;
/* eslint-disable max-classes-per-file */
var Exports_1 = require("../../common.speech/Exports");
var Exports_2 = require("../../common/Exports");
var Guid_1 = require("../../common/Guid");
var Exports_3 = require("../Exports");
var AudioStreamFormat_1 = require("./AudioStreamFormat");
/**
 * Represents audio input stream used for custom audio input configurations.
 * @class AudioInputStream
 */
var AudioInputStream = /** @class */ (function () {
    /**
     * Creates and initializes an instance.
     * @constructor
     */
    function AudioInputStream() {
        return;
    }
    /**
     * Creates a memory backed PushAudioInputStream with the specified audio format.
     * @member AudioInputStream.createPushStream
     * @function
     * @public
     * @param {AudioStreamFormat} format - The audio data format in which audio will be
     * written to the push audio stream's write() method (Required if format is not 16 kHz 16bit mono PCM).
     * @returns {PushAudioInputStream} The audio input stream being created.
     */
    AudioInputStream.createPushStream = function (format) {
        return PushAudioInputStream.create(format);
    };
    /**
     * Creates a PullAudioInputStream that delegates to the specified callback interface for read()
     * and close() methods.
     * @member AudioInputStream.createPullStream
     * @function
     * @public
     * @param {PullAudioInputStreamCallback} callback - The custom audio input object, derived from
     * PullAudioInputStreamCallback
     * @param {AudioStreamFormat} format - The audio data format in which audio will be returned from
     * the callback's read() method (Required if format is not 16 kHz 16bit mono PCM).
     * @returns {PullAudioInputStream} The audio input stream being created.
     */
    AudioInputStream.createPullStream = function (callback, format) {
        return PullAudioInputStream.create(callback, format);
        // throw new Error("Oops");
    };
    return AudioInputStream;
}());
exports.AudioInputStream = AudioInputStream;
/**
 * Represents memory backed push audio input stream used for custom audio input configurations.
 * @class PushAudioInputStream
 */
var PushAudioInputStream = /** @class */ (function (_super) {
    __extends(PushAudioInputStream, _super);
    function PushAudioInputStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates a memory backed PushAudioInputStream with the specified audio format.
     * @member PushAudioInputStream.create
     * @function
     * @public
     * @param {AudioStreamFormat} format - The audio data format in which audio will be written to the
     * push audio stream's write() method (Required if format is not 16 kHz 16bit mono PCM).
     * @returns {PushAudioInputStream} The push audio input stream being created.
     */
    PushAudioInputStream.create = function (format) {
        return new PushAudioInputStreamImpl(format);
    };
    return PushAudioInputStream;
}(AudioInputStream));
exports.PushAudioInputStream = PushAudioInputStream;
/**
 * Represents memory backed push audio input stream used for custom audio input configurations.
 * @private
 * @class PushAudioInputStreamImpl
 */
var PushAudioInputStreamImpl = /** @class */ (function (_super) {
    __extends(PushAudioInputStreamImpl, _super);
    /**
     * Creates and initalizes an instance with the given values.
     * @constructor
     * @param {AudioStreamFormat} format - The audio stream format.
     */
    function PushAudioInputStreamImpl(format) {
        var _this = _super.call(this) || this;
        if (format === undefined) {
            _this.privFormat = AudioStreamFormat_1.AudioStreamFormatImpl.getDefaultInputFormat();
        }
        else {
            _this.privFormat = format;
        }
        _this.privEvents = new Exports_2.EventSource();
        _this.privId = Guid_1.createNoDashGuid();
        _this.privStream = new Exports_2.ChunkedArrayBufferStream(_this.privFormat.avgBytesPerSec / 10);
        return _this;
    }
    Object.defineProperty(PushAudioInputStreamImpl.prototype, "format", {
        /**
         * Format information for the audio
         */
        get: function () {
            return Promise.resolve(this.privFormat);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Writes the audio data specified by making an internal copy of the data.
     * @member PushAudioInputStreamImpl.prototype.write
     * @function
     * @public
     * @param {ArrayBuffer} dataBuffer - The audio buffer of which this function will make a copy.
     */
    PushAudioInputStreamImpl.prototype.write = function (dataBuffer) {
        this.privStream.writeStreamChunk({
            buffer: dataBuffer,
            isEnd: false,
            timeReceived: Date.now()
        });
    };
    /**
     * Closes the stream.
     * @member PushAudioInputStreamImpl.prototype.close
     * @function
     * @public
     */
    PushAudioInputStreamImpl.prototype.close = function () {
        this.privStream.close();
    };
    PushAudioInputStreamImpl.prototype.id = function () {
        return this.privId;
    };
    PushAudioInputStreamImpl.prototype.turnOn = function () {
        this.onEvent(new Exports_2.AudioSourceInitializingEvent(this.privId)); // no stream id
        this.onEvent(new Exports_2.AudioSourceReadyEvent(this.privId));
        return;
    };
    PushAudioInputStreamImpl.prototype.attach = function (audioNodeId) {
        return __awaiter(this, void 0, void 0, function () {
            var stream;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.onEvent(new Exports_2.AudioStreamNodeAttachingEvent(this.privId, audioNodeId));
                        return [4 /*yield*/, this.turnOn()];
                    case 1:
                        _a.sent();
                        stream = this.privStream;
                        this.onEvent(new Exports_2.AudioStreamNodeAttachedEvent(this.privId, audioNodeId));
                        return [2 /*return*/, {
                                detach: function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        this.onEvent(new Exports_2.AudioStreamNodeDetachedEvent(this.privId, audioNodeId));
                                        return [2 /*return*/, this.turnOff()];
                                    });
                                }); },
                                id: function () { return audioNodeId; },
                                read: function () { return stream.read(); },
                            }];
                }
            });
        });
    };
    PushAudioInputStreamImpl.prototype.detach = function (audioNodeId) {
        this.onEvent(new Exports_2.AudioStreamNodeDetachedEvent(this.privId, audioNodeId));
    };
    PushAudioInputStreamImpl.prototype.turnOff = function () {
        return;
    };
    Object.defineProperty(PushAudioInputStreamImpl.prototype, "events", {
        get: function () {
            return this.privEvents;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PushAudioInputStreamImpl.prototype, "deviceInfo", {
        get: function () {
            return Promise.resolve({
                bitspersample: this.privFormat.bitsPerSample,
                channelcount: this.privFormat.channels,
                connectivity: Exports_1.connectivity.Unknown,
                manufacturer: "Speech SDK",
                model: "PushStream",
                samplerate: this.privFormat.samplesPerSec,
                type: Exports_1.type.Stream,
            });
        },
        enumerable: false,
        configurable: true
    });
    PushAudioInputStreamImpl.prototype.onEvent = function (event) {
        this.privEvents.onEvent(event);
        Exports_2.Events.instance.onEvent(event);
    };
    PushAudioInputStreamImpl.prototype.toBuffer = function (arrayBuffer) {
        var buf = Buffer.alloc(arrayBuffer.byteLength);
        var view = new Uint8Array(arrayBuffer);
        for (var i = 0; i < buf.length; ++i) {
            buf[i] = view[i];
        }
        return buf;
    };
    return PushAudioInputStreamImpl;
}(PushAudioInputStream));
exports.PushAudioInputStreamImpl = PushAudioInputStreamImpl;
/*
 * Represents audio input stream used for custom audio input configurations.
 * @class PullAudioInputStream
 */
var PullAudioInputStream = /** @class */ (function (_super) {
    __extends(PullAudioInputStream, _super);
    /**
     * Creates and initializes and instance.
     * @constructor
     */
    function PullAudioInputStream() {
        return _super.call(this) || this;
    }
    /**
     * Creates a PullAudioInputStream that delegates to the specified callback interface for
     * read() and close() methods, using the default format (16 kHz 16bit mono PCM).
     * @member PullAudioInputStream.create
     * @function
     * @public
     * @param {PullAudioInputStreamCallback} callback - The custom audio input object,
     * derived from PullAudioInputStreamCustomCallback
     * @param {AudioStreamFormat} format - The audio data format in which audio will be
     * returned from the callback's read() method (Required if format is not 16 kHz 16bit mono PCM).
     * @returns {PullAudioInputStream} The push audio input stream being created.
     */
    PullAudioInputStream.create = function (callback, format) {
        return new PullAudioInputStreamImpl(callback, format);
    };
    return PullAudioInputStream;
}(AudioInputStream));
exports.PullAudioInputStream = PullAudioInputStream;
/**
 * Represents audio input stream used for custom audio input configurations.
 * @private
 * @class PullAudioInputStreamImpl
 */
var PullAudioInputStreamImpl = /** @class */ (function (_super) {
    __extends(PullAudioInputStreamImpl, _super);
    /**
     * Creates a PullAudioInputStream that delegates to the specified callback interface for
     * read() and close() methods, using the default format (16 kHz 16bit mono PCM).
     * @constructor
     * @param {PullAudioInputStreamCallback} callback - The custom audio input object,
     * derived from PullAudioInputStreamCustomCallback
     * @param {AudioStreamFormat} format - The audio data format in which audio will be
     * returned from the callback's read() method (Required if format is not 16 kHz 16bit mono PCM).
     */
    function PullAudioInputStreamImpl(callback, format) {
        var _this = _super.call(this) || this;
        if (undefined === format) {
            _this.privFormat = Exports_3.AudioStreamFormat.getDefaultInputFormat();
        }
        else {
            _this.privFormat = format;
        }
        _this.privEvents = new Exports_2.EventSource();
        _this.privId = Guid_1.createNoDashGuid();
        _this.privCallback = callback;
        _this.privIsClosed = false;
        _this.privBufferSize = _this.privFormat.avgBytesPerSec / 10;
        return _this;
    }
    Object.defineProperty(PullAudioInputStreamImpl.prototype, "format", {
        /**
         * Format information for the audio
         */
        get: function () {
            return Promise.resolve(this.privFormat);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Closes the stream.
     * @member PullAudioInputStreamImpl.prototype.close
     * @function
     * @public
     */
    PullAudioInputStreamImpl.prototype.close = function () {
        this.privIsClosed = true;
        this.privCallback.close();
    };
    PullAudioInputStreamImpl.prototype.id = function () {
        return this.privId;
    };
    PullAudioInputStreamImpl.prototype.turnOn = function () {
        this.onEvent(new Exports_2.AudioSourceInitializingEvent(this.privId)); // no stream id
        this.onEvent(new Exports_2.AudioSourceReadyEvent(this.privId));
        return;
    };
    PullAudioInputStreamImpl.prototype.attach = function (audioNodeId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.onEvent(new Exports_2.AudioStreamNodeAttachingEvent(this.privId, audioNodeId));
                        return [4 /*yield*/, this.turnOn()];
                    case 1:
                        _a.sent();
                        this.onEvent(new Exports_2.AudioStreamNodeAttachedEvent(this.privId, audioNodeId));
                        return [2 /*return*/, {
                                detach: function () {
                                    _this.privCallback.close();
                                    _this.onEvent(new Exports_2.AudioStreamNodeDetachedEvent(_this.privId, audioNodeId));
                                    return _this.turnOff();
                                },
                                id: function () { return audioNodeId; },
                                read: function () {
                                    var totalBytes = 0;
                                    var transmitBuff;
                                    // Until we have the minimum number of bytes to send in a transmission, keep asking for more.
                                    while (totalBytes < _this.privBufferSize) {
                                        // Sizing the read buffer to the delta between the perfect size and what's left means we won't ever get too much
                                        // data back.
                                        var readBuff = new ArrayBuffer(_this.privBufferSize - totalBytes);
                                        var pulledBytes = _this.privCallback.read(readBuff);
                                        // If there is no return buffer yet defined, set the return buffer to the that was just populated.
                                        // This was, if we have enough data there's no copy penalty, but if we don't we have a buffer that's the
                                        // preferred size allocated.
                                        if (undefined === transmitBuff) {
                                            transmitBuff = readBuff;
                                        }
                                        else {
                                            // Not the first bite at the apple, so fill the return buffer with the data we got back.
                                            var intView = new Int8Array(transmitBuff);
                                            intView.set(new Int8Array(readBuff), totalBytes);
                                        }
                                        // If there are no bytes to read, just break out and be done.
                                        if (0 === pulledBytes) {
                                            break;
                                        }
                                        totalBytes += pulledBytes;
                                    }
                                    return Promise.resolve({
                                        buffer: transmitBuff.slice(0, totalBytes),
                                        isEnd: _this.privIsClosed || totalBytes === 0,
                                        timeReceived: Date.now(),
                                    });
                                },
                            }];
                }
            });
        });
    };
    PullAudioInputStreamImpl.prototype.detach = function (audioNodeId) {
        this.onEvent(new Exports_2.AudioStreamNodeDetachedEvent(this.privId, audioNodeId));
    };
    PullAudioInputStreamImpl.prototype.turnOff = function () {
        return;
    };
    Object.defineProperty(PullAudioInputStreamImpl.prototype, "events", {
        get: function () {
            return this.privEvents;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PullAudioInputStreamImpl.prototype, "deviceInfo", {
        get: function () {
            return Promise.resolve({
                bitspersample: this.privFormat.bitsPerSample,
                channelcount: this.privFormat.channels,
                connectivity: Exports_1.connectivity.Unknown,
                manufacturer: "Speech SDK",
                model: "PullStream",
                samplerate: this.privFormat.samplesPerSec,
                type: Exports_1.type.Stream,
            });
        },
        enumerable: false,
        configurable: true
    });
    PullAudioInputStreamImpl.prototype.onEvent = function (event) {
        this.privEvents.onEvent(event);
        Exports_2.Events.instance.onEvent(event);
    };
    return PullAudioInputStreamImpl;
}(PullAudioInputStream));
exports.PullAudioInputStreamImpl = PullAudioInputStreamImpl;

//# sourceMappingURL=AudioInputStream.js.map
