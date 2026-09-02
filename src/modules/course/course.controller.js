import CourseModel from "../../../DB/models/course.model.js";
import { courseSchema } from "./course.validation.js";

export const getAll = async (req, res) => {
    const courses = await CourseModel.findAll();
    return res.status(200).json({ message: "success", courses });
};

export const getById = async (req, res) => {
    const { id } = req.params;

    const course = await CourseModel.findByPk(id);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({ message: "success", course });
};

export const createCourse = async (req, res) => {
    const { error } = courseSchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    }

    const course = await CourseModel.create(req.body);
    return res.status(201).json({ message: "success", course });
};

export const updateCourse = async (req, res) => {
    const { id } = req.params;
    const course = await CourseModel.findByPk(id);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    await course.update(req.body);
    return res.status(200).json({ message: "success", course });
};

export const deleteCourse = async (req, res) => {
    const { id } = req.params;

    const course = await CourseModel.findByPk(id);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    await course.destroy();
    return res.status(200).json({ message: "Course deleted successfully" });
};