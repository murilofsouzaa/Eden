package com.eden.service.product;

import java.math.BigDecimal;
import java.util.List;

import com.eden.dto.product.CreateProductRequest;
import com.eden.dto.product.ProductResponse;
import com.eden.dto.product.ProductVariantResponse;
import com.eden.dto.product.UpdateProductRequest;
import com.eden.model.order.OrderStatus;
import com.eden.model.product.ProductCategories;
import com.eden.model.product.ProductGender;

public interface ProductService {

    ProductResponse createProduct(CreateProductRequest request);

    ProductResponse updateProduct(Long id, UpdateProductRequest request);

    ProductResponse deleteProduct(Long id);

    ProductResponse getProductById(Long id);

    List<ProductResponse> getAllProducts();

    ProductVariantResponse getVariant(Long id);

    List<ProductResponse> getAllAvailableProducts();

    List<ProductResponse> getAllProductsByCategory(ProductCategories category, String gender);

    List<ProductResponse> getAllProductsByModeling(String modeling);

    List<ProductResponse> getAllProductsBetweenPrice(BigDecimal minPrice, BigDecimal maxPrice);

    List<ProductResponse> getAllProductsByTextPart(String part);

    List<ProductResponse> getAllProductsByGender(ProductGender gender);

    List<ProductResponse> getAllAcessories();

    List<ProductResponse> getBestSellers(OrderStatus status);
}
