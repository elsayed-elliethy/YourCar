import React from "react";
import styles from "./Brands.module.css";
import IMAGES from "./brandsImages.js";
const Brands = () => {
  return (
    <div
      className={`d-flex justify-content-between align-items-center ${styles.brands}`}
    >
      <a href="#">
        <img src={IMAGES.bmw} alt="..." />
      </a>
      <a href="#">
        <img src={IMAGES.ford} alt="..." />
      </a>
      <a href="#">
        <img src={IMAGES.Nissan} alt="..." />
      </a>
      <a href="#">
        <img src={IMAGES.jeep} alt="..." />
      </a>
      <a href="#">
        <img src={IMAGES.ferrari} alt="..." />
      </a>
      <a href="#">
        <img src={IMAGES.chevrolet} alt="..." />
      </a>
      <a href="#">
        <img src={IMAGES.lamborghini} alt="..." />
      </a>
      <a href="#">
        <img src={IMAGES.hyundai} alt="..." />
      </a>
      <a href="#">
        <img src={IMAGES.fiat} alt="..." />
      </a>
      <a href="#">
        <img src={IMAGES.Kia} alt="..." />
      </a>
      <a href="#">
        <img src={IMAGES.mercedes} alt="..." />
      </a>
    </div>
  );
};

export default Brands;
