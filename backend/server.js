const app = require('./app')
const dotenv = require('dotenv')
const connectDB = require('./config/database')

//call for process.env
dotenv.config({path:'backend/config/config.env'})

connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`SERVER IS WORKING ON http://localhost:${process.env.PORT}`)
})