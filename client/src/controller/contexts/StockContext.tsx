import { ReactNode, createContext, useEffect, useState } from "react";
import { Stock, StockFilter, StockPaylod } from "../../domain/models/Stock";
import { IStockService } from "../../domain/interfaces/IStock";
import { useProduct } from "../hooks/useProduct";

export type StockContextData = {
  stocks: Stock[];
  getStocks: (stockFilter?: StockFilter) => Promise<void>;
  addStock(stockPayload: StockPaylod): Promise<string>;
  removeStock(stockPayload: StockPaylod): Promise<string>;
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
  const { products, loadProducts, deleteProduct } = useProduct();
  const [stockPayload, setStockPayload] = useState<StockPaylod>({
    productId: undefined,
    quantity: undefined,
    type: undefined,
  });

  const loadStocks = async (stockData: Stock[]) => {
    setStocks(stockData);
  };

  const getStocks = async (stockFilter: StockFilter = {}) => {
    const stocksData = await stockService.fetchStocks(stockFilter);
    loadStocks(stocksData.reverse());
  };

  const addStock = async (stockPayload: StockPaylod) => {
    const { detail } = await stockService.registerStockIn(stockPayload);

    const product = products.find(
      (product) => product.id == stockPayload.productId,
    )!;

    product.amount += stockPayload.quantity!;

    loadProducts([
      product,
      ...products.filter((product) => product.id != stockPayload.productId),
    ]);

    return detail;
  };

  const removeStock = async (stockPayload: StockPaylod) => {
    const { detail } = await stockService.registerStockOut(stockPayload);

    const product = products.find(
      (product) => product.id == stockPayload.productId,
    )!;

    product.amount -= stockPayload.quantity!;

    loadProducts([
      product,
      ...products.filter((product) => product.id != stockPayload.productId),
    ]);

    return detail;
  };

  useEffect(() => {
    getStocks();
  }, [deleteProduct, addStock, removeStock]);

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
