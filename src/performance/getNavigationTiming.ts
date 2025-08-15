import { WP } from '../data/constants';
import { isPerformanceSupported } from '../helpers/isSupported';
import { IYidengNavigationTiming } from '../typings/types';

/**
 * 获取页面导航时间性能指标
 * 
 * Navigation Timing API 提供了 HTML 文档的性能指标数据。
 * 该 API 可以详细测量页面加载过程中的各个阶段耗时。
 * 
 * 相关文档：
 * - W3C 规范：https://w3c.github.io/navigation-timing/
 * - Google 开发者指南：https://developers.google.com/web/fundamentals/performance/navigation-and-resource-timing
 * 
 * @returns 包含各种导航时间指标的对象，如果浏览器不支持则返回空对象
 */
export const getNavigationTiming = (): IYidengNavigationTiming => {
  // 检查浏览器是否支持性能监控 API
  if (!isPerformanceSupported()) {
    return {};
  }
  
  // 获取导航类型的性能条目
  // 注意：这里直接使用 performance.timing 已被弃用，改用 getEntriesByType
  // TypeScript 类型定义问题：https://github.com/microsoft/TypeScript/issues/33866
  const n = WP.getEntriesByType('navigation')[0] as any;
  
  // Safari 11.2 版本之前不支持 Navigation Timing API
  if (!n) {
    return {};
  }
  
  // 缓存响应开始和结束时间，避免重复计算
  const responseStart = n.responseStart;
  const responseEnd = n.responseEnd;
  
  // 返回包含各种导航时间指标的对象
  return {
    // 资源获取时间：从开始获取到最后一个字节到达的时间
    fetchTime: responseEnd - n.fetchStart,
    
    // Service Worker 时间：Service Worker 启动到响应结束的时间
    // 如果没有 Service Worker 则返回 0
    workerTime: n.workerStart > 0 ? responseEnd - n.workerStart : 0,
    
    // 总网络时间：请求开始到响应结束的总时间（仅网络部分）
    totalTime: responseEnd - n.requestStart,
    
    // 下载时间：仅响应数据的下载时间
    downloadTime: responseEnd - responseStart,
    
    // 首字节时间（TTFB）：从请求开始到收到第一个字节的时间
    // 这是衡量服务器响应速度的重要指标
    timeToFirstByte: responseStart - n.requestStart,
    
    // HTTP 头部大小：传输大小减去编码后的主体大小
    headerSize: n.transferSize - n.encodedBodySize || 0,
    
    // DNS 解析时间：域名查找结束时间减去开始时间
    dnsLookupTime: n.domainLookupEnd - n.domainLookupStart,
    
    // TCP 建立时间：连接结束时间减去开始时间
    tcpTime: n.connectEnd - n.connectStart || 0,
    
    // 白屏时间：从导航开始到响应开始的时间
    // 表示用户看到页面的第一个视觉反馈的时间
    whiteTime: n.responseStart - n.navigationStart || 0,
    
    // DOM 渲染完成时间：从导航开始到 DOM 内容加载完成的时间
    // 表示页面结构完全渲染完成的时间
    domTime: n.domContentLoadedEventEnd - n.navigationStart || 0,
    
    // 页面完全加载时间：从导航开始到 onload 事件结束的时间
    // 表示页面所有资源加载完成的时间
    loadTime: n.loadEventEnd - n.navigationStart || 0,
    
    // 页面解析 DOM 耗时：DOM 完成时间减去 DOM 交互时间
    // 表示浏览器解析和构建 DOM 树所需的时间
    parseDomTime: n.domComplete - n.domInteractive || 0,
  };
};
