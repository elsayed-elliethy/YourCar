import React, { Fragment, useEffect, useState } from "react";
import useHttp from "../../hook/use-http";
import { storage, auth } from "../../firebaseConfig";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import styles from "./sellYourCar.module.css";
import { BsFillImageFill } from "react-icons/bs";
import useInput2 from "../../hook/use-input";
import useInputFile from "../../hook/use-inputFIle";
import LoadingSpinner from "../loading/LoadingSpinner";
import LoadingIndicator from "../loading/LoadingIndicator";

///valid consitions///

const isEmpyt = (value) => {
  return value.trim().length !== 0;
};
const isNumber = (value) => {
  return isNaN(value) === false && value.trim().length !== 0;
};
const isSelected = (value) => {
  return value !== "";
};
const isImages = (value) => {
  return value.length === 3;
};

const SellYourCar = () => {
  const token = useSelector((state) => {
    return state.auth.token;
  });

  //////////form validation//////////
  const {
    enteredvalue: enteredBrand,
    inputValid: brandValid,
    inputInvalid: brandInvalid,
    inputChangeHandler: brandChangeHandler,
    inputBlurHandler: brandBlurHandler,
    reset: resetBrand,
  } = useInput2(isEmpyt);
  const {
    enteredvalue: enteredModel,
    inputValid: modelValid,
    inputInvalid: modelInvalid,
    inputChangeHandler: modelChangeHandler,
    inputBlurHandler: modelBlurHandler,
    reset: resetModel,
  } = useInput2(isEmpyt);
  const {
    enteredvalue: enteredPrice,
    inputValid: priceValid,
    inputInvalid: priceInvalid,
    inputChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPrice,
    inputClasses: priceCalsses,
  } = useInput2(isNumber);
  const {
    enteredvalue: enteredCountry,
    inputValid: countryValid,
    inputInvalid: countryInvalid,
    inputChangeHandler: countryChangeHandler,
    inputBlurHandler: countryBlurHandler,
    reset: resetCountry,
  } = useInput2(isEmpyt);
  const {
    enteredvalue: enteredColor,
    inputValid: colorValid,
    inputInvalid: colorInvalid,
    inputChangeHandler: colorChangeHandler,
    inputBlurHandler: colorBlurHandler,
    reset: resetColor,
  } = useInput2(isEmpyt);
  const {
    enteredvalue: enteredStatus,
    inputValid: statusValid,
    inputInvalid: statusInvalid,
    inputChangeHandler: statusChangeHandler,
    inputBlurHandler: statusBlurHandler,
    reset: resetStatus,
  } = useInput2(isSelected);
  const {
    enteredvalue: enteredFuel,
    inputValid: fuelValid,
    inputInvalid: fuelInvalid,
    inputChangeHandler: fuelChangeHandler,
    inputBlurHandler: fuelBlurHandler,
    reset: resetFuel,
  } = useInput2(isSelected);
  const {
    enteredvalue: enteredGearbox,
    inputValid: gearboxValid,
    inputInvalid: gearboxInvalid,
    inputChangeHandler: gearboxChangeHandler,
    inputBlurHandler: gearboxBlurHandler,
    reset: resetGearbox,
  } = useInput2(isSelected);
  const {
    enteredvalue: enteredCategory,
    inputValid: categoryValid,
    inputInvalid: categoryInvalid,
    inputChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
    reset: resetCategory,
  } = useInput2(isSelected);
  const {
    enteredvalue: enteredFirstRig,
    inputValid: firstRigValid,
    inputInvalid: firstRigInvalid,
    inputChangeHandler: firstRigChangeHandler,
    inputBlurHandler: firstRigBlurHandler,
    reset: resetFirstRig,
  } = useInput2(isSelected);
  const {
    enteredImages: enteredImagesArray,
    fileValid: imagesValid,
    fileInvalid: imagesInvalid,
    fileChangeHandler: imagesChangeHandler,
    // fileBlurHandler: imagesBlurHandler,
    resetFile: resetImages,
  } = useInputFile(isImages);

  let formValid = false;
  if (
    brandValid &&
    modelValid &&
    priceValid &&
    countryValid &&
    colorValid &&
    statusValid &&
    fuelValid &&
    gearboxValid &&
    categoryValid &&
    firstRigValid &&
    imagesValid
  ) {
    formValid = true;
  }
  ////////////////////
  const apiKey = "AIzaSyDai1GcLEq1Gfe84Bz-atCmrCvKTc9pJK8";
  const addCar = `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`;
  const userApi = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`;

  const { isLoading, error, requestFn } = useHttp();
  // const [imgArary, setImgArray] = useState([]);
  let imgArary = [];
  useEffect(() => {
    if (enteredImagesArray.length !== 3) {
      return;
    }
    if (enteredImagesArray.length === 3) {
      Object.entries(enteredImagesArray).map((ele) => {
        const imgName = Math.random(0, 1000000) + ele[1].name;
        const imgRef = ref(storage, `images/${imgName}`);
        uploadBytes(imgRef, ele[1]);
        const imUrl = `https://firebasestorage.googleapis.com/v0/b/cars-3a440.appspot.com/o/images%2F${imgName}?alt=media`;
        // setImgArray((prev) => {
        //   return [...prev, imUrl];
        // });
        imgArary.push(imUrl);
      });
    }
  }, [enteredImagesArray, imgArary]);

  const [userData, setuserData] = useState({});
  /////getUserData///
  useEffect(() => {
    const transformDataSignIn = (data) => {
      const [userOpj] = data.users;
      const loadedCars = [];
      setuserData({
        id: userOpj.localId,
        name: userOpj.displayName,
      });
    };
    requestFn(
      {
        url: userApi,
        method: "POST",
        body: { idToken: token },
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformDataSignIn
    );
  }, [requestFn, userApi, token]);

  let dateObj = new Date();
  let newdate = `${dateObj.getUTCDate()}/${
    dateObj.getUTCMonth() + 1
  }/${dateObj.getUTCFullYear()}`;

  const [isSubmit, setIsSubmit] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValid) {
      return;
    }

    const transformData = (data) => {
      setIsSubmit(true);
    };
    requestFn(
      {
        url: addCar,
        method: "POST",
        body: {
          carData: {
            carId: Math.random(),
            addedDate: newdate,
            approved: 0,
            uName: userData.name,
            uId: userData.id,
            brand: enteredBrand,
            model: enteredModel,
            price: enteredPrice,
            country: enteredCountry,
            color: enteredColor,
            status: enteredStatus,
            fuel: enteredFuel,
            gearbox: enteredGearbox,
            category: enteredCategory,
            firstRegisteration: enteredFirstRig,
            carImages: imgArary,
          },
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformData
    );
    /////////
    resetBrand();
    resetModel();
    resetPrice();
    resetCountry();
    resetColor();
    resetStatus();
    resetStatus();
    resetFuel();
    resetGearbox();
    resetCategory();
    resetFirstRig();
    resetImages();
  };

  let years = [];
  for (let i = 1990; i <= 2022; i++) {
    years.push(i);
  }
  let content;
  if (isLoading) {
    // content = <p>Sending Request...</p>;
    content = (
      <div className="text-center">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (!isLoading && !error && isSubmit) {
    content = <p>Congratulations, your car has been added</p>;
  }

  return (
    <Fragment>
      <div className={styles.catHeader}>
        <h2>
          Get a cash offer or list your car - two free, secure, easy-to-use ways
          to sell.
        </h2>
      </div>
      <div className={styles.sell}>
        {/* <LoadingSpinner />
      <LoadingIndicator /> */}
        <h1 className="text-center mb-5">Sell Your Car</h1>
        <div className={`container text-center`}>
          <form>
            <input
              type="text"
              placeholder="brand"
              name="brand"
              className={brandInvalid ? styles.invalid : ""}
              onChange={brandChangeHandler}
              onBlur={brandBlurHandler}
              value={enteredBrand}
              required
            />
            <input
              type="text"
              placeholder="model"
              name="model"
              className={modelInvalid ? styles.invalid : ""}
              onChange={modelChangeHandler}
              onBlur={modelBlurHandler}
              value={enteredModel}
              required
            />
            <input
              type="text"
              placeholder="price"
              name="price"
              className={priceInvalid ? styles.invalid : ""}
              onChange={priceChangeHandler}
              onBlur={priceBlurHandler}
              value={enteredPrice}
              required
            />
            <input
              type="text"
              placeholder="country of made"
              name="country"
              className={countryInvalid ? styles.invalid : ""}
              onChange={countryChangeHandler}
              onBlur={countryBlurHandler}
              value={enteredCountry}
              required
            />
            <input
              type="text"
              placeholder="color"
              name="color"
              className={colorInvalid ? styles.invalid : ""}
              onChange={colorChangeHandler}
              onBlur={colorBlurHandler}
              value={enteredColor}
              required
            />
            <div
              className={
                statusInvalid
                  ? `${styles.invalidSelect} ${styles.selectDiv}`
                  : styles.selectDiv
              }
            >
              <label>Status</label>
              <select
                name="status"
                onChange={statusChangeHandler}
                onBlur={statusBlurHandler}
                value={enteredStatus}
                required
              >
                <option value="...">...</option>
                <option value="New Vehicle">New Vehicle</option>
                <option value="Used vehicle">Used vehicle</option>
              </select>
            </div>
            <div
              className={
                fuelInvalid
                  ? `${styles.invalidSelect} ${styles.selectDiv}`
                  : styles.selectDiv
              }
            >
              <label>Fuel</label>
              <select
                name="fuel"
                onChange={fuelChangeHandler}
                onBlur={fuelBlurHandler}
                value={enteredFuel}
                required
              >
                <option value="...">...</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Gas">Gas</option>
                <option value="Petrol">Petrol</option>
              </select>
            </div>
            <div
              className={
                gearboxInvalid
                  ? `${styles.invalidSelect} ${styles.selectDiv}`
                  : styles.selectDiv
              }
            >
              <label>Gearbox</label>
              <select
                name="gearbox"
                onChange={gearboxChangeHandler}
                onBlur={gearboxBlurHandler}
                value={enteredGearbox}
                required
              >
                <option value="...">...</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
              </select>
            </div>
            <div
              className={
                categoryInvalid
                  ? `${styles.invalidSelect} ${styles.selectDiv}`
                  : styles.selectDiv
              }
            >
              <label>Category</label>
              <select
                name="category"
                onChange={categoryChangeHandler}
                onBlur={categoryBlurHandler}
                value={enteredCategory}
                required
              >
                <option value="...">...</option>
                <option value="New Cars">New Cars</option>
                <option value="Used Cars">Used Cars</option>
                <option value="For Rent">For Rent</option>
              </select>
            </div>
            <div
              className={
                firstRigInvalid
                  ? `${styles.invalidSelect} ${styles.selectDiv}`
                  : styles.selectDiv
              }
            >
              <label>First Registeration</label>
              <select
                name="firstRegistiration"
                onChange={firstRigChangeHandler}
                onBlur={firstRigBlurHandler}
                value={enteredFirstRig}
                required
              >
                <option value="...">...</option>
                {years.map((year) => {
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              {/* <input type="number" min="2000" max="2022" /> */}
            </div>

            <div>
              <input
                type="file"
                placeholder="img"
                name="img"
                id="firstImg"
                multiple
                onChange={imagesChangeHandler}
                files={enteredImagesArray}
                className="d-none"
              />
              <label
                htmlFor="firstImg"
                className={
                  imagesInvalid
                    ? `${styles.invalidImages} ${styles.imgLabel}`
                    : styles.imgLabel
                }
              >
                <BsFillImageFill />
                choose 3 images from deferent sides
              </label>
            </div>

            <button onClick={handleSubmit} disabled={!formValid}>
              Add Car
            </button>
          </form>
          {content}
        </div>
      </div>
    </Fragment>
  );
};

export default SellYourCar;
