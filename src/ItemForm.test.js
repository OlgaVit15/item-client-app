import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ItemForm from './components/ItemForm';
import { createItem } from './api';

jest.mock('./api');

describe('ItemForm', () => {
    it('submits the form and calls onItemAdded', async () => {
        const onItemAdded = jest.fn();
        createItem.mockResolvedValue({ id: 1, name: 'New Item' });

        render(<ItemForm onItemAdded={onItemAdded} />);

        fireEvent.change(screen.getByPlaceholderText(/enter item name/i), {
            target: { value: 'New Item' },
        });
        fireEvent.click(screen.getByText(/add item/i));

        await waitFor(() => {
            expect(createItem).toHaveBeenCalledWith({ name: 'New Item' });
            expect(onItemAdded).toHaveBeenCalled();
            expect(screen.getByPlaceholderText(/enter item name/i).value).toBe('');
        });
    });
});
