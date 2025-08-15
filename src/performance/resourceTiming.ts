import { config } from '../config';
import { logData } from '../data/log';
import { rt } from '../data/metrics';
import { IPerformanceEntry } from '../typings/types';

/**
 * 初始化资源时间监控
 * 
 * 该函数用于监控和分析页面中各种资源的加载性能，包括：
 * 1. 记录资源加载的详细时间信息（如果启用）
 * 2. 统计不同类型资源的体积大小
 * 3. 累积计算总资源消耗
 * 
 * 支持的资源类型包括：script、css、img、fetch、xmlhttprequest 等
 * 
 * @param performanceEntries - 性能条目数组，包含各种资源加载的详细信息
 */
export const initResourceTiming = (performanceEntries: IPerformanceEntry[]) => {
  // 遍历所有资源性能条目
  performanceEntries.forEach((entry) => {
    // 如果配置中启用了资源时间监控，则记录详细的资源时间信息
    if (config.isResourceTiming) {
      logData('resourceTiming', entry);
    }
    
    // 检查条目是否包含有效的体积信息和发起者类型
    // decodedBodySize: 解码后的资源体积（字节）
    // initiatorType: 资源发起者类型（如 script、css、img 等）
    if (entry.decodedBodySize && entry.initiatorType) {
      // 将字节转换为 KB，提高可读性
      const bodySize = entry.decodedBodySize / 1000;
      
      // 累加到对应资源类型的体积统计中
      // 例如：如果是 script 资源，则累加到 rt.value.script
      rt.value[entry.initiatorType] += bodySize;
      
      // 同时累加到总体积统计中
      rt.value.total += bodySize;
    }
  });
};
