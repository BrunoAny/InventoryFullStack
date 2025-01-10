import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0.00,
    type: "Tops",
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
    try {
      const response = await axios.post(
        "http://localhost:5000/main/products/create",
        {
          data: {
            name: formData.name,
            price: formData.price,
            type: formData.type,
          },
          relatedTable: "product_details",
          relatedData: {
            sec_name: formData.name,
            sec_type: formData.type,
            brand: formData.brand,
            sex: formData.sex,
            size: formData.size,
            primary_color: formData.primaryColor,
            secondary_color: formData.secondaryColor,
            inventory_count: formData.inventoryCount,
            style: formData.style,
            description: formData.description,
          },
        }
      );
      console.log("Product submitted:", response.data);
    } catch (err) {
      console.error("Error submitting product:", err);
    }

  };

  return (
    <div className="container addProduct text-center">
      <h3>Add New Product</h3>
      <hr />
      <form id="product-form" className="form" onSubmit={handleSubmit}>
        <h5>Product Information</h5>

        <div className="form-group">
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
        <div className="row text-center">
          <div className="col">
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
              <option value="tops">Tops</option>
              <option value="legwear">Legwear</option>
              <option value="footwear">Footwear</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
        </div>
        <hr />

        <h5>Product Details</h5>

        <div className="form-group">
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

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control form-control-sm"
          ></textarea>
        </div>
        <hr />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
