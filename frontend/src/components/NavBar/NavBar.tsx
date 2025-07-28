import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

const NavBar = () => {
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="https://flowbite-react.com">
        <img
          src="/vite.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button color="green" outline>
          Logout
        </Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Home
        </NavbarLink>
        <NavbarLink href="/lost">Lost Items</NavbarLink>
        <NavbarLink href="/found">Found Items</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavBar;
