import React, { useState } from "react";

const AddProducts = () => {
  const [formData, setFormData] = useState({
    product_id: "",
    product_name: "",
    category: "",
    name: "",
    price: { original: "", discounted: "" },
    sizes: [],
    description: "",
    specifications: {
      material: "",
      composition: "",
      fit: "",
      dye: "",
      preshrunk: ""
    },
    availability: "",
    image_url: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // price / specifications object handle
    if (name.startsWith("price.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        price: { ...prev.price, [key]: value }
      }));
    } else if (name.startsWith("specifications.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        specifications: { ...prev.specifications, [key]: value }
      }));
    } else if (name === "sizes") {
      setFormData((prev) => ({
        ...prev,
        sizes: value.split(",").map((size) => size.trim())
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    try {
      const res = await fetch("https://favorite-com-server-side-main.vercel.app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("Product added successfully!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" bg-white p-6 space-y-4"
    >
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>

      <input
        type="number"
        name="product_id"
        placeholder="Product ID"
        value={formData.product_id}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <input
        type="text"
        name="product_name"
        placeholder="Product Name"
        value={formData.product_name}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      {/* Price */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="price.original"
          placeholder="Original Price"
          value={formData.price.original}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="price.discounted"
          placeholder="Discounted Price"
          value={formData.price.discounted}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>

      {/* Sizes */}
      <input
        type="text"
        name="sizes"
        placeholder="Sizes (comma separated: S, M, L)"
        value={formData.sizes.join(", ")}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="textarea textarea-bordered w-full"
      ></textarea>

      {/* Specifications */}
      <input
        type="text"
        name="specifications.material"
        placeholder="Material"
        value={formData.specifications.material}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <input
        type="text"
        name="specifications.composition"
        placeholder="Composition"
        value={formData.specifications.composition}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <input
        type="text"
        name="specifications.fit"
        placeholder="Fit"
        value={formData.specifications.fit}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <input
        type="text"
        name="specifications.dye"
        placeholder="Dye"
        value={formData.specifications.dye}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <input
        type="text"
        name="specifications.preshrunk"
        placeholder="Preshrunk (Yes/No)"
        value={formData.specifications.preshrunk}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      {/* Availability */}
      <input
        type="text"
        name="availability"
        placeholder="Availability"
        value={formData.availability}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      {/* Image URL */}
      <input
        type="text"
        name="image_url"
        placeholder="Image URL"
        value={formData.image_url}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <button type="submit" className="btn bg-blue-400 text-white w-full">
        Add Product
      </button>
    </form>
  );
};

export default AddProducts;
