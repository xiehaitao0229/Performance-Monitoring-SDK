import { logData } from './log';
import { convertToKB } from '../helpers/utils';

/**
 * 存储空间估算报告函数
 * 
 * 该函数使用 StorageManager 接口的 estimate() 方法来获取应用的存储使用情况：
 * - 应用已使用的存储空间（usage）
 * - 可用的存储空间（quota）
 * - 各种存储类型的详细使用情况
 * 
 * 参考文档：https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/estimate
 * 
 * @param storageInfo - StorageEstimate 对象，包含存储空间的使用和配额信息
 */
export const reportStorageEstimate = (storageInfo: StorageEstimate) => {
  // 获取详细的存储使用情况
  // 某些浏览器可能不支持 usageDetails，需要做兼容性处理
  const estimateUsageDetails =
    'usageDetails' in storageInfo ? (storageInfo as any).usageDetails : {};
  
  // 记录存储空间估算数据
  // 将所有存储空间数值从字节转换为 KB，提高可读性
  logData('storageEstimate', {
    quota: convertToKB((storageInfo as any).quota),                    // 总配额（可用存储空间）
    usage: convertToKB((storageInfo as any).usage),                    // 已使用存储空间
    caches: convertToKB(estimateUsageDetails.caches),                  // 缓存存储使用量
    indexedDB: convertToKB(estimateUsageDetails.indexedDB),            // IndexedDB 存储使用量
    serviceWorker: convertToKB(estimateUsageDetails.serviceWorkerRegistrations), // Service Worker 注册存储使用量
  });
};
