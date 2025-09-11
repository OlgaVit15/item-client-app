import React, { useEffect, useState } from 'react';
import { fetchItems } from '../api';

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            const data = await fetchItems();
            setItems(data);
        };
        getItems();
    }, []);

    return (
        <div>
            <h2>Item List</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;




