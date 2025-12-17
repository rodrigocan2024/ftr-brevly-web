import { createBrowserRouter } from "react-router";
import { NotFound } from "../pages/404";
import { Home } from "../pages/home";
import { Redirect } from "../pages/redirect";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:shortUrl",
    element: <Redirect />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
