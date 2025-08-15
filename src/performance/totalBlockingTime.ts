import { fcp, tbt } from '../data/metrics';
import { IPerformanceEntry } from '../typings/types';

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
export const initTotalBlockingTime = (
  performanceEntries: IPerformanceEntry[]
): void => {
  // 遍历所有性能条目，寻找长任务
  performanceEntries.forEach((entry) => {
    // 从 FCP 到 TTI 获取长耗时任务
    // 只统计 name === 'self' 的任务，表示耗时长任务来自于渲染帧
    // 只统计 FCP 之后的任务，因为 FCP 之前的阻塞不影响用户交互
    if (entry.name !== 'self' || entry.startTime < fcp.value) {
      return;
    }
    
    // 长耗时任务意味着执行时间超过 50ms 的任务
    // 50ms 是长任务的阈值，超过这个时间的任务被认为会阻塞主线程
    // 参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Long_Tasks_API
    const blockingTime = entry.duration - 50;
    
    // 只有当阻塞时间大于 0 时才累加到总阻塞时间中
    // 如果任务持续时间小于等于 50ms，则不会产生阻塞时间
    if (blockingTime > 0) {
      tbt.value += blockingTime;
    }
  });
};
