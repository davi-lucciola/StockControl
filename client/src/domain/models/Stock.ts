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

export type StockType = "INPUT" | "OUTPUT";

export type StockFilter = {
  type?: StockType;
  minDate?: Date;
  maxDate?: Date;
  productId?: number;
};

export type StockPaylod = {
  productId?: number;
  quantity?: number;
  type?: StockType;
};
