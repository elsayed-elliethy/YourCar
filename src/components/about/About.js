import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./About.module.css";
import ceoImg from "../../assets/about/module-13-removebg-preview.png";
import { CgQuote } from "react-icons/cg";
import { json, NavLink, useLoaderData } from "react-router-dom";
import useHttp from "../../hook/use-http";
import { useInView, useScroll } from "framer-motion";
const About = () => {
  ///
  const data = useLoaderData();
  const teamData = [];
  Object.entries(data).map((ele) => {
    teamData.push(ele[1]);
  });
   /////animation/////////
   const teamRef = useRef(null)
   const teamContainerRef = useRef(null)
   const teamIsInView = useInView(teamRef, { once: false,root: teamContainerRef})
   const ceoRef = useRef(null)
   const ceoIsInView = useInView(ceoRef, { once: false })
   const managementRef = useRef(null)
   const managementIsInView = useInView(managementRef, { once: false })
   const teamItemClass = teamIsInView ? `${styles.teamItemShow}`: `${styles.teamItemHide}`
   const ceoItemClass = ceoIsInView ? `${styles.ceoItemShow}`: `${styles.ceoItemHide}`
   const managementItemClass = managementIsInView ? `${styles.managementItemShow}`: `${styles.managementItemHide}` 
   ///////
  return (
    <div className={styles.about}>
      <div className={styles.aboutHeader}>
        <h2 className="fw-bold">About us</h2>
      </div>
      <div className={styles.whoWeAre}>
        <Container className="">
          <h1 className="text-center mb-4">Who we are</h1>
          <Row className={styles.whoRow}>
            <Col md={12} lg="7">
              <p className={`${styles.firstP} text-md-center text-lg-start `}>
                <span>YourCar.com</span> is a leading digital marketplace and
                solutions provider for the automotive industry that connects car
                shoppers with sellers. Launched in 2020 and headquartered in
                Egypt, the Company empowers shoppers with the data, resources
                and digital tools needed to make informed buying decisions and
                seamlessly connect with automotive retailers. In a rapidly
                changing market,
                <span>YourCar.com</span> enables dealerships and OEMs with
                innovative technical solutions and data-driven intelligence to
                better reach and influence ready-to-buy shoppers, increase
                inventory turn and gain market share. In march 2020,
                <span>YourCar.com</span> acquired Dealer Inspire®, an innovative
                technology company building solutions that future-proof
                dealerships with more efficient operations, a faster and easier
                car buying process, and connected digital experiences that sell
                and service more vehicles.
              </p>
            </Col>
            <Col
              md={12}
              lg="5"
              className={`${styles.officeImg} d-none d-lg-block `}
            ></Col>
          </Row>
        </Container>
      </div>

      <div className={styles.ceo}>
        <Container className="">
          <Row className={`${styles.ceoRow}`}>
            <Col lg={6} className={`mh-100 h-100  mb-lg-0 ${ceoItemClass}`} ref={ceoRef}>
              <div
                className={`w-100 mw-100  d-flex justify-content-between align-items-center flex-column ${styles.ceo1} `}
              >
                <div className="w-75 mx-auto mh-100 h-100 text-center order-1">
                  <img src={ceoImg} alt="..." className=" mh-100 mw-100 "></img>
                </div>
                <div className="p-0 w-100 text-center">
                  <h3 className="">Our CEO say</h3>
                  <p className="w-50 m-0 p-0">
                    <CgQuote /> Quality is never an accident; it is always the
                    result of high intention. <CgQuote />
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={6} className={`mt-3 mt-lg-0 ${ceoItemClass}`} ref={ceoRef}>
              <div className={`${styles.ceo2} w-100`}></div>
            </Col>
          </Row>
          <div className={`${styles.testDrive} w-50 ${ceoItemClass}`} ref={ceoRef}>
            <p className="text-center">Book a Test Drive!</p>
            <NavLink to={"/contactUs"} className="">
              <button className="btn mx-auto text-center d-block">
                Contact us
              </button>
            </NavLink>
          </div>
        </Container>
      </div>
      <div className={styles.ourStatistics}>
        <Container>
          <Row className={`${styles.statistics}`}>
            <Col md={6} className={`${styles.statistics1} text-center`}>
              <div className="w-100 h-100 mw-100 mh-100 d-flex align-items-center justify-content-center">
                <span className={styles.firstSpan}>15</span>
                <h2 className="ms-3 p-0 m-0 fs-2 fw-bold">
                  Years in <br /> Business
                </h2>
              </div>
            </Col>
            <Col md={6} className={styles.statistics2}>
              <div className="d-flex justify-content-evenly align-items-center w-100 h-100 mw-100 mh-100 flex-column">
                <div>
                  <span className="d-block text-center fw-bold">158</span>
                  Specialists
                </div>
                <div>
                  <span className="d-block text-center">50K</span>
                  Cars sold
                </div>
                <div>
                  <span className="d-block text-center">8</span>
                  Localizations
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={styles.management} >
        <h2 className="text-center mb-5">Managment</h2>
        <Container>
          <Row ref={managementRef}>
            {teamData
              .filter((ele) => ele.name !== "Kate Hendricks")
              .map((ele) => {
                return (
                  <Col
                    key={ele.id}
                    md={6}
                    lg={3}
                    className={`text-center mb-4 mb-lg-0 ${managementItemClass}`}
                    
                  >
                    <div className={styles.managementDiv}>
                      <img
                        className="mw-100 mh-100"
                        variant="top"
                        src={ele.images[0]}
                        alt="..."
                      />
                    </div>
                    <div className="text-center mt-3">
                      <p className={`${styles.title} mb-2`}>{ele.name}</p>
                      <p>{ele.position}</p>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </div>
      <div className={styles.team} >
        <h2 className="text-center mb-5">Our Team</h2>
        <Container>
          <Row ref={teamRef}>
            {teamData
              .filter((ele) => ele.name !== "Kate Hendricks")
              .map((ele) => {
                return (
                  <Col
                    key={ele.id}
                    md={6}
                    lg={3}
                    className={`text-center text-lg-start mb-4 mb-lg-0 ${teamItemClass}`}
                    
                  >
                    <Card className={`h-100 ${styles.teamCard}`}>
                      <div className="h-75 position-relative overflow-hidden">
                        <img
                          className="w-100 mw-100 h-100 mh-100"
                          variant="top"
                          src={ele.images[0]}
                          alt="..."
                        />
                      </div>
                      <div className={`card-body ${styles.cardBody}  `}>
                        <Card.Title className={styles.title}>
                          {ele.name}
                        </Card.Title>
                        <div>
                          <p className={styles.role}>{ele.role}</p>
                          <div className={styles.splitHr}></div>
                          <p>{ele.email}</p>
                          <p>
                            {ele.phone
                              .replace(/\D+/g, "")
                              .replace(
                                /(\d{1})(\d{3})(\d{3})(\d{4})/,
                                "($2) $3-$4"
                              )}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default About;
///
export const teamLoader = async () => {
  const response = await fetch(
    `https://cars-3a440-default-rtdb.firebaseio.com/team.json`
  );
  if (!response.ok) {
    throw json({ message: "Could not fetch team." }, { status: 500 });
  } else {
    const responseData = await response.json();
    return responseData;
  }
};
///////////
/////getTeam///
// const { isLoading, error, requestFn } = useHttp();
// const getTeam = `https://cars-3a440-default-rtdb.firebaseio.com/team.json`;
// const [team, setTeam] = useState([]);
// useEffect(() => {
//   const transformData = (data) => {
//     let loadedTeam = [];
//     Object.entries(data).map((ele) => {
//       loadedTeam.push(ele[1]);
//     });
//     setTeam(loadedTeam);
//   };
//   requestFn(
//     {
//       url: getTeam,
//     },
//     transformData
//   );
// }, [requestFn, getTeam]);
// const teamData = useMemo(() => team, [team]);
