import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import type { Product } from '../context/ProductContext';

export type Bundle = {
    id: number
    name: string
};

export interface UseBundlesReturn {
    bundles: Bundle[];
    selectedBundle: Bundle | null;
    productsBySelectedBundle: Product[];
    displayedProducts: Product[];
}

export function useBundles(products: Product[]): UseBundlesReturn {
    const [bundles, setBundles] = useState<Bundle[]>([]);

    useEffect(() => {
        api.get<Bundle[]>('/api/bundles')
            .then((response) => {
                setBundles(response.data);
            })
            .catch(() => {
                setBundles([]);
            });
    }, []);

    const selectedBundle = useMemo(() => {
        if (bundles.length === 0) return null;

        const bundlesWithProducts = bundles.filter((bundle) =>
            products.some((product) => product.bundleId === bundle.id)
        );

        if (bundlesWithProducts.length === 0) return null;

        return bundlesWithProducts
            .slice()
            .sort((a, b) => b.id - a.id)[0];
    }, [bundles, products]);

    const productsBySelectedBundle = useMemo(() => {
        if (!selectedBundle) return [];
        return products.filter((product) => product.bundleId === selectedBundle.id);
    }, [products, selectedBundle]);

    const displayedProducts = productsBySelectedBundle.slice(0, 7);

    return {
        bundles,
        selectedBundle,
        productsBySelectedBundle,
        displayedProducts,
    };
}
