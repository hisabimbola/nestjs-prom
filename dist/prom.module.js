"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PromModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromModule = void 0;
const common_1 = require("@nestjs/common");
const prom_core_module_1 = require("./prom-core.module");
const prom_controller_1 = require("./prom.controller");
const core_1 = require("@nestjs/core");
const prom_catch_all_exception_filter_1 = require("./prom-catch-all.exception-filter");
let PromModule = PromModule_1 = class PromModule {
    static forRoot(options = {}) {
        const { withDefaultController, withExceptionFilter, metricPath, customUrl, } = options;
        const moduleForRoot = {
            module: PromModule_1,
            imports: [prom_core_module_1.PromCoreModule.forRoot(options)],
            controllers: [],
            providers: [],
            exports: [
                prom_core_module_1.PromCoreModule
            ],
        };
        if (withDefaultController !== false) {
            moduleForRoot.controllers = [...moduleForRoot.controllers, prom_controller_1.PromController.forRoot(metricPath !== null && metricPath !== void 0 ? metricPath : customUrl)];
        }
        if (withExceptionFilter !== false) {
            moduleForRoot.providers = [
                ...moduleForRoot.providers,
                {
                    provide: core_1.APP_FILTER,
                    useClass: prom_catch_all_exception_filter_1.PromCatchAllExceptionsFilter,
                },
            ];
        }
        return moduleForRoot;
    }
};
PromModule = PromModule_1 = __decorate([
    (0, common_1.Module)({})
], PromModule);
exports.PromModule = PromModule;
