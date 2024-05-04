import React, { useState, useEffect } from "react";
import "../Admin/Admin.css";

export default function Admin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <div className="pageBody">
            {isLoggedIn ? (
                <div>
                    <h2>Admin Panel</h2>
                </div>
            ) : null}
        </div>
    );
}