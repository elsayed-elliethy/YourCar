import React from "react";
import {
  redirect,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import useHttp from "../../hook/use-http";
import useInputEdit from "../../hook/use-inputEdit";
import EditComponent from "../edit/EditComponent";
const isName = (value) => {
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
const isAddress = (value) => {
  return value.trim() !== "";
};
const isSelected = (value) => {
  return value !== "";
};
const EditInfo = () => {
  const { userId } = useParams();
  const editUser = `https://cars-3a440-default-rtdb.firebaseio.com/users/${userId}.json`;
  const { isLoading, error, requestFn } = useHttp();
  let oldUser = useRouteLoaderData("user-information");
  const {
    enteredvalue: enteredName,
    inputValid: nameValid,
    inputInvalid: nameInvalid,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInputEdit(isName);
  const {
    enteredvalue: enteredEmail,
    inputValid: emailValid,
    inputInvalid: emailInvalid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInputEdit(isEmail);
  const {
    enteredvalue: enteredPass,
    inputValid: passValid,
    inputInvalid: passInvalid,
    inputChangeHandler: passChangeHandler,
    inputBlurHandler: passBlurHandler,
  } = useInputEdit(isPass);
  const {
    enteredvalue: enteredPhone,
    inputValid: phoneValid,
    inputInvalid: phoneInvalid,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
  } = useInputEdit(isPhone);
  const {
    enteredvalue: enteredAddress,
    inputValid: addressValid,
    inputInvalid: addressInvalid,
    inputChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
  } = useInputEdit(isAddress);
  const {
    enteredvalue: enteredType,
    inputValid: typeValid,
    inputInvalid: typeInvalid,
    selectChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler,
  } = useInputEdit(isSelected);
  const typeOptions = [
    { value: "Business seller", label: "Business seller" },
    { value: "Private seller", label: "Private seller" },
  ];
  ////////
  const userInputs = [
    {
      label: "Name",
      type: "text",
      onChange: nameChangeHandler,
      onBlur: nameBlurHandler,
      valid: nameValid,
      invalid: nameInvalid,
      defaultValue: oldUser.name,
    },
    {
      label: "Email",
      type: "email",
      onChange: emailChangeHandler,
      onBlur: emailBlurHandler,
      valid: emailValid,
      invalid: emailInvalid,
      defaultValue: oldUser.email,
    },
    {
      label: "Address",
      type: "text",
      onChange: addressChangeHandler,
      onBlur: addressBlurHandler,
      valid: addressValid,
      invalid: addressInvalid,
      defaultValue: oldUser.address,
    },
    {
      label: "Type",
      type: "select",
      onChange: typeChangeHandler,
      onBlur: typeBlurHandler,
      options: typeOptions,
      valid: typeValid,
      invalid: typeInvalid,
      defaultValue: oldUser.type,
    },
    {
      label: "Phone",
      type: "text",
      onChange: phoneChangeHandler,
      onBlur: phoneBlurHandler,
      valid: phoneValid,
      invalid: phoneInvalid,
      defaultValue: oldUser.phone,
    },
    {
      label: "Password",
      type: "password",
      onChange: passChangeHandler,
      onBlur: passBlurHandler,
      valid: passValid,
      invalid: passInvalid,
      defaultValue: oldUser.password,
    },
  ];
  ////////
  let formValid = false;
  if (
    nameValid &&
    emailValid &&
    passValid &&
    phoneValid &&
    addressValid &&
    typeValid
  ) {
    formValid = true;
  }
  const navigation = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const editUserHandler = (e) => {
    const editedUser = {
      // id: oldUser.id,
      addedDate: oldUser.addedDate,
      name: enteredName ? enteredName : oldUser.name,
      email: enteredEmail ? enteredEmail : oldUser.email,
      phone: enteredPhone ? enteredPhone : oldUser.phone,
      address: enteredAddress ? enteredAddress : oldUser.address,
      password: enteredPass ? enteredPass : oldUser.password,
      type: enteredType ? enteredType.value : oldUser.type,
    };
    const transformData = (data) => {
      // oldUser = { ...editedUser };
      // redirect(`/profile/${currentUser.id}`);
      // navigation(`/profile/${currentUser.id}`, { replace: true });
    };
    requestFn(
      {
        url: editUser,
        method: "PATCH",
        body: editedUser,
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformData
    );
    ///
    if (enteredEmail) {
      const transformData2 = (data) => {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ token: "", id: "", expirationTime: -1 })
        );
        navigation("/auth?mode=login", { replace: true });
      };
      requestFn(
        {
          url: `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDai1GcLEq1Gfe84Bz-atCmrCvKTc9pJK8`,
          method: "POST",
          body: {
            idToken: currentUser.token,
            email: enteredEmail,
            returnSecureToken: true,
          },
          headers: {
            "Content-Type": "application/json",
          },
        },
        transformData2
      );
    }
    if (enteredPass) {
      const transformData3 = (data) => {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ token: "", id: "", expirationTime: -1 })
        );
        navigation("/auth?mode=login", { replace: true });
      };
      requestFn(
        {
          url: `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDai1GcLEq1Gfe84Bz-atCmrCvKTc9pJK8`,
          method: "POST",
          body: {
            idToken: currentUser.token,
            password: enteredPass,
            returnSecureToken: true,
          },
          headers: {
            "Content-Type": "application/json",
          },
        },
        transformData3
      );
    }
    //
    // if (!enteredEmail || !enteredPass) {
    //   // return redirect(`/profile/${currentUser.id}`);
    //   // navigation(`/profile/${currentUser.id}`, { replace: true });
    // }
  };
  /////////
  return (
    <EditComponent
      title={"Edit user information"}
      inputs={userInputs}
      formValidation={formValid}
      editHandler={editUserHandler}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default EditInfo;

////////////
/////getUserOldInfo///
// const getUserApi = `https://cars-3a440-default-rtdb.firebaseio.com/users.json`;
// const [oldUser, setOldUser] = useState({});
// useEffect(() => {
//   const transformData = (data) => {
//     Object.entries(data).map((ele) => {
//       if (ele[1].id === userId) {
//         setOldUser(ele[1]);
//       }
//     });
//   };
//   requestFn(
//     {
//       url: getUserApi,
//     },
//     transformData
//   );
// }, [requestFn, getUserApi, userId]);
///
