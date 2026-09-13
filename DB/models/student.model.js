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
    status: {
        type: DataTypes.ENUM("active", "not_active"),
        allowNull: false,
        defaultValue: "active"
    },
    confirmEmail: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    sendCode: {
        type: DataTypes.STRING,
        defaultValue: null
    }
})

export default StudentModel