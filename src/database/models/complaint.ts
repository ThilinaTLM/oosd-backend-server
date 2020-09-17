import { BuildMapper, mp } from "../core/mapper";
import { v4 as genUUID } from "uuid";
import { mysqlExeEW } from "../core/eWrapper/mysql";
import { QBuild } from "../core/qBuilder";
import { ModelError } from "../index";

interface ComplaintData {
    complaintId: string,
    refNo: string,
    type: string,
    customerId: string,
    subject: string,
    description: string,
    status: string,
    createdDate: Date,
    assignedDiv: string,
    assignedBy: string,
    assignedDate: Date
}

const mapper = BuildMapper<ComplaintData>([
    mp('complaint_id', 'complaintId'),
    mp('ref_no', 'refNo'),
    mp('customer_id', 'customerId'),
    mp('created_date', 'createdDate'),
    mp('assigned_div', 'assignedDiv'),
    mp('assigned_by', 'assignedBy'),
    mp('assigned_date', 'assignedDate')
])

export const complaint = {
    addComplaint: async (data: any): Promise<[ModelError, string]> => {
        data = mapper.backward(data)
        data.complaint_id = genUUID()

        const [error, res] = await mysqlExeEW.run(...QBuild.INSERT('complaints', data))
        return [error, data.complaint_id]
    }
}


