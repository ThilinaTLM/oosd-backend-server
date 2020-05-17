import Sequelize, {
    ModelAttributes,
    Sequelize as TypeSequelize
} from "sequelize";

const columns: ModelAttributes = {
    permissionId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    permissionName: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
};

export default (sequelize: TypeSequelize) => {
    class Permission extends Sequelize.Model {}
    Permission.init(columns, {
        sequelize,
        modelName: "permissions"
    });
    return Permission;
};
