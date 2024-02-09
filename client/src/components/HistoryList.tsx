import { useEffect, useState } from "react";
import { Stock } from "../models/Stock";
import { api } from "../Api";

export function HistoryList() {
  const [stock, setStock] = useState<Stock[]>([]);

  const fetchStock = async () => {
    const { data: stockData } = await api.get<Stock[]>("/stock/history");
    setStock(stockData);
  };

  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <>
      <aside className="bg-dark text-white p-4">
        <h1> Movimentações </h1>
        <ul className="mt-5 d-flex flex-column gap-4">
          {stock.map((stock) => {
            return (
              <li
                key={stock.id}
                className={`d-flex justify-content-between p-3 rounded ${
                  stock.type == "INPUT" ? "bg-success" : "bg-danger"
                }`}
              >
                <div className="d-flex fs-5 flex-column justify-content-center w-25">
                  <p> {stock.product} </p>
                  <p>
                    {new Date(stock.timestamp * 1000).toLocaleString("pt-BR", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <p className="w-25 d-flex justify-content-center align-items-center fs-3">
                  {stock.type == "INPUT" ? "+" : "-"} {stock.quantity}
                </p>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
