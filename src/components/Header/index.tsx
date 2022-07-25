import Logo from "../../assets/img/logo-Deliverize.png";
import ShoppingCart from "../../assets/img/shopping_cart.svg";
import Account from "../../assets/img/account.svg";
import Arrow from "../../assets/img/arrow.svg";
import "./styles.css";
import Button from "../Button";
import { Input } from "../Input";

function Header() {
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
              <Button>
                <img src={ShoppingCart} alt="" />
                <span>Carrinho</span>
              </Button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
