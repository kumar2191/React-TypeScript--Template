import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { CiMenuKebab } from "react-icons/ci";
import { useUserContext } from "../context/userAuth.Context";

const Navbar = () => {
  const { user, logout } = useUserContext();
  const [userMenu, setUserMenu] = useState(false);

  const navigate = useNavigate();

  const menuToggle = () => {
    setUserMenu(!userMenu);
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      console.log(response);
      if (response.status) {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/login");
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Logout failed:", error);
    }
  };

  return (
    <div className="h-[65px] p-8 text-white font-semibold bg-black flex justify-between items-center">
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
      <div>Authentication</div>
      <div className="flex gap-6">
        {user && user.admin ? (
          <Link to={"/admin"}>
            <p>Admin</p>
          </Link>
        ) : (
          ""
        )}
        <Link to={"/"}>
          <p>Home</p>
        </Link>
      </div>
      <div className="flex gap-6 items-center">
        {user ? (
          <>
            <p className="flex items-center justify-center font-semibold text-xl border rounded-full w-8 h-8">
              {user.username.charAt(0)}
            </p>

            <CiMenuKebab
              onClick={menuToggle}
              className="font-semibold text-xl cursor-pointer"
            />

            {userMenu && (
              <div className="absolute top-12 right-8 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1 px-2 font-medium flex flex-col">
                  <p className="py-2 px-2 cursor-pointer text-[15px] text-black hover:bg-gray-200">
                    Profile
                  </p>
                  <hr />
                  <p
                    className="py-2 px-2 cursor-pointer text-[15px] text-black hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <p>Guest</p>
            <Link to={"login"}>
              <p>Login</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
