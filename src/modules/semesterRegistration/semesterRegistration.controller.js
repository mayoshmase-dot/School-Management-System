import StudentModel from "../../../DB/models/student.model.js";
import SemesterModel from "../../../DB/models/semester.model.js";
import "../../../DB/models/semesterRegistration.model.js";

export const registerForSemester = async (req, res) => {
    const { studentId, semesterId } = req.body;

    const student = await StudentModel.findByPk(studentId);
    const semester = await SemesterModel.findByPk(semesterId);

    if (!student || !semester) {
        return res.status(404).json({ message: "Student or Semester not found" });
    }

    await student.addSemester(semester);

    return res.status(200).json({ message: "Registered for semester successfully" });
};

export const getStudentSemesters = async (req, res) => {
    const { id } = req.params;

    const student = await StudentModel.findByPk(id, {
        include: [{ model: SemesterModel }]
    });

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({ message: "success", student });
};

export const unregisterFromSemester = async (req, res) => {
    const { studentId, semesterId } = req.body;

    const student = await StudentModel.findByPk(studentId);
    const semester = await SemesterModel.findByPk(semesterId);

    if (!student || !semester) {
        return res.status(404).json({ message: "Student or Semester not found" });
    }

    await student.removeSemester(semester);

    return res.status(200).json({ message: "Unregistered from semester successfully" });
};