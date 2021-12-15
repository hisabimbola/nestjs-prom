import * as PromClient from 'prom-client';
export declare enum MetricType {
    Counter = 0,
    Gauge = 1,
    Histogram = 2,
    Summary = 3
}
export interface MetricTypeConfigurationInterface {
    type: MetricType;
    configuration?: any;
}
export declare class MetricTypeCounter<T extends string> implements MetricTypeConfigurationInterface {
    type: MetricType;
    configuration: PromClient.CounterConfiguration<T>;
}
export declare class MetricTypeGauge<T extends string> implements MetricTypeConfigurationInterface {
    type: MetricType;
    configuration: PromClient.GaugeConfiguration<T>;
}
export declare class MetricTypeHistogram<T extends string> implements MetricTypeConfigurationInterface {
    type: MetricType;
    configuration: PromClient.HistogramConfiguration<T>;
}
export declare class MetricTypeSummary<T extends string> implements MetricTypeConfigurationInterface {
    type: MetricType;
    configuration: PromClient.SummaryConfiguration<T>;
}
export interface IMetricArguments {
    name: string;
    help?: string;
    labelNames?: string[];
    registry?: PromClient.Registry;
}
export interface IHistogramMetricArguments extends IMetricArguments {
    buckets?: number[];
}
