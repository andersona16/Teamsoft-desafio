import { FC, useEffect } from "react";
import { useCart } from "../../hooks/cart";
import "./styles.css";

interface IIngredient {
  id: number;
  name: string;
  quantity: number;
}

interface IProduct {
  name: string;
  ingredients: Array<IIngredient>;
}

interface IPopover {
  product: IProduct;
}

const Popover: FC<IPopover> = ({ product }) => {
  const { removeAlert } = useCart();

  useEffect(() => {
    const timeout = setTimeout(() => removeAlert(), 5000);

    return () => clearInterval(timeout);
  }, [removeAlert]);

  return (
    <>
      <div className="popover__container">
        <h1 className="popover__container-title">Adicionado com Sucesso!</h1>
        <div className="popover__container-content">
          <p className="popover__container-subtitle">{product.name}</p>
          <ul className="poppover-orderInformation">
            <span>Ingredientes:</span>
            <li>1 Carne 250gr</li>
            <li>2 Queijo Cheddar</li>
            <li>1 Bacon</li>
            <li>Molho Especial</li>

            <span>Ingredientes adicionais:</span>
            {product.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.quantity} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Popover;
