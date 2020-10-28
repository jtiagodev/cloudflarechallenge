import React, { useEffect, useState } from "react";
import axios from "axios";
import { Flex } from "./components/Grid";
import { SmallText } from "./components/Text";

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
      .catch((err) => console.warn(err));
    setLoad(false);
  }, []);

  if (load) {
    return <SmallText>Loading statistics..</SmallText>;
  }

  return (
    <>
    {data.cases !== 0 && (
    <Flex column style={{ padding: "10px", width: '90vw' }}>
      <SmallText>{`[COVID-19 STATS] Total Infected: ${data.cases}`}</SmallText>
      <SmallText>source: NovelCOVID API</SmallText>
    </Flex>
    )}
    </>
  );
};

export default COVIDStats;
