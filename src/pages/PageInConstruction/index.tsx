import { useEffect } from "react";
import Logo from "../../assets/img/logo-Deliverize.png";
import "./styles.css";
import { useHistory } from "react-router-dom";

function PageInDevelopment() {
  const history = useHistory();

  useEffect(() => {
    const timeout = setTimeout(() => {
      history.goBack();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [history]);

  return (
    <>
      <div className="container">
        <h1>Página em desenvolvimento</h1>

        <p>
          Desculpe-nos o transtorno. Em breve esta página estará disponível para
          visualização.
        </p>

        <p>Redirecionando...</p>
      </div>
    </>
  );
}

export default PageInDevelopment;
