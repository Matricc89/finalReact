import './detail.css';
import ItemCount from '../ItemCount/ItemCount';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';


const ItemDetail = ({detail}) => {
 const navigate = useNavigate();
 const {addItem} = useContext(CartContext);
 const[count, setCount] = useState(1);
 
 
 
 
  return (
    <div className="detail">
        <div>     
        <img alt={detail.name} src={detail.img} width="350px"/>
        </div> 
        <div className='detail2'>
             <h2>{detail.name}</h2>
             <h3>{detail.description}</h3>
             <h3>Precio: {detail.price}</h3>
             <ItemCount count={count} setCount={setCount} />
             <button className='agregar' disabled={count > detail.stock ? true: false} onClick={()=> addItem(detail, count)}>Agregar al 🛒</button>
             <button className='continuar' onClick={()=> navigate('/')}>Continuar</button>
             <button className='check' onClick={()=> navigate('/cart')}>Finalizar</button>
        </div>
    </div>
  );
};

export default ItemDetail