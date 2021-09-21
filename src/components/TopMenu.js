import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';
import { CartContext } from "../contexts/Cart";

const TopMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">VietNguyen</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar >
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/">Home</Link>
            </NavItem>
            <NavItem>
              <Link to="/product/">Products</Link>
            </NavItem>
            <NavItem>
              <CartContext.Consumer   >
                {({ cartItem }) => (
                  <Link to="/product/">Cart ({cartItem.length})</Link>
                )}
              </CartContext.Consumer>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TopMenu;
