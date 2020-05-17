import {
    Sequelize,
    Model,
    DataTypes,
    ModelAttributes,
    InitOptions
} from "sequelize";

export class RolePermissionRule extends Model {}

const columns: ModelAttributes = {
    ruleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    allowed: {
        type: DataTypes.BOOLEAN,
        defaultValue: true // true means allowed
    }
};

export default function createModel(sequelize: Sequelize) {
    const options: InitOptions = {
        sequelize,
        modelName: "role_permission_rules",
        underscored: true,
        timestamps: true,
        freezeTableName: true
    };

    RolePermissionRule.init(columns, options);
    return RolePermissionRule;
}
