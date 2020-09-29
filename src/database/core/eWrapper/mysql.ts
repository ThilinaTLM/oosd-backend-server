import { EWBuilder } from "./eWrapper";
import { mysqlExecutor } from "../executor/executor";
import { ModelError, ModelErrorSet } from "../errors";

export const mysqlExeEW = EWBuilder(mysqlExecutor, [
    (e: any): ModelError => {
        switch (e.code) {
            case "ECONNREFUSED":
                console.log(e.code, "|", e.sqlMessage);
                return ModelErrorSet.CONNECTION_FAILED;
            case "ER_WRONG_ARGUMENTS":
                console.log(e.code, "|", e.sqlMessage);
                return ModelErrorSet.WRONG_ARGUMENTS;
            case "ER_NO_DEFAULT_FOR_FIELD":
                console.log(e.code, "|", e.sqlMessage);
                return ModelErrorSet.ESSENTIALS_ARE_NULL;
            case "ER_DUP_ENTRY":
                console.log(e.code, "|", e.sqlMessage);
                return ModelErrorSet.DUPLICATE;
            default:
                if (e.sqlMessage)
                    console.log(e.code, "|", e.sqlMessage);
                else
                    console.log(e);
                return ModelErrorSet.UNKNOWN;
        }
    }
]);