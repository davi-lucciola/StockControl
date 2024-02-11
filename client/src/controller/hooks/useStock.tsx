import { useContext } from "react";
import { StockContext } from "../contexts/StockContext";

export function useStock() {
  const {
    stocks,
    getStocks,
    addStock,
    removeStock,
    stockPayload,
    setStockPayload,
  } = useContext(StockContext);

  return {
    stocks,
    getStocks,
    addStock,
    removeStock,
    stockPayload,
    setStockPayload,
  };
}
