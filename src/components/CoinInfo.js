import { CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/system";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { HistoricalChart } from "../config/api";
import { CryptoContext } from "../CryptoContext";
import Chart from "chart.js/auto";
import classes from "./CoinInfo.module.css";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

const CoinInfo = ({ coin }) => {
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);
    const [flag,setflag] = useState(false);
    const { currency } = useContext(CryptoContext);

    const fetchHistoricData = async () => {
        const { data } = await axios.get(
            HistoricalChart(coin.id, days, currency)
        );
          setflag(true);
        setHistoricData(data.prices);
    };

    useEffect(() => {
        fetchHistoricData();
    }, [days]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });


    // console.log(historicData);

    return (
        <ThemeProvider theme={darkTheme}>
          <div className={classes.container}>
        {!historicData | flag===false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
        </ThemeProvider>
    );
};
{
}

export default CoinInfo;
