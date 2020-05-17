import Sequelize, {
    ModelAttributes,
    Sequelize as TypeSequelize
} from "sequelize";

const columns: ModelAttributes = {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true
        // references: {
        //     model: "users",
        //     key: "userId"
        // }
    },

    hash: {
        type: Sequelize.CHAR(32),
        defaultValue: "12345"
    },

    renew: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },

    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
};

export default (sequelize: TypeSequelize) => {
    class Password extends Sequelize.Model {}
    Password.init(columns, {
        sequelize,
        modelName: "passwords"
    });
    return Password;
};
