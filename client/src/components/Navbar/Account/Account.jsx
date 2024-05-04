import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Account/Account.css";

export default function Account() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/signin");
    };

    return (
        <div className="pageBody">
            {isLoggedIn ? (
                <div>
                    <h2>Welcome!</h2>
                    <button className="signout-btn" onClick={handleSignOut}>
                        Sign Out
                    </button>
                </div>
            ) : null}
        </div>
    );
}
