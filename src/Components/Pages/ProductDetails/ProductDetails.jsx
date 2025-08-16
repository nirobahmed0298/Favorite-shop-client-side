import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';  // For making API requests
import Footer from '../Home/Footer/Footer';

const ProductDetails = () => {
    let product = useLoaderData();
    const [selectedSize, setSelectedSize] = useState(null);

    // Handle size selection
    const handleSizeSelection = (size) => {
        setSelectedSize(size);
    };

    // Handle Order Now button click
    const handleOrderNow = async () => {
        if (!selectedSize) {
            alert('Please select a size first!');
            return;
        }

        try {
            const orderData = {
                product_name: product.product_name,
                size: selectedSize,
                price: product.price,  // Make sure to pass the price
                quantity: 1,  // You can adjust based on user input
            };

            // Send order data to your backend to initiate payment via SSLCommerz
            const response = await axios.post('http://localhost:5001/create_payment', orderData);

            // Handle the response from the backend which includes SSLCommerz payment URL
            if (response.data.status === 'success') {
                window.location.href = response.data.payment_url; // Redirect to payment page
            } else {
                alert('Payment initiation failed!');
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
            alert('An error occurred while processing your payment.');
        }
    };

    return (
        <>
            <div className="w-11/12 mx-auto p-4">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                        <img src={product.image_url} alt={product.product_name} className="rounded-lg shadow-lg" />
                    </div>
                    <div className="md:w-1/2">
                        <div className="bg-base-200 p-6 rounded-lg shadow-lg">
                            <h1 className="text-xl md:text-3xl font-bold mb-4">{product.product_name}</h1>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium mb-2">Select Size</h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            className={`btn btn-sm rounded-none px-4 btn-outline ${selectedSize === size ? 'bg-black text-white' : ''}`}
                                            onClick={() => handleSizeSelection(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <p className="text-gray-700 mb-6 font-bold">Selected Size: {selectedSize ? selectedSize : 'No Selected Size'}</p>

                            <button
                                className="btn w-full bg-black text-white mb-6"
                                onClick={handleOrderNow}
                            >
                                Order Now
                            </button>

                            <p className="text-gray-700 mb-6">{product.description}</p>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium mb-2">Detailed Specification:</h3>
                                <ul className="list-disc list-inside">
                                    <li>Material: {product.specifications.material}</li>
                                    <li>Composition: {product.specifications.composition}</li>
                                    <li>Fit: {product.specifications.fit}</li>
                                    <li>Dye: {product.specifications.dye}</li>
                                    <li>Preshrunk: {product.specifications.preshrunk}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </>
    );
};

export default ProductDetails;
