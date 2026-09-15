import EnrolmentModel from "../../../DB/models/enrolment.model.js";
import StudentModel from "../../../DB/models/student.model.js";
import CourseOfferingModel from "../../../DB/models/courseOffering.model.js";
import CourseModel from "../../../DB/models/course.model.js";

export const enrollStudent = async (req, res) => {
        const { studentId, offeringId } = req.body;

        const student = await StudentModel.findByPk(studentId);
        const offering = await CourseOfferingModel.findByPk(offeringId, {
            include: [{ model: CourseModel }]
        });

        if (!student || !offering) {
            return res.status(404).json({ message: "Student or CourseOffering not found" });
        }


        // 2. تحقق إنه ما سجل نفس الـ Offering قبل
        const existingEnrolment = await EnrolmentModel.findOne({
            where: { studentId, offeringId }
        });
        if (existingEnrolment) {
            return res.status(400).json({ message: "Student already enrolled in this offering" });
        }
        const course = offering.Course;
        const coursePrerequisites = await CourseModel.findByPk(course.id, {
            include: [{ model: CourseModel, as: "prerequisites" }]
        });

        if (coursePrerequisites.prerequisites.length > 0) {
            // جيب كل الـ Enrolments الناجحة (بعلامة) للطالب
            const studentEnrolments = await EnrolmentModel.findAll({
                where: { studentId },
                include: [{ model: CourseOfferingModel, include: [{ model: CourseModel }] }]
            });

            // استخرج أرقام المواد يلي الطالب خلصها بنجاح (علامة موجودة و >= 50 مثلاً)
            const passedCourseIds = studentEnrolments
                .filter(e => e.gradeValue !== null && e.gradeValue >= 50)
                .map(e => e.CourseOffering.Course.id);

            const missingPrerequisites = coursePrerequisites.prerequisites.filter(
                prereq => !passedCourseIds.includes(prereq.id)
            );

            if (missingPrerequisites.length > 0) {
                return res.status(400).json({
                    message: "Cannot enroll — missing prerequisites",
                    missingPrerequisites: missingPrerequisites.map(p => ({ id: p.id, name: p.name }))
                });
            }
        }

        // 4. لو كل شي تمام، سجل الطالب
        const enrolment = await EnrolmentModel.create({ studentId, offeringId });

        return res.status(201).json({ message: "Enrolled successfully", enrolment });
};

export const giveGrade = async (req, res) => {
        const { id } = req.params;
        const enrolment = await EnrolmentModel.findByPk(id);
        if (!enrolment) {
            return res.status(404).json({ message: "Enrolment not found" });
        }

        await enrolment.update({
            gradeValue: req.body.gradeValue,
            dateGiven: new Date()
        });

        return res.status(200).json({ message: "Grade given successfully", enrolment });
};

// ============ عرض تسجيلات طالب ============
export const getStudentEnrolments = async (req, res) => {
        const { id } = req.params;

        const enrolments = await EnrolmentModel.findAll({
            where: { studentId: id },
            include: [{ model: CourseOfferingModel, include: [{ model: CourseModel }] }]
        });

        return res.status(200).json({ message: "success", enrolments });
};