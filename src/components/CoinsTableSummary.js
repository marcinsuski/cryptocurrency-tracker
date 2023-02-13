import { GlobalDAta } from "../config/api";
import { CryptoContext } from "../CryptoContext";
import { Container } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
    Box,
    LinearProgress,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import classes from "./Coinstable.module.css";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Banner/Carousel";

const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff",
        },
        secondary: {
            main: "#ffb300",
        },
        accent: {
            main: "#ffb300",
        },
        mode: "dark",
    },
});

const CoinsTableSummary = () => {
    let navigate = useNavigate();

    const [marketData, setMarketData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const { currency } = useContext(CryptoContext);

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
