// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/config/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
var config = {
  // Metrics
  isResourceTiming: false,
  isElementTiming: false,
  // Logging
  maxTime: 15000
};
exports.config = config;
},{}],"../src/data/constants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHC = exports.getDM = exports.WP = exports.WN = exports.D = exports.C = exports.W = void 0;
var W = window;
exports.W = W;
var C = W.console;
exports.C = C;
var D = document;
exports.D = D;
var WN = W.navigator;
exports.WN = WN;
var WP = W.performance;
exports.WP = WP;

var getDM = function getDM() {
  var _WN$deviceMemory;

  return (_WN$deviceMemory = WN.deviceMemory) !== null && _WN$deviceMemory !== void 0 ? _WN$deviceMemory : 0;
};

exports.getDM = getDM;

var getHC = function getHC() {
  var _WN$hardwareConcurren;

  return (_WN$hardwareConcurren = WN.hardwareConcurrency) !== null && _WN$hardwareConcurren !== void 0 ? _WN$hardwareConcurren : 0;
};

exports.getHC = getHC;
},{}],"../src/performance/observeInstances.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.perfObservers = void 0;

/**
 * @remarks 核心性能数据指标对象
 * @public
 */
var perfObservers = {};
exports.perfObservers = perfObservers;
},{}],"../src/data/metrics.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tbt = exports.rt = exports.fcpEntryName = exports.lcp = exports.fcp = exports.cls = exports.metrics = void 0;
var metrics = {};
exports.metrics = metrics;
var cls = {
  value: 0
};
exports.cls = cls;
var fcp = {
  value: 0
};
exports.fcp = fcp;
var lcp = {
  value: 0
};
exports.lcp = lcp;
var fcpEntryName = 'first-contentful-paint';
exports.fcpEntryName = fcpEntryName;
var rt = {
  value: {
    beacon: 0,
    css: 0,
    fetch: 0,
    img: 0,
    other: 0,
    script: 0,
    total: 0,
    xmlhttprequest: 0
  }
};
exports.rt = rt;
var tbt = {
  value: 0
};
exports.tbt = tbt;
},{}],"../src/performance/performanceObserver.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.poDisconnect = exports.po = void 0;

var _constants = require("../data/constants");

var _observeInstances = require("./observeInstances");

/**
 * PerformanceObserver 异步订阅封装
 */
var po = function po(eventType, cb) {
  try {
    var perfObserver = new PerformanceObserver(function (entryList) {
      cb(entryList.getEntries());
    }); // 订阅时间或者开始计时 buffered不立即执行在内存中留下PerformanceObserver实例

    perfObserver.observe({
      type: eventType,
      buffered: true
    });
    return perfObserver;
  } catch (e) {
    _constants.C.warn('Yideng.js:', e);
  }

  return null;
}; //断开测试通道


exports.po = po;

var poDisconnect = function poDisconnect(observer) {
  if (_observeInstances.perfObservers[observer]) {
    _observeInstances.perfObservers[observer].disconnect();
  }

  delete _observeInstances.perfObservers[observer];
};

exports.poDisconnect = poDisconnect;
},{"../data/constants":"../src/data/constants.ts","./observeInstances":"../src/performance/observeInstances.ts"}],"../src/performance/totalBlockingTime.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initTotalBlockingTime = void 0;

var _metrics = require("../data/metrics");

var initTotalBlockingTime = function initTotalBlockingTime(performanceEntries) {
  performanceEntries.forEach(function (entry) {
    //从fcp -> tti获取长耗时任务
    if (entry.name !== 'self' || entry.startTime < _metrics.fcp.value) {
      return;
    } //长耗时任务意味着执行时间超过50ms的


    var blockingTime = entry.duration - 50;

    if (blockingTime > 0) {
      _metrics.tbt.value += blockingTime;
    }
  });
};

exports.initTotalBlockingTime = initTotalBlockingTime;
},{"../data/metrics":"../src/data/metrics.ts"}],"../src/helpers/getNetworkInformation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNetworkInformation = exports.sd = exports.et = void 0;

var _constants = require("../data/constants");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var et = '4g';
exports.et = et;
var sd = false;
exports.sd = sd;

