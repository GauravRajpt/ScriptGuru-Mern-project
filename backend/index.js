import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import connecctDB from "./config/db.js";
import cors from 'cors';
import morgan from "morgan";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();
connecctDB();
const app = express();


app.use(express.json());
app.use(morgan('dev'))
app.use(cors());


// routes
app.use('/', noteRoutes);

// PORT
const PORT = process.env.PORT || 8080;

// run
app.listen(PORT,()=>{
    console.log('server is running on prot '.bgCyan.white+PORT)
})