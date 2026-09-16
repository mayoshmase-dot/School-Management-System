import TeacherModel from "../../../DB/models/teacher.model.js";
import { asyncHandler } from "../../utils/catchError.js";
import { AppError } from "../../utils/appError.js";

export const getAll = asyncHandler(async (req, res) => {
    const user = await TeacherModel.findAll();
    return res.status(200).json({ message: "success", user });
});

export const getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const teacher = await TeacherModel.findByPk(id);
    if (!teacher) throw new AppError("Teacher not found", 404);
    return res.status(200).json({ message: "success", teacher });
});

export const createTeacher = asyncHandler(async (req, res) => {
    const teacher = await TeacherModel.create(req.body);
    return res.status(201).json({ message: "success", teacher });
});

export const updateTeacher = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const teacher = await TeacherModel.findByPk(id);
    if (!teacher) throw new AppError("Teacher not found", 404);
    await teacher.update(req.body);
    return res.status(200).json({ message: "success", teacher });
});

export const deleteTeacher = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const teacher = await TeacherModel.findByPk(id);
    if (!teacher) throw new AppError("Teacher not found", 404);
    await teacher.destroy();
    return res.status(200).json({ message: "Teacher deleted successfully" });
});