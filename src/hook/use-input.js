import React, { Component, useState, useReducer } from "react";
import styles from "../components/Auth/AuthForm.module.css";
const InputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { enteredvalue: action.val, inputTouch: state.inputTouch };
  }
  if (action.type === "BLUR") {
    return { enteredvalue: state.enteredvalue, inputTouch: action.touch };
  }
  if (action.type === "RESET") {
    return { enteredvalue: "", inputTouch: false };
  }
  //

  //
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
  const inputBlurHandler = () => {
    dispatchInput({ type: "BLUR", touch: true });
  };

  const reset = () => {
    dispatchInput({ type: "RESET" });
  };

  ///

  ///
  const inputClasses = inputInvalid
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

  return {
    enteredvalue: inputState.enteredvalue,
    inputValid,
    inputInvalid,
    inputChangeHandler,
    inputBlurHandler,
    reset,
    inputClasses,

    ///
  };
};
export default useInput2;
