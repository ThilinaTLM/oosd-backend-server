import { PTypes } from "./permission-types";

export class Permission {
    code: number;
    name: string;

    constructor(code: number, name: string) {
        this.code = code;
        this.name = name;
    }
}

export interface PWrappable {
    permissionCode: number
}

export class PWrapper {

    private readonly _code: number
    constructor(wrappable: PWrappable) {
        this._code = wrappable.permissionCode;
    }

    isAllowed(permission: Permission): boolean {
        return (this._code & permission.code) == permission.code
    }

    listOfAllAllowed(): Permission[] {
        const list: Permission[] = []

        for (let pkey in PTypes) {
            // @ts-ignore
            const p = PTypes[pkey]
            if ( p instanceof Permission && this.isAllowed(p as Permission) ) list.push(p as Permission)
        }

        return list
    }

}