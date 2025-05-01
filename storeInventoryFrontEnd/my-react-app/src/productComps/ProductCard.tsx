interface Product {
  id: string;
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
      <div className="col-4">
        <h3 className="card-title">{product.name}</h3>
        <h6 className="card-text">${product.price}</h6>
      </div>
      <div className="col-3">
        <button
          className="btn btn-warning"
          type="button"
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
