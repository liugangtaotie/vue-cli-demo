import { WebpackPluginInstance } from 'webpack';
export declare const CSS_LOADERS: (string | {
    loader: string;
    options: {
        postcssOptions: any;
    };
})[];
export declare function createBasePlugins(): WebpackPluginInstance[];
export declare const BASE_CONFIG: any;
