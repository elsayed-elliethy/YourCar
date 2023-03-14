import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Pages from "./pages/Pages";
////
import { createBrowserRouter, Router, RouterProvider, useLocation } from "react-router-dom";
import Home from "./components/home/Home";
import CarsForSale from "./components/carsForSale/CarsForSale";
import CarsForRent from "./components/carsForRent/CarsForRent";
import SellYourCar from "./components/sellYourCar/SellYourCar";
import Login from "./components/Auth/Login";
import About, { teamLoader } from "./components/about/About";
import Contact from "./components/contact/Contact";
import CarDetails, {
  carDetailsLoader,
} from "./components/carDetails/CarDetails";
import Profile, { userLoader } from "./components/profile/Profile";
import EditCar from "./components/edit/EditCar";
import EditInfo from "./components/editInfo/EditInfo";
import Search from "./components/search/Search";
import Admin from "./components/admin/Admin";
import AdminHome from "./components/admin/AdminHome";
import Categories from "./components/admin/Categories";
import Listings from "./components/admin/Listings";
import Users from "./components/admin/Sellers";
import Team from "./components/admin/Team";
import Signup from "./components/Auth/Signup";
import ErrorPage from "./pages/Error";
///
import { carsLoader } from "./components/carsForSale/CarsForSale";
import { AddEmployee, addEmployeeAction } from "./components/admin/AddEmployee";
import AddSeller from "./components/admin/AddSeller";
import AddCategory from "./components/admin/AddCategory";
import AddListing from "./components/admin/AddListing";
import AuthForm, { authenticationActions } from "./components/Auth/AuthForm";
import { useEffect, useState } from "react";
import { checkAuthAdminLoader, checkAuthLoader, checkIsLogin } from "./components/Auth/auth";
import useHttp from "./hook/use-http";
import { favoritesActions } from "./store";
// 
function App() {
/////getUserInfo///
const { isLoading, error, requestFn } = useHttp();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
const dispatch = useDispatch()
const getUserApi = `https://cars-3a440-default-rtdb.firebaseio.com/users.json`;
const [userInfo, setUserInfo] = useState({});
useEffect(() => {
  const transformData = (data) => {
    Object.entries(data).map((ele) => {
      if (ele[1].id === currentUser.id) {
        setUserInfo(ele[1]);
        if(ele[1].favorites ){
          dispatch(favoritesActions.replaceFavorites({items: ele[1].favorites, totalAmount: ele[1].favorites?.length}))
        }else{
          dispatch(favoritesActions.replaceFavorites({items: [], totalAmount: 0}))
        }
      }
    });
  };
  requestFn(
    {
      url: getUserApi,
    },
    transformData
  );
}, [requestFn, getUserApi, currentUser.id,dispatch]);
////
const favorites = userInfo.favorites
if(favorites){
  dispatch(favoritesActions.replaceFavorites({items: favorites, totalAmount: favorites?.length}))
}
  ////
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Pages />,
      loader: carsLoader,
      id: "all-cars",
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          // path: "/",
          element: <Home />,
          loader: teamLoader,
        },
        {
          path: "/cars/carsForSale",
          element: <CarsForSale />,
        },
        { path: "/cars/carsForRent", element: <CarsForRent /> },
        {
          path: "/sellYourCar",
          element: <SellYourCar />,
          loader: checkAuthLoader,
        },
        { path: "/about", element: <About />, loader: teamLoader },
        { path: "/contactUs", element: <Contact /> },
        {
          path: "/cars/:carId",
          loader: carDetailsLoader,
          id: "car-details",
          children: [
            {
              index: true,
              element: <CarDetails />,
            },
            {
              path: "/cars/:carId/edit",
              element: <EditCar />,
              loader: checkAuthLoader,
            },
          ],
        },
        {
          path: "/profile/:userId",
          loader: userLoader,
          id: "user-information",
          children: [
            { index: true, element: <Profile />, loader: checkAuthLoader },
            {
              path: "/profile/:userId/editInfo",
              element: <EditInfo />,
              loader: checkAuthLoader,
            },
          ],
        },
        { path: "/search/:searchValue", element: <Search /> },
        { path: "/auth", element: <AuthForm />, action: authenticationActions },
        { path: "/auth/login", element: <Login /> },
        { path: "/auth/signup", element: <Signup /> },
      ],
    },
    {
      path: "/adminDashboard",
      element: <Admin />,
      loader: checkAuthAdminLoader,
      errorElement: <ErrorPage />,
      children: [
        { path: "/adminDashboard", element: <AdminHome /> },
        { path: "/adminDashboard/categories", element: <Categories /> },
        {
          path: "/adminDashboard/categories/addCategory",
          element: <AddCategory />,
        },
        { path: "/adminDashboard/listings", element: <Listings /> },
        {
          path: "/adminDashboard/listings/addListing",
          element: <AddListing />,
        },
        { path: "/adminDashboard/users", element: <Users /> },
        { path: "/adminDashboard/users/addUser", element: <AddSeller /> },
        {
          path: "/adminDashboard/team",
          element: <Team />,
        },
        {
          path: "/adminDashboard/team/addEmployee",
          element: <AddEmployee method="PUT" />,
          action: addEmployeeAction,
        },
      ],
    },
  ]);

  ///
  return (
    <div className="App">
      
      {/* {location.pathname.includes("/adminDashboard") === false && ( */}
      {/* )} */}
      <RouterProvider router={router} />    
    </div>
  );
}

export default App;
