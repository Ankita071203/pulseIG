import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../firebaseConfig";
import { signOut } from "firebase/auth";
import './Navbar.css';

export default function Navbar() {
  const [user] = useAuthState(auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="fixed-top">
      <nav className="navbar">
        <div className="logo-container">
          <img src="/logo.jpg" alt="Logo" className="circular-img" />
          <h2 className="logoimg"><i>pulse</i>IG</h2>
        </div>
        <div className="toggle-button" onClick={handleToggleClick}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`nav-links ${isSidebarOpen ? 'active' : ''}`}>
          <Link className="Home nav-link" to="https://pulseigdtuw.github.io/pulse/index.html#">
            Home
          </Link>
          {user ? (
            <button
              className="logout"
              onClick={() => { signOut(auth) }}
            >
              Logout
            </button>
          ) : null}
        </div>
      </nav>
      <div className={`sidebar_menu ${isSidebarOpen ? 'active' : ''}`}>
        <Link className="Home nav-link" to="https://pulseigdtuw.github.io/pulse/index.html#" onClick={handleToggleClick}>
          Home
        </Link>
        {user ? (
          <button
            className="logout"
            onClick={() => { signOut(auth); handleToggleClick(); }}
          >
            Logout
          </button>
        ) : null}
      </div>
    </div>
  );
}
