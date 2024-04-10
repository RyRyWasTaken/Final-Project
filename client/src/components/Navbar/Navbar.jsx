import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ setSelectedSection }) {

    return (
        <nav>
            <ul>
                <li>
                    <NavLink
                        to="/account"
                        activeClassName="active"
                        className="button"
                    >
                        My Account
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/"
                        exact
                        activeClassName="active"
                        className="button"
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/cart"
                        activeClassName="active"
                        className="button"
                    >
                        My Cart
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
