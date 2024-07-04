import Input from "../../pages/Input";
import { useFormik } from "formik";
import { registerSchema } from "../validation/auth.js";
import axios from "axios";
import "./register.css";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState(null);
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    image: "",
  };

  const onSubmit = async (users) => {
    try {
      const formData = new FormData();
      formData.append("userName", users.userName);
      formData.append("email", users.email);
      formData.append("password", users.password);
      formData.append("image", users.image);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        formData
      );
      if (data.message === "success") {
        formik.resetForm();
        toast.success("Register successfully Please Check Your Email", {
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
    validationSchema: registerSchema,
  });

  const handelFieldChange = (event) => {
    formik.setFieldValue("image", event.target.files[0]);
  };
  const inputs = [
    {
      id: "username",
      type: "text",
      name: "userName",
      title: "User Name",
      value: formik.values.userName,
    },
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
      id: "image",
      type: "file",
      name: "image",
      title: "user image",
      onChange: handelFieldChange,
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
      onChange={input.onChange || formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
    />
  ));

  return (
    <>
      <div className="container main-register">
        <div className="form-register">
          <h2>Create Account</h2>
          <form
            onSubmit={formik.handleSubmit}
            data-bs-theme="dark"
            encType="multipart/form-data"
          >
            {renderInputs}
            <div className=" btn-register">
              <button
                type="submit"
                className="btn btn-dark"
                disabled={!formik.isValid}
              >
                Register
              </button>
            </div>
            <div className="login-error">
              {errorMessage && (
                <small className="form-text text-danger">{errorMessage}</small>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
