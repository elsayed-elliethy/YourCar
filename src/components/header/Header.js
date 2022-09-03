import styles from "./Header.module.css";
import firstImgSlide from "../../assets/slid11.jpg";
import secondImgSlide from "../../assets/slid33.jpg";
import thirdImgSlide from "../../assets/slid222.jpg";
import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
const Header = () => {
  // return (
  //   <div>
  //     <div
  //       id="carouselExampleFade"
  //       className={`carousel slide carousel-fade ${styles["slider-index1"]}`}
  //       data-ride="carousel"
  //     >
  //       <div className="carousel-inner1">
  //         <div className={`carousel-item active ${styles["slider-index1"]}`}>
  //           <img
  //             src={firstImgSlide}
  //             className="d-block w-100"
  //             data-ride="carousel"
  //           />
  //           <h2 className="h21">Find Your Dream Car ... !</h2>
  //           <p>
  //             It is easy to get a dream car, but not at the right price, but we
  //             have what you want from the cars and the right prices
  //           </p>
  //         </div>
  //         <div className={`carousel-item ${styles["slider-index1"]}`}>
  //           <img
  //             src={secondImgSlide}
  //             className="d-block w-100"
  //             data-ride="carousel"
  //           />
  //           <h2 className="h21">Own a Car with Low Price </h2>
  //           <p>
  //             Own your new car now, have a look at our cars and choose your
  //             favorite type , with the right price. Contact us when you need
  //             help.
  //           </p>
  //         </div>
  //         <div className={`carousel-item ${styles["slider-index1"]}`}>
  //           <img
  //             src={thirdImgSlide}
  //             className="d-block w-100"
  //             data-ride="carousel"
  //           />
  //           <h2 className="h21"> Rent a Car with Low Price </h2>

  //           <p>
  //             Take a look at our cars and choose your favorite type for rent at
  //             the right price. contact us when you need help.
  //           </p>
  //         </div>

  //         <a
  //           className="carousel-control-prev"
  //           href="#carouselExampleFade"
  //           role="button"
  //           data-slide="prev"
  //         >
  //           <span
  //             className="carousel-control-prev-icon"
  //             aria-hidden="true"
  //           ></span>
  //           <span className="sr-only">Previous</span>
  //         </a>
  //         <a
  //           className="carousel-control-next"
  //           href="#carouselExampleFade"
  //           role="button"
  //           data-slide="next"
  //         >
  //           <span
  //             className="carousel-control-next-icon"
  //             aria-hidden="true"
  //           ></span>
  //           {/* <span className="sr-only">Next</span> */}
  //         </a>
  //       </div>
  //     </div>
  //   </div>
  // );
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item className={styles["slider"]}>
          <img
            className="d-block w-100"
            src={firstImgSlide}
            alt="First slide"
          />
          <Carousel.Caption className={styles["slider-caption"]}>
            <h2 className="h21">Find Your Dream Car ... !</h2>
            <p>
              It is easy to get a dream car, but not at the right price, but we
              have what you want from the cars and the right prices
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={styles["slider"]}>
          <img
            className="d-block w-100"
            src={secondImgSlide}
            alt="Second slide"
          />

          <Carousel.Caption className={styles["slider-caption"]}>
            <h2 className="h21">Own a Car with Low Price </h2>
            <p>
              Own your new car now, have a look at our cars and choose your
              favorite type , with the right price. Contact us when you need
              help.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={styles["slider"]}>
          <img
            className="d-block w-100"
            src={thirdImgSlide}
            alt="Third slide"
          />
          <Carousel.Caption className={styles["slider-caption"]}>
            <h2 className="h21"> Rent a Car with Low Price </h2>
            <p>
              Take a look at our cars and choose your favorite type for rent at
              the right price. contact us when you need help.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Header;
