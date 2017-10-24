/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("bluebird-lst");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("builder-util-runtime");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UpdaterSignal = exports.UPDATE_DOWNLOADED = exports.DOWNLOAD_PROGRESS = exports.Provider = exports.CancellationToken = exports.NoOpLogger = exports.AppUpdater = exports.NET_SESSION_NAME = undefined;

var _electronHttpExecutor;

function _load_electronHttpExecutor() {
    return _electronHttpExecutor = __webpack_require__(9);
}

Object.defineProperty(exports, "NET_SESSION_NAME", {
    enumerable: true,
    get: function () {
        return (_electronHttpExecutor || _load_electronHttpExecutor()).NET_SESSION_NAME;
    }
});

var _AppUpdater;

function _load_AppUpdater() {
    return _AppUpdater = __webpack_require__(10);
}

Object.defineProperty(exports, "AppUpdater", {
    enumerable: true,
    get: function () {
        return (_AppUpdater || _load_AppUpdater()).AppUpdater;
    }
});
Object.defineProperty(exports, "NoOpLogger", {
    enumerable: true,
    get: function () {
        return (_AppUpdater || _load_AppUpdater()).NoOpLogger;
    }
});

var _builderUtilRuntime;

function _load_builderUtilRuntime() {
    return _builderUtilRuntime = __webpack_require__(1);
}

Object.defineProperty(exports, "CancellationToken", {
    enumerable: true,
    get: function () {
        return (_builderUtilRuntime || _load_builderUtilRuntime()).CancellationToken;
    }
});

var _Provider;

function _load_Provider() {
    return _Provider = __webpack_require__(29);
}

Object.defineProperty(exports, "Provider", {
    enumerable: true,
    get: function () {
        return (_Provider || _load_Provider()).Provider;
    }
});
exports.getDefaultChannelName = getDefaultChannelName;
exports.getCustomChannelName = getCustomChannelName;
exports.getCurrentPlatform = getCurrentPlatform;
exports.isUseOldMacProvider = isUseOldMacProvider;
exports.getChannelFilename = getChannelFilename;
exports.newBaseUrl = newBaseUrl;
exports.newUrlFromBase = newUrlFromBase;

var _url;

function _load_url() {
    return _url = __webpack_require__(8);
}

// autoUpdater to mimic electron bundled autoUpdater
let _autoUpdater;
function _load_autoUpdater() {
    // tslint:disable:prefer-conditional-expression
    if (process.platform === "win32") {
        _autoUpdater = new (__webpack_require__(30).NsisUpdater)();
    } else if (process.platform === "darwin") {
        _autoUpdater = new (__webpack_require__(37).MacUpdater)();
    } else {
        _autoUpdater = new (__webpack_require__(39).AppImageUpdater)();
    }
    return _autoUpdater;
}
Object.defineProperty(exports, "autoUpdater", {
    enumerable: true,
    get: () => {
        return _autoUpdater || _load_autoUpdater();
    }
});
// due to historical reasons for windows we use channel name without platform specifier
function getDefaultChannelName() {
    return `latest${getChannelFilePrefix()}`;
}
function getChannelFilePrefix() {
    const currentPlatform = getCurrentPlatform();
    if (currentPlatform === "linux") {
        return "-linux";
    } else {
        return currentPlatform === "darwin" ? "-mac" : "";
    }
}
function getCustomChannelName(channel) {
    return `${channel}${getChannelFilePrefix()}`;
}
function getCurrentPlatform() {
    return process.env.TEST_UPDATER_PLATFORM || process.platform;
}
function isUseOldMacProvider() {
    // getCurrentPlatform() === "darwin"
    return false;
}
function getChannelFilename(channel) {
    return `${channel}.yml`;
}
const DOWNLOAD_PROGRESS = exports.DOWNLOAD_PROGRESS = "download-progress";
const UPDATE_DOWNLOADED = exports.UPDATE_DOWNLOADED = "update-downloaded";
class UpdaterSignal {
    constructor(emitter) {
        this.emitter = emitter;
    }
    /**
     * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
     */
    login(handler) {
        addHandler(this.emitter, "login", handler);
    }
    progress(handler) {
        addHandler(this.emitter, DOWNLOAD_PROGRESS, handler);
    }
    updateDownloaded(handler) {
        addHandler(this.emitter, UPDATE_DOWNLOADED, handler);
    }
    updateCancelled(handler) {
        addHandler(this.emitter, "update-cancelled", handler);
    }
}
exports.UpdaterSignal = UpdaterSignal;
const isLogEvent = false;
function addHandler(emitter, event, handler) {
    if (isLogEvent) {
        emitter.on(event, function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            console.log("%s %s", event, args);
            handler.apply(null, args);
        });
    } else {
        emitter.on(event, handler);
    }
}
// if baseUrl path doesn't ends with /, this path will be not prepended to passed pathname for new URL(input, base)
/** @internal */
function newBaseUrl(url) {
    const result = new (_url || _load_url()).URL(url);
    if (!result.pathname.endsWith("/")) {
        result.pathname += "/";
    }
    return result;
}
/** @internal */
function newUrlFromBase(pathname, baseUrl) {
    const result = new (_url || _load_url()).URL(pathname, baseUrl);
    // search is not propagated
    if (!result.search && baseUrl.search) {
        result.search = baseUrl.search;
    }
    return result;
}
//# sourceMappingURL=main.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("js-yaml");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("fs-extra-p");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ElectronHttpExecutor = exports.NET_SESSION_NAME = undefined;

var _bluebirdLst;

function _load_bluebirdLst() {
    return _bluebirdLst = __webpack_require__(0);
}

var _builderUtilRuntime;

function _load_builderUtilRuntime() {
    return _builderUtilRuntime = __webpack_require__(1);
}

var _electron;

function _load_electron() {
    return _electron = __webpack_require__(4);
}

var _fsExtraP;

function _load_fsExtraP() {
    return _fsExtraP = __webpack_require__(6);
}

var _path = _interopRequireWildcard(__webpack_require__(3));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const NET_SESSION_NAME = exports.NET_SESSION_NAME = "electron-updater";
class ElectronHttpExecutor extends (_builderUtilRuntime || _load_builderUtilRuntime()).HttpExecutor {
    constructor(proxyLoginCallback) {
        super();
        this.proxyLoginCallback = proxyLoginCallback;
    }
    download(url, destination, options) {
        var _this = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            if (options == null || !options.skipDirCreation) {
                yield (0, (_fsExtraP || _load_fsExtraP()).ensureDir)(_path.dirname(destination));
            }
            return yield options.cancellationToken.createPromise(function (resolve, reject, onCancel) {
                _this.doDownload((0, (_builderUtilRuntime || _load_builderUtilRuntime()).configureRequestOptionsFromUrl)(url, {
                    headers: options.headers || undefined
                }), destination, 0, options, function (error) {
                    if (error == null) {
                        resolve(destination);
                    } else {
                        reject(error);
                    }
                }, onCancel);
            });
        })();
    }
    doRequest(options, callback) {
        const request = (_electron || _load_electron()).net.request(Object.assign({ session: (_electron || _load_electron()).session.fromPartition(NET_SESSION_NAME) }, options), callback);
        this.addProxyLoginHandler(request);
        return request;
    }
    addProxyLoginHandler(request) {
        if (this.proxyLoginCallback != null) {
            request.on("login", this.proxyLoginCallback);
        }
    }
}
exports.ElectronHttpExecutor = ElectronHttpExecutor; //# sourceMappingURL=electronHttpExecutor.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NoOpLogger = exports.AppUpdater = undefined;

var _bluebirdLst;

function _load_bluebirdLst() {
    return _bluebirdLst = __webpack_require__(0);
}

var _bluebirdLst2;

function _load_bluebirdLst2() {
    return _bluebirdLst2 = _interopRequireDefault(__webpack_require__(0));
}

var _builderUtilRuntime;

function _load_builderUtilRuntime() {
    return _builderUtilRuntime = __webpack_require__(1);
}

var _crypto;

function _load_crypto() {
    return _crypto = __webpack_require__(22);
}

var _electron;

function _load_electron() {
    return _electron = __webpack_require__(4);
}

var _electronIsDev;

function _load_electronIsDev() {
    return _electronIsDev = _interopRequireDefault(__webpack_require__(13));
}

var _events;

function _load_events() {
    return _events = __webpack_require__(23);
}

var _fsExtraP;

function _load_fsExtraP() {
    return _fsExtraP = __webpack_require__(6);
}

var _jsYaml;

function _load_jsYaml() {
    return _jsYaml = __webpack_require__(5);
}

var _lazyVal;

function _load_lazyVal() {
    return _lazyVal = __webpack_require__(24);
}

var _path = _interopRequireWildcard(__webpack_require__(3));

var _semver;

function _load_semver() {
    return _semver = __webpack_require__(14);
}

__webpack_require__(11);

var _BintrayProvider;

function _load_BintrayProvider() {
    return _BintrayProvider = __webpack_require__(25);
}

var _electronHttpExecutor;

function _load_electronHttpExecutor() {
    return _electronHttpExecutor = __webpack_require__(9);
}

var _GenericProvider;

function _load_GenericProvider() {
    return _GenericProvider = __webpack_require__(27);
}

var _GitHubProvider;

function _load_GitHubProvider() {
    return _GitHubProvider = __webpack_require__(15);
}

var _main;

function _load_main() {
    return _main = __webpack_require__(2);
}

var _PrivateGitHubProvider;

