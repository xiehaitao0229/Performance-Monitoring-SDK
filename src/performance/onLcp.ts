import { IPerformanceEntry } from '../typings/types';
import { lcp } from '../data/metrics';

/**
 * 初始化最大内容绘制监控
 * 
 * 该函数监控页面的最大内容绘制（LCP）指标，
 * LCP 是 Core Web Vitals 的重要指标，表示页面主要内容加载完成的时间。
 * 
 * 注意：LCP 观察器会持续监控，直到页面隐藏或用户交互
 * 
 * @param performanceEntries - 性能条目数组，包含 LCP 事件的详细信息
 */
export const onLCP = (
    performanceEntries: IPerformanceEntry[]
  ) => {
    // 获取最后一个 LCP 条目
    // 因为 LCP 可能在页面加载过程中多次更新，我们取最新的值
    const lastEntry = performanceEntries.pop();
    
    if (lastEntry) {
      // 使用 renderTime 或 loadTime 作为 LCP 值
      // renderTime: 元素渲染完成的时间
      // loadTime: 元素加载完成的时间
      lcp.value = lastEntry.renderTime || lastEntry.loadTime;
    }
  };