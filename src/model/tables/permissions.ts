import {
    Sequelize,
    Model,
    DataTypes,
    ModelAttributes,
    InitOptions
} from "sequelize";

export class Permission extends Model {}

const columns: ModelAttributes = {
    permissionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    permissionName: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
};

export default function createModel(sequelize: Sequelize) {
    const options: InitOptions = {
        sequelize,
        modelName: "permissions",
        underscored: true,
        timestamps: false,
        freezeTableName: true
    };

    Permission.init(columns, options);
    return Permission;
}
