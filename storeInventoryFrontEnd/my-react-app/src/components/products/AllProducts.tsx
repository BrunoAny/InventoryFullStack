import { useState, useEffect } from "react";
import ProductCard from "./productComps/ProductCard";
import ShowDetails from "./productComps/ShowDetails";
import EditProductForm from "./productComps/EditProductForm";
import axios from "axios";

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
  is_archived: boolean;
}

const AllProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [expandedProductId, setExpandedProductId] = useState<string | null>(
    null
  );
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editFields, setEditFields] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/main/join", {
        id: "null",
        table1: "products",
        table2: "product_details",
        join: "inner",
      });
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

  const toggleDetails = (productId: string) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  const startEditing = (product: Product) => {
    setEditingProductId(product.id);
    setEditFields(product);
  };

  const cancelEditing = () => {
    setEditingProductId(null);
    setEditFields(null);
  };
  const tableSave = async (table: string, id: string, payload: object) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/main/${table}/update/${id}`,
        payload
      );
      return response.data;
    } catch (err) {
      console.error("Table save error:", err);
      throw err;
    }
  };

  const saveEdit = async() => {
    if (!editFields) return;
    console.log('editFields',editFields)
    await tableSave("products", editFields.products_id, {
      name: editFields.name,
      price: editFields.price,
      type: editFields.type,
      image: editFields.image
    });
    await tableSave("product_details", editFields.id, {
      sec_name: editFields.sec_name,
      sec_type: editFields.sec_type,
      brand: editFields.brand,
      primary_color: editFields.primary_color,
      secondary_color: editFields.secondary_color,
      style: editFields.style,
      inventory_count: editFields.inventory_count,
      description: editFields.description
    })
    console.log(editFields)

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === editFields.id ? editFields : product
      )
    );
    cancelEditing();
  };

  const handleFieldChange = (field: string, value: string | number) => {
    if (!editFields) return;
    setEditFields({ ...editFields, [field]: value });
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/main/products/delete/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="allProducts container text-center">
      <h2>All Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container text-center">
          <div className="product-list">
            {products.map((product) => (
              <div className="col mb-2" key={product.products_id}>
                <div className="card">
                  {editingProductId === product.id ? (
                    <EditProductForm
                      editFields={editFields!}
                      onFieldChange={handleFieldChange}
                      onSave={saveEdit}
                      onCancel={cancelEditing}
                      onDelete={() => handleDelete(product.products_id)}
                    />
                  ) : (
                    <>
                      <ProductCard
                        product={product}
                        onEdit={() => startEditing(product)}
                        onClick={() => toggleDetails(product.products_id)}
                        onDetails={() => toggleDetails(product.products_id)}
                      />
                      {expandedProductId === product.products_id && (
                        <div className="details-section">
                          <ShowDetails
                            product={product}
                            onClose={() => setExpandedProductId(null)}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;