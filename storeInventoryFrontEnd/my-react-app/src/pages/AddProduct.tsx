import React, { useState } from "react";
import { useProductContext } from "../context/ProductContext";
import AllProducts from "./AllProducts";
import { Routes, Route, Link } from "react-router-dom";



const AddProduct = () => {
  const { addProduct } = useProductContext();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "Tops",
    sec_name: "none",
    sec_type: "none",
    brand: "",
    sex: "Female",
    size: 0,
    primaryColor: "Black",
    secondaryColor: "Black",
    inventoryCount: 1,
    style: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "size" || name === "inventoryCount"
          ? parseFloat(value) || 0
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Transform formData to match the Product interface
    const product = {
      name: formData.name,
      price: formData.price,
      type: formData.type,
      image: "", // Add missing field
      is_archived: false, // Add missing field
    };

    const productDetails = {
      sec_name: formData.sec_name,
      sec_type: formData.sec_type,
      brand: formData.brand,
      sex: formData.sex,
      size: formData.size,
      primary_color: formData.primaryColor,
      secondary_color: formData.secondaryColor,
      inventory_count: formData.inventoryCount,
      style: formData.style,
      description: formData.description,
    };

    await addProduct(product, productDetails).then(() => {
      window.location.href = "/products"; // Redirect to products page after adding
    }).catch((error) => {
      console.log("product", product);
      console.log("productDetails", productDetails);
      console.error("Error adding product:", error);
    });
  };

  return (
    <div className="container addProduct text-center">
      <h4>Add New Product</h4>
      <hr />
      <form id="product-form" className="form" onSubmit={handleSubmit}>
        <h5>Product Information</h5>

        <div className="row text-center">
          <div className="col">
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control form-control-sm"
            />
          </div>
          <div className="col-3">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              step="0.01"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="form-control form-control-sm"
            />
          </div>

          <div className="col">
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="form-control form-control-sm"
            >
              <option value="Tops">Tops</option>
              <option value="Legwear">Legwear</option>
              <option value="Footwear">Footwear</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>
        <hr />

        <h5>Product Details</h5>

        <div className="row text-center">
          <div className="col">
            <label htmlFor="sec_name">Secondary Name:</label>
            <input
              type="text"
              id="sec_name"
              name="sec_name"
              value={formData.sec_name}
              onChange={handleChange}
              required
              className="form-control form-control-sm"
            />
          </div>

          <div className="col">
            <label htmlFor="sec_type">Secondary Type:</label>
            <input
              type="text"
              id="sec_type"
              name="sec_type"
              value={formData.sec_type}
              onChange={handleChange}
              required
              className="form-control form-control-sm"
            />
          </div>

          <div className="col form-group">
            <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="form-control form-control-sm"
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col">
            <label htmlFor="sex">Sex:</label>
            <select
              id="sex"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              required
              className="form-control form-control-sm"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>

          <div className="form-group col">
            <label htmlFor="size">Size:</label>
            <input
              type="number"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
              className="form-control form-control-sm"
            />
          </div>

          <div className="form-group col">
            <label htmlFor="primaryColor">Pri Color:</label>
            <select
              id="primaryColor"
              name="primaryColor"
              value={formData.primaryColor}
              onChange={handleChange}
              required
              className="form-control form-control-sm"
            >
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Red">Red</option>
              <option value="Orange">Orange</option>
              <option value="Yellow">Yellow</option>
              <option value="Green">Green</option>
              <option value="Blue">Blue</option>
              <option value="Purple">Purple</option>
              <option value="Pink">Pink</option>
              <option value="Brown">Brown</option>
            </select>
          </div>

          <div className="form-group col">
            <label htmlFor="secondaryColor">Sec Color:</label>
            <select
              id="secondaryColor"
              name="secondaryColor"
              value={formData.secondaryColor}
              onChange={handleChange}
              className="form-control form-control-sm"
            >
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Red">Red</option>
              <option value="Orange">Orange</option>
              <option value="Yellow">Yellow</option>
              <option value="Green">Green</option>
              <option value="Blue">Blue</option>
              <option value="Purple">Purple</option>
              <option value="Pink">Pink</option>
              <option value="Brown">Brown</option>
            </select>
          </div>

          <div className="form-group col">
            <label htmlFor="inventoryCount">Inv Count:</label>
            <input
              type="number"
              id="inventoryCount"
              name="inventoryCount"
              value={formData.inventoryCount}
              onChange={handleChange}
              required
              className="form-control form-control-sm"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="style">Style:</label>
          <input
            type="text"
            id="style"
            name="style"
            value={formData.style}
            onChange={handleChange}
            required
            className="form-control form-control-sm"
          />
        </div>

        <div className="form-group mb-2">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control form-control-sm"
          ></textarea>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="image">Image:</label>
          <br />
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <hr />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
<Routes>
  
   <Route path="/products" element={<AllProducts />} />
</Routes>
export default AddProduct;
