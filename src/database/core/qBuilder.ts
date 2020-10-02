type DataObjectValue = string | number
type DataObject = { [key: string]: DataObjectValue }

export const QBuild = {
    /**
     * Generate Argument Holding String
     * @param length
     */
    ARGS_STRING(length: number): string {
        let str = "";
        if (length > 0) str = "?";
        for (let i = 1; i < length; i++) {
            str += ", ?";
        }
        return str;
    },

    /**
     * Insert Query Builder
     * @param table : table name
     * @param data : object that contains database to insert
     */
    INSERT(table: string, data: DataObject): [string, Array<DataObjectValue>] {
        const keys = [], values = [], placeholders = [];
        for (let k in data) {
            keys.push(k);
            values.push(data[k]);
            placeholders.push("?");
        }

        return [
            `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders.join(", ")})`,
            values
        ];
    },

    /**
     * Update query builder
     * @param table : table name
     * @param data : object that contains database to be updated
     * @param condition : contains WHERE clause conditions
     */
    UPDATE(table: string, data: DataObject, condition: DataObject): [string, Array<DataObjectValue>] {
        const sets = [], where = [], values = [];
        for (let k in data) {
            sets.push(`SET ${k} = ?`);
            values.push(data[k]);
        }

        for (let k in condition) {
            where.push(`${k} = ?`);
            values.push(condition[k]);
        }

        return [
            `UPDATE ${table} ${sets.join(", ")} WHERE ${where.join(" AND ")}`,
            values
        ];

    },

    /**
     * Select * Query Builder
     * @param table : table name
     * @param condition : object, condition which need to put in where
     */
    SELECT(table: string, condition: DataObject): [string, Array<DataObjectValue>] {
        const where = [], values = [];
        for (let k in condition) {
            where.push(`${k} = ?`);
            values.push(condition[k]);
        }

        if (where.length === 0) {
            return [
                `SELECT * FROM ${table}`,
                values
            ];
        }

        return [
            `SELECT * FROM ${table} WHERE ${where.join(" AND ")}`,
            values
        ];
    },

    /**
     * Select * Query Builder for Full UserAccount
     * @param condition : object, condition which need to put in where
     */
    SELECT_USER(condition: DataObject): [string, Array<DataObjectValue>] {
        const where = [], values = [];
        for (let k in condition) {
            where.push(`${k} = ?`);
            values.push(condition[k]);
        }

        if (where.length === 0) {
            return [
                `SELECT u.*, c.verified, c.username FROM users u 
                    JOIN credentials c ON c.user_id = u.user_id`,
                values
            ];
        }

        return [
            `SELECT u.*, c.verified, c.username FROM users u 
                    JOIN credentials c ON c.user_id = u.user_id
                        WHERE ${where.join(" AND ")}`,
            values
        ];
    },

    COUNT(table: string, condition: any = {}): [string, Array<DataObjectValue>] {
        const where = [], values = [];
        for (let k in condition) {
            where.push(`${k} = ?`);
            values.push(condition[k]);
        }

        if (where.length === 0) {
            return [
                `SELECT COUNT(*) FROM ${table}`,
                values
            ];
        }

        return [
            `SELECT COUNT(*) FROM ${table} WHERE ${where.join(" AND ")}`,
            values
        ];
    },

    DELETE(table: string, condition: any): [string, Array<DataObjectValue>] {
        const where = [], values = [];
        for (let k in condition) {
            where.push(`${k} = ?`);
            values.push(condition[k]);
        }

        if (where.length === 0) {
            console.error(`[WARN]: Tried to generated delete all query for table ${table}`)
            return [
                ``, []
            ]
            // return [
            //     `DELETE FROM ${table}`,
            //     values
            // ];
        }

        return [
            `DELETE FROM ${table} WHERE ${where.join(" AND ")}`,
            values
        ];
    }

};