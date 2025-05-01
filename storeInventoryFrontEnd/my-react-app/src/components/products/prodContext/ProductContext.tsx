// ProductContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
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

interface ProductContextType {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: string, updatedFields: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

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
        (product: Product) => !product.is_archived
      );
      setProducts(activeProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, "id">) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/main/products/create",
        {
          data: {
            name: product.name,
            price: product.price,
            type: product.type,
          },
          relatedTable: "product_details",
          relatedData: {
            sec_name: product.sec_name,
            sec_type: product.sec_type,
            brand: product.brand,
            primary_color: product.primary_color,
            secondary_color: product.secondary_color,
            inventory_count: product.inventory_count,
            style: product.style,
            description: product.description,
          },
        }
      );
      setProducts((prev) => [...prev, response.data]);
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    try {
      await axios.put(
        `http://localhost:5000/main/products/update/${id}`,
        updatedFields
      );
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, ...updatedFields } : product
        )
      );
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/main/products/delete/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProductContext must be used within a ProductProvider");
  return context;
};

export default ProductContext; 