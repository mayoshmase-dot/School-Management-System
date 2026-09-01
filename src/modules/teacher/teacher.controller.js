import TeacherModel from "../../../DB/models/teacher.model.js";
import { teacherSchema } from "./teacher.validation.js";

export const getAll = async (req, res) => {
    const user = await TeacherModel.findAll();
    return res.status(200).json({ message: "success", user });
};

export const getById = async (req, res) => {
    const { id } = req.params;

    const teacher = await TeacherModel.findByPk(id);
    if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
    }
    return res.status(200).json({ message: "success", teacher });
};

export const createTeacher = async (req, res) => {
    const { error } = teacherSchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    }

    const teacher = await TeacherModel.create(req.body);
    return res.status(201).json({ message: "success", teacher });
};

export const updateTeacher = async (req, res) => {
    const { id } = req.params;
    const teacher = await TeacherModel.findByPk(id);
    if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
    }
    await teacher.update(req.body);
    return res.status(200).json({ message: "success", teacher });
};

export const deleteTeacher = async (req, res) => {
    const { id } = req.params;

    const teacher = await TeacherModel.findByPk(id);
    if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
    }
    await teacher.destroy();
    return res.status(200).json({ message: "Teacher deleted successfully" });
};