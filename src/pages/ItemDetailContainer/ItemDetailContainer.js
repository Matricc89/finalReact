import { useEffect,useState } from "react";
import {useParams} from "react-router-dom";
import { products } from '../../data/products';
import ItemDetail from '../../components/ItemDetail/ItemDetail';
import './detail.css';

const ItemDetailContainer = () => {
  const {id} = useParams();
  const [detailObjet, setDetailobjet] = useState({});
  const getProducts = new Promise ((res, rej) =>{
    setTimeout(()=> {
      const findProduct = products.find(item => item.id == id);
      res(findProduct)
    }, 1000)
  })

  useEffect(()=>{
    getProducts
    .then(response =>{
    setDetailobjet(response);
  })
    .catch((error)=>{console.log(error)})
  }, [])

  return (
    <div className="detalle"> 
      <ItemDetail detail={detailObjet}/>

    </div>
  )
}

export default ItemDetailContainer;