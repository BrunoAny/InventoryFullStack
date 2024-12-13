import { useState, useEffect } from "react";
import AddProduct from "./AddProduct";
import AllProducts from "./AllProducts";
import OneProduct from "./OneProduct";
const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {

    
  }, [activeTab]);
  return (
    <div>
      <div>
        <button className="btn btn-primary-outline" onClick={() => setActiveTab("all")}>
          Products
        </button>
        <button className="btn btn-primary-outline" onClick={() => setActiveTab("add")}>
          Add Product
        </button>
        <button className="btn btn-primary-outline" onClick={() => setActiveTab("one")}>
          One Product
        </button>

        {activeTab === "all" && <AllProducts />}
        {activeTab === "add" && <AddProduct />}
        {activeTab === "one" && <OneProduct />}
      </div>
    </div>
  );
};

export default ProductsPage;
