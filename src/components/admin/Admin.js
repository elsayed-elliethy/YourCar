import React, { Fragment, useMemo, useState, useEffect } from "react";
import AdminNav from "./adminNav/AdminNav";
import useHttp from "../../hook/use-http";
import { Outlet } from "react-router-dom";
import AdminFooter from "./adminFooter/AdminFooter";
const Admin = () => {
  return (
    <Fragment>
      <AdminNav />
      <Outlet />
      <AdminFooter />
    </Fragment>
  );
};

export default Admin;
