import { ReactNode, createContext, useEffect, useState } from "react";
import { IProductContextData, IProductService } from "../interfaces/IProduct";
import { Product, ProductPayload } from "../models/Product";

export const ProductContext = createContext({} as IProductContextData);

type ProductContextProviderProps = {
  children: ReactNode;
  productService: IProductService;
};

export function ProductContextProvider({
  children,
  productService,
}: ProductContextProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async (productsData: Product[]) => {
    if (productsData.length == 0) {
      productsData = await productService.fetchProducts();
    }
    setProducts(productsData);
  };

  const createProduct = async (productPayload: ProductPayload) => {
    const { createdId } = await productService.createProduct(productPayload);
    const productsData = [
      { id: createdId, amount: 0, ...productPayload } as Product,
      ...products,
    ];
    loadProducts(productsData);
  };

  const updateProduct = async (
    productId: number,
    productPayload: ProductPayload,
  ) => {
    const { createdId } = await productService.updateProduct(
      productId,
      productPayload,
    );
    const productsData = [
      { id: createdId, amount: 0, ...productPayload } as Product,
      ...products,
    ];
    loadProducts(productsData);
  };

  const deleteProduct = async (productId: number) => {
    await productService.deleteProduct(productId);
    const productsData = products.filter((product) => product.id != productId);
    loadProducts(productsData);
  };

  useEffect(() => {
    loadProducts(products);
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loadProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
