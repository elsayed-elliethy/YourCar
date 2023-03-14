import React from "react";

const AdminFooter = () => {
  return (
    <footer className="py-5 text-center position-relative bottom-0 w-100">
      <p className="m-0 text-break">
        Copyright © {new Date().getFullYear()} <span>YourCar. </span>All rights
        reserved.
      </p>
    </footer>
  );
};

export default AdminFooter;
