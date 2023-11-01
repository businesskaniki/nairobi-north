import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated,child, isAdmin }) => {
  if (isAuthenticated && isAdmin) {
    return child
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
