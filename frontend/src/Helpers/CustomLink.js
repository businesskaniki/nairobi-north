import React from 'react';
import { useLocation, Link as RouterLink, Navigate, useRoutes } from 'react-router-dom';

const CustomLink = ({ to, onClick, children }) => {
  const location = useLocation();

  const handleCustomClick = (event) => {
    event.preventDefault();

    const targetElementId = to.substring(1); // Remove the '#' from the link

    if (location.pathname === '/') {
      const element = document.getElementById(targetElementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not on the home page, navigate to the home page and then scroll
      return <Navigate to={`/#${targetElementId}`} />;
    }

    if (onClick) {
      onClick();
    }

    return null;
  };

  return (
    <RouterLink to={to} onClick={handleCustomClick}>
      {children}
    </RouterLink>
  );
};

export default CustomLink;
