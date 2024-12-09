import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./components/LandingPage/Landing";
import AddProduct from "./components/products/AddProduct";
import AllProducts from "./components/products/AllProducts";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Landing /> */}
      {/* <AddProduct /> */}
      <AllProducts />
      <Footer />
    </div>
  );
}

export default App;
