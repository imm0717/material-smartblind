export interface IEndPointConfig {
    host: string
    schema: string
    port: number
    apiVersion: string
}

export interface IHttpConfig{
    applicationName: string,
    version: string,
    endpoint: IEndPointConfig
}