import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Root, Login, Register, Notfound, Admin, UserHistory, Settings, Explore, ExplorePanel } from "./routes/index.js";
import { useUserContext } from "./context/userAuth.Context.jsx";
import 'primeicons/primeicons.css';
import "./App.css";

const CustomRoot = () => {
  const { user } = useUserContext();
  const pathname = window.location.pathname;

  if (!user && pathname === "/login") {
    return <Login />;
  } else if (!user && pathname === "/register") {
    return <Register />;
  } else {
    return <Root />;
  }
};

const AdminRoute = () => {
  const { user } = useUserContext();
  console.log(user, "user");
  if (!user || !user.isAdmin) {
    return <Notfound />;
  }

  return <Admin />;
};


const App = () => {
  const { user } = useUserContext();

  // Providing routers with respective components
  const router = createBrowserRouter([
    {
      path: "/",
      // Use the CustomRoute component for conditional rendering
      element: <CustomRoot />,
      // Error element
      errorElement: <Notfound />,
      // Children for the root
      children: [
        {
          path: "admin",
          element: <AdminRoute />,
        },
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/explore",
          element: <Explore />,
        },
        {
          path: "/explore/:id",
          element: <ExplorePanel />,
        },
        {
          path: "/history",
          element: <UserHistory />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        // User
        {
          path: "login",
          element: user ? <Home /> : <Login />,
        },
        {
          path: "register",
          element: user ? <Home /> : <Register />,
        },
      ],
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
};



export default App;
