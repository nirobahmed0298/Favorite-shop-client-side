import React, { useEffect, useState } from "react";

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({});

  // Load All Products from API
  useEffect(() => {
    fetch("http://localhost:5001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // Delete Product
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:5001/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          setProducts(products.filter((p) => p._id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  // Toggle Availability (Quick Update)
  const handleQuickUpdate = (id, currentAvailability) => {
    const newAvailability =
      currentAvailability === "In Stock" ? "Out of Stock" : "In Stock";

    fetch(`http://localhost:5001/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ availability: newAvailability }),
    })
      .then((res) => res.json())
      .then(() => {
        setProducts(
          products.map((p) =>
            p._id === id ? { ...p, availability: newAvailability } : p
          )
        );
      })
      .catch((err) => console.error(err));
  };

  // Open Modal for Edit
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      product_name: product.product_name,
      category: product.category,
      price: product.price.discounted,
      availability: product.availability,
      sizes: product.sizes.join(", "),
      image_url: product.image_url,
    });
  };

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save Update (From Modal Form)
  const handleSaveUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5001/products/${editingProduct._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: formData.product_name,
        category: formData.category,
        price: { discounted: formData.price },
        availability: formData.availability,
        sizes: formData.sizes.split(",").map((s) => s.trim()),
        image_url: formData.image_url,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setProducts(
          products.map((p) =>
            p._id === editingProduct._id
              ? {
                  ...p,
                  product_name: formData.product_name,
                  category: formData.category,
                  price: { discounted: formData.price },
                  availability: formData.availability,
                  sizes: formData.sizes.split(",").map((s) => s.trim()),
                  image_url: formData.image_url,
                }
              : p
          )
        );
        setEditingProduct(null); // close modal
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📦 All Products</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-none shadow-md p-2 border hover:shadow-lg transition"
          >
            <img
              src={product.image_url}
              alt={product.product_name}
              className="w-full h-40 object-cover mb-3"
            />
            <h3 className="text-lg font-semibold">{product.product_name}</h3>
            <p className="text-gray-600 text-sm">{product.category}</p>
            <p className="mt-2 font-medium">
              Price:{" "}
              <span className="line-through text-red-400">
                {product.price.original}৳
              </span>{" "}
              <span className="text-green-600">
                {product.price.discounted}৳
              </span>
            </p>
            <p className="mt-1 text-sm">
              <b>Sizes:</b> {product.sizes.join(", ")}
            </p>
            <p className="text-sm mt-1">
              <b>Status:</b>{" "}
              <span
                className={
                  product.availability === "In Stock"
                    ? "text-green-600"
                    : "text-red-500"
                }
              >
                {product.availability}
              </span>
            </p>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-between gap-2">
              <button
                onClick={() =>
                  handleQuickUpdate(product._id, product.availability)
                }
                className="px-3 py-1 bg-yellow-400 text-white  hover:bg-yellow-500"
              >
                Update
              </button>
              <button
                onClick={() => handleEdit(product)}
                className="px-3 py-1 bg-blue-500 text-white  hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="px-3 py-1 bg-red-500 text-white  hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-sm w-96 shadow-lg p-6 relative">
            <h3 className="text-xl font-bold mb-4">✏️ Edit Product</h3>
            <form onSubmit={handleSaveUpdate} className="space-y-3">
              <input
                type="text"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="sizes"
                value={formData.sizes}
                onChange={handleChange}
                placeholder="Sizes (comma separated: S, M, L, XL)"
                className="w-full p-2 border rounded"
              />
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option>In Stock</option>
                <option>Out of Stock</option>
              </select>
              <input
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-3 py-1 bg-gray-400 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-green-600 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllProducts;
