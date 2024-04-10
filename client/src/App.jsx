import { useState, useEffect } from "react";
import Home from "./components/Navbar/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx"
import Cart from "./components/Navbar/Cart/Cart.jsx";
import Account from "./components/Navbar/Account/SignIn/SignIn.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    return (
    <>
    <BrowserRouter>
        <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/account" element={<Account />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </BrowserRouter>
    </>
    );
}