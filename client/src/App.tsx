import { HistoryList } from "./components/HistoryList";
import { ProductsList } from "./components/ProductsList";
import { ProductContextProvider } from "./contexts/ProductContext";
import { ProductService } from "./services/ProductService";

export function App() {
  return (
    <>
      <HistoryList />
      <ProductContextProvider productService={new ProductService()}>
        <ProductsList />
      </ProductContextProvider>
    </>
  );
}
