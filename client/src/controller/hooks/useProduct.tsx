import { ChangeEvent, FormEvent, useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";

export function useProduct() {
  const {
    products,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    productPayload,
    setProductPayload,
  } = useContext(ProductContext);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setProductPayload({
      ...productPayload,
      [event.target.name]: value,
    });
  };

  const handleCreateProduct = async (event: FormEvent) => {
    event.preventDefault();
    await createProduct(productPayload);
    setProductPayload({
      name: "",
      price: 0.0,
    });
  };

  const handleUpdateProduct = async (event: FormEvent) => {
    event.preventDefault();
    await updateProduct(productPayload.productId!, productPayload);
    setProductPayload({
      name: "",
      price: 0.0,
    });
  };

  return {
    products,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    handleInputChange,
    handleCreateProduct,
    handleUpdateProduct,
    productPayload,
    setProductPayload,
  };
}
