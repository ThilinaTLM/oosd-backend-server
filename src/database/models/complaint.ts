import { BuildMapper, mp } from "../core/mapper";
import { v4 as genUUID } from "uuid";
import { mysqlExeEW } from "../core/eWrapper/mysql";
import { QBuild } from "../core/qBuilder";
import { MErr, ModelError } from "../index";

interface ComplaintData {
    complaintId: string
    refNo: string
    type: string
    customerId: string
    subject: string
    description: string
    status: string
    createdDate: Date
    assignedDiv: string
    assignedDate: Date
}

interface ComplaintLogEntry {
    id: number
    complaint_id: string
    update_by: string
    update_at: Date
    subject: string
    description: string
}

const complaintMapper = BuildMapper<ComplaintData>([
    mp("complaint_id", "complaintId"),
    mp("ref_no", "refNo"),
    mp("customer_id", "customerId"),
    mp("created_date", "createdDate"),
    mp("assigned_div", "assignedDiv"),
    mp("assigned_date", "assignedDate")
]);

const logEntryMapper = BuildMapper<ComplaintLogEntry>([
    mp("complaint_id", "complaintId"),
    mp("update_by", "updateBy"),
    mp("update_at", "updateAt"),
]);

export const complaint = {
    addComplaint: async (data: any): Promise<[ModelError, string]> => {
        const complaintId = genUUID()
        const args = [
            complaintId,
            data.refNo || 'auto',
            data.type,
            data.customerId,
            data.subject,
            data.description,
            data.assignedDiv || 'none'
        ]
        const [error] = await mysqlExeEW.run(
            `CALL AddComplaint(${QBuild.ARGS_STRING(args.length)})`,
            args
        );
        return [error, complaintId];
    },

    assignDivision: async (complaintId: string, division: string, userId: string): Promise<ModelError> => {
        const args = [
            complaintId,
            division,
            userId
        ]
        const [error] = await mysqlExeEW.run(
            `CALL AssignDivision(${QBuild.ARGS_STRING(args.length)})`,
            args
        )
        return error;
    },

    updateDivisionAssignment: async (complaintId: string, division: string, userId: string): Promise<ModelError> => {
        const args = [
            complaintId,
            division,
            userId
        ]
        const [error] = await mysqlExeEW.run(
            `CALL UpdateDivision(${QBuild.ARGS_STRING(args.length)})`,
            args
        )
        return error;
    },

    addAttachment: async (complaintId: string, attachmentId: string): Promise<ModelError> => {
        const [error] = await mysqlExeEW.run(
            ...QBuild.INSERT("complaint_attachment", {
                complaint_id: complaintId,
                attachment_id: attachmentId
            })
        );

        return error;
    },

    getComplaint: async (condition: any): Promise<[ModelError, ComplaintData[]]> => {
        const [error, res] = await mysqlExeEW.run(...QBuild.SELECT("complaints_with_divisions", condition));

        let complaints = [];
        if (error === "") {
            complaints = res[0];
            for (let i = 0; i < complaints.length; i++) {
                complaints[i] = complaintMapper.forward(complaints[i]);
            }
        }

        return [error, complaints];
    },

    getComplaintLogs: async (complaintId: string): Promise<[ModelError, ComplaintLogEntry]> => {
        const [error, data] = await mysqlExeEW.run(
            ...QBuild.SELECT("complaint_log", { complaint_id: complaintId })
        );

        let logEntries = data[0];
        if (error === MErr.NO_ERRORS) {
            for (let i = 0; i < logEntries.length; i++) {
                logEntries[i] = logEntryMapper.forward(logEntries[i]);
            }
        }

        return [error, logEntries];
    },

    getComplaintAttachments: async (complaintId: string): Promise<[ModelError, string[]]> => {
        const [error, data] = await mysqlExeEW.run(
            `SELECT attachment_id FROM complaint_attachment
                    WHERE complaint_id = ?`,
            [complaintId]
        );

        return [error, data[0]];
    },

    updateComplaintStatus: async (complaintId: string, userId: string, data: any): Promise<ModelError> => {

        const args = [
            complaintId,
            userId,
            data.status,
            data.subject,
            data.description
        ];

        const [error] = await mysqlExeEW.run(
            `CALL UpdateComplaint(${QBuild.ARGS_STRING(args.length)})`,
            args
        );
        return error;
    }

};


