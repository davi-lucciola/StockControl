import { useState } from "react";
import { useStock } from "../../controller/hooks/useStock";
// import { StocksForm } from "./StocksForm";
// import { useProduct } from "../../controller/hooks/useProduct";

export function StockList() {
  const { stocks } = useStock();
  const [sideBarOpen, setSideBarOpen] = useState(true);

  return (
    <>
      <div className="vh-100 d-flex flex-row align-items-center">
        <aside
          className={`h-100 collapse show collapse-horizontal bg-dark text-white p-4`}
          id="sidebar"
        >
          <h1 className="fs-3"> Movimentações </h1>
          <hr />
          <ul className="mt-5 d-flex flex-column gap-4" data-bs-spy="scroll">
            {stocks.map((stock) => {
              return (
                <li
                  key={stock.id}
                  className={`d-flex text-white fw-bold card rounded ${
                    stock.type == "INPUT" ? "bg-success" : "bg-danger "
                  }`}
                >
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div className="d-flex flex-column">
                      <p> {stock.product.name} </p>
                      <p className="d-flex gap-4 justify-content-between fw-bold">
                        {new Date(stock.timestamp * 1000).toLocaleString(
                          "pt-BR",
                          {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>
                    <span className="fs-5">
                      {stock.type == "INPUT" ? "+" : "-"}
                      {stock.quantity}
                    </span>
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
      {/* <StocksForm /> */}
    </>
  );
}
