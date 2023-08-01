import MainRouter from "../../Routes/MainRouter/MainRouter";
import "./MainLayout.css";

function MainLayout(): JSX.Element {
  return (
    <div className="MainLayout">
      <main>
        <MainRouter />
      </main>
    </div>
  );
}

export default MainLayout;
