
// types

export interface ErrorType extends String{}

export type ReturnType<T> = [ErrorType, T];

export interface ErrorSet {
    [key: string]: ErrorType
}