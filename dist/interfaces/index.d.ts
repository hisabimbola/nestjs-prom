import * as PromClient from 'prom-client';
export * from './metric.type';
export * from './prom-options.interface';
export declare type CounterMetric = PromClient.Counter<string>;
export declare type GaugeMetric = PromClient.Gauge<string>;
export declare type HistogramMetric = PromClient.Histogram<string>;
export declare type SummaryMetric = PromClient.Summary<string>;
export declare type GenericMetric = PromClient.Metric<string>;
export declare type Registry = PromClient.Registry;
