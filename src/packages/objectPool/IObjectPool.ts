export interface IObjectPool<V> {
    pushObject(obj: V): void;

    findObject(key: string, value: any): V | undefined;

    updateObject(key: string, value: any, obj: V): void;
}