package com.eden.service.user;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eden.dto.user.CreateUserRequest;
import com.eden.dto.user.UpdateUserRequest;
import com.eden.dto.user.UserResponse;
import com.eden.exception.BusinessException;
import com.eden.exception.ResourceNotFoundException;
import com.eden.mapper.UserMapper;
import com.eden.model.shopping_cart.ShoppingCart;
import com.eden.model.user.Gender;
import com.eden.model.user.User;
import com.eden.model.user.UserRole;
import com.eden.model.user.UserStatus;
import com.eden.repository.UserRepository;
import com.eden.service.cart.ShoppingCartService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ShoppingCartService shoppingCartService;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           ShoppingCartService shoppingCartService,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.shoppingCartService = shoppingCartService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public UserResponse createUser(CreateUserRequest userRequest) {
        if (userRequest == null) {
            throw new IllegalArgumentException("CreateUserRequest cannot be null");
        }
        if (userRequest.name() == null || userRequest.name().isBlank()) {
            throw new IllegalArgumentException("Name cannot be empty or null");
        }
        if (userRequest.email() == null || userRequest.email().isBlank()) {
            throw new IllegalArgumentException("Email cannot be empty or null");
        }
        if (userRequest.password() == null || userRequest.password().isBlank()) {
            throw new IllegalArgumentException("Password cannot be empty or null");
        }
        if (userRequest.birthDay() == null) {
            throw new IllegalArgumentException("BirthDay cannot be null");
        }

        String normalizedEmail = userRequest.email().trim().toLowerCase();
        if (userRepository.findByEmail(normalizedEmail).isPresent()) {
            throw new BusinessException("User already exists with email: " + normalizedEmail);
        }

        User newUser = new User();
        newUser.setName(userRequest.name().trim());
        newUser.setEmail(normalizedEmail);
        newUser.setGender(userRequest.gender() != null ? userRequest.gender() : Gender.OTHER);
        newUser.setBirthDay(userRequest.birthDay());

        String encoded = passwordEncoder.encode(userRequest.password());
        newUser.setPassword(encoded);
        newUser.setRole(userRequest.role() != null ? userRequest.role() : UserRole.USER);
        newUser.setStatus(UserStatus.ACTIVE);
        newUser.setCreatedAt(LocalDateTime.now());

        userRepository.save(newUser);

        ShoppingCart cart = shoppingCartService.createCart(newUser);
        newUser.setCart(cart);
        userRepository.save(newUser);

        return UserMapper.toResponse(newUser);
    }

    @Override
    @Transactional
    public UserResponse updateUser(Long id, UpdateUserRequest updateUserRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        if (updateUserRequest.name() != null && !updateUserRequest.name().isBlank()) {
            user.setName(updateUserRequest.name());
        }
        if (updateUserRequest.email() != null && !updateUserRequest.email().isBlank()) {
            user.setEmail(updateUserRequest.email());
        }
        if (updateUserRequest.gender() != null) {
            user.setGender(updateUserRequest.gender());
        }
        if (updateUserRequest.birthDay() != null) {
            user.setBirthDay(updateUserRequest.birthDay());
        }

        User saved = userRepository.save(user);
        return UserMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        userRepository.delete(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return UserMapper.toResponse(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserByUsername(String username) {
        User user = userRepository.findByName(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
        return UserMapper.toResponse(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> listAllUsers() {
        return userRepository.findAll().stream()
                .map(UserMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserEntityById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }
}
