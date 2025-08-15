import { AskPriority, IReportData } from '../typings/types';
import { W, WN } from './constants';

/**
 * 数据上报工具配置选项
 */
type TrackerOptions = {
  /** 日志上报的目标URL地址 */
  logUrl: string;
};

/**
 * 数据上报类
 * 实现了 IReportData 接口，负责将性能监控数据发送到指定的服务器
 * 
 * 支持两种上报方式：
 * 1. 紧急数据（URGENT）：使用 fetch 或 XMLHttpRequest 立即发送
 * 2. 空闲数据（IDLE）：使用 sendBeacon 或图片请求在空闲时发送
 */
class ReportData implements IReportData {
  /** 日志上报的目标URL地址 */
  private logUrl: string;

  /**
   * 构造函数
   * @param options - 配置选项，必须包含 logUrl
   * @throws Error 如果没有传递 logUrl 参数
   */
  constructor(options: TrackerOptions) {
    const { logUrl } = options;
    if (logUrl) {
      this.logUrl = logUrl;
    } else {
      throw new Error('请传递要记录数据的路由~');
    }
  }

  /**
   * 发送数据到分析服务
   * 根据优先级选择不同的上报方式，确保数据能够可靠地发送到服务器
   * 
   * @param level - 数据优先级，决定上报方式和时机
   * @param body - 要上报的数据内容
   * @param uri - 可选的自定义上报URL，如果提供则覆盖默认的 logUrl
   */
  public sendToAnalytics(level: AskPriority, body: string, uri?: string) {
    // 确定最终使用的上报URL
    let logurl = this.logUrl;
    // 临时更换其他url，用于特殊场景下的数据上报
    if (uri) {
      logurl = uri;
    }
    // console.log('路由', logurl);

    // 紧急数据上报：需要立即发送的重要数据
    if (level == AskPriority.URGENT) {
      // 优先使用 fetch API，支持 keepalive 选项
      if (!!W.fetch) {
        fetch(logurl, { 
          body, 
          method: 'POST', 
          keepalive: true  // 确保页面关闭后请求仍能完成
        });
      } else {
        // 降级到 XMLHttpRequest
        let xhr: XMLHttpRequest | null = new XMLHttpRequest();
        xhr.open('post', logurl, true);
        // 设置请求头，指定内容类型为 JSON
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(body); // 发送参数
        
        xhr.onload = function (e) {
          //   if (this.status == 200 || this.status == 304) {
          //     alert(this.responseText);
          //   }
          // 及时清理引用，防止多次创建导致的内存泄露
          xhr = null;
        };
      }
    } 
    // 空闲数据上报：可以在空闲时发送的非紧急数据
    else if (level == AskPriority.IDLE) {
      // 优先使用 sendBeacon API，专为数据上报设计
      if (!!WN.sendBeacon) {
        navigator.sendBeacon(logurl, body);
      } else {
        // 降级到图片请求方式，兼容性最好
        let img: HTMLImageElement | null = new Image();
        img.src = `${logurl}?body=${body}`;
        img.onload = function () {
          // 统计完成收回创建的元素，防止内存泄露
          img = null;
        };
      }
    }
  }
}

export default ReportData;
