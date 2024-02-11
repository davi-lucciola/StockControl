import { HistoryList } from "./view/stock";
import { ProductsList } from "./view/product";
import { ProductContextProvider } from "./controller/contexts/ProductContext";
import { ProductService } from "./domain/services/ProductService";

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