function _load_PrivateGitHubProvider() {
    return _PrivateGitHubProvider = __webpack_require__(28);
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppUpdater extends (_events || _load_events()).EventEmitter {
    constructor(options, app) {
        super();
        /**
         * Whether to automatically download an update when it is found.
         */
        this.autoDownload = true;
        /**
         * *GitHub provider only.* Whether to allow update to pre-release versions. Defaults to `true` if application version contains prerelease components (e.g. `0.12.1-alpha.1`, here `alpha` is a prerelease component), otherwise `false`.
         *
         * If `true`, downgrade will be allowed (`allowDowngrade` will be set to `true`).
         */
        this.allowPrerelease = false;
        /**
         * *GitHub provider only.* Get all release notes (from current version to latest), not just the latest.
         * @default false
         */
        this.fullChangelog = false;
        /**
         * Whether to allow version downgrade (when a user from the beta channel wants to go back to the stable channel).
         * @default false
         */
        this.allowDowngrade = false;
        this._logger = console;
        /**
         * For type safety you can use signals, e.g. `autoUpdater.signals.updateDownloaded(() => {})` instead of `autoUpdater.on('update-available', () => {})`
         */
        this.signals = new (_main || _load_main()).UpdaterSignal(this);
        this.updateAvailable = false;
        this.stagingUserIdPromise = new (_lazyVal || _load_lazyVal()).Lazy(() => this.getOrCreateStagingUserId());
        // public, allow to read old config for anyone
        this.configOnDisk = new (_lazyVal || _load_lazyVal()).Lazy(() => this.loadUpdateConfig());
        this.on("error", error => {
            this._logger.error(`Error: ${error.stack || error.message}`);
        });
        if (app != null || global.__test_app != null) {
            this.app = app || global.__test_app;
            this.untilAppReady = (_bluebirdLst2 || _load_bluebirdLst2()).default.resolve();
        } else {
            this.app = __webpack_require__(4).app;
            this.httpExecutor = new (_electronHttpExecutor || _load_electronHttpExecutor()).ElectronHttpExecutor((authInfo, callback) => this.emit("login", authInfo, callback));
            this.untilAppReady = new (_bluebirdLst2 || _load_bluebirdLst2()).default(resolve => {
                if (this.app.isReady()) {
                    resolve();
                } else {
                    this.app.on("ready", resolve);
                }
            });
        }
        const currentVersionString = this.app.getVersion();
        const currentVersion = (0, (_semver || _load_semver()).valid)(currentVersionString);
        if (currentVersion == null) {
            throw new Error(`App version is not a valid semver version: "${currentVersionString}`);
        }
        this.currentVersion = currentVersion;
        this.allowPrerelease = hasPrereleaseComponents(this.currentVersion);
        if (options != null) {
            this.setFeedURL(options);
        }
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
        return this._logger;
    }
    set logger(value) {
        this._logger = value == null ? new NoOpLogger() : value;
    }
    /**
     * test only
     * @private
     */
    set updateConfigPath(value) {
        this.clientPromise = null;
        this._appUpdateConfigPath = value;
        this.configOnDisk = new (_lazyVal || _load_lazyVal()).Lazy(() => this.loadUpdateConfig());
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
        return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](/configuration/publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(options) {
        // https://github.com/electron-userland/electron-builder/issues/1105
        let client;
        if (typeof options === "string") {
            client = new (_GenericProvider || _load_GenericProvider()).GenericProvider({ provider: "generic", url: options }, this.httpExecutor);
        } else {
            client = this.createClient(options);
        }
        this.clientPromise = (_bluebirdLst2 || _load_bluebirdLst2()).default.resolve(client);
    }
    /**
     * Asks the server whether there is an update.
     */
    checkForUpdates() {
        let checkForUpdatesPromise = this.checkForUpdatesPromise;
        if (checkForUpdatesPromise != null) {
            return checkForUpdatesPromise;
        }
        checkForUpdatesPromise = this._checkForUpdates();
        this.checkForUpdatesPromise = checkForUpdatesPromise;
        const nullizePromise = () => this.checkForUpdatesPromise = null;
        checkForUpdatesPromise.then(nullizePromise).catch(nullizePromise);
        return checkForUpdatesPromise;
    }
    checkForUpdatesAndNotify() {
        if ((_electronIsDev || _load_electronIsDev()).default) {
            return (_bluebirdLst2 || _load_bluebirdLst2()).default.resolve(null);
        }
        this.signals.updateDownloaded(it => {
            new (_electron || _load_electron()).Notification({
                title: "A new update is ready to install",
                body: `Version ${it.version} is downloaded and will be automatically installed on Quit`
            }).show();
        });
        return this.checkForUpdates();
    }
    isStagingMatch(updateInfo) {
        var _this = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            const rawStagingPercentage = updateInfo.stagingPercentage;
            let stagingPercentage = rawStagingPercentage;
            if (stagingPercentage == null) {
                return true;
            }
            stagingPercentage = parseInt(stagingPercentage, 10);
            if (isNaN(stagingPercentage)) {
                _this._logger.warn(`Staging percentage is NaN: ${rawStagingPercentage}`);
                return true;
            }
            // convert from user 0-100 to internal 0-1
            stagingPercentage = stagingPercentage / 100;
            const stagingUserId = yield _this.stagingUserIdPromise.value;
            const val = (_builderUtilRuntime || _load_builderUtilRuntime()).UUID.parse(stagingUserId).readUInt32BE(12);
            const percentage = val / 0xFFFFFFFF;
            _this._logger.info(`Staging percentage: ${stagingPercentage}, percentage: ${percentage}, user id: ${stagingUserId}`);
            return percentage < stagingPercentage;
        })();
    }
    _checkForUpdates() {
        var _this2 = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            try {
                yield _this2.untilAppReady;
                _this2._logger.info("Checking for update");
                _this2.emit("checking-for-update");
                return yield _this2.doCheckForUpdates();
            } catch (e) {
                _this2.emit("error", e, `Cannot check for updates: ${(e.stack || e).toString()}`);
                throw e;
            }
        })();
    }
    computeFinalHeaders(headers) {
        if (this.requestHeaders != null) {
            Object.assign(headers, this.requestHeaders);
        }
        return headers;
    }
    doCheckForUpdates() {
        var _this3 = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            if (_this3.clientPromise == null) {
                _this3.clientPromise = _this3.configOnDisk.value.then(function (it) {
                    return _this3.createClient(it);
                });
            }
            const client = yield _this3.clientPromise;
            const stagingUserId = yield _this3.stagingUserIdPromise.value;
            client.setRequestHeaders(_this3.computeFinalHeaders({ "X-User-Staging-Id": stagingUserId }));
            const versionInfo = yield client.getLatestVersion();
            const latestVersion = (0, (_semver || _load_semver()).valid)(versionInfo.version);
            if (latestVersion == null) {
                throw new Error(`Latest version (from update server) is not valid semver version: "${latestVersion}`);
            }
            const isStagingMatch = yield _this3.isStagingMatch(versionInfo);
            if (!isStagingMatch || (_this3.allowDowngrade && !hasPrereleaseComponents(latestVersion) ? (0, (_semver || _load_semver()).eq)(latestVersion, _this3.currentVersion) : !(0, (_semver || _load_semver()).gt)(latestVersion, _this3.currentVersion))) {
                _this3.updateAvailable = false;
                _this3._logger.info(`Update for version ${_this3.currentVersion} is not available (latest version: ${versionInfo.version}, downgrade is ${_this3.allowDowngrade ? "allowed" : "disallowed"}.`);
                _this3.emit("update-not-available", versionInfo);
                return {
                    versionInfo
                };
            }
            const fileInfo = yield client.getUpdateFile(versionInfo);
            _this3.updateAvailable = true;
            _this3.versionInfo = versionInfo;
            _this3.fileInfo = fileInfo;
            _this3.onUpdateAvailable(versionInfo, fileInfo);
            const cancellationToken = new (_builderUtilRuntime || _load_builderUtilRuntime()).CancellationToken();
            //noinspection ES6MissingAwait
            return {
                versionInfo,
                fileInfo,
                cancellationToken,
                downloadPromise: _this3.autoDownload ? _this3.downloadUpdate(cancellationToken) : null
            };
        })();
    }
    onUpdateAvailable(versionInfo, fileInfo) {
        this._logger.info(`Found version ${versionInfo.version} (url: ${fileInfo.url})`);
        this.emit("update-available", versionInfo);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<string>} Path to downloaded file.
     */
    downloadUpdate() {
        var _this4 = this;

        let cancellationToken = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new (_builderUtilRuntime || _load_builderUtilRuntime()).CancellationToken();
        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            const versionInfo = _this4.versionInfo;
            const fileInfo = _this4.fileInfo;
            if (versionInfo == null || fileInfo == null) {
                const error = new Error("Please check update first");
                _this4.dispatchError(error);
                throw error;
            }
            _this4._logger.info(`Downloading update from ${fileInfo.url}`);
            try {
                return yield _this4.doDownloadUpdate(versionInfo, fileInfo, cancellationToken);
            } catch (e) {
                _this4.dispatchError(e);
                throw e;
            }
        })();
    }
    dispatchError(e) {
        this.emit("error", e, (e.stack || e).toString());
    }
    loadUpdateConfig() {
        var _this5 = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            if (_this5._appUpdateConfigPath == null) {
                _this5._appUpdateConfigPath = (_electronIsDev || _load_electronIsDev()).default ? _path.join(_this5.app.getAppPath(), "dev-app-update.yml") : _path.join(process.resourcesPath, "app-update.yml");
            }
            return (0, (_jsYaml || _load_jsYaml()).safeLoad)((yield (0, (_fsExtraP || _load_fsExtraP()).readFile)(_this5._appUpdateConfigPath, "utf-8")));
        })();
    }
    /*** @private */
    computeRequestHeaders(fileInfo) {
        if (fileInfo.headers != null) {
            const requestHeaders = this.requestHeaders;
            return requestHeaders == null ? fileInfo.headers : Object.assign({}, fileInfo.headers, requestHeaders);
        }
        return this.computeFinalHeaders({ Accept: "*/*" });
    }
    createClient(data) {
        if (typeof data === "string") {
            throw new Error("Please pass PublishConfiguration object");
        }
        const provider = data.provider;
        switch (provider) {
            case "github":
                const githubOptions = data;
                const token = (githubOptions.private ? process.env.GH_TOKEN : null) || githubOptions.token;
                if (token == null) {
                    return new (_GitHubProvider || _load_GitHubProvider()).GitHubProvider(githubOptions, this, this.httpExecutor);
                } else {
                    return new (_PrivateGitHubProvider || _load_PrivateGitHubProvider()).PrivateGitHubProvider(githubOptions, token, this.httpExecutor);
                }
            case "s3":
            case "spaces":
                return new (_GenericProvider || _load_GenericProvider()).GenericProvider({
                    provider: "generic",
                    url: (0, (_builderUtilRuntime || _load_builderUtilRuntime()).getS3LikeProviderBaseUrl)(data),
                    channel: data.channel || ""
                }, this.httpExecutor);
            case "generic":
                return new (_GenericProvider || _load_GenericProvider()).GenericProvider(data, this.httpExecutor);
            case "bintray":
                return new (_BintrayProvider || _load_BintrayProvider()).BintrayProvider(data, this.httpExecutor);
            default:
                throw new Error(`Unsupported provider: ${provider}`);
        }
    }
    getOrCreateStagingUserId() {
        var _this6 = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            const file = _path.join(_this6.app.getPath("userData"), ".updaterId");
            try {
                const id = yield (0, (_fsExtraP || _load_fsExtraP()).readFile)(file, "utf-8");
                if ((_builderUtilRuntime || _load_builderUtilRuntime()).UUID.check(id)) {
                    return id;
                } else {
                    _this6._logger.warn(`Staging user id file exists, but content was invalid: ${id}`);
                }
            } catch (e) {
                if (e.code !== "ENOENT") {
                    _this6._logger.warn(`Couldn't read staging user ID, creating a blank one: ${e}`);
                }
            }
            const id = (_builderUtilRuntime || _load_builderUtilRuntime()).UUID.v5((0, (_crypto || _load_crypto()).randomBytes)(4096), (_builderUtilRuntime || _load_builderUtilRuntime()).UUID.OID);
            _this6._logger.info(`Generated new staging user ID: ${id}`);
            try {
                yield (0, (_fsExtraP || _load_fsExtraP()).outputFile)(file, id);
            } catch (e) {
                _this6._logger.warn(`Couldn't write out staging user ID: ${e}`);
            }
            return id;
        })();
    }
}
exports.AppUpdater = AppUpdater;
function hasPrereleaseComponents(version) {
    const versionPrereleaseComponent = (0, (_semver || _load_semver()).prerelease)(version);
    return versionPrereleaseComponent != null && versionPrereleaseComponent.length > 0;
}
/** @private */
class NoOpLogger {
    info(message) {
        // ignore
    }
    warn(message) {
        // ignore
    }
    error(message) {
        // ignore
    }
}
exports.NoOpLogger = NoOpLogger; //# sourceMappingURL=AppUpdater.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("builder-util-runtime/out/blockMapApi");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
const isEnvSet = 'ELECTRON_IS_DEV' in process.env;

