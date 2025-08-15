import { IPerformanceEntry } from '../typings/types';
import { logMetric } from '../data/log';

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
export const onElementTiming = (performanceEntries: IPerformanceEntry[]) => {
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