// require("dotenv").config({path:"./env"}) //Old method common js

import dotenv from "dotenv"
import mongoose from "mongoose"
import connectDB from "./db/database.js"
import { app } from "./app.js"
import PORT from "./constants.js"

dotenv.config({
    path:"./env"
})

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`App is listening on port: http://localhost:${PORT} `);
        

    })

})
.catch(()=>{
    console.log("Monogodb Connnection Failed ...!!");
})






































// const express = require('express') // Common js
// // import express from 'express' //Module js so we can need to add type in package.json

// // Json formatter to handle json data to handle large APIs
// // require('dotenv').config()
// var cors = require('cors')
// // import cors from "express"
// const app = express()

// // const port=process.env.PORT
// const port=3000
// app.use(cors())

// app.get("/",(req,res)=>{
//     res.send("Ehtsham Khaliq")
// })

// app.get("/student",(req,res)=>{
//     res.send("National Textile University")
// })

// app.listen(port,()=>{
//     console.log(`App is Listening on port ${port}`);
    
// })



// /*
// we need to add proxy http://localhost:3000 in react to connect backend and frontend
// */