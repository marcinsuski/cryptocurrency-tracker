import { BrowserRouter, Routes, Route } from "react-router-dom";
import classes from "./App.module.css";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";

import { CryptoContext } from "./CryptoContext";
import { useEffect, useState } from "react";


function App() {

    const [currency, setCurrency] = useState("PLN");
    const [symbol, setSymbol] = useState("PLN");

    useEffect(() => {
        if (currency === "PLN") {
            setSymbol("PLN");
        } else if (currency === "USD") {
            setSymbol("$");
        }
    }, [currency]);

    return (
        <CryptoContext.Provider value={{ currency, setCurrency, symbol }}>
            <BrowserRouter>
                <div className={classes.App}>
                    <Header />
                    <Routes>
                        <Route path="/" exact element={<Homepage />} />
                        <Route path="/coins/:id" exact element={<CoinPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </CryptoContext.Provider>
    );
}

export default App;
