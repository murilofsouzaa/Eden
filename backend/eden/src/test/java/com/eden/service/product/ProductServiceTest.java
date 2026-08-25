package com.eden.service.product;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.eden.dto.product.CreateProductRequest;
import com.eden.dto.product.ProductResponse;
import com.eden.dto.product.ProductVariantRequest;
import com.eden.dto.product.UpdateProductRequest;
import com.eden.exception.ResourceNotFoundException;
import com.eden.model.product.Product;
import com.eden.model.product.ProductCategories;
import com.eden.model.product.ProductGender;
import com.eden.model.product.ProductStatus;
import com.eden.model.product.ProductVariant;
import com.eden.repository.OrderItemRepository;
import com.eden.repository.ProductRepository;
import com.eden.repository.ProductVariantRepository;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private OrderItemRepository orderItemRepository;

    @Mock
    private ProductVariantRepository productVariantRepository;

    @InjectMocks
    private ProductServiceImpl productService;

    private Product testProduct;
    private ProductVariant testVariant;

    @BeforeEach
    void setUp() {
        testProduct = new Product();
        testProduct.setId(1L);
        testProduct.setTitle("Oversized T-Shirt");
        testProduct.setDescription("High quality cotton t-shirt");
        testProduct.setImageUrl("http://example.com/image.jpg");

        testVariant = new ProductVariant();
        testVariant.setId(10L);
        testVariant.setSku("TSHIRT-BLK-M");
        testVariant.setColor("Black");
        testVariant.setSize("M");
        testVariant.setPrice(BigDecimal.valueOf(129.90));
        testVariant.setStock(50);
        testVariant.setCategory(ProductCategories.T_SHIRTS);
        testVariant.setGender(ProductGender.UNISSEX);
        testVariant.setStatus(ProductStatus.AVAILABLE);
        testVariant.setDefaultVariant(true);

        testProduct.addVariant(testVariant);
    }

    @Test
    void shouldCreateProductSuccessfully() {
        ProductVariantRequest variantReq = new ProductVariantRequest(
                "TSHIRT-BLK-M",
                "Black",
                "M",
                BigDecimal.valueOf(129.90),
                50,
                ProductStatus.AVAILABLE,
                true
        );
        CreateProductRequest request = new CreateProductRequest(
                "Oversized T-Shirt",
                "High quality cotton t-shirt",
                "http://example.com/image.jpg",
                "Oversized",
                "300g",
                "100% Cotton",
                0,
                null,
                List.of("http://example.com/image.jpg"),
                ProductCategories.T_SHIRTS,
                ProductGender.UNISSEX,
                List.of(variantReq)
        );

        when(productRepository.save(any(Product.class))).thenReturn(testProduct);

        ProductResponse response = productService.createProduct(request);

        assertNotNull(response);
        assertEquals(1L, response.id());
        assertEquals("Oversized T-Shirt", response.title());
        verify(productRepository).save(any(Product.class));
    }

    @Test
    void shouldThrowWhenCreateRequestHasInvalidTitle() {
        CreateProductRequest request = new CreateProductRequest(
                "",
                "Description",
                "image.jpg",
                "Modeling",
                "Weight",
                "Material",
                0,
                null,
                List.of(),
                ProductCategories.T_SHIRTS,
                ProductGender.UNISSEX,
                List.of()
        );

        assertThrows(IllegalArgumentException.class, () -> productService.createProduct(request));
    }

    @Test
    void shouldGetProductByIdSuccessfully() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(testProduct));

        ProductResponse response = productService.getProductById(1L);

        assertNotNull(response);
        assertEquals(1L, response.id());
        assertEquals("Oversized T-Shirt", response.title());
    }

    @Test
    void shouldThrowWhenProductNotFoundById() {
        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> productService.getProductById(99L));
    }

    @Test
    void shouldUpdateProductSuccessfully() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(testProduct));
        when(productRepository.save(any(Product.class))).thenReturn(testProduct);

        UpdateProductRequest updateReq = new UpdateProductRequest(
                "Updated T-Shirt",
                "Updated Description",
                null,
                null,
                null,
                null,
                0,
                null,
                null,
                null
        );

        ProductResponse response = productService.updateProduct(1L, updateReq);

        assertNotNull(response);
        verify(productRepository).save(testProduct);
    }

    @Test
    void shouldDeleteProductSuccessfully() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(testProduct));

        ProductResponse response = productService.deleteProduct(1L);

        assertNotNull(response);
        verify(productRepository).delete(testProduct);
    }
}