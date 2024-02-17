import { api } from "../../api/api";
import { Response } from "../../api/http";
import { IStockService } from "../interfaces/IStock";
import { Stock, StockFilter, StockPaylod } from "../models/Stock";

export class StockService implements IStockService {
  async fetchStocks(stockFilter: StockFilter): Promise<Stock[]> {
    const { data: stockData } = await api.get<Stock[]>("/stock/history", {
      params: stockFilter,
    });
    return stockData;
  }

  async registerStockIn(stockPayload: StockPaylod): Promise<Response> {
    const { data } = await api.post<Response>("/stock/in", stockPayload);
    return data;
  }

  async registerStockOut(stockPayload: StockPaylod): Promise<Response> {
    const { data } = await api.delete<Response>("/stock/out", {
      data: stockPayload,
    });
    return data;
  }
}
