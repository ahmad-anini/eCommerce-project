import { useContext } from "react";
import { UserContext } from "../context/User";

export default function ProfileInformation() {
  const { userData } = useContext(UserContext);
  return (
    <>
      <section>
        <h2>{userData.userName}</h2>
        <img src={userData.image.secure_url} alt="" />
      </section>
    </>
  );
}
