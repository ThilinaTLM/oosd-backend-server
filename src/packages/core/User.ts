import { Division } from "./Division";

export class User {
    private static _NullUser: User;
    static get NullUser(): User {
        if (!this._NullUser) {
            this._NullUser = new User();
        }
        return this._NullUser;
    }

    // basic details
    private _id!: number;
    private _firstName!: string;
    private _lastName!: string;

    //contact details
    private _email!: string;
    private _telephone!: string;

    //other details
    private _office!: Division;
    private _role!: string;



    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get telephone(): string {
        return this._telephone;
    }

    set telephone(value: string) {
        this._telephone = value;
    }

    get office(): Division {
        return this._office;
    }

    set office(value: Division) {
        this._office = value;
    }

    get role(): string {
        return this._role;
    }

    set role(value: string) {
        this._role = value;
    }
}
