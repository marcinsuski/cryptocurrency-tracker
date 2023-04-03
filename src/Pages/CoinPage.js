import { LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { CryptoContext } from "../CryptoContext";
import classes from "./CoinPage.module.css";
import parse from "html-react-parser";
import { numberWithCommas } from "../components/Banner/Carousel";

const CoinPage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();

    const { currency, symbol } = useContext(CryptoContext);

    const fetchCoin = async () => {
        let newId = id.slice(1);
        const { data } = await axios.get(
            // SingleCoin(id)
            `https://api.coingecko.com/api/v3/coins/${newId}`
        );
        setCoin(data);
        // console.log(data)
    };

    useEffect(() => {
        fetchCoin();
    }, [currency]);

    let html = coin?.description.en.split(". ")[0];

    if (!coin)
        return <LinearProgress style={{ backgroundColor: "rgb(255,215,0)" }} />;

    return (
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <img src={coin?.image.large} alt={coin?.name} />
                <Typography variant="h3" className={classes.heading}>
                    {coin?.name}
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    {parse(html)}.
                </Typography>
                <div className={classes.marketData}>
                    {/* Rank */}
                    <span>
                        <Typography variant="h5" className={classes.heading}>
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5">
                            {coin?.market_cap_rank}
                        </Typography>
                    </span>
                    {/* current price */}
                    <span>
                        <Typography variant="h5" className={classes.heading}>
                            Current Price:{" "}
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5">
                            {symbol}{" "}
                            {numberWithCommas(
                                coin?.market_data.current_price[
                                    currency.toLowerCase()
                                ]
                            )}
                        </Typography>
                    </span>
                    {/* market cap */}
                    <span>
                        <Typography variant="h5" className={classes.heading}>
                            Market Cap:{" "}
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5">
                            {symbol}{" "}
                            {numberWithCommas(
                                coin?.market_data.market_cap[
                                    currency.toLowerCase()
                                ]
                                    .toString()
                                    .slice(0, -6)
                            )}{" "}
                            M
                        </Typography>
                    </span>
                    <span>
                        <Typography variant="h5" className={classes.heading}>
                            24 hours high:{" "}
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5" style={{ color: "#00d615" }}>
                            {symbol}{" "}
                            {numberWithCommas(
                                coin?.market_data.high_24h[
                                    currency.toLowerCase()
                                ].toString()
                            )}
                        </Typography>
                    </span>
                    <span>
                        <Typography variant="h5" className={classes.heading}>
                            24 hours low:{" "}
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5" style={{ color: "#e90000" }}>
                            {symbol}{" "}
                            {numberWithCommas(
                                coin?.market_data.low_24h[
                                    currency.toLowerCase()
                                ].toString()
                            )}
                        </Typography>
                    </span>
                    <span>
                        <Typography variant="h5" className={classes.heading}>
                            24 price change:{" "}
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h5"
                            style={{
                                color: `${
                                    coin?.market_data
                                        .price_change_percentage_24h < 0
                                        ? "#e90000"
                                        : "#00d615"
                                }`,
                            }}
                        >
                            {/* {symbol}{" "} */}
                            {numberWithCommas(
                                coin?.market_data.price_change_percentage_24h
                                    .toFixed(2)
                                    .toString()
                            )}{" "}
                            %
                        </Typography>
                    </span>
                </div>
            </div>
            {/*chart*/}
            <CoinInfo coin={coin} />
        </div>
    );
};

export default CoinPage;
