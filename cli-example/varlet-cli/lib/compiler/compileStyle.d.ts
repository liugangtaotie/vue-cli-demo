export declare const EMPTY_SPACE_RE: RegExp;
export declare const EMPTY_LINE_RE: RegExp;
export declare const IMPORT_CSS_RE: RegExp;
export declare const IMPORT_LESS_RE: RegExp;
export declare const STYLE_IMPORT_RE: RegExp;
export declare const clearEmptyLine: (s: string) => string;
export declare function normalizeStyleDependency(styleImport: string, reg: RegExp): string;
export declare function extractStyleDependencies(file: string, code: string, reg: RegExp, expect: 'css' | 'less', self: boolean): string;
export declare function compileLess(file: string): Promise<void>;
