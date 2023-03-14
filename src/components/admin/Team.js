import React, { Fragment, useMemo, useState, useEffect } from "react";
import useHttp from "../../hook/use-http";
import { storage } from "../../firebaseConfig";
import { ref, deleteObject, listAll } from "firebase/storage";
import Table from "./table/Table";
import { NavLink } from "react-router-dom";
import styles from "../admin/additionComponent/additionComponent.module.css";
import { IoAddCircle } from "react-icons/io5";
/////////
const Team = () => {
  const getTeam = `https://cars-3a440-default-rtdb.firebaseio.com/team.json`;
  const { isLoading, error, requestFn } = useHttp();
  const [team, setTeam] = useState([]);
  /////getTeam///
  useEffect(() => {
    const transformData = (data) => {
      let loadedTeam = [];
      Object.entries(data).map((ele) => {
        loadedTeam.push(ele[1]);
      });
      setTeam(loadedTeam);
    };
    requestFn(
      {
        url: getTeam,
      },
      transformData
    );
  }, [requestFn, getTeam]);
  ////
  const teamData = useMemo(() => team, [team]);
  const teamColumns = React.useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
        sticky: "left",
        width: 80,
      },
      {
        Header: "Photo",
        accessor: "images[0]",
        Cell: (tableProps) => (
          <img
            src={tableProps.row.original.images[0]}
            width={60}
            height={60}
            alt="img"
          />
        ),
        width: 150,
      },
      {
        Header: "Name",
        accessor: "name",
        width: 200,
      },
      {
        Header: "Position",
        accessor: "position",
        width: 250,
      },
      {
        Header: "Email",
        accessor: "email",
        width: 250,
      },

      {
        Header: "Phone",
        accessor: "phone",
        width: 142,
      },

      {
        Header: "Added Date",
        accessor: "addedDate",
        width: 150,
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
  const updateTeam = (rowIndex, columnId, value) => {
    const transformData = (data) => {};
    requestFn(
      {
        url: `https://cars-3a440-default-rtdb.firebaseio.com/team/${teamData[rowIndex].id}.json`,
        method: "PATCH",
        body: {
          ...teamData[rowIndex],
          [columnId]: value,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformData
    );
  };
  const deleteEmployerHandler = (eId) => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      const updatedList = team.filter((ele) => {
        return ele.id !== eId;
      });
      setTeam(updatedList);
      requestFn({
        url: `https://cars-3a440-default-rtdb.firebaseio.com/team/${eId}.json`,
        method: "DELETE",
      });
      ///remove images/////
      const ImgRef = ref(storage, `teamImages/${eId}`);
      listAll(ImgRef).then((res) => {
        res.items.forEach((item) => {
          deleteObject(item);
        });
      });
    }
  };
  const approveListingsHandler = (id) => {};
  return (
    <div className={styles.mainDiv}>
      <h1 className="text-center">Team</h1>
      <Table
        columns={teamColumns}
        data={teamData}
        updateMyData={updateTeam}
        deleteHandler={deleteEmployerHandler}
        approveCarHandler={approveListingsHandler}
        filterPlaceholder={`Search ${teamData.length} employees `}
        btnContent="Add employee"
        link="/adminDashboard/team/addEmployee"
      />
    </div>
  );
};
export default Team;
//////
// import React, { Fragment, useMemo, useState, useEffect } from "react";
// import useHttp from "../../hook/use-http";
// import useInput2 from "../../hook/use-input";
// import useInputFile from "../../hook/use-inputFIle";
// import { storage } from "../../firebaseConfig";
// import {
//   ref,
//   deleteObject,
//   listAll,
//   uploadBytesResumable,
// } from "firebase/storage";
// import AdditionComponent from "./additionComponent/additionComponent";
// import Table from "./table/Table";
// /////////

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
// const isImages = (value) => {
//   return value.length > 0;
// };
// const Team = () => {
//   const getTeam = `https://cars-3a440-default-rtdb.firebaseio.com/team.json`;
//   const { isLoading, error, requestFn } = useHttp();
//   const [team, setTeam] = useState([]);
//   /////getTeam///
//   useEffect(() => {
//     const transformData = (data) => {
//       let loadedTeam = [];
//       Object.entries(data).map((ele) => {
//         loadedTeam.push(ele[1]);
//       });
//       setTeam(loadedTeam);
//     };
//     requestFn(
//       {
//         url: getTeam,
//       },
//       transformData
//     );
//   }, [requestFn, getTeam]);
//   ////
//   const teamData = useMemo(() => team, [team]);
//   const teamColumns = React.useMemo(
//     () => [
//       {
//         Header: "Id",
//         accessor: "id",
//         sticky: "left",
//         width: 80,
//       },
//       {
//         Header: "Photo",
//         accessor: "images[0]",
//         Cell: (tableProps) => (
//           <img
//             src={tableProps.row.original.images[0]}
//             width={60}
//             height={60}
//             alt="img"
//           />
//         ),
//         width: 150,
//       },
//       {
//         Header: "Name",
//         accessor: "name",
//         width: 200,
//       },
//       {
//         Header: "Position",
//         accessor: "position",
//         width: 250,
//       },
//       {
//         Header: "Email",
//         accessor: "email",
//         width: 250,
//       },

