import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Landing } from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