module.exports = isEnvSet ? getFromEnv : (process.defaultApp || /node_modules[\\/]electron[\\/]/.test(process.execPath));


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("semver");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GitHubProvider = exports.BaseGitHubProvider = undefined;

var _bluebirdLst;

function _load_bluebirdLst() {
    return _bluebirdLst = __webpack_require__(0);
}

exports.computeReleaseNotes = computeReleaseNotes;

var _builderUtilRuntime;

function _load_builderUtilRuntime() {
    return _builderUtilRuntime = __webpack_require__(1);
}

var _jsYaml;

function _load_jsYaml() {
    return _jsYaml = __webpack_require__(5);
}

var _path = _interopRequireWildcard(__webpack_require__(3));

var _semver;

function _load_semver() {
    return _semver = _interopRequireWildcard(__webpack_require__(14));
}

var _main;

function _load_main() {
    return _main = __webpack_require__(2);
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class BaseGitHubProvider extends (_main || _load_main()).Provider {
    constructor(options, defaultHost, executor) {
        super(executor);
        this.options = options;
        this.baseUrl = (0, (_main || _load_main()).newBaseUrl)((0, (_builderUtilRuntime || _load_builderUtilRuntime()).githubUrl)(options, defaultHost));
    }
    computeGithubBasePath(result) {
        // https://github.com/electron-userland/electron-builder/issues/1903#issuecomment-320881211
        const host = this.options.host;
        return host != null && host !== "github.com" && host !== "api.github.com" ? `/api/v3${result}` : result;
    }
}
exports.BaseGitHubProvider = BaseGitHubProvider;
class GitHubProvider extends BaseGitHubProvider {
    constructor(options, updater, executor) {
        super(options, "github.com", executor);
        this.options = options;
        this.updater = updater;
    }
    getLatestVersion() {
        var _this = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            const basePath = _this.basePath;
            const cancellationToken = new (_builderUtilRuntime || _load_builderUtilRuntime()).CancellationToken();
            const feedXml = yield _this.httpRequest((0, (_main || _load_main()).newUrlFromBase)(`${basePath}.atom`, _this.baseUrl), {
                Accept: "application/xml, application/atom+xml, text/xml, */*"
            }, cancellationToken);
            const feed = (0, (_builderUtilRuntime || _load_builderUtilRuntime()).parseXml)(feedXml);
            const latestRelease = feed.element("entry", false, `No published versions on GitHub`);
            let version;
            try {
                if (_this.updater.allowPrerelease) {
                    version = latestRelease.element("link").attribute("href").match(/\/tag\/v?([^\/]+)$/)[1];
                } else {
                    version = yield _this.getLatestVersionString(basePath, cancellationToken);
                }
            } catch (e) {
                throw new Error(`Cannot parse releases feed: ${e.stack || e.message},\nXML:\n${feedXml}`);
            }
            if (version == null) {
                throw new Error(`No published versions on GitHub`);
            }
            const channelFile = (0, (_main || _load_main()).getChannelFilename)((0, (_main || _load_main()).getDefaultChannelName)());
            const channelFileUrl = (0, (_main || _load_main()).newUrlFromBase)(_this.getBaseDownloadPath(version, channelFile), _this.baseUrl);
            const requestOptions = _this.createRequestOptions(channelFileUrl);
            let rawData;
            try {
                rawData = yield _this.executor.request(requestOptions, cancellationToken);
            } catch (e) {
                if (!_this.updater.allowPrerelease) {
                    if (e instanceof (_builderUtilRuntime || _load_builderUtilRuntime()).HttpError && e.response.statusCode === 404) {
                        throw new Error(`Cannot find ${channelFile} in the latest release artifacts (${channelFileUrl}): ${e.stack || e.message}`);
                    }
                }
                throw e;
            }
            let result;
            try {
                result = (0, (_jsYaml || _load_jsYaml()).safeLoad)(rawData);
            } catch (e) {
                throw new Error(`Cannot parse update info from ${channelFile} in the latest release artifacts (${channelFileUrl}): ${e.stack || e.message}, rawData: ${rawData}`);
            }
            (_main || _load_main()).Provider.validateUpdateInfo(result);
            if ((0, (_main || _load_main()).isUseOldMacProvider)()) {
                result.releaseJsonUrl = `${(0, (_builderUtilRuntime || _load_builderUtilRuntime()).githubUrl)(_this.options)}/${requestOptions.path}`;
            }
            if (result.releaseName == null) {
                result.releaseName = latestRelease.elementValueOrEmpty("title");
            }
            if (result.releaseNotes == null) {
                result.releaseNotes = computeReleaseNotes(_this.updater.currentVersion, _this.updater.fullChangelog, feed, latestRelease);
            }
            return result;
        })();
    }
    getLatestVersionString(basePath, cancellationToken) {
        var _this2 = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            const url = (0, (_main || _load_main()).newUrlFromBase)(`${basePath}/latest`, _this2.baseUrl);
            try {
                // do not use API to avoid limit
                const rawData = yield _this2.httpRequest(url, { Accept: "application/json" }, cancellationToken);
                if (rawData == null) {
                    return null;
                }
                const releaseInfo = JSON.parse(rawData);
                return releaseInfo.tag_name.startsWith("v") ? releaseInfo.tag_name.substring(1) : releaseInfo.tag_name;
            } catch (e) {
                throw new Error(`Unable to find latest version on GitHub (${url}), please ensure a production release exists: ${e.stack || e.message}`);
            }
        })();
    }
    get basePath() {
        return this.computeGithubBasePath(`/${this.options.owner}/${this.options.repo}/releases`);
    }
    getUpdateFile(versionInfo) {
        var _this3 = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            if ((0, (_main || _load_main()).isUseOldMacProvider)()) {
                return versionInfo;
            }
            // space is not supported on GitHub
            const name = versionInfo.githubArtifactName || _path.posix.basename(versionInfo.path).replace(/ /g, "-");
            const result = {
                name,
                url: (0, (_main || _load_main()).newUrlFromBase)(_this3.getBaseDownloadPath(versionInfo.version, name), _this3.baseUrl).href,
                sha512: versionInfo.sha512
            };
            const packages = versionInfo.packages;
            const packageInfo = packages == null ? null : packages[process.arch] || packages.ia32;
            if (packageInfo != null) {
                result.packageInfo = Object.assign({}, packageInfo, { path: (0, (_main || _load_main()).newUrlFromBase)(_this3.getBaseDownloadPath(versionInfo.version, packageInfo.path || packageInfo.file), _this3.baseUrl).href });
            }
            return result;
        })();
    }
    getBaseDownloadPath(version, fileName) {
        return `${this.basePath}/download/${this.options.vPrefixedTagName === false ? "" : "v"}${version}/${fileName}`;
    }
}
exports.GitHubProvider = GitHubProvider;
function getNoteValue(parent) {
    const result = parent.elementValueOrEmpty("content");
    // GitHub reports empty notes as <content>No content.</content>
    return result === "No content." ? "" : result;
}
function computeReleaseNotes(currentVersion, isFullChangelog, feed, latestRelease) {
    if (!isFullChangelog) {
        return getNoteValue(latestRelease);
    }
    const releaseNotes = [];
    for (const release of feed.getElements("entry")) {
        const versionRelease = release.element("link").attribute("href").match(/\/tag\/v?([^\/]+)$/)[1];
        if ((_semver || _load_semver()).lt(currentVersion, versionRelease)) {
            releaseNotes.push({
                version: versionRelease,
                note: getNoteValue(release)
            });
        }
    }
    return releaseNotes.sort((a, b) => (_semver || _load_semver()).rcompare(a.version, b.version));
}
//# sourceMappingURL=GitHubProvider.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SevenZipDifferentialDownloader = exports.DifferentialDownloader = exports.DifferentialDownloaderOptions = undefined;

var _bluebirdLst;

function _load_bluebirdLst() {
    return _bluebirdLst = __webpack_require__(0);
}

var _bluebirdLst2;

function _load_bluebirdLst2() {
    return _bluebirdLst2 = _interopRequireDefault(__webpack_require__(0));
}

let readBlockMap = (() => {
    var _ref = (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* (data) {
        return (0, (_jsYaml || _load_jsYaml()).safeLoad)((yield inflateRaw(data)).toString());
    });

    return function readBlockMap(_x2) {
        return _ref.apply(this, arguments);
    };
})();

var _builderUtilRuntime;

function _load_builderUtilRuntime() {
    return _builderUtilRuntime = __webpack_require__(1);
}

var _blockMapApi;

function _load_blockMapApi() {
    return _blockMapApi = __webpack_require__(12);
}

var _fsExtraP;

function _load_fsExtraP() {
    return _fsExtraP = __webpack_require__(6);
}

var _jsYaml;

