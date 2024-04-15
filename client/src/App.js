import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login, Home, Public } from "./Pages/public";
import path from "./Ultils/path";

function App() {
  return (
    <div className="min-h-screen  font-main">
      <Routes>
        <Route path={path.Public} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
