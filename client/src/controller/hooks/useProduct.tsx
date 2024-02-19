import { ChangeEvent, FormEvent, useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { handleRequest } from "../handlers/handleRequest";

export function useProduct() {
  const {
    products,
    loadProducts,
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
    handleRequest(async () => await createProduct(productPayload));
    setTimeout(
      () =>
        setProductPayload({
          name: "",
          price: 0.0,
        }),
      500,
    );
  };

  const handleUpdateProduct = async (event: FormEvent) => {
    event.preventDefault();
    handleRequest(
      async () =>
        await updateProduct(productPayload.productId!, productPayload),
    );
    setTimeout(
      () =>
        setProductPayload({
          name: "",
          price: 0.0,
        }),
      500,
    );
  };

  const handleDeleteProduct = async (productId: number) => {
    handleRequest(async () => await deleteProduct(productId));
  };

  return {
    products,
    loadProducts,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    handleInputChange,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    productPayload,
    setProductPayload,
  };
}
