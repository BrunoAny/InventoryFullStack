import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Core product information
export interface Product {
  id: string;
  name: string;
  price: number;
  type: string;
  image: string;
  is_archived: boolean;
}

// Extended product details
export interface ProductDetails {
  id: string;
  products_id: string;
  sec_name: string;
  sec_type: string;
  brand: string;
  sex: string;
  size: string;
  primary_color: string;
  secondary_color: string;
  style: string;
  inventory_count: number;
  description: string;
}

// Combined type for when you need both (e.g., when fetching joined data)
export interface FullProduct {
  product: Product;
  details: ProductDetails;
}
interface ProductContextType {
  products: FullProduct[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (
    product: Omit<Product, "id">,
    details: ProductDetails
  ) => Promise<void>;
  updateProduct: (
    id: string,
    productUpdates: Partial<Product>,
    detId: string,
    detailUpdates: Partial<ProductDetails>
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<FullProduct[]>([]);
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
        (product: FullProduct) => !product.is_archived
      );
      setProducts(activeProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (
    product: Omit<Product, "id">,
    details: ProductDetails
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/main/products/create",
        {
          data: {
            name: product.name,
            price: product.price,
            type: product.type,
            image: product.image,
          },
          relatedTable: "product_details",
          relatedData: {
            sec_name: details.sec_name,
            sec_type: details.sec_type,
            brand: details.brand,
            sex: details.sex,
            size: details.size,
            primary_color: details.primary_color,
            secondary_color: details.secondary_color,
            inventory_count: details.inventory_count,
            style: details.style,
            description: details.description,
          },
        }
      );
      fetchProducts(); // Refresh the product list after adding
      console.log("Product added:", response.data);
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const updateProduct = async (
    prodId: string,
    productUpdates: Partial<Product>,
    detId: string,
    detailUpdates: Partial<ProductDetails>,
  ) => {
    try {
      console.log("Product updated:", prodId);
      // Update main product table
      if (Object.keys(productUpdates).length > 1) {
        await axios.put(
          `http://localhost:5000/main/products/update/${prodId}`,
          productUpdates
        );
        console.log("Product updated:", detailUpdates.products_id);
      }
      // Update product details
      if (Object.keys(detailUpdates).length > 1) {
        await axios.put(
          `http://localhost:5000/main/product_details/update/${detId}`,
          detailUpdates
        );
      }

      fetchProducts(); // Refresh the product list after update
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axios.put(`http://localhost:5000/main/products/archive/${id}`);
      fetchProducts(); // Refresh the product list after deletion
      console.log("Product deleted:", id);
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
