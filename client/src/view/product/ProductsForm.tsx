import { ProductPayload } from "../../domain/models/Product";
import { useProduct } from "../../controller/hooks/useProduct";
import { Modal } from "../components/Modal";
import { BaseProps } from "../components/BaseProps";
import { ModalCloseButton } from "../components/Modal/ModalCloseButton";

type ProductsFormProps = BaseProps & {
  productPayload: ProductPayload;
};

export function ProductsForm({
  id,
  className,
  productPayload,
}: ProductsFormProps) {
  const {
    handleInputChange,
    handleCreateProduct,
    handleUpdateProduct,
    setProductPayload,
  } = useProduct();

  const onCloseProductForm = () =>
    setTimeout(
      () =>
        setProductPayload({
          productId: undefined,
          name: "",
          price: 0.0,
        }),
      500,
    );

  return (
    <Modal
      id={id}
      title={!productPayload.productId ? "Cadastrar Produto" : "Editar Produto"}
      className={className}
      onClose={onCloseProductForm}
    >
      <form
        autoComplete="off"
        onSubmit={
          productPayload.productId ? handleUpdateProduct : handleCreateProduct
        }
        className="container"
      >
        <div className="modal-body">
          <div className="container d-flex flex-column gap-3 p-4">
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
                value={productPayload.name}
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
                value={productPayload.price}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <ModalCloseButton
            onClick={onCloseProductForm}
            type="submit"
            className="btn btn-primary"
          >
            Salvar
          </ModalCloseButton>
        </div>
      </form>
    </Modal>
  );
}
