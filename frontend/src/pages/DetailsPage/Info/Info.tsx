import {useEffect, useMemo, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import './Info.css';
import useProducts from '../../../../hooks/useProducts';
import useAccessories from '../../../../hooks/useAccessories';
import {useCarousel} from '../../../hooks/useCarousel';
import type {Product, ProductVariant} from '../../../context/ProductContext';
import type {Accessory} from '../../../context/AccessoriesContext';
import type {SuggestionItem} from './components/ProductSuggestion/ProductSuggestion';
import ProductDetailView from './components/ProductDetailView/ProductDetailView';
import AccessoryDetailView from './components/AccessoryDetailView/AccessoryDetailView';

const formatPrice = (value: number) => value.toFixed(2).replace('.', ',');

const productToSuggestionItem = (product: Product): SuggestionItem => ({
    id: product.id,
    title: product.title,
    imageUrl: product.imageUrl,
    discountPercentage: product.discountPercentage,
    variants: product.variants,
});

const accessoryToSuggestionItem = (accessory: Accessory): SuggestionItem => ({
    id: accessory.id,
    title: accessory.title,
    imageUrl: accessory.imageUrl,
    discountPercentage: accessory.discountPercentage,
    variants: [{
        price: accessory.price,
        stock: accessory.stock,
        defaultVariant: true,
    }],
});

const Info = () => {
    const [selectedSize, setSelectedSize] = useState<string>('P');
    const {id} = useParams();
    const {pathname} = useLocation();
    const products = useProducts();
    const accessories = useAccessories();

    const isAccessoryRoute = pathname.startsWith('/accessories/');
    const selectedProduct = !isAccessoryRoute && id
        ? products.find((product: Product) => product.id === Number(id))
        : undefined;
    const selectedAccessory = isAccessoryRoute && id
        ? accessories.find((accessory: Accessory) => accessory.id === Number(id))
        : undefined;

    const selectedProductId = selectedProduct?.id;
    const selectedProductVariants = selectedProduct?.variants ?? [];
    const suggestedProducts = selectedProductId == null
        ? []
        : products
            .filter((product) => product.id !== selectedProductId)
            .slice()
            .sort((a, b) => {
                const score = (value: number) => (value * 9301 + selectedProductId * 49297) % 233280;
                return score(a.id) - score(b.id);
            })
            .slice(0, 7)
            .map(productToSuggestionItem);
    const suggestionCarousel = useCarousel({ totalItems: suggestedProducts.length });

    const accessorySuggestions: SuggestionItem[] = useMemo(() => {
        if (!selectedAccessory) return [];

        return accessories
            .filter((accessory: Accessory) => accessory.id !== selectedAccessory.id)
            .slice()
            .sort((a: Accessory, b: Accessory) => {
                const score = (value: number) => (value * 9301 + selectedAccessory.id * 49297) % 233280;
                return score(a.id) - score(b.id);
            })
            .slice(0, 7)
            .map(accessoryToSuggestionItem);
    }, [accessories, selectedAccessory]);
    const accessorySuggestionCarousel = useCarousel({ totalItems: accessorySuggestions.length });

    const defaultVariant = selectedProductVariants.length > 0
        ? (selectedProductVariants.find((product: ProductVariant) => product?.defaultVariant) ?? selectedProductVariants[0])
        : undefined;
    const hasDiscount = (selectedProduct?.discountPercentage ?? 0) > 0;
    const installmentPrice = ((defaultVariant?.price ?? 0) / 12).toFixed(2);
    const discountedPrice = defaultVariant
        ? (defaultVariant.price - (selectedProduct?.discountPercentage ?? 0) * defaultVariant.price / 100).toFixed(2)
        : '0.00';
    const cashbackText = '% 10 de cashback na próxima compra';

    const selectedVariant = defaultVariant
        ? (selectedProductVariants.find((variant: ProductVariant) => variant.size === selectedSize) ?? defaultVariant)
        : undefined;
    const isOutOfStock = !selectedVariant || (selectedVariant?.stock ?? 0) === 0;

    const accessoryHasDiscount = (selectedAccessory?.discountPercentage ?? 0) > 0;
    const accessoryDiscountedPrice = useMemo(() => {
        if (selectedAccessory?.price == null) return 0;
        return selectedAccessory.price - (selectedAccessory.price * selectedAccessory.discountPercentage / 100);
    }, [selectedAccessory]);
    const accessoryInstallmentPrice = useMemo(() => {
        if (selectedAccessory?.price == null) return '0,00';
        return formatPrice(selectedAccessory.price / 12);
    }, [selectedAccessory]);

    const currentTitle = selectedAccessory?.title ?? selectedProduct?.title;
    const pageTitle = currentTitle == undefined ? 'EDEN' : `${currentTitle.slice(0, 20)}...`;

    useEffect(() => {
        const titleElement = document.querySelector('title');
        if (titleElement) {
            titleElement.textContent = pageTitle;
        }
    }, [pageTitle]);

    if (isAccessoryRoute) {
        if (!selectedAccessory) {
            return (
                <div className="flex justify-center items-center p-40">
                    <p className="text-center text-black/60 text-xl">Acessório não encontrado</p>
                </div>
            );
        }

        return (
            <AccessoryDetailView
                accessory={selectedAccessory}
                accessoryHasDiscount={accessoryHasDiscount}
                accessoryDiscountedPrice={accessoryDiscountedPrice}
                accessoryInstallmentPrice={accessoryInstallmentPrice}
                accessorySuggestions={accessorySuggestions}
                accessoryCarousel={accessorySuggestionCarousel}
            />
        );
    }

    return selectedProduct && defaultVariant ? (
        <ProductDetailView
            product={selectedProduct}
            defaultVariant={defaultVariant}
            hasDiscount={hasDiscount}
            discountedPrice={discountedPrice}
            installmentPrice={installmentPrice}
            cashbackText={cashbackText}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
            isOutOfStock={isOutOfStock}
            suggestions={suggestedProducts}
            carousel={suggestionCarousel}
        />
    ) : (
        <div className="flex justify-center items-center p-40">
            <p className="text-center text-black/60 text-xl">Produto não encontrado ou sem variantes disponíveis</p>
        </div>
    );
}
 
export default Info;
