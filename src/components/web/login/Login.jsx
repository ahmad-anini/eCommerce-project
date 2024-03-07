import Input from "../../pages/Input";
import { useFormik } from "formik";
import { loginSchema } from "../validation/auth.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./login.css";
import { useContext, useState } from "react";
import { UserContext } from "../context/User.jsx";
import { toast } from "react-toastify";

export default function Login() {
  let { setUserToken } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (users) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signin`,
        users
      );
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        setUserToken(data.token);
        toast.success("login successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: loginSchema,
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
          <h2>sign in</h2>
          <form onSubmit={formik.handleSubmit} data-bs-theme="dark">
            {renderInputs}
            <div className="form-group btn-login">
              <button
                type="submit"
                disabled={!formik.isValid}
                className="btn btn-dark"
              >
                Login
              </button>
            </div>
            <div className="forgot-password">
              <Link to={"/sendCode"}>
                <small className="form-text text-muted">Forgot Password?</small>
              </Link>
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
    </>
  );
}
