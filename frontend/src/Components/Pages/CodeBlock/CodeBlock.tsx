import "./CodeBlock.css";
// import Highlight from "react-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { useEffect, useState } from "react";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

function CodeBlock(): JSX.Element {
  const [code, setCode] = useState("");
  // socket.on("get-code-block")
  useEffect(() => {
    hljs.highlightAll();
  });

  return (
    <div className="CodeBlock">
      <h1 id="code-block-title"></h1>
      <pre>
        <code id="code-block-code" className="language-javascript"></code>
      </pre>
    </div>
  );
}

export default CodeBlock;
