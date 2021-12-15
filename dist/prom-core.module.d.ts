import { DynamicModule, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PromModuleOptions } from './interfaces';
export declare class PromCoreModule implements NestModule {
    private readonly options;
    static forRoot(options?: PromModuleOptions): DynamicModule;
    constructor(options: PromModuleOptions);
    configure(consumer: MiddlewareConsumer): void;
}
