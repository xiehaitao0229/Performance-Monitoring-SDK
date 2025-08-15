import { C } from '../data/constants';
import { perfObservers } from './observeInstances';
import { IPerformanceObserverType } from '../typings/types';

/**
 * PerformanceObserver 异步订阅封装
 * 用于创建和配置性能观察器，监听特定类型的性能事件
 * 
 * @param eventType - 性能事件类型，如 'first-input'、'largest-contentful-paint' 等
 * @param cb - 回调函数，当性能事件触发时会被调用，接收性能条目数组作为参数
 * @returns PerformanceObserver 实例或 null（如果创建失败）
 */
export const po = (
  eventType: IPerformanceObserverType,
  cb: (performanceEntries: any[]) => void
): PerformanceObserver | null => {
  try {
    // 创建新的性能观察器实例
    const perfObserver = new PerformanceObserver((entryList) => {
      // 当性能事件触发时，调用回调函数并传递性能条目
      cb(entryList.getEntries());
    });
    
    // 订阅指定类型的事件
    // buffered: true 表示不立即执行，在内存中保留 PerformanceObserver 实例
    // 这样可以捕获在观察器创建之前就已经发生的性能事件
    perfObserver.observe({ type: eventType, buffered: true });
    
    return perfObserver;
  } catch (e) {
    // 如果创建观察器失败，记录警告信息
    C.warn('sdk.js:', e);
  }
  
  // 创建失败时返回 null
  return null;
};

/**
 * 断开性能观察器的连接并清理资源
 * 用于停止性能监控并释放内存
 * 
 * @param observer - 要断开的观察器标识符
 */
export const poDisconnect = (observer: any) => {
  // 检查观察器是否存在
  if (perfObservers[observer]) {
    // 断开观察器的连接，停止监听性能事件
    perfObservers[observer].disconnect();
  }
  
  // 从观察器实例集合中删除该观察器，释放内存
  delete perfObservers[observer];
};
