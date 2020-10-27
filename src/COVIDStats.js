import React, { useEffect, useState } from "react";
import axios from "axios";
import { Flex } from "./components/Grid";

const COVIDStats = (prop) => {
  const [data, setData] = useState({ cases: 0 });
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    axios
      .get("https://corona.lmao.ninja/v2/all?yesterday=true")
      .then((result) => {
        console.log(result);
        setData(result.data);
      })
      .catch((err) => console.warr(err));
    setLoad(false);
  }, []);

  if (load) {
    return <span>Loading..</span>;
  }

  return (
    <Flex column>
      <span>Total COVID-19 cases worldwide:</span>
      <span>{data.cases}</span>
      <span>Source: NovelCOVID API</span>
    </Flex>
  );
};

export default COVIDStats;
