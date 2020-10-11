import { mysqlExeEW } from "../core/eWrapper/mysql";
import { QBuild } from "../core/qBuilder";
import { MErr, ModelError } from "../index";
import { BuildMapper, mp } from "../core/mapper";
import { Mode } from "fs";

interface Office {
    name: string,
    address: string
}

interface AttachmentEntry {
    attachmentId: string
    originalName: string
    contentType: string
}

const attachmentEntryMapper = BuildMapper<AttachmentEntry>([
    mp("attachment_id", "attachmentId"),
    mp("original_name", "originalName"),
    mp("content_type", "contentType")
]);

export const utils = {

    getAllDivisions: async (): Promise<[ModelError, Office[]]> => {
        const [error, data] = await mysqlExeEW.run("SELECT * FROM divisional_offices");
        return [error, data[0]];
    },

    getAllGNOffices: async (): Promise<[ModelError, Office[]]> => {
        const [error, data] = await mysqlExeEW.run("SELECT * FROM grama_niladhari_offices");
        return [error, data[0]];
    },

    addDivision: async (name: string, address: string): Promise<ModelError> => {
        const [error, _] = await mysqlExeEW.run(
            ...QBuild.INSERT("divisional_offices",
                {
                    name,
                    address
                }
            ));
        return error;
    },

    addGNOffice: async (name: string, address: string): Promise<ModelError> => {
        const [error, _] = await mysqlExeEW.run(
            ...QBuild.INSERT("grama_niladhari_offices",
                {
                    name,
                    address
                }
            ));
        return error;
    },

    deleteDivision: async (name: string): Promise<ModelError> => {
        const [error, _] = await mysqlExeEW.run(
            ...QBuild.DELETE("divisional_offices", { name })
        );

        return error;
    },

    deleteGNOffice: async (name: string): Promise<ModelError> => {
        const [error, _] = await mysqlExeEW.run(
            ...QBuild.DELETE("grama_niladhari_offices", { name })
        );

        return error;
    },

    addAttachment: async (attachmentId: string, originalName: string, contentType: string): Promise<ModelError> => {
        const [error, _] = await mysqlExeEW.run(
            ...QBuild.INSERT("attachments", {
                attachment_id: attachmentId,
                original_name: originalName,
                content_type: contentType
            })
        );
        return error;
    },

    getAttachment: async (attachmentId: string): Promise<[ModelError, AttachmentEntry]> => {
        const [error, data] = await mysqlExeEW.run(
            ...QBuild.SELECT("attachments", { "attachment_id": attachmentId })
        );

        if (data[0].length < 1) {
            return [MErr.NO_ENTRY_FOUND, data[0]];
        }

        let attachment: AttachmentEntry = data[0][0];
        if (error === MErr.NO_ERRORS) {
            attachment = attachmentEntryMapper.forward(attachment);
        }

        return [error, attachment];
    },

    getCount: async (table: string, condition: any = {}): Promise<[ModelError, number]> => {
        const [error, res] = await mysqlExeEW.run(
            ...QBuild.COUNT(table, condition)
        );

        let count = 0;
        if (error === "")
            count = res[0][0]["COUNT(*)"];

        return [error, count];
    },

    getAllComplaintStatus: async (): Promise<[ModelError, Office[]]> => {
        const [error, data] = await mysqlExeEW.run("SELECT * FROM complaint_states");
        return [error, data[0]];
    },

    getAllComplaintTypes: async (): Promise<[ModelError, Office[]]> => {
        const [error, data] = await mysqlExeEW.run("SELECT * FROM complaint_types");
        return [error, data[0]];
    },

    getAllUserRoles: async (): Promise<[ModelError, Office[]]> => {
        const [error, data] = await mysqlExeEW.run("SELECT * FROM user_roles");
        return [error, data[0]];
    }

};