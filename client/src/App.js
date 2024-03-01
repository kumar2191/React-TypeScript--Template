import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Root, Login, Register, Notfound } from "./routes/index.js";
import { useUserContext } from "./context/userAuth.Context.jsx";
import "./App.css";

// Define a custom route component that checks if the user is an admin
const AdminRoute = ({ element }) => {
  const { user } = useUserContext();

  if (!user || !user.admin) {
    return <Notfound />;
  }

  return element;
};

// providing routers with respective components
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // error element
    errorElement: <Notfound />,

    // childrens for the root
    children: [
      {
        path: "admin",
        element: <AdminRoute element={<h1>Admin</h1>} />,
      },
      {
        path: "",
        element: <Home />,
      },

      // user
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
