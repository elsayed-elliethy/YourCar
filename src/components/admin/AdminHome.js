import React, { useEffect, useMemo, useState } from "react";
import styles from "./AdminHome.module.css";
import { Col, Container, Row } from "react-bootstrap";
import Charts from "./charts/Charts";
import useHttp from "../../hook/use-http";
import Table from "./table/Table";
import { storage } from "../../firebaseConfig";
import { ref, deleteObject, listAll } from "firebase/storage";
import { FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
const AdminHome = () => {
  const getCars = `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`;
  const { isLoading, error, requestFn } = useHttp();
  const [cars, setCars] = useState([]);
  /////getCars///
  useEffect(() => {
    const transformData = (data) => {
      let loadedCars = [];
      Object.entries(data).map((ele) => {
        const car =
          ele[1].category === "For Rent"
            ? { ...ele[1], price: `${ele[1].price}$ /day` }
            : { ...ele[1], price: `${ele[1].price}$` };
        loadedCars.push(car);
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

  const carsMake = [...new Set(cars.map((car) => car.make))];
  ////
  const listingsColumns = React.useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
        sticky: "left",
        width: 80,
      },
      {
        Header: "Image",
        accessor: "carImages[1]",
        Cell: (tableProps) => (
          <img
            src={tableProps.row.original.carImages[1]}
            width={100}
            height={70}
            alt="img"
          />
        ),
        width: 150,
      },
      {
        Header: "Make",
        accessor: "make",
      },
      {
        Header: "Model",
        accessor: "model",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Color",
        accessor: "color",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Cylinders",
        accessor: "cylinders",
      },
      {
        Header: "Doors",
        accessor: "doors",
      },
      {
        Header: "Drive Type",
        accessor: "driveType",
      },
      {
        Header: "Engine size",
        accessor: "engine",
      },
      {
        Header: "Fuel type",
        accessor: "fuelType",
      },
      {
        Header: "Mileage",
        accessor: "mileage",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "transmission",
        accessor: "transmission",
      },
      {
        Header: "Seller",
        accessor: "uName",
      },
      {
        Header: "Year",
        accessor: "year",
      },
      {
        Header: "Approval",
        accessor: "approved",
      },
      {
        Header: "Actions",
        accessor: "",
        Cell: "listingActions",
        sticky: "right",
        width: 100,
      },
    ],
    []
  );
  const pendingCars = cars.filter((car) => car.approved !== "approved");
  const listingsData = useMemo(() => pendingCars, [pendingCars]);
  const updateListings = (rowIndex, columnId, value) => {
    const transformData = (data) => {};
    requestFn(
      {
        url: `https://cars-3a440-default-rtdb.firebaseio.com/cars/${listingsData[rowIndex].id}.json`,
        method: "PATCH",
        body: {
          ...listingsData[rowIndex],
          [columnId]: value,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformData
    );
  };
  const approveListingsHandler = (carId) => {
    const [targetCar] = [...listingsData].filter((ele) => ele.id === carId);
    const approvedCar = { ...targetCar, approved: "approved" };
    cars[cars.indexOf(targetCar)] = approvedCar;
    const updatedList = [...cars];
    setCars(updatedList);
    const transformData = (data) => {};
    requestFn(
      {
        url: `https://cars-3a440-default-rtdb.firebaseio.com/cars/${carId}.json`,
        method: "PATCH",
        body: {
          ...targetCar,
          approved: "approved",
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformData
    );
  };
  const deleteListingHandler = (carId) => {
    const updatedList = cars.filter((ele) => {
      return ele.id !== carId;
    });
    setCars(updatedList);
    requestFn({
      url: `https://cars-3a440-default-rtdb.firebaseio.com/cars/${carId}.json`,
      method: "DELETE",
    });
    ///remove images/////
    const ImgRef = ref(storage, `carImages/${carId}`);
    listAll(ImgRef).then((res) => {
      res.items.forEach((item) => {
        deleteObject(item);
      });
    });
  };
  return (
    <div className={`${styles.mainDev} py-5`}>
      <Container>
        <Row className="justify-content-between gy-5">
          {/* <Col md={3} className={styles.childDiv}>
            <div>
              <p className={`${styles.colHeader} fs-4 fw-bold text-center`}>
                Site Activity
              </p>
              <div>
                <Charts type="lineChart" />
              </div>
            </div>
          </Col> */}
          <Col lg={7} className={`${styles.childDiv}`}>
            <div>
              <p className={`${styles.colHeader} fs-4 fw-bold text-center`}>
                Added cars Analysis Trend
              </p>
              <div>
                <Charts type="barChart" />
              </div>
            </div>
          </Col>
          <Col lg={4} className={styles.childDiv}>
            <div>
              <p className={`${styles.colHeader} fs-4 fw-bold text-center`}>
                Safe Deal
              </p>
              <div>
                <Charts type="doughnutChart" />
              </div>
              <div
                className={`${styles.carsNum} d-flex justify-content-between align-items-center mt-4`}
              >
                <div>
                  <span className="d-block mx-auto">
                    {cars.filter((car) => car.category === "New Cars").length}
                  </span>
                  New Cars
                </div>
                <div>
                  <span className="d-block mx-auto">
                    {cars.filter((car) => car.category === "Used Cars").length}
                  </span>
                  Used Cars
                </div>
                <div>
                  <span className="d-block mx-auto">
                    {cars.filter((car) => car.category === "For Rent").length}
                  </span>
                  For Rent
                </div>
              </div>
            </div>
          </Col>
          <Col lg={5} className={styles.childDiv}>
            <div>
              <p className={`${styles.colHeader} fs-4 fw-bold text-center`}>
                Leads By Make
              </p>
              <div className={styles.makes}>
                {carsMake.map((make) => {
                  return (
                    <div className={styles["prog-holder"]} key={make}>
                      <h4>{make}</h4>
                      <div className={styles.prog}>
                        <motion.span
                        initial={{opacity: 0, top: 0,left:"-100%",width:0,height: "100%", transition: "all 2s ease"}}
                          whileInView={{opacity: 1, top: 0,left:0,width:
                          Math.ceil(
                            (cars.filter((car) => car.make === make)
                              .length /
                              cars.length) *
                              100
                          ) + "%",height: "100%", transition: "all 1.5s ease"}}
                        viewport={{ once: false }}
                        exit={{opacity: 0, transition: "all 1.5s ease",transform: "translate3d(-100px,0,0)"}}
                          data-progress={Math.ceil(
                            (cars.filter((car) => car.make === make).length /
                              cars.length) *
                              100
                          )}
                        ></motion.span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
          <Col lg={6} className={styles.childDiv}>
            <div>
              <p className={`${styles.colHeader} fs-4 fw-bold text-center`}>
                <FaSpinner className="mb-1" /> Pending Cars
              </p>
              {listingsData.length !== 0 ? (
                <Table
                  columns={listingsColumns}
                  data={listingsData}
                  updateMyData={updateListings}
                  approveCarHandler={approveListingsHandler}
                  deleteHandler={deleteListingHandler}
                />
              ) : (
                <p className="text-center fs-2">No pending cars yet.</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminHome;
