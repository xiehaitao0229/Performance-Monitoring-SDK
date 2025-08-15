import ReportData from '../data/ReportData';
import { IConfig, IReportData } from '../typings/types';

export const config: IConfig = {
  // Metrics
  reportData: new ReportData({ logUrl: 'hole' }),
  isResourceTiming: false,
  isElementTiming: false,
  // Logging
  maxTime: 15000,
};
