import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {

    return (
        <nav>
            <ul>
                <li>
                    <NavLink
                        to="/account"
                        activeClassName="active"
                        className="navlink"
                    >
                        My Account
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/"
                        exact
                        activeClassName="active"
                        className="navlink"
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/cart"
                        activeClassName="active"
                        className="navlink"
                    >
                        My Cart
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
