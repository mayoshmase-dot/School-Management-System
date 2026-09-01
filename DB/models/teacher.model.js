import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const TeacherModel = sequelize.define("Teacher",{
firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }})

  export default TeacherModel