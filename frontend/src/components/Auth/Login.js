import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import "./auth.css";

import axios from "./axios";
const LOGIN_URL = "login/";

const Login = () => {
  const emailRef = useRef(null);
  const errRef = useRef(null);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = response?.data;
      const accessToken = data.access;
      const refresh = data.refresh;
      const ciphtoken = CryptoJS.AES.encrypt(
        accessToken,
        "accesstoken"
      ).toString();
      Cookies.set("ac-tok-en", ciphtoken, { secure: true, sameSite: "none" });
      const roles = data.admin;
      const user_id = data.id;
      const strId = user_id.toString();
      const ciphrefresh = CryptoJS.AES.encrypt(
        refresh,
        "refreshtoken"
      ).toString();
      const ciphId = CryptoJS.AES.encrypt(strId, "user_id").toString();
      Cookies.set("ref-tok-en", ciphrefresh, {
        secure: true,
        sameSite: "none",
      });
      Cookies.set("userId", ciphId, { secure: true, sameSite: "none" });
      localStorage.setItem("role", roles);
      setEmail("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg(" wrong Email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current?.focus();
    }
  };

  return (
    <div className="logindiv">
      <p>{errMsg && <p className="error-message">{errMsg}</p>}</p>
      <form className="wrapper" onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
        <section className="group">
          <input
            type="text"
            size="30"
            className="input"
            name="email"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <label htmlFor="email" className="label">
            Email
          </label>
          <div ref={errRef} tabIndex={-1}></div> {/* Assign errRef to a div */}
        </section>
        <section className="group">
          <input
            type="password"
            minLength="8"
            className="input"
            name="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <div ref={errRef} tabIndex={-1}></div> {/* Assign errRef to a div */}
        </section>
        <button type="submit" className="btn">
          LOGIN
        </button>
        <div className="twobtn">
          <button type="button" className="btn">
            <Link to={"/register"}>sign up</Link>
          </button>
          <button type="button" className="btn">
            <Link to={"/reset_password"}>reset password</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
