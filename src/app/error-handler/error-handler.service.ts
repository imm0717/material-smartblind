import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Optional } from "@angular/core";
import { IConfiguration, IErrorHandlerConfig } from "./../configuration/config";
import { ConfigurationService } from "./../configuration/configuration.service";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { LogsService } from '../logs/logs.service';
import { LogEntry, LogType } from '../logs/log-entry.model';

@Injectable()
export class ErrorHandlerService extends ErrorHandler {
  public errorList$: Observable<LogEntry>;
  private useDefaultHandlder: boolean;

  constructor(
    private logsService: LogsService,
    @Optional() configurationService: ConfigurationService
  ) {
    
    super();
    this.errorList$ = this.logsService.logEntries$.pipe(
      filter((logEntry: LogEntry) => logEntry.type === LogType.Error)
    );

    if (configurationService)
      configurationService.settings$.subscribe((settings) =>
        this.handleSettings(settings)
      );
  }

  handleSettings(appSettings: IConfiguration) {
    let settings = appSettings.errorHandlerConfig as IErrorHandlerConfig;

    if (settings) {
      this.useDefaultHandlder = settings.useDefaultHandler
        ? settings.useDefaultHandler
        : false;
    }
  }

  handleError(error: Error | TypeError | HttpErrorResponse) {
    let formattederror: string = "";

    this.logsService.log("Init Handling Error", LogType.Information, 'ErrorHandler Service');

    if (this.useDefaultHandlder) {
      super.handleError(error);
    } else {
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          let errorEventInstance = error.error as ErrorEvent;
          formattederror = `A client-side or network error occurred. | ${errorEventInstance.message}`;
          this.logsService.log(formattederror, LogType.Error, `${errorEventInstance.lineno} ${errorEventInstance.filename}`);
          //return throwError(error)
        } 
      } else if (error instanceof TypeError) {
        
        formattederror = `Value is not of the expected type | ${error.message}`;
        this.logsService.log(formattederror, LogType.Error, error.stack);

      } else {
        formattederror = `Client side error | ${error.name} ${error.message}`;
        this.logsService.log(formattederror, LogType.Error, error.stack);
        //return throwError(error)
      }
    }
  }
}
