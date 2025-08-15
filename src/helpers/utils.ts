import { W } from '../data/constants';

/**
 * 数值四舍五入到两位小数
 * 使用 toFixed(2) 方法进行精度控制，然后转换为浮点数
 * 
 * @param num - 需要处理的数值
 * @returns 四舍五入到两位小数的浮点数
 */
export const roundByTwo = (num: number) => {
  return parseFloat(num.toFixed(2));
};

/**
 * 将字节数转换为千字节（KB）
 * 将字节数除以 1024^2 得到 KB 值，并保留两位小数
 * 
 * @param bytes - 字节数
 * @returns 转换后的 KB 值，如果输入无效则返回 null
 */
export const convertToKB = (bytes: number): number | null => {
  // 验证输入参数是否为有效数字
  if (typeof bytes !== 'number') {
    return null;
  }
  
  // 将字节转换为 KB：1 KB = 1024^2 字节
  // 使用 roundByTwo 函数保留两位小数
  return roundByTwo(bytes / Math.pow(1024, 2));
};

/**
 * 推送任务到 requestIdleCallback
 * 高效利用浏览器的空闲时间进行数据收集，避免阻塞主线程
 * 
 * 如果浏览器支持 requestIdleCallback，则使用它来调度任务
 * 如果不支持，则立即执行回调函数
 * 
 * @param cb - 需要执行的回调函数
 */
export const pushTask = (cb: any): void => {
  // 检查浏览器是否支持 requestIdleCallback API
  if ('requestIdleCallback' in W) {
    // 使用 requestIdleCallback 在浏览器空闲时执行任务
    // timeout: 3000 表示最多等待 3 秒，如果一直没有空闲时间则强制执行
    (W as any).requestIdleCallback(cb, { timeout: 3000 });
  } else {
    // 浏览器不支持 requestIdleCallback，立即执行回调函数
    cb();
  }
};
