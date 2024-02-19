import { MessageResponse } from "../../api/http";
import { Stock, StockFilter, StockPaylod } from "../models/Stock";

export interface IStockService {
  fetchStocks(stockFilter: StockFilter): Promise<Stock[]>;
  registerStockIn(stockPayload: StockPaylod): Promise<MessageResponse>;
  registerStockOut(stockPayload: StockPaylod): Promise<MessageResponse>;
}
