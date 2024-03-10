import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import "./categoriesDetails.css";
import Stars from "../../pages/Stars";
export default function CategoriesDetails() {
  const { categoryId } = useParams();

  const getProducts = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/category/${categoryId}`
    );
    return data.products;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["category_details", categoryId],
    queryFn: getProducts,
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
      <div className="container main-cont">
        <div className="row my-row">
          {data.length ? (
            data.map((product) => (
              <div
                className="card col-md-4 gy-3 test"
                key={product._id}
                style={{ width: "18rem" }}
              >
                <img
                  className="card-img-top"
                  src={product.mainImage.secure_url}
                  alt="Card image cap"
                />
                <div className="card-body  my-card">
                  <h5 className="card-title">{product.name}</h5>
                  <div className="stars">
                    <Stars starNum={Math.round(product.avgRating)} />
                  </div>
                  <h4>{product.price}$</h4>
                  <Link
                    to={`/product/${product._id}`}
                    className="btn btn-dark my-btn"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>no product</p>
          )}
        </div>
      </div>
    </>
  );
}
