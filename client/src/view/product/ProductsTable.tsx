import { TrashSimple, PencilSimple, Plus, Minus } from "@phosphor-icons/react";
import { Product, ProductPayload } from "../../domain/models/Product";
import { ModalOpenButton } from "../components/Modal/ModalOpenButton";
import { MODAL_TYPES } from "../components/Modal/types";
import { StockType } from "../../domain/models/Stock";

type ProductsTableData = {
  products: Product[];
  onEdit: (productPayload: ProductPayload) => void;
  onDelete: (productId: number) => Promise<void>;
  onChangeStock: (productId: number, input: StockType) => void;
};

export function ProductsTable({
  products,
  onEdit,
  onDelete,
  onChangeStock,
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
              <td>
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
              <td>{product.amount}</td>
              <td className="d-flex justify-content-around gap-2">
                <ModalOpenButton
                  type="button"
                  targetId={MODAL_TYPES.changeStockForm}
                  className="btn btn-secondary d-flex align-items-center justify-content-center p-2"
                  onClick={() => {
                    onChangeStock(product.id, "OUTPUT");
                  }}
                >
                  <Minus size={20} />
                </ModalOpenButton>
                <ModalOpenButton
                  type="button"
                  targetId={MODAL_TYPES.changeStockForm}
                  className="btn btn-secondary d-flex align-items-center justify-content-center p-2"
                  onClick={() => onChangeStock(product.id, "INPUT")}
                >
                  <Plus size={20} />
                </ModalOpenButton>
                <ModalOpenButton
                  type="button"
                  targetId={MODAL_TYPES.productForm}
                  className="btn btn-primary d-flex align-items-center justify-content-center p-2"
                  onClick={() =>
                    onEdit({
                      productId: product.id,
                      name: product.name,
                      price: product.price,
                    })
                  }
                >
                  <PencilSimple size={20} />
                </ModalOpenButton>
                <button
                  className="btn btn-danger d-flex align-items-center justify-content-center p-2"
                  onClick={() => onDelete(product.id)}
                >
                  <TrashSimple size={20} />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
