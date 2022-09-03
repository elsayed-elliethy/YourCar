import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import useHttp from "../../hook/use-http";
import styles from "./carsforSale.module.css";
const CarsForSale = () => {
  const getCars = `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`;
  const getCategories = `https://cars-3a440-default-rtdb.firebaseio.com/categories.json`;
  const { isLoading, error, requestFn } = useHttp();
  const [cars, setCars] = useState([]);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const [isActive, setIsActive] = useState("allCars");
  const filterActive = (id) => {
    setIsActive(id);
    filterCars(id);
  };
  /////getCategories///
  useEffect(() => {
    const transformData = (data) => {
      let loadedCategories = [];
      Object.entries(data).map((ele) => {
        loadedCategories.push(ele[1]);
      });
      setCategories(loadedCategories);
    };
    requestFn(
      {
        url: getCategories,
      },
      transformData
    );
  }, [requestFn, getCategories]);
  /////getCars///
  useEffect(() => {
    const transformData = (data) => {
      let loadedCars = [];
      Object.entries(data).map((ele) => {
        if (
          ele[1].carData.category === "New Cars" ||
          ele[1].carData.category === "Used Cars"
        ) {
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

  const forSaleCats = categories.filter((cat) => {
    return cat.catType === "forSale";
  });

  const [content, setContent] = useState([]);
  const filterCars = (category) => {
    let filter;
    if (category === "allCars") {
      filter = cars;
    } else {
      filter = cars.filter((ele) => {
        return ele.category === category;
      });
    }
    setContent(filter);
  };

  return (
    <div>
      <div className={styles.catHeader}>
        <h2>Find new & used cars for sale</h2>
        {/* <h2>Find your match</h2> */}
      </div>
      <div className={`container ${styles.links}`}>
        <div className="row w-50 mx-auto">
          <div className="col-md-4">
            <NavLink
              id="allCars"
              className={
                isActive === "allCars"
                  ? `btn w-100 ${styles.active}`
                  : "btn w-100"
              }
              to={`${location.pathname}?type=allCars`}
              onClick={(e) => filterActive(e.target.id)}
            >
              All Cars
            </NavLink>
          </div>
          {forSaleCats.map((ele) => {
            return (
              <div className="col-md-4" key={ele.id}>
                <NavLink
                  id={ele.name}
                  className={
                    isActive === ele.name
                      ? `btn w-100 ${styles.active}`
                      : "btn w-100"
                  }
                  to={`${location.pathname}?type=${ele.name.replace(
                    /\s/g,
                    ""
                  )}`}
                  onClick={(e) => filterActive(e.target.id)}
                >
                  {ele.name}
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          {(isActive === "allCars" ? cars : content).map((ele) => {
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

export default CarsForSale;
