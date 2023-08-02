//imports
import cors from "cors";
import express from "express";
import router from "./Routes/Routes";
import config from "./Utils/config";
import logic from "./Logic/Logic";
import http from "http";
import { Server } from "socket.io";

//create server
const app = express();

// setting up the server and the cors
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

//handle cors
app.use(cors());

// //parse the body as json , for easy work
// app.use(bodyParser.json());

//how to use the routes
app.use("/api/v1/codes", router);

//create our table if it does not exist
logic.createCodesTable();

// number of users - the first one to enter is the mentor, the rest are students
let counter = 0;

function increment_counter() {
  counter += 1;
}

function decrement_counter() {
  counter -= 1;
}

//handling both getter and setter of info from the server to the client using socket.io
io.on("connection", (socket) => {
  increment_counter();
  socket.on("get-counter", () => {
    io.emit("receive-counter", counter, socket.id);
  });
  socket.on("get-code-block", (code) => {
    socket.broadcast.emit("receive-code-block", code);
  });

  socket.on("disconnect", () => {
    decrement_counter();
    io.emit("receive-counter", counter);
    if (counter == 0) {
      // Go to DB and update code text
      // updateCode();
      // console.log(myCodeBlock);
    }
  });
});

// app.get("/", (req, res) => {
//   let newText = "New text";
//   myCodeBlock.code = newText;
//   res.send(newText);
// });

//start the server
server.listen(config.WebPort, () => {
  console.log(`listening on http://${config.mySQLhost}:${config.WebPort}`);
});
