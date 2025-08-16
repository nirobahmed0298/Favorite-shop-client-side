import React from "react";
import { FaWhatsapp, FaEnvelope, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900">
            <div className=" w-11/12 mx-auto text-white py-10">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                    {/* Logo & Description */}
                    <div className="mb-6 md:mb-0">
                        <h1 className="text-2xl font-bold mb-2">Favorite Shop</h1>
                        <p className="text-gray-400 max-w-xs">
                            Your one-stop online shop for the best gadgets and fashion items.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
                        <ul>
                            <li className="flex items-center mb-2">
                                <FaWhatsapp className="mr-2 text-green-500" />
                                <a href="https://wa.me/01926002688" target="_blank" rel="noopener noreferrer">
                                    01926002688
                                </a>
                            </li>
                            <li className="flex items-center">
                                <FaEnvelope className="mr-2 text-blue-400" />
                                <a href="mailto:nirobahmed0298@gmail.com">
                                    nirobahmed0298@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Follow Us</h2>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-500">
                                <FaFacebook size={24} />
                            </a>
                            <a href="#" className="hover:text-pink-500">
                                <FaInstagram size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Favorite Shop. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
