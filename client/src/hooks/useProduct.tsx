import { ProductPayload, Product } from "../models/Product";
import { api } from "../Api";
import { useState } from "react";

export function useProduct() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const { data: productData } = await api.get<Product[]>("/product");
    setProducts(productData);
  };

  const createProduct = async (productPayload: ProductPayload) => {
    await api.post("/product", productPayload);
  };

  const deleteProduct = async (productId: number) => {
    await api.delete(`/product/${productId}`);
  };

  return {
    products,
    setProducts,
    fetchProducts,
    createProduct,
    deleteProduct,
  };
}
