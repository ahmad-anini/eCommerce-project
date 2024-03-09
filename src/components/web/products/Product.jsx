import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { cartContext } from "../context/Cart";
import "./product.css";
export default function Product() {
  const { productId } = useParams();
  const { addToCartContext } = useContext(cartContext);

  const getProduct = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${productId}`
    );
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["product", { productId }],
    queryFn: getProduct,
  });

  if (isLoading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ width: "100%", height: "100vh" }}
      >
        <div
          className="spinner-border"
          style={{ width: "120px", height: "120px" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="product container">
        <div className="imgs">
          <div className="mainImg">
            <img src={data.product.mainImage.secure_url} />
          </div>
          <div className="subImgs row">
            {data.product.subImages.map((img, index) => (
              <img src={img.secure_url} className="col sub-img" key={index} />
            ))}
          </div>
        </div>
        <div className="details">
          <h2>{data.product.name}</h2>
          <div className="price-rev">
            <h3> Price : {data.product.price}$</h3>
            <div className="stars">
              {Array.from(
                { length: Math.round(data.avgRating) },
                (_, index) => (
                  <i
                    key={index}
                    className="fa-solid fa-star"
                    style={{ color: "#FFD43B" }}
                  />
                )
              )}
            </div>
          </div>

          <p>{data.product.description}</p>
          <button
            className="btn btn-dark"
            onClick={() => addToCartContext(data.product._id)}
          >
            Add To Cart
          </button>
          <div className="feedback">
            <h2>Feedback</h2>
            {data?.product.reviews.map((review) => (
              <div className="review" key={review._id}>
                <div className="head-rev">
                  <img src={"../../../../public/user_profile.png"} alt="" />
                  <h3>User</h3>
                </div>
                <div className="body-rev">
                  <div className="stars">
                    {Array.from(
                      { length: Math.round(review.rating) },
                      (_, index) => (
                        <i
                          key={index}
                          className="fa-solid fa-star"
                          style={{ color: "#FFD43B" }}
                        />
                      )
                    )}
                  </div>
                  <p>{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
