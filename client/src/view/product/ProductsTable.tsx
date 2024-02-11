import { Product, ProductPayload } from "../../domain/models/Product";
import { ModalOpenButton } from "../components/Modal/ModalOpenButton";
import { MODAL_TYPES } from "../components/Modal/types";

type ProductsTableData = {
  products: Product[];
  onEdit: (productPayload: ProductPayload) => void;
  onDetailStock?: (productId: number) => void;
  onDelete: (productId: number) => Promise<void>;
};

export function ProductsTable({
  products,
  onDelete,
  onEdit,
}: ProductsTableData) {
  return (
    <table className="container table table-striped table-bordered table-hover">
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
              <td className="d-flex justify-content-around gap-4">
                <button className="btn btn-secondary">Movimentações </button>
                <ModalOpenButton
                  type="button"
                  targetId={MODAL_TYPES.updateProduct}
                  className="btn btn-primary"
                  onClick={() =>
                    onEdit({
                      productId: product.id,
                      name: product.name,
                      price: product.price,
                    })
                  }
                >
                  Editar
                </ModalOpenButton>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(product.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
