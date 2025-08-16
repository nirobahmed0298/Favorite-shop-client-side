import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, NavLink, useParams } from 'react-router-dom';
import noDataImg from '../../../assets/NoData.jpg'
import Footer from './Footer/Footer';
const Home = ({ search }) => {
    let { name } = useParams();
    const [categories, setCategories] = useState([]);
    let [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSidebar, setShowSidebar] = useState(false); // Sidebar toggle state

    useEffect(() => {
        // Fetch categories
        fetch('/categories.json') // Update the correct path if needed
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(error => console.error("Error fetching categories:", error));

        // Fetch products from API
        fetch('https://favorite-com-server-side-main.vercel.app/products')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => console.error("Error fetching products:", error.message));

    }, []);






    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (name) {
            let categoryBtn = [...data].filter(product => product.name === name)
            setProducts(categoryBtn);
        }
        else {
            setProducts(data);
        }
    }, [name, data])

    const filteredProducts = products.filter((product) => {
        // Use a safe fallback for search (default to empty string if undefined)
        const searchTerm = search ? search.toLowerCase() : ''; // Avoid calling toLowerCase on undefined
        return product.name.toLowerCase().includes(searchTerm);
    });
    return (
        <>
            <Helmet>
                <title> Home | Favorite Shop</title>
            </Helmet>

            <div className='w-11/12 mx-auto'>

                {/* Toggle Sidebar Button (for Mobile) */}
                <button
                    className="lg:hidden text-sm p-1 bg-gray-800 text-white rounded my-2"
                    onClick={() => setShowSidebar(!showSidebar)}
                >
                    ☰Menu
                </button>

                <div className="flex">
                    {/* Sidebar */}
                    <aside
                        className={`fixed lg:relative bg-[#F8F8F8] p-4 h-screen overflow-y-auto w-64 lg:w-1/5 min-w-[250px] z-50 lg:z-0 transform ${showSidebar ? "translate-x-0" : "-translate-x-full  lg:left-0 -left-10"
                            } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
                    >
                        {/* Close Button for Mobile */}
                        <button
                            className="lg:hidden text-red-600 text-2xl absolute top-4 right-6"
                            onClick={() => setShowSidebar(false)}
                        >
                            ✖
                        </button>

                        {categories.map((category, index) => (
                            <div key={index} className="my-2">
                                <ul>
                                    <NavLink to={`/name/${category.name}`} className=''>
                                        {category.name}
                                    </NavLink>
                                </ul>
                            </div>
                        ))}
                    </aside>

                    {/* Main Product Section */}
                    <main className="flex-1 p-0 md:p-4 overflow-y-auto h-screen">
                        {loading ? (
                            <div className="text-center text-lg h-[100vh] flex items-center justify-center">
                                <span className="loading loading-xl text-center loading-spinner text-success"></span>
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filteredProducts.map((product) => (
                                    <div key={product._id} className="card rounded-none text-center bg-white shadow-md overflow-hidden">
                                        <figure className="relative">
                                            <img src={product.image_url} alt={product.product_name} className="w-full object-cover" />
                                            <span className="absolute top-2 left-2 bg-black text-white text-xs p-0 md:px-2 md:py-1 rounded">
                                                ⚡ FREE DELIVERY
                                            </span>
                                            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs p-0 md:px-2 md:py-1 rounded">
                                                SALE
                                            </span>
                                        </figure>
                                        <div className="p-0">
                                            <h2 className="text-[10px] mt-1 md:text-sm font-semibold">{product.product_name}</h2>
                                            <p className="text-xs bg-gray-200 px-2 py-1 inline-block rounded mt-1">
                                                Save Tk. {product.price.original - product.price.discounted}
                                            </p>
                                            <p className="text-lg font-bold mt-1">
                                                <span className="line-through text-gray-500 text-[10px] md:text-sm">৳{product.price.original}</span>{" "}
                                                <span className='text-[10px] md:text-sm'>৳{product.price.discounted}</span>
                                            </p>
                                            <Link to={`/product/${product._id}`} className="btn bg-black text-[10px] md:text-lg text-white w-full mt-2 rounded-none gap-2">
                                                <FaShoppingCart /> Buy Now
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-lg font-bold text-gray-500 h-[100vh] flex flex-col items-center justify-center">
                                <div className='md:w-52 md:h-52'>
                                    <img className='w-full h-full' src={noDataImg} alt="Image" />
                                </div>
                                <h1 className='text-black'>
                                    No Data Available
                                </h1>
                            </div>
                        )}
                    </main>
                </div>
            </div>
            <Footer></Footer>

        </>
    );
};

export default Home;
