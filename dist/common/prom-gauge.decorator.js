"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromGauge = void 0;
const common_1 = require("@nestjs/common");
const prom_utils_1 = require("./prom.utils");
exports.PromGauge = (0, common_1.createParamDecorator)((data) => {
    const arg = {};
    if (typeof data === 'string') {
        arg.name = data;
    }
    if (typeof data === 'object') {
        arg.name = data.name;
        arg.help = data === null || data === void 0 ? void 0 : data.help;
        arg.labelNames = data.labelNames;
    }
    if (!arg.name || arg.name.length === 0) {
        throw new Error(`PromGauge need an argument, must be a fulfilled string or IPromGaugeDecoratorArg instance`);
    }
    return (0, prom_utils_1.findOrCreateGauge)(arg);
});
