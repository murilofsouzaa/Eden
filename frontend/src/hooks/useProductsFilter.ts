import { useMemo } from 'react';
import type { Product } from '../context/ProductContext';

//TODO DIVIDA TECNICA

export interface UseProductsFilterReturn {
    filteredProducts: Product[];
    displayedProducts: Product[];
}

interface UseProductsFilterProps {
    products: Product[];
    filter: (product: Product) => boolean;
    limit?: number;
}

export function useProductsFilter({
    products,
    filter,
    limit = 14,
}: UseProductsFilterProps): UseProductsFilterReturn {
    const filteredProducts = useMemo(() => {
        return products.filter(filter);
    }, [products, filter]);

    const displayedProducts = useMemo(() => {
        return filteredProducts.slice(0, limit);
    }, [filteredProducts, limit]);

    return {
        filteredProducts,
        displayedProducts,
    };
}
