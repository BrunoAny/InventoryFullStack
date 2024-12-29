import { useState, useEffect } from "react";
import ProductCard from "./productComps/ProductCard";
import ShowDetails from "./productComps/ShowDetails";
import axios from "axios";

interface Product {
  id: string;
  products_id: string;
  brand: string;
  name: string;
  sec_name: string;
  price: number;
  type: string;
  sec_type: string;
  primary_color: string;
  secondary_color: string;
  style: string;
  image: string;
  inventory_count: number;
  description: string;
  is_archived: boolean;
}

const AllProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [expandedProductId, setExpandedProductId] = useState<string | null>(
    null
  );

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/main/join", {
        id: "null",
        table1: "products",
        table2: "product_details",
        join: "inner",
      });
      const activeProducts = data.filter(
        (product: Product) => product.is_archived === false
      );
      setProducts(activeProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleDetails = (productId: string) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="allProducts container text-center">
      <h2>All Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="products-list container text-center">
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 mb-4" key={product.products_id}>
                <div className="card">
                  <ProductCard
                    product={product}
                    onEdit={() => console.log("Edit product")}
                    onClick={() => toggleDetails(product.products_id)}
                    onDetails={() => toggleDetails(product.products_id)}
                  />
                  {expandedProductId === product.products_id && (
                    <div className="details-section">
                      <ShowDetails
                        product={product}
                        onClose={() => setExpandedProductId(null)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
