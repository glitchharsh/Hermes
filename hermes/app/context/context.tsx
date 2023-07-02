"use client";

import { createContext, useState, useContext } from "react";

const UserDataContext = createContext({});

export const UserDataContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  return (
    <UserDataContext.Provider value={{ token, setToken }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserDataContext = () => useContext(UserDataContext);
