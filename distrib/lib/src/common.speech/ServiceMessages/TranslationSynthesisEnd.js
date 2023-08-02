"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationSynthesisEnd = void 0;
var Exports_1 = require("../Exports");
var TranslationSynthesisEnd = /** @class */ (function () {
    function TranslationSynthesisEnd(json) {
        this.privSynthesisEnd = JSON.parse(json);
        if (!!this.privSynthesisEnd.SynthesisStatus) {
            this.privSynthesisEnd.SynthesisStatus = Exports_1.SynthesisStatus[this.privSynthesisEnd.SynthesisStatus];
        }
        if (!!this.privSynthesisEnd.Status) {
            this.privSynthesisEnd.SynthesisStatus = Exports_1.SynthesisStatus[this.privSynthesisEnd.Status];
        }
    }
    TranslationSynthesisEnd.fromJSON = function (json) {
        return new TranslationSynthesisEnd(json);
    };
    Object.defineProperty(TranslationSynthesisEnd.prototype, "SynthesisStatus", {
        get: function () {
            return this.privSynthesisEnd.SynthesisStatus;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TranslationSynthesisEnd.prototype, "FailureReason", {
        get: function () {
            return this.privSynthesisEnd.FailureReason;
        },
        enumerable: false,
        configurable: true
    });
    return TranslationSynthesisEnd;
}());
exports.TranslationSynthesisEnd = TranslationSynthesisEnd;

//# sourceMappingURL=TranslationSynthesisEnd.js.map
