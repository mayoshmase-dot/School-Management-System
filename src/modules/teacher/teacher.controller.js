import TeacherModel from "../../../DB/models/teacher.model.js";
import { asyncHandler } from "../../utils/catchError.js";
import { AppError } from "../../utils/appError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
    console.log("bcrypt is:", typeof bcrypt);   
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));
    const teacher = await TeacherModel.create({ firstName, lastName, email, password: hashPassword });
    return res.status(201).json({ message: "success", teacher });
});
export const loginTeacher = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const teacher = await TeacherModel.findOne({ where: { email } });
    if (!teacher) {
        throw new AppError("Invalid data", 400);
    }
    const match = await bcrypt.compare(password, teacher.password);
    if (!match) {
        throw new AppError("Invalid data", 400);
    }

    const token = jwt.sign({ id: teacher.id , role: "teacher" }, process.env.LOGIN_SIGNAL);
    return res.status(200).json({ message: "success", token });
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