import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { queryClient } from "../../../main";

export const cartContext = createContext(null);

export function CartContextProvider({ children }) {
  const token = localStorage.getItem("userToken");
  const [count, setCount] = useState(0);

  // start getCart functionality

  const getCart = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setCount(data.count);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  if (isSuccess) {
    queryClient.invalidateQueries(["cart"]);
  }

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

      queryClient.invalidateQueries("cart");
    },
  });

  const removeItem = async (productId) => {
    try {
      await mutateRemoveItem(productId);
    } catch (error) {
      console.log(error);
    }
  };

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
    try {
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
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // end addToCart functionality

  // start clearCart functionality

  const clearCartContext = async () => {
    try {
      await mutateClearCart();
    } catch (error) {
      console.log(error);
    }
  };

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

      queryClient.invalidateQueries("cart");
    },
  });

  //end clearCart functionality

  // start increaseQuantity functionality

  const increaseQuantityContext = async (productId) => {
    try {
      const { data } = await increaseQuantity(productId);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { mutateAsync: increaseQuantity } = useMutation({
    mutationFn: async (productId) => {
      const response = await axios.patch(
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
      queryClient.invalidateQueries("cart");
    },
  });

  // end increaseQuantity functionality

  //start decraseQuantity functionality

  const decraseQuantityContext = async (productId) => {
    try {
      const { data } = await decraseQuantity(productId);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { mutateAsync: decraseQuantity } = useMutation({
    mutationFn: async (productId) => {
      const response = await axios.patch(
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
      queryClient.invalidateQueries("cart");
    },
  });

  //end decraseQuantity functionality

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <cartContext.Provider
        value={{
          addToCartContext,
          cart: data,
          isLoading,
          removeItem,
          clearCartContext,
          //count: data?.length || 0,
          count,
          setCount,
          increaseQuantityContext,
          decraseQuantityContext,
        }}
      >
        {children}
      </cartContext.Provider>
    </>
  );
}
