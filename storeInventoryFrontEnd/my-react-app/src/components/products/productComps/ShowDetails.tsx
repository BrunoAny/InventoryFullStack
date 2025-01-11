interface ProductDetailsProps {
  product?: {
    style: string;
    brand: string;
    primary_color: string;
    secondary_color: string;
    description: string;
  };
  onClose: () => void;
}

const ShowDetails = ({ product, onClose }: ProductDetailsProps) => {
  if (!product) return null;

  return (
    <div className="product-details col">
      <div className="col text-start">
        <table className="table table-striped">
          <tbody>
            <tr>
              <td>Style</td>
              <td>{product.style}</td>
            </tr>
            <tr>
              <td>Brand</td>
              <td>{product.brand}</td>
            </tr>
            <tr>
              <td>Primary Color</td>
              <td>{product.primary_color}</td>
            </tr>
            <tr>
              <td>Secondary Color</td>
              <td>{product.secondary_color}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{product.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="btn btn-secondary mt-3" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ShowDetails;
