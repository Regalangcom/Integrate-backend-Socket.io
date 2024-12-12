import express from "express"
// import cors from "cors"
import bodyParser from "body-parser"
import path from "path"
import dotenv from "dotenv"
dotenv.config()

import "./database/db"
import { SocketServer } from "./socket/serve.soket"
import RouterApp from "./routes/routes"

import "reflect-metadata"

const app = express()

const a = process.env.JWT_TOKEN
console.log(a);


app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cors({origin : "*",}))
app.use(RouterApp)
 

app.get("/", function (req, res) {

    //route for localhost:3000/
    const indexPath = path.join(__dirname, "../public", "index.html");
    res.sendFile(indexPath);
  
  })

const server = app.listen(3000 , () => {
    console.log(`listening on 3000`);
})

export const io = require("socket.io")(server , {
    // transports: ['polling'] ,
    cors : {
        origin : "*",
        methods : ["GET", "POST"]
    }
})




SocketServer();