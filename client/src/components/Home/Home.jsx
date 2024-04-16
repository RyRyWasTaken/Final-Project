import React, { useState } from "react";
import "./Home.css";

export default function Home() {
  const storedToken = localStorage.getItem("token");
  const isLoggedIn = !!storedToken;
  const [count, setCount] = useState(0);

  return (
    <div className="front">
      {isLoggedIn ? (
        <>
          <div className="counter-wrapper">
            <div className="counter-div">
              <h3>{count} Seals</h3>
            </div>
          </div>

          <div className="seal-wrapper">
            <button onClick={() => setCount(count + 1)}>
              <img className="seal-img" src="/seal2.png" alt="" />
            </button>
          </div>
        </>
      ) : (
        <div>
          <h2>Silly Person!</h2>
          <h2>You have to sign in first!</h2>
        </div>
      )}
    </div>
  );
}
