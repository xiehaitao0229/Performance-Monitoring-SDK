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
})({"../src/typings/types.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AskPriority = void 0;
//请求响应优先级
var AskPriority;
(function (AskPriority) {
  AskPriority[AskPriority["URGENT"] = 1] = "URGENT";
  AskPriority[AskPriority["IDLE"] = 2] = "IDLE";
})(AskPriority || (exports.AskPriority = AskPriority = {}));
},{}],"../src/data/constants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHC = exports.getDM = exports.WP = exports.WN = exports.W = exports.D = exports.C = void 0;
var W = exports.W = window;
var C = exports.C = W.console;
var D = exports.D = document;
var WN = exports.WN = W.navigator;
var WP = exports.WP = W.performance;
//内存
var getDM = exports.getDM = function getDM() {
  var _WN$deviceMemory;
  return (_WN$deviceMemory = WN.deviceMemory) !== null && _WN$deviceMemory !== void 0 ? _WN$deviceMemory : 0;
};
//cpu核数
var getHC = exports.getHC = function getHC() {
  var _WN$hardwareConcurren;
  return (_WN$hardwareConcurren = WN.hardwareConcurrency) !== null && _WN$hardwareConcurren !== void 0 ? _WN$hardwareConcurren : 0;
};
},{}],"../src/data/ReportData.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _types = require("../typings/types");
var _constants = require("./constants");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ReportData = /*#__PURE__*/function () {
  function ReportData(options) {
    _classCallCheck(this, ReportData);
    _defineProperty(this, "logUrl", void 0);
    // console.log('⏰', options);
    var logUrl = options.logUrl;
    if (logUrl) {
      this.logUrl = logUrl;
    } else {
      throw new Error('请传递要记录数据的路由~');
    }
  }
  return _createClass(ReportData, [{
    key: "sendToAnalytics",
    value: function sendToAnalytics(level, body, uri) {
      var logurl = this.logUrl;
      //临时更换其他url
      if (uri) {
        logurl = uri;
      }
      // console.log('路由', logurl);
      if (level == _types.AskPriority.URGENT) {
        if (!!_constants.W.fetch) {
          fetch(logurl, {
            body: body,
            method: 'POST',
            keepalive: true
          });
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('post', logurl, true);
          // 设置请求头
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(body); // 发送参数
          xhr.onload = function (e) {
            //   if (this.status == 200 || this.status == 304) {
            //     alert(this.responseText);
            //   }
            //及时清理以防多次创建
            xhr = null;
          };
        }
      } else if (level == _types.AskPriority.IDLE) {
        if (!!_constants.WN.sendBeacon) {
          navigator.sendBeacon(logurl, body);
        } else {
          var img = new Image();
          img.src = "".concat(logurl, "?body=").concat(body);
          img.onload = function () {
            //统计完成收回创建的元素防止内存泄露
            img = null;
          };
        }
      }
    }
  }]);
}();
var _default = exports.default = ReportData;
},{"../typings/types":"../src/typings/types.ts","./constants":"../src/data/constants.ts"}],"../src/config/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
var _ReportData = _interopRequireDefault(require("../data/ReportData"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var config = exports.config = {
  // Metrics
  reportData: new _ReportData.default({
    logUrl: 'hole'
  }),
  isResourceTiming: false,
  isElementTiming: false,
  // Logging
  maxTime: 15000
};
},{"../data/ReportData":"../src/data/ReportData.ts"}],"../src/helpers/getNetworkInformation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sd = exports.getNetworkInformation = exports.et = void 0;
var _constants = require("../data/constants");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var et = exports.et = '4g';
var sd = exports.sd = false;
var getNetworkInformation = exports.getNetworkInformation = function getNetworkInformation() {
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
  } else {
    //todo 这里我们使用多普勒测速法或者直接用图片探测法
  }
  return {};
};
},{"../data/constants":"../src/data/constants.ts"}],"../src/helpers/isLowEnd.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIsLowEndExperience = exports.getIsLowEndDevice = void 0;
var _constants = require("../data/constants");
var getIsLowEndDevice = exports.getIsLowEndDevice = function getIsLowEndDevice() {
  // If number of logical processors available to run threads <= 4
  if ((0, _constants.getHC)() && (0, _constants.getHC)() <= 4) {
    return true;
  }
  // If the approximate amount of RAM client device has <= 4
  if ((0, _constants.getDM)() && (0, _constants.getDM)() <= 4) {
    return true;
  }
  return false;
};
var getIsLowEndExperience = exports.getIsLowEndExperience = function getIsLowEndExperience(et, sd) {
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
 * 如下信息来源于 window.navigator:
 * 1. Device Memory
 * 2. Hardware Concurency
 * 3. Status of the service worker:
 *     - controlled: a service worker is controlling the page
 *     - supported: the browser supports service worker
 *     - unsupported: the user's browser does not support service worker
 */
var getNavigatorInfo = exports.getNavigatorInfo = function getNavigatorInfo() {
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
},{"../data/constants":"../src/data/constants.ts","./getNetworkInformation":"../src/helpers/getNetworkInformation.ts","./isLowEnd":"../src/helpers/isLowEnd.ts"}],"../src/helpers/onVisibilityChange.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visibility = exports.didVisibilityChange = void 0;
var _constants = require("../data/constants");
var visibility = exports.visibility = {
  isHidden: false
};
/**
 * From visibilitychange listener it saves only when
 * the page gets hidden, because it's important to not
 * use the wrong "hidden" value when send timing or logging.
 */
