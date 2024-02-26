import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userAuth.Context";

const Login = () => {
  const { userLogin } = useUserContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = { email, password };
      const response = await userLogin(formData);
      toast.success(response.message);
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
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
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              className="h-[50px] p-4 rounded-lg outline-none"
            ></input>
          </div>
          <hr className="mt-2" />
          <button className="p-5 rounded-lg h-[35px] bg-red-400 flex justify-center items-center mt-2">
            Login
          </button>

          <Link to={"/register"}>
            <p className="text-black font-bold text-center underline underline-offset-4">
              Register
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
