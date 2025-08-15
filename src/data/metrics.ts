import { IMetricMap, IDataConsumption } from '../typings/types';

/**
 * 性能指标存储映射表
 * 用于存储各种性能指标的测量结果
 */
export const metrics: IMetricMap = {};

/**
 * CLS (Cumulative Layout Shift) 累积布局偏移指标
 * 用于衡量页面的视觉稳定性，值越小表示页面越稳定
 */
export const cls = {
  /** CLS 指标值，默认为 0 */
  value: 0,
};

/**
 * FCP (First Contentful Paint) 首次内容绘制指标
 * 用于衡量页面首次显示内容的时间，值越小表示页面加载越快
 */
export const fcp = {
  /** FCP 指标值，默认为 0 */
  value: 0,
};

/**
 * LCP (Largest Contentful Paint) 最大内容绘制指标
 * 用于衡量页面主要内容加载完成的时间，值越小表示用户体验越好
 */
export const lcp = {
  /** LCP 指标值，默认为 0 */
  value: 0,
};

/**
 * First Paint 性能条目的名称
 * 用于标识首次绘制的性能条目
 */
export const fpEntryName = 'first-paint';

/**
 * First Contentful Paint 性能条目的名称
 * 用于标识首次内容绘制的性能条目
 */
export const fcpEntryName = 'first-contentful-paint';

/**
 * 资源时间消耗统计对象
 * 用于跟踪不同类型资源的加载时间消耗
 */
export const rt: { value: IDataConsumption } = {
  value: {
    beacon: 0,           // 信标请求消耗的时间
    css: 0,              // CSS 资源加载消耗的时间
    fetch: 0,            // Fetch API 请求消耗的时间
    img: 0,              // 图片资源加载消耗的时间
    other: 0,            // 其他类型资源消耗的时间
    script: 0,           // JavaScript 脚本加载消耗的时间
    total: 0,            // 所有资源消耗的总时间
    xmlhttprequest: 0,   // XMLHttpRequest 请求消耗的时间
  },
};

/**
 * TBT (Total Blocking Time) 总阻塞时间指标
 * 用于衡量主线程被阻塞的总时间，值越小表示页面响应性越好
 * 这是衡量页面交互性能的重要指标
 */
export const tbt = {
  /** TBT 指标值，默认为 0 */
  value: 0,
};
