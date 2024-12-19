import { useState, useEffect } from "react";
import axios from "axios";
interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  primary_color: string;
  secondary_color: string;
  description: string;
  image: string;
}

const OneProduct = ({ productID }: {productID: string}) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const result = await axios.post(`http://localhost:5000/main/join`, {
          id: productID,
          table1: "products",
          table2: "product_details",
          join: "inner",
        });

        console.log("Result:", result.data);
        console.log("Result[0]:", result.data[0]);
        const product = result.data as Product;
        

        setProduct(product);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [productID]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container oneProduct">
      <div className="row">
        <div className="col-md-8">
          <img src={product.image} alt="Product Image" />
        </div>
        <div className="col-md-4">
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <p>{product.brand}</p>
          <p>{product.primary_color}</p>
          <p>{product.secondary_color}</p>
          <p>{product.description}</p>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default OneProduct;
