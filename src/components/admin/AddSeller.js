import React from "react";
import { redirect, useNavigate, useNavigation } from "react-router-dom";
import useHttp from "../../hook/use-http";
import useInput2 from "../../hook/use-input";
import AdditionComponent from "./additionComponent/additionComponent";
///valid conditions///
const isEmpty = (value) => {
  return value.trim().length !== 0;
};
const isEmail = (value) => {
  return value.includes("@" && ".com");
};
const isPhone = (value) => {
  return isNaN(value) === false && value.length === 11;
};
const isSelected = (value) => {
  return value !== "";
};
const AddSeller = () => {
  const { isLoading, error, requestFn } = useHttp();
  ///add user///
  const {
    enteredvalue: enteredName,
    inputValid: nameValid,
    inputInvalid: nameInvalid,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput2(isEmpty);
  const {
    enteredvalue: enteredEmail,
    inputValid: emailValid,
    inputInvalid: emailInvalid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput2(isEmail);
  const {
    enteredvalue: enteredAddress,
    inputValid: addressValid,
    inputInvalid: addressInvalid,
    inputChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput2(isEmpty);
  const {
    enteredvalue: enteredType,
    inputValid: typeValid,
    inputInvalid: typeInvalid,
    selectChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler,
    reset: resetType,
  } = useInput2(isSelected);
  const {
    enteredvalue: enteredPhone,
    inputValid: phoneValid,
    inputInvalid: phoneInvalid,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhone,
  } = useInput2(isPhone);

  const typeOptions = [
    { value: "Business seller", label: "Business seller" },
    { value: "Private seller", label: "Private seller" },
  ];
  const usersInputs = [
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
      label: "Email",
      type: "email",
      onChange: emailChangeHandler,
      onBlur: emailBlurHandler,
      value: enteredEmail,
      valid: emailValid,
      invalid: emailInvalid,
    },
    {
      label: "Address",
      type: "text",
      onChange: addressChangeHandler,
      onBlur: addressBlurHandler,
      value: enteredAddress,
      valid: addressValid,
      invalid: addressInvalid,
    },
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
      label: "Phone",
      type: "text",
      onChange: phoneChangeHandler,
      onBlur: phoneBlurHandler,
      value: enteredPhone,
      valid: phoneValid,
      invalid: phoneInvalid,
    },
  ];
  let formValid = false;
  if (nameValid && emailValid && addressValid && phoneValid) {
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
  const addUserHandler = () => {
    const addedUser = {
      id: randomId,
      addedDate: newDate,
      name: enteredName,
      email: enteredEmail,
      address: enteredAddress,
      type: enteredType.value,
      phone: enteredPhone,
    };
    ///////////////////
    const transformData = (data) => {
      navigate("/adminDashboard/users");
    };
    requestFn(
      {
        url: `https://cars-3a440-default-rtdb.firebaseio.com/users/${randomId}.json`,
        method: "PUT",
        body: addedUser,
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
      title={"Add User"}
      inputs={usersInputs}
      formValidation={formValid}
      addHandler={addUserHandler}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default AddSeller;
