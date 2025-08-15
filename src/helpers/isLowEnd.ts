import { getDM, getHC } from '../data/constants';
import { EffectiveConnectionType } from '../typings/types';

/**
 * 判断是否为低端设备
 * 基于硬件能力（CPU核心数和内存大小）来评估设备性能
 * 
 * 判断标准：
 * - CPU核心数 ≤ 4 个
 * - 设备内存 ≤ 4GB
 * 
 * @returns true 表示低端设备，false 表示中高端设备
 */
export const getIsLowEndDevice = (): boolean => {
  // 检查CPU核心数：如果逻辑处理器数量 ≤ 4，则认为是低端设备
  if (getHC() && getHC() <= 4) {
    return true;
  }
  
  // 检查设备内存：如果可用内存 ≤ 4GB，则认为是低端设备
  if (getDM() && getDM() <= 4) {
    return true;
  }
  
  // 如果CPU核心数 > 4 且内存 > 4GB，则认为是中高端设备
  return false;
};

/**
 * 判断是否为低端用户体验
 * 综合考虑网络连接类型、节省数据模式和设备硬件能力
 * 
 * @param et - 有效连接类型，如 'slow-2g'、'2g'、'3g'、'4g' 等
 * @param sd - 是否启用节省数据模式
 * @returns true 表示低端用户体验，false 表示中高端用户体验
 */
export const getIsLowEndExperience = (
  et: EffectiveConnectionType,
  sd: boolean
): boolean => {
  // 根据网络连接类型判断用户体验质量
  // 如果连接类型不是 4g，则认为是低端体验
  switch (et) {
    case 'slow-2g':
      // 极慢的2G网络，用户体验较差
      return true;
      break;
    case '2g':
      // 2G网络，用户体验较差
      return true;
      break;
    case '3g':
      // 3G网络，用户体验一般
      return true;
      break;
    default:
      // 4G或更好的网络连接
      // 此时需要综合考虑设备硬件能力和节省数据模式
      // 如果设备本身是低端设备，或者启用了节省数据模式，则认为是低端体验
      return getIsLowEndDevice() || sd;
  }
};
