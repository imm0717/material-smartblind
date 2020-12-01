export class ApiResponse<T> {
    statusCode: number;
    message?: string;
    timestamp: Date;
    isSuccess: boolean
    constructor (){
        this.timestamp = new Date(Date.now())
    }
}

export class SuccessApiResponse<T> extends ApiResponse<T> {
    data: T
    constructor (){
        super()
        this.isSuccess = true
    }
}

export class ErrorApiResponse<T> extends ApiResponse<T> {
    constructor(){
        super()
        this.isSuccess = false
    }
}