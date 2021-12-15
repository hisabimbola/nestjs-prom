"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PromCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromCoreModule = void 0;
const common_1 = require("@nestjs/common");
const prom_constants_1 = require("./prom.constants");
const client = require("prom-client");
const prom_client_1 = require("prom-client");
const prom_utils_1 = require("./common/prom.utils");
const middleware_1 = require("./middleware");
const prom_service_1 = require("./prom.service");
let PromCoreModule = PromCoreModule_1 = class PromCoreModule {
    constructor(options) {
        this.options = options;
    }
    static forRoot(options = {}) {
        const { withDefaultsMetrics, registryName, prefix, } = options;
        const promRegistryName = registryName ?
            (0, prom_utils_1.getRegistryName)(registryName)
            : prom_constants_1.DEFAULT_PROM_REGISTRY;
        const promRegistryNameProvider = {
            provide: prom_constants_1.PROM_REGISTRY_NAME,
            useValue: promRegistryName,
        };
        const promRegistryOptionsProvider = {
            provide: prom_constants_1.DEFAULT_PROM_OPTIONS,
            useValue: options,
        };
        const registryProvider = {
            provide: promRegistryName,
            useFactory: () => {
                let registry = client.register;
                if (promRegistryName !== prom_constants_1.DEFAULT_PROM_REGISTRY) {
                    registry = new prom_client_1.Registry();
                }
                registry.clear();
                if (options.defaultLabels) {
                    registry.setDefaultLabels(options.defaultLabels);
                }
                if (withDefaultsMetrics !== false) {
                    const defaultMetricsOptions = {
                        register: registry,
                    };
                    if (prefix) {
                        defaultMetricsOptions.prefix = prefix;
                    }
                    (0, prom_client_1.collectDefaultMetrics)(defaultMetricsOptions);
                }
                return registry;
            },
        };
        return {
            module: PromCoreModule_1,
            providers: [
                promRegistryNameProvider,
                promRegistryOptionsProvider,
                registryProvider,
                prom_service_1.PromService,
            ],
            exports: [
                registryProvider,
                prom_service_1.PromService,
            ],
        };
    }
    configure(consumer) {
        var _a;
        if (((_a = this.options.withHttpMiddleware) === null || _a === void 0 ? void 0 : _a.enable) === true) {
            consumer.apply(middleware_1.InboundMiddleware).forRoutes('*');
        }
    }
};
PromCoreModule = PromCoreModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({}),
    __param(0, (0, common_1.Inject)(prom_constants_1.DEFAULT_PROM_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], PromCoreModule);
exports.PromCoreModule = PromCoreModule;
