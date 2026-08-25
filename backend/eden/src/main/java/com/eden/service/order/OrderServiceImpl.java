package com.eden.service.order;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eden.dto.order.CreateOrderRequest;
import com.eden.dto.order.OrderResponse;
import com.eden.exception.BusinessException;
import com.eden.exception.ResourceNotFoundException;
import com.eden.mapper.OrderMapper;
import com.eden.model.order.Order;
import com.eden.model.order.OrderAddress;
import com.eden.model.order.OrderItem;
import com.eden.model.order.OrderStatus;
import com.eden.model.shopping_cart.ItemCart;
import com.eden.model.shopping_cart.ShoppingCart;
import com.eden.model.user.User;
import com.eden.repository.OrderAddressRepository;
import com.eden.repository.OrderRepository;
import com.eden.repository.ShoppingCartRepository;
import com.eden.repository.UserRepository;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final OrderAddressRepository orderAddressRepository;
    private final ShoppingCartRepository shoppingCartRepository;

    public OrderServiceImpl(OrderRepository orderRepository,
                            UserRepository userRepository,
                            OrderAddressRepository orderAddressRepository,
                            ShoppingCartRepository shoppingCartRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.orderAddressRepository = orderAddressRepository;
        this.shoppingCartRepository = shoppingCartRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse showOrder(Long orderId) {
        validateOrderId(orderId);

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        return OrderMapper.toResponse(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return OrderMapper.toResponseList(orders);
    }

    @Override
    @Transactional
    public OrderResponse createOrder(CreateOrderRequest orderRequest) {
        validateCreateOrderRequest(orderRequest);

        User user = userRepository.findById(orderRequest.userId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + orderRequest.userId()));

        ShoppingCart shoppingCart = shoppingCartRepository.findById(orderRequest.shoppingCartId())
                .orElseThrow(() -> new ResourceNotFoundException("Shopping cart not found with id: " + orderRequest.shoppingCartId()));

        if (shoppingCart.getItems() == null || shoppingCart.getItems().isEmpty()) {
            throw new BusinessException("Cannot create an order from an empty shopping cart");
        }

        OrderAddress address = new OrderAddress();
        address.setUser(user);
        address.setStreet(orderRequest.address().street());
        address.setNumber(orderRequest.address().number());
        address.setNeighborhood(orderRequest.address().neighborhood());
        address.setCity(orderRequest.address().city());
        address.setState(orderRequest.address().state());
        address.setCountry(orderRequest.address().country());
        address.setZipCode(orderRequest.address().zipCode());

        orderAddressRepository.save(address);

        Order order = new Order();
        order.setUser(user);
        order.setOrderAddress(address);
        order.setCreatedAt(LocalDateTime.now());
        order.setShoppingCart(shoppingCart);

        orderRepository.save(order);

        List<OrderItem> orderItems = new ArrayList<>();
        for (ItemCart cartItem : shoppingCart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setVariant(cartItem.getVariant());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(cartItem.getUnitPrice());
            orderItems.add(orderItem);
        }
        order.setItems(orderItems);

        Order savedOrder = orderRepository.save(order);
        return OrderMapper.toResponse(savedOrder);
    }

    @Override
    @Transactional
    public OrderResponse cancelOrder(Long orderId) {
        validateOrderId(orderId);

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        if (order.getStatus() == OrderStatus.DELIVERED) {
            throw new BusinessException("Delivered order cannot be canceled!");
        }

        if (order.getStatus() == OrderStatus.CANCELED) {
            throw new BusinessException("Order is already canceled!");
        }

        order.setStatus(OrderStatus.CANCELED);
        Order updated = orderRepository.save(order);

        return OrderMapper.toResponse(updated);
    }

    private void validateOrderId(Long orderId) {
        if (orderId == null) {
            throw new IllegalArgumentException("The Id cannot be null");
        }
    }

    private void validateCreateOrderRequest(CreateOrderRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("CreateOrderRequest cannot be null");
        }
        if (request.userId() == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        if (request.shoppingCartId() == null) {
            throw new IllegalArgumentException("ShoppingCartId cannot be null");
        }
        if (request.address() == null) {
            throw new IllegalArgumentException("Address cannot be null");
        }
    }
}
