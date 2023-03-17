import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import ItemCount from "../../components/ItemCount/ItemCount";

const ItemCart = ({ product }) => {
    const {updateItem} = useContext(CartContext)
    const [quantity, setQuantity] = useState(product.quantity)
    useEffect(()=>{
        updateItem(product.id, quantity)
    // eslint-disable-next-line
    },[quantity])
    return (
        <>

            <h2> {product.name} </h2>
            <h2>Precio ${product.price}</h2>
            <h3>Cantidad:</h3>
            <ItemCount count={quantity} setCount={setQuantity} />
        </>
    )
}

export default ItemCart