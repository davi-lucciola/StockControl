import { MessageResponse, SuccessResponse } from "../../api/http";
import { Product, ProductFilter, ProductPayload } from "../models/Product";

export interface IProductService {
  fetchProducts(filter: ProductFilter): Promise<Product[]>;
  createProduct(productPayload: ProductPayload): Promise<SuccessResponse>;
  updateProduct(
    productId: number,
    productPayload: ProductPayload,
  ): Promise<MessageResponse>;
  deleteProduct(productId: number): Promise<MessageResponse>;
}
