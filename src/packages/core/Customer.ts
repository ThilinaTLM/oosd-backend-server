import { Division } from "./Division";

export class Customer {
    private _id!: number;
    private _fullName!: string;
    private _nicNumber!: string;

    private _email!: string;
    private _phoneNumber!: string;
    private _address!: string;

    private _GNOffice!: string;
    private _DSOffice!: Division;
}
