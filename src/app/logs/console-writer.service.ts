import { LogEntry, LogType } from './log-entry.model';
import { LogWriter } from './log-writer';
import { Injectable } from '@angular/core';
import { LogsService } from './logs.service';

@Injectable()
  
export class ConsoleWriterService extends LogWriter {

    constructor(private logsService: LogsService){
        super();
        this.logsService.logEntries$.subscribe(
            (entry) => this.handleEntry(entry)
        )
    }

    handleEntry(entry: LogEntry){
        this.logEntry = entry;
        this.execute();
    }

    write(){
        switch (this.logEntry.type) {
            case LogType.Critical:
                console.error(this.logEntry)
                break;
            case LogType.Debug:
                console.debug(this.logEntry)
                break;
            case LogType.Error:
                console.error(this.logEntry)
                break;
            case LogType.Information:
                console.info(this.logEntry)
                break;
            case LogType.Warning:
                console.warn(this.logEntry)
                break;
        }
    }
}