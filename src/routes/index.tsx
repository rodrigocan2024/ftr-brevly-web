import { createBrowserRouter } from "react-router";
import { NotFound } from "../pages/404";
import { Home } from "../pages/home";
import { AppLayout } from "../pages/layouts/app";
import { Redirect } from "../pages/redirect";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/:shortUrl", element: <Redirect /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
