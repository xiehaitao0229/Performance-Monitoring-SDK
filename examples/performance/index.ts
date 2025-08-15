import PerformanceSdk from '../../src/index';

const sdk = new PerformanceSdk({
  elementTiming: true,
  logUrl: 'http://123.com/test',
});

console.log('🐻', sdk);
// 模拟一个长任务
const start = Date.now();
while (Date.now() - start < 1000) {}
