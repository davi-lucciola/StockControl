import { useState } from "react";
import { useProduct } from "../hooks/useProduct";
import { ProductsForm } from "./ProductsForm";

type filterData = {
  filterOpen: boolean;
  filterName: string;
  filterMinPrice: number | null;
  filterMaxPrice: number | null;
};

export function ProductsList() {
  const { products, deleteProduct } = useProduct();
  const [filterData, setFilterData] = useState<filterData>({
    filterOpen: false,
    filterName: "",
    filterMinPrice: null,
    filterMaxPrice: null,
  });

  return (
    <div className="container-fluid w-100 d-flex flex-column p-0">
      <header className="container-fluid d-flex flex-column align-items-center bg-light p-4 gap-3">
        <h1> Estoque </h1>
        <ProductsForm />
        <button
          className="btn btn-dark align-self-start w-25"
          data-bs-toggle="collapse"
          data-bs-target="#productFilter"
          aria-expanded={filterData.filterOpen}
          aria-controls="productFilter"
          onClick={() =>
            setFilterData({ ...filterData, filterOpen: !filterData.filterOpen })
          }
        >
          Filtro
        </button>
        <div className="collapse" id="productFilter">
          <form className="d-flex flex-row">
            <div className="w-100 d-flex flex-column">
              <label htmlFor="name" className="form-label">
                Nome
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                // value={filterData.filterName}
              />
            </div>
            <div className="w-100 d-flex flex-column">
              <label htmlFor="name" className="form-label">
                Preço Minimo
              </label>
              <input
                type="number"
                className="form-control"
                name="min-price"
                id="min-price"
                // value={
                //   !filterData.filterMinPrice ? "" : filterData.filterMinPrice
                // }
              />
            </div>
            <div className="w-100 d-flex flex-column">
              <label htmlFor="name" className="form-label">
                Preço Máximo
              </label>
              <input
                type="number"
                className="form-control"
                name="max-price"
                id="max-price"
                // value={
                //   !filterData.filterMaxPrice ? "" : filterData.filterMaxPrice
                // }
              />
            </div>
            {/* <button type="submit" className="btn btn-dark">
              Buscar
            </button> */}
          </form>
        </div>
      </header>
      <main className="p-5">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th className="w-25"> Id </th>
              <th className="w-25"> Nome </th>
              <th className="w-25"> Preço </th>
              <th className="w-25"> Quantidade </th>
              <th> Ações </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.amount}</td>
                  <td className="d-flex justify-content-around ps-4 pe-4 gap-4">
                    <button className="btn btn-secondary">
                      Movimentações{" "}
                    </button>
                    <button className="btn btn-primary">Editar</button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
}
