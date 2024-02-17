export type Stock = {
  id: number;
  product: {
    id: number;
    name: string;
  };
  type: string;
  quantity: number;
  timestamp: number;
};

export type StockFilter = {
  type?: "INPUT" | "OUTPUT";
  minDate?: Date;
  maxDate?: Date;
  productId?: number;
};

export type StockPaylod = {
  quantity?: number;
  productId?: number;
};
