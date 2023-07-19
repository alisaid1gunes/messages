 export interface ApiResponse<T>{
    message: string,
    data?: T,
    success: boolean
}

 export interface ControllerResponse<T>{
    message: string,
    result?: T,
}

