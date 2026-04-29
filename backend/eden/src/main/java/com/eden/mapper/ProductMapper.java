package com.eden.mapper;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import com.eden.dto.product.ProductResponse;
import com.eden.dto.product.ProductVariantResponse;
import com.eden.model.product.Product;
import com.eden.model.product.ProductImage;
import com.eden.model.product.ProductVariant;

public class ProductMapper {

    public static ProductResponse toResponse (Product product){
    Optional<ProductVariant> primaryVariant = resolvePrimaryVariant(product);
        return new ProductResponse(
                product.getId(),
                product.getTitle(),
                product.getDescription(),
                product.getModeling(),
                product.getWeight(),
                product.getMaterial(),
                primaryVariant.map(variant -> variant.getGender().name()).orElse(null),
                primaryVariant.map(variant -> variant.getCategory().name()).orElse(null),
        product.getImageUrl(),
                buildGallery(product),
                product.getCreatedAt(),
                product.getUpdatedAt(),
                product.getVariants()
                    .stream()
                    .map(ProductMapper::toVariantResponse)
                    .toList()
                );

                //Pega os dados básicos, pega dados da variante, constrói a galeria, pega URL, constrói a galeria,
                //pega as datas, e para cada variante do produto transforma em DTO
    }

    public static List<ProductResponse> toResponseList(List<Product> products){
        return products.stream()
                .map(ProductMapper::toResponse)
                .toList();
    }

    private static List<String> buildGallery(Product product) {
        return product.getImages()
                .stream()
                .sorted(Comparator.comparing(ProductImage::isMain).reversed())
                .map(ProductImage::getUrl)
                .toList();
    }

    private static Optional<ProductVariant> resolvePrimaryVariant(Product product) {
        return product.getVariants()
                .stream()
                .sorted(Comparator.comparing(ProductVariant::isDefaultVariant).reversed())
                .findFirst();
                //Pega todas as variantes de um produto, orderna e compara pra ver se é a
                //variante padrão, inverte e pega o primeiro.
    }

    public static ProductVariantResponse toVariantResponse(ProductVariant variant) {
        return new ProductVariantResponse(
                variant.getId(),
                variant.getSku(),
                variant.getColor(),
                variant.getSize(),
                variant.getPrice(),
                variant.getStock(),
                variant.getCategory(),
                variant.getGender(),
                variant.getStatus(),
                variant.isDefaultVariant()
        );
    }
}
