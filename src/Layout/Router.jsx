import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Queries from "../pages/Queries";
import PrivateRoute from "../utilities/PrivateRoute";
import RecommendForMe from "../pages/RecommendForMe";
import MyQueries from "../pages/MyQueries";
import MyRecommend from "../pages/MyRecommend";
import AddQuery from "../pages/AddQuery";
import QueryDetails from "../pages/QueryDetails";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/queries",
        element: <Queries></Queries>,
      },
      {
        path: "/recommendations-for-me",
        element: (
          <PrivateRoute>
            <RecommendForMe></RecommendForMe>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-queries",
        element: (
          <PrivateRoute>
            <MyQueries></MyQueries>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-recommendations",
        element: (
          <PrivateRoute>
            <MyRecommend></MyRecommend>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-query",
        element: (
          <PrivateRoute>
            <AddQuery></AddQuery>
          </PrivateRoute>
        ),
      },
      {
        path: "/query-details/:id",
        element: <QueryDetails></QueryDetails>,
        loader: ({params})=> fetch(`http://localhost:5000/query/${params.id}`)

      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default Router;
