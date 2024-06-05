import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import Dbconnection from "./Config/Db.js";
import authRoutes from "./routes/authRoutes.js"
import cors from 'cors';
import categoryRoute from "./routes/categoryRoute.js"
import productRoute from "./routes/productsRoutes.js"

//rest Object
const app=express();

//config env
dotenv.config();

//database connection
Dbconnection();

//Port
const port=process.env.PORT;

//Middleware
app.use(cors());
app.use(express.json())
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoute)
app.use("/api/v1/product",productRoute)

//rest api
app.get("/",(req,res)=>{
    res.send("hello");
})

app.listen(port,()=>{
    console.log(`server is running on ${process.env.Mode} in port: ${port}`);
})
