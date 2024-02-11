export type Product = {
  id: number;
  name: string;
  price: number;
  amount: number;
};

export type ProductFilter = {
  name: string | null;
  minPrice: number | null;
  maxPrice: number | null;
};

export type ProductPayload = {
  productId?: number;
  name?: string;
  price?: number;
};
