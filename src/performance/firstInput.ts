import { logData, logMetric } from '../data/log';
import { cls, lcp, rt, tbt } from '../data/metrics';
import { perfObservers } from './observeInstances';
import { poDisconnect } from './performanceObserver';
import { PerformanceEventTiming } from '../typings/types';

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
export const initFirstInputDelay = (
  performanceEntries: PerformanceEventTiming[]
) => {
  // 取最后一位即为我们希望所获取的时间点
  // 因为 FID 观察器可能触发多次，我们只需要最后一次的输入事件
  const lastEntry = performanceEntries.pop();
  
  if (lastEntry) {
    // Core Web Vitals FID 逻辑
    // 测量输入事件的延迟操作：从事件开始到开始处理的时间差
    // 这是衡量页面响应性的关键指标
    logMetric(lastEntry.processingStart - lastEntry.startTime, 'fidVitals', {
      performanceEntry: lastEntry,
    });
    
    // 传统的 FID 逻辑
    // 测量处理第一个输入事件的持续时间
    // 包括事件处理的总时间
    logMetric(lastEntry.duration, 'fid', {
      performanceEntry: lastEntry,
    });
  }
  
  // 销毁对 FID 的注册回调，避免过多的观察者造成内存泄露
  poDisconnect(1);
  
  // 初始化并记录 LCP (Largest Contentful Paint) 指标
  logMetric(lcp.value, 'lcp');
  
  // 如果存在 LCP 观察器，立即获取其记录
  // takeRecords() 方法可以立即获取所有待处理的性能条目
  if (perfObservers[3] && typeof perfObservers[3].takeRecords === 'function') {
    perfObservers[3].takeRecords();
  }
  
  // 记录 CLS (Cumulative Layout Shift) 累积布局偏移指标
  logMetric(cls.value, 'cls');
  
  // 记录 TBT (Total Blocking Time) 总阻塞时间指标
  logMetric(tbt.value, 'tbt');
  
  // FID 触发后 5 秒延迟记录 TBT 指标
  // 这可以反映用户在首次交互后的页面响应性
  setTimeout(() => {
    logMetric(tbt.value, `tbt5S`);
  }, 5000);
  
  // FID 触发后 10 秒延迟记录 TBT 指标和资源消耗数据
  // 这可以反映用户在首次交互后一段时间内的整体体验
  setTimeout(() => {
    logMetric(tbt.value, `tbt10S`);
    
    // FID 被激活以后 10S 的整体数据消耗
    // 记录各种资源类型的加载时间消耗
    logData('dataConsumption', rt.value);
  }, 10000);
};
