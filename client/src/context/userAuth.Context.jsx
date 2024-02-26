import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/userAuth/refetch",
        { withCredentials: true }
      );
      // console.log(res.data)
      setUser(res.data);
    } catch (error) {
      setError(
        error.response?.data.message ||
          "An error occurred while fetching user data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const contextValue = { user,setUser, loading, error };

  return (
    <UserContext.Provider value={contextValue}>
      {loading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
