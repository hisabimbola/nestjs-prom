"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromHistogram = void 0;
const common_1 = require("@nestjs/common");
const prom_utils_1 = require("./prom.utils");
exports.PromHistogram = (0, common_1.createParamDecorator)((data) => {
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
        throw new Error(`PromHistogram need an argument, must be a fulfilled string or IPromHistogramDecoratorArg instance`);
    }
    return (0, prom_utils_1.findOrCreateHistogram)(arg);
});
