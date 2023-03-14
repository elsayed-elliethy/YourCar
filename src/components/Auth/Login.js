import React from "react";
import useInput2 from "../../hook/use-input";
import AuthForm from "./AuthForm";

const isEmail = (value) => {
  return value.includes("@" && ".com");
};
const isPass = (value) => {
  return value.trim().length >= 7;
};
const Login = () => {
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

  const loginInputs = [
    {
      label: "Email",
      type: "email",
      onChange: emailChangeHandler,
      onBlur: emailBlurHandler,
      value: enteredEmail,
      valid: emailValid,
      invalid: emailInvalid,
      name: "email",
    },
    {
      label: "Password",
      type: "password",
      onChange: passwordChangeHandler,
      onBlur: passwordBlurHandler,
      value: enteredPassword,
      valid: passwordValid,
      invalid: passwordInvalid,
      name: "password",
    },
  ];
  let formValid = false;
  if (emailValid && passwordValid) {
    formValid = true;
  }
  const loginBody = {
    email: enteredEmail,
    password: enteredPassword,
  };
  return (
    <AuthForm
      type={"login"}
      btnContent={"Create Account"}
      inputs={loginInputs}
      body={loginBody}
      formValidation={formValid}
    />
  );
};

export default Login;
