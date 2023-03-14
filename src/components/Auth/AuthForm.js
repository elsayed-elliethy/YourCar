import { Fragment  } from "react";

import classes from "./AuthForm.module.css";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

const AuthForm = () => {
  const usersApi = `https://cars-3a440-default-rtdb.firebaseio.com/users.json`;
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  //
  const validationData = useActionData();
  console.log(validationData);
  let errorsContent;
  let authenticationContent;
  if (validationData) {
    errorsContent = validationData.errors && (
      <>
        <ul className="list-unstyled text-start">
          {Object.values(validationData.errors).map((err) => (
            <li key={err} className={`${classes["error-text"]}`}>
              {err}
            </li>
          ))}
        </ul>
        {/* {validationData.message && <p>{validationData.message}</p>} */}
      </>
    );
    authenticationContent = <p>{validationData.message}</p>;
  }
  //
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const loginInputs = [
    {
      label: "Email",
      type: "email",
    },
    {
      label: "Password",
      type: "password",
    },
  ];
  const signupInputs = [
    {
      label: "Name",
      type: "text",
      error: "please, enter a valid name",
    },
    {
      label: "Email",
      type: "email",
      error: "please, enter a valid email",
    },
    {
      label: "Password",
      type: "password",
      error: "password must be larger than 7 digits",
    },
    {
      label: "Phone",
      type: "text",
      error: "please, enter a valid phone",
    },
    {
      label: "Address",
      type: "text",
      error: "please, enter a valid address",
    },
    {
      label: "Type",
      type: "radio",
      options: [
        { value: "Private seller", label: "Private seller" },
        { value: "Business seller", label: "Business seller" },
      ],
    },
  ];
  const loginContent = (
    <div className={classes.auth}>
      <h1 className="text-center mb-3">Log in</h1>
      <Form method="post">
        {errorsContent}
        {loginInputs.map((input) => {
          return (
            <div
              key={input.label}
              className={
                input.invalid
                  ? `${classes.control} ${classes.invalid}`
                  : classes.control
              }
            >
              <label htmlFor={input.label.toLowerCase()} className="text-start">
                {input.label}
              </label>
              <input
                type={input.type}
                id={input.label.toLowerCase()}
                name={input.label.toLowerCase()}
              />
              {input.invalid && (
                <p className={classes["error-text"]}>{input.error}</p>
              )}
            </div>
          );
        })}
        <div className={classes.actions}>
          <button disabled={isSubmitting}>
            {isSubmitting ? "submitting..." : "login"}
          </button>
          <Link className={classes.toggle} to={`/auth?mode=signup`}>
            Create new user
          </Link>
        </div>
        {authenticationContent}
      </Form>
    </div>
  );
  const signupContent = (
    <div className={classes.auth}>
      <h1 className="text-center mb-3">Sign up</h1>
      <Form method="post">
        {errorsContent}
        {signupInputs.map((input) => {
          if (input.type !== "radio") {
            return (
              <div
                key={input.label}
                className={
                  input.invalid
                    ? `${classes.control} ${classes.invalid}`
                    : classes.control
                }
              >
                <label
                  htmlFor={input.label.toLowerCase()}
                  className="text-start"
                >
                  {input.label}
                </label>
                <input
                  type={input.type}
                  id={input.label.toLowerCase()}
                  name={input.label.toLowerCase()}
                  onChange={input.onChange}
                  onBlur={input.onBlur}
                  value={input.value}
                />
                {input.invalid && (
                  <p className={classes["error-text"]}>{input.error}</p>
                )}
              </div>
            );
          } else {
            return (
              <div
                key={input.label}
                className="d-flex justify-content-evenly mt-3"
              >
                {input.options.map((option) => {
                  return (
                    <div key={option.label}>
                      <input
                        type={input.type}
                        id={option.label}
                        name={input.label.toLowerCase()}
                        value={option.value}
                        onChange={input.onChange}
                      />
                      <label htmlFor={option.label} className="d-inline ms-1">
                        {option.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            );
          }
        })}
        <div className={classes.actions}>
          <button disabled={isSubmitting}>
            {isSubmitting ? "submitting..." : "signup"}
          </button>
          <Link className={classes.toggle} to={`/auth?mode=login`}>
            Login with existing account
          </Link>
        </div>
        {authenticationContent}
      </Form>
    </div>
  );
  return (
    <Fragment>
      {isLogin ? loginContent : signupContent}
      {/* <p>auth form </p> */}
      {/* <p className={`text-center ${classes.error}`}>{resultError}</p> */}
    </Fragment>
  );
};

export default AuthForm;
///////////

export const authenticationActions = async ({ request, params }) => {
  const data = await request.formData();
  console.log(data.get("password"));
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  console.log(mode);
  ////
  const errors = {};
  // validate the fields
  if (mode === "login") {
    if (!data.get("email").includes("@" && ".com")) {
      errors.email = "invalid email";
    }
    if (data.get("password").trim().length < 7) {
      errors.position = "invalid password";
    }
  } else {
    if (data.get("name").trim().length === 0) {
      errors.name = "invalid name";
    }
    if (!data.get("email").includes("@" && ".com")) {
      errors.email = "invalid email";
    }
    if (data.get("password").trim().length < 7) {
      errors.position = "invalid password";
    }
    if (isNaN(data.get("phone")) === true || data.get("phone").length !== 11) {
      errors.phone = "invalid phone";
    }
    if (data.get("address").trim().length === 0) {
      errors.address = "invalid address";
    }
  }
  //check validation/
  if (Object.keys(errors).length !== 0) {
    console.log(errors);
    const errorResponse = new Response(
      JSON.stringify({
        message: "Authentication failed due to validation errors.",
        errors: errors,
      })
    );
    const errorResponseData = await errorResponse.json();
    return errorResponseData;
  }
  ///
  //check authentication
  if (Object.keys(errors).length !== 0) {
    console.log(errors);
    const errorResponse = new Response(
      JSON.stringify({
        message: "Authentication failed due to validation errors.",
        errors: errors,
      })
    );
    const errorResponseData = await errorResponse.json();
    return errorResponseData;
  }
  /////

  const loginData = {
    email: data.get("email"),
    password: data.get("password"),
    returnSecureToken: true,
  };

  let dateObj = new Date();
  let newDate = `${dateObj.getUTCDate()}/${
    dateObj.getUTCMonth() + 1
  }/${dateObj.getUTCFullYear()}`;
  const signupData = {
    addedDate: newDate,
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
    phone: data.get("phone"),
    address: data.get("address"),
    type: data.get("type"),
    returnSecureToken: true,
  };

  if (mode === "login") {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDai1GcLEq1Gfe84Bz-atCmrCvKTc9pJK8`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      }
    );
    if (response.status === 400) {
      const authErrorResponse = new Response(
        JSON.stringify({
          message: "entered email or password is wrong.",
        })
      );
      const authErrorResponseData = await authErrorResponse.json();
      return authErrorResponseData;
    }
    //
    const responseData = await response.json();
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);
    console.log(expirationTime);
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        token: responseData.idToken,
        id: responseData.localId,
        expirationTime: expirationTime.toISOString(),
      })
    );
    //
    if (data.get("email") === "admin@yourcar.com") {
      return redirect("/adminDashboard");
    }
    if (data.get("email") !== "admin@yourcar.com") {
      return redirect("/");
    }
    
  }
  ////
  if (mode !== "login") {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDai1GcLEq1Gfe84Bz-atCmrCvKTc9pJK8`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      }
    );
    if (response.status === 400) {
      const authErrorResponse = new Response(
        JSON.stringify({
          message:
            "the email you have entered is exist please,type a deferent email.",
        })
      );
      const authErrorResponseData = await authErrorResponse.json();
      return authErrorResponseData;
    }
    //
    const responseData = await response.json();
    await fetch(
      `https://cars-3a440-default-rtdb.firebaseio.com/users/${responseData.localId}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...signupData,
          id: responseData.localId,
          userToken: responseData.idToken,
        }),
      }
    );
    ///
    return redirect("/auth?mode=login");
  }

  /////

  ///

  // return mode === "login" ? redirect("/") : redirect("/auth?mode=login");
};

/////////
// import { Fragment, useEffect, useState } from "react";
// import useHttp from "../../hook/use-http";
// import useInput2 from "../../hook/use-input2";
// import { authActions } from "../../store";
// import { useDispatch, useSelector } from "react-redux";
// import classes from "./AuthForm.module.css";
// import { useHistory } from "react-router-dom";

// const isEmail = (value) => {
//   return value.includes("@" && ".com");
// };
// const isPass = (value) => {
//   return value.trim().length === 7;
// };

// const AuthForm = (props) => {
//   const history = useHistory();
//   const [isLogin, setIsLogin] = useState(true);
//   const [isSubmit, setIsSubmit] = useState(false);

//   const switchAuthModeHandler = () => {
//     setIsLogin((prevState) => !prevState);
//   };

//   const {
//     enteredvalue: enteredEmail,
//     inputValid: emailValid,
//     inputInvalid: emailInvalid,
//     inputChangeHandler: emailChangeHandler,
//     inputBlurHandler: emailBlurHandler,
//     reset: resetEmail,
//     inputClasses: emailCalsses,
//   } = useInput2(isEmail);

//   const {
//     enteredvalue: enteredPass,
//     inputValid: passValid,
//     inputInvalid: passInvalid,
//     inputChangeHandler: passChangeHandler,
//     inputBlurHandler: passBlurHandler,
//     reset: resetPass,
//     inputClasses: passCalsses,
//   } = useInput2(isPass);

//   let formValid = false;
//   if (emailValid && passValid) {
//     formValid = true;
//   }

//   const dispatch = useDispatch();

//   //////

//   const { isLoading, error, requestFn: signUp } = useHttp();
//   const submitHandler = (event) => {
//     event.preventDefault();

//     if (!formValid) {
//       return;
//     }
//     console.log(`Email : ${enteredEmail}`);
//     console.log(`Password : ${enteredPass}`);
//     const mail = enteredEmail;
//     const pass = enteredPass;
//     resetEmail();
//     resetPass();

//     let url;
//     if (isLogin) {
//       url =
//         "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxhAYskbgPspYtcJRl0tHBdBfX_M7lugQ";
//     } else {
//       url =
//         "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxhAYskbgPspYtcJRl0tHBdBfX_M7lugQ";
//     }

//     const transformData = (data) => {
//       setIsSubmit(true);
//       const expirTime = new Date(new Date().getTime() + +data.expiresIn * 1000);
//       dispatch(
//         authActions.login({ tok: data.idToken, expir: expirTime.toISOString() })
//       );
//       localStorage.setItem("token", data.idToken);
//       localStorage.setItem("expirationTime", expirTime.toISOString());
//       history.replace("/");
//     };
//     signUp(
//       {
//         url: url,
//         method: "POST",
//         body: {
//           email: mail,
//           password: pass,
//           returnSecureToken: true,
//         },
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       transformData
//     );
//   };

//   let content = (
//     <Fragment>
//       {" "}
//       <h1>{isLogin ? "Login" : "Sign Up"}</h1>
//       <form onSubmit={submitHandler}>
//         <div className={`${classes.control} ${emailCalsses}`}>
//           <label htmlFor="email">Your Email</label>
//           <input
//             type="email"
//             id="email"
//             onChange={emailChangeHandler}
//             onBlur={emailBlurHandler}
//             value={enteredEmail}
//             required
//           />
//           {emailInvalid && (
//             <p className={classes["error-text"]}>Type a Valid Email</p>
//           )}
//         </div>
//         <div className={`${classes.control} ${passCalsses}`}>
//           <label htmlFor="password">Your Password</label>
//           <input
//             type="password"
//             id="password"
//             onChange={passChangeHandler}
//             onBlur={passBlurHandler}
//             value={enteredPass}
//             required
//           />
//           {passInvalid && (
//             <p className={classes["error-text"]}>
//               Password Must Be larger Than 7 Numbers
//             </p>
//           )}
//         </div>
//         <div className={classes.actions}>
//           <button disabled={!formValid}>
//             {isLogin ? "Login" : "Create Account"}
//           </button>
//           <button
//             type="button"
//             className={classes.toggle}
//             onClick={switchAuthModeHandler}
//           >
//             {isLogin ? "Create new account" : "Login with existing account"}
//           </button>
//         </div>
//       </form>
//     </Fragment>
//   );
//   if (isLoading) {
//     content = <p>Sending Request...</p>;
//   }
//   if (error) {
//     content = <p>{error}</p>;
//   }
//   if (!isLoading && !error && isSubmit) {
//     content = <p>Congratulations</p>;
//   }

//   return <section className={classes.auth}>{content}</section>;
// };

// export default AuthForm;
