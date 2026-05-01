package com.eden.dto.product;

import java.util.List;

import com.eden.model.product.ProductCategories;
import com.eden.model.product.ProductGender;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record CreateProductRequest(
        @NotBlank
        String title,
        @NotBlank
        String description,
        String imageUrl,
        String modeling,
        String weight,
        String material,
        int discountPercentage,
        Long bundleId,
        List<String> gallery,
        @NotNull
        ProductCategories category,
        @NotNull
        ProductGender gender,
        @NotEmpty
        List<ProductVariantRequest> variants
) {
}
