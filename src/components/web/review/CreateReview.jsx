import Input from "../../pages/Input";
import { useFormik } from "formik";
import { createReviewSchema } from "../validation/auth.js";
import axios from "axios";
import { useParams } from "react-router-dom";

import "../login/login.css";
import { useContext, useState } from "react";
import { UserContext } from "../context/User.jsx";
import { toast } from "react-toastify";
export default function CreateReview() {
  const { productId } = useParams();
  const { userToken } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [filledStars, setFilledStars] = useState(0);
  const initialValues = {
    comment: "",
    rating: "",
  };

  const onSubmit = async (commentData) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/${productId}/review`,
        commentData,
        {
          headers: {
            Authorization: `Tariq__${userToken}`,
          },
        }
      );
      if (data.message === "success") {
        toast.success("successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: createReviewSchema,
  });

  const inputs = [
    {
      id: "comment",
      type: "text",
      name: "comment",
      title: "Comment",
      value: formik.values.comment,
    },
  ];

  const renderInputs = inputs.map((input, index) => (
    <Input
      type={input.type}
      id={input.id}
      name={input.name}
      title={input.title}
      key={index}
      value={input.value}
      errors={formik.errors}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
    />
  ));

  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa-star ${i < filledStars ? "fa-solid" : "fa-regular"}`}
          style={{ color: "#FFD43B", cursor: "pointer" }}
          onClick={() => setFilledStars(i + 1)}
        ></i>
      );
    }
    formik.values.rating = filledStars;
    return stars;
  };
  return (
    <div className="container main-login">
      <div className="form-login">
        <h2> Create Review</h2>
        <form onSubmit={formik.handleSubmit} data-bs-theme="dark">
          {renderInputs}
          <div className="stars-container w-100 h-25 d-flex justify-content-center align-items-center m-b-1">
            {renderStars()}
          </div>
          <div className="form-group btn-login">
            <button
              type="submit"
              disabled={!formik.isValid}
              className="btn btn-dark"
            >
              Add Review
            </button>
          </div>
          <div className="login-error">
            {errorMessage && (
              <small className="form-text text-danger">{errorMessage}</small>
            )}
          </div>
          <br />
        </form>
      </div>
    </div>
  );
}
