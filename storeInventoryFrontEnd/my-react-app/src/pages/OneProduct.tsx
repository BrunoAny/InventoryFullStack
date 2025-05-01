import { useParams } from "react-router-dom";
import { useProductContext, Product } from "../context/ProductContext";

const OneProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProductContext();
  const product = products.find((p) => p.id === id);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="container oneProduct">
      <div className="row">
        <div className="col-md-4">
          <h3>{product.sec_name}</h3>
          <p>{product.sec_type}</p>
          <p>${product.price}</p>
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
