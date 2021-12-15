"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromService = void 0;
const common_1 = require("@nestjs/common");
const prom_utils_1 = require("./common/prom.utils");
let PromService = class PromService {
    getCounter(args) {
        return (0, prom_utils_1.findOrCreateCounter)(args);
    }
    getCounterMetric(name) {
        return this.getCounter({ name: name });
    }
    getGauge(args) {
        return (0, prom_utils_1.findOrCreateGauge)(args);
    }
    getGaugeMetric(name) {
        return this.getGauge({ name: name });
    }
    getHistogram(args) {
        return (0, prom_utils_1.findOrCreateHistogram)(args);
    }
    getHistogramMetric(name) {
        return this.getHistogram({ name: name });
    }
    getSummary(args) {
        return (0, prom_utils_1.findOrCreateSummary)(args);
    }
    getSummaryMetric(name) {
        return this.getSummary({ name: name });
    }
    getDefaultRegistry() {
        return (0, prom_utils_1.getDefaultRegistry)();
    }
};
PromService = __decorate([
    (0, common_1.Injectable)()
], PromService);
exports.PromService = PromService;
