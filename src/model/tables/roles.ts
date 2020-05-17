import Sequelize, {
    ModelAttributes,
    Sequelize as TypeSequelize
} from "sequelize";

const columns: ModelAttributes = {
    roleId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    roleName: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
};

export default (sequelize: TypeSequelize) => {
    class Role extends Sequelize.Model {}
    Role.init(columns, {
        sequelize,
        modelName: "roles"
    });
    return Role;
};
