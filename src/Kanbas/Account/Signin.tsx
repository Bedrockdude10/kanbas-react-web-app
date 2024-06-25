import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials);
    navigate("/Kanbas/Account/Profile");
  };
  return (
    <div className="wd-signin-screen">
      <h1>Sign in</h1>
      <input
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        value={credentials.username}
        className="form-control mb-2 wd-username"
        placeholder="username"
      />
      <input
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        value={credentials.password}
        className="form-control mb-2 wd-password"
        placeholder="password"
        type="password"
      />
      <button
        onClick={signin}
        className="btn btn-primary w-100 wd-signin-btn"
      >
        Sign in
      </button>
      <br />
      <Link to="/Kanbas/Account/Signup" className="wd-signup-link">Sign up</Link>
    </div>
  );
}
