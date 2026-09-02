import managerRouter from './modules/manager/manager.router.js'
import teacherRouter from './modules/teacher/teacher.router.js'
import studentRouter from './modules/student/student.router.js'
import courseRouter from './modules/course/course.router.js'
import semesterRouter from './modules/semester/semester.router.js';
import courseOfferingRouter from './modules/courseOffering/courseOffering.router.js';

import cors from "cors";

const initApp = (app, express) => {
    app.use(express.json())
    app.use(cors());
    app.use('/managers', managerRouter)
    app.use('/teachers', teacherRouter)
    app.use('/students', studentRouter)
    app.use('/courses', courseRouter)
    app.use('/semesters', semesterRouter)

    app.use('/course-offerings', courseOfferingRouter);
}

export default initApp