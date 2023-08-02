import axios from "axios";
import "./CodeBlock.css";
// import Highlight from "react-highlight";

import { useEffect, useState } from "react";
import * as io from "socket.io-client";
import { useParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";

const socket = io.connect("http://localhost:4000");

function CodeBlock(): JSX.Element {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [counter, setCounter] = useState(0);
  const [mentor, setMentor] = useState(false);
  const params = useParams();
  const id = params.id;
  let count = 0;

  // reaching the server on any change on the editor
  const sendCode = (e: string) => {
    socket.emit("get-code-block", e);
  };

  // a function that calls the server using the socket, fetching the counter and the socket id
  // sets the the first user to read the code to be the mentor otherwise it is a student
  const isMentor = () => {
    socket.emit("get-counter");
    socket.on("receive-counter", (counter: number, socketNum: string) => {
      //   setCounter(counter);
      count = counter;
      if (count === 1) {
        const mentorId = socketNum;
        if (socketNum === mentorId) {
          setMentor(true);
        }
      }
    });
  };
  // fetching the data from the db and activiting the isMentor function
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/codes/list/${id}`)
      .then((response) => {
        setCode(response.data[0].code);
        setTitle(response.data[0].title);
      });
    isMentor();
    socket.on("receive-code-block", (newCode) => {
      setCode(newCode);
    });
  }, [socket]);

  return (
    <div className="CodeBlock">
      <h2>{title}</h2>
      <CodeMirror
        readOnly={mentor}
        value={code}
        theme={"dark"}
        onChange={(e) => sendCode(e)}
      />
    </div>
  );
}

export default CodeBlock;
