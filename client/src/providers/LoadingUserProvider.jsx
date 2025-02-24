import { createContext, useContext, useState } from "react";

const LoadingUserContext = createContext();

export const LoadingUserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingUserContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingUserContext.Provider>
  );
};

export const useLoadingUser = () => {
  return useContext(LoadingUserContext);
};
