import React from 'react';
import errorImg from '../../../src/assets/ErroPage.jpg'
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
const ErrorPage = () => {
    return (
        <>
            <Helmet>
                <title>404 Error | Favorite Shop</title>
            </Helmet>
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center p-4">
                <div className="bg-white shadow-lg rounded-xl p-8 md:p-12">
                    <div className='h-52'>
                        <img className='w-full h-full' src={errorImg} alt="ErrorImage" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-700 mt-4">Page Not Found</h2>
                    <p className="text-gray-500 mt-2">Sorry, the page you are looking for does not exist.</p>

                    <Link to="/" className="mt-6 inline-block px-6 py-3 bg-black text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition">
                        Go Back Home
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;