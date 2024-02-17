import { StockList } from "./view/stock";
import { ProductsList } from "./view/product";
import { ProductContextProvider } from "./controller/contexts/ProductContext";
import { ProductService } from "./domain/services/ProductService";
import { StockContextProvider } from "./controller/contexts/StockContext";
import { StockService } from "./domain/services/StockService";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

export function App() {
  return (
    <>
      <StockContextProvider stockService={new StockService()}>
        <StockList />
        <ProductContextProvider productService={new ProductService()}>
          <ProductsList />
        </ProductContextProvider>
      </StockContextProvider>
      <ToastContainer />
    </>
  );
}
