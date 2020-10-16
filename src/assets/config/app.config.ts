import { IConfiguration, ILoggingConfig, IErrorHandlerConfig, IHttpConfig } from 'src/app/configuration/config';

export class AppConfig implements IConfiguration {
    applicationName: string = 'Smartblind';
    version: string = '0.0.1';
    loggingConfig: ILoggingConfig = {
        applicationName: this.applicationName,
        version: this.version,
        isProduction: false
    };
    errorHandlerConfig: IErrorHandlerConfig = {
        applicationName: this.applicationName,
        version: this.version,
        useDefaultHandler: false
    };
    httpConfig: IHttpConfig = {
        applicationName: this.applicationName,
        version: this.version,
        endpoint:  {
            host: 'localhost',
            schema: 'http',
            port: 3000,
            apiVersion: 'api'
        }
    }
}