function _load_jsYaml() {
    return _jsYaml = __webpack_require__(5);
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const inflateRaw = (_bluebirdLst2 || _load_bluebirdLst2()).default.promisify(__webpack_require__(31).inflateRaw);
class DifferentialDownloaderOptions {}
exports.DifferentialDownloaderOptions = DifferentialDownloaderOptions;
function buildChecksumToOffsetMap(file, fileOffset) {
    const result = new Map();
    let offset = fileOffset;
    for (let i = 0; i < file.checksums.length; i++) {
        result.set(file.checksums[i], offset);
        offset += file.sizes[i];
    }
    return result;
}
class DifferentialDownloader {
    constructor(packageInfo, httpExecutor, options) {
        this.packageInfo = packageInfo;
        this.httpExecutor = httpExecutor;
        this.options = options;
        this.logger = options.logger;
        this.baseRequestOptions = (0, (_builderUtilRuntime || _load_builderUtilRuntime()).configureRequestOptionsFromUrl)(options.newUrl, {});
    }
    get signatureSize() {
        return 0;
    }
    createRequestOptions() {
        let method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "get";

        return Object.assign({}, this.baseRequestOptions, { method, headers: Object.assign({}, this.options.requestHeaders, { Accept: "*/*" }) });
    }
    downloadNsisPackage(oldBlockMapFile) {
        var _this = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            const packageInfo = _this.packageInfo;
            const offset = packageInfo.size - packageInfo.headerSize - packageInfo.blockMapSize;
            _this.fileMetadataBuffer = yield _this.readRemoteBytes(offset, packageInfo.size - 1);
            const newBlockMap = yield readBlockMap(_this.fileMetadataBuffer.slice(packageInfo.headerSize));
            const oldBlockMap = (0, (_jsYaml || _load_jsYaml()).safeLoad)((yield (0, (_fsExtraP || _load_fsExtraP()).readFile)(oldBlockMapFile, "utf-8")));
            yield _this.download(oldBlockMap, newBlockMap);
        })();
    }
    downloadAppImage(oldBlockMap) {
        var _this2 = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            const packageInfo = _this2.packageInfo;
            const offset = packageInfo.size - (packageInfo.blockMapSize + 4);
            _this2.fileMetadataBuffer = yield _this2.readRemoteBytes(offset, packageInfo.size - 1);
            const newBlockMap = yield readBlockMap(_this2.fileMetadataBuffer.slice(0, _this2.fileMetadataBuffer.length - 4));
            yield _this2.download(oldBlockMap, newBlockMap);
        })();
    }
    download(oldBlockMap, newBlockMap) {
        var _this3 = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            // we don't check other metadata like compressionMethod - generic check that it is make sense to differentially update is suitable for it
            if (oldBlockMap.version !== newBlockMap.version) {
                throw new Error(`version is different (${oldBlockMap.version} - ${newBlockMap.version}), full download is required`);
            }
            const operations = _this3.computeOperations(oldBlockMap, newBlockMap);
            if (_this3.logger.debug != null) {
                _this3.logger.debug(JSON.stringify(operations, null, 2));
            }
            let downloadSize = 0;
            let copySize = 0;
            for (const operation of operations) {
                const length = operation.end - operation.start;
                if (operation.kind === OperationKind.DOWNLOAD) {
                    downloadSize += length;
                } else {
                    copySize += length;
                }
            }
            const newPackageSize = _this3.packageInfo.size;
            if (downloadSize + copySize + _this3.fileMetadataBuffer.length + _this3.signatureSize !== newPackageSize) {
                throw new Error(`Internal error, size mismatch: downloadSize: ${downloadSize}, copySize: ${copySize}, newPackageSize: ${newPackageSize}`);
            }
            _this3.logger.info(`Full: ${formatBytes(newPackageSize)}, To download: ${formatBytes(downloadSize)} (${Math.round(downloadSize / (newPackageSize / 100))}%)`);
            yield _this3.downloadFile(operations);
        })();
    }
    downloadFile(operations) {
        var _this4 = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            // todo we can avoid download remote and construct manually
            const signature = _this4.signatureSize === 0 ? null : yield _this4.readRemoteBytes(0, _this4.signatureSize - 1);
            const oldFileFd = yield (0, (_fsExtraP || _load_fsExtraP()).open)(_this4.options.oldPackageFile, "r");
            yield new (_bluebirdLst2 || _load_bluebirdLst2()).default(function (resolve, reject) {
                const streams = [];
                const digestTransform = new (_builderUtilRuntime || _load_builderUtilRuntime()).DigestTransform(_this4.packageInfo.sha512);
                // to simply debug, do manual validation to allow file to be fully written
                digestTransform.isValidateOnEnd = false;
                streams.push(digestTransform);
                const fileOut = (0, (_fsExtraP || _load_fsExtraP()).createWriteStream)(_this4.options.newFile);
                fileOut.on("finish", function () {
                    fileOut.close(function () {
                        try {
                            digestTransform.validate();
                        } catch (e) {
                            reject(e);
                            return;
                        }
                        resolve();
                    });
                });
                streams.push(fileOut);
                let lastStream = null;
                for (const stream of streams) {
                    stream.on("error", reject);
                    if (lastStream == null) {
                        lastStream = stream;
                    } else {
                        lastStream = lastStream.pipe(stream);
                    }
                }
                const firstStream = streams[0];
                const w = function (index) {
                    if (index >= operations.length) {
                        firstStream.end(_this4.fileMetadataBuffer);
                        return;
                    }
                    const operation = operations[index++];
                    if (operation.kind === OperationKind.COPY) {
                        const readStream = (0, (_fsExtraP || _load_fsExtraP()).createReadStream)(_this4.options.oldPackageFile, {
                            fd: oldFileFd,
                            autoClose: false,
                            start: operation.start,
                            // end is inclusive
                            end: operation.end - 1
                        });
                        readStream.on("error", reject);
                        readStream.once("end", function () {
                            return w(index);
                        });
                        readStream.pipe(firstStream, {
                            end: false
                        });
                    } else {
                        // https://github.com/electron-userland/electron-builder/issues/1523#issuecomment-327084661
                        // todo to reduce http requests we need to consolidate non sequential download operations (Multipart ranges)
                        const requestOptions = _this4.createRequestOptions("get");
                        requestOptions.headers.Range = `bytes=${operation.start}-${operation.end - 1}`;
                        const request = _this4.httpExecutor.doRequest(requestOptions, function (response) {
                            // Electron net handles redirects automatically, our NodeJS test server doesn't use redirects - so, we don't check 3xx codes.
                            if (response.statusCode >= 400) {
                                reject(new (_builderUtilRuntime || _load_builderUtilRuntime()).HttpError(response));
                            }
                            response.pipe(firstStream, {
                                end: false
                            });
                            response.once("end", function () {
                                return w(index);
                            });
                        });
                        _this4.httpExecutor.addErrorAndTimeoutHandlers(request, reject);
                        request.end();
                    }
                };
                if (signature == null) {
                    w(0);
                } else {
                    firstStream.write(signature, function () {
                        return w(0);
                    });
                }
            }).finally(function () {
                return (0, (_fsExtraP || _load_fsExtraP()).close)(oldFileFd);
            });
        })();
    }
    computeOperations(oldBlockMap, newBlockMap) {
        const nameToOldBlocks = buildBlockFileMap(oldBlockMap.files);
        const nameToNewBlocks = buildBlockFileMap(newBlockMap.files);
        const oldEntryMap = buildEntryMap(oldBlockMap.files);
        const operations = [];
        for (const blockMapFile of newBlockMap.files) {
            const name = blockMapFile.name;
            const oldEntry = blockMapFile.size === 0 ? null : oldEntryMap.get(name);
            // block map doesn't contain empty files, but we check this case just to be sure
            if (oldEntry == null) {
                // new file
                operations.push({
                    kind: OperationKind.DOWNLOAD,
                    start: blockMapFile.offset,
                    end: blockMapFile.size - blockMapFile.offset
                });
                continue;
            }
            let lastOperation = null;
            const newFile = nameToNewBlocks.get(name);
            const oldFile = nameToOldBlocks.get(name);
            let changedBlockCount = 0;
            const checksumToOldOffset = buildChecksumToOffsetMap(oldFile, oldEntry.offset);
            let newOffset = 0;
            blockMapLoop: for (let i = 0; i < newFile.checksums.length; newOffset += newFile.sizes[i], i++) {
                const currentBlockSize = newFile.sizes[i];
                const oldOffset = checksumToOldOffset.get(newFile.checksums[i]);
                if (oldOffset == null) {
                    changedBlockCount++;
                    const start = blockMapFile.offset + newOffset;
                    const end = start + currentBlockSize;
                    if (lastOperation == null || lastOperation.kind !== OperationKind.DOWNLOAD) {
                        lastOperation = {
                            kind: OperationKind.DOWNLOAD,
                            start,
                            end
                        };
                        operations.push(lastOperation);
                    } else {
                        lastOperation.end += currentBlockSize;
                    }
                } else {
                    if (lastOperation == null || lastOperation.kind !== OperationKind.COPY || lastOperation.end !== oldOffset) {
                        const end = oldOffset + currentBlockSize;
                        if (i === 0 && operations.length > 0) {
                            const prevOperation = operations[operations.length - 1];
                            if (prevOperation.kind === OperationKind.COPY && prevOperation.end === oldOffset) {
                                lastOperation = prevOperation;
                                prevOperation.end = end;
                                continue blockMapLoop;
                            }
                        }
                        lastOperation = {
                            kind: OperationKind.COPY,
                            start: oldOffset,
                            end
                        };
                        operations.push(lastOperation);
                    } else {
                        lastOperation.end += currentBlockSize;
                    }
                }
            }
            if (changedBlockCount > 0) {
                this.logger.info(`File ${blockMapFile.name} has ${changedBlockCount} changed blocks`);
            }
        }
        return operations;
    }
    readRemoteBytes(start, endInclusive) {
        var _this5 = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            const buffer = Buffer.allocUnsafe(endInclusive + 1 - start);
            const requestOptions = _this5.createRequestOptions();
            requestOptions.headers.Range = `bytes=${start}-${endInclusive}`;
            let position = 0;
            yield _this5.request(requestOptions, function (chunk) {
                chunk.copy(buffer, position);
                position += chunk.length;
            });
            return buffer;
        })();
    }
    request(requestOptions, dataHandler) {
        return new (_bluebirdLst2 || _load_bluebirdLst2()).default((resolve, reject) => {
            const request = this.httpExecutor.doRequest(requestOptions, response => {
                // Electron net handles redirects automatically, our NodeJS test server doesn't use redirects - so, we don't check 3xx codes.
                if (response.statusCode >= 400) {
                    reject(new (_builderUtilRuntime || _load_builderUtilRuntime()).HttpError(response));
                }
                if (response.statusCode !== 206) {
                    const acceptRanges = (0, (_builderUtilRuntime || _load_builderUtilRuntime()).safeGetHeader)(response, "accept-ranges");
                    if (acceptRanges == null || acceptRanges === "none") {
                        reject(new Error("Server doesn't support Accept-Ranges"));
                    }
                }
                response.on("data", dataHandler);
                response.on("end", () => {
                    resolve();
                });
            });
            this.httpExecutor.addErrorAndTimeoutHandlers(request, reject);
            request.end();
        });
    }
}
exports.DifferentialDownloader = DifferentialDownloader;
class SevenZipDifferentialDownloader extends DifferentialDownloader {
    constructor(packageInfo, httpExecutor, options) {
        super(packageInfo, httpExecutor, options);
    }
    get signatureSize() {
        return (_blockMapApi || _load_blockMapApi()).SIGNATURE_HEADER_SIZE;
    }
}
exports.SevenZipDifferentialDownloader = SevenZipDifferentialDownloader;
var OperationKind;
(function (OperationKind) {
    OperationKind[OperationKind["COPY"] = 0] = "COPY";
    OperationKind[OperationKind["DOWNLOAD"] = 1] = "DOWNLOAD";
})(OperationKind || (OperationKind = {}));
function buildEntryMap(list) {
    const result = new Map();
    for (const item of list) {
        result.set(item.name, item);
    }
    return result;
}
function buildBlockFileMap(list) {
    const result = new Map();
    for (const item of list) {
        result.set(item.name, item);
    }
    return result;
}

function formatBytes(value) {
    let symbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : " KB";

    return new Intl.NumberFormat("en").format((value / 1024).toFixed(2)) + symbol;
}
//# sourceMappingURL=differentialPackage.js.map

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BaseUpdater = undefined;

