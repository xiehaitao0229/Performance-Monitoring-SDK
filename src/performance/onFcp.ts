import { IPerformanceEntry } from '../typings/types';
import { fcp, fcpEntryName, fpEntryName } from '../data/metrics';
import { po, poDisconnect } from './performanceObserver';
import { perfObservers } from './observeInstances';
import { onTBT } from './onTBT';
import { logMetric } from '../data/log';

export const onFCP = (performanceEntries: IPerformanceEntry[]) => {
  // 遍历所有绘制性能条目
  performanceEntries.forEach((entry) => {
    if (entry.name === fcpEntryName) {
      // 记录首次内容绘制（FCP）时间
      // FCP 表示页面首次显示有意义内容的时间点
      fcp.value = entry.startTime;
      logMetric(fcp.value, 'fcp');
      // FCP 触发后，启动长任务监控
      // 长任务监控用于计算总阻塞时间（TBT），这是衡量页面交互性能的重要指标
      perfObservers[5] = po('longtask', onTBT);

      // 断开首次绘制观察器，因为 FP 和 FCP 已经获取到，不再需要继续监控
      poDisconnect(0);
    }
  });
};