interface Product {
  image: string;
  name: string;
  price: number;
  type: string;
}

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onEdit: () => void;
}

const ProductCard = ({ product, onClick, onEdit }: ProductCardProps) => (
  <div className="card row">
    <div className="card-body row" onClick={onClick}>
      <div className="col">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="card-img-top"
            style={{ maxHeight: "200px", objectFit: "cover" }}
          />
        )}
      </div>
      <div className="col">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-text">Price: ${product.price}</p>
        <p className="card-text">Type: {product.type}</p>
      </div>
      <div className="col-2">
        <button
          className="btn btn-warning"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          Edit
        </button>
      </div>
    </div>
  </div>
);

export default ProductCard;
