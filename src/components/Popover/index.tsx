import "./styles.css";

function Popover() {
  return (
    <>
      <div className="popover__container">
        <div className="triangulo"></div>
        <h1 className="popover__container-title">Adicionado com Sucesso</h1>
        <div className="popover__container-content">
          <p className="popover__container-subtitle">Oferta Cheddar Bacon</p>
          <ul className="poppover-orderInformation">
            <span>Ingredientes:</span>
            <li>1 Carne 250gr</li>
            <li>2 Queijo Cheddar</li>
            <li>1 Bacon</li>
            <li>Molho Especial</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Popover;
