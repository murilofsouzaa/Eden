import React from 'react'

type PriceOffLabelProps = {
    price?: number
    discountPercentage?: number
    // backward compatible props used in other places
    defaultVariant?: { price: number }
    selectedProduct?: { discountPercentage?: number }
    className?: string
}

const PriceOffLabel = ({
    price,
    discountPercentage,
    defaultVariant,
    selectedProduct,
    className = '',
}: PriceOffLabelProps) => {
    // Determine discount percentage from various possible props (backwards compatible)
    const perc =
        discountPercentage && discountPercentage > 0
            ? discountPercentage
            : selectedProduct?.discountPercentage && selectedProduct.discountPercentage > 0
            ? selectedProduct.discountPercentage
            : 0

    if (!perc || perc <= 0) return null

    return (
        <span className={"bg-green-500 px-2 text-[12px] font-semibold text-white " + className}>
            {perc}% OFF
        </span>
    )
}

export default PriceOffLabel