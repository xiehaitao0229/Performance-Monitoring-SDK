import { logMetric } from '../data/log';
import { WP } from '../data/constants';
import { isPerformanceSupported } from '../helpers/isSupported';

/**
 * 初始化首字节时间监控
 * 
 * 该函数用于计算并记录页面的 TTFB（Time to First Byte）指标，
 * TTFB 是衡量服务器响应速度的重要指标，表示从请求开始到收到第一个字节的时间。
 * 
 * 与其他性能指标不同，TTFB 不需要 PerformanceObserver，
 * 而是直接使用 Navigation Timing API 进行一次性计算。
 * 
 * 计算逻辑：
 * TTFB = responseStart - requestStart
 * 
 * 相关文档：
 * - Navigation Timing API: https://developer.mozilla.org/zh-CN/docs/Web/API/Navigation_timing_API
 * - TTFB 指标说明: https://web.dev/ttfb/
 */
export const onTTFB = (): void => {
  // 检查浏览器是否支持性能监控 API
  if (!isPerformanceSupported()) {
    return;
  }

  try {
    // 获取导航类型的性能条目
    const navigationEntry = WP.getEntriesByType('navigation')[0] as any;
    
    // Safari 11.2 版本之前不支持 Navigation Timing API
    if (!navigationEntry) {
      return;
    }
    
    // 计算首字节时间（TTFB）
    // requestStart: 浏览器开始向服务器发送请求的时间
    // responseStart: 浏览器收到服务器响应第一个字节的时间
    const ttfbValue = navigationEntry.responseStart - navigationEntry.requestStart;
    
    // 确保 TTFB 值有效（大于 0）
    if (ttfbValue > 0) {
      // 记录 TTFB 指标
      logMetric(ttfbValue, 'ttfb');
    }
  } catch (e) {
    // 如果获取 TTFB 失败，静默处理
    // 避免影响其他性能监控功能
  }
};