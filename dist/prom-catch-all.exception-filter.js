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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromCatchAllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const utils_1 = require("./utils");
const prom_service_1 = require("./prom.service");
function getBaseUrl(url) {
    if (!url) {
        return url;
    }
    if (url.indexOf('?') === -1) {
        return url;
    }
    return url.split('?')[0];
}
let PromCatchAllExceptionsFilter = class PromCatchAllExceptionsFilter extends core_1.BaseExceptionFilter {
    constructor(promService) {
        super();
        this._counter = promService.getCounter({
            name: 'http_exceptions',
            labelNames: ['method', 'status', 'path'],
        });
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const path = (0, utils_1.normalizePath)(getBaseUrl(request.baseUrl || request.url), [], "#val");
        this._counter.inc({
            method: request.method,
            path,
            status,
        });
        super.catch(exception, host);
    }
};
PromCatchAllExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [prom_service_1.PromService])
], PromCatchAllExceptionsFilter);
exports.PromCatchAllExceptionsFilter = PromCatchAllExceptionsFilter;
