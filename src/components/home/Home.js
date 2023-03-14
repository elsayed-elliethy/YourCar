import React, { Fragment, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  Await,
  NavLink,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import useHttp from "../../hook/use-http";
import Brands from "../brands/Brands";
import Header from "../header/Header";
import styles from "./Home.module.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AiFillApple, AiFillCheckCircle } from "react-icons/ai";
import { FaGooglePlay, FaRegImages } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { favoritesActions } from "../../store";
import downloadAppImg from "../../assets/homeImages/download.png";
import LoadingSpinner from "../loading/LoadingSpinner";
//
import { AnimatePresence, motion, useInView } from "framer-motion";
/////
const Home = () => {
 const favorites = useSelector((state) => {
    return state.manageFavorites.items;
  });
  /////animation/////////
 const chooseUsRef = useRef(null)
 const chooseUsIsInView = useInView(chooseUsRef, { once: false })
 const howTOBuyRef = useRef(null)
 const howTOBuyIsInView = useInView(howTOBuyRef, { once: false })
 const chooseUsItemClass = chooseUsIsInView ? `${styles.chooseUsItemShow}`: `${styles.chooseUsItemHide}`
 const howToBuyItemClass = howTOBuyIsInView ? `${styles.howToBuyItemShow}`: `${styles.howToBuyItemHide}`
 ///////
  const { cars } = useRouteLoaderData("all-cars");
  const data2 = useLoaderData();
  const teamData = [];
  Object.entries(data2).map((ele) => {
    teamData.push(ele[1]);
  });
  const [featuredIsActive, setFeaturedIsActive] = useState("New Cars");
  const filterFeatures = (cat) => {
    setFeaturedIsActive(cat);
  };
  const [popularIsActive, setPopularIsActive] = useState("Audi");
  const filterPopular = (make) => {
    setPopularIsActive(make);
  };
  const dispatch = useDispatch();
  const favoriteHandler = (ele) => {
      dispatch(favoritesActions.manageFavorites(ele));
  };
  
  return (
    <Fragment>
      <Header />
      <Container className="mt-5">
        <Row className={styles.heading}>
          <Col lg={6} className="">
            <h3 className="text-center text-lg-start">Handy picked</h3>
            <h2 className="text-center text-lg-start">Featured Listings</h2>
          </Col>
          <Col
            lg={6}
            className={`${styles.buttons} d-flex justify-content-center justify-content-lg-end align-items-center mt-3 m-lg-0`}
          >
            <button
              className={
                featuredIsActive === "New Cars"
                  ? `${styles.active} me-2 btn h-lg-50`
                  : "btn me-2 h-lg-50"
              }
              onClick={() => filterFeatures("New Cars")}
            >
              New
            </button>
            <button
              className={
                featuredIsActive === "Used Cars"
                  ? `${styles.active} me-2 btn h-lg-50`
                  : "btn me-2 h-lg-50"
              }
              onClick={() => filterFeatures("Used Cars")}
            >
              Used
            </button>
            <button
              className={
                featuredIsActive === "For Rent"
                  ? `${styles.active} btn h-lg-50`
                  : "btn h-lg-50"
              }
              onClick={() => filterFeatures("For Rent")}
            >
              Rent
            </button>
          </Col>
        </Row>
      </Container>
       <div className={`mt-3 ${styles.featureSection}`}>
        <Suspense fallback={<LoadingSpinner />}>
          <Await resolve={cars}>
            {(loadedCars) => (
              <Container className="">
                <Row className="">
                <AnimatePresence>
                  <motion.div className={`col-lg-6 d-none d-lg-block`}
                  initial={{opacity: 0, transition: "all 1.5s ease",transform: "translate3d(-100px,0,0)"}}
                  whileInView={{ opacity: 1, transition: "all 1.5s ease",transform: "translateZ(0)" }}
                  viewport={{ once: false }}
                  exit={{opacity: 0, transition: "all 1.5s ease",transform: "translate3d(-100px,0,0)"}}
                  >
                    <Card className="w-100 h-100 imgCard">
                      <div className="h-75 position-relative overflow-hidden">
                        <NavLink
                          to={`/cars/${
                            [...loadedCars].filter(
                              (car) => car.category === featuredIsActive
                            )[0].id
                          }`}
                          className=""
                        >
                          <Card.Img
                            variant="top"
                            src={
                              [...loadedCars].filter(
                                (car) => car.category === featuredIsActive
                              )[0].carImages[0]
                            }
                            alt="..."
                            className="mw-100 h-100 mh-100"
                          />
                        </NavLink>
                        <span className={styles.largeImagesNumber}>
                          <FaRegImages className="me-1" />
                          {
                            [...loadedCars].filter(
                              (car) => car.category === featuredIsActive
                            )[0].carImages.length
                          }
                        </span>
                        <span className={`${styles.largeFavorite}`}>
                          <MdFavorite
                            id={
                              [...loadedCars].filter(
                                (car) => car.category === featuredIsActive
                              )[0].id
                            }
                            className={
                              favorites?.filter((el) => {
                                return (
                                  el.id ===
                                  [...loadedCars].filter(
                                    (car) => car.category === featuredIsActive
                                  )[0].id
                                );
                              }).length > 0
                                ? styles.active
                                : ""
                            }
                            onClick={(e) =>
                              favoriteHandler(
                                [...loadedCars].filter(
                                  (car) => car.category === featuredIsActive
                                )[0]
                                // console.log(el)
                              )
                            }
                          />
                        </span>
                      </div>
                      <Card.Body className={`h-25 ${styles.carInfo}`}>
                        <NavLink
                          to={`/cars/${
                            [...loadedCars].filter(
                              (car) => car.category === featuredIsActive
                            )[0].id
                          }`}
                          className=""
                        >
                          <Card.Title className={`${styles.title} fs-4`}>
                            {
                              [...loadedCars].filter(
                                (car) => car.category === featuredIsActive
                              )[0].make
                            }{" "}
                            {
                              [...loadedCars].filter(
                                (car) => car.category === featuredIsActive
                              )[0].model
                            }{" "}
                            {
                              [...loadedCars].filter(
                                (car) => car.category === featuredIsActive
                              )[0].doors
                            }{" "}
                            {
                              [...loadedCars].filter(
                                (car) => car.category === featuredIsActive
                              )[0].type
                            }{" "}
                            {
                              [...loadedCars].filter(
                                (car) => car.category === featuredIsActive
                              )[0].color
                            }
                          </Card.Title>
                          <div>
                            <div className={`m-4 ${styles.splitHr}`}></div>
                            <ul className="list-unstyled d-flex justify-content-between align-items-center">
                              <li>
                                {
                                  [...loadedCars].filter(
                                    (car) => car.category === featuredIsActive
                                  )[0].year
                                }
                              </li>
                              <li className="fs-3">
                                {
                                  [...loadedCars].filter(
                                    (car) => car.category === featuredIsActive
                                  )[0].transmission
                                }
                              </li>
                              <li className="fs-3">
                                {
                                  [...loadedCars].filter(
                                    (car) => car.category === featuredIsActive
                                  )[0].fuelType
                                }
                              </li>
                              <li className={`fw-bold fs-3 ${styles.price}`}>
                                $
                                {
                                  [...loadedCars].filter(
                                    (car) => car.category === featuredIsActive
                                  )[0].price
                                }
                              </li>
                            </ul>
                          </div>
                        </NavLink>
                      </Card.Body>
                    </Card>
                  </motion.div >
                  </AnimatePresence>
                  <AnimatePresence>
                  <motion.div md={12} lg={6} 
                  // className={`${carsItemClass}`}
                  className="col-md-12 col-lg-6"
                  initial={{opacity: 0, transition: "all 1.5s ease",transform: "translate3d(-100px,0,0)"}}
                  whileInView={{ opacity: 1, transition: "all 1.5s ease",transform: "translateZ(0)" }}
                  viewport={{ once: false }}
                  exit={{opacity: 0, transition: "all 1.5s ease",transform: "translate3d(-100px,0,0)"}}
                  >
                    <Row className="gy-4">
                      {[...loadedCars]
                        .filter((car) => car.category === featuredIsActive)
                        .splice(1, 4)
                        .map((ele) => {
                          return (
                            <Col
                              md={6}
                              key={ele.id}
                              className={`${styles.small}`}
                            >
                              <Card className={`w-100 h-100 imgCard`}>
                                <div
                                  className={`position-relative overflow-hidden ${styles.smallImg}`}
                                >
                                  <NavLink
                                    to={`/cars/${ele.id}`}
                                    className="h-100"
                                  >
                                    <Card.Img
                                      variant="top"
                                      src={ele.carImages[0]}
                                      alt="..."
                                      className={`mw-100 h-100 mh-100`}
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
                                        favorites?.filter((el) => {
                                          return el.id === ele.id;
                                        }).length > 0
                                          ? styles.active
                                          : ""
                                      }
                                      onClick={(e) =>
                                         favoriteHandler(ele)
                                        // console.log(ele)
                                        }
                                    />
                                  </span>
                                </div>
                                <Card.Body
                                  className={`card-body ${styles.carInfo}`}
                                >
                                  <NavLink
                                    to={`/cars/${ele.id}`}
                                    className="h-100"
                                  >
                                    <Card.Title
                                      className={`${styles.title} text-center`}
                                    >
                                      {ele.make} {ele.model} {ele.type}
                                    </Card.Title>
                                    <div>
                                      <p
                                        className={`fw-bold fs-5 mb-0 text-center ${styles.price}`}
                                      >
                                        ${ele.price}
                                      </p>
                                      <div className={styles.splitHr}></div>
                                      <ul className="list-unstyled d-flex justify-content-between align-items-center">
                                        <li>{ele.year}</li>
                                        <li>{ele.transmission}</li>
                                        <li>{ele.fuelType}</li>
                                      </ul>
                                    </div>
                                  </NavLink>
                                </Card.Body>
                              </Card>
                            </Col>
                          );
                        })}
                    </Row>
                  </motion.div>
                  </AnimatePresence>
                </Row>

                <NavLink
                  to={
                    featuredIsActive === "For Rent"
                      ? "/cars/carsForRent"
                      : `/cars/carsForSale?type=${featuredIsActive.replace(
                          /\s/g,
                          "-"
                        )}`
                  }
                  className={`d-block mt-3 ${styles.viewBtnLink}`}
                >
                  <button className={`${styles.viewBtn} `}>
                    View{" "}
                    {
                      loadedCars.filter(
                        (ele) => ele.category === featuredIsActive
                      ).length
                    }{" "}
                    {featuredIsActive}
                  </button>
                </NavLink>
              </Container>
            )}
          </Await>
        </Suspense>
      </div>
       <div className={`py-3 ${styles.popularSection}`}>
        <Suspense fallback={<LoadingSpinner />}>
          <Await resolve={cars}>
            {(loadedCars) => (
              <Container className="py-5">
                <Row className={styles.heading}>
                  <Col lg={6} className="">
                    <h2 className="text-center text-lg-start">Popular Makes</h2>
                  </Col>
                  <Col
                    lg={6}
                    className={`${styles.buttons} d-flex justify-content-between  align-items-center mt-3 m-lg-0`}
                  >
                    <button
                      className={
                        popularIsActive === "Audi"
                          ? `${styles.active} me-2 btn h-lg-50`
                          : "btn me-2 h-lg-50"
                      }
                      onClick={() => filterPopular("Audi")}
                    >
                      Audi
                    </button>
                    <button
                      className={
                        popularIsActive === "BMW"
                          ? `${styles.active} me-2 btn h-lg-50`
                          : "btn me-2 h-lg-50"
                      }
                      onClick={() => filterPopular("BMW")}
                    >
                      BMW
                    </button>
                    <button
                      className={
                        popularIsActive === "Cadillac"
                          ? `${styles.active} me-2 btn h-lg-50`
                          : "btn me-2 h-lg-50"
                      }
                      onClick={() => filterPopular("Cadillac")}
                    >
                      Cadillac
                    </button>
                    <button
                      className={
                        popularIsActive === "Ferrari"
                          ? `${styles.active} me-2 btn h-lg-50`
                          : "btn me-2 h-lg-50"
                      }
                      onClick={() => filterPopular("Ferrari")}
                    >
                      Ferrari
                    </button>
                  </Col>
                </Row>
                <Row>
                  <Splide
                    className={` mt-5 ${styles.mySplide}`}
                    tag="section"
                    options={{
                      perPage: 4,
                      breakpoints: {
                        1200: {
                          perPage: 3,
                        },
                        992: {
                          perPage: 2,
                        },
                        768: {
                          perPage: 1,
                        },
                      },
                      pagination: false,
                      arrows: true,
                      drag: "free",
                      // rewind: true,
                      gap: "2rem",
                      autoplay: true,
                      pauseOnHover: true,
                      pauseOnFocus: true,
                      // height: "50vh",
                    }}
                    aria-label="My Favorite Images"
                  >
                    {[...loadedCars]
                      .filter((car) => {
                        return (
                          car.make === popularIsActive &&
                          car.category !== "For Rent"
                        );
                      })
                      .map((ele) => {
                        return (
                          <SplideSlide key={ele.id} className="h-100">
                            <Card className="imgCard h-100">
                              <div className="h-75 position-relative overflow-hidden">
                                <NavLink
                                  to={`/cars/${ele.id}`}
                                  className="h-100"
                                >
                                  <img
                                    className="w-100 mw-100 h-100 mh-100"
                                    variant="top"
                                    src={ele.carImages[0]}
                                    alt="..."
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
                                      favorites?.filter((el) => {
                                        return el.id === ele.id;
                                      }).length > 0
                                        ? styles.active
                                        : ""
                                    }
                                    onClick={(e) => favoriteHandler(ele)}
                                  />
                                </span>
                              </div>
                              <div
                                className={`card-body ${styles.splideInfo} text-center `}
                              >
                                <NavLink
                                  to={`/cars/${ele.id}`}
                                  className="h-100"
                                >
                                  <Card.Title
                                    className={`${styles.title} text-center`}
                                  >
                                    {ele.make} {ele.model} {ele.type}
                                  </Card.Title>
                                  <div>
                                    <p
                                      className={`fw-bold fs-5 mb-0 ${styles.price}`}
                                    >
                                      ${ele.price}
                                    </p>
                                    <div className={styles.splitHr}></div>
                                    {ele.status === "Used vehicle" && (
                                      <ul
                                        className={`list-unstyled d-flex justify-content-between align-items-center ${styles.splideUl}`}
                                      >
                                        <li>{ele.year}</li>
                                        <li>{`${ele.mileage} miles`}</li>
                                      </ul>
                                    )}
                                    {ele.status !== "Used vehicle" && (
                                      <ul
                                        className={`list-unstyled d-flex justify-content-between align-items-center ${styles.splideUl}`}
                                      >
                                        <li>{ele.year}</li>
                                        <li>{ele.transmission}</li>
                                        <li>{ele.fuelType}</li>
                                      </ul>
                                    )}
                                  </div>
                                </NavLink>
                              </div>
                            </Card>
                          </SplideSlide>
                        );
                      })}
                  </Splide>
                </Row>
                <NavLink
                  to={`/search/make=${popularIsActive}&price=allPrices`}
                  className={`d-block mt-3 ${styles.viewBtnLink}`}
                >
                  <button className={styles.viewBtn}>
                    View{" "}
                    {
                      loadedCars.filter(
                        (ele) =>
                          ele.make === popularIsActive
                      ).length
                    }{" "}
                    {popularIsActive}
                  </button>
                </NavLink>
              </Container>
            )}
          </Await>
        </Suspense>
      </div>
      <div className={`py-5 ${styles.chooseSection}`}>
        <h2 className="text-center py-5">Why choose us?</h2>
        <Container>
            <Row className="text-center justify-content-center overflow-hidden">
               <Col md={6} lg={4} className={`mt-3 mt-md-0 ${chooseUsItemClass}`} ref={chooseUsRef} >
                <div className={`mb-3 ${styles.icon}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="34"
                    viewBox="0 0 24 34"
                  >
                    <g id="medal" transform="translate(-71.962)">
                      <path
                        id="Path_20"
                        data-name="Path 20"
                        d="M89.3,23.828l1.527-2.523,2.755-.957.305-2.947,2.073-2.078-.985-2.789.985-2.79L93.889,7.666l-.305-2.947-2.755-.957L89.3,1.239l-2.888.355L83.962,0,81.509,1.594l-2.887-.355L77.1,3.762l-2.755.957-.305,2.947L71.962,9.744l.985,2.79-.985,2.79L74.035,17.4l.305,2.947,2.755.957,1.527,2.523,2.888-.355,2.453,1.594,2.453-1.594ZM75.523,12.534a8.441,8.441,0,1,1,16.879,0,8.441,8.441,0,1,1-16.879,0Z"
                        transform="translate(0 0)"
                        fill="#ff4605"
                      ></path>
                      <path
                        id="Path_21"
                        data-name="Path 21"
                        d="M163.072,89.333a6.6,6.6,0,1,0,6.482,6.6A6.55,6.55,0,0,0,163.072,89.333Z"
                        transform="translate(-79.11 -83.401)"
                        fill="#ff4605"
                      ></path>
                      <path
                        id="Path_22"
                        data-name="Path 22"
                        d="M89.039,345.326l-3.435.422-1.815-3-.617-.214-2.661,8.471,4.791-.268,3.748,3.051,2.206-7.021Z"
                        transform="translate(-7.992 -319.789)"
                        fill="#ff4605"
                      ></path>
                      <path
                        id="Path_23"
                        data-name="Path 23"
                        d="M274.168,342.749l-1.815,3-3.435-.422-2.217,1.441,2.206,7.021,3.748-3.051,4.791.268-2.661-8.471Z"
                        transform="translate(-182.041 -319.789)"
                        fill="#ff4605"
                      ></path>
                    </g>
                  </svg>
                </div>
                <h3>Wide range of brands</h3>
                <p>
                  We can help with your financing plan, we can offer some tips
                  and tricks. Drive off with this dream car of yours regardless
                  of your credit history.
                </p>
                </Col>
              <Col md={6} lg={4} className={`mt-3 mt-md-0 ${chooseUsItemClass}`} ref={chooseUsRef}>
                <div className={`mb-3 ${styles.icon}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="37.001"
                    height="32"
                    viewBox="0 0 37.001 32"
                  >
                    <g id="trust" transform="translate(0.001)">
                      <path
                        id="Path_271"
                        data-name="Path 271"
                        d="M243.168,1.072a1.084,1.084,0,0,0-2.168,0V5.665a1.084,1.084,0,0,0,2.168,0Zm0,0"
                        transform="translate(-223.585)"
                        fill="#49df0b"
                      ></path>
                      <path
                        id="Path_272"
                        data-name="Path 272"
                        d="M147.238,52.326a1.092,1.092,0,0,0,1.533,0,1.064,1.064,0,0,0,0-1.516l-2.322-2.3a1.092,1.092,0,0,0-1.533,0,1.064,1.064,0,0,0,0,1.516Zm0,0"
                        transform="translate(-134.149 -44.754)"
                        fill="#49df0b"
                      ></path>
                      <path
                        id="Path_273"
                        data-name="Path 273"
                        d="M306.35,52.64a1.086,1.086,0,0,0,.766-.314l2.322-2.3a1.064,1.064,0,0,0,0-1.516,1.092,1.092,0,0,0-1.533,0l-2.322,2.3a1.063,1.063,0,0,0,0,1.516,1.087,1.087,0,0,0,.766.314Zm0,0"
                        transform="translate(-283.206 -44.754)"
                        fill="#49df0b"
                      ></path>
                      <path
                        id="Path_274"
                        data-name="Path 274"
                        d="M15.364,141.319l-.032.027-4.687,3.973a2.418,2.418,0,0,1-1.562.571H5.727A5.693,5.693,0,0,0,0,151.554V161.89a1.078,1.078,0,0,0,1.084,1.072h9.288a1.078,1.078,0,0,0,1.084-1.072v-9.842l5.516-4.676a1.251,1.251,0,0,0,.444-.954V142.3a1.266,1.266,0,0,0-2.052-.983Zm0,0"
                        transform="translate(0 -130.962)"
                        fill="#49df0b"
                      ></path>
                      <path
                        id="Path_275"
                        data-name="Path 275"
                        d="M282.689,145.89h-3.357a2.417,2.417,0,0,1-1.562-.571l-4.687-3.973-.032-.027A1.266,1.266,0,0,0,271,142.3v4.116a1.251,1.251,0,0,0,.444.954l5.516,4.676v9.841a1.078,1.078,0,0,0,1.084,1.072h9.288a1.078,1.078,0,0,0,1.084-1.072V151.554a5.693,5.693,0,0,0-5.727-5.664Zm0,0"
                        transform="translate(-251.416 -130.962)"
                        fill="#49df0b"
                      ></path>
                      <path
                        id="Path_276"
                        data-name="Path 276"
                        d="M25.2,86.982A4.567,4.567,0,1,0,20.634,91.5,4.547,4.547,0,0,0,25.2,86.982Zm0,0"
                        transform="translate(-14.906 -76.571)"
                        fill="#49df0b"
                      ></path>
                      <path
                        id="Path_277"
                        data-name="Path 277"
                        d="M378.67,86.982A4.567,4.567,0,1,0,374.1,91.5,4.547,4.547,0,0,0,378.67,86.982Zm0,0"
                        transform="translate(-342.831 -76.571)"
                        fill="#49df0b"
                      ></path>
                    </g>
                  </svg>
                </div>
                <h3>Trusted by our clients</h3>
                <p>
                  We can help with your financing plan, we can offer some tips
                  and tricks. Drive off with this dream car of yours regardless
                  of your credit history.
                </p>
              </Col>
              <Col md={6} lg={4} className={`mt-3 mt-md-0 ${chooseUsItemClass}`} ref={chooseUsRef}>
                <div className={`mb-3 ${styles.icon}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="44.654"
                    viewBox="0 0 28 44.654"
                  >
                    <g id="money2" transform="translate(-91.358)">
                      <g
                        id="Group_568"
                        data-name="Group 568"
                        transform="translate(91.358)"
                      >
                        <g
                          id="Group_564"
                          data-name="Group 564"
                          transform="translate(0)"
                        >
                          <path
                            id="Path_288"
                            data-name="Path 288"
                            d="M118.257,24.848c-.5-.392-5.733-6.2-7.146-7.019V2.762A2.76,2.76,0,0,0,108.348,0H94.12a2.76,2.76,0,0,0-2.762,2.762V29.141A2.76,2.76,0,0,0,94.12,31.9h6.2l-.255-2.169c-.082-.073-.137-.118-.219-.191H97.11a2.8,2.8,0,0,0-3.4-3.409V5.6a3.126,3.126,0,0,0,.51.046,2.8,2.8,0,0,0,2.8-2.8,3,3,0,0,0-.046-.492h8.5a3,3,0,0,0-.046.492,2.793,2.793,0,0,0,2.8,2.8,3.126,3.126,0,0,0,.51-.046V25.641h0V31.4a10.463,10.463,0,0,1-2.042-2.935s-.529-5.916-3.528-5.916a2.059,2.059,0,0,0-.237.009s-2.27.191-.392,6.681l.839,7.21a16.375,16.375,0,0,0,3.528,6.618v.8a.784.784,0,0,0,.784.784h8.431a.78.78,0,0,0,.775-.693c.3-2.807,1.468-13.244,2.151-14.83a2.992,2.992,0,0,0,.237-.784A3.6,3.6,0,0,0,118.257,24.848Z"
                            transform="translate(-91.358 0)"
                            fill="#0575ff"
                          ></path>
                        </g>
                        <g
                          id="Group_565"
                          data-name="Group 565"
                          transform="translate(8.504 5.642)"
                        >
                          <circle
                            id="Ellipse_125"
                            data-name="Ellipse 125"
                            cx="1.677"
                            cy="1.677"
                            r="1.677"
                            fill="#0575ff"
                          ></circle>
                        </g>
                        <path
                          id="Union_22"
                          data-name="Union 22"
                          d="M-16320,20218.059a6.054,6.054,0,0,1,6.055-6.059,6.063,6.063,0,0,1,6.061,6.059,6.066,6.066,0,0,1-1.913,4.422,4.662,4.662,0,0,0-2.2-.543,3.734,3.734,0,0,0-.492.025,3.5,3.5,0,0,0-2.518,1.578,4.23,4.23,0,0,0-.264.436A6.072,6.072,0,0,1-16320,20218.059Z"
                          transform="translate(16323.819 -20201.918)"
                          fill="#0575ff"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <h3>Fast & easy financing</h3>
                <p>
                  We can help with your financing plan, we can offer some tips
                  and tricks. Drive off with this dream car of yours regardless
                  of your credit history.
                </p>
              </Col>
            </Row>
          {/* </motion.div> */}
        </Container>
      </div>
      {teamData.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <div className={`py-5 ${styles.teamSection}`}>
          <Container className={styles.teamContainer}>
            <Row>
              <Col
                md={6}
                lg={4}
                className="d-flex flex-column justify-content-evenly align-items-center mb-5"
              >
                <h2>Our team</h2>
                <ul className={`list-unstyled ${styles.firstUl}`}>
                  <li>
                    <AiFillCheckCircle className="me-3" />
                    Praesent nibh luctus viverra
                  </li>
                  <li>
                    <AiFillCheckCircle className="me-3" />
                    Adipiscing elit
                  </li>
                  <li>
                    <AiFillCheckCircle className="me-3" />
                    Tempor incididunt ut labore
                  </li>
                  <li>
                    <AiFillCheckCircle className="me-3" />
                    Quis ipsum suspendisseviverra
                  </li>
                  <li>
                    <AiFillCheckCircle className="me-3" />
                    Maecenas ac
                  </li>
                </ul>

                <NavLink to={"/about"} className="">
                  <button className={` ${styles.myButton}`}>Learn more</button>
                </NavLink>
              </Col>
              <Col md={6} lg={8} className="">
                <Splide
                  className={` mt-0 ${styles.teamSplide} d-flex align-items-center justify-content-center`}
                  tag="section"
                  options={{
                    perPage: 3,
                    breakpoints: {
                      1200: {
                        perPage: 2,
                      },
                      992: {
                        perPage: 1,
                      },
                      768: {
                        perPage: 1,
                      },
                    },
                    pagination: false,
                    arrows: true,
                    drag: "free",
                    // rewind: true,
                    gap: "2rem",
                    autoplay: true,
                    pauseOnHover: true,
                    pauseOnFocus: true,

                    // height: "50vh",
                  }}
                  aria-label="My Favorite Images"
                >
                  {teamData.map((ele) => {
                    return (
                      <SplideSlide key={ele.id} className="imgCard h-100">
                        <Card className={`h-100 ${styles.teamCard}`}>
                          <div className="h-75 position-relative overflow-hidden">
                            <img
                              className="w-100 mw-100 h-100 mh-100"
                              variant="top"
                              src={ele.images[0]}
                              alt="..."
                            />
                          </div>
                          <div className={`card-body ${styles.cardBody}  `}>
                            <Card.Title className={styles.title}>
                              {ele.name}
                            </Card.Title>
                            <div>
                              <p className={``}>{ele.role}</p>
                              <div className={styles.splitHr}></div>
                              <p>{ele.email}</p>
                              <p>
                                {ele.phone
                                  .replace(/\D+/g, "")
                                  .replace(
                                    /(\d{1})(\d{3})(\d{3})(\d{4})/,
                                    "($2) $3-$4"
                                  )}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </SplideSlide>
                    );
                  })}
                </Splide>
              </Col>
            </Row>
          </Container>
        </div>
      )}
      <div className={`pt-5 pb-3 ${styles.howSection}`}>
        <Container>
          <Row className="overflow-hidden">
            <Col lg={6} ref={howTOBuyRef} className={howToBuyItemClass}>
              <div className={`d-flex ${styles.downloadCard}`}>
                <div className={styles.firstDiv}>
                  <h2>Download our app</h2>
                  <button className="d-block mb-2 mt-2 mt-md-5 mx-auto">
                    <AiFillApple className="me-2" />
                    For iOS
                  </button>
                  <button className="d-block mx-auto mb-3 mb-md-0">
                    <FaGooglePlay className="me-2" />
                    For Android
                  </button>
                </div>
                <div
                  className={`w-100 mb-lg-3 ${styles.secondDiv} text-center`}
                >
                  <img src={downloadAppImg} alt="..." className="mw-100"></img>
                </div>
              </div>
            </Col>
            <Col lg={6} className={howToBuyItemClass} ref={howTOBuyRef}>
              <div className={`d-flex ${styles.howCard} py-5`}>
                <div className={styles.firstDiv}>
                  <h2>How to buy a car?</h2>

                  <button className={`mt-5 ${styles.myButton}`}>
                    Read more
                  </button>
                </div>
                <div className={styles.secondDiv}>
                  <ul className={`list-unstyled `}>
                    <li>
                      <AiFillCheckCircle className="me-3" />
                      best deals
                    </li>
                    <li>
                      <AiFillCheckCircle className="me-3" />
                      sell your car
                    </li>
                    <li>
                      <AiFillCheckCircle className="me-3" />
                      car book values
                    </li>
                    <li>
                      <AiFillCheckCircle className="me-3" />
                      car dealers
                    </li>
                    <li>
                      <AiFillCheckCircle className="me-3" />
                      compare prices
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
          <div className={`mt-5 ${styles.splitHr}`}></div>
          <Row className={` ${styles.subscribe}`}>
            <Col md={6} xl={3} className="order-0">
              <h3>Newsletter</h3>
            </Col>
            <Col md={6} xl={6} className="order-3 order-lg-1">
              <form>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="me-2"
                ></input>
                <button className={styles.myButton} type="submit">
                  Subscribe
                </button>
              </form>
            </Col>
            <Col md={6} xl={3} className="order-2 mb-3 mb-lg-0">
              Subscribe to our newsletter and stay updated with our offers
            </Col>
          </Row>
        </Container>
      </div>
      {/* <Brands /> */}
    </Fragment>
  );
};
export default Home;
//////////////////
//const { isLoading, error, requestFn } = useHttp();
/////getCars///
// const getCars = `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`;
// const [cars, setCars] = useState([]);
// useEffect(() => {
//   const transformData = (data) => {
//     let loadedCars = [];
//     Object.entries(data).map((ele) => {
//       loadedCars.push(ele[1]);
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
// const carsData = useMemo(() => cars, [cars]);
/////getTeam///
// const getTeam = `https://cars-3a440-default-rtdb.firebaseio.com/team.json`;
// const [team, setTeam] = useState([]);
// useEffect(() => {
//   const transformData = (data) => {
//     let loadedTeam = [];
//     Object.entries(data).map((ele) => {
//       loadedTeam.push(ele[1]);
//     });
//     setTeam(loadedTeam);
//   };
//   requestFn(
//     {
//       url: getTeam,
//     },
//     transformData
//   );
// }, [requestFn, getTeam]);
// const teamData = useMemo(() => team, [team]);
////////
