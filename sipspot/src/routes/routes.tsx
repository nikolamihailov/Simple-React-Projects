import { createBrowserRouter } from "react-router-dom";

import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Recipes from "../pages/Recipes";
import Gallery from "../pages/Gallery";
import About from "../pages/About";
import ErrorPage from "../pages/ErrorPage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
