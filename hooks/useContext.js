// UserContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import { UseQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { data } = UseQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });

  const [userData, setUserData] = useState();

  useEffect(() => {
    setUserData(data?.data);
  }, [data]);

  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
};
