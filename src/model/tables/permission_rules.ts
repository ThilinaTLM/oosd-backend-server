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
    class PermissionRule extends Sequelize.Model {}
    PermissionRule.init(columns, {
        sequelize,
        modelName: "permissionRules"
    });
    return PermissionRule;
};
