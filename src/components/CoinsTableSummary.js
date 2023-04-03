import { GlobalDAta } from "../config/api";
import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./Coinstable.module.css";
import { Box } from "@mui/material";

const CoinsTableSummary = ({ setLoading }) => {
    const [marketData, setMarketData] = useState([]);

    const fetchGlobalData = async () => {
        setLoading(true);
        const { data } = await axios.get(GlobalDAta());
        setMarketData(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchGlobalData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                height: "100px",
                justifyContent: "space-between",
                width: "100%",
            }}
            mb="1rem"
        >
            <Box className={classes.summary_box}>
                {/* {marketData.data.markets} */}
            </Box>
            <Box className={classes.summary_box}></Box>
            <Box className={classes.summary_box}></Box>
        </Box>
    );
};

export default CoinsTableSummary;