var getNetworkInformation = function getNetworkInformation() {
  if ('connection' in _constants.WN) {
    var dataConnection = _constants.WN.connection;

    if (_typeof(dataConnection) !== 'object') {
      return {};
    }

    exports.et = et = dataConnection.effectiveType;
    exports.sd = sd = !!dataConnection.saveData;
    return {
      downlink: dataConnection.downlink,
      effectiveType: dataConnection.effectiveType,
      rtt: dataConnection.rtt,
      saveData: !!dataConnection.saveData
    };
  }

  return {};
};

exports.getNetworkInformation = getNetworkInformation;
},{"../data/constants":"../src/data/constants.ts"}],"../src/helpers/isLowEnd.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIsLowEndExperience = exports.getIsLowEndDevice = void 0;

var _constants = require("../data/constants");

var getIsLowEndDevice = function getIsLowEndDevice() {
  // If number of logical processors available to run threads <= 4
  if ((0, _constants.getHC)() && (0, _constants.getHC)() <= 4) {
    return true;
  } // If the approximate amount of RAM client device has <= 4


  if ((0, _constants.getDM)() && (0, _constants.getDM)() <= 4) {
    return true;
  }

  return false;
};

exports.getIsLowEndDevice = getIsLowEndDevice;

var getIsLowEndExperience = function getIsLowEndExperience(et, sd) {
  // If the effective type of the connection meaning
  // one of 'slow-2g', '2g', '3g', or '4g' is !== 4g
  switch (et) {
    case 'slow-2g':
      return true;
      break;

    case '2g':
      return true;
      break;

    case '3g':
      return true;
      break;

    default:
      // Data Saver preference
      return getIsLowEndDevice() || sd;
  }
};

exports.getIsLowEndExperience = getIsLowEndExperience;
},{"../data/constants":"../src/data/constants.ts"}],"../src/helpers/getNavigatorInfo.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNavigatorInfo = void 0;

var _constants = require("../data/constants");

var _getNetworkInformation = require("./getNetworkInformation");

var _isLowEnd = require("./isLowEnd");

/**
 * Information coming from window.navigator:
 * 1. Device Memory
 * 2. Hardware Concurency
 * 3. Status of the service worker:
 *     - controlled: a service worker is controlling the page
 *     - supported: the browser supports service worker
 *     - unsupported: the user's browser does not support service worker
 */
var getNavigatorInfo = function getNavigatorInfo() {
  if (_constants.WN) {
    return {
      deviceMemory: (0, _constants.getDM)() || 0,
      hardwareConcurrency: (0, _constants.getHC)() || 0,
      serviceWorkerStatus: 'serviceWorker' in _constants.WN ? _constants.WN.serviceWorker.controller ? 'controlled' : 'supported' : 'unsupported',
      isLowEndDevice: (0, _isLowEnd.getIsLowEndDevice)(),
      isLowEndExperience: (0, _isLowEnd.getIsLowEndExperience)(_getNetworkInformation.et, _getNetworkInformation.sd)
    };
  }

  return {};
};

exports.getNavigatorInfo = getNavigatorInfo;
},{"../data/constants":"../src/data/constants.ts","./getNetworkInformation":"../src/helpers/getNetworkInformation.ts","./isLowEnd":"../src/helpers/isLowEnd.ts"}],"../src/helpers/onVisibilityChange.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.didVisibilityChange = exports.visibility = void 0;

var _constants = require("../data/constants");

var visibility = {
  isHidden: false
};
/**
 * From visibilitychange listener it saves only when
 * the page gets hidden, because it's important to not
 * use the wrong "hidden" value when send timing or logging.
 */

exports.visibility = visibility;

var didVisibilityChange = function didVisibilityChange(cb) {
  if (_constants.D.hidden) {
    cb();
    visibility.isHidden = _constants.D.hidden;
  }
};

exports.didVisibilityChange = didVisibilityChange;
},{"../data/constants":"../src/data/constants.ts"}],"../src/helpers/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushTask = exports.convertToKB = exports.roundByTwo = void 0;

var _constants = require("../data/constants");

var roundByTwo = function roundByTwo(num) {
  return parseFloat(num.toFixed(2));
};

exports.roundByTwo = roundByTwo;

var convertToKB = function convertToKB(bytes) {
  if (typeof bytes !== 'number') {
    return null;
  }

  return roundByTwo(bytes / Math.pow(1024, 2));
};
/**
 * PushTask to requestIdleCallback
 */


