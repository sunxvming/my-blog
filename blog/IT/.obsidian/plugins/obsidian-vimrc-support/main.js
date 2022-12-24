'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

const modifiers = /^(CommandOrControl|CmdOrCtrl|Command|Cmd|Control|Ctrl|AltGr|Option|Alt|Shift|Super)/i;
const keyCodes = /^(Plus|Space|Tab|Backspace|Delete|Insert|Return|Enter|Up|Down|Left|Right|Home|End|PageUp|PageDown|Escape|Esc|VolumeUp|VolumeDown|VolumeMute|MediaNextTrack|MediaPreviousTrack|MediaStop|MediaPlayPause|PrintScreen|F24|F23|F22|F21|F20|F19|F18|F17|F16|F15|F14|F13|F12|F11|F10|F9|F8|F7|F6|F5|F4|F3|F2|F1|[0-9A-Z)!@#$%^&*(:+<_>?~{|}";=,\-./`[\\\]'])/i;
const UNSUPPORTED = {};

function _command(accelerator, event, modifier) {
	if (process.platform !== 'darwin') {
		return UNSUPPORTED;
	}

	if (event.metaKey) {
		throw new Error('Double `Command` modifier specified.');
	}

	return {
		event: Object.assign({}, event, {metaKey: true}),
		accelerator: accelerator.slice(modifier.length)
	};
}

function _super(accelerator, event, modifier) {
	if (event.metaKey) {
		throw new Error('Double `Super` modifier specified.');
	}

	return {
		event: Object.assign({}, event, {metaKey: true}),
		accelerator: accelerator.slice(modifier.length)
	};
}

function _commandorcontrol(accelerator, event, modifier) {
	if (process.platform === 'darwin') {
		if (event.metaKey) {
			throw new Error('Double `Command` modifier specified.');
		}

		return {
			event: Object.assign({}, event, {metaKey: true}),
			accelerator: accelerator.slice(modifier.length)
		};
	}

	if (event.ctrlKey) {
		throw new Error('Double `Control` modifier specified.');
	}

	return {
		event: Object.assign({}, event, {ctrlKey: true}),
		accelerator: accelerator.slice(modifier.length)
	};
}

function _alt(accelerator, event, modifier) {
	if (modifier === 'option' && process.platform !== 'darwin') {
		return UNSUPPORTED;
	}

	if (event.altKey) {
		throw new Error('Double `Alt` modifier specified.');
	}

	return {
		event: Object.assign({}, event, {altKey: true}),
		accelerator: accelerator.slice(modifier.length)
	};
}

function _shift(accelerator, event, modifier) {
	if (event.shiftKey) {
		throw new Error('Double `Shift` modifier specified.');
	}

	return {
		event: Object.assign({}, event, {shiftKey: true}),
		accelerator: accelerator.slice(modifier.length)
	};
}

function _control(accelerator, event, modifier) {
	if (event.ctrlKey) {
		throw new Error('Double `Control` modifier specified.');
	}

	return {
		event: Object.assign({}, event, {ctrlKey: true}),
		accelerator: accelerator.slice(modifier.length)
	};
}

function reduceModifier({accelerator, event}, modifier) {
	switch (modifier) {
		case 'command':
		case 'cmd': {
			return _command(accelerator, event, modifier);
		}

		case 'super': {
			return _super(accelerator, event, modifier);
		}

		case 'control':
		case 'ctrl': {
			return _control(accelerator, event, modifier);
		}

		case 'commandorcontrol':
		case 'cmdorctrl': {
			return _commandorcontrol(accelerator, event, modifier);
		}

		case 'option':
		case 'altgr':
		case 'alt': {
			return _alt(accelerator, event, modifier);
		}

		case 'shift': {
			return _shift(accelerator, event, modifier);
		}

		default:
			console.error(modifier);
	}
}

function reducePlus({accelerator, event}) {
	return {
		event,
		accelerator: accelerator.trim().slice(1)
	};
}

const virtualKeyCodes = {
	0: 'Digit0',
	1: 'Digit1',
	2: 'Digit2',
	3: 'Digit3',
	4: 'Digit4',
	5: 'Digit5',
	6: 'Digit6',
	7: 'Digit7',
	8: 'Digit8',
	9: 'Digit9',
	'-': 'Minus',
	'=': 'Equal',
	Q: 'KeyQ',
	W: 'KeyW',
	E: 'KeyE',
	R: 'KeyR',
	T: 'KeyT',
	Y: 'KeyY',
	U: 'KeyU',
	I: 'KeyI',
	O: 'KeyO',
	P: 'KeyP',
	'[': 'BracketLeft',
	']': 'BracketRight',
	A: 'KeyA',
	S: 'KeyS',
	D: 'KeyD',
	F: 'KeyF',
	G: 'KeyG',
	H: 'KeyH',
	J: 'KeyJ',
	K: 'KeyK',
	L: 'KeyL',
	';': 'Semicolon',
	'\'': 'Quote',
	'`': 'Backquote',
	'/': 'Backslash',
	Z: 'KeyZ',
	X: 'KeyX',
	C: 'KeyC',
	V: 'KeyV',
	B: 'KeyB',
	N: 'KeyN',
	M: 'KeyM',
	',': 'Comma',
	'.': 'Period',
	'\\': 'Slash',
	' ': 'Space'
};

function reduceKey({accelerator, event}, key) {
	if (key.length > 1 || event.key) {
		throw new Error(`Unvalid keycode \`${key}\`.`);
	}

	const code =
		key.toUpperCase() in virtualKeyCodes ?
			virtualKeyCodes[key.toUpperCase()] :
			null;

	return {
		event: Object.assign({}, event, {key}, code ? {code} : null),
		accelerator: accelerator.trim().slice(key.length)
	};
}

const domKeys = Object.assign(Object.create(null), {
	plus: 'Add',
	space: 'Space',
	tab: 'Tab',
	backspace: 'Backspace',
	delete: 'Delete',
	insert: 'Insert',
	return: 'Return',
	enter: 'Return',
	up: 'ArrowUp',
	down: 'ArrowDown',
	left: 'ArrowLeft',
	right: 'ArrowRight',
	home: 'Home',
	end: 'End',
	pageup: 'PageUp',
	pagedown: 'PageDown',
	escape: 'Escape',
	esc: 'Escape',
	volumeup: 'AudioVolumeUp',
	volumedown: 'AudioVolumeDown',
	volumemute: 'AudioVolumeMute',
	medianexttrack: 'MediaTrackNext',
	mediaprevioustrack: 'MediaTrackPrevious',
	mediastop: 'MediaStop',
	mediaplaypause: 'MediaPlayPause',
	printscreen: 'PrintScreen'
});

// Add function keys
for (let i = 1; i <= 24; i++) {
	domKeys[`f${i}`] = `F${i}`;
}

function reduceCode({accelerator, event}, {code, key}) {
	if (event.code) {
		throw new Error(`Duplicated keycode \`${key}\`.`);
	}

	return {
		event: Object.assign({}, event, {key}, code ? {code} : null),
		accelerator: accelerator.trim().slice((key && key.length) || 0)
	};
}

/**
 * This function transform an Electron Accelerator string into
 * a DOM KeyboardEvent object.
 *
 * @param  {string} accelerator an Electron Accelerator string, e.g. `Ctrl+C` or `Shift+Space`.
 * @return {object} a DOM KeyboardEvent object derivate from the `accelerator` argument.
 */
function toKeyEvent(accelerator) {
	let state = {accelerator, event: {}};
	while (state.accelerator !== '') {
		const modifierMatch = state.accelerator.match(modifiers);
		if (modifierMatch) {
			const modifier = modifierMatch[0].toLowerCase();
			state = reduceModifier(state, modifier);
			if (state === UNSUPPORTED) {
				return {unsupportedKeyForPlatform: true};
			}
		} else if (state.accelerator.trim()[0] === '+') {
			state = reducePlus(state);
		} else {
			const codeMatch = state.accelerator.match(keyCodes);
			if (codeMatch) {
				const code = codeMatch[0].toLowerCase();
				if (code in domKeys) {
					state = reduceCode(state, {
						code: domKeys[code],
						key: code
					});
				} else {
					state = reduceKey(state, code);
				}
			} else {
				throw new Error(`Unvalid accelerator: "${state.accelerator}"`);
			}
		}
	}

	return state.event;
}

var keyboardeventFromElectronAccelerator = {
	UNSUPPORTED,
	reduceModifier,
	reducePlus,
	reduceKey,
	reduceCode,
	toKeyEvent
};

var DEFAULT_SETTINGS = {
    vimrcFileName: ".obsidian.vimrc",
    displayChord: false,
    displayVimMode: false,
    fixedNormalModeLayout: false,
    capturedKeyboardMap: {},
    supportJsCommands: false
};
// NOTE: to future maintainers, please make sure all mapping commands are included in this array.
var mappingCommands = [
    "map",
    "nmap",
    "noremap",
    "iunmap",
    "nunmap",
    "vunmap",
];
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
var VimrcPlugin = /** @class */ (function (_super) {
    __extends(VimrcPlugin, _super);
    function VimrcPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.codeMirrorVimObject = null;
        _this.initialized = false;
        _this.lastYankBuffer = [""];
        _this.lastSystemClipboard = "";
        _this.yankToSystemClipboard = false;
        _this.currentKeyChord = [];
        _this.vimChordStatusBar = null;
        _this.vimStatusBar = null;
        _this.currentVimStatus = "\uD83D\uDFE2" /* normal */;
        _this.customVimKeybinds = {};
        _this.currentSelection = null;
        _this.isInsertMode = false;
        return _this;
    }
    VimrcPlugin.prototype.captureKeyboardLayout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var keyMap, layout, doneIterating;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keyMap = {};
                        return [4 /*yield*/, navigator.keyboard.getLayoutMap()];
                    case 1:
                        layout = _a.sent();
                        doneIterating = new Promise(function (resolve, reject) {
                            var counted = 0;
                            layout.forEach(function (value, index) {
                                keyMap[index] = value;
                                counted += 1;
                                if (counted === layout.size)
                                    resolve();
                            });
                        });
                        return [4 /*yield*/, doneIterating];
                    case 2:
                        _a.sent();
                        new obsidian.Notice('Keyboard layout captured');
                        return [2 /*return*/, keyMap];
                }
            });
        });
    };
    VimrcPlugin.prototype.initialize = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                if (this.initialized)
                    return [2 /*return*/];
                this.codeMirrorVimObject = (_a = window.CodeMirrorAdapter) === null || _a === void 0 ? void 0 : _a.Vim;
                this.registerYankEvents(activeWindow);
                this.app.workspace.on("window-open", function (workspaceWindow, w) {
                    _this.registerYankEvents(w);
                });
                // Two events cos
                // this don't trigger on loading/reloading obsidian with note opened
                this.app.workspace.on("active-leaf-change", function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.updateSelectionEvent();
                        return [2 /*return*/];
                    });
                }); });
                // and this don't trigger on opening same file in new pane
                this.app.workspace.on("file-open", function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.updateSelectionEvent();
                        return [2 /*return*/];
                    });
                }); });
                this.initialized = true;
                return [2 /*return*/];
            });
        });
    };
    VimrcPlugin.prototype.registerYankEvents = function (win) {
        var _this = this;
        this.registerDomEvent(win.document, 'click', function () {
            _this.captureYankBuffer(win);
        });
        this.registerDomEvent(win.document, 'keyup', function () {
            _this.captureYankBuffer(win);
        });
        this.registerDomEvent(win.document, 'focusin', function () {
            _this.captureYankBuffer(win);
        });
    };
    VimrcPlugin.prototype.updateSelectionEvent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var view, cm;
            var _this = this;
            return __generator(this, function (_a) {
                view = this.getActiveView();
                if (!view)
                    return [2 /*return*/];
                cm = this.getCodeMirror(view);
                if (this.getCursorActivityHandlers(cm).some(function (e) { return e.name === "updateSelection"; }))
                    return [2 /*return*/];
                cm.on("cursorActivity", function (cm) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, this.updateSelection(cm)];
                }); }); });
                return [2 /*return*/];
            });
        });
    };
    VimrcPlugin.prototype.updateSelection = function (cm) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.currentSelection = cm.listSelections();
                return [2 /*return*/];
            });
        });
    };
    VimrcPlugin.prototype.getCursorActivityHandlers = function (cm) {
        return cm._handlers.cursorActivity;
    };
    VimrcPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.addSettingTab(new SettingsTab(this.app, this));
                        console.log('loading Vimrc plugin');
                        this.app.workspace.on('active-leaf-change', function () { return __awaiter(_this, void 0, void 0, function () {
                            var fileName, vimrcContent, e_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!!this.initialized) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.initialize()];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        if (this.codeMirrorVimObject.loadedVimrc)
                                            return [2 /*return*/];
                                        fileName = this.settings.vimrcFileName;
                                        if (!fileName || fileName.trim().length === 0) {
                                            fileName = DEFAULT_SETTINGS.vimrcFileName;
                                            console.log('Configured Vimrc file name is illegal, falling-back to default');
                                        }
                                        vimrcContent = '';
                                        _a.label = 3;
                                    case 3:
                                        _a.trys.push([3, 5, , 6]);
                                        return [4 /*yield*/, this.app.vault.adapter.read(fileName)];
                                    case 4:
                                        vimrcContent = _a.sent();
                                        return [3 /*break*/, 6];
                                    case 5:
                                        e_1 = _a.sent();
                                        console.log('Error loading vimrc file', fileName, 'from the vault root', e_1.message);
                                        return [3 /*break*/, 6];
                                    case 6:
                                        this.readVimInit(vimrcContent);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    VimrcPlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadData()];
                    case 1:
                        data = _a.sent();
                        this.settings = Object.assign({}, DEFAULT_SETTINGS, data);
                        return [2 /*return*/];
                }
            });
        });
    };
    VimrcPlugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VimrcPlugin.prototype.logVimModeChange = function (modeObj) {
        this.isInsertMode = modeObj.mode === 'insert';
        switch (modeObj.mode) {
            case "insert":
                this.currentVimStatus = "\uD83D\uDFE0" /* insert */;
                break;
            case "normal":
                this.currentVimStatus = "\uD83D\uDFE2" /* normal */;
                break;
            case "visual":
                this.currentVimStatus = "\uD83D\uDFE1" /* visual */;
                break;
            case "replace":
                this.currentVimStatus = "\uD83D\uDD34" /* replace */;
                break;
        }
        if (this.settings.displayVimMode)
            this.vimStatusBar.setText(this.currentVimStatus);
    };
    VimrcPlugin.prototype.onunload = function () {
        console.log('unloading Vimrc plugin (but Vim commands that were already loaded will still work)');
    };
    VimrcPlugin.prototype.getActiveView = function () {
        return this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
    };
    VimrcPlugin.prototype.getCodeMirror = function (view) {
        var _a, _b, _c;
        return (_c = (_b = (_a = view.editMode) === null || _a === void 0 ? void 0 : _a.editor) === null || _b === void 0 ? void 0 : _b.cm) === null || _c === void 0 ? void 0 : _c.cm;
    };
    VimrcPlugin.prototype.readVimInit = function (vimCommands) {
        var _this = this;
        var view = this.getActiveView();
        if (view) {
            var cmEditor = this.getCodeMirror(view);
            if (cmEditor && !this.codeMirrorVimObject.loadedVimrc) {
                this.defineBasicCommands(this.codeMirrorVimObject);
                this.defineSendKeys(this.codeMirrorVimObject);
                this.defineObCommand(this.codeMirrorVimObject);
                this.defineSurround(this.codeMirrorVimObject);
                this.defineJsCommand(this.codeMirrorVimObject);
                this.defineJsFile(this.codeMirrorVimObject);
                vimCommands.split("\n").forEach(function (line, index, arr) {
                    if (line.trim().length > 0 && line.trim()[0] != '"') {
                        var split = line.split(" ");
                        if (mappingCommands.includes(split[0])) {
                            // Have to do this because "vim-command-done" event doesn't actually work properly, or something.
                            this.customVimKeybinds[split[1]] = true;
                        }
                        this.codeMirrorVimObject.handleEx(cmEditor, line);
                    }
                }.bind(this) // Faster than an arrow function. https://stackoverflow.com/questions/50375440/binding-vs-arrow-function-for-react-onclick-event
                );
                this.prepareChordDisplay();
                this.prepareVimModeDisplay();
                // Make sure that we load it just once per CodeMirror instance.
                // This is supposed to work because the Vim state is kept at the keymap level, hopefully
                // there will not be bugs caused by operations that are kept at the object level instead
                this.codeMirrorVimObject.loadedVimrc = true;
            }
            if (cmEditor) {
                cmEditor.on('vim-mode-change', function (modeObj) {
                    if (modeObj)
                        _this.logVimModeChange(modeObj);
                });
                this.defineFixedLayout(cmEditor);
            }
        }
    };
    VimrcPlugin.prototype.defineBasicCommands = function (vimObject) {
        var _this = this;
        vimObject.defineOption('clipboard', '', 'string', ['clip'], function (value, cm) {
            if (value) {
                if (value.trim() == 'unnamed' || value.trim() == 'unnamedplus') {
                    if (!_this.yankToSystemClipboard) {
                        _this.yankToSystemClipboard = true;
                        console.log("Vim is now set to yank to system clipboard.");
                    }
                }
                else {
                    throw new Error("Unrecognized clipboard option, supported are 'unnamed' and 'unnamedplus' (and they do the same)");
                }
            }
        });
        vimObject.defineOption('tabstop', 4, 'number', [], function (value, cm) {
            if (value && cm) {
                cm.setOption('tabSize', value);
            }
        });
        vimObject.defineEx('iunmap', '', function (cm, params) {
            if (params.argString.trim()) {
                _this.codeMirrorVimObject.unmap(params.argString.trim(), 'insert');
            }
        });
        vimObject.defineEx('nunmap', '', function (cm, params) {
            if (params.argString.trim()) {
                _this.codeMirrorVimObject.unmap(params.argString.trim(), 'normal');
            }
        });
        vimObject.defineEx('vunmap', '', function (cm, params) {
            if (params.argString.trim()) {
                _this.codeMirrorVimObject.unmap(params.argString.trim(), 'visual');
            }
        });
        vimObject.defineEx('noremap', '', function (cm, params) {
            var _a;
            if (!((_a = params === null || params === void 0 ? void 0 : params.args) === null || _a === void 0 ? void 0 : _a.length)) {
                throw new Error('Invalid mapping: noremap');
            }
            if (params.argString.trim()) {
                _this.codeMirrorVimObject.noremap.apply(_this.codeMirrorVimObject, params.args);
            }
        });
        // Allow the user to register an Ex command
        vimObject.defineEx('exmap', '', function (cm, params) {
            var _a;
            if (((_a = params === null || params === void 0 ? void 0 : params.args) === null || _a === void 0 ? void 0 : _a.length) && params.args.length < 2) {
                throw new Error("exmap requires at least 2 parameters: [name] [actions...]");
            }
            var commandName = params.args[0];
            params.args.shift();
            var commandContent = params.args.join(' ');
            // The content of the user's Ex command is just the remaining parameters of the exmap command
            _this.codeMirrorVimObject.defineEx(commandName, '', function (cm, params) {
                _this.codeMirrorVimObject.handleEx(cm, commandContent);
            });
        });
    };
    VimrcPlugin.prototype.defineSendKeys = function (vimObject) {
        var _this = this;
        vimObject.defineEx('sendkeys', '', function (cm, params) { return __awaiter(_this, void 0, void 0, function () {
            var allGood, events, _i, _a, key, delay, keyEvent, _b, events_1;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!((_c = params === null || params === void 0 ? void 0 : params.args) === null || _c === void 0 ? void 0 : _c.length)) {
                            console.log(params);
                            throw new Error("The sendkeys command requires a list of keys, e.g. sendKeys Ctrl+p a b Enter");
                        }
                        allGood = true;
                        events = [];
                        _i = 0, _a = params.args;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        key = _a[_i];
                        if (!key.startsWith('wait')) return [3 /*break*/, 3];
                        delay = key.slice(4);
                        return [4 /*yield*/, sleep(delay * 1000)];
                    case 2:
                        _d.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        keyEvent = null;
                        try {
                            keyEvent = new KeyboardEvent('keydown', keyboardeventFromElectronAccelerator.toKeyEvent(key));
                            events.push(keyEvent);
                        }
                        catch (e) {
                            allGood = false;
                            throw new Error("Key '" + key + "' couldn't be read as an Electron Accelerator");
                        }
                        if (allGood) {
                            for (_b = 0, events_1 = events; _b < events_1.length; _b++) {
                                keyEvent = events_1[_b];
                                window.postMessage(JSON.parse(JSON.stringify(keyEvent)), '*');
                            }
                            // view.containerEl.dispatchEvent(keyEvent);
                        }
                        _d.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    VimrcPlugin.prototype.defineObCommand = function (vimObject) {
        var _this = this;
        vimObject.defineEx('obcommand', '', function (cm, params) { return __awaiter(_this, void 0, void 0, function () {
            var availableCommands, view, editor, command, callback, checkCallback, editorCallback, editorCheckCallback;
            var _a;
            return __generator(this, function (_b) {
                availableCommands = this.app.commands.commands;
                if (!((_a = params === null || params === void 0 ? void 0 : params.args) === null || _a === void 0 ? void 0 : _a.length) || params.args.length != 1) {
                    console.log("Available commands: " + Object.keys(availableCommands).join('\n'));
                    throw new Error("obcommand requires exactly 1 parameter");
                }
                view = this.getActiveView();
                editor = view.editor;
                command = params.args[0];
                if (command in availableCommands) {
                    callback = availableCommands[command].callback;
                    checkCallback = availableCommands[command].checkCallback;
                    editorCallback = availableCommands[command].editorCallback;
                    editorCheckCallback = availableCommands[command].editorCheckCallback;
                    if (editorCheckCallback)
                        editorCheckCallback(false, editor, view);
                    else if (editorCallback)
                        editorCallback(editor, view);
                    else if (checkCallback)
                        checkCallback(false);
                    else if (callback)
                        callback();
                    else
                        throw new Error("Command " + command + " doesn't have an Obsidian callback");
                }
                else
                    throw new Error("Command " + command + " was not found, try 'obcommand' with no params to see in the developer console what's available");
                return [2 /*return*/];
            });
        }); });
    };
    VimrcPlugin.prototype.defineSurround = function (vimObject) {
        var _this = this;
        // Function to surround selected text or highlighted word.
        var surroundFunc = function (params) {
            var _a;
            var editor = _this.getActiveView().editor;
            if (!params.length) {
                throw new Error("surround requires exactly 2 parameters: prefix and postfix text.");
            }
            var newArgs = params.join(" ").match(/(\\.|[^\s\\\\]+)+/g);
            if (newArgs.length != 2) {
                throw new Error("surround requires exactly 2 parameters: prefix and postfix text.");
            }
            var beginning = newArgs[0].replace("\\\\", "\\").replace("\\ ", " "); // Get the beginning surround text
            var ending = newArgs[1].replace("\\\\", "\\").replace("\\ ", " "); // Get the ending surround text
            var currentSelections = _this.currentSelection;
            var chosenSelection = currentSelections && currentSelections.length > 0 ? currentSelections[0] : null;
            if (_this.currentSelection && (currentSelections === null || currentSelections === void 0 ? void 0 : currentSelections.length) > 1) {
                console.log("WARNING: Multiple selections in surround. Attempt to select matching cursor. (obsidian-vimrc-support)");
                var cursorPos = editor.getCursor();
                for (var _i = 0, currentSelections_1 = currentSelections; _i < currentSelections_1.length; _i++) {
                    var selection = currentSelections_1[_i];
                    if (selection.head.line == cursorPos.line && selection.head.ch == cursorPos.ch) {
                        console.log("RESOLVED: Selection matching cursor found. (obsidian-vimrc-support)");
                        chosenSelection = selection;
                        break;
                    }
                }
            }
            if (JSON.stringify(chosenSelection.anchor) === JSON.stringify(chosenSelection.head)) {
                // No range of selected text, so select word.
                var line = editor.getLine(chosenSelection.anchor.line);
                if (line.length === 0)
                    throw new Error("can't surround on an empty line");
                // Go to the beginning of the word
                var wordStart = chosenSelection.anchor.ch;
                for (; wordStart >= 0; wordStart--)
                    if (line[wordStart].match(/\s/))
                        break;
                wordStart++;
                var wordEnd = chosenSelection.anchor.ch;
                for (; wordEnd < line.length; wordEnd++)
                    if (line[wordEnd].match(/\s/))
                        break;
                var word = line.substring(wordStart, wordEnd);
                chosenSelection.anchor.ch = wordStart;
                chosenSelection.head.ch = wordEnd;
                chosenSelection = {
                    anchor: { line: chosenSelection.anchor.line, ch: wordStart },
                    head: { line: chosenSelection.head.line, ch: wordEnd }
                };
            }
            // If the selection is reverse, switch the variables
            if (chosenSelection.anchor.line > chosenSelection.head.line ||
                (chosenSelection.anchor.line == chosenSelection.head.line && chosenSelection.anchor.ch > chosenSelection.head.ch))
                _a = [chosenSelection.head, chosenSelection.anchor], chosenSelection.anchor = _a[0], chosenSelection.head = _a[1];
            var currText = editor.getRange(chosenSelection.anchor, chosenSelection.head);
            editor.replaceRange(beginning + currText + ending, chosenSelection.anchor, chosenSelection.head);
        };
        vimObject.defineEx("surround", "", function (cm, params) { surroundFunc(params.args); });
        vimObject.defineEx("pasteinto", "", function (cm, params) {
            // Using the register for when this.yankToSystemClipboard == false
            surroundFunc(['[',
                '](' + vimObject.getRegisterController().getRegister('yank').keyBuffer + ")"]);
        });
        var editor = this.getActiveView().editor;
        // Handle the surround dialog input
        var surroundDialogCallback = function (value) {
            if ((/^\[+$/).test(value)) { // check for 1-inf [ and match them with ]
                surroundFunc([value, "]".repeat(value.length)]);
            }
            else if ((/^\(+$/).test(value)) { // check for 1-inf ( and match them with )
                surroundFunc([value, ")".repeat(value.length)]);
            }
            else if ((/^\{+$/).test(value)) { // check for 1-inf { and match them with }
                surroundFunc([value, "}".repeat(value.length)]);
            }
            else { // Else, just put it before and after.
                surroundFunc([value, value]);
            }
        };
        vimObject.defineOperator("surroundOperator", function () {
            var p = "<span>Surround with: <input type='text'></span>";
            CodeMirror.openDialog(p, surroundDialogCallback, { bottom: true, selectValueOnOpen: false });
        });
        vimObject.mapCommand("<A-y>s", "operator", "surroundOperator");
    };
    VimrcPlugin.prototype.captureYankBuffer = function (win) {
        return __awaiter(this, void 0, void 0, function () {
            var yankRegister, currentYankBuffer, buf, _a, currentClipboardText, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.yankToSystemClipboard) {
                            return [2 /*return*/];
                        }
                        yankRegister = this.codeMirrorVimObject.getRegisterController().getRegister('yank');
                        currentYankBuffer = yankRegister.keyBuffer;
                        buf = currentYankBuffer[0];
                        if (!(buf !== this.lastYankBuffer[0])) return [3 /*break*/, 3];
                        return [4 /*yield*/, win.navigator.clipboard.writeText(buf)];
                    case 1:
                        _b.sent();
                        this.lastYankBuffer = currentYankBuffer;
                        _a = this;
                        return [4 /*yield*/, win.navigator.clipboard.readText()];
                    case 2:
                        _a.lastSystemClipboard = _b.sent();
                        return [2 /*return*/];
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, win.navigator.clipboard.readText()];
                    case 4:
                        currentClipboardText = _b.sent();
                        if (currentClipboardText !== this.lastSystemClipboard) {
                            yankRegister.setText(currentClipboardText);
                            this.lastYankBuffer = yankRegister.keyBuffer;
                            this.lastSystemClipboard = currentClipboardText;
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_2 = _b.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    VimrcPlugin.prototype.prepareChordDisplay = function () {
        var _this = this;
        if (this.settings.displayChord) {
            // Add status bar item
            this.vimChordStatusBar = this.addStatusBarItem();
            // Move vimChordStatusBar to the leftmost position and center it.
            var parent_1 = this.vimChordStatusBar.parentElement;
            this.vimChordStatusBar.parentElement.insertBefore(this.vimChordStatusBar, parent_1.firstChild);
            this.vimChordStatusBar.style.marginRight = "auto";
            var cmEditor = this.getCodeMirror(this.getActiveView());
            // See https://codemirror.net/doc/manual.html#vimapi_events for events.
            CodeMirror.on(cmEditor, "vim-keypress", function (vimKey) { return __awaiter(_this, void 0, void 0, function () {
                var tempS, _i, _a, s;
                return __generator(this, function (_b) {
                    if (vimKey != "<Esc>") { // TODO figure out what to actually look for to exit commands.
                        this.currentKeyChord.push(vimKey);
                        if (this.customVimKeybinds[this.currentKeyChord.join("")] != undefined) { // Custom key chord exists.
                            this.currentKeyChord = [];
                        }
                    }
                    else {
                        this.currentKeyChord = [];
                    }
                    tempS = "";
                    for (_i = 0, _a = this.currentKeyChord; _i < _a.length; _i++) {
                        s = _a[_i];
                        tempS += " " + s;
                    }
                    if (tempS != "") {
                        tempS += "-";
                    }
                    this.vimChordStatusBar.setText(tempS);
                    return [2 /*return*/];
                });
            }); });
            CodeMirror.on(cmEditor, "vim-command-done", function (reason) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.vimChordStatusBar.setText("");
                    this.currentKeyChord = [];
                    return [2 /*return*/];
                });
            }); });
        }
    };
    VimrcPlugin.prototype.prepareVimModeDisplay = function () {
        if (this.settings.displayVimMode) {
            this.vimStatusBar = this.addStatusBarItem(); // Add status bar item
            this.vimStatusBar.setText("\uD83D\uDFE2" /* normal */); // Init the vimStatusBar with normal mode
        }
    };
    VimrcPlugin.prototype.defineFixedLayout = function (cm) {
        var _this = this;
        cm.on('keydown', function (instance, ev) {
            if (_this.settings.fixedNormalModeLayout) {
                var keyMap = _this.settings.capturedKeyboardMap;
                if (!_this.isInsertMode && !ev.shiftKey &&
                    ev.code in keyMap && ev.key != keyMap[ev.code]) {
                    _this.codeMirrorVimObject.handleKey(instance, keyMap[ev.code], 'mapping');
                    ev.preventDefault();
                    return false;
                }
            }
        });
    };
    VimrcPlugin.prototype.defineJsCommand = function (vimObject) {
        var _this = this;
        vimObject.defineEx('jscommand', '', function (cm, params) {
            if (!_this.settings.supportJsCommands)
                throw new Error("JS commands are turned off; enable them via the Vimrc plugin configuration if you're sure you know what you're doing");
            var jsCode = params.argString.trim();
            if (jsCode[0] != '{' || jsCode[jsCode.length - 1] != '}')
                throw new Error("Expected an argument which is JS code surrounded by curly brackets: {...}");
            var currentSelections = _this.currentSelection;
            var chosenSelection = currentSelections && currentSelections.length > 0 ? currentSelections[0] : null;
            var command = Function('editor', 'view', 'selection', jsCode);
            var view = _this.getActiveView();
            command(view.editor, view, chosenSelection);
        });
    };
    VimrcPlugin.prototype.defineJsFile = function (vimObject) {
        var _this = this;
        vimObject.defineEx('jsfile', '', function (cm, params) { return __awaiter(_this, void 0, void 0, function () {
            var extraCode, fileName, currentSelections, chosenSelection, content, e_3, command, view;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.settings.supportJsCommands)
                            throw new Error("JS commands are turned off; enable them via the Vimrc plugin configuration if you're sure you know what you're doing");
                        if (((_a = params === null || params === void 0 ? void 0 : params.args) === null || _a === void 0 ? void 0 : _a.length) < 1)
                            throw new Error("Expected format: fileName {extraCode}");
                        extraCode = '';
                        fileName = params.args[0];
                        if (params.args.length > 1) {
                            params.args.shift();
                            extraCode = params.args.join(' ').trim();
                            if (extraCode[0] != '{' || extraCode[extraCode.length - 1] != '}')
                                throw new Error("Expected an extra code argument which is JS code surrounded by curly brackets: {...}");
                        }
                        currentSelections = this.currentSelection;
                        chosenSelection = currentSelections && currentSelections.length > 0 ? currentSelections[0] : null;
                        content = '';
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.app.vault.adapter.read(fileName)];
                    case 2:
                        content = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _b.sent();
                        throw new Error("Cannot read file " + params.args[0] + " from vault root: " + e_3.message);
                    case 4:
                        command = Function('editor', 'view', 'selection', content + extraCode);
                        view = this.getActiveView();
                        command(view.editor, view, chosenSelection);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return VimrcPlugin;
}(obsidian.Plugin));
var SettingsTab = /** @class */ (function (_super) {
    __extends(SettingsTab, _super);
    function SettingsTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    SettingsTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Vimrc Settings' });
        new obsidian.Setting(containerEl)
            .setName('Vimrc file name')
            .setDesc('Relative to vault directory (requires restart)')
            .addText(function (text) {
            text.setPlaceholder(DEFAULT_SETTINGS.vimrcFileName);
            text.setValue(_this.plugin.settings.vimrcFileName || DEFAULT_SETTINGS.vimrcFileName);
            text.onChange(function (value) {
                _this.plugin.settings.vimrcFileName = value;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Vim chord display')
            .setDesc('Displays the current chord until completion. Ex: "<Space> f-" (requires restart)')
            .addToggle(function (toggle) {
            toggle.setValue(_this.plugin.settings.displayChord || DEFAULT_SETTINGS.displayChord);
            toggle.onChange(function (value) {
                _this.plugin.settings.displayChord = value;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Vim mode display')
            .setDesc('Displays the current vim mode (requires restart)')
            .addToggle(function (toggle) {
            toggle.setValue(_this.plugin.settings.displayVimMode || DEFAULT_SETTINGS.displayVimMode);
            toggle.onChange(function (value) {
                _this.plugin.settings.displayVimMode = value;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Use a fixed keyboard layout for Normal mode')
            .setDesc('Define a keyboard layout to always use when in Normal mode, regardless of the input language (experimental).')
            .addButton(function (button) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                button.setButtonText('Capture current layout');
                button.onClick(function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = this.plugin.settings;
                                return [4 /*yield*/, this.plugin.captureKeyboardLayout()];
                            case 1:
                                _a.capturedKeyboardMap = _b.sent();
                                this.plugin.saveSettings();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); })
            .addToggle(function (toggle) {
            toggle.setValue(_this.plugin.settings.fixedNormalModeLayout || DEFAULT_SETTINGS.fixedNormalModeLayout);
            toggle.onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.plugin.settings.fixedNormalModeLayout = value;
                            if (!(value && Object.keys(this.plugin.settings.capturedKeyboardMap).length === 0)) return [3 /*break*/, 2];
                            _a = this.plugin.settings;
                            return [4 /*yield*/, this.plugin.captureKeyboardLayout()];
                        case 1:
                            _a.capturedKeyboardMap = _b.sent();
                            _b.label = 2;
                        case 2:
                            this.plugin.saveSettings();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName('Support JS commands (beware!)')
            .setDesc("Support the 'jscommand' and 'jsfile' commands, which allow defining Ex commands using Javascript. WARNING! Review the README to understand why this may be dangerous before enabling.")
            .addToggle(function (toggle) {
            var _a;
            toggle.setValue((_a = _this.plugin.settings.supportJsCommands) !== null && _a !== void 0 ? _a : DEFAULT_SETTINGS.supportJsCommands);
            toggle.onChange(function (value) {
                _this.plugin.settings.supportJsCommands = value;
                _this.plugin.saveSettings();
            });
        });
    };
    return SettingsTab;
}(obsidian.PluginSettingTab));

module.exports = VimrcPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5vZGVfbW9kdWxlcy9rZXlib2FyZGV2ZW50LWZyb20tZWxlY3Ryb24tYWNjZWxlcmF0b3IvaW5kZXguanMiLCJtYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsImNvbnN0IG1vZGlmaWVycyA9IC9eKENvbW1hbmRPckNvbnRyb2x8Q21kT3JDdHJsfENvbW1hbmR8Q21kfENvbnRyb2x8Q3RybHxBbHRHcnxPcHRpb258QWx0fFNoaWZ0fFN1cGVyKS9pO1xuY29uc3Qga2V5Q29kZXMgPSAvXihQbHVzfFNwYWNlfFRhYnxCYWNrc3BhY2V8RGVsZXRlfEluc2VydHxSZXR1cm58RW50ZXJ8VXB8RG93bnxMZWZ0fFJpZ2h0fEhvbWV8RW5kfFBhZ2VVcHxQYWdlRG93bnxFc2NhcGV8RXNjfFZvbHVtZVVwfFZvbHVtZURvd258Vm9sdW1lTXV0ZXxNZWRpYU5leHRUcmFja3xNZWRpYVByZXZpb3VzVHJhY2t8TWVkaWFTdG9wfE1lZGlhUGxheVBhdXNlfFByaW50U2NyZWVufEYyNHxGMjN8RjIyfEYyMXxGMjB8RjE5fEYxOHxGMTd8RjE2fEYxNXxGMTR8RjEzfEYxMnxGMTF8RjEwfEY5fEY4fEY3fEY2fEY1fEY0fEYzfEYyfEYxfFswLTlBLVopIUAjJCVeJiooOis8Xz4/fnt8fVwiOz0sXFwtLi9gW1xcXFxcXF0nXSkvaTtcbmNvbnN0IFVOU1VQUE9SVEVEID0ge307XG5cbmZ1bmN0aW9uIF9jb21tYW5kKGFjY2VsZXJhdG9yLCBldmVudCwgbW9kaWZpZXIpIHtcblx0aWYgKHByb2Nlc3MucGxhdGZvcm0gIT09ICdkYXJ3aW4nKSB7XG5cdFx0cmV0dXJuIFVOU1VQUE9SVEVEO1xuXHR9XG5cblx0aWYgKGV2ZW50Lm1ldGFLZXkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0RvdWJsZSBgQ29tbWFuZGAgbW9kaWZpZXIgc3BlY2lmaWVkLicpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRldmVudDogT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQsIHttZXRhS2V5OiB0cnVlfSksXG5cdFx0YWNjZWxlcmF0b3I6IGFjY2VsZXJhdG9yLnNsaWNlKG1vZGlmaWVyLmxlbmd0aClcblx0fTtcbn1cblxuZnVuY3Rpb24gX3N1cGVyKGFjY2VsZXJhdG9yLCBldmVudCwgbW9kaWZpZXIpIHtcblx0aWYgKGV2ZW50Lm1ldGFLZXkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0RvdWJsZSBgU3VwZXJgIG1vZGlmaWVyIHNwZWNpZmllZC4nKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0ZXZlbnQ6IE9iamVjdC5hc3NpZ24oe30sIGV2ZW50LCB7bWV0YUtleTogdHJ1ZX0pLFxuXHRcdGFjY2VsZXJhdG9yOiBhY2NlbGVyYXRvci5zbGljZShtb2RpZmllci5sZW5ndGgpXG5cdH07XG59XG5cbmZ1bmN0aW9uIF9jb21tYW5kb3Jjb250cm9sKGFjY2VsZXJhdG9yLCBldmVudCwgbW9kaWZpZXIpIHtcblx0aWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICdkYXJ3aW4nKSB7XG5cdFx0aWYgKGV2ZW50Lm1ldGFLZXkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignRG91YmxlIGBDb21tYW5kYCBtb2RpZmllciBzcGVjaWZpZWQuJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGV2ZW50OiBPYmplY3QuYXNzaWduKHt9LCBldmVudCwge21ldGFLZXk6IHRydWV9KSxcblx0XHRcdGFjY2VsZXJhdG9yOiBhY2NlbGVyYXRvci5zbGljZShtb2RpZmllci5sZW5ndGgpXG5cdFx0fTtcblx0fVxuXG5cdGlmIChldmVudC5jdHJsS2V5KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdEb3VibGUgYENvbnRyb2xgIG1vZGlmaWVyIHNwZWNpZmllZC4nKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0ZXZlbnQ6IE9iamVjdC5hc3NpZ24oe30sIGV2ZW50LCB7Y3RybEtleTogdHJ1ZX0pLFxuXHRcdGFjY2VsZXJhdG9yOiBhY2NlbGVyYXRvci5zbGljZShtb2RpZmllci5sZW5ndGgpXG5cdH07XG59XG5cbmZ1bmN0aW9uIF9hbHQoYWNjZWxlcmF0b3IsIGV2ZW50LCBtb2RpZmllcikge1xuXHRpZiAobW9kaWZpZXIgPT09ICdvcHRpb24nICYmIHByb2Nlc3MucGxhdGZvcm0gIT09ICdkYXJ3aW4nKSB7XG5cdFx0cmV0dXJuIFVOU1VQUE9SVEVEO1xuXHR9XG5cblx0aWYgKGV2ZW50LmFsdEtleSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignRG91YmxlIGBBbHRgIG1vZGlmaWVyIHNwZWNpZmllZC4nKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0ZXZlbnQ6IE9iamVjdC5hc3NpZ24oe30sIGV2ZW50LCB7YWx0S2V5OiB0cnVlfSksXG5cdFx0YWNjZWxlcmF0b3I6IGFjY2VsZXJhdG9yLnNsaWNlKG1vZGlmaWVyLmxlbmd0aClcblx0fTtcbn1cblxuZnVuY3Rpb24gX3NoaWZ0KGFjY2VsZXJhdG9yLCBldmVudCwgbW9kaWZpZXIpIHtcblx0aWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdEb3VibGUgYFNoaWZ0YCBtb2RpZmllciBzcGVjaWZpZWQuJyk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGV2ZW50OiBPYmplY3QuYXNzaWduKHt9LCBldmVudCwge3NoaWZ0S2V5OiB0cnVlfSksXG5cdFx0YWNjZWxlcmF0b3I6IGFjY2VsZXJhdG9yLnNsaWNlKG1vZGlmaWVyLmxlbmd0aClcblx0fTtcbn1cblxuZnVuY3Rpb24gX2NvbnRyb2woYWNjZWxlcmF0b3IsIGV2ZW50LCBtb2RpZmllcikge1xuXHRpZiAoZXZlbnQuY3RybEtleSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignRG91YmxlIGBDb250cm9sYCBtb2RpZmllciBzcGVjaWZpZWQuJyk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGV2ZW50OiBPYmplY3QuYXNzaWduKHt9LCBldmVudCwge2N0cmxLZXk6IHRydWV9KSxcblx0XHRhY2NlbGVyYXRvcjogYWNjZWxlcmF0b3Iuc2xpY2UobW9kaWZpZXIubGVuZ3RoKVxuXHR9O1xufVxuXG5mdW5jdGlvbiByZWR1Y2VNb2RpZmllcih7YWNjZWxlcmF0b3IsIGV2ZW50fSwgbW9kaWZpZXIpIHtcblx0c3dpdGNoIChtb2RpZmllcikge1xuXHRcdGNhc2UgJ2NvbW1hbmQnOlxuXHRcdGNhc2UgJ2NtZCc6IHtcblx0XHRcdHJldHVybiBfY29tbWFuZChhY2NlbGVyYXRvciwgZXZlbnQsIG1vZGlmaWVyKTtcblx0XHR9XG5cblx0XHRjYXNlICdzdXBlcic6IHtcblx0XHRcdHJldHVybiBfc3VwZXIoYWNjZWxlcmF0b3IsIGV2ZW50LCBtb2RpZmllcik7XG5cdFx0fVxuXG5cdFx0Y2FzZSAnY29udHJvbCc6XG5cdFx0Y2FzZSAnY3RybCc6IHtcblx0XHRcdHJldHVybiBfY29udHJvbChhY2NlbGVyYXRvciwgZXZlbnQsIG1vZGlmaWVyKTtcblx0XHR9XG5cblx0XHRjYXNlICdjb21tYW5kb3Jjb250cm9sJzpcblx0XHRjYXNlICdjbWRvcmN0cmwnOiB7XG5cdFx0XHRyZXR1cm4gX2NvbW1hbmRvcmNvbnRyb2woYWNjZWxlcmF0b3IsIGV2ZW50LCBtb2RpZmllcik7XG5cdFx0fVxuXG5cdFx0Y2FzZSAnb3B0aW9uJzpcblx0XHRjYXNlICdhbHRncic6XG5cdFx0Y2FzZSAnYWx0Jzoge1xuXHRcdFx0cmV0dXJuIF9hbHQoYWNjZWxlcmF0b3IsIGV2ZW50LCBtb2RpZmllcik7XG5cdFx0fVxuXG5cdFx0Y2FzZSAnc2hpZnQnOiB7XG5cdFx0XHRyZXR1cm4gX3NoaWZ0KGFjY2VsZXJhdG9yLCBldmVudCwgbW9kaWZpZXIpO1xuXHRcdH1cblxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRjb25zb2xlLmVycm9yKG1vZGlmaWVyKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZWR1Y2VQbHVzKHthY2NlbGVyYXRvciwgZXZlbnR9KSB7XG5cdHJldHVybiB7XG5cdFx0ZXZlbnQsXG5cdFx0YWNjZWxlcmF0b3I6IGFjY2VsZXJhdG9yLnRyaW0oKS5zbGljZSgxKVxuXHR9O1xufVxuXG5jb25zdCB2aXJ0dWFsS2V5Q29kZXMgPSB7XG5cdDA6ICdEaWdpdDAnLFxuXHQxOiAnRGlnaXQxJyxcblx0MjogJ0RpZ2l0MicsXG5cdDM6ICdEaWdpdDMnLFxuXHQ0OiAnRGlnaXQ0Jyxcblx0NTogJ0RpZ2l0NScsXG5cdDY6ICdEaWdpdDYnLFxuXHQ3OiAnRGlnaXQ3Jyxcblx0ODogJ0RpZ2l0OCcsXG5cdDk6ICdEaWdpdDknLFxuXHQnLSc6ICdNaW51cycsXG5cdCc9JzogJ0VxdWFsJyxcblx0UTogJ0tleVEnLFxuXHRXOiAnS2V5VycsXG5cdEU6ICdLZXlFJyxcblx0UjogJ0tleVInLFxuXHRUOiAnS2V5VCcsXG5cdFk6ICdLZXlZJyxcblx0VTogJ0tleVUnLFxuXHRJOiAnS2V5SScsXG5cdE86ICdLZXlPJyxcblx0UDogJ0tleVAnLFxuXHQnWyc6ICdCcmFja2V0TGVmdCcsXG5cdCddJzogJ0JyYWNrZXRSaWdodCcsXG5cdEE6ICdLZXlBJyxcblx0UzogJ0tleVMnLFxuXHREOiAnS2V5RCcsXG5cdEY6ICdLZXlGJyxcblx0RzogJ0tleUcnLFxuXHRIOiAnS2V5SCcsXG5cdEo6ICdLZXlKJyxcblx0SzogJ0tleUsnLFxuXHRMOiAnS2V5TCcsXG5cdCc7JzogJ1NlbWljb2xvbicsXG5cdCdcXCcnOiAnUXVvdGUnLFxuXHQnYCc6ICdCYWNrcXVvdGUnLFxuXHQnLyc6ICdCYWNrc2xhc2gnLFxuXHRaOiAnS2V5WicsXG5cdFg6ICdLZXlYJyxcblx0QzogJ0tleUMnLFxuXHRWOiAnS2V5VicsXG5cdEI6ICdLZXlCJyxcblx0TjogJ0tleU4nLFxuXHRNOiAnS2V5TScsXG5cdCcsJzogJ0NvbW1hJyxcblx0Jy4nOiAnUGVyaW9kJyxcblx0J1xcXFwnOiAnU2xhc2gnLFxuXHQnICc6ICdTcGFjZSdcbn07XG5cbmZ1bmN0aW9uIHJlZHVjZUtleSh7YWNjZWxlcmF0b3IsIGV2ZW50fSwga2V5KSB7XG5cdGlmIChrZXkubGVuZ3RoID4gMSB8fCBldmVudC5rZXkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYFVudmFsaWQga2V5Y29kZSBcXGAke2tleX1cXGAuYCk7XG5cdH1cblxuXHRjb25zdCBjb2RlID1cblx0XHRrZXkudG9VcHBlckNhc2UoKSBpbiB2aXJ0dWFsS2V5Q29kZXMgP1xuXHRcdFx0dmlydHVhbEtleUNvZGVzW2tleS50b1VwcGVyQ2FzZSgpXSA6XG5cdFx0XHRudWxsO1xuXG5cdHJldHVybiB7XG5cdFx0ZXZlbnQ6IE9iamVjdC5hc3NpZ24oe30sIGV2ZW50LCB7a2V5fSwgY29kZSA/IHtjb2RlfSA6IG51bGwpLFxuXHRcdGFjY2VsZXJhdG9yOiBhY2NlbGVyYXRvci50cmltKCkuc2xpY2Uoa2V5Lmxlbmd0aClcblx0fTtcbn1cblxuY29uc3QgZG9tS2V5cyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShudWxsKSwge1xuXHRwbHVzOiAnQWRkJyxcblx0c3BhY2U6ICdTcGFjZScsXG5cdHRhYjogJ1RhYicsXG5cdGJhY2tzcGFjZTogJ0JhY2tzcGFjZScsXG5cdGRlbGV0ZTogJ0RlbGV0ZScsXG5cdGluc2VydDogJ0luc2VydCcsXG5cdHJldHVybjogJ1JldHVybicsXG5cdGVudGVyOiAnUmV0dXJuJyxcblx0dXA6ICdBcnJvd1VwJyxcblx0ZG93bjogJ0Fycm93RG93bicsXG5cdGxlZnQ6ICdBcnJvd0xlZnQnLFxuXHRyaWdodDogJ0Fycm93UmlnaHQnLFxuXHRob21lOiAnSG9tZScsXG5cdGVuZDogJ0VuZCcsXG5cdHBhZ2V1cDogJ1BhZ2VVcCcsXG5cdHBhZ2Vkb3duOiAnUGFnZURvd24nLFxuXHRlc2NhcGU6ICdFc2NhcGUnLFxuXHRlc2M6ICdFc2NhcGUnLFxuXHR2b2x1bWV1cDogJ0F1ZGlvVm9sdW1lVXAnLFxuXHR2b2x1bWVkb3duOiAnQXVkaW9Wb2x1bWVEb3duJyxcblx0dm9sdW1lbXV0ZTogJ0F1ZGlvVm9sdW1lTXV0ZScsXG5cdG1lZGlhbmV4dHRyYWNrOiAnTWVkaWFUcmFja05leHQnLFxuXHRtZWRpYXByZXZpb3VzdHJhY2s6ICdNZWRpYVRyYWNrUHJldmlvdXMnLFxuXHRtZWRpYXN0b3A6ICdNZWRpYVN0b3AnLFxuXHRtZWRpYXBsYXlwYXVzZTogJ01lZGlhUGxheVBhdXNlJyxcblx0cHJpbnRzY3JlZW46ICdQcmludFNjcmVlbidcbn0pO1xuXG4vLyBBZGQgZnVuY3Rpb24ga2V5c1xuZm9yIChsZXQgaSA9IDE7IGkgPD0gMjQ7IGkrKykge1xuXHRkb21LZXlzW2BmJHtpfWBdID0gYEYke2l9YDtcbn1cblxuZnVuY3Rpb24gcmVkdWNlQ29kZSh7YWNjZWxlcmF0b3IsIGV2ZW50fSwge2NvZGUsIGtleX0pIHtcblx0aWYgKGV2ZW50LmNvZGUpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYER1cGxpY2F0ZWQga2V5Y29kZSBcXGAke2tleX1cXGAuYCk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGV2ZW50OiBPYmplY3QuYXNzaWduKHt9LCBldmVudCwge2tleX0sIGNvZGUgPyB7Y29kZX0gOiBudWxsKSxcblx0XHRhY2NlbGVyYXRvcjogYWNjZWxlcmF0b3IudHJpbSgpLnNsaWNlKChrZXkgJiYga2V5Lmxlbmd0aCkgfHwgMClcblx0fTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIHRyYW5zZm9ybSBhbiBFbGVjdHJvbiBBY2NlbGVyYXRvciBzdHJpbmcgaW50b1xuICogYSBET00gS2V5Ym9hcmRFdmVudCBvYmplY3QuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBhY2NlbGVyYXRvciBhbiBFbGVjdHJvbiBBY2NlbGVyYXRvciBzdHJpbmcsIGUuZy4gYEN0cmwrQ2Agb3IgYFNoaWZ0K1NwYWNlYC5cbiAqIEByZXR1cm4ge29iamVjdH0gYSBET00gS2V5Ym9hcmRFdmVudCBvYmplY3QgZGVyaXZhdGUgZnJvbSB0aGUgYGFjY2VsZXJhdG9yYCBhcmd1bWVudC5cbiAqL1xuZnVuY3Rpb24gdG9LZXlFdmVudChhY2NlbGVyYXRvcikge1xuXHRsZXQgc3RhdGUgPSB7YWNjZWxlcmF0b3IsIGV2ZW50OiB7fX07XG5cdHdoaWxlIChzdGF0ZS5hY2NlbGVyYXRvciAhPT0gJycpIHtcblx0XHRjb25zdCBtb2RpZmllck1hdGNoID0gc3RhdGUuYWNjZWxlcmF0b3IubWF0Y2gobW9kaWZpZXJzKTtcblx0XHRpZiAobW9kaWZpZXJNYXRjaCkge1xuXHRcdFx0Y29uc3QgbW9kaWZpZXIgPSBtb2RpZmllck1hdGNoWzBdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRzdGF0ZSA9IHJlZHVjZU1vZGlmaWVyKHN0YXRlLCBtb2RpZmllcik7XG5cdFx0XHRpZiAoc3RhdGUgPT09IFVOU1VQUE9SVEVEKSB7XG5cdFx0XHRcdHJldHVybiB7dW5zdXBwb3J0ZWRLZXlGb3JQbGF0Zm9ybTogdHJ1ZX07XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChzdGF0ZS5hY2NlbGVyYXRvci50cmltKClbMF0gPT09ICcrJykge1xuXHRcdFx0c3RhdGUgPSByZWR1Y2VQbHVzKHN0YXRlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgY29kZU1hdGNoID0gc3RhdGUuYWNjZWxlcmF0b3IubWF0Y2goa2V5Q29kZXMpO1xuXHRcdFx0aWYgKGNvZGVNYXRjaCkge1xuXHRcdFx0XHRjb25zdCBjb2RlID0gY29kZU1hdGNoWzBdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdGlmIChjb2RlIGluIGRvbUtleXMpIHtcblx0XHRcdFx0XHRzdGF0ZSA9IHJlZHVjZUNvZGUoc3RhdGUsIHtcblx0XHRcdFx0XHRcdGNvZGU6IGRvbUtleXNbY29kZV0sXG5cdFx0XHRcdFx0XHRrZXk6IGNvZGVcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzdGF0ZSA9IHJlZHVjZUtleShzdGF0ZSwgY29kZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgVW52YWxpZCBhY2NlbGVyYXRvcjogXCIke3N0YXRlLmFjY2VsZXJhdG9yfVwiYCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHN0YXRlLmV2ZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0VU5TVVBQT1JURUQsXG5cdHJlZHVjZU1vZGlmaWVyLFxuXHRyZWR1Y2VQbHVzLFxuXHRyZWR1Y2VLZXksXG5cdHJlZHVjZUNvZGUsXG5cdHRvS2V5RXZlbnRcbn07XG4iLCJpbXBvcnQgKiBhcyBrZXlGcm9tQWNjZWxlcmF0b3IgZnJvbSAna2V5Ym9hcmRldmVudC1mcm9tLWVsZWN0cm9uLWFjY2VsZXJhdG9yJztcclxuaW1wb3J0IHsgRWRpdG9yU2VsZWN0aW9uLCBOb3RpY2UsIEFwcCwgTWFya2Rvd25WaWV3LCBQbHVnaW4sIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcsIFRGaWxlIH0gZnJvbSAnb2JzaWRpYW4nO1xyXG5cclxuZGVjbGFyZSBjb25zdCBDb2RlTWlycm9yOiBhbnk7XHJcblxyXG5pbnRlcmZhY2UgU2V0dGluZ3Mge1xyXG5cdHZpbXJjRmlsZU5hbWU6IHN0cmluZyxcclxuXHRkaXNwbGF5Q2hvcmQ6IGJvb2xlYW4sXHJcblx0ZGlzcGxheVZpbU1vZGU6IGJvb2xlYW4sXHJcblx0Zml4ZWROb3JtYWxNb2RlTGF5b3V0OiBib29sZWFuLFxyXG5cdGNhcHR1cmVkS2V5Ym9hcmRNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sXHJcblx0c3VwcG9ydEpzQ29tbWFuZHM/OiBib29sZWFuXHJcbn1cclxuXHJcbmNvbnN0IERFRkFVTFRfU0VUVElOR1M6IFNldHRpbmdzID0ge1xyXG5cdHZpbXJjRmlsZU5hbWU6IFwiLm9ic2lkaWFuLnZpbXJjXCIsXHJcblx0ZGlzcGxheUNob3JkOiBmYWxzZSxcclxuXHRkaXNwbGF5VmltTW9kZTogZmFsc2UsXHJcblx0Zml4ZWROb3JtYWxNb2RlTGF5b3V0OiBmYWxzZSxcclxuXHRjYXB0dXJlZEtleWJvYXJkTWFwOiB7fSxcclxuXHRzdXBwb3J0SnNDb21tYW5kczogZmFsc2VcclxufVxyXG5cclxuY29uc3QgZW51bSB2aW1TdGF0dXMge1xyXG5cdG5vcm1hbCA9IFwi8J+folwiLFxyXG5cdGluc2VydCA9IFwi8J+foFwiLFxyXG5cdHJlcGxhY2UgPSBcIvCflLRcIixcclxuXHR2aXN1YWwgPSBcIvCfn6FcIlxyXG59XHJcblxyXG4vLyBOT1RFOiB0byBmdXR1cmUgbWFpbnRhaW5lcnMsIHBsZWFzZSBtYWtlIHN1cmUgYWxsIG1hcHBpbmcgY29tbWFuZHMgYXJlIGluY2x1ZGVkIGluIHRoaXMgYXJyYXkuXHJcbmNvbnN0IG1hcHBpbmdDb21tYW5kczogU3RyaW5nW10gPSBbXHJcblx0XCJtYXBcIixcclxuXHRcIm5tYXBcIixcclxuXHRcIm5vcmVtYXBcIixcclxuXHRcIml1bm1hcFwiLFxyXG5cdFwibnVubWFwXCIsXHJcblx0XCJ2dW5tYXBcIixcclxuXVxyXG5cclxuZnVuY3Rpb24gc2xlZXAobXM6IG51bWJlcikge1xyXG5cdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmltcmNQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xyXG5cdHNldHRpbmdzOiBTZXR0aW5ncztcclxuXHJcblx0cHJpdmF0ZSBjb2RlTWlycm9yVmltT2JqZWN0OiBhbnkgPSBudWxsO1xyXG5cdHByaXZhdGUgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcblx0cHJpdmF0ZSBsYXN0WWFua0J1ZmZlcjogc3RyaW5nW10gPSBbXCJcIl07XHJcblx0cHJpdmF0ZSBsYXN0U3lzdGVtQ2xpcGJvYXJkID0gXCJcIjtcclxuXHRwcml2YXRlIHlhbmtUb1N5c3RlbUNsaXBib2FyZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHByaXZhdGUgY3VycmVudEtleUNob3JkOiBhbnkgPSBbXTtcclxuXHRwcml2YXRlIHZpbUNob3JkU3RhdHVzQmFyOiBIVE1MRWxlbWVudCA9IG51bGw7XHJcblx0cHJpdmF0ZSB2aW1TdGF0dXNCYXI6IEhUTUxFbGVtZW50ID0gbnVsbDtcclxuXHRwcml2YXRlIGN1cnJlbnRWaW1TdGF0dXM6IHZpbVN0YXR1cyA9IHZpbVN0YXR1cy5ub3JtYWw7XHJcblx0cHJpdmF0ZSBjdXN0b21WaW1LZXliaW5kczogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XHJcblx0cHJpdmF0ZSBjdXJyZW50U2VsZWN0aW9uOiBbRWRpdG9yU2VsZWN0aW9uXSA9IG51bGw7XHJcblx0cHJpdmF0ZSBpc0luc2VydE1vZGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0YXN5bmMgY2FwdHVyZUtleWJvYXJkTGF5b3V0KCkge1xyXG5cdFx0Ly8gVGhpcyBpcyBleHBlcmltZW50YWwgQVBJIGFuZCBpdCBtaWdodCBicmVhayBhdCBzb21lIHBvaW50OlxyXG5cdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0tleWJvYXJkTGF5b3V0TWFwXHJcblx0XHRsZXQga2V5TWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XHJcblx0XHRsZXQgbGF5b3V0ID0gYXdhaXQgKG5hdmlnYXRvciBhcyBhbnkpLmtleWJvYXJkLmdldExheW91dE1hcCgpO1xyXG5cdFx0bGV0IGRvbmVJdGVyYXRpbmcgPSBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGxldCBjb3VudGVkID0gMDtcclxuXHRcdFx0bGF5b3V0LmZvckVhY2goKHZhbHVlOiBhbnksIGluZGV4OiBhbnkpID0+IHtcclxuXHRcdFx0XHRrZXlNYXBbaW5kZXhdID0gdmFsdWU7XHJcblx0XHRcdFx0Y291bnRlZCArPSAxO1xyXG5cdFx0XHRcdGlmIChjb3VudGVkID09PSBsYXlvdXQuc2l6ZSlcclxuXHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHRcdGF3YWl0IGRvbmVJdGVyYXRpbmc7XHJcblx0XHRuZXcgTm90aWNlKCdLZXlib2FyZCBsYXlvdXQgY2FwdHVyZWQnKTtcclxuXHRcdHJldHVybiBrZXlNYXA7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0aWFsaXplKCkge1xyXG5cdFx0aWYgKHRoaXMuaW5pdGlhbGl6ZWQpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLmNvZGVNaXJyb3JWaW1PYmplY3QgPSAod2luZG93IGFzIGFueSkuQ29kZU1pcnJvckFkYXB0ZXI/LlZpbTtcclxuXHJcblx0XHR0aGlzLnJlZ2lzdGVyWWFua0V2ZW50cyhhY3RpdmVXaW5kb3cpO1xyXG5cdFx0dGhpcy5hcHAud29ya3NwYWNlLm9uKFwid2luZG93LW9wZW5cIiwgKHdvcmtzcGFjZVdpbmRvdywgdykgPT4ge1xyXG5cdFx0XHR0aGlzLnJlZ2lzdGVyWWFua0V2ZW50cyh3KTtcclxuXHRcdH0pXHJcblxyXG5cdFx0Ly8gVHdvIGV2ZW50cyBjb3NcclxuXHRcdC8vIHRoaXMgZG9uJ3QgdHJpZ2dlciBvbiBsb2FkaW5nL3JlbG9hZGluZyBvYnNpZGlhbiB3aXRoIG5vdGUgb3BlbmVkXHJcblx0XHR0aGlzLmFwcC53b3Jrc3BhY2Uub24oXCJhY3RpdmUtbGVhZi1jaGFuZ2VcIiwgYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHR0aGlzLnVwZGF0ZVNlbGVjdGlvbkV2ZW50KCk7XHJcblx0XHR9KTtcclxuXHRcdC8vIGFuZCB0aGlzIGRvbid0IHRyaWdnZXIgb24gb3BlbmluZyBzYW1lIGZpbGUgaW4gbmV3IHBhbmVcclxuXHRcdHRoaXMuYXBwLndvcmtzcGFjZS5vbihcImZpbGUtb3BlblwiLCBhc3luYyAoKSA9PiB7XHJcblx0XHRcdHRoaXMudXBkYXRlU2VsZWN0aW9uRXZlbnQoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0cmVnaXN0ZXJZYW5rRXZlbnRzKHdpbjogV2luZG93KSB7XHJcblx0XHR0aGlzLnJlZ2lzdGVyRG9tRXZlbnQod2luLmRvY3VtZW50LCAnY2xpY2snLCAoKSA9PiB7XHJcblx0XHRcdHRoaXMuY2FwdHVyZVlhbmtCdWZmZXIod2luKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5yZWdpc3RlckRvbUV2ZW50KHdpbi5kb2N1bWVudCwgJ2tleXVwJywgKCkgPT4ge1xyXG5cdFx0XHR0aGlzLmNhcHR1cmVZYW5rQnVmZmVyKHdpbik7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMucmVnaXN0ZXJEb21FdmVudCh3aW4uZG9jdW1lbnQsICdmb2N1c2luJywgKCkgPT4ge1xyXG5cdFx0XHR0aGlzLmNhcHR1cmVZYW5rQnVmZmVyKHdpbik7XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlU2VsZWN0aW9uRXZlbnQoKSB7XHJcblx0XHRjb25zdCB2aWV3ID0gdGhpcy5nZXRBY3RpdmVWaWV3KCk7XHJcblx0XHRpZiAoIXZpZXcpIHJldHVybjtcclxuXHJcblx0XHRsZXQgY20gPSB0aGlzLmdldENvZGVNaXJyb3Iodmlldyk7XHJcblx0XHRpZiAoXHJcblx0XHRcdHRoaXMuZ2V0Q3Vyc29yQWN0aXZpdHlIYW5kbGVycyhjbSkuc29tZShcclxuXHRcdFx0XHQoZTogeyBuYW1lOiBzdHJpbmcgfSkgPT4gZS5uYW1lID09PSBcInVwZGF0ZVNlbGVjdGlvblwiKVxyXG5cdFx0KSByZXR1cm47XHJcblx0XHRjbS5vbihcImN1cnNvckFjdGl2aXR5XCIsIGFzeW5jIChjbTogQ29kZU1pcnJvci5FZGl0b3IpID0+IHRoaXMudXBkYXRlU2VsZWN0aW9uKGNtKSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyB1cGRhdGVTZWxlY3Rpb24oY206IGFueSkge1xyXG5cdFx0dGhpcy5jdXJyZW50U2VsZWN0aW9uID0gY20ubGlzdFNlbGVjdGlvbnMoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0Q3Vyc29yQWN0aXZpdHlIYW5kbGVycyhjbTogQ29kZU1pcnJvci5FZGl0b3IpIHtcclxuXHRcdHJldHVybiAoY20gYXMgYW55KS5faGFuZGxlcnMuY3Vyc29yQWN0aXZpdHk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBvbmxvYWQoKSB7XHJcblx0XHRhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xyXG5cdFx0dGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBTZXR0aW5nc1RhYih0aGlzLmFwcCwgdGhpcykpXHJcblxyXG5cdFx0Y29uc29sZS5sb2coJ2xvYWRpbmcgVmltcmMgcGx1Z2luJyk7XHJcblxyXG5cdFx0dGhpcy5hcHAud29ya3NwYWNlLm9uKCdhY3RpdmUtbGVhZi1jaGFuZ2UnLCBhc3luYyAoKSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5pbml0aWFsaXplZClcclxuXHRcdFx0XHRhd2FpdCB0aGlzLmluaXRpYWxpemUoKTtcclxuXHRcdFx0aWYgKHRoaXMuY29kZU1pcnJvclZpbU9iamVjdC5sb2FkZWRWaW1yYylcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdGxldCBmaWxlTmFtZSA9IHRoaXMuc2V0dGluZ3MudmltcmNGaWxlTmFtZTtcclxuXHRcdFx0aWYgKCFmaWxlTmFtZSB8fCBmaWxlTmFtZS50cmltKCkubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0ZmlsZU5hbWUgPSBERUZBVUxUX1NFVFRJTkdTLnZpbXJjRmlsZU5hbWU7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ0NvbmZpZ3VyZWQgVmltcmMgZmlsZSBuYW1lIGlzIGlsbGVnYWwsIGZhbGxpbmctYmFjayB0byBkZWZhdWx0Jyk7XHJcblx0XHRcdH1cclxuXHRcdFx0bGV0IHZpbXJjQ29udGVudCA9ICcnO1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHZpbXJjQ29udGVudCA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIucmVhZChmaWxlTmFtZSk7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnRXJyb3IgbG9hZGluZyB2aW1yYyBmaWxlJywgZmlsZU5hbWUsICdmcm9tIHRoZSB2YXVsdCByb290JywgZS5tZXNzYWdlKSBcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnJlYWRWaW1Jbml0KHZpbXJjQ29udGVudCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcclxuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmxvYWREYXRhKCk7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9TRVRUSU5HUywgZGF0YSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBzYXZlU2V0dGluZ3MoKSB7XHJcblx0XHRhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG5cdH1cclxuXHJcblx0bG9nVmltTW9kZUNoYW5nZShtb2RlT2JqOiBhbnkpIHtcclxuXHRcdHRoaXMuaXNJbnNlcnRNb2RlID0gbW9kZU9iai5tb2RlID09PSAnaW5zZXJ0JztcclxuXHRcdHN3aXRjaCAobW9kZU9iai5tb2RlKSB7XHJcblx0XHRcdGNhc2UgXCJpbnNlcnRcIjpcclxuXHRcdFx0XHR0aGlzLmN1cnJlbnRWaW1TdGF0dXMgPSB2aW1TdGF0dXMuaW5zZXJ0O1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwibm9ybWFsXCI6XHJcblx0XHRcdFx0dGhpcy5jdXJyZW50VmltU3RhdHVzID0gdmltU3RhdHVzLm5vcm1hbDtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcInZpc3VhbFwiOlxyXG5cdFx0XHRcdHRoaXMuY3VycmVudFZpbVN0YXR1cyA9IHZpbVN0YXR1cy52aXN1YWw7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgXCJyZXBsYWNlXCI6XHJcblx0XHRcdFx0dGhpcy5jdXJyZW50VmltU3RhdHVzID0gdmltU3RhdHVzLnJlcGxhY2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5kaXNwbGF5VmltTW9kZSlcclxuXHRcdFx0dGhpcy52aW1TdGF0dXNCYXIuc2V0VGV4dCh0aGlzLmN1cnJlbnRWaW1TdGF0dXMpO1xyXG5cdH1cclxuXHJcblx0b251bmxvYWQoKSB7XHJcblx0XHRjb25zb2xlLmxvZygndW5sb2FkaW5nIFZpbXJjIHBsdWdpbiAoYnV0IFZpbSBjb21tYW5kcyB0aGF0IHdlcmUgYWxyZWFkeSBsb2FkZWQgd2lsbCBzdGlsbCB3b3JrKScpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXRBY3RpdmVWaWV3KCk6IE1hcmtkb3duVmlldyB7XHJcblx0XHRyZXR1cm4gdGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZVZpZXdPZlR5cGUoTWFya2Rvd25WaWV3KTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0Q29kZU1pcnJvcih2aWV3OiBNYXJrZG93blZpZXcpOiBDb2RlTWlycm9yLkVkaXRvciB7XHJcblx0XHRyZXR1cm4gKHZpZXcgYXMgYW55KS5lZGl0TW9kZT8uZWRpdG9yPy5jbT8uY207XHJcblx0fVxyXG5cclxuXHRyZWFkVmltSW5pdCh2aW1Db21tYW5kczogc3RyaW5nKSB7XHJcblx0XHRsZXQgdmlldyA9IHRoaXMuZ2V0QWN0aXZlVmlldygpO1xyXG5cdFx0aWYgKHZpZXcpIHtcclxuXHRcdFx0dmFyIGNtRWRpdG9yID0gdGhpcy5nZXRDb2RlTWlycm9yKHZpZXcpO1xyXG5cdFx0XHRpZiAoY21FZGl0b3IgJiYgIXRoaXMuY29kZU1pcnJvclZpbU9iamVjdC5sb2FkZWRWaW1yYykge1xyXG5cdFx0XHRcdHRoaXMuZGVmaW5lQmFzaWNDb21tYW5kcyh0aGlzLmNvZGVNaXJyb3JWaW1PYmplY3QpO1xyXG5cdFx0XHRcdHRoaXMuZGVmaW5lU2VuZEtleXModGhpcy5jb2RlTWlycm9yVmltT2JqZWN0KTtcclxuXHRcdFx0XHR0aGlzLmRlZmluZU9iQ29tbWFuZCh0aGlzLmNvZGVNaXJyb3JWaW1PYmplY3QpO1xyXG5cdFx0XHRcdHRoaXMuZGVmaW5lU3Vycm91bmQodGhpcy5jb2RlTWlycm9yVmltT2JqZWN0KTtcclxuXHRcdFx0XHR0aGlzLmRlZmluZUpzQ29tbWFuZCh0aGlzLmNvZGVNaXJyb3JWaW1PYmplY3QpO1xyXG5cdFx0XHRcdHRoaXMuZGVmaW5lSnNGaWxlKHRoaXMuY29kZU1pcnJvclZpbU9iamVjdCk7XHJcblxyXG5cdFx0XHRcdHZpbUNvbW1hbmRzLnNwbGl0KFwiXFxuXCIpLmZvckVhY2goXHJcblx0XHRcdFx0XHRmdW5jdGlvbiAobGluZTogc3RyaW5nLCBpbmRleDogbnVtYmVyLCBhcnI6IFtzdHJpbmddKSB7XHJcblx0XHRcdFx0XHRcdGlmIChsaW5lLnRyaW0oKS5sZW5ndGggPiAwICYmIGxpbmUudHJpbSgpWzBdICE9ICdcIicpIHtcclxuXHRcdFx0XHRcdFx0XHRsZXQgc3BsaXQgPSBsaW5lLnNwbGl0KFwiIFwiKVxyXG5cdFx0XHRcdFx0XHRcdGlmIChtYXBwaW5nQ29tbWFuZHMuaW5jbHVkZXMoc3BsaXRbMF0pKSB7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBIYXZlIHRvIGRvIHRoaXMgYmVjYXVzZSBcInZpbS1jb21tYW5kLWRvbmVcIiBldmVudCBkb2Vzbid0IGFjdHVhbGx5IHdvcmsgcHJvcGVybHksIG9yIHNvbWV0aGluZy5cclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuY3VzdG9tVmltS2V5YmluZHNbc3BsaXRbMV1dID0gdHJ1ZVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR0aGlzLmNvZGVNaXJyb3JWaW1PYmplY3QuaGFuZGxlRXgoY21FZGl0b3IsIGxpbmUpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LmJpbmQodGhpcykgLy8gRmFzdGVyIHRoYW4gYW4gYXJyb3cgZnVuY3Rpb24uIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzUwMzc1NDQwL2JpbmRpbmctdnMtYXJyb3ctZnVuY3Rpb24tZm9yLXJlYWN0LW9uY2xpY2stZXZlbnRcclxuXHRcdFx0XHQpXHJcblxyXG5cdFx0XHRcdHRoaXMucHJlcGFyZUNob3JkRGlzcGxheSgpO1xyXG5cdFx0XHRcdHRoaXMucHJlcGFyZVZpbU1vZGVEaXNwbGF5KCk7XHJcblxyXG5cdFx0XHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHdlIGxvYWQgaXQganVzdCBvbmNlIHBlciBDb2RlTWlycm9yIGluc3RhbmNlLlxyXG5cdFx0XHRcdC8vIFRoaXMgaXMgc3VwcG9zZWQgdG8gd29yayBiZWNhdXNlIHRoZSBWaW0gc3RhdGUgaXMga2VwdCBhdCB0aGUga2V5bWFwIGxldmVsLCBob3BlZnVsbHlcclxuXHRcdFx0XHQvLyB0aGVyZSB3aWxsIG5vdCBiZSBidWdzIGNhdXNlZCBieSBvcGVyYXRpb25zIHRoYXQgYXJlIGtlcHQgYXQgdGhlIG9iamVjdCBsZXZlbCBpbnN0ZWFkXHJcblx0XHRcdFx0dGhpcy5jb2RlTWlycm9yVmltT2JqZWN0LmxvYWRlZFZpbXJjID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNtRWRpdG9yKSB7XHJcblx0XHRcdFx0Y21FZGl0b3Iub24oJ3ZpbS1tb2RlLWNoYW5nZScsIChtb2RlT2JqOiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdGlmIChtb2RlT2JqKVxyXG5cdFx0XHRcdFx0XHR0aGlzLmxvZ1ZpbU1vZGVDaGFuZ2UobW9kZU9iaik7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dGhpcy5kZWZpbmVGaXhlZExheW91dChjbUVkaXRvcik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGRlZmluZUJhc2ljQ29tbWFuZHModmltT2JqZWN0OiBhbnkpIHtcclxuXHRcdHZpbU9iamVjdC5kZWZpbmVPcHRpb24oJ2NsaXBib2FyZCcsICcnLCAnc3RyaW5nJywgWydjbGlwJ10sICh2YWx1ZTogc3RyaW5nLCBjbTogYW55KSA9PiB7XHJcblx0XHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHRcdGlmICh2YWx1ZS50cmltKCkgPT0gJ3VubmFtZWQnIHx8IHZhbHVlLnRyaW0oKSA9PSAndW5uYW1lZHBsdXMnKSB7XHJcblx0XHRcdFx0XHRpZiAoIXRoaXMueWFua1RvU3lzdGVtQ2xpcGJvYXJkKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMueWFua1RvU3lzdGVtQ2xpcGJvYXJkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJWaW0gaXMgbm93IHNldCB0byB5YW5rIHRvIHN5c3RlbSBjbGlwYm9hcmQuXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgY2xpcGJvYXJkIG9wdGlvbiwgc3VwcG9ydGVkIGFyZSAndW5uYW1lZCcgYW5kICd1bm5hbWVkcGx1cycgKGFuZCB0aGV5IGRvIHRoZSBzYW1lKVwiKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dmltT2JqZWN0LmRlZmluZU9wdGlvbigndGFic3RvcCcsIDQsICdudW1iZXInLCBbXSwgKHZhbHVlOiBudW1iZXIsIGNtOiBhbnkpID0+IHtcclxuXHRcdFx0aWYgKHZhbHVlICYmIGNtKSB7XHJcblx0XHRcdFx0Y20uc2V0T3B0aW9uKCd0YWJTaXplJywgdmFsdWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR2aW1PYmplY3QuZGVmaW5lRXgoJ2l1bm1hcCcsICcnLCAoY206IGFueSwgcGFyYW1zOiBhbnkpID0+IHtcclxuXHRcdFx0aWYgKHBhcmFtcy5hcmdTdHJpbmcudHJpbSgpKSB7XHJcblx0XHRcdFx0dGhpcy5jb2RlTWlycm9yVmltT2JqZWN0LnVubWFwKHBhcmFtcy5hcmdTdHJpbmcudHJpbSgpLCAnaW5zZXJ0Jyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHZpbU9iamVjdC5kZWZpbmVFeCgnbnVubWFwJywgJycsIChjbTogYW55LCBwYXJhbXM6IGFueSkgPT4ge1xyXG5cdFx0XHRpZiAocGFyYW1zLmFyZ1N0cmluZy50cmltKCkpIHtcclxuXHRcdFx0XHR0aGlzLmNvZGVNaXJyb3JWaW1PYmplY3QudW5tYXAocGFyYW1zLmFyZ1N0cmluZy50cmltKCksICdub3JtYWwnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dmltT2JqZWN0LmRlZmluZUV4KCd2dW5tYXAnLCAnJywgKGNtOiBhbnksIHBhcmFtczogYW55KSA9PiB7XHJcblx0XHRcdGlmIChwYXJhbXMuYXJnU3RyaW5nLnRyaW0oKSkge1xyXG5cdFx0XHRcdHRoaXMuY29kZU1pcnJvclZpbU9iamVjdC51bm1hcChwYXJhbXMuYXJnU3RyaW5nLnRyaW0oKSwgJ3Zpc3VhbCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR2aW1PYmplY3QuZGVmaW5lRXgoJ25vcmVtYXAnLCAnJywgKGNtOiBhbnksIHBhcmFtczogYW55KSA9PiB7XHJcblx0XHRcdGlmICghcGFyYW1zPy5hcmdzPy5sZW5ndGgpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbWFwcGluZzogbm9yZW1hcCcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAocGFyYW1zLmFyZ1N0cmluZy50cmltKCkpIHtcclxuXHRcdFx0XHR0aGlzLmNvZGVNaXJyb3JWaW1PYmplY3Qubm9yZW1hcC5hcHBseSh0aGlzLmNvZGVNaXJyb3JWaW1PYmplY3QsIHBhcmFtcy5hcmdzKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgdGhlIHVzZXIgdG8gcmVnaXN0ZXIgYW4gRXggY29tbWFuZFxyXG5cdFx0dmltT2JqZWN0LmRlZmluZUV4KCdleG1hcCcsICcnLCAoY206IGFueSwgcGFyYW1zOiBhbnkpID0+IHtcclxuXHRcdFx0aWYgKHBhcmFtcz8uYXJncz8ubGVuZ3RoICYmIHBhcmFtcy5hcmdzLmxlbmd0aCA8IDIpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYGV4bWFwIHJlcXVpcmVzIGF0IGxlYXN0IDIgcGFyYW1ldGVyczogW25hbWVdIFthY3Rpb25zLi4uXWApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGxldCBjb21tYW5kTmFtZSA9IHBhcmFtcy5hcmdzWzBdO1xyXG5cdFx0XHRwYXJhbXMuYXJncy5zaGlmdCgpO1xyXG5cdFx0XHRsZXQgY29tbWFuZENvbnRlbnQgPSBwYXJhbXMuYXJncy5qb2luKCcgJyk7XHJcblx0XHRcdC8vIFRoZSBjb250ZW50IG9mIHRoZSB1c2VyJ3MgRXggY29tbWFuZCBpcyBqdXN0IHRoZSByZW1haW5pbmcgcGFyYW1ldGVycyBvZiB0aGUgZXhtYXAgY29tbWFuZFxyXG5cdFx0XHR0aGlzLmNvZGVNaXJyb3JWaW1PYmplY3QuZGVmaW5lRXgoY29tbWFuZE5hbWUsICcnLCAoY206IGFueSwgcGFyYW1zOiBhbnkpID0+IHtcclxuXHRcdFx0XHR0aGlzLmNvZGVNaXJyb3JWaW1PYmplY3QuaGFuZGxlRXgoY20sIGNvbW1hbmRDb250ZW50KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGRlZmluZVNlbmRLZXlzKHZpbU9iamVjdDogYW55KSB7XHJcblx0XHR2aW1PYmplY3QuZGVmaW5lRXgoJ3NlbmRrZXlzJywgJycsIGFzeW5jIChjbTogYW55LCBwYXJhbXM6IGFueSkgPT4ge1xyXG5cdFx0XHRpZiAoIXBhcmFtcz8uYXJncz8ubGVuZ3RoKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2cocGFyYW1zKTtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFRoZSBzZW5ka2V5cyBjb21tYW5kIHJlcXVpcmVzIGEgbGlzdCBvZiBrZXlzLCBlLmcuIHNlbmRLZXlzIEN0cmwrcCBhIGIgRW50ZXJgKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IGFsbEdvb2QgPSB0cnVlO1xyXG5cdFx0XHRsZXQgZXZlbnRzOiBLZXlib2FyZEV2ZW50W10gPSBbXTtcclxuXHRcdFx0Zm9yIChjb25zdCBrZXkgb2YgcGFyYW1zLmFyZ3MpIHtcclxuXHRcdFx0XHRpZiAoa2V5LnN0YXJ0c1dpdGgoJ3dhaXQnKSkge1xyXG5cdFx0XHRcdFx0Y29uc3QgZGVsYXkgPSBrZXkuc2xpY2UoNCk7XHJcblx0XHRcdFx0XHRhd2FpdCBzbGVlcChkZWxheSAqIDEwMDApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdGxldCBrZXlFdmVudDogS2V5Ym9hcmRFdmVudCA9IG51bGw7XHJcblx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRrZXlFdmVudCA9IG5ldyBLZXlib2FyZEV2ZW50KCdrZXlkb3duJywga2V5RnJvbUFjY2VsZXJhdG9yLnRvS2V5RXZlbnQoa2V5KSk7XHJcblx0XHRcdFx0XHRcdGV2ZW50cy5wdXNoKGtleUV2ZW50KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRcdGFsbEdvb2QgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBLZXkgJyR7a2V5fScgY291bGRuJ3QgYmUgcmVhZCBhcyBhbiBFbGVjdHJvbiBBY2NlbGVyYXRvcmApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKGFsbEdvb2QpIHtcclxuXHRcdFx0XHRcdFx0Zm9yIChrZXlFdmVudCBvZiBldmVudHMpXHJcblx0XHRcdFx0XHRcdFx0d2luZG93LnBvc3RNZXNzYWdlKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoa2V5RXZlbnQpKSwgJyonKTtcclxuXHRcdFx0XHRcdFx0Ly8gdmlldy5jb250YWluZXJFbC5kaXNwYXRjaEV2ZW50KGtleUV2ZW50KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZGVmaW5lT2JDb21tYW5kKHZpbU9iamVjdDogYW55KSB7XHJcblx0XHR2aW1PYmplY3QuZGVmaW5lRXgoJ29iY29tbWFuZCcsICcnLCBhc3luYyAoY206IGFueSwgcGFyYW1zOiBhbnkpID0+IHtcclxuXHRcdFx0Y29uc3QgYXZhaWxhYmxlQ29tbWFuZHMgPSAodGhpcy5hcHAgYXMgYW55KS5jb21tYW5kcy5jb21tYW5kcztcclxuXHRcdFx0aWYgKCFwYXJhbXM/LmFyZ3M/Lmxlbmd0aCB8fCBwYXJhbXMuYXJncy5sZW5ndGggIT0gMSkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGBBdmFpbGFibGUgY29tbWFuZHM6ICR7T2JqZWN0LmtleXMoYXZhaWxhYmxlQ29tbWFuZHMpLmpvaW4oJ1xcbicpfWApXHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBvYmNvbW1hbmQgcmVxdWlyZXMgZXhhY3RseSAxIHBhcmFtZXRlcmApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGxldCB2aWV3ID0gdGhpcy5nZXRBY3RpdmVWaWV3KCk7XHJcblx0XHRcdGxldCBlZGl0b3IgPSB2aWV3LmVkaXRvcjtcclxuXHRcdFx0Y29uc3QgY29tbWFuZCA9IHBhcmFtcy5hcmdzWzBdO1xyXG5cdFx0XHRpZiAoY29tbWFuZCBpbiBhdmFpbGFibGVDb21tYW5kcykge1xyXG5cdFx0XHRcdGxldCBjYWxsYmFjayA9IGF2YWlsYWJsZUNvbW1hbmRzW2NvbW1hbmRdLmNhbGxiYWNrO1xyXG5cdFx0XHRcdGxldCBjaGVja0NhbGxiYWNrID0gYXZhaWxhYmxlQ29tbWFuZHNbY29tbWFuZF0uY2hlY2tDYWxsYmFjaztcclxuXHRcdFx0XHRsZXQgZWRpdG9yQ2FsbGJhY2sgPSBhdmFpbGFibGVDb21tYW5kc1tjb21tYW5kXS5lZGl0b3JDYWxsYmFjaztcclxuXHRcdFx0XHRsZXQgZWRpdG9yQ2hlY2tDYWxsYmFjayA9IGF2YWlsYWJsZUNvbW1hbmRzW2NvbW1hbmRdLmVkaXRvckNoZWNrQ2FsbGJhY2s7XHJcblx0XHRcdFx0aWYgKGVkaXRvckNoZWNrQ2FsbGJhY2spXHJcblx0XHRcdFx0XHRlZGl0b3JDaGVja0NhbGxiYWNrKGZhbHNlLCBlZGl0b3IsIHZpZXcpO1xyXG5cdFx0XHRcdGVsc2UgaWYgKGVkaXRvckNhbGxiYWNrKVxyXG5cdFx0XHRcdFx0ZWRpdG9yQ2FsbGJhY2soZWRpdG9yLCB2aWV3KTtcclxuXHRcdFx0XHRlbHNlIGlmIChjaGVja0NhbGxiYWNrKVxyXG5cdFx0XHRcdFx0Y2hlY2tDYWxsYmFjayhmYWxzZSk7XHJcblx0XHRcdFx0ZWxzZSBpZiAoY2FsbGJhY2spXHJcblx0XHRcdFx0XHRjYWxsYmFjaygpO1xyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihgQ29tbWFuZCAke2NvbW1hbmR9IGRvZXNuJ3QgaGF2ZSBhbiBPYnNpZGlhbiBjYWxsYmFja2ApO1xyXG5cdFx0XHR9IGVsc2VcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYENvbW1hbmQgJHtjb21tYW5kfSB3YXMgbm90IGZvdW5kLCB0cnkgJ29iY29tbWFuZCcgd2l0aCBubyBwYXJhbXMgdG8gc2VlIGluIHRoZSBkZXZlbG9wZXIgY29uc29sZSB3aGF0J3MgYXZhaWxhYmxlYCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGRlZmluZVN1cnJvdW5kKHZpbU9iamVjdDogYW55KSB7XHJcblx0XHQvLyBGdW5jdGlvbiB0byBzdXJyb3VuZCBzZWxlY3RlZCB0ZXh0IG9yIGhpZ2hsaWdodGVkIHdvcmQuXHJcblx0XHR2YXIgc3Vycm91bmRGdW5jID0gKHBhcmFtczogc3RyaW5nW10pID0+IHtcclxuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXMuZ2V0QWN0aXZlVmlldygpLmVkaXRvcjtcclxuXHRcdFx0aWYgKCFwYXJhbXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwic3Vycm91bmQgcmVxdWlyZXMgZXhhY3RseSAyIHBhcmFtZXRlcnM6IHByZWZpeCBhbmQgcG9zdGZpeCB0ZXh0LlwiKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRsZXQgbmV3QXJncyA9IHBhcmFtcy5qb2luKFwiIFwiKS5tYXRjaCgvKFxcXFwufFteXFxzXFxcXFxcXFxdKykrL2cpO1xyXG5cdFx0XHRpZiAobmV3QXJncy5sZW5ndGggIT0gMikge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInN1cnJvdW5kIHJlcXVpcmVzIGV4YWN0bHkgMiBwYXJhbWV0ZXJzOiBwcmVmaXggYW5kIHBvc3RmaXggdGV4dC5cIik7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdGxldCBiZWdpbm5pbmcgPSBuZXdBcmdzWzBdLnJlcGxhY2UoXCJcXFxcXFxcXFwiLCBcIlxcXFxcIikucmVwbGFjZShcIlxcXFwgXCIsIFwiIFwiKTsgLy8gR2V0IHRoZSBiZWdpbm5pbmcgc3Vycm91bmQgdGV4dFxyXG5cdFx0XHRsZXQgZW5kaW5nID0gbmV3QXJnc1sxXS5yZXBsYWNlKFwiXFxcXFxcXFxcIiwgXCJcXFxcXCIpLnJlcGxhY2UoXCJcXFxcIFwiLCBcIiBcIik7IC8vIEdldCB0aGUgZW5kaW5nIHN1cnJvdW5kIHRleHRcclxuXHJcblx0XHRcdGxldCBjdXJyZW50U2VsZWN0aW9ucyA9IHRoaXMuY3VycmVudFNlbGVjdGlvbjtcclxuXHRcdFx0dmFyIGNob3NlblNlbGVjdGlvbiA9IGN1cnJlbnRTZWxlY3Rpb25zICYmIGN1cnJlbnRTZWxlY3Rpb25zLmxlbmd0aCA+IDAgPyBjdXJyZW50U2VsZWN0aW9uc1swXSA6IG51bGw7XHJcblx0XHRcdGlmICh0aGlzLmN1cnJlbnRTZWxlY3Rpb24gJiYgY3VycmVudFNlbGVjdGlvbnM/Lmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIldBUk5JTkc6IE11bHRpcGxlIHNlbGVjdGlvbnMgaW4gc3Vycm91bmQuIEF0dGVtcHQgdG8gc2VsZWN0IG1hdGNoaW5nIGN1cnNvci4gKG9ic2lkaWFuLXZpbXJjLXN1cHBvcnQpXCIpXHJcblx0XHRcdFx0Y29uc3QgY3Vyc29yUG9zID0gZWRpdG9yLmdldEN1cnNvcigpO1xyXG5cdFx0XHRcdGZvciAoY29uc3Qgc2VsZWN0aW9uIG9mIGN1cnJlbnRTZWxlY3Rpb25zKSB7XHJcblx0XHRcdFx0XHRpZiAoc2VsZWN0aW9uLmhlYWQubGluZSA9PSBjdXJzb3JQb3MubGluZSAmJiBzZWxlY3Rpb24uaGVhZC5jaCA9PSBjdXJzb3JQb3MuY2gpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJSRVNPTFZFRDogU2VsZWN0aW9uIG1hdGNoaW5nIGN1cnNvciBmb3VuZC4gKG9ic2lkaWFuLXZpbXJjLXN1cHBvcnQpXCIpXHJcblx0XHRcdFx0XHRcdGNob3NlblNlbGVjdGlvbiA9IHNlbGVjdGlvbjtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChKU09OLnN0cmluZ2lmeShjaG9zZW5TZWxlY3Rpb24uYW5jaG9yKSA9PT0gSlNPTi5zdHJpbmdpZnkoY2hvc2VuU2VsZWN0aW9uLmhlYWQpKSB7XHJcblx0XHRcdFx0Ly8gTm8gcmFuZ2Ugb2Ygc2VsZWN0ZWQgdGV4dCwgc28gc2VsZWN0IHdvcmQuXHJcblx0XHRcdFx0dmFyIGxpbmUgPSBlZGl0b3IuZ2V0TGluZShjaG9zZW5TZWxlY3Rpb24uYW5jaG9yLmxpbmUpO1xyXG5cdFx0XHRcdGlmIChsaW5lLmxlbmd0aCA9PT0gMClcclxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNhbid0IHN1cnJvdW5kIG9uIGFuIGVtcHR5IGxpbmVcIik7XHJcblx0XHRcdFx0Ly8gR28gdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgd29yZFxyXG5cdFx0XHRcdGxldCB3b3JkU3RhcnQgPSBjaG9zZW5TZWxlY3Rpb24uYW5jaG9yLmNoO1xyXG5cdFx0XHRcdGZvciAoIDsgd29yZFN0YXJ0ID49IDAgOyB3b3JkU3RhcnQtLSlcclxuXHRcdFx0XHRcdGlmIChsaW5lW3dvcmRTdGFydF0ubWF0Y2goL1xccy8pKVxyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR3b3JkU3RhcnQrKztcclxuXHRcdFx0XHRsZXQgd29yZEVuZCA9IGNob3NlblNlbGVjdGlvbi5hbmNob3IuY2g7XHJcblx0XHRcdFx0Zm9yICggOyB3b3JkRW5kIDwgbGluZS5sZW5ndGggOyB3b3JkRW5kKyspXHJcblx0XHRcdFx0XHRpZiAobGluZVt3b3JkRW5kXS5tYXRjaCgvXFxzLykpXHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdHZhciB3b3JkID0gbGluZS5zdWJzdHJpbmcod29yZFN0YXJ0LCB3b3JkRW5kKTtcclxuXHRcdFx0XHRjaG9zZW5TZWxlY3Rpb24uYW5jaG9yLmNoID0gd29yZFN0YXJ0O1xyXG5cdFx0XHRcdGNob3NlblNlbGVjdGlvbi5oZWFkLmNoID0gd29yZEVuZDtcclxuXHRcdFx0XHRjaG9zZW5TZWxlY3Rpb24gPSB7XHJcblx0XHRcdFx0XHRhbmNob3I6IHtsaW5lOiBjaG9zZW5TZWxlY3Rpb24uYW5jaG9yLmxpbmUsIGNoOiB3b3JkU3RhcnR9LFxyXG5cdFx0XHRcdFx0aGVhZDoge2xpbmU6IGNob3NlblNlbGVjdGlvbi5oZWFkLmxpbmUsIGNoOiB3b3JkRW5kfVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gSWYgdGhlIHNlbGVjdGlvbiBpcyByZXZlcnNlLCBzd2l0Y2ggdGhlIHZhcmlhYmxlc1xyXG5cdFx0XHRpZiAoY2hvc2VuU2VsZWN0aW9uLmFuY2hvci5saW5lID4gY2hvc2VuU2VsZWN0aW9uLmhlYWQubGluZSB8fFxyXG5cdFx0XHRcdFx0KGNob3NlblNlbGVjdGlvbi5hbmNob3IubGluZSA9PSBjaG9zZW5TZWxlY3Rpb24uaGVhZC5saW5lICYmIGNob3NlblNlbGVjdGlvbi5hbmNob3IuY2ggPiBjaG9zZW5TZWxlY3Rpb24uaGVhZC5jaCkpXHJcblx0XHRcdFx0W2Nob3NlblNlbGVjdGlvbi5hbmNob3IsIGNob3NlblNlbGVjdGlvbi5oZWFkXSA9IFtjaG9zZW5TZWxlY3Rpb24uaGVhZCwgY2hvc2VuU2VsZWN0aW9uLmFuY2hvcl07XHJcblx0XHRcdGxldCBjdXJyVGV4dCA9IGVkaXRvci5nZXRSYW5nZShjaG9zZW5TZWxlY3Rpb24uYW5jaG9yLCBjaG9zZW5TZWxlY3Rpb24uaGVhZCk7XHJcblx0XHRcdGVkaXRvci5yZXBsYWNlUmFuZ2UoYmVnaW5uaW5nICsgY3VyclRleHQgKyBlbmRpbmcsIGNob3NlblNlbGVjdGlvbi5hbmNob3IsIGNob3NlblNlbGVjdGlvbi5oZWFkKTtcclxuXHRcdH1cclxuXHJcblx0XHR2aW1PYmplY3QuZGVmaW5lRXgoXCJzdXJyb3VuZFwiLCBcIlwiLCAoY206IGFueSwgcGFyYW1zOiBhbnkpID0+IHsgc3Vycm91bmRGdW5jKHBhcmFtcy5hcmdzKTsgfSk7XHJcblxyXG5cdFx0dmltT2JqZWN0LmRlZmluZUV4KFwicGFzdGVpbnRvXCIsIFwiXCIsIChjbTogYW55LCBwYXJhbXM6IGFueSkgPT4ge1xyXG5cdFx0XHQvLyBVc2luZyB0aGUgcmVnaXN0ZXIgZm9yIHdoZW4gdGhpcy55YW5rVG9TeXN0ZW1DbGlwYm9hcmQgPT0gZmFsc2VcclxuXHRcdFx0c3Vycm91bmRGdW5jKFxyXG5cdFx0XHRcdFsnWycsXHJcblx0XHRcdFx0ICddKCcgKyB2aW1PYmplY3QuZ2V0UmVnaXN0ZXJDb250cm9sbGVyKCkuZ2V0UmVnaXN0ZXIoJ3lhbmsnKS5rZXlCdWZmZXIgKyBcIilcIl0pO1xyXG5cdFx0fSlcclxuXHJcblx0XHR2YXIgZWRpdG9yID0gdGhpcy5nZXRBY3RpdmVWaWV3KCkuZWRpdG9yO1xyXG5cdFx0Ly8gSGFuZGxlIHRoZSBzdXJyb3VuZCBkaWFsb2cgaW5wdXRcclxuXHRcdHZhciBzdXJyb3VuZERpYWxvZ0NhbGxiYWNrID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0aWYgKCgvXlxcWyskLykudGVzdCh2YWx1ZSkpIHsgLy8gY2hlY2sgZm9yIDEtaW5mIFsgYW5kIG1hdGNoIHRoZW0gd2l0aCBdXHJcblx0XHRcdFx0c3Vycm91bmRGdW5jKFt2YWx1ZSwgXCJdXCIucmVwZWF0KHZhbHVlLmxlbmd0aCldKVxyXG5cdFx0XHR9IGVsc2UgaWYgKCgvXlxcKCskLykudGVzdCh2YWx1ZSkpIHsgLy8gY2hlY2sgZm9yIDEtaW5mICggYW5kIG1hdGNoIHRoZW0gd2l0aCApXHJcblx0XHRcdFx0c3Vycm91bmRGdW5jKFt2YWx1ZSwgXCIpXCIucmVwZWF0KHZhbHVlLmxlbmd0aCldKVxyXG5cdFx0XHR9IGVsc2UgaWYgKCgvXlxceyskLykudGVzdCh2YWx1ZSkpIHsgLy8gY2hlY2sgZm9yIDEtaW5mIHsgYW5kIG1hdGNoIHRoZW0gd2l0aCB9XHJcblx0XHRcdFx0c3Vycm91bmRGdW5jKFt2YWx1ZSwgXCJ9XCIucmVwZWF0KHZhbHVlLmxlbmd0aCldKVxyXG5cdFx0XHR9IGVsc2UgeyAvLyBFbHNlLCBqdXN0IHB1dCBpdCBiZWZvcmUgYW5kIGFmdGVyLlxyXG5cdFx0XHRcdHN1cnJvdW5kRnVuYyhbdmFsdWUsIHZhbHVlXSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHZpbU9iamVjdC5kZWZpbmVPcGVyYXRvcihcInN1cnJvdW5kT3BlcmF0b3JcIiwgKCkgPT4ge1xyXG5cdFx0XHRsZXQgcCA9IFwiPHNwYW4+U3Vycm91bmQgd2l0aDogPGlucHV0IHR5cGU9J3RleHQnPjwvc3Bhbj5cIlxyXG5cdFx0XHRDb2RlTWlycm9yLm9wZW5EaWFsb2cocCwgc3Vycm91bmREaWFsb2dDYWxsYmFjaywgeyBib3R0b206IHRydWUsIHNlbGVjdFZhbHVlT25PcGVuOiBmYWxzZSB9KVxyXG5cdFx0fSlcclxuXHJcblxyXG5cdFx0dmltT2JqZWN0Lm1hcENvbW1hbmQoXCI8QS15PnNcIiwgXCJvcGVyYXRvclwiLCBcInN1cnJvdW5kT3BlcmF0b3JcIilcclxuXHJcblx0fVxyXG5cclxuXHRhc3luYyBjYXB0dXJlWWFua0J1ZmZlcih3aW46IFdpbmRvdykge1xyXG5cdFx0aWYgKCF0aGlzLnlhbmtUb1N5c3RlbUNsaXBib2FyZCkge1xyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCB5YW5rUmVnaXN0ZXIgPSB0aGlzLmNvZGVNaXJyb3JWaW1PYmplY3QuZ2V0UmVnaXN0ZXJDb250cm9sbGVyKCkuZ2V0UmVnaXN0ZXIoJ3lhbmsnKTtcclxuXHRcdGNvbnN0IGN1cnJlbnRZYW5rQnVmZmVyID0geWFua1JlZ2lzdGVyLmtleUJ1ZmZlcjtcclxuXHJcblx0XHQvLyB5YW5rIC0+IGNsaXBib2FyZFxyXG5cdFx0Y29uc3QgYnVmID0gY3VycmVudFlhbmtCdWZmZXJbMF1cclxuXHRcdGlmIChidWYgIT09IHRoaXMubGFzdFlhbmtCdWZmZXJbMF0pIHtcclxuXHRcdFx0YXdhaXQgd2luLm5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGJ1Zik7XHJcblx0XHRcdHRoaXMubGFzdFlhbmtCdWZmZXIgPSBjdXJyZW50WWFua0J1ZmZlcjtcclxuXHRcdFx0dGhpcy5sYXN0U3lzdGVtQ2xpcGJvYXJkID0gYXdhaXQgd2luLm5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQoKTtcclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gY2xpcGJvYXJkIC0+IHlhbmtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IGN1cnJlbnRDbGlwYm9hcmRUZXh0ID0gYXdhaXQgd2luLm5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQoKTtcclxuXHRcdFx0aWYgKGN1cnJlbnRDbGlwYm9hcmRUZXh0ICE9PSB0aGlzLmxhc3RTeXN0ZW1DbGlwYm9hcmQpIHtcclxuXHRcdFx0XHR5YW5rUmVnaXN0ZXIuc2V0VGV4dChjdXJyZW50Q2xpcGJvYXJkVGV4dCk7XHJcblx0XHRcdFx0dGhpcy5sYXN0WWFua0J1ZmZlciA9IHlhbmtSZWdpc3Rlci5rZXlCdWZmZXI7XHJcblx0XHRcdFx0dGhpcy5sYXN0U3lzdGVtQ2xpcGJvYXJkID0gY3VycmVudENsaXBib2FyZFRleHQ7XHJcblx0XHRcdH1cclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Ly8gWFhYOiBBdm9pZCBcIlVuY2F1Z2h0IChpbiBwcm9taXNlKSBET01FeGNlcHRpb246IERvY3VtZW50IGlzIG5vdCBmb2N1c2VkLlwiXHJcblx0XHRcdC8vIFhYWDogSXQgaXMgbm90IGdvb2QgYnV0IGVhc3kgd29ya2Fyb3VuZFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJlcGFyZUNob3JkRGlzcGxheSgpIHtcclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmRpc3BsYXlDaG9yZCkge1xyXG5cdFx0XHQvLyBBZGQgc3RhdHVzIGJhciBpdGVtXHJcblx0XHRcdHRoaXMudmltQ2hvcmRTdGF0dXNCYXIgPSB0aGlzLmFkZFN0YXR1c0Jhckl0ZW0oKTtcclxuXHJcblx0XHRcdC8vIE1vdmUgdmltQ2hvcmRTdGF0dXNCYXIgdG8gdGhlIGxlZnRtb3N0IHBvc2l0aW9uIGFuZCBjZW50ZXIgaXQuXHJcblx0XHRcdGxldCBwYXJlbnQgPSB0aGlzLnZpbUNob3JkU3RhdHVzQmFyLnBhcmVudEVsZW1lbnQ7XHJcblx0XHRcdHRoaXMudmltQ2hvcmRTdGF0dXNCYXIucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUodGhpcy52aW1DaG9yZFN0YXR1c0JhciwgcGFyZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0XHR0aGlzLnZpbUNob3JkU3RhdHVzQmFyLnN0eWxlLm1hcmdpblJpZ2h0ID0gXCJhdXRvXCI7XHJcblxyXG5cdFx0XHRsZXQgY21FZGl0b3IgPSB0aGlzLmdldENvZGVNaXJyb3IodGhpcy5nZXRBY3RpdmVWaWV3KCkpO1xyXG5cdFx0XHQvLyBTZWUgaHR0cHM6Ly9jb2RlbWlycm9yLm5ldC9kb2MvbWFudWFsLmh0bWwjdmltYXBpX2V2ZW50cyBmb3IgZXZlbnRzLlxyXG5cdFx0XHRDb2RlTWlycm9yLm9uKGNtRWRpdG9yLCBcInZpbS1rZXlwcmVzc1wiLCBhc3luYyAodmltS2V5OiBhbnkpID0+IHtcclxuXHRcdFx0XHRpZiAodmltS2V5ICE9IFwiPEVzYz5cIikgeyAvLyBUT0RPIGZpZ3VyZSBvdXQgd2hhdCB0byBhY3R1YWxseSBsb29rIGZvciB0byBleGl0IGNvbW1hbmRzLlxyXG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50S2V5Q2hvcmQucHVzaCh2aW1LZXkpO1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuY3VzdG9tVmltS2V5YmluZHNbdGhpcy5jdXJyZW50S2V5Q2hvcmQuam9pbihcIlwiKV0gIT0gdW5kZWZpbmVkKSB7IC8vIEN1c3RvbSBrZXkgY2hvcmQgZXhpc3RzLlxyXG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRLZXlDaG9yZCA9IFtdO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmN1cnJlbnRLZXlDaG9yZCA9IFtdO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gQnVpbGQga2V5Y2hvcmQgdGV4dFxyXG5cdFx0XHRcdGxldCB0ZW1wUyA9IFwiXCI7XHJcblx0XHRcdFx0Zm9yIChjb25zdCBzIG9mIHRoaXMuY3VycmVudEtleUNob3JkKSB7XHJcblx0XHRcdFx0XHR0ZW1wUyArPSBcIiBcIiArIHM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICh0ZW1wUyAhPSBcIlwiKSB7XHJcblx0XHRcdFx0XHR0ZW1wUyArPSBcIi1cIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy52aW1DaG9yZFN0YXR1c0Jhci5zZXRUZXh0KHRlbXBTKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdENvZGVNaXJyb3Iub24oY21FZGl0b3IsIFwidmltLWNvbW1hbmQtZG9uZVwiLCBhc3luYyAocmVhc29uOiBhbnkpID0+IHsgLy8gUmVzZXQgZGlzcGxheVxyXG5cdFx0XHRcdHRoaXMudmltQ2hvcmRTdGF0dXNCYXIuc2V0VGV4dChcIlwiKTtcclxuXHRcdFx0XHR0aGlzLmN1cnJlbnRLZXlDaG9yZCA9IFtdO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByZXBhcmVWaW1Nb2RlRGlzcGxheSgpIHtcclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmRpc3BsYXlWaW1Nb2RlKSB7XHJcblx0XHRcdHRoaXMudmltU3RhdHVzQmFyID0gdGhpcy5hZGRTdGF0dXNCYXJJdGVtKCkgLy8gQWRkIHN0YXR1cyBiYXIgaXRlbVxyXG5cdFx0XHR0aGlzLnZpbVN0YXR1c0Jhci5zZXRUZXh0KHZpbVN0YXR1cy5ub3JtYWwpIC8vIEluaXQgdGhlIHZpbVN0YXR1c0JhciB3aXRoIG5vcm1hbCBtb2RlXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRkZWZpbmVGaXhlZExheW91dChjbTogQ29kZU1pcnJvci5FZGl0b3IpIHtcclxuXHRcdGNtLm9uKCdrZXlkb3duJywgKGluc3RhbmNlOiBDb2RlTWlycm9yLkVkaXRvciwgZXY6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MuZml4ZWROb3JtYWxNb2RlTGF5b3V0KSB7XHJcblx0XHRcdFx0Y29uc3Qga2V5TWFwID0gdGhpcy5zZXR0aW5ncy5jYXB0dXJlZEtleWJvYXJkTWFwO1xyXG5cdFx0XHRcdGlmICghdGhpcy5pc0luc2VydE1vZGUgJiYgIWV2LnNoaWZ0S2V5ICYmXHJcblx0XHRcdFx0XHRldi5jb2RlIGluIGtleU1hcCAmJiBldi5rZXkgIT0ga2V5TWFwW2V2LmNvZGVdKSB7XHJcblx0XHRcdFx0XHR0aGlzLmNvZGVNaXJyb3JWaW1PYmplY3QuaGFuZGxlS2V5KGluc3RhbmNlLCBrZXlNYXBbZXYuY29kZV0sICdtYXBwaW5nJyk7XHJcblx0XHRcdFx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRkZWZpbmVKc0NvbW1hbmQodmltT2JqZWN0OiBhbnkpIHtcclxuXHRcdHZpbU9iamVjdC5kZWZpbmVFeCgnanNjb21tYW5kJywgJycsIChjbTogYW55LCBwYXJhbXM6IGFueSkgPT4ge1xyXG5cdFx0XHRpZiAoIXRoaXMuc2V0dGluZ3Muc3VwcG9ydEpzQ29tbWFuZHMpXHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSlMgY29tbWFuZHMgYXJlIHR1cm5lZCBvZmY7IGVuYWJsZSB0aGVtIHZpYSB0aGUgVmltcmMgcGx1Z2luIGNvbmZpZ3VyYXRpb24gaWYgeW91J3JlIHN1cmUgeW91IGtub3cgd2hhdCB5b3UncmUgZG9pbmdcIik7XHJcblx0XHRcdGNvbnN0IGpzQ29kZSA9IHBhcmFtcy5hcmdTdHJpbmcudHJpbSgpIGFzIHN0cmluZztcclxuXHRcdFx0aWYgKGpzQ29kZVswXSAhPSAneycgfHwganNDb2RlW2pzQ29kZS5sZW5ndGggLSAxXSAhPSAnfScpXHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgYW4gYXJndW1lbnQgd2hpY2ggaXMgSlMgY29kZSBzdXJyb3VuZGVkIGJ5IGN1cmx5IGJyYWNrZXRzOiB7Li4ufVwiKTtcclxuXHRcdFx0bGV0IGN1cnJlbnRTZWxlY3Rpb25zID0gdGhpcy5jdXJyZW50U2VsZWN0aW9uO1xyXG5cdFx0XHR2YXIgY2hvc2VuU2VsZWN0aW9uID0gY3VycmVudFNlbGVjdGlvbnMgJiYgY3VycmVudFNlbGVjdGlvbnMubGVuZ3RoID4gMCA/IGN1cnJlbnRTZWxlY3Rpb25zWzBdIDogbnVsbDtcclxuXHRcdFx0Y29uc3QgY29tbWFuZCA9IEZ1bmN0aW9uKCdlZGl0b3InLCAndmlldycsICdzZWxlY3Rpb24nLCBqc0NvZGUpO1xyXG5cdFx0XHRjb25zdCB2aWV3ID0gdGhpcy5nZXRBY3RpdmVWaWV3KCk7XHJcblx0XHRcdGNvbW1hbmQodmlldy5lZGl0b3IsIHZpZXcsIGNob3NlblNlbGVjdGlvbik7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGRlZmluZUpzRmlsZSh2aW1PYmplY3Q6IGFueSkge1xyXG5cdFx0dmltT2JqZWN0LmRlZmluZUV4KCdqc2ZpbGUnLCAnJywgYXN5bmMgKGNtOiBhbnksIHBhcmFtczogYW55KSA9PiB7XHJcblx0XHRcdGlmICghdGhpcy5zZXR0aW5ncy5zdXBwb3J0SnNDb21tYW5kcylcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJKUyBjb21tYW5kcyBhcmUgdHVybmVkIG9mZjsgZW5hYmxlIHRoZW0gdmlhIHRoZSBWaW1yYyBwbHVnaW4gY29uZmlndXJhdGlvbiBpZiB5b3UncmUgc3VyZSB5b3Uga25vdyB3aGF0IHlvdSdyZSBkb2luZ1wiKTtcclxuXHRcdFx0aWYgKHBhcmFtcz8uYXJncz8ubGVuZ3RoIDwgMSlcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RlZCBmb3JtYXQ6IGZpbGVOYW1lIHtleHRyYUNvZGV9XCIpO1xyXG5cdFx0XHRsZXQgZXh0cmFDb2RlID0gJyc7XHJcblx0XHRcdGNvbnN0IGZpbGVOYW1lID0gcGFyYW1zLmFyZ3NbMF07XHJcblx0XHRcdGlmIChwYXJhbXMuYXJncy5sZW5ndGggPiAxKSB7XHJcblx0XHRcdFx0cGFyYW1zLmFyZ3Muc2hpZnQoKTtcclxuXHRcdFx0XHRleHRyYUNvZGUgPSBwYXJhbXMuYXJncy5qb2luKCcgJykudHJpbSgpIGFzIHN0cmluZztcclxuXHRcdFx0XHRpZiAoZXh0cmFDb2RlWzBdICE9ICd7JyB8fCBleHRyYUNvZGVbZXh0cmFDb2RlLmxlbmd0aCAtIDFdICE9ICd9JylcclxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkV4cGVjdGVkIGFuIGV4dHJhIGNvZGUgYXJndW1lbnQgd2hpY2ggaXMgSlMgY29kZSBzdXJyb3VuZGVkIGJ5IGN1cmx5IGJyYWNrZXRzOiB7Li4ufVwiKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRsZXQgY3VycmVudFNlbGVjdGlvbnMgPSB0aGlzLmN1cnJlbnRTZWxlY3Rpb247XHJcblx0XHRcdHZhciBjaG9zZW5TZWxlY3Rpb24gPSBjdXJyZW50U2VsZWN0aW9ucyAmJiBjdXJyZW50U2VsZWN0aW9ucy5sZW5ndGggPiAwID8gY3VycmVudFNlbGVjdGlvbnNbMF0gOiBudWxsO1xyXG5cdFx0XHRsZXQgY29udGVudCA9ICcnO1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGNvbnRlbnQgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5hZGFwdGVyLnJlYWQoZmlsZU5hbWUpO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgcmVhZCBmaWxlICR7cGFyYW1zLmFyZ3NbMF19IGZyb20gdmF1bHQgcm9vdDogJHtlLm1lc3NhZ2V9YCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3QgY29tbWFuZCA9IEZ1bmN0aW9uKCdlZGl0b3InLCAndmlldycsICdzZWxlY3Rpb24nLCBjb250ZW50ICsgZXh0cmFDb2RlKTtcclxuXHRcdFx0Y29uc3QgdmlldyA9IHRoaXMuZ2V0QWN0aXZlVmlldygpO1xyXG5cdFx0XHRjb21tYW5kKHZpZXcuZWRpdG9yLCB2aWV3LCBjaG9zZW5TZWxlY3Rpb24pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxufVxyXG5cclxuY2xhc3MgU2V0dGluZ3NUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcclxuXHRwbHVnaW46IFZpbXJjUGx1Z2luO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBWaW1yY1BsdWdpbikge1xyXG5cdFx0c3VwZXIoYXBwLCBwbHVnaW4pO1xyXG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XHJcblx0fVxyXG5cclxuXHRkaXNwbGF5KCk6IHZvaWQge1xyXG5cdFx0bGV0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XHJcblxyXG5cdFx0Y29udGFpbmVyRWwuZW1wdHkoKTtcclxuXHJcblx0XHRjb250YWluZXJFbC5jcmVhdGVFbCgnaDInLCB7IHRleHQ6ICdWaW1yYyBTZXR0aW5ncycgfSk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdWaW1yYyBmaWxlIG5hbWUnKVxyXG5cdFx0XHQuc2V0RGVzYygnUmVsYXRpdmUgdG8gdmF1bHQgZGlyZWN0b3J5IChyZXF1aXJlcyByZXN0YXJ0KScpXHJcblx0XHRcdC5hZGRUZXh0KCh0ZXh0KSA9PiB7XHJcblx0XHRcdFx0dGV4dC5zZXRQbGFjZWhvbGRlcihERUZBVUxUX1NFVFRJTkdTLnZpbXJjRmlsZU5hbWUpO1xyXG5cdFx0XHRcdHRleHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudmltcmNGaWxlTmFtZSB8fCBERUZBVUxUX1NFVFRJTkdTLnZpbXJjRmlsZU5hbWUpO1xyXG5cdFx0XHRcdHRleHQub25DaGFuZ2UodmFsdWUgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MudmltcmNGaWxlTmFtZSA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdWaW0gY2hvcmQgZGlzcGxheScpXHJcblx0XHRcdC5zZXREZXNjKCdEaXNwbGF5cyB0aGUgY3VycmVudCBjaG9yZCB1bnRpbCBjb21wbGV0aW9uLiBFeDogXCI8U3BhY2U+IGYtXCIgKHJlcXVpcmVzIHJlc3RhcnQpJylcclxuXHRcdFx0LmFkZFRvZ2dsZSgodG9nZ2xlKSA9PiB7XHJcblx0XHRcdFx0dG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmRpc3BsYXlDaG9yZCB8fCBERUZBVUxUX1NFVFRJTkdTLmRpc3BsYXlDaG9yZCk7XHJcblx0XHRcdFx0dG9nZ2xlLm9uQ2hhbmdlKHZhbHVlID0+IHtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmRpc3BsYXlDaG9yZCA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdWaW0gbW9kZSBkaXNwbGF5JylcclxuXHRcdFx0LnNldERlc2MoJ0Rpc3BsYXlzIHRoZSBjdXJyZW50IHZpbSBtb2RlIChyZXF1aXJlcyByZXN0YXJ0KScpXHJcblx0XHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT4ge1xyXG5cdFx0XHRcdHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXNwbGF5VmltTW9kZSB8fCBERUZBVUxUX1NFVFRJTkdTLmRpc3BsYXlWaW1Nb2RlKTtcclxuXHRcdFx0XHR0b2dnbGUub25DaGFuZ2UodmFsdWUgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzcGxheVZpbU1vZGUgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnVXNlIGEgZml4ZWQga2V5Ym9hcmQgbGF5b3V0IGZvciBOb3JtYWwgbW9kZScpXHJcblx0XHRcdC5zZXREZXNjKCdEZWZpbmUgYSBrZXlib2FyZCBsYXlvdXQgdG8gYWx3YXlzIHVzZSB3aGVuIGluIE5vcm1hbCBtb2RlLCByZWdhcmRsZXNzIG9mIHRoZSBpbnB1dCBsYW5ndWFnZSAoZXhwZXJpbWVudGFsKS4nKVxyXG5cdFx0XHQuYWRkQnV0dG9uKGFzeW5jIChidXR0b24pID0+IHtcclxuXHRcdFx0XHRidXR0b24uc2V0QnV0dG9uVGV4dCgnQ2FwdHVyZSBjdXJyZW50IGxheW91dCcpO1xyXG5cdFx0XHRcdGJ1dHRvbi5vbkNsaWNrKGFzeW5jICgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmNhcHR1cmVkS2V5Ym9hcmRNYXAgPSBhd2FpdCB0aGlzLnBsdWdpbi5jYXB0dXJlS2V5Ym9hcmRMYXlvdXQoKTtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+IHtcclxuXHRcdFx0XHR0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZml4ZWROb3JtYWxNb2RlTGF5b3V0IHx8IERFRkFVTFRfU0VUVElOR1MuZml4ZWROb3JtYWxNb2RlTGF5b3V0KTtcclxuXHRcdFx0XHR0b2dnbGUub25DaGFuZ2UoYXN5bmMgdmFsdWUgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuZml4ZWROb3JtYWxNb2RlTGF5b3V0ID0gdmFsdWU7XHJcblx0XHRcdFx0XHRpZiAodmFsdWUgJiYgT2JqZWN0LmtleXModGhpcy5wbHVnaW4uc2V0dGluZ3MuY2FwdHVyZWRLZXlib2FyZE1hcCkubGVuZ3RoID09PSAwKVxyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5jYXB0dXJlZEtleWJvYXJkTWFwID0gYXdhaXQgdGhpcy5wbHVnaW4uY2FwdHVyZUtleWJvYXJkTGF5b3V0KCk7XHJcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ1N1cHBvcnQgSlMgY29tbWFuZHMgKGJld2FyZSEpJylcclxuXHRcdFx0LnNldERlc2MoXCJTdXBwb3J0IHRoZSAnanNjb21tYW5kJyBhbmQgJ2pzZmlsZScgY29tbWFuZHMsIHdoaWNoIGFsbG93IGRlZmluaW5nIEV4IGNvbW1hbmRzIHVzaW5nIEphdmFzY3JpcHQuIFdBUk5JTkchIFJldmlldyB0aGUgUkVBRE1FIHRvIHVuZGVyc3RhbmQgd2h5IHRoaXMgbWF5IGJlIGRhbmdlcm91cyBiZWZvcmUgZW5hYmxpbmcuXCIpXHJcblx0XHRcdC5hZGRUb2dnbGUodG9nZ2xlID0+IHtcclxuXHRcdFx0XHR0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc3VwcG9ydEpzQ29tbWFuZHMgPz8gREVGQVVMVF9TRVRUSU5HUy5zdXBwb3J0SnNDb21tYW5kcyk7XHJcblx0XHRcdFx0dG9nZ2xlLm9uQ2hhbmdlKHZhbHVlID0+IHtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnN1cHBvcnRKc0NvbW1hbmRzID0gdmFsdWU7XHJcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KTtcclxuXHR9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5vdGljZSIsIk1hcmtkb3duVmlldyIsImtleUZyb21BY2NlbGVyYXRvci50b0tleUV2ZW50IiwiUGx1Z2luIiwiU2V0dGluZyIsIlBsdWdpblNldHRpbmdUYWIiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztBQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDcEYsUUFBUSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDMUcsSUFBSSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBQ0Y7QUFDTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekYsQ0FBQztBQXVDRDtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Q7QUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNySCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzdKLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDdEUsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDdEIsUUFBUSxJQUFJLENBQUMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDdEUsUUFBUSxPQUFPLENBQUMsRUFBRSxJQUFJO0FBQ3RCLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFB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
