/**
 * 浏览器导航器接口扩展
 * 为 navigator 对象添加额外的属性和方法类型定义
 */
interface Navigator {
  /** 存储空间估算方法 */
  estimate: any;
  /** 存储相关功能 */
  storage: any;
  /** 设备内存大小（GB） */
  deviceMemory?: number;
  /** 硬件并发数（CPU核心数） */
  hardwareConcurrency?: number;
  /** 网络连接类型 */
  connection?: string;
  /** 有效连接类型（如 4g、3g 等） */
  effectiveType?: string;
  /** Service Worker 相关功能 */
  serviceWorker?: {
    /** Service Worker 控制器 */
    controller?: string;
  };
  /** 发送信标数据的方法 */
  sendBeacon?: any;
}

// 全局对象引用，提供便捷访问
/** 全局 window 对象引用 */
export const W = window;

/** 全局 console 对象引用，用于日志输出 */
export const C = W.console;

/** 全局 document 对象引用，用于DOM操作 */
export const D = document;

/** 全局 navigator 对象引用，类型转换为扩展的 Navigator 接口 */
export const WN = (W.navigator as unknown) as Navigator;

/** 全局 performance 对象引用，用于性能监控 */
export const WP = W.performance;

/**
 * 获取设备内存大小
 * 从 navigator.deviceMemory 获取设备内存信息，如果不支持则返回 0
 * 
 * @returns 设备内存大小（GB），如果不支持则返回 0
 */
export const getDM = () => WN.deviceMemory ?? 0;

/**
 * 获取硬件并发数
 * 从 navigator.hardwareConcurrency 获取CPU核心数，如果不支持则返回 0
 * 
 * @returns CPU核心数，如果不支持则返回 0
 */
export const getHC = () => WN.hardwareConcurrency ?? 0;
