import React from "react";
import useInput2 from "../../hook/use-input";
import AuthForm from "./AuthForm";

const isNotEmpty = (value) => {
  return value.trim() !== "";
};
const isEmail = (value) => {
  return value.includes("@" && ".com");
};
const isPass = (value) => {
  return value.trim().length >= 7;
};
const isPhone = (value) => {
  return value.trim().length === 11;
};
const Signup = () => {
  const {
    enteredvalue: enteredName,
    inputValid: nameValid,
    inputInvalid: nameInvalid,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput2(isNotEmpty);
  const {
    enteredvalue: enteredEmail,
    inputValid: emailValid,
    inputInvalid: emailInvalid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput2(isEmail);

  const {
    enteredvalue: enteredPassword,
    inputValid: passwordValid,
    inputInvalid: passwordInvalid,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput2(isPass);

  const {
    enteredvalue: enteredPhone,
    inputValid: phoneValid,
    inputInvalid: phoneInvalid,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
  } = useInput2(isPhone);
  const {
    enteredvalue: enteredAddress,
    inputValid: addressValid,
    inputInvalid: addressInvalid,
    inputChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
  } = useInput2(isNotEmpty);
  const {
    enteredvalue: enteredType,
    inputValid: typeValid,
    inputInvalid: typeInvalid,
    inputChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler,
  } = useInput2(isNotEmpty);

  const signupInputs = [
    {
      label: "Name",
      type: "text",
      onChange: nameChangeHandler,
      onBlur: nameBlurHandler,
      value: enteredName,
      valid: nameValid,
      invalid: nameInvalid,
      error: "please, enter a valid name",
    },
    {
      label: "Email",
      type: "email",
      onChange: emailChangeHandler,
      onBlur: emailBlurHandler,
      value: enteredEmail,
      valid: emailValid,
      invalid: emailInvalid,
      error: "please, enter a valid email",
    },
    {
      label: "Password",
      type: "password",
      onChange: passwordChangeHandler,
      onBlur: passwordBlurHandler,
      value: enteredPassword,
      valid: passwordValid,
      invalid: passwordInvalid,
      error: "password must be larger than 7 digits",
    },
    {
      label: "Phone",
      type: "text",
      onChange: phoneChangeHandler,
      onBlur: phoneBlurHandler,
      value: enteredPhone,
      valid: phoneValid,
      invalid: phoneInvalid,
      error: "please, enter a valid phone",
    },
    {
      label: "Address",
      type: "text",
      onChange: addressChangeHandler,
      onBlur: addressBlurHandler,
      value: enteredAddress,
      valid: addressValid,
      invalid: addressInvalid,
      error: "please, enter a valid address",
    },
    {
      label: "Type",
      type: "radio",
      onChange: typeChangeHandler,
      onBlur: typeBlurHandler,
      value: enteredType,
      valid: typeValid,
      invalid: typeInvalid,
      options: [
        { value: "Private seller", label: "Private seller" },
        { value: "Business seller", label: "Business seller" },
      ],
    },
  ];
  let formValid = false;
  if (
    nameValid &&
    emailValid &&
    passwordValid &&
    phoneValid &&
    addressValid &&
    typeValid
  ) {
    formValid = true;
  }
  const signupBody = {
    name: enteredName,
    email: enteredEmail,
    password: enteredPassword,
    phone: enteredPhone,
    address: enteredAddress,
    type: enteredType,
  };
  console.log(signupBody);
  return (
    <AuthForm
      type={"Sign Up"}
      btnContent={"Login with existing account"}
      inputs={signupInputs}
      body={signupBody}
      formValidation={formValid}
    />
  );
};

export default Signup;
