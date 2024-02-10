import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";

export function useProduct() {
  const {
    products,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useContext(ProductContext);

  return {
    products,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
