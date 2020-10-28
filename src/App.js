import React from "react";
import { Flex } from "./components/Grid";
import COVIDStats from "./COVIDStats";
import Footer from "./Footer";
import MyAbsoluteOrientationSensor from "./MyAbsoluteOrientationSensor";
import MyAccelerometer from "./MyAccelerometer";
import MyAmbientLightSensor from "./MyAmbientLightSensor";
import MyGyroscope from "./MyGyroscope";
import Status from "./Status";


const App = (props) => {

  return (
          <Flex style={{ alignItems: 'center', justifyContent: 'center' }} column>
            <COVIDStats />
            <Status />
            <MyAbsoluteOrientationSensor />
            <MyAccelerometer />
            <MyAmbientLightSensor />
            <MyGyroscope />
            <Footer />
          </Flex>
  );
};

export default App;
