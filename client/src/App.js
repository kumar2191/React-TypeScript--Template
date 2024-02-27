import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Root, Login, Register, Notfound } from "./routes/index.js";

import "./App.css";

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
