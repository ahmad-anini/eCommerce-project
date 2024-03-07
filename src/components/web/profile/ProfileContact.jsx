import React, { useContext } from "react";
import { UserContext } from "../context/User";

export default function ProfileContact() {
  const { userData } = useContext(UserContext);
  return (
    <>
      <section>
        <h2>{userData.email}</h2>
      </section>
    </>
  );
}
