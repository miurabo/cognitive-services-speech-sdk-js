"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoDetectSourceLanguagesOpenRangeOptionName = exports.ForceDictationPropertyName = exports.ServicePropertiesPropertyName = exports.CancellationErrorCodePropertyName = exports.OutputFormatPropertyName = void 0;
// Make sure not to export internal modules.
//
__exportStar(require("./CognitiveSubscriptionKeyAuthentication"), exports);
__exportStar(require("./CognitiveTokenAuthentication"), exports);
__exportStar(require("./IAuthentication"), exports);
__exportStar(require("./IConnectionFactory"), exports);
__exportStar(require("./ISynthesisConnectionFactory"), exports);
__exportStar(require("./IntentConnectionFactory"), exports);
__exportStar(require("./SpeakerRecognitionConnectionFactory"), exports);
__exportStar(require("./RecognitionEvents"), exports);
__exportStar(require("./ServiceRecognizerBase"), exports);
__exportStar(require("./ConversationServiceRecognizer"), exports);
__exportStar(require("./RecognizerConfig"), exports);
__exportStar(require("./SpeechServiceInterfaces"), exports);
__exportStar(require("./WebsocketMessageFormatter"), exports);
__exportStar(require("./SpeechConnectionFactory"), exports);
__exportStar(require("./ConversationTranscriberConnectionFactory"), exports);
__exportStar(require("./TranscriberConnectionFactory"), exports);
__exportStar(require("./TranslationConnectionFactory"), exports);
__exportStar(require("./SpeechSynthesisConnectionFactory"), exports);
__exportStar(require("./EnumTranslation"), exports);
__exportStar(require("./ServiceMessages/Enums"), exports);
__exportStar(require("./ServiceMessages/TranslationSynthesisEnd"), exports);
__exportStar(require("./ServiceMessages/TranslationHypothesis"), exports);
__exportStar(require("./ServiceMessages/TranslationPhrase"), exports);
__exportStar(require("./TranslationServiceRecognizer"), exports);
__exportStar(require("./ServiceMessages/SpeechDetected"), exports);
__exportStar(require("./ServiceMessages/SpeechHypothesis"), exports);
__exportStar(require("./ServiceMessages/SpeechKeyword"), exports);
__exportStar(require("./SpeechServiceRecognizer"), exports);
__exportStar(require("./ConversationTranscriptionServiceRecognizer"), exports);
__exportStar(require("./TranscriptionServiceRecognizer"), exports);
__exportStar(require("./ServiceMessages/DetailedSpeechPhrase"), exports);
__exportStar(require("./ServiceMessages/SimpleSpeechPhrase"), exports);
__exportStar(require("./AddedLmIntent"), exports);
__exportStar(require("./IntentServiceRecognizer"), exports);
__exportStar(require("./ServiceMessages/IntentResponse"), exports);
__exportStar(require("./ServiceMessages/SpeakerResponse"), exports);
__exportStar(require("./RequestSession"), exports);
__exportStar(require("./SpeechContext"), exports);
__exportStar(require("./DynamicGrammarBuilder"), exports);
__exportStar(require("./DynamicGrammarInterfaces"), exports);
__exportStar(require("./DialogServiceAdapter"), exports);
__exportStar(require("./AgentConfig"), exports);
__exportStar(require("./Transcription/Exports"), exports);
__exportStar(require("./ServiceMessages/SynthesisAudioMetadata"), exports);
__exportStar(require("./SynthesisTurn"), exports);
__exportStar(require("./SynthesisAdapterBase"), exports);
__exportStar(require("./SynthesisRestAdapter"), exports);
__exportStar(require("./SynthesizerConfig"), exports);
__exportStar(require("./SynthesisContext"), exports);
__exportStar(require("./SpeakerRecognitionConfig"), exports);
__exportStar(require("./SpeakerServiceRecognizer"), exports);
__exportStar(require("./VoiceServiceRecognizer"), exports);
exports.OutputFormatPropertyName = "OutputFormat";
exports.CancellationErrorCodePropertyName = "CancellationErrorCode";
exports.ServicePropertiesPropertyName = "ServiceProperties";
exports.ForceDictationPropertyName = "ForceDictation";
exports.AutoDetectSourceLanguagesOpenRangeOptionName = "OpenRange";

//# sourceMappingURL=Exports.js.map