var didVisibilityChange = exports.didVisibilityChange = function didVisibilityChange(cb) {
  if (_constants.D.hidden) {
    cb();
    visibility.isHidden = _constants.D.hidden;
  }
};
},{"../data/constants":"../src/data/constants.ts"}],"../src/helpers/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roundByTwo = exports.pushTask = exports.convertToKB = void 0;
var _constants = require("../data/constants");
var roundByTwo = exports.roundByTwo = function roundByTwo(num) {
  return parseFloat(num.toFixed(2));
};
var convertToKB = exports.convertToKB = function convertToKB(bytes) {
  if (typeof bytes !== 'number') {
    return null;
  }
  return roundByTwo(bytes / Math.pow(1024, 2));
};
/**
 * PushTask to requestIdleCallback
 * 高效利用每一帧进行数据的收集
 */
var pushTask = exports.pushTask = function pushTask(cb) {
  if ('requestIdleCallback' in _constants.W) {
    _constants.W.requestIdleCallback(cb, {
      timeout: 3000
    });
  } else {
    cb();
  }
};
},{"../data/constants":"../src/data/constants.ts"}],"../src/helpers/vitalsScore.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webVitalsScore = exports.getVitalsScore = void 0;
//https://web.dev/vitals/
var fcpScore = [1000, 2500];
var lcpScore = [2500, 4000];
var fidcore = [100, 300];
var clsScore = [0.1, 0.25];
var tbtScore = [300, 600];
var webVitalsScore = exports.webVitalsScore = {
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
var getVitalsScore = exports.getVitalsScore = function getVitalsScore(measureName, value) {
  if (!webVitalsScore[measureName]) {
    return null;
  }
  if (value <= webVitalsScore[measureName][0]) {
    return 'good';
  }
  return value <= webVitalsScore[measureName][1] ? 'needsImprovement' : 'poor';
};
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
var reportPerf = exports.reportPerf = function reportPerf(measureName, data, customProperties) {
  (0, _utils.pushTask)(function () {
    //console.log('[ measureName ]', measureName);
    // 当页面被隐藏的时候不报告具体数据
    if (_onVisibilityChange.visibility.isHidden && measureName.indexOf('Final') < 0 || !_config.config.analyticsTracker) {
      return;
    }
    // Send metric to custom Analytics service
    _config.config.analyticsTracker({
      metricName: measureName,
      data: data,
      eventProperties: customProperties || {},
      navigatorInformation: (0, _getNavigatorInfo.getNavigatorInfo)(),
      vitalsScore: (0, _vitalsScore.getVitalsScore)(measureName, data)
    });
  });
};
},{"../config":"../src/config/index.ts","../helpers/getNavigatorInfo":"../src/helpers/getNavigatorInfo.ts","../helpers/onVisibilityChange":"../src/helpers/onVisibilityChange.ts","../helpers/utils":"../src/helpers/utils.ts","../helpers/vitalsScore":"../src/helpers/vitalsScore.ts"}],"../src/data/log.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logMetric = exports.logData = void 0;
var _config = require("../config");
var _reportPerf = require("../data/reportPerf");
var _utils = require("../helpers/utils");
var logData = exports.logData = function logData(measureName, metric, customProperties) {
  Object.keys(metric).forEach(function (key) {
    if (typeof metric[key] === 'number') {
      metric[key] = (0, _utils.roundByTwo)(metric[key]);
    }
  });
  // Sends the metric to an external tracking service
  (0, _reportPerf.reportPerf)(measureName, metric, customProperties);
};
/**
 * Dispatches the metric duration into internal logs
 * and the external time tracking service.
 */
