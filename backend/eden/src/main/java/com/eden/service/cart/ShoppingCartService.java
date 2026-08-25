package com.eden.service.cart;

import java.util.List;

import com.eden.dto.shopping_cart.ShoppingCartResponse;
import com.eden.dto.shopping_cart.cart_item.AddItemCartRequest;
import com.eden.dto.shopping_cart.cart_item.ItemCartResponse;
import com.eden.model.shopping_cart.ShoppingCart;
import com.eden.model.user.User;

public interface ShoppingCartService {

    ShoppingCart createCart(User user);

    ItemCartResponse addItem(Long cartId, AddItemCartRequest request);

    ShoppingCartResponse getCart(Long cartId);

    ShoppingCartResponse getCartByUsername(String username, Long cartId);

    ShoppingCartResponse getCartByUserEmail(String email);

    List<ItemCartResponse> getCartItems(Long cartId);
}
