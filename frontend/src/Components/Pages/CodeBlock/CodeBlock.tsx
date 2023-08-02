import axios from "axios";
import "./CodeBlock.css";
// import Highlight from "react-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { useEffect, useState } from "react";
import * as io from "socket.io-client";
import { useParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
const socket = io.connect("http://localhost:4000");

function CodeBlock(): JSX.Element {
  const [code, setCode] = useState("");
  const [counter, setCounter] = useState(0);
  const params = useParams();
  const id = params.id;
  let mentor = false;

  const sendCode = (e: string) => {
    socket.emit("get-code-block", e);
  };

  const getCounter = () => {
    socket.emit("get-counter");
    socket.on("receive-counter", (counter: number) => {
      setCounter(counter);
    });
  };

  useEffect(() => {
    getCounter();
    counter === 1 ? (mentor = true) : (mentor = false);
    axios
      .get(`http://localhost:4000/api/v1/codes/list/${id}`)
      .then((response) => {
        setCode(response.data[0].code);
      });
    getCounter();
    socket.on("receive-code-block", (newCode) => {
      setCode(newCode);
    });
  }, [socket]);

  return (
    <div className="CodeBlock">
      <h1 id="code-block-title"></h1>
      <CodeMirror
       { ...counter === 1 && (editable={false})}
        value={code}
        theme={"dark"}
        onChange={(e) => sendCode(e)}
      />
      <div>{counter}</div>
    </div>
  );
}

export default CodeBlock;

// import axios from "axios";
// import "./CodeBlock.css";
// // import Highlight from "react-highlight";
// import hljs from "highlight.js";
// import "highlight.js/styles/github.css";
// import { SyntheticEvent, useEffect, useState } from "react";
// import * as io from "socket.io-client";
// import { useParams } from "react-router-dom";
// import CodeMirror from "@uiw/react-codemirror";

// const socket = io.connect("http://localhost:4000");

// function CodeBlock(): JSX.Element {
//   const [code, setCode] = useState("");
//   const [counter, setcounter] = useState(0);

//   const params = useParams();
//   const id = params.id;

//   const sendCode = (e: string) => {
//     socket.emit("get-code-block", e);
//   };

//   useEffect(() => {
//     axios
//       .get(`http://localhost:4000/api/v1/codes/list/${id}`)
//       .then((response) => {
//         setCode(response.data[0].code);
//       });
//     socket.on("receive-block-code", (newCode, newCounter) => {
//       setCode(newCode);
//       setcounter(newCounter);
//     });
//   }, [socket]);

//   // const newCode = (event: SyntheticEvent) => {
//   //   const newVal = event.target as HTMLInputElement;
//   //   return newVal.value;
//   // };

//   // socket.on("connect", () => {
//   //   socket.emit("get-code-block", code);
//   //   socket.on("receive-code-block", (code: string) => {
//   //     setCode(code);
//   //   });
//   // });
//   return (
//     <div className="CodeBlock">
//       <h1 id="code-block-title"></h1>
//       <h4>{counter}</h4>
//       <CodeMirror value={code} theme={"dark"} onChange={(e) => sendCode(e)} />
//     </div>
//   );
// }

// export default CodeBlock;
