import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { queryClient } from "../../../main";

export const cartContext = createContext(null);

export function CartContextProvider({ children }) {
  const token = localStorage.getItem("userToken");

  const [count, setCount] = useState(0);

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

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (productId) => {
      if (!token) {
        toast.warn("Please Login First", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        return;
      }
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

      queryClient.refetchQueries({
        queryKey: ["cart"],
      });
    },
  });

  const addToCartContext = async (productId) => {
    // if (!token) {
    //   toast.error("Please login first", {
    //     position: "top-right",
    //     autoClose: 1500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    //   return;
    // }
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

  const removeItemContext = async (productId) => {
    try {
      await mutateAsync(productId);
    } catch (error) {
      console.log(error);
    }
  };

  const clearCartContext = async () => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/clear`,
        {},
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQuantityContext = async (productId) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const decraseQuantityContext = async (productId) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <cartContext.Provider
        value={{
          addToCartContext,
          cart: data,
          isLoading,
          removeItemContext,
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
