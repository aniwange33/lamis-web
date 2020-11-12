export interface WebModule {
    id: number;
    path: string;
    name: string;
    title?: string;
    breadcrumb?: string;
    authorities?: string[];
}

export interface Module {
    id: number;
    name: string;
    basePackage: string;
    version: string;
    description: string;
    active: boolean;
    artifact: string;
    buildTime: Date;
    umdLocation?: string;
    moduleMap?: string;
    webModules?: WebModule[];
}

export interface ModuleResponse {
    type?: string;
    message?: string;
    module?: Module;
}
