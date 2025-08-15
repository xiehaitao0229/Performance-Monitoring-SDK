import Yideng from '../../src/yideng';

const yideng = new Yideng({
  elementTiming: true,
  logUrl: 'http://123.com/test',
});

console.log('🐻', yideng);
// 模拟一个长任务
const start = Date.now();
while (Date.now() - start < 1000) {}
