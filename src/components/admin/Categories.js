import React, { Fragment, useMemo, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useHttp from "../../hook/use-http";
import styles from "../admin/additionComponent/additionComponent.module.css";
import Table from "./table/Table";
import { IoAddCircle } from "react-icons/io5";
const Categories = () => {
  const getCategories = `https://cars-3a440-default-rtdb.firebaseio.com/categories.json`;
  const { isLoading, error, requestFn } = useHttp();
  const [categories, setCategories] = useState([]);
  const getCars = `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`;
  const [cars, setCars] = useState([]);
  /////getCategories///
  useEffect(() => {
    const transformData = (data) => {
      let loadedCategories = [];
      Object.entries(data).map((ele) => {
        loadedCategories.push({
          ...ele[1],
          num: cars.filter((el) => el.category === ele[1].name).length,
        });
      });
      setCategories(loadedCategories);
    };
    requestFn(
      {
        url: getCategories,
      },
      transformData
    );
  }, [requestFn, getCategories, cars]);
  /////getCars///
  useEffect(() => {
    const transformData = (data) => {
      let loadedCars = [];
      Object.entries(data).map((ele) => {
        loadedCars.push(ele[1]);
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
  ////
  const categoriesData = useMemo(() => categories, [categories]);
  const categoriesColumns = React.useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
        sticky: "left",
        // maxWidth: 150,
        // minWidth: 100,
        width: 80,
        // collapse: true,
      },
      {
        Header: "Name",
        accessor: "name",
        width: 200,
      },
      {
        Header: "Type",
        accessor: "type",
        width: 150,
      },
      {
        Header: "Description",
        accessor: "desc",
        width: 300,
      },

      {
        Header: "Allow ads",
        accessor: "allowAds",
        width: 142,
      },

      {
        Header: "Added Date",
        accessor: "addedDate",
        width: 200,
      },
      {
        Header: "Number of cars",
        accessor: "num",
      },
      {
        Header: "Actions",
        accessor: "",
        Cell: "actions",
        sticky: "right",
        width: 70,
      },
    ],
    []
  );
  const updateCategories = (rowIndex, columnId, value) => {
    const transformData = (data) => {};
    requestFn(
      {
        url: `https://cars-3a440-default-rtdb.firebaseio.com/categories/${categoriesData[rowIndex].id}.json`,
        method: "PATCH",
        body: {
          ...categoriesData[rowIndex],
          [columnId]: value,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformData
    );
  };
  const deleteCategoryHandler = (catId) => {
    const updatedList = categories.filter((ele) => {
      return ele.id !== catId;
    });
    setCategories(updatedList);
    requestFn({
      url: `https://cars-3a440-default-rtdb.firebaseio.com/categories/${catId}.json`,
      method: "DELETE",
    });
  };
  const approveListingsHandler = (id) => {};
  return (
    <div className={styles.mainDiv}>
      <h1 className="text-center">Categories</h1>
      <Table
        columns={categoriesColumns}
        data={categoriesData}
        updateMyData={updateCategories}
        deleteHandler={deleteCategoryHandler}
        approveCarHandler={approveListingsHandler}
        filterPlaceholder={`Search ${categoriesData.length} categories `}
        btnContent="Add category"
        link="/adminDashboard/categories/addCategory"
      />
    </div>
  );
};

export default Categories;
///////
// import React, { Fragment, useMemo, useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import useHttp from "../../hook/use-http";
// import useInput2 from "../../hook/use-input";
// import AdditionComponent from "./additionComponent/additionComponent";
// import styles from "../admin/additionComponent/additionComponent.module.css";
// import Table from "./table/Table";
// import { GrFormAdd } from "react-icons/gr";
// ///valid conditions///
// const isEmpty = (value) => {
//   return value.trim().length !== 0;
// };
// const isSelected = (value) => {
//   return value !== "";
// };
// const Categories = () => {
//   const getCategories = `https://cars-3a440-default-rtdb.firebaseio.com/categories.json`;
//   const { isLoading, error, requestFn } = useHttp();
//   const [categories, setCategories] = useState([]);
//   const getCars = `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`;
//   const [cars, setCars] = useState([]);
//   /////getCategories///
//   useEffect(() => {
//     const transformData = (data) => {
//       let loadedCategories = [];
//       Object.entries(data).map((ele) => {
//         loadedCategories.push({
//           ...ele[1],
//           num: cars.filter((el) => el.category === ele[1].name).length,
//         });
//       });
//       setCategories(loadedCategories);
//     };
//     requestFn(
//       {
//         url: getCategories,
//       },
//       transformData
//     );
//   }, [requestFn, getCategories, cars]);
//   /////getCars///
//   useEffect(() => {
//     const transformData = (data) => {
//       let loadedCars = [];
//       Object.entries(data).map((ele) => {
//         loadedCars.push(ele[1]);
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
//   ////
//   const categoriesData = useMemo(() => categories, [categories]);
//   const categoriesColumns = React.useMemo(
//     () => [
//       {
//         Header: "Id",
//         accessor: "id",
//         sticky: "left",
//         // maxWidth: 150,
//         // minWidth: 100,
//         width: 80,
//         // collapse: true,
//       },
//       {
//         Header: "Name",
//         accessor: "name",
//         width: 200,
//       },
//       {
//         Header: "Type",
//         accessor: "type",
//         width: 150,
//       },
//       {
//         Header: "Description",
//         accessor: "desc",
//         width: 300,
//       },

//       {
//         Header: "Allow ads",
//         accessor: "allowAds",
//         width: 142,
//       },

//       {
//         Header: "Added Date",
//         accessor: "addedDate",
//         width: 200,
//       },
//       {
//         Header: "Number of cars",
//         accessor: "num",
//       },
//       {
//         Header: "Actions",
//         accessor: "",
//         Cell: "actions",
//         sticky: "right",
//         width: 70,
//       },
//     ],
//     []
//   );
//   const updateCategories = (rowIndex, columnId, value) => {
//     const transformData = (data) => {};
//     requestFn(
//       {
//         url: `https://cars-3a440-default-rtdb.firebaseio.com/categories/${categoriesData[rowIndex].id}.json`,
//         method: "PATCH",
//         body: {
//           ...categoriesData[rowIndex],
//           [columnId]: value,
//         },
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       transformData
//     );
//   };
//   const deleteCategoryHandler = (catId) => {
//     const updatedList = categories.filter((ele) => {
//       return ele.id !== catId;
//     });
//     setCategories(updatedList);
//     requestFn({
//       url: `https://cars-3a440-default-rtdb.firebaseio.com/categories/${catId}.json`,
//       method: "DELETE",
//     });
//   };
//   const approveListingsHandler = (id) => {};
//   ////add category
//   const {
//     enteredvalue: enteredName,
//     inputValid: nameValid,
//     inputInvalid: nameInvalid,
//     inputChangeHandler: nameChangeHandler,
//     inputBlurHandler: nameBlurHandler,
//     reset: resetName,
//   } = useInput2(isEmpty);
//   const {
//     enteredvalue: enteredType,
//     inputValid: typeValid,
//     inputInvalid: typeInvalid,
//     inputChangeHandler: typeChangeHandler,
//     inputBlurHandler: typeBlurHandler,
//     reset: resetType,
//   } = useInput2(isEmpty);
//   const {
//     enteredvalue: enteredDesc,
//     inputValid: descValid,
//     inputInvalid: descInvalid,
//     inputChangeHandler: descChangeHandler,
//     inputBlurHandler: descBlurHandler,
//     reset: resetDescription,
//   } = useInput2(isEmpty);
//   const {
//     enteredvalue: enteredAllowAds,
//     inputValid: allowAdsValid,
//     inputInvalid: allowAdsInvalid,
//     selectChangeHandler: allowAdsChangeHandler,
//     inputBlurHandler: allowAdsBlurHandler,
//     reset: resetAllowAds,
//   } = useInput2(isSelected);
//   const allowAdsOptions = [
//     { value: "Yes", label: "Yes" },
//     { value: "No", label: "No" },
//   ];
//   const categoryInputs = [
//     {
//       label: "Name",
//       type: "text",
//       onChange: nameChangeHandler,
//       onBlur: nameBlurHandler,
//       value: enteredName,
//       valid: nameValid,
//       invalid: nameInvalid,
//     },
//     {
//       label: "Type",
//       type: "text",
//       onChange: typeChangeHandler,
//       onBlur: typeBlurHandler,
//       value: enteredType,
//       valid: typeValid,
//       invalid: typeInvalid,
//     },
//     {
//       label: "Allow Ads",
//       type: "select",
//       options: allowAdsOptions,
//       onChange: allowAdsChangeHandler,
//       onBlur: allowAdsBlurHandler,
//       value: enteredAllowAds,
//       valid: allowAdsValid,
//       invalid: allowAdsInvalid,
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
//   ];
//   let formValid = false;
//   if (nameValid && typeValid && descValid && allowAdsValid) {
//     formValid = true;
//   }
//   /////////////
//   const randomId = Math.floor(Math.random() * 1000001).toString();
//   let dateObj = new Date();
//   let newDate = `${dateObj.getUTCDate()}/${
//     dateObj.getUTCMonth() + 1
//   }/${dateObj.getUTCFullYear()}`;
//   ////
//   const addCategoryHandler = () => {
//     const addedCategory = {
//       id: randomId,
//       addedDate: newDate,
//       name: enteredName,
//       type: enteredType,
//       desc: enteredDesc,
//       allowAds: enteredAllowAds.value,
//     };
//     ///////////////////
//     const transformData = (data) => {
//       const listedCategory = { ...addedCategory, num: 0 };
//       setCategories((prev) => [...prev, listedCategory]);
//     };
//     requestFn(
//       {
//         url: `https://cars-3a440-default-rtdb.firebaseio.com/categories/${randomId}.json`,
//         method: "PUT",
//         body: addedCategory,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       transformData
//     );
//     /////////
//     resetName();
//     resetType();
//     resetDescription();
//     resetAllowAds();
//   };
//   return (
//     <>
//       <h1 className="text-center">Categories</h1>
//       <Table
//         columns={categoriesColumns}
//         data={categoriesData}
//         updateMyData={updateCategories}
//         deleteHandler={deleteCategoryHandler}
//         approveCarHandler={approveListingsHandler}
//         filterPlaceholder={`Search ${categoriesData.length} categories `}
//       />
//       <button className={`d-block ${styles.addBtn}`}>
//         <NavLink to={"/adminDashboard/categories/addCategory"}>
//           <GrFormAdd className="fs-2 mb-1" />
//           Add
//         </NavLink>
//       </button>
//       <AdditionComponent
//         title={"Add Category"}
//         inputs={categoryInputs}
//         formValidation={formValid}
//         addHandler={addCategoryHandler}
//         isLoading={isLoading}
//         error={error}
//       />
//     </>
//   );
// };

// export default Categories;
