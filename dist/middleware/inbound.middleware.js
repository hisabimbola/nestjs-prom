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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboundMiddleware = void 0;
const common_1 = require("@nestjs/common");
const prom_service_1 = require("../prom.service");
const responseTime = require("response-time");
const prom_constants_1 = require("../prom.constants");
const utils_1 = require("../utils");
let InboundMiddleware = class InboundMiddleware {
    constructor(_options, _service) {
        var _a, _b;
        this._options = _options;
        this._service = _service;
        this.defaultBuckets = [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 10];
        const buckets = (_b = (_a = this._options.withHttpMiddleware) === null || _a === void 0 ? void 0 : _a.timeBuckets) !== null && _b !== void 0 ? _b : [];
        this._histogram = this._service.getHistogram({
            name: 'http_requests',
            help: 'HTTP requests - Duration in seconds',
            labelNames: ['method', 'status', 'path'],
            buckets: buckets.length > 0 ? buckets : this.defaultBuckets,
        });
    }
    use(req, res, next) {
        responseTime((req, res, time) => {
            var _a;
            const { url, method } = req;
            const path = (0, utils_1.normalizePath)(url, (_a = this._options.withHttpMiddleware) === null || _a === void 0 ? void 0 : _a.pathNormalizationExtraMasks, "#val");
            if (path === "/favicon.ico") {
                return;
            }
            if (path === this._options.customUrl || path === this._options.metricPath) {
                return;
            }
            const status = (0, utils_1.normalizeStatusCode)(res.statusCode);
            const labels = { method, status, path };
            this._histogram.observe(labels, time / 1000);
        })(req, res, next);
    }
};
InboundMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(prom_constants_1.DEFAULT_PROM_OPTIONS)),
    __metadata("design:paramtypes", [Object, prom_service_1.PromService])
], InboundMiddleware);
exports.InboundMiddleware = InboundMiddleware;
