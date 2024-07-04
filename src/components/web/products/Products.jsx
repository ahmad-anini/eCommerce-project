import "./products.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function Products() {
  const [page, setPage] = useState(1);

  async function getProducts(pageNumber) {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products?page=${pageNumber}&limit=4`
    );
    return data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page),
  });

  function handlePrevPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function handleNextPage() {
    if (data && data.total > page * 4) {
      setPage(page + 1);
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container products-main">
      <div className="row my-row">
        {data ? (
          data.products?.map((product) => (
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
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link w-100"
            aria-label="Previous"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            <span aria-hidden="true">«</span>
          </button>
        </li>
        {Array.from({ length: Math.ceil(data?.total / 4) }, (_, index) => (
          <li className="page-item" key={index}>
            <button
              className={`page-link w-100 ${
                page === index + 1 ? "active" : ""
              }`}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            className="page-link w-100"
            aria-label="Next"
            onClick={handleNextPage}
            disabled={data && data?.total <= page * 4}
          >
            <span aria-hidden="true">»</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
