package com.eden.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.eden.dto.shopping_cart.ShoppingCartResponse;
import com.eden.dto.shopping_cart.cart_item.AddItemCartRequest;
import com.eden.dto.shopping_cart.cart_item.ItemCartResponse;
import com.eden.model.user.User;
import com.eden.repository.UserRepository;
import com.eden.service.cart.ShoppingCartService;

import jakarta.validation.Valid;

@CrossOrigin(origins = {"https://edenclothing.vercel.app", "https://eden-927f-hidbs269m-murilofsouzaas-projects.vercel.app"})

@RestController
@RequestMapping("/api/cart")
public class ShoppingCartController {

    private final ShoppingCartService shoppingCartService;
    private final UserRepository userRepository;

    public ShoppingCartController(ShoppingCartService shoppingCartService, UserRepository userRepository){
        this.shoppingCartService = shoppingCartService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<ShoppingCartResponse> getLoggedUserCart(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findUserByEmail(email);

        if (user == null || user.getCart() == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(shoppingCartService.getCart(user.getCart().getId()));
    }

    @GetMapping("/{cartId}")
    public ResponseEntity<ShoppingCartResponse> getShoppingCart(@PathVariable Long cartId){
        return ResponseEntity.ok(shoppingCartService.getCart(cartId));
    }

    @GetMapping("/{username}/{cartId}")
        public ResponseEntity<ShoppingCartResponse> getShoppingCartByUsername(
                @PathVariable String username, @PathVariable Long cartId)
        {
            return ResponseEntity.ok(shoppingCartService.getCartByUsername(username, cartId));
        }

    @GetMapping("/{cartId}/items")
    public ResponseEntity<List<ItemCartResponse>> getCartItems(@PathVariable("cartId") Long cartId){
        return ResponseEntity.ok(shoppingCartService.getCartItems(cartId));
    }

    @PostMapping("/{cartId}/items")
    public ResponseEntity<ItemCartResponse> addItem(
            @PathVariable Long cartId,
            @RequestBody @Valid AddItemCartRequest request
    ) {
        return ResponseEntity.ok(shoppingCartService.addItem(cartId, request)
        );
    }
}
