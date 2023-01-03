import classes from "./Header.module.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CryptoContext } from "../CryptoContext";

const Header = () => {
    let navigate = useNavigate();

    const { currency, setCurrency } = useContext(CryptoContext);
 
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            mode: "dark",
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position="static">
                <Toolbar>
                    <Typography
                        onClick={() => navigate("/")}
                        className={classes.title}
                        variant="h5"
                    >
                        Crypto Coin Tracker
                    </Typography>
                    <Select
                        variant="outlined"
                        style={{ width: 100, height: 40, marginRight: 15 }}
                        value={currency}
                        onChange={(e) => {
                            setCurrency(e.target.value);
                        }}
                    >
                        <MenuItem value={"PLN"} selected>
                            PLN
                        </MenuItem>
                        <MenuItem value={"USD"}>USD</MenuItem>
                    </Select>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

export default Header;
