import { AskPriority, IReportData } from '../typings/types';
type TrackerOptions = {
    logUrl: string;
};
declare class ReportData implements IReportData {
    private logUrl;
    constructor(options: TrackerOptions);
    sendToAnalytics(level: AskPriority, body: string, uri?: string): void;
}
export default ReportData;
//# sourceMappingURL=ReportData.d.ts.map