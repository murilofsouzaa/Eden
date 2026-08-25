package com.eden.service.order;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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

import com.eden.dto.order.CreateOrderRequest;
import com.eden.dto.order.OrderResponse;
import com.eden.dto.order.order_address.OrderAddressResponse;
import com.eden.exception.BusinessException;
import com.eden.exception.ResourceNotFoundException;
import com.eden.model.order.Order;
import com.eden.model.order.OrderAddress;
import com.eden.model.order.OrderItem;
import com.eden.model.order.OrderStatus;
import com.eden.model.product.Product;
import com.eden.model.product.ProductVariant;
import com.eden.model.shopping_cart.ItemCart;
import com.eden.model.shopping_cart.ShoppingCart;
import com.eden.model.user.User;
import com.eden.repository.OrderAddressRepository;
import com.eden.repository.OrderRepository;
import com.eden.repository.ShoppingCartRepository;
import com.eden.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private OrderAddressRepository orderAddressRepository;

    @Mock
    private ShoppingCartRepository shoppingCartRepository;

    @InjectMocks
    private OrderServiceImpl orderService;

    private User testUser;
    private Order testOrder;
    private ShoppingCart testCart;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setName("Order Tester");
        testUser.setEmail("order@eden.local");

        OrderAddress address = new OrderAddress();
        address.setId(10L);
        address.setUser(testUser);
        address.setStreet("Main St");
        address.setNumber(123);
        address.setNeighborhood("Downtown");
        address.setCity("Metropolis");
        address.setState("NY");
        address.setCountry("USA");
        address.setZipCode("10001");

        testOrder = new Order();
        testOrder.setId(100L);
        testOrder.setUser(testUser);
        testOrder.setOrderAddress(address);
        testOrder.setStatus(OrderStatus.CREATED);
        testOrder.setCreatedAt(LocalDateTime.now());

        Product product = new Product();
        product.setId(50L);
        product.setTitle("Shorts");

        ProductVariant variant = new ProductVariant();
        variant.setId(500L);
        variant.setProduct(product);
        variant.setPrice(BigDecimal.valueOf(80.00));

        OrderItem item = new OrderItem(1L, testOrder, variant, 2, BigDecimal.valueOf(80.00));
        testOrder.setItems(List.of(item));

        testCart = new ShoppingCart();
        testCart.setId(20L);
        testCart.setUser(testUser);
        ItemCart cartItem = new ItemCart(testCart, variant, 2, BigDecimal.valueOf(80.00));
        cartItem.setId(1L);
        testCart.getItems().add(cartItem);
    }

    @Test
    void shouldShowOrderSuccessfully() {
        when(orderRepository.findById(100L)).thenReturn(Optional.of(testOrder));

        OrderResponse response = orderService.showOrder(100L);

        assertNotNull(response);
        assertEquals(100L, response.id());
        assertEquals(1L, response.userId());
    }

    @Test
    void shouldThrowWhenOrderNotFound() {
        when(orderRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> orderService.showOrder(999L));
    }

    @Test
    void shouldCreateOrderSuccessfully() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(shoppingCartRepository.findById(20L)).thenReturn(Optional.of(testCart));
        when(orderRepository.save(any(Order.class))).thenReturn(testOrder);

        OrderAddressResponse addressResponse = new OrderAddressResponse(
                "Main St", 123, "Downtown", "Metropolis", "NY", "USA", "10001"
        );
        CreateOrderRequest request = new CreateOrderRequest(1L, 20L, addressResponse, LocalDateTime.now());

        OrderResponse response = orderService.createOrder(request);

        assertNotNull(response);
        verify(orderAddressRepository).save(any(OrderAddress.class));
        verify(orderRepository).save(any(Order.class));
    }

    @Test
    void shouldCancelOrderSuccessfully() {
        when(orderRepository.findById(100L)).thenReturn(Optional.of(testOrder));
        when(orderRepository.save(any(Order.class))).thenReturn(testOrder);

        OrderResponse response = orderService.cancelOrder(100L);

        assertNotNull(response);
        assertEquals(OrderStatus.CANCELED, response.status());
        verify(orderRepository).save(testOrder);
    }

    @Test
    void shouldThrowWhenCancelingDeliveredOrder() {
        testOrder.setStatus(OrderStatus.DELIVERED);
        when(orderRepository.findById(100L)).thenReturn(Optional.of(testOrder));

        assertThrows(BusinessException.class, () -> orderService.cancelOrder(100L));
    }
}
