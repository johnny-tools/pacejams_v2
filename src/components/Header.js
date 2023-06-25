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
      <Navbar expand="md">
        <NavbarBrand href="/">
          <h1 className="mt-1">PaceJams</h1>
        </NavbarBrand>
      </Navbar>
    );
  };
  
  export default Header;
  