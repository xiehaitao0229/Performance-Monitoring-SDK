import { W, WP } from '../data/constants';

/**
 * 检查浏览器是否支持性能监控相关的 API
 * 
 * 该函数检查浏览器是否支持以下三个关键的性能 API：
 * 1. Navigation Timing API - 导航时间 API，用于获取页面加载性能数据
 * 2. User Timing API - 用户时间 API，用于自定义性能标记和测量
 * 3. PerformanceObserver Interface - 性能观察器接口，用于异步监控性能事件
 * 
 * 兼容性说明：
 * - 在 Safari 浏览器中，User Timing API (performance.mark()) 不可用
 * - 这会导致 DevTools 时间轴无法显示性能标记
 * - 但其他性能 API 仍然可以正常使用
 * 
 * 相关文档：
 * - Performance.mark(): https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark
 * - PerformanceObserver: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
 * - Performance.getEntriesByType: https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType
 * 
 * @returns true 表示浏览器支持性能监控 API，false 表示不支持
 */
export const isPerformanceSupported = (): boolean => {
  // 检查 performance 对象是否存在
  // 检查 getEntriesByType 方法是否可用（Navigation Timing API）
  // 检查 now 方法是否可用（高精度时间戳）
  // 检查 mark 方法是否可用（User Timing API）
  return WP && !!WP.getEntriesByType && !!WP.now && !!WP.mark;
};