//       {
//         Header: "Phone",
//         accessor: "phone",
//         width: 142,
//       },

//       {
//         Header: "Added Date",
//         accessor: "addedDate",
//         width: 150,
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
//   const updateTeam = (rowIndex, columnId, value) => {
//     const transformData = (data) => {};
//     requestFn(
//       {
//         url: `https://cars-3a440-default-rtdb.firebaseio.com/team/${teamData[rowIndex].id}.json`,
//         method: "PATCH",
//         body: {
//           ...teamData[rowIndex],
//           [columnId]: value,
//         },
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       transformData
//     );
//   };
//   const deleteEmployerHandler = (eId) => {
//     const updatedList = team.filter((ele) => {
//       return ele.id !== eId;
//     });
//     setTeam(updatedList);
//     requestFn({
//       url: `https://cars-3a440-default-rtdb.firebaseio.com/team/${eId}.json`,
//       method: "DELETE",
//     });
//     ///remove images/////
//     const ImgRef = ref(storage, `teamImages/${eId}`);
//     listAll(ImgRef).then((res) => {
//       res.items.forEach((item) => {
//         deleteObject(item);
//       });
//     });
//   };
//   const approveListingsHandler = (id) => {};
//   ///add employee///
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
//     enteredvalue: enteredPosition,
//     inputValid: positionValid,
//     inputInvalid: positionInvalid,
//     inputChangeHandler: positionChangeHandler,
//     inputBlurHandler: positionBlurHandler,
//     reset: resetPosition,
//   } = useInput2(isEmpty);

