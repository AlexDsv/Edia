import React, { createContext, useContext, useState } from "react";

const BecomeListenerContext = createContext();

export const useBecomeListenerContext = () => useContext(BecomeListenerContext);

export const BecomeListenerProvider = ({ children }) => {
  const [becomeListenerData, setBecomeListenerData] = useState({
    email: "",
    firstName: "",
    type: "",
    motivation: "",
    age: null,
    availabilities: null,
  });

  return (
    <BecomeListenerContext.Provider
      value={{ becomeListenerData, setBecomeListenerData }}
    >
      {children}
    </BecomeListenerContext.Provider>
  );
};
