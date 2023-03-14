import React, { Component, useState, useReducer } from "react";

const inputFileReducer = (state, action) => {
  if (action.type === "FILE") {
    return { enteredImages: action.val, inputFileTouch: true };
  }
  if (action.type === "FILERESET") {
    return { enteredImages: {}, inputFileTouch: false };
  }
  return { enteredImages: {}, inputFileTouch: false };
};

const useInputFileEdit = (checkValid) => {
  const [inputFileState, dispatchInputFile] = useReducer(inputFileReducer, {
    enteredImages: {},
    inputFileTouch: false,
  });
  ///

  // const fileValid = checkValid(inputFileState.enteredImages);

  let fileValid = true;
  if (
    inputFileState.inputFileTouch === true &&
    checkValid(inputFileState.enteredImages) === false
  ) {
    fileValid = false;
  }
  if (
    inputFileState.inputFileTouch === true &&
    checkValid(inputFileState.enteredImages) === true
  ) {
    fileValid = true;
  }

  const fileInvalid = !fileValid && inputFileState.inputFileTouch;
  const fileChangeHandler = (event) => {
    dispatchInputFile({ type: "FILE", val: event.target.files });
  };

  const resetFile = () => {
    dispatchInputFile({ type: "FILERESET" });
  };

  ///

  return {
    ///
    enteredImages: inputFileState.enteredImages,
    fileValid,
    fileInvalid,
    fileChangeHandler,
    resetFile,
  };
};
export default useInputFileEdit;
