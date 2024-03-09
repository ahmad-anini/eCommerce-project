import React, { useEffect } from "react";
import "./products.css";
import axios from "axios";
import { useActionData, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
export default function Products() {
  const { data, isLoading } = useQuery({
    queryKey: ["all_product"],
    queryFn: (pageNum = 1) =>
      axios.get(
        `${import.meta.env.VITE_API_URL}/products?page=${pageNum}&limit=4`
      ),
  });

  console.log(data?.total);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container products-main">
        <div>Products</div>
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link w-100" href="#" aria-label="Previous">
              <span aria-hidden="true">«</span>
            </button>
          </li>
          <li className="page-item">
            <button className="page-link w-100" href="#">
              1
            </button>
          </li>
          {/* {Array.from({ length: Math.round(data?.total / 4) }, (_, index) => (
            <li className="page-item" key={index}>
              <button className="page-link w-100" href="#">
                {index + 1}
              </button>
            </li>
          ))} */}
          <li className="page-item">
            <button className="page-link w-100" href="#" aria-label="Next">
              <span aria-hidden="true">»</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
