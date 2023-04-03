import { BrowserRouter, Routes, Route } from "react-router-dom";
import classes from "./App.module.css";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { CryptoContext } from "./CryptoContext";
import { useEffect, useState } from "react";

function App() {
    const [currency, setCurrency] = useState("USD");
    const [symbol, setSymbol] = useState("$");

    useEffect(() => {
        if (currency === "PLN") {
            setSymbol("PLN");
        } else if (currency === "USD") {
            setSymbol("$");
        }
    }, [currency]);

    return (
        <CryptoContext.Provider value={{ currency, setCurrency, symbol }}>
            <StyledEngineProvider injectFirst>
                <BrowserRouter>
                    <div className={classes.App}>
                        <Header />
                        <Routes>
                            <Route path="/" exact element={<Homepage />} />
                            <Route path="/coins/:id" element={<CoinPage />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </StyledEngineProvider>
        </CryptoContext.Provider>
    );
}

export default App;
