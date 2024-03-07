import React from "react";
import Input from "../../pages/Input";
import { useFormik } from "formik";
import { registerSchema } from "../validation/auth.js";
import axios from "axios";
import "./register.css";

export default function Register() {
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    image: "",
  };

  const onSubmit = async (users) => {
    const formData = new FormData();
    formData.append("userName", users.userName);
    formData.append("email", users.email);
    formData.append("password", users.password);
    formData.append("image", users.image);
    const { data } = await axios.post(
      `https://ecommerce-node4.vercel.app/auth/signup`,
      formData
    );
    if (data.message === "success") {
      formik.resetForm();
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
          </form>
        </div>
      </div>
    </>
  );
}
