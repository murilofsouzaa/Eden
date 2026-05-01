package com.eden.dto.product;

import java.util.List;

public record UpdateProductRequest(
        String title,
        String description,
        String imageUrl,
        String modeling,
        String weight,
        String material,
        int discountPercentage,
        List<String> gallery,
        List<ProductVariantRequest> variants
) {}
