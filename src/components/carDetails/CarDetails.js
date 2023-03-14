import React, { useEffect, useRef, useState } from "react";
import {
  json,
  useLoaderData,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import useHttp from "../../hook/use-http";
import styles from "./CarDetails.module.css";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { MdLocationOn } from "react-icons/md";
import { BiEnvelope } from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaRegImages } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import LoadingSpinner from "../loading/LoadingSpinner";
import emailjs from "@emailjs/browser";
const CarDetails = () => {
  const { isLoading, error, requestFn } = useHttp();
  const { carId } = useParams();
  ///loader ///
  const car = useRouteLoaderData("car-details");
  /////////////
  /////getSellerInfo///
  const getSeller = `https://cars-3a440-default-rtdb.firebaseio.com/users.json`;
  const [seller, setSeller] = useState(null);
  useEffect(() => {
    const transformData = (data) => {
      Object.entries(data).map((ele) => {
        if (ele[1].id === car.uId) {
          setSeller(ele[1]);
        }
      });
    };
    requestFn(
      {
        url: getSeller,
      },
      transformData
    );
  }, [requestFn, getSeller, car.uId]);
  ////
  const [slideContent, setSlideContent] = useState(0);
  const changeSlideHandler = (slideId) => {
    setSlideContent(slideId);
  };
  const [subject, setSubject] = useState("check availability");
  const subjectChangeHandler = (e) => {
    setSubject(e.target.value);
  };
  const form = useRef(null);
  let name = form.current?.elements[0].value;
  let email = form.current?.elements[1].value;
  let phone = form.current?.elements[2].value;
  const contactInputs = [
    {
      label: "Name",
      type: "text",
      name: "name",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
    },
    {
      label: "Phone",
      type: "text",
      name: "phone",
    },
  ];

  let formValid = false;
  if (name && email && phone) {
    formValid = true;
  }
  const [sendingResult, setSendingResult] = useState();
  const submitHandler = (e) => {
    // Email.send({
    // })
    e.preventDefault();
    emailjs
      .sendForm(
        "service_7byb69n",
        "template_4h7g4tk",
        form.current,
        // params
        "m-6b_jqWhc45hniXH"
      )
      .then(
        (result) => {
          setSendingResult("Your message has been sent");
        },
        (error) => {
          setSendingResult("error");
        }
      );
    form.current.elements[0].value = "";
    form.current.elements[1].value = "";
    form.current.elements[2].value = "";
  };
  return (
    <div className={`${styles.carsDetails} mt-5`}>
      {car === null ? (
        <LoadingSpinner />
      ) : (
        <Container>
          <Row className={`${styles.firstRow} `}>
            <Col lg={8} className="">
              <div className={`${styles.mainImage}`}>
                <Carousel
                  className=""
                  fade={true}
                  controls={true}
                  indicators={false}
                  activeIndex={slideContent}
                  onSelect={changeSlideHandler}
                >
                  {car.carImages.map((ele, index) => {
                    return (
                      (
                        <Carousel.Item key={index} className="">
                          <img className="w-100 " src={ele} alt="..." />
                        </Carousel.Item>
                      ) || <Skeleton className="w-50" />
                    );
                  })}
                </Carousel>
                <span className={styles.slideNumber}>
                  <FaRegImages className="me-2" /> {slideContent + 1} /{" "}
                  {car.carImages.length}
                </span>
              </div>

              <div className={`d-none d-lg-block ${styles.images}`}>
                <Splide
                  className={` mt-5  ${styles.mySplide}`}
                  tag="section"
                  options={{
                    type: "loop",
                    perPage: 4,
                    breakpoints: {
                      1200: {
                        perPage: 3,
                      },
                      992: {
                        perPage: 2,
                      },
                      768: {
                        perPage: 2,
                      },
                    },
                    pagination: false,
                    arrows: true,
                    drag: "free",
                    // rewind: true,
                    gap: "1rem",
                    autoplay: true,
                    pauseOnHover: true,
                    pauseOnFocus: true,
                    // perMove: 1,
                    preloadPages: 3,
                    // start: 4,
                    // height: "50vh",
                  }}
                  aria-label="My Favorite Images"
                >
                  {car.carImages.map((ele, index) => {
                    return (
                      <SplideSlide
                        key={index}
                        id={index}
                        onClick={() => changeSlideHandler(index)}
                      >
                        <Card
                          className={
                            slideContent === index
                              ? ` h-100 ${styles.active} ${styles.card}`
                              : `h-100 ${styles.card}`
                          }
                        >
                          <img
                            className="w-100 mw-100 h-100 mh-100"
                            variant="top"
                            src={ele}
                            alt="..."
                          />
                        </Card>
                      </SplideSlide>
                    );
                  })}
                </Splide>
              </div>
            </Col>

            <Col lg={4} className=" top-0  ">
              <h2 className="fs-2 mt-3 mt-lg-0 text-center ">
                {car.make} {car.model} {car.type || <Skeleton />}
              </h2>
              <h3 className={`${styles.price} text-center`}>
                ${car.price || <Skeleton className="w-50" />}
                {car.category === "For Rent" && " / day"}
              </h3>
              <ul className={`${styles.carInfo} list-unstyled`}>
                <li>
                  <span className="w-50 d-inline-block">Make:</span>
                  {car.make || <Skeleton className="w-50" />}
                </li>
                <li>
                  <span className="w-50 d-inline-block">Model:</span>
                  {car.model || <Skeleton className="w-50" />}
                </li>
                <li>
                  <span className="w-50 d-inline-block">Type:</span>
                  {car.type || <Skeleton className="w-50" />}
                </li>
                <li>
                  <span className="w-50 d-inline-block">Color:</span>
                  {car.color || <Skeleton className="w-50" />}
                </li>
                <li>
                  <span className="w-50 d-inline-block">Drive Type:</span>
                  {car.driveType || <Skeleton className="w-50" />}
                </li>
                <li>
                  <span className="w-50 d-inline-block">Status:</span>
                  {car.status || <Skeleton className="w-50" />}
                </li>
                {car.category === "Used Cars" && (
                  <li>
                    <span className="w-50 d-inline-block">Mileage:</span>
                    {car.mileage || <Skeleton className="w-50" />} mile
                  </li>
                )}
                <li>
                  <span className="w-50 d-inline-block">Year:</span>
                  {car.year || <Skeleton className="w-50" />}
                </li>
                <li>
                  <span className="w-50 d-inline-block">Transmission:</span>
                  {car.transmission || <Skeleton className="w-50" />}
                </li>
                <li>
                  <span className="w-50 d-inline-block">Fuel Type:</span>
                  {car.fuelType || <Skeleton className="w-50" />}
                </li>
                <li>
                  <span className="w-50 d-inline-block">Engine Size:</span>
                  {car.engine || <Skeleton className="w-50" />}L
                </li>
                <li>
                  <span className="w-50 d-inline-block">Doors:</span>
                  {car.doors || <Skeleton className="w-50" />}
                </li>
                <li>
                  <span className="w-50 d-inline-block">Cylinders:</span>
                  {car.cylinders || <Skeleton className="w-50" />}
                </li>
                <li>
                  <span className="w-50 d-inline-block">Category:</span>
                  {car.category || <Skeleton className="w-50" />}
                </li>
                <li>
                  <span className="w-50 d-inline-block">Added Date:</span>
                  {car.addedDate || <Skeleton className="w-50" />}
                </li>
              </ul>
            </Col>
          </Row>

          <div className={`${styles.description} mb-5 mt-0`}>
            <h3 className="mb-3 mw-100">Description</h3>
            <p>{car.description}</p>
          </div>
          <Row className="mb-5">
            <Col lg={6}>
              <div className={styles.features}>
                <h3 className="mb-3 mw-100 ">Features</h3>
                <ul className="d-flex w-100 flex-wrap p-0 ps-4 m-0 w-100 mw-100 justify-content-between list-unstyled">
                  {car.features.map((ele, index) => {
                    return (
                      <li key={index} className="w-50 my-1 ">
                        <span className="me-2"></span>
                        {ele}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Col>
            <Col lg={6}>
              <div className={`${styles.safetyFeatures} mt-5 mt-lg-0`}>
                <h3 className="mb-3 mw-100">Safety Features</h3>
                <ul className="d-flex w-100 ps-2 flex-wrap p-0 m-0 list-unstyled justify-content-between ">
                  {car.safetyFeatures.map((ele, index) => {
                    return (
                      <li key={index} className="w-50 my-1">
                        <AiOutlineCheckCircle className="me-2" /> {ele}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      )}
      <div className={styles.contact}>
        <Container>
          <Row className="contactSeller">
            <h3 className="mb-4">Contact Seller</h3>
            <Col lg={8} className="mb-4 mb-lg-0">
              <div className={styles.contactSeller}>
                <form onSubmit={submitHandler} className="w-100" ref={form}>
                  <Row>
                    {contactInputs.map((input) => {
                      return (
                        <Col md={4} key={input.label} className="mb-3 mb-md-1">
                          <input
                            type={input.type}
                            name={input.name}
                            className="w-100"
                            // value={input.value}
                            placeholder={input.label}
                          />
                        </Col>
                      );
                    })}
                  </Row>

                  <div className={styles.selectDiv}>
                    <label htmlFor="subject">Subject</label>
                    <select
                      name="subject"
                      id="subject"
                      onChange={subjectChangeHandler}
                      required
                    >
                      <option value="check availability">
                        Check availability
                      </option>
                      <option value="get a price quote">
                        Get a price quote
                      </option>
                      <option value="schedule a test drive">
                        Schedule a test drive
                      </option>
                      <option value="discuss financing">
                        Discuss financing
                      </option>
                      <option value="ask a question">Ask a question</option>
                    </select>
                  </div>
                  <div className={styles.selectDiv}>
                    <label htmlFor="message">Message</label>
                    <textarea
                      name="message"
                      defaultValue={
                        car !== null
                          ? `I'd like to ${subject} about the ${car.year} ${car.make} ${car.model} you have listed on YourCar.com for $${car.price}`
                          : ""
                      }
                    />
                  </div>
                  <button onClick={submitHandler}>Send</button>
                  {sendingResult && (
                    <p className="text-center mt-2 py-1">{sendingResult}</p>
                  )}
                </form>
              </div>
            </Col>
            <Col lg={4}>
              {seller === null ? (
                <LoadingSpinner />
              ) : (
                <div className={`${styles.sellerInfo}  pt-3`}>
                  <h4 className="text-center">{seller.name}</h4>
                  <p className={styles.role}>{seller.type}</p>
                  <p className="fs-5 text-center">
                    <MdLocationOn className="me-2" />
                    {seller.address}
                  </p>
                  <hr></hr>
                  <p className="fs-5 text-center">
                    <BiEnvelope className="me-2" />
                    {seller.email}
                  </p>
                  <p className="fs-5 text-center">
                    <BsFillTelephoneFill className="me-2" />
                    {seller.phone}
                  </p>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default CarDetails;
///
export const carDetailsLoader = async ({ request, params }) => {
  const id = params.carId;
  const response = await fetch(
    `https://cars-3a440-default-rtdb.firebaseio.com/cars/${id}.json`
  );
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected car." },
      { status: 500 }
    );
  } else {
    const responseData = await response.json();
    return responseData;
  }
};
////////////
/////getCarDetails///
// const getCar = `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`;
// const [car, setCar] = useState(null);
// useEffect(() => {
//   const transformData = (data) => {
//     Object.entries(data).map((ele) => {
//       if (ele[1].id === carId) {
//         setCar(ele[1]);
//       }
//     });
//   };
//   requestFn(
//     {
//       url: getCar,
//     },
//     transformData
//   );
// }, [requestFn, getCar, carId]);
