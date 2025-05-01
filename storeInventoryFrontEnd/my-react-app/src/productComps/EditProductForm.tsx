import React, { useState, useEffect } from "react";
import {
  Product,
  ProductDetails,
  FullProduct,
} from "../context/ProductContext";
import { set } from "mongoose";

interface EditProductFormProps {
  product: FullProduct;
  onSave: (
    productUpdates: Partial<Product>,
    detailUpdates: Partial<ProductDetails>
  ) => Promise<void>;
  onCancel: () => void;
  onDelete: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({
  product,
  onSave,
  onCancel,
  onDelete,
}) => {
  // Initial state is set to the current product and details

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productUpdates, setProductUpdates] = useState<Partial<Product>>({});
  const [detailUpdates, setDetailUpdates] = useState<Partial<ProductDetails>>({});

  useEffect(() => {
    if (product) {
      // console.log(product);
      setProductUpdates({
        name: product.name || "",
        price: product.price || 0,
        type: product?.type || "",
        image: product?.image || "",
        is_archived: product?.is_archived || false,
      });
      setDetailUpdates({
        sec_name: product?.sec_name || "",
        sec_type: product?.sec_type || "",
        brand: product?.brand || "",
        sex: product?.sex || "",
        size: product?.size || "",
        primary_color: product?.primary_color || "",
        secondary_color: product?.secondary_color || "",
        style: product?.style || "",
        inventory_count: product?.inventory_count || 0,
        description: product?.description || "",
      });
      setIsLoading(false);
      
    }
    // Separate state for product and details
  }, [product]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Handle changes to product fields
  const handleProductChange = (
    field: keyof Product,
    value: string | number | boolean
  ) => {
    setProductUpdates((prev) => ({ ...prev, [field]: value }));
  };

  // Handle changes to detail fields
  const handleDetailsChange = (
    field: keyof ProductDetails,
    value: string | number
  ) => {
    setDetailUpdates((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    await onSave(productUpdates, detailUpdates);
  };

  return (
    <div className="edit-modal col">
      <h4>Editing Product</h4>
      <div className="mb-2">
        {/* Product Fields */}
        <div className="mb-2">
          <label>Product Name:</label>
          <input
            type="text"
            value={productUpdates.name || ""}
            onChange={(e) => handleProductChange("name", e.target.value)}
            className="form-control mb-2"
            placeholder="Product Name"
          />
        </div>

        <div className="mb-2">
          <label>Price:</label>
          <input
            type="number"
            value={productUpdates.price || ""}
            onChange={(e) =>
              handleProductChange("price", Number(e.target.value))
            }
            className="form-control mb-2"
            placeholder="Price"
          />
        </div>

        <div className="mb-2">
          <label>Type:</label>
          <select
            value={productUpdates.type || ""}
            onChange={(e) => handleProductChange("type", e.target.value)}
            className="form-control mb-2"
          >
            <option value="Tops">Tops</option>
            <option value="Legwear">Legwear</option>
            <option value="Footwear">Footwear</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        {/* Product Details Fields */}
        <div className="mb-2">
          <label>Secondary Name:</label>
          <input
            type="text"
            value={detailUpdates.sec_name || ""}
            onChange={(e) => handleDetailsChange("sec_name", e.target.value)}
            className="form-control mb-2"
            placeholder="Secondary Name"
          />
        </div>

        <div className="mb-2">
          <label>Secondary Type:</label>
          <input
            type="text"
            value={detailUpdates.sec_type || ""}
            onChange={(e) => handleDetailsChange("sec_type", e.target.value)}
            className="form-control mb-2"
            placeholder="Secondary Type"
          />
        </div>

        <div className="mb-2">
          <label>Brand:</label>
          <input
            type="text"
            value={detailUpdates.brand || ""}
            onChange={(e) => handleDetailsChange("brand", e.target.value)}
            className="form-control mb-2"
            placeholder="Brand"
          />
        </div>

        <div className="mb-2">
          <label>Primary Color:</label>
          <select
            value={detailUpdates.primary_color || ""}
            onChange={(e) =>
              handleDetailsChange("primary_color", e.target.value)
            }
            className="form-control mb-2"
          >
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Red">Red</option>
            <option value="Orange">Orange</option>
            <option value="Yellow">Yellow</option>
            <option value="Green">Green</option>
            <option value="Blue">Blue</option>
            <option value="Purple">Purple</option>
            <option value="Pink">Pink</option>
            <option value="Brown">Brown</option>
          </select>
        </div>

        <div className="mb-2">
          <label>Secondary Color:</label>
          <select
            value={detailUpdates.secondary_color || ""}
            onChange={(e) =>
              handleDetailsChange("secondary_color", e.target.value)
            }
            className="form-control mb-2"
          >
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Red">Red</option>
            <option value="Orange">Orange</option>
            <option value="Yellow">Yellow</option>
            <option value="Green">Green</option>
            <option value="Blue">Blue</option>
            <option value="Purple">Purple</option>
            <option value="Pink">Pink</option>
            <option value="Brown">Brown</option>
          </select>
        </div>

        <div className="mb-2">
          <label>Inventory Count:</label>
          <input
            type="number"
            value={detailUpdates.inventory_count || ""}
            onChange={(e) =>
              handleDetailsChange("inventory_count", Number(e.target.value))
            }
            className="form-control mb-2"
            placeholder="Inventory Count"
          />
        </div>

        <div className="mb-2">
          <label>Style:</label>
          <input
            type="text"
            value={detailUpdates.style || ""}
            onChange={(e) => handleDetailsChange("style", e.target.value)}
            className="form-control mb-2"
            placeholder="Style"
          />
        </div>

        <div className="mb-2">
          <label>Description:</label>
          <textarea
            value={detailUpdates.description || ""}
            onChange={(e) => handleDetailsChange("description", e.target.value)}
            className="form-control mb-2"
            placeholder="Description"
          />
        </div>
      </div>

      <div className="col">
        <button className="btn btn-success" onClick={handleSave}>
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
