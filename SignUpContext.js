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

const BecomeListenerContext = createContext();

export const useBecomeListenerContext = () => useContext(BecomeListenerContext);

export const BecomeListenerProvider = ({ children }) => {
  const [becomeListenerData, setBecomeListenerData] = useState({
    email: "",
    firstName: "",
    type: "",
    motivation: "",
    age: null,
  });

  return (
    <BecomeListenerContext.Provider
      value={{ becomeListenerData, setBecomeListenerData }}
    >
      {children}
    </BecomeListenerContext.Provider>
  );
};
