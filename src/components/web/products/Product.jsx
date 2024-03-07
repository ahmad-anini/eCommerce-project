import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { cartContext } from "../context/Cart";
import "./product.css";
export default function Product() {
  const { productId } = useParams();
  const { addToCartContext } = useContext(cartContext);

  const addToCart = async (productId) => {
    const res = await addToCartContext(productId);
  };

  const getProduct = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${productId}`
    );
    return data.product;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: getProduct,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="product container">
        <div className="imgs">
          <div className="mainImg">
            <img src={data.mainImage.secure_url} />
          </div>
          <div className="subImgs row">
            {data.subImages.map((img, index) => (
              <img src={img.secure_url} className="col sub-img" key={index} />
            ))}
          </div>
        </div>
        <div className="details">
          <h2>{data.name}</h2>
          <h3> Price : {data.price}$</h3>
          <p>{data.description}</p>
          <button className="btn btn-dark" onClick={() => addToCart(data._id)}>
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
}
