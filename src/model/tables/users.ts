import {
    Sequelize,
    Model,
    DataTypes,
    ModelAttributes,
    InitOptions
} from "sequelize";

export class User extends Model {}

const columns: ModelAttributes = {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userName: {
        type: DataTypes.STRING(15),
        allowNull: false
    },

    firstName: {
        type: DataTypes.STRING(20),
        allowNull: false
    },

    lastName: {
        type: DataTypes.STRING(20),
        defaultValue: ""
    },

    fullName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    nicNumber: {
        type: DataTypes.STRING(20),
        allowNull: false
    },

    telephoneNumber: {
        type: DataTypes.STRING(12)
    },

    address: {
        type: DataTypes.TEXT
    },

    divisionalOffice: {
        type: DataTypes.STRING(20)
    },

    gramaNiladhariOffice: {
        type: DataTypes.STRING(20)
    },

    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
};

export default function createModel(sequelize: Sequelize) {
    const options: InitOptions = {
        sequelize,
        modelName: "users",
        underscored: true,
        timestamps: true,
        freezeTableName: true
    };

    User.init(columns, options);
    return User;
}
