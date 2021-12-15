import { IMetricArguments } from '../interfaces';
export declare const PromMethodCounter: (params?: IMetricArguments) => (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) => void;
export declare const PromInstanceCounter: (params?: IMetricArguments) => <T extends new (...args: any[]) => {}>(ctor: T) => {
    new (...args: any[]): {};
} & T;
