import { Response, api } from "../api";
import { IProductService } from "../interfaces/IProduct";
import { Product, ProductPayload } from "../models/Product";

export class ProductService implements IProductService {
  async fetchProducts(): Promise<Product[]> {
    const { data: productData } = await api.get<Product[]>("/product");
    return productData;
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
