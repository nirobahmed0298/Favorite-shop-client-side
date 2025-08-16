import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet, NavLink } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdAddShoppingCart } from "react-icons/md";
import { AuthContext } from "../Provider/AuthProvider";

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state

    return (
        <>
            <Helmet>
                <title>Admin Dashboard | Favorite Shop</title>
            </Helmet>

            <div className={`flex-1 flex flex-col h-screen ${isOpen ? "" : "md:ml-64"}`}>
                {/* Sidebar */}
                <div
                    className={`fixed top-16 left-0 h-screen w-64 bg-white shadow-md p-5 transform transition-transform duration-300 z-50 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0`}
                >
                    {/* Close button for mobile */}
                    <div className="flex justify-between items-center mb-6 md:hidden ">
                        <h1 className="text-2xl font-bold text-[#4AB1FF]">Favorite Shop</h1>
                        <button onClick={() => setIsOpen(false)}>
                            <FaTimes size={20} />
                        </button>
                    </div>

                    {/* Logo for desktop */}
                    <h1 className="text-2xl font-bold mb-6 text-[#4AB1FF] hidden md:block">
                        Favorite Shop
                    </h1>

                    <p className="text-gray-600 mb-8">
                        You are <span className="font-bold capitalize">Admin</span>
                    </p>

                    <ul className="space-y-4">
                        <li>
                            <NavLink
                                to="/dashboard/viewAllProducts"
                                className="flex items-center text-gray-700 hover:text-blue-500 transition font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                <GrView />
                                <span className="ml-2">View all Products</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/addProducts"
                                className="flex items-center text-gray-700 hover:text-blue-500 transition font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                <MdAddShoppingCart />
                                <span className="ml-2">Add Products</span>
                            </NavLink>
                        </li>

                        <div className="border-t my-4"></div>
                        <li>
                            <NavLink
                                to="/dashboard"
                                className="flex items-center text-gray-700 hover:text-blue-500 transition font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                <TbLayoutDashboardFilled />
                                <span className="ml-2">Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/"
                                className="flex items-center text-gray-700 hover:text-blue-500 transition font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                <FaHome />
                                <span className="ml-2">Home</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col h-screen">
                    {/* Top Navbar */}
                    <div className="bg-white shadow-md p-4 flex items-center md:hidden">
                        <button onClick={() => setIsOpen(true)}>
                            <FaBars size={20} />
                        </button>
                        <h2 className="ml-4 font-bold text-lg">Admin Dashboard</h2>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
