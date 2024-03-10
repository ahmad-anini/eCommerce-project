import React from "react";

export default function Stars({ starNum }) {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const starClass = i < starNum ? "fa-solid" : "fa-regular";
      stars.push(
        <i
          key={i}
          className={`fa-star ${starClass}`}
          style={{ color: "#FFD43B" }}
        ></i>
      );
    }
    return stars;
  };
  return <div className="stars-container">{renderStars()}</div>;
}
