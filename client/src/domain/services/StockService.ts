import { api } from "../../api";
import { AxiosError } from "axios";
import { HttpError, MessageResponse, getHttpError } from "../../api/http";
import { IStockService } from "../interfaces/IStock";
import { Stock, StockFilter, StockPaylod } from "../models/Stock";

export class StockService implements IStockService {
  async fetchStocks(stockFilter: StockFilter): Promise<Stock[]> {
    const { data: stockData } = await api.get<Stock[]>("/stock/history", {
      params: stockFilter,
    });
    return stockData;
  }

  async registerStockIn(stockPayload: StockPaylod): Promise<MessageResponse> {
    delete stockPayload.type;
    try {
      const { data } = await api.post<MessageResponse>(
        "/stock/in",
        stockPayload,
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        getHttpError(error);
      }
      throw new HttpError("Houve um erro ao realizar a sua solicitação.");
    }
  }

  async registerStockOut(stockPayload: StockPaylod): Promise<MessageResponse> {
    delete stockPayload.type;
    try {
      const { data } = await api.delete<MessageResponse>("/stock/out", {
        data: stockPayload,
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        getHttpError(error);
      }
      throw new HttpError("Houve um erro ao realizar a sua solicitação.");
    }
  }
}
