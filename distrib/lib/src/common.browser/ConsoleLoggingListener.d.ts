/// <reference types="node" />
import * as fs from "fs";
import { LogLevel } from "../sdk/LogLevel";
import { IEventListener, PlatformEvent } from "../common/Exports";
export declare class ConsoleLoggingListener implements IEventListener<PlatformEvent> {
    private privLogLevelFilter;
    private privLogPath;
    private privEnableConsoleOutput;
    constructor(logLevelFilter?: LogLevel);
    set logPath(path: fs.PathLike);
    set enableConsoleOutput(enableOutput: boolean);
    onEvent(event: PlatformEvent): void;
    private toString;
}
