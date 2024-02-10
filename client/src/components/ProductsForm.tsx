import { ChangeEvent, FormEvent, useState } from "react";
import { ProductPayload } from "../models/Product";
import { useProduct } from "../hooks/useProduct";

export function ProductsForm() {
  const { createProduct } = useProduct();
  const [productFormData, setProductFormData] = useState<ProductPayload>({
    name: "",
    price: 0.0,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setProductFormData({
      ...productFormData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await createProduct(productFormData);
    setProductFormData({
      name: "",
      price: 0.0,
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="container">
      <div className="container d-flex flex-column gap-5">
        <div className="conteiner d-flex gap-5">
          <div className="w-100 d-flex flex-column">
            <label htmlFor="name" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              onChange={handleInputChange}
              value={productFormData.name}
            />
          </div>
          <div className="w-100 d-flex flex-column">
            <label htmlFor="price" className="form-label">
              Preço
            </label>
            <input
              type="number"
              className="form-control"
              name="price"
              id="price"
              onChange={handleInputChange}
              value={productFormData.price}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-dark">
          Cadastrar
        </button>
      </div>
    </form>
  );
}