var logMetric = exports.logMetric = function logMetric(duration, measureName, customProperties) {
  var duration2Decimal = (0, _utils.roundByTwo)(duration);
  if (duration2Decimal <= _config.config.maxTime && duration2Decimal >= 0) {
    // 从内部或者外部的报告工具报告指标数据
    (0, _reportPerf.reportPerf)(measureName, duration2Decimal, customProperties);
  }
};
},{"../config":"../src/config/index.ts","../data/reportPerf":"../src/data/reportPerf.ts","../helpers/utils":"../src/helpers/utils.ts"}],"../src/helpers/isSupported.ts":[function(require,module,exports) {
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
var isPerformanceSupported = exports.isPerformanceSupported = function isPerformanceSupported() {
  return _constants.WP && !!_constants.WP.getEntriesByType && !!_constants.WP.now && !!_constants.WP.mark;
};
},{"../data/constants":"../src/data/constants.ts"}],"../src/performance/getNavigationTiming.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNavigationTiming = void 0;
var _constants = require("../data/constants");
var _isSupported = require("../helpers/isSupported");
/**
 * Navigation Timing API provides performance metrics for HTML documents.
 * w3c.github.io/navigation-timing/
 * developers.google.com/web/fundamentals/performance/navigation-and-resource-timing
 */
var getNavigationTiming = exports.getNavigationTiming = function getNavigationTiming() {
  if (!(0, _isSupported.isPerformanceSupported)()) {
    return {};
  }
  // There is an open issue to type correctly getEntriesByType
  // github.com/microsoft/TypeScript/issues/33866
  // 这里直接的物理赋值performance.timing 已被弃用
  var n = _constants.WP.getEntriesByType('navigation')[0];
  // In Safari version 11.2 Navigation Timing isn't supported yet
  if (!n) {
    return {};
  }
  var responseStart = n.responseStart;
  var responseEnd = n.responseEnd;
  // We cache the navigation time for future times
  return {
    // fetchStart marks when the browser starts to fetch a resource
    // responseEnd is when the last byte of the response arrives
    fetchTime: responseEnd - n.fetchStart,
    // Service worker time plus response time
    workerTime: n.workerStart > 0 ? responseEnd - n.workerStart : 0,
    // Request plus response time (network only)
    totalTime: responseEnd - n.requestStart,
    // Response time only (download)
    downloadTime: responseEnd - responseStart,
    // Time to First Byte (TTFB)
    timeToFirstByte: responseStart - n.requestStart,
    // HTTP header size
    headerSize: n.transferSize - n.encodedBodySize || 0,
    //DNS解析时间
    dnsLookupTime: n.domainLookupEnd - n.domainLookupStart,
    //TCP建立时间
    tcpTime: n.connectEnd - n.connectStart || 0,
    // 白屏时间
    whiteTime: n.responseStart - n.navigationStart || 0,
    //dom渲染完成时间
    domTime: n.domContentLoadedEventEnd - n.navigationStart || 0,
    //页面onload时间
    loadTime: n.loadEventEnd - n.navigationStart || 0,
    //页面解析dom耗时
    parseDomTime: n.domComplete - n.domInteractive || 0
  };
};
},{"../data/constants":"../src/data/constants.ts","../helpers/isSupported":"../src/helpers/isSupported.ts"}],"../src/data/metrics.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tbt = exports.rt = exports.metrics = exports.lcp = exports.fcpEntryName = exports.fcp = exports.cls = void 0;
var metrics = exports.metrics = {};
var cls = exports.cls = {
  value: 0
};
var fcp = exports.fcp = {
  value: 0
};
var lcp = exports.lcp = {
  value: 0
};
var fcpEntryName = exports.fcpEntryName = 'first-contentful-paint';
var rt = exports.rt = {
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
//主线程总阻塞时间
var tbt = exports.tbt = {
  value: 0
};
},{}],"../src/performance/cumulativeLayoutShift.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initLayoutShift = void 0;
var _metrics = require("../data/metrics");
/**
 * Detects new layout shift occurrences and updates the
 * `cumulativeLayoutShiftScore` variable.
 */
