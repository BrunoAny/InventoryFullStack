import { useState, useEffect } from "react";
import ProductCard from "./productComps/ProductCard";
import EditProductForm from "./productComps/EditProductForm";
import axios from "axios";
import OneProduct from "./OneProduct";

interface Product {
  name: string;
  price: number;
  type: string;
  image: string;
  id: string;
  is_archived: boolean;
}
const AllProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editFields, setEditFields] = useState({
    name: "",
    price: 0,
    type: "",
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:5000/main/products/all"
      );
      const activeProducts = data.filter(
        (product: Product) => product.is_archived === false
      );
      setProducts(activeProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (productId: string) => {
    const productToEdit = products.find((product) => product.id === productId);
    if (productToEdit) {
      setEditingProduct(productId);
      setEditFields({
        name: productToEdit.name,
        price: productToEdit.price,
        type: productToEdit.type,
      });
    }
  };

  const handleFieldChange = (field: string, value: string | number) =>
    setEditFields((prev) => ({ ...prev, [field]: value }));

  const saveProductUpdates = async () => {
    try {
      await axios.put(
        `http://localhost:5000/main/products/update/${editingProduct}`,
        editFields
      );
      setEditingProduct(null);
      await fetchProducts(); // Refresh products
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const handleDelete = async (productId: string, productName: string) => {
    confirm("Are you sure you want to delete this product?") &&
      deleteProduct(productId, productName);
  };
  const deleteProduct = async (productId: string, productName: string) => {
    try {
      setEditingProduct(null);
      await axios.put(
        `http://localhost:5000/main/products/update/${productId}`,
        { is_archived: true, name: `Archived ${productName}` }
      );
      await fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="allProducts container text-center">
      <h2>All Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="products-list container text-center">
          <div className="row">
            {products.map((product) =>
              editingProduct === product.id ? (
                <EditProductForm
                  key={product.id}
                  editFields={editFields}
                  onFieldChange={handleFieldChange}
                  onSave={saveProductUpdates}
                  onCancel={() => setEditingProduct(null)}
                  onDelete={() => handleDelete(product.id, product.name)}
                />
              ) : (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => console.log("View product details")}
                  onEdit={() => handleEditClick(product.id)}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
