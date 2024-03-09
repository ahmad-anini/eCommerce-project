import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { queryClient } from "../../../main";
import { UserContext } from "./User";

export const cartContext = createContext(null);

export function CartContextProvider({ children }) {
  const { userToken: token } = useContext(UserContext);

  const [count, setCount] = useState(0);

  // start getCart functionality

  const getCart = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
      headers: {
        Authorization: `Tariq__${token}`,
      },
    });
    setCount(data.count);
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: !!token,
  });

  // end getCart functionality

  // start removeItem functionality

  const { mutateAsync: mutateRemoveItem } = useMutation({
    mutationFn: async (productId) => {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/removeItem`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setCount(response.data.count);
    },
    onSuccess: () => {
      toast.success("Item Removed From Cart", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // end removeItem functionality

  // start addToCart functionality

  const addToCartContext = async (productId) => {
    if (!token) {
      toast.error("Please login first", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/cart`,
      { productId },
      { headers: { Authorization: `Tariq__${token}` } }
    );
    setCount((prevValue) => prevValue + 1);
    if (data.message == "success") {
      toast.success("The product has been added to the cart successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
    return data;
  };

  // end addToCart functionality

  // start clearCart functionality

  const { mutateAsync: mutateClearCart } = useMutation({
    mutationFn: async () => {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/clear`,
        {},
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setCount(response.data.count);
    },
    onSuccess: () => {
      toast.success("cart cleared successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  //end clearCart functionality

  // start increaseQuantity functionality

  const {
    mutateAsync: increaseQuantity,
    isPending: isPendingIncreaseQuantity,
  } = useMutation({
    mutationFn: async (productId) => {
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // end increaseQuantity functionality

  //start decraseQuantity functionality

  const { mutateAsync: decraseQuantity, isPending: isPendingDecraseQuantity } =
    useMutation({
      mutationFn: async (productId) => {
        return await axios.patch(
          `${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
          { productId },
          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    });

  //end decraseQuantity functionality

  if (isLoading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ width: "100%", height: "100vh" }}
      >
        <div
          className="spinner-border"
          style={{ width: "120px", height: "120px" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <cartContext.Provider
        value={{
          addToCartContext,
          cart: data,
          isLoading,
          mutateRemoveItem,
          mutateClearCart,
          //count: data?.length || 0,
          count,
          setCount,
          increaseQuantity,
          isPendingIncreaseQuantity,
          decraseQuantity,
          isPendingDecraseQuantity,
        }}
      >
        {children}
      </cartContext.Provider>
    </>
  );
}
