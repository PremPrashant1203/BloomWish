import React, { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>
        {`
          .bw-navbar {
            width: 100%;
            background: #fffafa;
            border-bottom: 1px solid #f1dfe7;
          }

          .bw-navbar-inner {
            width: 100%;
            max-width: 1200px;
            height: 72px;
            margin: 0 auto;
            padding: 0 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .bw-logo {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-shrink: 0;
          }

          .bw-logo-icon {
            font-size: 27px;
            line-height: 1;
          }

          .bw-logo-text {
            color: #d4477d;
            font-family: cursive;
            font-size: 28px;
            font-weight: 600;
            white-space: nowrap;
          }

          .bw-desktop-nav {
            display: flex;
            align-items: center;
            gap: 28px;
          }

          .bw-desktop-nav a {
            color: #625967;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            white-space: nowrap;
            transition: 0.2s;
          }

          .bw-desktop-nav a:hover {
            color: #d4477d;
          }

          .bw-create-button {
            border: none;
            border-radius: 9px;
            background: #d94f88;
            color: white;
            padding: 10px 20px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
          }

          .bw-mobile-button {
            display: none;
            width: 40px;
            height: 40px;
            border: none;
            border-radius: 9px;
            background: transparent;
            color: #d4477d;
            font-size: 27px;
            line-height: 1;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          .bw-mobile-menu {
            display: none;
          }

          @media (max-width: 767px) {

            .bw-navbar-inner {
              height: 64px;
              padding: 0 14px;
            }

            .bw-logo-icon {
              font-size: 23px;
            }

            .bw-logo-text {
              font-size: 24px;
            }

            .bw-desktop-nav {
              display: none !important;
            }

            .bw-mobile-button {
              display: flex !important;
            }

            .bw-mobile-menu {
              display: flex;
              flex-direction: column;
              width: 100%;
              padding: 8px 14px 12px;
              background: #fffafa;
              border-top: 1px solid #f1dfe7;
              box-shadow: 0 6px 15px rgba(100, 60, 80, 0.08);
            }

            .bw-mobile-menu a {
              width: 100%;
              box-sizing: border-box;
              padding: 12px 14px;
              border-radius: 8px;
              color: #625967;
              text-decoration: none;
              font-size: 14px;
              font-weight: 500;
            }

            .bw-mobile-menu a:hover {
              background: #fff0f5;
              color: #d4477d;
            }

            .bw-mobile-create {
              width: 100%;
              margin-top: 6px;
              border: none;
              border-radius: 8px;
              background: #d94f88;
              color: white;
              padding: 12px;
              font-size: 14px;
              font-weight: 600;
            }
          }
        `}
      </style>

      <header className="bw-navbar">

        <nav className="bw-navbar-inner">

          {/* LOGO */}

          <div className="bw-logo">

            <span className="bw-logo-icon">
              🌷
            </span>

            <span className="bw-logo-text">
              BloomWish
            </span>

          </div>

          {/* DESKTOP NAV */}

          <div className="bw-desktop-nav">

            <a href="#">
              Home
            </a>

            <a
              href="#"
              style={{ color: "#d4477d" }}
            >
              Flowers
            </a>

            <a href="#">
              Guides
            </a>

            <a href="#">
              Examples
            </a>

            <a href="#">
              About
            </a>

            <a href="#">
              Contact
            </a>

            <button
              type="button"
              className="bw-create-button"
            >
              Create Bouquet
            </button>

          </div>

          {/* MOBILE HAMBURGER */}

          <button
            type="button"
            className="bw-mobile-button"
            onClick={() =>
              setMenuOpen((previous) => !previous)
            }
            aria-label="Toggle menu"
          >
            {menuOpen ? "×" : "☰"}
          </button>

        </nav>

        {/* MOBILE MENU */}

        {menuOpen && (
          <div className="bw-mobile-menu">

            <a
              href="#"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>

            <a
              href="#"
              onClick={() => setMenuOpen(false)}
              style={{
                color: "#d4477d",
                background: "#fff0f5",
              }}
            >
              Flowers
            </a>

            <a
              href="#"
              onClick={() => setMenuOpen(false)}
            >
              Guides
            </a>

            <a
              href="#"
              onClick={() => setMenuOpen(false)}
            >
              Examples
            </a>

            <a
              href="#"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>

            <a
              href="#"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>

            <button
              type="button"
              className="bw-mobile-create"
            >
              Create Bouquet
            </button>

          </div>
        )}

      </header>
    </>
  );
}

export default Navbar;