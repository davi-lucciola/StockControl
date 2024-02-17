import { Response } from "../../api/http";
import { Stock, StockFilter, StockPaylod } from "../models/Stock";

export interface IStockService {
  fetchStocks(stockFilter: StockFilter): Promise<Stock[]>;
  registerStockIn(stockPayload: StockPaylod): Promise<Response>;
  registerStockOut(stockPayload: StockPaylod): Promise<Response>;
}
