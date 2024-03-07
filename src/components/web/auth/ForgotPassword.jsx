import Input from "../../pages/Input";
import { useFormik } from "formik";
import { forgotPasswordSchema, loginSchema } from "../validation/auth.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../context/User.jsx";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    code: "",
  };

  const onSubmit = async (users) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/auth/forgotPassword`,
        users
      );
      if (data.message === "success") {
        toast.success("Password changed successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: forgotPasswordSchema,
  });

  const inputs = [
    {
      id: "email",
      type: "email",
      name: "email",
      title: "Email address",
      value: formik.values.email,
    },
    {
      id: "password",
      type: "password",
      name: "password",
      title: "Password",
      value: formik.values.password,
    },
    {
      id: "code",
      type: "text",
      name: "code",
      title: "Code",
      value: formik.values.code,
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
        <div className="form-login">
          <h2>Rest password</h2>
          <form onSubmit={formik.handleSubmit} data-bs-theme="dark">
            {renderInputs}
            <div className="form-group btn-login">
              <button
                type="submit"
                disabled={!formik.isValid}
                className="btn btn-dark"
              >
                Rest
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