exports.convertToKB = convertToKB;

var pushTask = function pushTask(cb) {
  if ('requestIdleCallback' in _constants.W) {
    _constants.W.requestIdleCallback(cb, {
      timeout: 3000
    });
  } else {
    cb();
  }
};

exports.pushTask = pushTask;
},{"../data/constants":"../src/data/constants.ts"}],"../src/helpers/vitalsScore.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVitalsScore = exports.webVitalsScore = void 0;
var fcpScore = [1000, 2500];
var lcpScore = [2500, 4000];
var fidcore = [100, 300];
var clsScore = [0.1, 0.25];
var tbtScore = [300, 600];
var webVitalsScore = {
  fp: fcpScore,
  fcp: fcpScore,
  lcp: lcpScore,
  lcpFinal: lcpScore,
  fid: fidcore,
  fidVitals: fidcore,
  cls: clsScore,
  clsFinal: clsScore,
  tbt: tbtScore,
  tbt5S: tbtScore,
  tbt10S: tbtScore,
  tbtFinal: tbtScore
};
exports.webVitalsScore = webVitalsScore;

var getVitalsScore = function getVitalsScore(measureName, value) {
  if (!webVitalsScore[measureName]) {
    return null;
  }

  if (value <= webVitalsScore[measureName][0]) {
    return 'good';
  }

  return value <= webVitalsScore[measureName][1] ? 'needsImprovement' : 'poor';
};

exports.getVitalsScore = getVitalsScore;
},{}],"../src/data/reportPerf.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reportPerf = void 0;

var _config = require("../config");

var _getNavigatorInfo = require("../helpers/getNavigatorInfo");

var _onVisibilityChange = require("../helpers/onVisibilityChange");

var _utils = require("../helpers/utils");

var _vitalsScore = require("../helpers/vitalsScore");

/**
 * Sends the User timing measure to analyticsTracker
 */
var reportPerf = function reportPerf(measureName, data, customProperties) {
  (0, _utils.pushTask)(function () {
    // 当页面被隐藏的时候不报告具体数据
    if (_onVisibilityChange.visibility.isHidden && measureName.indexOf('Final') < 0 || !_config.config.analyticsTracker) {
      return;
    } // Send metric to custom Analytics service


    _config.config.analyticsTracker({
      metricName: measureName,
      data: data,
      eventProperties: customProperties || {},
      navigatorInformation: (0, _getNavigatorInfo.getNavigatorInfo)(),
      vitalsScore: (0, _vitalsScore.getVitalsScore)(measureName, data)
    });
  });
};

exports.reportPerf = reportPerf;
},{"../config":"../src/config/index.ts","../helpers/getNavigatorInfo":"../src/helpers/getNavigatorInfo.ts","../helpers/onVisibilityChange":"../src/helpers/onVisibilityChange.ts","../helpers/utils":"../src/helpers/utils.ts","../helpers/vitalsScore":"../src/helpers/vitalsScore.ts"}],"../src/data/log.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logMetric = exports.logData = void 0;

var _config = require("../config");

var _reportPerf = require("../data/reportPerf");

var _utils = require("../helpers/utils");

var logData = function logData(measureName, metric, customProperties) {
  Object.keys(metric).forEach(function (key) {
    if (typeof metric[key] === 'number') {
      metric[key] = (0, _utils.roundByTwo)(metric[key]);
    }
  }); // Sends the metric to an external tracking service

  (0, _reportPerf.reportPerf)(measureName, metric, customProperties);
};
/**
 * Dispatches the metric duration into internal logs
 * and the external time tracking service.
 */


exports.logData = logData;

var logMetric = function logMetric(duration, measureName, customProperties) {
  var duration2Decimal = (0, _utils.roundByTwo)(duration);

  if (duration2Decimal <= _config.config.maxTime && duration2Decimal >= 0) {
    // 从内部或者外部的报告工具报告指标数据
    (0, _reportPerf.reportPerf)(measureName, duration2Decimal, customProperties);
  }
};

exports.logMetric = logMetric;
},{"../config":"../src/config/index.ts","../data/reportPerf":"../src/data/reportPerf.ts","../helpers/utils":"../src/helpers/utils.ts"}],"../src/performance/paint.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initFirstPaint = void 0;

var _metrics = require("../data/metrics");

var _performanceObserver = require("./performanceObserver");

