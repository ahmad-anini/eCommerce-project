import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
  let [userToken, setUserToken] = useState(null);
  let [userData, setUserData] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);

  const getUserData = async () => {
    if (userToken) {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        { headers: { Authorization: `Tariq__${userToken}` } }
      );
      setUserData(data.user);
    }
  };

  useEffect(() => {
    getUserData();
  }, [userToken]);

  return (
    <UserContext.Provider value={{ userToken, setUserToken, userData }}>
      {children}
    </UserContext.Provider>
  );
}
