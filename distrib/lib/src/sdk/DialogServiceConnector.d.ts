import { IAuthentication, IConnectionFactory, RecognizerConfig, ServiceRecognizerBase, SpeechServiceConfig } from "../common.speech/Exports";
import { ActivityReceivedEventArgs } from "./ActivityReceivedEventArgs";
import { DialogServiceConfig } from "./DialogServiceConfig";
import { AudioConfig, PropertyCollection, Recognizer, SpeechRecognitionCanceledEventArgs, SpeechRecognitionEventArgs, SpeechRecognitionResult } from "./Exports";
import { TurnStatusReceivedEventArgs } from "./TurnStatusReceivedEventArgs";
/**
 * Dialog Service Connector
 * @class DialogServiceConnector
 */
export declare class DialogServiceConnector extends Recognizer {
    private privIsDisposed;
    private isTurnComplete;
    /**
     * Initializes an instance of the DialogServiceConnector.
     * @constructor
     * @param {DialogServiceConfig} dialogConfig - Set of properties to configure this recognizer.
     * @param {AudioConfig} audioConfig - An optional audio config associated with the recognizer
     */
    constructor(dialogConfig: DialogServiceConfig, audioConfig?: AudioConfig);
    /**
     * The event recognizing signals that an intermediate recognition result is received.
     * @member DialogServiceConnector.prototype.recognizing
     * @function
     * @public
     */
    recognizing: (sender: DialogServiceConnector, event: SpeechRecognitionEventArgs) => void;
    /**
     * The event recognized signals that a final recognition result is received.
     * @member DialogServiceConfig.prototype.recognized
     * @function
     * @public
     */
    recognized: (sender: DialogServiceConnector, event: SpeechRecognitionEventArgs) => void;
    /**
     * The event canceled signals that an error occurred during recognition.
     * @member DialogServiceConnector.prototype.canceled
     * @function
     * @public
     */
    canceled: (sender: DialogServiceConnector, event: SpeechRecognitionCanceledEventArgs) => void;
    /**
     * The event activityReceived signals that an activity has been received.
     * @member DialogServiceConnector.prototype.activityReceived
     * @function
     * @public
     */
    activityReceived: (sender: DialogServiceConnector, event: ActivityReceivedEventArgs) => void;
    /**
     * The event turnStatusReceived signals that a turn status message has been received. These messages are
     * associated with both an interaction and a conversation. They are used to notify the client in the event
     * of an interaction failure with the dialog backend, e.g. in the event of a network issue, timeout, crash,
     * or other problem.
     * @member DialogServiceConnector.prototype.turnStatusReceived
     * @function
     * @public
     */
    turnStatusReceived: (sender: DialogServiceConnector, event: TurnStatusReceivedEventArgs) => void;
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
    connect(cb?: () => void, err?: (error: string) => void): void;
    /**
     * Closes the connection the service.
     * Users can optionally call disconnect() to manually shutdown the connection of the associated DialogServiceConnector.
     *
     * If disconnect() is called during a recognition, recognition will fail and cancel with an error.
     */
    disconnect(cb?: () => void, err?: (error: string) => void): void;
    /**
     * Gets the authorization token used to communicate with the service.
     * @member DialogServiceConnector.prototype.authorizationToken
     * @function
     * @public
     * @returns {string} Authorization token.
     */
    get authorizationToken(): string;
    /**
     * Sets the authorization token used to communicate with the service.
     * @member DialogServiceConnector.prototype.authorizationToken
     * @function
     * @public
     * @param {string} token - Authorization token.
     */
    set authorizationToken(token: string);
    /**
     * The collection of properties and their values defined for this DialogServiceConnector.
     * @member DialogServiceConnector.prototype.properties
     * @function
     * @public
     * @returns {PropertyCollection} The collection of properties and their values defined for this DialogServiceConnector.
     */
    get properties(): PropertyCollection;
    /** Gets the template for the activity generated by service from speech.
     * Properties from the template will be stamped on the generated activity.
     * It can be empty
     */
    get speechActivityTemplate(): string;
    /** Sets the template for the activity generated by service from speech.
     * Properties from the template will be stamped on the generated activity.
     * It can be null or empty.
     * Note: it has to be a valid Json object.
     */
    set speechActivityTemplate(speechActivityTemplate: string);
    /**
     * Starts recognition and stops after the first utterance is recognized.
     * @member DialogServiceConnector.prototype.listenOnceAsync
     * @function
     * @public
     * @param cb - Callback that received the result when the reco has completed.
     * @param err - Callback invoked in case of an error.
     */
    listenOnceAsync(cb?: (e: SpeechRecognitionResult) => void, err?: (e: string) => void): void;
    sendActivityAsync(activity: string, cb?: () => void, errCb?: (error: string) => void): void;
    /**
     * closes all external resources held by an instance of this class.
     * @member DialogServiceConnector.prototype.close
     * @function
     * @public
     */
    close(cb?: () => void, err?: (error: string) => void): void;
    protected dispose(disposing: boolean): Promise<void>;
    protected createRecognizerConfig(speechConfig: SpeechServiceConfig): RecognizerConfig;
    protected createServiceRecognizer(authentication: IAuthentication, connectionFactory: IConnectionFactory, audioConfig: AudioConfig, recognizerConfig: RecognizerConfig): ServiceRecognizerBase;
    private buildAgentConfig;
}
