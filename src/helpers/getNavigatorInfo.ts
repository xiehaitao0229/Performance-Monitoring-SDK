import { getDM, getHC, WN } from '../data/constants';
import { et, sd } from './getNetworkInformation';
import { getIsLowEndDevice, getIsLowEndExperience } from './isLowEnd';
import { INavigatorInfo } from '../typings/types';

/**
 * 获取浏览器导航器信息
 * 收集来自 window.navigator 的各种设备和浏览器能力信息
 * 
 * 包含以下信息：
 * 1. Device Memory - 设备内存大小（GB）
 * 2. Hardware Concurrency - 硬件并发数（CPU核心数）
 * 3. Service Worker 状态：
 *    - controlled: 页面被 service worker 控制
 *    - supported: 浏览器支持 service worker
 *    - unsupported: 用户浏览器不支持 service worker
 * 4. 低端设备判断 - 基于硬件能力的设备性能评估
 * 5. 低端体验判断 - 基于网络条件的用户体验评估
 * 
 * @returns 包含设备信息的对象，如果无法获取则返回空对象
 */
export const getNavigatorInfo = function (): INavigatorInfo {
  // 检查浏览器是否支持 navigator 对象
  if (WN) {
    return {
      // 获取设备内存大小，如果无法获取则默认为 0
      deviceMemory: getDM() || 0,
      
      // 获取硬件并发数（CPU核心数），如果无法获取则默认为 0
      hardwareConcurrency: getHC() || 0,
      
      // 判断 Service Worker 状态
      serviceWorkerStatus:
        'serviceWorker' in WN
          ? WN.serviceWorker!.controller
            ? 'controlled'    // 页面被 service worker 控制
            : 'supported'     // 支持但未控制页面
          : 'unsupported',    // 不支持 service worker
      
      // 基于硬件能力判断是否为低端设备
      isLowEndDevice: getIsLowEndDevice(),
      
      // 基于网络条件判断是否为低端体验
      // 传入网络类型(et)和节省数据模式(sd)参数
      isLowEndExperience: getIsLowEndExperience(et, sd),
    };
  }
  
  // 如果浏览器不支持 navigator 对象，返回空对象
  return {};
};
