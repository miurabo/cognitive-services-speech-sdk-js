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
import { DialogConnectionFactory } from "../common.speech/DialogConnectorFactory";
import { DialogServiceAdapter, RecognitionMode, RecognizerConfig } from "../common.speech/Exports";
import { Deferred, marshalPromiseToCallbacks } from "../common/Exports";
import { Contracts } from "./Contracts";
import { Recognizer } from "./Exports";
import { PropertyId } from "./PropertyId";
/**
 * Dialog Service Connector
 * @class DialogServiceConnector
 */
export class DialogServiceConnector extends Recognizer {
    /**
     * Initializes an instance of the DialogServiceConnector.
     * @constructor
     * @param {DialogServiceConfig} dialogConfig - Set of properties to configure this recognizer.
     * @param {AudioConfig} audioConfig - An optional audio config associated with the recognizer
     */
    constructor(dialogConfig, audioConfig) {
        const dialogServiceConfigImpl = dialogConfig;
        Contracts.throwIfNull(dialogConfig, "dialogConfig");
        super(audioConfig, dialogServiceConfigImpl.properties, new DialogConnectionFactory());
        this.isTurnComplete = true;
        this.privIsDisposed = false;
        this.privProperties = dialogServiceConfigImpl.properties.clone();
        const agentConfig = this.buildAgentConfig();
        this.privReco.agentConfig.set(agentConfig);
    }
    /**
     * Starts a connection to the service.
     * Users can optionally call connect() to manually set up a connection in advance, before starting interactions.
     *
     * Note: On return, the connection might not be ready yet. Please subscribe to the Connected event to
     * be notified when the connection is established.
     * @member DialogServiceConnector.prototype.connect
     * @function
     * @public
     */
    connect(cb, err) {
        marshalPromiseToCallbacks(this.privReco.connect(), cb, err);
    }
    /**
     * Closes the connection the service.
     * Users can optionally call disconnect() to manually shutdown the connection of the associated DialogServiceConnector.
     *
     * If disconnect() is called during a recognition, recognition will fail and cancel with an error.
     */
    disconnect(cb, err) {
        marshalPromiseToCallbacks(this.privReco.disconnect(), cb, err);
    }
    /**
     * Gets the authorization token used to communicate with the service.
     * @member DialogServiceConnector.prototype.authorizationToken
     * @function
     * @public
     * @returns {string} Authorization token.
     */
    get authorizationToken() {
        return this.properties.getProperty(PropertyId.SpeechServiceAuthorization_Token);
    }
    /**
     * Sets the authorization token used to communicate with the service.
     * @member DialogServiceConnector.prototype.authorizationToken
     * @function
     * @public
     * @param {string} token - Authorization token.
     */
    set authorizationToken(token) {
        Contracts.throwIfNullOrWhitespace(token, "token");
        this.properties.setProperty(PropertyId.SpeechServiceAuthorization_Token, token);
    }
    /**
     * The collection of properties and their values defined for this DialogServiceConnector.
     * @member DialogServiceConnector.prototype.properties
     * @function
     * @public
     * @returns {PropertyCollection} The collection of properties and their values defined for this DialogServiceConnector.
     */
    get properties() {
        return this.privProperties;
    }
    /** Gets the template for the activity generated by service from speech.
     * Properties from the template will be stamped on the generated activity.
     * It can be empty
     */
    get speechActivityTemplate() {
        return this.properties.getProperty(PropertyId.Conversation_Speech_Activity_Template);
    }
    /** Sets the template for the activity generated by service from speech.
     * Properties from the template will be stamped on the generated activity.
     * It can be null or empty.
     * Note: it has to be a valid Json object.
     */
    set speechActivityTemplate(speechActivityTemplate) {
        this.properties.setProperty(PropertyId.Conversation_Speech_Activity_Template, speechActivityTemplate);
    }
    /**
     * Starts recognition and stops after the first utterance is recognized.
     * @member DialogServiceConnector.prototype.listenOnceAsync
     * @function
     * @public
     * @param cb - Callback that received the result when the reco has completed.
     * @param err - Callback invoked in case of an error.
     */
    listenOnceAsync(cb, err) {
        if (this.isTurnComplete) {
            Contracts.throwIfDisposed(this.privIsDisposed);
            const callbackHolder = () => __awaiter(this, void 0, void 0, function* () {
                yield this.privReco.connect();
                yield this.implRecognizerStop();
                this.isTurnComplete = false;
                const ret = new Deferred();
                yield this.privReco.recognize(RecognitionMode.Conversation, ret.resolve, ret.reject);
                const e = yield ret.promise;
                yield this.implRecognizerStop();
                return e;
            });
            const retPromise = callbackHolder();
            retPromise.catch(() => {
                // Destroy the recognizer.
                // We've done all we can here.
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                this.dispose(true).catch(() => { });
            });
            marshalPromiseToCallbacks(retPromise.finally(() => {
                this.isTurnComplete = true;
            }), cb, err);
        }
    }
    sendActivityAsync(activity, cb, errCb) {
        marshalPromiseToCallbacks(this.privReco.sendMessage(activity), cb, errCb);
    }
    /**
     * closes all external resources held by an instance of this class.
     * @member DialogServiceConnector.prototype.close
     * @function
     * @public
     */
    close(cb, err) {
        Contracts.throwIfDisposed(this.privIsDisposed);
        marshalPromiseToCallbacks(this.dispose(true), cb, err);
    }
    dispose(disposing) {
        const _super = Object.create(null, {
            dispose: { get: () => super.dispose }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (this.privIsDisposed) {
                return;
            }
            if (disposing) {
                this.privIsDisposed = true;
                yield this.implRecognizerStop();
                yield _super.dispose.call(this, disposing);
            }
        });
    }
    createRecognizerConfig(speechConfig) {
        return new RecognizerConfig(speechConfig, this.privProperties);
    }
    createServiceRecognizer(authentication, connectionFactory, audioConfig, recognizerConfig) {
        const audioSource = audioConfig;
        return new DialogServiceAdapter(authentication, connectionFactory, audioSource, recognizerConfig, this);
    }
    buildAgentConfig() {
        const communicationType = this.properties.getProperty("Conversation_Communication_Type", "Default");
        return {
            botInfo: {
                commType: communicationType,
                commandsCulture: undefined,
                connectionId: this.properties.getProperty(PropertyId.Conversation_Agent_Connection_Id),
                conversationId: this.properties.getProperty(PropertyId.Conversation_Conversation_Id, undefined),
                fromId: this.properties.getProperty(PropertyId.Conversation_From_Id, undefined),
                ttsAudioFormat: this.properties.getProperty(PropertyId.SpeechServiceConnection_SynthOutputFormat, undefined)
            },
            version: 0.2
        };
    }
}

//# sourceMappingURL=DialogServiceConnector.js.map
