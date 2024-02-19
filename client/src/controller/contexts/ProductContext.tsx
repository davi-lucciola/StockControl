import { ReactNode, createContext, useEffect, useState } from "react";
import {
  Product,
  ProductFilter,
  ProductPayload,
} from "../../domain/models/Product";
import { IProductService } from "../../domain/interfaces/IProduct";

export type IProductContextData = {
  products: Product[];
  loadProducts: (products: Product[]) => void;
  getProducts: (filter: ProductFilter) => Promise<void>;
  createProduct: (productPayload: ProductPayload) => Promise<string>;
  updateProduct: (
    productId: number,
    productPayload: ProductPayload,
  ) => Promise<string>;
  deleteProduct: (productId: number) => Promise<string>;
  productPayload: ProductPayload;
  setProductPayload: (productPayload: ProductPayload) => void;
};

type ProductContextProviderProps = {
  children: ReactNode;
  productService: IProductService;
};

export const ProductContext = createContext({} as IProductContextData);

export function ProductContextProvider({
  children,
  productService,
}: ProductContextProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [productPayload, setProductPayload] = useState<ProductPayload>({
    name: "",
    price: 0.0,
  });

  const loadProducts = async (productsData: Product[]) => {
    setProducts(productsData);
  };

  const getProducts = async (filter: ProductFilter) => {
    const products = await productService.fetchProducts(filter);
    loadProducts(products);
  };

  const createProduct = async (productPayload: ProductPayload) => {
    productPayload.price = Number(productPayload.price);

    const { detail, createdId } =
      await productService.createProduct(productPayload);
    const productsData = [
      { id: createdId, amount: 0, ...productPayload } as Product,
      ...products,
    ];
    loadProducts(productsData);
    return detail;
  };

  const updateProduct = async (
    productId: number,
    productPayload: ProductPayload,
  ) => {
    productPayload.price = Number(productPayload.price);

    const { detail } = await productService.updateProduct(
      productId,
      productPayload,
    );

    const productUpdated = {
      ...products.find((product) => product.id == productId),
      name: productPayload.name,
      price: productPayload.price,
    } as Product;

    const productsData = [
      productUpdated,
      ...products.filter((product) => product.id != productId),
    ];

    loadProducts(productsData);
    return detail;
  };

  const deleteProduct = async (productId: number) => {
    const { detail } = await productService.deleteProduct(productId);
    const productsData = products.filter((product) => product.id != productId);
    loadProducts(productsData);
    return detail;
  };

  useEffect(() => {
    getProducts({} as ProductFilter);
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loadProducts,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        productPayload,
        setProductPayload,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
