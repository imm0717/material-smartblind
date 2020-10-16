import { Injectable, Optional } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { IConfiguration, ILoggingConfig } from '../configuration/config';
import { ConfigurationService } from '../configuration/configuration.service';
import { LogEntry, LogType } from './log-entry.model';

@Injectable()

export class LogsService {

  private message: string
  private type: LogType
  private source: string
  private tags: string[]
  private timestamp: Date = new Date();
  private applicationName: string;
  private version: string;
  private isProduction: boolean;

  private logEntrySubject: ReplaySubject<LogEntry> = new ReplaySubject<LogEntry>(1);
  logEntries$: Observable<LogEntry> = this.logEntrySubject.asObservable();

  constructor(@Optional() configurationService: ConfigurationService) {

    if (configurationService)
      configurationService.settings$.subscribe(settings => this.handleSettings(settings));

    this.log(
      'Creating Logging Service',
      LogType.Information,
      `LogsService at ${this.timestamp}`
    )
  }

  private handleSettings(appSettings: IConfiguration) {
    let settings = appSettings.loggingConfig as ILoggingConfig;
      this.applicationName = (settings.applicationName) ? settings.applicationName : 'application';
      this.version = (settings.version) ? settings.version : '0.0.1'
      this.isProduction = (settings.isProduction) ? settings.isProduction : false
  }


  log(message: string, type: LogType, source: string, tags?: string[]) {
    this.message = message
    this.type = type
    this.source = `${this.applicationName} ${this.version} | ${source}`
    this.tags = (tags) ? tags : []

    this.logEntrySubject.next({
      message: this.message,
      type: this.type,
      source: this.source,
      tags: this.tags,
      timestamp: new Date(Date.now())
    })
  }
}
