import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Hamburguer from "../../assets/img/hamburger.png";
import "./styles.css";
import { IProduct } from "../../types/interface";

function ProductDescription() {
  const [produto, setProduto] = useState<IProduct[]>([]);
  useEffect(() => {
    async function LoadProductDescription() {
      const response = await api.get<IProduct[]>("/products");

      setProduto(response.data);
    }

    LoadProductDescription();
  }, []);

  return (
    <>
      {produto.map(({ description, nm_product, id, vl_discount, vl_price }) => (
        <section className="container-offer" key={id}>
          <div className="container-offer__info">
            <img src={Hamburguer} alt="" />
            <h1>{nm_product}</h1>

            <p>{description}</p>
          </div>
          <div className="container-offer__price">
            <h1>R${vl_discount}</h1>

            <s>R${vl_price}</s>
          </div>
        </section>
      ))}
    </>
  );
}

export default ProductDescription;
