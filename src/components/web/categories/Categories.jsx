import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./categories.css";
import { Link } from "react-router-dom";
import { cartContext } from "../context/Cart";
export default function Categories() {
  const getCategories = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/categories/active?limit=10`
    );
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["web_categories"],
    queryFn: getCategories,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className=" main">
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
        <div className="categories container">
          <h3>Categories</h3>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={4.5}
            navigation
            pagination={{ clickable: true }}
            // loop={true}
            // autoplay={{
            //   delay: 3000,
            // }}
          >
            {data?.categories.length
              ? data.categories.map((categorie) => (
                  <SwiperSlide key={categorie._id}>
                    <Link to={`/products/categories/${categorie._id}`}>
                      <img src={categorie.image.secure_url} />
                    </Link>
                  </SwiperSlide>
                ))
              : "no category found"}
          </Swiper>
        </div>
      </div>
    </>
  );
}
