import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Hamburguer from "../../assets/img/hamburger.png";
import "./styles.css";
import Button from "../Button";
import { FiMinus, FiPlus } from "react-icons/fi";

interface IBurgerIngredient {
  id: string;
}

function BurgerIngredient() {
  const [produto, setProduto] = useState<IBurgerIngredient[]>([]);
  useEffect(() => {
    async function teste() {
      const response = await api.get<IBurgerIngredient[]>("/products");

      console.log(response);
      setProduto(response.data);
    }

    teste();
  }, []);

  return (
    <>
      {produto.map(({ id }) => (
        <section className="ingredient__container" key={id}>
          <div className="ingredient__container--card">
            <article className="ingredient__container-content">
              <div className="ingredient__container-info">
                <h1>Nome ingrediente</h1>
                <p>Preço ingrediente</p>
              </div>

              <div className="ingredient__container-buttons">
                <Button icon={FiMinus}></Button>
                <span>1</span>
                <Button icon={FiPlus}></Button>
              </div>
            </article>
          </div>
        </section>
      ))}
    </>
  );
}

export default BurgerIngredient;
