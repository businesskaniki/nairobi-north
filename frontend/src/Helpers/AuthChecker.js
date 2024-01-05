import React, { useEffect} from 'react';
import { useSelector } from 'react-redux';

const AuthChecker = ({ compo, logins }) => {
  const isloggedIn = useSelector((state) => state.auth.loggedIn);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = isloggedIn;
      console.log(loggedIn);
    };

    // Check login status on component mount
    checkLoginStatus();
  }, [isloggedIn]);

  return (
    <div>{isloggedIn ? compo : logins}</div>
  );
};

export default AuthChecker;
