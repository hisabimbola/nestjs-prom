"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromInstanceCounter = exports.PromMethodCounter = void 0;
const prom_utils_1 = require("./prom.utils");
const PromMethodCounter = (params) => {
    return (target, propertyKey, descriptor) => {
        const className = target.constructor.name;
        const name = `app_${className}_${propertyKey.toString()}_calls_total`;
        const help = `app_${className}#${propertyKey.toString()} called total`;
        let counterMetric;
        const methodFunc = descriptor.value;
        descriptor.value = function (...args) {
            if (!counterMetric) {
                counterMetric = (0, prom_utils_1.findOrCreateCounter)(Object.assign({ name,
                    help }, params));
            }
            counterMetric.inc(1);
            return methodFunc.apply(this, args);
        };
    };
};
exports.PromMethodCounter = PromMethodCounter;
const PromInstanceCounter = (params) => {
    return (ctor) => {
        const name = `app_${ctor.name}_instances_total`;
        const help = `app_${ctor.name} object instances total`;
        let counterMetric;
        return class extends ctor {
            constructor(...args) {
                if (!counterMetric) {
                    counterMetric = (0, prom_utils_1.findOrCreateCounter)(Object.assign({ name,
                        help }, params));
                }
                counterMetric.inc(1);
                super(...args);
            }
        };
    };
};
exports.PromInstanceCounter = PromInstanceCounter;
