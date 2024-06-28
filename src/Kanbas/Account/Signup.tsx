import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Signup() {
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>({});
  const [error, setError] = useState("");
  const [role, setRole] = useState("STUDENT");
  const navigate = useNavigate();

  const signup = async () => {
    try {
      const currentUser = await client.signup({ ...user, role });
      dispatch(setCurrentUser(currentUser));
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.checked ? "FACULTY" : "STUDENT");
  };

  return (
    <div className="wd-signup-screen">
      <h1>Sign up</h1>
      {error && <div className="wd-error alert alert-danger">{error}</div>}
      <input
        value={user.username || ""}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username form-control mb-2"
        placeholder="username"
      />
      <input
        value={user.password || ""}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="password"
        className="wd-password form-control mb-2"
        placeholder="password"
      />
      <div className="form-check mb-2">
        <input
          type="checkbox"
          className="form-check-input"
          id="roleCheckbox"
          checked={role === "FACULTY"}
          onChange={handleRoleChange}
        />
        <label className="form-check-label" htmlFor="roleCheckbox">
          Sign up as Faculty
        </label>
      </div>
      <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2">
        Sign up
      </button>
      <br />
      <Link to="/Kanbas/Account/Signin" className="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}
