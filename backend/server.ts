//imports
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import router from "./Routes/Routes";
import config from "./Utils/config";
import logic from "./Logic/Logic";
import http from "http";
import { Server } from "socket.io";

//create server
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// //handle cors
// app.use(cors());

//how we send the data back (JSON,XML,RAW,String)
app.use(express.json());

// //where i will save the vacations
// server.use(express.static("public"));

//parse the body as json , for easy work
app.use(bodyParser.json());

//how to use the routes
app.use("/api/v1/codes", router);

//create our tables if they not exists
console.log("check if table exists...");
logic.createCodesTable();

//start the server
server.listen(config.WebPort, () => {
  console.log(`listening on http://${config.mySQLhost}:${config.WebPort}`);
});
