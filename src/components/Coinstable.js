import { CoinList } from "../config/api";
import { CryptoContext } from "../CryptoContext";
import { Container } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
    LinearProgress,
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

const Coinstable = () => {
    let navigate = useNavigate();   
    const { symbol } = useContext(CryptoContext);

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

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

    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        );
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Container className={classes.container}>
                <Typography variant="h4" className={classes.title}>
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField
                    variant="outlined"
                    label="Search for a Crypto Currency"
                    className={classes.search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer>
                    {loading ? (
                        <LinearProgress className={classes.table__loading} />
                    ) : (
                        <Table>
                            <TableHead className={classes.table__tablehead}>
                                <TableRow>
                                    {[
                                        "Coin",
                                        "Price",
                                        "24 Change",
                                        "Market Cap",
                                    ].map((head) => (
                                        <TableCell
                                            className={classes.tablehead__cell}
                                            key={head}
                                            align={
                                                head === "Coin" ? "" : "right"
                                            }
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleSearch().map((row) => {
                                    const profit =
                                        row.price_change_percentage_24h > 0;

                                    return (
                                        <TableRow
                                        className={classes.table__row}
                                            onClick={() =>
                                                (navigate(`/coins/$${row.id}`))
                                            }
                                            key={row.name}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                className={classes.table__cell}
                                            >
                                                <img
                                                    src={row?.image}
                                                    alt={row.name}
                                                ></img>
                                                <div className={classes.table__cell_div}>
                                                    <span className={classes.table__cell_symbol}>{row.symbol}</span>
                                                    <span className={classes.table__cell_name}>{row.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">
                                                {symbol}{" "}
                                                {numberWithCommas(row.current_price.toFixed(2))}
                                            </TableCell>
                                            <TableCell align="right" 
                                                style={{
                                                    color: profit > 0 ? "rgb(14,203,129)" : "red",
                                                    fontWeight: 500,
                                                }}
                                                >
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>
                                            <TableCell align="right">
                                                {symbol}{" "}
                                                {numberWithCommas(row.market_cap.toString())}
                                                 
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
            </Container>
        </ThemeProvider>
    );
};

export default Coinstable;
