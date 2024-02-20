import React, { createContext, useContext, useState } from "react";

const SignUpContext = createContext();

export const useSignUpContext = () => useContext(SignUpContext);

export const SignUpProvider = ({ children }) => {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    firstName: "",
  });

  return (
    <SignUpContext.Provider value={{ signUpData, setSignUpData }}>
      {children}
    </SignUpContext.Provider>
  );
};
