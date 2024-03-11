import Input from "../../pages/Input";
import { useFormik } from "formik";
import { installOrderSchema } from "../validation/auth.js";
import axios from "axios";

import { useContext } from "react";
import { UserContext } from "../context/User.jsx";
import { toast } from "react-toastify";
import "./createOrder.css";
import { cartContext } from "../context/Cart.jsx";
import { queryClient } from "../../../main.jsx";

export default function CreateOrder() {
  const { userToken } = useContext(UserContext);
  const initialValues = {
    couponName: "",
    address: "",
    phone: "",
  };

  const onSubmit = async (users) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/order`,
      users,
      {
        headers: {
          Authorization: `Tariq__${userToken}`,
        },
      }
    );
    if (data.message === "success") {
      toast.success("Order Installed successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      queryClient.invalidateQueries({ queryKey: ["order"] });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: installOrderSchema,
  });

  const inputs = [
    {
      id: "couponName",
      type: "text",
      name: "couponName",
      title: "Coupon",
      value: formik.values.couponName,
    },
    {
      id: "address",
      type: "text",
      name: "address",
      title: "Address",
      value: formik.values.address,
    },
    {
      id: "phone",
      type: "text",
      name: "phone",
      title: "Phone Number",
      value: formik.values.phone,
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

  const { cart } = useContext(cartContext);

  return (
    <>
      <div className="container main-order">
        <h2>Create Order</h2>
        <div className="product-priv">
          {cart?.products.map((product) => (
            <div
              key={product.productId}
              className="card"
              style={{ width: "18rem" }}
            >
              <img
                className="card-img-top"
                src={product.details.mainImage.secure_url}
                alt="Card image cap"
              />
              <div className="card-body">
                <div className="quantity">Quantity : {product.quantity}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="form-login">
          <h2>Order</h2>
          <form onSubmit={formik.handleSubmit} data-bs-theme="dark">
            {renderInputs}
            <div className="form-group btn-login">
              <button
                type="submit"
                disabled={!formik.isValid}
                className="btn btn-dark"
              >
                Install Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
