import axios from 'axios';
import { fetchItems, createItem, deleteItem, updateItem } from './api';

jest.mock('axios');

describe('API calls', () => {
    const items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
    const newItem = { name: 'New Item' };

    it('fetchItems should return items', async () => {
        axios.get.mockResolvedValue({ data: items });

        const result = await fetchItems();
        expect(result).toEqual(items);
    });

    it('createItem should create a new item', async () => {
        axios.post.mockResolvedValue({ data: { id: 3, ...newItem } });

        const result = await createItem(newItem);
        expect(result).toEqual({ id: 3, ...newItem });
    });

    it('deleteItem should call delete with correct URL', async () => {
        const id = 1;
        axios.delete.mockResolvedValue({});

        await deleteItem(id);
        expect(axios.delete).toHaveBeenCalledWith(`${window.location.protocol}//${window.location.hostname}:30080/items/${id}`);
    });

    it('updateItem should update an item and return the updated data', async () => {
        const updatedItem = { name: 'Updated Item' };
        const id = 1;
        axios.put.mockResolvedValue({ data: { id, ...updatedItem } });

        const result = await updateItem(id, updatedItem);
        expect(result).toEqual({ id, ...updatedItem });
    });
});
