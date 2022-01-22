import React from 'react';
import logo from "../img/Logo.svg"
import './Header.css';
function Header() {
    return (
        <header className="headerInAPP">
            <img className="logo" src={logo} alt="logo" />
        </header>
    );
}
export default Header;