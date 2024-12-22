import React, { useContext } from 'react';
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../Provider/AuthProvider';

const PrivateRoute = ({children}) => {
  const location = useLocation();
    const {user, loading} = useContext(AuthContext);
    if (loading) {
      return <span className="loading loading-infinity loading-lg"></span>;
    } 
    if (user) {
      return children;
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>;
};
PrivateRoute.propTypes = {
  children: PropTypes.any,
};
export default PrivateRoute;