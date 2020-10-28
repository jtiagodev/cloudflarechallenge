import React, { useState, useEffect } from "react";
import { Flex } from "./components/Grid";
import Text from "./components/Text";
import produce from "immer";
import { Line } from "react-chartjs-2";

const minimalOptions = {
  elements: {
    point: {
      radius: 0,
    },
  },
  tooltips: {
    enabled: false,
  },
  hover: { mode: null },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
        type: "time",
      },
    ],
    yAxes: [
      {
        ticks: {
          min: -10,
          max: 20,
          stepSize: 1,
        },
      },
    ],
  },
  legend: {
    display: false,
  },
};

const MyAccelerometer = (props) => {
  const [sensor, setSensor] = useState("Starting");
  const [accelerometer, setAccelerometer] = useState({ x: 0, y: 0, z: 0 });
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "x",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        borderColor: "red",
        borderWidth: 2,
        pointRadius: 0,
        lineTension: 0,
        pointBackgroundColor: "white",
        showLine: true,
        data: [],
      },
      {
        label: "y",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        borderColor: "green",
        borderWidth: 2,
        pointRadius: 0,
        lineTension: 0,
        pointBackgroundColor: "white",
        showLine: true,
        data: [],
      },
      {
        label: "z",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        borderColor: "blue",
        borderWidth: 2,
        pointRadius: 0,
        lineTension: 0,
        pointBackgroundColor: "white",
        showLine: true,
        data: [],
      },
    ],
  });
  const [accel, setAccel] = useState(
    new window.Accelerometer({
      referenceFrame: "device",
      frequency: 3,
    })
  );

  useEffect(() => {
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

    const accelReadingHandler = () => {
      setData(
        produce(data, (draft) => {
          const newDate = new Date();
          draft.labels = draft.labels.concat([newDate]);
          draft.datasets[0].data = draft.datasets[0].data.concat([
            { t: newDate, y: accel.x },
          ]);
          draft.datasets[1].data = draft.datasets[1].data.concat([
            { t: newDate, y: accel.y },
          ]);
          draft.datasets[2].data = draft.datasets[2].data.concat([
            { t: newDate, y: accel.z },
          ]);
          return draft;
        })
      );
      setAccelerometer({ x: accel.x, y: accel.y, z: accel.z });
    };

    try {
      accel.addEventListener("error", accelErrorHandler);
      accel.addEventListener("reading", accelReadingHandler);
      accel.start();
      setSensor("Reading");
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
    <Flex>
      <Flex column>
        <Text>Accelerometer</Text>
        {sensor === "Reading" && (<span>
          {`Readings: ${accelerometer.x.toFixed(1)} ${accelerometer.y.toFixed(
            1
          )} ${accelerometer.z.toFixed(1)}`}
        </span>)}
      </Flex>
      {sensor === "Reading" ? (
        <Line data={data} options={minimalOptions} />
      ) : (
        <span>{`ERROR: ${sensor}`}</span>
      )}
    </Flex>
  );
};

export default MyAccelerometer;
