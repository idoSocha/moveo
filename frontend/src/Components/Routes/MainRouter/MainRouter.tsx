import { Route, Routes } from "react-router-dom";
import "./MainRouter.css";
import Lobby from "../../Pages/Lobby/Lobby";
import CodeBlock from "../../Pages/CodeBlock/CodeBlock";

function MainRouter(): JSX.Element {
  return (
    <div className="MainRouter">
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/codeblock/:id" element={<CodeBlock />} />
      </Routes>
    </div>
  );
}

export default MainRouter;
