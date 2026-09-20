import StudentModel from "../../DB/models/student.model.js";
import ManagerModel from "../../DB/models/manager.model.js";
import TeacherModel from "../../DB/models/teacher.model.js";
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/catchError.js";
import jwt from "jsonwebtoken";

export const auth = (...accessRoles) => {
    return asyncHandler(async (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) throw new AppError("No token provided", 401);

        const decoded = jwt.verify(token, process.env.LOGIN_SIGNAL);
        const role = decoded.role || "student";

        let user;
        if (role === "manager") {
            user = await ManagerModel.findByPk(decoded.id);
        } else if (role === "teacher") {
            user = await TeacherModel.findByPk(decoded.id);
        } else {
            user = await StudentModel.findByPk(decoded.id);
        }

        if (!user) throw new AppError("User not found", 404);

        if (accessRoles.length > 0 && !accessRoles.includes(role)) {
            throw new AppError("You are not authorized to perform this action", 403);
        }

        req.user = user;
        req.role = role;
        next();
    });
};