package com.eden.service.cart;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eden.dto.shopping_cart.ShoppingCartResponse;
import com.eden.dto.shopping_cart.cart_item.AddItemCartRequest;
import com.eden.dto.shopping_cart.cart_item.ItemCartResponse;
import com.eden.exception.ResourceNotFoundException;
import com.eden.mapper.ItemCartMapper;
import com.eden.mapper.ShoppingCartMapper;
import com.eden.model.product.ProductVariant;
import com.eden.model.shopping_cart.ItemCart;
import com.eden.model.shopping_cart.ShoppingCart;
import com.eden.model.user.User;
import com.eden.repository.ProductVariantRepository;
import com.eden.repository.ShoppingCartRepository;
import com.eden.repository.UserRepository;

@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {

    private final ShoppingCartRepository shoppingCartRepository;
    private final ProductVariantRepository productVariantRepository;
    private final UserRepository userRepository;

    public ShoppingCartServiceImpl(ShoppingCartRepository shoppingCartRepository,
                                   ProductVariantRepository productVariantRepository,
                                   UserRepository userRepository) {
        this.shoppingCartRepository = shoppingCartRepository;
        this.productVariantRepository = productVariantRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public ShoppingCart createCart(User user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null when creating a cart");
        }

        ShoppingCart cart = new ShoppingCart();
        cart.setUser(user);
        return shoppingCartRepository.save(cart);
    }

    @Override
    @Transactional
    public ItemCartResponse addItem(Long cartId, AddItemCartRequest request) {
        validateCartId(cartId);
        if (request == null) {
            throw new IllegalArgumentException("AddItemCartRequest cannot be null");
        }

        ShoppingCart cart = shoppingCartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found with id: " + cartId));

        ProductVariant variant = productVariantRepository.findById(request.variantId())
                .orElseThrow(() -> new ResourceNotFoundException("Product variant not found with id: " + request.variantId()));

        ItemCart existingItem = cart.getItems()
                .stream()
                .filter(item -> item.getVariant().getId().equals(variant.getId()))
                .findFirst()
                .orElse(null);

        ItemCart item;
        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + request.quantity());
            item = existingItem;
        } else {
            item = new ItemCart();
            item.setCart(cart);
            item.setVariant(variant);
            item.setQuantity(request.quantity());
            item.setUnitPrice(variant.getPrice());

            cart.getItems().add(item);
        }

        shoppingCartRepository.save(cart);
        return ItemCartMapper.toResponse(item);
    }

    @Override
    @Transactional(readOnly = true)
    public ShoppingCartResponse getCart(Long cartId) {
        validateCartId(cartId);

        ShoppingCart cart = shoppingCartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found with id: " + cartId));
        return ShoppingCartMapper.toResponse(cart);
    }

    @Override
    @Transactional(readOnly = true)
    public ShoppingCartResponse getCartByUsername(String username, Long cartId) {
        validateCartId(cartId);
        validateUsername(username);

        User user = userRepository.findByName(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        ShoppingCart cart = user.getCart();
        if (cart == null) {
            throw new ResourceNotFoundException("Shopping cart not found for user: " + username);
        }
        return ShoppingCartMapper.toResponse(cart);
    }

    @Override
    @Transactional(readOnly = true)
    public ShoppingCartResponse getCartByUserEmail(String email) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        ShoppingCart cart = user.getCart();
        if (cart == null) {
            throw new ResourceNotFoundException("Shopping cart not found for user with email: " + email);
        }
        return ShoppingCartMapper.toResponse(cart);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ItemCartResponse> getCartItems(Long cartId) {
        validateCartId(cartId);

        ShoppingCart cart = shoppingCartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found with id: " + cartId));
        return cart.getItems()
                .stream()
                .map(ItemCartMapper::toResponse)
                .toList();
    }

    private void validateCartId(Long cartId) {
        if (cartId == null) {
            throw new IllegalArgumentException("Cart ID cannot be null");
        }
    }

    private void validateUsername(String username) {
        if (username == null || username.isBlank()) {
            throw new IllegalArgumentException("Username cannot be null or empty");
        }
    }
}
