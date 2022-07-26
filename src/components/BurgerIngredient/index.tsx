import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../../services/api";
import "./styles.css";
import Button from "../Button";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IProduct } from "../../types/interface";
import { TailSpin } from 'react-loader-spinner';
import { useCart } from "../../hooks/cart";

function BurgerIngredient({ min = 0 }) {
  const [count, setCount] = useState(0);
  const [produto, setProduto] = useState<IProduct>();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const { addItem } = useCart();

  useEffect(() => {
    async function LoadBurgerIngredient() {
      const response = await api.get<IProduct[]>("/products");

      setProduto(response.data[0]);
    }

    LoadBurgerIngredient();
  }, []);

  const disabledIncrementButton = useMemo(() => {
    if (!quantities) {
      return false;
    }

    const totalQuantities = Object.entries(quantities).reduce((acc, [_, value]) => {
      return acc + value;
    }, 0);

    return totalQuantities === 8;
  }, [quantities]);

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

  const handleAddItem = useCallback(() => {
    if (!produto) {
      return;
    }

    const groupOfIngredients = produto.ingredients[0];

    const parsedQuantities = groupOfIngredients.itens.map((item) => {
      const ingredientQuantity = quantities[item.nm_item];

      return {
        id: item.id,
        name: item.nm_item,
        value: item.vl_item,
        quantity: ingredientQuantity || 0,
      }
    }).filter(item => item.quantity !== 0);

    if (count > 1) {
      const items = Array.from(Array(count).keys()).map(() => ({
        name: produto.nm_product,
        id: produto.id,
        ingredients: parsedQuantities,
      }));

      addItem(items);

      return;
    }

    addItem({
      name: produto.nm_product,
      id: produto.id,
      ingredients: parsedQuantities,
    });
  }, [addItem, produto, quantities, count]);

  return (
    <>
      <section className="section__ingredient">
        {!produto ? (
          <div className="section__loader">
            <span>Carregando os dados da API</span>
            <TailSpin
              width={20}
              height={20}
              color="#F09035"
              wrapperStyle={{ marginTop: '5px' }}
            />
          </div>
        ) : (
          <div className="ingredient__container" key={produto.id}>
            <div className="ingredient__container-card">
              <div className="ingredient__container-info">
                <h1>Adicionar Ingredientes</h1>
                <span>Até 8 ingredientes.</span>
              </div>

              <div>
                <div className="order__information">
                  {produto.ingredients[0].itens.map((item) => (
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
                            disabled={quantities[item.nm_item] === 0}
                          />

                          <input
                            defaultValue={quantities[item.nm_item] || 0}
                            key={quantities[item.nm_item]}
                          />

                          <Button
                            disabled={disabledIncrementButton}
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
                  <input type="number" onChange={userTyped} defaultValue={count} key={count} />
                  <Button onClick={increment} icon={FiPlus}></Button>
                </div>

                <Button
                  onClick={handleAddItem}
                  disabled={count === 0}
                >
                  Adicionar
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default BurgerIngredient;
