import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct";

export function ProductsTable() {
  const { products, fetchProducts, deleteProduct } = useProduct();

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId: number) => {
    await deleteProduct(productId);
    fetchProducts();
  };

  return (
    <main className="p-5">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th className="w-25"> Id </th>
            <th className="w-25"> Nome </th>
            <th className="w-25"> Preço </th>
            <th className="w-25"> Quantidade </th>
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
                <td className="d-flex justify-content-around ps-4 pe-4 gap-4">
                  <button className="btn btn-primary">Editar</button>
                  <button className="btn btn-secondary"> Movimentações </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
