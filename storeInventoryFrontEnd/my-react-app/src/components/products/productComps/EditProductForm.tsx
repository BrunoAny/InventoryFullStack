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
  // is_archived: boolean;
}
interface EditProductFormProps {
  editFields: Product;
  onFieldChange: (field: string, value: string | number) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}
const editDiv = (
  editFields: Product,
  onFieldChange: (field: string, value: string | number) => void,
  
) => {
  const productFields = [
    "id",
    "products_id",
    "brand",
    "name",
    "sec_name",
    "price",
    "type",
    "sec_type",
    "primary_color",
    "secondary_color",
    "style",
    "image",
    "inventory_count",
    "description",
  ];
  
  const fields = Object.keys(editFields).filter((field) =>
    productFields.includes(field)
  );

  return fields.map((field) => (

    <div className="mb-2" key={field}>
      <span className="fieldTitle">{field}:</span>
      <input
        type="text"
        value={editFields[field as keyof Product]}
        onChange={(e) => onFieldChange(field, e.target.value as string | number)}
        className="form-control mb-2"
        placeholder={field}
        disabled={field.includes("id")}
      />
    </div>
  ))
}
const EditProductForm = ({
  editFields,
  onFieldChange,
  onSave,
  onCancel,
  onDelete,
}: EditProductFormProps) => (
  <div className="edit-modal col">
    <h4>Editing Product</h4>
    <div className="mb-2">
      {/* <input
        type="text"
        value={editFields.name}
        onChange={(e) => onFieldChange("name", e.target.value)}
        className="form-control mb-2"
        placeholder="Product Name"
      />
      <input
        type="number"
        value={editFields.price}
        onChange={(e) => onFieldChange("price", Number(e.target.value))}
        className="form-control mb-2"
        placeholder="Price"
      />
      <input
        type="text"
        value={editFields.type}
        onChange={(e) => onFieldChange("type", e.target.value)}
        className="form-control"
        placeholder="Type"
      /> */}
      {editDiv(editFields, onFieldChange)}
    </div>
    <div className="col">
      <button className="btn btn-success" onClick={onSave}>
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

export default EditProductForm;
