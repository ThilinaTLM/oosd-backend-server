export class Division {
    private static _NullDivision: Division;
    static get NullDivision(): Division {
        if (!this._NullDivision) {
            this._NullDivision = new Division(-1, "Null Division")
        }
        return this._NullDivision;
    }

    private _id!: number;
    private _name!: string;

    constructor(id: undefined, name: string)
    constructor(id: number, name: string)
    constructor(id: number | undefined, name: string) {
        if (id) {
            this._id = id;
        }
        this._name = name;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}
