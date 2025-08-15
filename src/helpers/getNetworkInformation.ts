import { WN } from '../data/constants';
import {
  EffectiveConnectionType,
  IYidengNetworkInformation,
} from '../typings/types';

/**
 * 网络连接类型
 * 用于存储当前网络的有效连接类型，默认为 '4g'
 */
export let et: EffectiveConnectionType = '4g';

/**
 * 节省数据模式状态
 * 表示用户是否启用了节省数据模式，默认为 false
 */
export let sd = false;

/**
 * 获取网络连接信息
 * 从浏览器的 Network Information API 获取网络状态信息
 * 包括下行带宽、有效连接类型、往返时间等
 * 
 * 如果浏览器不支持 Network Information API，则返回空对象
 * 未来计划实现多普勒测速法或图片探测法作为备选方案
 * 
 * @returns 网络信息对象，包含下行带宽、连接类型、RTT等信息
 */
export const getNetworkInformation = (): IYidengNetworkInformation => {
  // 检查浏览器是否支持 Network Information API
  if ('connection' in WN) {
    // 获取网络连接对象
    const dataConnection = (WN as any).connection;
    
    // 验证连接对象是否为有效对象
    if (typeof dataConnection !== 'object') {
      return {};
    }
    
    // 更新全局变量：有效连接类型
    et = dataConnection.effectiveType;
    
    // 更新全局变量：节省数据模式状态
    sd = !!dataConnection.saveData;
    
    // 返回完整的网络信息对象
    return {
      downlink: dataConnection.downlink,           // 下行带宽（Mbps）
      effectiveType: dataConnection.effectiveType, // 有效连接类型（如 4g、3g 等）
      rtt: dataConnection.rtt,                     // 往返时间（毫秒）
      saveData: !!dataConnection.saveData,         // 是否启用节省数据模式
    };
  } else {
    // 浏览器不支持 Network Information API
    // TODO: 这里我们使用多普勒测速法或者直接用图片探测法
    // 作为获取网络信息的备选方案
  }
  
  // 如果无法获取网络信息，返回空对象
  return {};
};
