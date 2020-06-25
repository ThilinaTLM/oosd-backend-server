import {
    Sequelize,
    Model,
    DataTypes,
    ModelAttributes,
    InitOptions
} from "sequelize";

export class PermissionRules extends Model {}

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
        modelName: "permission_roles",
        underscored: true,
        timestamps: true,
        freezeTableName: true
    };

    PermissionRules.init(columns, options);
    return PermissionRules;
}
