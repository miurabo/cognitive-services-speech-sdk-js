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
exports.VoiceProfileEnrollmentCancellationDetails = exports.VoiceProfileEnrollmentResult = void 0;
/* eslint-disable max-classes-per-file */
var Exports_1 = require("../common.speech/Exports");
var Exports_2 = require("./Exports");
/**
 * Output format
 * @class VoiceProfileEnrollmentResult
 */
var VoiceProfileEnrollmentResult = /** @class */ (function () {
    function VoiceProfileEnrollmentResult(reason, json, statusText) {
        this.privReason = reason;
        this.privProperties = new Exports_2.PropertyCollection();
        if (this.privReason !== Exports_2.ResultReason.Canceled) {
            if (!!json) {
                this.privDetails = JSON.parse(json);
                if (this.privDetails.enrollmentStatus.toLowerCase() === "enrolling") {
                    this.privReason = Exports_2.ResultReason.EnrollingVoiceProfile;
                }
            }
        }
        else {
            this.privErrorDetails = statusText;
            this.privProperties.setProperty(Exports_1.CancellationErrorCodePropertyName, Exports_2.CancellationErrorCode[Exports_2.CancellationErrorCode.ServiceError]);
        }
    }
    Object.defineProperty(VoiceProfileEnrollmentResult.prototype, "reason", {
        get: function () {
            return this.privReason;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoiceProfileEnrollmentResult.prototype, "enrollmentsCount", {
        get: function () {
            return this.privDetails.enrollmentsCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoiceProfileEnrollmentResult.prototype, "enrollmentsLength", {
        get: function () {
            return this.privDetails.enrollmentsLength;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoiceProfileEnrollmentResult.prototype, "properties", {
        get: function () {
            return this.privProperties;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoiceProfileEnrollmentResult.prototype, "enrollmentResultDetails", {
        get: function () {
            return this.privDetails;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoiceProfileEnrollmentResult.prototype, "errorDetails", {
        get: function () {
            return this.privErrorDetails;
        },
        enumerable: false,
        configurable: true
    });
    VoiceProfileEnrollmentResult.FromIdentificationProfileList = function (json) {
        var results = [];
        for (var _i = 0, _a = json.value; _i < _a.length; _i++) {
            var item = _a[_i];
            var reason = item.enrollmentStatus.toLowerCase() === "enrolling" ?
                Exports_2.ResultReason.EnrollingVoiceProfile : item.enrollmentStatus.toLowerCase() === "enrolled" ?
                Exports_2.ResultReason.EnrolledVoiceProfile : Exports_2.ResultReason.Canceled;
            var result = new VoiceProfileEnrollmentResult(reason, null, null);
            result.privDetails = this.getIdentificationDetails(item);
            results.push(result);
        }
        return results;
    };
    VoiceProfileEnrollmentResult.FromVerificationProfileList = function (json) {
        var results = [];
        for (var _i = 0, _a = json.value; _i < _a.length; _i++) {
            var item = _a[_i];
            var reason = item.enrollmentStatus.toLowerCase() === "enrolling" ?
                Exports_2.ResultReason.EnrollingVoiceProfile : item.enrollmentStatus.toLowerCase() === "enrolled" ?
                Exports_2.ResultReason.EnrolledVoiceProfile : Exports_2.ResultReason.Canceled;
            var result = new VoiceProfileEnrollmentResult(reason, null, null);
            result.privDetails = this.getVerificationDetails(item);
            results.push(result);
        }
        return results;
    };
    VoiceProfileEnrollmentResult.getIdentificationDetails = function (json) {
        return {
            audioLength: json.audioLength ? parseFloat(json.audioLength) : 0,
            audioSpeechLength: json.audioSpeechLength ? parseFloat(json.audioSpeechLength) : 0,
            enrollmentStatus: json.enrollmentStatus,
            enrollmentsCount: json.enrollmentsCount || 0,
            enrollmentsLength: json.enrollmentsLength ? parseFloat(json.enrollmentsLength) : 0,
            enrollmentsSpeechLength: json.enrollmentsSpeechLength ? parseFloat(json.enrollmentsSpeechLength) : 0,
            profileId: json.profileId || json.identificationProfileId,
            remainingEnrollmentsSpeechLength: json.remainingEnrollmentsSpeechLength ? parseFloat(json.remainingEnrollmentsSpeechLength) : 0
        };
    };
    VoiceProfileEnrollmentResult.getVerificationDetails = function (json) {
        return {
            audioLength: json.audioLength ? parseFloat(json.audioLength) : 0,
            audioSpeechLength: json.audioSpeechLength ? parseFloat(json.audioSpeechLength) : 0,
            enrollmentStatus: json.enrollmentStatus,
            enrollmentsCount: json.enrollmentsCount,
            enrollmentsLength: json.enrollmentsLength ? parseFloat(json.enrollmentsLength) : 0,
            enrollmentsSpeechLength: json.enrollmentsSpeechLength ? parseFloat(json.enrollmentsSpeechLength) : 0,
            profileId: json.profileId || json.verificationProfileId,
            remainingEnrollmentsCount: json.remainingEnrollments || json.remainingEnrollmentsCount,
            remainingEnrollmentsSpeechLength: json.remainingEnrollmentsSpeechLength ? parseFloat(json.remainingEnrollmentsSpeechLength) : 0
        };
    };
    return VoiceProfileEnrollmentResult;
}());
exports.VoiceProfileEnrollmentResult = VoiceProfileEnrollmentResult;
/**
 * @class VoiceProfileEnrollmentCancellationDetails
 */
var VoiceProfileEnrollmentCancellationDetails = /** @class */ (function (_super) {
    __extends(VoiceProfileEnrollmentCancellationDetails, _super);
    function VoiceProfileEnrollmentCancellationDetails(reason, errorDetails, errorCode) {
        return _super.call(this, reason, errorDetails, errorCode) || this;
    }
    /**
     * Creates an instance of VoiceProfileEnrollmentCancellationDetails object for the canceled VoiceProfileEnrollmentResult.
     * @member VoiceProfileEnrollmentCancellationDetails.fromResult
     * @function
     * @public
     * @param {VoiceProfileEnrollmentResult} result - The result that was canceled.
     * @returns {VoiceProfileEnrollmentCancellationDetails} The cancellation details object being created.
     */
    VoiceProfileEnrollmentCancellationDetails.fromResult = function (result) {
        var reason = Exports_2.CancellationReason.Error;
        var errorCode = Exports_2.CancellationErrorCode.NoError;
        if (!!result.properties) {
            errorCode = Exports_2.CancellationErrorCode[result.properties.getProperty(Exports_1.CancellationErrorCodePropertyName, Exports_2.CancellationErrorCode[Exports_2.CancellationErrorCode.NoError])]; //eslint-disable-line
        }
        return new VoiceProfileEnrollmentCancellationDetails(reason, result.errorDetails, errorCode);
    };
    return VoiceProfileEnrollmentCancellationDetails;
}(Exports_2.CancellationDetailsBase));
exports.VoiceProfileEnrollmentCancellationDetails = VoiceProfileEnrollmentCancellationDetails;

//# sourceMappingURL=VoiceProfileEnrollmentResult.js.map
