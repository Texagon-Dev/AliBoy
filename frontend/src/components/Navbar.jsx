import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/Images/Ellipse.png";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import supabase from "@/lib/supabase";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { fetchUserProfile } from "@/redux/features/userSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const { session } = useSelector((state) => state.user);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/signin");
      toast.info("Sign out successful");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error signing out:", error.message);
      }
    }
  };

  const users = useSelector((state) => state.user.user);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  console.log(users);
  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  return (
    <nav className="fixed w-screen bg-transparent top-0 z-50 py-3  backdrop-blur-lg">
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
            {session && session.user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="ml-4 flex gap-4 items-center justify-center">
                      <h4 className="raleway-medium md:text-[24px] text-[12px]">
                        Hello,{" "}
                        <span className="font-bold">
                          {session.user.user_metadata.full_name.split(" ")[0]}
                        </span>
                      </h4>
                      {users ? (
                        <div key={users.uuid}>
                          <Avatar className="lg:h-[38px] lg:w-[38px] md:h-[36px] md:w-[36px] h-[36px] w-[36px] ">
                            <AvatarImage
                              src={
                                users.profile_image ||
                                "https://github.com/shadcn.png"
                              }
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </div>
                      ) : (
                        ""
                      )}{" "}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <NavLink to={"./user/profile"}>User Profile</NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {" "}
                      <NavLink onClick={handleSignout}>Logout</NavLink>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <li>
                <NavLink to="/signup">Signup</NavLink>
              </li>
            )}
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
              {session && session.user ? (
                <li className="py-4">
                  <NavLink onClick={handleSignout}>Logout</NavLink>
                </li>
              ) : (
                <li className="py-4">
                  <NavLink to="/signup">Signup</NavLink>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
