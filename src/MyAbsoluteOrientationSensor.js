import React, { useState, useEffect } from "react";
import { Flex } from "./components/Grid";
import Title, { SmallText } from "./components/Text";
import produce from "immer";
import { Line } from "react-chartjs-2";
import { speak } from "./utils/voiceSynthesis";
import { LoaderDots } from "@thumbtack/thumbprint-react";

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

          display: false,
          min: -1,
          max: 1
        
        },
      },
    ],
  },
  legend: {
    display: false,
  },
};

const MyAbsoluteOrientationSensor = (props) => {
  const { setStatusData } = props;

  const [status, setStatus] = useState("Starting");
  const [lastData, setLastData] = useState({ x: 0, y: 0, z: 0, w: 0 });
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
      {
        label: "w",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        borderColor: "yellow",
        borderWidth: 2,
        pointRadius: 0,
        lineTension: 0,
        pointBackgroundColor: "white",
        showLine: true,
        data: [],
      },
    ],
  });
  const [sensor, setSensor] = useState(
    new window.AbsoluteOrientationSensor({
      referenceFrame: "device",
      frequency: 3,
    })
  );

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
      setStatusData(prevData => produce(prevData, (draft) => {
        draft[0] = draft[0] - 1;
        draft[1] = draft[1] + 1;
        return draft;
      }));
    };

    const sensorReadingHandler = () => {
      let newX = sensor.quaternion[0];
      let newY = sensor.quaternion[1];
      let newZ = sensor.quaternion[2];
      let newW = sensor.quaternion[3];
      setData(
        produce(data, (draft) => {
          const newDate = new Date();
          draft.labels = draft.labels.concat([newDate]);
          draft.datasets[0].data = draft.datasets[0].data.concat([
            { t: newDate, y: newX },
          ]);
          draft.datasets[1].data = draft.datasets[1].data.concat([
            { t: newDate, y: newY },
          ]);
          draft.datasets[2].data = draft.datasets[2].data.concat([
            { t: newDate, y: newZ },
          ]);
          draft.datasets[3].data = draft.datasets[3].data.concat([
            { t: newDate, y: newW },
          ]);
          return draft;
        })
      );
      setLastData({ x: newX, y: newY, z: newZ, w: newW });
    };

    try {
      sensor.addEventListener("error", sensorErrorHandler);
      sensor.addEventListener("reading", sensorReadingHandler);
      sensor.start();
      setStatus("Reading");
      setStatusData(prevData => produce(prevData, (draft) => {
        draft[0] = draft[0] + 1;
        draft[2] = draft[2] - 1;
        return draft;
      }));
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
      sensor.removeEventListener("error", sensorErrorHandler);
      sensor.removeEventListener("reading", sensorReadingHandler);
    };
  }, []);

  return (
    <Flex
      onClick={() =>
        speak(`Absolute Orientation Sensor status: ${status}`)
      }
      style={{
        boxShadow: "0px 0px 2px 0px #FFFFFF",
        flex: 3,
        alignItems: "center",
        border: "1px solid #24CC44",
        width: "90vw",
        minHeight: "10vh",
        maxHeight: "40vh",
        padding: "10px",
      }}
    >
      <Flex style={{ flex: 1 }} column>
        <span>Absolute Orientation</span>

        {status === "Reading" && (
          <>
            <SmallText>
              <SmallText style={{ color: "red" }}>•</SmallText>
              {` x: ${lastData.x.toFixed(2)}`}
            </SmallText>
            <SmallText>
              <SmallText style={{ color: "green" }}>•</SmallText>
              {` y: ${lastData.y.toFixed(2)}`}
            </SmallText>
            <SmallText>
              <SmallText style={{ color: "blue" }}>•</SmallText>
              {` z: ${lastData.z.toFixed(2)}`}
            </SmallText>
            <SmallText>
              <SmallText style={{ color: "yellow" }}>•</SmallText>
              {` w: ${lastData.w.toFixed(2)}`}
            </SmallText>
          </>
        )}
      </Flex>
      <Flex style={{ flex: 2, maxWidth: "60vw" }}>
        {status === "Reading" ? (
          <Line data={data} options={minimalOptions} />
        ) : status === "Starting" ? (
          <LoaderDots theme="inverse" size="small" />
        ) : (
          <SmallText style={{ color: 'red' }}>{`ERROR: ${status}`}</SmallText>
        )}
      </Flex>
    </Flex>
  );
};

export default MyAbsoluteOrientationSensor;
