import {
    Navbar,
    NavbarBrand,
    Collapse,
    NavbarToggler,
    Nav,
    NavItem
  } from "reactstrap";
  import {NavLink} from 'react-router-dom';
//   import NucampLogo from "../app/assets/img/logo.png";
  
  const Header = () => {
    return (
      <Navbar dark color="primary" sticky="top" expand="md">
        <NavbarBrand className="ms-5" href="/">
          {/* <img src={NucampLogo} alt="nucamp logo" className="float-start" /> */}
          <h1 className="mt-1">PaceJams</h1>
        </NavbarBrand>
        <Nav className="ms-auto" navbar>
    
        </Nav>
      </Navbar>
    );
  };
  
  export default Header;
  