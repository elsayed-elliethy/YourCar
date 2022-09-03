import React from "react";
import Nav from "../common/nav/Nav";
import Home from "../components/home/Home";
import { Routes, Route } from "react-router-dom";
import CarsForSale from "../components/carsForSale/CarsForSale";
import CarsForRent from "../components/carsForRent/CarsForRent";
import SellYourCar from "../components/sellYourCar/SellYourCar";
import AuthForm from "../components/Auth/AuthForm";
import { useSelector } from "react-redux";
import CarDetails from "../components/carDetails/CarDetails";
const Pages = () => {
  const login = useSelector((state) => {
    return state.auth.isloggedIn;
  });
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carsForSale" element={<CarsForSale />} />
        <Route path="/carsForRent" element={<CarsForRent />} />
        <Route path="/cars/:carId" element={<CarDetails />} />

        <Route
          path="/sellYourCar"
          element={<SellYourCar />}
          // element={login ? <SellYourCar /> : <AuthForm />}
        />
        <Route path="/auth" element={<AuthForm />} />
        {/* <Route path="/search/:searchValue" element={<SearchResult />} /> */}
      </Routes>
    </div>
  );
};

export default Pages;
