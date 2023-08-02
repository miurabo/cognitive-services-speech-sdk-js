"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeakerVerificationModel = void 0;
var Contracts_1 = require("./Contracts");
var Exports_1 = require("./Exports");
/**
 * Defines SpeakerVerificationModel class for Speaker Recognition
 * Model contains a profile against which to verify a speaker
 * @class SpeakerVerificationModel
 */
var SpeakerVerificationModel = /** @class */ (function () {
    function SpeakerVerificationModel(profile) {
        Contracts_1.Contracts.throwIfNullOrUndefined(profile, "VoiceProfile");
        if (profile.profileType === Exports_1.VoiceProfileType.TextIndependentIdentification) {
            throw new Error("Verification model cannot be created from Identification profile");
        }
        this.privVoiceProfile = profile;
    }
    SpeakerVerificationModel.fromProfile = function (profile) {
        return new SpeakerVerificationModel(profile);
    };
    Object.defineProperty(SpeakerVerificationModel.prototype, "voiceProfile", {
        get: function () {
            return this.privVoiceProfile;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeakerVerificationModel.prototype, "profileIds", {
        get: function () {
            return [this.voiceProfile.profileId];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeakerVerificationModel.prototype, "scenario", {
        get: function () {
            if (this.voiceProfile.profileType === Exports_1.VoiceProfileType.TextDependentVerification) {
                return "TextDependentVerification";
            }
            else {
                return "TextIndependentVerification";
            }
        },
        enumerable: false,
        configurable: true
    });
    return SpeakerVerificationModel;
}());
exports.SpeakerVerificationModel = SpeakerVerificationModel;

//# sourceMappingURL=SpeakerVerificationModel.js.map
