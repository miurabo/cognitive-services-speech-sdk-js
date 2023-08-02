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
exports.AudioOutputConfigImpl = exports.AudioConfigImpl = exports.AudioConfig = void 0;
var Exports_1 = require("../../common.browser/Exports");
var Contracts_1 = require("../Contracts");
var Exports_2 = require("../Exports");
var AudioFileWriter_1 = require("./AudioFileWriter");
var AudioInputStream_1 = require("./AudioInputStream");
var AudioOutputStream_1 = require("./AudioOutputStream");
/**
 * Represents audio input configuration used for specifying what type of input to use (microphone, file, stream).
 * @class AudioConfig
 * Updated in version 1.11.0
 */
var AudioConfig = /** @class */ (function () {
    function AudioConfig() {
    }
    /**
     * Creates an AudioConfig object representing the default microphone on the system.
     * @member AudioConfig.fromDefaultMicrophoneInput
     * @function
     * @public
     * @returns {AudioConfig} The audio input configuration being created.
     */
    AudioConfig.fromDefaultMicrophoneInput = function () {
        var pcmRecorder = new Exports_1.PcmRecorder(true);
        return new AudioConfigImpl(new Exports_1.MicAudioSource(pcmRecorder));
    };
    /**
     * Creates an AudioConfig object representing a microphone with the specified device ID.
     * @member AudioConfig.fromMicrophoneInput
     * @function
     * @public
     * @param {string | undefined} deviceId - Specifies the device ID of the microphone to be used.
     * Default microphone is used the value is omitted.
     * @returns {AudioConfig} The audio input configuration being created.
     */
    AudioConfig.fromMicrophoneInput = function (deviceId) {
        var pcmRecorder = new Exports_1.PcmRecorder(true);
        return new AudioConfigImpl(new Exports_1.MicAudioSource(pcmRecorder, deviceId));
    };
    /**
     * Creates an AudioConfig object representing the specified file.
     * @member AudioConfig.fromWavFileInput
     * @function
     * @public
     * @param {File} fileName - Specifies the audio input file. Currently, only WAV / PCM is supported.
     * @returns {AudioConfig} The audio input configuration being created.
     */
    AudioConfig.fromWavFileInput = function (file, name) {
        if (name === void 0) { name = "unnamedBuffer.wav"; }
        return new AudioConfigImpl(new Exports_1.FileAudioSource(file, name));
    };
    /**
     * Creates an AudioConfig object representing the specified stream.
     * @member AudioConfig.fromStreamInput
     * @function
     * @public
     * @param {AudioInputStream | PullAudioInputStreamCallback | MediaStream} audioStream - Specifies the custom audio input
     * stream. Currently, only WAV / PCM is supported.
     * @returns {AudioConfig} The audio input configuration being created.
     */
    AudioConfig.fromStreamInput = function (audioStream) {
        if (audioStream instanceof Exports_2.PullAudioInputStreamCallback) {
            return new AudioConfigImpl(new AudioInputStream_1.PullAudioInputStreamImpl(audioStream));
        }
        if (audioStream instanceof Exports_2.AudioInputStream) {
            return new AudioConfigImpl(audioStream);
        }
        if (typeof MediaStream !== "undefined" && audioStream instanceof MediaStream) {
            var pcmRecorder = new Exports_1.PcmRecorder(false);
            return new AudioConfigImpl(new Exports_1.MicAudioSource(pcmRecorder, null, null, audioStream));
        }
        throw new Error("Not Supported Type");
    };
    /**
     * Creates an AudioConfig object representing the default speaker.
     * @member AudioConfig.fromDefaultSpeakerOutput
     * @function
     * @public
     * @returns {AudioConfig} The audio output configuration being created.
     * Added in version 1.11.0
     */
    AudioConfig.fromDefaultSpeakerOutput = function () {
        return new AudioOutputConfigImpl(new Exports_2.SpeakerAudioDestination());
    };
    /**
     * Creates an AudioConfig object representing the custom IPlayer object.
     * You can use the IPlayer object to control pause, resume, etc.
     * @member AudioConfig.fromSpeakerOutput
     * @function
     * @public
     * @param {IPlayer} player - the IPlayer object for playback.
     * @returns {AudioConfig} The audio output configuration being created.
     * Added in version 1.12.0
     */
    AudioConfig.fromSpeakerOutput = function (player) {
        if (player === undefined) {
            return AudioConfig.fromDefaultSpeakerOutput();
        }
        if (player instanceof Exports_2.SpeakerAudioDestination) {
            return new AudioOutputConfigImpl(player);
        }
        throw new Error("Not Supported Type");
    };
    /**
     * Creates an AudioConfig object representing a specified output audio file
     * @member AudioConfig.fromAudioFileOutput
     * @function
     * @public
     * @param {PathLike} filename - the filename of the output audio file
     * @returns {AudioConfig} The audio output configuration being created.
     * Added in version 1.11.0
     */
    AudioConfig.fromAudioFileOutput = function (filename) {
        return new AudioOutputConfigImpl(new AudioFileWriter_1.AudioFileWriter(filename));
    };
    /**
     * Creates an AudioConfig object representing a specified audio output stream
     * @member AudioConfig.fromStreamOutput
     * @function
     * @public
     * @param {AudioOutputStream | PushAudioOutputStreamCallback} audioStream - Specifies the custom audio output
     * stream.
     * @returns {AudioConfig} The audio output configuration being created.
     * Added in version 1.11.0
     */
    AudioConfig.fromStreamOutput = function (audioStream) {
        if (audioStream instanceof Exports_2.PushAudioOutputStreamCallback) {
            return new AudioOutputConfigImpl(new AudioOutputStream_1.PushAudioOutputStreamImpl(audioStream));
        }
        if (audioStream instanceof Exports_2.PushAudioOutputStream) {
            return new AudioOutputConfigImpl(audioStream);
        }
        if (audioStream instanceof Exports_2.PullAudioOutputStream) {
            return new AudioOutputConfigImpl(audioStream);
        }
        throw new Error("Not Supported Type");
    };
    return AudioConfig;
}());
exports.AudioConfig = AudioConfig;
/**
 * Represents audio input stream used for custom audio input configurations.
 * @private
 * @class AudioConfigImpl
 */
