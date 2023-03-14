import React, { useEffect, useState } from "react";
import useHttp from "../../hook/use-http";
import { storage } from "../../firebaseConfig";
import {
  deleteObject,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useParams, useRouteLoaderData } from "react-router-dom";
import useInputEdit from "../../hook/use-inputEdit";
import useInputFileEdit from "../../hook/use-inputFIleEdit";
import EditComponent from "./EditComponent";
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
const EditCar = () => {
  const params = useParams();
  const carId = params.carId;
  const { isLoading, error, requestFn } = useHttp();
  /////get car's old details///
  // const getCar = `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`;
  // const [oldCar, setOldCar] = useState({});
  // useEffect(() => {
  //   const transformData = (data) => {
  //     Object.entries(data).map((ele) => {
  //       if (ele[1].id === carId) {
  //         setOldCar(ele[1]);
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
  let oldCar = useRouteLoaderData("car-details");
  //////////form validation//////////
  const {
    enteredvalue: enteredType,
    inputValid: typeValid,
    inputInvalid: typeInvalid,
    selectChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler,
  } = useInputEdit(isSelected);
  const {
    enteredvalue: enteredMake,
    inputValid: makeValid,
    inputInvalid: makeInvalid,
    selectChangeHandler: makeChangeHandler,
    inputBlurHandler: makeBlurHandler,
  } = useInputEdit(isSelected);
  const {
    enteredvalue: enteredModel,
    inputValid: modelValid,
    inputInvalid: modelInvalid,
    inputChangeHandler: modelChangeHandler,
    inputBlurHandler: modelBlurHandler,
  } = useInputEdit(isEmpty);
  const {
    enteredvalue: enteredPrice,
    inputValid: priceValid,
    inputInvalid: priceInvalid,
    inputChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
  } = useInputEdit(isNumber);
  const {
    enteredvalue: enteredColor,
    inputValid: colorValid,
    inputInvalid: colorInvalid,
    selectChangeHandler: colorChangeHandler,
    inputBlurHandler: colorBlurHandler,
  } = useInputEdit(isSelected);
  const {
    enteredvalue: enteredStatus,
    inputValid: statusValid,
    inputInvalid: statusInvalid,
    selectChangeHandler: statusChangeHandler,
    inputBlurHandler: statusBlurHandler,
  } = useInputEdit(isSelected);
  const {
    enteredvalue: enteredFuel,
    inputValid: fuelValid,
    inputInvalid: fuelInvalid,
    selectChangeHandler: fuelChangeHandler,
    inputBlurHandler: fuelBlurHandler,
  } = useInputEdit(isSelected);
  const {
    enteredvalue: enteredCategory,
    inputValid: categoryValid,
    inputInvalid: categoryInvalid,
    selectChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
  } = useInputEdit(isSelected);
  const {
    enteredvalue: enteredYear,
    inputValid: yearValid,
    inputInvalid: yearInvalid,
    selectChangeHandler: yearChangeHandler,
    inputBlurHandler: yearBlurHandler,
  } = useInputEdit(isSelected);
  const {
    enteredvalue: enteredDriveType,
    inputValid: driveTypeValid,
    inputInvalid: driveTypeInvalid,
    selectChangeHandler: driveTypeChangeHandler,
    inputBlurHandler: driveTypeBlurHandler,
  } = useInputEdit(isSelected);
  const {
    enteredvalue: enteredTransmission,
    inputValid: transmissionValid,
    inputInvalid: transmissionInvalid,
    selectChangeHandler: transmissionChangeHandler,
    inputBlurHandler: transmissionBlurHandler,
  } = useInputEdit(isSelected);
  const {
    enteredvalue: enteredMileage,
    inputValid: mileageValid,
    inputInvalid: mileageInvalid,
    inputChangeHandler: mileageChangeHandler,
    inputBlurHandler: mileageBlurHandler,
  } = useInputEdit(isNumber);
  const {
    enteredvalue: enteredDoors,
    inputValid: doorsValid,
    inputInvalid: doorsInvalid,
    selectChangeHandler: doorsChangeHandler,
    inputBlurHandler: doorsBlurHandler,
  } = useInputEdit(isSelected);
  const {
    enteredvalue: enteredEngine,
    inputValid: engineValid,
    inputInvalid: engineInvalid,
    inputChangeHandler: engineChangeHandler,
    inputBlurHandler: engineBlurHandler,
  } = useInputEdit(isNumber);
  const {
    enteredvalue: enteredCyilnders,
    inputValid: cyilndersValid,
    inputInvalid: cyilndersInvalid,
    selectChangeHandler: cyilndersChangeHandler,
    inputBlurHandler: cyilndersBlurHandler,
  } = useInputEdit(isSelected);
  const {
    enteredvalue: enteredDescription,
    inputValid: descValid,
    inputInvalid: descInvalid,
    inputChangeHandler: descChangeHandler,
    inputBlurHandler: descBlurHandler,
  } = useInputEdit(isEmpty);
  const {
    enteredvalue: enteredFeatures,
    inputValid: featuresValid,
    inputInvalid: featuresInvalid,
    selectChangeHandler: featuresChangeHandler,
    inputBlurHandler: featuresBlurHandler,
  } = useInputEdit(isSelected);
  const {
    enteredvalue: enteredSafetyFeatures,
    inputValid: safetyFeaturesValid,
    inputInvalid: safetyFeaturesInvalid,
    selectChangeHandler: safetyFeaturesChangeHandler,
    inputBlurHandler: safetyFeaturesBlurHandler,
  } = useInputEdit(isSelected);
  const {
    enteredImages: enteredImagesArray,
    fileValid: imagesValid,
    fileInvalid: imagesInvalid,
    fileChangeHandler: imagesChangeHandler,
  } = useInputFileEdit(isImages);

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
  const categoryOptions = [
    { value: "New Cars", label: "New Cars" },
    { value: "Used Cars", label: "Used Cars" },
    { value: "For Rent", label: "For Rent" },
  ];
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
  for (let i = 1990; i <= 2022; i++) {
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
  ///
  let featuresDefaultValueArray = [];
  oldCar.features?.map((ele) => {
    featuresOptions.map((option) => {
      if (option.value === ele) {
        return featuresDefaultValueArray.push(option);
      }
    });
  });
  let safetyFeaturesDefaultValueArray = [];
  oldCar.safetyFeatures?.map((ele) => {
    safetyFeaturesOptions.map((option) => {
      if (option.value === ele) {
        return safetyFeaturesDefaultValueArray.push(option);
      }
    });
  });
  ////
  const carInputs = [
    {
      label: "Type",
      type: "select",
      options: typeOptions,
      onChange: typeChangeHandler,
      onBlur: typeBlurHandler,
      valid: typeValid,
      invalid: typeInvalid,
      defaultValue: oldCar.type,
    },
    {
      label: "Make",
      type: "select",
      options: makeOptions,
      onChange: makeChangeHandler,
      onBlur: makeBlurHandler,
      defaultValue: oldCar.make,
      valid: makeValid,
      invalid: makeInvalid,
    },
    {
      label: "Model",
      type: "text",
      placeholder: "model",
      onChange: modelChangeHandler,
      onBlur: modelBlurHandler,
      defaultValue: oldCar.model,
      valid: modelValid,
      invalid: modelInvalid,
    },
    {
      label: "Status",
      type: "select",
      options: statusOptions,
      onChange: statusChangeHandler,
      onBlur: statusBlurHandler,
      defaultValue: oldCar.status,
      valid: statusValid,
      invalid: statusInvalid,
    },
    {
      label: "Category",
      type: "select",
      options: categoryOptions,
      onChange: categoryChangeHandler,
      onBlur: categoryBlurHandler,
      defaultValue: oldCar.category,
      valid: categoryValid,
      invalid: categoryInvalid,
    },
    {
      label: "Price (USD)",
      type: "number",
      placeholder: "$",
      onChange: priceChangeHandler,
      onBlur: priceBlurHandler,
      defaultValue: oldCar.price,
      valid: priceValid,
      invalid: priceInvalid,
    },
    {
      label: "Year",
      type: "select",
      options: yearOptions,
      onChange: yearChangeHandler,
      onBlur: yearBlurHandler,
      defaultValue: oldCar.year,
      valid: yearValid,
      invalid: yearInvalid,
    },
    {
      label: "Drive Type",
      type: "select",
      options: DriveTypeOptions,
      onChange: driveTypeChangeHandler,
      onBlur: driveTypeBlurHandler,
      defaultValue: oldCar.driveType,
      valid: driveTypeValid,
      invalid: driveTypeInvalid,
    },
    {
      label: "Transmission",
      type: "select",
      options: TransmissionOptions,
      onChange: transmissionChangeHandler,
      onBlur: transmissionBlurHandler,
      defaultValue: oldCar.transmission,
      valid: transmissionValid,
      invalid: transmissionInvalid,
    },
    {
      label: "Fuel Type",
      type: "select",
      options: FuelTypeOptions,
      onChange: fuelChangeHandler,
      onBlur: fuelBlurHandler,
      defaultValue: oldCar.fuelType,
      valid: fuelValid,
      invalid: fuelInvalid,
    },
    {
      label: "Color",
      type: "select",
      options: colorOptions,
      onChange: colorChangeHandler,
      onBlur: colorBlurHandler,
      defaultValue: oldCar.color,
      valid: colorValid,
      invalid: colorInvalid,
    },
    {
      label: "Doors",
      type: "select",
      options: doorsOptions,
      onChange: doorsChangeHandler,
      onBlur: doorsBlurHandler,
      defaultValue: oldCar.doors,
      valid: doorsValid,
      invalid: doorsInvalid,
    },
    {
      label: "Mileage (mile)",
      type: "number",
      placeholder: "miles",
      onChange: mileageChangeHandler,
      onBlur: mileageBlurHandler,
      defaultValue: oldCar.mileage,
      valid: mileageValid,
      invalid: mileageInvalid,
    },
    {
      label: "Engine Size (L)",
      type: "number",
      placeholder: "L",
      onChange: engineChangeHandler,
      onBlur: engineBlurHandler,
      defaultValue: oldCar.engine,
      valid: engineValid,
      invalid: engineInvalid,
    },
    {
      label: "Cylinders",
      type: "select",
      options: cylindersOptions,
      onChange: cyilndersChangeHandler,
      onBlur: cyilndersBlurHandler,
      defaultValue: oldCar.cylinders,
      valid: cyilndersValid,
      invalid: cyilndersInvalid,
    },
    {
      label: "Description",
      type: "textArea",
      onChange: descChangeHandler,
      onBlur: descBlurHandler,
      defaultValue: oldCar.description,
      valid: descValid,
      invalid: descInvalid,
    },
    {
      label: "Features",
      type: "multiSelect",
      options: featuresOptions,
      onChange: featuresChangeHandler,
      onBlur: featuresBlurHandler,
      defaultValue: featuresDefaultValueArray,
      valid: featuresValid,
      invalid: featuresInvalid,
    },
    {
      label: "Safety Features",
      type: "multiSelect",
      options: safetyFeaturesOptions,
      onChange: safetyFeaturesChangeHandler,
      onBlur: safetyFeaturesBlurHandler,
      defaultValue: safetyFeaturesDefaultValueArray,
      valid: safetyFeaturesValid,
      invalid: safetyFeaturesInvalid,
    },
    {
      label: "Images",
      type: "file",
      onChange: imagesChangeHandler,
      defaultValue: oldCar.carImages,
      valid: imagesValid,
      invalid: imagesInvalid,
    },
  ];
  ///
  const editCarHandler = (e) => {
    let imgArray = [];
    if (enteredImagesArray.length >= 3) {
      ///remove old images/////
      const oldImgRef = ref(storage, `carImages/${carId}`);
      listAll(oldImgRef).then((res) => {
        res.items.forEach((item) => {
          deleteObject(item);
        });
      });
      ////
      ////add new images///
      Object.entries(enteredImagesArray).map((ele) => {
        const imgName = Math.floor(Math.random() * 1000001) + ele[1].name;
        const newImgRef = ref(storage, `carImages/${carId}/${imgName}`);
        const uploadTask = uploadBytesResumable(newImgRef, ele[1]);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // setProgressComplete(true);
          }
        );
        const imUrl = `https://firebasestorage.googleapis.com/v0/b/cars-3a440.appspot.com/o/carImages%2F${carId}%2F${imgName}?alt=media`;
        imgArray.push(imUrl);
      });
      /////
    } else {
      // setProgressComplete(true);
    }
    const editedCar = {
      id: oldCar.id,
      addedDate: oldCar.addedDate,
      approved: oldCar.approved,
      uId: oldCar.uId,
      uName: oldCar.uName,
      type: enteredType ? enteredType.value : oldCar.type,
      make: enteredMake ? enteredMake.value : oldCar.make,
      model: enteredModel ? enteredModel : oldCar.model,
      status: enteredStatus ? enteredStatus.value : oldCar.status,
      category: enteredCategory ? enteredCategory.value : oldCar.category,
      price: enteredPrice ? enteredPrice : oldCar.price,
      year: enteredYear ? enteredYear.value : oldCar.year,
      driveType: enteredDriveType ? enteredDriveType.value : oldCar.driveType,
      transmission: enteredTransmission
        ? enteredTransmission.value
        : oldCar.transmission,
      fuelType: enteredFuel ? enteredFuel.value : oldCar.fuelType,
      color: enteredColor ? enteredColor.value : oldCar.color,
      doors: enteredDoors ? enteredDoors.value : oldCar.doors,
      mileage: enteredMileage ? enteredMileage : oldCar.mileage,
      engine: enteredEngine ? enteredEngine : oldCar.engine,
      cylinders: enteredCyilnders ? enteredCyilnders.value : oldCar.cylinders,
      description: enteredDescription ? enteredDescription : oldCar.description,
      features:
        enteredFeatures.length > 0
          ? enteredFeatures.map((ele) => ele.value)
          : oldCar.features,
      safetyFeatures:
        enteredSafetyFeatures.length > 0
          ? enteredSafetyFeatures.map((ele) => ele.value)
          : oldCar.safetyFeatures,
      carImages: enteredImagesArray.length >= 3 ? imgArray : oldCar.carImages,
    };
    const transformData = (data) => {
      // setOldCar(editedCar);
      oldCar = editedCar;
    };
    requestFn(
      {
        url: `https://cars-3a440-default-rtdb.firebaseio.com/cars/${carId}.json`,
        method: "PATCH",
        body: editedCar,
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformData
    );
  };
  // useEffect(() => {
  //   if (!isLoading && !error && isSubmit && progressComplete) {
  // navigation(`/cars/${carId}`);
  //   }
  // }, [isLoading, error, isSubmit, progressComplete, carId, navigation]);
  return (
    <EditComponent
      title={"Edit Car"}
      inputs={carInputs}
      formValidation={formValid}
      editHandler={editCarHandler}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default EditCar;
