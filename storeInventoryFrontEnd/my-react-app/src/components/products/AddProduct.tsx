// AddProduct.tsx
import React, { useState } from "react";
import { useProductContext } from "./ProductContext"; // Import the context hook

const AddProduct = () => {
  const { addProduct } = useProductContext(); // Use the context
  const [formData, setFormData] = useState({
    name: "",
    price: 0.0,
    type: "Tops",
    sec_name: "",
    sec_type: "",
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
    await addProduct(formData); // Use context method
  };

  return (
    <div className="container addProduct text-center">
      <h4>Add New Product</h4>
      <hr />
      <form id="product-form" className="form" onSubmit={handleSubmit}>
        {/* Form fields remain the same */}
      </form>
    </div>
  );
};

export default AddProduct;
