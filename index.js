import "dotenv/config";  
import express from 'express'
import initApp from './src/index.router.js'
import { globalErrorHandler } from "./src/utils/globalErrorHandler.js";
const app = express()
initApp(app,express)
const PORT = process.env.PORT || 3000
app.use(globalErrorHandler);
app.listen(PORT,()=>{
    console.log(`part is running .... ${PORT}`)
})