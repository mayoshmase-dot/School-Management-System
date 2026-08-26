import managerRouter from './modules/manager/manager.router.js'

const initApp = (app, express) => {
    app.use(express.json())
app.use('/managers',managerRouter)
}

export default initApp