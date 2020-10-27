import React, { useState } from "react";
import MyAccelerometer from "./MyAccelerometer";
import "./App.css";
import COVIDStats from "./COVIDStats";
import MyAbsoluteOrientationSensor from "./MyAbsoluteOrientationSensor";
import { Flex } from "./components/Grid";

const App = (props) => {
  const [navigate, setNavigate] = useState("SENSORS");

  return (
    <div style={{ width: '80%' }} className="App">
      <header className="App-header">
        <button onClick={() => setNavigate("COVID")}>COVID Stats</button>
        <button onClick={() => setNavigate("SENSORS")}>SENSORS Check</button>
        {navigate === "COVID" && <COVIDStats />}
        {navigate === "SENSORS" && (
          <Flex column>
            <MyAccelerometer />
            <MyAbsoluteOrientationSensor />
          </Flex>
        )}
      </header>
    </div>
  );
};

export default App;
