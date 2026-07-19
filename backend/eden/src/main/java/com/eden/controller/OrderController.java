package com.eden.controller;


import com.eden.dto.order.CreateOrderRequest;
import com.eden.dto.order.OrderResponse;
import com.eden.service.order.OrderService;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> showOrder(@PathVariable("id") Long orderId){
        return ResponseEntity.ok(orderService.showOrder(orderId));
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders(){
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody CreateOrderRequest orderRequest){
        return ResponseEntity.ok(orderService.createOrder(orderRequest));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<OrderResponse> cancelOrder(@PathVariable("id") Long orderId){
        return ResponseEntity.ok(orderService.cancelOrder(orderId));
    }
}
