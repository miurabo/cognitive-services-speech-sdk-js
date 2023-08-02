"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailedSpeechPhrase = void 0;
var Exports_1 = require("../Exports");
var DetailedSpeechPhrase = /** @class */ (function () {
    function DetailedSpeechPhrase(json) {
        this.privDetailedSpeechPhrase = JSON.parse(json);
        this.privDetailedSpeechPhrase.RecognitionStatus = Exports_1.RecognitionStatus[this.privDetailedSpeechPhrase.RecognitionStatus];
    }
    DetailedSpeechPhrase.fromJSON = function (json) {
        return new DetailedSpeechPhrase(json);
    };
    DetailedSpeechPhrase.prototype.getJsonWithCorrectedOffsets = function (baseOffset) {
        if (!!this.privDetailedSpeechPhrase.NBest) {
            var firstWordOffset = void 0;
            for (var _i = 0, _a = this.privDetailedSpeechPhrase.NBest; _i < _a.length; _i++) {
                var phrase = _a[_i];
                if (!!phrase.Words && !!phrase.Words[0]) {
                    firstWordOffset = phrase.Words[0].Offset;
                    break;
                }
            }
            if (!!firstWordOffset && firstWordOffset < baseOffset) {
                var offset = baseOffset - firstWordOffset;
                for (var _b = 0, _c = this.privDetailedSpeechPhrase.NBest; _b < _c.length; _b++) {
                    var details = _c[_b];
                    if (!!details.Words) {
                        for (var _d = 0, _e = details.Words; _d < _e.length; _d++) {
                            var word = _e[_d];
                            word.Offset += offset;
                        }
                    }
                    if (!!details.DisplayWords) {
                        for (var _f = 0, _g = details.DisplayWords; _f < _g.length; _f++) {
                            var word = _g[_f];
                            word.Offset += offset;
                        }
                    }
                }
            }
        }
        return JSON.stringify(this.privDetailedSpeechPhrase);
    };
    Object.defineProperty(DetailedSpeechPhrase.prototype, "RecognitionStatus", {
        get: function () {
            return this.privDetailedSpeechPhrase.RecognitionStatus;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DetailedSpeechPhrase.prototype, "NBest", {
        get: function () {
            return this.privDetailedSpeechPhrase.NBest;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DetailedSpeechPhrase.prototype, "Duration", {
        get: function () {
            return this.privDetailedSpeechPhrase.Duration;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DetailedSpeechPhrase.prototype, "Offset", {
        get: function () {
            return this.privDetailedSpeechPhrase.Offset;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DetailedSpeechPhrase.prototype, "Language", {
        get: function () {
            return this.privDetailedSpeechPhrase.PrimaryLanguage === undefined ? undefined : this.privDetailedSpeechPhrase.PrimaryLanguage.Language;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DetailedSpeechPhrase.prototype, "LanguageDetectionConfidence", {
        get: function () {
            return this.privDetailedSpeechPhrase.PrimaryLanguage === undefined ? undefined : this.privDetailedSpeechPhrase.PrimaryLanguage.Confidence;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DetailedSpeechPhrase.prototype, "Text", {
        get: function () {
            if (!!this.privDetailedSpeechPhrase.NBest && this.privDetailedSpeechPhrase.NBest[0]) {
                return this.privDetailedSpeechPhrase.NBest[0].Display || this.privDetailedSpeechPhrase.NBest[0].DisplayText;
            }
            return this.privDetailedSpeechPhrase.DisplayText;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DetailedSpeechPhrase.prototype, "SpeakerId", {
        get: function () {
            return this.privDetailedSpeechPhrase.SpeakerId;
        },
        enumerable: false,
        configurable: true
    });
    return DetailedSpeechPhrase;
}());
exports.DetailedSpeechPhrase = DetailedSpeechPhrase;

//# sourceMappingURL=DetailedSpeechPhrase.js.map
