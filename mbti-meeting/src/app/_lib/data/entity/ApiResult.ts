export type ApiError =  {
    code: number;
    message: string;
}

// ApiResult<T> 인터페이스
export default interface ApiResult<T> {
    success: boolean;
    message: string;
    data?: T | null;
    error?: ApiError | null;
}