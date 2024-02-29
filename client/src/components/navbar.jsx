import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useUserContext } from "../context/userAuth.Context";

const Navbar = () => {
  const { user, logout } = useUserContext();
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("User Logged Out Successfully!!");
      setTimeout(() => {
        navigate("/login");
        window.location.reload();
      }, 1000);
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
        <Link to={"/"}>
          <p>Home</p>
        </Link>
      </div>
      <div className="flex gap-6">
        {user ? (
          <>
            <p>{user.username}</p>
            <p
              className="cursor-pointer hover:text-red-500"
              onClick={handleLogout}
            >
              Logout
            </p>
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
