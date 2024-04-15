import React, { useState } from "react";
import "./Home.css";

export default function Home() {
  const storedToken = localStorage.getItem("token");
  const isLoggedIn = !!storedToken;
  const [count, setCount] = useState(0);

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/update_points", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ points: count + 1 }), 
      });
      if (response.ok) {
        setCount(prevCount => prevCount + 1); // Update count based on previous state
      } else {
        console.error("Error updating points:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="front">
        {isLoggedIn ? (
          <>
            <div className="seal-div">
              <button onClick={handleClick}>
                <img className="seal-img" src="/seal2.png" alt="" />
              </button>
            </div>

            <div className="counter-wrapper">
              <div className="counter-div">
                <h3>{count}</h3>
              </div>
            </div>
          </>
        ) : (
          <div>
            <h2>Silly Person!</h2>
            <h2>You have to sign in first!</h2>
          </div>
        )}
      </div>
    </>
  );
}