var _bluebirdLst;

function _load_bluebirdLst() {
    return _bluebirdLst = __webpack_require__(0);
}

var _DownloadedUpdateHelper;

function _load_DownloadedUpdateHelper() {
    return _DownloadedUpdateHelper = __webpack_require__(33);
}

var _AppUpdater;

function _load_AppUpdater() {
    return _AppUpdater = __webpack_require__(10);
}

var _builderUtilRuntime;

function _load_builderUtilRuntime() {
    return _builderUtilRuntime = __webpack_require__(1);
}

var _fsExtraP;

function _load_fsExtraP() {
    return _fsExtraP = __webpack_require__(6);
}

var _path = _interopRequireWildcard(__webpack_require__(3));

var _os;

function _load_os() {
    return _os = __webpack_require__(36);
}

var _main;

function _load_main() {
    return _main = __webpack_require__(2);
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class BaseUpdater extends (_AppUpdater || _load_AppUpdater()).AppUpdater {
    constructor(options, app) {
        super(options, app);
        this.downloadedUpdateHelper = new (_DownloadedUpdateHelper || _load_DownloadedUpdateHelper()).DownloadedUpdateHelper();
        this.quitAndInstallCalled = false;
        this.quitHandlerAdded = false;
    }
    quitAndInstall() {
        let isSilent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        let isForceRunAfter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (this.install(isSilent, isForceRunAfter)) {
            this.app.quit();
        }
    }
    executeDownload(downloadOptions, fileInfo, task) {
        var _this = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            if (_this.listenerCount((_main || _load_main()).DOWNLOAD_PROGRESS) > 0) {
                downloadOptions.onProgress = function (it) {
                    return _this.emit((_main || _load_main()).DOWNLOAD_PROGRESS, it);
                };
            }
            // use TEST_APP_TMP_DIR if defined and developer machine (must be not windows due to security reasons - we must not use env var in the production)
            const tempDir = yield (0, (_fsExtraP || _load_fsExtraP()).mkdtemp)(`${_path.join((process.platform === "darwin" ? process.env.TEST_APP_TMP_DIR : null) || (0, (_os || _load_os()).tmpdir)(), "up")}-`);
            const removeTempDirIfAny = function () {
                _this.downloadedUpdateHelper.clear();
                return (0, (_fsExtraP || _load_fsExtraP()).remove)(tempDir).catch(function () {
                    // ignored
                });
            };
            try {
                const destinationFile = _path.join(tempDir, fileInfo.name);
                yield task(tempDir, destinationFile, removeTempDirIfAny);
                _this._logger.info(`New version ${_this.versionInfo.version} has been downloaded to ${destinationFile}`);
            } catch (e) {
                yield removeTempDirIfAny();
                if (e instanceof (_builderUtilRuntime || _load_builderUtilRuntime()).CancellationError) {
                    _this.emit("update-cancelled", _this.versionInfo);
                    _this._logger.info("Cancelled");
                }
                throw e;
            }
        })();
    }
    install(isSilent, isForceRunAfter) {
        if (this.quitAndInstallCalled) {
            return false;
        }
        const installerPath = this.downloadedUpdateHelper.file;
        if (!this.updateAvailable || installerPath == null) {
            this.dispatchError(new Error("No update available, can't quit and install"));
            return false;
        }
        // prevent calling several times
        this.quitAndInstallCalled = true;
        return this.doInstall(installerPath, isSilent, isForceRunAfter);
    }
    addQuitHandler() {
        if (this.quitHandlerAdded) {
            return;
        }
        this.quitHandlerAdded = true;
        this.app.on("quit", () => {
            this._logger.info("Auto install update on quit");
            this.install(true, false);
        });
    }
}
exports.BaseUpdater = BaseUpdater; //# sourceMappingURL=BaseUpdater.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(4),
    TouchBar = _require.TouchBar;

var TouchBarLabel = TouchBar.TouchBarLabel,
    TouchBarButton = TouchBar.TouchBarButton,
    TouchBarSpacer = TouchBar.TouchBarSpacer;


var check = new TouchBarButton({
    label: 'Check',
    backgroundColor: '#00c4a7',
    click: function click() {
        console.log('Check');
    }
});

var touchBar = new TouchBar([check]);

module.exports = touchBar;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _child_process = __webpack_require__(7);

var child = _interopRequireWildcard(_child_process);

var _electron = __webpack_require__(4);

var _path = __webpack_require__(3);

var _path2 = _interopRequireDefault(_path);

var _url = __webpack_require__(8);

var _url2 = _interopRequireDefault(_url);

var _fs = __webpack_require__(20);

var _fs2 = _interopRequireDefault(_fs);

var _update = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Let electron reloads by itself when webpack watches changes in ./app/
// Basic init
if (process.env.ELECTRON_DEV) {
    __webpack_require__(41)(__dirname);
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = undefined;

function createWindow() {
    // Create the browser window.
    mainWindow = new _electron.BrowserWindow({
        width: 310,
        height: 310,
        show: true,
        resizable: false,
        titleBarStyle: 'hidden'
    });

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/../../renderer/index.html');
    mainWindow.setTouchBar(__webpack_require__(18));
    // Open the DevTools.
    if (process.env.ELECTRON_DEV) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    mainWindow.setTouchBar(__webpack_require__(18));

    var menu = _electron.Menu.buildFromTemplate(__webpack_require__(42));
    _electron.Menu.setApplicationMenu(menu);
}

_electron.app.on('ready', function () {
    createWindow();
    //update();
});

// Quit when all windows are closed.
_electron.app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        _electron.app.quit();
    }
});

_electron.app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

/**
 * COMMUNICATION OF RENDERER AND MAIN PROCESS
 **/
_electron.ipcMain.on('checksum', function (event, arg) {
    switch (arg.type) {
        case 'SHA512':
            child.exec('shasum -a 512 ' + arg.filepath.replace(/ /g, '\\ '), function (error, stdout, stderr) {
                var checksumResult = stdout.split(' ')[0].trim();
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
                var match = checksumResult == arg.checksum ? true : false;
                arg.saveChecksum ? _electron.clipboard.writeText(checksumResult) : null;
                event.sender.send('checksum-result', {
                    checksumResult: checksumResult,
                    match: match
                });
            });
            break;
        case 'SHA256':
            child.exec('shasum -a 256 ' + arg.filepath.replace(/ /g, '\\ '), function (error, stdout, stderr) {
                var checksumResult = stdout.split(' ')[0].trim();
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
                arg.saveChecksum ? _electron.clipboard.writeText(checksumResult) : null;
                var match = checksumResult == arg.checksum ? true : false;
                event.sender.send('checksum-result', {
                    checksumResult: checksumResult,
                    match: match
                });
            });
            break;
        case 'SHA1':
            child.exec('openssl sha1 ' + arg.filepath.replace(/ /g, '\\ '), function (error, stdout, stderr) {
                var checksumResult = stdout.split('= ')[1].trim();
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
                arg.saveChecksum ? _electron.clipboard.writeText(checksumResult) : null;
                var match = checksumResult === arg.checksum ? true : false;
                event.sender.send('checksum-result', {
                    checksumResult: checksumResult,
                    match: match
                });
            });
            break;
        case 'MD5':
            child.exec('openssl md5 ' + arg.filepath.replace(/ /g, '\\ '), function (error, stdout, stderr) {
                var checksumResult = stdout.split('= ')[1].trim();
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
                arg.saveChecksum ? _electron.clipboard.writeText(checksumResult) : null;
                var match = checksumResult == arg.checksum ? true : false;
                event.sender.send('checksum-result', {
                    checksumResult: checksumResult,
                    match: match
                });
            });
            break;
        default:
            break;
    }
});
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.update = update;

var _electronUpdater = __webpack_require__(2);

var _electron = __webpack_require__(4);

var _ms = __webpack_require__(40);

var _ms2 = _interopRequireDefault(_ms);

var _path = __webpack_require__(3);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//TODO: Get autoupdater in dev to work
_electronUpdater.autoUpdater.updateConfigPath = 'dev-app-update.yml';

var createInterval = function createInterval() {
    return setInterval(function () {
        logger.info('Checking for updates');
        _electron.dialog.showMessageBox({
            message: 'Checking for updates'
        });
        _electronUpdater.autoUpdater.checkForUpdates();
    }, (0, _ms2.default)('5m'));
};

function update() {
    setTimeout(function () {
        return _electronUpdater.autoUpdater.checkForUpdates();
    }, (0, _ms2.default)('5s'));

    var intervalId = createInterval();

    _electronUpdater.autoUpdater.on('error', function (error) {
        clearInterval(intervalId);
        intervalId = null;
        _electron.dialog.showMessageBox({
            message: 'Error while checking updates' + error
        });
    });

    _electronUpdater.autoUpdater.on('update-available', function () {
        clearInterval(intervalId);
        intervalId = null;
    });

    _electronUpdater.autoUpdater.on('update-downloaded', function () {
        _electron.dialog.showMessageBox({
            message: 'Eine Neue version wurde gedownloadet'
        }, function () {
            return _electronUpdater.autoUpdater.quitAndInstall();
        });
    });

    _electronUpdater.autoUpdater.on('update-not-available', function () {
        _electron.dialog.showMessageBox({
            message: 'Update not available'
        });
    });

    _electronUpdater.autoUpdater.on('error', function (err) {
        if (intervalId === null) {
            intervalId = createInterval();
        }
        logger.info('Error fetching updates', err.stack);
    });
}

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("lazy-val");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BintrayProvider = undefined;

var _bluebirdLst;

function _load_bluebirdLst() {
    return _bluebirdLst = __webpack_require__(0);
}

var _builderUtilRuntime;

function _load_builderUtilRuntime() {
    return _builderUtilRuntime = __webpack_require__(1);
}

var _bintray;

function _load_bintray() {
    return _bintray = __webpack_require__(26);
}

var _main;

function _load_main() {
    return _main = __webpack_require__(2);
}

