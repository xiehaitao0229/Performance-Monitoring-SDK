sdk开发准备

1. 准备编译环境 ts/js 文件
2. rollup esbuild(vite-golang) swc(rust对标babel 构建速度)
3. 目标 umd cmd amd esmodule commonjs2 x.min.js → microbundle
4. 分成2部分
 源代码 GitHub 一部分 dist + package.json[npm login ,npm publish]

5. yideng.d.ts api-extractor合并程序一个microbundle独立的
dist package.json types:"yideng.d.ts"
6. micro 原分散的d.ts 外面某个文件夹A 
    api → 外面某个文件夹A → index.d.ts → dist → npm包
7. ts-doc/js-doc + typedoc
8. 性能监控 + 错误监控 + 用户回溯 (用户操作轨迹+还原sourcemap)
9. 开发过程中 直接把ts文件引入到浏览器里 parcel自带ts livereload
10. sdk开发原则 不能去影响用户层 (业务逻辑主线程+网络 fetch)
11. requestIdleCallback+macrotask sendBeacon+img(日志服务器)+
13. 根据优先级 → 微信 邮箱 电话 短信 1分钟
14. 实现轨迹
    14-1. 一张张的图 html-canvas base64
    14-2. 第二种 video api 允许 录屏上传
    14-3. 简单粗暴
        写一段代码 代理掉全部的 click mousedown ...
        第二段代码 留存栈 30 [xpath] body/[5]div/[3]li/[1]a
        第三段代码 监控错误 压缩 → 服务器 → 清空
        第四段代码 Playwright → xpath(点点) → 截图 → 合成工具
    14-4. 精细化
        页面全量快照 转换
        转成虚拟dom(id)
        虚拟dom换成dom
        MutationObserver监控
        监控input可以了
        canvas hack api