import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { URL } from "../config";
import Loading from "./loading";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch user from token
  const getLoggedInUser = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.get(URL + "user/profile", {
        withCredentials: true,
        headers: {
          accept: 'application/json',
          token: token
        }
      });

      setUser(res.data.data);
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
      const response = await axios.post(URL + "user/login", formData, {
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
      const response = await axios.post(URL + "user/reg", formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data.message || "An error occurred while registering"
      );
    }
  };

  // fetch user for every re-render
  useEffect(() => {
    getLoggedInUser();
  }, []);

  const contextValue = {
    user,
    setUser,
    loading,
    setLoading,
    error,
    getLoggedInUser,
    userLogin,
    userRegister,
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