class BintrayProvider extends (_main || _load_main()).Provider {
    setRequestHeaders(value) {
        super.setRequestHeaders(value);
        this.client.setRequestHeaders(value);
    }
    constructor(configuration, httpExecutor) {
        super(httpExecutor);
        this.client = new (_bintray || _load_bintray()).BintrayClient(configuration, httpExecutor, new (_builderUtilRuntime || _load_builderUtilRuntime()).CancellationToken());
    }
    getLatestVersion() {
        var _this = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            try {
                const data = yield _this.client.getVersion("_latest");
                return {
                    version: data.name
                };
            } catch (e) {
                if ("response" in e && e.response.statusCode === 404) {
                    throw new Error(`No latest version, please ensure that user, package and repository correctly configured. Or at least one version is published. ${e.stack || e.message}`);
                }
                throw e;
            }
        })();
    }
    getUpdateFile(versionInfo) {
        var _this2 = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            try {
                const files = yield _this2.client.getVersionFiles(versionInfo.version);
                const suffix = `${versionInfo.version}.exe`;
                const file = files.find(function (it) {
                    return it.name.endsWith(suffix) && it.name.indexOf("Setup") !== -1;
                }) || files.find(function (it) {
                    return it.name.endsWith(suffix);
                }) || files.find(function (it) {
                    return it.name.endsWith(".exe");
                });
                if (file == null) {
                    //noinspection ExceptionCaughtLocallyJS
                    throw new Error(`Cannot find suitable file for version ${versionInfo.version} in: ${JSON.stringify(files, null, 2)}`);
                }
                return {
                    name: file.name,
                    url: `https://dl.bintray.com/${_this2.client.owner}/${_this2.client.repo}/${file.name}`,
                    sha2: file.sha256
                };
            } catch (e) {
                if (e instanceof (_builderUtilRuntime || _load_builderUtilRuntime()).HttpError && e.response.statusCode === 404) {
                    throw new Error(`No latest version, please ensure that user, package and repository correctly configured. Or at least one version is published. ${e.stack || e.message}`);
                }
                throw e;
            }
        })();
    }
}
exports.BintrayProvider = BintrayProvider; //# sourceMappingURL=BintrayProvider.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("builder-util-runtime/out/bintray");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GenericProvider = undefined;

var _bluebirdLst;

function _load_bluebirdLst() {
    return _bluebirdLst = __webpack_require__(0);
}

var _builderUtilRuntime;

function _load_builderUtilRuntime() {
    return _builderUtilRuntime = __webpack_require__(1);
}

var _jsYaml;

function _load_jsYaml() {
    return _jsYaml = __webpack_require__(5);
}

var _path = _interopRequireWildcard(__webpack_require__(3));

var _main;

function _load_main() {
    return _main = __webpack_require__(2);
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class GenericProvider extends (_main || _load_main()).Provider {
    constructor(configuration, executor) {
        super(executor);
        this.configuration = configuration;
        this.baseUrl = (0, (_main || _load_main()).newBaseUrl)(this.configuration.url);
        this.channel = this.configuration.channel ? (0, (_main || _load_main()).getCustomChannelName)(this.configuration.channel) : (0, (_main || _load_main()).getDefaultChannelName)();
    }
    getLatestVersion() {
        var _this = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            let result;
            const channelFile = (0, (_main || _load_main()).getChannelFilename)(_this.channel);
            const channelUrl = (0, (_main || _load_main()).newUrlFromBase)(channelFile, _this.baseUrl);
            try {
                const options = {
                    hostname: channelUrl.hostname,
                    path: `${channelUrl.pathname}${channelUrl.search}`,
                    protocol: channelUrl.protocol,
                    headers: _this.requestHeaders || undefined
                };
                if (channelUrl.port != null) {
                    options.port = channelUrl.port;
                }
                result = (0, (_jsYaml || _load_jsYaml()).safeLoad)((yield _this.executor.request(options)));
            } catch (e) {
                if (e instanceof (_builderUtilRuntime || _load_builderUtilRuntime()).HttpError && e.response.statusCode === 404) {
                    throw new Error(`Cannot find channel "${channelFile}" update info: ${e.stack || e.message}`);
                }
                throw e;
            }
            (_main || _load_main()).Provider.validateUpdateInfo(result);
            if ((0, (_main || _load_main()).isUseOldMacProvider)()) {
                result.releaseJsonUrl = channelUrl.href;
            }
            return result;
        })();
    }
    getUpdateFile(versionInfo) {
        var _this2 = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            if ((0, (_main || _load_main()).isUseOldMacProvider)()) {
                return versionInfo;
            }
            const filePath = versionInfo.path;
            const result = {
                name: _path.posix.basename(filePath),
                url: (0, (_main || _load_main()).newUrlFromBase)(filePath, _this2.baseUrl).href,
                sha512: versionInfo.sha512
            };
            const packages = versionInfo.packages;
            const packageInfo = packages == null ? null : packages[process.arch] || packages.ia32;
            if (packageInfo != null) {
                result.packageInfo = Object.assign({}, packageInfo, {
                    // .file - backward compatibility
                    path: (0, (_main || _load_main()).newUrlFromBase)(packageInfo.path || packageInfo.file, _this2.baseUrl).href });
            }
            return result;
        })();
    }
}
exports.GenericProvider = GenericProvider; //# sourceMappingURL=GenericProvider.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PrivateGitHubProvider = undefined;

var _bluebirdLst;

function _load_bluebirdLst() {
    return _bluebirdLst = __webpack_require__(0);
}

var _builderUtilRuntime;

function _load_builderUtilRuntime() {
    return _builderUtilRuntime = __webpack_require__(1);
}

var _electron;

function _load_electron() {
    return _electron = __webpack_require__(4);
}

var _jsYaml;

function _load_jsYaml() {
    return _jsYaml = __webpack_require__(5);
}

var _path = _interopRequireWildcard(__webpack_require__(3));

var _url;

function _load_url() {
    return _url = __webpack_require__(8);
}

var _electronHttpExecutor;

function _load_electronHttpExecutor() {
    return _electronHttpExecutor = __webpack_require__(9);
}

var _GitHubProvider;

function _load_GitHubProvider() {
    return _GitHubProvider = __webpack_require__(15);
}

var _main;

function _load_main() {
    return _main = __webpack_require__(2);
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class PrivateGitHubProvider extends (_GitHubProvider || _load_GitHubProvider()).BaseGitHubProvider {
    constructor(options, token, executor) {
        super(options, "api.github.com", executor);
        this.token = token;
        this.netSession = (_electron || _load_electron()).session.fromPartition((_electronHttpExecutor || _load_electronHttpExecutor()).NET_SESSION_NAME);
        this.registerHeaderRemovalListener();
    }
    createRequestOptions(url, headers) {
        const result = super.createRequestOptions(url, headers);
        result.session = this.netSession;
        return result;
    }
    getLatestVersion() {
        var _this = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            const basePath = _this.basePath;
            const cancellationToken = new (_builderUtilRuntime || _load_builderUtilRuntime()).CancellationToken();
            const channelFile = (0, (_main || _load_main()).getChannelFilename)((0, (_main || _load_main()).getDefaultChannelName)());
            const releaseInfo = yield _this.getLatestVersionInfo(basePath, cancellationToken);
            const asset = releaseInfo.assets.find(function (it) {
                return it.name === channelFile;
            });
            if (asset == null) {
                // html_url must be always, but just to be sure
                throw new Error(`Cannot find ${channelFile} in the release ${releaseInfo.html_url || releaseInfo.name}`);
            }
            const url = new (_url || _load_url()).URL(asset.url);
            let result;
            try {
                result = (0, (_jsYaml || _load_jsYaml()).safeLoad)((yield _this.httpRequest(url, _this.configureHeaders("application/octet-stream"), cancellationToken)));
            } catch (e) {
                if (e instanceof (_builderUtilRuntime || _load_builderUtilRuntime()).HttpError && e.response.statusCode === 404) {
                    throw new Error(`Cannot find ${channelFile} in the latest release artifacts (${url}): ${e.stack || e.message}`);
                }
                throw e;
            }
            (_main || _load_main()).Provider.validateUpdateInfo(result);
            result.assets = releaseInfo.assets;
            return result;
        })();
    }
    registerHeaderRemovalListener() {
        const filter = {
            urls: ["*://*.amazonaws.com/*"]
        };
        this.netSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
            if (details.requestHeaders.Authorization != null) {
                delete details.requestHeaders.Authorization;
            }
            callback({ cancel: false, requestHeaders: details.requestHeaders });
        });
    }
    configureHeaders(accept) {
        return {
            Accept: accept,
            Authorization: `token ${this.token}`
        };
    }
    getLatestVersionInfo(basePath, cancellationToken) {
        var _this2 = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            const url = (0, (_main || _load_main()).newUrlFromBase)(`${basePath}/latest`, _this2.baseUrl);
            try {
                return JSON.parse((yield _this2.httpRequest(url, _this2.configureHeaders("application/vnd.github.v3+json"), cancellationToken)));
            } catch (e) {
                throw new Error(`Unable to find latest version on GitHub (${url}), please ensure a production release exists: ${e.stack || e.message}`);
            }
        })();
    }
    get basePath() {
        return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
    }
    getUpdateFile(versionInfo) {
        var _this3 = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            const name = versionInfo.githubArtifactName || _path.posix.basename(versionInfo.path).replace(/ /g, "-");
            // noinspection JSDeprecatedSymbols
            return {
                name,
                url: versionInfo.assets.find(function (it) {
                    return it.name === name;
                }).url,
                sha512: versionInfo.sha512,
                headers: _this3.configureHeaders("application/octet-stream"),
                session: _this3.netSession
            };
        })();
    }
}
exports.PrivateGitHubProvider = PrivateGitHubProvider; //# sourceMappingURL=PrivateGitHubProvider.js.map

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Provider = undefined;

var _builderUtilRuntime;

function _load_builderUtilRuntime() {
    return _builderUtilRuntime = __webpack_require__(1);
}

var _main;

function _load_main() {
    return _main = __webpack_require__(2);
}

class Provider {
    constructor(executor) {
        this.executor = executor;
    }
    setRequestHeaders(value) {
        this.requestHeaders = value;
    }
    static validateUpdateInfo(info) {
        if ((0, (_main || _load_main()).isUseOldMacProvider)()) {
            if (info.url == null) {
                throw new Error("Update info doesn't contain url");
            }
            return;
        }
        // noinspection JSDeprecatedSymbols
        if (info.sha2 == null && info.sha512 == null) {
            throw new Error(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, (_builderUtilRuntime || _load_builderUtilRuntime()).safeStringifyJson)(info)}`);
        }
        if (info.path == null) {
            throw new Error(`Update info doesn't contain file path: ${(0, (_builderUtilRuntime || _load_builderUtilRuntime()).safeStringifyJson)(info)}`);
        }
    }
    httpRequest(url, headers, cancellationToken) {
        return this.executor.request(this.createRequestOptions(url, headers), cancellationToken);
    }
    createRequestOptions(url, headers) {
        const result = {};
        if (this.requestHeaders == null) {
            if (headers != null) {
                result.headers = headers;
            }
        } else {
            result.headers = headers == null ? this.requestHeaders : Object.assign({}, this.requestHeaders, headers);
        }
        result.protocol = url.protocol;
        result.hostname = url.hostname;
        if (url.port) {
            result.port = url.port;
        }
        result.path = url.pathname + url.search;
        return result;
    }
}
exports.Provider = Provider; //# sourceMappingURL=Provider.js.map

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NsisUpdater = undefined;

var _bluebirdLst;

function _load_bluebirdLst() {
    return _bluebirdLst = __webpack_require__(0);
}

var _blockMapApi;

function _load_blockMapApi() {
    return _blockMapApi = __webpack_require__(12);
}

var _child_process;

function _load_child_process() {
    return _child_process = __webpack_require__(7);
}

var _path = _interopRequireWildcard(__webpack_require__(3));

__webpack_require__(11);

