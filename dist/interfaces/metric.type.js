"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricTypeSummary = exports.MetricTypeHistogram = exports.MetricTypeGauge = exports.MetricTypeCounter = exports.MetricType = void 0;
var MetricType;
(function (MetricType) {
    MetricType[MetricType["Counter"] = 0] = "Counter";
    MetricType[MetricType["Gauge"] = 1] = "Gauge";
    MetricType[MetricType["Histogram"] = 2] = "Histogram";
    MetricType[MetricType["Summary"] = 3] = "Summary";
})(MetricType = exports.MetricType || (exports.MetricType = {}));
class MetricTypeCounter {
    constructor() {
        this.type = MetricType.Counter;
    }
}
exports.MetricTypeCounter = MetricTypeCounter;
class MetricTypeGauge {
    constructor() {
        this.type = MetricType.Gauge;
    }
}
exports.MetricTypeGauge = MetricTypeGauge;
class MetricTypeHistogram {
    constructor() {
        this.type = MetricType.Histogram;
    }
}
exports.MetricTypeHistogram = MetricTypeHistogram;
class MetricTypeSummary {
    constructor() {
        this.type = MetricType.Summary;
    }
}
exports.MetricTypeSummary = MetricTypeSummary;
