package com.eden.service.user;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.eden.dto.user.CreateUserRequest;
import com.eden.dto.user.UpdateUserRequest;
import com.eden.dto.user.UserResponse;
import com.eden.exception.ResourceNotFoundException;
import com.eden.model.shopping_cart.ShoppingCart;
import com.eden.model.user.Gender;
import com.eden.model.user.User;
import com.eden.model.user.UserRole;
import com.eden.repository.UserRepository;
import com.eden.service.cart.ShoppingCartService;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ShoppingCartService shoppingCartService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setName("John Doe");
        testUser.setEmail("john@example.com");
        testUser.setGender(Gender.MALE);
        testUser.setBirthDay(LocalDate.of(1995, 5, 15));
        testUser.setRole(UserRole.USER);
    }

    @Test
    void shouldCreateUserSuccessfully() {
        CreateUserRequest request = new CreateUserRequest(
                "John Doe",
                LocalDate.of(1995, 5, 15),
                Gender.MALE,
                "john@example.com",
                "secret123",
                UserRole.USER
        );

        when(passwordEncoder.encode("secret123")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        when(shoppingCartService.createCart(any(User.class))).thenReturn(new ShoppingCart());

        UserResponse response = userService.createUser(request);

        assertNotNull(response);
        assertEquals("John Doe", response.name());
        assertEquals("john@example.com", response.email());
        verify(passwordEncoder).encode("secret123");
    }

    @Test
    void shouldGetUserByIdSuccessfully() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));

        UserResponse response = userService.getUserById(1L);

        assertNotNull(response);
        assertEquals(1L, response.id());
        assertEquals("John Doe", response.name());
    }

    @Test
    void shouldThrowWhenUserNotFoundById() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> userService.getUserById(99L));
    }

    @Test
    void shouldUpdateUserSuccessfully() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        UpdateUserRequest updateReq = new UpdateUserRequest("John Updated", null, null, null);
        UserResponse response = userService.updateUser(1L, updateReq);

        assertNotNull(response);
        verify(userRepository).save(testUser);
    }

    @Test
    void shouldDeleteUserSuccessfully() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));

        userService.deleteUser(1L);

        verify(userRepository).delete(testUser);
    }

    @Test
    void shouldListAllUsers() {
        when(userRepository.findAll()).thenReturn(List.of(testUser));

        List<UserResponse> list = userService.listAllUsers();

        assertNotNull(list);
        assertEquals(1, list.size());
        assertEquals("John Doe", list.get(0).name());
    }
}