var _differentialPackage;

function _load_differentialPackage() {
    return _differentialPackage = __webpack_require__(16);
}

var _main;

function _load_main() {
    return _main = __webpack_require__(2);
}

var _windowsExecutableCodeSignatureVerifier;

function _load_windowsExecutableCodeSignatureVerifier() {
    return _windowsExecutableCodeSignatureVerifier = __webpack_require__(32);
}

var _BaseUpdater;

function _load_BaseUpdater() {
    return _BaseUpdater = __webpack_require__(17);
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class NsisUpdater extends (_BaseUpdater || _load_BaseUpdater()).BaseUpdater {
    constructor(options, app) {
        super(options, app);
    }
    /*** @private */
    doDownloadUpdate(versionInfo, fileInfo, cancellationToken) {
        var _this = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            const downloadOptions = {
                skipDirCreation: true,
                headers: _this.computeRequestHeaders(fileInfo),
                cancellationToken,
                sha512: fileInfo == null ? null : fileInfo.sha512
            };
            let packagePath = _this.downloadedUpdateHelper.packagePath;
            let installerPath = _this.downloadedUpdateHelper.getDownloadedFile(versionInfo, fileInfo);
            if (installerPath != null) {
                return packagePath == null ? [installerPath] : [installerPath, packagePath];
            }
            yield _this.executeDownload(downloadOptions, fileInfo, (() => {
                var _ref = (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* (tempDir, destinationFile, removeTempDirIfAny) {
                    installerPath = destinationFile;
                    let signatureVerificationStatus;
                    yield _this.httpExecutor.download(fileInfo.url, installerPath, downloadOptions);
                    signatureVerificationStatus = yield _this.verifySignature(installerPath);
                    const packageInfo = fileInfo.packageInfo;
                    if (packageInfo != null) {
                        packagePath = _path.join(tempDir, `${fileInfo.name}-package${_path.extname(packageInfo.path) || ".7z"}`);
                        let isDownloadFull = packageInfo.blockMapSize == null || packageInfo.headerSize == null;
                        if (!isDownloadFull) {
                            try {
                                yield new (_differentialPackage || _load_differentialPackage()).SevenZipDifferentialDownloader(packageInfo, _this.httpExecutor, {
                                    newUrl: packageInfo.path,
                                    oldPackageFile: _path.join(process.resourcesPath, "..", "package.7z"),
                                    logger: _this._logger,
                                    newFile: packagePath,
                                    requestHeaders: _this.requestHeaders
                                }).downloadNsisPackage(_path.join(process.resourcesPath, "..", (_blockMapApi || _load_blockMapApi()).BLOCK_MAP_FILE_NAME));
                            } catch (e) {
                                _this._logger.error(`Cannot download differentially, fallback to full download: ${e.stack || e}`);
                                // during test (developer machine mac or linux) we must throw error
                                isDownloadFull = process.platform === "win32";
                            }
                        }
                        if (isDownloadFull) {
                            yield _this.httpExecutor.download(packageInfo.path, packagePath, {
                                skipDirCreation: true,
                                headers: _this.computeRequestHeaders(fileInfo),
                                cancellationToken,
                                sha512: packageInfo.sha512
                            });
                        }
                    }
                    if (signatureVerificationStatus != null) {
                        yield removeTempDirIfAny();
                        // noinspection ThrowInsideFinallyBlockJS
                        throw new Error(`New version ${_this.versionInfo.version} is not signed by the application owner: ${signatureVerificationStatus}`);
                    }
                });

                return function (_x, _x2, _x3) {
                    return _ref.apply(this, arguments);
                };
            })());
            _this.downloadedUpdateHelper.setDownloadedFile(installerPath, packagePath, versionInfo, fileInfo);
            _this.addQuitHandler();
            _this.emit((_main || _load_main()).UPDATE_DOWNLOADED, _this.versionInfo);
            return packagePath == null ? [installerPath] : [installerPath, packagePath];
        })();
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    verifySignature(tempUpdateFile) {
        var _this2 = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            let publisherName;
            try {
                publisherName = (yield _this2.configOnDisk.value).publisherName;
                if (publisherName == null) {
                    return null;
                }
            } catch (e) {
                if (e.code === "ENOENT") {
                    // no app-update.yml
                    return null;
                }
                throw e;
            }
            return yield (0, (_windowsExecutableCodeSignatureVerifier || _load_windowsExecutableCodeSignatureVerifier()).verifySignature)(Array.isArray(publisherName) ? publisherName : [publisherName], tempUpdateFile, _this2._logger);
        })();
    }
    doInstall(installerPath, isSilent, isForceRunAfter) {
        const args = ["--updated"];
        if (isSilent) {
            args.push("/S");
        }
        if (isForceRunAfter) {
            args.push("--force-run");
        }
        const packagePath = this.downloadedUpdateHelper.packagePath;
        if (packagePath != null) {
            // only = form is supported
            args.push(`--package-file=${packagePath}`);
        }
        const spawnOptions = {
            detached: true,
            stdio: "ignore"
        };
        try {
            (0, (_child_process || _load_child_process()).spawn)(installerPath, args, spawnOptions).unref();
        } catch (e) {
            // yes, such errors dispatched not as error event
            // https://github.com/electron-userland/electron-builder/issues/1129
            if (e.code === "UNKNOWN" || e.code === "EACCES") {
                this._logger.info("Access denied or UNKNOWN error code on spawn, will be executed again using elevate");
                try {
                    (0, (_child_process || _load_child_process()).spawn)(_path.join(process.resourcesPath, "elevate.exe"), [installerPath].concat(args), spawnOptions).unref();
                } catch (e) {
                    this.dispatchError(e);
                }
            } else {
                this.dispatchError(e);
            }
        }
        return true;
    }
}
exports.NsisUpdater = NsisUpdater; //# sourceMappingURL=NsisUpdater.js.map

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verifySignature = verifySignature;

var _bluebirdLst;

function _load_bluebirdLst() {
    return _bluebirdLst = _interopRequireDefault(__webpack_require__(0));
}

var _builderUtilRuntime;

function _load_builderUtilRuntime() {
    return _builderUtilRuntime = __webpack_require__(1);
}

var _child_process;

