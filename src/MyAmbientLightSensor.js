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
          suggestedMax: 2,
          suggestedMin: -2,
        },
      },
    ],
  },
  legend: {
    display: false,
  },
};

const defaultSensorOptions = {
  referenceFrame: "device",
  frequency: 3,
};

const MyAmbientLightSensor = (props) => {
  const [status, setStatus] = useState("Starting");
  const [lastData, setLastData] = useState({ illuminance: 0 });
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "illuminance",
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
  const [sensor, setSensor] = useState(() => {
    if ("AmbientLightSensor" in window) {
      return new window.AmbientLightSensor()
    } else {
      return undefined
    }
  });

  useEffect(() => {
    const sensorErrorHandler = (event) => {
      // Handle runtime errors.
      if (event.error.name === "NotAllowedError") {
        // Branch to code for requesting permission.
        setStatus("NotAllowedError");
      } else if (event.error.name === "NotReadableError") {
        setStatus("Cannot connect to the sensor.");
      } else {
        setStatus("Sensor Generic Error: " + event.error.name);
      }
    };

    const sensorReadingHandler = () => {
      let newReading = sensor.illuminance;
      setData(
        produce(data, (draft) => {
          const newDate = new Date();
          draft.labels = draft.labels.concat([newDate]);
          draft.datasets[0].data = draft.datasets[0].data.concat([
            { t: newDate, y: newReading },
          ]);
          return draft;
        })
      );
      setLastData({ illuminance: newReading });
    };

    try {
      if ("AmbientLightSensor" in window) {
        sensor.onreading = () => sensorReadingHandler();
        sensor.onreading = () => sensorErrorHandler();
        sensor.start();
        setStatus("Reading");
      } else {
        setStatus("Sensor Unavailable");
      }
    } catch (error) {
      setSensor("Sensor Catch Error");
    }
  }, []);

  return (
    <Flex
      onClick={() =>
        speak(`Ambient Light Sensor status: ${status}`)
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
        <span style={{ fontWeight: "bold" }}>Ambient Light</span>

        {status === "Reading" && (
          <>
            <SmallText>
              <SmallText style={{ color: "yellow" }}>•</SmallText>
              {` illuminance: ${lastData.illuminance.toFixed(2)} lux`}
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

export default MyAmbientLightSensor;