//   const {
//     enteredvalue: enteredPhone,
//     inputValid: phoneValid,
//     inputInvalid: phoneInvalid,
//     inputChangeHandler: phoneChangeHandler,
//     inputBlurHandler: phoneBlurHandler,
//     reset: resetPhone,
//   } = useInput2(isPhone);
//   const {
//     enteredvalue: enteredRole,
//     inputValid: roleValid,
//     inputInvalid: roleInvalid,
//     inputChangeHandler: roleChangeHandler,
//     inputBlurHandler: roleBlurHandler,
//     reset: resetRole,
//   } = useInput2(isEmpty);
//   const {
//     enteredvalue: enteredAddress,
//     inputValid: addressValid,
//     inputInvalid: addressInvalid,
//     inputChangeHandler: addressChangeHandler,
//     inputBlurHandler: addressBlurHandler,
//     reset: resetAddress,
//   } = useInput2(isEmpty);
//   const {
//     enteredImages,
//     fileValid: imagesValid,
//     fileInvalid: imagesInvalid,
//     fileChangeHandler: imagesChangeHandler,
//     resetFile: resetImage,
//   } = useInputFile(isImages);
//   const teamInputs = [
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
//       label: "Position",
//       type: "text",
//       onChange: positionChangeHandler,
//       onBlur: positionBlurHandler,
//       value: enteredPosition,
//       valid: positionValid,
//       invalid: positionInvalid,
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
//     {
//       label: "Role",
//       type: "text",
//       onChange: roleChangeHandler,
//       onBlur: roleBlurHandler,
//       value: enteredRole,
//       valid: roleValid,
//       invalid: roleInvalid,
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
//       label: "Employee's Image",
//       type: "file",
//       onChange: imagesChangeHandler,
//       value: enteredImages,
//       valid: imagesValid,
//       invalid: imagesInvalid,
//     },
//   ];
//   let formValid = false;
//   if (
//     nameValid &&
//     emailValid &&
//     positionValid &&
//     phoneValid &&
//     roleValid &&
//     addressValid &&
//     imagesValid
//   ) {
//     formValid = true;
//   }

//   /////////
//   const randomId = Math.floor(Math.random() * 1000001).toString();
//   let dateObj = new Date();
//   let newDate = `${dateObj.getUTCDate()}/${
//     dateObj.getUTCMonth() + 1
//   }/${dateObj.getUTCFullYear()}`;
//   ////
//   const addEmployeeHandler = () => {
//     let imgArray = [];
//     const [imagesInput] = teamInputs.filter((ele) => ele.type === "file");
//     const enteredImagesArray = imagesInput.value;
//     Object.entries(enteredImagesArray).map((ele) => {
//       const imgName = Math.floor(Math.random() * 1000001) + ele[1].name;
//       const mainImgRef = ref(storage, `teamImages/${randomId}/${imgName}`);
//       const imgRef = mainImgRef;
//       const uploadTask = uploadBytesResumable(imgRef, ele[1]);
//       let progress;
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           // console.log("Upload is " + progress + "% done");
//           console.log(progress);
//         },
//         (error) => {
//           // Handle unsuccessful uploads
//         },
//         () => {
//           // Handle successful uploads on complete
//         }
//       );
//       const mainImgUrl = `https://firebasestorage.googleapis.com/v0/b/cars-3a440.appspot.com/o/teamImages%2F${randomId}%2F${imgName}?alt=media`;
//       imgArray.push(mainImgUrl);
//     });
//     ///
//     const addedTeam = {
//       id: randomId,
//       addedDate: newDate,
//       name: enteredName,
//       email: enteredEmail,
//       position: enteredPosition,
//       role: enteredRole,
//       address: enteredAddress,
//       phone: enteredPhone,
//       images: imgArray,
//     };

//     ///////////////////
//     const transformData = (data) => {
//       setTeam((prev) => [...prev, addedTeam]);
//     };
//     requestFn(
//       {
//         url: `https://cars-3a440-default-rtdb.firebaseio.com/team/${randomId}.json`,
//         method: "PUT",
//         body: addedTeam,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//       transformData
//     );
//     /////////
//     resetName();
//     resetEmail();
//     resetPosition();
//     resetRole();
//     resetAddress();
//     resetPhone();
//     resetImage();
//   };
//   ////

//   return (
//     <>
//       <h1 className="text-center">Team</h1>
//       <Table
//         columns={teamColumns}
//         data={teamData}
//         updateMyData={updateTeam}
//         deleteHandler={deleteEmployerHandler}
//         approveCarHandler={approveListingsHandler}
//         filterPlaceholder={`Search ${teamData.length} employees `}
//       />
//       <AdditionComponent
//         title={"Add Employee"}
//         inputs={teamInputs}
//         formValidation={formValid}
//         addHandler={addEmployeeHandler}
//         isLoading={isLoading}
//         error={error}
//       />
//     </>
//   );
// };

// export default Team;
// ////
