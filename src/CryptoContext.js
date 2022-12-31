import { createContext } from "react";

export const CryptoContext = createContext({});


// import React, { createContext, useContext, useState, useEffect } from "react";

// const Crypto = createContext({});
 
// const CryptoContext = ({ children }) => {
//     const [currency, setCurrency] = useState("PLN");
//     const [symbol, setSymbol] = useState("z");

//     useEffect(() => {
//         if (currency === "PLN") {
//             setSymbol("z");
//         } else if (currency === "USD") {
//             setSymbol("$");
//         }
//     }, [currency]);

//     return (
//         <Crypto.Provider value={{ currency, symbol, setCurrency }}>
//             {children}
//         </Crypto.Provider>
//     );
// };

// export default CryptoContext;

// export const CryptoState = () => {
//     useContext(Crypto);
// };
