import { DataTypes } from "sequelize";
import sequelize from "../connection.js";
import StudentModel from "./student.model.js";
import SemesterModel from "./semester.model.js";

const SemesterRegistrationModel = sequelize.define("SemesterRegistration", {
    registrationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

StudentModel.belongsToMany(SemesterModel, {
    through: SemesterRegistrationModel,
    foreignKey: "studentId"
});

SemesterModel.belongsToMany(StudentModel, {
    through: SemesterRegistrationModel,
    foreignKey: "semesterId"
});

export default SemesterRegistrationModel;