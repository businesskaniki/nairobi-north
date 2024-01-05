import { useEffect } from "react";
import Cookies from "js-cookie";

const deleteLoginCredentials = () => {
  Cookies.remove("ac-tok-en");
  Cookies.remove("ref-tok-en");
  Cookies.remove("userId");
  localStorage.removeItem("user");
};

const MyComponent = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      deleteLoginCredentials();
    }, 10000); // 10 seconds delay

    return () => {
      clearTimeout(timeout); // Clear the timeout on component unmount
    };
  }, []); // Run once when component mounts

  return (
    // Your component JSX
    <h2>hey</h2>
  );
};

export default MyComponent;
