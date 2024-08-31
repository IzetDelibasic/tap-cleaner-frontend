import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard, Landing, Login, Profile, Register } from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
