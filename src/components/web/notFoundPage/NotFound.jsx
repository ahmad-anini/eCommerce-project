import React from "react";
import "./notFound.css";
import notFoundImage from "../../../../public/not_found_image.svg";
export default function NotFound() {
  return (
    <div className="container not-found-cont">
      <h2>page not found</h2>
      <img src={notFoundImage} alt="not found image" />
    </div>
  );
}
