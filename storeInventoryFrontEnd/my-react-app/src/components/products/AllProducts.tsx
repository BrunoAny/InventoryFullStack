import { useState, useEffect } from "react";
import axios from "axios";
import OneProduct from "./OneProduct";

interface Product {
  name: string;
  price: number;
  type: string;
  image: string;
  id: string;
}

const AllProducts = () => {
  const [loading, setLoading] = useState(false);
  // const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  // const [sortKey, setSortKey] = useState<"name" | "price" | "type">("name");

  // const handleSort = (key: "name" | "price" | "type") => {
  //   setSortKey(key);
  //   setSortedProducts(
  //     [...products].sort((a, b) =>
  //       a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0
  //     )
  //   );
  // };
  const [products, setProducts] = useState<Product[]>([]);
  const getProducts = async () => {
    setLoading(true);

    try {
      console.log("Getting products...");
      const response = await axios.get(
        "http://localhost:5000/main/products/all"
      );
      const products = response.data;
      console.log("product1", products[0].id);
      setProducts(products); // Save the list of products in state
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Call getProducts when component mounts
  useEffect(() => {
    getProducts();
  }, []);

  const [showOneProduct, setShowOneProduct] = useState(false);
  const [id, setId] = useState("");
  const handleProductClick = (productID: string) => {
    console.log("Product clicked:", productID);
    setId(productID);
    setShowOneProduct(true);
  };

  return (
    <div className="container allProducts text-center">
      {showOneProduct ? (
        <div className="container">
          <div className="col-3">
            <button
              className="btn btn-outline-danger"
              onClick={() => setShowOneProduct(false)}
            >
              Back
            </button>
          </div>
          <div className="col-12">
            <OneProduct productID={id} />
          </div>
        </div>
      ) : (
        <>
          <h2>All Products</h2>
          <div className="products-list container text-center">
            {products.length > 0 ? (
              <div className="products-list container text-center">
                <div className="row">
                  {products.map((product, index) => (
                    <div
                      key={index}
                      className="col-12 col-sm-6 col-md-4 product-card"
                    >
                      <div
                        className="card"
                        onClick={() => handleProductClick(product.id)}
                      >
                        <div className="card-body" id={product.id}>
                          <div className="col">
                            {product.image && (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="card-img-top"
                                style={{
                                  maxHeight: "200px",
                                  objectFit: "cover",
                                }}
                              />
                            )}
                          </div>
                          <div className="col">
                            <h3 className="card-title">{product.name}</h3>
                            <p className="card-text">Price: ${product.price}</p>
                            <p className="card-text">Type: {product.type}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              loading && <p>Loading...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AllProducts;
