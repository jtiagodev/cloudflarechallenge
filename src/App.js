import React, { useState } from "react";
import MyAccelerator from "./Accel";
import "./App.css";
import COVID from "./COVID";
import logo from "./logo.svg";

const App = (props) => {
  const [navigate, setNavigate] = useState("SENSORS");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => setNavigate("COVID")}>COVID</button>
        <button onClick={() => setNavigate("SENSORS")}>SENSORS</button>
        {navigate === "COVID" && <COVID />}
        {navigate === "SENSORS" && <MyAccelerator />}
      </header>
    </div>
  );
};

export default App;
