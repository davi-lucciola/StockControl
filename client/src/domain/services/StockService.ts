import { api } from "../../api";
import { AxiosError } from "axios";
import {
  HTTP_STATUS,
  HttpError,
  MessageResponse,
  getHttpError,
} from "../../api/http";
import { IStockService } from "../interfaces/IStock";
import { Stock, StockFilter, StockPaylod } from "../models/Stock";

export class StockService implements IStockService {
  async fetchStocks(stockFilter: StockFilter): Promise<Stock[]> {
    try {
      const { data: stockData, status } = await api.get<Stock[]>(
        "/stock/history",
        {
          params: stockFilter,
        },
      );
      return status != HTTP_STATUS.NO_CONTENT ? stockData : [];
    } catch (error) {
      throw new HttpError("Houve um Erro ao Realizar sua Solicitação.");
    }
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
