import React, { useState, useEffect } from "react";
import "../../Account/Account.css";
import { NavLink, Navigate } from "react-router-dom";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setUsername(data.username);
        setIsLoggedIn(true);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred");
    }
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    alert("Too bad. Remember it next time");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSignIn(event);
    }
  };

  return (
    <div className="pageBody">
      {isLoggedIn ? (
        <Navigate to="/account" />
      ) : (
        <div>
          <h2>Sign In</h2>
          {error && <p className="error-message"><h3>{error}</h3></p>}
          <hr />
          <form onSubmit={handleSignIn}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="form-div">
              <button
                className="forgot-pass"
                onClick={handleForgotPassword}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              >
                Forgot Password
              </button>
              <button type="submit" className="signin-btn">
                Sign In
              </button>
              <p>Don't have an account?</p>
              <NavLink
                to="/signup"
                className="signup-btn">
                Sign Up
              </NavLink>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
