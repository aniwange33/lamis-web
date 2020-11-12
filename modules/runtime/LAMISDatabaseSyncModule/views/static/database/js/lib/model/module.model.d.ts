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
}
