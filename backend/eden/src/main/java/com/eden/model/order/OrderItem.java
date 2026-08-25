package com.eden.model.order;

import java.math.BigDecimal;

import com.eden.model.product.ProductVariant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="order_item")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (nullable = false, updatable = false)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
    @ManyToOne
    @JoinColumn(name = "variant_id", nullable = false)
    private ProductVariant variant;
    @Column(nullable = false)
    private int quantity;
    @Column(name = "unit_price", nullable = false)
    private BigDecimal unitPrice;

    public OrderItem(){
    }

    public OrderItem(Long id, Order order, ProductVariant variant, int quantity, BigDecimal unitPrice) {
        this.id = id;
        this.order = order;
        this.variant = variant;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }

    public BigDecimal subtotal(){
        validateUnitPrice();
        return unitPrice.multiply(BigDecimal.valueOf(quantity));
    }

    public void validateUnitPrice(){
        if (unitPrice == null || unitPrice.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("The price must be greater than zero");
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {this.order = order;}

    public void setOrderId( Order orderId) {
        this.order = order;
    }

    public ProductVariant getVariant() {
        return variant;
    }

    public void setVariant(ProductVariant variant) {
        this.variant = variant;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getUnit_price() {
        return unitPrice;
    }

    public void setUnit_price(BigDecimal unit_price) {
        this.unitPrice = unit_price;
    }
}
