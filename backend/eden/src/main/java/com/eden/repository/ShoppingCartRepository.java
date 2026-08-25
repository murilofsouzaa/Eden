package com.eden.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.eden.model.shopping_cart.ShoppingCart;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {

    Optional<ShoppingCart> findShoppingCartById(Long id);

    @Query("SELECT sc FROM ShoppingCart sc JOIN sc.items i WHERE i.id = :cartItemId")
    Optional<ShoppingCart> findShoppingCartByItemId(@Param("cartItemId") Long cartItemId);

    @Query("SELECT sc FROM ShoppingCart sc JOIN sc.user sc_user WHERE sc_user.id = :user_id")
    Optional<ShoppingCart> findShoppingCartByUserId(@Param("user_id") Long user_id);

    @Query("SELECT sc FROM ShoppingCart sc JOIN sc.user u WHERE u.email = :email")
    Optional<ShoppingCart> findByUserEmail(@Param("email") String email);
}
