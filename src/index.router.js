import managerRouter from './modules/manager/manager.router.js'
import teacherRouter from './modules/teacher/teacher.router.js'
import studentRouter from './modules/student/student.router.js'
import cors from "cors";

const initApp = (app, express) => {
    app.use(express.json())
    app.use(cors());
app.use('/managers',managerRouter)
app.use('/teachers',teacherRouter)
app.use('/students',studentRouter)

}

export default initApp