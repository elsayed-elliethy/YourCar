import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hook/use-http";
import styles from "./CarDetails.module.css";
const CarDetails = () => {
  const getCar = `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`;
  const [car, setCar] = useState();
  const { isLoading, error, requestFn } = useHttp();
  const { carId } = useParams();
  console.log(carId);
  /////getCarDetails///
  useEffect(() => {
    const transformData = (data) => {
      Object.entries(data).map((ele) => {
        if (ele[1].carData.carId === +carId) {
          setCar(ele[1].carData);
        }
      });
    };
    requestFn(
      {
        url: getCar,
      },
      transformData
    );
  }, [requestFn, getCar, carId]);
  console.log(car);
  return (
    <div className="carsDetails">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className={styles.mainImage}>
              <img src={car?.carImages[0]} alt="" />
            </div>
            <div className={styles.images}>
              <img src={car?.carImages[0]} alt="" />
              <img src={car?.carImages[1]} alt="" />
              <img src={car?.carImages[2]} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
