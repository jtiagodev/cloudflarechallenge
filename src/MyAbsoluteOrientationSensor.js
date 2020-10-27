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

const MyAbsoluteOrientationSensor = (props) => {
  const [status, setStatus] = useState("Starting");
  const [sensor, setSensor] = useState(new window.AbsoluteOrientationSensor({
    referenceFrame: "device",
    frequency: 1,
  }));
  const [currentMeasure, setCurrentMeasure] = useState({ x: 0, y: 0, z: 0, w: 0 });
  const [data, setData] = useState([]);

  
  useEffect(() => {
    

    const sensorErrorHandler = (event) => {
      // Handle runtime errors.
      if (event.error.name === "NotAllowedError") {
        // Branch to code for requesting permission.
        setStatus("NotAllowedError");
      } else if (event.error.name === "NotReadableError") {
        setStatus("Cannot connect to the sensor.");
      } else {
        setStatus("Sensor Generic Error");
      }
    };
  
    const sensorReadingHandler = () => {
      setData(prevData => {
        // Caps data at 20 entries
        const newData = prevData.slice(0, 19);
        return newData.concat([{
        time: new Date().getTime(),
        x: sensor.quaternion[0],
        y: sensor.quaternion[1],
        z: sensor.quaternion[2],
        w: sensor.quaternion[3]
      }]);
    });
      setCurrentMeasure({ x: sensor.quaternion[0], y: sensor.quaternion[1], z: sensor.quaternion[2], w: sensor.quaternion[3] });
    };

    try {
        sensor.addEventListener("error", sensorErrorHandler);
        sensor.addEventListener("reading", sensorReadingHandler);
        sensor.start();
      setStatus("Reading");
    } catch (error) {
      // Handle construction errors.
      if (error.name === "SecurityError") {
        // See the note above about feature policy.
        setStatus("Sensor construction was blocked by a feature policy.");
      } else if (error.name === "ReferenceError") {
        setStatus("Sensor is not supported by the User Agent.");
      } else {
        setStatus("Sensor Catch Error");
      }
      // throw error;
    }

    return function cleanup() {
      sensor.removeEventListener("error", sensorErrorHandler);
      sensor.removeEventListener("reading", sensorReadingHandler);
    };
  }, []);

  return (
    <Flex column>
      <span>Orientation Sensor</span>
      <span>
        {`Readings: x: ${currentMeasure.x.toFixed(
          1
        )} y: ${currentMeasure.y.toFixed(1)} z: ${currentMeasure.z.toFixed(1)} w: ${currentMeasure.w.toFixed(1)}`}
      </span>
      {status === "Reading" ? (
        <LineChart
          width={730}
          height={250}
          data={data}
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
          <Line dot={false} isAnimationActive={false} type="monotone" dataKey="x" stroke="red" />
          <Line dot={false} isAnimationActive={false} type="monotone" dataKey="y" stroke="green" />
          <Line dot={false} isAnimationActive={false} type="monotone" dataKey="z" stroke="blue" />
          <Line dot={false} isAnimationActive={false} type="monotone" dataKey="w" stroke="yellow" />

        </LineChart>
      ) : (
        <span>{`ERROR: ${status}`}</span>
      )}
    </Flex>
  );
};

export default MyAbsoluteOrientationSensor;
