import { Routes, Route, Link } from "react-router-dom";
import AddProduct from "./AddProduct";
import AllProducts from "./AllProducts";
import OneProduct from "./OneProduct";
import { useProductContext } from "../context/ProductContext";

const ProductsPage = () => {
  const { products, loading } = useProductContext();

  return (
    <div>
      <div>
        <Link to="/products" className="btn">
          Products
        </Link>
        <Link to="/products/add" className="btn">
          Add Product
        </Link>
      </div>

      <Routes>
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/:id" element={<OneProduct />} />
      </Routes>
    </div>
  );
};

export default ProductsPage;
