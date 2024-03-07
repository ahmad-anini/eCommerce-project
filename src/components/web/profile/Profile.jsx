import React, { useContext } from "react";
import { UserContext } from "../context/User";
import "./profilee.css";
import { Link, Outlet } from "react-router-dom";
export default function Profile() {
  const { userData } = useContext(UserContext);
  return (
    <>
      <div className="profile-container">
        <aside>
          <Link to={""}>Informaion</Link>
          <Link to={"Contact"}>Contact</Link>
          <Link to={"order"}>Order</Link>
        </aside>
        <Outlet />
      </div>
    </>
  );
}
