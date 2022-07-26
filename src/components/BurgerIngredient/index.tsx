import { useEffect, useState } from "react";
import { api } from "../../services/api";
import "./styles.css";
import Button from "../Button";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IBurgerIngredient } from "../../types/interface";
import Popover from "../Popover";

function BurgerIngredient({ min = 0 }) {
  const [count, setCount] = useState(0);
  const [produto, setProduto] = useState<IBurgerIngredient[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    async function LoadBurgerIngredient() {
      const response = await api.get<IBurgerIngredient[]>("/products");

      setProduto(response.data);
    }

    LoadBurgerIngredient();
  }, []);

  function increment() {
    setCount(count + 1);
  }
  function decrement() {
    setCount(count !== min ? count - 1 : 0);
  }

  function userTyped(event: any) {
    !isNaN(event.target.value) && setCount(+event.target.value);
  }

  function handleProductIngredientsQuantityIncrement(
    path: string,
    value: number
  ) {
    setQuantities((oldState) => {
      const updatedState: Record<string, number> = {};
      Object.assign(updatedState, oldState);
      Object.assign(updatedState, { [path]: value + 1 });
      return updatedState;
    });
  }

  function handleProductIngredientsQuantityDecrement(
    path: string,
    value: number
  ) {
    if (value === 0) return;
    setQuantities((oldState) => {
      const updatedState: Record<string, number> = {};
      Object.assign(updatedState, oldState);
      Object.assign(updatedState, { [path]: value - 1 });
      return updatedState;
    });
  }

  return (
    <>
      <section className="section__ingredient">
        {produto.map(({ id, ingredients }) => (
          <div className="ingredient__container" key={id}>
            <div className="ingredient__container-card">
              <div className="ingredient__container-info">
                <h1>Adicionar Ingredientes</h1>
                <span>Até 8 ingredientes.</span>
              </div>

              <div>
                <div className="order__information">
                  {ingredients[0].itens.map((item) => (
                    <div key={item.id} className="additional">
                      <div className="additional__content">
                        <div className="additional__title">
                          <h1>{item.nm_item}</h1>

                          <span>
                            + R${item.vl_item.toFixed(2).replace(".", ",")}
                          </span>
                        </div>
                        <div className="additional__buttons">
                          <Button
                            onClick={() =>
                              handleProductIngredientsQuantityDecrement(
                                item.nm_item,
                                quantities[item.nm_item] || 0
                              )
                            }
                            icon={FiMinus}
                          />

                          <input placeholder="0" defaultValue={quantities[item.nm_item]} />

                          <Button
                            disabled={quantities[item.nm_item] === 0}
                            onClick={() =>
                              handleProductIngredientsQuantityIncrement(
                                item.nm_item,
                                quantities[item.nm_item] || 0
                              )
                            }
                            icon={FiPlus}
                          />
                        </div>
                      </div>
                      <hr className="additional__line" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="singleOption">
                <h1>Precisa de Talher?</h1>
                <div className="singleOption-options">
                  <div>
                    <span>Não</span>
                    <input name="sim" type="radio" value="Nao" />
                  </div>
                  <div>
                    <span>Sim</span>
                    <input name="sim" type="radio" value="Sim" />
                  </div>
                </div>
              </div>
              <div className="ingredient__submit">
                <div className="additional__buttons">
                  <Button onClick={decrement} icon={FiMinus}></Button>
                  <input type="number" onChange={userTyped} value={count} />
                  <Button onClick={increment} icon={FiPlus}></Button>
                </div>

                <Button>Adicionar</Button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default BurgerIngredient;
