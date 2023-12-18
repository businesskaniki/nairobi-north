import React from "react";
import Cookies from "js-cookie";
import axios from "./axios"; // Assuming you have an axios instance set up
import getDecryptedToken from "../../Helpers/DecryptedToken";
import { getDecryptedRefreshToken } from "../../Helpers/DecryptedToken";

const LOGOUT_URL = "logout/";

const LogoutButton = () => {
  const handleLogout = async () => {
    const decryptedToken = getDecryptedToken(); // Assuming this gets access token
    const refreshToken = getDecryptedRefreshToken(); // Fetching refresh token from cookies
    try {
      await axios.post(
        LOGOUT_URL,
        {
          headers: {
            withCredentials: true,
            Authorization: `Bearer ${decryptedToken}`,
            'Content-Type': 'application/json', 
          },
          
        }
      );

      Cookies.remove("ac-tok-en");
      // Additional logic if needed after successful logout
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;