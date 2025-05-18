import React, { useState, useEffect } from 'react';
import { fetchItems, createItem, deleteItem, updateItem } from './api'; // или './itemService' если вы создали новый файл

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedItemId, setSelectedItemId] = useState(null);

    // Функция для загрузки элементов
    const loadItems = async () => {
        const data = await fetchItems();
        setItems(data);
    };

    // Используйте loadItems в useEffect
    useEffect(() => {
        loadItems();
    }, []);

    // Обработчик создания элемента
    const handleCreate = async (e) => {
        e.preventDefault();
        const newItem = { name, description };
        await createItem(newItem);
        setName('');
        setDescription('');
        loadItems(); // Обновляем список после создания
    };

    // Обработчик удаления элемента
    const handleDelete = async (id) => {
        await deleteItem(id);
        loadItems(); // Обновляем список после удаления
    };

    // Отображение формы редактирования
    const showUpdateForm = (id, name, description) => {
        setSelectedItemId(id);
        setName(name);
        setDescription(description);
    };

    // Обработчик обновления элемента
    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedItem = { name, description };
        await updateItem(selectedItemId, updatedItem);
        setSelectedItemId(null);
        setName('');
        setDescription('');
        loadItems(); // Обновляем список после обновления
    };

    return (
        <div>
            <h1>Item List</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.description}
                        <button onClick={() => showUpdateForm(item.id, item.name, item.description)}>Edit</button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {/* Форма для создания и обновления элемента */}
            <form onSubmit={selectedItemId ? handleUpdate : handleCreate}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
                <button type="submit">
                    {selectedItemId ? 'Update Item' : 'Create Item'}
                </button>
                {selectedItemId && (
                    <button type="button" onClick={() => {
                        setSelectedItemId(null);
                        setName('');
                        setDescription('');
                    }}>
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
};

export default ItemList;
