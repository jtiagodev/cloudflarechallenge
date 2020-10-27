import React, { useState, useEffect } from "react";
import { Flex } from "./components/Grid";
import produce from "immer";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import moment from "moment";

const Accel = (props) => {
  const [sensor, setSensor] = useState("Starting");
  const [accelerometer, setAccelerometer] = useState({ x: 0, y: 0, z: 0 });
  const [accelData, setAccelData] = useState([]);

  useEffect(() => {
    let accel = null;

    const accelErrorHandler = (event) => {
      // Handle runtime errors.
      if (event.error.name === "NotAllowedError") {
        // Branch to code for requesting permission.
        setSensor("NotAllowedError");
      } else if (event.error.name === "NotReadableError") {
        console.log("Cannot connect to the sensor.");
        setSensor("Cannot connect to the sensor.");
      } else {
        setSensor("Sensor Generic Error");
      }
    };
  
    const accelReadingHandler = (evt) => {
      const newData = [...accelData, {
        time: new Date().getTime(),
        x: accel.x,
        y: accel.y,
        z: accel.z,
      }];
      setAccelData(newData);
      setAccelerometer({ x: accel.x, y: accel.y, z: accel.z });
    };

    try {
      accel = new window.Accelerometer({
        referenceFrame: "device",
        frequency: 1,
      });
      accel.addEventListener("error", accelErrorHandler);
      accel.addEventListener("reading", accelReadingHandler);
      setSensor("Reading");
      accel.start();
    } catch (error) {
      // Handle construction errors.
      if (error.name === "SecurityError") {
        // See the note above about feature policy.
        console.log("Sensor construction was blocked by a feature policy.");
        setSensor("Sensor construction was blocked by a feature policy.");
      } else if (error.name === "ReferenceError") {
        console.log("Sensor is not supported by the User Agent.");
        setSensor("Sensor is not supported by the User Agent.");
      } else {
        setSensor("Sensor Catch Error");
      }
      // throw error;
    }

    return function cleanup() {
      accel.removeEventListener("error", accelErrorHandler);
      accel.removeEventListener("reading", accelReadingHandler);
    };
  }, []);

  return (
    <Flex column>
      <span>Accelerometer</span>
      <span>
        {`Readings (total: ${accelData.length}): ${accelerometer.x.toFixed(
          1
        )} ${accelerometer.y.toFixed(1)} ${accelerometer.z.toFixed(1)}`}
      </span>
      {sensor === "Reading" ? (
        <LineChart
          width={730}
          height={250}
          data={accelData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            domain={["auto", "auto"]}
            name="Time"
            tickFormatter={(unixTime) => moment(unixTime).format("HH:mm:ss")}
            type="number"
          />
          <YAxis />
          {/* <Tooltip /> */}
          <Legend />
          <Line type="monotone" dataKey="x" stroke="red" />
          <Line type="monotone" dataKey="y" stroke="green" />
          <Line type="monotone" dataKey="z" stroke="blue" />
        </LineChart>
      ) : (
        <span>{`Status: ${sensor}`}</span>
      )}
    </Flex>
  );
};

export default Accel;