var AudioConfigImpl = /** @class */ (function (_super) {
    __extends(AudioConfigImpl, _super);
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {IAudioSource} source - An audio source.
     */
    function AudioConfigImpl(source) {
        var _this = _super.call(this) || this;
        _this.privSource = source;
        return _this;
    }
    Object.defineProperty(AudioConfigImpl.prototype, "format", {
        /**
         * Format information for the audio
         */
        get: function () {
            return this.privSource.format;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @member AudioConfigImpl.prototype.close
     * @function
     * @public
     */
    AudioConfigImpl.prototype.close = function (cb, err) {
        this.privSource.turnOff().then(function () {
            if (!!cb) {
                cb();
            }
        }, function (error) {
            if (!!err) {
                err(error);
            }
        });
    };
    /**
     * @member AudioConfigImpl.prototype.id
     * @function
     * @public
     */
    AudioConfigImpl.prototype.id = function () {
        return this.privSource.id();
    };
    /**
     * @member AudioConfigImpl.prototype.turnOn
     * @function
     * @public
     * @returns {Promise<void>} A promise.
     */
    AudioConfigImpl.prototype.turnOn = function () {
        return this.privSource.turnOn();
    };
    /**
     * @member AudioConfigImpl.prototype.attach
     * @function
     * @public
     * @param {string} audioNodeId - The audio node id.
     * @returns {Promise<IAudioStreamNode>} A promise.
     */
    AudioConfigImpl.prototype.attach = function (audioNodeId) {
        return this.privSource.attach(audioNodeId);
    };
    /**
     * @member AudioConfigImpl.prototype.detach
     * @function
     * @public
     * @param {string} audioNodeId - The audio node id.
     */
    AudioConfigImpl.prototype.detach = function (audioNodeId) {
        return this.privSource.detach(audioNodeId);
    };
    /**
     * @member AudioConfigImpl.prototype.turnOff
     * @function
     * @public
     * @returns {Promise<void>} A promise.
     */
    AudioConfigImpl.prototype.turnOff = function () {
        return this.privSource.turnOff();
    };
    Object.defineProperty(AudioConfigImpl.prototype, "events", {
        /**
         * @member AudioConfigImpl.prototype.events
         * @function
         * @public
         * @returns {EventSource<AudioSourceEvent>} An event source for audio events.
         */
        get: function () {
            return this.privSource.events;
        },
        enumerable: false,
        configurable: true
    });
    AudioConfigImpl.prototype.setProperty = function (name, value) {
        Contracts_1.Contracts.throwIfNull(value, "value");
        if (undefined !== this.privSource.setProperty) {
            this.privSource.setProperty(name, value);
        }
        else {
            throw new Error("This AudioConfig instance does not support setting properties.");
        }
    };
    AudioConfigImpl.prototype.getProperty = function (name, def) {
        if (undefined !== this.privSource.getProperty) {
            return this.privSource.getProperty(name, def);
        }
        else {
            throw new Error("This AudioConfig instance does not support getting properties.");
        }
        return def;
    };
    Object.defineProperty(AudioConfigImpl.prototype, "deviceInfo", {
        get: function () {
            return this.privSource.deviceInfo;
        },
        enumerable: false,
        configurable: true
    });
    return AudioConfigImpl;
}(AudioConfig));
exports.AudioConfigImpl = AudioConfigImpl;
var AudioOutputConfigImpl = /** @class */ (function (_super) {
    __extends(AudioOutputConfigImpl, _super);
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {IAudioDestination} destination - An audio destination.
     */
    function AudioOutputConfigImpl(destination) {
        var _this = _super.call(this) || this;
        _this.privDestination = destination;
        return _this;
    }
    Object.defineProperty(AudioOutputConfigImpl.prototype, "format", {
        set: function (format) {
            this.privDestination.format = format;
        },
        enumerable: false,
        configurable: true
    });
    AudioOutputConfigImpl.prototype.write = function (buffer) {
        this.privDestination.write(buffer);
    };
    AudioOutputConfigImpl.prototype.close = function () {
        this.privDestination.close();
    };
    AudioOutputConfigImpl.prototype.id = function () {
        return this.privDestination.id();
    };
    AudioOutputConfigImpl.prototype.setProperty = function () {
        throw new Error("This AudioConfig instance does not support setting properties.");
    };
    AudioOutputConfigImpl.prototype.getProperty = function () {
        throw new Error("This AudioConfig instance does not support getting properties.");
    };
    return AudioOutputConfigImpl;
}(AudioConfig));
exports.AudioOutputConfigImpl = AudioOutputConfigImpl;

//# sourceMappingURL=AudioConfig.js.map
