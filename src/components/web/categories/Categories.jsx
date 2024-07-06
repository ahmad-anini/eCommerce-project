import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./categories.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

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
    return (
      <Loader/>
    );
  }

  return (
    <>
      <div className=" main">
        <div className="categories container">
          <h3>Categories</h3>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={4.5}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{
              delay: 1500,
            }}
          >
            {data?.categories?.length
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
