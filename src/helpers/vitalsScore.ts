import { IYidengData, IVitalsScore } from '../typings/types';

// Web Vitals 评分标准阈值定义
// 参考标准：https://web.dev/vitals/
// 这些阈值用于评估网页性能指标的质量等级

// FCP (First Contentful Paint) 评分阈值：1000ms 为优秀，2500ms 为需要改进
const fcpScore = [1000, 2500];

// LCP (Largest Contentful Paint) 评分阈值：2500ms 为优秀，4000ms 为需要改进
const lcpScore = [2500, 4000];

// FID (First Input Delay) 评分阈值：100ms 为优秀，300ms 为需要改进
const fidcore = [100, 300];

// CLS (Cumulative Layout Shift) 评分阈值：0.1 为优秀，0.25 为需要改进
const clsScore = [0.1, 0.25];

// TBT (Total Blocking Time) 评分阈值：300ms 为优秀，600ms 为需要改进
const tbtScore = [300, 600];

/**
 * Web Vitals 评分标准映射表
 * 将各种性能指标名称映射到对应的评分阈值数组
 * 每个阈值数组包含两个值：[优秀阈值, 需要改进阈值]
 */
export const webVitalsScore: Record<string, number[]> = {
  // First Paint 和 First Contentful Paint 使用相同的评分标准
  fp: fcpScore,      // First Paint
  fcp: fcpScore,     // First Contentful Paint
  
  // Largest Contentful Paint 相关指标
  lcp: lcpScore,     // Largest Contentful Paint
  lcpFinal: lcpScore, // LCP 最终值
  
  // First Input Delay 相关指标
  fid: fidcore,      // First Input Delay
  fidVitals: fidcore, // FID Vitals 指标
  
  // Cumulative Layout Shift 相关指标
  cls: clsScore,     // Cumulative Layout Shift
  clsFinal: clsScore, // CLS 最终值
  
  // Total Blocking Time 相关指标
  tbt: tbtScore,     // Total Blocking Time
  tbt5S: tbtScore,   // 5秒内的 TBT
  tbt10S: tbtScore,  // 10秒内的 TBT
  tbtFinal: tbtScore, // TBT 最终值
};

/**
 * 根据性能指标名称和值计算 Web Vitals 评分
 * 将数值性能指标转换为可读的质量等级
 * 
 * @param measureName - 性能指标名称，如 'fcp'、'lcp'、'cls' 等
 * @param value - 性能指标的具体数值
 * @returns 性能评分等级：'good'（优秀）、'needsImprovement'（需要改进）、'poor'（较差）或 null（未知指标）
 */
export const getVitalsScore = (
  measureName: string,
  value: IYidengData
): IVitalsScore => {
  // 检查指标名称是否在评分标准中存在
  if (!webVitalsScore[measureName]) {
    return null;
  }
  
  // 获取该指标的评分阈值
  const thresholds = webVitalsScore[measureName];
  
  // 根据数值与阈值的比较确定评分等级
  if (value <= thresholds[0]) {
    // 数值小于等于第一个阈值，评为优秀
    return 'good';
  }
  
  // 数值小于等于第二个阈值，评为需要改进，否则评为较差
  return value <= thresholds[1] ? 'needsImprovement' : 'poor';
};