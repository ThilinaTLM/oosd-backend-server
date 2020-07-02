import { Division } from "./Division";
import { User } from "./User";
import { Customer } from "./Customer";
import { ComplaintState } from "./ComplaintState";
import { ComplaintLog } from "./ComplaintLog";

export class Complaint {
    constructor(
        complaintId: number,
        refNo: number,
        origin: string,
        assignTo: Division,
        creator: User,
        customer: Customer,
        subject: string,
        description: string,
        attachments: string[],
        createdData: Date,
        divisionReceivedDate: Date,
        state: ComplaintState,
        log: ComplaintLog
    ) {
        this._complaintId = complaintId;
        this._refNo = refNo;
        this._origin = origin;
        this._assignTo = assignTo;
        this._creator = creator;
        this._customer = customer;
        this._subject = subject;
        this._description = description;
        this._attachments = attachments;
        this._createdData = createdData;
        this._divisionReceivedDate = divisionReceivedDate;
        this._state = state;
        this._log = log;
    }

    private _complaintId: number;

    /**
     * Getter complaintId
     * @return {number}
     */
    public get complaintId(): number {
        return this._complaintId;
    }

    private _refNo: number;

    /**
     * Getter refNo
     * @return {number}
     */
    public get refNo(): number {
        return this._refNo;
    }

    private _origin: string;

    /**
     * Getter origin
     * @return {string}
     */
    public get origin(): string {
        return this._origin;
    }

    private _assignTo: Division;

    /**
     * Getter assignTo
     * @return {Division}
     */
    public get assignTo(): Division {
        return this._assignTo;
    }

    private _creator: User;

    /**
     * Getter creator
     * @return {User}
     */
    public get creator(): User {
        return this._creator;
    }

    private _customer: Customer;

    /**
     * Getter customer
     * @return {Customer}
     */
    public get customer(): Customer {
        return this._customer;
    }

    private _subject: string;

    /**
     * Getter subject
     * @return {string}
     */
    public get subject(): string {
        return this._subject;
    }

    private _description: string;

    /**
     * Getter description
     * @return {string}
     */
    public get description(): string {
        return this._description;
    }

    private _attachments: string[];

    /**
     * Getter attachments
     * @return {string[]}
     */
    public get attachments(): string[] {
        return this._attachments;
    }

    private _createdData: Date;

    /**
     * Getter createdData
     * @return {Date}
     */
    public get createdData(): Date {
        return this._createdData;
    }

    private _divisionReceivedDate: Date;

    /**
     * Getter divisionReceivedDate
     * @return {Date}
     */
    public get divisionReceivedDate(): Date {
        return this._divisionReceivedDate;
    }

    private _state: ComplaintState;

    /**
     * Getter state
     * @return {ComplaintState}
     */
    public get state(): ComplaintState {
        return this._state;
    }

    private _log: ComplaintLog;

    /**
     * Getter log
     * @return {ComplaintLog}
     */
    public get log(): ComplaintLog {
        return this._log;
    }
}
