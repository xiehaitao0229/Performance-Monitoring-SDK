import { config } from '../config';
import { reportPerf } from '../data/reportPerf';
import { roundByTwo } from '../helpers/utils';

/**
 * 记录并上报性能指标数据
 * 将传入的指标数据中的数值进行四舍五入处理，然后发送到外部跟踪服务
 * 
 * @param measureName - 指标名称，用于标识不同类型的性能数据
 * @param metric - 指标数据对象，包含各种性能指标值
 * @param customProperties - 可选的自定义属性，用于添加额外的上下文信息
 */
export const logData = (
  measureName: string,
  metric: any,
  customProperties?: object
): void => {
  // 遍历指标对象的所有属性，对数值类型的属性进行精度处理
  Object.keys(metric).forEach((key) => {
    if (typeof metric[key] === 'number') {
      // 将数值四舍五入到两位小数，提高数据的一致性和可读性
      metric[key] = roundByTwo(metric[key]);
    }
  });
  
  // 将处理后的指标数据发送到外部跟踪服务
  reportPerf(measureName, metric, customProperties);
};

/**
 * 记录并上报性能指标持续时间
 * 将指标持续时间分发到内部日志和外部时间跟踪服务
 * 
 * @param duration - 持续时间（毫秒），表示某个操作的执行时间
 * @param measureName - 指标名称，用于标识性能指标类型
 * @param customProperties - 可选的自定义属性，用于添加额外的上下文信息
 */
export const logMetric = (
  duration: number,
  measureName: string,
  customProperties?: object
): void => {
  // 将持续时间四舍五入到两位小数
  const duration2Decimal = roundByTwo(duration);
  
  // 验证持续时间的有效性：必须在配置的最大时间范围内且为非负数
  if (duration2Decimal <= config.maxTime && duration2Decimal >= 0) {
    // 从内部或者外部的报告工具报告指标数据
    reportPerf(measureName, duration2Decimal, customProperties);
  }
};
