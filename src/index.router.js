import managerRouter from './modules/manager/manager.router.js'
import cors from "cors";

const initApp = (app, express) => {
    app.use(express.json())
    app.use(cors());
app.use('/managers',managerRouter)
}

export default initApp