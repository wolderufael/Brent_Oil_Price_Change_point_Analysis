import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { useState } from "react";
import DashBoard from "./DashBoard";
import Home from "./Component/Home";
import PredictionPlot from "./Component/PredictionPlot";



const App = () => {
  // const val = useState(null);
  return (
    <BrowserRouter>
          <header>
            <nav>
              <NavLink to="/" activeclassname="active-link">
                <p className="page-title">Home</p>
              </NavLink>
              <NavLink to="/dashboard" activeclassname="active-link">
                <p className="page-title">Dash Board</p>
              </NavLink>
              <NavLink to="/prediction" activeclassname="active-link">
                <p className="page-title">Prediction</p>
              </NavLink>
            </nav>
          </header>

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/dashboard" element={<DashBoard />}></Route>
            <Route path="/prediction" element={<PredictionPlot />}></Route>
          </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

