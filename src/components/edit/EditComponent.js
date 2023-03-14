import React, { Fragment, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsFillImageFill } from "react-icons/bs";
import { redirect, useNavigate } from "react-router-dom";
import Select from "react-select";
import LoadingSpinner from "../loading/LoadingSpinner";
import styles from "./editComponent.module.css";
const EditComponent = ({
  title,
  inputs,
  formValidation,
  editHandler,
  isLoading,
  error,
}) => {
  const customStyles = {
    control: () => ({
      display: "flex",
      padding: "0.3rem 0.5rem",
      textAlign: "left",
      color: "#ff4605",
    }),
  };
  ///
  const [sendingResult, setSendingResult] = useState();
  const navigation = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValidation) {
      return;
    }
    editHandler();
    title === "Edit Car"
      ? setSendingResult("Your car has been edited, refresh the page.")
      : setSendingResult("Your information has been edited, refresh the page.");
    // if (title === "Edit user information") {
    //   navigation(0);
    // }
  };

  let content = (
    <div className={styles.addition}>
      <h1 className="text-center mb-5">{title}</h1>
      <Container>
        <form className="w-100 d-block">
          <Row className="w-100">
            {inputs.map((input) => {
              if (
                input.type === "text" ||
                input.type === "email" ||
                input.type === "tel" ||
                input.type === "select" ||
                input.type === "number" ||
                input.type === "password"
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
                        input.type === "tel" ||
                        input.type === "password" ||
                        input.type === "number") && (
                        <input
                          type={input.type}
                          name={input.label}
                          id={input.label}
                          className="w-100"
                          onChange={input.onChange}
                          onKeyDown={input.onBlur}
                          value={input.value}
                          defaultValue={input.defaultValue}
                        />
                      )}

                      {input.type === "select" && (
                        <Select
                          options={input.options}
                          className={styles.select}
                          onChange={input.onChange}
                          onKeyDown={input.onBlur}
                          styles={customStyles}
                          //   value={input.value}
                          defaultValue={{
                            value: input.defaultValue,
                            label: input.defaultValue,
                          }}
                        />
                      )}
                    </div>
                  </Col>
                );
              }

              if (input.type === "multiSelect") {
                return (
                  <div
                    key={input.label}
                    className={
                      input.invalid
                        ? `${styles.invalidSelect} ${styles.selectDiv}`
                        : styles.selectDiv
                    }
                  >
                    <label>{input.label}</label>
                    <Select
                      options={input.options}
                      isMulti
                      className={styles.select}
                      onChange={input.onChange}
                      onKeyDown={input.onBlur}
                      styles={customStyles}
                      defaultValue={input.defaultValue}
                    />
                  </div>
                );
              }
              if (input.type === "textArea") {
                return (
                  <div
                    key={input.label}
                    className={
                      input.invalid
                        ? `${styles.invalidSelect} ${styles.selectDiv}`
                        : styles.selectDiv
                    }
                  >
                    <label>{input.label}</label>
                    <textarea
                      onChange={input.onChange}
                      onKeyDown={input.onBlur}
                      value={input.value}
                      defaultValue={input.defaultValue}
                    ></textarea>
                  </div>
                );
              }
              if (input.type === "file") {
                return (
                  <div className={styles.imagesDiv} key={input.label}>
                    <input
                      type="file"
                      name="img"
                      id="images"
                      multiple
                      onChange={input.onChange}
                      className="d-none"
                    />
                    <label
                      htmlFor="images"
                      className={
                        input.invalid
                          ? `${styles.invalidImages} ${styles.imgLabel}`
                          : styles.imgLabel
                      }
                    >
                      <div>
                        <BsFillImageFill />
                        Choose 3 images or more
                      </div>
                      <div
                        className={`mw-100 w-50 d-flex justify-content-end ${styles.imgsDiv}`}
                      >
                        {input.defaultValue?.map((ele, index) => {
                          return (
                            <img
                              key={index}
                              src={ele}
                              className="mw-100 mx-1"
                              alt=""
                            />
                          );
                        })}
                      </div>
                    </label>
                  </div>
                );
              }
            })}
          </Row>
          <button
            onClick={handleSubmit}
            disabled={!formValidation}
            className="d-block"
          >
            {title}
          </button>
          {sendingResult && (
            <p className="text-center mt-2 py-1">{sendingResult}</p>
          )}
        </form>
      </Container>
    </div>
  );
  ////
  return (
    <Fragment>
      {!isLoading && !error && content}
      {isLoading && !error && (
        <div className={`text-center ${styles.spinnerDiv}`}>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && error && <p className="text-center">{error}</p>}
    </Fragment>
  );
};

export default EditComponent;
