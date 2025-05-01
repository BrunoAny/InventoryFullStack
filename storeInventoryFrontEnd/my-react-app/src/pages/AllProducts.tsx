import { useState } from "react";
import ProductCard from "../productComps/ProductCard";
import ShowDetails from "../productComps/ShowDetails";
import EditProductForm from "../productComps/EditProductForm";
import { Product, ProductDetails, FullProduct, useProductContext } from "../context/ProductContext";
import { set } from "mongoose";

const AllProducts = () => {
  const { products, loading, updateProduct, deleteProduct } =
    useProductContext();
  const [expandedProductId, setExpandedProductId] = useState<string | null>(
    null
  );
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  
  const [editingProductDetailsId, setEditingProductDetailsId] = useState<string | null>(null);

  const toggleDetails = (productId: string) => {
    setExpandedProductId((prevId) => (prevId === productId ? null : productId));
  };

  const startEditing = ( productDetailsId: string, productId: string,) => {
    setEditingProductDetailsId(productDetailsId);
    console.log("Editing product details:", productDetailsId);
    setEditingProductId(productId);
    console.log("Editing product:", productId);

  };

  const cancelEditing = () => {
    setEditingProductDetailsId(null);
    setEditingProductId(null);
  };

  const saveEdit = async (
    productUpdates: Partial<Product>,
    detailUpdates: Partial<ProductDetails>,
    ) => {
    if (!setEditingProductDetailsId) return;
    console.log("Saving edits for product:", editingProductId , 
    "with details:", editingProductDetailsId
    );
    await updateProduct(
      editingProductId,
      productUpdates,
      editingProductDetailsId,
      detailUpdates
    );

    cancelEditing();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="allProducts container text-center">
      <h2>All Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id}>
            {editingProductDetailsId === product.id ? (
              <EditProductForm
                product={product}
                onSave={saveEdit}
                onCancel={cancelEditing}
                onDelete={() => deleteProduct(product.products_id)}
              />
            ) : (
              <>
                <ProductCard
                  product={product}
                  onEdit={() => startEditing(product.id, product.products_id)}
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
