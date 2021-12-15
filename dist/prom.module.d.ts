import { DynamicModule } from '@nestjs/common';
import { PromModuleOptions } from './interfaces';
export declare class PromModule {
    static forRoot(options?: PromModuleOptions): DynamicModule;
}
