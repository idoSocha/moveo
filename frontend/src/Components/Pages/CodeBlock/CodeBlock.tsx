import axios from "axios";
import "./CodeBlock.css";
// import Highlight from "react-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { SyntheticEvent, useEffect, useState } from "react";
import * as io from "socket.io-client";
import { useParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";

function CodeBlock(): JSX.Element {
  const [code, setCode] = useState("");
  const [newCode, setNewCode] = useState("");
  const [counter, setCounter] = useState(0);
  const params = useParams();
  const socket = io.connect("http://localhost:4000");
  const id = params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/codes/list/${id}`)
      .then((response) => {
        setCode(response.data[0].code);
      });
  }, [socket]);

  socket.on("connect", () => {
    socket.emit("get-code-block", newCode);
  });

  socket.on("receive-code-block", (code: string, counter: number) => {
    console.log(code);
    console.log(counter);
  });

  return (
    <div className="CodeBlock">
      <h1 id="code-block-title"></h1>
      <CodeMirror value={code} theme={"dark"} onChange={(e) => setNewCode(e)} />
      <div>{counter}</div>
    </div>
  );
}

export default CodeBlock;
