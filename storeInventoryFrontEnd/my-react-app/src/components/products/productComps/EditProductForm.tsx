interface EditProductFormProps {
  editFields: { name: string; price: number; type: string };
  onFieldChange: (field: string, value: string | number) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
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
      <input
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
      />
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