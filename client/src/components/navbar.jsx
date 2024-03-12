import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useUserContext } from "../context/userAuth.Context";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { WiStars } from "react-icons/wi";

const Navbar = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const userMenu = useRef(null);

  const items = user
    ? [
        {
          label: user.name + "!",
          items: [
            {
              label: "Settings",
              icon: "pi pi-cog",
              command: () => {
                navigate("/settings");
              },
            },
            {
              label: "Logout",
              icon: "pi pi-sign-out",
              command: () => {
                handleLogout();
              },
            },
          ],
        },
      ]
    : [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("User Logout successfully");

    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
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
      <div className="flex gap-2 items-center">
        <WiStars className="font-semibold text-[2rem]" />
        Healthwise
      </div>
      <div className="flex gap-6">
        {user && user.admin ? (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-500 hover:text-white px-3 py-1 text-md font-semibold cursor-pointer underline underline-offset-8"
                : "text-white hover:text-indigo-500 rounded-md px-3 py-1 text-md font-semibold cursor-pointer"
            }
          >
            <p>Admin</p>
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-500 hover:text-white px-3 py-1 text-md font-semibold cursor-pointer underline underline-offset-8"
                  : "text-white hover:text-indigo-500 rounded-md px-3 py-1 text-md font-semibold cursor-pointer"
              }
            >
              Home
            </NavLink>
            {user ? (
              <>
                <NavLink
                  to="/explore"
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-500 hover:text-white px-3 py-1 text-md font-semibold cursor-pointer underline underline-offset-8"
                      : "text-white hover:text-indigo-500 rounded-md px-3 py-1 text-md font-semibold cursor-pointer"
                  }
                >
                  Explore
                </NavLink>
              </>
            ) : (
              ""
            )}
          </>
        )}
      </div>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <Avatar
              label={user.name.charAt(0)}
              shape="circle"
              style={{ backgroundColor: "#ffffff", color: "black" }}
            />

            <Button
              icon="pi pi-ellipsis-v"
              rounded
              onClick={(event) => userMenu.current.toggle(event)}
              className="font-semibold text-xl cursor-pointer"
            />

            <Menu model={items} popup ref={userMenu} />
          </>
        ) : (
          <div className="flex gap-5">
            <p>Guest</p>
            <a href="login">
              <p>Login</p>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
