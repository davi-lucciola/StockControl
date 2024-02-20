import { ChangeEvent, FormEvent, useContext } from "react";
import { StockContext } from "../contexts/StockContext";
import { handleRequest } from "../handlers/handleRequest";
import { getInputValue } from "../../view/components/utils";

export function useStock() {
  const {
    stocks,
    getStocks,
    addStock,
    removeStock,
    stockPayload,
    setStockPayload,
  } = useContext(StockContext);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = getInputValue(event.target);
    setStockPayload({
      ...stockPayload,
      [event.target.name]: value,
    });
  };

  const handleAddStock = async (event: FormEvent) => {
    event.preventDefault();
    await handleRequest(async () => await addStock(stockPayload));
  };

  const handleRemoveStock = async (event: FormEvent) => {
    event.preventDefault();
    await handleRequest(async () => await removeStock(stockPayload));
  };

  return {
    stocks,
    getStocks,
    addStock,
    removeStock,
    handleInputChange,
    handleAddStock,
    handleRemoveStock,
    stockPayload,
    setStockPayload,
  };
}
