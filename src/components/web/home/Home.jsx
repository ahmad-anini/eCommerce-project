import React from "react";
import Categories from "../categories/Categories";

export default function Home() {
  return (
    <>
      <div className="main">
        <div className="home">
          <div className="home-text">
            <h2>Welcome To Ahmad-Shop</h2>
            <p>Discover the latest trends in fashion and shop your style!</p>
          </div>
          <div className="home-img">
            <img
              src={"../../../../public//undraw_web_shopping_re_owap.svg"}
              alt=""
            />
          </div>
        </div>
        <Categories />
      </div>
    </>
  );
}
