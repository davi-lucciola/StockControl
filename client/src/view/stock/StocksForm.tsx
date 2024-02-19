import { useStock } from "../../controller/hooks/useStock";
import { Modal } from "../components/Modal";
import { ModalCloseButton } from "../components/Modal/ModalCloseButton";
import { Product } from "../../domain/models/Product";
import { StockPaylod } from "../../domain/models/Stock";

type StocksFormProps = {
  id: string;
  product?: Product;
  stockPayload: StockPaylod;
};

export function StocksForm({ id, product, stockPayload }: StocksFormProps) {
  const {
    setStockPayload,
    handleInputChange,
    handleAddStock,
    handleRemoveStock,
  } = useStock();

  const onCloseStockForm = () =>
    setTimeout(
      () =>
        setStockPayload({
          productId: undefined,
          quantity: 0,
        }),
      500,
    );

  return (
    <Modal
      id={id}
      title={`${product ? product.name : ""} - ${stockPayload.type == "INPUT" ? "Entrada" : "Saída"}`}
      onClose={onCloseStockForm}
    >
      <form
        onSubmit={
          stockPayload.type == "INPUT" ? handleAddStock : handleRemoveStock
        }
        autoComplete="off"
      >
        <div className="modal-body">
          <div className="w-100 d-flex flex-column">
            <label htmlFor="name" className="form-label">
              Quantidade
            </label>
            <input
              id="quantity"
              type="number"
              className="form-control"
              name="quantity"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="modal-footer">
          <ModalCloseButton
            onClick={onCloseStockForm}
            type="submit"
            className="btn btn-primary"
          >
            {stockPayload.type == "INPUT" ? "Adicionar" : "Remover"}
          </ModalCloseButton>
        </div>
      </form>
    </Modal>
  );
}
