/**
 * 一款免费的开源性能监控SDK
 *
 * @remarks
 * 目前能够完成监控的指标包含FCP等
 *
 * @packageDocumentation
 */
import { config } from './config';
import { D, W, WN, WP } from './data/constants';
import { logData } from './data/log';
import { getNavigationTiming } from './performance/getNavigationTiming';
import {
  disconnectPerfObserversHidden,
  initPerformanceObserver,
} from './performance/observe';
import { isPerformanceSupported } from './tools/isSupported';
import { IReportData, IYidengOptions } from './typings/types';
import ErrorTrace from './error';
import analyticsTracker from './data/analyticsTracker';
import ReportData from './data/reportData';
import { didVisibilityChange } from './helpers/onVisibilityChange';
import { getNetworkInformation } from './helpers/getNetworkInformation';
import { reportStorageEstimate } from './data/storageEstimate';

/**
 * Yideng 性能监控主类
 * 负责初始化性能监控、错误跟踪、网络信息收集等功能
 */
export default class Yideng {
  /** SDK版本号 */
  private v = '1.0.0';
  
  /** 数据上报接口实例 */
  private reportData: IReportData;

  /**
   * 构造函数
   * @param options - 配置选项，包含日志URL、错误捕获、性能监控等配置
   */
  constructor(options: IYidengOptions = {}) {
    // 验证必需参数：日志上报URL
    const logUrl = options.logUrl;
    if (!logUrl) {
      throw new Error(`系统监控平台${this.v}提示未传递logUrl`);
    }

    // 初始化数据上报实例，用于向后台输送监控数据
    const insReportData = new ReportData({
      logUrl,
    });
    config.reportData = insReportData;
    
    // 对外暴露上传接口，供外部调用
    this.reportData = insReportData;

    // 配置数据分析追踪器
    const _analyticsTracker = options.analyticsTracker;
    if (_analyticsTracker) {
      // 使用用户自定义的分析追踪器
      config.analyticsTracker = _analyticsTracker;
    } else {
      // 使用默认的分析追踪器
      config.analyticsTracker = analyticsTracker;
    }

    // 配置性能监控选项
    config.isResourceTiming = !!options.resourceTiming;      // 是否开启资源加载时间监控
    config.isElementTiming = !!options.elementTiming;        // 是否开启元素时间监控
    config.maxTime = options.maxMeasureTime || config.maxTime; // 设置最大测量时间

    // 错误监控配置
    if (options.captureError) {
      // 开启错误跟踪功能
      const errorTtace = new ErrorTrace();
      errorTtace.run();
    }

    // 浏览器兼容性检查：如果不支持性能指标则退出
    if (!isPerformanceSupported()) {
      return;
    }

    // 性能观察器初始化：如果浏览器支持PerformanceObserver则启用
    if ('PerformanceObserver' in W) {
      initPerformanceObserver();
    }

    // 页面可见性变化监听初始化
    if (typeof D.hidden !== 'undefined') {
      // Opera 12.10 和 Firefox 18 及更高版本支持
      D.addEventListener(
        'visibilitychange',
        didVisibilityChange.bind(this, disconnectPerfObserversHidden)
      );
    }

    // 记录页面导航时间数据（DNS请求、白屏时间等）
    logData('navigationTiming', getNavigationTiming());
    
    // 记录用户网络信息（H5+多普勒测速） 
    logData('networkInformation', getNetworkInformation());
    
    // 管理离线缓存数据：如果浏览器支持存储估算API则启用
    if (WN && WN.storage && typeof WN.storage.estimate === 'function') {
      WN.storage.estimate().then(reportStorageEstimate);
    }
  }
}
