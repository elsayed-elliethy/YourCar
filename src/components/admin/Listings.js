import React, { Fragment, useMemo, useState, useEffect } from "react";
import useHttp from "../../hook/use-http";
import { storage } from "../../firebaseConfig";
import {
  ref,
  deleteObject,
  listAll,
  uploadBytesResumable,
} from "firebase/storage";
import Table from "./table/Table";
import { NavLink } from "react-router-dom";
import styles from "../admin/additionComponent/additionComponent.module.css";
import { IoAddCircle } from "react-icons/io5";
const Listings = () => {
  const { isLoading, error, requestFn } = useHttp();
  /////getCars///
  const getCars = `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`;
  const [cars, setCars] = useState([]);
  useEffect(() => {
    const transformData = (data) => {
      let loadedCars = [];
      Object.entries(data).map((ele) => {
        const car =
          ele[1].category === "For Rent"
            ? { ...ele[1], price: `$${ele[1].price} /day` }
            : { ...ele[1], price: `$${ele[1].price}` };
        loadedCars.push(car);
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
  const listingsColumns = React.useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
        sticky: "left",
        width: 80,
      },
      {
        Header: "Image",
        accessor: "carImages[0]",
        Cell: (tableProps) => (
          <img
            src={tableProps.row.original.carImages[1]}
            width={100}
            height={70}
            alt="img"
          />
        ),
        width: 150,
      },
      {
        Header: "Make",
        accessor: "make",
      },
      {
        Header: "Model",
        accessor: "model",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Color",
        accessor: "color",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Cylinders",
        accessor: "cylinders",
      },
      {
        Header: "Doors",
        accessor: "doors",
      },
      {
        Header: "Drive Type",
        accessor: "driveType",
      },
      {
        Header: "Engine size",
        accessor: "engine",
      },
      {
        Header: "Fuel type",
        accessor: "fuelType",
      },
      {
        Header: "Mileage",
        accessor: "mileage",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "transmission",
        accessor: "transmission",
      },
      {
        Header: "Seller",
        accessor: "uName",
      },
      {
        Header: "Year",
        accessor: "year",
      },
      {
        Header: "Approval",
        accessor: "approved",
      },
      {
        Header: "Actions",
        accessor: "",
        Cell: "listingActions",
        sticky: "right",
        width: 100,
      },
    ],
    []
  );
  const listingsData = useMemo(() => cars, [cars]);
  const updateListings = (rowIndex, columnId, value) => {
    const transformData = (data) => {};
    requestFn(
      {
        url: `https://cars-3a440-default-rtdb.firebaseio.com/cars/${listingsData[rowIndex].id}.json`,
        method: "PATCH",
        body: {
          ...listingsData[rowIndex],
          [columnId]: value,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformData
    );
  };
  const approveListingsHandler = (carId) => {
    const [targetCar] = [...listingsData].filter((ele) => ele.id === carId);
    const approvedCar = { ...targetCar, approved: "approved" };
    cars[cars.indexOf(targetCar)] = approvedCar;
    const updatedList = [...cars];
    setCars(updatedList);
    const transformData = (data) => {};
    requestFn(
      {
        url: `https://cars-3a440-default-rtdb.firebaseio.com/cars/${carId}.json`,
        method: "PATCH",
        body: {
          ...targetCar,
          approved: "approved",
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformData
    );
  };
  const deleteListingHandler = (carId) => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
    const updatedList = cars.filter((ele) => {
      return ele.id !== carId;
    });
    setCars(updatedList);
    requestFn({
      url: `https://cars-3a440-default-rtdb.firebaseio.com/cars/${carId}.json`,
      method: "DELETE",
    });
    ///remove images/////
    const ImgRef = ref(storage, `carImages/${carId}`);
    listAll(ImgRef).then((res) => {
      res.items.forEach((item) => {
        deleteObject(item);
      });
    });
  }
  };
  ////
  return (
    <div className={styles.mainDiv}>
      <h1 className="text-center">Listings</h1>
      <Table
        columns={listingsColumns}
        data={listingsData}
        updateMyData={updateListings}
        approveCarHandler={approveListingsHandler}
        deleteHandler={deleteListingHandler}
        filterPlaceholder={`Search ${listingsData.length} listings `}
        btnContent="Add Listing"
        link="/adminDashboard/listings/addListing"
      />
    </div>
  );
};

export default Listings;
//////////
// import React, { Fragment, useMemo, useState, useEffect } from "react";
// import useHttp from "../../hook/use-http";
// import { storage } from "../../firebaseConfig";
// import {
//   ref,
//   deleteObject,
//   listAll,
//   uploadBytesResumable,
// } from "firebase/storage";
// import Table from "./table/Table";
// import AdditionComponent from "./additionComponent/additionComponent";
// import useInputFile from "../../hook/use-inputFIle";
// import useInput2 from "../../hook/use-input";
// ///valid consitions///
// const isEmpty = (value) => {
//   return value.trim().length !== 0;
// };
// const isNumber = (value) => {
//   return isNaN(value) === false && value.length !== 0;
// };
// const isSelected = (value) => {
//   return value !== "";
// };
// const isImages = (value) => {
//   return value.length >= 3;
// };

// const Listings = () => {
//   const getCars = `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`;
//   const getCategories = `https://cars-3a440-default-rtdb.firebaseio.com/categories.json`;
//   const { isLoading, error, requestFn } = useHttp();
//   const [cars, setCars] = useState([]);
//   const [categories, setCategories] = useState([]);
//   /////getCars///
//   useEffect(() => {
//     const transformData = (data) => {
//       let loadedCars = [];
//       Object.entries(data).map((ele) => {
//         const car =
//           ele[1].category === "For Rent"
//             ? { ...ele[1], price: `$${ele[1].price} /day` }
//             : { ...ele[1], price: `$${ele[1].price}` };
//         loadedCars.push(car);
//       });
//       setCars(loadedCars);
//     };
//     requestFn(
//       {
//         url: getCars,
//       },
//       transformData
//     );
//   }, [requestFn, getCars]);
//   /////getCategories///
//   useEffect(() => {
//     const transformData = (data) => {
//       let loadedCategories = [];
//       Object.entries(data).map((ele) => {
//         if (ele[1].allowAds !== "No") {
//           loadedCategories.push(ele[1]);
//         }
//       });
//       setCategories(loadedCategories);
//     };
//     requestFn(
//       {
//         url: getCategories,
//       },
//       transformData
//     );
//   }, [requestFn, getCategories]);
//   ////
//   const listingsColumns = React.useMemo(
//     () => [
//       {
//         Header: "Id",
//         accessor: "id",
//         sticky: "left",
//         width: 80,
//       },
//       {
//         Header: "Image",
//         accessor: "carImages[0]",
//         Cell: (tableProps) => (
//           <img
//             src={tableProps.row.original.carImages[1]}
//             width={100}
//             height={70}
//             alt="img"
//           />
//         ),
//         width: 150,
//       },
//       {
//         Header: "Make",
//         accessor: "make",
//       },
//       {
//         Header: "Model",
//         accessor: "model",
//       },
//       {
//         Header: "Type",
//         accessor: "type",
//       },
//       {
//         Header: "Color",
//         accessor: "color",
//       },
//       {
//         Header: "Category",
//         accessor: "category",
//       },
//       {
//         Header: "Cylinders",
//         accessor: "cylinders",
//       },
//       {
//         Header: "Doors",
//         accessor: "doors",
//       },
//       {
//         Header: "Drive Type",
//         accessor: "driveType",
//       },
//       {
//         Header: "Engine size",
//         accessor: "engine",
//       },
//       {
//         Header: "Fuel type",
//         accessor: "fuelType",
//       },
//       {
//         Header: "Mileage",
//         accessor: "mileage",
//       },
//       {
//         Header: "Price",
//         accessor: "price",
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//       },
//       {
//         Header: "transmission",
//         accessor: "transmission",
//       },
//       {
//         Header: "Seller",
//         accessor: "uName",
//       },
//       {
//         Header: "Year",
//         accessor: "year",
//       },
//       {
//         Header: "Approval",
//         accessor: "approved",
//       },
//       {
//         Header: "Actions",
//         accessor: "",
//         Cell: "listingActions",
//         sticky: "right",
//         width: 100,
//       },
//     ],
//     []
//   );
//   const listingsData = useMemo(() => cars, [cars]);
//   const updateListings = (rowIndex, columnId, value) => {
//     const transformData = (data) => {};
//     requestFn(
//       {
//         url: `https://cars-3a440-default-rtdb.firebaseio.com/cars/${listingsData[rowIndex].id}.json`,
//         method: "PATCH",
//         body: {
//           ...listingsData[rowIndex],
//           [columnId]: value,
//         },
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       transformData
//     );
//   };
//   const approveListingsHandler = (carId) => {
//     const [targetCar] = [...listingsData].filter((ele) => ele.id === carId);
//     const approvedCar = { ...targetCar, approved: "approved" };
//     cars[cars.indexOf(targetCar)] = approvedCar;
//     const updatedList = [...cars];
//     setCars(updatedList);
//     const transformData = (data) => {};
//     requestFn(
//       {
//         url: `https://cars-3a440-default-rtdb.firebaseio.com/cars/${carId}.json`,
//         method: "PATCH",
//         body: {
//           ...targetCar,
//           approved: "approved",
//         },
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       transformData
//     );
//   };
//   const deleteListingHandler = (carId) => {
//     const updatedList = cars.filter((ele) => {
//       return ele.id !== carId;
//     });
//     setCars(updatedList);
//     requestFn({
//       url: `https://cars-3a440-default-rtdb.firebaseio.com/cars/${carId}.json`,
//       method: "DELETE",
//     });
//     ///remove images/////
//     const ImgRef = ref(storage, `carImages/${carId}`);
//     listAll(ImgRef).then((res) => {
//       res.items.forEach((item) => {
//         deleteObject(item);
//       });
//     });
//   };
//   ////add listing
//   //////////form validation//////////
//   const {
//     enteredvalue: enteredType,
//     inputValid: typeValid,
//     inputInvalid: typeInvalid,
//     selectChangeHandler: typeChangeHandler,
//     inputBlurHandler: typeBlurHandler,
//     reset: resetType,
//   } = useInput2(isSelected);
//   const {
//     enteredvalue: enteredMake,
//     inputValid: makeValid,
//     inputInvalid: makeInvalid,
//     selectChangeHandler: makeChangeHandler,
//     inputBlurHandler: makeBlurHandler,
//     reset: resetMake,
//   } = useInput2(isSelected);
//   const {
//     enteredvalue: enteredModel,
//     inputValid: modelValid,
//     inputInvalid: modelInvalid,
//     inputChangeHandler: modelChangeHandler,
//     inputBlurHandler: modelBlurHandler,
//     reset: resetModel,
//   } = useInput2(isEmpty);
//   const {
//     enteredvalue: enteredPrice,
//     inputValid: priceValid,
//     inputInvalid: priceInvalid,
//     inputChangeHandler: priceChangeHandler,
//     inputBlurHandler: priceBlurHandler,
//     reset: resetPrice,
//   } = useInput2(isNumber);
//   const {
//     enteredvalue: enteredColor,
//     inputValid: colorValid,
//     inputInvalid: colorInvalid,
//     selectChangeHandler: colorChangeHandler,
//     inputBlurHandler: colorBlurHandler,
//     reset: resetColor,
//   } = useInput2(isSelected);
//   const {
//     enteredvalue: enteredStatus,
//     inputValid: statusValid,
//     inputInvalid: statusInvalid,
//     selectChangeHandler: statusChangeHandler,
//     inputBlurHandler: statusBlurHandler,
//     reset: resetStatus,
//   } = useInput2(isSelected);
//   const {
//     enteredvalue: enteredFuel,
//     inputValid: fuelValid,
//     inputInvalid: fuelInvalid,
//     selectChangeHandler: fuelChangeHandler,
//     inputBlurHandler: fuelBlurHandler,
//     reset: resetFuel,
//   } = useInput2(isSelected);
//   const {
//     enteredvalue: enteredCategory,
//     inputValid: categoryValid,
//     inputInvalid: categoryInvalid,
//     selectChangeHandler: categoryChangeHandler,
//     inputBlurHandler: categoryBlurHandler,
//     reset: resetCategory,
//   } = useInput2(isSelected);
//   const {
//     enteredvalue: enteredYear,
//     inputValid: yearValid,
//     inputInvalid: yearInvalid,
//     selectChangeHandler: yearChangeHandler,
//     inputBlurHandler: yearBlurHandler,
//     reset: resetYear,
//   } = useInput2(isSelected);
//   const {
//     enteredvalue: enteredDriveType,
//     inputValid: driveTypeValid,
//     inputInvalid: driveTypeInvalid,
//     selectChangeHandler: driveTypeChangeHandler,
//     inputBlurHandler: driveTypeBlurHandler,
//     reset: resetDriveType,
//   } = useInput2(isSelected);
//   const {
//     enteredvalue: enteredTransmission,
//     inputValid: transmissionValid,
//     inputInvalid: transmissionInvalid,
//     selectChangeHandler: transmissionChangeHandler,
//     inputBlurHandler: transmissionBlurHandler,
//     reset: resetTransmission,
//   } = useInput2(isSelected);
//   const {
//     enteredvalue: enteredMileage,
//     inputValid: mileageValid,
//     inputInvalid: mileageInvalid,
//     inputChangeHandler: mileageChangeHandler,
//     inputBlurHandler: mileageBlurHandler,
//     reset: resetMileage,
//   } = useInput2(isNumber);
//   const {
//     enteredvalue: enteredDoors,
//     inputValid: doorsValid,
//     inputInvalid: doorsInvalid,
//     selectChangeHandler: doorsChangeHandler,
//     inputBlurHandler: doorsBlurHandler,
//     reset: resetDoors,
//   } = useInput2(isSelected);
//   const {
//     enteredvalue: enteredEngine,
//     inputValid: engineValid,
//     inputInvalid: engineInvalid,
//     inputChangeHandler: engineChangeHandler,
//     inputBlurHandler: engineBlurHandler,
//     reset: resetEngine,
//   } = useInput2(isNumber);
//   const {
//     enteredvalue: enteredCyilnders,
//     inputValid: cyilndersValid,
//     inputInvalid: cyilndersInvalid,
//     selectChangeHandler: cyilndersChangeHandler,
//     inputBlurHandler: cyilndersBlurHandler,
//     reset: resetCyilnders,
//   } = useInput2(isSelected);
//   const {
//     enteredvalue: enteredDesc,
//     inputValid: descValid,
//     inputInvalid: descInvalid,
//     inputChangeHandler: descChangeHandler,
//     inputBlurHandler: descBlurHandler,
//     reset: resetDescription,
//   } = useInput2(isEmpty);
//   const {
//     enteredvalue: enteredFeatures,
//     inputValid: featuresValid,
//     inputInvalid: featuresInvalid,
//     multiSelectChangeHandler: featuresChangeHandler,
//     inputBlurHandler: featuresBlurHandler,
//     reset: resetFeatures,
//   } = useInput2(isSelected);
//   const {
//     enteredvalue: enteredSafetyFeatures,
//     inputValid: safetyFeaturesValid,
//     inputInvalid: safetyFeaturesInvalid,
//     multiSelectChangeHandler: safetyFeaturesChangeHandler,
//     inputBlurHandler: safetyFeaturesBlurHandler,
//     reset: resetSafetyFeatures,
//   } = useInput2(isSelected);
//   const {
//     enteredImages,
//     fileValid: imagesValid,
//     fileInvalid: imagesInvalid,
//     fileChangeHandler: imagesChangeHandler,
//     resetFile: resetImages,
//   } = useInputFile(isImages);

//   let formValid = false;
//   if (
//     typeValid &&
//     makeValid &&
//     modelValid &&
//     statusValid &&
//     categoryValid &&
//     priceValid &&
//     yearValid &&
//     driveTypeValid &&
//     transmissionValid &&
//     fuelValid &&
//     colorValid &&
//     doorsValid &&
//     mileageValid &&
//     engineValid &&
//     cyilndersValid &&
//     descValid &&
//     featuresValid &&
//     safetyFeaturesValid &&
//     imagesValid
//   ) {
//     formValid = true;
//   }

//   ////////////////////
//   /////inputs///
//   const makeOptions = [
//     { value: "Audi", label: "Audi" },
//     { value: "Bentley", label: "Bentley" },
//     { value: "BMW", label: "BMW" },
//     { value: "Cadillac", label: "Cadillac" },
//     { value: "Chevrolet", label: "Chevrolet" },
//     { value: "Ferrari", label: "Ferrari" },
//     { value: "Ford", label: "Ford" },
//     { value: "Mercedes-Benz", label: "Mercedes-Benz" },
//     { value: "Porsche", label: "Porsche" },
//     { value: "Ford", label: "Ford" },
//   ];
//   const DriveTypeOptions = [
//     { value: "AWD/4WD", label: "AWD/4WD" },
//     { value: "Front Wheel Drive", label: "Front Wheel Drive" },
//     { value: "Rear Wheel Drive", label: "Rear Wheel Drive" },
//   ];
//   const statusOptions = [
//     { value: "New Vehicle", label: "New Vehicle" },
//     { value: "Used vehicle", label: "Used vehicle" },
//   ];
//   const FuelTypeOptions = [
//     { value: "Diesel", label: "Diesel" },
//     { value: "Electric", label: "Electric" },
//     { value: "Gas", label: "Gas" },
//     { value: "Petrol", label: "Petrol" },
//     { value: "Hybrid", label: "Hybrid" },
//   ];
//   const TransmissionOptions = [
//     { value: "Automatic", label: "Automatic" },
//     { value: "Manual", label: "Manual" },
//     { value: "Semi-Automatic", label: "Semi-Automatic" },
//   ];
//   const categoryOptions = categories.map((cat) => {
//     return { value: cat.name, label: cat.name };
//   });
//   const colorOptions = [
//     { value: "Black", label: "Black" },
//     { value: "Blue", label: "Blue" },
//     { value: "Brown", label: "Brown" },
//     { value: "Gold", label: "Gold" },
//     { value: "Green", label: "Green" },
//     { value: "Grey", label: "Grey" },
//     { value: "Orange", label: "Orange" },
//     { value: "Red", label: "Red" },
//     { value: "Silver", label: "Silver" },
//     { value: "White", label: "White" },
//     { value: "Yellow", label: "Yellow" },
//   ];
//   const doorsOptions = [
//     { value: "2-door", label: "2-door" },
//     { value: "3-door", label: "3-door" },
//     { value: "4-door", label: "4-door" },
//     { value: "5-door", label: "5-door" },
//   ];
//   const cylindersOptions = [
//     { value: "4", label: "4" },
//     { value: "6", label: "6" },
//     { value: "8", label: "8" },
//   ];
//   const typeOptions = [
//     { value: "Convertible", label: "Convertible" },
//     { value: "Coupe", label: "Coupe" },
//     { value: "Hatchback", label: "Hatchback" },
//     { value: "Sedan", label: "Sedan" },
//     { value: "SUV", label: "SUV" },
//     { value: "Wagon", label: "Wagon" },
//   ];
//   let yearOptions = [];
//   for (let i = 1990; i <= 2023; i++) {
//     yearOptions.push({ value: i, label: i });
//   }
//   const featuresOptions = [
//     { value: "360-degree camera", label: "360-degree camera" },
//     { value: "Blind spot alert", label: "Blind spot alert" },
//     { value: "Bluetooth", label: "Bluetooth" },
//     { value: "Cooled seats", label: "Cooled seats" },
//     { value: "Heated seats", label: "Heated seats" },
//     { value: "Leather seats", label: "Leather seats" },
//     { value: "LED headlights", label: "LED headlights" },
//     { value: "Memory seat", label: "Memory seat" },
//     { value: "Navigation System", label: "Navigation System" },
//     { value: "Reversing camera", label: "Reversing camera" },
//     { value: "Side airbags", label: "Side airbags" },
//     { value: "Sound system", label: "Sound system" },
//     { value: "Traction Control", label: "Traction Control" },
//     { value: "USB port", label: "USB port" },
//     { value: "Keyless start", label: "Keyless start" },
//   ];

//   const safetyFeaturesOptions = [
//     { value: "Active head restraints", label: "Active head restraints" },
//     { value: "Adaptive headlights", label: "Adaptive headlights" },
//     { value: "Backup camera", label: "Backup camera" },
//     { value: "Blind-spot warning", label: "Blind-spot warning" },
//     { value: "Brake assist", label: "Brake assist" },
//     { value: "Forward-collision warning", label: "Forward-collision warning" },
//     { value: "Lane keeping assist", label: "Lane keeping assist" },
//     { value: "Parking assist systems", label: "Parking assist systems" },
//     { value: "Pedestrian detection", label: "Pedestrian detection" },
//     { value: "Sideview camera", label: "Sideview camera" },
//   ];
//   //
//   const listingsInputs = [
//     {
//       label: "Type",
//       type: "select",
//       options: typeOptions,
//       onChange: typeChangeHandler,
//       onBlur: typeBlurHandler,
//       value: enteredType,
//       valid: typeValid,
//       invalid: typeInvalid,
//     },
//     {
//       label: "Make",
//       type: "select",
//       options: makeOptions,
//       onChange: makeChangeHandler,
//       onBlur: makeBlurHandler,
//       value: enteredMake,
//       valid: makeValid,
//       invalid: makeInvalid,
//     },
//     {
//       label: "Model",
//       type: "text",
//       placeholder: "model",
//       onChange: modelChangeHandler,
//       onBlur: modelBlurHandler,
//       value: enteredModel,
//       valid: modelValid,
//       invalid: modelInvalid,
//     },
//     {
//       label: "Status",
//       type: "select",
//       options: statusOptions,
//       onChange: statusChangeHandler,
//       onBlur: statusBlurHandler,
//       value: enteredStatus,
//       valid: statusValid,
//       invalid: statusInvalid,
//     },
//     {
//       label: "Category",
//       type: "select",
//       options: categoryOptions,
//       onChange: categoryChangeHandler,
//       onBlur: categoryBlurHandler,
//       value: enteredCategory,
//       valid: categoryValid,
//       invalid: categoryInvalid,
//     },
//     {
//       label: "Price (USD)",
//       type: "number",
//       placeholder: "$",
//       onChange: priceChangeHandler,
//       onBlur: priceBlurHandler,
//       value: enteredPrice,
//       valid: priceValid,
//       invalid: priceInvalid,
//     },
//     {
//       label: "Year",
//       type: "select",
//       options: yearOptions,
//       onChange: yearChangeHandler,
//       onBlur: yearBlurHandler,
//       value: enteredYear,
//       valid: yearValid,
//       invalid: yearInvalid,
//     },
//     {
//       label: "Drive Type",
//       type: "select",
//       options: DriveTypeOptions,
//       onChange: driveTypeChangeHandler,
//       onBlur: driveTypeBlurHandler,
//       value: enteredDriveType,
//       valid: driveTypeValid,
//       invalid: driveTypeInvalid,
//     },
//     {
//       label: "Transmission",
//       type: "select",
//       options: TransmissionOptions,
//       onChange: transmissionChangeHandler,
//       onBlur: transmissionBlurHandler,
//       value: enteredTransmission,
//       valid: transmissionValid,
//       invalid: transmissionInvalid,
//     },
//     {
//       label: "Fuel Type",
//       type: "select",
//       options: FuelTypeOptions,
//       onChange: fuelChangeHandler,
//       onBlur: fuelBlurHandler,
//       value: enteredFuel,
//       valid: fuelValid,
//       invalid: fuelInvalid,
//     },
//     {
//       label: "Color",
//       type: "select",
//       options: colorOptions,
//       onChange: colorChangeHandler,
//       onBlur: colorBlurHandler,
//       value: enteredColor,
//       valid: colorValid,
//       invalid: colorInvalid,
//     },
//     {
//       label: "Doors",
//       type: "select",
//       options: doorsOptions,
//       onChange: doorsChangeHandler,
//       onBlur: doorsBlurHandler,
//       value: enteredDoors,
//       valid: doorsValid,
//       invalid: doorsInvalid,
//     },
//     {
//       label: "Mileage (mile)",
//       type: "number",
//       placeholder: "miles",
//       onChange: mileageChangeHandler,
//       onBlur: mileageBlurHandler,
//       value: enteredMileage,
//       valid: mileageValid,
//       invalid: mileageInvalid,
//     },
//     {
//       label: "Engine Size (L)",
//       type: "number",
//       placeholder: "L",
//       onChange: engineChangeHandler,
//       onBlur: engineBlurHandler,
//       value: enteredEngine,
//       valid: engineValid,
//       invalid: engineInvalid,
//     },
//     {
//       label: "Cylinders",
//       type: "select",
//       options: cylindersOptions,
//       onChange: cyilndersChangeHandler,
//       onBlur: cyilndersBlurHandler,
//       value: enteredCyilnders,
//       valid: cyilndersValid,
//       invalid: cyilndersInvalid,
//     },
//     {
//       label: "Description",
//       type: "textArea",
//       onChange: descChangeHandler,
//       onBlur: descBlurHandler,
//       value: enteredDesc,
//       valid: descValid,
//       invalid: descInvalid,
//     },
//     {
//       label: "Features",
//       type: "multiSelect",
//       options: featuresOptions,
//       onChange: featuresChangeHandler,
//       onBlur: featuresBlurHandler,
//       value: enteredFeatures,
//       valid: featuresValid,
//       invalid: featuresInvalid,
//     },
//     {
//       label: "Safety Features",
//       type: "multiSelect",
//       options: safetyFeaturesOptions,
//       onChange: safetyFeaturesChangeHandler,
//       onBlur: safetyFeaturesBlurHandler,
//       value: enteredSafetyFeatures,
//       valid: safetyFeaturesValid,
//       invalid: safetyFeaturesInvalid,
//     },
//     {
//       label: "Images",
//       type: "file",
//       onChange: imagesChangeHandler,
//       value: enteredImages,
//       valid: imagesValid,
//       invalid: imagesInvalid,
//     },
//   ];

//   /////////////
//   const randomId = Math.floor(Math.random() * 1000001).toString();
//   let dateObj = new Date();
//   let newDate = `${dateObj.getUTCDate()}/${
//     dateObj.getUTCMonth() + 1
//   }/${dateObj.getUTCFullYear()}`;
//   ////
//   const addListingHandler = () => {
//     let imgArray = [];
//     const [imagesInput] = listingsInputs.filter((ele) => ele.type === "file");
//     const enteredImagesArray = imagesInput.value;
//     Object.entries(enteredImagesArray).map((ele) => {
//       const imgName = Math.floor(Math.random() * 1000001) + ele[1].name;
//       const mainImgRef = ref(storage, `carImages/${randomId}/${imgName}`);
//       const imgRef = mainImgRef;
//       const uploadTask = uploadBytesResumable(imgRef, ele[1]);
//       let progress;
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           // console.log("Upload is " + progress + "% done");
//           console.log(progress);
//         },
//         (error) => {
//           // Handle unsuccessful uploads
//         },
//         () => {
//           // Handle successful uploads on complete
//         }
//       );
//       const mainImgUrl = `https://firebasestorage.googleapis.com/v0/b/cars-3a440.appspot.com/o/carImages%2F${randomId}%2F${imgName}?alt=media`;
//       imgArray.push(mainImgUrl);
//     });
//     ///
//     const addedCar = {
//       id: randomId,
//       addedDate: newDate,
//       approved: "approved",
//       uId: "775034",
//       uName: "Elsayed Elliethy",
//       type: enteredType.value,
//       make: enteredMake.value,
//       model: enteredModel,
//       status: enteredStatus.value,
//       category: enteredCategory.value,
//       price: enteredPrice,
//       year: enteredYear.value,
//       driveType: enteredDriveType.value,
//       transmission: enteredTransmission.value,
//       fuelType: enteredFuel.value,
//       color: enteredColor.value,
//       doors: enteredDoors.value,
//       mileage: enteredMileage,
//       engine: enteredEngine,
//       cylinders: enteredCyilnders.value,
//       description: enteredDesc,
//       features: enteredFeatures ? enteredFeatures.map((ele) => ele.value) : [],
//       safetyFeatures: enteredSafetyFeatures
//         ? enteredSafetyFeatures.map((ele) => ele.value)
//         : [],
//       carImages: imgArray,
//     };

//     ///////////////////
//     const transformData = (data) => {
//       setCars((prev) => [...prev, addedCar]);
//     };
//     requestFn(
//       {
//         url: `https://cars-3a440-default-rtdb.firebaseio.com/cars/${randomId}.json`,
//         method: "PUT",
//         body: addedCar,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       transformData
//     );
//     /////////
//     resetType();
//     resetMake();
//     resetModel();
//     resetStatus();
//     resetCategory();
//     resetPrice();
//     resetYear();
//     resetDriveType();
//     resetTransmission();
//     resetFuel();
//     resetColor();
//     resetDoors();
//     resetMileage();
//     resetEngine();
//     resetCyilnders();
//     resetDescription();
//     resetFeatures();
//     resetSafetyFeatures();
//     resetImages();
//   };
//   ////
//   return (
//     <>
//       <h1 className="text-center">Listings</h1>
//       <Table
//         columns={listingsColumns}
//         data={listingsData}
//         updateMyData={updateListings}
//         approveCarHandler={approveListingsHandler}
//         deleteHandler={deleteListingHandler}
//         filterPlaceholder={`Search ${listingsData.length} listings `}
//       />
//       <AdditionComponent
//         title={"Add Listing"}
//         inputs={listingsInputs}
//         formValidation={formValid}
//         addHandler={addListingHandler}
//         isLoading={isLoading}
//         error={error}
//       />
//     </>
//   );
// };

// export default Listings;
