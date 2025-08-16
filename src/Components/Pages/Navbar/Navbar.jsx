import React, { useContext, useEffect, useState } from 'react';
import logo from '../../../../src/assets/titleLogo.png';
import { MdOutlineLogin } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ search, setSearch }) => {
    const { user, LogOut } = useContext(AuthContext);
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5001/users/role/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setRole(data);
                })
                .catch(error => console.error("Error fetching role:", error));
        }
    }, [user?.email]);
    const handleLogout = () => {
        LogOut().then(() => { });
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <>
            <div className='sticky w-full z-10 top-0 bg-white shadow-lg backdrop-blur-md'>
                <div className="w-11/12 mx-auto navbar p-0">
                    <div className="navbar-start">
                        <NavLink to='/' className="text-lg md:text-xl flex items-center">
                            <img className='w-6 h-6' src={logo} alt="Logo" />
                            <p className='inline-block font-bold'>F</p><span className='font-semibold'>avorite</span>Shop
                        </NavLink>
                    </div>
                    <div className="md:flex justify-center items-center hidden w-full">
                        <label className="input input-bordered w-full flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Search" value={search} onChange={handleSearchChange} />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                            </svg>
                        </label>
                    </div>

                    <div className="navbar-end gap-2">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="badge badge-sm indicator-item">8</span>
                            </div>
                        </div>

                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src='https://img.icons8.com/?size=100&id=108639&format=png&color=000000' alt="avatar" />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li><a>Name: {user.displayName}</a></li>
                                    <li><a>Email: {user.email.slice(0, 6)}**.com</a></li>
                                    <li>
                                        {role?.role === 'admin' && <NavLink to='/dashboard'>Dashboard</NavLink>}
                                    </li>
                                    <li><a onClick={handleLogout}><FaSignOutAlt /> Logout</a></li>
                                </ul>
                            </div>
                        ) : (
                            <Link to='/login' className="btn btn-sm rounded-none"><MdOutlineLogin /> Login</Link>
                        )}
                    </div>
                </div>

                {/* Responsive Search Bar */}
                <div className="flex justify-center items-center md:hidden pb-3 w-11/12 mx-auto">
                    <label className="input input-bordered w-full flex items-center gap-2">
                        <input type="text" className="grow" value={search} onChange={handleSearchChange} placeholder="Search" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                        </svg>
                    </label>
                </div>
            </div>
        </>
    );
};

export default Navbar;
