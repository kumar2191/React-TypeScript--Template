import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userAuth.Context";

const Register = () => {
  const { userRegister } = useUserContext();
  const initialFormDataValues = {
    username: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormDataValues);
  let navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userRegister(formData);
      toast.success(response.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <div className="bg-blue-400 text-black font-semibold rounded-xl p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label>Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleOnChange}
              placeholder="Enter your username"
              className="h-[50px] p-4 rounded-lg outline-none"
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <label>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="Enter your email"
              className="h-[50px] p-4 rounded-lg outline-none"
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <label>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder="Enter your Password"
              className="h-[50px] p-4 rounded-lg outline-none"
            ></input>
          </div>
          <hr className="mt-2" />
          <button className="p-5 rounded-lg h-[35px] bg-red-400 flex justify-center items-center mt-2">
            Register
          </button>

          <Link to={"/login"}>
            <p className="text-black font-bold text-center underline underline-offset-4">
              Login
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
