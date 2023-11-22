import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props  }) => {
  // <Outlet />
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace/>
)}

export default ProtectedRoute; 