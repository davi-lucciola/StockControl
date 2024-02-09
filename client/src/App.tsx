import { HistoryList } from "./components/HistoryList";
import { ProductsForm } from "./components/ProductsForm";
import { ProductsTable } from "./components/ProductsTable";

export function App() {
  return (
    <>
      <HistoryList />
      <div className="container-fluid w-100 d-flex flex-column p-0">
        <ProductsForm />
        <ProductsTable />
      </div>
    </>
  );
}
