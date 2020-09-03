
export interface IExecutor {
    execute(sql: string, args: Array<any>): any
}

