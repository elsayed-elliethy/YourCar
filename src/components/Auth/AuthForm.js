import { Fragment, useEffect, useState } from "react";
import useHttp from "../../hook/use-http";
import useInput2 from "../../hook/use-input";
import { authActions } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import classes from "./AuthForm.module.css";
import { useLocation, useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const isName = (value) => {
  // return parseInt(value) = 0;
  return value;
};
const isEmail = (value) => {
  return value.includes("@" && ".com");
};
const isPass = (value) => {
  return value.trim().length === 7;
};
const isPhone = (value) => {
  return value.trim().length === 11;
};

const AuthForm = (props) => {
  const navigation = useNavigate();
  const apiKey = "AIzaSyDai1GcLEq1Gfe84Bz-atCmrCvKTc9pJK8";
  const signupApi = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
  const signinApi = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
  // const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeLogin = queryParams.get("type") === "login";
  const switchAuthModeHandler = () => {
    // history.push("/auth?type=" + (typeLogin ? "signup" : "login"));

    navigation("/auth?type=" + (typeLogin ? "signup" : "login"));
    setIsLogin((prevState) => !prevState);
  };
  // console.log(parseInt("4hhh12"));
  const {
    enteredvalue: enteredName,
    inputValid: nameValid,
    inputInvalid: nameInvalid,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
    inputClasses: nameCalsses,
  } = useInput2(isName);
  const {
    enteredvalue: enteredEmail,
    inputValid: emailValid,
    inputInvalid: emailInvalid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
    inputClasses: emailCalsses,
  } = useInput2(isEmail);

  const {
    enteredvalue: enteredPass,
    inputValid: passValid,
    inputInvalid: passInvalid,
    inputChangeHandler: passChangeHandler,
    inputBlurHandler: passBlurHandler,
    reset: resetPass,
    inputClasses: passCalsses,
  } = useInput2(isPass);

  const {
    enteredvalue: enteredPhone,
    inputValid: PhoneValid,
    inputInvalid: phoneInvalid,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhone,
    inputClasses: phoneCalsses,
  } = useInput2(isPhone);

  let formValid = false;
  if (emailValid && passValid) {
    formValid = true;
  }

  const dispatch = useDispatch();

  //////

  const { isLoading, error, requestFn } = useHttp();
  const submitHandler = (event) => {
    event.preventDefault();

    if (!formValid) {
      return;
    }
    console.log(`Email : ${enteredEmail}`);
    console.log(`Password : ${enteredPass}`);
    const name = enteredName;
    const mail = enteredEmail;
    const pass = enteredPass;
    const phone = enteredPhone;
    resetName();
    resetEmail();
    resetPass();
    resetPhone();

    if (typeLogin) {
      const transformData = (data) => {
        setIsSubmit(true);
        const expirTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        dispatch(
          authActions.login({
            tok: data.idToken,
            expir: expirTime.toISOString(),
          })
        );
        localStorage.setItem("token", data.idToken);
        localStorage.setItem("expirationTime", expirTime.toISOString());
        navigation("/");
      };
      requestFn(
        {
          url: signinApi,
          method: "POST",
          body: {
            email: mail,
            password: pass,
            returnSecureToken: true,
          },
          headers: {
            "Content-Type": "application/json",
          },
        },
        transformData
      );
    } else {
      const transformData = (data) => {
        setIsSubmit(true);
        navigation("/auth?type=login");
      };
      requestFn(
        {
          url: signupApi,
          method: "POST",
          body: {
            displayName: name,
            email: mail,
            password: pass,
            // phone: phone,
            returnSecureToken: true,
          },
          headers: {
            "Content-Type": "application/json",
          },
        },
        transformData
      );
    }
  };
  const loginContent = (
    <Fragment>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${emailCalsses}`}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
            required
          />
          {emailInvalid && (
            <p className={classes["error-text"]}>Type a Valid Email</p>
          )}
        </div>
        <div className={`${classes.control} ${passCalsses}`}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            onChange={passChangeHandler}
            onBlur={passBlurHandler}
            value={enteredPass}
            required
          />
          {passInvalid && (
            <p className={classes["error-text"]}>
              Password Must Be larger Than 7 Numbers
            </p>
          )}
        </div>
        <div className={classes.actions}>
          <button disabled={!formValid}>
            {isLogin ? "Login" : "Create Account"}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            Create new account
          </button>
        </div>
      </form>
    </Fragment>
  );

  const signupContent = (
    <Fragment>
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${emailCalsses}`}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
            required
          />
          {nameInvalid && (
            <p className={classes["error-text"]}>Type a Valid Name</p>
          )}
        </div>
        <div className={`${classes.control} ${emailCalsses}`}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
            required
          />
          {emailInvalid && (
            <p className={classes["error-text"]}>Type a Valid Email</p>
          )}
        </div>
        <div className={`${classes.control} ${passCalsses}`}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            onChange={passChangeHandler}
            onBlur={passBlurHandler}
            value={enteredPass}
            required
          />
          {passInvalid && (
            <p className={classes["error-text"]}>
              Password Must Be larger Than 7 Numbers
            </p>
          )}
        </div>

        <div className={classes.actions}>
          <button disabled={!formValid}>
            {isLogin ? "Login" : "Create Account"}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            Login with existing account
          </button>
        </div>
      </form>
    </Fragment>
  );
  let content = isLogin ? loginContent : signupContent;
  if (isLoading) {
    content = <p>Sending Request...</p>;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (!isLoading && !error && isSubmit) {
    content = <p>Congratulations</p>;
  }

  return <section className={classes.auth}>{content}</section>;
};

export default AuthForm;
