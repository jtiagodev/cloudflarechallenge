
import React, { useEffect, useState } from "react";
import axios from 'axios';

const COVIDTest = (prop) => {
  const [data, setData] = useState({ cases: 0 });
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    axios.get('https://corona.lmao.ninja/v2/all?yesterday=true')
    .then(result => {
      console.log(result);
      setData(result.data);
    })
    .catch(err => console.warr(err))
    setLoad(false);

  }, []);

  if (load) {
    return <span>Loading..</span>
  }
  
  return <span>{`total cases: ${data.cases}`}</span>
};

export default COVIDTest;