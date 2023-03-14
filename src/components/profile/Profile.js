import React, { useState } from "react";
import {
  json,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import useHttp from "../../hook/use-http";
import styles from "./Profile.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { storage } from "../../firebaseConfig";
import { ref, deleteObject, listAll } from "firebase/storage";
import SellYourCar from "../sellYourCar/SellYourCar";
import { BiEdit } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import LoadingSpinner from "../loading/LoadingSpinner";
import { BsGearFill, BsListUl } from "react-icons/bs";
import { MdAdd, MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { favoritesActions } from "../../store";
import Skeleton from "react-loading-skeleton";
const Profile = () => {
  const favorites = useSelector((state) => {
    return state.manageFavorites.items;
  });
  const favoritesLength = useSelector((state) => {
    return state.manageFavorites.totalAmount;
  });
  const { userId } = useParams();
  const navigation = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [isActive, setIsActive] = useState(queryParams.get("type"));
  const filterActive = (id) => {
    setIsActive(id);
  };
  const { isLoading, error, requestFn } = useHttp();
  ///////
  const data = useRouteLoaderData("all-cars");
  const cars = [];
  Object.entries(data).map((ele) => {
    if (ele[1].uId === userId) {
      cars.push(ele[1]);
    }
  });
  ////////
  const userInfo = useRouteLoaderData("user-information");
  /////delete car/////
  const deleteCarHandler = (carId) => {
    const updatedList = cars.filter((ele) => {
      return ele.id !== carId;
    });
    // setCars(updatedList);
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
  const editCarHandler = (id) => {
    // navigation(`/profile/${userId}/edit/${id}`);
    navigation(`/cars/${id}/edit`);
  };
  const editUserHandler = (id) => {
    navigation(`/profile/${id}/editInfo`);
  };
  /////
  const dispatch = useDispatch();
  const removeFavoriteHandler = (ele) => {
    dispatch(favoritesActions.manageFavorites(ele));
  };
  const accountContent = (
    <div className={styles.account}>
      <h1 className="text-center mb-5">Account information</h1>
      <Container>
        <ul className={`${styles.userInfo} list-unstyled mx-auto `}>
          <li className="">
            <span className="w-50 d-inline-block">Name:</span>
            {userInfo.name || <Skeleton className="w-50" />}
          </li>
          <li>
            <span className="w-50 d-inline-block">Email:</span>
            {userInfo.email || <Skeleton className="w-50" />}
          </li>
          <li>
            <span className="w-50 d-inline-block">Phone:</span>
            {userInfo.phone || <Skeleton className="w-50" />}
          </li>
          <li>
            <span className="w-50 d-inline-block">Address:</span>
            {userInfo.address || <Skeleton className="w-50" />}
          </li>
          <li>
            <span className="w-50 d-inline-block">Type:</span>
            {userInfo.type || <Skeleton className="w-50" />}
          </li>
          <li>
            <span className="w-50 d-inline-block">Password:</span>
            {userInfo.password || <Skeleton className="w-50" />}
          </li>
        </ul>

        <button
          className="px-5 py-1 d-block mx-auto"
          onClick={() => editUserHandler(userInfo.id)}
        >
          <BiEdit className="fs-4" /> Edit
        </button>
      </Container>
    </div>
  );
  const listingsContent = (
    <div className={styles.myListing}>
      <h1 className="text-center mb-5">My listings</h1>
      <Container className={styles.myListingContainer}>
        {cars.map((ele) => {
          return (
            <Row className={`${styles.carRow} align-items-center`} key={ele.id}>
              <Col md={3}>
                <NavLink to={`/cars/carId=${ele.id}`} className="mw-100">
                  <div className="w-100 h-100">
                    <img
                      src={ele.carImages[0]}
                      alt="..."
                      className="mw-100 mh-100"
                    />
                  </div>
                </NavLink>
              </Col>
              <Col md={7}>
                <NavLink to={`/cars/carId=${ele.id}`} className="mw-100">
                  <div
                    className={`${styles.carInformation} text-center mt-3 text-md-start`}
                  >
                    <p
                      className={`${styles.title} text-center text-md-start py-2`}
                    >
                      {ele.make} {ele.model} {ele.type}
                    </p>
                    <div>
                      <p className={`fw-bold fs-3 mb-2 ${styles.price}`}>
                        ${ele.price}
                      </p>
                      <div className={`${styles.splitHr} d-none`}></div>
                      <ul
                        className={` d-flex align-items-center w-100 flex-wrap mb-2 d-none d-xl-flex ${styles.featuresUl} `}
                      >
                        {ele?.features.map((ele, index) => {
                          return (
                            <li key={index} className="me-5 my-0 py-0">
                              {ele}
                            </li>
                          );
                        })}
                      </ul>
                      <ul className="list-unstyled d-flex justify-content-md-between justify-content-evenly align-items-center">
                        <li>{ele.year}</li>
                        <li>{ele.transmission}</li>
                        <li>{ele.fuelType}</li>
                        <li className="d-none d-md-block">{ele.driveType}</li>
                      </ul>
                    </div>
                  </div>
                </NavLink>
              </Col>
              <Col md={2} className={styles.actionsCol}>
                <div
                  className={`${styles.actions} d-flex flex-column align-items-center justify-content-center w-100 h-100`}
                >
                  <button
                    className="btn btn-info mb-2 px-md-0"
                    onClick={() => editCarHandler(ele.id)}
                  >
                    <BiEdit className="fs-4" /> Edit
                  </button>
                  <button
                    className="btn btn-danger px-md-0"
                    onClick={() => deleteCarHandler(ele.id)}
                  >
                    {/* <AiFillDelete /> Delete */}
                    <TiDeleteOutline className="fs-3" /> Remove
                  </button>
                </div>
              </Col>
            </Row>
          );
        })}
        {cars.length === 0 && (
          <Row
            className={`${styles.noFavorites} align-items-center justify-content-center fs-3`}
          >
            No listings Yet!
          </Row>
        )}
      </Container>
    </div>
  );
  const favoritesContent = (
    <div className={styles.favorites}>
      <div className={styles.myListing}>
        <h1 className="text-center mb-5">My Favorites</h1>
        <Container className={styles.myFavoritesContainer}>
          {favoritesLength > 0 &&
            favorites.map((ele) => {
              return (
                <Row
                  className={`${styles.carRow} align-items-center`}
                  key={ele.id}
                >
                  <Col md={3}>
                    <NavLink
                      to={`/cars/${ele.id}`}
                      className="mw-100 w-100 h-100"
                    >
                      <div className="w-100 h-100">
                        <img
                          src={ele?.carImages[0]}
                          alt="..."
                          className="mw-100 mh-100 h-100 w-100"
                        />
                      </div>
                    </NavLink>
                  </Col>
                  <Col md={7}>
                    <NavLink to={`/cars/${ele.id}`} className="mw-100">
                      <div
                        className={`${styles.carInformation} text-center mt-3 text-md-start`}
                      >
                        <p
                          className={`${styles.title} text-center text-md-start py-2`}
                        >
                          {ele?.make} {ele?.model} {ele?.type}
                        </p>
                        <div>
                          <p className={`fw-bold fs-3 mb-2 ${styles.price}`}>
                            ${ele?.price}
                          </p>
                          <div className={`${styles.splitHr} d-none`}></div>
                          <ul
                            className={` d-flex align-items-center w-100 flex-wrap mb-2 d-none d-xl-flex ${styles.featuresUl} `}
                          >
                            {ele?.features.map((ele, index) => {
                              return (
                                <li key={index} className="me-5 my-0 py-0">
                                  {ele}
                                </li>
                              );
                            })}
                          </ul>
                          <ul className="list-unstyled d-flex justify-content-md-between justify-content-evenly align-items-center">
                            <li>{ele?.year}</li>
                            <li>{ele?.transmission}</li>
                            <li>{ele?.fuelType}</li>
                            <li className="d-none d-md-block">
                              {ele?.driveType}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </NavLink>
                  </Col>
                  <Col md={2} className={styles.actionsCol}>
                    <div
                      className={`${styles.actions} d-flex flex-column align-items-center justify-content-center w-100 h-100`}
                    >
                      <button
                        className="btn btn-danger px-md-0 d-flex align-items-center justify-content-center"
                        onClick={() => removeFavoriteHandler(ele)}
                      >
                        <TiDeleteOutline className="fs-3" />
                        Remove
                      </button>
                    </div>
                  </Col>
                </Row>
              );
            })}
          {favoritesLength === 0 && (
            <Row
              className={`${styles.noFavorites} align-items-center justify-content-center fs-3`}
            >
              No Favorites Yet!
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
  let content = accountContent;
  if (isActive === "Account") {
    content = isLoading ? <LoadingSpinner /> : accountContent;
  } else if (isActive === "addListing") {
    content = (
      <div className={styles.addListing}>
        <SellYourCar />
      </div>
    );
  } else if (isActive === "myListings") {
    content = isLoading ? <LoadingSpinner /> : listingsContent;
  } else if (isActive === "favorites") {
    content = isLoading ? <LoadingSpinner /> : favoritesContent;
  }
  //
  return (
    <div className={styles.profile}>
      <div className={styles.profileHeader}>
        <Container>
          <div className="d-flex flex-column">
            <div className={`${styles.image} text-center mb-5`}>
              {userInfo.name.slice(0, 1).toUpperCase()}
            </div>
            <Row className={`${styles.links}`}>
              <Col md={3} className="mb-2 mb-md-0">
                <NavLink
                  className={
                    isActive === "Account"
                      ? `btn  w-100 ${styles.active} ${styles.myButton}`
                      : "btn w-100"
                  }
                  to={`${location.pathname}?type=Account`}
                  onClick={() => filterActive("Account")}
                >
                  <BsGearFill /> Account
                </NavLink>
              </Col>
              <Col md={3} className="mb-2 mb-md-0">
                <NavLink
                  className={
                    isActive === "addListing"
                      ? `btn  w-100 ${styles.active} ${styles.myButton}`
                      : "btn w-100"
                  }
                  to={`${location.pathname}?type=addListing`}
                  onClick={() => filterActive("addListing")}
                >
                  <MdAdd /> Add Listing
                </NavLink>
              </Col>
              <Col md={3} className="mb-2 mb-md-0">
                <NavLink
                  className={
                    isActive === "myListings"
                      ? `btn  w-100 ${styles.active} ${styles.myButton}`
                      : "btn w-100"
                  }
                  to={`${location.pathname}?type=myListings`}
                  onClick={() => filterActive("myListings")}
                >
                  <BsListUl /> My Listings ({cars.length})
                </NavLink>
              </Col>
              <Col md={3} className="mb-2 mb-md-0">
                <NavLink
                  className={
                    isActive === "favorites"
                      ? `btn  w-100 ${styles.active} ${styles.myButton}`
                      : "btn w-100"
                  }
                  to={`${location.pathname}?type=favorites`}
                  onClick={() => filterActive("favorites")}
                >
                  <MdFavorite /> My Favorites ({favoritesLength})
                </NavLink>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      {content}
    </div>
  );
};

export default Profile;
///
export const userLoader = async ({ request, params }) => {
  const id = params.userId;
  const response = await fetch(
    `https://cars-3a440-default-rtdb.firebaseio.com/users/${id}.json`
  );
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for this user." },
      { status: 500 }
    );
  } else {
    const responseData = await response.json();
    return responseData;
  }
};
///////////////////
/////getCars///
// const getCars = `https://cars-3a440-default-rtdb.firebaseio.com/cars.json`;
// const [cars, setCars] = useState([]);
// useEffect(() => {
//   const transformData = (data) => {
//     let loadedCars = [];
//     Object.entries(data).map((ele) => {
//       if (ele[1].uId === userId) {
//         loadedCars.push(ele[1]);
//       }
//     });
//     setCars(loadedCars);
//   };
//   requestFn(
//     {
//       url: getCars,
//     },
//     transformData
//   );
// }, [requestFn, getCars, userId]);
// const carsData = useMemo(() => cars, [cars]);
//////
/////getUserOldInfo///
// const getUserApi = `https://cars-3a440-default-rtdb.firebaseio.com/users.json`;
// const [userInfo, setUserInfo] = useState({});
// useEffect(() => {
//   const transformData = (data) => {
//     Object.entries(data).map((ele) => {
//       if (ele[1].id === userId) {
//         setUserInfo(ele[1]);
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
///////////////////
