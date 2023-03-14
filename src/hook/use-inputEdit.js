import React, { Component, useState, useReducer } from "react";
const InputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { enteredvalue: action.val, inputTouch: state.inputTouch };
  }
  if (action.type === "BLUR") {
    return { enteredvalue: state.enteredvalue, inputTouch: action.touch };
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
  return { enteredvalue: "", inputTouch: false };
};

const useInputEdit = (checkValid) => {
  const [inputState, dispatchInput] = useReducer(InputReducer, {
    enteredvalue: "",
    inputTouch: false,
  });
  let inputValid = true;
  if (
    inputState.inputTouch === true &&
    checkValid(inputState.enteredvalue) === false
  ) {
    inputValid = false;
  }
  if (
    inputState.inputTouch === true &&
    checkValid(inputState.enteredvalue) === true
  ) {
    inputValid = true;
  }
  const inputInvalid = !inputValid && inputState.inputTouch;

  const inputChangeHandler = (event) => {
    dispatchInput({ type: "INPUT", val: event.target.value });
  };
  const inputBlurHandler = (e) => {
    dispatchInput({ type: "BLUR", touch: true });
  };
  const selectChangeHandler = (choice) => {
    dispatchInput({ type: "SELECT", val: choice });
  };

  return {
    enteredvalue: inputState.enteredvalue,
    inputValid,
    inputInvalid,
    inputChangeHandler,
    inputBlurHandler,
    ///
    selectChangeHandler,
  };
};
export default useInputEdit;
