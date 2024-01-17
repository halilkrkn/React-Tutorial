import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Users from "./pages/Users";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
