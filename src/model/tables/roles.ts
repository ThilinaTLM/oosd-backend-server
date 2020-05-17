import {
    Sequelize,
    Model,
    DataTypes,
    ModelAttributes,
    InitOptions
} from "sequelize";

export class Role extends Model {}

const columns: ModelAttributes = {
    roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    roleName: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
};

export default function createModel(sequelize: Sequelize) {
    const options: InitOptions = {
        sequelize,
        modelName: "roles",
        underscored: true,
        timestamps: false,
        freezeTableName: true
    };

    Role.init(columns, options);
    return Role;
}
