import { IPerformanceEntry } from '../typings/types';
import { fpEntryName } from '../data/metrics';
import { logMetric } from '../data/log';

export const onFP = (performanceEntries: IPerformanceEntry[]) => {
  // 遍历所有绘制性能条目
  performanceEntries.forEach((entry) => {
    if (entry.name === fpEntryName) {
      // 记录首次绘制（FP）时间
      // FP 表示页面开始渲染的第一个像素点
      logMetric(entry.startTime, 'fp');
    }
  });
};