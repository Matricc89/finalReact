import './ItemListContainer.css';

import { useEffect, useState } from 'react';
import ItemList from '../../components/ItemList/ItemList';
import { useParams } from 'react-router-dom';
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore';


const ItemListContainer = () => {

    const [productList, setProductList] = useState([]);
    const { categoryId } = useParams();




    const getProducts = () => {
        const db = getFirestore();
        const querySnapshot = collection(db, 'products')
        if (categoryId) {
            const filterQuery = query(querySnapshot, where('category', '==', categoryId))
            getDocs(filterQuery)
                .then((response) => {
                    const list = response.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data()
                        }
                    })
                    setProductList(list)
                })
                .catch((error) => console.log(error))
        }else{
            getDocs(querySnapshot)
            .then((response) => {
                const list = response.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })
                setProductList(list)
            })
            .catch((error) => console.log(error))
        }
        
    }

    useEffect(() => {
        getProducts()


    }, [categoryId]);

    return (
        <div>
            <ItemList productList={productList} />
        </div>
    );
};
export default ItemListContainer;