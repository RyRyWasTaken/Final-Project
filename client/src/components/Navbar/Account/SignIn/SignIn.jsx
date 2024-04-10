import React, { useState } from "react";
import "./SignIn.css";

export default function Account() {
  const [username, setUsername] = useState(null); // Initialize with null
  const [password, setPassword] = useState(null); // Initialize with null
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login status

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
    <section id="account">
      <div className="pageBody">
        {isLoggedIn ? (
          <div>
            <h2>Welcome!</h2>
            <button className="signout-btn" onClick={() => setIsLoggedIn(false)}>
              Sign Out
            </button>
          </div>
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
                  value={username || ""}
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
                  value={password || ""} 
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
                <button className="signup-btn">Sign Up</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
