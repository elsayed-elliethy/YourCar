import styles from "./Header.module.css";
import firstImgSlide from "../../assets/slid11.jpg";
import secondImgSlide from "../../assets/slid33.jpg";
import thirdImgSlide from "../../assets/slid222.jpg";
import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { FaSearch } from "react-icons/fa";
import homeVideo from "../../assets/videos/home-video.mp4";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

///
// const Header = () => {
//   const [index, setIndex] = useState(0);
//   const handleSelect = (selectedIndex, e) => {
//     setIndex(selectedIndex);
//   };
//   return (
//     <div>
//       <Carousel activeIndex={index} onSelect={handleSelect}>
//         <Carousel.Item className={styles["slider"]}>
//           <img
//             className="d-block w-100"
//             src={firstImgSlide}
//             alt="First slide"
//           />
//           <Carousel.Caption className={styles["slider-caption"]}>
//             <h2 className="h21">Find Your Dream Car ... !</h2>
//             <p>
//               It is easy to get a dream car, but not at the right price, but we
//               have what you want from the cars and the right prices
//             </p>
//           </Carousel.Caption>
//         </Carousel.Item>
//         <Carousel.Item className={styles["slider"]}>
//           <img
//             className="d-block w-100"
//             src={secondImgSlide}
//             alt="Second slide"
//           />

//           <Carousel.Caption className={styles["slider-caption"]}>
//             <h2 className="h21">Own a Car with Low Price </h2>
//             <p>
//               Own your new car now, have a look at our cars and choose your
//               favorite type , with the right price. Contact us when you need
//               help.
//             </p>
//           </Carousel.Caption>
//         </Carousel.Item>
//         <Carousel.Item className={styles["slider"]}>
//           <img
//             className="d-block w-100"
//             src={thirdImgSlide}
//             alt="Third slide"
//           />
//           <Carousel.Caption className={styles["slider-caption"]}>
//             <h2 className="h21"> Rent a Car with Low Price </h2>
//             <p>
//               Take a look at our cars and choose your favorite type for rent at
//               the right price. contact us when you need help.
//             </p>
//           </Carousel.Caption>
//         </Carousel.Item>
//       </Carousel>
//     </div>
//   );
// };

// export default Header;
//
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
const Header = () => {
  const navigation = useNavigate();
  /////////
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: "#000",
      background: state.isSelected ? "#ff4605" : "#fff",
    }),
    control: () => ({
      display: "flex",
      padding: "0.1rem 0.5rem",
      textAlign: "left",
      borderRadius: "10px",
      color: "blue",
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: 5,
      borderwidth: 10,
      borderRadius: "10px",
      fontSize: 17,
      maxHeight: "250px",
      overflow: "hidden",
      // overflowY: "auto",
      opacity: 1,
      transition: "all 1s ease-in-out",
      visibility: "visible",
    }),
  };

  //////////
  const makeOptions = [
    { value: "Audi", label: "Audi" },
    { value: "Bentley", label: "Bentley" },
    { value: "BMW", label: "BMW" },
    { value: "Cadillac", label: "Cadillac" },
    { value: "Chevrolet", label: "Chevrolet" },
    { value: "Ferrari", label: "Ferrari" },
    { value: "Ford", label: "Ford" },
    { value: "Mercedes-Benz", label: "Mercedes-Benz" },
    { value: "Porsche", label: "Porsche" },
    { value: "Ford", label: "Ford" },
  ];
  const briceOptions = [
    { value: "15000", label: "$15000" },
    { value: "30000", label: "$30000" },
    { value: "50000", label: "$50000" },
    { value: "100000", label: "$100000" },
    { value: "200000", label: "$200000" },
  ];
  const [enteredMake, setEnteredMake] = useState("allMakes");
  const [enteredPrice, setEnteredPrice] = useState("allPrices");
  const makeChangeHandler = (searchMake) => {
    setEnteredMake(searchMake);
  };
  const priceChangeHandler = (searchPrice) => {
    setEnteredPrice(searchPrice);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    navigation(`/search/make=${enteredMake}&price=${enteredPrice}`);
  };

  return (
    <div className={styles.header}>
      {/* <!-- The video --> autoPlay*/}
      <video
        autoPlay
        muted
        loop
        poster="../../assets/videos/vehica-video-poster.jpg"
        id="myVideo"
        className=""
      >
        <source src={homeVideo} type="video/mp4" />
      </video>

      {/* <!-- Optional: some overlay text to describe the video --> */}
      <div className={styles.content}>
        <h1>
          Find Your <span>Perfect</span> Car
        </h1>
        <div
          className={`d-flex flex-column w-100 justify-content-between ${styles.searchContainer} flex-lg-row`}
        >
          <Select
            options={makeOptions}
            className={styles.select}
            onChange={(e) => makeChangeHandler(e.value)}
            styles={customStyles}
            defaultValue={{ value: "AllMakes", label: "AllMakes" }}
            components={{
              Menu: (props) => (
                <animatedComponents.Menu {...props} className={styles.menu} />
              ),
            }}
          />
          <Select
            options={briceOptions}
            className={styles.select}
            onChange={(e) => priceChangeHandler(e.value)}
            styles={customStyles}
            defaultValue={{ value: "Max price", label: "Max Price" }}
            components={{
              Menu: (props) => (
                <animatedComponents.Menu {...props} className={styles.menu} />
              ),
            }}
          />
          <button
            className={styles.iconDiv}
            onClick={submitHandler}
            disabled={enteredMake === ""}
          >
            <div className="d-flex justify-content-center align-items-center">
              <span className="me-2  d-lg-none">Search</span>
              <FaSearch className="" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
