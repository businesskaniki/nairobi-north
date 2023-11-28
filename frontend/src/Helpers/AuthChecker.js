import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const AuthChecker = ({ compo, logins }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = Cookies.get('ac-tok-en') !== undefined;
      setIsLoggedIn(loggedIn);
    };

    // Check login status on component mount
    checkLoginStatus();
  }, []);

  return (
    <div>{isLoggedIn ? compo : logins}</div>
  );
};

export default AuthChecker;
