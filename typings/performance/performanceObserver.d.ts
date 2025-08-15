import { IPerformanceObserverType } from '../typings/types';
/**
 * PerformanceObserver 异步订阅封装
 */
export declare const po: (eventType: IPerformanceObserverType, cb: (performanceEntries: any[]) => void) => PerformanceObserver | null;
export declare const poDisconnect: (observer: any) => void;
//# sourceMappingURL=performanceObserver.d.ts.map