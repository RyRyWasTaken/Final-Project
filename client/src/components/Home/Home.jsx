import React, { useState, useEffect } from "react";
import "./Home.css";

export default function Home() {
  const storedToken = localStorage.getItem("token");
  const isLoggedIn = !!storedToken;
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/seal_count", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCount(data.seal_count);
        } else {
          throw new Error("Failed to fetch seal count");
        }
      } catch (error) {
        console.error("Error fetching seal count:", error);
      }
    };

    fetchCount();
  }, [storedToken]);

  const incrementCount = async () => {
    try {
      setCount((prevCount) => prevCount + 1);
      const response = await fetch("/update_seal_count", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ seal_count: count + 1 }),
      });
      if (!response.ok) {
        throw new Error("Failed to update seal count");
      }
    } catch (error) {
      console.error("Error updating seal count:", error);
    }
  };

  const formatCount = (count) => {
    if (count >= 1000000) {
      const millions = Math.floor(count / 1000000);
      const remainder = count % 1000000;
      const formattedRemainder = (remainder >= 1000) ? remainder.toLocaleString() : remainder;
      return `${millions}m;${formattedRemainder}`;
    } else if (count >= 1000) {
      const thousands = Math.floor(count / 1000);
      const remainder = count % 1000;
      const formattedRemainder = (remainder >= 100) ? remainder.toLocaleString() : ("0" + remainder).slice(-3);
      return `${thousands}k;${formattedRemainder}`;
    } else {
      return count;
    }
  };

  return (
    <div className="front">
      {isLoggedIn ? (
        <>
          <div className="counter-wrapper">
            <div className="counter-div">
              <h3><span>{formatCount(count)}</span> Seals</h3>
            </div>
          </div>

          <div className="seal-wrapper">
            <button onClick={incrementCount}>
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
