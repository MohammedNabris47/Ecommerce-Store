import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router";

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button
        className={`${isOpen ? "top-2 right-2" : "top-3 right-5"} bg-black p-2 fixed rounded cursor-pointer outline-0 border-0`}
        onClick={toggleMenu}
      >
        {isOpen ? (
          <FaTimes color="white" size={12} />
        ) : (
          <>
            <div className="w-4 h-0.5 bg-gray-800 my-1"></div>
            <div className="w-4 h-0.5 bg-gray-800 my-1"></div>
            <div className="w-4 h-0.5 bg-gray-800 my-1"></div>
          </>
        )}
      </button>

      {isOpen && (
        <section className="bg-black p-1 fixed right-6 top-8">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                to={"/admin/dashboard"}
                className={
                  "py-1 px-2 block mb-4 hover:bg-gray-950 rounded-sm text-[11px]"
                }
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin/category"}
                className={
                  "py-1 px-2 block mb-4 hover:bg-gray-950 rounded-sm text-[11px]"
                }
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin/product"}
                className={
                  "py-1 px-2 block mb-4 hover:bg-gray-950 rounded-sm text-[11px]"
                }
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin/all-products"}
                className={
                  "py-1 px-2 block mb-4 hover:bg-gray-950 rounded-sm text-[11px]"
                }
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin/users"}
                className={
                  "py-1 px-2 block mb-4 hover:bg-gray-950 rounded-sm text-[11px]"
                }
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin/orders"}
                className={
                  "py-1 px-2 block mb-4 hover:bg-gray-950 rounded-sm text-[11px]"
                }
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
