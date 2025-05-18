import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ItemList from './components/ItemList';
import { fetchItems } from './api';

jest.mock('./api');

describe('ItemList', () => {
    it('renders item list', async () => {
        const items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
        fetchItems.mockResolvedValue(items);

        render(<ItemList />);

        await waitFor(() => {
            expect(screen.getByText(/item list/i)).toBeInTheDocument();
            expect(screen.getByText('Item 1')).toBeInTheDocument();
            expect(screen.getByText('Item 2')).toBeInTheDocument();
        });
    });
});
