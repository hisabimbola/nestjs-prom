"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromCounter = void 0;
const common_1 = require("@nestjs/common");
const prom_utils_1 = require("./prom.utils");
exports.PromCounter = (0, common_1.createParamDecorator)((data) => {
    const arg = {};
    if (typeof data === 'string') {
        arg.name = data;
    }
    if (typeof data === 'object') {
        arg.name = data.name;
        arg.help = data.help;
        arg.labelNames = data.labelNames;
    }
    if (!arg.name || arg.name.length === 0) {
        throw new Error(`PromCounter need an argument, must be a fulfilled string or IPromCounterDecoratorArg instance`);
    }
    return (0, prom_utils_1.findOrCreateCounter)(arg);
});