var _observeInstances = require("./observeInstances");

var _totalBlockingTime = require("./totalBlockingTime");

var _log = require("../data/log");

var initFirstPaint = function initFirstPaint(performanceEntries) {
  performanceEntries.forEach(function (entry) {
    if (entry.name === 'first-paint') {
      (0, _log.logMetric)(entry.startTime, 'fp');
    } else if (entry.name === _metrics.fcpEntryName) {
      _metrics.fcp.value = entry.startTime;
      (0, _log.logMetric)(_metrics.fcp.value, 'fcp');
      _observeInstances.perfObservers[4] = (0, _performanceObserver.po)('longtask', _totalBlockingTime.initTotalBlockingTime);
      (0, _performanceObserver.poDisconnect)(0);
    }
  });
};

exports.initFirstPaint = initFirstPaint;
},{"../data/metrics":"../src/data/metrics.ts","./performanceObserver":"../src/performance/performanceObserver.ts","./observeInstances":"../src/performance/observeInstances.ts","./totalBlockingTime":"../src/performance/totalBlockingTime.ts","../data/log":"../src/data/log.ts"}],"../src/performance/observe.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disconnectPerfObserversHidden = exports.initPerformanceObserver = void 0;

var _observeInstances = require("./observeInstances");

var _paint = require("./paint");

var _performanceObserver = require("./performanceObserver");

var initPerformanceObserver = function initPerformanceObserver() {
  console.log('⏰ 性能收集开始', Math.random());
  _observeInstances.perfObservers[0] = (0, _performanceObserver.po)('paint', _paint.initFirstPaint);
};

exports.initPerformanceObserver = initPerformanceObserver;

var disconnectPerfObserversHidden = function disconnectPerfObserversHidden() {};

exports.disconnectPerfObserversHidden = disconnectPerfObserversHidden;
},{"./observeInstances":"../src/performance/observeInstances.ts","./paint":"../src/performance/paint.ts","./performanceObserver":"../src/performance/performanceObserver.ts"}],"../src/tools/isSupported.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPerformanceSupported = void 0;

var _constants = require("../data/constants");

/**
 * True if the browser supports the Navigation Timing API,
 * User Timing API and the PerformanceObserver Interface.
 * In Safari, the User Timing API (performance.mark()) is not available,
 * so the DevTools timeline will not be annotated with marks.
 * Support: developer.mozilla.org/en-US/docs/Web/API/Performance/mark
 * Support: developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
 * Support: developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType
 */
var isPerformanceSupported = function isPerformanceSupported() {
  return _constants.WP && !!_constants.WP.getEntriesByType && !!_constants.WP.now && !!_constants.WP.mark;
};

exports.isPerformanceSupported = isPerformanceSupported;
},{"../data/constants":"../src/data/constants.ts"}],"../src/yideng.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = require("./config");

var _constants = require("./data/constants");

var _observe = require("./performance/observe");

var _isSupported = require("./tools/isSupported");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Yideng = function Yideng() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Yideng);

  this.v = '1.0.0'; // 扩展基础配置

  _config.config.analyticsTracker = options.analyticsTracker;
  _config.config.isResourceTiming = !!options.resourceTiming;
  _config.config.isElementTiming = !!options.elementTiming;
  _config.config.maxTime = options.maxMeasureTime || _config.config.maxTime;

  if (!(0, _isSupported.isPerformanceSupported)()) {
    return;
  }

  if ('PerformanceObserver' in _constants.W) {
    (0, _observe.initPerformanceObserver)();
  } // console.log('[ options ]', options);

};

exports.default = Yideng;
},{"./config":"../src/config/index.ts","./data/constants":"../src/data/constants.ts","./performance/observe":"../src/performance/observe.ts","./tools/isSupported":"../src/tools/isSupported.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var _yideng = _interopRequireDefault(require("../src/yideng"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var yideng = new _yideng.default({
  analyticsTracker: function analyticsTracker(options) {
    // const {
    //   metricName,
    //   eventProperties,
    //   data,
    //   navigatorInformation,
    //   vitalsScore,
    // } = options;
    console.log(options);
  }
});
console.log('🐻', yideng); // for (var i = 0; i < 1000000000; i++) {}
},{"../src/yideng":"../src/yideng.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55006" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/examples.77de5100.js.map