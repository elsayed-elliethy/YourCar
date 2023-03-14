import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  let title = "An error occurred";
  let message = "Could not find this page!";
  if (error.status === 500) {
    // message = JSON.parse(error.data).message;
    message = error.data.message;
  }
  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page!";
  }
  return (
    <main className="text-center mt-5 mx-auto">
      <h1>{title}</h1>
      <p>{message}</p>
    </main>
  );
};

export default ErrorPage;
