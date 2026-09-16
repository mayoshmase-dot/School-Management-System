import StudentModel from "../../DB/models/student.model.js";
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/catchError.js";
import jwt from "jsonwebtoken";

export const auth = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
        throw new AppError("No token provided", 401);
    }
    const decoded = jwt.verify(token, process.env.LOGIN_SIGNAL);

    const student = await StudentModel.findByPk(decoded.id);
    if (!student) {
        throw new AppError("Student not found", 404);
    }

    req.student = student;
    next();
});