var initLayoutShift = exports.initLayoutShift = function initLayoutShift(performanceEntries) {
  var lastEntry = performanceEntries.pop();
  // Only count layout shifts without recent user input.
  if (lastEntry && !lastEntry.hadRecentInput && lastEntry.value) {
    _metrics.cls.value += lastEntry.value;
  }
};
},{"../data/metrics":"../src/data/metrics.ts"}],"../src/performance/observeInstances.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.perfObservers = void 0;
/**
 * @remarks 核心性能数据指标对象
 * @public
 */
var perfObservers = exports.perfObservers = {};
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
var po = exports.po = function po(eventType, cb) {
  try {
    var perfObserver = new PerformanceObserver(function (entryList) {
      cb(entryList.getEntries());
    });
    // 订阅时间或者开始计时 buffered不立即执行在内存中留下PerformanceObserver实例
    perfObserver.observe({
      type: eventType,
      buffered: true
    });
    return perfObserver;
  } catch (e) {
    _constants.C.warn('Yideng.js:', e);
  }
  return null;
};
//断开测试通道
var poDisconnect = exports.poDisconnect = function poDisconnect(observer) {
  if (_observeInstances.perfObservers[observer]) {
    _observeInstances.perfObservers[observer].disconnect();
  }
  delete _observeInstances.perfObservers[observer];
};
},{"../data/constants":"../src/data/constants.ts","./observeInstances":"../src/performance/observeInstances.ts"}],"../src/performance/firstInput.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initFirstInputDelay = void 0;
var _log = require("../data/log");
var _metrics = require("../data/metrics");
var _observeInstances = require("./observeInstances");
var _performanceObserver = require("./performanceObserver");
var initFirstInputDelay = exports.initFirstInputDelay = function initFirstInputDelay(performanceEntries) {
  //取最后的一位即为我们希望所获取的时间点
  var lastEntry = performanceEntries.pop();
  if (lastEntry) {
    // Core Web Vitals FID logic
    // 测量输入事件的延迟操作
    (0, _log.logMetric)(lastEntry.processingStart - lastEntry.startTime, 'fidVitals', {
      performanceEntry: lastEntry
    });
    // 传统的FID逻辑
    // Measure the duration of processing the first input event
    (0, _log.logMetric)(lastEntry.duration, 'fid', {
      performanceEntry: lastEntry
    });
  }
  // 销毁对FID的注册回调 避免过多的观察者造成内存泄露
  (0, _performanceObserver.poDisconnect)(1);
  //初始化lcp
  (0, _log.logMetric)(_metrics.lcp.value, 'lcp');
  if (_observeInstances.perfObservers[3] && typeof _observeInstances.perfObservers[3].takeRecords === 'function') {
    _observeInstances.perfObservers[3].takeRecords();
  }
  (0, _log.logMetric)(_metrics.cls.value, 'cls');
  (0, _log.logMetric)(_metrics.tbt.value, 'tbt');
  // TBT with 5 second delay after FID
  setTimeout(function () {
    (0, _log.logMetric)(_metrics.tbt.value, "tbt5S");
  }, 5000);
  // TBT with 10 second delay after FID
  setTimeout(function () {
    (0, _log.logMetric)(_metrics.tbt.value, "tbt10S");
    //FID被激活以后10S的整体数据消耗
    (0, _log.logData)('dataConsumption', _metrics.rt.value);
  }, 10000);
};
},{"../data/log":"../src/data/log.ts","../data/metrics":"../src/data/metrics.ts","./observeInstances":"../src/performance/observeInstances.ts","./performanceObserver":"../src/performance/performanceObserver.ts"}],"../src/performance/totalBlockingTime.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initTotalBlockingTime = void 0;
var _metrics = require("../data/metrics");
var initTotalBlockingTime = exports.initTotalBlockingTime = function initTotalBlockingTime(performanceEntries) {
  performanceEntries.forEach(function (entry) {
    //从fcp -> tti获取长耗时任务（self表示耗时长任务来自于渲染帧）
    // console.log('🍌', entry);
    if (entry.name !== 'self' || entry.startTime < _metrics.fcp.value) {
      return;
    }
    // console.log('🍌2', entry);
    //https://developer.mozilla.org/zh-CN/docs/Web/API/Long_Tasks_API
    //长耗时任务意味着执行时间超过50ms的
    var blockingTime = entry.duration - 50;
    if (blockingTime > 0) {
      _metrics.tbt.value += blockingTime;
    }
  });
};
},{"../data/metrics":"../src/data/metrics.ts"}],"../src/performance/paint.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initLargestContentfulPaint = exports.initFirstPaint = exports.initElementTiming = void 0;
var _metrics = require("../data/metrics");
var _performanceObserver = require("./performanceObserver");
var _observeInstances = require("./observeInstances");
var _totalBlockingTime = require("./totalBlockingTime");
var _log = require("../data/log");
var initFirstPaint = exports.initFirstPaint = function initFirstPaint(performanceEntries) {
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
var initLargestContentfulPaint = exports.initLargestContentfulPaint = function initLargestContentfulPaint(performanceEntries) {
  var lastEntry = performanceEntries.pop();
  if (lastEntry) {
    _metrics.lcp.value = lastEntry.renderTime || lastEntry.loadTime;
  }
};
var initElementTiming = exports.initElementTiming = function initElementTiming(performanceEntries) {
  performanceEntries.forEach(function (entry) {
    if (entry.identifier) {
      (0, _log.logMetric)(entry.startTime, entry.identifier);
    }
  });
};
},{"../data/metrics":"../src/data/metrics.ts","./performanceObserver":"../src/performance/performanceObserver.ts","./observeInstances":"../src/performance/observeInstances.ts","./totalBlockingTime":"../src/performance/totalBlockingTime.ts","../data/log":"../src/data/log.ts"}],"../src/performance/resourceTiming.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initResourceTiming = void 0;
var _config = require("../config");
var _log = require("../data/log");
var _metrics = require("../data/metrics");
var initResourceTiming = exports.initResourceTiming = function initResourceTiming(performanceEntries) {
  //console.log('🐶', performanceEntries);
  performanceEntries.forEach(function (entry) {
    //console.log('🐶', 1);
    if (_config.config.isResourceTiming) {
      (0, _log.logData)('resourceTiming', entry);
    }
    if (entry.decodedBodySize && entry.initiatorType) {
      var bodySize = entry.decodedBodySize / 1000;
      _metrics.rt.value[entry.initiatorType] += bodySize;
      _metrics.rt.value.total += bodySize;
    }
  });
};
},{"../config":"../src/config/index.ts","../data/log":"../src/data/log.ts","../data/metrics":"../src/data/metrics.ts"}],"../src/performance/observe.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPerformanceObserver = exports.disconnectPerfObserversHidden = void 0;
var _config = require("../config");
var _log = require("../data/log");
var _metrics = require("../data/metrics");
var _cumulativeLayoutShift = require("./cumulativeLayoutShift");
var _firstInput = require("./firstInput");
var _observeInstances = require("./observeInstances");
var _paint = require("./paint");
var _performanceObserver = require("./performanceObserver");
var _resourceTiming = require("./resourceTiming");
var initPerformanceObserver = exports.initPerformanceObserver = function initPerformanceObserver() {
  console.log('⏰ 性能收集开始', Math.random());
  _observeInstances.perfObservers[0] = (0, _performanceObserver.po)('paint', _paint.initFirstPaint);
  _observeInstances.perfObservers[1] = (0, _performanceObserver.po)('first-input', _firstInput.initFirstInputDelay);
  _observeInstances.perfObservers[2] = (0, _performanceObserver.po)('largest-contentful-paint', _paint.initLargestContentfulPaint);
  //收集页面全部资源性能数据
  if (_config.config.isResourceTiming) {
    console.log('📚 收集页面性能数据');
    (0, _performanceObserver.po)('resource', _resourceTiming.initResourceTiming);
  }
  _observeInstances.perfObservers[3] = (0, _performanceObserver.po)('layout-shift', _cumulativeLayoutShift.initLayoutShift);
  if (_config.config.isElementTiming) {
    (0, _performanceObserver.po)('element', _paint.initElementTiming);
  }
};
var disconnectPerfObserversHidden = exports.disconnectPerfObserversHidden = function disconnectPerfObserversHidden() {
  if (_observeInstances.perfObservers[2]) {
    (0, _log.logMetric)(_metrics.lcp.value, "lcpFinal");
    (0, _performanceObserver.poDisconnect)(2);
  }
  if (_observeInstances.perfObservers[3]) {
    if (typeof _observeInstances.perfObservers[3].takeRecords === 'function') {
      _observeInstances.perfObservers[3].takeRecords();
    }
    (0, _log.logMetric)(_metrics.cls.value, "clsFinal");
    (0, _performanceObserver.poDisconnect)(3);
  }
  if (_observeInstances.perfObservers[4]) {
    (0, _log.logMetric)(_metrics.tbt.value, "tbtFinal");
    (0, _performanceObserver.poDisconnect)(4);
  }
};
},{"../config":"../src/config/index.ts","../data/log":"../src/data/log.ts","../data/metrics":"../src/data/metrics.ts","./cumulativeLayoutShift":"../src/performance/cumulativeLayoutShift.ts","./firstInput":"../src/performance/firstInput.ts","./observeInstances":"../src/performance/observeInstances.ts","./paint":"../src/performance/paint.ts","./performanceObserver":"../src/performance/performanceObserver.ts","./resourceTiming":"../src/performance/resourceTiming.ts"}],"../src/tools/isSupported.ts":[function(require,module,exports) {
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
var isPerformanceSupported = exports.isPerformanceSupported = function isPerformanceSupported() {
  return _constants.WP && !!_constants.WP.getEntriesByType && !!_constants.WP.now && !!_constants.WP.mark;
};
},{"../data/constants":"../src/data/constants.ts"}],"../src/error/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = require("../config");
var _constants = require("../data/constants");
var _types = require("../typings/types");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } //rrweb引入到了这里
var ErrorTrace = /*#__PURE__*/function () {
  function ErrorTrace() {
    _classCallCheck(this, ErrorTrace);
    _defineProperty(this, "errordefo", void 0);
    this.errordefo = {};
  }
  //全局捕获同步+异步错误
  return _createClass(ErrorTrace, [{
    key: "globalError",
    value: function globalError() {
      console.log('上报sdk');
      console.log('[ ❌全局捕获错误 ]');
      _constants.W.onerror = function (eventOrMessage, scriptURI, lineno, colno, error) {
        console.log('[ 我知道错误了 ]', eventOrMessage);
        var errorInfo = JSON.stringify({
          scriptURI: scriptURI,
          lineno: lineno,
          colno: colno,
          error: error
        });
        //通过错误信息还原sourcemap源文件地址
        console.log(errorInfo);
        _config.config.reportData.sendToAnalytics(_types.AskPriority.IDLE, errorInfo);
        return true;
      };
    }
    //资源挂载失败 如404png
  }, {
    key: "networkError",
    value: function networkError() {
      _constants.W.addEventListener('error', function (e) {
        if (e.target !== _constants.W) {
          console.log('🖼网络错误', e.target);
        }
      }, true);
    }
    //异步Promise错误
  }, {
    key: "promiseError",
    value: function promiseError() {
      _constants.W.addEventListener('unhandledrejection', function (e) {
        e.preventDefault();
        console.log('我知道 promise 的错误了', e.reason);
        return true;
      });
    }
  }, {
    key: "iframeError",
    value: function iframeError() {
      var frames = _constants.W.frames;
      for (var i = 0; i < frames.length; i++) {
        frames[i].addEventListener('error', function (e) {
          console.log('addEventListener');
          console.log(e);
        }, true);
        frames[i].addEventListener('unhandledrejection', function (e) {
          console.log('unhandledrejection');
        }, true);
      }
    }
    // private consoleReflect() {
    //   const console_error = W.console.error;
    //   W.console.error = function () {
    //     config.reportData.sendToAnalytics(AskPriority.IDLE, errorInfo);
    //     console_error.apply(window, arguments);
    //   };
    // }
  }, {
    key: "run",
    value: function run() {
      this.networkError();
      //触发全体数据监听错误
      this.globalError();
      //触发promise的错误
      this.promiseError();
    }
  }]);
}();
var _default = exports.default = ErrorTrace;
},{"../config":"../src/config/index.ts","../data/constants":"../src/data/constants.ts","../typings/types":"../src/typings/types.ts"}],"../src/data/analyticsTracker.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var analyticsTracker = function analyticsTracker(options) {
  //   console.log(Math.random());
  //   console.log('-------');
  var metricName = options.metricName,
    eventProperties = options.eventProperties,
    data = options.data,
    navigatorInformation = options.navigatorInformation,
    vitalsScore = options.vitalsScore;
  console.log(options);
};
var _default = exports.default = analyticsTracker;
},{}],"../src/data/reportData.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _types = require("../typings/types");
var _constants = require("./constants");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ReportData = /*#__PURE__*/function () {
  function ReportData(options) {
    _classCallCheck(this, ReportData);
    _defineProperty(this, "logUrl", void 0);
    // console.log('⏰', options);
    var logUrl = options.logUrl;
    if (logUrl) {
      this.logUrl = logUrl;
    } else {
      throw new Error('请传递要记录数据的路由~');
    }
  }
  return _createClass(ReportData, [{
    key: "sendToAnalytics",
    value: function sendToAnalytics(level, body, uri) {
      var logurl = this.logUrl;
      //临时更换其他url
      if (uri) {
        logurl = uri;
      }
      // console.log('路由', logurl);
      if (level == _types.AskPriority.URGENT) {
        if (!!_constants.W.fetch) {
          fetch(logurl, {
            body: body,
            method: 'POST',
            keepalive: true
          });
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('post', logurl, true);
          // 设置请求头
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(body); // 发送参数
          xhr.onload = function (e) {
            //   if (this.status == 200 || this.status == 304) {
            //     alert(this.responseText);
            //   }
            //及时清理以防多次创建
            xhr = null;
          };
        }
      } else if (level == _types.AskPriority.IDLE) {
        if (!!_constants.WN.sendBeacon) {
          navigator.sendBeacon(logurl, body);
        } else {
          var img = new Image();
          img.src = "".concat(logurl, "?body=").concat(body);
          img.onload = function () {
            //统计完成收回创建的元素防止内存泄露
            img = null;
          };
        }
      }
    }
  }]);
}();
var _default = exports.default = ReportData;
},{"../typings/types":"../src/typings/types.ts","./constants":"../src/data/constants.ts"}],"../src/data/storageEstimate.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reportStorageEstimate = void 0;
var _log = require("./log");
var _utils = require("../helpers/utils");
/**
 * The estimate() method of the StorageManager interface asks the Storage Manager
 * for how much storage the app takes up (usage),
 * and how much space is available (quota).
 */
