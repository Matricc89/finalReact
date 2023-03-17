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
        const productsCollection = collection(db, 'products');
        const productsQuery = categoryId ? query(productsCollection, where('category', '==', categoryId)) : productsCollection;
        getDocs(productsQuery)
            .then((response) => setProductList(response.docs.map((doc) => ({ id: doc.id, ...doc.data() }))))
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        getProducts()
        // eslint-disable-next-line
    }, [categoryId]);

    return (
        <div>
            <ItemList productList={productList} />
        </div>
    );
};

export default ItemListContainer;