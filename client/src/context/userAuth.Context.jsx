import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { AuthURL } from "../config";
import Loading from "./loading";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch user from token
  const getUser = async () => {
    try {
      const res = await axios.get(AuthURL + "refetch", {
        withCredentials: true,
      });
      setUser(res.data);
      return res.data;
    } catch (error) {
      setError(
        error.response?.data.message ||
          "An error occurred while fetching user data"
      );
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  // user login call
  const userLogin = async (formData) => {
    try {
      const response = await axios.post(AuthURL + "login", formData, {
        withCredentials: true,
      });
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data.message || "An error occurred while logging in"
      );
    }
  };

  // user register call
  const userRegister = async (formData) => {
    try {
      const response = await axios.post(AuthURL + "register", formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data.message || "An error occurred while registering"
      );
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get(AuthURL + "/logout", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // fetch user for every re-render
  useEffect(() => {
    getUser();
  }, []);

  const contextValue = {
    user,
    setUser,
    loading,
    setLoading,
    error,
    getUser,
    userLogin,
    userRegister,
    logout,
  };
  
  return (
    <UserContext.Provider value={contextValue}>
      {loading ? <Loading /> : children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
