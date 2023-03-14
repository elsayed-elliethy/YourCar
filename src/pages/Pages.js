import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import NavComponent from "../common/nav/Nav";
import Footer from "../common/footer/Footer";
import { Outlet, redirect, useNavigation } from "react-router-dom";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import { checkIsLogin } from "../components/Auth/auth";
import useHttp from "../hook/use-http";
import ScrollToTop from "../components/scrollToTop";
///
let isInitial = true
const Pages = () => {
  const navigation = useNavigation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const expirationDate = new Date(currentUser.expirationTime);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  const login = checkIsLogin();
  ////////
  useEffect(() => {
    if (!login) {
      return;
    }
    if (duration < 0) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ token: "", id: "", expirationTime: -1 })
      );
      return redirect("/");
    }
    setTimeout(() => {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ token: "", id: "", expirationTime: -1 })
      );
      return redirect("/");
    }, duration);
  }, [login, duration]);
  ////////
  const { isLoading, error, requestFn: sendData } = useHttp();
  const favorites = useSelector((state) => state.manageFavorites.items);
useEffect(()=>{
  if (!login) {
    return;
  }
    if(isInitial){
      isInitial = false
      return
    }
    const submitFn = () => {
    };
    sendData(
      {
        url: `https://cars-3a440-default-rtdb.firebaseio.com/users/${currentUser.id}/favorites.json`,
        method: "PUT",
        body: favorites,
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${currentUser.token}`,
        },
      },
      submitFn
    );
},[sendData,favorites,currentUser.id,login,currentUser.token])
/////////
  return (
    <>
      <NavComponent />
      <ScrollToTop />
      {navigation.state === "loading" ? <LoadingSpinner /> : <Outlet />}
      <Footer />
    </>
  );
};

export default Pages;
