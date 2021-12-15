import { NestMiddleware } from "@nestjs/common";
import { PromService } from '../prom.service';
import { PromModuleOptions } from '../interfaces';
export declare class InboundMiddleware implements NestMiddleware {
    private readonly _options;
    private readonly _service;
    private readonly _histogram;
    private readonly defaultBuckets;
    constructor(_options: PromModuleOptions, _service: PromService);
    use(req: any, res: any, next: any): void;
}
