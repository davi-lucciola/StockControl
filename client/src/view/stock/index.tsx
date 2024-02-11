import { useEffect, useState } from "react";
import { useStock } from "../../controller/hooks/useStock";

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
        className={`h-100 collapse show collapse-horizontal bg-dark text-white p-4`}
        id="sidebar"
      >
        <h1 className="fs-3"> Movimentações </h1>
        <ul className="mt-5 d-flex flex-column gap-4" data-bs-spy="scroll">
          {stock.map((stock) => {
            return (
              <li
                key={stock.id}
                className={`d-flex card rounded ${
                  stock.type == "INPUT"
                    ? "bg-white text-dark"
                    : "bg-secondary text-white"
                }`}
              >
                <div className="card-body d-flex flex-column justify-content-center">
                  <p> {stock.product} </p>
                  <p className="d-flex gap-4 justify-content-between fw-bold">
                    {new Date(stock.timestamp * 1000).toLocaleString("pt-BR", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}
                    <span
                      className={`border-bottom border-4 ${
                        stock.type == "INPUT"
                          ? "text-success border-success"
                          : "text-danger border-danger"
                      }`}
                    >
                      {stock.type == "INPUT" ? "+" : "-"}
                      {stock.quantity.toPrecision(2)}
                    </span>
                  </p>
                </div>
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
