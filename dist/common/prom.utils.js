"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrCreateSummary = exports.findOrCreateHistogram = exports.findOrCreateGauge = exports.findOrCreateCounter = exports.findOrCreateMetric = exports.getDefaultRegistry = exports.getRegistry = exports.getOptionsName = exports.getRegistryName = exports.getMetricToken = void 0;
const client = require("prom-client");
const registries = new Map();
function getMetricToken(type, name) {
    return `${name}${type}`;
}
exports.getMetricToken = getMetricToken;
function getRegistryName(name) {
    return `${name}PromRegistry`;
}
exports.getRegistryName = getRegistryName;
function getOptionsName(name) {
    return `${name}PromOptions`;
}
exports.getOptionsName = getOptionsName;
function getRegistry(name) {
    if (!name) {
        return getDefaultRegistry();
    }
    if (registries.has(name) === false) {
        const registry = new client.Registry();
        registries.set(name, registry);
    }
    return registries.get(name);
}
exports.getRegistry = getRegistry;
function getDefaultRegistry() {
    return client.register;
}
exports.getDefaultRegistry = getDefaultRegistry;
function findOrCreateMetric({ name, type, help, labelNames = [], registry, buckets, }) {
    const register = registry !== null && registry !== void 0 ? registry : getDefaultRegistry();
    let metric = register.getSingleMetric(name);
    switch (type) {
        case "Gauge":
            if (metric && metric instanceof client.Gauge) {
                return metric;
            }
            return new client.Gauge({
                name: name,
                help: help || `${name} ${type}`,
                labelNames,
            });
        case "Histogram":
            if (metric && metric instanceof client.Histogram) {
                return metric;
            }
            const histogramConfig = {
                name: name,
                help: help || `${name} ${type}`,
                labelNames,
            };
            if (buckets) {
                histogramConfig['buckets'] = buckets;
            }
            return new client.Histogram(histogramConfig);
        case "Summary":
            if (metric && metric instanceof client.Summary) {
                return metric;
            }
            return new client.Summary({
                name: name,
                help: help || `${name} ${type}`,
                labelNames,
            });
        case "Counter":
        default:
            if (metric && metric instanceof client.Counter) {
                return metric;
            }
            return new client.Counter({
                name: name,
                help: help || `${name} ${type}`,
                labelNames,
            });
    }
}
exports.findOrCreateMetric = findOrCreateMetric;
function findOrCreateCounter(args) {
    return findOrCreateMetric(Object.assign(Object.assign({}, args), { type: `Counter` }));
}
exports.findOrCreateCounter = findOrCreateCounter;
function findOrCreateGauge(args) {
    return findOrCreateMetric(Object.assign(Object.assign({}, args), { type: `Gauge` }));
}
exports.findOrCreateGauge = findOrCreateGauge;
function findOrCreateHistogram(args) {
    return findOrCreateMetric(Object.assign(Object.assign({}, args), { type: `Histogram` }));
}
exports.findOrCreateHistogram = findOrCreateHistogram;
function findOrCreateSummary(args) {
    return findOrCreateMetric(Object.assign(Object.assign({}, args), { type: `Summary` }));
}
exports.findOrCreateSummary = findOrCreateSummary;
