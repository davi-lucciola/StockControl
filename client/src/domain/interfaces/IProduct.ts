import { Response } from "../../api/http";
import { Product, ProductFilter, ProductPayload } from "../models/Product";

export interface IProductService {
  fetchProducts(filter: ProductFilter): Promise<Product[]>;
  createProduct(productPayload: ProductPayload): Promise<Response>;
  updateProduct(
    productId: number,
    productPayload: ProductPayload,
  ): Promise<Response>;
  deleteProduct(productId: number): Promise<Response>;
}
