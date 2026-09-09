import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const StudentModel = sequelize.define("Student", {
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
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confirmEmail: {                          
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

export default StudentModel