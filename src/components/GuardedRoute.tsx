import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const GuardedRoute: React.FC = () => {
  const userDetails = localStorage.getItem('userDetails');
  const location = useLocation();

  if (!userDetails) {
    return (
      <Navigate
        to="/"
        state={{ message: 'You must enter your details before accessing this page.', from: location.pathname }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default GuardedRoute;
