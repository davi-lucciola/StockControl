import { useEffect, useState } from "react";
import { useStock } from "../hooks/useStock";

export function HistoryList() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const { stock, setStock, fetchStocks } = useStock();

  const loadStock = async () => {
    const stocks = await fetchStocks();
    setStock(stocks);
  };

  useEffect(() => {
    loadStock();
  }, []);

  return (
    <div className="vh-100 d-flex flex-row align-items-center">
      <aside
        className="h-100 collapse show collapse-horizontal bg-dark text-white p-4"
        id="sidebar"
      >
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
      <button
        className="h-100 btn btn-dark rounded-0 text-uppercase fs-4"
        data-bs-toggle="collapse"
        data-bs-target="#sidebar"
        aria-controls="sidebar"
        aria-expanded={sideBarOpen}
        onClick={() => setSideBarOpen(!sideBarOpen)}
      >
        {sideBarOpen ? "<" : ">"}
      </button>
    </div>
  );
}
