package com.eden.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eden.model.user.User;
import com.eden.model.user.UserStatus;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByEmail(String email);
    Optional<User> findByEmail(String email);
    User findUserByStatus(UserStatus status);
    User findUserByName(String name);
    Optional<User> findByName(String name);
}
