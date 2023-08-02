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
  const [counter, setCounter] = useState(0);
  const [mentor, setMentor] = useState(false);
  const params = useParams();
  const id = params.id;
  let count = 0;

  const sendCode = (e: string) => {
    socket.emit("get-code-block", e);
  };

  const isMentor = () => {
    socket.emit("get-counter");
    socket.on("receive-counter", (counter: number, socketNum: string) => {
      setCounter(counter);
      count = counter;
      if (count === 1) {
        const mentorId = socketNum;
        if (socketNum === mentorId) {
          setMentor(true);
        }
      }
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/codes/list/${id}`)
      .then((response) => {
        setCode(response.data[0].code);
      });
    isMentor();
    socket.on("receive-code-block", (newCode) => {
      setCode(newCode);
    });
  }, [socket]);

  return (
    <div className="CodeBlock">
      <h1 id="code-block-title"></h1>
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
