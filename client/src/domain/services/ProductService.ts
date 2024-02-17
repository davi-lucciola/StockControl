import { AxiosError } from "axios";
import { api } from "../../api/api";
import { HttpError } from "../errors/HttpError";
import { IProductService } from "../interfaces/IProduct";
import { Product, ProductFilter, ProductPayload } from "../models/Product";
import { HTTP_STATUS, SuccessResponse, getHttpError } from "../../api/http";

export class ProductService implements IProductService {
  async fetchProducts(filter: ProductFilter): Promise<Product[]> {
    try {
      const { data: productData, status } = await api.get<Product[]>(
        "/product",
        {
          params: filter,
        },
      );
      return status != HTTP_STATUS.NO_CONTENT ? productData : [];
    } catch {
      throw new HttpError("Houve um Erro ao Realizar sua Solicitação.");
    }
  }

  async createProduct(
    productPayload: ProductPayload,
  ): Promise<SuccessResponse> {
    try {
      const { data } = await api.post<SuccessResponse>(
        "/product",
        productPayload,
      );
      return data!;
    } catch (error) {
      if (error instanceof AxiosError) {
        getHttpError(error);
      }
      throw new HttpError("Houve um erro ao realizar a sua solicitação.");
    }
  }

  async updateProduct(
    productId: number,
    productPayload: ProductPayload,
  ): Promise<Response> {
    try {
      const { data } = await api.put<Response>(
        `/product/${productId}`,
        productPayload,
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        getHttpError(error);
      }
      throw new HttpError("Houve um erro ao realizar a sua solicitação.");
    }
  }

  async deleteProduct(productId: number): Promise<Response> {
    try {
      const { data } = await api.delete(`/product/${productId}`);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        getHttpError(error);
      }
      throw new HttpError("Houve um erro ao realizar a sua solicitação.");
    }
  }
}
