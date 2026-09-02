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

  export default CourseModel