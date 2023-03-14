import React, { Component, useState, useReducer } from "react";
import styles from "../components/Auth/AuthForm.module.css";
const InputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { enteredvalue: action.val, inputTouch: state.inputTouch };
  }
  ////
  if (action.type === "SELECT") {
    return { enteredvalue: action.val, inputTouch: state.inputTouch };
  }
  ////
  ////
  if (action.type === "MULTISELECT") {
    return { enteredvalue: action.val, inputTouch: state.inputTouch };
  }
  ////
  if (action.type === "BLUR") {
    return { enteredvalue: state.enteredvalue, inputTouch: action.touch };
  }
  if (action.type === "RESET") {
    return { enteredvalue: "", inputTouch: false };
  }
  ////
  // if (action.type === "RESETSELECT") {
  //   return { enteredvalue: "", inputTouch: false };
  // }
  ////
  return { enteredvalue: "", inputTouch: false };
};

const useInput2 = (checkValid) => {
  const [inputState, dispatchInput] = useReducer(InputReducer, {
    enteredvalue: "",
    inputTouch: false,
  });
  const inputValid = checkValid(inputState.enteredvalue);
  const inputInvalid = !inputValid && inputState.inputTouch;

  const inputChangeHandler = (event) => {
    dispatchInput({ type: "INPUT", val: event.target.value });
  };
  const inputBlurHandler = (e) => {
    dispatchInput({ type: "BLUR", touch: true });
  };
  const reset = () => {
    dispatchInput({ type: "RESET" });
  };
  // const resetSelect = () => {
  //   dispatchInput({ type: "RESETSELECT" });
  // };
  const inputClasses = inputInvalid
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

  const selectChangeHandler = (choice) => {
    dispatchInput({ type: "SELECT", val: choice });
    // dispatchInput({ type: "SELECT", val: choice.value });
  };
  const multiSelectChangeHandler = (choice) => {
    dispatchInput({ type: "MULTISELECT", val: choice });
  };
  return {
    enteredvalue: inputState.enteredvalue,
    inputValid,
    inputInvalid,
    inputChangeHandler,
    inputBlurHandler,
    reset,
    selectChangeHandler,
    multiSelectChangeHandler,
  };
};
export default useInput2;
