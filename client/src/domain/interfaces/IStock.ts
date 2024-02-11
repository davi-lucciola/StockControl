import { Response } from "../../api/http";
import { Stock, StockPaylod } from "../models/Stock";

export interface IStockService {
  fetchStocks(): Promise<Stock[]>;
  registerStockIn(stockPayload: StockPaylod): Promise<Response>;
  registerStockOut(stockPayload: StockPaylod): Promise<Response>;
}
