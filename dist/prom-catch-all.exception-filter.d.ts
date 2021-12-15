import { ArgumentsHost } from "@nestjs/common";
import { BaseExceptionFilter } from '@nestjs/core';
import { PromService } from './prom.service';
export declare class PromCatchAllExceptionsFilter extends BaseExceptionFilter {
    private readonly _counter;
    constructor(promService: PromService);
    catch(exception: unknown, host: ArgumentsHost): void;
}
