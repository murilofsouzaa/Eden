package com.eden.service.cart;

import java.math.BigDecimal;
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

import com.eden.dto.shopping_cart.ShoppingCartResponse;
import com.eden.dto.shopping_cart.cart_item.AddItemCartRequest;
import com.eden.dto.shopping_cart.cart_item.ItemCartResponse;
import com.eden.exception.ResourceNotFoundException;
import com.eden.model.product.Product;
import com.eden.model.product.ProductVariant;
import com.eden.model.shopping_cart.ShoppingCart;
import com.eden.model.user.User;
import com.eden.repository.ProductVariantRepository;
import com.eden.repository.ShoppingCartRepository;
import com.eden.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class ShoppingCartServiceTest {

    @Mock
    private ShoppingCartRepository shoppingCartRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ProductVariantRepository productVariantRepository;

    @InjectMocks
    private ShoppingCartServiceImpl shoppingCartService;

    private User testUser;
    private ShoppingCart testCart;
    private ProductVariant testVariant;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setName("Test User");
        testUser.setEmail("test@eden.local");

        testCart = new ShoppingCart();
        testCart.setId(10L);
        testCart.setUser(testUser);
        testUser.setCart(testCart);

        Product product = new Product();
        product.setId(100L);
        product.setTitle("Test Product");

        testVariant = new ProductVariant();
        testVariant.setId(200L);
        testVariant.setProduct(product);
        testVariant.setPrice(BigDecimal.valueOf(99.90));
        testVariant.setStock(10);
    }

    @Test
    void shouldCreateCartSuccessfully() {
        when(shoppingCartRepository.save(any(ShoppingCart.class))).thenReturn(testCart);

        ShoppingCart created = shoppingCartService.createCart(testUser);

        assertNotNull(created);
        assertEquals(10L, created.getId());
        verify(shoppingCartRepository).save(any(ShoppingCart.class));
    }

    @Test
    void shouldThrowWhenCreatingCartWithNullUser() {
        assertThrows(IllegalArgumentException.class, () -> shoppingCartService.createCart(null));
    }

    @Test
    void shouldAddItemToCartSuccessfully() {
        when(shoppingCartRepository.findById(10L)).thenReturn(Optional.of(testCart));
        when(productVariantRepository.findById(200L)).thenReturn(Optional.of(testVariant));
        when(shoppingCartRepository.save(any(ShoppingCart.class))).thenReturn(testCart);

        AddItemCartRequest request = new AddItemCartRequest(200L, 2);
        ItemCartResponse response = shoppingCartService.addItem(10L, request);

        assertNotNull(response);
        assertEquals(200L, response.variantId());
        assertEquals(2, response.quantity());
        verify(shoppingCartRepository).save(testCart);
    }

    @Test
    void shouldThrowWhenCartNotFoundOnAddItem() {
        when(shoppingCartRepository.findById(99L)).thenReturn(Optional.empty());

        AddItemCartRequest request = new AddItemCartRequest(200L, 1);
        assertThrows(ResourceNotFoundException.class, () -> shoppingCartService.addItem(99L, request));
    }

    @Test
    void shouldGetCartById() {
        when(shoppingCartRepository.findById(10L)).thenReturn(Optional.of(testCart));

        ShoppingCartResponse response = shoppingCartService.getCart(10L);

        assertNotNull(response);
        assertEquals(10L, response.id());
    }

    @Test
    void shouldGetCartByUserEmail() {
        when(userRepository.findByEmail("test@eden.local")).thenReturn(Optional.of(testUser));

        ShoppingCartResponse response = shoppingCartService.getCartByUserEmail("test@eden.local");

        assertNotNull(response);
        assertEquals(10L, response.id());
    }
}