import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx"
import Home from "./components/Home/Home.jsx";
import Account from "./components/Navbar/Account/Account.jsx";
import SignUp from "./components/Navbar/Account/SignUp/SignUp.jsx";
import SignIn from "./components/Navbar/Account/SignIn/SignIn.jsx";

export default function App() {
    return (
    <>
    <BrowserRouter>
        <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/account" element={<Account />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    </>
    );
}