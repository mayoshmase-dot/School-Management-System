import StudentModel from "../../../DB/models/student.model.js";
import { asyncHandler } from "../../utils/catchError.js";
import { AppError } from "../../utils/appError.js";

export const getAll = asyncHandler(async (req, res) => {
    const students = await StudentModel.findAll();
    return res.status(200).json({ message: "success", students });
});

export const getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await StudentModel.findByPk(id);
    if (!student) throw new AppError("Student not found", 404);
    return res.status(200).json({ message: "success", student });
});

export const updateStudent = asyncHandler(async (req, res) => {
    const student = req.student;   
    await student.update(req.body);
    return res.status(200).json({ message: "success", student });
});

export const deleteStudent = asyncHandler(async (req, res) => {
    const student = req.student;
    await student.destroy();
    return res.status(200).json({ message: "Student deleted successfully" });
});