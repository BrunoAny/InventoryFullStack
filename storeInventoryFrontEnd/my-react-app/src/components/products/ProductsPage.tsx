import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import AllProducts from "./AllProducts";
import OneProduct from "./OneProduct";
import { useState } from "react";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  return (
    <div>
      <div>
        <button className="btn " onClick={() => setActiveTab("all")}>
          Products
        </button>
        <button className="btn " onClick={() => setActiveTab("add")}>
          Add Product
        </button>
      </div>
      
      {activeTab === "all" && <AllProducts />}
      {activeTab === "add" && <AddProduct />}
    </div>
  );
};

export default ProductsPage;

