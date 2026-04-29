package com.eden.dto.product;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.validation.constraints.NotNull;

public record ProductResponse(
        @NotNull
        Long id,
        @NotNull
        String title,
        @NotNull
        String description,
        String modeling,
        String weight,
        String material,
        String gender,
        String category,
        String imageUrl,
        List<String> gallery,
        @NotNull
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        List<ProductVariantResponse> variants
) {}
