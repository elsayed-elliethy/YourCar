import React, { Fragment } from "react";
import Brands from "../brands/Brands";
import Header from "../header/Header";
import styles from "./Home.module.css";
import homeImages from "./homeImgs";
const Home = () => {
  return (
    <Fragment>
      <Header />
      <Brands />
      <div className={styles.inYourHands}>
        <img src={homeImages.hands} alt="..." />
        <img src={homeImages.logo} alt="..." />
      </div>
    </Fragment>
  );
};

export default Home;
