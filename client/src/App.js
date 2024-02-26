import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Root, Login, Register } from "./routes/index.js";

import "./App.css";

// providing routers with respective components
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // error element
    errorElement: <h1>Page Not Found !</h1>,

    // childrens for the root
    children: [
      // blog
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
