import React from "react";
import Cookies from "js-cookie";
import axios from "./axios";
import getDecryptedToken from "../../Helpers/DecryptedToken";

const LOGOUT_URL = "logout/";

const LogoutButton = () => {
  const handleLogout = async () => {
    const decryptedToken = getDecryptedToken();
    try {
      await axios.post(LOGOUT_URL, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      });

      Cookies.remove("ac-tok-en");
    } catch (error) {}
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
