import React from "react";
import "./Account.css";

export default function Account() {
  const handleForgotPassword = (event) => {
    event.preventDefault();
    alert("Too bad. Remember it next time");
  };

  return (
    <section id="account">
      <div className="pageBody">
        <h2>Sign In</h2>

        <hr />
        <form method="GET">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />
                </div>

                <div>
                    <button className="forgot-pass" onClick={handleForgotPassword}>Forgot Password</button>
                </div>
                    <button className="submit-btn " onClick={(event) => event.preventDefault()}>Sign In</button>
                
                
                <div>
                    <p>Don't have an account?</p>
                    <button>Sign Up</button>
                </div>
                  
                  
        </form>
      </div>
    </section>
  );
}
