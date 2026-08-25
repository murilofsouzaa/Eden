package com.eden.service.user;

import java.util.List;

import com.eden.dto.user.CreateUserRequest;
import com.eden.dto.user.UpdateUserRequest;
import com.eden.dto.user.UserResponse;
import com.eden.model.user.User;

public interface UserService {

    UserResponse createUser(CreateUserRequest userRequest);

    UserResponse updateUser(Long id, UpdateUserRequest updateUserRequest);

    void deleteUser(Long id);

    UserResponse getUserById(Long id);

    UserResponse getUserByUsername(String username);

    List<UserResponse> listAllUsers();

    User getUserEntityById(Long id);
}
