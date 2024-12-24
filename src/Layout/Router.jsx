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
import Error from "../pages/Error";
import UpdateQuery from "../pages/UpdateQuery";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root ></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("http://localhost:5000/queries-home"),
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
        path: "/update-query/:id",
        element: (
          <PrivateRoute>
            <UpdateQuery></UpdateQuery>
          </PrivateRoute>
        ),
        loader: ({params})=> fetch(`http://localhost:5000/queries/${params.id}`)
      },
      {
        path: "/query-details/:id",
        element: <PrivateRoute><QueryDetails></QueryDetails></PrivateRoute>,
        loader: ({params})=> fetch(`http://localhost:5000/queries/${params.id}`)

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
