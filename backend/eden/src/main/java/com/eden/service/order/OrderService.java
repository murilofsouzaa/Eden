package com.eden.service.order;

import java.util.List;

import com.eden.dto.order.CreateOrderRequest;
import com.eden.dto.order.OrderResponse;

public interface OrderService {

    OrderResponse showOrder(Long orderId);

    List<OrderResponse> getAllOrders();

    OrderResponse createOrder(CreateOrderRequest orderRequest);

    OrderResponse cancelOrder(Long orderId);
}
