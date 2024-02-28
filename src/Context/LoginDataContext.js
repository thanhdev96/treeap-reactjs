import React, { createContext, useContext, useState } from 'react';

const LoginDataContext = createContext();

export const useLoginData = () => {
  return useContext(LoginDataContext);
};

export const LoginDataProvider = ({ children }) => {
  const [loginData, setLoginData] = useState({
    userId: null,
    username: '',
  });

  return (
    <LoginDataContext.Provider value={{ loginData, setLoginData }}>
      {children}
    </LoginDataContext.Provider>
  );
};

export default LoginDataContext;
