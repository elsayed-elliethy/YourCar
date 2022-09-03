import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import useHttp from "../../hook/use-http";
import styles from "./carsForRent.module.css";
const CarsForRent = () => {
  const getCars = `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`;
  const { isLoading, error, requestFn } = useHttp();
  const [cars, setCars] = useState([]);

  /////getCars///
  useEffect(() => {
    const transformData = (data) => {
      let loadedCars = [];
      Object.entries(data).map((ele) => {
        if (ele[1].carData.category === "For Rent") {
          loadedCars.push(ele[1].carData);
        }
      });
      setCars(loadedCars);
    };
    requestFn(
      {
        url: getCars,
      },
      transformData
    );
  }, [requestFn, getCars]);

  return (
    <div>
      <div className={styles.catHeader}>
        <h2>Find cars for Rent</h2>
      </div>

      <div className="container mt-5">
        <div className="row">
          {cars.map((ele) => {
            return (
              <div
                className="col-md-4 col-lg-3 px-1 py-1 text-center text-capitalize"
                key={ele.carId}
              >
                <NavLink to={`/cars/${ele.carId}`}>
                  <Card className={styles.carCard}>
                    <Card.Img variant="top mw-100" src={ele.carImages[0]} />
                    <Card.Body>
                      <Card.Title>{ele.brand}</Card.Title>
                      <Card.Text>{ele.model}</Card.Text>
                      {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                  </Card>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CarsForRent;
