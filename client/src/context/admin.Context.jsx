import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { URL } from "../config";
import Loading from "./loading";
import { usersDetails } from "../constants/adminStats";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState(usersDetails);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(URL + "user", {
        withCredentials: true,
        headers: {
          accept: "application/json",
          token: token,
        },
      });
      console.log(res.data);
      setUsers(res.data.data);
    } catch (error) {
      setError(
        error.response?.data.message ||
          "An error occurred while fetching user data"
      );
    } finally {
      // Set loading to false after a delay for smoother experience
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const contextValue = {
    users,
    loading,
    error,
    fetchUsers,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {loading ? <Loading /> : children}
    </AdminContext.Provider>
  );
};

const useAdminContext = () => {
  return useContext(AdminContext);
};

export { AdminProvider, useAdminContext };
