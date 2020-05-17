import {
    Sequelize,
    Model,
    DataTypes,
    ModelAttributes,
    InitOptions
} from "sequelize";

export class Password extends Model {}

const columns: ModelAttributes = {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    hash: {
        type: DataTypes.CHAR(60),
        defaultValue:
            "$2b$10$P8AQuuZ9SR0rtPR7jLPzg.A/P6dKzipgMS1vwkB/i7bieYmLgU90m"
    },

    renew: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
};

export default function createModel(sequelize: Sequelize) {
    const options: InitOptions = {
        sequelize,
        modelName: "passwords",
        underscored: true,
        timestamps: false,
        freezeTableName: true
    };

    Password.init(columns, options);
    return Password;
}
