import { W, WP } from '../data/constants';

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
export const isPerformanceSupported = (): boolean => {
  return WP && !!WP.getEntriesByType && !!WP.now && !!WP.mark;
};
