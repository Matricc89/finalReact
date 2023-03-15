import './cart.css';
import { useContext } from "react"
import { CartContext } from "../../context/CartContext";
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getFirestore, doc, updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2';



const Cart = () => {

  const { cart, clear, removeItem, total } = useContext(CartContext);
  const navigate = useNavigate();
  const db = getFirestore();



  const createOrder = (event) => {
    event.preventDefault()

    const querySnapshot = collection(db, 'orders');

    addDoc(querySnapshot, {
      buyer: {
        email: 'react@react.com',
        name: 'Malena',
        phone: '+5415364578'
      },
      products: cart.map((product) => {
        return {
          title: product.name,
          price: product.price,
          id: product.id,
          quantity: product.quantity
        }
      }),
      total: total,
    })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: `Orden con el id:${response.id} creada`,
          confirmButtonText: 'Aceptar'
        }).then(() => {
          updateStocks();
          clear();
        });
        
        
      })
      .catch((error) => console.log(error))
  };

  const updateStocks = () => {
    cart.forEach((product) => {
      const querySnapshot = doc(db, 'products', product.id)

      updateDoc(querySnapshot, {
        stock: product.stock - product.quantity,
      }).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Stock actualizado',
          confirmButtonText: 'Aceptar'
        });
        
      })
        .catch((error) => console.log(error))
    })
  }
  const handleRemoveItem = (id) => {
    removeItem(id);
    Swal.fire({
      icon: 'success',
      title: 'Producto eliminado del carrito',
      timer: 2000, 
      showConfirmButton: false, 
    });
    
  }

  return (
    <div>
      
      <div className='cart1'>
      {cart.length === 0 && (
       <h2 className='vacio'>No hay productos en el Carrito... Seleccione algun producto...</h2>
      )}{
        cart.map((product) => (
          <div className='item1' key={product.name}>
            <img alt={product.title} src={`/tienda/${product.img}`} width="150px"/>
            <h2> {product.name} </h2>
            <h2>Precio ${product.price}</h2>
            <h3>Cantidad: {product.quantity}</h3>

            <button onClick={() => handleRemoveItem(product.id)}>Quitar item</button>
            
          </div>
        ))}
      </div>
      <div className='button'>
        {cart.length > 0 && <button onClick={clear}>Vaciar Carrito</button>}
        
        {cart.length > 0 && (
          <div >

            <button onClick={() => navigate('/')}>Seguir Comprando</button>
            <span>TOTAL: ${total}</span>
            <button onClick={createOrder}>Finalizar Compra</button>
            
          </div>
        )}
        
      </div>
    </div>
  )
}

export default Cart