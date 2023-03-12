import { useContext } from "react"
import { CartContext } from "../../context/CartContext";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    
  const {cart, clear, removeItem} = useContext(CartContext);
  const navigate = useNavigate();

    return (
      <div>{
          cart.map((product)=>(
            <div key={product.name}>
                <h2> {product.name} </h2>
                <h3>{product.quantity}</h3>
                <button onClick={()=> removeItem(product.id)}>X</button>   
            </div>
          ))
        }

        {cart.length > 0 && <button onClick={clear}>Vacias Carrito</button>}
        {cart.length === 0 && <div>
          <h2>No hay productos en el carrito</h2>
          <button onClick={ ()=> navigate('/')}>Seguir Comprando</button>
          </div>}
        
        </div>
    )
  }
  
export default Cart