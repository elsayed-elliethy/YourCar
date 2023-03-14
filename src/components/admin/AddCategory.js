import React from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hook/use-http";
import useInput2 from "../../hook/use-input";
import AdditionComponent from "./additionComponent/additionComponent";

///valid conditions///
const isEmpty = (value) => {
  return value.trim().length !== 0;
};
const isSelected = (value) => {
  return value !== "";
};
const AddCategory = () => {
  const { isLoading, error, requestFn } = useHttp();
  ////add category
  const {
    enteredvalue: enteredName,
    inputValid: nameValid,
    inputInvalid: nameInvalid,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput2(isEmpty);
  const {
    enteredvalue: enteredType,
    inputValid: typeValid,
    inputInvalid: typeInvalid,
    inputChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler,
    reset: resetType,
  } = useInput2(isEmpty);
  const {
    enteredvalue: enteredDesc,
    inputValid: descValid,
    inputInvalid: descInvalid,
    inputChangeHandler: descChangeHandler,
    inputBlurHandler: descBlurHandler,
    reset: resetDescription,
  } = useInput2(isEmpty);
  const {
    enteredvalue: enteredAllowAds,
    inputValid: allowAdsValid,
    inputInvalid: allowAdsInvalid,
    selectChangeHandler: allowAdsChangeHandler,
    inputBlurHandler: allowAdsBlurHandler,
    reset: resetAllowAds,
  } = useInput2(isSelected);
  const allowAdsOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];
  const categoryInputs = [
    {
      label: "Name",
      type: "text",
      onChange: nameChangeHandler,
      onBlur: nameBlurHandler,
      value: enteredName,
      valid: nameValid,
      invalid: nameInvalid,
    },
    {
      label: "Type",
      type: "text",
      onChange: typeChangeHandler,
      onBlur: typeBlurHandler,
      value: enteredType,
      valid: typeValid,
      invalid: typeInvalid,
    },
    {
      label: "Allow Ads",
      type: "select",
      options: allowAdsOptions,
      onChange: allowAdsChangeHandler,
      onBlur: allowAdsBlurHandler,
      value: enteredAllowAds,
      valid: allowAdsValid,
      invalid: allowAdsInvalid,
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
  ];
  let formValid = false;
  if (nameValid && typeValid && descValid && allowAdsValid) {
    formValid = true;
  }
  /////////////
  const randomId = Math.floor(Math.random() * 1000001).toString();
  let dateObj = new Date();
  let newDate = `${dateObj.getUTCDate()}/${
    dateObj.getUTCMonth() + 1
  }/${dateObj.getUTCFullYear()}`;
  ////
  const navigate = useNavigate();
  const addCategoryHandler = () => {
    const addedCategory = {
      id: randomId,
      addedDate: newDate,
      name: enteredName,
      type: enteredType,
      desc: enteredDesc,
      allowAds: enteredAllowAds.value,
    };
    ///////////////////
    const transformData = (data) => {
      navigate("/adminDashboard/categories");
    };
    requestFn(
      {
        url: `https://cars-3a440-default-rtdb.firebaseio.com/categories/${randomId}.json`,
        method: "PUT",
        body: addedCategory,
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformData
    );
    /////////
  };
  return (
    <AdditionComponent
      title={"Add Category"}
      inputs={categoryInputs}
      formValidation={formValid}
      addHandler={addCategoryHandler}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default AddCategory;
