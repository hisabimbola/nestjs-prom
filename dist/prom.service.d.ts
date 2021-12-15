import { IHistogramMetricArguments, IMetricArguments } from './interfaces';
export declare class PromService {
    getCounter(args: IMetricArguments): import("./interfaces").CounterMetric;
    getCounterMetric(name: string): import("./interfaces").CounterMetric;
    getGauge(args: IMetricArguments): import("./interfaces").GaugeMetric;
    getGaugeMetric(name: string): import("./interfaces").GaugeMetric;
    getHistogram(args: IHistogramMetricArguments): import("./interfaces").HistogramMetric;
    getHistogramMetric(name: string): import("./interfaces").HistogramMetric;
    getSummary(args: IMetricArguments): import("./interfaces").SummaryMetric;
    getSummaryMetric(name: string): import("./interfaces").SummaryMetric;
    getDefaultRegistry(): import("prom-client").Registry;
}
