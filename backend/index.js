import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import connecctDB from "./config/db.js";
import cors from 'cors';
import morgan from "morgan";
import http from 'node:http';
import noteRoutes from "./routes/noteRoutes.js";
import { Server } from "socket.io";


dotenv.config();
connecctDB();
const app = express();
const server =  http.createServer(app)
const io = new Server(server,{cors:{
    origin:'*',
    methods:['GET','POST']
}});
app.use(express.json());
app.use(morgan('dev'))
app.use(cors());


// routes
app.use('/', noteRoutes);
app.set('io',io);
io.on('connection',(socket)=>{
console.log('a user connected' ,socket.id)
socket.on("updateNotes",(msg)=>{
    console.log('updateNotes trigger')
    socket.broadcast.emit("updateNotes",msg);
  })
socket.on("disconnect",()=>{
console.log(socket.id,' is disconnected')
})
})

// PORT
const PORT = process.env.PORT || 8080;

// run
server.listen(PORT,()=>{
    console.log('server is running on port '.bgCyan.white+PORT);
})