import express from 'express'
import initApp from './src/index.router.js'
const app = express()
initApp(app,express)
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`part is running .... ${PORT}`)
})