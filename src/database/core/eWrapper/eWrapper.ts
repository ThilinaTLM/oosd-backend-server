import { ModelError, ModelErrorSet } from "../errors";

/**
 * Types
 */
export type ErrorHandler = (e: any) => ModelError
export type ReturnType = [ModelError, any];

/**
 * Error Handler Wrappable
 */
export interface EHWrappable {
    execute: (query: string, args: Array<any>) => any
}

/**
 * Error Handling Wrapper
 */
export class ErrorHandlerWrapper {
    private executor: EHWrappable
    private readonly eHandlers: ErrorHandler[]

    constructor(executor: EHWrappable, eHandlers: ErrorHandler[] = []) {
        this.executor = executor;
        this.eHandlers = eHandlers;
    }

    // bind(...ehs: ErrorHandler[]) {
    //     ehs.forEach((eh) => this.eHandlers.push(eh));
    // }

    private static resolveUndefined(args: Array<any>) {
        for (let i = 0; i<args.length; i++) {
            if (args[i] === undefined) args[i] = null
        }
    }

    async run(query: string, args: Array<any> = []): Promise<ReturnType>{
        let results;
        try {
            ErrorHandlerWrapper.resolveUndefined(args); // change undefined values as null
            results =  await this.executor.execute(query, args);
            return [ModelErrorSet.NO_ERRORS, results];
        } catch (e) {
            for (let i = 0; i < this.eHandlers.length; i++) {
                let error = this.eHandlers[i](e);
                if (!(error === ModelErrorSet.NO_ERRORS)) {
                    return [error, undefined]
                }
            }
            return [ModelErrorSet.UNKNOWN, undefined];
        }
    }
}

/**
 * Builder for Error Handler Wrapper
 * @param executor : sql executor
 * @param handlers : array of error handlers
 */
export function EWBuilder(executor: EHWrappable, handlers: ErrorHandler[] = []) {
    return new ErrorHandlerWrapper(executor, handlers);
}