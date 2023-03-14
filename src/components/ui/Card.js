import React from "react";
import styles from "./Card.module.css";
const Card = () => {
  return <div className={styles.card}>{React.Children}</div>;
};

export default Card;
