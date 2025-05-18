import React, { useState } from 'react';
import { createItem } from '../api';

const ItemForm = ({ onItemAdded }) => {
    const [itemName, setItemName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = { name: itemName };
        await createItem(newItem);
        onItemAdded();
        setItemName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Enter item name"
                required
            />
            <button type="submit">Add Item</button>
        </form>
    );
};

export default ItemForm;
