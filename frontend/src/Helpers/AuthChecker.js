import React from 'react';
import Cookies from 'js-cookie';

const AuthChecker = ({ compo,logins }) => {
  const isLoggedIn = Cookies.get('ac-tok-en') !== undefined;

  if (isLoggedIn) {
    return (
      <div>
        {compo}
      </div>
    );
  } else {
    return (
      <div>
        {logins}
      </div>
    );
  }
};

export default AuthChecker;
