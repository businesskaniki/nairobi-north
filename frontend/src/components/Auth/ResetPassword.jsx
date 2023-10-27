import { useRef, useState, useEffect } from "react";

const ResetPassword = () => {
  const emailRef = useRef(null);
  const errRef = useRef(null);

  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email]);
  return (
    <div className="logindiv">
      <p>{errMsg && <p className="error-message">{errMsg}</p>}</p>
      <form className="wrapper">
        <h2>Reset Password</h2>
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
          <div ref={errRef} tabIndex={-1}></div>
        </section>
        <button type="submit" className="btn">
          submit email
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
