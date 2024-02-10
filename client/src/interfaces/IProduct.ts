import { Response } from "../api";
import { Product, ProductPayload } from "../models/Product";

export interface IProductService {
  fetchProducts(): Promise<Product[]>;
  createProduct(productPayload: ProductPayload): Promise<Response>;
  updateProduct(
    productId: number,
    productPayload: ProductPayload,
  ): Promise<Response>;
  deleteProduct(productId: number): Promise<Response>;
}

export type IProductContextData = {
  products: Product[];
  loadProducts: (productsData: Product[]) => Promise<void>;
  createProduct: (productPayload: ProductPayload) => Promise<void>;
  updateProduct: (
    productId: number,
    productPayload: ProductPayload,
  ) => Promise<void>;
  deleteProduct: (productId: number) => Promise<void>;
};
