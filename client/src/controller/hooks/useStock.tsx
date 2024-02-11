import { useState } from "react";
import { Stock, StockPaylod } from "../../domain/models/Stock";
import { api } from "../../api/api";

export function useStock() {
  const [stock, setStock] = useState<Stock[]>([]);

  const fetchStocks = async (): Promise<Stock[]> => {
    const { data: stockData } = await api.get<Stock[]>("/stock/history");
    return stockData;
  };

  const registerStockIn = async (
    stockRegister: StockPaylod,
  ): Promise<Response> => {
    const { data } = await api.post<Response>("/stock/in", stockRegister);
    return data;
  };

  const registerStockOut = async (
    stockRegister: StockPaylod,
  ): Promise<Response> => {
    const { data } = await api.delete<Response>("/stock/out", {
      data: stockRegister,
    });
    return data;
  };

  return {
    stock,
    setStock,
    fetchStocks,
    registerStockIn,
    registerStockOut,
  };
}
