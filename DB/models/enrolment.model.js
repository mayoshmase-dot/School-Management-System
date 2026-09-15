import { DataTypes } from "sequelize";
import sequelize from "../connection.js";
import StudentModel from "./student.model.js";
import CourseOfferingModel from "./courseOffering.model.js";

const EnrolmentModel = sequelize.define("Enrolment", {
    enrolmentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    gradeValue: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    dateGiven: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
});

StudentModel.hasMany(EnrolmentModel, {
    foreignKey: { name: 'studentId', allowNull: false }
});
EnrolmentModel.belongsTo(StudentModel, {
    foreignKey: { name: 'studentId', allowNull: false }
});

CourseOfferingModel.hasMany(EnrolmentModel, {
    foreignKey: { name: 'offeringId', allowNull: false }
});
EnrolmentModel.belongsTo(CourseOfferingModel, {
    foreignKey: { name: 'offeringId', allowNull: false }
});

export default EnrolmentModel;