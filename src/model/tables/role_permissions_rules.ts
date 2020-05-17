import Sequelize, {
    ModelAttributes,
    Sequelize as TypeSequelize
} from "sequelize";

const columns: ModelAttributes = {
    ruleId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    permissionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    allowed: {
        type: Sequelize.BOOLEAN,
        defaultValue: true // true means allowed
    }
};

export default (sequelize: TypeSequelize) => {
    class RolePermission extends Sequelize.Model {}
    RolePermission.init(columns, {
        sequelize,
        modelName: "rolePermissions"
    });
    return RolePermission;
};
