import { ILoggingConfig } from "./i-logging-config";
import { IErrorHandlerConfig } from "./i-error-handler-config";
import { IHttpConfig } from "./i-http-config";

export interface IConfiguration {
    applicationName: string,
    version: string
    loggingConfig:ILoggingConfig,
    errorHandlerConfig: IErrorHandlerConfig,
    httpConfig: IHttpConfig
}