import { Sequelize, SyncOptions } from "sequelize";
import { MYSQL_PROFILE } from "../env";

// import model structures.
import usersTableCreator from "./tables/users";
import passwordsTableCreator from "./tables/passwords";
import rolesTableCreator from "./tables/roles";
import permissionsTableCreator from "./tables/permissions";
import rolePermissionsTableCreator from "./tables/role_permissions_rules";
import permissionRulesTableCreator from "./tables/permission_rules";

export interface ConnectionProfile {
    username: string;
    password: string;
    database: string;
    host: string;
    port?: number;
}

const sequelize = new Sequelize(
    MYSQL_PROFILE.database,
    MYSQL_PROFILE.username,
    MYSQL_PROFILE.password,
    {
        host: MYSQL_PROFILE.host,
        port: MYSQL_PROFILE.port,
        dialect: "mysql"
    }
);

// Initilize models and binding relationships
const user = usersTableCreator(sequelize);
const password = passwordsTableCreator(sequelize);
const role = rolesTableCreator(sequelize);
const permission = permissionsTableCreator(sequelize);
const rolePermission = rolePermissionsTableCreator(sequelize);
const permissionRule = permissionRulesTableCreator(sequelize);

// ------------------------------ Relations -------------------------------------
// User (1 --- 1) Password
user.hasOne(password, {
    foreignKey: "userId",
    foreignKeyConstraint: true
});

// Role (1 --- *) User
role.hasMany(user, {
    foreignKey: "roleId",
    foreignKeyConstraint: true
});

// Role (1 --- *) RolePermission
role.hasMany(rolePermission, {
    foreignKey: "roleId",
    foreignKeyConstraint: true
});

// Permission (1 --- *) RolePermission
permission.hasMany(rolePermission, {
    foreignKey: "permissionId",
    foreignKeyConstraint: true
});

// User (1 --- *) PermissionRule
user.hasMany(permissionRule, {
    foreignKey: "userId",
    foreignKeyConstraint: true
});

// Permission (1 --- *) PermissionRule
permission.hasMany(permissionRule, {
    foreignKey: "permissionId",
    foreignKeyConstraint: true
});
// ------------------------------------------------------------------------------

export const sync = async (options: SyncOptions) =>
    await sequelize.sync(options);

export default {
    user,
    password,
    role,
    permission,
    rolePermission,
    permissionRule
};
