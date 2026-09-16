import SemesterModel from "../../../DB/models/semester.model.js";
import { asyncHandler } from "../../utils/catchError.js";
import { AppError } from "../../utils/appError.js";

export const getAll = asyncHandler(async (req, res) => {
    const semesters = await SemesterModel.findAll();
    return res.status(200).json({ message: "success", semesters });
});

export const getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const semester = await SemesterModel.findByPk(id);
    if (!semester) throw new AppError("Semester not found", 404);
    return res.status(200).json({ message: "success", semester });
});

export const createSemester = asyncHandler(async (req, res) => {
    const semester = await SemesterModel.create(req.body);
    return res.status(201).json({ message: "success", semester });
});

export const updateSemester = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const semester = await SemesterModel.findByPk(id);
    if (!semester) throw new AppError("Semester not found", 404);
    await semester.update(req.body);
    return res.status(200).json({ message: "success", semester });
});

export const deleteSemester = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const semester = await SemesterModel.findByPk(id);
    if (!semester) throw new AppError("Semester not found", 404);
    await semester.destroy();
    return res.status(200).json({ message: "Semester deleted successfully" });
});