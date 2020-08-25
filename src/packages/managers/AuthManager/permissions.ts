
export class Permission {
    code: number;
    name: string;

    constructor(code: number, name: string) {
        this.code = code;
        this.name = name;
    }
}

export class PTypes {
    public static ALL: Permission = { code: 2** 32 - 1, name:"full access" };
    public static ADD_USER: Permission = { code: 1, name:"add new user" };
    public static DELETE_USER: Permission = { code: 2, name:"delete user" };
    public static UPDATE_USER: Permission = { code: 4, name:"update user" };
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