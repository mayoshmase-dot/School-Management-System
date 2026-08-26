import express from 'express'
import initApp from './src/index.router'
const app = express()
initApp(app,express)


app.listen(3000,()=>{
    console.log("part is running .... 3000")
})