import { useEffect, useState } from "react";
import { useStock } from "../../controller/hooks/useStock";
import { Modal } from "../components/Modal";
import { MODAL_TYPES } from "../components/Modal/types";
import { StocksTable } from "./StocksTable";
import { Stock } from "../../domain/models/Stock";

export function StocksForm() {
  const [productStock, setProductStock] = useState<Stock[]>([]);
  const { stockPayload, setStockPayload, getStocks } = useStock();

  // const onOpenStockForm = async () => {
  //   const stocks = await getStocks({ productId: stockPayload.productId });
  //   setProductStock(stocks);
  // };

  const onCloseStockForm = () => {
    setStockPayload({
      productId: undefined,
      quantity: 0,
    });
  };

  return (
    <Modal
      id={MODAL_TYPES.detailProductStock}
      className="modal-xl"
      title={`Movimentações`}
      onClose={onCloseStockForm}
    >
      <div className="container modal-body p-5">
        <StocksTable stocks={productStock} />
      </div>
    </Modal>
  );
}
