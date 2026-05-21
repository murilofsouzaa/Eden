package com.eden.dto.accessory;

public record AccessoryResponse(
        Long id,
        String title,
        Integer stock,
        String material,
        Integer weight,
        String description,
        String brand,
        String imageUrl,
        java.math.BigDecimal price,
        int discountPercentage
) {}