import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const CourseModel = sequelize.define("Course", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
CourseModel.belongsToMany(CourseModel, {
    through: "Course_Prerequisites",
    as: "prerequisites",
    foreignKey: "courseId",
    otherKey: "prerequisiteId"
});

CourseModel.belongsToMany(CourseModel, {
    through: "Course_Prerequisites",
    as: "requiredFor",
    foreignKey: "prerequisiteId",
    otherKey: "courseId"
});
  export default CourseModel