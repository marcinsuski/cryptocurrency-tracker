import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Carousel from "./Carousel";
import classes from "./Banner.module.css";

const Banner = () => {
    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <Typography variant="h2" className={classes.title}>
                    Crypto Coin Tracker
                </Typography>
                <Typography variant="subtitle2" className={classes.subtitle}>
                    Get all the info regarding your favourite Crypto Currency
                </Typography>
                <Carousel/>
            
            </Container>
         </div>
    );
};

export default Banner;
