import React from "react";
import Categories from "../categories/Categories";
import main_image from "../../../../public//undraw_web_shopping_re_owap.svg";
import Typewriter from "typewriter-effect";
export default function Home() {
  return (
    <>
      <div className="main">
        <div className="home">
          <div className="home-text">
            <h2>
              <Typewriter
                options={{
                  strings: ["Welcome To Ahmad Shop"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h2>

            <p>Discover The Latest Trends In Fashion And Shop Your Style !</p>
          </div>
          <div className="home-img">
            <img src={main_image} alt="" />
          </div>
        </div>
        <Categories />
      </div>
    </>
  );
}
