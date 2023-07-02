"use client";

import { createContext, useState, useContext } from "react";

const UserDataContext = createContext({});

export const UserDataContextProvider = ({ children }) => {
  const [token, setToken] = useState("token");
  const [name, setName] = useState("UserName");
  return (
    <UserDataContext.Provider value={{ token, setToken, name, setName }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserDataContext = () => useContext(UserDataContext);
