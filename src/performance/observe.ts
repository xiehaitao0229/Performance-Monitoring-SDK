import { config } from '../config';
import { logMetric } from '../data/log';
import { cls, lcp, tbt } from '../data/metrics';
import { onLayoutShift } from './onCumulativeLayoutShift';
import { perfObservers } from './observeInstances';
import { po, poDisconnect } from './performanceObserver';
import { onResourceTiming } from './onResourceTiming';
import { onElementTiming } from './onElementTiming';
import { onFP } from './onFP';
import { onFCP} from './onFCP';
import { onLCP } from './onLCP';
import { onFID } from './onFID';
import { onTTFB } from './onTTFB';


/**
 * 初始化性能观察器
 * 
 * 该函数负责设置各种性能指标的监控，包括：
 * 1. 绘制相关指标（FP、LCP）
 * 2. 用户交互指标（FID）
 * 3. 布局稳定性指标（CLS）
 * 4. 资源加载性能（可选）
 * 5. 元素时间指标（可选）
 * 
 * 每个观察器都被存储在 perfObservers 数组中，便于后续管理和清理
 */
export const initPerformanceObserver = (): void => {
  console.log('⏰ 性能收集开始');

  // 立即计算并记录 TTFB（首字节时间）
  // TTFB 不需要观察器，直接使用 Navigation Timing API 计算
  onTTFB();

  // 监控首次绘制（First Paint）- 页面开始渲染的时间点
  perfObservers[0] = po('paint', onFP);
  perfObservers[1] = po('paint', onFCP);

  // 监控首次输入延迟（First Input Delay）- 用户首次交互的响应时间
  perfObservers[2] = po('first-input', onFID);

  // 监控最大内容绘制（Largest Contentful Paint）- 页面主要内容加载完成时间
  perfObservers[3] = po('largest-contentful-paint', onLCP);

  // 收集页面全部资源性能数据（可选功能）
  if (config.isResourceTiming) {
    console.log('📚 收集页面性能数据');
    po('resource', onResourceTiming);
  }

  // 监控布局偏移（Layout Shift）- 页面视觉稳定性指标
  perfObservers[4] = po('layout-shift', onLayoutShift);

  // 监控元素时间指标（可选功能）
  if (config.isElementTiming) {
    po('element', onElementTiming);
  }
};

/**
 * 页面隐藏时断开性能观察器连接
 * 
 * 当页面变为不可见状态时，该函数会：
 * 1. 记录最终的 LCP 值并断开观察器
 * 2. 获取 CLS 观察器的最终记录并记录最终值
 * 3. 记录最终的 TBT 值并断开观察器
 * 
 * 这样可以避免在页面不可见时继续收集性能数据，节省资源
 */
export const disconnectPerfObserversHidden = (): void => {
  // 处理 LCP 观察器：记录最终值并断开连接
  if (perfObservers[2]) {
    logMetric(lcp.value, `lcpFinal`);
    poDisconnect(2);
  }

  // 处理 CLS 观察器：获取最终记录并记录最终值
  if (perfObservers[3]) {
    // 如果观察器支持 takeRecords 方法，立即获取所有待处理的记录
    if (typeof perfObservers[3].takeRecords === 'function') {
      perfObservers[3].takeRecords();
    }
    logMetric(cls.value, `clsFinal`);
    poDisconnect(3);
  }

  // 处理 TBT 观察器：记录最终值并断开连接
  if (perfObservers[4]) {
    logMetric(tbt.value, `tbtFinal`);
    poDisconnect(4);
  }
};
