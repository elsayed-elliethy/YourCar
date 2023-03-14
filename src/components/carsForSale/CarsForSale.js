import React, { Suspense, useEffect,useRef, useState } from "react";
import {
  Await,
  defer,
  json,
  NavLink,
  useLocation,
  useRouteLoaderData,
} from "react-router-dom";
import Card from "react-bootstrap/Card";
import useHttp from "../../hook/use-http";
import styles from "./carsforSale.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { FaRegImages } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { favoritesActions } from "../../store";
import Skeleton from "react-loading-skeleton";
import LoadingSpinner from "../loading/LoadingSpinner";
import { AnimatePresence, motion,useInView } from "framer-motion";
const CarsForSale = () => {
  const favorites = useSelector((state) => {
    return state.manageFavorites.items;
  });
  const { isLoading, error, requestFn } = useHttp();
  /////getCategories///
  const getCategories = `https://cars-3a440-default-rtdb.firebaseio.com/categories.json`;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const transformData = (data) => {
      let loadedCategories = [];
      Object.entries(data).map((ele) => {
        if (ele[1].name === "New Cars" || ele[1].name === "Used Cars") {
          loadedCategories.push(ele[1]);
        }
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
  ////
  const dispatch = useDispatch();
  const favoriteHandler = (ele) => {
    dispatch(favoritesActions.manageFavorites(ele));
  };
  ////
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [isActive, setIsActive] = useState(
    queryParams.get("type")?.replace(/-/g, " ")
  );
  const filterActive = (id) => {
    setIsActive(id);
  };
  const { cars } = useRouteLoaderData("all-cars");
   /////animation/////////
   const carsRef = useRef(null)
   const carsIsInView = useInView(carsRef, { once: false,})
   const carsItemClass = carsIsInView ? `${styles.carsItemShow}`: `${styles.carsItemHide}`
   ///////
  return (
    <div>
      <div className={styles.catHeader}>
        <h2>Find your match</h2>
      </div>
      <Container className={`${styles.links}`}>
        <Row className="w-75 mx-auto">
          <Col md={4} className="mb-2 mb-md-0">
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
          </Col>
          {categories.map((ele) => {
            return (
              <Col md={4} className="mb-2 mb-md-0" key={ele.id}>
                <NavLink
                  id={ele.name}
                  className={
                    isActive === ele.name
                      ? `btn  w-100 ${styles.active} ${styles.myButton}`
                      : "btn w-100"
                  }
                  to={`${location.pathname}?type=${ele.name.replace(
                    /\s/g,
                    "-"
                  )}`}
                  onClick={(e) => filterActive(e.target.id)}
                >
                  {ele.name}
                </NavLink>
              </Col>
            );
          })}
        </Row>
      </Container>
      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={cars}>
          {(loadedCars) => (
            <Container className="my-5">
              <Row className="justify-content-center" ref={carsRef}>
                {(isActive === "allCars"
                  ? [...loadedCars].filter((ele) => {
                      return (
                        ele.category === "New Cars" ||
                        ele.category === "Used Cars"
                      );
                    })
                  : [...loadedCars].filter((ele) => {
                      return (
                        ele.category ===
                        queryParams.get("type")?.replace(/-/g, " ")
                      );
                    })
                ).map((ele) => {
                  return (
                    <AnimatePresence key={ele.id}>
                    <motion.div
                      md={6}
                      lg={4}
                      xl={3}
                      // className={`px-1 py-1 text-center text-capitalize ${carsItemClass}`}
                      className={`col-md-6 col-lg-4 col-xl-3 px-1 py-1 text-center text-capitalize`}
                      key={ele.id}
                      initial={{opacity: 0, transition: "all 1.5s ease",transform: "translate3d(-100px,0,0)"}}
                  whileInView={{ opacity: 1, transition: "all 1.5s ease",transform: "translateZ(0)" }}
                  viewport={{ once: false }}
                  exit={{opacity: 0, transition: "all 1.5s ease",transform: "translate3d(-100px,0,0)"}}
                      
                    >
                      <Card className={styles.carCard}>
                        <div className="h-100 w-100 overflow-hidden">
                          <NavLink to={`/cars/${ele.id}`}>
                            <Card.Img
                              variant="top mw-100"
                              src={ele.carImages[0]}
                              loading="lazy"
                            />
                          </NavLink>
                          <span className={styles.imagesNumber}>
                            <FaRegImages className="me-1" />
                            {ele.carImages.length}
                          </span>
                          <span className={styles.favorite}>
                            <MdFavorite
                              id={ele.id}
                              className={
                                favorites.filter((el) => {
                                  return el.id === ele.id;
                                }).length > 0
                                  ? styles.active
                                  : ""
                              }
                              onClick={(e) => favoriteHandler(ele)}
                            />
                          </span>
                        </div>
                        <NavLink to={`/cars/${ele.id}`}>
                          <Card.Body className={`card-body ${styles.carInfo}`}>
                            <Card.Title className={styles.title}>
                              {ele.make} {ele.model}{" "}
                              {ele.type || <Skeleton className="w-50" />}
                            </Card.Title>
                            <div>
                              <p
                                className={`fw-bold fs-5 mb-0 ${styles.price}`}
                              >
                                ${ele.price || <Skeleton className="w-50" />}
                              </p>
                              <div className={styles.splitHr}></div>
                              <ul className="list-unstyled d-flex justify-content-between align-items-center">
                                <li>
                                  {ele.year || <Skeleton className="w-50" />}
                                </li>
                                <li>
                                  {ele.transmission || (
                                    <Skeleton className="w-50" />
                                  )}
                                </li>
                                <li>
                                  {ele.fuelType || (
                                    <Skeleton className="w-50" />
                                  )}
                                </li>
                              </ul>
                            </div>
                          </Card.Body>
                        </NavLink>
                      </Card>
                    </motion.div>
                    </AnimatePresence>
                  );
                })}
              </Row>
            </Container>
          )}
        </Await>
      </Suspense>
    </div>
  );
};
export default CarsForSale;
const loadCars = async () => {
  const response = await fetch(
    `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`
  );
  if (!response.ok) {
    throw json({ message: "Could not fetch cars." }, { status: 500 });
  }
  const responseData = await response.json();
  const result = Object.values(responseData);
  console.log(result);
  return result;
};
export const carsLoader = () => {
  return defer({
    cars: loadCars(),
  });
};
// export const carsLoader = async () => {
//   const response = await fetch(
//     `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`
//   );
//   if (!response.ok) {
//     throw json({ message: "Could not fetch cars." }, { status: 500 });
//   } else {
//     const responseData = await response.json();
//     return responseData;
//   }
// };
/////////////////
/////getCars///
// const getCars = `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`;
// const [cars, setCars] = useState([]);
// useEffect(() => {
//   const transformData = (data) => {
//     let loadedCars = [];
//     Object.entries(data).map((ele) => {
//       if (ele[1].category === "New Cars" || ele[1].category === "Used Cars") {
//         loadedCars.push(ele[1]);
//       }
//     });
//     setCars(loadedCars);
//   };
//   requestFn(
//     {
//       url: getCars,
//     },
//     transformData
//   );
// }, [requestFn, getCars]);
