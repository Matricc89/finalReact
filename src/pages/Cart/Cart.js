import './cart.css';
import { useContext } from "react"
import { CartContext } from "../../context/CartContext";
import { useNavigate } from 'react-router-dom';
import ItemCart from './ItemCart';

import { collection, addDoc, getFirestore, doc, updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2';




const Cart = () => {
  const { cart, clear, removeItem, total } = useContext(CartContext);
  const navigate = useNavigate();
  const db = getFirestore();

  const handleRemoveItem = (id) => {
    removeItem(id);
    Swal.fire({
      icon: 'success',
      title: 'Producto eliminado del carrito',
      timer: 2000,
      showConfirmButton: false,
    });
  }

  const createOrder = async (event) => {
    event.preventDefault()

    const orderData = {
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
    };

    try {
      const querySnapshot = collection(db, 'orders');
      const newOrder = await addDoc(querySnapshot, orderData);

      Swal.fire({
        icon: 'success',
        title: `Orden con el id:${newOrder.id} creada`,
        confirmButtonText: 'Aceptar'
      });

      updateStocks();

      clear();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStocks = async () => {
    try {
      const promises = cart.map(async (product) => {
        const querySnapshot = doc(db, 'products', product.id)
        await updateDoc(querySnapshot, { stock: product.stock - product.quantity });
      });

      await Promise.all(promises);

      Swal.fire({
        icon: 'success',
        title: 'Stock actualizado',
        confirmButtonText: 'Aceptar'
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className='cart1'>
        {cart.length === 0 && (
          <h2 className='vacio'>No hay productos en el Carrito... Seleccione algun producto...</h2>
        )}{
          cart.map((product) => (
            <div className='item1' key={product.name}>
              <img alt={product.title} src={`./tienda/${product.img}`} width="150px" />
              <ItemCart product={product} />
              <button className='quitar' onClick={() => handleRemoveItem(product.id)}>Quitar item</button>
            </div>
          ))}
      </div>
      <div className='button'>
        {cart.length > 0 && <button onClick={clear}>Vaciar Carrito</button>}
        {cart.length > 0 && (
          <div>
            <button onClick={() => navigate('/')}>Seguir Comprando</button>
            <span>TOTAL: ${total}</span>
            <form>
              <input type='text' placeholder='Nombre' />
              <input type='text' placeholder='Telefono' />
              <input type='email' placeholder='E-mail' />
              <button onClick={createOrder}>Finalizar Compra</button>
            </form>

          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;