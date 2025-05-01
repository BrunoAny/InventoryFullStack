// EditProductForm.tsx
import { useProductContext } from "./ProductContext"; // Import the context hook

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
}

interface EditProductFormProps {
  product: Product;
  onSave: (updatedFields: Partial<Product>) => Promise<void>;
  onCancel: () => void;
  onDelete: () => void;
}

const EditProductForm = ({
  product,
  onSave,
  onCancel,
  onDelete,
}: EditProductFormProps) => {
  const [editFields, setEditFields] = useState<Product>(product);

  const handleFieldChange = (field: string, value: string | number) => {
    setEditFields((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="edit-modal col">
      <h4>Editing Product</h4>
      <div className="mb-2">{/* Form fields for editing */}</div>
      <div className="col">
        <button className="btn btn-success" onClick={() => onSave(editFields)}>
          Save
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditProductForm;
