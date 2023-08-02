import { useEffect, useState } from "react";
import "./Lobby.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Code from "../../Model/Code";

function Lobby(): JSX.Element {
  const [codes, setcodes] = useState<Code[]>([]);
  const navigate = useNavigate();

  //fetching the info from the DB and rendering the data to the UI
  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/codes/list").then((res) => {
      setcodes(res.data);
    });
  });
  return (
    <div className="Lobby">
      <h1>Choose code block</h1>
      <div id="code-block-list">
        {codes.map((code) => (
          <div
            key={code.id}
            className="Box"
            onClick={() => navigate(`/codeBlock/${code.id}`)}
          >
            {code.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lobby;
