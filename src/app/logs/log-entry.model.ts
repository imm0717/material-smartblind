export enum LogType{
    Information = 1,
    Warning = 2,
    Error = 3,
    Critical = 4,
    Debug = 5
}

export interface LogEntry {
    message: string,
    type: LogType,
    source: string,
    tags?: string[],
    timestamp: Date
}