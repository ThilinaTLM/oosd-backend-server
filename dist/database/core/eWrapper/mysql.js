"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlExeEW = void 0;
var eWrapper_1 = require("./eWrapper");
var executor_1 = require("../executor/executor");
var errors_1 = require("../errors");
exports.mysqlExeEW = eWrapper_1.EWBuilder(executor_1.mysqlExecutor, [
    function (e) {
        switch (e.code) {
            case "ECONNREFUSED":
                console.log(e.code, "|", e.sqlMessage);
                return errors_1.ModelErrorSet.CONNECTION_FAILED;
            case "ER_WRONG_ARGUMENTS":
                console.log(e.code, "|", e.sqlMessage);
                return errors_1.ModelErrorSet.WRONG_ARGUMENTS;
            case "ER_NO_DEFAULT_FOR_FIELD":
                console.log(e.code, "|", e.sqlMessage);
                return errors_1.ModelErrorSet.ESSENTIALS_ARE_NULL;
            case "ER_DUP_ENTRY":
                console.log(e.code, "|", e.sqlMessage);
                return errors_1.ModelErrorSet.DUPLICATE;
            default:
                if (e.sqlMessage)
                    console.log(e.code, "|", e.sqlMessage);
                else
                    console.log(e);
                return errors_1.ModelErrorSet.UNKNOWN;
        }
    }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlzcWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGF0YWJhc2UvY29yZS9lV3JhcHBlci9teXNxbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBdUM7QUFDdkMsaURBQXFEO0FBQ3JELG9DQUFzRDtBQUV6QyxRQUFBLFVBQVUsR0FBRyxvQkFBUyxDQUFDLHdCQUFhLEVBQUU7SUFDL0MsVUFBQyxDQUFNO1FBQ0gsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFO1lBQ1osS0FBSyxjQUFjO2dCQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN2QyxPQUFPLHNCQUFhLENBQUMsaUJBQWlCLENBQUM7WUFDM0MsS0FBSyxvQkFBb0I7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN2QyxPQUFPLHNCQUFhLENBQUMsZUFBZSxDQUFDO1lBQ3pDLEtBQUsseUJBQXlCO2dCQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDdkMsT0FBTyxzQkFBYSxDQUFDLG1CQUFtQixDQUFDO1lBQzdDLEtBQUssY0FBYztnQkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDdkMsT0FBTyxzQkFBYSxDQUFDLFNBQVMsQ0FBQztZQUNuQztnQkFDSSxJQUFJLENBQUMsQ0FBQyxVQUFVO29CQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDOztvQkFFdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsT0FBTyxzQkFBYSxDQUFDLE9BQU8sQ0FBQztTQUNwQztJQUNMLENBQUM7Q0FDSixDQUFDLENBQUMifQ==