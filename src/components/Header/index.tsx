import Logo from "../../assets/img/logo-Deliverize.png";
import ShoppingCart from "../../assets/img/shopping_cart.svg";
import Account from "../../assets/img/account.svg";
import Arrow from "../../assets/img/arrow.svg";
import "./styles.css";
import Button from "../Button";
import { Input } from "../Input";
import Popover from "../Popover";
import { useCart } from "../../hooks/cart";

function Header() {
  const { alert, items } = useCart();

  return (
    <>
      <header className="header">
        <nav className="header__navbar">
          <div className="header__logo">
            <img src={Logo} alt="" />
          </div>

          <div className="header__buttons">
            <div className="header__buttons-address">
              <Button>
                <span>Entrega:</span>
                <p>R. Antonio Braune, 222</p>
              </Button>
              <div className="header_buttons-andress-img">
                <img src={Arrow} alt="" />
              </div>
            </div>
            <div className="header__buttons-search">
              <Input
                placeholder="Busque por estabelecimento ou produtos"
                type="text"
              />
            </div>
          </div>

          <div className="header__buttons">
            <div className="header__buttons-login">
              <Button>
                <img src={Account} alt="" />
                <span>Entrar</span>
              </Button>
            </div>
            <div className="header__buttons-cart">
              {items.length !== 0 && (
                <span className="header__buttons-cart-quantity-indicator">
                  {items.length}
                </span>
              )}
              <Button>
                <img src={ShoppingCart} alt="" />
                <span>Carrinho</span>
              </Button>
              {alert && (
                <Popover
                  product={{
                    name: alert.name,
                    ingredients: alert.ingredients,
                  }}
                />
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
