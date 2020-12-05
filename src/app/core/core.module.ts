import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HttpModule } from './../http/http.module';
import { LocalStoreService } from './services/local-store.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ConfigurationModule } from '../configuration/configuration.module';
import { ConfigurationService } from '../configuration/configuration.service';
import { ErrorHandlerModule } from '../error-handler/error-handler.module';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { HttpService } from '../http/http.service';
import { ConsoleWriterService } from '../logs/console-writer.service';
import { LogsModule } from '../logs/logs.module';
import { LogsService } from '../logs/logs.service';

function appInitializer(consoleWriter: ConsoleWriterService){
  return () => {
    return consoleWriter;
  }

}

@NgModule({
  imports: [
    CommonModule,
    LogsModule,
    ErrorHandlerModule,
    ConfigurationModule.forRoot({
      config: environment.config
    }),
    HttpModule
  ],
  providers: [
    // Cross-cutting services
    ConfigurationService,
    LogsService,
    ConsoleWriterService,    
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
      deps: [LogsService, ConfigurationService]
    },
    {
      provide: HttpService,
      useClass: HttpService,
      deps: [HttpClient, DomSanitizer, ConfigurationService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [LogsService, ConsoleWriterService],
      multi: true

    },
    LocalStoreService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
    /* ,
    UserService,
    JwtService,
    AuthGuard,
    NoAuthGuard, */
  ]
})
export class CoreModule { }
