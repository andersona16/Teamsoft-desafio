import BurgerIngredient from "../../components/BurgerIngredient";
import Header from "../../components/Header";
import ProductDescription from "../../components/ProductDescription";
import "./styles.css";

function Home() {
  return (
    <>
      <Header />
      <main className="main">
        <ProductDescription />
        <BurgerIngredient />
      </main>
    </>
  );
}

export default Home;
