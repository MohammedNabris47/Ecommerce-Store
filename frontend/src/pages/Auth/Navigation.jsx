import { useState } from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoriteCount from "../Products/FavoriteCount";
const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.cart);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      style={{ zIndex: 999 }}
      className={`${showSidebar ? "hidden" : "flex"} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[13%] h-screen  fixed`}
      id="navigation-container"
    >
      <div className="flex justify-center flex-col space-y-2">
        <Link
          to={"/"}
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome size={18} className="mr-2 mt-12" />
          <span className="hidden nav-item-name mt-12 text-[12px]">HOME</span>
        </Link>
        <Link
          to={"/shop"}
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping size={18} className="mr-2 mt-12" />
          <span className="hidden nav-item-name mt-12 text-[12px]">SHOP</span>
        </Link>
        <Link
          to={"/cart"}
          className="flex items-center transition-transform transform hover:translate-x-2  relative"
        >
          <AiOutlineShoppingCart size={18} className="mr-2 mt-12 " />
          <span className="hidden nav-item-name mt-12 text-[12px]">CART</span>

          <div className="absolute top-8">
            {cartItems.length > 0 && (
              <span className="px-1 py-0 text-[10px] font-medium text-black bg-white rounded-full">
                {cartItems.reduce((a, c) => a + c.quantity, 0)}
              </span>
            )}
          </div>
        </Link>

        <Link
          to={"/favorite"}
          className="flex items-center transition-transform transform hover:translate-x-2 relative"
        >
          <FaHeart size={16} className="mr-2 mt-12" />
          <span className="hidden nav-item-name mt-12 text-[12px]">
            FAVORITE
          </span>
          <FavoriteCount />
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center focus:outline-0 text-gray-800 cursor-pointer"
        >
          {userInfo ? (
            <span className="text-white text-[13px]">{userInfo.username}</span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1  ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-gray-950 text-gray-600 ${!userInfo.isAdmin ? "-top-20" : "-top-60"}`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to={"/admin/dashboard"}
                    className="block px-2 py-1 hover:bg-gray-900 text-[12px] text-center font-semibold "
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/product"}
                    className="block px-2 py-1 hover:bg-gray-900 text-[12px] text-center font-semibold"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/category"}
                    className="block px-2 py-1 hover:bg-gray-900 text-[12px] text-center font-semibold"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/orders"}
                    className="block px-2 py-1 hover:bg-gray-900 text-[12px] text-center font-semibold"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/users"}
                    className="block px-2 py-1 hover:bg-gray-900 text-[12px] text-center font-semibold"
                  >
                    Users
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to={"/admin/profile"}
                    className="block px-2 py-1 hover:bg-gray-900 text-[12px] text-center font-semibold"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/logout"}
                    className="block px-2 py-1 hover:bg-gray-900 text-[12px] text-center font-semibold"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Link>
                </li> */}
              </>
            )}

            <li>
              <Link
                to={"/profile"}
                className="block px-2 py-1 hover:bg-gray-900 text-[12px] text-center font-semibold"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to={"/logout"}
                className="block px-2 py-1 hover:bg-gray-900 text-[12px] text-center font-semibold"
                onClick={logoutHandler}
              >
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>

      {!userInfo && (
        <ul>
          <li>
            <Link
              to={"/login"}
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineLogin size={18} className="mr-2 mt-12" />
              <span className="hidden nav-item-name mt-12 text-[13px]">
                Login
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={"/register"}
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUserAdd size={18} className="mr-2 mt-12" />
              <span className="hidden nav-item-name mt-12 text-[13px]">
                Register
              </span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
