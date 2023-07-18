interface ApiResponse<T>{
    message: string,
    data?: T,
    success: boolean
}

interface ControllerResponse<T>{
    message: string,
    result?: T,
}

