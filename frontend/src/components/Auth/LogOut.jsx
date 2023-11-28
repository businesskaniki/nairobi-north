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
    console.log(refreshToken);
    try {
      await axios.post(
        LOGOUT_URL,
        { refresh: refreshToken }, // Include refresh token in the request body
        {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
            'Content-Type': 'application/json', 
          },
          withCredentials: true,
        }
      );

      Cookies.remove("ac-tok-en");
      // Additional logic if needed after successful logout
    } catch (error) {
      console.log(error.message);
      // Handle error, e.g., show error message to the user
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;