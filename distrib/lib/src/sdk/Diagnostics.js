"use strict";
//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diagnostics = void 0;
var Exports_1 = require("../common.browser/Exports");
var Exports_2 = require("../common/Exports");
/**
 * Defines diagnostics API for managing console output
 * Added in version 1.21.0
 */
var Diagnostics = /** @class */ (function () {
    function Diagnostics() {
    }
    Diagnostics.SetLoggingLevel = function (logLevel) {
        this.privListener = new Exports_1.ConsoleLoggingListener(logLevel);
        Exports_2.Events.instance.attachConsoleListener(this.privListener);
    };
    Diagnostics.StartConsoleOutput = function () {
        if (!!this.privListener) {
            this.privListener.enableConsoleOutput = true;
        }
    };
    Diagnostics.StopConsoleOutput = function () {
        if (!!this.privListener) {
            this.privListener.enableConsoleOutput = false;
        }
    };
    Diagnostics.SetLogOutputPath = function (path) {
        if (typeof window === "undefined") {
            if (!!this.privListener) {
                this.privListener.logPath = path;
            }
        }
        else {
            throw new Error("File system logging not available in browser.");
        }
    };
    Diagnostics.privListener = undefined;
    return Diagnostics;
}());
exports.Diagnostics = Diagnostics;

//# sourceMappingURL=Diagnostics.js.map
