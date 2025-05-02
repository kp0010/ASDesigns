import { Badge } from "@/Components/ui/badge";
import React, { useState } from "react";
import { CgFormatSlash } from "react-icons/cg";
import { Link } from "react-router-dom";

export const EditProducts = () => {
  const [searchProductId, setSearchProductId] = useState("");
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(""); // State for image
  const [isEditing, setIsEditing] = useState(false); // Track edit state
  const [updatedProduct, setUpdatedProduct] = useState({}); // Store updates
  const [selectedFile, setSelectedFile] = useState(null); // Store selected image

  const getProduct = () => {
    if (!searchProductId) return; // Prevent empty requests
    setLoading(true);

    fetch(`/api/products/${searchProductId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProduct(data["product"]);
        setCategories(data["categories"]);
        setTags(data["tags"]);
        setImage(`/Products/${searchProductId}.jpeg`);
        setUpdatedProduct(data["product"]); // Initialize editable state
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Store the selected file
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("name", updatedProduct.name);
    formData.append("price", updatedProduct.price);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    const response = await fetch(`/api/products/update/${searchProductId}`, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      alert("Product updated successfully!");
      setIsEditing(false);
      getProduct(); // Refresh data
    } else {
      alert("Failed to update product.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-4">
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-4 text-gray-800">Edit Products</h2>

        {/* Product ID Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Product ID</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter Product ID"
              value={searchProductId}
              onChange={(e) => setSearchProductId(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={getProduct}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Fetch Details
            </button>
          </div>
        </div>

        {/* Product Details */}
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : product.name ? (
          <div className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <div className="flex flex-col md:flex-row gap-2 items-stretch bg-gray-200 p-3 rounded-lg">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={updatedProduct.name}
                    onChange={handleInputChange}
                    className="px-3 py-1 border rounded-lg w-full"
                  />
                ) : (
                  <span className="flex-1">{product.name}</span>
                )}
                <button
                  onClick={handleEditToggle}
                  className="px-3 py-1 bg-black text-white rounded-lg hover:bg-gray-800 w-full md:w-auto"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>
            </div>

            {/* Product Image */}
            <div>
              <label className="block text-gray-700 mb-1">Product Image</label>
              <div className="flex flex-col md:flex-row justify-between items-center bg-gray-200 p-3 rounded-lg gap-4">
                <img src={image} className="w-40 h-40 rounded-lg object-cover" alt="product" />
                {isEditing ? (
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                ) : (
                  <button
                    onClick={handleEditToggle}
                    className="px-3 py-1 bg-black text-white rounded-lg hover:bg-gray-800"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            {/* Product Price */}
            <div>
              <label className="block text-gray-700 mb-1">Price</label>
              <div className="flex flex-col md:flex-row gap-2 items-stretch bg-gray-200 p-3 rounded-lg">
                {isEditing ? (
                  <input
                    type="text"
                    name="price"
                    value={updatedProduct.price}
                    onChange={handleInputChange}
                    className="px-3 py-1 border rounded-lg w-full"
                  />
                ) : (
                  <span className="flex-1">{product.price}</span>
                )}
                <button
                  onClick={handleEditToggle}
                  className="px-3 py-1 bg-black text-white rounded-lg hover:bg-gray-800 w-full md:w-auto"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 mb-1">Category</label>
              <div className="flex flex-wrap items-center gap-2 bg-gray-200 p-3 rounded-lg">
                {categories.map((category, index) => (
                  <React.Fragment key={index}>
                    <Link
                      to={`/shop/?cat=${category.name}`}
                      className="text-blue-600 hover:underline"
                    >
                      {category.name}
                    </Link>
                    {index < categories.length - 1 && (
                      <CgFormatSlash className="text-gray-500" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-gray-700 mb-1">Tags</label>
              <div className="flex flex-wrap gap-2 bg-gray-200 p-3 rounded-lg">
                {tags.length ? (
                  tags.map((tag, index) => (
                    <Badge key={index}>{tag.name}</Badge>
                  ))
                ) : (
                  <span className="text-gray-500">No tags available</span>
                )}
              </div>
            </div>

            {/* Save Changes Button */}
            {isEditing && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleSaveChanges}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
