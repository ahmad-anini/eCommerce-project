import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { sendCodeSchema } from "../validation/auth";
import Input from "../../pages/Input";

import "./sendCode.css";

export default function SendCode() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };

  const onSubmit = async (users) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/auth/sendcode`,
        users
      );
      if (data.message === "success") {
        toast.success("Code Seded successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/resetPassword");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: sendCodeSchema,
  });

  const inputs = [
    {
      id: "email",
      type: "email",
      name: "email",
      title: "Email address",
      value: formik.values.email,
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

  return (
    <>
      <div className="container main-login">
        <div className="form-send-code">
          <h2>Send Code</h2>
          <form onSubmit={formik.handleSubmit} data-bs-theme="dark">
            {renderInputs}
            <div className="form-group btn-login">
              <button
                type="submit"
                disabled={!formik.isValid}
                className="btn btn-dark"
              >
                Send Code
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
