import { Stock } from "../../domain/models/Stock";

type StocksTableProps = {
  stocks: Stock[];
};

export function StocksTable({ stocks }: StocksTableProps) {
  return (
    <table className="container table table-striped table-bordered table-hover">
      <thead>
        <th className="p-2"> Id </th>
        <th className="p-2"> Produto </th>
        <th className="p-2"> Tipo Movimentação </th>
        <th className="p-2"> Quantidade </th>
        <th className="p-2"> Data / Hora </th>
      </thead>
      <tbody>
        {stocks.map((stock) => {
          return (
            <tr>
              <td>{stock.id}</td>
              <td>{stock.product.name}</td>
              <td>{stock.type}</td>
              <td>{stock.quantity}</td>
              <td>
                {new Date(stock.timestamp * 1000).toLocaleString("pt-BR", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
