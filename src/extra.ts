

export interface ErrorType {
    code: 0 | number, // 0 means no error
    msg: string
}


export type ReturnType<T> = [ErrorType, T]