import HtmlWebpackPlugin from 'html-webpack-plugin';
export declare function createHtmlPluginOptions(type: 'pc' | 'mobile'): {
    minify: {
        removeAttributeQuotes: boolean;
        collapseWhitespace: boolean;
    };
    hash: boolean;
    chunks: ("pc" | "mobile")[];
    title: any;
    logo: any;
    baidu: any;
};
export declare const HTML_WEBPACK_PLUGINS: HtmlWebpackPlugin[];
export declare function getDevServerConfig(): {
    port: any;
    host: any;
    devMiddleware: {
        publicPath: string;
    };
    static: {
        directory: string;
    };
    allowedHosts: string;
    hot: boolean;
};
export declare function getDevConfig(): any;
