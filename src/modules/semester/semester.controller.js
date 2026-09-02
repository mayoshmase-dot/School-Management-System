import SemesterModel from "../../../DB/models/semester.model.js";
import { semesterSchema } from "./semester.validation.js";

export const getAll = async (req, res) => {
    const semesters = await SemesterModel.findAll();
    return res.status(200).json({ message: "success", semesters });
};

export const getById = async (req, res) => {
    const { id } = req.params;
    const semester = await SemesterModel.findByPk(id);
    if (!semester) {
        return res.status(404).json({ message: "Semester not found" });
    }
    return res.status(200).json({ message: "success", semester });
};

export const createSemester = async (req, res) => {
    const { error } = semesterSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "error", error: error.details[0].message });
    }
    const semester = await SemesterModel.create(req.body);
    return res.status(201).json({ message: "success", semester });
};

export const updateSemester = async (req, res) => {
    const { id } = req.params;
    const semester = await SemesterModel.findByPk(id);
    if (!semester) {
        return res.status(404).json({ message: "Semester not found" });
    }
    await semester.update(req.body);
    return res.status(200).json({ message: "success", semester });
};

export const deleteSemester = async (req, res) => {
    const { id } = req.params;
    const semester = await SemesterModel.findByPk(id);
    if (!semester) {
        return res.status(404).json({ message: "Semester not found" });
    }
    await semester.destroy();
    return res.status(200).json({ message: "Semester deleted successfully" });
};