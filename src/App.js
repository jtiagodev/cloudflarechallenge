import React from "react";
import { Flex } from "./components/Grid";
import MyAccelerometer from "./MyAccelerometer";

const App = (props) => {

  return (
          <Flex column>
            <MyAccelerometer />
          </Flex>
  );
};

export default App;
