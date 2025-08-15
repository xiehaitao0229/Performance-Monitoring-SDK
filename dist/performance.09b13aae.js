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
// 全局对象引用，提供便捷访问
/** 全局 window 对象引用 */
var W = exports.W = window;
/** 全局 console 对象引用，用于日志输出 */
var C = exports.C = W.console;
/** 全局 document 对象引用，用于DOM操作 */
var D = exports.D = document;
/** 全局 navigator 对象引用，类型转换为扩展的 Navigator 接口 */
var WN = exports.WN = W.navigator;
/** 全局 performance 对象引用，用于性能监控 */
var WP = exports.WP = W.performance;
/**
 * 获取设备内存大小
 * 从 navigator.deviceMemory 获取设备内存信息，如果不支持则返回 0
 *
 * @returns 设备内存大小（GB），如果不支持则返回 0
 */
var getDM = exports.getDM = function getDM() {
  var _WN$deviceMemory;
  return (_WN$deviceMemory = WN.deviceMemory) !== null && _WN$deviceMemory !== void 0 ? _WN$deviceMemory : 0;
};
/**
 * 获取硬件并发数
 * 从 navigator.hardwareConcurrency 获取CPU核心数，如果不支持则返回 0
 *
 * @returns CPU核心数，如果不支持则返回 0
 */
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
/**
 * 数据上报类
 * 实现了 IReportData 接口，负责将性能监控数据发送到指定的服务器
 *
 * 支持两种上报方式：
 * 1. 紧急数据（URGENT）：使用 fetch 或 XMLHttpRequest 立即发送
 * 2. 空闲数据（IDLE）：使用 sendBeacon 或图片请求在空闲时发送
 */
