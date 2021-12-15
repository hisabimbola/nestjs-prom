export interface PromModuleOptions {
    [key: string]: any;
    withDefaultsMetrics?: boolean;
    withDefaultController?: boolean;
    withHttpMiddleware?: {
        enable?: boolean;
        timeBuckets?: Array<number>;
        pathNormalizationExtraMasks?: Array<RegExp>;
    };
    registryName?: string;
    prefix?: string;
    defaultLabels?: {
        [key: string]: string | number;
    };
    customUrl?: string;
    metricPath?: string;
}
