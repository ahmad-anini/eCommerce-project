import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({ Access, children }) {
  if (Access == "cart" && !localStorage.getItem("userToken")) {
    toast.warn("Please Login First", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return <Navigate to={`/login`} />;
  } else if (Access == "login" && localStorage.getItem("userToken")) {
    toast.warn("You are already logged in", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return <Navigate to={`/`} />;
  } else if (Access == "register" && localStorage.getItem("userToken")) {
    return <Navigate to={`/`} />;
  }

  return children;
}
