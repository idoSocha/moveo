import axios from "axios";
import "./CodeBlock.css";
// import Highlight from "react-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { useEffect, useState } from "react";
import * as io from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io.connect("http://localhost:4000");

function CodeBlock(): JSX.Element {
  const [code, setCode] = useState("");
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/codes/list/${id}`)
      .then((response) => {
        setCode(response.data[0].code);
        // (response.data[0].c);
        //   socket.on("get-code-block", (data) => {
        //     console.log(data);
        //   });
      });
    hljs.highlightAll();
  });

  return (
    <div className="CodeBlock">
      <h1 id="code-block-title"></h1>
      <pre>
        <code id="code-block-code" className="language-javascript">
          {code}
        </code>
      </pre>
    </div>
  );
}

export default CodeBlock;
