import { Response, api } from "../../api/api";
import { httpStatus } from "../../api/http";
import { IProductService } from "../interfaces/IProduct";
import { Product, ProductFilter, ProductPayload } from "../models/Product";

export class ProductService implements IProductService {
  async fetchProducts(filter: ProductFilter): Promise<Product[]> {
    const { data: productData, status } = await api.get<Product[]>("/product", {
      params: filter,
    });
    return status != httpStatus.NO_CONTENT ? productData : [];
  }

  async createProduct(productPayload: ProductPayload): Promise<Response> {
    const { data } = await api.post<Response>("/product", productPayload);
    return data!;
  }

  async updateProduct(
    productId: number,
    productPayload: ProductPayload,
  ): Promise<Response> {
    const { data } = await api.put<Response>(
      `/product/${productId}`,
      productPayload,
    );

    return data;
  }

  async deleteProduct(productId: number): Promise<Response> {
    const { data } = await api.delete(`/product/${productId}`);
    return data;
  }
}
