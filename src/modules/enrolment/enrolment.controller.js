import EnrolmentModel from "../../../DB/models/enrolment.model.js";
import StudentModel from "../../../DB/models/student.model.js";
import CourseOfferingModel from "../../../DB/models/courseOffering.model.js";
import CourseModel from "../../../DB/models/course.model.js";
import { asyncHandler } from "../../utils/catchError.js";
import { AppError } from "../../utils/appError.js";

export const enrollStudent = asyncHandler(async (req, res) => {
    const studentId = req.student.id;   
    const { offeringId } = req.body;

    const offering = await CourseOfferingModel.findByPk(offeringId, {
        include: [{ model: CourseModel }]
    });
    if (!offering) throw new AppError("CourseOffering not found", 404);

    const existingEnrolment = await EnrolmentModel.findOne({ where: { studentId, offeringId } });
    if (existingEnrolment) throw new AppError("Student already enrolled in this offering", 400);

    const course = offering.Course;
    const coursePrerequisites = await CourseModel.findByPk(course.id, {
        include: [{ model: CourseModel, as: "prerequisites" }]
    });

    if (coursePrerequisites.prerequisites.length > 0) {
        const studentEnrolments = await EnrolmentModel.findAll({
            where: { studentId },
            include: [{ model: CourseOfferingModel, include: [{ model: CourseModel }] }]
        });

        const passedCourseIds = studentEnrolments
            .filter(e => e.gradeValue !== null && e.gradeValue >= 50)
            .map(e => e.CourseOffering.Course.id);

        const missingPrerequisites = coursePrerequisites.prerequisites.filter(
            prereq => !passedCourseIds.includes(prereq.id)
        );

        if (missingPrerequisites.length > 0) {
            throw new AppError(
                `Missing prerequisites: ${missingPrerequisites.map(p => p.name).join(", ")}`,
                400
            );
        }
    }

    const enrolment = await EnrolmentModel.create({ studentId, offeringId });
    return res.status(201).json({ message: "Enrolled successfully", enrolment });
});

export const giveGrade = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const enrolment = await EnrolmentModel.findByPk(id);
    if (!enrolment) throw new AppError("Enrolment not found", 404);

    await enrolment.update({ gradeValue: req.body.gradeValue, dateGiven: new Date() });
    return res.status(200).json({ message: "Grade given successfully", enrolment });
});

export const getStudentEnrolments = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const enrolments = await EnrolmentModel.findAll({
        where: { studentId: id },
        include: [{ model: CourseOfferingModel, include: [{ model: CourseModel }] }]
    });

    return res.status(200).json({ message: "success", enrolments });
});