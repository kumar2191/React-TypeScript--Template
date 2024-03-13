import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userAuth.Context";
import { WiStars } from "react-icons/wi";

const Register = () => {
  const { userRegister } = useUserContext();
  const initialFormDataValues = {
    name: "",
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
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
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
        <div className="flex w-96 min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="mx-auto h-10 w-auto flex justify-center items-center font-semibold">
              <WiStars className="text-indigo-500 text-[2rem]" />
              <i className="text-[1.5rem]">HW</i>
            </div>

            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign up your account
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit} method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleOnChange}
                    placeholder="Enter your name"
                    autoComplete="username"
                    required
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleOnChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    placeholder="Enter your Password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Register
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?
              <a
                href="/login"
                className="font-semibold leading-6 text-indigo-500 hover:text-indigo-500"
              >
                {" "}
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
