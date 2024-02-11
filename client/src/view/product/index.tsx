import { useState } from "react";
import { ProductsForm } from "./ProductsForm";
import { ProductsTable } from "./ProductsTable";
import { useProduct } from "../../controller/hooks/useProduct";
import { FunnelSimple, Package } from "@phosphor-icons/react";
import { ModalOpenButton } from "../components/Modal/ModalOpenButton";
import { MODAL_TYPES } from "../components/Modal/types";
import { ProductsFilter } from "./ProductsFilter";
import { ProductPayload } from "../../domain/models/Product";

export function ProductsList() {
  const { products, deleteProduct, productPayload, setProductPayload } =
    useProduct();
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false);

  const handleOpenUpdateModal = (productPayload: ProductPayload) => {
    console.log(productPayload);
    setProductPayload(productPayload);
  };

  return (
    <>
      <div className="container-fluid w-100 d-flex flex-column p-0">
        <header className="container-fluid d-flex flex-column align-items-center bg-light p-5 gap-4">
          <section
            id="product-actions"
            className="container w-100 d-flex align-center justify-content-between"
          >
            <ModalOpenButton
              type="button"
              targetId={MODAL_TYPES.createProduct}
              className="btn btn-dark d-flex gap-3 align-items-center"
            >
              Adicionar Produto {<Package size={32} />}
            </ModalOpenButton>
            <h1> Controle de Estoque </h1>
            <button
              className="btn btn-dark align-self-start"
              data-bs-toggle="collapse"
              data-bs-target="#product-filter"
              aria-expanded={filterIsOpen}
              aria-controls="product-filter"
              onClick={() => setFilterIsOpen(!filterIsOpen)}
            >
              {<FunnelSimple size={32} />}
            </button>
          </section>
          <ProductsFilter />
        </header>
        <main className="container-fluid p-5">
          <ProductsTable
            products={products}
            onEdit={handleOpenUpdateModal}
            onDelete={deleteProduct}
          />
        </main>
      </div>
      <ProductsForm
        id={MODAL_TYPES.createProduct}
        productPayload={productPayload}
      />
      <ProductsForm
        id={MODAL_TYPES.updateProduct}
        productPayload={productPayload}
      />
    </>
  );
}
