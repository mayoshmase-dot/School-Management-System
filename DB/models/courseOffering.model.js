import { DataTypes } from "sequelize";
import sequelize from "../connection.js";
import CourseModel from "./course.model.js";
import SemesterModel from "./semester.model.js";
import TeacherModel from "./teacher.model.js";

const CourseOfferingModel = sequelize.define("CourseOffering", {
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('open', 'closed', 'cancelled'),
    allowNull: false,
    defaultValue: 'open'
  },
  maxCapacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

CourseModel.hasMany(CourseOfferingModel, {
  foreignKey: { name: 'courseId' }
});
CourseOfferingModel.belongsTo(CourseModel, {
  foreignKey: { name: 'courseId', allowNull: false }
});

// الربط مع Semester (Total — كل Offering لازم يتبع سمستر)
SemesterModel.hasMany(CourseOfferingModel, {
  foreignKey: { name: 'semesterId' }
});
CourseOfferingModel.belongsTo(SemesterModel, {
  foreignKey: { name: 'semesterId', allowNull: false }
});

TeacherModel.hasMany(CourseOfferingModel, {
  foreignKey: { name: 'teacherId' }
});
CourseOfferingModel.belongsTo(TeacherModel, {
  foreignKey: { name: 'teacherId', allowNull: false }
});

export default CourseOfferingModel;