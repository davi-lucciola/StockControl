import { ChangeEvent, FormEvent, useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { HttpError, HttpWarning } from "../../domain/errors/HttpError";
import { toast } from "react-toastify";

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
    try {
      const detail = await createProduct(productPayload);
      console.log(detail);
      toast.success(detail);
    } catch (error) {
      if (error instanceof HttpWarning) {
        toast.warn(error.message);
      } else if (error instanceof HttpError) {
        toast.error(error.message);
      } else {
        toast.error("Houve um erro ao realizar sua solicitação.");
      }
    }
    setProductPayload({
      name: "",
      price: 0.0,
    });
  };

  const handleUpdateProduct = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const detail = await updateProduct(
        productPayload.productId!,
        productPayload,
      );
      toast.success(detail);
    } catch (error) {
      if (error instanceof HttpWarning) {
        toast.warn(error.message);
      } else if (error instanceof HttpError) {
        toast.error(error.message);
      } else {
        toast.error("Houve um erro ao realizar sua solicitação.");
      }
    }
    setProductPayload({
      name: "",
      price: 0.0,
    });
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      const detail = await deleteProduct(productId);
      toast.success(detail);
    } catch (error) {
      if (error instanceof HttpWarning) {
        toast.warn(error.message);
      } else if (error instanceof HttpError) {
        toast.error(error.message);
      } else {
        toast.error("Houve um erro ao realizar sua solicitação.");
      }
    }
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
    handleDeleteProduct,
    productPayload,
    setProductPayload,
  };
}
