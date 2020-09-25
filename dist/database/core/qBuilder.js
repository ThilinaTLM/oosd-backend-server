"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QBuild = void 0;
exports.QBuild = {
    /**
     * Generate Argument Holding String
     * @param length
     */
    ARGS_STRING: function (length) {
        var str = "";
        if (length > 0)
            str = "?";
        for (var i = 1; i < length; i++) {
            str += ", ?";
        }
        return str;
    },
    /**
     * Insert Query Builder
     * @param table : table name
     * @param data : object that contains database to insert
     */
    INSERT: function (table, data) {
        var keys = [], values = [], placeholders = [];
        for (var k in data) {
            keys.push(k);
            values.push(data[k]);
            placeholders.push("?");
        }
        return [
            "INSERT INTO " + table + " (" + keys.join(", ") + ") VALUES (" + placeholders.join(", ") + ")",
            values
        ];
    },
    /**
     * Update query builder
     * @param table : table name
     * @param data : object that contains database to be updated
     * @param condition : contains WHERE clause conditions
     */
    UPDATE: function (table, data, condition) {
        var sets = [], where = [], values = [];
        for (var k in data) {
            sets.push("SET " + k + " = ?");
            values.push(data[k]);
        }
        for (var k in condition) {
            where.push(k + " = ?");
            values.push(condition[k]);
        }
        return [
            "UPDATE " + table + " " + sets.join(", ") + " WHERE " + where.join(" AND "),
            values
        ];
    },
    /**
     * Select * Query Builder
     * @param table : table name
     * @param condition : object, condition which need to put in where
     */
    SELECT: function (table, condition) {
        var where = [], values = [];
        for (var k in condition) {
            where.push(k + " = ?");
            values.push(condition[k]);
        }
        if (where.length === 0) {
            return [
                "SELECT * FROM " + table,
                values
            ];
        }
        return [
            "SELECT * FROM " + table + " WHERE " + where.join(" AND "),
            values
        ];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicUJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGF0YWJhc2UvY29yZS9xQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHYSxRQUFBLE1BQU0sR0FBRztJQUNsQjs7O09BR0c7SUFDSCxXQUFXLEVBQVgsVUFBWSxNQUFjO1FBQ3RCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksTUFBTSxHQUFHLENBQUM7WUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsR0FBRyxJQUFJLEtBQUssQ0FBQTtTQUNmO1FBQ0QsT0FBTyxHQUFHLENBQUE7SUFDZCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sRUFBTixVQUFPLEtBQWEsRUFBRSxJQUFnQjtRQUNsQyxJQUFNLElBQUksR0FBRyxFQUFFLEVBQUUsTUFBTSxHQUFHLEVBQUUsRUFBRSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2hELEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDMUI7UUFFRCxPQUFPO1lBQ0gsaUJBQWUsS0FBSyxVQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFhLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQUc7WUFDL0UsTUFBTTtTQUNULENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxNQUFNLEVBQU4sVUFBTyxLQUFhLEVBQUUsSUFBZ0IsRUFBRSxTQUFxQjtRQUN6RCxJQUFNLElBQUksR0FBRyxFQUFFLEVBQUUsS0FBSyxHQUFHLEVBQUUsRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBTyxDQUFDLFNBQU0sQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEI7UUFFRCxLQUFLLElBQUksQ0FBQyxJQUFJLFNBQVMsRUFBRTtZQUNyQixLQUFLLENBQUMsSUFBSSxDQUFJLENBQUMsU0FBTSxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QjtRQUVELE9BQU87WUFDSCxZQUFVLEtBQUssU0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFVLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFHO1lBQ2pFLE1BQU07U0FDVCxDQUFDO0lBRU4sQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLEVBQU4sVUFBTyxLQUFhLEVBQUUsU0FBcUI7UUFDdkMsSUFBTSxLQUFLLEdBQUcsRUFBRSxFQUFFLE1BQU0sR0FBRyxFQUFFLENBQUE7UUFDN0IsS0FBSyxJQUFJLENBQUMsSUFBSSxTQUFTLEVBQUU7WUFDckIsS0FBSyxDQUFDLElBQUksQ0FBSSxDQUFDLFNBQU0sQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0I7UUFFRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLE9BQVE7Z0JBQ0osbUJBQWlCLEtBQU87Z0JBQ3hCLE1BQU07YUFDVCxDQUFBO1NBQ0o7UUFFRCxPQUFRO1lBQ0osbUJBQWlCLEtBQUssZUFBVSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBRztZQUNyRCxNQUFNO1NBQ1QsQ0FBQTtJQUNMLENBQUM7Q0FFSixDQUFDIn0=