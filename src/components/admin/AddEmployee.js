import React from "react";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable } from "firebase/storage";
/////////
import styles from "../admin/additionComponent/additionComponent.module.css";
import { Col, Container, Row } from "react-bootstrap";
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import Select from "react-select";
import { BsFillImageFill } from "react-icons/bs";
////
let imgFile;
export const AddEmployee = ({ method }) => {
  const customStyles = {
    control: () => ({
      display: "flex",
      padding: "0.3rem 0.5rem",
      textAlign: "left",
      color: "blue",
    }),
  };
  ///
  const validationData = useActionData();
  let errorsContent;
  if (validationData) {
    errorsContent = validationData.errors && (
      <>
        <ul>
          {Object.values(validationData.errors).map((err) => (
            <li key={err} className={styles["error-text"]}>
              {err}
            </li>
          ))}
        </ul>
      </>
    );
  }
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  ///add employee///
  const teamInputs = [
    {
      label: "Name",
      type: "text",
    },
    {
      label: "Email",
      type: "email",
    },
    {
      label: "Position",
      type: "text",
    },
    {
      label: "Phone",
      type: "text",
    },
    {
      label: "Role",
      type: "text",
    },
    {
      label: "Address",
      type: "text",
    },
    {
      label: "Employee's Image",
      type: "file",
    },
  ];
  const uploadImageHandler = (e) => {
    console.log(e.target.files[0]);
    imgFile = new FormData();
    if (e.target && e.target.files[0]) {
      imgFile.append("file", e.target.files[0]);
    }
  };
  return (
    <>
      <div className={styles.addition}>
        <h1 className="text-center mb-5">Add employee</h1>
        <Container>
          <Form method={method} className="w-100 d-block">
            {errorsContent}
            <Row className="w-100">
              {teamInputs.map((input) => {
                if (
                  input.type === "text" ||
                  input.type === "email" ||
                  input.type === "tel" ||
                  input.type === "select" ||
                  input.type === "number"
                ) {
                  return (
                    <Col md={6} lg={4} key={input.label} className="mx-auto">
                      <div
                        className={
                          input.invalid
                            ? `${styles.invalidSelect} ${styles.selectDiv}`
                            : styles.selectDiv
                        }
                      >
                        <label>{input.label}</label>
                        {(input.type === "text" ||
                          input.type === "email" ||
                          input.type === "tel") && (
                          <input
                            type={input.type}
                            name={input.label}
                            id={input.label}
                            className="w-100"
                          />
                        )}
                        {input.type === "select" && (
                          <Select
                            options={input.options}
                            className={styles.select}
                            styles={customStyles}
                            name={input.label}
                          />
                        )}
                        {input.type === "number" && (
                          <input
                            type="number"
                            name={input.label}
                            id={input.label}
                            className="w-100"
                          />
                        )}
                      </div>
                    </Col>
                  );
                }
                if (
                  input.type === "file" &&
                  input.label === "Employee's Image"
                ) {
                  return (
                    <div className={styles.imagesDiv} key={input.label}>
                      <input
                        type="file"
                        name="img"
                        id="image"
                        className="d-none"
                        onChange={uploadImageHandler}
                      />
                      <label
                        htmlFor="image"
                        className={
                          input.invalid
                            ? `${styles.invalidImages} ${styles.imgLabel}`
                            : styles.imgLabel
                        }
                      >
                        <BsFillImageFill />
                        Choose photo
                      </label>
                    </div>
                  );
                }
              })}
            </Row>
            <button className="d-block" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Add employee"}
            </button>
          </Form>
        </Container>
      </div>
    </>
  );
};
//////
export const addEmployeeAction = async ({ request, params }) => {
  const method = request.method;
  const data = await request.formData();
  console.log(request);
  ////
  const errors = {};
  // validate the fields
  if (data.get("Name").trim().length === 0) {
    errors.name = "invalid name";
  }
  if (!data.get("Email").includes("@" && ".com")) {
    errors.email = "invalid email";
  }
  if (isNaN(data.get("Phone")) === true || data.get("Phone").length !== 11) {
    errors.phone = "invalid phone";
  }
  if (data.get("Position").trim().length === 0) {
    errors.position = "invalid position";
  }
  if (data.get("Role").trim().length === 0) {
    errors.role = "invalid role";
  }
  if (data.get("Address").trim().length === 0) {
    errors.address = "invalid address";
  }
  if (data.get("img").length === 0) {
    errors.photo = "invalid photo";
  }
  ///
  if (Object.keys(errors).length !== 0) {
    console.log(errors);
    const errorResponse = new Response(
      JSON.stringify({
        message: "Adding the employee failed due to validation errors.",
        errors: errors,
      })
    );
    const errorResponseData = await errorResponse.json();
    return errorResponseData;
  }
  ///
  const randomId = Math.floor(Math.random() * 1000001).toString();
  let imgArray = [];
  const imgName =
    Math.floor(Math.random() * 1000001) + imgFile.get("file").name;
  const mainImgRef = ref(storage, `teamImages/${randomId}/${imgName}`);
  const uploadTask = uploadBytesResumable(mainImgRef, imgFile.get("file"));
  let progress;
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
    }
  );
  const mainImgUrl = `https://firebasestorage.googleapis.com/v0/b/cars-3a440.appspot.com/o/teamImages%2F${randomId}%2F${imgName}?alt=media`;
  imgArray.push(mainImgUrl);
  /////////
  console.log(data.get("img"));
  let dateObj = new Date();
  let newDate = `${dateObj.getUTCDate()}/${
    dateObj.getUTCMonth() + 1
  }/${dateObj.getUTCFullYear()}`;
  ////
  const addedTeam = {
    id: randomId,
    addedDate: newDate,
    name: data.get("Name"),
    email: data.get("Email"),
    position: data.get("Position"),
    role: data.get("Role"),
    address: data.get("Address"),
    phone: data.get("Phone"),
    images: imgArray,
  };
  ////
  const response = await fetch(
    `https://cars-3a440-default-rtdb.firebaseio.com/team/${randomId}.json`,
    {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addedTeam),
    }
  );
  if (!response.ok) {
    throw json({ message: "Could not add employee." }, { status: 500 });
  }
  return redirect("/adminDashboard/team");
};
