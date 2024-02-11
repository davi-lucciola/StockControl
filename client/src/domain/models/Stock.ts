export type Stock = {
  id: number;
  product: string;
  type: string;
  quantity: number;
  timestamp: number;
};

export type StockPaylod = {
  quantity?: number;
  productId?: number;
};