var ReportData = /*#__PURE__*/function () {
  /**
   * 构造函数
   * @param options - 配置选项，必须包含 logUrl
   * @throws Error 如果没有传递 logUrl 参数
   */
  function ReportData(options) {
    _classCallCheck(this, ReportData);
    /** 日志上报的目标URL地址 */
    _defineProperty(this, "logUrl", void 0);
    var logUrl = options.logUrl;
    if (logUrl) {
      this.logUrl = logUrl;
    } else {
      throw new Error('请传递要记录数据的路由~');
    }
  }
  /**
   * 发送数据到分析服务
   * 根据优先级选择不同的上报方式，确保数据能够可靠地发送到服务器
   *
   * @param level - 数据优先级，决定上报方式和时机
   * @param body - 要上报的数据内容
   * @param uri - 可选的自定义上报URL，如果提供则覆盖默认的 logUrl
   */
  return _createClass(ReportData, [{
    key: "sendToAnalytics",
    value: function sendToAnalytics(level, body, uri) {
      // 确定最终使用的上报URL
      var logurl = this.logUrl;
      // 临时更换其他url，用于特殊场景下的数据上报
      if (uri) {
        logurl = uri;
      }
      // console.log('路由', logurl);
      // 紧急数据上报：需要立即发送的重要数据
      if (level == _types.AskPriority.URGENT) {
        // 优先使用 fetch API，支持 keepalive 选项
        if (!!_constants.W.fetch) {
          fetch(logurl, {
            body: body,
            method: 'POST',
            keepalive: true // 确保页面关闭后请求仍能完成
          });
        } else {
          // 降级到 XMLHttpRequest
          var xhr = new XMLHttpRequest();
          xhr.open('post', logurl, true);
          // 设置请求头，指定内容类型为 JSON
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(body); // 发送参数
          xhr.onload = function (e) {
            //   if (this.status == 200 || this.status == 304) {
            //     alert(this.responseText);
            //   }
            // 及时清理引用，防止多次创建导致的内存泄露
            xhr = null;
          };
        }
      }
      // 空闲数据上报：可以在空闲时发送的非紧急数据
      else if (level == _types.AskPriority.IDLE) {
        // 优先使用 sendBeacon API，专为数据上报设计
        if (!!_constants.WN.sendBeacon) {
          navigator.sendBeacon(logurl, body);
        } else {
          // 降级到图片请求方式，兼容性最好
          var img = new Image();
          img.src = "".concat(logurl, "?body=").concat(body);
          img.onload = function () {
            // 统计完成收回创建的元素，防止内存泄露
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
/**
 * 网络连接类型
 * 用于存储当前网络的有效连接类型，默认为 '4g'
 */
var et = exports.et = '4g';
/**
 * 节省数据模式状态
 * 表示用户是否启用了节省数据模式，默认为 false
 */
var sd = exports.sd = false;
/**
 * 获取网络连接信息
 * 从浏览器的 Network Information API 获取网络状态信息
 * 包括下行带宽、有效连接类型、往返时间等
 *
 * 如果浏览器不支持 Network Information API，则返回空对象
 * 未来计划实现多普勒测速法或图片探测法作为备选方案
 *
 * @returns 网络信息对象，包含下行带宽、连接类型、RTT等信息
 */
var getNetworkInformation = exports.getNetworkInformation = function getNetworkInformation() {
  // 检查浏览器是否支持 Network Information API
  if ('connection' in _constants.WN) {
    // 获取网络连接对象
    var dataConnection = _constants.WN.connection;
    // 验证连接对象是否为有效对象
    if (_typeof(dataConnection) !== 'object') {
      return {};
    }
    // 更新全局变量：有效连接类型
    exports.et = et = dataConnection.effectiveType;
    // 更新全局变量：节省数据模式状态
    exports.sd = sd = !!dataConnection.saveData;
    // 返回完整的网络信息对象
    return {
      downlink: dataConnection.downlink,
      // 下行带宽（Mbps）
      effectiveType: dataConnection.effectiveType,
      // 有效连接类型（如 4g、3g 等）
      rtt: dataConnection.rtt,
      // 往返时间（毫秒）
      saveData: !!dataConnection.saveData // 是否启用节省数据模式
    };
  } else {
    // 浏览器不支持 Network Information API
    // TODO: 这里我们使用多普勒测速法或者直接用图片探测法
    // 作为获取网络信息的备选方案
  }
  // 如果无法获取网络信息，返回空对象
  return {};
};
},{"../data/constants":"../src/data/constants.ts"}],"../src/helpers/isLowEnd.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIsLowEndExperience = exports.getIsLowEndDevice = void 0;
var _constants = require("../data/constants");
/**
 * 判断是否为低端设备
 * 基于硬件能力（CPU核心数和内存大小）来评估设备性能
 *
 * 判断标准：
 * - CPU核心数 ≤ 4 个
 * - 设备内存 ≤ 4GB
 *
 * @returns true 表示低端设备，false 表示中高端设备
 */
var getIsLowEndDevice = exports.getIsLowEndDevice = function getIsLowEndDevice() {
  // 检查CPU核心数：如果逻辑处理器数量 ≤ 4，则认为是低端设备
  if ((0, _constants.getHC)() && (0, _constants.getHC)() <= 4) {
    return true;
  }
  // 检查设备内存：如果可用内存 ≤ 4GB，则认为是低端设备
  if ((0, _constants.getDM)() && (0, _constants.getDM)() <= 4) {
    return true;
  }
  // 如果CPU核心数 > 4 且内存 > 4GB，则认为是中高端设备
  return false;
};
/**
 * 判断是否为低端用户体验
 * 综合考虑网络连接类型、节省数据模式和设备硬件能力
 *
 * @param et - 有效连接类型，如 'slow-2g'、'2g'、'3g'、'4g' 等
 * @param sd - 是否启用节省数据模式
 * @returns true 表示低端用户体验，false 表示中高端用户体验
 */
var getIsLowEndExperience = exports.getIsLowEndExperience = function getIsLowEndExperience(et, sd) {
  // 根据网络连接类型判断用户体验质量
  // 如果连接类型不是 4g，则认为是低端体验
  switch (et) {
    case 'slow-2g':
      // 极慢的2G网络，用户体验较差
      return true;
      break;
    case '2g':
      // 2G网络，用户体验较差
      return true;
      break;
    case '3g':
      // 3G网络，用户体验一般
      return true;
      break;
    default:
      // 4G或更好的网络连接
      // 此时需要综合考虑设备硬件能力和节省数据模式
      // 如果设备本身是低端设备，或者启用了节省数据模式，则认为是低端体验
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
 * 获取浏览器导航器信息
 * 收集来自 window.navigator 的各种设备和浏览器能力信息
 *
 * 包含以下信息：
 * 1. Device Memory - 设备内存大小（GB）
 * 2. Hardware Concurrency - 硬件并发数（CPU核心数）
 * 3. Service Worker 状态：
 *    - controlled: 页面被 service worker 控制
 *    - supported: 浏览器支持 service worker
 *    - unsupported: 用户浏览器不支持 service worker
 * 4. 低端设备判断 - 基于硬件能力的设备性能评估
 * 5. 低端体验判断 - 基于网络条件的用户体验评估
 *
 * @returns 包含设备信息的对象，如果无法获取则返回空对象
 */
var getNavigatorInfo = exports.getNavigatorInfo = function getNavigatorInfo() {
  // 检查浏览器是否支持 navigator 对象
  if (_constants.WN) {
    return {
      // 获取设备内存大小，如果无法获取则默认为 0
      deviceMemory: (0, _constants.getDM)() || 0,
      // 获取硬件并发数（CPU核心数），如果无法获取则默认为 0
      hardwareConcurrency: (0, _constants.getHC)() || 0,
      // 判断 Service Worker 状态
      serviceWorkerStatus: 'serviceWorker' in _constants.WN ? _constants.WN.serviceWorker.controller ? 'controlled' // 页面被 service worker 控制
      : 'supported' // 支持但未控制页面
      : 'unsupported',
      // 不支持 service worker
      // 基于硬件能力判断是否为低端设备
      isLowEndDevice: (0, _isLowEnd.getIsLowEndDevice)(),
      // 基于网络条件判断是否为低端体验
      // 传入网络类型(et)和节省数据模式(sd)参数
      isLowEndExperience: (0, _isLowEnd.getIsLowEndExperience)(_getNetworkInformation.et, _getNetworkInformation.sd)
    };
  }
  // 如果浏览器不支持 navigator 对象，返回空对象
  return {};
};
},{"../data/constants":"../src/data/constants.ts","./getNetworkInformation":"../src/helpers/getNetworkInformation.ts","./isLowEnd":"../src/helpers/isLowEnd.ts"}],"../src/helpers/onVisibilityChange.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visibility = exports.didVisibilityChange = void 0;
var _constants = require("../data/constants");
/**
 * 页面可见性状态管理对象
 * 用于跟踪页面的可见性状态，避免在页面隐藏时发送错误的性能数据
 */
var visibility = exports.visibility = {
  /** 页面是否处于隐藏状态，默认为 false（可见） */
  isHidden: false
};
/**
 * 页面可见性变化事件处理函数
 *
 * 该函数只在页面变为隐藏状态时执行回调，这样设计的原因是：
 * 1. 避免在页面隐藏时发送错误的性能数据或日志
 * 2. 确保性能监控的准确性，因为隐藏页面的性能数据可能不准确
 * 3. 优化资源使用，在页面不可见时停止不必要的性能监控
 *
 * 使用场景：
 * - 当用户切换到其他标签页时
 * - 当用户最小化浏览器窗口时
 * - 当页面被其他应用遮挡时
 *
 * @param cb - 页面隐藏时要执行的回调函数，通常用于停止性能监控
 */
var didVisibilityChange = exports.didVisibilityChange = function didVisibilityChange(cb) {
  // 检查页面是否处于隐藏状态
  if (_constants.D.hidden) {
    // 执行回调函数，通常用于停止性能监控或清理资源
    cb();
    // 更新全局可见性状态，记录页面当前为隐藏状态
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
/**
 * 数值四舍五入到两位小数
 * 使用 toFixed(2) 方法进行精度控制，然后转换为浮点数
 *
 * @param num - 需要处理的数值
 * @returns 四舍五入到两位小数的浮点数
 */
var roundByTwo = exports.roundByTwo = function roundByTwo(num) {
  return parseFloat(num.toFixed(2));
};
/**
 * 将字节数转换为千字节（KB）
 * 将字节数除以 1024^2 得到 KB 值，并保留两位小数
 *
 * @param bytes - 字节数
 * @returns 转换后的 KB 值，如果输入无效则返回 null
 */
var convertToKB = exports.convertToKB = function convertToKB(bytes) {
  // 验证输入参数是否为有效数字
  if (typeof bytes !== 'number') {
    return null;
  }
  // 将字节转换为 KB：1 KB = 1024^2 字节
  // 使用 roundByTwo 函数保留两位小数
  return roundByTwo(bytes / Math.pow(1024, 2));
};
/**
 * 推送任务到 requestIdleCallback
 * 高效利用浏览器的空闲时间进行数据收集，避免阻塞主线程
 *
 * 如果浏览器支持 requestIdleCallback，则使用它来调度任务
 * 如果不支持，则立即执行回调函数
 *
 * @param cb - 需要执行的回调函数
 */
var pushTask = exports.pushTask = function pushTask(cb) {
  // 检查浏览器是否支持 requestIdleCallback API
  if ('requestIdleCallback' in _constants.W) {
    // 使用 requestIdleCallback 在浏览器空闲时执行任务
    // timeout: 3000 表示最多等待 3 秒，如果一直没有空闲时间则强制执行
    _constants.W.requestIdleCallback(cb, {
      timeout: 3000
    });
  } else {
    // 浏览器不支持 requestIdleCallback，立即执行回调函数
    cb();
  }
};
},{"../data/constants":"../src/data/constants.ts"}],"../src/helpers/vitalsScore.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webVitalsScore = exports.getVitalsScore = void 0;
// Web Vitals 评分标准阈值定义
// 参考标准：https://web.dev/vitals/
// 这些阈值用于评估网页性能指标的质量等级
// FCP (First Contentful Paint) 评分阈值：1000ms 为优秀，2500ms 为需要改进
var fcpScore = [1000, 2500];
// LCP (Largest Contentful Paint) 评分阈值：2500ms 为优秀，4000ms 为需要改进
var lcpScore = [2500, 4000];
// FID (First Input Delay) 评分阈值：100ms 为优秀，300ms 为需要改进
var fidcore = [100, 300];
// CLS (Cumulative Layout Shift) 评分阈值：0.1 为优秀，0.25 为需要改进
var clsScore = [0.1, 0.25];
// TBT (Total Blocking Time) 评分阈值：300ms 为优秀，600ms 为需要改进
var tbtScore = [300, 600];
/**
 * Web Vitals 评分标准映射表
 * 将各种性能指标名称映射到对应的评分阈值数组
 * 每个阈值数组包含两个值：[优秀阈值, 需要改进阈值]
 */
var webVitalsScore = exports.webVitalsScore = {
  // First Paint 和 First Contentful Paint 使用相同的评分标准
  fp: fcpScore,
  // First Paint
  fcp: fcpScore,
  // First Contentful Paint
  // Largest Contentful Paint 相关指标
  lcp: lcpScore,
  // Largest Contentful Paint
  lcpFinal: lcpScore,
  // LCP 最终值
  // First Input Delay 相关指标
  fid: fidcore,
  // First Input Delay
  fidVitals: fidcore,
  // FID Vitals 指标
  // Cumulative Layout Shift 相关指标
  cls: clsScore,
  // Cumulative Layout Shift
  clsFinal: clsScore,
  // CLS 最终值
  // Total Blocking Time 相关指标
  tbt: tbtScore,
  // Total Blocking Time
  tbt5S: tbtScore,
  // 5秒内的 TBT
  tbt10S: tbtScore,
  // 10秒内的 TBT
  tbtFinal: tbtScore // TBT 最终值
};
/**
 * 根据性能指标名称和值计算 Web Vitals 评分
 * 将数值性能指标转换为可读的质量等级
 *
 * @param measureName - 性能指标名称，如 'fcp'、'lcp'、'cls' 等
 * @param value - 性能指标的具体数值
 * @returns 性能评分等级：'good'（优秀）、'needsImprovement'（需要改进）、'poor'（较差）或 null（未知指标）
 */
var getVitalsScore = exports.getVitalsScore = function getVitalsScore(measureName, value) {
  // 检查指标名称是否在评分标准中存在
  if (!webVitalsScore[measureName]) {
    return null;
  }
  // 获取该指标的评分阈值
  var thresholds = webVitalsScore[measureName];
  // 根据数值与阈值的比较确定评分等级
  if (value <= thresholds[0]) {
    // 数值小于等于第一个阈值，评为优秀
    return 'good';
  }
  // 数值小于等于第二个阈值，评为需要改进，否则评为较差
  return value <= thresholds[1] ? 'needsImprovement' : 'poor';
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
/**
 * 记录并上报性能指标数据
 * 将传入的指标数据中的数值进行四舍五入处理，然后发送到外部跟踪服务
 *
 * @param measureName - 指标名称，用于标识不同类型的性能数据
 * @param metric - 指标数据对象，包含各种性能指标值
 * @param customProperties - 可选的自定义属性，用于添加额外的上下文信息
 */
var logData = exports.logData = function logData(measureName, metric, customProperties) {
  // 遍历指标对象的所有属性，对数值类型的属性进行精度处理
  Object.keys(metric).forEach(function (key) {
    if (typeof metric[key] === 'number') {
      // 将数值四舍五入到两位小数，提高数据的一致性和可读性
      metric[key] = (0, _utils.roundByTwo)(metric[key]);
    }
  });
  // 将处理后的指标数据发送到外部跟踪服务
  (0, _reportPerf.reportPerf)(measureName, metric, customProperties);
};
/**
 * 记录并上报性能指标持续时间
 * 将指标持续时间分发到内部日志和外部时间跟踪服务
 *
 * @param duration - 持续时间（毫秒），表示某个操作的执行时间
 * @param measureName - 指标名称，用于标识性能指标类型
 * @param customProperties - 可选的自定义属性，用于添加额外的上下文信息
 */
var logMetric = exports.logMetric = function logMetric(duration, measureName, customProperties) {
  // 将持续时间四舍五入到两位小数
  var duration2Decimal = (0, _utils.roundByTwo)(duration);
  // 验证持续时间的有效性：必须在配置的最大时间范围内且为非负数
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
 * 检查浏览器是否支持性能监控相关的 API
 *
 * 该函数检查浏览器是否支持以下三个关键的性能 API：
 * 1. Navigation Timing API - 导航时间 API
 * 2. User Timing API - 用户时间 API（performance.mark()）
 * 3. PerformanceObserver Interface - 性能观察器接口
 *
 * 注意事项：
 * - 在 Safari 浏览器中，User Timing API (performance.mark()) 不可用
 * - 这会导致 DevTools 时间轴无法显示性能标记
 *
 * 相关文档：
 * - Performance.mark(): https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark
 * - PerformanceObserver: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
 * - Performance.getEntriesByType: https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType
 *
 * @returns true 表示浏览器支持性能监控 API，false 表示不支持
 */
var isPerformanceSupported = exports.isPerformanceSupported = function isPerformanceSupported() {
  // 检查 performance 对象是否存在
  // 检查 getEntriesByType 方法是否可用（Navigation Timing API）
  // 检查 now 方法是否可用（高精度时间戳）
  // 检查 mark 方法是否可用（User Timing API）
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
 * 获取页面导航时间性能指标
 *
 * Navigation Timing API 提供了 HTML 文档的性能指标数据。
 * 该 API 可以详细测量页面加载过程中的各个阶段耗时。
 *
 * 相关文档：
 * - W3C 规范：https://w3c.github.io/navigation-timing/
 * - Google 开发者指南：https://developers.google.com/web/fundamentals/performance/navigation-and-resource-timing
 *
 * @returns 包含各种导航时间指标的对象，如果浏览器不支持则返回空对象
 */
var getNavigationTiming = exports.getNavigationTiming = function getNavigationTiming() {
  // 检查浏览器是否支持性能监控 API
  if (!(0, _isSupported.isPerformanceSupported)()) {
    return {};
  }
  // 获取导航类型的性能条目
  // 注意：这里直接使用 performance.timing 已被弃用，改用 getEntriesByType
  // TypeScript 类型定义问题：https://github.com/microsoft/TypeScript/issues/33866
  var n = _constants.WP.getEntriesByType('navigation')[0];
  // Safari 11.2 版本之前不支持 Navigation Timing API
  if (!n) {
    return {};
  }
  // 缓存响应开始和结束时间，避免重复计算
  var responseStart = n.responseStart;
  var responseEnd = n.responseEnd;
  // 返回包含各种导航时间指标的对象
  return {
    // 资源获取时间：从开始获取到最后一个字节到达的时间
    fetchTime: responseEnd - n.fetchStart,
    // Service Worker 时间：Service Worker 启动到响应结束的时间
    // 如果没有 Service Worker 则返回 0
    workerTime: n.workerStart > 0 ? responseEnd - n.workerStart : 0,
    // 总网络时间：请求开始到响应结束的总时间（仅网络部分）
    totalTime: responseEnd - n.requestStart,
    // 下载时间：仅响应数据的下载时间
    downloadTime: responseEnd - responseStart,
    // 首字节时间（TTFB）：从请求开始到收到第一个字节的时间
    // 这是衡量服务器响应速度的重要指标
    timeToFirstByte: responseStart - n.requestStart,
    // HTTP 头部大小：传输大小减去编码后的主体大小
    headerSize: n.transferSize - n.encodedBodySize || 0,
    // DNS 解析时间：域名查找结束时间减去开始时间
    dnsLookupTime: n.domainLookupEnd - n.domainLookupStart,
    // TCP 建立时间：连接结束时间减去开始时间
    tcpTime: n.connectEnd - n.connectStart || 0,
    // 白屏时间：从导航开始到响应开始的时间
    // 表示用户看到页面的第一个视觉反馈的时间
    whiteTime: n.responseStart - n.navigationStart || 0,
    // DOM 渲染完成时间：从导航开始到 DOM 内容加载完成的时间
    // 表示页面结构完全渲染完成的时间
    domTime: n.domContentLoadedEventEnd - n.navigationStart || 0,
    // 页面完全加载时间：从导航开始到 onload 事件结束的时间
    // 表示页面所有资源加载完成的时间
    loadTime: n.loadEventEnd - n.navigationStart || 0,
    // 页面解析 DOM 耗时：DOM 完成时间减去 DOM 交互时间
    // 表示浏览器解析和构建 DOM 树所需的时间
    parseDomTime: n.domComplete - n.domInteractive || 0
  };
};
},{"../data/constants":"../src/data/constants.ts","../helpers/isSupported":"../src/helpers/isSupported.ts"}],"../src/data/metrics.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tbt = exports.rt = exports.metrics = exports.lcp = exports.fpEntryName = exports.fcpEntryName = exports.fcp = exports.cls = void 0;
/**
 * 性能指标存储映射表
 * 用于存储各种性能指标的测量结果
 */
var metrics = exports.metrics = {};
/**
 * CLS (Cumulative Layout Shift) 累积布局偏移指标
 * 用于衡量页面的视觉稳定性，值越小表示页面越稳定
 */
var cls = exports.cls = {
  /** CLS 指标值，默认为 0 */
  value: 0
};
/**
 * FCP (First Contentful Paint) 首次内容绘制指标
 * 用于衡量页面首次显示内容的时间，值越小表示页面加载越快
 */
var fcp = exports.fcp = {
  /** FCP 指标值，默认为 0 */
  value: 0
};
/**
 * LCP (Largest Contentful Paint) 最大内容绘制指标
 * 用于衡量页面主要内容加载完成的时间，值越小表示用户体验越好
 */
var lcp = exports.lcp = {
  /** LCP 指标值，默认为 0 */
  value: 0
};
/**
 * First Paint 性能条目的名称
 * 用于标识首次绘制的性能条目
 */
var fpEntryName = exports.fpEntryName = 'first-paint';
/**
 * First Contentful Paint 性能条目的名称
 * 用于标识首次内容绘制的性能条目
 */
var fcpEntryName = exports.fcpEntryName = 'first-contentful-paint';
/**
 * 资源时间消耗统计对象
 * 用于跟踪不同类型资源的加载时间消耗
 */
var rt = exports.rt = {
  value: {
    beacon: 0,
    // 信标请求消耗的时间
    css: 0,
    // CSS 资源加载消耗的时间
    fetch: 0,
    // Fetch API 请求消耗的时间
    img: 0,
    // 图片资源加载消耗的时间
    other: 0,
    // 其他类型资源消耗的时间
    script: 0,
    // JavaScript 脚本加载消耗的时间
    total: 0,
    // 所有资源消耗的总时间
    xmlhttprequest: 0 // XMLHttpRequest 请求消耗的时间
  }
};
/**
 * TBT (Total Blocking Time) 总阻塞时间指标
 * 用于衡量主线程被阻塞的总时间，值越小表示页面响应性越好
 * 这是衡量页面交互性能的重要指标
 */
var tbt = exports.tbt = {
  /** TBT 指标值，默认为 0 */
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
 * 检测新的布局偏移事件并更新累积布局偏移分数
 *
 * 该函数用于监控页面的视觉稳定性，通过累积计算布局偏移分数来评估用户体验。
 * CLS (Cumulative Layout Shift) 是 Core Web Vitals 的重要指标之一。
 *
 * 布局偏移检测规则：
 * 1. 只计算没有最近用户输入的布局偏移
 * 2. 累积所有有效的布局偏移值
 * 3. 确保布局偏移值的有效性
 *
 * @param performanceEntries - 性能条目数组，包含布局偏移事件的详细信息
 */
var initLayoutShift = exports.initLayoutShift = function initLayoutShift(performanceEntries) {
  // 获取最后一个布局偏移条目
  // 因为布局偏移观察器可能触发多次，我们处理最新的偏移事件
  var lastEntry = performanceEntries.pop();
  // 只计算没有最近用户输入的布局偏移
  // 这是 CLS 计算的重要规则，避免将用户主动操作导致的布局变化计入分数
  // 同时确保布局偏移值存在且有效
  if (lastEntry && !lastEntry.hadRecentInput && lastEntry.value) {
    // 累积布局偏移分数
    // cls.value 存储的是页面的累积布局偏移分数
    // 分数越高表示页面视觉稳定性越差
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
 * 用于创建和配置性能观察器，监听特定类型的性能事件
 *
 * @param eventType - 性能事件类型，如 'first-input'、'largest-contentful-paint' 等
 * @param cb - 回调函数，当性能事件触发时会被调用，接收性能条目数组作为参数
 * @returns PerformanceObserver 实例或 null（如果创建失败）
 */
var po = exports.po = function po(eventType, cb) {
  try {
    // 创建新的性能观察器实例
    var perfObserver = new PerformanceObserver(function (entryList) {
      // 当性能事件触发时，调用回调函数并传递性能条目
      cb(entryList.getEntries());
    });
    // 订阅指定类型的事件
    // buffered: true 表示不立即执行，在内存中保留 PerformanceObserver 实例
    // 这样可以捕获在观察器创建之前就已经发生的性能事件
    perfObserver.observe({
      type: eventType,
      buffered: true
    });
    return perfObserver;
  } catch (e) {
    // 如果创建观察器失败，记录警告信息
    _constants.C.warn('sdk.js:', e);
  }
  // 创建失败时返回 null
  return null;
};
/**
 * 断开性能观察器的连接并清理资源
 * 用于停止性能监控并释放内存
 *
 * @param observer - 要断开的观察器标识符
 */
var poDisconnect = exports.poDisconnect = function poDisconnect(observer) {
  // 检查观察器是否存在
  if (_observeInstances.perfObservers[observer]) {
    // 断开观察器的连接，停止监听性能事件
    _observeInstances.perfObservers[observer].disconnect();
  }
  // 从观察器实例集合中删除该观察器，释放内存
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
/**
 * 初始化首次输入延迟监控
 *
 * 该函数在首次输入事件触发后被调用，用于：
 * 1. 计算并记录 FID (First Input Delay) 指标
 * 2. 记录其他核心 Web Vitals 指标
 * 3. 清理性能观察器，避免内存泄露
 * 4. 延迟记录 TBT 和资源消耗数据
 *
 * @param performanceEntries - 性能事件时间数组，包含输入事件的详细信息
 */
var initFirstInputDelay = exports.initFirstInputDelay = function initFirstInputDelay(performanceEntries) {
  // 取最后一位即为我们希望所获取的时间点
  // 因为 FID 观察器可能触发多次，我们只需要最后一次的输入事件
  var lastEntry = performanceEntries.pop();
  if (lastEntry) {
    // Core Web Vitals FID 逻辑
    // 测量输入事件的延迟操作：从事件开始到开始处理的时间差
    // 这是衡量页面响应性的关键指标
    (0, _log.logMetric)(lastEntry.processingStart - lastEntry.startTime, 'fidVitals', {
      performanceEntry: lastEntry
    });
    // 传统的 FID 逻辑
    // 测量处理第一个输入事件的持续时间
    // 包括事件处理的总时间
    (0, _log.logMetric)(lastEntry.duration, 'fid', {
      performanceEntry: lastEntry
    });
  }
  // 销毁对 FID 的注册回调，避免过多的观察者造成内存泄露
  (0, _performanceObserver.poDisconnect)(1);
  // 初始化并记录 LCP (Largest Contentful Paint) 指标
  (0, _log.logMetric)(_metrics.lcp.value, 'lcp');
  // 如果存在 LCP 观察器，立即获取其记录
  // takeRecords() 方法可以立即获取所有待处理的性能条目
  if (_observeInstances.perfObservers[3] && typeof _observeInstances.perfObservers[3].takeRecords === 'function') {
    _observeInstances.perfObservers[3].takeRecords();
  }
  // 记录 CLS (Cumulative Layout Shift) 累积布局偏移指标
  (0, _log.logMetric)(_metrics.cls.value, 'cls');
  // 记录 TBT (Total Blocking Time) 总阻塞时间指标
  (0, _log.logMetric)(_metrics.tbt.value, 'tbt');
  // FID 触发后 5 秒延迟记录 TBT 指标
  // 这可以反映用户在首次交互后的页面响应性
  setTimeout(function () {
    (0, _log.logMetric)(_metrics.tbt.value, "tbt5S");
  }, 5000);
  // FID 触发后 10 秒延迟记录 TBT 指标和资源消耗数据
  // 这可以反映用户在首次交互后一段时间内的整体体验
  setTimeout(function () {
    (0, _log.logMetric)(_metrics.tbt.value, "tbt10S");
    // FID 被激活以后 10S 的整体数据消耗
    // 记录各种资源类型的加载时间消耗
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
/**
 * 初始化总阻塞时间监控
 *
 * 该函数用于计算页面的总阻塞时间（Total Blocking Time, TBT），
 * TBT 是衡量页面交互性能的重要指标，表示主线程被阻塞的总时间。
 *
 * 计算逻辑：
 * 1. 只统计 FCP（首次内容绘制）之后的长任务
 * 2. 只统计来自渲染帧的长任务（name === 'self'）
 * 3. 长任务是指执行时间超过 50ms 的任务
 * 4. 阻塞时间 = 任务持续时间 - 50ms（50ms 是长任务的阈值）
 *
 * 相关文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Long_Tasks_API
 *
 * @param performanceEntries - 性能条目数组，包含长任务的详细信息
 */
var initTotalBlockingTime = exports.initTotalBlockingTime = function initTotalBlockingTime(performanceEntries) {
  // 遍历所有性能条目，寻找长任务
  performanceEntries.forEach(function (entry) {
    // 从 FCP 到 TTI 获取长耗时任务
    // 只统计 name === 'self' 的任务，表示耗时长任务来自于渲染帧
    // 只统计 FCP 之后的任务，因为 FCP 之前的阻塞不影响用户交互
    if (entry.name !== 'self' || entry.startTime < _metrics.fcp.value) {
      return;
    }
    // 长耗时任务意味着执行时间超过 50ms 的任务
    // 50ms 是长任务的阈值，超过这个时间的任务被认为会阻塞主线程
    // 参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Long_Tasks_API
    var blockingTime = entry.duration - 50;
    // 只有当阻塞时间大于 0 时才累加到总阻塞时间中
    // 如果任务持续时间小于等于 50ms，则不会产生阻塞时间
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
    if (entry.name === _metrics.fpEntryName) {
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
/**
 * 初始化资源时间监控
 *
 * 该函数用于监控和分析页面中各种资源的加载性能，包括：
 * 1. 记录资源加载的详细时间信息（如果启用）
 * 2. 统计不同类型资源的体积大小
 * 3. 累积计算总资源消耗
 *
 * 支持的资源类型包括：script、css、img、fetch、xmlhttprequest 等
 *
 * @param performanceEntries - 性能条目数组，包含各种资源加载的详细信息
 */
var initResourceTiming = exports.initResourceTiming = function initResourceTiming(performanceEntries) {
  // 遍历所有资源性能条目
  performanceEntries.forEach(function (entry) {
    // 如果配置中启用了资源时间监控，则记录详细的资源时间信息
    if (_config.config.isResourceTiming) {
      (0, _log.logData)('resourceTiming', entry);
    }
    // 检查条目是否包含有效的体积信息和发起者类型
    // decodedBodySize: 解码后的资源体积（字节）
    // initiatorType: 资源发起者类型（如 script、css、img 等）
    if (entry.decodedBodySize && entry.initiatorType) {
      // 将字节转换为 KB，提高可读性
      var bodySize = entry.decodedBodySize / 1000;
      // 累加到对应资源类型的体积统计中
      // 例如：如果是 script 资源，则累加到 rt.value.script
      _metrics.rt.value[entry.initiatorType] += bodySize;
      // 同时累加到总体积统计中
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
  console.log('⏰ 性能收集开始');
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
/**
 * 检查浏览器是否支持性能API
 *
 * @returns 如果浏览器支持性能API，则返回true；否则返回false
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
/**
 * 数据上报类
 * 实现了 IReportData 接口，负责将性能监控数据发送到指定的服务器
 *
 * 支持两种上报方式：
 * 1. 紧急数据（URGENT）：使用 fetch 或 XMLHttpRequest 立即发送
 * 2. 空闲数据（IDLE）：使用 sendBeacon 或图片请求在空闲时发送
 */
var ReportData = /*#__PURE__*/function () {
  /**
   * 构造函数
   * @param options - 配置选项，必须包含 logUrl
   * @throws Error 如果没有传递 logUrl 参数
   */
  function ReportData(options) {
    _classCallCheck(this, ReportData);
    /** 日志上报的目标URL地址 */
    _defineProperty(this, "logUrl", void 0);
    var logUrl = options.logUrl;
    if (logUrl) {
      this.logUrl = logUrl;
    } else {
      throw new Error('请传递要记录数据的路由~');
    }
  }
  /**
   * 发送数据到分析服务
   * 根据优先级选择不同的上报方式，确保数据能够可靠地发送到服务器
   *
   * @param level - 数据优先级，决定上报方式和时机
   * @param body - 要上报的数据内容
   * @param uri - 可选的自定义上报URL，如果提供则覆盖默认的 logUrl
   */
  return _createClass(ReportData, [{
    key: "sendToAnalytics",
    value: function sendToAnalytics(level, body, uri) {
      // 确定最终使用的上报URL
      var logurl = this.logUrl;
      // 临时更换其他url，用于特殊场景下的数据上报
      if (uri) {
        logurl = uri;
      }
      // console.log('路由', logurl);
      // 紧急数据上报：需要立即发送的重要数据
      if (level == _types.AskPriority.URGENT) {
        // 优先使用 fetch API，支持 keepalive 选项
        if (!!_constants.W.fetch) {
          fetch(logurl, {
            body: body,
            method: 'POST',
            keepalive: true // 确保页面关闭后请求仍能完成
          });
        } else {
          // 降级到 XMLHttpRequest
          var xhr = new XMLHttpRequest();
          xhr.open('post', logurl, true);
          // 设置请求头，指定内容类型为 JSON
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(body); // 发送参数
          xhr.onload = function (e) {
            //   if (this.status == 200 || this.status == 304) {
            //     alert(this.responseText);
            //   }
            // 及时清理引用，防止多次创建导致的内存泄露
            xhr = null;
          };
        }
      }
      // 空闲数据上报：可以在空闲时发送的非紧急数据
      else if (level == _types.AskPriority.IDLE) {
        // 优先使用 sendBeacon API，专为数据上报设计
        if (!!_constants.WN.sendBeacon) {
          navigator.sendBeacon(logurl, body);
        } else {
          // 降级到图片请求方式，兼容性最好
          var img = new Image();
          img.src = "".concat(logurl, "?body=").concat(body);
          img.onload = function () {
            // 统计完成收回创建的元素，防止内存泄露
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
 * 存储空间估算报告函数
 *
 * 该函数使用 StorageManager 接口的 estimate() 方法来获取应用的存储使用情况：
 * - 应用已使用的存储空间（usage）
 * - 可用的存储空间（quota）
 * - 各种存储类型的详细使用情况
 *
 * 参考文档：https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/estimate
 *
 * @param storageInfo - StorageEstimate 对象，包含存储空间的使用和配额信息
 */
var reportStorageEstimate = exports.reportStorageEstimate = function reportStorageEstimate(storageInfo) {
  // 获取详细的存储使用情况
  // 某些浏览器可能不支持 usageDetails，需要做兼容性处理
  var estimateUsageDetails = 'usageDetails' in storageInfo ? storageInfo.usageDetails : {};
  // 记录存储空间估算数据
  // 将所有存储空间数值从字节转换为 KB，提高可读性
  (0, _log.logData)('storageEstimate', {
    quota: (0, _utils.convertToKB)(storageInfo.quota),
    // 总配额（可用存储空间）
    usage: (0, _utils.convertToKB)(storageInfo.usage),
    // 已使用存储空间
    caches: (0, _utils.convertToKB)(estimateUsageDetails.caches),
    // 缓存存储使用量
    indexedDB: (0, _utils.convertToKB)(estimateUsageDetails.indexedDB),
    // IndexedDB 存储使用量
    serviceWorker: (0, _utils.convertToKB)(estimateUsageDetails.serviceWorkerRegistrations) // Service Worker 注册存储使用量
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
/**
 * Yideng 性能监控主类
 * 负责初始化性能监控、错误跟踪、网络信息收集等功能
 */
var Yideng = exports.default = /*#__PURE__*/_createClass(
/**
 * 构造函数
 * @param options - 配置选项，包含日志URL、错误捕获、性能监控等配置
 */
function Yideng() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  _classCallCheck(this, Yideng);
  /** SDK版本号 */
  _defineProperty(this, "v", '1.0.0');
  /** 数据上报接口实例 */
  _defineProperty(this, "reportData", void 0);
  // 验证必需参数：日志上报URL
  var logUrl = options.logUrl;
  if (!logUrl) {
    throw new Error("\u7CFB\u7EDF\u76D1\u63A7\u5E73\u53F0".concat(this.v, "\u63D0\u793A\u672A\u4F20\u9012logUrl"));
  }
  // 初始化数据上报实例，用于向后台输送监控数据
  var insReportData = new _reportData.default({
    logUrl: logUrl
  });
  _config.config.reportData = insReportData;
  // 对外暴露上传接口，供外部调用
  this.reportData = insReportData;
  // 配置数据分析追踪器
  var _analyticsTracker = options.analyticsTracker;
  if (_analyticsTracker) {
    // 使用用户自定义的分析追踪器
    _config.config.analyticsTracker = _analyticsTracker;
  } else {
    // 使用默认的分析追踪器
    _config.config.analyticsTracker = _analyticsTracker2.default;
  }
  // 配置性能监控选项
  _config.config.isResourceTiming = !!options.resourceTiming; // 是否开启资源加载时间监控
  _config.config.isElementTiming = !!options.elementTiming; // 是否开启元素时间监控
  _config.config.maxTime = options.maxMeasureTime || _config.config.maxTime; // 设置最大测量时间
  // 错误监控配置
  if (options.captureError) {
    // 开启错误跟踪功能
    var errorTtace = new _error.default();
    errorTtace.run();
  }
  // 浏览器兼容性检查：如果不支持性能指标则退出
  if (!(0, _isSupported.isPerformanceSupported)()) {
    return;
  }
  // 性能观察器初始化：如果浏览器支持PerformanceObserver则启用
  if ('PerformanceObserver' in _constants.W) {
    (0, _observe.initPerformanceObserver)();
  }
  // 页面可见性变化监听初始化
  if (typeof _constants.D.hidden !== 'undefined') {
    // Opera 12.10 和 Firefox 18 及更高版本支持
    _constants.D.addEventListener('visibilitychange', _onVisibilityChange.didVisibilityChange.bind(this, _observe.disconnectPerfObserversHidden));
  }
  // 记录页面导航时间数据（DNS请求、白屏时间等）
  (0, _log.logData)('navigationTiming', (0, _getNavigationTiming.getNavigationTiming)());
  // 记录用户网络信息（H5+多普勒测速） 
  (0, _log.logData)('networkInformation', (0, _getNetworkInformation.getNetworkInformation)());
  // 管理离线缓存数据：如果浏览器支持存储估算API则启用
  if (_constants.WN && _constants.WN.storage && typeof _constants.WN.storage.estimate === 'function') {
    _constants.WN.storage.estimate().then(_storageEstimate.reportStorageEstimate);
  }
});
},{"./config":"../src/config/index.ts","./data/constants":"../src/data/constants.ts","./data/log":"../src/data/log.ts","./performance/getNavigationTiming":"../src/performance/getNavigationTiming.ts","./performance/observe":"../src/performance/observe.ts","./tools/isSupported":"../src/tools/isSupported.ts","./error":"../src/error/index.ts","./data/analyticsTracker":"../src/data/analyticsTracker.ts","./data/reportData":"../src/data/reportData.ts","./helpers/onVisibilityChange":"../src/helpers/onVisibilityChange.ts","./helpers/getNetworkInformation":"../src/helpers/getNetworkInformation.ts","./data/storageEstimate":"../src/data/storageEstimate.ts"}],"performance/index.ts":[function(require,module,exports) {
"use strict";

var _yideng = _interopRequireDefault(require("../../src/yideng"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var sdk = new _yideng.default({
  elementTiming: true,
  logUrl: 'http://123.com/test'
});
console.log('🐻', sdk);
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53070" + '/');
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