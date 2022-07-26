import BurgerIngredient from "./components/BurgerIngredient";
import Header from "./components/Header";
import ProductDescription from "./components/ProductDescription";
import { CartContextProvider } from "./contexts/cart";
import Home from "./pages/Home";

function App() {
  return (
    <CartContextProvider>
      <Home />
    </CartContextProvider>
  );
}

export default App;
