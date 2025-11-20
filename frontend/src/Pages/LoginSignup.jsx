import React, { useState } from "react";
import "./CSS/LoginSignups.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    // Existing login logic…
  };

  const signup = async () => {
    // Existing signup logic…
  };

  return (
    <div className="classic-auth-wrapper">
      <div className="classic-auth-card">
        <h2>{state}</h2>

        <div className="classic-fields">
          {state === "Sign Up" && (
            <input
              name="username"
              type="text"
              placeholder="Full Name"
              value={formData.username}
              onChange={changeHandler}
            />
          )}

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={changeHandler}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>

        <button
          className="classic-btn"
          onClick={() => (state === "Login" ? login() : signup())}
        >
          Continue
        </button>

        <p className="classic-toggle">
          {state === "Login" ? (
            <>
              Don't have an account?{" "}
              <span onClick={() => setState("Sign Up")}>Sign up</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setState("Login")}>Login</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
