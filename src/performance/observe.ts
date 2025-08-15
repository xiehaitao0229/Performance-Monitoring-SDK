import { config } from '../config';
import { logMetric } from '../data/log';
import { cls, lcp, tbt } from '../data/metrics';
import { onLayoutShift } from './onCumulativeLayoutShift';
import { perfObservers } from './observeInstances';
import { po, poDisconnect } from './performanceObserver';
import { onResourceTiming } from './onResourceTiming';
import { onElementTiming } from './onElementTiming';
import { onFP } from './onFP';
import { onFCP } from './onFCP';
import { onLCP } from './onLCP';
import { onFID } from './onFID';
import { onTTFB } from './onTTFB';
import { onINP,getINPValue } from './onINP';

/**
 * 初始化性能观察器
 * 设置各种性能指标的监控
 */
export const initPerformanceObserver = (): void => {
  console.log('⏰ 性能收集开始');

  // 计算 TTFB（首字节时间）
  onTTFB();

  // 监控首次绘制（FP）
  perfObservers[0] = po('paint', onFP);
  
  // 监控首次内容绘制（FCP）
  perfObservers[1] = po('paint', onFCP);

  // 监控首次输入延迟（FID）
  perfObservers[2] = po('first-input', onFID);

  // 监控最大内容绘制（LCP）
  perfObservers[3] = po('largest-contentful-paint', onLCP);

  // 监控资源加载性能（可选）
  if (config.isResourceTiming) {
    console.log('�� 收集页面性能数据');
    po('resource', onResourceTiming);
  }

  // 监控布局偏移（CLS）
  perfObservers[4] = po('layout-shift', onLayoutShift);

  // 监控元素时间指标（可选）
  if (config.isElementTiming) {
    po('element', onElementTiming);
  }

  // 监控交互响应性（INP）
  perfObservers[6] = po('event', onINP);
};

/**
 * 页面隐藏时断开性能观察器连接
 * 记录最终值并清理资源
 */
export const disconnectPerfObserversHidden = (): void => {
  // 记录最终 LCP 值并断开连接
  if (perfObservers[2]) {
    logMetric(lcp.value, `lcpFinal`);
    poDisconnect(2);
  }

  // 记录最终 CLS 值并断开连接
  if (perfObservers[3]) {
    if (typeof perfObservers[3].takeRecords === 'function') {
      perfObservers[3].takeRecords();
    }
    logMetric(cls.value, `clsFinal`);
    poDisconnect(3);
  }

  // 记录最终 TBT 值并断开连接
  if (perfObservers[4]) {
    logMetric(tbt.value, `tbtFinal`);
    poDisconnect(4);
  }

  // 记录最终 INP 值并断开连接
  if (perfObservers[6]) {
    console.log('🎯 记录最终 INP 值');
    const finalINP = getINPValue();
    if (finalINP.value > 0) {
      logMetric(finalINP.value, `inpFinal`, finalINP);
    }
    poDisconnect(6);
  }
};