function _load_child_process() {
    return _child_process = __webpack_require__(7);
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
// | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
// | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
function verifySignature(publisherNames, tempUpdateFile, logger) {
    return new (_bluebirdLst || _load_bluebirdLst()).default((resolve, reject) => {
        (0, (_child_process || _load_child_process()).execFile)("powershell.exe", [`Get-AuthenticodeSignature '${tempUpdateFile}' | ConvertTo-Json -Compress`], {
            timeout: 60 * 1000
        }, (error, stdout, stderr) => {
            if (error != null || stderr) {
                try {
                    (0, (_child_process || _load_child_process()).execFileSync)("powershell.exe", ["ConvertTo-Json test"], { timeout: 10 * 1000 });
                } catch (testError) {
                    logger.warn(`Cannot execute ConvertTo-Json: ${testError.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
                    resolve(null);
                    return;
                }
                if (error != null) {
                    reject(error);
                    return;
                }
                if (stderr) {
                    reject(new Error(`Cannot execute Get-AuthenticodeSignature: ${stderr}`));
                    return;
                }
            }
            const data = JSON.parse(stdout);
            delete data.PrivateKey;
            delete data.IsOSBinary;
            delete data.SignatureType;
            const signerCertificate = data.SignerCertificate;
            if (signerCertificate != null) {
                delete signerCertificate.Archived;
                delete signerCertificate.Extensions;
                delete signerCertificate.Handle;
                delete signerCertificate.HasPrivateKey;
                // duplicates data.SignerCertificate (contains RawData)
                delete signerCertificate.SubjectName;
            }
            delete data.Path;
            if (data.Status === 0) {
                const name = (0, (_builderUtilRuntime || _load_builderUtilRuntime()).parseDn)(data.SignerCertificate.Subject).get("CN");
                if (publisherNames.indexOf(name) !== -1) {
                    resolve(null);
                    return;
                }
            }
            const result = `publisherNames: ${publisherNames.join(" | ")}, raw info: ` + JSON.stringify(data, (name, value) => name === "RawData" ? undefined : value, 2);
            logger.info(`Sign verification failed, installer signed with incorrect certificate: ${result}`);
            resolve(result);
        });
    });
}
//# sourceMappingURL=windowsExecutableCodeSignatureVerifier.js.map

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DownloadedUpdateHelper = undefined;

var _lodash;

function _load_lodash() {
    return _lodash = _interopRequireDefault(__webpack_require__(34));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @private **/
class DownloadedUpdateHelper {
    get file() {
        return this.setupPath;
    }
    get packagePath() {
        return this._packagePath;
    }
    getDownloadedFile(versionInfo, fileInfo) {
        if (this.setupPath == null) {
            return null;
        }
        return (0, (_lodash || _load_lodash()).default)(this.versionInfo, versionInfo) && (0, (_lodash || _load_lodash()).default)(this.fileInfo, fileInfo) ? this.setupPath : null;
    }
    setDownloadedFile(file, packagePath, versionInfo, fileInfo) {
        this.setupPath = file;
        this._packagePath = packagePath;
        this.versionInfo = versionInfo;
        this.fileInfo = fileInfo;
    }
    clear() {
        this.setupPath = null;
        this._packagePath = null;
        this.versionInfo = null;
        this.fileInfo = null;
    }
}
exports.DownloadedUpdateHelper = DownloadedUpdateHelper; //# sourceMappingURL=DownloadedUpdateHelper.js.map

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)(module)))

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MacUpdater = undefined;

var _bluebirdLst;

function _load_bluebirdLst() {
    return _bluebirdLst = _interopRequireDefault(__webpack_require__(0));
}

var _builderUtilRuntime;

function _load_builderUtilRuntime() {
    return _builderUtilRuntime = __webpack_require__(1);
}

var _http;

function _load_http() {
    return _http = __webpack_require__(38);
}

var _AppUpdater;

function _load_AppUpdater() {
    return _AppUpdater = __webpack_require__(10);
}

var _main;

function _load_main() {
    return _main = __webpack_require__(2);
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MacUpdater extends (_AppUpdater || _load_AppUpdater()).AppUpdater {
    constructor(options) {
        super(options);
        this.nativeUpdater = __webpack_require__(4).autoUpdater;
        this.nativeUpdater.on("error", it => {
            this._logger.warn(it);
            this.emit("error", it);
        });
        this.nativeUpdater.on("update-downloaded", () => {
            this._logger.info(`New version ${this.versionInfo.version} has been downloaded`);
            this.emit((_main || _load_main()).UPDATE_DOWNLOADED, this.versionInfo);
        });
    }
    doDownloadUpdate(versionInfo, fileInfo, cancellationToken) {
        const server = (0, (_http || _load_http()).createServer)();
        server.on("close", () => {
            this._logger.info(`Proxy server for native Squirrel.Mac is closed (was started to download ${fileInfo.url})`);
        });
        function getServerUrl() {
            const address = server.address();
            return `http://${address.address}:${address.port}`;
        }
        return new (_bluebirdLst || _load_bluebirdLst()).default((resolve, reject) => {
            server.on("request", (request, response) => {
                const requestUrl = request.url;
                this._logger.info(`${requestUrl} requested`);
                if (requestUrl === "/") {
                    const data = Buffer.from(`{ "url": "${getServerUrl()}/app.zip" }`);
                    response.writeHead(200, { "Content-Type": "application/json", "Content-Length": data.length });
                    response.end(data);
                } else if (requestUrl.startsWith("/app.zip")) {
                    let errorOccurred = false;
                    response.on("finish", () => {
                        try {
                            setImmediate(() => server.close());
                        } finally {
                            if (!errorOccurred) {
                                this.nativeUpdater.removeListener("error", reject);
                                resolve([]);
                            }
                        }
                    });
                    this.proxyUpdateFile(response, fileInfo, cancellationToken, error => {
                        errorOccurred = true;
                        try {
                            response.writeHead(500);
                            response.end();
                        } finally {
                            this.nativeUpdater.removeListener("error", reject);
                            reject(new Error(`Cannot download "${fileInfo.url}": ${error}`));
                        }
                    });
                } else {
                    this._logger.warn(`${requestUrl} requested, but not supported`);
                    response.writeHead(404);
                    response.end();
                }
            });
            server.listen(0, "127.0.0.1", 16, () => {
                this.nativeUpdater.setFeedURL(`${getServerUrl()}`, { "Cache-Control": "no-cache" });
                this.nativeUpdater.once("error", reject);
                this.nativeUpdater.checkForUpdates();
            });
        });
    }
    proxyUpdateFile(nativeResponse, fileInfo, cancellationToken, errorHandler) {
        this.doProxyUpdateFile(nativeResponse, fileInfo.url, this.computeRequestHeaders(fileInfo), fileInfo.sha512 || null, cancellationToken, errorHandler);
    }
    doProxyUpdateFile(nativeResponse, url, headers, sha512, cancellationToken, errorHandler) {
        const downloadRequest = this.httpExecutor.doRequest((0, (_builderUtilRuntime || _load_builderUtilRuntime()).configureRequestOptionsFromUrl)(url, { headers }), downloadResponse => {
            if (downloadResponse.statusCode >= 400) {
                try {
                    nativeResponse.writeHead(404);
                    nativeResponse.end();
                } finally {
                    errorHandler(new Error(`Cannot download "${url}", status ${downloadResponse.statusCode}: ${downloadResponse.statusMessage}`));
                }
                return;
            }
            // in tests Electron NET Api is not used, so, we have to handle redirect.
            const redirectUrl = (0, (_builderUtilRuntime || _load_builderUtilRuntime()).safeGetHeader)(downloadResponse, "location");
            if (redirectUrl != null) {
                this.doProxyUpdateFile(nativeResponse, redirectUrl, headers, sha512, cancellationToken, errorHandler);
                return;
            }
            const nativeHeaders = { "Content-Type": "application/zip" };
            const streams = [];
            const downloadListenerCount = this.listenerCount((_main || _load_main()).DOWNLOAD_PROGRESS);
            this._logger.info(`${(_main || _load_main()).DOWNLOAD_PROGRESS} listener count: ${downloadListenerCount}`);
            if (downloadListenerCount > 0) {
                const contentLength = (0, (_builderUtilRuntime || _load_builderUtilRuntime()).safeGetHeader)(downloadResponse, "content-length");
                this._logger.info(`contentLength: ${contentLength}`);
                if (contentLength != null) {
                    nativeHeaders["Content-Length"] = contentLength;
                    streams.push(new (_builderUtilRuntime || _load_builderUtilRuntime()).ProgressCallbackTransform(parseInt(contentLength, 10), cancellationToken, it => this.emit((_main || _load_main()).DOWNLOAD_PROGRESS, it)));
                }
            }
            nativeResponse.writeHead(200, nativeHeaders);
            // for mac only sha512 is produced (sha256 is published for windows only to preserve backward compatibility)
            if (sha512 != null) {
                // "hex" to easy migrate to new base64 encoded hash (we already produces latest-mac.yml with hex encoded hash)
                streams.push(new (_builderUtilRuntime || _load_builderUtilRuntime()).DigestTransform(sha512, "sha512", sha512.length === 128 && !(sha512.indexOf("+") !== -1) && !(sha512.indexOf("Z") !== -1) && !(sha512.indexOf("=") !== -1) ? "hex" : "base64"));
            }
            streams.push(nativeResponse);
            let lastStream = downloadResponse;
            for (const stream of streams) {
                stream.on("error", errorHandler);
                lastStream = lastStream.pipe(stream);
            }
        });
        downloadRequest.on("error", errorHandler);
        downloadRequest.end();
    }
    quitAndInstall() {
        this.nativeUpdater.quitAndInstall();
    }
}
exports.MacUpdater = MacUpdater; //# sourceMappingURL=MacUpdater.js.map

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AppImageUpdater = undefined;

var _bluebirdLst;

function _load_bluebirdLst() {
    return _bluebirdLst = __webpack_require__(0);
}

var _bluebirdLst2;

function _load_bluebirdLst2() {
    return _bluebirdLst2 = _interopRequireDefault(__webpack_require__(0));
}

var _child_process;

function _load_child_process() {
    return _child_process = __webpack_require__(7);
}

__webpack_require__(11);

var _differentialPackage;

function _load_differentialPackage() {
    return _differentialPackage = __webpack_require__(16);
}

var _main;

function _load_main() {
    return _main = __webpack_require__(2);
}

var _BaseUpdater;

function _load_BaseUpdater() {
    return _BaseUpdater = __webpack_require__(17);
}

var _blockMapApi;

function _load_blockMapApi() {
    return _blockMapApi = __webpack_require__(12);
}

var _jsYaml;

function _load_jsYaml() {
    return _jsYaml = __webpack_require__(5);
}

var _fsExtraP;

function _load_fsExtraP() {
    return _fsExtraP = __webpack_require__(6);
}

var _path = _interopRequireWildcard(__webpack_require__(3));

var _electronIsDev;

function _load_electronIsDev() {
    return _electronIsDev = _interopRequireDefault(__webpack_require__(13));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppImageUpdater extends (_BaseUpdater || _load_BaseUpdater()).BaseUpdater {
    constructor(options, app) {
        super(options, app);
    }
    checkForUpdatesAndNotify() {
        if ((_electronIsDev || _load_electronIsDev()).default) {
            return (_bluebirdLst2 || _load_bluebirdLst2()).default.resolve(null);
        }
        if (process.env.APPIMAGE == null) {
            this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage");
            return (_bluebirdLst2 || _load_bluebirdLst2()).default.resolve(null);
        }
        return super.checkForUpdatesAndNotify();
    }
    /*** @private */
    doDownloadUpdate(versionInfo, fileInfo, cancellationToken) {
        var _this = this;

        return (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* () {
            const downloadOptions = {
                skipDirCreation: true,
                headers: _this.computeRequestHeaders(fileInfo),
                cancellationToken,
                sha512: fileInfo == null ? null : fileInfo.sha512
            };
            let installerPath = _this.downloadedUpdateHelper.getDownloadedFile(versionInfo, fileInfo);
            if (installerPath != null) {
                return [installerPath];
            }
            yield _this.executeDownload(downloadOptions, fileInfo, (() => {
                var _ref = (0, (_bluebirdLst || _load_bluebirdLst()).coroutine)(function* (tempDir, destinationFile) {
                    installerPath = destinationFile;
                    const oldFile = process.env.APPIMAGE;
                    if (oldFile == null) {
                        throw new Error("APPIMAGE env is not defined");
                    }
                    let isDownloadFull = false;
                    try {
                        yield new (_differentialPackage || _load_differentialPackage()).DifferentialDownloader(versionInfo, _this.httpExecutor, {
                            newUrl: fileInfo.url,
                            oldPackageFile: oldFile,
                            logger: _this._logger,
                            newFile: installerPath,
                            requestHeaders: _this.requestHeaders
                        }).downloadAppImage((0, (_jsYaml || _load_jsYaml()).safeLoad)((yield (0, (_blockMapApi || _load_blockMapApi()).readBlockMapDataFromAppImage)(oldFile))));
                    } catch (e) {
                        _this._logger.error(`Cannot download differentially, fallback to full download: ${e.stack || e}`);
                        // during test (developer machine mac) we must throw error
                        isDownloadFull = process.platform === "linux";
                    }
                    if (isDownloadFull) {
                        yield _this.httpExecutor.download(fileInfo.url, installerPath, downloadOptions);
                    }
                });

                return function (_x, _x2) {
                    return _ref.apply(this, arguments);
                };
            })());
            _this.downloadedUpdateHelper.setDownloadedFile(installerPath, null, versionInfo, fileInfo);
            _this.addQuitHandler();
            _this.emit((_main || _load_main()).UPDATE_DOWNLOADED, _this.versionInfo);
            return [installerPath];
        })();
    }
    doInstall(installerPath, isSilent, isForceRunAfter) {
        const args = [""];
        if (isForceRunAfter) {
            args.push("--force-run");
        }
        const appImageFile = process.env.APPIMAGE;
        if (appImageFile == null) {
            throw new Error("APPIMAGE env is not defined");
        }
        const spawnOptions = {
            detached: true,
            stdio: "ignore",
            env: {
                APPIMAGE_SILENT_INSTALL: "true"
            }
        };
        if (!isForceRunAfter) {
            spawnOptions.env.APPIMAGE_EXIT_AFTER_INSTALL = "true";
        }
        let destination;
        if (_path.basename(installerPath) === _path.basename(appImageFile)) {
            // no version in the file name, overwrite existing
            destination = appImageFile;
        } else {
            destination = _path.join(_path.dirname(appImageFile), _path.basename(installerPath));
            spawnOptions.env.APPIMAGE_DELETE_OLD_FILE = appImageFile;
        }
        (0, (_fsExtraP || _load_fsExtraP()).move)(installerPath, destination, { overwrite: true }).then(() => (0, (_fsExtraP || _load_fsExtraP()).chmod)(destination, "0755")).then(() => {
            try {
                (0, (_child_process || _load_child_process()).spawn)(installerPath, args, spawnOptions).unref();
            } catch (e) {
                this.dispatchError(e);
            }
        }).catch(e => this.dispatchError(e));
        return true;
    }
}
exports.AppImageUpdater = AppImageUpdater; //# sourceMappingURL=AppImageUpdater.js.map

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("ms");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("electron-reload");

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(4),
    app = _require.app;

var menuTemplate = [{
    label: app.getName(),
    submenu: [{ role: 'about' }, { type: 'separator' }, { role: 'services', submenu: [] }, { type: 'separator' }, { role: 'hide' }, { role: 'hideothers' }, { role: 'unhide' }, { type: 'separator' }, { role: 'quit' }]
}];

module.exports = menuTemplate;

/***/ })
/******/ ]);