import React from "react";
import "./Loader.css"; // Adjust the path as needed

export default function Loader() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ width: "100%", height: "90vh" }}
    >
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
