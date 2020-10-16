import { LogEntry } from './log-entry.model';

export abstract class LogWriter{

    logEntry: LogEntry

    public execute(){
        this.write();
    }

    abstract write();
}