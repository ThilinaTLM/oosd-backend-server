export interface Complaint {
    id: number,
    ref_no: string,

    type: string,

    customer: string,
    subject: string,
    description: string
    state: string
    created_date: Date,

    assigned_div: number
    assigned_date: Date,
    assigned_by: number
}