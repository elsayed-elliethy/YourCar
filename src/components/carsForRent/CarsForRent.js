import React, { Suspense, useRef } from "react";
import { Await, NavLink, useRouteLoaderData } from "react-router-dom";
import Card from "react-bootstrap/Card";
import styles from "./carsForRent.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { FaRegImages } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { favoritesActions } from "../../store";
import LoadingSpinner from "../loading/LoadingSpinner";
import {AnimatePresence, motion, useInView } from "framer-motion";
const CarsForRent = () => {
  const favorites = useSelector((state) => {
    return state.manageFavorites.items;
  });
  const { cars } = useRouteLoaderData("all-cars");

  const dispatch = useDispatch();
  const favoriteHandler = (ele) => {
    dispatch(favoritesActions.manageFavorites(ele));
  };
   /////animation/////////
   const carsRef = useRef(null)
   const carsIsInView = useInView(carsRef, { once: true})
   const carsItemClass = carsIsInView ? `${styles.carsItemShow}`: `${styles.carsItemHide}`
   ///////
  return (
    <div>
      <div className={styles.catHeader}>
        <h2>Find cars for Rent</h2>
      </div>
      <Container className="my-5">
        <Suspense fallback={<LoadingSpinner />}>
          <Await resolve={cars}>
            {(loadedCars) => (
              <Row className="justify-content-center" ref={carsRef}>
                {[...loadedCars]
                  .filter((ele) => {
                    return ele.category === "For Rent";
                  })
                  .map((ele) => {
                    return (
                      <AnimatePresence key={ele.id}>
                      <motion.div
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
                            <Card.Body
                              className={`card-body ${styles.carInfo}`}
                            >
                              <Card.Title className={styles.title}>
                                {ele.make} {ele.model} {ele.type}
                              </Card.Title>
                              <div>
                                <p
                                  className={`fw-bold fs-5 mb-0 ${styles.price}`}
                                >
                                  ${ele.price}{" "}
                                  <span className="fw-normal text-lowercase">
                                    / day
                                  </span>
                                </p>
                                <div className={styles.splitHr}></div>
                                <ul className="list-unstyled d-flex justify-content-between align-items-center">
                                  <li>{ele.year}</li>
                                  <li>{ele.transmission}</li>
                                  <li>{ele.fuelType}</li>
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
            )}
          </Await>
        </Suspense>
      </Container>
    </div>
  );
};
export default CarsForRent;
/////////////
/////getCars///
// const { isLoading, error, requestFn } = useHttp();
// const getCars = `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`;
// const [cars, setCars] = useState([]);
// useEffect(() => {
//   const transformData = (data) => {
//     let loadedCars = [];
//     Object.entries(data).map((ele) => {
//       if (ele[1].category === "For Rent") {
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
