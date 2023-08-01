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
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/codes/list/${id}`)
      .then((response) => {
        setCode(response.data[0].code);
      });

    // hljs.highlightAll();
  }, []);
  const socket = io.connect("http://localhost:4000");

  const newCode = (event: SyntheticEvent) => {
    const newVal = event.target as HTMLInputElement;
    return newVal.value;
  };

  socket.on("connect", () => {
    socket.emit("get-code-block", newCode(code));
    socket.on("receive-code-block", (code: string) => {
      setCode(code);
    });
  });
  return (
    <div className="CodeBlock">
      <h1 id="code-block-title"></h1>
      {/* <pre>
        <code id="code-block-code" className="language-javascript">
          {code}
        </code>
      </pre> */}
      <CodeMirror value={code} theme={"dark"} onChange={newCode} />
    </div>
  );
}

export default CodeBlock;
