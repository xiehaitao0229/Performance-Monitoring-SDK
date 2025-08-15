import { IPerformanceEntry } from '../typings/types';
import { fcp, fcpEntryName, fpEntryName, lcp } from '../data/metrics';
import { po, poDisconnect } from './performanceObserver';
import { perfObservers } from './observeInstances';
import { initTotalBlockingTime } from './totalBlockingTime';
import { logMetric } from '../data/log';

/**
 * 初始化首次绘制监控
 * 
 * 该函数监控页面的绘制性能，包括：
 * 1. First Paint (FP) - 首次绘制时间
 * 2. First Contentful Paint (FCP) - 首次内容绘制时间
 * 
 * 当 FCP 触发后，会启动长任务监控来计算总阻塞时间（TBT）
 * 
 * @param performanceEntries - 性能条目数组，包含绘制事件的详细信息
 */
export const initFirstPaint = (performanceEntries: IPerformanceEntry[]) => {
  // 遍历所有绘制性能条目
  performanceEntries.forEach((entry) => {
    if (entry.name === fpEntryName) {
      // 记录首次绘制（FP）时间
      // FP 表示页面开始渲染的第一个像素点
      logMetric(entry.startTime, 'fp');
    } else if (entry.name === fcpEntryName) {
      // 记录首次内容绘制（FCP）时间
      // FCP 表示页面首次显示有意义内容的时间点
      fcp.value = entry.startTime;
      logMetric(fcp.value, 'fcp');
      
      // FCP 触发后，启动长任务监控
      // 长任务监控用于计算总阻塞时间（TBT），这是衡量页面交互性能的重要指标
      perfObservers[4] = po('longtask', initTotalBlockingTime);
      
      // 断开首次绘制观察器，因为 FP 和 FCP 已经获取到，不再需要继续监控
      poDisconnect(0);
    }
  });
};

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
export const initLargestContentfulPaint = (
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

/**
 * 初始化元素时间监控
 * 
 * 该函数监控页面中特定元素的性能指标，
 * 需要在 HTML 元素上添加 elementtiming 属性来启用监控。
 * 
 * 使用场景：监控关键元素的加载和渲染性能
 * 
 * @param performanceEntries - 性能条目数组，包含元素时间事件的详细信息
 */
export const initElementTiming = (performanceEntries: IPerformanceEntry[]) => {
  // 遍历所有元素时间性能条目
  performanceEntries.forEach((entry) => {
    if (entry.identifier) {
      // 记录特定元素的性能指标
      // identifier 是在 HTML 元素上设置的 elementtiming 属性值
      // 用于标识和区分不同的监控元素
      logMetric(entry.startTime, entry.identifier);
    }
  });
};
