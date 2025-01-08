import { useState, useEffect } from "react";
import axios from "axios";
import httpServices from "../services/httpServices";
import { useNotifications } from "../utils/notifications";

const useAuth = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const {showSuccess ,showError} = useNotifications();

  const signIn = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await httpServices.post("/api/auth/signIn", credentials);
      setData(response?.data);
      httpServices.saveTokenStorage(
        import.meta.env.VITE_ACCESS_TOKEN,
        response?.data?.access_token
      );
      showSuccess(response?.data?.message)
    } catch (err) {
      setError(err.message);
    } finally { 
      setIsLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      await signInWithGoogle(token);
    } catch (error) {
      console.error("Error during Google login: ", error);
    }
  };
  const logout = () => {
    setData(null);
    localStorage.removeItem("token"); // xóa token khỏi localStorage
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await httpServices.get("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setData(response.data);
        } catch (err) {
          setError(err.message);
        }
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  return {
    data,
    isLoading,
    error,
    signIn,
    handleGoogleLogin,
    logout,
  };
};

export default useAuth;