var reportStorageEstimate = exports.reportStorageEstimate = function reportStorageEstimate(storageInfo) {
  var estimateUsageDetails = 'usageDetails' in storageInfo ? storageInfo.usageDetails : {};
  (0, _log.logData)('storageEstimate', {
    quota: (0, _utils.convertToKB)(storageInfo.quota),
    usage: (0, _utils.convertToKB)(storageInfo.usage),
    caches: (0, _utils.convertToKB)(estimateUsageDetails.caches),
    indexedDB: (0, _utils.convertToKB)(estimateUsageDetails.indexedDB),
    serviceWorker: (0, _utils.convertToKB)(estimateUsageDetails.serviceWorkerRegistrations)
  });
};
},{"./log":"../src/data/log.ts","../helpers/utils":"../src/helpers/utils.ts"}],"../src/yideng.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = require("./config");
var _constants = require("./data/constants");
var _log = require("./data/log");
var _getNavigationTiming = require("./performance/getNavigationTiming");
var _observe = require("./performance/observe");
var _isSupported = require("./tools/isSupported");
var _error = _interopRequireDefault(require("./error"));
var _analyticsTracker2 = _interopRequireDefault(require("./data/analyticsTracker"));
var _reportData = _interopRequireDefault(require("./data/reportData"));
var _onVisibilityChange = require("./helpers/onVisibilityChange");
var _getNetworkInformation = require("./helpers/getNetworkInformation");
var _storageEstimate = require("./data/storageEstimate");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * 一款免费的开源性能监控SDK
 *
 * @remarks
 * 目前能够完成监控的指标包含FCP等
 *
 * @packageDocumentation
 */
