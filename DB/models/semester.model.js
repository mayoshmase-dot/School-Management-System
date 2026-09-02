import { DataTypes } from "sequelize";
import sequelize from "../connection.js";
import ManagerModel from "./manager.model.js";

const SemesterModel = sequelize.define("Semester", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('planned', 'active', 'ended'),
    allowNull: false,
    defaultValue: 'planned'
  }
});

ManagerModel.hasMany(SemesterModel, {
  foreignKey: {
    name: 'managerId',
    allowNull: false
  }
});

SemesterModel.belongsTo(ManagerModel, {
  foreignKey: {
    name: 'managerId',
  }
});
export default SemesterModel;