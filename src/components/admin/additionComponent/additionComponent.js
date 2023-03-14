import React, { Fragment, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsFillImageFill } from "react-icons/bs";
import Select from "react-select";
import LoadingSpinner from "../../loading/LoadingSpinner";
import styles from "./additionComponent.module.css";
//
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
const AdditionComponent = ({
  title,
  inputs,
  formValidation,
  addHandler,
  isLoading,
  error,
}) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted #ff4605",
      color: "#000",
      background: state.isSelected ? "#ff4605" : "#fff",
    }),
    control: () => ({
      display: "flex",
      padding: "0.3rem 0.5rem",
      textAlign: "left",
      color: "blue",
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: 5,
      // borderwidth: 10,
      borderRadius: "1rem",
      fontSize: 17,
      // height: "100px",
      overflow: "hidden",
      opacity: 1,
      transition: "all 1s ease-in-out",
      visibility: "visible",
    }),
  };
  ///
  const [sendingResult, setSendingResult] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValidation) {
      return;
    }
    addHandler();
    title === "Sell Your Car"
      ? setSendingResult(
          "Your car has been added,waiting for admin to be approved"
        )
      : setSendingResult("");
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
                          onChange={input.onChange}
                          onBlur={input.onBlur}
                          value={input.value}
                        />
                      )}

                      {input.type === "select" && (
                        <Select
                          options={input.options}
                          className={styles.select}
                          onChange={input.onChange}
                          onBlur={input.onBlur}
                          styles={customStyles}
                          value={input.value}
                          name={input.label}
                          //
                          // components={animatedComponents}

                          components={{
                            Menu: (props) => (
                              <animatedComponents.Menu
                                {...props}
                                className={styles.menu}
                              />
                            ),
                          }}
                        />
                      )}

                      {input.type === "number" && (
                        <input
                          type="number"
                          // placeholder={input.placeholder}
                          name={input.label}
                          id={input.label}
                          className="w-100"
                          onChange={input.onChange}
                          onBlur={input.onBlur}
                          value={input.value}
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
                      onBlur={input.onBlur}
                      styles={customStyles}
                      value={input.value}
                      name={input.label}
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
                      onBlur={input.onBlur}
                      value={input.value}
                      name={input.label}
                    ></textarea>
                  </div>
                );
              }
              if (input.type === "file" && input.label === "Images") {
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
                      <BsFillImageFill />
                      Choose 3 images or more
                    </label>
                  </div>
                );
              }
              if (input.type === "file" && input.label === "Employee's Image") {
                return (
                  <div className={styles.imagesDiv} key={input.label}>
                    <input
                      type="file"
                      name="img"
                      id="image"
                      onChange={input.onChange}
                      className="d-none"
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

export default AdditionComponent;
