import React, { useEffect, useMemo, useState } from "react";
import { Card } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import useHttp from "../../hook/use-http";
import LoadingSpinner from "../loading/LoadingSpinner";
import styles from "./search.module.css";
const Search = () => {
  const { searchValue } = useParams();
  const targetMake = searchValue.slice(5, searchValue.indexOf("&"));
  const targetPrice = searchValue.slice(searchValue.indexOf("&") + 7);
  /////getCars///
  const getCars = `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`;
  const { isLoading, error, requestFn } = useHttp();
  const [cars, setCars] = useState([]);
  useEffect(() => {
    const transformData = (data) => {
      let loadedCars = [];
      Object.entries(data).map((ele) => {
        loadedCars.push(ele[1]);
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
  const carsData = useMemo(() => cars, [cars]);
  //////
  let targetCars;
  if (targetMake === "allMakes") {
    targetCars = carsData.filter((ele) => {
      return ele.price <= +targetPrice;
    });
  }
  if (targetPrice === "allPrices") {
    targetCars = carsData.filter((ele) => {
      return ele.make === targetMake;
    });
  }
  if (targetMake === "allMakes" && targetPrice === "allPrices") {
    targetCars = carsData;
  }
  if (targetMake !== "allMakes" && targetPrice !== "allPrices") {
    targetCars = carsData.filter((ele) => {
      return ele.make === targetMake && ele.price <= +targetPrice;
    });
  }
  return (
    <div className={styles.search}>
      {carsData.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <h3 className={`text-center fw-bold ${styles.results}`}>
          <span>
            {targetCars.length === 0 ? "No " : `(${targetCars.length}) `}
          </span>
          Results for <span>{targetMake}</span>, Max Price{" "}
          <span>
            {targetPrice === "allPrices" ? targetPrice : `$${targetPrice}`}
          </span>
        </h3>
      )}
      <div className="container mt-5">
        <div className="row mx-auto text-center justify-content-center">
          {targetCars.map((ele) => {
            return (
              <div
                className="col-md-4 col-lg-3 px-1 py-1 text-center text-capitalize"
                key={ele.id}
              >
                <NavLink to={`/cars/${ele.id}`}>
                  <Card className={styles.carCard}>
                    <div className="h-100 w-100 overflow-hidden">
                      <Card.Img variant="top mw-100" src={ele.carImages[0]} />
                    </div>
                    <Card.Body className={`card-body ${styles.carInfo}`}>
                      <Card.Title className={styles.title}>
                        {ele.make} {ele.model} {ele.type}
                      </Card.Title>
                      <div>
                        <p className={`fw-bold fs-5 mb-0 ${styles.price}`}>
                          ${ele.price}{" "}
                          {ele.category === "For Rent" && (
                            <span className="fw-normal text-lowercase">
                              /day
                            </span>
                          )}
                        </p>
                        <div className={styles.splitHr}></div>
                        <ul className="list-unstyled d-flex justify-content-between align-items-center">
                          <li>{ele.year}</li>
                          <li>{ele.transmission}</li>
                          <li>{ele.fuelType}</li>
                        </ul>
                      </div>
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

export default Search;
