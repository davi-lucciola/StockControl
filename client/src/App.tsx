import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { api } from "./Api";

type TStock = {
  id: number;
  product: string;
  type: string;
  quantity: number;
  timestamp: number;
};

type TProduct = {
  id: number;
  name: string;
  price: number;
  amount: number;
};

type TProductFormData = {
  name: string;
  price: number;
};

export function App() {
  const [stock, setStock] = useState<TStock[]>([]);
  const [products, setProducts] = useState<TProduct[]>([]);
  const [productFormData, setProductFormData] = useState<TProductFormData>({
    name: "",
    price: 0.0,
  });

  const fetchProducts = async () => {
    const productsData = await api
      .get<TProduct[]>("/product")
      .then((response) => response.data);
    setProducts(productsData);
  };

  const fetchStock = async () => {
    const stockData = await api
      .get<TStock[]>("/stock/history")
      .then((response) => response.data);
    setStock(stockData);
  };

  useEffect(() => {
    fetchProducts();
    fetchStock();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setProductFormData({
      ...productFormData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await api.post("/product", productFormData);
    fetchProducts();
    setProductFormData({
      name: "",
      price: 0.0,
    });
    console.log(productFormData);
  };

  return (
    <>
      <aside className="bg-dark text-white p-4">
        <h1> Movimentações </h1>
        <ul className="mt-5 d-flex flex-column gap-4">
          {stock.map((stock) => {
            console.log(stock.type);
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
                    {" "}
                    {new Date(stock.timestamp).toLocaleString("pt-BR", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}{" "}
                  </p>
                </div>
                <p className="w-25 d-flex justify-content-center align-items-center fs-3">
                  {" "}
                  {stock.type == "INPUT" ? "+" : "-"} {stock.quantity}{" "}
                </p>
              </li>
            );
          })}
        </ul>
      </aside>
      <div className="container-fluid w-100 d-flex flex-column p-0">
        <header className="container-fluid d-flex flex-column align-items-center bg-light p-4">
          <h1> Estoque </h1>
          <form onSubmit={handleFormSubmit} className="container">
            <div className="container d-flex flex-column gap-5">
              <div className="conteiner d-flex gap-5">
                <div className="w-100 d-flex flex-column">
                  <label htmlFor="name" className="form-label">
                    {" "}
                    Nome{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    onChange={handleInputChange}
                    value={productFormData.name}
                  />
                </div>
                <div className="w-100 d-flex flex-column">
                  <label htmlFor="price" className="form-label">
                    {" "}
                    Preço{" "}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    id="price"
                    onChange={handleInputChange}
                    value={productFormData.price}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-dark">
                {" "}
                Cadastrar{" "}
              </button>
            </div>
          </form>
        </header>
        <main className="p-5">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th> Id </th>
                <th> Nome </th>
                <th> Preço </th>
                <th> Quantidade </th>
                <th> Ações </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.amount}</td>
                    <td className="d-flex justify-content-around">
                      <button
                        className="btn btn-danger rounded-circle justify-content-center align-items-center"
                        style={{ height: "40 px", width: "40 px" }}
                      >
                        -
                      </button>
                      <button
                        className="btn btn-success rounded-circle"
                        style={{ height: "40 px", width: "40 px" }}
                      >
                        +
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
}
