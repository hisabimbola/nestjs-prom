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
var PromController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromController = void 0;
const common_1 = require("@nestjs/common");
const client = require("prom-client");
const constants_1 = require("@nestjs/common/constants");
let PromController = PromController_1 = class PromController {
    index() {
        return client.register.metrics();
    }
    static forRoot(path = 'metrics') {
        Reflect.defineMetadata(constants_1.PATH_METADATA, path, PromController_1);
        return PromController_1;
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Header)('Content-Type', client.register.contentType),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PromController.prototype, "index", null);
PromController = PromController_1 = __decorate([
    (0, common_1.Controller)()
], PromController);
exports.PromController = PromController;
