import { ReactNode, createContext, useEffect, useState } from "react";
import { Stock, StockPaylod } from "../../domain/models/Stock";
import { IStockService } from "../../domain/interfaces/IStock";

export type StockContextData = {
  stocks: Stock[];
  getStocks: () => Promise<void>;
  addStock(stockPayload: StockPaylod): Promise<void>;
  removeStock(stockPayload: StockPaylod): Promise<void>;
  stockPayload: StockPaylod;
  setStockPayload: (stockPayload: StockPaylod) => void;
};

type StockContextProps = {
  children: ReactNode;
  stockService: IStockService;
};

export const StockContext = createContext({} as StockContextData);

export function StockContextProvider({
  children,
  stockService,
}: StockContextProps) {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [stockPayload, setStockPayload] = useState<StockPaylod>({
    productId: undefined,
    quantity: undefined,
  });

  const loadStocks = async (stockData: Stock[]) => {
    setStocks(stockData);
  };

  const getStocks = async () => {
    const stocksData = await stockService.fetchStocks();
    loadStocks(stocksData);
  };

  const addStock = async (stockPayload: StockPaylod) => {
    await stockService.registerStockIn(stockPayload);
  };

  const removeStock = async (stockPayload: StockPaylod) => {
    await stockService.registerStockOut(stockPayload);
  };

  useEffect(() => {
    getStocks();
  }, []);

  return (
    <StockContext.Provider
      value={{
        stocks,
        getStocks,
        addStock,
        removeStock,
        stockPayload,
        setStockPayload,
      }}
    >
      {children}
    </StockContext.Provider>
  );
}
