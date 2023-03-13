import { useContext } from "react"
import { CartContext } from "../../context/CartContext";
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getFirestore, doc, updateDoc } from "firebase/firestore";

const Cart = () => {
    
  const {cart, clear, removeItem, total} = useContext(CartContext);
  const navigate = useNavigate();
  const db = getFirestore();


    
  const createOrder = (event) =>{
    event.preventDefault()
      
      const querySnapshot = collection(db, 'orders');
      
      addDoc(querySnapshot, {
        buyer:{
          email:'react@react.com',
          name:'Malena',
          phone:'+5415364578'
        },
        products: cart.map((product)=>{
          return {
            title: product.name,
            price: product.price,
            id: product.id,
            quantity: product.quantity
          }
        }),
        total: total,
      })
      .then((response)=>{
        alert(`Orden con el id:${response.id} creada`);
        updateStocks();
        clear()
      })
      .catch((error)=>console.log(error))
    };

    const updateStocks = ()=> {
      cart.forEach((product)=>{
        const querySnapshot = doc(db, 'products', product.id)

        updateDoc(querySnapshot,{
          stock: product.stock - product.quantity,
        }).then(()=>{
          alert('actualizacion de stock')
        })
        .catch((error)=>console.log(error))
      })
    }
    
    return (
      <div>{
          cart.map((product)=>(
            <div key={product.name}>
                <h2> {product.name} </h2>
                <h2>${product.price}</h2>
                <h3>{product.quantity}</h3>
                
                <button onClick={()=> removeItem(product.id)}>X</button>   
            </div>
          ))}

        {cart.length > 0 && <button onClick={clear}>Vaciar Carrito</button>}
        {cart.length > 0 && (<div>
          
          <button onClick={ ()=> navigate('/')}>Seguir Comprando</button>
          <button onClick={createOrder }>Finalizar Compra</button>
          <span>El total es:{total}</span>
          </div>
          )}
        {cart.length === 0 &&(
          <h2>No hay productos en el carrito</h2>
        )}
        </div>
    )
  }
  
export default Cart