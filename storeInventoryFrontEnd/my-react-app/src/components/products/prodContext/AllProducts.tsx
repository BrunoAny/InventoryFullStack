// AllProducts.tsx
import { useState } from "react";
import { useProductContext } from "./ProductContext";
import ProductCard from "../productComps/ProductCard";
import ShowDetails from "../productComps/ShowDetails";
import EditProductForm from "../productComps/EditProductForm";

const AllProducts = () => {
  const { products, loading, updateProduct, deleteProduct } =
    useProductContext();
  const [expandedProductId, setExpandedProductId] = useState<string | null>(
    null
  );
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const toggleDetails = (productId: string) => {
    setExpandedProductId((prevId) => (prevId === productId ? null : productId));
  };

  const startEditing = (productId: string) => {
    setEditingProductId(productId);
  };

  const cancelEditing = () => {
    setEditingProductId(null);
  };

  const saveEdit = async (updatedFields: Partial<Product>) => {
    if (!editingProductId) return;
    await updateProduct(editingProductId, updatedFields);
    cancelEditing();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="allProducts container text-center">
      <h2>All Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id}>
            {editingProductId === product.id ? (
              <EditProductForm
                product={product}
                onSave={saveEdit}
                onCancel={cancelEditing}
                onDelete={() => deleteProduct(product.id)}
              />
            ) : (
              <>
                <ProductCard
                  product={product}
                  onEdit={() => startEditing(product.id)}
                  onClick={() => toggleDetails(product.id)}
                />
                {expandedProductId === product.id && (
                  <ShowDetails
                    product={product}
                    onClose={() => setExpandedProductId(null)}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
