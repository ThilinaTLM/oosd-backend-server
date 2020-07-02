import { IObjectPool } from "./IObjectPool";

export class ObjectPool<V> implements IObjectPool<V> {
    private readonly _container: Array<V>;
    private readonly _size: number;
    private _p: number;

    constructor(size: number) {
        this._container = new Array<V>(size);
        this._size = size;
        this._p = 0;
    }

    private findIndex(key: string, value: any): number | undefined {
        for (let i = 0; i < this._size; ++i) {
            let item = this._container[i];
            // @ts-ignore
            if (item[key] == value) {
                return i;
            }
        }
        return undefined;
    }

    pushObject(obj: V): void {
        this._container[this._p] = obj;
        this._p = (++this._p) % this._size;
    }

    findObject(key: string, value: any): V | undefined {
        let index = this.findIndex(key, value);
        if (index) {
            return this._container[index];
        }
        return undefined;
    }

    updateObject(key: string, value: any, obj: V): void {
        let index = this.findIndex(key, value);
        if (index) {
            this._container[index] = obj;
        }
    }
}