import axios from "axios";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/User";
import { useQuery } from "@tanstack/react-query";

export default function ProfileOrder() {
  const { userToken } = useContext(UserContext);

  const getOrder = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order/`, {
      headers: {
        Authorization: `Tariq__${userToken}`,
      },
    });
    return data;
  };

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["order"],
    queryFn: getOrder,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <button onClick={refetch}>Refresh</button>
      <section>
        <h2 className="h2-order">order</h2>
        <table className="table table-striped p-3">
          <thead>
            <tr className="table-success">
              <th scope="col">#</th>
              <th scope="col">address</th>
              <th scope="col">coupon Name</th>
              <th scope="col">created At</th>
              <th scope="col">final price</th>
              <th scope="col">payment Type</th>
              <th scope="col">Phone Number</th>
              <th scope="col">status</th>
            </tr>
          </thead>
          <tbody>
            {data?.orders?.map((order, index) => (
              <tr key={order._id}>
                <td>{index}</td>
                <td>{order.address}</td>
                <td>{order.couponName}</td>
                <td>{order.createdAt}</td>
                <td>{order.finalPrice}$</td>
                <td>{order.paymentType}</td>
                <td>{order.phoneNumber}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
