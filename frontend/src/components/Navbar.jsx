import { NavLink } from "react-router-dom";
import logo from "../assets/Images/Ellipse.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  return (
    <nav className="fixed w-full bg-transparent top-0 z-20 py-3  backdrop-blur-lg">
      <div className="container lg:w-[1280px] px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <ul className="flex items-center flex-shrink-0">
            <li>
              <NavLink
                to="/create/begin"
                className="hidden lg:flex text-2xl leading-7 tracking-tight mr-8 raleway-medium"
              >
                Create Story
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className="hidden lg:flex text-2xl leading-7 tracking-tight raleway-medium"
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className="lg:hidden md:flex text-2xl leading-7  tracking-tight"
              >
                Logo
              </NavLink>
            </li>
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <NavLink to="/">
              <img className="h-10 w-10 mr-2 " src={logo} alt="Logo" />
            </NavLink>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12 text-2xl leading-7">
            <li>
              <NavLink to="/pricing">Pricing</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          </ul>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 top-[54px] z-800 bg-white w-full p-12 flex flex-col justify-center items-center lg:hidden text-2xl leading-7">
            <ul>
              <li className="py-4">
                <NavLink to="/create">Create Story</NavLink>
              </li>
              <li className="py-4">
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li className="py-4">
                <NavLink to="/pricing">Pricing</NavLink>
              </li>
              <li className="py-4">
                <NavLink to="signup">SignUp</NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
