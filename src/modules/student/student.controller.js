import StudentModel from "../../../DB/models/student.model.js";
import { studentSchema } from "./student.validation.js";

export const getAll = async (req, res) => {
    const students = await StudentModel.findAll();
    return res.status(200).json({ message: "success", students });
};

export const getById = async (req, res) => {
    const { id } = req.params;

    const student = await StudentModel.findByPk(id);
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({ message: "success", student });
};

export const createStudent = async (req, res) => {
    const { error } = studentSchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    }

    const student = await StudentModel.create(req.body);
    return res.status(201).json({ message: "success", student });
};

export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const student = await StudentModel.findByPk(id);
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    await student.update(req.body);
    return res.status(200).json({ message: "success", student });
};

export const deleteStudent = async (req, res) => {
    const { id } = req.params;

    const student = await StudentModel.findByPk(id);
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    await student.destroy();
    return res.status(200).json({ message: "Student deleted successfully" });
};