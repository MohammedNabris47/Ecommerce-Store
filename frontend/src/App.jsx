import "./App.css";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";

function App() {
  return (
    <>
      <ToastContainer theme="dark" style={{ fontSize: "12px" }} />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
}

export default App;
