import { cls } from '../data/metrics';
import { IPerformanceEntry } from '../typings/types';

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
export const onLayoutShift = (performanceEntries: IPerformanceEntry[]) => {
  // 获取最后一个布局偏移条目
  // 因为布局偏移观察器可能触发多次，我们处理最新的偏移事件
  const lastEntry = performanceEntries.pop();
  
  // 只计算没有最近用户输入的布局偏移
  // 这是 CLS 计算的重要规则，避免将用户主动操作导致的布局变化计入分数
  // 同时确保布局偏移值存在且有效
  if (lastEntry && !lastEntry.hadRecentInput && lastEntry.value) {
    // 累积布局偏移分数
    // cls.value 存储的是页面的累积布局偏移分数
    // 分数越高表示页面视觉稳定性越差
    cls.value += lastEntry.value;
  }
};
