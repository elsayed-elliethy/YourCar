import { redirect } from "react-router-dom";

export const checkIsLogin = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const expirationDate = new Date(currentUser.expirationTime);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  const login =
    currentUser.token !== "" && currentUser.id !== "" && duration > 0;
  return login;
};
export const checkAuthLoader = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const expirationDate = new Date(currentUser.expirationTime);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  const login =
    currentUser.token !== "" && currentUser.id !== "" && duration > 0;
  if (!login) {
    return redirect("/auth?mode=login");
  }
  return null;
};
export const checkAuthAdminLoader = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const expirationDate = new Date(currentUser.expirationTime);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  const login =
    currentUser.token !== "" &&
    currentUser.id === "bvBMNCickleWugVshqAUPTvOcs03" &&
    duration > 0;
  if (!login) {
    return redirect("/auth?mode=login");
  }
  return null;
};
