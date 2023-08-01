import { useEffect, useState } from "react";
import "./Lobby.css";

function Lobby(): JSX.Element {
  const [codes, setcodes] = useState("");

  useEffect(() => {
    axios.get;
  });
  return (
    <div className="Lobby">
      <h1>Choose code block</h1>
      <div id="code-block-list"></div>
    </div>
  );
}

export default Lobby;