var Yideng = exports.default = /*#__PURE__*/_createClass(function Yideng() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  _classCallCheck(this, Yideng);
  _defineProperty(this, "v", '1.0.0');
  _defineProperty(this, "reportData", void 0);
  // 扩展基础配置
  var logUrl = options.logUrl;
  if (!logUrl) {
    throw new Error("\u4EAC\u7A0B\u4E00\u706F\u7CFB\u7EDF\u76D1\u63A7\u5E73\u53F0".concat(this.v, "\u63D0\u793A\u672A\u4F20\u9012logUrl"));
  }
  //向后台输送数据
  var insReportData = new _reportData.default({
    logUrl: logUrl
  });
  _config.config.reportData = insReportData;
  //对外暴露上传接口
  this.reportData = insReportData;
  //集合数据汇总
  var _analyticsTracker = options.analyticsTracker;
  if (_analyticsTracker) {
    _config.config.analyticsTracker = _analyticsTracker;
  } else {
    _config.config.analyticsTracker = _analyticsTracker2.default;
  }
  _config.config.isResourceTiming = !!options.resourceTiming;
  _config.config.isElementTiming = !!options.elementTiming;
  _config.config.maxTime = options.maxMeasureTime || _config.config.maxTime;
  if (options.captureError) {
    //开启错误跟踪
    var errorTtace = new _error.default();
    errorTtace.run();
  }
  //如果浏览器不支持性能指标只能放弃
  if (!(0, _isSupported.isPerformanceSupported)()) {
    return;
  }
  //浏览器支持的起FRP这样的Observer统计性能
  if ('PerformanceObserver' in _constants.W) {
    (0, _observe.initPerformanceObserver)();
  }
  //初始化
  if (typeof _constants.D.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    _constants.D.addEventListener('visibilitychange', _onVisibilityChange.didVisibilityChange.bind(this, _observe.disconnectPerfObserversHidden));
  }
  //记录系统DNS请求+白屏时间等
  (0, _log.logData)('navigationTiming', (0, _getNavigationTiming.getNavigationTiming)());
  //记录用户的网速 H5+多普勒测速
  (0, _log.logData)('networkInformation', (0, _getNetworkInformation.getNetworkInformation)());
  //管理离线缓存数据
  if (_constants.WN && _constants.WN.storage && typeof _constants.WN.storage.estimate === 'function') {
    _constants.WN.storage.estimate().then(_storageEstimate.reportStorageEstimate);
  }
});
},{"./config":"../src/config/index.ts","./data/constants":"../src/data/constants.ts","./data/log":"../src/data/log.ts","./performance/getNavigationTiming":"../src/performance/getNavigationTiming.ts","./performance/observe":"../src/performance/observe.ts","./tools/isSupported":"../src/tools/isSupported.ts","./error":"../src/error/index.ts","./data/analyticsTracker":"../src/data/analyticsTracker.ts","./data/reportData":"../src/data/reportData.ts","./helpers/onVisibilityChange":"../src/helpers/onVisibilityChange.ts","./helpers/getNetworkInformation":"../src/helpers/getNetworkInformation.ts","./data/storageEstimate":"../src/data/storageEstimate.ts"}],"performance/index.ts":[function(require,module,exports) {
"use strict";

var _yideng = _interopRequireDefault(require("../../src/yideng"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var yideng = new _yideng.default({
  elementTiming: true,
  logUrl: 'http://123.com/test'
});
console.log('🐻', yideng);
// 模拟一个长任务
var start = Date.now();
while (Date.now() - start < 1000) {}
},{"../../src/yideng":"../src/yideng.ts"}],"../node_modules/.pnpm/parcel-bundler@1.12.5/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59204" + '/');
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
      });

      // Enable HMR for CSS by default.
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
},{}]},{},["../node_modules/.pnpm/parcel-bundler@1.12.5/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","performance/index.ts"], null)
//# sourceMappingURL=/performance.09b13aae.js.map