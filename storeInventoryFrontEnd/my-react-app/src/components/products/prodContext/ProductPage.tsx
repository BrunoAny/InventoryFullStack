// ProductsPage.tsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AllProducts from "./AllProducts";
import AddProduct from "../AddProduct";
import OneProduct from "./OneProduct";

const ProductsPage = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/products">All Products</Link>
          <Link to="/products/add">Add Product</Link>
        </nav>
        <Routes>
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/:id" element={<OneProduct />} />
        </Routes>
      </div>
    </Router>
  );
};

export default ProductsPage;
