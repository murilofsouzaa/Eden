package com.eden.config;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.eden.model.user.Gender;
import com.eden.model.user.User;
import com.eden.model.user.UserRole;
import com.eden.model.user.UserStatus;
import com.eden.repository.UserRepository;
import com.eden.service.cart.ShoppingCartService;

@Configuration
public class DataInitializer {

    @Bean
    public ApplicationRunner seed(UserRepository userRepository, PasswordEncoder passwordEncoder, ShoppingCartService shoppingCartService) {
        return args -> {
            String email = "test.user@eden.local";
            User existing = userRepository.findUserByEmail(email);
            if (existing == null) {
                User u = new User();
                u.setName("Test User");
                u.setEmail(email);
                u.setGender(Gender.MALE);
                u.setBirthDay(LocalDate.of(1990,1,1));
                u.setPassword(passwordEncoder.encode("senha123"));
                u.setRole(UserRole.USER);
                u.setStatus(UserStatus.ACTIVE);
                u.setCreatedAt(LocalDateTime.now());

                userRepository.save(u);

                shoppingCartService.createCart(u);
                System.out.println("Created test user: " + email + " password: senha123");
            } else {
                System.out.println("Test user already exists: " + email);
            }
        };
    }
}
