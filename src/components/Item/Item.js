import './Item.css';
import { Link } from 'react-router-dom';
const Item = ({ product }) => {
  return (
    <div className="item">
      <img alt={product.title} src={`/tienda/${product.img}`} width="300px"/>
      <h2>{product.title}</h2>
      <h3>{product.description}</h3>
      <h4>Precio ${product.price}</h4>
      <Link to={`/item/${product.id}`}>
        <button className="btn">Comprar</button>
      </Link>
    </div>
  );
};

export default Item