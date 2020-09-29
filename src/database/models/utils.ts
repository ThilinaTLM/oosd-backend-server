import { mysqlExeEW } from "../core/eWrapper/mysql";
import { QBuild } from "../core/qBuilder";
import { MErr, ModelError } from "../index";
import { BuildMapper, mp } from "../core/mapper";

interface Office {
    name :string,
    address: string
}

interface AttachmentEntry {
    attachmentId: string
    originalName: string
    contentType: string
}

const attachmentEntryMapper = BuildMapper<AttachmentEntry>([
    mp('attachment_id', 'attachmentId'),
    mp('original_name', 'originalName'),
    mp('content_type', 'contentType')
])

export const utils = {

    getAllDivisions: async (): Promise<[ModelError, Office[]]> => {
        const [error, data] = await mysqlExeEW.run('SELECT * FROM divisional_offices');
        return [error, data[0]];
    },

    getAllGNOffices: async (): Promise<[ModelError, Office[]]> => {
        const [error, data] = await mysqlExeEW.run('SELECT * FROM grama_niladhari_offices');
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
        return error
    },

    addGNOffice: async (name: string, address: string): Promise<ModelError> => {
        const [error, _] = await mysqlExeEW.run(
            ...QBuild.INSERT("grama_niladhari_offices",
                {
                    name,
                    address
                }
            ));
        return error
    },

    addAttachment: async (attachmentId: string, originalName: string, contentType: string): Promise<ModelError> => {
        const [error, _] = await mysqlExeEW.run(
            ...QBuild.INSERT('attachments', {
                attachment_id: attachmentId,
                original_name: originalName,
                content_type: contentType
            })
        )
        return error
    },

    getAttachment: async (attachmentId: string): Promise<[ModelError, AttachmentEntry]> => {
        const [error, data] = await mysqlExeEW.run(
            ...QBuild.SELECT('attachments', {'attachment_id': attachmentId})
        )

        if (data[0].length < 1) {
            return [MErr.NO_ENTRY_FOUND, data[0]]
        }

        let attachment: AttachmentEntry = data[0][0];
        if (error === MErr.NO_ERRORS) {
            attachment = attachmentEntryMapper.forward(attachment)
        }

        return [error, attachment]
    },
};