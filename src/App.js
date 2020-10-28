import React, { useState } from "react";
import { Flex } from "./components/Grid";
import COVIDStats from "./COVIDStats";
import Footer from "./Footer";
import MyAbsoluteOrientationSensor from "./MyAbsoluteOrientationSensor";
import MyAccelerometer from "./MyAccelerometer";
import MyAmbientLightSensor from "./MyAmbientLightSensor";
import MyGyroscope from "./MyGyroscope";
import Status from "./Status";


const App = (props) => {
  // pos0: good, pos1: bad, pos2: unknown
  const [statusData, setStatusData] = useState([0,0,4]);

  return (
          <Flex style={{ alignItems: 'center', justifyContent: 'center' }} column>
            <COVIDStats />
            <Status statusData={statusData} />
            <MyAbsoluteOrientationSensor setStatusData={setStatusData} />
            <MyAccelerometer setStatusData={setStatusData} />
            <MyAmbientLightSensor setStatusData={setStatusData} />
            <MyGyroscope setStatusData={setStatusData} />
            <Footer />
          </Flex>
  );
};

export default App;
