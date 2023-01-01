import { CoinList } from "../config/api";
import { CryptoContext } from "../CryptoContext";
import { Container  } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import classes from "./Coinstable.module.css";

const Coinstable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    const { currency } = useContext(CryptoContext);

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            mode: "dark",
        },
    });

    console.log(coins);

    return (
        <ThemeProvider theme={darkTheme}>
            <Container className={classes.container}>
               <Typography 
                variant="h4"
                className={classes.title}>
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField
                variant="outlined"
                label="Search for a Crypto Currency"
                className={classes.search}
                onChange={(e) => setSearch(e.target.value)}
                />
            </Container>
        </ThemeProvider>
    );
};

export default Coinstable;
