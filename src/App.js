import React, { useEffect } from "react";
import { Flex } from "./components/Grid";
import {Copyright} from "./components/Text";

import MyAccelerometer from "./MyAccelerometer";

const App = (props) => {

  return (
          <Flex style={{ alignItems: 'center', justifyContent: 'center' }} column>
            <MyAccelerometer />
            <MyAccelerometer />
            <MyAccelerometer />
            <MyAccelerometer />

            <Flex style={{ alignSelf: 'flex-end', margin: '10px' }}><Copyright>{`powered by {} Cloudflare Worker™`}</Copyright></Flex>
  
          </Flex>
  );
};

export default App;
