import React, { useState, useEffect } from "react";
import { Flex } from "./components/Grid";
import Title, { SmallText } from "./components/Text";
import produce from "immer";
import { Doughnut } from "react-chartjs-2";
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
  legend: {
    display: false,
  },
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 0
  }
};

const Status = (props) => {
  const { statusData = [1, 4] } = props;

  const [data, setData] = useState({
    labels: ['GOOD', 'BAD'],
    datasets: [
        {
          label: 'System Status',
          data: statusData,
          backgroundColor: [
            'rgba(0, 255, 0, 0.3)',
            'rgba(255, 0, 0, 0.6)',
          ],
          borderColor: [
            'rgba(0, 255, 0, 0.6)',
            'rgba(255, 0, 0, 0.6)',
          ],
          borderWidth: 1,
        },
      ],
  });

  return (
    <Flex
      onClick={() =>
        speak(`Current system status: ${statusData[0]} good, ${statusData[1]} bad`)
      }
      style={{
        flex: 3,
        alignItems: "center",
        width: "90vw",
        minHeight: "10vh",
        maxHeight: "40vh",
        padding: "10px",
        margin: "20px 0px"
      }}
    >
      <Flex style={{ flex: 1 }} column>
        <span style={{ fontWeight: "bold" }}>System Status</span>

          <>
            <SmallText>
              <SmallText style={{ color: "green" }}>•</SmallText>
              {` OK: ${statusData[0]}`}
            </SmallText>
            <SmallText>
              <SmallText style={{ color: "red" }}>•</SmallText>
              {` NOK: ${statusData[0]}`}
            </SmallText>
          </>
      
      </Flex>

      <Flex style={{ flex: 2, maxWidth: "60vw" }}>
          <Doughnut data={data} options={minimalOptions} />
      </Flex>
    </Flex>
  );
};

export default Status;
