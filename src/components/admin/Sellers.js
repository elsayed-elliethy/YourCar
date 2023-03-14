import React, { Fragment, useMemo, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useHttp from "../../hook/use-http";
import styles from "../admin/additionComponent/additionComponent.module.css";
import Table from "./table/Table";
import { IoAddCircle } from "react-icons/io5";
const Users = () => {
  const getUsers = `https://cars-3a440-default-rtdb.firebaseio.com/users.json`;
  const { isLoading, error, requestFn } = useHttp();
  const [users, setUsers] = useState([]);
  const getCars = `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`;
  const [cars, setCars] = useState([]);
  /////getUsers///
  useEffect(() => {
    const transformData = (data) => {
      let loadedUsers = [];
      Object.entries(data).map((ele) => {
        loadedUsers.push({
          ...ele[1],
          num: cars.filter((el) => el.uId === ele[1].id).length,
        });
      });
      setUsers(loadedUsers);
    };
    requestFn(
      {
        url: getUsers,
      },
      transformData
    );
  }, [requestFn, getUsers, cars]);
  /////getCars///
  useEffect(() => {
    const transformData = (data) => {
      let loadedCars = [];
      Object.entries(data).map((ele) => {
        loadedCars.push(ele[1]);
      });
      setCars(loadedCars);
    };
    requestFn(
      {
        url: getCars,
      },
      transformData
    );
  }, [requestFn, getCars]);
  ////
  const usersData = useMemo(() => users, [users]);
  const usersColumns = React.useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
        sticky: "left",
        width: 80,
      },
      {
        Header: "Name",
        accessor: "name",
        width: 200,
      },
      {
        Header: "Type",
        accessor: "type",
        width: 200,
      },
      {
        Header: "Email",
        accessor: "email",
        width: 250,
      },
      {
        Header: "Address",
        accessor: "address",
        width: 200,
      },

      {
        Header: "Phone",
        accessor: "phone",
        width: 142,
      },

      {
        Header: "Added Date",
        accessor: "addedDate",
        width: 200,
      },
      {
        Header: "Number of listings",
        accessor: "num",
      },
      {
        Header: "Actions",
        accessor: "",
        Cell: "actions",
        sticky: "right",
        width: 70,
      },
    ],
    []
  );
  const updateUsers = (rowIndex, columnId, value) => {
    const transformData = (data) => {};
    requestFn(
      {
        url: `https://cars-3a440-default-rtdb.firebaseio.com/users/${usersData[rowIndex].id}.json`,
        method: "PATCH",
        body: {
          ...usersData[rowIndex],
          [columnId]: value,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformData
    );
  };
  const deleteUsersHandler = (uId) => {
    console.log(uId);
    const [targetUser] = users.filter((ele) => {
      return ele.id === uId;
    });
    const updatedList = users.filter((ele) => {
      return ele.id !== uId;
    });
    setUsers(updatedList);
    requestFn({
      url: `https://cars-3a440-default-rtdb.firebaseio.com/users/${uId}.json`,
      method: "DELETE",
    });
    // fetch(
    //   `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDai1GcLEq1Gfe84Bz-atCmrCvKTc9pJK8`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: { idToken: targetUser.userToken },
    //   }
    // );
  };
  const approveListingsHandler = (id) => {};
  return (
    <div className={styles.mainDiv}>
      <h1 className="text-center">Users</h1>
      <Table
        columns={usersColumns}
        data={usersData}
        updateMyData={updateUsers}
        deleteHandler={deleteUsersHandler}
        approveCarHandler={approveListingsHandler}
        filterPlaceholder={`Search ${usersData.length} users `}
        btnContent="Add user"
        link="/adminDashboard/users/addUser"
      />
    </div>
  );
};

export default Users;
//////////////
// import React, { Fragment, useMemo, useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import useHttp from "../../hook/use-http";
// import useInput2 from "../../hook/use-input";
// import AdditionComponent from "./additionComponent/additionComponent";
// import styles from "../admin/additionComponent/additionComponent.module.css";
// import Table from "./table/Table";
// import { GrFormAdd } from "react-icons/gr";
// ///valid conditions///
// const isEmpty = (value) => {
//   return value.trim().length !== 0;
// };
// const isEmail = (value) => {
//   return value.includes("@" && ".com");
// };
// const isPhone = (value) => {
//   return isNaN(value) === false && value.length === 11;
// };
// const isSelected = (value) => {
//   return value !== "";
// };
// const Users = () => {
//   const getUsers = `https://cars-3a440-default-rtdb.firebaseio.com/users.json`;
//   const { isLoading, error, requestFn } = useHttp();
//   const [users, setUsers] = useState([]);
//   const getCars = `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`;
//   const [cars, setCars] = useState([]);
//   /////getUsers///
//   useEffect(() => {
//     const transformData = (data) => {
//       let loadedUsers = [];
//       Object.entries(data).map((ele) => {
//         loadedUsers.push({
//           ...ele[1],
//           num: cars.filter((el) => el.uId === ele[1].id).length,
//         });
//       });
//       setUsers(loadedUsers);
//     };
//     requestFn(
//       {
//         url: getUsers,
//       },
//       transformData
//     );
//   }, [requestFn, getUsers, cars]);
//   /////getCars///
//   useEffect(() => {
//     const transformData = (data) => {
//       let loadedCars = [];
//       Object.entries(data).map((ele) => {
//         loadedCars.push(ele[1]);
//       });
//       setCars(loadedCars);
//     };
//     requestFn(
//       {
//         url: getCars,
//       },
//       transformData
//     );
//   }, [requestFn, getCars]);
//   ////
//   const usersData = useMemo(() => users, [users]);
//   const usersColumns = React.useMemo(
//     () => [
//       {
//         Header: "Id",
//         accessor: "id",
//         sticky: "left",
//         width: 80,
//       },
//       {
//         Header: "Name",
//         accessor: "name",
//         width: 200,
//       },
//       {
//         Header: "Type",
//         accessor: "type",
//         width: 200,
//       },
//       {
//         Header: "Email",
//         accessor: "email",
//         width: 250,
//       },
//       {
//         Header: "Address",
//         accessor: "address",
//         width: 200,
//       },

//       {
//         Header: "Phone",
//         accessor: "phone",
//         width: 142,
//       },

//       {
//         Header: "Added Date",
//         accessor: "addedDate",
//         width: 200,
//       },
//       {
//         Header: "Number of listings",
//         accessor: "num",
//       },
//       {
//         Header: "Actions",
//         accessor: "",
//         Cell: "actions",
//         sticky: "right",
//         width: 70,
//       },
//     ],
//     []
//   );
//   const updateUsers = (rowIndex, columnId, value) => {
//     const transformData = (data) => {};
//     requestFn(
//       {
//         url: `https://cars-3a440-default-rtdb.firebaseio.com/users/${usersData[rowIndex].id}.json`,
//         method: "PATCH",
//         body: {
//           ...usersData[rowIndex],
//           [columnId]: value,
//         },
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       transformData
//     );
//   };
//   const deleteUsersHandler = (uId) => {
//     const updatedList = users.filter((ele) => {
//       return ele.id !== uId;
//     });
//     setUsers(updatedList);
//     requestFn({
//       url: `https://cars-3a440-default-rtdb.firebaseio.com/users/${uId}.json`,
//       method: "DELETE",
//     });
//   };
//   const approveListingsHandler = (id) => {};
//   ///add user///
//   const {
//     enteredvalue: enteredName,
//     inputValid: nameValid,
//     inputInvalid: nameInvalid,
//     inputChangeHandler: nameChangeHandler,
//     inputBlurHandler: nameBlurHandler,
//     reset: resetName,
//   } = useInput2(isEmpty);
//   const {
//     enteredvalue: enteredEmail,
//     inputValid: emailValid,
//     inputInvalid: emailInvalid,
//     inputChangeHandler: emailChangeHandler,
//     inputBlurHandler: emailBlurHandler,
//     reset: resetEmail,
//   } = useInput2(isEmail);
//   const {
//     enteredvalue: enteredAddress,
//     inputValid: addressValid,
//     inputInvalid: addressInvalid,
//     inputChangeHandler: addressChangeHandler,
//     inputBlurHandler: addressBlurHandler,
//     reset: resetAddress,
//   } = useInput2(isEmpty);
//   const {
//     enteredvalue: enteredType,
//     inputValid: typeValid,
//     inputInvalid: typeInvalid,
//     selectChangeHandler: typeChangeHandler,
//     inputBlurHandler: typeBlurHandler,
//     reset: resetType,
//   } = useInput2(isSelected);
//   const {
//     enteredvalue: enteredPhone,
//     inputValid: phoneValid,
//     inputInvalid: phoneInvalid,
//     inputChangeHandler: phoneChangeHandler,
//     inputBlurHandler: phoneBlurHandler,
//     reset: resetPhone,
//   } = useInput2(isPhone);

//   const typeOptions = [
//     { value: "Business seller", label: "Business seller" },
//     { value: "Private seller", label: "Private seller" },
//   ];
//   const usersInputs = [
//     {
//       label: "Name",
//       type: "text",
//       onChange: nameChangeHandler,
//       onBlur: nameBlurHandler,
//       value: enteredName,
//       valid: nameValid,
//       invalid: nameInvalid,
//     },
//     {
//       label: "Email",
//       type: "email",
//       onChange: emailChangeHandler,
//       onBlur: emailBlurHandler,
//       value: enteredEmail,
//       valid: emailValid,
//       invalid: emailInvalid,
//     },
//     {
//       label: "Address",
//       type: "text",
//       onChange: addressChangeHandler,
//       onBlur: addressBlurHandler,
//       value: enteredAddress,
//       valid: addressValid,
//       invalid: addressInvalid,
//     },
//     {
//       label: "Type",
//       type: "select",
//       options: typeOptions,
//       onChange: typeChangeHandler,
//       onBlur: typeBlurHandler,
//       value: enteredType,
//       valid: typeValid,
//       invalid: typeInvalid,
//     },
//     {
//       label: "Phone",
//       type: "text",
//       onChange: phoneChangeHandler,
//       onBlur: phoneBlurHandler,
//       value: enteredPhone,
//       valid: phoneValid,
//       invalid: phoneInvalid,
//     },
//   ];
//   let formValid = false;
//   if (nameValid && emailValid && addressValid && phoneValid) {
//     formValid = true;
//   }
//   /////////////
//   const randomId = Math.floor(Math.random() * 1000001).toString();
//   let dateObj = new Date();
//   let newDate = `${dateObj.getUTCDate()}/${
//     dateObj.getUTCMonth() + 1
//   }/${dateObj.getUTCFullYear()}`;
//   ////
//   const addUserHandler = () => {
//     const addedUser = {
//       id: randomId,
//       addedDate: newDate,
//       name: enteredName,
//       email: enteredEmail,
//       address: enteredAddress,
//       type: enteredType.value,
//       phone: enteredPhone,
//     };
//     ///////////////////
//     const transformData = (data) => {
//       const listedUser = { ...addedUser, num: 0 };
//       setUsers((prev) => [...prev, listedUser]);
//     };
//     requestFn(
//       {
//         url: `https://cars-3a440-default-rtdb.firebaseio.com/users/${randomId}.json`,
//         method: "PUT",
//         body: addedUser,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       transformData
//     );
//     /////////
//     resetName();
//     resetEmail();
//     resetAddress();
//     resetType();
//     resetPhone();
//   };
//   return (
//     <>
//       <h1 className="text-center">Users</h1>
//       <Table
//         columns={usersColumns}
//         data={usersData}
//         updateMyData={updateUsers}
//         deleteHandler={deleteUsersHandler}
//         approveCarHandler={approveListingsHandler}
//         filterPlaceholder={`Search ${usersData.length} users `}
//       />
//       <button className={`d-block ${styles.addBtn}`}>
//         <NavLink to={"/adminDashboard/users/addUser"}>
//           <GrFormAdd className="fs-2 mb-1" />
//           Add
//         </NavLink>
//       </button>
//       <AdditionComponent
//         title={"Add User"}
//         inputs={usersInputs}
//         formValidation={formValid}
//         addHandler={addUserHandler}
//         isLoading={isLoading}
//         error={error}
//       />
//     </>
//   );
// };

// export default Users;
