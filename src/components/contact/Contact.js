import React, { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Contact.module.css";
import { BiEnvelope } from "react-icons/bi";
import emailjs from "@emailjs/browser";
const Contact = () => {
  const form = useRef(null);
  let name = form.current?.elements[0].value;
  let email = form.current?.elements[1].value;
  let phone = form.current?.elements[2].value;
  let message = form.current?.elements[3].value;
  const contactInputs = [
    {
      label: "Name",
      type: "text",
      name: "name",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
    },
    {
      label: "Phone",
      type: "text",
      name: "phone",
    },
    {
      label: "Message",
      type: "textArea",
      name: "message",
    },
  ];

  let formValid = false;
  if (name && email && phone && message) {
    formValid = true;
  }
  const [sendingResult, setSendingResult] = useState();
  const submitHandler = (e) => {
    // Email.send({
    // })
    e.preventDefault();
    emailjs
      .sendForm(
        "service_7byb69n",
        "template_4h7g4tk",
        form.current,
        // params
        "m-6b_jqWhc45hniXH"
      )
      .then(
        (result) => {
          setSendingResult("Your message has been sent");
        },
        (error) => {
          setSendingResult("error");
        }
      );
    form.current.elements[0].value = "";
    form.current.elements[1].value = "";
    form.current.elements[2].value = "";
    form.current.elements[3].value = "";
  };

  return (
    <div className={styles.contact}>
      <Container className="mt-5">
        <Row>
          <Col lg={6}>
            <h1 className="fw-bold mb-3 text-center text-lg-start">
              Contact us
            </h1>
            <div className={`${styles.contact1} text-center text-lg-start`}>
              <div>
                <p className="">
                  Award-winning, family owned dealership of new and pre-owned
                  vehicles with several locations across the city. Lowest prices
                  and the best customer service guaranteed.
                </p>
                <address>
                  West 12th Street <br /> New York, NY, USA
                </address>
                <p className="fw-bold fs-1">
                  (123) <span>456-78901</span>
                </p>
                <p className="fs-5">
                  <BiEnvelope /> support@YourCar.com
                </p>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className={styles.contact2}>
              <form className="w-100" ref={form}>
                <div className="w-100 d-flex justify-content-between flex-column flex-md-row">
                  <Row>
                    {contactInputs.map((input) => {
                      return input.type !== "textArea" ? (
                        <Col
                          md={4}
                          lg={12}
                          xl={4}
                          key={input.label}
                          className="mb-3 mb-md-1 mb-lg-3 mb-xl-1"
                        >
                          <input
                            type={input.type}
                            name={input.name}
                            className="w-100"
                            // value={input.value}
                            placeholder={input.label}
                          />
                        </Col>
                      ) : (
                        <Col md={12} key={input.label} className="mt-3">
                          <div className={`${styles.selectDiv} mb-3`}>
                            <label htmlFor="message">{input.label}</label>
                            <textarea id="message" name={input.name} />
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
                <button onClick={submitHandler} className="d-block">
                  Send
                </button>
                {sendingResult && (
                  <p className="text-center mt-2 py-1">{sendingResult}</p>
                )}
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
