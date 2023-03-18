import './cart.css';
import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext";
import { useNavigate } from 'react-router-dom';
import ItemCart from './ItemCart';

import { collection, addDoc, getFirestore, doc, updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2';




const Cart = () => {
  const { cart, clear, removeItem, total } = useContext(CartContext);
  const [formValue, setFormValue] = useState({
    name: '',
    phone: '',
    email: '',
    confirmEmail: '',
  });
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
  };

  const createOrder = async (event) => {
    event.preventDefault();

    if (!formValue.name || !formValue.phone || !formValue.email || !formValue.confirmEmail) {
      Swal.fire({
        icon: 'error',
        title: 'Debe completar todos los campos para finalizar la compra',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if (formValue.email !== formValue.confirmEmail) {
      Swal.fire({
        icon: 'error',
        title: 'Los correos electrónicos no coinciden',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const orderData = {
      buyer: {
        email: formValue.email,
        name: formValue.name,
        phone: formValue.phone,
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

      await updateStocks();

      Swal.fire({
        icon: 'success',
        title: 'Stock actualizado',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        Swal.fire({
          icon: 'success',
          title: `Orden con el id:${newOrder.id} creada`,
          confirmButtonText: 'Continuar'
        }).then((result) => {
          if (result.isConfirmed) {
            clear();
            Swal.fire({
              icon: 'success',
              title: 'Compra realizada con éxito',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      });
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

  const handleInput = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    })
  };

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
        {cart.length > 0 && (
          <div>
            {cart.length > 0 && <button onClick={clear}>Vaciar Carrito</button>}
            <button onClick={() => navigate('/')}>Seguir Comprando</button>
            <span>TOTAL: ${total}</span>
            <h4>Para realizar la compra debe llenar el formulario:</h4>
            <div className='formulario'>
              <form>
                <div className='form-group'>
                  <label htmlFor='name'>Nombre:</label>
                  <input name='name' type='text' placeholder='Nombre' value={formValue.name} onChange={handleInput} />
                </div>
                <div className='form-group'>
                  <label htmlFor='phone'>Teléfono:</label>
                  <input name='phone' type='text' placeholder='Teléfono' value={formValue.phone} onChange={handleInput} />
                </div>
                <div className='form-group'>
                  <label htmlFor='email'>Email:</label>
                  <input name='email' type='email' placeholder='Email' value={formValue.email} onChange={handleInput} />
                </div>
                <div className='form-group'>
                  <label htmlFor='confirmEmail'>Confirme su Email:</label>
                  <input name='confirmEmail' type='email' placeholder='Confirme su Email' value={formValue.confirmEmail} onChange={handleInput} />
                </div>
                <button className='finish' onClick={createOrder}>Finalizar Compra</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;






