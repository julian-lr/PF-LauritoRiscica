import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { CartWidget } from "./CartWidget";
import "../App.css";

import data from "../data/currencies.json";

const currencies = data.map((item) => item.category);

const uniqueCurrencies = new Set(currencies);

export const NavBar = () => (
  <Navbar bg="dark" data-bs-theme="dark">
    <div className="container nav-container">
      <Navbar.Brand to="/">
        <img
          src="../src/assets/react.svg"
          className="logo"
          alt="Logo del proyecto"
        />
        <NavLink to="/">
          <span className="nav-link brand-title">La Cueva del React</span>
        </NavLink>
      </Navbar.Brand>
        <Nav className="me-auto">
          <NavLink to="/">
            <span className="nav-link">Home</span>
          </NavLink>
          {[...uniqueCurrencies].map((category) => (
            <NavLink key={category} to={`/currencies/${category}`}>
              <span className="nav-link">{category}</span>
            </NavLink>
          ))}
          <NavLink>
            <CartWidget />
          </NavLink>
        </Nav>
    </div>
  </Navbar>
);
