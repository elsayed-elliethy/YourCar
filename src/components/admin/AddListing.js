import React, { useEffect, useState } from "react";
import useHttp from "../../hook/use-http";
import useInput2 from "../../hook/use-input";
import useInputFile from "../../hook/use-inputFIle";
import AdditionComponent from "./additionComponent/additionComponent";
import { storage } from "../../firebaseConfig";
import {
  ref,
  deleteObject,
  listAll,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
///valid consitions///
const isEmpty = (value) => {
  return value.trim().length !== 0;
};
const isNumber = (value) => {
  return isNaN(value) === false && value.length !== 0;
};
const isSelected = (value) => {
  return value !== "";
};
const isImages = (value) => {
  return value.length >= 3;
};
const AddListing = () => {
  const { isLoading, error, requestFn } = useHttp();
  /////getCategories///
  const getCategories = `https://cars-3a440-default-rtdb.firebaseio.com/categories.json`;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const transformData = (data) => {
      let loadedCategories = [];
      Object.entries(data).map((ele) => {
        if (ele[1].allowAds !== "No") {
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
  ////add listing
  //////////form validation//////////
  const {
    enteredvalue: enteredType,
    inputValid: typeValid,
    inputInvalid: typeInvalid,
    selectChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler,
    reset: resetType,
  } = useInput2(isSelected);
  const {
    enteredvalue: enteredMake,
    inputValid: makeValid,
    inputInvalid: makeInvalid,
    selectChangeHandler: makeChangeHandler,
    inputBlurHandler: makeBlurHandler,
    reset: resetMake,
  } = useInput2(isSelected);
  const {
    enteredvalue: enteredModel,
    inputValid: modelValid,
    inputInvalid: modelInvalid,
    inputChangeHandler: modelChangeHandler,
    inputBlurHandler: modelBlurHandler,
    reset: resetModel,
  } = useInput2(isEmpty);
  const {
    enteredvalue: enteredPrice,
    inputValid: priceValid,
    inputInvalid: priceInvalid,
    inputChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPrice,
  } = useInput2(isNumber);
  const {
    enteredvalue: enteredColor,
    inputValid: colorValid,
    inputInvalid: colorInvalid,
    selectChangeHandler: colorChangeHandler,
    inputBlurHandler: colorBlurHandler,
    reset: resetColor,
  } = useInput2(isSelected);
  const {
    enteredvalue: enteredStatus,
    inputValid: statusValid,
    inputInvalid: statusInvalid,
    selectChangeHandler: statusChangeHandler,
    inputBlurHandler: statusBlurHandler,
    reset: resetStatus,
  } = useInput2(isSelected);
  const {
    enteredvalue: enteredFuel,
    inputValid: fuelValid,
    inputInvalid: fuelInvalid,
    selectChangeHandler: fuelChangeHandler,
    inputBlurHandler: fuelBlurHandler,
    reset: resetFuel,
  } = useInput2(isSelected);
  const {
    enteredvalue: enteredCategory,
    inputValid: categoryValid,
    inputInvalid: categoryInvalid,
    selectChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
    reset: resetCategory,
  } = useInput2(isSelected);
  const {
    enteredvalue: enteredYear,
    inputValid: yearValid,
    inputInvalid: yearInvalid,
    selectChangeHandler: yearChangeHandler,
    inputBlurHandler: yearBlurHandler,
    reset: resetYear,
  } = useInput2(isSelected);
  const {
    enteredvalue: enteredDriveType,
    inputValid: driveTypeValid,
    inputInvalid: driveTypeInvalid,
    selectChangeHandler: driveTypeChangeHandler,
    inputBlurHandler: driveTypeBlurHandler,
    reset: resetDriveType,
  } = useInput2(isSelected);
  const {
    enteredvalue: enteredTransmission,
    inputValid: transmissionValid,
    inputInvalid: transmissionInvalid,
    selectChangeHandler: transmissionChangeHandler,
    inputBlurHandler: transmissionBlurHandler,
    reset: resetTransmission,
  } = useInput2(isSelected);
  const {
    enteredvalue: enteredMileage,
    inputValid: mileageValid,
    inputInvalid: mileageInvalid,
    inputChangeHandler: mileageChangeHandler,
    inputBlurHandler: mileageBlurHandler,
    reset: resetMileage,
  } = useInput2(isNumber);
  const {
    enteredvalue: enteredDoors,
    inputValid: doorsValid,
    inputInvalid: doorsInvalid,
    selectChangeHandler: doorsChangeHandler,
    inputBlurHandler: doorsBlurHandler,
    reset: resetDoors,
  } = useInput2(isSelected);
  const {
    enteredvalue: enteredEngine,
    inputValid: engineValid,
    inputInvalid: engineInvalid,
    inputChangeHandler: engineChangeHandler,
    inputBlurHandler: engineBlurHandler,
    reset: resetEngine,
  } = useInput2(isNumber);
  const {
    enteredvalue: enteredCyilnders,
    inputValid: cyilndersValid,
    inputInvalid: cyilndersInvalid,
    selectChangeHandler: cyilndersChangeHandler,
    inputBlurHandler: cyilndersBlurHandler,
    reset: resetCyilnders,
  } = useInput2(isSelected);
  const {
    enteredvalue: enteredDesc,
    inputValid: descValid,
    inputInvalid: descInvalid,
    inputChangeHandler: descChangeHandler,
    inputBlurHandler: descBlurHandler,
    reset: resetDescription,
  } = useInput2(isEmpty);
  const {
    enteredvalue: enteredFeatures,
    inputValid: featuresValid,
    inputInvalid: featuresInvalid,
    multiSelectChangeHandler: featuresChangeHandler,
    inputBlurHandler: featuresBlurHandler,
    reset: resetFeatures,
  } = useInput2(isSelected);
  const {
    enteredvalue: enteredSafetyFeatures,
    inputValid: safetyFeaturesValid,
    inputInvalid: safetyFeaturesInvalid,
    multiSelectChangeHandler: safetyFeaturesChangeHandler,
    inputBlurHandler: safetyFeaturesBlurHandler,
    reset: resetSafetyFeatures,
  } = useInput2(isSelected);
  const {
    enteredImages,
    fileValid: imagesValid,
    fileInvalid: imagesInvalid,
    fileChangeHandler: imagesChangeHandler,
    resetFile: resetImages,
  } = useInputFile(isImages);

  let formValid = false;
  if (
    typeValid &&
    makeValid &&
    modelValid &&
    statusValid &&
    categoryValid &&
    priceValid &&
    yearValid &&
    driveTypeValid &&
    transmissionValid &&
    fuelValid &&
    colorValid &&
    doorsValid &&
    mileageValid &&
    engineValid &&
    cyilndersValid &&
    descValid &&
    featuresValid &&
    safetyFeaturesValid &&
    imagesValid
  ) {
    formValid = true;
  }

  ////////////////////
  /////inputs///
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
  const DriveTypeOptions = [
    { value: "AWD/4WD", label: "AWD/4WD" },
    { value: "Front Wheel Drive", label: "Front Wheel Drive" },
    { value: "Rear Wheel Drive", label: "Rear Wheel Drive" },
  ];
  const statusOptions = [
    { value: "New Vehicle", label: "New Vehicle" },
    { value: "Used vehicle", label: "Used vehicle" },
  ];
  const FuelTypeOptions = [
    { value: "Diesel", label: "Diesel" },
    { value: "Electric", label: "Electric" },
    { value: "Gas", label: "Gas" },
    { value: "Petrol", label: "Petrol" },
    { value: "Hybrid", label: "Hybrid" },
  ];
  const TransmissionOptions = [
    { value: "Automatic", label: "Automatic" },
    { value: "Manual", label: "Manual" },
    { value: "Semi-Automatic", label: "Semi-Automatic" },
  ];
  const categoryOptions = categories.map((cat) => {
    return { value: cat.name, label: cat.name };
  });
  const colorOptions = [
    { value: "Black", label: "Black" },
    { value: "Blue", label: "Blue" },
    { value: "Brown", label: "Brown" },
    { value: "Gold", label: "Gold" },
    { value: "Green", label: "Green" },
    { value: "Grey", label: "Grey" },
    { value: "Orange", label: "Orange" },
    { value: "Red", label: "Red" },
    { value: "Silver", label: "Silver" },
    { value: "White", label: "White" },
    { value: "Yellow", label: "Yellow" },
  ];
  const doorsOptions = [
    { value: "2-door", label: "2-door" },
    { value: "3-door", label: "3-door" },
    { value: "4-door", label: "4-door" },
    { value: "5-door", label: "5-door" },
  ];
  const cylindersOptions = [
    { value: "4", label: "4" },
    { value: "6", label: "6" },
    { value: "8", label: "8" },
  ];
  const typeOptions = [
    { value: "Convertible", label: "Convertible" },
    { value: "Coupe", label: "Coupe" },
    { value: "Hatchback", label: "Hatchback" },
    { value: "Sedan", label: "Sedan" },
    { value: "SUV", label: "SUV" },
    { value: "Wagon", label: "Wagon" },
  ];
  let yearOptions = [];
  for (let i = 1990; i <= 2023; i++) {
    yearOptions.push({ value: i, label: i });
  }
  const featuresOptions = [
    { value: "360-degree camera", label: "360-degree camera" },
    { value: "Blind spot alert", label: "Blind spot alert" },
    { value: "Bluetooth", label: "Bluetooth" },
    { value: "Cooled seats", label: "Cooled seats" },
    { value: "Heated seats", label: "Heated seats" },
    { value: "Leather seats", label: "Leather seats" },
    { value: "LED headlights", label: "LED headlights" },
    { value: "Memory seat", label: "Memory seat" },
    { value: "Navigation System", label: "Navigation System" },
    { value: "Reversing camera", label: "Reversing camera" },
    { value: "Side airbags", label: "Side airbags" },
    { value: "Sound system", label: "Sound system" },
    { value: "Traction Control", label: "Traction Control" },
    { value: "USB port", label: "USB port" },
    { value: "Keyless start", label: "Keyless start" },
  ];

  const safetyFeaturesOptions = [
    { value: "Active head restraints", label: "Active head restraints" },
    { value: "Adaptive headlights", label: "Adaptive headlights" },
    { value: "Backup camera", label: "Backup camera" },
    { value: "Blind-spot warning", label: "Blind-spot warning" },
    { value: "Brake assist", label: "Brake assist" },
    { value: "Forward-collision warning", label: "Forward-collision warning" },
    { value: "Lane keeping assist", label: "Lane keeping assist" },
    { value: "Parking assist systems", label: "Parking assist systems" },
    { value: "Pedestrian detection", label: "Pedestrian detection" },
    { value: "Sideview camera", label: "Sideview camera" },
  ];
  //
  const listingsInputs = [
    {
      label: "Type",
      type: "select",
      options: typeOptions,
      onChange: typeChangeHandler,
      onBlur: typeBlurHandler,
      value: enteredType,
      valid: typeValid,
      invalid: typeInvalid,
    },
    {
      label: "Make",
      type: "select",
      options: makeOptions,
      onChange: makeChangeHandler,
      onBlur: makeBlurHandler,
      value: enteredMake,
      valid: makeValid,
      invalid: makeInvalid,
    },
    {
      label: "Model",
      type: "text",
      placeholder: "model",
      onChange: modelChangeHandler,
      onBlur: modelBlurHandler,
      value: enteredModel,
      valid: modelValid,
      invalid: modelInvalid,
    },
    {
      label: "Status",
      type: "select",
      options: statusOptions,
      onChange: statusChangeHandler,
      onBlur: statusBlurHandler,
      value: enteredStatus,
      valid: statusValid,
      invalid: statusInvalid,
    },
    {
      label: "Category",
      type: "select",
      options: categoryOptions,
      onChange: categoryChangeHandler,
      onBlur: categoryBlurHandler,
      value: enteredCategory,
      valid: categoryValid,
      invalid: categoryInvalid,
    },
    {
      label: "Price (USD)",
      type: "number",
      placeholder: "$",
      onChange: priceChangeHandler,
      onBlur: priceBlurHandler,
      value: enteredPrice,
      valid: priceValid,
      invalid: priceInvalid,
    },
    {
      label: "Year",
      type: "select",
      options: yearOptions,
      onChange: yearChangeHandler,
      onBlur: yearBlurHandler,
      value: enteredYear,
      valid: yearValid,
      invalid: yearInvalid,
    },
    {
      label: "Drive Type",
      type: "select",
      options: DriveTypeOptions,
      onChange: driveTypeChangeHandler,
      onBlur: driveTypeBlurHandler,
      value: enteredDriveType,
      valid: driveTypeValid,
      invalid: driveTypeInvalid,
    },
    {
      label: "Transmission",
      type: "select",
      options: TransmissionOptions,
      onChange: transmissionChangeHandler,
      onBlur: transmissionBlurHandler,
      value: enteredTransmission,
      valid: transmissionValid,
      invalid: transmissionInvalid,
    },
    {
      label: "Fuel Type",
      type: "select",
      options: FuelTypeOptions,
      onChange: fuelChangeHandler,
      onBlur: fuelBlurHandler,
      value: enteredFuel,
      valid: fuelValid,
      invalid: fuelInvalid,
    },
    {
      label: "Color",
      type: "select",
      options: colorOptions,
      onChange: colorChangeHandler,
      onBlur: colorBlurHandler,
      value: enteredColor,
      valid: colorValid,
      invalid: colorInvalid,
    },
    {
      label: "Doors",
      type: "select",
      options: doorsOptions,
      onChange: doorsChangeHandler,
      onBlur: doorsBlurHandler,
      value: enteredDoors,
      valid: doorsValid,
      invalid: doorsInvalid,
    },
    {
      label: "Mileage (mile)",
      type: "number",
      placeholder: "miles",
      onChange: mileageChangeHandler,
      onBlur: mileageBlurHandler,
      value: enteredMileage,
      valid: mileageValid,
      invalid: mileageInvalid,
    },
    {
      label: "Engine Size (L)",
      type: "number",
      placeholder: "L",
      onChange: engineChangeHandler,
      onBlur: engineBlurHandler,
      value: enteredEngine,
      valid: engineValid,
      invalid: engineInvalid,
    },
    {
      label: "Cylinders",
      type: "select",
      options: cylindersOptions,
      onChange: cyilndersChangeHandler,
      onBlur: cyilndersBlurHandler,
      value: enteredCyilnders,
      valid: cyilndersValid,
      invalid: cyilndersInvalid,
    },
    {
      label: "Description",
      type: "textArea",
      onChange: descChangeHandler,
      onBlur: descBlurHandler,
      value: enteredDesc,
      valid: descValid,
      invalid: descInvalid,
    },
    {
      label: "Features",
      type: "multiSelect",
      options: featuresOptions,
      onChange: featuresChangeHandler,
      onBlur: featuresBlurHandler,
      value: enteredFeatures,
      valid: featuresValid,
      invalid: featuresInvalid,
    },
    {
      label: "Safety Features",
      type: "multiSelect",
      options: safetyFeaturesOptions,
      onChange: safetyFeaturesChangeHandler,
      onBlur: safetyFeaturesBlurHandler,
      value: enteredSafetyFeatures,
      valid: safetyFeaturesValid,
      invalid: safetyFeaturesInvalid,
    },
    {
      label: "Images",
      type: "file",
      onChange: imagesChangeHandler,
      value: enteredImages,
      valid: imagesValid,
      invalid: imagesInvalid,
    },
  ];

  /////////////
  const randomId = Math.floor(Math.random() * 1000001).toString();
  let dateObj = new Date();
  let newDate = `${dateObj.getUTCDate()}/${
    dateObj.getUTCMonth() + 1
  }/${dateObj.getUTCFullYear()}`;
  ////
  const navigate = useNavigate();
  const addListingHandler = () => {
    let imgArray = [];
    const [imagesInput] = listingsInputs.filter((ele) => ele.type === "file");
    const enteredImagesArray = imagesInput.value;
    Object.entries(enteredImagesArray).map((ele) => {
      const imgName = Math.floor(Math.random() * 1000001) + ele[1].name;
      const mainImgRef = ref(storage, `carImages/${randomId}/${imgName}`);
      const imgRef = mainImgRef;
      const uploadTask = uploadBytesResumable(imgRef, ele[1]);
      let progress;
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + "% done");
          console.log(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
        }
      );
      const mainImgUrl = `https://firebasestorage.googleapis.com/v0/b/cars-3a440.appspot.com/o/carImages%2F${randomId}%2F${imgName}?alt=media`;
      imgArray.push(mainImgUrl);
    });
    ///

    const addedCar = {
      id: randomId,
      addedDate: newDate,
      approved: "approved",
      uId: "775034",
      uName: "Elsayed Elliethy",
      type: enteredType.value,
      make: enteredMake.value,
      model: enteredModel,
      status: enteredStatus.value,
      category: enteredCategory.value,
      price: enteredPrice,
      year: enteredYear.value,
      driveType: enteredDriveType.value,
      transmission: enteredTransmission.value,
      fuelType: enteredFuel.value,
      color: enteredColor.value,
      doors: enteredDoors.value,
      mileage: enteredMileage,
      engine: enteredEngine,
      cylinders: enteredCyilnders.value,
      description: enteredDesc,
      features: enteredFeatures ? enteredFeatures.map((ele) => ele.value) : [],
      safetyFeatures: enteredSafetyFeatures
        ? enteredSafetyFeatures.map((ele) => ele.value)
        : [],
      carImages: imgArray,
    };

    ///////////////////
    const transformData = (data) => {
      navigate("/adminDashboard/listings");
    };
    requestFn(
      {
        url: `https://cars-3a440-default-rtdb.firebaseio.com/cars/${randomId}.json`,
        method: "PUT",
        body: addedCar,
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformData
    );
    /////////
    // if (!isLoading && !error) {
    //   navigate("/adminDashboard/listings");
    // }
  };
  return (
    <AdditionComponent
      title={"Add Listing"}
      inputs={listingsInputs}
      formValidation={formValid}
      addHandler={addListingHandler}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default AddListing;
