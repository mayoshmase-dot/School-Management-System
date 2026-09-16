import StudentModel from "../../../DB/models/student.model.js";
import SemesterModel from "../../../DB/models/semester.model.js";
import "../../../DB/models/semesterRegistration.model.js";
import { asyncHandler } from "../../utils/catchError.js";
import { AppError } from "../../utils/appError.js";

export const registerForSemester = asyncHandler(async (req, res) => {
    const studentId = req.student.id;
    const { semesterId } = req.body;

    const semester = await SemesterModel.findByPk(semesterId);
    if (!semester) throw new AppError("Semester not found", 404);

    await req.student.addSemester(semester);
    return res.status(200).json({ message: "Registered for semester successfully" });
});

export const getStudentSemesters = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const student = await StudentModel.findByPk(id, { include: [{ model: SemesterModel }] });
    if (!student) throw new AppError("Student not found", 404);

    return res.status(200).json({ message: "success", student });
});

export const unregisterFromSemester = asyncHandler(async (req, res) => {
    const studentId = req.student.id;
    const { semesterId } = req.body;

    const semester = await SemesterModel.findByPk(semesterId);
    if (!semester) throw new AppError("Semester not found", 404);

    await req.student.removeSemester(semester);
    return res.status(200).json({ message: "Unregistered from semester successfully" });
});