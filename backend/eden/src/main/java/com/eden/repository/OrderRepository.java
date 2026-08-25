package com.eden.repository;

import com.eden.model.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o JOIN o.items i WHERE i.id = :itemId")
    Optional<Order> findOrderByItemId(@Param("itemId") Long itemId);

    @Query("SELECT o FROM Order o WHERE o.orderAddress.id = :addressId")
    Optional<Order> findOrderByAddressId(@Param("addressId") Long addressId);

    @Query("SELECT o FROM Order o WHERE o.orderAddress.number = :number")
    Optional<Order> findOrderByAddressNumber(@Param("number") int number);
}
