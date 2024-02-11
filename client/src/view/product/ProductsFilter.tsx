import { ChangeEvent, FormEvent, useState } from "react";
import { useProduct } from "../../controller/hooks/useProduct";
import { ProductFilter } from "../../domain/models/Product";

export function ProductsFilter() {
  const { getProducts } = useProduct();
  const [productFilter, setProductFilter] = useState<ProductFilter>({
    name: null,
    minPrice: null,
    maxPrice: null,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value == "" ? null : event.target.value;
    setProductFilter({
      ...productFilter,
      [event.target.name]: value,
    });
  };

  const handleFilterProducts = (event: FormEvent) => {
    event.preventDefault();
    getProducts(productFilter);
  };

  return (
    <section className="collapse w-100 px-4" id="product-filter">
      <form className="d-flex flex-row align-items-center justify-content-around gap-5">
        <div className="w-100 d-flex flex-column">
          <label htmlFor="name" className="form-label">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={!productFilter.name ? "" : productFilter.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-100 d-flex flex-column">
          <label htmlFor="name" className="form-label">
            Preço Minimo
          </label>
          <input
            type="number"
            className="form-control"
            name="minPrice"
            id="min-price"
            value={!productFilter.minPrice ? "" : productFilter.minPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-100 d-flex flex-column">
          <label htmlFor="name" className="form-label">
            Preço Máximo
          </label>
          <input
            type="number"
            className="form-control"
            name="maxPrice"
            id="max-price"
            value={!productFilter.maxPrice ? "" : productFilter.maxPrice}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-dark align-self-end"
          onClick={handleFilterProducts}
        >
          Buscar
        </button>
      </form>
    </section>
  );
}
